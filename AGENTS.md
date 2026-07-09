# IReader-Next — AI Agent Instructions

## Project Identity

This is a **web-native manga/novel reader app** — an alternative to IReader/Tachiyomi.
Core innovation: **zero-compile JS source plugins** loaded at runtime into a sandboxed JS VM (Node `vm`, WebView V8, Web Worker).
Cross-platform: Android (Ktor + WebView), Desktop (Tauri), Web (PWA).

## Architecture Laws (NEVER violate)

1. **Plugin sandbox rule**: Source plugins are `.js` files loaded at runtime. NEVER compile plugins into the app bundle. NEVER require a build step to add a source.
2. **Backend-execution rule**: All plugin code runs in the backend sandbox (Node `vm` on desktop, WebView V8 hidden on Android, Web Worker on web). Frontend receives only structured JSON. NEVER run untrusted plugin code in the frontend main thread.
3. **Zero duplication rule**: TypeScript is the ONLY language for business logic. `apps/android/` is ~200 lines of Kotlin for native Android APIs ONLY — NO SQL, NO storage logic, NO route handlers beyond native bridge. If you need a feature, write it in `packages/` (TypeScript). NEVER duplicate logic in Kotlin.
4. **API contract rule**: Frontend communicates with backend exclusively via REST + WebSocket at `http://localhost:8080/api/v1`. NEVER let the frontend directly access plugin filesystem or native APIs.
5. **Clean architecture rule**: Dependency direction is always: `presentation → usereposities → use cases → entities`. NEVER depend on an outer layer from an inner layer. `@ireader/core` has ZERO dependencies.
6. **Single source of truth rule**: State lives in Zustand stores, auto-persisted to SQLite via async HTTP middleware (Zustand → `POST /api/v1/...` → backend → sql.js). NEVER have dual state. NEVER read SQLite directly in components.
7. **Platform adapter rule**: Platform-specific code (Ktor shell, Tauri shell, Worker host) is ONLY in `apps/*`. Shared packages are pure TypeScript. NEVER put platform logic in shared packages.
8. **No hardcoded values rule**: Source IDs, URLs, capabilities are dynamic — always read from the plugin manifest at runtime. NEVER hardcode a source ID in app code.
9. **E2E parity rule**: Every user-facing feature must have a Playwright E2E test. API responses must be testable via `curl` without a browser. AI debugs by hitting REST endpoints directly.

## Project Structure

```
apps/android/     — Android shell (~200 lines Kotlin): Ktor static server + hidden WebView V8 engine + native bridge
apps/desktop/     — Tauri desktop shell (Rust)
apps/web/         — PWA entry point

packages/core/              — Entities, repository interfaces, use cases. ZERO deps.
packages/storage/           — SQLite: ONE TypeScript codebase. sql.js WASM (Android/Web) + bun:sqlite (desktop)
packages/backend/           — Hono HTTP server: ONE TypeScript codebase. Runs on Bun (desktop), V8 (Android), Worker (web)
packages/plugin-system/     — Plugin loader, sandbox adapters (Node vm, WebView V8, Web Worker)
packages/frontend/          — React SPA, pages, Zustand stores, design system
packages/reader-engine/     — Webtoon/pager/text reader components
packages/tts-engine/        — TTS abstraction + engine implementations
packages/translation-engine/ — Translation abstraction + engine implementations

e2e/              — Playwright tests
plugins/          — Sample source plugins (.js files)
```

## Development Workflow

```bash
pnpm dev           # Frontend localhost:5173 (HMR) + Backend localhost:8080 (Hono)
pnpm test          # Unit + integration tests (Vitest)
pnpm test:e2e      # E2E tests (Playwright) against running dev server
pnpm build         # Production build (frontend + backend bundle)
pnpm lint          # ESLint + TypeScript check
```

### Key Architectural Rules for Daily Work

