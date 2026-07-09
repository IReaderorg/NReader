import { useState, useEffect, useCallback, useRef } from 'react'
import {
  X, Sun, Moon, Upload, Trash2,
  AlignLeft, AlignCenter, AlignRight, AlignJustify,
  BookOpen, Layout, Play, Square,
  Type, Palette, Settings, Loader2,
} from 'lucide-react'
import type { ReaderMode, TextAlignment, ColorFilterType, FontEntry } from '../store/reader-store'
import { useReaderStore } from '../store/reader-store'
import { useScrollLock } from '../hooks/useScrollLock'
import { api } from '../api/client'

// ─── Presets ────────────────────────────────────────────────────────────

interface ReaderPreset {
  id: string
  name: string
  description: string
  fontSize: number
  lineHeight: number
  paragraphSpacing: number
  paragraphIndent: number
  textAlignment: TextAlignment
  colorFilter: ColorFilterType
}

const PRESETS: ReaderPreset[] = [
  { id: 'comfortable', name: 'Comfortable', description: 'Relaxed spacing', fontSize: 18, lineHeight: 1.8, paragraphSpacing: 16, paragraphIndent: 0, textAlignment: 'left', colorFilter: 'none' },
  { id: 'compact', name: 'Compact', description: 'More text on screen', fontSize: 14, lineHeight: 1.4, paragraphSpacing: 8, paragraphIndent: 0, textAlignment: 'left', colorFilter: 'none' },
  { id: 'large', name: 'Large Print', description: 'Easy to read', fontSize: 24, lineHeight: 2.0, paragraphSpacing: 20, paragraphIndent: 0, textAlignment: 'left', colorFilter: 'none' },
  { id: 'book', name: 'Book Style', description: 'Like a paperback', fontSize: 17, lineHeight: 1.7, paragraphSpacing: 12, paragraphIndent: 24, textAlignment: 'justify', colorFilter: 'sepia' },
  { id: 'dark', name: 'Dark Comfort', description: 'AMOLED friendly', fontSize: 18, lineHeight: 1.7, paragraphSpacing: 14, paragraphIndent: 0, textAlignment: 'left', colorFilter: 'invert' },
]

// ─── Theme backgrounds (matching IReader preset colors) ──────────────────

const BG_THEMES = [
  { id: 'bg-white', name: 'White', bg: '#FFFFFF', text: '#1a1a2e' },
  { id: 'bg-cream', name: 'Cream', bg: '#FFF8E7', text: '#3d2b1f' },
  { id: 'bg-sepia', name: 'Sepia', bg: '#F4ECD8', text: '#5b4636' },
  { id: 'bg-light-gray', name: 'Light Gray', bg: '#E8E8E8', text: '#1a1a2e' },
  { id: 'bg-dark', name: 'Dark', bg: '#1a1a2e', text: '#e0e0e0' },
  { id: 'bg-amoled', name: 'AMOLED', bg: '#000000', text: '#d0d0d0' },
  { id: 'bg-gray-dark', name: 'Gray Dark', bg: '#2a2a3a', text: '#c8c8c8' },
  { id: 'bg-navy', name: 'Navy', bg: '#1b2838', text: '#b8c8d8' },
  { id: 'bg-green', name: 'Green', bg: '#1a3a2a', text: '#c8e0c8' },
  { id: 'bg-brown', name: 'Brown', bg: '#3d2b1f', text: '#d4c3b3' },
  { id: 'bg-blue-light', name: 'Blue Light', bg: '#e8f0fe', text: '#1a3a5c' },
  { id: 'bg-pink', name: 'Soft Pink', bg: '#fce4ec', text: '#4a1a2e' },
]

// ─── Built-in colors for custom color pickers ───────────────────────────

const PRESET_COLORS = [
  '#FFFFFF', '#FFF8E7', '#F4ECD8', '#E8E8E8', '#FFE0B2', '#F5F5DC',
  '#1a1a2e', '#000000', '#2a2a3a', '#1b2838', '#1a3a2a', '#3d2b1f',
  '#e0e0e0', '#c8c8c8', '#FFCDD2', '#BBDEFB', '#C8E6C9', '#FFE082',
  '#D1C4E9', '#B2DFDB', '#F8BBD0', '#B3E5FC', '#DCEDC8', '#FFECB3',
]

// ─── Props ──────────────────────────────────────────────────────────────

