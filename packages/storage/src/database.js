import { SqlJsDriver } from './drivers/sqljs.js';
export async function createDatabase(path) {
    return SqlJsDriver.createInMemory();
}
//# sourceMappingURL=database.js.map