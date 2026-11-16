# Awakening Eden · Permanent Video Studio Standard (Claude Code / Remotion)
Version: 2026-11-16. Applies to Work with Benjy, Eden Sound Sanctuary, Living Library, regenerative education, field stories, workshop invitations and project updates.

## 1. First truth, then emotion
A video should help people understand, feel and act. Use honest openings; show actual land and human work; natural pacing and an optional invitation. No fabricated first-person field footage, invented before/after regeneration, false effects, faked wildlife sounds or undocumented locations. Keep people recognizable: use source footage unchanged or ordinary colour edits and original-person compositing; don't regenerate faces.

## 2. User chooses the format
- Real & Natural: first-person field snippets, genuine sound, gentle editorial edits.
- Photo & Paint: authentic footage + restrained hand-painted educational overlays/annotations.
- Vision & Education: explicitly identified illustrations/schematics mixed with grounded explanation.
No forced logo on every video. Approved branding only where relevant, readable and consistent with newer design decisions.

## 3. Stage-gated video pipeline (ONE stage per approval)
**V0 Asset brief (read only):** audience, message, one useful outcome, exact target platform/length/orientation, assets and permissions, brand references, available sound, accessibility, exclusions. Identify all unknowns.
**V1 Creative strategy:** choose hook/honest opening, audience need, narrative spine: situation → field evidence → explanation → real next action → optional CTA; one or two creative directions only. Present a short concept note. STOP.
**V2 Script + beat sheet:** exact words/voice-over (or silent-soundscape structure), shots, duration per beat, text on screen, sources, audio rights, required captured footage. STOP.
**V3 Storyboard:** thumbnails/panel frames at key timecodes, crop, transitions, captions, visual overlays, narration and atmospheric breaks. Ensure source photos/people unchanged. STOP.
**V4 Style frames/proof scene:** implement just a 5–10-second or 1-scene preview in Remotion or existing editor, render still frames, inspect phone crop and alignment, show to Benjy. STOP.
**V5 Build scenes incrementally:** approved beat-by-beat video sequences, ONE scene or one agreed group per approval. Test transitions and preservation. STOP after each batch.
**V6 Sound and caption pass:** authorized nature recordings, real ambience, licensed music or original compositions, balanced audio, accurate voice captions, no automatic false claims. Keep soundscape provenance/loop/pops checks. STOP.
**V7 Preview render:** export small-resolution full cut/low-bitrate proof; view entire real file; check pacing, cuts, crop, captions, text safe margins, visual artifacts, audio peaks, silence and loop if relevant. STOP.
**V8 Final render + QA:** render final MP4, metadata, cover thumbnail as needed; inspect output file metadata and playback, rerender fixes. STOP.
**V9 Metadata/release:** caption, description, accessibility, license notes, optional CTA, publishing plan; NEVER upload, schedule or publish without explicit approval. STOP.
**V10 Learning:** log actual audience feedback/retention where available and propose ONE improvement to test later, not an invented success claim. STOP.

## 4. Code and tooling
Use existing tools/project first. If making programmatic React-based motion graphics, Remotion has official Claude-compatible Agent Skills. Install only when Benjy approves dependencies and internet access; `npx remotion skills add` is a **conditional example** from official documentation, NOT something already run. In an existing Remotion repo don't scaffold another app without inspecting it. Prefer `npx remotion studio` for interactive previews where configured; use `npx remotion still` to render exact representative frames and `npx remotion render` for actual cut. Verify current flags/documentation. A successful compile does not prove the video looks or sounds good.

Potential reusable layers: real-media ingest, vector labels/callouts, watercolor paper edge texture, subtle camera motion, captions as editable text, environmental sound, optional outro. No endless automated zoom, fast transitions or excessive synthetic animation by default.

## 5. Visual motion rules
- Regenerative field videos: honest daylight, true colours, natural motion, original field sketches drawn gradually only where geometry is accurate.
- Animated water overlays MUST track Benjy-approved vectors, never turn a concept water line into a factual filmed flow. Label 'illustration / preliminary concept' where relevant.
- Eden Sound Sanctuary: prioritize true field ambience and stillness; no misleading "healing frequency" or medically therapeutic claims; don't repeat short birdsong clips unnaturally or layer fake species into a claimed authentic soundscape.
- Use mobile-safe 9:16/4:5/16:9 as requested; safe title zones depend on destination platform, test phone previews. State chosen resolution and fps in project brief (for example, 1080×1920 30 fps if appropriate, not a universal rule).
- Preserve readable captions, semantic contrast, subtitle timing and reduced visual chaos. Provide a transcript when narration matters.

## 6. Audio truth & rights
Create asset ledger: source, field recording location/date if known, owner/license, waveform duration, intended rights, permitted use. Own footage and audio preferred. No copyrighted songs without permission, no cloned voices without consent, no misleading animal claims. For longer ambience: check levels, clipping, DC offset, seamless loop seams, repetitive artifacts and audio/video sync. Use original field recordings or properly licensed sounds, no unverified source.

## 7. Technical QA
- Save project composition, output size/FPS/duration and original source media in manifest.
- Each approved scene should have reproducible props, stable names and accessible assets.
- Check representative frames: first frame, title frame, middle beats, transitions, last frame; compare current against signed storyboard.
- After final render, use ffprobe or equivalent to verify container, video/audio codec, resolution, duration and loudness where measurable. Play the full file from disk or test a decodable full-sequence check if playback not available.
- Review audio via headphones and phone speaker where practical; if physical playback was not actually completed mark HUMAN REVIEW.
- Check legible titles, no cut-off subtitles, no accidental watermarks, correct spelling, correct client privacy, appropriate media rights and original face/land fidelity.
- Produce final MP4, editable project/source, optional subtitle SRT/VTT, thumbnail and publishing copy as separately approved.

## 8. Example Claude video prompt
```
VIDEO STAGE V0 ONLY. Read the permanent video standard and inspect current assets. Objective: [one useful outcome] for [audience]; destination [platform]; length [approx]. Use genuine files from [folder]. Make an asset/rights/format inventory and identify missing info. Do NOT create storyboard, code, animations or render yet. Give a concise stage plan and STOP for Benjy's approval.
```

## 9. Policy on working between stages
No autonomous chains. If a prompt says 'create a full campaign' but there is a standing stage gate, break into phases and STOP at the approved gate. Do not automatically start music, edit faces, generate footage, buy stock or publish. Every stage ends with verification and human review.
