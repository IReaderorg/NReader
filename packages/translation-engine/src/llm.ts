import { TranslationEngine, TranslationEngineConfig, TranslationResult } from './abstraction'

type LLMProvider = 'openai' | 'anthropic'

const LANGUAGE_NAMES: Record<string, string> = {
  en: 'English', es: 'Spanish', fr: 'French', de: 'German', ja: 'Japanese',
  ko: 'Korean', zh: 'Chinese', pt: 'Portuguese', ru: 'Russian', ar: 'Arabic',
  it: 'Italian', nl: 'Dutch', pl: 'Polish', sv: 'Swedish', da: 'Danish',
  fi: 'Finnish', cs: 'Czech', hu: 'Hungarian', ro: 'Romanian', el: 'Greek',
  bg: 'Bulgarian', lt: 'Lithuanian', lv: 'Latvian', sl: 'Slovenian', et: 'Estonian',
  sk: 'Slovak', no: 'Norwegian', uk: 'Ukrainian', id: 'Indonesian', ms: 'Malay',
  th: 'Thai', vi: 'Vietnamese', tr: 'Turkish', hi: 'Hindi', bn: 'Bengali',
  ta: 'Tamil', te: 'Telugu', ur: 'Urdu', fa: 'Persian', he: 'Hebrew',
}

export class LLMTranslationEngine implements TranslationEngine {
  readonly type = 'ai' as const
  readonly name: string

  private provider: LLMProvider
  private apiKey: string
  private model: string
  private targetLang: string
  private sourceLang: string

  constructor(config: TranslationEngineConfig) {
    if (!config.apiKey) throw new Error('LLM API key required')
    this.apiKey = config.apiKey
    this.targetLang = config.targetLang ?? 'en'
    this.sourceLang = config.sourceLang ?? 'auto'

    // Detect provider from key prefix
    if (this.apiKey.startsWith('sk-ant')) {
      this.provider = 'anthropic'
      this.model = 'claude-3-haiku-20240307'
      this.name = 'Claude Translate'
    } else {
      this.provider = 'openai'
      this.model = 'gpt-4o-mini'
      this.name = 'OpenAI Translate'
    }
  }

  async translate(text: string, targetLang?: string, sourceLang?: string): Promise<TranslationResult> {
    const tl = targetLang ?? this.targetLang
    const sl = sourceLang ?? this.sourceLang

    const targetName = LANGUAGE_NAMES[tl] ?? tl
    const sourceName = sl === 'auto' ? 'the source language' : (LANGUAGE_NAMES[sl] ?? sl)

    const systemPrompt = `You are a professional translator. Translate the following text to ${targetName}. ${sl === 'auto' ? 'Detect the source language automatically.' : `The source language is ${sourceName}.`}
Rules:
- Preserve all formatting, line breaks, and punctuation
- Keep proper nouns untranslated
- Maintain the same tone and register (formal/informal)
- Return ONLY the translated text, no explanations or notes
- If the text is already in ${targetName}, return it unchanged`

    const translatedText = await this.callLLM(systemPrompt, text)

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
    const targetName = LANGUAGE_NAMES[tl] ?? tl
    const sourceName = sl === 'auto' ? 'the source language' : (LANGUAGE_NAMES[sl] ?? sl)

    const separator = '\n---SEPARATOR---\n'
    const combined = texts.join(separator)

    const systemPrompt = `You are a professional translator. Translate each text segment separated by "---SEPARATOR---" to ${targetName}. ${sl === 'auto' ? 'Detect the source language automatically.' : `The source language is ${sourceName}.`}
Rules:
- Return translations separated by the same "---SEPARATOR---" delimiter
- Preserve all formatting, line breaks, and punctuation within each segment
- Keep proper nouns untranslated
- Maintain the same tone and register (formal/informal)
- Return ONLY the translated segments, no explanations or notes`

    const result = await this.callLLM(systemPrompt, combined)

    const translations = result.split(separator)
    return texts.map((original, i) => ({
      text: translations[i]?.trim() ?? original,
      sourceLang: sl,
      targetLang: tl,
      detectedLang: sl === 'auto' ? undefined : sl,
    }))
  }

  private async callLLM(systemPrompt: string, userText: string): Promise<string> {
    if (this.provider === 'openai') {
      return this.callOpenAI(systemPrompt, userText)
    }
    return this.callAnthropic(systemPrompt, userText)
  }

  private async callOpenAI(system: string, user: string): Promise<string> {
    const res = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: this.model,
        messages: [
          { role: 'system', content: system },
          { role: 'user', content: user },
        ],
        temperature: 0.1,
        max_tokens: 4096,
      }),
    })

    if (!res.ok) {
      const errText = await res.text()
      throw new Error(`OpenAI error: ${res.status} ${errText}`)
    }

    const data = await res.json()
    return data.choices?.[0]?.message?.content?.trim() ?? user
  }

  private async callAnthropic(system: string, user: string): Promise<string> {
    const res = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'x-api-key': this.apiKey,
        'anthropic-version': '2023-06-01',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: this.model,
        max_tokens: 4096,
        temperature: 0.1,
        system,
        messages: [
          { role: 'user', content: user },
        ],
      }),
    })

    if (!res.ok) {
      const errText = await res.text()
      throw new Error(`Anthropic error: ${res.status} ${errText}`)
    }

    const data = await res.json()
    return data.content?.[0]?.text?.trim() ?? user
  }

  async getSupportedLanguages(): Promise<string[]> {
    return Object.keys(LANGUAGE_NAMES)
  }

  async testConnection(): Promise<boolean> {
    try {
      await this.translate('Hello', 'en', 'auto')
      return true
    } catch {
      return false
    }
  }

  destroy(): void {}
}
