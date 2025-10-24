/**
 * Theme Hooks
 *
 * Custom hooks for accessing and managing theme state from the theme store.
 * These hooks provide a clean interface for components to interact with theme functionality.
 */

import { useThemeStore } from '@/stores/themeStore'

/**
 * Hook to access current theme state
 * @returns Object containing theme and actualTheme
 */
export const useTheme = () => {
  const theme = useThemeStore((state) => state.theme)
  const actualTheme = useThemeStore((state) => state.actualTheme)
  return { theme, actualTheme }
}

/**
 * Hook to access theme setter and initialization functions
 * @returns Object with setTheme and initializeTheme functions
 */
export const useSetTheme = () => {
  const setTheme = useThemeStore((state) => state.setTheme)
  const initializeTheme = useThemeStore((state) => state.initializeTheme)
  return { setTheme, initializeTheme }
}

/**
 * Hook to access theme initialization function
 * @returns initializeTheme function
 */
export const useInitializeTheme = () => useThemeStore((state) => state.initializeTheme)
