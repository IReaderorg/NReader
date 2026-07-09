import { create } from 'zustand'
import { useEffect } from 'react'
import { api } from '../api/client'
import { useWebSocket } from '../hooks/useWebSocket'

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
  retryDownload: (id: string) => Promise<void>
  removeDownload: (id: string) => Promise<void>
  clearCompleted: () => Promise<void>
  /** Called by WebSocket to update a job in-place */
  updateJob: (data: Partial<DownloadJob> & { id: string }) => void
}

export const useDownloadStore = create<DownloadStore>((set) => ({
  jobs: [],
  loading: false,
  error: null,

  fetchDownloads: async () => {
    set({ loading: true, error: null })
    try {
      const jobs = await api.getDownloads() as DownloadJob[]
      set({ jobs, loading: false })
    } catch (err) {
      set({ error: err instanceof Error ? err.message : 'Failed to load downloads', loading: false })
    }
  },

  startDownload: async (sourceId, mangaId, chapterId, chapterNumber) => {
    try {
      const job = await api.createDownload({ sourceId, mangaId, chapterId, chapterNumber })
      set(state => ({ jobs: [job as DownloadJob, ...state.jobs] }))
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

  retryDownload: async (id) => {
    try {
      const job = await (api as any).retryDownload?.(id) as DownloadJob | undefined
      if (job) {
        set(state => ({
          jobs: state.jobs.map(j => j.id === id ? job : j),
        }))
      }
    } catch (err) {
      set({ error: err instanceof Error ? err.message : 'Failed to retry download' })
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

  clearCompleted: async () => {
    try {
      await api.clearCompletedDownloads()
      set(state => ({ jobs: state.jobs.filter(j => j.status !== 'completed' && j.status !== 'cancelled') }))
    } catch (err) {
      set({ error: err instanceof Error ? err.message : 'Failed to clear completed' })
    }
  },

  updateJob: (data) => {
    set(state => ({
      jobs: state.jobs.map(j => j.id === data.id ? { ...j, ...data } : j),
    }))
  },
}))

// WebSocket hook for download progress — call this in DownloadsPage
let wsRegistered = false
export function useDownloadWs() {
  const { onEvent } = useWebSocket('downloads')
  const updateJob = useDownloadStore(state => state.updateJob)

  useEffect(() => {
    if (wsRegistered) return
    wsRegistered = true

    const unregister = onEvent('downloads', (event, data) => {
      switch (event) {
        case 'progress':
        case 'completed':
        case 'queued':
          updateJob(data as Partial<DownloadJob> & { id: string })
          break
        case 'cancelled':
          updateJob({ id: (data as { id: string }).id, status: 'cancelled' })
          break
      }
    })

    return () => { unregister(); wsRegistered = false }
  }, [onEvent, updateJob])
}
