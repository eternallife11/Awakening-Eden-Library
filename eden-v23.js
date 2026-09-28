(() => {
  "use strict";

  const ready = (fn) => document.readyState === "loading"
    ? document.addEventListener("DOMContentLoaded", fn, { once: true })
    : fn();

  ready(() => {
    const campaignParams = new URLSearchParams(window.location.search);
    ["utm_source", "utm_medium", "utm_campaign", "utm_content"].forEach((key) => {
      const value = campaignParams.get(key);
      if (!value) return;
      try { sessionStorage.setItem(`awakening_eden_${key}`, value); } catch (_) { /* storage is optional */ }
    });

    // Brand assets live in each page's HTML source of truth. Do not replace
    // canonical primary/reversed vector marks with a legacy raster at runtime.

    const isHomepage = window.location.pathname === "/" || window.location.pathname === "/index.html";

    if (isHomepage) {
      document.body.classList.add("final-home-polish");

      // Visual content is intentionally owned by index.html + the current
      // design stylesheets. Older runtime image/copy swaps caused approved
      // artwork to be silently replaced after page load.
      if (!document.querySelector('link[href^="/eden-home-final.css"]')) {
        const stylesheet = document.createElement("link");
        stylesheet.rel = "stylesheet";
        stylesheet.href = "/eden-home-final.css?v=2026-09-28.1";
        document.head.appendChild(stylesheet);
      }
    }

    // Reveal-on-load for pages using the .reveal pattern.
    document.querySelectorAll(".reveal").forEach((el) => el.classList.add("in"));

    // Accessible mobile navigation.
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
      document.addEventListener("keydown", (event) => {
        if (event.key === "Escape" && nav.dataset.open === "true") {
          setOpen(false);
          button.focus();
        }
      });
      document.addEventListener("click", (event) => {
        if (nav.dataset.open === "true" && !nav.contains(event.target) && !button.contains(event.target)) {
          setOpen(false);
        }
      });
    }

    document.querySelectorAll('a[target="_blank"]').forEach((link) => {
      link.rel = "noopener noreferrer";
    });

    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.getRegistrations().then((registrations) => registrations.forEach((registration) => registration.unregister()));
    }
  });
})();
