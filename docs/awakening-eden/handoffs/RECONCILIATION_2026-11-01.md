# Website and laptop reconciliation — 1 November 2026

## Source of truth

- Latest integration inspected: PR #43, `558a6100ab1bd28c2a9242d7c160c080a182b986`.
- Approved main: `607e995df4f9b231b61285a8862391678f69149b` (merge of PR #38).
- Laptop finishing checkout: `awakening-eden-finish-2026-10-13`, clean at `e0da6fbdb221eaccd83da3f8dbeb79a03c0dd35c`. This commit is already an ancestor of PR #43. No newer laptop finishing changes were overwritten.
- Pinned chat recovered: “AW.E Page final touches laptop sofia”, ID `01a0fc71-7c6b-7080-bdea-f4a5248f243e`. Its final turn records PR #38 merge, production deployment and post-deployment checks. Its sidebar summary mentioning `520ed4f` is stale and that abbreviated commit was not found in this repository.
- Other local checkouts were preserved. `awakening-eden-qa-tooling` has uncommitted instructions, historical handoffs, a Library stylesheet cache-version change and browser-test assertions. Its older cache version is superseded by the integration's October 16 version; the hidden-card CSS fix exists in the current source. The additional old test assertions remain untouched in that checkout.
- Work continued in isolated `eden-pr43-reconciliation`, branch `codex/pr43-artwork-reconciliation`.

## Recovered artwork

Downloaded `Awakening_Eden_Ready_To_Launch_Handoff_Nov_2026.zip` contains ONLY the two homepage WebPs and three markdown documents, not all six images claimed by the newer release handoff. The extracted files in Downloads were copied byte-for-byte:

| File | SHA-256 |
| --- | --- |
| `assets/hero/eden-new-earth-dotwork-sun-1536.webp` | `60f5eea918948b09e12718aacfe79b6bd0823e9b6c991246698e18eae3f7758c` |
| `assets/hero/eden-new-earth-dotwork-sun-960.webp` | `17b9bf9043099881518414752ba85326e198e7df07851f70429e209b9bebb691` |

No generated substitute artwork was used. Preserved the existing Circle, founders artwork, favicon, portraits, service offers and prices. The owner's October 23 geometry decision supersedes the old exclusive twelve-fold statement in the downloaded package.

## Four consulting assets recovered in the later user-supplied ZIP

The initial search below was accurate for the earlier ZIP but is superseded: `Awakening_Eden_Complete_Website_LinkedIn_Explee_Launch_Kit_Nov2026.zip` was then supplied at an explicit Downloads path. It contains all four previously missing consulting images, the two unchanged homepage images, and design previews. The four files were extracted without alteration:

| File | SHA-256 |
| --- | --- |
| `assets/work-with-benjy/brand/work-with-benjy-painted-banner-1536.webp` | `e7aa9469552e81296554deb9162b8fcb90d7a8a6c747f185d6b72ea78f2040a9` |
| `assets/work-with-benjy/brand/work-with-benjy-painted-banner-960.webp` | `07e1794560a540fc5b66d8b384f0b0e296cb7666b545448f545171c84d747ebb` |
| `assets/work-with-benjy/brand/work-with-benjy-painted-emblem-mobile.webp` | `6e6e9dd6fbce07e6bea6e40ef8dadfc56d652ff6a0efd90df05eb9d0c350f2c1` |
| `assets/work-with-benjy/brand/work-with-benjy-social-preview-1200x630.jpg` | `c65499a387006d2dc3888e83481b8f58447325f42a53def63a1c2431b963408a` |

The originating chat's `sandbox:/mnt/data/Work_With_Benjy_Identity_Handoff.zip` itself remains inaccessible, but the complete ZIP supplies the exact named public files. All six release artwork paths now resolve in the local public build. The rendered mobile image needed a CSS-only crop to hide a narrow sliver of truncated desktop text. The selected source binary remains exact.

## Review and fixes

The new homepage artwork loads uncropped at all four reviewed widths. Fixed an inherited `left: -8rem` rule that overrode the intended right placement of the Mama Tree watermark; explicitly reset left, bottom and aspect ratio and updated stylesheet cache version. The background remains static, faint, behind content and absent on mobile.

Work with Benjy retains the real portrait and has the new consulting SEO title/description, visible service keywords, four honestly labelled portfolio cards, WhatsApp primary CTA and email-draft secondary path. The exact identity banner and social image are now present. Desktop and phone rendering were reviewed; a CSS-only crop hides the mobile image’s stray right-edge lettering.

## Verification

- Production-origin public build passed: 431 files / 113.5 MiB before the final right-side CSS correction; rebuilt after correction.
- Zero-cost and visual-identity guards passed.
- 13/13 enquiry-worker tests passed.
- 12/12 focused desktop/mobile browser tests passed: enquiry draft, no POST submission, five service choices, navigation, redirects and expanded-page usability.
- Additional rendered inspection at 360, 390, 768 and 1440 px: no horizontal overflow or JavaScript exceptions on home or consulting page. Homepage has no broken images. Consulting page initially reported the missing crop/banner; after the complete ZIP was supplied, all image paths resolved at the same four widths.
- Exact primary WhatsApp URL and prefilled message inspected; no message sent.
- New `scripts/check-launch-artwork.mjs` initially identified the four missing files; it now passes with all six images in the public build. CI executes this gate. A successful artifact build alone is not release approval.
- Corrected the homepage preload so the selected New Earth painting receives first-image priority; the Circle further down is lazy-loaded. This avoids prioritizing the previous opening artwork.
- Lighthouse desktop reports on the final local public build: home performance 72 / accessibility 100 / SEO 100; Work with Benjy 76 / 100 / 100; Living Library 77 / 100 / 100; partners 91 / 100 / 100. Home LCP 2.4 s, Benjy LCP 3.5 s. These single-run local results show further performance work remains, especially older page CSS/image weight; they are not a production field-data claim. Reports in `lhci-reports/` are local and excluded from deployment.
- Two public PDFs were also corrected: the free guide has its visible last-page URL and clickable target updated to the official domain (11 pages, rendered last page reviewed), and the film resource library has six link annotations updated (22 page drawing streams and sizes unchanged). All public files now scan clean for the old Netlify host.
- Final SEO sweep corrected 17 remaining public HTML files whose canonical, social, structured-data or sharing links still used the retired Netlify host. The release workflow now checks that no built HTML page retains that host. Its first CI run exposed a builder-injected logo URL still using Netlify in staging mode; the builder now uses the official domain for that structured-data logo, and both staging and production public builds pass the origin check.
- The GitHub browser job exposed one stale Work with Benjy assertion expecting removed hero wording. Updated it to assert the approved whole-property message; the focused test passed on desktop and phone (2/2). The obsolete GitHub runs were cancelled after this correction; rerun CI on the latest commit.
- Final local verification after all six assets: production build, artwork gate, visual and zero-cost checks pass; 13 Worker checks pass; 12 focused desktop/phone browser checks pass. The harmonics test timed out in an attempted broad run and passed when rerun alone (1/1). The broad run was stopped after 20 passes because it is lengthy; do not report it as fully passed.
- Local evidence: `test-results/reconciliation/` contains four-width page screenshots, close-up desktop/mobile identity views, portfolio views, and `results.json`. Final mobile crop: `identity-final-390.png`. All image URLs load, including the page-specific social image.
- PR #43 remains a draft until the GitHub checks and final review are complete. No production merge or deployment was performed during this local pass.

## Make / Explee continuity

Recovered the local `outreach/Make_Explee_Hot_Leads_Free_Setup_Guide.md`. Preserve the requested Make.com route, secure rotated credentials, deduplicated Google Sheet updates, cursor advancement only after successful processing, and preservation of manually maintained fields. Free-tier polling/credits and the exact API shape must be reverified before activation. No Make scenario was activated, no API key was read or copied, no outreach was sent and no spending was enabled.

## Next steps

1. Add the recovered four files to PR #43 and complete CI/release checks.
2. Review the finished desktop/mobile layouts and social image with Benjy/Sofia.
3. Merge and deploy only once the release checks and owner review are complete; retain main `607e995` as the source rollback reference.
