import { Hono } from 'hono'
import type { SettingsRepository } from '@ireader/core'

interface ReadingStats {
  mangaId: string
  sourceId: string
  totalTimeMs: number
  chaptersRead: number
  lastReadAt: string
}

function loadStats(repo: SettingsRepository): Promise<ReadingStats[]> {
  return repo.get('reading_stats').then(v => {
    if (!v || typeof v !== 'string') return []
    try { return JSON.parse(v) as ReadingStats[] } catch { return [] }
  })
}

function saveStats(repo: SettingsRepository, stats: ReadingStats[]): Promise<void> {
  return repo.set('reading_stats', JSON.stringify(stats))
}

export function createReadingStatsRouter(repo: SettingsRepository): Hono {
  const app = new Hono()

  app.get('/daily', async (c) => {
    const allStats = await loadStats(repo)
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

  app.get('/weekly', async (c) => {
    const allStats = await loadStats(repo)
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

  app.get('/monthly', async (c) => {
    const allStats = await loadStats(repo)
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

  app.get('/insights', async (c) => {
    const allStats = await loadStats(repo)
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

  app.get('/recommendations', async (c) => {
    const allStats = await loadStats(repo)
    const sorted = allStats
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

  app.get('/:mangaId', async (c) => {
    const mangaId = c.req.param('mangaId')
    const allStats = await loadStats(repo)
    const stats = allStats.find(s => s.mangaId === mangaId)
    if (!stats) {
      return c.json({ mangaId, sourceId: '', totalTimeMs: 0, chaptersRead: 0, lastReadAt: '' })
    }
    return c.json(stats)
  })

  app.get('/', async (c) => {
    return c.json(await loadStats(repo))
  })

  app.post('/', async (c) => {
    const body = await c.req.json()
    if (!body.mangaId || !body.sourceId) {
      return c.json({ error: 'mangaId and sourceId are required', code: 'VALIDATION_ERROR', status: 400 }, 400)
    }

    const allStats = await loadStats(repo)
    const existing = allStats.find(s => s.mangaId === body.mangaId)
    const now = new Date().toISOString()

    const stats: ReadingStats = {
      mangaId: body.mangaId,
      sourceId: body.sourceId,
      totalTimeMs: (existing?.totalTimeMs ?? 0) + (body.totalTimeMs ?? 0),
      chaptersRead: (existing?.chaptersRead ?? 0) + (body.chaptersRead ?? 0),
      lastReadAt: now,
    }

    const idx = allStats.findIndex(s => s.mangaId === body.mangaId)
    if (idx >= 0) allStats[idx] = stats
    else allStats.push(stats)

    await saveStats(repo, allStats)
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
