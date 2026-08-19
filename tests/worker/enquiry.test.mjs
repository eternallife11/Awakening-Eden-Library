import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';
import { createEnquiryWorker } from '../../workers/enquiry.mjs';

const ORIGIN = 'https://pr-7-awakening-eden-library-staging.holisticmission8.workers.dev';

function validPayload(overrides = {}) {
  return {
    name: 'Ada Gardener',
    email: 'ada@example.test',
    'whatsapp-or-phone': '+351 920 000 000',
    'preferred-contact': 'Email',
    location: 'Coimbra, Portugal',
    'property-type': 'Home garden',
    'property-size': '800 square metres',
    'start-timeframe': 'Within 1–3 months',
    'service-interest': 'Regenerative clarity session',
    'vision-and-challenge': 'I would like to restore water, soil life and food abundance in our garden.',
    'photos-or-map-link': 'https://example.test/map',
    'contact-consent': 'yes',
    'bot-field': '',
    utm_source: 'newsletter',
    utm_medium: 'email',
    utm_campaign: 'autumn',
    utm_content: 'first-note',
    referrer: 'https://example.test/newsletter',
    landing_page: `${ORIGIN}/work-with-benjy?utm_source=newsletter`,
    'turnstile-token': 'test-turnstile-token',
    ...overrides
  };
}

function requestFor(payload, options = {}) {
  const headers = new Headers({
    Origin: options.origin ?? ORIGIN,
    'Content-Type': options.contentType ?? 'application/json',
    'CF-Connecting-IP': options.ip ?? '203.0.113.42'
  });
  const method = options.method ?? 'POST';
  return new Request(`${ORIGIN}/api/enquiry`, {
    method,
    headers,
    ...(method === 'GET' || method === 'HEAD' ? {} : { body: options.body ?? JSON.stringify(payload) })
  });
}

function createEnvironment(overrides = {}) {
  const sent = [];
  const calls = { ip: [], email: [], siteverify: [] };
  const env = {
    ASSETS: { fetch: async () => new Response('asset fallback', { status: 404 }) },
    ENQUIRY_ALLOWED_ORIGIN: ORIGIN,
    ENQUIRY_FROM_EMAIL: 'enquiries@example.test',
    TURNSTILE_SECRET_KEY: '1x0000000000000000000000000000000AA',
    ENQUIRY_IP_RATE_LIMIT: {
      limit: async ({ key }) => {
        calls.ip.push(key);
        return { success: true };
      }
    },
    ENQUIRY_EMAIL_RATE_LIMIT: {
      limit: async ({ key }) => {
        calls.email.push(key);
        return { success: true };
      }
    },
    ENQUIRY_EMAIL: {
      send: async (message) => {
        sent.push(message);
        return { messageId: 'mock-message-id' };
      }
    },
    ...overrides
  };
  const requestFetch = async (url, init) => {
    calls.siteverify.push({ url, init });
    return new Response(JSON.stringify({
      success: true,
      hostname: new URL(ORIGIN).hostname,
      action: 'enquiry'
    }), { headers: { 'Content-Type': 'application/json' } });
  };
  return { env, sent, calls, requestFetch };
}

async function responseBody(response) {
  return response.json();
}

test('accepts a complete, verified enquiry and sends only to the fixed destination', async () => {
  const { env, sent, calls, requestFetch } = createEnvironment();
  const worker = createEnquiryWorker({ fetch: requestFetch });

  const response = await worker.fetch(requestFor(validPayload()), env);

  assert.equal(response.status, 202);
  assert.deepEqual(await responseBody(response), { ok: true, redirect: '/project-enquiry-thank-you.html' });
  assert.equal(sent.length, 1);
  assert.equal(sent[0].to, 'regenerativeeden@gmail.com');
  assert.equal(sent[0].from, 'enquiries@example.test');
  assert.equal(sent[0].replyTo, 'ada@example.test');
  assert.match(sent[0].text, /Coimbra, Portugal/);
  assert.equal(calls.ip.length, 1);
  assert.equal(calls.email.length, 1);
  assert.equal(calls.siteverify.length, 1);
  const verification = JSON.parse(calls.siteverify[0].init.body);
  assert.equal(verification.response, 'test-turnstile-token');
  assert.equal(verification.remoteip, '203.0.113.42');
  assert.ok(verification.idempotency_key);
});

test('rejects invalid field values before Turnstile or email delivery', async () => {
  const { env, sent, calls, requestFetch } = createEnvironment();
  const worker = createEnquiryWorker({ fetch: requestFetch });

  const response = await worker.fetch(requestFor(validPayload({ email: 'not-an-email' })), env);

  assert.equal(response.status, 400);
  assert.equal((await responseBody(response)).code, 'invalid_enquiry');
  assert.equal(sent.length, 0);
  assert.equal(calls.siteverify.length, 0);
});

test('rejects a filled honeypot without sending an enquiry', async () => {
  const { env, sent, calls, requestFetch } = createEnvironment();
  const worker = createEnquiryWorker({ fetch: requestFetch });

  const response = await worker.fetch(requestFor(validPayload({ 'bot-field': 'I am a bot' })), env);

  assert.equal(response.status, 400);
  assert.equal((await responseBody(response)).code, 'invalid_enquiry');
  assert.equal(sent.length, 0);
  assert.equal(calls.siteverify.length, 0);
});

