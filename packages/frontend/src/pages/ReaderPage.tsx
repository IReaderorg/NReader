import { useEffect, useState, useCallback, useRef } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { api, type Page, type HistoryEntry } from '../api/client'
import { useReaderStore, type TextReplacementEntry } from '../store/reader-store'
import { useHistoryStore } from '../store/history-store'
import { useTtsStore } from '../store/tts-store'
import { WebtoonReader, PagerReader, TextReader } from '@ireader/reader-engine'
import { Loader2, Languages, Volume2, Gauge, ChevronLeft, ChevronRight, Play } from 'lucide-react'
import { ReaderTopBar } from '../components/ReaderTopBar'
import { ReaderBottomBar } from '../components/ReaderBottomBar'
import { FindInChapterBar } from '../components/FindInChapterBar'
import { ReadingTimeIndicator } from '../components/ReadingTimeIndicator'
import { ReaderSettingsSheet } from '../components/ReaderSettingsSheet'
import { ChapterDrawer } from '../components/ChapterDrawer'
import { ReportChapterDialog } from '../components/ReportChapterDialog'
import { TtsControlSheet } from '../components/TtsControlSheet'
import { ReadingStatsPanel } from '../components/ReadingStatsPanel'
import { TranslationPanel } from '../components/TranslationPanel'
import { ReadingBreakReminder } from '../components/ReadingBreakReminder'
import { TextReplaceBar } from '../components/TextReplaceBar'
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
    colorFilter,    contentFilterEnabled, contentFilterPatterns,
    autoScrollSpeed,
    pagerDirection,
    setMode,
    immersiveMode, showScrollbar, showReadingTime, volumeNavigation,
    screenAwake, reducedAnimations, bionicReading,
    selectableMode, webviewBg,
    isBookmarked, setBookmarked,
    openChapter,
    readingBreak,
  } = useReaderStore()

  const { recordProgress } = useHistoryStore()
  const { speak, pause, resume, state: ttsState, charIndex } = useTtsStore()

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
  const [reportDialogVisible, setReportDialogVisible] = useState(false)
  const [translationPanelVisible, setTranslationPanelVisible] = useState(false)
  const [ttsSheetVisible, setTtsSheetVisible] = useState(false)
  const [statsVisible, setStatsVisible] = useState(false)

  // Find in chapter
  const [findVisible, setFindVisible] = useState(false)
  const [findMatchCount, setFindMatchCount] = useState(0)
  const [findCurrent, setFindCurrent] = useState(0)
  const findPositionsRef = useRef<number[]>([])

  // Text replace
  const [replaceVisible, setReplaceVisible] = useState(false)

  // Reading break reminder
  const [breakReminderVisible, setBreakReminderVisible] = useState(false)

  // Reading session timer
  const [sessionStartTime] = useState(() => Date.now())
  const chapterStartTimeRef = useRef(Date.now())
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

  // --- TTS chapter auto-advance: on speech end, go to next chapter ---
  const wasActiveRef = useRef(false)
  useEffect(() => {
    if (ttsState === 'speaking' || ttsState === 'paused') {
      wasActiveRef.current = true
      return
    }
    if (ttsState === 'idle' && wasActiveRef.current) {
      wasActiveRef.current = false
      const store = useTtsStore.getState()
      if (!store.text) return
      if (currentChapterIndex < chapters.length - 1) {
        loadChapter(currentChapterIndex + 1)
      }
    }
  }, [ttsState])

  // --- Text highlighting during TTS ---
  useEffect(() => {
    if (ttsState === 'idle') {
      document.querySelectorAll('.tts-highlight').forEach(el => el.classList.remove('tts-highlight'))
      return
    }
    const container = document.querySelector('[data-reader-content]')
    if (!container) return

    container.querySelectorAll('.tts-highlight').forEach(el => el.classList.remove('tts-highlight'))

    // Find the paragraph/block containing charIndex
    const blocks = container.querySelectorAll('p, div, span, h1, h2, h3, h4, h5, h6')
    let accumulated = 0
    for (const block of blocks) {
      const text = block.textContent || ''
      if (charIndex >= accumulated && charIndex < accumulated + text.length && text.trim()) {
        block.classList.add('tts-highlight')
        block.scrollIntoView({ block: 'center', behavior: 'smooth' })
        break
      }
      accumulated += text.length
    }
  }, [charIndex, ttsState])

  useEffect(() => {
    if (!sourceId || !chapterId) return
    setLoading(true)
    setError(null)
    setScrollRestored(false)
    setFindVisible(false)

    openChapter(sourceId, mangaId ?? '', chapterId, 0)

    // Record reading streak for today
    api.recordStreak().catch(() => {})

    api.getPages(sourceId, chapterId)
      .then(data => {
        // Check if pages are empty URLs (text content signal from IReader sources)
        const hasTextContent = data.length > 0 && data.every(p => !p.url)
        if (hasTextContent) {
          // Auto-switch to text mode for novel chapters
          useReaderStore.getState().setMode('text')
          // Try to get text content
          api.getText(sourceId, chapterId)
            .then(textParts => {
              setTextContent(textParts.join('\n\n'))
              setPages(data)
              setLoading(false)
            })
            .catch(() => {
              setPages(data)
              setLoading(false)
            })
        } else {
          setPages(data)
          setLoading(false)
        }
      })
      .catch(err => {
        // Fallback: try text endpoint
        api.getText(sourceId!, chapterId)
          .then(textParts => {
            useReaderStore.getState().setMode('text')
            setTextContent(textParts.join('\n\n'))
            setLoading(false)
          })
          .catch(() => {
            if (mangaId) {
              api.getDetail(sourceId!, mangaId)
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
    // Record stats for current manga before navigating
    if (mangaId && sourceId) {
      const elapsed = Date.now() - chapterStartTimeRef.current
      api.recordReadingStats({ mangaId, sourceId, totalTimeMs: elapsed, chaptersRead: 1 }).catch(() => {})
    }
    chapterStartTimeRef.current = Date.now()
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

  // --- Replace in chapter ---
  const handleReplace = useCallback((find: string, replace: string) => {
    const textContainer = document.querySelector('[data-reader-content]')
    if (!textContainer) return
    const text = textContainer.textContent || ''
    const lower = text.toLowerCase()
    const q = find.toLowerCase()
    const idx = lower.indexOf(q)
    if (idx === -1) return
    // Perform first match replacement via DOM
    const walker = document.createTreeWalker(textContainer, NodeFilter.SHOW_TEXT, null)
    let node: Text | null
    let offset = 0
    while ((node = walker.nextNode() as Text | null)) {
      const nodeText = node.textContent || ''
      const findIdx = nodeText.toLowerCase().indexOf(q)
      if (findIdx !== -1 && offset + findIdx >= idx) {
        const before = nodeText.slice(0, findIdx)
        const after = nodeText.slice(findIdx + q.length)
        node.textContent = before + replace + after
        break
      }
      offset += nodeText.length
    }
    // Record in history
    const entry: TextReplacementEntry = {
      id: crypto.randomUUID(),
      find,
      replace,
      timestamp: Date.now(),
    }
    useReaderStore.getState().addTextReplacement(entry)
  }, [])

  const handleReplaceAll = useCallback((find: string, replace: string) => {
    const textContainer = document.querySelector('[data-reader-content]')
    if (!textContainer) return
    const walker = document.createTreeWalker(textContainer, NodeFilter.SHOW_TEXT, null)
    let node: Text | null
    const q = find.toLowerCase()
    let count = 0
    while ((node = walker.nextNode() as Text | null)) {
      const nodeText = node.textContent || ''
      if (nodeText.toLowerCase().includes(q)) {
        const regex = new RegExp(find.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi')
        node.textContent = nodeText.replace(regex, replace)
        count++
      }
    }
    if (count > 0) {
      const entry: TextReplacementEntry = {
        id: crypto.randomUUID(),
        find,
        replace,
        timestamp: Date.now(),
      }
      useReaderStore.getState().addTextReplacement(entry)
    }
  }, [])

  // --- Keyboard shortcuts ---
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement || e.target instanceof HTMLSelectElement) return

      // TTS shortcuts (take priority when active)
      if (ttsState !== 'idle') {
        switch (e.key) {
          case ' ':
            e.preventDefault()
            if (ttsState === 'speaking') pause()
            else if (ttsState === 'paused') resume()
            return
          case 'ArrowLeft':
            e.preventDefault()
            // Seek back ~100 chars
            const prevIdx = Math.max(0, charIndex - 100)
            useTtsStore.setState({ charIndex: prevIdx })
            return
          case 'ArrowRight':
            e.preventDefault()
            const nextIdx = charIndex + 100
            useTtsStore.setState({ charIndex: nextIdx })
            return
          case 'm':
          case 'M':
            e.preventDefault()
            stop()
            return
        }
      }

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
  }, [currentChapterIndex, chapters.length, mode, currentPage, pages.length, settingsSheetVisible, findVisible, findNext, findPrev, loadChapter, setMode, ttsState, charIndex, pause, resume, stop])

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

  // --- webviewBg: prefetch next chapter ---
  useEffect(() => {
    if (!webviewBg || !sourceId || currentChapterIndex < 0 || currentChapterIndex >= chapters.length - 1) return
    const nextCh = chapters[currentChapterIndex + 1]
    if (!nextCh) return
    api.getPages(sourceId, nextCh.id).catch(() => {})
  }, [webviewBg, sourceId, currentChapterIndex, chapters])

  // --- Reading break reminder ---
  useEffect(() => {
    const { readingBreak } = useReaderStore.getState()
    if (!readingBreak.enabled) return

    const now = Date.now()
    if (readingBreak.snoozeUntil && now < readingBreak.snoozeUntil) return

    const lastShown = readingBreak.lastShownAt ?? sessionStartTime
    const elapsed = now - lastShown
    if (elapsed >= readingBreak.intervalMinutes * 60 * 1000) {
      setBreakReminderVisible(true)
      useReaderStore.getState().setReadingBreakLastShown(now)
    }
  }, [chaptersRead, sessionStartTime])

  // --- Auto-scroll (text mode) ---
  const [autoScrollActive, setAutoScrollActive] = useState(true)
  const autoScrollTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    if (mode !== 'text' || autoScrollSpeed <= 0 || !autoScrollActive) return
    const container = document.querySelector('[data-reader-content]') as HTMLElement | null
    if (!container) return
    const pixelsPerTick = 0.5 + (autoScrollSpeed / 10) * 4
    const id = setInterval(() => {
      container.scrollBy({ top: pixelsPerTick })
    }, 50)
    // Pause auto-scroll on manual scroll, resume after 3s of inactivity
    const onUserScroll = () => {
      clearInterval(id)
      setAutoScrollActive(false)
      if (autoScrollTimerRef.current) clearTimeout(autoScrollTimerRef.current)
      autoScrollTimerRef.current = setTimeout(() => {
        setAutoScrollActive(true)
      }, 3000)
    }
    container.addEventListener('wheel', onUserScroll, { once: true })
    container.addEventListener('touchmove', onUserScroll, { once: true })
    return () => {
      clearInterval(id)
      container.removeEventListener('wheel', onUserScroll)
      container.removeEventListener('touchmove', onUserScroll)
    }
  }, [mode, autoScrollSpeed, autoScrollActive])

  // --- Swipe gesture navigation ---
  const [swipeDirection, setSwipeDirection] = useState<'left' | 'right' | null>(null)

  useEffect(() => {
    const container = document.querySelector('[data-reader-content]') as HTMLElement | null
    const el = container ?? document.body
    let startX = 0
    let startY = 0
    let currentX = 0
    const SWIPE_THRESHOLD = 80

    const onTouchStart = (e: TouchEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement || e.target instanceof HTMLSelectElement) return
      startX = e.touches[0]?.clientX ?? 0
      startY = e.touches[0]?.clientY ?? 0
      currentX = startX
    }
    const onTouchMove = (e: TouchEvent) => {
      currentX = e.touches[0]?.clientX ?? currentX
      const dx = currentX - startX
      const dy = Math.abs((e.touches[0]?.clientY ?? startY) - startY)
      if (Math.abs(dx) < 30 || Math.abs(dx) < dy) {
        setSwipeDirection(null)
        return
      }
      // Show edge indicator
      if (dx > 40 && currentChapterIndex > 0) {
        setSwipeDirection('right')
      } else if (dx < -40 && currentChapterIndex < chapters.length - 1) {
        setSwipeDirection('left')
      } else {
        setSwipeDirection(null)
      }
    }
    const onTouchEnd = (e: TouchEvent) => {
      setSwipeDirection(null)
      const endX = e.changedTouches[0]?.clientX ?? 0
      const endY = e.changedTouches[0]?.clientY ?? 0
      const dx = endX - startX
      const dy = endY - startY
      if (Math.abs(dx) < SWIPE_THRESHOLD || Math.abs(dx) < Math.abs(dy)) return
      if (dx > 0 && currentChapterIndex > 0) {
        loadChapter(currentChapterIndex - 1)
      } else if (dx < 0 && currentChapterIndex < chapters.length - 1) {
        loadChapter(currentChapterIndex + 1)
      }
    }
    el.addEventListener('touchstart', onTouchStart, { passive: true })
    el.addEventListener('touchmove', onTouchMove, { passive: true })
    el.addEventListener('touchend', onTouchEnd, { passive: true })
    return () => {
      el.removeEventListener('touchstart', onTouchStart)
      el.removeEventListener('touchmove', onTouchMove)
      el.removeEventListener('touchend', onTouchEnd)
    }
  }, [currentChapterIndex, chapters.length, loadChapter])
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
    <div className={`fixed inset-0 z-40 flex flex-col bg-black ${!showScrollbar ? 'scrollbar-none' : ''} ${reducedAnimations ? 'motion-reduce' : ''} ${!selectableMode ? 'select-none' : ''}`} style={{ filter: `brightness(${readerBrightness})` }}>
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
          direction={pagerDirection}
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
          bionicReading={bionicReading}
          onProgressChange={(pct) => useReaderStore.getState().setProgress(pct)}
          className="flex-1"
        />
      )}

      {/* --- Swipe edge indicators --- */}
      {swipeDirection && (
        <>
          {swipeDirection === 'right' && (
            <div className="absolute left-2 top-1/2 -translate-y-1/2 z-25 pointer-events-none animate-in fade-in slide-in-from-left-2 duration-150">
              <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center">
                <ChevronLeft className="w-6 h-6 text-accent" />
              </div>
            </div>
          )}
          {swipeDirection === 'left' && (
            <div className="absolute right-2 top-1/2 -translate-y-1/2 z-25 pointer-events-none animate-in fade-in slide-in-from-right-2 duration-150">
              <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center">
                <ChevronRight className="w-6 h-6 text-accent" />
              </div>
            </div>
          )}
        </>
      )}

      {/* --- Auto-scroll speed indicator --- */}
      {mode === 'text' && autoScrollSpeed > 0 && barsVisible && !settingsSheetVisible && (
        <div className="absolute bottom-36 left-1/2 -translate-x-1/2 z-20 flex items-center gap-1.5 px-2.5 py-1.5 rounded-full bg-surface/80 backdrop-blur-sm border border-border-light shadow pointer-events-none animate-in fade-in">
          <Play className="w-3 h-3 text-accent" />
          <span className="text-[10px] font-medium text-text-muted tabular-nums">
            {autoScrollSpeed}/10
          </span>
        </div>
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

      {/* --- Text Replace Bar --- */}
      <TextReplaceBar
        onReplace={handleReplace}
        onReplaceAll={handleReplaceAll}
        onClose={() => setReplaceVisible(false)}
        visible={replaceVisible}
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
      {mode === 'text' && barsVisible && !settingsSheetVisible && ttsState === 'idle' && (
        <button
          onClick={() => { setTranslationPanelVisible(true); setBarsVisible(false) }}
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

      {/* --- Reading Break Reminder --- */}
      <ReadingBreakReminder
        visible={breakReminderVisible}
        intervalMinutes={readingBreak.intervalMinutes}
        onTakeBreak={() => { setBreakReminderVisible(false); navigate(-1) }}
        onContinue={() => setBreakReminderVisible(false)}
        onSnooze={(minutes) => {
          useReaderStore.getState().setReadingBreakSnoozeUntil(Date.now() + minutes * 60 * 1000)
          setBreakReminderVisible(false)
        }}
      />

      {/* --- Translation Panel --- */}
      <TranslationPanel
        visible={translationPanelVisible}
        onClose={() => { setTranslationPanelVisible(false); setBarsVisible(true) }}
        textContent={textContent}
      />
    </div>
  )
}

