# Sprint 4: TTS + Translation

**Goal:** Text-to-speech with multiple engines, AI/local translation.

## Architecture

```
Frontend (React)                    Backend (Hono)              Packages
┌──────────────────┐      REST      ┌──────────────────┐      ┌───────────────────┐
│ Reader TTS       │ ──────────▶   │ /api/v1/glossary   │ ─▶  │ @ireader/tts-engine│
│  - play/pause    │ ◀──────────   │                    │      │ - abstraction     │
│  - speed/voice   │               │ WebSocket (future) │      │ - WebSpeech       │
│ Translation      │               └──────────────────┘      │ - Gradio          │
│  - inline/replace│                                          │ - Cloud (future)  │
│  - side-by-side  │                                          └───────────────────┘
│ Settings pages   │                                          ┌───────────────────┐
│  - TTS settings  │                                          │ @ireader/         │
│  - Translation   │                                          │ translation-engine│
│  - Glossary mgr  │                                          │ - abstraction     │
└──────────────────┘                                          │ - DeepL           │
                                                              │ - AI/LLM (future) │
                                                              └───────────────────┘
```

## Tasks

### Batch A — New Packages (parallel)
- [ ] Scaffold @ireader/tts-engine (package.json, tsconfig, src/)
- [ ] Scaffold @ireader/translation-engine (package.json, tsconfig, src/)
- [ ] TTS abstraction (TtsEngine interface, TtsQueue, events)
- [ ] WebSpeech engine (browser SpeechSynthesis API)
- [ ] Translation abstraction (TranslationEngine interface)
- [ ] DeepL translation engine (configurable API key)
- [ ] Add path aliases to root tsconfig + update turbo.json

### Batch B — Backend + Frontend (parallel)
- [ ] Translation glossary API (CRUD via REST + sql.js)
- [ ] Wire glossary route into backend
- [ ] tts-store + translation-store (Zustand)
- [ ] Update api/client.ts with glossary endpoints
- [ ] TTS controls in reader overlay (play/pause/skip/speed)
- [ ] TTS settings page (engine selection, voice config)
- [ ] Translation settings + glossary manager page
- [ ] Translation toggle in reader page

### Batch C — E2E Tests
- [ ] TTS play/pause/seek cycle
- [ ] Translation glossary CRUD
- [ ] Frontend TTS settings page loads

## Acceptance Criteria
- [ ] TTS speaks chapter text via Web Speech API
- [ ] TTS play/pause/speed controls work
- [ ] Translation glossary add/edit/delete works
- [ ] Translation settings page loads with engine config
- [ ] TTS settings page loads with voice preview

## Progress
| Task | Status | Assignee |
|------|--------|----------|
| Sprint plan | done | orchestrator |
| TTS engine | pending | Milo |
| Translation engine | pending | Milo |
| Backend glossary API | pending | Sage |
| Frontend TTS + translation | pending | Nova |
| E2E tests | pending | QA |
