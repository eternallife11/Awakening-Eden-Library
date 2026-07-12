(() => {
  "use strict";
  const onReady = (fn) => document.readyState === "loading"
    ? document.addEventListener("DOMContentLoaded", fn, { once: true })
    : fn();

  onReady(() => {
    const menu = document.querySelector(".eden-mobile-menu");
    if (menu) {
      const syncMenu = () => {
        document.body.classList.toggle("eden-menu-open", menu.open);
        const summary = menu.querySelector("summary");
        if (summary) summary.setAttribute("aria-expanded", String(menu.open));
      };
      menu.addEventListener("toggle", syncMenu);
      menu.querySelectorAll("a").forEach((link) => link.addEventListener("click", () => {
        menu.open = false;
      }));
      document.addEventListener("click", (event) => {
        if (menu.open && !menu.contains(event.target)) menu.open = false;
      });
      document.addEventListener("keydown", (event) => {
        if (event.key === "Escape" && menu.open) {
          menu.open = false;
          menu.querySelector("summary")?.focus();
        }
      });
      syncMenu();
    }

    document.querySelectorAll('a[href^="#"]').forEach((link) => {
      link.addEventListener("click", () => {
        const id = link.getAttribute("href");
        if (id && id.length > 1) history.replaceState(null, "", id);
      });
    });

    if ("serviceWorker" in navigator && location.protocol === "https:") {
      window.addEventListener("load", () => {
        navigator.serviceWorker.register("/sw-v21.js").catch(() => {});
      }, { once: true });
    }

    document.querySelectorAll('a[target="_blank"]').forEach((link) => {
      const rel = new Set((link.getAttribute("rel") || "").split(/\s+/).filter(Boolean));
      rel.add("noopener");
      rel.add("noreferrer");
      link.setAttribute("rel", Array.from(rel).join(" "));
    });
  });
})();
