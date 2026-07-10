import { test, expect } from '@playwright/test'

test.describe('Phase 3: Downloads + Settings', () => {

  // ======== API: Settings ========

  test('API: settings get/set', async ({ request }) => {
    const getRes = await request.get('http://localhost:8080/api/v1/settings')
    expect(getRes.ok()).toBeTruthy()
    const body = await getRes.json()
    expect(typeof body).toBe('object')
  })

  test('API: settings set and persist', async ({ request }) => {
    const setRes = await request.post('http://localhost:8080/api/v1/settings/theme', {
      data: { value: 'light' }
    })
    expect(setRes.ok()).toBeTruthy()

    const getRes = await request.get('http://localhost:8080/api/v1/settings')
    const body = await getRes.json()
    expect(body).toHaveProperty('theme', 'light')
  })

  // ======== API: Downloads ========

  test('API: create download job', async ({ request }) => {
    const res = await request.post('http://localhost:8080/api/v1/downloads', {
      data: { sourceId: 'demo', mangaId: 'manga-1', chapterId: 'ch-1', chapterNumber: 1 }
    })
    expect(res.ok()).toBeTruthy()
    const body = await res.json()
    expect(body).toHaveProperty('id')
    expect(body.status).toBe('queued')
  })

  test('API: download progresses and completes', async ({ request }) => {
    const res = await request.post('http://localhost:8080/api/v1/downloads', {
      data: { sourceId: 'demo', mangaId: 'manga-1', chapterId: 'ch-2', chapterNumber: 2 }
    })
    expect(res.ok()).toBeTruthy()
    const job = await res.json()

    // Wait for it to complete
    await new Promise(r => setTimeout(r, 2500))

    const getRes = await request.get(`http://localhost:8080/api/v1/downloads/${job.id}`)
    expect(getRes.ok()).toBeTruthy()
    const updated = await getRes.json()
    expect(updated.status).toBe('completed')
    expect(updated.progress).toBe(100)
  })

  test('API: cancel download', async ({ request }) => {
    const res = await request.post('http://localhost:8080/api/v1/downloads', {
      data: { sourceId: 'demo', mangaId: 'manga-1', chapterId: 'ch-3', chapterNumber: 3 }
    })
    const job = await res.json()

    const cancelRes = await request.post(`http://localhost:8080/api/v1/downloads/${job.id}/cancel`)
    expect(cancelRes.ok()).toBeTruthy()

    const getRes = await request.get(`http://localhost:8080/api/v1/downloads/${job.id}`)
    const cancelled = await getRes.json()
    expect(cancelled.status).toBe('cancelled')
  })

  test('API: list active downloads', async ({ request }) => {
    const res = await request.get('http://localhost:8080/api/v1/downloads/active')
    expect(res.ok()).toBeTruthy()
    const body = await res.json()
    expect(Array.isArray(body)).toBeTruthy()
  })

  // ======== API: Plugins ========

  test('API: list installed plugins', async ({ request }) => {
    const res = await request.get('http://localhost:8080/api/v1/plugins')
    expect(res.ok()).toBeTruthy()
    const body = await res.json()
    expect(Array.isArray(body)).toBeTruthy()
    expect(body.length).toBeGreaterThanOrEqual(1)
    expect(body[0]).toHaveProperty('id')
    expect(body[0]).toHaveProperty('name')
  })

  // ======== Frontend ========

  test('Frontend: settings page loads', async ({ page }) => {
    await page.goto('http://localhost:5173/settings')
    await page.waitForLoadState('networkidle')
    await expect(page.getByRole('main').getByRole('heading', { name: 'Settings' })).toBeVisible({ timeout: 10000 })
  })

  test('Frontend: downloads page loads', async ({ page }) => {
    await page.goto('http://localhost:5173/downloads')
    await page.waitForLoadState('networkidle')
    await expect(page.getByRole('main').getByRole('heading', { name: 'Downloads' })).toBeVisible({ timeout: 10000 })
  })

  test('Frontend: more page links to settings', async ({ page }) => {
    await page.goto('http://localhost:5173/more')
    await page.waitForLoadState('networkidle')
    const settingsLink = page.getByText('Settings').first()
    await expect(settingsLink).toBeVisible({ timeout: 10000 })
  })
})
