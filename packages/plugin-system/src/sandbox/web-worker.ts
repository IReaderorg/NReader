import { parseHTML } from '../html-parser.js'
import type { SandboxAdapter, SandboxInstance, SandboxOptions } from './interface.js'

export interface WorkerSandboxInstance {
  worker: Worker
  loaded: Promise<void>
  resolveLoaded: () => void
}

export class WebWorkerSandbox implements SandboxAdapter {
  readonly type = 'web-worker' as const
  readonly name = 'WebWorker Sandbox'
  private instances = new Map<number, WorkerSandboxInstance>()
  private instanceCounter = 0

  isAvailable(): boolean {
    return typeof Worker !== 'undefined'
  }

  async create(options: SandboxOptions): Promise<SandboxInstance> {
    const id = ++this.instanceCounter
    const timeout = options.timeout ?? 30_000
    const allowedDomains = options.allowedDomains ?? []

    let resolveLoaded: () => void
    const loaded = new Promise<void>(r => { resolveLoaded = r })

    // Build worker code as blob URL — inline all shims so no extra imports needed
    const workerCode = `
// ---- shims (inlined for Worker scope) ----
self.safeFetch = (${safeFetchImpl.toString()})(${timeout}, ${JSON.stringify(allowedDomains)})
self.safeConsole = Object.freeze({
  log: console.log,
  warn: () => {},
  error: (...args) => console.error('[plugin]', ...args.map(a => typeof a === 'string' ? a : String(a)))
})
self.safeSetTimeout = (fn, ms) => setTimeout(fn, Math.min(ms, ${timeout}))
const safeAtob = ${safeAtobImpl.toString()}
const safeBtoa = ${safeBtoaImpl.toString()}

// inject parseHTML
self.parseHTML = ${parseHTML.toString()}

// no require()
self.require = (id) => { throw new Error('require() is not available in plugin sandbox') }

// ---- plugin state ----
let _pluginModule = null
let _pluginId = ''

self.addEventListener('message', async (e) => {
  const msg = e.data
  if (msg.type === 'load') {
    _pluginId = msg.pluginId
    const code = msg.code
    try {
      const mod = { exports: {} }
      const fn = new Function('module', 'exports', 'require', 'fetch', 'console', 'setTimeout', 'parseHTML', 'atob', 'btoa',
        code + '\\n//# sourceURL=' + _pluginId + '.js')
      fn(mod, mod.exports, self.require, self.safeFetch, self.safeConsole, self.safeSetTimeout, self.parseHTML, safeAtob, safeBtoa)
      _pluginModule = mod.exports.default || mod.exports
      self.postMessage({ type: 'loaded', pluginId: _pluginId })
    } catch (err) {
      self.postMessage({ type: 'error', pluginId: _pluginId, error: err.message })
    }
  } else if (msg.type === 'execute') {
    try {
      const plugin = _pluginModule
      if (!plugin || typeof plugin !== 'object') {
        self.postMessage({ type: 'result', id: msg.id, error: 'Plugin not loaded' })
        return
      }
      const val = plugin[msg.method]
      if (typeof val === 'function') {
        const result = await val.apply(plugin, msg.args)
        self.postMessage({ type: 'result', id: msg.id, value: result })
      } else {
        self.postMessage({ type: 'result', id: msg.id, value: val })
      }
    } catch (err) {
      self.postMessage({ type: 'result', id: msg.id, error: err.message })
    }
  } else if (msg.type === 'destroy') {
    self.close()
  }
})

// signal ready
self.postMessage({ type: 'ready' })
`.trim()

    const blob = new Blob([workerCode], { type: 'application/javascript' })
    const url = URL.createObjectURL(blob)
    const worker = new Worker(url)

    let callId = 0
    const pending = new Map<number, { resolve: (v: unknown) => void; reject: (e: Error) => void }>()

    worker.addEventListener('message', (e) => {
      const msg = e.data
      if (msg.type === 'ready') {
        resolveLoaded!()
      } else if (msg.type === 'result') {
        const p = pending.get(msg.id)
        if (p) {
          pending.delete(msg.id)
          if (msg.error) p.reject(new Error(msg.error))
          else p.resolve(msg.value)
        }
      }
    })

    worker.addEventListener('error', (e) => {
      pending.forEach(p => p.reject(new Error(e.message)))
      pending.clear()
    })

    const instance: WorkerSandboxInstance = {
      worker,
      loaded,
      resolveLoaded: resolveLoaded!,
    }

    this.instances.set(id, instance)

    const sandboxInstance: SandboxInstance = {
      async load(pluginId: string, code: string): Promise<void> {
        await loaded
        return new Promise((resolve, reject) => {
          const handler = (e: MessageEvent) => {
            const msg = e.data
            if (msg.type === 'loaded' && msg.pluginId === pluginId) {
              worker.removeEventListener('message', handler)
              resolve()
            } else if (msg.type === 'error' && msg.pluginId === pluginId) {
              worker.removeEventListener('message', handler)
              reject(new Error(msg.error))
            }
          }
          worker.addEventListener('message', handler)
          worker.postMessage({ type: 'load', pluginId, code })
        })
      },
      async execute(_pluginId: string, method: string, args: unknown[]): Promise<unknown> {
        const id = ++callId
        return new Promise((resolve, reject) => {
          pending.set(id, { resolve, reject })
          worker.postMessage({ type: 'execute', id, method, args })
        })
      },
      async destroy(): Promise<void> {
        worker.postMessage({ type: 'destroy' })
        worker.terminate()
        URL.revokeObjectURL(url)
      },
    }

    return sandboxInstance
  }
}

// Helper functions extracted so they toString() cleanly in the Worker blob
function safeFetchImpl(this: void) {
  return async (input: string | URL, init?: RequestInit) => {
    const url = typeof input === 'string' ? input : input.toString()
    const controller = new AbortController()
    const timer = setTimeout(() => controller.abort(), 30_000)
    try {
      return await globalThis.fetch(url, { ...init, signal: controller.signal })
    } finally {
      clearTimeout(timer)
    }
  }
}

function safeAtobImpl(this: void) {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/='
  return (s: string) => {
    let str = s.replace(/=+$/, '')
    let output = ''
    for (let i = 0; i < str.length; i += 4) {
      const a = chars.indexOf(str[i]!)
      const b = chars.indexOf(str[i + 1]!)
      const c = chars.indexOf(str[i + 2]!)
      const d = chars.indexOf(str[i + 3]!)
      output += String.fromCharCode((a << 2) | (b >> 4))
      if (c !== -1) output += String.fromCharCode(((b & 15) << 4) | (c >> 2))
      if (d !== -1) output += String.fromCharCode(((c & 3) << 6) | d)
    }
    return output
  }
}

function safeBtoaImpl(this: void) {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'
  return (s: string) => {
    let output = ''
    const bytes = new TextEncoder().encode(s)
    for (let i = 0; i < bytes.length; i += 3) {
      const b0 = bytes[i]!
      const b1 = bytes[i + 1] ?? 0
      const b2 = bytes[i + 2] ?? 0
      output += chars[b0 >> 2]
      output += chars[((b0 & 3) << 4) | (b1 >> 4)]
      output += chars[((b1 & 15) << 2) | (b2 >> 6)]
      output += chars[b2 & 63]
    }
    if (bytes.length % 3 === 1) output += '=='
    else if (bytes.length % 3 === 2) output += '='
    return output
  }
}
