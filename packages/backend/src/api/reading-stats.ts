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

  // Time-series stats
  app.get('/daily', (c: any) => {
    const from = c.req.query('from')
    const to = c.req.query('to')
    const allStats = Array.from(statsMap.values())
    const grouped: Record<string, { totalTimeMs: number; chaptersRead: number; count: number }> = {}

    for (const s of allStats) {
      const d = new Date(s.lastReadAt)
      const key = d.toISOString().slice(0, 10)
      if (!grouped[key]) grouped[key] = { totalTimeMs: 0, chaptersRead: 0, count: 0 }
      grouped[key].totalTimeMs += s.totalTimeMs
      grouped[key].chaptersRead += s.chaptersRead
      grouped[key].count++
    }

    return c.json({
      type: 'daily',
      data: Object.entries(grouped)
        .map(([date, val]) => ({ date, ...val }))
        .sort((a, b) => a.date.localeCompare(b.date)),
    })
  })

  app.get('/weekly', (c: any) => {
    const allStats = Array.from(statsMap.values())
    const grouped: Record<string, { totalTimeMs: number; chaptersRead: number; count: number }> = {}

    for (const s of allStats) {
      const d = new Date(s.lastReadAt)
      const weekStart = new Date(d)
      weekStart.setDate(d.getDate() - d.getDay())
      const key = weekStart.toISOString().slice(0, 10)
      if (!grouped[key]) grouped[key] = { totalTimeMs: 0, chaptersRead: 0, count: 0 }
      grouped[key].totalTimeMs += s.totalTimeMs
      grouped[key].chaptersRead += s.chaptersRead
      grouped[key].count++
    }

    return c.json({
      type: 'weekly',
      data: Object.entries(grouped)
        .map(([date, val]) => ({ date, ...val }))
        .sort((a, b) => a.date.localeCompare(b.date)),
    })
  })

  app.get('/monthly', (c: any) => {
    const allStats = Array.from(statsMap.values())
    const grouped: Record<string, { totalTimeMs: number; chaptersRead: number; count: number }> = {}

    for (const s of allStats) {
      const d = new Date(s.lastReadAt)
      const key = d.toISOString().slice(0, 7)
      if (!grouped[key]) grouped[key] = { totalTimeMs: 0, chaptersRead: 0, count: 0 }
      grouped[key].totalTimeMs += s.totalTimeMs
      grouped[key].chaptersRead += s.chaptersRead
      grouped[key].count++
    }

    return c.json({
      type: 'monthly',
      data: Object.entries(grouped)
        .map(([date, val]) => ({ date, ...val }))
        .sort((a, b) => a.date.localeCompare(b.date)),
    })
  })

  // Library insights
  app.get('/insights', (c: any) => {
    const allStats = Array.from(statsMap.values())
    const now = new Date()
    const monthStart = new Date(now.getFullYear(), now.getMonth(), 1)

    const totalBooksRead = allStats.filter(s => s.chaptersRead > 0).length
    const totalChapters = allStats.reduce((sum, s) => sum + s.chaptersRead, 0)
    const totalTime = allStats.reduce((sum, s) => sum + s.totalTimeMs, 0)
    const completedThisMonth = allStats.filter(s => s.chaptersRead > 0 && new Date(s.lastReadAt) >= monthStart).length
    const longestStreak = calculateStreak(allStats)

    return c.json({
      totalBooksRead,
      totalChapters,
      totalTimeMs: totalTime,
      completedThisMonth,
      streakLength: longestStreak,
    })
  })

  // Recommendations
  app.get('/recommendations', (c: any) => {
    const sorted = Array.from(statsMap.values())
      .sort((a, b) => b.chaptersRead - a.chaptersRead)
      .slice(0, 10)
      .map(s => ({
        mangaId: s.mangaId,
        sourceId: s.sourceId,
        chaptersRead: s.chaptersRead,
        totalTimeMs: s.totalTimeMs,
      }))

    return c.json(sorted)
  })

  // Get stats for a manga
  app.get('/:mangaId', (c: any) => {
    const mangaId = c.req.param('mangaId')
    const stats = statsMap.get(mangaId)
    if (!stats) {
      return c.json({ mangaId, sourceId: '', totalTimeMs: 0, chaptersRead: 0, lastReadAt: '' })
    }
    return c.json(stats)
  })

  // Get all stats
  app.get('/', (c: any) => {
    return c.json(Array.from(statsMap.values()))
  })

  // Record/update stats
  app.post('/', async (c: any) => {
    const body = await c.req.json()
    if (!body.mangaId || !body.sourceId) {
      return c.json({ error: 'mangaId and sourceId are required', code: 'VALIDATION_ERROR', status: 400 }, 400)
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

function calculateStreak(stats: ReadingStats[]): number {
  if (stats.length === 0) return 0
  const dates = stats
    .map(s => new Date(s.lastReadAt).toISOString().slice(0, 10))
    .filter((v, i, a) => a.indexOf(v) === i)
    .sort()
    .reverse()

  let streak = 0
  const today = new Date().toISOString().slice(0, 10)
  let expected = today

  for (const date of dates) {
    if (date === expected) {
      streak++
      const d = new Date(expected)
      d.setDate(d.getDate() - 1)
      expected = d.toISOString().slice(0, 10)
    } else {
      if (streak === 0) {
        const yesterday = new Date()
        yesterday.setDate(yesterday.getDate() - 1)
        if (date === yesterday.toISOString().slice(0, 10)) {
          streak++
          const d = new Date(date)
          d.setDate(d.getDate() - 1)
          expected = d.toISOString().slice(0, 10)
          continue
        }
      }
      break
    }
  }

  return streak
}
