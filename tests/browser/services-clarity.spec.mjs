import { expect, test } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.route('https://challenges.cloudflare.com/turnstile/v0/api.js*', route => route.fulfill({ contentType: 'text/javascript', body: '' }));
});

test('former collective service URLs redirect to the single land-services destination', async ({ request }) => {
  for (const url of ['/work-with-us', '/work-with-us/', '/work-with-us.html']) {
    const response = await request.get(url, { maxRedirects: 0 });
    expect(response.status()).toBe(301);
    expect(response.headers().location).toBe('/work-with-benjy');
  }
});

test('homepage doors and navigation provide four distinct destinations', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('.home-hero-doorways .door-card')).toHaveCount(4);
  expect(await page.locator('.home-hero-doorways .door-card').evaluateAll(nodes => nodes.map(n => n.getAttribute('href')))).toEqual(['/living-library', '/work-with-benjy', '/village-homes', '/sofia']);
  await expect(page.locator('.primary-nav a[href="/work-with-us"]')).toHaveCount(0);
  await expect(page.locator('.primary-nav a[href="/work-with-benjy"]')).toHaveText('Land & Gardens');
  const menu = page.locator('[data-menu-button]');
  if (await menu.isVisible()) {
    await menu.click();
    await expect(menu).toHaveAttribute('aria-expanded', 'true');
    await expect(page.locator('.primary-nav a[href="/work-with-benjy"]')).toBeVisible();
    await menu.click();
    await expect(menu).toHaveAttribute('aria-expanded', 'false');
  }
});

test('gallery and budget deep links reveal their content without losing the enquiry', async ({ page }) => {
  await page.goto('/work-with-benjy#inspiration-gallery');
  await expect(page.locator('#inspiration-gallery')).toHaveAttribute('open', '');
  await expect(page.locator('#inspiration-gallery img')).toHaveCount(11);
  await page.evaluate(() => document.querySelectorAll('main img').forEach(img => { img.loading = 'eager'; }));
  await expect.poll(() => page.locator('main img').evaluateAll(images => images.filter(img => !img.complete || !img.naturalWidth).map(img => img.getAttribute('src'))), { timeout: 15000 }).toEqual([]);
  await expect(page.locator('form[data-land-enquiry-form]')).toHaveCount(1);
  await page.goto('/work-with-benjy#benjy-garden-collection');
  await expect(page.locator('#benjy-garden-collection')).toHaveAttribute('open', '');
  await expect(page.getByText('Backyard Eden', { exact: true })).toBeVisible();
});

test('all five service choices reach the existing form with the right service selected', async ({ page }) => {
  await page.goto('/work-with-benjy');
  const choices = page.locator('[data-enquiry-service]');
  await expect(choices).toHaveCount(5);
  for (let i = 0; i < 5; i++) {
    const value = await choices.nth(i).getAttribute('data-enquiry-service');
    await choices.nth(i).click();
    await expect(page.locator('[name="service-interest"]')).toHaveValue(value);
  }
});

test('service pages remain usable with expanded content on desktop and phone', async ({ page }) => {
  for (const route of ['/work-with-benjy', '/village-homes', '/sofia', '/journey', '/living-library', '/']) {
    const errors = [];
    const onError = error => errors.push(error.message);
    page.on('pageerror', onError);
    await page.goto(route, { waitUntil: 'domcontentloaded' });
    await page.evaluate(() => document.querySelectorAll('details').forEach(el => { el.open = true; }));
    const result = await page.evaluate(() => {
      const ids = [...document.querySelectorAll('[id]')].map(n => n.id);
      return { width: document.documentElement.scrollWidth, viewport: innerWidth, duplicates: ids.filter((id, i) => ids.indexOf(id) !== i) };
    });
    expect(result.duplicates, route).toEqual([]);
    expect(result.width, route).toBeLessThanOrEqual(result.viewport + 1);
    expect(errors, route).toEqual([]);
    page.off('pageerror', onError);
  }
});
