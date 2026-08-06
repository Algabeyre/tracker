import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  return {
    plugins: [react()],
    // If we are building for production (GitHub Pages), use '/tracker/'
    base: mode === 'production' ? '/tracker/' : '/',
    server: {
      host: 'localhost',
      port: 5174,
      strictPort: true,
      hmr: {
        host: 'localhost',
        port: 5174,
        protocol: 'ws',
      },
    },
  }
})

