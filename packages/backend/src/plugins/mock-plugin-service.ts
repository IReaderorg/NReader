export class MockPluginService {
  getAllPlugins() {
    return [
      { id: 'demo', name: 'Demo Source', lang: 'en', baseUrl: 'https://demo.local', version: '1.0.0', capabilities: ['popular', 'search', 'mangaDetail', 'chapters', 'pages'] },
    ]
  }

  getPlugin(id: string) {
    return this.getAllPlugins().find(p => p.id === id)
  }

  async executePluginMethod(pluginId: string, method: string, args: unknown[]): Promise<any> {
    if (method === 'popular') {
      return Array.from({ length: 20 }, (_, i) => ({
        id: `${pluginId}/manga-${i + 1}`,
        title: `${pluginId} Manga #${i + 1}`,
        coverUrl: `https://via.placeholder.com/350x500?text=${encodeURIComponent(pluginId)}`,
        author: 'Author Name',
        status: 'ongoing',
        rating: Math.round((4 + Math.random()) * 10) / 10,
        lastUpdated: new Date().toISOString(),
      }))
    }
    if (method === 'search') {
      const query = args[0] as string
      return [{ id: `${pluginId}/search-1`, title: `Result for "${query}"`, coverUrl: '', author: 'Unknown', status: 'ongoing', rating: 0, lastUpdated: new Date().toISOString() }]
    }
    if (method === 'mangaDetail') {
      const mangaId = args[0] as string
      return {
        id: mangaId,
        title: 'Manga Detail',
        coverUrl: '',
        description: 'A sample manga description.',
        genres: ['action', 'adventure'],
        status: 'ongoing',
        author: 'Author',
        rating: 7.5,
        lastUpdated: new Date().toISOString(),
        chapters: Array.from({ length: 10 }, (_, i) => ({
          id: `${mangaId}/ch-${i + 1}`,
          number: i + 1,
          title: `Chapter ${i + 1}`,
          read: false,
          downloaded: false,
        })),
      }
    }
    if (method === 'chapters') {
      return Array.from({ length: 10 }, (_, i) => ({ id: `${args[0]}/ch-${i + 1}`, number: i + 1, title: `Chapter ${i + 1}`, read: false, downloaded: false }))
    }
    if (method === 'pages') {
      return Array.from({ length: 20 }, (_, i) => ({ index: i, url: `https://via.placeholder.com/800x1200?text=Page+${i + 1}` }))
    }
    throw new Error(`Unknown method: ${method}`)
  }
}
