import { useEffect, useState } from 'react'
import { useTranslationStore } from '../store/translation-store'
import { ArrowLeft, Plus, Trash2, Search, Languages, BookOpen } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

export function TranslationSettingsPage() {
  const navigate = useNavigate()
  const {
    enabled, setEnabled, targetLang, setTargetLang,
    sourceLang, setSourceLang, engine, setEngine,
    glossary, loadGlossary, addGlossaryEntry, removeGlossaryEntry
  } = useTranslationStore()

  const [showAdd, setShowAdd] = useState(false)
  const [newSource, setNewSource] = useState('')
  const [newTarget, setNewTarget] = useState('')
  const [newContext, setNewContext] = useState('')

  useEffect(() => {
    loadGlossary()
  }, [])

  const handleAdd = async () => {
    if (!newSource || !newTarget) return
    await addGlossaryEntry({
      sourceLang,
      sourceText: newSource,
      targetText: newTarget,
      context: newContext || undefined
    })
    setNewSource('')
    setNewTarget('')
    setNewContext('')
    setShowAdd(false)
  }

  return (
    <div>
      <div className="flex items-center gap-3 mb-4">
        <button
          onClick={() => navigate('/settings')}
          className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-surface-hover transition-colors"
        >
          <ArrowLeft className="w-4 h-4 text-text-secondary" strokeWidth={1.5} />
        </button>
        <h1 className="text-base font-bold text-text">Translation</h1>
      </div>

      <div className="space-y-5">
        {/* Enable toggle */}
        <div className="flex items-center justify-between p-3 rounded-xl bg-surface border border-border-light">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-accent/10 flex items-center justify-center">
              <Languages className="w-4 h-4 text-accent" strokeWidth={1.5} />
            </div>
            <div>
              <p className="text-sm font-medium text-text">Enable Translation</p>
              <p className="text-xs text-text-secondary">Translate chapter text in reader</p>
            </div>
          </div>
          <button
            onClick={() => setEnabled(!enabled)}
            className={`relative w-11 h-6 rounded-full transition-colors ${
              enabled ? 'bg-accent' : 'bg-white/10'
            }`}
          >
            <div className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform ${
              enabled ? 'translate-x-5.5' : 'translate-x-0.5'
            }`} />
          </button>
        </div>

        {/* Engine */}
        <div>
          <h2 className="text-xs font-semibold text-text mb-2">Engine</h2>
          <div className="flex gap-2">
            {(['mock', 'deepl'] as const).map(e => (
              <button
                key={e}
                onClick={() => setEngine(e)}
                className={`flex-1 px-3 py-2.5 rounded-xl text-sm font-medium transition-all border ${
                  engine === e
                    ? 'bg-accent text-black border-accent'
                    : 'bg-surface text-text-secondary border-border-light hover:border-accent/30'
                }`}
              >
                {e === 'mock' ? 'Mock' : 'DeepL'}
              </button>
            ))}
          </div>
        </div>

        {/* Language pair */}
        <div className="grid grid-cols-2 gap-2">
          <div>
            <h2 className="text-xs font-semibold text-text mb-2">From</h2>
            <input
              value={sourceLang}
              onChange={e => setSourceLang(e.target.value)}
              placeholder="e.g. ja"
              className="w-full rounded-xl bg-surface border border-border-light px-3 py-2.5 text-sm text-text placeholder:text-text-muted"
            />
          </div>
          <div>
            <h2 className="text-xs font-semibold text-text mb-2">To</h2>
            <input
              value={targetLang}
              onChange={e => setTargetLang(e.target.value)}
              placeholder="e.g. en"
              className="w-full rounded-xl bg-surface border border-border-light px-3 py-2.5 text-sm text-text placeholder:text-text-muted"
            />
          </div>
        </div>

        {/* Glossary */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-xs font-semibold text-text flex items-center gap-2">
              <BookOpen className="w-3.5 h-3.5 text-accent" strokeWidth={1.5} />
              Glossary ({glossary.length})
            </h2>
            <button
              onClick={() => setShowAdd(!showAdd)}
              className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-accent/10 text-accent text-xs hover:bg-accent/20 transition-colors"
            >
              <Plus className="w-3 h-3" strokeWidth={1.5} />
              Add
            </button>
          </div>

          {showAdd && (
            <div className="p-3 rounded-xl bg-surface border border-border-light space-y-2 mb-3">
              <input
                value={newSource}
                onChange={e => setNewSource(e.target.value)}
                placeholder="Source text"
                className="w-full rounded-lg bg-white/5 border border-border-light px-3 py-2 text-xs text-text"
              />
              <input
                value={newTarget}
                onChange={e => setNewTarget(e.target.value)}
                placeholder="Translated text"
                className="w-full rounded-lg bg-white/5 border border-border-light px-3 py-2 text-xs text-text"
              />
              <input
                value={newContext}
                onChange={e => setNewContext(e.target.value)}
                placeholder="Context (optional)"
                className="w-full rounded-lg bg-white/5 border border-border-light px-3 py-2 text-xs text-text"
              />
              <button
                onClick={handleAdd}
                className="w-full py-2 rounded-lg bg-accent text-black text-xs font-medium hover:bg-accent/90 transition-colors"
              >
                Save
              </button>
            </div>
          )}

          {glossary.length === 0 ? (
            <p className="text-xs text-text-muted">No glossary entries yet.</p>
          ) : (
            <div className="space-y-1">
              {glossary.map((entry) => (
                <div key={entry.id} className="flex items-center justify-between p-2.5 rounded-lg bg-surface border border-border-light">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-text truncate">{entry.sourceText}</p>
                    <p className="text-xs text-text-secondary">→ {entry.targetText}</p>
                    <p className="text-xs text-text-muted">{entry.sourceLang} → {entry.targetLang}{entry.context ? ` • ${entry.context}` : ''}</p>
                  </div>
                  <button
                    onClick={() => removeGlossaryEntry(entry.id)}
                    className="w-7 h-7 flex items-center justify-center rounded-lg text-text-muted hover:text-danger hover:bg-danger/10 transition-colors shrink-0"
                  >
                    <Trash2 className="w-3.5 h-3.5" strokeWidth={1.5} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}