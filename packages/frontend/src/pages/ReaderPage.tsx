import { useEffect, useState, useCallback, useRef } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { api, type Page, type HistoryEntry } from '../api/client'
import { useReaderStore } from '../store/reader-store'
import { useHistoryStore } from '../store/history-store'
import { useTtsStore } from '../store/tts-store'
import { useTranslationStore } from '../store/translation-store'
import { WebtoonReader, PagerReader, TextReader } from '@ireader/reader-engine'
import { Loader2, Languages, Volume2, Gauge } from 'lucide-react'
import { ReaderTopBar } from '../components/ReaderTopBar'
import { ReaderBottomBar } from '../components/ReaderBottomBar'
import { FindInChapterBar } from '../components/FindInChapterBar'
import { ReadingTimeIndicator } from '../components/ReadingTimeIndicator'
import { ReaderSettingsSheet } from '../components/ReaderSettingsSheet'
import { ChapterDrawer } from '../components/ChapterDrawer'
import { ReportChapterDialog } from '../components/ReportChapterDialog'
import { TtsControlSheet } from '../components/TtsControlSheet'
import { ReadingStatsPanel } from '../components/ReadingStatsPanel'
import type { IssueCategory } from '../components/ReportChapterDialog'
import type { ReaderThemeColors } from '@ireader/reader-engine'

interface ChapterNav {
  id: string
  number: number
  title: string
  date?: string
}

/** Compute all match positions for a query in text */
function computeMatches(text: string, query: string): number[] {
  if (!query.trim()) return []
  const lower = text.toLowerCase()
  const q = query.toLowerCase()
  const positions: number[] = []
  let idx = 0
  while ((idx = lower.indexOf(q, idx)) !== -1) {
    positions.push(idx)
    idx += q.length
  }
  return positions
}

