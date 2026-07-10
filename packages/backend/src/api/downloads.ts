import { Hono } from 'hono'
import type { DownloadRepository, DownloadJob, DownloadStatus } from '@ireader/core'
import { randomUUID } from 'node:crypto'
import { wsManager } from '../ws/ws-manager.js'

interface DownloadQueueItem {
  chapterId: string
  chapterNumber: number
  chapterTitle?: string
  priority?: number
}

export function createDownloadsRouter(repo: DownloadRepository): Hono {
  const app = new Hono()

  // List all downloads
  app.get('/', async (c) => {
    const status = c.req.query('status')
    const mangaId = c.req.query('mangaId')
    let all = await repo.getAll()
    if (mangaId) all = all.filter(j => j.mangaId === mangaId)
    if (status) all = all.filter(j => j.status === status)
    return c.json(all)
  })

  // List active downloads
  app.get('/active', async (c) => {
    return c.json(await repo.getActive())
  })

  // Get download queue (ordered by priority)
  app.get('/queue', async (c) => {
    return c.json(await repo.getQueue())
  })

  // Get single download
  app.get('/:id', async (c) => {
    const { id } = c.req.param()
    const job = await repo.getById(id)
    if (!job) return c.json({ error: 'Not found', code: 'NOT_FOUND', status: 404 }, 404)
    return c.json(job)
  })

  // Create download job (single)
  app.post('/', async (c) => {
    const body = await c.req.json<{
      sourceId: string
      mangaId: string
      mangaTitle?: string
      chapterId: string
      chapterNumber: number
      chapterTitle?: string
      priority?: number
    }>()
    if (!body.sourceId || !body.mangaId || !body.chapterId) {
      return c.json({ error: 'sourceId, mangaId, and chapterId are required', code: 'VALIDATION_ERROR', status: 400 }, 400)
    }
    const job: DownloadJob = {
      id: randomUUID(),
      sourceId: body.sourceId,
      mangaId: body.mangaId,
      mangaTitle: body.mangaTitle,
      chapterId: body.chapterId,
      chapterNumber: body.chapterNumber ?? 0,
      chapterTitle: body.chapterTitle,
      status: 'queued',
      progress: 0,
      bytesDownloaded: 0,
      priority: body.priority ?? 0,
      retryCount: 0,
      maxRetries: 3,
      createdAt: new Date().toISOString(),
    }
    await repo.add(job)
    wsManager.broadcast('downloads', 'queued', job)
    startDownload(repo, job.id).catch(err => console.error('Download failed:', err))
    return c.json(job, 201)
  })

  // Batch create downloads
  app.post('/batch', async (c) => {
    const body = await c.req.json<{
      sourceId: string
      mangaId: string
      mangaTitle?: string
      chapters: DownloadQueueItem[]
    }>()
    if (!body.sourceId || !body.mangaId || !body.chapters?.length) {
      return c.json({ error: 'sourceId, mangaId, and chapters[] are required', code: 'VALIDATION_ERROR', status: 400 }, 400)
    }
    const now = new Date().toISOString()
    const jobs: DownloadJob[] = body.chapters.map((ch, i) => ({
      id: randomUUID(),
      sourceId: body.sourceId,
      mangaId: body.mangaId,
      mangaTitle: body.mangaTitle,
      chapterId: ch.chapterId,
      chapterNumber: ch.chapterNumber,
      chapterTitle: ch.chapterTitle,
      status: 'queued' as DownloadStatus,
      progress: 0,
      bytesDownloaded: 0,
      priority: ch.priority ?? (body.chapters.length - i),
      retryCount: 0,
      maxRetries: 3,
      createdAt: now,
    }))
    for (const job of jobs) {
      await repo.add(job)
      wsManager.broadcast('downloads', 'queued', job)
    }
    if (jobs.length > 0 && jobs[0]) {
      startDownload(repo, jobs[0].id).catch(err => console.error('Batch download failed:', err))
    }
    return c.json(jobs, 201)
  })

  // Download all unread chapters
  app.post('/download-unread', async (c) => {
    const body = await c.req.json<{
      sourceId: string
      mangaId: string
      mangaTitle?: string
      chapters: Array<{ chapterId: string; chapterNumber: number; chapterTitle?: string; read: boolean }>
    }>()
    if (!body.sourceId || !body.mangaId || !body.chapters?.length) {
      return c.json({ error: 'sourceId, mangaId, and chapters[] are required', code: 'VALIDATION_ERROR', status: 400 }, 400)
    }
    const unread = body.chapters.filter(ch => !ch.read)
    if (unread.length === 0) {
      return c.json({ message: 'No unread chapters', jobs: [] })
    }
    const now = new Date().toISOString()
    const jobs: DownloadJob[] = unread.map((ch, i) => ({
      id: randomUUID(),
      sourceId: body.sourceId,
      mangaId: body.mangaId,
      mangaTitle: body.mangaTitle,
      chapterId: ch.chapterId,
      chapterNumber: ch.chapterNumber,
      chapterTitle: ch.chapterTitle,
      status: 'queued' as DownloadStatus,
      progress: 0,
      bytesDownloaded: 0,
      priority: unread.length - i,
      retryCount: 0,
      maxRetries: 3,
      createdAt: now,
    }))
    for (const job of jobs) {
      await repo.add(job)
      wsManager.broadcast('downloads', 'queued', job)
    }
    if (jobs.length > 0 && jobs[0]) {
      startDownload(repo, jobs[0].id).catch(err => console.error('Unread download failed:', err))
    }
    return c.json({ count: jobs.length, jobs }, 201)
  })

  // Pause download
  app.post('/:id/pause', async (c) => {
    const { id } = c.req.param()
    const job = await repo.getById(id)
    if (!job) return c.json({ error: 'Not found', code: 'NOT_FOUND', status: 404 }, 404)
    if (job.status !== 'downloading' && job.status !== 'queued') {
      return c.json({ error: 'Can only pause queued or downloading jobs', code: 'VALIDATION_ERROR', status: 400 }, 400)
    }
    await repo.update({ id, status: 'paused' })
    wsManager.broadcast('downloads', 'paused', { id })
    return c.json({ success: true })
  })

  // Resume download
  app.post('/:id/resume', async (c) => {
    const { id } = c.req.param()
    const job = await repo.getById(id)
    if (!job) return c.json({ error: 'Not found', code: 'NOT_FOUND', status: 404 }, 404)
    if (job.status !== 'paused') {
      return c.json({ error: 'Can only resume paused downloads', code: 'VALIDATION_ERROR', status: 400 }, 400)
    }
    await repo.update({ id, status: 'queued' })
    wsManager.broadcast('downloads', 'resumed', { id })
    startDownload(repo, id).catch(err => console.error('Resume failed:', err))
    return c.json({ success: true })
  })

  // Pause all downloads
  app.post('/pause-all', async (c) => {
    const active = await repo.getActive()
    let count = 0
    for (const job of active) {
      if (job.status === 'downloading' || job.status === 'queued') {
        await repo.update({ id: job.id, status: 'paused' })
        wsManager.broadcast('downloads', 'paused', { id: job.id })
        count++
      }
    }
    return c.json({ success: true, paused: count })
  })

  // Resume all paused downloads
  app.post('/resume-all', async (c) => {
    const all = await repo.getAll()
    const paused = all.filter(j => j.status === 'paused')
    for (const job of paused) {
      await repo.update({ id: job.id, status: 'queued' })
      wsManager.broadcast('downloads', 'resumed', { id: job.id })
    }
    if (paused.length > 0 && paused[0]) {
      startDownload(repo, paused[0].id).catch(err => console.error('Resume all failed:', err))
    }
    return c.json({ success: true, resumed: paused.length })
  })

  // Cancel download
  app.post('/:id/cancel', async (c) => {
    const { id } = c.req.param()
    const job = await repo.getById(id)
    if (!job) return c.json({ error: 'Not found', code: 'NOT_FOUND', status: 404 }, 404)
    await repo.update({ id, status: 'cancelled', completedAt: new Date().toISOString() })
    wsManager.broadcast('downloads', 'cancelled', { id })
    return c.json({ success: true })
  })

  // Retry failed download
  app.post('/:id/retry', async (c) => {
    const { id } = c.req.param()
    const job = await repo.getById(id)
    if (!job) return c.json({ error: 'Not found', code: 'NOT_FOUND', status: 404 }, 404)
    if (job.status !== 'failed') {
      return c.json({ error: 'Can only retry failed downloads', code: 'VALIDATION_ERROR', status: 400 }, 400)
    }
    const retryCount = job.retryCount + 1
    if (retryCount > job.maxRetries) {
      return c.json({ error: 'Max retries exceeded', code: 'MAX_RETRIES', status: 400 }, 400)
    }
    await repo.update({ id, status: 'queued', progress: 0, bytesDownloaded: 0, error: undefined, retryCount })
    const updated = await repo.getById(id)
    wsManager.broadcast('downloads', 'queued', updated)
    startDownload(repo, id).catch(err => console.error('Download retry failed:', err))
    return c.json(updated)
  })

  // Set priority
  app.post('/:id/priority', async (c) => {
    const { id } = c.req.param()
    const body = await c.req.json<{ priority: number }>()
    const job = await repo.getById(id)
    if (!job) return c.json({ error: 'Not found', code: 'NOT_FOUND', status: 404 }, 404)
    await repo.update({ id, priority: body.priority })
    wsManager.broadcast('downloads', 'priority', { id, priority: body.priority })
    return c.json({ success: true })
  })

  // Reorder queue (batch priority set)
  app.post('/queue/reorder', async (c) => {
    const body = await c.req.json<{ ids: string[] }>()
    if (!body.ids?.length) {
      return c.json({ error: 'ids[] is required', code: 'VALIDATION_ERROR', status: 400 }, 400)
    }
    await repo.updateQueueOrder(body.ids)
    wsManager.broadcast('downloads', 'reordered', { ids: body.ids })
    return c.json({ success: true })
  })

  // Clear completed downloads
  app.post('/clear-completed', async (c) => {
    const all = await repo.getAll()
    for (const job of all) {
      if (job.status === 'completed' || job.status === 'cancelled') {
        await repo.remove(job.id)
      }
    }
    return c.json({ success: true })
  })

  // Delete download record
  app.delete('/:id', async (c) => {
    const { id } = c.req.param()
    await repo.remove(id)
    return c.json({ success: true })
  })

  // Delete by chapter
  app.post('/delete-chapter', async (c) => {
    const body = await c.req.json<{ chapterId: string }>()
    if (!body.chapterId) {
      return c.json({ error: 'chapterId is required', code: 'VALIDATION_ERROR', status: 400 }, 400)
    }
    await repo.removeByChapter(body.chapterId)
    return c.json({ success: true })
  })

  // Delete by manga
  app.post('/delete-manga', async (c) => {
    const body = await c.req.json<{ mangaId: string }>()
    if (!body.mangaId) {
      return c.json({ error: 'mangaId is required', code: 'VALIDATION_ERROR', status: 400 }, 400)
    }
    await repo.removeByManga(body.mangaId)
    return c.json({ success: true })
  })

  // Delete all completed downloads
  app.post('/delete-all-completed', async (c) => {
    const all = await repo.getAll()
    let deleted = 0
    for (const job of all) {
      if (job.status === 'completed') {
        await repo.remove(job.id)
        deleted++
      }
    }
    return c.json({ success: true, deleted })
  })

  // Storage stats
  app.get('/storage/stats', async (c) => {
    const stats = await repo.getStorageStats()
    return c.json(stats)
  })

  return app
}

