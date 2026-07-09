import { create } from 'zustand'
import { api } from '../api/client'

export interface LibraryEntry {
  id: string
  sourceId: string
  mangaId: string
  title: string
  coverUrl: string
  author?: string
  status?: string
  rating?: number
  genres: string[]
  description?: string
  lastReadAt?: string
  chaptersRead: number
  totalChapters?: number
  score?: number
  dateAdded: string
  categoryIds: string[]
}

export interface Category {
  id: string
  name: string
  sortOrder: number
  color?: string
}

interface LibraryStore {
  entries: LibraryEntry[]
  categories: Category[]
  activeCategoryId: string | null
  loading: boolean
  error: string | null
  fetchLibrary: () => Promise<void>
  addToLibrary: (entry: {
    sourceId: string
    mangaId: string
    title: string
    coverUrl?: string
    author?: string
    status?: string
    genres?: string[]
    description?: string
    totalChapters?: number
    categoryId?: string
  }) => Promise<void>
  removeFromLibrary: (id: string) => Promise<void>
  updateEntry: (id: string, data: Partial<LibraryEntry>) => Promise<void>
  setActiveCategory: (id: string | null) => void
  fetchCategories: () => Promise<void>
  createCategory: (name: string, color?: string) => Promise<void>
  deleteCategory: (id: string) => Promise<void>
}

export const useLibraryStore = create<LibraryStore>((set) => ({
  entries: [],
  categories: [],
  activeCategoryId: null,
  loading: false,
  error: null,

  fetchLibrary: async () => {
    set({ loading: true, error: null })
    try {
      const entries = await api.getLibrary()
      set({ entries, loading: false })
    } catch (err) {
      set({ error: err instanceof Error ? err.message : 'Failed to load library', loading: false })
    }
  },

  addToLibrary: async (entry) => {
    set({ loading: true, error: null })
    try {
      const created = await api.addToLibrary(entry)
      set(state => ({ entries: [created, ...state.entries], loading: false }))
    } catch (err) {
      set({ error: err instanceof Error ? err.message : 'Failed to add to library', loading: false })
    }
  },

  removeFromLibrary: async (id) => {
    try {
      await api.removeFromLibrary(id)
      set(state => ({ entries: state.entries.filter(e => e.id !== id) }))
    } catch (err) {
      set({ error: err instanceof Error ? err.message : 'Failed to remove' })
    }
  },

  updateEntry: async (id, data) => {
    try {
      const updated = await api.updateLibraryEntry(id, data)
      set(state => ({
        entries: state.entries.map(e => e.id === id ? { ...e, ...updated } : e),
      }))
    } catch (err) {
      set({ error: err instanceof Error ? err.message : 'Failed to update' })
    }
  },

  setActiveCategory: (id) => set({ activeCategoryId: id }),

  fetchCategories: async () => {
    try {
      const categories = await api.getCategories()
      set({ categories })
    } catch (err) {
      console.error('Failed to load categories', err)
    }
  },

  createCategory: async (name, color) => {
    try {
      const category = await api.createCategory(name, color)
      set(state => ({ categories: [...state.categories, category] }))
    } catch (err) {
      set({ error: err instanceof Error ? err.message : 'Failed to create category' })
    }
  },

  deleteCategory: async (id) => {
    try {
      await api.deleteCategory(id)
      set(state => ({
        categories: state.categories.filter(c => c.id !== id),
        entries: state.entries.map(e => ({
          ...e,
          categoryIds: e.categoryIds.filter(cid => cid !== id),
        })),
      }))
    } catch (err) {
      set({ error: err instanceof Error ? err.message : 'Failed to delete category' })
    }
  },
}))
