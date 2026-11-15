# CLAUDE CODE HANDOFF — Work with Benjy visual storytelling
**15 November 2026 · Benjy & Sofia's latest creative direction**
**Status:** Design/implementation brief for **draft PR #51**. Do not merge or deploy until human review.
**Primary target:** `work-with-benjy.html`; preserve the four clear service pathways already drafted in PR #51.
**Related:** Studio PR #50 for production; newest user directions override older generic visual or marketing notes.

## Central direction: human, premium, heartfelt, professionally inviting
Make this page feel like a real regeneratively minded designer inviting a landowner into the field studio, not an AI-generated brochure or an industrial sales landing page.

**Visual emotional image:** a loved and well-used permaculture designer's table outdoors in a Central Portuguese/Mediterranean garden, with an open, beautifully drawn observation book. Beautiful landscape in the distance; soft natural morning or sunset light; warm clay cup; soil sample; pencil, compass, olive twig; sketches and the feeling of a skilled human's hands at work. This is our signature look across the website, carousels and short films.

The supplied images are **inspirational/editorial artwork**. They are intended to look believable, tactile, hand-painted and human. **Do not add intrusive banners or boilerplate labels like "AI illustration", "example", "concept only" across these decorative images, and do not clutter them with caveats.** The page's own service descriptions already explain the boundaries of deliverables. Editorial art should not be positioned as a named client's completed project or as surveyed technical data. Never assert that invented coordinates, soil measurements, water sources or yields are actual site observations.

## Main art direction, preserving newest Awakening Eden brand
- Natural, soulful, lived-in mixed-media realism: actual garden photography feeling + restrained brush painting + hand-drawn field book + faint ink/graphite marks. Rich but not hyper-polished or generically AI-perfect.
- A beautifully cared-for table with a **realistic open designer's notebook/booklet**. Cream uneven recycled paper, hand-drawn map and land sketches, sample jars/soil profile, roots, field pencil, shaded human-scale diagrams; no garbled dense microtype.
- On the **left page** of the book: believable satellite/aerial overview of a small Mediterranean quinta (or a gently rendered aerial-style property base) with faint overlays or field-observation margin sketches (access, trees, slope, aspect); a small soil profile and permaculture observation cues.
- On the **right page**: a gorgeous, plausible **regenerative concept drawing** with terraces, paths, mixed edible trees, food forest, protective hedges, modest ponds/water storage *only where visually sensible*, gentle blue flow arrows, sun-path arc and house-use zones. Layered subtropical lushness can be aspirational while keeping the actual setting Mediterranean, not a tropical resort of bananas/palms everywhere.
- Do not over-label the artwork or invent precise coordinates, measured water flows, fire-safety distances or claims of spring locations. Use a small number of hand-written field marks that are actually legible, not invented technical authority.
- Outdoor scenery: mature olives, deep green winter cover, herbs, terraced stonework, diverse productive understory, long views of Portugal, gentle gold light, lavender accents. Lush regenerative **potential** without pretending that all sites remain tropical-green year-round.
- Exact logo geometry rule: if the mark appears, use only existing verified **12-fold Lotus of Life** source asset `assets/geometry/lotus-of-life-12-exact.svg` or approved original brand mark, never invented Seed/Flower of Life-like patterns.
- For any real photo of Benjy, Sofia, team or client: preserve the real face/body; do not regenerate people or falsely present AI-created people as the team.
- Match the latest Design Bible/Illustration Bible: earthy olive and forest greens, warm handmade cream, subtle muted lavender, natural typography, contemporary premium spacing. No excessive gold borders, inauthentic pseudo-sacred ornaments, glossy over-saturation or wall-of-text posters.
- Take inspiration from foundational permaculture field-notebook ways of teaching (water/sun/wind/soil/sector/zone relationships), but do not copy any specific living artist's recognizable drawings or textbook diagrams.

