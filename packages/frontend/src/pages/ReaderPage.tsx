import { useEffect, useState, useCallback, useRef } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { api, type Page, type HistoryEntry } from '../api/client'
import { useReaderStore } from '../store/reader-store'
import { useHistoryStore } from '../store/history-store'
import { useTtsStore } from '../store/tts-store'
import { useTranslationStore } from '../store/translation-store'
import { WebtoonReader } from '@ireader/reader-engine'
import { PagerReader } from '@ireader/reader-engine'
import { TextReader } from '@ireader/reader-engine'
import { ReaderOverlay } from '@ireader/reader-engine'
import { ArrowLeft, Loader2, Volume2, Languages, ChevronLeft, ChevronRight } from 'lucide-react'

interface ChapterNav {
  id: string
  number: number
  title: string
}

export function ReaderPage() {
  const { sourceId, mangaId, chapterId } = useParams<{ sourceId: string; mangaId: string; chapterId: string }>()
  const navigate = useNavigate()

  const {
    mode, brightness, fontSize, currentPage, progress,
    setMode, setBrightness, setFontSize, setPage, setProgress,
    openChapter,
  } = useReaderStore()

  const { recordProgress } = useHistoryStore()
  const { speak, pause, resume, stop, state: ttsState, speed, setSpeed, setVoice, voices, selectedVoice } = useTtsStore()
  const { enabled: translationEnabled, targetLang } = useTranslationStore()

  const [pages, setPages] = useState<Page[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [overlayVisible, setOverlayVisible] = useState(false)
  const [textContent, setTextContent] = useState('')
  const [chapterTitle, setChapterTitle] = useState('')
  const [showTtsPanel, setShowTtsPanel] = useState(false)
  const [showTranslationPanel, setShowTranslationPanel] = useState(false)
  const [chapters, setChapters] = useState<ChapterNav[]>([])
  const [currentChapterIndex, setCurrentChapterIndex] = useState(-1)
  const [loadingNext, setLoadingNext] = useState(false)
  const [scrollRestored, setScrollRestored] = useState(false)
  const [initialScrollPos, setInitialScrollPos] = useState(0)

  const recordTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  // Fetch chapters list for navigation
  const fetchChaptersList = useCallback(async () => {
    if (!sourceId || !mangaId) return
    try {
      const detail = await api.getDetail(sourceId, mangaId)
      const list = detail.chapters.map((ch: { id: string; number: number; title?: string }) => ({
        id: ch.id,
        number: ch.number,
        title: ch.title || `Chapter ${ch.number}`,
      })).sort((a: ChapterNav, b: ChapterNav) => a.number - b.number)
      setChapters(list)
      const idx = list.findIndex((ch: ChapterNav) => ch.id === chapterId)
      setCurrentChapterIndex(idx)
    } catch {
      // Non-critical — chapter nav is a bonus
    }
  }, [sourceId, mangaId, chapterId])

  // Fetch pages on mount
  useEffect(() => {
    if (!sourceId || !chapterId) return
    setLoading(true)
    setError(null)
    setScrollRestored(false)

    openChapter(sourceId, mangaId ?? '', chapterId, 0)

    // Try to get pages
    api.getPages(sourceId, chapterId)
      .then(data => {
        setPages(data)
        setLoading(false)
      })
      .catch(err => {
        // If pages fail, try manga detail for text content
        if (mangaId) {
          api.getDetail(sourceId, mangaId)
            .then(detail => {
              setTextContent(detail.description || 'Chapter content in text mode.')
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

    fetchChaptersList()

    // Init TTS engine
    if (!useTtsStore.getState().engine) {
      useTtsStore.getState().initEngine()
    }
  }, [sourceId, mangaId, chapterId, fetchChaptersList])

  // Restore reading position from history
  useEffect(() => {
    if (loading || scrollRestored || !mangaId || !chapterId) return
    api.getHistory(mangaId)
      .then((history: HistoryEntry[]) => {
        const entry = history.find(h => h.chapterId === chapterId)
        if (entry && entry.scrollPosition > 0) {
          setPage(entry.page || 0, pages.length || 0)
          setInitialScrollPos(entry.scrollPosition)
        }
        setScrollRestored(true)
      })
      .catch(() => setScrollRestored(true))
  }, [loading, scrollRestored, mangaId, chapterId, pages.length])

  // Keyboard shortcuts
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement || e.target instanceof HTMLSelectElement) return

      switch (e.key) {
        case 'ArrowLeft':
          if (currentChapterIndex > 0) loadChapter(currentChapterIndex - 1)
          break
        case 'ArrowRight':
          if (currentChapterIndex < chapters.length - 1) loadChapter(currentChapterIndex + 1)
          break
        case 'Escape':
          setOverlayVisible(v => !v)
          break
        case 'f':
          // Toggle fullscreen
          if (document.fullscreenElement) {
            document.exitFullscreen()
          } else {
            document.documentElement.requestFullscreen()
          }
          break
        case 't':
          setMode(mode === 'webtoon' ? 'pager' : mode === 'pager' ? 'text' : 'webtoon')
          break
        case ' ':
          e.preventDefault()
          // Page down for pager mode
          if (mode === 'pager') {
            setPage(Math.min(currentPage + 1, pages.length), pages.length)
          }
          break
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [currentChapterIndex, chapters.length, mode, currentPage, pages.length])

  // Auto-load next chapter when reaching 95% on last page
  const handlePageChange = useCallback((page: number, scrollPos?: number) => {
    setPage(page, pages.length || 1)
    debouncedRecord(page, scrollPos ?? 0)

    // Auto-next: on last page of pager or scroll > 95%
    const isLastPage = mode === 'pager' && page >= (pages.length || 1) - 1
    const isNearEnd = mode === 'webtoon' && scrollPos && scrollPos > 85
    const textAlmostDone = mode === 'text' && progress > 0.95

    if ((isLastPage || isNearEnd) && currentChapterIndex < chapters.length - 1 && !loadingNext) {
      setLoadingNext(true)
      // Debounce auto-next to avoid accidental triggers
      setTimeout(() => {
        loadChapter(currentChapterIndex + 1)
      }, 800)
    } else if (textAlmostDone && currentChapterIndex < chapters.length - 1 && !loadingNext) {
      loadChapter(currentChapterIndex + 1)
    }
  }, [pages.length, mode, currentChapterIndex, chapters.length, loadingNext, progress])

  const debouncedRecord = useCallback((page: number, scrollPos: number) => {
    if (recordTimerRef.current) clearTimeout(recordTimerRef.current)
    recordTimerRef.current = setTimeout(() => {
      if (sourceId && mangaId && chapterId) {
        recordProgress({
          mangaId,
          sourceId,
          chapterId,
          chapterNumber: 0,
          page,
          scrollPosition: scrollPos,
        })
      }
    }, 1000)
  }, [sourceId, mangaId, chapterId, recordProgress])

  const loadChapter = useCallback((index: number) => {
    if (index < 0 || index >= chapters.length) return
    const ch = chapters[index]
    setLoadingNext(false)
    setScrollRestored(false)
    navigate(`/reader/${sourceId}/${mangaId}/${encodeURIComponent(ch.id)}`)
  }, [chapters, sourceId, mangaId, navigate])

  const handleCenterTap = useCallback(() => {
    setOverlayVisible(v => !v)
    setShowTtsPanel(false)
    setShowTranslationPanel(false)
  }, [])

  const handleTtsPlay = useCallback(() => {
    if (ttsState === 'speaking') {
      pause()
    } else if (ttsState === 'paused') {
      resume()
    } else {
      const content = textContent || pages.map(p => `Page ${p.index + 1}`).join(', ')
      speak(content)
    }
  }, [ttsState, textContent, pages])

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
          initialScrollPos={initialScrollPos}
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

      {/* Chapter navigation — visible on tap overlay */}
      {overlayVisible && chapters.length > 1 && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-30 flex items-center gap-3 bg-surface/90 backdrop-blur-sm rounded-full px-4 py-2 border border-border-light shadow-lg">
          <button
            onClick={() => currentChapterIndex > 0 && loadChapter(currentChapterIndex - 1)}
            disabled={currentChapterIndex <= 0}
            className={`w-8 h-8 flex items-center justify-center rounded-full transition-colors ${
              currentChapterIndex <= 0
                ? 'text-text-muted/30 cursor-not-allowed'
                : 'text-text hover:bg-surface-hover'
            }`}
            title="Previous chapter (←)"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <span className="text-[11px] text-text-muted min-w-[100px] text-center font-medium">
            Ch. {chapters[currentChapterIndex]?.number || '?'} / {chapters.length}
          </span>
          <button
            onClick={() => currentChapterIndex < chapters.length - 1 && loadChapter(currentChapterIndex + 1)}
            disabled={currentChapterIndex >= chapters.length - 1}
            className={`w-8 h-8 flex items-center justify-center rounded-full transition-colors ${
              currentChapterIndex >= chapters.length - 1
                ? 'text-text-muted/30 cursor-not-allowed'
                : 'text-text hover:bg-surface-hover'
            }`}
            title="Next chapter (→)"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Auto-next loading indicator */}
      {loadingNext && (
        <div className="absolute bottom-16 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2 bg-surface/80 backdrop-blur-sm rounded-full px-3 py-1.5 border border-border-light shadow">
          <Loader2 className="w-3 h-3 text-accent animate-spin" strokeWidth={2} />
          <span className="text-[10px] text-text-muted font-medium">Loading next…</span>
        </div>
      )}

      {/* Floating TTS button */}
      {mode === 'text' && textContent && (
        <button
          onClick={handleTtsPlay}
          className="absolute bottom-20 right-4 z-30 w-10 h-10 rounded-full bg-accent text-black flex items-center justify-center shadow-lg hover:scale-105 transition-transform"
          title={ttsState === 'speaking' ? 'Pause' : ttsState === 'paused' ? 'Resume' : 'Read aloud'}
        >
          <Volume2 className="w-5 h-5" />
        </button>
      )}

      {/* TTS speed controls */}
      {ttsState !== 'idle' && (
        <div className="absolute bottom-32 right-4 z-30 bg-surface/90 backdrop-blur-sm rounded-xl p-3 border border-border-light shadow-lg min-w-[160px]">
          <div className="flex items-center gap-2 mb-2">
            <Volume2 className="w-3.5 h-3.5 text-accent" />
            <span className="text-xs font-medium text-text">
              {ttsState === 'speaking' ? 'Playing' : 'Paused'} • {speed}x
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={() => setSpeed(Math.max(0.5, speed - 0.25))} className="w-6 h-6 flex items-center justify-center rounded bg-white/10 text-text text-xs">−</button>
            <input
              type="range"
              min={0.5}
              max={3}
              step={0.25}
              value={speed}
              onChange={e => setSpeed(Number(e.target.value))}
              className="flex-1 h-1 appearance-none bg-white/20 rounded-full accent-[hsl(var(--accent))]"
            />
            <button onClick={() => setSpeed(Math.min(3, speed + 0.25))} className="w-6 h-6 flex items-center justify-center rounded bg-white/10 text-text text-xs">+</button>
          </div>
          {voices.length > 0 && (
            <select
              value={selectedVoice ?? ''}
              onChange={e => setVoice(e.target.value)}
              className="mt-2 w-full text-xs bg-white/10 rounded-lg p-1 text-text border border-border-light"
            >
              {voices.map(v => (
                <option key={v.id} value={v.id}>{v.name} ({v.lang})</option>
              ))}
            </select>
          )}
          <button onClick={stop} className="mt-2 w-full text-xs text-danger hover:underline">Stop</button>
        </div>
      )}

      {/* Translation panel toggle */}
      {translationEnabled && mode === 'text' && (
        <button
          onClick={() => setShowTranslationPanel(v => !v)}
          className="absolute bottom-20 right-20 z-30 w-10 h-10 rounded-full bg-accent/20 text-accent flex items-center justify-center hover:bg-accent/30 transition-colors"
          title="Translation"
        >
          <Languages className="w-5 h-5" />
        </button>
      )}

      {/* Tap zone for overlay (webtoon/text) */}
      {mode !== 'pager' && (
        <div
          className="absolute inset-0 z-20 cursor-pointer"
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

      {/* Top bar */}
      {!overlayVisible && (
        <div className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between px-3 py-2 bg-gradient-to-b from-black/50 to-transparent pointer-events-none">
          <button
            onClick={() => navigate(-1)}
            className="pointer-events-auto w-9 h-9 flex items-center justify-center rounded-lg bg-black/40 backdrop-blur-sm text-white hover:bg-black/60 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>

          {/* Chapter number in top bar */}
          <span className="text-[11px] text-white/70 font-medium bg-black/30 px-2.5 py-1 rounded-full backdrop-blur-sm pointer-events-auto">
            {currentChapterIndex >= 0
              ? `Ch. ${chapters[currentChapterIndex]?.number || '?'}`
              : 'Reader'}
          </span>
        </div>
      )}
    </div>
  )
}