# Final creative polish · 20 November 2026 (Claude Code)

Draft only. Not merged to `main`, not deployed. Branch `claude/adoring-turing-ci16vn` (PR #52).

## Integration with PR #53

PR #53 (`codex/start-here-final-refinement-nov20`) was a stacked draft whose base was this branch and whose commits sat linearly on top of it. This branch was fast-forwarded to #53's head (`71782f0`) so the work continues on one line instead of two branches editing the same files. GitHub therefore shows #53 as merged *into this draft branch*; nothing reached `main`. All of #53's work is kept (Moinhos photos and captions, orchard comparison section and four lessons, Benjy/Sofia invitations, painted tree divider, film-link verification note). Its handoff stays at `START_HERE_FINAL_REFINEMENT_2026-11-20.md`.

## What changed in this pass

Homepage (`index.html`, new `eden-home-land.css`)
- A compact land-support band right after the opening buttons, before the Circle of Belonging painting: "Have land you'd love to bring to life?", the owners' suggested sentence, one primary **Work with Benjy** button (forest green, distinct from the gold "Start here" button) and the five topics as a plain supporting line.
- The topics are deliberately **not links**: Work with Benjy has no section per topic on `main`, #48 or #51, so separate buttons would mislead. If topic sections are added later, the list items can become links.
- Vision-art caption: removed the doubled "thriving" and the trailing "Our vision artwork."
- Merge safety: inserted between lines that PR #48 does not touch; the new stylesheet link uses #48's bundler-compatible format.

Living Library
- #53's two plain buttons became two small invitations under Benjy & Sofia's note: land support (gold accent, "Explore Regenerative Land Support") and Sofia (lilac with a mist-blue edge, "Meet Sofia").
- Start-here band now labels which resources are ours ("Our own field guides · free") and which come from outside filmmakers ("From filmmakers we admire · official sites").

Start Here
- Small land-support invitation near the top, after the three ways to begin.
- Founder buttons shortened so they no longer wrap awkwardly: "Explore Regenerative Land Support", "Meet Sofia · Yoga & wellbeing".
- Fixed: notes and follow-on paragraphs ("These photographs are field documentation…", "Mediterranean cover is a design decision…", "Read as a loop…") rendered in large display type because `.chapter-copy > p:first-of-type` styled every wrapper block's first paragraph as a lead.
- Principle cards are compact on phones (six short ideas no longer take ~2,400px).
- Diagrams (below) now arrive as `<picture>` with a portrait phone version; the lightbox (`eden-boards.js`) now handles `<picture>`. #53's 720px sideways-scrolling board was removed in favour of the portrait version.

Diagrams (`assets/educational-boards/`, source `scripts/build-educational-boards-v2.py`)
- `13-living-orchard-relationships-v2{,-portrait}.svg` replace #53's v1 on the page. v1 had canopies covering its subtitles, labels overlapping the trees, low-contrast text on dark green, and ~5px labels on a phone. v2 keeps the same honest framing ("two design conditions · not a before-and-after", "not a surveyed drainage or earthworks plan", site-conditional water/fire advice), with warmer painted edges, larger type and no overlaps. v1 file kept in the repo for rollback, unreferenced.
- `12-biomass-loop-v2` and `10-living-soil-sponge-water-v2` refined and given portrait versions with 26–33px labels.
- Content checks: photosynthesis inputs (sunlight, air/CO₂, water; nutrients from soil); 1 volumetric % point × 300 mm = 3 L/m² = 30,000 L/ha (arithmetic, explicitly not an organic-matter promise); biomass as Mediterranean fire fuel.

## Checks

- Zero-cost, visual-lock and launch-artwork guards pass; public build completes; no whitespace errors.
- No horizontal overflow, broken images or console errors on `/`, `/living-library`, `/start-here`, `/work-with-benjy`, `/sofia` at 360, 390, 768 and 1440px.
- Chromium desktop + mobile Playwright suite: see PR #52 for the final count. Tests updated for the new button names and boards; a new homepage test checks the band sits before the Circle of Belonging and that topics are not links.

## Open items for owners

1. Approve the three rebuilt diagrams (desktop and phone versions) and the homepage band.
2. Homepage "Living Library" room cards crop the top of the illustrated board inside them (present on `main` too; not changed here).
3. Work with Benjy topic sections: if wanted, add anchors (e.g. `#water-retention`) on that page in coordination with PR #51, then the homepage topics can become links.
4. Coordinate the release: #52 (now including #53), then #48, #49, #51 — test merges were clean on 18 Nov; re-run after this push. #50 stays separate.
5. Real enquiry delivery and WhatsApp were not tested from this environment.
