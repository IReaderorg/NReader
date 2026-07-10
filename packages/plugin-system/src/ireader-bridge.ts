/**
 * IReader Source Compatibility Bridge
 *
 * Adapts IReader-format JS source plugins to ireader-next's plugin format.
 *
 * IReader sources use a Kotlin-derived API:
 *   - getMangaList(sort|filters, page) → MangasPageInfo { mangas: MangaInfo[], hasNextPage }
 *   - getMangaDetails(manga, commands) → MangaInfo
 *   - getChapterList(manga, commands) → ChapterInfo[]
 *   - getPageList(chapter, commands) → Page[] (ImageUrl | Text)
 *
 * ireader-next uses a simpler JS plugin format:
 *   - info: { id, name, lang, baseUrl, version, capabilities }
 *   - popular(page) → MangaSummary[]
 *   - search(query, page) → MangaSummary[]
 *   - mangaDetail(id) → MangaDetail
 *   - chapters(mangaId) → Chapter[]
 *   - pages(chapterId) → Page[]
 */

// --- IReader data model types (mirrors kotlinx.serialization models) ---

export interface IReaderMangaInfo {
  key: string
  title: string
  artist?: string
  author?: string
  description?: string
  genres?: string[]
  status?: number
  cover?: string
}

export interface IReaderChapterInfo {
  key: string
  name: string
  dateUpload?: number
  number?: number
  scanlator?: string
  type?: number // 0=mix, 1=novel, 2=music, 3=manga, 4=movie
}

export interface IReaderMangasPageInfo {
  mangas: IReaderMangaInfo[]
  hasNextPage: boolean
}

export type IReaderPage =
  | { type: 'ImageUrl'; url: string }
  | { type: 'ImageBase64'; data: string }
  | { type: 'Text'; text: string }
  | { type: 'MovieUrl'; url: string }

export interface IReaderJsDependencies {
  baseUrl: string
  fetch: typeof globalThis.fetch
  parseHTML: (html: string) => any
}

// --- IReader Source interface (the JS equivalent of Kotlin's Source) ---

export interface IReaderSource {
  // Metadata
  id: number | string
  name: string
  lang: string
  baseUrl?: string
  versionId?: number

  // Catalog
  getMangaList?(sort: any, page: number): IReaderMangasPageInfo | Promise<IReaderMangasPageInfo>
  searchManga?(query: string, page: number): IReaderMangasPageInfo | Promise<IReaderMangasPageInfo>
  getFilters?(): any[]
  getListings?(): any[]

  // Details
  getMangaDetails?(manga: IReaderMangaInfo, commands?: any[]): IReaderMangaInfo | Promise<IReaderMangaInfo>
  getChapterList?(manga: IReaderMangaInfo, commands?: any[]): IReaderChapterInfo[] | Promise<IReaderChapterInfo[]>
  getPageList?(chapter: IReaderChapterInfo, commands?: any[]): IReaderPage[] | Promise<IReaderPage[]>

  // Convenience / alternative names used by some JS sources
  fetchPopularManga?(page: number): IReaderMangasPageInfo | Promise<IReaderMangasPageInfo>
  fetchSearchManga?(query: string, page: number): IReaderMangasPageInfo | Promise<IReaderMangasPageInfo>
  fetchMangaDetail?(mangaKey: string): IReaderMangaInfo | Promise<IReaderMangaInfo>
  fetchChapterList?(mangaKey: string): IReaderChapterInfo[] | Promise<IReaderChapterInfo[]>
  fetchPageList?(chapterKey: string): IReaderPage[] | Promise<IReaderPage[]>

  // Text content support (novels)
  getText?(chapter: IReaderChapterInfo): string | Promise<string>
}

// --- Detection ---

const IREADER_METHODS = [
  'getMangaList', 'searchManga', 'getMangaDetails',
  'getChapterList', 'getPageList',
  'fetchPopularManga', 'fetchSearchManga', 'fetchMangaDetail',
  'fetchChapterList', 'fetchPageList',
] as const
// eslint-disable-next-line @typescript-eslint/no-unused-vars
void IREADER_METHODS

