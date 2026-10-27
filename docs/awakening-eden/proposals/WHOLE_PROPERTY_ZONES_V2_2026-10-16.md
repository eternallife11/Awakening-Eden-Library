# Whole-property regeneration · illustrated zoning revision

16 October 2026 · Sofia requested implementation now.

## Delivered

- Replaced the confusing bubbles and mixed callouts with one original painted, Mediterranean teaching plan showing Zones 0–5.
- Installed it on Village Homes, Work With Us and Eden Designer, including the social image and preload where present.
- Preserved the complete image ratio. Each illustration opens the full-resolution PNG in a new tab.
- Added large, selectable HTML descriptions beneath every use, plus a six-card explanation on Village Homes. All caption/body guidance is at least 16px on the tested phone and desktop layouts. Continue this standard for future teaching graphics; do not put essential explanations only inside a bitmap.
- Stored the PNG master and a WebP delivery copy (812,486 bytes versus a roughly 3.9MB PNG). Original generated output remains preserved too.

## Teaching decisions

Zone 0 is the home and its living/kitchen functions. Zone 1 illustrates daily kitchen gardens, frequently used herbs, compost, propagation, paths and nearby roof-water tanks. Zone 2 illustrates regularly tended market-garden beds, herbs, tools/harvest storage, orchard and food-forest systems. Zone 3 extends to less frequently visited production. Zone 4 is managed woodland. Zone 5 is minimally disturbed wild habitat for observation and protection.

Zones describe use and care, not fixed-distance rings. Daily market gardening may belong in Zone 1; Zone 2 is one example, not a universal rule. Access, slope, climate, soil, water, habitat and fire exposure also influence siting. This is an indicative teaching illustration, not a surveyed site plan, a prescription for earthworks or a water-engineering design.

Sources checked: [Permaculture Association: zoning](https://www.permaculture.org.uk/design-methods/zoning) and [efficient energy planning: zone, sector and slope](https://www.permaculture.org.uk/principles/efficient-energy-planning-zone-sector-and-slope). Original explanation and artwork; no book illustration reproduced.

## Asset and generation record

- Mode: built-in image generation, edit/redraw with the previous illustration as reference. No fallback API or added service.
- Reference: `assets/educational-boards/04-whole-property-regeneration-zones.webp` (old asset retained for history).
- Master: `assets/educational-boards/04-whole-property-permaculture-zones-v2.png`, 1536 × 1024.
- Web delivery: same basename, `.webp`.
- No sacred geometry added; exact twelve-fold Lotus assets elsewhere remain unchanged.

### Final prompt specification

Use case: scientific-educational. Redraw the whole-property regeneration teaching illustration in the established Awakening Eden painted ink-and-watercolour style: warm parchment, forest/moss, ochre and restrained terracotta. Mediterranean plants and plausible landscapes. Use a landscape 3:2, near-overhead soft-isometric plan with six connected, irregular, clearly distinguished areas and subtle dashed boundaries. Make the educational logic clear: home at Zone 0; daily kitchen garden, compost and nearby roof-water tanks at Zone 1; accessible market garden, herbs, tools/storage and productive food forest at Zone 2; less frequently tended main crops, orchard and agroforestry at Zone 3; managed woodland/coppice at Zone 4; wild habitat at Zone 5. No empty bubbles, blank numbered discs, incoherent arrows or decorative river pretending to be a water design. Large readable labels, with each label visibly associated with its area. No copied book artwork, sacred geometry, engineering claims or photorealism.

Text: “WHOLE-PROPERTY REGENERATION”; “Permaculture zones · place everyday care close to home”; “ZONE 0 · HOME / Living · kitchen”; “ZONE 1 · DAILY CARE / Kitchen garden · compost · tanks”; “ZONE 2 · REGULAR CARE / Market garden · herbs · food forest”; “ZONE 3 · WIDER PRODUCTION / Main crops · orchard · agroforestry”; “ZONE 4 · MANAGED WOODLAND / Coppice · forage · timber”; “ZONE 5 · WILD HABITAT / Observe · protect · learn”; “Zones follow use and care—not fixed distances or perfect circles.”

## Verification and release

Public build, exact-Lotus visual lock and zero-cost hosting guards passed. Desktop/phone Village Homes and zoning checks passed: 4/4. Checks cover all three consumers, image loading and uncropped ratio, minimum caption size, six zone cards, working full-size assets and no horizontal overflow. Screenshots are in `test-results/zoning/` (local QA artifacts).

This batch belongs to the existing finishing candidate and PR38. It is not a production deployment. Review the local candidate at `http://127.0.0.1:8787/village-homes` before the final visual release decision.
