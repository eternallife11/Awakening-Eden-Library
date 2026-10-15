# Awakening Eden — finish what matters

13 October 2026. Planning and read-only verification; no website implementation, merge or deployment in this pass. This consolidates the 9 October finish plan, the 11 October homepage preview, the latest PR38 draft, and Sofia's new laptop handoff. Newest owner decisions win.

## 1. Verified starting point

| Location | State checked today |
| --- | --- |
| GitHub main | `b118bde91db19d13aadf777284f681b6bcc4ac8b` |
| PR38 | Open draft, not merged. Latest head **`d88c8552a6bd9740b35fc860e6b0533f5b3c034b`**, updated 12 October. Use this, not the older `dda4cb9` checkpoint. |
| PR38 already contains | Three-step enquiry flow; offer selection; protected delivery; dedicated thank-you and free-guide journey; one consolidated near-top Projects & Possibilities showcase per service page; duplicate galleries removed. These are source changes, not a verified release. |
| Live homepage | Existing painted founders portrait, bright community circle and Library artwork remain. Old founders wording and four landscape-strip door cards still display. The new architects quote and prepared arched doors are **not live**. |
| Live Benjy | Old gallery hierarchy; PR38's `.eden-showcase` and funnel entry absent. |
| Live Library | CSS URL still `eden-library-v23.css?v=2026-09-27.1`. Fresh browser search for Fukuoka announces 1/107 but renders **15** resource cards. Required repair remains. |
| Saved preview | `outputs/awakening-eden-review-2026-10-11/` at project root contains homepage preview, copy, desktop/phone images. It is a proposal, not a deployment. |
| Prepared door art | Four WebP files and boards persist under `proposals/claude-creative-review-2026-10-08/`. |
| Local working repo | `awakening-eden-qa-tooling`, branch `codex/work-with-benjy-real-projects-2026-10-05`, HEAD `82dc3b3`; existing uncommitted Library fix, test and planning files must be preserved. Other two local checkouts are older. |
| Interrupted 11 October work | Temporary checkout `/private/tmp/eden-heartfelt-release` is no longer present. Remote branch `codex/eden-heartfelt-release-2026-10-11` still points to `dda4cb9`, not to completed homepage changes. Do not treat those interrupted edits or their partial tests as saved or released. Reapply only needed changes from persistent previews against the newest PR38 source. |

GitHub: https://github.com/eternallife11/Awakening-Eden-Library/pull/38

The two related chats, **Finish site, build workshop & presi** and **Finish site, build workshop**, were read. Their latest direction agrees: website first, then organize teaching resources, then build the flagship workshop. The generated portfolio-board link in the available handoff text is empty; the actual new mockup image was not retrievable. Its detailed written instructions are sufficient to proceed with planning, but do not claim visual comparison with that missing board.

## 2. First visible batch: homepage

### Botanical divider — first change, small scope

The live simple heart-and-vine divider beneath the founders introduction is `assets/dividers/heart-hummingbird-vine-divider.svg`. The same file is used again later on Home. It is the flat, minimal ornament Sofia wants replaced, not the approved portrait or community art.

Use the **centre botanical flourish** in `docs/awakening-eden/design/references/2026-10-03/ornament-board-original.png` as the visual reference. It is already the right family: fine earthy linework, translucent warm pigment, irregular botanical detail, olive/forest, terracotta and honey. Do not publish the whole reference sheet or its uncertified geometric medallions.

Prepare **one** slender original divider, not a new page illustration: branching olive/rosemary and a few soft wildflowers, a small central botanical lotus or seed, restrained teal water movement if it remains legible. Transparent background; no text; no drawn sacred-geometry disc; no heavy border, gold shine or giant scene. The canonical Lotus elsewhere remains untouched.

Target master about 1600 × 320; responsive 640/1280 variants; display around 480–640 px wide on desktop and within the content width on phones. Match intrinsic aspect ratio, leave quiet space, use decorative `alt=""` and `aria-hidden="true"`. Choose output weight by visual inspection, aiming below 120 KB for the largest web derivative. Review on both cream and parchment backgrounds for pale rectangular edges.

Existing `botanical-divider-01.webp` is a possible fallback already on disk, but its crowded cutout appearance is less suited to the new Library style. The larger `botanical-seed-water-roots-divider` contains a painted geometric disc that is not certified and is too tall for this small role; do not reuse it uncritically.

