import { defineConfig } from 'astro/config';

// Published on GitHub Pages at https://aaryaa8.github.io/the-residency-foundation/
// When a custom domain is attached, set `site` to it and `base` to '/'.
export default defineConfig({
  site: 'https://aaryaa8.github.io',
  base: '/the-residency-foundation',
  trailingSlash: 'always',
  outDir: process.env.OUT_DIR || './dist',
  cacheDir: process.env.ASTRO_CACHE_DIR || './node_modules/.astro',
  vite: { cacheDir: process.env.VITE_CACHE_DIR || './node_modules/.vite' },
});
