export class MockSandbox {
    code = '';
    get name() {
        return 'mock';
    }
    isAvailable() {
        return true;
    }
    create(_options) {
        return Promise.resolve(this);
    }
    load(_pluginId, code) {
        this.code = code;
        return Promise.resolve();
    }
    execute(_method, _args) {
        return Promise.resolve([]);
    }
    destroy() {
        return Promise.resolve();
    }
}
//# sourceMappingURL=mock.js.map