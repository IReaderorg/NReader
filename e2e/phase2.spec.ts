import { test, expect } from '@playwright/test'

test.describe('Phase 2: Reader + Library', () => {

  // ======== API: Library CRUD ========

  test('API: library add manga', async ({ request }) => {
    const response = await request.post('http://localhost:8080/api/v1/library', {
      data: {
        sourceId: 'demo',
        mangaId: 'manga-1',
        title: 'Test Manga',
        coverUrl: 'https://example.com/cover.jpg',
        author: 'Test Author',
        status: 'ongoing',
        genres: ['action', 'adventure'],
        totalChapters: 25,
      }
    })
    expect(response.ok()).toBeTruthy()
    const body = await response.json()
    expect(body).toHaveProperty('id')
    expect(body.sourceId).toBe('demo')
    expect(body.mangaId).toBe('manga-1')
    expect(body.title).toBe('Test Manga')
    expect(body.chaptersRead).toBe(0)
    expect(Array.isArray(body.categoryIds)).toBeTruthy()
  })

  test('API: library list returns entries', async ({ request }) => {
    const response = await request.get('http://localhost:8080/api/v1/library')
    expect(response.ok()).toBeTruthy()
    const body = await response.json()
    expect(Array.isArray(body)).toBeTruthy()
    expect(body.length).toBeGreaterThanOrEqual(1)
    expect(body[0]).toHaveProperty('title')
    expect(body[0]).toHaveProperty('sourceId')
  })

  test('API: library get single entry', async ({ request }) => {
    const list = await (await request.get('http://localhost:8080/api/v1/library')).json()
    const id = list[0].id
    const response = await request.get(`http://localhost:8080/api/v1/library/${id}`)
    expect(response.ok()).toBeTruthy()
    const body = await response.json()
    expect(body.id).toBe(id)
  })

  test('API: library update entry', async ({ request }) => {
    const list = await (await request.get('http://localhost:8080/api/v1/library')).json()
    const id = list[0].id
    const response = await request.put(`http://localhost:8080/api/v1/library/${id}`, {
      data: { chaptersRead: 5 }
    })
    expect(response.ok()).toBeTruthy()
    const body = await response.json()
    expect(body.chaptersRead).toBe(5)
  })

  test('API: library delete entry', async ({ request }) => {
    const list = await (await request.get('http://localhost:8080/api/v1/library')).json()
    const id = list[0].id
    const response = await request.delete(`http://localhost:8080/api/v1/library/${id}`)
    expect(response.ok()).toBeTruthy()
    const body = await response.json()
    expect(body.success).toBeTruthy()
    // Verify it's gone
    const check = await request.get(`http://localhost:8080/api/v1/library/${id}`)
    expect(check.status()).toBe(404)
  })

  test('API: library add requires required fields', async ({ request }) => {
    const response = await request.post('http://localhost:8080/api/v1/library', {
      data: { sourceId: 'demo' } // missing mangaId and title
    })
    expect(response.status()).toBe(400)
    const body = await response.json()
    expect(body).toHaveProperty('error')
  })

  // ======== API: Categories CRUD ========

  test('API: create and list categories', async ({ request }) => {
    const response = await request.post('http://localhost:8080/api/v1/library/categories', {
      data: { name: 'Favorites', color: '#f59e0b' }
    })
    expect(response.ok()).toBeTruthy()
    const body = await response.json()
    expect(body).toHaveProperty('id')
    expect(body.name).toBe('Favorites')

    const list = await (await request.get('http://localhost:8080/api/v1/library/categories')).json()
    expect(Array.isArray(list)).toBeTruthy()
    expect(list.length).toBeGreaterThanOrEqual(1)
  })

  test('API: delete category', async ({ request }) => {
    // Create a category
    const created = await (await request.post('http://localhost:8080/api/v1/library/categories', {
      data: { name: 'ToDelete', color: '#ff0000' }
    })).json()

    const response = await request.delete(`http://localhost:8080/api/v1/library/categories/${created.id}`)
    expect(response.ok()).toBeTruthy()
  })

  // ======== API: History CRUD ========

  test('API: record and list history', async ({ request }) => {
    const response = await request.post('http://localhost:8080/api/v1/history', {
      data: {
        mangaId: 'history-manga-1',
        sourceId: 'demo',
        chapterId: 'ch-1',
        chapterNumber: 1,
        chapterTitle: 'Chapter 1',
        page: 10,
        scrollPosition: 500,
      }
    })
    expect(response.ok()).toBeTruthy()
    const body = await response.json()
    expect(body).toHaveProperty('id')
    expect(body.mangaId).toBe('history-manga-1')
    expect(body.page).toBe(10)

    const list = await (await request.get('http://localhost:8080/api/v1/history')).json()
    expect(Array.isArray(list)).toBeTruthy()
    expect(list.length).toBeGreaterThanOrEqual(1)
  })

  test('API: history requires required fields', async ({ request }) => {
    const response = await request.post('http://localhost:8080/api/v1/history', {
      data: { mangaId: 'test' } // missing sourceId and chapterId
    })
    expect(response.status()).toBe(400)
    const body = await response.json()
    expect(body).toHaveProperty('error')
  })

  test('API: delete history for manga', async ({ request }) => {
    // Record history
    await request.post('http://localhost:8080/api/v1/history', {
      data: {
        mangaId: 'delete-test-manga',
        sourceId: 'demo',
        chapterId: 'ch-delete',
        chapterNumber: 1,
        page: 5,
        scrollPosition: 100,
      }
    })

    const response = await request.delete('http://localhost:8080/api/v1/history/delete-test-manga')
    expect(response.ok()).toBeTruthy()
    const body = await response.json()
    expect(body.success).toBeTruthy()
  })

  // ======== Frontend Tests ========

  test('Frontend: library page loads', async ({ page }) => {
    await page.goto('http://localhost:5173/library')
    await page.waitForLoadState('networkidle')
    // The page header or empty state confirms library page rendered
    await expect(page.getByRole('main').getByRole('heading').first()).toBeVisible({ timeout: 10000 })
  })

  test('Frontend: history page shows entries', async ({ page }) => {
    await page.goto('http://localhost:5173/history')
    await page.waitForLoadState('networkidle')
    await expect(page.getByRole('main').getByRole('heading').first()).toBeVisible({ timeout: 10000 })
  })
})
