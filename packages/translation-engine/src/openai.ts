import { TranslationEngine, TranslationEngineConfig, TranslationResult } from './abstraction'

interface OpenAIResponse {
  choices: Array<{ message: { content: string } }>
}

export function validateConfig(config: Partial<TranslationEngineConfig>): { valid: boolean; error?: string } {
  if (!config.apiKey) return { valid: false, error: 'OpenAI API key required' }
  return { valid: true }
}

export class OpenAIEngine implements TranslationEngine {
  readonly type = 'openai' as const
  readonly name: string

  private apiKey: string
  private model: string
  private baseUrl: string
  private targetLang: string
  private sourceLang: string

  constructor(config: TranslationEngineConfig) {
    const v = validateConfig(config)
    if (!v.valid) throw new Error(v.error)
    this.apiKey = config.apiKey!
    this.model = config.model ?? 'gpt-4o-mini'
    this.baseUrl = config.baseUrl ?? 'https://api.openai.com/v1'
    this.targetLang = config.targetLang ?? 'en'
    this.sourceLang = config.sourceLang ?? 'auto'
    this.name = `OpenAI (${this.model})`
  }

  private systemPrompt(targetLang: string, sourceLang: string): string {
    const targetName = targetLang
    const sourceName = sourceLang === 'auto' ? 'the source language' : sourceLang
    return `You are a professional translator. Translate the following text to ${targetName}. ${sourceLang === 'auto' ? 'Detect the source language automatically.' : `The source language is ${sourceName}.`}
Rules:
- Preserve all formatting, line breaks, and punctuation
- Keep proper nouns untranslated
- Maintain the same tone and register (formal/informal)
- Return ONLY the translated text, no explanations or notes
- If the text is already in ${targetName}, return it unchanged`
  }

  async translate(text: string, targetLang?: string, sourceLang?: string): Promise<TranslationResult> {
    const tl = targetLang ?? this.targetLang
    const sl = sourceLang ?? this.sourceLang

    const res = await fetch(`${this.baseUrl}/chat/completions`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: this.model,
        messages: [
          { role: 'system', content: this.systemPrompt(tl, sl) },
          { role: 'user', content: text },
        ],
        temperature: 0.1,
        max_tokens: 4096,
      }),
    })

    if (!res.ok) {
      const errText = await res.text()
      throw new Error(`OpenAI error: ${res.status} ${errText}`)
    }

    const data: OpenAIResponse = await res.json()
    const translatedText = data.choices?.[0]?.message?.content?.trim() ?? text

    return {
      text: translatedText,
      sourceLang: sl,
      targetLang: tl,
      detectedLang: sl === 'auto' ? undefined : sl,
    }
  }

  async translateBatch(texts: string[], targetLang?: string, sourceLang?: string): Promise<TranslationResult[]> {
    const tl = targetLang ?? this.targetLang
    const sl = sourceLang ?? this.sourceLang
    const separator = '\n---SEPARATOR---\n'
    const combined = texts.join(separator)

    const batchPrompt = `Translate each text segment separated by "---SEPARATOR---" to ${tl}. ${sl === 'auto' ? 'Detect the source language automatically.' : `The source language is ${sl}.`}
Rules:
- Return translations separated by the same "---SEPARATOR---" delimiter
- Preserve all formatting, line breaks, and punctuation within each segment
- Keep proper nouns untranslated
- Maintain the same tone and register
- Return ONLY the translated segments, no explanations or notes`

    const res = await fetch(`${this.baseUrl}/chat/completions`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: this.model,
        messages: [
          { role: 'system', content: batchPrompt },
          { role: 'user', content: combined },
        ],
        temperature: 0.1,
        max_tokens: 4096 * Math.min(texts.length, 10),
      }),
    })

    if (!res.ok) {
      const errText = await res.text()
      throw new Error(`OpenAI error: ${res.status} ${errText}`)
    }

    const data: OpenAIResponse = await res.json()
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
