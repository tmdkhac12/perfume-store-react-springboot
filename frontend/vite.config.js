import { resolve } from 'node:path';
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: resolve(__dirname, 'index.html')
    }
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './vitest.setup.js'
  },
  server: {
    proxy: {
      '/oauth2': {
        target: 'http://localhost:8080', // Thay bằng URL backend của bạn
        changeOrigin: true
      }
    }
  }
});
