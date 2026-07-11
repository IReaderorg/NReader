import { Hono } from 'hono'
import type { DatabaseDriver, SQLiteDriver } from '@ireader/storage'
import { createJwtMiddleware } from './auth.js'

export function createChapterArtRouter(db: DatabaseDriver & SQLiteDriver): Hono {
  const app = new Hono()
  const requireAuth = createJwtMiddleware()

  // POST /chapter/art — generate AI art for a chapter
  app.post('/', requireAuth, async (c) => {
    const { chapterId, sourceId, mangaId } = await c.req.json<{ chapterId: string; sourceId: string; mangaId: string }>()
    if (!chapterId) return c.json({ error: 'chapterId required', code: 'VALIDATION_ERROR', status: 400 }, 400)

    // For now, return a placeholder image URL with prompt info
    // ponytail: real AI gen when AI service is added
    const imageUrl = `/api/v1/chapter/art/placeholder?chapterId=${encodeURIComponent(chapterId)}&mangaId=${encodeURIComponent(mangaId || '')}&sourceId=${encodeURIComponent(sourceId || '')}`
    const caption = `Generated art for chapter ${chapterId}`
    return c.json({ imageUrl, caption }, 201)
  })

  // GET /chapter/art/placeholder — returns a placeholder SVG
  app.get('/placeholder', (c) => {
    const chapterId = c.req.query('chapterId') || 'unknown'
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="600" height="400" viewBox="0 0 600 400">
      <rect width="600" height="400" fill="#1a1a2e"/>
      <text x="300" y="180" text-anchor="middle" fill="#e0e0e0" font-family="sans-serif" font-size="20">Chapter Art</text>
      <text x="300" y="220" text-anchor="middle" fill="#888" font-family="sans-serif" font-size="14">${chapterId}</text>
      <text x="300" y="260" text-anchor="middle" fill="#666" font-family="sans-serif" font-size="12">AI-generated art coming soon</text>
    </svg>`
    return c.newResponse(svg, 200, { 'Content-Type': 'image/svg+xml' })
  })

  return app
}
