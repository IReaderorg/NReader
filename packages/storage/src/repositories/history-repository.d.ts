import type { HistoryRepository, HistoryEntry } from '@ireader/core';
import type { SQLiteDriver } from '../drivers/interface.js';
export declare class SqliteHistoryRepository implements HistoryRepository {
    private driver;
    constructor(driver: SQLiteDriver);
    getAll(): Promise<HistoryEntry[]>;
    getByManga(mangaId: string): Promise<HistoryEntry[]>;
    add(entry: HistoryEntry): Promise<void>;
    update(entry: Partial<HistoryEntry> & {
        id: string;
    }): Promise<void>;
    remove(mangaId: string): Promise<void>;
    getLatest(): Promise<HistoryEntry | null>;
}
//# sourceMappingURL=history-repository.d.ts.map