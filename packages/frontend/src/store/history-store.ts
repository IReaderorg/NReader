import { create } from 'zustand'
import { api } from '../api/client'

export interface HistoryEntry {
  id: string
  mangaId: string
  sourceId: string
  chapterId: string
  chapterNumber: number
  chapterTitle?: string
  page: number
  scrollPosition: number
  readAt: string
}

interface HistoryStore {
  entries: HistoryEntry[]
  loading: boolean
  error: string | null
  fetchHistory: () => Promise<void>
  recordProgress: (entry: {
    mangaId: string
    sourceId: string
    chapterId: string
    chapterNumber: number
    chapterTitle?: string
    page: number
    scrollPosition: number
  }) => Promise<void>
  clearMangaHistory: (mangaId: string) => Promise<void>
}

export const useHistoryStore = create<HistoryStore>((set) => ({
  entries: [],
  loading: false,
  error: null,

  fetchHistory: async () => {
    set({ loading: true, error: null })
    try {
      const entries = await api.getHistory()
      set({ entries, loading: false })
    } catch (err) {
      set({ error: err instanceof Error ? err.message : 'Failed to load history', loading: false })
    }
  },

  recordProgress: async (entry) => {
    try {
      const created = await api.recordHistory(entry)
      set(state => {
        // Move to top, remove duplicates
        const filtered = state.entries.filter(e => e.chapterId !== entry.chapterId)
        return { entries: [created, ...filtered] }
      })
    } catch (err) {
      console.error('Failed to record history', err)
    }
  },

  clearMangaHistory: async (mangaId) => {
    try {
      await api.deleteHistory(mangaId)
      set(state => ({
        entries: state.entries.filter(e => e.mangaId !== mangaId),
      }))
    } catch (err) {
      set({ error: err instanceof Error ? err.message : 'Failed to clear history' })
    }
  },
}))
