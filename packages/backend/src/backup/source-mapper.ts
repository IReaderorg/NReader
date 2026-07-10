// Source ID mapper between LNReader and IReader-Next formats
// ponytail: hardcoded mapping table, upgrade to configurable JSON when cross-app sources stabilize

const DEFAULT_MAP: Record<string, string> = {
  // LNReader source IDs → IReader-Next source IDs
  'mangadex': 'mangadex',
  'mangakakalot': 'mangakakalot',
  'manganato': 'manganato',
  'mangafox': 'mangafox',
  'mangahere': 'mangahere',
  'mangapanda': 'mangapanda',
  'mangareader': 'mangareader',
  'mangasee': 'mangasee',
  'mangaworld': 'mangaworld',
  'mangabox': 'mangabox',
  'mangaplus': 'mangaplus',
  'mangadex.org': 'mangadex',
  'mangakakalot.com': 'mangakakalot',
  'manganato.com': 'manganato',
  'mangafox.me': 'mangafox',
  'mangahere.com': 'mangahere',
  'mangapanda.com': 'mangapanda',
  'mangareader.net': 'mangareader',
  'mangasee123.com': 'mangasee',
  'mangaworld.to': 'mangaworld',
  'mangabox.me': 'mangabox',
  'mangaplus.shueisha.co.jp': 'mangaplus',
  'reaperscans': 'reaperscans',
  'reaper-scans': 'reaperscans',
  'flamescans': 'flamescans',
  'flame-scans': 'flamescans',
  'asurascans': 'asurascans',
  'asura-scans': 'asurascans',
  'leviatanscans': 'leviatanscans',
  'leviatan-scans': 'leviatanscans',
  'luminousscans': 'luminousscans',
  'luminous-scans': 'luminousscans',
  'infernalvoidscans': 'infernalvoidscans',
  'infernal-void-scans': 'infernalvoidscans',
  'batoto': 'batoto',
  'bato.to': 'batoto',
  'manga buddy': 'mangabuddy',
  'mangabuddy': 'mangabuddy',
}

const REVERSE_MAP: Record<string, string> = {}
for (const [k, v] of Object.entries(DEFAULT_MAP)) {
  REVERSE_MAP[v] = k
}

export class SourceMapper {
  private mapping: Record<string, string>

  constructor(initial?: Record<string, string>) {
    this.mapping = { ...DEFAULT_MAP, ...initial }
  }

  /** Map an LNReader source ID to an IReader-Next source ID */
  mapSourceId(lnreaderId: string): string {
    const normalized = lnreaderId.toLowerCase().trim()
    return this.mapping[normalized] ?? normalized
  }

  /** Map an IReader-Next source ID back to an LNReader source ID */
  reverseMap(ireaderNextId: string): string {
    const normalized = ireaderNextId.toLowerCase().trim()
    return REVERSE_MAP[normalized] ?? normalized
  }

  /** Register a custom source mapping */
  registerSourceMapping(lnreaderId: string, ireaderNextId: string): void {
    this.mapping[lnreaderId.toLowerCase().trim()] = ireaderNextId.toLowerCase().trim()
  }

  /** Add bulk mappings */
  addMappings(mappings: Record<string, string>): void {
    for (const [k, v] of Object.entries(mappings)) {
      this.registerSourceMapping(k, v)
    }
  }
}

export const defaultSourceMapper = new SourceMapper()
