(function () {
  'use strict';
  const $ = (s, el = document) => el.querySelector(s);
  const app = $('#app');
  const TASKS = window.TASKS || [];
  const byId = new Map(TASKS.map(t => [t.id, t]));

  /* ---------- формулы ---------- */
  function tex(src, display) {
    try {
      return katex.renderToString(src, { displayMode: !!display, throwOnError: false, strict: false, output: 'html' });
    } catch (e) { return '<code>' + src + '</code>'; }
  }
  // $$...$$ — блок, $...$ — в строке
  function rich(s) {
    if (!s) return '';
    return s
      .replace(/\$\$([\s\S]+?)\$\$/g, (_, f) => '<div class="mathblock">' + tex(f, true) + '</div>')
      .replace(/\$([^$]+?)\$/g, (_, f) => tex(f, false));
  }
  // Разбивка длинной формулы на строки по знакам «=» и «≈» верхнего уровня
  function splitRel(src) {
    const parts = []; let depth = 0, cur = '', i = 0;
    while (i < src.length) {
      const c = src[i];
      if (c === '{') depth++;
      if (c === '}') depth--;
      if (depth === 0 && c === '=') { parts.push(cur, '='); cur = ''; i++; continue; }
      if (depth === 0 && src.startsWith('\\approx', i)) { parts.push(cur, '\\approx'); cur = ''; i += 7; continue; }
      cur += c; i++;
    }
    parts.push(cur);
    if (parts.length < 5) return null; // меньше двух знаков — не разбиваем
    let out = parts[0] + ' &' + parts[1] + ' ' + parts[2];
    for (let k = 3; k < parts.length; k += 2) out += ' \\\\ &' + parts[k] + ' ' + parts[k + 1];
    return '\\begin{aligned}' + out + '\\end{aligned}';
  }
  function fitMath(root) {
    root.querySelectorAll('.mathblock[data-tex]').forEach(el => {
      const src = el.dataset.tex;
      el.innerHTML = tex(src, true);
      if (el.scrollWidth > el.clientWidth + 1) {
        const a = splitRel(src);
        if (a) el.innerHTML = tex(a, true);
      }
    });
  }
  const escA = s => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;');
  const esc = s => s.replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const plain = s => (s || '').replace(/\$[^$]*\$/g, ' ').replace(/\s+/g, ' ').trim();

  /* ---------- список и поиск ---------- */
  const q = $('#q'), qClear = $('#q-clear'), list = $('#list');
  $('#book-sub').textContent = (window.BOOK ? window.BOOK.authors : '');
  $('#foot').textContent = TASKS.length + ' ' + plural(TASKS.length, ['задача', 'задачи', 'задач']);

  function plural(n, f) {
    const a = n % 100, b = n % 10;
    if (a > 10 && a < 20) return f[2];
    if (b === 1) return f[0];
    if (b > 1 && b < 5) return f[1];
    return f[2];
  }
  const idKey = id => id.split('.').map(n => n.padStart(4, '0')).join('.');
  const norm = s => s.trim().toLowerCase().replace(/,/g, '.').replace(/ё/g, 'е').replace(/^№\s*/, '');

  function highlight(text, needle) {
    const t = esc(text);
    if (!needle) return t;
    const i = t.toLowerCase().replace(/ё/g, 'е').indexOf(needle);
    if (i < 0) return t;
    return t.slice(0, i) + '<mark>' + t.slice(i, i + needle.length) + '</mark>' + t.slice(i + needle.length);
  }

  function search(raw) {
    const s = norm(raw);
    if (!s) return { items: [...TASKS].sort((a, b) => idKey(a.id) < idKey(b.id) ? -1 : 1), s, mode: 'all' };
    if (/^\d+(\.\d*)?$/.test(s)) {
      const items = TASKS.filter(t => t.id.startsWith(s))
        .sort((a, b) => (a.id === s ? -1 : b.id === s ? 1 : idKey(a.id) < idKey(b.id) ? -1 : 1));
      return { items, s, mode: 'num' };
    }
    const items = TASKS.filter(t => (t.title + ' ' + t.section + ' ' + plain(t.condition)).toLowerCase().replace(/ё/g, 'е').includes(s));
    return { items, s, mode: 'text' };
  }

  const chev = '<svg class="chev" viewBox="0 0 8 14"><path d="M1.5 1.5 6.5 7l-5 5.5"/></svg>';
  function rowHTML(t, res) {
    const num = res.mode === 'num' ? highlight(t.id, res.s) : esc(t.id);
    const title = res.mode === 'text' ? highlight(t.title, res.s) : esc(t.title);
    return `<button class="row" data-id="${t.id}">
      <span class="num">${num}</span>
      <span class="row-main"><span class="row-title">${title}</span>
      <span class="row-sub">${esc(t.section)} · стр. ${esc(t.page || '')}</span></span>${chev}</button>`;
  }

  function renderList() {
    const res = search(q.value);
    qClear.hidden = !q.value;
    if (!res.items.length) {
      list.innerHTML = `<div class="empty"><b>Задача ${esc(q.value)} не найдена</b>Её пока нет в приложении. Проверь номер или попробуй поиск по словам — кнопка «Аа».</div>`;
      return;
    }
    if (res.mode !== 'all') {
      list.innerHTML = `<div class="group-h">${res.mode === 'num' ? 'Найдено по номеру' : 'Найдено в условиях'}</div>
        <div class="list">${res.items.map(t => rowHTML(t, res)).join('')}</div>`;
      return;
    }
    // группировка: глава → раздел
    const groups = new Map();
    res.items.forEach(t => {
      const k = t.chapter + '|' + t.section;
      if (!groups.has(k)) groups.set(k, []);
      groups.get(k).push(t);
    });
    let html = '';
    groups.forEach((items, k) => {
      const [ch, sec] = k.split('|');
      html += `<div class="group-h">${esc(ch.replace(/^Гл\.\s*/, 'Глава '))} · ${esc(sec)}</div>
        <div class="list">${items.map(t => rowHTML(t, res)).join('')}</div>`;
    });
    list.innerHTML = html;
  }

  q.addEventListener('input', renderList);
  q.addEventListener('keydown', e => {
    if (e.key !== 'Enter') return;
    const res = search(q.value);
    const exact = res.items.find(t => t.id === res.s);
    const pick = exact || (res.items.length === 1 ? res.items[0] : null);
    if (pick) { q.blur(); open(pick.id); }
    else q.blur();
  });
  qClear.addEventListener('click', () => { q.value = ''; renderList(); q.focus(); });
  list.addEventListener('click', e => {
    const r = e.target.closest('.row');
    if (r) open(r.dataset.id);
  });

  // переключатель цифровой / буквенной клавиатуры
  const kb = $('#kb-toggle');
  let kbMode = 'num';
  try { kbMode = localStorage.getItem('kb') || 'num'; } catch (e) {}
  function applyKb() {
    q.setAttribute('inputmode', kbMode === 'num' ? 'decimal' : 'text');
    q.placeholder = kbMode === 'num' ? 'Номер задачи, например 3.12' : 'Поиск по словам: кольцо, диск…';
    kb.textContent = kbMode === 'num' ? 'Аа' : '123';
  }
  applyKb();
  kb.addEventListener('click', () => {
    kbMode = kbMode === 'num' ? 'text' : 'num';
    try { localStorage.setItem('kb', kbMode); } catch (e) {}
    applyKb();
    q.blur(); setTimeout(() => q.focus(), 60);
  });

  /* ---------- экран задачи ---------- */
  const taskEl = $('#task'), taskScroll = $('#task-scroll');
  const sorted = [...TASKS].sort((a, b) => idKey(a.id) < idKey(b.id) ? -1 : 1);

  function renderTask(t) {
    const i = sorted.indexOf(t), prev = sorted[i - 1], next = sorted[i + 1];
    const fig = typeof t.figure === 'function' ? t.figure() : (t.figure || '');
    const given = (t.given || []).map(([g, si]) =>
      `<div>${tex(g)}</div><div class="si">${si ? tex(si) : '<span style="opacity:.5">—</span>'}</div>`).join('');
    taskEl.innerHTML = `
      <div class="t-head">
        <span class="t-chip">${esc(t.section)}</span>
        <h1 class="t-num">Задача ${esc(t.id)}</h1>
        <h2 class="t-title">${esc(t.title)}</h2>
      </div>

      <div class="sec-h">Условие</div>
      <div class="card condition"><p>${rich(t.condition)}</p></div>
      ${t.note ? `<div class="note"><div>${rich(t.note)}</div></div>` : ''}

      <div class="sec-h">Дано</div>
      <div class="card given">
        <div class="given-grid"><div class="gh">Дано</div><div class="gh">В СИ</div>${given}</div>
        ${t.find ? `<div class="find"><span>Найти</span><span>${tex(t.find)}</span></div>` : ''}
      </div>

      ${fig ? `<div class="sec-h">Рисунок</div>
      <div class="card figure">${fig}${t.figCaption ? `<div class="fig-cap">${esc(t.figCaption)}</div>` : ''}</div>` : ''}

      ${t.formulas && t.formulas.length ? `<div class="sec-h">Что используем</div>
      <div class="card flist">${t.formulas.map(f =>
        `<div class="f-item"><div class="f-tex">${tex(f.tex)}</div><div class="f-txt">${rich(f.text)}</div></div>`).join('')}</div>` : ''}

      <div class="sec-h">Решение</div>
      <div class="steps">${(t.steps || []).map((s, k) => `
        <div class="card step"><div class="step-n">${k + 1}</div><div>
          ${s.title ? `<div class="step-t">${esc(s.title)}</div>` : ''}
          ${s.text ? `<div class="step-p">${rich(s.text)}</div>` : ''}
          ${s.tex ? `<div class="mathblock" data-tex="${escA(s.tex)}"></div>` : ''}
        </div></div>`).join('')}
      </div>

      <div class="sec-h ok">Ответ</div>
      <div class="answer">${(t.answer || []).map(a => `<div class="a-row">${tex(a)}</div>`).join('')}</div>

      <div class="pager">
        <button class="prev" ${prev ? `data-id="${prev.id}"` : 'disabled'}><div class="pn">‹ Предыдущая</div><div class="pl">${prev ? prev.id : ''}</div></button>
        <button class="next" ${next ? `data-id="${next.id}"` : 'disabled'}><div class="pn">Следующая ›</div><div class="pl">${next ? next.id : ''}</div></button>
      </div>`;
    fitMath(taskEl);
    $('#task-nav-title').textContent = 'Задача ' + t.id;
    taskScroll.scrollTop = 0;
    $('#screen-task .nav').classList.remove('scrolled');
    document.title = 'Задача ' + t.id;
  }
  taskEl.addEventListener('click', e => {
    const b = e.target.closest('.pager button[data-id]');
    if (b) location.replace('#' + b.dataset.id);
  });

  /* ---------- маршрутизация (#3.12) ---------- */
  let pushed = false;
  function open(id) { pushed = true; location.hash = id; }
  function goBack() {
    if (pushed) { pushed = false; history.back(); }
    else { history.replaceState(null, '', location.pathname + location.search); route(); }
  }
  $('#back').addEventListener('click', goBack);

  function route() {
    const id = decodeURIComponent(location.hash.slice(1));
    const t = byId.get(id);
    if (t) { renderTask(t); app.classList.add('on-task'); }
    else { app.classList.remove('on-task'); document.title = 'Задачник'; pushed = false; }
  }
  window.addEventListener('hashchange', route);

  /* ---------- свайп назад от левого края ---------- */
  const st = $('#screen-task'), sl = $('#screen-list');
  let sx = 0, sy = 0, dx = 0, drag = false, decided = false;
  st.addEventListener('touchstart', e => {
    const x = e.touches[0].clientX - app.getBoundingClientRect().left;
    if (x > 28) return;
    sx = e.touches[0].clientX; sy = e.touches[0].clientY; dx = 0; drag = true; decided = false;
  }, { passive: true });
  st.addEventListener('touchmove', e => {
    if (!drag) return;
    const mx = e.touches[0].clientX - sx, my = e.touches[0].clientY - sy;
    if (!decided) { if (Math.abs(my) > Math.abs(mx)) { drag = false; return; } decided = true; app.classList.add('dragging'); }
    dx = Math.max(0, mx);
    const w = app.clientWidth, p = dx / w;
    st.style.transform = `translateX(${dx}px)`;
    sl.style.transform = `translateX(${-30 + 30 * p}%)`;
    sl.style.filter = `brightness(${0.92 + 0.08 * p})`;
  }, { passive: true });
  st.addEventListener('touchend', () => {
    if (!drag) return;
    drag = false; app.classList.remove('dragging');
    st.style.transform = sl.style.transform = sl.style.filter = '';
    if (dx > app.clientWidth * 0.33) goBack();
  });

  /* ---------- навбар при прокрутке ---------- */
  const listNav = $('#list-nav'), listScroll = $('#list-scroll');
  listScroll.addEventListener('scroll', () => listNav.classList.toggle('scrolled', listScroll.scrollTop > 4), { passive: true });
  const taskNav = $('#screen-task .nav');
  taskScroll.addEventListener('scroll', () => taskNav.classList.toggle('scrolled', taskScroll.scrollTop > 60), { passive: true });

  let rz; window.addEventListener('resize', () => { clearTimeout(rz); rz = setTimeout(() => fitMath(taskEl), 150); });

  /* ---------- старт ---------- */
  renderList();
  route();

  if ('serviceWorker' in navigator && location.protocol.startsWith('http')) {
    window.addEventListener('load', () => navigator.serviceWorker.register('sw.js').catch(() => {}));
  }
})();
