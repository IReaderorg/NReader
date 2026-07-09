# Sprint 3: Downloads + Settings

**Goal:** Download chapters for offline reading, full settings system.

**Scope:** Download queue, settings API, theme engine, source manager

## Architecture

```
Frontend (React)                    Backend (Hono)              Storage (sql.js)
┌──────────────────┐      REST      ┌──────────────────┐      ┌──────────────┐
│ Downloads Page   │ ──────────▶   │ /api/v1/downloads  │ ─▶  │ DownloadRepo  │
│  - queue         │ ◀──────────   │ /api/v1/settings   │ ◀── │ SettingsRepo  │
│  - progress bars │               │ /api/v1/plugins    │      └──────────────┘
│  - cancel        │               └──────────────────┘
│ Settings Pages   │
│  - general       │        New in Phase 3
│  - appearance    │     ┌───────────────────────┐
│  - reader        │     │ Theme Engine           │
│ Source Manager   │     │ - dark/light/amoled    │
│                  │     │ - custom accent color  │
│ Zustand Stores   │     │ - persistent via API   │
│  - settings-store│     └───────────────────────┘
│  - download-store│
└──────────────────┘
```

## Tasks

### Batch A — Storage + Backend (parallel)
- [ ] Migration 002: downloads table
- [ ] SqliteDownloadRepository  
- [ ] Backend settings API routes (GET/POST settings, get/set by key)
- [ ] Backend downloads API routes (list, create, cancel, progress)
- [ ] Wire into backend index.ts

### Batch B — Frontend (parallel)
- [ ] settings-store (Zustand + persist via API)
- [ ] download-store (Zustand)
- [ ] Theme engine upgrade — AMOLED, custom accent, persist to backend
- [ ] Update api/client.ts with settings/downloads/plugins endpoints

### Batch C — Pages (parallel)
- [ ] Downloads page (queue, progress bars, cancel button)
- [ ] Settings page (general, appearance, reader sections)
- [ ] Source manager (list plugins, enable/disable)
- [ ] Wire new routes in App.tsx
- [ ] E2E tests

## Acceptance Criteria
- [ ] Download chapter → progress updates → complete
- [ ] Settings change → persist across restart
- [ ] Theme switch: dark → light → amoled → works
- [ ] Custom accent color → applies immediately
- [ ] Source enable/disable → reflected in browse

## Progress
| Task | Status | Assignee |
|------|--------|----------|
| Sprint plan | done | orchestrator |
| Migration + DownloadRepo | pending | Sage |
| Settings API | pending | Sage |
| Downloads API | pending | Sage |
| Frontend stores | pending | Nova |
| Theme engine upgrade | pending | Milo |
| Frontend pages | pending | Nova |
| E2E tests | pending | QA |
