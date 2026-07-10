import { useState, useEffect, useRef } from 'react'
import { api } from '../api/client'
import { Download, Upload, RefreshCw, CheckCircle, AlertCircle, ArrowLeft, Trash2, FileText, Settings, FolderOpen, Cloud, Lock, FileJson } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const ALL_SECTIONS = ['library', 'categories', 'history', 'settings', 'downloads', 'glossary'] as const

export function BackupPage() {
  const navigate = useNavigate()
  const [exporting, setExporting] = useState(false)
  const [importing, setImporting] = useState(false)
  const [includeCovers, setIncludeCovers] = useState(false)
  const [selectedSections, setSelectedSections] = useState<string[]>(['library', 'history', 'settings'])
  const [result, setResult] = useState<{ type: 'success' | 'error'; message: string } | null>(null)
  const [lastExport, setLastExport] = useState<string | null>(null)
  const [progress, setProgress] = useState<number | null>(null)
  const [savedBackups, setSavedBackups] = useState<Array<{ id: string; filename: string; size: number; createdAt: string }>>([])
  const [loadingBackups, setLoadingBackups] = useState(false)
  const [encryptPassword, setEncryptPassword] = useState('')
  const [lnReaderImporting, setLnReaderImporting] = useState(false)
  const [lnReaderExporting, setLnReaderExporting] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => { loadSavedBackups() }, [])

  const loadSavedBackups = async () => {
    setLoadingBackups(true)
    try { setSavedBackups(await api.listBackups()) }
    catch { /* ignore */ }
    finally { setLoadingBackups(false) }
  }

  const toggleSection = (s: string) => {
    setSelectedSections(prev =>
      prev.includes(s) ? prev.filter(x => x !== s) : [...prev, s]
    )
  }

  const handleExport = async () => {
    setExporting(true)
    setResult(null)
    setProgress(10)
    try {
      const blob = await api.exportBackup(includeCovers, selectedSections)
      setProgress(90)
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `ireader-backup-${Date.now()}.zip`
      a.click()
      URL.revokeObjectURL(url)
      setLastExport(new Date().toLocaleString())
      setProgress(100)
      setResult({ type: 'success', message: `Backup exported! (${(blob.size / 1024).toFixed(1)} KB)` })
      loadSavedBackups()
    } catch (err) {
      setResult({ type: 'error', message: err instanceof Error ? err.message : 'Export failed' })
    } finally {
      setExporting(false)
      setProgress(null)
    }
  }

  const handleImport = async () => {
    const input = document.createElement('input')
    input.type = 'file'
    input.accept = '.zip'
    input.onchange = async () => {
      const file = input.files?.[0]
      if (!file) return
      const strategy = window.confirm('Click OK to replace existing data, Cancel to merge') ? 'replace' : 'merge'
      setImporting(true)
      setResult(null)
      setProgress(10)
      try {
        const reader = new FileReader()
        reader.onload = async (e) => {
          const base64 = (e.target?.result as string).split(',')[1]!
          setProgress(40)
          const res = await api.importBackup(base64, strategy, selectedSections)
          setProgress(100)
          setResult({ type: 'success', message: `Imported ${res.entries} entries across ${res.tables.length} tables!` })
          setImporting(false)
          setProgress(null)
        }
        reader.readAsDataURL(file)
      } catch (err) {
        setResult({ type: 'error', message: err instanceof Error ? err.message : 'Import failed' })
        setImporting(false)
        setProgress(null)
      }
    }
    input.click()
  }

  const handleDeleteBackup = async (id: string) => {
    if (!window.confirm('Delete this backup file?')) return
    try {
      await api.deleteBackup(id)
      setSavedBackups(prev => prev.filter(b => b.id !== id))
      setResult({ type: 'success', message: 'Backup deleted' })
    } catch (err) {
      setResult({ type: 'error', message: err instanceof Error ? err.message : 'Delete failed' })
    }
  }

  const handleDownloadBackup = async (id: string, filename: string) => {
    try {
      const blob = await api.downloadBackup(id)
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = filename
      a.click()
      URL.revokeObjectURL(url)
    } catch (err) {
      setResult({ type: 'error', message: err instanceof Error ? err.message : 'Download failed' })
    }
  }

  // LNReader import
  const handleLNReaderImport = () => {
    const input = document.createElement('input')
    input.type = 'file'
    input.accept = '.json'
    input.onchange = async () => {
      const file = input.files?.[0]
      if (!file) return
      setLnReaderImporting(true)
      setResult(null)
      try {
        const text = await file.text()
        const strategy = window.confirm('Click OK to replace, Cancel to merge') ? 'replace' : 'merge'
        const res = await api.importLNReaderBackup(text, strategy)
        setResult({ type: 'success', message: `LNReader backup imported! ${'entries' in res ? res.entries : 0} entries` })
      } catch (err) {
        setResult({ type: 'error', message: err instanceof Error ? err.message : 'LNReader import failed' })
      } finally {
        setLnReaderImporting(false)
      }
    }
    input.click()
  }

  // LNReader export
  const handleLNReaderExport = async () => {
    setLnReaderExporting(true)
    setResult(null)
    try {
      const blob = await api.exportLNReaderBackup()
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `lnreader-backup-${Date.now()}.json`
      a.click()
      URL.revokeObjectURL(url)
      setResult({ type: 'success', message: 'LNReader backup exported!' })
    } catch (err) {
      setResult({ type: 'error', message: err instanceof Error ? err.message : 'LNReader export failed' })
    } finally {
      setLnReaderExporting(false)
    }
  }

  const formatSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
  }

  return (
    <div>
      <div className="flex items-center gap-3 mb-4">
        <button onClick={() => navigate('/settings')} className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-surface-hover transition-colors">
          <ArrowLeft className="w-4 h-4 text-text-secondary" strokeWidth={1.5} />
        </button>
        <h1 className="text-base font-bold text-text">Backup & Restore</h1>
      </div>

      <div className="space-y-4">
        {/* Standard Export */}
        <div className="p-4 rounded-xl bg-surface border border-border-light">
          <h2 className="text-sm font-semibold text-text mb-3 flex items-center gap-2">
            <Download className="w-4 h-4 text-accent" strokeWidth={1.5} />
            Export Backup
          </h2>
          <p className="text-xs text-text-secondary mb-2">Select sections to include:</p>
          <div className="flex flex-wrap gap-2 mb-3">
            {ALL_SECTIONS.map(s => (
              <label key={s} className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-surface-hover/30 cursor-pointer hover:bg-surface-hover transition-colors">
                <input
                  type="checkbox"
                  checked={selectedSections.includes(s)}
                  onChange={() => toggleSection(s)}
                  className="rounded border-border-light bg-surface text-accent focus:ring-accent w-3 h-3"
                />
                <span className="text-[11px] text-text capitalize">{s}</span>
              </label>
            ))}
          </div>
          <label className="flex items-center gap-2 mb-3 cursor-pointer">
            <input
              type="checkbox"
              checked={includeCovers}
              onChange={e => setIncludeCovers(e.target.checked)}
              className="rounded border-border-light bg-surface text-accent focus:ring-accent"
            />
            <span className="text-xs text-text-secondary">Include covers (larger file)</span>
          </label>
          <div className="flex items-center gap-2 mb-3">
            <input
              type="password"
              placeholder="Encryption password (optional)"
              value={encryptPassword}
              onChange={e => setEncryptPassword(e.target.value)}
              className="flex-1 px-3 py-2 rounded-lg bg-surface border border-border-light text-xs text-text placeholder-text-muted focus:outline-none focus:border-accent"
            />
          </div>
          <button
            onClick={handleExport}
            disabled={exporting}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-accent text-black text-sm font-medium hover:bg-accent/90 transition-colors disabled:opacity-50"
          >
            {exporting ? <RefreshCw className="w-4 h-4 animate-spin" strokeWidth={1.5} /> : <Lock className="w-4 h-4" strokeWidth={1.5} />}
            {exporting ? 'Exporting…' : encryptPassword ? 'Export & Encrypt' : 'Export Backup'}
          </button>
          {progress !== null && (
            <div className="mt-3 w-full bg-surface-hover rounded-full h-1.5">
              <div className="bg-accent h-1.5 rounded-full transition-all duration-300" style={{ width: `${Math.min(progress, 100)}%` }} />
            </div>
          )}
          {lastExport && <p className="text-xs text-text-muted mt-2">Last export: {lastExport}</p>}
        </div>

        {/* Standard Import */}
        <div className="p-4 rounded-xl bg-surface border border-border-light">
          <h2 className="text-sm font-semibold text-text mb-2 flex items-center gap-2">
            <Upload className="w-4 h-4 text-accent" strokeWidth={1.5} />
            Import Backup
          </h2>
          <p className="text-xs text-text-secondary mb-3">
            Restore from a previous backup ZIP file. Choose merge (keep new data) or replace (overwrite all).
          </p>
          <button
            onClick={handleImport}
            disabled={importing}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-surface border border-border-light text-sm text-text hover:bg-surface-hover transition-colors disabled:opacity-50"
          >
            {importing ? <RefreshCw className="w-4 h-4 animate-spin" strokeWidth={1.5} /> : <Upload className="w-4 h-4" strokeWidth={1.5} />}
            {importing ? 'Importing…' : 'Select Backup File'}
          </button>
          {progress !== null && (
            <div className="mt-3 w-full bg-surface-hover rounded-full h-1.5">
              <div className="bg-accent h-1.5 rounded-full transition-all duration-300" style={{ width: `${Math.min(progress, 100)}%` }} />
            </div>
          )}
        </div>

        {/* LNReader Backup */}
        <div className="p-4 rounded-xl bg-surface border border-border-light">
          <h2 className="text-sm font-semibold text-text mb-3 flex items-center gap-2">
            <FileJson className="w-4 h-4 text-accent" strokeWidth={1.5} />
            LNReader Backup
          </h2>
          <p className="text-xs text-text-secondary mb-3">
            Import or export library/history from LNReader JSON format.
          </p>
          <div className="flex gap-2">
            <button
              onClick={handleLNReaderImport}
              disabled={lnReaderImporting}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-surface border border-border-light text-sm text-text hover:bg-surface-hover transition-colors disabled:opacity-50"
            >
              {lnReaderImporting ? <RefreshCw className="w-4 h-4 animate-spin" strokeWidth={1.5} /> : <Upload className="w-4 h-4" strokeWidth={1.5} />}
              Import LNReader JSON
            </button>
            <button
              onClick={handleLNReaderExport}
              disabled={lnReaderExporting}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-surface border border-border-light text-sm text-text hover:bg-surface-hover transition-colors disabled:opacity-50"
            >
              {lnReaderExporting ? <RefreshCw className="w-4 h-4 animate-spin" strokeWidth={1.5} /> : <Download className="w-4 h-4" strokeWidth={1.5} />}
              Export as LNReader
            </button>
          </div>
        </div>

        {/* Saved Backups */}
        <div className="p-4 rounded-xl bg-surface border border-border-light">
          <h2 className="text-sm font-semibold text-text mb-2 flex items-center gap-2">
            <FolderOpen className="w-4 h-4 text-accent" strokeWidth={1.5} />
            Saved Backups
          </h2>
          {loadingBackups && savedBackups.length === 0 ? (
            <div className="flex items-center justify-center py-6">
              <RefreshCw className="w-4 h-4 animate-spin text-text-muted" />
            </div>
          ) : savedBackups.length === 0 ? (
            <p className="text-xs text-text-muted py-4 text-center">No saved backups found.</p>
          ) : (
            <div className="space-y-1 max-h-48 overflow-y-auto">
              {savedBackups.map(b => (
                <div key={b.id} className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-surface-hover transition-colors">
                  <FileText className="w-3.5 h-3.5 text-text-muted shrink-0" strokeWidth={1.5} />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-text truncate">{b.filename}</p>
                    <p className="text-[10px] text-text-muted">{formatSize(b.size)} • {new Date(b.createdAt).toLocaleDateString()}</p>
                  </div>
                  <button onClick={() => handleDownloadBackup(b.id, b.filename)} className="w-7 h-7 flex items-center justify-center rounded-lg text-text-muted hover:text-accent transition-colors" title="Download">
                    <Download className="w-3 h-3" strokeWidth={1.5} />
                  </button>
                  <button onClick={() => handleDeleteBackup(b.id)} className="w-7 h-7 flex items-center justify-center rounded-lg text-text-muted hover:text-danger transition-colors" title="Delete">
                    <Trash2 className="w-3 h-3" strokeWidth={1.5} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Auto-Backup */}
        <div className="p-4 rounded-xl bg-surface border border-border-light">
          <h2 className="text-sm font-semibold text-text mb-2 flex items-center gap-2">
            <Settings className="w-4 h-4 text-accent" strokeWidth={1.5} />
            Auto-Backup
          </h2>
          <p className="text-xs text-text-secondary">
            Configure auto-backup from the <button onClick={() => navigate('/settings/advanced')} className="text-accent hover:underline">Advanced Settings</button> page.
          </p>
        </div>

        {/* Cloud Backup */}
        <button
          onClick={() => navigate('/backup/cloud')}
          className="w-full p-4 rounded-xl bg-surface border border-border-light flex items-center gap-3 hover:bg-surface-hover transition-colors text-left"
        >
          <Cloud className="w-5 h-5 text-accent" strokeWidth={1.5} />
          <div>
            <p className="text-sm font-semibold text-text">Cloud Backup</p>
            <p className="text-xs text-text-secondary">Backup to Google Drive</p>
          </div>
        </button>

        {result && (
          <div className={`p-3 rounded-xl flex items-center gap-2 text-sm ${
            result.type === 'success' ? 'bg-accent/10 text-accent' : 'bg-danger/10 text-danger'
          }`}>
            {result.type === 'success' ? <CheckCircle className="w-4 h-4" strokeWidth={1.5} /> : <AlertCircle className="w-4 h-4" strokeWidth={1.5} />}
            {result.message}
          </div>
        )}
      </div>
    </div>
  )
}