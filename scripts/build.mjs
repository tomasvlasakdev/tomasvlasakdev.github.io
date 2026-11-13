// Builds the site into dist/: English at /, every other language at /<code>/.
//   node scripts/build.mjs           build (uses live GitHub data when it can reach the API)
//   node scripts/build.mjs --offline build from data/github.json only
import { readFile, writeFile, mkdir, rm, cp } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const src = (p) => path.join(root, "src", p);
const dist = (p = "") => path.join(root, "dist", p);
const args = new Set(process.argv.slice(2));

const content = JSON.parse(await readFile(path.join(root, "content.json"), "utf8"));
const brand = JSON.parse(await readFile(path.join(root, "data", "icons.json"), "utf8"));
const snapshotPath = path.join(root, "data", "github.json");
const snapshot = JSON.parse(await readFile(snapshotPath, "utf8"));
const langs = content.languages;
const DEFAULT = langs[0].code;
const strings = {};
for (const l of langs) strings[l.code] = JSON.parse(await readFile(path.join(root, "i18n", `${l.code}.json`), "utf8"));

// ---------- GitHub data ----------
async function fetchRepo(name) {
  const headers = { Accept: "application/vnd.github+json", "User-Agent": "portfolio-build" };
  if (process.env.GITHUB_TOKEN) headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  const res = await fetch(`https://api.github.com/repos/${content.githubUser}/${name}`, {
    headers,
    signal: AbortSignal.timeout(8000),
  });
  if (!res.ok) throw new Error(`${name}: HTTP ${res.status}`);
  const d = await res.json();
  return { pushed_at: d.pushed_at, stargazers_count: d.stargazers_count, language: d.language };
}

const repos = content.featured.filter((p) => p.repo).map((p) => p.repo);
let live = false;
if (!args.has("--offline")) {
  try {
    const results = await Promise.all(repos.map(fetchRepo));
    repos.forEach((r, i) => (snapshot.repos[r] = results[i]));
    snapshot.fetchedAt = new Date().toISOString();
    await writeFile(snapshotPath, JSON.stringify(snapshot, null, 2) + "\n");
    live = true;
  } catch (err) {
    console.warn(`! GitHub API not reachable (${err.message}). Using data/github.json.`);
  }
}

// ---------- Helpers ----------
const esc = (s) =>
  String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);
const missing = new Set();
const tr = (lang, key) => {
  const v = strings[lang][key] ?? strings[DEFAULT][key];
  if (v === undefined) throw new Error(`Missing translation key "${key}"`);
  if (strings[lang][key] === undefined) missing.add(`${lang}: ${key}`);
  return v;
};
const pageUrl = (code) => content.site.url + (code === DEFAULT ? "" : `${code}/`);
const pagePath = (code) => (code === DEFAULT ? "/" : `/${code}/`);
const ogLocale = { en: "en_US", cs: "cs_CZ", sk: "sk_SK", de: "de_DE", pl: "pl_PL", fr: "fr_FR", es: "es_ES" };

