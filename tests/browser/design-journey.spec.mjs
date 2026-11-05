import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test('design journeys load once, enlarge and lead to the existing enquiry', async ({ page }, testInfo) => {
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  await page.goto('/work-with-benjy#design-journey');
  const section = page.locator('#design-journey');
  await expect(section.getByRole('heading', {name: 'How a design takes shape.'})).toBeVisible();
  await expect(section.getByText('Fiona’s Oasis · near Pedrógão Grande')).toBeVisible();
  await section.getByText('Explore the water strategy & orchard detail', {exact: true}).click();
  await section.getByText('Follow the design story', {exact: true}).click();
  await expect(section.getByText('This is an initial concept.', {exact: false})).toBeVisible();
  const images = section.locator('img');
  await expect(images).toHaveCount(4);
  for (const img of await images.all()) {
    await expect.poll(() => img.evaluate(node => node.complete && node.naturalWidth > 0)).toBe(true);
  }
  const sources = await images.evaluateAll(nodes => nodes.map(node => node.src));
  expect(new Set(sources).size).toBe(sources.length);
  await section.getByText('Explore the water strategy & orchard detail', {exact: true}).click();
  await section.screenshot({path: testInfo.outputPath('design-journeys.png')});
  const withheld = await page.request.get('/assets/work-with-benjy/design-journeys/fionas-oasis-journey-overview.webp');
  expect(withheld.status()).toBe(404);
  for (const link of await section.locator('figure a').all()) {
    const response = await page.request.get(await link.getAttribute('href'));
    expect(response.status()).toBe(200);
    expect(response.headers()['content-type']).toContain('image/webp');
  }
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1)).toBe(true);
  const accessibility = await new AxeBuilder({page}).include('#design-journey').analyze();
  expect(accessibility.violations).toEqual([]);
  await section.getByRole('link', {name: 'Explore a regenerative concept for your land'}).click();
  await expect(page).toHaveURL(/#land-vision$/);
  await expect(page.locator('#land-vision-title')).toBeVisible();
  expect(errors).toEqual([]);
});
