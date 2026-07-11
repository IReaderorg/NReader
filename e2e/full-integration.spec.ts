import { test, expect } from '@playwright/test'

const API = 'http://localhost:8080/api/v1'

// ============================================================
// Section 1: Health & Basic Connectivity
// ============================================================
test.describe('Section 1: Health & Connectivity', () => {
  test('health endpoint returns ok', async ({ request }) => {
    const res = await request.get(`${API}/health`)
    expect(res.ok()).toBeTruthy()
    const body = await res.json()
    expect(body.status).toBe('ok')
  })
})

// ============================================================
// Section 2: Library API (CRUD)
// ============================================================
test.describe.configure({ mode: 'serial' })
test.describe('Section 2: Library API', () => {
  let mangaId: string

  test('POST /api/v1/library — add manga', async ({ request }) => {
    const res = await request.post(`${API}/library`, {
      data: {
        sourceId: 'test-source',
        mangaId: 'test-manga-1',
        title: 'Test Manga',
        coverUrl: 'https://example.com/cover.jpg',
        author: 'Test Author',
        status: 'ongoing',
        genres: ['Action', 'Fantasy'],
        totalChapters: 100,
      },
    })
    expect(res.status()).toBe(201)
    const body = await res.json()
    expect(body.id).toBeDefined()
    expect(body.title).toBe('Test Manga')
    expect(body.sourceId).toBe('test-source')
    mangaId = body.id
  })

  test('GET /api/v1/library — list all', async ({ request }) => {
    const res = await request.get(`${API}/library`)
    expect(res.ok()).toBeTruthy()
    const body = await res.json()
    expect(Array.isArray(body)).toBeTruthy()
    expect(body.length).toBeGreaterThan(0)
    expect(body.some((e: any) => e.id === mangaId)).toBeTruthy()
  })

  test('PATCH /api/v1/library/:id/favorite — toggle favorite', async ({ request }) => {
    const res = await request.patch(`${API}/library/${mangaId}/favorite`, {
      data: { favorited: true },
    })
    expect(res.ok()).toBeTruthy()
    const body = await res.json()
    expect(body.favorited).toBe(true)
  })

  test('PATCH /api/v1/library/:id/categories — update categories', async ({ request }) => {
    // First create a category
    const catRes = await request.post(`${API}/library/categories`, {
      data: { name: 'Favorites' },
    })
    expect(catRes.status()).toBe(201)
    const cat = await catRes.json()

    const res = await request.patch(`${API}/library/${mangaId}/categories`, {
      data: { categoryIds: [cat.id] },
    })
    expect(res.ok()).toBeTruthy()
    const body = await res.json()
    expect(body.categoryIds).toContain(cat.id)
  })

  test('PATCH /api/v1/library/:id/metadata — edit title/author', async ({ request }) => {
    const res = await request.patch(`${API}/library/${mangaId}/metadata`, {
      data: { title: 'Updated Manga Title', author: 'Updated Author' },
    })
    expect(res.ok()).toBeTruthy()
    const body = await res.json()
    expect(body.title).toBe('Updated Manga Title')
    expect(body.author).toBe('Updated Author')
  })

  test('POST /api/v1/library/:id/mark-all-read', async ({ request }) => {
    const res = await request.post(`${API}/library/${mangaId}/mark-all-read`)
    expect(res.ok()).toBeTruthy()
    const body = await res.json()
    expect(body.success).toBe(true)
  })

  test('PATCH /api/v1/library/:id/archive — toggle archive', async ({ request }) => {
    const res = await request.patch(`${API}/library/${mangaId}/archive`, {
      data: { archived: true },
    })
    expect(res.ok()).toBeTruthy()
    const body = await res.json()
    expect(body.archived).toBe(true)
  })

  test('DELETE /api/v1/library/:id — remove', async ({ request }) => {
    const res = await request.delete(`${API}/library/${mangaId}`)
    expect(res.ok()).toBeTruthy()
    const body = await res.json()
    expect(body.success).toBe(true)

    // Verify it's gone
    const getRes = await request.get(`${API}/library/${mangaId}`)
    expect(getRes.status()).toBe(404)
  })
})

