import { mkdir } from 'node:fs/promises';
import path from 'node:path';
import { expect, test } from '@playwright/test';

const publicHtmlRoutes = [
  '/',
  '/404.html',
  '/7-First-Steps-Regenerate-Your-Land.html',
  '/7-first-steps-regenerate-your-land.html',
  '/Abundant-Edge-Index.html',
  '/Awakening-Regeneration.html',
  '/Regeneration-101-Field-Guide.html',
  '/Small-Scale-Regenerative-Farm-Playbook.html',
  '/Thriving-in-These-Times.html',
  '/about.html',
  '/abundant-edge-index.html',
  '/acacia_dealbata_magic_manual_regenerative_eden.html',
  '/awakening_eden_regenerative_film_resource_library_updated.html',
  '/events.html',
  '/heart.html',
  '/journal.html',
  '/journey.html',
  '/links.html',
  '/living-library.html',
  '/offline.html',
  '/project-enquiry-thank-you.html',
  '/small-scale-regenerative-farm-playbook.html',
  '/sofia.html',
  '/start-here.html',
  '/thank-you.html',
  '/thriving-in-these-times.html',
  '/work-with-benjy.html'
];

const primaryReviewRoutes = [
  ['homepage', '/'],
  ['start-here', '/start-here'],
  ['living-library', '/living-library'],
  ['thriving-in-these-times', '/thriving-in-these-times'],
  ['work-with-benjy', '/work-with-benjy'],
  ['about', '/about'],
  ['heart', '/heart'],
  ['links', '/links'],
  ['journal', '/journal'],
  ['journey', '/journey'],
  ['sofia', '/sofia'],
  ['events', '/events'],
  ['seven-first-steps', '/7-first-steps-regenerate-your-land'],
  ['abundant-edge-index', '/abundant-edge-index'],
  ['small-farm-playbook', '/small-scale-regenerative-farm-playbook'],
  ['acacia-manual', '/acacia_dealbata_magic_manual_regenerative_eden.html']
];

test.beforeEach(async ({ page }) => {
  await page.route('https://challenges.cloudflare.com/turnstile/v0/api.js*', async (route) => {
    await route.fulfill({ contentType: 'text/javascript', body: '' });
  });
});