const line = {
  terminal: '<path d="M4 17l6-5-6-5"/><path d="M12 19h8"/>',
  pin: '<path d="M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21Z"/><circle cx="12" cy="9.5" r="2.5"/>',
  clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  book: '<path d="M4 19V5a2 2 0 0 1 2-2h14v15H6a2 2 0 0 0-2 2Z"/><path d="M4 19a2 2 0 0 0 2 2h14v-3"/>',
  mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3.5 6.5 8.5 6.5 8.5-6.5"/>',
};
const icon = (name) => {
  if (line[name])
    return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${line[name]}</svg>`;
  if (brand[name]) return `<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="${brand[name].path}"/></svg>`;
  return "";
};
const chip = (name) =>
  brand[name] ? `<li class="chip">${icon(name)}${esc(brand[name].title)}</li>` : `<li class="chip">${esc(name)}</li>`;

// Visitors landing on the English home page are sent to their browser's language,
// unless they picked a language themselves (stored by the language menu).
const others = langs.map((l) => l.code).filter((c) => c !== DEFAULT);
const redirectScript = `<script>
  (function () {
    var S = ${JSON.stringify(others)}, pick = null;
    try { pick = localStorage.getItem("lang"); } catch (e) { return; }
    if (pick === "${DEFAULT}") return;
    if (!pick) {
      var L = navigator.languages || [navigator.language];
      for (var i = 0; i < L.length; i++) {
        var c = String(L[i] || "").toLowerCase().split("-")[0];
        if (c === "${DEFAULT}") return;
        if (S.indexOf(c) > -1) { pick = c; break; }
      }
    }
    if (pick && S.indexOf(pick) > -1) location.replace("/" + pick + "/" + location.hash);
  })();
</script>`;

// ---------- Shared data ----------
const projects = content.featured.map((p) => {
  const gh = p.repo ? snapshot.repos[p.repo] || {} : {};
  return { ...p, date: p.repo ? (gh.pushed_at ? String(gh.pushed_at).slice(0, 7) : null) : p.date, stars: gh.stargazers_count ?? null };
});
projects.sort((a, b) => (b.date || "0000").localeCompare(a.date || "0000"));

const css = (await readFile(src("styles.css"), "utf8"))
  .replace(/\/\*[\s\S]*?\*\//g, "")
  .replace(/\s+/g, " ")
  .replace(/\s*([{};,>])\s*/g, "$1")
  .replace(/;}/g, "}")
  .trim();
const template = await readFile(src("index.html"), "utf8");

// The mascot is inlined (not an <img>) so CSS can animate its parts: the eyes blink,
// an ear twitches, the teeth gnaw. src/beaver.svg stays the single source of the art.
const beaverSvg = await readFile(src("beaver.svg"), "utf8");
const FUR = "#A0602F", EYE = "#2B1A12", EAR = "#74401C", TEETH = ["#FFFDF7", "#DDD2BC"];
const parts = { ear: [], teeth: [], body: [], eyes: [] };
let bg = "";
for (const m of beaverSvg.matchAll(/<rect\b[^>]*\/>/g)) {
  const r = m[0];
  const at = (a) => (r.match(new RegExp(`\\b${a}="([^"]*)"`)) || [])[1];
  const x = Number(at("x") ?? 0), y = Number(at("y") ?? 0), fill = at("fill");
  if (at("width") === "20") { bg = r; continue; }
  if (TEETH.includes(fill)) parts.teeth.push(r);
  else if (fill === EYE && (y === 8 || y === 9)) {
    parts.eyes.push(r);
    parts.body.push(r.replace(EYE, FUR)); // fur under the eye, seen when it closes
  } else {
    if (fill === EAR && y === 4 && x >= 10) parts.ear.push(r); // copy that pops up to twitch
    parts.body.push(r);
  }
}
if (!bg || Object.values(parts).some((p) => !p.length)) throw new Error("src/beaver.svg no longer matches the avatar animation");
const chips = [[8, "#C98F5A"], [11, "#E0B07E"], [9, "#C98F5A"], [10, "#E0B07E"]]
  .map(([x, c], i) => `<rect class="b-chip" style="--d:${i * 0.25}s;--dx:${i % 2 ? 2 : -2}px" x="${x}" y="16" width="1" height="1" fill="${c}"/>`)
  .join("");
const avatar = (alt) =>
  `<svg class="avatar reveal" style="--i:1" viewBox="0 0 20 20" width="144" height="144" shape-rendering="crispEdges" role="img" aria-label="${esc(alt)}">` +
  `${bg}<g class="b-all"><g class="b-ear">${parts.ear.join("")}</g><g class="b-teeth">${parts.teeth.join("")}</g>` +
  `${parts.body.join("")}<g class="b-eyes">${parts.eyes.join("")}</g>${chips}</g></svg>`;

