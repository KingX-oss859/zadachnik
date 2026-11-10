/* Офлайн-кэш.
   ВАЖНО: после ЛЮБОЙ правки файлов приложения увеличьте VERSION — иначе телефоны останутся на старой версии.
   Приложение всегда открывается из кэша (быстро и без сети). Увидев новый VERSION, телефон в фоне
   скачивает новый комплект файлов целиком и показывает его со следующего запуска. */
const VERSION = 'v31';
const CACHE = 'zadachnik-' + VERSION;      // файлы приложения: свой кэш на каждую версию
const FIGS = 'zadachnik-figures';          // картинки книги: общий кэш, при смене версии не перекачиваются
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
  'data/tasks-4-sily.js',
  'data/tasks-5-relyativ.js',
  'data/tasks-6-kolebaniya.js',
  'data/tasks-7-volny.js',
  'data/tasks-8-gazy.js',
  'data/tasks-9-mkt.js',
  'data/tasks-10-statfizika.js',
  'data/tasks-11-termodinamika.js',
  'data/tasks-12-realgaz.js',
  'data/tasks-13-kulon.js',
  'data/tasks-14-napryazhennost.js',
  'data/tasks-15-potentsial.js',
  'data/tasks-16-dipol.js',
  'data/tasks-17-emkost.js',
  'data/tasks-18-energiya-polya.js',
  'data/tasks-19-zakony-toka.js',
  'data/tasks-20-tok-v-sredah.js',
  'data/tasks-21-magnitnoe-pole.js',
  'data/tasks-22-sila-ampera.js',
  'data/tasks-23-sila-lorentsa.js',
  'data/tasks-24-zakon-polnogo-toka.js',
  'data/tasks-25-induktsiya.js',
  'data/tasks-26-energiya-magn-polya.js',
  'data/tasks-27-magnitnye-svoystva.js',
  'data/tasks-28-geom-optika.js',
  'data/tasks-29-fotometriya.js',
  'data/tasks-30-interferentsiya.js',
  'data/tasks-31-difraktsiya.js',
  'data/tasks-32-polyarizatsiya.js',
  'data/tasks-33-optika-dvizh.js',
  'data/tasks-34-teplovoe-izluchenie.js',
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
];

/* Файлы приложения — все разом и свежие (reload: мимо HTTP-кэша браузера). addAll не примет ни одного
   ответа с ошибкой: если хоть один файл не скачался, установка отменяется, а старая версия продолжает
   работать со своим кэшем — так новый tasks-*.js не окажется рядом со старым figures.js. */
function addApp() {
  return caches.open(CACHE).then(c => c.addAll(ASSETS.map(u => new Request(u, { cache: 'reload' }))));
}
/* Картинки — по одной, в 6 потоков. Что уже есть (в том числе в кэше прошлой версии) — не качаем заново.
   Не скачалась — не беда: установка не срывается, картинка докачается, когда её откроют. */
async function addFigures() {
  const figs = await caches.open(FIGS), list = self.FIGURE_ASSETS || [];
  let i = 0;
  async function worker() {
    while (i < list.length) {
      const url = list[i++];
      try {
        if (await figs.match(url)) continue;
        let r = await caches.match(url);                       // копия из кэша прошлой версии
        if (!r || !r.ok) r = await fetch(url, { cache: 'no-cache' });
        if (r.ok) await figs.put(url, r);
      } catch (err) {}
    }
  }
  await Promise.all(Array.from({ length: 6 }, worker));
}
self.addEventListener('install', e => {
  e.waitUntil(addApp().then(addFigures).then(() => self.skipWaiting()));
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys()
    .then(ks => Promise.all(ks.filter(k => k.startsWith('zadachnik-') && k !== CACHE && k !== FIGS).map(k => caches.delete(k))))
    .then(() => self.clients.claim()));
});

// в кэш кладём только настоящий файл: страница ошибки сервера (404, 5xx) не должна затереть рабочую копию
function save(cache, req, r) {
  return r && r.ok ? cache.put(req, r.clone()).catch(() => {}) : Promise.resolve();
}
/* Сначала кэш — приложение открывается сразу и при плохой связи. В сеть идём, только если файла в кэше нет.
   Картинку после показа сверяем с сервером в фоне: исправленный рисунок появится при следующем открытии. */
self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET' || new URL(req.url).origin !== self.location.origin) return;
  const isFig = new URL(req.url).pathname.includes('/figures/');
  e.respondWith((async () => {
    const cache = await caches.open(isFig ? FIGS : CACHE);
    const hit = await cache.match(req, { ignoreSearch: true });
    if (hit) {
      if (isFig) e.waitUntil(fetch(req.url, { cache: 'no-cache' }).then(r => save(cache, req, r)).catch(() => {}));
      return hit;
    }
    try {
      const r = await fetch(req);
      e.waitUntil(save(cache, req, r));
      return r;
    } catch (err) {
      const page = req.mode === 'navigate' && await cache.match('./');
      return page || Response.error();
    }
  })());
});
