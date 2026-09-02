# Cloudflare staging operations

Scope: `agent/cloudflare-enquiry` and Worker `awakening-eden-library-staging` only. It has no route or custom domain.

## Safe preview procedure

1. Build `dist/` with `node scripts/build-cloudflare.mjs`.
2. Run Worker tests and browser QA using Cloudflare's official Turnstile test keys.
3. Create an owner-controlled, mode-0600 secrets file outside the repository, preferably in `/dev/shm`.
4. Set `WRANGLER_BIN` to the approved absolute Wrangler executable, then run `scripts/upload-cloudflare-preview.sh /absolute/secrets-file`.
5. Review the returned `enquiry-api` preview URL. Do not run `wrangler versions deploy`.

The helper refuses repository-resident files and requires both `TURNSTILE_SECRET_KEY` and `ENQUIRY_FROM_EMAIL`. It never retrieves a secret.

## Non-negotiable stops

No production deployment, custom domain, DNS change, Netlify change, or secret retrieval/upload without Benjy's explicit next-step approval.
