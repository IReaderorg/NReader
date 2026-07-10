import { useState, useEffect } from 'react'
import { X, Languages, BookOpen, Plus, Trash2 } from 'lucide-react'
import { useTranslationStore, type EngineType } from '../store/translation-store'
import { useScrollLock } from '../hooks/useScrollLock'

interface TranslationPanelProps {
  visible: boolean
  onClose: () => void
  textContent: string
}

const LANGUAGES = [
  { code: 'en', name: 'English' },
  { code: 'ja', name: 'Japanese' },
  { code: 'zh', name: 'Chinese' },
  { code: 'ko', name: 'Korean' },
  { code: 'es', name: 'Spanish' },
  { code: 'fr', name: 'French' },
  { code: 'de', name: 'German' },
  { code: 'pt', name: 'Portuguese' },
  { code: 'ru', name: 'Russian' },
  { code: 'ar', name: 'Arabic' },
  { code: 'vi', name: 'Vietnamese' },
  { code: 'th', name: 'Thai' },
]

const ENGINES: { type: EngineType; label: string }[] = [
  { type: 'mock', label: 'Mock' },
  { type: 'deepl', label: 'DeepL' },
  { type: 'ai', label: 'LLM' },
  { type: 'openai', label: 'OpenAI' },
  { type: 'deepseek', label: 'DeepSeek' },
  { type: 'libre', label: 'LibreTranslate' },
  { type: 'ollama', label: 'Ollama' },
  { type: 'openrouter', label: 'OpenRouter' },
]

