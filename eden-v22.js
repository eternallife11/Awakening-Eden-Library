(() => {
  "use strict";
  const ready = (fn) => document.readyState === "loading"
    ? document.addEventListener("DOMContentLoaded", fn, { once:true }) : fn();
  ready(() => {
    document.documentElement.classList.add("ae-v22-ready");
    document.querySelectorAll(".reveal").forEach(el => el.classList.add("in"));
    const menu = document.querySelector(".eden-mobile-menu");
    if (menu) {
      const sync = () => {
        document.body.classList.toggle("eden-menu-open", menu.open);
        menu.querySelector("summary")?.setAttribute("aria-expanded", String(menu.open));
      };
      menu.addEventListener("toggle", sync);
      menu.querySelectorAll("a").forEach(a => a.addEventListener("click", () => menu.open=false));
      document.addEventListener("click", e => { if(menu.open && !menu.contains(e.target)) menu.open=false; });
      document.addEventListener("keydown", e => { if(e.key==="Escape" && menu.open) menu.open=false; });
      sync();
    }
    document.querySelectorAll('a[target="_blank"]').forEach(link => {
      link.rel = "noopener noreferrer";
    });
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.getRegistrations().then(regs => regs.forEach(r => r.unregister()));
    }
  });
})();