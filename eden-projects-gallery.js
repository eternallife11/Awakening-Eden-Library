/* Awakening Eden — "Projects Benjy Created" viewer.
 *
 * Nine photographs, one native <dialog>. No library, no auto-rotation, no
 * movement the visitor did not ask for. Without this script the page still
 * shows the six-image preview and a plain list of links to every photograph,
 * so nothing becomes unreachable.
 */
(() => {
  "use strict";

  const ready = (fn) => document.readyState === "loading"
    ? document.addEventListener("DOMContentLoaded", fn, { once: true })
    : fn();

  ready(() => {
    const viewer = document.getElementById("pg-viewer");
    const fallback = document.getElementById("pg-fallback");
    if (!viewer || !fallback || typeof viewer.showModal !== "function") return;

    const items = Array.from(fallback.querySelectorAll("[data-pg-item]")).map((el) => ({
      full: el.dataset.full,
      srcset: el.dataset.srcset,
      width: el.dataset.width,
      height: el.dataset.height,
      alt: el.dataset.alt,
      title: el.dataset.title,
      tail: el.dataset.tail,
    }));
    if (!items.length) return;

    // The plain-link list exists for the no-script case; once the viewer is
    // running it would only repeat what the buttons already offer.
    fallback.hidden = true;

    const img = document.getElementById("pg-viewer-img");
    const count = document.getElementById("pg-viewer-count");
    const caption = document.getElementById("pg-viewer-caption");
    const prevBtn = viewer.querySelector("[data-pg-prev]");
    const nextBtn = viewer.querySelector("[data-pg-next]");
    const closeBtn = viewer.querySelector("[data-pg-close]");

    let index = 0;
    let opener = null;

    const show = (i) => {
      index = (i + items.length) % items.length;
      const item = items[index];
      // Full-size files are requested here, on open — never on page load.
      img.removeAttribute("srcset");
      img.src = item.full;
      img.srcset = item.srcset;
      img.sizes = "(min-width: 60rem) 76vw, 94vw";
      img.width = item.width;
      img.height = item.height;
      img.alt = item.alt;
      count.textContent = `${index + 1} of ${items.length}`;
      caption.innerHTML = `<strong>${item.title}</strong> ${item.tail}`;
    };

    const open = (i, trigger) => {
      opener = trigger || null;
      show(i);
      viewer.showModal();
      document.documentElement.classList.add("pg-open-lock");
      closeBtn.focus();
    };

    // Cleanup is deliberately not hung off the dialog's "close" event alone:
    // some browsers do not deliver it after a scripted close(), which would
    // leave the page scroll-locked and focus stranded inside a hidden dialog.
    const release = () => {
      document.documentElement.classList.remove("pg-open-lock");
      // Send focus back to whatever opened the viewer.
      if (opener && document.contains(opener)) opener.focus();
      opener = null;
    };

    const close = () => {
      if (viewer.open) viewer.close();
      release();
    };

    viewer.addEventListener("close", release);
    viewer.addEventListener("cancel", release);

    document.querySelectorAll(".pg-open, .pg-viewall").forEach((btn) => {
      btn.addEventListener("click", () => open(Number(btn.dataset.index) || 0, btn));
    });

    prevBtn.addEventListener("click", () => show(index - 1));
    nextBtn.addEventListener("click", () => show(index + 1));
    closeBtn.addEventListener("click", close);

    viewer.addEventListener("keydown", (event) => {
      if (event.key === "ArrowLeft") { event.preventDefault(); show(index - 1); }
      if (event.key === "ArrowRight") { event.preventDefault(); show(index + 1); }
      // Take Escape ourselves so the same cleanup runs on every route out.
      if (event.key === "Escape") { event.preventDefault(); close(); }
    });

    // Clicking the backdrop closes, clicking the picture does not.
    viewer.addEventListener("click", (event) => {
      if (event.target === viewer) close();
    });

    // Swipe is an addition to the buttons, never the only way through.
    let startX = null;
    let startY = null;
    viewer.addEventListener("touchstart", (event) => {
      const t = event.changedTouches[0];
      startX = t.clientX;
      startY = t.clientY;
    }, { passive: true });
    viewer.addEventListener("touchend", (event) => {
      if (startX === null) return;
      const t = event.changedTouches[0];
      const dx = t.clientX - startX;
      const dy = t.clientY - startY;
      if (Math.abs(dx) > 45 && Math.abs(dx) > Math.abs(dy)) show(index + (dx < 0 ? 1 : -1));
      startX = startY = null;
    }, { passive: true });
  });
})();
