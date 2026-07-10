import { Hono } from 'hono'
import type { DatabaseDriver, SQLiteDriver } from '@ireader/storage'

export function createLeaderboardRouter(db: DatabaseDriver & SQLiteDriver): Hono {
  const app = new Hono()

  // GET /leaderboard
  app.get('/', async (c) => {
    const period = c.req.query('period') || 'all'
    let dateFilter = ''
    switch (period) {
      case 'daily':
        dateFilter = "AND ra.created_at >= datetime('now', '-1 day')"
        break
      case 'weekly':
        dateFilter = "AND ra.created_at >= datetime('now', '-7 days')"
        break
      case 'monthly':
        dateFilter = "AND ra.created_at >= datetime('now', '-30 days')"
        break
    }
    const rows = await db.queryAll<any>(
      `SELECT u.id, u.username, u.display_name, u.avatar_url,
              COALESCE(SUM(ra.points), 0) as total_points,
              COUNT(DISTINCT ra.id) as activities
       FROM users u
       LEFT JOIN reading_activity ra ON ra.user_id = u.id ${dateFilter}
       GROUP BY u.id
       ORDER BY total_points DESC
       LIMIT 50`
    )
    return c.json(rows)
  })

  // GET /leaderboard/:period
  app.get('/:period', async (c) => {
    const period = c.req.param('period')
    const validPeriods = ['daily', 'weekly', 'monthly', 'all']
    if (!validPeriods.includes(period)) {
      return c.json({ error: 'Invalid period', code: 'VALIDATION_ERROR', status: 400 }, 400)
    }
    // Redirect to same handler with period query param
    const url = new URL(c.req.url)
    url.searchParams.set('period', period)
    c.req.url = url.toString()
    return await app.fetch(c.req.raw, c.executionCtx)
  })

  return app
}
