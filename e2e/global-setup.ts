import { request } from '@playwright/test'

async function globalSetup() {
  const ctx = await request.newContext()
  try {
    const res = await ctx.post('http://localhost:8080/api/v1/settings/onboardingComplete', {
      data: { value: true }
    })
    if (res.ok()) {
      const body = await res.json()
      console.log('[globalSetup] onboardingComplete set:', JSON.stringify(body))
    } else {
      console.error('[globalSetup] failed to set onboardingComplete:', res.status(), await res.text())
    }
  } catch (e) {
    console.error('[globalSetup] could not set onboardingComplete - backend may not be ready:', e)
  } finally {
    await ctx.dispose()
  }
}

export default globalSetup
