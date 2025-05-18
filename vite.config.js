import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  base: '/meal-store/',
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      workbox: {
        globPatterns: ['**/*.{js,css,html,png,svg,json}'],
        navigateFallback: '/meal-store/index.html'
      },
      manifest: {
        name: 'Online Store',
        short_name: 'Store',
        start_url: '/meal-store/',
        display: 'standalone',
        theme_color: '#001529',
        background_color: '#ffffff',
        icons: [
          {
            src: '/meal-store/icon-192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: '/meal-store/icon-512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }
    })
  ],
  build: {
    outDir: 'dist',
    rollupOptions: {
      output: {
        manualChunks: {
          react: ['react', 'react-dom', 'react-router-dom'],
          antd: ['antd', '@ant-design/icons'],
          vendor: ['lodash', 'axios']
        },
        chunkFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash][extname]'
      }
    },
    chunkSizeWarningLimit: 1600
  }
});