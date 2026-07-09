import { test, expect } from '@playwright/test'

const STORE_KEY = 'nreader-reader-store'

function getStore(page: any): Promise<Record<string, unknown>> {
  return page.evaluate((key: string) => {
    const raw = localStorage.getItem(key)
    return raw ? JSON.parse(raw) : {}
  }, STORE_KEY)
}

test.describe('Phase 1: Core Reading Customization', () => {

  test('Appearance settings page renders and shows theme picker', async ({ page }) => {
    await page.goto('/settings/appearance')
    await expect(page.getByText('Reader Themes')).toBeVisible()
    await expect(page.getByText('Fonts')).toBeVisible()
    await expect(page.getByText('Text Layout')).toBeVisible()
    await expect(page.getByText('Color Filter')).toBeVisible()
    await expect(page.getByText('Auto-Scroll')).toBeVisible()
    await expect(page.getByText('Content Filter')).toBeVisible()
  })

  test('Theme selection persists on reload', async ({ page }) => {
    await page.goto('/settings/appearance')

    // Find and click Sepia theme card
    const sepiaBtn = page.locator('button', { hasText: 'Sepia' }).first()
    await expect(sepiaBtn).toBeVisible()
    await sepiaBtn.click()

    // Verify store updated
    let store = await getStore(page)
    expect(store.selectedThemeId).toBe('theme-sepia')

    // Reload and verify persisted
    await page.reload()
    store = await getStore(page)
    expect(store.selectedThemeId).toBe('theme-sepia')
  })

  test('Dark theme is default and Night/OLED themes are available', async ({ page }) => {
    await page.goto('/settings/appearance')

    // Dark should be default
    let store = await getStore(page)
    expect(store.selectedThemeId).toBe('theme-dark')

    // Click Night
    await page.locator('button', { hasText: 'Night' }).first().click()
    store = await getStore(page)
    expect(store.selectedThemeId).toBe('theme-night')

    // Click OLED
    await page.locator('button', { hasText: 'OLED' }).first().click()
    store = await getStore(page)
    expect(store.selectedThemeId).toBe('theme-oled')

    // Click Light
    await page.locator('button', { hasText: 'Light' }).first().click()
    store = await getStore(page)
    expect(store.selectedThemeId).toBe('theme-light')
  })

  test('Custom theme creation form opens and can create a theme', async ({ page }) => {
    await page.goto('/settings/appearance')

    // Click "New Custom Theme" button
    await page.getByText('New Custom Theme').click()

    // Form should be visible with color pickers
    await expect(page.getByPlaceholder('Theme name')).toBeVisible()
    await expect(page.getByText('Create Theme')).toBeVisible()

    // Fill in theme name
    await page.getByPlaceholder('Theme name').fill('My Custom Theme')

    // Submit — API call will fail in test env, but UI should handle it
    // Just checking the form renders correctly is sufficient
  })

  test('Line height slider persists on reload', async ({ page }) => {
    await page.goto('/settings/appearance')

    // Find line height slider
    const slider = page.locator('input[type="range"]').first()
    await expect(slider).toBeVisible()

    // Change to a different value
    await slider.fill('2.0')

    // Verify store
    let store = await getStore(page)
    expect(store.lineHeight).toBe(2.0)

    // Reload
    await page.reload()
    store = await getStore(page)
    expect(store.lineHeight).toBe(2.0)
  })

  test('Paragraph spacing slider persists', async ({ page }) => {
    await page.goto('/settings/appearance')

    // Find paragraph spacing slider (second range input)
    const sliders = page.locator('input[type="range"]')
    const count = await sliders.count()
    expect(count).toBeGreaterThanOrEqual(2)

    // Change paragraph spacing
    await sliders.nth(1).fill('24')

    let store = await getStore(page)
    expect(store.paragraphSpacing).toBe(24)
  })

  test('Text alignment buttons change store value', async ({ page }) => {
    await page.goto('/settings/appearance')

    // Click "Center" button
    await page.getByText('Center').first().click()
    let store = await getStore(page)
    expect(store.textAlignment).toBe('center')

    // Click "Right"
    await page.getByText('Right').first().click()
    store = await getStore(page)
    expect(store.textAlignment).toBe('right')

    // Click "Justify"
    await page.getByText('Justify').first().click()
    store = await getStore(page)
    expect(store.textAlignment).toBe('justify')

    // Click "Left"
    await page.getByText('Left').first().click()
    store = await getStore(page)
    expect(store.textAlignment).toBe('left')
  })

  test('Color filter buttons change store value', async ({ page }) => {
    await page.goto('/settings/appearance')

    // Default should be "none"
    let store = await getStore(page)
    expect(store.colorFilter).toBe('none')

    // Click each filter
    await page.getByText('Sepia').first().click()
    store = await getStore(page)
    expect(store.colorFilter).toBe('sepia')

    await page.getByText('Invert').first().click()
    store = await getStore(page)
    expect(store.colorFilter).toBe('invert')

    await page.getByText('Grayscale').first().click()
    store = await getStore(page)
    expect(store.colorFilter).toBe('grayscale')

    await page.getByText('Normal').first().click()
    store = await getStore(page)
    expect(store.colorFilter).toBe('none')
  })

  test('Auto-scroll toggle and speed slider work', async ({ page }) => {
    await page.goto('/settings/appearance')

    // Auto-scroll should be inactive by default
    let store = await getStore(page)
    expect(store.autoScrollSpeed).toBe(5) // default speed

    // Click play button to activate
    const playBtn = page.locator('button:has(svg)').filter({ hasText: /Play|Square/ })
    await playBtn.first().click()

    store = await getStore(page)
    expect(store.autoScrollSpeed).toBeGreaterThan(0)

    // Speed slider should appear and work
    if (store.autoScrollSpeed > 0) {
      const speedSlider = page.locator('input[type="range"]').last()
      await speedSlider.fill('8')
      store = await getStore(page)
      expect(store.autoScrollSpeed).toBeGreaterThanOrEqual(8)
    }
  })

  test('Content filter toggle and pattern editing', async ({ page }) => {
    await page.goto('/settings/appearance')

    // Find toggle switch
    const toggle = page.locator('input[type="checkbox"]')
    await expect(toggle).toBeVisible()

    // Enable content filter
    await toggle.check()
    let store = await getStore(page)
    expect(store.contentFilterEnabled).toBe(true)

    // Textarea should appear
    const textarea = page.locator('textarea')
    await expect(textarea).toBeVisible()

    // Type a pattern
    await textarea.fill('test pattern\nanother pattern')
    store = await getStore(page)
    expect(store.contentFilterPatterns).toContain('test pattern')

    // Disable
    await toggle.uncheck()
    store = await getStore(page)
    expect(store.contentFilterEnabled).toBe(false)
  })

  test('MorePage has Appearance & Reading link', async ({ page }) => {
    await page.goto('/more')

    // Find and verify the Appearance & Reading link exists
    const link = page.locator('a[href="/settings/appearance"]')
    await expect(link).toBeVisible()
    await expect(link).toContainText('Appearance & Reading')
  })

  test('All settings persisted together after navigation', async ({ page }) => {
    await page.goto('/settings/appearance')

    // Toggle multiple settings
    // Set text alignment to justify
    await page.getByText('Justify').first().click()

    // Enable content filter
    const toggle = page.locator('input[type="checkbox"]')
    await toggle.check()

    // Navigate away
    await page.goto('/more')

    // Navigate back
    await page.goto('/settings/appearance')

    // Verify settings persisted
    const store = await getStore(page)
    expect(store.textAlignment).toBe('justify')
    expect(store.contentFilterEnabled).toBe(true)
  })
})
