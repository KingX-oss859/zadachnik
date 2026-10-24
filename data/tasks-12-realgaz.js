/*
  § 12. Реальные газы. Жидкости — задачи 12.1–12.60 (стр. 195–201).
  Условия задач показываются дословно из книги (data/book-tasks.js).
  Ответы пересчитаны скриптом tools/check_realgaz.py и сверены с book/99-otvety.md.
  Где ответ книги расходится с расчётом — плашка note «Расхождение с ответом книги».
  Постоянные Ван-дер-Ваальса — табл. 13; плотности — табл. 9; вязкость — табл. 14; поверхностное натяжение — табл. 15.
  R = 8,31 Дж/(моль·К), g = 9,81 м/с², p₀ = 101,3 кПа.
*/
(function () {
  const CH = 'Гл. 2. Молекулярная физика и термодинамика';
  const S1 = 'Уравнение Ван-дер-Ваальса';
  const S2 = 'Критическое состояние';
  const S3 = 'Внутренняя энергия';
  const S4 = 'Поверхностное натяжение. Капиллярные явления';
  const S5 = 'Гидродинамика';
  const MISMATCH = '<b>Расхождение с ответом книги.</b> ';
  const SMALL = '<b>Расхождение в последней цифре.</b> ';
  const TYPO = '<b>Опечатка в ответе книги.</b> ';
  const SIGMA72 = SMALL + 'Книга, видимо, брала поверхностное натяжение воды 72 мН/м; здесь — 73 мН/м из табл. 15 этой же книги. ';

  const VDW = { tex: String.raw`\left(p + \frac{\nu^2a}{V^2}\right)(V - \nu b) = \nu RT`, text: 'уравнение Ван-дер-Ваальса; a, b — постоянные газа (табл. 13)' };
  const CRIT = { tex: String.raw`V_{m\,\text{кр}} = 3b,\quad p_\text{кр} = \frac{a}{27b^2},\quad T_\text{кр} = \frac{8a}{27Rb}`, text: 'критические параметры (в «Основных формулах» книги для T_кр напечатано 3a — опечатка)' };
  const REDUCED = { tex: String.raw`\left(\pi + \frac{3}{\varphi^2}\right)(3\varphi - 1) = 8\tau`, text: 'приведённое уравнение: π = p/p_кр, φ = V/V_кр, τ = T/T_кр' };
  const UREAL = { tex: String.raw`U = \nu\left(C_VT - \frac{a\nu}{V}\right)`, text: 'внутренняя энергия реального газа' };
  const LAPLACE = { tex: String.raw`\Delta p = \sigma\left(\frac{1}{R_1} + \frac{1}{R_2}\right),\quad \Delta p_\text{сф} = \frac{2\sigma}{R}`, text: 'формула Лапласа — добавочное давление под искривлённой поверхностью' };
  const SURF = { tex: String.raw`F = \sigma l,\quad E = \sigma S`, text: 'сила поверхностного натяжения на контур l и поверхностная энергия' };
  const CAPIL = { tex: String.raw`h = \frac{2\sigma}{\rho gr}`, text: 'высота подъёма смачивающей жидкости в капилляре радиусом r' };
  const CONT = { tex: String.raw`v_1S_1 = v_2S_2`, text: 'уравнение неразрывности' };
  const BERN = { tex: String.raw`p + \frac{\rho v^2}{2} + \rho gh = \text{const}`, text: 'уравнение Бернулли' };
  const TORR = { tex: String.raw`v = \sqrt{2gh}`, text: 'скорость вытекания из отверстия на глубине h (формула Торричелли)' };
  const RE = { tex: String.raw`\text{Re} = \frac{\rho vd}{\eta}`, text: 'число Рейнольдса; для трубы Re_кр = 2300, для шарика Re_кр = 0,5' };
  const STOKES = { tex: String.raw`F = 6\pi\eta rv`, text: 'сила Стокса для медленно движущегося шарика' };

  window.TASKS.push(

  /* ===================== 12.1 ===================== */
  {
    id: '12.1', chapter: CH, section: S1, page: '195',
    title: 'Внутреннее давление и объём молекул азота',
    given: [[String.raw`V = 10\ \text{л}`, String.raw`10^{-2}\ \text{м}^3`], [String.raw`m = 0{,}25\ \text{кг}\ (\nu = 8{,}93\ \text{моль})`, ''], [String.raw`a = 0{,}135,\ b = 3{,}86\cdot10^{-5}`, '']],
    find: String.raw`p',\ V' \;—\; ?`,
    formulas: [VDW],
    steps: [
      { title: '1) Внутреннее давление',
        text: 'Поправка к давлению за счёт притяжения молекул:',
        tex: String.raw`p' = \frac{\nu^2a}{V^2} = \frac{79{,}7\cdot0{,}135}{10^{-4}} = 108\ \text{кПа}` },
      { title: '2) Собственный объём молекул',
        text: 'Постоянная b равна учетверённому собственному объёму молекул моля.',
        tex: String.raw`V' = \frac{\nu b}{4} = \frac{8{,}93\cdot3{,}86\cdot10^{-5}}{4} = 8{,}62\cdot10^{-5}\ \text{м}^3 = 86{,}2\ \text{см}^3` },
    ],
    answer: [String.raw`p' = 108\ \text{кПа};\quad V' = 86{,}2\ \text{см}^3`],
  },

  /* ===================== 12.2 ===================== */
  {
    id: '12.2', chapter: CH, section: S1, page: '195',
    title: 'Давление кислорода: реальный и идеальный',
    given: [[String.raw`\nu = 1\ \text{моль}`, ''], [String.raw`V = 0{,}5\ \text{л}`, String.raw`5\cdot10^{-4}\ \text{м}^3`], [String.raw`T = 300\ \text{К}`, '']],
    find: String.raw`p \;—\; ?`,
    formulas: [VDW],
    steps: [
      { title: 'По Ван-дер-Ваальсу',
        tex: String.raw`p = \frac{RT}{V - b} - \frac{a}{V^2} = \frac{2493}{4{,}68\cdot10^{-4}} - \frac{0{,}136}{2{,}5\cdot10^{-7}} = 5{,}32 - 0{,}54 = 4{,}78\ \text{МПа}` },
      { title: 'По Менделееву — Клапейрону',
        tex: String.raw`p_\text{ид} = \frac{RT}{V} = 4{,}99\ \text{МПа}` },
    ],
    answer: [String.raw`p = 4{,}78\ \text{МПа};\quad p_\text{ид} = 4{,}99\ \text{МПа}`],
  },

  /* ===================== 12.3 ===================== */
  {
    id: '12.3', chapter: CH, section: S1, page: '195',
    title: 'Давление углекислого газа',
    given: [[String.raw`V = 0{,}3\ \text{л}`, ''], [String.raw`\nu = 1\ \text{моль}`, ''], [String.raw`T = 300\ \text{К}`, '']],
    find: String.raw`p_\text{ид},\ p \;—\; ?`,
    formulas: [VDW],
    steps: [
      { title: '1) Идеальный газ',
        tex: String.raw`p = \frac{RT}{V} = \frac{2493}{3\cdot10^{-4}} = 8{,}31\ \text{МПа}` },
      { title: '2) Ван-дер-Ваальс',
        text: 'В книге 5,67 — отличие в последней цифре.',
        tex: String.raw`p = \frac{2493}{3\cdot10^{-4} - 4{,}28\cdot10^{-5}} - \frac{0{,}361}{9\cdot10^{-8}} = 9{,}69 - 4{,}01 = 5{,}68\ \text{МПа}` },
    ],
    answer: [String.raw`1)\ 8{,}31\ \text{МПа};\quad 2)\ 5{,}68\ \text{МПа}`],
  },

  /* ===================== 12.4 ===================== */
  {
    id: '12.4', chapter: CH, section: S1, page: '196',
    title: 'Погрешность идеального приближения для криптона',
    note: SMALL + String.raw`Постоянных Ван-дер-Ваальса для криптона в таблицах книги нет; со справочными $a = 0{,}232$ Н·м⁴/моль², $b = 3{,}98\cdot10^{-5}$ м³/моль выходит 0,027 и 0,277 (в книге 0,0264 и 0,272).`,
    given: [[String.raw`\nu = 1\ \text{моль},\ T = 300\ \text{К}`, ''], [String.raw`1)\ V = 2\ \text{л};\ 2)\ V = 0{,}2\ \text{л}`, '']],
    find: String.raw`\varepsilon \;—\; ?`,
    formulas: [VDW],
    steps: [
      { title: 'Погрешность',
        tex: String.raw`\varepsilon = \frac{p_\text{ид} - p}{p},\qquad p_\text{ид} = \frac{RT}{V},\quad p = \frac{RT}{V - b} - \frac{a}{V^2}` },
      { title: '1) V = 2 л',
        tex: String.raw`p_\text{ид} = 1{,}247\ \text{МПа},\quad p = 1{,}272 - 0{,}058 = 1{,}214\ \text{МПа},\quad \varepsilon = 0{,}027` },
      { title: '2) V = 0,2 л',
        tex: String.raw`p_\text{ид} = 12{,}5\ \text{МПа},\quad p = 15{,}6 - 5{,}8 = 9{,}77\ \text{МПа},\quad \varepsilon = 0{,}28` },
      { title: 'Вывод',
        text: 'При сильном сжатии уравнение идеального газа ошибается почти на треть.' },
    ],
    answer: [String.raw`1)\ \varepsilon = 0{,}027;\quad 2)\ \varepsilon = 0{,}28`],
  },

  /* ===================== 12.5 ===================== */
  {
    id: '12.5', chapter: CH, section: S1, page: '196',
    title: 'Нагретый баллон с водой',
    note: TYPO + String.raw`Во втором слагаемом формулы книги $\frac{\rho^2a}{4M}$ потерян квадрат: должно быть $\frac{\rho^2a}{4M^2}$. Число 544 МПа верное.`,
    given: [[String.raw`\text{вода занимает половину баллона}`, ''], [String.raw`T = 650\ \text{К}`, ''], [String.raw`a = 0{,}545,\ b = 3{,}04\cdot10^{-5}`, '']],
    find: String.raw`p \;—\; ?`,
    formulas: [VDW],
    steps: [
      { title: 'Молярный объём пара',
        text: 'Вода, испарившись, заполняет вдвое больший объём:',
        tex: String.raw`V_m = \frac{2M}{\rho} = \frac{2\cdot0{,}018}{1000} = 3{,}6\cdot10^{-5}\ \text{м}^3\text{/моль}` },
      { title: 'Давление',
        tex: String.raw`p = \frac{RT}{V_m - b} - \frac{a}{V_m^2} = \frac{5402}{5{,}6\cdot10^{-6}} - \frac{0{,}545}{1{,}296\cdot10^{-9}} = 965 - 421 = 544\ \text{МПа}` },
    ],
    answer: [String.raw`p = \frac{\rho RT}{2M - \rho b} - \frac{\rho^2a}{4M^2} = 544\ \text{МПа}`],
  },

  /* ===================== 12.6 ===================== */
  {
    id: '12.6', chapter: CH, section: S1, page: '196',
    title: 'Температура плотного кислорода',
    note: SMALL + String.raw`В книге 287 К; подстановка в ту же формулу даёт 289 К.`,
    given: [[String.raw`p = 7\ \text{МПа}`, ''], [String.raw`\rho = 100\ \text{кг/м}^3`, '']],
    find: String.raw`T \;—\; ?`,
    formulas: [VDW],
    steps: [
      { title: 'Молярный объём',
        tex: String.raw`V_m = \frac M\rho = 3{,}2\cdot10^{-4}\ \text{м}^3\text{/моль}` },
      { title: 'Температура',
        tex: String.raw`T = \frac{1}{R}\left(p + \frac{a}{V_m^2}\right)(V_m - b) = \frac{(7 + 1{,}33)\cdot10^6\cdot2{,}88\cdot10^{-4}}{8{,}31} = 289\ \text{К}` },
    ],
    answer: [String.raw`T = 289\ \text{К}`],
  },

  /* ===================== 12.7 ===================== */
  {
    id: '12.7', chapter: CH, section: S1, page: '196',
    title: 'Водяной пар в трёх объёмах',
    note: MISMATCH + String.raw`Случай 1 совпадает. В случаях 2 и 3 в книге 3,94 и 101 МПа, а подстановка в уравнение Ван-дер-Ваальса с $a = 0{,}545$, $b = 3{,}04\cdot10^{-5}$ (табл. 13) даёт 4,29 и 143 МПа. Ответы книги не получаются ни при каких одинаковых $a$ и $b$ для обоих случаев.`,
    given: [[String.raw`m = 1\ \text{кг}\ (\nu = 55{,}6\ \text{моль})`, ''], [String.raw`T = 380\ \text{К}`, ''], [String.raw`V = 1000;\ 10;\ 2\ \text{л}`, '']],
    find: String.raw`p \;—\; ?`,
    formulas: [VDW],
    steps: [
      { title: 'Величины',
        tex: String.raw`\nu RT = 175{,}4\ \text{кДж},\qquad \nu b = 1{,}69\cdot10^{-3}\ \text{м}^3,\qquad \nu^2a = 1682\ \text{Па·м}^6` },
      { title: '1) V = 1 м³',
        tex: String.raw`p = \frac{175\,400}{0{,}9983} - 1682 = 174\ \text{кПа}` },
      { title: '2) V = 10 л',
        tex: String.raw`p = \frac{175\,400}{8{,}31\cdot10^{-3}} - \frac{1682}{10^{-4}} = 21{,}1 - 16{,}8 = 4{,}29\ \text{МПа}` },
      { title: '3) V = 2 л',
        text: 'Объём лишь немного больше «собственного» νb — давление резко растёт.',
        tex: String.raw`p = \frac{175\,400}{3{,}11\cdot10^{-4}} - \frac{1682}{4\cdot10^{-6}} = 564 - 421 = 143\ \text{МПа}` },
    ],
    answer: [String.raw`1)\ 174\ \text{кПа};\quad 2)\ 4{,}29\ \text{МПа};\quad 3)\ 143\ \text{МПа}`],
  },

  /* ===================== 12.8 ===================== */
  {
    id: '12.8', chapter: CH, section: S2, page: '196',
    title: 'Постоянные a и b для азота',
    given: [[String.raw`T_\text{кр} = 126\ \text{К}`, ''], [String.raw`p_\text{кр} = 3{,}39\ \text{МПа}`, '']],
    find: String.raw`a,\ b \;—\; ?`,
    formulas: [CRIT],
    steps: [
      { title: 'Обращаем формулы',
        text: String.raw`Из $p_\text{кр} = \frac{a}{27b^2}$ и $T_\text{кр} = \frac{8a}{27Rb}$:`,
        tex: String.raw`b = \frac{RT_\text{кр}}{8p_\text{кр}} = 3{,}86\cdot10^{-5}\ \frac{\text{м}^3}{\text{моль}},\qquad a = \frac{27}{64}\frac{R^2T_\text{кр}^2}{p_\text{кр}} = 0{,}136\ \frac{\text{Н·м}^4}{\text{моль}^2}` },
    ],
    answer: [String.raw`a = 0{,}136\ \text{Н·м}^4\text{/моль}^2;\quad b = 3{,}86\cdot10^{-5}\ \text{м}^3\text{/моль}`],
  },

  /* ===================== 12.9 ===================== */
  {
    id: '12.9', chapter: CH, section: S2, page: '196',
    title: 'Критические параметры кислорода и воды',
    note: MISMATCH + String.raw`По постоянным $a$, $b$ из табл. 13 выходит: кислород — 153 К и 5,01 МПа; вода — 639 К и 21,8 МПа. В книге для воды 654 К и 22,6 МПа, причём в задаче 12.14 книга сама получает для воды $p_\text{кр} = 21{,}8$ МПа. Опытные значения (табл. 13): 155 К, 5,08 МПа и 647 К, 22,1 МПа — уравнение Ван-дер-Ваальса даёт их лишь приближённо.`,
    given: [[String.raw`\text{O}_2:\ a = 0{,}136,\ b = 3{,}17\cdot10^{-5}`, ''], [String.raw`\text{H}_2\text{O}:\ a = 0{,}545,\ b = 3{,}04\cdot10^{-5}`, '']],
    find: String.raw`T_\text{кр},\ p_\text{кр} \;—\; ?`,
    formulas: [CRIT],
    steps: [
      { title: '1) Кислород',
        tex: String.raw`T_\text{кр} = \frac{8\cdot0{,}136}{27\cdot8{,}31\cdot3{,}17\cdot10^{-5}} = 153\ \text{К},\qquad p_\text{кр} = \frac{0{,}136}{27\cdot(3{,}17\cdot10^{-5})^2} = 5{,}01\ \text{МПа}` },
      { title: '2) Вода',
        tex: String.raw`T_\text{кр} = \frac{8\cdot0{,}545}{27\cdot8{,}31\cdot3{,}04\cdot10^{-5}} = 639\ \text{К},\qquad p_\text{кр} = \frac{0{,}545}{27\cdot(3{,}04\cdot10^{-5})^2} = 21{,}8\ \text{МПа}` },
    ],
    answer: [String.raw`1)\ 153\ \text{К},\ 5{,}01\ \text{МПа};\quad 2)\ 639\ \text{К},\ 21{,}8\ \text{МПа}`],
  },

  /* ===================== 12.10 ===================== */
  {
    id: '12.10', chapter: CH, section: S2, page: '196',
    title: 'Критический молярный объём аргона',
    given: [[String.raw`T_\text{кр} = 151\ \text{К}`, ''], [String.raw`p_\text{кр} = 4{,}86\ \text{МПа}`, '']],
    find: String.raw`V_{m\,\text{кр}} \;—\; ?`,
    formulas: [CRIT],
    steps: [
      { title: 'V = 3b, b = RT/(8p)',
        tex: String.raw`V_{m\,\text{кр}} = \frac38\frac{RT_\text{кр}}{p_\text{кр}} = \frac{3\cdot8{,}31\cdot151}{8\cdot4{,}86\cdot10^6} = 96{,}8\ \text{см}^3\text{/моль}` },
    ],
    answer: [String.raw`V_{m\,\text{кр}} = 96{,}8\ \text{см}^3\text{/моль}`],
  },

  /* ===================== 12.11 ===================== */
  {
    id: '12.11', chapter: CH, section: S2, page: '196',
    title: 'Пентан в запаянной колбе',
    given: [[String.raw`\rho = 626\ \text{кг/м}^3`, ''], [String.raw`b = 14{,}5\cdot10^{-5}\ \text{м}^3\text{/моль}`, ''], [String.raw`M = 72\cdot10^{-3}\ \text{кг/моль}`, '']],
    find: String.raw`\varepsilon \;—\; ?`,
    formulas: [CRIT],
    steps: [
      { title: 'Условие наблюдения',
        text: 'Критическая точка проходится, если при нагревании весь пентан окажется в колбе при критической плотности: объём колбы равен критическому объёму ν·3b.' },
      { title: 'Доля объёма',
        tex: String.raw`\varepsilon = \frac{m/\rho}{3b\nu} = \frac{M}{3b\rho} = \frac{0{,}072}{3\cdot14{,}5\cdot10^{-5}\cdot626} = 0{,}264` },
    ],
    answer: [String.raw`\varepsilon = 0{,}264`],
  },

  /* ===================== 12.12 ===================== */
  {
    id: '12.12', chapter: CH, section: S2, page: '196',
    title: 'Наибольший объём жидкой воды',
    given: [[String.raw`\nu = 1\ \text{моль}`, ''], [String.raw`b = 3{,}04\cdot10^{-5}\ \text{м}^3\text{/моль}`, '']],
    find: String.raw`V_{\max} \;—\; ?`,
    formulas: [CRIT],
    steps: [
      { title: 'Жидкость не может быть «реже» критической',
        tex: String.raw`V_{\max} = 3b\nu = 9{,}12\cdot10^{-5}\ \text{м}^3 = 91{,}2\ \text{см}^3` },
    ],
    answer: [String.raw`V_{\max} = 91{,}2\ \text{см}^3`],
  },

  /* ===================== 12.13 ===================== */
  {
    id: '12.13', chapter: CH, section: S2, page: '196',
    title: 'Плотность пара в критическом состоянии',
    given: [[String.raw`b = 3{,}04\cdot10^{-5}\ \text{м}^3\text{/моль}`, '']],
    find: String.raw`\rho_\text{кр} \;—\; ?`,
    formulas: [CRIT],
    steps: [
      { title: 'Плотность',
        tex: String.raw`\rho_\text{кр} = \frac{M}{3b} = \frac{0{,}018}{9{,}12\cdot10^{-5}} = 197\ \text{кг/м}^3` },
    ],
    answer: [String.raw`\rho_\text{кр} = 197\ \text{кг/м}^3`],
  },

  /* ===================== 12.14 ===================== */
  {
    id: '12.14', chapter: CH, section: S2, page: '196',
    title: 'Наибольшее давление насыщенного пара воды',
    given: [[String.raw`a = 0{,}545,\ b = 3{,}04\cdot10^{-5}`, '']],
    find: String.raw`p_{\max} \;—\; ?`,
    formulas: [CRIT],
    steps: [
      { title: 'Выше критической точки пар не насыщается',
        tex: String.raw`p_{\max} = p_\text{кр} = \frac{a}{27b^2} = 21{,}8\ \text{МПа}` },
    ],
    answer: [String.raw`p_{\max} = 21{,}8\ \text{МПа}`],
  },

  /* ===================== 12.15 ===================== */
  {
    id: '12.15', chapter: CH, section: S2, page: '196',
    title: 'Концентрация азота в критическом состоянии',
    given: [[String.raw`b = 3{,}86\cdot10^{-5}\ \text{м}^3\text{/моль}`, ''], [String.raw`n_0 = \frac{p_0}{kT_0} = 2{,}69\cdot10^{25}\ \text{м}^{-3}`, '']],
    find: String.raw`n_\text{кр}/n_0 \;—\; ?`,
    formulas: [CRIT],
    steps: [
      { title: 'Критическая концентрация',
        tex: String.raw`n_\text{кр} = \frac{N_\text{A}}{3b} = \frac{6{,}02\cdot10^{23}}{1{,}158\cdot10^{-4}} = 5{,}20\cdot10^{27}\ \text{м}^{-3}` },
      { title: 'Отношение',
        tex: String.raw`\frac{n_\text{кр}}{n_0} = 193` },
    ],
    answer: [String.raw`\text{в 193 раза}`],
  },

  /* ===================== 12.16 ===================== */
  {
    id: '12.16', chapter: CH, section: S2, page: '196',
    title: 'Критический объём кислорода и воды',
    note: SMALL + String.raw`Для кислорода в книге 1,45 см³; $3b\nu = 3\cdot3{,}17\cdot10^{-5}\cdot\frac{0{,}5}{32}$ м³ $= 1{,}49$ см³.`,
    given: [[String.raw`\text{O}_2:\ m = 0{,}5\ \text{г}`, ''], [String.raw`\text{H}_2\text{O}:\ m = 1\ \text{г}`, '']],
    find: String.raw`V_\text{кр} \;—\; ?`,
    formulas: [CRIT],
    steps: [
      { title: 'V = 3bν',
        tex: String.raw`V_{\text{O}_2} = 3\cdot3{,}17\cdot10^{-5}\cdot0{,}0156 = 1{,}49\ \text{см}^3,\qquad V_{\text{H}_2\text{O}} = 3\cdot3{,}04\cdot10^{-5}\cdot0{,}0556 = 5{,}07\ \text{см}^3` },
    ],
    answer: [String.raw`1)\ 1{,}49\ \text{см}^3;\quad 2)\ 5{,}1\ \text{см}^3`],
  },

  /* ===================== 12.17 ===================== */
  {
    id: '12.17', chapter: CH, section: S2, page: '197',
    title: 'Газ при T_кр и тройном объёме',
    given: [[String.raw`\tau = 1,\ \varphi = 3`, '']],
    find: String.raw`p_\text{кр}/p \;—\; ?`,
    formulas: [REDUCED],
    steps: [
      { title: 'Приведённое уравнение',
        tex: String.raw`\left(\pi + \frac39\right)\cdot8 = 8 \;\Rightarrow\; \pi = \frac23,\qquad \frac{p_\text{кр}}{p} = 1{,}5` },
    ],
    answer: [String.raw`\text{в 1,5 раза меньше}`],
  },

  /* ===================== 12.18 ===================== */
  {
    id: '12.18', chapter: CH, section: S2, page: '197',
    title: 'Температура оксида азота',
    given: [[String.raw`\pi = \varphi = 3`, ''], [String.raw`T_\text{кр} = 180\ \text{К}`, '']],
    find: String.raw`T \;—\; ?`,
    formulas: [REDUCED],
    steps: [
      { title: 'Приведённое уравнение',
        tex: String.raw`\left(3 + \frac39\right)(9 - 1) = 8\tau \;\Rightarrow\; \tau = \frac{10}{3},\qquad T = 600\ \text{К}` },
    ],
    answer: [String.raw`T = \tfrac{10}{3}T_\text{кр} = 600\ \text{К}`],
  },

  /* ===================== 12.19 ===================== */
  {
    id: '12.19', chapter: CH, section: S2, page: '197',
    title: 'Удвоили T и V',
    given: [[String.raw`\tau = \varphi = 2`, '']],
    find: String.raw`p/p_\text{кр} \;—\; ?`,
    formulas: [REDUCED],
    steps: [
      { title: 'Приведённое уравнение',
        tex: String.raw`\left(\pi + \frac34\right)\cdot5 = 16 \;\Rightarrow\; \pi = 2{,}45` },
    ],
    answer: [String.raw`\text{увеличится в 2,45 раза}`],
  },

  /* ===================== 12.20 ===================== */
  {
    id: '12.20', chapter: CH, section: S2, page: '197',
    title: 'Удвоили T при постоянном объёме',
    given: [[String.raw`\tau = 2,\ \varphi = 1`, '']],
    find: String.raw`p/p_\text{кр} \;—\; ?`,
    formulas: [REDUCED],
    steps: [
      { title: 'Приведённое уравнение',
        text: 'Для идеального газа давление выросло бы вдвое, а здесь — впятеро.',
        tex: String.raw`(\pi + 3)\cdot2 = 16 \;\Rightarrow\; \pi = 5` },
    ],
    answer: [String.raw`\text{в 5 раз}`],
  },

  /* ===================== 12.21 ===================== */
  {
    id: '12.21', chapter: CH, section: S3, page: '197',
    title: 'Внутренняя энергия азота при T_кр',
    given: [[String.raw`\nu = 1\ \text{моль},\ T = 126\ \text{К}`, ''], [String.raw`a = 0{,}135,\ C_V = \tfrac52R`, '']],
    find: String.raw`U \;—\; ?`,
    formulas: [UREAL, CRIT],
    steps: [
      { title: 'Кинетическая часть',
        tex: String.raw`C_VT = 20{,}8\cdot126 = 2618\ \text{Дж}` },
      { title: 'Поправка a/V',
        text: 'V_кр = 3b = 0,116 л.',
        tex: String.raw`\begin{aligned} &20\ \text{л}:\ 2618 - 7 = 2{,}61\ \text{кДж} \\ &2\ \text{л}:\ 2618 - 68 = 2{,}55\ \text{кДж} \\ &0{,}2\ \text{л}:\ 2618 - 675 = 1{,}94\ \text{кДж} \\ &V_\text{кр}:\ 2618 - 1166 = 1{,}45\ \text{кДж} \end{aligned}` },
    ],
    answer: [String.raw`1)\ 2{,}61;\quad 2)\ 2{,}55;\quad 3)\ 1{,}94;\quad 4)\ 1{,}45\ \text{кДж}`],
  },

  /* ===================== 12.22 ===================== */
  {
    id: '12.22', chapter: CH, section: S3, page: '197',
    title: 'Погрешность U идеального газа',
    given: [[String.raw`\nu = 1\ \text{моль},\ T = 350\ \text{К}`, ''], [String.raw`a = 0{,}136`, '']],
    find: String.raw`\varepsilon \;—\; ?`,
    formulas: [UREAL],
    steps: [
      { title: 'Погрешность',
        tex: String.raw`\varepsilon = \frac{U_\text{ид} - U}{U} = \frac{a/V}{C_VT - a/V},\qquad C_VT = 7271\ \text{Дж}` },
      { title: 'Числа',
        tex: String.raw`V = 2\ \text{л}:\ \varepsilon = \frac{68}{7203} = 9{,}44\cdot10^{-3};\qquad V = 0{,}2\ \text{л}:\ \varepsilon = \frac{680}{6591} = 0{,}103` },
    ],
    answer: [String.raw`1)\ 9{,}44\cdot10^{-3};\quad 2)\ 0{,}103`],
  },

  /* ===================== 12.23 ===================== */
  {
    id: '12.23', chapter: CH, section: S3, page: '197',
    title: 'U углекислого газа при атмосферном давлении',
    note: MISMATCH + String.raw`В книге для реального газа 9,2 кДж. При атмосферном давлении газ сильно разрежен ($V = 74$ л), и поправка $\nu^2a/V$ всего 44 Дж — $U = 22{,}4$ кДж практически как у идеального газа. Число книги получить нельзя.`,
    given: [[String.raw`m = 132\ \text{г}\ (\nu = 3\ \text{моль})`, ''], [String.raw`p_0 = 101{,}3\ \text{кПа},\ T = 300\ \text{К}`, ''], [String.raw`i = 6`, '']],
    find: String.raw`U_\text{ид},\ U \;—\; ?`,
    formulas: [UREAL],
    steps: [
      { title: '1) Идеальный газ',
        tex: String.raw`U = \nu\cdot3RT = 3\cdot3\cdot8{,}31\cdot300 = 22{,}4\ \text{кДж}` },
      { title: '2) Реальный газ',
        text: 'Объём при этих условиях V ≈ νRT/p = 0,074 м³.',
        tex: String.raw`U = 22\,437 - \frac{9\cdot0{,}361}{0{,}074} = 22\,437 - 44 = 22{,}4\ \text{кДж}` },
    ],
    answer: [String.raw`1)\ 22{,}4\ \text{кДж};\quad 2)\ 22{,}4\ \text{кДж}\ (\text{поправка 44 Дж})`],
  },

  /* ===================== 12.24 ===================== */
  {
    id: '12.24', chapter: CH, section: S3, page: '197',
    title: 'Сильно сжатый кислород',
    given: [[String.raw`m = 8\ \text{г}\ (0{,}25\ \text{моль})`, ''], [String.raw`V = 20\ \text{см}^3`, ''], [String.raw`T = 300\ \text{К}`, '']],
    find: String.raw`U \;—\; ?`,
    formulas: [UREAL],
    steps: [
      { title: 'Внутренняя энергия',
        tex: String.raw`U = \nu C_VT - \frac{\nu^2a}{V} = 0{,}25\cdot20{,}8\cdot300 - \frac{0{,}0625\cdot0{,}136}{2\cdot10^{-5}} = 1558 - 425 = 1{,}13\ \text{кДж}` },
    ],
    answer: [String.raw`U = 1{,}13\ \text{кДж}`],
  },

  /* ===================== 12.25 ===================== */
  {
    id: '12.25', chapter: CH, section: S3, page: '197',
    title: 'Изотермическое расширение неона',
    given: [[String.raw`\nu = 1\ \text{моль}`, ''], [String.raw`V_1 = 1\ \text{л},\ V_2 = 2\ \text{л}`, ''], [String.raw`a = 0{,}209\ (\text{табл. 13})`, '']],
    find: String.raw`\Delta U \;—\; ?`,
    formulas: [UREAL],
    steps: [
      { title: 'Меняется только поправка',
        tex: String.raw`\Delta U = a\left(\frac{1}{V_1} - \frac{1}{V_2}\right) = 0{,}209\cdot500 = 104\ \text{Дж}` },
      { title: 'Замечание',
        text: 'В табл. 13 книги для неона a = 0,209; в справочниках — 0,021 Н·м⁴/моль² (тогда ΔU ≈ 10 Дж). Ответ дан по таблице книги.' },
    ],
    answer: [String.raw`\Delta U = 104\ \text{Дж}`],
  },

  /* ===================== 12.26 ===================== */
  {
    id: '12.26', chapter: CH, section: S3, page: '197',
    title: 'Работа сил притяжения молекул CO₂',
    note: SMALL + String.raw`В книге 1,65 Дж; $\left(\frac{0{,}1}{0{,}044}\right)^2\cdot0{,}361\cdot0{,}9 = 1{,}68$ Дж.`,
    given: [[String.raw`m = 0{,}1\ \text{кг}`, ''], [String.raw`V_1 = 1\ \text{м}^3,\ V_2 = 10\ \text{м}^3`, '']],
    find: String.raw`A \;—\; ?`,
    formulas: [UREAL],
    steps: [
      { title: 'Работа внутренних сил',
        text: 'Силы притяжения при расширении совершают отрицательную работу; её модуль — изменение «потенциальной» части энергии:',
        tex: String.raw`|A| = \left(\frac mM\right)^2a\left(\frac{1}{V_1} - \frac{1}{V_2}\right) = 5{,}17\cdot0{,}361\cdot0{,}9 = 1{,}68\ \text{Дж}` },
    ],
    answer: [String.raw`|A| = 1{,}68\ \text{Дж}`],
  },

  /* ===================== 12.27 ===================== */
  {
    id: '12.27', chapter: CH, section: S3, page: '198',
    title: 'Охлаждение азота при расширении в пустоту',
    note: MISMATCH + String.raw`В книге $-20{,}9$ К, а формула книги даёт $-\frac{0{,}357\cdot0{,}135}{20{,}8}\cdot900 = -2{,}09$ К — ошибка в 10 раз.`,
    given: [[String.raw`m = 10\ \text{г}\ (0{,}357\ \text{моль})`, ''], [String.raw`V_1 = 1\ \text{л},\ V_2 = 10\ \text{л}`, '']],
    find: String.raw`\Delta T \;—\; ?`,
    formulas: [UREAL],
    steps: [
      { title: 'U сохраняется',
        text: 'При расширении в пустоту газ не совершает работы и не получает теплоты: U = const.',
        tex: String.raw`\nu C_V\Delta T = \nu^2a\left(\frac{1}{V_2} - \frac{1}{V_1}\right)` },
      { title: 'Охлаждение',
        tex: String.raw`\Delta T = -\frac{\nu a}{C_V}\left(\frac{1}{V_1} - \frac{1}{V_2}\right) = -\frac{0{,}357\cdot0{,}135\cdot900}{20{,}8} = -2{,}09\ \text{К}` },
    ],
    answer: [String.raw`\Delta T = -2{,}09\ \text{К}`],
  },

  /* ===================== 12.28 ===================== */
  {
    id: '12.28', chapter: CH, section: S3, page: '198',
    title: 'Теплота для изотермического расширения хлора в пустоту',
    given: [[String.raw`m = 7{,}1\ \text{г}\ (0{,}1\ \text{моль})`, ''], [String.raw`V_1 = 0{,}1\ \text{л},\ V_2 = 1\ \text{л}`, '']],
    find: String.raw`Q \;—\; ?`,
    formulas: [UREAL],
    steps: [
      { title: 'Q = ΔU (работы нет)',
        tex: String.raw`Q = \nu^2a\left(\frac{1}{V_1} - \frac{1}{V_2}\right) = 0{,}01\cdot0{,}65\cdot9000 = 58{,}5\ \text{Дж}` },
    ],
    answer: [String.raw`Q = 58{,}5\ \text{Дж}`],
  },

  /* ===================== 12.29 ===================== */
  {
    id: '12.29', chapter: CH, section: S4, page: '198',
    title: 'Поверхностное натяжение спирта по каплям',
    given: [[String.raw`m_{100} = 0{,}71\ \text{г}`, ''], [String.raw`d = 1\ \text{мм}`, '']],
    find: String.raw`\sigma \;—\; ?`,
    formulas: [SURF],
    steps: [
      { title: 'Отрыв капли',
        text: 'В момент отрыва вес капли равен силе натяжения по окружности шейки.',
        tex: String.raw`\frac{m}{100}g = \sigma\pi d \;\Rightarrow\; \sigma = \frac{7{,}1\cdot10^{-6}\cdot9{,}81}{3{,}14\cdot10^{-3}} = 22{,}2\ \text{мН/м}` },
    ],
    answer: [String.raw`\sigma = 22{,}2\ \text{мН/м}`],
  },

  /* ===================== 12.30 ===================== */
  {
    id: '12.30', chapter: CH, section: S4, page: '198',
    title: 'Капля на конце трубки',
    note: SIGMA72 + 'С σ = 73 мН/м диаметр 4,47 мм, в книге 4,4 мм.',
    given: [[String.raw`d_1 = 0{,}2\ \text{см}`, String.raw`2\cdot10^{-3}\ \text{м}`], [String.raw`\sigma = 73\ \text{мН/м}`, '']],
    find: String.raw`d_2 \;—\; ?`,
    formulas: [SURF],
    steps: [
      { title: 'Вес шарика = сила натяжения',
        tex: String.raw`\frac{\pi d_2^3}{6}\rho g = \sigma\pi d_1 \;\Rightarrow\; d_2 = \sqrt[3]{\frac{6\sigma d_1}{\rho g}} = \sqrt[3]{\frac{6\cdot0{,}073\cdot0{,}002}{9810}} = 4{,}47\ \text{мм}` },
    ],
    answer: [String.raw`d_2 = 4{,}5\ \text{мм}`],
  },

  /* ===================== 12.31 ===================== */
  {
    id: '12.31', chapter: CH, section: S4, page: '198',
    title: 'Работа выдувания мыльного пузыря',
    given: [[String.raw`d_1 = 1\ \text{см},\ d_2 = 11\ \text{см}`, ''], [String.raw`\sigma = 40\ \text{мН/м}`, '']],
    find: String.raw`A \;—\; ?`,
    formulas: [SURF],
    steps: [
      { title: 'У плёнки две поверхности',
        tex: String.raw`A = \sigma\cdot2\Delta S = 2\sigma\pi(d_2^2 - d_1^2) = 2\cdot0{,}04\cdot3{,}14\cdot0{,}012 = 3\ \text{мДж}` },
    ],
    answer: [String.raw`A = 3\ \text{мДж}`],
  },

  /* ===================== 12.32 ===================== */
  {
    id: '12.32', chapter: CH, section: S4, page: '198',
    title: 'Слияние двух капель ртути',
    note: MISMATCH + String.raw`В книге 0,648 мкДж — так выходит при радиусе капель 0,5 мм (в условии радиус 1 мм). При $r = 1$ мм выделяется 2,59 мкДж.`,
    given: [[String.raw`r = 1\ \text{мм}`, ''], [String.raw`\sigma = 0{,}5\ \text{Н/м}`, '']],
    find: String.raw`E \;—\; ?`,
    formulas: [SURF],
    steps: [
      { title: 'Радиус большой капли',
        tex: String.raw`\frac43\pi R^3 = 2\cdot\frac43\pi r^3 \;\Rightarrow\; R = \sqrt[3]2\,r` },
      { title: 'Уменьшение поверхности',
        tex: String.raw`\Delta S = 2\cdot4\pi r^2 - 4\pi R^2 = 4\pi r^2(2 - 2^{2/3}) = 5{,}18\cdot10^{-6}\ \text{м}^2` },
      { title: 'Энергия',
        tex: String.raw`E = \sigma\Delta S = 0{,}5\cdot5{,}18\cdot10^{-6} = 2{,}59\ \text{мкДж}` },
    ],
    answer: [String.raw`E = 2{,}59\ \text{мкДж}`],
  },

  /* ===================== 12.33 ===================== */
  {
    id: '12.33', chapter: CH, section: S4, page: '198',
    title: 'Воздух в маленьком пузырьке',
    given: [[String.raw`d = 2\ \text{мкм}`, String.raw`r = 10^{-6}\ \text{м}`], [String.raw`\sigma = 73\ \text{мН/м}`, ''], [String.raw`\text{н. у.}`, '']],
    find: String.raw`\rho \;—\; ?`,
    formulas: [LAPLACE],
    steps: [
      { title: 'Давление в пузырьке',
        tex: String.raw`p = p_0 + \frac{2\sigma}{r} = 101{,}3 + 146 = 247\ \text{кПа}` },
      { title: 'Плотность воздуха',
        tex: String.raw`\rho = \frac{pM}{RT} = \frac{247\,000\cdot0{,}029}{8{,}31\cdot273} = 3{,}2\ \text{кг/м}^3` },
    ],
    answer: [String.raw`\rho = 3{,}2\ \text{кг/м}^3`],
  },

  /* ===================== 12.34 ===================== */
  {
    id: '12.34', chapter: CH, section: S4, page: '198',
    title: 'Давление в мыльном пузыре',
    note: SMALL + String.raw`В книге 62,5 Па; с $\sigma = 40$ мН/м из табл. 15 выходит 64 Па.`,
    given: [[String.raw`d = 5\ \text{мм}`, ''], [String.raw`\sigma = 40\ \text{мН/м}`, '']],
    find: String.raw`\Delta p \;—\; ?`,
    formulas: [LAPLACE],
    steps: [
      { title: 'Две поверхности плёнки',
        tex: String.raw`\Delta p = 2\cdot\frac{2\sigma}{R} = \frac{8\sigma}{d} = \frac{8\cdot0{,}04}{0{,}005} = 64\ \text{Па}` },
    ],
    answer: [String.raw`\Delta p = 64\ \text{Па}`],
  },

  /* ===================== 12.35 ===================== */
  {
    id: '12.35', chapter: CH, section: S4, page: '198',
    title: 'Слипшиеся стеклянные пластинки',
    note: MISMATCH + String.raw`В книге 73 Н — так выходит при расстоянии 20 мкм. При $l = 22$ мкм радиус мениска 11 мкм и $F = 66$ Н.`,
    given: [[String.raw`S = 10\times10\ \text{см}^2`, String.raw`10^{-2}\ \text{м}^2`], [String.raw`l = 22\ \text{мкм}`, ''], [String.raw`\sigma = 73\ \text{мН/м}`, '']],
    find: String.raw`F \;—\; ?`,
    formulas: [LAPLACE],
    steps: [
      { title: 'Пониженное давление в воде',
        text: 'Мениск по краю — вогнутый полуцилиндр радиусом r = l/2 (вторая кривизна нулевая).',
        tex: String.raw`\Delta p = \frac{\sigma}{r} = \frac{0{,}073}{1{,}1\cdot10^{-5}} = 6{,}6\ \text{кПа}` },
      { title: 'Сила',
        tex: String.raw`F = \Delta pS = 6636\cdot0{,}01 = 66\ \text{Н}` },
    ],
    answer: [String.raw`F = 66\ \text{Н}`],
  },

  /* ===================== 12.36 ===================== */
  {
    id: '12.36', chapter: CH, section: S4, page: '198',
    title: 'Слипшиеся покровные стёкла',
    note: SIGMA72 + 'С σ = 73 мН/м выходит 59,0 мН, в книге 58,2 мН.',
    given: [[String.raw`d = 16\ \text{мм}`, ''], [String.raw`m = 0{,}1\ \text{г}`, ''], [String.raw`\sigma = 73\ \text{мН/м}`, '']],
    find: String.raw`F \;—\; ?`,
    formulas: [LAPLACE],
    steps: [
      { title: 'Толщина слоя воды',
        tex: String.raw`S = \frac{\pi d^2}{4} = 2{,}01\cdot10^{-4}\ \text{м}^2,\qquad h = \frac{m}{\rho S} = 0{,}497\ \text{мм},\qquad r = \frac h2 = 0{,}249\ \text{мм}` },
      { title: 'Сила',
        text: 'Большой радиус кривизны (8 мм) много больше малого — его вклад не учитываем.',
        tex: String.raw`F = \frac{\sigma}{r}S = \frac{0{,}073}{2{,}49\cdot10^{-4}}\cdot2{,}01\cdot10^{-4} = 59\ \text{мН}` },
    ],
    answer: [String.raw`F = 59\ \text{мН}`],
  },

  /* ===================== 12.37 ===================== */
  {
    id: '12.37', chapter: CH, section: S4, page: '198',
    title: 'Глицерин в капилляре',
    given: [[String.raw`h = 20\ \text{мм}`, ''], [String.raw`d = 1\ \text{мм}`, ''], [String.raw`\rho = 1260\ \text{кг/м}^3`, '']],
    find: String.raw`\sigma \;—\; ?`,
    formulas: [CAPIL],
    steps: [
      { title: 'Из формулы подъёма',
        tex: String.raw`\sigma = \frac{\rho ghd}{4} = \frac{1260\cdot9{,}81\cdot0{,}02\cdot0{,}001}{4} = 62\ \text{мН/м}` },
    ],
    answer: [String.raw`\sigma = 62\ \text{мН/м}`],
  },

  /* ===================== 12.38 ===================== */
  {
    id: '12.38', chapter: CH, section: S4, page: '199',
    title: 'Поправка ртутного барометра',
    given: [[String.raw`d = 5\ \text{мм}`, ''], [String.raw`\sigma = 0{,}5\ \text{Н/м}`, '']],
    find: String.raw`\Delta p \;—\; ?`,
    formulas: [LAPLACE, CAPIL],
    steps: [
      { title: 'Ртуть не смачивает стекло',
        text: 'Выпуклый мениск опускает столбик — барометр показывает меньше. Поправку прибавляют.',
        tex: String.raw`\Delta p = \rho gh = \frac{2\sigma}{r} = \frac{2\cdot0{,}5}{0{,}0025} = +400\ \text{Па}` },
    ],
    answer: [String.raw`\Delta p = +400\ \text{Па}`],
  },

  /* ===================== 12.39 ===================== */
  {
    id: '12.39', chapter: CH, section: S4, page: '199',
    title: 'U-трубка с разными коленами',
    given: [[String.raw`\Delta h = 23\ \text{мм}`, ''], [String.raw`d_1 = 2\ \text{мм},\ d_2 = 0{,}4\ \text{мм}`, ''], [String.raw`\rho = 800\ \text{кг/м}^3`, '']],
    find: String.raw`\sigma \;—\; ?`,
    formulas: [CAPIL],
    steps: [
      { title: 'Разность подъёмов',
        tex: String.raw`\Delta h = \frac{2\sigma}{\rho g}\left(\frac{1}{r_2} - \frac{1}{r_1}\right) \;\Rightarrow\; \sigma = \frac{\rho g\Delta h}{2\left(\frac{1}{r_2} - \frac{1}{r_1}\right)} = \frac{800\cdot9{,}81\cdot0{,}023}{2\cdot4000} = 22{,}6\ \text{мН/м}` },
    ],
    answer: [String.raw`\sigma = 22{,}6\ \text{мН/м}`],
  },

  /* ===================== 12.40 ===================== */
  {
    id: '12.40', chapter: CH, section: S4, page: '199',
    title: 'Две капиллярные трубки',
    note: SMALL + String.raw`В книге 22 мН/м; подстановка даёт 22,8 мН/м.`,
    given: [[String.raw`d_1 = 0{,}05\ \text{см},\ d_2 = 0{,}1\ \text{см}`, ''], [String.raw`\Delta h = 11{,}6\ \text{мм}`, ''], [String.raw`\rho = 800\ \text{кг/м}^3`, '']],
    find: String.raw`\sigma \;—\; ?`,
    formulas: [CAPIL],
    steps: [
      { title: 'Как в задаче 12.39',
        tex: String.raw`\sigma = \frac{\rho g\Delta h}{2\left(\frac{1}{r_1} - \frac{1}{r_2}\right)} = \frac{800\cdot9{,}81\cdot0{,}0116}{2\cdot2000} = 22{,}8\ \text{мН/м}` },
    ],
    answer: [String.raw`\sigma = 22{,}8\ \text{мН/м}`],
  },

  /* ===================== 12.41 ===================== */
  {
    id: '12.41', chapter: CH, section: S4, page: '199',
    title: 'Масса воды в капилляре',
    note: SIGMA72 + 'С σ = 73 мН/м — 23,4 мг, в книге 23,1 мг.',
    given: [[String.raw`d = 1\ \text{мм}`, ''], [String.raw`\sigma = 73\ \text{мН/м}`, '']],
    find: String.raw`m \;—\; ?`,
    formulas: [CAPIL],
    steps: [
      { title: 'Вес столбика = сила натяжения',
        text: 'Радиус трубки в ответ входит только через периметр.',
        tex: String.raw`mg = 2\pi r\sigma \;\Rightarrow\; m = \frac{2\pi r\sigma}{g} = \frac{6{,}28\cdot5\cdot10^{-4}\cdot0{,}073}{9{,}81} = 23{,}4\ \text{мг}` },
    ],
    answer: [String.raw`m = 23{,}4\ \text{мг}`],
  },

  /* ===================== 12.42 ===================== */
  {
    id: '12.42', chapter: CH, section: S4, page: '199',
    title: 'Столбик воды с каплей внизу',
    note: SIGMA72 + 'С σ = 73 мН/м — 6,45 см, в книге 6,37 см.',
    given: [[String.raw`d = 0{,}5\ \text{мм}\ (r_1 = 0{,}25\ \text{мм})`, ''], [String.raw`R = 3\ \text{мм}`, ''], [String.raw`\sigma = 73\ \text{мН/м}`, '']],
    find: String.raw`h \;—\; ?`,
    formulas: [LAPLACE],
    steps: [
      { title: 'Давления на концах столбика',
        text: 'Сверху вогнутый мениск: давление в воде p₀ − 2σ/r₁. Внизу выпуклая капля: p₀ + 2σ/R. Разница — вес столба.',
        tex: String.raw`\rho gh = \frac{2\sigma}{r_1} + \frac{2\sigma}{R}` },
      { title: 'Высота',
        tex: String.raw`h = \frac{2\sigma}{\rho g}\left(\frac{1}{r_1} + \frac1R\right) = 1{,}49\cdot10^{-5}\cdot4333 = 6{,}45\ \text{см}` },
    ],
    answer: [String.raw`h = 6{,}45\ \text{см}`],
  },

  /* ===================== 12.43 ===================== */
  {
    id: '12.43', chapter: CH, section: S4, page: '199',
    title: 'Ртутный манометр с поправкой на капиллярность',
    note: '<b>Ответ зависит от того, к какому колену подключён газ.</b> ' + String.raw`Капиллярное опускание ртути в узком колене относительно широкого — 5,6 мм. Если газ подведён к широкому колену (ртуть поднимается в узком — обычная схема чашечного манометра), истинная разность уровней больше видимой: $p = 27{,}4$ кПа. Ответ книги 26 кПа — для газа в узком колене (поправку вычитают).`,
    given: [[String.raw`d_1 = 4\ \text{см},\ d_2 = 0{,}25\ \text{см}`, ''], [String.raw`\Delta h = 200\ \text{мм}`, ''], [String.raw`\sigma = 0{,}5\ \text{Н/м},\ \rho = 13{,}6\cdot10^3\ \text{кг/м}^3`, '']],
    find: String.raw`p \;—\; ?`,
    formulas: [CAPIL],
    steps: [
      { title: 'Капиллярное опускание',
        tex: String.raw`\delta h = \frac{2\sigma}{\rho g}\left(\frac{1}{r_2} - \frac{1}{r_1}\right) = 7{,}5\cdot10^{-6}\cdot750 = 5{,}6\ \text{мм}` },
      { title: 'Газ к широкому колену',
        tex: String.raw`p = \rho g(\Delta h + \delta h) = 13\,600\cdot9{,}81\cdot0{,}2056 = 27{,}4\ \text{кПа}` },
      { title: 'Газ к узкому колену (как в книге)',
        tex: String.raw`p = \rho g(\Delta h - \delta h) = 26\ \text{кПа}` },
    ],
    answer: [String.raw`p = 27{,}4\ \text{кПа}\ (\text{газ к широкому колену});\quad 26\ \text{кПа}\ (\text{к узкому})`],
  },

  /* ===================== 12.44 ===================== */
  {
    id: '12.44', chapter: CH, section: S4, page: '199',
    title: 'Вода между пластинками',
    note: SIGMA72 + 'С σ = 73 мН/м — 7,4 см, в книге 7,3 см.',
    given: [[String.raw`d = 0{,}2\ \text{мм}`, ''], [String.raw`\sigma = 73\ \text{мН/м}`, '']],
    find: String.raw`h \;—\; ?`,
    formulas: [{ tex: String.raw`h = \frac{2\sigma}{\rho gd}`, text: 'подъём между параллельными пластинами на расстоянии d' }],
    steps: [
      { title: 'Высота',
        text: 'Мениск — полуцилиндр радиусом d/2: давление σ/(d/2) = 2σ/d.',
        tex: String.raw`h = \frac{2\cdot0{,}073}{1000\cdot9{,}81\cdot2\cdot10^{-4}} = 7{,}4\ \text{см}` },
    ],
    answer: [String.raw`h = 7{,}4\ \text{см}`],
  },

  /* ===================== 12.45 ===================== */
  {
    id: '12.45', chapter: CH, section: S5, page: '199',
    title: 'Скорость в узкой части трубы',
    given: [[String.raw`v_1 = 20\ \text{см/с}`, ''], [String.raw`d_1/d_2 = 1{,}5`, '']],
    find: String.raw`v_2 \;—\; ?`,
    formulas: [CONT],
    steps: [
      { title: 'Неразрывность',
        tex: String.raw`v_2 = v_1\left(\frac{d_1}{d_2}\right)^2 = 0{,}2\cdot2{,}25 = 0{,}45\ \text{м/с}` },
    ],
    answer: [String.raw`v_2 = 0{,}45\ \text{м/с}`],
  },

  /* ===================== 12.46 ===================== */
  {
    id: '12.46', chapter: CH, section: S5, page: '199',
    title: 'Нефть в сужении трубы',
    given: [[String.raw`v_1 = 2\ \text{м/с}`, ''], [String.raw`\Delta p = 6{,}65\ \text{кПа}`, ''], [String.raw`\rho = 900\ \text{кг/м}^3`, '']],
    find: String.raw`v_2 \;—\; ?`,
    formulas: [BERN],
    steps: [
      { title: 'Бернулли на одной высоте',
        tex: String.raw`\Delta p = \frac\rho2(v_2^2 - v_1^2) \;\Rightarrow\; v_2 = \sqrt{v_1^2 + \frac{2\Delta p}{\rho}} = \sqrt{4 + 14{,}8} = 4{,}33\ \text{м/с}` },
    ],
    answer: [String.raw`v_2 = 4{,}33\ \text{м/с}`],
  },

  /* ===================== 12.47 ===================== */
  {
    id: '12.47', chapter: CH, section: S5, page: '199',
    title: 'Расходомер Вентури',
    given: [[String.raw`S_1 = 20\ \text{см}^2,\ S_2 = 12\ \text{см}^2`, ''], [String.raw`\Delta h = 8\ \text{см}`, '']],
    find: String.raw`Q_V \;—\; ?`,
    formulas: [CONT, BERN],
    steps: [
      { title: 'Разность давлений по манометрам',
        tex: String.raw`\rho g\Delta h = \frac\rho2(v_2^2 - v_1^2),\qquad v_2 = v_1\frac{S_1}{S_2}` },
      { title: 'Расход',
        tex: String.raw`Q_V = S_1S_2\sqrt{\frac{2g\Delta h}{S_1^2 - S_2^2}} = 2{,}4\cdot10^{-6}\sqrt{\frac{1{,}57}{2{,}56\cdot10^{-6}}} = 1{,}88\ \text{л/с}` },
    ],
    answer: [String.raw`Q_V = 1{,}88\ \text{л/с}`],
  },

  /* ===================== 12.48 ===================== */
  {
    id: '12.48', chapter: CH, section: S5, page: '199–200',
    title: 'Насос выталкивает воду',
    given: [[String.raw`d_1 = 20\ \text{см},\ v_1 = 1\ \text{м/с}`, ''], [String.raw`d_2 = 2\ \text{см}`, '']],
    find: String.raw`v_2,\ p \;—\; ?`,
    formulas: [CONT, BERN],
    steps: [
      { title: 'Скорость струи',
        tex: String.raw`v_2 = v_1\left(\frac{d_1}{d_2}\right)^2 = 100\ \text{м/с}` },
      { title: 'Избыточное давление',
        tex: String.raw`p = \frac\rho2(v_2^2 - v_1^2) = 500\cdot9999 = 5{,}0\ \text{МПа}` },
    ],
    answer: [String.raw`v_2 = 100\ \text{м/с};\quad p = 5\ \text{МПа}`],
  },

  /* ===================== 12.49 ===================== */
  {
    id: '12.49', chapter: CH, section: S5, page: '200',
    title: 'Спринцовка',
    given: [[String.raw`F = 15\ \text{Н}`, ''], [String.raw`S = 12\ \text{см}^2`, '']],
    find: String.raw`v \;—\; ?`,
    formulas: [BERN],
    steps: [
      { title: 'Давление в спринцовке',
        tex: String.raw`p = \frac FS = 12{,}5\ \text{кПа}` },
      { title: 'Скорость истечения',
        text: 'Скорость поршня мала по сравнению со скоростью струи.',
        tex: String.raw`v = \sqrt{\frac{2p}{\rho}} = \sqrt{25} = 5\ \text{м/с}` },
    ],
    answer: [String.raw`v = 5\ \text{м/с}`],
  },

  /* ===================== 12.50 ===================== */
  {
    id: '12.50', chapter: CH, section: S5, page: '200',
    title: 'Скорость ветра по давлению на стену',
    note: MISMATCH + String.raw`В книге 8,80 м/с — так выходит из $p = 2\rho v^2$ (воздух отскакивает от стены, как упругий мячик). По уравнению Бернулли у стены, где воздух останавливается, $p = \frac{\rho v^2}{2}$, и $v = 17{,}6$ м/с. Если считать, что воздух просто теряет импульс, $p = \rho v^2$ и $v = 12{,}5$ м/с. Уточните у преподавателя, какую модель он ждёт.`,
    given: [[String.raw`p = 200\ \text{Па}`, ''], [String.raw`\rho = 1{,}29\ \text{кг/м}^3`, '']],
    find: String.raw`v \;—\; ?`,
    formulas: [BERN],
    steps: [
      { title: 'Динамическое давление',
        text: 'У стены воздух останавливается; его давление растёт на ρv²/2.',
        tex: String.raw`p = \frac{\rho v^2}{2} \;\Rightarrow\; v = \sqrt{\frac{2p}{\rho}} = \sqrt{\frac{400}{1{,}29}} = 17{,}6\ \text{м/с}` },
    ],
    answer: [String.raw`v = 17{,}6\ \text{м/с}`],
  },

  /* ===================== 12.51 ===================== */
  {
    id: '12.51', chapter: CH, section: S5, page: '200',
    title: 'Струя бьёт в стенку',
    given: [[String.raw`d = 2\ \text{см}`, ''], [String.raw`v = 10\ \text{м/с}`, '']],
    find: String.raw`F \;—\; ?`,
    formulas: [{ tex: String.raw`F = \frac{\Delta p}{\Delta t} = \rho Sv^2`, text: 'за 1 с на стенку приходит масса ρSv, каждая частица теряет скорость v' }],
    steps: [
      { title: 'Сила',
        tex: String.raw`F = \rho\frac{\pi d^2}{4}v^2 = 1000\cdot3{,}14\cdot10^{-4}\cdot100 = 31{,}4\ \text{Н}` },
    ],
    answer: [String.raw`F = 31{,}4\ \text{Н}`],
  },

  /* ===================== 12.52 ===================== */
  {
    id: '12.52', chapter: CH, section: S5, page: '200',
    title: 'Дальность струи из бака',
    given: [[String.raw`h = 1{,}5\ \text{м}`, ''], [String.raw`d = 1\ \text{м}\ (\text{глубина отверстия})`, '']],
    find: String.raw`l \;—\; ?`,
    formulas: [TORR],
    steps: [
      { title: 'Скорость и время падения',
        text: 'Отверстие на высоте h − d = 0,5 м над полом.',
        tex: String.raw`v = \sqrt{2gd},\qquad t = \sqrt{\frac{2(h - d)}{g}}` },
      { title: 'Дальность',
        tex: String.raw`l = vt = 2\sqrt{d(h - d)} = 2\sqrt{0{,}5} = 1{,}4\ \text{м}` },
    ],
    answer: [String.raw`l = 1{,}4\ \text{м}`],
  },

  /* ===================== 12.53 ===================== */
  {
    id: '12.53', chapter: CH, section: S5, page: '200',
    title: 'Давление в пожарном рукаве',
    given: [[String.raw`S_1 = 4\ \text{см}^2,\ S_2 = 50\ \text{см}^2`, ''], [String.raw`H = 2\ \text{м},\ l = 8\ \text{м}`, '']],
    find: String.raw`p \;—\; ?`,
    formulas: [CONT, BERN],
    steps: [
      { title: 'Скорость струи по дальности',
        tex: String.raw`v_1 = l\sqrt{\frac{g}{2H}} = 8\cdot1{,}566 = 12{,}5\ \text{м/с}` },
      { title: 'Скорость в рукаве',
        tex: String.raw`v_2 = v_1\frac{S_1}{S_2} = 1{,}0\ \text{м/с}` },
      { title: 'Избыточное давление',
        tex: String.raw`p = \frac\rho2(v_1^2 - v_2^2) = \frac{\rho gl^2}{4H}\left[1 - \left(\frac{S_1}{S_2}\right)^2\right] = 78{,}0\ \text{кПа}` },
    ],
    answer: [String.raw`p = 78{,}0\ \text{кПа}`],
  },

  /* ===================== 12.54 ===================== */
  {
    id: '12.54', chapter: CH, section: S5, page: '200',
    title: 'Где проделать отверстие',
    given: [[String.raw`H = 2\ \text{м}`, '']],
    find: String.raw`h \;—\; ?`,
    formulas: [TORR],
    steps: [
      { title: 'Дальность',
        text: 'Отверстие на высоте h: глубина H − h.',
        tex: String.raw`l = 2\sqrt{h(H - h)}` },
      { title: 'Максимум',
        text: 'Произведение двух чисел с постоянной суммой H наибольшее, когда они равны.',
        tex: String.raw`h = \frac H2 = 1\ \text{м},\qquad l_{\max} = H = 2\ \text{м}` },
    ],
    answer: [String.raw`h = 1\ \text{м}`],
  },

  /* ===================== 12.55 ===================== */
  {
    id: '12.55', chapter: CH, section: S5, page: '200',
    title: 'Число Рейнольдса в трубе',
    given: [[String.raw`d = 5\ \text{см}`, ''], [String.raw`\langle v\rangle = 10\ \text{см/с}`, ''], [String.raw`\eta = 1\ \text{мПа·с}`, '']],
    find: String.raw`\text{Re} \;—\; ?`,
    formulas: [RE],
    steps: [
      { title: 'Число Рейнольдса',
        tex: String.raw`\text{Re} = \frac{1000\cdot0{,}1\cdot0{,}05}{10^{-3}} = 5000 > 2300` },
      { title: 'Вывод',
        text: 'Течение турбулентное.' },
    ],
    answer: [String.raw`\text{Re} = 5000;\ \text{турбулентное}`],
  },

  /* ===================== 12.56 ===================== */
  {
    id: '12.56', chapter: CH, section: S5, page: '200',
    title: 'Масло и глицерин в одной трубе',
    note: MISMATCH + String.raw`В книге 1,94 см/с — меньше, чем у масла. Но глицерин в 15 раз вязче машинного масла, и турбулентность в нём наступает при большей скорости: $v = 3{,}2\cdot\frac{\eta_\text{г}\rho_\text{м}}{\eta_\text{м}\rho_\text{г}} = 33{,}8$ см/с (вязкость и плотности — табл. 9 и 14).`,
    given: [[String.raw`v_\text{м} = 3{,}2\ \text{см/с}`, ''], [String.raw`\eta_\text{м} = 0{,}1,\ \eta_\text{г} = 1{,}48\ \text{Па·с}`, ''], [String.raw`\rho_\text{м} = 900,\ \rho_\text{г} = 1260\ \text{кг/м}^3`, '']],
    find: String.raw`v_\text{г} \;—\; ?`,
    formulas: [RE],
    steps: [
      { title: 'Одинаковое критическое число Re',
        tex: String.raw`\frac{\rho_\text{м}v_\text{м}d}{\eta_\text{м}} = \frac{\rho_\text{г}v_\text{г}d}{\eta_\text{г}} \;\Rightarrow\; v_\text{г} = v_\text{м}\frac{\eta_\text{г}\rho_\text{м}}{\eta_\text{м}\rho_\text{г}} = 3{,}2\cdot\frac{1{,}48\cdot900}{0{,}1\cdot1260} = 33{,}8\ \text{см/с}` },
    ],
    answer: [String.raw`v = 33{,}8\ \text{см/с}`],
  },

  /* ===================== 12.57 ===================== */
  {
    id: '12.57', chapter: CH, section: S5, page: '200',
    title: 'Наибольший ламинарный расход воды',
    given: [[String.raw`d = 3\ \text{см}`, ''], [String.raw`\eta = 1\ \text{мПа·с}`, ''], [String.raw`\text{Re}_\text{кр} = 2300`, '']],
    find: String.raw`Q_{m\,\max} \;—\; ?`,
    formulas: [RE],
    steps: [
      { title: 'Предельная скорость',
        tex: String.raw`\rho v = \frac{\text{Re}_\text{кр}\eta}{d}` },
      { title: 'Расход',
        text: 'В ответе книги η названа вязкостью «масла» — речь о воде.',
        tex: String.raw`Q_m = \rho v\frac{\pi d^2}{4} = \frac\pi4\eta\,\text{Re}_\text{кр}d = 0{,}785\cdot10^{-3}\cdot2300\cdot0{,}03 = 54{,}2\ \text{г/с}` },
    ],
    answer: [String.raw`Q_{m\,\max} = 54{,}2\ \text{г/с}`],
  },

  /* ===================== 12.58 ===================== */
  {
    id: '12.58', chapter: CH, section: S5, page: '201',
    title: 'Медный шарик в касторовом масле',
    note: SMALL + String.raw`В книге Re = 4,17 — так выходит с вязкостью масла 1 Па·с; с 0,987 Па·с из табл. 14 — 4,28. Вывод тот же.`,
    given: [[String.raw`d = 1\ \text{см}`, ''], [String.raw`\rho_1 = 8930,\ \rho_2 = 960\ \text{кг/м}^3`, ''], [String.raw`\eta = 0{,}987\ \text{Па·с}`, '']],
    find: String.raw`\text{Re} \;—\; ?`,
    formulas: [STOKES, RE],
    steps: [
      { title: 'Установившаяся скорость (Стокс)',
        tex: String.raw`v = \frac{(\rho_1 - \rho_2)gd^2}{18\eta} = \frac{7970\cdot9{,}81\cdot10^{-4}}{18\cdot0{,}987} = 0{,}44\ \text{м/с}` },
      { title: 'Число Рейнольдса',
        tex: String.raw`\text{Re} = \frac{\rho_2vd}{\eta} = \frac{960\cdot0{,}44\cdot0{,}01}{0{,}987} = 4{,}3 > 0{,}5` },
      { title: 'Вывод',
        text: 'Обтекание не ламинарное (строго говоря, и формула Стокса здесь уже неточна).' },
    ],
    answer: [String.raw`\text{Re} = 4{,}3 > \text{Re}_\text{кр};\ \text{не ламинарное}`],
  },

  /* ===================== 12.59 ===================== */
  {
    id: '12.59', chapter: CH, section: S5, page: '201',
    title: 'Латунный шарик в глицерине',
    note: MISMATCH + String.raw`В книге $v = 6{,}71$ мм/с, но формула книги даёт $\frac{7290\cdot9{,}81\cdot2{,}5\cdot10^{-7}}{18\cdot1{,}48} = 6{,}71\cdot10^{-4}$ м/с $= 0{,}671$ мм/с — ошибка в 10 раз. Вывод о ламинарности верен.`,
    given: [[String.raw`d = 0{,}5\ \text{мм}`, ''], [String.raw`\rho_1 = 8550,\ \rho_2 = 1260\ \text{кг/м}^3`, ''], [String.raw`\eta = 1{,}48\ \text{Па·с}`, '']],
    find: String.raw`v,\ \text{Re} \;—\; ?`,
    formulas: [STOKES, RE],
    steps: [
      { title: '1) Скорость',
        text: 'Вес минус архимедова сила уравновешен силой Стокса.',
        tex: String.raw`v = \frac{(\rho_1 - \rho_2)gd^2}{18\eta} = 6{,}71\cdot10^{-4}\ \text{м/с} = 0{,}671\ \text{мм/с}` },
      { title: '2) Число Рейнольдса',
        tex: String.raw`\text{Re} = \frac{1260\cdot6{,}71\cdot10^{-4}\cdot5\cdot10^{-4}}{1{,}48} = 2{,}9\cdot10^{-4} \ll 0{,}5` },
    ],
    answer: [String.raw`v = 0{,}671\ \text{мм/с};\quad \text{ламинарное}`],
  },

  /* ===================== 12.60 ===================== */
  {
    id: '12.60', chapter: CH, section: S5, page: '201',
    title: 'Переход к турбулентности для двух шариков',
    note: SMALL + String.raw`В книге 27,7 см/с; с данными табл. 9 и 14 — 27,4 см/с.`,
    given: [[String.raw`r_1 = 2{,}4\ \text{мм},\ v_1 = 10\ \text{см/с}\ (\text{касторовое масло})`, ''], [String.raw`r_2 = 1\ \text{мм}\ (\text{глицерин})`, '']],
    find: String.raw`v_2 \;—\; ?`,
    formulas: [RE],
    steps: [
      { title: 'Равные критические числа Re',
        tex: String.raw`v_2 = v_1\frac{\rho_1r_1\eta_2}{\rho_2r_2\eta_1} = 10\cdot\frac{960\cdot2{,}4\cdot1{,}48}{1260\cdot1\cdot0{,}987} = 27{,}4\ \text{см/с}` },
    ],
    answer: [String.raw`v_2 = 27{,}4\ \text{см/с}`],
  },

  );
})();
