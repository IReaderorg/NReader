/**
 * Madara (LNReader multisrc) → ireader-next adapter bridge
 *
 * Detects Madara-format JS sources (popularNovels, searchNovels, parseNovel, parseChapter)
 * and maps them to SourcePlugin interface.
 */
import type { IReaderPluginAdapter } from './ireader-bridge.js'
import type { IReaderJsDependencies } from './ireader-bridge.js'

export interface MadaraSource {
  id: string | number
  name: string
  lang?: string
  baseUrl?: string
  site?: string
  version?: string

  popularNovels?(page: number, options?: { filters?: any; showLatestNovels?: boolean }): Promise<Array<{ name: string; cover: string; path: string }>>
  searchNovels?(query: string, page: number): Promise<Array<{ name: string; cover: string; path: string }>>
  parseNovel?(novelPath: string): Promise<{
    name: string
    cover: string
    path: string
    summary?: string
    author?: string
    artist?: string
    status?: string
    genres?: string
    rating?: number
    chapters?: Array<{ name: string; path: string; releaseTime?: string; chapterNumber?: number }>
  }>
  parseChapter?(chapterPath: string): Promise<string>
}

export function isMadaraSource(obj: Record<string, unknown>): boolean {
  if (!obj || typeof obj !== 'object') return false
  if (typeof (obj as any).popularNovels === 'function' && typeof (obj as any).parseNovel === 'function') return true
  if (typeof (obj as any).searchNovels === 'function' && typeof (obj as any).parseNovel === 'function') return true
  return false
}

/** Safe date conversion: returns ISO string if valid, undefined otherwise */
function safeDateISO(value: unknown): string | undefined {
  if (value == null || value === '') return undefined
  try {
    const d = new Date(value as string)
    if (isNaN(d.getTime())) return undefined
    return d.toISOString()
  } catch {
    return undefined
  }
}

export function createMadaraAdapter(
  source: MadaraSource,
  _deps: IReaderJsDependencies,
): IReaderPluginAdapter {
  const baseUrl = source.site || source.baseUrl || `https://${source.name.toLowerCase().replace(/\s+/g, '')}.local`

  const caps: string[] = []
  if (typeof source.popularNovels === 'function') caps.push('popular')
  if (typeof source.searchNovels === 'function') caps.push('search')
  if (typeof source.parseNovel === 'function') caps.push('mangaDetail', 'chapters')
  if (typeof source.parseChapter === 'function') caps.push('text')

  return {
    info: {
      id: String(source.id),
      name: source.name,
      lang: source.lang || 'en',
      baseUrl,
      version: source.version || '1.0.0',
      capabilities: caps,
    },

    async popular(page: number = 1): Promise<any[]> {
      if (typeof source.popularNovels !== 'function') return []
      // Madara popularNovels expects (page, options) with filters/showLatestNovels
      const items = await source.popularNovels(page, { filters: (source as any).filters || {}, showLatestNovels: false })
      return items.map(m => ({
        id: m.path || m.name,
        title: m.name,
        coverUrl: m.cover ?? '',
        author: 'Unknown',
        status: 'unknown',
        rating: 0,
        lastUpdated: new Date().toISOString(),
      }))
    },

    async search(query: string, page: number = 1): Promise<any[]> {
      if (typeof source.searchNovels !== 'function') return []
      const items = await source.searchNovels(query, page)
      return items.map(m => ({
        id: m.path || m.name,
        title: m.name,
        coverUrl: m.cover ?? '',
        author: 'Unknown',
        status: 'unknown',
        rating: 0,
        lastUpdated: new Date().toISOString(),
      }))
    },

    async mangaDetail(mangaId: string): Promise<any> {
      if (typeof source.parseNovel !== 'function') {
        return { id: mangaId, title: source.name, coverUrl: '', description: '', genres: [], author: 'Unknown', status: 'unknown', rating: 0, lastUpdated: new Date().toISOString(), chapters: [] }
      }
      let novel: any
      try {
        novel = await source.parseNovel(mangaId)
      } catch (err) {
        console.error(`[madara-bridge] parseNovel failed for ${mangaId}:`, err)
        throw err
      }
      const chapters = (novel.chapters || []).map((ch: any, i: number) => ({
        id: ch.path || `ch-${i}`,
        number: ch.chapterNumber ?? i + 1,
        title: ch.name,
        read: false,
        downloaded: false,
        date: safeDateISO(ch.releaseTime),
      }))
      return {
        id: novel.path || mangaId,
        title: novel.name,
        coverUrl: novel.cover ?? '',
        description: novel.summary ?? '',
        genres: novel.genres ? novel.genres.split(/,\s*/).filter(Boolean) : [],
        author: novel.author ?? 'Unknown',
        status: novel.status ?? 'unknown',
        rating: novel.rating ?? 0,
        lastUpdated: new Date().toISOString(),
        chapters,
      }
    },

    async chapters(mangaId: string): Promise<any[]> {
      if (typeof source.parseNovel !== 'function') return []
      let novel: any
      try {
        novel = await source.parseNovel(mangaId)
      } catch (err) {
        console.error(`[madara-bridge] parseNovel failed for ${mangaId}:`, err)
        throw err
      }
      return (novel.chapters || []).map((ch: any, i: number) => ({
        id: ch.path || `ch-${i}`,
        number: ch.chapterNumber ?? i + 1,
        title: ch.name,
        read: false,
        downloaded: false,
        date: safeDateISO(ch.releaseTime),
      }))
    },

    async pages(_chapterId: string): Promise<any[]> {
      // Return a single text-signaling page so the reader knows to call getText().
      if (typeof source.parseChapter !== 'function') return []
      return [{ index: 0, url: '', text: '' }]
    },

    async getText(chapterId: string): Promise<string> {
      if (typeof source.parseChapter !== 'function') return ''
      try {
        // Some sources return full URLs as chapter IDs, but parseChapter() expects
        // a path relative to site/baseUrl. Strip the base URL if present.
        const baseUrl = source.site || source.baseUrl || ''
        let chapterPath = chapterId
        if (baseUrl && chapterPath.startsWith('http')) {
          try {
            const url = new URL(chapterPath)
            chapterPath = url.pathname + url.search + url.hash
          } catch { /* keep original */ }
        }

        const html = await source.parseChapter(chapterPath)
        if (!html) return ''
        // Strip HTML tags and collapse whitespace
        const stripped = html.replace(/<[^>]*>/g, '')
          .replace(/&nbsp;/g, ' ')
          .replace(/&amp;/g, '&')
          .replace(/&lt;/g, '<')
          .replace(/&gt;/g, '>')
          .replace(/&quot;/g, '"')
          .replace(/&#39;/g, "'")
          .replace(/\s+/g, ' ')
          .trim()
        return stripped
      } catch (err) {
        console.error(`[madara-bridge] getText failed for chapter ${chapterId}:`, err)
        return ''
      }
    },
  }
}
