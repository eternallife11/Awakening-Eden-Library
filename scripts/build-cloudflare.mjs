import { cp, mkdir, readFile, readdir, rm, stat, writeFile } from 'node:fs/promises';
import path from 'node:path';

const ROOT = typeof process !== 'undefined'
  ? process.cwd()
  : globalThis.__AWAKENING_EDEN_BUILD_ROOT__;
const BUILD_ENV = typeof process !== 'undefined'
  ? process.env
  : (globalThis.__AWAKENING_EDEN_BUILD_ENV__ || {});

if (!ROOT) {
  throw new Error('Could not determine the repository root for the public build.');
}

const OUT = path.join(ROOT, 'dist');
const MAX_FILE = 25 * 1024 * 1024; // Cloudflare Workers Static Assets per-file limit: 25 MiB.
const LEGACY_ORIGIN = 'https://awakening-eden-library.netlify.app';
const PUBLIC_ORIGIN = BUILD_ENV.AWAKENING_EDEN_PUBLIC_ORIGIN || '';
const PREMIUM_MARK = 'assets/brand/awakening-eden-mark-painted-192.webp';
const PREMIUM_LOGO = 'assets/brand/awakening-eden-logo-primary-700.webp';
const LEGACY_PUBLIC_IDENTITY = [
  'assets/brand/awakening-eden-mark-reversed.svg',
  'assets/brand/awakening-eden-mark-one-colour.svg',
  'assets/brand/awakening-eden-mark-primary.svg',
  'assets/illustrations/ae-logo-tree-heart.svg'
];
if (PUBLIC_ORIGIN && PUBLIC_ORIGIN !== 'https://awakeningeden.org') {
  throw new Error('Production origin must be exactly https://awakeningeden.org.');
}
// CI supplies Cloudflare's official test key. Staging otherwise embeds the
// public key of the isolated enquiry widget (the secret stays in Workers).
const TURNSTILE_SITE_KEY = BUILD_ENV.ENQUIRY_TURNSTILE_SITE_KEY || '0x4AAAAAAEPRpGQHyAWttNLs';

if (!TURNSTILE_SITE_KEY) {
  throw new Error('ENQUIRY_TURNSTILE_SITE_KEY is required to build the Cloudflare enquiry preview.');
}

if (!/^[A-Za-z0-9_-]{8,200}$/.test(TURNSTILE_SITE_KEY)) {
  throw new Error('ENQUIRY_TURNSTILE_SITE_KEY has an unexpected format.');
}

const excludedDirs = new Set([
  '.git', '.github', '.idea', '.vscode', '.wrangler',
  'node_modules', 'dist', 'docs', 'deliverables', 'scripts', 'tests', 'workers',
  'playwright-report', 'test-results'
]);

const excludedNames = new Set([
  '.gitignore', '.DS_Store',
  'netlify.toml', 'wrangler.toml', 'wrangler.jsonc', 'wrangler.production.jsonc',
  'package.json', 'package-lock.json', 'pnpm-lock.yaml', 'pnpm-workspace.yaml', 'yarn.lock',
  'playwright.config.mjs',
  'AGENTS.md'
]);

const excludedPublicAssets = new Set([
  // Superseded generated geometry: keep the repository masters for provenance,
  // but never copy them into a public Cloudflare artifact.
  'assets/film-previews/inner-worlds-outer-worlds.webp',
  'assets/hero/garden-of-harmony-benjy-sofia-1672.webp',
  'assets/dividers/flowing-suns-living-codes-divider-640.avif',
  'assets/dividers/flowing-suns-living-codes-divider-640.webp',
  'assets/dividers/flowing-suns-living-codes-divider-1280.avif',
  'assets/dividers/flowing-suns-living-codes-divider-1280.webp',
  'assets/dividers/flowing-suns-living-codes-divider-1600.avif',
  'assets/dividers/flowing-suns-living-codes-divider-1600.webp',
  // Legacy line-art identity files are kept in git for provenance only. Public
  // HTML is normalized to the premium painted mark below, and old URLs redirect.
  'assets/brand/awakening-eden-mark-reversed.svg',
  'assets/brand/awakening-eden-mark-one-colour.svg',
  'assets/brand/awakening-eden-mark-primary.svg',
  'assets/illustrations/ae-logo-tree-heart.svg'
]);

