# Awakening Eden — Small Independent Guides & Research Collections
Date: 2026-10-13 · Proposed pattern, human-reviewed before production

## Purpose
Publish resources (eco homes, water guides, village tools, community case studies, plant kits) **without rebuilding the homepage or changing the design system**. Each collection is a small, self-contained page and one editorial link from the best related shelf. The canonical website, consent gate, accessibility and asset policy remain unchanged.

## Repeatable publishing workflow
1. Research the topic with dated primary supplier/source links, a clearly labeled verification date and a specific audience. For costs show list price and project budget separately; flag VAT/inclusions and estimated ranges.
2. Write a standalone `topic.html` in the repository root, styled with the existing Awakening Eden palette and approved tree-heart identity. Avoid copying vendor images without permission; use licensed local optimized images where available, or link to the vendor gallery.
3. Add small behavior only when useful in its own `topic.js` loaded with `defer` (no inline scripts). Respect strict CSP, keyboard navigation and mobile screen sizes.
4. Add one clean URL rewrite such as `/eco-homes → /eco-homes.html` to `_redirects`. Add a canonical URL, OG share metadata and `sitemap.xml` entry.
5. Add one short, human invitation in the relevant current section, not a whole navigation redesign. For this guide, use Village Research; the Village Vision page already links to Village Research.
6. Run production build, visual-lock/zero-cost guards, QA for supplier links + photos, desktop/mobile and print/PDF. Verify sharing preview for WhatsApp (OG image) and direct link.
7. Commit to isolated branch, submit draft PR, review visual screenshots and photo rights, obtain human approval, then merge/deploy. Test the live route before publishing/sharing the URL.

## October 2026 eco homes guide: verification and limitations
- Path: `/eco-homes`, file `eco-homes.html`.
- **Kit price:** supplier advertised snapshot, not a time-guaranteed offer. Shipping, VAT, installation, foundation and selected insulation vary.
- **Finished budget:** initial project scenario, NOT a contractor quote. Clarify whether local connections are included; independent engineering and municipal permission required.
- **Domes:** frame-only, seasonal glamping shells and permanent insulated houses are three different cost/product categories. Avoid mixing them.
- **Supplier photos:** externally linked/hotlinked in this review candidate only. Rights are not yet cleared for rehosting, and remote-image hotlinking can fail or expose visitor requests to third-party services. Replace with authorised local assets or a graceful link-only presentation before public merge.
- **Planning:** no cabin, kit, movable home or dome is automatically permitted for permanent use on agricultural land.
- **Editorial review:** re-check prices, links, images and scope at least quarterly and date the update.

## How to share after publication
Send `https://awakeningeden.org/eco-homes` in WhatsApp. Visitors get the living guide, readable on phones with filter and share controls; the URL stays stable while details can be corrected later. For offline WhatsApp sharing, they can choose Print/PDF and send the file as a document, though live supplier galleries remain available only online.

## Next review gates
1. Human review of responsive preview and clarity of first four cards.
2. Confirm rights of manufacturer photos or remove remote embedding.
3. QA page source/route, CSP exceptions, filters, buttons, OG metadata, supplier URLs, and print.
4. Approve before merging or deploying.