export function TranslationPanel({ visible, onClose, textContent }: TranslationPanelProps) {
  const {
    enabled, sourceLang, targetLang, engine, autoTranslate,
    glossary,
    setEnabled, setSourceLang, setTargetLang, setEngine, setAutoTranslate,
    loadGlossary, addGlossaryEntry, removeGlossaryEntry,
  } = useTranslationStore()

  const [translatedText, setTranslatedText] = useState('')
  const [translating, setTranslating] = useState(false)
  const [progress, setProgress] = useState({ total: 0, completed: 0, failed: 0 })
  const [glossarySource, setGlossarySource] = useState('')
  const [glossaryTarget, setGlossaryTarget] = useState('')
  const [glossaryOpen, setGlossaryOpen] = useState(false)

  useScrollLock(visible)

  useEffect(() => {
    if (!visible) return
    loadGlossary()
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [visible, onClose, loadGlossary])

  // Translate on enable or when params change
  useEffect(() => {
    if (!enabled || !textContent || !visible) {
      setTranslatedText('')
      setProgress({ total: 0, completed: 0, failed: 0 })
      return
    }
    setTranslating(true)
    // Mock translation: in production, create engine and queue
    const timer = setTimeout(() => {
      setTranslatedText(`[${targetLang.toUpperCase()}] ${textContent.slice(0, 500)}…`)
      setTranslating(false)
      setProgress({ total: 1, completed: 1, failed: 0 })
    }, 800)
    return () => clearTimeout(timer)
  }, [enabled, sourceLang, targetLang, engine, textContent, visible])

  if (!visible) return null

  const handleAddGlossary = async () => {
    if (!glossarySource.trim() || !glossaryTarget.trim()) return
    await addGlossaryEntry({
      sourceLang,
      sourceText: glossarySource.trim(),
      targetText: glossaryTarget.trim(),
    })
    setGlossarySource('')
    setGlossaryTarget('')
  }

  const progressPercent = progress.total > 0 ? Math.round((progress.completed / progress.total) * 100) : 0

  return (
    <div className="fixed inset-0 z-[65]">
      <div className="absolute inset-0 bg-black/60 animate-in fade-in duration-150" onClick={onClose} />

      <div className="absolute bottom-0 left-0 right-0 max-h-[70vh] bg-surface rounded-t-2xl flex flex-col shadow-2xl animate-in slide-in-from-bottom duration-200">
        {/* Handle + Header */}
        <div className="shrink-0">
          <div className="flex justify-center pt-3 pb-1">
            <div className="w-10 h-1 rounded-full bg-text-muted/30" />
          </div>
          <div className="flex items-center justify-between px-4 pb-3">
            <div className="flex items-center gap-2.5">
              <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${enabled ? 'bg-accent/10' : 'bg-surface-hover/50'}`}>
                <Languages className={`w-4 h-4 ${enabled ? 'text-accent' : 'text-text-secondary'}`} />
              </div>
              <h2 className="text-base font-semibold text-text">Translation</h2>
            </div>
            <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-lg text-text-muted hover:text-text hover:bg-surface-hover transition-colors">
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-4 space-y-4 pb-4">
          {/* Enable toggle */}
          <label className="flex items-center justify-between px-3 py-2.5 rounded-xl bg-surface-hover/30 cursor-pointer">
            <div>
              <p className="text-sm font-medium text-text">Enable Translation</p>
              <p className="text-xs text-text-muted">Translate chapter content</p>
            </div>
            <input type="checkbox" checked={enabled} onChange={e => setEnabled(e.target.checked)}
              className="w-4 h-4 rounded accent-[hsl(var(--accent))]" />
          </label>

          {/* Language selection */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <p className="text-[11px] font-semibold text-text-secondary uppercase tracking-wider mb-1.5">From</p>
              <select value={sourceLang} onChange={e => setSourceLang(e.target.value)}
                className="w-full bg-surface-hover/30 border border-border-light rounded-xl px-3 py-2.5 text-sm text-text outline-none focus:border-accent/50">
                {LANGUAGES.map(l => <option key={l.code} value={l.code}>{l.name}</option>)}
              </select>
            </div>
            <div>
              <p className="text-[11px] font-semibold text-text-secondary uppercase tracking-wider mb-1.5">To</p>
              <select value={targetLang} onChange={e => setTargetLang(e.target.value)}
                className="w-full bg-surface-hover/30 border border-border-light rounded-xl px-3 py-2.5 text-sm text-text outline-none focus:border-accent/50">
                {LANGUAGES.map(l => <option key={l.code} value={l.code}>{l.name}</option>)}
              </select>
            </div>
          </div>

          {/* Engine selector */}
          <div>
            <p className="text-[11px] font-semibold text-text-secondary uppercase tracking-wider mb-1.5">Engine</p>
            <div className="flex flex-wrap gap-1">
              {ENGINES.map(e => (
                <button key={e.type} onClick={() => setEngine(e.type)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${engine === e.type ? 'bg-accent text-black' : 'bg-surface-hover/30 text-text-muted hover:bg-surface-hover/50'}`}>
                  {e.label}
                </button>
              ))}
            </div>
          </div>

          {/* Auto-translate toggle */}
          <label className="flex items-center justify-between px-3 py-2.5 rounded-xl bg-surface-hover/30 cursor-pointer">
            <div>
              <p className="text-sm font-medium text-text">Auto-translate on scroll</p>
              <p className="text-xs text-text-muted">Translate visible paragraphs as you read</p>
            </div>
            <input type="checkbox" checked={autoTranslate} onChange={e => setAutoTranslate(e.target.checked)}
              className="w-4 h-4 rounded accent-[hsl(var(--accent))]" />
          </label>

          {/* Progress bar */}
          {translating && progress.total > 0 && (
            <div>
              <div className="flex items-center justify-between text-xs text-text-muted mb-1">
                <span>Translating…</span>
                <span>{progress.completed}/{progress.total}</span>
              </div>
              <div className="h-1.5 bg-surface-hover/50 rounded-full overflow-hidden">
                <div className="h-full bg-accent rounded-full transition-all duration-300" style={{ width: `${progressPercent}%` }} />
              </div>
            </div>
          )}

          {/* Translated text preview */}
          {enabled && (
            <div>
              <p className="text-[11px] font-semibold text-text-secondary uppercase tracking-wider mb-2">
                {translating ? 'Translating…' : 'Preview'}
              </p>
              <div className="bg-surface-hover/30 rounded-xl p-3 max-h-40 overflow-y-auto">
                {translating ? (
                  <div className="flex items-center gap-2 py-2">
                    <div className="w-4 h-4 border-2 border-accent/30 border-t-accent rounded-full animate-spin" />
                    <span className="text-xs text-text-muted">Translating…</span>
                  </div>
                ) : translatedText ? (
                  <p className="text-xs text-text-muted leading-relaxed whitespace-pre-wrap">{translatedText}</p>
                ) : (
                  <p className="text-xs text-text-muted/50 italic">Enable translation to see preview</p>
                )}
              </div>
            </div>
          )}

          {/* Glossary */}
          <div>
            <button onClick={() => setGlossaryOpen(v => !v)}
              className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl bg-surface-hover/30 hover:bg-surface-hover/50 transition-colors">
              <div className="flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-text-secondary" />
                <span className="text-sm text-text">Glossary</span>
                <span className="text-[10px] text-text-muted bg-surface-hover/50 px-1.5 py-0.5 rounded-full">{glossary.length}</span>
              </div>
              <span className="text-xs text-text-muted">{glossaryOpen ? 'Hide' : 'Show'}</span>
            </button>

            {glossaryOpen && (
              <div className="mt-2 space-y-2 animate-in fade-in slide-in-from-top-1">
                {/* Add entry */}
                <div className="flex gap-2">
                  <input value={glossarySource} onChange={e => setGlossarySource(e.target.value)}
                    placeholder="Source text"
                    className="flex-1 bg-surface-hover/30 border border-border-light rounded-lg px-2 py-1.5 text-xs text-text outline-none focus:border-accent/50" />
                  <input value={glossaryTarget} onChange={e => setGlossaryTarget(e.target.value)}
                    placeholder="Translation"
                    className="flex-1 bg-surface-hover/30 border border-border-light rounded-lg px-2 py-1.5 text-xs text-text outline-none focus:border-accent/50" />
                  <button onClick={handleAddGlossary}
                    className="w-8 h-8 flex items-center justify-center rounded-lg bg-accent/10 text-accent hover:bg-accent/20 transition-colors shrink-0">
                    <Plus className="w-4 h-4" />
                  </button>
                </div>

                {/* Glossary list */}
                {glossary.length === 0 ? (
                  <p className="text-xs text-text-muted/60 text-center py-2">No glossary entries</p>
                ) : (
                  <div className="space-y-1 max-h-32 overflow-y-auto">
                    {glossary.map(g => (
                      <div key={g.id} className="flex items-center gap-2 px-2 py-1.5 rounded-lg bg-surface-hover/20 group">
                        <div className="flex-1 min-w-0">
                          <p className="text-xs text-text truncate">{g.sourceText}</p>
                          <p className="text-[10px] text-text-muted truncate">→ {g.targetText}</p>
                        </div>
                        <button onClick={() => removeGlossaryEntry(g.id)}
                          className="w-5 h-5 flex items-center justify-center rounded text-text-muted hover:text-danger opacity-0 group-hover:opacity-100 transition-all">
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        <div style={{ height: 'env(safe-area-inset-bottom, 0px)' }} />
      </div>
    </div>
  )
}
