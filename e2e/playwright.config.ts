import { defineConfig } from '@playwright/test'

export default defineConfig({
  testDir: '.',
  timeout: 30000,
  retries: 1,
  use: {
    baseURL: 'http://localhost:5173',
    headless: true,
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
