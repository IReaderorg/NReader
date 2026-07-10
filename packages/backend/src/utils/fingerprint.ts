export interface FingerprintHeaders extends Record<string,string> {
  'User-Agent': string
  Accept: string
  'Accept-Language': string
  'Accept-Encoding': string
  'Sec-Fetch-Dest': string
  'Sec-Fetch-Mode': string
  'Sec-Fetch-Site': string
  'Sec-Fetch-User': string
  DNT: string
}

const USER_AGENTS = [
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 14_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:126.0) Gecko/20100101 Firefox/126.0',
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 14.5; rv:126.0) Gecko/20100101 Firefox/126.0',
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36 Edg/124.0.0.0',
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 14_5) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.5 Safari/605.1.15',
]

let counter = 0

const SEC_DEST: string[] = ['document', 'empty', 'image', 'script']
const SEC_MODE: string[] = ['navigate', 'no-cors', 'cors', 'same-origin']
const SEC_SITE: string[] = ['same-origin', 'same-site', 'cross-site', 'none']

function pick<T>(arr: T[], i: number): T {
  return arr[i % arr.length]!
}

export function getBrowserHeaders(): FingerprintHeaders {
  const ua = USER_AGENTS[counter++ % USER_AGENTS.length]!
  const secDest = pick(SEC_DEST, counter >> 2)
  const secMode = pick(SEC_MODE, counter >> 3)
  const secSite = pick(SEC_SITE, counter >> 1)
  return {
    'User-Agent': ua,
    Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8',
    'Accept-Language': 'en-US,en;q=0.9',
    'Accept-Encoding': 'gzip, deflate, br',
    'Sec-Fetch-Dest': secDest,
    'Sec-Fetch-Mode': secMode,
    'Sec-Fetch-Site': secSite,
    'Sec-Fetch-User': secDest === 'document' || counter % 2 === 0 ? '?1' : '?0',
    DNT: String(counter & 1),
  }
}
