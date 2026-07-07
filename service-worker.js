const CACHE_NAME = "dra-jessica-site-v7";

const PRECACHE_URLS = [
  "/",
  "/index.html",
  "/politica-privacidade.html",
  "/site.webmanifest",
  "/robots.txt",
  "/sitemap.xml",
  "/assets/icons/favicon.png",
  "/assets/icons/favicon.svg",
  "/assets/icons/favicon-32.png",
  "/assets/icons/apple-touch-icon.png",
  "/assets/icons/favicon-192.png",
  "/assets/icons/favicon-512.png",
  "/assets/branding/logo-jd-preto.png",
  "/assets/branding/logo-jd-branco.png",
  "/assets/images/og-image.png",
  "/assets/images/portraits/dra-jessica-daniela.jpg",
  "/assets/images/portraits/dra-jessica-atendimento-premium.jpg",
  "/assets/images/portraits/dra-jessica-jaleco.jpeg",
  "/assets/images/clinic/fachada-clinica-premium.jpg",
  "/assets/images/treatments/atendimento-hof.jpeg",
  "/assets/images/treatments/tratamento-reabilitacao.jpeg",
  "/assets/images/treatments/tratamento-ortodontia.jpeg",
  "/assets/images/treatments/tratamento-clinica-geral.jpeg",
  "/assets/images/treatments/odontopediatria-atendimento.jpg",
  "/assets/images/cases/caso-sorriso-01.jpeg",
  "/assets/images/cases/caso-sorriso-02.jpeg",
  "/assets/images/cases/caso-sorriso-03.jpeg",
  "/assets/images/cases/caso-sorriso-04.jpeg",
  "/assets/images/cases/caso-hof-01.jpeg",
  "/assets/images/cases/caso-hof-02.jpeg",
  "/assets/images/lenses/lente-resina-caso-01.jpeg",
  "/assets/images/lenses/lente-resina-caso-02.jpeg",
  "/assets/images/lenses/lente-resina-caso-03.jpeg",
  "/assets/images/lenses/lente-resina-caso-04.jpeg",
  "/assets/images/lenses/lente-resina-caso-05.jpeg",
  "/assets/images/lenses/lente-resina-caso-06.jpeg"
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(PRECACHE_URLS))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(
        keys
          .filter(key => key !== CACHE_NAME)
          .map(key => caches.delete(key))
      ))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", event => {
  const request = event.request;
  const url = new URL(request.url);

  if (request.method !== "GET" || url.origin !== self.location.origin) return;

  if (request.mode === "navigate") {
    event.respondWith(
      fetch(request)
        .then(response => {
          const copy = response.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(request, copy));
          return response;
        })
        .catch(() => caches.match(request).then(response => response || caches.match("/index.html")))
    );
    return;
  }

  event.respondWith(
    caches.match(request).then(cached => {
      if (cached) return cached;

      return fetch(request).then(response => {
        if (!response || response.status !== 200 || response.type !== "basic") {
          return response;
        }

        const copy = response.clone();
        caches.open(CACHE_NAME).then(cache => cache.put(request, copy));
        return response;
      });
    })
  );
});
