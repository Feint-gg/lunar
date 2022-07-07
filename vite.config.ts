import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import * as path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    strictPort: true,
  },
  envPrefix: ["VITE_", "TAURI_"],
  clearScreen: true,
  build: {
    //target: ['es2021', 'chrome97', 'safari13'],
    //minify: !process.env.TAURI_DEBUG ? "esbuild" : false,
    //sourcemap: !process.env.TAURI_DEBUG ? "inline" : false,
  }
})
