const CACHE_NAME = "hacker_news_api";

self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      const isCacheTarget =
        event.request.url.indexOf("hacker-news.firebaseio.com") !== -1;
      if (response & isCacheTarget) {
        return response;
      }
      return fetch(event.request).then(res => {
        if (isCacheTarget) {
          return caches.open(CACHE_NAME).then(cache => {
            cache.put(event.request.url, res.clone());
            return res;
          });
        }
        return res;
      });
    })
  );
});
