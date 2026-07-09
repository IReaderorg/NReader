# Sprint 5: Backup + Extended Plugins

**Goal:** Full backup/restore, plugin manager + marketplace.

## Architecture

```
┌─────────────────────────────────────────────────────┐
│                   Backup System                       │
│                                                       │
│  Export:                                              │
│    zip = {                                           │
│      metadata.json  (version, schema, timestamp)     │
│      db-tables/                                      │
│        library.json                                  │
│        categories.json                               │
│        history.json                                  │
│        settings.json                                 │
│        downloads.json                                │
│        glossary.json                                 │
│        plugins.json                                  │
│      covers/  (optional, base64 images)              │
│      plugins/  (source .js files)                    │
│    }                                                  │
│                                                       │
│  Import:                                              │
│    Extract ZIP → validate metadata →                  │
│    resolve conflicts (merge/replace) →                │
│    restore tables from JSON                           │
└─────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────┐
│              Extended Plugin Types                    │
│                                                       │
│  ThemePlugin: getCSS() → returns CSS string          │
│    - Overrides design tokens at runtime              │
│    - Loaded via <style> injection                    │
│                                                       │
│  AIPlugin: summarize(text), generate(prompt)         │
│    - Pluggable AI backends                           │
│    - Configurable endpoint + API key                 │
│                                                       │
│  Plugin Manager (Frontend):                          │
│    - List installed + available plugins              │
│    - Install from URL / marketplace                  │
│    - Enable/disable, configure per plugin            │
└─────────────────────────────────────────────────────┘
```

## Tasks

### Batch A — Backup Engine
- [ ] Backup service: ZIP export (JSZip, JSON tables, optional covers/plugins)
- [ ] Backup service: ZIP import with conflict resolution (merge vs replace)
- [ ] Backup API: `POST /backup/export`, `POST /backup/import`, `GET /backup`
- [ ] Auto-backup timer (configurable interval, triggered on backend start)
- [ ] Backup frontend page (create, download, upload, restore)

### Batch B — Extended Plugin Types
- [ ] Add ThemePlugin and AIPlugin interfaces to core entities
- [ ] Plugin marketplace endpoint: `GET /plugins/marketplace`
- [ ] Frontend: Plugin manager page (install, enable/disable, configure)

### Batch C — E2E Tests
- [ ] Backup export → verify ZIP structure
- [ ] Backup import → verify data restored
- [ ] Frontend backup page loads
- [ ] Plugin marketplace returns results

## Dependencies
- JSZip package needed (`npm install jszip`)
- Backup API depends on having all repositories available

## Acceptance Criteria
- [ ] Export ZIP contains all DB tables as JSON + metadata
- [ ] Import ZIP restores all data correctly
- [ ] Conflict resolution: merge keeps new data, replace overwrites
- [ ] Plugin marketplace returns discoverable plugins
- [ ] Plugin manager page shows installed + available plugins
- [ ] Auto-backup runs on configurable interval

## Progress
| Task | Status | Assignee |
|------|--------|----------|
| Sprint plan | done | Orchestrator |
| Backup service | pending | Sage |
| Backup API routes | pending | Sage |
| Backup frontend | pending | Nova |
| Plugin types + marketplace | pending | Milo |
| Plugin manager frontend | pending | Nova |
| E2E tests | pending | QA |
