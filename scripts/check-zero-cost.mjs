import { readFile } from 'node:fs/promises';

const configFiles = ['wrangler.jsonc', 'wrangler.production.jsonc'];
const scanFiles = [...configFiles, 'workers/enquiry.mjs', 'package.json'];

const forbiddenBindings = [
  ['Workers AI', /["']?ai["']?\s*:/i],
  ['D1 database', /["']?d1_databases["']?\s*:/i],
  ['Durable Objects', /["']?durable_objects["']?\s*:/i],
  ['KV namespace', /["']?kv_namespaces["']?\s*:/i],
  ['R2 bucket', /["']?r2_buckets["']?\s*:/i],
  ['Queues', /["']?queues["']?\s*:/i],
  ['Vectorize', /["']?vectorize["']?\s*:/i],
  ['Hyperdrive', /["']?hyperdrive["']?\s*:/i],
  ['Analytics Engine', /["']?analytics_engine_datasets["']?\s*:/i],
  ['Browser Rendering', /["']?browser["']?\s*:/i],
  ['Workflows', /["']?workflows["']?\s*:/i],
  ['Workers for Platforms dispatch', /["']?dispatch_namespaces["']?\s*:/i]
];

const paidCredentialHints = [
  'OPENAI_API_KEY',
  'ANTHROPIC_API_KEY',
  'GEMINI_API_KEY',
  'GOOGLE_GENERATIVE_AI_API_KEY',
  'STRIPE_SECRET_KEY',
  'RESEND_API_KEY',
  'SENDGRID_API_KEY',
  'MAILGUN_API_KEY',
  'MAPBOX_ACCESS_TOKEN'
];

const errors = [];

for (const file of configFiles) {
  const source = await readFile(file, 'utf8');
  for (const [label, pattern] of forbiddenBindings) {
    if (pattern.test(source)) errors.push(`${file}: ${label} binding is not allowed by the zero-cost hosting policy.`);
  }
}

for (const file of scanFiles) {
  const source = await readFile(file, 'utf8');
  for (const hint of paidCredentialHints) {
    if (source.includes(hint)) errors.push(`${file}: found ${hint}; paid/metered external API credentials are not allowed without an explicit policy change.`);
  }
}

if (errors.length) {
  console.error('Zero-cost hosting guard failed:\n' + errors.map((error) => `- ${error}`).join('\n'));
  process.exit(1);
}

console.log('Zero-cost hosting guard passed: no metered Cloudflare bindings or paid external API credential hooks detected.');
console.log('Allowed current architecture: static assets + Worker enquiry route + Turnstile + rate limiting + email to the verified destination address.');
