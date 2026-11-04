/*
  § 15. Потенциал. Энергия системы электрических зарядов. Работа по перемещению заряда в поле —
  задачи 15.1–15.77 (стр. 245–255).
  Условия задач показываются дословно из книги (data/book-tasks.js).
  Ответы пересчитаны скриптом tools/check_potentsial.py и сверены с book/99-otvety.md.
  Где ответ книги расходится с расчётом — плашка note «Расхождение с ответом книги».
  ε₀ = 8,85·10⁻¹² Ф/м, 1/(4πε₀) = 8,99·10⁹ м/Ф; e = 1,60·10⁻¹⁹ Кл; mₑ = 9,11·10⁻³¹ кг; mₚ = 1,67·10⁻²⁷ кг.
  Диэлектрические проницаемости — табл. 17: парафин 2, эбонит 3, стекло 7.
  Книга часто считает с 1/(4πε₀) = 9·10⁹ — отсюда расхождения в последней цифре.
*/
(function () {
  const CH = 'Гл. 3. Электростатика';
  const S1 = 'Потенциальная энергия и потенциал поля точечных зарядов';
  const S2 = 'Потенциал поля линейно распределённых зарядов';
  const S3 = 'Потенциал поля зарядов, распределённых по поверхности';
  const S4 = 'Потенциал поля зарядов, распределённых по объёму';
  const S5 = 'Градиент потенциала и его связь с напряжённостью поля';
  const S6 = 'Работа по перемещению зарядов в поле';
  const S7 = 'Движение заряженных частиц в электрическом поле';
  const MISMATCH = '<b>Расхождение с ответом книги.</b> ';
  const SMALL = '<b>Расхождение в последней цифре.</b> ';
  const TYPO = '<b>Опечатка в ответе книги.</b> ';
  const K9 = (book) => SMALL + 'В книге ' + book + ' — так выходит с 1/(4πε₀) = 9·10⁹ м/Ф. С 8,99·10⁹ — наш ответ.';

  const PHI = { tex: String.raw`\varphi = \frac{\Pi}{Q}`, text: 'потенциал — потенциальная энергия единичного положительного заряда в данной точке' };
  const PHIQ = { tex: String.raw`\varphi = \frac{Q}{4\pi\varepsilon_0\varepsilon r}`, text: 'потенциал поля точечного заряда (и заряженной сферы вне её)' };
  const SUPP = { tex: String.raw`\varphi = \sum\varphi_i`, text: 'принцип суперпозиции: потенциалы складываются алгебраически (со знаками)' };
  const WPAIR = { tex: String.raw`\Pi = \frac{Q_1Q_2}{4\pi\varepsilon_0 r}`, text: 'энергия взаимодействия двух точечных зарядов' };
  const WSYS = { tex: String.raw`\Pi = \sum_{i<j}\frac{Q_iQ_j}{4\pi\varepsilon_0 r_{ij}}`, text: 'энергия системы зарядов — сумма энергий всех пар' };
  const WORK = { tex: String.raw`A = Q(\varphi_1 - \varphi_2)`, text: 'работа сил поля при перемещении заряда Q из точки 1 в точку 2' };
  const WEXT = { tex: String.raw`A' = -A = Q(\varphi_2 - \varphi_1)`, text: 'работа внешних сил — та же по модулю, противоположная по знаку' };
  const DQ = { tex: String.raw`d\varphi = \frac{dQ}{4\pi\varepsilon_0 r},\quad dQ = \tau\,dl`, text: 'заряженное тело разбиваем на точечные заряды dQ и складываем (интегрируем) их потенциалы' };
  const LINE = { tex: String.raw`\varphi_1 - \varphi_2 = \frac{\tau}{2\pi\varepsilon_0\varepsilon}\ln\frac{r_2}{r_1}`, text: 'разность потенциалов в поле бесконечной нити (цилиндра вне его) с линейной плотностью τ' };
  const PLANE = { tex: String.raw`E = \frac{\sigma}{2\varepsilon_0},\quad \varphi_1 - \varphi_2 = E d`, text: 'поле бесконечной плоскости однородно; разность потенциалов = E · расстояние вдоль поля' };
  const SPH = { tex: String.raw`\varphi = \frac{Q}{4\pi\varepsilon_0 R}\ (r \le R),\quad \varphi = \frac{Q}{4\pi\varepsilon_0 r}\ (r \ge R)`, text: 'металлическая сфера (шар): внутри потенциал везде как на поверхности' };
  const GRAD = { tex: String.raw`\mathbf E = -\operatorname{grad}\varphi,\quad E = -\frac{d\varphi}{dr}`, text: 'напряжённость направлена в сторону убывания потенциала; градиент — в сторону возрастания' };
  const EUD = { tex: String.raw`U = E\,d\cos\alpha`, text: 'однородное поле: разность потенциалов = E · смещение вдоль линии поля' };
  const EINT = { tex: String.raw`\varphi_1 - \varphi_2 = \int_{r_1}^{r_2}E\,dr`, text: 'разность потенциалов через напряжённость (интеграл по пути вдоль поля)' };
  const KIN = { tex: String.raw`\frac{mv_2^2}{2} - \frac{mv_1^2}{2} = Q(\varphi_1 - \varphi_2)`, text: 'теорема о кинетической энергии: работа поля идёт на изменение кинетической энергии частицы' };
  const ACC = { tex: String.raw`a = \frac{|Q|E}{m}`, text: 'ускорение заряда в однородном поле (силой тяжести пренебрегаем)' };
  const KCONST = { tex: String.raw`\frac{1}{4\pi\varepsilon_0} = 8{,}99\cdot10^9\ \text{м/Ф}`, text: 'ε₀ = 8,85·10⁻¹² Ф/м' };

  window.TASKS.push(

  /* ===================== 15.1 ===================== */
  {
    id: '15.1', chapter: CH, section: S1, page: '245',
    title: 'Потенциал по энергии заряда',
    given: [[String.raw`Q = 10\ \text{нКл}`, String.raw`10^{-8}\ \text{Кл}`], [String.raw`\Pi = 10\ \text{мкДж}`, String.raw`10^{-5}\ \text{Дж}`]],
    find: String.raw`\varphi \;—\; ?`,
    formulas: [PHI],
    steps: [
      { title: 'Определение потенциала',
        tex: String.raw`\varphi = \frac{\Pi}{Q} = \frac{10^{-5}}{10^{-8}} = 10^3\ \text{В}` },
    ],
    answer: [String.raw`\varphi = 1\ \text{кВ}`],
  },

  /* ===================== 15.2 ===================== */
  {
    id: '15.2', chapter: CH, section: S1, page: '245',
    title: 'Работа внешних сил и разность потенциалов',
    given: [[String.raw`Q = 20\ \text{нКл}`, String.raw`2\cdot10^{-8}\ \text{Кл}`], [String.raw`A = 4\ \text{мкДж}`, String.raw`4\cdot10^{-6}\ \text{Дж}`]],
    find: String.raw`A_1,\ \Delta\varphi \;—\; ?`,
    formulas: [WORK, WEXT],
    steps: [
      { title: 'Работа сил поля',
        text: 'Внешние силы и силы поля совершают равные по модулю работы противоположного знака.',
        tex: String.raw`A_1 = -A = -4\ \text{мкДж}` },
      { title: 'Разность потенциалов',
        text: 'A₁ = Q(φ₁ − φ₂) < 0, значит, конечная точка имеет больший потенциал.',
        tex: String.raw`\Delta\varphi = \varphi_2 - \varphi_1 = \frac{A}{Q} = \frac{4\cdot10^{-6}}{2\cdot10^{-8}} = 200\ \text{В}` },
    ],
    answer: [String.raw`A_1 = -4\ \text{мкДж}`, String.raw`\Delta\varphi = 200\ \text{В}`],
  },

  /* ===================== 15.3 ===================== */
  {
    id: '15.3', chapter: CH, section: S1, page: '245',
    title: 'Изменение энергии на единицу заряда',
    given: [[String.raw`Q_1 = 6\ \text{нКл}`, String.raw`6\cdot10^{-9}\ \text{Кл}`], [String.raw`r_1 = 20\ \text{см}`, String.raw`0{,}2\ \text{м}`], [String.raw`r_2 = 50\ \text{см}`, String.raw`0{,}5\ \text{м}`]],
    find: String.raw`\Delta\Pi/Q_2 \;—\; ?`,
    formulas: [PHIQ, PHI, KCONST],
    steps: [
      { title: 'Изменение энергии = Q₂ · изменение потенциала',
        tex: String.raw`\frac{\Delta\Pi}{Q_2} = \varphi_B - \varphi_A = \frac{Q_1}{4\pi\varepsilon_0}\left(\frac{1}{r_2} - \frac{1}{r_1}\right)` },
      { title: 'Считаем',
        tex: String.raw`\frac{\Delta\Pi}{Q_2} = 8{,}99\cdot10^9\cdot6\cdot10^{-9}\left(\frac{1}{0{,}5} - \frac{1}{0{,}2}\right) = 53{,}9\cdot(-3) = -162\ \text{Дж/Кл}` },
    ],
    answer: [String.raw`\frac{\Delta\Pi}{Q_2} = -162\ \text{Дж/Кл}`],
  },

  /* ===================== 15.4 ===================== */
  {
    id: '15.4', chapter: CH, section: S1, page: '245',
    title: 'Работа без понятия потенциала',
    given: [[String.raw`Q_1 = 50\ \text{нКл}`, String.raw`5\cdot10^{-8}\ \text{Кл}`], [String.raw`Q_2 = -2\ \text{нКл}`, String.raw`-2\cdot10^{-9}\ \text{Кл}`], [String.raw`r_1 = 10\ \text{см}`, String.raw`0{,}1\ \text{м}`], [String.raw`r_2 = 20\ \text{см}`, String.raw`0{,}2\ \text{м}`]],
    find: String.raw`A,\ \Delta\Pi \;—\; ?`,
    formulas: [{ tex: String.raw`F = \frac{Q_1Q_2}{4\pi\varepsilon_0 r^2}`, text: 'закон Кулона (F > 0 — отталкивание, F < 0 — притяжение)' }, KCONST],
    steps: [
      { title: 'Работа внешней силы на участке dr',
        text: 'Заряды разноимённые — притягиваются. Чтобы удалять Q₂ от Q₁ медленно, внешняя сила должна быть равна силе притяжения и направлена от Q₁. Работа поля зависит только от расстояний r₁ и r₂, поэтому путь считаем по радиусу.',
        tex: String.raw`dA = -F\,dr = -\frac{Q_1Q_2}{4\pi\varepsilon_0 r^2}dr` },
      { title: 'Интегрируем от r₁ до r₂',
        tex: String.raw`A = -\frac{Q_1Q_2}{4\pi\varepsilon_0}\int_{r_1}^{r_2}\frac{dr}{r^2} = \frac{Q_1Q_2}{4\pi\varepsilon_0}\left(\frac{1}{r_2} - \frac{1}{r_1}\right)` },
      { title: 'Считаем',
        tex: String.raw`A = 8{,}99\cdot10^9\cdot5\cdot10^{-8}\cdot(-2\cdot10^{-9})\left(\frac{1}{0{,}2} - \frac{1}{0{,}1}\right) = 4{,}5\cdot10^{-6}\ \text{Дж}` },
      { title: 'Изменение потенциальной энергии',
        text: 'Вся работа внешних сил идёт на увеличение потенциальной энергии системы.',
        tex: String.raw`\Delta\Pi = A = 4{,}5\ \text{мкДж}` },
    ],
    answer: [String.raw`A = 4{,}5\ \text{мкДж}`, String.raw`\Delta\Pi = +4{,}5\ \text{мкДж}`],
  },

  /* ===================== 15.5 ===================== */
  {
    id: '15.5', chapter: CH, section: S1, page: '245',
    title: 'Потенциал точечного заряда',
    given: [[String.raw`Q = 1\ \text{нКл}`, String.raw`10^{-9}\ \text{Кл}`], [String.raw`r = 20\ \text{см}`, String.raw`0{,}2\ \text{м}`]],
    find: String.raw`\varphi \;—\; ?`,
    formulas: [PHIQ, KCONST],
    steps: [
      { title: 'Потенциал точечного заряда',
        tex: String.raw`\varphi = \frac{Q}{4\pi\varepsilon_0 r} = 8{,}99\cdot10^9\cdot\frac{10^{-9}}{0{,}2} = 45\ \text{В}` },
    ],
    answer: [String.raw`\varphi = 45\ \text{В}`],
  },

  /* ===================== 15.6 ===================== */
  {
    id: '15.6', chapter: CH, section: S1, page: '245',
    title: 'Потенциал от двух зарядов',
    given: [[String.raw`Q_1 = -0{,}2\ \text{мкКл}`, String.raw`-2\cdot10^{-7}\ \text{Кл}`], [String.raw`Q_2 = 0{,}5\ \text{мкКл}`, String.raw`5\cdot10^{-7}\ \text{Кл}`], [String.raw`r_1 = 15\ \text{см}`, String.raw`0{,}15\ \text{м}`], [String.raw`r_2 = 25\ \text{см}`, String.raw`0{,}25\ \text{м}`]],
    find: String.raw`\varphi,\ d_{\min},\ d_{\max} \;—\; ?`,
    formulas: [PHIQ, SUPP, KCONST],
    steps: [
      { title: 'Суперпозиция',
        text: 'Потенциал — скаляр, взаимное расположение зарядов не важно, нужны только расстояния.',
        tex: String.raw`\varphi = \frac{1}{4\pi\varepsilon_0}\left(\frac{Q_1}{r_1} + \frac{Q_2}{r_2}\right) = 8{,}99\cdot10^9\left(\frac{-2\cdot10^{-7}}{0{,}15} + \frac{5\cdot10^{-7}}{0{,}25}\right) = 6{,}0\cdot10^3\ \text{В}` },
      { title: 'Возможные расстояния между зарядами',
        text: 'Заряды и точка образуют треугольник (или лежат на одной прямой). По неравенству треугольника:',
        tex: String.raw`r_2 - r_1 \le d \le r_1 + r_2\ \Rightarrow\ d_{\min} = 10\ \text{см},\quad d_{\max} = 40\ \text{см}` },
    ],
    answer: [String.raw`\varphi = 6\ \text{кВ}`, String.raw`d_{\min} = 10\ \text{см};\quad d_{\max} = 40\ \text{см}`],
  },

  /* ===================== 15.7 ===================== */
  {
    id: '15.7', chapter: CH, section: S1, page: '245',
    title: 'E и φ на перпендикуляре к диполю',
    given: [[String.raw`Q_1 = 1\ \text{мкКл}`, String.raw`10^{-6}\ \text{Кл}`], [String.raw`Q_2 = -1\ \text{мкКл}`, String.raw`-10^{-6}\ \text{Кл}`], [String.raw`d = 10\ \text{см}`, String.raw`0{,}1\ \text{м}`], [String.raw`r = 10\ \text{см}`, String.raw`0{,}1\ \text{м}`]],
    find: String.raw`E,\ \varphi \;—\; ?`,
    formulas: [PHIQ, SUPP, { tex: String.raw`E = \frac{|Q|}{4\pi\varepsilon_0 r^2}`, text: 'напряжённость поля точечного заряда' }],
    steps: [
      { title: 'Расстояния',
        text: 'Точка лежит на перпендикуляре к линии зарядов, проходящем через Q₁. До Q₂ — гипотенуза.',
        tex: String.raw`r_1 = r = 0{,}1\ \text{м},\quad r_2 = \sqrt{r^2 + d^2} = 0{,}141\ \text{м}` },
      { title: 'Напряжённости от каждого заряда',
        text: 'E₁ направлена от Q₁ (вдоль перпендикуляра), E₂ — к Q₂ (по гипотенузе). Угол между ними: cos β = −r/r₂.',
        tex: String.raw`E_1 = \frac{8{,}99\cdot10^9\cdot10^{-6}}{0{,}01} = 899\ \text{кВ/м},\quad E_2 = \frac{8{,}99\cdot10^9\cdot10^{-6}}{0{,}02} = 450\ \text{кВ/м}` },
      { title: 'Векторная сумма',
        tex: String.raw`E = \sqrt{E_1^2 + E_2^2 - 2E_1E_2\frac{r}{r_2}} = \frac{Q_1}{4\pi\varepsilon_0}\sqrt{\frac{1}{r^4} + \frac{1}{(r^2 + d^2)^2} - \frac{2}{r(r^2 + d^2)^{3/2}}} = 663\ \text{кВ/м}` },
      { title: 'Потенциал',
        tex: String.raw`\varphi = \frac{Q_1}{4\pi\varepsilon_0}\left(\frac{1}{r} - \frac{1}{\sqrt{r^2 + d^2}}\right) = 8{,}99\cdot10^3\cdot(10 - 7{,}07) = 26{,}3\cdot10^3\ \text{В}` },
    ],
    answer: [String.raw`E = 663\ \text{кВ/м}`, String.raw`\varphi = 26{,}3\ \text{кВ}`],
    note: K9('664 кВ/м и 26,4 кВ') + ' В формуле φ в ответе книги буква l — это расстояние d между зарядами.',
  },

  /* ===================== 15.8 ===================== */
  {
    id: '15.8', chapter: CH, section: S1, page: '245',
    title: 'Энергия двух зарядов',
    given: [[String.raw`Q_1 = 100\ \text{нКл}`, String.raw`10^{-7}\ \text{Кл}`], [String.raw`Q_2 = 10\ \text{нКл}`, String.raw`10^{-8}\ \text{Кл}`], [String.raw`d = 10\ \text{см}`, String.raw`0{,}1\ \text{м}`]],
    find: String.raw`\Pi \;—\; ?`,
    formulas: [WPAIR, KCONST],
    steps: [
      { title: 'Энергия взаимодействия',
        tex: String.raw`\Pi = \frac{Q_1Q_2}{4\pi\varepsilon_0 d} = 8{,}99\cdot10^9\cdot\frac{10^{-7}\cdot10^{-8}}{0{,}1} = 9{,}0\cdot10^{-5}\ \text{Дж}` },
    ],
    answer: [String.raw`\Pi = 90\ \text{мкДж}`],
  },

  /* ===================== 15.9 ===================== */
  {
    id: '15.9', chapter: CH, section: S1, page: '246',
    title: 'Три заряда в вершинах треугольника',
    given: [[String.raw`Q_1 = 10\ \text{нКл}`, String.raw`10^{-8}\ \text{Кл}`], [String.raw`Q_2 = 20\ \text{нКл}`, String.raw`2\cdot10^{-8}\ \text{Кл}`], [String.raw`Q_3 = -30\ \text{нКл}`, String.raw`-3\cdot10^{-8}\ \text{Кл}`], [String.raw`a = 10\ \text{см}`, String.raw`0{,}1\ \text{м}`]],
    find: String.raw`\Pi \;—\; ?`,
    formulas: [WSYS, KCONST],
    steps: [
      { title: 'Три пары на одинаковом расстоянии a',
        tex: String.raw`\Pi = \frac{1}{4\pi\varepsilon_0 a}(Q_1Q_2 + Q_1Q_3 + Q_2Q_3)` },
      { title: 'Считаем',
        tex: String.raw`\Pi = \frac{8{,}99\cdot10^9}{0{,}1}(2 - 3 - 6)\cdot10^{-16} = -6{,}3\cdot10^{-5}\ \text{Дж}` },
    ],
    answer: [String.raw`\Pi = -63\ \text{мкДж}`],
  },

  /* ===================== 15.10 ===================== */
  {
    id: '15.10', chapter: CH, section: S1, page: '246',
    title: 'Четыре одинаковых заряда в квадрате',
    given: [[String.raw`Q = 10\ \text{нКл}`, String.raw`10^{-8}\ \text{Кл}`], [String.raw`a = 10\ \text{см}`, String.raw`0{,}1\ \text{м}`]],
    find: String.raw`\Pi \;—\; ?`,
    formulas: [WSYS, KCONST],
    steps: [
      { title: 'Пары зарядов',
        text: 'Четыре пары — по сторонам (расстояние a), две пары — по диагоналям (a√2).',
        tex: String.raw`\Pi = \frac{Q^2}{4\pi\varepsilon_0 a}\left(4 + \frac{2}{\sqrt2}\right) = \frac{Q^2}{2\pi\varepsilon_0 a}\left(2 + \frac{1}{\sqrt2}\right)` },
      { title: 'Считаем',
        tex: String.raw`\Pi = \frac{8{,}99\cdot10^9\cdot10^{-16}}{0{,}1}\cdot5{,}414 = 4{,}87\cdot10^{-5}\ \text{Дж}` },
    ],
    answer: [String.raw`\Pi = 48{,}7\ \text{мкДж}`],
    note: K9('48,8 мкДж'),
  },

  /* ===================== 15.11 ===================== */
  {
    id: '15.11', chapter: CH, section: S1, page: '246',
    title: 'Квадрат: два плюса и два минуса',
    given: [[String.raw`|Q| = 10\ \text{нКл}`, String.raw`10^{-8}\ \text{Кл}`], [String.raw`a = 10\ \text{см}`, String.raw`0{,}1\ \text{м}`]],
    find: String.raw`\Pi \;—\; ?`,
    formulas: [WSYS, KCONST],
    steps: [
      { title: 'Обозначение',
        tex: String.raw`W_0 = \frac{Q^2}{4\pi\varepsilon_0 a} = \frac{8{,}99\cdot10^9\cdot10^{-16}}{0{,}1} = 8{,}99\ \text{мкДж}` },
      { title: 'Случай 1: одноимённые заряды в противоположных вершинах',
        text: 'Все четыре стороны соединяют разноимённые заряды (−W₀ каждая), обе диагонали — одноимённые (+W₀/√2).',
        tex: String.raw`\Pi_1 = W_0\left(-4 + \frac{2}{\sqrt2}\right) = W_0(\sqrt2 - 4) = -23{,}3\ \text{мкДж}` },
      { title: 'Случай 2: одноимённые заряды рядом (в противоположных вершинах — разноимённые)',
        text: 'Стороны: две пары одноимённых (+W₀) и две разноимённых (−W₀) — сумма 0. Обе диагонали — разноимённые.',
        tex: String.raw`\Pi_2 = W_0\left(0 - \frac{2}{\sqrt2}\right) = -\sqrt2\,W_0 = -12{,}7\ \text{мкДж}` },
    ],
    answer: [String.raw`\Pi_1 = -23{,}3\ \text{мкДж}`, String.raw`\Pi_2 = -12{,}7\ \text{мкДж}`],
    note: MISMATCH + String.raw`В книге: −12,7 мкДж, если одноимённые заряды в противоположных вершинах, и +12,7 мкДж, если в противоположных вершинах разноимённые. Прямой подсчёт шести пар даёт другое: для первого случая $W_0(\sqrt2 - 4) = -23{,}3$ мкДж, для второго $-\sqrt2\,W_0 = -12{,}7$ мкДж. Положительной энергии не может быть ни в одном случае: разноимённых пар больше, и они ближе.`,
  },

  /* ===================== 15.12 ===================== */
  {
    id: '15.12', chapter: CH, section: S1, page: '246',
    title: 'Линия нулевого потенциала для +2Q и −Q',
    given: [[String.raw`Q_1 = +2Q,\ Q_2 = -Q`, ''], [String.raw`d = 12\ \text{см}`, '']],
    find: String.raw`\text{линия}\ \varphi = 0 \;—\; ?`,
    formulas: [PHIQ, SUPP],
    steps: [
      { title: 'Условие φ = 0',
        tex: String.raw`\frac{2Q}{4\pi\varepsilon_0 r_1} - \frac{Q}{4\pi\varepsilon_0 r_2} = 0\ \Rightarrow\ r_1 = 2r_2` },
      { title: 'Оси',
        text: 'Начало координат — посередине между зарядами, ось x — от +2Q к −Q; расстояния в сантиметрах. Тогда +2Q в точке (−6; 0), −Q — в (6; 0).',
        tex: String.raw`(x + 6)^2 + y^2 = 4\left[(x - 6)^2 + y^2\right]` },
      { title: 'Раскрываем скобки',
        tex: String.raw`3x^2 - 60x + 3y^2 + 108 = 0\ \Rightarrow\ x^2 - 20x + y^2 + 36 = 0\ \Rightarrow\ (x - 10)^2 + y^2 = 64` },
      { title: 'Ответ',
        text: 'Это окружность радиусом 8 см; её центр — на продолжении линии зарядов за зарядом −Q, в 4 см от него. В пространстве — сфера.' },
    ],
    answer: [String.raw`(x - 10)^2 + y^2 = 8^2\ (\text{см})`],
  },

  /* ===================== 15.13 ===================== */
  {
    id: '15.13', chapter: CH, section: S1, page: '246',
    title: 'Перенос заряда из точки 1 в точку 2',
    given: [[String.raw`Q_1 = |Q_2| = 10^3\ \text{нКл}`, String.raw`10^{-6}\ \text{Кл}`], [String.raw`Q = 20\ \text{нКл}`, String.raw`2\cdot10^{-8}\ \text{Кл}`], [String.raw`a = 0{,}2\ \text{м}`, '']],
    find: String.raw`\Delta\Pi \;—\; ?`,
    formulas: [PHIQ, SUPP, { tex: String.raw`\Delta\Pi = Q(\varphi_2 - \varphi_1)`, text: 'изменение энергии заряда Q в поле других зарядов' }],
    steps: [
      { title: 'Потенциал в точке 1',
        text: 'Точка 1 посередине: Q₁ и Q₂ на одинаковом расстоянии a, заряды противоположны.',
        tex: String.raw`\varphi_1 = \frac{Q_1}{4\pi\varepsilon_0 a} - \frac{Q_1}{4\pi\varepsilon_0 a} = 0` },
      { title: 'Потенциал в точке 2',
        text: 'Точка 2 — на расстоянии a над Q₂, до Q₁ — гипотенуза √((2a)² + a²) = a√5.',
        tex: String.raw`\varphi_2 = \frac{Q_1}{4\pi\varepsilon_0 a}\left(\frac{1}{\sqrt5} - 1\right)` },
      { title: 'Изменение энергии',
        tex: String.raw`\Delta\Pi = Q\varphi_2 = \frac{Q_1Q}{4\pi\varepsilon_0 a}\left(\frac{1}{\sqrt5} - 1\right) = \frac{8{,}99\cdot10^9\cdot10^{-6}\cdot2\cdot10^{-8}}{0{,}2}\cdot(-0{,}553) = -4{,}97\cdot10^{-4}\ \text{Дж}` },
    ],
    answer: [String.raw`\Delta\Pi = -497\ \text{мкДж}`],
    note: K9('−498 мкДж'),
  },

  /* ===================== 15.14 ===================== */
  {
    id: '15.14', chapter: CH, section: S2, page: '246',
    title: 'Потенциал на оси кольца',
    given: [[String.raw`R = 10\ \text{см}`, String.raw`0{,}1\ \text{м}`], [String.raw`\tau = 10\ \text{нКл/м}`, String.raw`10^{-8}\ \text{Кл/м}`], [String.raw`a = 5\ \text{см}`, String.raw`0{,}05\ \text{м}`]],
    find: String.raw`\varphi \;—\; ?`,
    formulas: [DQ],
    steps: [
      { title: 'Все элементы кольца на одном расстоянии',
        text: 'От каждого элемента кольца до точки на оси одно и то же расстояние √(a² + R²), поэтому складываем просто заряды.',
        tex: String.raw`\varphi = \frac{Q}{4\pi\varepsilon_0\sqrt{a^2 + R^2}},\quad Q = 2\pi R\tau\ \Rightarrow\ \varphi = \frac{\tau R}{2\varepsilon_0\sqrt{a^2 + R^2}}` },
      { title: 'Считаем',
        tex: String.raw`\varphi = \frac{10^{-8}\cdot0{,}1}{2\cdot8{,}85\cdot10^{-12}\cdot\sqrt{0{,}05^2 + 0{,}1^2}} = 505\ \text{В}` },
    ],
    answer: [String.raw`\varphi = 505\ \text{В}`],
  },

  /* ===================== 15.15 ===================== */
  {
    id: '15.15', chapter: CH, section: S2, page: '246',
    title: 'Отрезок провода: точка на оси',
    given: [[String.raw`\tau = 10\ \text{нКл/м}`, String.raw`10^{-8}\ \text{Кл/м}`], [String.raw`a = l`, '']],
    find: String.raw`\varphi \;—\; ?`,
    formulas: [DQ, KCONST],
    steps: [
      { title: 'Интегрируем по отрезку',
        text: 'Ось x — вдоль провода, x — расстояние от точки до элемента; оно меняется от l до 2l.',
        tex: String.raw`\varphi = \frac{\tau}{4\pi\varepsilon_0}\int_l^{2l}\frac{dx}{x} = \frac{\tau}{4\pi\varepsilon_0}\ln2` },
      { title: 'Считаем',
        text: 'Ответ не зависит от длины отрезка.',
        tex: String.raw`\varphi = 8{,}99\cdot10^9\cdot10^{-8}\cdot0{,}693 = 62{,}3\ \text{В}` },
    ],
    answer: [String.raw`\varphi = \frac{\tau}{4\pi\varepsilon_0}\ln2 = 62{,}3\ \text{В}`],
    note: K9('62,4 В'),
  },

  /* ===================== 15.16 ===================== */
  {
    id: '15.16', chapter: CH, section: S2, page: '246',
    title: 'Стержень: точка на продолжении оси',
    given: [[String.raw`l = 10\ \text{см}`, String.raw`0{,}1\ \text{м}`], [String.raw`Q = 1\ \text{нКл}`, String.raw`10^{-9}\ \text{Кл}`], [String.raw`a = 20\ \text{см}`, String.raw`0{,}2\ \text{м}`]],
    find: String.raw`\varphi \;—\; ?`,
    formulas: [DQ, KCONST],
    steps: [
      { title: 'Интегрируем',
        tex: String.raw`\varphi = \frac{Q/l}{4\pi\varepsilon_0}\int_a^{a+l}\frac{dx}{x} = \frac{Q}{4\pi\varepsilon_0 l}\ln\frac{l + a}{a}` },
      { title: 'Считаем',
        tex: String.raw`\varphi = \frac{8{,}99\cdot10^9\cdot10^{-9}}{0{,}1}\ln\frac{0{,}3}{0{,}2} = 89{,}9\cdot0{,}405 = 36{,}5\ \text{В}` },
    ],
    answer: [String.raw`\varphi = 36{,}5\ \text{В}`],
  },

  /* ===================== 15.17 ===================== */
  {
    id: '15.17', chapter: CH, section: S2, page: '246',
    title: 'Квадрат из заряженных стержней',
    given: [[String.raw`\tau = 1{,}33\ \text{нКл/м}`, String.raw`1{,}33\cdot10^{-9}\ \text{Кл/м}`], [String.raw`a`, '']],
    find: String.raw`\varphi_0 \;—\; ?`,
    formulas: [DQ, SUPP, KCONST],
    steps: [
      { title: 'Потенциал от одного стержня',
        text: 'Центр квадрата — на перпендикуляре к середине стержня, на расстоянии h = a/2. Ось x — вдоль стержня от его середины, x от −a/2 до a/2.',
        tex: String.raw`\varphi_1 = \frac{\tau}{4\pi\varepsilon_0}\int_{-a/2}^{a/2}\frac{dx}{\sqrt{x^2 + h^2}} = \frac{\tau}{4\pi\varepsilon_0}\cdot2\ln\frac{a/2 + \sqrt{a^2/4 + h^2}}{h}` },
      { title: 'Подставляем h = a/2',
        text: 'Длина стороны сокращается — ответ от a не зависит.',
        tex: String.raw`\varphi_1 = \frac{\tau}{4\pi\varepsilon_0}\cdot2\ln\left(1 + \sqrt2\right) = \frac{\tau}{4\pi\varepsilon_0}\cdot1{,}763` },
      { title: 'Четыре стержня',
        tex: String.raw`\varphi_0 = 4\varphi_1 = \frac{2\tau}{\pi\varepsilon_0}\ln(1 + \sqrt2) = 8{,}99\cdot10^9\cdot1{,}33\cdot10^{-9}\cdot7{,}05 = 84{,}3\ \text{В}` },
    ],
    answer: [String.raw`\varphi_0 = \frac{2\tau}{\pi\varepsilon_0}\ln(1 + \sqrt2) = 84{,}3\ \text{В}`],
    note: MISMATCH + 'В книге 33,6 В. Интеграл по четырём сторонам проверен численно (tools/check_potentsial.py) — выходит 84,3 В при любой длине стороны. Как в книге получено 33,6 В, восстановить не удалось.',
  },

  /* ===================== 15.18 ===================== */
  {
    id: '15.18', chapter: CH, section: S2, page: '247',
    title: 'Разность потенциалов у нити',
    given: [[String.raw`\tau = 0{,}01\ \text{мкКл/м}`, String.raw`10^{-8}\ \text{Кл/м}`], [String.raw`r_1 = 2\ \text{см}`, String.raw`0{,}02\ \text{м}`], [String.raw`r_2 = 4\ \text{см}`, String.raw`0{,}04\ \text{м}`]],
    find: String.raw`\Delta\varphi \;—\; ?`,
    formulas: [{ tex: String.raw`E = \frac{\tau}{2\pi\varepsilon_0 r}`, text: 'поле бесконечной нити' }, EINT, LINE],
    steps: [
      { title: 'Интегрируем напряжённость',
        tex: String.raw`\Delta\varphi = \int_{r_1}^{r_2}\frac{\tau}{2\pi\varepsilon_0 r}dr = \frac{\tau}{2\pi\varepsilon_0}\ln\frac{r_2}{r_1}` },
      { title: 'Считаем',
        tex: String.raw`\Delta\varphi = \frac{10^{-8}}{2\pi\cdot8{,}85\cdot10^{-12}}\ln2 = 180\cdot0{,}693 = 125\ \text{В}` },
    ],
    answer: [String.raw`\Delta\varphi = 125\ \text{В}`],
  },

  /* ===================== 15.19 ===================== */
  {
    id: '15.19', chapter: CH, section: S3, page: '247',
    title: 'Потенциал заряженного диска',
    given: [[String.raw`Q = 1\ \text{нКл}`, String.raw`10^{-9}\ \text{Кл}`], [String.raw`R = 5\ \text{см}`, String.raw`0{,}05\ \text{м}`], [String.raw`a = 5\ \text{см}`, String.raw`0{,}05\ \text{м}`]],
    find: String.raw`\varphi_0,\ \varphi_a \;—\; ?`,
    formulas: [DQ, { tex: String.raw`\sigma = \frac{Q}{\pi R^2},\quad dQ = \sigma\cdot2\pi\rho\,d\rho`, text: 'диск разбиваем на тонкие кольца радиусом ρ' }],
    steps: [
      { title: 'Потенциал на оси на расстоянии a',
        text: 'Кольцо радиусом ρ отстоит от точки на √(ρ² + a²).',
        tex: String.raw`\varphi = \frac{\sigma}{4\pi\varepsilon_0}\int_0^R\frac{2\pi\rho\,d\rho}{\sqrt{\rho^2 + a^2}} = \frac{\sigma}{2\varepsilon_0}\left(\sqrt{R^2 + a^2} - a\right) = \frac{Q}{2\pi\varepsilon_0R^2}\left(\sqrt{R^2 + a^2} - a\right)` },
      { title: '1) В центре (a = 0)',
        tex: String.raw`\varphi_0 = \frac{Q}{2\pi\varepsilon_0R} = \frac{10^{-9}}{2\pi\cdot8{,}85\cdot10^{-12}\cdot0{,}05} = 360\ \text{В}` },
      { title: '2) На оси, a = 5 см',
        tex: String.raw`\varphi_a = \frac{10^{-9}}{2\pi\cdot8{,}85\cdot10^{-12}\cdot0{,}0025}\left(0{,}0707 - 0{,}05\right) = 149\ \text{В}` },
    ],
    answer: [String.raw`1)\ \varphi_0 = 360\ \text{В}`, String.raw`2)\ \varphi_a = 149\ \text{В}`],
  },

  /* ===================== 15.20 ===================== */
  {
    id: '15.20', chapter: CH, section: S3, page: '247',
    title: 'Две концентрические сферы, между ними парафин',
    given: [[String.raw`R_1 = 3\ \text{см},\ R_2 = 6\ \text{см}`, String.raw`0{,}03;\ 0{,}06\ \text{м}`], [String.raw`Q_1 = -1\ \text{нКл}`, String.raw`-10^{-9}\ \text{Кл}`], [String.raw`Q_2 = 2\ \text{нКл}`, String.raw`2\cdot10^{-9}\ \text{Кл}`], [String.raw`\varepsilon = 2\ (\text{парафин})`, ''], [String.raw`r_1 = 1,\ r_2 = 5,\ r_3 = 9\ \text{см}`, '']],
    find: String.raw`\varphi(r_1),\ \varphi(r_2),\ \varphi(r_3) \;—\; ?`,
    formulas: [SPH, EINT, KCONST],
    steps: [
      { title: 'Снаружи (r ≥ R₂)',
        text: 'Поле — как от точечного заряда Q₁ + Q₂ = 1 нКл в центре.',
        tex: String.raw`\varphi(r_3) = \frac{Q_1 + Q_2}{4\pi\varepsilon_0 r_3} = \frac{8{,}99\cdot10^9\cdot10^{-9}}{0{,}09} = 100\ \text{В},\qquad \varphi(R_2) = 150\ \text{В}` },
      { title: 'Между сферами',
        text: 'Поле создаёт только внутренний заряд, ослабленное парафином в ε раз.',
        tex: String.raw`\varphi(r) = \varphi(R_2) + \frac{Q_1}{4\pi\varepsilon_0\varepsilon}\left(\frac1r - \frac{1}{R_2}\right)` },
      { title: 'r₂ = 5 см',
        tex: String.raw`\varphi(r_2) = 150 + \frac{8{,}99\cdot(-1)}{2}\left(\frac{1}{0{,}05} - \frac{1}{0{,}06}\right) = 150 - 15 = 135\ \text{В}` },
      { title: 'r₁ = 1 см — внутри меньшей сферы',
        text: 'Внутри металлической сферы поля нет, потенциал равен потенциалу поверхности R₁.',
        tex: String.raw`\varphi(r_1) = \varphi(R_1) = 150 - 4{,}50\left(\frac{1}{0{,}03} - \frac{1}{0{,}06}\right) = 150 - 75 = 75\ \text{В}` },
    ],
    answer: [String.raw`1)\ 75\ \text{В};\quad 2)\ 135\ \text{В};\quad 3)\ 100\ \text{В}`],
  },

  /* ===================== 15.21 ===================== */
  {
    id: '15.21', chapter: CH, section: S3, page: '247',
    title: 'Шар в слое эбонита',
    given: [[String.raw`R = 5\ \text{см}`, String.raw`0{,}05\ \text{м}`], [String.raw`Q = 1\ \text{нКл}`, String.raw`10^{-9}\ \text{Кл}`], [String.raw`d = 2\ \text{см}`, String.raw`0{,}02\ \text{м}`], [String.raw`\varepsilon = 3\ (\text{эбонит})`, ''], [String.raw`r = 3;\ 6;\ 9\ \text{см}`, '']],
    find: String.raw`\varphi(r) \;—\; ?`,
    formulas: [SPH, EINT, KCONST],
    steps: [
      { title: 'Вне эбонита (r ≥ R + d = 7 см)',
        tex: String.raw`\varphi(r) = \frac{Q}{4\pi\varepsilon_0 r};\quad \varphi(9\ \text{см}) = \frac{8{,}99}{0{,}09} = 100\ \text{В},\quad \varphi(7\ \text{см}) = 128{,}4\ \text{В}` },
      { title: 'В эбоните (5 см ≤ r ≤ 7 см)',
        text: 'Поле в ε раз слабее, интегрируем от r до 7 см.',
        tex: String.raw`\varphi(r) = \varphi(7\ \text{см}) + \frac{Q}{4\pi\varepsilon_0\varepsilon}\left(\frac1r - \frac{1}{0{,}07}\right);\quad \varphi(6\ \text{см}) = 128{,}4 + 3{,}0\cdot2{,}38 = 136\ \text{В}` },
      { title: 'Внутри металлического шара (r = 3 см)',
        text: 'Потенциал как на поверхности шара.',
        tex: String.raw`\varphi(3\ \text{см}) = \varphi(R) = 128{,}4 + 3{,}0\left(\frac{1}{0{,}05} - \frac{1}{0{,}07}\right) = 146\ \text{В}` },
      { title: 'График',
        text: 'Внутри шара φ постоянен, в эбоните спадает как 1/r полого, снаружи — как 1/r круче; на границе эбонита излом (см. рисунок к ответу книги).' },
    ],
    answer: [String.raw`1)\ 146\ \text{В};\quad 2)\ 136\ \text{В};\quad 3)\ 100\ \text{В}`],
  },

  /* ===================== 15.22 ===================== */
  {
    id: '15.22', chapter: CH, section: S3, page: '247',
    title: 'Шар внутри проводящей оболочки',
    given: [[String.raw`R_1 = 10\ \text{см}`, String.raw`0{,}1\ \text{м}`], [String.raw`\varphi_1 = 300\ \text{В}`, ''], [String.raw`R_2 = 15\ \text{см}`, String.raw`0{,}15\ \text{м}`]],
    find: String.raw`\varphi_2 \;—\; ?`,
    formulas: [SPH],
    steps: [
      { title: 'Заряд шара',
        tex: String.raw`Q = 4\pi\varepsilon_0 R_1\varphi_1` },
      { title: '1) Шар соединили с оболочкой',
        text: 'Заряд целиком уходит на внешнюю поверхность оболочки; шар и оболочка имеют общий потенциал.',
        tex: String.raw`\varphi_2 = \frac{Q}{4\pi\varepsilon_0 R_2} = \frac{R_1}{R_2}\varphi_1 = \frac{10}{15}\cdot300 = 200\ \text{В}` },
      { title: '2) Оболочка заземлена',
        text: 'На оболочке индуцируется −Q, её потенциал 0. Потенциал шара — от двух сфер.',
        tex: String.raw`\varphi_2 = \frac{Q}{4\pi\varepsilon_0}\left(\frac{1}{R_1} - \frac{1}{R_2}\right) = \varphi_1\frac{R_2 - R_1}{R_2} = 300\cdot\frac{5}{15} = 100\ \text{В}` },
    ],
    answer: [String.raw`1)\ \varphi_2 = 200\ \text{В}`, String.raw`2)\ \varphi_2 = 100\ \text{В}`],
  },

  /* ===================== 15.23 ===================== */
  {
    id: '15.23', chapter: CH, section: S3, page: '247',
    title: 'Плоскость: разность потенциалов',
    given: [[String.raw`\sigma = 10\ \text{нКл/м}^2`, String.raw`10^{-8}\ \text{Кл/м}^2`], [String.raw`d = 10\ \text{см}`, String.raw`0{,}1\ \text{м}`]],
    find: String.raw`\Delta\varphi \;—\; ?`,
    formulas: [PLANE],
    steps: [
      { title: 'Однородное поле',
        tex: String.raw`\Delta\varphi = \frac{\sigma}{2\varepsilon_0}d = \frac{10^{-8}}{2\cdot8{,}85\cdot10^{-12}}\cdot0{,}1 = 56{,}5\ \text{В}` },
    ],
    answer: [String.raw`\Delta\varphi = 56{,}5\ \text{В}`],
    note: SMALL + 'В книге 56,6 В (округление ε₀).',
  },

  /* ===================== 15.24 ===================== */
  {
    id: '15.24', chapter: CH, section: S3, page: '247',
    title: 'Предельный потенциал шара в воздухе',
    given: [[String.raw`R = 10\ \text{см}`, String.raw`0{,}1\ \text{м}`], [String.raw`E = 3\ \text{МВ/м}`, String.raw`3\cdot10^6\ \text{В/м}`]],
    find: String.raw`\varphi,\ \sigma \;—\; ?`,
    formulas: [SPH, { tex: String.raw`E = \frac{\sigma}{\varepsilon_0}`, text: 'напряжённость у поверхности проводника' }],
    steps: [
      { title: 'Потенциал',
        text: 'У поверхности шара E = Q/(4πε₀R²), а φ = Q/(4πε₀R), значит φ = ER.',
        tex: String.raw`\varphi = ER = 3\cdot10^6\cdot0{,}1 = 3\cdot10^5\ \text{В}` },
      { title: 'Поверхностная плотность',
        tex: String.raw`\sigma = \varepsilon_0E = 8{,}85\cdot10^{-12}\cdot3\cdot10^6 = 2{,}66\cdot10^{-5}\ \text{Кл/м}^2` },
    ],
    answer: [String.raw`\varphi = 300\ \text{кВ}`, String.raw`\sigma = 26{,}6\ \text{мкКл/м}^2`],
    note: MISMATCH + String.raw`В книге σ = 55,6 мкКл/м², хотя по её же формуле $\sigma = \varepsilon_0E = 8{,}85\cdot10^{-12}\cdot3\cdot10^6 = 26{,}6$ мкКл/м².`,
  },

  /* ===================== 15.25 ===================== */
  {
    id: '15.25', chapter: CH, section: S3, page: '247',
    title: 'Две плоскости с σ разных знаков',
    given: [[String.raw`d = 0{,}5\ \text{см}`, String.raw`5\cdot10^{-3}\ \text{м}`], [String.raw`\sigma_1 = 0{,}2\ \text{мкКл/м}^2`, String.raw`2\cdot10^{-7}\ \text{Кл/м}^2`], [String.raw`\sigma_2 = -0{,}3\ \text{мкКл/м}^2`, String.raw`-3\cdot10^{-7}\ \text{Кл/м}^2`]],
    find: String.raw`U \;—\; ?`,
    formulas: [PLANE],
    steps: [
      { title: 'Поле между плоскостями',
        text: 'Обе плоскости дают поле, направленное от первой ко второй.',
        tex: String.raw`E = \frac{\sigma_1 - \sigma_2}{2\varepsilon_0} = \frac{0{,}5\cdot10^{-6}}{2\cdot8{,}85\cdot10^{-12}} = 2{,}82\cdot10^4\ \text{В/м}` },
      { title: 'Разность потенциалов',
        tex: String.raw`U = Ed = 2{,}82\cdot10^4\cdot5\cdot10^{-3} = 141\ \text{В}` },
    ],
    answer: [String.raw`U = 141\ \text{В}`],
  },

  /* ===================== 15.26 ===================== */
  {
    id: '15.26', chapter: CH, section: S3, page: '247',
    title: 'Две плоскости с σ одного знака',
    given: [[String.raw`d = 1\ \text{см}`, String.raw`0{,}01\ \text{м}`], [String.raw`\sigma_1 = 0{,}2\ \text{мкКл/м}^2`, String.raw`2\cdot10^{-7}\ \text{Кл/м}^2`], [String.raw`\sigma_2 = 0{,}5\ \text{мкКл/м}^2`, String.raw`5\cdot10^{-7}\ \text{Кл/м}^2`]],
    find: String.raw`U \;—\; ?`,
    formulas: [PLANE],
    steps: [
      { title: 'Поле между плоскостями',
        text: 'Поля плоскостей между ними направлены навстречу — вычитаются.',
        tex: String.raw`E = \frac{\sigma_2 - \sigma_1}{2\varepsilon_0} = \frac{0{,}3\cdot10^{-6}}{2\cdot8{,}85\cdot10^{-12}} = 1{,}69\cdot10^4\ \text{В/м}` },
      { title: 'Разность потенциалов',
        tex: String.raw`U = Ed = 1{,}69\cdot10^4\cdot0{,}01 = 169\ \text{В}` },
    ],
    answer: [String.raw`U = 169\ \text{В}`],
    note: SMALL + 'В книге 170 В (точно 169,5 В).',
  },

  /* ===================== 15.27 ===================== */
  {
    id: '15.27', chapter: CH, section: S3, page: '248',
    title: 'Число электронов на шарике',
    given: [[String.raw`d = 2\ \text{см}`, String.raw`R = 0{,}01\ \text{м}`], [String.raw`|\varphi| = 150\ \text{В}`, '']],
    find: String.raw`N \;—\; ?`,
    formulas: [SPH],
    steps: [
      { title: 'Заряд шарика',
        tex: String.raw`|Q| = 4\pi\varepsilon_0R|\varphi| = 4\pi\cdot8{,}85\cdot10^{-12}\cdot0{,}01\cdot150 = 1{,}67\cdot10^{-10}\ \text{Кл}` },
      { title: 'Число электронов',
        tex: String.raw`N = \frac{|Q|}{e} = \frac{1{,}67\cdot10^{-10}}{1{,}6\cdot10^{-19}} = 1{,}04\cdot10^9` },
    ],
    answer: [String.raw`N = 1{,}04\cdot10^9`],
  },

  /* ===================== 15.28 ===================== */
  {
    id: '15.28', chapter: CH, section: S3, page: '248',
    title: 'Слияние ста капель ртути',
    given: [[String.raw`n = 100`, ''], [String.raw`\varphi = 20\ \text{В}`, '']],
    find: String.raw`\varphi_1 \;—\; ?`,
    formulas: [SPH],
    steps: [
      { title: 'Заряд и радиус большой капли',
        text: 'Заряд сохраняется, объём складывается.',
        tex: String.raw`Q_1 = nq,\quad R^3 = nr^3\ \Rightarrow\ R = n^{1/3}r` },
      { title: 'Потенциал',
        tex: String.raw`\varphi_1 = \frac{nq}{4\pi\varepsilon_0 n^{1/3}r} = n^{2/3}\varphi = 100^{2/3}\cdot20 = 21{,}54\cdot20 = 431\ \text{В}` },
    ],
    answer: [String.raw`\varphi_1 = n^{2/3}\varphi = 431\ \text{В}`],
    note: SMALL + String.raw`В книге 432 В; точно $100^{2/3}\cdot20 = 430{,}9$ В.`,
  },

  /* ===================== 15.29 ===================== */
  {
    id: '15.29', chapter: CH, section: S3, page: '248',
    title: 'Пластины притягиваются с силой 2 мН',
    given: [[String.raw`R = 10\ \text{см}`, String.raw`0{,}1\ \text{м}`], [String.raw`F = 2\ \text{мН}`, String.raw`2\cdot10^{-3}\ \text{Н}`], [String.raw`d = 1\ \text{см}`, String.raw`0{,}01\ \text{м}`]],
    find: String.raw`U \;—\; ?`,
    formulas: [{ tex: String.raw`F = \frac{\sigma^2S}{2\varepsilon_0}`, text: 'сила притяжения пластин: заряд одной пластины σS в поле другой σ/(2ε₀)' }, { tex: String.raw`U = Ed = \frac{\sigma}{\varepsilon_0}d`, text: 'поле между пластинами' }],
    steps: [
      { title: 'Поверхностная плотность из силы',
        tex: String.raw`\sigma = \sqrt{\frac{2\varepsilon_0F}{\pi R^2}}` },
      { title: 'Разность потенциалов',
        tex: String.raw`U = \frac{\sigma d}{\varepsilon_0} = \frac dR\sqrt{\frac{2F}{\pi\varepsilon_0}} = 0{,}1\cdot\sqrt{\frac{4\cdot10^{-3}}{\pi\cdot8{,}85\cdot10^{-12}}} = 1{,}2\cdot10^3\ \text{В}` },
    ],
    answer: [String.raw`U = 1{,}2\ \text{кВ}`],
  },

  /* ===================== 15.30 ===================== */
  {
    id: '15.30', chapter: CH, section: S3, page: '248',
    title: 'Ион у заряженного цилиндра',
    given: [[String.raw`\sigma = 0{,}1\ \text{мкКл/м}^2`, String.raw`10^{-7}\ \text{Кл/м}^2`], [String.raw`R = 5\ \text{см}`, String.raw`0{,}05\ \text{м}`], [String.raw`r_1 = 3R,\ r_2 = 2R`, '']],
    find: String.raw`\Delta\Pi \;—\; ?`,
    formulas: [LINE, { tex: String.raw`\tau = 2\pi R\sigma`, text: 'заряд единицы длины цилиндра' }],
    steps: [
      { title: 'Расстояния по рисунку',
        text: 'Точка 1 — в 3R от оси цилиндра, точка 2 — в 2R. Ион приближается к цилиндру.' },
      { title: 'Разность потенциалов',
        tex: String.raw`\varphi_2 - \varphi_1 = \frac{\tau}{2\pi\varepsilon_0}\ln\frac{r_1}{r_2} = \frac{\sigma R}{\varepsilon_0}\ln\frac32` },
      { title: 'Изменение энергии иона (q = +e)',
        tex: String.raw`\Delta\Pi = e(\varphi_2 - \varphi_1) = e\cdot\frac{10^{-7}\cdot0{,}05}{8{,}85\cdot10^{-12}}\cdot0{,}405 = e\cdot229\ \text{В} = 229\ \text{эВ}` },
    ],
    answer: [String.raw`\Delta\Pi = \frac{e\sigma R}{\varepsilon_0}\ln\frac32 = +229\ \text{эВ}`],
    note: MISMATCH + 'В книге −229 эВ. Цилиндр заряжен положительно, положительный ион по рис. 15.8 переносят ближе к нему (из 3R в 2R), значит, его энергия растёт: ΔΠ = +229 эВ. Число совпадает, знак в книге неверный.',
  },

  /* ===================== 15.31 ===================== */
  {
    id: '15.31', chapter: CH, section: S3, page: '248',
    title: 'Перенос заряда у отрицательного шара',
    given: [[String.raw`Q = 40\ \text{нКл}`, String.raw`4\cdot10^{-8}\ \text{Кл}`], [String.raw`\varphi_1 = -300\ \text{В}`, ''], [String.raw`r_1 = 2R,\ r_2 = 4R`, '']],
    find: String.raw`A_{1,2} \;—\; ?`,
    formulas: [SPH, WEXT],
    steps: [
      { title: 'Потенциал в точке 2',
        text: 'Вне шара φ ∝ 1/r; точка 2 вдвое дальше от центра, чем точка 1.',
        tex: String.raw`\varphi_2 = \varphi_1\frac{r_1}{r_2} = \frac{\varphi_1}{2} = -150\ \text{В}` },
      { title: 'Работа внешних сил',
        tex: String.raw`A_{1,2} = Q(\varphi_2 - \varphi_1) = -\frac12Q\varphi_1 = 4\cdot10^{-8}\cdot150 = 6\cdot10^{-6}\ \text{Дж}` },
    ],
    answer: [String.raw`A_{1,2} = 6\ \text{мкДж}`],
  },

  /* ===================== 15.32 ===================== */
  {
    id: '15.32', chapter: CH, section: S4, page: '248',
    title: 'Заряженная стеклянная пластинка',
    given: [[String.raw`d = 2\ \text{см}`, String.raw`0{,}02\ \text{м}`], [String.raw`\rho = 10\ \text{мкКл/м}^3`, String.raw`10^{-5}\ \text{Кл/м}^3`], [String.raw`\varepsilon = 7\ (\text{стекло})`, '']],
    find: String.raw`\Delta\varphi \;—\; ?`,
    formulas: [{ tex: String.raw`E = \frac{\rho x}{\varepsilon_0\varepsilon}`, text: 'поле внутри пластины на расстоянии x от средней плоскости (теорема Гаусса)' }, EINT],
    steps: [
      { title: 'Интегрируем от середины до поверхности',
        tex: String.raw`\Delta\varphi = \int_0^{d/2}\frac{\rho x}{\varepsilon_0\varepsilon}dx = \frac{\rho d^2}{8\varepsilon_0\varepsilon}` },
      { title: 'Считаем',
        tex: String.raw`\Delta\varphi = \frac{10^{-5}\cdot0{,}02^2}{8\cdot8{,}85\cdot10^{-12}\cdot7} = 8{,}07\ \text{В}` },
    ],
    answer: [String.raw`\Delta\varphi = 8{,}07\ \text{В}`],
  },

  /* ===================== 15.33 ===================== */
  {
    id: '15.33', chapter: CH, section: S4, page: '248',
    title: 'Заряженный парафиновый шар',
    given: [[String.raw`R = 10\ \text{см}`, String.raw`0{,}1\ \text{м}`], [String.raw`\rho = 1\ \text{мкКл/м}^3`, String.raw`10^{-6}\ \text{Кл/м}^3`], [String.raw`\varepsilon = 2\ (\text{парафин})`, '']],
    find: String.raw`\varphi_\text{ц},\ \varphi_\text{пов} \;—\; ?`,
    formulas: [{ tex: String.raw`E = \frac{\rho r}{3\varepsilon_0\varepsilon}\ (r \le R),\quad E = \frac{\rho R^3}{3\varepsilon_0 r^2}\ (r \ge R)`, text: 'поле равномерно заряженного шара (теорема Гаусса)' }, EINT],
    steps: [
      { title: 'На поверхности',
        text: 'Снаружи поле как от точечного заряда Q = ⁴⁄₃πR³ρ (вне шара — вакуум).',
        tex: String.raw`\varphi_\text{пов} = \frac{Q}{4\pi\varepsilon_0R} = \frac{\rho R^2}{3\varepsilon_0} = \frac{10^{-6}\cdot0{,}01}{3\cdot8{,}85\cdot10^{-12}} = 377\ \text{В}` },
      { title: 'В центре',
        tex: String.raw`\varphi_\text{ц} = \varphi_\text{пов} + \int_0^R\frac{\rho r}{3\varepsilon_0\varepsilon}dr = \frac{\rho R^2}{3\varepsilon_0}\left(1 + \frac{1}{2\varepsilon}\right) = 377\cdot1{,}25 = 471\ \text{В}` },
      { title: 'График φ(r)',
        text: 'Внутри — парабола с вершиной в центре, снаружи — гипербола 1/r (см. рисунок к ответу книги).' },
    ],
    answer: [String.raw`\varphi_\text{ц} = 471\ \text{В}`, String.raw`\varphi_\text{пов} = 377\ \text{В}`],
    note: SMALL + 'В книге 472 В; точно 377·1,25 = 470,8 В.',
  },

  /* ===================== 15.34 ===================== */
  {
    id: '15.34', chapter: CH, section: S4, page: '249',
    title: 'Полый эбонитовый шар',
    given: [[String.raw`\rho = 2\ \text{мкКл/м}^3`, String.raw`2\cdot10^{-6}\ \text{Кл/м}^3`], [String.raw`R_1 = 3\ \text{см}`, String.raw`0{,}03\ \text{м}`], [String.raw`R_2 = 6\ \text{см}`, String.raw`0{,}06\ \text{м}`], [String.raw`\varepsilon = 3\ (\text{эбонит})`, '']],
    find: String.raw`\varphi(R_2),\ \varphi(R_1),\ \varphi(0) \;—\; ?`,
    formulas: [{ tex: String.raw`E = \frac{\rho\,(r^3 - R_1^3)}{3\varepsilon_0\varepsilon r^2}`, text: 'поле в толще шара (R₁ ≤ r ≤ R₂) по теореме Гаусса' }, EINT],
    steps: [
      { title: '1) Наружная поверхность',
        text: 'Снаружи поле как от точечного заряда Q = ⁴⁄₃π(R₂³ − R₁³)ρ.',
        tex: String.raw`\varphi(R_2) = \frac{(R_2^3 - R_1^3)\rho}{3\varepsilon_0R_2} = \frac{(2{,}16 - 0{,}27)\cdot10^{-4}\cdot2\cdot10^{-6}}{3\cdot8{,}85\cdot10^{-12}\cdot0{,}06} = 237\ \text{В}` },
      { title: '2) Внутренняя поверхность',
        text: 'Поле в толще направлено наружу, поэтому внутри потенциал выше.',
        tex: String.raw`\varphi(R_1) - \varphi(R_2) = \int_{R_1}^{R_2}E\,dr = \frac{\rho}{3\varepsilon_0\varepsilon}\left[\frac{R_2^2 - R_1^2}{2} + R_1^3\left(\frac{1}{R_2} - \frac{1}{R_1}\right)\right] = 22{,}6\ \text{В}` },
      { title: 'Итог',
        tex: String.raw`\varphi(R_1) = 237 + 22{,}6 = 260\ \text{В}` },
      { title: '3) Центр',
        text: 'В полости заряда нет и поля нет (теорема Гаусса), потенциал тот же.',
        tex: String.raw`\varphi(0) = \varphi(R_1) = 260\ \text{В}` },
    ],
    answer: [String.raw`1)\ 237\ \text{В};\quad 2)\ \text{и}\ 3)\ 260\ \text{В}`],
    note: MISMATCH + 'В книге φ₁ = 238 В (это совпадает с нашим, разница в округлении), но φ₂ = φ₃ = 116 В. Так быть не может: заряд положительный, поле в толще шара направлено наружу, поэтому к центру потенциал растёт, а не падает. Интеграл проверен численно — 260 В.',
  },

  /* ===================== 15.35 ===================== */
  {
    id: '15.35', chapter: CH, section: S5, page: '249',
    title: 'Градиент потенциала у плоскости',
    given: [[String.raw`\sigma = 4\ \text{нКл/м}^2`, String.raw`4\cdot10^{-9}\ \text{Кл/м}^2`]],
    find: String.raw`\operatorname{grad}\varphi \;—\; ?`,
    formulas: [GRAD, PLANE],
    steps: [
      { title: 'Модуль',
        tex: String.raw`|\operatorname{grad}\varphi| = E = \frac{\sigma}{2\varepsilon_0} = \frac{4\cdot10^{-9}}{2\cdot8{,}85\cdot10^{-12}} = 226\ \text{В/м}` },
      { title: 'Направление',
        text: 'E направлена от положительно заряженной плоскости, градиент — противоположно: перпендикулярно плоскости, к ней.' },
    ],
    answer: [String.raw`|\operatorname{grad}\varphi| = 226\ \text{В/м},\ \text{к плоскости}`],
  },

  /* ===================== 15.36 ===================== */
  {
    id: '15.36', chapter: CH, section: S5, page: '249',
    title: 'Разность потенциалов под углом 60°',
    given: [[String.raw`E = 600\ \text{В/м}`, ''], [String.raw`\alpha = 60^\circ`, ''], [String.raw`\Delta r = 2\ \text{мм}`, String.raw`2\cdot10^{-3}\ \text{м}`]],
    find: String.raw`U \;—\; ?`,
    formulas: [EUD],
    steps: [
      { title: 'Проекция смещения на линию поля',
        tex: String.raw`U = E\,\Delta r\cos\alpha = 600\cdot2\cdot10^{-3}\cdot0{,}5 = 0{,}6\ \text{В}` },
    ],
    answer: [String.raw`U = 0{,}6\ \text{В}`],
  },

  /* ===================== 15.37 ===================== */
  {
    id: '15.37', chapter: CH, section: S5, page: '249',
    title: 'Разность потенциалов вдоль силовой линии',
    given: [[String.raw`E = 120\ \text{В/м}`, ''], [String.raw`\Delta r = 1\ \text{мм}`, String.raw`10^{-3}\ \text{м}`]],
    find: String.raw`U \;—\; ?`,
    formulas: [EUD],
    steps: [
      { title: 'Однородное поле',
        tex: String.raw`U = E\,\Delta r = 120\cdot10^{-3} = 0{,}12\ \text{В}` },
    ],
    answer: [String.raw`U = 0{,}12\ \text{В}`],
  },

  /* ===================== 15.38 ===================== */
  {
    id: '15.38', chapter: CH, section: S5, page: '249',
    title: 'Градиент у точечного заряда',
    given: [[String.raw`r = 12\ \text{см}`, String.raw`0{,}12\ \text{м}`], [String.raw`\varphi = 24\ \text{В}`, '']],
    find: String.raw`\operatorname{grad}\varphi \;—\; ?`,
    formulas: [GRAD, PHIQ],
    steps: [
      { title: 'Производная',
        tex: String.raw`\frac{d\varphi}{dr} = -\frac{Q}{4\pi\varepsilon_0r^2} = -\frac{\varphi}{r}\ \Rightarrow\ |\operatorname{grad}\varphi| = \frac{24}{0{,}12} = 200\ \text{В/м}` },
      { title: 'Направление',
        text: 'Потенциал растёт к положительному заряду — градиент направлен к заряду.' },
    ],
    answer: [String.raw`|\operatorname{grad}\varphi| = 200\ \text{В/м},\ \text{к заряду}`],
  },

  /* ===================== 15.39 ===================== */
  {
    id: '15.39', chapter: CH, section: S5, page: '249',
    title: 'Градиент у заряженной нити',
    given: [[String.raw`\tau = 1\ \text{нКл/м}`, String.raw`10^{-9}\ \text{Кл/м}`], [String.raw`r = 10\ \text{см}`, String.raw`0{,}1\ \text{м}`]],
    find: String.raw`\operatorname{grad}\varphi \;—\; ?`,
    formulas: [GRAD, { tex: String.raw`E = \frac{\tau}{2\pi\varepsilon_0 r}`, text: 'поле бесконечной нити' }],
    steps: [
      { title: 'Модуль',
        tex: String.raw`|\operatorname{grad}\varphi| = E = \frac{10^{-9}}{2\pi\cdot8{,}85\cdot10^{-12}\cdot0{,}1} = 180\ \text{В/м}` },
      { title: 'Направление',
        text: 'Вдоль силовой линии (перпендикулярно нити), к нити.' },
    ],
    answer: [String.raw`|\operatorname{grad}\varphi| = 180\ \text{В/м},\ \text{к нити}`],
  },

  /* ===================== 15.40 ===================== */
  {
    id: '15.40', chapter: CH, section: S5, page: '249',
    title: 'Разность потенциалов центр — поверхность шара',
    given: [[String.raw`\varepsilon = 3`, ''], [String.raw`R = 10\ \text{см}`, String.raw`0{,}1\ \text{м}`], [String.raw`\rho = 50\ \text{нКл/м}^3`, String.raw`5\cdot10^{-8}\ \text{Кл/м}^3`]],
    find: String.raw`\Delta\varphi \;—\; ?`,
    formulas: [EINT],
    steps: [
      { title: 'Интегрируем данную напряжённость',
        tex: String.raw`\Delta\varphi = \int_0^R\frac{\rho r}{3\varepsilon_0\varepsilon}dr = \frac{\rho R^2}{6\varepsilon_0\varepsilon}` },
      { title: 'Считаем',
        tex: String.raw`\Delta\varphi = \frac{5\cdot10^{-8}\cdot0{,}01}{6\cdot8{,}85\cdot10^{-12}\cdot3} = 3{,}14\ \text{В}` },
    ],
    answer: [String.raw`\Delta\varphi = 3{,}14\ \text{В}`],
  },

  /* ===================== 15.41 ===================== */
  {
    id: '15.41', chapter: CH, section: S6, page: '249',
    title: 'Заряд отталкивается и удаляется',
    given: [[String.raw`Q_1 = 1\ \text{мкКл}`, String.raw`10^{-6}\ \text{Кл}`], [String.raw`Q_2 = 0{,}1\ \text{мкКл}`, String.raw`10^{-7}\ \text{Кл}`], [String.raw`r_1 = 10\ \text{см}`, String.raw`0{,}1\ \text{м}`], [String.raw`r_2 = 10\ \text{м},\ r_3 = \infty`, '']],
    find: String.raw`A_1,\ A_2 \;—\; ?`,
    formulas: [WORK, PHIQ, KCONST],
    steps: [
      { title: '1) До r₂ = 10 м',
        tex: String.raw`A_1 = \frac{Q_1Q_2}{4\pi\varepsilon_0}\left(\frac{1}{r_1} - \frac{1}{r_2}\right) = 8{,}99\cdot10^9\cdot10^{-13}(10 - 0{,}1) = 8{,}90\cdot10^{-3}\ \text{Дж}` },
      { title: '2) В бесконечность',
        tex: String.raw`A_2 = \frac{Q_1Q_2}{4\pi\varepsilon_0r_1} = 8{,}99\cdot10^9\cdot10^{-13}\cdot10 = 8{,}99\cdot10^{-3}\ \text{Дж}` },
    ],
    answer: [String.raw`A_1 = 8{,}90\ \text{мДж}`, String.raw`A_2 = 9{,}0\ \text{мДж}`],
    note: K9('8,91 мДж'),
  },

  /* ===================== 15.42 ===================== */
  {
    id: '15.42', chapter: CH, section: S6, page: '250',
    title: 'Два одинаковых заряда, перенос 1 → 2',
    given: [[String.raw`Q_1 = 10\ \text{нКл}`, String.raw`10^{-8}\ \text{Кл}`], [String.raw`\varphi_1 = 300\ \text{В}`, ''], [String.raw`\text{рис. 15.10}`, '']],
    find: String.raw`A_{1,2} \;—\; ?`,
    formulas: [PHIQ, SUPP, WORK],
    steps: [
      { title: 'Потенциал в точке 1',
        text: 'По рис. 15.10 точка 1 — на расстоянии a от каждого заряда Q.',
        tex: String.raw`\varphi_1 = \frac{2Q}{4\pi\varepsilon_0a} = 300\ \text{В}\ \Rightarrow\ \frac{Q}{4\pi\varepsilon_0a} = 150\ \text{В}` },
      { title: 'Потенциал в точке 2',
        text: 'Точка 2 — на расстоянии a от второго заряда и 3a от первого.',
        tex: String.raw`\varphi_2 = \frac{Q}{4\pi\varepsilon_0}\left(\frac{1}{3a} + \frac1a\right) = \frac43\cdot150 = 200\ \text{В}` },
      { title: 'Работа поля',
        tex: String.raw`A_{1,2} = Q_1(\varphi_1 - \varphi_2) = \frac13Q_1\varphi_1 = 10^{-8}\cdot100 = 10^{-6}\ \text{Дж}` },
    ],
    answer: [String.raw`A_{1,2} = 1\ \text{мкДж}`],
  },

  /* ===================== 15.43 ===================== */
  {
    id: '15.43', chapter: CH, section: S6, page: '250',
    title: 'Разноимённые заряды, перенос 1 → 2',
    given: [[String.raw`Q_1 = 50\ \text{нКл}`, String.raw`5\cdot10^{-8}\ \text{Кл}`], [String.raw`|Q| = 1\ \text{мкКл}`, String.raw`10^{-6}\ \text{Кл}`], [String.raw`a = 0{,}1\ \text{м}`, '']],
    find: String.raw`A_{1,2} \;—\; ?`,
    formulas: [PHIQ, SUPP, WORK, KCONST],
    steps: [
      { title: 'Точка 1',
        text: 'По рис. 15.11 точка 1 — посередине между +Q и −Q.',
        tex: String.raw`\varphi_1 = \frac{Q}{4\pi\varepsilon_0a} - \frac{Q}{4\pi\varepsilon_0a} = 0` },
      { title: 'Точка 2',
        text: 'Точка 2 — на высоте 2a над −Q; до +Q расстояние √((2a)² + (2a)²) = 2√2·a.',
        tex: String.raw`\varphi_2 = \frac{Q}{4\pi\varepsilon_0\cdot2a}\left(\frac{1}{\sqrt2} - 1\right)` },
      { title: 'Работа поля',
        tex: String.raw`A_{1,2} = Q_1(\varphi_1 - \varphi_2) = \frac{QQ_1}{8\pi\varepsilon_0a}\left(1 - \frac{1}{\sqrt2}\right) = \frac{8{,}99\cdot10^9\cdot10^{-6}\cdot5\cdot10^{-8}}{0{,}2}\cdot0{,}293 = 6{,}58\cdot10^{-4}\ \text{Дж}` },
    ],
    answer: [String.raw`A_{1,2} = 658\ \text{мкДж}`],
    note: K9('659 мкДж'),
  },

  /* ===================== 15.44 ===================== */
  {
    id: '15.44', chapter: CH, section: S6, page: '250',
    title: 'Перемещение под углом к плоскости',
    given: [[String.raw`\sigma = 2\ \text{мкКл/м}^2`, String.raw`2\cdot10^{-6}\ \text{Кл/м}^2`], [String.raw`\alpha = 60^\circ`, ''], [String.raw`l = 20\ \text{см}`, String.raw`0{,}2\ \text{м}`], [String.raw`Q = 10\ \text{нКл}`, String.raw`10^{-8}\ \text{Кл}`]],
    find: String.raw`A \;—\; ?`,
    formulas: [PLANE, { tex: String.raw`A = QEl\cos\beta`, text: 'работа в однородном поле; β — угол между E и перемещением' }],
    steps: [
      { title: 'Поле плоскости',
        tex: String.raw`E = \frac{\sigma}{2\varepsilon_0} = \frac{2\cdot10^{-6}}{2\cdot8{,}85\cdot10^{-12}} = 1{,}13\cdot10^5\ \text{В/м}` },
      { title: 'Угол с линиями поля',
        text: 'Поле перпендикулярно плоскости, перемещение — под углом α к ней, значит β = 90° − α (заряд удаляется от плоскости).',
        tex: String.raw`A = QEl\cos\left(\frac\pi2 - \alpha\right) = QEl\sin\alpha` },
      { title: 'Считаем',
        tex: String.raw`A = 10^{-8}\cdot1{,}13\cdot10^5\cdot0{,}2\cdot0{,}866 = 1{,}96\cdot10^{-4}\ \text{Дж}` },
    ],
    answer: [String.raw`A = \frac{\sigma Ql}{2\varepsilon_0}\sin\alpha = 196\ \text{мкДж}`],
    note: MISMATCH + String.raw`В книге 1,96 мкДж — в 100 раз меньше. По формуле книги: $\frac{2\cdot10^{-6}\cdot10^{-8}\cdot0{,}2}{2\cdot8{,}85\cdot10^{-12}}\cdot0{,}866 = 1{,}96\cdot10^{-4}$ Дж = 196 мкДж.`,
  },

  /* ===================== 15.45 ===================== */
  {
    id: '15.45', chapter: CH, section: S6, page: '250',
    title: 'Заряд на продолжении отрезка провода',
    given: [[String.raw`\tau = 10^3\ \text{нКл/м}`, String.raw`10^{-6}\ \text{Кл/м}`], [String.raw`Q = 1\ \text{нКл}`, String.raw`10^{-9}\ \text{Кл}`], [String.raw`\text{рис. 15.13}`, '']],
    find: String.raw`A \;—\; ?`,
    formulas: [DQ, WORK, KCONST],
    steps: [
      { title: 'Потенциал на продолжении отрезка длиной l',
        text: 'Для точки на расстоянии x от ближнего конца (как в 15.16):',
        tex: String.raw`\varphi(x) = \frac{\tau}{4\pi\varepsilon_0}\ln\frac{x + l}{x}` },
      { title: 'Точки B и C',
        text: 'По рис. 15.13 точка B — в l от конца провода, C — в 2l.',
        tex: String.raw`\varphi_B = \frac{\tau}{4\pi\varepsilon_0}\ln2,\quad \varphi_C = \frac{\tau}{4\pi\varepsilon_0}\ln\frac32` },
      { title: 'Работа поля',
        tex: String.raw`A = Q(\varphi_B - \varphi_C) = \frac{Q\tau}{4\pi\varepsilon_0}\ln\frac43 = 10^{-9}\cdot8{,}99\cdot10^9\cdot10^{-6}\cdot0{,}288 = 2{,}59\cdot10^{-6}\ \text{Дж}` },
    ],
    answer: [String.raw`A = \frac{Q\tau}{4\pi\varepsilon_0}\ln\frac43 = 2{,}59\ \text{мкДж}`],
    note: MISMATCH + 'В книге 2,62 мкДж. Даже с 1/(4πε₀) = 9·10⁹ выходит 2,59 мкДж; численная проверка интеграла — тоже 2,59.',
  },

  /* ===================== 15.46 ===================== */
  {
    id: '15.46', chapter: CH, section: S6, page: '250',
    title: 'Из центра полукольца в бесконечность',
    given: [[String.raw`\tau = 133\ \text{нКл/м}`, String.raw`1{,}33\cdot10^{-7}\ \text{Кл/м}`], [String.raw`Q = 6{,}7\ \text{нКл}`, String.raw`6{,}7\cdot10^{-9}\ \text{Кл}`]],
    find: String.raw`A \;—\; ?`,
    formulas: [DQ, WEXT],
    steps: [
      { title: 'Потенциал в центре полукольца',
        text: 'Все элементы — на расстоянии R от центра, заряд полукольца πRτ.',
        tex: String.raw`\varphi_0 = \frac{\pi R\tau}{4\pi\varepsilon_0R} = \frac{\tau}{4\varepsilon_0}` },
      { title: 'Работа',
        text: 'Работа сил поля A = Q(φ₀ − 0) = Qτ/(4ε₀). Заряд отталкивается от полукольца, поэтому внешние силы работу не совершают, а наоборот, сдерживают его: их работа отрицательна.',
        tex: String.raw`\frac{Q\tau}{4\varepsilon_0} = \frac{6{,}7\cdot10^{-9}\cdot1{,}33\cdot10^{-7}}{4\cdot8{,}85\cdot10^{-12}} = 2{,}52\cdot10^{-5}\ \text{Дж}` },
    ],
    answer: [String.raw`|A| = \frac{Q\tau}{4\varepsilon_0} = 25{,}2\ \text{мкДж}`],
    note: '<b>Про знак.</b> Если заряды Q и τ одного знака, работа сил поля +25,2 мкДж, а внешних сил −25,2 мкДж. В книге дан модуль.',
  },

  /* ===================== 15.47 ===================== */
  {
    id: '15.47', chapter: CH, section: S6, page: '250',
    title: 'Из центра кольца на его ось',
    given: [[String.raw`R = 10\ \text{см}`, String.raw`0{,}1\ \text{м}`], [String.raw`\tau = 300\ \text{нКл/м}`, String.raw`3\cdot10^{-7}\ \text{Кл/м}`], [String.raw`Q = 5\ \text{нКл}`, String.raw`5\cdot10^{-9}\ \text{Кл}`], [String.raw`l = 20\ \text{см}`, String.raw`0{,}2\ \text{м}`]],
    find: String.raw`A \;—\; ?`,
    formulas: [DQ, WEXT],
    steps: [
      { title: 'Потенциалы (см. 15.14)',
        tex: String.raw`\varphi_0 = \frac{\tau}{2\varepsilon_0},\quad \varphi_l = \frac{\tau R}{2\varepsilon_0\sqrt{R^2 + l^2}}` },
      { title: 'Работа',
        tex: String.raw`|A| = Q(\varphi_0 - \varphi_l) = \frac{Q\tau}{2\varepsilon_0}\left(1 - \frac{R}{\sqrt{R^2 + l^2}}\right) = \frac{5\cdot10^{-9}\cdot3\cdot10^{-7}}{2\cdot8{,}85\cdot10^{-12}}\cdot0{,}553 = 4{,}7\cdot10^{-5}\ \text{Дж}` },
    ],
    answer: [String.raw`|A| = 47\ \text{мкДж}`],
    note: '<b>Про знак.</b> Заряд уходит от одноимённо заряженного кольца в точку с меньшим потенциалом: силы поля совершают +47 мкДж, внешние силы −47 мкДж. В книге дан модуль.',
  },

  /* ===================== 15.48 ===================== */
  {
    id: '15.48', chapter: CH, section: S6, page: '251',
    title: 'Кольцо: из центра на перпендикуляр',
    given: [[String.raw`\tau = 10^3\ \text{нКл/м}`, String.raw`10^{-6}\ \text{Кл/м}`], [String.raw`Q = 10\ \text{нКл}`, String.raw`10^{-8}\ \text{Кл}`], [String.raw`h = R`, '']],
    find: String.raw`A_{1,2} \;—\; ?`,
    formulas: [DQ, WORK],
    steps: [
      { title: 'Потенциалы',
        text: 'По рис. 15.14 точка 2 — на оси на высоте R; до кольца R√2.',
        tex: String.raw`\varphi_1 = \frac{\tau}{2\varepsilon_0},\quad \varphi_2 = \frac{\tau}{2\varepsilon_0\sqrt2}` },
      { title: 'Работа поля',
        tex: String.raw`A_{1,2} = \frac{Q\tau}{2\varepsilon_0}\left(1 - \frac{1}{\sqrt2}\right) = \frac{10^{-8}\cdot10^{-6}}{2\cdot8{,}85\cdot10^{-12}}\cdot0{,}293 = 1{,}65\cdot10^{-4}\ \text{Дж}` },
    ],
    answer: [String.raw`A_{1,2} = 165\ \text{мкДж}`],
  },

  /* ===================== 15.49 ===================== */
  {
    id: '15.49', chapter: CH, section: S6, page: '251',
    title: 'Проводящий шар: перенос 1 → 2',
    given: [[String.raw`Q = 1\ \text{мкКл}`, String.raw`10^{-6}\ \text{Кл}`], [String.raw`\varphi = 1\ \text{кВ}`, String.raw`10^3\ \text{В}`], [String.raw`r_1 = 2R,\ r_2 = 4R`, '']],
    find: String.raw`A_{1,2} \;—\; ?`,
    formulas: [SPH, WORK],
    steps: [
      { title: 'Потенциалы точек',
        tex: String.raw`\varphi_1 = \varphi\frac{R}{2R} = 500\ \text{В},\quad \varphi_2 = \varphi\frac{R}{4R} = 250\ \text{В}` },
      { title: 'Работа поля',
        tex: String.raw`A_{1,2} = Q(\varphi_1 - \varphi_2) = \frac14Q\varphi = 10^{-6}\cdot250 = 2{,}5\cdot10^{-4}\ \text{Дж}` },
    ],
    answer: [String.raw`A_{1,2} = 250\ \text{мкДж}`],
  },

  /* ===================== 15.50 ===================== */
  {
    id: '15.50', chapter: CH, section: S6, page: '251',
    title: 'Бесконечная нить: перенос 1 → 2',
    given: [[String.raw`\tau = 100\ \text{нКл/м}`, String.raw`10^{-7}\ \text{Кл/м}`], [String.raw`Q = 50\ \text{нКл}`, String.raw`5\cdot10^{-8}\ \text{Кл}`], [String.raw`r_1 = a,\ r_2 = 2a`, '']],
    find: String.raw`A_{1,2} \;—\; ?`,
    formulas: [LINE, WORK],
    steps: [
      { title: 'Работа поля',
        text: 'Важны только расстояния до нити: a и 2a.',
        tex: String.raw`A_{1,2} = \frac{Q\tau}{2\pi\varepsilon_0}\ln\frac{2a}{a} = \frac{5\cdot10^{-8}\cdot10^{-7}}{2\pi\cdot8{,}85\cdot10^{-12}}\cdot0{,}693 = 6{,}23\cdot10^{-5}\ \text{Дж}` },
    ],
    answer: [String.raw`A_{1,2} = 62{,}3\ \text{мкДж}`],
    note: K9('62,4 мкДж'),
  },

  /* ===================== 15.51 ===================== */
  {
    id: '15.51', chapter: CH, section: S7, page: '251',
    title: 'Электрон за 1 нс в поле 200 кВ/м',
    given: [[String.raw`E = 200\ \text{кВ/м}`, String.raw`2\cdot10^5\ \text{В/м}`], [String.raw`t = 1\ \text{нс}`, String.raw`10^{-9}\ \text{с}`], [String.raw`v_0 = 0`, '']],
    find: String.raw`s,\ v \;—\; ?`,
    formulas: [ACC],
    steps: [
      { title: 'Ускорение',
        tex: String.raw`a = \frac{|e|E}{m} = \frac{1{,}6\cdot10^{-19}\cdot2\cdot10^5}{9{,}11\cdot10^{-31}} = 3{,}51\cdot10^{16}\ \text{м/с}^2` },
      { title: 'Путь и скорость',
        tex: String.raw`s = \frac{at^2}{2} = 1{,}76\cdot10^{-2}\ \text{м},\quad v = at = 3{,}51\cdot10^7\ \text{м/с}` },
    ],
    answer: [String.raw`s = 1{,}76\ \text{см}`, String.raw`v = 35{,}1\cdot10^6\ \text{м/с}`],
    note: SMALL + 'В книге v = 35,2·10⁶ м/с (так выходит с e/m = 1,76·10¹¹ Кл/кг).',
  },

  /* ===================== 15.52 ===================== */
  {
    id: '15.52', chapter: CH, section: S7, page: '251',
    title: 'Ускоряющее напряжение для 3·10⁷ м/с',
    given: [[String.raw`v = 3\cdot10^7\ \text{м/с}`, '']],
    find: String.raw`U_e,\ U_p \;—\; ?`,
    formulas: [KIN],
    steps: [
      { title: 'Работа поля = кинетическая энергия',
        tex: String.raw`eU = \frac{mv^2}{2}\ \Rightarrow\ U = \frac{mv^2}{2e}` },
      { title: '1) Электрон',
        tex: String.raw`U_e = \frac{9{,}11\cdot10^{-31}\cdot9\cdot10^{14}}{2\cdot1{,}6\cdot10^{-19}} = 2{,}56\cdot10^3\ \text{В}` },
      { title: '2) Протон',
        tex: String.raw`U_p = \frac{1{,}67\cdot10^{-27}\cdot9\cdot10^{14}}{2\cdot1{,}6\cdot10^{-19}} = 4{,}70\cdot10^6\ \text{В}` },
    ],
    answer: [String.raw`1)\ U_e = 2{,}56\ \text{кВ}`, String.raw`2)\ U_p = 4{,}70\ \text{МВ}`],
    note: SMALL + 'В книге 2,55 кВ и 4,69 МВ (другое округление массы и заряда).',
  },

  /* ===================== 15.53 ===================== */
  {
    id: '15.53', chapter: CH, section: S7, page: '251',
    title: 'Электрон в лампе: катод — анод',
    given: [[String.raw`U = 90\ \text{В}`, ''], [String.raw`r = 1\ \text{мм}`, String.raw`10^{-3}\ \text{м}`]],
    find: String.raw`a,\ v,\ t \;—\; ?`,
    formulas: [ACC, KIN, { tex: String.raw`E = \frac Ur`, text: 'однородное поле' }],
    steps: [
      { title: 'Ускорение',
        tex: String.raw`a = \frac{eU}{mr} = \frac{1{,}6\cdot10^{-19}\cdot90}{9{,}11\cdot10^{-31}\cdot10^{-3}} = 1{,}58\cdot10^{16}\ \text{м/с}^2` },
      { title: 'Скорость у анода',
        tex: String.raw`v = \sqrt{\frac{2eU}{m}} = \sqrt{\frac{2\cdot1{,}6\cdot10^{-19}\cdot90}{9{,}11\cdot10^{-31}}} = 5{,}62\cdot10^6\ \text{м/с}` },
      { title: 'Время',
        text: 'Средняя скорость при равноускоренном движении из покоя — v/2.',
        tex: String.raw`t = \frac{2r}{v} = \frac{2\cdot10^{-3}}{5{,}62\cdot10^6} = 3{,}56\cdot10^{-10}\ \text{с}` },
    ],
    answer: [String.raw`a = 1{,}58\cdot10^{16}\ \text{м/с}^2`, String.raw`v = 5{,}62\cdot10^6\ \text{м/с}`, String.raw`t = 0{,}356\ \text{нс}`],
    note: SMALL + 'В книге v = 5,63·10⁶ м/с.',
  },

  /* ===================== 15.54 ===================== */
  {
    id: '15.54', chapter: CH, section: S7, page: '252',
    title: 'Пылинка с пятью электронами',
    given: [[String.raw`m = 10^{-12}\ \text{г}`, String.raw`10^{-15}\ \text{кг}`], [String.raw`N = 5`, ''], [String.raw`U = 3\ \text{МВ}`, String.raw`3\cdot10^6\ \text{В}`]],
    find: String.raw`T,\ v \;—\; ?`,
    formulas: [KIN],
    steps: [
      { title: 'Энергия',
        tex: String.raw`T = NeU = 5\cdot3\ \text{МэВ} = 15\ \text{МэВ} = 15\cdot10^6\cdot1{,}6\cdot10^{-19} = 2{,}4\cdot10^{-12}\ \text{Дж}` },
      { title: 'Скорость',
        tex: String.raw`v = \sqrt{\frac{2T}{m}} = \sqrt{\frac{2\cdot2{,}4\cdot10^{-12}}{10^{-15}}} = 69{,}3\ \text{м/с}` },
    ],
    answer: [String.raw`T = 15\ \text{МэВ}`, String.raw`v = 69{,}3\ \text{м/с}`],
    note: MISMATCH + 'В книге v = 2,19 м/с — так выходит, если взять m = 10⁻¹² кг вместо 10⁻¹² г. В условии масса в граммах: 10⁻¹² г = 10⁻¹⁵ кг, и v = 69,3 м/с.',
  },

  /* ===================== 15.55 ===================== */
  {
    id: '15.55', chapter: CH, section: S7, page: '252',
    title: 'Удельный заряд частицы',
    given: [[String.raw`U = 600\ \text{кВ}`, String.raw`6\cdot10^5\ \text{В}`], [String.raw`v = 5{,}4\cdot10^6\ \text{м/с}`, '']],
    find: String.raw`Q/m \;—\; ?`,
    formulas: [KIN],
    steps: [
      { title: 'Энергия',
        tex: String.raw`QU = \frac{mv^2}{2}\ \Rightarrow\ \frac Qm = \frac{v^2}{2U} = \frac{(5{,}4\cdot10^6)^2}{2\cdot6\cdot10^5} = 2{,}43\cdot10^7\ \text{Кл/кг}` },
    ],
    answer: [String.raw`\frac Qm = 24{,}3\ \text{МКл/кг}`],
  },

  /* ===================== 15.56 ===================== */
  {
    id: '15.56', chapter: CH, section: S7, page: '252',
    title: 'Протон удваивает скорость',
    given: [[String.raw`v = 100\ \text{км/с}`, String.raw`10^5\ \text{м/с}`], [String.raw`E = 300\ \text{В/см}`, String.raw`3\cdot10^4\ \text{В/м}`]],
    find: String.raw`l \;—\; ?`,
    formulas: [KIN],
    steps: [
      { title: 'Работа поля = прирост энергии',
        tex: String.raw`eEl = \frac{m(2v)^2}{2} - \frac{mv^2}{2} = \frac32mv^2\ \Rightarrow\ l = \frac{3mv^2}{2eE}` },
      { title: 'Считаем',
        tex: String.raw`l = \frac{3\cdot1{,}67\cdot10^{-27}\cdot10^{10}}{2\cdot1{,}6\cdot10^{-19}\cdot3\cdot10^4} = 5{,}22\cdot10^{-3}\ \text{м}` },
    ],
    answer: [String.raw`l = 5{,}22\ \text{мм}`],
    note: SMALL + 'В книге 5,19 мм (так выходит с mₚ = 1,66·10⁻²⁷ кг).',
  },

  /* ===================== 15.57 ===================== */
  {
    id: '15.57', chapter: CH, section: S7, page: '252',
    title: 'Электрон летит к отрицательной плоскости',
    given: [[String.raw`\sigma = -35{,}4\ \text{нКл/м}^2`, String.raw`-3{,}54\cdot10^{-8}\ \text{Кл/м}^2`], [String.raw`l_0 = 5\ \text{см}`, String.raw`0{,}05\ \text{м}`], [String.raw`T = 80\ \text{эВ}`, '']],
    find: String.raw`l_{\min} \;—\; ?`,
    formulas: [PLANE, KIN],
    steps: [
      { title: 'Поле плоскости',
        tex: String.raw`E = \frac{|\sigma|}{2\varepsilon_0} = \frac{3{,}54\cdot10^{-8}}{2\cdot8{,}85\cdot10^{-12}} = 2000\ \text{В/м}` },
      { title: 'Тормозной путь',
        text: 'Плоскость отталкивает электрон; он остановится, когда работа поля съест всю кинетическую энергию.',
        tex: String.raw`|e|E\,\Delta l = T\ \Rightarrow\ \Delta l = \frac{T}{|e|E} = \frac{80\ \text{В}}{2000\ \text{В/м}} = 0{,}04\ \text{м}` },
      { title: 'Минимальное расстояние',
        tex: String.raw`l_{\min} = l_0 - \frac{2\varepsilon_0T}{|e\sigma|} = 5 - 4 = 1\ \text{см}` },
    ],
    answer: [String.raw`l_{\min} = l_0 - \frac{2\varepsilon_0T}{|e\sigma|} = 1\ \text{см}`],
    note: TYPO + 'В формуле книги нет множителя 2 (ε₀T/|eσ|), но число 1 см — верное, оно получается с 2ε₀.',
  },

  /* ===================== 15.58 ===================== */
  {
    id: '15.58', chapter: CH, section: S7, page: '252',
    title: 'Электрон в вертикальном поле',
    given: [[String.raw`v_0 = 1{,}6\cdot10^6\ \text{м/с}`, ''], [String.raw`E = 90\ \text{В/см}`, String.raw`9\cdot10^3\ \text{В/м}`], [String.raw`t = 1\ \text{нс}`, String.raw`10^{-9}\ \text{с}`]],
    find: String.raw`v,\ \alpha \;—\; ?`,
    formulas: [ACC],
    steps: [
      { title: 'Вертикальная скорость',
        text: 'Поле направлено вверх — сила на электрон вниз.',
        tex: String.raw`v_y = \frac{|e|E}{m}t = \frac{1{,}6\cdot10^{-19}\cdot9\cdot10^3}{9{,}11\cdot10^{-31}}\cdot10^{-9} = 1{,}58\cdot10^6\ \text{м/с}` },
      { title: 'Полная скорость и угол',
        tex: String.raw`v = \sqrt{v_0^2 + v_y^2} = 2{,}25\cdot10^6\ \text{м/с},\quad \operatorname{tg}\alpha = \frac{v_y}{v_0} = 0{,}99\ \Rightarrow\ \alpha \approx 45^\circ` },
    ],
    answer: [String.raw`v = 2{,}25\cdot10^6\ \text{м/с}`, String.raw`\alpha \approx 45^\circ\ \text{вниз от начального направления}`],
    note: SMALL + 'В книге 2,24·10⁶ м/с.',
  },

  /* ===================== 15.59 ===================== */
  {
    id: '15.59', chapter: CH, section: S7, page: '252',
    title: 'Протон: скорость возрастает вдвое',
    given: [[String.raw`v_1 = 10^5\ \text{м/с}`, ''], [String.raw`n = 2`, ''], [String.raw`e/m = 9{,}6\cdot10^7\ \text{Кл/кг}`, '']],
    find: String.raw`\varphi_2 \;—\; ?`,
    formulas: [KIN],
    steps: [
      { title: 'Работа поля = прирост энергии',
        tex: String.raw`e(\varphi_1 - \varphi_2) = \frac{m(2v_1)^2}{2} - \frac{mv_1^2}{2} = \frac32mv_1^2` },
      { title: 'Разность потенциалов',
        tex: String.raw`\varphi_1 - \varphi_2 = \frac32\frac{v_1^2}{e/m} = \frac{1{,}5\cdot10^{10}}{9{,}6\cdot10^7} = 156\ \text{В}` },
    ],
    answer: [String.raw`\varphi_2 = \varphi_1 - \frac32\frac me v_1^2 = \varphi_1 - 156\ \text{В}`],
    note: MISMATCH + 'В книге φ₂ = 289 В, но числа φ₁ в условии нет — ответ можно дать только как φ₂ = φ₁ − 156 В. (289 В выходит, если φ₁ = 445 В, — видимо, это число выпало из условия.)',
  },

  /* ===================== 15.60 ===================== */
  {
    id: '15.60', chapter: CH, section: S7, page: '252',
    title: 'Электрон тормозится вдвое',
    given: [[String.raw`E = 1\ \text{кВ/м}`, String.raw`10^3\ \text{В/м}`], [String.raw`v_0 = 10^6\ \text{м/с}`, ''], [String.raw`v_1 = v_0/2`, '']],
    find: String.raw`l \;—\; ?`,
    formulas: [KIN],
    steps: [
      { title: 'Работа тормозящего поля',
        tex: String.raw`|e|El = \frac{mv_0^2}{2} - \frac{m(v_0/2)^2}{2} = \frac38mv_0^2` },
      { title: 'Расстояние',
        tex: String.raw`l = \frac38\frac{m}{|e|}\frac{v_0^2}{E} = \frac{3\cdot9{,}11\cdot10^{-31}\cdot10^{12}}{8\cdot1{,}6\cdot10^{-19}\cdot10^3} = 2{,}14\cdot10^{-3}\ \text{м}` },
    ],
    answer: [String.raw`l = \frac38\frac{m}{|e|}\frac{v_0^2}{E} = 2{,}14\ \text{мм}`],
    note: TYPO + 'В формуле книги стоит v₁² вместо v₀² (число 2,13 мм посчитано с v₀); точно 2,135 мм.',
  },

  /* ===================== 15.61 ===================== */
  {
    id: '15.61', chapter: CH, section: S7, page: '252',
    title: 'Протон долетает до шара',
    given: [[String.raw`\varphi = 400\ \text{В}`, ''], [String.raw`r_0 = R + 3R = 4R`, '']],
    find: String.raw`v_{\min} \;—\; ?`,
    formulas: [SPH, KIN],
    steps: [
      { title: 'Потенциал в начальной точке',
        text: 'По рис. 15.17 протон начинает в 3R от поверхности, т. е. в 4R от центра.',
        tex: String.raw`\varphi_0 = \varphi\frac{R}{4R} = \frac\varphi4` },
      { title: 'Энергия',
        text: 'Минимальная скорость — та, при которой протон дойдёт до поверхности с нулевой скоростью.',
        tex: String.raw`\frac{mv_{\min}^2}{2} = e\left(\varphi - \frac\varphi4\right)\ \Rightarrow\ v_{\min} = \sqrt{\frac32\frac em\varphi}` },
      { title: 'Считаем',
        tex: String.raw`v_{\min} = \sqrt{1{,}5\cdot\frac{1{,}6\cdot10^{-19}}{1{,}67\cdot10^{-27}}\cdot400} = 2{,}40\cdot10^5\ \text{м/с}` },
    ],
    answer: [String.raw`v_{\min} = 0{,}24\cdot10^6\ \text{м/с}`],
  },

  /* ===================== 15.62 ===================== */
  {
    id: '15.62', chapter: CH, section: S7, page: '252',
    title: 'Электрон: скорость падает вдвое',
    given: [[String.raw`\varphi_1 = 100\ \text{В}`, ''], [String.raw`v_1 = 6\cdot10^6\ \text{м/с}`, ''], [String.raw`v_2 = v_1/2`, '']],
    find: String.raw`\varphi_2 \;—\; ?`,
    formulas: [KIN],
    steps: [
      { title: 'Энергия электрона (заряд −|e|)',
        tex: String.raw`-|e|(\varphi_1 - \varphi_2) = \frac{mv_2^2}{2} - \frac{mv_1^2}{2} = -\frac38mv_1^2` },
      { title: 'Потенциал',
        tex: String.raw`\varphi_2 = \varphi_1 - \frac38\frac{m}{|e|}v_1^2 = 100 - \frac{3\cdot9{,}11\cdot10^{-31}\cdot3{,}6\cdot10^{13}}{8\cdot1{,}6\cdot10^{-19}} = 100 - 76{,}9 = 23{,}1\ \text{В}` },
    ],
    answer: [String.raw`\varphi_2 = 23{,}1\ \text{В}`],
    note: SMALL + 'В книге 23,3 В (с другим округлением e/m).',
  },

  /* ===================== 15.63 ===================== */
  {
    id: '15.63', chapter: CH, section: S7, page: '253',
    title: 'Электрон у отрицательного цилиндра',
    given: [[String.raw`\tau = -20\ \text{нКл/м}`, String.raw`-2\cdot10^{-8}\ \text{Кл/м}`], [String.raw`v_0 = 0`, ''], [String.raw`r_1 = R,\ r_2 = R + 9R = 10R`, '']],
    find: String.raw`T \;—\; ?`,
    formulas: [LINE, KIN],
    steps: [
      { title: 'Работа поля',
        text: 'Цилиндр и электрон заряжены одноимённо — электрон отталкивается и разгоняется.',
        tex: String.raw`T = |e|\frac{|\tau|}{2\pi\varepsilon_0}\ln\frac{10R}{R} = |e|\cdot\frac{2\cdot10^{-8}}{2\pi\cdot8{,}85\cdot10^{-12}}\cdot2{,}303` },
      { title: 'Считаем',
        tex: String.raw`T = |e|\cdot828\ \text{В} = 828\ \text{эВ}` },
    ],
    answer: [String.raw`T = \frac{|e\tau|}{2\pi\varepsilon_0}\ln10 = 828\ \text{эВ}`],
  },

  /* ===================== 15.64 ===================== */
  {
    id: '15.64', chapter: CH, section: S7, page: '253',
    title: 'Электрон поперёк поля 150 В/м',
    given: [[String.raw`v_0 = 3\cdot10^6\ \text{м/с}`, ''], [String.raw`E = 150\ \text{В/м}`, ''], [String.raw`t = 0{,}1\ \text{мкс}`, String.raw`10^{-7}\ \text{с}`]],
    find: String.raw`F,\ a,\ v \;—\; ?`,
    formulas: [ACC],
    steps: [
      { title: '1) Сила',
        tex: String.raw`F = |e|E = 1{,}6\cdot10^{-19}\cdot150 = 2{,}4\cdot10^{-17}\ \text{Н}` },
      { title: '2) Ускорение',
        tex: String.raw`a = \frac Fm = \frac{2{,}4\cdot10^{-17}}{9{,}11\cdot10^{-31}} = 2{,}63\cdot10^{13}\ \text{м/с}^2` },
      { title: '3) Скорость',
        text: 'Вдоль начального направления скорость не меняется, поперёк — растёт как at.',
        tex: String.raw`v = \sqrt{v_0^2 + (at)^2} = \sqrt{(3\cdot10^6)^2 + (2{,}63\cdot10^6)^2} = 3{,}99\cdot10^6\ \text{м/с}` },
    ],
    answer: [String.raw`F = 2{,}4\cdot10^{-17}\ \text{Н}`, String.raw`a = 2{,}63\cdot10^{13}\ \text{м/с}^2`, String.raw`v = 3{,}99\cdot10^6\ \text{м/с}`],
    note: MISMATCH + 'В книге a = 2,75·10¹³ м/с² и v = 4,07·10⁶ м/с. Но по её же F = 2,4·10⁻¹⁷ Н: a = F/m = 2,4·10⁻¹⁷/9,11·10⁻³¹ = 2,63·10¹³ м/с², отсюда v = 3,99·10⁶ м/с.',
  },

  /* ===================== 15.65 ===================== */
  {
    id: '15.65', chapter: CH, section: S7, page: '253',
    title: 'Смещение электрона в конденсаторе',
    given: [[String.raw`v = 10^7\ \text{м/с}`, ''], [String.raw`d = 16\ \text{мм}`, String.raw`0{,}016\ \text{м}`], [String.raw`U = 30\ \text{В}`, ''], [String.raw`l = 6\ \text{см}`, String.raw`0{,}06\ \text{м}`]],
    find: String.raw`y \;—\; ?`,
    formulas: [ACC, { tex: String.raw`E = \frac Ud`, text: 'поле плоского конденсатора' }],
    steps: [
      { title: 'Время пролёта',
        tex: String.raw`t = \frac lv = \frac{0{,}06}{10^7} = 6\cdot10^{-9}\ \text{с}` },
      { title: 'Ускорение к пластине',
        tex: String.raw`a = \frac{eU}{md} = \frac{1{,}6\cdot10^{-19}\cdot30}{9{,}11\cdot10^{-31}\cdot0{,}016} = 3{,}29\cdot10^{14}\ \text{м/с}^2` },
      { title: 'Смещение',
        tex: String.raw`y = \frac{at^2}{2} = \frac{3{,}29\cdot10^{14}\cdot3{,}6\cdot10^{-17}}{2} = 5{,}9\cdot10^{-3}\ \text{м}` },
    ],
    answer: [String.raw`y = 5{,}9\ \text{мм}`],
  },

  /* ===================== 15.66 ===================== */
  {
    id: '15.66', chapter: CH, section: S7, page: '253',
    title: 'Электрон отклонился на 35°',
    given: [[String.raw`v = 10^7\ \text{м/с}`, ''], [String.raw`\alpha = 35^\circ`, ''], [String.raw`l = 10\ \text{см}`, String.raw`0{,}1\ \text{м}`], [String.raw`d = 2\ \text{см}`, String.raw`0{,}02\ \text{м}`]],
    find: String.raw`U \;—\; ?`,
    formulas: [ACC, { tex: String.raw`E = \frac Ud`, text: 'поле плоского конденсатора' }],
    steps: [
      { title: 'Угол на вылете',
        tex: String.raw`\operatorname{tg}\alpha = \frac{v_y}{v} = \frac{at}{v} = \frac{eU}{md}\cdot\frac{l}{v^2}` },
      { title: 'Напряжение',
        tex: String.raw`U = \frac{mdv^2\operatorname{tg}\alpha}{el} = \frac{9{,}11\cdot10^{-31}\cdot0{,}02\cdot10^{14}\cdot0{,}700}{1{,}6\cdot10^{-19}\cdot0{,}1} = 79{,}7\ \text{В}` },
    ],
    answer: [String.raw`U = 79{,}7\ \text{В}`],
    note: SMALL + 'В книге 79,6 В.',
  },

  /* ===================== 15.67 ===================== */
  {
    id: '15.67', chapter: CH, section: S7, page: '253',
    title: 'Электрон не должен вылететь',
    given: [[String.raw`v = 10^7\ \text{м/с}`, ''], [String.raw`d = 2\ \text{см}`, String.raw`0{,}02\ \text{м}`], [String.raw`l = 10\ \text{см}`, String.raw`0{,}1\ \text{м}`]],
    find: String.raw`U_{\min} \;—\; ?`,
    formulas: [ACC, { tex: String.raw`E = \frac Ud`, text: 'поле плоского конденсатора' }],
    steps: [
      { title: 'Условие',
        text: 'Электрон влетает посередине; чтобы он не вылетел, за время пролёта l/v он должен сместиться на d/2 (попасть на край пластины).',
        tex: String.raw`\frac{eU}{md}\cdot\frac{l^2}{2v^2} = \frac d2` },
      { title: 'Напряжение',
        tex: String.raw`U = \frac{md^2v^2}{el^2} = \frac{9{,}11\cdot10^{-31}\cdot4\cdot10^{-4}\cdot10^{14}}{1{,}6\cdot10^{-19}\cdot10^{-2}} = 22{,}8\ \text{В}` },
    ],
    answer: [String.raw`U_{\min} = \frac{md^2v^2}{el^2} = 22{,}8\ \text{В}`],
    note: SMALL + 'В книге 22,5 В — разница 1 %, вероятно, округление e/m.',
  },

  /* ===================== 15.68 ===================== */
  {
    id: '15.68', chapter: CH, section: S7, page: '253',
    title: 'Протон сближается с α-частицей',
    given: [[String.raw`v_1 = 300\ \text{км/с}`, String.raw`3\cdot10^5\ \text{м/с}`], [String.raw`v_2 = 0`, ''], [String.raw`Q = 2e`, ''], [String.raw`m_1 = 4m_2\ (m_2 = m_p)`, '']],
    find: String.raw`r_{\min},\ u_1,\ u_2 \;—\; ?`,
    formulas: [{ tex: String.raw`m_2v_1 = (m_1 + m_2)u`, text: 'закон сохранения импульса: в момент наибольшего сближения скорости частиц равны' }, WPAIR],
    steps: [
      { title: 'Скорости в момент сближения',
        tex: String.raw`u_1 = u_2 = u = \frac{m_2}{m_1 + m_2}v_1 = \frac{v_1}{5} = 60\ \text{км/с}` },
      { title: 'Энергия',
        text: 'Убыль кинетической энергии равна энергии взаимодействия при r_min.',
        tex: String.raw`\frac{m_2v_1^2}{2} - \frac{(m_1 + m_2)u^2}{2} = \frac{m_1m_2}{m_1 + m_2}\cdot\frac{v_1^2}{2} = \frac{eQ}{4\pi\varepsilon_0r_{\min}}` },
      { title: 'Минимальное расстояние',
        tex: String.raw`r_{\min} = \frac{eQ(1 + m_1/m_2)}{2\pi\varepsilon_0m_1v_1^2} = \frac{8{,}99\cdot10^9\cdot2\cdot(1{,}6\cdot10^{-19})^2\cdot5\cdot2}{4\cdot1{,}67\cdot10^{-27}\cdot9\cdot10^{10}} = 7{,}66\cdot10^{-12}\ \text{м}` },
    ],
    answer: [String.raw`r_{\min} = 7{,}66\ \text{пм}`, String.raw`u_1 = u_2 = 60\ \text{км/с}`],
    note: MISMATCH + String.raw`В книге $r_{\min} = 767$ пм — в 100 раз больше. По формуле самой книги выходит $7{,}66\cdot10^{-12}$ м = 7,66 пм. Ещё в формуле скорости в книге $\frac{m_1}{m_1 + m_2}$ — должно быть $\frac{m_2}{m_1 + m_2}$ (число 60 км/с верное).`,
  },

  /* ===================== 15.69 ===================== */
  {
    id: '15.69', chapter: CH, section: S7, page: '254',
    title: 'Частица летит на ядро лития',
    given: [[String.raw`q = e`, ''], [String.raw`U = 60\ \text{кВ}`, String.raw`6\cdot10^4\ \text{В}`], [String.raw`Q = 3e`, '']],
    find: String.raw`r_{\min} \;—\; ?`,
    formulas: [KIN, WPAIR],
    steps: [
      { title: 'Энергия',
        text: 'Ядро тяжёлое — неподвижно. Вся кинетическая энергия eU переходит в энергию взаимодействия.',
        tex: String.raw`eU = \frac{e\cdot3e}{4\pi\varepsilon_0r_{\min}}\ \Rightarrow\ r_{\min} = \frac{3e}{4\pi\varepsilon_0U}` },
      { title: 'Считаем',
        tex: String.raw`r_{\min} = \frac{8{,}99\cdot10^9\cdot3\cdot1{,}6\cdot10^{-19}}{6\cdot10^4} = 7{,}2\cdot10^{-14}\ \text{м}` },
    ],
    answer: [String.raw`r_{\min} = 72\ \text{фм}`],
  },

  /* ===================== 15.70 ===================== */
  {
    id: '15.70', chapter: CH, section: S7, page: '254',
    title: 'Два сближающихся электрона',
    given: [[String.raw`v = 10^7\ \text{м/с}\ (\text{относительная})`, '']],
    find: String.raw`r_{\min} \;—\; ?`,
    formulas: [WPAIR, { tex: String.raw`\mu = \frac{m_1m_2}{m_1 + m_2}`, text: 'приведённая масса: в системе центра масс энергия относительного движения μv²/2' }],
    steps: [
      { title: 'Энергия относительного движения',
        text: 'Для двух электронов μ = m/2. В момент наибольшего сближения относительная скорость равна нулю.',
        tex: String.raw`\frac{\mu v^2}{2} = \frac{mv^2}{4} = \frac{e^2}{4\pi\varepsilon_0r_{\min}}` },
      { title: 'Расстояние',
        tex: String.raw`r_{\min} = \frac{e^2}{\pi\varepsilon_0mv^2} = \frac{(1{,}6\cdot10^{-19})^2}{\pi\cdot8{,}85\cdot10^{-12}\cdot9{,}11\cdot10^{-31}\cdot10^{14}} = 1{,}01\cdot10^{-11}\ \text{м}` },
    ],
    answer: [String.raw`r_{\min} = 10{,}1\ \text{пм}`],
  },

  /* ===================== 15.71 ===================== */
  {
    id: '15.71', chapter: CH, section: S7, page: '254',
    title: 'Сближение двух частиц — общий случай',
    given: [[String.raw`Q_1,\ Q_2,\ m_1,\ m_2,\ v_1,\ v_2`, '']],
    find: String.raw`r_{\min} \;—\; ?`,
    formulas: [WPAIR, { tex: String.raw`\mu = \frac{m_1m_2}{m_1 + m_2}`, text: 'приведённая масса' }],
    steps: [
      { title: 'Относительная скорость',
        text: 'Частицы летят навстречу по одной прямой: v_отн = v₁ + v₂. В системе центра масс энергия относительного движения целиком переходит в энергию взаимодействия.',
        tex: String.raw`\frac{\mu(v_1 + v_2)^2}{2} = \frac{Q_1Q_2}{4\pi\varepsilon_0r_{\min}}` },
      { title: 'Общая формула',
        tex: String.raw`r_{\min} = \frac{Q_1Q_2(1 + m_1/m_2)}{2\pi\varepsilon_0m_1(v_1 + v_2)^2}` },
      { title: '1) m₁ = m₂',
        tex: String.raw`r_{\min 1} = \frac{Q_1Q_2}{\pi\varepsilon_0m_1(v_1 + v_2)^2}` },
      { title: '2) m₂ ≫ m₁',
        tex: String.raw`r_{\min 2} = \frac{Q_1Q_2}{2\pi\varepsilon_0m_1(v_1 + v_2)^2}` },
    ],
    answer: [String.raw`r_{\min} = \frac{Q_1Q_2(1 + m_1/m_2)}{2\pi\varepsilon_0m_1(v_1 + v_2)^2}`, String.raw`1)\ \frac{Q_1Q_2}{\pi\varepsilon_0m_1(v_1 + v_2)^2};\quad 2)\ \frac{Q_1Q_2}{2\pi\varepsilon_0m_1(v_1 + v_2)^2}`],
  },

  /* ===================== 15.72 ===================== */
  {
    id: '15.72', chapter: CH, section: S7, page: '254',
    title: 'Разлёт двух частиц',
    given: [[String.raw`k = m_1/m_2`, ''], [String.raw`r_0,\ Q_1,\ Q_2`, ''], [String.raw`r \gg r_0`, '']],
    find: String.raw`T_1 \;—\; ?`,
    formulas: [WPAIR, { tex: String.raw`m_1v_1 = m_2v_2`, text: 'импульс системы остаётся равным нулю' }],
    steps: [
      { title: 'Деление энергии',
        text: 'При равных импульсах кинетические энергии обратно пропорциональны массам: T₂ = T₁·m₁/m₂ = kT₁.',
        tex: String.raw`T_1 + T_2 = T_1(1 + k) = \frac{Q_1Q_2}{4\pi\varepsilon_0r_0}` },
      { title: 'Ответ',
        tex: String.raw`T_1 = \frac{Q_1Q_2}{4\pi\varepsilon_0r_0(1 + k)}` },
      { title: 'Частные случаи',
        tex: String.raw`1)\ k = 1:\ T_1 = \frac{Q_1Q_2}{8\pi\varepsilon_0r_0};\quad 2)\ k = 0:\ T_1 = \frac{Q_1Q_2}{4\pi\varepsilon_0r_0};\quad 3)\ k\to\infty:\ T_1 = 0` },
    ],
    answer: [String.raw`T_1 = \frac{Q_1Q_2}{4\pi\varepsilon_0r_0(1 + k)}`],
  },

  /* ===================== 15.73 ===================== */
  {
    id: '15.73', chapter: CH, section: S7, page: '254',
    title: 'Потенциал шара рядом с зарядом',
    given: [[String.raw`l = 50\ \text{см}`, String.raw`0{,}5\ \text{м}`], [String.raw`q = 20\ \text{нКл}`, String.raw`2\cdot10^{-8}\ \text{Кл}`], [String.raw`R = 10\ \text{см}`, String.raw`0{,}1\ \text{м}`], [String.raw`Q = 6\ \text{нКл}`, String.raw`6\cdot10^{-9}\ \text{Кл}`]],
    find: String.raw`\varphi \;—\; ?`,
    formulas: [PHIQ, SUPP],
    steps: [
      { title: 'Считаем в центре шара',
        text: 'Шар — проводник, его потенциал всюду одинаков; удобно взять центр. Заряд Q (как бы ни перераспределился по поверхности) весь на расстоянии R от центра, внешний заряд q — на расстоянии l.',
        tex: String.raw`\varphi = \frac{1}{4\pi\varepsilon_0}\left(\frac QR + \frac ql\right) = 8{,}99\cdot10^9\left(\frac{6\cdot10^{-9}}{0{,}1} + \frac{2\cdot10^{-8}}{0{,}5}\right) = 899\ \text{В}` },
    ],
    answer: [String.raw`\varphi = 899\ \text{В} \approx 900\ \text{В}`],
  },

  /* ===================== 15.74 ===================== */
  {
    id: '15.74', chapter: CH, section: S7, page: '254',
    title: 'Четыре электрона и протон',
    given: [[String.raw`a = 0{,}3\ \text{нм}`, String.raw`3\cdot10^{-10}\ \text{м}`], [String.raw`\text{рис. 15.19}`, '']],
    find: String.raw`\Pi \;—\; ?`,
    formulas: [WSYS],
    steps: [
      { title: 'Пары',
        text: 'Электроны — в вершинах квадрата: 4 пары по сторонам (a), 2 по диагоналям (a√2). Протон в центре: 4 пары протон — электрон на расстоянии a/√2.',
        tex: String.raw`\Pi = \frac{e^2}{4\pi\varepsilon_0a}\left(4 + \frac{2}{\sqrt2} - 4\sqrt2\right) = \frac{e^2}{2\pi\varepsilon_0a}\left(2 - \frac{3}{\sqrt2}\right)` },
      { title: 'Считаем',
        tex: String.raw`\Pi = \frac{8{,}99\cdot10^9\cdot(1{,}6\cdot10^{-19})^2}{3\cdot10^{-10}}\cdot(-0{,}243) = -1{,}86\cdot10^{-19}\ \text{Дж} = -1{,}16\ \text{эВ}` },
    ],
    answer: [String.raw`\Pi = -1{,}86\cdot10^{-19}\ \text{Дж} = -1{,}16\ \text{эВ}`],
  },

  /* ===================== 15.75 ===================== */
  {
    id: '15.75', chapter: CH, section: S7, page: '254',
    title: 'Разлёт трёх протонов',
    given: [[String.raw`a = 10^{-15}\ \text{м}`, '']],
    find: String.raw`v \;—\; ?`,
    formulas: [WSYS],
    steps: [
      { title: 'Энергия',
        text: 'Энергия трёх пар целиком переходит в кинетическую энергию трёх одинаковых протонов (по симметрии скорости равны).',
        tex: String.raw`3\cdot\frac{e^2}{4\pi\varepsilon_0a} = 3\cdot\frac{mv^2}{2}\ \Rightarrow\ v = \frac{e}{\sqrt{2\pi\varepsilon_0ma}}` },
      { title: 'Считаем',
        tex: String.raw`v = \frac{1{,}6\cdot10^{-19}}{\sqrt{2\pi\cdot8{,}85\cdot10^{-12}\cdot1{,}67\cdot10^{-27}\cdot10^{-15}}} = 1{,}66\cdot10^7\ \text{м/с}` },
    ],
    answer: [String.raw`v = 1{,}66\cdot10^7\ \text{м/с}`],
  },

  /* ===================== 15.76 ===================== */
  {
    id: '15.76', chapter: CH, section: S7, page: '254',
    title: 'Собственная энергия заряженного шара',
    given: [[String.raw`R = 10\ \text{см}`, String.raw`0{,}1\ \text{м}`], [String.raw`\sigma = 10\ \text{нКл/см}^2`, String.raw`10^{-4}\ \text{Кл/м}^2`]],
    find: String.raw`\Pi \;—\; ?`,
    formulas: [{ tex: String.raw`\Pi = \frac12Q\varphi = \frac{Q^2}{8\pi\varepsilon_0R}`, text: 'собственная энергия заряженного проводящего шара' }],
    steps: [
      { title: 'Заряд',
        tex: String.raw`Q = 4\pi R^2\sigma = 4\pi\cdot0{,}01\cdot10^{-4} = 1{,}26\cdot10^{-5}\ \text{Кл}` },
      { title: 'Энергия',
        tex: String.raw`\Pi = \frac{Q^2}{8\pi\varepsilon_0R} = \frac{2\pi\sigma^2R^3}{\varepsilon_0} = \frac{2\pi\cdot10^{-8}\cdot10^{-3}}{8{,}85\cdot10^{-12}} = 7{,}10\ \text{Дж}` },
    ],
    answer: [String.raw`\Pi = \frac{2\pi\sigma^2R^3}{\varepsilon_0} = 7{,}10\ \text{Дж}`],
    note: MISMATCH + 'В книге 7,10 мкДж. По её же формуле 2πσ²R³/ε₀ с σ = 10 нКл/см² = 10⁻⁴ Кл/м² выходит 7,10 Дж — в книге ошибка в единицах (мкДж вместо Дж).',
  },

  /* ===================== 15.77 ===================== */
  {
    id: '15.77', chapter: CH, section: S7, page: '255',
    title: 'Энергия шара, заряженного до 1 кВ',
    given: [[String.raw`R = 5\ \text{см}`, String.raw`0{,}05\ \text{м}`], [String.raw`\varphi = 1\ \text{кВ}`, String.raw`10^3\ \text{В}`]],
    find: String.raw`\Pi \;—\; ?`,
    formulas: [{ tex: String.raw`\Pi = \frac12Q\varphi,\quad Q = 4\pi\varepsilon_0R\varphi`, text: 'собственная энергия заряженного проводника' }],
    steps: [
      { title: 'Энергия',
        tex: String.raw`\Pi = \frac12\cdot4\pi\varepsilon_0R\varphi\cdot\varphi = 2\pi\varepsilon_0R\varphi^2 = 2\pi\cdot8{,}85\cdot10^{-12}\cdot0{,}05\cdot10^6 = 2{,}78\cdot10^{-6}\ \text{Дж}` },
    ],
    answer: [String.raw`\Pi = 2{,}78\ \text{мкДж}`],
  }

  );
})();
