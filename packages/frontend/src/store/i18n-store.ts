import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type Locale = 'en' | 'es' | 'fr' | 'de' | 'ja' | 'ko' | 'zh' | 'pt' | 'ru' | 'ar' | 'it' | 'nl' | 'tr' | 'vi' | 'th' | 'id' | 'uk' | 'pl'

export const SUPPORTED_LOCALES: Array<{ code: Locale; name: string; nativeName: string; flag: string }> = [
  { code: 'en', name: 'English', nativeName: 'English', flag: '🇺🇸' },
  { code: 'es', name: 'Spanish', nativeName: 'Español', flag: '🇪🇸' },
  { code: 'fr', name: 'French', nativeName: 'Français', flag: '🇫🇷' },
  { code: 'de', name: 'German', nativeName: 'Deutsch', flag: '🇩🇪' },
  { code: 'ja', name: 'Japanese', nativeName: '日本語', flag: '🇯🇵' },
  { code: 'ko', name: 'Korean', nativeName: '한국어', flag: '🇰🇷' },
  { code: 'zh', name: 'Chinese', nativeName: '中文', flag: '🇨🇳' },
  { code: 'pt', name: 'Portuguese', nativeName: 'Português', flag: '🇧🇷' },
  { code: 'ru', name: 'Russian', nativeName: 'Русский', flag: '🇷🇺' },
  { code: 'ar', name: 'Arabic', nativeName: 'العربية', flag: '🇸🇦' },
  { code: 'it', name: 'Italian', nativeName: 'Italiano', flag: '🇮🇹' },
  { code: 'nl', name: 'Dutch', nativeName: 'Nederlands', flag: '🇳🇱' },
  { code: 'tr', name: 'Turkish', nativeName: 'Türkçe', flag: '🇹🇷' },
  { code: 'vi', name: 'Vietnamese', nativeName: 'Tiếng Việt', flag: '🇻🇳' },
  { code: 'th', name: 'Thai', nativeName: 'ไทย', flag: '🇹🇭' },
  { code: 'id', name: 'Indonesian', nativeName: 'Bahasa Indonesia', flag: '🇮🇩' },
  { code: 'uk', name: 'Ukrainian', nativeName: 'Українська', flag: '🇺🇦' },
  { code: 'pl', name: 'Polish', nativeName: 'Polski', flag: '🇵🇱' },
]

interface I18nStore {
  locale: Locale
  setLocale: (locale: Locale) => void
  t: (key: string, params?: Record<string, string | number>) => string
}

export const useI18nStore = create<I18nStore>()(
  persist(
    (set, get) => ({
      locale: 'en',
      setLocale: (locale: Locale) => set({ locale }),
      t: (key: string, params?: Record<string, string | number>) => {
        const locale = get().locale
        const translations = messages[locale] ?? messages.en
        let value = getNestedValue(translations, key) ?? key

        if (params) {
          for (const [param, replacement] of Object.entries(params)) {
            value = value.replace(`{${param}}`, String(replacement))
          }
        }
        return value
      },
    }),
    {
      name: 'i18n-store',
      version: 1,
    }
  )
)

function getNestedValue(obj: Record<string, unknown> | undefined, path: string): string | undefined {
  if (!obj) return undefined
  const keys = path.split('.')
  let current: unknown = obj
  for (const key of keys) {
    if (typeof current !== 'object' || current === null) return undefined
    current = (current as Record<string, unknown>)[key]
  }
  return typeof current === 'string' ? current : undefined
}

