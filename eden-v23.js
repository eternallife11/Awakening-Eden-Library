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

      // Copy, primary actions and approved artwork are authored in index.html.

      // Bring back the richer hand-drawn library-card language. The routes and
      // accessible text stay current; these artworks are decorative visual anchors.
      const libraryCards = Array.from(document.querySelectorAll(".library-grid .library-room"));
      const illustratedCards = [
        { index: 0, src: "/library-guide-v19.webp", position: "center 42%" },
        { index: 1, src: "/library-films-v19.webp", position: "center" },
        { index: 7, src: "/library-books-v19.webp", position: "center" }
      ];

      illustratedCards.forEach(({ index, src, position }) => {
        const card = libraryCards[index];
        if (!card || card.querySelector(".library-room__art")) return;
        card.classList.add("library-room--illustrated");
        const art = document.createElement("img");
        art.className = "library-room__art";
        art.src = src;
        art.alt = "";
        art.setAttribute("aria-hidden", "true");
        art.loading = "lazy";
        art.decoding = "async";
        art.style.objectPosition = position;
        card.prepend(art);
      });
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
