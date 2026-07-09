package com.ireader.next

import android.os.Bundle
import android.webkit.WebView
import android.webkit.WebViewClient
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.activity.enableEdgeToEdge
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.runtime.*
import androidx.compose.ui.Modifier
import androidx.compose.ui.viewinterop.AndroidView
import kotlinx.coroutines.*

class MainActivity : ComponentActivity() {
    private val server = IReaderServer()
    private var serverPort: Int = 8080
    private var serverReady = false

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()

        setContent {
            var isLoading by remember { mutableStateOf(true) }

            LaunchedEffect(Unit) {
                withContext(Dispatchers.IO) {
                    serverPort = server.start()
                    serverReady = true
                }
                isLoading = false
            }

            if (isLoading) {
                SplashScreen()
            } else {
                WebViewScreen(port = serverPort)
            }
        }
    }

    override fun onDestroy() {
        server.stop()
        super.onDestroy()
    }
}
