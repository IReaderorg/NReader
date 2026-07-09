import { Hono } from 'hono'
import type { GlossaryRepository, GlossaryEntry } from '@ireader/core'
import { randomUUID } from 'node:crypto'

export function createGlossaryRouter(repo: GlossaryRepository): Hono {
  const app = new Hono()

  // List all entries
  app.get('/', async (c) => {
    const entries = await repo.getAll()
    return c.json(entries)
  })

  // Search glossary
  app.get('/search', async (c) => {
    const sourceText = c.req.query('sourceText')
    const sourceLang = c.req.query('sourceLang')
    const targetLang = c.req.query('targetLang')
    if (!sourceText || !sourceLang || !targetLang) {
      return c.json({ error: 'sourceText, sourceLang, and targetLang are required', code: 'VALIDATION_ERROR', status: 400 }, 400)
    }
    const entry = await repo.search(sourceText, sourceLang, targetLang)
    return c.json(entry)
  })

  // Get single entry
  app.get('/:id', async (c) => {
    const { id } = c.req.param()
    const entry = await repo.getById(id)
    if (!entry) return c.json({ error: 'Not found', code: 'NOT_FOUND', status: 404 }, 404)
    return c.json(entry)
  })

  // Create entry
  app.post('/', async (c) => {
    const body = await c.req.json<{
      sourceLang: string
      targetLang?: string
      sourceText: string
      targetText: string
      context?: string
    }>()
    if (!body.sourceLang || !body.sourceText || !body.targetText) {
      return c.json({ error: 'sourceLang, sourceText, and targetText are required', code: 'VALIDATION_ERROR', status: 400 }, 400)
    }
    const now = new Date().toISOString()
    const entry: GlossaryEntry = {
      id: randomUUID(),
      sourceLang: body.sourceLang,
      targetLang: body.targetLang ?? 'en',
      sourceText: body.sourceText,
      targetText: body.targetText,
      context: body.context,
      createdAt: now,
      updatedAt: now,
    }
    await repo.add(entry)
    return c.json(entry, 201)
  })

  // Update entry
  app.put('/:id', async (c) => {
    const { id } = c.req.param()
    const existing = await repo.getById(id)
    if (!existing) return c.json({ error: 'Not found', code: 'NOT_FOUND', status: 404 }, 404)
    const body = await c.req.json<Partial<GlossaryEntry>>()
    await repo.update({ id, ...body })
    return c.json({ success: true })
  })

  // Delete entry
  app.delete('/:id', async (c) => {
    const { id } = c.req.param()
    await repo.remove(id)
    return c.json({ success: true })
  })

  return app
}
