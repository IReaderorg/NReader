// Legacy backup migrator - v1 → v2 format migration
// ponytail: v2 is the current; add v3→v4 etc. when format changes

import type { BackupPayload } from '@ireader/core'

interface V1LibraryEntry {
  id?: string
  sourceId?: string
  mangaId?: string
  title?: string
  coverUrl?: string
  author?: string
  status?: string
  genres?: string | string[]
  description?: string
  lastReadAt?: string
  chaptersRead?: number
  totalChapters?: number
  score?: number
  dateAdded?: string
  categoryIds?: string[]
  // old field names
  manga_id?: string
  source_id?: string
  cover_url?: string
  last_read_at?: string
  date_added?: string
  category_ids?: string[]
  readChapters?: number
  totalChaptersNum?: number
}

interface V1HistoryEntry {
  id?: string
  mangaId?: string
  sourceId?: string
  chapterId?: string
  chapterNumber?: number
  chapterTitle?: string
  page?: number
  scrollPosition?: number
  readAt?: string
  // old field names
  manga_id?: string
  source_id?: string
  chapter_id?: string
  chapter_number?: number
  read_at?: string
  scroll_position?: number
}

interface V1Category {
  id?: string
  name?: string
  sortOrder?: number
  color?: string
  // old
  sort_order?: number
}

interface V1Payload {
  version?: string | number
  schemaVersion?: number
  exportedAt?: string
  library?: V1LibraryEntry[]
  categories?: V1Category[]
  history?: V1HistoryEntry[]
  settings?: Record<string, unknown>[]
  downloads?: unknown[]
  glossary?: unknown[]
  plugins?: unknown[]
  covers?: Record<string, string>
}

function toArray(val: unknown): string[] {
  if (Array.isArray(val)) return val
  if (typeof val === 'string') return val ? [val] : []
  return []
}

function migrateLibraryEntry(e: V1LibraryEntry): Record<string, unknown> {
  return {
    id: e.id ?? e.manga_id ?? '',
    sourceId: e.sourceId ?? e.source_id ?? '',
    mangaId: e.mangaId ?? e.manga_id ?? '',
    title: e.title ?? '',
    coverUrl: e.coverUrl ?? e.cover_url ?? '',
    author: e.author ?? '',
    status: e.status ?? '',
    genres: toArray(e.genres),
    description: e.description ?? '',
    lastReadAt: e.lastReadAt ?? e.last_read_at ?? '',
    chaptersRead: e.chaptersRead ?? e.readChapters ?? 0,
    totalChapters: e.totalChapters ?? e.totalChaptersNum ?? undefined,
    score: e.score ?? undefined,
    dateAdded: e.dateAdded ?? e.date_added ?? new Date().toISOString(),
    categoryIds: Array.isArray(e.categoryIds ?? e.category_ids) ? (e.categoryIds ?? e.category_ids ?? []) : [],
  }
}

function migrateHistoryEntry(e: V1HistoryEntry): Record<string, unknown> {
  return {
    id: e.id ?? '',
    mangaId: e.mangaId ?? e.manga_id ?? '',
    sourceId: e.sourceId ?? e.source_id ?? '',
    chapterId: e.chapterId ?? e.chapter_id ?? '',
    chapterNumber: e.chapterNumber ?? e.chapter_number ?? 0,
    chapterTitle: e.chapterTitle ?? '',
    page: e.page ?? 0,
    scrollPosition: e.scrollPosition ?? e.scroll_position ?? 0,
    readAt: e.readAt ?? e.read_at ?? new Date().toISOString(),
  }
}

function migrateCategory(c: V1Category): Record<string, unknown> {
  return {
    id: c.id ?? '',
    name: c.name ?? '',
    sortOrder: c.sortOrder ?? c.sort_order ?? 0,
    color: c.color ?? undefined,
  }
}

export class LegacyMigrator {
  /** Detect if a backup is v1 format */
  isV1(data: Record<string, unknown>): boolean {
    // V1 has no version, or version is missing/1, or uses snake_case keys
    const v = data['version']
    if (v === undefined || v === 1 || v === '1') return true
    // Check for snake_case keys in first library entry
    const lib = data['library']
    if (Array.isArray(lib) && lib.length > 0) {
      const first = lib[0] as Record<string, unknown>
      if (first['manga_id'] !== undefined || first['source_id'] !== undefined) return true
    }
    return false
  }

  /** Migrate v1 backup data to v2 BackupPayload */
  migrate(backupData: Record<string, unknown>): BackupPayload {
    const v1 = backupData as V1Payload
    const now = new Date().toISOString()

    const library: Record<string, unknown>[] = (v1.library ?? []).map(migrateLibraryEntry)
    const categories: Record<string, unknown>[] = (v1.categories ?? []).map(migrateCategory)
    const history: Record<string, unknown>[] = (v1.history ?? []).map(migrateHistoryEntry)

    return {
      version: '0.1.0',
      schemaVersion: v1.schemaVersion ?? 3,
      exportedAt: v1.exportedAt ?? now,
      library,
      categories,
      history,
      settings: (v1.settings ?? []).map((s: Record<string, unknown>) => ({
        key: s.key ?? '',
        value: s.value ?? null,
      })),
      downloads: v1.downloads ?? [],
      glossary: v1.glossary ?? [],
      plugins: v1.plugins ?? [],
      covers: v1.covers,
    } as unknown as BackupPayload
  }

  /** One-shot: detect version and migrate if needed */
  ensureV2(data: Record<string, unknown>): BackupPayload {
    if (this.isV1(data)) {
      return this.migrate(data)
    }
    // Already v2+, return cast
    return data as unknown as BackupPayload
  }
}

export const legacyMigrator = new LegacyMigrator()
