# Awakening Eden — Finish + Cloudflare Queue

Canonical working date: 2026-08-12
Working branch: `agent/awakening-eden-cloudflare-finish`
Production baseline: `main` at `155ae78ff966dc75fbf56b2ebf099cfb932b57f4`

## 1. Protect the current working site

- Keep `main` stable until the new hosting path and finishing pass are verified.
- Do not revive older visual branches as the new baseline. Their useful work has already been merged into later `main` history.
- Continue all finishing work on `agent/awakening-eden-cloudflare-finish`.
- Do not publish or imply unfinished prices, proof, outcomes or rights-unconfirmed images.

## 2. Pricing lock

The previously discussed €95 / €225 service prices remain DRAFT ONLY.

- Keep them in the private planning queue.
- Do not publish them on Work with Benjy, homepage, structured data, PDF handout or social copy until Benjy explicitly approves them.
- Current public copy should invite enquiry / WhatsApp instead of showing these draft prices.

## 3. Current visual locks

- Preserve the Tree + Heart identity.
- Use only the exact canonical twelve-fold Lotus of Life. No Seed of Life / Flower of Life / approximate rosettes.
- Newest Design Bible v3.1 and Illustration Bible v1.2 are the active visual authority.
- Earthy Mediterranean palette: parchment, forest, moss, teal, terracotta, honey, muted rose and lavender accents.
- Detailed portal artwork only at major thresholds. Header/footer/favicons use the compact identity mark.
- Authentic land / Benjy / Sofia photography remains the trust layer.
- Keep the newer painted, lunar, Mediterranean illustration language and retire cheap/flat/generic visual remnants when encountered.

## 4. Work with Benjy — content and conversion pass

Keep the current strong foundation, then tighten around these three clear buyer/landowner doors:

### BEFORE YOU BUY
**Regenerative Property Potential Assessment**
Second pair of eyes on land, water, existing trees, access, opportunities, constraints and regenerative potential.

### YOU BOUGHT THE QUINTA. NOW WHAT?
**Whole Property Regenerative Roadmap**
A phased pathway for what to do now, next season and later, without wasting money or effort.

### YOUR LAND ALREADY NEEDS HELP
**Orchard + Water + Land Regeneration**
Orchard revival, water retention, living soil, biomass, food forests, abundant edges, implementation guidance and team training.

Core referral sentence to preserve:

> You help people find the right rural property. I help them understand what the land can become, what to prioritise first, and how to regenerate it practically.

Primary conversion priority:
1. strongest authentic project proof
2. four clear outcomes
3. project gallery
4. three simple ways to begin
5. WhatsApp / enquiry CTA
6. deeper methods and educational boards later

## 5. Real-estate referral handout

Prepare a concise premium PDF / one-page handout for rural-property agents, buyers and new landowners.

Audience:
- Central Portugal rural-property agencies
- quinta / orchard / off-grid buyers
- people who have bought land and feel overwhelmed

Must communicate:
- pre-purchase land clarity
- post-purchase whole-property roadmap
- orchard / water / soil / biomass / food forest guidance
- phased implementation
- gardener / team training
- Central Portugal + online
- WhatsApp preferred
- `regenerativeeden@gmail.com`

Do not publish draft prices until approved.

## 6. Copy recovery / missing subtitles

Gather and reconcile recent approved wording from:
- homepage
- Living Library
- Work with Benjy
- About / journey
- Heart
- events / workshops
- journal / video
- links page
- real-estate handout

Known current positioning to retain:
- Awakening Eden as a Living Library for Positive Change, Regeneration & Remembering
- regeneration as inner + outer
- `Leave Life More Alive.`
- Work with Benjy: outcomes and proof before process
- Living Library: four useful doorways, not a database wall
- Central Portugal / Mediterranean place lens

Important limitation: any text, subtitle, proof comment or unpublished edit that exists only inside an unexported local Claude / browser / external tool session cannot be recovered from GitHub automatically. Export, commit or upload those fragments before final copy lock.

## 7. Cloudflare Pages migration

Preferred next hosting path:

**GitHub remains the source of truth → Cloudflare Pages hosts production + previews.**

Why:
- current project is primarily static HTML/CSS/JS/images/PDFs
- existing repo can be connected directly
- branch and PR preview deployments are supported
- static asset requests are free on Cloudflare Pages
- this avoids rebuilding the entire site in another visual builder

Initial setup target:
- Repository: `eternallife11/Awakening-Eden-Library`
- Production branch: `main`
- Build command: `exit 0` if no build step is required
- Build output directory: repository root / current public root, subject to verification
- Preview branch: `agent/awakening-eden-cloudflare-finish`

Before switching the public domain:
- verify `_redirects` behaviour on Cloudflare
- verify `_headers` behaviour / caching / forced 404 protections
- verify forms or any Netlify-specific functionality
- verify canonical URLs and Open Graph URLs are no longer hard-coded to the Netlify hostname
- verify sitemap and robots
- verify all routes
- verify PDFs and downloads
- verify no internal source / rights-unconfirmed assets are publicly reachable

Keep the Netlify site as fallback until Cloudflare production is visually and functionally verified.

## 8. Lovable decision

Do not rebuild the canonical Awakening Eden repo in Lovable.

Lovable can be used as a visual-prototyping playground for a new isolated concept, landing page experiment or future application. It is not the main migration path for the existing site because the current repo already contains substantial route, gallery, accessibility, SEO, copy and design work and should not be recreated from scratch.

## 9. Final QA before production cutover

- desktop + mobile visual pass
- exact Lotus geometry check
- no old cheap / flat artwork accidentally reintroduced
- no broken internal links
- no duplicate IDs
- no console errors
- accessible keyboard navigation and visible focus
- 44px touch targets
- WCAG text contrast
- meaningful alt text
- reduced motion respected
- only true hero eager-loaded
- responsive AVIF/WebP assets where appropriate
- no unapproved prices
- no unconfirmed photo rights
- canonical / OG / sitemap URLs updated to the new production domain
- WhatsApp and email links tested

## 10. Next action

Finish and verify the copy + visual queue on `agent/awakening-eden-cloudflare-finish`, then create a Cloudflare Pages preview from that branch. Only after review should the public domain move from Netlify.
