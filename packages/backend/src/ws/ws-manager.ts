interface WsClient {
  id: string
  send(data: string): void
  channels: Set<string>
}

interface WsEvent {
  channel: string
  event: string
  data: unknown
}

export class WebSocketManager {
  private clients = new Map<string, WsClient>()
  private eventHistory: WsEvent[] = []
  private maxHistory = 100
  private nextId = 1

  addClient(send: (data: string) => void): WsClient {
    const id = `ws-${this.nextId++}`
    const client: WsClient = { id, send, channels: new Set() }
    this.clients.set(id, client)
    return client
  }

  removeClient(id: string) {
    this.clients.delete(id)
  }

  subscribe(client: WsClient, channel: string) {
    client.channels.add(channel)
  }

  unsubscribe(client: WsClient, channel: string) {
    client.channels.delete(channel)
  }

  broadcast(channel: string, event: string, data: unknown) {
    const wsEvent: WsEvent = { channel, event, data }

    this.eventHistory.push(wsEvent)
    if (this.eventHistory.length > this.maxHistory) {
      this.eventHistory.shift()
    }

    const message = JSON.stringify(wsEvent)
    for (const client of this.clients.values()) {
      if (client.channels.has(channel)) {
        try { client.send(message) } catch { /* client may have disconnected */ }
      }
    }
  }

  sendTo(client: WsClient, channel: string, event: string, data: unknown) {
    const message = JSON.stringify({ channel, event, data })
    try { client.send(message) } catch { /* ignore */ }
  }

  getHistorySince(lastEventId: number): WsEvent[] {
    if (lastEventId < 0) return []
    return this.eventHistory.slice(lastEventId)
  }

  getClientCount(): number {
    return this.clients.size
  }
}

// Singleton
export const wsManager = new WebSocketManager()
