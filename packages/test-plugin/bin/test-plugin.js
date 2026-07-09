#!/usr/bin/env node
import fs from 'fs'
import path from 'path'

const [,, pluginPath, ...rest] = process.argv
if (!pluginPath) {
  console.error('Usage: test-plugin <path-to-source.js> [--method <name>] [--args <json>]')
  process.exit(1)
}

async function main() {
  const fullPath = path.resolve(pluginPath)
  if (!fs.existsSync(fullPath)) {
    console.error(`Plugin not found: ${fullPath}`)
    process.exit(1)
  }

  const code = fs.readFileSync(fullPath, 'utf-8')
  const methodIndex = rest.indexOf('--method')
  const method = methodIndex >= 0 ? rest[methodIndex + 1] : 'popular'
  const argsIndex = rest.indexOf('--args')
  const args = argsIndex >= 0 ? JSON.parse(rest[argsIndex + 1]) : []

  console.log(`\nTesting plugin: ${path.basename(fullPath)}`)
  console.log(`Method: ${method}(args: ${JSON.stringify(args)})`)
  console.log('---')

  try {
    // Create a minimal sandbox to test the plugin
    const module = { exports: {} }
    const fn = new Function('module', 'exports', 'console', code)
    fn(module, module.exports, console)
    const plugin = module.exports.default || module.exports

    // Validate structure
    if (!plugin.info) console.error('✗ Missing info property')
    else console.log(`✓ Plugin info: ${plugin.info.name} v${plugin.info.version}`)

    if (typeof plugin[method] !== 'function') {
      console.error(`✗ Method '${method}' is not a function`)
      process.exit(1)
    }

    const start = Date.now()
    const result = await plugin[method](...args)
    const elapsed = Date.now() - start

    console.log(`✓ ${method}() returned in ${elapsed}ms`)
    console.log(`  Result type: ${Array.isArray(result) ? 'Array' : typeof result}`)
    console.log(`  Result length: ${Array.isArray(result) ? result.length : 'N/A'}`)

    if (Array.isArray(result) && result.length > 0) {
      console.log(`  First item keys: ${Object.keys(result[0]).join(', ')}`)
    }
  } catch (err) {
    console.error(`✗ Error: ${err instanceof Error ? err.message : err}`)
    process.exit(1)
  }
}

main()
