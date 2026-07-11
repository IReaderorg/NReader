import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type ReaderMode = 'webtoon' | 'pager' | 'text'
export type TextAlignment = 'left' | 'center' | 'right' | 'justify'
export type ColorFilterType = 'none' | 'sepia' | 'invert' | 'grayscale'

export interface ReaderThemeColors {
  background: string
  text: string
  link: string
  highlight: string
  header: string
  separator: string
  card: string
}

export interface ReaderTheme {
  id: string
  name: string
  isBuiltin: boolean
  colors: ReaderThemeColors
}

export interface FontEntry {
  id: string
  name: string
  fileName: string
  fileSize: number
  format: 'ttf' | 'otf' | 'woff2'
  uploadedAt: string
}

// ─── Content filter: per-pattern enable/disable ───────────────────────────

export interface ContentFilterEntry {
  pattern: string
  enabled: boolean
}

// ─── Named preset ─────────────────────────────────────────────────────────

export interface NamedPreset {
  id: string
  name: string
  fontSize: number
  lineHeight: number
  paragraphSpacing: number
  paragraphIndent: number
  textAlignment: TextAlignment
  colorFilter: ColorFilterType
}

// ─── Text replacement history entry ───────────────────────────────────────

export interface TextReplacementEntry {
  id: string
  find: string
  replace: string
  timestamp: number
}

// ─── Reading break ────────────────────────────────────────────────────────

interface ReadingBreakState {
  enabled: boolean
  intervalMinutes: number
  lastShownAt: number | null
  snoozeUntil: number | null
}

// ─── Reading goals ────────────────────────────────────────────────────────

export interface ReadingGoal {
  dailyTimeMinutes: number
  dailyChapters: number
}

interface ReaderStore {
  /** Current reading session */
  currentSourceId: string | null
  currentMangaId: string | null
  currentChapterId: string | null
  currentChapterNumber: number | null
  /** Reader settings (persisted) */
  mode: ReaderMode
  fontSize: number
  selectedThemeId: string
  selectedFontId: string
  selectedFontName: string
  /** Reading layout (persisted) */
  lineHeight: number
  paragraphSpacing: number
  paragraphIndent: number
  textAlignment: TextAlignment
  /** Auto-scroll (persisted) */
  autoScrollEnabled: boolean
  autoScrollSpeed: number
  /** Content filter (persisted) */
  contentFilterEnabled: boolean
  contentFilterPatterns: string
  /** Per-pattern enable/disable (persisted) */
  contentFilterEntries: ContentFilterEntry[]
  /** Saved custom pattern sets */
  savedPatternSets: string[] // JSON arrays of pattern strings
  /** Color filter (persisted) */
  colorFilter: ColorFilterType
  /** General display toggles (persisted) */
  immersiveMode: boolean
  showScrollbar: boolean
  showReadingTime: boolean
  volumeNavigation: boolean
  screenAwake: boolean
  bionicReading: boolean
  webviewBg: boolean
  selectableMode: boolean
  reducedAnimations: boolean
  /** Pager reading direction */
  pagerDirection: 'ltr' | 'rtl'
  /** Bookmark state */
  isBookmarked: boolean
  // ─── Chapters slider ──────────────────────────────────────────────────
  chaptersSliderVisible: boolean
  setChaptersSliderVisible: (v: boolean) => void
  /** Session-only */
  brightness: number
  autoBrightness: boolean
  currentPage: number
  totalPages: number
  progress: number

  // ─── Reading break ───────────────────────────────────────────────────
  readingBreak: ReadingBreakState
  setReadingBreakEnabled: (v: boolean) => void
  setReadingBreakInterval: (v: number) => void
  setReadingBreakLastShown: (v: number | null) => void
  setReadingBreakSnoozeUntil: (v: number | null) => void

  // ─── Reading goals ───────────────────────────────────────────────────
  readingGoal: ReadingGoal
  setReadingGoal: (g: ReadingGoal) => void

  // ─── Text replacement ────────────────────────────────────────────────
  textReplacements: TextReplacementEntry[]
  addTextReplacement: (entry: TextReplacementEntry) => void
  removeTextReplacement: (id: string) => void
  clearTextReplacements: () => void

  // ─── Named presets ───────────────────────────────────────────────────
  namedPresets: NamedPreset[]
  setNamedPresets: (presets: NamedPreset[]) => void

