(() => {
  'use strict';
  const buttons = [...document.querySelectorAll('[data-harmonics-toggle]')];
  const status = document.querySelector('[data-harmonics-status]');
  const volume = document.querySelector('#harmonics-volume');
  const frequency = document.querySelector('#harmonics-frequency');
  const nature = document.querySelector('#harmonics-nature');
  const natureVolume = document.querySelector('#harmonics-nature-volume');
  const instruments = document.querySelector('#harmonics-instruments');
  const AudioEngine = window.AudioContext || window.webkitAudioContext;
  if (!buttons.length || !status || !volume) return;

  const read = key => { try { return localStorage.getItem(key); } catch { return null; } };
  const save = (key, value) => { try { localStorage.setItem(key, value); } catch { /* Preferences are optional. */ } };
  function restore(control, key, allowed) {
    if (!control) return;
    const value = read(key);
    if (value === null) return;
    if (control.type === 'checkbox') control.checked = value === 'on';
    else if (allowed?.includes(value)) control.value = value;
    else if (!allowed && value.trim() !== '' && Number.isFinite(Number(value))) {
      control.value = String(Math.max(Number(control.min), Math.min(Number(control.max), Number(value))));
    }
  }
  restore(volume, 'eden-harmonics-volume');
  restore(frequency, 'eden-harmonics-frequency', ['432', '528']);
  restore(nature, 'eden-harmonics-nature', ['forest', 'rain', 'ocean', 'off']);
  restore(natureVolume, 'eden-harmonics-nature-volume');
  restore(instruments, 'eden-harmonics-instruments');

  let context, master, instrumentBus, noiseBuffer;
  let toneRoot = 0;
  const droneVoices = [];
  const natureBuses = {};
  const transientVoices = new Set();
  let wanted = false;
  let requestId = 0;
  let pauseTimer, scheduler;
  let nextBowl = 0, nextChime = 0, nextBird = 0;
  const root = () => Number(frequency?.value || 432);
  const scene = () => nature?.value || 'off';
  const instrumentsOn = () => instruments?.checked ?? false;
  const sceneNames = { forest: 'Rainforest', rain: 'Gentle rain', ocean: 'Ocean waves', off: 'Nature off' };

  function update(message) {
    const playing = Boolean(wanted && context?.state === 'running');
    document.body.classList.toggle('harmonics-playing', playing);
    buttons.forEach(button => {
      button.setAttribute('aria-pressed', String(playing));
      button.setAttribute('aria-label', `${playing ? 'Pause' : 'Play'} Lemuria Harmonics`);
      const icon = button.querySelector('[data-harmonics-icon]');
      if (icon) icon.textContent = playing ? 'Ⅱ' : '▶';
      const label = button.querySelector('[data-harmonics-label]');
      if (label) label.textContent = playing ? 'Pause soundscape' : 'Play soundscape';
    });
    status.textContent = message || (playing
      ? `Playing · ${root()} Hz · ${sceneNames[scene()]}${instrumentsOn() ? ' · bowls & chimes' : ''}`
      : 'Sound paused · press Play whenever you like.');
  }
  function gain(value, destination) {
    const node = context.createGain();
    node.gain.value = value;
    node.connect(destination);
    return node;
  }
  function fade(node, value, seconds = 0.6) {
    node.gain.cancelScheduledValues(context.currentTime);
    node.gain.setTargetAtTime(value, context.currentTime, seconds);
  }

  // Original stereo filtered noise: sound-designed environments, not field
  // recordings. No audio downloads or third-party streams are required.
  function makeNoise() {
    const buffer = context.createBuffer(2, context.sampleRate * 12, context.sampleRate);
    for (let channel = 0; channel < buffer.numberOfChannels; channel++) {
      const data = buffer.getChannelData(channel);
      let slow = 0;
      for (let i = 0; i < data.length; i++) {
        const white = Math.random() * 2 - 1;
        slow = 0.985 * slow + 0.015 * white;
        data[i] = white * 0.28 + slow * 2.2;
      }
    }
    return buffer;
  }
  function noiseLayer(destination, type, cutoff, level, rate, depth) {
    const source = context.createBufferSource();
    source.buffer = noiseBuffer;
    source.loop = true;
    const filter = context.createBiquadFilter();
    filter.type = type;
    filter.frequency.value = cutoff;
    filter.Q.value = 0.45;
    const envelope = gain(level, destination);
    source.connect(filter).connect(envelope);
    source.start(0, Math.random() * noiseBuffer.duration);
    const swell = context.createOscillator();
    swell.frequency.value = rate;
    const amount = context.createGain();
    amount.gain.value = depth;
    swell.connect(amount).connect(envelope.gain);
    swell.start();
  }
  function applyMix() {
    if (!context) return;
    const natureLevel = Number(natureVolume?.value ?? 35) / 100;
    for (const [name, bus] of Object.entries(natureBuses)) fade(bus, scene() === name ? natureLevel : 0);
    fade(instrumentBus, instrumentsOn() ? 0.65 : 0, 0.3);
    if (toneRoot !== root()) {
      toneRoot = root();
      droneVoices.forEach((voice, i) => {
        voice.frequency.cancelScheduledValues(context.currentTime);
        voice.frequency.setTargetAtTime(toneRoot / (i === 0 ? 1 : 2), context.currentTime, 0.15);
      });
    }
  }
  function prepare() {
    if (context) return;
    context = new AudioEngine();
    master = gain(0, context.destination);
    instrumentBus = gain(0, master);
    toneRoot = root();
    // Unmodulated sine oscillators: exactly 432 or 528 Hz, with one quiet
    // octave below. This is not a pitch-shifted music track.
    [0.115, 0.07].forEach((level, i) => {
      const oscillator = context.createOscillator();
      oscillator.type = 'sine';
      oscillator.frequency.setValueAtTime(toneRoot / (i === 0 ? 1 : 2), context.currentTime);
      oscillator.connect(gain(level, master));
      oscillator.start();
      droneVoices.push(oscillator);
    });
    noiseBuffer = makeNoise();
    for (const name of ['forest', 'rain', 'ocean']) natureBuses[name] = gain(0, master);
    noiseLayer(natureBuses.forest, 'lowpass', 1400, 0.40, 0.065, 0.08);
    noiseLayer(natureBuses.forest, 'bandpass', 4300, 0.08, 0.12, 0.02);
    noiseLayer(natureBuses.rain, 'lowpass', 7600, 0.68, 0.07, 0.06);
    noiseLayer(natureBuses.rain, 'bandpass', 1500, 0.17, 0.11, 0.035);
    noiseLayer(natureBuses.ocean, 'lowpass', 1700, 0.43, 0.082, 0.34);
    noiseLayer(natureBuses.ocean, 'bandpass', 3100, 0.10, 0.083, 0.085);
    applyMix();
    context.addEventListener('statechange', () => {
      if (context.state === 'running' && wanted) {
        fade(master, Number(volume.value) / 100, 0.7);
        startScheduler();
      } else stopScheduler();
      update();
    });
  }
  function voice(hertz, start, duration, level, destination, pan = 0, endPitch = hertz) {
    const oscillator = context.createOscillator();
    const envelope = context.createGain();
    const panner = context.createStereoPanner();
    panner.pan.value = pan;
    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(hertz, start);
    if (endPitch !== hertz) oscillator.frequency.exponentialRampToValueAtTime(endPitch, start + duration * 0.7);
    envelope.gain.setValueAtTime(0, start);
    envelope.gain.linearRampToValueAtTime(level, start + Math.min(0.08, duration * 0.1));
    envelope.gain.exponentialRampToValueAtTime(0.00001, start + duration);
    oscillator.connect(envelope).connect(panner).connect(destination);
    transientVoices.add(oscillator);
    oscillator.onended = () => {
      transientVoices.delete(oscillator);
      oscillator.disconnect(); envelope.disconnect(); panner.disconnect();
    };
    oscillator.start(start);
    oscillator.stop(start + duration + 0.1);
  }
  function schedule() {
    if (!wanted || context?.state !== 'running') return;
    const now = context.currentTime;
    if (instrumentsOn() && nextBowl < now + 1.2) {
      const start = Math.max(now + 0.08, nextBowl);
      // Bowl-like strike with integer partials and individual decays.
      [1, 2, 3, 4].forEach((partial, i) => voice(root() / 2 * partial, start, 13 - i * 2.2, 0.11 / (i + 1) ** 1.8, instrumentBus, -0.12));
      nextBowl = start + 15 + Math.random() * 7;
    }
    if (instrumentsOn() && nextChime < now + 1.2) {
      const start = Math.max(now + 0.08, nextChime);
      const ratio = [1, 1.125, 1.25, 1.5, 5 / 3, 2][Math.floor(Math.random() * 6)];
      const pitch = root() * ratio;
      const pan = Math.random() * 0.6 - 0.3;
      voice(pitch, start, 5, 0.045, instrumentBus, pan);
      voice(pitch * 2, start, 2.8, 0.008, instrumentBus, pan);
      nextChime = start + 5 + Math.random() * 6;
    }
    if (scene() === 'forest' && nextBird < now + 1.2) {
      const start = Math.max(now + 0.08, nextBird);
      const pitch = 1500 + Math.random() * 1400;
      const pan = Math.random() * 1.2 - 0.6;
      for (let i = 0; i < 3; i++) voice(pitch * (1 + i * 0.04), start + i * 0.19, 0.22, 0.021, natureBuses.forest, pan, pitch * 0.78);
      nextBird = start + 3 + Math.random() * 5;
    }
  }
  function startScheduler() {
    if (scheduler) return;
    nextBowl = context.currentTime + 0.4;
    nextChime = context.currentTime + 3;
    nextBird = context.currentTime + 1;
    schedule();
    scheduler = setInterval(schedule, 600);
  }
  function stopScheduler() {
    clearInterval(scheduler);
    scheduler = null;
  }
  async function play(next) {
    const currentRequest = ++requestId;
    wanted = next;
    save('eden-harmonics-enabled', next ? 'on' : 'off');
    clearTimeout(pauseTimer);
    if (!next) {
      stopScheduler();
      if (context?.state === 'running') {
        fade(master, 0, 0.08);
        pauseTimer = setTimeout(() => {
          if (wanted) return;
          for (const oscillator of transientVoices) { try { oscillator.stop(); } catch { /* Already ended. */ } }
          context.suspend().catch(() => {});
        }, 450);
      }
      update();
      return;
    }
    try {
      prepare();
      update('Starting softly…');
      await context.resume();
      if (currentRequest !== requestId || !wanted) return;
      applyMix();
      fade(master, Number(volume.value) / 100, 0.7);
      startScheduler();
      update();
    } catch {
      wanted = false;
      stopScheduler();
      if (master) fade(master, 0, 0.08);
      if (context) context.suspend().catch(() => {});
      update('Sound could not start. Try Play again, or enjoy the Spotify playlist.');
    }
  }
  if (!AudioEngine) {
    buttons.forEach(button => { button.disabled = true; });
    for (const control of [volume, frequency, nature, natureVolume, instruments]) if (control) control.disabled = true;
    status.textContent = 'Harmonics are unavailable in this browser. The Spotify playlist is still here for you.';
    return;
  }
  buttons.forEach(button => button.addEventListener('click', () => play(!(wanted && context?.state === 'running'))));
  volume.addEventListener('input', () => {
    save('eden-harmonics-volume', volume.value);
    if (context && wanted && context.state === 'running') fade(master, Number(volume.value) / 100, 0.15);
  });
  [[frequency, 'frequency'], [nature, 'nature'], [natureVolume, 'nature-volume'], [instruments, 'instruments']].forEach(([control, key]) => {
    if (!control) return;
    control.addEventListener(control.type === 'range' ? 'input' : 'change', () => {
      save(`eden-harmonics-${key}`, control.type === 'checkbox' ? (control.checked ? 'on' : 'off') : control.value);
      applyMix();
      if (wanted) update();
    });
  });
  document.querySelectorAll('a.hero-soundtrack, a[href*="open.spotify.com"]').forEach(link => link.addEventListener('click', () => play(false)));
  window.addEventListener('pagehide', () => { wanted = false; stopScheduler(); if (context?.state === 'running') context.suspend().catch(() => {}); });
  window.addEventListener('pageshow', event => { if (event.persisted) update('Welcome back · press Play to continue the soundscape.'); });
  // Remember the mix, never permission to autoplay on a later visit.
  update('Play to begin · sound is always your choice.');
})();
