# Awakening Eden website audit and Terra work plan — 4 October 2026

Status: read-only audit and proposed work. No design or production change was made in this pass. The live site is `https://awakeningeden.org/`. Implementation should happen in a later GPT Terra pass, with Benjy and Sofia reviewing visual changes before publication.

## What was checked

- Live desktop (1440 px) and mobile (390 px) rendering of Home, Living Library, Work With Benjy, Work With Us, Village Vision, Begin Here, Sofia, Events and Links. All nine returned HTTP 200. Across these pages, 185 image elements on each device loaded; no missing local images, horizontal overflow, broken same-page anchors, site-resource failures or JavaScript errors appeared in this sweep.
- A separate Library destination check found 13 of 17 distinct internal targets returning HTTP 200, including all six PDF downloads. Four online guide routes returned HTTP 404. External links were not fully verified.
- Live accessibility checks found color-contrast failures on Home, Library, Work With Benjy, Work With Us and Events. The automated accessibility test currently ignores contrast, so passing CI does not resolve them.
- The site looks coherent and welcoming in both viewports. The exact SVG Lotus is present in the main new artwork. The bright many-person Circle of Belonging is correctly near the top of Home. A lower Home section still uses an older community illustration and needs owner review against the latest visual lock before any substitution.
- This was a rendered-page sweep, not a full real-user performance study or a manual screen-reader audit. The full-page image transfer figures below are diagnostic upper bounds because the audit forced lazy images to load; they are not first-screen download sizes or Core Web Vitals.

## P0 — make the Library reliable before inviting more readers

1. **Repair four live online guide routes:** `/thriving-in-these-times`, `/7-first-steps-regenerate-your-land`, `/abundant-edge-index`, `/small-scale-regenerative-farm-playbook`. The case-sensitive production artifact lacks their lowercase aliases. Inspect `scripts/build-cloudflare.mjs` around the alias logic and the matching `_redirects` entries. Build and test on a case-sensitive path or directly against a production-like Worker preview; assert each public URL returns the intended guide, not a generic 200 page. Add all four to the release smoke test and sitemap audit.
2. **Fix Library filtering:** search/result counts update, but unmatched book cards remain visible because `.resource-card { display: flex; }` overrides the `hidden` attribute in `eden-library-v23.css`. Searching for “Fukuoka” reports 1 of 107 but leaves about 15 cards visible; “water” reports 5 while 42 are visible. Make DOM visibility and counts agree, including keyboard and screen-reader state. Clicking “Watch something” after a filtered search currently navigates to `#films` while the film section remains hidden; reset or reveal the target before navigation. Test the actual user sequence.
3. **Remove public QA artifacts from the build:** `.lighthouseci`, `lhci-reports` and `.lighthouserc.cjs` currently enter `dist` and were included in the last upload. Exclude them in the Cloudflare build, inspect the artifact manifest, and verify the public URLs are absent after release.

## P1 — restore clarity, accessibility and trust

4. **Fix contrast with restrained palette adjustments.** Examples include the Home Instagram link (about 1.47:1), gold on forest (about 3.2:1), Library kicker (about 3:1), and Work With Us button (about 3.1:1). Keep the parchment, forest/olive, teal, terracotta and honey palette; use darker text or lighter background where needed. Re-enable color-contrast in automated accessibility tests; check focus, keyboard paths and text over artwork manually. Aim for WCAG AA contrast, including normal text at 4.5:1 where applicable.
5. **Clarify the main visitor paths.** Keep Home's welcome and current art hierarchy. Make three actions obvious near the top: explore the Library, start a land project with Benjy, and join the community. Reduce repeated calls to action and long blocks lower down; use short introductions and clear onward links. Keep the vision expansive, while clearly saying what exists today, what is being built, and what is an invitation to co-create.
6. **Improve the Benjy service decision path without changing prices blindly.** Preserve the €111 clarity session, Focused Roadmap from €450 / €650 onsite plus travel, whole-property planning from €1,500, and scoped implementation/workshops. Give each a plain-language outcome, who it is for, what is included, timing, and one enquiry action. Put real food-forest, water-retention, orchard and habitat outcomes beside relevant offers. Clearly label illustrations or concept plans as concepts rather than completed client work. Verify the actual delivery effort and margins before revising packages. Ask Benjy whether the older PDF's “free 30-minute clarity call” still exists before correcting that conflicting claim.
7. **Update stale links and copy.** The Links page still points to `tierramagicatribe` while Home shows the approved `@awakening_eden`, `@benjy_inspirit`, and `@sofia_wildflower`. Audit each social/chat URL, ownership and desired destination. Review the Sofia page's “Yoga as medicine” wording with Sofia and avoid an unintended therapeutic promise. Keep Events clearly separated between confirmed dates and future concepts. Review the lower Home community illustration against the 3 October lock with Benjy and Sofia; do not silently replace it.
8. **Refresh the current handoff.** `docs/awakening-eden/handoffs/CURRENT.md` still describes PRs #35/#36 as drafts and production as unpublished. Record the actual merged/deployed state and current issues so a later agent does not work from stale release facts.

## P1 — first three guides as practical field paths

Build on the approved botanical field-guide style and existing educational boards. Each chapter should help a reader understand one idea, observe it on their own land or in their day, take one safe action, and know the limit of the advice. Keep diagrams readable as HTML/SVG or with nearby HTML explanations, descriptive alt text, responsive sizing and a tap-to-expand option where needed. Cite factual claims and distinguish evidence, practitioner observation, tradition and spiritual worldview.

