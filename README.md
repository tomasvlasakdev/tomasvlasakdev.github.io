# tomasvlasakdev.github.io

Personal site of Tomáš Vlasák: websites for Catholic parishes first, portfolio second. Czech only for now.

Static Next.js (`output: 'export'`), TypeScript, plain CSS. No backend, no cookies, no third-party scripts, self-hosted fonts.

## Run it

Needs Node 20 or newer.

```bash
npm install
npm run dev          # http://localhost:3000
npm run build        # static export into out/
npm run serve        # serve out/ at http://localhost:8080
npm run check        # type-check, build, link check, axe
```

## Where things are

| What | Where |
|---|---|
| Settings: e-mail, price switch, demo URL, IČO, CV PDF path | `site.config.ts` |
| All copy, one file per page | `content/cs/*.ts` |
| Price numbers (and only there) | `content/cs/farnosti-prices.ts` |
| Czech typography (non-breaking spaces, quotes, dashes, dates) | `lib/typography.ts`, applied by `typeset()` in every content file |
| `/farnosti` components and styles (self-contained) | `features/farnosti/` |
| Shared components | `components/` |
| Design tokens and global styles | `app/globals.css` |
| Fonts (Zilla Slab, Source Sans 3, subset to Latin + Czech) | `assets/fonts/` |
| Source images → AVIF/WebP | `assets/images/` → `npm run images` → `public/images/` |

Components read text only from `content/cs/`. An English version can go in `content/en/` later.

### Price switch

In `site.config.ts`:

```ts
showPrices: false,     // false → "Cena" block; true → "Ceník" with the price tables
foundingOffer: false,  // only has an effect when showPrices is true
```

### CV PDF

Put the developer CV at `public/cv/Tomas-Vlasak-CV-dev-cs.pdf`. The download button on `/cv` appears only if that file exists at build time.

### Things still to fill in

Search the code for `TODO(owner)`.

## Domain

The site lives at https://tomasvlasak.dev (custom domain on GitHub Pages; `public/CNAME`). GitHub redirects tomasvlasakdev.github.io there, and every canonical, `og:url` and sitemap entry points at tomasvlasak.dev.

The address comes from environment variables, set in `.github/workflows/deploy.yml`:

- `NEXT_PUBLIC_SITE_URL` (default `https://tomasvlasak.dev`)
- `NEXT_PUBLIC_BASE_PATH` (default empty)

## SEO

- Titles, descriptions and Open Graph: `meta` in each `content/cs/*.ts`, built by `pageMetadata()` in `lib/seo.ts`. OG images: `opengraph-image.tsx` next to each page.
- Structured data (JSON-LD): `lib/structured-data.ts`. `postbuild` puts it into the `<head>` of the page, so it is missing in `npm run dev`. More profiles for `sameAs`: `profiles` in `site.config.ts`.
- Sitemap with `lastmod` from git: `app/sitemap.ts`. New public page → add it there and to `scripts/pages.mjs`.

## Deploy

Every push runs type-check, build, link check and axe (`.github/workflows/deploy.yml`). A push to `main` that passes is published to GitHub Pages. Repo settings → Pages → Source must be **GitHub Actions**.

Old URLs from the previous multi-language site (`/cs/`, `/de/cv/`, …) redirect to the new pages.

## Credits

Fonts: [Zilla Slab](https://github.com/mozilla/zilla-slab) and [Source Sans 3](https://github.com/adobe-fonts/source-sans), both SIL Open Font License (see `assets/fonts/`).
