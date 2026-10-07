import { readFile, readdir } from 'node:fs/promises';
import path from 'node:path';

const ROOT = process.cwd();
const DIST = path.join(ROOT, 'dist');
const ORIGIN = 'https://awakeningeden.org';
const LEGACY = 'https://awakening-eden-library.netlify.app';
const KEY_ROUTES = [
  ['/', 'index.html'],
  ['/living-library', 'living-library.html'],
  ['/work-with-benjy', 'work-with-benjy.html'],
  ['/work-with-us', 'work-with-us.html'],
  ['/about', 'about.html'],
  ['/village-vision', 'village-vision.html']
];

const fail = (message) => { throw new Error(`SEO check failed: ${message}`); };
const decode = (value = '') => value.replaceAll('&amp;', '&').replaceAll('&quot;', '"').trim();

async function text(file) {
  return readFile(path.join(DIST, file), 'utf8');
}

function one(html, regex, label, file) {
  const matches = [...html.matchAll(regex)];
  if (matches.length !== 1) fail(`${file}: expected exactly one ${label}, found ${matches.length}`);
  return decode(matches[0][1]);
}

for (const [route, file] of KEY_ROUTES) {
  const html = await text(file);
  const title = one(html, /<title[^>]*>([\s\S]*?)<\/title>/gi, 'title', file);
  const descriptionTags = [...html.matchAll(/<meta\b[^>]*>/gi)]
    .map((m) => m[0])
    .filter((tag) => /\bname=["']description["']/i.test(tag));
  if (descriptionTags.length !== 1) fail(`${file}: expected exactly one meta description, found ${descriptionTags.length}`);
  const descriptionMatch = descriptionTags[0].match(/\bcontent=["']([^"']+)["']/i);
  if (!descriptionMatch) fail(`${file}: meta description has no content attribute`);
  const description = decode(descriptionMatch[1]);

  const canonicalTags = [...html.matchAll(/<link\b[^>]*>/gi)]
    .map((m) => m[0])
    .filter((tag) => /\brel=["']canonical["']/i.test(tag));
  if (canonicalTags.length !== 1) fail(`${file}: expected exactly one canonical, found ${canonicalTags.length}`);
  const canonicalMatch = canonicalTags[0].match(/\bhref=["']([^"']+)["']/i);
  if (!canonicalMatch) fail(`${file}: canonical has no href attribute`);
  const canonical = decode(canonicalMatch[1]);
  const expected = route === '/' ? `${ORIGIN}/` : `${ORIGIN}${route}`;

  if (!title || title.length < 20 || title.length > 70) fail(`${file}: title length ${title.length} is outside 20–70 characters`);
  if (!description || description.length < 80 || description.length > 180) fail(`${file}: description length ${description.length} is outside 80–180 characters`);
  if (canonical !== expected) fail(`${file}: canonical is ${canonical}, expected ${expected}`);
  if (/name=["']robots["'][^>]+content=["'][^"']*noindex/i.test(html)) fail(`${file}: accidental noindex`);
  if (html.includes(LEGACY)) fail(`${file}: legacy Netlify origin remains`);

  const jsonLd = [...html.matchAll(/<script[^>]+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)];
  for (const block of jsonLd) {
    try { JSON.parse(block[1]); } catch (error) { fail(`${file}: invalid JSON-LD: ${error.message}`); }
  }
}

const robots = await text('robots.txt');
if (!robots.includes('User-agent: OAI-SearchBot') || !robots.includes('Allow: /')) fail('robots.txt must explicitly allow OAI-SearchBot');
if (!robots.includes(`Sitemap: ${ORIGIN}/sitemap.xml`)) fail('robots.txt sitemap must use production origin');
if (robots.includes(LEGACY)) fail('robots.txt contains legacy origin');

const sitemap = await text('sitemap.xml');
if (sitemap.includes(LEGACY)) fail('sitemap contains legacy origin');
for (const [route] of KEY_ROUTES) {
  const url = route === '/' ? `${ORIGIN}/` : `${ORIGIN}${route}`;
  if (!sitemap.includes(`<loc>${url}</loc>`)) fail(`sitemap missing canonical URL ${url}`);
}
const locs = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
if (new Set(locs).size !== locs.length) fail('sitemap contains duplicate URLs');

console.log(`SEO contract passed for ${KEY_ROUTES.length} flagship routes, robots.txt and sitemap.xml.`);
