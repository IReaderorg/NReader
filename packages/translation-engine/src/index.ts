export { type TranslationEngine, type TranslationEngineType, type TranslationEngineConfig, type TranslationResult } from './abstraction'
export { MockTranslationEngine } from './mock'
export { DeepLEngine } from './deepl'
export { GoogleTranslateEngine } from './google-translate'
export { LLMTranslationEngine } from './llm'
export { OpenAIEngine, validateConfig as validateOpenAIConfig } from './openai'
export { DeepSeekEngine, validateConfig as validateDeepSeekConfig } from './deepseek'
export { LibreTranslateEngine, validateConfig as validateLibreConfig } from './libre'
export { OllamaEngine, validateConfig as validateOllamaConfig } from './ollama'
export { OpenRouterEngine, validateConfig as validateOpenRouterConfig } from './openrouter'
export { TranslationQueue } from './queue'
export { TranslationCache } from './cache'

import { TranslationEngineConfig, TranslationEngineType } from './abstraction'
import { DeepLEngine } from './deepl'
import { GoogleTranslateEngine } from './google-translate'
import { LLMTranslationEngine } from './llm'
import { OpenAIEngine, validateConfig as validateOpenAIConfig } from './openai'
import { DeepSeekEngine, validateConfig as validateDeepSeekConfig } from './deepseek'
import { LibreTranslateEngine, validateConfig as validateLibreConfig } from './libre'
import { OllamaEngine, validateConfig as validateOllamaConfig } from './ollama'
import { OpenRouterEngine, validateConfig as validateOpenRouterConfig } from './openrouter'
import { MockTranslationEngine } from './mock'

const engineConstructors: Record<TranslationEngineType, new (config: TranslationEngineConfig) => any> = {
  mock: MockTranslationEngine as any,
  deepl: DeepLEngine,
  ai: LLMTranslationEngine,
  openai: OpenAIEngine,
  deepseek: DeepSeekEngine,
  libre: LibreTranslateEngine,
  ollama: OllamaEngine,
  openrouter: OpenRouterEngine,
}

const engineValidators: Record<string, (config: Partial<TranslationEngineConfig>) => { valid: boolean; error?: string }> = {
  mock: () => ({ valid: true }),
  deepl: (c) => c.apiKey ? { valid: true } : { valid: false, error: 'DeepL API key required' },
  ai: (c) => c.apiKey ? { valid: true } : { valid: false, error: 'LLM API key required' },
  openai: validateOpenAIConfig,
  deepseek: validateDeepSeekConfig,
  libre: validateLibreConfig,
  ollama: validateOllamaConfig,
  openrouter: validateOpenRouterConfig,
}

export function validateConfig(type: TranslationEngineType, config: Partial<TranslationEngineConfig>): { valid: boolean; error?: string } {
  const validator = engineValidators[type]
  if (!validator) return { valid: false, error: `Unknown engine type: ${type}` }
  return validator(config)
}

export function createEngine(type: TranslationEngineType, config: TranslationEngineConfig): any {
  const Constructor = engineConstructors[type]
  if (!Constructor) throw new Error(`Unknown engine type: ${type}`)
  return new Constructor(config)
}
