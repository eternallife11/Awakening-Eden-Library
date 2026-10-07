## Live release verified — 7 October 2026

- Published to https://awakeningeden.org with Cloudflare version `d2f0da1f-c2e6-469b-bc1b-2a4271f270a3`. Implementation commit `6bf0799`; subsequent build fix handles case-only guide aliases on macOS with explicit redirects.
- Live Home, Work With Benjy, Work With Us, Village, Library, Library script and both new gallery assets matched the tested build byte-for-byte. Clean main/service/Library routes return 200. Final live checks confirm Thriving, 7 First Steps, Abundant Edge and Small Scale Farm guide shortcuts return 200 after redirect repair.
- GitHub synchronization remains outstanding: HTTPS push failed because no GitHub credentials are available (`could not read Username`). Source is committed locally. Remote main remains `52af6ee`; do NOT deploy that older source over this release. Next session: restore GitHub authentication, fetch/check ancestry, push the local release without force.
- Next content batch: use `EDUCATIONAL_VISUALS_AND_GUIDES_2026-10-07.md` for three guide visuals/video briefs, then review each small Terra implementation. No new AI artwork was generated. Exact six painted navigation card reproductions remain a separate visual refinement.

## Current release preparation — 7 October 2026

Newest owner request authorizes implementation and publication. Branch `codex/work-with-benjy-real-projects-2026-10-05` incorporates production `52af6ee` through merge `20e59ac`. Older preview-only notes below are historical.

- Benjy page now leads with six real project/gallery images, three outcomes, clear packages and detailed planting-plan deliverables. Regeneration, permaculture and syntropic principles follow services. Includes specialist biopool coordination and natural fencing.
- Library founder story, sanctuary why and gift invitation reflect the owners' compassionate, practical hope language.
- Educational image/guide plan: `docs/awakening-eden/proposals/EDUCATIONAL_VISUALS_AND_GUIDES_2026-10-07.md`. No new generated artwork in this pass.
- Production build and visual-lock/zero-cost checks passed. 12 focused browser checks and 8 page/internal-link checks passed across desktop/phone. Desktop/phone Benjy gallery screenshots reviewed under `test-results/review/benjy-gallery-{1440,390}.png`; no missing images or page overflow. Earlier full suite passed 102/102 and Worker tests 13/13.
- Release pending: commit, fast-forward production source, deploy Cloudflare production and verify public pages. Do not infer live status from this preparation record.

# Awakening Eden — Current Work Handoff

_Last updated: 5 October 2026_

## Homepage, Library and invitation review — latest pass

- Added homepage opening actions for Work With Us and regenerative design/consulting; changed the promise to “Hope grows when we put it into practice.” Strengthened Library copy around inspiring films, documentaries, books, platforms and one useful action.
- Added direct WhatsApp invitations on the homepage and Village Vision page for aligned collaborators, partners and possible funding support. The village remains clearly presented as future work.
- Corrected the Work With Us gallery: replaced a phone screenshot inadvertently used as a garden image with the clean Casa Oasis hillside photograph.
- The supplied painted Library header is active. The four homepage cards are accessible botanical adaptations, NOT exact reproductions of the supplied four-card sheet. The six-card sheet remains an unimplemented navigation direction under the visual lock. Do not claim exact visual matching.
- The earlier package/gallery expansion is now implemented locally on both service pages; the older “not yet implemented” note below is superseded.
- Latest build, zero-cost guard and visual-lock guard passed. Eight focused desktop/phone tests passed for homepage actions, service hierarchy and Library search. Sitewide audit finished: 102/102 passed across desktop and phone, including all public HTML routes, local assets, anchors, overflow, browser errors and internal link resolution. Screenshot captures were produced for 18 primary routes per viewport; close-up visual inspection covered the homepage doors, founders artwork and phone homepage/Library opening.
- Inspected close-up desktop doorway and founders artwork plus phone homepage and Library opening. Evidence in test-results/review/. These are local changes, not a verified live deployment.

## Latest owner direction — packages, gallery and Terra execution

- Sofia supplied the Syntropic Food Forests & Abundance Gardens collection with seven examples and indicative establishment budgets; requested it near the top of both service pages, direct WhatsApp after the Work With Us introduction, and a stronger mostly caption-free real-photo gallery.
- Exact specification: `docs/awakening-eden/proposals/EDEN_SANCTUARY_GARDENS_TERRA_EXECUTION_2026-10-05.md`. This addendum is saved and linked into the consolidated queue. Package/gallery expansion is not yet implemented. Current preference is GPT Terra for the execution pass; no background Terra job was started in this planning turn.
- The latest request authorizes implementation and pushing the reviewed work. It supersedes older pending-approval handoff notes for that same scope; verify the implementation, preview, CI and actual deployed pages through the existing release workflow.

