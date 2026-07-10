// Manganato Source Plugin — fetches real data from manganato.com
export default {
  info: {
    id: 'manganato',
    name: 'Manganato',
    lang: 'en',
    baseUrl: 'https://manganato.com',
    version: '1.0.0',
    capabilities: ['popular', 'search', 'mangaDetail', 'chapters', 'pages'],
  },

  async popular(page) {
    const html = await fetch(`${this.info.baseUrl}/genre-all/${page || 1}`)
    return this.parseMangaList(html)
  },

  async search(query, page) {
    const html = await fetch(
      `${this.info.baseUrl}/search/story/${encodeURIComponent(query)}?page=${page || 1}`
    )
    return this.parseMangaList(html)
  },

  async mangaDetail(id) {
    const mangaId = id.replace('manganato/', '')
    const html = await fetch(`${this.info.baseUrl}/manga/${mangaId}`)
    const $ = parseHTML(html)

    const title = $('.story-info-right h1').text().trim()
    const coverUrl = $('.story-info-left .img-loading').attr('src') || ''
    const author = $('.story-info-right .variations-tableInfo .table-value a').text().trim()
    const status = $('.story-info-right .variations-tableInfo .table-value').eq(2)?.text().trim().toLowerCase() || 'unknown'
    const rating = parseFloat($('.story-info-right .rate-this span[itemprop="ratingValue"]').text()) || 0

    const genres = $('.story-info-right .variations-tableInfo .table-value').eq(1)?.find('a').map((i, el) => el.text().trim()) || []
    const description = $('.panel-story-info .panel-story-info-description').text().trim()

    const chapters = $('.row-content-chapter li a.chapter-name').map((i, el) => {
      const href = el.attr('href') || ''
      const chId = href.split('/').pop() || `ch-${i + 1}`
      const chNum = parseFloat(href.match(/chapter[_-](\d+(?:\.\d+)?)/i)?.[1] || String(i + 1))
      return {
        id: `manganato/${chId}`,
        number: chNum,
        title: el.text().trim(),
        url: href,
        read: false,
        downloaded: false,
        date: new Date().toISOString(),
      }
    }).reverse()

    return {
      id,
      title,
      coverUrl,
      author,
      status: ['ongoing', 'completed', 'hiatus', 'cancelled'].includes(status) ? status : 'ongoing',
      rating: Math.round(rating),
      lastUpdated: new Date().toISOString(),
      description,
      genres: genres.filter(Boolean),
      chapters,
    }
  },

  async chapters(mangaId) {
    const detail = await this.mangaDetail(mangaId)
    return detail.chapters
  },

  async pages(chapterId) {
    const chId = chapterId.replace('manganato/', '')
    const html = await fetch(`https://readmanganato.com/${chId}`)
    const $ = parseHTML(html)

    const pages = $('.container-chapter-reader img').map((i, el) => ({
      index: i,
      url: el.attr('src') || '',
    }))

    return pages.length > 0 ? pages : [
      { index: 0, url: `https://via.placeholder.com/800x1200?text=Chapter+${chId}` },
    ]
  },

  parseMangaList(html) {
    const $ = parseHTML(html)
    const items = $('.panel-content-genres .content-genres-item')

    if (items.length === 0) {
      // Try search result format
      const searchItems = $('.search-story-item')
      return searchItems.map((i, el) => ({
        id: `manganato/${el.find('a').eq(0)?.attr('href')?.split('/').pop() || ''}`,
        title: el.find('h3 a').text().trim() || el.find('.item-title').text().trim(),
        coverUrl: el.find('img').attr('src') || '',
        author: el.find('.item-author').text().trim().replace('Author: ', '') || 'Unknown',
        status: el.find('.item-status').text().trim().toLowerCase() || 'unknown',
        rating: 0,
        lastUpdated: new Date().toISOString(),
      }))
    }

    return items.map((i, el) => ({
      id: `manganato/${el.find('a').eq(0)?.attr('href')?.split('/').pop() || ''}`,
      title: el.find('h3 a').text().trim() || el.find('.item-title').text().trim(),
      coverUrl: el.find('img').attr('src') || '',
      author: 'Unknown',
      status: 'ongoing',
      rating: 0,
      lastUpdated: new Date().toISOString(),
    }))
  },
}
