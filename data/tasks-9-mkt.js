/*
  § 9. Молекулярно-кинетическая теория газов — задачи 9.1–9.33 (стр. 146–148).
  Условия задач показываются дословно из книги (data/book-tasks.js).
  Ответы пересчитаны скриптом tools/check_mkt.py и сверены с book/99-otvety.md.
  Где ответ книги расходится с расчётом — плашка note «Расхождение с ответом книги».
  Постоянные — табл. 24: N_A = 6,02·10²³ моль⁻¹, k = 1,38·10⁻²³ Дж/К, R = 8,31 Дж/(моль·К), V_m = 22,4 л/моль.
*/
(function () {
  const CH = 'Гл. 2. Молекулярная физика и термодинамика';
  const S1 = 'Концентрация молекул';
  const S2 = 'Основное уравнение кинетической теории газов. Энергия молекул';
  const S3 = 'Скорости молекул';
  const SMALL = '<b>Расхождение в последней цифре.</b> ';
  const TYPO = '<b>Опечатка в ответе книги.</b> ';

  const CONC = { tex: String.raw`n = \frac NV,\quad N = \nu N_\text{A} = \frac mMN_\text{A}`, text: 'концентрация и число молекул' };
  const NORM = { tex: String.raw`n_0 = \frac{N_\text{A}}{V_m} = 2{,}69\cdot10^{25}\ \text{м}^{-3}`, text: 'концентрация любого идеального газа при нормальных условиях (V_m = 22,4 л/моль)' };
  const PNKT = { tex: String.raw`p = nkT`, text: 'давление газа через концентрацию и температуру' };
  const EPS = { tex: String.raw`\langle\varepsilon\rangle = \frac i2kT,\quad \langle\varepsilon_\text{п}\rangle = \frac32kT`, text: 'средняя энергия молекулы: i = 3 одноатомная, 5 двухатомная, 6 трёх- и более атомная; на каждую степень свободы — kT/2' };
  const SPEEDS = { tex: String.raw`\langle v_\text{кв}\rangle = \sqrt{\frac{3RT}{M}},\quad \langle v\rangle = \sqrt{\frac{8RT}{\pi M}},\quad v_\text{в} = \sqrt{\frac{2RT}{M}}`, text: 'средняя квадратичная, средняя арифметическая и наиболее вероятная скорости' };

  window.TASKS.push(

  /* ===================== 9.1 ===================== */
  {
    id: '9.1', chapter: CH, section: S1, page: '146',
    title: 'Концентрация по числу молекул',
    given: [[String.raw`V = 12\ \text{л}`, String.raw`1{,}2\cdot10^{-2}\ \text{м}^3`], [String.raw`N = 1{,}44\cdot10^{18}`, '']],
    find: String.raw`n \;—\; ?`,
    formulas: [CONC],
    steps: [
      { tex: String.raw`n = \frac NV = \frac{1{,}44\cdot10^{18}}{1{,}2\cdot10^{-2}} = 1{,}2\cdot10^{20}\ \text{м}^{-3}` },
    ],
    answer: [String.raw`n = 1{,}2\cdot10^{20}\ \text{м}^{-3}`],
  },

  /* ===================== 9.2 ===================== */
  {
    id: '9.2', chapter: CH, section: S1, page: '146',
    title: 'Вместимость сосуда',
    given: [[String.raw`n = 1{,}25\cdot10^{26}\ \text{м}^{-3}`, ''], [String.raw`N = 2{,}5\cdot10^{23}`, '']],
    find: String.raw`V \;—\; ?`,
    formulas: [CONC],
    steps: [
      { tex: String.raw`V = \frac Nn = \frac{2{,}5\cdot10^{23}}{1{,}25\cdot10^{26}} = 2\cdot10^{-3}\ \text{м}^3 = 2\ \text{л}` },
    ],
    answer: [String.raw`V = 2\ \text{л}`],
  },

  /* ===================== 9.3 ===================== */
  {
    id: '9.3', chapter: CH, section: S1, page: '146',
    title: 'Концентрация по количеству вещества',
    given: [[String.raw`V = 20\ \text{л}`, String.raw`2\cdot10^{-2}\ \text{м}^3`], [String.raw`\nu = 1{,}5\ \text{кмоль}`, String.raw`1{,}5\cdot10^3\ \text{моль}`]],
    find: String.raw`n \;—\; ?`,
    formulas: [CONC],
    steps: [
      { tex: String.raw`n = \frac{\nu N_\text{A}}{V} = \frac{1{,}5\cdot10^3\cdot6{,}02\cdot10^{23}}{2\cdot10^{-2}} = 4{,}52\cdot10^{28}\ \text{м}^{-3}` },
    ],
    answer: [String.raw`n = \nu N_\text{A}/V = 4{,}52\cdot10^{28}\ \text{м}^{-3}`],
  },

  /* ===================== 9.4 ===================== */
  {
    id: '9.4', chapter: CH, section: S1, page: '146',
    title: 'Концентрация при нормальных условиях',
    given: [[String.raw`V_m = 22{,}4\cdot10^{-3}\ \text{м}^3/\text{моль}`, '']],
    find: String.raw`n \;—\; ?`,
    formulas: [NORM],
    steps: [
      { title: 'Один моль занимает V_m',
        text: 'При нормальных условиях моль любого идеального газа занимает 22,4 л — в нём N_A молекул.',
        tex: String.raw`n = \frac{N_\text{A}}{V_m} = \frac{6{,}02\cdot10^{23}}{22{,}4\cdot10^{-3}} = 2{,}69\cdot10^{25}\ \text{м}^{-3}` },
    ],
    answer: [String.raw`n = N_\text{A}/V_m = 2{,}69\cdot10^{25}\ \text{м}^{-3}`],
  },

  /* ===================== 9.5 ===================== */
  {
    id: '9.5', chapter: CH, section: S1, page: '146',
    title: 'Масса кислорода по концентрации',
    given: [[String.raw`V = 5\ \text{л}`, String.raw`5\cdot10^{-3}\ \text{м}^3`], [String.raw`n = 9{,}41\cdot10^{23}\ \text{м}^{-3}`, ''], [String.raw`M = 0{,}032\ \text{кг/моль}`, '']],
    find: String.raw`m \;—\; ?`,
    formulas: [CONC],
    steps: [
      { tex: String.raw`m = \frac{MnV}{N_\text{A}} = \frac{0{,}032\cdot9{,}41\cdot10^{23}\cdot5\cdot10^{-3}}{6{,}02\cdot10^{23}} = 2{,}5\cdot10^{-4}\ \text{кг}` },
    ],
    answer: [String.raw`m = MnV/N_\text{A} = 0{,}25\ \text{г}`],
  },

  /* ===================== 9.6 ===================== */
  {
    id: '9.6', chapter: CH, section: S1, page: '146',
    title: 'Концентрация азота в баллоне',
    given: [[String.raw`V = 5\ \text{л}`, String.raw`5\cdot10^{-3}\ \text{м}^3`], [String.raw`m = 17{,}5\ \text{г}`, ''], [String.raw`M = 28\ \text{г/моль}`, '']],
    find: String.raw`n \;—\; ?`,
    formulas: [CONC],
    steps: [
      { tex: String.raw`n = \frac{mN_\text{A}}{MV} = \frac{17{,}5}{28}\cdot\frac{6{,}02\cdot10^{23}}{5\cdot10^{-3}} = 7{,}52\cdot10^{25}\ \text{м}^{-3}` },
    ],
    answer: [String.raw`n = 7{,}52\cdot10^{25}\ \text{м}^{-3}`],
  },

  /* ===================== 9.7 ===================== */
  {
    id: '9.7', chapter: CH, section: S1, page: '146',
    title: 'Количество вещества водорода',
    given: [[String.raw`V = 3\ \text{л}`, String.raw`3\cdot10^{-3}\ \text{м}^3`], [String.raw`n = 2\cdot10^{18}\ \text{м}^{-3}`, '']],
    find: String.raw`\nu \;—\; ?`,
    formulas: [CONC],
    steps: [
      { tex: String.raw`\nu = \frac{nV}{N_\text{A}} = \frac{2\cdot10^{18}\cdot3\cdot10^{-3}}{6{,}02\cdot10^{23}} = 9{,}97\cdot10^{-9}\ \text{моль}` },
    ],
    answer: [String.raw`\nu = 9{,}97\cdot10^{-9}\ \text{моль}`],
  },

  /* ===================== 9.8 ===================== */
  {
    id: '9.8', chapter: CH, section: S1, page: '146',
    title: 'Водород и кислород одинаковой массы',
    given: [[String.raw`m_1 = m_2,\ V_1 = V_2`, ''], [String.raw`M_1 = 2,\ M_2 = 32\ \text{г/моль}`, '']],
    find: String.raw`n_1/n_2 \;—\; ?`,
    formulas: [CONC],
    steps: [
      { title: 'При равных массах и объёмах',
        tex: String.raw`\frac{n_1}{n_2} = \frac{m/M_1}{m/M_2} = \frac{M_2}{M_1} = \frac{32}{2} = 16` },
    ],
    answer: [String.raw`n_1/n_2 = 16`],
  },

  /* ===================== 9.9 ===================== */
  {
    id: '9.9', chapter: CH, section: S1, page: '146',
    title: 'Какой это газ',
    given: [[String.raw`m = 58{,}5\ \text{г}`, String.raw`5{,}85\cdot10^{-2}\ \text{кг}`], [String.raw`V = 5\ \text{л}`, String.raw`5\cdot10^{-3}\ \text{м}^3`], [String.raw`n = 2{,}2\cdot10^{26}\ \text{м}^{-3}`, '']],
    find: String.raw`M \;—\; ?`,
    formulas: [CONC],
    steps: [
      { title: 'Молярная масса',
        tex: String.raw`M = \frac{mN_\text{A}}{nV} = \frac{5{,}85\cdot10^{-2}\cdot6{,}02\cdot10^{23}}{2{,}2\cdot10^{26}\cdot5\cdot10^{-3}} = 0{,}032\ \text{кг/моль}` },
      { text: 'Молярная масса 32 г/моль — это кислород O₂.' },
    ],
    answer: [String.raw`M_r = 32\ \Rightarrow\ \text{кислород}`],
  },

  /* ===================== 9.10 ===================== */
  {
    id: '9.10', chapter: CH, section: S1, page: '146',
    title: 'Постоянная Авогадро из опыта',
    given: [[String.raw`V = 2\ \text{л}`, String.raw`2\cdot10^{-3}\ \text{м}^3`], [String.raw`m = 1{,}17\ \text{г}`, ''], [String.raw`n = 1{,}1\cdot10^{25}\ \text{м}^{-3}`, ''], [String.raw`M = 32\ \text{г/моль}`, '']],
    find: String.raw`N_\text{A} \;—\; ?`,
    formulas: [CONC],
    steps: [
      { tex: String.raw`N_\text{A} = \frac{N}{\nu} = \frac{nVM}{m} = \frac{1{,}1\cdot10^{25}\cdot2\cdot10^{-3}\cdot32}{1{,}17} = 6{,}02\cdot10^{23}\ \text{моль}^{-1}` },
    ],
    answer: [String.raw`N_\text{A} = 6{,}02\cdot10^{23}\ \text{моль}^{-1}`],
  },

  /* ===================== 9.11 ===================== */
  {
    id: '9.11', chapter: CH, section: S1, page: '146–147',
    title: 'Диссоциация кислорода',
    given: [[String.raw`\text{н. у.}`, ''], [String.raw`\alpha = 0{,}4`, '']],
    find: String.raw`n_1,\ n_2,\ n_3 \;—\; ?`,
    formulas: [NORM],
    steps: [
      { title: '1) До нагревания',
        tex: String.raw`n_1 = \frac{N_\text{A}}{V_m} = 2{,}69\cdot10^{25}\ \text{м}^{-3}` },
      { title: '2) Нераспавшиеся молекулы',
        tex: String.raw`n_2 = n_1(1 - \alpha) = 2{,}69\cdot10^{25}\cdot0{,}6 = 1{,}61\cdot10^{25}\ \text{м}^{-3}` },
      { title: '3) Атомы',
        text: 'Каждая распавшаяся молекула даёт два атома (пример 1).',
        tex: String.raw`n_3 = 2n_1\alpha = 2\cdot2{,}69\cdot10^{25}\cdot0{,}4 = 2{,}15\cdot10^{25}\ \text{м}^{-3}` },
    ],
    answer: [String.raw`n_1 = 2{,}69\cdot10^{25}\ \text{м}^{-3}`, String.raw`n_2 = 1{,}61\cdot10^{25}\ \text{м}^{-3}`, String.raw`n_3 = 2{,}15\cdot10^{25}\ \text{м}^{-3}`],
  },

  /* ===================== 9.12 ===================== */
  {
    id: '9.12', chapter: CH, section: S2, page: '147',
    title: 'Концентрация при 1 мПа',
    given: [[String.raw`T = 300\ \text{К}`, ''], [String.raw`p = 1\ \text{мПа}`, String.raw`10^{-3}\ \text{Па}`]],
    find: String.raw`n \;—\; ?`,
    formulas: [PNKT],
    steps: [
      { tex: String.raw`n = \frac{p}{kT} = \frac{10^{-3}}{1{,}38\cdot10^{-23}\cdot300} = 2{,}42\cdot10^{17}\ \text{м}^{-3}` },
    ],
    answer: [String.raw`n = 2{,}42\cdot10^{17}\ \text{м}^{-3}`],
  },

  /* ===================== 9.13 ===================== */
  {
    id: '9.13', chapter: CH, section: S2, page: '147',
    title: 'Давление при 3 К и 1 кК',
    given: [[String.raw`n = 10^{19}\ \text{см}^{-3}`, String.raw`10^{25}\ \text{м}^{-3}`], [String.raw`T_1 = 3\ \text{К},\ T_2 = 1\ \text{кК}`, '']],
    find: String.raw`p_1,\ p_2 \;—\; ?`,
    formulas: [PNKT],
    steps: [
      { tex: String.raw`p_1 = nkT_1 = 10^{25}\cdot1{,}38\cdot10^{-23}\cdot3 = 414\ \text{Па}` },
      { tex: String.raw`p_2 = nkT_2 = 10^{25}\cdot1{,}38\cdot10^{-23}\cdot10^3 = 1{,}38\cdot10^5\ \text{Па}` },
    ],
    answer: [String.raw`p_1 = 414\ \text{Па}`, String.raw`p_2 = 138\ \text{кПа}`],
  },

  /* ===================== 9.14 ===================== */
  {
    id: '9.14', chapter: CH, section: S2, page: '147',
    title: 'Число молекул в баллоне',
    given: [[String.raw`V = 30\ \text{л}`, String.raw`3\cdot10^{-2}\ \text{м}^3`], [String.raw`T = 300\ \text{К}`, ''], [String.raw`p = 5\ \text{МПа}`, String.raw`5\cdot10^6\ \text{Па}`]],
    find: String.raw`N \;—\; ?`,
    formulas: [PNKT],
    steps: [
      { tex: String.raw`N = nV = \frac{pV}{kT} = \frac{5\cdot10^6\cdot3\cdot10^{-2}}{1{,}38\cdot10^{-23}\cdot300} = 3{,}62\cdot10^{25}` },
    ],
    answer: [String.raw`N = pV/(kT) = 3{,}62\cdot10^{25}`],
  },

  /* ===================== 9.15 ===================== */
  {
    id: '9.15', chapter: CH, section: S2, page: '147',
    title: 'Количество вещества и концентрация в колбе',
    given: [[String.raw`V = 240\ \text{см}^3`, String.raw`2{,}4\cdot10^{-4}\ \text{м}^3`], [String.raw`T = 290\ \text{К}`, ''], [String.raw`p = 50\ \text{кПа}`, String.raw`5\cdot10^4\ \text{Па}`]],
    find: String.raw`\nu,\ n \;—\; ?`,
    formulas: [PNKT, { tex: String.raw`pV = \nu RT`, text: 'уравнение Менделеева — Клапейрона' }],
    steps: [
      { tex: String.raw`\nu = \frac{pV}{RT} = \frac{5\cdot10^4\cdot2{,}4\cdot10^{-4}}{8{,}31\cdot290} = 4{,}98\cdot10^{-3}\ \text{моль}` },
      { tex: String.raw`n = \frac{p}{kT} = \frac{5\cdot10^4}{1{,}38\cdot10^{-23}\cdot290} = 1{,}25\cdot10^{25}\ \text{м}^{-3}` },
    ],
    answer: [String.raw`\nu = 4{,}98\ \text{ммоль}`, String.raw`n = 1{,}25\cdot10^{25}\ \text{м}^{-3}`],
  },

  /* ===================== 9.16 ===================== */
  {
    id: '9.16', chapter: CH, section: S2, page: '147',
    title: 'Падение давления при утечке',
    given: [[String.raw`V = 100\ \text{см}^3`, String.raw`10^{-4}\ \text{м}^3`], [String.raw`T = 300\ \text{К}`, ''], [String.raw`N = 10^{20}`, '']],
    find: String.raw`\Delta p \;—\; ?`,
    formulas: [PNKT],
    steps: [
      { title: 'Давление пропорционально числу молекул',
        tex: String.raw`\Delta p = \frac NVkT = \frac{10^{20}}{10^{-4}}\cdot1{,}38\cdot10^{-23}\cdot300 = 4{,}14\cdot10^3\ \text{Па}` },
    ],
    answer: [String.raw`\Delta p = (N/V)kT = 4{,}14\ \text{кПа}`],
  },

  /* ===================== 9.17 ===================== */
  {
    id: '9.17', chapter: CH, section: S2, page: '147',
    title: 'Количество вещества и число молекул в колбе',
    given: [[String.raw`V = 240\ \text{см}^3`, String.raw`2{,}4\cdot10^{-4}\ \text{м}^3`], [String.raw`T = 290\ \text{К}`, ''], [String.raw`p = 50\ \text{кПа}`, String.raw`5\cdot10^4\ \text{Па}`]],
    find: String.raw`\nu,\ N \;—\; ?`,
    formulas: [{ tex: String.raw`pV = \nu RT,\quad N = \nu N_\text{A}`, text: 'уравнение Менделеева — Клапейрона, число молекул' }],
    steps: [
      { tex: String.raw`\nu = \frac{pV}{RT} = 4{,}98\cdot10^{-3}\ \text{моль}` },
      { tex: String.raw`N = \nu N_\text{A} = 4{,}98\cdot10^{-3}\cdot6{,}02\cdot10^{23} = 3{,}00\cdot10^{21}` },
    ],
    answer: [String.raw`\nu = 4{,}98\ \text{ммоль}`, String.raw`N = 3{,}00\cdot10^{21}`],
    note: SMALL + String.raw`В книге 4,97 ммоль и $2{,}99\cdot10^{21}$, хотя в задаче 9.15 с теми же данными книга даёт 4,98 ммоль. Точно $\nu = 4{,}980\cdot10^{-3}$ моль, $N = 2{,}998\cdot10^{21}$.`,
  },

  /* ===================== 9.18 ===================== */
  {
    id: '9.18', chapter: CH, section: S2, page: '147',
    title: 'Температура разреженного газа',
    given: [[String.raw`p = 1\ \text{мПа}`, String.raw`10^{-3}\ \text{Па}`], [String.raw`n = 10^{10}\ \text{см}^{-3}`, String.raw`10^{16}\ \text{м}^{-3}`]],
    find: String.raw`T,\ \langle\varepsilon_\text{п}\rangle \;—\; ?`,
    formulas: [PNKT, EPS],
    steps: [
      { title: '1) Температура',
        tex: String.raw`T = \frac{p}{nk} = \frac{10^{-3}}{10^{16}\cdot1{,}38\cdot10^{-23}} = 7{,}25\cdot10^3\ \text{К}` },
      { title: '2) Энергия поступательного движения',
        tex: String.raw`\langle\varepsilon_\text{п}\rangle = \frac32kT = \frac{3p}{2n} = \frac{3\cdot10^{-3}}{2\cdot10^{16}} = 1{,}5\cdot10^{-19}\ \text{Дж}` },
    ],
    answer: [String.raw`T = 7{,}25\ \text{кК}`, String.raw`\langle\varepsilon_\text{п}\rangle = 1{,}5\cdot10^{-19}\ \text{Дж}`],
  },

  /* ===================== 9.19 ===================== */
  {
    id: '9.19', chapter: CH, section: S2, page: '147',
    title: 'Энергия молекул водяного пара',
    given: [[String.raw`T = 600\ \text{К}`, ''], [String.raw`i = 6\ (\text{H}_2\text{O})`, ''], [String.raw`\nu = 1\ \text{кмоль}`, String.raw`10^3\ \text{моль}`]],
    find: String.raw`\langle\varepsilon_\text{п}\rangle,\ \langle\varepsilon\rangle,\ W \;—\; ?`,
    formulas: [EPS],
    steps: [
      { title: 'Одна молекула',
        tex: String.raw`\langle\varepsilon_\text{п}\rangle = \frac32kT = 1{,}5\cdot1{,}38\cdot10^{-23}\cdot600 = 1{,}24\cdot10^{-20}\ \text{Дж};\quad \langle\varepsilon\rangle = \frac62kT = 2{,}48\cdot10^{-20}\ \text{Дж}` },
      { title: 'Поступательное движение всех молекул',
        tex: String.raw`W = \langle\varepsilon_\text{п}\rangle\nu N_\text{A} = \frac32\nu RT = 1{,}5\cdot10^3\cdot8{,}31\cdot600 = 7{,}48\cdot10^6\ \text{Дж}` },
    ],
    answer: [String.raw`\langle\varepsilon_\text{п}\rangle = 1{,}24\cdot10^{-20}\ \text{Дж}`, String.raw`\langle\varepsilon\rangle = 2{,}48\cdot10^{-20}\ \text{Дж}`, String.raw`W = \tfrac32\nu RT = 7{,}48\ \text{МДж}`],
    note: TYPO + String.raw`В книге формула $W = \langle\varepsilon\rangle\nu N_\text{A} = (i/2)RT\nu$ — с полной энергией и $i = 6$ вышло бы 15,0 МДж. Число 7,48 МДж верное: в условии спрошена энергия <i>поступательного</i> движения, $W = \frac32\nu RT$.`,
  },

  /* ===================== 9.20 ===================== */
  {
    id: '9.20', chapter: CH, section: S2, page: '147',
    title: 'Энергия молекул гелия, кислорода, пара',
    given: [[String.raw`T = 400\ \text{К}`, ''], [String.raw`i = 3,\ 5,\ 6`, '']],
    find: String.raw`\langle\varepsilon\rangle \;—\; ?`,
    formulas: [EPS],
    steps: [
      { title: 'Гелий (одноатомный)',
        tex: String.raw`\langle\varepsilon\rangle = \frac32kT = 1{,}5\cdot1{,}38\cdot10^{-23}\cdot400 = 8{,}28\cdot10^{-21}\ \text{Дж}` },
      { title: 'Кислород (двухатомный)',
        tex: String.raw`\langle\varepsilon\rangle = \frac52kT = 13{,}8\cdot10^{-21}\ \text{Дж}` },
      { title: 'Водяной пар (трёхатомный)',
        tex: String.raw`\langle\varepsilon\rangle = \frac62kT = 16{,}6\cdot10^{-21}\ \text{Дж}` },
    ],
    answer: [String.raw`\text{He: } 8{,}28\cdot10^{-21}\ \text{Дж}`, String.raw`\text{O}_2\text{: } 13{,}8\cdot10^{-21}\ \text{Дж}`, String.raw`\text{H}_2\text{O: } 16{,}6\cdot10^{-21}\ \text{Дж}`],
  },

  /* ===================== 9.21 ===================== */
  {
    id: '9.21', chapter: CH, section: S2, page: '147',
    title: 'Энергия молекулы азота по степеням свободы',
    given: [[String.raw`T = 1\ \text{кК}`, String.raw`10^3\ \text{К}`], [String.raw`i = 5\ (3 + 2)`, '']],
    find: String.raw`\langle\varepsilon_1\rangle,\ \langle\varepsilon_\text{п}\rangle,\ \langle\varepsilon_\text{вр}\rangle,\ \langle\varepsilon\rangle \;—\; ?`,
    formulas: [EPS],
    steps: [
      { title: 'На одну степень свободы',
        tex: String.raw`\langle\varepsilon_1\rangle = \frac12kT = 0{,}5\cdot1{,}38\cdot10^{-23}\cdot10^3 = 6{,}9\cdot10^{-21}\ \text{Дж}` },
      { title: 'Поступательное (3), вращательное (2), полная (5)',
        tex: String.raw`\langle\varepsilon_\text{п}\rangle = 3\langle\varepsilon_1\rangle = 20{,}7\cdot10^{-21};\quad \langle\varepsilon_\text{вр}\rangle = 2\langle\varepsilon_1\rangle = 13{,}8\cdot10^{-21};\quad \langle\varepsilon\rangle = 5\langle\varepsilon_1\rangle = 34{,}5\cdot10^{-21}\ \text{Дж}` },
    ],
    answer: [String.raw`\langle\varepsilon_1\rangle = 6{,}9\cdot10^{-21}\ \text{Дж}`, String.raw`\langle\varepsilon_\text{п}\rangle = 20{,}7\cdot10^{-21},\ \langle\varepsilon_\text{вр}\rangle = 13{,}8\cdot10^{-21}\ \text{Дж}`, String.raw`\langle\varepsilon\rangle = 34{,}5\cdot10^{-21}\ \text{Дж}`],
  },

  /* ===================== 9.22 ===================== */
  {
    id: '9.22', chapter: CH, section: S2, page: '147',
    title: 'Молекулы ртути в комнатном воздухе',
    given: [[String.raw`V = 1\ \text{м}^3`, ''], [String.raw`T = 293\ \text{К}`, ''], [String.raw`p = 0{,}13\ \text{Па}`, '']],
    find: String.raw`N \;—\; ?`,
    formulas: [PNKT],
    steps: [
      { title: 'Пар ртути — свой идеальный газ',
        text: 'Его парциальное давление 0,13 Па от воздуха не зависит.',
        tex: String.raw`N = \frac{pV}{kT} = \frac{0{,}13\cdot1}{1{,}38\cdot10^{-23}\cdot293} = 3{,}22\cdot10^{19}` },
    ],
    answer: [String.raw`N = pV/(kT) = 3{,}22\cdot10^{19}`],
  },

  /* ===================== 9.23 ===================== */
  {
    id: '9.23', chapter: CH, section: S2, page: '148',
    title: 'Газ со стенок сосуда',
    given: [[String.raw`R = 10\ \text{см}`, String.raw`0{,}1\ \text{м}`], [String.raw`\sigma = 10^{-15}\ \text{см}^2`, String.raw`10^{-19}\ \text{м}^2`], [String.raw`T = 600\ \text{К}`, '']],
    find: String.raw`\Delta p \;—\; ?`,
    formulas: [PNKT],
    steps: [
      { title: 'Число молекул в монослое',
        tex: String.raw`N = \frac{4\pi R^2}{\sigma}` },
      { title: 'Они переходят в объём сферы',
        tex: String.raw`\Delta p = \frac{N}{V}kT = \frac{4\pi R^2/\sigma}{\frac43\pi R^3}kT = \frac{3kT}{\sigma R} = \frac{3\cdot1{,}38\cdot10^{-23}\cdot600}{10^{-19}\cdot0{,}1} = 2{,}48\ \text{Па}` },
    ],
    answer: [String.raw`\Delta p = \frac{3kT}{\sigma R} = 2{,}48\ \text{Па}`],
  },

  /* ===================== 9.24 ===================== */
  {
    id: '9.24', chapter: CH, section: S2, page: '148',
    title: 'Температура диссоциации водорода',
    given: [[String.raw`W_m = 419\ \text{кДж/моль}`, String.raw`4{,}19\cdot10^5\ \text{Дж/моль}`]],
    find: String.raw`T \;—\; ?`,
    formulas: [EPS],
    steps: [
      { title: 'Энергия на одну молекулу',
        tex: String.raw`\frac32kT = \frac{W_m}{N_\text{A}}\ \Rightarrow\ T = \frac23\frac{W_m}{kN_\text{A}} = \frac23\frac{W_m}{R}` },
      { title: 'Считаем',
        tex: String.raw`T = \frac23\cdot\frac{4{,}19\cdot10^5}{8{,}31} = 3{,}36\cdot10^4\ \text{К}` },
    ],
    answer: [String.raw`T = \tfrac23W_m/R = 33{,}6\ \text{кК}`],
  },

  /* ===================== 9.25 ===================== */
  {
    id: '9.25', chapter: CH, section: S3, page: '148',
    title: 'Три скорости молекул водорода',
    given: [[String.raw`M = 2\cdot10^{-3}\ \text{кг/моль}`, ''], [String.raw`T = 20\ \text{К};\ 300\ \text{К};\ 5\ \text{кК}`, '']],
    find: String.raw`\langle v_\text{кв}\rangle,\ \langle v\rangle,\ v_\text{в} \;—\; ?`,
    formulas: [SPEEDS],
    steps: [
      { title: '1) T = 20 К',
        tex: String.raw`\langle v_\text{кв}\rangle = \sqrt{\frac{3\cdot8{,}31\cdot20}{0{,}002}} = 499\ \text{м/с};\quad \langle v\rangle = 460\ \text{м/с};\quad v_\text{в} = 408\ \text{м/с}` },
      { title: '2) T = 300 К',
        tex: String.raw`\langle v_\text{кв}\rangle = 1{,}93\ \text{км/с};\quad \langle v\rangle = 1{,}78\ \text{км/с};\quad v_\text{в} = 1{,}58\ \text{км/с}` },
      { title: '3) T = 5 кК',
        tex: String.raw`\langle v_\text{кв}\rangle = 7{,}89\ \text{км/с};\quad \langle v\rangle = 7{,}27\ \text{км/с};\quad v_\text{в} = 6{,}45\ \text{км/с}` },
      { title: 'Соотношение скоростей',
        text: 'При любой температуре v_в : ⟨v⟩ : ⟨v_кв⟩ = 1 : 1,128 : 1,225.' },
    ],
    answer: [String.raw`20\ \text{К: } 499;\ 460;\ 408\ \text{м/с}`, String.raw`300\ \text{К: } 1{,}93;\ 1{,}78;\ 1{,}58\ \text{км/с}`, String.raw`5\ \text{кК: } 7{,}89;\ 7{,}27;\ 6{,}45\ \text{км/с}`],
    note: SMALL + String.raw`В книге часть чисел на 0,3–0,5 % больше: 462 м/с; 1,94 и 1,79 км/с; 7,90, 7,30 и 6,48 км/с. С $R = 8{,}31$ и $M = 2$ г/моль (как в остальных задачах книги) — значения в разборе.`,
  },

  /* ===================== 9.26 ===================== */
  {
    id: '9.26', chapter: CH, section: S3, page: '148',
    title: 'Гелий со второй космической скоростью',
    given: [[String.raw`\langle v_\text{кв}\rangle = 11{,}2\ \text{км/с}`, String.raw`1{,}12\cdot10^4\ \text{м/с}`], [String.raw`M = 4\cdot10^{-3}\ \text{кг/моль}`, '']],
    find: String.raw`T \;—\; ?`,
    formulas: [SPEEDS],
    steps: [
      { tex: String.raw`T = \frac{M\langle v_\text{кв}\rangle^2}{3R} = \frac{4\cdot10^{-3}\cdot(1{,}12\cdot10^4)^2}{3\cdot8{,}31} = 2{,}01\cdot10^4\ \text{К}` },
    ],
    answer: [String.raw`T = 20{,}1\ \text{кК}`],
  },

  /* ===================== 9.27 ===================== */
  {
    id: '9.27', chapter: CH, section: S3, page: '148',
    title: 'Кислород со скоростью водорода',
    given: [[String.raw`T_1 = 100\ \text{К}\ (\text{H}_2)`, ''], [String.raw`M_1 = 2,\ M_2 = 32\ \text{г/моль}`, '']],
    find: String.raw`T_2 \;—\; ?`,
    formulas: [SPEEDS],
    steps: [
      { title: 'Равные скорости — равные T/M',
        tex: String.raw`\frac{T_2}{M_2} = \frac{T_1}{M_1}\ \Rightarrow\ T_2 = 100\cdot\frac{32}{2} = 1600\ \text{К}` },
    ],
    answer: [String.raw`T_2 = 1{,}6\ \text{кК}`],
  },

  /* ===================== 9.28 ===================== */
  {
    id: '9.28', chapter: CH, section: S3, page: '148',
    title: 'Скорость молекул по давлению и плотности',
    given: [[String.raw`V = 4\ \text{л}`, String.raw`4\cdot10^{-3}\ \text{м}^3`], [String.raw`m = 0{,}6\ \text{г}`, String.raw`6\cdot10^{-4}\ \text{кг}`], [String.raw`p = 200\ \text{кПа}`, String.raw`2\cdot10^5\ \text{Па}`]],
    find: String.raw`\langle v_\text{кв}\rangle \;—\; ?`,
    formulas: [SPEEDS, { tex: String.raw`\frac{RT}{M} = \frac{pV}{m}`, text: 'из уравнения Менделеева — Клапейрона — газ знать не нужно' }],
    steps: [
      { tex: String.raw`\langle v_\text{кв}\rangle = \sqrt{\frac{3pV}{m}} = \sqrt{\frac{3\cdot2\cdot10^5\cdot4\cdot10^{-3}}{6\cdot10^{-4}}} = 2\cdot10^3\ \text{м/с}` },
    ],
    answer: [String.raw`\langle v_\text{кв}\rangle = \sqrt{3pV/m} = 2\ \text{км/с}`],
  },

  /* ===================== 9.29 ===================== */
  {
    id: '9.29', chapter: CH, section: S3, page: '148',
    title: 'Гелий и аргон в смеси',
    given: [[String.raw`T = 1{,}2\ \text{кК}`, String.raw`1200\ \text{К}`], [String.raw`M_\text{He} = 4,\ M_\text{Ar} = 40\ \text{г/моль}`, '']],
    find: String.raw`\langle v_\text{кв}\rangle,\ \langle\varepsilon\rangle \;—\; ?`,
    formulas: [SPEEDS, EPS],
    steps: [
      { title: 'Скорости',
        tex: String.raw`\langle v_\text{кв}\rangle_\text{He} = \sqrt{\frac{3\cdot8{,}31\cdot1200}{0{,}004}} = 2{,}73\ \text{км/с};\quad \langle v_\text{кв}\rangle_\text{Ar} = \frac{2{,}73}{\sqrt{10}} = 865\ \text{м/с}` },
      { title: 'Энергия — одна на двоих',
        text: 'Оба газа одноатомные и при одной температуре — средняя энергия атома одинакова.',
        tex: String.raw`\langle\varepsilon\rangle = \frac32kT = 1{,}5\cdot1{,}38\cdot10^{-23}\cdot1200 = 2{,}48\cdot10^{-20}\ \text{Дж}` },
    ],
    answer: [String.raw`\text{He: } 2{,}73\ \text{км/с};\ \text{Ar: } 865\ \text{м/с}`, String.raw`\langle\varepsilon\rangle = 2{,}48\cdot10^{-20}\ \text{Дж}`],
  },

  /* ===================== 9.30 ===================== */
  {
    id: '9.30', chapter: CH, section: S3, page: '148',
    title: 'Скорость пылинки',
    given: [[String.raw`m = 10^{-10}\ \text{г}`, String.raw`10^{-13}\ \text{кг}`], [String.raw`T = 300\ \text{К}`, '']],
    find: String.raw`\langle v_\text{кв}\rangle \;—\; ?`,
    formulas: [{ tex: String.raw`\langle v_\text{кв}\rangle = \sqrt{\frac{3kT}{m_1}}`, text: 'через массу одной «молекулы»' }],
    steps: [
      { tex: String.raw`\langle v_\text{кв}\rangle = \sqrt{\frac{3\cdot1{,}38\cdot10^{-23}\cdot300}{10^{-13}}} = 3{,}52\cdot10^{-4}\ \text{м/с}` },
    ],
    answer: [String.raw`\langle v_\text{кв}\rangle = 352\ \text{мкм/с}`],
  },

  /* ===================== 9.31 ===================== */
  {
    id: '9.31', chapter: CH, section: S3, page: '148',
    title: 'Молекулы кислорода против пылинки',
    given: [[String.raw`m = 10^{-8}\ \text{г}`, String.raw`10^{-11}\ \text{кг}`], [String.raw`m_1 = M/N_\text{A} = 5{,}32\cdot10^{-26}\ \text{кг}`, '']],
    find: String.raw`v_1/v_2 \;—\; ?`,
    formulas: [{ tex: String.raw`\langle v_\text{кв}\rangle = \sqrt{\frac{3kT}{m_1}}`, text: 'температура общая — скорость обратно пропорциональна корню из массы' }],
    steps: [
      { tex: String.raw`\frac{v_1}{v_2} = \sqrt{\frac{m}{m_1}} = \sqrt{\frac{10^{-11}\cdot6{,}02\cdot10^{23}}{0{,}032}} = 1{,}37\cdot10^7` },
    ],
    answer: [String.raw`\text{в } 1{,}37\cdot10^7\ \text{раз}`],
  },

  /* ===================== 9.32 ===================== */
  {
    id: '9.32', chapter: CH, section: S3, page: '148',
    title: 'Средняя скорость по средней квадратичной',
    given: [[String.raw`\langle v_\text{кв}\rangle = 1\ \text{км/с}`, '']],
    find: String.raw`\langle v\rangle \;—\; ?`,
    formulas: [SPEEDS],
    steps: [
      { tex: String.raw`\frac{\langle v\rangle}{\langle v_\text{кв}\rangle} = \sqrt{\frac{8}{3\pi}} = 0{,}921\ \Rightarrow\ \langle v\rangle = 0{,}92\ \text{км/с}` },
    ],
    answer: [String.raw`\langle v\rangle = \sqrt{8/(3\pi)}\,\langle v_\text{кв}\rangle = 0{,}92\ \text{км/с}`],
  },

  /* ===================== 9.33 ===================== */
  {
    id: '9.33', chapter: CH, section: S3, page: '148',
    title: 'Наиболее вероятная скорость водорода',
    given: [[String.raw`T = 400\ \text{К}`, ''], [String.raw`M = 2\cdot10^{-3}\ \text{кг/моль}`, '']],
    find: String.raw`v_\text{в} \;—\; ?`,
    formulas: [SPEEDS],
    steps: [
      { tex: String.raw`v_\text{в} = \sqrt{\frac{2\cdot8{,}31\cdot400}{0{,}002}} = 1{,}82\cdot10^3\ \text{м/с}` },
    ],
    answer: [String.raw`v_\text{в} = 1{,}82\ \text{км/с}`],
  },

  );
})();
