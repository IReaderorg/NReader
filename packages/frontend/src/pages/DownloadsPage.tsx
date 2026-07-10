import { useEffect, useState } from 'react'
import { useDownloadStore, useDownloadWs } from '../store/download-store'
import { Download, X, CheckCircle, AlertCircle, Clock, RefreshCw, Trash2, Pause, Play, ArrowUpDown, HardDrive, BookOpen, ChevronUp, ChevronDown } from 'lucide-react'

export function DownloadsPage() {
  const {
    jobs, loading, storageStats, fetchDownloads, fetchStorageStats,
    cancelDownload, removeDownload, retryDownload, clearCompleted,
    pauseDownload, resumeDownload, pauseAllDownloads, resumeAllDownloads,
    deleteCompletedDownloads, deleteByManga, setPriority,
  } = useDownloadStore()

  const [view, setView] = useState<'all' | 'queue' | 'storage'>('all')

  useDownloadWs()

  useEffect(() => {
    fetchDownloads()
    fetchStorageStats()
  }, [fetchDownloads, fetchStorageStats])

  if (loading && jobs.length === 0) return <DownloadsSkeleton />

  const statusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="w-4 h-4 text-green-400" strokeWidth={1.5} />
      case 'failed': return <AlertCircle className="w-4 h-4 text-danger" strokeWidth={1.5} />
      case 'cancelled': return <X className="w-4 h-4 text-text-muted" strokeWidth={1.5} />
      case 'downloading': return <Clock className="w-4 h-4 text-accent animate-pulse" strokeWidth={1.5} />
      case 'paused': return <Pause className="w-4 h-4 text-yellow-400" strokeWidth={1.5} />
      default: return <Clock className="w-4 h-4 text-text-muted" strokeWidth={1.5} />
    }
  }

  const statusLabel = (status: string) => {
    switch (status) {
      case 'queued': return 'Queued'
      case 'downloading': return 'Downloading\u2026'
      case 'paused': return 'Paused'
      case 'completed': return 'Completed'
      case 'failed': return 'Failed'
      case 'cancelled': return 'Cancelled'
      default: return status
    }
  }

  const hasActive = jobs.some(j => j.status === 'queued' || j.status === 'downloading')
  const hasFailed = jobs.some(j => j.status === 'failed')

  const activeJobs = jobs.filter(j => ['queued', 'downloading', 'paused'].includes(j.status))
  const completedJobs = jobs.filter(j => j.status === 'completed')
  const failedJobs = jobs.filter(j => j.status === 'failed')
  const otherJobs = jobs.filter(j => ['cancelled'].includes(j.status))

  const sortedActive = [...activeJobs].sort((a, b) => b.priority - a.priority)

  const formatBytes = (bytes: number) => {
    if (bytes === 0) return '0 B'
    const k = 1024
    const sizes = ['B', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i]
  }

  const tabs = [
    { id: 'all' as const, label: 'All', icon: Download },
    { id: 'queue' as const, label: 'Queue', icon: ArrowUpDown },
    { id: 'storage' as const, label: 'Storage', icon: HardDrive },
  ]

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <h1 className="text-base font-bold text-text">Downloads</h1>
          <span className="text-xs text-text-muted">{jobs.length} items</span>
        </div>
      </div>

      <div className="flex gap-1 mb-4 bg-surface rounded-lg p-1 border border-border-light">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setView(tab.id)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs transition-all flex-1 justify-center ${
              view === tab.id
                ? 'bg-accent/10 text-accent font-medium'
                : 'text-text-muted hover:text-text'
            }`}
          >
            <tab.icon className="w-3.5 h-3.5" />
            {tab.label}
          </button>
        ))}
      </div>

      {view === 'all' && (
        <>
          {jobs.length > 0 && (
            <div className="flex items-center gap-2 mb-4 flex-wrap">
              {hasActive && (
                <>
                  <button onClick={pauseAllDownloads} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-surface border border-border-light text-xs text-text-secondary hover:text-text hover:bg-surface-hover transition-colors">
                    <Pause className="w-3 h-3" />
                    Pause All
                  </button>
                  <button onClick={resumeAllDownloads} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-surface border border-border-light text-xs text-text-secondary hover:text-text hover:bg-surface-hover transition-colors">
                    <Play className="w-3 h-3" />
                    Resume All
                  </button>
                </>
              )}
              {hasFailed && (
                <button onClick={() => jobs.filter(j => j.status === 'failed').forEach(j => retryDownload(j.id))} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-surface border border-border-light text-xs text-text-secondary hover:text-text hover:bg-surface-hover transition-colors">
                  <RefreshCw className="w-3 h-3" />
                  Retry Failed
                </button>
              )}
              {completedJobs.length > 0 && (
                <>
                  <button onClick={clearCompleted} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-surface border border-border-light text-xs text-text-secondary hover:text-danger transition-colors">
                    <Trash2 className="w-3 h-3" />
                    Clear Completed
                  </button>
                  <button onClick={deleteCompletedDownloads} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-surface border border-border-light text-xs text-text-secondary hover:text-danger transition-colors">
                    <Trash2 className="w-3 h-3" />
                    Delete Saved
                  </button>
                </>
              )}
            </div>
          )}

          {jobs.length === 0 && (
            <div className="flex flex-col items-center justify-center py-20">
              <Download className="w-10 h-10 text-text-muted/40 mb-3" strokeWidth={1} />
              <h2 className="font-semibold text-sm text-text mb-1">No downloads</h2>
              <p className="text-xs text-text-secondary text-center max-w-xs">
                Download chapters from manga detail pages to read offline.
              </p>
            </div>
          )}

          {activeJobs.length > 0 && (
            <div className="mb-6">
              <h2 className="text-[11px] font-semibold uppercase tracking-wider text-text-muted mb-2">
                Active ({activeJobs.length})
              </h2>
              <div className="space-y-2">
                {sortedActive.map(job => (
                  <div key={job.id} className="px-4 py-3 rounded-xl bg-surface border border-border-light">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2 min-w-0">
                        {statusIcon(job.status)}
                        <div className="min-w-0">
                          {job.mangaTitle && <p className="text-[10px] text-text-muted truncate">{job.mangaTitle}</p>}
                          <span className="text-xs font-medium text-text truncate">
                            Ch. {job.chapterNumber}{job.chapterTitle ? ` \u2013 ${job.chapterTitle}` : ''}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-1">
                        <button onClick={() => setPriority(job.id, job.priority + 1)} className="w-6 h-6 flex items-center justify-center rounded text-text-muted hover:text-text">
                          <ChevronUp className="w-3 h-3" />
                        </button>
                        <button onClick={() => setPriority(job.id, Math.max(0, job.priority - 1))} className="w-6 h-6 flex items-center justify-center rounded text-text-muted hover:text-text">
                          <ChevronDown className="w-3 h-3" />
                        </button>
                        {job.status === 'downloading' && (
                          <button onClick={() => pauseDownload(job.id)} className="w-7 h-7 flex items-center justify-center rounded-lg text-text-muted hover:text-yellow-400 transition-colors">
                            <Pause className="w-3.5 h-3.5" />
                          </button>
                        )}
                        {job.status === 'paused' && (
                          <button onClick={() => resumeDownload(job.id)} className="w-7 h-7 flex items-center justify-center rounded-lg text-text-muted hover:text-accent transition-colors">
                            <Play className="w-3.5 h-3.5" />
                          </button>
                        )}
                        <button onClick={() => cancelDownload(job.id)} className="w-7 h-7 flex items-center justify-center rounded-lg text-text-muted hover:text-danger transition-colors">
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                    <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-500 ${job.status === 'paused' ? 'bg-yellow-500' : 'bg-accent'}`}
                        style={{ width: `${job.progress}%` }}
                      />
                    </div>
                    <div className="flex justify-between mt-1.5">
                      <span className="text-[10px] text-text-muted">{statusLabel(job.status)}</span>
                      <span className="text-[10px] text-text-muted">{job.progress}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {failedJobs.length > 0 && (
            <div className="mb-6">
              <h2 className="text-[11px] font-semibold uppercase tracking-wider text-text-muted mb-2">
                Failed ({failedJobs.length})
              </h2>
              <div className="space-y-1">
                {failedJobs.map(job => (
                  <div key={job.id} className="flex items-center justify-between px-3 py-2 rounded-lg hover:bg-surface transition-colors">
                    <div className="flex items-center gap-2 min-w-0">
                      {statusIcon(job.status)}
                      <div className="min-w-0">
                        <p className="text-xs text-text truncate">Ch. {job.chapterNumber}</p>
                        <p className="text-[10px] text-text-muted">{job.error ? `Error: ${job.error}` : 'Failed'}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      <button onClick={() => retryDownload(job.id)} className="px-2 py-1 rounded text-[10px] bg-surface border border-border-light text-text-secondary hover:text-text">
                        Retry ({job.retryCount}/{job.maxRetries})
                      </button>
                      <button onClick={() => removeDownload(job.id)} className="w-7 h-7 flex items-center justify-center rounded-lg text-text-muted hover:text-danger transition-colors">
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {completedJobs.length > 0 && (
            <div className="mb-6">
              <h2 className="text-[11px] font-semibold uppercase tracking-wider text-text-muted mb-2">
                Completed ({completedJobs.length})
              </h2>
              <div className="space-y-1">
                {completedJobs.map(job => (
                  <div key={job.id} className="flex items-center justify-between px-3 py-2 rounded-lg hover:bg-surface transition-colors">
                    <div className="flex items-center gap-2 min-w-0">
                      {statusIcon(job.status)}
                      <div className="min-w-0">
                        <p className="text-xs text-text truncate">
                          {job.mangaTitle && <span className="text-text-muted">{job.mangaTitle} \u2013 </span>}
                          Ch. {job.chapterNumber}
                        </p>
                        <p className="text-[10px] text-text-muted">
                          {job.completedAt ? new Date(job.completedAt).toLocaleDateString() : ''}
                          {job.totalBytes ? ` \u00b7 ${formatBytes(job.totalBytes)}` : ''}
                        </p>
                      </div>
                    </div>
                    <button onClick={() => removeDownload(job.id)} className="w-7 h-7 flex items-center justify-center rounded-lg text-text-muted hover:text-danger transition-colors">
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {otherJobs.length > 0 && (
            <div>
              <h2 className="text-[11px] font-semibold uppercase tracking-wider text-text-muted mb-2">
                Cancelled
              </h2>
              <div className="space-y-1">
                {otherJobs.map(job => (
                  <div key={job.id} className="flex items-center justify-between px-3 py-2 rounded-lg hover:bg-surface transition-colors">
                    <div className="flex items-center gap-2 min-w-0">
                      {statusIcon(job.status)}
                      <div className="min-w-0">
                        <p className="text-xs text-text truncate">Ch. {job.chapterNumber}</p>
                        <p className="text-[10px] text-text-muted">{statusLabel(job.status)}</p>
                      </div>
                    </div>
                    <button onClick={() => removeDownload(job.id)} className="w-7 h-7 flex items-center justify-center rounded-lg text-text-muted hover:text-danger transition-colors">
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      )}

      {view === 'queue' && (
        <div>
          {sortedActive.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20">
              <ArrowUpDown className="w-10 h-10 text-text-muted/40 mb-3" strokeWidth={1} />
              <h2 className="font-semibold text-sm text-text mb-1">Queue is empty</h2>
              <p className="text-xs text-text-secondary text-center max-w-xs">
                Downloads will appear here with priority ordering.
              </p>
            </div>
          ) : (
            <>
              <div className="flex items-center gap-2 mb-3">
                <h2 className="text-[11px] font-semibold uppercase tracking-wider text-text-muted">
                  Queue ({sortedActive.length})
                </h2>
                <span className="text-[10px] text-text-muted">\u00b7 Priority order</span>
              </div>
              <div className="space-y-1">
                {sortedActive.map((job, i) => (
                  <div key={job.id} className="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-surface border border-border-light">
                    <span className="text-[10px] text-text-muted w-5 text-right font-mono">{i + 1}</span>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-text truncate">Ch. {job.chapterNumber}</span>
                        <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                          job.status === 'downloading' ? 'bg-accent/10 text-accent' :
                          job.status === 'paused' ? 'bg-yellow-500/10 text-yellow-400' :
                          'bg-white/5 text-text-muted'
                        }`}>
                          {statusLabel(job.status)}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] text-text-muted">P{job.priority}</span>
                      <button onClick={() => setPriority(job.id, job.priority + 1)} className="w-5 h-5 flex items-center justify-center rounded text-text-muted hover:text-text">
                        <ChevronUp className="w-3 h-3" />
                      </button>
                      <button onClick={() => setPriority(job.id, Math.max(0, job.priority - 1))} className="w-5 h-5 flex items-center justify-center rounded text-text-muted hover:text-text">
                        <ChevronDown className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      )}

      {view === 'storage' && (
        <div>
          {storageStats && (
            <div className="grid grid-cols-3 gap-3 mb-4">
              <div className="px-4 py-3 rounded-xl bg-surface border border-border-light text-center">
                <HardDrive className="w-5 h-5 text-accent mx-auto mb-1" strokeWidth={1.5} />
                <p className="text-lg font-bold text-text">{formatBytes(storageStats.totalBytes)}</p>
                <p className="text-[10px] text-text-muted">Total Storage</p>
              </div>
              <div className="px-4 py-3 rounded-xl bg-surface border border-border-light text-center">
                <BookOpen className="w-5 h-5 text-accent mx-auto mb-1" strokeWidth={1.5} />
                <p className="text-lg font-bold text-text">{storageStats.totalChapters}</p>
                <p className="text-[10px] text-text-muted">Chapters</p>
              </div>
              <div className="px-4 py-3 rounded-xl bg-surface border border-border-light text-center">
                <Download className="w-5 h-5 text-accent mx-auto mb-1" strokeWidth={1.5} />
                <p className="text-lg font-bold text-text">{storageStats.mangaCount}</p>
                <p className="text-[10px] text-text-muted">Series</p>
              </div>
            </div>
          )}

          {completedJobs.length > 0 && (
            <>
              <h2 className="text-[11px] font-semibold uppercase tracking-wider text-text-muted mb-2">
                Saved Downloads
              </h2>
              <div className="space-y-1">
                {Array.from(new Map(completedJobs.map(j => [j.mangaId, j])).values()).map(manga => {
                  const mangaJobs = completedJobs.filter(j => j.mangaId === manga.mangaId)
                  return (
                    <div key={manga.mangaId} className="flex items-center justify-between px-3 py-2 rounded-lg hover:bg-surface transition-colors">
                      <div className="flex items-center gap-2 min-w-0">
                        <BookOpen className="w-4 h-4 text-text-muted" strokeWidth={1.5} />
                        <div className="min-w-0">
                          <p className="text-xs text-text truncate">{manga.mangaTitle || manga.mangaId}</p>
                          <p className="text-[10px] text-text-muted">{mangaJobs.length} chapters</p>
                        </div>
                      </div>
                      <button onClick={() => deleteByManga(manga.mangaId)} className="flex items-center gap-1 px-2 py-1 rounded text-[10px] text-text-muted hover:text-danger transition-colors">
                        <Trash2 className="w-3 h-3" />
                        Delete
                      </button>
                    </div>
                  )
                })}
              </div>
              <div className="mt-4">
                <button onClick={deleteCompletedDownloads} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-danger/10 border border-danger/20 text-xs text-danger hover:bg-danger/20 transition-colors w-full justify-center">
                  <Trash2 className="w-3.5 h-3.5" />
                  Delete All Saved Downloads
                </button>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  )
}

function DownloadsSkeleton() {
  return (
    <div className="animate-pulse space-y-3">
      <div className="h-4 bg-surface rounded w-24 mb-4" />
      <div className="flex gap-1 mb-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="h-8 bg-surface rounded-lg flex-1" />
        ))}
      </div>
      {Array.from({ length: 3 }).map((_, i) => (
        <div key={i} className="h-20 bg-surface rounded-xl" />
      ))}
    </div>
  )
}
