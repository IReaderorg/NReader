import { Hono } from 'hono'
import type { HistoryRepository, HistoryEntry } from '@ireader/core'
import { ValidationError } from '@ireader/core'
import { randomUUID } from 'node:crypto'

export function createHistoryRouter(repo: HistoryRepository): Hono {
  const app = new Hono()

  // List all history (optionally per manga, or search by query)
  app.get('/', async (c) => {
    const mangaId = c.req.query('mangaId')
    const query = c.req.query('q')
    if (query) {
      const all = await repo.getAll()
      const q = query.toLowerCase()
      return c.json(all.filter(e =>
        e.mangaId.toLowerCase().includes(q) ||
        (e.chapterTitle && e.chapterTitle.toLowerCase().includes(q))
      ))
    }
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

  // Get continue reading list (last entry per manga, sorted by readAt desc)
  app.get('/continue-reading', async (c) => {
    const all = await repo.getAll()
    const latestPerManga = new Map<string, HistoryEntry>()
    for (const entry of all) {
      const existing = latestPerManga.get(entry.mangaId)
      if (!existing || new Date(entry.readAt) > new Date(existing.readAt)) {
        latestPerManga.set(entry.mangaId, entry)
      }
    }
    const sorted = Array.from(latestPerManga.values())
      .sort((a, b) => new Date(b.readAt).getTime() - new Date(a.readAt).getTime())
    return c.json(sorted)
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
      throw new ValidationError('mangaId, sourceId, and chapterId are required')
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
