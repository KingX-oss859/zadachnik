(function () {
  'use strict';
  const $ = (s, el = document) => el.querySelector(s);
  const app = $('#app'), desk = $('#desk');
  // все задачи книги (data/book-tasks.js): условие, тема, рисунки и ответ — дословно из book/*.md;
  // разбор (Дано, решение, наш ответ) — из data/tasks*.js, если он уже есть
  const SOLVED = window.TASKS || [];
  const solvedById = new Map(SOLVED.map(t => [t.id, t]));
  const TASKS = (window.BOOK_TASKS || []).map(b => Object.assign(solvedById.get(b.id) || { id: b.id, stub: true, title: b.first },
    { book: b, chapter: b.chapter, parTitle: b.parTitle, section: b.topic, page: b.page }));
  SOLVED.forEach(t => { if (!t.book) TASKS.push(t); });           // разбор без задачи в book/ тоже показываем
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
  // Разрезать запись по разделителю верхнего уровня (не внутри {…}); «⇒» приклеиваем к следующей части
  function splitTop(src, sep) {
    const parts = []; let depth = 0, cur = '', i = 0;
    while (i < src.length) {
      const c = src[i];
      if (c === '{') depth++;
      if (c === '}') depth--;
      sep.lastIndex = i;
      const m = depth === 0 && sep.exec(src);
      if (m && m[0]) { parts.push(cur); cur = ''; i += m[0].length; continue; }
      cur += c; i++;
    }
    parts.push(cur);
    const out = [];
    parts.map(s => s.trim()).filter(Boolean).forEach(p => {
      if (out.length && /^\\(Rightarrow|Leftrightarrow|to)$/.test(out[out.length - 1])) out[out.length - 1] += ' ' + p;
      else out.push(p);
    });
    return out;
  }
  const QUAD = /\s*\\q?quad(?![a-z])\s*/y;          // две формулы в одной строке: «a = 1,\quad b = 2»
  const ANS_SEP = /\s*;\s*\\q?quad(?![a-z])\s*/y;   // ответ «x = 1;\quad y = 2» — каждая величина своей строкой
  function fitMath(root) {
    root.querySelectorAll('[data-tex]').forEach(el => {
      const src = el.dataset.tex;
      el.innerHTML = tex(src, true);
      if (el.scrollWidth > el.clientWidth + 1) {
        const tg = (src.match(/\\tag\{[^}]*\}/) || [''])[0];   // \tag нельзя внутри aligned — переносим в конец
        const body = src.replace(tg, '');
        const parts = /\\begin/.test(body) ? [body] : splitTop(body, QUAD);
        if (parts.length > 1) {                                // сначала — каждая формула на своей строке
          const lines = p => tex('\\begin{gathered}' + p.join(' \\\\ ') + '\\end{gathered}' + tg, true);
          el.innerHTML = lines(parts);
          if (el.scrollWidth > el.clientWidth + 1) el.innerHTML = lines(parts.map(p => splitRel(p) || p));
        } else {
          const a = splitRel(body);
          if (a) el.innerHTML = tex(a + tg, true);
        }
      }
    });
  }
  /* длинные записи без горизонтальной прокрутки (на телефоне её почти не захватить) */
  const over = el => el.scrollWidth > el.clientWidth + 1;
  function shrink(el, min = 0.7) {          // уменьшаем шрифт шагами по 5 %, но не меньше 70 %
    el.style.fontSize = '';
    for (let k = 0.95; over(el) && k >= min - 1e-9; k -= 0.05) el.style.fontSize = Math.round(k * 100) + '%';
  }
  // «Дано»: граница между колонками всегда есть; если запись не влезает в половину — граница сдвигается
  // (одна на всю таблицу). «В СИ» не уже своих значений и четверти таблицы. Не хватает и так — шрифт до 70 %.
  function fitGiven(root) {
    root.querySelectorAll('.given-grid').forEach(grid => {
      const cells = [...grid.children];                            // по две в строке, заголовки тоже
      grid.style.fontSize = '';
      grid.style.gridTemplateColumns = '';
      const W = grid.clientWidth;
      const natural = () => {                                      // ширина самой длинной записи в каждой колонке
        grid.style.gridTemplateColumns = 'max-content max-content';
        const w = i => Math.max(...cells.filter((_, k) => k % 2 === i).map(c => Math.ceil(c.getBoundingClientRect().width) + 1));
        const r = [w(0), w(1)];
        grid.style.gridTemplateColumns = '';
        return r;
      };
      let [g, s] = natural();
      if (g <= W / 2 && s <= W / 2) return;                        // помещается в половинки — граница посередине
      for (let k = 0.95; (g + s > W || Math.max(g, s) > W * 0.75) && k >= 0.7 - 1e-9; k -= 0.05) {
        grid.style.fontSize = Math.round(k * 100) + '%';
        [g, s] = natural();
      }
      let gw = W / 2;
      if (g > gw) gw = Math.min(g, W - Math.max(s, W * 0.25));     // длинное «Дано» — граница вправо
      else if (s > W - gw) gw = Math.max(W - s, g, W * 0.25);      // длинное «В СИ» — граница влево
      grid.style.gridTemplateColumns = `${Math.round(gw)}px minmax(0, 1fr)`;
    });
  }
  function fitAll(root) {
    fitMath(root);
    fitGiven(root);
    root.querySelectorAll('.mathblock, .f-tex, .a-row, .find > span:last-child').forEach(el => shrink(el));
    // формулы книги не переписываем: длинную подстановку в одной скобке («p = [ … ] = …») можно только уменьшить
    root.querySelectorAll('.bk-math').forEach(el => shrink(el, 0.55));
  }

  const escA = s => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;');
  const esc = s => s.replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const plain = s => (s || '').replace(/\$[^$]*\$/g, ' ').replace(/\s+/g, ' ').trim();
  const icon = (id, box = 16) => `<svg viewBox="0 0 ${box} ${box}" aria-hidden="true"><use href="#${id}"/></svg>`;

  /* ---------- страницы книги: Markdown + LaTeX из book/ (data/theory-N.js) ---------- */
  const dispMath = s => `<div class="bk-math" data-tex="${escA(s.replace(/^\$\$|\$\$$/g, '').trim())}"></div>`;
  function bookInline(s) {
    const keep = [];
    s = s.replace(/<!--[\s\S]*?-->/g, ' ');                      // отметка страницы посреди строки
    s = s.replace(/\$([^$]+?)\$/g, (_, f) => { keep.push(tex(f, false)); return '\u0000' + (keep.length - 1) + '\u0000'; });
    s = esc(s).replace(/\*\*(.+?)\*\*/g, '<b>$1</b>')
      .replace(/\*\((.+?)\)\*/g, '<span class="tr-note">($1)</span>')   // пометка расшифровщика, не текст книги
      .replace(/\*(.+?)\*/g, '<i>$1</i>');
    return s.replace(/\u0000(\d+)\u0000/g, (_, k) => keep[k]);
  }
  // рисунок книги — картинка, вырезанная из скана (figures/fig-N.M.png)
  const bookImg = (src, cap) =>
    `<figure class="bk-fig"><img src="${escA(src)}" alt="${escA(cap)}" loading="lazy"><figcaption>${esc(cap)}</figcaption></figure>`;
  function bookHTML(md) {
    const out = [];
    let para = [], quote = [], table = [], math = null;
    const flushPara = () => { if (para.length) out.push('<p>' + bookInline(para.join(' ')) + '</p>'); para = []; };
    const flushQuote = () => {
      if (!quote.length) return;
      const t = quote.join(' ').trim();
      quote = [];
      if (/^[⁰¹²³⁴⁵⁶⁷⁸⁹]+⁾/.test(t)) out.push(`<div class="bk-foot">${bookInline(t)}</div>`);
      else out.push(`<blockquote class="bk-quote">${bookInline(t)}</blockquote>`);
    };
    const flushTable = () => {
      if (!table.length) return;
      const rows = table.filter(r => !/^\|[\s:|-]+\|$/.test(r))
        .map(r => r.replace(/^\||\|$/g, '').split('|').map(c => bookInline(c.trim())));
      out.push(`<div class="bk-table"><table><tr>${rows[0].map(c => `<th>${c}</th>`).join('')}</tr>` +
        rows.slice(1).map(r => `<tr>${r.map(c => `<td>${c}</td>`).join('')}</tr>`).join('') + '</table></div>');
      table = [];
    };
    const flushAll = () => { flushPara(); flushQuote(); flushTable(); };
    for (const raw of md.split('\n')) {
      if (math !== null) {                                   // многострочная $$ … $$
        math += '\n' + raw.trim();
        if (raw.trim().endsWith('$$')) { out.push(dispMath(math)); math = null; }
        continue;
      }
      const pg = raw.match(/<!--\s*стр\.\s*(\d+)/);
      if (pg) { flushAll(); out.push(`<div class="bk-page"><span>стр. ${pg[1]}</span></div>`); continue; }
      let l = raw;
      if (/^- /.test(l)) { flushAll(); out.push('<div class="bk-sep"></div>'); l = l.slice(2); }
      const t = l.trim();
      if (/^#{2,3} /.test(t)) { flushAll(); out.push(`<h3 class="bk-h">${bookInline(t.replace(/^#+\s*/, ''))}</h3>`); continue; }
      if (t === '---') { flushAll(); continue; }
      const img = t.match(/^!\[([^\]]*)\]\(([^)\s]+)\)$/);              // ![Рис. 1.2](../figures/fig-1.2.png)
      if (img) { flushAll(); out.push(bookImg(img[2].replace(/^\.\.\//, ''), img[1])); continue; }
      if (t.startsWith('|')) { flushPara(); flushQuote(); table.push(t); continue; }
      flushTable();
      if (t.startsWith('>')) { flushPara(); quote.push(t.replace(/^>\s?/, '')); continue; }
      flushQuote();
      if (t.startsWith('$$')) {
        flushPara();
        if (t.length > 2 && t.endsWith('$$')) out.push(dispMath(t)); else math = t;
        continue;
      }
      if (!t) { flushPara(); continue; }
      para.push(t);
    }
    if (math !== null) out.push(dispMath(math));
    flushAll();
    return out.join('');
  }

  // документы вкладок «Основные формулы» и «Примеры решения»
  const THEORY = [...(window.THEORY || [])].sort((a, b) => a.par - b.par);
  const docs = [];
  THEORY.forEach(th => {
    docs.push({ id: 'f' + th.par, kind: 'formulas', th, num: '§ ' + th.par, title: th.title.replace(/^§\s*\d+\.\s*/, ''),
      pages: th.formulas.pages, label: 'Формулы § ' + th.par, md: th.formulas.md });
    th.examples.forEach(ex => docs.push({ id: `e${th.par}.${ex.n}`, kind: 'example', th, ex, num: `${th.par}.${ex.n}`,
      title: ex.first, pages: ex.pages, label: `Пример ${th.par}.${ex.n}`, md: `### Пример ${ex.n}\n` + ex.md }));
  });
  const docById = new Map(docs.map(d => [d.id, d]));

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
    const items = TASKS.filter(t => (t.title + ' ' + t.section + ' ' + plain(t.book ? t.book.md : t.condition)).toLowerCase().replace(/ё/g, 'е').includes(s));
    return { items, s, mode: 'text' };
  }

  function rowHTML(t, res) {
    const num = res.mode === 'num' ? highlight(t.id, res.s) : esc(t.id);
    const title = res.mode === 'text' ? highlight(t.title, res.s) : esc(t.title);
    return `<button class="row${t.stub ? ' stub' : ''}" data-id="${t.id}"${t.stub ? ' title="Разбора пока нет: условие и ответ из книги"' : ''}>
      <span class="num">${icon('i-doc')}<b>${num}</b></span>
      <span class="row-title">${title}</span>
      <span class="page">${esc(t.page || '')}</span></button>`;
  }
  const groupHTML = (text, cls = '') => `<div class="group-h ${cls}">${icon('i-folder')}<span>${esc(text)}</span></div>`;

  /* раскрывающиеся папки: какие открыты — помним между запусками; сначала всё свёрнуто */
  let openSet = new Set();
  try { openSet = new Set(JSON.parse(localStorage.getItem('tree') || '[]')); } catch (e) {}
  function folderHTML(key, text, count, kids, level) {
    const op = openSet.has(key);
    return `<div class="tv"><button class="group-h lvl${level}${op ? '' : ' closed'}" type="button" data-key="${escA(key)}" aria-expanded="${op}">` +
      `<span class="tw"></span>${icon(op ? 'i-folder-open' : 'i-folder')}<span class="gt">${esc(text)}</span><span class="cnt">(${count})</span></button>` +
      (op ? `<div class="tv-kids">${kids()}</div>` : '') + '</div>';
  }
  function toggleFolder(key) {
    if (openSet.has(key)) openSet.delete(key); else openSet.add(key);
    try { localStorage.setItem('tree', JSON.stringify([...openSet])); } catch (e) {}
    const sc = list.parentElement, top = sc.scrollTop;
    renderList();
    sc.scrollTop = top;
  }

  /* вкладки «Задачи / Основные формулы / Примеры решения» */
  let tab = 'tasks';
  try { tab = localStorage.getItem('tab') || 'tasks'; } catch (e) {}
  const tabs = $('#tabs');
  function setTab(t) {
    tab = docs.length || t === 'tasks' ? t : 'tasks';
    try { localStorage.setItem('tab', tab); } catch (e) {}
    tabs.querySelectorAll('.tab').forEach(b => b.classList.toggle('sel', b.dataset.tab === tab));
    applyKb();
    renderList();
  }
  tabs.addEventListener('click', e => {
    const b = e.target.closest('.tab');
    if (b && b.dataset.tab !== tab) { setTab(b.dataset.tab); list.parentElement.scrollTop = 0; }
  });

  const docKind = () => (tab === 'formulas' ? 'formulas' : 'example');
  function searchDocs(raw) {
    const pool = docs.filter(d => d.kind === docKind());
    const s = norm(raw).replace(/^§\s*/, '');
    if (!s) return { items: pool, s, mode: 'all' };
    if (/^\d+(\.\d*)?$/.test(s)) {
      const key = d => (d.kind === 'formulas' ? String(d.th.par) : d.num);
      return { items: pool.filter(d => key(d) === s || (d.kind === 'example' && key(d).startsWith(s.includes('.') ? s : s + '.'))), s, mode: 'num' };
    }
    return { items: pool.filter(d => plain(d.md).toLowerCase().replace(/ё/g, 'е').includes(s)), s, mode: 'text' };
  }
  function docRowHTML(d, res) {
    const num = res.mode === 'num' ? highlight(d.num, res.s) : esc(d.num);
    return `<button class="row" data-id="${d.id}">
      <span class="num">${icon('i-doc')}<b>${num}</b></span>
      <span class="row-title">${esc(d.title)}</span>
      <span class="page">${esc(d.pages)}</span></button>`;
  }
  function renderDocList() {
    const res = searchDocs(q.value);
    qClear.hidden = !q.value;
    $('#foot').textContent = res.items.length + ' ' + plural(res.items.length, ['объект', 'объекта', 'объектов']);
    if (!res.items.length) {
      list.innerHTML = `<div class="empty">${icon('i-warn', 32)}<div><b>Ничего не найдено</b>${tab === 'formulas'
        ? 'Введи номер параграфа, например 2, или слово из текста.' : 'Введи номер примера, например 2.3 (§ 2, пример 3), или слово из текста.'}</div></div>`;
      return;
    }
    if (res.mode !== 'all') {
      list.innerHTML = groupHTML(res.mode === 'num' ? 'Найдено по номеру' : 'Найдено в тексте') + res.items.map(d => docRowHTML(d, res)).join('');
      return;
    }
    // формулы: глава → § ; примеры: глава → § → примеры
    const pre = tab === 'formulas' ? 'f|' : 'e|';
    const html = [...new Set(THEORY.map(th => th.chapter))].map(ch => {
      const items = res.items.filter(d => d.th.chapter === ch);
      return folderHTML(pre + ch, ch, items.length, () => tab === 'formulas'
        ? items.map(d => docRowHTML(d, res)).join('')
        : THEORY.filter(th => th.chapter === ch).map(th => {
          const its = items.filter(d => d.th === th);
          return its.length ? folderHTML(pre + th.par, th.title, its.length, () => its.map(d => docRowHTML(d, res)).join(''), 1) : '';
        }).join(''), 0);
    }).join('');
    list.innerHTML = `<div class="tree">${html}</div>`;
  }

  function renderList() {
    if (tab !== 'tasks') return renderDocList();
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
    // дерево как в Проводнике: глава → § → тема (как в книге) → задачи, папки раскрываются по нажатию
    const group3 = (arr, key) => arr.reduce((m, t) => { const k = key(t) || ''; if (!m.has(k)) m.set(k, []); m.get(k).push(t); return m; }, new Map());
    const count = arr => arr.length;
    let html = '';
    group3(res.items, t => t.chapter).forEach((chItems, ch) => {
      html += folderHTML('t|' + ch, ch.replace(/^Гл\.\s*/, 'Глава '), count(chItems), () =>
        [...group3(chItems, t => t.parTitle || t.section)].map(([par, parItems]) =>
          folderHTML('t|' + ch + '|' + par, par, count(parItems), () =>
            [...group3(parItems, t => (t.parTitle ? t.section : ''))].map(([topic, items]) => topic
              ? folderHTML('t|' + ch + '|' + par + '|' + topic, topic, count(items), () => items.map(t => rowHTML(t, res)).join(''), 2)
              : items.map(t => rowHTML(t, res)).join('')).join(''), 1)).join(''), 0);
    });
    list.innerHTML = '<div class="tree">' + html + '</div>';
  }

  q.addEventListener('input', renderList);
  q.addEventListener('keydown', e => {
    if (e.key !== 'Enter') return;
    const res = tab === 'tasks' ? search(q.value) : searchDocs(q.value);
    const exact = res.items.find(t => (tab === 'tasks' ? t.id : t.kind === 'formulas' ? String(t.th.par) : t.num) === res.s);
    const pick = exact || (res.items.length === 1 ? res.items[0] : null);
    if (pick) { q.blur(); open(pick.id); }
    else q.blur();
  });
  qClear.addEventListener('click', () => { q.value = ''; renderList(); q.focus(); });
  list.addEventListener('click', e => {
    const f = e.target.closest('.group-h[data-key]');
    if (f) { toggleFolder(f.dataset.key); return; }
    const r = e.target.closest('.row');
    if (r) open(r.dataset.id);
  });

  // переключатель цифровой / буквенной клавиатуры
  const kb = $('#kb-toggle');
  let kbMode = 'num';
  try { kbMode = localStorage.getItem('kb') || 'num'; } catch (e) {}
  function applyKb() {
    q.setAttribute('inputmode', kbMode === 'num' ? 'decimal' : 'text');
    q.placeholder = kbMode !== 'num' ? 'Поиск по словам: кольцо, диск…'
      : tab === 'formulas' ? 'Номер параграфа, например 2'
      : tab === 'examples' ? 'Номер примера, например 2.3' : 'Номер задачи, например 3.12';
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
  const scanFig = (src, cap) =>
    `<div class="field figure scan"><img src="${src}" alt="${escA(cap)}" loading="lazy"></div><div class="fig-cap">${esc(cap)}</div>`;
  let current = null;

  // «пример 3» в тексте разбора → ссылка на пример этого параграфа
  const linkExamples = (html, par) => html.replace(/(^|[^а-яё])(пример[а-яё]*\s+(\d+))/gi, (m, pre, txt, n) =>
    docById.has(`e${par}.${n}`) ? `${pre}<a class="xlink" href="#e${par}.${n}" data-id="e${par}.${n}">${txt}</a>` : m);
  function setFormulasBtn(par, show) {
    const b = $('#tb-formulas');
    b.hidden = !show || !docById.has('f' + par);
    b.dataset.id = 'f' + par;
  }

  function renderTask(t) {
    current = { id: t.id, label: 'Задача ' + t.id };
    const i = sorted.indexOf(t), prev = sorted[i - 1], next = sorted[i + 1];
    let fig = '';
    try { fig = typeof t.figure === 'function' ? t.figure() : (t.figure || ''); }
    catch (e) { console.error('Чертёж задачи ' + t.id + ':', e); }   // без чертежа, но задача открывается
    // рисунки из книги — картинки из сканов (bookFig или «рис. N.M» в условии), мои чертежи (figure) — то, чего в книге нет
    const figNums = t.bookFig ? [].concat(t.bookFig) : (t.book ? t.book.figs : []);
    const bookFigs = figNums.map(n => scanFig(`figures/fig-${n}.png`, 'Рис. ' + n)).join('');
    const given = (t.given || []).map(([g, si]) =>
      `<div>${tex(g)}</div><div class="si">${si ? tex(si) : '<span style="opacity:.5">—</span>'}</div>`).join('');
    // условие — дословно из книги; старое t.condition — только если задачи нет в book/
    const cond = t.book ? bookHTML(t.book.md) : `<p>${rich(t.condition)}</p>`;
    const bookAns = t.book && t.book.answer ? bookHTML(t.book.answer) : '';
    taskEl.innerHTML = `
      <div class="t-head">${icon('i-doc')}<div>
        <h1 class="t-num">Задача ${esc(t.id)}${t.book && t.book.star ? '*' : ''}</h1>
        <h2 class="t-title">${esc(t.stub ? t.section || t.parTitle : t.title)}</h2>
        <span class="t-chip">${esc(t.stub ? t.parTitle || '' : 'Тема: ' + t.section)}</span>
      </div></div>

      ${group('Условие', `<div class="condition cond">${cond}</div>
        ${t.note ? `<div class="note">${icon('i-warn', 32)}<div>${rich(t.note)}</div></div>` : ''}`)}

      ${t.given ? group('Дано', `<div class="field given-wrap">
          <div class="given-grid"><div class="gh">Дано</div><div class="gh">В СИ</div>${given}</div>
        </div>
        ${t.find ? `<div class="find"><span>Найти:</span><span>${tex(t.find)}</span></div>` : ''}`) : ''}

      ${bookFigs || fig ? group('Рисунок', bookFigs + (fig ? `<div class="field figure">${fig}</div>
        ${t.figCaption ? `<div class="fig-cap">${esc(t.figCaption)}</div>` : ''}` : '')) : ''}

      ${t.formulas && t.formulas.length ? group('Что используем', `<div class="flist">${t.formulas.map(f =>
        `<div class="f-item"><div class="f-tex">${tex(f.tex)}</div><div class="f-txt">${rich(f.text)}</div></div>`).join('')}</div>`) : ''}

      ${t.stub ? group('Решение', `<div class="note">${icon('i-info', 32)}<div>Разбора этой задачи пока нет. Ниже — ответ из книги.</div></div>`)
        : group('Решение', (t.steps || []).map((s, k) => `
        <div class="step"><div>
          <div class="step-t"><span class="step-n">Шаг ${k + 1}.</span> ${s.title ? esc(s.title) : ''}</div>
          ${s.text ? `<div class="step-p">${rich(s.text)}</div>` : ''}
          ${s.tex ? `<div class="mathblock" data-tex="${escA(s.tex)}"></div>` : ''}
        </div></div>`).join(''))}

      ${t.stub
        ? group('Ответ (из книги)', `<div class="field answer cond">${bookAns || '—'}</div>`, 'ok')
        : group('Ответ', `<div class="field answer">${(t.answer || []).flatMap(a => splitTop(a, ANS_SEP))
          .map(a => `<div class="a-row">${tex(a)}</div>`).join('')}</div>` +
          (bookAns ? `<div class="book-ans cond"><div class="ba-h">В книге:</div>${bookAns}</div>` : ''), 'ok')}

      <div class="pager">
        <button class="btn prev" ${prev ? `data-id="${prev.id}"` : 'disabled'}><span class="pn">‹ Предыдущая</span><span class="pl">${prev ? prev.id : ''}</span></button>
        <button class="btn next" ${next ? `data-id="${next.id}"` : 'disabled'}><span class="pn">Следующая ›</span><span class="pl">${next ? next.id : ''}</span></button>
      </div>`;
    const par = t.id.split('.')[0];
    taskEl.innerHTML = linkExamples(taskEl.innerHTML, par);
    fitAll(taskEl);
    setNav($('#tb-prev'), prev);
    setNav($('#tb-next'), next);
    setFormulasBtn(par, true);
    $('#task-nav-title').textContent = 'Задача ' + t.id;
    $('#task-status').textContent = [t.chapter, t.parTitle, t.section].filter(Boolean).join(' · ') + (t.page ? ' · стр. ' + t.page : '');
    taskScroll.scrollTop = 0;
    document.title = 'Задача ' + t.id;
  }
  /* страница книги: «Основные формулы § N» или «Пример N» */
  function renderDoc(d) {
    current = { id: d.id, label: d.label };
    const pool = docs.filter(x => x.kind === d.kind), i = pool.indexOf(d), prev = pool[i - 1], next = pool[i + 1];
    const what = d.kind === 'formulas' ? 'Основные формулы' : 'Примеры решения задач · пример ' + d.ex.n;
    taskEl.innerHTML = `
      <div class="t-head">${icon('i-app')}<div>
        <h1 class="t-num">${esc(d.th.title)}</h1>
        <h2 class="t-title">${esc(what)}</h2>
        <span class="t-chip">${esc(d.th.chapter)} · стр. ${esc(d.pages)}</span>
      </div></div>
      <div class="field book">${bookHTML(d.md)}</div>
      <div class="pager">
        <button class="btn prev" ${prev ? `data-id="${prev.id}"` : 'disabled'}><span class="pn">‹ Предыдущий</span><span class="pl">${prev ? esc(prev.label) : ''}</span></button>
        <button class="btn next" ${next ? `data-id="${next.id}"` : 'disabled'}><span class="pn">Следующий ›</span><span class="pl">${next ? esc(next.label) : ''}</span></button>
      </div>`;
    fitAll(taskEl);
    setNav($('#tb-prev'), prev);
    setNav($('#tb-next'), next);
    setFormulasBtn(d.th.par, d.kind === 'example');
    $('#task-nav-title').textContent = d.label;
    $('#task-status').textContent = d.th.chapter + ' · ' + d.th.title + ' · стр. ' + d.pages;
    taskScroll.scrollTop = 0;
    document.title = d.label;
  }

  function setNav(b, t) {
    b.disabled = !t;
    if (t) b.dataset.id = t.id; else delete b.dataset.id;
  }
  const goTo = e => {
    const b = e.target.closest('button[data-id]');
    if (b) location.replace('#' + b.dataset.id);
  };
  taskEl.addEventListener('click', e => {
    const a = e.target.closest('a.xlink');
    if (a) { e.preventDefault(); open(a.dataset.id); return; }
    if (e.target.closest('.pager')) goTo(e);
  });
  $('#tb-prev').addEventListener('click', goTo);
  $('#tb-next').addEventListener('click', goTo);
  $('#tb-formulas').addEventListener('click', e => open(e.currentTarget.dataset.id));

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
    const t = byId.get(id), d = docById.get(id);
    // окно показываем до отрисовки: подгонка формул по ширине (fitAll) в скрытом окне не работает
    if (t) { app.classList.add('on-task'); renderTask(t); }
    else if (d) { app.classList.add('on-task'); renderDoc(d); }
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
    else if (act === 'max') { desk.classList.toggle('maxed'); setTimeout(() => fitAll(taskEl), 0); }
    else if (act === 'close') { if (inTask) goBack(); else minimize(); }
  });
  $('#desk-app').addEventListener('click', toList);

  /* ---------- панель задач ---------- */
  const tasksBar = $('#tasks');
  function renderTaskbar() {
    const min = desk.classList.contains('minimized'), tk = onTask();
    let html = `<button class="btn${!min && !tk ? ' pressed' : ''}" type="button" data-win="list">${icon('i-app')}<span>Задачник</span></button>`;
    if (tk && current) html += `<button class="btn${!min ? ' pressed' : ''}" type="button" data-win="task">${icon('i-doc')}<span>${esc(current.label)}</span></button>`;
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
      '<p>' + TASKS.length + ' ' + plural(TASKS.length, ['задача', 'задачи', 'задач']) + ' (условия и ответы — как в книге), ' +
      'с разбором — ' + SOLVED.length + '. Работает без интернета.</p>');
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

  let rz; window.addEventListener('resize', () => { clearTimeout(rz); rz = setTimeout(() => fitAll(taskEl), 150); });
  // шрифты KaTeX грузятся позже первого рисования — после загрузки ширины формул другие, подгоняем заново
  if (document.fonts) {
    document.fonts.ready.then(() => fitAll(taskEl));
    document.fonts.addEventListener('loadingdone', () => fitAll(taskEl));
  }

  /* ---------- старт ---------- */
  setTab(tab);
  route();

  if ('serviceWorker' in navigator && location.protocol.startsWith('http')) {
    window.addEventListener('load', () => navigator.serviceWorker.register('sw.js').catch(() => {}));
  }
})();
