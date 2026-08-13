# Codex Start Prompt — Awakening Eden

Paste or use this as the first task in Codex.

---

Continue the existing Awakening Eden repository. Do **not** rebuild it.

You are the **lead technical gardener / implementer** for this phase. Claude Code is the visual and second-review specialist by default. ChatGPT Work / Benjy provide product, copy and design direction. GitHub is the source of truth.

## Read first

1. `AGENTS.md`
2. `docs/AI_AGENT_TEAM_WORKFLOW_2026-08-13.md`
3. `docs/START_HERE_NEXT_SESSION_2026-08-13.md`
4. `docs/AWAKENING_EDEN_FINISH_AND_CLOUDFLARE_QUEUE_2026-08-12.md`
5. `docs/CLOUDFLARE_MIGRATION_RUNBOOK_2026-08-12.md`
6. `docs/awakening-eden/LOCKED_DECISIONS_2026-08-11.md`
7. newest Design Bible + Illustration Bible and v3.2 asset decision/coverage files when touching visuals.

## Current safety anchors

- Work from `agent/awakening-eden-cloudflare-finish` or an isolated child branch/worktree.
- Do not modify/force-push `main` directly.
- Frozen rollback branch: `backup/pre-cloudflare-2026-08-12-2212`.
- Existing draft PR: #7.
- Existing continuation issue: #8.
- Draft €95 / €225 prices remain private.
- Rights-unconfirmed orchard masters must remain excluded from every public build.
- Exact twelve-fold Lotus of Life only. Never substitute Flower/Seed geometry.

## Today’s primary mission

Safely finish the migration staging path using **Cloudflare Workers with Static Assets**, following current Cloudflare guidance, while preserving the existing website and every existing route.

The repo now has a Workers-oriented `wrangler.jsonc` and a `dist/` build script. Audit them rather than assuming they are correct.

### Phase A — audit before edits

- Inspect current branch, PR #7 and issue #8.
- Compare the current implementation to `main` and the backup.
- Audit `scripts/build-cloudflare.mjs`, `wrangler.jsonc`, `_redirects`, `_headers`, `404.html`, sitemap, robots and critical public files.
- Identify any remaining Netlify-specific behavior that will not transfer cleanly to Workers Static Assets.
- Confirm whether the site uses any Netlify Forms/Functions or other runtime feature; do not silently break it.
- State the smallest coherent implementation plan and files you expect to touch before editing.

### Phase B — make the Workers staging build robust

- Keep the public output as `dist/`.
- Preserve `_headers` and Cloudflare-compatible `_redirects` inside `dist/`.
- Keep internal docs, deliverables, source ZIPs, prompts and rights-unconfirmed images out of `dist/`.
- Validate Wrangler configuration with the current Wrangler toolchain.
- Prefer a purely static Worker with `assets.directory = "./dist"` unless a Worker script is genuinely required.
- Do not add runtime Worker execution merely for cleverness; static asset requests should stay simple/free when possible.
- Keep `workers.dev` staging separate from final canonical-domain work.

### Phase C — add expert-grade QA

Implement a lightweight Playwright/browser QA layer appropriate to this existing static site.

At minimum test desktop + mobile for:
- `/`
- `/start-here`
- `/living-library`
- `/journey`
- `/work-with-benjy`
- `/heart`
- `/links`

Check:
- page loads successfully;
- no horizontal overflow;
- critical navigation and primary CTAs exist/work;
- no uncaught page errors / important console errors;
- key local images/resources load;
- public PDFs/routes remain reachable;
- protected internal/source paths do not expose content.

For the homepage and Work with Benjy, capture stable desktop + mobile screenshots as review artifacts. Do not automatically accept new screenshot baselines after a visual change. Baseline changes require review.

Run browser tests deterministically in CI, prioritizing stability over maximum parallelism.

### Phase D — preview, do not cut over

Once Cloudflare is authenticated/available:
- build `dist/`;
- deploy only a staging/preview to `workers.dev` first;
- do not attach the final custom domain yet;
- do not change canonical/OG/schema/sitemap origins to `workers.dev`;
- provide the staging URL, commit SHA, test results and screenshots.

Then stop for visual review.

Claude Code will review the preview + diff using `BLOCKER / IMPORTANT / OPTIONAL`. Resolve accepted findings in Codex, rerun all gates, and return a new preview/evidence set.

## Old-link preservation

Many `awakening-eden-library.netlify.app/...` links have already been shared. Do not break them.

Prepare, but do not activate until final cutover, a path-preserving permanent redirect strategy so an old URL such as:

`https://awakening-eden-library.netlify.app/work-with-benjy`

lands on the equivalent path of the final canonical domain.

Keep Netlify as fallback until the new production host/domain is verified. Do not delete the old site.

## Final-domain work is a later gate

Before switching production domain:
- final domain chosen by Benjy/Sofia;
- desktop/mobile visual approval;
- routes, links, PDFs and CTAs tested;
- rights/source protections verified;
- canonical tags, OG URLs, JSON-LD, sitemap and robots changed together to final domain;
- old Netlify path-preserving 301 redirect tested;
- rollback plan documented.

## Required handoff format

When you finish this task, report:
1. branch + commit SHA;
2. files changed;
3. what you intentionally did not change;
4. build/test commands and results;
5. staging URL if Cloudflare is connected;
6. desktop/mobile screenshots or artifact locations;
7. remaining blockers/decisions;
8. exact next action for Claude visual review / Benjy approval;
9. rollback point.

Do not claim success from code inspection alone. Verify the actual build and, when possible, the actual preview in a browser.
