# Skill: Add a Frontend Page

Use when the user asks to create a new page in the React frontend.

## Steps

### 1. Identify where the page fits

| Page Type | Directory | Route Pattern |
|-----------|-----------|---------------|
| Feature page | `packages/frontend/src/pages/{name}/` | `/name` |
| Settings sub-page | `packages/frontend/src/pages/settings/` | `/settings/{name}` |
| Nested resource | `packages/frontend/src/pages/{parent}/{id}/` | `/{parent}/:id/{child}` |

### 2. Check existing pages for patterns

Read one existing page to match conventions (imports, store usage, component tree).

### 3. Create page component

```typescript
// packages/frontend/src/pages/browse/BrowsePage.tsx
import { useEffect } from 'react'
import { useSourceStore } from '../../store/source-store'
import { MangaGrid } from '../../components/manga/MangaGrid'
import { SourceSelector } from '../../components/sources/SourceSelector'
import { PageHeader } from '../../components/layout/PageHeader'

interface BrowsePageProps {
  sourceId?: string
}

export function BrowsePage({ sourceId }: BrowsePageProps) {
  const { sources, fetchPopular, mangaList, isLoading } = useSourceStore()

  useEffect(() => {
    if (sourceId) fetchPopular(sourceId, 1)
  }, [sourceId, fetchPopular])

  return (
    <div className="space-y-6">
      <PageHeader title="Browse" description="Discover new manga" />
      <SourceSelector
        sources={sources}
        selected={sourceId}
      />
      {isLoading ? (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className="animate-pulse bg-muted rounded-lg h-64" />
          ))}
        </div>
      ) : (
        <MangaGrid items={mangaList} />
      )}
    </div>
  )
}
```

### 4. Register route in App.tsx

```typescript
// packages/frontend/src/App.tsx
import { BrowsePage } from './pages/browse/BrowsePage'
// In router:
<Route path="/browse" element={<BrowsePage />} />
<Route path="/browse/:sourceId" element={<BrowsePage />} />
```

### 5. If needed: create new store or extend existing store

```typescript
// packages/frontend/src/store/source-store.ts
import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { apiClient } from '../api/client'
import type { MangaSummary, SourceInfo } from '@ireader/core'

interface SourceStore {
  sources: SourceInfo[]
  mangaList: MangaSummary[]
  isLoading: boolean
  error: string | null

  fetchSources: () => Promise<void>
  fetchPopular: (sourceId: string, page: number) => Promise<void>
  search: (sourceId: string, query: string) => Promise<void>
}

export const useSourceStore = create<SourceStore>()(
  persist(
    (set, get) => ({
      sources: [],
      mangaList: [],
      isLoading: false,
      error: null,

      fetchSources: async () => {
        const res = await apiClient.get('/api/v1/sources')
        set({ sources: res.data })
      },

      fetchPopular: async (sourceId, page) => {
        set({ isLoading: true, error: null })
        try {
          const res = await apiClient.get(
            `/api/v1/sources/${sourceId}/popular?page=${page}`
          )
          set({ mangaList: res.data, isLoading: false })
        } catch (err) {
          set({ error: err.message, isLoading: false })
        }
      },

      search: async (sourceId, query) => {
        set({ isLoading: true, error: null })
        try {
          const res = await apiClient.get(
            `/api/v1/sources/${sourceId}/search?q=${encodeURIComponent(query)}`
          )
          set({ mangaList: res.data, isLoading: false })
        } catch (err) {
          set({ error: err.message, isLoading: false })
        }
      },
    }),
    { name: 'source-store', partialize: (state) => ({ sources: state.sources }) }
  )
)
```

### 6. If needed: create API endpoint on backend

See `add-backend-endpoint` skill.

### 7. Create E2E test for the page

```typescript
// e2e/tests/browse/browse.spec.ts
import { test, expect } from '@playwright/test'

test('browse page shows sources', async ({ page }) => {
  await page.goto('/browse')
  await expect(page.locator('[data-testid="source-selector"]'))
    .toBeVisible()
})

test('selecting source loads manga grid', async ({ page }) => {
  await page.goto('/browse')
  await page.click('[data-testid="source-manganato"]')
  await expect(page.locator('[data-testid="manga-grid"]'))
    .toBeVisible({ timeout: 10000 })
  const cards = page.locator('[data-testid="manga-card"]')
  expect(await cards.count()).toBeGreaterThan(0)
})
```

## Conventions

- Page component file: `{Name}Page.tsx` — named export `{Name}Page`
- Route path matches filesystem: `/settings/tts` → `pages/settings/tts.tsx`
- Loading state: show skeleton placeholders, NOT text "loading..."
- Error state: show inline error with retry button
- Empty state: show helpful message + call to action
- All data-fetching goes through store actions, NOT direct `fetch` in components
- Use `data-testid` attributes on interactive elements for E2E tests
- Colocate page-specific components in `{name}/_components/` directory
