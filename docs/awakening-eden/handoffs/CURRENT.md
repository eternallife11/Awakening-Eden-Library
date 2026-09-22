# Awakening Eden — Current Work Handoff

_Last updated: 22 September 2026_

This is the durable handoff point for the next ChatGPT / Codex / Claude work session. Read this file before starting substantial website work, then confirm the current `main` branch and latest pull request state in GitHub.

## Where we stopped

PR #19, **“Finish Work with Benjy: recent designs, packages + WhatsApp pathways”**, was merged into `main` on 22 September 2026.

Merged production source commit:

- `0e7648d5136cc87119ec44f34fad4c59847da143`

The final pre-merge safety run was green:

- public Cloudflare artifact build: passed
- desktop + mobile browser QA: passed
- enquiry Worker unit tests: passed
- no horizontal overflow / broken local assets / console errors in the automated browser suite

## What PR #19 changed

### Work with Benjy page

The current source of truth is `work-with-benjy.html` plus the existing Work with Benjy styles/runtime.

The page now includes:

- stronger positioning around moving from land overwhelm to regenerative clarity
- water-wise and fire-smart language
- real-photo trust layer and existing botanical / warm-paper visual direction
- a recent-design section with honest **existing site / concept visual** labelling
- the Contour Food Forest Ideas concept study
- Luisa + Sim’s **Syntropifying: Abundant Food Forest Berrylicious Terrace Gardens** concept
- current Moinhos / hands-on project proof
- three public service packages:
  1. **Land Clarity & Action Session — €111**
  2. **Focused Regenerative Roadmap — from €450 online / from €650 on site**
  3. **Holistic Regenerative Concept Masterplan — from €1,500**
- WhatsApp Benjy as the primary CTA for each main package
- WhatsApp + email land enquiry pathways
- strengthened collaboration pathway for agents, architects, eco-builders, retreats and regenerative projects
- clear professional boundaries around surveying, engineering, permits and construction drawings

### Important runtime fix

`eden-work-v23.js` previously rewrote the package names, prices and CTAs in the browser after page load. That legacy mutation was removed so the approved HTML is now the source of truth.

The final Work with Benjy CSS/runtime references are cache-versioned as:

- `eden-work-vnext.css?v=2026-09-21.1`
- `eden-work-v23.js?v=2026-09-21.1`

### Recent design assets

Public assets used by the page:

- `assets/work-with-benjy/recent/contour-before-v2.webp`
- `assets/work-with-benjy/recent/contour-food-forest-concept-v2.webp`
- `assets/work-with-benjy/recent/luisa-sim-berrylicious-terrace-concept-v2.webp`

Do not describe concept imagery as completed after-photos.

## Deployment status

GitHub `main` is the canonical source.

Cloudflare Workers Static Assets is the active staging / publishing path. Netlify remains frozen as a rollback snapshot and should not be revived as the working source.

### Live verification completed — 22 September 2026

The merged PR #19 release is live on:

`https://awakening-eden-library-staging.holisticmission8.workers.dev/work-with-benjy`

GitHub Actions verified the actual live Cloudflare response, not only the repository build. The live page contains:

- `eden-work-vnext.css?v=2026-09-21.1`
- `eden-work-v23.js?v=2026-09-21.1`
- Land Clarity & Action Session
- Focused Regenerative Roadmap
- Holistic Regenerative Concept Masterplan
- Contour Food Forest Ideas
- Syntropifying: Abundant Food Forest Berrylicious Terrace Gardens
- the primary WhatsApp Benjy clarity CTA

A second live-browser check used Chromium against the workers.dev page at desktop and mobile widths. It passed:

- HTTP 200
- all three current package headings visible
- both recent design studies visible
- multiple WhatsApp pathways present
- no horizontal overflow
- live local images loaded successfully
- desktop and mobile full-page screenshots captured
- dedicated screenshots reviewed for recent designs, packages and buyer / partner pathway

Visual review result: the page is coherent and readable on both desktop and mobile. The recent concept graphics render on mobile when reviewed in their actual section, and the package / partner hierarchy remains clear.

## What should happen next

1. Verify the merged Work with Benjy page is actually visible on the Cloudflare `workers.dev` staging URL.
2. Review the page visually on desktop and mobile after deployment, especially:
   - hero CTA hierarchy
   - recent design cards and image scaling
   - package readability
   - WhatsApp buttons
   - partnership/referral section
3. If Cloudflare is still serving an older build, diagnose the deployment trigger before changing page content again.
4. Once live is confirmed, use the Work with Benjy page as the foundation for:
   - rural buyer / real-estate agent referral outreach
   - architect / eco-builder partnership outreach
   - land diagnostic lead generation
   - seasonal “before the rains” content that points into the €111 clarity offer
5. Keep future work incremental. Do not redesign the whole site when a focused conversion / proof / content improvement will do.

## Recommended next business / website work

High-value next sequence:

1. **Partnership one-pager / landing path**
   - for rural agents, architects, eco-builders, retreats and regenerative developments
   - explain the simple referral pathway
   - one CTA: WhatsApp Benjy / partnership call

2. **Before-the-rains seasonal campaign**
   - Central Portugal / Mediterranean timing
   - water, access, erosion, overflow, soil cover, orchard care
   - short educational posts leading to the Land Clarity & Action Session

3. **Case-study proof**
   - add finished outcomes only when real after-photography exists
   - keep concept studies clearly labelled
   - document measurements, implementation dates and practical outcomes where possible

4. **Lead follow-up system**
   - lightweight enquiry labels: clarity / roadmap / masterplan / partnership
   - standard first reply
   - simple follow-up after 2–3 days
   - track source: Facebook group, Instagram, referral, website, partner

## Expert working protocol for every future session

Before editing:

1. Read `AGENTS.md`.
2. Read this handoff.
3. Inspect current `main`, open PRs and recent workflow results.
4. Read the relevant locked design / content source.
5. Choose the smallest coherent change.
6. Work on one isolated branch.
7. Keep public copy, CSS and JS runtime behavior aligned. Never let runtime JS silently rewrite approved package copy.
8. Run the Cloudflare public build and browser QA before merge.
9. For visual changes, inspect desktop and mobile screenshots, not only test status.
10. Merge only after green checks and visual sanity review.
11. Verify the live Cloudflare page after merge.
12. Leave a GitHub handoff note recording:
    - what changed
    - exact commit / PR
    - tests run and result
    - what is live vs still pending
    - unresolved questions
    - the next 3–5 actions

## Handoff rule

At the end of every substantial session, update this file **or** leave an equivalent detailed handoff comment on the active PR. For multi-session work, do both.

The goal is that a new chat can resume from GitHub without relying on conversation memory.
