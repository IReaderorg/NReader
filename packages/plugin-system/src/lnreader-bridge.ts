/**
 * LNReader → ireader-next adapter bridge
 *
 * Detects LNReader-format JS sources (fetchNovel, fetchChapter, fetchSearch, fetchPopular)
 * and maps them to SourcePlugin interface (mangaDetail, pages, search, popular).
 * Handles text vs image chapters.
 */
import type { IReaderPluginAdapter } from './ireader-bridge.js'
import type { IReaderJsDependencies } from './ireader-bridge.js'

export interface LNReaderSource {
  id: string | number
  name: string
  lang?: string
  baseUrl?: string

  // Text-based (novel) sources
  fetchNovel?(novelId: string): Promise<{
    id: string
    title: string
    cover?: string
    author?: string
    artist?: string
    description?: string
    genres?: string[]
    status?: number
  }>
  fetchChapter?(chapterId: string): Promise<{
    id: string
    title: string
    content: string
    number?: number
    date?: string
  }>

  // Image-based (manga) sources
  fetchSearch?(query: string, page?: number): Promise<Array<{
    id: string
    title: string
    cover?: string
    author?: string
  }>>
  fetchPopular?(page?: number): Promise<Array<{
    id: string
    title: string
    cover?: string
    author?: string
  }>>

  // Chapter listing
  fetchChapterList?(novelId: string): Promise<Array<{
    id: string
    title: string
    number?: number
    date?: string
  }>>

  // Optional
  fetchMangaDetail?(mangaKey: string): Promise<any>
  fetchPageList?(chapterKey: string): Promise<any[]>
}

/**
 * Detect LNReader-format source by checking for LNReader-specific methods.
 */
export function isLNReaderSource(obj: Record<string, unknown>): boolean {
  if (!obj || typeof obj !== 'object') return false
  if (typeof obj.fetchNovel === 'function') return true
  if (typeof obj.fetchChapter === 'function') return true
  if (typeof obj.fetchSearch === 'function' && typeof obj.fetchPopular === 'function') return true
  return false
}

/**
 * Wrap an LNReader-format source into ireader-next's plugin adapter.
 */
export function createLNReaderAdapter(
  source: LNReaderSource,
  _deps: IReaderJsDependencies,
): IReaderPluginAdapter {
  const baseUrl = source.baseUrl ?? `https://${source.name.toLowerCase().replace(/\s+/g, '')}.local`

  const caps: string[] = []
  if (typeof source.fetchPopular === 'function') caps.push('popular')
  if (typeof source.fetchSearch === 'function') caps.push('search')
  if (typeof source.fetchNovel === 'function') caps.push('mangaDetail')
  if (typeof source.fetchChapterList === 'function') caps.push('chapters')
  if (typeof source.fetchChapter === 'function') caps.push('text')
  if (typeof source.fetchPageList === 'function') caps.push('pages')

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
      if (typeof source.fetchPopular === 'function') {
        const items = await source.fetchPopular(page)
        return items.map(m => ({
          id: m.id,
          title: m.title,
          coverUrl: m.cover ?? '',
          author: m.author ?? 'Unknown',
          status: 'unknown',
          rating: 0,
          lastUpdated: new Date().toISOString(),
        }))
      }
      return []
    },

    async search(query: string, page: number = 1): Promise<any[]> {
      if (typeof source.fetchSearch === 'function') {
        const items = await source.fetchSearch(query, page)
        return items.map(m => ({
          id: m.id,
          title: m.title,
          coverUrl: m.cover ?? '',
          author: m.author ?? 'Unknown',
          status: 'unknown',
          rating: 0,
          lastUpdated: new Date().toISOString(),
        }))
      }
      return []
    },

    async mangaDetail(mangaId: string): Promise<any> {
      if (typeof source.fetchNovel === 'function') {
        const novel = await source.fetchNovel(mangaId)
        const detail: any = {
          id: novel.id,
          title: novel.title,
          coverUrl: novel.cover ?? '',
          description: novel.description ?? '',
          genres: novel.genres ?? [],
          author: novel.author ?? novel.artist ?? 'Unknown',
          status: novel.status !== undefined
            ? ['unknown', 'ongoing', 'completed', 'licensed', 'completed', 'cancelled', 'on hiatus'][novel.status] ?? 'unknown'
            : 'unknown',
          rating: 0,
          lastUpdated: new Date().toISOString(),
          chapters: [],
          altTitles: [],
        }
        if (typeof source.fetchChapterList === 'function') {
          const chapters = await source.fetchChapterList(mangaId)
          detail.chapters = chapters.map((ch: any) => ({
            id: ch.id,
            number: ch.number ?? -1,
            title: ch.title,
            read: false,
            downloaded: false,
            date: ch.date ? new Date(ch.date).toISOString() : undefined,
          }))
        }
        return detail
      }
      if (typeof source.fetchMangaDetail === 'function') {
        return source.fetchMangaDetail(mangaId)
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
      if (typeof source.fetchChapterList === 'function') {
        const chapters = await source.fetchChapterList(mangaId)
        return chapters.map((ch: any) => ({
          id: ch.id,
          number: ch.number ?? -1,
          title: ch.title,
          read: false,
          downloaded: false,
          date: ch.date ? new Date(ch.date).toISOString() : undefined,
        }))
      }
      return []
    },

    async pages(_chapterId: string): Promise<any[]> {
      if (typeof source.fetchPageList === 'function') {
        return source.fetchPageList(_chapterId)
      }
      return []
    },

    async getText(chapterId: string): Promise<string> {
      if (typeof source.fetchChapter === 'function') {
        const chapter = await source.fetchChapter(chapterId)
        return chapter.content
      }
      throw new Error(`getText not available for chapter ${chapterId}`)
    },
  }
}
