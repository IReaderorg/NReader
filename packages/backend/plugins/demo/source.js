// Demo Source Plugin — returns mock data for testing
export default {
  info: {
    id: 'demo',
    name: 'Demo Source',
    lang: 'en',
    baseUrl: 'https://demo.local',
    version: '1.0.0',
    capabilities: ['popular', 'search', 'mangaDetail', 'chapters', 'pages'],
  },

  async popular(page) {
    const start = ((page || 1) - 1) * 20
    return Array.from({ length: 20 }, (_, i) => ({
      id: `demo/manga-${start + i + 1}`,
      title: `Demo Manga #${start + i + 1}`,
      coverUrl: `https://via.placeholder.com/350x500.png?text=Demo+${start + i + 1}`,
      author: 'Demo Author',
      status: 'ongoing',
      rating: Number((4 + Math.random()).toFixed(1)),
      lastUpdated: new Date().toISOString(),
    }))
  },

  async search(query, page) {
    return [
      {
        id: `demo/search-${Date.now()}`,
        title: `Result for "${query}"`,
        coverUrl: 'https://via.placeholder.com/350x500.png?text=Search',
        author: 'Unknown',
        status: 'ongoing',
        rating: 5.0,
        lastUpdated: new Date().toISOString(),
      },
    ]
  },

  async mangaDetail(id) {
    const chapters = Array.from({ length: 25 }, (_, i) => ({
      id: `${id}/ch-${i + 1}`,
      number: i + 1,
      title: `Chapter ${i + 1}`,
      read: false,
      downloaded: false,
      date: new Date(Date.now() - i * 86400000).toISOString(),
    }))
    return {
      id,
      title: 'Demo Manga',
      coverUrl: 'https://via.placeholder.com/350x500.png?text=Demo+Manga',
      description: 'A sample manga for testing the reader application. This manga demonstrates all features of the IReader Next platform.',
      genres: ['action', 'adventure', 'fantasy'],
      author: 'Demo Author',
      status: 'ongoing',
      rating: 7.5,
      lastUpdated: new Date().toISOString(),
      chapters,
      altTitles: ['Demo Manga (Alt)'],
    }
  },

  async chapters(mangaId) {
    return Array.from({ length: 25 }, (_, i) => ({
      id: `${mangaId}/ch-${i + 1}`,
      number: i + 1,
      title: `Chapter ${i + 1}`,
      read: false,
      downloaded: false,
      date: new Date(Date.now() - i * 86400000).toISOString(),
    }))
  },

  async pages(chapterId) {
    return Array.from({ length: 15 }, (_, i) => ({
      index: i,
      url: `https://via.placeholder.com/800x1200.png?text=Page+${i + 1}`,
    }))
  },
}
