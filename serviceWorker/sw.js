// use a cacheName for cache versioning
var CACHE_NAME = 'my-site-cache-v1';
var urlsToCache = [
    '/',
    '/css/style.css'
];

// during the install phase you usually want to cache static assets
self.addEventListener('install', function(event) {
    // once the SW is installed, go ahead and fetch the resources to make this work offline
    event.waitUntil(
        caches.open(CACHE_NAME)
        .then(function(cache) {
            console.log('Opened cache');
            return cache.addAll(urlsToCache);
        })
    );
});

// when the browser fetches a url
self.addEventListener('fetch', function(event) {
    // either respond with the cached object or go ahead and fetch the actual url
    event.respondWith(
        caches.match(event.request).then(function(response) {
            if (response) {
                // retrieve from cache
                return response;
            }
            // fetch as normal
            return fetch(event.request);
        })
    );
});