import type { HistoryRepository, HistoryEntry } from '@ireader/core'
import type { SQLiteDriver } from '../drivers/interface.js'

export class SqliteHistoryRepository implements HistoryRepository {
  constructor(private driver: SQLiteDriver) {}

  async getAll(): Promise<HistoryEntry[]> {
    const rows = await this.driver.query<Record<string, string | null>>(
      'SELECT * FROM history ORDER BY read_at DESC'
    )
    return rows.map(row => ({
      id: row.id ?? '',
      mangaId: row.manga_id ?? '',
      sourceId: row.source_id ?? '',
      chapterId: row.chapter_id ?? '',
      chapterNumber: row.chapter_number ? Number(row.chapter_number) : 0,
      chapterTitle: row.chapter_title ?? undefined,
      page: row.page ? Number(row.page) : 0,
      scrollPosition: row.scroll_position ? Number(row.scroll_position) : 0,
      readAt: row.read_at ?? '',
    }))
  }

  async getByManga(mangaId: string): Promise<HistoryEntry[]> {
    const rows = await this.driver.query<Record<string, string | null>>(
      'SELECT * FROM history WHERE manga_id = ? ORDER BY read_at DESC',
      [mangaId]
    )
    return rows.map(row => ({
      id: row.id ?? '',
      mangaId: row.manga_id ?? '',
      sourceId: row.source_id ?? '',
      chapterId: row.chapter_id ?? '',
      chapterNumber: row.chapter_number ? Number(row.chapter_number) : 0,
      chapterTitle: row.chapter_title ?? undefined,
      page: row.page ? Number(row.page) : 0,
      scrollPosition: row.scroll_position ? Number(row.scroll_position) : 0,
      readAt: row.read_at ?? '',
    }))
  }

  async add(entry: HistoryEntry): Promise<void> {
    await this.driver.execute(
      `INSERT OR REPLACE INTO history (id, manga_id, source_id, chapter_id, chapter_number, chapter_title, page, scroll_position, read_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        entry.id,
        entry.mangaId,
        entry.sourceId,
        entry.chapterId,
        entry.chapterNumber,
        entry.chapterTitle ?? null,
        entry.page,
        entry.scrollPosition,
        entry.readAt,
      ]
    )
  }

  async update(entry: Partial<HistoryEntry> & { id: string }): Promise<void> {
    const fields: string[] = []
    const values: unknown[] = []

    if (entry.mangaId !== undefined) { fields.push('manga_id = ?'); values.push(entry.mangaId) }
    if (entry.sourceId !== undefined) { fields.push('source_id = ?'); values.push(entry.sourceId) }
    if (entry.chapterId !== undefined) { fields.push('chapter_id = ?'); values.push(entry.chapterId) }
    if (entry.chapterNumber !== undefined) { fields.push('chapter_number = ?'); values.push(entry.chapterNumber) }
    if (entry.chapterTitle !== undefined) { fields.push('chapter_title = ?'); values.push(entry.chapterTitle) }
    if (entry.page !== undefined) { fields.push('page = ?'); values.push(entry.page) }
    if (entry.scrollPosition !== undefined) { fields.push('scroll_position = ?'); values.push(entry.scrollPosition) }
    if (entry.readAt !== undefined) { fields.push('read_at = ?'); values.push(entry.readAt) }

    if (fields.length === 0) return

    values.push(entry.id)
    await this.driver.execute(
      `UPDATE history SET ${fields.join(', ')} WHERE id = ?`,
      values
    )
  }

  async remove(mangaId: string): Promise<void> {
    await this.driver.execute('DELETE FROM history WHERE manga_id = ?', [mangaId])
  }

  async getLatest(): Promise<HistoryEntry | null> {
    const row = await this.driver.queryOne<Record<string, string | null>>(
      'SELECT * FROM history ORDER BY read_at DESC LIMIT 1'
    )
    if (!row) return null
    return {
      id: row.id ?? '',
      mangaId: row.manga_id ?? '',
      sourceId: row.source_id ?? '',
      chapterId: row.chapter_id ?? '',
      chapterNumber: row.chapter_number ? Number(row.chapter_number) : 0,
      chapterTitle: row.chapter_title ?? undefined,
      page: row.page ? Number(row.page) : 0,
      scrollPosition: row.scroll_position ? Number(row.scroll_position) : 0,
      readAt: row.read_at ?? '',
    }
  }
}
