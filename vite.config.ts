import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// base relativo: o build funciona tanto na raiz de BeiruthDEV.github.io quanto em subpastas
export default defineConfig({
  base: './',
  plugins: [react(), tailwindcss()],
  server: { port: 5173 },
  // o pacote do fundo 3D (three.js) é grande, mas carrega à parte, depois do conteúdo
  build: { chunkSizeWarningLimit: 1000 },
})
