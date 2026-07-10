import { defineConfig } from '@playwright/test'

export default defineConfig({
  testDir: '.',
  timeout: 30000,
  retries: 0,
  globalSetup: './global-setup.ts',
  use: {
    baseURL: 'http://localhost:5173',
    headless: false,
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },
  webServer: [
    {
      command: 'pnpm --filter @ireader/backend dev',
      port: 8080,
      timeout: 10000,
      reuseExistingServer: true,
    },
    {
      command: 'pnpm --filter @ireader/frontend dev',
      port: 5173,
      timeout: 10000,
      reuseExistingServer: true,
    },
  ],
})
