# NReader — IReader Feature Migration Plan

## Context

- **NReader** (this repo): TypeScript web app (Hono + React + Vite). 44 API endpoints, 16 frontend pages, 4 plugins, 75 E2E tests.
- **IReader** (`/home/kazem/StudioProjects/ireader_projects/IReader`): Mature Kotlin multiplatform app **v2.0.20**. 300+ use cases, 80+ repositories, 100+ UI screens. 34 packages across domain (analytics, catalogs, community, http, image, js, plugins, preferences, services, usecases, usersource, etc.).

This is a complete feature map of IReader, organized into **16 implementation phases** for NReader.

---

## Phase 1: Reading Customization

| Feature | IReader Source Files |
|---------|---------------------|
| **Reader themes** (Light, Sepia, Dark, Night, OLED + custom) | `ReaderThemeRepository.kt`, `Theme.kt`, `ThemeEntity.kt`, `appThemeMapper.kt`, `DomainColorScheme.kt`, `ExtraColors.kt` |
| **Custom fonts** (upload .ttf/.otf, list, select, preview) | `FontRepository.kt`, `FontType.kt`, `CustomFont.kt`, `FontResource.kt`, `FontManagementUseCase.kt`, `FontUseCase.kt`, `FontScreen.kt` |
| **Font size** (slider 10-36px) | `ReaderPreferences.kt: fontSize()` |
| **Line height** (1.0-2.5) | `FontHeightUseCase.kt`, `ReaderPreferences.kt: fontHeight()` |
| **Paragraph spacing** (0-40px) | `ParagraphDistanceUseCase.kt`, `ReaderPreferences.kt: paragraphDistance()` |
| **Paragraph indent** (0-40px toggle+slider) | `ReaderPreferences.kt: paragraphIndent()` |
| **Text alignment** (Left/Center/Right/Justify) | `ReaderPreferences.kt: textAlignment()` |
| **Auto-scroll** (speed-controlled, start/stop) | `ReaderPreferences.kt: autoScrollInterval/Offset` |
| **Brightness overlay** (slider, 0-100%) | `BrightnessStateUseCase.kt`, `ReaderPreferences.kt: brightness()` |
| **Color filters** (sepia, invert, grayscale overlay) | `ColorFilterManager.kt`, `ColorFilter.kt` |
| **Content filter** (regex strip navigation hints from chapter body) | `ContentFilterUseCase.kt`, `ReaderPreferences.kt: DEFAULT_CONTENT_FILTER_PATTERNS` |
| **Text replacement** (global find/replace) | `TextReplacementUseCase.kt`, `TextReplacementRepository.kt`, `TextReplacement.kt` |
| **Reading presets** (named preset bundles of all above settings) | `ReadingPreset.kt` |
| **Scroll indicator** (custom scrollbar) | `ReaderPreferences.kt: scrollIndicator*` |
| **Selectable text** (toggle text selection) | `ReaderPreferences.kt: selectableText` |
| **Screen always on** (prevent screen sleep) | `ScreenAlwaysOn.kt` |
| **Default reading mode** (remember per-book) | `ApplyDefaultReadingModeUseCase.kt` |

**E2E Tests:** 8+

---

## Phase 2: Bookmarks & Statistics

| Feature | IReader Source Files |
|---------|---------------------|
| **Bookmarks** (create with chapterId + note + scrollPos, list, delete) | `BookMarkChapterUseCase.kt` |
| **Reading time tracking** (session time, per-book time) | `TrackReadingStatistics.kt`, `ReadingStatistics.kt`, `ReadingStatisticsRepository.kt` |
| **Reading streaks** (consecutive days) | `TrackReadingStatistics.kt` |
| **Reading goals** (daily chapters/time targets) | `ReadingChallenge.kt`, `ReadingChallengeRepository.kt` |
| **Library insights** (total read, completed, trends) | `LibraryInsights.kt`, `LibraryInsightsRepository.kt`, `GetLibraryInsightsUseCase.kt` |
| **Statistics dashboard** (daily/weekly/monthly charts) | `StatisticsUseCases.kt`, `ExportStatisticsUseCase.kt`, `GetReadingStatisticsUseCase.kt` |
| **Reading challenge** (monthly/yearly) | `ReadingChallengeRepository.kt` |
| **Reading analytics** (patterns, recommendations) | `GetReadingAnalyticsUseCase.kt`, `GetRecommendationsUseCase.kt` |
| **Upcoming releases** (track when chapters expected) | `GetUpcomingReleasesUseCase.kt` |

