# Architecture Rules — IReader-Next (Zero Duplication)

## Golden Rule

**TypeScript is the ONLY language for business logic. Kotlin is ONLY for native Android APIs.**

- `apps/android/` contains ~200 lines of Kotlin — Ktor static file server + native bridge ONLY
- `packages/*` is ALL TypeScript — storage, API routes, plugin system, frontend, readers, TTS, translation
- ZERO Kotlin code touches SQLite, ZERO Kotlin code handles API routes, ZERO Kotlin code runs plugins

## Layer Enforcement

```
apps/android/ (~200 lines Kotlin — native bridge ONLY)
apps/desktop/ (Tauri Rust shell)
apps/web/ (PWA entry)
    │
    └── all business logic flows through TypeScript:
            ┌─────────────────────────────────┐
            │  packages/frontend (React SPA)   │
            │       │ REST + WebSocket         │
            │       ▼                          │
            │  packages/backend (Hono server)  │
            │       │ depends on               │
            │       ▼                          │
            │  packages/plugin-system          │
            │  + packages/storage (sql.js)     │
            │       │ depends on               │
            │       ▼                          │
            │  packages/core (ZERO deps)       │
            └─────────────────────────────────┘
```

## Import Rules

- `@ireader/core` → NO imports from any other package
- `@ireader/storage` → may import `@ireader/core`
- `@ireader/plugin-system` → may import `@ireader/core`
- `@ireader/backend` → may import `@ireader/core`, `@ireader/plugin-system`, `@ireader/storage`
- `@ireader/frontend` → may import `@ireader/core` ONLY. NEVER import backend directly (use REST API)
- `@ireader/reader-engine` → may import `@ireader/core`
- `@ireader/tts-engine` → may import `@ireader/core`
- `@ireader/translation-engine` → may import `@ireader/core`
- `apps/*` → may import any package (but apps/android/ is Kotlin — no TypeScript imports)

## File Naming

- Entities: PascalCase, singular: `Manga.ts`, `Chapter.ts`
- Repositories: `{Entity}Repository.ts`
- Use cases: `{Action}{Target}UseCase.ts`
- Stores: `{domain}-store.ts` (kebab-case)
- React components: PascalCase, matching export: `MangaCard.tsx`
- Pages: `{Name}Page.tsx` with named export `{Name}Page`
- API routes: `{resource}.ts`, export `{resource}Router`

## State Flow

```
User Action → Component → Store Action → API Call → Backend → Plugin/DB → Response → Store Update → Re-render
```

- Components NEVER call API directly. Always through store actions.
- Stores NEVER import React. Pure Zustand.
- Store persistence: Zustand persist middleware → SQLite. NOT localStorage.
- Reader position saved: every 5 seconds when reading, immediately on close.
