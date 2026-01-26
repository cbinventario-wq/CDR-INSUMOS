// Service Worker para PWA
const CACHE_NAME = 'cdr-almacen-v1';

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll([
        '/CDR-INSUMOS/',
        '/CDR-INSUMOS/index.html',
        '/CDR-INSUMOS/logo.png'
      ]);
    })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
