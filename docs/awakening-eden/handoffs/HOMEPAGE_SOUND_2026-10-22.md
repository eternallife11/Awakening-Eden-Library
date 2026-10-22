# Homepage opening and original Lemuria Harmonics — 22 October 2026

## Scope and stopping point

Owner requested homepage implementation, preserving the authentic Benjy & Sofia intro photograph and deferring Work with Benjy changes. The follow-up authorized an original soundscape with nature atmospheres and soft instruments. Homepage implementation is ready for owner review at http://127.0.0.1:8787/ after the public build. Open this HTTP preview for working routes rather than the source file URL.

The opening reads “A regenerative home & living library for the New Earth.” The new Mother Tree sits on the right on desktop and follows the introductory copy on phones. The authentic tree-planting photograph is unchanged. Revised intro copy names regeneration, syntropy, wellbeing and community, and distinguishes existing resources from future media/gatherings. The four painted doors follow the founders intro and keep the exact Lotus overlays and current destinations. Existing deeper homepage sections remain.

No Work with Benjy, Library or other destination page was changed in this session. No production merge or deployment was performed. Previous rollback point: `7c1f555f2d7cbaba5df362145cdc77b614bb9fd9`. Implementation commit: `d4cbc41`, backed up on the homepage finishing branch. The separate service PR38 source branch remains at `7c1f555`; this homepage-only pass was not pushed there.

## Soundscape

- Original Web Audio synthesis; no third-party recordings, streams, audio services or downloads.
- Choose a steady 432 Hz or 528 Hz sine tone, with a quieter octave below (216 or 264 Hz). The two fundamentals are selectable rather than mixed together.
- Optional sound-designed rainforest (filtered foliage/water texture and sparse chirps), gentle rain or slow ocean swells. Nature level is adjustable; nature can be turned off.
- Optional bowl-like strikes and chimes. Bowls use exact integer partials; chimes use simple pitch ratios relative to the selected root. These are synthesized instruments, not acoustic instrument recordings.
- Low initial master volume, slow fades, synchronized header/card controls, remembered mix settings, and Spotify selection pausing the local sound.
- Always opt-in, including return visits. No AudioContext or noise buffer exists before pressing Play. Pause fades down, clears the scheduler, stops transient voices and suspends audio processing. Navigation also stops it.
- The animated mark indicates playback; it is not a measured spectrum display. No therapeutic or medical claims are made.
- “Shape your sound” keeps the mix controls compact, labelled and keyboard accessible. Reduced-motion preferences stop the playback animation.

Technical reference: [MDN OscillatorNode](https://developer.mozilla.org/en-US/docs/Web/API/OscillatorNode) documents oscillator frequency in hertz. This supports the digital signal implementation, not health claims.

## Mother Tree provenance

Original generated watercolor/gouache editorial artwork, created for this approved homepage direction on 21 October. It depicts a symbolic ancient rainforest tree, not an Awakening Eden project site. No logo, geometry or real people were generated. Public derivative: `assets/hero/mother-tree-regenerative-home-20261021.webp`, 1024 × 1536, 563,980 bytes. The 3.5 MiB PNG master is preserved under `docs/awakening-eden/design/references/2026-10-21/` and is excluded from deployment.

## Verification and evidence

- Cloudflare public build: 416 files, 108.7 MiB. Internal docs/master artwork remain excluded.
- Zero-cost hosting guard, visual-lock guard and diff whitespace checks passed.
- Focused browser checks cover desktop/phone layouts, original photo, exact Lotus positions, doorway destinations, local image loads, no horizontal overflow or page errors, and expanded player accessibility.
- Audio checks cover opt-in playback even with a remembered “on” preference, pause/resume, master and nature volume, frequency/environment/instrument choices, mix persistence, Spotify coordination and graceful unsupported-browser behavior.
- A real Web Audio analyser verifies a dominant spectral peak within 2 Hz of each selected fundamental and a suspended, silent context after pause. This verifies generated digital output, not speaker calibration or subjective listening quality.
- The first Firefox pass exposed a startup AudioParam timing difference; the oscillator now schedules its initial frequency explicitly and only glides pitch when the visitor changes the selected tone.
- Screenshots are in `test-results/review/`: `home-top-*`, `home-opening-*`, `home-intro-*`, `home-doorways-*`, `harmonics-*`. They are local QA artifacts, not public assets.

Final test counts and implementation SHA are recorded in CURRENT.md after the final checks.

## Next actions

1. Owner listens to the default rainforest mix and optionally adjusts the desired balance of nature/instruments.
2. Owner reviews the updated desktop and phone opening; Work with Benjy remains a later task.
3. Before any release, finish the established production enquiry delivery/Turnstile verification and update stale ORIGIN event wording as a separate release task.
4. Merge/deploy only after owner approval, then verify the actual public site and record deployment/rollback details.
