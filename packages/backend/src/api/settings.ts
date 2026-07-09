import { Hono } from 'hono'
import type { SettingsRepository } from '@ireader/core'

export function createSettingsRouter(repo: SettingsRepository): Hono {
  const app = new Hono()

  // Get all settings
  app.get('/', async (c) => {
    const settings = await repo.getAll()
    // Return as key-value map
    const map: Record<string, unknown> = {}
    for (const s of settings) {
      map[s.key] = s.value
    }
    return c.json(map)
  })

  // Get single setting
  app.get('/:key', async (c) => {
    const { key } = c.req.param()
    const setting = await repo.get(key)
    if (!setting) return c.json({ error: 'Not found', code: 'NOT_FOUND', status: 404 }, 404)
    return c.json({ [setting.key]: setting.value })
  })

  // Set a setting
  app.post('/:key', async (c) => {
    const { key } = c.req.param()
    const body = await c.req.json<{ value: unknown }>()
    if (body.value === undefined) {
      return c.json({ error: 'value is required', code: 'VALIDATION_ERROR', status: 400 }, 400)
    }
    await repo.set(key, body.value)
    return c.json({ [key]: body.value })
  })

  // Bulk set settings
  app.post('/', async (c) => {
    const body = await c.req.json<Record<string, unknown>>()
    for (const [key, value] of Object.entries(body)) {
      await repo.set(key, value)
    }
    return c.json(body)
  })

  // Delete a setting
  app.delete('/:key', async (c) => {
    const { key } = c.req.param()
    await repo.delete(key)
    return c.json({ success: true })
  })

  return app
}
