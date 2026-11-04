/*
  § 17. Электрическая ёмкость. Конденсаторы — задачи 17.1–17.25 (стр. 273–276).
  Условия задач показываются дословно из книги (data/book-tasks.js).
  Ответы пересчитаны скриптом tools/check_emkost.py и сверены с book/99-otvety.md.
  Где ответ книги расходится с расчётом — плашка note «Расхождение с ответом книги».
  ε₀ = 8,85·10⁻¹² Ф/м; ε — табл. 17: вода 81, слюда 7, стекло 7, парафин 2, фарфор 5, эбонит 3.
*/
(function () {
  const CH = 'Гл. 3. Электростатика';
  const S1 = 'Электрическая ёмкость проводящей сферы';
  const S2 = 'Электрическая ёмкость плоского конденсатора';
  const S3 = 'Электрическая ёмкость сферического конденсатора';
  const S4 = 'Соединения конденсаторов';
  const MISMATCH = '<b>Расхождение с ответом книги.</b> ';
  const SMALL = '<b>Расхождение в последней цифре.</b> ';
  const TYPO = '<b>Опечатка в ответе книги.</b> ';

  const CDEF = { tex: String.raw`C = \frac{Q}{\varphi},\quad C = \frac{Q}{U}`, text: 'ёмкость проводника и конденсатора' };
  const CSPH = { tex: String.raw`C = 4\pi\varepsilon_0\varepsilon R`, text: 'ёмкость уединённого шара (сферы) в среде с проницаемостью ε' };
  const CFLAT = { tex: String.raw`C = \frac{\varepsilon\varepsilon_0S}{d}`, text: 'ёмкость плоского конденсатора' };
  const CLAY = { tex: String.raw`C = \frac{\varepsilon_0S}{d_1/\varepsilon_1 + d_2/\varepsilon_2 + \ldots}`, text: 'плоский конденсатор со слоями диэлектриков' };
  const CSC = { tex: String.raw`C = \frac{4\pi\varepsilon_0\varepsilon R_1R_2}{R_2 - R_1}`, text: 'ёмкость сферического конденсатора' };
  const PAR = { tex: String.raw`C = C_1 + C_2 + \ldots`, text: 'параллельное соединение: напряжения одинаковы, заряды складываются' };
  const SER = { tex: String.raw`\frac1C = \frac{1}{C_1} + \frac{1}{C_2} + \ldots`, text: 'последовательное соединение: заряды одинаковы, напряжения складываются' };
  const QCONS = { tex: String.raw`\sum Q = \text{const}`, text: 'при соединении заряженных проводников общий заряд сохраняется' };

  window.TASKS.push(

  /* ===================== 17.1 ===================== */
  {
    id: '17.1', chapter: CH, section: S1, page: '273',
    title: 'Ёмкость шара радиусом 1 см',
    given: [[String.raw`R = 1\ \text{см}`, String.raw`0{,}01\ \text{м}`]],
    find: String.raw`C \;—\; ?`,
    formulas: [CSPH],
    steps: [
      { title: 'Ёмкость шара в воздухе (ε = 1)',
        tex: String.raw`C = 4\pi\cdot8{,}85\cdot10^{-12}\cdot0{,}01 = 1{,}11\cdot10^{-12}\ \text{Ф}` },
    ],
    answer: [String.raw`C = 1{,}11\ \text{пФ}`],
  },

  /* ===================== 17.2 ===================== */
  {
    id: '17.2', chapter: CH, section: S1, page: '273',
    title: 'Сфера в воде',
    given: [[String.raw`R = 2\ \text{см}`, String.raw`0{,}02\ \text{м}`], [String.raw`\varepsilon = 81\ (\text{вода})`, '']],
    find: String.raw`C \;—\; ?`,
    formulas: [CSPH],
    steps: [
      { title: 'Ёмкость',
        tex: String.raw`C = 4\pi\cdot8{,}85\cdot10^{-12}\cdot81\cdot0{,}02 = 1{,}80\cdot10^{-10}\ \text{Ф}` },
    ],
    answer: [String.raw`C = 180\ \text{пФ}`],
  },

  /* ===================== 17.3 ===================== */
  {
    id: '17.3', chapter: CH, section: S1, page: '273',
    title: 'Ёмкость Земли',
    given: [[String.raw`R = 6400\ \text{км}`, String.raw`6{,}4\cdot10^6\ \text{м}`]],
    find: String.raw`C \;—\; ?`,
    formulas: [CSPH],
    steps: [
      { title: 'Ёмкость',
        text: 'Даже такой огромный шар имеет ёмкость меньше миллифарада.',
        tex: String.raw`C = 4\pi\cdot8{,}85\cdot10^{-12}\cdot6{,}4\cdot10^6 = 7{,}12\cdot10^{-4}\ \text{Ф}` },
    ],
    answer: [String.raw`C = 712\ \text{мкФ}`],
  },

  /* ===================== 17.4 ===================== */
  {
    id: '17.4', chapter: CH, section: S1, page: '273',
    title: 'Два соединённых шара',
    given: [[String.raw`R_1 = 2\ \text{см}`, String.raw`0{,}02\ \text{м}`], [String.raw`R_2 = 6\ \text{см}`, String.raw`0{,}06\ \text{м}`], [String.raw`Q = 1\ \text{нКл}`, String.raw`10^{-9}\ \text{Кл}`]],
    find: String.raw`\sigma_1,\ \sigma_2 \;—\; ?`,
    formulas: [CSPH, QCONS],
    steps: [
      { title: 'Потенциалы шаров равны',
        text: 'Шары соединены — заряд распределяется пропорционально ёмкостям, т. е. радиусам.',
        tex: String.raw`\frac{Q_1}{R_1} = \frac{Q_2}{R_2},\ Q_1 + Q_2 = Q\ \Rightarrow\ Q_1 = Q\frac{R_1}{R_1 + R_2} = 0{,}25\ \text{нКл},\quad Q_2 = 0{,}75\ \text{нКл}` },
      { title: 'Поверхностные плотности',
        tex: String.raw`\sigma_1 = \frac{Q_1}{4\pi R_1^2} = \frac{2{,}5\cdot10^{-10}}{4\pi\cdot0{,}02^2} = 49{,}7\ \text{нКл/м}^2,\quad \sigma_2 = \frac{7{,}5\cdot10^{-10}}{4\pi\cdot0{,}06^2} = 16{,}6\ \text{нКл/м}^2` },
    ],
    answer: [String.raw`\sigma_1 = 49{,}7\ \text{нКл/м}^2;\quad \sigma_2 = 16{,}6\ \text{нКл/м}^2`],
    note: SMALL + 'В книге σ₁ = 49,8 нКл/м²; точно 49,74.',
  },

  /* ===================== 17.5 ===================== */
  {
    id: '17.5', chapter: CH, section: S1, page: '273',
    title: 'Потенциал шаров после соединения',
    given: [[String.raw`R_1 = 6\ \text{см},\ \varphi_1 = 300\ \text{В}`, ''], [String.raw`R_2 = 4\ \text{см},\ \varphi_2 = 500\ \text{В}`, '']],
    find: String.raw`\varphi \;—\; ?`,
    formulas: [CSPH, QCONS],
    steps: [
      { title: 'Сохранение заряда',
        text: 'Заряд шара Q = 4πε₀Rφ; после соединения потенциал общий.',
        tex: String.raw`R_1\varphi_1 + R_2\varphi_2 = (R_1 + R_2)\varphi\ \Rightarrow\ \varphi = \frac{6\cdot300 + 4\cdot500}{10} = 380\ \text{В}` },
    ],
    answer: [String.raw`\varphi = \frac{R_1\varphi_1 + R_2\varphi_2}{R_1 + R_2} = 380\ \text{В}`],
  },

  /* ===================== 17.6 ===================== */
  {
    id: '17.6', chapter: CH, section: S2, page: '273',
    title: 'Слюдяной конденсатор',
    given: [[String.raw`S = 100\ \text{см}^2`, String.raw`10^{-2}\ \text{м}^2`], [String.raw`d = 0{,}1\ \text{мм}`, String.raw`10^{-4}\ \text{м}`], [String.raw`\varepsilon = 7\ (\text{слюда})`, '']],
    find: String.raw`C \;—\; ?`,
    formulas: [CFLAT],
    steps: [
      { title: 'Ёмкость',
        tex: String.raw`C = \frac{7\cdot8{,}85\cdot10^{-12}\cdot10^{-2}}{10^{-4}} = 6{,}2\cdot10^{-9}\ \text{Ф}` },
    ],
    answer: [String.raw`C = 6{,}2\ \text{нФ}`],
  },

  /* ===================== 17.7 ===================== */
  {
    id: '17.7', chapter: CH, section: S2, page: '273',
    title: 'Конденсатор со слоями стекла и эбонита',
    given: [[String.raw`U = 600\ \text{В}`, ''], [String.raw`d_1 = 7\ \text{мм},\ \varepsilon_1 = 7`, String.raw`7\cdot10^{-3}\ \text{м}`], [String.raw`d_2 = 3\ \text{мм},\ \varepsilon_2 = 3`, String.raw`3\cdot10^{-3}\ \text{м}`], [String.raw`S = 200\ \text{см}^2`, String.raw`0{,}02\ \text{м}^2`]],
    find: String.raw`C,\ D,\ E_1,\ E_2,\ \Delta\varphi_1,\ \Delta\varphi_2 \;—\; ?`,
    formulas: [CLAY, { tex: String.raw`D = \sigma = \frac QS,\quad E = \frac{D}{\varepsilon_0\varepsilon}`, text: 'смещение одинаково во всех слоях; напряжённость в каждом слое своя' }],
    steps: [
      { title: '1) Ёмкость',
        tex: String.raw`C = \frac{8{,}85\cdot10^{-12}\cdot0{,}02}{0{,}007/7 + 0{,}003/3} = \frac{1{,}77\cdot10^{-13}}{0{,}002} = 8{,}85\cdot10^{-11}\ \text{Ф}` },
      { title: '2) Смещение',
        tex: String.raw`D = \frac{CU}{S} = \frac{8{,}85\cdot10^{-11}\cdot600}{0{,}02} = 2{,}66\cdot10^{-6}\ \text{Кл/м}^2` },
      { title: 'Напряжённости',
        tex: String.raw`E_1 = \frac{D}{7\varepsilon_0} = 42{,}9\ \text{кВ/м},\quad E_2 = \frac{D}{3\varepsilon_0} = 100\ \text{кВ/м}` },
      { title: 'Падения потенциала',
        tex: String.raw`\Delta\varphi_1 = E_1d_1 = 300\ \text{В},\quad \Delta\varphi_2 = E_2d_2 = 300\ \text{В}` },
    ],
    answer: [String.raw`C = 88{,}5\ \text{пФ}`, String.raw`D = 2{,}66\ \text{мкКл/м}^2;\ E_1 = 42{,}9\ \text{кВ/м};\ E_2 = 100\ \text{кВ/м}`, String.raw`\Delta\varphi_1 = \Delta\varphi_2 = 300\ \text{В}`],
    note: SMALL + 'В книге E₁ = 42,8 кВ/м; точно 42,86.',
  },

  /* ===================== 17.8 ===================== */
  {
    id: '17.8', chapter: CH, section: S2, page: '274',
    title: 'Слюда, эбонит и воздушный зазор',
    given: [[String.raw`d = 1{,}33\ \text{мм}`, String.raw`1{,}33\cdot10^{-3}\ \text{м}`], [String.raw`S = 20\ \text{см}^2`, String.raw`2\cdot10^{-3}\ \text{м}^2`], [String.raw`d_1 = 0{,}7\ \text{мм},\ \varepsilon_1 = 7`, ''], [String.raw`d_2 = 0{,}3\ \text{мм},\ \varepsilon_2 = 3`, '']],
    find: String.raw`C \;—\; ?`,
    formulas: [CLAY],
    steps: [
      { title: 'Три слоя',
        text: 'В условии напечатано «1,33 м» — по смыслу 1,33 мм. Слои занимают 1 мм, остальные 0,33 мм — воздух (ε₃ = 1).',
        tex: String.raw`\frac{d_1}{\varepsilon_1} + \frac{d_2}{\varepsilon_2} + \frac{d - d_1 - d_2}{1} = 0{,}1 + 0{,}1 + 0{,}33 = 0{,}53\ \text{мм}` },
      { title: 'Ёмкость',
        tex: String.raw`C = \frac{8{,}85\cdot10^{-12}\cdot2\cdot10^{-3}}{5{,}3\cdot10^{-4}} = 3{,}34\cdot10^{-11}\ \text{Ф}` },
    ],
    answer: [String.raw`C = 33{,}4\ \text{пФ}`],
    note: MISMATCH + 'В книге 35,4 пФ — так выходит, если воздушный зазор 0,3 мм (d = 1,3 мм). С d = 1,33 мм, как в условии, — 33,4 пФ.',
  },

  /* ===================== 17.9 ===================== */
  {
    id: '17.9', chapter: CH, section: S2, page: '274',
    title: 'Раздвигаем пластины заряженного конденсатора',
    given: [[String.raw`\sigma = 0{,}2\ \text{мкКл/м}^2`, String.raw`2\cdot10^{-7}\ \text{Кл/м}^2`], [String.raw`d_1 = 1\ \text{мм},\ d_2 = 3\ \text{мм}`, '']],
    find: String.raw`\Delta U \;—\; ?`,
    formulas: [{ tex: String.raw`E = \frac{\sigma}{\varepsilon_0},\quad U = Ed`, text: 'поле в плоском конденсаторе не зависит от расстояния между пластинами' }],
    steps: [
      { title: 'Поле не меняется',
        text: 'Заряд на пластинах тот же, значит, и E тот же; напряжение растёт пропорционально d.',
        tex: String.raw`\Delta U = \frac{\sigma}{\varepsilon_0}(d_2 - d_1) = \frac{2\cdot10^{-7}}{8{,}85\cdot10^{-12}}\cdot2\cdot10^{-3} = 45{,}2\ \text{В}` },
    ],
    answer: [String.raw`\Delta U = 45{,}2\ \text{В}`],
  },

  /* ===================== 17.10 ===================== */
  {
    id: '17.10', chapter: CH, section: S2, page: '274',
    title: 'Плитка парафина в конденсаторе',
    given: [[String.raw`d = 1\ \text{см}`, ''], [String.raw`\varepsilon = 2\ (\text{парафин})`, '']],
    find: String.raw`\Delta x \;—\; ?`,
    formulas: [CLAY],
    steps: [
      { title: '«Эквивалентная» толщина',
        text: 'Слой диэлектрика толщиной d действует на ёмкость как слой воздуха толщиной d/ε.',
        tex: String.raw`\frac{d_0 - d + d/\varepsilon + \Delta x}{1} = d_0\ \Rightarrow\ \Delta x = d - \frac d\varepsilon = 1 - 0{,}5 = 0{,}5\ \text{см}` },
    ],
    answer: [String.raw`\Delta x = 0{,}5\ \text{см}`],
  },

  /* ===================== 17.11 ===================== */
  {
    id: '17.11', chapter: CH, section: S2, page: '274',
    title: 'Лист эбонита на нижней пластине',
    given: [[String.raw`C_0 = 1{,}5\ \text{мкФ}`, ''], [String.raw`d = 5\ \text{мм}`, ''], [String.raw`d_1 = 3\ \text{мм},\ \varepsilon = 3`, '']],
    find: String.raw`C \;—\; ?`,
    formulas: [CFLAT, CLAY],
    steps: [
      { title: 'Через ε₀S = C₀d',
        tex: String.raw`C = \frac{\varepsilon_0S}{(d - d_1) + d_1/\varepsilon} = \frac{C_0d}{2 + 1} = \frac{1{,}5\cdot5}{3} = 2{,}5\ \text{мкФ}` },
    ],
    answer: [String.raw`C = 2{,}5\ \text{мкФ}`],
  },

  /* ===================== 17.12 ===================== */
  {
    id: '17.12', chapter: CH, section: S2, page: '274',
    title: 'Вытащили стекло из заряженного конденсатора',
    given: [[String.raw`U_1 = 100\ \text{В}`, ''], [String.raw`\varepsilon = 7\ (\text{стекло})`, '']],
    find: String.raw`U_2 \;—\; ?`,
    formulas: [CDEF, CFLAT],
    steps: [
      { title: 'Заряд сохраняется',
        text: 'Ёмкость падает в ε раз, напряжение во столько же раз растёт.',
        tex: String.raw`U_2 = \frac{Q}{C/\varepsilon} = \varepsilon U_1 = 7\cdot100 = 700\ \text{В}` },
    ],
    answer: [String.raw`U_2 = 700\ \text{В}`],
  },

  /* ===================== 17.13 ===================== */
  {
    id: '17.13', chapter: CH, section: S3, page: '274',
    title: 'Сферический конденсатор с парафином',
    given: [[String.raw`R_1 = 2\ \text{см}`, String.raw`0{,}02\ \text{м}`], [String.raw`R_2 = 2{,}1\ \text{см}`, String.raw`0{,}021\ \text{м}`], [String.raw`\varepsilon = 2`, '']],
    find: String.raw`C \;—\; ?`,
    formulas: [CSC],
    steps: [
      { title: 'Ёмкость',
        tex: String.raw`C = \frac{4\pi\cdot8{,}85\cdot10^{-12}\cdot2\cdot0{,}02\cdot0{,}021}{0{,}001} = 9{,}34\cdot10^{-11}\ \text{Ф}` },
    ],
    answer: [String.raw`C = 93{,}4\ \text{пФ}`],
    note: SMALL + 'В книге 93,3 пФ; точно 93,42.',
  },

  /* ===================== 17.14 ===================== */
  {
    id: '17.14', chapter: CH, section: S3, page: '274',
    title: 'Напряжение на сферическом конденсаторе',
    given: [[String.raw`R_1 = 10\ \text{см}`, String.raw`0{,}1\ \text{м}`], [String.raw`R_2 = 10{,}2\ \text{см}`, String.raw`0{,}102\ \text{м}`], [String.raw`\varepsilon = 2`, ''], [String.raw`Q = 5\ \text{мкКл}`, String.raw`5\cdot10^{-6}\ \text{Кл}`]],
    find: String.raw`U \;—\; ?`,
    formulas: [CSC, CDEF],
    steps: [
      { title: 'Ёмкость',
        tex: String.raw`C = \frac{4\pi\cdot8{,}85\cdot10^{-12}\cdot2\cdot0{,}1\cdot0{,}102}{0{,}002} = 1{,}13\cdot10^{-9}\ \text{Ф}` },
      { title: 'Напряжение',
        tex: String.raw`U = \frac QC = \frac{5\cdot10^{-6}}{1{,}13\cdot10^{-9}} = 4{,}41\cdot10^3\ \text{В}` },
    ],
    answer: [String.raw`U = 4{,}41\ \text{кВ}`],
  },

  /* ===================== 17.15 ===================== */
  {
    id: '17.15', chapter: CH, section: S4, page: '274',
    title: 'Проницаемость фарфора по падению напряжения',
    given: [[String.raw`U = 600\ \text{В}`, ''], [String.raw`U_1 = 100\ \text{В}`, '']],
    find: String.raw`\varepsilon \;—\; ?`,
    formulas: [PAR, QCONS],
    steps: [
      { title: 'Заряд сохраняется',
        text: 'Второй конденсатор такой же, но с фарфором: его ёмкость εC.',
        tex: String.raw`CU = (C + \varepsilon C)U_1\ \Rightarrow\ \varepsilon = \frac{U}{U_1} - 1 = 6 - 1 = 5` },
    ],
    answer: [String.raw`\varepsilon = 5`],
  },

  /* ===================== 17.16 ===================== */
  {
    id: '17.16', chapter: CH, section: S4, page: '274',
    title: 'Два конденсатора: параллельно и последовательно',
    given: [[String.raw`C_1 = 3\ \text{мкФ}`, ''], [String.raw`C_2 = 6\ \text{мкФ}`, ''], [String.raw`\mathcal E = 120\ \text{В}`, '']],
    find: String.raw`Q_1,\ Q_2,\ U_1,\ U_2 \;—\; ?`,
    formulas: [PAR, SER],
    steps: [
      { title: '1) Параллельно',
        tex: String.raw`U_1 = U_2 = 120\ \text{В};\quad Q_1 = 3\cdot120 = 360\ \text{мкКл},\quad Q_2 = 6\cdot120 = 720\ \text{мкКл}` },
      { title: '2) Последовательно',
        tex: String.raw`C = \frac{3\cdot6}{9} = 2\ \text{мкФ};\ Q_1 = Q_2 = 2\cdot120 = 240\ \text{мкКл};\ U_1 = \frac{240}{3} = 80\ \text{В},\ U_2 = 40\ \text{В}` },
    ],
    answer: [String.raw`1)\ Q_1 = 360\ \text{мкКл},\ Q_2 = 720\ \text{мкКл},\ U_1 = U_2 = 120\ \text{В}`, String.raw`2)\ Q_1 = Q_2 = 240\ \text{мкКл},\ U_1 = 80\ \text{В},\ U_2 = 40\ \text{В}`],
  },

  /* ===================== 17.17 ===================== */
  {
    id: '17.17', chapter: CH, section: S4, page: '275',
    title: 'Ёмкость второго конденсатора',
    given: [[String.raw`C_1 = 0{,}2\ \text{мкФ}`, ''], [String.raw`U_1 = 320\ \text{В}`, ''], [String.raw`U_2 = 450\ \text{В}`, ''], [String.raw`U = 400\ \text{В}`, '']],
    find: String.raw`C_2 \;—\; ?`,
    formulas: [PAR, QCONS],
    steps: [
      { title: 'Сохранение заряда',
        text: 'Конденсаторы соединили одноимёнными обкладками (напряжение выросло, а не упало).',
        tex: String.raw`C_1U_1 + C_2U_2 = (C_1 + C_2)U\ \Rightarrow\ C_2 = C_1\frac{U - U_1}{U_2 - U}` },
      { title: 'Считаем',
        tex: String.raw`C_2 = 0{,}2\cdot\frac{80}{50} = 0{,}32\ \text{мкФ}` },
    ],
    answer: [String.raw`C_2 = C_1\frac{U - U_1}{U_2 - U} = 0{,}32\ \text{мкФ}`],
    note: TYPO + 'В формуле книги знаменатель U₂ − U₁ — должно быть U₂ − U (с U₂ − U₁ выходит 0,123 мкФ). Число 0,32 мкФ в книге верное.',
  },

  /* ===================== 17.18 ===================== */
  {
    id: '17.18', chapter: CH, section: S4, page: '275',
    title: 'Сколько заряда перетекло',
    given: [[String.raw`C_1 = 0{,}6\ \text{мкФ},\ U_1 = 300\ \text{В}`, ''], [String.raw`C_2 = 0{,}4\ \text{мкФ},\ U_2 = 150\ \text{В}`, '']],
    find: String.raw`\Delta Q \;—\; ?`,
    formulas: [PAR, QCONS],
    steps: [
      { title: 'Общее напряжение',
        tex: String.raw`U = \frac{C_1U_1 + C_2U_2}{C_1 + C_2} = \frac{180 + 60}{1{,}0} = 240\ \text{В}` },
      { title: 'Перетёкший заряд',
        tex: String.raw`\Delta Q = C_1(U_1 - U) = 0{,}6\cdot60 = 36\ \text{мкКл} = \frac{C_1C_2}{C_1 + C_2}(U_1 - U_2)` },
    ],
    answer: [String.raw`\Delta Q = 36\ \text{мкКл}`],
  },

  /* ===================== 17.19 ===================== */
  {
    id: '17.19', chapter: CH, section: S4, page: '275',
    title: 'Толщина стекла в батарее из трёх конденсаторов',
    given: [[String.raw`n = 3`, ''], [String.raw`C = 89\ \text{пФ}`, String.raw`8{,}9\cdot10^{-11}\ \text{Ф}`], [String.raw`S = 100\ \text{см}^2`, String.raw`10^{-2}\ \text{м}^2`], [String.raw`\varepsilon = 7`, '']],
    find: String.raw`d \;—\; ?`,
    formulas: [SER, CFLAT],
    steps: [
      { title: 'Ёмкость одного',
        tex: String.raw`C_1 = nC = 267\ \text{пФ}` },
      { title: 'Толщина',
        tex: String.raw`d = \frac{\varepsilon\varepsilon_0S}{C_1} = \frac{7\cdot8{,}85\cdot10^{-12}\cdot10^{-2}}{2{,}67\cdot10^{-10}} = 2{,}32\cdot10^{-3}\ \text{м}` },
    ],
    answer: [String.raw`d = 2{,}32\ \text{мм}`],
  },

  /* ===================== 17.20 ===================== */
  {
    id: '17.20', chapter: CH, section: S4, page: '275',
    title: 'Батарея по рис. 17.1',
    given: [[String.raw`C_1 = 0{,}2;\ C_2 = 0{,}1;\ C_3 = 0{,}3;\ C_4 = 0{,}4\ \text{мкФ}`, '']],
    find: String.raw`C \;—\; ?`,
    formulas: [PAR, SER],
    steps: [
      { title: 'Схема',
        text: 'C₁ и C₂ — параллельно, C₃ и C₄ — параллельно, эти две группы — последовательно.',
        tex: String.raw`C = \frac{(C_1 + C_2)(C_3 + C_4)}{C_1 + C_2 + C_3 + C_4} = \frac{0{,}3\cdot0{,}7}{1{,}0} = 0{,}21\ \text{мкФ}` },
    ],
    answer: [String.raw`C = 0{,}21\ \text{мкФ}`],
  },

  /* ===================== 17.21 ===================== */
  {
    id: '17.21', chapter: CH, section: S4, page: '275',
    title: 'Две ветви по рис. 17.2',
    given: [[String.raw`C_1 = 0{,}2;\ C_2 = 0{,}6;\ C_3 = 0{,}3;\ C_4 = 0{,}5\ \text{мкФ}`, ''], [String.raw`U = 320\ \text{В}`, '']],
    find: String.raw`U_i,\ Q_i \;—\; ?`,
    formulas: [SER, PAR],
    steps: [
      { title: 'Верхняя ветвь C₁–C₂ (последовательно)',
        tex: String.raw`Q_1 = Q_2 = \frac{C_1C_2}{C_1 + C_2}U = 0{,}15\cdot320 = 48\ \text{мкКл};\quad U_1 = \frac{48}{0{,}2} = 240\ \text{В},\ U_2 = \frac{48}{0{,}6} = 80\ \text{В}` },
      { title: 'Нижняя ветвь C₃–C₄',
        tex: String.raw`Q_3 = Q_4 = \frac{C_3C_4}{C_3 + C_4}U = 0{,}1875\cdot320 = 60\ \text{мкКл};\quad U_3 = \frac{60}{0{,}3} = 200\ \text{В},\ U_4 = \frac{60}{0{,}5} = 120\ \text{В}` },
    ],
    answer: [String.raw`U_1 = 240\ \text{В};\ U_2 = 80\ \text{В};\ U_3 = 200\ \text{В};\ U_4 = 120\ \text{В}`, String.raw`Q_1 = Q_2 = 48\ \text{мкКл};\ Q_3 = Q_4 = 60\ \text{мкКл}`],
    note: MISMATCH + String.raw`В книге $U_3 = 120$ В и $U_4 = 200$ В — числа переставлены: по формулам самой книги $U_3 = \frac{C_4U}{C_3 + C_4} = 200$ В, $U_4 = \frac{C_3U}{C_3 + C_4} = 120$ В. Проверка: $U_3 + U_4 = 320$ В в обоих случаях, но меньшая ёмкость C₃ берёт большее напряжение.`,
  },

  /* ===================== 17.22 ===================== */
  {
    id: '17.22', chapter: CH, section: S4, page: '275',
    title: 'Ёмкость соединения по рис. 17.3',
    given: [[String.raw`C_1 = 10;\ C_2 = 40;\ C_3 = 2;\ C_4 = 30\ \text{нФ}`, '']],
    find: String.raw`C \;—\; ?`,
    formulas: [SER, PAR],
    steps: [
      { title: 'Схема',
        text: 'По рис. 17.3: в верхней ветви последовательно C₁ и C₃, в нижней — C₂ и C₄; ветви соединены параллельно.',
        tex: String.raw`C = \frac{C_1C_3}{C_1 + C_3} + \frac{C_2C_4}{C_2 + C_4} = \frac{10\cdot2}{12} + \frac{40\cdot30}{70} = 1{,}67 + 17{,}1 = 18{,}8\ \text{нФ}` },
    ],
    answer: [String.raw`C = 18{,}8\ \text{нФ}`],
    note: MISMATCH + 'В книге «20 пкФ» по формуле C₁C₂/(C₁ + C₂) + C₃C₄/(C₃ + C₄). Но на рис. 17.3 в одной ветви стоят C₁ и C₃, а в другой C₂ и C₄ — так выходит 18,8 нФ. По формуле книги вышло бы 9,9 нФ, т. е. и её число 20 с формулой не сходится; «пкФ» — опечатка в единице.',
  },

  /* ===================== 17.23 ===================== */
  {
    id: '17.23', chapter: CH, section: S4, page: '275',
    title: 'Батарея по рис. 17.4',
    given: [[String.raw`C_1 = C_2 = 2\ \text{мкФ}`, ''], [String.raw`C_3 = 3\ \text{мкФ},\ C_4 = 1\ \text{мкФ}`, ''], [String.raw`U_4 = 100\ \text{В}`, '']],
    find: String.raw`Q_i,\ U_i,\ Q,\ U \;—\; ?`,
    formulas: [SER, PAR],
    steps: [
      { title: 'Схема',
        text: 'По рис. 17.4: ветвь C₂–C₃ (последовательно) параллельна C₄, а всё это последовательно с C₁.' },
      { title: 'Параллельный участок (напряжение 100 В)',
        tex: String.raw`Q_4 = C_4U_4 = 100\ \text{мкКл};\quad Q_2 = Q_3 = \frac{2\cdot3}{5}\cdot100 = 120\ \text{мкКл};\ U_2 = 60\ \text{В},\ U_3 = 40\ \text{В}` },
      { title: 'Первый конденсатор',
        tex: String.raw`Q_1 = Q_4 + Q_2 = 220\ \text{мкКл},\quad U_1 = \frac{220}{2} = 110\ \text{В}` },
      { title: 'Вся батарея',
        tex: String.raw`Q = Q_1 = 220\ \text{мкКл},\quad U = U_1 + U_4 = 210\ \text{В}` },
    ],
    answer: [String.raw`Q_1 = 220,\ Q_2 = Q_3 = 120,\ Q_4 = 100\ \text{мкКл}`, String.raw`U_1 = 110,\ U_2 = 60,\ U_3 = 40,\ U_4 = 100\ \text{В}`, String.raw`Q = 220\ \text{мкКл};\ U = 210\ \text{В}`],
    note: TYPO + 'В книге числа даны подряд без подписей; первое — 200 мкКл (это Q₁, должно быть 220: U₁ = 110 В × 2 мкФ), 120, 120, 100 мкКл; 110, 60, 40 В; общий заряд 220 мкКл, напряжение 210 В.',
  },

  /* ===================== 17.24 ===================== */
  {
    id: '17.24', chapter: CH, section: S4, page: '276',
    title: 'Мостовая схема по рис. 17.5',
    given: [[String.raw`C_1 = 1,\ C_2 = 2,\ C_3 = 2,\ C_4 = 4,\ C_5 = 3\ \text{пФ}`, '']],
    find: String.raw`C \;—\; ?`,
    formulas: [SER, PAR],
    steps: [
      { title: 'Мост уравновешен',
        text: 'Если бы C₅ не было: в ветви C₁–C₂ на C₁ приходится U·C₂/(C₁ + C₂), в ветви C₃–C₄ на C₃ — U·C₄/(C₃ + C₄). При C₁/C₂ = C₃/C₄ эти доли равны, значит φ_A = φ_B и через C₅ заряд не идёт — его можно выбросить.',
        tex: String.raw`\frac{C_1}{C_2} = \frac12 = \frac{C_3}{C_4}` },
      { title: 'Ёмкость',
        tex: String.raw`C = \frac{C_1C_2}{C_1 + C_2} + \frac{C_3C_4}{C_3 + C_4} = \frac23 + \frac43 = 2\ \text{пФ}` },
    ],
    answer: [String.raw`C = 2\ \text{пФ}`],
  },

  /* ===================== 17.25 ===================== */
  {
    id: '17.25', chapter: CH, section: S4, page: '276',
    title: 'Когда C₅ не влияет на ёмкость',
    given: [[String.raw`C_1 = 8\ \text{пФ}`, ''], [String.raw`C_2 = 12\ \text{пФ}`, ''], [String.raw`C_3 = 6\ \text{пФ}`, '']],
    find: String.raw`C_4 \;—\; ?`,
    formulas: [SER],
    steps: [
      { title: 'Условие равновесия моста (как в 17.24)',
        text: 'По рис. 17.6 C₁ и C₂ — верхняя ветвь, C₃ и C₄ — нижняя, C₅ соединяет их средние точки.',
        tex: String.raw`\frac{C_1}{C_2} = \frac{C_3}{C_4}\ \Rightarrow\ C_4 = \frac{C_2C_3}{C_1} = \frac{12\cdot6}{8} = 9\ \text{пФ}` },
    ],
    answer: [String.raw`C_4 = 9\ \text{пФ}`],
    note: TYPO + 'В книге «9 пкФ» — опечатка в единице, должно быть пФ.',
  }

  );
})();
