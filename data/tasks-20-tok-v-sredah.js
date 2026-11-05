/*
  § 20. Ток в металлах, жидкостях и газах — задачи 20.1–20.32 (стр. 303–306).
  Условия задач показываются дословно из книги (data/book-tasks.js).
  Ответы пересчитаны скриптом tools/check_tok_v_sredah.py и сверены с book/99-otvety.md.
  Где ответ книги расходится с расчётом — плашка note «Расхождение с ответом книги».
  e = 1,60·10⁻¹⁹ Кл; mₑ = 9,11·10⁻³¹ кг; k = 1,38·10⁻²³ Дж/К; N_A = 6,02·10²³ моль⁻¹; F = 96,5 кКл/моль.
  Медь: плотность 8,93 г/см³ (табл. 9), ρ = 17 нОм·м (табл. 18), M = 64 г/моль; алюминий: 2,70 г/см³, M = 27 г/моль.
*/
(function () {
  const CH = 'Гл. 4. Постоянный электрический ток';
  const S1 = 'Ток в металлах';
  const S2 = 'Классическая теория электропроводности металлов';
  const S3 = 'Ток в жидкостях';
  const S4 = 'Ток в газах';
  const MISMATCH = '<b>Расхождение с ответом книги.</b> ';
  const SMALL = '<b>Расхождение в последней цифре.</b> ';
  const TYPO = '<b>Опечатка в ответе книги.</b> ';

  const JENV = { tex: String.raw`j = en\langle v\rangle`, text: 'плотность тока через концентрацию и среднюю скорость упорядоченного движения электронов' };
  const NMET = { tex: String.raw`n = z\frac{\rho N_\text{A}}{M}`, text: 'концентрация электронов проводимости; z — электронов на атом' };
  const OHMD = { tex: String.raw`j = \gamma E = \frac E\rho`, text: 'закон Ома в дифференциальной форме' };
  const JLD = { tex: String.raw`w = \gamma E^2 = jE`, text: 'закон Джоуля–Ленца в дифференциальной форме' };
  const GAM = { tex: String.raw`\gamma = \frac{e^2n\langle l\rangle}{2mu}`, text: 'удельная проводимость в классической теории (u — средняя скорость хаотического движения)' };
  const INERT = { tex: String.raw`eE = ma`, text: 'электроны «отстают» от ускоряемой решётки, пока поле не сообщит им то же ускорение' };
  const TEMF = { tex: String.raw`\mathcal E = k(T_1 - T_2)`, text: 'термо-ЭДС; k — постоянная термопары' };
  const FAR = { tex: String.raw`m = \frac1F\frac MZQ = \frac1F\frac MZIt`, text: 'объединённый закон Фарадея (F = 96,5 кКл/моль)' };
  const MOB = { tex: String.raw`\langle v\rangle = bE`, text: 'подвижность иона' };
  const JGAS = { tex: String.raw`j = en(b_+ + b_-)E`, text: 'закон Ома для газа вдали от насыщения' };
  const JSAT = { tex: String.raw`j_\text{нас} = en_0d`, text: 'плотность тока насыщения; n₀ — пар ионов на единицу объёма за единицу времени' };

  window.TASKS.push(

  /* ===================== 20.1 ===================== */
  {
    id: '20.1', chapter: CH, section: S1, page: '303',
    title: 'Скорость дрейфа электронов',
    given: [[String.raw`I = 0{,}8\ \text{А}`, ''], [String.raw`S = 4\ \text{мм}^2`, String.raw`4\cdot10^{-6}\ \text{м}^2`], [String.raw`n = 2{,}5\cdot10^{22}\ \text{см}^{-3}`, String.raw`2{,}5\cdot10^{28}\ \text{м}^{-3}`]],
    find: String.raw`\langle v\rangle \;—\; ?`,
    formulas: [JENV],
    steps: [
      { title: 'Скорость',
        tex: String.raw`\langle v\rangle = \frac{I}{enS} = \frac{0{,}8}{1{,}6\cdot10^{-19}\cdot2{,}5\cdot10^{28}\cdot4\cdot10^{-6}} = 5\cdot10^{-5}\ \text{м/с}` },
    ],
    answer: [String.raw`\langle v\rangle = 0{,}05\ \text{мм/с}`],
  },

  /* ===================== 20.2 ===================== */
  {
    id: '20.2', chapter: CH, section: S1, page: '303',
    title: 'Скорость дрейфа в медном проводе',
    given: [[String.raw`I = 10\ \text{А}`, ''], [String.raw`S = 1\ \text{мм}^2`, String.raw`10^{-6}\ \text{м}^2`], [String.raw`z = 2`, ''], [String.raw`\rho = 8{,}93\cdot10^3\ \text{кг/м}^3,\ M = 0{,}064\ \text{кг/моль}`, '']],
    find: String.raw`\langle v\rangle \;—\; ?`,
    formulas: [JENV, NMET],
    steps: [
      { title: 'Концентрация электронов',
        tex: String.raw`n = 2\cdot\frac{8{,}93\cdot10^3\cdot6{,}02\cdot10^{23}}{0{,}064} = 1{,}68\cdot10^{29}\ \text{м}^{-3}` },
      { title: 'Скорость',
        tex: String.raw`\langle v\rangle = \frac{I}{enS} = \frac{10}{1{,}6\cdot10^{-19}\cdot1{,}68\cdot10^{29}\cdot10^{-6}} = 3{,}7\cdot10^{-4}\ \text{м/с}` },
    ],
    answer: [String.raw`\langle v\rangle = 0{,}37\ \text{мм/с}`],
    note: MISMATCH + 'В книге 3,7 мкм/с — в 100 раз меньше. 10 А / (e·1,68·10²⁹ м⁻³·10⁻⁶ м²) = 3,7·10⁻⁴ м/с = 0,37 мм/с (сравните с 20.1 и 20.3, где при похожих данных тоже доли миллиметра в секунду).',
  },

  /* ===================== 20.3 ===================== */
  {
    id: '20.3', chapter: CH, section: S1, page: '303',
    title: 'Скорость дрейфа в алюминии',
    given: [[String.raw`j = 1\ \text{А/мм}^2`, String.raw`10^6\ \text{А/м}^2`], [String.raw`\rho = 2{,}70\cdot10^3\ \text{кг/м}^3,\ M = 0{,}027\ \text{кг/моль}`, '']],
    find: String.raw`\langle v\rangle \;—\; ?`,
    formulas: [JENV, NMET],
    steps: [
      { title: 'Концентрация (по электрону на атом)',
        tex: String.raw`n = \frac{2{,}70\cdot10^3\cdot6{,}02\cdot10^{23}}{0{,}027} = 6{,}02\cdot10^{28}\ \text{м}^{-3}` },
      { title: 'Скорость',
        tex: String.raw`\langle v\rangle = \frac{j}{en} = \frac{10^6}{1{,}6\cdot10^{-19}\cdot6{,}02\cdot10^{28}} = 1{,}04\cdot10^{-4}\ \text{м/с}` },
    ],
    answer: [String.raw`\langle v\rangle = 0{,}1\ \text{мм/с}`],
  },

  /* ===================== 20.4 ===================== */
  {
    id: '20.4', chapter: CH, section: S1, page: '303',
    title: 'Поле в медном проводнике',
    given: [[String.raw`j = 3\ \text{А/мм}^2`, String.raw`3\cdot10^6\ \text{А/м}^2`], [String.raw`\rho = 17\ \text{нОм·м}`, String.raw`1{,}7\cdot10^{-8}\ \text{Ом·м}`]],
    find: String.raw`E \;—\; ?`,
    formulas: [OHMD],
    steps: [
      { title: 'Закон Ома в дифференциальной форме',
        tex: String.raw`E = \rho j = 1{,}7\cdot10^{-8}\cdot3\cdot10^6 = 0{,}05\ \text{В/м}` },
    ],
    answer: [String.raw`E = 0{,}05\ \text{В/м}`],
  },

  /* ===================== 20.5 ===================== */
  {
    id: '20.5', chapter: CH, section: S1, page: '303',
    title: 'Число электронов через сечение за секунду',
    given: [[String.raw`l = 2\ \text{м}`, ''], [String.raw`S = 0{,}4\ \text{мм}^2`, String.raw`4\cdot10^{-7}\ \text{м}^2`], [String.raw`Q/t = 0{,}35\ \text{Вт}`, '']],
    find: String.raw`N \;—\; ?`,
    formulas: [{ tex: String.raw`P = I^2R,\quad R = \frac{\rho l}{S}`, text: 'мощность тепловыделения' }],
    steps: [
      { title: 'Сопротивление и ток',
        tex: String.raw`R = \frac{1{,}7\cdot10^{-8}\cdot2}{4\cdot10^{-7}} = 0{,}085\ \text{Ом},\quad I = \sqrt{\frac PR} = \sqrt{\frac{0{,}35}{0{,}085}} = 2{,}03\ \text{А}` },
      { title: 'Число электронов',
        tex: String.raw`N = \frac Ie = \frac{2{,}03}{1{,}6\cdot10^{-19}} = 1{,}27\cdot10^{19}\ \text{с}^{-1}` },
    ],
    answer: [String.raw`N = 1{,}27\cdot10^{19}\ \text{с}^{-1}`],
  },

  /* ===================== 20.6 ===================== */
  {
    id: '20.6', chapter: CH, section: S1, page: '303',
    title: 'Поле по выделившейся теплоте',
    given: [[String.raw`V = 6\ \text{см}^3`, String.raw`6\cdot10^{-6}\ \text{м}^3`], [String.raw`t = 1\ \text{мин}`, String.raw`60\ \text{с}`], [String.raw`Q = 216\ \text{Дж}`, '']],
    find: String.raw`E \;—\; ?`,
    formulas: [JLD],
    steps: [
      { title: 'Объёмная плотность мощности',
        tex: String.raw`w = \frac{Q}{Vt} = \frac{216}{6\cdot10^{-6}\cdot60} = 6\cdot10^5\ \text{Вт/м}^3` },
      { title: 'Напряжённость',
        tex: String.raw`w = \frac{E^2}{\rho}\ \Rightarrow\ E = \sqrt{w\rho} = \sqrt{6\cdot10^5\cdot1{,}7\cdot10^{-8}} = 0{,}1\ \text{В/м}` },
    ],
    answer: [String.raw`E = 0{,}1\ \text{В/м}`],
  },

  /* ===================== 20.7 ===================== */
  {
    id: '20.7', chapter: CH, section: S2, page: '303',
    title: 'Поле в ускоренно движущемся проводнике',
    given: [[String.raw`a = 100\ \text{м/с}^2`, '']],
    find: String.raw`E \;—\; ?`,
    formulas: [INERT],
    steps: [
      { title: 'Поле разгоняет электроны вместе с решёткой',
        tex: String.raw`E = \frac{ma}{e} = \frac{9{,}11\cdot10^{-31}\cdot100}{1{,}6\cdot10^{-19}} = 5{,}69\cdot10^{-10}\ \text{В/м}` },
    ],
    answer: [String.raw`E = 569\ \text{пВ/м}`],
    note: SMALL + 'В книге 568 пВ/м (с e = 1,602·10⁻¹⁹ Кл).',
  },

  /* ===================== 20.8 ===================== */
  {
    id: '20.8', chapter: CH, section: S2, page: '303',
    title: 'Разность потенциалов во вращающемся диске',
    given: [[String.raw`R = 0{,}5\ \text{м}`, ''], [String.raw`\omega = 10^4\ \text{рад/с}`, '']],
    find: String.raw`U \;—\; ?`,
    formulas: [INERT],
    steps: [
      { title: 'Поле создаёт центростремительное ускорение электронов',
        tex: String.raw`eE(r) = m\omega^2r` },
      { title: 'Разность потенциалов',
        tex: String.raw`U = \int_0^R E\,dr = \frac{m\omega^2R^2}{2e} = \frac{9{,}11\cdot10^{-31}\cdot10^8\cdot0{,}25}{3{,}2\cdot10^{-19}} = 7{,}1\cdot10^{-5}\ \text{В}` },
    ],
    answer: [String.raw`U = 71\ \text{мкВ}`],
  },

  /* ===================== 20.9 ===================== */
  {
    id: '20.9', chapter: CH, section: S2, page: '303',
    title: 'Опыт Толмена–Стюарта',
    given: [[String.raw`v = 200\ \text{м/с}`, ''], [String.raw`l = 10\ \text{м}`, ''], [String.raw`R = 10\ \text{мОм}`, String.raw`10^{-2}\ \text{Ом}`]],
    find: String.raw`Q \;—\; ?`,
    formulas: [INERT],
    steps: [
      { title: 'ЭДС при торможении',
        text: 'Электроны по инерции продолжают движение; на них действует «сила инерции» ma, эквивалентная полю E = ma/e.',
        tex: String.raw`\mathcal E = El = \frac{mal}{e},\quad I = \frac{\mathcal E}{R} = \frac{ml}{eR}\left|\frac{dv}{dt}\right|` },
      { title: 'Заряд',
        tex: String.raw`Q = \int I\,dt = \frac{mlv}{eR} = \frac{9{,}11\cdot10^{-31}\cdot10\cdot200}{1{,}6\cdot10^{-19}\cdot10^{-2}} = 1{,}14\cdot10^{-6}\ \text{Кл}` },
    ],
    answer: [String.raw`Q = 1{,}14\ \text{мкКл}`],
  },

  /* ===================== 20.10 ===================== */
  {
    id: '20.10', chapter: CH, section: S2, page: '303',
    title: 'Средняя длина свободного пробега электрона',
    given: [[String.raw`\gamma = 10^7\ \text{См/м}`, ''], [String.raw`n = 10^{28}\ \text{м}^{-3}`, ''], [String.raw`u = 10^6\ \text{м/с}`, '']],
    find: String.raw`\langle l\rangle \;—\; ?`,
    formulas: [GAM],
    steps: [
      { title: 'Выражаем',
        tex: String.raw`\langle l\rangle = \frac{2mu\gamma}{e^2n} = \frac{2\cdot9{,}11\cdot10^{-31}\cdot10^6\cdot10^7}{(1{,}6\cdot10^{-19})^2\cdot10^{28}} = 7{,}1\cdot10^{-8}\ \text{м}` },
    ],
    answer: [String.raw`\langle l\rangle = 71\ \text{нм}`],
  },

  /* ===================== 20.11 ===================== */
  {
    id: '20.11', chapter: CH, section: S2, page: '304',
    title: 'Число соударений электрона за секунду',
    given: [[String.raw`n = 10^{29}\ \text{м}^{-3}`, ''], [String.raw`\gamma = 10^7\ \text{См/м}`, '']],
    find: String.raw`z \;—\; ?`,
    formulas: [GAM, { tex: String.raw`z = \frac{u}{\langle l\rangle}`, text: 'число соударений в секунду' }],
    steps: [
      { title: 'Скорость u сокращается',
        tex: String.raw`z = \frac{u}{\langle l\rangle} = \frac{e^2n}{2m\gamma} = \frac{2{,}56\cdot10^{-38}\cdot10^{29}}{2\cdot9{,}11\cdot10^{-31}\cdot10^7} = 1{,}4\cdot10^{14}` },
    ],
    answer: [String.raw`z = 1{,}4\cdot10^{14}`],
  },

  /* ===================== 20.12 ===================== */
  {
    id: '20.12', chapter: CH, section: S2, page: '304',
    title: 'Энергия электронов по закону Видемана–Франца',
    given: [[String.raw`\lambda/\gamma = 6{,}7\cdot10^{-6}\ \text{В}^2/\text{К}`, '']],
    find: String.raw`\langle\varepsilon\rangle \;—\; ?`,
    formulas: [{ tex: String.raw`\frac\lambda\gamma = 3\frac{k^2}{e^2}T,\quad \langle\varepsilon\rangle = \frac32kT`, text: 'закон Видемана–Франца и средняя энергия электрона в классической теории' }],
    steps: [
      { title: 'Температура',
        tex: String.raw`T = \frac{e^2}{3k^2}\cdot\frac\lambda\gamma = \frac{2{,}56\cdot10^{-38}\cdot6{,}7\cdot10^{-6}}{3\cdot(1{,}38\cdot10^{-23})^2} = 300\ \text{К}` },
      { title: 'Энергия',
        tex: String.raw`\langle\varepsilon\rangle = \frac32kT = 6{,}2\cdot10^{-21}\ \text{Дж} = 39\ \text{мэВ}` },
    ],
    answer: [String.raw`\langle\varepsilon\rangle = 39\ \text{мэВ}`],
  },

  /* ===================== 20.13 ===================== */
  {
    id: '20.13', chapter: CH, section: S2, page: '304',
    title: 'Объёмная плотность тепловой мощности',
    given: [[String.raw`j = 10\ \text{А/мм}^2`, String.raw`10^7\ \text{А/м}^2`], [String.raw`E = 1\ \text{мВ/м}`, String.raw`10^{-3}\ \text{В/м}`]],
    find: String.raw`w \;—\; ?`,
    formulas: [JLD],
    steps: [
      { title: 'Мощность',
        tex: String.raw`w = jE = 10^7\cdot10^{-3} = 10^4\ \text{Вт/м}^3` },
    ],
    answer: [String.raw`w = 10\ \text{кВт/м}^3`],
  },

  /* ===================== 20.14 ===================== */
  {
    id: '20.14', chapter: CH, section: S2, page: '304',
    title: 'Температура по термопаре',
    given: [[String.raw`R_1 = 5\ \text{Ом},\ R_2 = 100\ \text{Ом}`, ''], [String.raw`I = 37\ \text{мкА}`, ''], [String.raw`k = 43\ \text{мкВ/К}`, ''], [String.raw`t_0 = 0\ ^\circ\text{C}`, '']],
    find: String.raw`t \;—\; ?`,
    formulas: [TEMF],
    steps: [
      { title: 'Термо-ЭДС',
        tex: String.raw`\mathcal E = I(R_1 + R_2) = 37\cdot10^{-6}\cdot105 = 3{,}89\cdot10^{-3}\ \text{В}` },
      { title: 'Температура',
        tex: String.raw`t = t_0 + \frac{\mathcal E}{k} = \frac{3{,}89\cdot10^{-3}}{43\cdot10^{-6}} = 90\ ^\circ\text{C}` },
    ],
    answer: [String.raw`t = 90\ ^\circ\text{C}`],
  },

  /* ===================== 20.15 ===================== */
  {
    id: '20.15', chapter: CH, section: S2, page: '304',
    title: 'Постоянная термопары',
    given: [[String.raw`R_1 = 4\ \text{Ом},\ R_2 = 80\ \text{Ом}`, ''], [String.raw`I = 26\ \text{мкА}`, ''], [String.raw`\Delta t = 50\ ^\circ\text{C}`, '']],
    find: String.raw`k \;—\; ?`,
    formulas: [TEMF],
    steps: [
      { title: 'Постоянная',
        tex: String.raw`k = \frac{I(R_1 + R_2)}{\Delta t} = \frac{26\cdot10^{-6}\cdot84}{50} = 4{,}4\cdot10^{-5}\ \text{В/К}` },
    ],
    answer: [String.raw`k = 4{,}4\cdot10^{-5}\ \text{В/К}`],
  },

  /* ===================== 20.16 ===================== */
  {
    id: '20.16', chapter: CH, section: S3, page: '304',
    title: 'Атомная масса металла по электролизу',
    given: [[String.raw`I = 5\ \text{А}`, ''], [String.raw`t = 10\ \text{мин}`, String.raw`600\ \text{с}`], [String.raw`m = 1{,}02\ \text{г}`, String.raw`1{,}02\cdot10^{-3}\ \text{кг}`], [String.raw`Z = 2`, '']],
    find: String.raw`A_r \;—\; ?`,
    formulas: [FAR],
    steps: [
      { title: 'Молярная масса',
        tex: String.raw`M = \frac{mFZ}{It} = \frac{1{,}02\cdot10^{-3}\cdot9{,}65\cdot10^4\cdot2}{5\cdot600} = 65{,}6\cdot10^{-3}\ \text{кг/моль}` },
      { title: 'Это цинк',
        tex: String.raw`A_r \approx 65{,}6\ (\text{цинк, }65{,}4)` },
    ],
    answer: [String.raw`A_r = 65{,}6\ (\text{цинк})`],
    note: SMALL + 'В книге 65,4 — табличная атомная масса цинка; расчёт по данным задачи даёт 65,6.',
  },

  /* ===================== 20.17 ===================== */
  {
    id: '20.17', chapter: CH, section: S3, page: '304',
    title: 'Валентность железа',
    given: [[String.raw`m_1 = 3{,}9\ \text{г (Zn)},\ Z_1 = 2`, ''], [String.raw`m_2 = 2{,}24\ \text{г (Fe)}`, ''], [String.raw`M_1 = 65{,}4,\ M_2 = 56\ \text{г/моль}`, '']],
    find: String.raw`Z_2 \;—\; ?`,
    formulas: [FAR],
    steps: [
      { title: 'Через обе ванны прошёл одинаковый заряд',
        tex: String.raw`\frac{m_1}{m_2} = \frac{M_1/Z_1}{M_2/Z_2}\ \Rightarrow\ Z_2 = Z_1\frac{M_2m_1}{M_1m_2} = 2\cdot\frac{56\cdot3{,}9}{65{,}4\cdot2{,}24} = 2{,}98 \approx 3` },
    ],
    answer: [String.raw`Z_2 = 3`],
  },

  /* ===================== 20.18 ===================== */
  {
    id: '20.18', chapter: CH, section: S3, page: '304',
    title: 'Электролиз с ЭДС поляризации',
    given: [[String.raw`\mathcal E = 4\ \text{В},\ r = 0{,}1\ \text{Ом}`, ''], [String.raw`\mathcal E_\text{п} = 1{,}5\ \text{В}`, ''], [String.raw`R = 0{,}5\ \text{Ом}`, ''], [String.raw`t = 10\ \text{мин}`, String.raw`600\ \text{с}`]],
    find: String.raw`m \;—\; ?`,
    formulas: [FAR, { tex: String.raw`I = \frac{\mathcal E - \mathcal E_\text{п}}{R + r}`, text: 'ЭДС поляризации направлена навстречу ЭДС батареи' }],
    steps: [
      { title: 'Ток',
        tex: String.raw`I = \frac{4 - 1{,}5}{0{,}6} = 4{,}17\ \text{А}` },
      { title: 'Масса меди',
        tex: String.raw`m = \frac{MIt}{FZ} = \frac{0{,}064\cdot4{,}17\cdot600}{9{,}65\cdot10^4\cdot2} = 8{,}3\cdot10^{-4}\ \text{кг}` },
    ],
    answer: [String.raw`m = 0{,}83\ \text{г}`],
  },

  /* ===================== 20.19 ===================== */
  {
    id: '20.19', chapter: CH, section: S3, page: '304',
    title: 'Толщина слоя меди',
    given: [[String.raw`t = 5\ \text{ч}`, String.raw`1{,}8\cdot10^4\ \text{с}`], [String.raw`j = 80\ \text{А/м}^2`, ''], [String.raw`\rho = 8{,}93\cdot10^3\ \text{кг/м}^3`, '']],
    find: String.raw`h \;—\; ?`,
    formulas: [FAR],
    steps: [
      { title: 'Масса на единицу площади',
        tex: String.raw`\frac mS = \frac{Mjt}{FZ},\quad h = \frac{m}{\rho S} = \frac{Mjt}{FZ\rho}` },
      { title: 'Считаем',
        tex: String.raw`h = \frac{0{,}064\cdot80\cdot1{,}8\cdot10^4}{9{,}65\cdot10^4\cdot2\cdot8{,}93\cdot10^3} = 5{,}3\cdot10^{-5}\ \text{м}` },
    ],
    answer: [String.raw`h = 53\ \text{мкм}`],
    note: SMALL + 'В книге 54 мкм; по табличной плотности меди 8,93 г/см³ точно 53,5 мкм.',
  },

  /* ===================== 20.20 ===================== */
  {
    id: '20.20', chapter: CH, section: S3, page: '304',
    title: 'Медь при равномерно растущем токе',
    given: [[String.raw`\Delta t = 20\ \text{с}`, ''], [String.raw`I_0 = 0,\ I = 2\ \text{А}`, '']],
    find: String.raw`m \;—\; ?`,
    formulas: [FAR],
    steps: [
      { title: 'Заряд — площадь треугольника',
        tex: String.raw`Q = \frac{I\Delta t}{2} = 20\ \text{Кл}` },
      { title: 'Масса',
        tex: String.raw`m = \frac{MQ}{FZ} = \frac{0{,}064\cdot20}{9{,}65\cdot10^4\cdot2} = 6{,}6\cdot10^{-6}\ \text{кг}` },
    ],
    answer: [String.raw`m = 6{,}6\ \text{мг}`],
  },

  /* ===================== 20.21 ===================== */
  {
    id: '20.21', chapter: CH, section: S3, page: '305',
    title: 'Валентность по заряду и количеству вещества',
    given: [[String.raw`Q = 193\ \text{кКл}`, String.raw`1{,}93\cdot10^5\ \text{Кл}`], [String.raw`\nu = 1\ \text{моль}`, '']],
    find: String.raw`Z \;—\; ?`,
    formulas: [FAR],
    steps: [
      { title: 'm = νM',
        tex: String.raw`\nu = \frac{Q}{FZ}\ \Rightarrow\ Z = \frac{Q}{\nu F} = \frac{1{,}93\cdot10^5}{9{,}65\cdot10^4} = 2` },
    ],
    answer: [String.raw`Z = 2`],
  },

  /* ===================== 20.22 ===================== */
  {
    id: '20.22', chapter: CH, section: S3, page: '305',
    title: 'Количество вещества и число атомов',
    given: [[String.raw`t = 5\ \text{мин}`, String.raw`300\ \text{с}`], [String.raw`I = 2\ \text{А}`, ''], [String.raw`Z = 2`, '']],
    find: String.raw`\nu,\ N \;—\; ?`,
    formulas: [FAR],
    steps: [
      { title: 'Количество вещества',
        tex: String.raw`\nu = \frac{It}{FZ} = \frac{600}{1{,}93\cdot10^5} = 3{,}11\cdot10^{-3}\ \text{моль}` },
      { title: 'Число атомов',
        tex: String.raw`N = \nu N_\text{A} = 1{,}87\cdot10^{21}` },
    ],
    answer: [String.raw`\nu = 3{,}11\ \text{ммоль};\quad N = 1{,}87\cdot10^{21}`],
    note: SMALL + 'В книге ν = 3,12 ммоль; точно 600/193 000 = 3,109 ммоль.',
  },

  /* ===================== 20.23 ===================== */
  {
    id: '20.23', chapter: CH, section: S3, page: '305',
    title: 'Число атомов на 1 см² электрода',
    given: [[String.raw`t = 5\ \text{мин}`, String.raw`300\ \text{с}`], [String.raw`j = 10\ \text{А/м}^2`, ''], [String.raw`S = 1\ \text{см}^2`, String.raw`10^{-4}\ \text{м}^2`], [String.raw`Z = 2`, '']],
    find: String.raw`N \;—\; ?`,
    formulas: [FAR],
    steps: [
      { title: 'Каждый ион несёт заряд Ze',
        tex: String.raw`N = \frac{jSt}{Ze} = \frac{10\cdot10^{-4}\cdot300}{2\cdot1{,}6\cdot10^{-19}} = 9{,}4\cdot10^{17}` },
    ],
    answer: [String.raw`N = 9{,}4\cdot10^{17}`],
    note: SMALL + 'В книге 9,3·10¹⁷; точно 9,38·10¹⁷.',
  },

  /* ===================== 20.24 ===================== */
  {
    id: '20.24', chapter: CH, section: S4, page: '305',
    title: 'Потенциал ионизации водорода',
    given: [[String.raw`E_i = 2{,}18\cdot10^{-18}\ \text{Дж}`, '']],
    find: String.raw`U_i \;—\; ?`,
    formulas: [{ tex: String.raw`E_i = eU_i`, text: 'энергия ионизации через потенциал ионизации' }],
    steps: [
      { title: 'Потенциал',
        tex: String.raw`U_i = \frac{E_i}{e} = \frac{2{,}18\cdot10^{-18}}{1{,}6\cdot10^{-19}} = 13{,}6\ \text{В}` },
    ],
    answer: [String.raw`U_i = 13{,}6\ \text{В}`],
  },

  /* ===================== 20.25 ===================== */
  {
    id: '20.25', chapter: CH, section: S4, page: '305',
    title: 'Скорость электрона для ионизации азота',
    given: [[String.raw`U_i = 14{,}5\ \text{В}`, '']],
    find: String.raw`v_{\min} \;—\; ?`,
    formulas: [{ tex: String.raw`\frac{mv^2}{2} = eU_i`, text: 'энергия электрона должна быть не меньше энергии ионизации' }],
    steps: [
      { title: 'Скорость',
        text: 'Электрон много легче атома — почти вся его энергия может пойти на ионизацию.',
        tex: String.raw`v_{\min} = \sqrt{\frac{2eU_i}{m}} = \sqrt{\frac{2\cdot1{,}6\cdot10^{-19}\cdot14{,}5}{9{,}11\cdot10^{-31}}} = 2{,}3\cdot10^6\ \text{м/с}` },
    ],
    answer: [String.raw`v_{\min} = 2{,}3\cdot10^6\ \text{м/с}`],
  },

  /* ===================== 20.26 ===================== */
  {
    id: '20.26', chapter: CH, section: S4, page: '305',
    title: 'Температура для ионизации соударениями',
    given: [[String.raw`U_i = 13{,}6\ \text{В}`, '']],
    find: String.raw`T \;—\; ?`,
    formulas: [{ tex: String.raw`\langle\varepsilon\rangle = \frac32kT`, text: 'средняя энергия поступательного движения атома' }],
    steps: [
      { title: 'Какая энергия идёт на ионизацию',
        text: 'Атомы одинаковой массы: при ударе движущегося атома о покоящийся на ионизацию может пойти лишь энергия относительного движения — половина кинетической энергии налетающего атома (вторая половина остаётся у движения центра масс).',
        tex: String.raw`\frac12\cdot\frac32kT = eU_i` },
      { title: 'Температура',
        tex: String.raw`T = \frac{4eU_i}{3k} = \frac{4\cdot1{,}6\cdot10^{-19}\cdot13{,}6}{3\cdot1{,}38\cdot10^{-23}} = 2{,}1\cdot10^5\ \text{К}` },
    ],
    answer: [String.raw`T = 210\ \text{кК}`],
    note: '<b>Как получен ответ книги.</b> Если просто приравнять (3/2)kT = eU_i, выйдет вдвое меньше — 105 кК. Ответ книги 210 кК соответствует учёту того, что при столкновении одинаковых атомов на ионизацию идёт только половина энергии.',
  },

  /* ===================== 20.27 ===================== */
  {
    id: '20.27', chapter: CH, section: S4, page: '305',
    title: 'Время дрейфа ионов в ионизационной камере',
    given: [[String.raw`d = 4\ \text{см}`, String.raw`0{,}04\ \text{м}`], [String.raw`U = 5\ \text{кВ}`, String.raw`5\cdot10^3\ \text{В}`], [String.raw`b = 2\ \text{см}^2/(\text{В·с})`, String.raw`2\cdot10^{-4}\ \text{м}^2/(\text{В·с})`]],
    find: String.raw`t \;—\; ?`,
    formulas: [MOB],
    steps: [
      { title: 'Скорость ионов',
        tex: String.raw`v = b\frac Ud = 2\cdot10^{-4}\cdot\frac{5\cdot10^3}{0{,}04} = 25\ \text{м/с}` },
      { title: 'Время (путь d/2)',
        tex: String.raw`t = \frac{d/2}{v} = \frac{0{,}02}{25} = 8\cdot10^{-4}\ \text{с}` },
    ],
    answer: [String.raw`t = 0{,}8\ \text{мс}`],
  },

  /* ===================== 20.28 ===================== */
  {
    id: '20.28', chapter: CH, section: S4, page: '305',
    title: 'Проводимость ионизированного азота',
    given: [[String.raw`n_0 = 10^7\ \text{см}^{-3}`, String.raw`10^{13}\ \text{м}^{-3}`], [String.raw`b_+ = 1{,}27,\ b_- = 1{,}81\ \text{см}^2/(\text{В·с})`, String.raw`3{,}08\cdot10^{-4}\ \text{м}^2/(\text{В·с})\ \text{(сумма)}`]],
    find: String.raw`\gamma \;—\; ?`,
    formulas: [JGAS],
    steps: [
      { title: 'Удельная проводимость',
        tex: String.raw`\gamma = en(b_+ + b_-) = 1{,}6\cdot10^{-19}\cdot10^{13}\cdot3{,}08\cdot10^{-4} = 4{,}9\cdot10^{-10}\ \text{См/м}` },
    ],
    answer: [String.raw`\gamma = 0{,}5\ \text{нСм/м}`],
    note: TYPO + 'В книге «проводимость G = 0,5 нСм». Размеров газа в условии нет, поэтому найти можно только удельную проводимость γ — она и равна 0,5 нСм/м.',
  },

  /* ===================== 20.29 ===================== */
  {
    id: '20.29', chapter: CH, section: S4, page: '305',
    title: 'Концентрация ионов вдали от насыщения',
    given: [[String.raw`I = 1{,}2\ \text{мкА}`, ''], [String.raw`S = 300\ \text{см}^2`, String.raw`0{,}03\ \text{м}^2`], [String.raw`d = 2\ \text{см},\ U = 100\ \text{В}`, ''], [String.raw`b_+ + b_- = 3{,}3\ \text{см}^2/(\text{В·с})`, String.raw`3{,}3\cdot10^{-4}\ \text{м}^2/(\text{В·с})`]],
    find: String.raw`n \;—\; ?`,
    formulas: [JGAS],
    steps: [
      { title: 'Выражаем n',
        tex: String.raw`n = \frac{I}{eS(b_+ + b_-)U/d} = \frac{1{,}2\cdot10^{-6}}{1{,}6\cdot10^{-19}\cdot0{,}03\cdot3{,}3\cdot10^{-4}\cdot5\cdot10^3} = 1{,}52\cdot10^{14}\ \text{м}^{-3}` },
    ],
    answer: [String.raw`n = 1{,}52\cdot10^{14}\ \text{м}^{-3}`],
  },

  /* ===================== 20.30 ===================== */
  {
    id: '20.30', chapter: CH, section: S4, page: '305',
    title: 'Число пар ионов по току насыщения',
    given: [[String.raw`V = 0{,}5\ \text{л}`, String.raw`5\cdot10^{-4}\ \text{м}^3`], [String.raw`I_\text{нас} = 4\ \text{нА}`, String.raw`4\cdot10^{-9}\ \text{А}`]],
    find: String.raw`n_0 \;—\; ?`,
    formulas: [JSAT],
    steps: [
      { title: 'При насыщении все ионы доходят до электродов',
        tex: String.raw`I_\text{нас} = en_0V\ \Rightarrow\ n_0 = \frac{4\cdot10^{-9}}{1{,}6\cdot10^{-19}\cdot5\cdot10^{-4}} = 5\cdot10^{13}\ \text{м}^{-3}\text{с}^{-1}` },
    ],
    answer: [String.raw`n_0 = 5\cdot10^7\ (\text{см}^3\cdot\text{с})^{-1}`],
  },

  /* ===================== 20.31 ===================== */
  {
    id: '20.31', chapter: CH, section: S4, page: '306',
    title: 'Ток насыщения в конденсаторе',
    given: [[String.raw`n_0 = 10^8\ \text{см}^{-3}\text{с}^{-1}`, String.raw`10^{14}\ \text{м}^{-3}\text{с}^{-1}`], [String.raw`d = 1\ \text{см}`, String.raw`0{,}01\ \text{м}`], [String.raw`S = 100\ \text{см}^2`, String.raw`0{,}01\ \text{м}^2`]],
    find: String.raw`I_\text{нас} \;—\; ?`,
    formulas: [JSAT],
    steps: [
      { title: 'Ток',
        tex: String.raw`I_\text{нас} = en_0Sd = 1{,}6\cdot10^{-19}\cdot10^{14}\cdot0{,}01\cdot0{,}01 = 1{,}6\cdot10^{-9}\ \text{А}` },
    ],
    answer: [String.raw`I_\text{нас} = 1{,}6\cdot10^{-9}\ \text{А}`],
  },

  /* ===================== 20.32 ===================== */
  {
    id: '20.32', chapter: CH, section: S4, page: '306',
    title: 'Число пар ионов по плотности тока насыщения',
    given: [[String.raw`d = 5\ \text{см}`, String.raw`0{,}05\ \text{м}`], [String.raw`j = 16\ \text{мкА/м}^2`, String.raw`1{,}6\cdot10^{-5}\ \text{А/м}^2`]],
    find: String.raw`n \;—\; ?`,
    formulas: [JSAT],
    steps: [
      { title: 'Выражаем',
        tex: String.raw`n = \frac{j}{ed} = \frac{1{,}6\cdot10^{-5}}{1{,}6\cdot10^{-19}\cdot0{,}05} = 2\cdot10^{15}\ \text{м}^{-3}\text{с}^{-1}` },
    ],
    answer: [String.raw`n = 2\cdot10^9\ \text{см}^{-3}\cdot\text{с}^{-1}`],
  }

  );
})();
