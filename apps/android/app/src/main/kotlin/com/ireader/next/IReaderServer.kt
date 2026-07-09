package com.ireader.next

import io.ktor.http.*
import io.ktor.server.application.*
import io.ktor.server.engine.*
import io.ktor.server.netty.*
import io.ktor.server.response.*
import io.ktor.server.routing.*
import java.net.ServerSocket

/**
 * Embedded Ktor HTTP server that serves the IReader Next web app
 * on Android. The frontend is loaded from the assets directory and
 * served via the local HTTP server so that the WebView can load it.
 *
 * In development, the frontend is served via Vite dev server;
 * in production, it's bundled and placed in assets/web/.
 */
class IReaderServer {
    private var server: ApplicationEngine? = null

    /**
     * Find a free port and start the server.
     * @return the port the server is listening on
     */
    fun start(): Int {
        val port = findFreePort()

        server = embeddedServer(Netty, port = port) {
            install(io.ktor.server.plugins.contentnegotiation.ContentNegotiation) {
                io.ktor.serialization.kotlinx.json.json(
                    kotlinx.serialization.json.Json {
                        ignoreUnknownKeys = true
                        isLenient = true
                    }
                )
            }

            routing {
                // API health check
                get("/api/v1/health") {
                    call.respond(mapOf("status" to "ok", "mode" to "android"))
                }

                // Serve static frontend (production) or proxy to Vite (development)
                // In production, the bundled frontend is in assets/web/
                // This is a stub that returns a simple loading page;
                // the actual frontend would be loaded via WebView from assets
                get("/") {
                    call.respondText(
                        contentType = ContentType.Text.Html,
                        text = """
                            <!DOCTYPE html>
                            <html lang="en">
                            <head>
                                <meta charset="UTF-8">
                                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                                <title>IReader Next</title>
                            </head>
                            <body>
                                <div id="root"></div>
                                <script>
                                    // In production, the frontend JS would be loaded here
                                    console.log('IReader Next Android Shell');
                                    if (window.NativeBridge) {
                                        console.log(JSON.parse(NativeBridge.getDeviceInfo()));
                                    }
                                </script>
                            </body>
                            </html>
                        """.trimIndent()
                    )
                }
            }
        }.start(wait = false)

        return port
    }

    fun stop() {
        server?.stop(1000, 3000)
        server = null
    }

    private fun findFreePort(default: Int = 8080): Int {
        return try {
            ServerSocket(default).use { it.localPort }
        } catch (e: Exception) {
            // Fall back to any available port
            ServerSocket(0).use { it.localPort }
        }
    }
}
