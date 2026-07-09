import { useEffect, useState, useRef } from 'react'
import { ArrowLeft, Upload, Trash2, Plus, Check, Type, Play, Square, Eye } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { api } from '../api/client'
import { useReaderStore, type TextAlignment, type ColorFilterType } from '../store/reader-store'

interface ThemeData {
  id: string
  name: string
  isBuiltin: boolean
  colors: {
    background: string
    text: string
    link: string
    highlight: string
    header: string
    separator: string
    card: string
  }
}

interface FontEntry {
  id: string
  name: string
  fileName: string
  fileSize: number
  format: string
  uploadedAt: string
}

const COLOR_FILTERS: { key: ColorFilterType; label: string }[] = [
  { key: 'none', label: 'Normal' },
  { key: 'sepia', label: 'Sepia' },
  { key: 'invert', label: 'Invert' },
  { key: 'grayscale', label: 'Grayscale' },
]

function formatBytes(bytes: number): string {
  if (bytes === 0) return '0 B'
  const k = 1024
  const sizes = ['B', 'KB', 'MB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(1))} ${sizes[i]}`
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-6">
      <h2 className="text-sm font-semibold text-text mb-3 flex items-center gap-2">{title}</h2>
      {children}
    </div>
  )
}

function SliderControl({
  label, value, min, max, step, unit, onChange,
}: {
  label: string
  value: number
  min: number
  max: number
  step: number
  unit?: string
  onChange: (v: number) => void
}) {
  return (
    <div className="space-y-1.5">
      <div className="flex justify-between text-xs">
        <span className="text-text-secondary">{label}</span>
        <span className="text-text font-medium">{value}{unit}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={e => onChange(Number(e.target.value))}
        className="w-full h-1.5 appearance-none bg-white/20 rounded-full accent-[hsl(var(--accent))]"
      />
    </div>
  )
}

