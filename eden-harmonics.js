(() => {
  'use strict';
  const buttons = [...document.querySelectorAll('[data-harmonics-toggle]')];
  const status = document.querySelector('[data-harmonics-status]');
  const volume = document.querySelector('#harmonics-volume');
  const AudioEngine = window.AudioContext || window.webkitAudioContext;
  if (!buttons.length || !status || !volume) return;
  const preferenceKey = 'eden-harmonics-enabled';
  const volumeKey = 'eden-harmonics-volume';
  const read = key => { try { return localStorage.getItem(key); } catch { return null; } };
  const save = (key, value) => { try { localStorage.setItem(key, value); } catch { /* Optional preference storage. */ } };
  const storedVolume = read(volumeKey);
  if (storedVolume !== null && Number.isFinite(Number(storedVolume))) volume.value = String(Math.max(0, Math.min(45, Number(storedVolume))));
  let context;
  let master;
  let wanted = false;
  let pauseTimer;
  let requestId = 0;

  function update(message) {
    const playing = wanted && context?.state === 'running';
    buttons.forEach(button => {
      button.setAttribute('aria-pressed', String(playing));
      button.setAttribute('aria-label', `${playing ? 'Pause' : 'Play'} Lemuria Harmonics, 432 and 528 hertz`);
      button.querySelector('[data-harmonics-icon]').textContent = playing ? 'Ⅱ' : '▶';
      const label = button.querySelector('[data-harmonics-label]');
      if (label) label.textContent = playing ? 'Pause harmonics' : 'Play harmonics';
    });
    status.textContent = message || (playing ? 'Playing softly · 432 + 528 Hz · adjust the volume to suit you.' : 'Sound paused · enjoy the quiet or play again.');
  }

  function prepare() {
    if (context) return;
    context = new AudioEngine();
    master = context.createGain();
    master.gain.value = 0;
    master.connect(context.destination);
    // Original sine-tone blend with octave support; no streamed or licensed music.
    [[432, .18], [528, .18], [216, .10], [264, .08]].forEach(([frequency, level]) => {
      const voice = context.createOscillator();
      const envelope = context.createGain();
      voice.type = 'sine';
      voice.frequency.value = frequency;
      envelope.gain.value = level;
      voice.connect(envelope).connect(master);
      voice.start();
    });
    context.addEventListener('statechange', () => {
      if (context.state === 'running' && wanted) master.gain.setTargetAtTime(Number(volume.value) / 100, context.currentTime, .8);
      update();
    });
  }

  async function play(next, remember = true) {
    const currentRequest = ++requestId;
    wanted = next;
    if (remember) save(preferenceKey, next ? 'on' : 'off');
    clearTimeout(pauseTimer);
    if (!next) {
      if (context && context.state === 'running') {
        master.gain.setTargetAtTime(0, context.currentTime, .08);
        pauseTimer = setTimeout(() => { if (!wanted && context.state === 'running') context.suspend().catch(() => {}); }, 400);
      }
      update();
      return;
    }
    try {
      prepare();
      update('Tap Play if your browser is waiting for permission to begin.');
      await context.resume();
      if (currentRequest !== requestId || !wanted) return;
      master.gain.setTargetAtTime(Number(volume.value) / 100, context.currentTime, .8);
      update();
    } catch {
      wanted = false;
      update('Sound could not start. Try Play again, or enjoy the Spotify playlist.');
    }
  }

  if (!AudioEngine) {
    buttons.forEach(button => { button.disabled = true; });
    status.textContent = 'Harmonics are unavailable in this browser. The Spotify playlist is still here for you.';
    return;
  }
  buttons.forEach(button => button.addEventListener('click', () => play(!(wanted && context?.state === 'running'))));
  volume.addEventListener('input', () => {
    save(volumeKey, volume.value);
    if (context && wanted && context.state === 'running') master.gain.setTargetAtTime(Number(volume.value) / 100, context.currentTime, .15);
  });
  // Choosing Spotify pauses the local tones so the two listening options do not overlap.
  document.querySelectorAll('a.hero-soundtrack, a[href*="open.spotify.com"]').forEach(link => link.addEventListener('click', () => play(false)));
  window.addEventListener('pagehide', () => { if (context?.state === 'running') context.suspend().catch(() => {}); });
  window.addEventListener('pageshow', event => { if (event.persisted && wanted) { wanted = false; update('Welcome back · press Play to continue the harmonics.'); } });
  // Autoplay remains subject to browser policy. A remembered pause always wins.
  if (read(preferenceKey) !== 'off') play(true, false);
})();
