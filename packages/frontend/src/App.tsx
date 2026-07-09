import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Layout } from './components/Layout'
import { ThemeProvider } from './components/ThemeProvider'
import { HomePage } from './pages/HomePage'
import { SourcesPage } from './pages/SourcesPage'
import { BrowsePage } from './pages/BrowsePage'
import { SearchPage } from './pages/SearchPage'
import { MangaDetailPage } from './pages/MangaDetailPage'

export function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/sources" element={<SourcesPage />} />
            <Route path="/sources/:sourceId" element={<BrowsePage />} />
            <Route path="/sources/:sourceId/search" element={<SearchPage />} />
            <Route path="/sources/:sourceId/manga/:mangaId" element={<MangaDetailPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  )
}
