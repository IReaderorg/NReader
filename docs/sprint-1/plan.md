# Sprint 1: Core Reading Customization

**Goal:** Make NReader's text reader as customizable as IReader's — themes, fonts, layout, auto-scroll, content filter.

**Scope:** All changes are in `packages/frontend/src/pages/` + `packages/backend/` + `packages/frontend/src/store/`

**Assignee:** Milo (design system + components), Nova (frontend pages + stores), Sage (backend API + data models)

---

## Tasks

| Task | Assignee | Est. | Dependencies |
|------|----------|------|--------------|
| 1.1 Reader themes API + DB model | Sage | 1 session | None |
| 1.2 Reader themes UI (light, sepia, dark, custom) | Nova | 1 session | 1.1 |
| 1.3 Custom fonts upload + API | Sage | 1 session | None |
| 1.4 Custom fonts UI + FontFace loading | Nova + Milo | 1 session | 1.3 |
| 1.5 Line height + paragraph spacing + indent controls | Nova | 0.5 session | 1.2 |
| 1.6 Text alignment selector | Nova | 0.5 session | 1.2 |
| 1.7 Auto-scroll with speed slider | Nova | 1 session | 1.2 |
| 1.8 Brightness overlay in reader | Nova | 0.5 session | 1.2 |
| 1.9 Content filter (regex strip) | Sage + Nova | 1 session | None |
| 1.10 E2E tests for Phase 1 | Sage | 1 session | 1.1-1.9 |

---

## Detailed Specs

### 1.1 Reader Themes API

```
GET  /api/v1/reader/themes          → list all themes
POST /api/v1/reader/themes          → create custom theme
PUT  /api/v1/reader/themes/:id       → update theme
DELETE /api/v1/reader/themes/:id     → delete theme
GET  /api/v1/reader/themes/defaults  → get built-in presets
```

Theme model:
```typescript
interface ReaderTheme {
  id: string
  name: string
  isBuiltin: boolean
  colors: {
    background: string    // #hex
    text: string
    link: string
    highlight: string
    header: string
    separator: string
  }
}
```

Built-in presets: **Light** (white bg, dark text), **Sepia** (#f4e8c1 bg, #5b4636 text), **Dark** (#1a1a2e bg, #e0e0e0 text), **Night** (#000000 bg, #666666 text), **OLED** (#000000 bg, #ffffff text).

### 1.2 Reader Themes UI

- Settings page: `/settings/appearance` — new route
- Theme cards with preview (mini text sample in each theme color)
- "Add custom theme" button → color pickers for each field
- Active theme applied to reader immediately via CSS custom properties
- Reader overlay: tap center → top toolbar with theme quick-switcher

### 1.3 Custom Fonts API

```
POST /api/v1/fonts/upload     → upload .ttf/.otf (multipart, stored in ./data/fonts/)
GET  /api/v1/fonts            → list installed fonts
DELETE /api/v1/fonts/:id      → delete font
```

### 1.4 Custom Fonts UI

- Settings page: font selector showing system fonts + custom fonts
- "Add font" button → file picker (.ttf/.otf)
- Font preview: "The quick brown fox jumps over the lazy dog" in selected font
- Uses CSS `@font-face` with `url(/api/v1/fonts/:id/raw)` for custom fonts
- Selected font saved to reader-store, applied via CSS custom property

### 1.5-1.6 Text Layout

Controls in reader settings overlay (tap center → gear icon):
- **Line height**: slider 1.0–2.5 (default: 1.6 for novels)
- **Paragraph spacing**: slider 0–40px (default: 16px)
- **Paragraph indent**: toggle + slider 0–40px (default: 24px)
- **Text alignment**: icon buttons for left/center/right/justify
- All values saved to reader-store → applied as CSS custom properties on `.text-reader` container

### 1.7 Auto-scroll

- Toggle in reader overlay (play icon beside settings)
- Speed slider: 1 (slow) to 10 (fast)
- Implementation: `setInterval` with `window.scrollBy(0, speed * 0.5)` px every 50ms
- Start/stop via space bar or dedicated button
- Visual indicator: auto-scroll badge + remaining time estimate
- Auto-stops when reaching bottom of chapter

### 1.8 Brightness Overlay

- Slider in reader overlay (sun icon)
- Range: 0% (black) to 100% (original)
- Implementation: CSS `filter: brightness(${value})` on reader viewport
- Saved to reader-store per-session (not persisted by default)

### 1.9 Content Filter

- Settings page: list of regex patterns
- Default patterns (from IReader):
  ```
  Use arrow keys.*chapter
  (?:A|D|←|→).*(?:PREV|NEXT).*chapter
  (?:Previous|Next).*Chapter.*(?:←|→|A|D)
  Read more at.*
  Visit.*for more chapters
  ```
- Apply filter in text reader: before rendering chapter HTML, remove all `<p>` or `<div>` elements whose text content matches any pattern
- Toggleable: user can enable/disable content filter

### 1.10 E2E Tests

- Test that theme switching changes background/text color in reader
- Test that font change triggers CSS variable update
- Test that line height slider changes paragraph spacing
- Test that auto-scroll starts and stops correctly
- Test that content filter removes matched elements
- Test that brightness slider changes filter value

---

## Acceptance Criteria

- [ ] Reader themes: 5 built-in presets + custom theme creation with all color fields
- [ ] Custom fonts: upload .ttf/.otf, select from list, preview in reader
- [ ] Text layout: line height, paragraph spacing, indent, alignment all functional
- [ ] Auto-scroll: starts/stops, speed controllable, stops at chapter end
- [ ] Brightness overlay: slider controls CSS brightness
- [ ] Content filter: regex patterns remove matching elements, toggleable
- [ ] All settings persisted across page reloads
- [ ] 6 E2E tests all passing

---

## Progress

| Task | Status | Assignee |
|------|--------|----------|
| 1.1 Reader themes API + DB model | todo | Sage |
| 1.2 Reader themes UI | todo | Nova |
| 1.3 Custom fonts API | todo | Sage |
| 1.4 Custom fonts UI + FontFace loading | todo | Nova + Milo |
| 1.5 Line height + spacing + indent | todo | Nova |
| 1.6 Text alignment | todo | Nova |
| 1.7 Auto-scroll | todo | Nova |
| 1.8 Brightness overlay | todo | Nova |
| 1.9 Content filter | todo | Sage + Nova |
| 1.10 E2E tests | todo | Sage |
