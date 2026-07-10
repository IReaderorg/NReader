import { useState, useEffect } from 'react'
import { api } from '../api/client'
import { ArrowLeft, Cloud, CheckCircle, AlertCircle, Download, Trash2, Upload, RefreshCw, LogOut } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

interface DriveFileInfo {
  id: string; name: string; size: string; createdTime: string; modifiedTime: string
}

export function CloudBackupPage() {
  const navigate = useNavigate()
  const [status, setStatus] = useState<{ connected: boolean; email?: string } | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [files, setFiles] = useState<DriveFileInfo[]>([])
  const [uploading, setUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)

  useEffect(() => { loadStatus(); loadFiles() }, [])

  const loadStatus = async () => {
    setLoading(true)
    try { setStatus(await api.cloudBackup.status()) }
    catch { setStatus({ connected: false }) }
    finally { setLoading(false) }
  }

  const loadFiles = async () => {
    try { setFiles(await api.cloudBackup.list()) }
    catch { /* ignore */ }
  }

  const handleConnect = () => {
    api.cloudBackup.getAuthUrl().then(({ url }) => {
      const w = window.open(url, 'google-oauth', 'width=600,height=700')
      const handler = (e: MessageEvent) => {
        if (e.origin !== location.origin) return
        if (e.data?.type === 'google-oauth-code') {
          w?.close()
          window.removeEventListener('message', handler)
          api.cloudBackup.handleCallback(e.data.code).then(() => {
            loadStatus()
          }).catch(err => setError(err instanceof Error ? err.message : 'OAuth failed'))
        }
      }
      window.addEventListener('message', handler)
    }).catch(err => setError(err instanceof Error ? err.message : 'Failed to get auth URL'))
  }

  const handleUpload = async () => {
    const input = document.createElement('input')
    input.type = 'file'
    input.accept = '.zip'
    input.onchange = async () => {
      const file = input.files?.[0]
      if (!file) return
      setUploading(true)
      setUploadProgress(10)
      try {
        await api.cloudBackup.upload(file)
        setUploadProgress(100)
        loadFiles()
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Upload failed')
      } finally {
        setUploading(false)
        setUploadProgress(0)
      }
    }
    input.click()
  }

  const handleDownload = async (id: string, name: string) => {
    try {
      const blob = await api.cloudBackup.download(id)
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url; a.download = name; a.click()
      URL.revokeObjectURL(url)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Download failed')
    }
  }

  const handleDelete = async (id: string) => {
    if (!window.confirm('Delete this backup from Google Drive?')) return
    try {
      await api.cloudBackup.deleteFile(id)
      setFiles(prev => prev.filter(f => f.id !== id))
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Delete failed')
    }
  }

  const handleDisconnect = async () => {
    if (!window.confirm('Disconnect Google Drive?')) return
    try {
      await api.cloudBackup.revoke()
      setStatus({ connected: false })
      setFiles([])
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Revoke failed')
    }
  }

  const formatDate = (s: string) => new Date(s).toLocaleString()
  const formatSize = (s: string) => {
    const n = parseInt(s, 10)
    if (isNaN(n)) return s
    if (n < 1024) return `${n} B`
    if (n < 1024 * 1024) return `${(n / 1024).toFixed(1)} KB`
    return `${(n / (1024 * 1024)).toFixed(1)} MB`
  }

  return (
    <div className="p-4">
      <div className="flex items-center gap-3 mb-4">
        <button onClick={() => navigate('/backup')} className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-surface-hover transition-colors">
          <ArrowLeft className="w-4 h-4 text-text-secondary" strokeWidth={1.5} />
        </button>
        <h1 className="text-base font-bold text-text">Cloud Backup</h1>
      </div>

      <div className="space-y-4">
        {/* Status */}
        <div className="p-4 rounded-xl bg-surface border border-border-light">
          <h2 className="text-sm font-semibold text-text mb-2 flex items-center gap-2">
            <Cloud className="w-4 h-4 text-accent" strokeWidth={1.5} />
            Google Drive
          </h2>
          {loading ? (
            <div className="flex items-center justify-center py-4"><RefreshCw className="w-4 h-4 animate-spin text-text-muted" /></div>
          ) : status?.connected ? (
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-xs text-text-secondary">
                <CheckCircle className="w-3.5 h-3.5 text-green-500" strokeWidth={1.5} />
                Connected as <span className="text-text font-medium">{status.email ?? 'Unknown'}</span>
              </div>
              <button onClick={handleDisconnect} className="flex items-center gap-1.5 text-xs text-danger hover:underline">
                <LogOut className="w-3 h-3" strokeWidth={1.5} /> Disconnect
              </button>
            </div>
          ) : (
            <div className="space-y-2">
              <p className="text-xs text-text-secondary">Connect to Google Drive to backup and sync your data.</p>
              <button onClick={handleConnect} className="flex items-center gap-2 px-4 py-2 rounded-xl bg-accent text-black text-sm font-medium hover:bg-accent/90 transition-colors">
                <Cloud className="w-4 h-4" strokeWidth={1.5} /> Connect Google Drive
              </button>
            </div>
          )}
        </div>

        {/* Upload */}
        {status?.connected && (
          <div className="p-4 rounded-xl bg-surface border border-border-light">
            <h2 className="text-sm font-semibold text-text mb-2 flex items-center gap-2">
              <Upload className="w-4 h-4 text-accent" strokeWidth={1.5} />
              Upload Backup
            </h2>
            <button onClick={handleUpload} disabled={uploading} className="flex items-center gap-2 px-4 py-2 rounded-xl bg-surface border border-border-light text-sm text-text hover:bg-surface-hover transition-colors disabled:opacity-50">
              {uploading ? <RefreshCw className="w-4 h-4 animate-spin" strokeWidth={1.5} /> : <Upload className="w-4 h-4" strokeWidth={1.5} />}
              {uploading ? 'Uploading…' : 'Select ZIP File'}
            </button>
            {uploadProgress > 0 && (
              <div className="mt-3 w-full bg-surface-hover rounded-full h-1.5">
                <div className="bg-accent h-1.5 rounded-full transition-all duration-300" style={{ width: `${Math.min(uploadProgress, 100)}%` }} />
              </div>
            )}
          </div>
        )}

        {/* File list */}
        {status?.connected && (
          <div className="p-4 rounded-xl bg-surface border border-border-light">
            <h2 className="text-sm font-semibold text-text mb-2 flex items-center gap-2">
              <Download className="w-4 h-4 text-accent" strokeWidth={1.5} />
              Drive Backups
            </h2>
            {files.length === 0 ? (
              <p className="text-xs text-text-muted py-4 text-center">No backups on Google Drive.</p>
            ) : (
              <div className="space-y-1 max-h-64 overflow-y-auto">
                {files.map(f => (
                  <div key={f.id} className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-surface-hover transition-colors">
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-text truncate">{f.name}</p>
                      <p className="text-[10px] text-text-muted">{formatSize(f.size)} • {formatDate(f.createdTime)}</p>
                    </div>
                    <button onClick={() => handleDownload(f.id, f.name)} className="w-7 h-7 flex items-center justify-center rounded-lg text-text-muted hover:text-accent transition-colors" title="Download">
                      <Download className="w-3 h-3" strokeWidth={1.5} />
                    </button>
                    <button onClick={() => handleDelete(f.id)} className="w-7 h-7 flex items-center justify-center rounded-lg text-text-muted hover:text-danger transition-colors" title="Delete">
                      <Trash2 className="w-3 h-3" strokeWidth={1.5} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {error && (
          <div className="p-3 rounded-xl flex items-center gap-2 text-sm bg-danger/10 text-danger">
            <AlertCircle className="w-4 h-4" strokeWidth={1.5} />
            {error}
            <button onClick={() => setError(null)} className="ml-auto text-danger hover:underline text-xs">Dismiss</button>
          </div>
        )}
      </div>
    </div>
  )
}
