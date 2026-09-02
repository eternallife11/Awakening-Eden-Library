# Final-domain cutover inventory

No final domain is selected. This is inventory only.

| Surface | Current state | Cutover action |
| --- | --- | --- |
| Canonical, Open Graph and schema origins | Netlify origin remains intentionally present | Replace once, only after final domain approval |
| Sitemap and robots | Existing public files preserved in `dist/` | Recheck generated/served URLs against final origin |
| Public clean routes | Cloudflare aliases preserve `.html`-free routes | Crawl every redirect and route before DNS |
| Netlify hostname | Existing fallback | Keep until path-preserving 301s are verified |
| Workers staging | `workers.dev` preview only | Never use as canonical origin |

Rollback remains the untouched `af08928` staging baseline and Netlify fallback.
