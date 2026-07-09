import type { DownloadRepository, DownloadJob } from '@ireader/core'
import type { SQLiteDriver } from '../drivers/interface.js'

export class SqliteDownloadRepository implements DownloadRepository {
  constructor(private driver: SQLiteDriver) {}

  async getAll(): Promise<DownloadJob[]> {
    const rows = await this.driver.query<Record<string, string | null>>(
      'SELECT * FROM downloads ORDER BY created_at DESC'
    )
    return rows.map(row => ({
      id: row.id ?? '',
      sourceId: row.source_id ?? '',
      mangaId: row.manga_id ?? '',
      chapterId: row.chapter_id ?? '',
      chapterNumber: row.chapter_number ? Number(row.chapter_number) : 0,
      status: (row.status as DownloadJob['status']) ?? 'queued',
      progress: row.progress ? Number(row.progress) : 0,
      bytesDownloaded: row.bytes_downloaded ? Number(row.bytes_downloaded) : 0,
      totalBytes: row.total_bytes ? Number(row.total_bytes) : undefined,
      error: row.error ?? undefined,
      createdAt: row.created_at ?? '',
      completedAt: row.completed_at ?? undefined,
    }))
  }

  async getById(id: string): Promise<DownloadJob | null> {
    const row = await this.driver.queryOne<Record<string, string | null>>(
      'SELECT * FROM downloads WHERE id = ?', [id]
    )
    if (!row) return null
    return {
      id: row.id ?? '',
      sourceId: row.source_id ?? '',
      mangaId: row.manga_id ?? '',
      chapterId: row.chapter_id ?? '',
      chapterNumber: row.chapter_number ? Number(row.chapter_number) : 0,
      status: (row.status as DownloadJob['status']) ?? 'queued',
      progress: row.progress ? Number(row.progress) : 0,
      bytesDownloaded: row.bytes_downloaded ? Number(row.bytes_downloaded) : 0,
      totalBytes: row.total_bytes ? Number(row.total_bytes) : undefined,
      error: row.error ?? undefined,
      createdAt: row.created_at ?? '',
      completedAt: row.completed_at ?? undefined,
    }
  }

  async add(job: DownloadJob): Promise<void> {
    await this.driver.execute(
      `INSERT INTO downloads (id, source_id, manga_id, manga_title, chapter_id, chapter_number, chapter_title, status, progress, bytes_downloaded, total_bytes, error, pages_path, created_at, completed_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        job.id,
        job.sourceId,
        job.mangaId,
        null,
        job.chapterId,
        job.chapterNumber,
        null,
        job.status,
        job.progress,
        job.bytesDownloaded,
        job.totalBytes ?? null,
        job.error ?? null,
        null,
        job.createdAt,
        job.completedAt ?? null,
      ]
    )
  }

  async update(job: Partial<DownloadJob> & { id: string }): Promise<void> {
    const fields: string[] = []
    const values: unknown[] = []

    if (job.status !== undefined) { fields.push('status = ?'); values.push(job.status) }
    if (job.progress !== undefined) { fields.push('progress = ?'); values.push(job.progress) }
    if (job.bytesDownloaded !== undefined) { fields.push('bytes_downloaded = ?'); values.push(job.bytesDownloaded) }
    if (job.totalBytes !== undefined) { fields.push('total_bytes = ?'); values.push(job.totalBytes) }
    if (job.error !== undefined) { fields.push('error = ?'); values.push(job.error) }
    if (job.completedAt !== undefined) { fields.push('completed_at = ?'); values.push(job.completedAt) }

    if (fields.length === 0) return
    values.push(job.id)
    await this.driver.execute(`UPDATE downloads SET ${fields.join(', ')} WHERE id = ?`, values)
  }

  async remove(id: string): Promise<void> {
    await this.driver.execute('DELETE FROM downloads WHERE id = ?', [id])
  }

  async getActive(): Promise<DownloadJob[]> {
    const rows = await this.driver.query<Record<string, string | null>>(
      "SELECT * FROM downloads WHERE status IN ('queued', 'downloading') ORDER BY created_at ASC"
    )
    return rows.map(row => ({
      id: row.id ?? '',
      sourceId: row.source_id ?? '',
      mangaId: row.manga_id ?? '',
      chapterId: row.chapter_id ?? '',
      chapterNumber: row.chapter_number ? Number(row.chapter_number) : 0,
      status: (row.status as DownloadJob['status']) ?? 'queued',
      progress: row.progress ? Number(row.progress) : 0,
      bytesDownloaded: row.bytes_downloaded ? Number(row.bytes_downloaded) : 0,
      totalBytes: row.total_bytes ? Number(row.total_bytes) : undefined,
      error: row.error ?? undefined,
      createdAt: row.created_at ?? '',
      completedAt: row.completed_at ?? undefined,
    }))
  }
}
