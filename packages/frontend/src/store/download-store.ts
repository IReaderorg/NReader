import { create } from 'zustand'
import { useEffect } from 'react'
import { api } from '../api/client'
import { useWebSocket } from '../hooks/useWebSocket'

export type DownloadStatus = 'queued' | 'downloading' | 'paused' | 'completed' | 'failed' | 'cancelled'

export interface DownloadJob {
  id: string
  sourceId: string
  mangaId: string
  mangaTitle?: string
  chapterId: string
  chapterNumber: number
  chapterTitle?: string
  status: DownloadStatus
  progress: number
  bytesDownloaded: number
  totalBytes?: number
  priority: number
  retryCount: number
  maxRetries: number
  error?: string
  createdAt: string
  completedAt?: string
}

interface StorageStats {
  totalBytes: number
  totalChapters: number
  mangaCount: number
}

interface DownloadStore {
  jobs: DownloadJob[]
  loading: boolean
  error: string | null
  storageStats: StorageStats | null
  fetchDownloads: (params?: { status?: string; mangaId?: string }) => Promise<void>
  fetchQueue: () => Promise<void>
  fetchStorageStats: () => Promise<void>
  startDownload: (sourceId: string, mangaId: string, chapterId: string, chapterNumber: number, opts?: { mangaTitle?: string; chapterTitle?: string; priority?: number }) => Promise<void>
  batchDownload: (sourceId: string, mangaId: string, chapters: Array<{ chapterId: string; chapterNumber: number; chapterTitle?: string }>, mangaTitle?: string) => Promise<void>
  downloadUnreadChapters: (sourceId: string, mangaId: string, chapters: Array<{ chapterId: string; chapterNumber: number; chapterTitle?: string; read: boolean }>, mangaTitle?: string) => Promise<void>
  pauseDownload: (id: string) => Promise<void>
  resumeDownload: (id: string) => Promise<void>
  pauseAllDownloads: () => Promise<void>
  resumeAllDownloads: () => Promise<void>
  cancelDownload: (id: string) => Promise<void>
  retryDownload: (id: string) => Promise<void>
  setPriority: (id: string, priority: number) => Promise<void>
  removeDownload: (id: string) => Promise<void>
  clearCompleted: () => Promise<void>
  deleteCompletedDownloads: () => Promise<void>
  deleteByChapter: (chapterId: string) => Promise<void>
  deleteByManga: (mangaId: string) => Promise<void>
  updateJob: (data: Partial<DownloadJob> & { id: string }) => void
}

