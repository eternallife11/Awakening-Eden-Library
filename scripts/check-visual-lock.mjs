import { access, readdir, readFile } from 'node:fs/promises';
import path from 'node:path';
const root = process.cwd();
const required = [
  'assets/brand/awakening-eden-mark-painted-192.webp',
  'assets/hero/welcome-home-benjy-sofia-rooted-lotus-v34-1536.webp',
  'assets/hero/awakening-eden-community-circle-v35-1536.webp',
  'assets/library/awakening-eden-living-library-1672.webp',
  'docs/awakening-eden/design/lotus-of-life-12-exact.svg'
];
const errors = [];
for (const file of required) {
  try { await access(path.join(root, file)); }
  catch { errors.push(`Missing canonical visual asset: ${file}`); }
}
const excluded = new Set(['.git','node_modules','dist','docs','deliverables','tests','scripts','test-results','playwright-report']);
const extensions = new Set(['.html','.css','.js','.mjs','.json','.webmanifest']);
const forbidden = ['assets/brand/awakening-eden-mark-primary.svg','tree-heart-portal-01.webp','tree-heart-portal-02.webp','awakening-eden-regenerative-future-community-v1'];
async function walk(dir) {
  for (const entry of await readdir(dir,{withFileTypes:true})) {
    if (entry.isDirectory() && excluded.has(entry.name)) continue;
    const full=path.join(dir,entry.name);
    if (entry.isDirectory()) { await walk(full); continue; }
    if (!extensions.has(path.extname(entry.name))) continue;
    const source=await readFile(full,'utf8');
    const rel=path.relative(root,full);
    for (const ref of forbidden) if (source.includes(ref)) errors.push(`${rel}: retired visual reference ${ref}`);
    for (const line of source.split(/\r?\n/)) {
      if (!/(src\s*=|href\s*=|url\s*\(|image\s*:)/i.test(line)) continue;
      if (/seed[-_ ]of[-_ ]life|flower[-_ ]of[-_ ]life/i.test(line)) errors.push(`${rel}: forbidden Seed/Flower-of-Life asset reference`);
    }
  }
}
await walk(root);
if (errors.length) {
  console.error('Awakening Eden visual lock failed:\n'+[...new Set(errors)].map(x=>'- '+x).join('\n'));
  process.exit(1);
}
console.log('Awakening Eden visual lock passed: canonical painted identity and exact-Lotus visual family are protected.');
