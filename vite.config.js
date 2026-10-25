import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 5173,
    proxy: {
      '/api': {
        // target: 'http://3.25.141.103:5000',
                target: 'http://localhost:5000',

        changeOrigin: true, 
        secure: false,
      },
    },
  },
});

