import { Hono } from 'hono'

const dailyReads = new Set<string>()

export function createStreaksRouter(): Hono {
  const app = new Hono()

  // Record a read for today
  app.post('/', async (c) => {
    try {
      const body = await c.req.json<{ date?: string }>()
      const date = body.date || new Date().toISOString().slice(0, 10)
      dailyReads.add(date)
      return c.json({ date, recorded: true })
    } catch {
      return c.json({ error: 'Failed to record streak', code: 'STREAK_ERROR', status: 500 }, 500)
    }
  })

  // Get streak data for the last N days
  app.get('/', (c) => {
    const days = parseInt(c.req.query('days') || '90', 10)
    const result: Array<{ date: string; read: boolean }> = []
    const now = new Date()

    for (let i = days - 1; i >= 0; i--) {
      const d = new Date(now)
      d.setDate(d.getDate() - i)
      const dateStr = d.toISOString().slice(0, 10)
      result.push({ date: dateStr, read: dailyReads.has(dateStr) })
    }

    return c.json(result)
  })

  return app
}
