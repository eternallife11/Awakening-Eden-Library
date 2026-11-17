# Awakening Eden Creation Studio: plan

*14 November 2026 · draft for Benjy and Sofia to review*

**Aim:** a single creation system that runs from the laptop, the phone and the cloud. It produces premium videos in three lines:

1. **Eden Sound Sanctuary**: faceless, calm nature-and-sound videos (long-form and Shorts).
2. **Benjy · Regenerative Land**: syntropic agroforestry, living soil, water, orchard revival, Mediterranean food forests.
3. **Benjy · Body & Leadership**: breathwork, movement, core and back foundations, posture, mindset, regenerative leadership.

(4. **Sofia**: topics to be chosen by Sofia. The system has a slot ready.)

Every line feeds the same goals. It should serve life, build trust, and bring income through mini courses, Work with Benjy enquiries and, later, YouTube revenue.

---

## 1. The core idea: one brain, three devices

```
            ┌───────────────────────────────────────────┐
            │  AWAKENING EDEN ORACLE  (the "brain")     │
            │  knowledge map · source of truth · voice  │
            │  · brand · locked decisions               │
            └───────────────┬───────────────────────────┘
                            │ the same files everywhere
   ┌────────────────────────┼────────────────────────────┐
   ▼                        ▼                            ▼
PHONE                    CLOUD (Claude Code web)       LAPTOP (Claude Code desktop)
capture real footage     scripts, outlines, titles,    heavy rendering (ffmpeg /
and voice memos; ideas;  descriptions, course plans,   Remotion), final edit &
review drafts; approve   thumbnails briefs; light      colour, uploads; sound
and publish              test renders                  recording
            └────────── GitHub repo (text) + Google Drive (media) ──────────┘
```

- **Text lives in this GitHub repo** under `docs/awakening-eden/studio/`: briefs, scripts, outlines, metadata and asset credits. Every device and every Claude session sees the same truth. This folder is excluded from the public website build.
- **Heavy media lives in Google Drive**, in an `Awakening Eden Studio/` folder with `raw-footage/`, `audio/`, `exports/` and `thumbnails/`. Git is the wrong place for gigabytes of video. Google Drive is already connected to Claude, so sessions can find and read files there.
- **The phone** is for capture and decisions. It is also the steering wheel: start a cloud session from the Claude app, say "draft next week's Sound Sanctuary video", review and approve.
- **The laptop** does the rendering. A 1-hour 1080p video renders much faster there than in a cloud container. Remote Control in the Claude desktop app lets a phone session use the laptop when it is switched on.

### What "connected to the Oracle" means in practice

There is no "Oracle" in this repository yet. I am assuming it is your Claude Project or custom assistant that holds the Awakening Eden knowledge. To connect it:

1. The Oracle's knowledge files should be **the same files** as `docs/awakening-eden/knowledge/` (Canonical Knowledge Map v3.2, Regenerative Source of Truth v1.1, System Instruction Patch v2) plus `LOCKED_DECISIONS`. Keep one copy in the repo and upload that copy to the Oracle whenever it changes.
2. Add `docs/awakening-eden/studio/CLAUDE.md`, which is included in this change. Any Claude Code session working on videos then loads the voice, the truth protocol and the video rules automatically.
3. Use the Oracle for **meaning**: the message, the teaching, the truth check. Use Claude Code for **making**: files, scripts, renders, uploads.

---

## 2. The production pipeline (same for every video)

| Step | Who / where | Output |
|---|---|---|
| 1. Seed | Benjy/Sofia voice memo on phone, or a viewer question | idea in `ideas.md` |
| 2. Brief | Claude (cloud) with Oracle knowledge | `brief.md`: audience, one promise, search phrase, source check |
| 3. Script / outline | Claude drafts → **Benjy rewrites in his own words** | `script.md`, chapters |
| 4. Capture | Phone on the land: real footage, Benjy's real voice | Drive `raw-footage/` |
| 5. Assemble | Laptop: `render-sanctuary.sh` (faceless), Remotion or DaVinci Resolve (teaching) | Drive `exports/` |
| 6. Package | Claude: 3 title options, description, chapters, tags, thumbnail brief | `metadata.md` |
| 7. Truth & rights check | Claude + human | credits for every asset; no false claims |
| 8. Publish | YouTube Studio (phone or laptop); Shorts cut-downs | live links back in `metadata.md` |
| 9. Learn | Weekly: CTR, retention graph, comments | one lesson written into `LEARNINGS.md` |

