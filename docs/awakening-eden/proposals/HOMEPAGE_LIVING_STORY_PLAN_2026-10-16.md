# Awakening Eden — Homepage Living Story Plan

Status: core enhancement implemented in the local candidate, 16 October 2026, after the owner's “go” approval. Desktop/phone review remains before production release.

## Implementation record

- Real planting portrait first, short founder introduction, retained manifesto and relocated painted Tree of Life artwork.
- Four painted doors now lead to About, Living Library, Work With Us and Village Vision. Free guide and Partners remain visible secondary links; Work With Benjy has a dedicated overview card.
- Four-part “What grows here?” overview acts as an accessible educational panel using existing botanical icons and live text. No additional raster poster generated.
- Four-image scrolling gallery: Benjy tending soil, syntropic field learning, Casa Oasis garden and explicitly illustrated whole-property possibility. Keyboard-focusable region, lazy images and no autoplay.
- Concise natural / kit-prefab / dome introduction links to the existing Village Homes options.
- Sofia circles, Australia festival and Lemuria images remain unselected; no invented photos, event attribution or supplier claims added.
- Earlier contrast, Village Homes wording and main guide zoning changes are preserved in the same review candidate.

## Purpose

A first-time visitor should meet Benjy and Sofia early, see that their work is grounded in real land and community experience, understand the four main pathways, and then discover the wider village vision without confusing it with a completed development or a guaranteed housing offer.

## Keep exactly as it is

- The current Welcome Home atmosphere, painted botanical language, colour system, type, header, footer and working pathways.
- The owner-locked homepage wording and exact twelve-fold Lotus of Life.
- The Tree of Life artwork as part of the wider artistic journey.
- Existing Living Library, guide, Work With Benjy, donation, community and event sections. The new story should point into them, not duplicate them.

## Proposed opening sequence

1. **Welcome Home to Awakening Eden**
   - Keep the existing title and the line: *Regenerating Land & Life. Together.*
   - Keep the current short mission language underneath.

2. **Founder portrait, then a human introduction**
   - Use the existing real Benjy and Sofia tree-planting portrait once, prominently, near the opening.
   - Caption: *Benjy & Sofia | Living, learning and growing regeneration together.*
   - Short copy: years exploring and practising regeneration, holistic living, permaculture, syntropic agroforestry, yoga, community and regenerative projects across Australia, Portugal and beyond.
   - Avoid repeating this portrait elsewhere on the homepage.

3. **Four principal doorways below the founder introduction**
   - Meet Benjy & Sofia → `/about`
   - Explore the Living Library → `/living-library`
   - Our Projects & Services → `/work-with-us`
   - Village Vision & Eco Homes → `/village-vision`
   - Quieter text links: *Begin with our free Awakening Regeneration Guide* → `/start-here`; *Co-create With Us* → `/partners`.
   - The existing painted doorway cards can carry these destinations. No new homepage button should point to an unbuilt page.

4. **What grows here?**
   - A compact four-part overview with existing small botanical icons, linked to existing pages:
     - **Regenerate the Land** — food forests, water, living soil, biodiversity and ecological design. → Work With Benjy
     - **Regenerate Ourselves** — yoga, holistic living, connection, movement, creativity and conscious learning. → With Sofia / Library
     - **Learn, Create & Collaborate** — free resources, workshops, regenerative enterprises, inspiring gatherings and practical positive action. → Living Library / Events
     - **Grow the Village Vision** — ecological homes, shared commons, animal sanctuary, regenerative incubator and thriving community. → Village Vision

## One visual story: real work first, future vision later

Place one swipeable, keyboard-accessible gallery after the overview. It must be light enough for phones: responsive WebP derivatives, `loading="lazy"` below the initial viewport, a visible caption and one clear link per image. Never autoplay.

