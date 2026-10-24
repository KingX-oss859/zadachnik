/*
  § 11. Физические основы термодинамики — задачи 11.1–11.86 (стр. 177–185).
  Условия задач показываются дословно из книги (data/book-tasks.js).
  Ответы пересчитаны скриптом tools/check_termodinamika.py и сверены с book/99-otvety.md.
  Где ответ книги расходится с расчётом — плашка note «Расхождение с ответом книги».
  R = 8,31 Дж/(моль·К); i = 3 (одноатомный), 5 (двухатомный), 6 (многоатомный газ).
  Вода c = 4,19 кДж/(кг·К); лёд c = 2,09 кДж/(кг·К), λ = 333 кДж/кг; теплота парообразования 2,26 МДж/кг.
*/
(function () {
  const CH = 'Гл. 2. Молекулярная физика и термодинамика';
  const S1 = 'Теплоёмкость идеального газа';
  const S2 = 'Работа расширения газа';
  const S3 = 'Первое начало термодинамики';
  const S4 = 'Круговые процессы. Термический к.п.д. Цикл Карно';
  const S5 = 'Энтропия';
  const MISMATCH = '<b>Расхождение с ответом книги.</b> ';
  const SMALL = '<b>Расхождение в последней цифре.</b> ';
  const TYPO = '<b>Опечатка в ответе книги.</b> ';

  const CVP = { tex: String.raw`c_V = \frac i2\frac RM,\quad c_p = \frac{i + 2}{2}\frac RM`, text: 'удельные теплоёмкости; i — число степеней свободы молекулы' };
  const CMOL = { tex: String.raw`C_V = \frac i2R,\quad C_p = C_V + R,\quad \gamma = \frac{C_p}{C_V} = \frac{i + 2}{i}`, text: 'молярные теплоёмкости и показатель адиабаты' };
  const MIXC = { tex: String.raw`c = \frac{\sum\nu_kC_k}{\sum\nu_kM_k},\quad \gamma = \frac{\sum\nu_kC_{p,k}}{\sum\nu_kC_{V,k}}`, text: 'теплоёмкость смеси — теплоёмкость всех частей, делённая на массу' };
  const FIRST = { tex: String.raw`Q = \Delta U + A`, text: 'первое начало термодинамики' };
  const DU = { tex: String.raw`\Delta U = \frac mM\frac i2R\Delta T`, text: 'изменение внутренней энергии идеального газа' };
  const AISOB = { tex: String.raw`A = p\Delta V = \frac mMR\Delta T`, text: 'работа при изобарном процессе' };
  const AISOT = { tex: String.raw`A = \frac mMRT\ln\frac{V_2}{V_1}`, text: 'работа при изотермическом процессе' };
  const ADIAB = { tex: String.raw`pV^\gamma = \text{const},\quad TV^{\gamma - 1} = \text{const},\quad A = -\Delta U = \frac{p_1V_1}{\gamma - 1}\left[1 - \left(\frac{V_1}{V_2}\right)^{\gamma - 1}\right]`, text: 'адиабатный процесс (Q = 0)' };
  const ETA = { tex: String.raw`\eta = \frac{A}{Q_1} = \frac{Q_1 - Q_2}{Q_1}`, text: 'термический к. п. д. цикла' };
  const CARNOT = { tex: String.raw`\eta = \frac{T_1 - T_2}{T_1}`, text: 'к. п. д. цикла Карно' };
  const DS = { tex: String.raw`\Delta S = \int\frac{dQ}{T}`, text: 'изменение энтропии' };
  const DSGAS = { tex: String.raw`\Delta S = \frac mM\left(C_V\ln\frac{T_2}{T_1} + R\ln\frac{V_2}{V_1}\right)`, text: 'энтропия идеального газа' };

  /* p–V диаграмма: ломаная по точкам + кривые; стрелки — направление процесса */
  const pv = o => () => FIG.graph(Object.assign({ w: 320, h: 200 }, o));
  const curve = (f, a, b, extra = {}) => Object.assign({ f, t: [a, b] }, extra);
  const mid = (f, a, b) => [(a + b) / 2, f((a + b) / 2), (a + b) / 2 + (b - a) * 0.08, f((a + b) / 2 + (b - a) * 0.08)];

  window.TASKS.push(

  /* ===================== 11.1 ===================== */
  {
    id: '11.1', chapter: CH, section: S1, page: '177',
    title: 'Удельные теплоёмкости трёх газов',
    given: [[String.raw`\text{He}:\ i = 3,\ M = 4\ \text{г/моль}`, ''], [String.raw`\text{H}_2:\ i = 5,\ M = 2\ \text{г/моль}`, ''], [String.raw`\text{CO}_2:\ i = 6,\ M = 44\ \text{г/моль}`, '']],
    find: String.raw`c_V,\ c_p \;—\; ?`,
    formulas: [CVP],
    steps: [
      { title: 'Гелий',
        tex: String.raw`c_V = \frac32\cdot\frac{8{,}31}{0{,}004} = 3{,}12\ \frac{\text{кДж}}{\text{кг·К}},\quad c_p = \frac52\cdot\frac{8{,}31}{0{,}004} = 5{,}19\ \frac{\text{кДж}}{\text{кг·К}}` },
      { title: 'Водород',
        text: 'В книге c_p = 14,6 — отличие в последней цифре.',
        tex: String.raw`c_V = \frac52\cdot\frac{8{,}31}{0{,}002} = 10{,}4\ \frac{\text{кДж}}{\text{кг·К}},\quad c_p = \frac72\cdot\frac{8{,}31}{0{,}002} = 14{,}5\ \frac{\text{кДж}}{\text{кг·К}}` },
      { title: 'Углекислый газ',
        tex: String.raw`c_V = 3\cdot\frac{8{,}31}{0{,}044} = 567\ \frac{\text{Дж}}{\text{кг·К}},\quad c_p = 4\cdot\frac{8{,}31}{0{,}044} = 756\ \frac{\text{Дж}}{\text{кг·К}}` },
    ],
    answer: [String.raw`\text{He}:\ 3{,}12;\ 5{,}19\ \text{кДж/(кг·К)}`, String.raw`\text{H}_2:\ 10{,}4;\ 14{,}5\ \text{кДж/(кг·К)}`, String.raw`\text{CO}_2:\ 567;\ 756\ \text{Дж/(кг·К)}`],
  },

  /* ===================== 11.2 ===================== */
  {
    id: '11.2', chapter: CH, section: S1, page: '177',
    title: 'Газ по разности теплоёмкостей',
    given: [[String.raw`c_p - c_V = 260\ \text{Дж/(кг·К)}`, ''], [String.raw`i = 5`, '']],
    find: String.raw`M,\ c_V,\ c_p \;—\; ?`,
    formulas: [CVP],
    steps: [
      { title: 'Разность — это R/M',
        tex: String.raw`c_p - c_V = \frac RM \;\Rightarrow\; M = \frac{8{,}31}{260} = 0{,}032\ \text{кг/моль}\ (\text{кислород})` },
      { title: 'Теплоёмкости',
        tex: String.raw`c_V = \frac52\cdot260 = 650\ \frac{\text{Дж}}{\text{кг·К}},\qquad c_p = \frac72\cdot260 = 910\ \frac{\text{Дж}}{\text{кг·К}}` },
    ],
    answer: [String.raw`M = 0{,}032\ \text{кг/моль};\quad c_V = 650;\quad c_p = 910\ \text{Дж/(кг·К)}`],
  },

  /* ===================== 11.3 ===================== */
  {
    id: '11.3', chapter: CH, section: S1, page: '177',
    title: 'Смесь кислорода и азота',
    note: MISMATCH + String.raw`В книге 715 Дж/(кг·К) и 1,01 кДж/(кг·К); расчёт даёт 711 и 996 Дж/(кг·К). Ответы книги не согласуются и между собой: для двухатомной смеси $c_p/c_V$ должно быть 1,4, а $1010/715 = 1{,}41$.`,
    given: [[String.raw`m_1 = 10\ \text{г}\ (\text{O}_2)`, ''], [String.raw`m_2 = 20\ \text{г}\ (\text{N}_2)`, '']],
    find: String.raw`c_V,\ c_p \;—\; ?`,
    formulas: [CVP, MIXC],
    steps: [
      { title: 'Теплоёмкости компонент',
        tex: String.raw`c_{V1} = \frac52\cdot\frac{8{,}31}{0{,}032} = 649,\quad c_{V2} = \frac52\cdot\frac{8{,}31}{0{,}028} = 742\ \frac{\text{Дж}}{\text{кг·К}}` },
      { title: 'Средняя по массе',
        tex: String.raw`c_V = \frac{m_1c_{V1} + m_2c_{V2}}{m_1 + m_2} = \frac{10\cdot649 + 20\cdot742}{30} = 711\ \frac{\text{Дж}}{\text{кг·К}},\qquad c_p = 1{,}4c_V = 996\ \frac{\text{Дж}}{\text{кг·К}}` },
    ],
    answer: [String.raw`c_V = 711\ \text{Дж/(кг·К)};\quad c_p = 996\ \text{Дж/(кг·К)}`],
  },

  /* ===================== 11.4 ===================== */
  {
    id: '11.4', chapter: CH, section: S1, page: '177',
    title: 'Смесь водорода и гелия по объёмам',
    note: MISMATCH + String.raw`В книге 4,53 кДж/(кг·К). Равные условия — значит, количества вещества относятся как объёмы, 5 : 3. Тогда 10 г водорода и 12 г гелия, и $c_V = 6{,}42$ кДж/(кг·К). Как получено число книги, восстановить не удалось.`,
    given: [[String.raw`V_1 = 5\ \text{л}\ (\text{H}_2),\ V_2 = 3\ \text{л}\ (\text{He})`, ''], [String.raw`p,\ T\ \text{одинаковы}`, '']],
    find: String.raw`c_V \;—\; ?`,
    formulas: [MIXC],
    steps: [
      { title: 'Моли пропорциональны объёмам',
        text: 'Возьмём 5 моль водорода и 3 моль гелия (результат от количества не зависит).',
        tex: String.raw`m = 5\cdot2 + 3\cdot4 = 22\ \text{г}` },
      { title: 'Теплоёмкость смеси',
        tex: String.raw`c_V = \frac{5\cdot\frac52R + 3\cdot\frac32R}{0{,}022} = \frac{17\cdot8{,}31}{0{,}022} = 6{,}42\cdot10^3\ \frac{\text{Дж}}{\text{кг·К}}` },
    ],
    answer: [String.raw`c_V = 6{,}42\ \text{кДж/(кг·К)}`],
  },

  /* ===================== 11.5 ===================== */
  {
    id: '11.5', chapter: CH, section: S1, page: '177',
    title: 'c_p смеси по количеству вещества',
    given: [[String.raw`\nu_1 = 2\ \text{моль}\ (\text{O}_2)`, ''], [String.raw`\nu_2 = 4\ \text{моль}\ (\text{N}_2)`, '']],
    find: String.raw`c_p \;—\; ?`,
    formulas: [MIXC],
    steps: [
      { title: 'Теплоёмкость и масса смеси',
        tex: String.raw`c_p = \frac{(2 + 4)\cdot\frac72R}{2\cdot0{,}032 + 4\cdot0{,}028} = \frac{174{,}5}{0{,}176} = 992\ \frac{\text{Дж}}{\text{кг·К}} \approx 990` },
    ],
    answer: [String.raw`c_p \approx 990\ \text{Дж/(кг·К)}`],
  },

  /* ===================== 11.6 ===================== */
  {
    id: '11.6', chapter: CH, section: S1, page: '177',
    title: 'Смесь аргона и азота поровну по массе',
    given: [[String.raw`w_1 = w_2 = 0{,}5`, ''], [String.raw`\text{Ar}:\ i = 3;\ \text{N}_2:\ i = 5`, '']],
    find: String.raw`c_V \;—\; ?`,
    formulas: [CVP],
    steps: [
      { title: 'Средняя по массе',
        text: 'В книге 526 — отличие в последней цифре.',
        tex: String.raw`c_V = 0{,}5\cdot\frac32\cdot\frac{8{,}31}{0{,}0399} + 0{,}5\cdot\frac52\cdot\frac{8{,}31}{0{,}028} = 0{,}5(312 + 742) = 527\ \frac{\text{Дж}}{\text{кг·К}}` },
    ],
    answer: [String.raw`c_V = 527\ \text{Дж/(кг·К)}`],
  },

  /* ===================== 11.7 ===================== */
  {
    id: '11.7', chapter: CH, section: S1, page: '177',
    title: 'Хлор и криптон в равных объёмах',
    given: [[String.raw`\nu_1 = \nu_2`, ''], [String.raw`\text{Cl}_2:\ i = 5,\ 71\ \text{г/моль};\ \text{Kr}:\ i = 3,\ 83{,}8\ \text{г/моль}`, '']],
    find: String.raw`c_p \;—\; ?`,
    formulas: [MIXC],
    steps: [
      { title: 'По одному молю каждого',
        tex: String.raw`c_p = \frac{\frac72R + \frac52R}{0{,}071 + 0{,}0838} = \frac{6\cdot8{,}31}{0{,}1548} = 322\ \frac{\text{Дж}}{\text{кг·К}}` },
    ],
    answer: [String.raw`c_p = 322\ \text{Дж/(кг·К)}`],
  },

  /* ===================== 11.8 ===================== */
  {
    id: '11.8', chapter: CH, section: S1, page: '177',
    title: 'Ксенон и кислород поровну',
    given: [[String.raw`\nu_1 = \nu_2`, ''], [String.raw`\text{Xe}:\ i = 3,\ 131{,}3\ \text{г/моль};\ \text{O}_2:\ i = 5`, '']],
    find: String.raw`c_V \;—\; ?`,
    formulas: [MIXC],
    steps: [
      { title: 'По одному молю каждого',
        tex: String.raw`c_V = \frac{\frac32R + \frac52R}{0{,}1313 + 0{,}032} = \frac{4\cdot8{,}31}{0{,}1633} = 204\ \frac{\text{Дж}}{\text{кг·К}}` },
    ],
    answer: [String.raw`c_V = 204\ \text{Дж/(кг·К)}`],
  },

  /* ===================== 11.9 ===================== */
  {
    id: '11.9', chapter: CH, section: S1, page: '177',
    title: 'γ смеси гелия и водорода',
    given: [[String.raw`m_1 = 10\ \text{г}\ (\text{He})`, ''], [String.raw`m_2 = 4\ \text{г}\ (\text{H}_2)`, '']],
    find: String.raw`\gamma \;—\; ?`,
    formulas: [CMOL, MIXC],
    steps: [
      { title: 'Моли',
        tex: String.raw`\nu_1 = 2{,}5\ \text{моль},\qquad \nu_2 = 2\ \text{моль}` },
      { title: 'Показатель адиабаты',
        tex: String.raw`\gamma = \frac{2{,}5\cdot\frac52 + 2\cdot\frac72}{2{,}5\cdot\frac32 + 2\cdot\frac52} = \frac{13{,}25}{8{,}75} = 1{,}51` },
    ],
    answer: [String.raw`\gamma = 1{,}51`],
  },

  /* ===================== 11.10 ===================== */
  {
    id: '11.10', chapter: CH, section: S1, page: '177',
    title: 'γ смеси аргона и азота',
    given: [[String.raw`\nu_1 = \nu_2`, '']],
    find: String.raw`\gamma \;—\; ?`,
    formulas: [CMOL, MIXC],
    steps: [
      { title: 'Равные моли',
        tex: String.raw`\gamma = \frac{\frac52 + \frac72}{\frac32 + \frac52} = \frac64 = 1{,}50` },
    ],
    answer: [String.raw`\gamma = 1{,}50`],
  },

  /* ===================== 11.11 ===================== */
  {
    id: '11.11', chapter: CH, section: S1, page: '177',
    title: 'γ смеси водорода и неона',
    given: [[String.raw`w_1 = w_2 = 0{,}5`, ''], [String.raw`\text{H}_2:\ 2\ \text{г/моль};\ \text{Ne}:\ 20{,}2\ \text{г/моль}`, '']],
    find: String.raw`\gamma \;—\; ?`,
    formulas: [CMOL, MIXC],
    steps: [
      { title: 'На 1 г смеси',
        tex: String.raw`\nu_1 = \frac{0{,}5}{2} = 0{,}25\ \text{моль},\qquad \nu_2 = \frac{0{,}5}{20{,}2} = 0{,}0248\ \text{моль}` },
      { title: 'Показатель адиабаты',
        tex: String.raw`\gamma = \frac{0{,}25\cdot3{,}5 + 0{,}0248\cdot2{,}5}{0{,}25\cdot2{,}5 + 0{,}0248\cdot1{,}5} = \frac{0{,}937}{0{,}662} = 1{,}42` },
    ],
    answer: [String.raw`\gamma = 1{,}42`],
  },

  /* ===================== 11.12 ===================== */
  {
    id: '11.12', chapter: CH, section: S1, page: '177',
    title: 'γ смеси кислорода и аргона',
    given: [[String.raw`\nu_1 = \nu_2`, '']],
    find: String.raw`\gamma \;—\; ?`,
    formulas: [CMOL, MIXC],
    steps: [
      { title: 'Равные моли — как в задаче 11.10',
        tex: String.raw`\gamma = \frac{\frac72 + \frac52}{\frac52 + \frac32} = 1{,}50` },
    ],
    answer: [String.raw`\gamma = 1{,}50`],
  },

  /* ===================== 11.13 ===================== */
  {
    id: '11.13', chapter: CH, section: S1, page: '177',
    title: 'Частично диссоциированный водород',
    given: [[String.raw`\alpha = 0{,}6`, ''], [String.raw`\text{молекулы:}\ i = 7;\ \text{атомы:}\ i = 3`, '']],
    find: String.raw`c_V \;—\; ?`,
    formulas: [CVP, { tex: String.raw`i_\text{мол} = 3 + 2 + 2 = 7`, text: 'по сноске книги для молекул учитываем и колебательные степени свободы (колебание считается за 2)' }],
    steps: [
      { title: 'Что стало с 1 моль H₂',
        text: 'Распалось α = 0,6 моль молекул → 1,2 моль атомов; осталось 0,4 моль молекул. Масса прежняя — 2 г.',
        tex: String.raw`C_V = 0{,}4\cdot\frac72R + 1{,}2\cdot\frac32R = 3{,}2R` },
      { title: 'Удельная теплоёмкость',
        tex: String.raw`c_V = \frac{3{,}2\cdot8{,}31}{0{,}002} = 13{,}3\ \frac{\text{кДж}}{\text{кг·К}}` },
    ],
    answer: [String.raw`c_V = 13{,}3\ \text{кДж/(кг·К)}`],
  },

  /* ===================== 11.14 ===================== */
  {
    id: '11.14', chapter: CH, section: S1, page: '178',
    title: 'γ частично диссоциированного азота',
    given: [[String.raw`\alpha = 0{,}4`, '']],
    find: String.raw`\gamma \;—\; ?`,
    formulas: [CMOL],
    steps: [
      { title: 'Из 1 моль N₂',
        text: '0,6 моль молекул (i = 7) и 0,8 моль атомов (i = 3).',
        tex: String.raw`C_V = 0{,}6\cdot3{,}5R + 0{,}8\cdot1{,}5R = 3{,}3R,\qquad C_p = C_V + 1{,}4R = 4{,}7R` },
      { title: 'Показатель адиабаты',
        tex: String.raw`\gamma = \frac{4{,}7}{3{,}3} = 1{,}42` },
    ],
    answer: [String.raw`\gamma = 1{,}42`],
  },

  /* ===================== 11.15 ===================== */
  {
    id: '11.15', chapter: CH, section: S1, page: '178',
    title: 'Степень диссоциации хлора по γ',
    given: [[String.raw`\gamma = 1{,}55`, '']],
    find: String.raw`\alpha \;—\; ?`,
    formulas: [CMOL],
    steps: [
      { title: 'Теплоёмкости через α',
        text: 'Из 1 моль Cl₂: (1 − α) моль молекул и 2α моль атомов, всего (1 + α) моль.',
        tex: String.raw`C_V = (1 - \alpha)\frac72R + 2\alpha\frac32R = \left(3{,}5 - 0{,}5\alpha\right)R,\qquad C_p = C_V + (1 + \alpha)R = (4{,}5 + 0{,}5\alpha)R` },
      { title: 'Уравнение',
        tex: String.raw`\frac{4{,}5 + 0{,}5\alpha}{3{,}5 - 0{,}5\alpha} = 1{,}55 \;\Rightarrow\; \alpha = \frac{0{,}925}{1{,}275} = 0{,}725` },
    ],
    answer: [String.raw`\alpha = 0{,}725`],
  },

  /* ===================== 11.16 ===================== */
  {
    id: '11.16', chapter: CH, section: S1, page: '178',
    title: 'Изобарно или изохорно?',
    given: [[String.raw`m = 160\ \text{г}`, ''], [String.raw`\Delta T = 12\ \text{К}`, ''], [String.raw`Q = 1{,}76\ \text{кДж}`, '']],
    find: String.raw`\text{процесс} \;—\; ?`,
    formulas: [CMOL],
    steps: [
      { title: 'Молярная теплоёмкость в процессе',
        tex: String.raw`C = \frac{Q}{\nu\Delta T} = \frac{1760}{5\cdot12} = 29{,}3\ \frac{\text{Дж}}{\text{моль·К}} \approx 3{,}5R` },
      { title: 'Вывод',
        text: 'Для кислорода C_V = 2,5R = 20,8, C_p = 3,5R = 29,1 Дж/(моль·К) — процесс шёл при постоянном давлении.' },
    ],
    answer: [String.raw`\text{при постоянном давлении}`],
  },

  /* ===================== 11.17 ===================== */
  {
    id: '11.17', chapter: CH, section: S1, page: '178',
    title: 'γ по адиабатному сжатию',
    given: [[String.raw`V_1/V_2 = n = 10`, ''], [String.raw`p_2/p_1 = k = 21{,}4`, '']],
    find: String.raw`C_p/C_V \;—\; ?`,
    formulas: [ADIAB],
    steps: [
      { title: 'Уравнение Пуассона',
        tex: String.raw`k = n^\gamma \;\Rightarrow\; \gamma = \frac{\ln k}{\ln n} = \frac{\ln21{,}4}{\ln10} = 1{,}33` },
    ],
    answer: [String.raw`\gamma = 1{,}33`],
  },

  /* ===================== 11.18 ===================== */
  {
    id: '11.18', chapter: CH, section: S2, page: '178',
    title: 'Изобарное расширение водорода',
    given: [[String.raw`m = 4\ \text{г}`, ''], [String.raw`\Delta T = 10\ \text{К}`, '']],
    find: String.raw`A \;—\; ?`,
    formulas: [AISOB],
    steps: [
      { title: 'Работа',
        tex: String.raw`A = \frac mMR\Delta T = 2\cdot8{,}31\cdot10 = 166\ \text{Дж}` },
    ],
    answer: [String.raw`A = 166\ \text{Дж}`],
  },

  /* ===================== 11.19 ===================== */
  {
    id: '11.19', chapter: CH, section: S2, page: '178',
    title: 'Изобарный нагрев от 300 до 400 К',
    given: [[String.raw`V_1 = 12\ \text{л}`, ''], [String.raw`p_1 = 100\ \text{кПа}`, ''], [String.raw`T_1 = 300\ \text{К},\ T_2 = 400\ \text{К}`, '']],
    find: String.raw`A \;—\; ?`,
    formulas: [AISOB],
    steps: [
      { title: 'Объём растёт пропорционально T',
        tex: String.raw`A = p_1(V_2 - V_1) = p_1V_1\left(\frac{T_2}{T_1} - 1\right) = 10^5\cdot0{,}012\cdot\frac13 = 400\ \text{Дж}` },
    ],
    answer: [String.raw`A = 400\ \text{Дж}`],
  },

  /* ===================== 11.20 ===================== */
  {
    id: '11.20', chapter: CH, section: S2, page: '178',
    title: 'Изотермическое расширение водорода',
    given: [[String.raw`m = 5\ \text{г}`, ''], [String.raw`T = 290\ \text{К}`, ''], [String.raw`V_2/V_1 = 3`, '']],
    find: String.raw`A \;—\; ?`,
    formulas: [AISOT],
    steps: [
      { title: 'Работа',
        tex: String.raw`A = 2{,}5\cdot8{,}31\cdot290\cdot\ln3 = 6{,}62\ \text{кДж}` },
    ],
    answer: [String.raw`A = 6{,}62\ \text{кДж}`],
  },

  /* ===================== 11.21 ===================== */
  {
    id: '11.21', chapter: CH, section: S2, page: '178',
    title: 'Адиабатное сжатие кислорода',
    given: [[String.raw`m = 1\ \text{кг}`, ''], [String.raw`A = 100\ \text{кДж}`, ''], [String.raw`T_1 = 300\ \text{К}`, '']],
    find: String.raw`T_2 \;—\; ?`,
    formulas: [ADIAB, DU],
    steps: [
      { title: 'Работа идёт на внутреннюю энергию',
        tex: String.raw`A = \frac mM\frac52R(T_2 - T_1) \;\Rightarrow\; \Delta T = \frac{10^5}{31{,}25\cdot2{,}5\cdot8{,}31} = 154\ \text{К}` },
      { title: 'Конечная температура',
        tex: String.raw`T_2 = 300 + 154 = 454\ \text{К}` },
    ],
    answer: [String.raw`T_2 = 454\ \text{К}`],
  },

  /* ===================== 11.22 ===================== */
  {
    id: '11.22', chapter: CH, section: S2, page: '178',
    title: 'Адиабатное расширение водорода',
    given: [[String.raw`m = 4\ \text{г}`, ''], [String.raw`\Delta T = -10\ \text{К}`, '']],
    find: String.raw`A \;—\; ?`,
    formulas: [ADIAB, DU],
    steps: [
      { title: 'Работа за счёт внутренней энергии',
        tex: String.raw`A = -\Delta U = \frac mM\frac52R|\Delta T| = 2\cdot2{,}5\cdot8{,}31\cdot10 = 416\ \text{Дж}` },
    ],
    answer: [String.raw`A = 416\ \text{Дж}`],
  },

  /* ===================== 11.23 ===================== */
  {
    id: '11.23', chapter: CH, section: S2, page: '178',
    title: 'Сжатие азота в 10 раз',
    given: [[String.raw`m = 2\ \text{г}`, ''], [String.raw`T_1 = 300\ \text{К}`, ''], [String.raw`V_1/V_2 = 10`, '']],
    find: String.raw`T_2,\ A \;—\; ?`,
    formulas: [ADIAB, DU],
    steps: [
      { title: 'Температура',
        tex: String.raw`T_2 = T_1n^{\gamma - 1} = 300\cdot10^{0{,}4} = 754\ \text{К}` },
      { title: 'Работа сжатия',
        text: 'В книге 674 Дж — отличие в последней цифре.',
        tex: String.raw`A = \frac mM\frac52R(T_2 - T_1) = \frac{2}{28}\cdot2{,}5\cdot8{,}31\cdot454 = 673\ \text{Дж}` },
    ],
    answer: [String.raw`T_2 = 754\ \text{К};\quad A = 673\ \text{Дж}`],
  },

  /* ===================== 11.24 ===================== */
  {
    id: '11.24', chapter: CH, section: S2, page: '178',
    title: 'Адиабатное расширение кислорода',
    given: [[String.raw`V_1 = 1\ \text{л},\ p_1 = 1{,}2\ \text{МПа}`, ''], [String.raw`V_2 = 10\ \text{л}`, '']],
    find: String.raw`A \;—\; ?`,
    formulas: [ADIAB],
    steps: [
      { title: 'Работа',
        tex: String.raw`A = \frac{p_1V_1}{\gamma - 1}\left[1 - \left(\frac{V_1}{V_2}\right)^{\gamma - 1}\right] = \frac{1200}{0{,}4}\left(1 - 0{,}398\right) = 1{,}81\ \text{кДж}` },
    ],
    answer: [String.raw`A = 1{,}81\ \text{кДж}`],
  },

  /* ===================== 11.25 ===================== */
  {
    id: '11.25', chapter: CH, section: S3, page: '178',
    title: 'Изохорный нагрев азота',
    given: [[String.raw`m = 5\ \text{кг}`, ''], [String.raw`\Delta T = 150\ \text{К}`, ''], [String.raw`V = \text{const}`, '']],
    find: String.raw`Q,\ \Delta U,\ A \;—\; ?`,
    formulas: [FIRST, DU],
    steps: [
      { title: 'Работа',
        text: 'Объём не меняется — работы нет.',
        tex: String.raw`A = 0` },
      { title: 'Теплота = изменение внутренней энергии',
        tex: String.raw`Q = \Delta U = \frac{5}{0{,}028}\cdot\frac52\cdot8{,}31\cdot150 = 556\ \text{кДж}` },
    ],
    answer: [String.raw`Q = \Delta U = 556\ \text{кДж};\quad A = 0`],
  },

  /* ===================== 11.26 ===================== */
  {
    id: '11.26', chapter: CH, section: S3, page: '178',
    title: 'Изохорный нагрев водорода',
    given: [[String.raw`V_1 = 10\ \text{м}^3`, ''], [String.raw`p_1 = 100\ \text{кПа},\ p_2 = 300\ \text{кПа}`, '']],
    find: String.raw`\Delta U,\ A,\ Q \;—\; ?`,
    formulas: [FIRST, { tex: String.raw`\Delta U = \frac i2V\Delta p`, text: 'при V = const: νRΔT = VΔp' }],
    steps: [
      { title: 'Внутренняя энергия',
        tex: String.raw`\Delta U = \frac52\cdot10\cdot2\cdot10^5 = 5\ \text{МДж}` },
      { title: 'Работа и теплота',
        tex: String.raw`A = 0,\qquad Q = \Delta U = 5\ \text{МДж}` },
    ],
    answer: [String.raw`\Delta U = 5\ \text{МДж};\quad A = 0;\quad Q = 5\ \text{МДж}`],
  },

  /* ===================== 11.27 ===================== */
  {
    id: '11.27', chapter: CH, section: S3, page: '179',
    title: 'Теплота при изохорном нагреве кислорода',
    note: TYPO + String.raw`В книге «62,5 Дж» — должно быть 62,5 кДж: $\frac52\cdot0{,}05\cdot5\cdot10^5 = 62\,500$ Дж.`,
    given: [[String.raw`V = 50\ \text{л}`, String.raw`0{,}05\ \text{м}^3`], [String.raw`\Delta p = 0{,}5\ \text{МПа}`, String.raw`5\cdot10^5\ \text{Па}`]],
    find: String.raw`Q \;—\; ?`,
    formulas: [FIRST],
    steps: [
      { title: 'Q = ΔU',
        tex: String.raw`Q = \frac i2V\Delta p = \frac52\cdot0{,}05\cdot5\cdot10^5 = 62{,}5\ \text{кДж}` },
    ],
    answer: [String.raw`Q = 62{,}5\ \text{кДж}`],
  },

  /* ===================== 11.28 ===================== */
  {
    id: '11.28', chapter: CH, section: S3, page: '179',
    title: 'Нагрев водорода в баллоне',
    given: [[String.raw`V = 20\ \text{л}`, ''], [String.raw`T_1 = 300\ \text{К},\ p_1 = 0{,}4\ \text{МПа}`, ''], [String.raw`Q = 6\ \text{кДж}`, '']],
    find: String.raw`T_2,\ p_2 \;—\; ?`,
    formulas: [FIRST, DU],
    steps: [
      { title: 'Количество вещества',
        tex: String.raw`\nu = \frac{p_1V}{RT_1} = \frac{4\cdot10^5\cdot0{,}02}{8{,}31\cdot300} = 3{,}21\ \text{моль}` },
      { title: 'Температура',
        tex: String.raw`\Delta T = \frac{Q}{\nu\frac52R} = \frac{6000}{3{,}21\cdot20{,}8} = 90\ \text{К},\qquad T_2 = 390\ \text{К}` },
      { title: 'Давление',
        tex: String.raw`p_2 = p_1\frac{T_2}{T_1} = 0{,}4\cdot1{,}3 = 0{,}52\ \text{МПа}` },
    ],
    answer: [String.raw`T_2 = 390\ \text{К};\quad p_2 = 520\ \text{кПа}`],
  },

  /* ===================== 11.29 ===================== */
  {
    id: '11.29', chapter: CH, section: S3, page: '179',
    title: 'Изобарное расширение кислорода',
    given: [[String.raw`p = 80\ \text{кПа}`, ''], [String.raw`V_1 = 1\ \text{м}^3,\ V_2 = 3\ \text{м}^3`, '']],
    find: String.raw`\Delta U,\ A,\ Q \;—\; ?`,
    formulas: [FIRST, AISOB],
    steps: [
      { title: 'Работа',
        tex: String.raw`A = p(V_2 - V_1) = 8\cdot10^4\cdot2 = 160\ \text{кДж}` },
      { title: 'Внутренняя энергия',
        tex: String.raw`\Delta U = \frac52p\Delta V = 0{,}4\ \text{МДж}` },
      { title: 'Теплота',
        tex: String.raw`Q = \Delta U + A = 560\ \text{кДж}` },
    ],
    answer: [String.raw`\Delta U = 0{,}4\ \text{МДж};\quad A = 160\ \text{кДж};\quad Q = 560\ \text{кДж}`],
  },

  /* ===================== 11.30 ===================== */
  {
    id: '11.30', chapter: CH, section: S3, page: '179',
    title: 'Изобарный нагрев азота',
    given: [[String.raw`Q = 21\ \text{кДж}`, ''], [String.raw`i = 5`, '']],
    find: String.raw`A,\ \Delta U \;—\; ?`,
    formulas: [FIRST, AISOB],
    steps: [
      { title: 'Доли',
        tex: String.raw`\frac AQ = \frac{R}{C_p} = \frac27,\qquad A = 6\ \text{кДж},\qquad \Delta U = 15\ \text{кДж}` },
    ],
    answer: [String.raw`A = 6\ \text{кДж};\quad \Delta U = 15\ \text{кДж}`],
  },

  /* ===================== 11.31 ===================== */
  {
    id: '11.31', chapter: CH, section: S3, page: '179',
    title: 'Изобара, затем изохора',
    given: [[String.raw`m = 2\ \text{кг}`, ''], [String.raw`V_1 = 1\ \text{м}^3,\ p_1 = 0{,}2\ \text{МПа}`, ''], [String.raw`V_2 = 3\ \text{м}^3,\ p_3 = 0{,}5\ \text{МПа}`, '']],
    find: String.raw`\Delta U,\ A,\ Q \;—\; ?`,
    formulas: [FIRST, { tex: String.raw`\Delta U = \frac i2(p_3V_3 - p_1V_1)`, text: 'внутренняя энергия через pV (νRT = pV)' }],
    figure: pv({ x: [0, 3.6], y: [0, 0.6], xt: [1, 2, 3], yt: [0.2, 0.5], xl: 'V, м³', yl: 'p, МПа',
      s: [{ pts: [[1, 0.2], [3, 0.2], [3, 0.5]] }], dots: [[1, 0.2], [3, 0.2], [3, 0.5]],
      arrows: [[1.8, 0.2, 2.1, 0.2], [3, 0.31, 3, 0.37]], txt: [[0.85, 0.15, '1'], [3.08, 0.15, '2'], [3.08, 0.52, '3']] }),
    figCaption: '1–2 — изобарное расширение, 2–3 — изохорное нагревание',
    steps: [
      { title: 'Работа — только на изобаре',
        tex: String.raw`A = p_1(V_2 - V_1) = 0{,}2\cdot10^6\cdot2 = 0{,}4\ \text{МДж}` },
      { title: 'Внутренняя энергия',
        tex: String.raw`\Delta U = \frac52(p_3V_2 - p_1V_1) = \frac52(1{,}5 - 0{,}2)\cdot10^6 = 3{,}25\ \text{МДж}` },
      { title: 'Теплота',
        tex: String.raw`Q = \Delta U + A = 3{,}65\ \text{МДж}` },
    ],
    answer: [String.raw`\Delta U = 3{,}25\ \text{МДж};\quad A = 0{,}4\ \text{МДж};\quad Q = 3{,}65\ \text{МДж}`],
  },

  /* ===================== 11.32 ===================== */
  {
    id: '11.32', chapter: CH, section: S3, page: '179',
    title: 'Изобарный нагрев гелия',
    given: [[String.raw`m = 1\ \text{г}`, ''], [String.raw`\Delta T = 100\ \text{К}`, '']],
    find: String.raw`Q,\ A,\ \Delta U \;—\; ?`,
    formulas: [FIRST, AISOB, DU],
    steps: [
      { title: 'Три величины',
        tex: String.raw`A = 0{,}25\cdot8{,}31\cdot100 = 208\ \text{Дж},\quad \Delta U = \frac32A = 312\ \text{Дж},\quad Q = \frac52A = 519\ \text{Дж}` },
    ],
    answer: [String.raw`Q = 519\ \text{Дж};\quad A = 208\ \text{Дж};\quad \Delta U = 312\ \text{Дж}`],
  },

  /* ===================== 11.33 ===================== */
  {
    id: '11.33', chapter: CH, section: S3, page: '179',
    title: 'Куда уходит теплота при изобарном процессе',
    given: [[String.raw`i = 3;\ 5;\ 6`, '']],
    find: String.raw`w_1 = \Delta U/Q,\ w_2 = A/Q \;—\; ?`,
    formulas: [FIRST, CMOL],
    steps: [
      { title: 'Общие формулы',
        tex: String.raw`w_1 = \frac{C_V}{C_p} = \frac{i}{i + 2},\qquad w_2 = \frac{R}{C_p} = \frac{2}{i + 2}` },
      { title: 'Три случая',
        tex: String.raw`i = 3:\ 0{,}6;\ 0{,}4\qquad i = 5:\ 0{,}71;\ 0{,}29\qquad i = 6:\ 0{,}75;\ 0{,}25` },
    ],
    answer: [String.raw`1)\ 0{,}6;\ 0{,}4\quad 2)\ 0{,}71;\ 0{,}29\quad 3)\ 0{,}75;\ 0{,}25`],
  },

  /* ===================== 11.34 ===================== */
  {
    id: '11.34', chapter: CH, section: S3, page: '179',
    title: 'Изобарное расширение водяного пара',
    given: [[String.raw`Q = 4\ \text{кДж}`, ''], [String.raw`i = 6`, '']],
    find: String.raw`A \;—\; ?`,
    formulas: [CMOL],
    steps: [
      { title: 'Доля работы',
        tex: String.raw`A = Q\frac{2}{i + 2} = 4\cdot\frac28 = 1\ \text{кДж}` },
    ],
    answer: [String.raw`A = 1\ \text{кДж}`],
  },

  /* ===================== 11.35 ===================== */
  {
    id: '11.35', chapter: CH, section: S3, page: '179',
    title: 'Изотермическое расширение азота вдвое',
    note: SMALL + String.raw`В книге 11,6 кДж; подстановка $\frac{200}{28}\cdot8{,}31\cdot280\cdot\ln2$ даёт 11,5 кДж.`,
    given: [[String.raw`m = 200\ \text{г}`, ''], [String.raw`T = 280\ \text{К}`, ''], [String.raw`V_2/V_1 = 2`, '']],
    find: String.raw`\Delta U,\ A,\ Q \;—\; ?`,
    formulas: [FIRST, AISOT],
    steps: [
      { title: 'Температура постоянна',
        tex: String.raw`\Delta U = 0,\qquad Q = A = \frac{200}{28}\cdot8{,}31\cdot280\cdot\ln2 = 11{,}5\ \text{кДж}` },
    ],
    answer: [String.raw`\Delta U = 0;\quad A = Q = 11{,}5\ \text{кДж}`],
  },

  /* ===================== 11.36 ===================== */
  {
    id: '11.36', chapter: CH, section: S3, page: '179–180',
    title: 'Изотермическое расширение азота под поршнем',
    note: SMALL + String.raw`В книге 126 кДж; подстановка $\frac{0{,}6}{0{,}028}\cdot8{,}31\cdot560\cdot\ln3{,}5$ даёт 125 кДж.`,
    given: [[String.raw`m = 0{,}6\ \text{кг}`, ''], [String.raw`V_1 = 1{,}2\ \text{м}^3,\ V_2 = 4{,}2\ \text{м}^3`, ''], [String.raw`T = 560\ \text{К}`, '']],
    find: String.raw`\Delta U,\ A,\ Q \;—\; ?`,
    formulas: [FIRST, AISOT],
    steps: [
      { title: 'Работа и теплота',
        tex: String.raw`\Delta U = 0,\qquad A = Q = 21{,}4\cdot8{,}31\cdot560\cdot\ln3{,}5 = 125\ \text{кДж}` },
    ],
    answer: [String.raw`\Delta U = 0;\quad A = Q = 125\ \text{кДж}`],
  },

  /* ===================== 11.37 ===================== */
  {
    id: '11.37', chapter: CH, section: S3, page: '180',
    title: 'Нагрев водорода: ΔU и работа',
    given: [[String.raw`m = 10\ \text{г}`, ''], [String.raw`\Delta T = 200\ \text{К}`, ''], [String.raw`Q = 40\ \text{кДж}`, '']],
    find: String.raw`\Delta U,\ A \;—\; ?`,
    formulas: [FIRST, DU],
    steps: [
      { title: 'ΔU зависит только от ΔT',
        tex: String.raw`\Delta U = 5\cdot\frac52\cdot8{,}31\cdot200 = 20{,}8\ \text{кДж}` },
      { title: 'Работа',
        tex: String.raw`A = Q - \Delta U = 19{,}2\ \text{кДж}` },
    ],
    answer: [String.raw`\Delta U = 20{,}8\ \text{кДж};\quad A = 19{,}2\ \text{кДж}`],
  },

  /* ===================== 11.38 ===================== */
  {
    id: '11.38', chapter: CH, section: S3, page: '180',
    title: 'Изотермическое расширение водорода втрое',
    given: [[String.raw`m = 1\ \text{г}`, ''], [String.raw`T = 280\ \text{К}`, ''], [String.raw`V_2/V_1 = 3`, '']],
    find: String.raw`A,\ Q \;—\; ?`,
    formulas: [AISOT],
    steps: [
      { title: 'Работа = теплота',
        tex: String.raw`A = Q = 0{,}5\cdot8{,}31\cdot280\cdot\ln3 = 1{,}28\ \text{кДж}` },
    ],
    answer: [String.raw`A = Q = 1{,}28\ \text{кДж}`],
  },

  /* ===================== 11.39 ===================== */
  {
    id: '11.39', chapter: CH, section: S3, page: '180',
    title: 'Изотермическое расширение азота',
    given: [[String.raw`V_1 = 10\ \text{л},\ p_1 = 0{,}2\ \text{МПа}`, ''], [String.raw`V_2 = 28\ \text{л}`, '']],
    find: String.raw`A,\ Q \;—\; ?`,
    formulas: [AISOT],
    steps: [
      { title: 'νRT = p₁V₁',
        tex: String.raw`A = Q = p_1V_1\ln\frac{V_2}{V_1} = 2000\cdot\ln2{,}8 = 2{,}06\ \text{кДж}` },
    ],
    answer: [String.raw`A = Q = 2{,}06\ \text{кДж}`],
  },

  /* ===================== 11.40 ===================== */
  {
    id: '11.40', chapter: CH, section: S3, page: '180',
    title: 'Во сколько раз вырос объём',
    given: [[String.raw`\nu = 1\ \text{моль}`, ''], [String.raw`T = 300\ \text{К}`, ''], [String.raw`Q = 2\ \text{кДж}`, '']],
    find: String.raw`V_2/V_1 \;—\; ?`,
    formulas: [AISOT],
    steps: [
      { title: 'Из формулы работы',
        tex: String.raw`\frac{V_2}{V_1} = \exp\frac{Q}{\nu RT} = \exp\frac{2000}{2493} = e^{0{,}802} = 2{,}23` },
    ],
    answer: [String.raw`V_2/V_1 = 2{,}23`],
  },

  /* ===================== 11.41 ===================== */
  {
    id: '11.41', chapter: CH, section: S3, page: '180',
    title: 'Изотермическое сжатие азота',
    given: [[String.raw`m = 1\ \text{г}`, ''], [String.raw`T = 280\ \text{К}`, ''], [String.raw`p_2/p_1 = 10`, '']],
    find: String.raw`Q \;—\; ?`,
    formulas: [AISOT],
    steps: [
      { title: 'Выделившаяся теплота = работа сжатия',
        tex: String.raw`Q = \frac mMRT\ln\frac{p_2}{p_1} = \frac{1}{28}\cdot8{,}31\cdot280\cdot\ln10 = 191\ \text{Дж}` },
    ],
    answer: [String.raw`Q = 191\ \text{Дж}`],
  },

  /* ===================== 11.42 ===================== */
  {
    id: '11.42', chapter: CH, section: S3, page: '180',
    title: 'Теплота при работе 6 кДж',
    given: [[String.raw`A = 6\ \text{кДж}`, ''], [String.raw`i = 5`, '']],
    find: String.raw`Q \;—\; ?`,
    formulas: [FIRST],
    steps: [
      { title: '1) Изобарно',
        tex: String.raw`Q = A\frac{C_p}{R} = 6\cdot\frac72 = 21\ \text{кДж}` },
      { title: '2) Изотермически',
        tex: String.raw`\Delta U = 0 \;\Rightarrow\; Q = A = 6\ \text{кДж}` },
    ],
    answer: [String.raw`1)\ 21\ \text{кДж};\quad 2)\ 6\ \text{кДж}`],
  },

  /* ===================== 11.43 ===================== */
  {
    id: '11.43', chapter: CH, section: S3, page: '180',
    title: 'Лопнувшая шина',
    note: TYPO + String.raw`В формуле книги скобка и показатель напечатаны неверно: «$[1 - \dots]^{(\gamma - 1)\gamma}$». Должно быть $\Delta T = T_2\left[1 - \left(\frac{T_1p_0}{T_2p_1}\right)^{(\gamma - 1)/\gamma}\right]$. Число 76 К верное.`,
    given: [[String.raw`p_1 = 220\ \text{кПа},\ T_1 = 290\ \text{К}`, ''], [String.raw`T_2 = 330\ \text{К}`, ''], [String.raw`p_0 = 100\ \text{кПа}`, '']],
    find: String.raw`\Delta T \;—\; ?`,
    formulas: [ADIAB, { tex: String.raw`T^\gamma p^{1 - \gamma} = \text{const}`, text: 'адиабата в переменных T, p' }],
    steps: [
      { title: 'Давление в нагретой шине',
        tex: String.raw`p_2 = p_1\frac{T_2}{T_1} = 220\cdot\frac{330}{290} = 250\ \text{кПа}` },
      { title: 'Адиабатное расширение до p₀',
        tex: String.raw`T = T_2\left(\frac{p_0}{p_2}\right)^{(\gamma - 1)/\gamma} = 330\cdot0{,}4^{0{,}286} = 254\ \text{К}` },
      { title: 'Охлаждение',
        tex: String.raw`\Delta T = 330 - 254 = 76\ \text{К}` },
    ],
    answer: [String.raw`\Delta T = 76\ \text{К}\ (\text{охладился})`],
  },

  /* ===================== 11.44 ===================== */
  {
    id: '11.44', chapter: CH, section: S3, page: '180',
    title: 'Масса кислорода по адиабатному расширению',
    given: [[String.raw`T_1 = 320\ \text{К}`, ''], [String.raw`\Delta U = -8{,}4\ \text{кДж}`, ''], [String.raw`V_2/V_1 = n = 10`, '']],
    find: String.raw`m \;—\; ?`,
    formulas: [ADIAB, DU],
    steps: [
      { title: 'Конечная температура',
        tex: String.raw`T_2 = T_1n^{1 - \gamma} = 320\cdot10^{-0{,}4} = 127\ \text{К}` },
      { title: 'Масса',
        tex: String.raw`m = \frac{M|\Delta U|}{\frac52R(T_1 - T_2)} = \frac{0{,}032\cdot8400}{20{,}8\cdot193} = 67{,}2\ \text{г}` },
    ],
    answer: [String.raw`m = 67{,}2\ \text{г}`],
  },

  /* ===================== 11.45 ===================== */
  {
    id: '11.45', chapter: CH, section: S3, page: '180',
    title: 'Адиабатное расширение водорода',
    given: [[String.raw`\text{н. у.},\ V_1 = 100\ \text{м}^3`, ''], [String.raw`V_2 = 150\ \text{м}^3`, '']],
    find: String.raw`\Delta U \;—\; ?`,
    formulas: [ADIAB],
    steps: [
      { title: 'Изменение внутренней энергии',
        tex: String.raw`\Delta U = \frac{p_1V_1}{\gamma - 1}\left[\left(\frac{V_1}{V_2}\right)^{\gamma - 1} - 1\right] = \frac{1{,}013\cdot10^7}{0{,}4}(0{,}850 - 1) = -3{,}8\ \text{МДж}` },
    ],
    answer: [String.raw`\Delta U = -3{,}8\ \text{МДж}`],
  },

  /* ===================== 11.46 ===================== */
  {
    id: '11.46', chapter: CH, section: S3, page: '180',
    title: 'Адиабата, затем изотерма',
    note: MISMATCH + String.raw`В книге полная работа $-21$ кДж — это только работа на изотерме. На адиабате газ совершил $+29{,}6$ кДж, поэтому полная работа $29{,}6 - 21{,}1 = 8{,}5$ кДж. Температура 157 К совпадает.`,
    given: [[String.raw`m = 0{,}02\ \text{кг}\ (\nu = 10\ \text{моль})`, ''], [String.raw`T_1 = 300\ \text{К}`, ''], [String.raw`V_2 = 5V_1,\ V_3 = V_1`, '']],
    find: String.raw`T_2,\ A \;—\; ?`,
    formulas: [ADIAB, AISOT],
    figure: pv({ x: [0, 5.6], y: [0, 1.15], xt: [1, 5], yt: [], xl: 'V / V₁', yl: 'p',
      s: [curve(v => v ** -1.4, 1, 5), curve(v => 5 ** -1.4 * 5 / v, 1, 5, { blue: true })],
      dots: [[1, 1], [5, 5 ** -1.4], [1, 5 ** -0.4]],
      arrows: [mid(v => v ** -1.4, 1.6, 2.4).slice(0, 4), [3.2, 5 ** -1.4 * 5 / 3.2, 2.8, 5 ** -1.4 * 5 / 2.8, true]],
      txt: [[1.12, 1.02, '1'], [5.05, 0.17, '2'], [1.12, 0.56, '3']] }),
    figCaption: '1–2 — адиабатное расширение, 2–3 — изотермическое сжатие (синяя)',
    steps: [
      { title: 'Температура после адиабаты',
        tex: String.raw`T_2 = T_1\left(\frac{V_1}{V_2}\right)^{\gamma - 1} = 300\cdot5^{-0{,}4} = 157\ \text{К}` },
      { title: 'Работа на адиабате',
        tex: String.raw`A_{12} = \nu\frac52R(T_1 - T_2) = 10\cdot20{,}8\cdot142{,}4 = 29{,}6\ \text{кДж}` },
      { title: 'Работа на изотерме',
        tex: String.raw`A_{23} = \nu RT_2\ln\frac{V_3}{V_2} = -10\cdot8{,}31\cdot157{,}6\cdot\ln5 = -21{,}1\ \text{кДж}` },
      { title: 'Полная работа',
        tex: String.raw`A = 29{,}6 - 21{,}1 = 8{,}5\ \text{кДж}` },
    ],
    answer: [String.raw`T_2 = 157\ \text{К};\quad A = 8{,}5\ \text{кДж}\ (A_{12} = 29{,}6,\ A_{23} = -21{,}1\ \text{кДж})`],
  },

  /* ===================== 11.47 ===================== */
  {
    id: '11.47', chapter: CH, section: S3, page: '180–181',
    title: 'Адиабатное сжатие кислорода до 900 К',
    note: TYPO + String.raw`В формуле книги «$p_2 = p_1(T_2 - T_1)^{\gamma(\gamma - 1)}$» — должно быть $p_2 = p_1\left(\frac{T_2}{T_1}\right)^{\gamma/(\gamma - 1)}$. Расчёт даёт 11,3 МПа (в книге 11,4 — отличие в последней цифре).`,
    given: [[String.raw`m = 20\ \text{г}`, ''], [String.raw`\Delta U = 8\ \text{кДж}`, ''], [String.raw`T_2 = 900\ \text{К}`, ''], [String.raw`p_1 = 200\ \text{кПа}`, '']],
    find: String.raw`\Delta T,\ p_2 \;—\; ?`,
    formulas: [DU, ADIAB],
    steps: [
      { title: '1) Повышение температуры',
        tex: String.raw`\Delta T = \frac{2M\Delta U}{imR} = \frac{2\cdot0{,}032\cdot8000}{5\cdot0{,}02\cdot8{,}31} = 616\ \text{К},\qquad T_1 = 284\ \text{К}` },
      { title: '2) Давление',
        tex: String.raw`p_2 = p_1\left(\frac{T_2}{T_1}\right)^{\gamma/(\gamma - 1)} = 0{,}2\cdot3{,}17^{3{,}5} = 11{,}3\ \text{МПа}` },
    ],
    answer: [String.raw`\Delta T = 616\ \text{К};\quad p_2 = 11{,}3\ \text{МПа}`],
  },

  /* ===================== 11.48 ===================== */
  {
    id: '11.48', chapter: CH, section: S3, page: '181',
    title: 'Адиабатное сжатие воздуха в 10 раз',
    given: [[String.raw`V_1 = 10\ \text{л},\ p_1 = 100\ \text{кПа}`, ''], [String.raw`V_2 = 1\ \text{л}`, ''], [String.raw`\gamma = 1{,}4`, '']],
    find: String.raw`p_2 \;—\; ?`,
    formulas: [ADIAB],
    steps: [
      { title: 'Уравнение Пуассона',
        text: 'В книге 2,52 МПа — отличие в последней цифре.',
        tex: String.raw`p_2 = p_1\left(\frac{V_1}{V_2}\right)^\gamma = 0{,}1\cdot10^{1{,}4} = 2{,}51\ \text{МПа}` },
    ],
    answer: [String.raw`p_2 = 2{,}51\ \text{МПа}`],
  },

  /* ===================== 11.49 ===================== */
  {
    id: '11.49', chapter: CH, section: S3, page: '181',
    title: 'Степень сжатия дизеля',
    given: [[String.raw`T_1 = 350\ \text{К},\ T_2 = 1100\ \text{К}`, ''], [String.raw`\gamma = 1{,}4`, '']],
    find: String.raw`V_1/V_2 \;—\; ?`,
    formulas: [ADIAB],
    steps: [
      { title: 'TV^(γ−1) = const',
        text: 'В книге 17,6 — отличие в последней цифре.',
        tex: String.raw`\frac{V_1}{V_2} = \left(\frac{T_2}{T_1}\right)^{1/(\gamma - 1)} = 3{,}143^{2{,}5} = 17{,}5` },
    ],
    answer: [String.raw`V_1/V_2 = 17{,}5`],
  },

  /* ===================== 11.50 ===================== */
  {
    id: '11.50', chapter: CH, section: S3, page: '181',
    title: 'Изобарный нагрев углекислого газа',
    note: MISMATCH + String.raw`В книге $A = 5{,}8$ кДж и $Q = 17{,}1$ кДж. Но при постоянном давлении $A = \nu R\Delta T = 9{,}09\cdot8{,}31\cdot50 = 3{,}78$ кДж, и $Q = \Delta U + A = 15{,}1$ кДж. $\Delta U = 11{,}3$ кДж совпадает.`,
    given: [[String.raw`m = 400\ \text{г}\ (\nu = 9{,}09\ \text{моль})`, ''], [String.raw`\Delta T = 50\ \text{К}`, ''], [String.raw`i = 6`, '']],
    find: String.raw`\Delta U,\ Q,\ A \;—\; ?`,
    formulas: [FIRST, DU, AISOB],
    steps: [
      { title: 'Внутренняя энергия',
        tex: String.raw`\Delta U = 9{,}09\cdot3\cdot8{,}31\cdot50 = 11{,}3\ \text{кДж}` },
      { title: 'Работа',
        tex: String.raw`A = \nu R\Delta T = 3{,}78\ \text{кДж}` },
      { title: 'Теплота',
        tex: String.raw`Q = \Delta U + A = 15{,}1\ \text{кДж}` },
    ],
    answer: [String.raw`\Delta U = 11{,}3\ \text{кДж};\quad Q = 15{,}1\ \text{кДж};\quad A = 3{,}78\ \text{кДж}`],
  },

  /* ===================== 11.51 ===================== */
  {
    id: '11.51', chapter: CH, section: S3, page: '181',
    title: 'Изохорное охлаждение кислорода',
    given: [[String.raw`m = 800\ \text{г}\ (25\ \text{моль})`, ''], [String.raw`t_1 = 100\ ^\circ\text{C},\ t_2 = 20\ ^\circ\text{C}`, '']],
    find: String.raw`Q,\ \Delta U,\ A \;—\; ?`,
    formulas: [FIRST, DU],
    steps: [
      { title: 'Изохора',
        tex: String.raw`A = 0,\qquad Q = \Delta U = 25\cdot\frac52\cdot8{,}31\cdot(-80) = -41{,}6\ \text{кДж}` },
    ],
    answer: [String.raw`Q = \Delta U = -41{,}6\ \text{кДж};\quad A = 0`],
  },

  /* ===================== 11.52 ===================== */
  {
    id: '11.52', chapter: CH, section: S3, page: '181',
    title: 'Изохорный нагрев азота',
    given: [[String.raw`V = 3\ \text{л}`, ''], [String.raw`\Delta p = 1\ \text{МПа}`, '']],
    find: String.raw`Q \;—\; ?`,
    formulas: [FIRST],
    steps: [
      { title: 'Q = ΔU',
        tex: String.raw`Q = \frac52V\Delta p = 2{,}5\cdot0{,}003\cdot10^6 = 7{,}5\ \text{кДж}` },
    ],
    answer: [String.raw`Q = \Delta U = 7{,}5\ \text{кДж}`],
  },

  /* ===================== 11.53 ===================== */
  {
    id: '11.53', chapter: CH, section: S4, page: '181',
    title: 'К.п.д. по работе и отданной теплоте',
    given: [[String.raw`A = 1\ \text{Дж}`, ''], [String.raw`Q_2 = 4{,}2\ \text{Дж}`, '']],
    find: String.raw`\eta \;—\; ?`,
    formulas: [ETA],
    steps: [
      { title: 'Полученная теплота',
        tex: String.raw`Q_1 = A + Q_2 = 5{,}2\ \text{Дж},\qquad \eta = \frac{1}{5{,}2} = 0{,}192` },
    ],
    answer: [String.raw`\eta = 0{,}192`],
  },

  /* ===================== 11.54 ===================== */
  {
    id: '11.54', chapter: CH, section: S4, page: '181',
    title: 'Работа за цикл',
    given: [[String.raw`Q_1 = 4\ \text{кДж}`, ''], [String.raw`\eta = 0{,}1`, '']],
    find: String.raw`A \;—\; ?`,
    formulas: [ETA],
    steps: [
      { title: 'Работа',
        tex: String.raw`A = \eta Q_1 = 400\ \text{Дж}` },
    ],
    answer: [String.raw`A = 400\ \text{Дж}`],
  },

  /* ===================== 11.55 ===================== */
  {
    id: '11.55', chapter: CH, section: S4, page: '181',
    title: 'Цикл из двух изохор и двух изобар',
    given: [[String.raw`\nu = 1\ \text{моль},\ i = 5`, ''], [String.raw`V = 10\ \text{и}\ 20\ \text{л}`, ''], [String.raw`p = 246\ \text{и}\ 410\ \text{кПа}`, '']],
    find: String.raw`T_k,\ \eta \;—\; ?`,
    formulas: [ETA, { tex: String.raw`T = \frac{pV}{\nu R}`, text: 'температура в точке цикла' }],
    figure: pv({ x: [0, 24], y: [0, 470], xt: [10, 20], yt: [246, 410], xl: 'V, л', yl: 'p, кПа',
      s: [{ pts: [[10, 246], [10, 410], [20, 410], [20, 246], [10, 246]] }], dots: [[10, 246], [10, 410], [20, 410], [20, 246]],
      arrows: [[10, 310, 10, 340], [14, 410, 16, 410], [20, 340, 20, 310], [16, 246, 14, 246]],
      txt: [[8.6, 225, '1'], [8.6, 440, '2'], [20.4, 440, '3'], [20.4, 225, '4']] }),
    figCaption: 'Цикл 1–2–3–4: изохорное нагревание, изобарное расширение, изохорное охлаждение, изобарное сжатие',
    steps: [
      { title: 'Температуры в вершинах',
        tex: String.raw`T_1 = \frac{246\cdot10}{8{,}31} = 296\ \text{К},\quad T_2 = 493\ \text{К},\quad T_3 = 987\ \text{К},\quad T_4 = 592\ \text{К}` },
      { title: 'Работа — площадь прямоугольника',
        tex: String.raw`A = (410 - 246)\cdot10^3\cdot0{,}01 = 1640\ \text{Дж}` },
      { title: 'Полученная теплота (участки 1–2 и 2–3)',
        tex: String.raw`Q_1 = \frac52R(T_2 - T_1) + \frac72R(T_3 - T_2) = 4100 + 14\,350 = 18\,450\ \text{Дж}` },
      { title: 'К.п.д.',
        tex: String.raw`\eta = \frac{1640}{18\,450} = 0{,}089 = 8{,}9\ \%` },
    ],
    answer: [String.raw`T = 296;\ 493;\ 987;\ 592\ \text{К};\quad \eta = 8{,}9\ \%`],
  },

  /* ===================== 11.56 ===================== */
  {
    id: '11.56', chapter: CH, section: S4, page: '181',
    title: 'Цикл по графику рис. 11.4',
    note: MISMATCH + String.raw`В книге $Q_1 = 7{,}61$ кДж, $Q_2 = 7{,}21$ кДж, $A = 0{,}4$ кДж — все числа в 10 раз меньше. По рис. 11.4 работа — площадь прямоугольника $4\ \text{кПа}\cdot1\ \text{м}^3 = 4$ кДж, $Q_1 = 76$ кДж, $Q_2 = 72$ кДж. К.п.д. 5,3 % совпадает (он от масштаба не зависит).`,
    given: [[String.raw`i = 5`, ''], [String.raw`\text{рис. 11.4:}\ V = 2\ \text{и}\ 3\ \text{м}^3;\ p = 12\ \text{и}\ 16\ \text{кПа}`, '']],
    find: String.raw`Q_1,\ Q_2,\ A,\ \eta \;—\; ?`,
    formulas: [ETA, { tex: String.raw`Q_V = \frac i2V\Delta p,\quad Q_p = \frac{i + 2}{2}p\Delta V`, text: 'теплота на изохоре и изобаре (через p и V)' }],
    steps: [
      { title: 'Полученная теплота: 1–2 (изохора) и 2–3 (изобара)',
        tex: String.raw`Q_1 = \frac52\cdot2\cdot4\cdot10^3 + \frac72\cdot16\cdot10^3\cdot1 = 20 + 56 = 76\ \text{кДж}` },
      { title: 'Работа и отданная теплота',
        tex: String.raw`A = 4\cdot10^3\cdot1 = 4\ \text{кДж},\qquad Q_2 = Q_1 - A = 72\ \text{кДж}` },
      { title: 'К.п.д.',
        tex: String.raw`\eta = \frac{4}{76} = 5{,}3\ \%` },
    ],
    answer: [String.raw`Q_1 = 76\ \text{кДж};\quad Q_2 = 72\ \text{кДж};\quad A = 4\ \text{кДж};\quad \eta = 5{,}3\ \%`],
  },

  /* ===================== 11.57 ===================== */
  {
    id: '11.57', chapter: CH, section: S4, page: '182',
    title: 'Изохора — изотерма — изобара',
    given: [[String.raw`\nu = 1\ \text{моль},\ i = 5`, ''], [String.raw`p_1 = 0{,}1\ \text{МПа},\ T_1 = 300\ \text{К}`, ''], [String.raw`p_2 = 0{,}2\ \text{МПа}`, '']],
    find: String.raw`T_k,\ \eta \;—\; ?`,
    formulas: [ETA, AISOT],
    figure: pv({ x: [0, 56], y: [0, 0.23], xt: [24.9, 49.9], yt: [0.1, 0.2], xl: 'V, л', yl: 'p, МПа',
      s: [{ pts: [[24.93, 0.1], [24.93, 0.2]] }, curve(v => 0.2 * 24.93 / v, 24.93, 49.86, { blue: true }), { pts: [[49.86, 0.1], [24.93, 0.1]] }],
      dots: [[24.93, 0.1], [24.93, 0.2], [49.86, 0.1]],
      arrows: [[24.93, 0.14, 24.93, 0.16], [33, 0.2 * 24.93 / 33, 37, 0.2 * 24.93 / 37, true], [40, 0.1, 35, 0.1]],
      txt: [[22, 0.085, '1'], [22, 0.215, '2'], [50.5, 0.115, '3']] }),
    figCaption: '1–2 — изохора, 2–3 — изотерма T = 600 К (синяя), 3–1 — изобара',
    steps: [
      { title: 'Температуры',
        tex: String.raw`T_2 = T_3 = T_1\frac{p_2}{p_1} = 600\ \text{К}` },
      { title: 'Полученная теплота: 1–2 и 2–3',
        tex: String.raw`Q_1 = \frac52R\cdot300 + R\cdot600\ln2 = 6230 + 3460 = 9690\ \text{Дж}` },
      { title: 'Отданная теплота: 3–1',
        tex: String.raw`Q_2 = \frac72R\cdot300 = 8730\ \text{Дж}` },
      { title: 'К.п.д.',
        tex: String.raw`\eta = \frac{Q_1 - Q_2}{Q_1} = 0{,}099 = 9{,}9\ \%` },
    ],
    answer: [String.raw`T_2 = T_3 = 600\ \text{К};\quad \eta = 9{,}9\ \%`],
  },

  /* ===================== 11.58 ===================== */
  {
    id: '11.58', chapter: CH, section: S4, page: '182',
    title: 'Изобара — адиабата — изотерма',
    note: SMALL + String.raw`Точно $T_1 = 602$ К и $p_3 = 5{,}59$ МПа; в книге округлено до 600 К и дано 5,56 МПа (с $T_1 = 600$ К выходит 5,57).`,
    given: [[String.raw`\nu = 0{,}1\ \text{кмоль},\ i = 3`, ''], [String.raw`p_1 = 100\ \text{кПа},\ V_1 = 5\ \text{м}^3`, ''], [String.raw`V_2 = 1\ \text{м}^3`, '']],
    find: String.raw`T_1,\ T_2,\ V_3,\ p_3,\ Q_1,\ Q_2,\ A,\ \eta \;—\; ?`,
    formulas: [ETA, ADIAB, AISOT],
    figure: pv({ x: [0, 5.5], y: [0, 6.2], xt: [1, 5], yt: [0.1, 5.59], xl: 'V, м³', yl: 'p, МПа',
      s: [{ pts: [[5, 0.1], [1, 0.1]] }, curve(v => 0.1 * v ** (-5 / 3), 0.0894, 1), curve(v => 0.5 / v, 0.0894, 5, { blue: true })],
      dots: [[5, 0.1], [1, 0.1], [0.0894, 5.59]],
      arrows: [[3.2, 0.1, 2.8, 0.1], [0.5, 0.1 * 0.5 ** (-5 / 3), 0.45, 0.1 * 0.45 ** (-5 / 3)], [1.4, 0.5 / 1.4, 1.6, 0.5 / 1.6, true]],
      txt: [[5.05, 0.45, '1'], [1.05, 0.45, '2'], [0.25, 5.5, '3']] }),
    figCaption: '1–2 — изобарное сжатие, 2–3 — адиабатное сжатие, 3–1 — изотермическое расширение (синяя)',
    steps: [
      { title: '1) Характерные точки',
        tex: String.raw`T_1 = \frac{p_1V_1}{\nu R} = \frac{5\cdot10^5}{831} = 602\ \text{К},\quad T_2 = \frac{p_1V_2}{\nu R} = 120\ \text{К}` },
      { title: 'Адиабата 2–3 до температуры T₁',
        tex: String.raw`V_3 = V_2\left(\frac{T_2}{T_1}\right)^{1/(\gamma - 1)} = 1\cdot0{,}2^{1{,}5} = 0{,}0894\ \text{м}^3,\qquad p_3 = \frac{\nu RT_1}{V_3} = 5{,}59\ \text{МПа}` },
      { title: '2) Теплота от нагревателя (изотерма 3–1)',
        tex: String.raw`Q_1 = \nu RT_1\ln\frac{V_1}{V_3} = 5\cdot10^5\cdot\ln55{,}9 = 2{,}0\ \text{МДж}` },
      { title: '3) Теплота охладителю (изобара 1–2)',
        tex: String.raw`Q_2 = \frac52p_1(V_1 - V_2) = 2{,}5\cdot10^5\cdot4 = 1{,}0\ \text{МДж}` },
      { title: '4–5) Работа и к.п.д.',
        tex: String.raw`A = Q_1 - Q_2 = 1{,}0\ \text{МДж},\qquad \eta = 50\ \%` },
    ],
    answer: [String.raw`T_1 = 602\ \text{К};\quad T_2 = 120\ \text{К};\quad V_2 = 1\ \text{м}^3`, String.raw`V_3 = 0{,}089\ \text{м}^3;\quad p_3 = 5{,}59\ \text{МПа}`, String.raw`Q_1 = 2\ \text{МДж};\quad Q_2 = 1\ \text{МДж};\quad A = 1\ \text{МДж};\quad \eta = 50\ \%`],
  },

  /* ===================== 11.59 ===================== */
  {
    id: '11.59', chapter: CH, section: S4, page: '182',
    title: 'Прямоугольный цикл многоатомного газа',
    given: [[String.raw`i = 6`, ''], [String.raw`p_{\max} = 2p_{\min},\ V_{\max} = 4V_{\min}`, '']],
    find: String.raw`\eta \;—\; ?`,
    formulas: [ETA],
    steps: [
      { title: 'В единицах p_min V_min',
        text: 'Цикл: изохорное нагревание при V_min, изобарное расширение при 2p_min, затем охлаждение и сжатие.',
        tex: String.raw`A = (2 - 1)(4 - 1) = 3,\qquad Q_1 = 3\cdot1\cdot1 + 4\cdot2\cdot3 = 27` },
      { title: 'К.п.д.',
        tex: String.raw`\eta = \frac{3}{27} = 0{,}11` },
    ],
    answer: [String.raw`\eta = 0{,}11`],
  },

  /* ===================== 11.60 ===================== */
  {
    id: '11.60', chapter: CH, section: S4, page: '182',
    title: 'Температура нагревателя Карно',
    given: [[String.raw`Q_2 = \tfrac23Q_1`, ''], [String.raw`T_2 = 280\ \text{К}`, '']],
    find: String.raw`T_1 \;—\; ?`,
    formulas: [CARNOT],
    steps: [
      { title: 'Для цикла Карно Q₂/Q₁ = T₂/T₁',
        tex: String.raw`T_1 = \frac32T_2 = 420\ \text{К}` },
    ],
    answer: [String.raw`T_1 = 420\ \text{К}`],
  },

  /* ===================== 11.61 ===================== */
  {
    id: '11.61', chapter: CH, section: S4, page: '182',
    title: 'Рост к.п.д. Карно',
    given: [[String.raw`T_2 = 290\ \text{К}`, ''], [String.raw`T'_1 = 400\ \text{К},\ T''_1 = 600\ \text{К}`, '']],
    find: String.raw`\eta''/\eta' \;—\; ?`,
    formulas: [CARNOT],
    steps: [
      { title: 'Два к.п.д.',
        tex: String.raw`\eta' = 1 - \frac{290}{400} = 0{,}275,\quad \eta'' = 1 - \frac{290}{600} = 0{,}517,\quad \frac{\eta''}{\eta'} = 1{,}88` },
    ],
    answer: [String.raw`\eta''/\eta' = 1{,}88`],
  },

  /* ===================== 11.62 ===================== */
  {
    id: '11.62', chapter: CH, section: S4, page: '182',
    title: 'Работа цикла Карно при T₁ = 3T₂',
    given: [[String.raw`T_1 = 3T_2`, ''], [String.raw`Q_1 = 42\ \text{кДж}`, '']],
    find: String.raw`A \;—\; ?`,
    formulas: [CARNOT],
    steps: [
      { title: 'Работа',
        tex: String.raw`\eta = 1 - \frac13 = \frac23,\qquad A = \frac23\cdot42 = 28\ \text{кДж}` },
    ],
    answer: [String.raw`A = 28\ \text{кДж}`],
  },

  /* ===================== 11.63 ===================== */
  {
    id: '11.63', chapter: CH, section: S4, page: '182',
    title: 'Карно: к.п.д. и отданная теплота',
    given: [[String.raw`T_1 = 470\ \text{К},\ T_2 = 280\ \text{К}`, ''], [String.raw`A_\text{изот.расш} = 100\ \text{Дж}`, '']],
    find: String.raw`\eta,\ Q_2 \;—\; ?`,
    formulas: [CARNOT],
    steps: [
      { title: 'К.п.д.',
        tex: String.raw`\eta = 1 - \frac{280}{470} = 0{,}404` },
      { title: 'Теплота охладителю',
        text: 'На изотерме расширения вся полученная теплота идёт в работу: Q₁ = 100 Дж.',
        tex: String.raw`Q_2 = Q_1\frac{T_2}{T_1} = 100\cdot\frac{280}{470} = 59{,}6\ \text{Дж}` },
    ],
    answer: [String.raw`\eta = 0{,}404;\quad Q_2 = 59{,}6\ \text{Дж}`],
  },

  /* ===================== 11.64 ===================== */
  {
    id: '11.64', chapter: CH, section: S4, page: '182',
    title: 'Доля теплоты, отданной охладителю',
    given: [[String.raw`T_1 = 4T_2`, '']],
    find: String.raw`w = Q_2/Q_1 \;—\; ?`,
    formulas: [CARNOT],
    steps: [
      { title: 'Q₂/Q₁ = T₂/T₁',
        tex: String.raw`w = \frac14` },
    ],
    answer: [String.raw`w = 1/4`],
  },

  /* ===================== 11.65 ===================== */
  {
    id: '11.65', chapter: CH, section: S4, page: '183',
    title: 'К.п.д. и отношение температур',
    given: [[String.raw`Q_1 = 4{,}2\ \text{кДж}`, ''], [String.raw`A = 590\ \text{Дж}`, '']],
    find: String.raw`\eta,\ T_1/T_2 \;—\; ?`,
    formulas: [ETA, CARNOT],
    steps: [
      { title: 'К.п.д.',
        tex: String.raw`\eta = \frac{590}{4200} = 0{,}14 = 14\ \%` },
      { title: 'Отношение температур',
        tex: String.raw`\frac{T_1}{T_2} = \frac{1}{1 - \eta} = 1{,}16` },
    ],
    answer: [String.raw`\eta = 14\ \%;\quad T_1/T_2 = 1{,}16`],
  },

  /* ===================== 11.66 ===================== */
  {
    id: '11.66', chapter: CH, section: S4, page: '183',
    title: 'Работа изотермического сжатия',
    given: [[String.raw`A_1 = 5\ \text{Дж}`, ''], [String.raw`\eta = 0{,}2`, '']],
    find: String.raw`A_2 \;—\; ?`,
    formulas: [CARNOT],
    steps: [
      { title: 'Работы на изотермах = теплоты',
        tex: String.raw`A_2 = Q_2 = Q_1(1 - \eta) = 5\cdot0{,}8 = 4\ \text{Дж}` },
    ],
    answer: [String.raw`A_2 = 4\ \text{Дж}`],
  },

  /* ===================== 11.67 ===================== */
  {
    id: '11.67', chapter: CH, section: S4, page: '183',
    title: 'Наибольший объём в цикле Карно',
    given: [[String.raw`V_1 = 153\ \text{л}`, ''], [String.raw`V_2 = 600\ \text{л},\ V_4 = 189\ \text{л}`, '']],
    find: String.raw`V_3 \;—\; ?`,
    formulas: [{ tex: String.raw`\frac{V_2}{V_1} = \frac{V_3}{V_4}`, text: 'в цикле Карно отношения объёмов на двух изотермах равны' }],
    steps: [
      { title: 'Из равенства отношений',
        tex: String.raw`V_3 = \frac{V_2V_4}{V_1} = \frac{600\cdot189}{153} = 741\ \text{л} = 0{,}74\ \text{м}^3` },
    ],
    answer: [String.raw`V_3 = 0{,}74\ \text{м}^3`],
  },

  /* ===================== 11.68 ===================== */
  {
    id: '11.68', chapter: CH, section: S4, page: '183',
    title: 'К.п.д. Карно по объёмам на адиабате',
    given: [[String.raw`V_B = V_1 = 12\ \text{л}`, ''], [String.raw`V_C = V_2 = 16\ \text{л}`, ''], [String.raw`i = 5`, '']],
    find: String.raw`\eta \;—\; ?`,
    formulas: [CARNOT, ADIAB],
    steps: [
      { title: 'B–C — адиабата',
        text: 'На рис. 11.5 B — конец изотермического расширения при T₁, C — конец адиабатного расширения при T₂.',
        tex: String.raw`\frac{T_2}{T_1} = \left(\frac{V_1}{V_2}\right)^{\gamma - 1} = 0{,}75^{0{,}4} = 0{,}891` },
      { title: 'К.п.д.',
        tex: String.raw`\eta = 1 - 0{,}891 = 10{,}9\ \%` },
    ],
    answer: [String.raw`\eta = 10{,}9\ \%`],
  },

  /* ===================== 11.69 ===================== */
  {
    id: '11.69', chapter: CH, section: S5, page: '183',
    title: 'Смешивание тёплой и холодной воды',
    given: [[String.raw`m_1 = 5\ \text{кг},\ T_1 = 280\ \text{К}`, ''], [String.raw`m_2 = 8\ \text{кг},\ T_2 = 350\ \text{К}`, ''], [String.raw`c = 4{,}19\ \text{кДж/(кг·К)}`, '']],
    find: String.raw`\theta,\ \Delta S \;—\; ?`,
    formulas: [DS, { tex: String.raw`\Delta S = cm\ln\frac{T_2}{T_1}`, text: 'энтропия при нагревании тела теплоёмкостью cm' }],
    steps: [
      { title: 'Температура смеси',
        tex: String.raw`\theta = \frac{m_1T_1 + m_2T_2}{m_1 + m_2} = \frac{1400 + 2800}{13} = 323\ \text{К}` },
      { title: 'Изменение энтропии',
        text: 'Холодная вода получает энтропию больше, чем теряет горячая, — смешивание необратимо.',
        tex: String.raw`\Delta S = c\left(m_1\ln\frac{323}{280} + m_2\ln\frac{323}{350}\right) = 4190\,(0{,}716 - 0{,}640) = 316\ \text{Дж/К}` },
    ],
    answer: [String.raw`\theta = 323\ \text{К};\quad \Delta S \approx 0{,}3\ \text{кДж/К}`],
  },

  /* ===================== 11.70 ===================== */
  {
    id: '11.70', chapter: CH, section: S5, page: '183',
    title: 'Изохорный нагрев водорода',
    given: [[String.raw`m = 1\ \text{г}`, ''], [String.raw`p_2/p_1 = 2`, '']],
    find: String.raw`\Delta S \;—\; ?`,
    formulas: [DSGAS],
    steps: [
      { title: 'V = const, T₂/T₁ = 2',
        tex: String.raw`\Delta S = \frac mM\frac52R\ln2 = 0{,}5\cdot20{,}8\cdot0{,}693 = 7{,}2\ \text{Дж/К}` },
    ],
    answer: [String.raw`\Delta S = 7{,}2\ \text{Дж/К}`],
  },

  /* ===================== 11.71 ===================== */
  {
    id: '11.71', chapter: CH, section: S5, page: '183',
    title: 'Изобарное расширение азота',
    given: [[String.raw`m = 4\ \text{г}`, ''], [String.raw`V_1 = 5\ \text{л},\ V_2 = 9\ \text{л}`, '']],
    find: String.raw`\Delta S \;—\; ?`,
    formulas: [DSGAS],
    steps: [
      { title: 'p = const, T₂/T₁ = V₂/V₁',
        text: 'В книге 2,43 — отличие в последней цифре.',
        tex: String.raw`\Delta S = \frac mM\frac72R\ln\frac{V_2}{V_1} = \frac{4}{28}\cdot29{,}1\cdot\ln1{,}8 = 2{,}44\ \text{Дж/К}` },
    ],
    answer: [String.raw`\Delta S = 2{,}44\ \text{Дж/К}`],
  },

  /* ===================== 11.72 ===================== */
  {
    id: '11.72', chapter: CH, section: S5, page: '183',
    title: 'Лёд: нагрев, плавление, нагрев воды',
    given: [[String.raw`m = 200\ \text{г}`, ''], [String.raw`t_1 = -10\ ^\circ\text{C} \to 0\ ^\circ\text{C} \to t_3 = 10\ ^\circ\text{C}`, ''], [String.raw`c_\text{л} = 2{,}09;\ c_\text{в} = 4{,}19\ \text{кДж/(кг·К)};\ \lambda = 333\ \text{кДж/кг}`, '']],
    find: String.raw`\Delta S \;—\; ?`,
    formulas: [DS],
    steps: [
      { title: 'Три участка',
        text: 'В условии конечная температура напечатана как t₁ — по смыслу t₃ = 10 °C.',
        tex: String.raw`\Delta S = m\left(c_\text{л}\ln\frac{273}{263} + \frac{\lambda}{273} + c_\text{в}\ln\frac{283}{273}\right) = 0{,}2\,(78 + 1220 + 151) = 290\ \text{Дж/К}` },
      { title: 'Сверка',
        text: 'В книге 291 Дж/К — так выходит с теплотой плавления 335 кДж/кг.' },
    ],
    answer: [String.raw`\Delta S = 290\ \text{Дж/К}`],
  },

  /* ===================== 11.73 ===================== */
  {
    id: '11.73', chapter: CH, section: S5, page: '183',
    title: 'Лёд тает от пара',
    note: TYPO + String.raw`В формулах ответа книги перепутаны буквы: при $r$ — теплоте парообразования и $\lambda$ — теплоте плавления (как сказано в самом ответе) должно быть $m_2 = \frac{m_1\lambda}{r + c(t_2 - t_1)}$ и $\Delta S = \frac{m_1\lambda}{T_1} - \frac{m_2r}{T_2} - cm_2\ln\frac{T_2}{T_1}$. Единица энтропии — Дж/К, а не Дж/кг. Числа 249 г и 608 Дж/К здесь (у книги 251 г и 610) отличаются из-за значений постоянных.`,
    given: [[String.raw`m_1 = 2\ \text{кг}`, ''], [String.raw`t_1 = 0\ ^\circ\text{C},\ t_2 = 100\ ^\circ\text{C}`, ''], [String.raw`\lambda = 333\ \text{кДж/кг},\ r = 2{,}26\ \text{МДж/кг}`, '']],
    find: String.raw`m_2,\ \Delta S \;—\; ?`,
    formulas: [DS],
    steps: [
      { title: 'Тепловой баланс',
        text: 'Пар конденсируется и остывает до 0 °C, отдавая теплоту льду.',
        tex: String.raw`m_2\left[r + c(t_2 - t_1)\right] = m_1\lambda \;\Rightarrow\; m_2 = \frac{2\cdot333\,000}{2\,260\,000 + 419\,000} = 0{,}249\ \text{кг}` },
      { title: 'Энтропия',
        tex: String.raw`\Delta S = \frac{m_1\lambda}{273} - \frac{m_2r}{373} - cm_2\ln\frac{373}{273} = 2440 - 1506 - 325 = 608\ \text{Дж/К}` },
    ],
    answer: [String.raw`m_2 = 249\ \text{г};\quad \Delta S = 608\ \text{Дж/К}`],
  },

  /* ===================== 11.74 ===================== */
  {
    id: '11.74', chapter: CH, section: S5, page: '183',
    title: 'Изотермическое и адиабатное расширение',
    given: [[String.raw`m = 2\ \text{кг}`, ''], [String.raw`V_2/V_1 = 5`, '']],
    find: String.raw`\Delta S_1,\ \Delta S_2 \;—\; ?`,
    formulas: [DSGAS],
    steps: [
      { title: 'Изотермически',
        tex: String.raw`\Delta S_1 = \frac mMR\ln5 = 62{,}5\cdot8{,}31\cdot1{,}609 = 836\ \text{Дж/К}` },
      { title: 'Адиабатно',
        text: 'Обратимый адиабатный процесс — теплообмена нет, энтропия не меняется.',
        tex: String.raw`\Delta S_2 = 0` },
    ],
    answer: [String.raw`\Delta S_1 = 836\ \text{Дж/К};\quad \Delta S_2 = 0`],
  },

  /* ===================== 11.75 ===================== */
  {
    id: '11.75', chapter: CH, section: S5, page: '183–184',
    title: 'Изобара и изохора водорода',
    given: [[String.raw`m = 100\ \text{г}\ (50\ \text{моль})`, ''], [String.raw`n = 3`, '']],
    find: String.raw`\Delta S \;—\; ?`,
    formulas: [DSGAS],
    steps: [
      { title: 'Изобара: V и T растут в 3 раза',
        tex: String.raw`\Delta S_1 = \nu C_p\ln3` },
      { title: 'Изохора: p и T падают в 3 раза',
        tex: String.raw`\Delta S_2 = -\nu C_V\ln3` },
      { title: 'Итого',
        text: 'Температура вернулась к начальной, объём вырос втрое — как при изотермическом расширении.',
        tex: String.raw`\Delta S = \nu(C_p - C_V)\ln3 = 50\cdot8{,}31\cdot1{,}099 = 457\ \text{Дж/К}` },
    ],
    answer: [String.raw`\Delta S = 457\ \text{Дж/К}`],
  },

  /* ===================== 11.76 ===================== */
  {
    id: '11.76', chapter: CH, section: S5, page: '184',
    title: 'Адиабатное сжатие неона',
    note: SMALL + String.raw`В случае 1 в книге 882 К; $300\cdot5^{2/3} = 877$ К.`,
    given: [[String.raw`T_1 = 300\ \text{К}`, ''], [String.raw`n = 5`, ''], [String.raw`\gamma = 5/3`, '']],
    find: String.raw`T_2 \;—\; ?`,
    formulas: [ADIAB],
    steps: [
      { title: '1) Объём уменьшился в 5 раз',
        tex: String.raw`T_2 = T_1n^{\gamma - 1} = 300\cdot5^{2/3} = 877\ \text{К}` },
      { title: '2) Давление выросло в 5 раз',
        tex: String.raw`T_2 = T_1n^{(\gamma - 1)/\gamma} = 300\cdot5^{0{,}4} = 571\ \text{К}` },
    ],
    answer: [String.raw`1)\ 877\ \text{К};\quad 2)\ 571\ \text{К}`],
  },

  /* ===================== 11.77 ===================== */
  {
    id: '11.77', chapter: CH, section: S5, page: '184',
    title: 'Изотерма, затем адиабата (двухатомный)',
    note: MISMATCH + String.raw`В книге в п. 1 пропущена работа $A_{2-3} = 1{,}24$ кДж, а в п. 3 изменение внутренней энергии дано со знаком «+». При расширении по адиабате газ остывает (с 400 до 340 К), поэтому $\Delta U_{1-3} = -1{,}24$ кДж.`,
    given: [[String.raw`\nu = 1\ \text{моль},\ i = 5`, ''], [String.raw`T_1 = 400\ \text{К}`, ''], [String.raw`V_2 = 2V_1,\ V_3 = 3V_1`, '']],
    find: String.raw`A_{12},\ A_{23},\ T_3,\ \Delta U_{13} \;—\; ?`,
    formulas: [AISOT, ADIAB],
    steps: [
      { title: '1) Работы',
        tex: String.raw`A_{12} = RT_1\ln2 = 2{,}30\ \text{кДж},\qquad A_{23} = \frac52R(T_2 - T_3) = 1{,}24\ \text{кДж}` },
      { title: '2) Температура',
        tex: String.raw`T_3 = T_2\left(\frac{V_2}{V_3}\right)^{\gamma - 1} = 400\cdot\left(\frac23\right)^{0{,}4} = 340\ \text{К}` },
      { title: '3) Внутренняя энергия',
        tex: String.raw`\Delta U_{13} = \frac52R(T_3 - T_1) = -1{,}24\ \text{кДж}` },
    ],
    answer: [String.raw`A_{12} = 2{,}30\ \text{кДж};\quad A_{23} = 1{,}24\ \text{кДж}`, String.raw`T_3 = 340\ \text{К};\quad \Delta U_{13} = -1{,}24\ \text{кДж}`],
  },

  /* ===================== 11.78 ===================== */
  {
    id: '11.78', chapter: CH, section: S5, page: '184',
    title: 'Изотерма, затем адиабата (одноатомный)',
    given: [[String.raw`\nu = 1\ \text{моль},\ i = 3`, ''], [String.raw`T_1 = 300\ \text{К}`, ''], [String.raw`p_2 = 2p_1,\ p_3 = 4p_1`, '']],
    find: String.raw`A_{12},\ A_{23},\ T_3,\ \Delta U_{13} \;—\; ?`,
    formulas: [AISOT, ADIAB],
    steps: [
      { title: '1) Изотермическое сжатие',
        tex: String.raw`A_{12} = -RT_1\ln2 = -1{,}73\ \text{кДж}` },
      { title: '2) Адиабатное сжатие',
        text: 'В условии участок назван «1–3» — по смыслу 2–3.',
        tex: String.raw`T_3 = T_1\cdot2^{(\gamma - 1)/\gamma} = 300\cdot2^{0{,}4} = 396\ \text{К},\qquad A_{23} = -\frac32R(T_3 - T_1) = -1{,}19\ \text{кДж}` },
      { title: '3) Внутренняя энергия',
        tex: String.raw`\Delta U_{13} = \frac32R(T_3 - T_1) = 1{,}19\ \text{кДж}` },
    ],
    answer: [String.raw`A_{12} = -1{,}73\ \text{кДж};\quad A_{23} = -1{,}19\ \text{кДж}`, String.raw`T_3 = 396\ \text{К};\quad \Delta U_{13} = 1{,}19\ \text{кДж}`],
  },

  /* ===================== 11.79 ===================== */
  {
    id: '11.79', chapter: CH, section: S5, page: '184',
    title: 'ΔU, ΔH, ΔS водорода при изохорном нагреве',
    given: [[String.raw`\nu = 6\ \text{моль}`, ''], [String.raw`p = 1\ \text{МПа},\ T = 300\ \text{К}`, ''], [String.raw`\Delta p = 1{,}5\ \text{МПа}`, '']],
    find: String.raw`\Delta U,\ \Delta H,\ \Delta S \;—\; ?`,
    formulas: [DU, DSGAS, { tex: String.raw`\Delta H = \nu C_p\Delta T`, text: 'изменение энтальпии идеального газа' }],
    steps: [
      { title: 'Нагрев',
        tex: String.raw`\Delta T = T\frac{\Delta p}{p} = 450\ \text{К}` },
      { title: 'Ответы',
        tex: String.raw`\Delta U = 6\cdot\frac52R\cdot450 = 56{,}1\ \text{кДж},\quad \Delta H = 6\cdot\frac72R\cdot450 = 78{,}5\ \text{кДж},\quad \Delta S = 6\cdot\frac52R\ln2{,}5 = 114\ \text{Дж/К}` },
    ],
    answer: [String.raw`\Delta U = 56{,}1\ \text{кДж};\quad \Delta H = 78{,}5\ \text{кДж};\quad \Delta S = 114\ \text{Дж/К}`],
  },

  /* ===================== 11.80 ===================== */
  {
    id: '11.80', chapter: CH, section: S5, page: '184',
    title: 'ΔU, ΔH, ΔS кислорода при изохорном нагреве',
    given: [[String.raw`m = 80\ \text{г}\ (2{,}5\ \text{моль})`, ''], [String.raw`T_1 = 300\ \text{К},\ T_2 = 400\ \text{К}`, '']],
    find: String.raw`\Delta U,\ \Delta H,\ \Delta S \;—\; ?`,
    formulas: [DU, DSGAS],
    steps: [
      { title: 'Ответы',
        tex: String.raw`\Delta U = 2{,}5\cdot\frac52R\cdot100 = 5{,}19\ \text{кДж},\quad \Delta H = 7{,}27\ \text{кДж},\quad \Delta S = 2{,}5\cdot\frac52R\ln\frac43 = 14{,}9\ \text{Дж/К}` },
    ],
    answer: [String.raw`\Delta U = 5{,}19\ \text{кДж};\quad \Delta H = 7{,}27\ \text{кДж};\quad \Delta S = 14{,}9\ \text{Дж/К}`],
  },

  /* ===================== 11.81 ===================== */
  {
    id: '11.81', chapter: CH, section: S5, page: '184',
    title: 'Цикл: изохора, адиабата, изобара',
    note: TYPO + String.raw`В формуле книги $\eta = 1 - \frac{2}{2^\gamma - 1}$ — с ней выходит 0,080. Должно быть $\eta = 1 - \frac{\gamma}{2^\gamma - 1} = 0{,}234$ (в книге 0,236 — отличие в последней цифре).`,
    given: [[String.raw`i = 3,\ \gamma = 5/3`, ''], [String.raw`\text{рис. 11.6:}\ V_3 = 2V_1`, '']],
    find: String.raw`\eta \;—\; ?`,
    formulas: [ETA, ADIAB],
    steps: [
      { title: 'Точка 2',
        text: 'Адиабата 2–3 приходит в точку 3 с давлением p₁ и объёмом 2V₁:',
        tex: String.raw`p_2 = p_1\cdot2^\gamma` },
      { title: 'Теплоты',
        text: 'Теплота поступает на изохоре 1–2, уходит на изобаре 3–1.',
        tex: String.raw`Q_1 = \frac{V_1(p_2 - p_1)}{\gamma - 1} = \frac{p_1V_1(2^\gamma - 1)}{\gamma - 1},\qquad Q_2 = \frac{\gamma}{\gamma - 1}p_1(2V_1 - V_1)` },
      { title: 'К.п.д.',
        tex: String.raw`\eta = 1 - \frac{Q_2}{Q_1} = 1 - \frac{\gamma}{2^\gamma - 1} = 1 - \frac{1{,}667}{2{,}175} = 0{,}234` },
    ],
    answer: [String.raw`\eta = 1 - \frac{\gamma}{2^\gamma - 1} = 0{,}234`],
  },

  /* ===================== 11.82 ===================== */
  {
    id: '11.82', chapter: CH, section: S5, page: '184',
    title: 'Цикл: изохора, изотерма, изобара',
    note: TYPO + String.raw`В формуле книги $\eta = \frac{2}{2 + 3(\gamma - 1)\ln3}$ пропущен множитель: с ней 0,60. Должно быть $\eta = \frac{(3\ln3 - 2)(\gamma - 1)}{2 + 3(\gamma - 1)\ln3} = 0{,}156$ — число книги верное.`,
    given: [[String.raw`i = 5,\ \gamma = 1{,}4`, ''], [String.raw`\text{рис. 11.7:}\ p_2 = 3p_1,\ V_3 = 3V_1`, '']],
    find: String.raw`\eta \;—\; ?`,
    formulas: [ETA, AISOT],
    steps: [
      { title: 'Теплоты (в единицах p₁V₁)',
        tex: String.raw`Q_{12} = \frac{2}{\gamma - 1} = 5,\quad Q_{23} = 3\ln3 = 3{,}30,\quad Q_{31} = -\frac{\gamma}{\gamma - 1}\cdot2 = -7` },
      { title: 'К.п.д.',
        tex: String.raw`\eta = \frac{5 + 3{,}30 - 7}{5 + 3{,}30} = \frac{1{,}30}{8{,}30} = 0{,}156` },
    ],
    answer: [String.raw`\eta = 0{,}156`],
  },

  /* ===================== 11.83 ===================== */
  {
    id: '11.83', chapter: CH, section: S5, page: '184',
    title: 'Треугольный цикл одноатомного газа',
    note: MISMATCH + String.raw`В книге $\eta = 1 - \frac{2}{2^\gamma - 1} = 0{,}236$ — ответ задачи 11.81 перенесён сюда. По рис. 11.8 работа цикла $\frac12p_1V_1$, полученная теплота $6p_1V_1$, и $\eta = \frac{1}{12} = 0{,}083$.`,
    given: [[String.raw`i = 3`, ''], [String.raw`\text{рис. 11.8:}\ 1\,(V_1, p_1),\ 2\,(2V_1, 2p_1),\ 3\,(2V_1, p_1)`, '']],
    find: String.raw`\eta \;—\; ?`,
    formulas: [ETA, FIRST],
    steps: [
      { title: 'Работа — площадь треугольника',
        tex: String.raw`A = \frac12(2V_1 - V_1)(2p_1 - p_1) = \frac12p_1V_1` },
      { title: 'Теплота на участке 1–2',
        text: 'Только здесь газ получает теплоту (на 2–3 и 3–1 отдаёт).',
        tex: String.raw`\Delta U_{12} = \frac32(4 - 1)p_1V_1 = 4{,}5p_1V_1,\quad A_{12} = \frac{p_1 + 2p_1}{2}V_1 = 1{,}5p_1V_1,\quad Q_1 = 6p_1V_1` },
      { title: 'К.п.д.',
        tex: String.raw`\eta = \frac{0{,}5}{6} = 0{,}083` },
    ],
    answer: [String.raw`\eta = 1/12 = 0{,}083`],
  },

  /* ===================== 11.84 ===================== */
  {
    id: '11.84', chapter: CH, section: S5, page: '185',
    title: 'Выкипание воды',
    note: TYPO + String.raw`В книге «75,2 Дж» — должно быть 75,2 кДж.`,
    given: [[String.raw`m = 36\ \text{г}\ (2\ \text{моль})`, ''], [String.raw`T_\text{к} = 373\ \text{К}`, ''], [String.raw`L = 2{,}26\ \text{МДж/кг}`, '']],
    find: String.raw`\Delta U \;—\; ?`,
    formulas: [FIRST],
    steps: [
      { title: 'Теплота и работа',
        text: 'Пар занимает объём V = νRT/p и совершает работу против атмосферы pV = νRT.',
        tex: String.raw`Q = mL = 81{,}4\ \text{кДж},\qquad A = \nu RT_\text{к} = 2\cdot8{,}31\cdot373 = 6{,}2\ \text{кДж}` },
      { title: 'Внутренняя энергия',
        tex: String.raw`\Delta U = Q - A = 75{,}2\ \text{кДж}` },
    ],
    answer: [String.raw`\Delta U = 75{,}2\ \text{кДж}`],
  },

  /* ===================== 11.85 ===================== */
  {
    id: '11.85', chapter: CH, section: S5, page: '185',
    title: 'Энтропия при плавлении льда',
    note: TYPO + String.raw`В книге «1,46 Дж» — энтропия измеряется в Дж/К, и значение 1,46 кДж/К.`,
    given: [[String.raw`m = 1\ \text{кг}`, ''], [String.raw`t = -30\ ^\circ\text{C}`, String.raw`243\ \text{К}`], [String.raw`c = 2{,}09\ \text{кДж/(кг·К)},\ r = 333\ \text{кДж/кг}`, '']],
    find: String.raw`\Delta S \;—\; ?`,
    formulas: [DS],
    steps: [
      { title: 'Нагрев и плавление',
        tex: String.raw`\Delta S = mc\ln\frac{273}{243} + \frac{mr}{273} = 243 + 1220 = 1{,}46\cdot10^3\ \text{Дж/К}` },
    ],
    answer: [String.raw`\Delta S = 1{,}46\ \text{кДж/К}`],
  },

  /* ===================== 11.86 ===================== */
  {
    id: '11.86', chapter: CH, section: S5, page: '185',
    title: 'Нагрев и испарение воды',
    given: [[String.raw`m = 100\ \text{г}\ (5{,}56\ \text{моль})`, ''], [String.raw`T_1 = 300\ \text{К},\ T_\text{к} = 373\ \text{К}`, ''], [String.raw`C_m = 75{,}4\ \text{Дж/(моль·К)},\ L = 2{,}26\ \text{МДж/кг}`, '']],
    find: String.raw`\Delta S \;—\; ?`,
    formulas: [DS],
    steps: [
      { title: 'Два участка',
        tex: String.raw`\Delta S = \frac mMC_m\ln\frac{T_\text{к}}{T_1} + \frac{mL}{T_\text{к}} = 5{,}56\cdot75{,}4\cdot0{,}218 + \frac{226\,000}{373} = 91 + 606 = 697\ \text{Дж/К}` },
    ],
    answer: [String.raw`\Delta S = 697\ \text{Дж/К}`],
  },

  );
})();
