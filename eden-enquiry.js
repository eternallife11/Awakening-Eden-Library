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

    form.classList.add('js-funnel');

    const steps = Array.from(form.querySelectorAll('[data-form-step]'));
    const progressText = form.querySelector('[data-form-progress-text]');
    const progressDots = Array.from(form.querySelectorAll('[data-progress-dot]'));
    let stepIndex = 0;

    const stepLabels = ['Your land', 'Your vision', 'Contact'];

    const showStep = (index, focus = false) => {
      stepIndex = Math.max(0, Math.min(index, steps.length - 1));
      steps.forEach((step, i) => {
        step.hidden = i !== stepIndex;
        step.setAttribute('aria-hidden', String(i !== stepIndex));
      });
      progressDots.forEach((dot, i) => dot.dataset.active = String(i <= stepIndex));
      if (progressText) progressText.textContent = `Step ${stepIndex + 1} of ${steps.length} · ${stepLabels[stepIndex] || ''}`;
      if (focus) {
        const target = steps[stepIndex]?.querySelector('legend, input, select, textarea');
        if (target instanceof HTMLElement) target.focus({ preventScroll: true });
        form.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    };

    const validateCurrentStep = () => {
      const current = steps[stepIndex];
      if (!current) return true;
      const controls = Array.from(current.querySelectorAll('input, select, textarea'));
      const invalid = controls.find((control) => typeof control.checkValidity === 'function' && !control.checkValidity());
      if (invalid instanceof HTMLElement) {
        invalid.reportValidity?.();
        invalid.focus();
        return false;
      }
      return true;
    };

    form.querySelectorAll('[data-form-next]').forEach((button) => {
      button.addEventListener('click', () => {
        if (!validateCurrentStep()) return;
        showStep(stepIndex + 1, true);
      });
    });

    form.querySelectorAll('[data-form-back]').forEach((button) => {
      button.addEventListener('click', () => showStep(stepIndex - 1, true));
    });

    if (steps.length) showStep(0);

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

        if (response.ok && result?.ok === true && result.redirect === '/work-with-benjy/thank-you') {
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
