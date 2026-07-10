import { TranslationEngine, TranslationEngineConfig, TranslationResult } from './abstraction'

interface OllamaResponse {
  model: string
  message: { content: string }
  done: boolean
}

export function validateConfig(config: Partial<TranslationEngineConfig>): { valid: boolean; error?: string } {
  if (!config.baseUrl) return { valid: false, error: 'Ollama server URL required (baseUrl)' }
  return { valid: true }
}

export class OllamaEngine implements TranslationEngine {
  readonly type = 'ollama' as const
  readonly name: string

  private baseUrl: string
  private model: string
  private targetLang: string
  private sourceLang: string

  constructor(config: TranslationEngineConfig) {
    const v = validateConfig(config)
    if (!v.valid) throw new Error(v.error)
    this.baseUrl = config.baseUrl!.replace(/\/+$/, '')
    this.model = config.model ?? 'llama3'
    this.targetLang = config.targetLang ?? 'en'
    this.sourceLang = config.sourceLang ?? 'auto'
    this.name = `Ollama (${this.model})`
  }

  async translate(text: string, targetLang?: string, sourceLang?: string): Promise<TranslationResult> {
    const tl = targetLang ?? this.targetLang
    const sl = sourceLang ?? this.sourceLang

    const res = await fetch(`${this.baseUrl}/api/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: this.model,
        messages: [
          { role: 'system', content: `Translate to ${tl}. ${sl === 'auto' ? 'Detect source language.' : `Source: ${sl}.`} Return ONLY the translated text.` },
          { role: 'user', content: text },
        ],
        stream: false,
        options: { temperature: 0.1 },
      }),
    })

    if (!res.ok) {
      const errText = await res.text()
      throw new Error(`Ollama error: ${res.status} ${errText}`)
    }

    const data: OllamaResponse = await res.json()
    return {
      text: data.message?.content?.trim() ?? text,
      sourceLang: sl,
      targetLang: tl,
      detectedLang: sl === 'auto' ? undefined : sl,
    }
  }

  async translateBatch(texts: string[], targetLang?: string, sourceLang?: string): Promise<TranslationResult[]> {
    return Promise.all(texts.map(t => this.translate(t, targetLang, sourceLang)))
  }

  async getSupportedLanguages(): Promise<string[]> {
    return ['any']
  }

  async testConnection(): Promise<boolean> {
    try {
      const res = await fetch(`${this.baseUrl}/api/tags`)
      return res.ok
    } catch { return false }
  }

  destroy(): void {}
}
