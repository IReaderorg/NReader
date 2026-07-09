import { Hono } from 'hono'
import { existsSync, mkdirSync, writeFileSync, unlinkSync, readFileSync } from 'node:fs'
import path from 'node:path'
import { randomUUID } from 'node:crypto'
import type { SettingsRepository } from '@ireader/core'

export interface FontEntry {
  id: string
  name: string
  fileName: string
  fileSize: number
  format: 'ttf' | 'otf' | 'woff2'
  uploadedAt: string
}

const FONTS_DIR = path.resolve(process.cwd(), 'data', 'fonts')

function ensureFontsDir(): void {
  if (!existsSync(FONTS_DIR)) {
    mkdirSync(FONTS_DIR, { recursive: true })
  }
}

const EXT_MAP: Record<string, 'ttf' | 'otf' | 'woff2'> = {
  '.ttf': 'ttf',
  '.otf': 'otf',
  '.woff2': 'woff2',
}
const ALLOWED_EXTS = new Set(Object.keys(EXT_MAP))

function getRegistry(repo: SettingsRepository): Promise<FontEntry[]> {
  return repo.get('custom_fonts_registry').then(v => {
    if (!v || typeof v !== 'string') return []
    try { return JSON.parse(v) as FontEntry[] } catch { return [] }
  })
}

function saveRegistry(repo: SettingsRepository, registry: FontEntry[]): Promise<void> {
  return repo.set('custom_fonts_registry', JSON.stringify(registry))
}

export function createFontsRouter(repo: SettingsRepository): Hono {
  ensureFontsDir()
  const app = new Hono()

  // Upload font
  app.post('/upload', async (c) => {
    const formData = await c.req.raw.formData()
    const file = formData.get('file')
    if (!file || !(file instanceof File)) {
      return c.json({ error: 'No file uploaded', code: 'VALIDATION_ERROR', status: 400 }, 400)
    }

    const ext = path.extname(file.name).toLowerCase()
    if (!ALLOWED_EXTS.has(ext)) {
      return c.json({ error: `Invalid format: ${ext}. Allowed: .ttf, .otf, .woff2`, code: 'VALIDATION_ERROR', status: 400 }, 400)
    }

    const id = randomUUID().slice(0, 12)
    const format = EXT_MAP[ext]
    const fileName = `${id}${ext}`
    const filePath = path.join(FONTS_DIR, fileName)
    const buffer = Buffer.from(await file.arrayBuffer())
    writeFileSync(filePath, buffer)

    const entry: FontEntry = {
      id,
      name: file.name.replace(ext, ''),
      fileName,
      fileSize: buffer.length,
      format,
      uploadedAt: new Date().toISOString(),
    }

    const registry = await getRegistry(repo)
    registry.push(entry)
    await saveRegistry(repo, registry)

    return c.json(entry, 201)
  })

  // List fonts
  app.get('/', async (c) => {
    const registry = await getRegistry(repo)
    return c.json(registry)
  })

  // Serve raw font file
  app.get('/:id/raw', async (c) => {
    const { id } = c.req.param()
    const registry = await getRegistry(repo)
    const entry = registry.find(f => f.id === id)
    if (!entry) return c.json({ error: 'Font not found', code: 'NOT_FOUND', status: 404 }, 404)

    const filePath = path.join(FONTS_DIR, entry.fileName)
    if (!existsSync(filePath)) {
      return c.json({ error: 'Font file missing', code: 'FILE_MISSING', status: 404 }, 404)
    }

    const contentType: Record<string, string> = {
      ttf: 'font/ttf',
      otf: 'font/otf',
      woff2: 'font/woff2',
    }

    const data = readFileSync(filePath)
    return c.newResponse(data, 200, {
      'Content-Type': contentType[entry.format] || 'application/octet-stream',
      'Cache-Control': 'public, max-age=31536000, immutable',
    })
  })

  // Delete font
  app.delete('/:id', async (c) => {
    const { id } = c.req.param()
    const registry = await getRegistry(repo)
    const idx = registry.findIndex(f => f.id === id)
    if (idx === -1) return c.json({ error: 'Font not found', code: 'NOT_FOUND', status: 404 }, 404)

    const entry = registry[idx]
    const filePath = path.join(FONTS_DIR, entry.fileName)
    if (existsSync(filePath)) unlinkSync(filePath)

    registry.splice(idx, 1)
    await saveRegistry(repo, registry)

    return c.json({ success: true })
  })

  return app
}
