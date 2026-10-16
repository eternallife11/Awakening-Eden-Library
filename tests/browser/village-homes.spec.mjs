import { test, expect } from '@playwright/test';
import { mkdir } from 'node:fs/promises';

test('Whole-property zoning is readable, uncropped and connected across service pages', async ({ page }, testInfo) => {
  await mkdir('test-results/zoning', {recursive:true});
  for (const route of ['/village-homes', '/work-with-us', '/eden-designer']) {
    const response = await page.goto(route);
    expect(response.status()).toBe(200);
    const art = page.locator('.zone-art-link');
    await art.scrollIntoViewIfNeeded();
    const image = art.locator('img');
    await expect.poll(() => image.evaluate(img => img.complete && img.naturalWidth > 0)).toBe(true);
    await expect(art).toHaveAttribute('href', /zones-v2\.png$/);
    await expect(image).toHaveAttribute('src', /zones-v2\.webp$/);
    const metrics = await image.evaluate(img => ({width:img.clientWidth,height:img.clientHeight,ratio:img.naturalWidth/img.naturalHeight}));
    expect(Math.abs(metrics.width / metrics.height - metrics.ratio)).toBeLessThan(.02);
    const caption = page.locator('.zone-caption');
    expect(await caption.evaluate(el => parseFloat(getComputedStyle(el).fontSize))).toBeGreaterThanOrEqual(16);
    await expect(caption.locator('a')).toHaveAttribute('href', /#permaculture-zones$/);
    const asset = await page.request.get(await art.getAttribute('href'));
    expect(asset.status()).toBe(200);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1)).toBe(true);
    await art.locator('..').screenshot({path:`test-results/zoning/${route.slice(1)}-${testInfo.project.name}.png`});
    if (route === '/village-homes') {
      await expect(page.locator('.zone-reading__grid article')).toHaveCount(6);
      await expect(page.locator('.zone-reading__note')).toContainText('A market garden worked every day may belong in Zone 1');
      await page.locator('#permaculture-zones').screenshot({path:`test-results/zoning/guide-${testInfo.project.name}.png`});
    }
  }
});

test('Village Homes offers clear options and connected services on every screen', async ({ page }, testInfo) => {
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  const response = await page.goto('/village-homes');
  expect(response.status()).toBe(200);
  await expect(page.getByRole('heading', {level:1})).toHaveText('From a simple natural home to a thriving village.');
  await expect(page.getByText('Awakening Eden Village Homes & Services', {exact:true})).toBeVisible();
  await expect(page.locator('.homes-option')).toHaveCount(4);
  await expect(page.getByRole('link', {name:'WhatsApp us your home vision'})).toHaveAttribute('href', /wa.me\/351920067347/);
  await expect(page.getByRole('link', {name:'Email Benjy & Sofia'})).toHaveAttribute('href', /^mailto:holisticmission8@gmail.com/);
  const localLinks = await page.locator('main a[href^="/"]').evaluateAll(links => links.map(link => link.getAttribute('href')));
  for (const target of new Set(localLinks)) {
    const [route, fragment] = target.split('#');
    const linked = await page.request.get(route);
    expect(linked.status(), target).toBe(200);
    if (fragment) expect(await linked.text(), target).toContain(`id="${fragment}"`);
  }
  for (const img of await page.locator('main img').all()) {
    await img.scrollIntoViewIfNeeded();
    await expect.poll(() => img.evaluate(image => image.complete && image.naturalWidth > 0)).toBe(true);
  }
  const layout = await page.evaluate(() => ({page:document.documentElement.scrollWidth,viewport:innerWidth}));
  expect(layout.page).toBeLessThanOrEqual(layout.viewport + 1);
  expect(errors).toEqual([]);
  await page.locator('body').press('ControlOrMeta+Home');
  await mkdir('test-results/village-homes', {recursive:true});
  await page.screenshot({path:`test-results/village-homes/${testInfo.project.name}.png`,fullPage:true});
  await page.goto('/work-with-us');
  await expect(page.getByRole('link', {name:'Explore Village Homes + services'})).toHaveAttribute('href','/village-homes');
});
