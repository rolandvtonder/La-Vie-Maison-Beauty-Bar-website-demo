# La Vie Maison Beauty Bar — website demo

Six-page site for La Vie Maison Beauty Bar, Sunningdale, Cape Town:
Home, Services & prices, Gallery, About & team, Reviews, Book & visit.
Every booking button links to the salon's Fresha page.

Built with Vite, React, TypeScript, Tailwind CSS v4 and Lenis.

## Run it locally

```
npm install
npm run dev
```

## Update copy or prices

All text, services, prices, hours and reviews live in `src/content.ts`.
Photos are in `public/media/` (gallery photos in `public/media/gallery/`, listed in `src/gallery.ts`).

## Publishing

Pushing to `main` builds the site and publishes it with GitHub Pages
(`.github/workflows/deploy.yml`). In the repository's Settings → Pages,
set **Source** to **GitHub Actions** once.
