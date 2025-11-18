import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

// Verificar se está rodando no Vercel ou em produção
const isVercel = process.env.VERCEL === '1'
const isProduction = process.env.NODE_ENV === 'production'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 8080,
    host: true,
  },
  build: {
    // No Vercel, sempre limpar a pasta dist
    // Localmente, preservar executáveis
    emptyOutDir: isVercel || isProduction,
  },
  base: '/',
})

