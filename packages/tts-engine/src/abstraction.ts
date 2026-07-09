export interface TtsVoice {
  id: string
  name: string
  lang: string
  isDefault: boolean
}

export type TtsEngineType = 'web-speech' | 'gradio' | 'cloud'

export interface TtsEngineConfig {
  type: TtsEngineType
  voice?: string
  speed?: number
  pitch?: number
  volume?: number
  // Gradio
  gradioEndpoint?: string
  // Cloud
  cloudProvider?: 'elevenlabs' | 'azure'
  cloudApiKey?: string
}

export interface TtsEngine {
  readonly type: TtsEngineType
  readonly name: string
  speak(text: string, onProgress?: (char: number, total: number) => void): Promise<void>
  pause(): void
  resume(): void
  stop(): void
  setVoice(voiceId: string): void
  setSpeed(speed: number): void
  getVoices(): Promise<TtsVoice[]>
  getState(): TtsState
  on(event: 'statechange', handler: (state: TtsState) => void): void
  off(event: 'statechange', handler: (state: TtsState) => void): void
  destroy(): void
}

export type TtsState = 'idle' | 'speaking' | 'paused'
