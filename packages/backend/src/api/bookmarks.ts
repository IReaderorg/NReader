import { Hono } from 'hono'

const bookmarks: Set<string> = new Set()

export function createBookmarkRouter(): Hono {
  const app = new Hono()

  // Toggle bookmark for a chapter
  app.post('/toggle', async (c) => {
    try {
      const body = await c.req.json<{ chapterId: string }>()

      if (!body.chapterId) {
        return c.json({ error: 'chapterId is required', code: 'VALIDATION_ERROR', status: 400 }, 400)
      }

      const isBookmarked = bookmarks.has(body.chapterId)
      if (isBookmarked) {
        bookmarks.delete(body.chapterId)
      } else {
        bookmarks.add(body.chapterId)
      }

      return c.json({ bookmarked: !isBookmarked })
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Failed to toggle bookmark'
      return c.json({ error: msg, code: 'BOOKMARK_ERROR', status: 500 }, 500)
    }
  })

  // Check bookmark status
  app.get('/status/:chapterId', (c) => {
    const chapterId = c.req.param('chapterId')
    return c.json({ bookmarked: bookmarks.has(chapterId) })
  })

  return app
}
