self.addEventListener("install", function (event) {
	event.waitUntil(
		caches
			.open("v1-timer")
			.then(function (cache) {
				fetch("/assets-manifest.json")
					.then(response => {
						return response.json();
					})
					.then(assets => {
						const urlsToCache = ["/index.html", "/", ...Object.values(assets)];
						cache.addAll(urlsToCache);
					})
					.catch(console.warn);
			})
			.catch(console.warn)
	);
});

self.addEventListener("activate", event => {
	var cacheKeeplist = ["v1-timer"];
	event.waitUntil(
		caches.keys().then(keyList => {
			return Promise.all(
				keyList.map(key => {
					if (cacheKeeplist.indexOf(key) === -1) {
						return caches.delete(key);
					}
				})
			);
		})
	);
});

self.addEventListener("fetch", function (event) {
	event.respondWith(
		caches.match(event.request).then(function (response) {
			return response || fetch(event.request);
		})
	);
});
