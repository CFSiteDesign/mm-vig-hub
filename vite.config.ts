import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// base './' so the built site works from any folder or sub-path
// (e.g. madmonkeyhostels.com/vighub via Deploy Hub) without a rebuild.
export default defineConfig({
  base: './',
  plugins: [react()],
  server: { port: 5203, strictPort: true },
  preview: { port: 5203, strictPort: true },
})
