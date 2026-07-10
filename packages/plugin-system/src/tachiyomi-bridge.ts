/**
 * Tachiyomi-compatible source bridge → ireader-next adapter
 *
 * Detects Tachiyomi-format JS sources (getMangaUrl, getMangaList, etc.)
 * and maps them to SourcePlugin interface. Handles status mapping.
 */
import type { IReaderPluginAdapter } from './ireader-bridge.js'
import type { IReaderJsDependencies } from './ireader-bridge.js'

const TACHIYOMI_STATUS_MAP: Record<number, string> = {
  0: 'unknown',
  1: 'ongoing',
  2: 'completed',
  3: 'licensed',
  4: 'completed',
  5: 'cancelled',
  6: 'on hiatus',
}

export interface TachiyomiSource {
  id: string | number
  name: string
  lang?: string
  baseUrl?: string

  // Required Tachiyomi methods
  getMangaUrl?(manga: { key: string }): string
  getMangaList?(filters: any, page: number): Promise<{ mangas: any[]; hasNextPage: boolean }>
  searchManga?(query: string, page: number, filters?: any): Promise<{ mangas: any[]; hasNextPage: boolean }>
  getMangaDetails?(manga: { key: string; title: string }): Promise<any>
  getChapterList?(manga: { key: string; title: string }): Promise<any[]>
  getPageList?(chapter: { key: string; name: string }): Promise<any[]>

  // LNReader-compatible aliases
  fetchPopularManga?(page: number): Promise<{ mangas: any[]; hasNextPage: boolean }>
  fetchSearchManga?(query: string, page: number): Promise<{ mangas: any[]; hasNextPage: boolean }>
  fetchMangaDetail?(mangaKey: string): Promise<any>
  fetchChapterList?(mangaKey: string): Promise<any[]>
  fetchPageList?(chapterKey: string): Promise<any[]>

  // Text/novel support
  getText?(chapter: { key: string; name: string }): Promise<string>
  getSMangaList?(sort: any, page: number): Promise<{ mangas: any[]; hasNextPage: boolean }>
}

export function isTachiyomiSource(obj: Record<string, unknown>): boolean {
  if (!obj || typeof obj !== 'object') return false
  if (typeof obj.getMangaUrl === 'function') return true
  if (typeof obj.getMangaList === 'function' && typeof obj.getPageList === 'function') return true
  if (typeof obj.getMangaDetails === 'function' && typeof obj.getChapterList === 'function') return true
  return false
}

function mapTachiStatus(status: number | undefined): string {
  if (status === undefined || status === null) return 'unknown'
  return TACHIYOMI_STATUS_MAP[status] ?? 'unknown'
}

