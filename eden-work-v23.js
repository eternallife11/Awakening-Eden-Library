(() => {
  "use strict";

  const ready = (fn) => document.readyState === "loading"
    ? document.addEventListener("DOMContentLoaded", fn, { once: true })
    : fn();

  ready(() => {
    const boards = document.querySelectorAll(".board-figure > img, .become-card--board > img");
    if (boards.length && typeof HTMLDialogElement === "function") {
      const dialog = document.createElement("dialog");
      dialog.className = "board-lightbox";
      const full = document.createElement("img");
      full.alt = "";
      const close = document.createElement("button");
      close.type = "button";
      close.className = "board-lightbox__close";
      close.textContent = "Close";
      close.addEventListener("click", () => dialog.close());
      dialog.append(close, full);
      dialog.addEventListener("click", (event) => {
        if (event.target === dialog) dialog.close();
      });
      document.body.appendChild(dialog);

      boards.forEach((board) => {
        const trigger = document.createElement("button");
        trigger.type = "button";
        trigger.className = "board-zoom";
        trigger.setAttribute("aria-label", `Expand board: ${board.alt}`);
        board.parentNode.insertBefore(trigger, board);
        trigger.appendChild(board);
        trigger.addEventListener("click", () => {
          full.src = board.currentSrc || board.src;
          full.alt = board.alt;
          dialog.showModal();
        });
      });
    }

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
