// D'bo's Count — offline helper. Keeps the app shell on the phone so it
// opens instantly and still opens with no signal in the walk-in. The count
// list and submissions always go to the Apps Script (never cached here).
var CACHE = "dbos-count-v2";
var SHELL = ["./", "index.html", "manifest.webmanifest", "icons/icon-192.png", "icons/icon-512.png", "icons/apple-touch-icon.png"];
self.addEventListener("install", function (e) {
  e.waitUntil(caches.open(CACHE).then(function (c) { return c.addAll(SHELL); }).then(function () { return self.skipWaiting(); }));
});
self.addEventListener("activate", function (e) {
  e.waitUntil(caches.keys().then(function (keys) {
    return Promise.all(keys.filter(function (k) { return k !== CACHE; }).map(function (k) { return caches.delete(k); }));
  }).then(function () { return self.clients.claim(); }));
});
self.addEventListener("fetch", function (e) {
  var url = new URL(e.request.url);
  if (e.request.method !== "GET" || url.origin !== location.origin) return; // Apps Script calls pass straight through
  // Page: try the network first (so updates show up), fall back to the saved copy.
  if (e.request.mode === "navigate") {
    e.respondWith(fetch(e.request).then(function (r) {
      var copy = r.clone(); caches.open(CACHE).then(function (c) { c.put("index.html", copy); }); return r;
    }).catch(function () { return caches.match("index.html"); }));
    return;
  }
  e.respondWith(caches.match(e.request).then(function (hit) { return hit || fetch(e.request); }));
});
