import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vitejs.dev/config/
export default defineConfig({
  base: '',
  plugins: [react(), tailwindcss()],
  server: {
    watch: {
      usePolling: false,
      interval: 1000,
      ignored: [
        '**/node_modules/**',
        '**/backend/**',
        '**/dist/**',
        '**/.git/**',
        '**/test/**',
        '**/*.test.*',
        '**/*.spec.*',
        '**/coverage/**',
        '**/.nyc_output/**',
        '**/logs/**',
        '**/*.log'
      ]
    },
    fs: {
      allow: ['..']
    }
  },
  optimizeDeps: {
    include: ['react', 'react-dom']
  }
})