export function ReaderPage() {
  const { sourceId, mangaId, chapterId } = useParams<{ sourceId: string; mangaId: string; chapterId: string }>()
  const navigate = useNavigate()

  const {
    mode, brightness, fontSize, currentPage, progress,
    selectedThemeId,
    lineHeight, paragraphSpacing, paragraphIndent, textAlignment,
    colorFilter, contentFilterEnabled, contentFilterPatterns,
    setMode,
    immersiveMode, showScrollbar, showReadingTime, volumeNavigation,
    screenAwake, reducedAnimations,
    isBookmarked, setBookmarked,
    openChapter,
  } = useReaderStore()

  const { recordProgress } = useHistoryStore()
  const { speak, pause, resume, state: ttsState } = useTtsStore()
  const { enabled: translationEnabled } = useTranslationStore()

  // Data state
  const [pages, setPages] = useState<Page[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [textContent, setTextContent] = useState('')
  const [chapterTitle, setChapterTitle] = useState('')
  const [chapters, setChapters] = useState<ChapterNav[]>([])
  const [currentChapterIndex, setCurrentChapterIndex] = useState(-1)
  const [loadingNext, setLoadingNext] = useState(false)
  const [scrollRestored, setScrollRestored] = useState(false)
  const [initialScrollPos, setInitialScrollPos] = useState(0)
  const [availableThemes, setAvailableThemes] = useState<{ id: string; name: string; colors: Record<string, string> }[]>([])

  // UI state
  const [settingsSheetVisible, setSettingsSheetVisible] = useState(false)
  const [chapterDrawerVisible, setChapterDrawerVisible] = useState(false)
  const [barsVisible, setBarsVisible] = useState(!immersiveMode)
  const [showTranslationPanel, setShowTranslationPanel] = useState(false)
  void showTranslationPanel; void setShowTranslationPanel
  const [reportDialogVisible, setReportDialogVisible] = useState(false)
  const [ttsSheetVisible, setTtsSheetVisible] = useState(false)
  const [statsVisible, setStatsVisible] = useState(false)

  // Find in chapter
  const [findVisible, setFindVisible] = useState(false)
  const [findMatchCount, setFindMatchCount] = useState(0)
  const [findCurrent, setFindCurrent] = useState(0)
  const findPositionsRef = useRef<number[]>([])

  // Reading session timer
  const [sessionStartTime] = useState(() => Date.now())
  const [chaptersRead, setChaptersRead] = useState(1)

  const recordTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  // --- Data fetching ---
  const fetchChaptersList = useCallback(async () => {
    if (!sourceId || !mangaId) return
    try {
      const detail = await api.getDetail(sourceId, mangaId)
      const list = detail.chapters.map((ch: { id: string; number: number; title?: string; date?: string }) => ({
        id: ch.id,
        number: ch.number,
        title: ch.title || `Chapter ${ch.number}`,
        date: ch.date,
      })).sort((a: ChapterNav, b: ChapterNav) => a.number - b.number)
      setChapters(list)
      const idx = list.findIndex((ch: ChapterNav) => ch.id === chapterId)
      setCurrentChapterIndex(idx)
    } catch { /* non-critical */ }
  }, [sourceId, mangaId, chapterId])

  useEffect(() => {
    if (!sourceId || !chapterId) return
    setLoading(true)
    setError(null)
    setScrollRestored(false)
    setFindVisible(false)

    openChapter(sourceId, mangaId ?? '', chapterId, 0)

    api.getPages(sourceId, chapterId)
      .then(data => {
        setPages(data)
        setLoading(false)
      })
      .catch(err => {
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

    // Fetch initial bookmark status
    api.getBookmarkStatus(chapterId)
      .then(res => setBookmarked(res.bookmarked))
      .catch(() => {})

    if (!useTtsStore.getState().engine) {
      useTtsStore.getState().initEngine()
    }
  }, [sourceId, mangaId, chapterId, fetchChaptersList])

  // Restore reading position
  useEffect(() => {
    if (loading || scrollRestored || !mangaId || !chapterId) return
    api.getHistory(mangaId)
      .then((history: HistoryEntry[]) => {
        const entry = history.find(h => h.chapterId === chapterId)
        if (entry && entry.scrollPosition > 0) {
          useReaderStore.getState().setPage(entry.page || 0, pages.length || 0)
          setInitialScrollPos(entry.scrollPosition)
        }
        setScrollRestored(true)
      })
      .catch(() => setScrollRestored(true))
  }, [loading, scrollRestored, mangaId, chapterId, pages.length])

  useEffect(() => {
    api.getThemes().then(setAvailableThemes).catch(() => {})
  }, [])

  const selectedThemeColors = availableThemes.find(t => t.id === selectedThemeId)?.colors as ReaderThemeColors | undefined

  // --- Chapter navigation ---
  const loadChapter = useCallback((index: number) => {
    if (index < 0 || index >= chapters.length) return
    const ch = chapters[index]
    if (!ch) return
    setChaptersRead(prev => prev + 1)
    setLoadingNext(false)
    setScrollRestored(false)
    navigate(`/reader/${sourceId}/${mangaId}/${encodeURIComponent(ch.id)}`)
  }, [chapters, sourceId, mangaId, navigate])

  // --- Page/scroll handling ---
  const handlePageChange = useCallback((page: number, scrollPos?: number) => {
    const store = useReaderStore.getState()
    store.setPage(page, pages.length || 1)
    debouncedRecord(page, scrollPos ?? 0)

    const isLastPage = mode === 'pager' && page >= (pages.length || 1) - 1
    const isNearEnd = mode === 'webtoon' && scrollPos && scrollPos > 85
    const textAlmostDone = mode === 'text' && progress > 0.95

    if ((isLastPage || isNearEnd) && currentChapterIndex < chapters.length - 1 && !loadingNext) {
      setLoadingNext(true)
      setTimeout(() => loadChapter(currentChapterIndex + 1), 800)
    } else if (textAlmostDone && currentChapterIndex < chapters.length - 1 && !loadingNext) {
      loadChapter(currentChapterIndex + 1)
    }
  }, [pages.length, mode, currentChapterIndex, chapters.length, loadingNext, progress, loadChapter])

  const debouncedRecord = useCallback((page: number, scrollPos: number) => {
    if (recordTimerRef.current) clearTimeout(recordTimerRef.current)
    recordTimerRef.current = setTimeout(() => {
      if (sourceId && mangaId && chapterId) {
        recordProgress({ mangaId, sourceId, chapterId, chapterNumber: 0, page, scrollPosition: scrollPos })
      }
    }, 1000)
  }, [sourceId, mangaId, chapterId, recordProgress])

  // --- Immersive mode / tap handling ---
  const toggleBars = useCallback(() => {
    setBarsVisible(v => !v)
    setSettingsSheetVisible(false)
    setChapterDrawerVisible(false)
    setFindVisible(false)
  }, [])

  const handleChapterSelect = useCallback((index: number) => {
    loadChapter(index)
  }, [loadChapter])

  // --- TTS ---
  const handleTtsToggle = useCallback(() => {
    if (ttsState === 'speaking') {
      pause()
    } else if (ttsState === 'paused') {
      resume()
    } else {
      const content = textContent || pages.map(p => `Page ${p.index + 1}`).join('. ')
      speak(content)
    }
  }, [ttsState, textContent, pages, speak, pause, resume])

  // --- Find in chapter ---
  const handleFindQueryChange = useCallback((query: string) => {
    setFindCurrent(0)

    if (!query.trim()) {
      setFindMatchCount(0)
      findPositionsRef.current = []
      return
    }

    const textContainer = document.querySelector('[data-reader-content]')
    const text = textContainer?.textContent || ''
    const positions = computeMatches(text, query)
    findPositionsRef.current = positions
    setFindMatchCount(positions.length)

    // Scroll to first match
    if (positions.length > 0 && textContainer) {
      const scrollRatio = text.length > 0 ? (positions[0] ?? 0) / text.length : 0
      textContainer.scrollTo({ top: scrollRatio * textContainer.scrollHeight, behavior: 'smooth' })
    }
  }, [])

  const findNext = useCallback(() => {
    if (findPositionsRef.current.length === 0) return
    const next = (findCurrent + 1) % findPositionsRef.current.length
    setFindCurrent(next)
    scrollToFindMatch(next)
  }, [findCurrent])

  const findPrev = useCallback(() => {
    if (findPositionsRef.current.length === 0) return
    const prev = (findCurrent - 1 + findPositionsRef.current.length) % findPositionsRef.current.length
    setFindCurrent(prev)
    scrollToFindMatch(prev)
  }, [findCurrent])

  const scrollToFindMatch = useCallback((index: number) => {
    const textContainer = document.querySelector('[data-reader-content]')
    if (!textContainer) return
    const pos = findPositionsRef.current[index]
    if (pos === undefined) return
    const text = textContainer.textContent || ''
    const scrollRatio = text.length > 0 ? pos / text.length : 0
    textContainer.scrollTo({ top: scrollRatio * textContainer.scrollHeight, behavior: 'smooth' })
  }, [])

  // --- Keyboard shortcuts ---
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement || e.target instanceof HTMLSelectElement) return

      switch (e.key) {
        case 'ArrowLeft':
          if (findVisible) { findPrev(); break }
          if (currentChapterIndex > 0) loadChapter(currentChapterIndex - 1)
          break
        case 'ArrowRight':
          if (findVisible) { findNext(); break }
          if (currentChapterIndex < chapters.length - 1) loadChapter(currentChapterIndex + 1)
          break
        case 'Escape':
          if (findVisible) { setFindVisible(false); break }
          if (settingsSheetVisible) { setSettingsSheetVisible(false); setBarsVisible(true); break }
          setBarsVisible(v => !v)
          break
        case 'f':
          if (!findVisible) {
            e.preventDefault()
            setFindVisible(true)
            setBarsVisible(true)
          }
          break
        case 't':
          setMode(mode === 'webtoon' ? 'pager' : mode === 'pager' ? 'text' : 'webtoon')
          break
        case ' ':
          e.preventDefault()
          if (mode === 'pager') {
            useReaderStore.getState().setPage(Math.min(currentPage + 1, pages.length), pages.length)
          }
          break
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [currentChapterIndex, chapters.length, mode, currentPage, pages.length, settingsSheetVisible, findVisible, findNext, findPrev, loadChapter, setMode])

  // --- Volume key navigation (for devices with volume buttons) ---
  useEffect(() => {
    if (!volumeNavigation) return
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'AudioVolumeDown' || e.key === 'F8' || (e.key === 'ArrowDown' && e.altKey)) {
        e.preventDefault()
        if (currentChapterIndex < chapters.length - 1) loadChapter(currentChapterIndex + 1)
      } else if (e.key === 'AudioVolumeUp' || e.key === 'F7' || (e.key === 'ArrowUp' && e.altKey)) {
        e.preventDefault()
        if (currentChapterIndex > 0) loadChapter(currentChapterIndex - 1)
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [currentChapterIndex, chapters.length, loadChapter, volumeNavigation])

  // --- Screen Wake Lock ---
  useEffect(() => {
    let wakeLock: { release: () => Promise<void> } | null = null
    if (screenAwake && 'wakeLock' in navigator) {
      (navigator as any).wakeLock.request('screen')
        .then((lock: any) => { wakeLock = lock })
        .catch(() => {})
    }
    return () => {
      if (wakeLock) wakeLock.release().catch(() => {})
    }
  }, [screenAwake])

  // --- Render ---
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
  const currentChapter = chapters[currentChapterIndex]
  const chapterDisplayTitle = chapterTitle || currentChapter?.title || 'Reader'

  return (
    <div className={`fixed inset-0 z-40 flex flex-col bg-black ${!showScrollbar ? 'scrollbar-none' : ''} ${reducedAnimations ? 'motion-reduce' : ''}`} style={{ filter: `brightness(${readerBrightness})` }}>
      {/* --- Reader Content --- */}
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
          onCenterTap={toggleBars}
          className="flex-1"
        />
      )}
      {mode === 'text' && (
        <TextReader
          content={textContent}
          fontSize={fontSize}
          lineHeight={lineHeight}
          paragraphSpacing={paragraphSpacing}
          paragraphIndent={paragraphIndent}
          textAlignment={textAlignment}
          colorFilter={colorFilter}
          themeColors={selectedThemeColors}
          contentFilterEnabled={contentFilterEnabled}
          contentFilterPatterns={contentFilterPatterns}
          onProgressChange={(pct) => useReaderStore.getState().setProgress(pct)}
          className="flex-1"
        />
      )}

      {/* --- Tap zone for non-pager modes --- */}
      {mode !== 'pager' && (
        <div className="absolute inset-0 z-20 cursor-pointer" onClick={toggleBars} onDoubleClick={toggleBars} />
      )}

      {/* --- Top Bar --- */}
      <ReaderTopBar
        title={chapterDisplayTitle}
        onBack={() => navigate(-1)}
        onRefresh={() => fetchChaptersList()}
        onRefreshRemote={() => {
          if (sourceId && chapterId) {
            api.getPages(sourceId, chapterId).then(setPages).catch(() => {})
          }
        }}
        onBookmark={async () => {
          if (chapterId) {
            try {
              const res = await api.toggleBookmark(chapterId)
              setBookmarked(res.bookmarked)
            } catch { /* ignore */ }
          }
        }}
        onFindInChapter={() => {
          setFindVisible(true)
          setBarsVisible(true)
        }}
        onReport={() => {
          setReportDialogVisible(true)
          setBarsVisible(true)
        }}
        isBookmarked={isBookmarked}
        visible={barsVisible && !settingsSheetVisible}
        isLoaded={!loading}
      />

      {/* --- Find in Chapter Bar --- */}
      <FindInChapterBar
        onQueryChange={handleFindQueryChange}
        onNext={findNext}
        onPrev={findPrev}
        onClose={() => setFindVisible(false)}
        matchCount={findMatchCount}
        currentMatch={findCurrent}
        visible={findVisible && barsVisible}
      />

      {/* --- Auto-next indicator --- */}
      {loadingNext && (
        <div className="absolute bottom-32 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2 bg-surface/80 backdrop-blur-sm rounded-full px-3 py-1.5 border border-border-light shadow animate-in fade-in zoom-in">
          <Loader2 className="w-3 h-3 text-accent animate-spin" strokeWidth={2} />
          <span className="text-[10px] text-text-muted font-medium">Loading next…</span>
        </div>
      )}

      {/* --- Floating action buttons (TTS + Stats) --- */}
      {barsVisible && !settingsSheetVisible && !ttsSheetVisible && (
        <div className="absolute bottom-48 right-4 z-30 flex flex-col gap-2">
          {/* TTS button */}
          {mode === 'text' && (
            <button
              onClick={() => {
                if (ttsState === 'idle') {
                  const content = textContent || pages.map(p => `Page ${p.index + 1}`).join('. ')
                  speak(content)
                }
                setTtsSheetVisible(true)
                setBarsVisible(false)
              }}
              className={`w-10 h-10 rounded-full flex items-center justify-center shadow-lg transition-all hover:scale-105 active:scale-95 ${
                ttsState !== 'idle'
                  ? 'bg-accent/20 text-accent'
                  : 'bg-surface/80 backdrop-blur-sm text-text-secondary'
              }`}
              title="Text-to-Speech"
            >
              <Volume2 className="w-5 h-5" />
            </button>
          )}

          {/* Stats button (all modes) */}
          <button
            onClick={() => setStatsVisible(true)}
            className="w-10 h-10 rounded-full bg-surface/80 backdrop-blur-sm text-text-secondary flex items-center justify-center shadow-lg transition-all hover:scale-105 active:scale-95"
            title="Reading Stats"
          >
            <Gauge className="w-5 h-5" />
          </button>
        </div>
      )}

      {/* TTS status indicator when speaking in non-text modes (compact, tap to open sheet) */}
      {mode !== 'text' && ttsState !== 'idle' && barsVisible && !settingsSheetVisible && !ttsSheetVisible && (
        <button
          onClick={() => { setTtsSheetVisible(true); setBarsVisible(false) }}
          className="absolute bottom-56 right-4 z-30 w-10 h-10 rounded-full bg-accent/20 text-accent flex items-center justify-center shadow-lg animate-pulse"
        >
          <Volume2 className="w-5 h-5" />
        </button>
      )}

      {/* --- Translation toggle --- */}
      {translationEnabled && mode === 'text' && barsVisible && !settingsSheetVisible && ttsState === 'idle' && (
        <button
          onClick={() => setShowTranslationPanel(v => !v)}
          className="absolute bottom-48 right-4 z-30 w-10 h-10 rounded-full bg-accent/20 text-accent flex items-center justify-center hover:bg-accent/30 transition-colors shadow-lg"
          title="Translation"
        >
          <Languages className="w-5 h-5" />
        </button>
      )}

      {/* --- Session reading time --- */}
      {showReadingTime && (
        <ReadingTimeIndicator sessionStartTime={sessionStartTime} visible={barsVisible && !settingsSheetVisible} />
      )}

      {/* --- Bottom Bar --- */}
      <ReaderBottomBar
        chapters={chapters}
        currentChapterIndex={currentChapterIndex}
        currentChapterTitle={currentChapter?.title || chapterTitle || ''}
        onPrev={() => currentChapterIndex > 0 && loadChapter(currentChapterIndex - 1)}
        onNext={() => currentChapterIndex < chapters.length - 1 && loadChapter(currentChapterIndex + 1)}
        onChapterSelect={handleChapterSelect}
        onTtsToggle={handleTtsToggle}
        onSettings={() => { setSettingsSheetVisible(true); setBarsVisible(false) }}
        onMenuOpen={() => { setChapterDrawerVisible(true); setBarsVisible(false) }}
        visible={barsVisible && !settingsSheetVisible}
        ttsActive={ttsState !== 'idle'}
      />

      {/* --- Report Broken Chapter Dialog --- */}
      <ReportChapterDialog
        chapterName={chapterDisplayTitle}
        visible={reportDialogVisible}
        onSubmit={async (category: IssueCategory, description: string) => {
          await api.reportChapter({
            sourceId: sourceId ?? '',
            chapterId: chapterId ?? '',
            chapterName: chapterDisplayTitle,
            category,
            description,
          })
        }}
        onClose={() => setReportDialogVisible(false)}
      />

      {/* --- Chapter Drawer --- */}
      <ChapterDrawer
        chapters={chapters}
        currentChapterIndex={currentChapterIndex}
        onChapterSelect={handleChapterSelect}
        visible={chapterDrawerVisible}
        onClose={() => { setChapterDrawerVisible(false); setBarsVisible(true) }}
      />

      {/* --- Reader Settings Bottom Sheet --- */}
      <ReaderSettingsSheet
        visible={settingsSheetVisible}
        onClose={() => { setSettingsSheetVisible(false); setBarsVisible(true) }}
        availableThemes={availableThemes}
      />

      {/* --- TTS Control Sheet --- */}
      <TtsControlSheet
        visible={ttsSheetVisible}
        onClose={() => { setTtsSheetVisible(false); setBarsVisible(true) }}
        textContent={textContent || pages.map(p => `Page ${p.index + 1}`).join('. ')}
      />

      {/* --- Reading Stats Panel --- */}
      <ReadingStatsPanel
        visible={statsVisible}
        onClose={() => setStatsVisible(false)}
        sessionStartTime={sessionStartTime}
        textContent={textContent}
        chaptersRead={chaptersRead}
      />
    </div>
  )
}

