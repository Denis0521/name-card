// --- SW_START ---
// 將版本號升級至 v6 以包含新增的童話小鎮與夢幻太空主題圖片
const CACHE_NAME = 'kindergarten-card-v6';

const urlsToCache = [
  './',
  './index.html',
  './manifest.json',
  './1000073981.png',
  './1000073983.png',
  './1000073984.png',
  './1784874155351.png',
  './1784874240076.png',
  // 新增主題圖片
  './1784876186703.png',
  './1784875917011.png',
  './icon-192.png',
  './icon-512.png'
];

self.addEventListener('install', event => {
  self.skipWaiting(); // 強制跳過等待，立即啟用新版本
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('activate', event => {
  // 清理舊緩存
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cache => {
          if (cache !== CACHE_NAME) {
            console.log('SW: Cleared old cache:', cache);
            return caches.delete(cache);
          }
        })
      );
    })
  );
  // 讓新版本的 SW 立即控制所有頁面
  return self.clients.claim();
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});
