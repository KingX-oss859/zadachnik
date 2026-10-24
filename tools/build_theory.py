"""Сборка вкладок «Основные формулы» и «Примеры решения задач» из оцифрованной книги.

Берёт из book/NN-glX-parN-*.md всё между «ОСНОВНЫЕ ФОРМУЛЫ» и «## ЗАДАЧИ» — дословно, без правок —
и пишет data/theory.js. Текст остаётся в Markdown + LaTeX, приложение рисует его само,
рисунки — картинки из figures/. Ещё пишет sw-assets.js — список картинок для работы без интернета.
Запуск (после правки book/*.md или задач с bookFig — запустить снова):
    python -X utf8 tools/build_theory.py
"""
import json
import pathlib
import re

ROOT = pathlib.Path(__file__).resolve().parent.parent
BOOK, DATA = ROOT / 'book', ROOT / 'data'
PAGE = re.compile(r'<!--\s*стр\.\s*(\d+)')


GREEK = {'alpha': 'α', 'beta': 'β', 'varphi': 'φ', 'varepsilon': 'ε', 'omega': 'ω', 'mu': 'μ', 'tau': 'τ',
         'pi': 'π', 'Delta': 'Δ', 'xi': 'ξ', 'rho': 'ρ', 'sigma': 'σ', 'eta': 'η', 'langle': '⟨', 'rangle': '⟩'}


def plain(s):
    """Простой текст из строки с LaTeX — для подписи примера в списке."""
    def math(m):
        t = m.group(1)
        t = re.sub(r'\\(?:text|mathbf|boldsymbol|mathrm|operatorname)\{([^{}]*)\}', r'\1', t)
        t = re.sub(r'\\[dt]?frac\{([^{}]*)\}\{([^{}]*)\}', r'\1/\2', t)
        t = t.replace('{,}', ',').replace(r'\cdot', '·').replace(r'\ ', ' ').replace(r'\,', ' ').replace(r'\quad', ' ')
        t = re.sub(r'\^\{?2\}?', '²', t)
        t = re.sub(r'\^\{?3\}?', '³', t)
        t = re.sub(r'\^\{?-1\}?', '⁻¹', t)
        t = re.sub(r'\\([A-Za-z]+)', lambda g: GREEK.get(g.group(1), ''), t)
        return re.sub(r'[_{}]', '', t)
    s = re.sub(r'\$([^$]*)\$', math, s)
    s = re.sub(r'\*\*?([^*]+)\*\*?', r'\1', s)
    s = re.sub(r'\s+', ' ', s).strip()
    cut = re.search(r'[.?] (?=[А-ЯЁ])', s)        # не режем на «рис. 2.1»
    s = s[:cut.start() + 1] if cut else s
    return s if len(s) <= 140 else s[:139].rsplit(' ', 1)[0] + '…'


def pages(lines, start_page):
    """Диапазон страниц куска: страница начала и все отметки «стр. N» внутри."""
    nums = [start_page] + [int(m.group(1)) for l in lines if (m := PAGE.search(l))]
    lo, hi = min(nums), max(nums)
    return str(lo) if lo == hi else f'{lo}–{hi}'


def trim(lines):
    """Убирает пустые строки, «---» и висящие отметки страниц по краям куска."""
    while lines and (not lines[-1].strip() or lines[-1].strip() == '---' or PAGE.search(lines[-1])):
        lines = lines[:-1]
    while lines and (not lines[0].strip() or lines[0].strip() == '---'):
        lines = lines[1:]
    return lines


def find(lines, pattern):
    rx = re.compile(pattern)
    return next((i for i, l in enumerate(lines) if rx.match(l)), None)


EXAMPLE = re.compile(r'^(?:#{3,4} Пример (\d+)\.?\s*$|\*\*Пример (\d+)\.\*\*\s*)')   # «### Пример 1» или «**Пример 1.** …»
IMAGE = re.compile(r'!\[[^\]]*\]\(\.\./(figures/[^)\s]+)\)')


