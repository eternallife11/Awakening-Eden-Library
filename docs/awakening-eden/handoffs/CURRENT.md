# Awakening Eden — Current Work Handoff

_Last updated: 3 October 2026_

This is the durable current-status handoff for the next ChatGPT / Codex / Claude website session. Git history retains the longer historical handoff that preceded this concise version.

## Canonical source

- Repository: `eternallife11/Awakening-Eden-Library`
- Canonical branch: `main`
- Latest approved website merge before this handoff: `72595937f44903e9a64451ca90e838d023c7564f`
- No open pull requests remain after the 3 October 2026 cleanup.
- Old superseded PRs #10, #11 and #29 were closed without merging over newer work. Their branches remain recoverable in GitHub history.
- Netlify is a frozen rollback / legacy public snapshot, not the working source of truth.

## What is merged now

### Work With Us

PR #33 was merged into `main` as `42710aa3bd5858f1d3463a81a66b4c2339f0df30`.

`/work-with-us` is the professional umbrella pathway for:

- regenerative projects and collaborations
- workshops and field learning
- direct Work with Benjy land services
- the Living Library and wider regenerative network
- future village / sanctuary vision, clearly framed as future work rather than an existing built village

Its review included production Cloudflare artifact build, focused desktop/mobile browser QA, accessibility/no-overflow checks, Worker tests and local performance review.

### Village Vision

PR #34, **Village vision: living lineage, lived learning, purpose lock and thriving economy**, was merged into `main` on 3 October 2026 as `72595937f44903e9a64451ca90e838d023c7564f`.

The merged `/village-vision` now includes:

- the founders' lived learning across roughly a decade, including parts of Asia, 6–7 years in Australia, Colombia and around two years in Portugal
- a Living Lineage of Learning: Indigenous / ancestral wisdom, Portuguese / Mediterranean / Celtic land traditions, regenerative practice and ecovillage learning
- explicit attribution, permission, reciprocity and learning-back principles: **we learn with, not take from**
- Zach Bush's Biological Renaissance, Roots Rural and ORIGIN as inspirations, not claimed affiliations
- a careful emerging-science / quantum-biology boundary: frontier research is not used as proof for spiritual claims
- a concise regenerative values compass: regeneration, interbeing, compassion for all beings, freedom with responsibility, organic/place-based living, co-creation, purposeful abundance and progress over purity
- concrete regenerative living-economy pathways
- practical purpose-lock and decentralisation / subsidiarity language
- independent Portuguese legal, property, planning, tax, accounting, insurance and cooperative/community-law review before major commitments
- the correction from “Seven relationships” to “Eight relationships”

PR #34 changed only `village-vision.html`. Its Public build safety check completed successfully before merge.

## Visual and truth lock

Preserve the approved Awakening Eden visual language:

- rich painted / botanical artwork
- real photography as the trust layer
- the exact deterministic twelve-fold Lotus of Life only
- never substitute Seed of Life / Flower of Life geometry
- no duplicate imagery unless intentionally designed

Truth boundaries remain essential:

- future village language must remain future-facing until land, permissions and structures are real
- concept imagery must not be presented as completed work
- no claimed partnerships unless formally established
- spiritual / poetic language must remain distinct from scientific claims
- medical / detox language must remain appropriately bounded

## Cloudflare production status — still the release gate

**Do not claim `awakeningeden.org` is live until it has been directly verified over HTTPS.**

The repository is production-ready in code, but GitHub does not currently contain an automatic production-deploy workflow. `.github/workflows/public-build-check.yml` is triggered by pull requests and performs builds, dry-runs and QA; it does not deploy to the custom domain.

Production configuration exists in `wrangler.production.jsonc`:

- Worker: `awakening-eden`
- `workers_dev: false`
- custom-domain route: `awakeningeden.org`
- production public origin: `https://awakeningeden.org`
- static assets: `./dist`

The last durable domain note recorded that Cloudflare authentication / human verification blocked the production cutover. The account zone and DNS therefore still need direct confirmation.

### Remaining production cutover

1. Authenticate to the Cloudflare account that owns the Awakening Eden Worker / zone.
2. Confirm `awakeningeden.org` is Active and inspect apex / `www` DNS for conflicts.
3. Build from current `main` using the production build path.
4. Deploy using `wrangler.production.jsonc`.
5. Verify live HTTPS for at least:
   - `/`
   - `/work-with-benjy`
   - `/work-with-us`
   - `/living-library`
   - `/about`
   - `/village-vision`
   - `/village-research`
   - `/sitemap.xml`
   - `/robots.txt`
   - a deliberate 404
6. Verify redirects, canonical metadata, desktop/mobile rendering and assets.
7. Set a path-preserving `www` redirect if required.
8. Keep the enquiry form hidden unless its production mail / anti-abuse configuration is explicitly reviewed and approved.

Follow `docs/AWAKENINGEDEN_ORG_CUTOVER_2026-09-27.md` for the domain-cutover checklist.

## Known staging / fallback state

The previously verified Cloudflare staging route is:

`https://awakening-eden-library-staging.holisticmission8.workers.dev/`

Earlier releases, including Work with Benjy, were verified there. Do not assume the newest `main` merge is deployed to staging without a fresh live check.

The legacy Netlify copy may still be discoverable publicly. Treat it only as rollback / historical fallback and do not use it as the editing source.

## Next website action

The major remaining release action is **Cloudflare production deployment + live verification of current `main`**. Do not redesign or add more website features merely to avoid that cutover step.

After production is genuinely live, the next useful work is operational rather than another redesign:

1. verify Search Console / sitemap indexing for `awakeningeden.org`
2. verify the Work With Us and Work With Benjy lead pathways
3. keep adding real case-study proof as it exists
4. connect outreach, content and the new Village Sanctuary business plan to the existing pages
5. keep future website changes incremental and evidence-led

## Working protocol

Before substantial future edits:

1. Read `AGENTS.md` and this handoff.
2. Confirm current `main`, open PRs and recent CI before editing.
3. Read the relevant locked design / content source.
4. Make the smallest coherent change on an isolated branch.
5. Keep HTML, CSS and runtime JS aligned.
6. Run public-build and browser QA before merge.
7. Inspect visual changes on desktop and mobile, not only test status.
8. Merge only after green checks and human visual sanity review.
9. Verify the live Cloudflare route after any production deployment.
10. Update this handoff with exact commit, tests, live status and unresolved release gates.
