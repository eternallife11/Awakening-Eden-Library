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

## Why Cloudflare Pages first

For the current static HTML/CSS/JS/image/PDF architecture, Cloudflare Pages is the lowest-risk migration because it natively understands `_redirects` and `_headers`, provides GitHub preview deployments, and keeps static asset requests free. It also lets us keep GitHub as the canonical source instead of rebuilding the site inside a visual builder.

Lovable is useful as a prototype/sketch tool, but it cannot import this existing GitHub repository into a Lovable project. Rebuilding there would fork the source of truth and risk losing routes, galleries, accessibility, SEO, exact Lotus work, and the established content architecture.

## New safe public build

`node scripts/build-cloudflare.mjs`

Output: `dist/`

The build script:

- excludes `docs/` and `deliverables/` from the public artifact;
- excludes internal markdown, Claude handoff prompts, ZIP/source-design files and repository/build tooling;
- refuses any public candidate asset over Cloudflare's 25 MiB single-file limit;
- copies the existing static site unchanged otherwise;
- generates a Cloudflare-compatible `dist/_redirects` by removing Netlify-only force markers;
- drops the Netlify-only forced `404!` rules because protected source folders are absent from `dist` and therefore naturally return 404;
- preserves `_headers`, `404.html`, public PDFs, images, CSS, JS, sitemap and robots.txt.

## Cloudflare Pages setup

Initial staging setup, with **no domain cutover yet**:

- Repository: `eternallife11/Awakening-Eden-Library`
- Framework preset: none
- Build command: `node scripts/build-cloudflare.mjs`
- Build output directory: `dist`
- Initial production branch for the Pages project: `agent/awakening-eden-cloudflare-finish`
- Preview branches: enabled

Using the finish branch as Cloudflare's first production branch gives us a stable `*.pages.dev` staging URL without touching Netlify or merging into GitHub `main`.

## Pre-cutover QA gate

Do not attach or move the public domain until all are checked:

1. Homepage desktop + mobile visual hierarchy.
2. Living Library gate first, then Benjy + Sofia hero, with no overlapping dividers.
3. Exact twelve-fold Lotus remains visible and integrated, never Seed/Flower substitutions.
4. Header/footer mark, page dividers and newest illustration generation are coherent.
5. All internal links and canonical clean routes work without `.html` leakage.
6. `docs/` and `deliverables/` return 404 on the Cloudflare staging URL.
7. Old rights-unconfirmed photo URLs return 404 on staging.
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

The repository currently contains many hard-coded `awakening-eden-library.netlify.app` canonical, Open Graph and schema URLs. Do **not** change these merely for a temporary `pages.dev` preview.

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

- Connect Cloudflare Pages to the GitHub repo.
- Deploy `agent/awakening-eden-cloudflare-finish` using the safe build.
- Inspect staging visually against the latest Design Bible / Illustration Bible.
- Recover any still-local Claude comments/subtitles and add them to the finishing queue.
- Finish the Work with Benjy property-buyer messaging and real-estate-agent handout without publishing draft prices.
- Only then merge the approved finishing branch into `main` and plan the canonical-domain cutover.
