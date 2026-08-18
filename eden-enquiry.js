(() => {
  'use strict';

  const ready = (fn) => document.readyState === 'loading'
    ? document.addEventListener('DOMContentLoaded', fn, { once: true })
    : fn();

  function showStatus(status, message, state = 'pending') {
    if (!status) return;
    status.hidden = false;
    status.dataset.status = state;
    status.textContent = message;
  }

  ready(() => {
    const form = document.querySelector('[data-land-enquiry-form][data-cloudflare-enquiry-endpoint]');
    if (!form) return;

    const endpoint = form.dataset.cloudflareEnquiryEndpoint;
    const status = form.querySelector('[data-enquiry-status]');
    const submit = form.querySelector('[type="submit"]');
    if (!endpoint || !submit) return;

    form.addEventListener('submit', async (event) => {
      if (!form.checkValidity()) return;
      event.preventDefault();

      const verification = form.elements.namedItem('turnstile-token');
      if (!(verification instanceof HTMLInputElement) || !verification.value) {
        showStatus(status, 'Please complete the verification before sending your enquiry.', 'error');
        return;
      }

      submit.disabled = true;
      submit.setAttribute('aria-busy', 'true');
      showStatus(status, 'Sending your land story…');

      try {
        const payload = Object.fromEntries(new FormData(form).entries());
        const response = await fetch(endpoint, {
          method: 'POST',
          credentials: 'same-origin',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(payload)
        });
        const result = await response.json().catch(() => null);

        if (response.ok && result?.ok === true && result.redirect === '/project-enquiry-thank-you.html') {
          window.location.assign(result.redirect);
          return;
        }

        showStatus(
          status,
          result?.message || 'We could not send your enquiry just now. Please try again or use the direct contact options above.',
          'error'
        );
      } catch {
        showStatus(status, 'We could not send your enquiry just now. Please try again or use the direct contact options above.', 'error');
      } finally {
        submit.disabled = false;
        submit.removeAttribute('aria-busy');
      }
    });
  });
})();
