import { Hono } from 'hono'
import type { SettingsRepository } from '@ireader/core'
import { randomUUID } from 'node:crypto'

export interface CharacterArt {
  id: string
  mangaId: string
  userId?: string
  imageUrl: string
  caption?: string
  artist?: string
  source?: string
  createdAt: string
}

function loadArt(repo: SettingsRepository): Promise<CharacterArt[]> {
  return repo.get('character_art').then(v => {
    if (!v || typeof v !== 'string') return []
    try { return JSON.parse(v) as CharacterArt[] } catch { return [] }
  })
}

function saveArt(repo: SettingsRepository, art: CharacterArt[]): Promise<void> {
  return repo.set('character_art', JSON.stringify(art))
}

export function createCharacterArtRouter(repo: SettingsRepository): Hono {
  const app = new Hono()

  // List art for a manga
  app.get('/', async (c) => {
    const mangaId = c.req.query('mangaId')
    const all = await loadArt(repo)
    if (mangaId) {
      return c.json(all.filter(a => a.mangaId === mangaId))
    }
    return c.json(all)
  })

  // Upload new art
  app.post('/', async (c) => {
    const body = await c.req.json<{ mangaId: string; imageUrl: string; caption?: string; artist?: string }>()
    if (!body.mangaId || !body.imageUrl) {
      return c.json({ error: 'mangaId and imageUrl are required', code: 'VALIDATION_ERROR', status: 400 }, 400)
    }
    const all = await loadArt(repo)
    const art: CharacterArt = {
      id: randomUUID(),
      mangaId: body.mangaId,
      imageUrl: body.imageUrl,
      caption: body.caption,
      artist: body.artist,
      createdAt: new Date().toISOString(),
    }
    all.push(art)
    await saveArt(repo, all)
    return c.json(art, 201)
  })

  // Delete art
  app.delete('/:id', async (c) => {
    const { id } = c.req.param()
    const all = await loadArt(repo)
    const idx = all.findIndex(a => a.id === id)
    if (idx === -1) return c.json({ error: 'Not found', code: 'NOT_FOUND', status: 404 }, 404)
    all.splice(idx, 1)
    await saveArt(repo, all)
    return c.json({ success: true })
  })

  return app
}
