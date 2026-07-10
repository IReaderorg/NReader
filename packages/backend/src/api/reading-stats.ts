import { Hono } from 'hono'

interface ReadingStats {
  mangaId: string
  sourceId: string
  totalTimeMs: number
  chaptersRead: number
  lastReadAt: string
}

const statsMap = new Map<string, ReadingStats>()

export function createReadingStatsRouter(): Hono {
  const app = new Hono()

  // Get stats for a manga
  app.get('/:mangaId', (c) => {
    const mangaId = c.req.param('mangaId')
    const stats = statsMap.get(mangaId)
    if (!stats) {
      return c.json({
        mangaId,
        sourceId: '',
        totalTimeMs: 0,
        chaptersRead: 0,
        lastReadAt: '',
      })
    }
    return c.json(stats)
  })

  // Get all stats
  app.get('/', (c) => {
    return c.json(Array.from(statsMap.values()))
  })

  // Record/update stats for a manga
  app.post('/', async (c) => {
    const body = await c.req.json<{
      mangaId: string
      sourceId: string
      totalTimeMs?: number
      chaptersRead?: number
    }>()

    if (!body.mangaId || !body.sourceId) {
      return c.json({
        error: 'mangaId and sourceId are required',
        code: 'VALIDATION_ERROR',
        status: 400,
      }, 400)
    }

    const existing = statsMap.get(body.mangaId)
    const now = new Date().toISOString()

    const stats: ReadingStats = {
      mangaId: body.mangaId,
      sourceId: body.sourceId,
      totalTimeMs: (existing?.totalTimeMs ?? 0) + (body.totalTimeMs ?? 0),
      chaptersRead: (existing?.chaptersRead ?? 0) + (body.chaptersRead ?? 0),
      lastReadAt: now,
    }

    statsMap.set(body.mangaId, stats)
    return c.json(stats, 201)
  })

  return app
}
