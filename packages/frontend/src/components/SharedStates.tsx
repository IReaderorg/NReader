import { type ReactNode } from 'react'
import { AlertCircle, Inbox, Loader2, RefreshCw } from 'lucide-react'
import { Link } from 'react-router-dom'

// ── Error State ──────────────────────────────────────────────
interface ErrorStateProps {
  message: string
  onRetry?: () => void
  className?: string
}

export function ErrorState({ message, onRetry, className = '' }: ErrorStateProps) {
  return (
    <div className={`flex flex-col items-center justify-center py-20 ${className}`}>
      <div className="w-12 h-12 rounded-full bg-danger/10 flex items-center justify-center mb-3">
        <AlertCircle className="w-5 h-5 text-danger" strokeWidth={1.5} />
      </div>
      <p className="text-sm text-text-secondary text-center max-w-xs mb-4">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-accent text-black text-xs font-semibold hover:brightness-110 transition-all"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          Retry
        </button>
      )}
    </div>
  )
}

// ── Empty State ──────────────────────────────────────────────
interface EmptyStateProps {
  icon?: ReactNode
  title: string
  description?: string
  action?: { label: string; to?: string; onClick?: () => void }
  className?: string
}

export function EmptyState({ icon, title, description, action, className = '' }: EmptyStateProps) {
  return (
    <div className={`flex flex-col items-center justify-center py-20 ${className}`}>
      {icon || <Inbox className="w-10 h-10 text-text-muted/40 mb-3" strokeWidth={1} />}
      <h2 className="font-semibold text-sm text-text mb-1">{title}</h2>
      {description && (
        <p className="text-xs text-text-secondary text-center max-w-xs mb-4">{description}</p>
      )}
      {action && (
        action.to ? (
          <Link
            to={action.to}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-accent text-black text-xs font-semibold hover:brightness-110 transition-all"
          >
            {action.label}
          </Link>
        ) : action.onClick ? (
          <button
            onClick={action.onClick}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-accent text-black text-xs font-semibold hover:brightness-110 transition-all"
          >
            {action.label}
          </button>
        ) : null
      )}
    </div>
  )
}

// ── Loading State ────────────────────────────────────────────
interface LoadingStateProps {
  message?: string
  variant?: 'inline' | 'fullscreen' | 'skeleton'
  className?: string
}

export function LoadingState({ message, variant = 'inline', className = '' }: LoadingStateProps) {
  if (variant === 'fullscreen') {
    return (
      <div className={`fixed inset-0 z-40 bg-bg flex items-center justify-center ${className}`}>
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="w-6 h-6 text-accent animate-spin" strokeWidth={1.5} />
          {message && <p className="text-xs text-text-muted">{message}</p>}
        </div>
      </div>
    )
  }

  return (
    <div className={`flex flex-col items-center justify-center py-16 ${className}`}>
      <Loader2 className="w-5 h-5 text-accent animate-spin mb-2" strokeWidth={1.5} />
      {message && <p className="text-xs text-text-muted">{message}</p>}
    </div>
  )
}

// ── Skeleton Grid (for manga card loading) ───────────────────
interface SkeletonGridProps {
  count?: number
  className?: string
}

export function SkeletonGrid({ count = 12, className = '' }: SkeletonGridProps) {
  return (
    <div className={`animate-pulse grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-3 ${className}`}>
      {Array.from({ length: count }).map((_, i) => (
        <div key={i}>
          <div className="aspect-[3/4] bg-surface rounded-lg" />
          <div className="h-3 bg-surface rounded mt-1.5 w-3/4" />
          <div className="h-2.5 bg-surface rounded mt-1 w-1/2" />
        </div>
      ))}
    </div>
  )
}
