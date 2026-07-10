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
// --- Detection ---
const IREADER_METHODS = [
    'getMangaList', 'searchManga', 'getMangaDetails',
    'getChapterList', 'getPageList',
    'fetchPopularManga', 'fetchSearchManga', 'fetchMangaDetail',
    'fetchChapterList', 'fetchPageList',
];
/**
 * Detect whether a loaded plugin object follows the IReader source format
 * (has catalog methods like getMangaList or fetchPopularManga).
 */
export function isIReaderSource(plugin) {
    if (!plugin || typeof plugin !== 'object')
        return false;
    // Primary detection: has IReader-specific catalog method
    if (typeof plugin.getMangaList === 'function')
        return true;
    if (typeof plugin.fetchPopularManga === 'function')
        return true;
    if (typeof plugin.fetchMangaDetail === 'function')
        return true;
    // Secondary: has the signature of a Kotlin-compiled source (id as number)
    if (typeof plugin.id === 'number' && typeof plugin.name === 'string')
        return true;
    return false;
}
// --- Status mapping ---
const IREADER_STATUS_MAP = {
    0: 'unknown',
    1: 'ongoing',
    2: 'completed',
    3: 'licensed',
    4: 'completed',
    5: 'cancelled',
    6: 'on hiatus',
};
function mapStatus(status) {
    if (status === undefined || status === null)
        return 'unknown';
    return IREADER_STATUS_MAP[status] ?? 'unknown';
}
/**
 * Wrap an IReader-format source object into ireader-next's plugin format.
 * Falls back gracefully when IReader methods are absent.
 */
