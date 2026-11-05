/*
  § 28. Геометрическая оптика — задачи 28.1–28.52 (стр. 384–389).
  Условия задач показываются дословно из книги (data/book-tasks.js).
  Ответы пересчитаны скриптом tools/check_geom_optika.py и сверены с book/99-otvety.md.
  Задачи на построение (28.2, 28.5, 28.8, 28.20–28.23) решены словами — по шагам построения на рисунке книги.
  n стекла = 1,50; воды 1,33; коричного масла 1,60 (табл. 19); D = 25 см — расстояние наилучшего зрения.
*/
(function () {
  const CH = 'Гл. 6. Оптика';
  const S1 = 'Отражение и преломление света';
  const S2 = 'Оптические системы';
  const MISMATCH = '<b>Расхождение с ответом книги.</b> ';
  const SMALL = '<b>Расхождение в последней цифре.</b> ';
  const BUILD = '<b>Задача на построение.</b> Ответа в книге нет — выполните построение на рисунке по шагам решения.';
  const PROOF = '<b>Задача на доказательство.</b> Ответа в книге нет.';

  const MIR = { tex: String.raw`\frac1f = \frac1a + \frac1b,\quad f = \frac R2,\quad \Gamma = \frac ba`, text: 'формула сферического зеркала (мнимое изображение: b < 0; выпуклое зеркало: f < 0)' };
  const SNELL = { tex: String.raw`\frac{\sin\varepsilon_1}{\sin\varepsilon_2'} = \frac{n_2}{n_1}`, text: 'закон преломления' };
  const PRISM = { tex: String.raw`n = \frac{\sin\frac{\theta + \sigma_{\min}}{2}}{\sin\frac\theta2}`, text: 'призма при симметричном ходе луча (наименьшее отклонение)' };
  const LENS = { tex: String.raw`\frac1f = \frac1a + \frac1b,\quad D = \frac1f = \left(\frac{n_\text{л}}{n_\text{ср}} - 1\right)\left(\frac1{R_1} + \frac1{R_2}\right)`, text: 'формула тонкой линзы; выпуклые поверхности R > 0, вогнутые R < 0' };
  const MAG = { tex: String.raw`\Gamma_\text{лупы} = \frac{D}{f},\quad \Gamma_\text{тел} = \frac{f_\text{об}}{f_\text{ок}},\quad \Gamma_\text{мкр} = \frac{D\Delta}{f_\text{об}f_\text{ок}}`, text: 'увеличение лупы, телескопа и микроскопа (D = 25 см)' };
  const RAYS_M = { tex: String.raw`\text{луч через }O \to \text{назад};\ \text{луч в }P \to \text{симметрично оси};\ \parallel\text{ лучи} \to \text{точка фокальной плоскости}`, text: 'правила хода лучей для сферического зеркала (O — центр, P — полюс, F — середина OP)' };
  const RAYS_L = { tex: String.raw`\text{луч через }O \to \text{без преломления};\ \parallel\text{ лучи} \to \text{точка фокальной плоскости}`, text: 'правила хода лучей для тонкой линзы' };

  window.TASKS.push(

  /* ===================== 28.1 ===================== */
  {
    id: '28.1', chapter: CH, section: S1, page: '384',
    title: 'Изображения в двух почти плоских зеркалах',
    given: [[String.raw`\varphi = 179^\circ`, ''], [String.raw`l = 10\ \text{см}`, '']],
    find: String.raw`d \;—\; ?`,
    formulas: [{ tex: String.raw`d = 2l\sin\frac{2\pi - 2\varphi}{2}`, text: 'изображения лежат на окружности радиусом l вокруг ребра' }],
    steps: [
      { title: 'Углы изображений', text: 'Зеркала — на углах 0 и φ, источник — на φ/2. Изображения — на углах −φ/2 и 3φ/2; угол между ними 2φ = 358°, то есть 2° с другой стороны.' },
      { title: 'Расстояние', tex: String.raw`d = 2l\sin1^\circ = 2\cdot100\cdot0{,}01745 = 3{,}5\ \text{мм}` },
    ],
    answer: [String.raw`d = 3{,}5\ \text{мм}`],
  },

  /* ===================== 28.2 ===================== */
  {
    id: '28.2', chapter: CH, section: S1, page: '384',
    title: 'Ход луча, падающего в полюс зеркала',
    given: [[String.raw`\text{рис. 28.4: луч падает в полюс }P`, '']],
    find: String.raw`\text{отражённый луч}`,
    formulas: [RAYS_M],
    steps: [
      { title: 'Нормаль в полюсе — главная оптическая ось', text: 'Радиус OP перпендикулярен зеркалу в точке P, поэтому нормалью служит сама ось OP.' },
      { title: 'а) Вогнутое и б) выпуклое зеркало', text: 'Угол отражения равен углу падения, отсчитанному от оси. Отражённый луч выходит из P симметрично падающему относительно оси: если луч падал сверху вниз, отражённый уходит вниз под тем же углом к оси. Для выпуклого зеркала — так же.' },
    ],
    answer: [String.raw`\text{отражённый луч симметричен падающему относительно главной оси}`],
    note: BUILD,
  },

  /* ===================== 28.3 ===================== */
  {
    id: '28.3', chapter: CH, section: S1, page: '384',
    title: 'Радиус зеркала по увеличению',
    given: [[String.raw`\Gamma = 4`, ''], [String.raw`a = 25\ \text{см}`, '']],
    find: String.raw`R \;—\; ?`,
    formulas: [MIR],
    steps: [
      { title: 'Изображение на экране — действительное', tex: String.raw`b = \Gamma a = 100\ \text{см}` },
      { title: 'Радиус', tex: String.raw`\frac1f = \frac1{25} + \frac1{100} = \frac{1}{20}\ \Rightarrow\ R = 2f = 40\ \text{см}` },
    ],
    answer: [String.raw`R = 40\ \text{см}`],
  },

  /* ===================== 28.4 ===================== */
  {
    id: '28.4', chapter: CH, section: S1, page: '384',
    title: 'Уменьшенное в три раза изображение',
    given: [[String.raw`f = 15\ \text{см}`, ''], [String.raw`b = a/3`, '']],
    find: String.raw`a \;—\; ?`,
    formulas: [MIR],
    steps: [{ title: 'Подставляем b = a/3', tex: String.raw`\frac1{15} = \frac1a + \frac3a = \frac4a\ \Rightarrow\ a = 60\ \text{см}` }],
    answer: [String.raw`a = 60\ \text{см}`],
  },

  /* ===================== 28.5 ===================== */
  {
    id: '28.5', chapter: CH, section: S1, page: '384',
    title: 'Найти O, P и F по точке и её изображению',
    given: [[String.raw`\text{рис. 28.5: ось }MN,\ S,\ S'`, '']],
    find: String.raw`O,\ P,\ F;\ \text{тип зеркала}`,
    formulas: [RAYS_M],
    steps: [
      { title: 'Центр O', text: 'Луч, идущий через центр, отражается обратно по той же прямой. Поэтому S, S′ и O лежат на одной прямой: O — точка пересечения прямой SS′ с осью MN.' },
      { title: 'Полюс P', text: 'Луч, падающий в полюс, отражается симметрично оси. Постройте точку S*, симметричную S относительно MN; прямая S*S′ пересекает ось в полюсе P. Зеркало перпендикулярно оси в P.' },
      { title: 'Фокус F', text: 'F — середина отрезка OP.' },
      { title: 'Тип зеркала и изображения', text: 'В обоих случаях S и S′ лежат по одну сторону от оси — изображение прямое, значит, мнимое. а) S′ дальше от оси, чем S (увеличено) — зеркало вогнутое, предмет между F и P. б) S′ ближе к оси (уменьшено) — зеркало выпуклое.' },
    ],
    answer: [String.raw`а)\ \text{вогнутое, изображение мнимое};\quad б)\ \text{выпуклое, изображение мнимое}`],
    note: BUILD,
  },

  /* ===================== 28.6 ===================== */
  {
    id: '28.6', chapter: CH, section: S1, page: '384',
    title: 'Изображение Солнца в вогнутом зеркале',
    given: [[String.raw`d = 28\ \text{мм}`, ''], [String.raw`\beta = 32'`, String.raw`9{,}31\cdot10^{-3}\ \text{рад}`]],
    find: String.raw`R \;—\; ?`,
    formulas: [MIR],
    steps: [{ title: 'Изображение — в фокальной плоскости', tex: String.raw`d = f\beta\ \Rightarrow\ R = \frac{2d}{\beta} = \frac{0{,}056}{9{,}31\cdot10^{-3}} = 6{,}0\ \text{м}` }],
    answer: [String.raw`R = 6\ \text{м}`],
  },

  /* ===================== 28.7 ===================== */
  {
    id: '28.7', chapter: CH, section: S1, page: '384–385',
    title: 'Изображение в выпуклом зеркале',
    given: [[String.raw`R = 50\ \text{см}`, String.raw`f = -25\ \text{см}`], [String.raw`h = 15\ \text{см}`, ''], [String.raw`a = 1\ \text{м}`, String.raw`100\ \text{см}`]],
    find: String.raw`b,\ H \;—\; ?`,
    formulas: [MIR],
    steps: [
      { title: 'Расстояние', tex: String.raw`\frac1b = -\frac1{25} - \frac1{100} = -\frac{1}{20}\ \Rightarrow\ b = -20\ \text{см}\ (\text{мнимое})` },
      { title: 'Высота', tex: String.raw`H = h\frac{|b|}{a} = 15\cdot0{,}2 = 3\ \text{см}` },
    ],
    answer: [String.raw`b = -20\ \text{см};\quad H = 3\ \text{см}`],
  },

  /* ===================== 28.8 ===================== */
  {
    id: '28.8', chapter: CH, section: S1, page: '385',
    title: 'Ход второго луча по ходу первого',
    given: [[String.raw`\text{рис. 28.6: ось }MN,\ \text{луч 1 и его отражение}`, '']],
    find: String.raw`\text{отражённый луч 2}`,
    formulas: [RAYS_M],
    steps: [
      { title: 'Фокальная плоскость из луча 1', text: 'Через полюс P (точка пересечения оси с зеркалом) проведите вспомогательный луч, параллельный лучу 1. Он отражается симметрично оси. Точка, где он пересекается с отражённым лучом 1 (или с их продолжениями), лежит в фокальной плоскости; перпендикуляр из неё на ось даёт фокус F.' },
      { title: 'Луч 2', text: 'Через P проведите луч, параллельный лучу 2, отразите его симметрично оси и найдите, где он пересекает фокальную плоскость. Отражённый луч 2 идёт из точки падения на зеркало через эту точку — в случае б) через неё проходит его продолжение.' },
    ],
    answer: [String.raw`\text{построение через фокальную плоскость (см. шаги)}`],
    note: BUILD,
  },

  /* ===================== 28.9 ===================== */
  {
    id: '28.9', chapter: CH, section: S1, page: '385',
    title: 'Смещение пятна под пластиной',
    given: [[String.raw`\varepsilon = 30^\circ`, ''], [String.raw`d = 5\ \text{см}`, ''], [String.raw`n = 1{,}5`, '']],
    find: String.raw`\Delta \;—\; ?`,
    formulas: [SNELL],
    steps: [
      { title: 'Угол преломления', tex: String.raw`\sin\varepsilon' = \frac{0{,}5}{1{,}5} = 0{,}333\ \Rightarrow\ \operatorname{tg}\varepsilon' = 0{,}354` },
      { title: 'Смещение по бумаге', text: 'Без пластины луч прошёл бы горизонтально d·tg ε, в стекле — d·tg ε′.', tex: String.raw`\Delta = d(\operatorname{tg}\varepsilon - \operatorname{tg}\varepsilon') = 5(0{,}577 - 0{,}354) = 1{,}1\ \text{см}` },
    ],
    answer: [String.raw`\Delta = 1{,}1\ \text{см}`],
  },

  /* ===================== 28.10 ===================== */
  {
    id: '28.10', chapter: CH, section: S1, page: '385',
    title: 'Боковое смещение луча пластинкой',
    given: [[String.raw`\varepsilon = 60^\circ`, ''], [String.raw`d = 30\ \text{мм}`, ''], [String.raw`n = 1{,}5`, '']],
    find: String.raw`\Delta x \;—\; ?`,
    formulas: [SNELL],
    steps: [
      { title: 'Угол преломления', tex: String.raw`\sin\varepsilon' = \frac{0{,}866}{1{,}5} = 0{,}577\ \Rightarrow\ \varepsilon' = 35{,}3^\circ` },
      { title: 'Смещение', tex: String.raw`\Delta x = \frac{d\sin(\varepsilon - \varepsilon')}{\cos\varepsilon'} = \frac{30\cdot0{,}418}{0{,}816} = 15{,}4\ \text{мм}` },
    ],
    answer: [String.raw`\Delta x = 15{,}4\ \text{мм}`],
  },

  /* ===================== 28.11 ===================== */
  {
    id: '28.11', chapter: CH, section: S1, page: '385',
    title: 'Ширина пучка в стекле',
    given: [[String.raw`\varepsilon = 60^\circ`, ''], [String.raw`a = 10\ \text{см}`, ''], [String.raw`n = 1{,}5`, '']],
    find: String.raw`b \;—\; ?`,
    formulas: [SNELL],
    steps: [{ title: 'Пучок опирается на один и тот же участок поверхности s', tex: String.raw`a = s\cos\varepsilon,\quad b = s\cos\varepsilon'\ \Rightarrow\ b = a\frac{\cos\varepsilon'}{\cos\varepsilon} = 10\cdot\frac{0{,}816}{0{,}5} = 16{,}3\ \text{см}` }],
    answer: [String.raw`b = 16{,}3\ \text{см}`],
  },

  /* ===================== 28.12 ===================== */
  {
    id: '28.12', chapter: CH, section: S1, page: '385',
    title: 'Отражённый и преломлённый лучи перпендикулярны',
    given: [[String.raw`\angle(\text{отр.},\ \text{прел.}) = \pi/2`, '']],
    find: String.raw`\text{доказать: }\operatorname{tg}\varepsilon_1 = n_2/n_1`,
    formulas: [SNELL],
    steps: [
      { title: 'Углы', text: 'Отражённый луч составляет угол ε₁ с нормалью, преломлённый — угол ε₂′ с той же нормалью по другую сторону поверхности. Угол между лучами равен π − ε₁ − ε₂′ = π/2, отсюда ε₂′ = π/2 − ε₁.' },
      { title: 'Подстановка в закон преломления', tex: String.raw`\frac{\sin\varepsilon_1}{\sin(\pi/2 - \varepsilon_1)} = \frac{\sin\varepsilon_1}{\cos\varepsilon_1} = \operatorname{tg}\varepsilon_1 = \frac{n_2}{n_1}` },
    ],
    answer: [String.raw`\operatorname{tg}\varepsilon_1 = n_2/n_1\ (\text{угол Брюстера})`],
    note: PROOF,
  },

  /* ===================== 28.13 ===================== */
  {
    id: '28.13', chapter: CH, section: S1, page: '385',
    title: 'Отклонение лучей тонкой призмой',
    given: [[String.raw`\theta \ll 1,\ \varepsilon_1 \ll 1`, '']],
    find: String.raw`\text{доказать: }\sigma = \theta(n - 1)`,
    formulas: [SNELL],
    steps: [
      { title: 'Ход луча', tex: String.raw`\varepsilon_1 = n\varepsilon_2,\quad \varepsilon_3 = \theta - \varepsilon_2,\quad \varepsilon_4 = n\varepsilon_3\quad(\sin x \approx x)` },
      { title: 'Отклонение', tex: String.raw`\sigma = \varepsilon_1 + \varepsilon_4 - \theta = n(\varepsilon_2 + \varepsilon_3) - \theta = n\theta - \theta = \theta(n - 1)` },
      { title: 'Вывод', text: 'Угол падения ε₁ из ответа выпал: отклонение тонкой призмы от него не зависит.' },
    ],
    answer: [String.raw`\sigma = \theta(n - 1)`],
    note: PROOF,
  },

  /* ===================== 28.14 ===================== */
  {
    id: '28.14', chapter: CH, section: S1, page: '385',
    title: 'Показатель по наименьшему отклонению (40°)',
    given: [[String.raw`\theta = 60^\circ`, ''], [String.raw`\sigma = 40^\circ`, '']],
    find: String.raw`n \;—\; ?`,
    formulas: [PRISM],
    steps: [{ title: 'Показатель', tex: String.raw`n = \frac{\sin50^\circ}{\sin30^\circ} = \frac{0{,}766}{0{,}5} = 1{,}53` }],
    answer: [String.raw`n = 1{,}53`],
  },

  /* ===================== 28.15 ===================== */
  {
    id: '28.15', chapter: CH, section: S1, page: '385',
    title: 'Луч падает перпендикулярно грани (θ = 30°)',
    given: [[String.raw`\theta = 30^\circ`, ''], [String.raw`\sigma = 20^\circ`, '']],
    find: String.raw`n \;—\; ?`,
    formulas: [SNELL],
    steps: [
      { title: 'Ход луча', text: 'На первой грани луч не преломляется. На вторую он падает под углом θ и выходит под углом θ + σ.' },
      { title: 'Показатель', tex: String.raw`n = \frac{\sin(\theta + \sigma)}{\sin\theta} = \frac{\sin50^\circ}{\sin30^\circ} = 1{,}53` },
    ],
    answer: [String.raw`n = 1{,}53`],
    note: MISMATCH + 'В книге 1,63. По данным условия sin 50°/sin 30° = 1,53 — то же число, что и в 28.14.',
  },

  /* ===================== 28.16 ===================== */
  {
    id: '28.16', chapter: CH, section: S1, page: '385',
    title: 'Преломляющий угол по отклонению 25°',
    given: [[String.raw`\sigma = 25^\circ`, ''], [String.raw`n = 1{,}5`, '']],
    find: String.raw`\theta \;—\; ?`,
    formulas: [SNELL],
    steps: [
      { title: 'Уравнение (как в 28.15)', tex: String.raw`\sin(\theta + \sigma) = n\sin\theta\ \Rightarrow\ \operatorname{tg}\theta = \frac{\sin\sigma}{n - \cos\sigma} = \frac{0{,}423}{1{,}5 - 0{,}906} = 0{,}712` },
      { title: 'Угол', tex: String.raw`\theta = 35{,}4^\circ = 35^\circ27'` },
    ],
    answer: [String.raw`\theta = 35^\circ27' \approx 35^\circ30'`],
  },

  /* ===================== 28.17 ===================== */
  {
    id: '28.17', chapter: CH, section: S1, page: '386',
    title: 'Ход луча через призму 60°',
    given: [[String.raw`\theta = 60^\circ`, ''], [String.raw`\varepsilon_1 = 45^\circ`, ''], [String.raw`n = 1{,}5`, '']],
    find: String.raw`\varepsilon_2',\ \sigma \;—\; ?`,
    formulas: [SNELL],
    steps: [
      { title: 'Первая грань', tex: String.raw`\sin\varepsilon_2 = \frac{0{,}707}{1{,}5} = 0{,}471\ \Rightarrow\ \varepsilon_2 = 28{,}1^\circ` },
      { title: 'Вторая грань', tex: String.raw`\varepsilon_3 = 60^\circ - 28{,}1^\circ = 31{,}9^\circ,\quad \sin\varepsilon_2' = 1{,}5\cdot0{,}528 = 0{,}792\ \Rightarrow\ \varepsilon_2' = 52{,}4^\circ = 52^\circ23'` },
      { title: 'Отклонение', tex: String.raw`\sigma = \varepsilon_1 + \varepsilon_2' - \theta = 45^\circ + 52{,}4^\circ - 60^\circ = 37{,}4^\circ` },
    ],
    answer: [String.raw`\varepsilon_2' = 52^\circ23';\quad \sigma = 37^\circ23'`],
    note: MISMATCH + 'В книге дан один угол — 53°38′. При n = 1,5 угол выхода получается 52°23′; ответ книги соответствует n ≈ 1,513. Угол отклонения σ в книге не приведён.',
  },

  /* ===================== 28.18 ===================== */
  {
    id: '28.18', chapter: CH, section: S1, page: '386',
    title: 'Показатель по наименьшему отклонению (30°)',
    given: [[String.raw`\theta = 60^\circ`, ''], [String.raw`\sigma = 30^\circ`, '']],
    find: String.raw`n \;—\; ?`,
    formulas: [PRISM],
    steps: [{ title: 'Показатель', tex: String.raw`n = \frac{\sin45^\circ}{\sin30^\circ} = \sqrt2 = 1{,}41` }],
    answer: [String.raw`n = 1{,}41`],
  },

  /* ===================== 28.19 ===================== */
  {
    id: '28.19', chapter: CH, section: S1, page: '386',
    title: 'Тонкий клин',
    given: [[String.raw`\theta = 2^\circ`, ''], [String.raw`n = 1{,}6`, '']],
    find: String.raw`\sigma_{\min} \;—\; ?`,
    formulas: [{ tex: String.raw`\sigma = \theta(n - 1)`, text: 'тонкая призма (см. 28.13)' }],
    steps: [{ title: 'Отклонение', tex: String.raw`\sigma = 2^\circ\cdot0{,}6 = 1{,}2^\circ = 1^\circ12'` }],
    answer: [String.raw`\sigma_{\min} = 1^\circ12'`],
  },

  /* ===================== 28.20 ===================== */
  {
    id: '28.20', chapter: CH, section: S2, page: '386',
    title: 'Ход произвольного луча через линзу',
    given: [[String.raw`\text{рис. 28.7: }O,\ F,\ \text{падающий луч}`, '']],
    find: String.raw`\text{преломлённый луч}`,
    formulas: [RAYS_L],
    steps: [
      { title: 'Побочная ось', text: 'Через O проведите прямую, параллельную падающему лучу. Луч вдоль неё проходит линзу без преломления.' },
      { title: 'Фокальная плоскость', text: 'Через фокус проведите перпендикуляр к главной оси. Параллельные лучи после линзы сходятся в одной точке этой плоскости.' },
      { title: 'а) Собирающая линза', text: 'Используйте задний фокус F′. Найдите точку, где побочная ось пересекает фокальную плоскость; преломлённый луч идёт из точки падения на линзу через эту точку.' },
      { title: 'б) Рассеивающая линза', text: 'Используйте передний фокус — со стороны падающего луча. Найдите точку пересечения побочной оси с фокальной плоскостью; преломлённый луч идёт так, будто выходит из этой точки: его продолжение назад проходит через неё.' },
    ],
    answer: [String.raw`\text{построение через побочную ось и фокальную плоскость}`],
    note: BUILD,
  },

  /* ===================== 28.21 ===================== */
  {
    id: '28.21', chapter: CH, section: S2, page: '386',
    title: 'Ход второго луча по ходу первого (линза)',
    given: [[String.raw`\text{рис. 28.8: ось }MN,\ \text{луч 1 до и после линзы}`, '']],
    find: String.raw`\text{преломлённый луч 2}`,
    formulas: [RAYS_L],
    steps: [
      { title: 'Оптический центр', text: 'O — точка пересечения линзы с главной осью MN.' },
      { title: 'Фокальная плоскость из луча 1', text: 'Через O проведите побочную ось, параллельную падающему лучу 1. Точка, где она пересекается с преломлённым лучом 1 (или с его продолжением), лежит в фокальной плоскости; перпендикуляр из неё на MN даёт фокус.' },
      { title: 'Луч 2', text: 'Через O проведите побочную ось, параллельную лучу 2, и найдите, где она пересекает фокальную плоскость. Преломлённый луч 2 проходит через эту точку, а у рассеивающей линзы через неё проходит его продолжение.' },
    ],
    answer: [String.raw`\text{построение через фокальную плоскость (см. шаги)}`],
    note: BUILD,
  },

  /* ===================== 28.22 ===================== */
  {
    id: '28.22', chapter: CH, section: S2, page: '386',
    title: 'Найти светящуюся точку по преломлённым лучам',
    given: [[String.raw`\text{рис. 28.9: }O,\ F,\ \text{лучи после линзы}`, '']],
    find: String.raw`\text{положение }S`,
    formulas: [RAYS_L],
    steps: [
      { title: 'Обратный ход', text: 'По принципу обратимости пустите каждый преломлённый луч назад. Отметьте точку, где он (или его продолжение) пересекает фокальную плоскость F′.' },
      { title: 'Падающий луч', text: 'Падающий луч параллелен побочной оси — прямой, соединяющей O с этой точкой. Через точку, где луч касается линзы, проведите прямую, параллельную этой оси.' },
      { title: 'Источник', text: 'Постройте так два падающих луча: светящаяся точка S лежит на их пересечении. Для рассеивающей линзы фокальная плоскость берётся со стороны падающего света.' },
    ],
    answer: [String.raw`S\ \text{— пересечение восстановленных падающих лучей}`],
    note: BUILD,
  },

  /* ===================== 28.23 ===================== */
  {
    id: '28.23', chapter: CH, section: S2, page: '386–387',
    title: 'Найти O и F линзы по точке и изображению',
    given: [[String.raw`\text{рис. 28.10: ось }MN,\ S,\ S'`, '']],
    find: String.raw`O,\ F;\ \text{тип линзы}`,
    formulas: [RAYS_L],
    steps: [
      { title: 'Оптический центр', text: 'Луч через O не преломляется, поэтому O — точка пересечения прямой SS′ с осью MN. Линза перпендикулярна оси в O.' },
      { title: 'Фокус', text: 'Из S проведите луч параллельно оси до линзы. После линзы он идёт через S′ (или его продолжение проходит через S′). Точка, где этот луч или его продолжение пересекает ось, — фокус F.' },
      { title: 'Тип', text: 'Если S и S′ по разные стороны оси — изображение действительное, линза собирающая. Если по одну сторону и S′ дальше от оси — изображение мнимое, линза собирающая (лупа). Если по одну сторону и S′ ближе к оси — изображение мнимое, линза рассеивающая.' },
    ],
    answer: [String.raw`O = SS' \cap MN;\ \text{тип — по положению }S'\ \text{(см. шаг 3)}`],
    note: BUILD,
  },

  /* ===================== 28.24 ===================== */
  {
    id: '28.24', chapter: CH, section: S2, page: '387',
    title: 'Два положения лампочки на оптической скамье',
    given: [[String.raw`l = 80\ \text{см}`, ''], [String.raw`\Delta l = 40\ \text{см}`, '']],
    find: String.raw`f \;—\; ?`,
    formulas: [LENS],
    steps: [
      { title: 'Сопряжённые расстояния', text: 'Во втором положении a и b меняются местами (обратимость лучей).', tex: String.raw`a + b = 80,\quad b - a = 40\ \Rightarrow\ a = 20,\ b = 60\ \text{см}` },
      { title: 'Фокус', tex: String.raw`f = \frac{ab}{a + b} = \frac{20\cdot60}{80} = 15\ \text{см}` },
    ],
    answer: [String.raw`f = 15\ \text{см}`],
  },

  /* ===================== 28.25 ===================== */
  {
    id: '28.25', chapter: CH, section: S2, page: '387',
    title: 'Наименьшее расстояние предмет — изображение',
    given: [[String.raw`f = 12\ \text{см}`, '']],
    find: String.raw`l_{\min} \;—\; ?`,
    formulas: [LENS],
    steps: [
      { title: 'l = a + b при 1/a + 1/b = 1/f', tex: String.raw`l = \frac{a^2}{a - f}\ \Rightarrow\ \frac{dl}{da} = 0\ \text{при}\ a = 2f` },
      { title: 'Минимум', tex: String.raw`l_{\min} = 4f = 48\ \text{см}` },
    ],
    answer: [String.raw`l_{\min} = 4f = 48\ \text{см}`],
  },

  /* ===================== 28.26 ===================== */
  {
    id: '28.26', chapter: CH, section: S2, page: '387',
    title: 'Скорость перемещения матового стекла',
    given: [[String.raw`v = 5\ \text{м/с}`, ''], [String.raw`f = 20\ \text{см}`, String.raw`0{,}2\ \text{м}`], [String.raw`a = 10\ \text{м}`, '']],
    find: String.raw`u \;—\; ?`,
    formulas: [LENS],
    steps: [{ title: 'Дифференцируем b = af/(a − f)', tex: String.raw`u = \left|\frac{db}{dt}\right| = \frac{f^2}{(a - f)^2}v = \frac{0{,}04}{9{,}8^2}\cdot5 = 2{,}08\cdot10^{-3}\ \text{м/с}` }],
    answer: [String.raw`u = 2{,}08\ \text{мм/с}`],
  },

  /* ===================== 28.27 ===================== */
  {
    id: '28.27', chapter: CH, section: S2, page: '387',
    title: 'Плосковыпуклая линза 5 дптр',
    given: [[String.raw`D = 5\ \text{дптр}`, ''], [String.raw`n = 1{,}5`, '']],
    find: String.raw`R \;—\; ?`,
    formulas: [LENS],
    steps: [{ title: 'Плоская поверхность: 1/R₂ = 0', tex: String.raw`R = \frac{n - 1}{D} = \frac{0{,}5}{5} = 0{,}1\ \text{м}` }],
    answer: [String.raw`R = 10\ \text{см}`],
  },

  /* ===================== 28.28 ===================== */
  {
    id: '28.28', chapter: CH, section: S2, page: '387',
    title: 'Симметричная двояковыпуклая линза, f = 20 см',
    given: [[String.raw`R_1 = R_2 = R`, ''], [String.raw`f = 20\ \text{см}`, ''], [String.raw`n = 1{,}5`, '']],
    find: String.raw`R \;—\; ?`,
    formulas: [LENS],
    steps: [{ title: 'Радиус', tex: String.raw`\frac1f = (n - 1)\frac2R\ \Rightarrow\ R = 2(n - 1)f = 2\cdot0{,}5\cdot20 = 20\ \text{см}` }],
    answer: [String.raw`R = 20\ \text{см}`],
    note: '<b>Сбой нумерации в ответах книги.</b> Под номером 28.28 в книге стоит 7,5 см — это ответ к задаче 28.29, у которой своего ответа нет. Для 28.28 выходит R = 2(n − 1)f = 20 см.',
  },

  /* ===================== 28.29 ===================== */
  {
    id: '28.29', chapter: CH, section: S2, page: '387',
    title: 'Линза с отношением радиусов 2',
    given: [[String.raw`k = R_2/R_1 = 2`, ''], [String.raw`D = 10\ \text{дптр}`, ''], [String.raw`n = 1{,}5`, '']],
    find: String.raw`R \;—\; ?`,
    formulas: [LENS],
    steps: [
      { title: 'Двояковыпуклая линза, R₁ = R, R₂ = 2R', tex: String.raw`D = (n - 1)\left(\frac1R + \frac1{2R}\right) = \frac{0{,}75}{R}\ \Rightarrow\ R = 7{,}5\ \text{см}` },
      { title: 'Если это мениск (выпуклая R, вогнутая 2R)', tex: String.raw`D = 0{,}5\left(\frac1R - \frac1{2R}\right) = \frac{0{,}25}R\ \Rightarrow\ R = 2{,}5\ \text{см}` },
    ],
    answer: [String.raw`R = 7{,}5\ \text{см}\ (\text{двояковыпуклая})`],
    note: '<b>Ответ книги</b> (7,5 см) напечатан под номером 28.28.',
  },

  /* ===================== 28.30 ===================== */
  {
    id: '28.30', chapter: CH, section: S2, page: '387',
    title: 'Рассеивающий мениск',
    given: [[String.raw`k = 3`, ''], [String.raw`D = -8\ \text{дптр}`, ''], [String.raw`n = 1{,}5`, '']],
    find: String.raw`R \;—\; ?`,
    formulas: [LENS],
    steps: [
      { title: 'D < 0 при одной выпуклой поверхности — мениск с более крутой вогнутой', text: 'Выпуклая поверхность имеет радиус R, вогнутая — R/3.', tex: String.raw`D = 0{,}5\left(\frac1R - \frac3R\right) = -\frac1R` },
      { title: 'Радиус', tex: String.raw`R = \frac1{8} = 0{,}125\ \text{м}` },
    ],
    answer: [String.raw`R = 12{,}5\ \text{см}`],
  },

  /* ===================== 28.31 ===================== */
  {
    id: '28.31', chapter: CH, section: S2, page: '388',
    title: 'Воздушная линза в воде',
    given: [[String.raw`R_1 = R_2 = -0{,}5\ \text{м}\ (\text{вогнутые})`, ''], [String.raw`n_\text{л} = 1,\ n_\text{ср} = 1{,}33`, '']],
    find: String.raw`D \;—\; ?`,
    formulas: [LENS],
    steps: [
      { title: 'По формуле раздела', tex: String.raw`D = \left(\frac1{1{,}33} - 1\right)\left(-\frac2{0{,}5}\right) = (-0{,}248)(-4) = +0{,}99\ \text{дптр}` },
      { title: 'Смысл', text: 'Воздушная двояковогнутая линза в воде — собирающая: свет в ней идёт быстрее, чем в окружающей среде. Если определять оптическую силу как D = n_ср/f, выходит (1 − 1,33)(−4) = +1,32 дптр.' },
    ],
    answer: [String.raw`D = +0{,}99\ \text{дптр}\ (f = 1{,}01\ \text{м};\ \text{собирающая})`],
    note: MISMATCH + 'В книге −1,32 дптр: модуль соответствует D = n_ср/f, но знак неверен. Вогнутые поверхности (R < 0) при n_л < n_ср дают положительную оптическую силу — линза собирающая.',
  },

  /* ===================== 28.32 ===================== */
  {
    id: '28.32', chapter: CH, section: S2, page: '388',
    title: 'Хроматическая аберрация линзы',
    given: [[String.raw`n_\text{к} = 1{,}50,\ n_\text{ф} = 1{,}52`, ''], [String.raw`R_1 = R_2 = 1\ \text{м}`, '']],
    find: String.raw`\Delta f \;—\; ?`,
    formulas: [LENS],
    steps: [{ title: 'Фокусы', tex: String.raw`f_\text{к} = \frac{1}{0{,}50\cdot2} = 1{,}000\ \text{м},\quad f_\text{ф} = \frac{1}{0{,}52\cdot2} = 0{,}9615\ \text{м}\ \Rightarrow\ \Delta f = 3{,}85\ \text{см}` }],
    answer: [String.raw`\Delta f = 3{,}85\ \text{см}`],
    note: SMALL + 'В книге 3,84 см; точно 3,846.',
  },

  /* ===================== 28.33 ===================== */
  {
    id: '28.33', chapter: CH, section: S2, page: '388',
    title: 'Плосковыпуклая линза по диаметру и толщине',
    given: [[String.raw`d = 10\ \text{см}\ (r = 5\ \text{см})`, ''], [String.raw`h = 1\ \text{см}`, ''], [String.raw`n = 1{,}5`, '']],
    find: String.raw`f \;—\; ?`,
    formulas: [LENS],
    steps: [
      { title: 'Радиус по стрелке сегмента', tex: String.raw`R^2 = r^2 + (R - h)^2\ \Rightarrow\ R = \frac{r^2 + h^2}{2h} = \frac{25 + 1}{2} = 13\ \text{см}` },
      { title: 'Фокус', tex: String.raw`f = \frac{R}{n - 1} = 26\ \text{см}` },
    ],
    answer: [String.raw`f = 26\ \text{см}`],
  },

  /* ===================== 28.34 ===================== */
  {
    id: '28.34', chapter: CH, section: S2, page: '388',
    title: 'Оптическая сила мениска',
    given: [[String.raw`R_1 = 1\ \text{м}\ (\text{выпуклая})`, ''], [String.raw`R_2 = -0{,}4\ \text{м}\ (\text{вогнутая})`, ''], [String.raw`n = 1{,}5`, '']],
    find: String.raw`D \;—\; ?`,
    formulas: [LENS],
    steps: [{ title: 'Оптическая сила', tex: String.raw`D = 0{,}5\left(1 - \frac1{0{,}4}\right) = 0{,}5\cdot(-1{,}5) = -0{,}75\ \text{дптр}` }],
    answer: [String.raw`D = -0{,}75\ \text{дптр}`],
  },

  /* ===================== 28.35 ===================== */
  {
    id: '28.35', chapter: CH, section: S2, page: '388',
    title: 'Линза в воде и в коричном масле',
    given: [[String.raw`f_0 = 10\ \text{см}`, ''], [String.raw`n = 1{,}5;\ n_\text{в} = 1{,}33;\ n_\text{м} = 1{,}60`, '']],
    find: String.raw`f_1,\ f_2 \;—\; ?`,
    formulas: [LENS],
    steps: [
      { title: 'Геометрический множитель', tex: String.raw`K = \frac1{R_1} + \frac1{R_2} = \frac{1}{(n - 1)f_0} = 20\ \text{м}^{-1}` },
      { title: '1) Вода', tex: String.raw`\frac1{f_1} = \left(\frac{1{,}5}{1{,}33} - 1\right)\cdot20 = 2{,}56\ \Rightarrow\ f_1 = 39\ \text{см}` },
      { title: '2) Масло', tex: String.raw`\frac1{f_2} = \left(\frac{1{,}5}{1{,}6} - 1\right)\cdot20 = -1{,}25\ \Rightarrow\ f_2 = -80\ \text{см}` },
    ],
    answer: [String.raw`1)\ 39\ \text{см};\quad 2)\ -80\ \text{см}\ (\text{линза становится рассеивающей})`],
  },

  /* ===================== 28.36 ===================== */
  {
    id: '28.36', chapter: CH, section: S2, page: '388',
    title: 'Показатель преломления раствора сахара',
    given: [[String.raw`f_1 = 5\ \text{см},\ f_2 = 35\ \text{см}`, ''], [String.raw`n_\text{л} = 1{,}5`, '']],
    find: String.raw`n \;—\; ?`,
    formulas: [LENS],
    steps: [
      { title: 'Отношение', tex: String.raw`\frac{f_1}{f_2} = \frac{n_\text{л}/n - 1}{n_\text{л} - 1}\ \Rightarrow\ \frac{1{,}5}{n} = 1 + \frac{0{,}5}{7} = 1{,}071` },
      { title: 'Показатель', tex: String.raw`n = \frac{1{,}5}{1{,}071} = 1{,}4` },
    ],
    answer: [String.raw`n = 1{,}4`],
  },

  /* ===================== 28.37 ===================== */
  {
    id: '28.37', chapter: CH, section: S2, page: '388',
    title: 'Показатель преломления жидкости',
    given: [[String.raw`D_1 = 5\ \text{дптр},\ D_2 = -0{,}48\ \text{дптр}`, ''], [String.raw`n_1 = 1{,}52`, '']],
    find: String.raw`n_2 \;—\; ?`,
    formulas: [LENS],
    steps: [
      { title: 'Отношение', tex: String.raw`\frac{D_2}{D_1} = \frac{n_1/n_2 - 1}{n_1 - 1}\ \Rightarrow\ \frac{1{,}52}{n_2} = 1 + 0{,}52\cdot\frac{-0{,}48}{5} = 0{,}950` },
      { title: 'Показатель', tex: String.raw`n_2 = \frac{1{,}52}{0{,}950} = 1{,}6` },
    ],
    answer: [String.raw`n_2 = 1{,}6`],
  },

  /* ===================== 28.38 ===================== */
  {
    id: '28.38', chapter: CH, section: S2, page: '388',
    title: 'Оптическая сила двух сложенных линз',
    given: [[String.raw`D_1,\ D_2,\ \text{линзы вплотную}`, '']],
    find: String.raw`\text{доказать: }D = D_1 + D_2`,
    formulas: [LENS],
    steps: [
      { title: 'Первая линза', tex: String.raw`\frac1a + \frac1{b_1} = D_1` },
      { title: 'Вторая линза', text: 'Изображение первой линзы служит предметом для второй. Расстояние между линзами равно нулю, поэтому предмет для второй находится на расстоянии −b₁ (если изображение лежит за ней, это мнимый предмет).', tex: String.raw`-\frac1{b_1} + \frac1b = D_2` },
      { title: 'Складываем', tex: String.raw`\frac1a + \frac1b = D_1 + D_2 = D` },
    ],
    answer: [String.raw`D = D_1 + D_2`],
    note: PROOF,
  },

  /* ===================== 28.39 ===================== */
  {
    id: '28.39', chapter: CH, section: S2, page: '388',
    title: 'Вогнутое зеркало с глицерином',
    given: [[String.raw`R = 20\ \text{см}`, ''], [String.raw`n = 1{,}47`, '']],
    find: String.raw`f \;—\; ?`,
    formulas: [MIR, LENS],
    steps: [
      { title: 'Система: линза + зеркало + линза', text: 'Слой глицерина — тонкая плосковыпуклая линза с D_л = (n − 1)/R. Свет проходит её дважды: до зеркала и после отражения.', tex: String.raw`D = 2\frac{n - 1}{R} + \frac2R = \frac{2n}{R}` },
      { title: 'Фокус', tex: String.raw`f = \frac{R}{2n} = \frac{20}{2\cdot1{,}47} = 6{,}8\ \text{см}` },
    ],
    answer: [String.raw`f = \frac{R}{2n} = 6{,}8\ \text{см}`],
    note: MISMATCH + 'В книге 8,1 см = R/(1 + n): линза учтена один раз, хотя свет проходит слой дважды. В задаче 28.40 книга сама использует правильный результат D = 2n/R (ответ 24 дптр сходится).',
  },

  /* ===================== 28.40 ===================== */
  {
    id: '28.40', chapter: CH, section: S2, page: '388',
    title: 'Посеребрённая плосковыпуклая линза',
    given: [[String.raw`D_1 = 4\ \text{дптр}`, ''], [String.raw`n = 1{,}5`, '']],
    find: String.raw`D_2 \;—\; ?`,
    formulas: [MIR, LENS],
    steps: [
      { title: 'Радиус выпуклой поверхности', tex: String.raw`R = \frac{n - 1}{D_1} = 0{,}125\ \text{м}` },
      { title: 'Система (как в 28.39)', tex: String.raw`D_2 = \frac{2n}{R} = \frac{3}{0{,}125} = 24\ \text{дптр}` },
    ],
    answer: [String.raw`D_2 = 24\ \text{дптр}`],
  },

  /* ===================== 28.41 ===================== */
  {
    id: '28.41', chapter: CH, section: S2, page: '388',
    title: 'Выпуклое зеркало под слоем воды',
    given: [[String.raw`R = 20\ \text{см}`, ''], [String.raw`n = 1{,}33`, '']],
    find: String.raw`f \;—\; ?`,
    formulas: [MIR, LENS],
    steps: [
      { title: 'Слой — плосковогнутая водяная линза, проходится дважды', tex: String.raw`D = -2\frac{n - 1}R - \frac2R = -\frac{2n}{R}` },
      { title: 'Фокус', tex: String.raw`f = -\frac{R}{2n} = -\frac{20}{2{,}66} = -7{,}5\ \text{см}` },
    ],
    answer: [String.raw`f = -7{,}5\ \text{см}\ (\text{книга: } -8\ \text{см})`],
    note: SMALL + 'В книге −8 см — грубое округление. Точно −R/(2n) = −7,5 см.',
  },

  /* ===================== 28.42 ===================== */
  {
    id: '28.42', chapter: CH, section: S2, page: '388',
    title: 'Очки для близорукого',
    given: [[String.raw`a = 12{,}5\ \text{см}`, ''], [String.raw`D_0 = 25\ \text{см}`, '']],
    find: String.raw`D \;—\; ?`,
    formulas: [LENS],
    steps: [{ title: 'Книга на 25 см даёт мнимое изображение на 12,5 см', tex: String.raw`D = \frac1{0{,}25} - \frac1{0{,}125} = 4 - 8 = -4\ \text{дптр}` }],
    answer: [String.raw`D = -4\ \text{дптр}`],
  },

  /* ===================== 28.43 ===================== */
  {
    id: '28.43', chapter: CH, section: S2, page: '388–389',
    title: 'Ближняя точка в очках',
    given: [[String.raw`a_1 = 16\ \text{см},\ a_2 = 80\ \text{см}`, '']],
    find: String.raw`d \;—\; ?`,
    formulas: [LENS],
    steps: [
      { title: 'Очки для дали', text: 'Изображение бесконечно далёкого предмета должно оказаться на дальней границе 80 см.', tex: String.raw`f = -80\ \text{см}` },
      { title: 'Ближняя точка', text: 'Мнимое изображение книги должно лежать на 16 см.', tex: String.raw`\frac1d = \frac1f + \frac1{16} = -\frac1{80} + \frac1{16} = \frac1{20}\ \Rightarrow\ d = 20\ \text{см}` },
    ],
    answer: [String.raw`d = 20\ \text{см}`],
  },

  /* ===================== 28.44 ===================== */
  {
    id: '28.44', chapter: CH, section: S2, page: '389',
    title: 'Увеличение лупы',
    given: [[String.raw`n = 1{,}6`, ''], [String.raw`R = 12\ \text{см}`, '']],
    find: String.raw`\Gamma \;—\; ?`,
    formulas: [LENS, MAG],
    steps: [
      { title: 'Фокус', tex: String.raw`f = \frac{R}{2(n - 1)} = \frac{12}{1{,}2} = 10\ \text{см}` },
      { title: 'Увеличение', tex: String.raw`\Gamma = \frac{25}{10} = 2{,}5` },
    ],
    answer: [String.raw`\Gamma = 2{,}5`],
  },

  /* ===================== 28.45 ===================== */
  {
    id: '28.45', chapter: CH, section: S2, page: '389',
    title: 'Составная лупа',
    given: [[String.raw`\Gamma = 2`, ''], [String.raw`D_1 = 20\ \text{дптр}`, '']],
    find: String.raw`\Gamma_2 \;—\; ?`,
    formulas: [MAG, { tex: String.raw`D = D_1 + D_2`, text: 'сложенные вплотную линзы' }],
    steps: [
      { title: 'Оптическая сила лупы', tex: String.raw`D_\text{л} = \frac\Gamma{0{,}25} = 8\ \text{дптр}` },
      { title: 'Составная', tex: String.raw`\Gamma_2 = (8 + 20)\cdot0{,}25 = 7` },
    ],
    answer: [String.raw`\Gamma_2 = 7`],
  },

  /* ===================== 28.46 ===================== */
  {
    id: '28.46', chapter: CH, section: S2, page: '389',
    title: 'Увеличение телескопа',
    given: [[String.raw`D_\text{об} = 0{,}5\ \text{дптр}`, String.raw`f_\text{об} = 2\ \text{м}`], [String.raw`\Gamma_1 = 10`, String.raw`f_\text{ок} = 2{,}5\ \text{см}`]],
    find: String.raw`\Gamma_2 \;—\; ?`,
    formulas: [MAG],
    steps: [{ title: 'Увеличение', tex: String.raw`\Gamma_2 = \frac{200}{2{,}5} = 80` }],
    answer: [String.raw`\Gamma_2 = 80`],
  },

  /* ===================== 28.47 ===================== */
  {
    id: '28.47', chapter: CH, section: S2, page: '389',
    title: 'Один объектив без окуляра',
    given: [[String.raw`f_\text{ок} = 50\ \text{мм}`, ''], [String.raw`\Gamma_1 = 60`, '']],
    find: String.raw`\Gamma_2 \;—\; ?`,
    formulas: [MAG],
    steps: [
      { title: 'Фокус объектива', tex: String.raw`f_\text{об} = \Gamma_1f_\text{ок} = 3\ \text{м}` },
      { title: 'Изображение размером f_об·α видно с 25 см', tex: String.raw`\Gamma_2 = \frac{f_\text{об}\alpha/D}{\alpha} = \frac{3}{0{,}25} = 12` },
    ],
    answer: [String.raw`\Gamma_2 = 12`],
  },

  /* ===================== 28.48 ===================== */
  {
    id: '28.48', chapter: CH, section: S2, page: '389',
    title: 'Перефокусировка телескопа',
    given: [[String.raw`f_1 = 1\ \text{м}`, ''], [String.raw`a = 1\ \text{км}`, ''], [String.raw`a_1 = 100\ \text{м}`, '']],
    find: String.raw`\Delta_1,\ \Delta_2 \;—\; ?`,
    formulas: [LENS],
    steps: [
      { title: 'Изображение здания', tex: String.raw`b = \frac{af}{a - f} = \frac{1000}{999} = 1{,}0010\ \text{м}` },
      { title: '1) Луна (b = f)', tex: String.raw`\Delta_1 = 1{,}0010 - 1{,}0000 = 1\ \text{мм}\ \text{к объективу}` },
      { title: '2) Предмет на 100 м', tex: String.raw`b_1 = \frac{100}{99} = 1{,}0101\ \text{м},\quad \Delta_2 = 1{,}0101 - 1{,}0010 = 9\ \text{мм}\ \text{от объектива}` },
    ],
    answer: [String.raw`1)\ \text{к объективу на 1 мм};\quad 2)\ \text{от объектива на 9 мм}`],
  },

  /* ===================== 28.49 ===================== */
  {
    id: '28.49', chapter: CH, section: S2, page: '389',
    title: 'Проекция Солнца на экран',
    given: [[String.raw`f_1 = 3\ \text{м}`, ''], [String.raw`f_2 = 50\ \text{мм}`, ''], [String.raw`b = 60\ \text{см}`, ''], [String.raw`\alpha = 32'`, String.raw`9{,}31\cdot10^{-3}\ \text{рад}`]],
    find: String.raw`d \;—\; ?`,
    formulas: [LENS],
    steps: [
      { title: 'Изображение в объективе', tex: String.raw`d_0 = f_1\alpha = 3\cdot9{,}31\cdot10^{-3} = 2{,}79\ \text{см}` },
      { title: 'Окуляр как проекционная линза', tex: String.raw`a = \frac{bf_2}{b - f_2} = \frac{60\cdot5}{55} = 5{,}45\ \text{см},\quad \Gamma = \frac ba = 11` },
      { title: 'Диаметр на экране', tex: String.raw`d = 11\cdot2{,}79 = 30{,}7\ \text{см}` },
    ],
    answer: [String.raw`d = 30{,}7\ \text{см}`],
    note: SMALL + 'В книге 30,3 см (разница 1,4 %); с α = 32′ = 9,31·10⁻³ рад выходит 30,7 см.',
  },

  /* ===================== 28.50 ===================== */
  {
    id: '28.50', chapter: CH, section: S2, page: '389',
    title: 'Увеличение микроскопа по положению предмета',
    given: [[String.raw`f_1 = 8\ \text{мм},\ f_2 = 4\ \text{см}`, ''], [String.raw`\Delta a = 0{,}5\ \text{мм}`, '']],
    find: String.raw`\Gamma \;—\; ?`,
    formulas: [LENS, MAG],
    steps: [
      { title: 'Объектив', tex: String.raw`a = 8{,}5\ \text{мм},\quad b = \frac{8{,}5\cdot8}{0{,}5} = 136\ \text{мм},\quad \Gamma_\text{об} = \frac ba = 16` },
      { title: 'Окуляр-лупа и итог', tex: String.raw`\Gamma_\text{ок} = \frac{25}{4} = 6{,}25,\quad \Gamma = 16\cdot6{,}25 = 100` },
    ],
    answer: [String.raw`\Gamma = 100`],
  },

  /* ===================== 28.51 ===================== */
  {
    id: '28.51', chapter: CH, section: S2, page: '389',
    title: 'Увеличение микроскопа и положение предмета',
    given: [[String.raw`f_1 = 1\ \text{см},\ f_2 = 2\ \text{см}`, ''], [String.raw`L = 23\ \text{см}`, '']],
    find: String.raw`\Gamma,\ a \;—\; ?`,
    formulas: [LENS, MAG],
    steps: [
      { title: 'Оптический интервал', tex: String.raw`\Delta = L - f_1 - f_2 = 20\ \text{см},\quad \Gamma = \frac{25\cdot20}{1\cdot2} = 250` },
      { title: 'Предмет', text: 'Промежуточное изображение — в переднем фокусе окуляра, на b = f₁ + Δ = 21 см от объектива.', tex: String.raw`a = \frac{bf_1}{b - f_1} = \frac{21}{20} = 1{,}05\ \text{см}` },
    ],
    answer: [String.raw`\Gamma = 250;\quad a = 10{,}5\ \text{мм}`],
  },

  /* ===================== 28.52 ===================== */
  {
    id: '28.52', chapter: CH, section: S2, page: '389',
    title: 'Окуляр для увеличения 500',
    given: [[String.raw`\Delta = 16\ \text{см}`, ''], [String.raw`f_1 = 1\ \text{мм}`, String.raw`0{,}1\ \text{см}`], [String.raw`\Gamma = 500`, '']],
    find: String.raw`f_2 \;—\; ?`,
    formulas: [MAG],
    steps: [{ title: 'Фокус окуляра', tex: String.raw`f_2 = \frac{D\Delta}{f_1\Gamma} = \frac{25\cdot16}{0{,}1\cdot500} = 8\ \text{см}` }],
    answer: [String.raw`f_2 = 8\ \text{см}`],
    note: MISMATCH + 'В книге 2 см. По формуле Γ = DΔ/(f₁f₂) с данными условия выходит 8 см; при f₂ = 2 см увеличение было бы 2000.',
  }

  );
})();