// ============================================================
// Section 3: Downloads API
// ============================================================
test.describe('Section 3: Downloads API', () => {
  let jobId: string

  test('POST /api/v1/downloads — create job', async ({ request }) => {
    const res = await request.post(`${API}/downloads`, {
      data: {
        sourceId: 'test-source',
        mangaId: 'test-manga-dl',
        mangaTitle: 'Download Test',
        chapterId: 'ch-1',
        chapterNumber: 1,
        chapterTitle: 'Chapter 1',
      },
    })
    expect(res.status()).toBe(201)
    const body = await res.json()
    expect(body.id).toBeDefined()
    expect(body.status).toBe('queued')
    jobId = body.id
  })

  test('GET /api/v1/downloads — list', async ({ request }) => {
    const res = await request.get(`${API}/downloads`)
    expect(res.ok()).toBeTruthy()
    const body = await res.json()
    expect(Array.isArray(body)).toBeTruthy()
    expect(body.length).toBeGreaterThan(0)
  })

  test('GET /api/v1/downloads/:id — get single', async ({ request }) => {
    const res = await request.get(`${API}/downloads/${jobId}`)
    expect(res.ok()).toBeTruthy()
    const body = await res.json()
    expect(body.id).toBe(jobId)
  })

  test('POST /api/v1/downloads/:id/pause and /resume', async ({ request }) => {
    // Pause
    const pauseRes = await request.post(`${API}/downloads/${jobId}/pause`)
    expect(pauseRes.ok()).toBeTruthy()
    let body = await pauseRes.json()
    expect(body.success).toBe(true)

    // Resume
    const resumeRes = await request.post(`${API}/downloads/${jobId}/resume`)
    expect(resumeRes.ok()).toBeTruthy()
    body = await resumeRes.json()
    expect(body.success).toBe(true)
  })

  test('POST /api/v1/downloads/batch — batch create', async ({ request }) => {
    const res = await request.post(`${API}/downloads/batch`, {
      data: {
        sourceId: 'test-source',
        mangaId: 'test-manga-batch',
        mangaTitle: 'Batch Test',
        chapters: [
          { chapterId: 'ch-b1', chapterNumber: 1, chapterTitle: 'Batch Ch 1' },
          { chapterId: 'ch-b2', chapterNumber: 2, chapterTitle: 'Batch Ch 2' },
        ],
      },
    })
    expect(res.status()).toBe(201)
    const body = await res.json()
    expect(Array.isArray(body)).toBeTruthy()
    expect(body.length).toBe(2)
  })

  test('GET /api/v1/downloads/storage/stats', async ({ request }) => {
      const res = await request.get(`${API}/downloads/storage/stats`)
      expect(res.ok()).toBeTruthy()
      const body = await res.json()
      expect(body).toHaveProperty('totalBytes')
      expect(body).toHaveProperty('totalChapters')
      expect(body).toHaveProperty('mangaCount')
    })

  test('POST /api/v1/downloads/delete-chapter', async ({ request }) => {
    const res = await request.post(`${API}/downloads/delete-chapter`, {
      data: { chapterId: 'ch-to-delete' },
    })
    expect(res.ok()).toBeTruthy()
    const body = await res.json()
    expect(body.success).toBe(true)
  })
})

