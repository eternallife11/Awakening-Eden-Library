import { mkdir } from 'node:fs/promises';
import path from 'node:path';
import { expect, test } from '@playwright/test';

const criticalRoutes = [
  '/',
  '/start-here',
  '/living-library',
  '/journey',
  '/work-with-benjy',
  '/partners',
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

    await Promise.all(images.map((image) => Promise.race([
      image.decode().catch(() => {}),
      new Promise((resolve) => setTimeout(resolve, 5000))
    ])));

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
  await expect(page.getByText('From overwhelmed landowner to regenerative clarity.', { exact: true })).toBeVisible();

  await expect(page.getByRole('heading', { level: 3, name: 'Land Clarity & Action Session' })).toBeVisible();
  await expect(page.locator('.vnext-offer__price').first()).toContainText('€111');
  await expect(page.getByRole('link', { name: 'WhatsApp Benjy · Book the €111 Clarity Call' })).toBeVisible();

  await expect(page.getByRole('heading', { level: 3, name: 'Focused Regenerative Roadmap' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'WhatsApp Benjy · Focused Roadmap' })).toBeVisible();

  await expect(page.getByRole('heading', { level: 3, name: 'Holistic Regenerative Concept Masterplan' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'WhatsApp Benjy · Whole-Property Masterplan' })).toBeVisible();
  await expect(page.locator('.vnext-offer')).toHaveCount(3);

  const recentDesign = page.locator('#recent-design');
  await expect(recentDesign.getByRole('heading', { name: 'Contour Food Forest Ideas' })).toBeVisible();
  await expect(recentDesign.getByRole('heading', { name: /Syntropifying: Abundant Food Forest Berrylicious Terrace Gardens/ })).toBeVisible();
  await expect(recentDesign.locator('img[src*="contour-before-v2.webp"]')).toHaveCount(1);
  await expect(recentDesign.locator('img[src*="contour-food-forest-concept-v2.webp"]')).toHaveCount(1);
  await expect(recentDesign.locator('img[src*="luisa-sim-berrylicious-terrace-concept-v2.webp"]')).toHaveCount(1);

  await expect(page.getByRole('link', { name: /Tell me about your land or project/ }).first()).toHaveAttribute('href', '#land-vision');
  const form = page.locator('form[data-land-enquiry-form]');
  await expect(form).toBeHidden();
  await expect(form).toHaveAttribute('data-netlify', 'true');
  await expect(form).toHaveAttribute('action', '/project-enquiry-thank-you.html');
  await expect(page.getByRole('link', { name: 'WhatsApp Benjy About Your Land' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Email Benjy About Your Land' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'WhatsApp Benjy · Explore a Partnership' }).first()).toBeVisible();
  await expect(page.locator('header .brand img')).toHaveAttribute('src', 'assets/brand/awakening-eden-mark-primary.svg');
  await expect(page.locator('footer .footer-brand img')).toHaveAttribute('src', 'assets/brand/awakening-eden-mark-reversed.svg');
});

test('Work with Benjy exposes implementation guidance at its direct anchor', async ({ page }) => {
  await page.goto('/work-with-benjy#implementation', { waitUntil: 'domcontentloaded' });
  const implementation = page.locator('#implementation');
  await expect(implementation.getByRole('heading', { name: 'Bringing it to life' })).toBeVisible();
  await expect(implementation.getByText('Monthly guidance as questions come up', { exact: true })).toBeVisible();
});

test('partnership page exposes the referral pathway and current service ladder', async ({ page }) => {
  await page.goto('/partners', { waitUntil: 'domcontentloaded' });

  await expect(page.getByRole('heading', { level: 1, name: 'Add the regenerative land layer.' })).toBeVisible();
  await expect(page.getByText('You help people find or create the right rural property. I help them understand what the land can become—and what to do first.', { exact: true })).toBeVisible();

  const pathway = page.locator('#pathway');
  await expect(pathway.getByRole('heading', { name: 'A human referral pathway, without the pressure.' })).toBeVisible();
  await expect(pathway.getByText('Introduce us—with permission', { exact: true })).toBeVisible();
  await expect(pathway.getByText('Start with clarity', { exact: true })).toBeVisible();

  const services = page.locator('#services');
  await expect(services.getByRole('heading', { level: 3, name: 'Land Clarity & Action Session' })).toBeVisible();
  await expect(services.locator('.vnext-offer__price')).toContainText('€111');
  await expect(services.getByRole('heading', { level: 3, name: 'Focused Regenerative Roadmap' })).toBeVisible();
  await expect(services.getByText('From €450', { exact: false })).toBeVisible();
  await expect(services.getByRole('heading', { level: 3, name: 'Holistic Regenerative Concept Masterplan' })).toBeVisible();
  await expect(services.getByText('From €1,500', { exact: false })).toBeVisible();

  await expect(page.getByRole('heading', { name: 'Natural fences + timber details' })).toBeVisible();
  await expect(page.getByText('Illustrative learning board · not a surveyed site plan', { exact: true })).toBeVisible();
  await expect(page.locator('.partners-photo-sprig')).toHaveAttribute('src', 'assets/ornaments/photo-sprig-olive-rosemary.svg');
  await expect(page.locator('.partners-pathway__roots')).toHaveAttribute('src', 'assets/ornaments/photo-root-fungi-water.svg');
  await expect(page.locator('.partners-final__divider')).toHaveAttribute('src', 'assets/dividers/heart-hummingbird-vine-divider.svg');
  await expect(page.locator('header .brand img')).toHaveAttribute('src', 'assets/brand/awakening-eden-mark-primary.svg');
  await expect(page.locator('footer .footer-brand img')).toHaveAttribute('src', 'assets/brand/awakening-eden-mark-reversed.svg');
  await expect(page.getByRole('link', { name: 'WhatsApp Benjy · Explore a Partnership' }).first()).toBeVisible();
  await expect(page.getByRole('link', { name: 'Email Benjy' })).toBeVisible();

  await settleLazyImages(page);
  const editorialImages = page.locator('.partners-work-card > img, .partners-final__photo');
  await expect(editorialImages).toHaveCount(4);
  const editorialImageBoxes = await editorialImages.evaluateAll((images) => images.map((image) => {
    const bounds = image.getBoundingClientRect();
    return {
      width: bounds.width,
      height: bounds.height,
      naturalWidth: image.naturalWidth,
      naturalHeight: image.naturalHeight
    };
  }));
  for (const [index, box] of editorialImageBoxes.entries()) {
    expect(box.width, `Partnership editorial image ${index + 1} must occupy a visible-width frame`).toBeGreaterThan(200);
    expect(box.height, `Partnership editorial image ${index + 1} must occupy a visible-height frame`).toBeGreaterThan(180);
    expect(box.naturalWidth, `Partnership editorial image ${index + 1} must decode at a real width`).toBeGreaterThan(0);
    expect(box.naturalHeight, `Partnership editorial image ${index + 1} must decode at a real height`).toBeGreaterThan(0);
  }
});

test('partnership and Work with Benjy pages do not repeat meaningful imagery', async ({ page }) => {
  const collectMeaningfulImages = async (route) => {
    await page.goto(route, { waitUntil: 'domcontentloaded' });
    return page.locator('main img[src]').evaluateAll((images) => images
      .map((image) => image.getAttribute('src'))
      .filter((source) => source && !source.includes('/brand/') && !source.includes('/ornaments/') && !source.includes('/dividers/')));
  };

  const workImages = await collectMeaningfulImages('/work-with-benjy');
  const partnerImages = await collectMeaningfulImages('/partners');
  const repeatedOnPartnerPage = partnerImages.filter((source, index) => partnerImages.indexOf(source) !== index);
  const sharedAcrossWorkPages = partnerImages.filter((source) => workImages.includes(source));

  expect(repeatedOnPartnerPage, 'Partnership page repeats a meaningful image').toEqual([]);
  expect(sharedAcrossWorkPages, 'Partnership and Work with Benjy reuse meaningful imagery').toEqual([]);
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
  { route: '/work-with-benjy', name: 'work-with-benjy' },
  { route: '/partners', name: 'partners' }
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
