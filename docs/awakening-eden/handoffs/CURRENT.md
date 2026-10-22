# Awakening Eden — current handoff

Updated 22 October 2026. This status supersedes the historical commit/push notes in older handoffs.

## Resume here

**22 October: homepage opening and original Lemuria soundscape are ready for owner review.** Read [the homepage and sound handoff](HOMEPAGE_SOUND_2026-10-22.md) first. Implementation commit `d4cbc41` adds the Mother Tree to the right of the clarified regenerative-home/Living Library opening, preserves the authentic Benjy & Sofia tree-planting photograph, improves their intro, and places the four painted doors directly after it. The new original player offers selectable 432 or 528 Hz tones with an octave below, soft synthesized rainforest/rain/ocean layers, and optional bowl/chime sounds. The compact “Shape your sound” panel controls the mix; sound always waits for a click, even on return visits. Nature and instruments are explicitly described as synthesized; no medical claims or borrowed audio. The 3.5 MiB Mother Tree master is internal; the public WebP is 0.56 MB. **Work with Benjy and all other destination pages are unchanged in this pass.** Build, zero-cost, visual-lock and diff checks passed. All 12 final audio tests passed across desktop/phone Chromium, Firefox and WebKit, including measured spectral peaks and silent suspension. Six focused homepage structure/asset/overflow/accessibility checks passed on desktop/phone; two final visual captures also passed after the last refinements. Reviewed screenshots: `test-results/review/home-top-*`, `home-intro-*`, `home-doorways-*`, `harmonics-*`. PR38 was verified open and draft before this pass; no production merge/deployment or live enquiry test has occurred. Next: owner listens/reviews at http://127.0.0.1:8787/, then the established release gates. Prefer this HTTP preview over opening the source HTML as a file.

**20 October follow-up: Benjy page opening and village invitation refined.** Commit `7ce7d01` changes the hero to “Bring your project vision to life,” names the full land/project scope, explains the online or on-site first conversation, adds biopools and water filtration with qualified specialists, and invites messages about the future village without presenting it as built. The village paragraph uses the owners' six-to-eight-year learning timeframe. The existing authentic project gallery, four offers, pricing and enquiry flow remain. Cloudflare build plus zero-cost and visual-lock guards passed; 14 focused desktop/phone browser checks passed on the first copy pass and six final checks passed after the last wording refinement, including accessibility and screenshots. Desktop/phone hero images were inspected at `test-results/review/`. Draft PR38 remains the review vehicle; no production release or live enquiry delivery check has occurred. Next: owner review of the updated page, verify production enquiry delivery before release, then merge/deploy only with owner approval and verify the public result.

