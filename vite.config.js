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
      // این خط مهمه: به Workbox بگو تصاویر خارجی رو کش نکنه
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,webp,avif}'],
        runtimeCaching: [
          {
            // همه درخواست‌های خارجی (مثل TheMealDB) رو مستقیم برو بگیر
            urlPattern: /^https:\/\/www\.themealdb\.com\/.*/i,
            handler: 'NetworkOnly', // ← هیچ کش نکن، مستقیم از شبکه
          },
        ],
        navigateFallback: '/meal-store/index.html',
        navigateFallbackDenylist: [/^\/api/],
      },
      manifest: {
        name: 'Online Store',
        short_name: 'Store',
        start_url: '/meal-store/',  // ← base رو اضافه کن
        scope: '/meal-store/',       // ← اینم اضافه کن
        display: 'standalone',
        theme_color: '#001529',
        icons: [
          {
            src: '/meal-store/icon-192.png',  // ← base رو اضافه کن
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: '/meal-store/icon-512.png',  // ← base رو اضافه کن
            sizes: '512x512',
            type: 'image/png',
          },
        ],
      },
    }),
    visualizer({ open: false }),
  ],
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        notFound: resolve(__dirname, 'public/404.html'),
      },
      output: {
        manualChunks: {
          react: ['react', 'react-dom'],
          antd: ['antd', '@ant-design/icons'],
        },
      },
    },
    chunkSizeWarningLimit: 1500,
  },
  optimizeDeps: {
    include: ['antd'],
  },
});