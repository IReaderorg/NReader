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
  getSources: () => apiFetch<SourceInfo[]>('/sources'),
  getSource: (id: string) => apiFetch<SourceInfo>(`/sources/${id}`),
  getPopular: (id: string, page = 1) => apiFetch<MangaSummary[]>(`/sources/${id}/popular?page=${page}`),
  search: (id: string, query: string, page = 1) => apiFetch<MangaSummary[]>(`/sources/${id}/search?q=${encodeURIComponent(query)}&page=${page}`),
  getDetail: (id: string, mangaId: string) => apiFetch<MangaDetail>(`/sources/${id}/detail/${enc(mangaId)}`),
  getChapters: (id: string, mangaId: string) => apiFetch<Chapter[]>(`/sources/${id}/chapters/${enc(mangaId)}`),
  getPages: (id: string, chapterId: string) => apiFetch<Page[]>(`/sources/${id}/pages/${enc(chapterId)}`),
}
