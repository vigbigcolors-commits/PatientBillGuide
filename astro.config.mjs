// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://patientbillguide.com',
  trailingSlash: 'always',
  compressHTML: true,
  build: {
    inlineStylesheets: 'always',
  },
  integrations: [
    sitemap({
      filter: (page) => !page.includes('/404') && !page.includes('/medicare-lookup'),
    }),
  ],
  server: {
    port: 4321,
    strictPort: false,
    open: '/',
  },
  vite: {
    server: {
      watch: {
        // Reliable reload on Windows when editing components + client scripts
        usePolling: true,
        interval: 300,
      },
    },
  },
});
