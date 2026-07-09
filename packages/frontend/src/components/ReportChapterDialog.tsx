import { useState, useEffect } from 'react'
import { AlertTriangle, X, Loader2 } from 'lucide-react'

export type IssueCategory =
  | 'missing_content'
  | 'incorrect_content'
  | 'formatting_issues'
  | 'translation_errors'
  | 'duplicate_content'
  | 'other'

interface CategoryOption {
  key: IssueCategory
  label: string
  description: string
}

const CATEGORIES: CategoryOption[] = [
  { key: 'missing_content', label: 'Missing Content', description: 'Chapter is empty or incomplete' },
  { key: 'incorrect_content', label: 'Incorrect Content', description: "Wrong chapter or content doesn't match" },
  { key: 'formatting_issues', label: 'Formatting Issues', description: 'Text formatting or layout problems' },
  { key: 'translation_errors', label: 'Translation Errors', description: 'Translation quality issues' },
  { key: 'duplicate_content', label: 'Duplicate Content', description: 'Repeated or duplicated text' },
  { key: 'other', label: 'Other', description: 'Other issues not listed above' },
]

interface ReportChapterDialogProps {
  chapterName: string
  visible: boolean
  onSubmit: (category: IssueCategory, description: string) => Promise<void>
  onClose: () => void
}

export function ReportChapterDialog({
  chapterName,
  visible,
  onSubmit,
  onClose,
}: ReportChapterDialogProps) {
  const [selectedCategory, setSelectedCategory] = useState<IssueCategory | null>(null)
  const [description, setDescription] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [submitted, setSubmitted] = useState(false)

  // Scroll lock
  useEffect(() => {
    if (visible) {
      const prev = document.body.style.overflow
      document.body.style.overflow = 'hidden'
      return () => { document.body.style.overflow = prev }
    }
  }, [visible])

  // Reset state when dialog opens
  useEffect(() => {
    if (visible) {
      setSelectedCategory(null)
      setDescription('')
      setError(null)
      setSubmitted(false)
    }
  }, [visible])

  if (!visible) return null

  const handleSubmit = async () => {
    if (!selectedCategory) return
    setSubmitting(true)
    setError(null)
    try {
      await onSubmit(selectedCategory, description)
      setSubmitted(true)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to submit report')
    }
    setSubmitting(false)
  }

  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center p-4">
      {/* Scrim */}
      <div className="absolute inset-0 bg-black/60 animate-in fade-in duration-150" onClick={onClose} />

      {/* Dialog */}
      <div className="relative bg-surface rounded-2xl shadow-2xl w-full max-w-md animate-in zoom-in-95 fade-in duration-150 max-h-[85vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-border-light shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-danger/10 flex items-center justify-center">
              <AlertTriangle className="w-4 h-4 text-danger" />
            </div>
            <h2 className="text-base font-semibold text-text">Report Broken Chapter</h2>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-lg text-text-muted hover:text-text hover:bg-surface-hover transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        {submitted ? (
          <div className="p-6 flex flex-col items-center justify-center text-center gap-3">
            <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center">
              <AlertTriangle className="w-6 h-6 text-accent" />
            </div>
            <p className="text-sm font-semibold text-text">Report Submitted</p>
            <p className="text-xs text-text-muted">Thank you! Your report helps improve the reading experience.</p>
            <button
              onClick={onClose}
              className="mt-2 px-6 py-2 rounded-xl bg-accent text-black text-sm font-medium hover:opacity-90 transition-opacity"
            >
              Done
            </button>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto p-5 space-y-4">
              {/* Chapter info */}
              <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-surface-hover/30">
                <AlertTriangle className="w-3.5 h-3.5 text-text-muted shrink-0" />
                <span className="text-xs text-text-muted font-medium">Chapter:</span>
                <span className="text-sm text-text truncate">{chapterName}</span>
              </div>

              {/* Issue type selection */}
              <div>
                <p className="text-xs font-semibold text-text-secondary uppercase tracking-wider mb-2">
                  Select Issue Type
                </p>
                <div className="space-y-1.5">
                  {CATEGORIES.map(cat => (
                    <label
                      key={cat.key}
                      className={`flex items-start gap-3 px-3 py-2.5 rounded-xl cursor-pointer transition-colors ${
                        selectedCategory === cat.key
                          ? 'bg-accent/10 ring-1 ring-accent/30'
                          : 'hover:bg-surface-hover/50'
                      }`}
                    >
                      <input
                        type="radio"
                        name="issueCategory"
                        value={cat.key}
                        checked={selectedCategory === cat.key}
                        onChange={() => setSelectedCategory(cat.key)}
                        className="mt-0.5 accent-[hsl(var(--accent))]"
                      />
                      <div className="min-w-0">
                        <p className="text-sm font-medium text-text">{cat.label}</p>
                        <p className="text-xs text-text-muted">{cat.description}</p>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {/* Description */}
              <div>
                <p className="text-xs font-semibold text-text-secondary uppercase tracking-wider mb-2">
                  Additional Details <span className="font-normal normal-case">(optional)</span>
                </p>
                <textarea
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                  placeholder="Describe the issue you're experiencing..."
                  rows={3}
                  maxLength={500}
                  className="w-full bg-surface-hover/30 border border-border-light rounded-xl px-3 py-2.5 text-sm text-text placeholder:text-text-muted/40 outline-none focus:border-accent/50 transition-colors resize-none"
                />
                <p className="text-[10px] text-text-muted text-right mt-1">{description.length}/500</p>
              </div>

              {/* Error */}
              {error && (
                <p className="text-xs text-danger text-center bg-danger/5 rounded-lg px-3 py-2">{error}</p>
              )}
            </div>

            {/* Footer */}
            <div className="flex items-center justify-end gap-2 px-5 py-4 border-t border-border-light shrink-0">
              <button
                onClick={onClose}
                className="px-4 py-2 rounded-xl text-sm font-medium text-text-secondary hover:bg-surface-hover transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                disabled={!selectedCategory || submitting}
                className="px-5 py-2 rounded-xl text-sm font-medium bg-accent text-black hover:opacity-90 transition-opacity disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {submitting && <Loader2 className="w-4 h-4 animate-spin" />}
                Submit Report
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
