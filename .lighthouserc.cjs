/**
 * Local, non-deploying performance evidence for the public candidate.
 * Budgets will be added after repeated reports establish a stable baseline.
 */
module.exports = {
  ci: {
    collect: {
      startServerCommand: 'node scripts/serve-cloudflare-preview.mjs',
      startServerReadyPattern: 'preview ready',
      startServerReadyTimeout: 120000,
      numberOfRuns: 1,
      url: [
        'http://127.0.0.1:8787/',
        'http://127.0.0.1:8787/work-with-benjy',
        'http://127.0.0.1:8787/living-library',
        'http://127.0.0.1:8787/partners'
      ],
      settings: {
        preset: 'desktop',
        chromeFlags: '--headless=new --no-sandbox'
      }
    },
    upload: {
      target: 'filesystem',
      outputDir: './lhci-reports'
    }
  }
};
