import { expect, test } from '@playwright/test';

test('Eden Land Questionnaire gives visitors a clear, protected three-step path', async ({ page }) => {
  await page.route('https://challenges.cloudflare.com/turnstile/v0/api.js*', async (route) => {
    await route.fulfill({ contentType: 'text/javascript', body: '' });
  });

  await page.goto('/work-with-benjy', { waitUntil: 'domcontentloaded' });

  const form = page.locator('form[data-land-enquiry-form]');
  await expect(form).toBeVisible();
  await expect(form).toHaveAttribute('data-netlify', 'true');
  await expect(form).toHaveAttribute('action', '/work-with-benjy/thank-you');
  await expect(form).toHaveAttribute('data-cloudflare-enquiry-endpoint', '/api/enquiry');
  await expect(page.locator('[data-enquiry-turnstile]')).toHaveCount(1);
  await expect(page.locator('script[src*="challenges.cloudflare.com/turnstile"]')).toHaveCount(1);
  await expect(page.locator('script[src="eden-enquiry.js"]')).toHaveCount(1);

  await page.getByRole('link', { name: 'Start the €111 Clarity Session' }).click();
  await expect(form.locator('select[name="service-interest"]')).toHaveValue('Land + Project Clarity Session — €111');

  await form.getByLabel('Where is the land?').fill('Coimbra, Portugal');
  await form.getByLabel('What are you caring for?').selectOption({ label: 'Home garden' });
  await form.getByLabel('What feels most important right now?').selectOption({ label: 'Water, drought or erosion' });
  await form.getByRole('button', { name: 'Continue to your vision' }).click();
  await expect(form.getByRole('group', { name: 'Your vision' })).toBeVisible();

  await form.getByLabel('When would you like to begin?').selectOption({ label: 'Within 1–3 months' });
  await form.getByLabel('What would you love this place to become—and what feels challenging right now?').fill('A cool, productive, water-wise garden that supports birds, people and soil life.');
  await form.getByRole('button', { name: 'Almost there' }).click();
  await expect(form.getByRole('group', { name: 'How should Benjy reach you?' })).toBeVisible();
  await expect(form.getByRole('button', { name: 'Send my land story' })).toBeVisible();

  const duplicateIds = await page.evaluate(() => Array.from(document.querySelectorAll('[id]'))
    .map((element) => element.id)
    .filter((id, index, ids) => ids.indexOf(id) !== index));
  expect(duplicateIds).toEqual([]);
});

test('land-story thank-you page gives the free guide before any invitation to give back', async ({ page }) => {
  await page.goto('/work-with-benjy/thank-you', { waitUntil: 'domcontentloaded' });

  await expect(page.getByRole('heading', { level: 1, name: 'Your land story has reached us.' })).toBeVisible();
  await expect(page.getByRole('heading', { level: 2, name: 'Awakening Regeneration Guide' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Download the free guide' })).toHaveAttribute('href', '/Awakening-Regeneration-Guide.pdf');
  await expect(page.getByRole('link', { name: 'Give back in your own way' })).toHaveAttribute('href', '/#gift-back');
  await expect(page.getByRole('link', { name: 'Share a field note or request →' })).toHaveAttribute('href', /^mailto:regenerativeeden@gmail\.com/);

  const layout = await page.evaluate(() => ({
    viewportWidth: window.innerWidth,
    documentWidth: document.documentElement.scrollWidth,
    bodyWidth: document.body.scrollWidth
  }));
  expect(layout.documentWidth).toBeLessThanOrEqual(layout.viewportWidth + 1);
  expect(layout.bodyWidth).toBeLessThanOrEqual(layout.viewportWidth + 1);
});
