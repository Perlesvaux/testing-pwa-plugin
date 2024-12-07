import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
  base:'/pwa-react-vite-test/' ,
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['vite.svg'], // Add your static assets
      devOptions:{enabled:true},
      manifest: {
        name: 'testing',
        short_name: 'ReactPWA',
        description: 'A simple React PWA built with Vite',
        theme_color: '#ffffff'
      },
      workbox: {
        runtimeCaching:[
          { urlPattern:/assets/, handler:'NetworkFirst' },
        ]
        //globPatterns: ['**/*.{js,css,html,png,jpg,svg}'], // Automatically cache these file types
      },

    })




  ],

})
