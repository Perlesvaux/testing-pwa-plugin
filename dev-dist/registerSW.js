if('serviceWorker' in navigator) navigator.serviceWorker.register('/testing-pwa-plugin/dev-sw.js?dev-sw', { scope: '/testing-pwa-plugin/', type: 'classic' })