# IReader-Next — Project Memory

## Project Identity
Web-native manga/novel reader — alternative to IReader/Tachiyomi.
Core innovation: zero-compile JS source plugins loaded at runtime into a sandboxed JS VM.

## Architecture (One TypeScript Codebase)

```
packages/core/        → Entities, interfaces, use cases. ZERO deps.
packages/storage/     → SQLite via sql.js WASM everywhere. Desktop: bun:sqlite opt.
packages/backend/     → Hono server. Runs on Bun (desktop), WebView V8 (Android), Worker (web).
packages/plugin-system/ → Sandbox adapters: Node vm, WebView V8, Web Worker.
packages/frontend/    → React + Vite + shadcn/ui + Zustand.
apps/android/         → ~200 lines Kotlin (Ktor static serve + native bridge). ZERO business logic.
apps/desktop/         → Tauri shell.
```

### Key Decisions
- **Backend in TypeScript** = ONE codebase, compiled to `.js`, runs everywhere
- **Android JS runtime** = hidden WebView V8 (not QuickJS) — native fetch() bridge via JavaScriptInterface, no JNI
- **Storage** = sql.js WASM primary, bun:sqlite native opt on desktop. File I/O in V8 via JSInterface bridge.
- **Plugin sandbox** = custom fetch() polyfill (not V8 native fetch) to bypass CORS from about:blank
- **State** = Zustand auto-persists via HTTP POST to localhost:8080 → sql.js
- **Frontend → Backend** = REST + WebSocket at localhost:8080/api/v1
- **AI Debugging** = curl localhost:8080/api/v1/...
- **E2E** = Playwright against localhost, same tests for all platforms

### Critical Patterns
- Plugin storage on Android: app-private dir (`/data/data/com.ireader.next/files/plugins/`), NOT `/sdcard/`. Avoids scoped storage issues on Android 11+.
- Plugin fetch() on Android: JavaScriptInterface → OkHttp. WebView native fetch() from about:blank is CORS-blocked for manga sites.
- sql.js persistence in V8: JSInterface bridge for file read/write. The SqlJsDriver calls `AndroidBridge.readDb()` / `AndroidBridge.saveDb()`.
- Image proxy: ALL manga images go through `GET /api/v1/proxy/image?url=...` — avoids CORS, enables LRU cache + WebP conversion.

## Session History

### Session 1 (2026-07-09)
- Designed full architecture from IReader pain points analysis.
- Created PLAN.md (17 sections), AGENTS.md (9 architecture laws), 3 reusable skills, 2 rule files.
- Fixed critical architecture flaw: eliminated dual-backend duplication (Ktor went from 2000 lines to ~200).
- Replaced QuickJS with WebView V8 (avoided months of C/JNI bridge work).
- Unified storage with sql.js WASM across all platforms.
- Doubled timeline from 8 to 16 weeks.

### Session 2 (2026-07-09) — Deep Review
- Full PLAN.md audit found and fixed **13 issues**:

| # | Issue | Severity | Fix |
|---|---|---|---|
| 1 | Plugin storage path: `/sdcard/` used in diagram contradicts app-private rule | CRITICAL | Changed all paths to `app-private plugins dir` |
| 2 | Native V8 fetch() from `about:blank` CORS-blocked for manga sites | CRITICAL | Sandbox now injects custom fetch() via JavaScriptInterface → OkHttp |
| 3 | sql.js file persistence in V8 not documented | CRITICAL | Added persistence diagram: bridge → file read/write with debounce |
| 4 | Image proxy endpoint missing from API contract | CRITICAL | Added `GET /proxy/image` to API contract |
| 5 | "Android SQLite" in environment matrix contradicts sql.js everywhere | CRITICAL | Changed to `sql.js WASM` |
| 6 | "QuickJS" in Performance table (stale tech reference) | HIGH | Changed to `V8/Node vm` |
| 7 | Timeline header said "12 Weeks" (stale) | HIGH | Changed to `16 Weeks` |
| 8 | Missing API endpoints: tracking, bookmarks, notes, character DB | HIGH | Added to API contract |
| 9 | AGENTS.md still referenced "QuickJS VM" | LOW | Updated to "WebView V8" |
| 10 | Sandbox scoped in both Phase 0 and Phase 1 | MEDIUM | Phase 0: mock only. Phase 1: real adapters. |
| 11 | Plugin dev workflow adb path used /sdcard/ | HIGH | Fixed to app-private dir |

## Next Steps
1. Begin **Phase 0 — Foundation**: monorepo scaffold, core entities, storage driver, Hono stub, frontend shell, sandbox interface, Playwright setup, `pnpm dev` loop.
2. Run `memanto memory sync` after each session to persist cross-session context.