export function createIReaderAdapter(source, deps) {
    const baseUrl = source.baseUrl ?? deps.baseUrl;
    // Detect capabilities
    const caps = [];
    if (typeof source.getMangaList === 'function' || typeof source.fetchPopularManga === 'function')
        caps.push('popular');
    if (typeof source.searchManga === 'function' || typeof source.fetchSearchManga === 'function')
        caps.push('search');
    if (typeof source.getMangaDetails === 'function' || typeof source.fetchMangaDetail === 'function')
        caps.push('mangaDetail');
    if (typeof source.getChapterList === 'function' || typeof source.fetchChapterList === 'function')
        caps.push('chapters');
    if (typeof source.getPageList === 'function' || typeof source.fetchPageList === 'function')
        caps.push('pages');
    if (typeof source.getText === 'function')
        caps.push('text');
    // Default to all if we can't detect but it looks like an IReader source
    if (caps.length === 0 && typeof source.id !== 'undefined') {
        caps.push('popular', 'search', 'mangaDetail', 'chapters', 'pages');
    }
    // Helper: convert IReaderMangaInfo to ireader-next MangaSummary
    function toMangaSummary(manga) {
        return {
            id: manga.key || `${String(source.id)}/${manga.title}`,
            title: manga.title,
            coverUrl: manga.cover ?? '',
            author: manga.author ?? manga.artist ?? 'Unknown',
            status: mapStatus(manga.status),
            rating: 0,
            lastUpdated: new Date().toISOString(),
        };
    }
    // Helper: convert IReaderMangaInfo to ireader-next MangaDetail
    function toMangaDetail(manga) {
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
        };
    }
    // Helper: convert IReaderChapterInfo to ireader-next Chapter
    function toChapter(ch) {
        return {
            id: ch.key,
            number: ch.number ?? -1,
            title: ch.name,
            read: false,
            downloaded: false,
            date: ch.dateUpload ? new Date(ch.dateUpload).toISOString() : undefined,
        };
    }
    // Helper: convert IReaderPage to ireader-next Page
    function toPage(page, index) {
        if (page.type === 'ImageUrl' || page.type === 'ImageBase64') {
            return { index, url: page.url ?? page.data ?? '' };
        }
        if (page.type === 'Text') {
            // Empty URL signals text-based page; reader should show textContent
            return { index, url: '' };
        }
        return { index, url: '' };
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
        async popular(page = 1) {
            // Try getMangaList with a listing/sort first
            if (typeof source.getMangaList === 'function') {
                try {
                    const result = await source.getMangaList(null, page);
                    return result.mangas.map(toMangaSummary);
                }
                catch { /* fall through */ }
            }
            // Try fetchPopularManga
            if (typeof source.fetchPopularManga === 'function') {
                try {
                    const result = await source.fetchPopularManga(page);
                    return result.mangas.map(toMangaSummary);
                }
                catch { /* fall through */ }
            }
            return [];
        },
        async search(query, page = 1) {
            // Try searchManga
            if (typeof source.searchManga === 'function') {
                try {
                    const result = await source.searchManga(query, page);
                    return result.mangas.map(toMangaSummary);
                }
                catch { /* fall through */ }
            }
            // Try fetchSearchManga
            if (typeof source.fetchSearchManga === 'function') {
                try {
                    const result = await source.fetchSearchManga(query, page);
                    return result.mangas.map(toMangaSummary);
                }
                catch { /* fall through */ }
            }
            // Fall back to getMangaList with filters (search via filter)
            if (typeof source.getMangaList === 'function' && typeof source.getFilters === 'function') {
                try {
                    const filters = source.getFilters();
                    const titleFilter = filters?.find((f) => f.type === 'title');
                    if (titleFilter)
                        titleFilter.value = query;
                    const result = await source.getMangaList(filters ?? [], page);
                    return result.mangas.map(toMangaSummary);
                }
                catch { /* fall through */ }
            }
            return [];
        },
        async mangaDetail(mangaId) {
            // Try fetchMangaDetail with the key
            if (typeof source.fetchMangaDetail === 'function') {
                try {
                    const manga = await source.fetchMangaDetail(mangaId);
                    const detail = toMangaDetail(manga);
                    // Try to get chapters too
                    if (typeof source.fetchChapterList === 'function') {
                        try {
                            const chapters = await source.fetchChapterList(mangaId);
                            detail.chapters = chapters.map(toChapter);
                        }
                        catch { /* optional */ }
                    }
                    return detail;
                }
                catch { /* fall through */ }
            }
            // Try getMangaDetails
            if (typeof source.getMangaDetails === 'function') {
                try {
                    const partialManga = { key: mangaId, title: '' };
                    const manga = await source.getMangaDetails(partialManga, []);
                    const detail = toMangaDetail(manga);
                    // Try to get chapters
                    if (typeof source.getChapterList === 'function') {
                        try {
                            const chapters = await source.getChapterList(partialManga, []);
                            detail.chapters = chapters.map(toChapter);
                        }
                        catch { /* optional */ }
                    }
                    return detail;
                }
                catch { /* fall through */ }
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
            };
        },
        async chapters(mangaId) {
            if (typeof source.fetchChapterList === 'function') {
                try {
                    const chapters = await source.fetchChapterList(mangaId);
                    return chapters.map(toChapter);
                }
                catch { /* fall through */ }
            }
            if (typeof source.getChapterList === 'function') {
                try {
                    const partialManga = { key: mangaId, title: '' };
                    const chapters = await source.getChapterList(partialManga, []);
                    return chapters.map(toChapter);
                }
                catch { /* fall through */ }
            }
            return [];
        },
        async pages(chapterId) {
            // Try fetchPageList
            if (typeof source.fetchPageList === 'function') {
                try {
                    const pages = await source.fetchPageList(chapterId);
                    return pages.map((p, i) => toPage(p, i));
                }
                catch { /* fall through */ }
            }
            if (typeof source.getPageList === 'function') {
                try {
                    const partialChapter = { key: chapterId, name: '' };
                    const pages = await source.getPageList(partialChapter, []);
                    return pages.map((p, i) => toPage(p, i));
                }
                catch { /* fall through */ }
            }
            return [];
        },
        async getText(chapterId) {
            if (typeof source.getText === 'function') {
                try {
                    const partialChapter = { key: chapterId, name: '' };
                    return await source.getText(partialChapter);
                }
                catch { /* fall through */ }
            }
            // Fallback: try getPageList and extract Text pages
            if (typeof source.getPageList === 'function') {
                try {
                    const partialChapter = { key: chapterId, name: '' };
                    const pages = await source.getPageList(partialChapter, []);
                    const textParts = pages
                        .filter((p) => p.type === 'Text')
                        .map(p => p.text);
                    if (textParts.length > 0)
                        return textParts.join('\n\n');
                }
                catch { /* fall through */ }
            }
            throw new Error(`getText not available for chapter ${chapterId}`);
        },
    };
}
const factoryRegistry = new Map();
const adapterCache = new Map();
/**
 * Register an IReader source factory (mirrors IReader's `registerSource()`).
 * Call this when an IReader-format JS module exposes a factory.
 */
export function registerIReaderSource(id, factory) {
    factoryRegistry.set(id, factory);
}
/**
 * Initialize an IReader source from its factory and return an adapter.
 */
export async function initIReaderSource(id, deps) {
    const factory = factoryRegistry.get(id);
    if (!factory)
        return null;
    try {
        const source = await factory(deps);
        const adapter = createIReaderAdapter(source, deps);
        adapterCache.set(id, adapter);
        return adapter;
    }
    catch (err) {
        console.error(`[IReaderBridge] Failed to init source ${id}:`, err);
        return null;
    }
}
/**
 * Get a cached adapter by ID.
 */
export function getIReaderAdapter(id) {
    return adapterCache.get(id);
}
/**
 * Get all registered IReader adapter IDs.
 */
export function getIReaderAdapterIds() {
    return [...adapterCache.keys()];
}
/**
 * Create default JS dependencies for IReader sources.
 */
export function createJsDependencies(baseUrl = '') {
    return {
        baseUrl,
        fetch: globalThis.fetch.bind(globalThis),
        parseHTML: (html) => {
            // Minimal HTML parser — uses linkedom via the existing html-parser
            // Injected at runtime
            return html;
        },
    };
}
//# sourceMappingURL=ireader-bridge.js.map