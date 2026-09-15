(() => {
  "use strict";

  const ready = (fn) => document.readyState === "loading"
    ? document.addEventListener("DOMContentLoaded", fn, { once: true })
    : fn();

  ready(() => {
    const revealHashTarget = () => {
      if (window.location.hash !== "#implementation") return;
      const implementation = document.getElementById("implementation");
      if (!implementation) return;
      implementation.open = true;
      window.requestAnimationFrame(() => implementation.scrollIntoView({ block: "start" }));
    };

    revealHashTarget();
    window.addEventListener("hashchange", revealHashTarget);

    // Final 2026-09 service hierarchy and visual lock.
    // Keep the page focused on regenerative land work: one accessible front door,
    // one whole-property pathway, then implementation support.
    document.querySelectorAll(".brand img, .footer-brand img").forEach((mark) => {
      mark.src = "assets/brand/awakening-eden-mark-primary.svg";
      mark.removeAttribute("srcset");
    });

    const heroRhythm = document.querySelector(".vnext-hero__rhythm");
    if (heroRhythm) {
      heroRhythm.textContent = "Most people arrive with the same feeling: they can see what their place could become, and they have no idea what to do first. These ways of working exist to give you that order, so the first things you do make everything after them easier.";
    }

    const offersHeading = document.querySelector(".vnext-offers .vnext-section-heading .eyebrow");
    if (offersHeading) offersHeading.textContent = "A clear way to begin";

    const offers = Array.from(document.querySelectorAll(".vnext-offer-stack .vnext-offer"));
    const clarity = offers[0];
    const focusedRoadmap = offers[1];
    const wholeProperty = offers[2];

    if (clarity) {
      const title = clarity.querySelector("h3");
      if (title) title.textContent = "Land & Project Clarity Session";
      const duration = Array.from(clarity.querySelectorAll("li")).find((item) => item.textContent.includes("75 minutes"));
      if (duration) duration.textContent = "45–60 minutes together on video, with preparation done before we meet";
      const action = clarity.querySelector(".vnext-offer__action .button");
      if (action) {
        action.textContent = "Book the €111 Clarity Session";
        action.href = "mailto:regenerativeeden@gmail.com?subject=Book%20my%20%E2%82%AC111%20Land%20%26%20Project%20Clarity%20Session&body=Hi%20Benjy%2C%0A%0AI%27d%20like%20to%20book%20the%20%E2%82%AC111%20Land%20%26%20Project%20Clarity%20Session.%0A%0AMy%20land%20or%20project%20is%20near%3A%0AMy%20main%20question%20or%20challenge%3A%0A";
      }
    }

    // Retire the older middle package so the page does not become a pricing maze.
    if (focusedRoadmap) focusedRoadmap.remove();

    if (wholeProperty) {
      const scope = wholeProperty.querySelector(".vnext-offer__scope");
      if (scope) scope.textContent = "Whole property · integrated design + phased action plan";
      const title = wholeProperty.querySelector("h3");
      if (title) title.textContent = "Whole-Property Design + Action Plan";
      const intro = wholeProperty.querySelector(".vnext-offer__for");
      if (intro) intro.textContent = "For a whole quinta, farm, retreat or community project where water, access, soil, trees, food systems, biodiversity and future phases need to work together as one living system.";
      const price = wholeProperty.querySelector(".vnext-offer__price");
      if (price) price.innerHTML = "<small>From</small>€650<span>depending on property size, complexity and level of design detail</span>";
      const outcome = wholeProperty.querySelector(".vnext-offer__outcome");
      if (outcome) outcome.innerHTML = "<span>What changes for you</span>“I can see how the whole property fits together, what belongs where, and what to do first, next and later.”";
      const boundary = wholeProperty.querySelector(".vnext-offer__boundary");
      if (boundary) boundary.innerHTML = "<strong>This is a regenerative concept design and phased action plan.</strong> It can include mapping, zones and sectors, water, soil and biomass strategy, planting concepts, food forests, agroforestry, orchard regeneration, biodiversity, access and implementation priorities. It does not replace licensed engineering, surveying, permitting or construction drawings where those are required.";
      const action = wholeProperty.querySelector(".vnext-offer__action .button");
      if (action) {
        action.textContent = "Discuss a whole-property design";
        action.href = "mailto:regenerativeeden@gmail.com?subject=Whole-Property%20Design%20%2B%20Action%20Plan&body=Hi%20Benjy%2C%0A%0AI%27d%20like%20to%20discuss%20a%20Whole-Property%20Design%20%2B%20Action%20Plan.%0A%0AThe%20property%20is%20near%3A%0AOur%20vision%20for%20the%20place%3A%0A";
      }
    }

    // The older healthy-home / detox block diluted the land-design page.
    // Keep health and low-EMF material for the wider Living Library instead.
    const supportPanels = document.querySelectorAll(".vnext-support-panels .vnext-support-panel");
    if (supportPanels.length > 1) supportPanels[1].remove();

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