The template for steps 2–8 is in `TEMPLATE_PRODUCTION.md`. Each video gets its own folder: `productions/2026-11-20-morning-rain-food-forest/`.

---

## 3. The three content lines

### Eden Sound Sanctuary (faceless)
- **Format:** 1–3 hour calm videos such as rain on the food forest, dawn birds over the terraces or a winter fire with Mediterranean wind. Add 30–60 second Shorts that lead to them.
- **Premium look:** real high-resolution land photos and slow, steady video shot on the phone (4K, tripod, 2–5 minute shots). Use gentle motion and crossfades and a warm, consistent colour grade. Keep text on screen minimal. The renderer in `scripts/studio/render-sanctuary.sh` already does slow drift, crossfades, fades, a title and -14 LUFS loudness, for both 16:9 and 9:16.
- **Sound:** sound is the product here, so source quality matters most.
  - Best: your own field recordings from Portugal, made with a small recorder or a good phone mic, a windscreen, and no talking.
  - Good: CC0 sounds, like the Freesound files already used on the homepage. Download the WAV masters rather than the MP3 previews.
  - Also good: Benjy's own bowls and handpan, really played.
- **Truth:** don't claim that 432 Hz or 528 Hz heals, repairs DNA or has proven effects. The evidence doesn't support it. It is honest to say "tuned to 432 Hz for a soft, warm feel" or "a calm space for rest and focus".

### Benjy · Regenerative Land
- **Search-led topics** with real demand and little good Mediterranean content. Examples: "how to start a food forest in Portugal", "syntropic agroforestry in a dry climate", "reviving an old olive/chestnut orchard", "hugelkultur in a hot dry summer", "mulch and wood chips: do they rob nitrogen?"
- **Structure:** a hook from the land (≤15 s), then the problem, then the living-system principle, then what Benjy actually does, then one action this week, then an invitation to the Regeneration guide or Work with Benjy.
- **Truth:** follow the Regenerative Source of Truth compass. Say which parts are established science, which are practitioner experience and which are open questions. Name the teacher a technique comes from, such as Götsch, Mollison or Jones.

### Benjy · Body & Leadership
- **Themes:** breath as the base of calm leadership, a strong and supple core and back, posture for long days of land work, movement routines for people who garden and build, and mindset and regenerative leadership.
- **Safety rules, which are non-negotiable:**
  - These are wellness and education videos, not medical treatment. Every course carries a short disclaimer.
  - Ask a physiotherapist to review back and core lessons once before they publish.
  - Breathwork contraindications must appear on screen for intense techniques. These include pregnancy, epilepsy, heart conditions and high blood pressure. Never practise breath-holding in or near water or while driving.
  - Don't promise to cure pain or injuries.

### Sofia
- A slot is reserved: `productions/sofia-*`. Sofia chooses the themes, and the same pipeline applies.

---

## 4. Video mini courses

**Shape:** 5–7 lessons, 6–12 minutes each, plus one beautiful PDF workbook. The repo already builds PDFs; see `scripts/build_awakening_regeneration_pdf.py`.

Course seeds that match what already exists:
1. **Regenerate Your Land: First 7 Steps.** Builds on the existing *7 First Steps* guide.
2. **Revive a Tired Mediterranean Orchard.** Builds on Benjy's core service.
3. **Strong Back, Calm Breath: foundations for land workers and leaders.** Needs physio review first.
4. **Syntropic Basics for Dry Climates.** Covers stratification, succession, biomass and pruning cycles.

