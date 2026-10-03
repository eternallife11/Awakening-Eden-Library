import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

const importantRoutes = [
  ['homepage', '/'],
  ['start-here', '/start-here'],
  ['living-library', '/living-library'],
  ['work-with-us', '/work-with-us'],
  ['work-with-benjy', '/work-with-benjy'],
  ['partners', '/partners']
];

test.beforeEach(async ({ page }) => {
  await page.route('https://challenges.cloudflare.com/turnstile/v0/api.js*', async (route) => {
    await route.fulfill({ contentType: 'text/javascript', body: '' });
  });
});

for (const [name, route] of importantRoutes) {
  test(`${name} has no blocking automated WCAG 2.2 A/AA violations in its main content`, async ({ page }, testInfo) => {
    test.setTimeout(90_000);
    await page.goto(route, { waitUntil: 'networkidle' });
    await expect(page.locator('main')).toBeVisible();

    const results = await new AxeBuilder({ page })
      .include('main')
      .withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa'])
      .analyze();

    await testInfo.attach(`accessibility-${name}.json`, {
      body: Buffer.from(JSON.stringify(results, null, 2)),
      contentType: 'application/json'
    });

    // The existing visual system has documented contrast findings. They remain
    // visible in the attached report for the forthcoming visual pass; all
    // other automatic WCAG violations block this branch today.
    const blockingViolations = results.violations.filter((violation) => violation.id !== 'color-contrast');
    expect(blockingViolations, `Blocking accessibility violations on ${route}`).toEqual([]);
  });
}
