# Awakening Eden — final resume and release plan
14 October 2026 · verified review · implementation deferred to Terra at Sofia's request

This is the current status and execution order. It supersedes older status claims, not the approved design or image decisions. Read the [13 October detailed brief](CONSOLIDATED_TERRA_FINISH_PLAN_2026-10-13.md) and [numbered image register](IMAGE_SHORTLIST_2026-10-13.csv) for supporting detail. Do not restart the project or rebuild working pages.

## 1. Where we actually stopped

| Location | Verified state on 14 October |
| --- | --- |
| Live website | https://awakeningeden.org is serving the earlier homepage and service layout. Approved founders, community-circle and Library artwork remain. New arched doors, architects quote and PR38 funnel/showcase are not live. |
| GitHub main | `b118bde91db19d13aadf777284f681b6bcc4ac8b`. |
| Draft PR38 | Open, draft, unmerged; head `d88c8552a6bd9740b35fc860e6b0533f5b3c034b`. It contains the questionnaire, thank-you/free-guide journey and consolidated service showcase. https://github.com/eternallife11/Awakening-Eden-Library/pull/38 |
| Durable implementation checkout | `awakening-eden-finish-2026-10-13`, branch `codex/awakening-eden-finish-2026-10-13`, HEAD `d88c855`. Resume here. |
| Interrupted local changes | Homepage welcome/founders/quote; new `eden-heartfelt.css`; four copied door assets; fallback botanical divider; Library stylesheet version fix and test; root-relative thank-you assets. **Uncommitted, not pushed, not deployed.** |
| Service-page corrections | The new photo identities, six offer stories and seven garden examples have not yet been applied in this interrupted batch. |
| Other checkout | `awakening-eden-qa-tooling` holds the older source, reference art, archive and planning history. Preserve it; do not implement there or replace the newer PR38 pages with its older pages. |

No product files were edited, no commit/push/merge/deployment was performed during this 14 October review. Only this plan and the handoffs were updated.

## 2. What today's checks establish

- **26 live URLs checked: 25 returned 200.** The sole 404 is the not-yet-released `/work-with-benjy/thank-you`. Published guide aliases and the checked PDFs load. The four formerly broken guide routes no longer need a new repair.
- Live Home, Benjy, Work With Us and Library were inspected in the browser. Main-page approved art and direct resource/community links are present. Service pages are still too repetitive and the new showcase is absent.
- **Live Library search defect reproduced:** Fukuoka announces one result but 15 resource cards have rendered boxes. The unchanged stylesheet URL can retain the old CSS. The saved local version correctly renders **1 / 0 / 107** for Fukuoka / no match / Escape reset.
- Local nested thank-you route loads its styles and both images, with no overflow at 390px. This is a rendering check, **not proof that a submitted enquiry is delivered**.
- Local door artwork inspected on desktop and at 390px: two blank medallions still need the exact Lotus overlays. Inherited art width clips the cards; copying the four images did not finish the implementation.
- Production-origin build, zero-cost guard and static visual-lock guard passed on the saved source. The static guard does not detect missing new door overlays. Full release tests and final responsive visual review are still outstanding.
- Existing browser tests contain obsolete homepage and gallery assertions. Update them to the approved behavior; do not remove useful regression coverage to get a green result.
- ORIGIN's official page confirms 17 October 2026: https://ourorigin.earth/ . Recheck its time-sensitive language when releasing. Do not publish an invented replay link.
- Limits: this was a focused recovery audit, not a new exhaustive test of every external resource, all viewport sizes, every image or actual email delivery.

Evidence: project-root `outputs/awakening-eden-audit-2026-10-14/` contains the HTTP audit and downloaded primary-page source. Browser observations and verification are recorded here. Historical test counts in older handoffs are not results for this candidate.

## 3. The remaining decisions are settled

### Homepage: warm, clear and practical
Use the saved wording and the 11 October copy preview, with one final shortening pass. A suitable opening is:

> Welcome home to Awakening Eden.  
> Awakening Eden within us. Regenerating the living Earth around us.  
> We’re Benjy & Sofia. We share a deep love for life: co-creating food forests and beautiful living landscapes, gathering in workshops and circles, and sharing hopeful resources that turn inspiration into action.

Keep the founders' “A little sacred. A little silly. Deeply devoted to life.” line and Sofia's original architects quote. Present interbeing, original blueprint and New Earth language as our vision/worldview. Holistic, organic living belongs in the founders story; detailed detox/EMF discussions belong on the relevant wellbeing page, without unsupported benefits or a heavy medical disclaimer interrupting the welcome.

Two primary actions: **Work with Benjy** and **Explore the Living Library**. Secondary: Work with us, inspiring films, community/vision. Consolidate repeated opening buttons. Preserve the approved hero, bright Circle of Belonging, Library banner, mission art and exact twelve-fold SVGs. Village/sanctuary/festivals remain future invitations, not existing facilities.

