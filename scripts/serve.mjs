// Minimal static server for out/, used by the checks and for local previews.
//   node scripts/serve.mjs [port]
import { createServer } from "node:http";
import { gzipSync } from "node:zlib";
import { readFile, stat } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..", "out");
const types = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css",
  ".js": "text/javascript",
  ".json": "application/json",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".webp": "image/webp",
  ".avif": "image/avif",
  ".woff2": "font/woff2",
  ".xml": "application/xml",
  ".txt": "text/plain; charset=utf-8",
  ".pdf": "application/pdf",
  ".ico": "image/x-icon",
};

export function startServer(port = 0) {
  const server = createServer(async (req, res) => {
    const urlPath = decodeURIComponent(new URL(req.url, "http://x").pathname);
    let file = path.join(root, urlPath);
    if (!file.startsWith(root)) return void res.writeHead(403).end();
    try {
      if ((await stat(file)).isDirectory()) file = path.join(file, "index.html");
      let body = await readFile(file);
      const type = types[path.extname(file)] ?? "application/octet-stream";
      const headers = { "Content-Type": type };
      // Compress text like GitHub Pages does, so local Lighthouse numbers are realistic.
      if (/text|javascript|json|xml|svg/.test(type) && /gzip/.test(req.headers["accept-encoding"] ?? "")) {
        body = gzipSync(body);
        headers["Content-Encoding"] = "gzip";
      }
      res.writeHead(200, headers);
      res.end(body);
    } catch {
      const body = await readFile(path.join(root, "404.html")).catch(() => "Not found");
      res.writeHead(404, { "Content-Type": "text/html; charset=utf-8" }).end(body);
    }
  });
  return new Promise((resolve) => server.listen(port, () => resolve(server)));
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const server = await startServer(Number(process.argv[2] ?? 8080));
  console.log(`Serving out/ at http://localhost:${server.address().port}`);
}
