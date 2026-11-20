// Morze chmur – service worker: szybkie uruchamianie i ostatnia prognoza bez zasięgu
const SHELL = 'mc-shell-v4';
const DATA = 'mc-data';
const SHELL_FILES = ['./', './index.html', './manifest.webmanifest',
  './icons/icon-192.png', './icons/icon-512.png', './icons/apple-touch-icon.png'];
const API = /(^|\.)open-meteo\.com$|^photon\.komoot\.io$|^nominatim\.openstreetmap\.org$/;

self.addEventListener('install', e => {
  e.waitUntil(caches.open(SHELL).then(c => c.addAll(SHELL_FILES)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
  e.waitUntil(caches.keys()
    .then(keys => Promise.all(keys.filter(k => k !== SHELL && k !== DATA).map(k => caches.delete(k))))
    .then(() => self.clients.claim()));
});

self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);

  // Strona aplikacji: najpierw sieć (żeby zawsze była najnowsza wersja), bez zasięgu – z pamięci
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

  // Prognozy i wyszukiwanie: najpierw sieć, zapis kopii; bez zasięgu – ostatnia zapisana odpowiedź
  if (API.test(url.hostname)) {
    e.respondWith(fetch(req).then(r => {
      if (r.ok) {
        const copy = r.clone();
        copy.blob().then(async body => {
          const c = await caches.open(DATA);
          await c.put(req, new Response(body, { headers: { 'content-type': 'application/json', 'x-sw-time': String(Date.now()) } }));
          const keys = await c.keys();
          for (const k of keys.slice(0, Math.max(0, keys.length - 80))) await c.delete(k);
        }).catch(() => {});
      }
      return r;
    }).catch(async () => {
      const c = await caches.open(DATA);
      const r = await c.match(req);
      if (!r) return Response.error();
      const h = new Headers(r.headers); h.set('x-sw-cache', r.headers.get('x-sw-time') || '1');
      return new Response(await r.blob(), { status: 200, headers: h });
    }));
  }
});
