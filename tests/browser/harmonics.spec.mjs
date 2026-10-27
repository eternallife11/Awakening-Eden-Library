import { test, expect } from '@playwright/test';
import { mkdir } from 'node:fs/promises';

test('harmonics play, pause, volume and remembered quiet remain under visitor control', async ({page}, testInfo) => {
  await page.addInitScript(() => {
    localStorage.setItem('eden-harmonics-enabled', 'on');
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
  await expect.poll(()=>page.evaluate(()=>window.edenAudio.voices.slice(0,2).map(voice=>voice.frequency.value))).toEqual([432,216]);
  await page.locator('.harmonics-mix summary').click();
  for (const choice of ['rain', 'ocean', 'forest', 'off']) {
    await page.locator('#harmonics-nature').selectOption(choice);
    await expect(page.locator('[data-harmonics-status]')).toContainText(choice === 'off' ? 'Nature off' : choice === 'forest' ? 'Rainforest' : choice === 'rain' ? 'Gentle rain' : 'Ocean waves');
  }
  await page.locator('#harmonics-nature-volume').fill('20');
  await page.locator('#harmonics-instruments').uncheck();
  await page.locator('#harmonics-frequency').selectOption('528');
  await expect.poll(()=>page.evaluate(()=>window.edenAudio.voices[0].frequency.value)).toBeCloseTo(528, 2);
  await expect(page.locator('[data-harmonics-status]')).toContainText('528 Hz');
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
  await expect(page.locator('#harmonics-frequency')).toHaveValue('528');
  await expect(page.locator('#harmonics-nature')).toHaveValue('off');
  await expect(page.locator('#harmonics-nature-volume')).toHaveValue('20');
  await expect(page.locator('#harmonics-instruments')).not.toBeChecked();
  await page.locator('.harmonics-mix summary').click();
  expect(await page.evaluate(()=>window.edenAudio.contexts.length)).toBe(0);
  const layout=await page.evaluate(()=>({width:innerWidth,page:document.documentElement.scrollWidth}));
  expect(layout.page).toBeLessThanOrEqual(layout.width+1);
  expect(errors).toEqual([]);
  await mkdir('test-results/review', {recursive:true});
  await page.locator('.harmonics-card').screenshot({path:`test-results/review/harmonics-${testInfo.project.name}.png`});
  await page.locator('header').screenshot({path:`test-results/review/harmonics-header-${testInfo.project.name}.png`});
});

test('rendered sound has the selected frequency and becomes silent when paused', async ({page}) => {
  await page.addInitScript(() => {
    localStorage.setItem('eden-harmonics-nature', 'off');
    localStorage.setItem('eden-harmonics-instruments', 'off');
    localStorage.setItem('eden-harmonics-frequency', '432');
    const Original = window.AudioContext;
    window.edenSignal = {};
    window.AudioContext = class extends Original {
      createGain() {
        const node = super.createGain();
        if (!window.edenSignal.master) {
          window.edenSignal.master = node;
          const analyser = this.createAnalyser();
          analyser.fftSize = 32768;
          analyser.smoothingTimeConstant = 0;
          node.connect(analyser);
          window.edenSignal.analyser = analyser;
          window.edenSignal.context = this;
        }
        return node;
      }
    };
  });
  await page.goto('/');
  const player=page.locator('.harmonics-card [data-harmonics-toggle]');
  await player.click();
  await expect(player).toHaveAttribute('aria-pressed','true');
  const peak = () => page.evaluate(() => {
    const {analyser,context} = window.edenSignal;
    const bins = new Float32Array(analyser.frequencyBinCount);
    analyser.getFloatFrequencyData(bins);
    let best = 1;
    for (let i=2;i<bins.length;i++) if (bins[i]>bins[best]) best=i;
    return { hz:best*context.sampleRate/analyser.fftSize, db:bins[best] };
  });
  await expect.poll(async () => Math.abs((await peak()).hz-432)).toBeLessThan(2);
  await expect.poll(async () => (await peak()).db).toBeGreaterThan(-65);
  await page.locator('.harmonics-mix summary').click();
  await page.locator('#harmonics-frequency').selectOption('528');
  await expect.poll(async () => Math.abs((await peak()).hz-528)).toBeLessThan(2);
  await player.click();
  await expect.poll(()=>page.evaluate(()=>window.edenSignal.context.state)).toBe('suspended');
  expect(await page.evaluate(()=>window.edenSignal.master.gain.value)).toBeLessThan(0.002);
});

test('sound gracefully offers Spotify when Web Audio is unavailable', async ({page}) => {
  await page.addInitScript(()=>{window.AudioContext=undefined;window.webkitAudioContext=undefined;});
  await page.goto('/');
  for(const button of await page.locator('[data-harmonics-toggle]').all()) await expect(button).toBeDisabled();
  await expect(page.locator('[data-harmonics-status]')).toContainText('Spotify playlist is still here');
});
