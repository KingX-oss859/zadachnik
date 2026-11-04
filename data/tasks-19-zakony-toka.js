/*
  § 19. Законы постоянного тока — задачи 19.1–19.36 (стр. 292–297).
  Условия задач показываются дословно из книги (data/book-tasks.js).
  Ответы пересчитаны скриптом tools/check_zakony_toka.py и сверены с book/99-otvety.md.
  Где ответ книги расходится с расчётом — плашка note «Расхождение с ответом книги».
  Табл. 18: ρ железа 98 нОм·м, меди 17 нОм·м (α = 4,2·10⁻³ К⁻¹), графита 3,9 мкОм·м.
*/
(function () {
  const CH = 'Гл. 4. Постоянный электрический ток';
  const S1 = 'Закон Ома для участка цепи';
  const S2 = 'Закон Ома для всей цепи';
  const S3 = 'Правила Кирхгофа';
  const S4 = 'Работа и мощность тока';
  const MISMATCH = '<b>Расхождение с ответом книги.</b> ';
  const SMALL = '<b>Расхождение в последней цифре.</b> ';
  const TYPO = '<b>Опечатка в ответе книги.</b> ';

  const IQ = { tex: String.raw`I = \frac{dQ}{dt},\quad Q = \int I\,dt`, text: 'сила тока; заряд — площадь под графиком I(t)' };
  const RHO = { tex: String.raw`R = \frac{\rho l}{S}`, text: 'сопротивление однородного проводника' };
  const RT = { tex: String.raw`\rho = \rho_0(1 + \alpha t)`, text: 'зависимость удельного сопротивления от температуры' };
  const OHM = { tex: String.raw`I = \frac UR`, text: 'закон Ома для однородного участка' };
  const OHMF = { tex: String.raw`I = \frac{\mathcal E}{R + r}`, text: 'закон Ома для замкнутой цепи (r — внутреннее сопротивление источника)' };
  const SERP = { tex: String.raw`R = R_1 + R_2,\quad \frac1R = \frac{1}{R_1} + \frac{1}{R_2}`, text: 'последовательное и параллельное соединение' };
  const K1 = { tex: String.raw`\sum I_i = 0`, text: 'первое правило Кирхгофа: сумма токов в узле равна нулю' };
  const K2 = { tex: String.raw`\sum I_iR_i = \sum\mathcal E_i`, text: 'второе правило Кирхгофа для замкнутого контура' };
  const NODE = { tex: String.raw`I_k = \frac{\mathcal E_k - (\varphi_R - \varphi_L)}{r_k}`, text: 'ток ветви между двумя узлами L и R (ЭДС берётся со знаком «+», если она гонит ток от L к R)' };
  const POW = { tex: String.raw`P = IU = I^2R = \frac{U^2}{R}`, text: 'мощность тока' };
  const JL = { tex: String.raw`Q = \int I^2R\,dt`, text: 'закон Джоуля–Ленца (для меняющегося тока — интеграл)' };

  window.TASKS.push(

  /* ===================== 19.1 ===================== */
  {
    id: '19.1', chapter: CH, section: S1, page: '292',
    title: 'Заряд при равномерно растущем токе',
    given: [[String.raw`I_0 = 0,\ I = 3\ \text{А}`, ''], [String.raw`t = 10\ \text{с}`, '']],
    find: String.raw`Q \;—\; ?`,
    formulas: [IQ],
    steps: [
      { title: 'Площадь треугольника под графиком I(t)',
        tex: String.raw`Q = \frac{I_0 + I}{2}t = \frac{0 + 3}{2}\cdot10 = 15\ \text{Кл}` },
    ],
    answer: [String.raw`Q = 15\ \text{Кл}`],
  },

  /* ===================== 19.2 ===================== */
  {
    id: '19.2', chapter: CH, section: S1, page: '292',
    title: 'Плотность тока в железном проводнике',
    given: [[String.raw`l = 10\ \text{м}`, ''], [String.raw`U = 6\ \text{В}`, ''], [String.raw`\rho = 98\ \text{нОм·м}`, String.raw`9{,}8\cdot10^{-8}\ \text{Ом·м}`]],
    find: String.raw`j \;—\; ?`,
    formulas: [RHO, OHM, { tex: String.raw`j = \frac IS`, text: 'плотность тока' }],
    steps: [
      { title: 'Площадь сечения сокращается',
        tex: String.raw`j = \frac IS = \frac{U}{RS} = \frac{U}{\rho l} = \frac{6}{9{,}8\cdot10^{-8}\cdot10} = 6{,}1\cdot10^6\ \text{А/м}^2` },
    ],
    answer: [String.raw`j = 6{,}1\ \text{МА/м}^2`],
  },

  /* ===================== 19.3 ===================== */
  {
    id: '19.3', chapter: CH, section: S1, page: '292',
    title: 'Сечение медной линии электропередачи',
    given: [[String.raw`U = 6{,}6\ \text{кВ}`, ''], [String.raw`l = 10\ \text{км}`, String.raw`10^4\ \text{м}`], [String.raw`I = 20\ \text{А}`, ''], [String.raw`\Delta U = 3\%\,U`, ''], [String.raw`\rho = 17\ \text{нОм·м}`, String.raw`1{,}7\cdot10^{-8}\ \text{Ом·м}`]],
    find: String.raw`S \;—\; ?`,
    formulas: [RHO, OHM],
    steps: [
      { title: 'Допустимое сопротивление проводов',
        tex: String.raw`R = \frac{\Delta U}{I} = \frac{0{,}03\cdot6600}{20} = 9{,}9\ \text{Ом}` },
      { title: 'Сечение',
        text: 'Линия двухпроводная — общая длина проводов 2l.',
        tex: String.raw`S = \frac{\rho\cdot2l}{R} = \frac{1{,}7\cdot10^{-8}\cdot2\cdot10^4}{9{,}9} = 3{,}43\cdot10^{-5}\ \text{м}^2` },
    ],
    answer: [String.raw`S = 34{,}3\ \text{мм}^2`],
    note: SMALL + 'В книге 34,2 мм²; точно 34,34.',
  },

  /* ===================== 19.4 ===================== */
  {
    id: '19.4', chapter: CH, section: S1, page: '292',
    title: 'Сопротивление графитового усечённого конуса',
    given: [[String.raw`h = 20\ \text{см}`, String.raw`0{,}2\ \text{м}`], [String.raw`r_1 = 12\ \text{мм},\ r_2 = 8\ \text{мм}`, ''], [String.raw`\rho = 3{,}9\ \text{мкОм·м}`, String.raw`3{,}9\cdot10^{-6}\ \text{Ом·м}`]],
    find: String.raw`R \;—\; ?`,
    formulas: [RHO],
    steps: [
      { title: 'Складываем тонкие слои',
        text: 'Радиус меняется линейно с высотой: r(x) = r₁ + (r₂ − r₁)x/h. Слой толщиной dx имеет сопротивление ρ dx/(πr²).',
        tex: String.raw`R = \int_0^h\frac{\rho\,dx}{\pi r^2} = \frac{\rho h}{\pi(r_2 - r_1)}\left(\frac{1}{r_1} - \frac{1}{r_2}\right) = \frac{\rho h}{\pi r_1r_2}` },
      { title: 'Считаем',
        tex: String.raw`R = \frac{3{,}9\cdot10^{-6}\cdot0{,}2}{\pi\cdot0{,}012\cdot0{,}008} = 2{,}59\cdot10^{-3}\ \text{Ом}` },
    ],
    answer: [String.raw`R = \frac{\rho h}{\pi r_1r_2} = 2{,}59\ \text{мОм}`],
    note: SMALL + 'В книге 2,58 мОм; точно 2,586.',
  },

  /* ===================== 19.5 ===================== */
  {
    id: '19.5', chapter: CH, section: S1, page: '292',
    title: 'Проводник с перепадом температуры',
    given: [[String.raw`R_0 = 10\ \text{Ом}`, ''], [String.raw`t_1 = 20\ ^\circ\text{C},\ t_2 = 400\ ^\circ\text{C}`, ''], [String.raw`\alpha = 4{,}2\cdot10^{-3}\ \text{К}^{-1}`, '']],
    find: String.raw`R \;—\; ?`,
    formulas: [RT],
    steps: [
      { title: 'Температура меняется линейно вдоль проводника',
        text: 'Сопротивление каждого кусочка линейно зависит от t, поэтому сумма — как при средней температуре.',
        tex: String.raw`R = R_0\left(1 + \alpha\frac{t_1 + t_2}{2}\right) = 10\cdot(1 + 4{,}2\cdot10^{-3}\cdot210) = 18{,}8\ \text{Ом}` },
    ],
    answer: [String.raw`R = 18{,}8\ \text{Ом}`],
  },

  /* ===================== 19.6 ===================== */
  {
    id: '19.6', chapter: CH, section: S1, page: '293',
    title: 'Куб: включение по диагонали',
    given: [[String.raw`R_1 = 1\ \text{Ом}`, ''], [String.raw`\text{рис. 19.4, а}`, '']],
    find: String.raw`R \;—\; ?`,
    formulas: [SERP],
    steps: [
      { title: 'Симметрия',
        text: 'Ток входит в вершину и выходит из противоположной. Три ребра у входа равноправны — каждое несёт I/3; шесть средних рёбер — по I/6; три у выхода — по I/3.',
        tex: String.raw`U = \frac I3R_1 + \frac I6R_1 + \frac I3R_1 = \frac56IR_1` },
    ],
    answer: [String.raw`R = \frac56\ \text{Ом}`],
  },

  /* ===================== 19.7 ===================== */
  {
    id: '19.7', chapter: CH, section: S1, page: '293',
    title: 'Куб: включение по диагонали грани',
    given: [[String.raw`R_1 = 1\ \text{Ом}`, ''], [String.raw`\text{рис. 19.4, б}`, '']],
    find: String.raw`R \;—\; ?`,
    formulas: [SERP, K1],
    steps: [
      { title: 'Идея',
        text: 'Ток подводится к противоположным вершинам одной грани. По симметрии две вершины этой грани (не входная и не выходная) имеют одинаковый потенциал — как и две соответствующие вершины противоположной грани. Объединяем точки с равными потенциалами и сворачиваем цепь.' },
      { title: 'Результат',
        text: 'Решение системы правил Кирхгофа для всех 8 вершин (проверено в tools/check_zakony_toka.py):',
        tex: String.raw`R = \frac34R_1` },
    ],
    answer: [String.raw`R = \frac34\ \text{Ом}`],
  },

  /* ===================== 19.8 ===================== */
  {
    id: '19.8', chapter: CH, section: S1, page: '293',
    title: 'Куб: включение по ребру',
    given: [[String.raw`R_1 = 1\ \text{Ом}`, ''], [String.raw`\text{рис. 19.4, в}`, '']],
    find: String.raw`R \;—\; ?`,
    formulas: [SERP],
    steps: [
      { title: 'Теорема Фостера',
        text: 'Для любой цепи из одинаковых резисторов R₁ сумма сопротивлений между концами каждого ребра, взятая по всем рёбрам, равна (n − 1)R₁, где n — число узлов. У куба n = 8 вершин и 12 рёбер, и все рёбра равноправны.',
        tex: String.raw`12R = (8 - 1)R_1\ \Rightarrow\ R = \frac{7}{12}R_1` },
    ],
    answer: [String.raw`R = \frac{7}{12}\ \text{Ом}`],
  },

  /* ===================== 19.9 ===================== */
  {
    id: '19.9', chapter: CH, section: S1, page: '293',
    title: 'Сопротивление катушки с учётом вольтметра',
    given: [[String.raw`R_\text{в} = 1\ \text{кОм}`, String.raw`10^3\ \text{Ом}`], [String.raw`I = 0{,}5\ \text{А}`, ''], [String.raw`U = 100\ \text{В}`, '']],
    find: String.raw`R,\ \delta \;—\; ?`,
    formulas: [OHM, K1],
    steps: [
      { title: 'Ток через вольтметр',
        text: 'Амперметр показывает ток катушки плюс ток вольтметра.',
        tex: String.raw`I_\text{в} = \frac{U}{R_\text{в}} = 0{,}1\ \text{А},\quad R = \frac{U}{I - I_\text{в}} = \frac{100}{0{,}4} = 250\ \text{Ом}` },
      { title: 'Погрешность при R ≈ U/I',
        tex: String.raw`R' = \frac{100}{0{,}5} = 200\ \text{Ом},\quad \delta = \frac{250 - 200}{250} = 20\%` },
    ],
    answer: [String.raw`R = 250\ \text{Ом};\quad \delta = 20\%`],
  },

  /* ===================== 19.10 ===================== */
  {
    id: '19.10', chapter: CH, section: S1, page: '293',
    title: 'Амперметр без шунта',
    given: [[String.raw`I = 10\ \text{А}`, ''], [String.raw`R_\text{а} = 0{,}02\ \text{Ом}`, ''], [String.raw`R_\text{ш} = 5\ \text{мОм}`, String.raw`5\cdot10^{-3}\ \text{Ом}`]],
    find: String.raw`I_\text{а} \;—\; ?`,
    formulas: [SERP, OHM],
    steps: [
      { title: 'Токи делятся обратно сопротивлениям',
        tex: String.raw`\frac{I_\text{ш}}{I_\text{а}} = \frac{R_\text{а}}{R_\text{ш}} = 4\ \Rightarrow\ I_\text{а} = \frac{I}{1 + 4} = 2\ \text{А}` },
    ],
    answer: [String.raw`I_\text{а} = 2\ \text{А}`],
  },

  /* ===================== 19.11 ===================== */
  {
    id: '19.11', chapter: CH, section: S1, page: '293',
    title: 'Какая схема лучше для больших и малых R',
    given: [[String.raw`R_1 = 1\ \text{кОм},\ R_2 = 10\ \text{Ом}`, ''], [String.raw`R_\text{в} = 5\ \text{кОм},\ R_\text{а} = 2\ \text{Ом}`, '']],
    find: String.raw`\delta \;—\; ?`,
    formulas: [SERP, OHM],
    steps: [
      { title: 'Схема а: вольтметр параллельно R',
        text: 'Амперметр считает и ток вольтметра — измеряем R‖R_в вместо R.',
        tex: String.raw`R_\text{изм} = \frac{RR_\text{в}}{R + R_\text{в}},\quad \delta = \frac{R}{R + R_\text{в}}:\quad \delta_1 = \frac{1000}{6000} = 16{,}7\%,\ \delta_2 = \frac{10}{5010} = 0{,}2\%` },
      { title: 'Схема б: вольтметр параллельно R и амперметру',
        text: 'Вольтметр считает и падение на амперметре — измеряем R + R_а.',
        tex: String.raw`\delta = \frac{R_\text{а}}{R}:\quad \delta_1 = \frac{2}{1000} = 0{,}2\%,\ \delta_2 = \frac{2}{10} = 20\%` },
      { title: 'Вывод',
        text: 'Схема а годится для малых сопротивлений, схема б — для больших.' },
    ],
    answer: [String.raw`\text{а) }16{,}7\%;\ 0{,}2\%\quad \text{б) }0{,}2\%;\ 20\%`, String.raw`\text{а — для малых }R,\ \text{б — для больших}`],
  },

  /* ===================== 19.12 ===================== */
  {
    id: '19.12', chapter: CH, section: S2, page: '294',
    title: 'Погрешность измерения ЭДС вольтметром',
    given: [[String.raw`r = 3\ \text{Ом}`, ''], [String.raw`R_\text{в} = 200\ \text{Ом}`, '']],
    find: String.raw`\delta \;—\; ?`,
    formulas: [OHMF],
    steps: [
      { title: 'Показание вольтметра',
        tex: String.raw`U = IR_\text{в} = \frac{\mathcal ER_\text{в}}{R_\text{в} + r}` },
      { title: 'Погрешность',
        tex: String.raw`\delta = \frac{\mathcal E - U}{\mathcal E} = \frac{r}{R_\text{в} + r} = \frac{3}{203} = 1{,}48\%` },
    ],
    answer: [String.raw`\delta = 1{,}48\%`],
  },

  /* ===================== 19.13 ===================== */
  {
    id: '19.13', chapter: CH, section: S2, page: '294',
    title: 'Внутренние сопротивления двух источников',
    given: [[String.raw`\mathcal E = 1{,}5\ \text{В}`, ''], [String.raw`R = 0{,}1\ \text{Ом}`, ''], [String.raw`I_1 = 0{,}5\ \text{А},\ I = 0{,}4\ \text{А}`, '']],
    find: String.raw`r_1,\ r_2 \;—\; ?`,
    formulas: [OHMF],
    steps: [
      { title: 'Один источник',
        tex: String.raw`r_1 = \frac{\mathcal E}{I_1} - R = 3 - 0{,}1 = 2{,}9\ \text{Ом}` },
      { title: 'Два последовательно',
        tex: String.raw`I = \frac{2\mathcal E}{R + r_1 + r_2}\ \Rightarrow\ r_2 = \frac{3}{0{,}4} - 0{,}1 - 2{,}9 = 4{,}5\ \text{Ом}` },
    ],
    answer: [String.raw`r_1 = 2{,}9\ \text{Ом};\quad r_2 = 4{,}5\ \text{Ом}`],
  },

  /* ===================== 19.14 ===================== */
  {
    id: '19.14', chapter: CH, section: S2, page: '294',
    title: 'Батарея из двух групп по три элемента',
    given: [[String.raw`\mathcal E = 1{,}2\ \text{В},\ r = 0{,}2\ \text{Ом}`, ''], [String.raw`R = 1{,}5\ \text{Ом}`, '']],
    find: String.raw`I \;—\; ?`,
    formulas: [OHMF, SERP],
    steps: [
      { title: 'Группа',
        tex: String.raw`\mathcal E_\text{гр} = 3{,}6\ \text{В},\quad r_\text{гр} = 0{,}6\ \text{Ом}` },
      { title: 'Две группы параллельно',
        tex: String.raw`\mathcal E_\text{б} = 3{,}6\ \text{В},\quad r_\text{б} = 0{,}3\ \text{Ом},\quad I = \frac{3{,}6}{0{,}3 + 1{,}5} = 2\ \text{А}` },
    ],
    answer: [String.raw`I = 2\ \text{А}`],
  },

  /* ===================== 19.15 ===================== */
  {
    id: '19.15', chapter: CH, section: S2, page: '294',
    title: 'Наивыгоднейшее соединение элементов',
    given: [[String.raw`N,\ \mathcal E,\ r_i,\ R`, '']],
    find: String.raw`n,\ R_i \;—\; ?`,
    formulas: [OHMF],
    steps: [
      { title: 'Батарея из N/n групп по n элементов',
        tex: String.raw`\mathcal E_\text{б} = n\mathcal E,\quad R_i = \frac{nr_i}{N/n} = \frac{n^2r_i}{N},\quad I = \frac{n\mathcal E}{R + n^2r_i/N}` },
      { title: 'Максимум',
        text: 'I максимален, когда знаменатель, делённый на n, минимален: R/n + nr_i/N → min. Сумма двух слагаемых с постоянным произведением минимальна при их равенстве.',
        tex: String.raw`\frac Rn = \frac{nr_i}{N}\ \Rightarrow\ n = \sqrt{\frac{NR}{r_i}},\quad R_i = \frac{n^2r_i}{N} = R` },
    ],
    answer: [String.raw`n = \sqrt{NR/r_i};\quad R_i = R`],
  },

  /* ===================== 19.16 ===================== */
  {
    id: '19.16', chapter: CH, section: S2, page: '294',
    title: '12 элементов: как соединить',
    given: [[String.raw`N = 12`, ''], [String.raw`\mathcal E = 1{,}5\ \text{В},\ r = 0{,}4\ \text{Ом}`, ''], [String.raw`R = 0{,}3\ \text{Ом}`, '']],
    find: String.raw`n,\ I_{\max} \;—\; ?`,
    formulas: [OHMF],
    steps: [
      { title: 'По формуле задачи 19.15',
        tex: String.raw`n = \sqrt{\frac{12\cdot0{,}3}{0{,}4}} = 3\ \Rightarrow\ 4\ \text{группы по 3 элемента}` },
      { title: 'Ток',
        tex: String.raw`\mathcal E_\text{б} = 4{,}5\ \text{В},\ R_i = \frac{3\cdot0{,}4}{4} = 0{,}3\ \text{Ом},\quad I_{\max} = \frac{4{,}5}{0{,}6} = 7{,}5\ \text{А}` },
    ],
    answer: [String.raw`4\ \text{группы по 3 последовательных элемента};\ I_{\max} = 7{,}5\ \text{А}`],
  },

  /* ===================== 19.17 ===================== */
  {
    id: '19.17', chapter: CH, section: S2, page: '294',
    title: 'Два источника: согласно и встречно',
    given: [[String.raw`\mathcal E = 1{,}2\ \text{В},\ r = 0{,}4\ \text{Ом}`, ''], [String.raw`\text{рис. 19.6, а, б}`, '']],
    find: String.raw`I,\ U_{AB} \;—\; ?`,
    formulas: [OHMF, { tex: String.raw`U = \mathcal E - Ir`, text: 'напряжение на зажимах источника' }],
    steps: [
      { title: 'а) Источники гонят ток в одну сторону',
        tex: String.raw`I = \frac{2\mathcal E}{2r} = \frac{1{,}2}{0{,}4} = 3\ \text{А},\quad U_{AB} = \mathcal E - Ir = 1{,}2 - 1{,}2 = 0` },
      { title: 'б) Источники включены навстречу',
        text: 'ЭДС компенсируют друг друга, тока нет; между A и B — ЭДС одного источника.',
        tex: String.raw`I = 0,\quad U_{AB} = \mathcal E = 1{,}2\ \text{В}` },
    ],
    answer: [String.raw`\text{а) }I = 3\ \text{А},\ U = 0;\quad \text{б) }I = 0,\ U = 1{,}2\ \text{В}`],
  },

  /* ===================== 19.18 ===================== */
  {
    id: '19.18', chapter: CH, section: S2, page: '294',
    title: 'Элементы, соединённые одноимёнными полюсами',
    given: [[String.raw`\mathcal E_1 = 1{,}2\ \text{В},\ r_1 = 0{,}1\ \text{Ом}`, ''], [String.raw`\mathcal E_2 = 0{,}9\ \text{В},\ r_2 = 0{,}3\ \text{Ом}`, ''], [String.raw`R = 0{,}2\ \text{Ом}`, '']],
    find: String.raw`I \;—\; ?`,
    formulas: [OHMF],
    steps: [
      { title: 'ЭДС направлены навстречу',
        tex: String.raw`I = \frac{\mathcal E_1 - \mathcal E_2}{r_1 + r_2 + R} = \frac{0{,}3}{0{,}6} = 0{,}5\ \text{А}` },
    ],
    answer: [String.raw`I = 0{,}5\ \text{А}`],
  },

  /* ===================== 19.19 ===================== */
  {
    id: '19.19', chapter: CH, section: S3, page: '295',
    title: 'Две батареи и реостат',
    given: [[String.raw`\mathcal E_1 = 10\ \text{В},\ r_1 = 1\ \text{Ом}`, ''], [String.raw`\mathcal E_2 = 8\ \text{В},\ r_2 = 2\ \text{Ом}`, ''], [String.raw`R = 6\ \text{Ом}`, '']],
    find: String.raw`I_1,\ I_2,\ I_R \;—\; ?`,
    formulas: [K1, K2, NODE],
    steps: [
      { title: 'Полярность',
        text: 'Ответ книги получается, если обе батареи обращены «+» к одному и тому же узлу (как на рис. 19.8). На рис. 19.7, как он напечатан, батарея 𝓔₂ перевёрнута — см. плашку.' },
      { title: 'Напряжение между узлами',
        tex: String.raw`V = \frac{\mathcal E_1/r_1 + \mathcal E_2/r_2}{1/r_1 + 1/r_2 + 1/R} = \frac{10 + 4}{1 + 0{,}5 + 0{,}167} = 8{,}4\ \text{В}` },
      { title: 'Токи',
        tex: String.raw`I_1 = \frac{10 - 8{,}4}{1} = 1{,}6\ \text{А},\quad I_2 = \frac{8 - 8{,}4}{2} = -0{,}2\ \text{А},\quad I_R = \frac{8{,}4}{6} = 1{,}4\ \text{А}` },
      { title: 'Смысл знака',
        text: 'I₂ < 0: ток через вторую батарею идёт против её ЭДС — она заряжается.' },
    ],
    answer: [String.raw`I_1 = 1{,}6\ \text{А};\ I_2 = 0{,}2\ \text{А}\ (\text{заряжается});\ I_R = 1{,}4\ \text{А}`],
    note: '<b>Рисунки 19.7 и 19.8, видимо, перепутаны.</b> На рис. 19.7 батареи включены навстречу; тогда вышло бы I₁ = 6,4 А, I₂ = 5,8 А, ток реостата 0,6 А. Ответ книги (1,6; 0,2; 1,4 А) получается при одинаковой полярности, как на рис. 19.8, — а ответ к 19.20 (ток 0) получается как раз при встречной полярности рис. 19.7. Здесь решено так, чтобы совпало с ответом книги.',
  },

  /* ===================== 19.20 ===================== */
  {
    id: '19.20', chapter: CH, section: S3, page: '295',
    title: 'Ток через реостат равен нулю',
    given: [[String.raw`\mathcal E_1 = 8\ \text{В},\ r_1 = 2\ \text{Ом}`, ''], [String.raw`\mathcal E_2 = 6\ \text{В},\ r_2 = 1{,}5\ \text{Ом}`, ''], [String.raw`R = 10\ \text{Ом}`, '']],
    find: String.raw`I_R \;—\; ?`,
    formulas: [K1, K2, NODE],
    steps: [
      { title: 'Полярность',
        text: 'Ответ книги получается при встречном включении батарей (как на рис. 19.7) — см. плашку к 19.19.' },
      { title: 'Напряжение между узлами',
        tex: String.raw`V = \frac{\mathcal E_1/r_1 - \mathcal E_2/r_2}{1/r_1 + 1/r_2 + 1/R} = \frac{4 - 4}{\ldots} = 0` },
      { title: 'Ток через реостат',
        text: 'Батареи гонят по общему контуру ток 14/3,5 = 4 А, а точки подключения реостата при этом имеют одинаковый потенциал.',
        tex: String.raw`I_R = \frac VR = 0` },
    ],
    answer: [String.raw`I_R = 0`],
    note: '<b>Рисунки 19.7 и 19.8, видимо, перепутаны.</b> При одинаковой полярности батарей, как напечатано на рис. 19.8, через реостат шёл бы ток 0,63 А. Ответ книги 0 получается при встречном включении (как на рис. 19.7).',
  },

  /* ===================== 19.21 ===================== */
  {
    id: '19.21', chapter: CH, section: S3, page: '295',
    title: 'Ток в R₃ по рис. 19.9',
    given: [[String.raw`\mathcal E_1 = 4\ \text{В},\ \mathcal E_2 = 3\ \text{В}`, ''], [String.raw`R_1 = 2,\ R_2 = 6,\ R_3 = 1\ \text{Ом}`, '']],
    find: String.raw`I_3,\ U_3 \;—\; ?`,
    formulas: [K1, K2],
    steps: [
      { title: 'Узловой потенциал',
        text: 'Возьмём φ_B = 0. От B через 𝓔₁ потенциал поднимается до 4 В и через R₁ подходит к A; через 𝓔₂ — до 3 В и через R₃ к A; R₂ соединяет A с B.',
        tex: String.raw`\frac{4 - \varphi_A}{2} + \frac{3 - \varphi_A}{1} = \frac{\varphi_A}{6}\ \Rightarrow\ \varphi_A = 3\ \text{В}` },
      { title: 'Ток в R₃',
        tex: String.raw`I_3 = \frac{3 - \varphi_A}{R_3} = 0,\quad U_3 = 0` },
    ],
    answer: [String.raw`I_3 = 0;\quad U_3 = 0`],
  },

  /* ===================== 19.22 ===================== */
  {
    id: '19.22', chapter: CH, section: S3, page: '295',
    title: 'Три батареи, соединённые одноимёнными полюсами',
    given: [[String.raw`\mathcal E_1 = 12,\ \mathcal E_2 = 5,\ \mathcal E_3 = 10\ \text{В}`, ''], [String.raw`r = 1\ \text{Ом}`, '']],
    find: String.raw`I_1,\ I_2,\ I_3 \;—\; ?`,
    formulas: [K1, NODE],
    steps: [
      { title: 'Батареи — три параллельные ветви',
        tex: String.raw`V = \frac{12 + 5 + 10}{3} = 9\ \text{В}` },
      { title: 'Токи',
        tex: String.raw`I_1 = \frac{12 - 9}{1} = 3\ \text{А},\quad I_2 = \frac{5 - 9}{1} = -4\ \text{А},\quad I_3 = \frac{10 - 9}{1} = 1\ \text{А}` },
      { title: 'Смысл',
        text: 'Батареи 1 и 3 разряжаются, батарея 2 заряжается током 4 А.' },
    ],
    answer: [String.raw`I_1 = 3\ \text{А};\ I_2 = 4\ \text{А};\ I_3 = 1\ \text{А}`],
  },

  /* ===================== 19.23 ===================== */
  {
    id: '19.23', chapter: CH, section: S3, page: '295',
    title: 'Три источника и три реостата',
    given: [[String.raw`\mathcal E_1 = 11,\ \mathcal E_2 = 4,\ \mathcal E_3 = 6\ \text{В}`, ''], [String.raw`R_1 = 5,\ R_2 = 10,\ R_3 = 2\ \text{Ом}`, '']],
    find: String.raw`I_1,\ I_2,\ I_3 \;—\; ?`,
    formulas: [K1, NODE],
    steps: [
      { title: 'Напряжение между узлами',
        text: 'По рис. 19.10 все источники обращены «+» к правому узлу.',
        tex: String.raw`V = \frac{11/5 + 4/10 + 6/2}{1/5 + 1/10 + 1/2} = \frac{5{,}6}{0{,}8} = 7\ \text{В}` },
      { title: 'Токи',
        tex: String.raw`I_1 = \frac{11 - 7}{5} = 0{,}8\ \text{А},\quad I_2 = \frac{4 - 7}{10} = -0{,}3\ \text{А},\quad I_3 = \frac{6 - 7}{2} = -0{,}5\ \text{А}` },
    ],
    answer: [String.raw`I_1 = 0{,}8\ \text{А};\ I_2 = 0{,}3\ \text{А};\ I_3 = 0{,}5\ \text{А}`],
  },

  /* ===================== 19.24 ===================== */
  {
    id: '19.24', chapter: CH, section: S3, page: '295',
    title: 'Какую ЭДС включить между A и B',
    given: [[String.raw`R_1 = 5,\ R_2 = 1,\ R_3 = 3\ \text{Ом}`, ''], [String.raw`\mathcal E_1 = 1{,}4\ \text{В}`, ''], [String.raw`I_3 = 1\ \text{А}`, '']],
    find: String.raw`\mathcal E \;—\; ?`,
    formulas: [K1, K2],
    steps: [
      { title: 'Потенциал точки B',
        text: 'Нижний провод примем за ноль. Ток 1 А идёт через R₃ вниз, значит φ_B = I₃R₃ = 3 В.' },
      { title: 'Левая часть схемы',
        text: 'Ток I_a идёт вверх через R₁ и через 𝓔₁ к узлу A; оттуда 1 А уходит в новый источник, остальное — вниз через R₂.',
        tex: String.raw`\varphi_A = \mathcal E_1 - I_aR_1 = (I_a - 1)R_2\ \Rightarrow\ 1{,}4 - 5I_a = I_a - 1\ \Rightarrow\ I_a = 0{,}4\ \text{А},\ \varphi_A = -0{,}6\ \text{В}` },
      { title: 'ЭДС',
        text: 'Источник должен поднять потенциал от A до B («+» к точке B).',
        tex: String.raw`\mathcal E = \varphi_B - \varphi_A = 3 - (-0{,}6) = 3{,}6\ \text{В}` },
    ],
    answer: [String.raw`\mathcal E = 3{,}6\ \text{В}\ (\text{«+» к точке }B)`],
  },

  /* ===================== 19.25 ===================== */
  {
    id: '19.25', chapter: CH, section: S4, page: '296',
    title: 'Лампочка и реостат',
    given: [[String.raw`U_\text{л} = 40\ \text{В}`, ''], [String.raw`R = 10\ \text{Ом}`, ''], [String.raw`P = 120\ \text{Вт}`, '']],
    find: String.raw`I \;—\; ?`,
    formulas: [POW],
    steps: [
      { title: 'Мощность внешней цепи',
        tex: String.raw`P = IU_\text{л} + I^2R\ \Rightarrow\ 10I^2 + 40I - 120 = 0\ \Rightarrow\ I^2 + 4I - 12 = 0` },
      { title: 'Положительный корень',
        tex: String.raw`I = 2\ \text{А}` },
    ],
    answer: [String.raw`I = 2\ \text{А}`],
  },

  /* ===================== 19.26 ===================== */
  {
    id: '19.26', chapter: CH, section: S4, page: '296',
    title: 'Наибольшая полезная мощность батареи',
    given: [[String.raw`\mathcal E = 12\ \text{В}`, ''], [String.raw`I_\text{кз} = 5\ \text{А}`, '']],
    find: String.raw`P_{\max} \;—\; ?`,
    formulas: [OHMF, POW],
    steps: [
      { title: 'Внутреннее сопротивление',
        tex: String.raw`r = \frac{\mathcal E}{I_\text{кз}} = 2{,}4\ \text{Ом}` },
      { title: 'Максимум при R = r',
        tex: String.raw`P_{\max} = \frac{\mathcal E^2}{4r} = \frac{\mathcal EI_\text{кз}}{4} = \frac{12\cdot5}{4} = 15\ \text{Вт}` },
    ],
    answer: [String.raw`P_{\max} = 15\ \text{Вт}`],
  },

  /* ===================== 19.27 ===================== */
  {
    id: '19.27', chapter: CH, section: S4, page: '296',
    title: 'Сопротивление для максимальной мощности',
    given: [[String.raw`\mathcal E = 2\ \text{В}`, ''], [String.raw`r = 0{,}5\ \text{Ом}`, '']],
    find: String.raw`R,\ P \;—\; ?`,
    formulas: [OHMF, POW],
    steps: [
      { title: 'Мощность во внешней цепи',
        text: 'P = 𝓔²R/(R + r)² — производная по R обращается в ноль при R = r.',
        tex: String.raw`R = r = 0{,}5\ \text{Ом},\quad P = \frac{\mathcal E^2}{4r} = \frac{4}{2} = 2\ \text{Вт}` },
    ],
    answer: [String.raw`R = 0{,}5\ \text{Ом};\quad P = 2\ \text{Вт}`],
  },

  /* ===================== 19.28 ===================== */
  {
    id: '19.28', chapter: CH, section: S4, page: '296',
    title: 'К. п. д. батареи',
    given: [[String.raw`\mathcal E = 20\ \text{В}`, ''], [String.raw`R = 2\ \text{Ом},\ I = 4\ \text{А}`, ''], [String.raw`\eta' = 99\%`, '']],
    find: String.raw`\eta,\ R' \;—\; ?`,
    formulas: [OHMF, { tex: String.raw`\eta = \frac{U}{\mathcal E} = \frac{R}{R + r}`, text: 'к. п. д. источника' }],
    steps: [
      { title: 'К. п. д.',
        tex: String.raw`\eta = \frac{IR}{\mathcal E} = \frac{8}{20} = 0{,}4` },
      { title: 'Внутреннее сопротивление',
        tex: String.raw`r = \frac{\mathcal E}{I} - R = 5 - 2 = 3\ \text{Ом}` },
      { title: 'R для η = 0,99',
        tex: String.raw`\frac{R'}{R' + r} = 0{,}99\ \Rightarrow\ R' = 99r = 297\ \text{Ом}` },
    ],
    answer: [String.raw`\eta = 0{,}4;\quad R' = 297\ \text{Ом}`],
  },

  /* ===================== 19.29 ===================== */
  {
    id: '19.29', chapter: CH, section: S4, page: '296',
    title: 'Нагреватель на 80 Вт от батареи 24 В',
    given: [[String.raw`\mathcal E = 24\ \text{В}`, ''], [String.raw`r = 1\ \text{Ом}`, ''], [String.raw`P = 80\ \text{Вт}`, '']],
    find: String.raw`I,\ \eta \;—\; ?`,
    formulas: [OHMF, POW],
    steps: [
      { title: 'Уравнение',
        tex: String.raw`P = \mathcal EI - I^2r\ \Rightarrow\ I^2 - 24I + 80 = 0\ \Rightarrow\ I_1 = 20\ \text{А},\ I_2 = 4\ \text{А}` },
      { title: 'К. п. д.',
        text: 'Два режима (два сопротивления нагревателя) дают одну мощность.',
        tex: String.raw`\eta = \frac{\mathcal E - Ir}{\mathcal E}:\quad \eta_1 = \frac{4}{24} = 0{,}17,\quad \eta_2 = \frac{20}{24} = 0{,}83` },
    ],
    answer: [String.raw`I_1 = 20\ \text{А},\ \eta_1 = 0{,}17;\quad I_2 = 4\ \text{А},\ \eta_2 = 0{,}83`],
  },

  /* ===================== 19.30 ===================== */
  {
    id: '19.30', chapter: CH, section: S4, page: '296',
    title: 'Кипятильник из двух секций',
    given: [[String.raw`t_1 = 15\ \text{мин}`, ''], [String.raw`t_2 = 30\ \text{мин}`, '']],
    find: String.raw`t_\text{посл},\ t_\text{пар} \;—\; ?`,
    formulas: [POW],
    steps: [
      { title: 'Сопротивления пропорциональны времени',
        text: 'Теплота одна и та же: Q = U²t/R, поэтому R ∝ t при одинаковом напряжении сети.' },
      { title: 'Последовательно',
        tex: String.raw`t = t_1 + t_2 = 45\ \text{мин}` },
      { title: 'Параллельно',
        tex: String.raw`t = \frac{t_1t_2}{t_1 + t_2} = \frac{450}{45} = 10\ \text{мин}` },
    ],
    answer: [String.raw`45\ \text{мин};\quad 10\ \text{мин}`],
  },

  /* ===================== 19.31 ===================== */
  {
    id: '19.31', chapter: CH, section: S4, page: '296',
    title: 'ЭДС и внутреннее сопротивление по двум режимам',
    given: [[String.raw`I_1 = 3\ \text{А},\ P_1 = 18\ \text{Вт}`, ''], [String.raw`I_2 = 1\ \text{А},\ P_2 = 10\ \text{Вт}`, '']],
    find: String.raw`\mathcal E,\ r \;—\; ?`,
    formulas: [POW, OHMF],
    steps: [
      { title: 'Полезная мощность P = 𝓔I − I²r',
        tex: String.raw`18 = 3\mathcal E - 9r,\quad 10 = \mathcal E - r` },
      { title: 'Решаем',
        tex: String.raw`\mathcal E = 10 + r\ \Rightarrow\ 18 = 30 + 3r - 9r\ \Rightarrow\ r = 2\ \text{Ом},\ \mathcal E = 12\ \text{В}` },
    ],
    answer: [String.raw`\mathcal E = 12\ \text{В};\quad r = 2\ \text{Ом}`],
    note: TYPO + 'В книге r = 20 Ом — опечатка: с r = 20 Ом и 𝓔 = 12 В ток 3 А вообще невозможен. Правильно r = 2 Ом.',
  },

  /* ===================== 19.32 ===================== */
  {
    id: '19.32', chapter: CH, section: S4, page: '296',
    title: 'Теплота при равномерно растущем токе',
    given: [[String.raw`R = 100\ \text{Ом}`, ''], [String.raw`I_{\max} = 10\ \text{А}`, ''], [String.raw`\tau = 30\ \text{с}`, '']],
    find: String.raw`Q \;—\; ?`,
    formulas: [JL],
    steps: [
      { title: 'Ток I = I_max·t/τ',
        tex: String.raw`Q = \int_0^\tau\frac{I_{\max}^2t^2}{\tau^2}R\,dt = \frac13I_{\max}^2R\tau = \frac{100\cdot100\cdot30}{3} = 10^5\ \text{Дж}` },
    ],
    answer: [String.raw`Q = 100\ \text{кДж}`],
  },

  /* ===================== 19.33 ===================== */
  {
    id: '19.33', chapter: CH, section: S4, page: '296',
    title: 'Теплота при равномерно убывающем токе',
    given: [[String.raw`R = 12\ \text{Ом}`, ''], [String.raw`I_0 = 5\ \text{А}`, ''], [String.raw`t = 10\ \text{с}`, '']],
    find: String.raw`Q \;—\; ?`,
    formulas: [JL],
    steps: [
      { title: 'Как в 19.32 (убывание — то же самое, отражённое во времени)',
        tex: String.raw`Q = \frac13I_0^2Rt = \frac{25\cdot12\cdot10}{3} = 10^3\ \text{Дж}` },
    ],
    answer: [String.raw`Q = 1\ \text{кДж}`],
  },

  /* ===================== 19.34 ===================== */
  {
    id: '19.34', chapter: CH, section: S4, page: '296',
    title: 'Заряд по выделившейся теплоте',
    given: [[String.raw`R = 3\ \text{Ом}`, ''], [String.raw`\tau = 8\ \text{с}`, ''], [String.raw`Q = 200\ \text{Дж}`, '']],
    find: String.raw`q \;—\; ?`,
    formulas: [JL, IQ],
    steps: [
      { title: 'Ток I = kt',
        tex: String.raw`Q = \frac13k^2R\tau^3\ \Rightarrow\ k = \sqrt{\frac{3Q}{R\tau^3}}` },
      { title: 'Заряд',
        tex: String.raw`q = \frac12k\tau^2 = \frac12\sqrt{\frac{3Q\tau}{R}} = \frac12\sqrt{\frac{3\cdot200\cdot8}{3}} = 20\ \text{Кл}` },
    ],
    answer: [String.raw`q = 20\ \text{Кл}`],
  },

  /* ===================== 19.35 ===================== */
  {
    id: '19.35', chapter: CH, section: S4, page: '297',
    title: 'Средняя сила тока',
    given: [[String.raw`R = 15\ \text{Ом}`, ''], [String.raw`\tau = 5\ \text{с}`, ''], [String.raw`Q = 10\ \text{кДж}`, String.raw`10^4\ \text{Дж}`]],
    find: String.raw`\langle I\rangle \;—\; ?`,
    formulas: [JL],
    steps: [
      { title: 'Максимальный ток',
        tex: String.raw`Q = \frac13I_{\max}^2R\tau\ \Rightarrow\ I_{\max} = \sqrt{\frac{3Q}{R\tau}} = \sqrt{\frac{3\cdot10^4}{75}} = 20\ \text{А}` },
      { title: 'Среднее для линейного роста',
        tex: String.raw`\langle I\rangle = \frac{I_{\max}}{2} = 10\ \text{А}` },
    ],
    answer: [String.raw`\langle I\rangle = 10\ \text{А}`],
  },

  /* ===================== 19.36 ===================== */
  {
    id: '19.36', chapter: CH, section: S4, page: '297',
    title: 'Скорость нарастания тока',
    given: [[String.raw`\tau = 10\ \text{с}`, ''], [String.raw`Q = 1\ \text{кДж}`, String.raw`10^3\ \text{Дж}`], [String.raw`R = 3\ \text{Ом}`, '']],
    find: String.raw`dI/dt \;—\; ?`,
    formulas: [JL],
    steps: [
      { title: 'Максимальный ток (как в 19.35)',
        tex: String.raw`I_{\max} = \sqrt{\frac{3Q}{R\tau}} = \sqrt{\frac{3000}{30}} = 10\ \text{А}` },
      { title: 'Скорость нарастания',
        tex: String.raw`\frac{dI}{dt} = \frac{I_{\max}}{\tau} = 1\ \text{А/с}` },
    ],
    answer: [String.raw`\frac{dI}{dt} = 1\ \text{А/с}`],
  }

  );
})();
