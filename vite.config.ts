// Vitest config reference: https://vitest.dev/config/file.html#managing-vitest-config-file
/// <reference types="vitest/config" />

import react from '@vitejs/plugin-react'
import path from 'path'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 3000,
    open: true,
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
    chunkSizeWarningLimit: 600,
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          // React core libraries
          if (id.includes('node_modules/react') || id.includes('node_modules/react-dom')) {
            return 'vendor-react'
          }

          // Radix UI components
          if (id.includes('node_modules/@radix-ui')) {
            return 'vendor-ui'
          }

          // Schema definitions (lazy load)
          if (id.includes('src/api/schemas/') && !id.includes('index.ts')) {
            return 'schemas'
          }

          // Zustand and state management
          if (id.includes('node_modules/zustand') || id.includes('node_modules/immer')) {
            return 'vendor-state'
          }

          // Utilities (lucide-react icons, nanoid, etc.)
          if (id.includes('node_modules/lucide-react') || id.includes('node_modules/nanoid')) {
            return 'vendor-utils'
          }

          // Other node_modules
          if (id.includes('node_modules')) {
            return 'vendor-other'
          }
        },
      },
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/test/setup.ts',
    coverage: {
      all: true,
      provider: 'istanbul',
      reporter: ['text', 'json', 'html'],
      include: ['src/**/*.tsx'],
      exclude: [],
    },
  },
})
