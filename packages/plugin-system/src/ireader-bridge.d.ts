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
export interface IReaderMangaInfo {
    key: string;
    title: string;
    artist?: string;
    author?: string;
    description?: string;
    genres?: string[];
    status?: number;
    cover?: string;
}
export interface IReaderChapterInfo {
    key: string;
    name: string;
    dateUpload?: number;
    number?: number;
    scanlator?: string;
    type?: number;
}
export interface IReaderMangasPageInfo {
    mangas: IReaderMangaInfo[];
    hasNextPage: boolean;
}
export type IReaderPage = {
    type: 'ImageUrl';
    url: string;
} | {
    type: 'ImageBase64';
    data: string;
} | {
    type: 'Text';
    text: string;
} | {
    type: 'MovieUrl';
    url: string;
};
export interface IReaderJsDependencies {
    baseUrl: string;
    fetch: typeof globalThis.fetch;
    parseHTML: (html: string) => any;
}
export interface IReaderSource {
    id: number | string;
    name: string;
    lang: string;
    baseUrl?: string;
    versionId?: number;
    getMangaList?(sort: any, page: number): IReaderMangasPageInfo | Promise<IReaderMangasPageInfo>;
    searchManga?(query: string, page: number): IReaderMangasPageInfo | Promise<IReaderMangasPageInfo>;
    getFilters?(): any[];
    getListings?(): any[];
    getMangaDetails?(manga: IReaderMangaInfo, commands?: any[]): IReaderMangaInfo | Promise<IReaderMangaInfo>;
    getChapterList?(manga: IReaderMangaInfo, commands?: any[]): IReaderChapterInfo[] | Promise<IReaderChapterInfo[]>;
    getPageList?(chapter: IReaderChapterInfo, commands?: any[]): IReaderPage[] | Promise<IReaderPage[]>;
    fetchPopularManga?(page: number): IReaderMangasPageInfo | Promise<IReaderMangasPageInfo>;
    fetchSearchManga?(query: string, page: number): IReaderMangasPageInfo | Promise<IReaderMangasPageInfo>;
    fetchMangaDetail?(mangaKey: string): IReaderMangaInfo | Promise<IReaderMangaInfo>;
    fetchChapterList?(mangaKey: string): IReaderChapterInfo[] | Promise<IReaderChapterInfo[]>;
    fetchPageList?(chapterKey: string): IReaderPage[] | Promise<IReaderPage[]>;
    getText?(chapter: IReaderChapterInfo): string | Promise<string>;
}
/**
 * Detect whether a loaded plugin object follows the IReader source format
 * (has catalog methods like getMangaList or fetchPopularManga).
 */
export declare function isIReaderSource(plugin: Record<string, unknown>): boolean;
export interface IReaderPluginAdapter {
    info: {
        id: string;
        name: string;
        lang: string;
        baseUrl: string;
        version: string;
        capabilities: string[];
    };
    popular(page: number): Promise<any[]>;
    search(query: string, page: number): Promise<any[]>;
    mangaDetail(mangaId: string): Promise<any>;
    chapters(mangaId: string): Promise<any[]>;
    pages(chapterId: string): Promise<any[]>;
    /** Optional: get text content for novel chapters */
    getText?(chapterId: string): Promise<string>;
}
/**
 * Wrap an IReader-format source object into ireader-next's plugin format.
 * Falls back gracefully when IReader methods are absent.
 */
export declare function createIReaderAdapter(source: IReaderSource, deps: IReaderJsDependencies): IReaderPluginAdapter;
type SourceFactory = (deps: IReaderJsDependencies) => IReaderSource | Promise<IReaderSource>;
/**
 * Register an IReader source factory (mirrors IReader's `registerSource()`).
 * Call this when an IReader-format JS module exposes a factory.
 */
export declare function registerIReaderSource(id: string, factory: SourceFactory): void;
/**
 * Initialize an IReader source from its factory and return an adapter.
 */
export declare function initIReaderSource(id: string, deps: IReaderJsDependencies): Promise<IReaderPluginAdapter | null>;
/**
 * Get a cached adapter by ID.
 */
export declare function getIReaderAdapter(id: string): IReaderPluginAdapter | undefined;
/**
 * Get all registered IReader adapter IDs.
 */
export declare function getIReaderAdapterIds(): string[];
/**
 * Create default JS dependencies for IReader sources.
 */
export declare function createJsDependencies(baseUrl?: string): IReaderJsDependencies;
export {};
//# sourceMappingURL=ireader-bridge.d.ts.map