// Local development server. Not meant for production: GitHub Pages serves the site.
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.dirname(fileURLToPath(import.meta.url));
const PORT = process.env.PORT || 5173;

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.md': 'text/markdown; charset=utf-8',
  '.webmanifest': 'application/manifest+json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.woff2': 'font/woff2',
  '.woff': 'font/woff',
  '.ttf': 'font/ttf'
};

// Map a request URL to a file under root, or null if it would escape root or touch a dotfile.
export function resolveRequestPath(root, url) {
  let urlPath;
  try { urlPath = decodeURIComponent(new URL(url, 'http://localhost').pathname); } catch { return null; }
  if (urlPath.includes('\0')) return null;
  const filePath = path.resolve(root, `.${urlPath === '/' ? '/index.html' : urlPath}`);
  const rel = path.relative(root, filePath);
  if (rel.startsWith('..') || path.isAbsolute(rel)) return null;
  if (rel.split(path.sep).some((part) => part.startsWith('.'))) return null;
  return filePath;
}

const HEADERS = {
  'Cache-Control': 'no-cache, no-store, must-revalidate',
  'X-Content-Type-Options': 'nosniff',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'X-Frame-Options': 'DENY'
};

const send = (res, status, body, type = 'text/plain; charset=utf-8', extra = {}) => {
  res.writeHead(status, { ...HEADERS, 'Content-Type': type, ...extra });
  res.end(res.req.method === 'HEAD' ? undefined : body);
};

export function createServer(root = ROOT) {
  return http.createServer((req, res) => {
    // A static file server: anything other than a read is a client mistake.
    if (req.method !== 'GET' && req.method !== 'HEAD') return send(res, 405, '405 Method Not Allowed', undefined, { Allow: 'GET, HEAD' });
    const filePath = resolveRequestPath(root, req.url);
    if (!filePath) return send(res, 403, '403 Forbidden');

    fs.stat(filePath, (err, stats) => {
      const target = !err && stats.isDirectory() ? path.join(filePath, 'index.html') : filePath;
      // Unknown extensionless paths fall back to the SPA shell; missing assets are a real 404.
      const fallback = err && !path.extname(filePath) ? path.join(root, 'index.html') : null;
      if (err && !fallback) return send(res, 404, '404 Not Found');

      const file = fallback || target;
      fs.readFile(file, (readErr, content) => {
        if (readErr) return send(res, 404, '404 Not Found');
        send(res, 200, content, MIME_TYPES[path.extname(file).toLowerCase()] || 'application/octet-stream');
      });
    });
  });
}

if (import.meta.main) {
  createServer().listen(PORT, '127.0.0.1', () => {
    console.log(`FDE from Scratch dev server running at http://localhost:${PORT}`);
  });
}
