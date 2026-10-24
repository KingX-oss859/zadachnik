/*
  § 8. Молекулярное строение вещества. Законы идеальных газов — задачи 8.1–8.45 (стр. 137–141).
  Условия задач показываются дословно из книги (data/book-tasks.js).
  Ответы пересчитаны скриптом tools/check_gazy.py и сверены с book/99-otvety.md.
  Где ответ книги расходится с расчётом — плашка note «Расхождение с ответом книги».
  Постоянные — табл. 24 приложения: N_A = 6,02·10²³ моль⁻¹, R = 8,31 Дж/(моль·К), V_m = 22,4·10⁻³ м³/моль, g = 9,81 м/с².
  Нормальные условия: p₀ = 101,3 кПа, T₀ = 273 К.
*/
(function () {
  const CH = 'Гл. 2. Молекулярная физика и термодинамика';
  const S1 = 'Молекулярное строение вещества';
  const S2 = 'Уравнение газового состояния';
  const S3 = 'Смеси газов';
  const MISMATCH = '<b>Расхождение с ответом книги.</b> ';
  const SMALL = '<b>Расхождение в последней цифре.</b> ';
  const TYPO = '<b>Опечатка в формуле книги.</b> ';

  const MOLAR = { tex: String.raw`M = M_rk,\quad k = 10^{-3}\ \text{кг/моль}`, text: 'молярная масса через относительную молекулярную массу Mr' };
  const NU = { tex: String.raw`\nu = \frac mM = \frac{N}{N_\text{A}}`, text: 'количество вещества; N_A = 6,02·10²³ моль⁻¹ — постоянная Авогадро' };
  const VMOL = { tex: String.raw`\nu = \frac{V}{V_m},\quad V_m = 22{,}4\cdot10^{-3}\ \text{м}^3\text{/моль}`, text: 'при нормальных условиях моль любого газа занимает V_m' };
  const CLAP = { tex: String.raw`pV = \frac mMRT = \nu RT`, text: 'уравнение Клапейрона — Менделеева; R = 8,31 Дж/(моль·К)' };
  const STATE = { tex: String.raw`\frac{p_1V_1}{T_1} = \frac{p_2V_2}{T_2}`, text: 'объединённый газовый закон (масса газа постоянна)' };
  const BOYLE = { tex: String.raw`p_1V_1 = p_2V_2`, text: 'закон Бойля — Мариотта (T = const)' };
  const HYDRO = { tex: String.raw`p = \rho gh`, text: 'давление столба жидкости высотой h' };
  const ARCH = { tex: String.raw`F = (\rho_\text{возд} - \rho_\text{газ})gV`, text: 'подъёмная сила: архимедова сила минус вес газа в оболочке' };
  const DALTON = { tex: String.raw`p = p_1 + p_2 + \dots,\quad p_i = \frac{m_i}{M_i}\frac{RT}{V}`, text: 'закон Дальтона: давление смеси — сумма парциальных давлений' };
  const MMIX = { tex: String.raw`M = \frac{m}{\nu} = \frac{1}{\sum w_i/M_i}`, text: 'молярная масса смеси; w_i — массовые доли' };

  window.TASKS.push(

  /* ===================== 8.1 ===================== */
  {
    id: '8.1', chapter: CH, section: S1, page: '137',
    title: 'Относительные молекулярные массы',
    given: [[String.raw`\text{H}_2\text{O},\ \text{CO}_2,\ \text{NaCl}`, '']],
    find: String.raw`M_r \;—\; ?`,
    formulas: [{ tex: String.raw`M_r = \sum n_iA_i`, text: 'сумма относительных атомных масс всех атомов молекулы (по таблице Менделеева)' }],
    steps: [
      { title: 'Складываем атомные массы',
        tex: String.raw`\begin{aligned} &\text{H}_2\text{O}:\ 2\cdot1 + 16 = 18 \\ &\text{CO}_2:\ 12 + 2\cdot16 = 44 \\ &\text{NaCl}:\ 22{,}99 + 35{,}45 = 58{,}4 \end{aligned}` },
    ],
    answer: [String.raw`1)\ 18;\quad 2)\ 44;\quad 3)\ 58{,}4`],
  },

  /* ===================== 8.2 ===================== */
  {
    id: '8.2', chapter: CH, section: S1, page: '137',
    title: 'Молярная масса серной кислоты',
    given: [[String.raw`\text{H}_2\text{SO}_4`, '']],
    find: String.raw`M \;—\; ?`,
    formulas: [MOLAR],
    steps: [
      { title: 'Относительная молекулярная масса',
        tex: String.raw`M_r = 2\cdot1 + 32 + 4\cdot16 = 98` },
      { title: 'Молярная масса',
        tex: String.raw`M = M_rk = 98\cdot10^{-3}\ \text{кг/моль}` },
    ],
    answer: [String.raw`M = 98\cdot10^{-3}\ \text{кг/моль}`],
  },

  /* ===================== 8.3 ===================== */
  {
    id: '8.3', chapter: CH, section: S1, page: '137',
    title: 'Масса одной молекулы',
    given: [[String.raw`\text{CO}_2:\ M_r = 44`, ''], [String.raw`\text{NaCl}:\ M_r = 58{,}4`, '']],
    find: String.raw`m_1 \;—\; ?`,
    formulas: [MOLAR, NU],
    steps: [
      { title: 'Моль содержит N_A молекул',
        tex: String.raw`m_1 = \frac{M}{N_\text{A}} = \frac{M_rk}{N_\text{A}}` },
      { title: 'Числа',
        tex: String.raw`m_{\text{CO}_2} = \frac{44\cdot10^{-3}}{6{,}02\cdot10^{23}} = 7{,}31\cdot10^{-26}\ \text{кг},\qquad m_\text{NaCl} = \frac{58{,}4\cdot10^{-3}}{6{,}02\cdot10^{23}} = 9{,}70\cdot10^{-26}\ \text{кг}` },
    ],
    answer: [String.raw`1)\ 7{,}31\cdot10^{-26}\ \text{кг};\quad 2)\ 9{,}70\cdot10^{-26}\ \text{кг}`],
  },

  /* ===================== 8.4 ===================== */
  {
    id: '8.4', chapter: CH, section: S1, page: '137',
    title: 'Плотность кислорода в сосуде',
    given: [[String.raw`V = 2\ \text{л}`, String.raw`2\cdot10^{-3}\ \text{м}^3`], [String.raw`\nu = 0{,}2\ \text{моль}`, ''], [String.raw`M = 32\cdot10^{-3}\ \text{кг/моль}`, '']],
    find: String.raw`\rho \;—\; ?`,
    formulas: [NU],
    steps: [
      { title: 'Масса газа и плотность',
        tex: String.raw`\rho = \frac mV = \frac{M\nu}{V} = \frac{32\cdot10^{-3}\cdot0{,}2}{2\cdot10^{-3}} = 3{,}2\ \text{кг/м}^3` },
    ],
    answer: [String.raw`\rho = M\nu/V = 3{,}2\ \text{кг/м}^3`],
  },

  /* ===================== 8.5 ===================== */
  {
    id: '8.5', chapter: CH, section: S1, page: '137',
    title: 'Моли и молекулы азота',
    given: [[String.raw`m = 0{,}2\ \text{кг}`, ''], [String.raw`M = 28\cdot10^{-3}\ \text{кг/моль}`, '']],
    find: String.raw`\nu,\ N \;—\; ?`,
    formulas: [NU],
    steps: [
      { title: 'Количество вещества',
        tex: String.raw`\nu = \frac mM = \frac{0{,}2}{0{,}028} = 7{,}14\ \text{моль}` },
      { title: 'Число молекул',
        tex: String.raw`N = \nu N_\text{A} = 7{,}14\cdot6{,}02\cdot10^{23} = 4{,}30\cdot10^{24}` },
    ],
    answer: [String.raw`\nu = 7{,}14\ \text{моль};\quad N = 4{,}30\cdot10^{24}`],
  },

  /* ===================== 8.6 ===================== */
  {
    id: '8.6', chapter: CH, section: S1, page: '137',
    title: 'Моли и молекулы кислорода в баллоне',
    note: MISMATCH + String.raw`В книге $N = 7{,}52\cdot10^{21}$ — ошибка в показателе степени: $0{,}125\cdot6{,}02\cdot10^{23} = 7{,}52\cdot10^{22}$.`,
    given: [[String.raw`V = 3\ \text{л}`, ''], [String.raw`m = 4\ \text{г}`, String.raw`4\cdot10^{-3}\ \text{кг}`], [String.raw`M = 32\cdot10^{-3}\ \text{кг/моль}`, '']],
    find: String.raw`\nu,\ N \;—\; ?`,
    formulas: [NU],
    steps: [
      { title: 'Количество вещества',
        text: 'Вместимость баллона для ответа не нужна.',
        tex: String.raw`\nu = \frac mM = \frac{4}{32} = 0{,}125\ \text{моль}` },
      { title: 'Число молекул',
        tex: String.raw`N = \nu N_\text{A} = 0{,}125\cdot6{,}02\cdot10^{23} = 7{,}52\cdot10^{22}` },
    ],
    answer: [String.raw`\nu = 0{,}125\ \text{моль};\quad N = 7{,}52\cdot10^{22}`],
  },

  /* ===================== 8.7 ===================== */
  {
    id: '8.7', chapter: CH, section: S1, page: '137',
    title: 'Кислород при нормальных условиях',
    given: [[String.raw`V = 11{,}2\ \text{л}`, String.raw`11{,}2\cdot10^{-3}\ \text{м}^3`]],
    find: String.raw`\nu,\ m \;—\; ?`,
    formulas: [VMOL, NU],
    steps: [
      { title: 'Количество вещества',
        tex: String.raw`\nu = \frac{V}{V_m} = \frac{11{,}2}{22{,}4} = 0{,}5\ \text{моль}` },
      { title: 'Масса',
        tex: String.raw`m = M\nu = 32\cdot0{,}5 = 16\ \text{г}` },
    ],
    answer: [String.raw`\nu = 0{,}5\ \text{моль};\quad m = 16\ \text{г}`],
  },

  /* ===================== 8.8 ===================== */
  {
    id: '8.8', chapter: CH, section: S1, page: '137',
    title: 'Водород по плотности',
    given: [[String.raw`V = 3\ \text{л}`, String.raw`3\cdot10^{-3}\ \text{м}^3`], [String.raw`\rho = 6{,}65\cdot10^{-3}\ \text{кг/м}^3`, ''], [String.raw`M = 2\cdot10^{-3}\ \text{кг/моль}`, '']],
    find: String.raw`\nu \;—\; ?`,
    formulas: [NU],
    steps: [
      { title: 'Масса и моли',
        text: 'В условии единица плотности напечатана «кг/моль» — по смыслу кг/м³.',
        tex: String.raw`\nu = \frac{\rho V}{M} = \frac{6{,}65\cdot10^{-3}\cdot3\cdot10^{-3}}{2\cdot10^{-3}} = 9{,}97\cdot10^{-3}\ \text{моль}` },
    ],
    answer: [String.raw`\nu = \rho V/M = 9{,}97\cdot10^{-3}\ \text{моль}`],
  },

  /* ===================== 8.9 ===================== */
  {
    id: '8.9', chapter: CH, section: S1, page: '137',
    title: 'Молекулы в колбе',
    given: [[String.raw`V = 0{,}5\ \text{л}`, String.raw`5\cdot10^{-4}\ \text{м}^3`]],
    find: String.raw`N \;—\; ?`,
    formulas: [VMOL, NU],
    steps: [
      { title: 'Число молекул',
        tex: String.raw`N = N_\text{A}\frac{V}{V_m} = 6{,}02\cdot10^{23}\cdot\frac{0{,}5}{22{,}4} = 1{,}34\cdot10^{22}` },
    ],
    answer: [String.raw`N = N_\text{A}V/V_m = 1{,}34\cdot10^{22}`],
  },

  /* ===================== 8.10 ===================== */
  {
    id: '8.10', chapter: CH, section: S1, page: '137',
    title: 'Атомы в 1 г вещества',
    given: [[String.raw`m = 1\ \text{г}`, String.raw`10^{-3}\ \text{кг}`], [String.raw`A:\ \text{He}\ 4,\ \text{C}\ 12,\ \text{F}\ 19,\ \text{Po}\ 210`, '']],
    find: String.raw`N \;—\; ?`,
    formulas: [NU],
    steps: [
      { title: 'Газы одноатомные',
        text: 'Считаем каждое вещество состоящим из отдельных атомов: N = (m/M)·N_A, M = A·10⁻³ кг/моль.',
        tex: String.raw`\begin{aligned} &\text{He}:\ \tfrac14\cdot6{,}02\cdot10^{23} = 1{,}50\cdot10^{23} \\ &\text{C}:\ \tfrac1{12}\cdot6{,}02\cdot10^{23} = 5{,}02\cdot10^{22} \\ &\text{F}:\ \tfrac1{19}\cdot6{,}02\cdot10^{23} = 3{,}17\cdot10^{22} \\ &\text{Po}:\ \tfrac1{210}\cdot6{,}02\cdot10^{23} = 2{,}87\cdot10^{21} \end{aligned}` },
    ],
    answer: [String.raw`1)\ 1{,}50\cdot10^{23};\quad 2)\ 5{,}02\cdot10^{22};\quad 3)\ 3{,}17\cdot10^{22};\quad 4)\ 2{,}87\cdot10^{21}`],
  },

  /* ===================== 8.11 ===================== */
  {
    id: '8.11', chapter: CH, section: S1, page: '137',
    title: 'Какой это газ?',
    given: [[String.raw`V = 5\ \text{л}`, String.raw`5\cdot10^{-3}\ \text{м}^3`], [String.raw`\nu = 0{,}2\ \text{моль}`, ''], [String.raw`\rho = 1{,}12\ \text{кг/м}^3`, '']],
    find: String.raw`M_r \;—\; ?`,
    formulas: [NU, MOLAR],
    steps: [
      { title: 'Молярная масса',
        tex: String.raw`M = \frac m\nu = \frac{\rho V}{\nu} = \frac{1{,}12\cdot5\cdot10^{-3}}{0{,}2} = 28\cdot10^{-3}\ \text{кг/моль}` },
      { title: 'Вывод',
        text: 'Mr = 28 — это азот N₂.' },
    ],
    answer: [String.raw`M_r = 28\ \text{— азот}`],
  },

  /* ===================== 8.12 ===================== */
  {
    id: '8.12', chapter: CH, section: S1, page: '138',
    title: 'Частично распавшийся азот',
    note: MISMATCH + String.raw`В книге $N = 2{,}87\cdot10^{20}$ — ошибка в показателе степени. По формуле самой книги $\frac43\cdot\frac{0{,}01}{0{,}028}\cdot6{,}02\cdot10^{23} = 2{,}87\cdot10^{23}$.`,
    given: [[String.raw`m = 10\ \text{г}`, String.raw`10^{-2}\ \text{кг}`], [String.raw`M = 28\cdot10^{-3}\ \text{кг/моль}`, ''], [String.raw`\text{распалась}\ 1/3\ \text{молекул}`, '']],
    find: String.raw`N \;—\; ?`,
    formulas: [NU],
    steps: [
      { title: 'Сколько было молекул',
        tex: String.raw`N_0 = \frac mMN_\text{A} = \frac{0{,}01}{0{,}028}\cdot6{,}02\cdot10^{23} = 2{,}15\cdot10^{23}` },
      { title: 'После распада',
        text: String.raw`Целыми остались $\frac23N_0$ молекул, а каждая из $\frac13N_0$ распавшихся дала два атома.`,
        tex: String.raw`N = \frac23N_0 + 2\cdot\frac13N_0 = \frac43N_0 = 2{,}87\cdot10^{23}` },
    ],
    answer: [String.raw`N = \tfrac43\frac mMN_\text{A} = 2{,}87\cdot10^{23}`],
  },

  /* ===================== 8.13 ===================== */
  {
    id: '8.13', chapter: CH, section: S1, page: '138',
    title: 'Размер молекулы жидкости',
    given: [[String.raw`\text{CS}_2:\ M = 76\cdot10^{-3}\ \text{кг/моль},\ \rho = 1260\ \text{кг/м}^3`, ''], [String.raw`\text{Hg}:\ M = 200{,}6\cdot10^{-3}\ \text{кг/моль},\ \rho = 13\,600\ \text{кг/м}^3`, '']],
    find: String.raw`d \;—\; ?`,
    formulas: [NU],
    steps: [
      { title: 'Модель',
        text: 'Молекулы-шарики касаются друг друга, на каждую приходится кубик со стороной d. Объём моля жидкости M/ρ делим на N_A молекул.',
        tex: String.raw`d^3 = \frac{M}{\rho N_\text{A}} \;\Rightarrow\; d = \sqrt[3]{\frac{M}{\rho N_\text{A}}}` },
      { title: 'Сероуглерод',
        tex: String.raw`d_1 = \sqrt[3]{\frac{0{,}076}{1260\cdot6{,}02\cdot10^{23}}} = 4{,}64\cdot10^{-10}\ \text{м} = 0{,}464\ \text{нм}` },
      { title: 'Ртуть',
        tex: String.raw`d_2 = \sqrt[3]{\frac{0{,}2006}{13\,600\cdot6{,}02\cdot10^{23}}} = 0{,}290\ \text{нм}` },
    ],
    answer: [String.raw`d = \sqrt[3]{M/(\rho N_\text{A})};\quad d_1 = 0{,}464\ \text{нм};\quad d_2 = 0{,}290\ \text{нм}`],
  },

  /* ===================== 8.14 ===================== */
  {
    id: '8.14', chapter: CH, section: S1, page: '138',
    title: 'Расстояние между молекулами пара',
    given: [[String.raw`d = 0{,}311\ \text{нм}`, String.raw`3{,}11\cdot10^{-10}\ \text{м}`], [String.raw`\text{нормальные условия}`, '']],
    find: String.raw`\langle l\rangle,\ \langle l\rangle/d \;—\; ?`,
    formulas: [VMOL, NU],
    steps: [
      { title: 'Объём на одну молекулу',
        text: 'При нормальных условиях моль пара занимает V_m; на молекулу приходится кубик V_m/N_A, его ребро — среднее расстояние между центрами.',
        tex: String.raw`\langle l\rangle = \sqrt[3]{\frac{V_m}{N_\text{A}}} = \sqrt[3]{\frac{22{,}4\cdot10^{-3}}{6{,}02\cdot10^{23}}} = 3{,}34\cdot10^{-9}\ \text{м}` },
      { title: 'Сравнение',
        text: 'Молекулы пара удалены друг от друга на расстояние в десять раз больше своего размера — газ почти «пустой».',
        tex: String.raw`\frac{\langle l\rangle}{d} = \frac{3{,}34}{0{,}311} = 10{,}7` },
    ],
    answer: [String.raw`\langle l\rangle = 3{,}34\ \text{нм};\quad \langle l\rangle/d = 10{,}7`],
  },

  /* ===================== 8.15 ===================== */
  {
    id: '8.15', chapter: CH, section: S1, page: '138',
    title: 'Диссоциация азота',
    given: [[String.raw`V = 1{,}12\ \text{л}`, String.raw`1{,}12\cdot10^{-3}\ \text{м}^3`], [String.raw`\alpha = 0{,}3`, '']],
    find: String.raw`\nu,\ \nu_\text{мол},\ \nu_\text{ат},\ \nu_\text{пол} \;—\; ?`,
    formulas: [VMOL],
    steps: [
      { title: '1) До нагревания',
        tex: String.raw`\nu = \frac{V}{V_m} = \frac{1{,}12}{22{,}4} = 0{,}05\ \text{моль} = 50\ \text{ммоль}` },
      { title: '2) Целые молекулы',
        tex: String.raw`\nu_\text{мол} = \nu(1 - \alpha) = 35\ \text{ммоль}` },
      { title: '3) Атомы',
        text: 'Каждая распавшаяся молекула даёт два атома.',
        tex: String.raw`\nu_\text{ат} = 2\alpha\nu = 30\ \text{ммоль}` },
      { title: '4) Всего частиц',
        tex: String.raw`\nu_\text{пол} = \nu(1 + \alpha) = 65\ \text{ммоль}` },
    ],
    answer: [String.raw`50;\quad 35;\quad 30;\quad 65\ \text{ммоль}`],
  },

  /* ===================== 8.16 ===================== */
  {
    id: '8.16', chapter: CH, section: S2, page: '138',
    title: 'Поршень сжимает воздух',
    note: SMALL + String.raw`В книге 32,3 кН — так выходит при $p_0 = 101$ кПа; с $p_0 = 101{,}3$ кПа — 32,4 кН.`,
    given: [[String.raw`l = 1{,}6\ \text{м}`, ''], [String.raw`p_0 = 101{,}3\ \text{кПа}`, ''], [String.raw`S = 200\ \text{см}^2`, String.raw`2\cdot10^{-2}\ \text{м}^2`], [String.raw`l_1 = 10\ \text{см}`, String.raw`0{,}1\ \text{м}`]],
    find: String.raw`F \;—\; ?`,
    formulas: [BOYLE],
    steps: [
      { title: 'Сжатие изотермическое',
        text: 'Поршень двигают медленно — температура воздуха успевает выравниваться.',
        tex: String.raw`p_0Sl = pSl_1 \;\Rightarrow\; p = p_0\frac{l}{l_1} = 16p_0 = 1{,}62\ \text{МПа}` },
      { title: 'Сила давления газа на поршень',
        text: 'Снаружи на поршень давит атмосфера, поэтому удерживать его нужно силой (p − p₀)S = 30,4 кН; сила давления самого газа — pS.',
        tex: String.raw`F = pS = 1{,}62\cdot10^6\cdot0{,}02 = 32{,}4\ \text{кН}` },
    ],
    answer: [String.raw`F = \frac{l}{l_1}p_0S = 32{,}4\ \text{кН}`],
  },

  /* ===================== 8.17 ===================== */
  {
    id: '8.17', chapter: CH, section: S2, page: '138',
    title: 'Разреженный воздух в колбе',
    given: [[String.raw`V = 300\ \text{см}^3`, ''], [String.raw`m = 292\ \text{г}`, String.raw`\text{объём воды } 292\ \text{см}^3`], [String.raw`p_0 = 100\ \text{кПа}`, '']],
    find: String.raw`p \;—\; ?`,
    formulas: [BOYLE],
    steps: [
      { title: 'Что осталось от воздуха',
        text: 'В условии вместимость напечатана в «см²» — по смыслу см³. Вода заняла 292 см³, воздух сжался до 8 см³ при атмосферном давлении (глубина мала).',
        tex: String.raw`pV = p_0\left(V - \frac m\rho\right)` },
      { title: 'Давление',
        tex: String.raw`p = p_0\left(1 - \frac{m}{\rho V}\right) = 100\cdot\frac{8}{300} = 2{,}67\ \text{кПа}` },
    ],
    answer: [String.raw`p = p_0\left(1 - \frac{m}{\rho V}\right) = 2{,}67\ \text{кПа}`],
  },

  /* ===================== 8.18 ===================== */
  {
    id: '8.18', chapter: CH, section: S2, page: '138',
    title: 'U-образный манометр',
    note: TYPO + String.raw`В конце формулы книги стоит $-\rho g\Delta h$, а должно быть $-\rho g\Delta h_1$ (разность уровней после подключения). Число 47,2 кПа в книге посчитано верно, с $\Delta h_1$.`,
    given: [[String.raw`\Delta h = 10\ \text{см}`, String.raw`0{,}1\ \text{м}`], [String.raw`l = 20\ \text{см}`, String.raw`0{,}2\ \text{м}`], [String.raw`\Delta h_1 = 26\ \text{см}`, String.raw`0{,}26\ \text{м}`], [String.raw`p_0 = 101{,}3\ \text{кПа}`, ''], [String.raw`\rho = 13\,600\ \text{кг/м}^3`, '']],
    find: String.raw`p \;—\; ?`,
    formulas: [BOYLE, HYDRO],
    steps: [
      { title: 'Воздух в закрытом колене сначала',
        text: 'Ртуть в открытом колене выше на Δh — значит воздух в закрытом колене сжат сильнее атмосферы.',
        tex: String.raw`p_1 = p_0 + \rho g\Delta h = 101{,}3 + 13{,}3 = 114{,}7\ \text{кПа}` },
      { title: 'Как сдвинулась ртуть',
        text: String.raw`Разность уровней выросла на 16 см: в открытом колене ртуть поднялась на 8 см, в закрытом опустилась на 8 см. Столб воздуха стал $l_2 = l + \frac{\Delta h_1 - \Delta h}{2} = 28$ см.` },
      { title: 'Изотермическое расширение',
        tex: String.raw`p_2 = p_1\frac{l}{l_2} = 114{,}7\cdot\frac{20}{28} = 81{,}9\ \text{кПа}` },
      { title: 'Давление в баллоне',
        text: 'Теперь ртуть в открытом колене выше на Δh₁:',
        tex: String.raw`p = p_2 - \rho g\Delta h_1 = \frac{2(p_0 + \rho g\Delta h)l}{2l + \Delta h_1 - \Delta h} - \rho g\Delta h_1 = 81{,}9 - 34{,}7 = 47{,}2\ \text{кПа}` },
    ],
    answer: [String.raw`p = 47{,}2\ \text{кПа}`],
  },

  /* ===================== 8.19 ===================== */
  {
    id: '8.19', chapter: CH, section: S2, page: '138–139',
    title: 'Манометр с маленьким объёмом воздуха',
    note: TYPO + String.raw`В формуле книги в знаменателе $(\Delta h_2 - \Delta h_1)$ — с таким знаком объём воздуха уменьшился бы; должно быть $(\Delta h_1 - \Delta h_2)$. И к результату нужно прибавить $\rho g\Delta h_2$ (давление столбика ртути). Число 2,32 кПа в книге верное.`,
    given: [[String.raw`d = 5\ \text{мм}`, ''], [String.raw`V_1 = 10\ \text{мм}^3`, ''], [String.raw`\Delta h_1 = 10\ \text{см}`, ''], [String.raw`\Delta h_2 = 1\ \text{см}`, ''], [String.raw`p_0 = 101{,}3\ \text{кПа}`, '']],
    find: String.raw`p \;—\; ?`,
    formulas: [BOYLE, HYDRO],
    steps: [
      { title: 'Сначала (рис. 8.1, а)',
        text: 'Ртуть в закрытом колене выше на Δh₁ — воздух в нём разрежен.',
        tex: String.raw`p_1 = p_0 - \rho g\Delta h_1 = 101{,}3 - 13{,}3 = 88{,}0\ \text{кПа}` },
      { title: 'После подключения (рис. 8.1, б)',
        text: String.raw`Разность уменьшилась на 9 см: в закрытом колене ртуть опустилась на 4,5 см, воздух занял добавочный объём $\frac{\pi d^2}{4}\cdot\frac{\Delta h_1 - \Delta h_2}{2}$.`,
        tex: String.raw`V_2 = V_1 + \frac{\pi d^2}{8}(\Delta h_1 - \Delta h_2) = 10 + 19{,}6\cdot45 = 894\ \text{мм}^3` },
      { title: 'Давление воздуха в колене',
        tex: String.raw`p_2 = p_1\frac{V_1}{V_2} = 88{,}0\cdot\frac{10}{894} = 0{,}985\ \text{кПа}` },
      { title: 'Давление в сосуде',
        text: 'Ртуть в закрытом колене всё ещё выше на Δh₂:',
        tex: String.raw`p = p_2 + \rho g\Delta h_2 = 0{,}985 + 1{,}33 = 2{,}32\ \text{кПа}` },
    ],
    answer: [String.raw`p = \frac{(p_0 - \rho g\Delta h_1)V_1}{V_1 + \frac{\pi d^2}{8}(\Delta h_1 - \Delta h_2)} + \rho g\Delta h_2 = 2{,}32\ \text{кПа}`],
  },

  /* ===================== 8.20 ===================== */
  {
    id: '8.20', chapter: CH, section: S2, page: '139',
    title: 'Давление вдвое больше',
    given: [[String.raw`t_1 = 100\ ^\circ\text{C}`, String.raw`373\ \text{К}`], [String.raw`p_2 = 2p_1`, '']],
    find: String.raw`t_2 \;—\; ?`,
    formulas: [{ tex: String.raw`\frac{p_1}{T_1} = \frac{p_2}{T_2}`, text: 'закон Шарля (V = const)' }],
    steps: [
      { title: 'Изохорный процесс',
        tex: String.raw`T_2 = 2T_1 = 746\ \text{К},\qquad t_2 = 746 - 273 = 473\ ^\circ\text{C}` },
    ],
    answer: [String.raw`t_2 = 473\ ^\circ\text{C}`],
  },

  /* ===================== 8.21 ===================== */
  {
    id: '8.21', chapter: CH, section: S2, page: '139',
    title: 'Начальная температура по расширению',
    given: [[String.raw`\Delta T = 1\ \text{К}`, ''], [String.raw`\Delta V/V = 1/350`, '']],
    find: String.raw`T \;—\; ?`,
    formulas: [{ tex: String.raw`\frac VT = \text{const}`, text: 'закон Гей-Люссака (p = const)' }],
    steps: [
      { title: 'Изобарный процесс',
        tex: String.raw`\frac{\Delta V}{V} = \frac{\Delta T}{T} \;\Rightarrow\; T = 350\cdot1 = 350\ \text{К}` },
    ],
    answer: [String.raw`T = 350\ \text{К}`],
  },

  /* ===================== 8.22 ===================== */
  {
    id: '8.22', chapter: CH, section: S2, page: '139',
    title: 'Ртуть входит в остывающий шар',
    given: [[String.raw`V = 10\ \text{см}^3`, ''], [String.raw`T_1 = 573\ \text{К}`, ''], [String.raw`T_2 = 293\ \text{К}`, ''], [String.raw`\rho = 13{,}6\ \text{г/см}^3`, '']],
    find: String.raw`m \;—\; ?`,
    formulas: [{ tex: String.raw`\frac{V_1}{T_1} = \frac{V_2}{T_2}`, text: 'закон Гей-Люссака: давление воздуха остаётся атмосферным' }],
    steps: [
      { title: 'Объём воздуха после остывания',
        tex: String.raw`V_2 = V\frac{T_2}{T_1} = 10\cdot\frac{293}{573} = 5{,}11\ \text{см}^3` },
      { title: 'Ртуть заняла остальное',
        tex: String.raw`m = \rho(V - V_2) = \rho V\frac{T_1 - T_2}{T_1} = 13{,}6\cdot4{,}89 = 66{,}5\ \text{г}` },
    ],
    answer: [String.raw`m = \rho V\frac{T_1 - T_2}{T_1} = 66{,}5\ \text{г}`],
  },

  /* ===================== 8.23 ===================== */
  {
    id: '8.23', chapter: CH, section: S2, page: '139',
    title: 'Подъёмная сила при нагревании',
    given: [[String.raw`V = 800\ \text{м}^3`, ''], [String.raw`T_1 = 273\ \text{К},\ T_2 = 293\ \text{К}`, ''], [String.raw`\rho_\text{возд} = 1{,}29,\ \rho_{\text{H}_2} = 0{,}09\ \text{кг/м}^3\ (\text{н. у.})`, '']],
    find: String.raw`\Delta F \;—\; ?`,
    formulas: [ARCH, { tex: String.raw`\rho = \rho_0\frac{T_0}{T}`, text: 'при постоянном давлении плотность газа обратно пропорциональна температуре' }],
    steps: [
      { title: 'Что меняется',
        text: 'Нагреваются и водород (лишний выходит через отверстие), и окружающий воздух — как в ответе книги. Обе плотности уменьшаются в T₂/T₁ раз.',
        tex: String.raw`F(T) = (\rho_\text{возд} - \rho_{\text{H}_2})gV\frac{T_1}{T}` },
      { title: 'Изменение',
        text: 'Подъёмная сила уменьшается на',
        tex: String.raw`\Delta F = (\rho_\text{возд} - \rho_{\text{H}_2})gV\frac{T_2 - T_1}{T_2} = 1{,}2\cdot9{,}81\cdot800\cdot\frac{20}{293} = 643\ \text{Н}` },
    ],
    answer: [String.raw`\text{уменьшится на}\ \Delta F = 643\ \text{Н}`],
  },

  /* ===================== 8.24 ===================== */
  {
    id: '8.24', chapter: CH, section: S2, page: '139',
    title: 'Подъёмная сила аэростата',
    given: [[String.raw`V = 1500\ \text{м}^3`, ''], [String.raw`T_0 = 273\ \text{К},\ T = 293\ \text{К}`, ''], [String.raw`\rho_0 = 1{,}29\ \text{кг/м}^3`, '']],
    find: String.raw`\Delta F \;—\; ?`,
    formulas: [ARCH, { tex: String.raw`\frac{V}{T} = \text{const}`, text: 'закон Гей-Люссака' }],
    steps: [
      { title: 'Газ расширяется',
        text: 'Оболочка заполнена частично, давление постоянно — масса газа та же, а объём растёт. Вес газа не меняется; растёт вытесненный объём воздуха (окружающий воздух — при нормальных условиях).',
        tex: String.raw`\Delta V = V\frac{T - T_0}{T_0} = 1500\cdot\frac{20}{273} = 110\ \text{м}^3` },
      { title: 'Прибавка подъёмной силы',
        tex: String.raw`\Delta F = \rho_0g\Delta V = 1{,}29\cdot9{,}81\cdot110 = 1{,}39\ \text{кН}` },
    ],
    answer: [String.raw`\Delta F = \frac{\rho_0gV(T - T_0)}{T_0} = 1{,}39\ \text{кН}`],
  },

  /* ===================== 8.25 ===================== */
  {
    id: '8.25', chapter: CH, section: S2, page: '139',
    title: 'Газовый термометр',
    given: [[String.raw`S = 0{,}1\ \text{см}^2`, ''], [String.raw`T_1 = 273\ \text{К},\ l_1 = 30\ \text{см}`, ''], [String.raw`T_2 = 278\ \text{К},\ l_2 = 50\ \text{см}`, '']],
    find: String.raw`V \;—\; ?`,
    formulas: [{ tex: String.raw`\frac{V_1}{T_1} = \frac{V_2}{T_2}`, text: 'закон Гей-Люссака: капелька держит давление атмосферным' }],
    steps: [
      { title: 'Объём газа — шар плюс трубка до капельки',
        tex: String.raw`\frac{V + l_1S}{T_1} = \frac{V + l_2S}{T_2}` },
      { title: 'Вместимость шара',
        tex: String.raw`V = \frac{(l_2 - l_1)ST_1}{T_2 - T_1} - l_1S = \frac{20\cdot0{,}1\cdot273}{5} - 3 = 106\ \text{см}^3` },
    ],
    answer: [String.raw`V = 106\ \text{см}^3`],
  },

  /* ===================== 8.26 ===================== */
  {
    id: '8.26', chapter: CH, section: S2, page: '140',
    title: 'Вода поднимается в опрокинутом сосуде',
    note: MISMATCH + String.raw`В книге 4,5 см. Квадратное уравнение книги (оно такое же, как здесь) при $p_0 = 101{,}3$ кПа даёт 4,6 см. Если пренебречь давлением поднявшейся воды, было бы 4,8 см.`,
    given: [[String.raw`l = h_1 = 40\ \text{см}`, String.raw`0{,}4\ \text{м}`], [String.raw`T_1 = 310\ \text{К},\ T_2 = 273\ \text{К}`, ''], [String.raw`p_0 = 101{,}3\ \text{кПа}`, '']],
    find: String.raw`\Delta h \;—\; ?`,
    formulas: [STATE, HYDRO],
    steps: [
      { title: 'Давления',
        text: 'Сначала уровни равны — давление воздуха в сосуде p₀. Потом вода внутри поднялась на Δh, давление воздуха стало p₀ − ρgΔh, высота воздушного столба h₁ − Δh.' },
      { title: 'Уравнение состояния',
        tex: String.raw`\frac{p_0h_1}{T_1} = \frac{(p_0 - \rho g\Delta h)(h_1 - \Delta h)}{T_2}` },
      { title: 'Квадратное уравнение',
        tex: String.raw`\Delta h^2 - \left(h_1 + \frac{p_0}{\rho g}\right)\Delta h + \frac{p_0h_1}{\rho g}\left(1 - \frac{T_2}{T_1}\right) = 0` },
      { title: 'Корень',
        text: String.raw`$\frac{p_0}{\rho g} = 10{,}33$ м. Второй корень (около 10,7 м) не имеет смысла.`,
        tex: String.raw`\Delta h^2 - 10{,}73\,\Delta h + 0{,}493 = 0 \;\Rightarrow\; \Delta h = 0{,}046\ \text{м} = 4{,}6\ \text{см}` },
    ],
    answer: [String.raw`\Delta h = 4{,}6\ \text{см}`],
  },

  /* ===================== 8.27 ===================== */
  {
    id: '8.27', chapter: CH, section: S2, page: '140',
    title: 'Масса углекислого газа в баллоне',
    given: [[String.raw`V = 12\ \text{л}`, String.raw`1{,}2\cdot10^{-2}\ \text{м}^3`], [String.raw`p = 1\ \text{МПа}`, String.raw`10^6\ \text{Па}`], [String.raw`T = 300\ \text{К}`, ''], [String.raw`M = 44\cdot10^{-3}\ \text{кг/моль}`, '']],
    find: String.raw`m \;—\; ?`,
    formulas: [CLAP],
    steps: [
      { title: 'Из уравнения Менделеева — Клапейрона',
        tex: String.raw`m = \frac{MpV}{RT} = \frac{0{,}044\cdot10^6\cdot0{,}012}{8{,}31\cdot300} = 0{,}212\ \text{кг}` },
    ],
    answer: [String.raw`m = \frac{MpV}{RT} = 0{,}212\ \text{кг}`],
  },

  /* ===================== 8.28 ===================== */
  {
    id: '8.28', chapter: CH, section: S2, page: '140',
    title: 'Объём киломоля газа',
    given: [[String.raw`\nu = 1\ \text{кмоль}`, String.raw`10^3\ \text{моль}`], [String.raw`p = 1\ \text{МПа}`, String.raw`10^6\ \text{Па}`], [String.raw`T = 400\ \text{К}`, '']],
    find: String.raw`V \;—\; ?`,
    formulas: [CLAP],
    steps: [
      { title: 'Объём',
        tex: String.raw`V = \frac{\nu RT}{p} = \frac{10^3\cdot8{,}31\cdot400}{10^6} = 3{,}32\ \text{м}^3` },
    ],
    answer: [String.raw`V = 3{,}32\ \text{м}^3`],
  },

  /* ===================== 8.29 ===================== */
  {
    id: '8.29', chapter: CH, section: S2, page: '140',
    title: 'Давление пара в котле',
    note: SMALL + String.raw`В книге 1,16 МПа; подстановка $\frac{10\cdot8{,}31\cdot500}{0{,}018\cdot2}$ даёт 1,15 МПа.`,
    given: [[String.raw`V = 2\ \text{м}^3`, ''], [String.raw`m = 10\ \text{кг}`, ''], [String.raw`T = 500\ \text{К}`, ''], [String.raw`M = 18\cdot10^{-3}\ \text{кг/моль}`, '']],
    find: String.raw`p \;—\; ?`,
    formulas: [CLAP],
    steps: [
      { title: 'Давление',
        tex: String.raw`p = \frac{mRT}{MV} = \frac{10\cdot8{,}31\cdot500}{0{,}018\cdot2} = 1{,}15\cdot10^6\ \text{Па}` },
    ],
    answer: [String.raw`p = \frac{mRT}{MV} = 1{,}15\ \text{МПа}`],
  },

  /* ===================== 8.30 ===================== */
  {
    id: '8.30', chapter: CH, section: S2, page: '140',
    title: 'Температура углекислого газа',
    given: [[String.raw`V = 20\ \text{л}`, String.raw`2\cdot10^{-2}\ \text{м}^3`], [String.raw`m = 500\ \text{г}`, String.raw`0{,}5\ \text{кг}`], [String.raw`p = 1{,}3\ \text{МПа}`, String.raw`1{,}3\cdot10^6\ \text{Па}`]],
    find: String.raw`T \;—\; ?`,
    formulas: [CLAP],
    steps: [
      { title: 'Температура',
        tex: String.raw`T = \frac{pMV}{mR} = \frac{1{,}3\cdot10^6\cdot0{,}044\cdot0{,}02}{0{,}5\cdot8{,}31} = 275\ \text{К}` },
    ],
    answer: [String.raw`T = \frac{pMV}{mR} = 275\ \text{К}`],
  },

  /* ===================== 8.31 ===================== */
  {
    id: '8.31', chapter: CH, section: S2, page: '140',
    title: 'Газ по плотности',
    note: TYPO + String.raw`В ответе книги «$M = 44$ кг/моль» — должно быть $44\cdot10^{-3}$ кг/моль. $M_r = 44$ — верно.`,
    given: [[String.raw`T = 309\ \text{К}`, ''], [String.raw`p = 0{,}7\ \text{МПа}`, String.raw`7\cdot10^5\ \text{Па}`], [String.raw`\rho = 12\ \text{кг/м}^3`, '']],
    find: String.raw`M_r \;—\; ?`,
    formulas: [CLAP, MOLAR],
    steps: [
      { title: 'Молярная масса',
        text: 'Делим уравнение состояния на V: p = ρRT/M.',
        tex: String.raw`M = \frac{\rho RT}{p} = \frac{12\cdot8{,}31\cdot309}{7\cdot10^5} = 44\cdot10^{-3}\ \text{кг/моль}` },
      { title: 'Ответ',
        text: 'Mr = 44 — например, углекислый газ CO₂.' },
    ],
    answer: [String.raw`M_r = 44`],
  },

  /* ===================== 8.32 ===================== */
  {
    id: '8.32', chapter: CH, section: S2, page: '140',
    title: 'Плотность насыщенного пара',
    given: [[String.raw`T = 300\ \text{К}`, ''], [String.raw`p = 3{,}55\ \text{кПа}`, String.raw`3{,}55\cdot10^3\ \text{Па}`]],
    find: String.raw`\rho \;—\; ?`,
    formulas: [CLAP],
    steps: [
      { title: 'Плотность пара',
        tex: String.raw`\rho = \frac{Mp}{RT} = \frac{0{,}018\cdot3550}{8{,}31\cdot300} = 2{,}56\cdot10^{-2}\ \text{кг/м}^3` },
    ],
    answer: [String.raw`\rho = \frac{Mp}{RT} = 2{,}56\cdot10^{-2}\ \text{кг/м}^3`],
  },

  /* ===================== 8.33 ===================== */
  {
    id: '8.33', chapter: CH, section: S2, page: '140',
    title: 'Подъёмная сила на высоте',
    given: [[String.raw`V = 1600\ \text{м}^3`, ''], [String.raw`p = 60\ \text{кПа}`, String.raw`6\cdot10^4\ \text{Па}`], [String.raw`T = 280\ \text{К}`, ''], [String.raw`M_\text{возд} = 29,\ M_{\text{H}_2} = 2\ \text{г/моль}`, '']],
    find: String.raw`F \;—\; ?`,
    formulas: [ARCH, CLAP],
    steps: [
      { title: 'Плотности воздуха и водорода',
        text: 'Водород выходит через отверстие — его давление и температура как у окружающего воздуха.',
        tex: String.raw`\rho = \frac{Mp}{RT}` },
      { title: 'Подъёмная сила',
        tex: String.raw`F = (M_2 - M_1)g\frac{pV}{RT} = 0{,}027\cdot9{,}81\cdot\frac{6\cdot10^4\cdot1600}{8{,}31\cdot280} = 10{,}9\ \text{кН}` },
    ],
    answer: [String.raw`F = (M_\text{возд} - M_{\text{H}_2})g\frac{pV}{RT} = 10{,}9\ \text{кН}`],
  },

  /* ===================== 8.34 ===================== */
  {
    id: '8.34', chapter: CH, section: S2, page: '140',
    title: 'Израсходованный водород',
    given: [[String.raw`V = 25\ \text{л}`, String.raw`2{,}5\cdot10^{-2}\ \text{м}^3`], [String.raw`T = 290\ \text{К}`, ''], [String.raw`\Delta p = 0{,}4\ \text{МПа}`, String.raw`4\cdot10^5\ \text{Па}`]],
    find: String.raw`m \;—\; ?`,
    formulas: [CLAP],
    steps: [
      { title: 'Масса пропорциональна давлению',
        text: 'Объём и температура те же.',
        tex: String.raw`m = \frac{MV}{RT}\Delta p = \frac{0{,}002\cdot0{,}025}{8{,}31\cdot290}\cdot4\cdot10^5 = 8{,}3\cdot10^{-3}\ \text{кг}` },
    ],
    answer: [String.raw`m = \frac{MV}{RT}\Delta p = 8{,}3\ \text{г}`],
  },

  /* ===================== 8.35 ===================== */
  {
    id: '8.35', chapter: CH, section: S2, page: '141',
    title: 'Водород выходит из аэростата',
    given: [[String.raw`V = 1600\ \text{м}^3,\ k = 7/8`, ''], [String.raw`p_1 = 100\ \text{кПа},\ T_1 = 290\ \text{К}`, ''], [String.raw`p_2 = 80\ \text{кПа},\ T_2 = 280\ \text{К}`, '']],
    find: String.raw`\Delta m \;—\; ?`,
    formulas: [CLAP],
    steps: [
      { title: 'Масса водорода внизу',
        tex: String.raw`m_1 = \frac{Mp_1kV}{RT_1} = \frac{0{,}002\cdot10^5\cdot1400}{8{,}31\cdot290} = 116{,}2\ \text{кг}` },
      { title: 'Наверху оболочка заполнена целиком',
        text: 'Газ расширился бы до 1690 м³ > 1600 м³, поэтому оболочка полна, лишнее вышло.',
        tex: String.raw`m_2 = \frac{Mp_2V}{RT_2} = \frac{0{,}002\cdot8\cdot10^4\cdot1600}{8{,}31\cdot280} = 110{,}0\ \text{кг}` },
      { title: 'Вышло',
        tex: String.raw`\Delta m = \frac{MV}{R}\left(k\frac{p_1}{T_1} - \frac{p_2}{T_2}\right) = 6{,}16\ \text{кг}` },
    ],
    answer: [String.raw`\Delta m = 6{,}16\ \text{кг}`],
  },

  /* ===================== 8.36 ===================== */
  {
    id: '8.36', chapter: CH, section: S3, page: '141',
    title: 'Объём смеси азота и гелия',
    note: SMALL + String.raw`В книге 6,42 м³ — так выходит при $p_0 = 101$ кПа; с $p_0 = 101{,}3$ кПа (или через $V_m = 22{,}4$ л/моль) — 6,40 м³.`,
    given: [[String.raw`m_1 = m_2 = 1\ \text{кг}`, ''], [String.raw`M_1 = 28,\ M_2 = 4\ \text{г/моль}`, ''], [String.raw`\text{н. у.:}\ p_0 = 101{,}3\ \text{кПа},\ T_0 = 273\ \text{К}`, '']],
    find: String.raw`V \;—\; ?`,
    formulas: [CLAP, DALTON],
    steps: [
      { title: 'Количество вещества смеси',
        tex: String.raw`\nu = \frac{m_1}{M_1} + \frac{m_2}{M_2} = 35{,}7 + 250 = 285{,}7\ \text{моль}` },
      { title: 'Объём',
        tex: String.raw`V = \nu\frac{RT_0}{p_0} = 285{,}7\cdot\frac{8{,}31\cdot273}{101\,300} = 6{,}40\ \text{м}^3` },
    ],
    answer: [String.raw`V = \left(\frac{m_1}{M_1} + \frac{m_2}{M_2}\right)\frac{RT}{p} = 6{,}40\ \text{м}^3`],
  },

  /* ===================== 8.37 ===================== */
  {
    id: '8.37', chapter: CH, section: S3, page: '141',
    title: 'Соединение двух баллонов',
    note: MISMATCH + String.raw`В книге $p'_1 = 0{,}76$, $p'_2 = 1{,}12$, $p = 1{,}88$ МПа — так получается, если общий объём взять 63 л. Но $20 + 44 = 64$ л, и по формулам самой книги: $\frac{2{,}4\cdot20}{64} = 0{,}75$, $\frac{1{,}6\cdot44}{64} = 1{,}10$, сумма 1,85 МПа.`,
    given: [[String.raw`V_1 = 20\ \text{л},\ p_1 = 2{,}4\ \text{МПа}`, ''], [String.raw`V_2 = 44\ \text{л},\ p_2 = 1{,}6\ \text{МПа}`, ''], [String.raw`T = \text{const}`, '']],
    find: String.raw`p'_1,\ p'_2,\ p \;—\; ?`,
    formulas: [BOYLE, DALTON],
    steps: [
      { title: 'Каждый газ расширяется на весь объём',
        text: 'После соединения газ из каждого баллона занимает V₁ + V₂ = 64 л при той же температуре.',
        tex: String.raw`p'_1 = \frac{p_1V_1}{V_1 + V_2} = \frac{2{,}4\cdot20}{64} = 0{,}75\ \text{МПа},\qquad p'_2 = \frac{p_2V_2}{V_1 + V_2} = \frac{1{,}6\cdot44}{64} = 1{,}10\ \text{МПа}` },
      { title: 'Общее давление',
        tex: String.raw`p = p'_1 + p'_2 = 1{,}85\ \text{МПа}` },
    ],
    answer: [String.raw`p'_1 = 0{,}75\ \text{МПа};\quad p'_2 = 1{,}10\ \text{МПа};\quad p = 1{,}85\ \text{МПа}`],
  },

  /* ===================== 8.38 ===================== */
  {
    id: '8.38', chapter: CH, section: S3, page: '141',
    title: 'Давление смеси азота и водорода',
    given: [[String.raw`V = 0{,}01\ \text{м}^3`, ''], [String.raw`m_1 = 7\ \text{г}\ (\text{N}_2),\ m_2 = 1\ \text{г}\ (\text{H}_2)`, ''], [String.raw`T = 280\ \text{К}`, '']],
    find: String.raw`p \;—\; ?`,
    formulas: [DALTON],
    steps: [
      { title: 'Сумма парциальных давлений',
        tex: String.raw`p = \left(\frac{7}{28} + \frac12\right)\frac{8{,}31\cdot280}{0{,}01} = 0{,}75\cdot232\,700 = 175\ \text{кПа}` },
    ],
    answer: [String.raw`p = \left(\frac{m_1}{M_1} + \frac{m_2}{M_2}\right)\frac{RT}{V} = 175\ \text{кПа}`],
  },

  /* ===================== 8.39 ===================== */
  {
    id: '8.39', chapter: CH, section: S3, page: '141',
    title: 'Плотность гремучей смеси',
    given: [[String.raw`w_1 = 1/9\ (\text{H}_2),\ w_2 = 8/9\ (\text{O}_2)`, ''], [String.raw`p = 100\ \text{кПа}`, ''], [String.raw`T = 300\ \text{К}`, '']],
    find: String.raw`\rho \;—\; ?`,
    formulas: [MMIX, CLAP],
    steps: [
      { title: 'Молярная масса смеси',
        text: 'На 1 г водорода (0,5 моль) приходится 8 г кислорода (0,25 моль): 9 г на 0,75 моль.',
        tex: String.raw`M = \frac{9M_1M_2}{8M_1 + M_2} = \frac{9\cdot2\cdot32}{16 + 32} = 12\ \text{г/моль}` },
      { title: 'Плотность',
        tex: String.raw`\rho = \frac{Mp}{RT} = \frac{0{,}012\cdot10^5}{8{,}31\cdot300} = 0{,}481\ \text{кг/м}^3` },
    ],
    answer: [String.raw`\rho = 0{,}481\ \text{кг/м}^3`],
  },

  /* ===================== 8.40 ===================== */
  {
    id: '8.40', chapter: CH, section: S3, page: '141',
    title: 'Парциальные давления кислорода и азота',
    given: [[String.raw`p = 1\ \text{МПа}`, ''], [String.raw`w_1 = 0{,}2\ (\text{O}_2),\ w_2 = 0{,}8\ (\text{N}_2)`, '']],
    find: String.raw`p_1,\ p_2 \;—\; ?`,
    formulas: [DALTON],
    steps: [
      { title: 'Доли молей',
        text: 'Парциальное давление пропорционально числу молей. На 1 кг смеси: ν₁ = 0,2/0,032 = 6,25 моль, ν₂ = 0,8/0,028 = 28,6 моль.',
        tex: String.raw`p_1 = p\frac{\nu_1}{\nu_1 + \nu_2} = \frac{w_1M_2p}{(1 - w_1)M_1 + w_1M_2} = 0{,}18\ \text{МПа}` },
      { title: 'Азот',
        tex: String.raw`p_2 = p - p_1 = 0{,}82\ \text{МПа}` },
    ],
    answer: [String.raw`p_1 = 0{,}18\ \text{МПа};\quad p_2 = 0{,}82\ \text{МПа}`],
  },

  /* ===================== 8.41 ===================== */
  {
    id: '8.41', chapter: CH, section: S3, page: '141',
    title: 'Молекулярная масса воздуха',
    note: SMALL + String.raw`В книге 28,9; с $M_\text{O} = 32$, $M_\text{N} = 28$ г/моль выходит 28,8 (настоящий воздух с аргоном — 29,0).`,
    given: [[String.raw`w_1 = 0{,}232\ (\text{O}_2)`, ''], [String.raw`w_2 = 0{,}768\ (\text{N}_2)`, '']],
    find: String.raw`M_r \;—\; ?`,
    formulas: [MMIX],
    steps: [
      { title: 'Молярная масса смеси',
        tex: String.raw`M = \frac{1}{\frac{0{,}232}{32} + \frac{0{,}768}{28}} = \frac{1}{0{,}00725 + 0{,}02743} = 28{,}8\ \text{г/моль}` },
    ],
    answer: [String.raw`M_r = 28{,}8`],
  },

  /* ===================== 8.42 ===================== */
  {
    id: '8.42', chapter: CH, section: S3, page: '141',
    title: 'Водород и гелий: массы по давлению',
    given: [[String.raw`V = 30\ \text{л}`, String.raw`3\cdot10^{-2}\ \text{м}^3`], [String.raw`T = 300\ \text{К}`, ''], [String.raw`p = 828\ \text{кПа}`, ''], [String.raw`m = 24\ \text{г}`, '']],
    find: String.raw`m_1,\ m_2 \;—\; ?`,
    formulas: [DALTON, NU],
    steps: [
      { title: 'Всего молей',
        tex: String.raw`\nu = \frac{pV}{RT} = \frac{828\cdot10^3\cdot0{,}03}{8{,}31\cdot300} = 9{,}96\ \text{моль}` },
      { title: 'Система уравнений',
        tex: String.raw`m_1 + m_2 = 24\ \text{г},\qquad \frac{m_1}{2} + \frac{m_2}{4} = 9{,}96\ \text{моль}` },
      { title: 'Решение',
        tex: String.raw`m_1 = \frac{M_1}{M_2 - M_1}\left(M_2\nu - m\right) = 15{,}9 \approx 16\ \text{г},\qquad m_2 = 8{,}1 \approx 8\ \text{г}` },
    ],
    answer: [String.raw`m_1 \approx 16\ \text{г};\quad m_2 \approx 8\ \text{г}`],
  },

  /* ===================== 8.43 ===================== */
  {
    id: '8.43', chapter: CH, section: S3, page: '141',
    title: 'Массы смеси азота и водорода',
    note: MISMATCH + String.raw`В книге $m = 6{,}87$ г, $m_1 = 4{,}81$ г, $m_2 = 2{,}06$ г — так выходит при $T = 300$ К. В условии $t = 23\ ^\circ$C, т. е. $T = 296$ К, и тогда 6,97; 4,88 и 2,09 г.`,
    given: [[String.raw`V = 15\ \text{л}`, String.raw`1{,}5\cdot10^{-2}\ \text{м}^3`], [String.raw`t = 23\ ^\circ\text{C}`, String.raw`296\ \text{К}`], [String.raw`p = 200\ \text{кПа}`, String.raw`2\cdot10^5\ \text{Па}`], [String.raw`w_1 = 0{,}7\ (\text{N}_2)`, '']],
    find: String.raw`m,\ m_1,\ m_2 \;—\; ?`,
    formulas: [MMIX, CLAP],
    steps: [
      { title: 'Молей на грамм смеси',
        tex: String.raw`\frac{w_1}{M_1} + \frac{1 - w_1}{M_2} = \frac{0{,}7}{28} + \frac{0{,}3}{2} = 0{,}175\ \text{моль/г}` },
      { title: 'Масса смеси',
        tex: String.raw`m = \frac{pV}{\left[\frac{w_1}{M_1} + \frac{1 - w_1}{M_2}\right]RT} = \frac{2\cdot10^5\cdot0{,}015}{175\cdot8{,}31\cdot296}\ \text{кг} = 6{,}97\ \text{г}` },
      { title: 'Компоненты',
        tex: String.raw`m_1 = 0{,}7m = 4{,}88\ \text{г},\qquad m_2 = 0{,}3m = 2{,}09\ \text{г}` },
    ],
    answer: [String.raw`m = 6{,}97\ \text{г};\quad m_1 = 4{,}88\ \text{г};\quad m_2 = 2{,}09\ \text{г}`],
  },

  /* ===================== 8.44 ===================== */
  {
    id: '8.44', chapter: CH, section: S3, page: '141',
    title: 'Температура смеси гелия и водорода',
    given: [[String.raw`V = 5\ \text{л}`, String.raw`5\cdot10^{-3}\ \text{м}^3`], [String.raw`p = 600\ \text{кПа}`, String.raw`6\cdot10^5\ \text{Па}`], [String.raw`m = 4\ \text{г}`, ''], [String.raw`w_1 = 0{,}6\ (\text{He})`, '']],
    find: String.raw`T \;—\; ?`,
    formulas: [MMIX, CLAP],
    steps: [
      { title: 'Количество вещества',
        tex: String.raw`\nu = m\left[\frac{w_1}{M_1} + \frac{1 - w_1}{M_2}\right] = 4\left(\frac{0{,}6}{4} + \frac{0{,}4}{2}\right) = 1{,}4\ \text{моль}` },
      { title: 'Температура',
        text: 'В книге 259 К — отличие в последней цифре.',
        tex: String.raw`T = \frac{pV}{\nu R} = \frac{6\cdot10^5\cdot5\cdot10^{-3}}{1{,}4\cdot8{,}31} = 258\ \text{К}` },
    ],
    answer: [String.raw`T = 258\ \text{К}`],
  },

  /* ===================== 8.45 ===================== */
  {
    id: '8.45', chapter: CH, section: S3, page: '141',
    title: 'Моли кислорода и водорода',
    given: [[String.raw`m = 3{,}6\ \text{г}`, ''], [String.raw`w_1 = 0{,}6\ (\text{O}_2)`, '']],
    find: String.raw`\nu,\ \nu_1,\ \nu_2 \;—\; ?`,
    formulas: [NU],
    steps: [
      { title: 'Массы газов',
        tex: String.raw`m_1 = 0{,}6\cdot3{,}6 = 2{,}16\ \text{г},\qquad m_2 = 1{,}44\ \text{г}` },
      { title: 'Количество вещества',
        tex: String.raw`\nu_1 = \frac{2{,}16}{32} = 67{,}5\ \text{ммоль},\quad \nu_2 = \frac{1{,}44}{2} = 0{,}720\ \text{моль},\quad \nu = 0{,}788\ \text{моль}` },
    ],
    answer: [String.raw`\nu = 0{,}788\ \text{моль};\quad \nu_1 = 67{,}5\ \text{ммоль};\quad \nu_2 = 0{,}720\ \text{моль}`],
  },

  );
})();
