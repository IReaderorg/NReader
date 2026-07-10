import { Hono } from 'hono'

interface ReadingGoal {
  dailyTimeMinutes: number
  dailyChapters: number
}

const goals: ReadingGoal = { dailyTimeMinutes: 0, dailyChapters: 0 }

export function createReadingGoalsRouter(): Hono {
  const app = new Hono()

  // Get current goals
  app.get('/', (c) => c.json(goals))

  // Set goals
  app.post('/', async (c) => {
    try {
      const body = await c.req.json<Partial<ReadingGoal>>()
      if (body.dailyTimeMinutes !== undefined) goals.dailyTimeMinutes = Math.max(0, body.dailyTimeMinutes)
      if (body.dailyChapters !== undefined) goals.dailyChapters = Math.max(0, body.dailyChapters)
      return c.json(goals)
    } catch {
      return c.json({ error: 'Failed to update goals', code: 'GOALS_ERROR', status: 500 }, 500)
    }
  })

  return app
}
