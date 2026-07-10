export function safeFetch(
  timeout: number,
  allowedDomains: string[],
): typeof globalThis.fetch {
  return async function (input: URL | RequestInfo, init?: RequestInit): Promise<Response> {
    const url = typeof input === 'string' ? input : input instanceof URL ? input.toString() : input.url
    const controller = new AbortController()
    const timer = setTimeout(() => controller.abort(), timeout)
    try {
      if (allowedDomains.length > 0) {
        const hostname = new URL(url).hostname
        const ok = allowedDomains.some(d => hostname === d || hostname.endsWith('.' + d))
        if (!ok) throw new Error(`fetch to ${hostname} not allowed`)
      }
      return await globalThis.fetch(url, { ...init, signal: controller.signal })
    } finally {
      clearTimeout(timer)
    }
  }
}

// eslint-disable-next-line @typescript-eslint/no-empty-function
const noop = () => {}

export const safeConsole: Readonly<Pick<Console, 'log' | 'warn' | 'error'>> = Object.freeze({
  log: console.log,
  warn: noop,
  error: (...args: unknown[]) => {
    console.error('[plugin]', ...args.map(a => typeof a === 'string' ? a : String(a)))
  },
})

export function safeSetTimeout(maxMs: number): typeof globalThis.setTimeout {
  return ((fn: (...args: unknown[]) => void, ms: number, ...args: unknown[]) =>
    setTimeout(fn, Math.min(ms, maxMs), ...args)) as typeof globalThis.setTimeout
}

// Use btoa/atob if available (browser/Workers), otherwise fallback to base64 via TextEncoder/TextDecoder
export const safeAtob: typeof globalThis.atob = typeof atob !== 'undefined'
  ? atob
  : (s: string) => {
      const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/='
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

export const safeBtoa: typeof globalThis.btoa = typeof btoa !== 'undefined'
  ? btoa
  : (s: string) => {
      const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'
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
