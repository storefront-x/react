import path from 'node:path'
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react-swc'

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    include: ['.sfx/tests/unit/**/*.spec.ts'],
  },
  resolve: {
    alias: {
      '#ioc': path.resolve(__dirname, './.sfx/ioc'),
      '~': path.resolve(__dirname),
    },
  },
})