**E2E Tests:** 6+

---

## Phase 3: Search & Source Management

| Feature | IReader Source Files |
|---------|---------------------|
| **Global search** (search all sources simultaneously, merge results) | `GlobalSearchUseCase.kt`, `GlobalSearchScreenSpec.kt` |
| **Advanced filters** (by status: ongoing/completed, genre, year) | `ContentFilter.kt`, `FilterStateManager.kt`, `ApplyAdvancedFiltersUseCase.kt` |
| **Source comparison** (same book on multiple sources) | `SourceComparisonRepository.kt`, `SourceComparison.kt` |
| **Source migration** (move book A→B, match chapters) | `MigrateNovelUseCase.kt`, `MigrateChaptersWithPreservationUseCase.kt`, `MigrateToSourceUseCase.kt`, `SourceMigrationScreenSpec.kt` |
| **Source health check** (is source reachable?) | `CheckSourceAvailabilityUseCase.kt`, `SourceHealth.kt`, `ChapterHealthChecker.kt` |
| **Source reports** (report broken sources) | `ReportBrokenSourceUseCase.kt`, `SourceReportRepository.kt`, `ChapterReportRepository.kt` |
| **Chapter health** (detect broken/empty chapters) | `ChapterHealth.kt`, `AutoRepairChapterUseCase.kt`, `ChapterHealthChecker.kt` |
| **Popular/Explore books** (remote recommendation feed) | `PopularBooksRepository.kt`, `ExploreBookRepository.kt`, `ExploreBookUseCases.kt`, `ResolvePopularBookSourceUseCase.kt` |

**E2E Tests:** 6+

---

## Phase 4: Download Management

| Feature | IReader Source Files |
|---------|---------------------|
| **Batch download** (select multiple chapters) | `DownloadChaptersUseCase.kt` |
| **Download queue** (priority ordering) | `UpdateDownloadPriority.kt`, `DownloadManager.kt`, `DownloadQueueItem.kt`, `DownloadStore.kt` |
| **Pause/resume downloads** | `PauseDownloadUseCase.kt`, `ResumeDownloadUseCase.kt` |
| **Cancel downloads** (single + batch) | `CancelDownloadUseCase.kt` |
| **Delete saved downloads** (by chapter, book, or all) | `DeleteSavedDownload.kt`, `DeleteAllSavedDownload.kt`, `DeleteSavedDownloadByBookId.kt` |
| **Download status subscription** (real-time updates) | `SubscribeDownloadsUseCase.kt`, `SubscribeOneSavedDownload.kt` |
| **Download all unread** | `DownloadUnreadChaptersUseCase.kt` |
| **Download service** (background downloader) | `DownloaderService.kt`, `DownloadServiceState.kt`, `DownloadActionReceiver.kt` |
| **Network state awareness** (WiFi only, mobile data) | `NetworkStateProvider.kt` |
| **Offline reading** (serve cached content) | `DownloadCache.kt`, `SavedDownload.kt` |

**E2E Tests:** 6+

---

## Phase 5: Translation Engines