function shouldExclude(rel, isDir) {
  const parts = rel.split(path.sep);
  if (parts.some((part) => excludedDirs.has(part))) return true;
  if (!isDir && excludedPublicAssets.has(rel)) return true;
  const name = path.basename(rel);
  if (!isDir && excludedNames.has(name)) return true;
  if (!isDir && /^CLAUDE/i.test(name)) return true;
  if (!isDir && /\.(md|markdown|zip|psd|xcf|ai|sketch)$/i.test(name)) return true;
  if (!isDir && /\.txt$/i.test(name) && name !== 'robots.txt') return true;
  return false;
}

let filesCopied = 0;
let bytesCopied = 0;

async function readRedirectRules() {
  const source = await readFile(path.join(ROOT, '_redirects'), 'utf8');
  return source
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter((line) => line && !line.startsWith('#'));
}

async function copyTree(srcDir, dstDir, relBase = '') {
  await mkdir(dstDir, { recursive: true });
  const entries = await readdir(srcDir, { withFileTypes: true });

  for (const entry of entries) {
    const rel = path.join(relBase, entry.name);
    if (shouldExclude(rel, entry.isDirectory())) continue;

    const src = path.join(srcDir, entry.name);
    const dst = path.join(dstDir, entry.name);

    if (entry.isDirectory()) {
      await copyTree(src, dst, rel);
      continue;
    }

    const info = await stat(src);
    if (info.size > MAX_FILE) {
      throw new Error(`Public asset exceeds Cloudflare's 25 MiB limit: ${rel} (${(info.size / 1024 / 1024).toFixed(1)} MiB)`);
    }

    await mkdir(path.dirname(dst), { recursive: true });
    await cp(src, dst);
    filesCopied += 1;
    bytesCopied += info.size;
  }
}

async function versionFinalHomepageRuntime() {
  const indexPath = path.join(OUT, 'index.html');
  const source = await readFile(indexPath, 'utf8');
  const currentNeedle = 'eden-v23.js?v=23.4';
  const versionedRuntime = 'eden-v23.js?v=2026-09-17.1';

  if (!source.includes(currentNeedle) && !source.includes(versionedRuntime)) {
    throw new Error('Could not safely version the final homepage runtime.');
  }

  await writeFile(indexPath, source.replace(currentNeedle, versionedRuntime));
}

async function writeCloudflareRedirects() {
  const sourceRules = await readRedirectRules();
  const rules = [];

  for (const line of sourceRules) {
    // The protected source folders and rights-unconfirmed masters are not copied
    // into dist at all, so they naturally 404. Workers Static Assets does not
    // support Netlify's forced 404! rewrite syntax.
    if (/\s404!\s*$/.test(line)) continue;

    // Workers Static Assets supports redirects but not Netlify-style 200
    // rewrites. Canonical HTML aliases are generated below instead.
    if (/\s200!?\s*$/.test(line)) continue;

    // Cloudflare uses numeric redirect codes without Netlify's trailing force '!'.
    rules.push(line.replace(/\s(301|302|303|307|308)!\s*$/, ' $1'));
  }

  const header = [
    '# Generated by scripts/build-cloudflare.mjs',
    '# Internal docs/deliverables are excluded from dist and therefore naturally 404.',
    '# Keep canonical public routes below in source _redirects; Netlify force markers are removed here.',
    ''
  ].join('\n');

  await writeFile(path.join(OUT, '_redirects'), `${header}${rules.join('\n')}\n`);
}

