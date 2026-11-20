// Urbs – service worker: gra działa bez internetu po pierwszym uruchomieniu
const SHELL = 'urbs-shell-v1';
const LIBS = 'urbs-libs-v1';
const THREE_BASE = 'https://cdn.jsdelivr.net/npm/three@0.160.0/';
const SHELL_FILES = ['./', './index.html', './manifest.webmanifest',
  './icons/icon-192.png', './icons/icon-512.png', './icons/apple-touch-icon.png'];
const LIB_FILES = [THREE_BASE + 'build/three.module.js',
  THREE_BASE + 'examples/jsm/controls/OrbitControls.js',
  THREE_BASE + 'examples/jsm/utils/BufferGeometryUtils.js'];
const CDN = /^(cdn\.jsdelivr\.net|fonts\.googleapis\.com|fonts\.gstatic\.com)$/;

self.addEventListener('install', e => {
  e.waitUntil(Promise.all([
    caches.open(SHELL).then(c => c.addAll(SHELL_FILES)),
    caches.open(LIBS).then(c => Promise.all(LIB_FILES.map(u => c.add(new Request(u, { mode: 'cors' })).catch(() => {}))))
  ]).then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
  e.waitUntil(caches.keys()
    .then(keys => Promise.all(keys.filter(k => k.startsWith('urbs-') && k !== SHELL && k !== LIBS).map(k => caches.delete(k))))
    .then(() => self.clients.claim()));
});

self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);

  // Gra: najpierw sieć (zawsze najnowsza wersja), bez zasięgu – z pamięci
  if (url.origin === location.origin) {
    if (req.mode === 'navigate') {
      e.respondWith(fetch(req).then(r => {
        const copy = r.clone(); caches.open(SHELL).then(c => c.put('./index.html', copy)); return r;
      }).catch(() => caches.match('./index.html')));
      return;
    }
    e.respondWith(caches.match(req).then(r => r || fetch(req)));
    return;
  }

  // Silnik 3D i czcionki: z pamięci, a jeśli ich nie ma – z sieci i zapis
  if (CDN.test(url.hostname)) {
    e.respondWith(caches.open(LIBS).then(async c => {
      const hit = await c.match(req);
      if (hit) return hit;
      const r = await fetch(req);
      if (r.ok || r.type === 'opaque') c.put(req, r.clone());
      return r;
    }));
  }
});
