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
  const player=header;
  await expect(header).toHaveAttribute('aria-pressed','false');
  expect(await page.evaluate(()=>window.edenAudio.contexts.length)).toBe(0);
  await header.click();
  await expect(header).toHaveAttribute('aria-pressed','true');
  await expect(player).toHaveAttribute('aria-pressed','true');
  await expect.poll(()=>page.evaluate(()=>window.edenAudio.voices.some(voice=>voice.frequency.value === 432))).toBe(true);
  await page.locator('.harmonics-card > summary').click();
  await page.locator('.harmonics-mix summary').click();
  for (const choice of ['rain', 'ocean', 'forest', 'off']) {
    await page.locator('#harmonics-nature').selectOption(choice);
    await expect(page.locator('[data-harmonics-status]')).toContainText(choice === 'off' ? 'Nature off' : choice === 'forest' ? 'Tropical birds & kookaburra' : choice === 'rain' ? 'Gentle rain' : 'Ocean waves');
  }
  await page.locator('#harmonics-nature-volume').fill('20');
  await page.locator('#harmonics-instruments').uncheck();
  await page.locator('#harmonics-frequency').selectOption('528');
  await page.locator('#harmonics-instruments').check();
  await expect.poll(()=>page.evaluate(()=>window.edenAudio.voices.some(voice=>voice.frequency.value === 528))).toBe(true);
  await expect(page.locator('[data-harmonics-status]')).toContainText('528 Hz');
  await page.locator('#harmonics-instruments').uncheck();
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
  await page.locator('.harmonics-card > summary').click();
  await page.locator('.harmonics-mix summary').click();
  expect(await page.evaluate(()=>window.edenAudio.contexts.length)).toBe(0);
  const layout=await page.evaluate(()=>({width:innerWidth,page:document.documentElement.scrollWidth}));
  expect(layout.page).toBeLessThanOrEqual(layout.width+1);
  expect(errors).toEqual([]);
  await mkdir('test-results/review', {recursive:true});
  await page.locator('.harmonics-card').screenshot({path:`test-results/review/harmonics-${testInfo.project.name}.png`});
  await page.locator('header').screenshot({path:`test-results/review/harmonics-header-${testInfo.project.name}.png`});
});

test('bowl notes have the selected fundamental and instruments-off leaves no continuous tone', async ({page}) => {
  await page.addInitScript(() => {
    localStorage.setItem('eden-harmonics-nature', 'off');
    // "Pure tones" plays only the synthesized bowl, so its exact fundamental can be measured.
    localStorage.setItem('eden-harmonics-mood', 'pure');
    localStorage.setItem('eden-harmonics-instruments', 'on');
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
  const player=page.locator('header [data-harmonics-toggle]');
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
  // A softly struck note is present, without a sustained drone underneath it.
  await expect.poll(async () => (await peak()).db).toBeGreaterThan(-85);
  await page.locator('.harmonics-card > summary').click();
  await page.locator('.harmonics-mix summary').click();
  await page.locator('#harmonics-frequency').selectOption('528');
  await expect.poll(async () => Math.abs((await peak()).hz-528)).toBeLessThan(2);
  await page.locator('#harmonics-instruments').uncheck();
  await expect.poll(async () => (await peak()).db).toBeLessThan(-90);
  await player.click();
  await expect.poll(()=>page.evaluate(()=>window.edenSignal.context.state)).toBe('suspended');
  expect(await page.evaluate(()=>window.edenSignal.master.gain.value)).toBeLessThan(0.002);
});

test('soundscapes load real CC0 recordings, retune them to the chosen tuning and credit every source', async ({page}) => {
  await page.addInitScript(() => {
    localStorage.setItem('eden-harmonics-nature', 'dawn');
    localStorage.setItem('eden-harmonics-mood', 'heart');
    localStorage.setItem('eden-harmonics-frequency', '432');
    localStorage.setItem('eden-harmonics-instruments', 'on');
    const Original = window.AudioContext;
    window.edenRates = [];
    window.AudioContext = class extends Original {
      createBufferSource() {
        const source = super.createBufferSource();
        const start = source.start.bind(source);
        source.start = (...args) => { window.edenRates.push({ seconds: source.buffer?.duration ?? 0, rate: source.playbackRate.value }); return start(...args); };
        return source;
      }
    };
  });
  const loaded = [];
  page.on('response', response => { if (response.url().includes('/assets/audio/lemuria/') && response.ok()) loaded.push(response.url().split('/').pop()); });
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  await page.goto('/');
  // Nothing is fetched before the visitor presses Play.
  expect(loaded).toEqual([]);
  await page.locator('header [data-harmonics-toggle]').click();
  await expect(page.locator('[data-harmonics-status]')).toContainText('Empowering heart · 432 Hz · Rainforest dawn chorus & kookaburras');
  await expect.poll(() => loaded.sort()).toEqual(expect.arrayContaining(['dawn-chorus-kookaburras-maccavictoria.mp3', 'singing-bowl-ryancacophony.mp3', 'handpan-melody-soundguy103.mp3', 'violin-note-poppy-crum.mp3']));
  // The sung bowl (measured A = 449.4 Hz) is retuned to A = 432 Hz.
  await expect.poll(() => page.evaluate(() => window.edenRates.some(({ seconds, rate }) => seconds > 30 && seconds < 45 && Math.abs(rate - 432 / 449.4) < 0.002))).toBe(true);
  await page.locator('.harmonics-card > summary').click();
  await page.locator('.harmonics-mix summary').click();
  for (const [value, name] of [['rainforest', 'Rainforest dawn'], ['sunrise', 'Hopeful sunrise'], ['newearth', 'New Earth'], ['pure', 'Pure tones']]) {
    await page.locator('#harmonics-mood').selectOption(value);
    await expect(page.locator('[data-harmonics-status]')).toContainText(name);
  }
  for (const creator of ['dubminister', 'soundofsong', 'maccavictoria', 'EvilDavo', 'ryancacophony', 'RedwoodRunner', 'soundguy103', 'Kinoton', 'SamuelGremaud', 'batchku']) {
    await expect(page.locator('.harmonics-mix a[href*="freesound.org/people/"]').filter({ hasText: creator })).toHaveCount(1);
  }
  expect(errors).toEqual([]);
});

test('sound gracefully offers Spotify when Web Audio is unavailable', async ({page}) => {
  await page.addInitScript(()=>{window.AudioContext=undefined;window.webkitAudioContext=undefined;});
  await page.goto('/');
  for(const button of await page.locator('[data-harmonics-toggle]').all()) await expect(button).toBeDisabled();
  await expect(page.locator('[data-harmonics-status]')).toContainText('Spotify playlist is still here');
});