| Feature | IReader Source Files |
|---------|---------------------|
| **Google Gemini** (API key, model selection) | `TranslateEngine.kt` interface |
| **OpenAI** (API key, model) | `OpenAITranslateEngine.kt` |
| **DeepSeek** | `DeepSeekTranslateEngine.kt` |
| **Google Translate** (free, web scrape) | `GoogleTranslateFree.kt` |
| **Google ML Kit** (on-device) | `GoogleTranslateML.kt` |
| **LibreTranslate** (self-hosted URL) | `LibreTranslateEngine.kt` |
| **Ollama** (local LLM, custom URL) | `OllamaTranslateEngine.kt` (in data/engines) |
| **Nvidia NMT** | `NvidiaTranslateEngine.kt` |
| **OpenRouter** (unified API) | `OpenRouterTranslateEngine.kt` |
| **Web scraping** (free web translators) | `WebscrapingTranslateEngine.kt` |
| **Free AI** (rate-limited free tier) | `FreeAITranslateEngine.kt` |
| **Translation queue** (batch whole chapter) | `TranslationQueueManager.kt` |
| **Translation retry** (error handling) | `TranslationRetryHandler.kt` |
| **Translated chapter cache** (store translations) | `TranslatedChapterRepository.kt`, `TranslatedChapter.kt`, `TranslationCache.kt` |
| **Auto-translate chapter** (one-tap all paragraphs) | `TranslateChapterWithStorageUseCase.kt` |
| **Translate book metadata** (title, description) | `TranslateBookMetadataUseCase.kt` |
| **Engine initialization check** | `CheckTranslationEngineInitializationUseCase.kt` |
| **Community translation** (Cloudflare D1+R2) | `CommunityTranslationRepository.kt`, `AutoShareTranslationUseCase.kt`, `SubmitTranslationUseCase.kt` |
| **Translation plugin system** (extensible engines) | `TranslationPluginUtils.kt`, `TranslationEnginesManager.kt` |

**E2E Tests:** 8+

---

## Phase 6: TTS Engine Expansion

| Feature | IReader Source Files |
|---------|---------------------|
| **Piper TTS** (offline, WASM/binary) | `PiperVoiceCatalog.kt`, `PiperVoiceRepository.kt`, `PiperVoice.kt` |
| **Kokoro TTS** (offline, high-quality, ~300MB model) | `VoiceModel.kt` (same abstraction) |
| **Gradio TTS** (custom HuggingFace space) | `TTSV2ScreenSpec.kt` |
| **Native TTS** (Web Speech API in NReader) | Already done |
| **Sleep timer** (15/30/60 min, end of chapter) | `TTSSleepTimerUseCase.kt`, `ReaderPreferences.kt: sleepTimer` |
| **Speed control** (0.5x-3.0x) | `ReaderPreferences.kt: speechRate` |
| **Pitch control** | `ReaderPreferences.kt: speechPitch` |
| **Paged TTS mode** (sync voice with page turns) | `ReaderPreferences.kt: pagedTtsMode` |
| **Voice model download & management** | `VoiceModelRepository.kt`, `VoiceCatalog.kt` |
| **TTS follow speaker** (per-chapter voice) | `ReaderPreferences.kt: followTTSSpeaker` |
| **TTS engine manager** (install/select engines) | `TTSEngineManagerScreenSpec.kt`, `TTSEngineSettingsScreen` |
| **Notification controls** (play/pause from notification) | `TTSNotificationUseCase.kt`, `TTSNotificationFactory` |

**E2E Tests:** 6+

---

## Phase 7: Local File Reading

| Feature | IReader Source Files |
|---------|---------------------|
| **EPUB import** (parse covers, chapters, images) | `ImportEpub.kt`, `EpubImportSummaryScreen.kt` |
| **EPUB export** (build EPUB with all chapters + covers + images) | `EpubBuilder.kt`, `EpubExportService.kt`, `ExportBookAsEpubUseCase.kt`, `ExportNovelAsEpubUseCase.kt` |
| **PDF import** | `ImportPdf.kt` |
| **Local folder source** (read from device storage) | `OpenLocalFolder.kt`, `LocalSourceImpl.kt`, `GetLocalCatalog.kt` |
| **Local novel management** (add/edit/delete) | `LocalGetBookUseCases.kt`, `LocalInsertUseCases.kt`, `LocalGetChapterUseCase.kt` |
| **Refresh local library** (rescan folders) | `RefreshLocalLibrary.kt` |

**E2E Tests:** 4+

