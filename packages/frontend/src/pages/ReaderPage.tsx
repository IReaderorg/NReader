import { useEffect, useState, useCallback, useRef } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { api, type Page } from '../api/client'
import { useReaderStore } from '../store/reader-store'
import { useHistoryStore } from '../store/history-store'
import { WebtoonReader } from '@ireader/reader-engine'
import { PagerReader } from '@ireader/reader-engine'
import { TextReader } from '@ireader/reader-engine'
import { ReaderOverlay } from '@ireader/reader-engine'
import { ArrowLeft, Loader2 } from 'lucide-react'

export function ReaderPage() {
  const { sourceId, mangaId, chapterId } = useParams<{ sourceId: string; mangaId: string; chapterId: string }>()
  const navigate = useNavigate()

  const {
    mode, brightness, fontSize, currentPage, progress,
    setMode, setBrightness, setFontSize, setPage, setProgress,
    openChapter,
  } = useReaderStore()

  const { recordProgress } = useHistoryStore()

  const [pages, setPages] = useState<Page[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [overlayVisible, setOverlayVisible] = useState(false)
  const [textContent, setTextContent] = useState('')
  const [chapterTitle, setChapterTitle] = useState('')

  const recordTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  // Fetch pages on mount
  useEffect(() => {
    if (!sourceId || !chapterId) return
    setLoading(true)
    setError(null)

    openChapter(sourceId, mangaId ?? '', chapterId, 0)

    // Try to get pages (for webtoon/pager modes)
    api.getPages(sourceId, chapterId)
      .then(data => {
        setPages(data)
        setLoading(false)
      })
      .catch(err => {
        // If pages fail, try to get manga detail for text content
        if (mangaId) {
          api.getDetail(sourceId, mangaId)
            .then(detail => {
              // Find the chapter content (text mode)
              setTextContent(detail.description || 'Chapter content would appear here in text mode.')
              setChapterTitle(detail.title)
              setLoading(false)
            })
            .catch(err2 => {
              setError(err.message || err2.message)
              setLoading(false)
            })
        } else {
          setError(err.message)
          setLoading(false)
        }
      })
  }, [sourceId, mangaId, chapterId]) // eslint-disable-line react-hooks/exhaustive-deps

  // Debounced history recording
  const debouncedRecord = useCallback((page: number, scrollPos: number) => {
    if (recordTimerRef.current) clearTimeout(recordTimerRef.current)
    recordTimerRef.current = setTimeout(() => {
      if (sourceId && mangaId && chapterId) {
        recordProgress({
          mangaId,
          sourceId,
          chapterId,
          chapterNumber: 0, // Would need chapter number from store
          page,
          scrollPosition: scrollPos,
        })
      }
    }, 1000)
  }, [sourceId, mangaId, chapterId, recordProgress])

  const handlePageChange = useCallback((page: number, scrollPos?: number) => {
    setPage(page, pages.length)
    debouncedRecord(page, scrollPos ?? 0)
  }, [pages.length, setPage, debouncedRecord])

  const handleCenterTap = useCallback(() => {
    setOverlayVisible(v => !v)
  }, [])

  // Render loading state
  if (loading) return (
    <div className="fixed inset-0 z-40 bg-black flex items-center justify-center">
      <div className="flex flex-col items-center gap-3">
        <Loader2 className="w-6 h-6 text-accent animate-spin" strokeWidth={1.5} />
        <p className="text-xs text-text-muted">Loading chapter…</p>
      </div>
    </div>
  )

  if (error) return (
    <div className="fixed inset-0 z-40 bg-black flex flex-col items-center justify-center gap-3">
      <p className="text-sm text-danger">{error}</p>
      <button onClick={() => navigate(-1)} className="text-xs text-accent hover:underline">Go back</button>
    </div>
  )

  const readerBrightness = brightness / 100

  return (
    <div className="fixed inset-0 z-40 flex flex-col" style={{ filter: `brightness(${readerBrightness})` }}>
      {/* Reader content area */}
      {mode === 'webtoon' && (
        <WebtoonReader
          pages={pages}
          onPageChange={(page, scrollPos) => handlePageChange(page, scrollPos)}
          className="flex-1 bg-black"
        />
      )}

      {mode === 'pager' && (
        <PagerReader
          pages={pages}
          direction="ltr"
          onPageChange={(page) => handlePageChange(page, 0)}
          onCenterTap={handleCenterTap}
          className="flex-1"
        />
      )}

      {mode === 'text' && (
        <TextReader
          content={textContent}
          fontSize={fontSize}
          onProgressChange={(pct) => setProgress(pct)}
          className="flex-1 bg-[hsl(var(--bg))]"
        />
      )}

      {/* Tap zone for toggling overlay (webtoon/text modes) */}
      {mode !== 'pager' && (
        <div
          className="absolute inset-0 z-30 cursor-pointer"
          onClick={handleCenterTap}
        />
      )}

      {/* Reader overlay */}
      <ReaderOverlay
        currentMode={mode}
        onModeChange={setMode}
        brightness={brightness}
        onBrightnessChange={setBrightness}
        fontSize={fontSize}
        onFontSizeChange={setFontSize}
        currentPage={currentPage}
        totalPages={pages.length}
        progress={progress}
        visible={overlayVisible}
        onClose={() => setOverlayVisible(false)}
      />

      {/* Top bar with back button (hidden when overlay is visible) */}
      {!overlayVisible && (
        <div className="absolute top-0 left-0 right-0 z-20 flex items-center px-3 py-2 bg-gradient-to-b from-black/50 to-transparent pointer-events-none">
          <button
            onClick={() => navigate(-1)}
            className="pointer-events-auto w-9 h-9 flex items-center justify-center rounded-lg bg-black/40 backdrop-blur-sm text-white hover:bg-black/60 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
        </div>
      )}
    </div>
  )
}
