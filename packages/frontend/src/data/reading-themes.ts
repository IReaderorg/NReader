export interface ReadingTheme {
  id: string
  name: string
  bg: string
  text: string
  accent: string
}

export const READING_THEMES: ReadingTheme[] = [
  { id: 'warm-paper', name: 'Warm Paper', bg: '#F5ECD7', text: '#3D2B1F', accent: '#C0392B' },
  { id: 'cool-paper', name: 'Cool Paper', bg: '#E8F0FE', text: '#1A3A5C', accent: '#2980B9' },
  { id: 'dark-sepia', name: 'Dark Sepia', bg: '#2C1810', text: '#E8D5B7', accent: '#D4A574' },
  { id: 'night-blue', name: 'Night Blue', bg: '#0D1B2A', text: '#B8C8D8', accent: '#5DADE2' },
  { id: 'eye-comfort', name: 'Eye Comfort', bg: '#C7EDCC', text: '#2D5016', accent: '#27AE60' },
  { id: 'soft-amber', name: 'Soft Amber', bg: '#FFF3E0', text: '#4A3000', accent: '#FF8F00' },
  { id: 'true-dark', name: 'True Dark', bg: '#000000', text: '#D0D0D0', accent: '#BB86FC' },
  { id: 'true-light', name: 'True Light', bg: '#FFFFFF', text: '#1A1A2E', accent: '#6C63FF' },
  { id: 'mocha', name: 'Mocha', bg: '#3E2723', text: '#D7CCC8', accent: '#A1887F' },
  { id: 'forest', name: 'Forest', bg: '#1B2F1D', text: '#C8E6C9', accent: '#66BB6A' },
  { id: 'ocean', name: 'Ocean', bg: '#0D2137', text: '#90CAF9', accent: '#42A5F5' },
  { id: 'sunset', name: 'Sunset', bg: '#2D132C', text: '#F8BBD0', accent: '#EC407A' },
  { id: 'lavender', name: 'Lavender', bg: '#1A1628', text: '#D1C4E9', accent: '#7E57C2' },
  { id: 'crimson', name: 'Crimson', bg: '#1A0A0A', text: '#EF9A9A', accent: '#E53935' },
  { id: 'slate', name: 'Slate', bg: '#1E293B', text: '#CBD5E1', accent: '#64748B' },
  { id: 'honey', name: 'Honey', bg: '#3D2E00', text: '#FFE082', accent: '#FFB300' },
  { id: 'mist', name: 'Mist', bg: '#E0F2F1', text: '#004D40', accent: '#00897B' },
  { id: 'rose', name: 'Rose', bg: '#4A1A2E', text: '#F8BBD0', accent: '#F06292' },
  { id: 'charcoal', name: 'Charcoal', bg: '#1A1A1A', text: '#BDBDBD', accent: '#9E9E9E' },
  { id: 'cream', name: 'Cream', bg: '#FFF8DC', text: '#5D4037', accent: '#795548' },
  { id: 'dusk', name: 'Dusk', bg: '#1A1A2E', text: '#E0E0E0', accent: '#E94560' },
  { id: 'sakura', name: 'Sakura', bg: '#2D1B25', text: '#FCE4EC', accent: '#F48FB1' },
]
