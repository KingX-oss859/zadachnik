/*
  § 30. Интерференция света — задачи 30.1–30.38 (стр. 401–405).
  Условия задач показываются дословно из книги (data/book-tasks.js).
  Ответы пересчитаны скриптом tools/check_interferentsiya.py и сверены с book/99-otvety.md.
  n стекла = 1,5; воды 1,33; глицерина 1,47.
*/
(function () {
  const CH = 'Гл. 6. Оптика';
  const S1 = 'Интерференция волн от двух когерентных источников';
  const S2 = 'Интерференция света в тонких плёнках';
  const S3 = 'Интерференционные приборы';
  const MISMATCH = '<b>Расхождение с ответом книги.</b> ';
  const TYPO = '<b>Опечатка в ответе книги.</b> ';

  const OPT = { tex: String.raw`L = nl,\quad \Delta = L_1 - L_2,\quad \Delta\varphi = \frac{2\pi\Delta}{\lambda}`, text: 'оптическая длина пути, разность хода и разность фаз' };
  const MAXMIN = { tex: String.raw`\Delta = k\lambda\ (\max),\quad \Delta = (2k + 1)\frac\lambda2\ (\min)`, text: 'условия максимума и минимума' };
  const YOUNG = { tex: String.raw`b = \frac{l\lambda}{d}`, text: 'ширина полосы от двух когерентных источников (d — расстояние между ними, l — до экрана)' };
  const FILM = { tex: String.raw`\Delta = 2d\sqrt{n^2 - \sin^2\varepsilon_1} + \frac\lambda2`, text: 'тонкая плёнка в воздухе, отражённый свет' };
  const WEDGE = { tex: String.raw`b = \frac{\lambda}{2n\theta}`, text: 'ширина полосы на клине (θ мал)' };
  const NEWTON = { tex: String.raw`r_k^\text{светл} = \sqrt{(2k - 1)R\frac\lambda2},\quad r_k^\text{тёмн} = \sqrt{kR\lambda}`, text: 'кольца Ньютона в отражённом свете (в проходящем — наоборот)' };
  const SHIFT = { tex: String.raw`m\lambda = \Delta L`, text: 'картина смещается на m полос при изменении разности хода на mλ' };

  window.TASKS.push(

  /* ===================== 30.1 ===================== */
  {
    id: '30.1', chapter: CH, section: S1, page: '401',
    title: 'Число длин волн на 1,2 мм',
    given: [[String.raw`\nu = 5\cdot10^{14}\ \text{Гц}`, String.raw`\lambda_0 = c/\nu = 0{,}6\ \text{мкм}`], [String.raw`l = 1{,}2\ \text{мм}`, ''], [String.raw`n = 1{,}5`, '']],
    find: String.raw`N_1,\ N_2 \;—\; ?`,
    formulas: [OPT],
    steps: [
      { title: '1) Вакуум', tex: String.raw`N_1 = \frac{l}{\lambda_0} = \frac{1{,}2\cdot10^{-3}}{6\cdot10^{-7}} = 2\cdot10^3` },
      { title: '2) Стекло (λ = λ₀/n)', tex: String.raw`N_2 = nN_1 = 3\cdot10^3` },
    ],
    answer: [String.raw`1)\ 2\cdot10^3;\quad 2)\ 3\cdot10^3`],
  },

  /* ===================== 30.2 ===================== */
  {
    id: '30.2', chapter: CH, section: S1, page: '401',
    title: 'Отрезок с тем же числом волн',
    given: [[String.raw`l_2 = 3\ \text{мм}`, ''], [String.raw`n = 1{,}33`, '']],
    find: String.raw`l_1 \;—\; ?`,
    formulas: [OPT],
    steps: [{ title: 'Равные оптические длины', tex: String.raw`l_1 = nl_2 = 1{,}33\cdot3 = 4\ \text{мм}` }],
    answer: [String.raw`l_1 = 4\ \text{мм}`],
  },

  /* ===================== 30.3 ===================== */
  {
    id: '30.3', chapter: CH, section: S1, page: '401',
    title: 'Путь в вакууме за то же время',
    given: [[String.raw`l_2 = 1\ \text{м}`, ''], [String.raw`n = 1{,}33`, '']],
    find: String.raw`l_1 \;—\; ?`,
    formulas: [OPT],
    steps: [{ title: 'v = c/n', tex: String.raw`l_1 = c\frac{l_2}{c/n} = nl_2 = 1{,}33\ \text{м}` }],
    answer: [String.raw`l_1 = 1{,}33\ \text{м}`],
    note: TYPO + 'В книге «1,33 мм» — должно быть 1,33 м.',
  },

  /* ===================== 30.4 ===================== */
  {
    id: '30.4', chapter: CH, section: S1, page: '401',
    title: 'Пластина на пути волны',
    given: [[String.raw`h = 1\ \text{мм}`, ''], [String.raw`\varepsilon = 30^\circ`, ''], [String.raw`n = 1{,}5`, '']],
    find: String.raw`\Delta L \;—\; ?`,
    formulas: [OPT],
    steps: [
      { title: '1) Нормальное падение', tex: String.raw`\Delta L = (n - 1)h = 0{,}50\ \text{мм}` },
      { title: '2) Наклонное', text: 'Сравниваем оптические пути до одной и той же волновой поверхности за пластиной.', tex: String.raw`\Delta L = h\left(\sqrt{n^2 - \sin^2\varepsilon} - \cos\varepsilon\right) = 1\cdot(1{,}414 - 0{,}866) = 0{,}548\ \text{мм}` },
    ],
    answer: [String.raw`\text{увеличится: }1)\ 0{,}50\ \text{мм};\quad 2)\ 0{,}548\ \text{мм}`],
  },

  /* ===================== 30.5 ===================== */
  {
    id: '30.5', chapter: CH, section: S1, page: '401',
    title: 'Поворот пластины на λ/2',
    given: [[String.raw`\lambda = 0{,}6\ \text{мкм}`, ''], [String.raw`d = 0{,}1\ \text{мм}`, String.raw`10^{-4}\ \text{м}`], [String.raw`n = 1{,}5`, '']],
    find: String.raw`\varphi \;—\; ?`,
    formulas: [OPT],
    steps: [
      { title: 'Добавка к оптическому пути (из 30.4)', tex: String.raw`\delta L = d\left(\sqrt{n^2 - \sin^2\varphi} - \cos\varphi\right) - d(n - 1) \approx \frac{d\varphi^2(n - 1)}{2n}` },
      { title: 'Условие δL = λ/2', tex: String.raw`\varphi = \sqrt{\frac{n\lambda}{d(n - 1)}} = \sqrt{\frac{1{,}5\cdot6\cdot10^{-7}}{10^{-4}\cdot0{,}5}} = 0{,}134\ \text{рад} = 7{,}7^\circ` },
    ],
    answer: [String.raw`\varphi = 0{,}134\ \text{рад} \approx 7{,}7^\circ`],
    note: MISMATCH + 'В книге φ = √(nλ/(2d(n − 1))) = 30 мрад = 1,72°. Ни формула, ни число не подтверждаются. Разложение до φ² даёт φ = √(nλ/(d(n − 1))) = 134 мрад, и точный численный расчёт даёт то же. Даже по формуле книги вышло бы 95 мрад, а не 30.',
  },

  /* ===================== 30.6 ===================== */
  {
    id: '30.6', chapter: CH, section: S1, page: '401',
    title: 'Разность хода двух пучков в призме',
    given: [[String.raw`\theta = 30^\circ`, ''], [String.raw`a = 2\ \text{см}`, ''], [String.raw`n = 1{,}5`, '']],
    find: String.raw`\Delta \;—\; ?`,
    formulas: [OPT],
    steps: [
      { title: 'Пути в стекле', text: 'Пучки входят нормально в вертикальную грань. До наклонной грани пучок II проходит в стекле на a·tg θ больше, чем пучок I (рис. 30.6).', tex: String.raw`\Delta l = a\operatorname{tg}\theta = 2\cdot0{,}577 = 1{,}155\ \text{см}` },
      { title: 'Оптическая разность хода', tex: String.raw`\Delta = n\,a\operatorname{tg}\theta = 1{,}5\cdot1{,}155 = 1{,}73\ \text{см}` },
      { title: 'Замечание', text: 'Это разность оптических путей до выходной грани. Если сравнивать пути до общей волновой поверхности за призмой, они равны: по теореме Малюса (таутохронизм) разность равна нулю.' },
    ],
    answer: [String.raw`\Delta = na\operatorname{tg}\theta = 1{,}73\ \text{см}`],
  },

  /* ===================== 30.7 ===================== */
  {
    id: '30.7', chapter: CH, section: S1, page: '401',
    title: 'Разность фаз',
    given: [[String.raw`\Delta = 0{,}3\lambda`, '']],
    find: String.raw`\Delta\varphi \;—\; ?`,
    formulas: [OPT],
    steps: [{ title: 'Фаза', tex: String.raw`\Delta\varphi = 2\pi\cdot0{,}3 = 0{,}6\pi` }],
    answer: [String.raw`\Delta\varphi = 0{,}6\pi`],
  },

  /* ===================== 30.8 ===================== */
  {
    id: '30.8', chapter: CH, section: S1, page: '401',
    title: 'Какие цвета усилены и ослаблены',
    given: [[String.raw`\Delta = 1{,}8\ \text{мкм}`, ''], [String.raw`0{,}38 \le \lambda \le 0{,}76\ \text{мкм}`, '']],
    find: String.raw`\lambda_{\max},\ \lambda_{\min} \;—\; ?`,
    formulas: [MAXMIN],
    steps: [
      { title: '1) Максимумы λ = Δ/k', tex: String.raw`k = 3:\ 0{,}6;\quad k = 4:\ 0{,}45\ \text{мкм}` },
      { title: '2) Минимумы λ = 2Δ/(2k + 1)', tex: String.raw`2k + 1 = 5:\ 0{,}72;\quad 7:\ 0{,}51;\quad 9:\ 0{,}4\ \text{мкм}` },
    ],
    answer: [String.raw`1)\ 0{,}6;\ 0{,}45\ \text{мкм};\quad 2)\ 0{,}72;\ 0{,}51;\ 0{,}4\ \text{мкм}`],
  },

  /* ===================== 30.9 ===================== */
  {
    id: '30.9', chapter: CH, section: S1, page: '402',
    title: 'Расстояние до экрана',
    given: [[String.raw`\lambda = 0{,}5\ \text{мкм}`, ''], [String.raw`d = 0{,}1\ \text{мм}`, ''], [String.raw`b = 1\ \text{см}`, '']],
    find: String.raw`l \;—\; ?`,
    formulas: [YOUNG],
    steps: [{ title: 'Расстояние', tex: String.raw`l = \frac{bd}{\lambda} = \frac{10^{-2}\cdot10^{-4}}{5\cdot10^{-7}} = 2\ \text{м}` }],
    answer: [String.raw`l = 2\ \text{м}`],
  },

  /* ===================== 30.10 ===================== */
  {
    id: '30.10', chapter: CH, section: S1, page: '402',
    title: 'Длина волны в опыте Юнга',
    given: [[String.raw`d = 1\ \text{мм},\ l = 3\ \text{м}`, ''], [String.raw`b = 1{,}5\ \text{мм}`, '']],
    find: String.raw`\lambda \;—\; ?`,
    formulas: [YOUNG],
    steps: [{ title: 'Длина волны', tex: String.raw`\lambda = \frac{bd}{l} = \frac{1{,}5\cdot10^{-3}\cdot10^{-3}}{3} = 0{,}5\ \text{мкм}` }],
    answer: [String.raw`\lambda = 0{,}5\ \text{мкм}`],
  },

  /* ===================== 30.11 ===================== */
  {
    id: '30.11', chapter: CH, section: S1, page: '402',
    title: 'Куда поставить экран',
    given: [[String.raw`d = 0{,}8\ \text{мм},\ \lambda = 640\ \text{нм}`, ''], [String.raw`b = 2\ \text{мм}`, '']],
    find: String.raw`l \;—\; ?`,
    formulas: [YOUNG],
    steps: [{ title: 'Расстояние', tex: String.raw`l = \frac{db}{\lambda} = \frac{0{,}8\cdot10^{-3}\cdot2\cdot10^{-3}}{6{,}4\cdot10^{-7}} = 2{,}5\ \text{м}` }],
    answer: [String.raw`l = 2{,}5\ \text{м}`],
  },

  /* ===================== 30.12 ===================== */
  {
    id: '30.12', chapter: CH, section: S1, page: '402',
    title: 'Зеркала Френеля',
    given: [[String.raw`d = 0{,}5\ \text{мм},\ l = 3\ \text{м}`, ''], [String.raw`\lambda = 0{,}6\ \text{мкм}`, '']],
    find: String.raw`b \;—\; ?`,
    formulas: [YOUNG],
    steps: [{ title: 'Ширина полосы', tex: String.raw`b = \frac{3\cdot6\cdot10^{-7}}{5\cdot10^{-4}} = 3{,}6\cdot10^{-3}\ \text{м}` }],
    answer: [String.raw`b = 3{,}6\ \text{мм}`],
  },

  /* ===================== 30.13 ===================== */
  {
    id: '30.13', chapter: CH, section: S1, page: '402',
    title: 'Зеркало Ллойда: свет или темнота?',
    given: [[String.raw`\lambda = 0{,}6\ \text{мкм}`, ''], [String.raw`r = 2\ \text{м}`, ''], [String.raw`a = 0{,}55\ \text{мм}`, ''], [String.raw`|SM| = |MP|`, '']],
    find: String.raw`\text{свет или темнота в }P`,
    formulas: [OPT, MAXMIN],
    steps: [
      { title: 'Геометрическая разность хода', text: 'S и P находятся на высоте a над зеркалом, M — посередине.', tex: String.raw`\Delta_\text{геом} = 2\sqrt{\frac{r^2}4 + a^2} - r \approx \frac{2a^2}{r} = \frac{2\cdot3{,}03\cdot10^{-7}}{2} = 0{,}30\ \text{мкм} = \frac\lambda2` },
      { title: 'Потеря полуволны при отражении', tex: String.raw`\Delta = \Delta_\text{геом} + \frac\lambda2 = \lambda` },
      { title: 'Вывод', text: 'Разность хода — целое число длин волн: в P максимум, светло.' },
    ],
    answer: [String.raw`\text{свет (максимум)}:\ \Delta_\text{геом} = \lambda/2,\ \Delta = \lambda`],
    note: MISMATCH + 'В книге «темнота; Δ_геом = λ». Но при a = 0,55 мм и r = 2 м Δ_геом = 2a²/r = 0,30 мкм = λ/2, и с учётом потери полуволны Δ = λ — светло. Δ_геом = λ вышло бы при 4a²/r, то есть если считать a половиной высоты источника над зеркалом.',
  },

  /* ===================== 30.14 ===================== */
  {
    id: '30.14', chapter: CH, section: S2, page: '402',
    title: 'Зеркало Ллойда сместили',
    given: [[String.raw`b = 1\ \text{мм}`, ''], [String.raw`\Delta d = 0{,}3\ \text{мм}`, ''], [String.raw`\lambda = 0{,}6\ \text{мкм}`, '']],
    find: String.raw`\Delta l \;—\; ?`,
    formulas: [YOUNG],
    steps: [
      { title: 'Источник и его изображение', text: 'Расстояние между S и его изображением меняется на 2Δd.', tex: String.raw`b = \frac{l\lambda}{d}\ \Rightarrow\ \frac{l}{d} = \frac b\lambda = \text{const}` },
      { title: 'Смещение экрана', tex: String.raw`\Delta l = \frac{b}{\lambda}\cdot2\Delta d = \frac{10^{-3}\cdot6\cdot10^{-4}}{6\cdot10^{-7}} = 1\ \text{м}` },
    ],
    answer: [String.raw`\Delta l = 1\ \text{м}\ (\text{отодвинуть, если зеркало отошло от источника})`],
  },

  /* ===================== 30.15 ===================== */
  {
    id: '30.15', chapter: CH, section: S2, page: '402–403',
    title: 'Пластинка между двумя средами',
    given: [[String.raw`d = 1{,}2\ \text{мкм},\ n = 1{,}5`, ''], [String.raw`\lambda = 0{,}6\ \text{мкм}`, '']],
    find: String.raw`\Delta;\ \text{усиление или ослабление}`,
    formulas: [OPT, MAXMIN],
    steps: [
      { title: 'Разность хода без потерь', tex: String.raw`2dn = 2\cdot1{,}2\cdot1{,}5 = 3{,}6\ \text{мкм} = 6\lambda` },
      { title: '1), 2) Полуволна теряется на обеих поверхностях или ни на одной', tex: String.raw`\Delta = 3{,}6\ \text{мкм} = 6\lambda\ \Rightarrow\ \text{усиление}` },
      { title: '3), 4) Полуволна теряется на одной поверхности', tex: String.raw`\Delta = 3{,}6 + 0{,}3 = 3{,}9\ \text{мкм} = 6{,}5\lambda\ \Rightarrow\ \text{ослабление}` },
    ],
    answer: [String.raw`1),\ 2)\ \Delta = 3{,}6\ \text{мкм},\ \text{усиление};\quad 3),\ 4)\ \Delta = 3{,}9\ \text{мкм},\ \text{ослабление}`],
    note: MISMATCH + 'В книге Δ = 4,8 и 5,1 мкм — так получилось бы при d = 1,6 мкм. При d = 1,2 мкм выходит 3,6 и 3,9 мкм. Выводы об усилении и ослаблении от этого не меняются.',
  },

  /* ===================== 30.16 ===================== */
  {
    id: '30.16', chapter: CH, section: S2, page: '403',
    title: 'Мыльная плёнка: наименьшая толщина для усиления',
    given: [[String.raw`n = 1{,}3`, ''], [String.raw`\lambda = 0{,}55\ \text{мкм}`, '']],
    find: String.raw`d_{\min} \;—\; ?`,
    formulas: [FILM, MAXMIN],
    steps: [{ title: '2dn + λ/2 = λ', tex: String.raw`d = \frac{\lambda}{4n} = \frac{0{,}55}{5{,}2} = 0{,}106\ \text{мкм}` }],
    answer: [String.raw`d_{\min} \approx 0{,}1\ \text{мкм}`],
  },

  /* ===================== 30.17 ===================== */
  {
    id: '30.17', chapter: CH, section: S2, page: '403',
    title: 'Мыльная плёнка при наклонном падении',
    given: [[String.raw`\lambda = 0{,}6\ \text{мкм}`, ''], [String.raw`\varepsilon_1 = 30^\circ,\ n = 1{,}3`, '']],
    find: String.raw`d_\text{осл},\ d_\text{усил} \;—\; ?`,
    formulas: [FILM, MAXMIN],
    steps: [
      { title: 'Корень', tex: String.raw`\sqrt{n^2 - \sin^2\varepsilon_1} = \sqrt{1{,}69 - 0{,}25} = 1{,}2` },
      { title: 'Ослабление (наименьшая ненулевая толщина): 2d·1,2 = λ', tex: String.raw`d = \frac{0{,}6}{2{,}4} = 0{,}25\ \text{мкм}` },
      { title: 'Усиление: 2d·1,2 = λ/2', tex: String.raw`d = \frac{0{,}6}{4{,}8} = 0{,}125\ \text{мкм}` },
    ],
    answer: [String.raw`d_\text{осл} = 0{,}25\ \text{мкм};\quad d_\text{усил} = 0{,}125\ \text{мкм}`],
  },

  /* ===================== 30.18 ===================== */
  {
    id: '30.18', chapter: CH, section: S2, page: '403',
    title: 'Длина волны по полосам на клине',
    given: [[String.raw`n = 1{,}55`, ''], [String.raw`\alpha = 2'`, String.raw`5{,}82\cdot10^{-4}\ \text{рад}`], [String.raw`b = 0{,}3\ \text{мм}`, '']],
    find: String.raw`\lambda \;—\; ?`,
    formulas: [WEDGE],
    steps: [{ title: 'Длина волны', tex: String.raw`\lambda = 2n\alpha b = 2\cdot1{,}55\cdot5{,}82\cdot10^{-4}\cdot3\cdot10^{-4} = 5{,}41\cdot10^{-7}\ \text{м}` }],
    answer: [String.raw`\lambda = 541\ \text{нм}`],
  },

  /* ===================== 30.19 ===================== */
  {
    id: '30.19', chapter: CH, section: S2, page: '403',
    title: 'Ширина полосы на клине',
    given: [[String.raw`\theta = 0{,}2'`, String.raw`5{,}82\cdot10^{-5}\ \text{рад}`], [String.raw`\lambda = 0{,}55\ \text{мкм}`, ''], [String.raw`n = 1{,}5`, '']],
    find: String.raw`b \;—\; ?`,
    formulas: [WEDGE],
    steps: [{ title: 'Ширина', tex: String.raw`b = \frac{5{,}5\cdot10^{-7}}{2\cdot1{,}5\cdot5{,}82\cdot10^{-5}} = 3{,}15\cdot10^{-3}\ \text{м}` }],
    answer: [String.raw`b = 3{,}15\ \text{мм}`],
  },

  /* ===================== 30.20 ===================== */
  {
    id: '30.20', chapter: CH, section: S2, page: '403',
    title: 'Угол клина по расстоянию между минимумами',
    given: [[String.raw`\lambda = 600\ \text{нм}`, ''], [String.raw`b = 4\ \text{мм}`, ''], [String.raw`n = 1{,}5`, '']],
    find: String.raw`\theta \;—\; ?`,
    formulas: [WEDGE],
    steps: [{ title: 'Угол', tex: String.raw`\theta = \frac{\lambda}{2nb} = \frac{6\cdot10^{-7}}{2\cdot1{,}5\cdot4\cdot10^{-3}} = 5\cdot10^{-5}\ \text{рад} = 10{,}3''` }],
    answer: [String.raw`\theta = 10{,}3''`],
  },

  /* ===================== 30.21 ===================== */
  {
    id: '30.21', chapter: CH, section: S2, page: '403',
    title: 'Диаметр проволочки',
    given: [[String.raw`l = 75\ \text{мм}`, ''], [String.raw`\lambda = 0{,}5\ \text{мкм}`, ''], [String.raw`a = 30\ \text{мм},\ m = 16`, '']],
    find: String.raw`d \;—\; ?`,
    formulas: [WEDGE],
    steps: [
      { title: 'Воздушный клин (n = 1), θ = d/l', tex: String.raw`b = \frac am = 1{,}875\ \text{мм} = \frac{\lambda l}{2d}` },
      { title: 'Диаметр', tex: String.raw`d = \frac{\lambda lm}{2a} = \frac{5\cdot10^{-7}\cdot0{,}075\cdot16}{0{,}06} = 10^{-5}\ \text{м}` },
    ],
    answer: [String.raw`d = 10\ \text{мкм}`],
  },

  /* ===================== 30.22 ===================== */
  {
    id: '30.22', chapter: CH, section: S2, page: '403',
    title: 'Первые светлые полосы воздушного клина',
    given: [[String.raw`\theta = 30''`, String.raw`1{,}454\cdot10^{-4}\ \text{рад}`], [String.raw`\lambda = 0{,}6\ \text{мкм}`, '']],
    find: String.raw`l_1,\ l_2 \;—\; ?`,
    formulas: [MAXMIN],
    steps: [
      { title: 'Условие максимума (n = 1, потеря λ/2)', tex: String.raw`2\theta l + \frac\lambda2 = k\lambda\ \Rightarrow\ l_k = \frac{(2k - 1)\lambda}{4\theta}` },
      { title: 'k = 1 и k = 2', tex: String.raw`l_1 = \frac{6\cdot10^{-7}}{4\cdot1{,}454\cdot10^{-4}} = 1{,}03\ \text{мм},\quad l_2 = 3l_1 = 3{,}09\ \text{мм}` },
    ],
    answer: [String.raw`l_1 = 1{,}03\ \text{мм};\quad l_2 = 3{,}09\ \text{мм}`],
    note: MISMATCH + 'В книге 3,1 и 5,2 мм — это вторая и третья светлые полосы (k = 2, 3). Первая светлая полоса лежит на 1,03 мм от линии соприкосновения: у самой линии тёмная полоса, а первый максимум там, где толщина клина λ/4.',
  },

  /* ===================== 30.23 ===================== */
  {
    id: '30.23', chapter: CH, section: S2, page: '403–404',
    title: 'Глицериновый клин: полосы на 1 см',
    given: [[String.raw`\theta = 30''`, String.raw`1{,}454\cdot10^{-4}\ \text{рад}`], [String.raw`\lambda = 500\ \text{нм}`, ''], [String.raw`n = 1{,}47`, '']],
    find: String.raw`N \;—\; ?`,
    formulas: [WEDGE],
    steps: [{ title: 'N = 1/b', tex: String.raw`N = \frac{2n\theta}{\lambda} = \frac{2\cdot1{,}47\cdot1{,}454\cdot10^{-4}}{5\cdot10^{-7}} = 855\ \text{м}^{-1}` }],
    answer: [String.raw`N = 8{,}55\ \text{см}^{-1}`],
  },

  /* ===================== 30.24 ===================== */
  {
    id: '30.24', chapter: CH, section: S2, page: '404',
    title: 'Расстояние между 10-м и 9-м кольцами',
    given: [[String.raw`\Delta r_{2,1} = 1\ \text{мм}`, '']],
    find: String.raw`\Delta r_{10,9} \;—\; ?`,
    formulas: [NEWTON],
    steps: [{ title: 'Тёмные кольца r = √k·√(Rλ)', tex: String.raw`\Delta r_{10,9} = \Delta r_{2,1}\frac{\sqrt{10} - 3}{\sqrt2 - 1} = 1\cdot\frac{0{,}162}{0{,}414} = 0{,}39\ \text{мм}` }],
    answer: [String.raw`\Delta r_{10,9} = 0{,}39\ \text{мм}`],
  },

  /* ===================== 30.25 ===================== */
  {
    id: '30.25', chapter: CH, section: S2, page: '404',
    title: 'Толщина воздуха у первого светлого кольца',
    given: [[String.raw`\lambda = 0{,}6\ \text{мкм}`, '']],
    find: String.raw`d \;—\; ?`,
    formulas: [MAXMIN],
    steps: [{ title: '2d + λ/2 = λ', tex: String.raw`d = \frac\lambda4 = 0{,}15\ \text{мкм}` }],
    answer: [String.raw`d = 0{,}15\ \text{мкм}`],
  },

  /* ===================== 30.26 ===================== */
  {
    id: '30.26', chapter: CH, section: S2, page: '404',
    title: 'Оптическая сила линзы по кольцу Ньютона',
    given: [[String.raw`\lambda = 0{,}6\ \text{мкм}`, ''], [String.raw`d_2 = 1{,}2\ \text{мм}`, String.raw`r_2 = 0{,}6\ \text{мм}`], [String.raw`n = 1{,}5`, '']],
    find: String.raw`D \;—\; ?`,
    formulas: [NEWTON],
    steps: [
      { title: 'Радиус кривизны (светлое, k = 2)', tex: String.raw`R = \frac{2r_2^2}{3\lambda} = \frac{2\cdot3{,}6\cdot10^{-7}}{1{,}8\cdot10^{-6}} = 0{,}4\ \text{м}` },
      { title: 'Оптическая сила плосковыпуклой линзы', tex: String.raw`D = \frac{n - 1}{R} = \frac{0{,}5}{0{,}4} = 1{,}25\ \text{дптр}` },
    ],
    answer: [String.raw`D = 1{,}25\ \text{дптр}`],
  },

  /* ===================== 30.27 ===================== */
  {
    id: '30.27', chapter: CH, section: S2, page: '404',
    title: 'Длина волны по тёмному кольцу в проходящем свете',
    given: [[String.raw`D = 2\ \text{дптр}`, String.raw`R = (n - 1)/D = 0{,}25\ \text{м}`], [String.raw`r_4 = 0{,}7\ \text{мм}`, '']],
    find: String.raw`\lambda \;—\; ?`,
    formulas: [NEWTON],
    steps: [
      { title: 'Тёмные в проходящем = светлые в отражённом', tex: String.raw`r_k = \sqrt{(2k - 1)R\frac\lambda2}` },
      { title: 'Длина волны (k = 4)', tex: String.raw`\lambda = \frac{2r_4^2}{7R} = \frac{2\cdot4{,}9\cdot10^{-7}}{7\cdot0{,}25} = 5{,}6\cdot10^{-7}\ \text{м}` },
    ],
    answer: [String.raw`\lambda = 560\ \text{нм}`],
    note: MISMATCH + 'В книге 490 нм — подставлена формула тёмных колец отражённого света r = √(kRλ). Но в проходящем свете тёмные кольца совпадают со светлыми кольцами отражённого (так сказано в основных формулах параграфа), поэтому λ = 560 нм.',
  },

  /* ===================== 30.28 ===================== */
  {
    id: '30.28', chapter: CH, section: S2, page: '404',
    title: 'Радиус линзы по двум кольцам',
    given: [[String.raw`d_i = 4{,}0\ \text{мм},\ d_k = 4{,}8\ \text{мм}`, ''], [String.raw`k = i + 4`, ''], [String.raw`\lambda = 500\ \text{нм}`, '']],
    find: String.raw`R \;—\; ?`,
    formulas: [NEWTON],
    steps: [{ title: 'Разность квадратов (неизвестный номер сокращается)', tex: String.raw`r_k^2 - r_i^2 = 4R\lambda\ \Rightarrow\ R = \frac{(2{,}4^2 - 2^2)\cdot10^{-6}}{4\cdot5\cdot10^{-7}} = 0{,}88\ \text{м}` }],
    answer: [String.raw`R = 880\ \text{мм}`],
  },

  /* ===================== 30.29 ===================== */
  {
    id: '30.29', chapter: CH, section: S2, page: '404',
    title: 'Показатель преломления жидкости в зазоре',
    given: [[String.raw`r_8 = 2\ \text{мм}`, ''], [String.raw`\lambda = 700\ \text{нм}`, ''], [String.raw`R = 1\ \text{м}`, '']],
    find: String.raw`n \;—\; ?`,
    formulas: [NEWTON],
    steps: [{ title: 'Тёмные кольца с жидкостью: r² = kRλ/n', tex: String.raw`n = \frac{kR\lambda}{r_8^2} = \frac{8\cdot1\cdot7\cdot10^{-7}}{4\cdot10^{-6}} = 1{,}4` }],
    answer: [String.raw`n = 1{,}4`],
  },

  /* ===================== 30.30 ===================== */
  {
    id: '30.30', chapter: CH, section: S2, page: '404',
    title: 'Кольцо сместилось на номер',
    given: [[String.raw`k = 3 \to k + 1 = 4`, '']],
    find: String.raw`n \;—\; ?`,
    formulas: [NEWTON],
    steps: [{ title: 'Тот же радиус', tex: String.raw`kR\lambda = \frac{(k + 1)R\lambda}{n}\ \Rightarrow\ n = \frac{k + 1}{k} = \frac43 = 1{,}33` }],
    answer: [String.raw`n = (k + 1)/k = 1{,}33`],
  },

  /* ===================== 30.31 ===================== */
  {
    id: '30.31', chapter: CH, section: S2, page: '404',
    title: 'Выпуклая линза на вогнутой',
    given: [[String.raw`\lambda = 0{,}5\ \text{мкм}`, ''], [String.raw`R_1 = 1\ \text{м},\ R_2 = 2\ \text{м}`, '']],
    find: String.raw`r_3 \;—\; ?`,
    formulas: [NEWTON],
    steps: [
      { title: 'Толщина зазора', tex: String.raw`d = \frac{r^2}{2R_1} - \frac{r^2}{2R_2}` },
      { title: 'Тёмное кольцо: 2d = kλ', tex: String.raw`r_k = \sqrt{\frac{k\lambda R_1R_2}{R_2 - R_1}} = \sqrt{3\cdot5\cdot10^{-7}\cdot2} = 1{,}73\cdot10^{-3}\ \text{м}` },
    ],
    answer: [String.raw`r_3 = 1{,}73\ \text{мм}`],
  },

  /* ===================== 30.32 ===================== */
  {
    id: '30.32', chapter: CH, section: S2, page: '404–405',
    title: 'Две плосковыпуклые линзы',
    given: [[String.raw`R = 1\ \text{м}`, ''], [String.raw`\lambda = 660\ \text{нм}`, '']],
    find: String.raw`r_2 \;—\; ?`,
    formulas: [NEWTON],
    steps: [
      { title: 'Зазор от двух поверхностей', tex: String.raw`d = 2\cdot\frac{r^2}{2R} = \frac{r^2}{R}` },
      { title: 'Светлое кольцо: 2d + λ/2 = kλ', tex: String.raw`r_k = \sqrt{(2k - 1)\frac{R\lambda}{4}}\ \Rightarrow\ r_2 = \sqrt{3\cdot\frac{6{,}6\cdot10^{-7}}{4}} = 7{,}04\cdot10^{-4}\ \text{м}` },
    ],
    answer: [String.raw`r_2 = 0{,}704\ \text{мм}`],
  },

  /* ===================== 30.33 ===================== */
  {
    id: '30.33', chapter: CH, section: S3, page: '405',
    title: 'Толщина кварцевой пластинки',
    given: [[String.raw`\lambda = 480\ \text{нм}`, ''], [String.raw`n = 1{,}46`, ''], [String.raw`m = 69`, '']],
    find: String.raw`d \;—\; ?`,
    formulas: [SHIFT],
    steps: [{ title: 'ΔL = (n − 1)d', tex: String.raw`d = \frac{m\lambda}{n - 1} = \frac{69\cdot4{,}8\cdot10^{-7}}{0{,}46} = 7{,}2\cdot10^{-5}\ \text{м}` }],
    answer: [String.raw`d = 72\ \text{мкм}`],
  },

  /* ===================== 30.34 ===================== */
  {
    id: '30.34', chapter: CH, section: S3, page: '405',
    title: 'Показатель преломления водорода',
    given: [[String.raw`l = 10\ \text{см}`, ''], [String.raw`m = 23{,}7`, ''], [String.raw`\lambda = 590\ \text{нм}`, '']],
    find: String.raw`n \;—\; ?`,
    formulas: [SHIFT],
    steps: [{ title: 'ΔL = (n − 1)l', tex: String.raw`n = 1 + \frac{m\lambda}{l} = 1 + \frac{23{,}7\cdot5{,}9\cdot10^{-7}}{0{,}1} = 1{,}00014` }],
    answer: [String.raw`n = 1{,}00014`],
  },

  /* ===================== 30.35 ===================== */
  {
    id: '30.35', chapter: CH, section: S3, page: '405',
    title: 'Показатель преломления ацетилена',
    given: [[String.raw`l = 15\ \text{см}`, ''], [String.raw`n_1 = 1{,}000292`, ''], [String.raw`m = 80,\ \lambda = 0{,}590\ \text{мкм}`, '']],
    find: String.raw`n_2 \;—\; ?`,
    formulas: [SHIFT],
    steps: [{ title: 'ΔL = (n₂ − n₁)l', tex: String.raw`n_2 = n_1 + \frac{m\lambda}{l} = 1{,}000292 + \frac{80\cdot5{,}9\cdot10^{-7}}{0{,}15} = 1{,}000607` }],
    answer: [String.raw`n_2 = 1{,}000607`],
  },

  /* ===================== 30.36 ===================== */
  {
    id: '30.36', chapter: CH, section: S3, page: '405',
    title: 'Перемещение зеркала Майкельсона',
    given: [[String.raw`m = 100`, ''], [String.raw`\lambda = 546\ \text{нм}`, '']],
    find: String.raw`x \;—\; ?`,
    formulas: [SHIFT],
    steps: [{ title: 'Свет проходит плечо дважды: ΔL = 2x', tex: String.raw`x = \frac{m\lambda}{2} = \frac{100\cdot546}{2}\ \text{нм} = 27{,}3\ \text{мкм}` }],
    answer: [String.raw`x = 27{,}3\ \text{мкм}`],
  },

  /* ===================== 30.37 ===================== */
  {
    id: '30.37', chapter: CH, section: S3, page: '405',
    title: 'Показатель преломления аргона',
    given: [[String.raw`l = 12\ \text{см}`, ''], [String.raw`m = 106`, ''], [String.raw`\lambda = 639\ \text{нм}`, '']],
    find: String.raw`n \;—\; ?`,
    formulas: [SHIFT],
    steps: [{ title: 'Трубка проходится дважды: ΔL = 2(n − 1)l', tex: String.raw`n = 1 + \frac{m\lambda}{2l} = 1 + \frac{106\cdot6{,}39\cdot10^{-7}}{0{,}24} = 1{,}000282` }],
    answer: [String.raw`n = 1{,}000282`],
  },

  /* ===================== 30.38 ===================== */
  {
    id: '30.38', chapter: CH, section: S3, page: '405',
    title: 'Бромистый и хлористый водород',
    given: [[String.raw`\lambda = 590\ \text{нм}`, ''], [String.raw`l = 10\ \text{см}`, ''], [String.raw`\Delta m = 42`, '']],
    find: String.raw`\Delta n \;—\; ?`,
    formulas: [SHIFT],
    steps: [{ title: 'Двойной проход', tex: String.raw`\Delta n = \frac{\Delta m\lambda}{2l} = \frac{42\cdot5{,}9\cdot10^{-7}}{0{,}2} = 1{,}24\cdot10^{-4}` }],
    answer: [String.raw`\Delta n = 0{,}000124`],
  }

  );
})();
