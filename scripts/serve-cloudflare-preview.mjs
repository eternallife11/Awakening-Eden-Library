import { createReadStream } from 'node:fs';
import { readFile, stat } from 'node:fs/promises';
import http from 'node:http';
import path from 'node:path';

const HOST = '127.0.0.1';
const PORT = Number.parseInt(process.env.PORT ?? '8787', 10);
const ROOT = path.resolve(process.cwd(), 'dist');

const contentTypes = new Map([
  ['.avif', 'image/avif'],
  ['.css', 'text/css; charset=utf-8'],
  ['.gif', 'image/gif'],
  ['.html', 'text/html; charset=utf-8'],
  ['.ico', 'image/x-icon'],
  ['.jpeg', 'image/jpeg'],
  ['.jpg', 'image/jpeg'],
  ['.js', 'text/javascript; charset=utf-8'],
  ['.json', 'application/json; charset=utf-8'],
  ['.mp4', 'video/mp4'],
  ['.pdf', 'application/pdf'],
  ['.png', 'image/png'],
  ['.svg', 'image/svg+xml; charset=utf-8'],
  ['.txt', 'text/plain; charset=utf-8'],
  ['.webmanifest', 'application/manifest+json; charset=utf-8'],
  ['.webp', 'image/webp'],
  ['.woff2', 'font/woff2'],
  ['.xml', 'application/xml; charset=utf-8']
]);

async function readRedirects() {
  const source = await readFile(path.join(ROOT, '_redirects'), 'utf8');
  return new Map(source
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter((line) => line && !line.startsWith('#'))
    .map((line) => {
      const [from, to, code = '302'] = line.split(/\s+/);
      return [from, { to, status: Number.parseInt(code, 10) }];
    }));
}

const redirects = await readRedirects();

async function existingFile(requestPath) {
  const cleanPath = requestPath === '/' ? '/index.html' : requestPath;
  const candidates = path.extname(cleanPath)
    ? [cleanPath]
    : [`${cleanPath}.html`, path.join(cleanPath, 'index.html')];

  for (const candidate of candidates) {
    const resolved = path.resolve(ROOT, `.${candidate}`);
    if (resolved !== ROOT && !resolved.startsWith(`${ROOT}${path.sep}`)) continue;
    try {
      if ((await stat(resolved)).isFile()) return resolved;
    } catch {
      // Try the next clean-URL candidate.
    }
  }
  return null;
}

const server = http.createServer(async (request, response) => {
  try {
    const url = new URL(request.url ?? '/', `http://${HOST}:${PORT}`);
    const pathname = decodeURIComponent(url.pathname);
    const redirect = redirects.get(pathname);

    if (redirect && (request.method === 'GET' || request.method === 'HEAD')) {
      response.writeHead(redirect.status, { Location: redirect.to });
      response.end();
      return;
    }

    if (request.method !== 'GET' && request.method !== 'HEAD') {
      response.writeHead(405, { Allow: 'GET, HEAD' });
      response.end('Method Not Allowed');
      return;
    }

    let file = await existingFile(pathname);
    let status = 200;
    if (!file) {
      file = path.join(ROOT, '404.html');
      status = 404;
    }

    const info = await stat(file);
    response.writeHead(status, {
      'Content-Length': info.size,
      'Content-Type': contentTypes.get(path.extname(file).toLowerCase()) ?? 'application/octet-stream',
      'X-Content-Type-Options': 'nosniff'
    });
    if (request.method === 'HEAD') {
      response.end();
      return;
    }
    createReadStream(file).pipe(response);
  } catch (error) {
    response.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
    response.end(`Preview server error: ${error.message}`);
  }
});

server.listen(PORT, HOST, () => {
  console.log(`Awakening Eden preview ready on http://${HOST}:${PORT}`);
});
