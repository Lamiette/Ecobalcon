'use strict';

const STATIC_CACHE  = 'ecobalcon-static-v1';
const PAGES_CACHE   = 'ecobalcon-pages-v1';
const IMAGES_CACHE  = 'ecobalcon-images-v1';
const ALL_CACHES    = [STATIC_CACHE, PAGES_CACHE, IMAGES_CACHE];
const IMAGE_MAX     = 60;

const PRECACHE_URLS = [
  '/',
  '/articles/',
  '/simulateur/',
  '/css/style.min.css',
  '/js/cookie-consent.js',
  '/js/plants-data.js',
  '/manifest.json',
  '/images/logo-site.png',
  '/images/favicon-192.png',
  '/images/balcon-soleil.webp',
];

// ── Install : pré-cache du shell ─────────────────────────────────────────────

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(STATIC_CACHE)
      .then((cache) => cache.addAll(PRECACHE_URLS))
      .then(() => self.skipWaiting())
  );
});

// ── Activate : suppression des anciens caches ────────────────────────────────

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((names) => Promise.all(
        names
          .filter((name) => !ALL_CACHES.includes(name))
          .map((name) => caches.delete(name))
      ))
      .then(() => self.clients.claim())
  );
});

// ── Fetch ────────────────────────────────────────────────────────────────────

self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Ignore les requêtes non-GET et cross-origin (analytics, clarity…)
  if (request.method !== 'GET' || url.origin !== self.location.origin) {
    return;
  }

  // CSS et JS : cache-first (changent via bump de version dans PRECACHE_URLS)
  if (url.pathname.startsWith('/css/') || url.pathname.startsWith('/js/')) {
    event.respondWith(cacheFirst(request, STATIC_CACHE));
    return;
  }

  // Images : cache-first avec limite de 60 entrées
  if (
    request.destination === 'image' ||
    /\.(webp|png|jpg|jpeg|svg|gif|ico)$/i.test(url.pathname)
  ) {
    event.respondWith(cacheFirstWithLimit(request, IMAGES_CACHE, IMAGE_MAX));
    return;
  }

  // Pages HTML : stale-while-revalidate (fraîcheur + vitesse)
  if (
    request.destination === 'document' ||
    (request.headers.get('Accept') || '').includes('text/html')
  ) {
    event.respondWith(staleWhileRevalidate(request, PAGES_CACHE));
    return;
  }
});

// ── Stratégies de cache ──────────────────────────────────────────────────────

async function cacheFirst(request, cacheName) {
  const cached = await caches.match(request);
  if (cached) return cached;

  try {
    const response = await fetch(request);
    if (response.ok) {
      const cache = await caches.open(cacheName);
      cache.put(request, response.clone());
    }
    return response;
  } catch {
    return new Response('', { status: 503, statusText: 'Offline' });
  }
}

async function cacheFirstWithLimit(request, cacheName, limit) {
  const cached = await caches.match(request);
  if (cached) return cached;

  try {
    const response = await fetch(request);
    if (!response.ok) return response;

    const cache = await caches.open(cacheName);
    const keys = await cache.keys();
    if (keys.length >= limit) {
      await cache.delete(keys[0]);
    }
    cache.put(request, response.clone());
    return response;
  } catch {
    return new Response('', { status: 503, statusText: 'Offline' });
  }
}

async function staleWhileRevalidate(request, cacheName) {
  const cache = await caches.open(cacheName);
  const cached = await cache.match(request);

  const networkFetch = fetch(request)
    .then((response) => {
      if (response.ok) cache.put(request, response.clone());
      return response;
    })
    .catch(() => null);

  return cached ?? (await networkFetch);
}
