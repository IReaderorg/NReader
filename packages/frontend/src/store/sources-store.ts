import { create } from 'zustand'

interface Source {
  id: string
  name: string
  lang: string
}

interface SourcesStore {
  sources: Source[]
  loading: boolean
  error: string | null
  fetchSources: () => Promise<void>
}

export const useSourcesStore = create<SourcesStore>((set) => ({
  sources: [],
  loading: false,
  error: null,
  fetchSources: async () => {
    set({ loading: true, error: null })
    try {
      const res = await fetch('/api/v1/sources')
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      const data = await res.json()
      set({ sources: data, loading: false })
    } catch (err) {
      set({ error: err instanceof Error ? err.message : 'Unknown error', loading: false })
    }
  },
}))
