# Client delivery guide (owner decision 17 Nov 2026)

How finished consulting deliverables reach Benjy and then the client. Proven on Adam & Sandra's €150 report.

## Where files live
- **Client photos, maps and reports never go into Git or the public site.** Work in the session scratchpad.
- **Every approved deliverable goes to Benjy's Google Drive** (Google Drive connector), in one private folder per client,
  e.g. `Awakening Eden · <Client> · Client Reports`. Always reply with clickable Drive links. Never share with the
  client yourself: Benjy sends.
- The connector accepts about **3 MB per file**. Keep each upload under that.

## File formats that send well
| Deliverable | Format | Target |
|---|---|---|
| Client report | A4 PDF, fonts embedded | 2–3 MB (email and WhatsApp friendly) |
| Maps on their own | JPEG at 2× (≈1850 × 3070 px), quality ≈ 90 | under 1 MB each |
| Editable maps | SVG with one group per feature + the softened base image | for Benjy only |

## Keeping quality high while files stay small
- Field photos: about 820 px wide, JPEG quality ≈ 85 (≈ 230 dpi at the printed size). Cover photo: up to 1100 px.
- Pre-soften the base map once and save it as JPEG. SVG filters on a base image get rasterised at 300 dpi and
  bloat the PDF (4 MB per map page).
- Keep maps, labels and drawings as vector in the PDF so text stays sharp at any zoom.
- Render with Chromium (Playwright) using `printBackground: true` and A4 page CSS. Embed brand fonts locally
  (Cormorant Garamond, Source Sans 3, Caveat).
- Never upscale a source beyond its original resolution. The survey plan source is 929 × 1536 px; that is its
  real limit.

## Before upload (QA)
- Render every page to an image and look at it. Check nothing overflows the footer.
- Read the report at phone width (≈ 390 px).
- Search the PDF text for anything forbidden (unapproved prices, rejected ideas, em dashes).
- Confirm the file size, then upload and give Benjy the links.

## How Benjy sends to the client
- **Email:** attach the PDF (best quality, works everywhere).
- **WhatsApp:** send the PDF as a *Document*, not as a photo, so it is not recompressed.
- **Drive link:** only if Benjy chooses; set sharing to "anyone with the link can view" himself.