def build(path):
    lines = path.read_text(encoding='utf-8').splitlines()
    # «# Глава 1. … — § 1. Кинематика» или «# Глава 3. …» + «## § 14. …»
    head = lines[0].lstrip('# ').strip()
    if '—' in head:
        chapter, title = [s.strip() for s in head.split('—', 1)]
    else:
        chapter = head
        title = lines[find(lines, r'^#{2,3} §')].lstrip('# ').strip()
    par = int(re.search(r'§\s*(\d+)', title).group(1))

    i_f = find(lines, r'^#{2,3} ОСНОВНЫЕ ФОРМУЛЫ')
    i_e = find(lines, r'^#{2,3} ПРИМЕРЫ РЕШЕНИЯ ЗАДАЧ')
    i_t = find(lines, r'^## ЗАДАЧИ')
    if None in (i_f, i_e, i_t):
        print(f'{path.name}: нет разделов «Основные формулы / Примеры / Задачи» — пропущен')
        return None

    page = 0
    for l in lines[:i_f]:
        if m := PAGE.search(l):
            page = int(m.group(1))
    # отметка страницы прямо перед заголовком — часть раздела
    start = i_f - 1 if PAGE.search(lines[i_f - 1]) else i_f
    f_lines = trim(lines[start:i_e])
    formulas = {'pages': pages(f_lines, page), 'md': '\n'.join(f_lines)}

    for l in lines[start:i_e]:
        if m := PAGE.search(l):
            page = int(m.group(1))
    examples, cur, cur_page = [], None, page
    for l in lines[i_e + 1:i_t]:
        if m := EXAMPLE.match(l):
            if cur:
                examples.append(cur)
            cur = {'n': int(m.group(1) or m.group(2)), 'start': cur_page, 'lines': []}
            rest = l[m.end():].strip()               # у «**Пример 1.** Текст…» текст идёт в той же строке
            if rest:
                cur['lines'].append(rest)
            continue
        if m := PAGE.search(l):
            cur_page = int(m.group(1))
        if cur:
            cur['lines'].append(l)
    if cur:
        examples.append(cur)

    out = []
    for e in examples:
        ls = trim(e['lines'])
        first = next((l for l in ls if l.strip() and not IMAGE.search(l) and not PAGE.search(l)), '')
        out.append({'n': e['n'], 'pages': pages(ls, e['start']), 'first': plain(first), 'md': '\n'.join(ls)})

    tasks = book_tasks(lines[i_t + 1:], par, chapter, title, page_before(lines, i_t))
    print(f'{path.name}: § {par}, формулы стр. {formulas["pages"]}, примеров {len(out)}, задач {len(tasks)}')
    return {'par': par, 'chapter': chapter, 'title': title, 'formulas': formulas, 'examples': out, 'tasks': tasks}


TASK = re.compile(r'^\*\*(\d+)\.(\d+)(\\\*)?\.\*\*\s*')          # «**1.6.** …», «**2.93\*.** …»
PAGE_INLINE = re.compile(r'\s*<!--\s*стр\.[^>]*-->\s*')


def split_page(s):
    """Отметка страницы посреди строки: (номер страницы или None, строка без отметки)."""
    m = PAGE.search(s)
    if not m or PAGE_INLINE.fullmatch(s):
        return (int(m.group(1)) if m else None), s
    return int(m.group(1)), PAGE_INLINE.sub(' ', s).strip()
FIGREF = re.compile(r'рис\.\s*(\d+\.\d+)', re.I)


def page_before(lines, i):
    page = 0
    for l in lines[:i]:
        if m := PAGE.search(l):
            page = int(m.group(1))
    return page


def book_tasks(lines, par, chapter, title, page):
    """Задачи параграфа дословно: условие, тема (### заголовок), страница, рисунки по упоминанию «рис. N.M».
    В условие идут сноски «⁷⁾ …» и «Указание»; пометки расшифровщика «*(…)*» и служебные «> …» — нет."""
    out, cur, topic = [], None, ''
    for l in lines:
        s = l.strip()
        if s == '---':
            break
        pg, s2 = split_page(s)
        if pg:
            page = pg
            if s2 == s:                              # отметка отдельной строкой — оставляем, приложение её покажет
                if cur:
                    cur['lines'].append(s)
                continue
            s = l = s2                               # отметка посреди строки — убираем, текст оставляем
        if s.startswith('### '):
            topic = s[4:].strip()
            continue
        if m := TASK.match(s):
            cur = {'id': f'{m.group(1)}.{m.group(2)}', 'par': par, 'chapter': chapter, 'parTitle': title,
                   'topic': topic, 'page': page, 'star': bool(m.group(3)), 'lines': [s[m.end():]]}
            out.append(cur)
            continue
        if not cur or IMAGE.search(s) or re.fullmatch(r'\*\(.*\)\*', s):
            continue
        if s.startswith('>') and not re.match(r'>\s*([⁰¹²³⁴⁵⁶⁷⁸⁹]+⁾|\*?Указание)', s):
            continue
        cur['lines'].append(l)
    for t in out:
        ls = trim(t.pop('lines'))
        t['md'] = '\n'.join(ls)
        pages_ = sorted({t['page']} | {int(m.group(1)) for l in ls if (m := PAGE.search(l))})
        t['page'] = str(pages_[0]) if len(pages_) == 1 else f'{pages_[0]}–{pages_[-1]}'
        t['figs'] = [n for n in dict.fromkeys(FIGREF.findall(t['md'])) if (ROOT / f'figures/fig-{n}.png').exists()]
        t['first'] = plain(next((l for l in ls if l.strip() and not PAGE.search(l)), ''))
    return out