async function writeCloudflareRouteAliases() {
  const sourceRules = await readRedirectRules();

  for (const line of sourceRules) {
    if (!/\s200!?\s*$/.test(line)) continue;

    const [sourceRoute, destination] = line.split(/\s+/);
    const isSimpleHtmlRewrite =
      sourceRoute?.startsWith('/') &&
      destination?.startsWith('/') &&
      destination.toLowerCase().endsWith('.html') &&
      !/[?*:#]/.test(sourceRoute) &&
      !sourceRoute.includes('..') &&
      !destination.includes('..');

    if (!isSimpleHtmlRewrite) {
      throw new Error(`Cannot convert Cloudflare 200 rewrite into a safe HTML alias: ${line}`);
    }

    const sourceFile = path.join(OUT, destination.slice(1));
    const aliasFile = path.join(OUT, `${sourceRoute.slice(1)}.html`);
    if (sourceFile === aliasFile) continue;

    const info = await stat(sourceFile);
    const existingAlias = await stat(aliasFile).catch(() => null);
    // macOS commonly uses a case-insensitive filesystem. A lower-case clean
    // route can therefore resolve to the mixed-case source file already copied
    // into dist; copying a file onto its own inode fails with ERR_FS_CP_EINVAL.
    if (existingAlias?.dev === info.dev && existingAlias?.ino === info.ino) continue;
    await cp(sourceFile, aliasFile);
    filesCopied += 1;
    bytesCopied += info.size;
  }
}

async function writeCloudflareHeaders() {
  const sourceHeaders = await readFile(path.join(ROOT, '_headers'), 'utf8');
  const sourceRules = await readRedirectRules();
  const cleanHtmlRoutes = sourceRules
    .filter((line) => /\s200!?\s*$/.test(line))
    .map((line) => line.split(/\s+/)[0]);

  // Keep the future form origin permitted so activation remains a deliberate
  // content change. A CSP allowance does not load Turnstile by itself.
  const deploymentHeaders = sourceHeaders
    .replace("script-src 'self';", "script-src 'self' https://challenges.cloudflare.com;")
    .replace("frame-src https://open.spotify.com;", "frame-src https://open.spotify.com https://challenges.cloudflare.com;");

  const additions = [
    '',
    '# Cloudflare Workers Static Assets preview safeguards.',
    '# Keep temporary workers.dev and version-preview hosts out of search indexes.',
    'https://:worker.:subdomain.workers.dev/*',
    '  X-Robots-Tag: noindex, nofollow',
    '',
    '# Clean HTML routes need the same browser-cache policy as direct *.html URLs.',
    '/',
    '  Cache-Control: no-cache, no-store, must-revalidate',
    ...cleanHtmlRoutes.flatMap((route) => [
      '',
      route,
      '  Cache-Control: no-cache, no-store, must-revalidate'
    ]),
    '',
    '/eden-enquiry.js',
    '  Cache-Control: public, max-age=31536000, immutable',
    ''
  ].join('\n');

  await writeFile(path.join(OUT, '_headers'), `${deploymentHeaders.trimEnd()}\n${additions}`);
}

async function prepareCloudflareEnquiryForm() {
  const formPath = path.join(OUT, 'work-with-benjy.html');
  const source = await readFile(formPath, 'utf8');
  const formNeedle = 'data-netlify="true" netlify-honeypot="bot-field" data-land-enquiry-form>';
  const consentNeedle = '          <button class="button button--primary form-submit" type="submit">Send my land story <span aria-hidden="true">→</span></button>';
  const bodyNeedle = '</body>';

  if (!source.includes(formNeedle) || !source.includes(consentNeedle) || !source.includes(bodyNeedle)) {
    throw new Error('Could not safely prepare the Cloudflare-only enquiry form.');
  }

  // The public page currently keeps this future form inside a hidden aside and
  // offers WhatsApp/email instead. Do not load Turnstile until a human review
  // explicitly activates the form and its production hostname is authorised.
  if (source.includes('<aside hidden aria-hidden="true">')) {
    return false;
  }

  const turnstileMarkup = [
    '          <div class="enquiry-turnstile cf-turnstile" data-enquiry-turnstile',
    `               data-sitekey="${TURNSTILE_SITE_KEY}" data-action="enquiry" data-theme="light"`,
    '               data-response-field-name="turnstile-token"></div>',
    '          <p class="enquiry-status" data-enquiry-status role="status" aria-live="polite" hidden></p>'
  ].join('\n');

  const prepared = source
    .replace(
      formNeedle,
      'data-netlify="true" netlify-honeypot="bot-field" data-land-enquiry-form data-cloudflare-enquiry-endpoint="/api/enquiry">'
    )
    .replace(consentNeedle, `${turnstileMarkup}\n${consentNeedle}`)
    .replace(
      bodyNeedle,
      '  <script src="https://challenges.cloudflare.com/turnstile/v0/api.js" async defer></script>\n  <script src="eden-enquiry.js" defer></script>\n</body>'
    );

  await writeFile(formPath, prepared);
  return true;
}

function withOrganizationLogo(html) {
  const logoOrigin = PUBLIC_ORIGIN || LEGACY_ORIGIN;
  const logoUrl = `${logoOrigin}/${PREMIUM_LOGO}`;
  const scriptPattern = /<script([^>]*)type=["']application\/ld\+json["']([^>]*)>([\s\S]*?)<\/script>/gi;

  return html.replace(scriptPattern, (match, before, after, jsonText) => {
    try {
      const data = JSON.parse(jsonText);
      let changed = false;
      const visit = (node) => {
        if (Array.isArray(node)) {
          for (const item of node) visit(item);
          return;
        }
        if (!node || typeof node !== 'object') return;
        const rawType = node['@type'];
        const types = Array.isArray(rawType) ? rawType : [rawType];
        if (types.includes('Organization') && !node.logo) {
          node.logo = logoUrl;
          changed = true;
        }
        for (const value of Object.values(node)) visit(value);
      };
      visit(data);
      if (!changed) return match;
      return `<script${before}type="application/ld+json"${after}>\n${JSON.stringify(data, null, 2)}\n  </script>`;
    } catch {
      return match;
    }
  });
}

async function normalizePremiumBrandIdentity(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const file = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      await normalizePremiumBrandIdentity(file);
      continue;
    }
    if (!/\.(?:html|xml|txt|css|js|json|webmanifest)$/i.test(entry.name)) continue;

    const source = await readFile(file, 'utf8');
    let normalized = source;
    for (const legacy of LEGACY_PUBLIC_IDENTITY) {
      normalized = normalized.replaceAll(legacy, PREMIUM_MARK);
    }
    if (/\.html$/i.test(entry.name)) {
      normalized = withOrganizationLogo(normalized);
      for (const legacy of LEGACY_PUBLIC_IDENTITY) {
        if (normalized.includes(legacy)) {
          throw new Error(`Legacy line-art identity survived public build normalization in ${path.relative(OUT, file)}: ${legacy}`);
        }
      }
    }
    if (normalized !== source) await writeFile(file, normalized);
  }
}

