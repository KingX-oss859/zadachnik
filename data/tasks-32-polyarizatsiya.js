/*
  § 32. Поляризация света — задачи 32.1–32.22 (стр. 420–422).
  Условия задач показываются дословно из книги (data/book-tasks.js).
  Ответы пересчитаны скриптом tools/check_polyarizatsiya.py и сверены с book/99-otvety.md.
  n воды = 1,33; алмаза 2,42 (табл. 19).
*/
(function () {
  const CH = 'Гл. 6. Оптика';
  const S1 = 'Закон Брюстера. Закон Малюса';
  const S2 = 'Степень поляризации света';
  const S3 = 'Вращение плоскости поляризации';
  const MISMATCH = '<b>Расхождение с ответом книги.</b> ';
  const SMALL = '<b>Расхождение в последней цифре.</b> ';

  const BREW = { tex: String.raw`\operatorname{tg}\varepsilon_\text{B} = n_{21},\quad \varepsilon_\text{B} + \varepsilon_2' = 90^\circ`, text: 'закон Брюстера: отражённый и преломлённый лучи перпендикулярны' };
  const MALUS = { tex: String.raw`I = I_0\cos^2\alpha`, text: 'закон Малюса; естественный свет поляризатор ослабляет вдвое' };
  const DEG = { tex: String.raw`P = \frac{I_{\max} - I_{\min}}{I_{\max} + I_{\min}},\quad I(\alpha) = I_{\max}\cos^2\alpha + I_{\min}\sin^2\alpha`, text: 'степень поляризации; интенсивность за анализатором' };
  const ROTA = { tex: String.raw`\varphi = \alpha d,\quad \varphi = [\alpha]\rho d,\quad \varphi = [\alpha]Cd`, text: 'вращение плоскости поляризации: кристалл, чистая жидкость, раствор' };

  window.TASKS.push(

  /* ===================== 32.1 ===================== */
  {
    id: '32.1', chapter: CH, section: S1, page: '420',
    title: 'Угол преломления при угле Брюстера',
    given: [[String.raw`\varepsilon_1 = 54^\circ = \varepsilon_\text{B}`, '']],
    find: String.raw`\varepsilon_2' \;—\; ?`,
    formulas: [BREW],
    steps: [{ title: 'Отражённый ⟂ преломлённому', tex: String.raw`\varepsilon_2' = 90^\circ - 54^\circ = 36^\circ` }],
    answer: [String.raw`\varepsilon_2' = 36^\circ`],
  },

  /* ===================== 32.2 ===================== */
  {
    id: '32.2', chapter: CH, section: S1, page: '420',
    title: 'Высота Солнца для поляризации отражения от воды',
    given: [[String.raw`n = 1{,}33`, '']],
    find: String.raw`\varphi \;—\; ?`,
    formulas: [BREW],
    steps: [{ title: 'Высота = 90° − ε_B', tex: String.raw`\varepsilon_\text{B} = \operatorname{arctg}1{,}33 = 53^\circ\ \Rightarrow\ \varphi = 37^\circ` }],
    answer: [String.raw`\varphi = 37^\circ`],
  },

  /* ===================== 32.3 ===================== */
  {
    id: '32.3', chapter: CH, section: S1, page: '420',
    title: 'Алмаз в воде',
    given: [[String.raw`n_1 = 1{,}33,\ n_2 = 2{,}42`, '']],
    find: String.raw`\varepsilon_\text{B} \;—\; ?`,
    formulas: [BREW],
    steps: [{ title: 'Угол', tex: String.raw`\operatorname{tg}\varepsilon_\text{B} = \frac{2{,}42}{1{,}33} = 1{,}820\ \Rightarrow\ \varepsilon_\text{B} = 61^\circ12'` }],
    answer: [String.raw`\varepsilon_\text{B} = 61^\circ12'`],
  },

  /* ===================== 32.4 ===================== */
  {
    id: '32.4', chapter: CH, section: S1, page: '420',
    title: 'Скорость света в каменной соли',
    given: [[String.raw`\varepsilon_\text{B} = 57^\circ`, '']],
    find: String.raw`v \;—\; ?`,
    formulas: [BREW, { tex: String.raw`v = \frac cn`, text: 'скорость света в среде' }],
    steps: [{ title: 'n = tg 57° = 1,540', tex: String.raw`v = \frac{3\cdot10^8}{1{,}540} = 1{,}95\cdot10^8\ \text{м/с}` }],
    answer: [String.raw`v = 195\ \text{Мм/с}`],
    note: SMALL + 'В книге 194 Мм/с; точно 194,8.',
  },

  /* ===================== 32.5 ===================== */
  {
    id: '32.5', chapter: CH, section: S1, page: '420',
    title: 'Угол Брюстера по предельному углу',
    given: [[String.raw`\varepsilon_\text{пр} = 43^\circ`, '']],
    find: String.raw`\varepsilon_\text{B} \;—\; ?`,
    formulas: [BREW, { tex: String.raw`\sin\varepsilon_\text{пр} = \frac1n`, text: 'предельный угол полного отражения' }],
    steps: [{ title: 'Показатель и угол', tex: String.raw`n = \frac{1}{\sin43^\circ} = 1{,}466\ \Rightarrow\ \varepsilon_\text{B} = \operatorname{arctg}1{,}466 = 55^\circ42'` }],
    answer: [String.raw`\varepsilon_\text{B} = 55^\circ42'`],
    note: SMALL + 'В книге 55°45′.',
  },

  /* ===================== 32.6 ===================== */
  {
    id: '32.6', chapter: CH, section: S1, page: '420',
    title: 'Угол призмы для полной поляризации',
    given: [[String.raw`n = 1{,}6`, '']],
    find: String.raw`\theta \;—\; ?`,
    formulas: [BREW],
    steps: [
      { title: 'Геометрия (рис. 32.3)', text: 'Пучок идёт параллельно основанию, грань наклонена к нему под углом θ, поэтому угол падения 90° − θ.' },
      { title: 'Угол призмы', tex: String.raw`90^\circ - \theta = \operatorname{arctg}1{,}6 = 58^\circ\ \Rightarrow\ \theta = 32^\circ` },
    ],
    answer: [String.raw`\theta = 32^\circ`],
  },

  /* ===================== 32.7 ===================== */
  {
    id: '32.7', chapter: CH, section: S1, page: '420',
    title: 'Алмазная призма в среде',
    given: [[String.raw`n_2 = 2{,}42`, ''], [String.raw`\text{грань под }30^\circ\ \text{к пучку (рис. 32.4)}`, '']],
    find: String.raw`n_1 \;—\; ?`,
    formulas: [BREW],
    steps: [
      { title: 'Угол падения', tex: String.raw`\varepsilon_\text{B} = 90^\circ - 30^\circ = 60^\circ` },
      { title: 'Показатель среды', tex: String.raw`\frac{n_2}{n_1} = \operatorname{tg}60^\circ\ \Rightarrow\ n_1 = \frac{2{,}42}{1{,}732} = 1{,}40` },
    ],
    answer: [String.raw`n_1 = 1{,}40`],
    note: MISMATCH + 'В книге 1,52. При геометрии рис. 32.4 (как в 32.6, где ответ книги сходится) угол падения 60°, отсюда n₁ = 2,42/tg 60° = 1,40. Ответ 1,52 соответствовал бы углу падения 57,9°.',
  },

  /* ===================== 32.8 ===================== */
  {
    id: '32.8', chapter: CH, section: S1, page: '421',
    title: 'Капля воды: угол φ в точке A',
    given: [[String.raw`n = 1{,}33`, '']],
    find: String.raw`\varphi \;—\; ?`,
    formulas: [BREW],
    steps: [
      { title: 'В точке A отражённый луч полностью поляризован', tex: String.raw`\varepsilon_\text{B} = \operatorname{arctg}1{,}33 = 53^\circ` },
      { title: 'Угол φ на рис. 32.5', text: 'Угол между продолжением падающего луча и отражённым лучом складывается из двух углов Брюстера, по разные стороны от нормали OA.', tex: String.raw`\varphi = 2\varepsilon_\text{B} = 106^\circ` },
    ],
    answer: [String.raw`\varphi = 106^\circ`],
  },

  /* ===================== 32.9 ===================== */
  {
    id: '32.9', chapter: CH, section: S1, page: '421',
    title: 'Стеклянный шар: угол γ',
    given: [[String.raw`n = 1{,}54`, '']],
    find: String.raw`\gamma \;—\; ?`,
    formulas: [BREW],
    steps: [
      { title: 'Углы в точке A', tex: String.raw`\varepsilon_\text{B} = \operatorname{arctg}1{,}54 = 57^\circ,\quad \varepsilon_2' = 90^\circ - 57^\circ = 33^\circ` },
      { title: 'Угол между падающим и преломлённым лучами', tex: String.raw`\gamma = 180^\circ - (\varepsilon_\text{B} - \varepsilon_2') = 180^\circ - 24^\circ = 156^\circ` },
    ],
    answer: [String.raw`\gamma = 156^\circ`],
  },

  /* ===================== 32.10 ===================== */
  {
    id: '32.10', chapter: CH, section: S1, page: '421',
    title: 'Стеклянный шар в воде',
    given: [[String.raw`n_1 = 1{,}33,\ n_2 = 1{,}58`, '']],
    find: String.raw`\varphi \;—\; ?`,
    formulas: [BREW],
    steps: [{ title: 'Как в 32.8', tex: String.raw`\varepsilon_\text{B} = \operatorname{arctg}\frac{1{,}58}{1{,}33} = 49{,}9^\circ\ \Rightarrow\ \varphi = 2\varepsilon_\text{B} \approx 100^\circ` }],
    answer: [String.raw`\varphi = 100^\circ`],
  },

  /* ===================== 32.11 ===================== */
  {
    id: '32.11', chapter: CH, section: S1, page: '421',
    title: 'Анализатор ослабляет вдвое',
    given: [[String.raw`k = 2`, '']],
    find: String.raw`\alpha \;—\; ?`,
    formulas: [MALUS],
    steps: [{ title: 'cos²α = 1/2', tex: String.raw`\alpha = 45^\circ` }],
    answer: [String.raw`\alpha = 45^\circ`],
  },

  /* ===================== 32.12 ===================== */
  {
    id: '32.12', chapter: CH, section: S1, page: '421',
    title: 'Угол увеличили с 45° до 60°',
    given: [[String.raw`\alpha_1 = 45^\circ,\ \alpha_2 = 60^\circ`, '']],
    find: String.raw`I_1/I_2 \;—\; ?`,
    formulas: [MALUS],
    steps: [{ title: 'Отношение', tex: String.raw`\frac{I_1}{I_2} = \frac{\cos^245^\circ}{\cos^260^\circ} = \frac{0{,}5}{0{,}25} = 2` }],
    answer: [String.raw`\text{уменьшится в 2 раза}`],
  },

  /* ===================== 32.13 ===================== */
  {
    id: '32.13', chapter: CH, section: S1, page: '421',
    title: 'Два николя с потерями',
    given: [[String.raw`\alpha = 30^\circ`, ''], [String.raw`\text{потери }10\%\ \text{в каждом}`, '']],
    find: String.raw`I_0/I \;—\; ?`,
    formulas: [MALUS],
    steps: [{ title: 'Естественный свет → поляризатор → анализатор', tex: String.raw`I = \frac{I_0}{2}\cdot0{,}9\cdot\cos^230^\circ\cdot0{,}9 = 0{,}304I_0\ \Rightarrow\ \frac{I_0}I = 3{,}3` }],
    answer: [String.raw`\text{в 3,3 раза}`],
  },

  /* ===================== 32.14 ===================== */
  {
    id: '32.14', chapter: CH, section: S1, page: '421',
    title: 'Фотометр с николями',
    given: [[String.raw`L_1 = 5\cdot10^3\ \text{кд/м}^2`, ''], [String.raw`\alpha = 45^\circ`, ''], [String.raw`\text{потери }8\%\ \text{в каждом}`, '']],
    find: String.raw`L_2 \;—\; ?`,
    formulas: [MALUS],
    steps: [{ title: 'Яркости сравнялись', tex: String.raw`L_2\cdot\frac12\cdot0{,}92\cdot\cos^245^\circ\cdot0{,}92 = L_1\ \Rightarrow\ L_2 = \frac{5\cdot10^3}{0{,}2116} = 2{,}36\cdot10^4\ \text{кд/м}^2` }],
    answer: [String.raw`L_2 = 23{,}6\ \text{ккд/м}^2`],
  },

  /* ===================== 32.15 ===================== */
  {
    id: '32.15', chapter: CH, section: S2, page: '422',
    title: 'Степень поляризации по отношению амплитуд',
    given: [[String.raw`A_{\max}/A_{\min} = 2`, '']],
    find: String.raw`P \;—\; ?`,
    formulas: [DEG],
    steps: [
      { title: 'Интенсивность ∝ квадрату амплитуды', tex: String.raw`\frac{I_{\max}}{I_{\min}} = 2^2 = 4` },
      { title: 'Степень поляризации', tex: String.raw`P = \frac{4 - 1}{4 + 1} = 0{,}6` },
    ],
    answer: [String.raw`P = 0{,}6`],
    note: MISMATCH + 'В книге 0,33 = (2 − 1)/(2 + 1): в формулу подставлено отношение амплитуд, а не интенсивностей. Условие говорит именно об амплитудах, I ∝ A², поэтому P = 0,6.',
  },

  /* ===================== 32.16 ===================== */
  {
    id: '32.16', chapter: CH, section: S2, page: '422',
    title: 'Отношение интенсивностей при P = 0,5',
    given: [[String.raw`P = 0{,}5`, '']],
    find: String.raw`I_{\max}/I_{\min} \;—\; ?`,
    formulas: [DEG],
    steps: [{ title: 'Выражаем отношение', tex: String.raw`\frac{I_{\max}}{I_{\min}} = \frac{1 + P}{1 - P} = \frac{1{,}5}{0{,}5} = 3` }],
    answer: [String.raw`\text{в 3 раза}`],
  },

  /* ===================== 32.17 ===================== */
  {
    id: '32.17', chapter: CH, section: S2, page: '422',
    title: 'Поворот анализатора на 30°',
    given: [[String.raw`P = 0{,}6`, ''], [String.raw`\alpha = 30^\circ`, '']],
    find: String.raw`I_{\max}/I \;—\; ?`,
    formulas: [DEG],
    steps: [
      { title: 'Отношение', tex: String.raw`\frac{I_{\max}}{I_{\min}} = \frac{1{,}6}{0{,}4} = 4` },
      { title: 'После поворота', tex: String.raw`I = I_{\max}\cos^230^\circ + I_{\min}\sin^230^\circ = I_{\min}(4\cdot0{,}75 + 0{,}25) = 3{,}25I_{\min}\ \Rightarrow\ \frac{I_{\max}}I = \frac{4}{3{,}25} = 1{,}23` },
    ],
    answer: [String.raw`\text{в 1,23 раза}`],
  },

  /* ===================== 32.18 ===================== */
  {
    id: '32.18', chapter: CH, section: S2, page: '422',
    title: 'Степень поляризации по повороту на 45°',
    given: [[String.raw`\beta = 45^\circ`, ''], [String.raw`k = 1{,}5`, '']],
    find: String.raw`P \;—\; ?`,
    formulas: [DEG],
    steps: [
      { title: 'От положения минимума на 45°', tex: String.raw`I = I_{\min}\cos^245^\circ + I_{\max}\sin^245^\circ = \frac{I_{\min} + I_{\max}}{2} = 1{,}5I_{\min}\ \Rightarrow\ I_{\max} = 2I_{\min}` },
      { title: 'Степень поляризации', tex: String.raw`P = \frac{2 - 1}{2 + 1} = 0{,}333` },
    ],
    answer: [String.raw`P = 0{,}333`],
    note: MISMATCH + 'В книге 0,348. При β = 45° I = (I_min + I_max)/2, и из k = 1,5 точно следует I_max = 2I_min, то есть P = 1/3.',
  },

  /* ===================== 32.19 ===================== */
  {
    id: '32.19', chapter: CH, section: S3, page: '422',
    title: 'Кварцевая пластинка между николями',
    given: [[String.raw`d_1 = 2\ \text{мм}`, ''], [String.raw`\varphi = 53^\circ`, '']],
    find: String.raw`d_2 \;—\; ?`,
    formulas: [ROTA],
    steps: [
      { title: 'Постоянная вращения', tex: String.raw`\alpha = \frac{53^\circ}{2\ \text{мм}} = 26{,}5^\circ/\text{мм}` },
      { title: 'Параллельные николи гасят свет при повороте на 90°', tex: String.raw`d_2 = \frac{90^\circ}{26{,}5^\circ/\text{мм}} = 3{,}4\ \text{мм}` },
    ],
    answer: [String.raw`d_2 = 3{,}4\ \text{мм}`],
  },

  /* ===================== 32.20 ===================== */
  {
    id: '32.20', chapter: CH, section: S3, page: '422',
    title: 'Удельное вращение никотина',
    given: [[String.raw`d = 8\ \text{см}`, String.raw`0{,}8\ \text{дм}`], [String.raw`\varphi = 137^\circ`, ''], [String.raw`\rho = 1{,}01\cdot10^3\ \text{кг/м}^3`, String.raw`1{,}01\ \text{г/см}^3`]],
    find: String.raw`[\alpha] \;—\; ?`,
    formulas: [ROTA],
    steps: [{ title: 'Чистая жидкость', tex: String.raw`[\alpha] = \frac{\varphi}{\rho d} = \frac{137}{1{,}01\cdot0{,}8} = 170\ \text{град·см}^3\text{/(дм·г)}` }],
    answer: [String.raw`[\alpha] = 170\ \text{град·см}^3\text{/(дм·г)}`],
    note: SMALL + 'В книге 169; точно 169,6.',
  },

  /* ===================== 32.21 ===================== */
  {
    id: '32.21', chapter: CH, section: S3, page: '422',
    title: 'Концентрация глюкозы',
    given: [[String.raw`C_1 = 280\ \text{кг/м}^3`, ''], [String.raw`\varphi_1 = 32^\circ,\ \varphi_2 = 24^\circ`, '']],
    find: String.raw`C_2 \;—\; ?`,
    formulas: [ROTA],
    steps: [{ title: 'φ ∝ C', tex: String.raw`C_2 = C_1\frac{\varphi_2}{\varphi_1} = 280\cdot\frac{24}{32} = 210\ \text{кг/м}^3` }],
    answer: [String.raw`C_2 = 0{,}21\ \text{г/см}^3`],
  },

  /* ===================== 32.22 ===================== */
  {
    id: '32.22', chapter: CH, section: S3, page: '422',
    title: 'Плотность сахарного раствора',
    given: [[String.raw`\varphi = 40^\circ`, String.raw`0{,}698\ \text{рад}`], [String.raw`d = 15\ \text{см}`, String.raw`0{,}15\ \text{м}`], [String.raw`[\alpha] = 1{,}17\cdot10^{-2}\ \text{рад·м}^3\text{/(м·кг)}`, '']],
    find: String.raw`\rho \;—\; ?`,
    formulas: [ROTA],
    steps: [{ title: 'Массовая концентрация сахара', tex: String.raw`\rho = \frac{\varphi}{[\alpha]d} = \frac{0{,}698}{1{,}17\cdot10^{-2}\cdot0{,}15} = 398\ \text{кг/м}^3` }],
    answer: [String.raw`\rho \approx 0{,}4\ \text{г/см}^3`],
  }

  );
})();
