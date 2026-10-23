(function () {
  'use strict';
  const $ = (s, el = document) => el.querySelector(s);
  const app = $('#app'), desk = $('#desk');
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
  const icon = (id, box = 16) => `<svg viewBox="0 0 ${box} ${box}" aria-hidden="true"><use href="#${id}"/></svg>`;

  /* ---------- список и поиск ---------- */
  const q = $('#q'), qClear = $('#q-clear'), list = $('#list');
  $('#book-sub').textContent = window.BOOK ? window.BOOK.title + ' — ' + window.BOOK.authors : '';
  $('#foot').textContent = TASKS.length + ' ' + plural(TASKS.length, ['объект', 'объекта', 'объектов']);

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

  function rowHTML(t, res) {
    const num = res.mode === 'num' ? highlight(t.id, res.s) : esc(t.id);
    const title = res.mode === 'text' ? highlight(t.title, res.s) : esc(t.title);
    return `<button class="row" data-id="${t.id}">
      <span class="num">${icon('i-doc')}<b>${num}</b></span>
      <span class="row-title">${title}</span>
      <span class="page">${esc(t.page || '')}</span></button>`;
  }
  const groupHTML = (text, cls = '') => `<div class="group-h ${cls}">${icon('i-folder')}<span>${esc(text)}</span></div>`;

  function renderList() {
    const res = search(q.value);
    qClear.hidden = !q.value;
    if (!res.items.length) {
      list.innerHTML = `<div class="empty">${icon('i-warn', 32)}<div><b>Задача ${esc(q.value)} не найдена</b>Её пока нет в приложении. Проверь номер или попробуй поиск по словам — кнопка «Аа».</div></div>`;
      $('#foot').textContent = '0 объектов';
      return;
    }
    $('#foot').textContent = res.items.length + ' ' + plural(res.items.length, ['объект', 'объекта', 'объектов']);
    if (res.mode !== 'all') {
      list.innerHTML = groupHTML(res.mode === 'num' ? 'Найдено по номеру' : 'Найдено в условиях') +
        res.items.map(t => rowHTML(t, res)).join('');
      return;
    }
    // дерево как в Проводнике: глава → раздел → задачи
    const groups = new Map();
    res.items.forEach(t => {
      const k = t.chapter + '|' + t.section;
      if (!groups.has(k)) groups.set(k, []);
      groups.get(k).push(t);
    });
    let html = '', lastCh = null;
    groups.forEach((items, k) => {
      const [ch, sec] = k.split('|');
      if (ch !== lastCh) { html += groupHTML(ch.replace(/^Гл\.\s*/, 'Глава ')); lastCh = ch; }
      html += groupHTML(sec, 'sub') + items.map(t => rowHTML(t, res)).join('');
    });
    list.innerHTML = '<div class="tree">' + html + '</div>';
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

  /* ---------- окно задачи ---------- */
  const taskEl = $('#task'), taskScroll = $('#task-scroll');
  const sorted = [...TASKS].sort((a, b) => idKey(a.id) < idKey(b.id) ? -1 : 1);
  const group = (title, body, cls = '') => `<fieldset class="group ${cls}"><legend>${title}</legend>${body}</fieldset>`;
  let current = null;

  function renderTask(t) {
    current = t;
    const i = sorted.indexOf(t), prev = sorted[i - 1], next = sorted[i + 1];
    let fig = '';
    try { fig = typeof t.figure === 'function' ? t.figure() : (t.figure || ''); }
    catch (e) { console.error('Чертёж задачи ' + t.id + ':', e); }   // без чертежа, но задача открывается
    const given = (t.given || []).map(([g, si]) =>
      `<div>${tex(g)}</div><div class="si">${si ? tex(si) : '<span style="opacity:.5">—</span>'}</div>`).join('');
    taskEl.innerHTML = `
      <div class="t-head">${icon('i-doc')}<div>
        <h1 class="t-num">Задача ${esc(t.id)}</h1>
        <h2 class="t-title">${esc(t.title)}</h2>
        <span class="t-chip">Тема: ${esc(t.section)}</span>
      </div></div>

      ${group('Условие', `<p class="condition">${rich(t.condition)}</p>
        ${t.note ? `<div class="note">${icon('i-warn', 32)}<div>${rich(t.note)}</div></div>` : ''}`)}

      ${group('Дано', `<div class="field given-wrap">
          <div class="given-grid"><div class="gh">Дано</div><div class="gh">В СИ</div>${given}</div>
        </div>
        ${t.find ? `<div class="find"><span>Найти:</span><span>${tex(t.find)}</span></div>` : ''}`)}

      ${fig ? group('Рисунок', `<div class="field figure">${fig}</div>
        ${t.figCaption ? `<div class="fig-cap">${esc(t.figCaption)}</div>` : ''}`) : ''}

      ${t.formulas && t.formulas.length ? group('Что используем', `<div class="flist">${t.formulas.map(f =>
        `<div class="f-item"><div class="f-tex">${tex(f.tex)}</div><div class="f-txt">${rich(f.text)}</div></div>`).join('')}</div>`) : ''}

      ${group('Решение', (t.steps || []).map((s, k) => `
        <div class="step"><div>
          <div class="step-t"><span class="step-n">Шаг ${k + 1}.</span> ${s.title ? esc(s.title) : ''}</div>
          ${s.text ? `<div class="step-p">${rich(s.text)}</div>` : ''}
          ${s.tex ? `<div class="mathblock" data-tex="${escA(s.tex)}"></div>` : ''}
        </div></div>`).join(''))}

      ${group('Ответ', `<div class="field answer">${(t.answer || []).map(a => `<div class="a-row">${tex(a)}</div>`).join('')}</div>`, 'ok')}

      <div class="pager">
        <button class="btn prev" ${prev ? `data-id="${prev.id}"` : 'disabled'}><span class="pn">‹ Предыдущая</span><span class="pl">${prev ? prev.id : ''}</span></button>
        <button class="btn next" ${next ? `data-id="${next.id}"` : 'disabled'}><span class="pn">Следующая ›</span><span class="pl">${next ? next.id : ''}</span></button>
      </div>`;
    fitMath(taskEl);
    setNav($('#tb-prev'), prev);
    setNav($('#tb-next'), next);
    $('#task-nav-title').textContent = 'Задача ' + t.id;
    $('#task-status').textContent = t.chapter + ' · ' + t.section + (t.page ? ' · стр. ' + t.page : '');
    taskScroll.scrollTop = 0;
    document.title = 'Задача ' + t.id;
  }
  function setNav(b, t) {
    b.disabled = !t;
    if (t) b.dataset.id = t.id; else delete b.dataset.id;
  }
  const goTo = e => {
    const b = e.target.closest('button[data-id]');
    if (b) location.replace('#' + b.dataset.id);
  };
  taskEl.addEventListener('click', e => { if (e.target.closest('.pager')) goTo(e); });
  $('#tb-prev').addEventListener('click', goTo);
  $('#tb-next').addEventListener('click', goTo);

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
    else { app.classList.remove('on-task'); current = null; document.title = 'Задачник'; pushed = false; }
    restore();
  }
  window.addEventListener('hashchange', route);

  /* ---------- окна: свернуть, развернуть, закрыть ---------- */
  const onTask = () => app.classList.contains('on-task');
  function minimize() { desk.classList.add('minimized'); renderTaskbar(); }
  function restore() { desk.classList.remove('minimized'); renderTaskbar(); }
  function toList() { restore(); if (onTask()) goBack(); }

  app.addEventListener('click', e => {
    const b = e.target.closest('.title-bar-controls button');
    if (!b) return;
    const act = b.dataset.act, inTask = !!b.closest('#screen-task');
    if (act === 'min') minimize();
    else if (act === 'max') { desk.classList.toggle('maxed'); setTimeout(() => fitMath(taskEl), 0); }
    else if (act === 'close') { if (inTask) goBack(); else minimize(); }
  });
  $('#desk-app').addEventListener('click', toList);

  /* ---------- панель задач ---------- */
  const tasksBar = $('#tasks');
  function renderTaskbar() {
    const min = desk.classList.contains('minimized'), tk = onTask();
    let html = `<button class="btn${!min && !tk ? ' pressed' : ''}" type="button" data-win="list">${icon('i-app')}<span>Задачник</span></button>`;
    if (tk && current) html += `<button class="btn${!min ? ' pressed' : ''}" type="button" data-win="task">${icon('i-doc')}<span>Задача ${esc(current.id)}</span></button>`;
    tasksBar.innerHTML = html;
  }
  tasksBar.addEventListener('click', e => {
    const b = e.target.closest('button[data-win]');
    if (!b) return;
    const min = desk.classList.contains('minimized');
    if (b.dataset.win === 'list') {
      if (onTask()) toList();
      else if (min) restore(); else minimize();
    } else if (min) restore(); else minimize();
  });

  const clock = $('#clock');
  function tick() {
    const d = new Date();
    clock.textContent = d.getHours() + ':' + String(d.getMinutes()).padStart(2, '0');
  }
  tick(); setInterval(tick, 15000);

  /* ---------- меню (Файл, Справка, Пуск) ---------- */
  let openMenu = null;
  function closeMenu() {
    if (!openMenu) return;
    openMenu.menu.hidden = true;
    openMenu.btn.classList.remove('open', 'pressed');
    openMenu = null;
  }
  document.addEventListener('click', e => {
    const b = e.target.closest('[data-menu]');
    if (b) {
      const was = openMenu && openMenu.btn === b;
      closeMenu();
      if (was) return;
      const menu = document.getElementById(b.dataset.menu);
      if (b.id !== 'start') {
        const r = b.getBoundingClientRect();
        menu.style.left = r.left + 'px';
        menu.style.top = r.bottom + 'px';
      }
      menu.hidden = false;
      b.classList.add(b.id === 'start' ? 'pressed' : 'open');
      openMenu = { btn: b, menu };
      return;
    }
    const c = e.target.closest('[data-cmd]');
    if (openMenu && !e.target.closest('.menu')) closeMenu();
    if (c) { closeMenu(); command(c.dataset.cmd); }
  });

  function command(cmd) {
    if (cmd === 'list') toList();
    else if (cmd === 'find') { toList(); setTimeout(() => { q.focus(); q.select(); }, 30); }
    else if (cmd === 'min') minimize();
    else if (cmd === 'howto') showDialog('Как искать',
      '<p>Введи номер задачи в поле «Найти»: <b>3.12</b> или <b>3,12</b>. «3.1» покажет все задачи 3.1x.</p>' +
      '<p>Кнопка <b>Аа</b> переключает на поиск по словам из условия, <b>123</b> — обратно на цифры.</p>' +
      '<p>Прямая ссылка на задачу: адрес с <b>#3.12</b> в конце.</p>');
    else if (cmd === 'about') showDialog('О программе',
      '<p><b>Задачник</b></p><p>Решения задач из книги ' + esc(window.BOOK ? window.BOOK.authors + ' «' + window.BOOK.title + '»' : '') + '.</p>' +
      '<p>' + TASKS.length + ' ' + plural(TASKS.length, ['задача', 'задачи', 'задач']) + '. Работает без интернета.</p>');
  }

  /* ---------- окно-сообщение ---------- */
  const dlg = $('#dialog');
  function showDialog(title, html) {
    $('#dlg-title').textContent = title;
    $('#dlg-text').innerHTML = html;
    dlg.hidden = false;
    document.querySelectorAll('#app .window').forEach(w => w.classList.add('inactive'));
    $('.dlg-btns .btn', dlg).focus();
  }
  function closeDialog() {
    dlg.hidden = true;
    document.querySelectorAll('#app .window').forEach(w => w.classList.remove('inactive'));
  }
  dlg.addEventListener('click', e => { if (e.target.closest('[data-act="dlg-close"]')) closeDialog(); });

  document.addEventListener('keydown', e => {
    if (e.key !== 'Escape') return;
    if (!dlg.hidden) closeDialog();
    else if (openMenu) closeMenu();
    else if (onTask() && document.activeElement !== q) goBack();
  });

  /* ---------- свайп назад от левого края (без анимации, как в 98) ---------- */
  const st = $('#screen-task');
  let sx = 0, sy = 0, dx = 0, drag = false, decided = false;
  st.addEventListener('touchstart', e => {
    const x = e.touches[0].clientX - app.getBoundingClientRect().left;
    if (x > 28) return;
    sx = e.touches[0].clientX; sy = e.touches[0].clientY; dx = 0; drag = true; decided = false;
  }, { passive: true });
  st.addEventListener('touchmove', e => {
    if (!drag) return;
    const mx = e.touches[0].clientX - sx, my = e.touches[0].clientY - sy;
    if (!decided) { if (Math.abs(my) > Math.abs(mx)) { drag = false; return; } decided = true; }
    dx = Math.max(0, mx);
  }, { passive: true });
  st.addEventListener('touchend', () => {
    if (!drag) return;
    drag = false;
    if (dx > app.clientWidth * 0.33) goBack();
  });

  let rz; window.addEventListener('resize', () => { clearTimeout(rz); rz = setTimeout(() => fitMath(taskEl), 150); });

  /* ---------- старт ---------- */
  renderList();
  route();

  if ('serviceWorker' in navigator && location.protocol.startsWith('http')) {
    window.addEventListener('load', () => navigator.serviceWorker.register('sw.js').catch(() => {}));
  }
})();
