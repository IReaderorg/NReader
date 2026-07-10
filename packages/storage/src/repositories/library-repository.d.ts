import type { LibraryRepository, LibraryEntry, Category } from '@ireader/core';
import type { SQLiteDriver } from '../drivers/interface.js';
export declare class SqliteLibraryRepository implements LibraryRepository {
    private driver;
    constructor(driver: SQLiteDriver);
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
//# sourceMappingURL=library-repository.d.ts.map