/**
 * Detect whether a loaded plugin object follows the IReader source format
 * (has catalog methods like getMangaList or fetchPopularManga).
 */
export function isIReaderSource(plugin: Record<string, unknown>): boolean {
  if (!plugin || typeof plugin !== 'object') return false
  // Primary detection: has IReader-specific catalog method
  if (typeof plugin.getMangaList === 'function') return true
  if (typeof plugin.fetchPopularManga === 'function') return true
  if (typeof plugin.fetchMangaDetail === 'function') return true
  // Secondary: has the signature of a Kotlin-compiled source (id as number)
  if (typeof plugin.id === 'number' && typeof plugin.name === 'string') return true
  return false
}

// --- Status mapping ---

const IREADER_STATUS_MAP: Record<number, string> = {
  0: 'unknown',
  1: 'ongoing',
  2: 'completed',
  3: 'licensed',
  4: 'completed',
  5: 'cancelled',
  6: 'on hiatus',
}

function mapStatus(status: number | undefined): string {
  if (status === undefined || status === null) return 'unknown'
  return IREADER_STATUS_MAP[status] ?? 'unknown'
}

// --- Adapter: wraps an IReaderSource into ireader-next plugin format ---

export interface IReaderPluginAdapter {
  info: {
    id: string
    name: string
    lang: string
    baseUrl: string
    version: string
    capabilities: string[]
  }
  popular(page: number): Promise<any[]>
  search(query: string, page: number): Promise<any[]>
  mangaDetail(mangaId: string): Promise<any>
  chapters(mangaId: string): Promise<any[]>
  pages(chapterId: string): Promise<any[]>
  /** Optional: get text content for novel chapters */
  getText?(chapterId: string): Promise<string>
}

/**
 * Wrap an IReader-format source object into ireader-next's plugin format.
 * Falls back gracefully when IReader methods are absent.
 */
