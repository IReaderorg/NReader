import { TranslationEngine, TranslationEngineConfig, TranslationResult } from './abstraction'

interface LibreResponse {
  translatedText: string
}

export function validateConfig(config: Partial<TranslationEngineConfig>): { valid: boolean; error?: string } {
  if (!config.baseUrl) return { valid: false, error: 'LibreTranslate server URL required (baseUrl)' }
  return { valid: true }
}

export class LibreTranslateEngine implements TranslationEngine {
  readonly type = 'libre' as const
  readonly name: string

  private baseUrl: string
  private apiKey: string | undefined
  private targetLang: string
  private sourceLang: string

  constructor(config: TranslationEngineConfig) {
    const v = validateConfig(config)
    if (!v.valid) throw new Error(v.error)
    this.baseUrl = config.baseUrl!.replace(/\/+$/, '')
    this.apiKey = config.apiKey
    this.targetLang = config.targetLang ?? 'en'
    this.sourceLang = config.sourceLang ?? 'auto'
    this.name = `LibreTranslate`
  }

  async translate(text: string, targetLang?: string, sourceLang?: string): Promise<TranslationResult> {
    const tl = targetLang ?? this.targetLang
    const sl = sourceLang ?? this.sourceLang

    const body: Record<string, string> = {
      q: text,
      source: sl === 'auto' ? 'auto' : sl,
      target: tl,
    }
    if (this.apiKey) body.api_key = this.apiKey

    const res = await fetch(`${this.baseUrl}/translate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    })

    if (!res.ok) {
      const errText = await res.text()
      throw new Error(`LibreTranslate error: ${res.status} ${errText}`)
    }

    const data: LibreResponse = await res.json()
    return {
      text: data.translatedText,
      sourceLang: sl,
      targetLang: tl,
      detectedLang: sl === 'auto' ? undefined : sl,
    }
  }

  async translateBatch(texts: string[], targetLang?: string, sourceLang?: string): Promise<TranslationResult[]> {
    return Promise.all(texts.map(t => this.translate(t, targetLang, sourceLang)))
  }

  async getSupportedLanguages(): Promise<string[]> {
    try {
      const res = await fetch(`${this.baseUrl}/languages`)
      if (!res.ok) return []
      const data: Array<{ code: string; name: string }> = await res.json()
      return data.map(l => l.code)
    } catch { return [] }
  }

  async testConnection(): Promise<boolean> {
    try {
      await this.translate('Hello', 'en', 'auto')
      return true
    } catch { return false }
  }

  destroy(): void {}
}
