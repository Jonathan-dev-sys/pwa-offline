const CACHE_NAME = `pwa-cache-${Date.now()}`;
const FILES_TO_CACHE = [
    '/', // Página raíz (index.html por defecto)
    '/index.html', // Archivo HTML principal
    '/manifest.json', // Manifest de la PWA (configuración de la app)
    '/imágenes/icon-192x192.png', // Icono de 192x192 (para pantallas
    '/imágenes/icon-512x512.png' // Icono de 512x512 (para pantallas más
    ];
    self.addEventListener('install', (event) => {
        event.waitUntil(
            caches.open(CACHE_NAME)
.then((cache) => {
    console.log('Archivos enviados a caché correctamente');
    return cache.addAll(FILES_TO_CACHE);
})
);
});
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheName !== CACHE_NAME) {
                        console.log('Caché antigua eliminada');
                        return caches.delete(cacheName);
                    }
                })
                );
                })
                );
                });
                self.addEventListener('fetch', (event) => {
                    event.respondWith(
                        caches.match(event.request)
.then((response) => {
    return response || fetch(event.request);
})
);
});