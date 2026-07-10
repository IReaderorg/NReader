import type { MangaSummary, Chapter, LibraryEntry } from '../entities/index.js';
export declare function mergeMangaWithLibrary(manga: MangaSummary, library?: LibraryEntry): MangaSummary & {
    inLibrary: boolean;
    lastReadAt?: string;
};
export declare function formatChapterNumber(num: number): string;
export declare function filterChaptersByQuery(chapters: Chapter[], query: string): Chapter[];
export declare function sortChapters(chapters: Chapter[], order: 'asc' | 'desc'): Chapter[];
export declare function computeReadingProgress(currentPage: number, totalPages: number): number;
export declare function validatePluginId(id: string): boolean;
export declare function validateUrl(url: string): boolean;
//# sourceMappingURL=index.d.ts.map