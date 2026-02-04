// Service Worker para PWA
const CACHE_NAME = 'cdr-almacen-v2';

self.addEventListener('install', (event) => {
  self.skipWaiting(); // Forzar activación inmediata
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

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName); // Borrar cachés viejos
          }
        })
      );
    })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    fetch(event.request).then((response) => {
      // Siempre intentar red primero, luego caché
      return caches.open(CACHE_NAME).then((cache) => {
        cache.put(event.request, response.clone());
        return response;
      });
    }).catch(() => {
      // Si falla la red, usar caché
      return caches.match(event.request);
    })
  );
});