- **Everything is TypeScript except `apps/android/`** (~200 lines Kotlin). ALL business logic, storage, and API routes are in `packages/` (TypeScript).
- **sql.js WASM for storage** — same SQLite code runs on desktop, Android (V8), and web. Desktop gets native optimization via `bun:sqlite` but the API is identical.
- **Backend bundle** is a single `.js` file compiled by esbuild. On Android it runs in a hidden WebView's V8 engine. On desktop it runs natively on Bun.
- **AI debugging** = `curl http://localhost:8080/api/v1/...` — never needs Android emulator.

## File & Code Conventions

### TypeScript
- Strict mode. Explicit return types on all functions. No `any` — use `unknown` + type guards.
- Barrel exports via `index.ts` per directory. Named exports only (no `export default` for packages, only for plugins).
- Path aliases: `@ireader/core`, `@ireader/plugin-system`, etc. No relative imports across packages.

### React Components
- Functional components only. No class components.
- Props interface prefixed with component name: `interface ReaderProps`
- One component per file. Component file name matches: `MangaCard.tsx`
- State logic in Zustand stores, NOT in `useState` for domain data. Local `useState` only for UI state (modals, tooltips, etc.).
- Pages in `pages/` directory, route path matches filesystem: `/settings/tts` → `pages/settings/tts.tsx`

### Zustand Stores
- One store per domain: `library-store.ts`, `reader-store.ts`, `settings-store.ts`, etc.
- Auto-persist middleware for all domain stores. Store → SQLite sync via debounced write (500ms).
- Store interfaces prefixed with store name: `LibraryStore`, `ReaderStore`
- Actions are methods on the store, not separate functions.

### API Routes (Backend)
- File per resource: `api/sources.ts`, `api/library.ts`, etc.
- Route handler signature: `(c: Context) => Promise<Response>` (Hono style)
- All responses wrapped in typed response objects. Errors use `{ error: string, code: number }`.
- Route paths match: `/api/v1/sources/:id/popular`

### Plugins (Source .js files)
- CommonJS-style plugin with `export default { ... }` — sandbox handles the module system.
- Plugin file name: `source.js` (required), manifest: `source.json` (optional).
- All `fetch()` calls go through the sandbox's built-in `fetch` — NOT `require('node-fetch')`.
- DOM parsing uses the sandbox's built-in `parseHTML(html)` — returns a Cheerio-like API.
- Helper functions at bottom of file, not imported from external files.
- No external npm dependencies. Everything the plugin needs is provided by the sandbox.

## Testing Requirements

- **Unit tests** with Vitest for all use cases, repositories, utility functions.
- **E2E tests** with Playwright for every user-facing feature.
- **API tests** via supertest/Hono testing — verify request → response contract.
- **Plugin tests** using a mock sandbox — verify plugin output shape matches expected types.
- Tests must be runnable in CI without Android emulator or device.

## Commit Style

```
type(scope): short description

types: feat, fix, refactor, test, docs, chore, perf
scopes: core, plugin-system, storage, backend, frontend, reader, tts, translation, android, desktop
```

## Plugin Interface Contract (Copy this to every source plugin task)

```typescript
interface SourcePlugin {
  info: {
    id: string, name: string, lang: string, baseUrl: string,
    version: string, icon?: string,
    capabilities: ('popular' | 'search' | 'latest' | 'mangaDetail' | 'chapters' | 'pages')[]
  }
  popular(page: number): Promise<MangaSummary[]>
  search(query: string, page: number): Promise<MangaSummary[]>
  latest?(page: number): Promise<MangaSummary[]>
  mangaDetail(id: string): Promise<MangaDetail>
  chapters(mangaId: string): Promise<Chapter[]>
  pages(chapterId: string): Promise<Page[]>
  initialize?(): Promise<void>
  destroy?(): Promise<void>
}
```

## AI Debugging Workflow

When debugging an issue:
1. Hit the REST API endpoint directly: `curl http://localhost:8080/api/v1/...`
2. Check the response shape matches the expected interface
3. For plugin issues, use the dry-run debug endpoint to see raw HTTP status + response body
4. Edit the source `.js` file → backend hot-reloads → re-curl
5. NO Android compilation, NO emulator, NO APK build needed
