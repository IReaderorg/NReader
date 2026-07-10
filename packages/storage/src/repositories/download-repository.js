export class SqliteDownloadRepository {
    driver;
    constructor(driver) {
        this.driver = driver;
    }
    rowToJob(row) {
        return {
            id: row.id ?? '',
            sourceId: row.source_id ?? '',
            mangaId: row.manga_id ?? '',
            mangaTitle: row.manga_title ?? undefined,
            chapterId: row.chapter_id ?? '',
            chapterNumber: row.chapter_number ? Number(row.chapter_number) : 0,
            chapterTitle: row.chapter_title ?? undefined,
            status: row.status ?? 'queued',
            progress: row.progress ? Number(row.progress) : 0,
            bytesDownloaded: row.bytes_downloaded ? Number(row.bytes_downloaded) : 0,
            totalBytes: row.total_bytes ? Number(row.total_bytes) : undefined,
            priority: row.priority ? Number(row.priority) : 0,
            retryCount: row.retry_count ? Number(row.retry_count) : 0,
            maxRetries: row.max_retries ? Number(row.max_retries) : 3,
            error: row.error ?? undefined,
            createdAt: row.created_at ?? '',
            completedAt: row.completed_at ?? undefined,
        };
    }
    async getAll() {
        const rows = await this.driver.query('SELECT * FROM downloads ORDER BY priority DESC, created_at DESC');
        return rows.map(r => this.rowToJob(r));
    }
    async getById(id) {
        const row = await this.driver.queryOne('SELECT * FROM downloads WHERE id = ?', [id]);
        if (!row)
            return null;
        return this.rowToJob(row);
    }
    async add(job) {
        await this.driver.execute(`INSERT INTO downloads (id, source_id, manga_id, manga_title, chapter_id, chapter_number, chapter_title, status, progress, bytes_downloaded, total_bytes, priority, retry_count, max_retries, error, pages_path, created_at, completed_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`, [
            job.id,
            job.sourceId,
            job.mangaId,
            job.mangaTitle ?? null,
            job.chapterId,
            job.chapterNumber,
            job.chapterTitle ?? null,
            job.status,
            job.progress,
            job.bytesDownloaded,
            job.totalBytes ?? null,
            job.priority ?? 0,
            job.retryCount ?? 0,
            job.maxRetries ?? 3,
            job.error ?? null,
            null,
            job.createdAt,
            job.completedAt ?? null,
        ]);
    }
    async update(job) {
        const fields = [];
        const values = [];
        if (job.status !== undefined) {
            fields.push('status = ?');
            values.push(job.status);
        }
        if (job.progress !== undefined) {
            fields.push('progress = ?');
            values.push(job.progress);
        }
        if (job.bytesDownloaded !== undefined) {
            fields.push('bytes_downloaded = ?');
            values.push(job.bytesDownloaded);
        }
        if (job.totalBytes !== undefined) {
            fields.push('total_bytes = ?');
            values.push(job.totalBytes);
        }
        if (job.priority !== undefined) {
            fields.push('priority = ?');
            values.push(job.priority);
        }
        if (job.retryCount !== undefined) {
            fields.push('retry_count = ?');
            values.push(job.retryCount);
        }
        if (job.maxRetries !== undefined) {
            fields.push('max_retries = ?');
            values.push(job.maxRetries);
        }
        if (job.mangaTitle !== undefined) {
            fields.push('manga_title = ?');
            values.push(job.mangaTitle);
        }
        if (job.chapterTitle !== undefined) {
            fields.push('chapter_title = ?');
            values.push(job.chapterTitle);
        }
        if (job.error !== undefined) {
            fields.push('error = ?');
            values.push(job.error);
        }
        if (job.completedAt !== undefined) {
            fields.push('completed_at = ?');
            values.push(job.completedAt);
        }
        if (fields.length === 0)
            return;
        values.push(job.id);
        await this.driver.execute(`UPDATE downloads SET ${fields.join(', ')} WHERE id = ?`, values);
    }
    async remove(id) {
        await this.driver.execute('DELETE FROM downloads WHERE id = ?', [id]);
    }
    async getActive() {
        const rows = await this.driver.query("SELECT * FROM downloads WHERE status IN ('queued', 'downloading', 'paused') ORDER BY priority DESC, created_at ASC");
        return rows.map(r => this.rowToJob(r));
    }
    async getByManga(mangaId) {
        const rows = await this.driver.query('SELECT * FROM downloads WHERE manga_id = ? ORDER BY chapter_number ASC', [mangaId]);
        return rows.map(r => this.rowToJob(r));
    }
    async getByStatus(status) {
        const rows = await this.driver.query('SELECT * FROM downloads WHERE status = ? ORDER BY created_at DESC', [status]);
        return rows.map(r => this.rowToJob(r));
    }
    async getQueue() {
        const rows = await this.driver.query("SELECT * FROM downloads WHERE status IN ('queued', 'downloading', 'paused') ORDER BY priority DESC, created_at ASC");
        return rows.map(r => this.rowToJob(r));
    }
    async updateQueueOrder(ids) {
        for (let i = 0; i < ids.length; i++) {
            await this.driver.execute('UPDATE downloads SET priority = ? WHERE id = ?', [ids.length - i, ids[i]]);
        }
    }
    async removeByManga(mangaId) {
        await this.driver.execute('DELETE FROM downloads WHERE manga_id = ?', [mangaId]);
    }
    async removeByChapter(chapterId) {
        await this.driver.execute('DELETE FROM downloads WHERE chapter_id = ?', [chapterId]);
    }
    async getStorageStats() {
        const row = await this.driver.queryOne("SELECT COALESCE(SUM(total_bytes), 0) AS total_bytes, COUNT(*) AS total_chapters, COUNT(DISTINCT manga_id) AS manga_count FROM downloads WHERE status = 'completed'");
        return {
            totalBytes: row ? Number(row.total_bytes) : 0,
            totalChapters: row ? Number(row.total_chapters) : 0,
            mangaCount: row ? Number(row.manga_count) : 0,
        };
    }
    async getRetryCount(id) {
        const row = await this.driver.queryOne('SELECT retry_count FROM downloads WHERE id = ?', [id]);
        return row ? Number(row.retry_count) : 0;
    }
}
//# sourceMappingURL=download-repository.js.map