---

## Phase 8: Backup V2

| Feature | IReader Source Files |
|---------|---------------------|
| **Protobuf backup format** (structured binary) | `Backup.kt`, `BookProto.kt`, `CategoryProto.kt`, `ChapterProto.kt`, `HistoryProto.kt`, `TrackProto.kt` |
| **Backup V2 orchestrator** | `BackupOrchestrator.kt`, `BackupSerializer.kt`, `BackupModels.kt` |
| **Cloud storage providers** (generic interface) | `CloudStorageProvider.kt`, `CloudBackupManager.kt` |
| **Google Drive backup** (OAuth + upload/download) | `GoogleDriveBackupService.kt`, `GoogleDriveProvider.kt`, `GoogleDriveAuthenticator.kt`, `GoogleDriveOAuthHandler.kt` |
| **Auto-backup scheduler** (daily/weekly) | `ScheduleAutomaticBackup.kt`, `AutomaticBackup.kt`, `AutoBackupWorker.kt` |
| **LNReader backup import** (with source mapping) | `ImportLNReaderBackup.kt`, `LNReaderBackupParser.kt`, `LNReaderSourceMapper.kt`, `LNReaderImportException.kt` |
| **Legacy migrators** (backup format versioning) | `NineteenSepLegacy.kt`, `TwentyFourSepLegecy.kt`, `LegacyMigrator.kt` |
| **Backup exceptions** (structured error handling) | `BackupException.kt` |
| **Library backup** (export/import) | `LibraryBackupUseCase.kt`, `LibraryBackupRepository.kt` |

**E2E Tests:** 6+

---

## Phase 9: Cloud Sync

| Feature | IReader Source Files |
|---------|---------------------|
| **Supabase auth** (sign up/in/out) | `SignInUseCase.kt`, `SignUpUseCase.kt`, `SignOutUseCase.kt`, `AuthenticationUseCase.kt` |
| **Supabase config** (URL, anon key) | `SupabasePreferences.kt`, `SupabaseConfig.kt`, `SupabaseEndpoint.kt`, `SupabaseClientProvider.kt` |
| **Library sync** (books → remote) | `SyncBooksToRemoteUseCase.kt`, `SyncBookToRemoteUseCase.kt`, `SyncBooksUseCase.kt` |
| **Progress sync** (chapter + scroll position) | `SyncReadingProgressUseCase.kt`, `ReadingProgress.kt` |
| **History sync** | `HistorySyncData.kt`, `SyncData.kt` |
| **Settings sync** | `SyncManifest.kt`, `SyncMetadata.kt` |
| **Conflict detection & resolution** | `DetectConflictsUseCase.kt`, `ResolveConflictsUseCase.kt`, `DataConflict.kt` |
| **Full sync orchestration** | `PerformFullSyncUseCase.kt`, `StartSyncUseCase.kt`, `StopSyncUseCase.kt`, `CancelSyncUseCase.kt` |
| **Sync status monitoring** | `GetSyncStatusUseCase.kt`, `ObserveConnectionStatusUseCase.kt` |
| **WiFi local sync** (device-to-device, no cloud) | `SyncWithDeviceUseCase.kt`, `GetDiscoveredDevicesUseCase.kt`, `DiscoveredDevice.kt`, `SyncSession.kt` |
| **Remote user profiles** | `GetCurrentUserUseCase.kt`, `UpdateUsernameUseCase.kt`, `UpdatePasswordUseCase.kt`, `User.kt` |

**E2E Tests:** 8+

---

## Phase 10: Plugin System Expansion

