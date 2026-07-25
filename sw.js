// 請將這行改為全新的版號 (如 v12)
const CACHE_NAME = 'kindergarten-card-v12';

const urlsToCache = [
  './',
  './index.html',
  './manifest.json',
  './1000073981.png',
  './1000073983.png',
  './1000073984.png',
  './1784874155351.png',
  './1784874240076.png',
  './1784876186703_2.png',
  './1784875917011_2.png',
  './icon-192.png',
  './icon-512.png',
  // 新增 jsPDF 外部資源，確保離線時也能產生 PDF
  'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js'
];

self.addEventListener('install', event => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cache => {
          if (cache !== CACHE_NAME) {
            return caches.delete(cache);
          }
        })
      );
    })
  );
  return self.clients.claim();
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});