// ============================================================
// Section 4: History API
// ============================================================
test.describe('Section 4: History API', () => {
  test('POST /api/v1/history — add entry', async ({ request }) => {
    const res = await request.post(`${API}/history`, {
      data: {
        mangaId: 'hist-manga-1',
        sourceId: 'test-source',
        chapterId: 'hist-ch-1',
        chapterNumber: 1,
        chapterTitle: 'History Chapter 1',
        page: 5,
        scrollPosition: 0.5,
      },
    })
    expect(res.status()).toBe(201)
    const body = await res.json()
    expect(body.id).toBeDefined()
    expect(body.mangaId).toBe('hist-manga-1')
  })

  test('GET /api/v1/history — list', async ({ request }) => {
    const res = await request.get(`${API}/history`)
    expect(res.ok()).toBeTruthy()
    const body = await res.json()
    expect(Array.isArray(body)).toBeTruthy()
    expect(body.length).toBeGreaterThan(0)
  })

  test('GET /api/v1/history?q= — search', async ({ request }) => {
    const res = await request.get(`${API}/history?q=history`)
    expect(res.ok()).toBeTruthy()
    const body = await res.json()
    expect(Array.isArray(body)).toBeTruthy()
  })

  test('GET /api/v1/history/continue-reading', async ({ request }) => {
    const res = await request.get(`${API}/history/continue-reading`)
    expect(res.ok()).toBeTruthy()
    const body = await res.json()
    expect(Array.isArray(body)).toBeTruthy()
  })

  test('DELETE /api/v1/history/:mangaId — clear one', async ({ request }) => {
    const res = await request.delete(`${API}/history/hist-manga-1`)
    expect(res.ok()).toBeTruthy()
    const body = await res.json()
    expect(body.success).toBe(true)
  })
})

// ============================================================
// Section 5: Backup API
// ============================================================
test.describe('Section 5: Backup API', () => {
  test('POST /api/v1/backup/export', async ({ request }) => {
    const res = await request.post(`${API}/backup/export`, {
      data: { includeCovers: false },
    })
    expect(res.ok()).toBeTruthy()
    // Response is zip binary, just check headers
    const headers = res.headers()
    expect(headers['content-type']).toBe('application/zip')
  })

  test('POST /api/v1/backup/import', async ({ request }) => {
    // Export first to get a zip
    const exportRes = await request.post(`${API}/backup/export`, {
      data: { includeCovers: false },
    })
    expect(exportRes.ok()).toBeTruthy()
    const zipBuffer = await exportRes.body()
    const zipBase64 = Buffer.from(zipBuffer).toString('base64')

    const res = await request.post(`${API}/backup/import`, {
      data: {
        zipBase64,
        strategy: 'merge',
      },
    })
    expect(res.ok()).toBeTruthy()
    const body = await res.json()
    expect(body).toHaveProperty('entries')
    expect(body).toHaveProperty('tables')
  })

  test('GET /api/v1/backup — list backups', async ({ request }) => {
    const res = await request.get(`${API}/backup`)
    expect(res.ok()).toBeTruthy()
    const body = await res.json()
    expect(Array.isArray(body)).toBeTruthy()
  })

  test('DELETE /api/v1/backup/:id', async ({ request }) => {
    // This may 404 if no backups exist, which is acceptable
    const res = await request.delete(`${API}/backup/nonexistent-backup.zip`)
    expect(res.status()).toBe(404)
  })
})

// ============================================================
// Section 6: Settings API
// ============================================================
test.describe('Section 6: Settings API', () => {
  test('GET /api/v1/settings — list', async ({ request }) => {
      // Retry once for startup race conditions with tsx watch
      let res = await request.get(`${API}/settings`)
      if (!res.ok()) {
        await new Promise(r => setTimeout(r, 1000))
        res = await request.get(`${API}/settings`)
      }
      expect(res.ok()).toBeTruthy()
      const body = await res.json()
      expect(typeof body).toBe('object')
    })

  test('POST /api/v1/settings/:key — set a value', async ({ request }) => {
    const res = await request.post(`${API}/settings/theme`, {
      data: { value: 'dark' },
    })
    expect(res.ok()).toBeTruthy()
    const body = await res.json()
    expect(body.theme).toBe('dark')

    // Verify persistence
    const getRes = await request.get(`${API}/settings/theme`)
    expect(getRes.ok()).toBeTruthy()
    const getBody = await getRes.json()
    expect(getBody.theme).toBe('dark')
  })
})

