import type { SettingsRepository, Setting } from '@ireader/core';
import type { SQLiteDriver } from '../drivers/interface.js';
export declare class SqliteSettingsRepository implements SettingsRepository {
    private driver;
    constructor(driver: SQLiteDriver);
    getAll(): Promise<Setting[]>;
    get(key: string): Promise<Setting | null>;
    set(key: string, value: unknown): Promise<void>;
    delete(key: string): Promise<void>;
}
//# sourceMappingURL=settings-repository.d.ts.map