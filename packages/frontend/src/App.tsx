import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import React, { Suspense } from 'react'
import { Layout } from './components/Layout'
import { ThemeProvider } from './components/ThemeProvider'
import { OnboardingGuard } from './components/OnboardingGuard'
import { SkipToContent } from './hooks/useAccessibility'

// Eager imports for critical-first-load pages
import { OnboardingPage } from './pages/OnboardingPage'

// Lazy-loaded pages for code splitting (named exports → default via .then)
const SourcesPage = React.lazy(() => import('./pages/SourcesPage').then(m => ({ default: m.SourcesPage })))
const SourceManagerPage = React.lazy(() => import('./pages/SourceManagerPage').then(m => ({ default: m.SourceManagerPage })))
const BrowsePage = React.lazy(() => import('./pages/BrowsePage').then(m => ({ default: m.BrowsePage })))
const SearchPage = React.lazy(() => import('./pages/SearchPage').then(m => ({ default: m.SearchPage })))
const GlobalSearchPage = React.lazy(() => import('./pages/GlobalSearchPage').then(m => ({ default: m.GlobalSearchPage })))
const MangaDetailPage = React.lazy(() => import('./pages/MangaDetailPage').then(m => ({ default: m.MangaDetailPage })))
const LibraryPage = React.lazy(() => import('./pages/LibraryPage').then(m => ({ default: m.LibraryPage })))
const UpdatesPage = React.lazy(() => import('./pages/UpdatesPage').then(m => ({ default: m.UpdatesPage })))
const HistoryPage = React.lazy(() => import('./pages/HistoryPage').then(m => ({ default: m.HistoryPage })))
const ReaderPage = React.lazy(() => import('./pages/ReaderPage').then(m => ({ default: m.ReaderPage })))
const DownloadsPage = React.lazy(() => import('./pages/DownloadsPage').then(m => ({ default: m.DownloadsPage })))
const SettingsPage = React.lazy(() => import('./pages/SettingsPage').then(m => ({ default: m.SettingsPage })))
const TtsSettingsPage = React.lazy(() => import('./pages/TtsSettingsPage').then(m => ({ default: m.TtsSettingsPage })))
const TranslationSettingsPage = React.lazy(() => import('./pages/TranslationSettingsPage').then(m => ({ default: m.TranslationSettingsPage })))
const MorePage = React.lazy(() => import('./pages/MorePage').then(m => ({ default: m.MorePage })))
const BackupPage = React.lazy(() => import('./pages/BackupPage').then(m => ({ default: m.BackupPage })))
const CloudBackupPage = React.lazy(() => import('./pages/CloudBackupPage').then(m => ({ default: m.CloudBackupPage })))
const PluginManagerPage = React.lazy(() => import('./pages/PluginManagerPage').then(m => ({ default: m.PluginManagerPage })))
const AppearanceSettingsPage = React.lazy(() => import('./pages/AppearanceSettingsPage').then(m => ({ default: m.AppearanceSettingsPage })))
const SecuritySettingsPage = React.lazy(() => import('./pages/SecuritySettingsPage').then(m => ({ default: m.SecuritySettingsPage })))
const NetworkSettingsPage = React.lazy(() => import('./pages/NetworkSettingsPage').then(m => ({ default: m.NetworkSettingsPage })))
const AdvancedSettingsPage = React.lazy(() => import('./pages/AdvancedSettingsPage').then(m => ({ default: m.AdvancedSettingsPage })))
const GeneralSettingsPage = React.lazy(() => import('./pages/GeneralSettingsPage').then(m => ({ default: m.GeneralSettingsPage })))
const DownloadSettingsPage = React.lazy(() => import('./pages/DownloadSettingsPage').then(m => ({ default: m.DownloadSettingsPage })))
const StoragePage = React.lazy(() => import('./pages/StoragePage').then(m => ({ default: m.StoragePage })))
const SourceSettingsPage = React.lazy(() => import('./pages/SourceSettingsPage').then(m => ({ default: m.SourceSettingsPage })))
const AboutPage = React.lazy(() => import('./pages/AboutPage').then(m => ({ default: m.AboutPage })))
const ReadingStatsPage = React.lazy(() => import('./pages/ReadingStatsPage').then(m => ({ default: m.ReadingStatsPage })))
const StreaksDetailPage = React.lazy(() => import('./pages/StreaksPage').then(m => ({ default: m.StreaksDetailPage })))
const ProfilePage = React.lazy(() => import('./pages/ProfilePage').then(m => ({ default: m.ProfilePage })))
const CommunityPage = React.lazy(() => import('./pages/CommunityPage').then(m => ({ default: m.CommunityPage })))
const LeaderboardPage = React.lazy(() => import('./pages/LeaderboardPage').then(m => ({ default: m.LeaderboardPage })))
const QuotesPage = React.lazy(() => import('./pages/QuotesPage').then(m => ({ default: m.QuotesPage })))
const CharacterArtPage = React.lazy(() => import('./pages/CharacterArtPage').then(m => ({ default: m.CharacterArtPage })))

