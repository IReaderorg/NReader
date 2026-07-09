#!/usr/bin/env node
import fs from 'fs'
import path from 'path'

const pluginName = process.argv[2]
if (!pluginName) {
  console.error('Usage: create-plugin <plugin-name>')
  process.exit(1)
}

const dir = path.resolve(process.cwd(), 'plugins', pluginName)
if (fs.existsSync(dir)) {
  console.error(`Plugin directory ${dir} already exists`)
  process.exit(1)
}

fs.mkdirSync(dir, { recursive: true })

const sourceJs = `export default {
  info: {
    id: '${pluginName}',
    name: '${pluginName.charAt(0).toUpperCase() + pluginName.slice(1)}',
    lang: 'en',
    baseUrl: 'https://example.com',
    version: '1.0.0',
    capabilities: ['popular', 'search', 'mangaDetail', 'chapters', 'pages'],
  },

  async popular(page) {
    return []
  },

  async search(query, page) {
    return []
  },

  async mangaDetail(id) {
    return { id, title: '', coverUrl: '', description: '', genres: [], chapters: [], lastUpdated: new Date().toISOString() }
  },

  async chapters(mangaId) {
    return []
  },

  async pages(chapterId) {
    return []
  },
}
`

const sourceJson = JSON.stringify({
  id: pluginName,
  name: pluginName.charAt(0).toUpperCase() + pluginName.slice(1),
  lang: 'en',
  version: '1.0.0',
}, null, 2)

fs.writeFileSync(path.join(dir, 'source.js'), sourceJs)
fs.writeFileSync(path.join(dir, 'source.json'), sourceJson)

console.log(`Plugin scaffold created at ${dir}`)
console.log('Edit source.js to implement the source methods.')
