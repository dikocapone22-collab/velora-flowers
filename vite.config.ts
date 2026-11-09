import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // Для GitHub Pages в подпапке base передаётся флагом: vite build --base=/velora-flowers/
  base: '/',
  build: {
    // Поддержка старых и бюджетных устройств (Android 7+, iOS 13+, старые версии Chrome/Edge)
    target: ['es2019', 'chrome70', 'safari13', 'firefox78', 'edge79'],
    cssTarget: ['chrome70', 'safari13'],
    assetsInlineLimit: 2048,
    cssCodeSplit: true,
    sourcemap: false,
    reportCompressedSize: true,
  },
})
