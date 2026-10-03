import { expect, test } from '@playwright/test';

const routes = ['/', '/start-here', '/living-library', '/work-with-us', '/work-with-benjy', '/partners'];

test.beforeEach(async ({ page }) => {
  await page.route('https://challenges.cloudflare.com/turnstile/v0/api.js*', async (route) => {
    await route.fulfill({ contentType: 'text/javascript', body: '' });
  });
});

for (const route of routes) {
  test(`${route} has a usable layout`, async ({ page }) => {
    const browserErrors = [];
    page.on('pageerror', (error) => browserErrors.push(error.message));

    const response = await page.goto(route, { waitUntil: 'domcontentloaded' });
    expect(response, `No navigation response for ${route}`).not.toBeNull();
    expect(response.status(), `Unexpected status for ${route}`).toBe(200);
    await expect(page.locator('main')).toBeVisible();
    await expect(page.locator('h1').first()).toBeVisible();

    const layout = await page.evaluate(() => {
      const initialScrollX = window.scrollX;
      window.scrollTo({ left: Number.MAX_SAFE_INTEGER, top: window.scrollY, behavior: 'instant' });
      const horizontalScrollX = window.scrollX;
      window.scrollTo({ left: initialScrollX, top: window.scrollY, behavior: 'instant' });
      return { horizontalScrollX };
    });
    expect(layout.horizontalScrollX, `Horizontal scrolling is available on ${route}`).toBeLessThanOrEqual(1);
    expect(browserErrors, `Browser errors on ${route}`).toEqual([]);
  });
}
