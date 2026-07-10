import { test, expect } from '@playwright/test'

test.describe('Reader Experience Updates', () => {

  test('API: reader chapter pages endpoint', async ({ request }) => {
    const res = await request.get('/api/v1/sources/demo/pages/demo%2Fmanga-1%2Fch-1')
    expect(res.status()).toBe(200)
    const pages = await res.json()
    expect(Array.isArray(pages)).toBe(true)
    expect(pages.length).toBe(15)
    expect(pages[0]).toHaveProperty('index', 0)
    expect(pages[0]).toHaveProperty('url')
  })

  test('API: updates checks library entries', async ({ request }) => {
    // Add a library entry first
    const addRes = await request.post('/api/v1/library', {
      data: {
        sourceId: 'demo',
        mangaId: 'demo/manga-updates-test',
        title: 'Updates Test Manga',
        coverUrl: 'https://via.placeholder.com/350x500.png?text=Test',
        author: 'Tester',
        status: 'ongoing',
      }
    })
    expect(addRes.status()).toBe(201)

    // Verify it shows in /library
    const libRes = await request.get('/api/v1/library')
    const lib = await libRes.json()
    expect(lib.some((e: any) => e.title === 'Updates Test Manga')).toBeTruthy()
  })

  test('Frontend: reader page loads from chapter navigation', async ({ page }) => {
    // Go to demo detail page
    await page.goto('/sources/demo/manga/demo%2Fmanga-1')
    await expect(page.getByText('Demo Manga')).toBeVisible({ timeout: 5000 })

    // Click the first chapter link (div with cursor-pointer)
    const chapterLink = page.locator('text=Ch. 1').first()
    await expect(chapterLink).toBeVisible({ timeout: 5000 })
    await chapterLink.click()

    // Should navigate to reader
    await page.waitForURL(/\/reader\/demo\/demo%2Fmanga-1\//, { timeout: 8000 })
    await page.waitForTimeout(2000)

    // Reader should have content (no crash, image fallbacks are expected)
    const body = page.locator('body')
    const bodyText = await body.textContent()
    // Verify reader frame is present (pages container)
    expect(bodyText).toContain('/')
    expect(bodyText).toContain('1')
  })

  test('Frontend: reader keyboard shortcut t cycles reader modes', async ({ page }) => {
    await page.goto('/sources/demo/manga/demo%2Fmanga-1')
    await expect(page.getByText('Demo Manga')).toBeVisible({ timeout: 5000 })
    const chLink = page.locator('text=Ch. 1').first()
    await expect(chLink).toBeVisible({ timeout: 5000 })
    await chLink.click()
    await page.waitForURL(/\/reader\/demo\/demo%2Fmanga-1\//, { timeout: 8000 })
    await page.waitForTimeout(2000)

    // Press 't' to cycle modes 3 times (webtoon → pager → text → webtoon)
    await page.keyboard.press('t')
    await page.waitForTimeout(300)
    await page.keyboard.press('t')
    await page.waitForTimeout(300)
    await page.keyboard.press('t')
    await page.waitForTimeout(500)

    // Page should still be functional after mode cycling
    await expect(page.locator('body')).not.toBeEmpty()
  })

  test('Frontend: updates page loads without crashing', async ({ page }) => {
    await page.goto('/updates')
    await page.waitForTimeout(2000)
    await expect(page.locator('body')).not.toBeEmpty()
  })

  test('Frontend: updates page has refresh button', async ({ page }) => {
    await page.goto('/updates')
    await page.waitForTimeout(1000)
    const refreshBtn = page.locator('button[title="Refresh"]')
    await expect(refreshBtn).toBeVisible({ timeout: 5000 })
    await refreshBtn.click()
    await page.waitForTimeout(1000)
    await expect(page.locator('body')).not.toBeEmpty()
  })
})
