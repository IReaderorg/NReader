import { useState, useEffect } from 'react'
import { ArrowLeft, FolderOpen, Download, Wifi, RefreshCw } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { api } from '../api/client'

export function DownloadSettingsPage() {
  const navigate = useNavigate()
  const [downloadPath, setDownloadPath] = useState('')
  const [concurrentDownloads, setConcurrentDownloads] = useState(3)
  const [wifiOnly, setWifiOnly] = useState(true)
  const [autoDownload, setAutoDownload] = useState(false)

  useEffect(() => {
    api.getSettings().then(s => {
      if (s.downloadPath) setDownloadPath(s.downloadPath as string)
      if (s.concurrentDownloads) setConcurrentDownloads(s.concurrentDownloads as number)
      if (s.wifiOnly !== undefined) setWifiOnly(s.wifiOnly as boolean)
      if (s.autoDownload !== undefined) setAutoDownload(s.autoDownload as boolean)
    }).catch(() => {})
  }, [])

  const update = (key: string, value: unknown) => {
    api.setSetting(key, value).catch(() => {})
  }

  return (
    <div>
      <div className="flex items-center gap-3 mb-4">
        <button onClick={() => navigate('/settings')} className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-surface-hover transition-colors">
          <ArrowLeft className="w-4 h-4 text-text-secondary" strokeWidth={1.5} />
        </button>
        <h1 className="text-base font-bold text-text">Download Settings</h1>
      </div>

      <div className="space-y-4">
        {/* Download Path */}
        <div className="p-4 rounded-xl bg-surface border border-border-light">
          <div className="flex items-center gap-3 mb-3">
            <FolderOpen className="w-4.5 h-4.5 text-accent" strokeWidth={1.5} />
            <div>
              <p className="text-sm font-medium text-text">Download Path</p>
              <p className="text-xs text-text-secondary">Where downloaded chapters are saved</p>
            </div>
          </div>
          <input
            type="text"
            value={downloadPath}
            onChange={e => { setDownloadPath(e.target.value); update('downloadPath', e.target.value) }}
            placeholder="/downloads/manga"
            className="w-full px-3 py-2 rounded-lg bg-surface-hover border border-border-light text-text text-xs focus:outline-none focus:border-accent/50"
          />
          <p className="text-[10px] text-text-muted mt-1.5">Relative to app data directory</p>
        </div>

        {/* Concurrent Downloads */}
        <div className="p-4 rounded-xl bg-surface border border-border-light">
          <div className="flex items-center gap-3 mb-3">
            <Download className="w-4.5 h-4.5 text-accent" strokeWidth={1.5} />
            <div>
              <p className="text-sm font-medium text-text">Concurrent Downloads</p>
              <p className="text-xs text-text-secondary">Max simultaneous chapter downloads</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <input
              type="range"
              min={1}
              max={10}
              value={concurrentDownloads}
              onChange={e => { const v = Number(e.target.value); setConcurrentDownloads(v); update('concurrentDownloads', v) }}
              className="flex-1 h-1.5 appearance-none bg-white/20 rounded-full accent-[hsl(var(--accent))] [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[hsl(var(--accent))]"
            />
            <span className="text-xs text-text-muted w-8 text-right">{concurrentDownloads}</span>
          </div>
        </div>

        {/* WiFi Only */}
        <div className="p-4 rounded-xl bg-surface border border-border-light">
          <div className="flex items-center gap-3 mb-3">
            <Wifi className="w-4.5 h-4.5 text-accent" strokeWidth={1.5} />
            <div>
              <p className="text-sm font-medium text-text">WiFi Only</p>
              <p className="text-xs text-text-secondary">Only download over WiFi connections</p>
            </div>
          </div>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={wifiOnly}
              onChange={e => { setWifiOnly(e.target.checked); update('wifiOnly', e.target.checked) }}
              className="w-4 h-4 rounded border-border-light bg-surface-hover text-accent focus:ring-accent"
            />
            <span className="text-xs text-text-secondary">Restrict downloads to WiFi</span>
          </label>
        </div>

        {/* Auto-Download */}
        <div className="p-4 rounded-xl bg-surface border border-border-light">
          <div className="flex items-center gap-3 mb-3">
            <RefreshCw className="w-4.5 h-4.5 text-accent" strokeWidth={1.5} />
            <div>
              <p className="text-sm font-medium text-text">Auto-Download</p>
              <p className="text-xs text-text-secondary">Automatically download new chapters</p>
            </div>
          </div>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={autoDownload}
              onChange={e => { setAutoDownload(e.target.checked); update('autoDownload', e.target.checked) }}
              className="w-4 h-4 rounded border-border-light bg-surface-hover text-accent focus:ring-accent"
            />
            <span className="text-xs text-text-secondary">Auto-download new chapters</span>
          </label>
          {autoDownload && (
            <p className="text-[10px] text-text-muted mt-2">
              New chapters from followed manga will be downloaded in the background.
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
