/**
 * Java archive (.jar) source loader for Tachiyomi-compatible extensions.
 *
 * Extracts source code from .jar files, detects the source format,
 * and wraps them through the Tachiyomi bridge adapter.
 */
import * as fs from 'node:fs'
import * as path from 'node:path'
import type { IReaderPluginAdapter } from './ireader-bridge.js'
import { createTachiyomiAdapter, isTachiyomiSource } from './tachiyomi-bridge.js'
import { createIReaderAdapter, isIReaderSource, createJsDependencies } from './ireader-bridge.js'
import { createLNReaderAdapter, isLNReaderSource } from './lnreader-bridge.js'

/**
 * Minimal JAR extractor — reads ZIP entries and finds JS files.
 * In production, use jszip; here we read the raw bytes and look for
 * embedded JS source strings since Tachiyomi sources are often
 * single-file JS bundles inside the JAR.
 */
export async function extractSourceFromJar(jarPath: string): Promise<string | null> {
  try {
    // Try dynamic import of jszip (available in backend)
    const JSZip = (await import('jszip')).default
    const data = fs.readFileSync(jarPath)
    const zip = await JSZip.loadAsync(data)

    // Look for .js files in the JAR
    const jsFiles: string[] = []
    zip.forEach((relPath, entry) => {
      if (!entry.dir && relPath.endsWith('.js')) {
        jsFiles.push(relPath)
      }
    })

    if (jsFiles.length === 0) return null

    // Prefer the largest JS file (likely the source bundle)
    let largest = jsFiles[0]
    let largestSize = 0
    for (const f of jsFiles) {
      const entry = zip.file(f)
      if (entry) {
        const stat = await entry.async('nodebuffer')
        if (stat.length > largestSize) {
          largestSize = stat.length
          largest = f
        }
      }
    }

    const entry = zip.file(largest)
    if (!entry) return null
    return await entry.async('text')
  } catch {
    return null
  }
}

/**
 * Detect and wrap a source from a .jar file path.
 * Returns null if no compatible source found.
 */
export async function loadJarSource(jarPath: string): Promise<IReaderPluginAdapter | null> {
  const code = await extractSourceFromJar(jarPath)
  if (!code) return null

  // Evaluate the code in a minimal context to extract the source object
  const mockContext = { module: { exports: {} }, exports: {}, console }
  const fn = new Function('module', 'exports', 'console', code)
  fn(mockContext.module, mockContext.exports, console)
  const pluginExports = mockContext.module.exports || mockContext.exports
  const source = (pluginExports as any).default || pluginExports

  if (!source || typeof source !== 'object') return null

  const deps = createJsDependencies((source as any).baseUrl || `jar://${path.basename(jarPath)}`)

  // Try detection in order: IReader → Tachiyomi → LNReader
  if (isIReaderSource(source as Record<string, unknown>)) {
    return createIReaderAdapter(source as any, deps)
  }
  if (isTachiyomiSource(source as Record<string, unknown>)) {
    return createTachiyomiAdapter(source as any, deps)
  }
  if (isLNReaderSource(source as Record<string, unknown>)) {
    return createLNReaderAdapter(source as any, deps)
  }

  return null
}

/**
 * Detect if a file path points to a JAR source.
 */
export function isJarFile(filePath: string): boolean {
  return filePath.toLowerCase().endsWith('.jar')
}