| Guide | Editorial/phone improvement | Educational graphics to make | Authentic media slot for Benjy and Sofia |
| --- | --- | --- | --- |
| **Awakening Regeneration** (`/start-here`) | Short “choose your path” opening, chapter jump links, simpler summaries and a clear next step to land/community/Library. It already has several strong land/soil/water illustrations; refine rather than adding ornament. | One-page regeneration map from soil to community; Mediterranean water/soil/vegetation system; small annotated “observe → act → measure” example. | 20–40 s founder welcome; one real Central Portugal landscape photo with place/date; one actual restored orchard or food-forest detail with context. |
| **Regenerate Your Land — 7 First Steps** | Repair live URL first. Replace the older wrapping mobile navigation and oversized heading with a compact guide header and seven scannable step cards: why, observe, try, avoid, photograph. Separate optional lunar/intention practices from ecological mechanisms. | Land-reading sketch; rainfall path with safe overflow and site-specific warning; living-soil cross-section; support-species succession timeline; one-bed cross-section; 30/90-day checklist. | Same-angle, dated before/after of a real area if available; 30–60 s Benjy field walk after rain explaining where water goes; close-ups of covered soil and living roots. Never label a stock or concept image as a client outcome. |
| **Thrive in These Times** | Repair live URL first. Shorten the long hero and offer “Ground / Prepare / Connect” paths with one doable action per section. Keep wellness language supportive and free of medical promises. | Daily rhythm wheel; household food-water-community resilience map; gentle 7-day action tracker; clear evidence/worldview labels. | 30–60 s captioned Sofia grounding or breath practice, with consent; genuine nature/community image; optional audio-only version. |

Also review the older PDF guides for outdated domain/brand/handles and claims. The Mediterranean Planting Chart is described as “month-by-month” in the Library, but its contents are primarily a summer-crop companion-planting and feeding primer; use an accurate description or build the missing month-by-month chart.

## P2 — phone, imagery and speed

9. **Make the guides truly comfortable on a phone:** test 360, 390 and 768 px; keep readable type, non-wrapping or intentionally stacked controls, generous tap areas, visible focus, concise headings and diagram labels that can be enlarged. The seven-step guide's current mobile navigation is the most obvious layout issue.
10. **Create a mobile image budget:** the new Library banner PNG is about 3.3 MB, the mobile Circle PNG about 1.5 MB and the Village supporting artwork about 3.38 MB. Generate responsive WebP/AVIF versions where visual fidelity survives, keep original masters, set intrinsic sizes, and lazy-load below-fold images. Then measure LCP, INP and CLS on actual page views; do not infer those from total full-page image bytes.
11. **Plan web imagery carefully:** favor the owners' real people, land and workshop photos as proof. Use licensed web images only as clearly contextual illustration; record creator, URL, license, attribution and alt text in an asset register. A stock community image must never imply a photographed Awakening Eden event or partnership. Seek written permission for identifiable participants and Indigenous knowledge/ceremony imagery.
12. **Add a short web introduction after the first three paths work:** 15–25 s captioned Benjy/Sofia video with faces, real Central Portugal land, and learning/community moments; a lightweight poster and click-to-play, no autoplay. End on a single next action. Use a true introduction, not a visual claim that the future village already exists.

## P2 — turn the Library into a growing movement

13. Publish one useful, field-grounded note a week with a real example, a named author, a cited source where factual, and one relevant Library guide. Make a simple share card/short clip from the same idea for Awakening Eden social channels. Build relationships with aligned Portuguese/regenerative projects through consented collaborations, not claimed affiliations.
14. Set a baseline in Search Console and a privacy-respecting site measurement approach. Track guide landings and completions, Library searches with zero results, useful link clicks, qualified Benjy enquiries, workshop registrations, email/community opt-ins and referrals. Review monthly. Aim first for consistent learning and trust; “millions” is a long-horizon reach aspiration, not a forecast.
15. Once the three guides and core paths work reliably in English, prepare Portuguese versions for local relevance and accessible sharing. Review translations with speakers familiar with Central Portugal land language. Add more languages only as capacity and audience evidence support them.

## Terra implementation order and acceptance gate

1. Start from the current canonical `main`, confirm its deployed commit and preserve owners' uncommitted changes. Implement P0 in a small PR; verify each route and Library user sequence on desktop/mobile and a case-sensitive production-like build. Release and recheck live.
2. Implement contrast, stale links, service clarity and handoff fixes. Obtain Sofia/Benjy review for wording, prices, social destinations and any visual replacement. Recheck keyboard use, the exact 12-fold Lotus, image loading and no overflow.
3. Upgrade the three guides one at a time, beginning with repairing their routes. Show a mobile/desktop preview and the image/video placeholders before replacing approved artwork. Publish only when the owners approve the visual result and final links.
4. Optimize media and launch the small content/distribution rhythm. Measure real mobile performance and user paths after release.

Preserve `docs/awakening-eden/design/VISUAL_LOCK_2026-10-03.md`, its Bible addenda, the founders' real-photo trust layer, future-facing village language and exact SVG Lotus. Do not generate approximate Lotus geometry or present concepts, stock imagery, hoped-for outcomes or inspirations as completed work or partnerships.

## External standards for the later pass

- [W3C WCAG 2.2 contrast minimum](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html)
- [Google Web Vitals thresholds and field-vs-lab guidance](https://web.dev/articles/vitals)
- [Google people-first content guidance](https://developers.google.com/search/docs/fundamentals/creating-helpful-content)
- [Google image SEO guidance](https://developers.google.com/search/docs/appearance/google-images)
- [Wikimedia Commons reuse and attribution](https://commons.wikimedia.org/wiki/Commons:Reusing_content_outside_Wikimedia/licenses/en), [Unsplash license](https://unsplash.com/license), [Pexels license](https://www.pexels.com/license/)
