// 請將原本的 kindergarten-card-v1 改成 v2
const CACHE_NAME = 'kindergarten-card-v2';

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
  // 強制跳過等待，讓新的 Service Worker 立即生效
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('activate', event => {
  // 清除舊版本的快取 (v1)
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
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});