export function AppearanceSettingsPage() {
  const navigate = useNavigate()
  const fileInputRef = useRef<HTMLInputElement>(null)

  const {
    selectedThemeId, selectedFontId, selectedFontName,
    lineHeight, paragraphSpacing, paragraphIndent, textAlignment,
    colorFilter, autoScrollSpeed, contentFilterEnabled, contentFilterPatterns,
    setSelectedThemeId, setSelectedFont,
    setLineHeight, setParagraphSpacing, setParagraphIndent, setTextAlignment,
    setColorFilter, setAutoScrollSpeed,
    setContentFilterEnabled, setContentFilterPatterns,
  } = useReaderStore()

  const [themes, setThemes] = useState<ThemeData[]>([])
  const [fonts, setFonts] = useState<FontEntry[]>([])
  const [uploading, setUploading] = useState(false)
  const [showCustomThemeForm, setShowCustomThemeForm] = useState(false)
  const [newThemeName, setNewThemeName] = useState('')
  const [newThemeColors, setNewThemeColors] = useState({
    background: '#1a1a2e', text: '#e0e0e0', link: '#60a5fa',
    highlight: '#fbbf24', header: '#16213e', separator: '#2a2a4a', card: '#1f1f3a',
  })
  const [uploadError, setUploadError] = useState('')

  useEffect(() => {
    api.getThemes().then(setThemes).catch(() => {})
    api.getFonts()
      .then(setFonts)
      .catch(() => {
        // Fonts API may not be available — that's ok
        setFonts([])
      })
  }, [])

  const handleDeleteTheme = async (id: string) => {
    try {
      await api.deleteTheme(id)
      setThemes(prev => prev.filter(t => t.id !== id))
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : 'Failed to delete'
      alert(msg)
    }
  }

  const handleCreateTheme = async () => {
    if (!newThemeName.trim()) return
    try {
      const result = await api.createTheme({ name: newThemeName.trim(), colors: newThemeColors })
      setThemes(prev => [...prev, { id: result.id, name: newThemeName.trim(), isBuiltin: false, colors: newThemeColors }])
      setNewThemeName('')
      setShowCustomThemeForm(false)
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : 'Failed to create'
      alert(msg)
    }
  }

  const handleFontUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setUploadError('')
    setUploading(true)
    try {
      await api.uploadFont(file)
      await api.getFonts().then(setFonts)
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : 'Upload failed'
      setUploadError(msg)
    }
    setUploading(false)
    if (fileInputRef.current) fileInputRef.current.value = ''
  }

  const handleDeleteFont = async (id: string) => {
    try {
      await api.deleteFont(id)
      setFonts(prev => prev.filter(f => f.id !== id))
      if (selectedFontId === id) {
        setSelectedFont('', 'System')
      }
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : 'Failed to delete'
      alert(msg)
    }
  }

  const handleFontSelect = (font: FontEntry) => {
    setSelectedFont(font.id, font.name)
  }

  return (
    <div className="pb-24">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-[hsl(var(--bg))]/80 backdrop-blur-sm border-b border-border-light">
        <div className="flex items-center gap-3 px-4 h-12">
          <button
            onClick={() => navigate(-1)}
            className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-white/10 transition-colors text-text"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <h1 className="text-sm font-semibold text-text">Appearance & Reading</h1>
        </div>
      </div>

      <div className="px-4 pt-4 space-y-8 max-w-lg mx-auto">
        {/* Themes */}
        <Section title="Reader Themes">
          <div className="grid grid-cols-4 gap-2">
            {themes.filter(t => t.isBuiltin || true).map(theme => (
              <button
                key={theme.id}
                onClick={() => setSelectedThemeId(theme.id)}
                className="relative rounded-xl border-2 overflow-hidden transition-all p-2 flex flex-col items-center gap-1.5"
                style={{
                  borderColor: selectedThemeId === theme.id ? 'hsl(var(--accent))' : 'hsl(var(--border-light))',
                  backgroundColor: theme.colors.background,
                }}
              >
                <div className="w-full h-8 rounded-lg flex items-center justify-center gap-1"
                  style={{ backgroundColor: theme.colors.header }}
                >
                  <div className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: theme.colors.highlight }}
                  />
                  <div className="w-3 h-0.5 rounded"
                    style={{ backgroundColor: theme.colors.text }}
                  />
                  <div className="w-2 h-0.5 rounded"
                    style={{ backgroundColor: theme.colors.link }}
                  />
                </div>
                <span className="text-[10px] font-medium truncate w-full text-center"
                  style={{ color: theme.colors.text }}
                >
                  {theme.name}
                </span>
                {selectedThemeId === theme.id && (
                  <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-accent flex items-center justify-center">
                    <Check className="w-3 h-3 text-black" />
                  </div>
                )}
              </button>
            ))}
          </div>

          {/* Custom theme form toggle */}
          <button
            onClick={() => setShowCustomThemeForm(v => !v)}
            className="mt-2 w-full flex items-center justify-center gap-2 py-2.5 rounded-xl border border-dashed border-border-light text-text-secondary hover:text-text hover:border-white/30 transition-all text-xs"
          >
            <Plus className="w-3.5 h-3.5" />
            {showCustomThemeForm ? 'Cancel' : 'New Custom Theme'}
          </button>

          {showCustomThemeForm && (
            <div className="mt-3 p-3 rounded-xl bg-surface border border-border-light space-y-3">
              <input
                type="text"
                placeholder="Theme name"
                value={newThemeName}
                onChange={e => setNewThemeName(e.target.value)}
                className="w-full bg-white/10 rounded-lg px-3 py-2 text-sm text-text border border-border-light placeholder:text-text-muted outline-none focus:border-accent"
              />
              <div className="grid grid-cols-2 gap-2">
                {Object.entries(newThemeColors).map(([key, val]) => (
                  <label key={key} className="flex items-center gap-2 text-xs text-text-secondary">
                    <span className="capitalize min-w-[5rem]">{key}</span>
                    <input
                      type="color"
                      value={val}
                      onChange={e => setNewThemeColors(prev => ({ ...prev, [key]: e.target.value }))}
                      className="w-8 h-8 rounded cursor-pointer border-0 bg-transparent"
                    />
                  </label>
                ))}
              </div>
              <button
                onClick={handleCreateTheme}
                disabled={!newThemeName.trim()}
                className="w-full py-2 rounded-lg bg-accent text-black text-sm font-medium disabled:opacity-40"
              >
                Create Theme
              </button>
            </div>
          )}

          {/* Custom theme list */}
          {themes.filter(t => !t.isBuiltin).length > 0 && (
            <div className="mt-3 space-y-1.5">
              {themes.filter(t => !t.isBuiltin).map(theme => (
                <div key={theme.id} className="flex items-center gap-3 p-2 rounded-lg bg-surface border border-border-light">
                  <div className="w-8 h-8 rounded-lg shrink-0" style={{ backgroundColor: theme.colors.background }} />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium text-text truncate">{theme.name}</p>
                    <p className="text-[10px] text-text-muted">Custom</p>
                  </div>
                  <button
                    onClick={() => handleDeleteTheme(theme.id)}
                    className="w-7 h-7 flex items-center justify-center rounded-lg text-danger/60 hover:text-danger hover:bg-danger/10 transition-all"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </Section>

        {/* Fonts */}
        <Section title="Fonts">
          <p className="text-xs text-text-secondary mb-2">Select a font for reading or upload your own (.ttf, .otf, .woff2)</p>

          {/* System font option */}
          <button
            onClick={() => setSelectedFont('', 'System')}
            className={`w-full flex items-center gap-3 p-2.5 rounded-lg border transition-all mb-1 ${
              selectedFontId === '' && selectedFontName === 'System'
                ? 'border-accent bg-accent/5'
                : 'border-border-light bg-surface hover:bg-surface-hover'
            }`}
          >
            <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center">
              <Type className="w-4 h-4 text-accent" />
            </div>
            <div className="flex-1 text-left">
              <p className="text-xs font-medium text-text">System Default</p>
              <p className="text-[10px] text-text-muted">Your device's default font</p>
            </div>
            {selectedFontId === '' && selectedFontName === 'System' && (
              <Check className="w-4 h-4 text-accent" />
            )}
          </button>

          {/* Uploaded fonts */}
          {fonts.map(font => (
            <div key={font.id} className="flex items-center gap-3 p-2 rounded-lg bg-surface border border-border-light mb-1">
              <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center">
                <Type className="w-3.5 h-3.5 text-accent" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium text-text truncate">{font.name}</p>
                <p className="text-[10px] text-text-muted">{font.format.toUpperCase()} · {formatBytes(font.fileSize)}</p>
              </div>
              {selectedFontId === font.id && (
                <Check className="w-3.5 h-3.5 text-accent" />
              )}
              <div className="flex gap-1">
                <button
                  onClick={() => handleFontSelect(font)}
                  className="w-6 h-6 flex items-center justify-center rounded text-text-secondary hover:text-accent hover:bg-accent/10 transition-all"
                  title="Select this font"
                >
                  <Eye className="w-3 h-3" />
                </button>
                <button
                  onClick={() => handleDeleteFont(font.id)}
                  className="w-6 h-6 flex items-center justify-center rounded text-danger/60 hover:text-danger hover:bg-danger/10 transition-all"
                >
                  <Trash2 className="w-3 h-3" />
                </button>
              </div>
            </div>
          ))}

          {/* Upload button */}
          <input
            ref={fileInputRef}
            type="file"
            accept=".ttf,.otf,.woff2"
            onChange={handleFontUpload}
            className="hidden"
          />
          <button
            onClick={() => fileInputRef.current?.click()}
            disabled={uploading}
            className="mt-2 w-full flex items-center justify-center gap-2 py-2.5 rounded-xl border border-dashed border-border-light text-text-secondary hover:text-text hover:border-white/30 transition-all text-xs disabled:opacity-50"
          >
            <Upload className="w-3.5 h-3.5" />
            {uploading ? 'Uploading...' : 'Upload Font'}
          </button>
          {uploadError && <p className="text-xs text-danger mt-1">{uploadError}</p>}
        </Section>

        {/* Text Layout */}
        <Section title="Text Layout">
          <div className="space-y-3">
            <SliderControl
              label="Line Height"
              value={lineHeight}
              min={1.0} max={2.5} step={0.1}
              onChange={setLineHeight}
            />
            <SliderControl
              label="Paragraph Spacing"
              value={paragraphSpacing}
              min={0} max={40} step={1}
              unit="px"
              onChange={setParagraphSpacing}
            />
            <SliderControl
              label="Paragraph Indent"
              value={paragraphIndent}
              min={0} max={40} step={1}
              unit="px"
              onChange={setParagraphIndent}
            />

            {/* Text alignment */}
            <div className="space-y-1.5">
              <span className="text-xs text-text-secondary">Text Alignment</span>
              <div className="flex gap-1">
                {[
                  { key: 'left' as TextAlignment, label: 'Left' },
                  { key: 'center' as TextAlignment, label: 'Center' },
                  { key: 'right' as TextAlignment, label: 'Right' },
                  { key: 'justify' as TextAlignment, label: 'Justify' },
                ].map(({ key, label }) => (
                  <button
                    key={key}
                    onClick={() => setTextAlignment(key)}
                    className={`flex-1 py-2 rounded-lg text-xs font-medium transition-all ${
                      textAlignment === key
                        ? 'bg-accent text-black'
                        : 'bg-white/10 text-text-secondary hover:bg-white/20'
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </Section>

        {/* Color Filter */}
        <Section title="Color Filter">
          <p className="text-xs text-text-secondary mb-2">Apply a color overlay to the entire reader</p>
          <div className="flex gap-1">
            {COLOR_FILTERS.map(({ key, label }) => (
              <button
                key={key}
                onClick={() => setColorFilter(key)}
                className={`flex-1 py-2 rounded-lg text-xs font-medium transition-all ${
                  colorFilter === key
                    ? 'bg-accent text-black'
                    : 'bg-white/10 text-text-secondary hover:bg-white/20'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </Section>

        {/* Auto-scroll */}
        <Section title="Auto-Scroll">
          <div className="space-y-3">
            <p className="text-xs text-text-secondary">
              Automatically scroll through the page at a set speed.
              Currently {autoScrollSpeed > 0 ? `active at speed ${autoScrollSpeed}` : 'inactive'}.
            </p>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setAutoScrollSpeed(autoScrollSpeed > 0 ? 0 : 5)}
                className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${
                  autoScrollSpeed > 0
                    ? 'bg-accent text-black'
                    : 'bg-white/10 text-text-secondary hover:bg-white/20'
                }`}
              >
                {autoScrollSpeed > 0 ? <Square className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              </button>
              {autoScrollSpeed > 0 && (
                <div className="flex-1 flex items-center gap-2">
                  <span className="text-[10px] text-text-muted">Slow</span>
                  <input
                    type="range"
                    min={1}
                    max={10}
                    value={autoScrollSpeed}
                    onChange={e => setAutoScrollSpeed(Number(e.target.value))}
                    className="flex-1 h-1.5 appearance-none bg-white/20 rounded-full accent-[hsl(var(--accent))]"
                  />
                  <span className="text-[10px] text-text-muted">Fast</span>
                </div>
              )}
            </div>
          </div>
        </Section>

        {/* Content Filter */}
        <Section title="Content Filter">
          <div className="flex items-center justify-between mb-2">
            <p className="text-xs text-text-secondary">Filter out unwanted text patterns from chapter content</p>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={contentFilterEnabled}
                onChange={e => setContentFilterEnabled(e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-9 h-5 bg-white/20 rounded-full peer peer-checked:bg-accent after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:after:translate-x-full" />
            </label>
          </div>
          {contentFilterEnabled && (
            <textarea
              value={contentFilterPatterns}
              onChange={e => setContentFilterPatterns(e.target.value)}
              placeholder="One regex pattern per line. Elements matching any pattern will be hidden."
              rows={6}
              className="w-full bg-surface rounded-xl px-3 py-2.5 text-xs text-text border border-border-light placeholder:text-text-muted outline-none focus:border-accent resize-y font-mono"
            />
          )}
        </Section>
      </div>
    </div>
  )
}
