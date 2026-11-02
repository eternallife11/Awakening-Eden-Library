# Portfolio design journeys and gentler Lemuria · local review draft

## Scope and coordination

Built on reconciled PR #46 head `85290d748a7c24bea955e905e5882fc8c2057921` in `/private/tmp/eden-home-polish-nov2`. GitHub connector confirmed PR #46 remains open, draft and unmerged, with that same head. No publication or merge is authorized for this round. The current portfolio/audio edits are local and have not been pushed to PR #46.

Preserved the current homepage artwork, painted doorways, founders photo, navigation, manifesto, Library additions, services, indicative pricing and existing enquiry form. Added a scoped CSS file and one compact section rather than replacing the service page.

## Client permission and source handling

Owner confirmed: “we got public use permission without street and map coordiantes of all.” Use the display name **Fiona’s Oasis · near Pedrógão Grande**. Do not repeat the permission question. Check future supplied originals for embedded street names/coordinates and remove metadata from web derivatives.

Source originals remain unchanged in Downloads. New WebP derivatives omit EXIF and XMP; confirmed using Sharp metadata inspection. No street/route number or coordinates were visible in the selected Adam boards. Options A/B contain the N236 identifier and were omitted rather than altering their annotations. Generic road/direction labels are not addresses.

| Web derivative | Supplied source | Purpose |
| --- | --- | --- |
| `fionas-oasis-journey-overview.webp` | `Lomba_da_Casa_Design_Journey_Overview.jpg` | Seven-panel overview, accurately described as one overview |
| `adam-orchard-water-concept.webp` | `Adams water retention landscape.png` | Lead future orchard/water concept |
| `adam-storage-overflow-option.webp` | `adams part 3 water.png` | Supplemental storage/overflow option |
| `adam-orchard-section.webp` | `adams water retention.png` | Supplemental orchard/water teaching detail |

The seven separate Fiona originals could not be retrieved from ChatGPT Library or located in the accessible laptop files. The supplied handoff was read and overview reviewed, but **do not claim all seven originals have been inspected**. Need the source ZIP or seven files to replace the overview with individually readable stage images. Before public release, check the aerial basemap source/licence and attribution; client permission alone does not establish basemap rights. Keep this preview local until that is resolved or omit the aerial panel using the originals.

`IMG_8437.HEIC` was inspected through macOS Quick Look after ordinary HEIC conversion failed. It shows Benjy in a lush vegetable garden, not evidence of Adam’s property. Not assigned to Adam or added as another repeated portrait.

Both new cases are clearly described as design concepts with site verification pending. Existing source boards retain their own annotations. No completed construction, ecological outcomes, measured boundaries or safe engineering design is asserted.

## Lemuria changes

- Removed the continuous 432/528 Hz sine drone.
- Soft, intermittent synthesized bowl strikes have a selected 432 or 528 Hz fundamental, integer partials and individual finite decays; gentle handpan-style notes use related pitches. Frequency changes schedule a fresh bowl instead of waiting for the long interval.
- Rain is substantially reduced and its bright/hissy layer softened. Existing real tropical birds and kookaburra recordings remain intact.
- Instruments can be switched off without leaving an audible continuous tone. Play remains opt-in; pause, remembered mix, external-playlist coordination and unsupported-browser fallback remain functional.
- UI explicitly calls the instruments **sound-designed**, not real recorded crystal/Tibetan bowls. No healing outcome claimed. Final subjective listening review belongs to Benjy/Sofia; automated signal checks do not establish artistic quality.

## Real recordings shortlist, checked 2 November 2026

- Magpie, Fryers Forest, kangaroovindaloo, CC0: https://freesound.org/people/kangaroovindaloo/sounds/584903/ (48 kHz stereo, 11.7 seconds; source identified by recordist).
- Tibetan bowl, SamuelGremaud, CC0: https://freesound.org/people/SamuelGremaud/sounds/518702/ (48 kHz/24-bit stereo, 35.7 seconds).
- Quartz crystal singing bowl, juskiddink, CC BY 4.0: https://freesound.org/people/juskiddink/sounds/129219/ (credit required; sustained D-note source, so audition and use sparingly).
- Handpan performance, HECKFRICKER, CC0: https://freesound.org/people/HECKFRICKER/sounds/625312/ (recordist notes faint air-conditioning noise; audition before selecting).

These four recordings have **not** been downloaded or integrated. Original downloads require Freesound login. Owner may download them for the next mix pass. A natural bowl’s pitch is not automatically 432/528 Hz; analyse and tune instrument samples if needed, keeping bird recordings at their original pitch. Keep published credits and licence records with each asset.

## Verification and preview

- Production-origin static build passed: 444 files, 121.7 MiB; no deployment occurred.
- Visual-lock and zero-cost guards passed; `git diff --check` passed.
- 12 audio browser tests passed across desktop/mobile Chromium, Firefox and WebKit, including measured 432/528 fundamental, instruments-off silence, pause, saved preferences and graceful fallback.
- 2 portfolio tests passed (desktop/mobile): 4 unique images load, enlargement links return WebP/200, enquiry CTA reaches existing form, no overflow or page errors, no Axe violations in the new section.
- Desktop and phone previews inspected. Detailed boards are lazy-loaded inside the optional disclosure.
- Local preview: http://127.0.0.1:8792/work-with-benjy#design-journey
- Review screenshots: `/private/tmp/eden-design-previews/desktop-chromium.png`, `/private/tmp/eden-design-previews/mobile-chromium.png`; visible-browser captures exported into the task’s visualizations directory as `eden-design-journey-desktop.png` and `eden-design-journey-mobile.png`.

## Next steps

1. Benjy/Sofia review the desktop/phone preview and listen to the local Lemuria mix.
2. Obtain Fiona’s seven originals and check aerial-source rights; build the individually readable progression without duplicate imagery or identifiers.
3. Optionally add the downloaded magpie/bowl/handpan recordings after audition, licence logging and instrument pitch analysis.
4. Only after review, reconcile/push the local follow-up onto the current PR #46 head without overwriting parallel changes. Keep it draft until owners approve publication.
