// array of website pages url
var websiteDataURL = [
        './',
	    './index.html',
	    './full_data.html',
	    './style.css',
	    './script.js'
	]
//browser cache name
var cache_name = "weather"

//installing the serviceWorker
self.addEventListener('install', (event) => {
	console.log("serviceWorker successfully installed!!")
	event.waitUntil(
		   caches.open(cache_name).then((response) => {
		   	 console.log("cache opened!!")
		   	 return response.addAll(websiteDataURL)
		   })
		)
})


//activate
self.addEventListener('activate', (event) => {
	console.log("serviceWorker activated !!")
})

//fetch
self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        // Cache hit - return response
        if (response) {
          return response;
        }
        return fetch(event.request);
      }
    )
  );
});
