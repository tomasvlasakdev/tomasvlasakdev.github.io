// Builds the site into dist/: English at /, every other language at /<code>/.
// The CV page is at /cv/ (and /<code>/cv/), rendered from cv.json.
//   node scripts/build.mjs           build (uses live GitHub data when it can reach the API)
//   node scripts/build.mjs --offline build from data/github.json only
import { readFile, writeFile, mkdir, rm, cp, access } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const src = (p) => path.join(root, "src", p);
const dist = (p = "") => path.join(root, "dist", p);
const args = new Set(process.argv.slice(2));

const content = JSON.parse(await readFile(path.join(root, "content.json"), "utf8"));
const cv = JSON.parse(await readFile(path.join(root, "cv.json"), "utf8"));
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
// page is "" for the home page or "cv/" for the CV.
const pageUrl = (code, page = "") => content.site.url + (code === DEFAULT ? "" : `${code}/`) + page;
const pagePath = (code, page = "") => (code === DEFAULT ? "/" : `/${code}/`) + page;
const ogLocale = { en: "en_US", cs: "cs_CZ", sk: "sk_SK", de: "de_DE", pl: "pl_PL", fr: "fr_FR", es: "es_ES" };

const line = {
  terminal: '<path d="M4 17l6-5-6-5"/><path d="M12 19h8"/>',
  pin: '<path d="M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21Z"/><circle cx="12" cy="9.5" r="2.5"/>',
  clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  book: '<path d="M4 19V5a2 2 0 0 1 2-2h14v15H6a2 2 0 0 0-2 2Z"/><path d="M4 19a2 2 0 0 0 2 2h14v-3"/>',
  mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3.5 6.5 8.5 6.5 8.5-6.5"/>',
  link: '<path d="M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1"/><path d="M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1"/>',
  download: '<path d="M12 4v11"/><path d="m7 10 5 5 5-5"/><path d="M5 20h14"/>',
};
const icon = (name) => {
  if (line[name])
    return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${line[name]}</svg>`;
  if (brand[name]) return `<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="${brand[name].path}"/></svg>`;
  return "";
};
const chip = (name) =>
  brand[name] ? `<li class="chip">${icon(name)}${esc(brand[name].title)}</li>` : `<li class="chip">${esc(name)}</li>`;

// Visitors landing on an English page are sent to the same page in their browser's language,
// unless they picked a language themselves (stored by the language menu).
const others = langs.map((l) => l.code).filter((c) => c !== DEFAULT);
const redirectScript = (page) => `<script>
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
    if (pick && S.indexOf(pick) > -1) location.replace("/" + pick + "/${page}" + location.hash);
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
const cvTemplate = await readFile(src("cv.html"), "utf8");
const siteJs = (await readFile(src("site.js"), "utf8")).replace(/^\/\/.*\n/, "").trim();
const fillTemplate = (tpl, t, fill) =>
  tpl.replace(/\{\{(t:)?([\w.]+)\}\}/g, (_, isT, k) => {
    if (isT) return esc(t(k));
    if (!(k in fill)) throw new Error(`Unknown template field {{${k}}}`);
    return fill[k];
  });

// Top bar shared by every page: main navigation, language menu, theme toggle.
// The language menu links to the same page in each language.
function bar(lang, page) {
  const t = (k) => tr(lang, k);
  const nav = [
    ["", t("nav.home")],
    ["cv/", t("nav.cv")],
  ]
    .map(([p, label]) => `        <li><a href="${pagePath(lang, p)}"${p === page ? ' aria-current="page"' : ""}>${esc(label)}</a></li>`)
    .join("\n");
  const menu = langs
    .map(
      (l) =>
        `        <li><a href="${pagePath(l.code, page)}" hreflang="${l.code}" lang="${l.code}" data-lang="${l.code}"${l.code === lang ? ' aria-current="page"' : ""}>${esc(l.name)}</a></li>`,
    )
    .join("\n");
  return `  <div class="bar">
    <nav class="nav" aria-label="${esc(t("nav.label"))}">
      <ul>
${nav}
      </ul>
    </nav>
    <details class="lang">
      <summary>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18"/></svg>
        <span class="visually-hidden">${esc(t("ui.language"))}: </span><span>${lang.toUpperCase()}</span>
      </summary>
      <ul>
${menu}
      </ul>
    </details>
    <button class="theme-toggle" type="button" data-to-dark="${esc(t("ui.toDark"))}" data-to-light="${esc(t("ui.toLight"))}">
      <svg class="icon-moon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5Z"/></svg>
      <svg class="icon-sun" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>
      <span class="visually-hidden theme-label">${esc(t("ui.toDark"))}</span>
    </button>
  </div>`;
}

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
    .map((l) => ({ ...l, href: l.href.replace("{email}", site.email) }))
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
    CSS: css,
    SITE_URL: esc(site.url),
    PAGE_URL: esc(pageUrl(lang)),
    OG_LOCALE: ogLocale[lang] || lang,
    ALTERNATES: alternates,
    REDIRECT: lang === DEFAULT ? redirectScript("") : "",
    AVATAR: avatar(t("ui.avatarAlt")),
    EMAIL: esc(site.email),
    INFO: info,
    LINKS: links,
    BAR: bar(lang, ""),
    SITE_JS: siteJs,
    PROJECTS: projectHtml,
    STACK: stack,
    UPDATED: esc(updated),
    YEAR: String(new Date().getFullYear()),
  };
  return fillTemplate(template, t, fill);
}

