import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Hostname preview cloud diambil dari environment saat proses dev dijalankan,
// supaya tidak ada hostname sementara yang tertulis di dalam repo.
const previewHost = process.env.PREVIEW_HOST

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    strictPort: true,
    host: '0.0.0.0',
    allowedHosts: previewHost ? [previewHost] : [],
  },
  preview: {
    port: 3000,
    host: '0.0.0.0',
  },
})
