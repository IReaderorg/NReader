export async function runMigrations(driver, migrations) {
    const result = await driver.queryOne('PRAGMA user_version');
    const currentVersion = result?.user_version ?? 0;
    const pending = migrations
        .filter(m => m.version > currentVersion)
        .sort((a, b) => a.version - b.version);
    if (pending.length === 0)
        return;
    for (const migration of pending) {
        await driver.transaction(async () => {
            await driver.execute(migration.sql);
            await driver.execute(`PRAGMA user_version = ${migration.version}`);
        });
    }
}
//# sourceMappingURL=migrate.js.map