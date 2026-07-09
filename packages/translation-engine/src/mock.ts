import { TranslationEngine, TranslationEngineConfig, TranslationResult } from './abstraction'

export class MockTranslationEngine implements TranslationEngine {
  readonly type = 'mock' as const
  readonly name = 'Mock Translator'

  private targetLang: string

  constructor(config?: Partial<TranslationEngineConfig>) {
    this.targetLang = config?.targetLang ?? 'en'
  }

  async translate(text: string, targetLang?: string): Promise<TranslationResult> {
    const lang = targetLang ?? this.targetLang
    // Simulate delay
    await new Promise(r => setTimeout(r, 100 + Math.random() * 200))
    return {
      text: `[${lang}] ${text}`,
      sourceLang: 'auto',
      targetLang: lang,
      detectedLang: 'en'
    }
  }

  async translateBatch(texts: string[], targetLang?: string): Promise<TranslationResult[]> {
    return Promise.all(texts.map(t => this.translate(t, targetLang)))
  }

  async getSupportedLanguages(): Promise<string[]> {
    return ['en', 'es', 'fr', 'de', 'ja', 'ko', 'zh', 'pt', 'ru', 'ar']
  }

  async testConnection(): Promise<boolean> { return true }
  destroy(): void {}
}
