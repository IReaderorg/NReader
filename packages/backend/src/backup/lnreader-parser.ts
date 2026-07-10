// LNReader backup format parser
// ponytail: flat parser, upgrade to stream-based for huge backups when users report OOM

import type { LibraryEntry, Category, HistoryEntry, BackupPayload } from '@ireader/core'
import { defaultSourceMapper } from './source-mapper.js'

export interface LNReaderCategory {
  name: string
  order?: number
  flags?: number
}

export interface LNReaderManga {
  mangaId: string
  source: string
  title: string
  coverUrl?: string
  author?: string
  artist?: string
  status?: string
  genres?: string[]
  description?: string
  url?: string
  lastUpdate?: string
  lastReadAt?: string
  categories?: string[]
  tracking?: {
    lastReadAt?: string
    totalChapters?: number
    readChapters?: number
    score?: number
  }
}

export interface LNReaderHistory {
  mangaId: string
  source: string
  chapterId: string
  chapterNumber: number
  title?: string
  page?: number
  readAt?: string
  scrollPosition?: number
}

export interface LNReaderBackup {
  version?: number
  mangas?: LNReaderManga[]
  categories?: LNReaderCategory[]
  history?: LNReaderHistory[]
  chapterProgress?: Record<string, { page: number; scrollPosition: number }>
}

function generateId(): string {
  return crypto.randomUUID?.() ?? `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`
}

export class LNReaderParser {
  private sourceMapper = defaultSourceMapper

  setSourceMapper(mapper: typeof defaultSourceMapper): void {
    this.sourceMapper = mapper
  }

  /** Parse an LNReader JSON backup into IReader-Next BackupPayload */
  parseLNReaderBackup(json: string): BackupPayload {
    const raw: LNReaderBackup = JSON.parse(json)
    const now = new Date().toISOString()

    // Map categories
    const categoryMap = new Map<string, string>() // LNReader category name → IReader-Next category id
    const categories: Category[] = (raw.categories ?? []).map((c, i) => {
      const id = generateId()
      categoryMap.set(c.name, id)
      return {
        id,
        name: c.name,
        sortOrder: c.order ?? i,
      }
    })

    // Map library entries
    const library: LibraryEntry[] = (raw.mangas ?? []).map((m) => {
      const id = generateId()
      const sourceId = this.sourceMapper.mapSourceId(m.source)
      return {
        id,
        sourceId,
        mangaId: m.mangaId,
        title: m.title,
        coverUrl: m.coverUrl ?? '',
        author: m.author,
        status: m.status,
        genres: m.genres ?? [],
        description: m.description,
        lastReadAt: m.tracking?.lastReadAt ?? m.lastReadAt,
        chaptersRead: m.tracking?.readChapters ?? 0,
        totalChapters: m.tracking?.totalChapters,
        score: m.tracking?.score,
        dateAdded: m.lastUpdate ?? now,
        categoryIds: (m.categories ?? []).map(name => categoryMap.get(name)).filter(Boolean) as string[],
      }
    })

    // Map history entries
    const history: HistoryEntry[] = (raw.history ?? []).map((h) => {
      const id = generateId()
      const progress = raw.chapterProgress?.[h.chapterId]
      return {
        id,
        mangaId: h.mangaId,
        sourceId: this.sourceMapper.mapSourceId(h.source),
        chapterId: h.chapterId,
        chapterNumber: h.chapterNumber,
        chapterTitle: h.title,
        page: progress?.page ?? h.page ?? 0,
        scrollPosition: progress?.scrollPosition ?? h.scrollPosition ?? 0,
        readAt: h.readAt ?? now,
      }
    })

    return {
      version: '0.1.0',
      schemaVersion: 3,
      exportedAt: now,
      library,
      categories,
      history,
      settings: [],
      downloads: [],
      glossary: [],
      plugins: [],
    }
  }

  /** Export IReader-Next data as an LNReader-format backup JSON string */
  exportLNReaderBackup(data: BackupPayload): string {
    const categories: LNReaderCategory[] = data.categories.map(c => ({
      name: c.name,
      order: c.sortOrder,
    }))

    const mangas: LNReaderManga[] = data.library.map((entry) => ({
      mangaId: entry.mangaId,
      source: this.sourceMapper.reverseMap(entry.sourceId),
      title: entry.title,
      coverUrl: entry.coverUrl,
      author: entry.author,
      status: entry.status,
      genres: entry.genres,
      description: entry.description,
      lastUpdate: entry.dateAdded,
      lastReadAt: entry.lastReadAt,
      categories: data.categories
        .filter(c => entry.categoryIds.includes(c.id))
        .map(c => c.name),
      tracking: {
        lastReadAt: entry.lastReadAt,
        totalChapters: entry.totalChapters,
        readChapters: entry.chaptersRead,
        score: entry.score,
      },
    }))

    const history: LNReaderHistory[] = data.history.map(h => ({
      mangaId: h.mangaId,
      source: this.sourceMapper.reverseMap(h.sourceId),
      chapterId: h.chapterId,
      chapterNumber: h.chapterNumber,
      title: h.chapterTitle,
      page: h.page,
      readAt: h.readAt,
      scrollPosition: h.scrollPosition,
    }))

    const backup: LNReaderBackup = {
      version: 2,
      mangas,
      categories,
      history,
    }

    return JSON.stringify(backup, null, 2)
  }
}

export const lnreaderParser = new LNReaderParser()