async function startDownload(repo: DownloadRepository, id: string): Promise<void> {
  const totalSteps = 10
  const MAX_DOWNLOADING = 3

  const active = await repo.getActive()
  const downloading = active.filter(j => j.status === 'downloading').length
  if (downloading >= MAX_DOWNLOADING) return

  for (let step = 1; step <= totalSteps; step++) {
    const current = await repo.getById(id)
    if (!current) return
    if (current.status === 'paused' || current.status === 'cancelled') return

    await repo.update({
      id,
      status: 'downloading',
      progress: Math.round((step / totalSteps) * 100),
      bytesDownloaded: step * 100000,
      totalBytes: totalSteps * 100000,
    })

    wsManager.broadcast('downloads', 'progress', {
      id,
      progress: Math.round((step / totalSteps) * 100),
      bytesDownloaded: step * 100000,
      totalBytes: totalSteps * 100000,
      status: 'downloading',
    })

    await new Promise(resolve => setTimeout(resolve, 200))
  }

  await repo.update({
    id,
    status: 'completed',
    progress: 100,
    completedAt: new Date().toISOString(),
  })

  wsManager.broadcast('downloads', 'completed', { id, status: 'completed', progress: 100 })

  // Start next queued job
  const queue = await repo.getQueue()
  const next = queue.find(j => j.status === 'queued' && j.id !== id)
  if (next) {
    startDownload(repo, next.id).catch(err => console.error('Next download failed:', err))
  }
}
