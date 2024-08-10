// service-worker.js
self.addEventListener('install', (event) => {
    event.waitUntil(
      caches.open('texlive-cache').then((cache) => {
        return cache.addAll([
          'https://texlive2.swiftlatex.com/pdftex/26/article.cls',
          // Add more files as needed
        ]);
      })
    );
  });
  
  self.addEventListener('fetch', (event) => {
    if (event.request.url.includes('swiftlatex.com')) {
      event.respondWith(
        caches.match(event.request).then((cachedResponse) => {
          return cachedResponse || fetch(event.request).then((response) => {
            return caches.open('texlive-cache').then((cache) => {
              cache.put(event.request, response.clone());
              return response;
            });
          });
        })
      );
    }
  });
  