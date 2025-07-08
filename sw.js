// Service Worker for offline functionality
const CACHE_NAME = 'hello-world-v1';
const urlsToCache = [
    '/',
    '/index.html',
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
            .then(response => {
                // Return cached version or fetch from network
                return response || fetch(event.request);
            })
    );
});

// Push notification support
self.addEventListener('push', event => {
    const options = {
        body: 'Thanks for visiting the world\'s best Hello World site! 🌍',
        icon: '/icon-192x192.png',
        badge: '/icon-72x72.png'
    };

    event.waitUntil(
        self.registration.showNotification('Hello World! 👋', options)
    );
});