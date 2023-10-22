import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': '/src/Main',
      '@ReusableComponents': '/src/Main/ReusableComponents',
      '@ContextProviders': '/src/Main/ContextProviders',
    },
  },
})
