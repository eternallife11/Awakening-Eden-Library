# Work With Benjy · Regenerative Funnel Handoff
Date: 2026-10-09
Branch: `codex/work-with-benjy-regenerative-funnel-2026-10-09`

## Purpose
Turn Work With Benjy into a human, regenerative conversion journey without manipulative scarcity, false urgency or a cold sales funnel.

## Visitor journey
1. Visitor arrives from home, search, social, referral or Google Ads.
2. Hero offers two low-friction paths:
   - **Tell Benjy about your land** → Eden Land Questionnaire
   - **WhatsApp Benjy** → direct human conversation
3. Real work, outcomes and services build trust before deeper commitment.
4. Package CTAs pre-select the relevant service in the questionnaire.
5. Questionnaire progressively reveals three short steps:
   - Your land
   - Your vision
   - How Benjy should reply
6. Successful submission redirects to:
   - **https://awakeningeden.org/work-with-benjy/thank-you**
7. Thank-you page immediately gives the free Awakening Regeneration Guide and a WhatsApp continuation option.

## Why this structure
- Keep one primary conversion action and one human alternative.
- Reduce perceived form effort through progressive disclosure.
- Ask only information useful for an informed response.
- Preserve UTM/referrer/landing-page tracking.
- Use a unique noindex thank-you URL as the lead-conversion signal for Google Ads.
- Give value immediately after conversion instead of a dead confirmation page.
- Let larger or higher-intent leads move toward a fit call later without forcing every visitor to book.

## Google Ads
After this branch is live and verified, use:
`awakeningeden.org/work-with-benjy/thank-you`
as the successful lead page in the Google Ads URL-based conversion setup.

Do not use the generic `/thank-you.html` page for this conversion, because it is shared by the guide gate.

## Technical notes
- The source form retains Netlify-compatible markup as a fallback.
- The Cloudflare production build activates Turnstile and the /api/enquiry Worker.
- The Worker accepts a new required `primary-challenge` field.
- Existing rate limits, origin checking, honeypot, fixed delivery address and Turnstile verification remain intact.
- `eden-enquiry.js` progressively enhances the form into 3 steps. Without JS, the full form remains readable and usable.
- The thank-you route is a clean rewrite to `project-enquiry-thank-you.html` and is intentionally noindex.

## Final laptop QA
- Run `pnpm run build:production`.
- Run `pnpm run test:worker`.
- Run browser tests if Chromium is available.
- Check Work With Benjy on 360–430 px mobile, tablet and desktop.
- Confirm all three Next/Back steps, inline browser validation, Turnstile and final redirect.
- Confirm offer CTAs pre-select the correct service.
- Confirm UTM values survive from landing page into the submitted email.
- Confirm the free guide download works.
- Confirm the WhatsApp links open with the expected prefilled message.
- Confirm the clean thank-you route returns the dedicated page and remains noindex.
- Only after live verification should Google Ads count that URL as a conversion.

## Optional phase 2
When Benjy wants real-time scheduling, connect a calendar only after qualification. For the €111 Clarity Session, a successful questionnaire can reveal a booking link; larger projects can remain a personal fit conversation first. Avoid adding a scheduling tool until the calendar and availability rules are ready.


## Projects + Possibilities gallery
Updated 2026-10-12 after mobile review.

- Keep **one** inspiring project/examples gallery per page.
- On Work With Benjy it sits immediately after the opening/funnel invitation.
- On Work With Us it sits immediately after the introduction.
- Removed the older duplicate photo/project galleries.
- Two simple visual groups:
  1. Food forests, orchards, raised beds and regenerative gardens
  2. Water, soil and whole-property landscape systems
- Copy now leads with the practical promise: transforming tired land, poor soil and monocultures toward thriving, water-wise, biodiverse places.
- The compact capability strip includes food forests, orchard renewal, raised beds, permaculture gardens, swales/ponds, natural pools, whole-property design and project management.
- Real work, collaboration, design concepts and inspiration remain visibly labelled so no outcome is implied where it has not been built.
- Do not add another portfolio/gallery section during final polish. Improve the one showcase instead.


## Laptop visual research pass
Before final visual sign-off, do one focused research-and-selection pass for the **single Projects + Possibilities showcase** on Work With Benjy and Work With Us.

### Goal
Find the strongest, most beautiful and most useful visual examples that help a visitor immediately imagine what their own land could become, while keeping the page simple, credible and distinctly Awakening Eden.

### Gather and compare
- strongest **real Benjy / Sofia / Awakening Eden project photographs**
- strongest images from projects Benjy helped implement, steward, teach on or collaborate in
- strongest **existing Awakening Eden design concepts and educational visuals**
- best examples of **possible future project types** we genuinely want to offer
- beautiful external regenerative / permaculture / syntropic / agroforestry / natural-landscape references that can inspire layout and project possibilities
- excellent visual examples from respected regenerative businesses, landscape studios, food-forest designers and leading land educators
- Mediterranean / Portugal-relevant examples wherever possible

### Prioritise visual examples for
- syntropic food forests and agroforestry rows
- orchard regeneration / monoculture retrofit
- fertility islands and companion planting
- raised beds, no-dig gardens and productive permaculture gardens
- living soil, biomass and chop-and-drop systems
- swales, contour systems, ponds and water-retention landscapes
- Abundant Edge / woody fertility systems
- natural paths, trellises, fences and useful landscape structures
- biopools / natural swimming systems with appropriate specialist delivery
- compost-toilet integration where appropriate
- whole-property regenerative plans and phased land designs
- retreat, community and shared growing landscapes
- before / during / later-stage sequences where we genuinely have the evidence

### Selection rules
- **Do not create another gallery.** Improve the one unified showcase.
- Prefer authentic project photography first.
- Use our own visual concepts where they explain a system better than a photograph.
- External projects are for inspiration unless we have permission / a reusable licence; credit and link creators clearly when used.
- Never imply an external inspiration project was designed or built by Awakening Eden.
- Keep visible status labels where useful: Real project · Collaboration · Design concept · Inspiration · Teaching concept.
- Avoid duplicate-feeling images.
- Choose fewer, stronger visuals rather than filling every possible slot.
- Favour images that communicate the system in 2–3 seconds on mobile.
- Keep the final visual rhythm premium, human, warm, regenerative and uncluttered.

### Laptop action
Create one temporary shortlist folder / board with roughly **20–30 candidate visuals**, compare them side by side, then choose only the strongest final images for the two showcase categories. Record source, creator, permission/licence and project context for any external image before publication.