At implementation, use the imagegen skill if making/editing raster art. Show the divider in the actual homepage at 390 and 1440 px before treating the art as final.

### Homepage words, hierarchy and doors

Reuse the 11 October preview rather than inventing another direction. Keep existing approved founders portrait, bright Circle of Belonging, Earth Mother mission art, Library banner and future-vision illustration, including their exact SVG overlays.

Proposed short opening:

> **Welcome home to Awakening Eden.**  
> A home for regenerative interbeing — awakening Eden within and around us. Explore hopeful resources, grow living landscapes, and connect with people turning love for the Earth into practical action.

Primary buttons: **Work with Benjy** and **Explore the Living Library**. Keep **Work with us** and **Watch inspiring films** as clear secondary paths. Benjy's land enquiry stays accessible through PR38; preserve anchors when simplifying copy.

Beneath the approved portrait, include Sofia's requested original line as an Awakening Eden invitation, not an invented historical quotation or testimonial:

> We are the architects of the New Earth — conduits for sacred activism, miraculous regeneration and magical creations.

Founders introduction:

> **A little sacred. A little silly. Deeply devoted to life.**  
> Hi, we're Benjy & Sofia, the founders of Awakening Eden. Our journey is regeneration: caring for land, nourishing community and exploring holistic, organic living wherever we can. Compassionate, sometimes silly, often in awe — imperfectly perfect, and always learning.  
> We walk different paths on one grand ocean of creation. Come grow with us: through food forests, hopeful learning, workshops, gatherings and practical acts of care.

Keep the divine/original blueprint language in a short worldview paragraph: “For us, awakening Eden is a remembering of life's original blueprint: diversity, relationship and the possibility of creating more life together.” Present it as philosophy, not biological proof. Shorten repeated mission/homecoming/journey introductions; preserve useful unique content via the existing deeper pages rather than adding more long homepage paragraphs.

Four prepared arched painted doors replace existing strip-art cards: Begin Here / Living Library / Work with Benjy / Walk Beside Us. Use real HTML labels and links; preserve exact canonical Lotus where required. Follow the 8 October crop/overlay coordinates, but validate them on the actual responsive page. Do not hide descriptions or actions on phones.

Keep a concise future invitation: gardens and food forests now; workshops and gatherings growing; Eden festivals and a sanctuary/learning village envisioned with aligned partners. Land and funding are still being sought. Clear community, partnership and optional gift buttons remain. No promise of existing accommodation or an established village.

**Homepage acceptance:** one welcome, clear work/library choices, new divider in context, requested quote, correct artwork, readable painted doors, less repeated prose, no layout overflow at 360/390/768/1440.

## 3. Required functional repairs, before any release

Keep these in a small, reviewable repair commit, independent of the visual changes.

1. Carry forward local Library stylesheet cache-token fix and test **rendered card visibility**, not only hidden attributes. Verify Fukuoka=1, nonsense=0, clearing/Escape restores resources, film shortcut works. Inspect hidden CSS interactions and bump all affected asset versions consistently.
2. PR38 `project-enquiry-thank-you.html` currently has relative CSS/favicon/image URLs. At `/work-with-benjy/thank-you` they resolve beneath `/work-with-benjy/`. Make them root-relative and test the clean production route, not just the flat HTML filename. Verify download `/Awakening-Regeneration-Guide.pdf`, noindex and production canonical metadata produced by the build.
3. Verify three-step Next/Back, validation and preserved input, offer pre-selection, no-JS fallback, success-only redirection, error recovery, Turnstile/honeypot/rate-limit/origin controls and campaign fields. Use mocked delivery for automated tests; no unsolicited real enquiry emails.
4. Check critical guide routes and nav links against live + preview. Older reported broken routes require fresh verification, not an assumption that they remain broken.

Do not count a direct visit to the thank-you URL as proof of successful delivery. Keep ad configuration outside this release unless requested; validate conversion attribution only after a real success path has been deliberately tested.

## 4. Service pages: extend PR38, do not rebuild its gallery

The draft has already consolidated the gallery into two groups. The newest brief adds six offer categories. Reconcile them as **six visual offer stories inside the single Projects & Possibilities section**, optionally grouped under Growing Abundance / Regenerating the Whole Place. Do not create a second gallery below it.

