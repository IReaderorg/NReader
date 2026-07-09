import { serve } from '@hono/node-server'
import type { IncomingMessage } from 'node:http'
import { WebSocketServer, WebSocket } from 'ws'
import { startApp } from './index.js'
import { wsManager } from './ws/ws-manager.js'

const PORT = Number(process.env.PORT) || 8080

const app = await startApp()

const server = serve({ fetch: app.fetch, port: PORT }, (info) => {
  console.log(`Backend ready at http://localhost:${info.port}`)
  console.log(`WebSocket available at ws://localhost:${info.port}/ws`)
})

// Handle WebSocket upgrades with the `ws` package
const httpServer = (server as any).server as import('node:http').Server
if (httpServer) {
  const wss = new WebSocketServer({ noServer: true })

  httpServer.on('upgrade', (req: IncomingMessage, socket, head) => {
    const url = new URL(req.url || '/', `http://${req.headers.host || 'localhost'}`)
    if (url.pathname !== '/ws' && url.pathname !== '/api/v1/ws') {
      socket.destroy()
      return
    }

    wss.handleUpgrade(req, socket, head, (ws) => {
      handleWsConnection(ws)
    })
  })
}

function handleWsConnection(ws: WebSocket) {
  const client = wsManager.addClient((data: string) => {
    if (ws.readyState === WebSocket.OPEN) {
      ws.send(data)
    }
  })

  ws.on('message', (data) => {
    try {
      const msg = JSON.parse(data.toString())
      switch (msg.type) {
        case 'subscribe':
          if (msg.channel) wsManager.subscribe(client, msg.channel)
          break
        case 'unsubscribe':
          if (msg.channel) wsManager.unsubscribe(client, msg.channel)
          break
        case 'resume':
          const history = wsManager.getHistorySince(msg.lastEventId || 0)
          for (const evt of history) {
            ws.send(JSON.stringify({ channel: evt.channel, event: evt.event, data: evt.data }))
          }
          break
      }
    } catch { /* ignore invalid messages */ }
  })

  ws.on('close', () => wsManager.removeClient(client.id))
  ws.on('error', () => wsManager.removeClient(client.id))
}
