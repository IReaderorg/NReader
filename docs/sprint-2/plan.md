# Sprint 2: Reader + Library

**Goal:** Read manga end-to-end, track progress, manage library with categories.

**Scope:** Reader engine (3 modes), Library CRUD, History tracking, Zustand persist

## Architecture

```
Frontend (React)                    Backend (Hono)              Storage (sql.js)
┌──────────────────┐      REST      ┌──────────────────┐      ┌──────────────┐
│ Reader Page      │ ──────────▶   │ /api/v1/library   │ ─▶  │ LibraryRepo   │
│  - Webtoon mode  │ ◀──────────   │ /api/v1/categories│ ◀── │ HistoryRepo   │
│  - Pager mode    │               │ /api/v1/history    │      └──────────────┘
│  - Text mode     │               │ /api/v1/reader/:id │
│  - Overlay       │               └──────────────────┘
│ Library Page     │
│ History Page     │
│                  │
│ Zustand Stores   │
│  - library-store │
│  - history-store │
│  - reader-store  │
└──────────────────┘
```

## Tasks

### Batch A — Storage + Reader Core (parallel, no deps)
- [ ] `packages/storage/src/repositories/library-repository.ts` — SqliteLibraryRepository
- [ ] `packages/storage/src/repositories/history-repository.ts` — SqliteHistoryRepository
- [ ] `packages/reader-engine/src/webtoon.tsx` — WebtoonReader component (virtual scroll, lazy load, IntersectionObserver)
- [ ] `packages/reader-engine/src/pager.tsx` — PagerReader component (page flip, L/R + RTL)
- [ ] `packages/reader-engine/src/text.tsx` — TextReader component (HTML sanitize, formatting)
- [ ] `packages/reader-engine/src/overlay.tsx` — ReaderOverlay (brightness, font size, mode switch, progress bar)
- [ ] `packages/reader-engine/src/index.ts` — barrel exports

### Batch B — Backend API + Frontend Stores (depends on Batch A)
- [ ] `packages/backend/src/api/library.ts` — Library CRUD + Categories routes
- [ ] `packages/backend/src/api/history.ts` — History list/record/delete routes
- [ ] Wire routes into `packages/backend/src/index.ts`
- [ ] `packages/frontend/src/store/library-store.ts` — library-store (Zustand + persist via HTTP)
- [ ] `packages/frontend/src/store/history-store.ts` — history-store
- [ ] `packages/frontend/src/store/reader-store.ts` — reader-store (current mode, progress, settings)

### Batch C — Frontend Pages (depends on Batch B)
- [ ] Replace `LibraryPage.tsx` stub — grid + category filter sidebar
- [ ] Replace `HistoryPage.tsx` stub — recent reads with continue button
- [ ] Create `ReaderPage.tsx` — 3 reader modes + overlay controls
- [ ] Add reader route to `App.tsx`
- [ ] Update `api/client.ts` with library/history/reader endpoints

### Batch D — E2E Tests
- [ ] `e2e/phase2.spec.ts` — Library add/remove/categories, History recording, Reader scroll/flip

## Dependencies
- Batch B depends on Batch A (storage repos, then API routes)
- Batch C depends on Batch B (stores/pages need API)
- Batch D depends on Batch C

## Acceptance Criteria
- [ ] Open chapter → read 5 pages → close → reopen → position restored
- [ ] Add manga to library → see in library grid
- [ ] Create categories → assign manga → filter by category
- [ ] Reading history auto-records → shows in history page
- [ ] All 3 reader modes work: Webtoon (scroll), Pager (flip), Text (novel)
- [ ] Reader overlay controls (brightness, font size, mode switch, progress)

## Progress
| Task | Status | Assignee |
|------|--------|----------|
| Sprint plan | done | orchestator |
| Storage repos | pending | Sage |
| Reader engine | pending | Milo/Nova |
| Backend API | pending | Sage |
| Frontend stores | pending | Nova |
| Frontend pages | pending | Nova |
| E2E tests | pending | QA |