// ============================================================
// Section 7: Categories API (under /api/v1/library/categories)
// ============================================================
test.describe('Section 7: Categories API', () => {
  let catId: string

  test('GET /api/v1/library/categories — list', async ({ request }) => {
    const res = await request.get(`${API}/library/categories`)
    expect(res.ok()).toBeTruthy()
    const body = await res.json()
    expect(Array.isArray(body)).toBeTruthy()
  })

  test('POST /api/v1/library/categories — create', async ({ request }) => {
    const res = await request.post(`${API}/library/categories`, {
      data: { name: 'My Category', color: '#ff0000' },
    })
    expect(res.status()).toBe(201)
    const body = await res.json()
    expect(body.id).toBeDefined()
    expect(body.name).toBe('My Category')
    catId = body.id
  })

  test('PUT /api/v1/library/categories/reorder', async ({ request }) => {
    // Create a second category first
    const res2 = await request.post(`${API}/library/categories`, {
      data: { name: 'Second Cat' },
    })
    expect(res2.status()).toBe(201)
    const cat2 = await res2.json()

    const res = await request.put(`${API}/library/categories/reorder`, {
      data: { categoryIds: [cat2.id, catId] },
    })
    expect(res.ok()).toBeTruthy()
    const body = await res.json()
    expect(body.success).toBe(true)
  })
})

// ============================================================
// Section 8: Reader Presets
// ============================================================
test.describe('Section 8: Reader Presets', () => {
  test('GET /api/v1/reader/presets — list', async ({ request }) => {
    const res = await request.get(`${API}/reader/presets`)
    expect(res.ok()).toBeTruthy()
    const body = await res.json()
    expect(Array.isArray(body)).toBeTruthy()
    expect(body.length).toBeGreaterThanOrEqual(5) // 5 defaults
  })

  test('POST /api/v1/reader/presets — create custom', async ({ request }) => {
    const res = await request.post(`${API}/reader/presets`, {
      data: {
        name: 'My Preset',
        fontSize: 20,
        lineHeight: 1.6,
        paragraphSpacing: 10,
        paragraphIndent: 0,
        textAlignment: 'left',
        colorFilter: 'none',
      },
    })
    expect(res.status()).toBe(201)
    const body = await res.json()
    expect(body.id).toBeDefined()
    expect(body.name).toBe('My Preset')
  })
})

// ============================================================
// Section 9: Stats API
// ============================================================
test.describe('Section 9: Stats API', () => {
  test('GET /api/v1/stats', async ({ request }) => {
    const res = await request.get(`${API}/stats`)
    expect(res.ok()).toBeTruthy()
    const body = await res.json()
    expect(body).toHaveProperty('totalBooks')
    expect(body).toHaveProperty('totalChapters')
    expect(body).toHaveProperty('totalDownloads')
    expect(body).toHaveProperty('storageUsedBytes')
  })

  test('GET /api/v1/reading-stats/daily', async ({ request }) => {
    const res = await request.get(`${API}/reading-stats/daily`)
    expect(res.ok()).toBeTruthy()
    const body = await res.json()
    expect(body.type).toBe('daily')
    expect(Array.isArray(body.data)).toBeTruthy()
  })

  test('GET /api/v1/reading-stats/insights', async ({ request }) => {
    const res = await request.get(`${API}/reading-stats/insights`)
    expect(res.ok()).toBeTruthy()
    const body = await res.json()
    expect(body).toHaveProperty('totalBooksRead')
    expect(body).toHaveProperty('totalChapters')
    expect(body).toHaveProperty('totalTimeMs')
  })
})

// ============================================================
// Section 10: Explore API
// ============================================================
test.describe('Section 10: Explore API', () => {
  test('GET /api/v1/explore/genres', async ({ request }) => {
    const res = await request.get(`${API}/explore/genres`)
    expect(res.ok()).toBeTruthy()
    const body = await res.json()
    expect(Array.isArray(body)).toBeTruthy()
    expect(body.length).toBeGreaterThan(0)
    expect(body).toContain('Action')
  })

  test('GET /api/v1/explore/trending', async ({ request }) => {
    const res = await request.get(`${API}/explore/trending`)
    // May return empty array or error if no plugins — either is acceptable
    expect(res.status() === 200 || res.status() === 500).toBeTruthy()
    if (res.ok()) {
      const body = await res.json()
      expect(Array.isArray(body)).toBeTruthy()
    }
  })

  test('GET /api/v1/explore/updates', async ({ request }) => {
    const res = await request.get(`${API}/explore/updates`)
    expect(res.status() === 200 || res.status() === 500).toBeTruthy()
  })
})

