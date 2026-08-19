# Awakening Eden — AI Agent Team Workflow

Date: 2026-08-13

## Roles

- **Benjy + Sofia:** owners and final approval. Newest explicit decisions win. Approve production merges, public pricing, final domain and major visual identity changes.
- **ChatGPT Work:** strategy, research, content, copy, information architecture and Design/Illustration Bible stewardship.
- **Codex:** lead technical gardener and implementer. Owns repo inspection, isolated branches/worktrees, Cloudflare Workers Static Assets, build/deploy tooling, browser QA automation, accessibility/performance engineering, commits and PR evidence.
- **Claude Code:** visual and second technical reviewer by default. Reviews Codex previews/diffs for composition, spacing, responsive behavior, design-bible fidelity, exact Lotus treatment, typography, image quality and visual regressions. It does not edit the same files concurrently with Codex or independently merge/deploy production.
- **CI + browser tests:** deterministic referee. An AI saying “looks good” never replaces tests.

## Default loop

1. **Define:** Work/Benjy states outcome, constraints and acceptance criteria.
2. **Inspect:** Codex reads `AGENTS.md`, latest runbook/queue, relevant design sources and current implementation before editing.
3. **Plan small:** Codex names the smallest coherent change and expected files.
4. **Isolate:** one branch/worktree per coherent change; never use `main` as a scratchpad.
5. **Implement:** Codex makes the change.
6. **Verify mechanically:** build, CI, routes, browser, accessibility/performance checks as appropriate.
7. **Preview:** create a reviewable staging URL and screenshots for visual changes.
8. **Visual review:** Claude Code inspects preview + diff and reports `BLOCKER`, `IMPORTANT`, `OPTIONAL`. No parallel editing.
9. **Resolve:** Codex implements accepted findings.
10. **Re-run gates:** checks run again on the latest commit.
11. **Human approval:** Benjy/Sofia approve desktop + mobile.
12. **Promote:** only then mark PR ready, merge or move toward production.
13. **Observe:** post-deploy smoke test and keep rollback available.

## Work-in-progress limits

- No two agents edit the same file at the same time.
- Reviewer comments are recorded before implementation resumes.
- New ideas discovered mid-task go to the queue unless required for current acceptance criteria.
- Prefer reversible, reviewable increments over giant redesign batches.

## Handoff contract

Every implementation handoff includes:
- goal;
- branch + commit;
- files changed;
- what was intentionally not changed;
- tests/checks and results;
- preview URL;
- desktop/mobile screenshots when visual;
- known limitations / unresolved decisions;
- rollback point.

Every Claude visual review includes:
- `BLOCKER` — must fix before approval;
- `IMPORTANT` — meaningful quality issue worth fixing now;
- `OPTIONAL` — polish that can wait;
- explicit statement when no issue was found;
- no unsolicited redesign unless requested.

## Cloudflare migration

Preferred host architecture: **Cloudflare Workers with Static Assets**, preserving the existing site rather than rebuilding it.

- GitHub remains canonical source.
- Build public artifact with `node scripts/build-cloudflare.mjs` into `dist/`.
- Use `workers.dev` only for staging/preview.
- Keep Netlify as fallback until Cloudflare staging passes QA and a final custom domain is selected.
- Do not change canonical/OG/schema/sitemap origins to a temporary preview hostname.
- At final cutover, preserve already-shared Netlify URLs using path-preserving permanent redirects to the final canonical domain.

## Visual locks

- Exact twelve-fold Lotus of Life only.
- Newest Design Bible + Illustration Bible override older assets.
- Earthy Mediterranean palette; handcrafted watercolor/gouache/ink character.
- Celtic/sacred woven tree language where appropriate.
- Tree + heart + roots primary identity; restrained heart, not candy pink.
- Authentic photography is the proof layer.
- Avoid generic glossy AI fantasy, clip-art botanicals and old cheap visual generations.
- Calm hierarchy, generous breathing room and strong mobile composition.

## Production gates

Do not perform without explicit owner approval:
- production merge/cutover;
- final canonical-domain change;
- public pricing change;
- deletion of Netlify fallback;
- removal of rights/source protections;
- replacement of exact Lotus geometry;
- mass deletion of legacy assets without reference/rollback audit.

## Engineering improvements to phase in

1. Playwright smoke tests for critical routes and CTAs.
2. Stable desktop/mobile screenshots for visual review and regression detection.
3. CI artifacts containing traces/screenshots on browser-test failure.
4. GitHub protection/rules for `main`: PR required, required checks, resolved review conversations where supported.
5. Preview deployment for meaningful PRs.
6. Automated internal-link and asset audit.
7. Accessibility/performance budgets tuned to this image-rich artistic site.
8. Post-deploy smoke test and documented rollback.

## Principle

**Agents propose and execute. Automation verifies. Reviewers critique. Humans approve. Git records the truth.**
