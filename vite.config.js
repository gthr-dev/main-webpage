import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath } from 'node:url'

const page = (file) => fileURLToPath(new URL(file, import.meta.url))

// Multi-page, not a SPA. Each page is a real HTML file with its own entry
// point, so deep links work on GitHub Pages without a 404.html rewrite shim
// and every page is independently crawlable. See CLAUDE.md.
export default defineConfig({
  // Relative so the build works from a custom domain root and from a
  // <user>.github.io/main-webpage/ preview without rebuilding.
  base: './',
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        home: page('./index.html'),
        menu: page('./menu.html'),
        contact: page('./contact.html'),
        events: page('./events.html'),
      },
    },
  },
})
