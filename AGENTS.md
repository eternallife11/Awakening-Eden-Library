# Awakening Eden — Agent Operating Guide

This repository is a living production site, not a greenfield redesign. Preserve what already works. Improve by small, reversible, tested steps.

## Source-of-truth order

When instructions conflict, use this order:

1. Benjy and Sofia's newest explicit decisions.
2. `docs/awakening-eden/LOCKED_DECISIONS_2026-08-11.md` and newer dated locked decisions.
3. `docs/awakening-eden/design/Awakening_Eden_Design_Bible_v3.1_Lotus_of_Life_2026-08-11.pdf`.
4. `docs/awakening-eden/design/Awakening_Eden_Illustration_Bible_v1.2_Lotus_of_Life_2026-08-11.pdf`.
5. `docs/awakening-eden/design/ASSET_DECISION_REGISTER_v3.2.md` and `PAGE_BY_PAGE_VISUAL_COVERAGE_MATRIX_v3.2.md`.
6. Current production code on `main` and the latest approved branch changes.
7. Older handoffs/prompts only when they do not conflict with the above.

Do not revive an older visual generation simply because its asset still exists.

## Non-negotiable visual identity

- Use only the exact twelve-fold **Lotus of Life**. Never substitute Seed of Life or Flower of Life.
- Canonical geometry source: `docs/awakening-eden/design/lotus-of-life-12-exact.svg`.
- The flagship portal language is sun + living tree + heartwood heart + roots + exact Lotus of Life + botanical lotus + water + one hummingbird.
- Primary small identity is tree + heart + roots. Major portal art is rare and should not wallpaper the site.
- Palette: forest, teal, moss, parchment, terracotta, honey, restrained rose and lavender.
- Pigment should feel grown, not sprayed: warm paper, forest/soil line, translucent pigment, imperfect human detail. Avoid glossy gradients, metallic 3D, synthetic bloom, galaxy styling, clip-art botanicals and generic AI fantasy gloss.
- Mediterranean life should be recognisable: olive, fig, rosemary, lavender, wildflowers and plausible dryland/water relationships.
- Typography: Cormorant Garamond for poetic headings, Source Sans 3 for clear guidance, Caveat sparingly for one human note.
- Real project photography is the trust layer. Never fabricate a before/after or imply two unmatched frames are the same viewpoint.
- Keep the two rights-unconfirmed orchard reference masters out of every public artifact.

## Product and copy principles

- Lead with useful outcome and next action.
- Regeneration is the default lens. Central Portugal / Mediterranean is the default place lens for land content.
- Separate established evidence, practitioner observation, tradition and spiritual worldview when factual claims matter.
- Avoid unsupported ecological, medical, frequency or sacred-geometry claims.
- Work With Benjy should prioritize proof and outcomes before long process explanations.
- Draft prices €95 / €225 remain private until Benjy explicitly approves publication.
- Preserve the property-buyer referral funnel in the finish queue; do not invent new public offers without approval.

## Git and deployment safety

- `main` is approved production source. Do not force-push it.
- Current protected finishing branch: `agent/awakening-eden-cloudflare-finish`.
- Frozen migration backup: `backup/pre-cloudflare-2026-08-12-2212`.
- Use a branch/worktree per independent task. Do not let two agents edit the same file concurrently without coordination.
- Never merge a visual change merely because tests pass. Require desktop + mobile preview review.
- Do not move the public domain until Cloudflare staging passes the migration runbook.
- Do not change hard-coded Netlify canonical/OG/schema origins for a temporary `pages.dev` preview. Replace them only once the final canonical domain is chosen.

## Public build

Run:

```bash
node scripts/build-cloudflare.mjs
```

This creates `dist/` and intentionally excludes internal docs, deliverables, source packs, agent instructions and repository tooling.

A public candidate must pass `.github/workflows/public-build-check.yml`.

Minimum checks before merge:

- no broken internal routes/assets;
- exact Lotus remains correct and legible;
- no `docs/` or `deliverables/` content in `dist/`;
- no rights-unconfirmed orchard masters in `dist/`;
- no public asset above 25 MiB;
- clean mobile layout with no horizontal overflow;
- no console errors;
- public PDFs and external CTAs work;
- metadata/sitemap/robots remain coherent;
- accessibility and keyboard interactions remain usable.

## Hosting strategy

- GitHub remains canonical source of truth.
- Netlify Deploy Previews may be used for free visual QA while production credits are constrained.
- Cloudflare Pages is the preferred next hosting/staging path for the current static architecture.
- Lovable is a prototype/sketch environment only for this repository unless its product later supports importing the existing repo safely. Do not rebuild the canonical site there.

## Agent behavior

Before editing:

1. Read the relevant locked decision/design source.
2. Inspect the current page and assets actually in use.
3. State the smallest coherent change.
4. Make the change on an isolated branch.
5. Run build/integrity checks.
6. Provide visual evidence or a preview when the change is visual.
7. Record any unresolved content/rights/pricing question instead of guessing.

Prefer subtraction and coherence over adding another decorative layer. The site should feel calm enough to trust, alive enough to explore, practical enough to use, and beautiful enough to slow people down.
