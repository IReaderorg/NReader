# NReader vs IReader — Comprehensive Feature Gap Analysis

Generated: 2026-07-09

## Legend
| ✅ | **Built** — Fully implemented and tested |
| 🔶 | **Partial** — Skeleton exists, needs work |
| ❌ | **Missing** — Not yet implemented |

---

## 1. Source / Extension System

| Feature | IReader | NReader | Notes |
|---------|---------|---------|-------|
| Load JS plugins at runtime | ✅ | ✅ | Sandbox loader in `plugin-system/src/sandbox/` |
| Plugin marketplace | ✅ | 🔶 | API endpoint exists, frontend `PluginManagerPage` basic |
| Plugin install from URL | ✅ | ❌ | |
| Plugin install from file (.js) | ✅ | ❌ | |
| Local extension installer | ✅ | ❌ | IReader has Android APK-based extension install |
| Plugin auto-updates | ✅ | ❌ | |
| Plugin repository | ✅ | ❌ | IReader uses extension repos |
| Plugin trust/signing | ✅ | ❌ | |
| Plugin capabilities manifest | ✅ | ✅ | `capabilities` field in manifest |
| Source health checker | ✅ | ❌ | Domain service `SourceHealthChecker` |
| Plugin crash isolation | ✅ | ❌ | `SafeSourceExecutor` wraps each call |
| Multiple source repos | ✅ | ❌ | |
| TS/JS dual plugin format | ❌ | 🔶 | Currently only JS |

---

## 2. Library Management

| Feature | IReader | NReader | Notes |
|---------|---------|---------|-------|
| Add/remove books | ✅ | ✅ | Basic CRUD via `library-store.ts` |
| Categories | ✅ | ✅ | Create, delete, filter by category |
| Category auto-rules | ✅ | ❌ | `AutoCategorizeBookUseCase` |
| Category reorder | ✅ | ❌ | `ReorderCategory` use case |
| Multiple categories per book | ✅ | ❌ | Currently one category per book |
| Library view: Grid/List | ✅ | ✅ | Toggle in `LibraryPage` |
| Library sort: title, last read, unread, date added | ✅ | 🔶 | Basic, needs sort options |
| Library filter: downloaded, unread, completed | ✅ | 🔶 | Partial filter |
| Library search | ✅ | ❌ | Search within library |
| Smart categories | ✅ | ❌ | `GetSmartCategoryBooksUseCase` |
| Favorites (pinned) | ✅ | ❌ | `ToggleFavorite`, `ToggleBookPinUseCase` |
| Archive books | ✅ | ❌ | `ArchiveBookUseCase` |
| Book metadata editing | ✅ | ❌ | Custom title, cover, author |
| Mark all chapters read | ✅ | ❌ | |
| Download unread chapters | ✅ | ❌ | `DownloadUnreadChaptersUseCase` |
| Multi-select in library | ✅ | ❌ | Batch operations |
| Library statistics | ✅ | ❌ | `LibraryStatisticsUseCase` |

---

## 3. Download System

| Feature | IReader | NReader | Notes |
|---------|---------|---------|-------|
| Download chapters | ✅ | ✅ | Basic start/cancel |
| Download queue | ✅ | 🔶 | Jobs list, no priority or ordering |
| Batch download multiple chapters | ✅ | ❌ | |
| Download priority | ✅ | ❌ | `UpdateDownloadPriority` |
| Pause/resume downloads | ✅ | ❌ | |
| Download progress tracking | ✅ | ✅ | Per-job progress |
| Download notification | ✅ | ❌ | Android notification channel |
| Download cache management | ✅ | ❌ | `DownloadCache` for storage |
| Delete saved downloads | ✅ | ❌ | Per-book and per-chapter delete |
| Download complete status | ✅ | 🔶 | Basic completed/failed |
| Network-aware downloading | ✅ | ❌ | WiFi-only option, pause on metered |
| Auto-retry on failure | ✅ | ❌ | |
| Concurrent download limit | ✅ | ❌ | Configurable |
| Storage location picker | ✅ | ❌ | |