test('rejects a request from another origin before parsing or delivery', async () => {
  const { env, sent, calls, requestFetch } = createEnvironment();
  const worker = createEnquiryWorker({ fetch: requestFetch });

  const response = await worker.fetch(requestFor(validPayload(), { origin: 'https://attacker.example' }), env);

  assert.equal(response.status, 403);
  assert.equal((await responseBody(response)).code, 'invalid_origin');
  assert.equal(sent.length, 0);
  assert.equal(calls.ip.length, 0);
});

test('rejects non-POST, non-JSON, malformed, and oversized requests without delivery', async () => {
  const { env, sent, calls, requestFetch } = createEnvironment();
  const worker = createEnquiryWorker({ fetch: requestFetch });

  const method = await worker.fetch(requestFor(validPayload(), { method: 'GET', body: undefined }), env);
  assert.equal(method.status, 405);
  assert.equal(method.headers.get('allow'), 'POST');

  const type = await worker.fetch(requestFor(validPayload(), { contentType: 'text/plain' }), env);
  assert.equal(type.status, 415);

  const malformed = await worker.fetch(requestFor(validPayload(), { body: '{not-json' }), env);
  assert.equal(malformed.status, 400);

  const oversized = await worker.fetch(requestFor(validPayload(), { body: JSON.stringify({ value: 'x'.repeat(17 * 1024) }) }), env);
  assert.equal(oversized.status, 413);
  assert.equal(sent.length, 0);
  assert.equal(calls.siteverify.length, 0);
});

test('returns 429 before parsing when the network safety brake is exhausted', async () => {
  const { env, sent, calls, requestFetch } = createEnvironment({
    ENQUIRY_IP_RATE_LIMIT: { limit: async () => ({ success: false }) }
  });
  const worker = createEnquiryWorker({ fetch: requestFetch });

  const response = await worker.fetch(requestFor(validPayload()), env);

  assert.equal(response.status, 429);
  assert.equal(response.headers.get('retry-after'), '60');
  assert.equal((await responseBody(response)).code, 'rate_limited');
  assert.equal(sent.length, 0);
  assert.equal(calls.siteverify.length, 0);
});

test('returns 429 when the email-address safety brake is exhausted', async () => {
  const { env, sent, calls, requestFetch } = createEnvironment({
    ENQUIRY_EMAIL_RATE_LIMIT: { limit: async () => ({ success: false }) }
  });
  const worker = createEnquiryWorker({ fetch: requestFetch });

  const response = await worker.fetch(requestFor(validPayload()), env);

  assert.equal(response.status, 429);
  assert.equal((await responseBody(response)).code, 'rate_limited');
  assert.equal(sent.length, 0);
  assert.equal(calls.siteverify.length, 0);
});

test('rejects a failed Turnstile response without sending email', async () => {
  const { env, sent, requestFetch } = createEnvironment();
  const worker = createEnquiryWorker({
    fetch: async () => new Response(JSON.stringify({
      success: false,
      'error-codes': ['timeout-or-duplicate']
    }), { headers: { 'Content-Type': 'application/json' } })
  });

  const response = await worker.fetch(requestFor(validPayload()), env);

  assert.equal(response.status, 400);
  assert.equal((await responseBody(response)).code, 'turnstile_failed');
  assert.equal(sent.length, 0);
  assert.notEqual(requestFetch, undefined);
});

test('requires the expected Turnstile hostname and action, not merely a success flag', async () => {
  const { env, sent } = createEnvironment();
  const worker = createEnquiryWorker({
    fetch: async () => new Response(JSON.stringify({
      success: true,
      hostname: 'wrong-host.example',
      action: 'another-action'
    }), { headers: { 'Content-Type': 'application/json' } })
  });

  const response = await worker.fetch(requestFor(validPayload()), env);

  assert.equal(response.status, 400);
  assert.equal((await responseBody(response)).code, 'turnstile_failed');
  assert.equal(sent.length, 0);
});

test('never reports success when the email binding fails', async () => {
  const { env, requestFetch } = createEnvironment({
    ENQUIRY_EMAIL: { send: async () => { throw new Error('mock delivery failure'); } }
  });
  const worker = createEnquiryWorker({ fetch: requestFetch });

  const response = await worker.fetch(requestFor(validPayload()), env);

  assert.equal(response.status, 503);
  assert.equal((await responseBody(response)).code, 'delivery_failed');
});

test('requires configuration before it can claim an enquiry was sent', async () => {
  const { env, requestFetch } = createEnvironment({ TURNSTILE_SECRET_KEY: undefined });
  const worker = createEnquiryWorker({ fetch: requestFetch });

  const response = await worker.fetch(requestFor(validPayload()), env);

  assert.equal(response.status, 503);
  assert.equal((await responseBody(response)).code, 'service_unavailable');
});

test('keeps non-API paths on the static-assets fallback', async () => {
  const { env, requestFetch } = createEnvironment();
  const worker = createEnquiryWorker({ fetch: requestFetch });

  const response = await worker.fetch(new Request(`${ORIGIN}/work-with-benjy`), env);

  assert.equal(response.status, 404);
  assert.equal(await response.text(), 'asset fallback');
});

test('does not emit enquiry data to console logs', async () => {
  const workerSource = await readFile(new URL('../../workers/enquiry.mjs', import.meta.url), 'utf8');
  assert.equal(workerSource.includes('console.'), false);
});