function PageLoader() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="flex flex-col items-center gap-3">
        <div className="w-8 h-8 border-2 border-accent/30 border-t-accent rounded-full animate-spin" />
        <span className="text-sm text-text-muted">Loading...</span>
      </div>
    </div>
  )
}

export function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <SkipToContent />
        <OnboardingGuard>
          <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/onboarding" element={<OnboardingPage />} />
            <Route element={<Layout />}>
              <Route path="/" element={<Navigate to="/library" replace />} />
              <Route path="/library" element={<LibraryPage />} />
              <Route path="/sources" element={<SourcesPage />} />
              <Route path="/sources/:sourceId" element={<BrowsePage />} />
              <Route path="/sources/:sourceId/search" element={<SearchPage />} />
              <Route path="/sources/manager" element={<SourceManagerPage />} />
              <Route path="/global-search" element={<GlobalSearchPage />} />
              <Route path="/sources/:sourceId/manga/:mangaId" element={<MangaDetailPage />} />
              <Route path="/updates" element={<UpdatesPage />} />
              <Route path="/history" element={<HistoryPage />} />
              <Route path="/reader/:sourceId/:mangaId/:chapterId" element={<ReaderPage />} />
              <Route path="/downloads" element={<DownloadsPage />} />
              <Route path="/settings" element={<SettingsPage />} />
              <Route path="/settings/tts" element={<TtsSettingsPage />} />
              <Route path="/settings/translation" element={<TranslationSettingsPage />} />
              <Route path="/settings/appearance" element={<AppearanceSettingsPage />} />
              <Route path="/settings/security" element={<SecuritySettingsPage />} />
              <Route path="/settings/network" element={<NetworkSettingsPage />} />
              <Route path="/settings/general" element={<GeneralSettingsPage />} />
              <Route path="/settings/download" element={<DownloadSettingsPage />} />
              <Route path="/settings/storage" element={<StoragePage />} />
              <Route path="/settings/sources" element={<SourceSettingsPage />} />
              <Route path="/settings/advanced" element={<AdvancedSettingsPage />} />
              <Route path="/more" element={<MorePage />} />
              <Route path="/backup" element={<BackupPage />} />
              <Route path="/backup/cloud" element={<CloudBackupPage />} />
              <Route path="/plugins" element={<PluginManagerPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/stats" element={<ReadingStatsPage />} />
              <Route path="/stats/streaks" element={<StreaksDetailPage />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/community" element={<CommunityPage />} />
              <Route path="/leaderboard" element={<LeaderboardPage />} />
              <Route path="/quotes" element={<QuotesPage />} />
              <Route path="/character-art/:mangaId" element={<CharacterArtPage />} />
            </Route>
          </Routes>
          </Suspense>
        </OnboardingGuard>
      </BrowserRouter>
    </ThemeProvider>
  )
}
