import { useState } from 'react'
import { api } from '../api/client'
import { Download, Upload, RefreshCw, CheckCircle, AlertCircle, ArrowLeft } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

export function BackupPage() {
  const navigate = useNavigate()
  const [exporting, setExporting] = useState(false)
  const [importing, setImporting] = useState(false)
  const [includeCovers, setIncludeCovers] = useState(false)
  const [result, setResult] = useState<{ type: 'success' | 'error'; message: string } | null>(null)
  const [lastExport, setLastExport] = useState<string | null>(null)

  const handleExport = async () => {
    setExporting(true)
    setResult(null)
    try {
      const blob = await api.exportBackup(includeCovers)
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `ireader-backup-${Date.now()}.zip`
      a.click()
      URL.revokeObjectURL(url)
      setLastExport(new Date().toLocaleString())
      setResult({ type: 'success', message: `Backup exported! (${(blob.size / 1024).toFixed(1)} KB)` })
    } catch (err) {
      setResult({ type: 'error', message: err instanceof Error ? err.message : 'Export failed' })
    } finally {
      setExporting(false)
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
      try {
        const reader = new FileReader()
        reader.onload = async (e) => {
          const base64 = (e.target?.result as string).split(',')[1]!
          const res = await api.importBackup(base64, strategy)
          setResult({ type: 'success', message: `Imported ${res.entries} entries across ${res.tables.length} tables!` })
          setImporting(false)
        }
        reader.readAsDataURL(file)
      } catch (err) {
        setResult({ type: 'error', message: err instanceof Error ? err.message : 'Import failed' })
        setImporting(false)
      }
    }
    input.click()
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
        {/* Export */}
        <div className="p-4 rounded-xl bg-surface border border-border-light">
          <h2 className="text-sm font-semibold text-text mb-2 flex items-center gap-2">
            <Download className="w-4 h-4 text-accent" strokeWidth={1.5} />
            Export Backup
          </h2>
          <p className="text-xs text-text-secondary mb-3">
            Creates a ZIP file with your library, history, settings, and downloaded data.
          </p>

          <label className="flex items-center gap-2 mb-3 cursor-pointer">
            <input
              type="checkbox"
              checked={includeCovers}
              onChange={e => setIncludeCovers(e.target.checked)}
              className="rounded border-border-light bg-surface text-accent focus:ring-accent"
            />
            <span className="text-xs text-text-secondary">Include covers (larger file)</span>
          </label>

          <button
            onClick={handleExport}
            disabled={exporting}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-accent text-black text-sm font-medium hover:bg-accent/90 transition-colors disabled:opacity-50"
          >
            {exporting ? <RefreshCw className="w-4 h-4 animate-spin" strokeWidth={1.5} /> : <Download className="w-4 h-4" strokeWidth={1.5} />}
            {exporting ? 'Exporting…' : 'Export Backup'}
          </button>

          {lastExport && <p className="text-xs text-text-muted mt-2">Last export: {lastExport}</p>}
        </div>

        {/* Import */}
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
        </div>

        {/* Result */}
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