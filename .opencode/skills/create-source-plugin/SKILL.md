# Skill: Create a Source Plugin (.js)

Use this skill when the user asks to add a new content source (manga/novel website) for IReader-Next.

## Steps

### 1. Test the website

```bash
# Check the site is accessible
curl -sI "https://target-site.com" | head -5

# Check popular page structure
curl -s "https://target-site.com/popular" | head -100 > /tmp/site-test.html

# Check search
curl -s "https://target-site.com/search?q=naruto" > /tmp/site-search.html

# Check a chapter page
curl -s "https://target-site.com/manga/xxx/chapter/1" > /tmp/site-chapter.html
```

### 2. Identify selectors from actual HTML

Read the test files with `Read` tool, identify CSS selectors for:
- Manga card (title link, cover image, optional: rating, chapter count)
- Manga detail (title, cover, author, description, genres, status, chapter list)
- Chapter page images (image elements and their URL pattern)
- Search results (same structure as popular)

### 3. Create the plugin directory and files

```
plugins/{source-id}/
├── source.js      # Plugin code
└── source.json    # Manifest
```

### 4. Write source.json

```json
{
  "id": "source-id",
  "name": "Source Display Name",
  "type": "source",
  "version": "1.0.0",
  "lang": "en",
  "baseUrl": "https://target-site.com",
  "author": "",
  "capabilities": ["popular", "search", "latest", "mangaDetail", "chapters", "pages"],
  "permissions": ["network"]
}
```

### 5. Write source.js — Template

```javascript
export default {
  info: {
    id: "source-id",
    name: "Source Display Name",
    lang: "en",
    baseUrl: "https://target-site.com",
    version: "1.0.0",
    capabilities: ["popular", "search", "latest", "mangaDetail", "chapters", "pages"]
  },

  async popular(page) {
    const html = await fetch(`${this.info.baseUrl}/popular?page=${page}`)
    return this.parseCards(html)
  },

  async search(query, page) {
    const html = await fetch(
      `${this.info.baseUrl}/search?q=${encodeURIComponent(query)}&page=${page}`
    )
    return this.parseCards(html)
  },

  async latest(page) {
    const html = await fetch(`${this.info.baseUrl}/latest?page=${page}`)
    return this.parseCards(html)
  },

  async mangaDetail(id) {
    const html = await fetch(`${this.info.baseUrl}/manga/${id}`)
    const $ = this.parseHTML(html)
    return {
      id,
      title: $('h1.title').text().trim(),
      coverUrl: $('.cover img').attr('src') || '',
      author: $('.author').text().replace('Author:', '').trim(),
      description: $('.description').text().trim(),
      genres: $('.genres a, .genres span').map(el => el.text().trim()),
      status: $('.status').text().trim(),
      chapters: $('.chapter-list a, .chapter-item').map((el, i) => ({
        id: el.attr('href')?.split('/').pop() || `ch-${i}`,
        number: i + 1,
        title: el.text().trim(),
      })),
    }
  },

  async chapters(mangaId) {
    const detail = await this.mangaDetail(mangaId)
    return detail.chapters
  },

  async pages(chapterId) {
    const html = await fetch(`${this.info.baseUrl}/chapter/${chapterId}`)
    return this.parseHTML(html)('img.page-image, .chapter-content img')
      .map((img, i) => ({
        index: i,
        url: img.attr('src') || img.attr('data-src') || '',
      }))
      .filter(p => p.url)
  },

  // ---- Helper methods (overridable by sandbox) ----

  parseCards(html) {
    const $ = this.parseHTML(html)
    return $('.manga-card, .story-item, .novel-item').map(el => ({
      id: el.find('a').attr('href')?.split('/').pop() || '',
      title: el.find('.title, h3, a').first().text().trim(),
      coverUrl: el.find('img').attr('src') || el.find('img').attr('data-src') || '',
      author: el.find('.author').text().trim(),
      rating: parseFloat(el.find('.rating').text()) || undefined,
    })).filter(m => m.id && m.title)
  },

    parseHTML(html) {
    // Provided by sandbox — returns cheerio-like `$` function
    // Available on all platforms (Node vm, WebView V8, Web Worker)
    return this.__parseHTML ? this.__parseHTML(html) : fallbackParser(html)
  },
}

### 6. Validate the plugin

```bash
# Test popular page
curl "http://localhost:8080/api/v1/sources/source-id/popular?page=1" | jq

# Test search
curl "http://localhost:8080/api/v1/sources/source-id/search?q=test" | jq

# Test detail
curl "http://localhost:8080/api/v1/sources/source-id/detail/manga-id" | jq
```

### 7. Write E2E test

Create `e2e/tests/sources/source-id.spec.ts`:

```typescript
import { test, expect } from '@playwright/test'

const SOURCE_ID = 'source-id'

test('popular returns manga cards', async ({ request }) => {
  const res = await request.get(
    `http://localhost:8080/api/v1/sources/${SOURCE_ID}/popular?page=1`
  )
  expect(res.ok()).toBeTruthy()
  const data = await res.json()
  expect(Array.isArray(data)).toBe(true)
  if (data.length > 0) {
    expect(data[0]).toHaveProperty('id')
    expect(data[0]).toHaveProperty('title')
    expect(data[0]).toHaveProperty('coverUrl')
  }
})

test('search returns results', async ({ request }) => {
  const res = await request.get(
    `http://localhost:8080/api/v1/sources/${SOURCE_ID}/search?q=naruto&page=1`
  )
  expect(res.ok()).toBeTruthy()
  const data = await res.json()
  expect(Array.isArray(data)).toBe(true)
})

test('manga detail has chapters', async ({ request }) => {
  // Get first result from popular
  const popular = await (await request.get(
    `http://localhost:8080/api/v1/sources/${SOURCE_ID}/popular?page=1`
  )).json()
  if (popular.length === 0) return  // skip if no results

  const res = await request.get(
    `http://localhost:8080/api/v1/sources/${SOURCE_ID}/detail/${popular[0].id}`
  )
  expect(res.ok()).toBeTruthy()
  const detail = await res.json()
  expect(detail).toHaveProperty('title')
  expect(detail).toHaveProperty('chapters')
  expect(Array.isArray(detail.chapters)).toBe(true)
})
```

### 8. Verify test passes

```bash
pnpm test:e2e -- -g "source-id"
```

## Rules

- NEVER wrap `fetch()` — use the sandbox-provided `fetch` directly
- NEVER use `require()` or `import` — the sandbox provides all needed APIs
- ALL selectors must be verified against actual website HTML — NEVER guess them
- Use `attr('data-src')` as fallback for lazy-loaded images
- Filter out empty results (no id, no title, no url)
- Handle both relative and absolute URLs — prepend `baseUrl` if relative
