import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDownloadStore } from '../store/download-store'
import { Download, X, RotateCcw, CheckCircle, AlertCircle, Clock } from 'lucide-react'

export function DownloadsPage() {
  const { jobs, loading, fetchDownloads, cancelDownload, removeDownload } = useDownloadStore()

  useEffect(() => {
    fetchDownloads()
    // Poll for updates every 2s
    const interval = setInterval(fetchDownloads, 2000)
    return () => clearInterval(interval)
  }, [fetchDownloads])

  if (loading && jobs.length === 0) return <DownloadsSkeleton />

  const statusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="w-4 h-4 text-green-400" strokeWidth={1.5} />
      case 'failed': return <AlertCircle className="w-4 h-4 text-danger" strokeWidth={1.5} />
      case 'cancelled': return <X className="w-4 h-4 text-text-muted" strokeWidth={1.5} />
      case 'downloading': return <Clock className="w-4 h-4 text-accent animate-pulse" strokeWidth={1.5} />
      default: return <Clock className="w-4 h-4 text-text-muted" strokeWidth={1.5} />
    }
  }

  const statusLabel = (status: string) => {
    switch (status) {
      case 'queued': return 'Queued'
      case 'downloading': return 'Downloading…'
      case 'completed': return 'Completed'
      case 'failed': return 'Failed'
      case 'cancelled': return 'Cancelled'
      default: return status
    }
  }

  const activeJobs = jobs.filter(j => j.status === 'queued' || j.status === 'downloading')
  const completedJobs = jobs.filter(j => j.status === 'completed')
  const otherJobs = jobs.filter(j => !['queued', 'downloading', 'completed'].includes(j.status))

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <h1 className="text-base font-bold text-text">Downloads</h1>
          <span className="text-xs text-text-muted">{jobs.length} items</span>
        </div>
      </div>

      {/* Empty state */}
      {jobs.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20">
          <Download className="w-10 h-10 text-text-muted/40 mb-3" strokeWidth={1} />
          <h2 className="font-semibold text-sm text-text mb-1">No downloads</h2>
          <p className="text-xs text-text-secondary text-center max-w-xs">
            Download chapters from manga detail pages to read offline.
          </p>
        </div>
      )}

      {/* Active downloads */}
      {activeJobs.length > 0 && (
        <div className="mb-6">
          <h2 className="text-[11px] font-semibold uppercase tracking-wider text-text-muted mb-2">
            Active ({activeJobs.length})
          </h2>
          <div className="space-y-2">
            {activeJobs.map(job => (
              <div key={job.id} className="px-4 py-3 rounded-xl bg-surface border border-border-light">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2 min-w-0">
                    {statusIcon(job.status)}
                    <span className="text-xs font-medium text-text truncate">
                      Ch. {job.chapterNumber}
                    </span>
                  </div>
                  <button
                    onClick={() => cancelDownload(job.id)}
                    className="w-7 h-7 flex items-center justify-center rounded-lg text-text-muted hover:text-danger transition-colors"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
                {/* Progress bar */}
                <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-accent rounded-full transition-all duration-500"
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

      {/* Completed downloads */}
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
                    <p className="text-xs text-text truncate">Ch. {job.chapterNumber}</p>
                    <p className="text-[10px] text-text-muted">
                      {job.completedAt ? new Date(job.completedAt).toLocaleDateString() : ''}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => removeDownload(job.id)}
                  className="w-7 h-7 flex items-center justify-center rounded-lg text-text-muted hover:text-danger transition-colors"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Failed/cancelled */}
      {otherJobs.length > 0 && (
        <div>
          <h2 className="text-[11px] font-semibold uppercase tracking-wider text-text-muted mb-2">
            Other
          </h2>
          <div className="space-y-1">
            {otherJobs.map(job => (
              <div key={job.id} className="flex items-center justify-between px-3 py-2 rounded-lg hover:bg-surface transition-colors">
                <div className="flex items-center gap-2 min-w-0">
                  {statusIcon(job.status)}
                  <div className="min-w-0">
                    <p className="text-xs text-text truncate">Ch. {job.chapterNumber}</p>
                    <p className="text-[10px] text-text-muted">{statusLabel(job.status)}{job.error ? `: ${job.error}` : ''}</p>
                  </div>
                </div>
                <button
                  onClick={() => removeDownload(job.id)}
                  className="w-7 h-7 flex items-center justify-center rounded-lg text-text-muted hover:text-danger transition-colors"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

function DownloadsSkeleton() {
  return (
    <div className="animate-pulse space-y-3">
      <div className="h-4 bg-surface rounded w-24 mb-4" />
      {Array.from({ length: 3 }).map((_, i) => (
        <div key={i} className="h-20 bg-surface rounded-xl" />
      ))}
    </div>
  )
}
