import type { MangaSummary, MangaDetail, Chapter, Page, LibraryEntry } from '../entities/index.js'

// Pure business logic functions — no side effects
export function mergeMangaWithLibrary(
  manga: MangaSummary,
  library?: LibraryEntry
): MangaSummary & { inLibrary: boolean; lastReadAt?: string } {
  return {
    ...manga,
    inLibrary: !!library,
    lastReadAt: library?.lastReadAt,
  }
}

export function formatChapterNumber(num: number): string {
  return `Ch. ${num}`
}

export function filterChaptersByQuery(chapters: Chapter[], query: string): Chapter[] {
  const q = query.toLowerCase()
  return chapters.filter(
    (c) =>
      c.title.toLowerCase().includes(q) ||
      String(c.number).includes(q)
  )
}

export function sortChapters(chapters: Chapter[], order: 'asc' | 'desc'): Chapter[] {
  return [...chapters].sort((a, b) =>
    order === 'asc' ? a.number - b.number : b.number - a.number
  )
}

export function computeReadingProgress(currentPage: number, totalPages: number): number {
  if (totalPages <= 0) return 0
  return Math.min(100, Math.round((currentPage / totalPages) * 100))
}

export function validatePluginId(id: string): boolean {
  return /^[a-z0-9_-]{2,64}$/.test(id)
}

export function validateUrl(url: string): boolean {
  try {
    const u = new URL(url)
    return u.protocol === 'http:' || u.protocol === 'https:'
  } catch {
    return false
  }
}
