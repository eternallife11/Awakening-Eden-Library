const API_PATH = '/api/enquiry';
const DELIVERY_ADDRESS = 'regenerativeeden@gmail.com';
const SUCCESS_REDIRECT = '/project-enquiry-thank-you.html';
const MAX_BODY_BYTES = 16 * 1024;
const RETRY_AFTER_SECONDS = '60';

const propertyTypes = new Set([
  'Home garden',
  'Tired or existing orchard',
  'Quinta or small farm',
  'Retreat or eco-project',
  'Community, school or public place',
  'Larger farm or land project',
  'Still exploring'
]);

const preferredContacts = new Set(['Email', 'WhatsApp', 'Either is welcome']);
const startTimeframes = new Set([
  'As soon as practical',
  'Within 1–3 months',
  'Later this year',
  'I am exploring for the future'
]);

const serviceInterests = new Set([
  'Regenerative clarity session',
  'On-site property walk and 90-day action map',
  'Living Land regeneration partnership',
  'Property vision and concept design',
  'Tired orchard revival and seasonal stewardship',
  'Water and landscape resilience',
  'Food forest or syntropic planting design',
  'Abundant Edge soil and biomass systems',
  'Implementation or project support',
  'Workshop or team training',
  'Whole-property wellbeing',
  'I am not sure yet'
]);

const textEncoder = new TextEncoder();

function responseJson(body, status, extraHeaders = {}) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      'Cache-Control': 'no-store',
      'Content-Type': 'application/json; charset=utf-8',
      'X-Content-Type-Options': 'nosniff',
      ...extraHeaders
    }
  });
}

function fail(status, code, message, extraHeaders) {
  return responseJson({ ok: false, code, message }, status, extraHeaders);
}

function cleanString(value, maxLength) {
  if (typeof value !== 'string') return null;
  const cleaned = value.replace(/\u0000/g, '').trim();
  if (cleaned.length > maxLength) return null;
  return cleaned;
}

function requiredText(payload, field, maxLength, issues) {
  const value = cleanString(payload[field], maxLength);
  if (!value) issues.push(field);
  return value;
}

function optionalText(payload, field, maxLength, issues) {
  const value = payload[field] === undefined ? '' : cleanString(payload[field], maxLength);
  if (value === null) issues.push(field);
  return value ?? '';
}

function validEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) && value.length <= 254;
}

function validHttpUrl(value) {
  if (!value) return true;
  try {
    const url = new URL(value);
    return url.protocol === 'https:' || url.protocol === 'http:';
  } catch {
    return false;
  }
}

function allowedValue(value, values, field, issues) {
  if (!values.has(value)) issues.push(field);
  return value;
}

function validateEnquiry(payload) {
  if (!payload || Array.isArray(payload) || typeof payload !== 'object') {
    return { issues: ['request'] };
  }

  const issues = [];
  const enquiry = {
    name: requiredText(payload, 'name', 120, issues),
    email: requiredText(payload, 'email', 254, issues),
    phone: optionalText(payload, 'whatsapp-or-phone', 80, issues),
    preferredContact: requiredText(payload, 'preferred-contact', 32, issues),
    location: requiredText(payload, 'location', 180, issues),
    propertyType: requiredText(payload, 'property-type', 80, issues),
    propertySize: optionalText(payload, 'property-size', 120, issues),
    startTimeframe: requiredText(payload, 'start-timeframe', 80, issues),
    serviceInterest: requiredText(payload, 'service-interest', 100, issues),
    vision: requiredText(payload, 'vision-and-challenge', 4_000, issues),
    photosOrMapLink: optionalText(payload, 'photos-or-map-link', 2_048, issues),
    utmSource: optionalText(payload, 'utm_source', 120, issues),
    utmMedium: optionalText(payload, 'utm_medium', 120, issues),
    utmCampaign: optionalText(payload, 'utm_campaign', 120, issues),
    utmContent: optionalText(payload, 'utm_content', 120, issues),
    referrer: optionalText(payload, 'referrer', 2_048, issues),
    landingPage: optionalText(payload, 'landing_page', 2_048, issues),
    turnstileToken: requiredText(payload, 'turnstile-token', 2_048, issues)
  };

  if (cleanString(payload['bot-field'] ?? '', 200) !== '') issues.push('bot-field');
  if (payload['contact-consent'] !== 'yes') issues.push('contact-consent');
  if (enquiry.email && !validEmail(enquiry.email)) issues.push('email');
  if (!validHttpUrl(enquiry.photosOrMapLink)) issues.push('photos-or-map-link');
  allowedValue(enquiry.preferredContact, preferredContacts, 'preferred-contact', issues);
  allowedValue(enquiry.propertyType, propertyTypes, 'property-type', issues);
  allowedValue(enquiry.startTimeframe, startTimeframes, 'start-timeframe', issues);
  allowedValue(enquiry.serviceInterest, serviceInterests, 'service-interest', issues);

  return { enquiry, issues };
}

