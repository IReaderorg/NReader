import type { Database as SqlJsDatabase } from 'sql.js';
import type { SQLiteDriver, QueryResult } from './interface.js';
export declare class SqlJsDriver implements SQLiteDriver {
    private db;
    private writeQueue;
    constructor(db: SqlJsDatabase);
    query<T>(sql: string, params?: unknown[]): Promise<T[]>;
    queryOne<T>(sql: string, params?: unknown[]): Promise<T | null>;
    execute(sql: string, params?: unknown[]): Promise<QueryResult>;
    transaction<T>(fn: () => Promise<T>): Promise<T>;
    close(): Promise<void>;
    static createInMemory(): Promise<SqlJsDriver>;
    static create(path: string, dbFactory: (bytes: Uint8Array) => SqlJsDatabase): Promise<SqlJsDriver>;
}
//# sourceMappingURL=sqljs.d.ts.map