### Service pages: show the possibilities early
Short introduction → concise service/package invitation + contact → **one** strong Projects & Possibilities gallery → offers/prices → what clients receive → principles and deeper stories.

Benjy: personal/remote consulting, planting combinations and phased action plans, food forests, garden/orchard and whole-property design, implementation and project coordination.

Work With Us: Sofia + Benjy collaboration, larger property/project management, community gardens, partner-supported biopools, natural structures/fences, workshops and relevant yoga/wellbeing guidance. Keep it distinct from Benjy's page. No trellis/raised-bed lead hero; use a strong landscape, labelled concept and human working/teaching image.

Use warm short titles and one useful outcome. Remove “Real project” public labels. Keep **Proposed design**, **Teaching illustration** or **Inspiration** where needed. Visible WhatsApp and email: `+351 920 067 347`, `holisticmission8@gmail.com`. The draft guide-feedback link currently points to `regenerativeeden@gmail.com`; use the last explicitly confirmed public inbox unless a newer owner confirmation is found. Do not silently change backend delivery settings or set up inbox monitoring.

## 4. Terra execution — three small batches, then release

### Batch 1 — preserve the working foundation
1. Resume the durable finish checkout; inspect GitHub main/PR38 once for new changes. Preserve every dirty file. Do not cherry-pick the entire older checkout or blindly merge the SEO branch.
2. Retain the root-relative thank-you asset fix. Verify its clean nested route, guide link, noindex and metadata.
3. Test questionnaire Next/Back, validation, input preservation, selected offer, error recovery and success-only redirect using mocked delivery. Preserve Turnstile, origin, honeypot and rate-limit controls. No unsolicited test email or ad-conversion setup.
4. Update stale tests for the agreed page structure. Save this repair as a scoped commit when implementation resumes.

The Library search cache/visibility issue is documented and its local fix is ready, but Sofia has explicitly deprioritized it. Do not spend the visual release budget on it. Apply it only if it is a quick, isolated safety repair after the public-facing pages are complete; otherwise hold it for the next maintenance release.

### Batch 2 — complete Home and the service pages
1. **Doors:** add canonical `assets/geometry/lotus-of-life-12-exact.svg` overlays on Begin Here and Library. Start from Claude's documented overlay/crop coordinates, then inspect actual responsive rendering. Work/Community require no invented medallion. Reset inherited `.door-card__art` width to the card width; current extra-width rule clips the art. Keep readable HTML labels, text and controls.
2. **Divider:** the local `botanical-divider-01.webp` is only a fallback. Create one slender earthy botanical flourish from the approved reference if it still needs improvement; no new hero or geometric disc. Use the imagegen skill for raster work. Correct intrinsic dimensions and inspect on the real background.
3. Finish the short welcome, requested quote and clear button hierarchy above. Avoid another long vision essay.
4. **Benjy first, then Work With Us:** refine PR38's existing single showcase rather than adding competing galleries. Six offer stories: food forests; whole-property design; orchard retrofit; water landscapes; implementation/project management; natural structures/edges. Bring teaching boards 21/22 high and let visitors open readable full images.
5. Add an accessible enlarged-image view to the unified gallery. The old gallery script requires markup no longer used by PR38; the new figure grid currently has no working enlargement controls. Verify keyboard use, Escape, restored focus and a direct-image fallback. No automatic carousel.
6. Apply the image register below everywhere the misleading filenames occur, including alt text and older story sections. Reduce repeated citrus imagery and repeated enquiry blocks.
7. Add the seven Garden Collection examples once on Benjy; Work With Us links into that canonical collection. Keep concise expandable details. Separate **design/support fees** from **indicative establishment budgets**.
8. Preserve the existing Luisa + Sim example and strengthen only missing client deliverables: annotated proposed layout, planting relationships, berry row, controllable levada connection subject to site checks, phases, priorities and implementation options. Do not imply the concept is built.

### Batch 3 — Library clarity, review and publication
1. Shape the Library as an inviting, scrollable pathway through films, documentaries, books, guides, people and platforms. Use compact editorial introductions that explain why each collection matters and a clear next action. Retain Films For Action, WaterBear, Farmer's Footprint, Project Biome and ORIGIN. Take structural inspiration from excellent resource libraries—clear shelves, generous imagery, short human annotations and calm discovery—but write all Awakening Eden wording and do not copy other projects' prose, layouts or imagery.
2. Four Home doors are the immediate visual priority. The **six painted Library navigation cards remain outstanding**, not “already done.” Treat their crop/route/geometry check as a discrete follow-on batch; do not publish uncertain medallions or hold a working search repair hostage to new artwork.
3. Run production build, Worker/enquiry tests, relevant browser suite and public-artifact/visual-lock checks. Inspect Home, both service pages, Library and enquiry/thank-you on desktop and phone; exercise 360/390/768/1440 layouts, keyboard, text zoom, concepts, full images, downloads and contact actions. Treat search repair as deferred unless it remains a tiny isolated final fix. Keep private docs, original masters and deliverables outside the build.
4. Show the actual final candidate and record remaining items. Use the owner's current execution/release instruction when Terra resumes; today's request is review-only. Older preview-only rules do not require re-approval of the same scope if already authorized. New price/offer changes outside approved scope still need confirmation.
5. Commit/push the scoped candidate, resolve the single PR38 integration path against fresh main, check CI, merge through the existing workflow and deploy using the established Cloudflare procedure when release is authorized. Do not leave competing unmerged releases or force-push main.
6. **Verify the real public site after deployment:** new Home quote and door URLs/overlays; correct image captions; seven package examples; working gallery; search 1/0/107; all critical routes and PDFs; nested thank-you route; controlled enquiry success verification as authorized. Record commit, provider deployment ID, time and rollback. A GitHub push or successful build is not evidence of publication.

