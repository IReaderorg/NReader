import { test, expect } from '@playwright/test'

test.describe('Phase 1: Source Loading + Browse', () => {
  
  test('API: popular endpoint returns valid JSON via curl-equivalent', async ({ request }) => {
    const response = await request.get('http://localhost:8080/api/v1/sources/demo/popular?page=1')
    expect(response.ok()).toBeTruthy()
    const body = await response.json()
    expect(Array.isArray(body)).toBeTruthy()
    expect(body.length).toBe(20)
    expect(body[0]).toHaveProperty('id')
    expect(body[0]).toHaveProperty('title')
    expect(body[0]).toHaveProperty('coverUrl')
    expect(typeof body[0].id).toBe('string')
  })

  test('API: search endpoint returns results', async ({ request }) => {
    const response = await request.get('http://localhost:8080/api/v1/sources/demo/search?q=test')
    expect(response.ok()).toBeTruthy()
    const body = await response.json()
    expect(Array.isArray(body)).toBeTruthy()
    expect(body.length).toBeGreaterThanOrEqual(1)
  })

  test('API: detail endpoint returns manga with chapters', async ({ request }) => {
    const response = await request.get('http://localhost:8080/api/v1/sources/demo/detail/demo/manga-1')
    expect(response.ok()).toBeTruthy()
    const body = await response.json()
    expect(body).toHaveProperty('title')
    expect(body).toHaveProperty('description')
    expect(body).toHaveProperty('genres')
    expect(body).toHaveProperty('chapters')
    expect(Array.isArray(body.chapters)).toBeTruthy()
    expect(body.chapters.length).toBeGreaterThan(0)
  })

  test('API: chapters endpoint returns chapter list', async ({ request }) => {
    const response = await request.get('http://localhost:8080/api/v1/sources/demo/chapters/demo/manga-1')
    expect(response.ok()).toBeTruthy()
    const body = await response.json()
    expect(Array.isArray(body)).toBeTruthy()
    expect(body[0]).toHaveProperty('number')
    expect(body[0]).toHaveProperty('title')
  })

  test('API: pages endpoint returns page list', async ({ request }) => {
    const response = await request.get('http://localhost:8080/api/v1/sources/demo/pages/demo/ch-1')
    expect(response.ok()).toBeTruthy()
    const body = await response.json()
    expect(Array.isArray(body)).toBeTruthy()
    expect(body.length).toBe(15)
    expect(body[0]).toHaveProperty('index')
    expect(body[0]).toHaveProperty('url')
  })

  test('API: search without query returns 400', async ({ request }) => {
    const response = await request.get('http://localhost:8080/api/v1/sources/demo/search')
    expect(response.status()).toBe(400)
  })

  test('API: unknown source returns 404', async ({ request }) => {
    const response = await request.get('http://localhost:8080/api/v1/sources/unknown-source')
    expect(response.status()).toBe(404)
  })

  test('Frontend: sources page renders and shows sources list', async ({ page }) => {
    await page.goto('/sources')
    await expect(page.locator('h1')).toContainText('Sources')
    await expect(page.locator('.grid a').first()).toBeVisible({ timeout: 10000 })
  })

  test('Frontend: browse page shows manga grid', async ({ page }) => {
    await page.goto('/sources/demo')
    await expect(page.locator('h1')).toBeVisible()
    await expect(page.locator('.grid a').first()).toBeVisible({ timeout: 10000 })
  })

  test('Frontend: detail page shows manga info and chapters', async ({ page }) => {
    await page.goto('/sources/demo/manga/demo%2Fmanga-1')
    await expect(page.locator('h1')).toBeVisible({ timeout: 10000 })
    await expect(page.locator('text=Chapters').first()).toBeVisible({ timeout: 10000 })
  })

  test('Frontend: theme toggle switches dark/light mode', async ({ page }) => {
    await page.goto('/')
    const html = page.locator('html')
    const initialClass = await html.getAttribute('class')
    await page.locator('button[aria-label="Toggle theme"]').click()
    const toggledClass = await html.getAttribute('class')
    expect(toggledClass).not.toBe(initialClass)
  })

  test('Frontend: search page has input and responds', async ({ page }) => {
    await page.goto('/sources/demo/search')
    await expect(page.locator('input')).toBeVisible()
    await page.locator('input').fill('test')
    await page.waitForTimeout(1000)
    const hasResults = await page.locator('.grid a').count()
    const hasEmpty = await page.locator('text=No results').count()
    expect(hasResults + hasEmpty).toBeGreaterThanOrEqual(1)
  })
})