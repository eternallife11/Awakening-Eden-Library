import { readdir, readFile, stat } from 'node:fs/promises';
import { extname, join, relative } from 'node:path';

const root = process.cwd();
const ignoredDirs = new Set([
  '.git','node_modules','dist','docs','deliverables','tests','scripts','playwright-report','test-results'
]);
const textExts = new Set(['.html','.css','.js','.mjs','.json','.webmanifest','.xml','.txt']);
const forbidden = [
  {
    label: 'retired line header mark',
    pattern: /assets\/brand\/awakening-eden-mark-primary\.svg/gi
  },
  {
    label: 'retired legacy Tree-heart portal 01',
    pattern: /tree-heart-portal-01\.(?:webp|png|jpg|jpeg|avif)/gi
  },
  {
    label: 'retired legacy Tree-heart portal 02',
    pattern: /tree-heart-portal-02\.(?:webp|png|jpg|jpeg|avif)/gi
  },
  {
    label: 'Flower of Life image reference',
    pattern: /(?:src|href|url\()\s*=?\s*["'(]?[^\"')\s]*flower[-_ ]of[-_ ]life[^\"')\s]*/gi
  },
  {
    label: 'Seed of Life image reference',
    pattern: /(?:src|href|url\()\s*=?\s*["'(]?[^\"')\s]*seed[-_ ]of[-_ ]life[^\"')\s]*/gi
  },
  {
    label: 'production reference to source/master artwork',
    pattern: /(?:src|href|url\()\s*=?\s*["'(]?(?:docs|deliverables|masters)\//gi
  }
];

const required = [
  'assets/brand/awakening-eden-mark-painted-192.webp',
  'assets/geometry/lotus-of-life-12-exact.svg',
  'assets/hero/welcome-home-benjy-sofia-rooted-lotus-v34-1536.webp',
  'assets/hero/awakening-eden-community-circle-v35-1536.webp',
  'assets/library/awakening-eden-living-library-1672.webp'
];

const errors = [];
const scanned = [];

async function walk(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    if (entry.name.startsWith('.') && entry.name !== '.well-known') continue;
    if (entry.isDirectory() && ignoredDirs.has(entry.name)) continue;
    const full = join(dir, entry.name);
    if (entry.isDirectory()) {
      await walk(full);
      continue;
    }
    if (!textExts.has(extname(entry.name).toLowerCase())) continue;
    scanned.push(full);
  }
}

await walk(root);

for (const file of scanned) {
  const source = await readFile(file, 'utf8');
  const display = relative(root, file);
  for (const rule of forbidden) {
    rule.pattern.lastIndex = 0;
    if (rule.pattern.test(source)) {
      errors.push(`${display}: ${rule.label}`);
    }
  }
}

for (const path of required) {
  try {
    const info = await stat(join(root, path));
    if (!info.isFile() || info.size === 0) errors.push(`${path}: required canonical asset is missing or empty`);
  } catch {
    errors.push(`${path}: required canonical asset is missing`);
  }
}

if (errors.length) {
  console.error('Awakening Eden visual-lock guard failed:\n' + errors.map((e) => `- ${e}`).join('\n'));
  process.exit(1);
}

console.log(`Awakening Eden visual-lock guard passed across ${scanned.length} public text assets.`);
console.log('Canonical painted mark, exact 12-fold Lotus, rooted Benjy/Sofia threshold, community circle and Living Library artwork are present.');