On Benjy, consolidate the hero and repeated “Two simple ways to begin” block so the showcase follows the short introduction and clear actions. On Work With Us, avoid an oversized repeated citrus hero and repeated service/pathway cards. The owners explicitly prefer inspiring landscape, labelled concept and human proof over a trellis-bed hero.

Core promise:

> We love transforming tired landscapes, poor soil and monocultures into thriving oases of life. Food forests are our big passion, but we also design and co-create beautiful, productive, water-wise landscapes, supporting people from their first idea through implementation.

| Visual offer | Primary image / useful inset | Scope and outcome |
| --- | --- | --- |
| Syntropic Food Forest Packages | Best authentic Cairns row photograph; small original design inset only if it helps | Backyard to larger systems; design, co-creation or scoped installation. Label Cairns collaboration and tropical context. |
| Whole-Property Regenerative Design | Strong property view plus proposed masterplan | House, access, backyard food forest and surrounding planting relationships; clear phases and priorities. Curves follow site facts, not decorative geometry. |
| Orchard Retrofit | Existing orchard example plus labelled proposed transformation | Retain established olives; add appropriate layers, soil cover, biomass, access and planting relationships. Never present two different sites as before/after. |
| Water-Retention Landscapes | Approved pond concept when located; small educational inset | Water movement, infiltration, safe overflow and appropriate storage; survey/site conditions determine interventions. |
| Project Management & Implementation | Real Benjy teaching or working | Phased action plan, coordination, sourcing, contractors and hands-on implementation as agreed. |
| Fences, Pathways, Edges & Water Filtration | Existing natural acacia structure, plus verified schist path photo if found | Useful access, boundaries, terraces and edges. Water filtration is a distinct scoped service; do not confuse it with infiltration or claim drinking-water performance without confirmed system/specialist details. |

Prefer six strong lead visuals and a few expandable supplementary images over twelve equally prominent repetitive tiles. On phone: visible image/status/title/outcome, swipe or scroll with an obvious cue and keyboard-accessible controls; allow full-image view for diagrams. On desktop: calm two- or three-column rhythm, no mandatory tiny inset text.

**Work With Benjy:** individual remote/onsite consulting, food forests, gardens, orchard renewal, whole-property design, planting/action plans, implementation. **Work With Us:** Sofia + Benjy collaboration, larger projects and management, community gardens, partners for biopools, natural structures, workshops and wellbeing/yoga guidance. Share the land portfolio without erasing Sofia's role or duplicating all package details.

Keep visible email **holisticmission8@gmail.com** and WhatsApp **+351 920 067 347**. Leave the protected backend delivery destination unchanged. Primary land CTA **Tell Benjy About Your Land**, secondary **WhatsApp Benjy**; Work With Us can use **Tell us about your project** mapped into the same enquiry flow. Preserve all service selection behavior.

## 5. Pricing and client deliverables

Keep €111 Clarity; from €450 Focused Roadmap (from €650 onsite, relevant travel/scoping); from €1,500 Whole-Property Design; custom implementation. Explain the actual deliverables in a short list: visual direction, planting relationships, priorities/phases, action plan and agreed follow-up. Do not imply every low-cost session includes a full planting design.

Keep the approved Garden Collection in one canonical location on Benjy's page, linked from Work With Us:

| Example | Indicative establishment budget |
| --- | --- |
| Backyard Eden | €3,500–€6,000 |
| Family Abundance Garden | €5,000–€10,000+ |
| Edible Oasis | €5,000–€12,000 |
| Syntropic Eden | €7,500–€15,000+ |
| Eden Market Garden | €10,000–€25,000+ |
| Regenerative Acre | €12,000–€30,000+ |
| Eden Sanctuary | Custom |

These are examples, not fixed quotes or guaranteed area/yield promises. Distinguish design fees from establishment costs. State relevant materials, plants, irrigation, access, travel, tax and major-infrastructure scope once. Preserve the newer owner-approved names; do not reopen old naming questions.

Keep the live Luisa + Sim client example. Add the four polished sample sheets only as a separate later batch: land/water reading; planting relationships; phased implementation; seasonal care. Mark concept, unconfirmed levels/flow/pH/species/quantities. Preserve switchable levada supply and proposed contour edge; do not fabricate a surveyed construction plan.

## 6. Image selection and educational style

