import { useState, useEffect } from 'react'
import { ArrowLeft, Globe, Monitor, Type } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { api } from '../api/client'

export function GeneralSettingsPage() {
  const navigate = useNavigate()
  const [language, setLanguage] = useState('en')
  const [startupPage, setStartupPage] = useState('library')
  const [fontSize, setFontSize] = useState(16)
  const [fontFamily, setFontFamily] = useState('system-ui')

  useEffect(() => {
    api.getSettings().then(s => {
      if (s.language) setLanguage(s.language as string)
      if (s.startupPage) setStartupPage(s.startupPage as string)
      if (s.fontSize) setFontSize(s.fontSize as number)
      if (s.fontFamily) setFontFamily(s.fontFamily as string)
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
        <h1 className="text-base font-bold text-text">General Settings</h1>
      </div>

      <div className="space-y-4">
        {/* Language */}
        <div className="p-4 rounded-xl bg-surface border border-border-light">
          <div className="flex items-center gap-3 mb-3">
            <Globe className="w-4.5 h-4.5 text-accent" strokeWidth={1.5} />
            <div>
              <p className="text-sm font-medium text-text">Language</p>
              <p className="text-xs text-text-secondary">App display language</p>
            </div>
          </div>
          <select
            value={language}
            onChange={e => { setLanguage(e.target.value); update('language', e.target.value) }}
            className="w-full rounded-xl bg-surface-hover border border-border-light px-3 py-2.5 text-sm text-text"
          >
            <option value="en">English</option>
            <option value="ja">日本語</option>
            <option value="ko">한국어</option>
            <option value="zh">中文</option>
            <option value="vi">Tiếng Việt</option>
            <option value="fr">Français</option>
            <option value="de">Deutsch</option>
          </select>
        </div>

        {/* Startup Page */}
        <div className="p-4 rounded-xl bg-surface border border-border-light">
          <div className="flex items-center gap-3 mb-3">
            <Monitor className="w-4.5 h-4.5 text-accent" strokeWidth={1.5} />
            <div>
              <p className="text-sm font-medium text-text">Startup Page</p>
              <p className="text-xs text-text-secondary">Page shown on app launch</p>
            </div>
          </div>
          <select
            value={startupPage}
            onChange={e => { setStartupPage(e.target.value); update('startupPage', e.target.value) }}
            className="w-full rounded-xl bg-surface-hover border border-border-light px-3 py-2.5 text-sm text-text"
          >
            <option value="library">Library</option>
            <option value="updates">Updates</option>
            <option value="sources">Sources</option>
            <option value="history">History</option>
            <option value="last-read">Last Read</option>
          </select>
        </div>

        {/* Font Defaults */}
        <div className="p-4 rounded-xl bg-surface border border-border-light">
          <div className="flex items-center gap-3 mb-3">
            <Type className="w-4.5 h-4.5 text-accent" strokeWidth={1.5} />
            <div>
              <p className="text-sm font-medium text-text">Default Font</p>
              <p className="text-xs text-text-secondary">Base font size and family for text reader</p>
            </div>
          </div>
          <div className="space-y-3">
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-text-secondary">Font Size</span>
                <span className="text-text-muted">{fontSize}px</span>
              </div>
              <input
                type="range"
                min={12}
                max={28}
                value={fontSize}
                onChange={e => { const v = Number(e.target.value); setFontSize(v); update('fontSize', v) }}
                className="w-full h-1.5 appearance-none bg-white/20 rounded-full accent-[hsl(var(--accent))] [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[hsl(var(--accent))]"
              />
            </div>
            <select
              value={fontFamily}
              onChange={e => { setFontFamily(e.target.value); update('fontFamily', e.target.value) }}
              className="w-full rounded-xl bg-surface-hover border border-border-light px-3 py-2.5 text-sm text-text"
            >
              <option value="system-ui">System Default</option>
              <option value="serif">Serif</option>
              <option value="sans-serif">Sans Serif</option>
              <option value="monospace">Monospace</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  )
}
