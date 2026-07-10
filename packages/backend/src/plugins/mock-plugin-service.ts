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
        title: `${pluginId} Novel #${i + 1}`,
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
        title: 'Sample Novel',
        coverUrl: '',
        description: 'A sample novel description with text-based chapters.',
        genres: ['fantasy', 'adventure'],
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
      // Return empty-url pages to signal text content (novel style)
      const chapterId = args[0] as string
      const chNum = parseInt(chapterId.split('ch-').pop() || '1', 10)
      const paragraphCount = 8 + (chNum % 5) * 2
      return Array.from({ length: paragraphCount }, (_, i) => ({
        index: i,
        url: '',
        text: generateNovelParagraph(chNum, i + 1),
      }))
    }
    if (method === 'getText') {
      const chapterId = args[0] as string
      const chNum = parseInt(chapterId.split('ch-').pop() || '1', 10)
      const paragraphCount = 8 + (chNum % 5) * 2
      return Array.from({ length: paragraphCount }, (_, i) =>
        generateNovelParagraph(chNum, i + 1)
      )
    }
    throw new Error(`Unknown method: ${method}`)
  }
}

const LOREM_PARAGRAPHS = [
  'The morning sun cast long shadows across the ancient city walls, illuminating centuries of weathered stone that had witnessed countless stories unfold. Birds circled overhead, their calls echoing through the narrow alleyways that wound like veins through the old quarter.',
  'She could hear the distant murmur of the market long before she reached it. The sounds grew from a whisper to a symphony – merchants hawking their wares, children laughing, the clatter of carts on cobblestone streets.',
  'The book lay open on the desk, its yellowed pages filled with elegant script that told of adventures in distant lands. Each word seemed to pulse with life, carrying the weight of decades gone by.',
  'Deep in the forest, where sunlight filtered through a canopy of ancient oaks, a hidden stream carved its path through moss-covered stones. The water was crystal clear, cold enough to make one catch their breath.',
  'The castle loomed against the twilight sky, its towers reaching toward the emerging stars like fingers grasping for something just beyond reach. A single light flickered in the highest window.',
  'Waves crashed against the rocky shore, spraying foam into the air. She stood at the cliff edge, feeling the salt wind on her face, watching the endless dance of the sea.',
  'The library was his sanctuary. Row upon row of leather-bound volumes lined the walls, each one a door to another world. The scent of old paper and ink was better than any perfume.',
  'Night fell like a velvet curtain, transforming the familiar landscape into something mysterious and unknown. The moon hung low and full, casting silver light across the sleeping village.',
  'In the heart of the desert, where sand dunes stretched to the horizon like frozen waves, an ancient temple lay buried. Its secrets had waited millennia to be discovered.',
  'The letter arrived on a Tuesday, its envelope bearing stamps from half a world away. She turned it over in her hands, wondering what news it carried from the brother she hadn\'t seen in years.',
  'Thunder rolled across the plains as dark clouds gathered on the horizon. The air grew heavy with the promise of rain, and somewhere in the distance, lightning split the sky.',
  'He remembered the first time he had seen the city lights from this hill. They had seemed like fallen stars scattered across the valley, a constellation of human dreams and ambitions.',
  'The garden was overgrown now, but traces of its former glory remained. Roses climbed wild over crumbling trellises, and lavender spilled across pathways that had once been carefully maintained.',
  'Legends spoke of a hidden valley where the mountains parted, a place where time flowed differently. Few had sought it; fewer still had returned to tell the tale.',
  'The ship sailed into the unknown, its white sails billowing against an endless blue sky. On the deck, the captain studied his maps, searching for routes that didn\'t appear on any chart.',
  'Winter had transformed the forest into a cathedral of ice. Trees bent under the weight of snow, and the only sound was the crunch of footsteps on the frozen path.',
  'The painting hung in a small gallery, unnoticed by most visitors. But those who stopped to look found themselves drawn into its depths, discovering new details with each viewing.',
  'Music drifted through the open window, a melody both haunting and beautiful. She paused to listen, transported back to a summer evening long ago.',
  'The scientist stared at the readout, unable to believe what she was seeing. The data suggested something impossible, something that would rewrite everything they knew.',
  'Across the great river, the city of dreams rose from the morning mist. Its towers gleamed like gold, promising fortune and adventure to all who crossed its bridges.',
]

function generateNovelParagraph(chapterNum: number, paragraphIndex: number): string {
  const base = LOREM_PARAGRAPHS[(chapterNum * 3 + paragraphIndex) % LOREM_PARAGRAPHS.length]
  const paragraphNum = (chapterNum - 1) * 10 + paragraphIndex
  if (paragraphIndex === 1) {
    return `<h2>Chapter ${chapterNum}</h2>\n\n<p>${base}</p>`
  }
  return `<p>${base}</p>`
}