| Feature | IReader Source Files |
|---------|---------------------|
| **Cross-plugin communication** (plugins talk to each other) | `CrossPluginCommunication.kt`, `PluginCommunicationManager.kt`, `PluginEventBus.kt` |
| **Plugin pipeline/composition** (chain multiple plugins) | `PluginComposition.kt`, `PluginPipeline.kt`, `PipelineManager.kt`, `PluginAdapters.kt` |
| **Plugin resource monitoring** (memory, CPU usage) | `PluginResourceMonitor.kt`, `ResourceMonitor.kt`, `ResourceTracker.kt`, `ResourceLimiter.kt`, `ResourceViolationNotifier.kt` |
| **Plugin hot reload** (file watcher, debounce) | `HotReloadManager.kt`, `PluginHotReload.kt`, `FileWatcherImpl.kt` |
| **LN→IReader plugin converter** (AST analysis) | `JSPluginConverter.kt`, `JSPluginAnalyzer.kt`, `JSPluginAnalyzerAST.kt`, `JSASTParser.kt` |
| **Source wizard** (in-app source creator) | `SourceCreatorScreen.kt`, `SourceWizardScreen.kt`, `AutoDetectUseCase.kt` |
| **Plugin security validator** (permissions, sandbox) | `PluginSecurityManager.kt`, `PluginSecurityValidator.kt`, `JSPluginPermission.kt`, `PluginPermissionManager.kt` |
| **Plugin marketplace social** (reviews, ratings) | `PluginMarketplaceSocial.kt`, `MarketplaceSocialManager.kt`, `PluginReviewRepository.kt` |
| **Plugin update checker** (background) | `PluginUpdateChecker.kt`, `JSPluginUpdateManager.kt`, `JSPluginUpdateChecker.kt`, `JSPluginUpdateScheduler.kt` |
| **Plugin offline cache** | `OfflineCacheManager.kt`, `OfflinePluginCache.kt`, `PluginUpdateExtensions.kt` |
| **Plugin analytics** (usage tracking) | `PluginAnalyticsManager.kt`, `PluginAnalytics.kt` |
| **Plugin developer portal** (publish/submit) | `DeveloperPortalScreenSpec.kt`, `DeveloperPortalRepository.kt` |
| **Plugin backup sync** | `PluginBackupSync.kt`, `PluginSyncManager.kt` |
| **Plugin service providers** (DI for plugins) | `PluginServiceProviders.kt`, `PluginEnhancementsModule.kt` |

**E2E Tests:** 6+

---

## Phase 11: Community & Gamification

| Feature | IReader Source Files |
|---------|---------------------|
| **User profiles** (stats, reading history, theme) | `UserProfileScreenSpec.kt`, `ProfileScreen`, `User.kt`, `AdminUser.kt` |
| **Book reviews** (1-5 stars, text, per chapter) | `ReviewRepository.kt`, `BookReview.kt`, `ChapterReview.kt`, `SubmitBookReviewUseCase.kt`, `SubmitChapterReviewUseCase.kt`, `GetBookReviewsUseCase.kt` |
| **Achievements/badges** (earn, display, share) | `BadgeRepository.kt`, `Badge.kt`, `UserBadge.kt`, `CheckAndAwardAchievementBadgeUseCase.kt`, `CheckReadingAchievementsUseCase.kt`, `GetAvailableBadgesUseCase.kt`, `GetUserBadgesUseCase.kt`, `DefaultAchievements.kt` |
| **Reader levels** (XP-based leveling) | `ReaderLevel.kt`, `CalculateLevelUseCase.kt` |
| **User titles** (earn and activate titles) | `UserTitle.kt`, `ActivateTitleUseCase.kt` |
| **Reward engine** | `RewardEngineUseCase.kt`, `Reward.kt` |
| **Leaderboards** (reading time, donations) | `LeaderboardScreenSpec.kt`, `LeaderboardRepository.kt`, `LeaderboardEntry.kt`, `DonationLeaderboardRepository.kt` |
| **Reading buddy** (avatar, stats, companion) | `ReadingBuddy.kt`, `ReadingBuddyPreferences.kt` |
| **Reading hub** (central dashboard) | `ReadingHubScreenSpec.kt`, `ReadingHubScreen` |
| **Community hub** (feed, activity) | `CommunityHubScreenSpec.kt`, `CommunityHubScreen`, `CommunityRepository.kt`, `CommunitySource.kt` |

**E2E Tests:** 8+

---

## Phase 12: Quote System + Discord

