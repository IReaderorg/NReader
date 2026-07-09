import { create } from 'zustand'
import type { GlossaryEntry } from '../api/client'
import { api } from '../api/client'

interface TranslationStore {
  enabled: boolean
  targetLang: string
  sourceLang: string
  engine: 'deepl' | 'mock'
  glossary: GlossaryEntry[]

  setEnabled: (enabled: boolean) => void
  setTargetLang: (lang: string) => void
  setSourceLang: (lang: string) => void
  setEngine: (engine: 'deepl' | 'mock') => void
  loadGlossary: () => Promise<void>
  addGlossaryEntry: (entry: { sourceLang: string; sourceText: string; targetText: string; context?: string }) => Promise<void>
  removeGlossaryEntry: (id: string) => Promise<void>
}

export const useTranslationStore = create<TranslationStore>((set) => ({
  enabled: false,
  targetLang: 'en',
  sourceLang: 'ja',
  engine: 'mock',
  glossary: [],

  setEnabled: (enabled) => set({ enabled }),
  setTargetLang: (targetLang) => set({ targetLang }),
  setSourceLang: (sourceLang) => set({ sourceLang }),
  setEngine: (engine) => set({ engine }),

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
}))