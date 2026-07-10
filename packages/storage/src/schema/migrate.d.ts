import type { SQLiteDriver } from '../drivers/interface.js';
export interface Migration {
    version: number;
    name: string;
    sql: string;
}
export declare function runMigrations(driver: SQLiteDriver, migrations: Migration[]): Promise<void>;
//# sourceMappingURL=migrate.d.ts.map