import { useEffect, useState } from 'react'
import { useTranslationStore, type EngineType } from '../store/translation-store'
import { ArrowLeft, Plus, Trash2, Languages, BookOpen, Settings2 } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

interface EngineConfigForm {
  engine: EngineType
  label: string
  fields: Array<{ key: 'apiKey' | 'baseUrl' | 'model'; label: string; placeholder: string; secret?: boolean }>
}

const ENGINE_FORMS: EngineConfigForm[] = [
  { engine: 'mock', label: 'Mock', fields: [] },
  { engine: 'deepl', label: 'DeepL', fields: [{ key: 'apiKey', label: 'API Key', placeholder: 'Your DeepL API key', secret: true }] },
  { engine: 'ai', label: 'LLM (OpenAI/Anthropic)', fields: [{ key: 'apiKey', label: 'API Key', placeholder: 'sk-...', secret: true }, { key: 'model', label: 'Model', placeholder: 'gpt-4o-mini' }] },
  { engine: 'openai', label: 'OpenAI', fields: [{ key: 'apiKey', label: 'API Key', placeholder: 'sk-...', secret: true }, { key: 'model', label: 'Model', placeholder: 'gpt-4o-mini' }, { key: 'baseUrl', label: 'Base URL', placeholder: 'https://api.openai.com/v1' }] },
  { engine: 'deepseek', label: 'DeepSeek', fields: [{ key: 'apiKey', label: 'API Key', placeholder: 'sk-...', secret: true }, { key: 'model', label: 'Model', placeholder: 'deepseek-chat' }] },
  { engine: 'libre', label: 'LibreTranslate', fields: [{ key: 'baseUrl', label: 'Server URL', placeholder: 'https://translate.example.com' }, { key: 'apiKey', label: 'API Key (optional)', placeholder: '...', secret: true }] },
  { engine: 'ollama', label: 'Ollama', fields: [{ key: 'baseUrl', label: 'Server URL', placeholder: 'http://localhost:11434' }, { key: 'model', label: 'Model', placeholder: 'llama3' }] },
  { engine: 'openrouter', label: 'OpenRouter', fields: [{ key: 'apiKey', label: 'API Key', placeholder: 'sk-or-...', secret: true }, { key: 'model', label: 'Model', placeholder: 'openai/gpt-4o-mini' }] },
]

export function TranslationSettingsPage() {
  const navigate = useNavigate()
  const {
    enabled, setEnabled, targetLang, setTargetLang,
    sourceLang, setSourceLang, engine, setEngine,
    glossary, loadGlossary, addGlossaryEntry, removeGlossaryEntry,
    engineConfigs, setEngineConfig,
  } = useTranslationStore()

  const [showAdd, setShowAdd] = useState(false)
  const [newSource, setNewSource] = useState('')
  const [newTarget, setNewTarget] = useState('')
  const [newContext, setNewContext] = useState('')
  const [expandedEngine, setExpandedEngine] = useState<string | null>(null)

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

        {/* Engine selector */}
        <div>
          <h2 className="text-xs font-semibold text-text mb-2">Engine</h2>
          <div className="flex flex-wrap gap-2">
            {(['mock', 'deepl', 'ai', 'openai', 'deepseek', 'libre', 'ollama', 'openrouter'] as const).map(e => (
              <button
                key={e}
                onClick={() => setEngine(e)}
                className={`px-3 py-2 rounded-xl text-xs font-medium transition-all border ${
                  engine === e
                    ? 'bg-accent text-black border-accent'
                    : 'bg-surface text-text-secondary border-border-light hover:border-accent/30'
                }`}
              >
                {e === 'ai' ? 'LLM' : e.charAt(0).toUpperCase() + e.slice(1)}
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

        {/* Per-engine settings */}
        <div>
          <h2 className="text-xs font-semibold text-text mb-3 flex items-center gap-2">
            <Settings2 className="w-3.5 h-3.5 text-accent" strokeWidth={1.5} />
            Engine Settings
          </h2>
          <div className="space-y-2">
            {ENGINE_FORMS.filter(f => f.fields.length > 0).map(form => {
              const isExpanded = expandedEngine === form.engine
              const config = engineConfigs[form.engine] ?? {}
              return (
                <div key={form.engine} className="rounded-xl bg-surface border border-border-light overflow-hidden">
                  <button
                    onClick={() => setExpandedEngine(isExpanded ? null : form.engine)}
                    className="w-full flex items-center justify-between px-3 py-2.5 text-sm text-text hover:bg-surface-hover/30 transition-colors"
                  >
                    <span>{form.label}</span>
                    <span className="text-xs text-text-muted">{isExpanded ? 'Hide' : 'Configure'}</span>
                  </button>
                  {isExpanded && (
                    <div className="px-3 pb-3 space-y-2 animate-in fade-in slide-in-from-top-1">
                      {form.fields.map(field => (
                        <div key={field.key}>
                          <p className="text-[11px] text-text-secondary mb-1">{field.label}</p>
                          <input
                            type={field.secret ? 'password' : 'text'}
                            value={config[field.key] ?? ''}
                            onChange={e => setEngineConfig(form.engine, { ...config, [field.key]: e.target.value })}
                            placeholder={field.placeholder}
                            className="w-full rounded-lg bg-white/5 border border-border-light px-3 py-2 text-xs text-text placeholder:text-text-muted outline-none focus:border-accent/50"
                          />
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )
            })}
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