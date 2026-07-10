// Pure business logic functions — no side effects
export function mergeMangaWithLibrary(manga, library) {
    return {
        ...manga,
        inLibrary: !!library,
        lastReadAt: library?.lastReadAt,
    };
}
export function formatChapterNumber(num) {
    return `Ch. ${num}`;
}
export function filterChaptersByQuery(chapters, query) {
    const q = query.toLowerCase();
    return chapters.filter((c) => c.title.toLowerCase().includes(q) ||
        String(c.number).includes(q));
}
export function sortChapters(chapters, order) {
    return [...chapters].sort((a, b) => order === 'asc' ? a.number - b.number : b.number - a.number);
}
export function computeReadingProgress(currentPage, totalPages) {
    if (totalPages <= 0)
        return 0;
    return Math.min(100, Math.round((currentPage / totalPages) * 100));
}
export function validatePluginId(id) {
    return /^[a-z0-9_-]{2,64}$/.test(id);
}
export function validateUrl(url) {
    try {
        const u = new URL(url);
        return u.protocol === 'http:' || u.protocol === 'https:';
    }
    catch {
        return false;
    }
}
//# sourceMappingURL=index.js.map