import { Hono } from 'hono'
import type { SettingsRepository } from '@ireader/core'

function loadBookmarks(repo: SettingsRepository): Promise<string[]> {
  return repo.get('bookmarks').then(v => {
    if (!v || typeof v !== 'string') return []
    try { return JSON.parse(v) as string[] } catch { return [] }
  })
}

function saveBookmarks(repo: SettingsRepository, bookmarks: string[]): Promise<void> {
  return repo.set('bookmarks', JSON.stringify(bookmarks))
}

export function createBookmarkRouter(repo: SettingsRepository): Hono {
  const app = new Hono()

  app.post('/toggle', async (c) => {
    try {
      const body = await c.req.json<{ chapterId: string }>()
      if (!body.chapterId) {
        return c.json({ error: 'chapterId is required', code: 'VALIDATION_ERROR', status: 400 }, 400)
      }

      const bookmarks = await loadBookmarks(repo)
      const idx = bookmarks.indexOf(body.chapterId)
      let bookmarked: boolean
      if (idx >= 0) {
        bookmarks.splice(idx, 1)
        bookmarked = false
      } else {
        bookmarks.push(body.chapterId)
        bookmarked = true
      }
      await saveBookmarks(repo, bookmarks)
      return c.json({ bookmarked })
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Failed to toggle bookmark'
      return c.json({ error: msg, code: 'BOOKMARK_ERROR', status: 500 }, 500)
    }
  })

  app.get('/status/:chapterId', async (c) => {
    const chapterId = c.req.param('chapterId')
    const bookmarks = await loadBookmarks(repo)
    return c.json({ bookmarked: bookmarks.includes(chapterId) })
  })

  return app
}
