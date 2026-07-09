import { useEffect, useRef, useCallback, useState } from 'react'

interface WsEvent {
  channel: string
  event: string
  data: unknown
}

type WsEventHandler = (event: string, data: unknown) => void

const WS_URL = `${location.protocol === 'https:' ? 'wss:' : 'ws:'}//${location.host}/ws`
const RECONNECT_DELAYS = [1000, 2000, 4000, 8000, 16000, 30000]

/**
 * useWebSocket — manages a WebSocket connection with auto-reconnect
 * and per-channel subscriptions.
 */
export function useWebSocket(channel?: string) {
  const wsRef = useRef<WebSocket | null>(null)
  const handlersRef = useRef<Map<string, WsEventHandler>>(new Map())
  const reconnectIdxRef = useRef(0)
  const reconnectTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const subscribedRef = useRef(false)
  const [connected, setConnected] = useState(false)

  const subscribe = useCallback((ch: string) => {
    if (wsRef.current?.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify({ type: 'subscribe', channel: ch }))
    }
  }, [])

  const unsubscribe = useCallback((ch: string) => {
    if (wsRef.current?.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify({ type: 'unsubscribe', channel: ch }))
    }
  }, [])

  const onEvent = useCallback((channelPattern: string, handler: WsEventHandler) => {
    handlersRef.current.set(channelPattern, handler)
    return () => { handlersRef.current.delete(channelPattern) }
  }, [])

  const connect = useCallback(() => {
    if (wsRef.current?.readyState === WebSocket.OPEN || wsRef.current?.readyState === WebSocket.CONNECTING) return

    try {
      const ws = new WebSocket(WS_URL)
      wsRef.current = ws

      ws.onopen = () => {
        setConnected(true)
        reconnectIdxRef.current = 0
        // Auto-subscribe to default channel
        if (channel && !subscribedRef.current) {
          ws.send(JSON.stringify({ type: 'subscribe', channel }))
          subscribedRef.current = true
        }
        // Re-subscribe to all registered handlers
        for (const ch of handlersRef.current.keys()) {
          ws.send(JSON.stringify({ type: 'subscribe', channel: ch }))
        }
        // Resume: request missed events
        ws.send(JSON.stringify({ type: 'resume', lastEventId: 0 }))
      }

      ws.onmessage = (event) => {
        try {
          const msg: WsEvent = JSON.parse(event.data as string)
          // Dispatch to matching handlers
          for (const [pattern, handler] of handlersRef.current.entries()) {
            if (msg.channel === pattern || pattern === '*') {
              handler(msg.event, msg.data)
            }
          }
        } catch { /* invalid message */ }
      }

      ws.onclose = () => {
        setConnected(false)
        wsRef.current = null
        scheduleReconnect()
      }

      ws.onerror = () => {
        // onclose will fire after this
      }
    } catch {
      scheduleReconnect()
    }
  }, [channel])

  const scheduleReconnect = useCallback(() => {
    const delay = RECONNECT_DELAYS[Math.min(reconnectIdxRef.current, RECONNECT_DELAYS.length - 1)] || 30000
    reconnectIdxRef.current++
    reconnectTimerRef.current = setTimeout(connect, delay)
  }, [connect])

  const disconnect = useCallback(() => {
    if (reconnectTimerRef.current) clearTimeout(reconnectTimerRef.current)
    reconnectIdxRef.current = RECONNECT_DELAYS.length // prevent reconnect
    wsRef.current?.close()
    wsRef.current = null
    subscribedRef.current = false
    setConnected(false)
  }, [])

  useEffect(() => {
    connect()
    return () => disconnect()
  }, [connect, disconnect])

  return { connected, subscribe, unsubscribe, onEvent, disconnect }
}