See companion `IMAGE_SHORTLIST_2026-10-13.html` and CSV: 26 local candidates with intended uses and verification notes. This is a selection board, not an assertion that every candidate is publication-ready. No new image ZIP/public archive is required to finish the site; original files remain separate from optimized web assets.

Already available: Moinhos gardens, Casa Oasis beds, Tomar gardens/biomass (board 03 and 09), Cairns university research collaboration, Benjy teaching/working among Vini’s oranges, Benjy/Sofia Miyawaki-style planting and restoration, Oliveira do Hospital terrace bed, natural timber work, existing pool for potential biopool conversion, Luisa + Sim concepts, orchard education and water/soil diagrams. The actual new portfolio mockup/pond art and exact schist-path source remain to be matched; do not substitute an unrelated image and call it the agreed one.

Caption rules: owner permission has been confirmed; do not ask again for a blanket release. Distinguish authorship/project role from image use. Sofia’s 13 October correction: **do not display “Real project” or other internal audit badges on photographs.** Use short, warm editorial titles and a useful place/process subtitle. Keep authorship/provenance metadata internally. Identify concepts naturally in visible captions (“proposed design”, “concept design”, “inspiration”) where needed to avoid implying a completed outcome. File names are not authoritative project locations: Casa Oasis = trellises/far-view terraces; Moinhos = Algarve retreat gardens; the original Amba photos were identified as Melides, but board image 03 (`melides-mulched-terraces.jpg`) and board image 09 (`03-moinhos-woody-biomass-trenches-horizontal.webp`) are explicitly corrected to **Tomar** by the owner; Luisa + Sim = curved rows beside levada near Tábua/Oliveira do Hospital. Cairns is university syntropic food-forest research, with collaborative work involving Thiago, Jay Jackson, Jeremy and volunteers; the university name has not been supplied. Use “syntropic rows” in copy. Board 06 is Benjy working among Vini’s oranges; 07 is Benjy and Sofia at a food-forest planting and ecosystem restoration project, Miyawaki style; 10 is a natural raised bed on a terrace in Oliveira do Hospital. Board 13 shows the existing pool that may be converted into a biopool. **Owner confirms image 16 is the existing land for image 15’s contour food-forest concept: present Existing land → Proposed design, not a finished before/after.**

Orchard/chicken and orchard transformation images were described by the owner as teaching/concept examples. Preserve older public-build exclusions on rights-unconfirmed masters until the asset-level source record resolves them; owner-provided does not automatically mean every earlier third-party master is cleared. No borrowed work represented as ours.

**Drawing style:** premium Awakening Eden illuminated field guide: fine soil-brown ink, hand-painted translucent forest/moss/teal/ochre/terracotta, warm quiet paper, recognizable Mediterranean plants, accurate readable land relationships. Real HTML/SVG annotations with strong contrast and a restrained handwritten accent. Prefer one teaching idea per graphic; clear arrows/legend and optional enlarged view; no baked-in miniature paragraphs or approximate sacred geometry.

Create only missing explanatory assets after selection: (1) homepage botanical divider; (2) orchard retrofit concept with existing-tree continuity if current art cannot explain it; (3) whole-property concept inset if needed; (4) water/overflow inset after technical review. These are illustrations, never evidence of achieved results. Do not artificially reconstruct photographic before/afters. Contrast/crop edits must preserve what actually existed.

