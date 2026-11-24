import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import {resolve} from 'node:path';
import {defineConfig} from 'vite';

// One HTML entry per page, so every section of the site has its own real URL
// (/services/, /gallery/ …) and works on any static host with no router.
const page = (p: string) => resolve(__dirname, p, 'index.html');

export default defineConfig({
  // GitHub Pages serves the demo from /<repo>/; the deploy workflow sets BASE_PATH.
  base: process.env.BASE_PATH ?? '/',
  plugins: [react(), tailwindcss()],
  build: {
    target: 'es2020',
    rollupOptions: {
      input: {
        home: resolve(__dirname, 'index.html'),
        services: page('services'),
        gallery: page('gallery'),
        about: page('about'),
        reviews: page('reviews'),
        contact: page('contact'),
      },
    },
  },
});