// ---------- Render the CV in one site language ----------
// The CV exists in English and Czech; every other site language shows the English CV
// with its own navigation, and points search engines to /cv/ as the canonical page.
const CV_LANGS = langs.map((l) => l.code).filter((c) => cv[c]);
function renderCv(lang) {
  const t = (k) => tr(lang, k);
  const site = content.site;
  const cl = cv[lang] ? lang : DEFAULT;
  const c = cv[cl];
  const ui = c.ui;

  const section = (id, body) => `    <section class="section cv-section" aria-labelledby="cv-${id}">
      <h2 id="cv-${id}">${esc(c.h[id])}</h2>
${body}
    </section>`;
  const entry = (name, lines) =>
    `        <li class="cv-entry">
          <h3>${name}</h3>
${lines.filter(Boolean).map((l) => `          ${l}`).join("\n")}
        </li>`;
  const list = (items) => `      <ul class="cv-list">\n${items.join("\n")}\n      </ul>`;
  const dl = (rows) =>
    `      <dl class="cv-dl">\n${rows
      .map(([dt, dd]) => `        <div class="row">\n          <dt>${dt}</dt>\n          <dd class="main">${dd}</dd>\n        </div>`)
      .join("\n")}\n      </dl>`;

  const contact = [
    `        <li>${icon("mail")}<span class="visually-hidden">${esc(ui.email)}: </span><a href="mailto:${esc(site.email)}">${esc(site.email)}</a></li>`,
    ...cv.links.map(
      (l) =>
        `        <li>${icon(l.icon)}<span class="visually-hidden">${esc(l.label)}: </span><a href="${esc(l.href)}">${esc(l.text)}</a></li>`,
    ),
    `        <li>${icon("pin")}<span class="visually-hidden">${esc(ui.location)}: </span><span>${esc(c.location)}</span></li>`,
  ].join("\n");

  const sections = [
    section("profile", `      <div class="cv-profile">\n${c.profile.map((p) => `        <p>${esc(p)}</p>`).join("\n")}\n      </div>`),
    section(
      "experience",
      list(
        c.experience.map((e) =>
          entry(esc(e.org), [
            `<p class="cv-meta"><strong>${esc(e.role)}</strong> · ${esc(e.details)}${
              e.link ? ` · <a href="${esc(e.link.href)}">${esc(e.link.text)}</a>` : ""
            }</p>`,
            `<p>${esc(e.text)}</p>`,
          ]),
        ),
      ),
    ),
    section(
      "skills",
      dl(cv.skills.map((g) => [esc(ui.skillsGroups[g.id]), `<ul class="chips">${g.items.map((i) => `<li class="chip">${esc(i)}</li>`).join("")}</ul>`])),
    ),
    section("softSkills", list(c.softSkills.map((s) => entry(esc(s.name), [`<p>${esc(s.text)}</p>`])))),
    section("education", list(c.education.map((e) => entry(esc(e.name), [`<p class="cv-meta">${esc(e.details)}</p>`])))),
    section("languages", dl(c.languages.map((l) => [esc(l.name), esc(l.level)]))),
    section("awards", list(c.awards.map((a) => entry(esc(a.name), [`<p class="cv-meta">${esc(a.details)}</p>`])))),
  ].join("\n\n");

  // Structured data: public profile only. No email, phone or address on purpose.
  const jsonLd = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Tomáš Vlasák",
    jobTitle: c.role,
    url: site.url,
    sameAs: cv.links.map((l) => l.href),
  }).replace(/</g, "\\u003c");

  const alternates = [
    ...CV_LANGS.map((code) => `<link rel="alternate" hreflang="${code}" href="${pageUrl(code, "cv/")}">`),
    `<link rel="alternate" hreflang="x-default" href="${pageUrl(DEFAULT, "cv/")}">`,
  ].join("\n");

  const fill = {
    LANG: lang,
    CV_LANG_ATTR: cl === lang ? "" : ` lang="${cl}"`,
    TITLE: esc(ui.title),
    DESCRIPTION: esc(ui.description),
    CANONICAL: esc(pageUrl(cl, "cv/")),
    SITE_URL: esc(site.url),
    OG_LOCALE: ogLocale[cl] || cl,
    ALTERNATES: alternates,
    REDIRECT: lang === DEFAULT ? redirectScript("cv/") : "",
    JSONLD: jsonLd,
    CSS: css,
    SKIP: esc(ui.skip),
    BAR: bar(lang, "cv/"),
    ROLE: esc(c.role),
    SUBTITLE: esc(c.subtitle),
    CONTACT: contact,
    PDF: esc(cv.pdf[cl]),
    DOWNLOAD: esc(ui.download),
    DOWNLOAD_NOTE: esc(ui.downloadNote),
    DOWNLOAD_ICON: icon("download"),
    SECTIONS: sections,
    UPDATED_LABEL: esc(ui.updated),
    UPDATED: esc(c.updated),
    YEAR: String(new Date().getFullYear()),
    SITE_JS: siteJs,
  };
  return fillTemplate(cvTemplate, t, fill);
}