## Service-page implementation — 5 October 2026

- Branch: `codex/work-with-benjy-real-projects-2026-10-05`, based on `9ef91b9`. Work With Benjy now leads with **Eden Sanctuary Gardens** and the existing public starting prices: €111, from €450 / €650 on site, from €1,500, and custom implementation scope. No new price points were invented.
- Owner-confirmed project context is now public in the selected-work and workshop sections: **Moinhos, Algarve** retreat permaculture gardens managed and improved by Benjy; **Casa Oasis** bean trellises beside raised beds; **Luisa + Sim, Tabua / Oliveira do Hospital** curved food-forest rows beside the levada, permanently marked as a concept; **Moinhos guest workshop** on regenerative and degenerative industrial systems, permaculture and syntropic agroforestry. Cairns collaboration is recorded in the internal caption register and remains out of the service-page proof gallery for now.
- Work With Us now names the direct Eden Sanctuary Garden pathway and sends people to the clear four-offer service page. Its opening three-image story now follows a truthful sequence: an existing olive garden in Tabua / Oliveira do Hospital, the clearly labelled Luisa + Sim food-forest-edge concept beside the levada, and Benjy working at Moinhos in the Algarve. Caption records and the consolidated plan were updated with the corrected source identity and the new public-offer architecture.
- Living Library reliability is now repaired too: all four lower-case field-guide routes are exercised in browser tests; search cards visibly match the result count; a Library shelf link clears an old search before navigating; and Lighthouse reports/configuration are excluded from the public artifact. The Abundant Edge guide now names itself consistently in the visible heading.
- Verification passed: production build, zero-cost guard and visual-lock guard; 13 Worker tests; focused desktop/mobile browser suite 12/12 covering service pages, guide routes, search, enquiry choices, implementation guidance and imagery; and the latest Work With Us desktop/mobile check after the opening-gallery revision. Local desktop and 390px phone visual inspection found no broken assets or horizontal overflow. This is a local branch preview only: no commit, push, PR merge or production deployment has happened.
- Next: owner review of the completed service-page preview. The Living Library already has four hopeful/practical arrival paths; its next content pass should validate and feature individual sources without adding unverified claims. The current implementation should be committed after the owner confirms it is ready.

## Archive and consolidated gallery queue — 5 October 2026

- Latest owner order: Work With Benjy first, Living Library second, Work With Us next; guides/phone/content work follows. Service-page implementation is now ready for owner review in the local branch.
- Saved all 148 supplied file references as 135 unique originals (128 still images / seven videos), 13 byte-identical duplicates, no missing files; verified ZIP integrity. Archive and index are under the project workspace `awakening-eden-image-library/`, outside the website repository/public build. Six contact sheets reviewed; videos archived but not viewed.
- New consolidated proposal: `docs/awakening-eden/proposals/CONSOLIDATED_GALLERY_AND_TERRA_PLAN_2026-10-05.md`. Found teaching photo and two plan-sample candidates; confirm event/project/authorship and anonymise names before public use. Benjy/Sofia portrait, property-overview and garden/process shortlist recorded.
- No merge or deployment in this pass. Next large folder can be appended as another dated archive/index snapshot. Next: owners review the completed service pages; then curate individual Library sources and continue the guide/phone pass.

## Photo intake — 5 October 2026

- First owner upload reviewed: 19 named files / 20 inline images (one duplicate). Register: `docs/awakening-eden/proposals/IMAGE_BATCH_01_2026-10-05.md`. No public edits or deployment.
- Owner confirms the first two Amba terrace photographs are **Melides**, with food-forest and green-manure restoration planting. They visually match the older olive-terrace sequence labelled Moinhos; confirm the full sequence and correct project captions before publication. Keep the separate citrus/Moinhos garden story distinct.
- Strong new candidates: Melides mulched terraces, Moinhos bottom-garden view, Benjy at Carole's garden, and wood/biomass process detail. Generated/concept and outside-reference status remains pending for other images. A source-context question was sent in chat.
- Next: finish image intake; confirm roles/dates/concept sources; revise placement proposal; prepare Terra preview with accurate project labels. Teaching photo and real plan sample are still useful optional additions.

## Planning review — 4 October 2026

