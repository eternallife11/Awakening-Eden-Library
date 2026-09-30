# Premium Brand Consistency — 2026-09-30

This pass enforces the current approved Awakening Eden identity.

## Public identity source of truth

- Small/header mark: `assets/brand/awakening-eden-mark-painted-192.webp`
- Full logo where space permits: `assets/brand/awakening-eden-logo-primary-700.webp`
- Responsive full-logo family: 320 / 480 / 700 WebP files in `assets/brand/`

## Public identity not to use

The following line-art marks are retained only as legacy/reference assets and must not be referenced as public website identity in HTML:

- `assets/brand/awakening-eden-mark-one-colour.svg`
- `assets/brand/awakening-eden-mark-reversed.svg`
- `assets/illustrations/ae-logo-tree-heart.svg`

Botanical dividers, exact Lotus-of-Life geometry, small functional icons and favicons are separate utility/decorative systems and are not replaced by the full logo.

## QA rule

`scripts/check-visual-lock.mjs` now fails if a public HTML page references one of the retired line-art identity marks.
