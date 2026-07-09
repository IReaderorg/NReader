package com.ireader.next

import android.webkit.JavascriptInterface
import org.json.JSONObject

/**
 * JavaScript bridge that allows the frontend to call native Android APIs.
 * Exposed as `window.NativeBridge` in the WebView.
 */
class NativeBridge {

    @JavascriptInterface
    fun toast(message: String) {
        android.os.Handler(android.os.Looper.getMainLooper()).post {
            // Toast requires a Context; this is a simplified bridge stub
            // In a real integration, pass the application context via constructor
            android.util.Log.i("NativeBridge", "toast: $message")
        }
    }

    @JavascriptInterface
    fun getDeviceInfo(): String {
        val info = JSONObject().apply {
            put("platform", "android")
            put("version", android.os.Build.VERSION.RELEASE)
            put("model", android.os.Build.MODEL)
            put("manufacturer", android.os.Build.MANUFACTURER)
            put("sdk", android.os.Build.VERSION.SDK_INT)
        }
        return info.toString()
    }

    @JavascriptInterface
    fun openUrl(url: String) {
        android.os.Handler(android.os.Looper.getMainLooper()).post {
            // Implementation would use an Intent to open the URL
        }
    }

    @JavascriptInterface
    fun shareText(title: String, text: String) {
        android.os.Handler(android.os.Looper.getMainLooper()).post {
            // Implementation would use share Intent
        }
    }

    @JavascriptInterface
    fun getStoragePath(): String {
        return android.os.Environment.getExternalStorageDirectory().absolutePath
    }

    @JavascriptInterface
    fun setScreenBrightness(brightness: Float) {
        android.os.Handler(android.os.Looper.getMainLooper()).post {
            // Implementation would use WindowManager
        }
    }

    companion object {
        private const val TAG = "NativeBridge"
    }
}
