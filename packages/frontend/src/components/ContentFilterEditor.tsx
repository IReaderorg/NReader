import { useState, useEffect } from 'react'
import { X, Filter, Plus, Trash2, Save, Download, CheckSquare, Square } from 'lucide-react'
import { useReaderStore, type ContentFilterEntry } from '../store/reader-store'
import { useScrollLock } from '../hooks/useScrollLock'

interface ContentFilterEditorProps {
  visible: boolean
  onClose: () => void
}

const SAMPLE_TEXT = 'Use arrow keys to navigate between chapters.\nRead more at novelsite.com\nPrevious Chapter ← Chapter 5 → Next Chapter'

export function ContentFilterEditor({ visible, onClose }: ContentFilterEditorProps) {
  const {
    contentFilterEnabled, contentFilterPatterns, contentFilterEntries, savedPatternSets,
    setContentFilterEnabled, setContentFilterPatterns, setContentFilterEntries, setSavedPatternSets,
  } = useReaderStore()
  const [patterns, setPatterns] = useState<string[]>([])
  const [enabledMap, setEnabledMap] = useState<Record<number, boolean>>({})
  const [sampleText, setSampleText] = useState(SAMPLE_TEXT)
  const [newPattern, setNewPattern] = useState('')
  const [testResults, setTestResults] = useState<Array<{ pattern: string; matches: boolean; error?: string }>>([])
  const [saveSetName, setSaveSetName] = useState('')
  const [showSaveInput, setShowSaveInput] = useState(false)

  useScrollLock(visible)

  useEffect(() => {
    if (!visible) return
    const lines = contentFilterPatterns.split('\n').filter(p => p.trim())
    setPatterns(lines)

    // Build enabled map from entries if they exist, else default all enabled
    if (contentFilterEntries.length > 0) {
      const map: Record<number, boolean> = {}
      contentFilterEntries.forEach((e, i) => { map[i] = e.enabled })
      setEnabledMap(map)
    } else {
      const map: Record<number, boolean> = {}
      lines.forEach((_, i) => { map[i] = true })
      setEnabledMap(map)
    }

    setShowSaveInput(false)
    setSaveSetName('')
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [visible, onClose, contentFilterPatterns, contentFilterEntries])

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
    // Sync enabled map to entries
    const entries: ContentFilterEntry[] = patterns.map((p, i) => ({
      pattern: p,
      enabled: enabledMap[i] ?? true,
    }))
    setContentFilterEntries(entries)
    onClose()
  }

  const addPattern = () => {
    if (!newPattern.trim()) return
    const idx = patterns.length
    setPatterns(prev => [...prev, newPattern.trim()])
    setEnabledMap(prev => ({ ...prev, [idx]: true }))
    setNewPattern('')
  }

  const removePattern = (idx: number) => {
    setPatterns(prev => prev.filter((_, i) => i !== idx))
    setEnabledMap(prev => {
      const next: Record<number, boolean> = {}
      for (const k of Object.keys(prev)) {
        const ki = Number(k)
        if (ki < idx) next[ki] = prev[ki]!
        else if (ki > idx) next[ki - 1] = prev[ki]!
      }
      return next
    })
  }

  const togglePattern = (idx: number) => {
    setEnabledMap(prev => ({ ...prev, [idx]: !(prev[idx] ?? true) }))
  }

  const savePatternSet = () => {
    if (!saveSetName.trim() || patterns.length === 0) return
    // Avoid duplicates by name — replace if exists
    const existing = savedPatternSets.filter(s => {
      try { return JSON.parse(s).name !== saveSetName.trim() } catch { return true }
    })
    setSavedPatternSets([...existing, JSON.stringify({ name: saveSetName.trim(), patterns })])
    setShowSaveInput(false)
    setSaveSetName('')
  }

  const loadPatternSet = (raw: string) => {
    try {
      const parsed = JSON.parse(raw)
      const loadedPatterns: string[] = parsed.patterns || parsed
      setPatterns(loadedPatterns)
      const map: Record<number, boolean> = {}
      loadedPatterns.forEach((_, i) => { map[i] = true })
      setEnabledMap(map)
    } catch { /* ignore */ }
  }

  const deletePatternSet = (idx: number) => {
    setSavedPatternSets(savedPatternSets.filter((_, i) => i !== idx))
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

          {/* Saved pattern sets */}
          {savedPatternSets.length > 0 && (
            <div>
              <p className="text-xs font-semibold text-text-secondary uppercase tracking-wider mb-2">Saved Pattern Sets</p>
              <div className="flex flex-wrap gap-1.5">
                {savedPatternSets.map((raw, i) => {
                  let name = `Set ${i + 1}`
                  try { const p = JSON.parse(raw); name = p.name || name } catch { /* use default */ }
                  return (
                    <div key={i} className="flex items-center gap-1 px-2 py-1 rounded-lg bg-surface-hover/50 group">
                      <button onClick={() => loadPatternSet(raw)} className="text-[11px] text-text-secondary hover:text-text truncate max-w-[100px]">
                        {name}
                      </button>
                      <button onClick={() => deletePatternSet(i)} className="w-4 h-4 flex items-center justify-center rounded text-text-muted hover:text-danger opacity-0 group-hover:opacity-100 transition-opacity">
                        <Trash2 className="w-2.5 h-2.5" />
                      </button>
                    </div>
                  )
                })}
              </div>
            </div>
          )}

          {/* Save current as set */}
          <div>
            {!showSaveInput ? (
              <button onClick={() => setShowSaveInput(true)} disabled={patterns.length === 0}
                className="flex items-center gap-1.5 text-xs text-accent hover:underline disabled:opacity-30 disabled:cursor-not-allowed">
                <Save className="w-3 h-3" /> Save Current Patterns
              </button>
            ) : (
              <div className="flex gap-2">
                <input value={saveSetName} onChange={e => setSaveSetName(e.target.value)}
                  onKeyDown={e => { if (e.key === 'Enter') savePatternSet(); if (e.key === 'Escape') setShowSaveInput(false) }}
                  placeholder="Set name…"
                  className="flex-1 bg-surface-hover/30 border border-border-light rounded-xl px-2 py-1.5 text-xs text-text placeholder:text-text-muted/40 outline-none focus:border-accent/50" />
                <button onClick={savePatternSet} className="w-7 h-7 flex items-center justify-center rounded-lg bg-accent/10 text-accent hover:bg-accent/20 transition-colors">
                  <Download className="w-3 h-3" />
                </button>
              </div>
            )}
          </div>

          {/* Pattern list with per-pattern toggle */}
          <div>
            <p className="text-xs font-semibold text-text-secondary uppercase tracking-wider mb-2">
              Filter Patterns ({patterns.length})
            </p>
            <div className="space-y-1.5">
              {patterns.map((p, i) => {
                const result = testResults[i]
                const enabled = enabledMap[i] ?? true
                return (
                  <div key={i} className={`flex items-center gap-2 px-3 py-2 rounded-xl group transition-opacity ${enabled ? 'bg-surface-hover/30' : 'bg-surface-hover/10 opacity-50'}`}>
                    <button onClick={() => togglePattern(i)}
                      className="w-5 h-5 flex items-center justify-center shrink-0 text-text-muted hover:text-text transition-colors"
                      title={enabled ? 'Disable pattern' : 'Enable pattern'}
                    >
                      {enabled ? <CheckSquare className="w-3.5 h-3.5 text-accent" /> : <Square className="w-3.5 h-3.5" />}
                    </button>
                    <div className={`w-2 h-2 rounded-full shrink-0 ${result?.error ? 'bg-danger' : result?.matches ? 'bg-accent' : 'bg-text-muted/30'}`} />
                    <code className={`flex-1 text-xs truncate ${enabled ? 'text-text' : 'text-text-muted'}`}>{p}</code>
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
