/*Installing a service worker, with the name shoplist-cache*/
// self.addEventListener('install', function (e) {
//    e.waitUntil(
//        caches.open('shoplist-cache').then(function (cache) {
//            return cache.addAll([
//                '/',
//                'Shoplist/index.html',
//                'Shoplist/css/style.css',
//                'Shoplist/js/script.js'
//            ]);
//        })
//    );
// });

/*Installing a service worker, with the name shoplist-cache*/
self.addEventListener('install', function (e) {
    e.waitUntil(
        caches.open('shoplist-cache').then(function (cache) {
            return cache.addAll([
                'Shoplist/',
                'Shoplist/index.html',
                'Shoplist/css/style.css',
                'Shoplist/js/script.js'
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