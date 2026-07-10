export class SqliteSettingsRepository {
    driver;
    constructor(driver) {
        this.driver = driver;
    }
    async getAll() {
        const rows = await this.driver.query('SELECT * FROM settings');
        return rows.map(row => ({ key: row.key, value: JSON.parse(row.value) }));
    }
    async get(key) {
        const row = await this.driver.queryOne('SELECT * FROM settings WHERE key = ?', [key]);
        if (!row)
            return null;
        return { key: row.key, value: JSON.parse(row.value) };
    }
    async set(key, value) {
        await this.driver.execute('INSERT OR REPLACE INTO settings (key, value) VALUES (?, ?)', [key, JSON.stringify(value)]);
    }
    async delete(key) {
        await this.driver.execute('DELETE FROM settings WHERE key = ?', [key]);
    }
}
//# sourceMappingURL=settings-repository.js.map