| Feature | IReader Source Files |
|---------|---------------------|
| **Quote creation** (select text → styled quote card) | `QuoteUseCases.kt`, `LocalQuoteUseCases.kt`, `Quote.kt`, `LocalQuote.kt`, `QuoteCardConstants.kt`, `QuoteCardStyleColors.kt` |
| **Quote styling** (fonts, colors, backgrounds, themes) | `QuoteStyleSelectorScreen.kt`, `QuoteStoryEditorScreen.kt` |
| **Quote gallery** (browse saved quotes) | `QuotesScreen` |
| **Discord webhook sharing** (auto-share quote) | `DiscordWebhookService.kt`, `DiscordQuoteRepository.kt` |
| **Discord widget** (online user count) | `DiscordWidgetRepository.kt`, `DiscordConfig.kt` |
| **Discord sharing** (share to Discord) | `DiscordShareRepository.kt` |

**E2E Tests:** 4+

---

## Phase 13: Character Art & Database

| Feature | IReader Source Files |
|---------|---------------------|
| **Character database** (track named characters per book) | `CharacterDatabase.kt`, `CharacterDatabaseManager.kt` (2 versions: plugin/characters + plugin/character) |
| **Character manager** (add/edit/delete characters) | `CharacterManager.kt` |
| **AI character art** (text→image generation) | `CharacterArt.kt`, `CharacterArtRepository.kt` |
| **Character art gallery** (browse generated art) | `CharacterArtGalleryScreenSpec.kt`, `CharacterArtGalleryScreen` |
| **Character art detail** (view/edit single) | `CharacterArtDetailScreenSpec.kt`, `CharacterArtDetailScreen` |
| **Character art upload** (upload custom images) | `CharacterArtUploadScreenSpec.kt`, `UploadCharacterArtScreen` |

**E2E Tests:** 4+

---

## Phase 14: Security & Privacy

| Feature | IReader Source Files |
|---------|---------------------|
| **App lock** (biometric + PIN) | `SecureScreen`, `BiometricAuthScreen`, `SecurityPreferences.kt`, `AuthMethod.kt` |
| **Secure storage** (encrypted prefs) | `SecureStorageHelper.kt`, `AndroidSecureSessionStorage.kt`, `KeyStorageService` |
| **Privacy settings** (disable analytics, incognito) | `PrivacyPreferences.kt`, `PrivacyMode.kt` |
| **Biometric authentication** | `BiometricAuthScreen`, `AuthenticationScreen` |
| **Security settings dashboard** | `SecuritySettingsScreen`, `SettingsSecurityScreen` |

**E2E Tests:** 3+

---

## Phase 15: Quality of Life

| Feature | IReader Source Files |
|---------|---------------------|
| **Cloudflare bypass** (FlareSolverr integration) | `CloudflareBypass.kt`, `CloudflareBypassPluginAdapter.kt`, `FlareSolverrClient.kt` |
| **Chapter health check** (detect broken content) | `ChapterHealthChecker.kt`, `ChapterHealth.kt` |
| **Source health/availability** | `CheckSourceAvailabilityUseCase.kt`, `SourceHealth.kt` |
| **Notification system** (new chapters, updates) | `NotificationService.kt`, `NotificationManagerUseCase.kt`, `NotificationData.kt`, `PlatformNotificationManager.kt` |
| **App update checker** (GitHub releases) | `UpdateService.kt`, `AppUpdateDownloadService.kt`, `UpdateApi.kt`, `Version.kt`, `Release.kt` |
| **Content filter default patterns** (built-in regexes) | `ReaderPreferences.kt: DEFAULT_CONTENT_FILTER_PATTERNS` |
| **Text replacement** (global find/replace) | `TextReplacementUseCase.kt`, `TextReplacementRepository.kt`, `TextReplacement.kt`, `TextReplacementScreen` |
| **Admin panel** (verify payment proofs, manage users) | `AdminUserPanelScreenSpec.kt`, `AdminUserRepository.kt`, `GetPendingPaymentProofsUseCase.kt`, `VerifyPaymentProofUseCase.kt` |
| **Debug tools** (plugin tester, network log) | `DiagnosticsScreen`, `DebugScreen` |
| **WebView reader mode** (render chapter in WebView) | `ReaderPreferences.kt: webViewIntegration`, `WebViewScreenSpec.kt` |
| **Extension trust levels** (security grading) | `ExtensionTrustLevel.kt`, `ExtensionSecurity.kt`, `ExtensionSecurityManager.kt` |
| **Source credentials** (per-source auth) | `SourceCredentialsRepository.kt` |

