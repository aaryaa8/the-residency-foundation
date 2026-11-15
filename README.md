# The Residency Foundation website

This site is a draft for internal review and is awaiting approval for release.

A static site built with [Astro](https://astro.build) and published on GitHub Pages.

## Where things are

- `src/content/site.ts` holds every word on the site.
- `src/content/figures.json` holds every number. Change a value once and it updates everywhere; set `show` to `false` to hide it.
- `src/base/` holds what all pages share: fonts and colors (`tokens.css`), the page head, icons and link helpers.
- `src/directions/` and `src/pages/a`, `b`, `c` hold three design directions under review. One will be kept.
- `public/img/placeholder/` holds placeholder statue images from The Residency's brand kit. The Foundation's own imagery replaces them.

## Run it

```bash
npm install
```

```bash
npm run dev
```

## Publish

Every push runs `.github/workflows/deploy.yml`, which builds the site and publishes it to GitHub Pages. Pages must be switched on once in the repository settings: Settings, Pages, Source: GitHub Actions.
