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

test.beforeEach(async ({ page }) => {
  await page.route('https://challenges.cloudflare.com/turnstile/v0/api.js*', async (route) => {
    await route.fulfill({ contentType: 'text/javascript', body: '' });
  });
});

async function settleLazyImages(page) {
  await page.evaluate(async () => {
    const images = Array.from(document.images).filter((image) => !image.closest('[hidden]'));
    images.forEach((image) => {
      const source = image.currentSrc || image.src;
      image.loading = 'eager';
      image.removeAttribute('loading');
      if (image.hasAttribute('srcset')) {
        image.removeAttribute('srcset');
        image.removeAttribute('sizes');
        image.src = source;
      }
    });

    for (const image of images) {
      image.scrollIntoView({ block: 'center' });
      await new Promise((resolve) => setTimeout(resolve, 60));
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
  await page.waitForTimeout(400);
}

for (const route of criticalRoutes) {
  test(`${route} loads cleanly without overflow or broken local assets`, async ({ page }) => {
    const consoleErrors = [];
    const failedLocalResponses = [];

    page.on('pageerror', (error) => consoleErrors.push(`pageerror: ${error.message}`));
    page.on('console', (message) => {
      const isResourceNoise = message.text().startsWith('Failed to load resource:');
      if (message.type() === 'error' && !isResourceNoise) consoleErrors.push(`console: ${message.text()}`);
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
          const visible = rect.width > 0 && rect.height > 0;
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

test('homepage exposes the final opening journey and approved visual choices', async ({ page }) => {
  await page.goto('/', { waitUntil: 'domcontentloaded' });

  await expect(page.getByRole('heading', { level: 1, name: 'Awakening Eden' })).toBeVisible();
  await expect(page.locator('.hero-promise')).toHaveText('A Living Library for Positive Change, Regeneration, Remembering & Thriving as One.');

  const threshold = page.locator('.threshold-section');
  await expect(threshold.locator('.welcome-home-art')).toHaveAttribute('src', /welcome-home-benjy-sofia-rooted-lotus-v34-1536\.webp/);
  await expect(threshold.getByRole('link', { name: /Begin Here/ })).toHaveAttribute('href', '/start-here');
  await expect(threshold.getByRole('link', { name: /Explore the Living Library/ })).toHaveAttribute('href', '/living-library');
  await expect(threshold.getByRole('link', { name: /Work with Benjy/ })).toHaveAttribute('href', '/work-with-benjy');

  await expect(page.getByRole('heading', { level: 2, name: 'We’re Benjy & Sofia — glad you’re here' })).toBeVisible();
  await expect(page.locator('.founders-welcome__portrait')).toHaveCount(0);

  const circle = page.locator('.invitation-section--opening-vision .invitation-film--vision');
  await expect(circle.locator('img')).toHaveAttribute('src', /garden-of-harmony-community-lotus-vnext\.webp/);
  await expect(circle.getByText('A Circle of Belonging', { exact: true })).toBeVisible();

  await expect(page.locator('.library-room--illustrated')).toHaveCount(3);
  await expect(page.locator('.library-room__art').nth(0)).toHaveAttribute('src', '/library-guide-v19.webp');
  await expect(page.locator('.library-room__art').nth(1)).toHaveAttribute('src', '/library-films-v19.webp');
  await expect(page.locator('.library-room__art').nth(2)).toHaveAttribute('src', '/library-books-v19.webp');

  await expect(page.locator('#soundtrack')).toContainText('Songs for the Soil, Soul & Regenerative Hope');
});

test('Work with Benjy reflects the current service hierarchy', async ({ page }) => {
  await page.goto('/work-with-benjy', { waitUntil: 'domcontentloaded' });

  await expect(page.getByRole('heading', { level: 1, name: 'Work with Benjy' })).toBeVisible();
  await expect(page.getByRole('heading', { level: 3, name: 'Land & Project Clarity Session' })).toBeVisible();
  await expect(page.locator('.vnext-offer__price').first()).toContainText('€111');
  await expect(page.getByRole('link', { name: 'Book the €111 Clarity Session' })).toBeVisible();

  await expect(page.getByRole('heading', { level: 3, name: 'Whole-Property Design + Action Plan' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Discuss a whole-property design' })).toBeVisible();
  await expect(page.locator('.vnext-offer')).toHaveCount(2);

  await expect(page.getByRole('link', { name: /Tell me about your land or project/ }).first()).toHaveAttribute('href', '#land-vision');
  const form = page.locator('form[data-land-enquiry-form]');
  await expect(form).toBeHidden();
  await expect(form).toHaveAttribute('data-netlify', 'true');
  await expect(form).toHaveAttribute('action', '/project-enquiry-thank-you.html');
  await expect(page.getByRole('link', { name: 'WhatsApp Benjy About Your Land' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Email Benjy About Your Land' })).toBeVisible();
});

test('Work with Benjy exposes implementation guidance at its direct anchor', async ({ page }) => {
  await page.goto('/work-with-benjy#implementation', { waitUntil: 'domcontentloaded' });
  const implementation = page.locator('#implementation');
  await expect(implementation.getByRole('heading', { name: 'Bringing it to life' })).toBeVisible();
  await expect(implementation.getByText('Monthly guidance as questions come up', { exact: true })).toBeVisible();
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
    if (reviewPage.name === 'work-with-benjy' && testInfo.project.name === 'desktop-chromium') {
      await page.setViewportSize({ width: 1180, height: 1000 });
    }
    await settleLazyImages(page);
    const reviewDirectory = path.join('test-results', 'review', testInfo.project.name);
    await mkdir(reviewDirectory, { recursive: true });
    await page.screenshot({
      path: path.join(reviewDirectory, `${reviewPage.name}.png`),
      fullPage: true
    });
  });
}
