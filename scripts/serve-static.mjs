import { createServer } from "node:http";
import { readFile, stat } from "node:fs/promises";
import path from "node:path";
const root = path.resolve("out");
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
const types = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json",
  ".txt": "text/plain; charset=utf-8",
  ".svg": "image/svg+xml",
  ".jpg": "image/jpeg",
  ".webp": "image/webp",
  ".ttf": "font/ttf",
  ".woff2": "font/woff2",
  ".ico": "image/x-icon",
};
createServer(async (req, res) => {
  try {
    const pathname = decodeURIComponent(
      new URL(req.url, "http://localhost").pathname,
    );
    if (
      basePath &&
      pathname !== basePath &&
      !pathname.startsWith(basePath + "/")
    ) {
      res.writeHead(404).end("Page not found.");
      return;
    }
    let file = path.resolve(
      root,
      "." + (pathname.slice(basePath.length) || "/"),
    );
    if (file !== root && !file.startsWith(root + path.sep)) {
      res.writeHead(403).end();
      return;
    }
    try {
      if ((await stat(file)).isDirectory())
        file = path.join(file, "index.html");
    } catch {}
    let data;
    try {
      data = await readFile(file);
    } catch {
      res.statusCode = 404;
      file = path.join(root, "404.html");
      data = await readFile(file);
    }
    res.setHeader(
      "Content-Type",
      types[path.extname(file)] || "application/octet-stream",
    );
    res.end(data);
  } catch {
    res.writeHead(500).end("Unable to load this page.");
  }
}).listen(Number(process.env.PORT || 3000), "0.0.0.0", () =>
  console.log(
    `Static preview: http://localhost:${process.env.PORT || 3000}${basePath}/`,
  ),
);
