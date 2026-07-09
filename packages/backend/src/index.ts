import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { healthApp } from './api/health.js'
import { sourcesApp } from './api/sources.js'

const app = new Hono()

// Middleware
app.use('/api/*', cors({ origin: ['http://localhost:5173', 'http://localhost:8080'] }))

// Mount routes
app.route('/api/v1', healthApp)
app.route('/api/v1/sources', sourcesApp)

export { app }
