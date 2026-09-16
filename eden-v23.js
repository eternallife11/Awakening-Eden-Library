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

    // Compact identity: the approved painted Tree-Heart roundel.
    document.querySelectorAll(".brand img, .footer-brand img").forEach((mark) => {
      mark.src = "/assets/brand/awakening-eden-mark-painted-192.webp";
      mark.removeAttribute("srcset");
    });

    const isHomepage = window.location.pathname === "/" || window.location.pathname === "/index.html";

    if (isHomepage) {
      document.body.classList.add("final-home-polish");

      if (!document.querySelector('link[href^="/eden-home-final.css"]')) {
        const stylesheet = document.createElement("link");
        stylesheet.rel = "stylesheet";
        stylesheet.href = "/eden-home-final.css?v=2026-09-16.2";
        document.head.appendChild(stylesheet);
      }

      // Opening promise: concise, hopeful and exactly aligned with the final wording.
      const heroPromise = document.querySelector(".hero--welcome .hero-promise");
      if (heroPromise) {
        heroPromise.textContent = "A Living Library for Positive Change, Regeneration, Remembering & Thriving as One.";
      }

      // Keep the opening calm. The full soundtrack remains further down the page.
      document.querySelector(".hero--welcome .hero-soundtrack")?.remove();

      // Lock the approved Benjy + Sofia Tree of Life image directly beneath the welcome.
      const thresholdPicture = document.querySelector(".threshold-section .hero-portal--welcome picture");
      if (thresholdPicture) {
        const source = thresholdPicture.querySelector("source");
        if (source) source.remove();
        const image = thresholdPicture.querySelector("img");
        if (image) {
          image.src = "/assets/hero/welcome-home-benjy-sofia-rooted-lotus-v34-1536.webp";
          image.srcset = "/assets/hero/welcome-home-benjy-sofia-rooted-lotus-v34-768.webp 768w, /assets/hero/welcome-home-benjy-sofia-rooted-lotus-v34-1536.webp 1536w";
          image.sizes = "(min-width: 60rem) 46rem, 92vw";
          image.width = 1536;
          image.height = 1024;
          image.alt = "Benjy and Sofia seated beneath the Awakening Eden Tree of Life, surrounded by living water, roots, plants and hummingbirds";
        }
      }

      // Restore the three primary actions immediately after the Tree image.
      const thresholdContainer = document.querySelector(".threshold-section .container");
      if (thresholdContainer && !thresholdContainer.querySelector(".home-hero-actions")) {
        const actions = document.createElement("nav");
        actions.className = "hero-pathways home-hero-actions";
        actions.setAttribute("aria-label", "Begin exploring Awakening Eden");
        actions.innerHTML = `
          <a class="hero-pathways__primary" href="/start-here">
            <strong>Begin Here</strong>
            <span>Awakening Regeneration</span>
          </a>
          <a href="/living-library">
            <strong>Explore the Living Library</strong>
            <span>Guides · films · books · teachers</span>
          </a>
          <a href="/work-with-benjy">
            <strong>Work with Benjy</strong>
            <span>Regenerate your land</span>
          </a>`;
        thresholdContainer.appendChild(actions);
      }

      // The Tree of Life threshold is the one Benjy + Sofia image on the homepage.
      // Keep the human introduction and journey story, but remove duplicate pair portraits.
      document.querySelector(".founders-welcome__portrait")?.remove();
      document.querySelector(".story-section .story-photos")?.remove();

      const foundersLead = document.querySelector(".founders-welcome__copy .lead");
      if (foundersLead) {
        foundersLead.textContent = "Earth lovers, regenerative educators and lifelong students of life. Awakening Eden is a living home for practical knowledge, regenerative land design, inner renewal and community, created to help inspiration become grounded action.";
      }

      const foundersDivider = document.querySelector(".founders-welcome__divider");
      if (foundersDivider) {
        foundersDivider.src = "/assets/dividers/02-benji-celtic-living-land-hummingbird-720.webp";
        foundersDivider.width = 720;
        foundersDivider.height = 225;
      }

      // Circle of Belonging: use the approved garden-of-harmony composition rather
      // than the later central-disc variant. This is the rooted, organic portal.
      const circleFigure = document.querySelector(".invitation-section--opening-vision .invitation-film--vision");
      if (circleFigure) {
        const picture = circleFigure.querySelector("picture");
        if (picture) {
          const source = picture.querySelector("source");
          if (source) {
            source.type = "image/webp";
            source.srcset = "/assets/hero/garden-of-harmony-community-lotus-vnext-960.webp 960w, /assets/hero/garden-of-harmony-community-lotus-vnext.webp 1672w";
            source.sizes = "(min-width: 60rem) 48vw, 92vw";
          }
          const image = picture.querySelector("img");
          if (image) {
            image.src = "/assets/hero/garden-of-harmony-community-lotus-vnext.webp";
            image.srcset = "/assets/hero/garden-of-harmony-community-lotus-vnext-960.webp 960w, /assets/hero/garden-of-harmony-community-lotus-vnext.webp 1672w";
            image.sizes = "(min-width: 60rem) 48vw, 92vw";
            image.width = 1672;
            image.height = 941;
            image.alt = "An intergenerational community gathered in a flourishing living landscape, with roots and mycelium-like connections meeting the exact twelve-fold Lotus of Life in the ground";
          }
        }
        const captionTitle = circleFigure.querySelector("figcaption strong");
        const captionText = circleFigure.querySelector("figcaption span");
        if (captionTitle) captionTitle.textContent = "A Circle of Belonging";
        if (captionText) {
          captionText.textContent = "People, roots, mycelium and living Earth woven into one field of relationship, with the exact Lotus of Life resting organically in the ground.";
        }
      }

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
