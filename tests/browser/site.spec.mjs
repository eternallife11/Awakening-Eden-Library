import { mkdir } from 'node:fs/promises';
import path from 'node:path';
import { expect, test } from '@playwright/test';

const criticalRoutes = [
  '/',
  '/start-here',
  '/living-library',
  '/journey',
  '/work-with-us',
  '/work-with-benjy',
  '/partners',
  '/eden-designer',
  '/village-vision',
  '/village-research',
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

test('homepage exposes the final opening journey and approved visual choices', async ({ page }, testInfo) => {
  await page.goto('/', { waitUntil: 'domcontentloaded' });

  await expect(page.getByRole('heading', { level: 1, name: 'Awakening Eden' })).toBeVisible();
  await expect(page.locator('.hero-promise')).toHaveText('Practical wisdom for people and places ready to grow more life.');
  await expect(page.locator('.home-opening .hero-library')).toContainText('A regenerative home & living library for the New Earth.');
  await expect(page.locator('.home-circle-header picture img')).toHaveAttribute('src', /circle-of-belonging-painted-tree-home-oct23-1448\.webp/);
  await expect(page.locator('img[src$="circle-of-belonging-painted-tree-home-oct23-1448.webp"]')).toHaveCount(1);
  const headerOrder = await page.locator('#hero-title, .home-circle-header, .home-opening__content').evaluateAll(nodes => nodes.map(node => node.getBoundingClientRect().top + scrollY));
  expect(headerOrder).toEqual([...headerOrder].sort((a,b)=>a-b));

  const threshold = page.locator('.threshold-section');
  await expect(threshold.locator('.welcome-home-art')).toHaveAttribute('src', /benjy-sofia-tree-planting-1280\.webp/);
  const openingActions = page.locator('.home-hero-doorways');
  await expect(openingActions.getByRole('heading', {name:'Choose the doorway that calls you.'})).toBeVisible();
  await expect(openingActions.locator('a[href="/living-library"]')).toContainText('Useful PDF guides, inspiring films, books and resources');
  await expect(openingActions.locator('a[href="/work-with-benjy"]')).toContainText('thoughtful design and hands-on support');
  await expect(openingActions.locator('a.door-card')).toHaveCount(4);

  await expect(page.getByRole('heading', { level: 2, name: /We’re Benjy & Sofia/ })).toBeVisible();
  await expect(page.locator('.hero-manifesto')).toContainText('A more beautiful future begins when inner care becomes visible');
  const openingOrder = await page.evaluate(() => {
    const selectors = ['.home-opening', '.home-hero-doorways', '.home-opening__harmonics', '.welcome-home-art', '.hero-manifesto'];
    return selectors.map(selector => document.querySelector(selector).getBoundingClientRect().top + scrollY);
  });
  expect(openingOrder).toEqual([...openingOrder].sort((a, b) => a - b));
  await expect(page.getByRole('link', {name:'Explore regenerative services with Benjy →'})).toHaveAttribute('href','/work-with-benjy');
  await expect(page.locator('.founders-welcome__portrait')).toHaveCount(0);

  const circle = page.locator('.home-circle-header');
  await expect(circle.locator('.exact-lotus-art > picture > img')).toHaveAttribute('src', /circle-of-belonging-painted-tree-home-oct23-1448\.webp/);
  await expect(circle.locator('.exact-lotus-art__lotus')).toHaveCount(0);
  await expect(circle.getByText('A Circle of Belonging', { exact: true })).toBeVisible();

  const fourDoors = page.locator('.grow-section--oct03 .door-card');
  await expect(fourDoors).toHaveCount(4);
  await expect(fourDoors.nth(0)).toHaveAttribute('href', '/living-library');
  await expect(fourDoors.nth(1)).toHaveAttribute('href', '/work-with-benjy');
  const lotusPositions = await page.locator('.door-card__lotus').evaluateAll(images => images.map(image => {
    const art = image.parentElement.getBoundingClientRect();
    const lotus = image.getBoundingClientRect();
    return {kind:image.classList.contains('door-card__lotus--library')?'library':'begin',x:(lotus.x+lotus.width/2-art.x)/art.width,y:(lotus.y+lotus.height/2-art.y)/art.height,aspect:art.width/art.height};
  }));
  const beginLotus = lotusPositions.find(position => position.kind === 'begin');
  const libraryLotus = lotusPositions.find(position => position.kind === 'library');
  expect(beginLotus.x).toBeCloseTo(.5127,2);
  expect(beginLotus.y).toBeCloseTo(.2672,2);
  expect(libraryLotus.x).toBeCloseTo(.356,2);
  expect(libraryLotus.y).toBeCloseTo(.7103,2);
  expect(beginLotus.aspect).toBeCloseTo(632/1160,2);
  await expect(page.locator('.library-doorway .library-exact-lotus')).toHaveAttribute('src', /lotus-of-life-12-exact\.svg/);

  const fieldBanner = page.locator('.field-banner');
  await expect(fieldBanner.getByRole('heading', { name: /Co-creating a more beautiful Earth/ })).toBeVisible();
  await expect(fieldBanner.getByRole('link', { name: 'Explore ORIGIN' })).toHaveAttribute('href', 'https://ourorigin.earth/');
  await expect(fieldBanner.getByRole('link', { name: 'Explore the Biological Renaissance' })).toHaveAttribute('href', 'https://zachbushmd.com/pages/explore');

  const community = page.locator('#community');
  await expect(community.getByRole('link', { name: '@awakening_eden' })).toHaveAttribute('href', 'https://www.instagram.com/awakening_eden/');
  await expect(community.getByRole('link', { name: '@benjy_inspirit' })).toHaveAttribute('href', 'https://www.instagram.com/benjy_inspirit/');
  await expect(community.getByRole('link', { name: '@sofia_wildflower' })).toHaveAttribute('href', 'https://www.instagram.com/sofia_wildflower/');

  await expect(page.locator('#soundtrack')).toContainText('Songs for the Soil, Soul & Regenerative Hope');
  await mkdir('test-results/review', {recursive:true});
  await page.locator('.home-opening').screenshot({path:`test-results/review/home-opening-${testInfo.project.name}.png`});
  await page.locator('.hero-copy__body').screenshot({path:`test-results/review/home-intro-${testInfo.project.name}.png`});
  await page.locator('.home-hero-doorways').screenshot({path:`test-results/review/home-doorways-${testInfo.project.name}.png`});
  if (!testInfo.project.name.startsWith('mobile')) await page.setViewportSize({width:1440,height:1250});
  await page.evaluate(()=>window.scrollTo({top:0,behavior:'instant'}));
  await page.screenshot({path:`test-results/review/home-top-${testInfo.project.name}.png`});
});

test('Work with Benjy makes the practical offer and evidence clear', async ({ page }) => {
  await page.goto('/work-with-benjy', { waitUntil: 'domcontentloaded' });

  await expect(page.getByRole('heading', { level: 1, name: 'Bring your project vision to life.' })).toBeVisible();
  await expect(page.locator('.vnext-hero')).toContainText('biopools and water filtration with qualified specialists');
  await expect(page.locator('#selected-work .eden-project-story')).toHaveCount(4);
  await expect(page.locator('#selected-work .eden-project-story').first()).toContainText('Moinhos');
  await expect(page.locator('#how-i-can-help')).toContainText('Paths, fences & beautiful outdoor spaces');
  await expect(page.locator('#village-invitation')).toContainText('future vision, not a built place');
  await expect(page.getByRole('link', { name: 'Message us about the village' })).toHaveAttribute('href', /^https:\/\/wa\.me\/351920067347/);
  await expect(page.locator('#services .vnext-offer')).toHaveCount(5);
  await expect(page.locator('#services')).toContainText('75-minute video call');
  await expect(page.locator('#services')).toContainText('€111');
  await expect(page.locator('.eden-offer-outcomes')).toHaveCount(5);
  await page.locator('[data-enquiry-service="Property Vision + Concept Plan"]').click();
  await expect(page.locator('#enquiry-service')).toHaveValue('Property Vision + Concept Plan');
  const photos = await page.locator('main figure img').evaluateAll(nodes => nodes.map(n => n.getAttribute('src')));
  expect(new Set(photos).size).toBe(photos.length);
  await expect(page.locator('#recent-design')).toContainText('Proposed food-forest gardens beside the levada');
  await expect(page.locator('#workshops')).toContainText('Learn it with your hands in the soil');
  await expect(page.getByRole('link', { name: 'Explore the Living Library' })).toHaveAttribute('href', '/living-library');

  const form = page.locator('form[data-land-enquiry-form]');
  await expect(form).toBeVisible();
  await expect(form).toHaveAttribute('data-netlify', 'true');
  await expect(form).toHaveAttribute('action', '/work-with-benjy/thank-you');
  await expect(form).toHaveAttribute('data-cloudflare-enquiry-endpoint', '/api/enquiry');
  await expect(page.locator('[data-enquiry-turnstile]')).toHaveCount(1);
  await expect(page.locator('header .brand img')).toHaveAttribute('src', 'assets/brand/awakening-eden-mark-painted-192.webp');
  await expect(page.locator('footer .footer-brand img')).toHaveAttribute('src', 'assets/brand/awakening-eden-mark-painted-192.webp');
});

test('Tree of Life closing, boat memory and starter path are visible', async ({ page }, testInfo) => {
  await page.goto('/');
  const closing = page.locator('.final-blessing');
  await expect(closing.getByRole('heading', { name: /Rooted in Love/ })).toBeVisible();
  await closing.scrollIntoViewIfNeeded();
  await expect.poll(() => closing.locator('.final-blessing__painting').evaluate(img => img.naturalWidth)).toBeGreaterThan(0);
  await expect(closing.locator('.final-blessing__painting')).toHaveAttribute('src', /welcome-home-benjy-sofia-rooted-lotus-v34-1536\.webp/);
  await expect(closing.locator('.final-blessing__lotus')).toHaveCount(0);
  await mkdir('test-results/review', { recursive: true });
  await closing.screenshot({ path: `test-results/review/tree-of-life-closing-${testInfo.project.name}.png` });
  await page.goto('/journey');
  await page.locator('.journey-moments__boat').scrollIntoViewIfNeeded();
  await expect.poll(() => page.locator('.journey-moments__boat img').evaluate(img => img.naturalWidth)).toBeGreaterThan(0);
  await page.goto('/Awakening-Regeneration.html');
  await expect(page.locator('.guide-starter-path__grid article')).toHaveCount(3);
  await expect(page.locator('.guide-starter-path')).toContainText('In preparation');
});

test('Old collaboration route leads to one clear service page', async ({ page }) => {
  const response = await page.goto('/work-with-us', { waitUntil: 'domcontentloaded' });
  expect(response.status()).toBe(200);
  await expect(page).toHaveURL(/\/work-with-benjy\/?$/);
  await expect(page.getByRole('heading', { level: 1, name: 'Bring your project vision to life.' })).toBeVisible();
  await page.goto('/village-homes', { waitUntil: 'domcontentloaded' });
  await expect(page.locator('body')).toContainText('future village');
});

// Count what a visitor can actually see. A stale immutable stylesheet once
// displayed hidden cards, so DOM attributes alone are not enough here.
const renderedLibraryCards = (page) => page.locator('.resource-card').evaluateAll(
  (cards) => cards.filter((card) => getComputedStyle(card).display !== 'none').length
);

test('Living Library search turns a large collection into a calm, useful doorway', async ({ page }) => {
  await page.goto('/living-library', { waitUntil: 'domcontentloaded' });

  const search = page.getByRole('searchbox', { name: 'Search Living Library resources' });
  const status = page.locator('.library-search__status');
  const cards = page.locator('.resource-card');

  await expect(search).toBeVisible();
  await expect(page.getByRole('navigation', { name: 'Popular Living Library pathways' })).toBeVisible();

  const total = await cards.count();
  expect(total).toBeGreaterThan(50);

  await search.fill('Fukuoka');
  await expect(page.getByRole('heading', { level: 3, name: 'The One-Straw Revolution' })).toBeVisible();
  await expect(status).toContainText('Showing');
  await expect(page.locator('.resource-card:not([hidden])')).toHaveCount(1);
  expect(await renderedLibraryCards(page)).toBe(1);

  await search.fill('a-resource-that-does-not-exist-eden');
  await expect(status).toContainText('No direct match yet');
  await expect(page.locator('.resource-card:not([hidden])')).toHaveCount(0);
  expect(await renderedLibraryCards(page)).toBe(0);

  await page.getByRole('link', { name: 'Watch something' }).click();
  await expect(search).toHaveValue('');
  await expect(page.locator('#films')).toBeVisible();

  await search.fill('Fukuoka');
  await search.press('Escape');
  await expect(search).toHaveValue('');
  await expect(status).toContainText(`Browse ${total} curated resources`);
  expect(await renderedLibraryCards(page)).toBe(total);
});

test('Living Library field-guide routes open their intended guide pages', async ({ page }) => {
  const guides = [
    ['/thriving-in-these-times', 'Thriving in These Times'],
    ['/7-first-steps-regenerate-your-land', 'Regenerate Your'],
    ['/abundant-edge-index', 'The Abundant Edge'],
    ['/small-scale-regenerative-farm-playbook', 'Small-Scale Regenerative Farm Playbook']
  ];

  for (const [route, expectedText] of guides) {
    await page.goto(route, { waitUntil: 'domcontentloaded' });
    await expect(page).toHaveURL(new RegExp(`${route}$`, 'i'));
    await expect(page.locator('h1')).toContainText(expectedText);
  }
});

test('future pathways are honest, connected and lightly surfaced', async ({ page }) => {
  await page.goto('/', { waitUntil: 'domcontentloaded' });
  const paths = page.locator('.future-paths');
  await expect(paths.getByRole('link', { name: /Eden Designer/ })).toHaveAttribute('href', '/eden-designer');
  await expect(paths.getByRole('link', { name: /Affordable regenerative village vision/ })).toHaveAttribute('href', '/village-vision');
  await expect(paths.getByRole('link', { name: /Village research garden/ })).toHaveAttribute('href', '/village-research');

  await page.goto('/eden-designer', { waitUntil: 'domcontentloaded' });
  await expect(page.getByText('Prototype pathway · human-reviewed', { exact: true })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Explore the current prototype' })).toHaveAttribute('target', '_blank');
  await expect(page.getByText('Clarity without false certainty.', { exact: true })).toBeVisible();

  await page.goto('/village-vision', { waitUntil: 'domcontentloaded' });
  await expect(page.getByText('Future vision · not yet a physical village', { exact: true })).toBeVisible();
  await expect(page.getByText(/No final village site, legal structure, planning permission/)).toBeVisible();

  await page.goto('/village-research', { waitUntil: 'domcontentloaded' });
  await expect(page.getByText('Research scaffold · growing openly', { exact: true })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Seven shelves before a site or offer.' })).toBeVisible();
});

test('Work with Benjy exposes implementation guidance at its direct anchor', async ({ page }) => {
  await page.goto('/work-with-benjy#implementation', { waitUntil: 'domcontentloaded' });
  const implementation = page.locator('#implementation');
  await expect(implementation.getByRole('heading', { name: 'Bring the plan into life' })).toBeVisible();
  await implementation.locator('summary').click();
  await expect(implementation).toContainText('project management');
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
  await expect(page.locator('header .brand img')).toHaveAttribute('src', 'assets/brand/awakening-eden-mark-painted-192.webp');
  await expect(page.locator('footer .footer-brand img')).toHaveAttribute('src', 'assets/brand/awakening-eden-mark-painted-192.webp');
  await expect(page.getByRole('link', { name: 'WhatsApp Benjy · Explore a Partnership' }).first()).toBeVisible();
  await expect(page.getByRole('link', { name: 'Email Awakening Eden' })).toBeVisible();

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
  { route: '/living-library', name: 'living-library' },
  { route: '/work-with-benjy', name: 'work-with-benjy' },
  { route: '/work-with-us', name: 'work-with-us' },
  { route: '/partners', name: 'partners' },
  { route: '/eden-designer', name: 'eden-designer' },
  { route: '/village-vision', name: 'village-vision' },
  { route: '/village-research', name: 'village-research' }
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
    if (reviewPage.name === 'homepage') {
      await page.locator('.home-circle-header').screenshot({
        path: path.join(reviewDirectory, 'homepage-circle-of-belonging.png')
      });
      await page.locator('.grow-section--oct03').screenshot({
        path: path.join(reviewDirectory, 'homepage-botanical-doors.png')
      });
      await page.locator('.library-doorway').screenshot({
        path: path.join(reviewDirectory, 'homepage-living-library-doorway.png')
      });
    }
    if (reviewPage.name === 'living-library') {
      await page.locator('.library-art-hero').screenshot({
        path: path.join(reviewDirectory, 'living-library-header.png')
      });
    }
    if (reviewPage.name === 'village-vision') {
      await page.locator('.future-hero__art').screenshot({
        path: path.join(reviewDirectory, 'village-vision-artwork.png')
      });
      await page.locator('.village-oct03').screenshot({
        path: path.join(reviewDirectory, 'village-vision-community-roots.png')
      });
    }
  });
}
