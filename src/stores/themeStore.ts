import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

export type Theme = 'light' | 'dark' | 'system'

interface ThemeStore {
  theme: Theme
  actualTheme: 'light' | 'dark'
  setTheme: (theme: Theme) => void
  initializeTheme: () => () => void
}

// Helper function to update DOM theme
const updateDOMTheme = (theme: Theme): 'light' | 'dark' => {
  const root = window.document.documentElement
  root.classList.remove('light', 'dark')

  if (theme === 'system') {
    const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
    root.classList.add(systemTheme)
    return systemTheme
  } else {
    root.classList.add(theme)
    return theme
  }
}

export const useThemeStore = create<ThemeStore>()(
  persist(
    (set, get) => ({
      theme: 'system' as Theme,
      actualTheme: 'light' as 'light' | 'dark',

      setTheme: (theme: Theme) => {
        const actualTheme = updateDOMTheme(theme)
        set({ theme, actualTheme })
      },

      initializeTheme: () => {
        const currentTheme = get().theme
        const actualTheme = updateDOMTheme(currentTheme)
        set({ actualTheme })

        // Set up system theme listener
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
        const handleChange = () => {
          const theme = get().theme
          if (theme === 'system') {
            const systemTheme = mediaQuery.matches ? 'dark' : 'light'
            const root = window.document.documentElement
            root.classList.remove('light', 'dark')
            root.classList.add(systemTheme)
            set({ actualTheme: systemTheme })
          }
        }

        mediaQuery.addEventListener('change', handleChange)

        // Return cleanup function
        return () => mediaQuery.removeEventListener('change', handleChange)
      },
    }),
    {
      name: 'schema-generator-theme',
      storage: createJSONStorage(() => localStorage),
    },
  ),
)
