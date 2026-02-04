import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  assetsInclude: ['**/*.glb', '**/*.gltf'],
  // Base path for GitHub Pages - must match your repo name exactly (case-sensitive!)
  base: '/Warehouse/',
  build: {
    outDir: 'dist',
    // Increase chunk size warning limit for 3D models
    chunkSizeWarningLimit: 3000,
  },
})
