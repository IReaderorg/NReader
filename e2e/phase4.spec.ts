import { test, expect } from '@playwright/test'

test.describe('Phase 4: TTS + Translation', () => {

  test('API: glossary create and list entries', async ({ request }) => {
    const createRes = await request.post('/api/v1/glossary', {
      data: { sourceLang: 'ja', targetLang: 'en', sourceText: '感謝', targetText: 'Thanks', context: 'generic' }
    })
    expect(createRes.status()).toBe(201)
    const created = await createRes.json()
    expect(created.id).toBeDefined()
    expect(created.sourceText).toBe('感謝')

    const listRes = await request.get('/api/v1/glossary')
    expect(listRes.status()).toBe(200)
    const list = await listRes.json()
    expect(Array.isArray(list)).toBe(true)
    expect(list.length).toBeGreaterThanOrEqual(1)
  })

  test('API: glossary update entry', async ({ request }) => {
    const createRes = await request.post('/api/v1/glossary', {
      data: { sourceLang: 'fr', targetLang: 'en', sourceText: 'merci', targetText: 'thank you' }
    })
    const entry = await createRes.json()
    const updateRes = await request.put(`/api/v1/glossary/${entry.id}`, { data: { targetText: 'thanks' } })
    expect(updateRes.status()).toBe(200)
  })

  test('API: glossary delete entry', async ({ request }) => {
    const createRes = await request.post('/api/v1/glossary', {
      data: { sourceLang: 'de', targetLang: 'en', sourceText: 'danke', targetText: 'thanks' }
    })
    const entry = await createRes.json()
    const deleteRes = await request.delete(`/api/v1/glossary/${entry.id}`)
    expect(deleteRes.status()).toBe(200)
  })

  test('API: glossary requires required fields', async ({ request }) => {
    const res = await request.post('/api/v1/glossary', { data: { sourceLang: 'es' } })
    expect(res.status()).toBe(400)
  })

  test('Frontend: TTS settings page loads', async ({ page }) => {
    await page.goto('/settings/tts')
    await expect(page.locator('text=Text-to-Speech')).toBeVisible({ timeout: 5000 })
    const slider = page.locator('input[type="range"]')
    await expect(slider.first()).toBeVisible()
  })

  test('Frontend: translation settings page loads', async ({ page }) => {
    await page.goto('/settings/translation')
    await expect(page.getByRole('heading', { name: 'Translation' })).toBeVisible({ timeout: 5000 })
    await expect(page.locator('text=Enable Translation')).toBeVisible()
    // Look for Deepl in the engine buttons (there's also a "DeepL Configure" button in engine settings)
    await expect(page.getByRole('button', { name: 'Deepl', exact: true })).toBeVisible()
    await expect(page.locator('text=Mock')).toBeVisible()
  })

  test('Frontend: settings page has TTS and translation tabs', async ({ page }) => {
    await page.goto('/settings')
    await expect(page.getByRole('link', { name: /Text-to-Speech/i })).toBeVisible({ timeout: 5000 })
    await expect(page.getByRole('link', { name: /Translation/i })).toBeVisible()
  })

  test('Frontend: glossary CRUD workflow', async ({ page }) => {
    await page.goto('/settings/translation')
    await expect(page.getByRole('heading', { name: 'Translation' })).toBeVisible({ timeout: 5000 })
    await page.locator('text=Add').click()
    await page.waitForTimeout(300)
    const sourceInput = page.locator('input[placeholder="Source text"]')
    const targetInput = page.locator('input[placeholder="Translated text"]')
    await sourceInput.fill('こんにちは')
    await targetInput.fill('Hello')
    await page.locator('text=Save').click()
    await page.waitForTimeout(500)
    await expect(page.getByText('こんにちは').first()).toBeVisible()
    await expect(page.getByText('→ Hello').first()).toBeVisible()
  })
})
