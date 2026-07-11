import { test, expect } from '@playwright/test'

test('health endpoint returns ok', async ({ request }) => {
  const response = await request.get('http://localhost:8080/api/v1/health')
  expect(response.ok()).toBeTruthy()
  const body = await response.json()
  expect(body.status).toBe('ok')
})

test('sources endpoint returns mock data', async ({ request }) => {
  const response = await request.get('http://localhost:8080/api/v1/sources')
  expect(response.ok()).toBeTruthy()
  const body = await response.json()
  expect(Array.isArray(body)).toBeTruthy()
  expect(body.length).toBeGreaterThan(0)
  expect(body[0]).toHaveProperty('id')
  expect(body[0]).toHaveProperty('name')
})

test('popular endpoint returns manga list', async ({ request }) => {
  const response = await request.get('http://localhost:8080/api/v1/sources/demo/popular?page=1')
  expect(response.ok()).toBeTruthy()
  const body = await response.json()
  expect(Array.isArray(body)).toBeTruthy()
  expect(body.length).toBe(20)
  expect(body[0]).toHaveProperty('id')
  expect(body[0]).toHaveProperty('title')
  expect(body[0]).toHaveProperty('coverUrl')
})

test('frontend loads and navigates to sources', async ({ page }) => {
  await page.goto('/')
  // The app loads (root redirects to /library), page title shows in header
  await expect(page.getByRole('heading', { name: /Library/i }).first()).toBeVisible({ timeout: 10000 })
  // Bottom nav: click the Browse tab to reach sources page
  await page.getByRole('navigation').getByRole('link', { name: /Browse/i }).click()
  await expect(page.getByRole('heading', { name: /Sources/i }).first()).toBeVisible()
})
