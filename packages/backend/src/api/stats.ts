import { Hono } from 'hono'
import type { LibraryRepository, DownloadRepository } from '@ireader/core'

export function createStatsRouter(libraryRepo: LibraryRepository, downloadRepo: DownloadRepository): Hono {
  const app = new Hono()

  app.get('/stats', async (c) => {
    try {
      const [books, downloads, storageInfo] = await Promise.all([
        libraryRepo.getAll(),
        downloadRepo.getAll(),
        downloadRepo.getStorageStats(),
      ])

      const chapters = books.reduce((sum, b) => sum + (b.totalChapters || b.chaptersRead || 0), 0)

      return c.json({
        totalBooks: books.length,
        totalChapters: chapters,
        totalDownloads: downloads.length,
        storageUsedBytes: storageInfo.totalBytes,
      })
    } catch {
      return c.json({
        totalBooks: 0,
        totalChapters: 0,
        totalDownloads: 0,
        storageUsedBytes: 0,
      })
    }
  })

  return app
}
