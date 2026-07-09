# Sprint 2 Handoff: Reader + Library

## What Was Built

### Reader Engine (`packages/reader-engine/`)
- **WebtoonReader** — vertical scroll with IntersectionObserver lazy loading, skeleton placeholders, scroll-position tracking, page indicator
- **PagerReader** — single-page flip with click-zones (L40%/R40%/center20%), keyboard nav, touch swipe, LTR/RTL direction, page preloading
- **TextReader** — HTML novel reader with sanitization, scroll position restore, configurable font size, progress tracking
- **ReaderOverlay** — mode picker (Webtoon/Pager/Text pills), brightness slider (0-100%), font size slider (12-32px), reading progress bar, Escape-to-close

### Backend API (`packages/backend/src/api/`)
- **Library CRUD**: `GET/POST /api/v1/library`, `GET/PUT/DELETE /api/v1/library/:id`
- **Categories CRUD**: `GET/POST /api/v1/library/categories`, `PUT/DELETE /api/v1/library/categories/:id`
- **History**: `GET /api/v1/history`, `POST /api/v1/history` (auto-upsert), `DELETE /api/v1/history/:mangaId`

### Storage (`packages/storage/src/repositories/`)
- **SqliteLibraryRepository** — full LibraryRepository interface
- **SqliteHistoryRepository** — full HistoryRepository interface

### Frontend (`packages/frontend/`)
- **Library page** — grid/list view toggle, category filter bar, create/delete categories, remove from library, reading progress bars, empty state
- **History page** — grouped by date (Today/Yesterday/date), time-ago labels, continue button, clear all, empty state
- **Reader page** — combined 3 reader modes, overlay controls, debounced history recording, brightness filter, back button
- **Zustand stores**: library-store, history-store, reader-store
- **API client**: full library/history/category endpoint types

### Files Changed
```
packages/frontend/src/App.tsx                          + reader route
packages/frontend/src/api/client.ts                    + library/history endpoints
packages/frontend/src/store/library-store.ts           NEW
packages/frontend/src/store/history-store.ts           NEW
packages/frontend/src/store/reader-store.ts            NEW
packages/frontend/src/pages/LibraryPage.tsx            REWRITTEN
packages/frontend/src/pages/HistoryPage.tsx            REWRITTEN
packages/frontend/src/pages/ReaderPage.tsx             NEW
packages/frontend/package.json                         + reader-engine dep
packages/backend/src/index.ts                          + database + library/history routes
packages/backend/src/api/library.ts                    NEW
packages/backend/src/api/history.ts                    NEW
packages/storage/src/index.ts                          + exports
packages/storage/src/repositories/library-repository.ts NEW
packages/storage/src/repositories/history-repository.ts NEW
packages/reader-engine/package.json                    UPDATED (source exports)
packages/reader-engine/tsconfig.json                   UPDATED (jsx)
packages/reader-engine/src/index.ts                    NEW
packages/reader-engine/src/webtoon.tsx                 NEW
packages/reader-engine/src/pager.tsx                   NEW
packages/reader-engine/src/text.tsx                    NEW
packages/reader-engine/src/overlay.tsx                 NEW
e2e/phase2.spec.ts                                     NEW (13 tests)
```

### How to Test
1. `curl http://localhost:8080/api/v1/library` → empty array
2. `curl -X POST http://localhost:8080/api/v1/library -H 'Content-Type: application/json' -d '{"sourceId":"demo","mangaId":"manga-1","title":"Test"}'` → creates entry
3. `curl http://localhost:8080/api/v1/library/categories` → empty array
4. `curl -X POST http://localhost:8080/api/v1/library/categories -H 'Content-Type: application/json' -d '{"name":"Favorites"}'` → creates category
5. `curl -X POST http://localhost:8080/api/v1/history -H 'Content-Type: application/json' -d '{"mangaId":"manga-1","sourceId":"demo","chapterId":"ch-1","chapterNumber":1,"page":5,"scrollPosition":0}'` → records history
6. Frontend: `http://localhost:5173/library` → library page
7. Frontend: `http://localhost:5173/history` → history page

### Known Issues
- None

### Next Up: Phase 3 — Downloads + Settings
- Download queue manager (backend job, sql.js persistence)
- Chapter download (images → LRU cache, background)
- Download progress via WebSocket
- Frontend: Downloads page (queue, progress bars, cancel)
- Settings API (CRUD via REST + sql.js)
- Frontend: Settings pages (general, appearance, reader, downloads)
- Theme engine (dark, light, amoled, custom accent)
- Frontend: Source manager page
