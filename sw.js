const CACHE_NAME = 'currency-exchange-pwa-cache-v1';
const CACHE_URLS = [
    '/',
    '/index.html',
    '/styles.css',
    '/script.js',
    '/manifest.json',
    '/icons/icon-192x192.png',
    '/icons/icon-512x512.png',
];

// インストール時にリソースをキャッシュ
self.addEventListener('install', (event) => {
    console.log('Service Worker インストール中...');
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                console.log('キャッシュを追加しています...');
                return cache.addAll(CACHE_URLS);
            })
    );
});

// アクティベート時に古いキャッシュを削除
self.addEventListener('activate', (event) => {
    console.log('Service Worker アクティブ化...');
    const cacheWhitelist = [CACHE_NAME];

    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (!cacheWhitelist.includes(cacheName)) {
                        console.log(`キャッシュ削除: ${cacheName}`);
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});

// フェッチイベント（リクエストのキャッシュからの取得）
self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request)
            .then((cachedResponse) => {
                // キャッシュにリソースがあればそれを返す
                if (cachedResponse) {
                    return cachedResponse;
                }

                // キャッシュにない場合はネットワークから取得
                return fetch(event.request).then((networkResponse) => {
                    return caches.open(CACHE_NAME).then((cache) => {
                        // 新しいリソースをキャッシュに保存
                        cache.put(event.request, networkResponse.clone());
                        return networkResponse;
                    });
                });
            })
    );
});
