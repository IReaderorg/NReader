import type { GlossaryRepository, GlossaryEntry } from '@ireader/core';
import type { SQLiteDriver } from '../drivers/interface.js';
export declare class SqliteGlossaryRepository implements GlossaryRepository {
    private driver;
    constructor(driver: SQLiteDriver);
    getAll(): Promise<GlossaryEntry[]>;
    getById(id: string): Promise<GlossaryEntry | null>;
    search(sourceText: string, sourceLang: string, targetLang: string): Promise<GlossaryEntry | null>;
    add(entry: GlossaryEntry): Promise<void>;
    update(entry: Partial<GlossaryEntry> & {
        id: string;
    }): Promise<void>;
    remove(id: string): Promise<void>;
}
//# sourceMappingURL=glossary-repository.d.ts.map