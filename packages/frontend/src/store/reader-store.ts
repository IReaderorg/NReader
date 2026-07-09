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
  autoScrollSpeed: number
  /** Content filter (persisted) */
  contentFilterEnabled: boolean
  contentFilterPatterns: string
  /** Color filter (persisted) */
  colorFilter: ColorFilterType
  /** Session-only */
  brightness: number
  currentPage: number
  totalPages: number
  progress: number
  /** Actions */
  openChapter: (sourceId: string, mangaId: string, chapterId: string, chapterNumber: number) => void
  setMode: (mode: ReaderMode) => void
  setBrightness: (value: number) => void
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
  setAutoScrollSpeed: (speed: number) => void
  /** Content filter */
  setContentFilterEnabled: (enabled: boolean) => void
  setContentFilterPatterns: (patterns: string) => void
  /** Color filter */
  setColorFilter: (filter: ColorFilterType) => void
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
      autoScrollSpeed: 5,
      contentFilterEnabled: false,
      contentFilterPatterns: DEFAULT_CONTENT_FILTER_PATTERNS,
      colorFilter: 'none',
      brightness: 100,
      currentPage: 0,
      totalPages: 0,
      progress: 0,

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
      setAutoScrollSpeed: (speed) => set({ autoScrollSpeed: speed }),
      setContentFilterEnabled: (enabled) => set({ contentFilterEnabled: enabled }),
      setContentFilterPatterns: (patterns) => set({ contentFilterPatterns: patterns }),
      setColorFilter: (filter) => set({ colorFilter: filter }),
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
        autoScrollSpeed: state.autoScrollSpeed,
        contentFilterEnabled: state.contentFilterEnabled,
        contentFilterPatterns: state.contentFilterPatterns,
        colorFilter: state.colorFilter,
      }),
    }
  )
)
