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

    // Final visual lock: use the approved painted Tree-Heart roundel in compact brand positions.
    // Older flat/vector marks remain only as archival fallbacks in source documents.
    document.querySelectorAll(".brand img, .footer-brand img").forEach((mark) => {
      mark.src = "/assets/brand/awakening-eden-mark-painted-192.webp";
      mark.removeAttribute("srcset");
    });

    // Final community vision lock. The approved artwork keeps the intergenerational
    // people-circle while placing the exact twelve-fold Lotus organically in the
    // lower root/vine medallion, rather than as a large central overlay.
    const communityVision = document.querySelector(".invitation-section--opening-vision .invitation-film--vision picture");
    if (communityVision) {
      const source = communityVision.querySelector("source");
      const image = communityVision.querySelector("img");
      if (source) {
        source.type = "image/webp";
        source.srcset = "/assets/hero/awakening-eden-regenerative-future-community-v1-960.webp 960w, /assets/hero/awakening-eden-regenerative-future-community-v1.webp 1448w";
        source.sizes = "(min-width: 60rem) 48vw, 92vw";
      }
      if (image) {
        image.src = "/assets/hero/awakening-eden-regenerative-future-community-v1.webp";
        image.srcset = "/assets/hero/awakening-eden-regenerative-future-community-v1-960.webp 960w, /assets/hero/awakening-eden-regenerative-future-community-v1.webp 1448w";
        image.sizes = "(min-width: 60rem) 48vw, 92vw";
        image.width = 1448;
        image.height = 1086;
        image.alt = "Painted intergenerational community circle in a flourishing regenerative landscape, joined by living roots and vines with the exact twelve-fold Lotus of Life organically anchored at the bottom";
      }
    }

    // Reveal-on-load for pages using the .reveal pattern (Living Library cards)
    document.querySelectorAll(".reveal").forEach((el) => el.classList.add("in"));

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