## Specific site placements (PR #51)
**1. Hero / upper-page welcome:** Primary image remains a genuine photo of Benjy in a garden (do not replace him with a fictitious portrait). Consider the large open designer's book and warmly painted orchard as a **supporting visual** just below the welcome, or as a tasteful paired visual with real Benjy; keep the human contact immediate.
**2. "We begin by listening":** A complementary horizontal table/notebook visual. One page maps the current site, the other suggests potential. Small field observations. This is the emotional bridge to the packages.
**3. €111 Online Land & Project Clarity:** Inspiring image of open notebook + aerial map + laptop or notes with gentle sun path, photos and a few real-looking hand sketches. Keep it lighter and simpler than the higher-priced designs. A personal conversation comes first.
**4. One "Begin on the Land" card with two pathways:**
   - **€150 Initial Land Walk:** Land walk: field boots in grass, handful of soil, pencilled observation sketch and one-page field notes. It is deliberately simple and grounded, not a finished masterplan.
   - **€295 Regenerative Land Assessment & Clarity Plan:** The beautiful deeper field-book spread with soil profile, a hand-drawn landscape concept, water movement, trees and a small legend. This is the strongest signature image for the on-site offer. Include a phone/video-call feel subtly if appropriate.
**5. Focused Regenerative Roadmap, from €450 online/€650 site:** More composed, developed *one-area* drawing in a credible notebook or plan-sheet context. Example: an orchard edge, contour food-forest rows, trees with biomass support, water/soil strategy. Still hand-rendered and human.
**6. Whole-Property Regenerative Design from €1,500:** Whole-land overview spread with connected elements and seasonal phases; show the larger coherence, not a pile of fake measurements.
**7. Closing CTA:** Real garden landscape, a warm human field-table moment or a genuine Benjy/Sofia photo: “Tell me about your land.” Let the page breathe.

**Do not advertise a standalone €1,100 concept tier.** Keep the four website entry points:
- €111 online clarity
- €150 initial on-land visit and €295 deeper assessment **together as one card**
- €450 online / €650 on-site focused roadmap
- from €1,500 whole-property regenerative design
Custom quotes for project management, implementation, workshops and garden-team training.

## Technical editing, accessibility and design system
- First inspect the existing current page, site CSS and photo inventory. **Reuse and adapt original user-supplied artwork** rather than reproducing or approximating it with lower-quality generic imagery.
- User will supply the beautiful generated visuals and real field photos/videos to Claude directly. Do not claim those images are already in this repo. Identify best crops/placements only after receiving real files.
- Keep all package **text/prices in HTML**, not burnt into illustration files. This ensures responsive fit, editorial control, accessibility and easy future updates.
- Prefer source masters saved outside Git while editing, and publish only properly optimized assets in `assets/work-with-benjy/editorial/` (e.g., WebP/AVIF variants at appropriate sizes), including descriptive `alt` text.
- Maintain real image aspect ratios, graceful phone crops, legibility at 360px, lazy loading outside the hero, reasonable transfer size and sensible image ordering. Use restrained frame effects rather than tile after tile of busy graphics.
- Preserve keyboard navigation, contrast, existing links, form functionality and correct pre-selected service values.
- For Reels, share the same visual vocabulary: gentle camera drift across notebook details, natural footage first, authentic voice, sparse subtitles, no forced stock video transition packs. Make vertical 9:16 adaptations from the same editorial assets.
- Avoid over-optimizing for virality at the expense of honesty. The invitation should be concrete: a good first step for the land.

## Client-facing tone, headline and CTA
Lead with **“Your land doesn’t need everything at once.”** Then: **“It needs a good first step.”**
Warm first-person Benjy voice. Natural, specific words: “that damp corner,” “the rain after a storm,” “an orchard with tired soil,” “a garden you can really look after.” Sofia and collaborators appear naturally as “we”.
Emphasize considerate attention and fair prices. **Never** imply a €150 visit delivers a detailed whole-property design.
Simple calls to action: **“Tell me about your land”**, **“Begin with a conversation”**, **“Explore the €295 land assessment”**.
The final client-facing design should be emotionally compelling and attractive to rural landholders, without sounding lofty or salesy.

## Next implementation steps for Claude
1. Audit all image assets currently present and note which user-supplied visuals are still needed; do not fabricate their file availability.
2. Prepare an image-by-section placement plan and implement art slots on **this draft branch** with accessible HTML/CSS and fallbacks to approved existing assets. Never publish broken placeholders.
3. After the user supplies visual files, select coherent crops, compress derivatives, set alt text and preview desktop/mobile. Ensure clarity of price ladder, forms and CTAs.
4. Show real screenshots or a local preview for Benjy and Sofia to review. Fix mobile layout, fake-looking/illegible text, excessive repetition and loading performance.
5. Get explicit approval before merging, deploying, or promoting with paid ads.
