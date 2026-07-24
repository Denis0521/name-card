// 1. 將版本號改為 v2，讓瀏覽器知道有新版本
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
  // 強制讓新的 Service Worker 立即跳過等待
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('activate', event => {
  // 自動刪除舊版的快取 (v1)
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
