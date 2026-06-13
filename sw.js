const CACHE_NAME = 'meherin-diet-offline-v4';
const assets = [
  './',
  './index.html',
  './photo1.jpg',
  './photo2.jpg'
];

// ১. নতুন ফাইল আসার সাথে সাথে পুরোনো সার্ভিস ওয়ার্কারকে জোর করে সরিয়ে দেবে
self.addEventListener('install', e => {
  self.skipWaiting(); 
  e.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(assets);
    })
  );
});

// ২. অ্যাক্টিভেট হওয়ার সময় পুরোনো v1, v2, v3 এর আবর্জনা ফাইল ডিলিট করে দেবে
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.map(key => {
          if (key !== CACHE_NAME) {
            return caches.delete(key); // শুধু ফাইল মুছবে, মেহেরিনের ডাটা থাকবে সুরক্ষিত
          }
        })
      );
    })
  );
});

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(cachedResponse => {
      return cachedResponse || fetch(e.request);
    })
  );
});