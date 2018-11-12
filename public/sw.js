const CACHE_NAME = "hacker_news_api";
const API_DELAY = 2000;

const wait = ms => new Promise(r => setTimeout(r, ms));

self.addEventListener("fetch", event => {
  event.respondWith(
    (async () => {
      const isCacheTarget =
        event.request.url.indexOf("hacker-news.firebaseio.com") !== -1;
      if (!isCacheTarget) {
        return fetch(event.request);
      }
      const response = await caches.match(event.request);
      if (response) {
        await wait(API_DELAY);
        return response;
      }
      const res = await fetch(event.request);
      const cache = await caches.open(CACHE_NAME);
      await cache.put(event.request.url, res.clone());
      return res;
    })()
  );
});
