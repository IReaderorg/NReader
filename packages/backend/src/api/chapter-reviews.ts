import { Hono } from 'hono'
import { randomUUID } from 'node:crypto'
import type { DatabaseDriver, SQLiteDriver } from '@ireader/storage'
import { createJwtMiddleware } from './auth.js'

export function createChapterReviewsRouter(db: DatabaseDriver & SQLiteDriver): Hono {
  const app = new Hono()
  const requireAuth = createJwtMiddleware()

  // GET /chapter/reviews?chapterId=xxx
  app.get('/', async (c) => {
    const chapterId = c.req.query('chapterId')
    if (!chapterId) return c.json({ error: 'chapterId required', code: 'VALIDATION_ERROR', status: 400 }, 400)
    const rows = await db.queryAll<any>(
      `SELECT r.*, u.username, u.display_name, u.avatar_url
       FROM chapter_reviews r
       LEFT JOIN users u ON u.id = r.user_id
       WHERE r.chapter_id = ?
       ORDER BY r.created_at DESC`,
      [chapterId]
    )
    return c.json(rows)
  })

  // POST /chapter/reviews — create a review
  app.post('/', requireAuth, async (c) => {
    const userId = c.get('userId') as string
    const { chapterId, rating, content } = await c.req.json<{ chapterId: string; rating: number; content: string }>()
    if (!chapterId || !content) return c.json({ error: 'chapterId and content required', code: 'VALIDATION_ERROR', status: 400 }, 400)
    const id = randomUUID()
    await db.execute(
      'INSERT INTO chapter_reviews (id, user_id, chapter_id, rating, content) VALUES (?, ?, ?, ?, ?)',
      [id, userId, chapterId, rating ?? 5, content]
    )
    return c.json({ id }, 201)
  })

  return app
}
