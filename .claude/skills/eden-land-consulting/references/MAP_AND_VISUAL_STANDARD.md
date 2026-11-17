# Awakening Eden · Map, Image, Illustration and Editorial Standard

## 1. Design identity
The same premium **painted field-journal** presence as approved Awakening Eden Work with Benjy assets: warm cream paper, natural olive/sage/charcoal, honey light, restrained lavender or muted teal accents, genuine Central Portugal terrain and photographic evidence. Premium does NOT mean ornament on every page. Quiet editorial restraint and generous margins beat decorative overload. When the active Design Bible provides measured tokens, typography or templates, use those instead of approximate values below.

## 2. Truth layers come before colours
A map is first a piece of evidence and only then art. Keep immutable original maps and field photos. Do NOT redraw factual basemaps in an image model; use original pixels as registered raster or georeferenced base, and build controllable SVG/GIS vector overlays. Do not repaint clients, houses, boundaries, roads, scales, coordinates, labels, contour levels or measured features. No invented elevations. Use actual known map orientation or mark unknown. Keep proposed interventions separate from current conditions.

- `00_base_reference`: original map, unchanged; include provenance/date.
- `10_observed`: observed water / erosion / groundcover / structures from evidence ledger.
- `20_client_vision`: supplied numbers and wishes; distinguish proposed features.
- `30_benjy_candidate`: original traced suggestions, never silently relocated.
- `40_unverified`: dashed candidate routes, missing measurements, potential spillway/outlet.
- `50_planting`: conceptual living cover / contour planting, correctly differentiated.
- `60_photo_anchors`: reliable photo locators only (otherwise callout with 'location to confirm').
- `70_labels_and_legend`: dynamic editable text with clear status and short explanations.
- `80_provenance`: source IDs, conceptual notice, author, version, date.

## 3. Status before line style
- Existing water / observed flow: muted teal, **solid** when observed with evidence ID.
- Suspected/indicative flow: teal **dashed**, with explicit source uncertainty.
- Benjy's proposed swale/contour planting: olive/moss line, **dashed if not staked**; never imply a hydraulic grade or size.
- Erosion: terracotta hatching/outline, not decorative red arrows unrelated to evidence.
- Roads/roadside drains/crossings: warm slate/stone; proposed status label.
- Candidate pond: pale organic shape *only where Benjy's sketch supports it*, point to evidence; separate a pond polygon from water-transfer arrows.
- Owner wishes: restrained numbered circles, preserve original numbering / order.
- Verified vs unverified must still be identifiable without color alone: solid/dash, icon/legend label and text.

## 4. Geometry validation
Each feature must have feature ID, map layer, anchor landmark(s), original sketch reference, intended function, provenance, status, confidence, human approval, source/outlet, and whether it crosses a road/watercourse. For change requests, generate a side-by-side BEFORE / AFTER with outlines aligned on the SAME basemap. If source crop contains distorted perspective, avoid implied precise overlay placement until rectified. Never derive pond capacity or swale spacing from a pretty perspective sketch.

## 5. Real photo annotation protocol
- A photo of the client land stays literally the original photo; only overlays and ordinary photographic adjustments, not AI scene regeneration.
- Source photo stays immutable. Save `annotations.svg` or transparent overlay separately, matched to image dimensions. Never flatten before QA.
- Show at most 2–4 critical marks per photo; text outside image when possible. Explain what is observed versus what Benjy proposes.
- Verify arrow direction against field notes, not artistic composition. No invented water crossing, embankment, swale location or lake outline.
- Keep sketches faithful in relative position and count, even if not 'balanced'. Ask Benjy to resolve genuine contradictions only when material.

## 6. Painted educational diagrams
Use original gouache/watercolor texture, natural ink lines, paper, warm earth, water teal and olive green. Legitimate diagrams: swale section, planted berm & safe overflow, graded drain vs contour swale, road rolling dip, under-road culvert, sediment forebay, infiltration basin, wildlife/storage pond, syntropic strata and succession. Label explicitly **ILLUSTRATIVE ONLY / not to scale / not a site design**. Draw water moving based on the demonstrated principle, not a fabricated claim about client terrain. Keep editable labels and SVG shapes distinct from any raster watercolour texture.

## 7. Image-generation prompt template
```
JOB: [educational watercolor illustration, not a factual property map].
REFERENCE A: [approved painted style image; style only].
REFERENCE B: [Benjy's existing approved sketch; geometry/contents to preserve].
SCENE: [one precise landscape process and viewpoint].
WHAT TO KEEP: [list of subjects/geometry/source details that must not drift].
WHAT TO CHANGE: [one specified change].
STYLE: premium warm hand-painted watercolor/gouache on ivory paper; olive, sage, earth, muted teal, small lavender; appropriate Mediterranean plants, organic not glossy.
EXCLUSIONS: no inventing pond positions, roads, boundaries, people, text, logos, sacred geometry, tropical crops or made-up measurements.
OUTPUT: [aspect ratio, minimum dimensions, transparent/opaque], image-only; typeset exact labels in editable SVG outside the raster.
REVIEW: compare output to source/reference and fail if any forbidden element is added.
```
Important: image models are excellent for free-standing illustration and poor as the sole authority for measured overlays. If exact edit fidelity matters, use deterministic compositing rather than trusting an image model to preserve source pixels.

## 8. Typography / production
Use active Design Bible fonts first. Previous working reports use Cormorant Garamond (headings) and Source Sans 3 (body). Keep heading size practical, body readable on A4 and phone; no 7pt body. Text should be editable; never burn full paragraphs into images. Avoid generic cards on every page. A4 report, optionally A3 map pullouts, vector symbols and selectable text. Export an annotated and clean version where helpful. Ensure photo anchor and label contrast (WCAG target 4.5:1 for small text). Do not ship font files to clients.

## 9. Approved cover rules
Use real, clean field photo or original painted illustration labelled as such. No bold, invented catchment lines over a hero. Strong title + simple subtitle, genuine Benjy note, subtle cream paper and thoughtful crop. The cover must never imply a pond/lake exists when only planned.

## 10. QA and design freeze
Render PDF pages to images, inspect every page and A3 maps at 100% and phone-size. Compare every overlay to original source sketch and evidence. After Benjy approves a map, mark version `APPROVED` and freeze geometry; a later aesthetic change cannot silently move it. Check actual output not a contact sheet alone.