async function loadAndAuditPage(page, route) {
  const consoleErrors = [];
  const failedLocalResponses = [];
  page.on('pageerror', (error) => consoleErrors.push(`pageerror: ${error.message}`));
  page.on('console', (message) => {
    const isResourceNoise = message.text().startsWith('Failed to load resource:');
    if (message.type() === 'error' && !isResourceNoise) {
      consoleErrors.push(`console: ${message.text()}`);
    }
  });
  page.on('response', (response) => {
    const url = new URL(response.url());
    if (url.origin === 'http://127.0.0.1:8787' && response.status() >= 400) {
      failedLocalResponses.push(`${response.status()} ${url.pathname}`);
    }
  });

  const response = await page.goto(route, { waitUntil: 'domcontentloaded' });
  expect(response, `No navigation response for ${route}`).not.toBeNull();
  expect(response.status(), `Unexpected status for ${route}`).toBe(200);
  await expect(page.locator('body')).toBeVisible();

  const audit = await page.evaluate(async () => {
    const images = Array.from(document.images).filter((image) => !image.closest('[hidden]') && image.getAttribute('src'));
    images.forEach((image) => { image.loading = 'eager'; image.removeAttribute('loading'); });
    for (const image of images) {
      image.scrollIntoView({ block: 'center' });
      await new Promise((resolve) => setTimeout(resolve, 50));
      if (!image.complete) {
        await Promise.race([
          new Promise((resolve) => image.addEventListener('load', resolve, { once: true })),
          new Promise((resolve) => setTimeout(resolve, 3000))
        ]);
      }
    }

    const brokenImages = images
      .filter((image) => {
        const source = new URL(image.currentSrc || image.src, document.baseURI);
        return source.origin === location.origin && (!image.complete || image.naturalWidth === 0);
      })
      .map((image) => image.getAttribute('src'));
    const missingAlt = images
      .filter((image) => !image.hasAttribute('alt'))
      .map((image) => image.getAttribute('src'));
    const samePageBrokenAnchors = Array.from(document.querySelectorAll('a[href^="#"]'))
      .map((anchor) => anchor.getAttribute('href'))
      .filter((href) => href && href !== '#' && !document.getElementById(decodeURIComponent(href.slice(1))));
    const invalidLinks = Array.from(document.querySelectorAll('a[href]'))
      .map((anchor) => anchor.getAttribute('href'))
      .filter((href) => !href || /^javascript:/i.test(href));

    document.documentElement.style.scrollBehavior = 'auto';
    window.scrollTo(0, 0);
    return {
      brokenImages,
      missingAlt,
      samePageBrokenAnchors,
      invalidLinks,
      viewportWidth: window.innerWidth,
      documentWidth: document.documentElement.scrollWidth,
      bodyWidth: document.body.scrollWidth
    };
  });

  expect(audit.documentWidth, `Document overflow on ${route}`).toBeLessThanOrEqual(audit.viewportWidth + 1);
  expect(audit.bodyWidth, `Body overflow on ${route}`).toBeLessThanOrEqual(audit.viewportWidth + 1);
  expect(audit.brokenImages, `Broken local images on ${route}`).toEqual([]);
  expect(audit.missingAlt, `Images missing alt attributes on ${route}`).toEqual([]);
  expect(audit.samePageBrokenAnchors, `Broken same-page anchors on ${route}`).toEqual([]);
  expect(audit.invalidLinks, `Invalid links on ${route}`).toEqual([]);
  expect(failedLocalResponses, `Failed local responses on ${route}`).toEqual([]);
  expect(consoleErrors, `Browser errors on ${route}`).toEqual([]);
}

for (const route of publicHtmlRoutes) {
  test(`public HTML ${route} renders without asset, anchor or overflow failures`, async ({ page }) => {
    test.setTimeout(120_000);
    await loadAndAuditPage(page, route);
  });
}

for (const [name, route] of primaryReviewRoutes) {
  test(`capture primary route ${name}`, async ({ page }, testInfo) => {
    test.setTimeout(120_000);
    await loadAndAuditPage(page, route);
    const reviewDirectory = path.join('test-results', 'review', 'sitewide', testInfo.project.name);
    await mkdir(reviewDirectory, { recursive: true });
    await page.evaluate(async () => {
      const images = Array.from(document.images).filter((image) => image.getAttribute('src'));
      images.forEach((image) => { image.loading = 'eager'; image.removeAttribute('loading'); });
      await Promise.all(images.map((image) => image.decode().catch(() => undefined)));
    });
    await page.waitForTimeout(250);
    await page.screenshot({ path: path.join(reviewDirectory, `${name}.png`), fullPage: true });
  });
}

test('all internal links referenced by public HTML resolve', async ({ request }) => {
  test.setTimeout(180_000);
  const internalLinks = new Set();
  for (const route of publicHtmlRoutes) {
    const response = await request.get(route);
    const html = await response.text();
    for (const match of html.matchAll(/\shref=["']([^"']+)["']/gi)) {
      const href = match[1].replaceAll('&amp;', '&');
      if (/^(?:mailto:|tel:|javascript:|data:)/i.test(href)) continue;
      const url = new URL(href, `http://127.0.0.1:8787${route}`);
      if (url.origin !== 'http://127.0.0.1:8787') continue;
      url.hash = '';
      internalLinks.add(`${url.pathname}${url.search}`);
    }
  }

  const failures = [];
  for (const href of internalLinks) {
    const response = await request.get(href);
    if (response.status() >= 400) failures.push(`${response.status()} ${href}`);
  }
  expect(failures, 'Broken internal links across public HTML').toEqual([]);
});
