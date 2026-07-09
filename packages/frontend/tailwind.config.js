/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: 'hsl(var(--bg))',
        surface: 'hsl(var(--surface))',
        'surface-hover': 'hsl(var(--surface-hover))',
        'border-light': 'hsl(var(--border-light))',
        text: 'hsl(var(--text))',
        'text-secondary': 'hsl(var(--text-secondary))',
        'text-muted': 'hsl(var(--text-muted))',
        accent: { DEFAULT: 'hsl(var(--accent))', soft: 'hsl(var(--accent-soft))' },
        accent2: 'hsl(var(--accent2))',
        danger: 'hsl(var(--danger))',
      },
      borderRadius: {
        sm: 'var(--radius-sm)',
        md: 'var(--radius-md)',
        lg: 'var(--radius-lg)',
      },
      spacing: {
        sidebar: 'var(--sidebar-w)',
        pill: 'var(--pill-h)',
        header: 'var(--header-h)',
      },
    },
  },
  plugins: [],
}
