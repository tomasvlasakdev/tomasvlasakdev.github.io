# tomasvlasakdev.github.io

My personal portfolio: plain HTML and CSS, no framework, no runtime dependencies. A small Node script builds the page from `content.json` and pulls each project's last-updated date and star count from the GitHub API.

## Edit the content

Everything you'd want to change lives in **`content.json`**: the intro status line, email, LinkedIn, the featured projects and the stack list.

Any value starting with `TODO:` shows up on the page as a yellow highlight, and the build lists every one that's left:

```bash
npm run check   # lists placeholders, fails if any remain
```

Design (colours, fonts, spacing) is in `src/styles.css`; the page structure is `src/index.html`.

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

## Before you share it

- [ ] Fill in every `TODO:` in `content.json` (`npm run check` shows them)
- [ ] Copy `profile-README.md` into your `tomasvlasakdev/tomasvlasakdev` repo as `README.md`
- [ ] Add the site URL to your GitHub profile (Edit profile → Website)
- [ ] Fix the `calorie_tracker` README: it still says Prisma and SQLite, but the app uses Supabase

## Credits

Headings use [Bricolage Grotesque](https://github.com/ateliertriay/bricolage) (SIL Open Font License, see `src/fonts/OFL.txt`).
