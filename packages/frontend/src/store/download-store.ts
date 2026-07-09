import { create } from 'zustand'
import { api } from '../api/client'

export interface DownloadJob {
  id: string
  sourceId: string
  mangaId: string
  chapterId: string
  chapterNumber: number
  status: 'queued' | 'downloading' | 'completed' | 'failed' | 'cancelled'
  progress: number
  bytesDownloaded: number
  totalBytes?: number
  error?: string
  createdAt: string
  completedAt?: string
}

interface DownloadStore {
  jobs: DownloadJob[]
  loading: boolean
  error: string | null
  fetchDownloads: () => Promise<void>
  startDownload: (sourceId: string, mangaId: string, chapterId: string, chapterNumber: number) => Promise<void>
  cancelDownload: (id: string) => Promise<void>
  removeDownload: (id: string) => Promise<void>
}

export const useDownloadStore = create<DownloadStore>((set) => ({
  jobs: [],
  loading: false,
  error: null,

  fetchDownloads: async () => {
    set({ loading: true, error: null })
    try {
      const jobs = await api.getDownloads()
      set({ jobs, loading: false })
    } catch (err) {
      set({ error: err instanceof Error ? err.message : 'Failed to load downloads', loading: false })
    }
  },

  startDownload: async (sourceId, mangaId, chapterId, chapterNumber) => {
    try {
      const job = await api.createDownload({ sourceId, mangaId, chapterId, chapterNumber })
      set(state => ({ jobs: [job, ...state.jobs] }))
      // Poll for updates
      pollJob(job.id)
    } catch (err) {
      set({ error: err instanceof Error ? err.message : 'Failed to start download' })
    }
  },

  cancelDownload: async (id) => {
    try {
      await api.cancelDownload(id)
      set(state => ({
        jobs: state.jobs.map(j => j.id === id ? { ...j, status: 'cancelled' as const } : j),
      }))
    } catch (err) {
      set({ error: err instanceof Error ? err.message : 'Failed to cancel download' })
    }
  },

  removeDownload: async (id) => {
    try {
      await api.deleteDownload(id)
      set(state => ({ jobs: state.jobs.filter(j => j.id !== id) }))
    } catch (err) {
      set({ error: err instanceof Error ? err.message : 'Failed to remove download' })
    }
  },
}))

async function pollJob(id: string) {
  const maxPolls = 30
  for (let i = 0; i < maxPolls; i++) {
    await new Promise(r => setTimeout(r, 500))
    try {
      const job = await api.getDownload(id)
      useDownloadStore.setState(state => ({
        jobs: state.jobs.map(j => j.id === id ? job : j),
      }))
      if (job.status === 'completed' || job.status === 'failed' || job.status === 'cancelled') {
        return
      }
    } catch {
      return
    }
  }
}
