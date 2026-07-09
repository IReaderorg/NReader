# IReader-Next: Comprehensive Architecture & Implementation Plan

> A web-native IReader alternative — zero-compile JS source plugins, cross-platform, AI-debuggable, E2E testable.

---

## 1. Core Philosophy

### Problem

IReader forces every source change through: Kotlin → KSP → Compile → APK → Device. AI debugging takes 1-5 min per iteration.

### Solution

Separate **infrastructure** (compiled once) from **dynamic content** (zero-compile):

```
Infrastructure (compiled ONCE):
  • Android shell (Kotlin, ~600 lines inc. build files)
  • Desktop shell (Tauri/Rust, ~500 lines)  
  • Backend server (TypeScript)

Dynamic Content (ZERO compile, hot-reload):
  • Source plugins (.js files — edit & run)
  • Frontend SPA (React — HMR on save)
  • E2E tests (Playwright — 100ms per test)
```

| IReader Pain | IReader-Next Solution |
|---|---|
| KSP annotation processing (compile-time) | Sources are plain `.js` — **zero compilation** |
| Any source change = full APK rebuild (~1-5 min) | Source = JS file dropped in folder → reload |
| AI debugging needs emulator/device | Dev on `localhost:8080` — AI hits REST directly |
| E2E tests = instrumented tests (slow) | Playwright on `localhost` — 100ms per test |
| UI in Jetpack Compose = compile to test | Web (React) — HMR, 0ms compile, instant feedback |
| Plugin = APK = coarse isolation | Plugin = function in JS sandbox |

---

## 2. High-Level Architecture (Zero Duplication)

### Design Rule

> **Every line of business logic exists ONCE in TypeScript. Platform shells are thin adapters.**

```
┌─────────────────────────────────────────────────────────────────────────┐
│                         One TypeScript Codebase                          │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│  ┌────────────┐  ┌───────────────┐  ┌──────────┐  ┌──────────────────┐ │
│  │ @ireader/  │  │ @ireader/     │  │@ireader/ │  │ @ireader/        │ │
│  │ core       │─▶│ storage       │─▶│backend   │  │ plugin-system    │ │
│  │(entities,  │  │(SQLite repos, │  │(Hono API │  │(sandbox, loader, │ │
│  │ usecases)  │  │ backup,       │  │ routes,  │  │ registry)        │ │
│  │            │  │ migrations)   │  │ jobs, WS)│  │                  │ │
│  └────────────┘  └───────────────┘  └─────┬────┘  └──────────────────┘ │
│                                           │                             │
│  ┌────────────┐  ┌───────────────┐  ┌─────▼────┐  ┌──────────────────┐ │
│  │ @ireader/  │  │ @ireader/     │  │@ireader/ │  │ @ireader/        │ │
│  │ frontend   │  │ reader-engine │  │tts-engine│  │ translation-     │ │
│  │ (React SPA)│  │(webtoon,      │  │(WebSpeech│  │ engine           │ │
│  │            │  │ pager, text)  │  │ Gradio,  │  │(AI, local, API,  │ │
│  │            │  │               │  │ Android) │  │ glossary)        │ │
│  └────────────┘  └───────────────┘  └──────────┘  └──────────────────┘ │
│                                                                         │
│  Storage: sql.js WASM → same TypeScript code, same SQLite, everywhere  │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
           │                            │                        │
           ▼                            ▼                        ▼
┌─────────────────────┐  ┌────────────────────┐  ┌──────────────────────┐
│     Desktop (Tauri)  │  │ Android (thin      │  │  Web PWA             │
│                     │  │  Ktor shell)        │  │                      │
│  ┌───────────────┐  │  │ ┌──────────────┐   │  │ ┌──────────────────┐ │
│  │ Bun/Node runs  │  │  │ │ Ktor (~200   │   │  │ │ Web Worker       │ │
│  │ TS backend     │  │  │ │ lines)       │   │  │ │ runs TS backend  │ │
│  │ natively       │  │  │ │ • serves     │   │  │ │ (sql.js WASM)    │ │
│  │ (bun:sqlite)   │  │  │ │   frontend   │   │  │ │ • CORS-limited   │ │
│  └───────────────┘  │  │ │ • native      │   │  │ │ • no proxy       │ │
│                     │  │ │   bridge      │   │  │ └──────────────────┘ │
│  ┌───────────────┐  │  │ └──────┬───────┘   │  └──────────────────────┘
│  │ Tauri WebView │  │  │ ┌──────▼───────┐   │
│  │ (frontend SPA)│  │  │ │ V8 Engine    │   │
│  └───────────────┘  │  │ │ (hidden       │   │
│                     │  │ │  WebView)     │   │
│  Tray + Notif       │  │ │ ┌───────────┐│   │
└─────────────────────┘  │ │ │ TS backend││   │
                         │ │ │ sql.js    ││   │
                         │ │ │ WASM      ││   │
                         │ │ └───────────┘│   │
                         │ └──────────────┘   │
                         └────────────────────┘
```

### Plugin Update & Data Lifecycle

When a plugin is updated (same ID, newer version):
- **Library entries are NOT orphaned** — they remain tagged with the source ID. If the site's URL structure hasn't changed, `mangaDetail()` for existing IDs continues to work.
- **Risk**: If `baseUrl` changes, existing manga IDs (which are source-scoped like `"manganato/abc123"`) may no longer resolve. The user sees "source unavailable" on those entries until the plugin is adjusted or the entry is removed.
- **Recommendation**: Plugin authors should NOT change `baseUrl` within the same plugin ID. Major site changes should use a new plugin ID (e.g., `manganato-v2`) — users migrate by adding the new source manually.

