import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Layout } from './components/Layout'
import { ThemeProvider } from './components/ThemeProvider'
import { HomePage } from './pages/HomePage'
import { SourcesPage } from './pages/SourcesPage'
import { BrowsePage } from './pages/BrowsePage'
import { SearchPage } from './pages/SearchPage'
import { MangaDetailPage } from './pages/MangaDetailPage'
import { LibraryPage } from './pages/LibraryPage'
import { UpdatesPage } from './pages/UpdatesPage'
import { HistoryPage } from './pages/HistoryPage'
import { ReaderPage } from './pages/ReaderPage'
import { DownloadsPage } from './pages/DownloadsPage'
import { SettingsPage } from './pages/SettingsPage'
import { MorePage } from './pages/MorePage'

export function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/library" element={<LibraryPage />} />
            <Route path="/sources" element={<SourcesPage />} />
            <Route path="/sources/:sourceId" element={<BrowsePage />} />
            <Route path="/sources/:sourceId/search" element={<SearchPage />} />
            <Route path="/sources/:sourceId/manga/:mangaId" element={<MangaDetailPage />} />
            <Route path="/updates" element={<UpdatesPage />} />
            <Route path="/history" element={<HistoryPage />} />
            <Route path="/reader/:sourceId/:mangaId/:chapterId" element={<ReaderPage />} />
            <Route path="/downloads" element={<DownloadsPage />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="/more" element={<MorePage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  )
}
