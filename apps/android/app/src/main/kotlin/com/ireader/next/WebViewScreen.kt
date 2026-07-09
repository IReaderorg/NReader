package com.ireader.next

import android.annotation.SuppressLint
import android.webkit.WebChromeClient
import android.webkit.WebSettings
import android.webkit.WebView
import android.webkit.WebViewClient
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.viewinterop.AndroidView

@SuppressLint("SetJavaScriptEnabled")
@Composable
fun WebViewScreen(port: Int) {
    AndroidView(
        factory = { context ->
            WebView(context).apply {
                settings.apply {
                    javaScriptEnabled = true
                    domStorageEnabled = true
                    allowFileAccess = false
                    allowContentAccess = false
                    cacheMode = WebSettings.LOAD_DEFAULT
                    mixedContentMode = WebSettings.MIXED_CONTENT_ALWAYS_ALLOW
                    mediaPlaybackRequiresUserGesture = false
                    databaseEnabled = true
                    setSupportMultipleWindows(false)
                }
                webViewClient = WebViewClient()
                webChromeClient = WebChromeClient()

                // Add JavaScript interface for native bridge
                addJavascriptInterface(
                    NativeBridge(),
                    "NativeBridge"
                )

                loadUrl("http://localhost:$port")
            }
        },
        update = { webView ->
            // Reload on port change
            webView.reload()
        },
        modifier = Modifier.fillMaxSize()
    )
}
