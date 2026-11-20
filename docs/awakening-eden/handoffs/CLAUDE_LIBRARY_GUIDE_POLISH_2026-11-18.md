# Living Library + Awakening Regeneration polish · 18 November 2026 (Claude Code)

Draft, not merged, not deployed. Branch `claude/adoring-turing-ci16vn`, based on `main` `260967d` (PR #47 release, which is what awakeningeden.org serves today).

Written as a separate file on purpose: open PRs #48 and #49 both insert at the top of `CURRENT.md` and already conflict there. Add a one-line pointer to this note in `CURRENT.md` when this branch merges.

## Coordination

- Files changed: `awakening_eden_regenerative_film_resource_library_updated.html` (body + one preload line), `eden-library-v23.css` (appended block + nothing removed), `Awakening-Regeneration.html` (body only + stylesheet version), `eden-guide-v23.css` (appended block), `tests/browser/site.spec.mjs` (one locator), new assets listed below.
- Not touched: homepage, About/Journey, Regenerate Together, Work with Benjy, sitemap, `_headers`, `_redirects` — these belong to PRs #48, #49 and #51. PR #50 (Creation Studio) kept separate.
- Test merges of this branch with each of #48, #49, #51 and #50 completed with no conflicts (18 Nov).

## What changed

Living Library
- Front door order: hero → search + four photographic pathways (the existing Regenerate Land / Nourish Body / Expand Perspective / Build Community, with real approved photos already published elsewhere on the site) → two free guides, three first field guides, three first films → Benjy & Sofia → living networks → shelves.
- Removed three duplicated blocks (featured platforms, "Two clear ways in", "Watch. Read. Practise. Share."). Each resource in them still appears once; Project Biome moved into the networks list.
- Fixed: the networks cards were squeezed into one-word columns by the search card's two-column grid; every shelf had zero side padding, so cards and section icons touched the screen edges on desktop and phone (live bug on main).
- Phones: shelves are swipeable rows. Mobile page height ~54,600px → ~23,300px. No horizontal page overflow.
- Hero: WebP derivatives of the exact locked PNG (`…oct03-no-geometry-{960,1672}.webp`, 205 KB / 458 KB vs 3.3 MB). PNG unchanged and still the fallback; Lotus overlay position unchanged.

Awakening Regeneration
- Start card now has the free PDF link it promised; "in preparation" items are quieter (and collapse to titles on phones).
- "Go deeper" lists at the end of Read the whole place, Soil, Abundant Edge, Syntropy and Mediterranean, linking our field guides and original sources (Agenda Götsch, Seeds of Syntropy, Water Is Love, Symphony of the Soil, Dirt to Soil / For the Love of Soil in the Library).
- Rebuilt boards as SVG with the approved wording: `12-biomass-loop-v2.svg` (new placement in Syntropy) and `10-living-soil-sponge-water-v2.svg` (replaces the raster in the Mediterranean "Go deeper"). The rasters had text running past their boxes and labels illegible on the soil colour. One wording correction: photosynthesis turns "sunlight, air, water and soil nutrients" into biomass (was "sunlight, water and nutrients"). Old rasters kept for rollback and still used on Abundant Edge / Heart.
- Phones: the six seed-to-tree stages are one swipeable row.

## Checks

- Zero-cost and visual-lock guards pass; public build completes.
- Chromium desktop + mobile Playwright suite (local, Playwright 1.62.1 against the pre-installed Chromium): first full run 221/224; the 3 failures were caused by this branch (a CSS arrow inside the pathway link names; the new phone-scrollable growth row lacked keyboard focus) and are fixed. Re-run of site + accessibility specs 78/78. Firefox/WebKit projects not run here; CI must run them.
- External links on Library, Guide, Home, About, Journey, Regenerate Together and Work with Benjy (178) checked by HTTP. Bot-blocking 403/429 responses (YouTube, Chelsea Green, HarperCollins etc.) are not dead links. Real problems below.

## Open items for owners

1. Kiss the Ground link `kissthegroundmovie.com` returned 503 repeatedly on 18 Nov; a replacement official URL could not be verified from here.
2. `natureza-portugal.org/o_que_fazemos_222/agua_/` (Work with Benjy) refuses connections from this environment — check from a normal browser.
3. Library copy says Water Is Love covers "Portugal and beyond"; the film's watch page does not mention Portugal. Confirm or soften.
4. Approve the two rebuilt SVG boards (style is flatter than the painted boards, matching the originals' flat style).
5. Approve use of four already-published project photos as Library pathway images (olive pruning, Sofia yoga, Benjy teaching, cork-oak gathering).

## Next actions

1. Owner desktop + phone review of the preview / screenshots.
2. Run full CI (Firefox/WebKit, Axe) on the PR.
3. Decide merge order with #48 (head/metadata of the same two pages — merges cleanly).
4. Consider using the rebuilt SVG boards on Abundant Edge and Heart too.
