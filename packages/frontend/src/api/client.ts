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
  /** Get text content for a novel-style chapter (IReader sources) */
  getText: (id: string, chapterId: string) => apiFetch<string[]>(`/sources/${id}/text/${enc(chapterId)}`),

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
  reorderCategories: (categoryIds: string[]) =>
    apiFetch<{ success: boolean }>('/library/categories/reorder', { method: 'PUT', body: JSON.stringify({ categoryIds }) }),

  // Library enhancements
  setBookCategories: (id: string, categoryIds: string[]) =>
    apiFetch<LibraryEntry>(`/library/${id}/categories`, { method: 'PATCH', body: JSON.stringify({ categoryIds }) }),
  setFavorited: (id: string, favorited: boolean) =>
    apiFetch<LibraryEntry>(`/library/${id}/favorite`, { method: 'PATCH', body: JSON.stringify({ favorited }) }),
  updateMetadata: (id: string, data: { title?: string; author?: string; description?: string; coverUrl?: string }) =>
    apiFetch<LibraryEntry>(`/library/${id}/metadata`, { method: 'PATCH', body: JSON.stringify(data) }),
  markAllRead: (id: string) =>
    apiFetch<{ success: boolean }>(`/library/${id}/mark-all-read`, { method: 'POST' }),
  setArchived: (id: string, archived: boolean) =>
    apiFetch<LibraryEntry>(`/library/${id}/archive`, { method: 'PATCH', body: JSON.stringify({ archived }) }),

  // History
  getHistory: (mangaId?: string, query?: string) => {
    let path = '/history'
    const params = new URLSearchParams()
    if (mangaId) params.set('mangaId', mangaId)
    if (query) params.set('q', query)
    const qs = params.toString()
    if (qs) path += `?${qs}`
    return apiFetch<HistoryEntry[]>(path)
  },
  getContinueReading: () => apiFetch<HistoryEntry[]>('/history/continue-reading'),
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
  getDownloads: (params?: { status?: string; mangaId?: string }) => {
    const q = new URLSearchParams()
    if (params?.status) q.set('status', params.status)
    if (params?.mangaId) q.set('mangaId', params.mangaId)
    const qs = q.toString()
    return apiFetch<DownloadJob[]>(`/downloads${qs ? `?${qs}` : ''}`)
  },
  getDownload: (id: string) => apiFetch<DownloadJob>(`/downloads/${id}`),
  createDownload: (entry: { sourceId: string; mangaId: string; mangaTitle?: string; chapterId: string; chapterNumber: number; chapterTitle?: string; priority?: number }) =>
    apiFetch<DownloadJob>('/downloads', { method: 'POST', body: JSON.stringify(entry) }),
  batchCreateDownloads: (data: { sourceId: string; mangaId: string; mangaTitle?: string; chapters: Array<{ chapterId: string; chapterNumber: number; chapterTitle?: string; priority?: number }> }) =>
    apiFetch<DownloadJob[]>('/downloads/batch', { method: 'POST', body: JSON.stringify(data) }),
  downloadUnreadChapters: (data: { sourceId: string; mangaId: string; mangaTitle?: string; chapters: Array<{ chapterId: string; chapterNumber: number; chapterTitle?: string; read: boolean }> }) =>
    apiFetch<{ count: number; jobs: DownloadJob[] }>('/downloads/download-unread', { method: 'POST', body: JSON.stringify(data) }),
  getDownloadQueue: () => apiFetch<DownloadJob[]>('/downloads/queue'),
  pauseDownload: (id: string) =>
    apiFetch<{ success: boolean }>(`/downloads/${id}/pause`, { method: 'POST' }),
  resumeDownload: (id: string) =>
    apiFetch<{ success: boolean }>(`/downloads/${id}/resume`, { method: 'POST' }),
  pauseAllDownloads: () =>
    apiFetch<{ success: boolean; paused: number }>('/downloads/pause-all', { method: 'POST' }),
  resumeAllDownloads: () =>
    apiFetch<{ success: boolean; resumed: number }>('/downloads/resume-all', { method: 'POST' }),
  cancelDownload: (id: string) =>
    apiFetch<{ success: boolean }>(`/downloads/${id}/cancel`, { method: 'POST' }),
  retryDownload: (id: string) =>
    apiFetch<DownloadJob>(`/downloads/${id}/retry`, { method: 'POST' }),
  setDownloadPriority: (id: string, priority: number) =>
    apiFetch<{ success: boolean }>(`/downloads/${id}/priority`, { method: 'POST', body: JSON.stringify({ priority }) }),
  reorderQueue: (ids: string[]) =>
    apiFetch<{ success: boolean }>('/downloads/queue/reorder', { method: 'POST', body: JSON.stringify({ ids }) }),
  clearCompletedDownloads: () =>
    apiFetch<{ success: boolean }>('/downloads/clear-completed', { method: 'POST' }),
  deleteDownload: (id: string) =>
    apiFetch<{ success: boolean }>(`/downloads/${id}`, { method: 'DELETE' }),
  deleteDownloadByChapter: (chapterId: string) =>
    apiFetch<{ success: boolean }>('/downloads/delete-chapter', { method: 'POST', body: JSON.stringify({ chapterId }) }),
  deleteDownloadByManga: (mangaId: string) =>
    apiFetch<{ success: boolean }>('/downloads/delete-manga', { method: 'POST', body: JSON.stringify({ mangaId }) }),
  deleteAllCompletedDownloads: () =>
    apiFetch<{ success: boolean; deleted: number }>('/downloads/delete-all-completed', { method: 'POST' }),
  getDownloadStorageStats: () =>
    apiFetch<{ totalBytes: number; totalChapters: number; mangaCount: number }>('/downloads/storage/stats'),

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
  exportBackup: async (includeCovers?: boolean, sections?: string[]): Promise<Blob> => {
    const res = await fetch(`${BASE}/backup/export`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ includeCovers: includeCovers ?? false, sections }),
    })
    if (!res.ok) throw new Error('Export failed')
    return res.blob()
  },
  importBackup: (zipBase64: string, strategy?: 'merge' | 'replace', sections?: string[]) =>
    apiFetch<{ tables: string[]; entries: number }>('/backup/import', {
      method: 'POST',
      body: JSON.stringify({ zipBase64, strategy: strategy ?? 'merge', sections }),
    }),
  listBackups: () =>
    apiFetch<Array<{ id: string; filename: string; size: number; createdAt: string; modifiedAt: string }>>('/backup'),
  downloadBackup: async (id: string): Promise<Blob> => {
    const res = await fetch(`${BASE}/backup/${encodeURIComponent(id)}/download`)
    if (!res.ok) throw new Error('Download failed')
    return res.blob()
  },
  deleteBackup: (id: string) =>
    apiFetch<{ success: boolean }>(`/backup/${encodeURIComponent(id)}`, { method: 'DELETE' }),

  // Plugin marketplace
  getMarketplace: () => apiFetch<Array<{ id: string; name: string; description: string; type: string; version: string; author: string; installUrl: string; downloads: number; rating: number }>>('/plugins/marketplace'),

  // Source installation from repository
  installSource: (url: string, id?: string) => apiFetch<{ success: boolean; pluginId: string; path: string }>('/sources/install', {
    method: 'POST',
    body: JSON.stringify({ url, id }),
  }),
  listRepository: (url: string) => apiFetch<Array<{ id: string; name: string; lang: string; baseUrl: string; version: string }>>(`/sources/repository?url=${encodeURIComponent(url)}`),

  // Source migration
  getMigrationTargets: (query: string, excludeSourceId?: string) =>
    apiFetch<Array<{ sourceId: string; sourceName: string; mangaId: string; title: string; coverUrl: string; matchScore: number }>>(`/sources/migration/targets?q=${encodeURIComponent(query)}${excludeSourceId ? `&exclude=${encodeURIComponent(excludeSourceId)}` : ''}`),
  migrateManga: (data: { sourceId: string; mangaId: string; targetSourceId: string; targetMangaId: string }) =>
    apiFetch<{ success: boolean; sourceId: string; mangaId: string; targetSourceId: string; targetMangaId: string; totalChapters: number; matchedChapters: number; chapterMap: Record<string, string> }>('/sources/migration/migrate', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  // Reader themes
  getThemes: () => apiFetch<Array<{ id: string; name: string; isBuiltin: boolean; colors: { background: string; text: string; link: string; highlight: string; header: string; separator: string; card: string } }>>('/reader/themes'),
  createTheme: (data: { name: string; colors: Record<string, string> }) =>
    apiFetch<{ id: string }>('/reader/themes', { method: 'POST', body: JSON.stringify(data) }),
  updateTheme: (id: string, data: { name?: string; colors?: Record<string, string> }) =>
    apiFetch<{ success: boolean }>(`/reader/themes/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  deleteTheme: (id: string) =>
    apiFetch<{ success: boolean }>(`/reader/themes/${id}`, { method: 'DELETE' }),

  // Bookmarks
  toggleBookmark: (chapterId: string) =>
    apiFetch<{ bookmarked: boolean }>('/bookmarks/toggle', { method: 'POST', body: JSON.stringify({ chapterId }) }),
  getBookmarkStatus: (chapterId: string) =>
    apiFetch<{ bookmarked: boolean }>(`/bookmarks/status/${encodeURIComponent(chapterId)}`),

  // Reports
  reportChapter: (data: { sourceId: string; chapterId: string; chapterName?: string; category: string; description?: string }) =>
    apiFetch<{ success: boolean; reportId: string }>('/reports', { method: 'POST', body: JSON.stringify(data) }),

  // Reading Stats
  getReadingStats: (mangaId: string) => apiFetch<{ mangaId: string; sourceId: string; totalTimeMs: number; chaptersRead: number; lastReadAt: string }>(`/reading-stats/${encodeURIComponent(mangaId)}`),
  getAllReadingStats: () => apiFetch<Array<{ mangaId: string; sourceId: string; totalTimeMs: number; chaptersRead: number; lastReadAt: string }>>('/reading-stats'),
  recordReadingStats: (data: { mangaId: string; sourceId: string; totalTimeMs?: number; chaptersRead?: number }) =>
    apiFetch<{ mangaId: string; sourceId: string; totalTimeMs: number; chaptersRead: number; lastReadAt: string }>('/reading-stats', { method: 'POST', body: JSON.stringify(data) }),

  // Stats time-series
  getDailyStats: (from?: string, to?: string) => {
    const params = new URLSearchParams()
    if (from) params.set('from', from)
    if (to) params.set('to', to)
    const qs = params.toString()
    return apiFetch<{ type: string; data: Array<{ date: string; totalTimeMs: number; chaptersRead: number; count: number }> }>(`/reading-stats/daily${qs ? `?${qs}` : ''}`)
  },
  getWeeklyStats: (from?: string, to?: string) => {
    const params = new URLSearchParams()
    if (from) params.set('from', from)
    if (to) params.set('to', to)
    const qs = params.toString()
    return apiFetch<{ type: string; data: Array<{ date: string; totalTimeMs: number; chaptersRead: number; count: number }> }>(`/reading-stats/weekly${qs ? `?${qs}` : ''}`)
  },
  getMonthlyStats: (from?: string, to?: string) => {
    const params = new URLSearchParams()
    if (from) params.set('from', from)
    if (to) params.set('to', to)
    const qs = params.toString()
    return apiFetch<{ type: string; data: Array<{ date: string; totalTimeMs: number; chaptersRead: number; count: number }> }>(`/reading-stats/monthly${qs ? `?${qs}` : ''}`)
  },
  getInsights: () => apiFetch<{ totalBooksRead: number; totalChapters: number; totalTimeMs: number; completedThisMonth: number; streakLength: number }>('/reading-stats/insights'),
  getRecommendations: () => apiFetch<Array<{ mangaId: string; sourceId: string; chaptersRead: number; totalTimeMs: number }>>('/reading-stats/recommendations'),

  // Streaks
  getStreaks: (days?: number) => apiFetch<Array<{ date: string; read: boolean }>>(`/streaks${days ? `?days=${days}` : ''}`),
  recordStreak: () => apiFetch<{ date: string; recorded: boolean }>('/streaks', { method: 'POST', body: JSON.stringify({}) }),

  // Goals
  getGoals: () => apiFetch<{ dailyTimeMinutes: number; dailyChapters: number }>('/goals'),
  setGoals: (data: { dailyTimeMinutes?: number; dailyChapters?: number }) =>
    apiFetch<{ dailyTimeMinutes: number; dailyChapters: number }>('/goals', { method: 'POST', body: JSON.stringify(data) }),

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

  // Explore
  getGenres: () => apiFetch<string[]>('/explore/genres'),
  getTrending: () => apiFetch<MangaSummary[]>('/explore/trending'),
  getUpdates: () => apiFetch<Array<{ mangaId: string; title: string; coverUrl: string; sourceId: string; sourceName: string; chapterNumber: number; chapterTitle?: string; updatedAt: string }>>('/explore/updates'),

  // Source categories / browse
  getSourceCategories: (id: string) => apiFetch<string[]>(`/sources/${id}/categories`),
  browseSourceCategory: (id: string, category: string, page = 1) =>
    apiFetch<MangaSummary[]>(`/sources/${id}/browse/${enc(category)}?page=${page}`),

  // Proxy
  proxyFetch: (url: string, options?: { method?: string; headers?: Record<string, string>; body?: string }) => {
    const base = '/api/v1/proxy/fetch'
    if (!options || options.method === 'GET') {
      return apiFetch<{ data?: string }>(`${base}?url=${encodeURIComponent(url)}`)
    }
    return apiFetch<{ data?: string }>(base, {
      method: 'POST',
      body: JSON.stringify({ url, ...options }),
    })
  },

  // Stats
  getStats: () => apiFetch<{ totalBooks: number; totalChapters: number; totalDownloads: number; storageUsedBytes: number }>('/stats'),

  // Reading Presets
  getPresets: () => apiFetch<Array<{ id: string; name: string; fontSize: number; lineHeight: number; paragraphSpacing: number; paragraphIndent: number; textAlignment: string; colorFilter: string }>>('/reader/presets'),
  createPreset: (data: { name: string; fontSize: number; lineHeight: number; paragraphSpacing: number; paragraphIndent: number; textAlignment: string; colorFilter: string }) =>
    apiFetch<{ id: string }>('/reader/presets', { method: 'POST', body: JSON.stringify(data) }),
  updatePreset: (id: string, data: Record<string, unknown>) =>
    apiFetch<{ success: boolean }>(`/reader/presets/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  deletePreset: (id: string) =>
    apiFetch<{ success: boolean }>(`/reader/presets/${id}`, { method: 'DELETE' }),
}
