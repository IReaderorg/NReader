import { create } from 'zustand'

type ReaderMode = 'webtoon' | 'pager' | 'text'

interface ReaderStore {
  /** Current reading session */
  currentSourceId: string | null
  currentMangaId: string | null
  currentChapterId: string | null
  currentChapterNumber: number | null
  /** Reader settings (per-session) */
  mode: ReaderMode
  brightness: number
  fontSize: number
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
}

export const useReaderStore = create<ReaderStore>((set) => ({
  currentSourceId: null,
  currentMangaId: null,
  currentChapterId: null,
  currentChapterNumber: null,
  mode: 'webtoon',
  brightness: 100,
  fontSize: 18,
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
}))
