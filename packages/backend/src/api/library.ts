import { Hono } from 'hono'
import type { LibraryRepository, LibraryEntry, Category } from '@ireader/core'
import { randomUUID } from 'node:crypto'

export function createLibraryRouter(repo: LibraryRepository): Hono {
  const app = new Hono()

  // ========== Category routes (MUST come before /:id) ==========

  // List categories
  app.get('/categories', async (c) => {
    return c.json(await repo.getCategories())
  })

  // Create category
  app.post('/categories', async (c) => {
    const body = await c.req.json<{ name: string; color?: string }>()
    if (!body.name) {
      return c.json({ error: 'name is required', code: 'VALIDATION_ERROR', status: 400 }, 400)
    }
    const category: Category = {
      id: randomUUID(),
      name: body.name,
      sortOrder: (await repo.getCategories()).length,
      color: body.color,
    }
    await repo.addCategory(category)
    return c.json(category, 201)
  })

  // Update category
  app.put('/categories/:id', async (c) => {
    const { id } = c.req.param()
    const body = await c.req.json<Partial<Category>>()
    await repo.updateCategory({ id, ...body })
    return c.json({ success: true })
  })

  // Delete category
  app.delete('/categories/:id', async (c) => {
    const { id } = c.req.param()
    await repo.removeCategory(id)
    return c.json({ success: true })
  })

  // ========== Library entry routes ==========

  // List all library entries
  app.get('/', async (c) => {
    const entries = await repo.getAll()
    const categoryId = c.req.query('category')
    if (categoryId) {
      return c.json(entries.filter(e => e.categoryIds.includes(categoryId)))
    }
    return c.json(entries)
  })

  // Add manga to library
  app.post('/', async (c) => {
    const body = await c.req.json<{
      sourceId: string
      mangaId: string
      title: string
      coverUrl?: string
      author?: string
      status?: string
      rating?: number
      genres?: string[]
      description?: string
      totalChapters?: number
      categoryId?: string
    }>()
    if (!body.sourceId || !body.mangaId || !body.title) {
      return c.json({ error: 'sourceId, mangaId, and title are required', code: 'VALIDATION_ERROR', status: 400 }, 400)
    }
    const entry: LibraryEntry = {
      id: randomUUID(),
      sourceId: body.sourceId,
      mangaId: body.mangaId,
      title: body.title,
      coverUrl: body.coverUrl ?? '',
      author: body.author,
      status: body.status,
      rating: body.rating,
      genres: body.genres ?? [],
      description: body.description,
      chaptersRead: 0,
      totalChapters: body.totalChapters,
      score: 0,
      dateAdded: new Date().toISOString(),
      categoryIds: body.categoryId ? [body.categoryId] : [],
    }
    await repo.add(entry)
    return c.json(entry, 201)
  })

  // Get single library entry
  app.get('/:id', async (c) => {
    const { id } = c.req.param()
    const entry = await repo.getById(id)
    if (!entry) return c.json({ error: 'Not found', code: 'NOT_FOUND', status: 404 }, 404)
    return c.json(entry)
  })

  // Update library entry
  app.put('/:id', async (c) => {
    const { id } = c.req.param()
    const existing = await repo.getById(id)
    if (!existing) return c.json({ error: 'Not found', code: 'NOT_FOUND', status: 404 }, 404)

    const body = await c.req.json<Partial<LibraryEntry>>()
    await repo.update({ id, ...body, dateUpdated: new Date().toISOString() })
    const updated = await repo.getById(id)
    return c.json(updated)
  })

  // Remove from library
  app.delete('/:id', async (c) => {
    const { id } = c.req.param()
    await repo.remove(id)
    return c.json({ success: true })
  })

  return app
}
