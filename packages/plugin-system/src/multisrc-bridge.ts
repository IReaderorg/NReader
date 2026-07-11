/**
 * LNReader Multisrc Bridge
 *
 * All LNReader multisrc templates (madara, lightnovelwp, readnovelfull, mtlnovel,
 * lightnovelworld, hotnovelpub, ifreedom, rulate, ranobes, readwn, novelcool,
 * fictioneer, etc.) and standalone JS sources compile down to the same method
 * signature:
 *   - popularNovels(page, options?) → Promise<Array<{name, cover, path}>>
 *   - searchNovels(query, page)    → Promise<Array<{name, cover, path}>>
 *   - parseNovel(novelPath)        → Promise<{name, cover, path, summary, ...}>
 *   - parseChapter(chapterPath)    → Promise<string>
 *
 * This bridge detects any source exposing those methods and wraps it into
 * the ireader-next plugin adapter.
 *
 * The multisrc template also sets these metadata properties on the instance:
 *   - id          – numeric or string identifier
 *   - name        – display name (or sourceName)
 *   - sourceSite  – base URL of the website
 *   - site        – alias for sourceSite, set on the instance
 *   - baseUrl     – fallback URL
 *   - lang        – language code (optional)
 *   - version     – version string (optional)
 */
import type { IReaderPluginAdapter } from './ireader-bridge.js'
import type { IReaderJsDependencies } from './ireader-bridge.js'

export interface MultisrcSource {
  id: string | number
  name: string
  sourceName?: string
  lang?: string
  baseUrl?: string
  site?: string
  sourceSite?: string
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

/**
 * Detect a LNReader multisrc-format source.
 *
 * Matches any object that has at least two of the four common methods,
 * or any single one of the main entry-point methods (popularNovels / parseNovel).
 */
export function isMultisrcSource(obj: Record<string, unknown>): boolean {
  if (!obj || typeof obj !== 'object') return false

  const hasPopular = typeof (obj as any).popularNovels === 'function'
  const hasSearch = typeof (obj as any).searchNovels === 'function'
  const hasParseNovel = typeof (obj as any).parseNovel === 'function'
  const hasParseChapter = typeof (obj as any).parseChapter === 'function'

  // Require at least two methods to avoid false-positives from unrelated objects
  let count = 0
  if (hasPopular) count++
  if (hasSearch) count++
  if (hasParseNovel) count++
  if (hasParseChapter) count++

  if (count >= 2) return true

  // Also accept if it has the main entry point AND multisrc metadata
  if ((hasPopular || hasSearch) && typeof (obj as any).id !== 'undefined') return true
  if ((hasParseNovel || hasParseChapter) && typeof (obj as any).id !== 'undefined') return true

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

export function createMultisrcAdapter(
  source: MultisrcSource,
  _deps: IReaderJsDependencies,
): IReaderPluginAdapter {
  // LNReader sources put the base URL in sourceSite, site, or baseUrl
  const baseUrl = source.sourceSite || source.site || source.baseUrl || `https://${(source.sourceName || source.name || '').toLowerCase().replace(/\s+/g, '')}.local`

  // Use sourceName as the display name if available
  const displayName = source.sourceName || source.name || 'Unknown'

  const caps: string[] = []
  if (typeof source.popularNovels === 'function') caps.push('popular')
  if (typeof source.searchNovels === 'function') caps.push('search')
  if (typeof source.parseNovel === 'function') caps.push('mangaDetail', 'chapters')
  if (typeof source.parseChapter === 'function') caps.push('text')

  return {
    info: {
      id: String(source.id),
      name: displayName,
      lang: source.lang || 'en',
      baseUrl,
      version: source.version || '1.0.0',
      capabilities: caps,
    },

    async popular(page: number = 1): Promise<any[]> {
      if (typeof source.popularNovels !== 'function') return []
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
        return { id: mangaId, title: displayName, coverUrl: '', description: '', genres: [], author: 'Unknown', status: 'unknown', rating: 0, lastUpdated: new Date().toISOString(), chapters: [] }
      }
      const novel = await source.parseNovel(mangaId)
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
      const novel = await source.parseNovel(mangaId)
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
        // a path relative to this.site/sourceSite. Strip the base URL if present.
        const baseUrl = source.sourceSite || source.site || source.baseUrl || ''
        let chapterPath = chapterId
        if (baseUrl && chapterPath.startsWith('http')) {
          try {
            const url = new URL(chapterPath)
            chapterPath = url.pathname + url.search + url.hash
          } catch { /* keep original */ }
        }

        const html = await source.parseChapter(chapterPath)
        if (!html) return ''
        // Strip HTML tags and collapse whitespace into single spaces
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
        console.error(`[multisrc-bridge] getText failed for chapter ${chapterId}:`, err)
        return ''
      }
    },
  }
}
