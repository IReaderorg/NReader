import { TtsEngine, TtsEngineConfig, TtsState, TtsVoice } from './abstraction'

type StateHandler = (state: TtsState) => void

const ELEVENLABS_VOICES: TtsVoice[] = [
  { id: '21m00Tcm4TlvDq8ikWAM', name: 'Rachel (American)', lang: 'en', isDefault: true },
  { id: 'AZnzlk1XvdvUeBnXmlld', name: 'Domi (American)', lang: 'en', isDefault: false },
  { id: 'EXAVITQu4vr4xnSDxMaL', name: 'Bella (American)', lang: 'en', isDefault: false },
  { id: 'ErXwobaYiN019PkySvjV', name: 'Antoni (American)', lang: 'en', isDefault: false },
  { id: 'MF3mGyEYCl7XYWbV9V6O', name: 'Elli (American)', lang: 'en', isDefault: false },
  { id: 'TxGEqnHWrfWFTfGW9XjX', name: 'Josh (American)', lang: 'en', isDefault: false },
  { id: 'VR6AewLTigWG4xSOukaG', name: 'Arnold (American)', lang: 'en', isDefault: false },
  { id: 'pNInz6obpgDQGcFmaJgB', name: 'Adam (American)', lang: 'en', isDefault: false },
  { id: 'yoZ06aMxZJJ28mfd3POQ', name: 'Sam (American)', lang: 'en', isDefault: false },
  { id: 'jsCqWAovK2LkecY7zXl4', name: 'Freya (British)', lang: 'en-GB', isDefault: false },
  { id: 'jBpfuIE2acCO8z3wKNLl', name: 'Giovanni (Italian)', lang: 'it', isDefault: false },
  { id: 'zcAOhNBS3c14rBihAFp1', name: 'Glinda (American)', lang: 'en', isDefault: false },
  { id: 'bVMeCyTHy58xNoL34h3p', name: 'Dorothy (British)', lang: 'en-GB', isDefault: false },
  { id: 'LcfcDJNUP1GQjkzn1xUU', name: 'Matilda (American)', lang: 'en', isDefault: false },
  { id: 'XrExE9yKIg1WjnnlVkGX', name: 'Nicole (American)', lang: 'en', isDefault: false },
  { id: 'P7x743VjyEOyNNHJmCtY', name: 'Lily (British)', lang: 'en-GB', isDefault: false },
  { id: 'N2lVS1w4EtoT3dr4eOWO', name: 'Harry (British)', lang: 'en-GB', isDefault: false },
  { id: 'ODq5zmih8GrVes37Dizd', name: 'Patrick (American)', lang: 'en', isDefault: false },
  { id: 'ZQe5CZNOzWyzPyoV5a1c', name: 'James (American)', lang: 'en', isDefault: false },
  { id: 'Yko7PKHZNXotIFUBG7I9', name: 'Grace (American)', lang: 'en', isDefault: false },
]

export class CloudTTSEngine implements TtsEngine {
  readonly type = 'cloud' as const
  readonly name: string

  private provider: 'elevenlabs' | 'azure'
  private apiKey: string
  private _state: TtsState = 'idle'
  private handlers = new Set<StateHandler>()
  private _speed: number = 1
  private _voice: string | null = null
  private audioContext: AudioContext | null = null
  private currentSource: AudioBufferSourceNode | null = null

  // Azure
  private azureRegion: string = 'westus'

  constructor(config?: Partial<TtsEngineConfig>) {
    this.provider = config?.cloudProvider ?? 'elevenlabs'
    this.apiKey = config?.cloudApiKey ?? ''
    this._voice = config?.voice ?? null
    this._speed = config?.speed ?? 1
    this.name = this.provider === 'elevenlabs' ? 'ElevenLabs' : 'Azure TTS'
    if (!this.apiKey) throw new Error(`${this.name} API key required`)
  }

  getState(): TtsState { return this._state }

  private setState(s: TtsState) {
    this._state = s
    this.handlers.forEach(h => h(s))
  }

  on(_event: 'statechange', handler: StateHandler) { this.handlers.add(handler); }
  off(_event: 'statechange', handler: StateHandler) { this.handlers.delete(handler); }

  private getOrCreateContext(): AudioContext {
    if (!this.audioContext || this.audioContext.state === 'closed') {
      this.audioContext = new AudioContext()
    }
    return this.audioContext
  }

  async speak(text: string, onProgress?: (char: number, total: number) => void): Promise<void> {
    this.stop()

    onProgress?.(0, text.length)

    try {
      const audioBuffer = await (this.provider === 'elevenlabs'
        ? this.speakElevenLabs(text)
        : this.speakAzure(text))

      const ctx = this.getOrCreateContext()
      return new Promise((resolve) => {
        const source = ctx.createBufferSource()
        source.buffer = audioBuffer
        source.playbackRate.value = this._speed
        source.connect(ctx.destination)
        this.currentSource = source

        source.onended = () => {
          this.currentSource = null
          this.setState('idle')
          onProgress?.(text.length, text.length)
          resolve()
        }

        this.setState('speaking')
        source.start(0)

        const duration = audioBuffer.duration * 1000
        const steps = 10
        const interval = duration / steps
        let step = 1
        const timer = setInterval(() => {
          onProgress?.(Math.floor((step / steps) * text.length), text.length)
          step++
          if (step > steps) clearInterval(timer)
        }, interval)
      })
    } catch (err) {
      this.setState('idle')
      throw err
    }
  }

