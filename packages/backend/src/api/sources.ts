import { Hono } from 'hono'

// Phase 0: hardcoded mock data, no disk loading yet
const MOCK_SOURCES = [
  { id: 'manganato', name: 'Manganato', lang: 'en', version: '1.0.0' },
  { id: 'mangadex', name: 'MangaDex', lang: 'en', version: '1.0.0' },
]

const app = new Hono()

// GET /api/v1/sources — list all available sources
app.get('/', (c) => c.json(MOCK_SOURCES))

// GET /api/v1/sources/:id/popular — mock popular manga
app.get('/:id/popular', (c) => {
  const { id } = c.req.param()
  const page = Number(c.req.query('page')) || 1

  const source = MOCK_SOURCES.find((s) => s.id === id)
  if (!source) return c.json({ error: 'Source not found', code: 'NOT_FOUND', status: 404 }, 404)

  // Return mock manga list
  const results = Array.from({ length: 20 }, (_, i) => ({
    id: `${id}/manga-${(page - 1) * 20 + i + 1}`,
    title: `${source.name} Manga #${(page - 1) * 20 + i + 1}`,
    coverUrl: `https://via.placeholder.com/350x500?text=${encodeURIComponent(source.name)}`,
    author: 'Author Name',
    status: 'ongoing' as const,
    rating: Math.round((4 + Math.random()) * 10) / 10,
    lastUpdated: new Date().toISOString(),
  }))

  return c.json(results)
})

export { app as sourcesApp }
