import initSqlJs from 'sql.js';
import { readFile } from 'node:fs/promises';
export class SqlJsDriver {
    db;
    writeQueue = Promise.resolve();
    constructor(db) {
        this.db = db;
    }
    async query(sql, params) {
        const stmt = this.db.prepare(sql);
        if (params && params.length > 0) {
            stmt.bind(params);
        }
        const results = [];
        while (stmt.step()) {
            results.push(stmt.getAsObject());
        }
        stmt.free();
        return results;
    }
    async queryOne(sql, params) {
        const results = await this.query(sql, params);
        return results[0] ?? null;
    }
    async execute(sql, params) {
        this.db.run(sql, params);
        const changes = this.db.getRowsModified();
        let lastInsertRowid;
        const rowidStmt = this.db.prepare('SELECT last_insert_rowid()');
        if (rowidStmt.step()) {
            const row = rowidStmt.getAsObject();
            const val = Object.values(row)[0];
            if (typeof val === 'number' && val > 0) {
                lastInsertRowid = val;
            }
        }
        rowidStmt.free();
        return { changes, lastInsertRowid };
    }
    async transaction(fn) {
        return new Promise((resolve, reject) => {
            this.writeQueue = this.writeQueue.then(async () => {
                try {
                    this.db.run('BEGIN');
                    const result = await fn();
                    this.db.run('COMMIT');
                    resolve(result);
                }
                catch (err) {
                    this.db.run('ROLLBACK');
                    reject(err);
                }
            });
        });
    }
    async close() {
        this.db.close();
    }
    static async createInMemory() {
        const SQL = await initSqlJs();
        return new SqlJsDriver(new SQL.Database());
    }
    static async create(path, dbFactory) {
        const bytes = await readFile(path);
        const db = dbFactory(bytes);
        return new SqlJsDriver(db);
    }
}
//# sourceMappingURL=sqljs.js.map