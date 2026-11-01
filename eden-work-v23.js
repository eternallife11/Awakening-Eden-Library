(() => {
  "use strict";

  const ready = (fn) => document.readyState === "loading"
    ? document.addEventListener("DOMContentLoaded", fn, { once: true })
    : fn();

  ready(() => {
    const revealHashTarget = () => {
      const id = window.location.hash.slice(1);
      let decoded;
      try { decoded = decodeURIComponent(id); } catch { return; }
      const target = document.getElementById(decoded);
      if (!target) return;
      let node = target;
      while (node) {
        if (node.tagName === "DETAILS") node.open = true;
        node = node.parentElement;
      }
      window.requestAnimationFrame(() => target.scrollIntoView({ block: "start" }));
    };

    revealHashTarget();
    window.addEventListener("hashchange", revealHashTarget);

    // Final 2026-09 service hierarchy and visual lock.
    // Keep the page focused on regenerative land work: one accessible front door,
    // one whole-property pathway, then implementation support. Brand assets live
    // in the HTML source of truth and must not be replaced at runtime.

    // Service copy, package hierarchy, prices and CTAs now live in the HTML source of truth.
    // Do not rewrite them at runtime: this keeps desktop/mobile QA, search metadata and
    // what visitors actually see aligned with the approved Work with Benjy page.



    const form = document.querySelector("[data-land-enquiry-form]");
    if (!form) return;

    const trackingKeys = ["utm_source", "utm_medium", "utm_campaign", "utm_content"];
    const params = new URLSearchParams(window.location.search);

    trackingKeys.forEach((key) => {
      const incoming = params.get(key);
      if (incoming) {
        try { sessionStorage.setItem(`awakening_eden_${key}`, incoming); } catch (_) { /* storage is optional */ }
      }
      let value = incoming || "";
      if (!value) {
        try { value = sessionStorage.getItem(`awakening_eden_${key}`) || ""; } catch (_) { /* storage is optional */ }
      }
      const input = form.elements.namedItem(key);
      if (input) input.value = value;
    });

    const referrer = form.elements.namedItem("referrer");
    const landingPage = form.elements.namedItem("landing_page");
    if (referrer) referrer.value = document.referrer || "Direct / unknown";
    if (landingPage) landingPage.value = window.location.href;

    // Email-draft delivery on the free static website. The Cloudflare worker
    // exists in this repo, but a full Turnstile + API submission flow has not
    // been configured/verified for production. Never suggest this form has
    // successfully sent a message merely because the submit button was clicked.
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      if (!form.reportValidity()) return;
      const fields = [
        ["Name", "name"],
        ["Email", "email"],
        ["WhatsApp / phone", "whatsapp-or-phone"],
        ["Preferred reply", "preferred-contact"],
        ["Location", "location"],
        ["Property type", "property-type"],
        ["Approximate size", "property-size"],
        ["Primary challenge", "primary-challenge"],
        ["Service interest", "service-interest"],
        ["Start timeframe", "start-timeframe"],
        ["Vision and challenge", "vision-and-challenge"],
        ["Photos / map / video", "photos-or-map-link"]
      ];
      const values = fields.map(([label, name]) => {
        const input = form.elements.namedItem(name);
        return label + ": " + (input && "value" in input ? input.value.trim() : "");
      });
      const subject = "Awakening Eden land project enquiry";
      const body = "Hi Benjy! I'd love to tell you about my project.\n\n"
        + values.join("\n\n") + "\n\nThank you!";
      const url = "mailto:regenerativeeden@gmail.com?subject="
        + encodeURIComponent(subject) + "&body=" + encodeURIComponent(body);
      const hint = document.getElementById("land-enquiry-delivery-hint");
      if (hint) hint.textContent = "Your email app should open with the message ready. Please press Send there. If nothing opens, contact regenerativeeden@gmail.com or use WhatsApp.";
      window.location.href = url;
    });

    const serviceSelect = form.elements.namedItem("service-interest");
    document.querySelectorAll("[data-enquiry-service]").forEach((link) => {
      link.addEventListener("click", () => {
        if (!serviceSelect) return;
        const requested = link.getAttribute("data-enquiry-service");
        const option = Array.from(serviceSelect.options).find((item) => item.text === requested);
        if (option) serviceSelect.value = option.value || option.text;
      });
    });
  });
})();
