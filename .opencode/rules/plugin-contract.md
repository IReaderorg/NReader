# Plugin Contract Rules — IReader-Next

## Source Plugin API (v1)

Every source plugin MUST export a default object with this exact shape:

```typescript
interface SourcePlugin {
  info: SourceInfo
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

## Data Shape Contracts

```typescript
interface MangaSummary {
  id: string           // REQUIRED — unique within source
  title: string        // REQUIRED
  coverUrl: string     // REQUIRED — absolute URL
  author?: string
  rating?: number
}

interface MangaDetail extends MangaSummary {
  description: string  // REQUIRED
  genres: string[]     // REQUIRED — at least empty array
  status: 'ongoing' | 'completed' | 'hiatus' | 'cancelled' | 'unknown'
  chapters: Chapter[]  // REQUIRED — at least empty array
}

interface Chapter {
  id: string           // REQUIRED
  number: number       // REQUIRED
  title: string        // REQUIRED
  date?: string        // ISO 8601 string
  scanlator?: string
}

interface Page {
  index: number        // REQUIRED — 0-based
  url: string          // REQUIRED — absolute image URL
  text?: string        // For novel sources
}
```

## Sandbox Rules

- Sandbox provides: `fetch(url)`, `parseHTML(html)`, `console.log`
- Sandbox denies: `require`, `import`, `process`, `fs`, `child_process`, `eval`, `Function`
- All methods must be async (or return Promise)
- Timeout: 30 seconds per method call
- Memory limit: 64MB per sandbox instance
- Domain allowlist: configured in source manifest (`permissions: ["network"]`)
- Implementation: Node.js `vm` (desktop), hidden WebView V8 (Android), Web Worker (web) — same sandbox API everywhere

## Error Handling

- Plugin methods MUST NOT throw for expected states (empty results → return `[]`)
- Plugin methods SHOULD throw for unexpected failures (network error, parse failure)
- Return values MUST match the contract exactly — no extra fields, no missing required fields
- URLs MUST be absolute (prepend `baseUrl` if relative)
- Filter out entries that are missing required fields (id, title)
