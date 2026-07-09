const BASE = '/api/v1'

export interface MangaSummary {
  id: string; title: string; coverUrl: string; url?: string
  author?: string; status?: string; rating?: number; lastUpdated?: string
}

export interface Chapter {
  id: string; number: number; title: string; url?: string
  volume?: number; date?: string; read: boolean; downloaded: boolean
}

export interface MangaDetail extends MangaSummary {
  description: string; genres: string[]; chapters: Chapter[]; altTitles?: string[]
}

export interface Page {
  index: number; url: string; width?: number; height?: number
}

export interface SourceInfo {
  id: string; name: string; lang: string; baseUrl: string
  version: string; capabilities: string[]
}

export interface LibraryEntry {
  id: string; sourceId: string; mangaId: string; title: string
  coverUrl: string; author?: string; status?: string; rating?: number
  genres: string[]; description?: string; lastReadAt?: string
  chaptersRead: number; totalChapters?: number; score?: number
  dateAdded: string; categoryIds: string[]
}

export interface Category {
  id: string; name: string; sortOrder: number; color?: string
}

export interface HistoryEntry {
  id: string; mangaId: string; sourceId: string; chapterId: string
  chapterNumber: number; chapterTitle?: string; page: number
  scrollPosition: number; readAt: string
}

export interface DownloadJob {
  id: string; sourceId: string; mangaId: string; chapterId: string
  chapterNumber: number; status: string; progress: number
  bytesDownloaded: number; totalBytes?: number; error?: string
  createdAt: string; completedAt?: string
}

export interface GlossaryEntry {
  id: string; sourceLang: string; targetLang: string
  sourceText: string; targetText: string; context?: string
  createdAt: string; updatedAt: string
}

export async function apiFetch<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${BASE}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  })
  if (!res.ok) {
    const body = await res.json().catch(() => ({ error: res.statusText }))
    throw new Error(body.error ?? `HTTP ${res.status}`)
  }
  return res.json() as Promise<T>
}

function enc(v: string): string {
  return encodeURIComponent(v)
}