---

## 4. Reader Experience

| Feature | IReader | NReader | Notes |
|---------|---------|---------|-------|
| Webtoon (scroll) mode | ✅ | ✅ | `WebtoonReader` |
| Pager (LTR/RTL) mode | ✅ | ✅ | `PagerReader` |
| Text reader mode | ✅ | ✅ | `TextReader` |
| Font size adjustment | ✅ | ✅ | Slider 12-36px |
| Custom fonts (ttf/otf/woff2) | ✅ | ✅ | Upload + select |
| Built-in themes (Light, Sepia, Dark, Night, OLED) | ✅ | ✅ | 5 presets + custom |
| Custom reader themes | ✅ | ✅ | Full color picker |
| Line height adjustment | ✅ | ✅ | 1.0–2.5 range |
| Paragraph spacing | ✅ | ✅ | 0–40px |
| Paragraph indent | ✅ | ✅ | 0–40px |
| Text alignment (left/center/right/justify) | ✅ | ✅ | |
| Color filter overlay | ✅ | ✅ | Sepia, Invert, Grayscale |
| Auto-scroll | ✅ | ✅ | Speed-controlled |
| Content filter (regex block) | ✅ | ✅ | Pattern-based filtering |
| Reading progress tracking | ✅ | ✅ | Per-chapter scroll position |
| Chapter navigation | ✅ | ✅ | Prev/next chapter |
| Reading mode persistence per-book | ✅ | ❌ | IReader remembers mode per book |
| Keyboard shortcuts | ✅ | ✅ | Escape, arrows, F, T, Space |
| Tap zones (prev/next/center) | ✅ | ✅ | Pager: 40/20/40% zones |
| Swipe navigation | ✅ | ✅ | Touch-based |
| Double-tap zoom (images) | ✅ | ❌ | |
| Crop mode for images | ✅ | ❌ | |
| Screen always-on | ✅ | ❌ | `ScreenAlwaysOn` use case |
| Reader background color | ✅ | ❌ | Separate from theme |
| Reading timer | ✅ | ❌ | `ReadingTimerManager` |
| Chapter bookmarking | ✅ | ❌ | `BookMarkChapterUseCase` |
| Page bookmarking | ✅ | ❌ | Mark specific pages |
| Text replacement/find | ✅ | ❌ | `TextReplacementUseCase` |
| Night mode scheduling | ✅ | ❌ | `NightModePreferencesUseCase` |
| Brightness control | ✅ | ✅ | Overlay slider |
| Auto-brightness (follow system) | ✅ | ❌ | |
| Fullscreen mode | ✅ | ✅ | `f` key toggle |

---

## 5. Text-to-Speech (TTS)

| Feature | IReader | NReader | Notes |
|---------|---------|---------|-------|
| Web Speech API TTS | ✅ | ✅ | `WebSpeechEngine` |
| Voice selection | ✅ | ✅ | |
| Speed control | ✅ | ✅ | 0.5x–3x |
| AI TTS (Gradio) | ✅ | ❌ | Server-based TTS engines |
| TTS plugin system | ✅ | ❌ | Gradio plugin loader |
| TTS chapter download | ✅ | ❌ | Download chapters as audio |
| Sleep timer | ✅ | ❌ | `TTSSleepTimerUseCase` |
| TTS notification controls | ✅ | ❌ | |
| Voice recommendations | ✅ | ❌ | `VoiceRecommender` |
| V2 TTS engine | ✅ | ❌ | Chunked playback, caching |
| Piper TTS voices | ✅ | ❌ | Local neural TTS |

---

## 6. Translation

| Feature | IReader | NReader | Notes |
|---------|---------|---------|-------|
| DeepL integration | ✅ | ✅ | `DeepLTranslationEngine` |
| Glossary/translation memory | ✅ | ✅ | CRUD in `glossary.ts` |
| Inline translation overlay | ✅ | ❌ | |
| Auto-translate on scroll | ✅ | ❌ | |
| Source/target language selection | ✅ | ✅ | |
| Translation cache | ✅ | ❌ | `TranslationCache` |

