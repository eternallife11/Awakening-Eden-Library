# Awakening Eden — verified deploy queue + Cloudflare migration runbook

Date: 2026-08-12

## Verified state

- Current GitHub `main`: `155ae78ff966dc75fbf56b2ebf099cfb932b57f4`.
- Claude's stated last Netlify production checkpoint: `4ccd99a3d651a6344d1e74b4d8ceed764b90aa3e`.
- GitHub compare confirms `main` is exactly **4 commits ahead** of that checkpoint.
- The live Netlify homepage still shows the older order (Benjy + Sofia threshold first; Living Library gate later), while `155ae78` moves the Library gate to the top. This corroborates that the newest homepage work is not on production yet.

### The four queued commits after `4ccd99a`

1. `c72971d` — force source-folder 404s so real files cannot shadow the rules.
2. `06f88ce` — move unreferenced/publicly guessable source files under `deliverables/unserved-sources/`, including the two rights-unconfirmed orchard reference images.
3. `78422eb` — guarantee the two unconfirmed-rights photo URLs cannot be served from Netlify cache.
4. `155ae78` — paint the exact twelve-fold Lotus into the Benjy + Sofia hero, remove stacked Lotus overlays, and move the Living Library gate to the top with breathing room.

## Recovery points

- Frozen backup branch: `backup/pre-cloudflare-2026-08-12-2212`
- Safe finishing branch: `agent/awakening-eden-cloudflare-finish`
- Do not force-push or delete either branch during migration.

## Why Workers Static Assets first

For the current static HTML/CSS/JS/image/PDF architecture, Cloudflare Workers Static Assets is the preferred current platform. It understands `_redirects` and `_headers`, supports versioned preview URLs without deploying a version to production traffic, and keeps the existing static site intact. GitHub remains canonical instead of rebuilding the site inside a visual builder.

Lovable is useful as a prototype/sketch tool, but it cannot import this existing GitHub repository into a Lovable project. Rebuilding there would fork the source of truth and risk losing routes, galleries, accessibility, SEO, exact Lotus work, and the established content architecture.

## New safe public build

`node scripts/build-cloudflare.mjs`

Output: `dist/`

The build script:

- excludes `docs/` and `deliverables/` from the public artifact;
- excludes internal markdown, Claude handoff prompts, ZIP/source-design files and repository/build tooling;
- refuses any public candidate asset over Cloudflare's 25 MiB single-file limit;
- copies the existing static site unchanged otherwise;
- generates Cloudflare-compatible HTML aliases for clean routes because Workers Static Assets does not support Netlify-style `200` rewrites;
- generates a Cloudflare-compatible `dist/_redirects` containing only supported redirect status codes and removing Netlify-only force markers;
- adds a `workers.dev` `X-Robots-Tag: noindex, nofollow` safeguard to the deploy artifact while preserving production canonical/OG/schema origins;
- drops the Netlify-only forced `404!` rules because protected source folders are absent from `dist` and therefore naturally return 404;
- preserves `_headers`, `404.html`, public PDFs, images, CSS, JS, sitemap and robots.txt.

## Cloudflare Workers Static Assets preview

Initial preview setup, with **no domain cutover and no production deployment**:

- Repository: `eternallife11/Awakening-Eden-Library`
- Branch: `agent/awakening-eden-cloudflare-finish`
- Build: `node scripts/build-cloudflare.mjs`
- Config: `wrangler.jsonc`
- Assets: `dist`
- Authenticated preview-only upload: `npx wrangler versions upload --preview-alias pr-7`
- Unauthenticated expiring preview when needed: `npx wrangler deploy --temporary`

`wrangler versions upload` creates a previewable Worker version but does not deploy it to production traffic. The staging Worker has its own explicit name, `awakening-eden-library-staging`, and no custom domain or production route. Temporary previews expire unless claimed. Neither path touches Netlify or merges GitHub `main`.

The existing `land-project-enquiry` form is a Netlify Forms integration. Its submission path is a known pre-cutover blocker on Workers and must be migrated or deliberately proxied before any production cutover; do not send test leads during visual preview QA.

## Deterministic browser QA

Run:

```bash
pnpm install --frozen-lockfile
pnpm exec playwright install chromium
pnpm test:browser
```

The Playwright suite runs one worker across desktop and mobile Chromium. It checks the critical routes, horizontal overflow, browser errors, requested local resources, key CTAs, public PDFs and protected 404 paths. It also captures full-page homepage and Work with Benjy screenshots under `test-results/review/`. CI uploads the report, traces/failure media and review screenshots as a 14-day artifact. Screenshot files are review evidence, not automatically accepted visual baselines.

The browser suite uses `scripts/serve-cloudflare-preview.mjs` for stable delivery of the already-built `dist` artifact. Wrangler remains authoritative for configuration, `_headers`, `_redirects`, clean-route and custom-404 smoke checks.

Creating an external preview still requires a human-controlled Cloudflare login or acceptance of Cloudflare's Terms of Service and Privacy Policy. Stop at that prompt; do not accept legal terms on an owner's behalf.

## Pre-cutover QA gate

Do not attach or move the public domain until all are checked:

1. Homepage desktop + mobile visual hierarchy.
2. Living Library gate first, then Benjy + Sofia hero, with no overlapping dividers.
3. Exact twelve-fold Lotus remains visible and integrated, never Seed/Flower substitutions.
4. Header/footer mark, page dividers and newest illustration generation are coherent.
5. All internal links and canonical clean routes work without `.html` leakage.
6. `docs/` and `deliverables/` return 404 on the Cloudflare preview URL.
7. Old rights-unconfirmed photo URLs return 404 on preview.
8. Public PDFs and guide downloads work.
9. WhatsApp, Telegram, Spotify, PayPal and external links work.
10. Enquiry/contact workflow is tested end-to-end.
11. No console errors or mixed-content warnings.
12. No horizontal mobile overflow.
13. Lighthouse/accessibility/performance spot-check.
14. Sitemap and robots.txt are correct.
15. Social preview image and Open Graph metadata are correct.
16. No draft €95 / €225 pricing is public until Benjy explicitly approves it.

## Canonical URL cutover

The repository currently contains many hard-coded `awakening-eden-library.netlify.app` canonical, Open Graph and schema URLs. Do **not** change these merely for a temporary `workers.dev` preview.

Once the final public domain is chosen:

1. replace the Netlify origin with the final canonical domain in one controlled branch;
2. update sitemap and social metadata;
3. verify every route;
4. attach the domain to Cloudflare;
5. keep Netlify intact temporarily as rollback/fallback;
6. redirect the old Netlify-facing public origin only when the new domain is verified.

## Development process going forward

1. `main` = approved production source.
2. One task/feature per branch or worktree.
3. AI agents may edit branches, but never become the source of truth.
4. Every visual change gets a preview URL and mobile/desktop check.
5. Merge only after human visual approval and automated integrity checks.
6. Batch small changes into releases instead of production-deploying every prompt.
7. Keep internal source assets outside the public build artifact.
8. Preserve a dated backup branch before hosting migrations or major visual-system changes.

## Next implementation steps

- Authenticate Wrangler to the intended Cloudflare account when available.
- Upload `agent/awakening-eden-cloudflare-finish` as a preview-only Worker version using the safe build.
- Inspect staging visually against the latest Design Bible / Illustration Bible.
- Recover any still-local Claude comments/subtitles and add them to the finishing queue.
- Finish the Work with Benjy property-buyer messaging and real-estate-agent handout without publishing draft prices.
- Only then merge the approved finishing branch into `main` and plan the canonical-domain cutover.