async function keyDigest(value) {
  const digest = await crypto.subtle.digest('SHA-256', textEncoder.encode(value));
  return Array.from(new Uint8Array(digest), (byte) => byte.toString(16).padStart(2, '0')).join('');
}

async function checkRateLimit(binding, value) {
  const { success } = await binding.limit({ key: await keyDigest(value) });
  return success;
}

async function parsePayload(request) {
  const contentLength = Number(request.headers.get('content-length') ?? '0');
  if (Number.isFinite(contentLength) && contentLength > MAX_BODY_BYTES) {
    return { error: fail(413, 'request_too_large', 'Please shorten the enquiry and try again.') };
  }

  if (!request.headers.get('content-type')?.toLowerCase().startsWith('application/json')) {
    return { error: fail(415, 'unsupported_content_type', 'Please submit the form from this page.') };
  }

  let body;
  try {
    body = await request.text();
  } catch {
    return { error: fail(400, 'invalid_request', 'Please try again.') };
  }

  if (textEncoder.encode(body).byteLength > MAX_BODY_BYTES) {
    return { error: fail(413, 'request_too_large', 'Please shorten the enquiry and try again.') };
  }

  try {
    return { payload: JSON.parse(body) };
  } catch {
    return { error: fail(400, 'invalid_request', 'Please try again.') };
  }
}

async function validateTurnstile(enquiry, request, env, requestFetch) {
  if (!env.TURNSTILE_SECRET_KEY || !env.ENQUIRY_ALLOWED_ORIGIN) return false;

  let expectedHostname;
  try {
    expectedHostname = new URL(env.ENQUIRY_ALLOWED_ORIGIN).hostname;
  } catch {
    return false;
  }
  const remoteip = request.headers.get('cf-connecting-ip') || undefined;
  let siteverify;

  try {
    siteverify = await requestFetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        secret: env.TURNSTILE_SECRET_KEY,
        response: enquiry.turnstileToken,
        remoteip,
        idempotency_key: crypto.randomUUID()
      })
    });
  } catch {
    return false;
  }

  if (!siteverify.ok) return false;

  try {
    const result = await siteverify.json();
    return result.success === true && result.hostname === expectedHostname && result.action === 'enquiry';
  } catch {
    return false;
  }
}

function escapeHtml(value) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

function deliveryFields(enquiry) {
  return [
    ['Name', enquiry.name],
    ['Email', enquiry.email],
    ['Preferred reply', enquiry.preferredContact],
    ['WhatsApp / phone', enquiry.phone || 'Not provided'],
    ['Location', enquiry.location],
    ['Property type', enquiry.propertyType],
    ['Approximate size', enquiry.propertySize || 'Not provided'],
    ['Start timeframe', enquiry.startTimeframe],
    ['Service interest', enquiry.serviceInterest],
    ['Vision and challenge', enquiry.vision],
    ['Photos / map / video', enquiry.photosOrMapLink || 'Not provided'],
    ['UTM source', enquiry.utmSource || 'Not provided'],
    ['UTM medium', enquiry.utmMedium || 'Not provided'],
    ['UTM campaign', enquiry.utmCampaign || 'Not provided'],
    ['UTM content', enquiry.utmContent || 'Not provided'],
    ['Referrer', enquiry.referrer || 'Direct / unknown'],
    ['Landing page', enquiry.landingPage || 'Not provided']
  ];
}

