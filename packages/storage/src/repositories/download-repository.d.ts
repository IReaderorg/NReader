import type { DownloadRepository, DownloadJob, DownloadStatus } from '@ireader/core';
import type { SQLiteDriver } from '../drivers/interface.js';
export declare class SqliteDownloadRepository implements DownloadRepository {
    private driver;
    constructor(driver: SQLiteDriver);
    private rowToJob;
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
//# sourceMappingURL=download-repository.d.ts.map