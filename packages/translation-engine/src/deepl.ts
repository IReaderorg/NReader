import { TranslationEngine, TranslationEngineConfig, TranslationResult } from './abstraction'

interface DeepLResponse {
  translations: Array<{
    detected_source_language: string
    text: string
  }>
}

export class DeepLEngine implements TranslationEngine {
  readonly type = 'deepl' as const
  readonly name = 'DeepL'

  private apiKey: string
  private targetLang: string

  constructor(config: TranslationEngineConfig) {
    if (!config.apiKey) throw new Error('DeepL API key required')
    this.apiKey = config.apiKey
    this.targetLang = config.targetLang ?? 'EN'
  }

  async translate(text: string, targetLang?: string, sourceLang?: string): Promise<TranslationResult> {
    const lang = (targetLang ?? this.targetLang).toUpperCase()
    const res = await fetch('https://api-free.deepl.com/v2/translate', {
      method: 'POST',
      headers: {
        'Authorization': `DeepL-Auth-Key ${this.apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        text: [text],
        target_lang: lang,
        source_lang: sourceLang?.toUpperCase()
      })
    })

    if (!res.ok) {
      throw new Error(`DeepL error: ${res.status} ${await res.text()}`)
    }

    const data: DeepLResponse = await res.json()
    const t = data.translations[0]!
    return {
      text: t.text,
      sourceLang: t.detected_source_language.toLowerCase(),
      targetLang: lang.toLowerCase(),
      detectedLang: t.detected_source_language.toLowerCase()
    }
  }

  async translateBatch(texts: string[], targetLang?: string, sourceLang?: string): Promise<TranslationResult[]> {
    const lang = (targetLang ?? this.targetLang).toUpperCase()
    const res = await fetch('https://api-free.deepl.com/v2/translate', {
      method: 'POST',
      headers: {
        'Authorization': `DeepL-Auth-Key ${this.apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        text: texts,
        target_lang: lang,
        source_lang: sourceLang?.toUpperCase()
      })
    })

    if (!res.ok) {
      throw new Error(`DeepL error: ${res.status} ${await res.text()}`)
    }

    const data: DeepLResponse = await res.json()
    return data.translations.map(t => ({
      text: t.text,
      sourceLang: t.detected_source_language.toLowerCase(),
      targetLang: lang.toLowerCase(),
      detectedLang: t.detected_source_language.toLowerCase()
    }))
  }

  async getSupportedLanguages(): Promise<string[]> {
    return ['EN', 'ES', 'FR', 'DE', 'JA', 'KO', 'ZH', 'PT', 'RU', 'AR', 'IT', 'NL', 'PL', 'SV', 'DA', 'FI', 'CS', 'HU', 'RO', 'EL', 'BG', 'LT', 'LV', 'SL', 'ET', 'SK', 'NO', 'UK', 'ID', 'MS', 'TH', 'VI']
  }

  async testConnection(): Promise<boolean> {
    try {
      await this.getSupportedLanguages()
      return true
    } catch { return false }
  }

  destroy(): void {}
}
