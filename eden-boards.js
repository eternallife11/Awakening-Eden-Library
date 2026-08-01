/*
 * Awakening Eden · Educational board lightbox
 * Shared by the Work With Benjy page and the Living Guides.
 *
 * Progressive enhancement: boards are readable without JavaScript; this adds a
 * keyboard- and touch-accessible expand so the fine printed labels can be read
 * on a phone. No inline script anywhere — the site runs a strict CSP.
 */
(() => {
  "use strict";

  const ready = (fn) => document.readyState === "loading"
    ? document.addEventListener("DOMContentLoaded", fn, { once: true })
    : fn();

  ready(() => {
    const boards = document.querySelectorAll(".board-figure > img, .become-card--board > img");
    if (!boards.length || typeof HTMLDialogElement !== "function") return;

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
  });
})();