  private async speakElevenLabs(text: string): Promise<AudioBuffer> {
    const voiceId = this._voice ?? '21m00Tcm4TlvDq8ikWAM'
    const res = await fetch(
      `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`,
      {
        method: 'POST',
        headers: {
          'Accept': 'audio/mpeg',
          'xi-api-key': this.apiKey,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text,
          model_id: 'eleven_monolingual_v1',
          voice_settings: {
            stability: 0.5,
            similarity_boost: 0.75,
          },
        }),
      }
    )

    if (!res.ok) {
      throw new Error(`ElevenLabs error: ${res.status} ${await res.text()}`)
    }

    const audioBytes = await res.arrayBuffer()
    const ctx = this.getOrCreateContext()
    return ctx.decodeAudioData(audioBytes)
  }

  private async speakAzure(text: string): Promise<AudioBuffer> {
    const voiceName = this._voice ?? 'en-US-JennyNeural'
    const ssml = `
      <speak version='1.0' xmlns='http://www.w3.org/2001/10/synthesis' xml:lang='en-US'>
        <voice name='${voiceName}'>
          <prosody rate='${this._speed}'>
            ${this.escapeXml(text)}
          </prosody>
        </voice>
      </speak>`

    const res = await fetch(
      `https://${this.azureRegion}.tts.speech.microsoft.com/cognitiveservices/v1`,
      {
        method: 'POST',
        headers: {
          'Ocp-Apim-Subscription-Key': this.apiKey,
          'Content-Type': 'application/ssml+xml',
          'X-Microsoft-OutputFormat': 'audio-16khz-128kbitrate-mono-mp3',
        },
        body: ssml,
      }
    )

    if (!res.ok) {
      throw new Error(`Azure TTS error: ${res.status} ${await res.text()}`)
    }

    const audioBytes = await res.arrayBuffer()
    const ctx = this.getOrCreateContext()
    return ctx.decodeAudioData(audioBytes)
  }

  private escapeXml(str: string): string {
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&apos;')
  }

  pause(): void {
    if (this._state === 'speaking' && this.currentSource && this.audioContext) {
      this.audioContext.suspend()
      this.setState('paused')
    }
  }

  resume(): void {
    if (this._state === 'paused' && this.audioContext) {
      this.audioContext.resume()
      this.setState('speaking')
    }
  }

  stop(): void {
    if (this.currentSource) {
      try { this.currentSource.stop() } catch { /* already stopped */ }
      this.currentSource = null
    }
    if (this.audioContext) {
      this.audioContext.close().catch(() => {})
      this.audioContext = null
    }
    this.setState('idle')
  }

  setVoice(voiceId: string): void { this._voice = voiceId; }
  setSpeed(speed: number): void { this._speed = speed; }

  async getVoices(): Promise<TtsVoice[]> {
    if (this.provider === 'elevenlabs') {
      try {
        const res = await fetch('https://api.elevenlabs.io/v1/voices', {
          headers: { 'xi-api-key': this.apiKey },
        })
        if (res.ok) {
          const data = await res.json()
          return data.voices.map((v: { voice_id: string; name: string; labels?: { accent?: string } }) => ({
            id: v.voice_id,
            name: v.name,
            lang: v.labels?.accent ?? 'en',
            isDefault: false,
          }))
        }
      } catch { /* fallback to static list */ }
      return ELEVENLABS_VOICES
    }

    // Azure voices
    return [
      { id: 'en-US-JennyNeural', name: 'Jenny (US)', lang: 'en', isDefault: true },
      { id: 'en-US-GuyNeural', name: 'Guy (US)', lang: 'en', isDefault: false },
      { id: 'en-US-AriaNeural', name: 'Aria (US)', lang: 'en', isDefault: false },
      { id: 'en-GB-SoniaNeural', name: 'Sonia (UK)', lang: 'en-GB', isDefault: false },
      { id: 'en-GB-RyanNeural', name: 'Ryan (UK)', lang: 'en-GB', isDefault: false },
      { id: 'ja-JP-NanamiNeural', name: 'Nanami (JP)', lang: 'ja', isDefault: false },
      { id: 'ko-KR-SunHiNeural', name: 'SunHi (KR)', lang: 'ko', isDefault: false },
      { id: 'zh-CN-XiaoxiaoNeural', name: 'Xiaoxiao (CN)', lang: 'zh', isDefault: false },
      { id: 'fr-FR-DeniseNeural', name: 'Denise (FR)', lang: 'fr', isDefault: false },
      { id: 'de-DE-KatjaNeural', name: 'Katja (DE)', lang: 'de', isDefault: false },
      { id: 'es-ES-ElviraNeural', name: 'Elvira (ES)', lang: 'es', isDefault: false },
      { id: 'pt-BR-FranciscaNeural', name: 'Francisca (BR)', lang: 'pt-BR', isDefault: false },
      { id: 'ru-RU-SvetlanaNeural', name: 'Svetlana (RU)', lang: 'ru', isDefault: false },
      { id: 'ar-SA-ZariyahNeural', name: 'Zariyah (SA)', lang: 'ar', isDefault: false },
    ]
  }

  destroy(): void {
    this.stop()
    this.handlers.clear()
  }
}
