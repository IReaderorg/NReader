import { Hono } from 'hono'

interface CacheEntry {
  data: ArrayBuffer
  contentType: string
  cachedAt: number
}

class ImageCache {
  private cache = new Map<string, CacheEntry>()
  private maxSize: number

  constructor(maxSize = 500) {
    this.maxSize = maxSize
  }

  get(key: string): CacheEntry | undefined {
    return this.cache.get(key)
  }

  set(key: string, entry: CacheEntry): void {
    if (this.cache.size >= this.maxSize) {
      const oldest = this.cache.entries().next().value
      if (oldest) this.cache.delete(oldest[0])
    }
    this.cache.set(key, entry)
  }

  has(key: string): boolean {
    return this.cache.has(key)
  }
}

const imageCache = new ImageCache()
const app = new Hono()

function isInternalHost(hostname: string): boolean {
  return hostname === 'localhost' || hostname === '127.0.0.1' || hostname === '0.0.0.0' ||
    hostname === '::1' || hostname.startsWith('10.') || hostname.startsWith('192.168.') ||
    (hostname.startsWith('172.') && (() => {
      const second = parseInt(hostname.split('.')[1] || '0', 10);
      return second >= 16 && second <= 31;
    })())
}

app.get('/image', async (c) => {
  const rawUrl = c.req.query('url')
  if (!rawUrl) return c.json({ error: 'url parameter required', code: 'VALIDATION_ERROR', status: 400 }, 400)

  const url = decodeURIComponent(rawUrl)

  try {
    const parsed = new URL(url)
    if (parsed.protocol !== 'http:' && parsed.protocol !== 'https:') {
      return c.json({ error: 'Only http/https URLs allowed', code: 'VALIDATION_ERROR', status: 400 }, 400)
    }
    if (isInternalHost(parsed.hostname)) {
      return c.json({ error: 'URL points to internal network', code: 'VALIDATION_ERROR', status: 400 }, 400)
    }
  } catch {
    return c.json({ error: 'Invalid URL', code: 'VALIDATION_ERROR', status: 400 }, 400)
  }

  const cacheKey = url
  const cached = imageCache.get(cacheKey)
  if (cached && Date.now() - cached.cachedAt < 7 * 24 * 60 * 60 * 1000) {
    return new Response(cached.data, {
      headers: { 'Content-Type': cached.contentType, 'Cache-Control': 'public, max-age=86400' },
    })
  }

  try {
    const response = await fetch(url, {
      headers: { 'User-Agent': 'IReader-Next/1.0', 'Accept': 'image/*' },
      signal: AbortSignal.timeout(10_000),
    })

    if (!response.ok) {
      return c.json({ error: `Image fetch failed: HTTP ${response.status}`, code: 'SOURCE_UNAVAILABLE', status: 502 }, 502)
    }

    const contentType = response.headers.get('content-type') || 'image/webp'
    const buffer = await response.arrayBuffer()

    if (buffer.byteLength > 10 * 1024 * 1024) {
      return c.json({ error: 'Image exceeds 10MB limit', code: 'VALIDATION_ERROR', status: 413 }, 413)
    }

    imageCache.set(cacheKey, { data: buffer, contentType, cachedAt: Date.now() })

    return new Response(buffer, {
      headers: {
        'Content-Type': contentType,
        'Cache-Control': 'public, max-age=86400',
        'Content-Length': String(buffer.byteLength),
      },
    })
  } catch (err) {
    return c.json({
      error: `Image fetch failed: ${err instanceof Error ? err.message : 'Unknown error'}`,
      code: 'SOURCE_UNAVAILABLE',
      status: 502,
    }, 502)
  }
})

export { app as proxyApp }
