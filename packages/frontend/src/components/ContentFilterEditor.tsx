import { useState, useEffect } from 'react'
import { X, Filter, Plus, Trash2 } from 'lucide-react'
import { useReaderStore } from '../store/reader-store'
import { useScrollLock } from '../hooks/useScrollLock'

interface ContentFilterEditorProps {
  visible: boolean
  onClose: () => void
}

const SAMPLE_TEXT = 'Use arrow keys to navigate between chapters.\nRead more at novelsite.com\nPrevious Chapter ← Chapter 5 → Next Chapter'

export function ContentFilterEditor({ visible, onClose }: ContentFilterEditorProps) {
  const { contentFilterEnabled, contentFilterPatterns, setContentFilterEnabled, setContentFilterPatterns } = useReaderStore()
  const [patterns, setPatterns] = useState<string[]>([])
  const [sampleText, setSampleText] = useState(SAMPLE_TEXT)
  const [newPattern, setNewPattern] = useState('')
  const [testResults, setTestResults] = useState<Array<{ pattern: string; matches: boolean; error?: string }>>([])

  useScrollLock(visible)

  useEffect(() => {
    if (!visible) return
    setPatterns(contentFilterPatterns.split('\n').filter(p => p.trim()))
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [visible, onClose, contentFilterPatterns])

  useEffect(() => {
    const results = patterns.map(p => {
      try {
        const regex = new RegExp(p, 'i')
        return { pattern: p, matches: regex.test(sampleText) }
      } catch {
        return { pattern: p, matches: false, error: 'Invalid regex' }
      }
    })
    setTestResults(results)
  }, [patterns, sampleText])

  if (!visible) return null

  const handleSave = () => {
    setContentFilterPatterns(patterns.join('\n'))
    onClose()
  }

  const addPattern = () => {
    if (!newPattern.trim()) return
    setPatterns(prev => [...prev, newPattern.trim()])
    setNewPattern('')
  }

  const removePattern = (idx: number) => {
    setPatterns(prev => prev.filter((_, i) => i !== idx))
  }

  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 animate-in fade-in duration-150" onClick={onClose} />
      <div className="relative bg-surface rounded-2xl shadow-2xl w-full max-w-lg animate-in zoom-in-95 fade-in duration-150 max-h-[85vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-border-light shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-accent/10 flex items-center justify-center">
              <Filter className="w-4 h-4 text-accent" />
            </div>
            <h2 className="text-base font-semibold text-text">Content Filter</h2>
          </div>
          <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-lg text-text-muted hover:text-text hover:bg-surface-hover transition-colors">
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {/* Enable toggle */}
          <label className="flex items-center justify-between px-3 py-2 rounded-xl bg-surface-hover/30 cursor-pointer">
            <div>
              <p className="text-sm font-medium text-text">Enable Content Filter</p>
              <p className="text-xs text-text-muted">Remove matching lines from chapters</p>
            </div>
            <input type="checkbox" checked={contentFilterEnabled} onChange={e => setContentFilterEnabled(e.target.checked)}
              className="w-4 h-4 rounded accent-[hsl(var(--accent))]" />
          </label>

          {/* Pattern list */}
          <div>
            <p className="text-xs font-semibold text-text-secondary uppercase tracking-wider mb-2">
              Filter Patterns ({patterns.length})
            </p>
            <div className="space-y-1.5">
              {patterns.map((p, i) => {
                const result = testResults[i]
                return (
                  <div key={i} className="flex items-center gap-2 px-3 py-2 rounded-xl bg-surface-hover/30 group">
                    <div className={`w-2 h-2 rounded-full shrink-0 ${result?.error ? 'bg-danger' : result?.matches ? 'bg-accent' : 'bg-text-muted/30'}`} />
                    <code className="flex-1 text-xs text-text truncate">{p}</code>
                    <button onClick={() => removePattern(i)}
                      className="w-6 h-6 flex items-center justify-center rounded text-text-muted hover:text-danger hover:bg-danger/10 transition-colors opacity-0 group-hover:opacity-100">
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </div>
                )
              })}
              {patterns.length === 0 && (
                <p className="text-xs text-text-muted/60 text-center py-4">No patterns defined</p>
              )}
            </div>
          </div>

          {/* Add pattern */}
          <div className="flex gap-2">
            <input value={newPattern} onChange={e => setNewPattern(e.target.value)}
              onKeyDown={e => { if (e.key === 'Enter') addPattern() }}
              placeholder="New regex pattern..."
              className="flex-1 bg-surface-hover/30 border border-border-light rounded-xl px-3 py-2 text-sm text-text placeholder:text-text-muted/40 outline-none focus:border-accent/50" />
            <button onClick={addPattern}
              className="w-9 h-9 flex items-center justify-center rounded-xl bg-accent/10 text-accent hover:bg-accent/20 transition-colors">
              <Plus className="w-4 h-4" />
            </button>
          </div>

          {/* Sample text + live preview */}
          <div>
            <p className="text-xs font-semibold text-text-secondary uppercase tracking-wider mb-2">Test Text</p>
            <textarea value={sampleText} onChange={e => setSampleText(e.target.value)}
              rows={4}
              className="w-full bg-surface-hover/30 border border-border-light rounded-xl px-3 py-2 text-sm text-text placeholder:text-text-muted/40 outline-none focus:border-accent/50 transition-colors resize-none font-mono" />
            {testResults.some(r => r.matches) && (
              <p className="text-[10px] text-accent mt-1">
                {testResults.filter(r => r.matches).length} pattern(s) match the test text
              </p>
            )}
            {testResults.some(r => r.error) && (
              <p className="text-[10px] text-danger mt-1">
                {testResults.filter(r => r.error).length} pattern(s) have invalid regex
              </p>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-2 px-5 py-4 border-t border-border-light shrink-0">
          <button onClick={onClose} className="px-4 py-2 rounded-xl text-sm font-medium text-text-secondary hover:bg-surface-hover transition-colors">Cancel</button>
          <button onClick={handleSave}
            className="px-5 py-2 rounded-xl text-sm font-medium bg-accent text-black hover:opacity-90 transition-opacity">Save</button>
        </div>
      </div>
    </div>
  )
}