interface ReaderSettingsSheetProps {
  visible: boolean
  onClose: () => void
  availableThemes?: { id: string; name: string; colors: Record<string, string> }[]
}

// ─── Sub-components ─────────────────────────────────────────────────────

type TabKey = 'reader' | 'general' | 'colors' | 'fonts'
const TABS: { key: TabKey; label: string; icon: typeof Settings }[] = [
  { key: 'reader', label: 'Reader', icon: BookOpen },
  { key: 'general', label: 'General', icon: Settings },
  { key: 'colors', label: 'Colors', icon: Palette },
  { key: 'fonts', label: 'Fonts', icon: Type },
]

export function ReaderSettingsSheet({ visible, onClose, availableThemes = [] }: ReaderSettingsSheetProps) {
  const [activeTab, setActiveTab] = useState<TabKey>('reader')
  useScrollLock(visible)

  useEffect(() => {
    if (!visible) return
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [visible, onClose])

  if (!visible) return null

  return (
    <div className="fixed inset-0 z-[60]">
      {/* Scrim */}
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />
      {/* Sheet */}
      <div className="absolute bottom-0 left-0 right-0 max-h-[55vh] bg-surface rounded-t-2xl flex flex-col shadow-2xl animate-in slide-in-from-bottom duration-200">
        {/* Handle */}
        <div className="flex justify-center pt-3 pb-1">
          <div className="w-10 h-1 rounded-full bg-text-muted/30" />
        </div>

        {/* Tabs */}
        <TabBar activeTab={activeTab} onTabChange={setActiveTab} onClose={onClose} />

        {/* Tab Content */}
        <div className="flex-1 overflow-hidden">
          {activeTab === 'reader' && <ReaderTab />}
          {activeTab === 'general' && <GeneralTab />}
          {activeTab === 'colors' && <ColorsTab themes={availableThemes} />}
          {activeTab === 'fonts' && <FontsTab />}
        </div>

        {/* Safe area */}
        <div style={{ height: 'env(safe-area-inset-bottom, 0px)' }} />
      </div>
    </div>
  )
}

// ─── Tab Bar ────────────────────────────────────────────────────────────

function TabBar({ activeTab, onTabChange, onClose }: {
  activeTab: TabKey
  onTabChange: (t: TabKey) => void
  onClose: () => void
}) {
  return (
    <div className="flex items-center border-b border-border-light px-2">
      {TABS.map(({ key, label, icon: Icon }) => (
        <button
          key={key}
          onClick={() => onTabChange(key)}
          className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 text-sm font-medium transition-colors relative ${
            activeTab === key ? 'text-accent' : 'text-text-muted hover:text-text'
          }`}
        >
          <Icon className="w-3.5 h-3.5" strokeWidth={1.5} />
          <span className="hidden sm:inline">{label}</span>
          {activeTab === key && (
            <div className="absolute bottom-0 left-1/4 right-1/4 h-0.5 bg-accent rounded-full" />
          )}
        </button>
      ))}
      <button
        onClick={onClose}
        className="w-8 h-8 flex items-center justify-center rounded-lg text-text-muted hover:text-text hover:bg-surface-hover ml-1"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  )
}

// ─── Slider Row helper ──────────────────────────────────────────────────

function SliderRow({ label, value, displayValue, min, max, step, onChange }: {
  label: string; value: number; displayValue: string; min: number; max: number; step: number
  onChange: (v: number) => void
}) {
  return (
    <div className="px-4 py-2">
      <div className="flex justify-between items-center mb-1">
        <span className="text-[11px] font-medium text-text-secondary uppercase tracking-wider">{label}</span>
        <span className="text-xs text-text-muted tabular-nums">{displayValue}</span>
      </div>
      <div className="flex items-center gap-2">
        <button
          onClick={() => onChange(Math.max(min, value - step))}
          className="w-6 h-6 flex items-center justify-center rounded bg-white/5 text-text-secondary text-xs shrink-0"
        >−</button>
        <input
          type="range" min={min} max={max} step={step}
          value={value}
          onChange={e => onChange(Number(e.target.value))}
          className="flex-1 h-1.5 appearance-none bg-white/20 rounded-full accent-[hsl(var(--accent))]"
        />
        <button
          onClick={() => onChange(Math.min(max, value + step))}
          className="w-6 h-6 flex items-center justify-center rounded bg-white/5 text-text-secondary text-xs shrink-0"
        >+</button>
      </div>
    </div>
  )
}

// ─── Toggle Row helper ──────────────────────────────────────────────────

function ToggleRow({ label, subtitle, checked, onChange }: {
  label: string; subtitle?: string; checked: boolean; onChange: (v: boolean) => void
}) {
  return (
    <button
      onClick={() => onChange(!checked)}
      className="w-full flex items-center justify-between px-4 py-3 hover:bg-surface-hover transition-colors text-left"
    >
      <div className="min-w-0">
        <span className="text-sm text-text block truncate">{label}</span>
        {subtitle && <span className="text-[11px] text-text-muted block truncate">{subtitle}</span>}
      </div>
      <div className={`w-9 h-5 rounded-full transition-colors shrink-0 ml-3 ${checked ? 'bg-accent' : 'bg-text-muted/30'}`}>
        <div className={`w-4 h-4 rounded-full bg-white shadow-sm transition-transform mt-0.5 ${checked ? 'translate-x-4' : 'translate-x-0.5'}`} />
      </div>
    </button>
  )
}

// ─── Section Header ─────────────────────────────────────────────────────

function SectionHeader({ title }: { title: string }) {
  return (
    <div className="px-4 pt-4 pb-1">
      <span className="text-[11px] font-bold text-accent/80 uppercase tracking-widest">{title}</span>
    </div>
  )
}

// ═══════════════════════════════════════════════════════════════════════
//  TAB 1: READER
// ═══════════════════════════════════════════════════════════════════════

function ReaderTab() {
  const {
    fontSize, lineHeight, paragraphSpacing, paragraphIndent, textAlignment, colorFilter,
    setFontSize, setLineHeight, setParagraphSpacing, setParagraphIndent, setTextAlignment, setColorFilter,
  } = useReaderStore()

  const presets = PRESETS

  const isPresetActive = (p: ReaderPreset) =>
    fontSize === p.fontSize &&
    lineHeight === p.lineHeight &&
    paragraphSpacing === p.paragraphSpacing &&
    paragraphIndent === p.paragraphIndent &&
    textAlignment === p.textAlignment &&
    colorFilter === p.colorFilter

  return (
    <div className="overflow-y-auto h-full">
      {/* Presets */}
      <SectionHeader title="Reading Presets" />
      <div className="flex gap-2 px-4 py-2 overflow-x-auto no-scrollbar">
        {presets.map(p => {
          const active = isPresetActive(p)
          return (
            <button
              key={p.id}
              onClick={() => {
                setFontSize(p.fontSize)
                setLineHeight(p.lineHeight)
                setParagraphSpacing(p.paragraphSpacing)
                setParagraphIndent(p.paragraphIndent)
                setTextAlignment(p.textAlignment)
                setColorFilter(p.colorFilter)
              }}
              className={`shrink-0 px-3 py-2 rounded-xl text-left transition-colors min-w-[100px] ${
                active ? 'bg-accent text-black' : 'bg-surface-hover/50 text-text hover:bg-surface-hover'
              }`}
            >
              <div className="text-xs font-semibold">{p.name}</div>
              <div className="text-[10px] opacity-70">{p.description}</div>
            </button>
          )
        })}
      </div>

      {/* Font */}
      <SectionHeader title="Font" />
      <SliderRow label="Font Size" value={fontSize} displayValue={`${fontSize}px`} min={10} max={48} step={1} onChange={setFontSize} />
      <SliderRow label="Line Height" value={lineHeight} displayValue={lineHeight.toFixed(1)} min={1.0} max={3.0} step={0.1} onChange={setLineHeight} />

      {/* Text Alignment */}
      <div className="px-4 py-2">
        <span className="text-[11px] font-medium text-text-secondary uppercase tracking-wider block mb-2">Alignment</span>
        <div className="flex gap-1">
          {([
            { val: 'left' as TextAlignment, Icon: AlignLeft },
            { val: 'center' as TextAlignment, Icon: AlignCenter },
            { val: 'right' as TextAlignment, Icon: AlignRight },
            { val: 'justify' as TextAlignment, Icon: AlignJustify },
          ]).map(({ val, Icon }) => (
            <button
              key={val}
              onClick={() => setTextAlignment(val)}
              className={`w-9 h-9 rounded-lg flex items-center justify-center transition-colors ${
                textAlignment === val ? 'bg-accent text-black' : 'text-text-secondary hover:bg-surface-hover'
              }`}
            >
              <Icon className="w-4 h-4" />
            </button>
          ))}
        </div>
      </div>

      {/* Paragraph */}
      <SectionHeader title="Paragraph" />
      <SliderRow label="Indent" value={paragraphIndent} displayValue={`${paragraphIndent}px`} min={0} max={80} step={1} onChange={setParagraphIndent} />
      <SliderRow label="Spacing" value={paragraphSpacing} displayValue={`${paragraphSpacing}px`} min={0} max={40} step={1} onChange={setParagraphSpacing} />

      {/* Color Filter */}
      <SectionHeader title="Color Filter" />
      <div className="flex gap-1 px-4 py-2">
        {([
          { val: 'none' as ColorFilterType, label: 'Normal' },
          { val: 'sepia' as ColorFilterType, label: 'Sepia' },
          { val: 'invert' as ColorFilterType, label: 'Invert' },
          { val: 'grayscale' as ColorFilterType, label: 'Gray' },
        ]).map(({ val, label }) => (
          <button
            key={val}
            onClick={() => setColorFilter(val)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
              colorFilter === val ? 'bg-accent text-black' : 'bg-surface-hover/50 text-text-secondary hover:bg-surface-hover'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="h-8" />
    </div>
  )
}

// ═══════════════════════════════════════════════════════════════════════
//  TAB 2: GENERAL
// ═══════════════════════════════════════════════════════════════════════

function GeneralTab() {
  const {
    mode, autoScrollSpeed,
    immersiveMode, showScrollbar, showReadingTime, volumeNavigation,
    screenAwake, bionicReading, webviewBg, selectableMode, reducedAnimations,
    setMode, setAutoScrollSpeed,
    setImmersiveMode, setShowScrollbar, setShowReadingTime, setVolumeNavigation,
    setScreenAwake, setBionicReading, setWebviewBg, setSelectableMode, setReducedAnimations,
  } = useReaderStore()

  return (
    <div className="overflow-y-auto h-full">
      <SectionHeader title="Reading Mode" />
      <div className="flex gap-1 px-4 py-2">
        {([
          { val: 'text' as ReaderMode, label: 'Continuous', icon: AlignLeft },
          { val: 'webtoon' as ReaderMode, label: 'Webtoon', icon: Layout },
          { val: 'pager' as ReaderMode, label: 'Pager', icon: BookOpen },
        ]).map(({ val, label, icon: Icon }) => (
          <button
            key={val}
            onClick={() => setMode(val)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
              mode === val ? 'bg-accent text-black' : 'bg-surface-hover/50 text-text-secondary hover:bg-surface-hover'
            }`}
          >
            <Icon className="w-3.5 h-3.5" />
            {label}
          </button>
        ))}
      </div>

      <SectionHeader title="Auto-scroll" />
      <div className="flex items-center gap-3 px-4 py-2">
        <button
          onClick={() => setAutoScrollSpeed(autoScrollSpeed > 0 ? 0 : 5)}
          className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors shrink-0 ${
            autoScrollSpeed > 0 ? 'bg-accent text-black' : 'bg-surface-hover/50 text-text-secondary'
          }`}
        >
          {autoScrollSpeed > 0 ? <Square className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
        </button>
        <span className="text-xs text-text-secondary shrink-0">Speed</span>
        <input
          type="range" min={1} max={10} step={1}
          value={autoScrollSpeed || 5}
          onChange={e => setAutoScrollSpeed(Number(e.target.value))}
          className="flex-1 h-1.5 appearance-none bg-white/20 rounded-full accent-[hsl(var(--accent))]"
        />
        <span className="text-xs text-text-muted tabular-nums w-5">{autoScrollSpeed || 5}</span>
      </div>

      <SectionHeader title="Display" />
      <ToggleRow label="Immersive Mode" subtitle="Hide bars while reading" checked={immersiveMode} onChange={setImmersiveMode} />
      <ToggleRow label="Show Scrollbar" checked={showScrollbar} onChange={setShowScrollbar} />
      <ToggleRow label="Show Reading Time" subtitle="Session timer in corner" checked={showReadingTime} onChange={setShowReadingTime} />
      <ToggleRow label="Volume Key Navigation" subtitle="Use volume buttons for prev/next" checked={volumeNavigation} onChange={setVolumeNavigation} />
      <ToggleRow label="Screen Always On" subtitle="Prevent screen timeout" checked={screenAwake} onChange={setScreenAwake} />

      <SectionHeader title="Reading Aids" />
      <ToggleRow label="Bionic Reading" subtitle="Bold first half of words for faster reading" checked={bionicReading} onChange={setBionicReading} />
      <ToggleRow label="Selectable Mode" subtitle="Allow text selection" checked={selectableMode} onChange={setSelectableMode} />
      <ToggleRow label="WebView Background" subtitle="Load pages invisibly in background" checked={webviewBg} onChange={setWebviewBg} />

      <SectionHeader title="Performance" />
      <ToggleRow label="Reduced Animations" subtitle="Better performance on older devices" checked={reducedAnimations} onChange={setReducedAnimations} />

      <div className="h-8" />
    </div>
  )
}

// ═══════════════════════════════════════════════════════════════════════
//  TAB 3: COLORS
// ═══════════════════════════════════════════════════════════════════════

function ColorsTab({ themes }: { themes: { id: string; name: string; colors: Record<string, string> }[] }) {
  const { brightness, setBrightness, selectedThemeId, setSelectedThemeId } = useReaderStore()
  const [autoBrightness, setAutoBrightness] = useState(false)
  const [showBgPicker, setShowBgPicker] = useState(false)
  const [showTextPicker, setShowTextPicker] = useState(false)
  const [customBg, setCustomBg] = useState('#1a1a2e')
  const [customText, setCustomText] = useState('#e0e0e0')
  const [themesModified, setThemesModified] = useState(false)

  const handleBgThemeSelect = useCallback((id: string) => {
    setSelectedThemeId(id)
    setThemesModified(true)
  }, [setSelectedThemeId])

  const handleSaveTheme = useCallback(async () => {
    try {
      await api.createTheme({ name: 'Custom', colors: { background: customBg, text: customText, link: '#3b82f6', highlight: '#f59e0b', header: '#ffffff', separator: '#333', card: '#242424' } })
      setThemesModified(false)
    } catch { /* ignore */ }
  }, [customBg, customText])

  return (
    <div className="overflow-y-auto h-full">
      {/* Brightness */}
      <SectionHeader title="Brightness" />
      <ToggleRow label="Auto Brightness" checked={autoBrightness} onChange={setAutoBrightness} />
      {!autoBrightness && (
        <div className="flex items-center gap-3 px-4 py-2">
          <Moon className="w-4 h-4 text-text-secondary shrink-0" />
          <input
            type="range" min={0} max={100} step={1}
            value={brightness}
            onChange={e => setBrightness(Number(e.target.value))}
            className="flex-1 h-1.5 appearance-none bg-white/20 rounded-full accent-[hsl(var(--accent))]"
          />
          <Sun className="w-4 h-4 text-text-secondary shrink-0" />
          <span className="text-xs text-text-muted tabular-nums w-8">{brightness}%</span>
        </div>
      )}

      {/* Background Themes */}
      <SectionHeader title="Background Theme" />
      <div className="grid grid-cols-4 gap-2 px-4 py-2">
        {/* API-loaded themes */}
        {themes.map(t => (
          <button
            key={t.id}
            onClick={() => handleBgThemeSelect(t.id)}
            className="rounded-xl p-2 transition-all hover:scale-105 active:scale-95 border-2"
            style={{
              backgroundColor: t.colors?.background || '#1a1a2e',
              borderColor: selectedThemeId === t.id ? 'hsl(var(--accent))' : 'transparent',
            }}
          >
            <div className="text-[10px] font-medium text-center truncate" style={{ color: t.colors?.text || '#e0e0e0' }}>
              {t.name}
            </div>
            <div className="w-full h-6 rounded mt-1 flex items-center justify-center" style={{ backgroundColor: (t.colors?.text || '#e0e0e0') + '20' }}>
              <span className="text-[9px]" style={{ color: t.colors?.text || '#e0e0e0' }}>Aa</span>
            </div>
          </button>
        ))}
        {/* Fallback: built-in BG_THEMES if no API themes */}
        {themes.length === 0 && BG_THEMES.map(t => (
          <button
            key={t.id}
            onClick={() => handleBgThemeSelect(t.id)}
            className="rounded-xl p-2 transition-all hover:scale-105 active:scale-95 border-2"
            style={{
              backgroundColor: t.bg,
              borderColor: selectedThemeId === t.id ? 'hsl(var(--accent))' : 'transparent',
            }}
          >
            <div className="text-[10px] font-medium text-center" style={{ color: t.text }}>
              {t.name}
            </div>
            <div className="w-full h-6 rounded mt-1 flex items-center justify-center" style={{ backgroundColor: t.text + '20' }}>
              <span className="text-[9px]" style={{ color: t.text }}>Aa</span>
            </div>
          </button>
        ))}
      </div>

      {/* Custom Background Color */}
      <SectionHeader title="Custom Colors" />
      <div className="flex gap-2 px-4 py-2">
        <button
          onClick={() => setShowBgPicker(v => !v)}
          className="flex-1 flex items-center gap-2 px-3 py-2 rounded-xl bg-surface-hover/50 hover:bg-surface-hover transition-colors"
        >
          <div className="w-6 h-6 rounded-lg border border-border-light" style={{ backgroundColor: customBg }} />
          <span className="text-xs text-text-secondary">Background</span>
        </button>
        <button
          onClick={() => setShowTextPicker(v => !v)}
          className="flex-1 flex items-center gap-2 px-3 py-2 rounded-xl bg-surface-hover/50 hover:bg-surface-hover transition-colors"
        >
          <div className="w-6 h-6 rounded-lg border border-border-light" style={{ backgroundColor: customText }} />
          <span className="text-xs text-text-secondary">Text Color</span>
        </button>
      </div>

      {/* Background Color Picker */}
      {showBgPicker && (
        <div className="px-4 pb-2 animate-in fade-in slide-in-from-top-1">
          <div className="grid grid-cols-8 gap-1.5 p-2 rounded-xl bg-surface-hover/30">
            {PRESET_COLORS.map(c => (
              <button
                key={c}
                onClick={() => { setCustomBg(c); setThemesModified(true); setShowBgPicker(false) }}
                className="w-7 h-7 rounded-lg border border-border-light transition-transform hover:scale-110"
                style={{ backgroundColor: c }}
              />
            ))}
          </div>
          <input
            type="color" value={customBg}
            onChange={e => { setCustomBg(e.target.value); setThemesModified(true) }}
            className="w-full h-8 rounded-lg mt-2 cursor-pointer"
          />
        </div>
      )}

      {/* Text Color Picker */}
      {showTextPicker && (
        <div className="px-4 pb-2 animate-in fade-in slide-in-from-top-1">
          <div className="grid grid-cols-8 gap-1.5 p-2 rounded-xl bg-surface-hover/30">
            {PRESET_COLORS.map(c => (
              <button
                key={c}
                onClick={() => { setCustomText(c); setThemesModified(true); setShowTextPicker(false) }}
                className="w-7 h-7 rounded-lg border border-border-light transition-transform hover:scale-110"
                style={{ backgroundColor: c }}
              />
            ))}
          </div>
          <input
            type="color" value={customText}
            onChange={e => { setCustomText(e.target.value); setThemesModified(true) }}
            className="w-full h-8 rounded-lg mt-2 cursor-pointer"
          />
        </div>
      )}

      {/* Save / Delete custom theme */}
      {themesModified && (
        <div className="flex justify-end gap-2 px-4 py-2">
          <button
            onClick={handleSaveTheme}
            className="px-4 py-1.5 rounded-lg bg-accent text-black text-xs font-medium hover:opacity-90 transition-opacity"
          >
            Save Custom Theme
          </button>
          <button
            onClick={() => {
              setCustomBg('#1a1a2e')
              setCustomText('#e0e0e0')
              setThemesModified(false)
            }}
            className="px-4 py-1.5 rounded-lg bg-surface-hover/50 text-text-secondary text-xs font-medium hover:bg-surface-hover transition-colors"
          >
            Reset
          </button>
        </div>
      )}

      <div className="h-8" />
    </div>
  )
}

// ═══════════════════════════════════════════════════════════════════════
//  TAB 4: FONTS
// ═══════════════════════════════════════════════════════════════════════

function FontsTab() {
  const { selectedFontId, setSelectedFont } = useReaderStore()
  const [fonts, setFonts] = useState<FontEntry[]>([])
  const [loading, setLoading] = useState(true)
  const [uploading, setUploading] = useState(false)
  const [fontError, setFontError] = useState<string | null>(null)
  const [deletingId, setDeletingId] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const fetchFonts = useCallback(async () => {
    try {
      const data = await api.getFonts()
      setFonts(data as FontEntry[])
    } catch { /* ignore */ }
    setLoading(false)
  }, [])

  useEffect(() => { fetchFonts() }, [fetchFonts])

  const handleUpload = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setUploading(true)
    setFontError(null)
    try {
      await api.uploadFont(file)
      await fetchFonts()
    } catch (err) {
      setFontError(err instanceof Error ? err.message : 'Upload failed')
    }
    setUploading(false)
    if (fileInputRef.current) fileInputRef.current.value = ''
  }, [fetchFonts])

  const handleDelete = useCallback(async (id: string) => {
    setFontError(null)
    setDeletingId(id)
    try {
      await api.deleteFont(id)
      if (selectedFontId === id) setSelectedFont('', 'System')
      await fetchFonts()
    } catch (err) {
      setFontError(err instanceof Error ? err.message : 'Delete failed')
    }
    setDeletingId(null)
  }, [selectedFontId, setSelectedFont, fetchFonts])

  return (
    <div className="overflow-y-auto h-full">
      {/* System default */}
      <div className="px-4 pt-3 pb-1">
        <button
          onClick={() => setSelectedFont('', 'System')}
          className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl transition-colors ${
            !selectedFontId ? 'bg-accent/10 border border-accent/30' : 'bg-surface-hover/30 hover:bg-surface-hover/50'
          }`}
        >
          <span className={`text-sm font-medium ${!selectedFontId ? 'text-accent' : 'text-text'}`}>System Default</span>
          {!selectedFontId && <span className="text-[10px] text-accent font-medium">Active</span>}
        </button>
      </div>

      <SectionHeader title="Uploaded Fonts" />

      {/* Upload button */}
      <div className="px-4 py-2">
        <button
          onClick={() => fileInputRef.current?.click()}
          disabled={uploading}
          className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border-2 border-dashed border-border-light hover:border-accent/50 transition-colors text-text-secondary hover:text-accent disabled:opacity-50"
        >
          {uploading ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Upload className="w-4 h-4" />
          )}
          <span className="text-xs font-medium">{uploading ? 'Uploading...' : 'Upload Font (.ttf, .otf, .woff2)'}</span>
        </button>
        <input
          ref={fileInputRef}
          type="file"
          accept=".ttf,.otf,.woff2"
          onChange={handleUpload}
          className="hidden"
        />
        {fontError && (
          <p className="text-[11px] text-danger mt-1.5 text-center">{fontError}</p>
        )}
      </div>

      {/* Font list */}
      {loading ? (
        <div className="flex justify-center py-4">
          <Loader2 className="w-4 h-4 text-text-muted animate-spin" />
        </div>
      ) : fonts.length === 0 ? (
        <div className="text-center py-4">
          <span className="text-xs text-text-muted">No fonts uploaded yet</span>
        </div>
      ) : (
        <div className="px-2">
          {fonts.map(f => {
            const isSelected = selectedFontId === f.id
            return (
              <div
                key={f.id}
                className={`flex items-center justify-between px-2 py-2 rounded-xl mb-1 transition-colors ${
                  isSelected ? 'bg-accent/10' : 'hover:bg-surface-hover/50'
                }`}
              >
                <button
                  onClick={() => setSelectedFont(f.id, f.name)}
                  className="flex-1 text-left min-w-0"
                >
                  <div className={`text-sm font-medium truncate ${isSelected ? 'text-accent' : 'text-text'}`}>
                    {f.name}
                  </div>
                  <div className="text-[10px] text-text-muted">
                    {f.format?.toUpperCase()} • {(f.fileSize / 1024).toFixed(0)} KB
                  </div>
                </button>
                <button
                  onClick={() => handleDelete(f.id)}
                  disabled={deletingId === f.id}
                  className="w-7 h-7 flex items-center justify-center rounded-lg text-text-muted hover:text-danger hover:bg-danger/10 transition-colors shrink-0 ml-2 disabled:opacity-50"
                >
                  {deletingId === f.id ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Trash2 className="w-3.5 h-3.5" />}
                </button>
              </div>
            )
          })}
        </div>
      )}

      <div className="h-8" />
    </div>
  )
}
