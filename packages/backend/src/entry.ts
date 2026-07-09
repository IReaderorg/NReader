import { serve } from '@hono/node-server'
import { app } from './index.js'

const PORT = Number(process.env.PORT) || 8080

serve({ fetch: app.fetch, port: PORT }, (info) => {
  console.log(`Backend ready at http://localhost:${info.port}`)
})
