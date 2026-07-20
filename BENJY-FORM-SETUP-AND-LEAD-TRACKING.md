# Benjy enquiry form — exact setup and follow-up workflow

The easiest reliable first system is already built into v23.4:

**Website form → Netlify Forms → email notification → Awakening Eden lead tracker**

It avoids publishing a personal email address, keeps professional enquiries separate from community chats and records which Facebook post or video produced the enquiry.

## One-time Netlify setup

1. Deploy v23.4.
2. Open the Awakening Eden project in Netlify.
3. Open **Forms** and select **Enable form detection** if it is not already active.
4. Trigger a fresh production deploy after enabling detection.
5. Visit `/work-with-benjy`, complete every required field and submit a test.
6. Confirm a form called `land-project-enquiry` appears in Netlify Forms.
7. Open **Project configuration → Notifications → Emails and webhooks → Form submission notifications**.
8. Add an email notification for `land-project-enquiry` to the inbox Benjy checks.
9. Reply to the test email. Because the form field is named `email`, Netlify should set the submitter as the reply-to address.
10. Check the Spam submissions view if the test does not appear under verified submissions.

The form already includes a hidden honeypot field and a custom success page. Do not remove either.

## What the form collects

- name and email;
- optional WhatsApp / phone;
- preferred reply method;
- location, property type and approximate size;
- desired start timeframe;
- likely service interest;
- vision and present challenge;
- optional view-only photograph, map or video link;
- consent to receive a reply;
- source, medium, campaign and content tags from tracked links;
- referrer and landing page.

Do not request sensitive medical, identity or financial details through this form.

## Daily lead routine — five minutes

For every genuine enquiry:

1. Reply personally within one to two working days.
2. Add one row to `Awakening-Eden-Enquiry-and-Project-Tracker-v23.4.xlsx`.
3. Set **Status**, **Priority**, **Next Action** and **Follow-up Date** before closing the file.
4. Recommend the smallest useful first step rather than pushing the largest package.
5. If the project is not ready, move it to **Nurture** with a real future follow-up date.

Suggested first reply:

> Thank you for sharing your land story. I have read it with care. From what you have described, the most useful first step may be [offer], because it would help us clarify [reason]. I have two short questions before I suggest a scope: [questions]. If it still feels aligned after that, I will send a simple outline of what is included, timing and fee—without pressure.

## Weekly rhythm

Every Monday or chosen admin day:

- open the Dashboard sheet;
- reply to every lead still marked **New**;
- complete every overdue follow-up;
- review **Discovery booked**, **Site visit booked** and **Proposal sent**;
- make sure every live opportunity has one next action and date;
- record why a lead chose **Not now** or **Closed**—this becomes useful market learning.

## Monthly backup and learning

1. In Netlify Forms, open `land-project-enquiry`.
2. Select **Download as CSV**.
3. Save it in a dated private folder, for example `Enquiries/2026-08`.
4. Keep the tracker as the working relationship record; keep the Netlify CSV as the original submission archive.
5. Review enquiries by source and service interest. Continue the messages that bring aligned conversations, not merely clicks.

## Tracked launch links

Facebook announcement:

`https://awakening-eden-library.netlify.app/work-with-benjy?utm_source=facebook&utm_medium=social&utm_campaign=regenerative_land_services&utm_content=launch_post`

Facebook or Instagram introduction video:

`https://awakening-eden-library.netlify.app/work-with-benjy?utm_source=facebook&utm_medium=video&utm_campaign=regenerative_land_services&utm_content=intro_video`

Change only `utm_content` for later posts, for example `orchard_post_01`, `water_post_01` or `food_forest_video_01`. Keep the campaign name stable so results stay grouped.

## When to automate

Begin manually until the form and reply rhythm feel right. Later, a Netlify-to-Google-Sheets automation through Zapier or n8n can add new submissions to a sheet. Keep email notifications active even after automation, and test the automation with non-sensitive dummy data before relying on it.
