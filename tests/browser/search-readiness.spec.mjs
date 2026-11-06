import { test, expect } from '@playwright/test';

const routes = ['/', '/work-with-benjy', '/sofia', '/start-here', '/living-library', '/journey', '/about', '/partners', '/village-homes', '/village-vision', '/village-research', '/regenerate-together', '/events'];
test('search entry pages have distinct metadata, canonical URLs and valid structured data', async ({ request }) => {
  const titles = new Set();
  for (const route of routes) {
    const response = await request.get(route);
    expect(response.status(), route).toBe(200);
    const html = await response.text();
    const title = html.match(/<title>([\s\S]*?)<\/title>/i)?.[1];
    expect(title, route).toBeTruthy();
    expect(titles.has(title), `duplicate title: ${route}`).toBe(false);
    titles.add(title);
    const canonicalTag = [...html.matchAll(/<link\b[^>]*>/gi)].find(m => /rel=["']canonical["']/i.test(m[0]))?.[0];
    const canonical = canonicalTag?.match(/href=["']([^"']+)/i)?.[1];
    expect(canonical, route).toBe(`https://awakeningeden.org${route}`);
    expect([...html.matchAll(/<h1\b/gi)].length, route).toBe(1);
    const metas = [...html.matchAll(/<meta\b[^>]*>/gi)].map(match => match[0]);
    expect(metas.some(tag => /name=["']description["']/i.test(tag) && /content=["'][^"']{60,}/i.test(tag)), route).toBe(true);
    expect(metas.filter(tag => /name=["']robots["']/i.test(tag)).every(tag => !/noindex/i.test(tag)), route).toBe(true);
    const scripts = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)];
    expect(scripts.length, route).toBeGreaterThan(0);
    for (const script of scripts) {
      const data = JSON.parse(script[1]);
      expect(data['@context']).toBe('https://schema.org');
      expect(data['@graph'] || data['@type']).toBeTruthy();
    }
  }
});

test('homepage deep links reveal the right content after deferred rendering', async ({ page }) => {
  for (const [fragment, heading] of [['what-to-grow', 'Choose the doorway that calls you.'], ['mission', 'Regenerate Together.'], ['community', 'Walk Beside Us'], ['library', 'The Living Library']]) {
    await page.goto(`/#${fragment}`);
    const section = page.locator(`#${fragment}`);
    await expect(section).toBeInViewport();
    // Community intentionally opens with its large workshop photograph.
    const title = section.getByRole('heading', {name: heading, exact: true});
    if (fragment === 'community') await expect(title).toBeVisible();
    else await expect(title).toBeInViewport();
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1)).toBe(true);
  }
});

test('wellbeing enquiries clearly explain practices and availability', async ({ page }) => {
  await page.goto('/sofia#holistic-wellbeing');
  await expect(page.getByRole('heading', {name: 'Holistic wellbeing, one gentle step at a time.'})).toBeVisible();
  await expect(page.getByText('Online and Portugal-based enquiries are welcome;', {exact: false})).toBeVisible();
  await expect(page.getByRole('link', {name: 'ask Sofia about a personal practice'})).toHaveAttribute('href', /^mailto:/);
});

test('homepage fonts and their redistribution licences are local public assets', async ({ request }) => {
  const html = await (await request.get('/')).text();
  expect(html).not.toContain('fonts.googleapis.com');
  expect(html).not.toContain('fonts.gstatic.com');
  const bundle = html.match(/href="(eden-home-bundle-[a-f0-9]+\.css)"/)?.[1];
  expect(bundle).toBeTruthy();
  const css = await (await request.get('/' + bundle)).text();
  const fonts = [...new Set([...css.matchAll(/url\((assets\/fonts\/[^)]+\.woff2)\)/g)].map(m => m[1]))];
  expect(fonts.length).toBe(8);
  for (const path of fonts) {
    const response = await request.get('/' + path);
    expect(response.status(), path).toBe(200);
    expect((await response.body()).subarray(0, 4).toString()).toBe('wOF2');
  }
  for (const family of ['caveat', 'cormorantgaramond', 'sourcesans3']) {
    const response = await request.get(`/assets/fonts/${family}-OFL.txt`);
    expect(response.status()).toBe(200);
    expect(await response.text()).toContain('SIL OPEN FONT LICENSE');
  }
});