**20 October: the owner-approved service consolidation is ready for draft review.** Read [the service and logo handoff](SERVICE_CONSOLIDATION_2026-10-20.md) first. `/work-with-benjy` is the single land-services destination, backed by real project photographs and four clear ways to work together. The old Work With Us URLs redirect there; homepage doors and navigation point to Library, Benjy, Homes and Sofia. Public footer logos now use the approved painted mark directly. All 224 browser checks passed across Chromium, WebKit and Firefox after installing the missing Firefox test binary; build, visual-lock, zero-cost and worker-enquiry checks also passed. Draft [PR38](https://github.com/eternallife11/Awakening-Eden-Library/pull/38) is the review vehicle. **No production release or live enquiry delivery check has occurred.**

**17 October: Terra material implementation committed and backed up for review.** Read [Terra material implementation handoff](TERRA_MATERIAL_IMPLEMENTATION_2026-10-17.md) first. The eight-card authentic homepage story is now live in the candidate, alongside Sofia practice imagery, a compact Journey moments section, Benjy’s field/orchard practice, and carefully described pool/orchard establishment process material. 61 originals, a filename/hash index and three reviewed contact sheets remain preserved outside the repo in `../terra-material-handoff-2026-10-17/` relative to the checkout root. Public derivatives are responsive WebP files in `assets/photos/living-story/`; their provenance is recorded in the Terra handoff. Build, visual-lock and zero-cost checks passed; focused desktop/phone browser review found no page-level horizontal overflow and all in-view selected images loaded. Commit `075c4a8` is pushed to both safeguarded branches and reflected in draft [PR38](https://github.com/eternallife11/Awakening-Eden-Library/pull/38). The work is not deployed. Next: obtain owner review before any production release.

Latest finishing pass, 16 October: Homepage Living Story core is implemented. Authentic founders portrait, short intro, remapped painted doorways, four-path overview, four-image project/teaching gallery and concise homes introduction. Tree of Life art is retained later in the page. Previous contrast fixes, Village Homes headline and main Regeneration guide's Zones 0–5 panel are also included. See `../proposals/HOMEPAGE_LIVING_STORY_PLAN_2026-10-16.md` for scope and remaining image selections. Local review remains http://127.0.0.1:8787/ (rebuild `dist/` after editing). No production deployment. Next: review desktop/phone; select optional Sofia/festival/Lemuria images; run full release checks and verify enquiry delivery before release. Focused homepage route/image/overflow/accessibility checks accompany this pass; do not describe them as the full browser suite.

Durable checkout: **awakening-eden-finish-2026-10-13** at project root. Local branch: `codex/awakening-eden-finish-2026-10-13`.

GitHub CLI is authenticated as `eternallife11`, credential stored in keyring, Git credential helper configured. Do not repeat sign-in unless authentication actually fails.

The finishing candidate is backed up on two GitHub branches: `codex/awakening-eden-finish-2026-10-13` and PR38's source, `codex/work-with-benjy-regenerative-funnel-2026-10-09`. Push normal fast-forward updates to both. [PR38](https://github.com/eternallife11/Awakening-Eden-Library/pull/38) is the existing draft review; do not create a duplicate.

**No production merge/deployment has been performed.** Local preview: http://127.0.0.1:8787/ serves `dist/`; rebuild after source edits. Visual changes require desktop/phone review before release. The user has approved the general homepage wording/style; preserve it except for newer explicit corrections.

## Latest: whole-property teaching illustration

Owner requested an immediate logical zoning redraw. Original painted Zones 0–5 artwork now replaces the old confusing bubbles on Village Homes, Work With Us and Eden Designer. Captions are large/selectable; full-size art opens on click; Village Homes has a readable six-zone guide. Zones follow care frequency, with a contextual note on daily market gardening and site-dependent placement.

[Asset, prompt, sources and QA record](../proposals/WHOLE_PROPERTY_ZONES_V2_2026-10-16.md). Public build, visual-lock and zero-cost guards passed; desktop/phone checks 4/4. Local screenshots: `test-results/zoning/`. Keep future educational descriptions at least 16px and available outside the bitmap.

## Already implemented in the candidate

- Homepage: the 22 October owner-authorized opening now leads with a regenerative home/Living Library promise, Mother Tree and optional sound, followed by the authentic founders photo and revised intro, four painted doors and the existing deeper page. The older [owner lock](../design/HOMEPAGE_OWNER_LOCK_2026-10-15.md) remains historical where newer explicit decisions supersede it.
- Painted doors use the full portrait ratio. Canonical exact twelve-fold Lotus overlays are centred in the sun and book circle; never substitute Seed/Flower geometry.
- Spotify and original Web Audio Lemuria Harmonics: selectable 432/528 Hz plus octave support, synthesized nature environments and bowl/chime textures, gentle volume, synchronized header/card controls, remembered mix, full pause and Spotify coordination. Always opt-in; no autoplay or medical claims. Final audio checks 12/12 across four browser/device targets.
- Work With Benjy: the single land-services destination, with authentic image-led proof, approved service offers, clear WhatsApp/email paths and the existing enquiry form. Preserve outcome-first ordering and factual concept labels. Work With Us is a redirect/fallback, not a competing service page.
- Village Homes: options, connected services, whole-property support and an explicitly future village vision. [Homes handoff](../proposals/VILLAGE_HOMES_HANDOFF_2026-10-15.md).
- Earlier candidate includes Library presentation/search fix, botanical divider, questionnaire/thank-you/free-guide pathway and the nested thank-you asset fix. These must not be described as live without verifying production.

## Remaining release work

1. Review the current desktop/phone candidate with Sofia and Benjy, including the newest zoning illustration. Use existing test screenshots/local preview; do not rebuild approved sections unnecessarily.
2. On final release approval, complete the public build checks and verify production Turnstile hostname and actual enquiry delivery. Local tests stub Turnstile; no real delivery test has been performed.
3. Recheck the organizer's ORIGIN event date/status at release; historical 17 October wording is time-sensitive.
4. Merge/deploy through the established release path, check the actual public URLs, then record deployment and rollback details here. Do not claim GitHub push equals production release.
5. The final exported Village Homes supplier catalogue and Lemuria vision artwork from the other chat still need attachment. Do not invent supplier agreements or claim those exports were integrated.
6. Six additional painted Library resource cards remain a separate optional visual batch after release.

## Supporting plans

- [Final resume and release plan](../proposals/FINAL_RESUME_AND_RELEASE_PLAN_2026-10-14.md).
- [13 October consolidated brief](../proposals/CONSOLIDATED_TERRA_FINISH_PLAN_2026-10-13.md).
- [Owner-confirmed image register](../proposals/IMAGE_SHORTLIST_2026-10-13.csv).

The older QA-tooling checkout is reference/history only. Do not overwrite the newer service pages with it. Keep unconfirmed orchard masters out of public builds. All archived status notes remain in [archive](archive/CURRENT_before_zoning_2026-10-16.md); newest owner decisions prevail.
