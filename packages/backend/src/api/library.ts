import { Hono } from 'hono'
import type { LibraryRepository, Category, LibraryEntry } from '@ireader/core'
import { NotFoundError, ValidationError } from '@ireader/core'
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
      throw new ValidationError('name is required')
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
      throw new ValidationError('sourceId, mangaId, and title are required')
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
    if (!entry) throw new NotFoundError('Library entry')
    return c.json(entry)
  })

  // Update library entry
  app.put('/:id', async (c) => {
    const { id } = c.req.param()
    const existing = await repo.getById(id)
    if (!existing) throw new NotFoundError('Library entry')

    const body = await c.req.json<Partial<LibraryEntry>>()
    await repo.update({ id, ...body, dateUpdated: new Date().toISOString() })
    const updated = await repo.getById(id)
    return c.json(updated)
  })

  // ========== New library enhancement endpoints ==========

  // Multi-category per book
  app.patch('/:id/categories', async (c) => {
    const { id } = c.req.param()
    const existing = await repo.getById(id)
    if (!existing) throw new NotFoundError('Library entry')
    const body = await c.req.json<{ categoryIds: string[] }>()
    await repo.update({ id, categoryIds: body.categoryIds, dateUpdated: new Date().toISOString() })
    return c.json(await repo.getById(id))
  })

  // Favorite/Pin toggle
  app.patch('/:id/favorite', async (c) => {
    const { id } = c.req.param()
    const existing = await repo.getById(id)
    if (!existing) throw new NotFoundError('Library entry')
    const body = await c.req.json<{ favorited: boolean }>()
    await repo.update({ id, favorited: body.favorited, dateUpdated: new Date().toISOString() })
    return c.json(await repo.getById(id))
  })

  // Metadata editing
  app.patch('/:id/metadata', async (c) => {
    const { id } = c.req.param()
    const existing = await repo.getById(id)
    if (!existing) throw new NotFoundError('Library entry')
    const body = await c.req.json<{ title?: string; author?: string; description?: string; coverUrl?: string }>()
    await repo.update({ id, ...body, dateUpdated: new Date().toISOString() })
    return c.json(await repo.getById(id))
  })

  // Mark all read
  app.post('/:id/mark-all-read', async (c) => {
    const { id } = c.req.param()
    const existing = await repo.getById(id)
    if (!existing) throw new NotFoundError('Library entry')
    const total = existing.totalChapters ?? 0
    await repo.update({ id, chaptersRead: total, dateUpdated: new Date().toISOString() })
    return c.json({ success: true })
  })

  // Archive toggle
  app.patch('/:id/archive', async (c) => {
    const { id } = c.req.param()
    const existing = await repo.getById(id)
    if (!existing) throw new NotFoundError('Library entry')
    const body = await c.req.json<{ archived: boolean }>()
    await repo.update({ id, archived: body.archived, dateUpdated: new Date().toISOString() })
    return c.json(await repo.getById(id))
  })

  // Category reorder
  app.put('/categories/reorder', async (c) => {
    const body = await c.req.json<{ categoryIds: string[] }>()
    for (let i = 0; i < body.categoryIds.length; i++) {
      const id = body.categoryIds[i]
      if (id) await repo.updateCategory({ id, sortOrder: i })
    }
    return c.json({ success: true })
  })

  // Remove from library
  app.delete('/:id', async (c) => {
    const { id } = c.req.param()
    await repo.remove(id)
    return c.json({ success: true })
  })

  return app
}