  /** Actions */
  openChapter: (sourceId: string, mangaId: string, chapterId: string, chapterNumber: number) => void
  setMode: (mode: ReaderMode) => void
  setBrightness: (value: number) => void
  setAutoBrightness: (v: boolean) => void
  setFontSize: (value: number) => void
  setPage: (page: number, total: number) => void
  setProgress: (progress: number) => void
  closeReader: () => void
  /** Theme actions */
  setSelectedThemeId: (id: string) => void
  /** Font actions */
  setSelectedFont: (id: string, name: string) => void
  /** Layout actions */
  setLineHeight: (value: number) => void
  setParagraphSpacing: (value: number) => void
  setParagraphIndent: (value: number) => void
  setTextAlignment: (align: TextAlignment) => void
  /** Auto-scroll */
  setAutoScrollEnabled: (v: boolean) => void
  setAutoScrollSpeed: (speed: number) => void
  /** Content filter */
  setContentFilterEnabled: (enabled: boolean) => void
  setContentFilterPatterns: (patterns: string) => void
  setContentFilterEntries: (entries: ContentFilterEntry[]) => void
  setSavedPatternSets: (sets: string[]) => void
  /** Color filter */
  setColorFilter: (filter: ColorFilterType) => void
  /** General display toggles */
  setImmersiveMode: (v: boolean) => void
  setShowScrollbar: (v: boolean) => void
  setShowReadingTime: (v: boolean) => void
  setVolumeNavigation: (v: boolean) => void
  setScreenAwake: (v: boolean) => void
  setBionicReading: (v: boolean) => void
  setWebviewBg: (v: boolean) => void
  setSelectableMode: (v: boolean) => void
  setReducedAnimations: (v: boolean) => void
  /** Pager direction */
  setPagerDirection: (d: 'ltr' | 'rtl') => void
  /** Bookmark */
  setBookmarked: (v: boolean) => void
}

const DEFAULT_CONTENT_FILTER_PATTERNS = [
  'Use arrow keys.*chapter',
  '(?:A|D|←|→).*(?:PREV|NEXT).*chapter',
  '(?:Previous|Next).*Chapter.*(?:←|→|A|D)',
  'Read more at.*',
  'Visit.*for more chapters',
].join('\n')

