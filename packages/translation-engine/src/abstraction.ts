export interface TranslationResult {
  text: string
  sourceLang: string
  targetLang: string
  detectedLang?: string
}

export type TranslationEngineType = 'deepl' | 'ai' | 'mock'

export interface TranslationEngineConfig {
  type: TranslationEngineType
  apiKey?: string
  targetLang?: string
  sourceLang?: string
}

export interface TranslationEngine {
  readonly type: TranslationEngineType
  readonly name: string
  translate(text: string, targetLang?: string, sourceLang?: string): Promise<TranslationResult>
  translateBatch(texts: string[], targetLang?: string, sourceLang?: string): Promise<TranslationResult[]>
  getSupportedLanguages(): Promise<string[]>
  testConnection(): Promise<boolean>
  destroy(): void
}
