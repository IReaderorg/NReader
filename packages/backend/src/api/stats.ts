import { Hono } from 'hono'

const app = new Hono()

app.get('/stats', async (c) => {
  try {
    const [totalBooks, totalDownloads, storageInfo] = await Promise.all([
      fetch('http://localhost:3000/api/v1/library').then(r => r.ok ? r.json() : []),
      fetch('http://localhost:3000/api/v1/downloads').then(r => r.ok ? r.json() : []),
      fetch('http://localhost:3000/api/v1/downloads/storage/stats').then(r => r.ok ? r.json() : { totalBytes: 0, totalChapters: 0, mangaCount: 0 }),
    ])

    const chapters = Array.isArray(totalBooks)
      ? totalBooks.reduce((sum: number, b: any) => sum + (b.totalChapters || b.chaptersRead || 0), 0)
      : 0

    return c.json({
      totalBooks: Array.isArray(totalBooks) ? totalBooks.length : 0,
      totalChapters: chapters,
      totalDownloads: Array.isArray(totalDownloads) ? totalDownloads.length : 0,
      storageUsedBytes: (storageInfo as any).totalBytes ?? 0,
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

export { app as statsApp }
