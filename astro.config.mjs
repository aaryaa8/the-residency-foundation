import { defineConfig } from 'astro/config';

// Where the site is published is decided by GitHub Pages, not typed here.
// The deploy workflow asks GitHub Pages for the address and passes it in:
//   with no custom domain:  https://aaryaa8.github.io  +  /the-residency-foundation
//   with the custom domain: https://theresidencyfoundation.org  +  /
// So attaching or removing the domain in the repository's Pages settings needs
// no change to this file, only a new deploy. A build on a laptop, with neither
// value set, keeps the sub-path so local previews match the links in the docs.
const origin = process.env.SITE_ORIGIN;
const site = origin || 'https://aaryaa8.github.io';
const base = origin ? process.env.SITE_BASE || '/' : '/the-residency-foundation';

export default defineConfig({
  site,
  base,
  trailingSlash: 'always',
  outDir: process.env.OUT_DIR || './dist',
  cacheDir: process.env.ASTRO_CACHE_DIR || './node_modules/.astro',
  vite: { cacheDir: process.env.VITE_CACHE_DIR || './node_modules/.vite' },
});
