# Agent work queue

## Complete

- Workers Static Assets staging path, scoped `/api/enquiry` Worker, dual rate limits, honeypot, strict validation and Turnstile hostname/action checks.
- Fixed Email Service destination binding for `regenerativeeden@gmail.com`.
- Desktop/mobile Playwright coverage, Worker unit coverage, public-build privacy checks, draft PR #9.

## Human-gated

1. Create the staging Email Service sender address on an onboarded non-production domain.
2. Use the owner-controlled preview-only secrets upload procedure.
3. Submit one real staging enquiry and confirm a single delivery plus replay rejection.

## Prohibited until approval

Production deployment, DNS, custom domain, Netlify production changes, canonical-origin changes, merge to `main`, paid-service activation.
