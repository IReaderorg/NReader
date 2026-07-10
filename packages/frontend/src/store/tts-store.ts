import { create } from 'zustand'
import type { TtsEngine, TtsState, TtsVoice, TtsEngineType } from '@ireader/tts-engine'
import { WebSpeechEngine } from '@ireader/tts-engine'

export type SleepTimerMode = '15min' | '30min' | '60min' | 'end_of_chapter'

interface SleepTimer {
  active: boolean
  mode: SleepTimerMode
  remaining: number // seconds
}

interface TtsStore {
  engine: TtsEngine | null
  engineType: TtsEngineType
  state: TtsState
  voices: TtsVoice[]
  selectedVoice: string | null
  speed: number
  pitch: number
  text: string
  charIndex: number
  currentSentenceIndex: number
  sleepTimer: SleepTimer

  initEngine: (type?: TtsEngineType) => void
  speak: (text: string) => Promise<void>
  pause: () => void
  resume: () => void
  stop: () => void
  setSpeed: (speed: number) => void
  setPitch: (pitch: number) => void
  setVoice: (voiceId: string) => void
  loadVoices: () => Promise<void>
  setSleepTimer: (mode: SleepTimerMode) => void
  clearSleepTimer: () => void
  tickSleepTimer: () => boolean
}

export const useTtsStore = create<TtsStore>((set, get) => ({
  engine: null,
  engineType: 'web-speech',
  state: 'idle',
  voices: [],
  selectedVoice: null,
  speed: 1,
  pitch: 1,
  text: '',
  charIndex: 0,
  currentSentenceIndex: 0,
  sleepTimer: { active: false, mode: '15min', remaining: 0 },

  initEngine: (type = 'web-speech') => {
    const existing = get().engine
    if (existing) existing.destroy()

    let engine: TtsEngine
    if (type === 'web-speech') {
      engine = new WebSpeechEngine({ speed: get().speed, pitch: get().pitch })
    } else {
      engine = new WebSpeechEngine({ speed: get().speed, pitch: get().pitch })
    }

    engine.on('statechange', (state) => set({ state }))
    set({ engine, engineType: type, sleepTimer: { ...get().sleepTimer, active: false } })
    get().loadVoices()
  },

  speak: async (text: string) => {
    const { engine, sleepTimer } = get()
    if (!engine) {
      get().initEngine()
    }
    const eng = get().engine!
    set({ text, charIndex: 0, currentSentenceIndex: 0 })
    // Start sleep timer countdown if active
    if (sleepTimer.active && sleepTimer.mode !== 'end_of_chapter') {
      const remaining = getSleepTimerSeconds(sleepTimer.mode)
      set({ sleepTimer: { ...sleepTimer, remaining } })
    }
    await eng.speak(text, (charIndex) => set({ charIndex }))
  },

  pause: () => get().engine?.pause(),
  resume: () => get().engine?.resume(),
  stop: () => get().engine?.stop(),
  setSpeed: (speed: number) => {
    get().engine?.setSpeed(speed)
    set({ speed })
  },
  setPitch: (pitch: number) => {
    get().engine?.setPitch(pitch)
    set({ pitch })
  },
  setVoice: (voiceId: string) => {
    get().engine?.setVoice(voiceId)
    set({ selectedVoice: voiceId })
  },

  loadVoices: async () => {
    const { engine } = get()
    if (!engine) return
    const voices = await engine.getVoices()
    set({ voices })
  },

  setSleepTimer: (mode: SleepTimerMode) => {
    const remaining = getSleepTimerSeconds(mode)
    set({ sleepTimer: { active: true, mode, remaining } })
  },

  clearSleepTimer: () => {
    set({ sleepTimer: { active: false, mode: '15min', remaining: 0 } })
  },

  tickSleepTimer: () => {
    const { sleepTimer } = get()
    if (!sleepTimer.active) return false
    const remaining = sleepTimer.remaining - 1
    if (remaining <= 0) {
      get().pause()
      set({ sleepTimer: { ...sleepTimer, active: false, remaining: 0 } })
      return true
    }
    set({ sleepTimer: { ...sleepTimer, remaining } })
    return false
  }
}))

function getSleepTimerSeconds(mode: SleepTimerMode): number {
  switch (mode) {
    case '15min': return 900
    case '30min': return 1800
    case '60min': return 3600
    case 'end_of_chapter': return 0
  }
}
