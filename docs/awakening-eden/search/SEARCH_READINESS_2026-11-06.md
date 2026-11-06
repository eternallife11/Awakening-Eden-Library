# Search readiness · 6 November 2026

## Purpose and scope

Make the existing, owner-approved Awakening Eden easier to understand and discover through conventional search and AI-assisted search. Preserve the founders’ voice, artwork, free resources and actual offers. No invented credentials, testimonials, outcomes, partners or medical services. No paid SEO account or advertising activated.

## Search intent and destination

| Visitor is looking for | Primary destination | Useful supporting content |
| --- | --- | --- |
| Permaculture consulting in Portugal; food forest design; syntropic agroforestry | /work-with-benjy | Actual portfolio, Fiona’s design journey, Adam’s water concept |
| Online regenerative land consulting | /work-with-benjy#online-consulting | Published €111, 75-minute session, written action plan and follow-up |
| Whole-property design and project coordination | /work-with-benjy | Consultation → roadmap → concept/design → practical support |
| Yoga, holistic wellbeing, nature connection | /sofia | Actual practices, enquiry scope, availability agreed individually |
| Detox and simpler living | /sofia#holistic-wellbeing | Everyday renewal/digital detox; no detoxification or treatment promises |
| Free regeneration and permaculture learning | /start-here | Living Guide and free workbook pathways |
| Films, teachers, resources and hopeful solutions | /living-library | Existing curated resources and official source links |
| Regenerative village, natural homes, collaboration | /village-vision; /village-homes; /partners | Research, current stage and specific ways to connect |
| Who we are; regenerative interbeing and mission | /journey; /about; /regenerate-together | Lived journey, spiritual worldview and practical service pathways |

Each primary page now has a distinct title and description and matching social metadata. The main discovery pages carry Organization/Person/WebPage/Service metadata where appropriate. The organization and individual founders have separate profile identifiers; only the actual published fixed-price consultation is given a schema price. No review, medical, fake address or event markup was added.

## Technical work

- Updated sitemap lastmod only for the 13 pages whose copy/metadata changed meaningfully today. Other dates retained.
- Crawlable HTML, single primary headings, official-domain canonicals and internal links remain. No new thin keyword pages, AI-only duplicate content, crawler blocks or special AI schema.
- Homepage CSS is combined in source order into a content-hashed build asset. Source styles remain editable.
- Long homepage sections render as they approach the visitor. Direct fragment links and print use the full layout; fragment scrolling is immediate so large estimated heights do not misplace destinations.
- Original Cormorant Garamond, Source Sans 3 and Caveat fonts are served locally. Eight original WOFF2 files and all three SIL Open Font Licences are included. No alteration of font files.
- Work with Benjy now preloads its actual current hero, rather than an old image.
- An IndexNow verification file is prepared. It is not an indexing guarantee, and notification has not been sent. Exact URLs must be approved before submission, per the indexing-health workflow.

## Evidence and limits

- GSC Wizard refused both connected accounts because their trials/subscriptions have ended. Search Console/Bing account reports, current index coverage, ranking/click baselines and search demand cannot be claimed as verified. Reconnect an active reporting account, or review free official Search Console and Bing Webmaster Tools directly.
- Browser search-readiness checks cover unique metadata, exact canonicals, one H1, valid JSON, working fragment destinations, wellbeing enquiries and local fonts/licences.
- Lighthouse is a local simulated mobile lab check, not real-user Core Web Vitals or proof of ranking gains. Measurements vary with the laptop and concurrent work. Baseline: performance 33, accessibility 100, SEO 100; LCP 6.2s, TBT 1,780ms, CLS .001. Three final sequential mobile runs: performance 49 / 61 / 33 (median 49); accessibility and SEO 100 in all three. LCP 5.2 / 5.5 / 5.9s (median 5.5s); TBT 1,980 / 630 / 4,370ms; CLS .002 / .002 / 0. First paint and LCP improved in this local comparison, but blocking-time measurements are too variable to claim improvement. Mobile LCP still needs further work; these are not production field measurements. Raw reports are retained in the local temporary QA directory.
- A search readiness score does not mean rankings or rich results are guaranteed. Google may rewrite snippets and choose its own canonical.

## Current primary guidance consulted

- Google AI guidance: https://developers.google.com/search/docs/fundamentals/ai-optimization-guide
- Google AI features: https://developers.google.com/search/docs/appearance/ai-features
- Google structured data: https://developers.google.com/search/docs/appearance/structured-data/intro-structured-data
- Accurate sitemap dates: https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap
- Bing guidelines: https://www.bing.com/webmasters/help/webmaster-guidelines-30fba23a
- Ecosia providers (Bing, Google and EUSP depending on region/settings): https://support.ecosia.org/article/579-search-results-providers
- IndexNow: https://www.indexnow.org/documentation
- Deferred rendering: https://web.dev/articles/content-visibility
- Google Fonts/OFL: https://fonts.google.com/faq ; original per-family licence files in assets/fonts/
- Detox claims: https://www.nccih.nih.gov/health/detoxes-and-cleanses-what-you-need-to-know

## Useful follow-on work

1. Verify domain ownership and sitemap processing in free Search Console and Bing Webmaster Tools; obtain the actual reports before drawing indexing/ranking conclusions.
2. After exact-URL approval and public key verification, notify IndexNow once for this release. An accepted notification is not confirmed crawling or indexing. Google does not use IndexNow.
3. Let actual search queries guide the next editorial work. Publish original, permission-cleared project stories and useful answers with named authors and genuine observations. Date substantive changes truthfully.
4. Track consultation enquiries, useful guide downloads and collaborator conversations alongside clicks. No analytics was installed without a privacy decision.
5. If a Google Business Profile is appropriate, use the real eligible service-area business and owner-verified details. Do not invent a public address or create a profile automatically.

## Pre-release review

Desktop/390px phone screenshots reviewed: approved homepage art and shortcuts intact, no welcome fade delaying visibility, and new wellbeing text inset for comfortable reading. No overflow or page errors observed. New search-readiness checks pass on desktop/mobile Chromium, Firefox and WebKit; 14 main-route desktop/mobile Axe checks and 13 Worker unit tests pass. Full CI and public verification remain the release gates.
