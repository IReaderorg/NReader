import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { MangaSummary } from '../api/client'

export interface UpdateEntry {
  mangaId: string
  title: string
  coverUrl: string
  sourceId: string
  sourceName: string
  chapterNumber: number
  chapterTitle?: string
  updatedAt: string
}

export interface SearchFilters {
  genre?: string
  status?: string
  yearFrom?: number
  yearTo?: number
}

interface ExploreStore {
  genres: string[]
  trending: MangaSummary[]
  recentUpdates: UpdateEntry[]
  browseHistory: string[]
  searchFilters: SearchFilters
  loading: { genres: boolean; trending: boolean; updates: boolean }

  setGenres: (genres: string[]) => void
  setTrending: (manga: MangaSummary[]) => void
  setRecentUpdates: (updates: UpdateEntry[]) => void
  addBrowseHistory: (entry: string) => void
  setSearchFilters: (filters: SearchFilters) => void
  resetSearchFilters: () => void
  setLoading: (key: keyof ExploreStore['loading'], v: boolean) => void
}

export const useExploreStore = create<ExploreStore>()(
  persist(
    (set) => ({
      genres: [],
      trending: [],
      recentUpdates: [],
      browseHistory: [],
      searchFilters: {},
      loading: { genres: false, trending: false, updates: false },

      setGenres: (genres) => set({ genres }),
      setTrending: (manga) => set({ trending: manga }),
      setRecentUpdates: (updates) => set({ recentUpdates: updates }),
      addBrowseHistory: (entry) =>
        set((s) => {
          const filtered = s.browseHistory.filter((e) => e !== entry)
          return { browseHistory: [entry, ...filtered].slice(0, 20) }
        }),
      setSearchFilters: (filters) => set({ searchFilters: filters }),
      resetSearchFilters: () => set({ searchFilters: {} }),
      setLoading: (key, v) =>
        set((s) => ({ loading: { ...s.loading, [key]: v } })),
    }),
    {
      name: 'nreader-explore-store',
      partialize: (state) => ({
        browseHistory: state.browseHistory,
        searchFilters: state.searchFilters,
      }),
    }
  )
)
