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
