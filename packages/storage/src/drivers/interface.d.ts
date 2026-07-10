export interface QueryResult {
    changes: number;
    lastInsertRowid?: number;
}
export interface SQLiteDriver {
    query<T>(sql: string, params?: unknown[]): Promise<T[]>;
    queryOne<T>(sql: string, params?: unknown[]): Promise<T | null>;
    execute(sql: string, params?: unknown[]): Promise<QueryResult>;
    transaction<T>(fn: () => Promise<T>): Promise<T>;
    close(): Promise<void>;
}
//# sourceMappingURL=interface.d.ts.map