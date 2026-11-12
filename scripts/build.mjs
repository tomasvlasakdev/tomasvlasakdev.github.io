// Builds the site into dist/.
//   node scripts/build.mjs           build (uses live GitHub data when it can reach the API)
//   node scripts/build.mjs --offline build from data/github.json only
//   node scripts/build.mjs --strict  fail if any TODO placeholders are left
import { readFile, writeFile, mkdir, rm, cp } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const src = (p) => path.join(root, "src", p);
const dist = (p = "") => path.join(root, "dist", p);
const args = new Set(process.argv.slice(2));

const content = JSON.parse(await readFile(path.join(root, "content.json"), "utf8"));
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

// ---------- Rendering helpers ----------
const todos = [];
const esc = (s) =>
  String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);
const isTodo = (s) => typeof s === "string" && s.trim().startsWith("TODO:");
const txt = (s, where) => {
  if (isTodo(s)) {
    todos.push(`${where}: ${s}`);
    return `<mark class="todo">${esc(s)}</mark>`;
  }
  return esc(s);
};
const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const ym = (iso) => (iso ? String(iso).slice(0, 7) : null); // "2026-09"
const fmtMonth = (s) => {
  const [y, m] = s.split("-").map(Number);
  return `${months[m - 1]} ${y}`;
};

// ---------- Projects ----------
const projects = content.featured.map((p) => {
  const gh = p.repo ? snapshot.repos[p.repo] || {} : {};
  return { ...p, date: p.repo ? ym(gh.pushed_at) : p.date, stars: gh.stargazers_count ?? null };
});
// Newest first; projects whose date is still a TODO go last.
const sortKey = (p) => (p.date && !isTodo(p.date) ? p.date : "0000");
projects.sort((a, b) => sortKey(b).localeCompare(sortKey(a)));

const projectHtml = projects
  .map((p) => {
    const where = p.title;
    const dateHtml = !p.date
      ? ""
      : isTodo(p.date)
        ? txt(p.date, `${where} date`)
        : `<time datetime="${esc(p.date)}">${fmtMonth(p.date)}</time>`;
    const stars = p.stars > 0 ? `<span class="stars">${p.stars} ${p.stars === 1 ? "star" : "stars"}</span>` : "";
    const primary = (p.links || []).find((l) => !isTodo(l.href));
    const title = primary ? `<a href="${esc(primary.href)}">${esc(p.title)}</a>` : esc(p.title);
    const links = (p.links || [])
      .map((l) =>
        isTodo(l.href)
          ? `<span>${esc(l.label)}: ${txt(l.href, `${where} link`)}</span>`
          : `<a href="${esc(l.href)}">${esc(l.label)}<span class="visually-hidden">: ${esc(p.title)}</span></a>`,
      )
      .join("\n            ");
    const stack = (p.stack || []).map((s) => txt(s, `${where} stack`)).join(", ");
    return `        <li class="project row">
          <p class="when">${dateHtml ? `<span class="visually-hidden">Last updated </span>${dateHtml}` : ""}${stars}</p>
          <div class="main">
            <h3>${title}</h3>
            <p class="summary">${txt(p.summary, `${where} summary`)}</p>
            <p class="why">${txt(p.why, `${where} why`)}</p>
            <p class="built"><span class="visually-hidden">Built with </span>${stack}</p>
            <p class="plinks">
            ${links}
            </p>
          </div>
        </li>`;
  })
  .join("\n");

const stackHtml = content.stack
  .map(
    (g) => `        <div class="row">
          <dt>${esc(g.label)}</dt>
          <dd class="main">${g.items.map((i) => txt(i, `Stack ${g.label}`)).join(", ")}</dd>
        </div>`,
  )
  .join("\n");

// ---------- Site-level fields ----------
const site = content.site;
const status = site.status ? txt(site.status, "Intro status line") : "";
const emailLink = isTodo(site.email) || !site.email
  ? `<a href="#contact">Email</a>`
  : `<a href="mailto:${esc(site.email)}">Email</a>`;
const emailBig = isTodo(site.email)
  ? `<p class="email">${txt(site.email, "Email")}</p>`
  : site.email
    ? `<a class="email" href="mailto:${esc(site.email)}">${esc(site.email)}</a>`
    : "";
const linkedin = !site.linkedin
  ? ""
  : isTodo(site.linkedin)
    ? txt(site.linkedin, "LinkedIn")
    : `<a href="${esc(site.linkedin)}">LinkedIn</a>`;

const updated = snapshot.fetchedAt
  ? `Project dates come from GitHub, refreshed ${new Date(snapshot.fetchedAt).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}.`
  : "Project dates come from GitHub.";

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
  STATUS: status,
  EMAIL_LINK: emailLink,
  EMAIL_BIG: emailBig,
  LINKEDIN_LINK: linkedin,
  PROJECTS: projectHtml,
  STACK: stackHtml,
  UPDATED: esc(updated),
};
html = html.replace(/\{\{(\w+)\}\}/g, (_, k) => {
  if (!(k in fill)) throw new Error(`Unknown template field {{${k}}}`);
  return fill[k];
});
// Drop elements that ended up empty (e.g. a deleted status line or LinkedIn link).
html = html.replace(/\s*<p class="status"><\/p>/, "").replace(/\s*<li><\/li>/g, "");

// ---------- Write dist ----------
await rm(dist(), { recursive: true, force: true });
await mkdir(dist("fonts"), { recursive: true });
await writeFile(dist("index.html"), html);
await cp(src("fonts"), dist("fonts"), { recursive: true });
await cp(src("favicon.svg"), dist("favicon.svg"));
await writeFile(dist("robots.txt"), "User-agent: *\nAllow: /\n");
await writeFile(dist(".nojekyll"), "");

console.log(`✓ Built dist/ (${live ? "live GitHub data" : "snapshot data"})`);
if (todos.length) {
  console.log(`\n${todos.length} placeholder(s) still need your input (edit content.json):`);
  for (const t of todos) console.log(`  - ${t}`);
  if (args.has("--strict")) process.exit(1);
} else {
  console.log("No placeholders left.");
}