**Where to sell:** start with a simple, low-fee hosted checkout and video platform; choose one when you are ready. Link it from `/work-with-benjy` and from video descriptions. Prices stay unpublished on the website, as LOCKED_DECISIONS requires, until you choose otherwise.

**Funnel:** a free YouTube video leads to the free PDF guide on the site (email optional), then the paid mini course, then a Clarity Session or Property Walk with Benjy.

---

## 5. Ranking and reach: what actually works

- **The first 30 seconds and the thumbnail matter most.** Spend as long on the title and thumbnail as on the edit. Make 3 thumbnail options per video.
- **Search before virality.** A small channel grows fastest by answering specific questions people search for. Example: "food forest Portugal" before "change the world".
- **Show real faces, land and voice.** Benjy on camera on real land is the strongest advantage over generic AI content. Faceless works for Sound Sanctuary because the sound is the value.
- **Keep a steady rhythm:** 1 teaching video and 1 Sound Sanctuary video per week, with 3–5 Shorts cut from them.
- **Use chapters and a clear description.** The first 2 lines of the description should repeat the promise and the search phrase.
- **YouTube policy:** read before you scale. YouTube does not monetise mass-produced, repetitive or low-effort content, which it calls "inauthentic content". It also requires disclosure when realistic content is AI-generated or altered. The safeguards are real footage, real sound, a human script and variety between videos. Monetisation through the YouTube Partner Programme needs subscriber and watch-time thresholds, so check the current numbers in YouTube's official help.

Honest expectation: there is no system that guarantees millions of views. What builds a channel is steady, true and beautiful work plus learning from the analytics. In the first months, income will most likely come from **mini courses and Benjy's land services**, not from ads.

---

## 6. Tools: start free, add only what earns its place

| Need | Start with (free) | Upgrade later if needed |
|---|---|---|
| Thinking, scripts, metadata | Claude (Oracle project + Claude Code) | — |
| Faceless sanctuary renders | `scripts/studio/render-sanctuary.sh` (ffmpeg) | Remotion (code-built animated video; check its licence terms) |
| Teaching edits | DaVinci Resolve (laptop), CapCut (phone) | — |
| Footage | Phone in 4K + small tripod + clip-on mic | Gimbal, better mic |
| Field sound | Phone + windscreen | Small field recorder |
| Thumbnails | Canva (connector available; needs sign-in) or Figma (connected) | — |
| Voice | **Benjy's real voice** (most trusted) | AI voice only with consent, labelled |
| Media storage | Google Drive (connected) | — |

---

## 7. First 4 weeks

**Week 1: set up**
- [ ] Confirm what the "Awakening Eden Oracle" is (Claude Project? custom GPT?) and sync its knowledge files with `docs/awakening-eden/knowledge/`.
- [ ] Create the Drive folder `Awakening Eden Studio/` with `raw-footage`, `audio`, `exports` and `thumbnails`.
- [ ] Install Claude Code desktop on the laptop and turn on Remote Control so the phone can reach it.
- [ ] Install ffmpeg on the laptop and run the renderer once with your own photos.
- [ ] Set the YouTube channel name, banner and About text, and choose one channel or two. My recommendation is one channel with playlists until there are about 30 videos.

**Week 2: capture**
- [ ] Record 10 calm 3-minute shots of the land and 3 field recordings of 20+ minutes each.
- [ ] Benjy records 3 voice memos: one land idea, one body idea and one leadership idea.

**Week 3: first releases**
- [ ] Sound Sanctuary #1 (60 min) + 3 Shorts.
- [ ] Land teaching video #1 (8–12 min), search-led.

**Week 4: learn and plan a course**
- [ ] Read the retention graphs and write 3 lessons into `LEARNINGS.md`.
- [ ] Outline mini course #1 and record the first lesson.

---

## 8. Decisions only you can make

1. What exactly is the Awakening Eden Oracle, and where does it live?
2. Which themes does Sofia want for her line?
3. One YouTube channel or separate ones for Sound Sanctuary and Benjy?
4. Is Benjy comfortable on camera for the teaching line? This is strongly recommended.
5. A monthly tool budget beyond the Claude subscription. Zero works to start.
