import type { LibraryRepository, LibraryEntry, Category } from '@ireader/core'
import type { SQLiteDriver } from '../drivers/interface.js'

function parseJsonField<T>(val: string | null | undefined, fallback: T): T {
  if (!val) return fallback
  try { return JSON.parse(val) as T } catch { return fallback }
}

export class SqliteLibraryRepository implements LibraryRepository {
  constructor(private driver: SQLiteDriver) {}

  async getAll(): Promise<LibraryEntry[]> {
    const rows = await this.driver.query<Record<string, string | null>>('SELECT * FROM library ORDER BY date_added DESC')
    return rows.map(row => ({
      id: row.id ?? '',
      sourceId: row.source_id ?? '',
      mangaId: row.manga_id ?? '',
      title: row.title ?? '',
      coverUrl: row.cover_url ?? '',
      author: row.author ?? undefined,
      status: row.status ?? undefined,
      rating: row.rating ? Number(row.rating) : undefined,
      genres: parseJsonField<string[]>(row.genres, []),
      description: row.description ?? undefined,
      lastReadAt: row.last_read_at ?? undefined,
      chaptersRead: row.chapters_read ? Number(row.chapters_read) : 0,
      totalChapters: row.total_chapters ? Number(row.total_chapters) : undefined,
      score: row.score ? Number(row.score) : undefined,
      dateAdded: row.date_added ?? '',
      dateUpdated: row.date_updated ?? undefined,
      categoryIds: parseJsonField<string[]>(row.category_ids, []),
    }))
  }

  async getById(id: string): Promise<LibraryEntry | null> {
    const row = await this.driver.queryOne<Record<string, string | null>>('SELECT * FROM library WHERE id = ?', [id])
    if (!row) return null
    return {
      id: row.id ?? '',
      sourceId: row.source_id ?? '',
      mangaId: row.manga_id ?? '',
      title: row.title ?? '',
      coverUrl: row.cover_url ?? '',
      author: row.author ?? undefined,
      status: row.status ?? undefined,
      rating: row.rating ? Number(row.rating) : undefined,
      genres: parseJsonField<string[]>(row.genres, []),
      description: row.description ?? undefined,
      lastReadAt: row.last_read_at ?? undefined,
      chaptersRead: row.chapters_read ? Number(row.chapters_read) : 0,
      totalChapters: row.total_chapters ? Number(row.total_chapters) : undefined,
      score: row.score ? Number(row.score) : undefined,
      dateAdded: row.date_added ?? '',
      dateUpdated: row.date_updated ?? undefined,
      categoryIds: parseJsonField<string[]>(row.category_ids, []),
    }
  }

  async add(entry: LibraryEntry): Promise<void> {
    await this.driver.execute(
      `INSERT OR REPLACE INTO library (id, source_id, manga_id, title, cover_url, author, status, rating, genres, description, last_read_at, chapters_read, total_chapters, score, date_added, date_updated, category_ids)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        entry.id,
        entry.sourceId,
        entry.mangaId,
        entry.title,
        entry.coverUrl,
        entry.author ?? null,
        entry.status ?? null,
        entry.rating ?? null,
        entry.genres ? JSON.stringify(entry.genres) : null,
        entry.description ?? null,
        entry.lastReadAt ?? null,
        entry.chaptersRead,
        entry.totalChapters ?? null,
        entry.score ?? null,
        entry.dateAdded,
        entry.dateUpdated ?? null,
        entry.categoryIds ? JSON.stringify(entry.categoryIds) : '[]',
      ]
    )
  }

  async update(entry: Partial<LibraryEntry> & { id: string }): Promise<void> {
    const fields: string[] = []
    const values: unknown[] = []

    if (entry.sourceId !== undefined) { fields.push('source_id = ?'); values.push(entry.sourceId) }
    if (entry.mangaId !== undefined) { fields.push('manga_id = ?'); values.push(entry.mangaId) }
    if (entry.title !== undefined) { fields.push('title = ?'); values.push(entry.title) }
    if (entry.coverUrl !== undefined) { fields.push('cover_url = ?'); values.push(entry.coverUrl) }
    if (entry.author !== undefined) { fields.push('author = ?'); values.push(entry.author) }
    if (entry.status !== undefined) { fields.push('status = ?'); values.push(entry.status) }
    if (entry.rating !== undefined) { fields.push('rating = ?'); values.push(entry.rating) }
    if (entry.genres !== undefined) { fields.push('genres = ?'); values.push(JSON.stringify(entry.genres)) }
    if (entry.description !== undefined) { fields.push('description = ?'); values.push(entry.description) }
    if (entry.lastReadAt !== undefined) { fields.push('last_read_at = ?'); values.push(entry.lastReadAt) }
    if (entry.chaptersRead !== undefined) { fields.push('chapters_read = ?'); values.push(entry.chaptersRead) }
    if (entry.totalChapters !== undefined) { fields.push('total_chapters = ?'); values.push(entry.totalChapters) }
    if (entry.score !== undefined) { fields.push('score = ?'); values.push(entry.score) }
    if (entry.dateUpdated !== undefined) { fields.push('date_updated = ?'); values.push(entry.dateUpdated) }
    if (entry.categoryIds !== undefined) { fields.push('category_ids = ?'); values.push(JSON.stringify(entry.categoryIds)) }

    if (fields.length === 0) return

    values.push(entry.id)
    await this.driver.execute(
      `UPDATE library SET ${fields.join(', ')} WHERE id = ?`,
      values
    )
  }

  async remove(id: string): Promise<void> {
    await this.driver.execute('DELETE FROM library WHERE id = ?', [id])
  }

  async getCategories(): Promise<Category[]> {
    const rows = await this.driver.query<Record<string, string | null>>('SELECT * FROM categories ORDER BY sort_order ASC')
    return rows.map(row => ({
      id: row.id ?? '',
      name: row.name ?? '',
      sortOrder: row.sort_order ? Number(row.sort_order) : 0,
      color: row.color ?? undefined,
    }))
  }

  async addCategory(category: Category): Promise<void> {
    await this.driver.execute(
      'INSERT OR REPLACE INTO categories (id, name, sort_order, color) VALUES (?, ?, ?, ?)',
      [category.id, category.name, category.sortOrder, category.color ?? null]
    )
  }

  async updateCategory(category: Partial<Category> & { id: string }): Promise<void> {
    const fields: string[] = []
    const values: unknown[] = []

    if (category.name !== undefined) { fields.push('name = ?'); values.push(category.name) }
    if (category.sortOrder !== undefined) { fields.push('sort_order = ?'); values.push(category.sortOrder) }
    if (category.color !== undefined) { fields.push('color = ?'); values.push(category.color) }

    if (fields.length === 0) return

    values.push(category.id)
    await this.driver.execute(
      `UPDATE categories SET ${fields.join(', ')} WHERE id = ?`,
      values
    )
  }

  async removeCategory(id: string): Promise<void> {
    await this.driver.execute('DELETE FROM categories WHERE id = ?', [id])
  }
}
