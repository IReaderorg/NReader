import { test, expect } from '@playwright/test'

test.describe('Phase 5: Backup + Extended Plugins', () => {

  test('API: plugin marketplace returns results', async ({ request }) => {
    const res = await request.get('/api/v1/plugins/marketplace')
    expect(res.status()).toBe(200)
    const data = await res.json()
    expect(Array.isArray(data)).toBe(true)
    expect(data.length).toBeGreaterThanOrEqual(1)
    expect(data[0]).toHaveProperty('id')
    expect(data[0]).toHaveProperty('name')
    expect(data[0]).toHaveProperty('type')
  })

  test('API: backup export returns ZIP', async ({ request }) => {
    const res = await request.post('/api/v1/backup/export', { data: { includeCovers: false } })
    expect(res.status()).toBe(200)
    const buffer = await res.body()
    expect(buffer.length).toBeGreaterThan(0)
    // Check ZIP magic bytes
    expect(buffer[0]).toBe(0x50) // P
    expect(buffer[1]).toBe(0x4B) // K
  })

  test('API: backup import with base64 zip', async ({ request }) => {
    // First export a backup to get valid data
    const exportRes = await request.post('/api/v1/backup/export', { data: { includeCovers: false } })
    expect(exportRes.status()).toBe(200)
    const buffer = await exportRes.body()

    // Build base64 from the buffer
    let binary = ''
    for (let i = 0; i < buffer.length; i++) binary += String.fromCharCode(buffer[i]!)
    const base64 = btoa(binary)

    // Import it back
    const importRes = await request.post('/api/v1/backup/import', {
      data: { zipBase64: base64, strategy: 'merge' }
    })
    expect(importRes.status()).toBe(200)
    const result = await importRes.json()
    expect(result).toHaveProperty('tables')
    expect(result).toHaveProperty('entries')
    expect(Array.isArray(result.tables)).toBe(true)
  })

  test('Frontend: backup page loads', async ({ page }) => {
    await page.goto('/backup')
    await expect(page.getByRole('heading', { name: 'Backup & Restore' })).toBeVisible({ timeout: 5000 })
    await expect(page.getByRole('button', { name: 'Export Backup' })).toBeVisible()
    await expect(page.locator('text=Import Backup')).toBeVisible()
  })

  test('Frontend: plugin manager page loads', async ({ page }) => {
    await page.goto('/plugins')
    await expect(page.getByRole('heading', { name: 'Plugin Manager' })).toBeVisible({ timeout: 5000 })
    // Should show marketplace items or empty state
    await page.waitForTimeout(2000)
    const body = page.locator('body')
    await expect(body).not.toBeEmpty()
  })

  test('Frontend: more page has backup and plugin links', async ({ page }) => {
    await page.goto('/more')
    await expect(page.getByRole('link', { name: /Backup.*Restore/i }).first()).toBeVisible({ timeout: 5000 })
    await expect(page.getByRole('link', { name: /Plugin Manager/i })).toBeVisible()
  })
})
