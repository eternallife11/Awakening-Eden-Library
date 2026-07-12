const CACHE = "awakening-eden-v21-5";
const CORE = [
  "/", "/index.html", "/offline.html", "/eden-brand-v21.css", "/eden-v21.js",
  "/manifest.webmanifest", "/eden-hero-v21-4.css", "/eden-botanicals-v21-5.css", "/eden-hero-community-v21-4.webp", "/eden-logo-tree-heart.svg", "/eden-icon-192.png", "/eden-icon-512.png",
  "/Awakening-Regeneration.html", "/awakening_eden_regenerative_film_resource_library_updated.html",
  "/links.html"
];
self.addEventListener("install", (event) => {
  event.waitUntil(caches.open(CACHE).then((cache) => cache.addAll(CORE)).then(() => self.skipWaiting()));
});
self.addEventListener("activate", (event) => {
  event.waitUntil(caches.keys().then((keys) => Promise.all(
    keys.filter((key) => key.startsWith("awakening-eden-") && key !== CACHE).map((key) => caches.delete(key))
  )).then(() => self.clients.claim()));
});
self.addEventListener("fetch", (event) => {
  const request = event.request;
  if (request.method !== "GET") return;
  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;
  if (request.mode === "navigate") {
    event.respondWith(fetch(request).then((response) => {
      const copy = response.clone();
      caches.open(CACHE).then((cache) => cache.put(request, copy));
      return response;
    }).catch(async () => (await caches.match(request)) || caches.match("/offline.html")));
    return;
  }
  if (/\.(?:css|js|png|jpg|jpeg|webp|svg|ico|webmanifest)$/i.test(url.pathname)) {
    event.respondWith(caches.match(request).then((cached) => cached || fetch(request).then((response) => {
      const copy = response.clone();
      caches.open(CACHE).then((cache) => cache.put(request, copy));
      return response;
    })));
  }
});
