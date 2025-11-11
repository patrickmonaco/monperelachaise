// === Service Worker Mon Père Lachaise ===
// Version du cache (change ce numéro à chaque mise à jour)
const CACHE_NAME = "pwa-cache-v10.95";
const ASSETS = [
  "./",
  "./index.html",
  "./manifest.webmanifest",
  "./icons/icone_pl_192.png",
  "./icons/icone_pl_512.png",
  "./data.json"
];

// Installation : on met en cache les fichiers essentiels
self.addEventListener("install", event => {
  self.skipWaiting(); // pour prendre la main immédiatement
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS))
  );
});

// Activation : on supprime les anciens caches
self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    )
  );
  return self.clients.claim();
});

// Fetch : stratégie "Network first, cache fallback"
self.addEventListener("fetch", event => {
  const req = event.request;
  const url = new URL(req.url);

  // éviter de mettre en cache les appels vers Wikidata/Wikipedia
  if (/wikidata|wikipedia|maps|navigation/.test(url.hostname)) return;

  event.respondWith(
    fetch(req)
      .then(resp => {
        // on met à jour le cache pour la prochaine fois
        const clone = resp.clone();
        caches.open(CACHE_NAME).then(cache => cache.put(req, clone));
        return resp;
      })
      .catch(() => caches.match(req).then(r => r || caches.match("./index.html")))
  );
});

// Réception de message depuis la page (skipWaiting)
self.addEventListener("message", event => {
  if (event.data && event.data.action === "skipWaiting") {
    self.skipWaiting();
  }
});
































































































