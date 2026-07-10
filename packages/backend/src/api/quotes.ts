import { Hono } from 'hono'
import { randomUUID } from 'node:crypto'
import type { DatabaseDriver, SQLiteDriver } from '@ireader/storage'
import { createJwtMiddleware } from './auth.js'

export function createQuotesRouter(db: DatabaseDriver & SQLiteDriver): Hono {
  const app = new Hono()
  const requireAuth = createJwtMiddleware()

  // GET /quotes — public
  app.get('/', async (c) => {
    const page = parseInt(c.req.query('page') || '1', 10)
    const limit = 30
    const offset = (page - 1) * limit
    const rows = await db.queryAll<any>(
      `SELECT q.*, u.username, u.display_name, u.avatar_url
       FROM quotes q
       LEFT JOIN users u ON u.id = q.user_id
       ORDER BY q.created_at DESC
       LIMIT ? OFFSET ?`,
      [limit, offset]
    )
    return c.json(rows)
  })

  // POST /quotes — create a quote
  app.post('/', requireAuth, async (c) => {
    const userId = c.get('userId') as string
    const { mangaId, sourceId, chapterId, text, context } = await c.req.json<{
      mangaId?: string; sourceId?: string; chapterId?: string; text: string; context?: string
    }>()
    if (!text) return c.json({ error: 'text is required', code: 'VALIDATION_ERROR', status: 400 }, 400)
    const id = randomUUID()
    await db.execute(
      'INSERT INTO quotes (id, user_id, manga_id, source_id, chapter_id, text, context) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [id, userId, mangaId || null, sourceId || null, chapterId || null, text, context || null]
    )
    return c.json({ id, text, mangaId, sourceId, chapterId, context, userId }, 201)
  })

  // DELETE /quotes/:id
  app.delete('/:id', requireAuth, async (c) => {
    const userId = c.get('userId') as string
    const { id } = c.req.param()
    const rows = await db.queryAll<{ user_id: string }>('SELECT user_id FROM quotes WHERE id = ?', [id])
    if (!rows[0]) return c.json({ error: 'Not found', code: 'NOT_FOUND', status: 404 }, 404)
    if (rows[0].user_id !== userId) return c.json({ error: 'Forbidden', code: 'FORBIDDEN', status: 403 }, 403)
    await db.execute('DELETE FROM quotes WHERE id = ?', [id])
    return c.json({ success: true })
  })

  return app
}
