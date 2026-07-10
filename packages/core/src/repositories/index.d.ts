import type { LibraryEntry, Category, HistoryEntry, Setting, DownloadJob, DownloadStatus, PluginMeta, GlossaryEntry } from '../entities/index.js';
export interface LibraryRepository {
    getAll(): Promise<LibraryEntry[]>;
    getById(id: string): Promise<LibraryEntry | null>;
    add(entry: LibraryEntry): Promise<void>;
    update(entry: Partial<LibraryEntry> & {
        id: string;
    }): Promise<void>;
    remove(id: string): Promise<void>;
    getCategories(): Promise<Category[]>;
    addCategory(category: Category): Promise<void>;
    updateCategory(category: Partial<Category> & {
        id: string;
    }): Promise<void>;
    removeCategory(id: string): Promise<void>;
}
export interface HistoryRepository {
    getAll(): Promise<HistoryEntry[]>;
    getByManga(mangaId: string): Promise<HistoryEntry[]>;
    add(entry: HistoryEntry): Promise<void>;
    update(entry: Partial<HistoryEntry> & {
        id: string;
    }): Promise<void>;
    remove(mangaId: string): Promise<void>;
    getLatest(): Promise<HistoryEntry | null>;
}
export interface SettingsRepository {
    getAll(): Promise<Setting[]>;
    get(key: string): Promise<Setting | null>;
    set(key: string, value: unknown): Promise<void>;
    delete(key: string): Promise<void>;
}
export interface DownloadRepository {
    getAll(): Promise<DownloadJob[]>;
    getById(id: string): Promise<DownloadJob | null>;
    add(job: DownloadJob): Promise<void>;
    update(job: Partial<DownloadJob> & {
        id: string;
    }): Promise<void>;
    remove(id: string): Promise<void>;
    getActive(): Promise<DownloadJob[]>;
    getByManga(mangaId: string): Promise<DownloadJob[]>;
    getByStatus(status: DownloadStatus): Promise<DownloadJob[]>;
    getQueue(): Promise<DownloadJob[]>;
    updateQueueOrder(ids: string[]): Promise<void>;
    removeByManga(mangaId: string): Promise<void>;
    removeByChapter(chapterId: string): Promise<void>;
    getStorageStats(): Promise<{
        totalBytes: number;
        totalChapters: number;
        mangaCount: number;
    }>;
    getRetryCount(id: string): Promise<number>;
}
export interface PluginRepository {
    getAll(): Promise<PluginMeta[]>;
    getById(id: string): Promise<PluginMeta | null>;
    add(plugin: PluginMeta): Promise<void>;
    update(plugin: Partial<PluginMeta> & {
        id: string;
    }): Promise<void>;
    remove(id: string): Promise<void>;
}
export interface GlossaryRepository {
    getAll(): Promise<GlossaryEntry[]>;
    getById(id: string): Promise<GlossaryEntry | null>;
    search(sourceText: string, sourceLang: string, targetLang: string): Promise<GlossaryEntry | null>;
    add(entry: GlossaryEntry): Promise<void>;
    update(entry: Partial<GlossaryEntry> & {
        id: string;
    }): Promise<void>;
    remove(id: string): Promise<void>;
}
//# sourceMappingURL=index.d.ts.map