// ---------- Write dist ----------
await rm(dist(), { recursive: true, force: true });
await mkdir(dist("fonts"), { recursive: true });
for (const l of langs) {
  const dir = l.code === DEFAULT ? dist() : dist(l.code);
  await mkdir(dir, { recursive: true });
  await writeFile(path.join(dir, "index.html"), render(l.code));
  await mkdir(path.join(dir, "cv"), { recursive: true });
  await writeFile(path.join(dir, "cv", "index.html"), renderCv(l.code));
}
// The CV PDFs are dropped into src/cv/ by hand (see src/cv/README.md). A missing file
// only prints a warning, so the site still builds before they are added.
const missingPdfs = [];
for (const href of Object.values(cv.pdf)) {
  const file = path.basename(href);
  try {
    await access(src(path.join("cv", file)));
    await cp(src(path.join("cv", file)), dist(href.replace(/^\//, "")));
  } catch {
    missingPdfs.push(file);
  }
}
await cp(src("fonts"), dist("fonts"), { recursive: true });
for (const f of ["beaver.svg", "beaver.png"]) await cp(src(f), dist(f));
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${[
  ...langs.map(
    (l) => `  <url><loc>${pageUrl(l.code)}</loc>
${langs.map((a) => `    <xhtml:link rel="alternate" hreflang="${a.code}" href="${pageUrl(a.code)}"/>`).join("\n")}
  </url>`,
  ),
  ...CV_LANGS.map(
    (code) => `  <url><loc>${pageUrl(code, "cv/")}</loc>
${CV_LANGS.map((a) => `    <xhtml:link rel="alternate" hreflang="${a}" href="${pageUrl(a, "cv/")}"/>`).join("\n")}
  </url>`,
  ),
].join("\n")}
</urlset>
`;
await writeFile(dist("sitemap.xml"), sitemap);
await writeFile(dist("robots.txt"), `User-agent: *\nAllow: /\nSitemap: ${content.site.url}sitemap.xml\n`);
await writeFile(dist(".nojekyll"), "");

console.log(`✓ Built dist/ in ${langs.length} languages (${live ? "live GitHub data" : "snapshot data"})`);
if (missingPdfs.length) console.warn(`! CV PDFs not found in src/cv/, download links will 404 until added: ${missingPdfs.join(", ")}`);
if (missing.size) console.log(`  Untranslated, fell back to English: ${[...missing].join(", ")}`);
