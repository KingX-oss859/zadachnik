/* Офлайн-кэш. При добавлении задач увеличьте VERSION — телефон подтянет новое. */
const VERSION = 'v6';
const CACHE = 'zadachnik-' + VERSION;
importScripts('sw-assets.js');   // self.FIGURE_ASSETS — картинки книги, список пишет tools/build_theory.py
const ASSETS = [
  './',
  'app.js',
  'sw-assets.js',
  'data/figures.js',
  'data/tasks.js',
  'data/tasks-1-kinematika.js',
  'data/tasks-2-dinamika.js',
  'data/tasks-3-vrashchenie.js',
  'data/tasks-6-kolebaniya.js',
  'data/tasks-8-gazy.js',
  'data/tasks-10-statfizika.js',
  'data/tasks-11-termodinamika.js',
  'data/tasks-12-realgaz.js',
  'data/tasks-13-kulon.js',
  'data/tasks-14-napryazhennost.js',
  'data/theory.js',
  'data/book-tasks.js',
  'icons/apple-touch-icon.png',
  'icons/icon-192.png',
  'icons/icon-512.png',
  'index.html',
  'manifest.webmanifest',
  'modem.js',
  'styles.css',
  'vendor/katex/fonts/KaTeX_AMS-Regular.woff2',
  'vendor/katex/fonts/KaTeX_Caligraphic-Bold.woff2',
  'vendor/katex/fonts/KaTeX_Caligraphic-Regular.woff2',
  'vendor/katex/fonts/KaTeX_Fraktur-Bold.woff2',
  'vendor/katex/fonts/KaTeX_Fraktur-Regular.woff2',
  'vendor/katex/fonts/KaTeX_Main-Bold.woff2',
  'vendor/katex/fonts/KaTeX_Main-BoldItalic.woff2',
  'vendor/katex/fonts/KaTeX_Main-Italic.woff2',
  'vendor/katex/fonts/KaTeX_Main-Regular.woff2',
  'vendor/katex/fonts/KaTeX_Math-BoldItalic.woff2',
  'vendor/katex/fonts/KaTeX_Math-Italic.woff2',
  'vendor/katex/fonts/KaTeX_SansSerif-Bold.woff2',
  'vendor/katex/fonts/KaTeX_SansSerif-Italic.woff2',
  'vendor/katex/fonts/KaTeX_SansSerif-Regular.woff2',
  'vendor/katex/fonts/KaTeX_Script-Regular.woff2',
  'vendor/katex/fonts/KaTeX_Size1-Regular.woff2',
  'vendor/katex/fonts/KaTeX_Size2-Regular.woff2',
  'vendor/katex/fonts/KaTeX_Size3-Regular.woff2',
  'vendor/katex/fonts/KaTeX_Size4-Regular.woff2',
  'vendor/katex/fonts/KaTeX_Typewriter-Regular.woff2',
  'vendor/katex/katex.min.css',
  'vendor/katex/katex.min.js'
].concat(self.FIGURE_ASSETS || []);
self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
/* Сначала сеть (чтобы новые задачи появлялись сразу), без сети — из кэша.
   no-cache: браузер сверяет файл с сервером, а не берёт его из HTTP-кэша —
   иначе новый tasks-*.js может прийти вместе со старым figures.js */
self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  const req = e.request.mode === 'navigate' ? e.request : new Request(e.request, { cache: 'no-cache' });
  e.respondWith(
    fetch(req).then(r => {
      const copy = r.clone();
      caches.open(CACHE).then(c => c.put(e.request, copy));
      return r;
    }).catch(() => caches.match(e.request, { ignoreSearch: true }).then(r => r || caches.match('./')))
  );
});
