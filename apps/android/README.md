# Android Shell module for IReader Next

## Architecture

The Android shell wraps the IReader Next web app using:
- **Embedded Ktor server** — runs the backend API in-process on a local port
- **WebView** — renders the React frontend with full JS/DOM storage support
- **Native Bridge** — JavaScript ↔ Kotlin communication for device APIs (storage, sharing, brightness)

## Building

```bash
cd apps/android
./gradlew assembleDebug
```

The APK will be at `app/build/outputs/apk/debug/app-debug.apk`.

## Development

For development, the WebView loads from `http://localhost:5173` (Vite dev server).
The Ktor server proxies API requests.

For production, the frontend is bundled into `assets/web/` and served by Ktor directly.

## Required Setup

1. Android SDK 35+
2. JDK 17+
3. Set `ANDROID_HOME` or `ANDROID_SDK_ROOT`
