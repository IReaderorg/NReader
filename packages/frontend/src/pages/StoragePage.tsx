import { useState, useEffect } from 'react'
import { ArrowLeft, Database, HardDrive, Download, BookOpen, RefreshCw } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { api } from '../api/client'

export function StoragePage() {
  const navigate = useNavigate()
  const [downloadSize, setDownloadSize] = useState('—')
  const [totalChapters, setTotalChapters] = useState(0)
  const [mangaCount, setMangaCount] = useState(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadStats()
  }, [])

  const loadStats = async () => {
    setLoading(true)
    try {
      const stats = await api.getDownloadStorageStats()
      setDownloadSize(formatBytes(stats.totalBytes))
      setTotalChapters(stats.totalChapters)
      setMangaCount(stats.mangaCount)
    } catch { /* ignore */ }
    setLoading(false)
  }

  const formatBytes = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
    if (bytes < 1024 * 1024 * 1024) return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
    return `${(bytes / (1024 * 1024 * 1024)).toFixed(2)} GB`
  }

  return (
    <div>
      <div className="flex items-center gap-3 mb-4">
        <button onClick={() => navigate('/settings')} className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-surface-hover transition-colors">
          <ArrowLeft className="w-4 h-4 text-text-secondary" strokeWidth={1.5} />
        </button>
        <h1 className="text-base font-bold text-text">Storage</h1>
      </div>

      <div className="space-y-4">
        {/* Downloads */}
        <div className="p-4 rounded-xl bg-surface border border-border-light">
          <div className="flex items-center gap-3 mb-3">
            <Download className="w-4.5 h-4.5 text-accent" strokeWidth={1.5} />
            <div>
              <p className="text-sm font-medium text-text">Downloads</p>
              <p className="text-xs text-text-secondary">Stored downloaded chapters</p>
            </div>
          </div>
          {loading ? (
            <div className="flex items-center gap-2 py-2">
              <RefreshCw className="w-3 h-3 animate-spin text-text-muted" strokeWidth={1.5} />
              <span className="text-xs text-text-muted">Loading stats…</span>
            </div>
          ) : (
            <>
              <div className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="text-text-secondary">Total Size</span>
                  <span className="text-text-muted">{downloadSize}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-text-secondary">Chapters</span>
                  <span className="text-text-muted">{totalChapters}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-text-secondary">Manga</span>
                  <span className="text-text-muted">{mangaCount}</span>
                </div>
              </div>
              <button
                onClick={() => navigate('/downloads')}
                className="mt-3 text-xs text-accent hover:underline"
              >
                Manage Downloads →
              </button>
            </>
          )}
        </div>

        {/* Database */}
        <div className="p-4 rounded-xl bg-surface border border-border-light">
          <div className="flex items-center gap-3 mb-3">
            <BookOpen className="w-4.5 h-4.5 text-accent" strokeWidth={1.5} />
            <div>
              <p className="text-sm font-medium text-text">Database</p>
              <p className="text-xs text-text-secondary">Library, history, and settings storage</p>
            </div>
          </div>
          <p className="text-xs text-text-muted">
            Database size is managed automatically. Old history entries are pruned after 90 days.
          </p>
        </div>

        {/* Cache */}
        <div className="p-4 rounded-xl bg-surface border border-border-light">
          <div className="flex items-center gap-3 mb-3">
            <Database className="w-4.5 h-4.5 text-accent" strokeWidth={1.5} />
            <div>
              <p className="text-sm font-medium text-text">Cache</p>
              <p className="text-xs text-text-secondary">Image and data cache (managed automatically)</p>
            </div>
          </div>
          <p className="text-xs text-text-muted">
            Browser cache is managed by the browser. Use the Advanced settings for cache management.
          </p>
        </div>

        {/* Total Summary */}
        <div className="p-4 rounded-xl bg-surface border border-accent/20">
          <div className="flex items-center gap-3">
            <HardDrive className="w-4.5 h-4.5 text-accent" strokeWidth={1.5} />
            <div>
              <p className="text-sm font-medium text-text">Download Storage Used</p>
              <p className="text-xs text-text-secondary">
                {loading ? 'Loading…' : `${downloadSize} across ${totalChapters} chapters in ${mangaCount} manga`}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
