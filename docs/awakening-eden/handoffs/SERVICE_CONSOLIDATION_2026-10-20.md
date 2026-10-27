# Land services and logo consolidation — 20 October 2026

## Decision and result

The owner chose one clear land-services destination. `/work-with-benjy` now carries the practical offer, real project photography and the enquiry path. `/work-with-us`, `/work-with-us/` and `/work-with-us.html` redirect there. The old page remains a minimal noindex fallback for hosts that do not apply redirects. This candidate is for review in draft PR38; it is **not a production release**.

## What is in the candidate

- The homepage’s four painted doors now lead, in order, to the Living Library, Benjy’s land and garden services, Homes & Living Places, and Sofia’s work. The exact twelve-fold Lotus overlays remain attached to their original painted door artwork.
- Shared navigation names the four pathways, Our Story and one conversation link. Existing land-service links across public pages lead to Benjy’s page.
- Benjy’s page starts with the outcome and immediate enquiry actions, then shows four documented project stories and an expandable gallery. The Moinhos terrace sequence has dated stages; project photos are described as moments of work rather than measured or guaranteed outcomes. Proposed designs appear separately and are labelled as concepts.
- The page explains online clarity/video consultation, a focused roadmap, whole-property design and individually scoped implementation/project coordination. It also covers food forests, permaculture gardens, orchards, soil, water, pathways, natural fencing, timber details, workshops and buyer/referral questions. Existing approved offer prices and the enquiry form hooks remain.
- Homes & Living Places distinguishes current planning/coordination help from the future village vision. No supplier relationship, completed village or built outcome is implied.
- Public footer references to the retired line-art mark now point directly to the approved painted Tree-and-Heart mark. The existing matching favicon family remains in place.

## Verification

- Cloudflare candidate build completed: 414 public files, 108.1 MiB. Visual-lock and zero-cost guards passed; worker enquiry tests passed.
- Full browser run: 218 checks passed on desktop and phone Chromium plus desktop WebKit. Six Firefox checks initially could not start because Playwright’s Firefox binary was missing. After installing it, all six Firefox layout checks passed. Together, all 224 distinct browser checks passed.
- Checked Benjy’s final phone hero and footer visually. On phone, the primary actions appear before the tall photograph. Project images, deep links, disclosure panels, route redirects, offer-to-form selection, page width and automated accessibility checks passed.
- Local tests stub Turnstile. They do **not** prove live enquiry email delivery or production hostname configuration.
- The PR public-build workflow's old requirement to list `/work-with-us` in the production sitemap was updated to require its removal and the three permanent redirects instead. This matches the one-destination decision.

## Release boundary

Benjy and Sofia should review the candidate in [draft PR38](https://github.com/eternallife11/Awakening-Eden-Library/pull/38). Before a public release, follow the repository owner gate, check the live Turnstile hostname and actual enquiry delivery, then verify public routes after deployment. The project video and rights/consent review remain separate from this photographic release candidate. The final Homes supplier catalogue and Lemuria artwork have not been supplied here and must not be claimed as integrated.

The working checkout is `awakening-eden-finish-2026-10-13`, on branch `codex/awakening-eden-finish-2026-10-13`. The same candidate should be pushed to PR38’s source branch `codex/work-with-benjy-regenerative-funnel-2026-10-09` for review.
