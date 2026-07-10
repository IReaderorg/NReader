import { TranslationEngine, TranslationEngineConfig, TranslationResult } from './abstraction'

interface OpenRouterResponse {
  choices: Array<{ message: { content: string } }>
  error?: { message: string }
}

export function validateConfig(config: Partial<TranslationEngineConfig>): { valid: boolean; error?: string } {
  if (!config.apiKey) return { valid: false, error: 'OpenRouter API key required' }
  return { valid: true }
}

export class OpenRouterEngine implements TranslationEngine {
  readonly type = 'openrouter' as const
  readonly name: string

  private apiKey: string
  private model: string
  private targetLang: string
  private sourceLang: string

  constructor(config: TranslationEngineConfig) {
    const v = validateConfig(config)
    if (!v.valid) throw new Error(v.error)
    this.apiKey = config.apiKey!
    this.model = config.model ?? 'openai/gpt-4o-mini'
    this.targetLang = config.targetLang ?? 'en'
    this.sourceLang = config.sourceLang ?? 'auto'
    this.name = `OpenRouter (${this.model})`
  }

  async translate(text: string, targetLang?: string, sourceLang?: string): Promise<TranslationResult> {
    const tl = targetLang ?? this.targetLang
    const sl = sourceLang ?? this.sourceLang

    const res = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: this.model,
        messages: [
          { role: 'system', content: `Translate to ${tl}. ${sl === 'auto' ? 'Detect source language.' : `Source: ${sl}.`} Return ONLY the translated text.` },
          { role: 'user', content: text },
        ],
        temperature: 0.1,
        max_tokens: 4096,
      }),
    })

    if (!res.ok) {
      const errText = await res.text()
      throw new Error(`OpenRouter error: ${res.status} ${errText}`)
    }

    const data: OpenRouterResponse = await res.json()
    if (data.error) throw new Error(`OpenRouter error: ${data.error.message}`)

    return {
      text: data.choices?.[0]?.message?.content?.trim() ?? text,
      sourceLang: sl,
      targetLang: tl,
      detectedLang: sl === 'auto' ? undefined : sl,
    }
  }

  async translateBatch(texts: string[], targetLang?: string, sourceLang?: string): Promise<TranslationResult[]> {
    const tl = targetLang ?? this.targetLang
    const sl = sourceLang ?? this.sourceLang
    const separator = '\n---SEP---\n'
    const combined = texts.join(separator)

    const res = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: this.model,
        messages: [
          { role: 'system', content: `Translate each segment separated by "---SEP---" to ${tl}. Return translations separated by "---SEP---". Only translated text.` },
          { role: 'user', content: combined },
        ],
        temperature: 0.1,
        max_tokens: 4096 * Math.min(texts.length, 10),
      }),
    })

    if (!res.ok) {
      const errText = await res.text()
      throw new Error(`OpenRouter error: ${res.status} ${errText}`)
    }

    const data: OpenRouterResponse = await res.json()
    if (data.error) throw new Error(`OpenRouter error: ${data.error.message}`)

    const result = data.choices?.[0]?.message?.content?.trim() ?? ''
    const translations = result.split(separator)

    return texts.map((original, i) => ({
      text: translations[i]?.trim() ?? original,
      sourceLang: sl,
      targetLang: tl,
      detectedLang: sl === 'auto' ? undefined : sl,
    }))
  }

  async getSupportedLanguages(): Promise<string[]> {
    return ['any']
  }

  async testConnection(): Promise<boolean> {
    try {
      await this.translate('Hello', 'en', 'auto')
      return true
    } catch { return false }
  }

  destroy(): void {}
}
