import { expect, test } from '@playwright/test';

test('inactive enquiry form keeps its Netlify fallback without loading Turnstile', async ({ page }) => {
  const turnstileRequests = [];
  page.on('request', (request) => {
    if (request.url().includes('challenges.cloudflare.com/turnstile')) {
      turnstileRequests.push(request.url());
    }
  });

  await page.goto('/work-with-benjy', { waitUntil: 'domcontentloaded' });

  const form = page.locator('form[data-land-enquiry-form]');
  await expect(form).toBeHidden();
  await expect(form).toHaveAttribute('data-netlify', 'true');
  await expect(form).toHaveAttribute('action', '/project-enquiry-thank-you.html');
  await expect(form).not.toHaveAttribute('data-cloudflare-enquiry-endpoint', /.+/);
  await expect(page.locator('[data-enquiry-turnstile]')).toHaveCount(0);
  await expect(page.locator('[data-enquiry-status]')).toHaveCount(0);
  await expect(page.locator('script[src*="challenges.cloudflare.com/turnstile"]')).toHaveCount(0);
  await expect(page.locator('script[src="eden-enquiry.js"]')).toHaveCount(0);
  expect(turnstileRequests).toEqual([]);
});
