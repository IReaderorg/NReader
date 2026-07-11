import { useEffect, useState, useCallback } from 'react'
import { api, type SourceInfo } from '../api/client'
import { LoadingState, ErrorState, EmptyState } from '../components/SharedStates'
import { Power, Settings2, Link, Globe, Plus, BookOpen } from 'lucide-react'
import { Link as RouterLink } from 'react-router-dom'

export function SourceManagerPage() {
  const [sources, setSources] = useState<SourceInfo[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Repository state
  const [showRepo, setShowRepo] = useState(false)
  const [repoUrl, setRepoUrl] = useState('')
  const [repoSources, setRepoSources] = useState<Array<{ id: string; name: string; lang: string; baseUrl: string; version: string; initFunction?: string; pkg?: string; bundle?: boolean }>>([])
  const [repoLoading, setRepoLoading] = useState(false)
  const [installing, setInstalling] = useState<string | null>(null)
// Predefined repo URLs for quick-add
const IREADER_REPO_URL = 'https://raw.githubusercontent.com/IReaderorg/IReader-extensions/repov2/js-dist/js-index.json'
const LNREADER_REPO_URL = 'https://raw.githubusercontent.com/kazemcodes/lnreader-plugins-unminified/refs/heads/repo/plugins/plugins.min.json'


  const load = () => {
    setLoading(true)
    setError(null)
    api.getSources()
      .then(setSources)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false))
  }

  useEffect(() => { load() }, [])

  // Browse repository
  const browseRepo = useCallback(async () => {
    if (!repoUrl.trim()) return
    setRepoLoading(true)
    try {
      const results = await api.listRepository(repoUrl.trim())
      setRepoSources(results)
    } catch (err) {
      alert(`Failed to fetch repository: ${err instanceof Error ? err.message : String(err)}`)
      setRepoSources([])
    } finally {
      setRepoLoading(false)
    }
  }, [repoUrl])

  // Install source from repo (handles IReader bundle format with initFunction)
  const installSource = useCallback(async (src: { id: string; name: string; baseUrl: string; initFunction?: string; pkg?: string; bundle?: boolean }) => {
    setInstalling(src.id)
    try {
      // For IReader bundle sources (sources-bundle.js), pass initFunction + bundle flag
      const isBundle = src.bundle || src.baseUrl.includes('sources-bundle')
      if (isBundle) {
        await api.installSource(src.baseUrl, src.id, { initFunction: src.initFunction, bundle: true })
      } else {
        await api.installSource(src.baseUrl, src.id)
      }
      alert(`Source "${src.name}" installed successfully!`)
      load()
    } catch (err) {
      alert(`Installation failed: ${err instanceof Error ? err.message : String(err)}`)
    } finally {
      setInstalling(null)
    }
  }, [load])

  if (loading) return <LoadingState message="Loading sources…" />
  if (error) return <ErrorState message={error} onRetry={load} />
  if (sources.length === 0 && !showRepo) return (
    <EmptyState
      title="No sources installed"
      description="Install source plugins from the Plugin Manager or add a source repository to browse available sources."
      action={{ label: 'Add Source Repo', onClick: () => setShowRepo(true) }}
    />
  )

  return (
    <div>
      <div className="flex items-center justify-between mb-4 gap-2 flex-wrap">
        <h1 className="text-base font-bold text-text">Source Manager</h1>
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              setRepoUrl(IREADER_REPO_URL)
              setShowRepo(true)
              setTimeout(() => browseRepo(), 100)
            }}
            className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-emerald-600 text-white text-xs font-medium hover:bg-emerald-500 transition-colors"
            title="Browse the official IReader extensions repository (50+ pre-built JS sources)"
          >
            <BookOpen className="w-3.5 h-3.5" strokeWidth={1.5} />
            Add IReader Repo
          </button>
          <button
            onClick={() => {
              setRepoUrl(LNREADER_REPO_URL)
              setShowRepo(true)
              setTimeout(() => browseRepo(), 100)
            }}
            className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-violet-600 text-white text-xs font-medium hover:bg-violet-500 transition-colors"
            title="Browse the kazemcodes LNReader plugin repository (120+ JS novel sources)"
          >
            <BookOpen className="w-3.5 h-3.5" strokeWidth={1.5} />
            Add LNReader Repo
          </button>
          <button
            onClick={() => setShowRepo(!showRepo)}
            className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-accent text-black text-xs font-medium hover:bg-accent/90 transition-colors"
          >
            <Globe className="w-3.5 h-3.5" strokeWidth={1.5} />
            {showRepo ? 'Hide Repo' : 'Add Repo'}
          </button>
        </div>
      </div>

      {/* Repository panel */}
      {showRepo && (
        <div className="mb-4 p-3 rounded-xl bg-surface border border-border-light space-y-2">
          <p className="text-xs font-medium text-text">Source Repository</p>
          <p className="text-[10px] text-text-muted">
            Enter a repository URL (IReader, LNReader, or Tachiyomi compatible). The official IReader extensions repo provides 50+ novel sources as JS bundles.
          </p>
          <div className="flex gap-2">
            <input
              type="text"
              value={repoUrl}
              onChange={e => setRepoUrl(e.target.value)}
              placeholder="https://example.com/sources/repo.json"
              className="flex-1 bg-surface-hover border border-border-light rounded-lg px-2.5 py-1.5 text-xs text-text placeholder:text-text-muted/50 outline-none focus:border-accent/50 transition-colors"
              onKeyDown={e => { if (e.key === 'Enter') browseRepo() }}
            />
            <button
              onClick={browseRepo}
              disabled={repoLoading}
              className="px-3 py-1.5 rounded-lg bg-accent text-black text-xs font-medium hover:bg-accent/90 disabled:opacity-50 transition-colors shrink-0"
            >
              {repoLoading ? '…' : 'Browse'}
            </button>
          </div>

          {repoSources.length > 0 && (
            <div className="space-y-1 max-h-60 overflow-y-auto">
              {repoSources.map((src) => (
                <div key={src.id} className="flex items-center gap-2 p-2 rounded-lg hover:bg-surface-hover transition-colors">
                  <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center shrink-0">
                    <Plus className="w-4 h-4 text-accent" strokeWidth={1.5} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium text-text truncate">{src.name}</p>
                    <p className="text-[10px] text-text-muted">{src.lang.toUpperCase()} • v{src.version}</p>
                  </div>
                  <button
                    onClick={() => installSource({ id: src.id, name: src.name, baseUrl: src.baseUrl, initFunction: src.initFunction, bundle: src.bundle })}
                    disabled={installing === src.id}
                    className="px-2.5 py-1 rounded-lg bg-accent text-black text-[10px] font-medium hover:bg-accent/90 disabled:opacity-50 transition-colors shrink-0"
                  >
                    {installing === src.id ? '…' : 'Install'}
                  </button>
                </div>
              ))}
            </div>
          )}

          {!repoLoading && repoSources.length === 0 && repoUrl && (
            <p className="text-[10px] text-text-muted text-center py-2">
              No sources found. Check the repository URL.
            </p>
          )}
        </div>
      )}

      {/* Source list */}
      <div className="space-y-2">
        {sources.map((src) => (
          <div
            key={src.id}
            className="flex items-center gap-3 p-3 rounded-xl bg-surface border border-border-light hover:border-accent/20 transition-colors"
          >
            {/* Source icon */}
            <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center shrink-0">
              <Link className="w-4.5 h-4.5 text-accent" strokeWidth={1.5} />
            </div>

            {/* Source info */}
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-text">{src.name}</p>
              <p className="text-[11px] text-text-muted truncate">
                {src.baseUrl} • {src.lang.toUpperCase()} • v{src.version}
              </p>
              {/* Capabilities */}
              <div className="flex gap-1 mt-1 flex-wrap">
                {src.capabilities?.map((cap) => (
                  <span key={cap} className="text-[9px] text-text-muted/60 bg-surface-hover px-1.5 py-0.5 rounded">
                    {cap}
                  </span>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-1 shrink-0">
              <RouterLink
                to={`/sources/${src.id}`}
                className="w-8 h-8 flex items-center justify-center rounded-lg text-text-muted hover:text-text hover:bg-surface-hover transition-colors"
                title="Browse"
              >
                <Settings2 className="w-4 h-4" strokeWidth={1.5} />
              </RouterLink>
              <button
                className="w-8 h-8 flex items-center justify-center rounded-lg text-text-muted hover:text-text hover:bg-surface-hover transition-colors"
                title="Disable source"
              >
                <Power className="w-4 h-4" strokeWidth={1.5} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
