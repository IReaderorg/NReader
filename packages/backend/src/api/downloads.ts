import { Hono } from 'hono'
import type { DownloadRepository, DownloadJob } from '@ireader/core'
import { randomUUID } from 'node:crypto'
import { wsManager } from '../ws/ws-manager.js'

export function createDownloadsRouter(repo: DownloadRepository): Hono {
  const app = new Hono()

  // List all downloads
  app.get('/', async (c) => {
    const status = c.req.query('status')
    const all = await repo.getAll()
    if (status) return c.json(all.filter(d => d.status === status))
    return c.json(all)
  })

  // List active downloads
  app.get('/active', async (c) => {
    return c.json(await repo.getActive())
  })

  // Get single download
  app.get('/:id', async (c) => {
    const { id } = c.req.param()
    const job = await repo.getById(id)
    if (!job) return c.json({ error: 'Not found', code: 'NOT_FOUND', status: 404 }, 404)
    return c.json(job)
  })

  // Create download job
  app.post('/', async (c) => {
    const body = await c.req.json<{
      sourceId: string
      mangaId: string
      chapterId: string
      chapterNumber: number
    }>()
    if (!body.sourceId || !body.mangaId || !body.chapterId) {
      return c.json({ error: 'sourceId, mangaId, and chapterId are required', code: 'VALIDATION_ERROR', status: 400 }, 400)
    }
    const job: DownloadJob = {
      id: randomUUID(),
      sourceId: body.sourceId,
      mangaId: body.mangaId,
      chapterId: body.chapterId,
      chapterNumber: body.chapterNumber ?? 0,
      status: 'queued',
      progress: 0,
      bytesDownloaded: 0,
      createdAt: new Date().toISOString(),
    }
    await repo.add(job)

    // Broadcast queued event
    wsManager.broadcast('downloads', 'queued', job)

    // Simulate download progress in background
    simulateDownload(repo, job.id).catch(err => console.error('Download failed:', err))

    return c.json(job, 201)
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
    await repo.update({ id, status: 'queued', progress: 0, bytesDownloaded: 0, error: undefined })
    const updated = await repo.getById(id)
    simulateDownload(repo, id).catch(err => console.error('Download retry failed:', err))
    return c.json(updated)
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

  return app
}

async function simulateDownload(repo: DownloadRepository, id: string): Promise<void> {
  const totalSteps = 10
  for (let step = 1; step <= totalSteps; step++) {
    const current = await repo.getById(id)
    if (!current || current.status === 'cancelled') return

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
}
