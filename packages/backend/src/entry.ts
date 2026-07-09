import { serve } from '@hono/node-server'
import { startApp } from './index.js'

const PORT = Number(process.env.PORT) || 8080

const app = await startApp()

serve({ fetch: app.fetch, port: PORT }, (info) => {
  console.log(`Backend ready at http://localhost:${info.port}`)
})