export const api = {
  // Sources
  getSources: () => apiFetch<SourceInfo[]>('/sources'),
  getSource: (id: string) => apiFetch<SourceInfo>(`/sources/${id}`),
  getPopular: (id: string, page = 1) => apiFetch<MangaSummary[]>(`/sources/${id}/popular?page=${page}`),
  search: (id: string, query: string, page = 1) => apiFetch<MangaSummary[]>(`/sources/${id}/search?q=${encodeURIComponent(query)}&page=${page}`),
  getDetail: (id: string, mangaId: string) => apiFetch<MangaDetail>(`/sources/${id}/detail/${enc(mangaId)}`),
  getChapters: (id: string, mangaId: string) => apiFetch<Chapter[]>(`/sources/${id}/chapters/${enc(mangaId)}`),
  getPages: (id: string, chapterId: string) => apiFetch<Page[]>(`/sources/${id}/pages/${enc(chapterId)}`),

  // Library
  getLibrary: () => apiFetch<LibraryEntry[]>('/library'),
  getLibraryEntry: (id: string) => apiFetch<LibraryEntry>(`/library/${id}`),
  addToLibrary: (entry: {
    sourceId: string; mangaId: string; title: string; coverUrl?: string
    author?: string; status?: string; genres?: string[]; description?: string
    totalChapters?: number; categoryId?: string
  }) => apiFetch<LibraryEntry>('/library', { method: 'POST', body: JSON.stringify(entry) }),
  updateLibraryEntry: (id: string, data: Partial<LibraryEntry>) =>
    apiFetch<LibraryEntry>(`/library/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  removeFromLibrary: (id: string) => apiFetch<{ success: boolean }>(`/library/${id}`, { method: 'DELETE' }),

  // Categories
  getCategories: () => apiFetch<Category[]>('/library/categories'),
  createCategory: (name: string, color?: string) =>
    apiFetch<Category>('/library/categories', { method: 'POST', body: JSON.stringify({ name, color }) }),
  deleteCategory: (id: string) =>
    apiFetch<{ success: boolean }>(`/library/categories/${id}`, { method: 'DELETE' }),

  // History
  getHistory: (mangaId?: string) => apiFetch<HistoryEntry[]>(`/history${mangaId ? `?mangaId=${enc(mangaId)}` : ''}`),
  recordHistory: (entry: {
    mangaId: string; sourceId: string; chapterId: string; chapterNumber: number
    chapterTitle?: string; page: number; scrollPosition: number
  }) => apiFetch<HistoryEntry>('/history', { method: 'POST', body: JSON.stringify(entry) }),
  deleteHistory: (mangaId: string) =>
    apiFetch<{ success: boolean }>(`/history/${enc(mangaId)}`, { method: 'DELETE' }),

  // Settings
  getSettings: () => apiFetch<Record<string, unknown>>('/settings'),
  setSetting: (key: string, value: unknown) =>
    apiFetch<Record<string, unknown>>(`/settings/${key}`, { method: 'POST', body: JSON.stringify({ value }) }),
  deleteSetting: (key: string) =>
    apiFetch<{ success: boolean }>(`/settings/${key}`, { method: 'DELETE' }),

  // Downloads
  getDownloads: () => apiFetch<DownloadJob[]>('/downloads'),
  getDownload: (id: string) => apiFetch<DownloadJob>(`/downloads/${id}`),
  createDownload: (entry: { sourceId: string; mangaId: string; chapterId: string; chapterNumber: number }) =>
    apiFetch<DownloadJob>('/downloads', { method: 'POST', body: JSON.stringify(entry) }),
  cancelDownload: (id: string) =>
    apiFetch<{ success: boolean }>(`/downloads/${id}/cancel`, { method: 'POST' }),
  deleteDownload: (id: string) =>
    apiFetch<{ success: boolean }>(`/downloads/${id}`, { method: 'DELETE' }),

  // Plugins
  getPlugins: () => apiFetch<SourceInfo[]>('/plugins'),

  // Glossary
  getGlossary: () => apiFetch<GlossaryEntry[]>('/glossary'),
  getGlossaryEntry: (id: string) => apiFetch<GlossaryEntry>(`/glossary/${id}`),
  searchGlossary: (sourceText: string, sourceLang: string, targetLang: string) =>
    apiFetch<GlossaryEntry | null>(`/glossary/search?sourceText=${enc(sourceText)}&sourceLang=${enc(sourceLang)}&targetLang=${enc(targetLang)}`),
  addGlossaryEntry: (entry: { sourceLang: string; targetLang?: string; sourceText: string; targetText: string; context?: string }) =>
    apiFetch<GlossaryEntry>('/glossary', { method: 'POST', body: JSON.stringify(entry) }),
  updateGlossaryEntry: (id: string, data: Partial<GlossaryEntry>) =>
    apiFetch<{ success: boolean }>(`/glossary/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  deleteGlossaryEntry: (id: string) =>
    apiFetch<{ success: boolean }>(`/glossary/${id}`, { method: 'DELETE' }),

  // Backup
  exportBackup: async (includeCovers?: boolean): Promise<Blob> => {
    const res = await fetch(`${BASE}/backup/export`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ includeCovers: includeCovers ?? false }),
    })
    if (!res.ok) throw new Error('Export failed')
    return res.blob()
  },
  importBackup: (zipBase64: string, strategy?: 'merge' | 'replace') =>
    apiFetch<{ tables: string[]; entries: number }>('/backup/import', {
      method: 'POST',
      body: JSON.stringify({ zipBase64, strategy: strategy ?? 'merge' }),
    }),

  // Plugin marketplace
  getMarketplace: () => apiFetch<Array<{ id: string; name: string; description: string; type: string; version: string; author: string; installUrl: string; downloads: number; rating: number }>>('/plugins/marketplace'),

  // Reader themes
  getThemes: () => apiFetch<Array<{ id: string; name: string; isBuiltin: boolean; colors: { background: string; text: string; link: string; highlight: string; header: string; separator: string; card: string } }>>('/reader/themes'),
  createTheme: (data: { name: string; colors: Record<string, string> }) =>
    apiFetch<{ id: string }>('/reader/themes', { method: 'POST', body: JSON.stringify(data) }),
  updateTheme: (id: string, data: { name?: string; colors?: Record<string, string> }) =>
    apiFetch<{ success: boolean }>(`/reader/themes/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  deleteTheme: (id: string) =>
    apiFetch<{ success: boolean }>(`/reader/themes/${id}`, { method: 'DELETE' }),

  // Fonts
  getFonts: () => apiFetch<Array<{ id: string; name: string; fileName: string; fileSize: number; format: string; uploadedAt: string }>>('/fonts'),
  uploadFont: async (file: File): Promise<{ id: string; name: string; format: string }> => {
    const form = new FormData()
    form.append('file', file)
    const res = await fetch(`${BASE}/fonts`, { method: 'POST', body: form })
    if (!res.ok) {
      const body = await res.json().catch(() => ({ error: res.statusText }))
      throw new Error(body.error ?? `HTTP ${res.status}`)
    }
    return res.json()
  },
  deleteFont: (id: string) =>
    apiFetch<{ success: boolean }>(`/fonts/${id}`, { method: 'DELETE' }),
}
