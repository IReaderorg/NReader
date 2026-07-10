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
  favorited?: boolean
  archived?: boolean
  dateAdded: string
  categoryIds: string[]
}

export interface Category {
  id: string
  name: string
  sortOrder: number
  color?: string
}

export type SortField = 'title' | 'lastRead' | 'unreadCount' | 'dateAdded' | 'score'
export type SortOrder = 'asc' | 'desc'

export interface LibraryFilters {
  downloaded?: boolean
  unread?: boolean
  completed?: boolean
  ongoing?: boolean
  favorited?: boolean
  archived?: boolean
}

interface LibraryStore {
  entries: LibraryEntry[]
  categories: Category[]
  activeCategoryId: string | null
  loading: boolean
  error: string | null
  sortBy: SortField
  sortOrder: SortOrder
  filters: LibraryFilters
  searchQuery: string
  selectedIds: string[]
  selectionMode: boolean
  metadataDialogId: string | null
  categoryDialogId: string | null

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

  // New actions
  setSortBy: (field: SortField) => void
  setSortOrder: (order: SortOrder) => void
  setFilter: (key: keyof LibraryFilters, value: boolean) => void
  clearFilters: () => void
  setSearchQuery: (q: string) => void
  setBookCategories: (id: string, categoryIds: string[]) => Promise<void>
  setFavorited: (id: string, favorited: boolean) => Promise<void>
  updateMetadata: (id: string, data: { title?: string; author?: string; description?: string; coverUrl?: string }) => Promise<void>
  markAllRead: (id: string) => Promise<void>
  setArchived: (id: string, archived: boolean) => Promise<void>
  toggleSelection: (id: string) => void
  selectAll: () => void
  clearSelection: () => void
  setSelectionMode: (active: boolean) => void
  batchAddCategory: (categoryId: string) => Promise<void>
  batchMarkRead: () => Promise<void>
  batchDelete: () => Promise<void>
  setMetadataDialogId: (id: string | null) => void
  setCategoryDialogId: (id: string | null) => void
  reorderCategories: (categoryIds: string[]) => Promise<void>
}

export const useLibraryStore = create<LibraryStore>((set, get) => ({
  entries: [],
  categories: [],
  activeCategoryId: null,
  loading: false,
  error: null,
  sortBy: 'dateAdded',
  sortOrder: 'desc',
  filters: {},
  searchQuery: '',
  selectedIds: [],
  selectionMode: false,
  metadataDialogId: null,
  categoryDialogId: null,

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

  // New actions
  setSortBy: (field) => set({ sortBy: field }),
  setSortOrder: (order) => set({ sortOrder: order }),
  setFilter: (key, value) => set(state => ({ filters: { ...state.filters, [key]: value } })),
  clearFilters: () => set({ filters: {} }),
  setSearchQuery: (q) => set({ searchQuery: q }),

  setBookCategories: async (id, categoryIds) => {
    try {
      const updated = await api.setBookCategories(id, categoryIds)
      set(state => ({
        entries: state.entries.map(e => e.id === id ? { ...e, ...updated } : e),
      }))
    } catch (err) {
      set({ error: err instanceof Error ? err.message : 'Failed to update categories' })
    }
  },

  setFavorited: async (id, favorited) => {
    try {
      const updated = await api.setFavorited(id, favorited)
      set(state => ({
        entries: state.entries.map(e => e.id === id ? { ...e, ...updated } : e),
      }))
    } catch (err) {
      set({ error: err instanceof Error ? err.message : 'Failed to update favorite' })
    }
  },

  updateMetadata: async (id, data) => {
    try {
      const updated = await api.updateMetadata(id, data)
      set(state => ({
        entries: state.entries.map(e => e.id === id ? { ...e, ...updated } : e),
      }))
      set({ metadataDialogId: null })
    } catch (err) {
      set({ error: err instanceof Error ? err.message : 'Failed to update metadata' })
    }
  },

  markAllRead: async (id) => {
    try {
      await api.markAllRead(id)
      const entry = get().entries.find(e => e.id === id)
      if (entry) {
        set(state => ({
          entries: state.entries.map(e => e.id === id ? { ...e, chaptersRead: e.totalChapters ?? 0 } : e),
        }))
      }
    } catch (err) {
      set({ error: err instanceof Error ? err.message : 'Failed to mark all read' })
    }
  },

  setArchived: async (id, archived) => {
    try {
      const updated = await api.setArchived(id, archived)
      set(state => ({
        entries: state.entries.map(e => e.id === id ? { ...e, ...updated } : e),
      }))
    } catch (err) {
      set({ error: err instanceof Error ? err.message : 'Failed to archive' })
    }
  },

  toggleSelection: (id) => set(state => ({
    selectedIds: state.selectedIds.includes(id)
      ? state.selectedIds.filter(sid => sid !== id)
      : [...state.selectedIds, id],
  })),

  selectAll: () => set(state => ({
    selectedIds: state.entries.map(e => e.id),
  })),

  clearSelection: () => set({ selectedIds: [], selectionMode: false }),

  setSelectionMode: (active) => set({ selectionMode: active, selectedIds: active ? [] : [] }),

  batchAddCategory: async (categoryId) => {
    const { selectedIds, entries } = get()
    for (const id of selectedIds) {
      const entry = entries.find(e => e.id === id)
      if (entry && !entry.categoryIds.includes(categoryId)) {
        await api.setBookCategories(id, [...entry.categoryIds, categoryId])
      }
    }
    // Refresh
    await get().fetchLibrary()
    set({ selectedIds: [], selectionMode: false })
  },

  batchMarkRead: async () => {
    const { selectedIds } = get()
    for (const id of selectedIds) {
      await api.markAllRead(id)
    }
    // Optimistic update
    set(state => ({
      entries: state.entries.map(e =>
        state.selectedIds.includes(e.id) ? { ...e, chaptersRead: e.totalChapters ?? 0 } : e
      ),
      selectedIds: [],
      selectionMode: false,
    }))
  },

  batchDelete: async () => {
    const { selectedIds } = get()
    for (const id of selectedIds) {
      await api.removeFromLibrary(id)
    }
    set(state => ({
      entries: state.entries.filter(e => !state.selectedIds.includes(e.id)),
      selectedIds: [],
      selectionMode: false,
    }))
  },

  setMetadataDialogId: (id) => set({ metadataDialogId: id }),
  setCategoryDialogId: (id) => set({ categoryDialogId: id }),

  reorderCategories: async (categoryIds) => {
    try {
      await api.reorderCategories(categoryIds)
      set(state => ({
        categories: categoryIds.map((id, i) => {
          const cat = state.categories.find(c => c.id === id)
          return cat ? { ...cat, sortOrder: i } : cat!
        }).filter(Boolean) as Category[],
      }))
    } catch (err) {
      set({ error: err instanceof Error ? err.message : 'Failed to reorder categories' })
    }
  },
}))
