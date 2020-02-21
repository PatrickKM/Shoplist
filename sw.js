// Installing a service worker, with the name shoplist-cache
self.addEventListener('install', function (e) {
    e.waitUntil(
        caches.open('shoplist-cache').then(function (cache) {
            return cache.addAll([
                '/',
                'index.html',
                'css/style.css',
                'js/script.js'
            ]);
        })
    );
});

self.addEventListener('fetch', function (e) {
    console.log(e.request.url);
    e.respondWith(
        caches.match(e.request).then(function (response) {
            return response || fetch(e.request);
        })
    );
});