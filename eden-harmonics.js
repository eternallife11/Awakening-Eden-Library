(() => {
  'use strict';
  const buttons = [...document.querySelectorAll('[data-harmonics-toggle]')];
  const status = document.querySelector('[data-harmonics-status]');
  const volume = document.querySelector('#harmonics-volume');
  const frequency = document.querySelector('#harmonics-frequency');
  const nature = document.querySelector('#harmonics-nature');
  const natureVolume = document.querySelector('#harmonics-nature-volume');
  const instruments = document.querySelector('#harmonics-instruments');
  const mood = document.querySelector('#harmonics-mood');
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
  restore(nature, 'eden-harmonics-nature', ['forest', 'dawn', 'stream', 'rain', 'ocean', 'off']);
  restore(mood, 'eden-harmonics-mood', ['rainforest', 'sunrise', 'heart', 'newearth', 'pure']);
  restore(natureVolume, 'eden-harmonics-nature-volume');
  restore(instruments, 'eden-harmonics-instruments');

  let context, master, instrumentBus, noiseBuffer;
  const natureBuses = {};
  const transientVoices = new Set();
  const instrumentVoices = new Set();
  const fieldSources = new Set();
  let recordingsPromise, tropicalBirds, kookaburra;
  let nextForest = 0, nextKookaburra = 0;
  let wanted = false;
  let requestId = 0;
  let pauseTimer, scheduler;
  let nextBowl = 0, nextChime = 0;
  const root = () => Number(frequency?.value || 432);
  const scene = () => nature?.value || 'off';
  const instrumentsOn = () => instruments?.checked ?? false;
  const sceneNames = { forest: 'Tropical birds & kookaburra', dawn: 'Rainforest dawn chorus & kookaburras', stream: 'Rainforest stream & birds', rain: 'Gentle rain', ocean: 'Ocean waves', off: 'Nature off' };
  const moodNames = { rainforest: 'Rainforest dawn', sunrise: 'Hopeful sunrise', heart: 'Empowering heart', newearth: 'New Earth', pure: 'Pure tones' };
  const currentMood = () => mood?.value || 'rainforest';

  // Real CC0 recordings from Freesound (credits in the player and in
  // docs/lemuria-audio-sources-2026-11-02.md). `a` is the tuning reference we
  // measured for each instrument (its own "A"); the player retunes it to the
  // chosen system: A = 432 Hz, or C = 528 Hz (A = 444 Hz). Chimes and the
  // akebono handpan are too inharmonic to retune, so they play as recorded.
  const SAMPLES = {
    dawn: { file: 'dawn-chorus-kookaburras-maccavictoria.mp3' },
    stream: { file: 'rainforest-stream-evildavo.mp3' },
    bowlSung: { file: 'singing-bowl-ryancacophony.mp3', a: 449.4 },
    crystal: { file: 'crystal-bowls-redwoodrunner.mp3', a: 445.4 },
    handpan: { file: 'handpan-melody-soundguy103.mp3', a: 438.9 },
    akebono: { file: 'handpan-akebono.mp3' },
    koshi: { file: 'koshi-chimes-kinoton.mp3' },
    chimes: { file: 'chimes-samuelgremaud.mp3' },
    violin: { file: 'violin-note-poppy-crum.mp3', hz: 774.5 }
  };
  // Each soundscape is a palette of recorded instruments heard now and then,
  // always over the soft synthesized bowl note. `every` is seconds between
  // entries, `len` the excerpt length, `level` a relative loudness.
  const MOODS = {
    rainforest: { layers: [
      { s: 'koshi', every: [40, 70], len: [16, 24], level: 0.8, first: 6 },
      { s: 'handpan', every: [60, 95], len: [14, 20], level: 0.7, first: 22 }
    ] },
    sunrise: { layers: [
      { s: 'handpan', every: [28, 45], len: [16, 24], level: 0.8, first: 4 },
      { s: 'violin', every: [9, 16], level: 0.7, melody: [560, 1000], first: 10 },
      { s: 'chimes', every: [45, 75], len: [10, 16], level: 0.7, first: 30 }
    ] },
    heart: { layers: [
      { s: 'bowlSung', every: [36, 52], level: 1, first: 2 },
      { s: 'handpan', every: [24, 38], len: [16, 24], level: 0.85, first: 14 },
      { s: 'violin', every: [12, 20], level: 0.75, melody: [430, 800], first: 8 }
    ] },
    newearth: { bed: { s: 'crystal', level: 0.75 }, layers: [
      { s: 'koshi', every: [34, 58], len: [16, 24], level: 0.7, first: 12 },
      { s: 'akebono', every: [42, 66], level: 0.75, first: 26 },
      { s: 'violin', every: [16, 26], level: 0.55, melody: [560, 1000], first: 18 }
    ] },
    pure: { layers: [] }
  };
  const NATURE_RECORDINGS = { dawn: { s: 'dawn', level: 0.16 }, stream: { s: 'stream', level: 0.2 } };
  const buffers = {};
  const loading = {};
  let recordingBus, nextBed = 0, nextNatureBed = 0;
  const layerTimes = new Map();
  const tunedSources = new Set();
  const tuningA = () => (root() === 528 ? 444 : 432);
  const between = ([low, high]) => low + Math.random() * (high - low);
  const PENTATONIC = [1, 9 / 8, 5 / 4, 3 / 2, 5 / 3];
  function sampleRate(key, target) {
    const sample = SAMPLES[key];
    if (target && sample.hz) return target / sample.hz;
    return sample.a ? tuningA() / sample.a : 1;
  }
  function melodyNote([low, high]) {
    // A major-pentatonic degree of the chosen root, moved into the violin's range.
    let note = root() * PENTATONIC[Math.floor(Math.random() * PENTATONIC.length)];
    while (note > high) note /= 2;
    while (note < low) note *= 2;
    return Math.min(note, high * 1.1);
  }
  function neededSamples() {
    const keys = new Set();
    if (NATURE_RECORDINGS[scene()]) keys.add(NATURE_RECORDINGS[scene()].s);
    if (instrumentsOn()) {
      const palette = MOODS[currentMood()];
      if (palette.bed) keys.add(palette.bed.s);
      palette.layers.forEach(layer => keys.add(layer.s));
    }
    return [...keys];
  }
  function loadSamples() {
    if (!context) return Promise.resolve();
    return Promise.allSettled(neededSamples().map(key => {
      if (buffers[key]) return buffers[key];
      if (!loading[key]) {
        loading[key] = fetch(`assets/audio/lemuria/${SAMPLES[key].file}`)
          .then(response => { if (!response.ok) throw new Error('Recording unavailable'); return response.arrayBuffer(); })
          .then(data => context.decodeAudioData(data))
          .then(buffer => { buffers[key] = buffer; return buffer; })
          .catch(error => { delete loading[key]; throw error; });
      }
      return loading[key];
    }));
  }
  function recorded(key, start, { level, destination, len, rate = sampleRate(key), pan = 0, fadeIn = 1.2, fadeOut = 2.5, tuned = Boolean(SAMPLES[key].a) }) {
    const buffer = buffers[key];
    if (!buffer) return 0;
    const source = context.createBufferSource();
    source.buffer = buffer;
    source.playbackRate.value = rate;
    const playable = buffer.duration / rate;
    const length = Math.min(len || playable, playable);
    const offset = len ? Math.random() * Math.max(0, buffer.duration - length * rate) : 0;
    const envelope = context.createGain();
    const panner = context.createStereoPanner();
    panner.pan.value = pan;
    envelope.gain.setValueAtTime(0, start);
    envelope.gain.linearRampToValueAtTime(level, start + Math.min(fadeIn, length / 3));
    envelope.gain.setValueAtTime(level, start + Math.max(length - fadeOut, length / 2));
    envelope.gain.linearRampToValueAtTime(0, start + length);
    source.connect(envelope).connect(panner).connect(destination);
    if (tuned) tunedSources.add(source);
    transientVoices.add(source);
    fieldSources.add(source);
    source.onended = () => { transientVoices.delete(source); fieldSources.delete(source); tunedSources.delete(source); source.disconnect(); envelope.disconnect(); panner.disconnect(); };
    source.start(start, offset, length * rate);
    return length;
  }
  function retune() {
    if (!context) return;
    for (const source of tunedSources) {
      const key = Object.keys(SAMPLES).find(name => buffers[name] === source.buffer);
      if (key && SAMPLES[key].a) source.playbackRate.setTargetAtTime(sampleRate(key), context.currentTime, 0.4);
    }
  }
  function scheduleRecordings(now) {
    const bed = NATURE_RECORDINGS[scene()];
    if (bed && buffers[bed.s] && nextNatureBed < now + 1.2) {
      const start = Math.max(now + 0.08, nextNatureBed);
      const length = recorded(bed.s, start, { level: bed.level, destination: natureBuses[scene()], fadeIn: 3, fadeOut: 3 });
      nextNatureBed = start + length - 3;
    }
    if (!instrumentsOn()) return;
    const palette = MOODS[currentMood()];
    if (palette.bed && buffers[palette.bed.s] && nextBed < now + 1.2) {
      const start = Math.max(now + 0.08, nextBed);
      const length = recorded(palette.bed.s, start, { level: palette.bed.level, destination: recordingBus, fadeIn: 4, fadeOut: 4 });
      nextBed = start + length - 4;
    }
    palette.layers.forEach((layer, index) => {
      const id = `${currentMood()}:${index}`;
      if (!layerTimes.has(id)) layerTimes.set(id, now + layer.first);
      if (!buffers[layer.s] || layerTimes.get(id) > now + 1.2) return;
      const start = Math.max(now + 0.08, layerTimes.get(id));
      const pan = Math.random() * 0.7 - 0.35;
      if (layer.melody) {
        const rate = sampleRate(layer.s, melodyNote(layer.melody));
        recorded(layer.s, start, { level: layer.level, destination: recordingBus, rate, pan, fadeIn: 1.4, fadeOut: 2.2, tuned: false });
        // Now and then a second, answering note.
        if (Math.random() < 0.45) recorded(layer.s, start + 2.6, { level: layer.level * 0.8, destination: recordingBus, rate: sampleRate(layer.s, melodyNote(layer.melody)), pan: -pan, fadeIn: 1.4, fadeOut: 2.2, tuned: false });
      } else {
        recorded(layer.s, start, { level: layer.level, destination: recordingBus, len: layer.len ? between(layer.len) : 0, pan });
      }
      layerTimes.set(id, start + between(layer.every));
    });
  }

  function loadRecordings() {
    if (recordingsPromise) return recordingsPromise;
    recordingsPromise = Promise.allSettled([
      ['tropical-birds-dubminister.mp3', buffer => { tropicalBirds = buffer; }],
      ['kookaburra-soundofsong.mp3', buffer => { kookaburra = buffer; }]
    ].map(async ([file, assign]) => {
      const response = await fetch(`assets/audio/lemuria/${file}`);
      if (!response.ok) throw new Error('Recording unavailable');
      assign(await context.decodeAudioData(await response.arrayBuffer()));
    }));
    return recordingsPromise;
  }

  function fieldRecording(buffer, start, level, overlap = 1) {
    const source = context.createBufferSource();
    source.buffer = buffer;
    const envelope = gain(0, natureBuses.forest);
    envelope.gain.setValueAtTime(0, start);
    envelope.gain.linearRampToValueAtTime(level, start + overlap);
    envelope.gain.setValueAtTime(level, start + buffer.duration - overlap);
    envelope.gain.linearRampToValueAtTime(0, start + buffer.duration);
    source.connect(envelope);
    source.onended = () => { transientVoices.delete(source); fieldSources.delete(source); source.disconnect(); envelope.disconnect(); };
    transientVoices.add(source);
    fieldSources.add(source);
    source.start(start);
  }

  function update(message) {
    const playing = Boolean(wanted && context?.state === 'running');
    document.body.classList.toggle('harmonics-playing', playing);
    buttons.forEach(button => {
      button.setAttribute('aria-pressed', String(playing));
      button.setAttribute('aria-label', `${playing ? 'Pause' : 'Play'} Lemuria Harmonics`);
      const headerLabel = button.querySelector('[data-harmonics-header-label]');
      if (headerLabel) headerLabel.textContent = playing ? 'Pause Lemuria' : 'Play Lemuria';
      const icon = button.querySelector('[data-harmonics-icon]');
      if (icon) icon.textContent = playing ? 'Ⅱ' : '▶';
      const label = button.querySelector('[data-harmonics-label]');
      if (label) label.textContent = playing ? 'Pause soundscape' : 'Play soundscape';
    });
    status.textContent = message || (playing
      ? `Playing · ${instrumentsOn() ? `${moodNames[currentMood()]} · ${root()} Hz · ` : ''}${sceneNames[scene()]}`
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
    for (const [name, bus] of Object.entries(natureBuses)) fade(bus, scene() === name ? natureLevel * (name === 'rain' ? 0.22 : 1) : 0);
    fade(instrumentBus, instrumentsOn() ? 0.3 : 0, 0.3);
    fade(recordingBus, instrumentsOn() ? 0.12 : 0, 0.3);
  }
  function prepare() {
    if (context) return;
    context = new AudioEngine();
    master = gain(0, context.destination);
    instrumentBus = gain(0, master);
    recordingBus = gain(0, master);
    noiseBuffer = makeNoise();
    for (const name of ['forest', 'dawn', 'stream', 'rain', 'ocean']) natureBuses[name] = gain(0, master);
    noiseLayer(natureBuses.rain, 'lowpass', 3200, 0.35, 0.04, 0.02);
    noiseLayer(natureBuses.rain, 'bandpass', 1200, 0.04, 0.07, 0.008);
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
    envelope.gain.linearRampToValueAtTime(level, start + Math.min(0.22, duration * 0.1));
    envelope.gain.exponentialRampToValueAtTime(0.00001, start + duration);
    oscillator.connect(envelope).connect(panner).connect(destination);
    transientVoices.add(oscillator);
    instrumentVoices.add(oscillator);
    oscillator.onended = () => {
      transientVoices.delete(oscillator);
      instrumentVoices.delete(oscillator);
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
      [1, 2, 3, 4].forEach((partial, i) => voice(root() * partial, start, 10 - i * 1.8, 0.065 / (i + 1) ** 2, instrumentBus, -0.12));
      nextBowl = start + 24 + Math.random() * 14;
    }
    if (instrumentsOn() && nextChime < now + 1.2) {
      const start = Math.max(now + 0.08, nextChime);
      const ratio = [1, 1.125, 1.25, 1.5, 5 / 3, 2][Math.floor(Math.random() * 6)];
      const pitch = root() / 2 * ratio;
      const pan = Math.random() * 0.6 - 0.3;
      voice(pitch, start, 3.8, 0.04, instrumentBus, pan);
      voice(pitch * 2, start, 2.2, 0.009, instrumentBus, pan);
      voice(pitch * 3, start, 1.2, 0.002, instrumentBus, pan);
      nextChime = start + 10 + Math.random() * 12;
    }
    if (scene() === 'forest' && tropicalBirds && nextForest < now + 1.2) {
      const start = Math.max(now + 0.08, nextForest);
      fieldRecording(tropicalBirds, start, 0.8, 3);
      nextForest = start + tropicalBirds.duration - 3;
    }
    scheduleRecordings(now);
    if (scene() === 'forest' && kookaburra && nextKookaburra < now + 1.2) {
      const start = Math.max(now + 8, nextKookaburra);
      fieldRecording(kookaburra, start, 0.16, 0.5);
      nextKookaburra = start + 75 + Math.random() * 75;
    }
  }
  function startScheduler() {
    if (scheduler) return;
    nextBowl = context.currentTime + 0.4;
    nextChime = context.currentTime + 3;
    nextForest = context.currentTime;
    nextKookaburra = context.currentTime + 25;
    nextBed = context.currentTime;
    nextNatureBed = context.currentTime;
    layerTimes.clear();
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
      for (const source of fieldSources) {
        try { source.stop(context.currentTime + 0.35); } catch { /* Already ended. */ }
      }
      fieldSources.clear();
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
      await Promise.all([loadRecordings(), loadSamples()]);
      if (currentRequest !== requestId || !wanted) return;
      applyMix();
      fade(master, Number(volume.value) / 100, 0.7);
      startScheduler();
      update(scene() === 'forest' && !tropicalBirds ? 'Bird recording unavailable · gentle instruments and tones are playing.' : undefined);
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
    for (const control of [volume, frequency, nature, natureVolume, instruments, mood]) if (control) control.disabled = true;
    status.textContent = 'Harmonics are unavailable in this browser. The Spotify playlist is still here for you.';
    return;
  }
  buttons.forEach(button => button.addEventListener('click', () => play(!(wanted && context?.state === 'running'))));
  volume.addEventListener('input', () => {
    save('eden-harmonics-volume', volume.value);
    if (context && wanted && context.state === 'running') fade(master, Number(volume.value) / 100, 0.15);
  });
  [[frequency, 'frequency'], [nature, 'nature'], [natureVolume, 'nature-volume'], [instruments, 'instruments'], [mood, 'mood']].forEach(([control, key]) => {
    if (!control) return;
    control.addEventListener(control.type === 'range' ? 'input' : 'change', () => {
      save(`eden-harmonics-${key}`, control.type === 'checkbox' ? (control.checked ? 'on' : 'off') : control.value);
      if (context && (control === frequency || control === instruments)) {
        if (control === frequency) {
          for (const voice of instrumentVoices) { try { voice.stop(context.currentTime + 0.03); } catch { /* Already ended. */ } }
          instrumentVoices.clear();
        }
        nextBowl = context.currentTime + 0.4;
        nextChime = context.currentTime + 3;
      }
      if (context && control === frequency) retune();
      if (context && (control === mood || control === nature || control === instruments)) {
        // Fade out the previous palette's recordings and begin the new one.
        if (control === mood) {
          for (const source of [...fieldSources]) {
            if (source.buffer === tropicalBirds || source.buffer === kookaburra) continue;
            if (Object.values(NATURE_RECORDINGS).some(bed => buffers[bed.s] === source.buffer)) continue;
            try { source.stop(context.currentTime + 0.6); } catch { /* Already ended. */ }
          }
          layerTimes.clear();
          nextBed = context.currentTime + 0.3;
        }
        if (control === nature) nextNatureBed = context.currentTime + 0.1;
        if (wanted) loadSamples();
      }
      applyMix();
      if (wanted) update();
    });
  });
  document.querySelectorAll('a.hero-soundtrack, a[href*="open.spotify.com"], a[data-lemuria-external]').forEach(link => link.addEventListener('click', () => play(false)));
  window.addEventListener('pagehide', () => { wanted = false; stopScheduler(); if (context?.state === 'running') context.suspend().catch(() => {}); });
  window.addEventListener('pageshow', event => { if (event.persisted) update('Welcome back · press Play to continue the soundscape.'); });
  // Remember the mix, never permission to autoplay on a later visit.
  update('Play to begin · sound is always your choice.');
})();
