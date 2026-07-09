import { Hono } from 'hono'
import type { HistoryRepository, HistoryEntry } from '@ireader/core'
import { randomUUID } from 'node:crypto'

export function createHistoryRouter(repo: HistoryRepository): Hono {
  const app = new Hono()

  // List all history (optionally per manga)
  app.get('/', async (c) => {
    const mangaId = c.req.query('mangaId')
    if (mangaId) {
      return c.json(await repo.getByManga(mangaId))
    }
    return c.json(await repo.getAll())
  })

  // Get latest history entry
  app.get('/latest', async (c) => {
    const latest = await repo.getLatest()
    if (!latest) return c.json(null)
    return c.json(latest)
  })

  // Record/update reading progress
  app.post('/', async (c) => {
    const body = await c.req.json<{
      mangaId: string
      sourceId: string
      chapterId: string
      chapterNumber: number
      chapterTitle?: string
      page: number
      scrollPosition: number
    }>()
    if (!body.mangaId || !body.sourceId || !body.chapterId) {
      return c.json({ error: 'mangaId, sourceId, and chapterId are required', code: 'VALIDATION_ERROR', status: 400 }, 400)
    }
    const entry: HistoryEntry = {
      id: randomUUID(),
      mangaId: body.mangaId,
      sourceId: body.sourceId,
      chapterId: body.chapterId,
      chapterNumber: body.chapterNumber,
      chapterTitle: body.chapterTitle,
      page: body.page,
      scrollPosition: body.scrollPosition,
      readAt: new Date().toISOString(),
    }
    await repo.add(entry)
    return c.json(entry, 201)
  })

  // Delete history for a manga
  app.delete('/:mangaId', async (c) => {
    const { mangaId } = c.req.param()
    await repo.remove(mangaId)
    return c.json({ success: true })
  })

  return app
}