export function createIReaderAdapter(
  source: IReaderSource,
  deps: IReaderJsDependencies,
): IReaderPluginAdapter {
  const baseUrl = source.baseUrl ?? deps.baseUrl

  // Detect capabilities
  const caps: string[] = []
  if (typeof source.getMangaList === 'function' || typeof source.fetchPopularManga === 'function') caps.push('popular')
  if (typeof source.searchManga === 'function' || typeof source.fetchSearchManga === 'function') caps.push('search')
  if (typeof source.getMangaDetails === 'function' || typeof source.fetchMangaDetail === 'function') caps.push('mangaDetail')
  if (typeof source.getChapterList === 'function' || typeof source.fetchChapterList === 'function') caps.push('chapters')
  if (typeof source.getPageList === 'function' || typeof source.fetchPageList === 'function') caps.push('pages')
  if (typeof source.getText === 'function') caps.push('text')
  // Default to all if we can't detect but it looks like an IReader source
  if (caps.length === 0 && typeof source.id !== 'undefined') {
    caps.push('popular', 'search', 'mangaDetail', 'chapters', 'pages')
  }

  // Helper: convert IReaderMangaInfo to ireader-next MangaSummary
  function toMangaSummary(manga: IReaderMangaInfo): any {
    return {
      id: manga.key || `${String(source.id)}/${manga.title}`,
      title: manga.title,
      coverUrl: manga.cover ?? '',
      author: manga.author ?? manga.artist ?? 'Unknown',
      status: mapStatus(manga.status),
      rating: 0,
      lastUpdated: new Date().toISOString(),
    }
  }

  // Helper: convert IReaderMangaInfo to ireader-next MangaDetail
  function toMangaDetail(manga: IReaderMangaInfo): any {
    return {
      id: manga.key || String(source.id),
      title: manga.title,
      coverUrl: manga.cover ?? '',
      description: manga.description ?? '',
      genres: manga.genres ?? [],
      author: manga.author ?? manga.artist ?? 'Unknown',
      status: mapStatus(manga.status),
      rating: 0,
      lastUpdated: new Date().toISOString(),
      chapters: [],
      altTitles: [],
    }
  }

  // Helper: convert IReaderChapterInfo to ireader-next Chapter
  function toChapter(ch: IReaderChapterInfo): any {
    return {
      id: ch.key,
      number: ch.number ?? -1,
      title: ch.name,
      read: false,
      downloaded: false,
      date: ch.dateUpload ? new Date(ch.dateUpload).toISOString() : undefined,
    }
  }

  // Helper: convert IReaderPage to ireader-next Page
  function toPage(page: IReaderPage, index: number): any {
    if (page.type === 'ImageUrl' || page.type === 'ImageBase64') {
      return { index, url: (page as any).url ?? (page as any).data ?? '' }
    }
    if (page.type === 'Text') {
      // Empty URL signals text-based page; reader should show textContent
      return { index, url: '' }
    }
    return { index, url: '' }
  }

  return {
    info: {
      id: String(source.id),
      name: source.name,
      lang: source.lang || 'en',
      baseUrl,
      version: `1.0.0`,
      capabilities: caps,
    },

    async popular(page: number = 1): Promise<any[]> {
      // Try getMangaList with a listing/sort first
      if (typeof source.getMangaList === 'function') {
        try {
          const result = await source.getMangaList(null, page)
          return result.mangas.map(toMangaSummary)
        } catch { /* fall through */ }
      }
      // Try fetchPopularManga
      if (typeof source.fetchPopularManga === 'function') {
        try {
          const result = await source.fetchPopularManga(page)
          return result.mangas.map(toMangaSummary)
        } catch { /* fall through */ }
      }
      return []
    },

    async search(query: string, page: number = 1): Promise<any[]> {
      // Try searchManga
      if (typeof source.searchManga === 'function') {
        try {
          const result = await source.searchManga(query, page)
          return result.mangas.map(toMangaSummary)
        } catch { /* fall through */ }
      }
      // Try fetchSearchManga
      if (typeof source.fetchSearchManga === 'function') {
        try {
          const result = await source.fetchSearchManga(query, page)
          return result.mangas.map(toMangaSummary)
        } catch { /* fall through */ }
      }
      // Fall back to getMangaList with filters (search via filter)
      if (typeof source.getMangaList === 'function' && typeof source.getFilters === 'function') {
        try {
          const filters = source.getFilters()
          const titleFilter = filters?.find((f: any) => f.type === 'title')
          if (titleFilter) titleFilter.value = query
          const result = await source.getMangaList(filters ?? [], page)
          return result.mangas.map(toMangaSummary)
        } catch { /* fall through */ }
      }
      return []
    },

    async mangaDetail(mangaId: string): Promise<any> {
      // Try fetchMangaDetail with the key
      if (typeof source.fetchMangaDetail === 'function') {
        try {
          const manga = await source.fetchMangaDetail(mangaId)
          const detail = toMangaDetail(manga)
          // Try to get chapters too
          if (typeof source.fetchChapterList === 'function') {
            try {
              const chapters = await source.fetchChapterList(mangaId)
              detail.chapters = chapters.map(toChapter)
            } catch { /* optional */ }
          }
          return detail
        } catch { /* fall through */ }
      }
      // Try getMangaDetails
      if (typeof source.getMangaDetails === 'function') {
        try {
          const partialManga: IReaderMangaInfo = { key: mangaId, title: '' }
          const manga = await source.getMangaDetails(partialManga, [])
          const detail = toMangaDetail(manga)
          // Try to get chapters
          if (typeof source.getChapterList === 'function') {
            try {
              const chapters = await source.getChapterList(partialManga, [])
              detail.chapters = chapters.map(toChapter)
            } catch { /* optional */ }
          }
          return detail
        } catch { /* fall through */ }
      }
      // Last resort: return minimal detail
      return {
        id: mangaId,
        title: source.name,
        coverUrl: '',
        description: '',
        genres: [],
        author: 'Unknown',
        status: 'unknown',
        rating: 0,
        lastUpdated: new Date().toISOString(),
        chapters: [],
        altTitles: [],
      }
    },

    async chapters(mangaId: string): Promise<any[]> {
      if (typeof source.fetchChapterList === 'function') {
        try {
          const chapters = await source.fetchChapterList(mangaId)
          return chapters.map(toChapter)
        } catch { /* fall through */ }
      }
      if (typeof source.getChapterList === 'function') {
        try {
          const partialManga: IReaderMangaInfo = { key: mangaId, title: '' }
          const chapters = await source.getChapterList(partialManga, [])
          return chapters.map(toChapter)
        } catch { /* fall through */ }
      }
      return []
    },

    async pages(chapterId: string): Promise<any[]> {
      // Try fetchPageList
      if (typeof source.fetchPageList === 'function') {
        try {
          const pages = await source.fetchPageList(chapterId)
          return pages.map((p, i) => toPage(p, i))
        } catch { /* fall through */ }
      }
      if (typeof source.getPageList === 'function') {
        try {
          const partialChapter: IReaderChapterInfo = { key: chapterId, name: '' }
          const pages = await source.getPageList(partialChapter, [])
          return pages.map((p, i) => toPage(p, i))
        } catch { /* fall through */ }
      }
      return []
    },

    async getText(chapterId: string): Promise<string> {
      if (typeof source.getText === 'function') {
        try {
          const partialChapter: IReaderChapterInfo = { key: chapterId, name: '' }
          return await source.getText(partialChapter)
        } catch { /* fall through */ }
      }
      // Fallback: try getPageList and extract Text pages
      if (typeof source.getPageList === 'function') {
        try {
          const partialChapter: IReaderChapterInfo = { key: chapterId, name: '' }
          const pages = await source.getPageList(partialChapter, [])
          const textParts = pages
            .filter((p): p is { type: 'Text'; text: string } => p.type === 'Text')
            .map(p => p.text)
          if (textParts.length > 0) return textParts.join('\n\n')
        } catch { /* fall through */ }
      }
      throw new Error(`getText not available for chapter ${chapterId}`)
    },
  }
}

