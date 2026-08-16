import { mkdir } from 'node:fs/promises';
import path from 'node:path';
import { expect, test } from '@playwright/test';

const criticalRoutes = [
  '/',
  '/start-here',
  '/living-library',
  '/journey',
  '/work-with-benjy',
  '/heart',
  '/links'
];

const protectedRoutes = [
  '/docs/awakening-eden/README.md',
  '/workers/enquiry.mjs',
  '/deliverables/unserved-sources/orchard-before-dry-monoculture.webp',
  '/orchard-before-dry-monoculture.webp',
  '/orchard-after-abundant-green.webp'
];

const publicPdfs = [
  '/Awakening-Regeneration-Guide.pdf',
  '/Awakening_Eden_Regenerative_Film_Resource_Library.pdf'
];

// Browser QA validates our page integration without making a live third-party challenge.
// The separate enquiry tests assert the test sitekey and client-side submit behaviour.
test.beforeEach(async ({ page }) => {
  await page.route('https://challenges.cloudflare.com/turnstile/v0/api.js*', async (route) => {
    await route.fulfill({ contentType: 'text/javascript', body: '' });
  });
});

async function settleLazyImages(page) {
  await page.evaluate(async () => {
    const images = Array.from(document.images).filter((image) => !image.closest('[hidden]'));
    images.forEach((image) => { image.loading = 'eager'; });
    for (const image of images) {
      image.scrollIntoView({ block: 'center' });
      await new Promise((resolve) => setTimeout(resolve, 90));
      if (!image.complete) {
        await Promise.race([
          new Promise((resolve) => image.addEventListener('load', resolve, { once: true })),
          new Promise((resolve) => setTimeout(resolve, 3000))
        ]);
      }
    }
    await Promise.all(images.map(async (image) => {
      if (image.complete && image.naturalWidth > 0) return;
      await Promise.race([
        image.decode().catch(() => {}),
        new Promise((resolve) => setTimeout(resolve, 5000))
      ]);
    }));
    window.scrollTo(0, 0);
  });
  await page.waitForTimeout(500);
}

for (const route of criticalRoutes) {
  test(`${route} loads cleanly without overflow or broken local assets`, async ({ page }) => {
    const consoleErrors = [];
    const failedLocalResponses = [];

    page.on('pageerror', (error) => consoleErrors.push(`pageerror: ${error.message}`));
    page.on('console', (message) => {
      if (message.type() === 'error') consoleErrors.push(`console: ${message.text()}`);
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
    await expect(page.locator('h1').first()).toBeVisible();
    await expect(page.locator('a[href]').first()).toBeVisible();

    await settleLazyImages(page);

    const layout = await page.evaluate(() => {
      const brokenImages = Array.from(document.images)
        .filter((image) => {
          const source = image.currentSrc || image.src;
          if (!source) return false;
          const url = new URL(source, document.baseURI);
          const rect = image.getBoundingClientRect();
          const visible = rect.width > 0 && rect.height > 0 && rect.bottom > 0 && rect.top < window.innerHeight && rect.right > 0 && rect.left < window.innerWidth;
          return visible && url.origin === window.location.origin && (!image.complete || image.naturalWidth === 0);
        })
        .map((image) => image.getAttribute('src'));

      return {
        brokenImages,
        viewportWidth: window.innerWidth,
        documentWidth: document.documentElement.scrollWidth,
        bodyWidth: document.body.scrollWidth
      };
    });

    expect(layout.documentWidth, `Document overflow on ${route}`).toBeLessThanOrEqual(layout.viewportWidth + 1);
    expect(layout.bodyWidth, `Body overflow on ${route}`).toBeLessThanOrEqual(layout.viewportWidth + 1);
    expect(layout.brokenImages, `Broken local images on ${route}`).toEqual([]);
    expect(failedLocalResponses, `Failed local resources on ${route}`).toEqual([]);
    expect(consoleErrors, `Browser errors on ${route}`).toEqual([]);
  });
}

test('homepage exposes the primary journeys', async ({ page }) => {
  await page.goto('/', { waitUntil: 'domcontentloaded' });
  await expect(page.getByRole('heading', { level: 1, name: 'Awakening Eden' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Begin Here', exact: true }).first()).toHaveAttribute('href', '/start-here');
  await expect(page.getByRole('link', { name: 'Explore the Living Library', exact: true })).toHaveAttribute('href', '/living-library');
  await expect(page.getByRole('link', { name: 'Work with Benjy', exact: true }).first()).toHaveAttribute('href', '/work-with-benjy');
});

test('Work with Benjy keeps its enquiry path visible without submitting it', async ({ page }) => {
  await page.goto('/work-with-benjy', { waitUntil: 'domcontentloaded' });
  await expect(page.getByRole('heading', { level: 1, name: 'Let’s help your land become more alive.' })).toBeVisible();
  await expect(page.getByRole('link', { name: /Tell me about your land/ }).first()).toHaveAttribute('href', '#land-vision');
  const form = page.locator('form[data-land-enquiry-form]');
  await expect(form).toBeHidden();
  await expect(form).toHaveAttribute('data-netlify', 'true');
  await expect(form).toHaveAttribute('action', '/project-enquiry-thank-you.html');
  await expect(page.getByRole('link', { name: 'Send by WhatsApp' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Send by Email' })).toBeVisible();
});

test('public PDFs remain reachable', async ({ request }) => {
  for (const route of publicPdfs) {
    const response = await request.get(route);
    expect(response.status(), `Unexpected status for ${route}`).toBe(200);
    expect(response.headers()['content-type'], `Unexpected content type for ${route}`).toContain('application/pdf');
  }
});

test('protected sources and rights-unconfirmed images stay unavailable', async ({ request }) => {
  for (const route of protectedRoutes) {
    const response = await request.get(route);
    expect(response.status(), `Protected path became public: ${route}`).toBe(404);
    expect(await response.text()).not.toContain('AWAKENING_EDEN_CANONICAL_KNOWLEDGE_MAP');
  }
});

for (const reviewPage of [
  { route: '/', name: 'homepage' },
  { route: '/work-with-benjy', name: 'work-with-benjy' }
]) {
  test(`capture ${reviewPage.name} review screenshot`, async ({ page }, testInfo) => {
    test.setTimeout(120_000);
    await page.goto(reviewPage.route, { waitUntil: 'domcontentloaded' });
    await settleLazyImages(page);
    const reviewDirectory = path.join('test-results', 'review', testInfo.project.name);
    await mkdir(reviewDirectory, { recursive: true });
    await page.screenshot({
      path: path.join(reviewDirectory, `${reviewPage.name}.png`),
      fullPage: true
    });
    if (reviewPage.name === 'work-with-benjy') {
      await page.locator('.site-header, .skip-link').evaluateAll((elements) => {
        elements.forEach((element) => { element.dataset.reviewVisibility = element.style.visibility; element.style.visibility = 'hidden'; });
      });
      for (const [name, selector] of [['hero', '.vnext-hero'], ['orchard-proof', '.vnext-proof']]) {
        const section = page.locator(selector);
        await section.scrollIntoViewIfNeeded();
        await expect(section.locator('img').first()).toBeVisible();
        await page.waitForTimeout(300);
        await section.screenshot({ path: path.join(reviewDirectory, `work-with-benjy-${name}.png`) });
      }
      await page.locator('.site-header, .skip-link').evaluateAll((elements) => {
        elements.forEach((element) => { element.style.visibility = element.dataset.reviewVisibility || ''; delete element.dataset.reviewVisibility; });
      });
    }
  });
}
