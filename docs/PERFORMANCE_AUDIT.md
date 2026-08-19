# Performance and accessibility audit

## Current safe findings

- Static artifact is image-rich by design; no visual asset substitutions were made.
- `eden-enquiry.js` is deferred and cacheable; Turnstile is loaded only in the Cloudflare build.
- Browser QA checks desktop/mobile overflow, broken local images, key routes, PDFs and protected paths.

## Pending human-reviewed audit

Measure the isolated preview on desktop and mobile after real secrets are configured. Record LCP, CLS, INP/TBT, transfer sizes and keyboard/Turnstile behaviour. Do not replace art or alter page rhythm merely to improve a synthetic score.

## Safe budget checks

- no public asset over 25 MiB;
- no internal source artifact in `dist/`;
- no horizontal overflow;
- all form errors are announced without erasing entered values.
