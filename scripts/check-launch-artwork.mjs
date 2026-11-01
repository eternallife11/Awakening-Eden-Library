import { stat } from 'node:fs/promises';

// These exact approved files are required by the November homepage, responsive
// consulting identity and social metadata. Do not replace them with placeholders.
const files = [
  'assets/hero/eden-new-earth-dotwork-sun-1536.webp',
  'assets/hero/eden-new-earth-dotwork-sun-960.webp',
  'assets/work-with-benjy/brand/work-with-benjy-painted-banner-1536.webp',
  'assets/work-with-benjy/brand/work-with-benjy-painted-banner-960.webp',
  'assets/work-with-benjy/brand/work-with-benjy-painted-emblem-mobile.webp',
  'assets/work-with-benjy/brand/work-with-benjy-social-preview-1200x630.jpg',
];
const missing = [];
for (const file of files) {
  const info = await stat(new URL(`../dist/${file}`, import.meta.url)).catch(() => null);
  if (!info?.isFile() || !info.size) missing.push(file);
}
if (missing.length) {
  console.error(`Launch blocked: ${missing.length} approved artwork files are missing from the public build:\n${missing.map(file => `- ${file}`).join('\n')}`);
  process.exitCode = 1;
} else {
  console.log('All six November launch artwork files are present. Visual owner review is still required.');
}