// --- Source registry for IReader-format plugins ---
// Mirrors IReader's SourceRegistry.register() pattern

type SourceFactory = (deps: IReaderJsDependencies) => IReaderSource | Promise<IReaderSource>

const factoryRegistry = new Map<string, SourceFactory>()
const adapterCache = new Map<string, IReaderPluginAdapter>()

/**
 * Register an IReader source factory (mirrors IReader's `registerSource()`).
 * Call this when an IReader-format JS module exposes a factory.
 */
export function registerIReaderSource(id: string, factory: SourceFactory): void {
  factoryRegistry.set(id, factory)
}

/**
 * Initialize an IReader source from its factory and return an adapter.
 */
export async function initIReaderSource(
  id: string,
  deps: IReaderJsDependencies,
): Promise<IReaderPluginAdapter | null> {
  const factory = factoryRegistry.get(id)
  if (!factory) return null
  try {
    const source = await factory(deps)
    const adapter = createIReaderAdapter(source, deps)
    adapterCache.set(id, adapter)
    return adapter
  } catch (err) {
    console.error(`[IReaderBridge] Failed to init source ${id}:`, err)
    return null
  }
}

/**
 * Get a cached adapter by ID.
 */
export function getIReaderAdapter(id: string): IReaderPluginAdapter | undefined {
  return adapterCache.get(id)
}

/**
 * Get all registered IReader adapter IDs.
 */
export function getIReaderAdapterIds(): string[] {
  return [...adapterCache.keys()]
}

/**
 * Create default JS dependencies for IReader sources.
 */
export function createJsDependencies(baseUrl = ''): IReaderJsDependencies {
  return {
    baseUrl,
    fetch: globalThis.fetch.bind(globalThis),
    parseHTML: (html: string) => {
      // Minimal HTML parser — uses linkedom via the existing html-parser
      // Injected at runtime
      return html
    },
  }
}
