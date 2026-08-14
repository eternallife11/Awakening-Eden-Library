import { expect, test } from '@playwright/test';

const turnstileApi = 'https://challenges.cloudflare.com/turnstile/v0/api.js';

test.beforeEach(async ({ page }) => {
  await page.route(`${turnstileApi}*`, async (route) => {
    await route.fulfill({ contentType: 'text/javascript', body: '' });
  });
});

async function fillRequiredFields(page) {
  await page.locator('#enquiry-name').fill('Ada Gardener');
  await page.locator('#enquiry-email').fill('ada@example.test');
  await page.locator('#enquiry-contact').selectOption({ label: 'Email' });
  await page.locator('#enquiry-location').fill('Coimbra, Portugal');
  await page.locator('#enquiry-type').selectOption({ label: 'Home garden' });
  await page.locator('#enquiry-timeframe').selectOption({ label: 'Within 1–3 months' });
  await page.locator('#enquiry-service').selectOption({ label: 'Regenerative clarity session' });
  await page.locator('#enquiry-vision').fill('I would like to restore water, soil life and food abundance in our garden.');
  await page.locator('#enquiry-consent').check();
}

async function addTurnstileToken(page, value = 'test-turnstile-token') {
  await page.locator('form[data-land-enquiry-form]').evaluate((form, token) => {
    const input = document.createElement('input');
    input.type = 'hidden';
    input.name = 'turnstile-token';
    input.value = token;
    form.append(input);
  }, value);
}

test('Cloudflare build adds the scoped Turnstile form path without changing the Netlify fallback', async ({ page }) => {
  await page.goto('/work-with-benjy', { waitUntil: 'domcontentloaded' });

  const form = page.locator('form[data-land-enquiry-form]');
  await expect(form).toHaveAttribute('data-netlify', 'true');
  await expect(form).toHaveAttribute('action', '/project-enquiry-thank-you.html');
  await expect(form).toHaveAttribute('data-cloudflare-enquiry-endpoint', '/api/enquiry');
  await expect(page.locator('[data-enquiry-turnstile]')).toHaveAttribute('data-sitekey', '1x00000000000000000000AA');
  await expect(page.locator('[data-enquiry-turnstile]')).toHaveAttribute('data-action', 'enquiry');
  await expect(page.getByRole('status')).toHaveAttribute('aria-live', 'polite');
  await expect(page.getByRole('status')).toBeHidden();
  await expect(page.locator(`script[src^="${turnstileApi}"]`)).toHaveCount(1);
});

test('a verified client submission redirects only after an API success response', async ({ page }) => {
  let payload;
  await page.route('**/api/enquiry', async (route) => {
    payload = route.request().postDataJSON();
    await route.fulfill({
      contentType: 'application/json',
      status: 202,
      body: JSON.stringify({ ok: true, redirect: '/project-enquiry-thank-you.html' })
    });
  });
  await page.goto('/work-with-benjy', { waitUntil: 'domcontentloaded' });
  await fillRequiredFields(page);
  await addTurnstileToken(page);

  await Promise.all([
    page.waitForURL('**/project-enquiry-thank-you.html'),
    page.getByRole('button', { name: /Send my land story/ }).click()
  ]);

  expect(payload.name).toBe('Ada Gardener');
  expect(payload.email).toBe('ada@example.test');
  expect(payload['turnstile-token']).toBe('test-turnstile-token');
});

test('a delivery failure keeps the entered enquiry and never shows success', async ({ page }) => {
  await page.route('**/api/enquiry', async (route) => {
    await route.fulfill({
      contentType: 'application/json',
      status: 503,
      body: JSON.stringify({
        ok: false,
        code: 'delivery_failed',
        message: 'We could not send your enquiry just now. Please try again or use the direct contact options above.'
      })
    });
  });
  await page.goto('/work-with-benjy', { waitUntil: 'domcontentloaded' });
  await fillRequiredFields(page);
  await addTurnstileToken(page);

  await page.getByRole('button', { name: /Send my land story/ }).click();

  await expect(page.getByRole('status')).toContainText('We could not send your enquiry just now.');
  await expect(page.getByRole('status')).toHaveAttribute('data-status', 'error');
  await expect(page.locator('#enquiry-name')).toHaveValue('Ada Gardener');
  await expect(page.locator('#enquiry-vision')).toHaveValue('I would like to restore water, soil life and food abundance in our garden.');
  await expect(page).toHaveURL(/\/work-with-benjy$/);
});

test('a missing Turnstile token stays on the form and does not call the API', async ({ page }) => {
  let apiCalls = 0;
  await page.route('**/api/enquiry', async (route) => {
    apiCalls += 1;
    await route.abort();
  });
  await page.goto('/work-with-benjy', { waitUntil: 'domcontentloaded' });
  await fillRequiredFields(page);

  await page.getByRole('button', { name: /Send my land story/ }).click();

  await expect(page.getByRole('status')).toContainText('Please complete the verification');
  expect(apiCalls).toBe(0);
});
