// Simple service worker for offline support
const CACHE_NAME = 'dream-os-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/booking.html',
  '/admin.html',
  '/assets/css/dream-os.css',
  '/assets/css/forms.css',
  '/assets/js/app.js',
  '/assets/js/booking.js',
  '/assets/js/storage.js',
  '/manifest.json'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});
