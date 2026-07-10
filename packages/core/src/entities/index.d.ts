export interface SourceInfo {
    id: string;
    name: string;
    lang: string;
    baseUrl: string;
    version: string;
    icon?: string;
    capabilities: ('popular' | 'search' | 'latest' | 'mangaDetail' | 'chapters' | 'pages')[];
}
export interface SourcePlugin {
    info: SourceInfo;
    popular(page: number): Promise<MangaSummary[]>;
    search(query: string, page: number): Promise<MangaSummary[]>;
    latest?(page: number): Promise<MangaSummary[]>;
    mangaDetail(id: string): Promise<MangaDetail>;
    chapters(mangaId: string): Promise<Chapter[]>;
    pages(chapterId: string): Promise<Page[]>;
    initialize?(): Promise<void>;
    destroy?(): Promise<void>;
}
export interface MangaSummary {
    id: string;
    title: string;
    coverUrl: string;
    url?: string;
    author?: string;
    status?: 'ongoing' | 'completed' | 'hiatus' | 'cancelled';
    rating?: number;
    lastUpdated?: string;
}
export interface MangaDetail extends MangaSummary {
    description: string;
    genres: string[];
    chapters: Chapter[];
    altTitles?: string[];
}
export interface Chapter {
    id: string;
    number: number;
    title: string;
    url?: string;
    volume?: number;
    date?: string;
    read: boolean;
    downloaded: boolean;
}
export interface Page {
    index: number;
    url: string;
    width?: number;
    height?: number;
}
export interface LibraryEntry {
    id: string;
    sourceId: string;
    mangaId: string;
    title: string;
    coverUrl: string;
    author?: string;
    status?: string;
    rating?: number;
    genres?: string[];
    description?: string;
    lastReadAt?: string;
    chaptersRead: number;
    totalChapters?: number;
    score?: number;
    favorited?: boolean;
    archived?: boolean;
    dateAdded: string;
    dateUpdated?: string;
    categoryIds: string[];
}
export interface Category {
    id: string;
    name: string;
    sortOrder: number;
    color?: string;
}
export interface HistoryEntry {
    id: string;
    mangaId: string;
    sourceId: string;
    chapterId: string;
    chapterNumber: number;
    chapterTitle?: string;
    page: number;
    scrollPosition: number;
    readAt: string;
}
export interface Setting {
    key: string;
    value: unknown;
}
export type DownloadStatus = 'queued' | 'downloading' | 'paused' | 'completed' | 'failed' | 'cancelled';
export interface DownloadJob {
    id: string;
    sourceId: string;
    mangaId: string;
    mangaTitle?: string;
    chapterId: string;
    chapterNumber: number;
    chapterTitle?: string;
    status: DownloadStatus;
    progress: number;
    bytesDownloaded: number;
    totalBytes?: number;
    priority: number;
    retryCount: number;
    maxRetries: number;
    error?: string;
    createdAt: string;
    completedAt?: string;
}
export interface PluginMeta {
    id: string;
    type: 'source' | 'theme' | 'ai' | 'sync' | 'image';
    name: string;
    version?: string;
    code?: string;
    enabled: boolean;
    installedAt: string;
    config?: Record<string, unknown>;
}
export interface ThemePlugin {
    info: {
        id: string;
        name: string;
        version: string;
        type: 'theme';
    };
    getCSS(): Promise<string>;
    getMetadata(): Promise<{
        name: string;
        description: string;
        accentColor?: string;
        bgColor?: string;
    }>;
}
export interface AIPlugin {
    info: {
        id: string;
        name: string;
        version: string;
        type: 'ai';
    };
    summarize(text: string, lang?: string): Promise<string>;
    generate(prompt: string, context?: string): Promise<string>;
    translate(text: string, targetLang: string, sourceLang?: string): Promise<string>;
}
export interface SyncPlugin {
    info: {
        id: string;
        name: string;
        version: string;
        type: 'sync';
    };
    push(data: BackupPayload): Promise<void>;
    pull(): Promise<BackupPayload>;
    testConnection(): Promise<boolean>;
}
export interface MarketplacePlugin {
    id: string;
    name: string;
    description: string;
    type: 'source' | 'theme' | 'ai' | 'sync' | 'image';
    version: string;
    author: string;
    installUrl: string;
    downloads: number;
    rating: number;
    updatedAt: string;
}
export interface BackupPayload {
    version: string;
    schemaVersion: number;
    exportedAt: string;
    library: LibraryEntry[];
    categories: Category[];
    history: HistoryEntry[];
    settings: Setting[];
    downloads: DownloadJob[];
    glossary: GlossaryEntry[];
    plugins: PluginMeta[];
    covers?: Record<string, string>;
}
export interface ApiError {
    error: string;
    code: string;
    status: number;
    details?: Record<string, unknown>;
}
export interface GlossaryEntry {
    id: string;
    sourceLang: string;
    targetLang: string;
    sourceText: string;
    targetText: string;
    context?: string;
    createdAt: string;
    updatedAt: string;
}
export interface WsMessage {
    channel: string;
    event: string;
    data: unknown;
}
//# sourceMappingURL=index.d.ts.map