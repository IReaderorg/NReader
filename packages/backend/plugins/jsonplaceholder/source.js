// JSONPlaceholder HTTP Plugin — validates fetch pipeline with real API
// Uses https://jsonplaceholder.typicode.com (free, public, reachable)
export default {
  info: {
    id: 'jsonplaceholder',
    name: 'JSONPlaceholder',
    lang: 'en',
    baseUrl: 'https://jsonplaceholder.typicode.com',
    version: '1.0.0',
    capabilities: ['popular', 'search', 'mangaDetail', 'chapters', 'pages'],
  },

  async popular(page) {
    const res = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=20&_start=' + ((page || 1) - 1) * 20)
    const posts = await res.json()
    return posts.map(post => ({
      id: 'jsonplaceholder/post-' + post.id,
      title: post.title,
      coverUrl: 'https://via.placeholder.com/350x500/2d3748/ffffff?text=Post+' + post.id,
      author: 'User #' + post.userId,
      status: 'completed',
      rating: 5.0,
      lastUpdated: new Date().toISOString(),
    }))
  },

  async search(query, page) {
    // jsonplaceholder doesn't support text search natively, so fetch all and filter
    const res = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=100')
    const posts = await res.json()
    const q = query.toLowerCase()
    const filtered = posts.filter(p => p.title.toLowerCase().includes(q) || p.body.toLowerCase().includes(q))
    const start = ((page || 1) - 1) * 20
    return filtered.slice(start, start + 20).map(post => ({
      id: 'jsonplaceholder/post-' + post.id,
      title: post.title,
      coverUrl: 'https://via.placeholder.com/350x500/2d3748/ffffff?text=Search',
      author: 'User #' + post.userId,
      status: 'completed',
      rating: 5.0,
      lastUpdated: new Date().toISOString(),
    }))
  },

  async mangaDetail(id) {
    const postId = id.split('-').pop()
    const res = await fetch('https://jsonplaceholder.typicode.com/posts/' + postId)
    const post = await res.json()
    // Also fetch comments to serve as chapters
    const commentsRes = await fetch('https://jsonplaceholder.typicode.com/posts/' + postId + '/comments')
    const comments = await commentsRes.json()
    const chapters = comments.map((c, i) => ({
      id: id + '/comment-' + c.id,
      number: i + 1,
      title: c.name.length > 60 ? c.name.slice(0, 60) + '…' : c.name,
      read: false,
      downloaded: false,
      date: new Date().toISOString(),
    }))
    return {
      id,
      title: post.title,
      coverUrl: 'https://via.placeholder.com/350x500/2d3748/ffffff?text=Post+' + post.id,
      description: post.body,
      genres: ['blog', 'article'],
      author: 'User #' + post.userId,
      status: 'completed',
      rating: 5.0,
      lastUpdated: new Date().toISOString(),
      chapters,
      altTitles: [],
    }
  },

  async chapters(mangaId) {
    const postId = mangaId.split('-').pop()
    const res = await fetch('https://jsonplaceholder.typicode.com/posts/' + postId + '/comments')
    const comments = await res.json()
    return comments.map((c, i) => ({
      id: mangaId + '/comment-' + c.id,
      number: i + 1,
      title: c.name.length > 60 ? c.name.slice(0, 60) + '…' : c.name,
      read: false,
      downloaded: false,
      date: new Date().toISOString(),
    }))
  },

  async pages(chapterId) {
    const commentId = chapterId.split('-').pop()
    const res = await fetch('https://jsonplaceholder.typicode.com/comments/' + commentId)
    const comment = await res.json()
    return [
      { index: 0, url: 'https://via.placeholder.com/800x1200/2d3748/ffffff?text=Comment' },
      { index: 1, url: '' }, // empty URL = text-based page; reader will show body
      { index: 2, url: '' },
    ]
  },
}
