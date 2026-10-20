import { test, expect } from '@playwright/test';
import { mkdir } from 'node:fs/promises';

test('harmonics play, pause, volume and remembered quiet remain under visitor control', async ({page}, testInfo) => {
  await page.addInitScript(() => {
    localStorage.setItem('eden-harmonics-enabled', 'off');
    const Original = window.AudioContext;
    window.edenAudio = {contexts:[],voices:[]};
    window.AudioContext = class extends Original {
      constructor(...args) { super(...args); window.edenAudio.contexts.push(this); }
      createOscillator() { const voice=super.createOscillator(); window.edenAudio.voices.push(voice); return voice; }
    };
  });
  const errors=[];
  page.on('pageerror', error=>errors.push(error.message));
  await page.goto('/');
  const header=page.locator('header [data-harmonics-toggle]');
  const player=page.locator('.harmonics-card [data-harmonics-toggle]');
  await expect(header).toHaveAttribute('aria-pressed','false');
  expect(await page.evaluate(()=>window.edenAudio.contexts.length)).toBe(0);
  await header.click();
  await expect(header).toHaveAttribute('aria-pressed','true');
  await expect(player).toHaveAttribute('aria-pressed','true');
  expect(await page.evaluate(()=>window.edenAudio.voices.map(voice=>voice.frequency.value))).toEqual([432,528,216,264]);
  expect(await page.evaluate(()=>localStorage.getItem('eden-harmonics-enabled'))).toBe('on');
  await page.locator('#harmonics-volume').fill('12');
  expect(await page.evaluate(()=>localStorage.getItem('eden-harmonics-volume'))).toBe('12');
  await player.click();
  await expect(header).toHaveAttribute('aria-pressed','false');
  await expect.poll(()=>page.evaluate(()=>window.edenAudio.contexts[0].state)).toBe('suspended');
  await player.click();
  await expect(header).toHaveAttribute('aria-pressed','true');
  await page.locator('.hero-soundtrack').click();
  await expect(player).toHaveAttribute('aria-pressed','false');
  await page.reload();
  await expect(header).toHaveAttribute('aria-pressed','false');
  await expect(page.locator('#harmonics-volume')).toHaveValue('12');
  expect(await page.evaluate(()=>window.edenAudio.contexts.length)).toBe(0);
  const layout=await page.evaluate(()=>({width:innerWidth,page:document.documentElement.scrollWidth}));
  expect(layout.page).toBeLessThanOrEqual(layout.width+1);
  expect(errors).toEqual([]);
  await mkdir('test-results/review', {recursive:true});
  await page.locator('.harmonics-card').screenshot({path:`test-results/review/harmonics-${testInfo.project.name}.png`});
  await page.locator('header').screenshot({path:`test-results/review/harmonics-header-${testInfo.project.name}.png`});
});

test('sound gracefully offers Spotify when Web Audio is unavailable', async ({page}) => {
  await page.addInitScript(()=>{window.AudioContext=undefined;window.webkitAudioContext=undefined;});
  await page.goto('/');
  for(const button of await page.locator('[data-harmonics-toggle]').all()) await expect(button).toBeDisabled();
  await expect(page.locator('[data-harmonics-status]')).toContainText('Spotify playlist is still here');
});
