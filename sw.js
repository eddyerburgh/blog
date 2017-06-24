---
    layout: null
---

var urlsToCache = [];
// Cache posts
// Limits the number of posts that gets cached to 3
// Reads a piece of front-matter in each post that directs the second loop to the folder where the assets are held
{% for post in site.posts limit:3 %}
urlsToCache.push("{{ post.url }}")
{% for file in site.static_files %}
{% if file.path contains post.assets %}
urlsToCache.push("{{ file.path }}")
{% endif %}
{% endfor %}
{% endfor %}

// Cache pages
// Do nothing if it's either an AMP page (as these are served via Googles cache) or the blog page
// Fallback to the offline pages for these
{% for page in site.html_pages %}
{% if page.path contains 'amp-html' or page.path contains 'blog' %}
{% else if %}
urlsToCache.push("{{ page.url }}")
{% endif %}
{% endfor %}

// Cache assets
// Removed assets/posts because I only want assets from the most recent posts getting cached
{% for file in site.static_files %}
{% if file.extname == '.js' or file.path contains '/assets/images' %}
urlsToCache.push("{{ file.path }}")
{% endif %}
{% endfor %}

// Cache name: adjust version number to invalidate service worker cachce.
var CACHE_NAME = 'james-ives-cache-v2';

self.addEventListener('install', function(event) {
    // Perform install steps
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(function(cache) {
                console.log('Opened cache');
                return cache.addAll(urlsToCache);
            })
    );
});

self.addEventListener('fetch', function(event) {
    event.respondWith(
        caches.open(CACHE_NAME).then(function(cache) {
            return cache.match(event.request).then(function(response) {
                return response || fetch(event.request).then(function(response) {
                        cache.put(event.request, response.clone());
                        return response;
                    });
            });
        }).catch(function() {
            console.log('asdasds')
            // Fallback to the offline page if not available in the cache.
            return caches.match('/offline');
        })
    );
});

self.addEventListener('fetch', function(event) {
    event.respondWith(
        caches.open(CACHE_NAME).then(function(cache) {
            return fetch(event.request).then(function(response) {
                cache.put(event.request, response.clone());
                return response;
            });
        }).catch(function() {
            // Fallback to the offline page if not available in the cache.
            console.log('asdasds')
            return caches.match('/offline');
        })
    );
});