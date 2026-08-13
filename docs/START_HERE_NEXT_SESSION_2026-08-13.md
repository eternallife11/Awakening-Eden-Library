# Awakening Eden — Start Here Next Session

Date prepared: 2026-08-12

## Safe current state

- Canonical production source: `main`
- Current `main`: `155ae78ff966dc75fbf56b2ebf099cfb932b57f4`
- Protected finishing branch: `agent/awakening-eden-cloudflare-finish`
- Frozen recovery branch: `backup/pre-cloudflare-2026-08-12-2212`
- Draft PR: #7 `Prepare safe Cloudflare staging and finish queue`
- Do **not** merge PR #7 or move the public domain before visual + functional review.

## Important verified deployment state

Claude's last handoff said Netlify production stopped publishing after commit `4ccd99a` and that four later commits were pushed but unpublished. GitHub comparison confirms `main` is exactly four commits ahead of `4ccd99a`.

Those later commits include:
- forced source-folder protection;
- moving unreferenced / rights-unconfirmed source files out of the served root;
- explicit protection of the two rights-unconfirmed orchard masters;
- final homepage top-order / baked-in exact Lotus update.

Netlify Deploy Previews are still working for PR #7. Production is not the place to experiment while credits are constrained.

## Tomorrow's first action

Build the safe public artifact, then upload a Cloudflare Workers Static Assets version for preview without deploying it to production.

Use:
- Repository: `eternallife11/Awakening-Eden-Library`
- Branch: `agent/awakening-eden-cloudflare-finish`
- Build command: `node scripts/build-cloudflare.mjs`
- Assets directory: `dist`
- Wrangler config: `wrangler.jsonc`
- Safe authenticated preview: `npx wrangler versions upload --preview-alias pr-7`
- Do **not** attach the final public domain yet.

The preview command creates a versioned `workers.dev` URL without deploying that version to production traffic. If Cloudflare credentials are not available, Wrangler 4.102.0 or later can create an expiring temporary preview with `npx wrangler deploy --temporary`; claim it within the printed window only if it should be retained.

Run `pnpm test:browser` before uploading the preview. It performs the required desktop/mobile route and layout checks and writes review screenshots under `test-results/review/`. Cloudflare authentication or Terms acceptance must be completed by an owner; stop when Wrangler requests either.

The current GitHub CI already proves the public artifact can be built safely and excludes internal docs, deliverables, source ZIPs, agent instructions, unconfirmed-rights masters and oversized assets.

## Visual review order

Review both desktop and mobile in this order:

1. Living Library gate is at the top.
2. Adequate breathing room below it.
3. Benjy + Sofia hero follows as its own chapter.
4. Exact twelve-fold Lotus is painted into the hero roots and does not look like a sticker / overlay.
5. No stacked Lotus appears on the Living Library artwork.
6. No overlapping divider or old cheap visual layer remains.
7. Header identity remains the approved painted compact mark.
8. Real photography remains the trust layer.
9. Mobile has no horizontal overflow or awkward crop.
10. CTAs remain calm, clear and useful.

## Cloudflare functional QA

Before any domain cutover:

- test `/`, `/start-here`, `/living-library`, `/journey`, `/sofia`, `/work-with-benjy`, `/events`, `/journal`, `/links`, `/about`, `/heart`;
- test public PDFs;
- test WhatsApp, email, Telegram, Spotify and other intentional external links;
- verify `_redirects` route behavior;
- verify `_headers` behavior and security headers;
- verify `robots.txt` and `sitemap.xml`;
- verify `/docs/*` and `/deliverables/*` are not public;
- verify the two rights-unconfirmed orchard masters are not reachable;
- verify no public file exceeds 25 MiB;
- verify canonical / OG / schema origins are not changed to a temporary `workers.dev` URL;
- only update canonical origins once the final production domain is chosen.

## Copy / content queue

Still gather any wording that exists only in Claude/local drafts and never reached GitHub. Especially:
- missing subtitles;
- unpublished proof comments;
- final homepage microcopy;
- Work with Benjy offer wording;
- property-buyer / real-estate referral handout;
- journal/video captions;
- any final Benjy/Sofia decisions from the last local Claude session.

Do not guess missing text. Recover/export it or make a fresh explicit decision.

## Pricing lock

The discussed €95 / €225 prices remain private planning values only. Do not publish them in page copy, schema, social copy or the agent PDF until Benjy explicitly approves publication.

## Design authority

Read before visual work:

1. `AGENTS.md`
2. `docs/awakening-eden/LOCKED_DECISIONS_2026-08-11.md`
3. `docs/awakening-eden/design/Awakening_Eden_Design_Bible_v3.1_Lotus_of_Life_2026-08-11.pdf`
4. `docs/awakening-eden/design/Awakening_Eden_Illustration_Bible_v1.2_Lotus_of_Life_2026-08-11.pdf`
5. `docs/awakening-eden/design/ASSET_DECISION_REGISTER_v3.2.md`
6. `docs/awakening-eden/design/PAGE_BY_PAGE_VISUAL_COVERAGE_MATRIX_v3.2.md`

Non-negotiable: exact twelve-fold Lotus of Life only. Never Seed/Flower substitutes.

## Recommended agent workflow

Use Codex / Claude Code / ChatGPT Work as implementation helpers around the same canonical repo, not as separate versions of the site.

For every meaningful change:
1. read the relevant locked guidance;
2. inspect current implementation;
3. use an isolated branch/worktree;
4. make the smallest coherent change;
5. run the public build and integrity checks;
6. generate a preview;
7. review visually on desktop + mobile;
8. only then merge deliberately.

Lovable can remain a prototype greenhouse for isolated new ideas. Do not rebuild the current site there.

## Existing planning docs

- `docs/AWAKENING_EDEN_FINISH_AND_CLOUDFLARE_QUEUE_2026-08-12.md`
- `docs/CLOUDFLARE_MIGRATION_RUNBOOK_2026-08-12.md`
- root `AGENTS.md`

## Final principle

One source of truth, many useful helpers. Preserve what works, subtract incoherence, preview before production, and never let a tool create a parallel Awakening Eden universe.
