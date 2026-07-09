import { Hono } from 'hono'
import type { SettingsRepository } from '@ireader/core'
import { randomUUID } from 'node:crypto'

export interface ReaderTheme {
  id: string
  name: string
  isBuiltin: boolean
  colors: {
    background: string
    text: string
    link: string
    highlight: string
    header: string
    separator: string
    card: string
  }
}

const BUILTIN_THEMES: ReaderTheme[] = [
  {
    id: 'theme-light', name: 'Light', isBuiltin: true,
    colors: { background: '#ffffff', text: '#1a1a2e', link: '#2563eb', highlight: '#fbbf24', header: '#f8f9fa', separator: '#e2e8f0', card: '#ffffff' },
  },
  {
    id: 'theme-sepia', name: 'Sepia', isBuiltin: true,
    colors: { background: '#f4e8c1', text: '#5b4636', link: '#8b5e3c', highlight: '#d4a574', header: '#e8d5a3', separator: '#c4a87c', card: '#f0e0b8' },
  },
  {
    id: 'theme-dark', name: 'Dark', isBuiltin: true,
    colors: { background: '#1a1a2e', text: '#e0e0e0', link: '#60a5fa', highlight: '#fbbf24', header: '#16213e', separator: '#2a2a4a', card: '#1f1f3a' },
  },
  {
    id: 'theme-night', name: 'Night', isBuiltin: true,
    colors: { background: '#000000', text: '#666666', link: '#444444', highlight: '#888888', header: '#111111', separator: '#222222', card: '#0a0a0a' },
  },
  {
    id: 'theme-oled', name: 'OLED', isBuiltin: true,
    colors: { background: '#000000', text: '#ffffff', link: '#3b82f6', highlight: '#f59e0b', header: '#0a0a0a', separator: '#1a1a1a', card: '#050505' },
  },
]

function getCustomThemes(repo: SettingsRepository): Promise<ReaderTheme[]> {
  return repo.get('reader_themes_custom').then(v => {
    if (!v || typeof v !== 'string') return []
    try { return JSON.parse(v) as ReaderTheme[] } catch { return [] }
  })
}

async function saveCustomThemes(repo: SettingsRepository, themes: ReaderTheme[]): Promise<void> {
  await repo.set('reader_themes_custom', JSON.stringify(themes))
}

export function createReaderThemesRouter(repo: SettingsRepository): Hono {
  const app = new Hono()

  // List all themes
  app.get('/', async (c) => {
    const custom = await getCustomThemes(repo)
    return c.json([...BUILTIN_THEMES, ...custom])
  })

  // List builtins only
  app.get('/defaults', async (c) => {
    return c.json(BUILTIN_THEMES)
  })

  // Create custom theme
  app.post('/', async (c) => {
    const body = await c.req.json<{ name: string; colors: ReaderTheme['colors'] }>()
    if (!body.name || !body.colors) {
      return c.json({ error: 'name and colors are required', code: 'VALIDATION_ERROR', status: 400 }, 400)
    }
    const custom = await getCustomThemes(repo)
    const theme: ReaderTheme = {
      id: `custom-${randomUUID().slice(0, 8)}`,
      name: body.name,
      isBuiltin: false,
      colors: body.colors,
    }
    custom.push(theme)
    await saveCustomThemes(repo, custom)
    return c.json(theme, 201)
  })

  // Update custom theme
  app.put('/:id', async (c) => {
    const { id } = c.req.param()
    const body = await c.req.json<{ name?: string; colors?: ReaderTheme['colors'] }>()
    const custom = await getCustomThemes(repo)
    const idx = custom.findIndex(t => t.id === id)
    if (idx === -1) return c.json({ error: 'Theme not found', code: 'NOT_FOUND', status: 404 }, 404)
    if (body.name) custom[idx].name = body.name
    if (body.colors) custom[idx].colors = body.colors
    await saveCustomThemes(repo, custom)
    return c.json(custom[idx])
  })

  // Delete custom theme
  app.delete('/:id', async (c) => {
    const { id } = c.req.param()
    const custom = await getCustomThemes(repo)
    const idx = custom.findIndex(t => t.id === id)
    if (idx === -1) return c.json({ error: 'Theme not found', code: 'NOT_FOUND', status: 404 }, 404)
    custom.splice(idx, 1)
    await saveCustomThemes(repo, custom)
    return c.json({ success: true })
  })

  return app
}
