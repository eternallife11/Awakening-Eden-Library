# Awakening Eden — current handoff
Updated 15 October 2026 after implementing and verifying the local release candidate.

## Start here
[Final resume and release plan](../proposals/FINAL_RESUME_AND_RELEASE_PLAN_2026-10-14.md) is the controlling status and queue.
The [13 October brief](../proposals/CONSOLIDATED_TERRA_FINISH_PLAN_2026-10-13.md) and [image register](../proposals/IMAGE_SHORTLIST_2026-10-13.csv) retain detailed copy/design decisions.

## Owner's current scope
The owner has authorised the finishing pass: Home, Work With Benjy, Work With Us and the Living Library presentation. The local candidate is built and verified; it has not yet been committed, pushed, merged or deployed.

## Resume location
Use the durable checkout at project root: **awakening-eden-finish-2026-10-13**.
Branch: codex/awakening-eden-finish-2026-10-13. HEAD: d88c8552a6bd9740b35fc860e6b0533f5b3c034b.
The older awakening-eden-qa-tooling checkout is reference/history only; do not overwrite the newer service pages with it.

## Source and live state
- GitHub main: b118bde91db19d13aadf777284f681b6bcc4ac8b.
- [PR38](https://github.com/eternallife11/Awakening-Eden-Library/pull/38): open draft, unmerged, head d88c855. Questionnaire, thank-you/free guide and unified service showcase are on GitHub but not released.
- Local committed candidate: `5bffc5e` contains the Home clarity copy/quote, painted door cards with exact twelve-fold Lotus overlays, botanical divider, confirmed service-page galleries and packages, Library presentation/search fix, nested thank-you asset fix and updated browser regression checks. It is one commit ahead of the remote finishing branch because GitHub authentication was unavailable during the push attempt.
- Live: earlier Home/service layouts; approved founders/circle/Library art remains. New quote/doors/showcase/seven packages not live.
- Evidence: project-root outputs/awakening-eden-audit-2026-10-14/.

## Checks and limits
- 25/26 checked live URLs returned 200. The only 404 is the unreleased /work-with-benjy/thank-you. Four older guide-route issues are already fixed live.
- Live Fukuoka search reports 1 but renders 15 cards. Local fix verified 1 / 0 / 107 for match / no match / Escape reset.
- Local nested thank-you route styles/images load at 390px; no actual delivery test performed.
- Local public build, zero-cost guard and static visual-lock guard passed. Worker tests: 13/13 passed. Focused homepage, Work With Benjy and Work With Us browser tests passed on both desktop and phone: 6/6.
- Phone inspection confirmed the four direct homepage actions, Work With Benjy opening, Work With Us opening, the painted Living Library header, no horizontal overflow, and 107 Library resource cards. The exact twelve-fold Lotus overlays are present on the two relevant painted doors.
- The local Turnstile preview reports an expected localhost hostname error because the production challenge is not authorised for `127.0.0.1`; browser tests stub it. Verify the actual production hostname before enabling or releasing the enquiry form.
- ORIGIN 17 October date confirmed on organizer site; recheck at release.

## Next actions
1. Sign into the GitHub remote, then push `5bffc5e` to the existing finishing branch and update the draft PR.
2. Owner reviews the verified desktop/phone candidate and gives final release approval.
3. On release approval, merge/deploy, verify the actual public pages and production enquiry route, then record commit/deployment/rollback here.
4. Treat the six painted Library cards as a separate, optional visual batch after this release.

Preserve exact twelve-fold Lotus, visual lock and owner-confirmed image identities. No repeat blanket photo-permission questions. Use only the already approved prices. The newest owner instruction wins over historical handoff approval/status notes.

Older handoff text is preserved in [archive](archive/CURRENT_before_2026-10-14_recovery_audit.md).
