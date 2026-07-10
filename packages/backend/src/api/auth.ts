import { Hono } from 'hono'
import { randomUUID, createHash } from 'node:crypto'
import type { DatabaseDriver, SQLiteDriver } from '@ireader/storage'

const JWT_SECRET = process.env.JWT_SECRET || 'ireader-next-dev-secret-do-not-use-in-prod'

function base64url(data: Buffer): string {
  return data.toString('base64url')
}

function sign(payload: Record<string, unknown>, secret: string): string {
  const header = { alg: 'HS256', typ: 'JWT' }
  const headerB64 = base64url(Buffer.from(JSON.stringify(header)))
  const payloadB64 = base64url(Buffer.from(JSON.stringify(payload)))
  const signature = createHash('sha256').update(`${headerB64}.${payloadB64}${secret}`).digest('base64url')
  return `${headerB64}.${payloadB64}.${signature}`
}

function verify(token: string, secret: string): Record<string, unknown> | null {
  const parts = token.split('.')
  if (parts.length !== 3) return null
  const expectedSig = createHash('sha256').update(`${parts[0]}.${parts[1]}${secret}`).digest('base64url')
  if (parts[2] !== expectedSig) return null
  try {
    const payload = JSON.parse(Buffer.from(parts[1], 'base64url').toString())
    if (payload.exp && Date.now() >= (payload.exp as number) * 1000) return null
    return payload as Record<string, unknown>
  } catch { return null }
}

function hashPassword(password: string): string {
  return createHash('sha256').update(password + JWT_SECRET).digest('hex')
}

export function createJwtMiddleware() {
  return async (c: any, next: any) => {
    const auth = c.req.header('Authorization')
    if (!auth?.startsWith('Bearer ')) {
      return c.json({ error: 'Unauthorized', code: 'UNAUTHORIZED', status: 401 }, 401)
    }
    const token = auth.slice(7)
    const payload = verify(token, JWT_SECRET)
    if (!payload) {
      return c.json({ error: 'Invalid or expired token', code: 'UNAUTHORIZED', status: 401 }, 401)
    }
    c.set('userId', payload.sub as string)
    c.set('user', payload)
    await next()
  }
}

export function createAuthRouter(db: DatabaseDriver & SQLiteDriver): Hono {
  const app = new Hono()
  const requireAuth = createJwtMiddleware()

  // POST /auth/register
  app.post('/register', async (c) => {
    const { username, email, password } = await c.req.json<{ username: string; email: string; password: string }>()
    if (!username || !email || !password) {
      return c.json({ error: 'username, email, and password required', code: 'VALIDATION_ERROR', status: 400 }, 400)
    }
    const id = randomUUID()
    const passwordHash = hashPassword(password)
    try {
      await db.execute(
        'INSERT INTO users (id, username, email, password_hash) VALUES (?, ?, ?, ?)',
        [id, username, email, passwordHash]
      )
    } catch (err: any) {
      if (err.message?.includes('UNIQUE')) {
        return c.json({ error: 'Username or email already exists', code: 'CONFLICT', status: 409 }, 409)
      }
      throw err
    }
    const token = sign({ sub: id, username, iat: Math.floor(Date.now() / 1000) }, JWT_SECRET)
    return c.json({ id, username, email, token }, 201)
  })

  // POST /auth/login
  app.post('/login', async (c) => {
    const { username, email, password } = await c.req.json<{ username?: string; email?: string; password: string }>()
    if ((!username && !email) || !password) {
      return c.json({ error: 'username or email, and password required', code: 'VALIDATION_ERROR', status: 400 }, 400)
    }
    const field = username ? 'username' : 'email'
    const value = username || email
    const rows = await db.queryAll<{ id: string; username: string; email: string; password_hash: string }>(
      `SELECT id, username, email, password_hash FROM users WHERE ${field} = ?`,
      [value]
    )
    const user = rows[0]
    if (!user || user.password_hash !== hashPassword(password)) {
      return c.json({ error: 'Invalid credentials', code: 'UNAUTHORIZED', status: 401 }, 401)
    }
    const token = sign({ sub: user.id, username: user.username, iat: Math.floor(Date.now() / 1000) }, JWT_SECRET)
    return c.json({ id: user.id, username: user.username, email: user.email, token })
  })

  // GET /auth/me
  app.get('/me', requireAuth, async (c) => {
    const userId = c.get('userId') as string
    const rows = await db.queryAll<{ id: string; username: string; email: string; display_name: string; avatar_url: string; bio: string; created_at: string }>(
      'SELECT id, username, email, display_name, avatar_url, bio, created_at FROM users WHERE id = ?', [userId]
    )
    if (!rows[0]) return c.json({ error: 'Not found', code: 'NOT_FOUND', status: 404 }, 404)
    return c.json(rows[0])
  })

  // PUT /auth/profile
  app.put('/profile', requireAuth, async (c) => {
    const userId = c.get('userId') as string
    const body = await c.req.json<{ display_name?: string; avatar_url?: string; bio?: string }>()
    const updates: string[] = []
    const params: any[] = []
    if (body.display_name !== undefined) { updates.push('display_name = ?'); params.push(body.display_name) }
    if (body.avatar_url !== undefined) { updates.push('avatar_url = ?'); params.push(body.avatar_url) }
    if (body.bio !== undefined) { updates.push('bio = ?'); params.push(body.bio) }
    if (updates.length === 0) return c.json({ error: 'No fields to update', code: 'VALIDATION_ERROR', status: 400 }, 400)
    updates.push("updated_at = datetime('now')")
    params.push(userId)
    await db.execute(`UPDATE users SET ${updates.join(', ')} WHERE id = ?`, params)
    return c.json({ success: true })
  })

  return app
}
