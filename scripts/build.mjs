// Builds the site into dist/.
//   node scripts/build.mjs           build (uses live GitHub data when it can reach the API)
//   node scripts/build.mjs --offline build from data/github.json only
//   node scripts/build.mjs --strict  fail if any "TODO:" placeholders are left in content.json
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
const todos = [];
const esc = (s) =>
  String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);
const isTodo = (s) => typeof s === "string" && s.trim().startsWith("TODO:");
const txt = (s, where) => {
  if (isTodo(s)) todos.push(`${where}: ${s}`);
  return esc(s);
};
const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const ym = (iso) => (iso ? String(iso).slice(0, 7) : null);
const fmtMonth = (s) => {
  const [y, m] = s.split("-").map(Number);
  return `${months[m - 1]} ${y}`;
};

// Line icons (24px grid, stroked) for the info rows and email.
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

// ---------- Info rows ----------
const site = content.site;
const infoHtml = content.info
  .map((i) =>
    i.text === "CLOCK"
      ? `      <li>${icon(i.icon)}<span data-clock="${esc(site.timeZone)}">Central European Time</span></li>`
      : `      <li>${icon(i.icon)}<span>${txt(i.text, "Info")}</span></li>`,
  )
  .join("\n");

// ---------- Links ----------
const linksHtml = content.links
  .map(
    (l) =>
      `      <li><a href="${esc(l.href)}">${icon(l.icon)}<strong>${esc(l.label)}</strong><span>${esc(l.handle)}</span></a></li>`,
  )
  .join("\n");

// ---------- Projects ----------
const projects = content.featured.map((p) => {
  const gh = p.repo ? snapshot.repos[p.repo] || {} : {};
  return { ...p, date: p.repo ? ym(gh.pushed_at) : p.date, stars: gh.stargazers_count ?? null };
});
const sortKey = (p) => (p.date && !isTodo(p.date) ? p.date : "0000");
projects.sort((a, b) => sortKey(b).localeCompare(sortKey(a)));

const projectHtml = projects
  .map((p) => {
    const dateHtml = p.date && !isTodo(p.date) ? `<time datetime="${esc(p.date)}">${fmtMonth(p.date)}</time>` : "";
    const stars = p.stars > 0 ? `<span class="stars">${p.stars} ${p.stars === 1 ? "star" : "stars"}</span>` : "";
    const primary = (p.links || [])[0];
    const title = primary ? `<a href="${esc(primary.href)}">${esc(p.title)}</a>` : esc(p.title);
    const links = (p.links || [])
      .map((l) => `<a href="${esc(l.href)}">${esc(l.label)}<span class="visually-hidden">: ${esc(p.title)}</span></a>`)
      .join(" ");
    return `        <li class="project row">
          <p class="when">${dateHtml ? `<span class="visually-hidden">Last updated </span>${dateHtml}` : ""}${stars}</p>
          <div class="main">
            <h3>${title}</h3>
            <p class="summary">${txt(p.summary, `${p.title} summary`)}</p>
            <p class="why">${txt(p.why, `${p.title} why`)}</p>
            <ul class="chips" aria-label="Built with">${(p.stack || []).map(chip).join("")}</ul>
            <p class="plinks">${links}</p>
          </div>
        </li>`;
  })
  .join("\n");

// ---------- Stack ----------
const stackHtml = content.stack
  .map(
    (g) => `        <div class="row">
          <dt>${esc(g.label)}</dt>
          <dd class="main"><ul class="chips">${g.items.map(chip).join("")}</ul></dd>
        </div>`,
  )
  .join("\n");

const updated = snapshot.fetchedAt
  ? `Project dates from GitHub, refreshed ${new Date(snapshot.fetchedAt).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}.`
  : "Project dates from GitHub.";

const css = (await readFile(src("styles.css"), "utf8"))
  .replace(/\/\*[\s\S]*?\*\//g, "")
  .replace(/\s+/g, " ")
  .replace(/\s*([{};,>])\s*/g, "$1")
  .replace(/;}/g, "}")
  .trim();

let html = await readFile(src("index.html"), "utf8");
const fill = {
  CSS: css,
  SITE_URL: esc(site.url),
  ROLE: esc(site.role),
  EMAIL: esc(site.email),
  INFO: infoHtml,
  LINKS: linksHtml,
  PROJECTS: projectHtml,
  STACK: stackHtml,
  UPDATED: esc(updated),
  YEAR: String(new Date().getFullYear()),
};
html = html.replace(/\{\{(\w+)\}\}/g, (_, k) => {
  if (!(k in fill)) throw new Error(`Unknown template field {{${k}}}`);
  return fill[k];
});

// ---------- Write dist ----------
await rm(dist(), { recursive: true, force: true });
await mkdir(dist("fonts"), { recursive: true });
await writeFile(dist("index.html"), html);
await cp(src("fonts"), dist("fonts"), { recursive: true });
for (const f of ["beaver.svg", "beaver.png"]) await cp(src(f), dist(f));
await writeFile(dist("robots.txt"), "User-agent: *\nAllow: /\n");
await writeFile(dist(".nojekyll"), "");

console.log(`✓ Built dist/ (${live ? "live GitHub data" : "snapshot data"})`);
if (todos.length) {
  console.log(`\n${todos.length} placeholder(s) left in content.json:`);
  for (const t of todos) console.log(`  - ${t}`);
  if (args.has("--strict")) process.exit(1);
}
