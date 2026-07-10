import { Hono } from 'hono'
import type { SettingsRepository } from '@ireader/core'

interface ReadingGoal {
  dailyTimeMinutes: number
  dailyChapters: number
}

const DEFAULT_GOALS: ReadingGoal = { dailyTimeMinutes: 0, dailyChapters: 0 }

function loadGoals(repo: SettingsRepository): Promise<ReadingGoal> {
  return repo.get('reading_goals').then(v => {
    if (!v || typeof v !== 'string') return DEFAULT_GOALS
    try { return { ...DEFAULT_GOALS, ...JSON.parse(v) } } catch { return DEFAULT_GOALS }
  })
}

export function createReadingGoalsRouter(repo: SettingsRepository): Hono {
  const app = new Hono()

  app.get('/', async (c) => {
    return c.json(await loadGoals(repo))
  })

  app.post('/', async (c) => {
    try {
      const body = await c.req.json<Partial<ReadingGoal>>()
      const goals = await loadGoals(repo)
      if (body.dailyTimeMinutes !== undefined) goals.dailyTimeMinutes = Math.max(0, body.dailyTimeMinutes)
      if (body.dailyChapters !== undefined) goals.dailyChapters = Math.max(0, body.dailyChapters)
      await repo.set('reading_goals', JSON.stringify(goals))
      return c.json(goals)
    } catch {
      return c.json({ error: 'Failed to update goals', code: 'GOALS_ERROR', status: 500 }, 500)
    }
  })

  return app
}