When a plugin is **uninstalled**:
- Library entries from that source remain in the database (they still belong to the user's library — just without a live source).
- Frontend shows a "Source unavailable" badge on affected library entries.
- User can either remove them or install a replacement plugin with the same ID.

This preserves the plan's rule: **"multi-source identity: independent tracking per source. No auto-merge."**

---

### What Changes Per Platform

| Layer | Desktop | Android | Web |
|-------|---------|---------|-----|
| **Backend logic** | `packages/backend/` + `packages/storage/` — Bun native | Same code, runs in **WebView V8** (hidden) | Same code, runs in **Web Worker** |
| **SQLite driver** | `bun:sqlite` (native) | `sql.js` WASM (same API) | `sql.js` WASM (same API) |
| **HTTP server** | Bun's built-in server | **Ktor (~200 lines)** — static file serve + native bridge proxy | None (or cloud backend) |
| **Plugin runtime** | Node.js `vm` module. **fetch() has NO CORS restrictions** (Node.js doesn't enforce CORS). | WebView V8 (hidden). **fetch() bypasses CORS** via JavaScriptInterface→OkHttp. | Web Worker. **fetch() IS CORS-restricted** (browser enforces it). On web, plugins that source from CORS-limited sites only work if the backend runs on a server (cloud mode). **PWA-only mode**: plugins limited to CORS-enabled APIs or locally installed content. |
| **UI** | Tauri WebView | Main WebView (foreground) | Browser tab |
| **Native features** | Tray, notifications, FS | Downloads, TTS, notifications (via Ktor bridge) | None |

### Android Shell — ~200 lines of Kotlin, NO business logic

```
ForegroundService
  ├── Ktor Server (localhost:8080)
  │   ├── GET / → serve frontend static files from assets
  │   ├── /api/v1/* → forward to BackendEngine (V8/JS runtime)
  │   ├── /proxy/image → image cache via Android (native performance)
  │   ├── /native/download → DownloadManager integration
  │   ├── /native/tts → Android TTS bridge
  │   └── /native/notifications → Android notification system
  │
  ├── BackendEngine
  │   ├── Hidden WebView (no UI rendering) with V8 JS engine
  │   ├── Loads: backend.bundle.js (same code as desktop)
  │   ├── Loads: sql-wasm.wasm (SQLite compiled to WebAssembly)
  │   ├── All API routes, storage, use cases — SAME as desktop
  │   └── Communication via Ktor ↔ WebView JavaScriptInterface
  │
  ├── PluginObserver
  │   └── FileObserver on app-private /plugins/ directory
  │       (NOT shared storage — avoids scoped storage issues)
  │
  └── MainActivity
      └── WebView → loads http://localhost:8080 (frontend SPA)
```

> **Ktor has ZERO database code, ZERO business logic, ZERO route handlers beyond native bridge calls. It's a thin pipe to the TypeScript backend running in V8.**

---

## 3. Repository Structure

```
ireader-next/                          ───── pnpm workspace root ─────
│
├── packages/                          ← ALL TypeScript. Zero Kotlin.
│   ├── core/                          # Entities, interfaces, use cases. ZERO deps.
│   │   ├── src/entities/              # Manga, Chapter, Page, Source, etc.
│   │   ├── src/repositories/          # Interfaces only (Storage, Library, etc.)
│   │   ├── src/usecases/              # Business logic (pure functions)
│   │   └── package.json
│   │
│   ├── storage/                       # SQLite — ONE implementation everywhere
│   │   ├── src/
│   │   │   ├── drivers/               # Platform adapters (sql.js, bun:sqlite)
│   │   │   │   ├── sqljs.ts           #     WASM — Android + Web
│   │   │   │   ├── bun.ts             #     Native — Desktop (Bun)
│   │   │   │   └── interface.ts       #     Abstract driver contract
│   │   │   ├── repositories/          # Concrete implementations (one copy, all platforms)
│   │   │   ├── backup/                # ZIP export/import
│   │   │   ├── schema/                # SQL migrations
│   │   │   ├── index.ts               # Exports driver factory
│   │   │   └── database.ts            # Connection manager
│   │   └── package.json
│   │
│   ├── backend/                       # HTTP server — ONE codebase
│   │   ├── src/
│   │   │   ├── api/                   # Hono route handlers (all platforms)
│   │   │   ├── jobs/                  # Background tasks
│   │   │   ├── plugins/               # Plugin system integration
│   │   │   ├── index.ts               # Creates and exports Hono app
│   │   │   └── entry.ts               # Platform entry point (dev server)
│   │   └── package.json
│   │
│   ├── plugin-system/                 # Plugin loader + sandbox
│   │   ├── src/
│   │   │   ├── sandbox/
│   │   │   │   ├── node-vm.ts         # Desktop (Node.js vm)
│   │   │   │   ├── webview-v8.ts      # Android (hidden WebView V8)
│   │   │   │   ├── web-worker.ts      # Web (Web Worker)
│   │   │   │   └── interface.ts       # Abstract sandbox contract
│   │   │   ├── registry.ts
│   │   │   ├── loader.ts
│   │   │   └── validator.ts
│   │   └── package.json
│   │
│   ├── frontend/                      # React SPA
│   │   ├── src/pages/                 # 14 pages
│   │   ├── src/store/                 # Zustand stores (auto-persist to HTTP endpoint)
│   │   ├── src/components/            # shadcn/ui design system
│   │   ├── src/api/client.ts          # Fetches from localhost:8080
│   │   ├── vite.config.ts
│   │   └── package.json
│   │
│   ├── reader-engine/                 # Reader components (pure TS/React)
│   ├── tts-engine/                    # TTS abstraction (pure TS)
│   └── translation-engine/            # Translation abstraction (pure TS)
│
├── apps/
│   ├── android/                       # Android shell (~200 lines Kotlin)
│   │   ├── app/src/main/java/.../
│   │   │   ├── MainActivity.kt        # WebView launcher
│   │   │   ├── ServerService.kt       # Foreground service + Ktor
│   │   │   ├── BackendEngine.kt       # V8/WebView JS runtime wrapper
│   │   │   └── NativeBridge.kt        # Downloads, TTS, notifications
│   │   ├── build.gradle.kts
│   │   └── settings.gradle.kts
│   │
│   ├── desktop/                       # Tauri shell (Rust)
│   │   ├── src-tauri/
│   │   └── package.json
│   │
│   └── web/                           # PWA: Vite config + service worker + Web Worker backend
│       ├── package.json               # Builds frontend + bundles backend as Web Worker
│       ├── vite.config.ts             # vite-plugin-pwa, worker bundling
│       └── sw/                        # Service worker (offline, cache)
│
├── e2e/                               # Playwright tests
├── plugins/                           # Sample source plugins
│
├── package.json                       # pnpm workspace root
├── turbo.json                         # Turborepo config
└── tsconfig.json
```

### Key Structural Zero-Duplication Rules

- `packages/storage/` — ONE TypeScript implementation. `sql.js` WASM on Android/Web, `bun:sqlite` native on desktop.
- `packages/backend/` — ONE TypeScript implementation. Runs on Bun (desktop), WebView V8 (Android), Web Worker (web).
- `apps/android/` — ~200 lines of Kotlin. ZERO database code. ZERO business logic. Just native bridge calls.
- There is NO `packages/backend-kt` or duplicate Kotlin storage.

---

## 4. Source Plugin System (Core Innovation)

### Plugin Interface

```typescript
interface SourcePlugin {
  info: { id, name, lang, baseUrl, version, capabilities }
  popular(page: number): Promise<MangaSummary[]>
  search(query: string, page: number): Promise<MangaSummary[]>
  latest?(page: number): Promise<MangaSummary[]>
  mangaDetail(id: string): Promise<MangaDetail>
  chapters(mangaId: string): Promise<Chapter[]>
  pages(chapterId: string): Promise<Page[]>
}
```

### Data Shapes (used by ALL endpoints)

All API responses use these exact shapes. Frontend and backend MUST NOT diverge.

```typescript
interface MangaSummary {
  id: string                    // Source-scoped: "manganato/chapter-12345"
  title: string
  coverUrl: string              // Raw URL from source; proxy adds /proxy/image?url=
  url?: string                  // Direct page URL on the source website
  author?: string
  status?: 'ongoing' | 'completed' | 'hiatus' | 'cancelled'
  rating?: number               // 0-10 scale
  lastUpdated?: string          // ISO 8601
}

interface MangaDetail extends MangaSummary {
  description: string           // HTML or plain text
  genres: string[]
  chapters: Chapter[]
  altTitles?: string[]
}

interface Chapter {
  id: string                    // Source-scoped: "manganato/chapter-67890"
  number: number
  title: string
  url?: string
  volume?: number
  date?: string                 // ISO 8601
  read: boolean                 // From local library, not source
  downloaded: boolean           // From local download state, not source
}

interface Page {
  index: number
  url: string                   // Image URL from source
  width?: number
  height?: number
}
```

> **id scoping rule**: All manga/chapter IDs are prefixed with source ID + `/` to guarantee uniqueness across sources. Example: `"manganato/abc123"`. The `/api/v1` routes extract the source ID from the URL path, so frontend sends only the source-scoped portion in request bodies.

### Example Plugin

```javascript
// plugins/manganato/source.js
export default {
  info: {
    id: "manganato", name: "Manganato", lang: "en",
    baseUrl: "https://manganato.com", version: "1.0.0",
    capabilities: ["popular", "search", "detail", "chapters", "pages"]
  },
  async popular(page) {
    const html = await fetch(`${this.info.baseUrl}/genre-all/${page}`)
    return this.parseCards(html)  // built-in DOM helper
  },
  async search(query, page) {
    const html = await fetch(
      `${this.info.baseUrl}/search/story/${encodeURIComponent(query)}?page=${page}`
    )
    return this.parseCards(html)
  },
  async mangaDetail(id) { /* parseHTML() provided by sandbox */ },
  async chapters(mangaId) { /* return from detail */ },
  async pages(chapterId) { /* parse image URLs */ },
}
```

### Dev Workflow

```
1. mkdir -p plugins/my-source && create source.js
2. Backend auto-detects via FileObserver
3. Test: curl localhost:8080/api/v1/sources/my-source/popular
4. Edit → save → re-curl → instant results
5. AI debug: hits the same HTTP endpoint, gets JSON
6. Ship to Android: adb push plugins/my-source /data/data/com.ireader.next/files/plugins/
```

### Plugin Storage (Per Platform)

| Platform | Storage | Watcher | User Install Method |
|----------|---------|---------|---------------------|
| **Desktop** | `~/.ireader/plugins/` | `fs.watch` (inotify/fsevents) | Drop `.js` files in directory or use Plugin Manager UI |
| **Android** | App-private: `/data/data/com.ireader.next/files/plugins/` | `FileObserver` (Kotlin) | Plugin Manager UI (downloads from URL), or `adb push` for dev |
| **Web (PWA)** | Stored as text in sql.js `plugins` table | N/A (no filesystem) | Plugin Manager UI: upload `.js` file or paste install URL; backend stores in DB |

The web mode has no filesystem, so plugins are stored inside SQLite as text blobs. The `PluginLoader` checks both disk (desktop/android) and database (web) when enumerating plugins.

```
/data/data/com.ireader.next/files/plugins/     ← Android (app-private)
├── manganato/source.js + source.json
├── mangadex/source.js + source.json
└── tts-coqui/plugin.js + plugin.json
```

---

## 5. State Management

Zustand + Immer + auto-persist middleware → SQLite on disk.

```
Memory (Zustand Store) ← auto-persist → Disk (SQLite) ← export → Backup ZIP
```

**Stores:** library, reader, settings, history, downloads, sources, tts, plugins

---

## 6. Feature Map (58 features from IReader)

| Category | Features |
|---|---|
| **Sources** | Browse, Search, Latest, Manga Detail, Chapters, Pages, Multi-source, Per-source config, **Source-switching: same manga on multiple sources tracked independently. No auto-merging.** |
| **Reader** | Webtoon (scroll), Pager (flip), Text/Novel, Reader Settings, Screensaver, Per-source CSS |
| **Library** | CRUD, Categories, Tracking (chapters read, score, dates) |
| **History** | Continue Reading, Recent Reads, Clear |
| **Downloads** | Queue, Progress, Background, Retry, Clear Completed |
| **TTS** | Play/Pause/Resume/Stop, Speed, Queue, Multiple engines |
| **TTS Engines** | Android TTS, Web Speech, Gradio, Cloud (ElevenLabs, Azure) |
| **Translation** | AI (LLM), Local (offline), API (DeepL/Google), Glossary/Dictionary |
| **Backup** | Export ZIP, Import, Auto-backup, WebDAV Sync, Cloud Sync |
| **Settings** | General, Appearance, Reader, TTS, Translation, Downloads, Backup, Notifications |
| **Plugins** | Manager, Install/Uninstall, Enable/Disable, Marketplace, ThemePlugin, AIPlugin, ImageProcessing |
| **System** | Update Check, Auto-update, Health, Info |
| **Other** | Bookmarks, Notes, Character DB, Notifications |
| **Bookmarks** | `GET /bookmarks/:mangaId`, `POST /bookmarks`, `DELETE /bookmarks/:id` |
| **Notes** | `GET /notes/:mangaId`, `POST /notes`, `PUT /notes/:id`, `DELETE /notes/:id` |
| **Characters** | `GET /characters`, `POST /characters`, `PUT /characters/:id`, `DELETE /characters/:id` |

---

## 7. API Contract (REST + WebSocket)

| Group | Endpoints |
|---|---|
| **Sources** | `GET /sources`, `GET /sources/:id/popular?page=N`, `GET /sources/:id/search?q=`, `GET /sources/:id/detail/:mangaId`, `GET /sources/:id/pages/:chapterId` |
| **Library** | `GET /library`, `POST /library`, `DELETE /library/:id`, `GET /library/categories`, `GET /library/:id/tracking`, `PUT /library/:id/tracking` (chapters read, score, dates) |
| **History** | `GET /history`, `POST /history`, `DELETE /history/:mangaId` |
| **Downloads** | `GET /downloads`, `POST /downloads`, `DELETE /downloads/:jobId` |
| **TTS** | `POST /tts/speak`, `POST /tts/stop/pause/resume`, `POST /tts/queue`, `GET /tts/engines` |
| **Translation** | `POST /translate`, `GET /translate/engines`, `CRUD /glossary` |
| **Backup** | `POST /backup/export`, `POST /backup/import`, `POST /backup/sync` |
| **Settings** | `GET /settings`, `PUT /settings`, `GET /settings/:key`. **Validation**: `PUT /settings` validates that `value` is valid JSON before storing. Invalid JSON returns `400 VALIDATION_ERROR`. Per-key type coercion is enforced in the settings repository (booleans stored as `true`/`false` strings, numbers as strings, objects as JSON). The frontend always reads back after write to confirm. |
| **Image Proxy** | `GET /proxy/image?url=<encoded>&width=N` — fetch + cache + WebP convert. On Android, handled natively by Ktor (bypasses V8). Used for ALL manga images (avoids CORS, enables caching). **URL encoding**: the `url` parameter is double-encoded with `encodeURIComponent()` on the frontend and decoded once by the proxy. The proxy THEN re-encodes it once for the actual HTTP request — this prevents mangled URLs when source image URLs contain `&`, `?`, unicode, or non-ASCII characters embedded in the query parameter. |
| **Local Image** | `GET /proxy/image?url=local://<hash>` — serves cached/downloaded images from local storage (LRU cache on disk, download storage for offline). The frontend swaps image URLs: online → proxy with full URL, offline/cached → `local://<hash>`. The backend resolves `local://` to the local cache path and serves the file. No external fetch needed. |
| **Plugins** | `GET /plugins`, `POST /plugins/install`, `DELETE /plugins/:id` |
| **System** | `GET /system/health`, `GET /system/info`, `POST /system/update/check` |
| **WebSocket** | `WS /ws` — channels: `downloads` (progress/completed/failed), `tts` (progress/error/done), `sync` (status/conflicts), `plugins` (reloaded/install-progress) |
| **Bookmarks** | `GET /bookmarks/:mangaId`, `POST /bookmarks`, `DELETE /bookmarks/:id` |
| **Notes** | `GET /notes/:mangaId`, `POST /notes`, `PUT /notes/:id`, `DELETE /notes/:id` |
| **Characters** | `GET /characters`, `POST /characters`, `PUT /characters/:id`, `DELETE /characters/:id` |

> **WebSocket message format**: All messages are JSON: `{ channel: string, event: string, data: unknown }`. Example: `{ channel: "downloads", event: "progress", data: { jobId: "abc", percent: 42, bytes: 1048576 } }`.

> **WebSocket reconnection**: Frontend auto-reconnects on disconnect with exponential backoff (1s → 2s → 4s → 8s → max 30s). On reconnect, frontend sends `{ resume: true, lastEventId: number }` to receive missed events since the given sequence number. Backend stores the last 100 WebSocket events per connection in a ring buffer for replay. Events older than the buffer or beyond 5 minutes are treated as stale and frontend should refetch state via REST.

### Error Response Format

All API errors follow a single contract:

```json
{
  "error": "Human-readable message",
  "code": "SOURCE_UNAVAILABLE",
  "status": 503,
  "details": {}
}
```

Standard `code` values: `SOURCE_UNAVAILABLE`, `PLUGIN_TIMEOUT`, `PLUGIN_ERROR`, `PARSE_FAILED`, `NOT_FOUND`, `VALIDATION_ERROR`, `STORAGE_ERROR`, `DOWNLOAD_FAILED`, `RATE_LIMITED`.

HTTP status mapping: `400` (VALIDATION_ERROR), `404` (NOT_FOUND), `429` (RATE_LIMITED), `502` (SOURCE_UNAVAILABLE, PLUGIN_ERROR), `504` (PLUGIN_TIMEOUT), `500` (STORAGE_ERROR).

### Rate Limiting & Anti-Abuse

Source websites must not be overwhelmed. The backend enforces per-source rate limits:

| Setting | Default | Configurable |
|---------|---------|-------------|
| Delay between requests | 500ms | Per source in plugin config |
| Max concurrent requests per source | 2 | Global setting |
| Background sync interval | 6 hours | Per source in plugin config |
| Max pages per download batch | 50 | Global setting |
| User-agent | Spoofed per source from plugin config | Per source |

The download queue respects rate limits — it queues requests per source and never exceeds the concurrency limit. Background chapter fetching respects battery/metered-network constraints via Android's `WorkManager` constraints (Phase 6).

---

## 8. Implementation Phases (16 Weeks)

### Phase 0 — Foundation (Weeks 1-2)

**Goal**: Working dev loop — monorepo, core types, one API call from frontend to backend to SQLite.

- [ ] Monorepo scaffold (pnpm, Turborepo, tsconfig)
- [ ] `@ireader/core` — entities, repository interfaces, use cases
- [ ] `@ireader/storage` — SQLite driver interface, sql.js WASM setup, migrations runner, 1 migration
- [ ] `@ireader/backend` — Hono server with health endpoint, CORS, 1 route (`GET /api/v1/sources`)
- [ ] `@ireader/frontend` — Vite + React + shadcn/ui, React Router (file-based routes via `pages/` directory convention), routing shell, theme toggle, proxy config (dev server :5173 proxies `/api` → `:8080` and `/ws` → `ws://:8080`)
- [ ] `@ireader/plugin-system` — sandbox interface, mock sandbox for testing (no real adapter yet)
- [ ] `e2e/` — Playwright config, 1 smoke test
- [ ] Dev script: `pnpm dev` → frontend + backend concurrently
- [ ] **Validation Gate**: Frontend fetches `GET /api/v1/sources` → gets mock JSON (hardcoded in route, no disk loading yet) → renders on screen. All in <10s dev cycle.

### Phase 1 — Source Loading + Browse (Weeks 3-4)

**Goal**: Sources load from disk, execute in sandbox, display in frontend.

- [ ] Plugin file watcher + hot-reload (Node.js `fs.watch`). **Race guard**: watcher debounces reload events with 300ms cooldown — if multiple file change events fire within 300ms (common during editor saves that write in chunks), only the last one triggers a reload. The plugin is validated AFTER the file is fully written (waits for `fs.watch` `change` event to settle), not on first notification.
- [ ] Source REST API: `popular`, `search`, `latest`, `detail`, `chapters`, `pages`
- [ ] Plugin sandbox: Node.js `vm` (desktop) + Web Worker (web)
- [ ] Sandbox security audit: sandbox escape testing, timeout enforcement, memory limits, fetch allowlist
- [ ] Image proxy endpoint (caching with LRU, WebP conversion)
- [ ] First-launch UX: empty state with plugin install prompt ("Add your first source to get started"), links to plugin manager or bundled plugin list
- [ ] Frontend: Error state component system — network error (retry button + message), empty state (icon + message + CTA), loading (skeleton), plugin crash (error message + suppress option). Used by all pages consistently.
- [ ] Frontend: Browse page (source grid + manga cards with skeleton loading)
- [ ] Frontend: Search page (debounced input + results grid)
- [ ] Frontend: Manga Detail page (cover, info, chapter list)
- [ ] Plugin SDK scaffold: `@ireader/create-plugin` CLI (scaffolds source.js + source.json)
- [ ] Plugin testing CLI: `@ireader/test-plugin` (runs plugin methods outside full app, validates output shapes against data contract)
- [ ] 1 demo source plugin (mock data, serves as reference)
- [ ] 1 real source plugin (Manganato)
- [ ] E2E tests: Popular + Search + Detail flows
- [ ] **Validation Gate**: `curl localhost:8080/api/v1/sources/manganato/popular?page=1` → returns valid JSON. Frontend renders it. AI can debug by editing source.js and re-curling.

### Phase 2 — Reader + Library (Weeks 5-6)

**Goal**: Read manga end-to-end, track progress, manage library.

- [ ] `@ireader/reader-engine` — Webtoon mode (virtual scroll, lazy image loading)
- [ ] `@ireader/reader-engine` — Pager mode (page flip, L/R, R/L)
- [ ] `@ireader/reader-engine` — Text/novel mode (HTML sanitization, formatting)
- [ ] Reader overlay (brightness, font size, mode switch, progress bar)
- [ ] Library CRUD via REST + sql.js storage
- [ ] Library categories
- [ ] History tracking (auto-records on read, debounced)
- [ ] Frontend: Library page (grid view, categories filter)
- [ ] Frontend: History page (recent reads with continue button)
- [ ] Frontend: Reader page (all three modes with overlay controls)
- [ ] Zustand stores: reader-store, library-store, history-store
- [ ] Zustand async persist middleware (debounced HTTP POST to backend, 500ms debounce)
- [ ] Zustand offline write queue: failed POSTs (network down) enqueued in memory, retried on next successful connection with exponential backoff. Queue cleared on successful flush.
- [ ] E2E tests: Reader scroll/flip, Library add/remove/categories, History recording
- [ ] **Validation Gate**: Open chapter → read 5 pages → close → reopen → position restored. Library persists across restart.

### Phase 3 — Downloads + Settings (Weeks 7-8)

**Goal**: Download chapters for offline reading, full settings system.

- [ ] Download queue manager (backend job, sql.js persistence)
- [ ] Chapter download (images → LRU cache, background)
- [ ] Download progress via WebSocket
- [ ] Frontend: Downloads page (queue, progress bars, cancel)
- [ ] Settings API (CRUD via REST + sql.js)
- [ ] Frontend: Settings pages (general, appearance, reader, downloads)
- [ ] Theme engine (dark, light, amoled, custom accent color)
- [ ] Frontend: Source manager page (list, enable/disable, per-source config)
- [ ] E2E tests: Download queue → progress → complete. Settings change → persist → reload.
- [ ] **Validation Gate**: Download 3 chapters → airplane mode → read offline → works.

### Phase 4 — TTS + Translation (Weeks 9-10)

**Goal**: Text-to-speech with multiple engines, AI/local translation.

- [ ] `@ireader/tts-engine` — Engine abstraction, queue, player
- [ ] TTS engine: Web Speech API (works immediately in browser)
- [ ] TTS engine: Gradio (configurable endpoint, test connection)
- [ ] TTS engine: Android TTS (via Ktor native bridge)
- [ ] TTS engine: Cloud (ElevenLabs, Azure — configurable API keys)
- [ ] TTS WebSocket streaming (progress events)
- [ ] Frontend: TTS controls in reader overlay (play/pause/seek/speed/voice)
- [ ] Frontend: TTS settings page (engine selection, voice tuning)
- [ ] `@ireader/translation-engine` — AI (LLM), local (Bergamot?), API (DeepL, Google)
- [ ] Translation glossary (character names, terms — CRUD via REST + sql.js)
- [ ] Frontend: Translation toggle in reader (inline, replace, side-by-side)
- [ ] Frontend: Translation settings + glossary manager
- [ ] E2E tests: TTS play/pause/seek. Translation request → result displayed.
- [ ] **Validation Gate**: TTS speaks chapter text. Translation replaces text inline. Both configurable via settings.

### Phase 5 — Backup + Extended Plugins (Weeks 11-12)

**Goal**: Full backup/restore, extended plugin ecosystem.

- [ ] Backup export (ZIP: sql.js dump + metadata.json + optional covers + plugins)
- [ ] Backup import with conflict resolution (merge vs replace)
- [ ] Auto-backup scheduler (configurable interval)
- [ ] WebDAV sync target
- [ ] Frontend: Backup/restore page (create, list, download, upload, restore)
- [ ] Extended plugin types:
  - [ ] ThemePlugin (CSS injection at runtime)
  - [ ] AIPlugin (summarization, image generation via configured endpoints)
  - [ ] SyncPlugin (cloud sync provider abstraction)
  - [ ] ImageProcessingPlugin (upscaler server connection)
- [ ] Plugin marketplace endpoint (discovery of community plugins)
- [ ] Frontend: Plugin manager page (install from URL/list, enable/disable, configure)
- [ ] E2E tests: Backup → modify library → restore → state matches
- [ ] **Validation Gate**: Export backup ZIP → factory reset → import ZIP → everything restored.

### Phase 6 — Android Shell (Weeks 13-14)

**Goal**: Android app running the entire system natively. Zero business logic in Kotlin.
**Minimum Android version**: API 26 (Android 8.0) — required for modern WebView features (ES2023, WASM, multi-process). API 26 covers 95%+ of active devices.

- [ ] Kotlin/Gradle project setup
- [ ] Ktor server (~200 lines): static file serve + native bridge endpoints
- [ ] Hidden WebView V8 engine: loads `backend.bundle.js` + `sql-wasm.wasm`
- [ ] Ktor ↔ BackendEngine bridge: HTTP request → JavaScriptInterface → V8 → response
- [ ] Frontend static files bundled as Android assets
- [ ] Foreground service (server keeps running, persistent notification)
- [ ] Main WebView activity (loads `http://localhost:8080`, fullscreen). **Back button handling**: Android back press intercepted in `WebViewClient` and dispatched to frontend via `evaluateJavascript("window.__androidBack()")` — the React Router processes it as a history pop (navigating the SPA, not the WebView's browser history stack). If the SPA is at the root route, the default Android behavior (minimize/exit) applies.
- [ ] Native bridge: DownloadManager, notifications, file picker
- [ ] Android TTS engine (via native bridge, invoked from TS backend)
- [ ] Plugin storage in app-private directory (no scoped storage issues)
- [ ] PluginObserver (FileObserver on app-private plugins dir)
- [ ] Hidden WebView crash recovery: `onRenderProcessGone` callback → restart WebView, reload backend bundle, reinitialize from last sql.js save. **In-flight request safety**: Ktor's `CompletableDeferred` for the crashed request times out after 10 seconds and returns `502` to the frontend (prevents coroutine leak). All pending `pending[requestId]` entries are rejected with "Backend crashed" on crash detection.
- [ ] Startup ordering: Ktor serves "Loading..." page until BackendEngine signals ready. Backend engine initialization sequence: (1) load `backend.bundle.js` → (2) initialize sql.js WASM → (3) run pending migrations → (4) register API routes → (5) load plugins from disk/DB → (6) set `window.__BACKEND_READY__ = true`. Frontend retries initial API call on failure with exponential backoff. The `__BACKEND_READY__` flag is set ONLY after step 6, so frontend never sees a half-booted backend.
- [ ] Background chapter fetching via `WorkManager` (respects battery/metered-network, default 6h interval, max 50 pages per batch, respects per-source rate limits)
- [ ] E2E tests: Same Playwright tests against `http://localhost:8080` on device

### Phase 7 — Desktop + Polish (Weeks 15-16)

**Goal**: Desktop app, PWA, i18n, performance, security.

- [ ] Tauri desktop shell (Rust, ~500 lines)
- [ ] Tray icon with background server
- [ ] Desktop notifications (native via Tauri)
- [ ] PWA mode: service worker with **network-first, cache-fallback** strategy — tries live fetch first (always gets fresh content), falls back to cache on failure (offline). Frontend static assets (HTML/CSS/JS) use **cache-first** (versioned by build hash, never stale). **.wasm file**: `sql-wasm.wasm` is served **cache-first** (immutable content, same hash across versions) — without this, the Worker backend fails to load on slow/cellular connections. API responses are NEVER cached in SW (they go through the Worker backend which is local).
- [ ] Internationalization (i18n — English + Farsi from IReader users)
- [ ] Accessibility (ARIA labels, keyboard navigation, screen reader support)
- [ ] Performance profiling: Lighthouse >95, bundle <150KB initial JS
- [ ] Security audit: plugin sandbox, API key storage, backup encryption
- [ ] Bundle optimization: code-split by route, lazy reader engine, tree-shake
- [ ] E2E regression: Full test suite on desktop + Android

---

## 9. Performance

| Concern | Solution |
|---|---|
| Plugin execution | V8/Node vm ~0.5ms/call. Warm VM pool. 30s timeout. |
| Memory | Virtual scrolling. Image downscale on proxy. Lazy routes. |
| Storage | SQLite WAL. Debounced persist (500ms). Auto-VACUUM. |
| Images | LRU cache 500MB. WebP conversion. Prefetch next chapter. Cache invalidation: images re-fetched if >7 days old or user triggers "Refresh pages". |
| Bundle | Code-split by route. <200KB initial JS. Tree-shake. |

## 10. Security

| Area | Measure |
|---|---|
| Plugin sandbox | No `require`/`process`/`fs`. `fetch()` scoped to plugin's `info.baseUrl` (user-configurable). **Cross-domain override**: if user adds a domain outside `baseUrl` in plugin config, a confirmation dialog warns "Allow plugin X to fetch from https://external-domain.com?" — logged to audit trail. The sandbox reads the allowlist per-request and rejects disallowed URLs with a descriptive error. 30s/64MB limits. |
| Image proxy | 10MB limit. MIME validation. Path traversal check. **URL scheme validation**: only `http`/`https` allowed (`file://`, `data://`, `ftp://` blocked). **Internal IP block**: proxy rejects requests to RFC 1918 private ranges, localhost (127.0.0.1/::1), link-local (169.254.0.0/16), and `10.x`, `172.16-31.x`, `192.168.x` — prevents SSRF to internal services. **Domain allowlist**: only URLs matching the requesting plugin's `info.baseUrl` origin (overridable in per-source config with explicit confirmation). |
| Storage | App-private SQLite. Encrypted API keys (AES-256-GCM). Encryption key derived per-platform: Android → Android Keystore (hardware-backed), Desktop → OS keychain (libsecret/macOS Keychain/Windows Credential Manager via `keytar`), Web → `crypto.subtle` with key stored in IndexedDB (same-origin bound). No key is ever hardcoded. |
| Backup | AES-256 password protection. Path traversal check on import. |
| Server | Binds `127.0.0.1` only. No auth needed (localhost-only). |
| WebView | No cross-origin JS. No file:// access to sensitive dirs. |

## 11. Key Decisions (Zero Duplication)

| Decision | Choice | Why |
|---|---|---|
| **Backend language** | **TypeScript** (one codebase, all platforms) | Eliminates Kotlin/TS duplication. Backend compiles to JS bundle, runs everywhere. |
| **Android JS runtime** | **WebView V8** (hidden, offscreen) | No native library needed. V8 is on every Android device. Event loop, WASM, custom fetch() via JavaScriptInterface→OkHttp (bypasses CORS for plugin requests; V8's native fetch() is CORS-blocked from about:blank). |
| **SQLite** | **sql.js** WASM (primary) + native drivers | One storage API, same TypeScript code, same SQL dialect. Desktop gets native performance via bun:sqlite. |
| **Android HTTP server** | **Ktor (~200 lines)** | Static file serve + native bridge proxy + image cache. NO business logic. |
| **Desktop HTTP server** | **Bun** (native) | Runs TS backend directly. Hono for routing. |
| **Frontend** | React + Vite | Best ecosystem, AI training data, shadcn/ui |
| **State** | Zustand + async persist | Auto-persists via HTTP to backend (Zustand → localhost:8080 → sql.js) |
| **CSS** | Tailwind + shadcn/ui | Rapid iteration, consistent design |
| **Plugin runtime** | Node vm (desktop) / V8 (Android) / Worker (web) | Same sandbox code, different platform adapters |
| **E2E tests** | Playwright | Same browser, same API, AI-debuggable |
| **Desktop shell** | Tauri (Rust) | Smaller than Electron, system tray |
| **API format** | REST + WebSocket | Universal, cacheable, tool-friendly |
| **Persistence strategy** | Zustand → HTTP POST → Backend → sql.js | Single state pipeline. Works the same in WebView + desktop + web. |

---

## 12. Plugin Sandbox: WebView V8 Engine (Android) + Node vm (Desktop)

### Why WebView V8 instead of QuickJS

QuickJS requires a custom C/JNI bridge, custom `fetch()` implementation, custom event loop. That's months of work to match what V8 already does natively.

**Android's WebView V8** gives us:
- Full ES2023+ JavaScript engine (no native libs to bundle)
- Event loop, microtasks, `Promise`, `async`/`await`
- WebAssembly support (runs `sql.js` WASM)
- No JNI bridge to maintain (V8 is already on every Android device)

### How V8 Runs on Android

```
Ktor receives HTTP request
    │
    ├── Forward request to Hidden WebView via JavaScriptInterface
    │
    ▼
Hidden WebView (no rendering, zero-size, offscreen)
    │
    ├── Loads: about:blank
    │
    ├── WASM loading: sql-wasm.wasm bytes are injected via JavaScriptInterface —
    │   from about:blank, fetch('file:///android_asset/...') is blocked by same-origin policy,
    │   and fetch('http://localhost:8080/...') works but adds latency.
    │   Instead, the BackendEngine reads the WASM file as raw bytes in Kotlin, then calls:
    │   webView.evaluateJavascript("IReaderBackend.loadWasm(" + base64WasmBytes + ")")
    │   The backend stores the bytes and calls WebAssembly.instantiate() directly.
    │
    ├── Has loaded: backend.bundle.js (compiled TypeScript backend, injected via evaluateJavascript)
    │   └── + plugin source .js files (loaded via evaluateJavascript into IIFE-wrapped scopes)
    │   └── + sql.js WASM instantiated from bytes injected via JSInterface
    │
    ├── Uses: V8 engine (Chrome's engine, same as desktop)
    │   ├── Custom fetch() → JavaScriptInterface → OkHttp (bypasses CORS)
    │   │   (Native V8 fetch() from about:blank is CORS-blocked for manga sites.
    │   │    Sandbox injects a fetch() polyfill that calls AndroidBridge.fetch()
    │   │    via JavaScriptInterface, which uses OkHttp with NO CORS restrictions.)
    │   ├── Native Promise, async/await, event loop
    │   ├── Native WebAssembly → runs sql.js WASM
    │   └── Full ES2023+ support
    │
    ├── Executes: backend.handleRequest(path, method, body)
    │   ├── Routes to correct API handler
    │   ├── Runs plugin in sandbox (same sandbox code as Node vm)
    │   ├── Queries SQLite via sql.js WASM
    │   └── Returns JSON response
    │
    └── Result → Ktor → HTTP response to frontend
```

### Ktor ↔ V8 Async Bridge Pattern

Since `evaluateJavascript()` returns synchronously but backend handlers are async, Ktor uses a `CompletableDeferred` pattern:

```
Ktor receives HTTP request
  │
  ├── Assigns requestId, stores CompletableDeferred in pending[requestId]
  ├── Calls: webView.evaluateJavascript("backend.handleRequest('${requestId}', '${path}', '${method}', '${body}')")
  │
  ▼ Waits on pending[requestId].await() (non-blocking coroutine)
  │
  [V8] backend.handleRequest() processes the request asynchronously
  │   ├── Routes to API handler → calls plugin sandbox → sql.js queries
  │   └── Calls: AndroidBridge.sendResponse(requestId, JSON.stringify(response))
  │
  [Kotlin] @JavascriptInterface fun sendResponse(requestId, json)
  │   └── pending[requestId].complete(json) ← resumes the waiting coroutine
  │
  ▼ Ktor serializes the JSON string to HTTP response
  └── Response sent to frontend
```

This pattern also works in reverse: backend JS can initiate native calls (TTS, downloads, notifications) by calling `AndroidBridge.nativeCall(channel, payload)` at any time, not just in response to a Ktor request.

### Ktor ↔ V8 WebSocket Bridge

WebSocket is fundamentally different from REST: it's bidirectional and persistent. The REST CompletableDeferred pattern works for request-response, but WebSocket requires a duplex bridge:

```
Frontend WebSocket connects to Ktor at ws://localhost:8080/ws
  │
  ├── Ktor accepts the WS connection, maintains a session
  │
  ├── Message FROM frontend TO V8 backend:
  │   ├── Ktor receives WS message { channel: "downloads", event: "subscribe", ... }
  │   ├── Assigns requestId, calls webView.evaluateJavascript(...)
  │   ├── V8 processes it → calls AndroidBridge.sendWsMessage(requestId, json)
  │   └── Ktor forwards response back to frontend WS
  │
  └── Message FROM V8 backend TO frontend (push, no request):
      ├── V8 backend calls AndroidBridge.pushWsMessage(channel, JSON.stringify(data))
      ├── [Kotlin] @JavascriptInterface fun pushWsMessage(channel, json)
      │   └── Ktor finds all WS sessions subscribed to this channel
      │       └── Sends the message to each session
      └── Frontend receives push event and updates UI
```

Key differences from REST bridge:
- **No CompletableDeferred for push events** — V8 sends data actively, Ktor fans it out to WS sessions.
- **Session tracking** — Ktor tracks WS session subscriptions per channel so V8 can address the right sessions.
- **Multiple frontend tabs** — Each tab gets its own WS session. V8 backend is shared. Ktor deduplicates: if 2 tabs are on the same channel, the V8 backend only does the work once, Ktor fans out results.

### Sandbox Adapter Interface

```typescript
// packages/plugin-system/src/sandbox/interface.ts
interface SandboxAdapter {
  name: 'node-vm' | 'webview-v8' | 'web-worker'
  isAvailable(): boolean
  create(options: SandboxOptions): Promise<SandboxInstance>
}

interface SandboxInstance {
  load(pluginId: string, code: string): Promise<void>
  execute(method: string, args: unknown[]): Promise<unknown>
  destroy(): Promise<void>
}
```

### Platform Adapters

| Platform | Adapter | Details |
|----------|---------|---------|
| Desktop | Node.js `vm` module | Native, fast, well-tested. Warm pool reused per plugin. |
| Android | WebView V8 (hidden) | Zero native deps. V8 provides everything. Sandbox contexts recycled. |
| Web | Web Worker | One per active source. Browser-enforced isolation. |
| Test | Mock Sandbox | In-memory, no isolation. For unit tests. |

### Plugin Error Isolation

Each plugin runs in its own sandbox context (separate `vm.Script` context on desktop, separate `evaluateJavascript` call on Android, separate Worker on web). A plugin crash — unhandled exception, syntax error, or timeout — is caught by the sandbox adapter and returned as an error response (`{ error, code: "PLUGIN_ERROR", ... }`) WITHOUT affecting other plugins or the backend process.

| Scenario | Behavior |
|----------|----------|
| Plugin throws during `popular()` | Error returned to caller. Other plugins unaffected. |
| Plugin times out (>30s) | Sandbox context terminated. Plugin marked as degraded. |
| Plugin has syntax error on load | Plugin not registered. Error logged. Other plugins load normally. |
| Plugin throws in `initialize()` | Plugin registered but marked as **degraded** — frontend shows "Plugin error" badge. All method calls return `{ error, code: "PLUGIN_ERROR" }`. User can retry initialization from plugin manager. |
| Plugin does infinite loop | Sandbox timeout kills execution. Context recycled. |
| Plugin stores corrupted state | Per-plugin context is isolated — no shared state between plugins. |

On desktop, the `vm` module provides `vm.Script` per plugin — contexts share no objects. On Android, each backend request to the hidden WebView creates a new `evaluateJavascript` call; the backend bundle's plugin registry keeps in-memory state per plugin ID. On web, each plugin has its own Worker.

### V8 Sandbox Isolation (Android)

Unlike Node's `vm` module, WebView V8 has no built-in context isolation — everything `evaluateJavascript()`'d into the hidden WebView shares the same global scope. The `webview-v8.ts` adapter achieves isolation via:

1. **IIFE wrapping**: Plugin code is wrapped in an IIFE with explicitly passed sandbox globals:
   ```javascript
   (function(sandbox) {
     const fetch = sandbox.fetch;
     const parseHTML = sandbox.parseHTML;
     // plugin code here — cannot access `window.IReaderBackend`
     export default { ... };
   })(pluginSandboxes[pluginId])
   ```
2. **Frozen sandbox object**: Each plugin gets a `sandbox` object with frozen references to `fetch`, `parseHTML`, `console`, `setTimeout`. The object is `Object.freeze()`'d — plugin cannot replace or add properties.
3. **No module system leak**: The IIFE pattern means plugin variables are scoped to the function. The backend's global `IReaderBackend` is NOT in the sandbox object — plugins cannot access the database or other plugins' state.
4. **Per-plugin state isolation**: Plugin state (caches, rate-limit counters) is stored in `pluginSandboxes[pluginId]`, keyed by plugin ID. No two plugins share state objects.

### Sandbox API (Same on All Platforms)

```javascript
// Available globals inside the sandbox:
fetch(url, options)           // HTTP requests (custom per platform: Node vm unrestricted, V8 via JSInterface→OkHttp bypasses CORS, Web Worker native w/ CORS limits — on web, plugin fetch to non-CORS sites only works in cloud mode).
                              // Scope limited to plugin's info.baseUrl by default. User can add domains in plugin config.
parseHTML(html)               // Built-in DOM parser (Cheerio-like API)
console.log / warn / error    // Tagged with plugin ID
setTimeout / clearTimeout     // Max 30s
JSON, Math, Date, RegExp      // Full JS built-ins
```

### What Plugins CANNOT do (Same on All Platforms)

```
❌ require() / import         — handled by host loader
❌ process.env / process      — not in sandbox globals
❌ fs / child_process         — file system access denied
❌ eval() / Function()        — disabled in sandbox
❌ fetch() to non-http(s)     — only http/https
❌ Execution >30s             — timeout enforced by host
```

---

## 13. Cross-Platform Storage Strategy (Zero Duplication)

### SQLite Everywhere — One Abstraction, Multiple Drivers

All platforms use the SAME TypeScript storage code. Only the SQLite driver changes.

```typescript
// packages/storage/src/drivers/interface.ts
interface SQLiteDriver {
  query<T>(sql: string, params?: unknown[]): Promise<T[]>
  queryOne<T>(sql: string, params?: unknown[]): Promise<T | null>
  execute(sql: string, params?: unknown[]): Promise<QueryResult>
  transaction<T>(fn: () => Promise<T>): Promise<T>
  close(): Promise<void>
}
```

> **sql.js concurrency guard**: sql.js is an in-memory WASM database — it has NO built-in concurrency control. On Android/Web (where sql.js runs), the `SqlJsDriver` wraps all write operations in a **mutex** (`async-mutex` or a simple promise chain). Reads bypass the mutex (safe since they operate on the same in-memory state without side effects). The mutex serializes all writes across concurrent API handlers. Desktop (bun:sqlite / better-sqlite3) has native concurrency via file-level locking and does NOT use the mutex.

| Platform | Driver | How It Works |
|----------|--------|-------------|
| Desktop (Bun) | `bun:sqlite` | Native C binding, fastest |
| Desktop (Node) | `better-sqlite3` | Native C binding, stable |
| Android (V8) | `sql.js` WASM | SQLite compiled to WebAssembly, runs in WebView V8 |
| Web (PWA) | `sql.js` WASM | Same WASM, same code, in Web Worker |
| Tests | `sql.js` :memory: | Fast, isolated, no file I/O |

```typescript
// packages/storage/src/index.ts
import { SqlJsDriver } from './drivers/sqljs'
import { BunDriver } from './drivers/bun'
import type { SQLiteDriver } from './drivers/interface'

// Platform auto-detection — same code everywhere
export async function createDatabase(path: string): Promise<SQLiteDriver> {
  if (typeof Bun !== 'undefined') return await BunDriver.create(path)
  if (typeof process !== 'undefined' && process.versions?.node) {
    const { BetterSqlite3Driver } = await import('./drivers/better-sqlite3')
    return await BetterSqlite3Driver.create(path)
  }
  // Fallback: sql.js WASM (Android V8, Web Worker, any JS runtime)
  return await SqlJsDriver.create(path)
}

// All repository code uses SQLiteDriver interface — never touches bun:sqlite or sql.js directly
export { LibraryRepository } from './repositories/library'
export { HistoryRepository } from './repositories/history'
export { SettingsRepository } from './repositories/settings'
// etc.
```

### How sql.js Persistence Works in WebView V8 (Android)

WebView V8 has no filesystem API. The sql.js driver uses JavaScriptInterface for file I/O:

```
[Backend JS in V8]              [Kotlin via JavaScriptInterface]     [Android Storage]
       │                                   │                              │
       ├── SqlJsDriver.create(path)        │                              │
       │   └── AndroidBridge.readDb()──────→ read file from disk ────────→ bytes
       │   ←─────────── Uint8Array ────────                              │
       │   └── new SQL.Database(bytes)     │                              │
       │                                   │                              │
       ├── db.run("INSERT INTO ...")       │                              │
       │   (in-memory, no disk write yet)  │                              │
       │                                   │                              │
       ├── After 500ms debounce:           │                              │
       │   └── AndroidBridge.saveDb()──────→ write bytes to disk ────────→ done
       │   ←─────────── ok ────────────────                              │
       │                                   │                              │
       └── On app close:                   │                              │
           └── AndroidBridge.saveDb()──────→ final write ────────────────→ done
```

The `SQLiteDriver` interface abstracts this — the repository code never knows it's running over a bridge. On desktop (Bun/Node), the sql.js driver reads/writes files directly with `fs.readFileSync`/`fs.writeFileSync`.

### Why This Works

- `sql.js` is SQLite compiled to WebAssembly — it runs in ANY JavaScript engine (V8, JSC, SpiderMonkey, Bun's JSC)
- The storage API is identical: `db.query("SELECT * FROM library")`
- Repository implementations (`LibraryRepository`, `HistoryRepository`, etc.) never change per platform
- **One codebase. One test suite. One type system.**

### Schema Migrations

```
packages/storage/src/schema/
├── _001_initial.sql        # Library, history, settings tables
├── _002_downloads.sql      # Download jobs table
├── _003_glossary.sql       # Glossary + character tables
├── _004_bookmarks.sql      # Bookmarks + notes tables
├── _005_characters.sql     # Character DB table
└── migrate.ts              # Migration runner (checks current version)
```

**Initial schema (`_001_initial.sql`)**: Defined here to prevent ad-hoc table design during implementation.

```sql
CREATE TABLE IF NOT EXISTS library (
  id TEXT PRIMARY KEY,          -- source-scoped: "sourceId/mangaId"
  source_id TEXT NOT NULL,
  manga_id TEXT NOT NULL,
  title TEXT NOT NULL,
  cover_url TEXT,
  author TEXT,
  status TEXT,                  -- ongoing, completed, hiatus, cancelled
  rating REAL,
  genres TEXT,                  -- JSON array
  description TEXT,
  last_read_at TEXT,            -- ISO 8601
  chapters_read INTEGER DEFAULT 0,
  total_chapters INTEGER,
  score INTEGER,               -- user rating 0-10
  date_added TEXT NOT NULL,     -- ISO 8601
  date_updated TEXT,            -- ISO 8601
  category_ids TEXT,            -- JSON array of category IDs
  UNIQUE(source_id, manga_id)
);

CREATE TABLE IF NOT EXISTS categories (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  sort_order INTEGER DEFAULT 0,
  color TEXT
);

CREATE TABLE IF NOT EXISTS history (
  id TEXT PRIMARY KEY,
  manga_id TEXT NOT NULL,       -- source-scoped
  source_id TEXT NOT NULL,
  chapter_id TEXT NOT NULL,
  chapter_number REAL NOT NULL,
  chapter_title TEXT,
  page INTEGER DEFAULT 0,       -- last page read
  scroll_position REAL DEFAULT 0,
  read_at TEXT NOT NULL,        -- ISO 8601
  UNIQUE(source_id, manga_id, chapter_id)
);

CREATE TABLE IF NOT EXISTS settings (
  key TEXT PRIMARY KEY,
  value TEXT NOT NULL            -- JSON-encoded value
);

CREATE TABLE IF NOT EXISTS sources (
  id TEXT PRIMARY KEY,
  enabled INTEGER DEFAULT 1,
  config TEXT,                   -- JSON: per-source rate limits, headers, etc.
  install_method TEXT,           -- "bundled", "url", "manual"
  install_url TEXT,
  version TEXT
);

CREATE TABLE IF NOT EXISTS plugins (
  id TEXT PRIMARY KEY,
  type TEXT NOT NULL DEFAULT 'source', -- source, theme, ai, sync, image
  name TEXT NOT NULL,
  version TEXT,
  code TEXT,                     -- JS source (for web PWA where no filesystem)
  enabled INTEGER DEFAULT 1,
  installed_at TEXT NOT NULL
);
```

> **Migration rules**: Each migration runs in a SQL transaction. If it fails, the transaction rolls back and the app reports the error without starting (data integrity > availability). Migrations are never reverted — downgrades require a backup restore. The runner stores the current version in SQLite user_version pragma.

### Backup Format

```
backup-2026-07-09.zip
├── metadata.json           # { version, createdAt, appVersion }
├── library.json            # Full library entries
├── history.json            # Full reading history
├── settings.json           # All settings
├── bookmarks.json          # Bookmarks
├── glossary.json           # Translation glossary
├── covers/                 # Cached cover images (optional)
│   ├── source1_manga1.webp
│   └── source2_manga2.webp
└── plugins/                # Source plugin files (optional)
    ├── manganato/source.js
    └── mangadex/source.js
```

---

## 14. Build Pipeline & Environment Matrix

### Environments

| Env | Frontend | Backend | Database | Plugins |
|-----|----------|---------|----------|---------|
| **dev** | Vite HMR (5173) | Hono watch (8080) | SQLite file | ./plugins/ hot-reload |
| **test** | Vite build | Hono test mode | :memory: | Mock plugins |
| **e2e** | Vite preview | Hono serve | SQLite test | ./plugins/ |
| **prod (desktop)** | Static build | Bun serve | SQLite file (`~/.ireader/data.db`) | `~/.ireader/plugins/` |
| **prod (android)** | Static in assets | Ktor serve | sql.js WASM (app-private DB) | `getExternalFilesDir("plugins")` |
| **prod (web)** | Static on CDN | Cloud server (or none in PWA-only mode) | sql.js WASM (Worker) or server-side | Web Worker |

### Build Commands

```bash
# Development
pnpm dev              # Frontend + Backend concurrently. **Startup ordering**: backend starts first on :8080; waits for health `GET /api/v1/system/health` to return 200 before launching Vite dev server on :5173. Vite proxy (`/api` → `:8080`) is configured but inactive until Vite starts — frontend never sends API calls to a cold backend.
pnpm dev:frontend     # Frontend only
pnpm dev:backend      # Backend only

# Testing
pnpm test             # Vitest (unit + integration)
pnpm test:watch       # Watch mode
pnpm test:e2e         # Playwright
pnpm test:e2e:ui      # Playwright UI mode
pnpm test:ci          # All tests headless

# Production
pnpm build            # Frontend → dist/ + Backend CJS → dist/ (desktop)
pnpm build:android    # Build IIFE bundle for V8 + copy assets + Gradle assembleDebug (Phase 6+)
pnpm build:desktop    # Tauri build (Phase 7+)
pnpm build:web        # Frontend dist + Backend ESM Worker bundle + copy sql-wasm.wasm to dist/

# Lint + Typecheck
pnpm lint             # ESLint
pnpm typecheck        # tsc --noEmit
pnpm format           # Prettier
```

### Build Target Matrix

The same TypeScript backend compiles to TWO bundle formats:

| Target | Format | Entry | Used By |
|--------|--------|-------|---------|
| **Desktop** | `esbuild --format=cjs --platform=node` | `packages/backend/src/entry.ts` | Bun/Node — native require/import |
| **Android V8** | `esbuild --format=iife --global-name=IReaderBackend` | `packages/backend/src/entry.ts` | Hidden WebView — no module system, everything in global scope |
| **Web Worker** | `esbuild --format=esm --platform=browser` | `packages/backend/src/worker-entry.ts` | PWA-only mode — Web Worker, ESM imports, `importScripts` for sql.js |

Both targets include all dependencies (Hono, sql.js, plugin system) in a single `.js` bundle. The IIFE bundle for Android additionally inlines a module-loader shim so `import`/`export` statements compiled by TypeScript resolve correctly in the global scope.

`pnpm build` outputs both formats: `packages/backend/dist/bundle.cjs` (desktop, CJS) and `packages/backend/dist/backend.bundle.js` (Android, IIFE). The `build:android` command uses the IIFE bundle; `build:desktop` uses the CJS bundle.

### CI Pipeline (GitHub Actions)

```yaml
# .github/workflows/ci.yml
jobs:
  test:
    - pnpm install
    - pnpm lint
    - pnpm typecheck
    - pnpm test:ci
    - pnpm build
    - pnpm test:e2e:ci   # Requires built frontend + running backend

  build-android:         # Phase 6+
    - ./gradlew assembleDebug
    - upload APK as artifact
```

---

## 15. Plugin SDK & Developer Tooling

### SDK Package for Plugin Developers

```bash
npx @ireader/create-plugin my-source
# Scaffolds: plugins/my-source/source.js + source.json + README.md
```

### Plugin Testing CLI

```bash
# Test a source plugin without running the full app
npx @ireader/test-plugin plugins/my-source/source.js \
  --method popular --args '{"page": 1}'

# Output:
# ✓ plugin loads successfully
# ✓ info matches schema
# ✓ popular returns MangaSummary[]
#   - 20 items, all have id + title + coverUrl
#   - avg response time: 340ms
```

### Plugin Validator

```typescript
// packages/plugin-system/src/validator.ts
export function validatePlugin(plugin: unknown): ValidationResult {
  const errors: string[] = []
  // shape check
  if (!plugin || typeof plugin !== 'object') errors.push('Plugin must be an object')
  if (!('info' in plugin)) errors.push('Missing required field: info')
  if (!('popular' in plugin)) errors.push('Missing required method: popular')
  // info validation
  const info = (plugin as any).info
  if (!info.id || typeof info.id !== 'string') errors.push('info.id must be a string')
  if (!info.name || typeof info.name !== 'string') errors.push('info.name must be a string')
  // ...
  return { valid: errors.length === 0, errors }
}
```

### VS Code Extension

Could build a VS Code extension for plugin development:
- Syntax highlighting for `source.js` template methods
- Auto-complete for plugin API
- One-click test in browser
- Error highlighting for schema violations

---

## 16. IReader Extension Migration Strategy

### Why Migrate

IReader extensions are Kotlin source files compiled with KSP. They CANNOT run directly.
But we can offer a migration tool that converts them to `.js` plugins.

### Migration Tool: `@ireader/migrate-from-ireader`

```bash
npx @ireader/migrate-from-ireader \
  --input ../IReader-extensions/extensions/en/manganato/ \
  --output plugins/manganato/
```

### What the migrator does

1. Parse the Kotlin source:
   - Extract `baseUrl`, `name`, `lang` from `@Extension` annotation
   - Extract CSS selectors from source code
   - Extract HTTP request patterns
   - Extract parsing logic

2. Generate equivalent `.js` plugin:
   - Maps Kotlin `fetch` → sandbox `fetch()`
   - Maps Ksoup/JSoup selectors → `parseHTML()`
   - Maps Kotlin data classes → JS objects
   - Preserves request headers, cookies, rate limiting

3. Test the migration:
   - Run both plugins against the same website
   - Compare outputs for structural equivalence
   - Flag mismatches for manual review

### Migration Coverage

| IReader Pattern | Migration Target | Expected Automation |
|---|---|---|
| Ktor `GET` requests | `fetch(url)` | 100% automatic |
| Ksoup `.select("css")` | `parseHTML(html)('css')` | 100% automatic |
| `@Extension(baseUrl)` | `source.json` manifest | 100% automatic |
| `@AutoSourceId` | `info.id` | 100% automatic |
| `popularManga(page)` | `popular(page)` | 90% automatic |
| `search(query, page)` | `search(query, page)` | 90% automatic |
| `mangaDetail(id)` | `mangaDetail(id)` | 80% automatic |
| `chapterPages(chapter)` | `pages(chapterId)` | 80% automatic |
| Custom pagination | Custom `page` handling | 60% automatic |
| Cloudflare bypass | Built-in cookie replay | Manual setup |
| Source config/settings | `source.json` config | Manual setup |

### Manual Migration Guidelines

For sources that can't be fully auto-migrated:

1. Run the migration tool → get a `.js` scaffold
2. Test with `curl localhost:8080/api/v1/sources/{id}/popular`
3. Compare JSON output to IReader's expected output
4. Fix selectors in `parseHTML()` calls
5. Fix pagination if needed
6. Add cookie/header handling if needed
7. Run E2E test suite

---

## 17. Development-to-Deployment Pipeline

### Desktop/Web Dev (Phases 0-5)

```
Developer laptop
    │
    └── pnpm dev
        ├── Frontend (Vite, localhost:5173, HMR)
        │   └── Edit React component → instant browser update
        ├── Backend (Hono, localhost:8080, watch)
        │   └── Edit .ts file → auto-restart
        └── Plugins (./plugins/, watched)
            └── Edit source.js → auto-reload plugin in sandbox
                └── curl localhost:8080/api/v1/sources/... → test immediately
```

### Testing Pipeline

```
Developer writes code
    │
    ├── pnpm test        → Vitest (unit + integration)    → < 5 seconds
    ├── pnpm test:e2e    → Playwright (browser E2E)       → < 30 seconds
    └── pnpm typecheck   → TypeScript strict              → < 10 seconds
```

### Android Deployment (Phase 6+)

```
1. Build the backend as IIFE bundle (for V8, no module system):
   esbuild --format=iife --global-name=IReaderBackend \
     packages/backend/src/entry.ts \
     --outfile=packages/backend/dist/backend.bundle.js
   (Desktop CJS build is separate: pnpm build)

2. Build the frontend:
   pnpm build:frontend
   → packages/frontend/dist/          (static HTML/CSS/JS)

3. Copy to Android assets:
   cp -r packages/frontend/dist/*       apps/android/app/src/main/assets/web/
   cp packages/backend/dist/backend.bundle.js apps/android/app/src/main/assets/backend/
   cp node_modules/sql.js/dist/sql-wasm.wasm  apps/android/app/src/main/assets/backend/

4. Build the APK:
   ./gradlew assembleDebug
   → APK contains:
      • Frontend static files (served by Ktor)
      • backend.bundle.js (loaded into hidden WebView V8)
      • sql-wasm.wasm (SQLite engine for the JS backend)
      • ~200 lines of Kotlin (Ktor server + native bridge)
      • Empty plugins/ directory (app-private)

4. Install:
   adb install app-debug.apk

5. First launch:
   • Ktor starts on localhost:8080
   • Hidden WebView loads backend.bundle.js + sql-wasm.wasm → BackendEngine ready
   • Main WebView opens → loads http://localhost:8080 from Ktor
   • BackendEngine handles /api/v1/* routes → serves JSON
   • PluginObserver watches app-private plugins/ directory
   • User drops .js plugins via app's plugin manager UI
```

> Note: The hidden WebView loads `about:blank`, makes itself 1×1 pixel, disables rendering. It's purely a V8 JS runtime with WebAssembly, JavaScriptInterface bridge, and a custom `fetch()` polyfill (native V8 `fetch()` from `about:blank` is CORS-blocked for manga sites, so plugin fetch goes through JavaScriptInterface → OkHttp).

### Desktop Deployment (Phase 7+)

```
1. pnpm build
2. cd apps/desktop && cargo tauri build
   → .AppImage (Linux), .dmg (macOS), .msi (Windows)
   → Bundled: frontend + backend (Bun single-file binary)
   → Backend auto-starts on launch, frontend opens in native window
```

### Web Deployment

```
1. pnpm build:web
   → packages/frontend/dist/          (static HTML/CSS/JS)
   → packages/frontend/dist/worker.js (backend ESM Worker bundle)
   → packages/frontend/dist/sql-wasm.wasm (SQLite engine for Worker)
2. Upload packages/frontend/dist/ to CDN or static host
3. Deploy backend to cloud server OR use PWA-only mode (backend runs in Worker, storage in sql.js WASM)
   → PWA only: reduced features — no image proxy, no TTS Gradio, no cloud sync. **Plugin fetch limited to CORS-enabled APIs** — real source plugins (Manganato, Mangadex, etc.) won't work from browser Worker because those sites don't serve CORS headers. PWA-only is suitable for local/offline content only.
```

### Update Strategy

```
Android:
  • APK updates via GitHub Releases
  • Plugin updates via in-app plugin manager (downloads from URL)
  • Auto-backup before major updates

Desktop:
  • Tauri auto-updater (checks GitHub Releases)
  • Plugins updated via in-app manager

Web:
  • Always latest (CDN cache-bust)
  • PWA service worker checks for updates on each launch
```

---

*End of PLAN.md — drives all implementation work.*