// English messages (default/fallback)
const en = {
  app: {
    name: 'IReader Next',
    tagline: 'Your digital library',
  },
  nav: {
    home: 'Home',
    library: 'Library',
    sources: 'Sources',
    updates: 'Updates',
    history: 'History',
    downloads: 'Downloads',
    settings: 'Settings',
    more: 'More',
    search: 'Search',
    back: 'Back',
  },
  actions: {
    save: 'Save',
    cancel: 'Cancel',
    delete: 'Delete',
    edit: 'Edit',
    confirm: 'Confirm',
    retry: 'Retry',
    clear: 'Clear',
    close: 'Close',
    install: 'Install',
    uninstall: 'Uninstall',
    enable: 'Enable',
    disable: 'Disable',
    refresh: 'Refresh',
    export: 'Export',
    import: 'Import',
    download: 'Download',
    read: 'Read',
    continue: 'Continue Reading',
    addToLibrary: 'Add to Library',
    removeFromLibrary: 'Remove from Library',
  },
  states: {
    loading: 'Loading...',
    error: 'Something went wrong',
    empty: 'Nothing here yet',
    noResults: 'No results found',
    noBooks: 'No books yet',
    noHistory: 'No reading history',
    noDownloads: 'No downloads',
  },
  library: {
    title: 'My Library',
    searchPlaceholder: 'Search library...',
    sortByTitle: 'Title',
    sortByDateAdded: 'Date Added',
    sortByLastRead: 'Last Read',
    sortByScore: 'Score',
    gridView: 'Grid View',
    listView: 'List View',
    chapters: '{count} chapters',
    category: 'Category',
    allCategories: 'All Categories',
    createCategory: 'Create Category',
    deleteCategory: 'Delete Category',
  },
  reader: {
    settings: 'Reader Settings',
    fontSize: 'Font Size',
    lineSpacing: 'Line Spacing',
    margin: 'Margin',
    alignment: 'Alignment',
    left: 'Left',
    center: 'Center',
    justify: 'Justify',
    colorFilter: 'Color Filter',
    none: 'None',
    sepia: 'Sepia',
    dark: 'Dark',
    tts: 'Text to Speech',
    startTts: 'Start Reading',
    stopTts: 'Stop Reading',
    translation: 'Translation',
    enableTranslation: 'Enable Translation',
    bookmarks: 'Bookmarks',
    addBookmark: 'Add Bookmark',
    chapterList: 'Chapters',
  },
  settings: {
    title: 'Settings',
    appearance: 'Appearance',
    theme: 'Theme',
    dark: 'Dark',
    light: 'Light',
    amoled: 'AMOLED',
    accentColor: 'Accent Color',
    reader: 'Reader',
    tts: 'Text to Speech',
    translation: 'Translation',
    security: 'Security',
    network: 'Network',
    advanced: 'Advanced',
    about: 'About',
    backup: 'Backup & Restore',
    language: 'Language',
  },
  downloads: {
    title: 'Downloads',
    queued: 'Queued',
    downloading: 'Downloading',
    completed: 'Completed',
    failed: 'Failed',
    retryAll: 'Retry Failed',
    clearCompleted: 'Clear Completed',
    speed: '{speed} KB/s',
    progress: '{current}/{total}',
  },
  search: {
    placeholder: 'Search manga...',
    globalSearch: 'Search All Sources',
    searchSource: 'Search {source}',
    recentSearches: 'Recent Searches',
    clearRecent: 'Clear Recent',
  },
  onboarding: {
    welcome: 'Welcome to IReader Next',
    step1Title: 'Your Digital Library',
    step1Desc: 'Organize your manga collection across any number of sources, all in one place.',
    step2Title: 'Add Sources',
    step2Desc: 'Install source plugins to browse, search, and read from your favorite sites.',
    step3Title: 'Start Reading',
    step3Desc: 'Customize your reading experience with themes, TTS, translations, and more.',
    getStarted: 'Get Started',
    next: 'Next',
    skip: 'Skip',
  },
  backup: {
    title: 'Backup & Restore',
    createBackup: 'Create Backup',
    creatingBackup: 'Creating backup...',
    includeCovers: 'Include covers',
    restoreBackup: 'Restore Backup',
    selectFile: 'Select backup file',
    replaceData: 'Replace all data',
    mergeData: 'Merge with existing data',
    lastBackup: 'Last backup',
    automaticBackups: 'Automatic Backups',
    autoBackupEnabled: 'Auto-backup enabled',
    autoBackupInterval: 'Backup interval (hours)',
    maxBackups: 'Max backups to keep',
    runBackupNow: 'Run Backup Now',
  },
}