// ---------- Render one language ----------
function render(lang) {
  const t = (k) => tr(lang, k);
  const intl = lang === "en" ? "en-GB" : lang;
  const site = content.site;

  const info = content.info
    .map((i) =>
      i.key === "CLOCK"
        ? `      <li>${icon(i.icon)}<span data-clock="${esc(site.timeZone)}" data-template="${esc(t("clock"))}">${esc(t("clock.fallback"))}</span></li>`
        : `      <li>${icon(i.icon)}<span>${esc(t(i.key))}</span></li>`,
    )
    .join("\n");

  const links = content.links
    .map((l) => {
      const label = l.labelKey ? t(l.labelKey) : l.label;
      const handle = l.handleKey ? t(l.handleKey) : l.handle;
      return `      <li><a href="${esc(l.href)}">${icon(l.icon)}<strong>${esc(label)}</strong><span>${esc(handle)}</span></a></li>`;
    })
    .join("\n");

  const monthFmt = new Intl.DateTimeFormat(intl, { month: "long", year: "numeric", timeZone: "UTC" });
  const projectHtml = projects
    .map((p) => {
      const date = p.date ? `<time datetime="${esc(p.date)}">${esc(monthFmt.format(new Date(p.date + "-01T00:00:00Z")))}</time>` : "";
      const stars = p.stars > 0 ? `<span class="stars">${p.stars} ★</span>` : "";
      return `        <li class="project row">
          <p class="when">${date ? `<span class="visually-hidden">${esc(t("ui.lastUpdated"))} </span>${date}` : ""}${stars}</p>
          <div class="main">
            <h3><a href="${esc(p.href)}">${esc(p.title)}</a></h3>
            <p class="summary">${esc(t(`p.${p.id}.summary`))}</p>
            <p class="why">${esc(t(`p.${p.id}.why`))}</p>
            <ul class="chips" aria-label="${esc(t("ui.builtWith"))}">${(p.stack || []).map(chip).join("")}</ul>
            <p class="plinks"><a href="${esc(p.href)}">${esc(t("ui.sourceCode"))}<span class="visually-hidden">: ${esc(p.title)}</span></a></p>
          </div>
        </li>`;
    })
    .join("\n");

  const stack = content.stack
    .map(
      (g) => `        <div class="row">
          <dt>${esc(t(g.key))}</dt>
          <dd class="main"><ul class="chips">${g.items.map(chip).join("")}</ul></dd>
        </div>`,
    )
    .join("\n");

  const menu = langs
    .map(
      (l) =>
        `        <li><a href="${pagePath(l.code)}" hreflang="${l.code}" lang="${l.code}" data-lang="${l.code}"${l.code === lang ? ' aria-current="page"' : ""}>${esc(l.name)}</a></li>`,
    )
    .join("\n");

  const alternates = [
    ...langs.map((l) => `<link rel="alternate" hreflang="${l.code}" href="${pageUrl(l.code)}">`),
    `<link rel="alternate" hreflang="x-default" href="${pageUrl(DEFAULT)}">`,
  ].join("\n");

  const updated = snapshot.fetchedAt
    ? t("ui.datesRefreshed").replace(
        "{date}",
        new Date(snapshot.fetchedAt).toLocaleDateString(intl, { day: "numeric", month: "long", year: "numeric" }),
      )
    : t("ui.dates");

  const fill = {
    LANG: lang,
    LANG_UPPER: lang.toUpperCase(),
    CSS: css,
    SITE_URL: esc(site.url),
    PAGE_URL: esc(pageUrl(lang)),
    OG_LOCALE: ogLocale[lang] || lang,
    ALTERNATES: alternates,
    REDIRECT: lang === DEFAULT ? redirectScript : "",
    AVATAR: avatar(t("ui.avatarAlt")),
    EMAIL: esc(site.email),
    INFO: info,
    LINKS: links,
    LANGMENU: menu,
    PROJECTS: projectHtml,
    STACK: stack,
    UPDATED: esc(updated),
    YEAR: String(new Date().getFullYear()),
  };
  return template.replace(/\{\{(t:)?([\w.]+)\}\}/g, (_, isT, k) => {
    if (isT) return esc(t(k));
    if (!(k in fill)) throw new Error(`Unknown template field {{${k}}}`);
    return fill[k];
  });
}

// ---------- Write dist ----------
await rm(dist(), { recursive: true, force: true });
await mkdir(dist("fonts"), { recursive: true });
for (const l of langs) {
  const dir = l.code === DEFAULT ? dist() : dist(l.code);
  await mkdir(dir, { recursive: true });
  await writeFile(path.join(dir, "index.html"), render(l.code));
}
await cp(src("fonts"), dist("fonts"), { recursive: true });
for (const f of ["beaver.svg", "beaver.png"]) await cp(src(f), dist(f));
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${langs
  .map(
    (l) => `  <url><loc>${pageUrl(l.code)}</loc>
${langs.map((a) => `    <xhtml:link rel="alternate" hreflang="${a.code}" href="${pageUrl(a.code)}"/>`).join("\n")}
  </url>`,
  )
  .join("\n")}
</urlset>
`;
await writeFile(dist("sitemap.xml"), sitemap);
await writeFile(dist("robots.txt"), `User-agent: *\nAllow: /\nSitemap: ${content.site.url}sitemap.xml\n`);
await writeFile(dist(".nojekyll"), "");

console.log(`✓ Built dist/ in ${langs.length} languages (${live ? "live GitHub data" : "snapshot data"})`);
if (missing.size) console.log(`  Untranslated, fell back to English: ${[...missing].join(", ")}`);
