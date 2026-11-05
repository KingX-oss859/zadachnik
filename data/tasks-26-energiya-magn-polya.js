/*
  § 26. Энергия магнитного поля — задачи 26.1–26.25 (стр. 368–370).
  Условия задач показываются дословно из книги (data/book-tasks.js).
  Ответы пересчитаны скриптом tools/check_energiya_magn_polya.py и сверены с book/99-otvety.md.
  Кривые B(H) — оцифровка рис. 24.1.
*/
(function () {
  const CH = 'Гл. 5. Электромагнетизм';
  const S1 = 'Энергия магнитного поля соленоида и тороида';
  const S2 = 'Объёмная плотность энергии';
  const MISMATCH = '<b>Расхождение с ответом книги.</b> ';
  const SMALL = '<b>Расхождение в последней цифре.</b> ';
  const GRAPH = '<b>Чтение графика.</b> ';

  const WL = { tex: String.raw`W = \frac{LI^2}{2} = \frac{\Psi I}{2}`, text: 'энергия магнитного поля контура' };
  const WV = { tex: String.raw`w = \frac{BH}{2} = \frac{B^2}{2\mu\mu_0} = \frac{\mu\mu_0H^2}{2}`, text: 'объёмная плотность энергии магнитного поля' };
  const MU = { tex: String.raw`B(H)\ \text{— по графику рис. 24.1},\quad \mu = \frac{B}{\mu_0H}`, text: 'ферромагнетик' };
  const THOM = { tex: String.raw`T = 2\pi\sqrt{LC},\quad \lambda = cT`, text: 'формула Томсона; длина волны, на которую резонирует контур' };
  const LSOL = { tex: String.raw`L = \frac{\mu_0N^2S}{l},\quad C = \frac{\varepsilon_0S}{d}`, text: 'индуктивность соленоида и ёмкость плоского конденсатора' };
  const EN = { tex: String.raw`\frac{LI_{\max}^2}{2} = \frac{CU_{\max}^2}{2}`, text: 'энергия в контуре переходит из магнитной в электрическую' };

  window.TASKS.push(

  /* ===================== 26.1 ===================== */
  {
    id: '26.1', chapter: CH, section: S1, page: '368',
    title: 'Энергия поля соленоида',
    given: [[String.raw`L = 0{,}2\ \text{Гн}`, ''], [String.raw`I = 10\ \text{А}`, '']],
    find: String.raw`W \;—\; ?`,
    formulas: [WL],
    steps: [{ title: 'Энергия', tex: String.raw`W = \frac{0{,}2\cdot100}{2} = 10\ \text{Дж}` }],
    answer: [String.raw`W = 10\ \text{Дж}`],
  },

  /* ===================== 26.2 ===================== */
  {
    id: '26.2', chapter: CH, section: S1, page: '368',
    title: 'Ток для заданной энергии',
    given: [[String.raw`L = 0{,}1\ \text{мГн}`, String.raw`10^{-4}\ \text{Гн}`], [String.raw`W = 10^{-4}\ \text{Дж}`, '']],
    find: String.raw`I \;—\; ?`,
    formulas: [WL],
    steps: [{ title: 'Ток', tex: String.raw`I = \sqrt{\frac{2W}{L}} = \sqrt2 = 1{,}41\ \text{А}` }],
    answer: [String.raw`I = 1{,}4\ \text{А}`],
  },

  /* ===================== 26.3 ===================== */
  {
    id: '26.3', chapter: CH, section: S1, page: '368',
    title: 'Энергия по потоку',
    given: [[String.raw`N = 1000`, ''], [String.raw`I = 1\ \text{А}`, ''], [String.raw`\Phi = 0{,}1\ \text{мВб}`, String.raw`10^{-4}\ \text{Вб}`]],
    find: String.raw`W \;—\; ?`,
    formulas: [WL],
    steps: [{ title: 'Энергия (Ψ = NΦ)', tex: String.raw`W = \frac{N\Phi I}{2} = \frac{1000\cdot10^{-4}\cdot1}{2} = 0{,}05\ \text{Дж}` }],
    answer: [String.raw`W = 50\ \text{мДж}`],
  },

  /* ===================== 26.4 ===================== */
  {
    id: '26.4', chapter: CH, section: S1, page: '368',
    title: 'Энергия в железном кольце',
    given: [[String.raw`N = 200`, ''], [String.raw`I = 2{,}5\ \text{А}`, ''], [String.raw`\Phi = 0{,}5\ \text{мВб}`, String.raw`5\cdot10^{-4}\ \text{Вб}`]],
    find: String.raw`W \;—\; ?`,
    formulas: [WL],
    steps: [{ title: 'Энергия', tex: String.raw`W = \frac{N\Phi I}{2} = \frac{200\cdot5\cdot10^{-4}\cdot2{,}5}{2} = 0{,}125\ \text{Дж}` }],
    answer: [String.raw`W = 0{,}125\ \text{Дж}`],
    note: MISMATCH + 'В книге 0,15 Дж. По данным условия NΦI/2 = 200·0,5·10⁻³·2,5/2 = 0,125 Дж (≈ 0,13 Дж).',
  },

  /* ===================== 26.5 ===================== */
  {
    id: '26.5', chapter: CH, section: S1, page: '368',
    title: 'Энергия в стальном сердечнике тороида',
    given: [[String.raw`I = 0{,}6\ \text{А}`, ''], [String.raw`d = 0{,}4\ \text{мм}`, String.raw`4\cdot10^{-4}\ \text{м}`], [String.raw`S = 4\ \text{см}^2`, String.raw`4\cdot10^{-4}\ \text{м}^2`], [String.raw`D = 30\ \text{см}`, String.raw`0{,}3\ \text{м}`]],
    find: String.raw`W \;—\; ?`,
    formulas: [WV, MU],
    steps: [
      { title: 'Напряжённость (витки вплотную: n = 1/d)', tex: String.raw`H = \frac Id = \frac{0{,}6}{4\cdot10^{-4}} = 1500\ \text{А/м}\ \Rightarrow\ B \approx 1{,}15\text{–}1{,}22\ \text{Тл}\ (\text{сталь})` },
      { title: 'Энергия', tex: String.raw`W = \frac{BH}{2}\pi DS = \frac{\pi DSIB}{2d} = 0{,}283\cdot B\ \text{Дж}` },
      { title: 'Числа', tex: String.raw`B = 1{,}15\ \text{Тл}:\ W = 324\ \text{мДж};\qquad B = 1{,}22\ \text{Тл}:\ W = 345\ \text{мДж}` },
    ],
    answer: [String.raw`W = \frac{\pi DSIB}{2d} \approx 0{,}32\text{–}0{,}35\ \text{Дж}\ (\text{книга: } 324\ \text{мДж})`],
    note: GRAPH + 'Книга читает для стали при H = 1500 А/м значение B ≈ 1,15 Тл; по нашей оцифровке рис. 24.1 выходит ≈ 1,22 Тл. Формула и ход решения от чтения графика не зависят.',
  },

  /* ===================== 26.6 ===================== */
  {
    id: '26.6', chapter: CH, section: S2, page: '369',
    title: 'Проницаемость по плотности энергии',
    given: [[String.raw`B = 1\ \text{Тл}`, ''], [String.raw`w = 200\ \text{Дж/м}^3`, '']],
    find: String.raw`\mu \;—\; ?`,
    formulas: [WV],
    steps: [{ title: 'Проницаемость', tex: String.raw`\mu = \frac{B^2}{2\mu_0w} = \frac{1}{2\cdot1{,}257\cdot10^{-6}\cdot200} = 1{,}99\cdot10^3` }],
    answer: [String.raw`\mu = 2\cdot10^3`],
  },

  /* ===================== 26.7 ===================== */
  {
    id: '26.7', chapter: CH, section: S2, page: '369',
    title: 'Плотность энергии в стали при 0,5 Тл',
    given: [[String.raw`B = 0{,}5\ \text{Тл}`, '']],
    find: String.raw`w \;—\; ?`,
    formulas: [WV, MU],
    steps: [
      { title: 'По графику', tex: String.raw`H \approx 220\ \text{А/м}\ (\text{сталь})` },
      { title: 'Плотность', tex: String.raw`w = \frac{BH}2 = \frac{0{,}5\cdot220}{2} \approx 55\ \text{Дж/м}^3` },
    ],
    answer: [String.raw`w \approx 55\ \text{Дж/м}^3\ (\text{в книге }25\ \text{Дж/м}^3)`],
    note: GRAPH + 'Ответ книги 25 Дж/м³ соответствует H = 100 А/м. На рис. 24.1 кривая стали начинается с H = 200 А/м, где B уже 0,45 Тл, поэтому 0,5 Тл приходится на H ≈ 220 А/м. Так же книга читает график в задаче 24.22.',
  },

  /* ===================== 26.8 ===================== */
  {
    id: '26.8', chapter: CH, section: S2, page: '369',
    title: 'Рост плотности энергии в стали',
    given: [[String.raw`B_1 = 0{,}5\ \text{Тл},\ B_2 = 1\ \text{Тл}`, '']],
    find: String.raw`w_2/w_1 \;—\; ?`,
    formulas: [WV, MU],
    steps: [
      { title: 'По графику (сталь)', tex: String.raw`H_1 \approx 220\ \text{А/м},\quad H_2 \approx 750\ \text{А/м}` },
      { title: 'Отношение', tex: String.raw`\frac{w_2}{w_1} = \frac{B_2H_2}{B_1H_1} = \frac{1\cdot750}{0{,}5\cdot220} \approx 6{,}7` },
    ],
    answer: [String.raw`\text{увеличится примерно в 6,4–6,8 раза}`],
    note: GRAPH + 'В книге 6,4; по оцифровке рис. 24.1 — 6,7. Расхождение в пределах точности чтения графика.',
  },

  /* ===================== 26.9 ===================== */
  {
    id: '26.9', chapter: CH, section: S2, page: '369',
    title: 'Плотность энергии в железе при H = 1,2 кА/м',
    given: [[String.raw`H = 1{,}2\cdot10^3\ \text{А/м}`, '']],
    find: String.raw`w \;—\; ?`,
    formulas: [WV, MU],
    steps: [{ title: 'Железо: B ≈ 1,33 Тл', tex: String.raw`w = \frac{BH}{2} = \frac{1{,}33\cdot1200}{2} \approx 800\ \text{Дж/м}^3` }],
    answer: [String.raw`w \approx 800\ \text{Дж/м}^3`],
  },

  /* ===================== 26.10 ===================== */
  {
    id: '26.10', chapter: CH, section: S2, page: '369',
    title: 'Сталь: H выросла от 200 до 800 А/м',
    given: [[String.raw`H_1 = 200\ \text{А/м},\ H_2 = 800\ \text{А/м}`, '']],
    find: String.raw`w_2/w_1 \;—\; ?`,
    formulas: [WV, MU],
    steps: [
      { title: 'По графику (сталь)', tex: String.raw`B_1 \approx 0{,}45\ \text{Тл},\quad B_2 \approx 1{,}02\ \text{Тл}` },
      { title: 'Отношение', tex: String.raw`\frac{w_2}{w_1} = \frac{B_2H_2}{B_1H_1} = \frac{1{,}02\cdot800}{0{,}45\cdot200} \approx 9` },
    ],
    answer: [String.raw`\text{увеличится примерно в 9–10,5 раза (по книге — в 10,5)}`],
    note: GRAPH + 'Ответ очень чувствителен к B₁ на самом краю графика. Ответ книги 10,5 соответствует B₁ ≈ 0,39 Тл, наша оцифровка рис. 24.1 даёт 0,45 Тл и отношение ≈ 9.',
  },

  /* ===================== 26.11 ===================== */
  {
    id: '26.11', chapter: CH, section: S2, page: '369',
    title: 'Вставили железный сердечник',
    given: [[String.raw`w_0 = 0{,}2\ \text{Дж/м}^3`, ''], [String.raw`I = \text{const}`, '']],
    find: String.raw`w/w_0 \;—\; ?`,
    formulas: [WV, MU],
    steps: [
      { title: 'H не меняется (тот же ток)', tex: String.raw`H = \sqrt{\frac{2w_0}{\mu_0}} = \sqrt{\frac{0{,}4}{1{,}257\cdot10^{-6}}} = 564\ \text{А/м}` },
      { title: 'Железо: B ≈ 1,13 Тл', tex: String.raw`\frac{w}{w_0} = \frac{BH/2}{\mu_0H^2/2} = \mu = \frac{1{,}13}{1{,}257\cdot10^{-6}\cdot564} \approx 1{,}6\cdot10^3` },
    ],
    answer: [String.raw`\text{в }1{,}6\cdot10^3\ \text{раза}`],
  },

  /* ===================== 26.12 ===================== */
  {
    id: '26.12', chapter: CH, section: S2, page: '369',
    title: 'Плотность энергии в железе при H = 1,6 кА/м',
    given: [[String.raw`H = 1{,}6\cdot10^3\ \text{А/м}`, '']],
    find: String.raw`w \;—\; ?`,
    formulas: [WV, MU],
    steps: [{ title: 'Железо: B ≈ 1,38 Тл', tex: String.raw`w = \frac{1{,}38\cdot1600}{2} = 1{,}1\cdot10^3\ \text{Дж/м}^3` }],
    answer: [String.raw`w = 1{,}1\ \text{кДж/м}^3`],
  },

  /* ===================== 26.13 ===================== */
  {
    id: '26.13', chapter: CH, section: S2, page: '369',
    title: 'Плотность энергии в тороиде без сердечника',
    given: [[String.raw`n = 10\ \text{см}^{-1}`, String.raw`10^3\ \text{м}^{-1}`], [String.raw`I = 16\ \text{А}`, '']],
    find: String.raw`w \;—\; ?`,
    formulas: [WV],
    steps: [{ title: 'H = nI', tex: String.raw`w = \frac{\mu_0(nI)^2}{2} = \frac{1{,}257\cdot10^{-6}\cdot(1{,}6\cdot10^4)^2}{2} = 161\ \text{Дж/м}^3` }],
    answer: [String.raw`w = 161\ \text{Дж/м}^3`],
  },

  /* ===================== 26.14 ===================== */
  {
    id: '26.14', chapter: CH, section: S2, page: '369',
    title: 'Ток для плотности 1 Дж/м³',
    given: [[String.raw`n = 10\ \text{см}^{-1}`, String.raw`10^3\ \text{м}^{-1}`], [String.raw`w = 1\ \text{Дж/м}^3`, '']],
    find: String.raw`I \;—\; ?`,
    formulas: [WV],
    steps: [{ title: 'Ток', tex: String.raw`I = \frac1n\sqrt{\frac{2w}{\mu_0}} = \frac{1}{10^3}\sqrt{\frac{2}{1{,}257\cdot10^{-6}}} = 1{,}26\ \text{А}` }],
    answer: [String.raw`I = 1{,}26\ \text{А}`],
  },

  /* ===================== 26.15 ===================== */
  {
    id: '26.15', chapter: CH, section: S2, page: '369',
    title: 'Контур из катушки и круглого конденсатора',
    given: [[String.raw`L = 1\ \text{мГн}`, String.raw`10^{-3}\ \text{Гн}`], [String.raw`D = 20\ \text{см}`, String.raw`0{,}2\ \text{м}`], [String.raw`d = 1\ \text{см}`, String.raw`0{,}01\ \text{м}`]],
    find: String.raw`T \;—\; ?`,
    formulas: [THOM, LSOL],
    steps: [
      { title: 'Ёмкость', tex: String.raw`C = \frac{\varepsilon_0\pi D^2}{4d} = \frac{8{,}85\cdot10^{-12}\cdot\pi\cdot0{,}04}{0{,}04} = 2{,}78\cdot10^{-11}\ \text{Ф}` },
      { title: 'Период', tex: String.raw`T = 2\pi\sqrt{LC} = \pi D\sqrt{\frac{\pi\varepsilon_0L}{d}} = 2\pi\sqrt{2{,}78\cdot10^{-14}} = 1{,}05\cdot10^{-6}\ \text{с}` },
    ],
    answer: [String.raw`T = \pi D\sqrt{\pi\varepsilon_0L/d} = 1{,}05\ \text{мкс}`],
    note: MISMATCH + 'В книге 33,2 нс, хотя формула та же. Подстановка в неё даёт 1,05 мкс.',
  },

  /* ===================== 26.16 ===================== */
  {
    id: '26.16', chapter: CH, section: S2, page: '369',
    title: 'Период контура с катушкой 1000 витков',
    given: [[String.raw`C = 500\ \text{пФ}`, String.raw`5\cdot10^{-10}\ \text{Ф}`], [String.raw`l = 40\ \text{см}`, String.raw`0{,}4\ \text{м}`], [String.raw`S = 5\ \text{см}^2`, String.raw`5\cdot10^{-4}\ \text{м}^2`], [String.raw`N = 1000`, '']],
    find: String.raw`T \;—\; ?`,
    formulas: [THOM, LSOL],
    steps: [
      { title: 'Индуктивность', tex: String.raw`L = \frac{1{,}257\cdot10^{-6}\cdot10^6\cdot5\cdot10^{-4}}{0{,}4} = 1{,}57\cdot10^{-3}\ \text{Гн}` },
      { title: 'Период', tex: String.raw`T = 2\pi\sqrt{1{,}57\cdot10^{-3}\cdot5\cdot10^{-10}} = 5{,}57\cdot10^{-6}\ \text{с}` },
    ],
    answer: [String.raw`T = 5{,}57\ \text{мкс}`],
  },

  /* ===================== 26.17 ===================== */
  {
    id: '26.17', chapter: CH, section: S2, page: '369–370',
    title: 'Разброс длины волны при допуске ёмкости',
    given: [[String.raw`L = 20\ \text{мкГн}`, String.raw`2\cdot10^{-5}\ \text{Гн}`], [String.raw`C = 80\ \text{нФ}`, String.raw`8\cdot10^{-8}\ \text{Ф}`], [String.raw`\delta C = 2\%`, '']],
    find: String.raw`\lambda \pm \Delta\lambda \;—\; ?`,
    formulas: [THOM],
    steps: [
      { title: 'Длина волны', tex: String.raw`\lambda = 2\pi c\sqrt{LC} = 2\pi\cdot3\cdot10^8\cdot1{,}265\cdot10^{-6} = 2{,}38\cdot10^3\ \text{м}` },
      { title: 'λ ∝ √C → δλ = δC/2 = 1 %', tex: String.raw`\Delta\lambda = 0{,}01\cdot2380 = 23{,}8\ \text{м}` },
    ],
    answer: [String.raw`\lambda = (2{,}38\cdot10^3 \pm 23{,}8)\ \text{м}`],
  },

  /* ===================== 26.18 ===================== */
  {
    id: '26.18', chapter: CH, section: S2, page: '370',
    title: 'Максимальный ток в контуре',
    given: [[String.raw`L = 1{,}6\ \text{мГн}`, String.raw`1{,}6\cdot10^{-3}\ \text{Гн}`], [String.raw`C = 0{,}04\ \text{мкФ}`, String.raw`4\cdot10^{-8}\ \text{Ф}`], [String.raw`U_{\max} = 200\ \text{В}`, '']],
    find: String.raw`I_{\max} \;—\; ?`,
    formulas: [EN],
    steps: [{ title: 'Ток', tex: String.raw`I_{\max} = U_{\max}\sqrt{\frac CL} = 200\sqrt{\frac{4\cdot10^{-8}}{1{,}6\cdot10^{-3}}} = 200\cdot5\cdot10^{-3} = 1\ \text{А}` }],
    answer: [String.raw`I_{\max} = 1\ \text{А}`],
  },

  /* ===================== 26.19 ===================== */
  {
    id: '26.19', chapter: CH, section: S2, page: '370',
    title: 'Максимальное напряжение в контуре',
    given: [[String.raw`C = 8\ \text{пФ}`, String.raw`8\cdot10^{-12}\ \text{Ф}`], [String.raw`L = 0{,}5\ \text{мГн}`, String.raw`5\cdot10^{-4}\ \text{Гн}`], [String.raw`I_{\max} = 40\ \text{мА}`, String.raw`0{,}04\ \text{А}`]],
    find: String.raw`U_{\max} \;—\; ?`,
    formulas: [EN],
    steps: [{ title: 'Напряжение', tex: String.raw`U_{\max} = I_{\max}\sqrt{\frac LC} = 0{,}04\cdot\sqrt{6{,}25\cdot10^7} = 0{,}04\cdot7906 = 316\ \text{В}` }],
    answer: [String.raw`U_{\max} = 316\ \text{В}`],
    note: SMALL + 'В книге 317 В; точно 316,2.',
  },

  /* ===================== 26.20 ===================== */
  {
    id: '26.20', chapter: CH, section: S2, page: '370',
    title: 'Контур из катушки и плоского конденсатора',
    given: [[String.raw`l = 50\ \text{см},\ S_1 = 3\ \text{см}^2,\ N = 1000`, ''], [String.raw`S_2 = 75\ \text{см}^2`, String.raw`7{,}5\cdot10^{-3}\ \text{м}^2`], [String.raw`d = 5\ \text{мм}`, String.raw`5\cdot10^{-3}\ \text{м}`]],
    find: String.raw`T \;—\; ?`,
    formulas: [THOM, LSOL],
    steps: [
      { title: 'L и C', tex: String.raw`L = \frac{1{,}257\cdot10^{-6}\cdot10^6\cdot3\cdot10^{-4}}{0{,}5} = 7{,}54\cdot10^{-4}\ \text{Гн},\quad C = \frac{8{,}85\cdot10^{-12}\cdot7{,}5\cdot10^{-3}}{5\cdot10^{-3}} = 1{,}33\cdot10^{-11}\ \text{Ф}` },
      { title: 'Период', tex: String.raw`T = 2\pi\sqrt{LC} = 2\pi\sqrt{1{,}0\cdot10^{-14}} = 6{,}28\cdot10^{-7}\ \text{с}` },
    ],
    answer: [String.raw`T = 628\ \text{нс}`],
  },

  /* ===================== 26.21 ===================== */
  {
    id: '26.21', chapter: CH, section: S2, page: '370',
    title: 'Частота колебаний контура',
    given: [[String.raw`C = 1\ \text{мкФ}`, String.raw`10^{-6}\ \text{Ф}`], [String.raw`L = 1\ \text{мГн}`, String.raw`10^{-3}\ \text{Гн}`]],
    find: String.raw`\nu \;—\; ?`,
    formulas: [THOM],
    steps: [{ title: 'Частота', tex: String.raw`\nu = \frac{1}{2\pi\sqrt{LC}} = \frac{1}{2\pi\cdot3{,}16\cdot10^{-5}} = 5{,}03\cdot10^3\ \text{Гц}` }],
    answer: [String.raw`\nu = 5{,}03\ \text{кГц}`],
    note: SMALL + 'В книге 5,05 кГц; точно 5,033.',
  },

  /* ===================== 26.22 ===================== */
  {
    id: '26.22', chapter: CH, section: S2, page: '370',
    title: 'Ёмкость для λ = 300 м',
    given: [[String.raw`L = 0{,}5\ \text{мГн}`, String.raw`5\cdot10^{-4}\ \text{Гн}`], [String.raw`\lambda = 300\ \text{м}`, '']],
    find: String.raw`C \;—\; ?`,
    formulas: [THOM],
    steps: [{ title: 'Ёмкость', tex: String.raw`C = \frac{\lambda^2}{4\pi^2c^2L} = \frac{9\cdot10^4}{39{,}5\cdot9\cdot10^{16}\cdot5\cdot10^{-4}} = 5{,}1\cdot10^{-11}\ \text{Ф}` }],
    answer: [String.raw`C = 51\ \text{пФ}`],
  },

  /* ===================== 26.23 ===================== */
  {
    id: '26.23', chapter: CH, section: S2, page: '370',
    title: 'Длина волны контура',
    given: [[String.raw`L = 4\ \text{мкГн}`, String.raw`4\cdot10^{-6}\ \text{Гн}`], [String.raw`C = 1{,}11\ \text{нФ}`, String.raw`1{,}11\cdot10^{-9}\ \text{Ф}`]],
    find: String.raw`\lambda \;—\; ?`,
    formulas: [THOM],
    steps: [{ title: 'Длина волны', tex: String.raw`\lambda = 2\pi c\sqrt{LC} = 1{,}885\cdot10^9\cdot6{,}66\cdot10^{-8} = 126\ \text{м}` }],
    answer: [String.raw`\lambda = 126\ \text{м}`],
  },

  /* ===================== 26.24 ===================== */
  {
    id: '26.24', chapter: CH, section: S2, page: '370',
    title: 'Показатель преломления парафина',
    given: [[String.raw`\varepsilon = 2,\ \mu = 1`, '']],
    find: String.raw`n \;—\; ?`,
    formulas: [{ tex: String.raw`n = \frac cv = \sqrt{\varepsilon\mu}`, text: 'скорость электромагнитной волны в среде v = c/√(εμ)' }],
    steps: [{ title: 'Показатель', tex: String.raw`n = \sqrt2 = 1{,}4` }],
    answer: [String.raw`n = 1{,}4`],
  },

  /* ===================== 26.25 ===================== */
  {
    id: '26.25', chapter: CH, section: S2, page: '370',
    title: 'Стоячие волны в глицерине',
    given: [[String.raw`\nu = 420\ \text{МГц}`, String.raw`4{,}2\cdot10^8\ \text{Гц}`], [String.raw`l = 7\ \text{см}`, String.raw`0{,}07\ \text{м}`]],
    find: String.raw`\varepsilon \;—\; ?`,
    formulas: [{ tex: String.raw`l = \frac\lambda2,\quad v = \lambda\nu = \frac{c}{\sqrt\varepsilon}`, text: 'между пучностями — полволны' }],
    steps: [
      { title: 'Скорость волны', tex: String.raw`v = 2l\nu = 0{,}14\cdot4{,}2\cdot10^8 = 5{,}88\cdot10^7\ \text{м/с}` },
      { title: 'Проницаемость', tex: String.raw`\varepsilon = \left(\frac cv\right)^2 = (5{,}10)^2 = 26` },
    ],
    answer: [String.raw`\varepsilon = 26`],
  }

  );
})();
