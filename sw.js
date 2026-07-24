const CACHE_NAME = 'kindergarten-card-v1';
const urlsToCache = [
  './',
  './index.html',
  './manifest.json',
  './1000073981.jpg',
  './1000073983.jpg',
  './1000073984.jpg',
  './icon-192.png',
  './icon-512.png'
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