---

## 7. Backup & Restore

| Feature | IReader | NReader | Notes |
|---------|---------|---------|-------|
| Full backup (JSON/protobuf) | ✅ | ✅ | `/backup/export`, `/backup/import` |
| Google Drive backup | ✅ | ❌ | `GoogleDriveProvider` |
| Cloud backup | ✅ | ❌ | `CloudBackupManager` |
| Automatic scheduled backup | ✅ | ❌ | `ScheduleAutomaticBackup` |
| LNReader import | ✅ | ❌ | Legacy format parser |
| V1/V2 backup format migration | ✅ | ❌ | `LegacyMigrator` |

---

## 8. Sync

| Feature | IReader | NReader | Notes |
|---------|---------|---------|-------|
| Cross-device sync | ✅ | ❌ | Full sync framework |
| Sync service (remote backend) | ✅ | ❌ | `SyncManager`, `SyncService` |
| Conflict resolution | ✅ | ❌ | `DetectConflictsUseCase`, `ResolveConflictsUseCase` |
| Encryption | ✅ | ❌ | `CommonEncryptionService` |
| Certificate management | ✅ | ❌ | `CertificateService` |
| Device discovery | ✅ | ❌ | `GetDiscoveredDevicesUseCase` |
| Sync status monitoring | ✅ | ❌ | `GetSyncStatusUseCase` |

---

## 9. History

| Feature | IReader | NReader | Notes |
|---------|---------|---------|-------|
| Reading history | ✅ | ✅ | Time-based grouping |
| Clear per-manga history | ✅ | ✅ | |
| Clear all history | ✅ | ✅ | |
| Last read tracking | ✅ | ❌ | `GetLastReadNovelUseCase` |
| Continue reading shortcut | ✅ | ✅ | Link from history |

---

## 10. Updates & Notifications

| Feature | IReader | NReader | Notes |
|---------|---------|---------|-------|
| Library update check | ✅ | ✅ | `UpdatesPage` basic |
| Background library update service | ✅ | ❌ | `runLibraryUpdateService` |
| New chapter notifications | ✅ | ❌ | `NotificationManagerUseCase` |
| Update scheduling (interval) | ✅ | ❌ | |
| Update filtering per-manga | ✅ | ❌ | |
| Update swipe-to-refresh | ✅ | ❌ | |

---

## 11. Metadata & Tracking

| Feature | IReader | NReader | Notes |
|---------|---------|---------|-------|
| MyAnimeList/AniList tracking | ✅ | ❌ | `TrackingUseCase` |
| Reading statistics | ✅ | ❌ | `GetReadingStatisticsUseCase` |
| Reading progress charts | ✅ | ❌ | |
| Library insights | ✅ | ❌ | `GetLibraryInsightsUseCase` |
| Recommendations | ✅ | ❌ | `GetRecommendationsUseCase` |

---

## 12. Quote / Social

| Feature | IReader | NReader | Notes |
|---------|---------|---------|-------|
| Quote cards from text | ✅ | ❌ | `QuoteCardGenerator` |
| Reading buddies | ✅ | ❌ | `ReadingBuddyUseCases` |
| Community quotes | ✅ | ❌ | `QuotesScreen` |
| Quote image generation | ✅ | ❌ | |

---

## 13. Settings & Customization

| Feature | IReader | NReader | Notes |
|---------|---------|---------|-------|
| Dark/Light/AMOLED theme | ✅ | ✅ | `ThemeProvider` with 3 modes |
| Accent color | ✅ | ✅ | CSS custom property |
| Language/locale selection | ✅ | ❌ | i18n system in IReader |
| Storage location config | ✅ | ❌ | |
| Battery optimization | ✅ | ❌ | |
| Proxy/DOH setting | ✅ | ❌ | `DohPrefUseCase` |
| Device-specific optimizations | ✅ | ❌ | |
| Data saver mode | ✅ | ❌ | Low-res covers on cellular |

