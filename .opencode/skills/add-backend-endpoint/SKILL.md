# Skill: Add a Backend API Endpoint

Use when the user asks to create a new REST API endpoint or WebSocket event on the backend.

## Steps

### 1. Choose the right file

| Resource | File | Base Path |
|----------|------|-----------|
| Sources | `packages/backend/src/api/sources.ts` | `/api/v1/sources` |
| Library | `packages/backend/src/api/library.ts` | `/api/v1/library` |
| History | `packages/backend/src/api/history.ts` | `/api/v1/history` |
| Downloads | `packages/backend/src/api/downloads.ts` | `/api/v1/downloads` |
| TTS | `packages/backend/src/api/tts.ts` | `/api/v1/tts` |
| Translation | `packages/backend/src/api/translation.ts` | `/api/v1/translate` |
| Settings | `packages/backend/src/api/settings.ts` | `/api/v1/settings` |
| Backup | `packages/backend/src/api/backup.ts` | `/api/v1/backup` |
| Plugins | `packages/backend/src/api/plugins.ts` | `/api/v1/plugins` |
| System | `packages/backend/src/api/system.ts` | `/api/v1/system` |
| Proxy | `packages/backend/src/api/proxy.ts` | `/api/v1/proxy` |

### 2. Create the route handler

```typescript
// packages/backend/src/api/sources.ts
import { Hono } from 'hono'
import { z } from 'zod'
import { zValidator } from '@hono/zod-validator'
import type { PluginSystem } from '@ireader/plugin-system'

const app = new Hono<{ Bindings: { pluginSystem: PluginSystem } }>()

// GET /api/v1/sources — list all sources
app.get('/', async (c) => {
  const sources = c.var.pluginSystem.getAll()
  return c.json(sources.map(s => s.info))
})

// GET /api/v1/sources/:id/popular — get popular manga
app.get('/:id/popular', zValidator('query', z.object({
  page: z.coerce.number().int().positive().default(1),
})), async (c) => {
  const { id } = c.req.param()
  const { page } = c.req.valid('query')
  const source = c.var.pluginSystem.get(id)
  if (!source) return c.json({ error: 'Source not found' }, 404)
  try {
    const result = await source.popular(page)
    return c.json(result)
  } catch (err) {
    return c.json({ error: err.message }, 500)
  }
})

export { app as sourcesRouter }
```

### 3. Response shape conventions

```typescript
// Success:
{ data: T }             // For single resources
T[]                      // For collections (array at root)
{ data: T[], total: number, page: number }  // For paginated collections

// Error:
{ error: string, code?: number, details?: unknown }

// Stream (for TTS, large payloads):
Response with Transfer-Encoding: chunked + application/octet-stream
```

### 4. Register the route in the main router

```typescript
// packages/backend/src/index.ts
import { Hono } from 'hono'
import { sourcesRouter } from './api/sources'
import { libraryRouter } from './api/library'
// ...

const app = new Hono()

app.route('/api/v1/sources', sourcesRouter)
app.route('/api/v1/library', libraryRouter)
// ...

export default app
```

### 5. Add Zod schemas for validation (if applicable)

```typescript
import { z } from 'zod'

// Keep schemas with the route handler
export const PopularQuery = z.object({
  page: z.coerce.number().int().positive().default(1),
  lang: z.string().optional(),
})

export const SearchQuery = z.object({
  q: z.string().min(1).max(200),
  page: z.coerce.number().int().positive().default(1),
})

export const LibraryAddBody = z.object({
  mangaId: z.string().min(1),
  sourceId: z.string().min(1),
  categories: z.array(z.string()).optional(),
})
```

### 6. Write tests

```typescript
// packages/backend/tests/api/sources.test.ts
import { describe, it, expect, vi } from 'vitest'
import { sourcesRouter } from '../../src/api/sources'

describe('GET /api/v1/sources/:id/popular', () => {
  it('returns manga list for valid source', async () => {
    const mockPlugin = {
      info: { id: 'demo' },
      popular: vi.fn().mockResolvedValue([
        { id: '1', title: 'Naruto', coverUrl: 'https://example.com/cover.jpg' },
      ]),
    }
    const res = await sourcesRouter.request('/demo/popular?page=1', {
      method: 'GET',
      // Injected bindings
    })
    expect(res.status).toBe(200)
    const data = await res.json()
    expect(data).toHaveLength(1)
    expect(data[0].title).toBe('Naruto')
  })

  it('returns 404 for unknown source', async () => {
    const res = await sourcesRouter.request('/nonexistent/popular')
    expect(res.status).toBe(404)
  })

  it('returns 500 on plugin error', async () => {
    // Simulate plugin throwing
    const res = await sourcesRouter.request('/error-source/popular')
    expect(res.status).toBe(500)
    const body = await res.json()
    expect(body).toHaveProperty('error')
  })
})
```

## Conventions

- Hono framework, Zod for validation
- One route file per resource domain
- Route prefix matches: `/api/v1/{resource}`
- All async handlers catch errors → return `{ error: string }` with appropriate status
- Use `zValidator` middleware for query/body/param validation
- WebSocket events in separate file: `api/ws.ts`
- Backend dependencies injected via Hono's `c.var` / `Bindings` pattern
- Never expose raw database errors to the client
- All dates returned as ISO 8601 strings
