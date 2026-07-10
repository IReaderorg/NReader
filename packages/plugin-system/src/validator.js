/**
 * Validate a plugin object.
 * Supports both ireader-next format (with info property) and IReader format.
 */
export function validatePlugin(plugin) {
    const errors = [];
    if (typeof plugin !== 'object' || plugin === null) {
        return { valid: false, errors: ['plugin must be a non-null object'] };
    }
    const p = plugin;
    // Check for IReader-source format first (has getMangaList or id as number)
    if (typeof p.getMangaList === 'function' || typeof p.fetchPopularManga === 'function') {
        return { valid: true, errors: [] };
    }
    if (typeof p.id === 'number' && typeof p.name === 'string') {
        return { valid: true, errors: [] };
    }
    // Standard ireader-next format: requires info object
    if (typeof p.info !== 'object' || p.info === null) {
        errors.push('plugin.info must be a non-null object');
        return { valid: false, errors };
    }
    const info = p.info;
    if (typeof info.id !== 'string' && typeof info.id !== 'number') {
        errors.push('plugin.info.id must be a string or number');
    }
    if (typeof info.name !== 'string') {
        errors.push('plugin.info.name must be a string');
    }
    if (typeof info.baseUrl !== 'string') {
        errors.push('plugin.info.baseUrl must be a string');
    }
    else {
        try {
            new URL(info.baseUrl);
        }
        catch {
            errors.push('plugin.info.baseUrl must be a valid URL');
        }
    }
    // popular() is optional for IReader sources; only required for native format
    if (typeof p.popular !== 'function') {
        // Not an error if it has IReader methods
        if (!p.getMangaList && !p.fetchPopularManga) {
            errors.push('plugin.popular must be a function');
        }
    }
    return { valid: errors.length === 0, errors };
}
//# sourceMappingURL=validator.js.map