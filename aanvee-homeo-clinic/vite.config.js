import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

let cloudflarePlugin = null
try {
  const mod = await import('@cloudflare/vite-plugin')
  cloudflarePlugin = mod.cloudflare()
} catch {
  // @cloudflare/vite-plugin not available locally — skip it
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), cloudflarePlugin].filter(Boolean),
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './src/test/setup.js',
  },
})
