# Awakening Eden Stage-Gate Protocol (permanent)

**Binding project rule: complete exactly ONE numbered stage per user approval.**

## The loop
1. **Explore:** Review actual source files and any earlier approval. Tell Benjy what the current stage will do; note risks and assumptions.
2. **Plan:** Short file-level plan, success criteria, what will *not* change. For any new project or substantive choice stop here for approval before implementation.
3. **Implement ONLY approved scope:** One map, one scene, one section or one agreed bundle, with source files under version control. Do not secretly implement next stage.
4. **Verify:** Run relevant tests, inspect exported artifacts visually, compare with source, list warnings; fix errors inside the approved scope and recheck.
5. **Self-review:** Be a critical reviewer. For ecological designs, re-trace each water line from catchment source to outlet and downstream. For videos, play real encoded output and check sound/captions/copyright.
6. **Show Benjy:** At most 3–6 bullets, links to specific previews/changed files, a PASS/FAIL table, open decisions and precisely one next-stage suggestion. End **"STAGE N COMPLETE / BLOCKED. Waiting for Benjy's approval to start STAGE N+1."**
7. **WAIT:** Even if all checks pass, do not progress; human review is mandatory. Treat “looks good, now do X” as approval only for explicitly named X.

## Extra controls
- Read-only Stage 0 uses no modifications.
- Don't ask Benjy to repeat facts already in current conversation/source files; where a source is genuinely missing, mark it missing.
- After each approved stage write `project/working/stage_log.md`: date, input hashes/filenames, version, scope, outcome, QA, human approval status, next allowed stage.
- Save approved map geometry, annotations, logos and storyboards as checkpoint; do not silently change them in later stages.
- A picture may be pretty yet wrong. Any invented location, flow, date, client assertion or unsafe outlet is a FAIL.
- Suggested version control: review `git status`, create task branch, commit only with explicit approval, never force-push, never add secrets or unredacted private client contacts to public branches.
- If external software/tool is unavailable, report the limitation and offer a reproducible file-based route. Never pretend to run a test that did not execute.
- Avoid broad unattended tasks and generic "make it amazing" prompts. One bounded deliverable + reproducible verification per step.

## Status template
```
STAGE: [number/name] | STATUS: PASS / NEEDS REVISION / BLOCKED
Sources checked: [paths]
Files created/changed: [paths]
Evidence fidelity: PASS / FAIL / N/A
Technical checks: [which command or manual checks, actual result]
Visual QA: [preview sizes, issues]
Ecological/ethical QA: [observed vs proposed; risks/outlets]
Open questions: [only real blockers]
Next suggested stage: [number/name]
STOP: waiting for Benjy's approval.
```