export const useReaderStore = create<ReaderStore>()(
  persist(
    (set) => ({
      currentSourceId: null,
      currentMangaId: null,
      currentChapterId: null,
      currentChapterNumber: null,
      mode: 'text',
      fontSize: 18,
      selectedThemeId: 'theme-dark',
      selectedFontId: '',
      selectedFontName: 'System',
      lineHeight: 1.8,
      paragraphSpacing: 16,
      paragraphIndent: 0,
      textAlignment: 'left',
      autoScrollEnabled: false,
      autoScrollSpeed: 5,
      contentFilterEnabled: false,
      contentFilterPatterns: DEFAULT_CONTENT_FILTER_PATTERNS,
      contentFilterEntries: [],
      savedPatternSets: [],
      colorFilter: 'none',
      immersiveMode: false,
      showScrollbar: true,
      showReadingTime: true,
      volumeNavigation: false,
      screenAwake: false,
      bionicReading: false,
      webviewBg: false,
      selectableMode: false,
      reducedAnimations: false,
      pagerDirection: 'ltr',
      isBookmarked: false,
      chaptersSliderVisible: false,
      brightness: 100,
      autoBrightness: false,
      currentPage: 0,
      totalPages: 0,
      progress: 0,

      // Reading break defaults
      readingBreak: { enabled: false, intervalMinutes: 30, lastShownAt: null, snoozeUntil: null },
      setReadingBreakEnabled: (v) => set((s) => ({ readingBreak: { ...s.readingBreak, enabled: v } })),
      setReadingBreakInterval: (v) => set((s) => ({ readingBreak: { ...s.readingBreak, intervalMinutes: v } })),
      setReadingBreakLastShown: (v) => set((s) => ({ readingBreak: { ...s.readingBreak, lastShownAt: v } })),
      setReadingBreakSnoozeUntil: (v) => set((s) => ({ readingBreak: { ...s.readingBreak, snoozeUntil: v } })),

      // Reading goals defaults
      readingGoal: { dailyTimeMinutes: 30, dailyChapters: 3 },
      setReadingGoal: (g) => set({ readingGoal: g }),

      // Text replacement defaults
      textReplacements: [],
      addTextReplacement: (entry) => set((s) => ({ textReplacements: [...s.textReplacements, entry] })),
      removeTextReplacement: (id) => set((s) => ({ textReplacements: s.textReplacements.filter(e => e.id !== id) })),
      clearTextReplacements: () => set({ textReplacements: [] }),

      // Named presets
      namedPresets: [],
      setNamedPresets: (presets) => set({ namedPresets: presets }),

      openChapter: (sourceId, mangaId, chapterId, chapterNumber) => set({
        currentSourceId: sourceId,
        currentMangaId: mangaId,
        currentChapterId: chapterId,
        currentChapterNumber: chapterNumber,
        currentPage: 0,
        progress: 0,
      }),

      setMode: (mode) => set({ mode }),
      setBrightness: (value) => set({ brightness: value }),
      setAutoBrightness: (v) => set({ autoBrightness: v }),
      setFontSize: (value) => set({ fontSize: value }),
      setPage: (page, total) => set({ currentPage: page, totalPages: total }),
      setProgress: (progress) => set({ progress }),

      closeReader: () => set({
        currentSourceId: null,
        currentMangaId: null,
        currentChapterId: null,
        currentChapterNumber: null,
        currentPage: 0,
        totalPages: 0,
        progress: 0,
      }),

      setSelectedThemeId: (id) => set({ selectedThemeId: id }),
      setSelectedFont: (id, name) => set({ selectedFontId: id, selectedFontName: name }),
      setLineHeight: (value) => set({ lineHeight: value }),
      setParagraphSpacing: (value) => set({ paragraphSpacing: value }),
      setParagraphIndent: (value) => set({ paragraphIndent: value }),
      setTextAlignment: (align) => set({ textAlignment: align }),
      setAutoScrollEnabled: (v) => set({ autoScrollEnabled: v }),
      setAutoScrollSpeed: (speed) => set({ autoScrollSpeed: speed }),
      setContentFilterEnabled: (enabled) => set({ contentFilterEnabled: enabled }),
      setContentFilterPatterns: (patterns) => set({ contentFilterPatterns: patterns }),
      setContentFilterEntries: (entries) => set({ contentFilterEntries: entries }),
      setSavedPatternSets: (sets) => set({ savedPatternSets: sets }),
      setColorFilter: (filter) => set({ colorFilter: filter }),
      setImmersiveMode: (v) => set({ immersiveMode: v }),
      setShowScrollbar: (v) => set({ showScrollbar: v }),
      setShowReadingTime: (v) => set({ showReadingTime: v }),
      setVolumeNavigation: (v) => set({ volumeNavigation: v }),
      setScreenAwake: (v) => set({ screenAwake: v }),
      setBionicReading: (v) => set({ bionicReading: v }),
      setWebviewBg: (v) => set({ webviewBg: v }),
      setSelectableMode: (v) => set({ selectableMode: v }),
      setReducedAnimations: (v) => set({ reducedAnimations: v }),
      setPagerDirection: (d) => set({ pagerDirection: d }),
      setBookmarked: (v) => set({ isBookmarked: v }),
      setChaptersSliderVisible: (v) => set({ chaptersSliderVisible: v }),
    }),
    {
      name: 'nreader-reader-store',
      partialize: (state) => ({
        mode: state.mode,
        fontSize: state.fontSize,
        selectedThemeId: state.selectedThemeId,
        selectedFontId: state.selectedFontId,
        selectedFontName: state.selectedFontName,
        lineHeight: state.lineHeight,
        paragraphSpacing: state.paragraphSpacing,
        paragraphIndent: state.paragraphIndent,
        textAlignment: state.textAlignment,
        autoScrollEnabled: state.autoScrollEnabled,
        autoScrollSpeed: state.autoScrollSpeed,
        contentFilterEnabled: state.contentFilterEnabled,
        contentFilterPatterns: state.contentFilterPatterns,
        contentFilterEntries: state.contentFilterEntries,
        savedPatternSets: state.savedPatternSets,
        colorFilter: state.colorFilter,
        immersiveMode: state.immersiveMode,
        showScrollbar: state.showScrollbar,
        showReadingTime: state.showReadingTime,
        volumeNavigation: state.volumeNavigation,
        screenAwake: state.screenAwake,
        bionicReading: state.bionicReading,
        webviewBg: state.webviewBg,
        selectableMode: state.selectableMode,
        reducedAnimations: state.reducedAnimations,
        pagerDirection: state.pagerDirection,
        readingBreak: state.readingBreak,
        readingGoal: state.readingGoal,
        textReplacements: state.textReplacements,
        namedPresets: state.namedPresets,
      }),
    }
  )
)
