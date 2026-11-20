# Start Here final refinement · 20 November 2026

## Scope and branch

- Branch: `codex/start-here-final-refinement-nov20`.
- Based on Claude Code's **open draft PR #52** branch `claude/adoring-turing-ci16vn`, not `main`, so the established Library and Awakening Regeneration refinements are retained.
- Intended pull request base: `claude/adoring-turing-ci16vn`. This is a **stacked draft PR**. Rebase/retarget to the actual integrated release branch only after #52 is approved.
- **No merge, deployment, publication, new paid service, or Eden Designer edits.**

## Verified starting point

- `main` remained at the November 5 PR #47 release when inspected.
- #48 (SEO and performance), #49 (personal manifesto), #51 (Work with Benjy) and #52 (Library and Guide) remained open. #50 Creation Studio is separate internal tooling.
- PR #52 already added four photo-led Library pathways, calmer mobile shelves, five Go Deeper panels and two corrected diagrams. These are preserved rather than rebuilt.
- The current guide had an older `celtic-tree-of-life.webp` divider and lacked a direct personal Benjy/Sofia action band near the end. Older and newer illustrated boards coexist.
- Confirmed original Moinhos orchard photo asset paths and their descriptions against the Work with Benjy source. These are **different views and moments**, never a matched before/after pair.
- Direct real-time visual verification of the public website and unsaved laptop files was **not available in this environment**.

## Proposed implementation

1. **Guide** `Awakening-Regeneration.html`: replace one older divider reference with the existing premium tree-and-hummingbird painted asset, insert two real project photos with truth labels, and place a concept-only illustrated Mediterranean orchard comparison and four explanatory cards after the climate chapter.
2. Add a short grounded founder passage and two clear options: **Work with Benjy** (online/on-land land design, consulting, project management) and **Meet Sofia** (explore yoga and wellbeing, private offerings by conversation).
3. **Library**: add two short, legible founder-action links below the existing personal note, without changing Claude's four resource pathways, film collection or search.
4. **Styles** `eden-guide-v23.css`, `eden-library-v23.css`: calm responsive layout; lilac and mist blue restricted to Sofia's block; accessible buttons; legible field photo labels; phone scroll for SVG.
5. **Educational board** `assets/educational-boards/13-living-orchard-relationships-v1.svg`: original editable comparison of exposed ground and covered, diversified orchard. It explicitly says `illustrative`, `not matched before/after`, and `not a surveyed drainage or earthworks plan`. Not used as measured implementation advice.
6. **Tests** `tests/browser/site.spec.mjs`: new assertions for photo provenance text, SVG delivery, four comparison lessons, both founder routes, and screenshot captures at desktop and phone.
7. CSS cache versions updated on both affected pages.

## Safeguards

- No generic AI-generated real-world photos or invented finished transformation.
- Project images are original repo assets already shown on the public Work with Benjy page. Do not infer measurable outcomes.
- Existing roots/Lotus artwork, originals and established major paintings remain unchanged.
- The real project's exact site data and coordinates are not published.
- For Mediterranean contexts, infiltration, fire clearance, overflow, species selection and establishment work are explicitly conditional on site assessment.
- No claim that Sofia has a fixed-bookable offer; the invitation leads to her existing contact-first page.
- Footer and existing navigation routes preserved.

## Required QA before review or merge

Run:
```sh
node scripts/check-zero-cost.mjs
node scripts/check-visual-lock.mjs
node scripts/build-cloudflare.mjs
node scripts/check-launch-artwork.mjs
npx playwright test tests/browser/site.spec.mjs
```

Check all Chromium/Firefox/WebKit projects, where supported; desktop, tablet and a ~390px phone. Review at least:
- `/start-here#field-journey`
- `/start-here#land-resilience`
- `/start-here#grow-with-us`
- `/living-library` founder action links
- `/work-with-benjy` and `/sofia` destinations.

The screenshot test saves:
- `test-results/review/<project>/start-here.png`
- `test-results/review/<project>/start-here-real-project-photos.png`
- `test-results/review/<project>/start-here-regeneration-comparison.png`
- `test-results/review/<project>/start-here-founder-invitations.png`

**Not yet verified in a real browser**: no final visual approval, before/after captures, photo crop inspection, SVG text legibility and CSS overflow. An automated PR build is not a substitute for human desktop/phone review.

## Pending decisions

1. Benjy and Sofia: visually approve the selected Moinhos photos and the new SVG concept board. Confirm whether the existing regenerative-engine artwork earlier in the guide should remain, or whether it is the exact "old bottom diagram" to replace.
2. Review whether the natural tree-and-hummingbird divider has an appropriate aspect ratio at all breakpoints.
3. Approve the newer Work with Benjy offer wording in PR #51 before any integrated release; do not accidentally publish unapproved prices.
4. Coordinate #48, #49, #51, #52 and this stacked branch in one reviewed release candidate. Separate #50.
5. Resolve Claude's PR #52 questions about the Kiss the Ground official link and the unverified Portugal reference in the Water Is Love description.
6. Compare any more recent laptop-only changes and protect them. A GitHub review cannot certify that work is synchronized.
7. Provide before/after screenshots from a matched browser environment, including PR #52 baseline and this branch.

## Claude final creative review (short)

- Is the human invitation memorable, not sales-heavy?
- Are illustrated explanations both beautiful and accurate on a phone?
- Are the four Library pathways and Benjy/Sofia links immediately understandable?
- Are the real-photo captions honest about what is observed versus proposed?
- Does the guide feel like one calm field journal rather than stacked visual themes?

Do not rewrite previously approved copy or start another broad redesign. Leave specific BLOCKER / IMPORTANT / OPTIONAL notes, then Codex can implement accepted small corrections on this same branch.