**E2E Tests:** 6+

---

## Phase 16: Donation & In-App Economy

| Feature | IReader Source Files |
|---------|---------------------|
| **Payment processor** (platform-specific: Android/Desktop/iOS) | `PaymentProcessor.kt`, `PaymentError.kt`, `PurchaseRepository.kt` |
| **Payment proof submission** (upload evidence) | `SubmitPaymentProofUseCase.kt`, `PaymentProof.kt` |
| **Donation leaderboard** (top donors) | `DonationLeaderboardEntry.kt`, `DonationLeaderboardUseCases.kt` |
| **Spirit stones** (in-app currency) | `SpiritStone.kt`, `EarnSpiritStonesUseCase.kt` |
| **Spirit stone shop** (buy items with stones) | `SpiritStoneShopScreen` |
| **Donation triggers** (prompts after reading N chapters) | `DonationTrigger.kt`, `DonationConfig.kt`, `DonationTriggerManager.kt`, `DonationTriggerIntegration.kt` |
| **Funding goals** (progress toward target) | `GetFundingGoalsUseCase.kt`, `UpdateFundingGoalUseCase.kt`, `FundingGoalRepository.kt` |
| **Feature store** (unlock features with purchase) | `FeatureStoreScreenSpec.kt`, `FeatureScreenScaffold` |
| **Trial system** (limited free trial) | `TrialInfo.kt`, `TrialRepositoryImpl.kt` |
| **Monetization service** (purchase management) | `MonetizationService.kt`, `PluginPurchase.kt` |

**E2E Tests:** 4+

---

## Combined Total

| Phase | Domain | Features | E2E Tests |
|-------|--------|----------|-----------|
| 1 | Reading Customization | 17 | 8+ |
| 2 | Bookmarks & Statistics | 9 | 6+ |
| 3 | Search & Source Management | 8 | 6+ |
| 4 | Download Management | 10 | 6+ |
| 5 | Translation Engines | 19 | 8+ |
| 6 | TTS Engine Expansion | 12 | 6+ |
| 7 | Local File Reading | 5 | 4+ |
| 8 | Backup V2 | 9 | 6+ |
| 9 | Cloud Sync | 11 | 8+ |
| 10 | Plugin System Expansion | 14 | 6+ |
| 11 | Community & Gamification | 10 | 8+ |
| 12 | Quote System + Discord | 6 | 4+ |
| 13 | Character Art & Database | 6 | 4+ |
| 14 | Security & Privacy | 5 | 3+ |
| 15 | Quality of Life | 12 | 6+ |
| 16 | Donation & In-App Economy | 10 | 4+ |
| **Total** | | **~159 features** | **~90+ tests** |

---

## Implementation Principles

1. **Reference IReader code, never copy.** Study UX + data models, rewrite in TypeScript/React.
2. **E2E test every phase.** Minimum 4 E2E tests per phase, covering happy path + edge cases.
3. **Never break existing API.** New fields only. Never remove existing endpoints.
4. **Plugin system is untouchable.** Don't modify the sandbox or loader.
5. **Mobile-first responsive.** All pages work at 375px viewport.
6. **Prioritize by novel-reading impact.** Phase 1-4 first. Community/gamification last.

---

## Quick Start

To begin Phase 1, confirm:
> "Execute Sprint 1 as Nova/Sage/Milo"

This spawns sub-agents to implement themes, fonts, layout, auto-scroll, brightness, color filters, and content filter with 8+ E2E tests.
