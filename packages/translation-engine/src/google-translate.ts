import { TranslationEngine, TranslationEngineConfig, TranslationResult } from './abstraction'

const GOOGLE_TRANSLATE_API = 'https://translate.googleapis.com/translate_a/single'

interface GoogleTranslateResponse {
  0: Array<[string, string, null, null, number?]> // sentences
  2: string // detected source language
  8: Array<[string, string[]]> // alternative translations
}

export class GoogleTranslateEngine implements TranslationEngine {
  readonly type = 'ai' as const
  readonly name = 'Google Translate'

  private targetLang: string
  private sourceLang: string
  private rateLimitDelay: number = 200 // ms between batch requests

  constructor(config?: Partial<TranslationEngineConfig>) {
    this.targetLang = config?.targetLang ?? 'en'
    this.sourceLang = config?.sourceLang ?? 'auto'
  }

  async translate(text: string, targetLang?: string, sourceLang?: string): Promise<TranslationResult> {
    const tl = targetLang ?? this.targetLang
    const sl = sourceLang ?? this.sourceLang

    const url = new URL(GOOGLE_TRANSLATE_API)
    url.searchParams.set('client', 'gtx')
    url.searchParams.set('sl', sl)
    url.searchParams.set('tl', tl)
    url.searchParams.set('dt', 't')
    url.searchParams.set('dj', '1')
    url.searchParams.set('q', text)

    const res = await fetch(url.toString(), {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; IReader/1.0)',
      },
    })

    if (!res.ok) {
      throw new Error(`Google Translate error: ${res.status} ${await res.text()}`)
    }

    const data: GoogleTranslateResponse = await res.json()

    // Parse sentences
    const translatedText = data[0]
      ?.filter(s => s[0])
      .map(s => s[0])
      .join('') ?? text

    // Parse alternatives for detected lang
    const detectedLang = data[2] ?? sl

    return {
      text: translatedText,
      sourceLang: sl,
      targetLang: tl,
      detectedLang,
    }
  }

  async translateBatch(texts: string[], targetLang?: string, sourceLang?: string): Promise<TranslationResult[]> {
    const results: TranslationResult[] = []

    for (let i = 0; i < texts.length; i++) {
      // Rate limit: delay between requests to avoid being blocked
      if (i > 0) {
        await new Promise(r => setTimeout(r, this.rateLimitDelay))
      }

      try {
        const result = await this.translate(texts[i]!, targetLang, sourceLang)
        results.push(result)
      } catch (err) {
        // Return original text on failure for individual items
        results.push({
          text: texts[i]!,
          sourceLang: sourceLang ?? this.sourceLang,
          targetLang: targetLang ?? this.targetLang,
          detectedLang: sourceLang ?? this.sourceLang,
        })
      }
    }

    return results
  }

  async getSupportedLanguages(): Promise<string[]> {
    return [
      'af', 'sq', 'am', 'ar', 'hy', 'az', 'eu', 'be', 'bn', 'bs', 'bg', 'ca',
      'ceb', 'ny', 'zh-CN', 'zh-TW', 'co', 'hr', 'cs', 'da', 'nl', 'en', 'eo',
      'et', 'fi', 'fr', 'fy', 'gl', 'ka', 'de', 'el', 'gu', 'ht', 'ha', 'haw',
      'iw', 'hi', 'hmn', 'hu', 'is', 'ig', 'id', 'ga', 'it', 'ja', 'jw', 'kn',
      'kk', 'km', 'ko', 'ku', 'ky', 'lo', 'la', 'lv', 'lt', 'lb', 'mk', 'mg',
      'ms', 'ml', 'mt', 'mi', 'mr', 'mn', 'my', 'ne', 'no', 'ps', 'fa', 'pl',
      'pt', 'pa', 'ro', 'ru', 'sm', 'gd', 'sr', 'st', 'sn', 'sd', 'si', 'sk',
      'sl', 'so', 'es', 'su', 'sw', 'sv', 'tg', 'ta', 'te', 'th', 'tr', 'uk',
      'ur', 'uz', 'vi', 'cy', 'xh', 'yi', 'yo', 'zu',
    ]
  }

  async testConnection(): Promise<boolean> {
    try {
      await this.translate('test', 'en', 'auto')
      return true
    } catch {
      return false
    }
  }

  destroy(): void {}
}
