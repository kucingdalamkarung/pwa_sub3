const CACHE_NAME = "football-app-v1";
const URLsToCache = [
    "/",
    "/index.html",
    "/manifest.json",
    "/nav.html",
    "/player.html",
    "/push.js",
    "/sw.js",
    "/team.html",
    "/pages/favorite.html",
    "/pages/home.html",
    "/pages/match.html",
    "/src/css/materialize.css",
    "/src/css/materialize.min.css",
    "/src/js/api.js",
    "/src/js/db.js",
    "/src/js/idb.js",
    "/src/js/materialize.js",
    "/src/js/materialize.min.js",
    "/src/js/nav.js",
    "/src/images/favicon.ico",
    "/src/images/icons/icon-72x72.png",
    "/src/images/icons/icon-96x96.png",
    "/src/images/icons/icon-128x128.png",
    "/src/images/icons/icon-144x144.png",
    "/src/images/icons/icon-152x152.png",
    "/src/images/icons/icon-192x192.png",
    "/src/images/icons/icon-384x384.png",
    "/src/images/icons/icon-512x512.png"
];

self.addEventListener("fetch", function (event) {
    const base_url = "https://api.football-data.org/v2/";

    if (event.request.url.indexOf(base_url) > -1) {
        event.respondWith(
            caches.open(CACHE_NAME).then(function (cache) {
                return fetch(event.request).then(function (response) {
                    cache.put(event.request.url, response.clone());
                    return response;
                })
            })
        );
    } else {
        event.respondWith(
            caches.match(event.request, {ignoreSearch: true}).then(function (response) {
                return response || fetch(event.request);
            })
        )
    }
});

self.addEventListener("install", function (event) {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(URLsToCache);
        })
    );
});

self.addEventListener("activate", function (event) {
    event.waitUntil(
        caches.keys().then(function (cacheNames) {
            return Promise.all(
                cacheNames.map(function (cacheName) {
                    if (cacheName !== CACHE_NAME) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});

self.addEventListener("push", function (event) {
    let body;
    if (event.data) {
        body = event.data.text();
    } else {
        body = 'Push message no payload';
    }
    const options = {
        body: body,
        icon: 'img/notification.png',
        vibrate: [100, 50, 100],
        data: {
            dateOfArrival: Date.now(),
            primaryKey: 1
        }
    };

    event.waitUntil(
        self.registration.showNotification('Push Notification', options)
    );
})