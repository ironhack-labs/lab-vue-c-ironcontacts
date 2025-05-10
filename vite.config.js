import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

// https://vitejs.dev/config/

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      // cada vez que escribas "@/…" Vite lo buscará en "/<raíz-del-proyecto>/src/…"
      '@': path.resolve(__dirname, 'src')
    }
  }
})