/* Service worker : RÉSEAU D'ABORD, avec une copie en cache pour le hors-ligne.
   En ligne, on sert toujours la version fraîche du site : pas besoin de toucher
   à ce fichier quand le site change. Seules les requêtes du site lui-même passent
   ici (Firebase, Google… ne sont jamais interceptés). */
const CACHE = "eopourlesnuls-v1";

self.addEventListener("install", () => self.skipWaiting());
self.addEventListener("activate", (e) => e.waitUntil(self.clients.claim()));

self.addEventListener("fetch", (e) => {
  const req = e.request;
  if (req.method !== "GET" || new URL(req.url).origin !== self.location.origin) return;
  e.respondWith((async () => {
    try {
      const rep = await fetch(req);
      if (rep.ok) {
        const copie = rep.clone();
        e.waitUntil(caches.open(CACHE).then((c) => c.put(req, copie)));
      }
      return rep;
    } catch (err) {
      const enCache = await caches.match(req);
      if (enCache) return enCache;
      if (req.mode === "navigate") {
        const accueil = await caches.match(new URL("./", self.location).href);
        if (accueil) return accueil;
      }
      throw err;
    }
  })());
});
