# Premium Brand Consistency — 2026-09-30

This pass enforces the current approved Awakening Eden identity.

## Public identity source of truth

- Small/header mark: `assets/brand/awakening-eden-mark-painted-192.webp`
- Full logo where space permits: `assets/brand/awakening-eden-logo-primary-700.webp`
- Responsive full-logo family: 320 / 480 / 700 WebP files in `assets/brand/`

## Retired public identity

The following line-art marks are retained in git only for provenance / legacy compatibility and are excluded from the Cloudflare public artifact:

- `assets/brand/awakening-eden-mark-one-colour.svg`
- `assets/brand/awakening-eden-mark-reversed.svg`
- `assets/brand/awakening-eden-mark-primary.svg`
- `assets/illustrations/ae-logo-tree-heart.svg`

Older template references and direct legacy URLs are protected by forced migration aliases that resolve to `assets/brand/awakening-eden-mark-painted-192.webp`. This keeps old routes compatible while ensuring the browser receives the premium painted identity, not the line-art asset.

Botanical dividers, exact Lotus-of-Life geometry, small functional icons and favicons are separate utility/decorative systems and are not replaced by the full logo.

## Structured data

The Cloudflare public build adds `assets/brand/awakening-eden-logo-primary-700.webp` as the `Organization.logo` where Organization JSON-LD exists and no logo was already specified.

## QA rule

`scripts/check-visual-lock.mjs` verifies the canonical premium assets and the legacy-to-premium migration aliases. `scripts/build-cloudflare.mjs` excludes the retired line-art identity files from the public artifact and fails if the premium redirect layer is missing.