export const useDownloadStore = create<DownloadStore>((set) => ({
  jobs: [],
  loading: false,
  error: null,
  storageStats: null,

  fetchDownloads: async (params) => {
    set({ loading: true, error: null })
    try {
      const jobs = await api.getDownloads(params) as DownloadJob[]
      set({ jobs, loading: false })
    } catch (err) {
      set({ error: err instanceof Error ? err.message : 'Failed to load downloads', loading: false })
    }
  },

  fetchQueue: async () => {
    try {
      const jobs = await api.getDownloadQueue() as DownloadJob[]
      set({ jobs })
    } catch (err) {
      set({ error: err instanceof Error ? err.message : 'Failed to load queue' })
    }
  },

  fetchStorageStats: async () => {
    try {
      const stats = await api.getDownloadStorageStats()
      set({ storageStats: stats })
    } catch { /* ignore */ }
  },

  startDownload: async (sourceId, mangaId, chapterId, chapterNumber, opts) => {
    try {
      const job = await api.createDownload({
        sourceId, mangaId, chapterId, chapterNumber,
        mangaTitle: opts?.mangaTitle,
        chapterTitle: opts?.chapterTitle,
        priority: opts?.priority,
      })
      set((state) => ({ jobs: [job as DownloadJob, ...state.jobs] }))
    } catch (err) {
      set({ error: err instanceof Error ? err.message : 'Failed to start download' })
    }
  },

  batchDownload: async (sourceId, mangaId, chapters, mangaTitle) => {
    try {
      const jobs = await api.batchCreateDownloads({ sourceId, mangaId, mangaTitle, chapters })
      set((state) => ({ jobs: [...(jobs as DownloadJob[]), ...state.jobs] }))
    } catch (err) {
      set({ error: err instanceof Error ? err.message : 'Failed to batch download' })
    }
  },

  downloadUnreadChapters: async (sourceId, mangaId, chapters, mangaTitle) => {
    try {
      const result = await api.downloadUnreadChapters({ sourceId, mangaId, mangaTitle, chapters })
      set((state) => ({ jobs: [...(result.jobs as DownloadJob[]), ...state.jobs] }))
    } catch (err) {
      set({ error: err instanceof Error ? err.message : 'Failed to download unread' })
    }
  },

  pauseDownload: async (id) => {
    try {
      await api.pauseDownload(id)
      set((state) => ({
        jobs: state.jobs.map((j) => j.id === id ? { ...j, status: 'paused' as const } : j),
      }))
    } catch (err) {
      set({ error: err instanceof Error ? err.message : 'Failed to pause download' })
    }
  },

  resumeDownload: async (id) => {
    try {
      await api.resumeDownload(id)
      set((state) => ({
        jobs: state.jobs.map((j) => j.id === id ? { ...j, status: 'queued' as const } : j),
      }))
    } catch (err) {
      set({ error: err instanceof Error ? err.message : 'Failed to resume download' })
    }
  },

  pauseAllDownloads: async () => {
    try {
      await api.pauseAllDownloads()
      set((state) => ({
        jobs: state.jobs.map((j) =>
          j.status === 'downloading' || j.status === 'queued' ? { ...j, status: 'paused' as const } : j
        ),
      }))
    } catch (err) {
      set({ error: err instanceof Error ? err.message : 'Failed to pause all' })
    }
  },

  resumeAllDownloads: async () => {
    try {
      await api.resumeAllDownloads()
      set((state) => ({
        jobs: state.jobs.map((j) =>
          j.status === 'paused' ? { ...j, status: 'queued' as const } : j
        ),
      }))
    } catch (err) {
      set({ error: err instanceof Error ? err.message : 'Failed to resume all' })
    }
  },

  cancelDownload: async (id) => {
    try {
      await api.cancelDownload(id)
      set((state) => ({
        jobs: state.jobs.map((j) => j.id === id ? { ...j, status: 'cancelled' as const } : j),
      }))
    } catch (err) {
      set({ error: err instanceof Error ? err.message : 'Failed to cancel download' })
    }
  },

  retryDownload: async (id) => {
    try {
      const job = await api.retryDownload(id) as DownloadJob | undefined
      if (job) {
        set((state) => ({
          jobs: state.jobs.map((j) => j.id === id ? job : j),
        }))
      }
    } catch (err) {
      set({ error: err instanceof Error ? err.message : 'Failed to retry download' })
    }
  },

  setPriority: async (id, priority) => {
    try {
      await api.setDownloadPriority(id, priority)
      set((state) => ({
        jobs: state.jobs.map((j) => j.id === id ? { ...j, priority } : j),
      }))
    } catch (err) {
      set({ error: err instanceof Error ? err.message : 'Failed to set priority' })
    }
  },

  removeDownload: async (id) => {
    try {
      await api.deleteDownload(id)
      set((state) => ({ jobs: state.jobs.filter((j) => j.id !== id) }))
    } catch (err) {
      set({ error: err instanceof Error ? err.message : 'Failed to remove download' })
    }
  },

  clearCompleted: async () => {
    try {
      await api.clearCompletedDownloads()
      set((state) => ({ jobs: state.jobs.filter((j) => j.status !== 'completed' && j.status !== 'cancelled') }))
    } catch (err) {
      set({ error: err instanceof Error ? err.message : 'Failed to clear completed' })
    }
  },

  deleteCompletedDownloads: async () => {
    try {
      await api.deleteAllCompletedDownloads()
      set((state) => ({ jobs: state.jobs.filter((j) => j.status !== 'completed') }))
    } catch (err) {
      set({ error: err instanceof Error ? err.message : 'Failed to delete completed' })
    }
  },

  deleteByChapter: async (chapterId) => {
    try {
      await api.deleteDownloadByChapter(chapterId)
      set((state) => ({ jobs: state.jobs.filter((j) => j.chapterId !== chapterId) }))
    } catch (err) {
      set({ error: err instanceof Error ? err.message : 'Failed to delete chapter downloads' })
    }
  },

  deleteByManga: async (mangaId) => {
    try {
      await api.deleteDownloadByManga(mangaId)
      set((state) => ({ jobs: state.jobs.filter((j) => j.mangaId !== mangaId) }))
    } catch (err) {
      set({ error: err instanceof Error ? err.message : 'Failed to delete manga downloads' })
    }
  },

  updateJob: (data) => {
    set((state) => ({
      jobs: state.jobs.map((j) => j.id === data.id ? { ...j, ...data } : j),
    }))
  },
}))

// WebSocket hook for download progress — call this in DownloadsPage
let wsRegistered = false
export function useDownloadWs() {
  const { onEvent } = useWebSocket('downloads')
  const updateJob = useDownloadStore((state) => state.updateJob)

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
        case 'paused':
          updateJob({ id: (data as { id: string }).id, status: 'paused' })
          break
        case 'resumed':
          updateJob({ id: (data as { id: string }).id, status: 'queued' })
          break
        case 'cancelled':
          updateJob({ id: (data as { id: string }).id, status: 'cancelled' })
          break
        case 'failed':
          updateJob({ id: (data as { id: string }).id, status: 'failed' })
          break
      }
    })

    return () => { unregister(); wsRegistered = false }
  }, [onEvent, updateJob])
}
