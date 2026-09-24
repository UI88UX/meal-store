import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';
import { resolve } from 'path';
import { visualizer } from 'rollup-plugin-visualizer';

export default defineConfig({
  base: '/meal-store/',
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'Online Store',
        short_name: 'Store',
        start_url: '/meal-store/',
        display: 'standalone',
        theme_color: '#001529',
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
    }),
    visualizer({ open: false })  // ← open: false بهتره، وگرنه هر بیلد یه تب مرورگر باز می‌کنه
  ],
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        notFound: resolve(__dirname, 'public/404.html')
      },
      output: {
        manualChunks: {
          react: ['react', 'react-dom'],
          antd: ['antd', '@ant-design/icons']
        }
      }
    },
    chunkSizeWarningLimit: 1500
  },
  optimizeDeps: {
    include: ['antd'],
  }
});