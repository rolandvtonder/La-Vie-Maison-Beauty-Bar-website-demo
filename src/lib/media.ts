export const media = (f: string) => `${import.meta.env.BASE_URL}media/${f}`;

/** A link to one of the site's pages, e.g. page('/services/#lashes'). Works when
 *  the site is served from a sub-folder (GitHub Pages) as well as from `/`. */
export const page = (p: string) => `${import.meta.env.BASE_URL}${p.replace(/^\//, '')}`;
