# tomasvlasakdev.github.io

My personal portfolio: plain HTML and CSS, no framework, no runtime dependencies. A small Node script builds the page from `content.json` and pulls each project's last-updated date and star count from the GitHub API.

## Edit the content

- **Text** lives in `i18n/<language>.json`, one file per language with the same keys. English (`en.json`) is the fallback for any missing key.
- **Everything else** (links, projects, the tech stack, the list of languages) lives in `content.json`. Icons are names from `data/icons.json` (brand logos from [Simple Icons](https://simpleicons.org), CC0) or one of `mail`, `terminal`, `pin`, `clock`, `book`.
- Design is in `src/styles.css`, page structure in `src/index.html`. The mascot is `src/beaver.svg`, also used as the favicon. On the page it is inlined so CSS can animate it (peek in, blink, ear twitch, gnaw on hover/tap); the build splits it into parts by colour, so keep the same palette if you redraw it.

## Languages

English is served at `/`, every other language at `/<code>/` (for example `/cs/`). On the home page, a small script looks at the visitor's browser languages and forwards them to the first one the site has; if English comes first or nothing matches, they stay on English. Picking a language in the menu is remembered and always wins.

To add a language: copy `i18n/en.json` to `i18n/<code>.json`, translate it, and add `{ "code": "<code>", "name": "<native name>" }` to `languages` in `content.json`.

## Run it locally

Needs Node 18 or newer. There's nothing to install.

```bash
npm start       # builds into dist/ and serves it at http://localhost:8080
```

`npm run build:offline` builds without calling GitHub, using the saved data in `data/github.json`.

## Deploy to GitHub Pages

One-time setup:

1. On GitHub, create a **public** repo named exactly **`tomasvlasakdev.github.io`**.
2. Push this folder to it:
   ```bash
   git init
   git add .
   git commit -m "First version of portfolio site"
   git branch -M main
   git remote add origin https://github.com/tomasvlasakdev/tomasvlasakdev.github.io.git
   git push -u origin main
   ```
3. In the repo, go to **Settings → Pages** and set **Source** to **GitHub Actions**.
4. Open the **Actions** tab. The "Deploy to GitHub Pages" run should go green within a minute or two (if it ran before step 3 and failed, click **Re-run all jobs**).
5. Visit **https://tomasvlasakdev.github.io**.

After that, every push to `main` redeploys automatically, and the site also rebuilds every Monday so project dates stay current.

## Credits

Headings use [Bricolage Grotesque](https://github.com/ateliertriay/bricolage) (SIL Open Font License, see `src/fonts/OFL.txt`).
