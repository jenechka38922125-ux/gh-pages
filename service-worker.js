// Регистрация Service Worker
self.addEventListener('install', event => {
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  clients.claim(); // Захватываем вкладки
});

// Кэширование статических файлов
const CACHE_NAME = 'v1';
const filesToCache = ['./', './index.html', './style.css'];

self.addEventListener('fetch', event => {
  if (!navigator.onLine) { // Если нет интернета
    event.respondWith(
      caches.match(event.request)
        .then(response => response || fetch(event.request))
    );
  } else {
    event.respondWith(fetch(event.request));
  }
});

self.addEventListener('install', function(e) {
  e.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        return cache.addAll(filesToCache);
      })
  );
});