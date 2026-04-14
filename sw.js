// LiberiaFront Service Worker
// Enables offline mode and app-like caching

const CACHE_NAME = 'liberiafront-v1';
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/src/style.css',
  '/src/app.js',
  '/src/data/articles.js',
  '/manifest.json',
  'https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=Source+Serif+4:ital,wght@0,300;0,400;0,600;1,400&family=JetBrains+Mono:wght@400;500&display=swap'
];

// Install: cache all static assets
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(STATIC_ASSETS).catch(() => {});
    })
  );
  self.skipWaiting();
});

// Activate: clean up old caches
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))
      )
    )
  );
  self.clients.claim();
});

// Fetch: cache-first for static assets, network-first for API
self.addEventListener('fetch', event => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-GET requests
  if (request.method !== 'GET') return;

  // For image requests: cache with fallback
  if (request.destination === 'image') {
    event.respondWith(
      caches.open(CACHE_NAME).then(async cache => {
        const cached = await cache.match(request);
        if (cached) return cached;
        try {
          const response = await fetch(request);
          if (response.ok) cache.put(request, response.clone());
          return response;
        } catch {
          return new Response('', { status: 404 });
        }
      })
    );
    return;
  }

  // For everything else: network first, fall back to cache
  event.respondWith(
    fetch(request)
      .then(response => {
        if (response.ok) {
          const clone = response.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(request, clone));
        }
        return response;
      })
      .catch(() => caches.match(request).then(r => r || fetch(request)))
  );
});

// Background sync: when back online, trigger feed refresh
self.addEventListener('sync', event => {
  if (event.tag === 'refresh-feed') {
    event.waitUntil(
      self.clients.matchAll().then(clients =>
        clients.forEach(client => client.postMessage({ type: 'REFRESH_FEED' }))
      )
    );
  }
});

// Push notifications for breaking news
self.addEventListener('push', event => {
  const data = event.data ? event.data.json() : {};
  event.waitUntil(
    self.registration.showNotification(data.title || 'LiberiaFront', {
      body: data.body || 'New story from Liberia',
      icon: '/icons/icon-192.png',
      badge: '/icons/badge-72.png',
      tag: 'breaking-news',
      data: { url: data.url || '/' }
    })
  );
});

self.addEventListener('notificationclick', event => {
  event.notification.close();
  event.waitUntil(
    clients.openWindow(event.notification.data.url)
  );
});