export function createTachiyomiAdapter(
  source: TachiyomiSource,
  _deps: IReaderJsDependencies,
): IReaderPluginAdapter {
  const baseUrl = source.baseUrl ?? `https://${source.name.toLowerCase().replace(/\s+/g, '')}.local`

  const caps: string[] = []
  if (typeof source.getMangaList === 'function' || typeof source.fetchPopularManga === 'function') caps.push('popular')
  if (typeof source.searchManga === 'function' || typeof source.fetchSearchManga === 'function') caps.push('search')
  if (typeof source.getMangaDetails === 'function' || typeof source.fetchMangaDetail === 'function') caps.push('mangaDetail')
  if (typeof source.getChapterList === 'function' || typeof source.fetchChapterList === 'function') caps.push('chapters')
  if (typeof source.getPageList === 'function' || typeof source.fetchPageList === 'function') caps.push('pages')
  if (typeof source.getText === 'function') caps.push('text')

  function toMangaSummary(manga: any): any {
    return {
      id: manga.key || `${String(source.id)}/${manga.title}`,
      title: manga.title,
      coverUrl: manga.thumbnail_url ?? manga.cover ?? '',
      author: manga.author ?? manga.artist ?? 'Unknown',
      status: mapTachiStatus(manga.status),
      rating: manga.score ?? 0,
      lastUpdated: new Date().toISOString(),
    }
  }

  function toChapter(ch: any): any {
    return {
      id: ch.key || ch.id,
      number: ch.number ?? ch.chapter_number ?? -1,
      title: ch.name ?? ch.title ?? '',
      read: false,
      downloaded: false,
      date: ch.date_upload ?? ch.date ? new Date(ch.date_upload ?? ch.date).toISOString() : undefined,
    }
  }

  return {
    info: {
      id: String(source.id),
      name: source.name,
      lang: source.lang || 'en',
      baseUrl,
      version: '1.0.0',
      capabilities: caps,
    },

    async popular(page: number = 1): Promise<any[]> {
      if (typeof source.getMangaList === 'function') {
        try {
          const result = await source.getMangaList(null, page)
          return result.mangas.map(toMangaSummary)
        } catch { /* fall through */ }
      }
      if (typeof source.fetchPopularManga === 'function') {
        try {
          const result = await source.fetchPopularManga(page)
          return result.mangas.map(toMangaSummary)
        } catch { /* fall through */ }
      }
      return []
    },

    async search(query: string, page: number = 1): Promise<any[]> {
      if (typeof source.searchManga === 'function') {
        try {
          const result = await source.searchManga(query, page, null)
          return result.mangas.map(toMangaSummary)
        } catch { /* fall through */ }
      }
      if (typeof source.fetchSearchManga === 'function') {
        try {
          const result = await source.fetchSearchManga(query, page)
          return result.mangas.map(toMangaSummary)
        } catch { /* fall through */ }
      }
      if (typeof source.getMangaList === 'function') {
        try {
          const result = await source.getMangaList(query ? [{ type: 'title', value: query }] : null, page)
          return result.mangas.map(toMangaSummary)
        } catch { /* fall through */ }
      }
      return []
    },

    async mangaDetail(mangaId: string): Promise<any> {
      if (typeof source.getMangaDetails === 'function') {
        try {
          const manga = await source.getMangaDetails({ key: mangaId, title: '' })
          const detail: any = {
            id: manga.key || mangaId,
            title: manga.title,
            coverUrl: manga.thumbnail_url ?? manga.cover ?? '',
            description: manga.description ?? '',
            genres: manga.genres ?? [],
            author: manga.author ?? manga.artist ?? 'Unknown',
            status: mapTachiStatus(manga.status),
            rating: manga.score ?? 0,
            lastUpdated: new Date().toISOString(),
            chapters: [],
            altTitles: manga.alt_names ?? [],
          }
          if (typeof source.getChapterList === 'function') {
            try {
              const chapters = await source.getChapterList({ key: mangaId, title: '' })
              detail.chapters = chapters.map(toChapter)
            } catch { /* optional */ }
          }
          return detail
        } catch { /* fall through */ }
      }
      if (typeof source.fetchMangaDetail === 'function') {
        try {
          const manga = await source.fetchMangaDetail(mangaId)
          const detail: any = {
            id: manga.key || mangaId,
            title: manga.title,
            coverUrl: manga.thumbnail_url ?? manga.cover ?? '',
            description: manga.description ?? '',
            genres: manga.genres ?? [],
            author: manga.author ?? manga.artist ?? 'Unknown',
            status: mapTachiStatus(manga.status),
            rating: manga.score ?? 0,
            lastUpdated: new Date().toISOString(),
            chapters: [],
            altTitles: manga.alt_names ?? [],
          }
          if (typeof source.fetchChapterList === 'function') {
            try {
              const chapters = await source.fetchChapterList(mangaId)
              detail.chapters = chapters.map(toChapter)
            } catch { /* optional */ }
          }
          return detail
        } catch { /* fall through */ }
      }
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
      if (typeof source.getChapterList === 'function') {
        try {
          const chapters = await source.getChapterList({ key: mangaId, title: '' })
          return chapters.map(toChapter)
        } catch { /* fall through */ }
      }
      if (typeof source.fetchChapterList === 'function') {
        try {
          const chapters = await source.fetchChapterList(mangaId)
          return chapters.map(toChapter)
        } catch { /* fall through */ }
      }
      return []
    },

    async pages(chapterId: string): Promise<any[]> {
      if (typeof source.getPageList === 'function') {
        try {
          const pages = await source.getPageList({ key: chapterId, name: '' })
          return pages.map((p: any, i: number) => ({
            index: i,
            url: p.url ?? p,
          }))
        } catch { /* fall through */ }
      }
      if (typeof source.fetchPageList === 'function') {
        try {
          const pages = await source.fetchPageList(chapterId)
          return pages.map((p: any, i: number) => ({
            index: i,
            url: p.url ?? p,
          }))
        } catch { /* fall through */ }
      }
      return []
    },

    async getText(chapterId: string): Promise<string> {
      if (typeof source.getText === 'function') {
        return source.getText({ key: chapterId, name: '' })
      }
      throw new Error(`getText not available for chapter ${chapterId}`)
    },
  }
}
