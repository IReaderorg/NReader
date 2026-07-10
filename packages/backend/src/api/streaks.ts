import { Hono } from 'hono'
import type { SettingsRepository } from '@ireader/core'

function loadReadDates(repo: SettingsRepository): Promise<string[]> {
  return repo.get('streak_dates').then(v => {
    if (!v || typeof v !== 'string') return []
    try { return JSON.parse(v) as string[] } catch { return [] }
  })
}

function saveReadDates(repo: SettingsRepository, dates: string[]): Promise<void> {
  return repo.set('streak_dates', JSON.stringify(dates))
}

export function createStreaksRouter(repo: SettingsRepository): Hono {
  const app = new Hono()

  app.post('/', async (c) => {
    try {
      const body = await c.req.json<{ date?: string }>()
      const date = body.date || new Date().toISOString().slice(0, 10)
      const dates = await loadReadDates(repo)
      if (!dates.includes(date)) {
        dates.push(date)
        await saveReadDates(repo, dates)
      }
      return c.json({ date, recorded: true })
    } catch {
      return c.json({ error: 'Failed to record streak', code: 'STREAK_ERROR', status: 500 }, 500)
    }
  })

  app.get('/', async (c) => {
    const days = parseInt(c.req.query('days') || '90', 10)
    const dates = await loadReadDates(repo)
    const dateSet = new Set(dates)
    const result: Array<{ date: string; read: boolean }> = []
    const now = new Date()

    for (let i = days - 1; i >= 0; i--) {
      const d = new Date(now)
      d.setDate(d.getDate() - i)
      const dateStr = d.toISOString().slice(0, 10)
      result.push({ date: dateStr, read: dateSet.has(dateStr) })
    }

    return c.json(result)
  })

  return app
}
