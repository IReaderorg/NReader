import { Hono } from 'hono'
import { randomUUID } from 'node:crypto'
import type { DatabaseDriver, SQLiteDriver } from '@ireader/storage'
import { createJwtMiddleware } from './auth.js'

export function createCommunityRouter(db: DatabaseDriver & SQLiteDriver): Hono {
  const app = new Hono()
  const requireAuth = createJwtMiddleware()

  // GET /community/feed
  app.get('/feed', async (c) => {
    const page = parseInt(c.req.query('page') || '1', 10)
    const limit = 20
    const offset = (page - 1) * limit
    const rows = await db.queryAll<any>(
      `SELECT p.*, u.username, u.display_name, u.avatar_url
       FROM community_posts p
       LEFT JOIN users u ON u.id = p.user_id
       WHERE p.parent_id IS NULL
       ORDER BY p.created_at DESC
       LIMIT ? OFFSET ?`,
      [limit, offset]
    )
    return c.json(rows)
  })

  // POST /community/post
  app.post('/post', requireAuth, async (c) => {
    const userId = c.get('userId') as string
    const { content, type, parentId } = await c.req.json<{ content: string; type?: string; parentId?: string }>()
    if (!content) return c.json({ error: 'content is required', code: 'VALIDATION_ERROR', status: 400 }, 400)
    const id = randomUUID()
    await db.execute(
      'INSERT INTO community_posts (id, user_id, content, type, parent_id) VALUES (?, ?, ?, ?, ?)',
      [id, userId, content, type || 'post', parentId || null]
    )
    await db.execute(
      'INSERT INTO reading_activity (id, user_id, action, points) VALUES (?, ?, ?, ?)',
      [randomUUID(), userId, 'community_post', 10]
    )
    return c.json({ id, content, type: type || 'post', parentId: parentId || null, userId }, 201)
  })

  // DELETE /community/post/:id
  app.delete('/post/:id', requireAuth, async (c) => {
    const userId = c.get('userId') as string
    const { id } = c.req.param()
    const rows = await db.queryAll<{ user_id: string }>('SELECT user_id FROM community_posts WHERE id = ?', [id])
    if (!rows[0]) return c.json({ error: 'Not found', code: 'NOT_FOUND', status: 404 }, 404)
    if (rows[0].user_id !== userId) return c.json({ error: 'Forbidden', code: 'FORBIDDEN', status: 403 }, 403)
    await db.execute('DELETE FROM community_posts WHERE id = ?', [id])
    return c.json({ success: true })
  })

  return app
}