// Spanish translations (partial for demonstration; full translations would follow)
const es: Partial<typeof en> = {
  app: { name: 'IReader Next', tagline: 'Tu biblioteca digital' },
  nav: {
    home: 'Inicio', library: 'Biblioteca', sources: 'Fuentes',
    updates: 'Actualizaciones', history: 'Historial', downloads: 'Descargas',
    settings: 'Ajustes', more: 'Más', search: 'Buscar', back: 'Atrás',
  },
  actions: {
    save: 'Guardar', cancel: 'Cancelar', delete: 'Eliminar', edit: 'Editar',
    confirm: 'Confirmar', retry: 'Reintentar', clear: 'Limpiar', close: 'Cerrar',
    install: 'Instalar', uninstall: 'Desinstalar', enable: 'Activar', disable: 'Desactivar',
    refresh: 'Actualizar', export: 'Exportar', import: 'Importar',
    download: 'Descargar', read: 'Leer', continue: 'Continuar Leyendo',
    addToLibrary: 'Agregar', removeFromLibrary: 'Quitar',
  },
  states: {
    loading: 'Cargando...', error: 'Algo salió mal', empty: 'Nada aquí aún',
    noResults: 'Sin resultados', noBooks: 'No hay libros', noHistory: 'Sin historial',
    noDownloads: 'Sin descargas',
  },
  library: {
    title: 'Mi Biblioteca', searchPlaceholder: 'Buscar en biblioteca...',
    sortByTitle: 'Título', sortByDateAdded: 'Fecha Añadido', sortByLastRead: 'Última Lectura',
    sortByScore: 'Puntuación', gridView: 'Cuadrícula', listView: 'Lista',
    chapters: '{count} capítulos', category: 'Categoría', allCategories: 'Todas',
    createCategory: 'Crear Categoría', deleteCategory: 'Eliminar Categoría',
  },
  settings: {
    title: 'Ajustes', appearance: 'Apariencia', theme: 'Tema',
    dark: 'Oscuro', light: 'Claro', amoled: 'AMOLED',
    accentColor: 'Color de Acento', reader: 'Lector', tts: 'Texto a Voz',
    translation: 'Traducción', security: 'Seguridad', network: 'Red',
    advanced: 'Avanzado', about: 'Acerca de', backup: 'Respaldo',
    language: 'Idioma',
  },
  onboarding: {
    welcome: 'Bienvenido a IReader Next',
    step1Title: 'Tu Biblioteca Digital',
    step1Desc: 'Organiza tu colección de manga de cualquier fuente, todo en un solo lugar.',
    step2Title: 'Agrega Fuentes',
    step2Desc: 'Instala plugins para navegar, buscar y leer de tus sitios favoritos.',
    step3Title: 'Empieza a Leer',
    step3Desc: 'Personaliza tu experiencia con temas, TTS, traducciones y más.',
    getStarted: 'Comenzar', next: 'Siguiente', skip: 'Saltar',
  },
}

// Fallback: use English for any missing keys in other languages
const messages: Record<string, Partial<typeof en> | typeof en> = {
  en,
  es: { ...en, ...es } as typeof en,
  // More languages would be added here with their full or partial translations
  fr: en,
  de: en,
  ja: en,
  ko: en,
  zh: en,
  pt: en,
  ru: en,
  ar: en,
  it: en,
  nl: en,
  tr: en,
  vi: en,
  th: en,
  id: en,
  uk: en,
  pl: en,
}

export const t = (key: string, params?: Record<string, string | number>): string => {
  return useI18nStore.getState().t(key, params)
}