---

## 14. Special/Monetization Features (IReader-specific)

| Feature | IReader | NReader | Notes |
|---------|---------|---------|-------|
| Donation system | ✅ | ❌ | Prob not needed |
| Leaderboard | ✅ | ❌ | Prob not needed |
| Badge/achievement system | ✅ | ❌ | |
| Spirit stones / gamification | ✅ | ❌ | |
| Admin panel | ✅ | ❌ | |
| Authentication (signup/login) | ✅ | ❌ | |
| Book reviews | ✅ | ❌ | |
| Chapter reviews | ✅ | ❌ | |
| Character art gallery | ✅ | ❌ | |
| Deep links | ✅ | ❌ | |

---

## Summary Count

| Category | Total Features | Built | Partial | Missing |
|----------|---------------|-------|---------|---------|
| 1. Source/Extension System | 13 | 2 | 2 | 9 |
| 2. Library Management | 18 | 3 | 2 | 13 |
| 3. Download System | 14 | 1 | 2 | 11 |
| 4. Reader Experience | 38 | 23 | 1 | 14 |
| 5. Text-to-Speech (TTS) | 10 | 2 | 0 | 8 |
| 6. Translation | 5 | 3 | 0 | 2 |
| 7. Backup & Restore | 7 | 1 | 0 | 6 |
| 8. Sync | 8 | 0 | 0 | 8 |
| 9. History | 5 | 4 | 0 | 1 |
| 10. Updates & Notifications | 6 | 1 | 0 | 5 |
| 11. Metadata & Tracking | 5 | 0 | 0 | 5 |
| 12. Quote / Social | 4 | 0 | 0 | 4 |
| 13. Settings & Customization | 7 | 3 | 0 | 4 |
| 14. Special/Monetization | 10 | 0 | 0 | 10 |
| **Total** | **150** | **43** | **7** | **100** |

---

## Phase Recommendations (Priority Order)

### Phase 2: Library Power Features (13 gaps)
Priority: Highest — users spend most time here
- Library search
- Sort options (title, last read, unread, date added, score)
- Filter options (downloaded, unread, completed, ongoing)
- Favorites/pin books
- Multi-category per book
- Category reorder + auto-rules
- Mark all chapters read
- Multi-select + batch operations
- Book metadata editing

### Phase 3: Download System Overhaul (11 gaps)
Priority: High — core for offline reading
- Batch chapter download
- Pause/resume downloads
- Download priority
- Network-aware (WiFi-only)
- Auto-retry
- Storage management
- Per-book download management
- Download notifications
- Concurrent download limit config

### Phase 4: Reader Enhancements (14 gaps)
Priority: High — reading is the main activity
- Per-book reading mode persistence
- Image zoom + crop mode
- Reading timer
- Chapter bookmarks
- Text highlight/annotations
- Night mode scheduling
- Auto-brightness
- Background color picker
- Screen always-on
- Text search within chapter

### Phase 5: Backup & Sync (14 gaps)
Priority: Medium — important for retention
- Google Drive backup
- Auto-scheduled backups
- Cross-device sync
- LNReader import compatibility
- Cloud backup provider
- Conflict resolution UI

### Phase 6: Updates & Notifications (5 gaps)
Priority: Medium
- Background library update service
- New chapter push notifications
- Configurable update intervals
- Per-manga update settings
- Update dashboard improvements

### Phase 7: TTS Advanced Features (8 gaps)
Priority: Medium
- AI TTS engine support (Gradio)
- TTS chapter download
- Sleep timer
- Voice recommendations
- Chunked playback

### Phase 8: Social & Community (13 gaps)
Priority: Low
- Quotes
- Reading statistics/charts
- Recommendations
- MyAnimeList/AniList tracking
