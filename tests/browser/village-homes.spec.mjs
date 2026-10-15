import { test, expect } from '@playwright/test';
import { mkdir } from 'node:fs/promises';

test('Village Homes offers clear options and connected services on every screen', async ({ page }, testInfo) => {
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  const response = await page.goto('/village-homes');
  expect(response.status()).toBe(200);
  await expect(page.getByRole('heading', {level:1})).toHaveText('Beautiful homes.Living landscapes.');
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