| Order | Story moment | Image source / status | Caption direction | Link |
|---|---|---|---|---|
| 1 | Hands in the Earth | Approved authentic Portugal land-work image | Real work: soil, water, trees and food. | Work With Benjy |
| 2 | Learning Together | Benjy teaching / syntropic workshop photograph | Learning regenerative systems with real people and real places. | Workshops / Work With Benjy |
| 3 | Circles & Community | Sofia yoga, movement or gathering photograph — permission needed | Practice, presence and belonging. | With Sofia |
| 4 | Australian Roots | Authentic workshop, community learning or festival photograph — owner selects | The gatherings and learning that shaped the path. | Events / Partners |
| 5 | Life-Giving Landscapes | Moinhos, Melides, Casa Oasis or clearly labelled project/concept | Food forests, restoration and abundance shaped to place. | Work With Us |
| 6 | A Home for Regeneration | Existing Village Homes illustration / approved home inspiration | Future vision or inspiration, never a promised development. | Village Vision |
| 7 | Lemuria & the Dream | Approved visionary artwork — owner confirms final file and placement | Artistic vision for a more beautiful future. | Village Vision |
| 8 | Regeneration in Action | New, small illustrated overview poster | Learn · Restore · Connect · Co-create. | Relevant four pathways |

The first five cards should be mostly authentic photography. Images 6–8 must explicitly say *future vision*, *concept* or *artistic inspiration* where appropriate. Do not describe attended gatherings as Awakening Eden-organised festivals.

## Ecological homes: a concise introduction

Keep this as a small, honest trio linking into Village Vision—not a supplier marketplace.

- **Natural Homes** — earth, timber, hemp, cork and climate-appropriate building possibilities.
- **Prefabricated & Kit Homes** — thoughtful modular and kit options worth exploring for lower-cost, efficient building.
- **Domes & Creative Living Spaces** — possible spaces for gatherings, accommodation and learning, subject to feasibility.

Caption: *Exploring beautiful, responsible ways to make regenerative living more accessible.*

Before publishing supplier imagery, logos, prices or claims: confirm permission, availability, approvals, final scope and whether any partnership actually exists.

## One educational poster

Create one new painted botanical infographic only after the content and art direction are approved:

**Awakening Eden | Regenerating Land & Life**

- **LEARN:** Living Library, free guides, workshops and regenerative education.
- **RESTORE:** Soil, water, food forests, ecological projects and land design.
- **CONNECT:** Yoga, circles, festivals, community, creativity and wellbeing.
- **CO-CREATE:** Village vision, ecological homes, sanctuary, regenerative enterprises and founding partnerships.

Closing question: *How can we create the conditions for all life to thrive?*

Use the current parchment, forest, sage and restrained ochre palette. If sacred geometry is used, use only the exact twelve-fold Lotus of Life.

## What is needed before implementation

1. Owner selects the final authentic images for Sofia’s circles, Australian roots and the Lemuria vision; supply title, approximate place/year and permission status.
2. Confirm whether the four painted doorway cards should be remapped to the new four homepage destinations, as this changes existing navigation.
3. Approve the concise founder introduction and the exact phrase *Regenerating Land & Life. Together.* against the owner-locked homepage wording.
4. Review the selected gallery captions for project truth labels: real work, collaboration, concept, inspiration or future vision.
5. Approve the poster copy before generating or commissioning its image.

## Implementation sequence

1. Inventory and optimise selected images; create responsive derivatives and descriptive alt text.
2. Make the smallest homepage HTML/CSS change: founder sequence, mapped doorways, four-path overview, one gallery and homes trio.
3. Implement the poster after copy and art approval.
4. Verify desktop, 390px phone and keyboard usage: all buttons, gallery focus, arrow/scroll behaviour, image loading, reduced motion and no horizontal overflow.
5. Review screenshots with Benjy and Sofia before merging or deploying.

Success is a homepage that feels human and alive: visitors meet the founders, see real work first, understand the future vision honestly, and know where to go next.
