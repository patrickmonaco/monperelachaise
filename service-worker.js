const CACHE_NAME = "faceted-pwa-cache-v3.2";
const ASSETS = [
  "./",
  "./index.html",
  "./manifest.webmanifest" 
];
//
//"https://cdn.tailwindcss.com",
  //"https://cdn.jsdelivr.net/npm/fuse.js@6.6.2"

// Installation
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS))
  );
  self.skipWaiting();
});

// Activation (suppression des anciens caches)
self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

// Récupération (cache-first)
self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(resp => resp || fetch(event.request))
  );
});

// Gestion du message "skipWaiting"
self.addEventListener("message", event => {
  if (event.data && event.data.action === "skipWaiting") {
    self.skipWaiting();
  }
});




