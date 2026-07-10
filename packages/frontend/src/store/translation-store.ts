import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { GlossaryEntry } from '../api/client'
import { api } from '../api/client'

export interface EngineConfig {
  apiKey?: string
  baseUrl?: string
  model?: string
}

export type EngineType = 'mock' | 'deepl' | 'ai' | 'openai' | 'deepseek' | 'libre' | 'ollama' | 'openrouter'

interface TranslationStore {
  enabled: boolean
  targetLang: string
  sourceLang: string
  engine: EngineType
  glossary: GlossaryEntry[]
  autoTranslate: boolean
  engineConfigs: Record<string, EngineConfig>

  setEnabled: (enabled: boolean) => void
  setTargetLang: (lang: string) => void
  setSourceLang: (lang: string) => void
  setEngine: (engine: EngineType) => void
  setAutoTranslate: (on: boolean) => void
  setEngineConfig: (type: string, config: EngineConfig) => void
  getEngineConfig: (type: string) => EngineConfig
  loadGlossary: () => Promise<void>
  addGlossaryEntry: (entry: { sourceLang: string; sourceText: string; targetText: string; context?: string }) => Promise<void>
  removeGlossaryEntry: (id: string) => Promise<void>
}

export const useTranslationStore = create<TranslationStore>()(
  persist(
    (set, get) => ({
      enabled: false,
      targetLang: 'en',
      sourceLang: 'ja',
      engine: 'mock',
      glossary: [],
      autoTranslate: false,
      engineConfigs: {},

      setEnabled: (enabled) => set({ enabled }),
      setTargetLang: (targetLang) => set({ targetLang }),
      setSourceLang: (sourceLang) => set({ sourceLang }),
      setEngine: (engine) => set({ engine }),
      setAutoTranslate: (autoTranslate) => set({ autoTranslate }),
      setEngineConfig: (type, config) =>
        set(state => ({ engineConfigs: { ...state.engineConfigs, [type]: config } })),
      getEngineConfig: (type) => get().engineConfigs[type] ?? {},

      loadGlossary: async () => {
        try {
          const entries = await api.getGlossary()
          set({ glossary: entries })
        } catch { /* ignore */ }
      },

      addGlossaryEntry: async (entry) => {
        const store = useTranslationStore.getState()
        await api.addGlossaryEntry({
          targetLang: store.targetLang,
          ...entry,
          sourceLang: entry.sourceLang || store.sourceLang,
        })
        store.loadGlossary()
      },

      removeGlossaryEntry: async (id) => {
        await api.deleteGlossaryEntry(id)
        useTranslationStore.getState().loadGlossary()
      }
    }),
    {
      name: 'ireader-translation-storage',
      partialize: (state) => ({
        engineConfigs: state.engineConfigs,
        autoTranslate: state.autoTranslate,
        engine: state.engine,
        targetLang: state.targetLang,
        sourceLang: state.sourceLang,
        enabled: state.enabled,
      }),
    }
  )
)
