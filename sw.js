---
    layout: null
---

var urlsToCache = [];
// Cache posts
// Limits the number of posts that gets cached to 3
{% for post in site.posts limit:3 -%}urlsToCache.push("{{ post.url }}");{%- endfor -%}

// Cache static files
{% for file in site.static_files -%}{%- if file.path contains post.assets -%}urlsToCache.push("{{ file.path }}");{%- endif -%}{%- endfor -%}

// Cache pages
{% for page in site.html_pages -%}
    urlsToCache.push("{{ page.url }}");
{%- endfor -%}

// Cache assets
{% for file in site.static_files -%}{%- if file.extname == '.js' or file.path contains '/assets/images' -%}urlsToCache.push("{{ file.path }}");{%- endif -%}{%- endfor -%}

// Cache name: adjust version number to invalidate service worker cachce.
var CACHE_NAME = 'edd-yerburgh-cache-v2';

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