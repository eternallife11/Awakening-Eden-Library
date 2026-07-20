(() => {
  "use strict";
  const ready = (fn) => document.readyState === "loading"
    ? document.addEventListener("DOMContentLoaded", fn, { once: true }) : fn();

  ready(() => {
    // Keep campaign attribution while a visitor moves from the welcome page to the enquiry page.
    const campaignParams = new URLSearchParams(window.location.search);
    ["utm_source", "utm_medium", "utm_campaign", "utm_content"].forEach((key) => {
      const value = campaignParams.get(key);
      if (!value) return;
      try { sessionStorage.setItem(`awakening_eden_${key}`, value); } catch (_) { /* storage is optional */ }
    });

    // Accessible mobile navigation
    const button = document.querySelector("[data-menu-button]");
    const nav = document.querySelector("[data-navigation]");
    if (button && nav) {
      const setOpen = (open) => {
        nav.dataset.open = String(open);
        button.setAttribute("aria-expanded", String(open));
      };
      setOpen(false);
      button.addEventListener("click", () => setOpen(nav.dataset.open !== "true"));
      nav.querySelectorAll("a").forEach((a) => a.addEventListener("click", () => setOpen(false)));
      document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && nav.dataset.open === "true") { setOpen(false); button.focus(); }
      });
      document.addEventListener("click", (e) => {
        if (nav.dataset.open === "true" && !nav.contains(e.target) && !button.contains(e.target)) setOpen(false);
      });
    }

    // Harden external links
    document.querySelectorAll('a[target="_blank"]').forEach((link) => {
      link.rel = "noopener noreferrer";
    });

    // Clean up service workers registered by older site versions
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.getRegistrations().then((regs) => regs.forEach((r) => r.unregister()));
    }
  });
})();