Research references checked for the planning pass: [Regrarians Platform](https://www.regrarians.org/regrarians-platform) for whole-property planning sequence; [Agenda Götsch succession teaching](https://agendagotsch.com/pt/natural-succession-in-syntropic-farmingpdf/) for succession; [Water Stories](https://www.waterstories.com/stories?category=all) for restoration storytelling. These are practitioner/educational references, not endorsements or licences to reuse their photographs. Adapt technical graphics to actual site/climate evidence.

## 7. Living Library and guide finish

After reliability: keep films, books, guides and action networks immediately findable; consolidate repeated welcomes; preserve Films For Action, WaterBear, Farmer's Footprint, Project Biome and ORIGIN. Verify dated event information directly with the organizer before the release, especially the 17 October banner; don't leave stale event language after it passes.

Use the six painted navigation directions only after art inspection and correct route mapping. The original Gift Back card includes uncertified geometry and needs repair/approved overlay before public use. The four prepared Home doors are the first visual priority.

For the first three guides, one useful graphic and one practical action per batch; add original photo/video placeholders only where they teach something. Keep the Awakening Regeneration Guide free gift accessible; donation and feedback optional, not a surprise payment gate. E-commerce, scheduling, new inbox monitoring and the flagship workshop remain separate later work.

## 8. Execution and release sequence

1. **Reconcile once:** read this file, CURRENT and design lock; fetch fresh main/PR38; use persistent managed worktree or durable checkout, not an uncommitted temp directory. Preserve dirty local work and older previews. Compare SEO branch separately; no blind older-page replacement.
2. **Repair commit:** Library visibility/cache and nested thank-you assets; targeted tests.
3. **Homepage preview:** divider first, then approved welcome/quote/doors; screenshot desktop and phone.
4. **Benjy preview:** refine the one PR38 showcase into six visual offers, simplify repeated opening, clear fees/establishment examples and questionnaire. Work With Us follows using the same hierarchy and its distinct collaboration remit.
5. **Library polish:** only remaining navigation/discovery gaps. Optional deeper sample graphics/guides get their own batch after core pages work.
6. **Release candidate:** production build, worker/enquiry tests, appropriate browser suite, visual-lock and public-artifact checks. Test 360/390/768/1440, text zoom, keyboard focus, badges, full images, internal anchors, PDFs, contact links, no console errors, no overflow. Keep docs/source masters out of dist. No need to run the full suite for this documentation-only plan.
7. **Show Sofia desktop/phone previews and exact outstanding items. Obtain final approval before merge or deployment**, as requested in the new handoff. Then verify actual live pages, asset versions, search, routes and successful form flow. Record commit/deployment/rollback and what remains. GitHub push alone is not publication.

Save each verified implementation batch in Git and update CURRENT so another model can resume without reconstructing memory. One implementation owner per file. Claude can independently review the final previews if requested; don't create extra handoffs merely to change model.

## Ready-to-use Terra instruction

Continue from `CONSOLIDATED_TERRA_FINISH_PLAN_2026-10-13.md`. Inspect fresh main and PR38 first; current planning baseline PR38 `d88c855`. Preserve the dirty local fixes and prepared artwork. Apply only outstanding improvements. First prepare the homepage botanical divider and short approved welcome/quote/painted doors; keep the required Library and thank-you repairs in a separate small commit. Then refine PR38's single high service showcase into the six offers, preserving prices, truthful concept captions and warm photo titles, questionnaire and guide. Use a durable worktree, save progress in Git, run relevant checks, and show desktop/phone previews. Do not merge or deploy until Sofia approves the final candidate. No restart, duplicate gallery or wholesale redesign.


## Owner refinement: teaching first and orchard progression — 13 October

This section supersedes earlier candidate uncertainty for the images explicitly confirmed here. Preserve image numbers from the CSV while reordering presentation.

- Bring **21 orchard retrofit** and **22 water teaching** high in the unified showcase; show readable full-image views.
- Show **17 bare orchard → 18 orchard with grasses/chickens/fallen apples → an existing diverse food-forest concept (15)** as illustrative progression. They are different examples, not photographs proving one completed transformation. Keep the owner-confirmed **16 existing land / 15 proposed design** relationship explicit. Biomass and further diversity can be explained through teaching21 and concept15; do not invent visible mulch rows in18.
- **19 mandala garden** and **20 urban community garden** form a community-growing group. Rooftop gardens are a desired possibility; image20 does not establish a rooftop location. Find a suitable labelled rooftop reference later if needed.
- **23 whole-property design** belongs in the gallery and should connect directly to that service; use a shared expanded illustration rather than two large repeated copies. **24 food-forest layers** is teaching content.
- **25 is the finished raised bed in Oliveira do Hospital, the SAME bed as10.** Its misleading `water-living-soil-1280.webp` filename must not cause it to be reused as water-landscape evidence. Correct all relevant website alt/captions during implementation. Pair10/25 as related project views without inventing chronology beyond owner-confirmed finished view25.
- **26** is a biodiverse living edge, with wildflowers and pollinators. Use a concise natural caption.
- Group the final gallery by service/visitor interest; this planning board shows all26 candidates, but final service pages should still select fewer lead images and offer the rest in the same expandable gallery. No additional competing gallery sections.
