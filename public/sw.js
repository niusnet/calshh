// public/sw.js

// Importar workbox
importScripts('https://storage.googleapis.com/workbox-cdn/releases/6.5.4/workbox-sw.js');

// Configuración básica
workbox.setConfig({
  debug: false // Cambia a true para modo desarrollo
});

const {
  strategies,
  routing,
  cacheableResponse,
  expiration,
  precaching
} = workbox;

// Nombre del cache
const CACHE_NAME = 'my-pwa-cache-v1';

// Precarga de recursos críticos
precaching.precacheAndRoute([
  { url: '/offline.html', revision: '1' },
  { url: '/manifest.json', revision: '1' },
  // Añade aquí otros recursos críticos que quieras precargar
]);

// Estrategia para navegación (páginas HTML)
routing.registerRoute(
  ({ request }) => request.mode === 'navigate',
  new strategies.NetworkFirst({
    cacheName: 'pages-cache',
    plugins: [
      new cacheableResponse.CacheableResponsePlugin({
        statuses: [200]
      }),
      new expiration.ExpirationPlugin({
        maxEntries: 25,
        maxAgeSeconds: 24 * 60 * 60 // 24 horas
      })
    ]
  })
);

// Estrategia para imágenes
routing.registerRoute(
  ({ request }) => request.destination === 'image',
  new strategies.CacheFirst({
    cacheName: 'image-cache',
    plugins: [
      new cacheableResponse.CacheableResponsePlugin({
        statuses: [0, 200]
      }),
      new expiration.ExpirationPlugin({
        maxEntries: 60,
        maxAgeSeconds: 30 * 24 * 60 * 60 // 30 días
      })
    ]
  })
);

// Estrategia para assets estáticos (JS, CSS, fonts)
routing.registerRoute(
  ({ request }) => 
    request.destination === 'script' ||
    request.destination === 'style' ||
    request.destination === 'font',
  new strategies.StaleWhileRevalidate({
    cacheName: 'static-resources',
    plugins: [
      new cacheableResponse.CacheableResponsePlugin({
        statuses: [0, 200]
      }),
      new expiration.ExpirationPlugin({
        maxEntries: 32,
        maxAgeSeconds: 24 * 60 * 60 // 24 horas
      })
    ]
  })
);

// Estrategia para Google Fonts
routing.registerRoute(
  ({url}) => url.origin === 'https://fonts.googleapis.com' || 
             url.origin === 'https://fonts.gstatic.com',
  new strategies.StaleWhileRevalidate({
    cacheName: 'google-fonts',
    plugins: [
      new expiration.ExpirationPlugin({
        maxEntries: 20
      })
    ]
  })
);

// Manejo de fallos de navegación (offline)
workbox.routing.setCatchHandler(async ({ event }) => {
  if (event.request.destination === 'document') {
    return caches.match('/offline.html');
  }
  return Response.error();
});

// Activación del service worker
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Mensaje para skip waiting
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});