## 5. Photo corrections that must survive the handoff

Numbers refer to the existing 26-image board; retain IDs even if the gallery order changes.

| IDs | Final owner-confirmed treatment |
| --- | --- |
| 3, 9 | **Tomar** gardens. Legacy Melides/Moinhos filenames are misleading. Audit the full surrounding story, not just a caption. |
| 4 | Cairns syntropic university research collaboration. Credit the team in the deeper story: Thiago, Jay Jackson, Jeremy, Benjy and volunteers. Do not invent a university name or transplant tropical planting advice to Portugal. |
| 5, 6, 7 | Teaching; Benjy at **Vini's oranges**; Benjy + Sofia at food-forest planting/ecosystem restoration, **Miyawaki style**. |
| 8 | Logs/biomass trenches, fertility and habitat for mycelium; no invented measured results. |
| 10, 25 | Same natural terrace raised bed, **Oliveira do Hospital**; 25 is the finished view. `water-living-soil-1280.webp` is a bed photo, not water-landscape evidence. Correct every use. |
| 11, 12 | Natural acacia structures and stair rail. |
| 13 | Existing pool with **potential** for a partner-supported biopool conversion, not a completed conversion. |
| 14 | Luisa + Sim's **proposed** curved rows beside the levada. |
| 16 → 15 | Owner-confirmed existing land → proposed contour food-forest design. Never “completed after.” |
| 17 → 18 → diverse concept | Bare orchard; grass/chickens/fallen apples; more diverse food-forest possibility. These are **different examples**, not proof of one transformation. |
| 19, 20 | Mandala inspiration; urban community garden. The second image is not established as a rooftop. |
| 21, 22 | Orchard-retrofit and water teaching illustrations high in the showcase; readable expanded view. |
| 23, 24, 26 | Whole-property illustration tied to service; food-forest layers; wildflower/pollinator living edge. |

Keep **Moinhos, Algarve** retreat gardens and guest teaching distinct from **Casa Oasis** terraced gardens/trellises and the Tomar photographs. No fresh blanket rights question is needed for owner-confirmed assets. Existing restricted source masters remain excluded.

## 6. Approved price architecture

Design/support: €111 clarity; from €450 focused roadmap / €650 on site; from €1,500 whole-property design; custom implementation.

Indicative establishment examples, with scope/materials/travel/irrigation and tax treatment clearly stated from the agreed offer, not guessed:
- Backyard Eden: €3,500–€6,000.
- Family Abundance Garden: €5,000–€10,000+.
- Edible Oasis: €5,000–€12,000.
- Syntropic Eden: €7,500–€15,000+.
- Eden Market Garden: €10,000–€25,000+.
- Regenerative Acre: €12,000–€30,000+.
- Eden Sanctuary: custom.

Do not invent additional public prices, yield guarantees, response-time guarantees or a medical service offer.

## 7. Keep for the next improvement cycle

Do not spend the final release budget on a redesign, another image archive or a full resource expansion. Existing photos/concepts are sufficient for this release.

Then: six Library painted cards; one teaching graphic per first-three-guide batch; refined client sample boards; short original teaching videos; rooftop reference if needed. Use the saved premium earthy illustrated-field-guide style: fine soil-brown ink, translucent forest/moss/teal/terracotta/ochre, quiet parchment, Mediterranean plants, accurate land relationships and readable live-text annotations. Each graphic teaches one idea. No imitation of a named artist's exact work or invented photographic outcomes.

Guide remains a free gift with optional donation and feedback. E-commerce, booking integration, new email account/monitoring, broader SEO branch integration and flagship workshop are separate tasks.

## Resume instruction

Continue in `awakening-eden-finish-2026-10-13` from this plan. Check fresh main/PR38, preserve the saved dirty edits, finish Batch 1, then Home and Benjy/Work With Us, then Library clarity and final release verification. Reuse existing images and decisions. No new planning round, duplicate gallery or wholesale redesign. Save tested progress in Git and update CURRENT after each batch.

