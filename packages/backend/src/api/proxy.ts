import { Hono } from 'hono'
import { getBrowserHeaders } from '../utils/fingerprint.js'

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

// --- Cookie Jar ---
const cookieJars = new Map<string, string[]>()

function getDomain(url: string): string {
  try { return new URL(url).hostname } catch { return '' }
}

function mergeCookies(domain: string, setCookie: string | string[] | undefined): void {
  if (!setCookie) return
  const existing = cookieJars.get(domain) ?? []
  const newCookies = Array.isArray(setCookie) ? setCookie : [setCookie]
  // Replace cookies with same name
  for (const nc of newCookies) {
    const name = nc.split('=')[0]!
    const idx = existing.findIndex(c => c.split('=')[0] === name)
    if (idx >= 0) existing[idx] = nc
    else existing.push(nc)
  }
  cookieJars.set(domain, existing)
}

function getCookieString(url: string): string {
  const domain = getDomain(url)
  const cookies = cookieJars.get(domain)
  return cookies ? cookies.map(c => c.split(';')[0]).join('; ') : ''
}

// --- Proxy Fetch Endpoint ---

async function proxyFetch(url: string, method: string, reqHeaders: Record<string, string>, body?: string): Promise<Response> {
  const parsed = new URL(url)
  if (parsed.protocol !== 'http:' && parsed.protocol !== 'https:') {
    return new Response(JSON.stringify({ error: 'Only http/https URLs allowed', code: 'VALIDATION_ERROR', status: 400 }), { status: 400, headers: { 'Content-Type': 'application/json' } })
  }
  if (isInternalHost(parsed.hostname)) {
    return new Response(JSON.stringify({ error: 'URL points to internal network', code: 'VALIDATION_ERROR', status: 400 }), { status: 400, headers: { 'Content-Type': 'application/json' } })
  }

  const fingerprint = getBrowserHeaders()
  const fetchHeaders: Record<string, string> = {
    ...fingerprint,
    ...reqHeaders,
  }

  const cookie = getCookieString(url)
  if (cookie) fetchHeaders['Cookie'] = cookie

  const res = await fetch(url, {
    method,
    headers: fetchHeaders,
    body: method !== 'GET' && method !== 'HEAD' ? body : undefined,
    signal: AbortSignal.timeout(30_000),
  })

  // Store cookies
  const domain = getDomain(url)
  const setCookie = res.headers.get('set-cookie')
  if (setCookie) mergeCookies(domain, setCookie)

  const text = await res.text()
  const contentType = res.headers.get('content-type') || 'text/plain'

  return new Response(text, {
    status: res.status,
    headers: {
      'Content-Type': contentType,
      'X-Proxy-Status': 'proxied',
    },
  })
}

app.get('/fetch', async (c) => {
  const rawUrl = c.req.query('url')
  if (!rawUrl) return c.json({ error: 'url query parameter required', code: 'VALIDATION_ERROR', status: 400 }, 400)
  try {
    const res = await proxyFetch(decodeURIComponent(rawUrl), 'GET', {})
    return res
  } catch (err) {
    return c.json({ error: err instanceof Error ? err.message : String(err), code: 'PROXY_ERROR', status: 502 }, 502)
  }
})

app.post('/fetch', async (c) => {
  let body: { url: string; method?: string; headers?: Record<string, string>; body?: string }
  try {
    body = await c.req.json()
  } catch {
    return c.json({ error: 'Invalid JSON body', code: 'VALIDATION_ERROR', status: 400 }, 400)
  }
  if (!body.url) return c.json({ error: 'url is required in body', code: 'VALIDATION_ERROR', status: 400 }, 400)
  try {
    const res = await proxyFetch(body.url, body.method?.toUpperCase() || 'GET', body.headers || {}, body.body)
    return res
  } catch (err) {
    return c.json({ error: err instanceof Error ? err.message : String(err), code: 'PROXY_ERROR', status: 502 }, 502)
  }
})

export { app as proxyApp }
