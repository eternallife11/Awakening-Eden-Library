# Claude handoff — Awakening Eden v23.4

This is the complete deployable website source. No Figma step is required.

## Outcome

Publish v23.4 as a careful full-site merge. Preserve the finished Awakening Eden design system, clean botanical edges, updated guides, authentic photographs, existing public routes and community links. The main v23.4 change is a clearer, more credible and more trackable Work with Benjy pathway.

Do not rewrite final copy, invent qualifications, invent project results, substitute stock photography, remove frames, or change public URLs without Benjy or Sofia's approval.

## Files introduced or materially changed in v23.4

- `work-with-benjy.html`
- `eden-work-v23.css`
- `eden-work-v23.js`
- `eden-v23.js`
- `index.html`
- `project-enquiry-thank-you.html`
- `sitemap.xml`
- `robots.txt`
- `_headers`
- `BENJY-SERVICES-FACEBOOK-AND-VIDEO.md`
- `BENJY-FORM-SETUP-AND-LEAD-TRACKING.md`
- `V23.4-BUSINESS-READY-AUDIT.md`
- `V23.4-BUSINESS-READY-UPDATE.md`

## Merge and deploy

1. Inspect the repository and confirm which branch Netlify uses for production.
2. Compare the production branch with this package. Preserve only genuinely newer user-approved changes.
3. Merge or replace the repository-root files with the complete contents of this folder.
4. Keep paths and capitalization exactly as supplied.
5. Do not nest the site inside an extra directory.
6. Commit with `Publish Awakening Eden v23.4 business-ready services`.
7. Push the production branch and wait for a successful Netlify production deploy.
8. Confirm the deployment timestamp and commit SHA correspond to the new commit.

## Netlify form activation

The static form in `work-with-benjy.html` is intentionally named `land-project-enquiry` and uses:

- `data-netlify="true"`
- `netlify-honeypot="bot-field"`
- a hidden `form-name`
- a custom root-relative success page
- a field named `email`, allowing notification replies to address the submitter
- UTM and referrer fields for campaign attribution

After deployment:

1. In Netlify, open **Forms** and enable form detection if required.
2. Redeploy after enabling detection.
3. Submit a real test from `/work-with-benjy`.
4. Confirm `land-project-enquiry` appears under Forms and the test appears under verified submissions.
5. In **Project configuration → Notifications → Emails and webhooks → Form submission notifications**, add Benjy's chosen email address for this form.
6. Reply to the test notification and confirm the reply-to address is the submitter's test email.
7. Delete or mark the test clearly after confirming the workflow.

Do not add an unapproved public email or phone number to the source.

## Page and button verification

Verify these routes directly:

- `/`
- `/start-here`
- `/thriving-in-these-times`
- `/living-library`
- `/journey`
- `/about`
- `/work-with-benjy`
- `/project-enquiry-thank-you.html`
- `/Awakening-Regeneration-Guide.pdf`
- `/Thriving-in-These-Times-Guide.pdf`

At desktop, tablet and phone widths confirm:

- one visible H1 per page and no accidental repeated section;
- the header logo and menu work;
- the three starting offers link to the enquiry form and preselect the correct option;
- all eight specialist service cards, orchard section, partnership section, FAQs, field gallery and form are present;
- required form controls reject incomplete submissions and a complete test reaches the thank-you page;
- authentic project images load, crop naturally and retain their alt text;
- all side frames and botanical corners remain fully composed, with no accidental chopped border or horizontal scrolling;
- guide HTML pages and downloadable PDFs open;
- internal navigation, WhatsApp, Telegram and PayPal links work;
- no missing assets, JavaScript errors or mixed-content warnings appear.

## Video replacement when Benjy supplies the final file

Replace only the `.video-placeholder` element inside `#meet-benjy`.

- Prefer an optimized MP4 (H.264 + AAC) with a WebM fallback, or a privacy-conscious hosted embed.
- Add a poster image, native controls, captions and a nearby transcript.
- Do not autoplay sound.
- Do not commit the uncompressed phone original.
- Keep the existing section heading and surrounding copy unless Benjy approves a change.

## Final report back

Report:

- production branch and deployed commit SHA;
- Netlify deploy status and timestamp;
- whether `land-project-enquiry` was detected;
- whether the test submission and email notification succeeded;
- desktop and mobile pages checked;
- any conflict or remaining issue. Do not silently remove content to resolve a conflict.