- Latest request is proposal-only: improve Work With Us / Work With Benjy image selection, teaching visuals, property clarity and service presentation; implementation remains for a later Terra pass.
- Proposal: `docs/awakening-eden/proposals/SERVICE_PAGES_IMAGE_PROPOSAL_2026-10-04.md`, with three visual contact sheets and filename keys beside it. Reviewed 48 candidate entries (including duplicates) and the previous live desktop/mobile screenshots. Local checkout: `codex/oct-03-botanical-portals`, HEAD `9ef91b9`. No site code, prices or public assets changed; no commit, PR, merge or deployment in this pass. Documentation remains local/uncommitted.
- Today's fresh live browser retrieval timed out. Do not describe this as a new production verification. The earlier 3 October audit recorded the published main pages loading; the old pre-release sections below are historical and their draft/unpublished claims must be reconciled against GitHub before implementation.
- Next: review the proposed placements; collect a whole-property original, a current dated progress photo, a teaching photo and an anonymised real deliverable; implement a small preview from current production source; verify desktop/mobile and accurate captions; request owners' visual review before publication.



This is the durable current-status handoff for the next ChatGPT / Codex / Claude website session. Git history retains the longer historical handoff that preceded this concise version.

## Current review — 3 October botanical visual lock

- Draft stacked PR [#36](https://github.com/eternallife11/Awakening-Eden-Library/pull/36), branch `codex/oct-03-botanical-portals`, implementation commit `34a51652afcbaeea21af1059eb155aa9f2288b65` with tree `b9d682dd2c70daf7aae3559877e8c19474f5d3b8`, is based on draft PR #35 at `0adeda6068573d0c79630a2408eb02de0e5a2af9`. A handoff-only commit follows the implementation commit. The PR is mergeable and remains draft; GitHub Actions run `37146547871` was in progress at this handoff.
- Sofia's 3 October six-image package is preserved under `docs/awakening-eden/design/references/2026-10-03/`, outside the public build. `VISUAL_LOCK_2026-10-03.md` and the Design/Illustration Bible addenda are the new dated visual authority. Earlier locks/registers point to it. The cards and ornament originals contain uncertain geometry; they are design references, not public image assets.
- The brighter many-person circle remains the homepage Circle of Belonging. Its unverified painted root disc was removed; the canonical exact twelve-fold SVG is layered in the roots on Home, About, Work With Us and Village Vision. The new book/tree/hummingbird art is the Library header and a smaller homepage image, also with the exact SVG overlay. The earthier six-person art sits beside the Village Vision text with a rooted exact SVG. Four concise botanical HTML link cards follow the opening vision.
- Verification: production-origin Cloudflare build (383 files, 109.1 MiB), zero-cost and visual-lock guards passed. The full desktop/mobile site suite passed 58/58, with no broken local assets, overflow or console errors. After visual correction of an oversized Lotus and shortening the card text, focused screenshot checks passed 8/8 and final homepage checks 4/4. Desktop/mobile close-ups of the circle, cards, Library and second village illustration were reviewed. This is a preview, not a live release.
- Next: (1) confirm PR #36 CI; (2) review both draft PRs' desktop/mobile previews with Benjy and Sofia; (3) incorporate real Work With Us photos when supplied, without guessing project proof; (4) merge #35 then #36 only after visual approval; (5) deploy and verify the custom-domain pages and actual image URLs. Do not claim the live site has the new 3 October artwork until that final check.

## Base review — Circle of Belonging correction

- Draft PR #35 on `codex/approved-community-circle-v36-2026-10-03` carries Sofia's 1 October selected brighter community-circle image and its responsive companion. This branch incorporates `main` through `fe0857d`, including the merged Village Vision copy from PR #34. The separate Sanctuary Clarity worktree remains untouched.
- The homepage, Village Vision, About and Work With Us use the v36 artwork. The old homepage `eden-v23.js` rewrite had replaced the Circle of Belonging after load with an earlier two-person image; its stale homepage mutations were removed. The authored HTML now controls the image and opening actions. A stray literal `\\n` was removed from the homepage.
- Verified locally: production-origin public build and zero-cost/visual-lock checks; Worker tests 13/13; homepage desktop/mobile assertions; 24/24 critical-route desktop/mobile browser checks without overflow, broken images or console errors. Close-up desktop/mobile screenshots of the circle and Village Vision were reviewed. The painted Lotus was visually inspected, but the static guard does not mathematically certify raster geometry.
- Production state: draft review only. The public site still showed the old image at the pre-release check. Obtain the owners' production approval under the team workflow, confirm CI and the diff, then merge and verify the live DOM, image URL and screenshots. Preserve the v35 files for rollback. Keep broader village copy and new photography in separate work.

## Canonical source

- Repository: `eternallife11/Awakening-Eden-Library`
- Canonical branch: `main`
- Latest approved website merge before this handoff: `72595937f44903e9a64451ca90e838d023c7564f`
- Draft PR #35 is open for the Circle of Belonging correction; the earlier cleanup closed superseded PRs.
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