async function rewriteProductionOrigins(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const file = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      await rewriteProductionOrigins(file);
      continue;
    }
    // PDFs and images are binary. Historic PDF links continue to work through
    // the Netlify fallback until those guides receive their next editorial pass.
    if (!/\.(?:html|xml|txt|css|js|json|webmanifest)$/i.test(entry.name)) continue;
    const source = await readFile(file, 'utf8');
    if (source.includes(LEGACY_ORIGIN)) {
      await writeFile(file, source.replaceAll(LEGACY_ORIGIN, PUBLIC_ORIGIN));
    }
  }
}

await rm(OUT, { recursive: true, force: true });
await copyTree(ROOT, OUT);
await versionFinalHomepageRuntime();
await prepareCloudflareEnquiryForm();
await writeCloudflareRouteAliases();
await writeCloudflareRedirects();
await writeCloudflareHeaders();
await normalizePremiumBrandIdentity(OUT);
if (PUBLIC_ORIGIN) await rewriteProductionOrigins(OUT);

const indexPath = path.join(OUT, 'index.html');
const notFoundPath = path.join(OUT, '404.html');
await stat(indexPath);
await stat(notFoundPath);

console.log(`Cloudflare public build complete: ${filesCopied} files, ${(bytesCopied / 1024 / 1024).toFixed(1)} MiB`);
console.log('Excluded from deployment: docs/, deliverables/, legacy line-art identity assets, source ZIPs, markdown/internal prompts, repository/build tooling.');
console.log(`Public origin: ${PUBLIC_ORIGIN || 'staging preview (legacy canonical until domain cutover)'}`);