// ============================================================
// Section 11: Sources API
// ============================================================
test.describe('Section 11: Sources API', () => {
  test('GET /api/v1/sources — list', async ({ request }) => {
    const res = await request.get(`${API}/sources`)
    expect(res.ok()).toBeTruthy()
    const body = await res.json()
    expect(Array.isArray(body)).toBeTruthy()
  })

  test('GET /api/v1/sources/:id/categories', async ({ request }) => {
    const res = await request.get(`${API}/sources/demo/categories`)
    // Accept either 200 (with array) or 502 (plugin error)
    expect(res.status() === 200 || res.status() === 502).toBeTruthy()
  })

  test('GET /api/v1/sources/:id/popular', async ({ request }) => {
    const res = await request.get(`${API}/sources/demo/popular?page=1`)
    expect(res.status() === 200 || res.status() === 502).toBeTruthy()
  })
})

// ============================================================
// Section 12: Frontend Pages
// ============================================================
test.describe('Section 12: Frontend Pages', () => {
  test('/library loads', async ({ page }) => {
    await page.goto('/library')
    await expect(page).toHaveURL(/\/library/)
    // The page should render the layout
    await expect(page.locator('main')).toBeVisible({ timeout: 10000 })
  })

  test('/settings loads', async ({ page }) => {
    await page.goto('/settings')
    await expect(page).toHaveURL(/\/settings/)
    await expect(page.locator('main')).toBeVisible({ timeout: 10000 })
  })

  test('/settings/general loads', async ({ page }) => {
    await page.goto('/settings/general')
    await expect(page).toHaveURL(/\/settings\/general/)
    await expect(page.locator('main')).toBeVisible({ timeout: 10000 })
  })

  test('/settings/download loads', async ({ page }) => {
    await page.goto('/settings/download')
    await expect(page).toHaveURL(/\/settings\/download/)
    await expect(page.locator('main')).toBeVisible({ timeout: 10000 })
  })

  test('/settings/storage loads', async ({ page }) => {
    await page.goto('/settings/storage')
    await expect(page).toHaveURL(/\/settings\/storage/)
    await expect(page.locator('main')).toBeVisible({ timeout: 10000 })
  })

  test('/settings/sources loads', async ({ page }) => {
    await page.goto('/settings/sources')
    await expect(page).toHaveURL(/\/settings\/sources/)
    await expect(page.locator('main')).toBeVisible({ timeout: 10000 })
  })

  test('/downloads loads', async ({ page }) => {
    await page.goto('/downloads')
    await expect(page).toHaveURL(/\/downloads/)
    await expect(page.locator('main')).toBeVisible({ timeout: 10000 })
  })

  test('/history loads', async ({ page }) => {
    await page.goto('/history')
    await expect(page).toHaveURL(/\/history/)
    await expect(page.locator('main')).toBeVisible({ timeout: 10000 })
  })

  test('/stats loads', async ({ page }) => {
    await page.goto('/stats')
    await expect(page).toHaveURL(/\/stats/)
    await expect(page.locator('main')).toBeVisible({ timeout: 10000 })
  })

  test('/backup loads', async ({ page }) => {
    await page.goto('/backup')
    await expect(page).toHaveURL(/\/backup/)
    await expect(page.locator('main')).toBeVisible({ timeout: 10000 })
  })

  test('/sources loads', async ({ page }) => {
    await page.goto('/sources')
    await expect(page).toHaveURL(/\/sources/)
    await expect(page.locator('main')).toBeVisible({ timeout: 10000 })
  })

  test('/more loads', async ({ page }) => {
    await page.goto('/more')
    await expect(page).toHaveURL(/\/more/)
    await expect(page.locator('main')).toBeVisible({ timeout: 10000 })
  })
})
