import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@Main': '/src/Main',
      '@ReusableComponents': '/src/ReusableComponents',
      '@ContextProviders': '/src/ContextProviders',
      '@theme': '/src/theme',
      '@Utils': '/src/Utils',
    },
  },
})