function createMessage(enquiry, from) {
  const fields = deliveryFields(enquiry);
  const text = fields.map(([label, value]) => `${label}: ${value}`).join('\n\n');
  const html = fields.map(([label, value]) => `<p><strong>${escapeHtml(label)}:</strong><br>${escapeHtml(value).replaceAll('\n', '<br>')}</p>`).join('');

  return {
    to: DELIVERY_ADDRESS,
    from,
    replyTo: enquiry.email,
    subject: `New Awakening Eden land enquiry — ${enquiry.name.replace(/\s+/g, ' ')}`,
    text,
    html
  };
}

async function handleEnquiry(request, env, requestFetch) {
  if (request.headers.get('origin') !== env.ENQUIRY_ALLOWED_ORIGIN) {
    return fail(403, 'invalid_origin', 'Please submit the form from the enquiry page.');
  }

  if (!env.ENQUIRY_IP_RATE_LIMIT || !env.ENQUIRY_EMAIL_RATE_LIMIT) {
    return fail(503, 'service_unavailable', 'The enquiry form is not ready yet. Please use the direct contact options above.');
  }

  const clientIp = request.headers.get('cf-connecting-ip') || 'unknown-client';
  if (!(await checkRateLimit(env.ENQUIRY_IP_RATE_LIMIT, `ip:${clientIp}`))) {
    return fail(429, 'rate_limited', 'Please wait a minute before trying again.', { 'Retry-After': RETRY_AFTER_SECONDS });
  }

  const parsed = await parsePayload(request);
  if (parsed.error) return parsed.error;

  const { enquiry, issues } = validateEnquiry(parsed.payload);
  if (issues.length) {
    return fail(400, 'invalid_enquiry', 'Please check the required fields and try again.');
  }

  if (!(await checkRateLimit(env.ENQUIRY_EMAIL_RATE_LIMIT, `email:${enquiry.email.toLowerCase()}`))) {
    return fail(429, 'rate_limited', 'Please wait a minute before trying again.', { 'Retry-After': RETRY_AFTER_SECONDS });
  }

  if (!env.TURNSTILE_SECRET_KEY || !env.ENQUIRY_FROM_EMAIL || !env.ENQUIRY_EMAIL) {
    return fail(503, 'service_unavailable', 'The enquiry form is not ready yet. Please use the direct contact options above.');
  }

  if (!(await validateTurnstile(enquiry, request, env, requestFetch))) {
    return fail(400, 'turnstile_failed', 'Please complete the verification and try again.');
  }

  try {
    await env.ENQUIRY_EMAIL.send(createMessage(enquiry, env.ENQUIRY_FROM_EMAIL));
  } catch {
    return fail(503, 'delivery_failed', 'We could not send your enquiry just now. Please try again or use the direct contact options above.');
  }

  return responseJson({ ok: true, redirect: SUCCESS_REDIRECT }, 202);
}

export function createEnquiryWorker({ fetch: requestFetch = globalThis.fetch } = {}) {
  return {
    async fetch(request, env) {
      const url = new URL(request.url);
      if (url.pathname !== API_PATH) return env.ASSETS.fetch(request);
      if (request.method !== 'POST') {
        return fail(405, 'method_not_allowed', 'Method not allowed.', { Allow: 'POST' });
      }
      return handleEnquiry(request, env, requestFetch);
    }
  };
}

export default createEnquiryWorker();
