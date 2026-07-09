# IReader-Next — Development Guide

## Prerequisites

- **Node.js** >= 20
- **pnpm** >= 9 (`npm install -g pnpm`)

## Quick Start

```bash
# Install all dependencies
pnpm install

# Start both backend + frontend in dev mode
pnpm dev
```

This starts:
- **Backend** (Hono/tsx) → `http://localhost:8080`
- **Frontend** (Vite + React + HMR) → `http://localhost:5173`

Open `http://localhost:5173` in your browser.

## Verifying It Works

```bash
# 1. Health check
curl http://localhost:8080/api/v1/health
# → {"status":"ok","timestamp":"..."}

# 2. List sources
curl http://localhost:8080/api/v1/sources
# → [{"id":"manganato","name":"Manganato",...}, ...]

# 3. Get popular manga (mock data)
curl "http://localhost:8080/api/v1/sources/manganato/popular?page=1"
# → [{"id":"manganato/manga-1","title":"Manganato Manga #1",...}, ...]

# 4. Via Vite proxy (same endpoints, through frontend dev server)
curl http://localhost:5173/api/v1/health
```

## Package Scripts

| Command | Description |
|---------|-------------|
| `pnpm dev` | Backend + Frontend concurrently |
| `pnpm test` | Run unit/integration tests |
| `pnpm test:e2e` | Run Playwright E2E tests |
| `pnpm typecheck` | TypeScript type checking (no emit) |
| `pnpm build` | Production build |
| `pnpm lint` | ESLint |
| `pnpm format` | Prettier formatting |

## Project Structure

```
ireader-next/
├── packages/
│   ├── core/              # Entities, interfaces, use cases (zero deps)
│   ├── storage/           # SQLite: driver interface + sql.js + migrations
│   ├── backend/           # Hono HTTP server (API routes)
│   ├── frontend/          # React SPA (Vite + Tailwind + shadcn/ui)
│   ├── plugin-system/     # Plugin sandbox abstraction
│   ├── reader-engine/     # (Phase 2) Reader components
│   ├── tts-engine/        # (Phase 4) TTS abstraction
│   └── translation-engine/# (Phase 4) Translation abstraction
├── apps/
│   ├── android/           # (Phase 6) Android Ktor shell
│   ├── desktop/           # (Phase 7) Tauri desktop shell
│   └── web/               # (Phase 7) PWA entry
├── e2e/                   # Playwright tests
└── plugins/               # Sample source .js plugins
```

## Architecture Rules

1. **Backend-execution rule**: All plugin code runs in the backend sandbox (Node `vm` on desktop, WebView V8 on Android, Web Worker on web). Frontend receives only structured JSON.

2. **Zero duplication rule**: TypeScript is the ONLY language for business logic. `apps/android/` is ~200 lines of Kotlin for native APIs ONLY.

3. **API contract**: Frontend ↔ Backend exclusively via REST + WebSocket at `http://localhost:8080/api/v1`.

4. **State management**: Zustand stores auto-persist to SQLite via HTTP middleware (debounced POST → backend → sql.js).

5. **Plugin sandbox**: Source plugins are `.js` files loaded at runtime. NEVER compile plugins into the app bundle.

## Key Technologies

| Technology | Version | Used For |
|------------|---------|----------|
| Hono | 4.12+ | Backend HTTP server & routing |
| React | 19 | Frontend UI |
| Vite | 6 | Frontend build tool & HMR |
| Tailwind CSS | 3.4 | Styling |
| Zustand | 5 | State management |
| sql.js | 1.11 | SQLite via WASM (all platforms) |
| Playwright | 1.61 | E2E testing |
| TypeScript | 5.9 | All code (strict mode) |
| tsx | 4.23 | TypeScript execution (dev) |

## Debugging

```bash
# Backend hot-reloads on file save (tsx watch)
curl http://localhost:8080/api/v1/...  # Test API directly, no browser needed

# Frontend hot-reloads on save (Vite HMR)
# Open http://localhost:5173 — changes appear instantly

# TypeScript errors on save (watch mode not yet configured)
pnpm typecheck
```
