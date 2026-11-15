// Link helpers. GitHub Pages serves the site from a sub-path, so every internal
// link and image path must go through these helpers.
const base = import.meta.env.BASE_URL.replace(/\/$/, '');

/** Path to a file in /public, e.g. asset('img/logo/foundation-ink.png') */
export const asset = (path: string) => `${base}/${path.replace(/^\//, '')}`;

/** Path to a page inside a design direction, e.g. page('a', 'donate') -> /…/a/donate/ ; page('a') -> /…/a/ */
export const page = (dir: string, slug = '') =>
  `${base}/${dir}/${slug ? slug.replace(/^\/|\/$/g, '') + '/' : ''}`;