def book_answers():
    """Ответы из book/99-otvety.md: id → Markdown ответа дословно (с картинками «К ответу …»)."""
    ans, cur = {}, None
    for l in (BOOK / '99-otvety.md').read_text(encoding='utf-8').splitlines():
        s = l.strip()
        if s.startswith('## ') or s == '---':
            cur = None
            continue
        pg, s2 = split_page(s)
        if (pg and s2 == s) or re.match(r'>\s*К ответу', s):
            continue
        s = l = s2
        if m := TASK.match(s):
            cur = f'{m.group(1)}.{m.group(2)}'
            ans[cur] = [s[m.end():]]
            continue
        if cur:
            ans[cur].append(l)
    # пометки переписчика со ссылкой «в конце файла» в приложении не имеют смысла
    junk = re.compile(r'\s*\*\([^)]*в конце файла[^)]*\)\*')
    return {k: junk.sub('', '\n'.join(trim(v))) for k, v in ans.items()}


# все параграфы — в один файл data/theory.js; новый параграф в book/ подхватывается сам
theory = [t for p in sorted(BOOK.glob('*-gl*-par*.md')) if (t := build(p))]
theory.sort(key=lambda t: t['par'])
tasks = [t for th in theory for t in th.pop('tasks')]
answers = book_answers()


def unpage(md):
    """Переход на новую страницу внутри условия: перенос «ле-|жащей» склеиваем, отметку страницы убираем."""
    md = re.sub(r'([а-яё])-\n<!--[^>]*-->\n', r'\1', md)
    return re.sub(r'\n<!--[^>]*-->\n', '\n', md)


for t in tasks:
    t['md'] = unpage(t['md'])
    t['answer'] = unpage(answers.get(t['id'], ''))
(DATA / 'theory.js').write_text(
    '/* Сгенерировано tools/build_theory.py из book/*.md — не править вручную,\n'
    '   править book/*.md и запускать скрипт снова. Текст книги перенесён дословно. */\n'
    'window.THEORY = ' + json.dumps(theory, ensure_ascii=False, indent=1) + ';\n', encoding='utf-8')
(DATA / 'book-tasks.js').write_text(
    '/* Сгенерировано tools/build_theory.py: все задачи книги — условие и ответ дословно из book/*.md.\n'
    '   Разборы (Дано, решение) — в data/tasks*.js; задача без разбора показывается с условием и ответом книги. */\n'
    'window.BOOK_TASKS = ' + json.dumps(tasks, ensure_ascii=False, indent=1) + ';\n', encoding='utf-8')
print(f'book-tasks.js: {len(tasks)} задач, с ответом книги {sum(bool(t["answer"]) for t in tasks)}')

# картинки, которые нужны приложению без интернета: страницы книги, рисунки к условиям, графики к ответам
used = set()
for t in theory:
    for md in [t['formulas']['md']] + [e['md'] for e in t['examples']]:
        used.update(IMAGE.findall(md))
for t in tasks:
    used.update(f'figures/fig-{n}.png' for n in t['figs'])
    used.update(IMAGE.findall(t['answer']))
for js in DATA.glob('tasks*.js'):
    text = js.read_text(encoding='utf-8')
    for val in re.findall(r"bookFig:\s*(\[[^\]]*\]|'[^']*')", text):
        for n in re.findall(r"'([^']+)'", val):
            used.add(f"figures/fig-{n}.png")
missing = sorted(f for f in used if not (ROOT / f).exists())
if missing:
    print('НЕТ ФАЙЛОВ:', ', '.join(missing))
(ROOT / 'sw-assets.js').write_text(
    '/* Сгенерировано tools/build_theory.py — картинки книги для работы без интернета (sw.js). */\n'
    'self.FIGURE_ASSETS = ' + json.dumps(sorted(used - set(missing)), indent=1) + ';\n', encoding='utf-8')
print(f'theory.js: {len(theory)} параграфов; sw-assets.js: {len(used) - len(missing)} картинок')
