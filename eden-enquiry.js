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
    const form = document.querySelector('[data-land-enquiry-form][data-cloudflare-enquiry-endpoint], [data-land-enquiry-form][data-enquiry-draft]');
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
    const draftRecipient = form.dataset.enquiryDraft;
    if ((!endpoint && !draftRecipient) || !submit) return;

    form.addEventListener('submit', async (event) => {
      if (!form.checkValidity()) return;
      event.preventDefault();

      if (draftRecipient) {
        const fields = [
          ['name', 'Name'], ['email', 'Email'], ['whatsapp-or-phone', 'Phone'],
          ['preferred-contact', 'Preferred reply'], ['location', 'Location'],
          ['property-type', 'Property'], ['property-size', 'Size'],
          ['primary-challenge', 'Main priority'], ['service-interest', 'Support requested'],
          ['start-timeframe', 'Timeframe'], ['vision-and-challenge', 'Vision and challenges'],
          ['photos-or-map-link', 'Photos or map']
        ];
        const data = new FormData(form);
        const body = fields.map(([key, label]) => `${label}: ${data.get(key) || 'Not provided'}`).join('\n\n');
        form.querySelector('[data-enquiry-draft-preview]')?.remove();
        const panel = document.createElement('div');
        panel.dataset.enquiryDraftPreview = '';
        const label = document.createElement('label');
        label.htmlFor = 'enquiry-email-draft';
        label.textContent = 'Your enquiry — ready to copy or send';
        const draft = document.createElement('textarea');
        draft.id = 'enquiry-email-draft';
        draft.readOnly = true;
        draft.rows = 12;
        draft.value = body;
        const guidance = document.createElement('p');
        guidance.textContent = `Nothing has been sent yet. Open your email app, review the draft and press Send. You can also copy the text into an email to ${draftRecipient}.`;
        const link = document.createElement('a');
        link.className = 'button button--primary';
        link.textContent = 'Open email draft';
        link.href = `mailto:${draftRecipient}?subject=${encodeURIComponent('My Awakening Eden land story')}&body=${encodeURIComponent(body)}`;
        const copy = document.createElement('button');
        copy.type = 'button';
        copy.className = 'button button--secondary';
        copy.textContent = 'Copy enquiry';
        copy.addEventListener('click', async () => {
          try {
            await navigator.clipboard.writeText(body);
            showStatus(status, 'Copied. Paste your enquiry into an email and send it to Benjy.', 'ready');
          } catch {
            draft.focus();
            draft.select();
            showStatus(status, 'Your enquiry is selected. Copy it and paste it into your email.', 'ready');
          }
        });
        panel.append(label, draft, guidance, link, copy);
        submit.closest('fieldset').append(panel);
        showStatus(status, 'Your email draft is ready. It has not been sent.', 'ready');
        draft.focus({ preventScroll: true });
        panel.scrollIntoView({ behavior: 'smooth', block: 'center' });
        return;
      }

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
