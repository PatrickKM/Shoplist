// Installing a service worker, with the name shoplist-cache
self.addEventListener('install', function (e) {
    e.waitUntil(
        caches.open('shoplist-cache').then(function (cache) {
            return cache.addAll([
                '/Shoplist/',
                '/Shoplist/index.html',
                '/Shoplist/style.css',
                '/Shoplist/script.js',
                '/Shoplist/offline.html'
            ]);
        })
    );
});

// self.addEventListener('fetch', function (e) 
// {
//     console.log(e.request.url);
//     e.respondWith(
//         caches.match(e.request).then(function (response) {
//             return response || fetch(e.request);
//         })
//     );
// });

self.addEventListener('fetch', event => {
    console.log('Fetch event for ', event.request.url);
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                if (response) {
                    console.log('Found ', event.request.url, ' in cache');
                    return response;
                }
                console.log('Network request for ', event.request.url);
                return fetch(event.request).then(response => {
                    // TODO 4 - Add fetched files to the cache, we first cache the pages then the user viset the pages, if the user is offline
                    return caches.open(staticCacheName).then(function (cache) {
                        cache.put(event.request.url, response.clone())
                        return response;
                    })
                })


            }).catch(error => {

                // TODO 6 - Respond with custom offline page
                console.log('Error, ', error);
                return caches.match('/Shoplist/offline.html');

            })
    );
});