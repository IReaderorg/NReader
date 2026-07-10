import { useState, useEffect } from 'react'
import { ArrowLeft, Globe, Clock, RefreshCw, Wifi } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { api } from '../api/client'

export function SourceSettingsPage() {
  const navigate = useNavigate()
  const [updateInterval, setUpdateInterval] = useState(6)
  const [autoUpdate, setAutoUpdate] = useState(true)
  const [connectionTimeout, setConnectionTimeout] = useState(30)
  const [autoUpdateSources, setAutoUpdateSources] = useState(false)

  useEffect(() => {
    api.getSettings().then(s => {
      if (s.updateInterval) setUpdateInterval(s.updateInterval as number)
      if (s.autoUpdate !== undefined) setAutoUpdate(s.autoUpdate as boolean)
      if (s.connectionTimeout) setConnectionTimeout(s.connectionTimeout as number)
      if (s.autoUpdateSources !== undefined) setAutoUpdateSources(s.autoUpdateSources as boolean)
    }).catch(() => {})
  }, [])

  const update = (key: string, value: unknown) => {
    api.setSetting(key, value).catch(() => {})
  }

  const intervalOptions = [
    { value: 1, label: '1 hour' },
    { value: 3, label: '3 hours' },
    { value: 6, label: '6 hours' },
    { value: 12, label: '12 hours' },
    { value: 24, label: '24 hours' },
    { value: 0, label: 'Manual only' },
  ]

  return (
    <div>
      <div className="flex items-center gap-3 mb-4">
        <button onClick={() => navigate('/settings')} className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-surface-hover transition-colors">
          <ArrowLeft className="w-4 h-4 text-text-secondary" strokeWidth={1.5} />
        </button>
        <h1 className="text-base font-bold text-text">Source Settings</h1>
      </div>

      <div className="space-y-4">
        {/* Update Interval */}
        <div className="p-4 rounded-xl bg-surface border border-border-light">
          <div className="flex items-center gap-3 mb-3">
            <Clock className="w-4.5 h-4.5 text-accent" strokeWidth={1.5} />
            <div>
              <p className="text-sm font-medium text-text">Update Interval</p>
              <p className="text-xs text-text-secondary">How often sources check for new chapters</p>
            </div>
          </div>
          <select
            value={updateInterval}
            onChange={e => { const v = Number(e.target.value); setUpdateInterval(v); update('updateInterval', v) }}
            className="w-full rounded-xl bg-surface-hover border border-border-light px-3 py-2.5 text-sm text-text"
          >
            {intervalOptions.map(o => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>
        </div>

        {/* Connection Timeout */}
        <div className="p-4 rounded-xl bg-surface border border-border-light">
          <div className="flex items-center gap-3 mb-3">
            <Globe className="w-4.5 h-4.5 text-accent" strokeWidth={1.5} />
            <div>
              <p className="text-sm font-medium text-text">Connection Timeout</p>
              <p className="text-xs text-text-secondary">Maximum time to wait for source responses</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <input
              type="range"
              min={5}
              max={120}
              value={connectionTimeout}
              onChange={e => { const v = Number(e.target.value); setConnectionTimeout(v); update('connectionTimeout', v) }}
              className="flex-1 h-1.5 appearance-none bg-white/20 rounded-full accent-[hsl(var(--accent))] [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[hsl(var(--accent))]"
            />
            <span className="text-xs text-text-muted w-12 text-right">{connectionTimeout}s</span>
          </div>
        </div>

        {/* Auto-Update Sources */}
        <div className="p-4 rounded-xl bg-surface border border-border-light">
          <div className="flex items-center gap-3 mb-3">
            <RefreshCw className="w-4.5 h-4.5 text-accent" strokeWidth={1.5} />
            <div>
              <p className="text-sm font-medium text-text">Auto-Update Sources</p>
              <p className="text-xs text-text-secondary">Check source plugin updates on startup</p>
            </div>
          </div>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={autoUpdateSources}
              onChange={e => { setAutoUpdateSources(e.target.checked); update('autoUpdateSources', e.target.checked) }}
              className="w-4 h-4 rounded border-border-light bg-surface-hover text-accent focus:ring-accent"
            />
            <span className="text-xs text-text-secondary">Check for source updates automatically</span>
          </label>
        </div>

        {/* Auto-Update Chapters */}
        <div className="p-4 rounded-xl bg-surface border border-border-light">
          <div className="flex items-center gap-3 mb-3">
            <Wifi className="w-4.5 h-4.5 text-accent" strokeWidth={1.5} />
            <div>
              <p className="text-sm font-medium text-text">Auto-Update</p>
              <p className="text-xs text-text-secondary">Background update for followed manga</p>
            </div>
          </div>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={autoUpdate}
              onChange={e => { setAutoUpdate(e.target.checked); update('autoUpdate', e.target.checked) }}
              className="w-4 h-4 rounded border-border-light bg-surface-hover text-accent focus:ring-accent"
            />
            <span className="text-xs text-text-secondary">Auto-update followed manga chapters</span>
          </label>
        </div>
      </div>
    </div>
  )
}
