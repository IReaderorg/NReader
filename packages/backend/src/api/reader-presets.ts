import { Hono } from 'hono'
import type { SettingsRepository } from '@ireader/core'
import { randomUUID } from 'node:crypto'

export interface ReaderPreset {
  id: string
  name: string
  fontSize: number
  lineHeight: number
  paragraphSpacing: number
  paragraphIndent: number
  textAlignment: string
  colorFilter: string
}

const DEFAULT_PRESETS: ReaderPreset[] = [
  { id: 'comfortable', name: 'Comfortable', fontSize: 18, lineHeight: 1.8, paragraphSpacing: 16, paragraphIndent: 0, textAlignment: 'left', colorFilter: 'none' },
  { id: 'compact', name: 'Compact', fontSize: 14, lineHeight: 1.4, paragraphSpacing: 8, paragraphIndent: 0, textAlignment: 'left', colorFilter: 'none' },
  { id: 'large', name: 'Large Print', fontSize: 24, lineHeight: 2.0, paragraphSpacing: 20, paragraphIndent: 0, textAlignment: 'left', colorFilter: 'none' },
  { id: 'book', name: 'Book Style', fontSize: 17, lineHeight: 1.7, paragraphSpacing: 12, paragraphIndent: 24, textAlignment: 'justify', colorFilter: 'sepia' },
  { id: 'dark', name: 'Dark Comfort', fontSize: 18, lineHeight: 1.7, paragraphSpacing: 14, paragraphIndent: 0, textAlignment: 'left', colorFilter: 'invert' },
]

function getCustomPresets(repo: SettingsRepository): Promise<ReaderPreset[]> {
  return repo.get('reader_presets_custom').then(v => {
    if (!v || typeof v !== 'string') return []
    try { return JSON.parse(v) as ReaderPreset[] } catch { return [] }
  })
}

async function saveCustomPresets(repo: SettingsRepository, presets: ReaderPreset[]): Promise<void> {
  await repo.set('reader_presets_custom', JSON.stringify(presets))
}

export function createReaderPresetsRouter(repo: SettingsRepository): Hono {
  const app = new Hono()

  // List all presets (defaults + custom)
  app.get('/', async (c) => {
    const custom = await getCustomPresets(repo)
    return c.json([...DEFAULT_PRESETS, ...custom])
  })

  // Create custom preset
  app.post('/', async (c) => {
    const body = await c.req.json<{ name: string; fontSize: number; lineHeight: number; paragraphSpacing: number; paragraphIndent: number; textAlignment: string; colorFilter: string }>()
    if (!body.name) {
      return c.json({ error: 'name is required', code: 'VALIDATION_ERROR', status: 400 }, 400)
    }
    const custom = await getCustomPresets(repo)
    const preset: ReaderPreset = {
      id: `preset-${randomUUID().slice(0, 8)}`,
      ...body,
    }
    custom.push(preset)
    await saveCustomPresets(repo, custom)
    return c.json(preset, 201)
  })

  // Update custom preset
  app.put('/:id', async (c) => {
    const { id } = c.req.param()
    const body = await c.req.json<Partial<ReaderPreset>>()
    const custom = await getCustomPresets(repo)
    const idx = custom.findIndex(p => p.id === id)
    if (idx === -1) return c.json({ error: 'Preset not found', code: 'NOT_FOUND', status: 404 }, 404)
    custom[idx] = { ...custom[idx], ...body as ReaderPreset }
    await saveCustomPresets(repo, custom)
    return c.json(custom[idx])
  })

  // Delete custom preset
  app.delete('/:id', async (c) => {
    const { id } = c.req.param()
    const custom = await getCustomPresets(repo)
    const idx = custom.findIndex(p => p.id === id)
    if (idx === -1) return c.json({ error: 'Preset not found', code: 'NOT_FOUND', status: 404 }, 404)
    custom.splice(idx, 1)
    await saveCustomPresets(repo, custom)
    return c.json({ success: true })
  })

  return app
}
