# Botanical divider & ornament inventory

Prepared for the divider replacement (Phase 16). **Nothing has been deleted.**
This is the map you need before the new artwork lands.

Generated 2026-08-06 against the working tree.

---

## 1. The canonical system

Everything current lives under `assets/`. Four families, all `.webp`,
all transparent-background, all referenced by relative path from the page root.

| Family | Folder | Role | Rendered by |
|---|---|---|---|
| Horizontal dividers | `assets/dividers/` | between-section rules | `.chapter-divider`, `.botanical-wide-divider` |
| Corner sprigs | `assets/corners/` | section corner ornament | `.corner-art`, `.work-corner`, `.photo-sprig` |
| Vertical edge frames | `assets/frames/` | tall left/right page edging | `.edge-art`, `.work-edge` |
| Growth stages | `assets/growth/` | seed→tree narrative art | inline `<img>` in guide cards |

Sizing rules that the replacements must keep working:

- `.chapter-divider` — `width: min(100%, 38rem)`, auto height (`eden-v23.css`)
- `.botanical-wide-divider` — `width: min(46rem, calc(100% - 2rem))` (`eden-library-v23.css`)
- `.edge-art` — `width: clamp(8rem, 13vw, 13rem)`, hidden below 58rem
- `.corner-art` — `width: clamp(10rem, 22vw, 23rem)`, parent section is `overflow: clip`

Every divider `<img>` carries explicit `width`/`height` attributes. **Keep the
aspect ratio or update those attributes**, or the page will shift on load.

---

## 2. Live assets and where they are used

### Horizontal dividers — `assets/dividers/`

| Asset | Pages |
|---|---|
| `botanical-divider-01.webp` | index, journey, about, living library, Awakening Regeneration |
| `botanical-divider-02.webp` | living library only |
| `botanical-divider-03.webp` | index, living library, work-with-benjy |
| `botanical-divider-04.webp` | Thriving in These Times, living library |
| `botanical-divider-05.webp` | index, work-with-benjy, Awakening Regeneration, living library |
| `botanical-divider-06.webp` | about, Thriving, work-with-benjy, living library, Awakening Regeneration |
| `celtic-tree-of-life.webp` | **8 pages** — the ceremonial divider, used on every long-form guide |

`celtic-tree-of-life.webp` is the highest-traffic ornament on the site.
Treat it as a separate decision from the six numbered dividers.

### Corner sprigs — `assets/corners/`

`botanical-corner-01` … `-06`, used across index, journey, work-with-benjy,
Thriving and (via `eden-guide-v23.css` / `eden-thriving-v23.css`) the guides.
All six are live. None is orphaned.

### Vertical edge frames — `assets/frames/`

Live: `seed-to-tree-frame-clean-01`, `-02`, `-04` (`.webp`).
**Unused: `-03` (clean) and the entire non-clean set `seed-to-tree-frame-01…04.webp`.**

### Growth stages — `assets/growth/`

`growth-stage-01` … `-08` `.webp`, all eight live across index, Awakening
Regeneration, Thriving and project-enquiry-thank-you.

---

## 3. Duplicates and legacy — candidates for removal, NOT yet removed

### 3a. PNG originals alongside the live webp exports

Not duplicates in the byte sense — these are the heavier source-format
originals of art that ships as `.webp`. Nothing references them, and together
they are ~5.5 MB of the repo (`thriving-lantern-botanical-v1.png` alone is
1.7 MB against a 289 KB webp). Keep them as masters if useful, but they do not
need to be deployed:

- `assets/frames/seed-to-tree-frame-clean-01.png`
- `assets/frames/seed-to-tree-frame-clean-02.png`
- `assets/frames/seed-to-tree-frame-clean-04.png`
- `assets/growth/growth-stage-08.png`
- `assets/logo/tree-heart-portal-01…04.png` (webp twins are the live ones)
- `assets/guides/thriving-lantern-botanical-v1.png`

### 3b. Superseded non-clean frame set

- `assets/frames/seed-to-tree-frame-01.webp` … `-04.webp`

Replaced by the `-clean-` variants. Zero references.

### 3c. Root-level v19/v22 SVG dividers

These predate the `assets/` structure. Two are still reachable **through
`eden-v22.css`**, which the five older guides still load — do not delete
those two until those guides are restyled:

| File | Status |
|---|---|
| `eden-divider-heart-vine.svg` | **still used** via `eden-v22.css` |
| `eden-divider-tree-heart.svg` | **still used** via `eden-v22.css` |
| `eden-botanical-corner.svg` | **still used** via `eden-v22.css` |
| `eden-divider-bee.svg` | orphaned |
| `eden-divider-butterfly.svg` | orphaned |
| `eden-divider-seedling.svg` | orphaned |
| `eden-footer-seed-to-tree.svg` | orphaned |

### 3d. `assets/illustrations/` — a half-migrated copy of the root SVGs

Orphaned: `ae-logo-tree-heart.svg`, `divider-bee.svg`, `footer-seed-to-tree.svg`.
Still used: `botanical-corner.svg`, `divider-tree-heart.svg` (via `eden-v22.css`),
`icon-book-leaf.svg`, `icon-seed.svg`, `icon-hands-tree.svg` (living library).

### 3e. Work-with-benjy Earth-Mama dividers — drawn but never placed

- `assets/illustrations/work-with-benjy/divider-living-edge.svg`
- `assets/illustrations/work-with-benjy/divider-moon-seed-water.svg`
- `assets/illustrations/work-with-benjy/divider-rooted-tree-water.svg`

Zero references. Either place them on `/work-with-benjy` or retire them with
the divider replacement.

---

## 4. Replacement checklist, for when the new artwork arrives

1. Replace **in place** under `assets/dividers/` — same filenames, so no HTML
   churn. If names must change, update every page in the table above.
2. Keep transparent backgrounds; the dividers sit on four different section
   backgrounds (paper, paper-light, linen wash, forest-deep).
3. On the dark `library-section` band the divider is inverted with
   `filter: brightness(0) invert(1)` — check the new art survives that.
4. Export at ~2× the largest rendered width: dividers ≈ 1500 px, corners
   ≈ 900 px, edge frames ≈ 800 px wide.
5. Update the `width`/`height` attributes on every `<img>` if the ratio changes.
6. Re-test 360 / 390 / 768 / 1024 / 1440 for cropping and overflow.
7. Commit the divider swap **separately** from content work.
