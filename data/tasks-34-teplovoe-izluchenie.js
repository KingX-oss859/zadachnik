/*
  § 34. Законы теплового излучения — задачи 34.1–34.31 (стр. 430–433).
  Условия задач показываются дословно из книги (data/book-tasks.js).
  Ответы пересчитаны скриптом tools/check_teplovoe_izluchenie.py и сверены с book/99-otvety.md
  (оцифрованная копия ответов — часть расхождений может быть ошибкой распознавания, а не книги).
*/
(function () {
  const CH = 'Гл. 7. Квантовооптические явления. Физика атома';
  const S1 = 'Закон Стефана–Больцмана';
  const S2 = 'Закон Вина. Формула Планка';
  const MISMATCH = '<b>Расхождение с ответом в копии книги.</b> ';
  const SMALL = '<b>Расхождение в последней цифре.</b> ';
  const TYPO = '<b>Опечатка в формуле ответа.</b> ';

  const SB = { tex: String.raw`R^*_\text{э} = \sigma T^4,\quad \sigma = 5{,}67\cdot10^{-8}\ \text{Вт/(м}^2\cdot\text{К}^4)`, text: 'закон Стефана–Больцмана' };
  const GREY = { tex: String.raw`R_\text{э} = a_T\sigma T^4`, text: 'серое тело' };
  const WIEN = { tex: String.raw`\lambda_\text{m} = \frac bT,\quad b = 2{,}90\cdot10^{-3}\ \text{м·К}`, text: 'закон смещения Вина' };
  const RMAX = { tex: String.raw`(r^*_{\lambda,T})_{\max} = CT^5,\quad C = 1{,}30\cdot10^{-5}\ \text{Вт/(м}^3\cdot\text{К}^5)`, text: 'максимальная спектральная плотность' };
  const PLANCK = { tex: String.raw`r^*_{\lambda,T} = \frac{2\pi hc^2}{\lambda^5}\cdot\frac{1}{e^{hc/(\lambda kT)} - 1}`, text: 'формула Планка' };
  const PRESS = { tex: String.raw`u = \frac{4\sigma T^4}{c},\quad p = \frac u3 = \frac{4\sigma T^4}{3c}`, text: 'объёмная плотность энергии и давление равновесного излучения' };

  window.TASKS.push(

  /* ===================== 34.1 ===================== */
  {
    id: '34.1', chapter: CH, section: S1, page: '430',
    title: 'Температура по светимости 10 кВт/м²',
    given: [[String.raw`R^*_\text{э} = 10\ \text{кВт/м}^2`, String.raw`10^4\ \text{Вт/м}^2`]],
    find: String.raw`T \;—\; ?`,
    formulas: [SB],
    steps: [{ title: 'Температура', tex: String.raw`T = \sqrt[4]{\frac{10^4}{5{,}67\cdot10^{-8}}} = 648\ \text{К}` }],
    answer: [String.raw`T = 648\ \text{К}`],
  },

  /* ===================== 34.2 ===================== */
  {
    id: '34.2', chapter: CH, section: S1, page: '430',
    title: 'Температура печи по потоку из окошка',
    given: [[String.raw`\Phi_e = 34\ \text{Вт}`, ''], [String.raw`S = 6\ \text{см}^2`, String.raw`6\cdot10^{-4}\ \text{м}^2`]],
    find: String.raw`T \;—\; ?`,
    formulas: [SB],
    steps: [{ title: 'Температура', tex: String.raw`T = \sqrt[4]{\frac{\Phi_e}{\sigma S}} = \sqrt[4]{\frac{34}{5{,}67\cdot10^{-8}\cdot6\cdot10^{-4}}} = 1000\ \text{К}` }],
    answer: [String.raw`T = 1\ \text{кК}`],
  },

  /* ===================== 34.3 ===================== */
  {
    id: '34.3', chapter: CH, section: S1, page: '431',
    title: 'Энергия из окошка за минуту',
    given: [[String.raw`t = 60\ \text{с}`, ''], [String.raw`S = 8\ \text{см}^2`, String.raw`8\cdot10^{-4}\ \text{м}^2`], [String.raw`T = 1200\ \text{К}`, '']],
    find: String.raw`W \;—\; ?`,
    formulas: [SB],
    steps: [{ title: 'Энергия', tex: String.raw`W = \sigma T^4St = 5{,}67\cdot10^{-8}\cdot2{,}07\cdot10^{12}\cdot8\cdot10^{-4}\cdot60 = 5{,}64\cdot10^3\ \text{Дж}` }],
    answer: [String.raw`W = 5{,}64\ \text{кДж}`],
    note: SMALL + 'В книге 5,65 кДж; точно 5,643.',
  },

  /* ===================== 34.4 ===================== */
  {
    id: '34.4', chapter: CH, section: S1, page: '431',
    title: 'Поток с 1 км² Сириуса',
    given: [[String.raw`T = 10^4\ \text{К}`, ''], [String.raw`S = 1\ \text{км}^2`, String.raw`10^6\ \text{м}^2`]],
    find: String.raw`\Phi_e \;—\; ?`,
    formulas: [SB],
    steps: [{ title: 'Поток', tex: String.raw`\Phi_e = \sigma T^4S = 5{,}67\cdot10^{-8}\cdot10^{16}\cdot10^6 = 5{,}67\cdot10^{14}\ \text{Вт}` }],
    answer: [String.raw`\Phi_e = 5{,}67\cdot10^{14}\ \text{Вт} = 567\ \text{ТВт}`],
    note: MISMATCH + 'В копии ответов 5,67 ГВт — число то же, но множитель другой: σT⁴ = 5,67·10⁸ Вт/м², а площадь 10⁶ м², итого 5,67·10¹⁴ Вт. Вероятно, при распознавании потерян множитель 10⁵ (5,67·10⁵ ГВт).',
  },

  /* ===================== 34.5 ===================== */
  {
    id: '34.5', chapter: CH, section: S1, page: '431',
    title: 'Температура выросла на 1 %',
    given: [[String.raw`\Delta T/T = 0{,}01`, '']],
    find: String.raw`\Delta R/R \;—\; ?`,
    formulas: [SB],
    steps: [{ title: 'R ∝ T⁴', tex: String.raw`\frac{\Delta R}{R} \approx 4\frac{\Delta T}{T} = 4\%\quad(\text{точно } 1{,}01^4 - 1 = 4{,}06\%)` }],
    answer: [String.raw`\Delta R/R = 4\%`],
  },

  /* ===================== 34.6 ===================== */
  {
    id: '34.6', chapter: CH, section: S1, page: '431',
    title: 'Светимость удвоилась',
    given: [[String.raw`R_2/R_1 = 2`, '']],
    find: String.raw`T_2/T_1 \;—\; ?`,
    formulas: [SB],
    steps: [{ title: 'Отношение', tex: String.raw`\frac{T_2}{T_1} = \sqrt[4]2 = 1{,}19` }],
    answer: [String.raw`\text{в 1,19 раза}`],
  },

  /* ===================== 34.7 ===================== */
  {
    id: '34.7', chapter: CH, section: S1, page: '431',
    title: 'Светимость и температура Солнца',
    given: [[String.raw`\theta = 32'`, String.raw`\theta/2 = 4{,}65\cdot10^{-3}\ \text{рад}`], [String.raw`C = 1{,}4\ \text{кВт/м}^2`, '']],
    find: String.raw`R^*_\text{э},\ T \;—\; ?`,
    formulas: [SB],
    steps: [
      { title: 'Поток через сферу радиусом r (расстояние до Земли)', tex: String.raw`R^*_\text{э}\cdot4\pi R_\odot^2 = C\cdot4\pi r^2\ \Rightarrow\ R^*_\text{э} = \frac{C}{\operatorname{tg}^2(\theta/2)} = \frac{1400}{2{,}17\cdot10^{-5}} = 6{,}46\cdot10^7\ \text{Вт/м}^2` },
      { title: 'Температура', tex: String.raw`T = \sqrt[4]{\frac{6{,}46\cdot10^7}{5{,}67\cdot10^{-8}}} = 5{,}8\cdot10^3\ \text{К}` },
    ],
    answer: [String.raw`R^*_\text{э} = 64{,}6\ \text{МВт/м}^2;\quad T = 5{,}8\ \text{кК}`],
    note: SMALL + 'В книге 64,7 МВт/м².',
  },

  /* ===================== 34.8 ===================== */
  {
    id: '34.8', chapter: CH, section: S1, page: '431',
    title: 'Чёрная пластинка на орбите Земли',
    given: [[String.raw`C = 1{,}4\ \text{кВт/м}^2`, '']],
    find: String.raw`T \;—\; ?`,
    formulas: [SB],
    steps: [
      { title: 'Баланс энергии (как в ответе книги)', text: 'Пластинка поглощает поток C и излучает с освещённой стороны σT⁴.', tex: String.raw`T = \sqrt[4]{\frac C\sigma} = \sqrt[4]{\frac{1400}{5{,}67\cdot10^{-8}}} = 396\ \text{К}` },
      { title: 'Если излучают обе стороны', tex: String.raw`T = \sqrt[4]{\frac{C}{2\sigma}} = 333\ \text{К}` },
    ],
    answer: [String.raw`T = 396\ \text{К}\ (\text{излучение с одной стороны})`],
    note: '<b>Про модель.</b> Ответ книги соответствует излучению только с освещённой стороны. Тонкая металлическая пластинка излучала бы обеими сторонами — тогда 333 К.',
  },

  /* ===================== 34.9 ===================== */
  {
    id: '34.9', chapter: CH, section: S1, page: '431',
    title: 'Излучение угля',
    given: [[String.raw`T = 600\ \text{К},\ a_T = 0{,}8`, ''], [String.raw`S = 5\ \text{см}^2,\ t = 10\ \text{мин}`, String.raw`5\cdot10^{-4}\ \text{м}^2,\ 600\ \text{с}`]],
    find: String.raw`R_\text{э},\ W \;—\; ?`,
    formulas: [GREY],
    steps: [
      { title: '1) Светимость', tex: String.raw`R_\text{э} = 0{,}8\cdot5{,}67\cdot10^{-8}\cdot1{,}296\cdot10^{11} = 5{,}88\cdot10^3\ \text{Вт/м}^2` },
      { title: '2) Энергия', tex: String.raw`W = R_\text{э}St = 5880\cdot5\cdot10^{-4}\cdot600 = 1{,}76\cdot10^3\ \text{Дж}` },
    ],
    answer: [String.raw`1)\ 5{,}88\ \text{кВт/м}^2;\quad 2)\ 1{,}76\ \text{кДж}`],
  },

  /* ===================== 34.10 ===================== */
  {
    id: '34.10', chapter: CH, section: S1, page: '431',
    title: 'Коэффициент излучения сажи',
    given: [[String.raw`S = 2\ \text{см}^2`, ''], [String.raw`T = 400\ \text{К},\ t = 300\ \text{с}`, ''], [String.raw`W = 83\ \text{Дж}`, '']],
    find: String.raw`a_T \;—\; ?`,
    formulas: [GREY],
    steps: [{ title: 'Коэффициент', tex: String.raw`a_T = \frac{W}{\sigma T^4St} = \frac{83}{5{,}67\cdot10^{-8}\cdot2{,}56\cdot10^{10}\cdot2\cdot10^{-4}\cdot300} = 0{,}953` }],
    answer: [String.raw`a_T = 0{,}953`],
  },

  /* ===================== 34.11 ===================== */
  {
    id: '34.11', chapter: CH, section: S1, page: '431',
    title: 'Муфельная печь',
    given: [[String.raw`P = 1\ \text{кВт}`, ''], [String.raw`S = 25\ \text{см}^2`, ''], [String.raw`T = 1200\ \text{К}`, '']],
    find: String.raw`\eta \;—\; ?`,
    formulas: [SB],
    steps: [{ title: 'Что не ушло через отверстие, рассеивают стенки', tex: String.raw`\eta = 1 - \frac{\sigma T^4S}{P} = 1 - \frac{5{,}67\cdot10^{-8}\cdot2{,}07\cdot10^{12}\cdot2{,}5\cdot10^{-3}}{1000} = 1 - 0{,}29 = 0{,}71` }],
    answer: [String.raw`\eta = 0{,}71`],
  },

  /* ===================== 34.12 ===================== */
  {
    id: '34.12', chapter: CH, section: S1, page: '431',
    title: 'Земля как серое тело',
    given: [[String.raw`T = 280\ \text{К}`, ''], [String.raw`R_\text{э} = 325\ \text{кДж/(м}^2\cdot\text{ч)}`, String.raw`90{,}3\ \text{Вт/м}^2`]],
    find: String.raw`a_T \;—\; ?`,
    formulas: [GREY],
    steps: [{ title: 'Коэффициент', tex: String.raw`a_T = \frac{90{,}3}{5{,}67\cdot10^{-8}\cdot280^4} = \frac{90{,}3}{348{,}5} = 0{,}26` }],
    answer: [String.raw`a_T = 0{,}26`],
  },

  /* ===================== 34.13 ===================== */
  {
    id: '34.13', chapter: CH, section: S1, page: '431',
    title: 'Температура серого шара',
    given: [[String.raw`R = 10\ \text{см}`, String.raw`0{,}1\ \text{м}`], [String.raw`P = 1\ \text{кВт}`, ''], [String.raw`a_T = 0{,}25`, '']],
    find: String.raw`T \;—\; ?`,
    formulas: [GREY],
    steps: [{ title: 'P = a_T σ T⁴ · 4πR²', tex: String.raw`T = \sqrt[4]{\frac{P}{4\pi R^2a_T\sigma}} = \sqrt[4]{\frac{1000}{0{,}1257\cdot0{,}25\cdot5{,}67\cdot10^{-8}}} = 866\ \text{К}` }],
    answer: [String.raw`T = 866\ \text{К}`],
    note: TYPO + 'В формуле ответа книги в знаменателе R*²_э вместо R² — радиуса шара.',
  },

  /* ===================== 34.14 ===================== */
  {
    id: '34.14', chapter: CH, section: S2, page: '432',
    title: 'Максимум излучения при 0 °C',
    given: [[String.raw`T = 273\ \text{К}`, '']],
    find: String.raw`\lambda_\text{m} \;—\; ?`,
    formulas: [WIEN],
    steps: [{ title: 'Длина волны', tex: String.raw`\lambda_\text{m} = \frac{2{,}9\cdot10^{-3}}{273} = 1{,}06\cdot10^{-5}\ \text{м}` }],
    answer: [String.raw`\lambda_\text{m} = 10{,}6\ \text{мкм}`],
  },

  /* ===================== 34.15 ===================== */
  {
    id: '34.15', chapter: CH, section: S2, page: '432',
    title: 'Максимум излучения Солнца',
    given: [[String.raw`T = 5300\ \text{К}`, '']],
    find: String.raw`\lambda_\text{m} \;—\; ?`,
    formulas: [WIEN],
    steps: [{ title: 'Длина волны', tex: String.raw`\lambda_\text{m} = \frac{2{,}9\cdot10^{-3}}{5300} = 547\ \text{нм}` }],
    answer: [String.raw`\lambda_\text{m} = 547\ \text{нм}`],
  },

  /* ===================== 34.16 ===================== */
  {
    id: '34.16', chapter: CH, section: S2, page: '432',
    title: 'Максимум на границах видимого спектра',
    given: [[String.raw`\lambda_1 = 750\ \text{нм},\ \lambda_2 = 380\ \text{нм}`, '']],
    find: String.raw`T_1,\ T_2 \;—\; ?`,
    formulas: [WIEN],
    steps: [{ title: 'T = b/λ', tex: String.raw`T_1 = \frac{2{,}9\cdot10^{-3}}{7{,}5\cdot10^{-7}} = 3{,}9\ \text{кК},\quad T_2 = \frac{2{,}9\cdot10^{-3}}{3{,}8\cdot10^{-7}} = 7{,}6\ \text{кК}` }],
    answer: [String.raw`T_1 = 3{,}9\ \text{кК};\quad T_2 = 7{,}6\ \text{кК}`],
    note: SMALL + 'В книге T₁ = 3,8 кК; точно 3,87.',
  },

  /* ===================== 34.17 ===================== */
  {
    id: '34.17', chapter: CH, section: S2, page: '432',
    title: 'Температура Арктура',
    given: [[String.raw`\lambda_\text{m} = 580\ \text{нм}`, '']],
    find: String.raw`T \;—\; ?`,
    formulas: [WIEN],
    steps: [{ title: 'Температура', tex: String.raw`T = \frac{2{,}9\cdot10^{-3}}{5{,}8\cdot10^{-7}} = 5{,}0\cdot10^3\ \text{К}` }],
    answer: [String.raw`T = 5{,}0\ \text{кК}`],
    note: SMALL + 'В книге 4,98 кК — видимо, взято b = 2,89·10⁻³ м·К.',
  },

  /* ===================== 34.18 ===================== */
  {
    id: '34.18', chapter: CH, section: S2, page: '432',
    title: 'Максимум сместился с 2,4 до 0,8 мкм',
    given: [[String.raw`\lambda_1 = 2{,}4\ \text{мкм},\ \lambda_2 = 0{,}8\ \text{мкм}`, '']],
    find: String.raw`R_2/R_1,\ r_2/r_1 \;—\; ?`,
    formulas: [SB, WIEN, RMAX],
    steps: [
      { title: 'Температура выросла в 3 раза', tex: String.raw`\frac{T_2}{T_1} = \frac{\lambda_1}{\lambda_2} = 3` },
      { title: 'Светимости', tex: String.raw`\frac{R_2}{R_1} = 3^4 = 81,\quad \frac{r_2}{r_1} = 3^5 = 243` },
    ],
    answer: [String.raw`\text{увеличились в 81 и в 243 раза}`],
  },

  /* ===================== 34.19 ===================== */
  {
    id: '34.19', chapter: CH, section: S2, page: '432',
    title: 'Температура удвоилась, максимум сместился на 400 нм',
    given: [[String.raw`T_2 = 2T_1`, ''], [String.raw`\Delta\lambda_\text{m} = 400\ \text{нм}`, '']],
    find: String.raw`T_1,\ T_2 \;—\; ?`,
    formulas: [WIEN],
    steps: [{ title: 'b/T₁ − b/(2T₁) = Δλ', tex: String.raw`T_1 = \frac{b}{2\Delta\lambda_\text{m}} = \frac{2{,}9\cdot10^{-3}}{8\cdot10^{-7}} = 3{,}62\ \text{кК},\quad T_2 = 7{,}25\ \text{кК}` }],
    answer: [String.raw`T_1 = 3{,}62\ \text{кК};\quad T_2 = 7{,}25\ \text{кК}`],
    note: SMALL + 'В книге T₂ = 7,24 кК (удвоено округлённое T₁).',
  },

  /* ===================== 34.20 ===================== */
  {
    id: '34.20', chapter: CH, section: S2, page: '432',
    title: 'Мощность эталона канделы',
    given: [[String.raw`S = 0{,}5305\ \text{мм}^2`, String.raw`5{,}305\cdot10^{-7}\ \text{м}^2`], [String.raw`T = 1063\ ^\circ\text{C}`, String.raw`1336\ \text{К}`]],
    find: String.raw`P \;—\; ?`,
    formulas: [SB],
    steps: [{ title: 'Мощность', tex: String.raw`P = \sigma T^4S = 5{,}67\cdot10^{-8}\cdot3{,}19\cdot10^{12}\cdot5{,}305\cdot10^{-7} = 9{,}58\cdot10^{-2}\ \text{Вт}` }],
    answer: [String.raw`P = 95{,}8\ \text{мВт}`],
  },

  /* ===================== 34.21 ===================== */
  {
    id: '34.21', chapter: CH, section: S2, page: '432',
    title: 'Длина волны по максимальной спектральной плотности',
    given: [[String.raw`r_{\max} = 4{,}16\cdot10^{11}\ \text{Вт/м}^3`, '']],
    find: String.raw`\lambda_\text{m} \;—\; ?`,
    formulas: [RMAX, WIEN],
    steps: [
      { title: 'Температура', tex: String.raw`T = \sqrt[5]{\frac{4{,}16\cdot10^{11}}{1{,}3\cdot10^{-5}}} = \sqrt[5]{3{,}2\cdot10^{16}} = 2000\ \text{К}` },
      { title: 'Длина волны', tex: String.raw`\lambda_\text{m} = \frac{2{,}9\cdot10^{-3}}{2000} = 1{,}45\ \text{мкм}` },
    ],
    answer: [String.raw`\lambda_\text{m} = 1{,}45\ \text{мкм}`],
    note: '<b>Про единицы.</b> В условии единица Вт/м² — у спектральной плотности по длине волны должно быть Вт/м³; ответ книги считается именно так.',
  },

  /* ===================== 34.22 ===================== */
  {
    id: '34.22', chapter: CH, section: S2, page: '432',
    title: 'Спектральная плотность по формуле Планка',
    given: [[String.raw`T = 2000\ \text{К}`, ''], [String.raw`\lambda = 600\ \text{нм}`, ''], [String.raw`\Delta\lambda = 20\ \text{нм}`, '']],
    find: String.raw`r^*_{\lambda,T},\ \Delta R \;—\; ?`,
    formulas: [PLANCK],
    steps: [
      { title: 'Показатель экспоненты', tex: String.raw`\frac{hc}{\lambda kT} = \frac{6{,}63\cdot10^{-34}\cdot3\cdot10^8}{6\cdot10^{-7}\cdot1{,}38\cdot10^{-23}\cdot2000} = 12{,}0\ \Rightarrow\ e^{12} = 1{,}63\cdot10^5` },
      { title: '1) Плотность', tex: String.raw`r = \frac{2\pi\cdot6{,}63\cdot10^{-34}\cdot9\cdot10^{16}}{(6\cdot10^{-7})^5}\cdot\frac1{1{,}63\cdot10^5} = 2{,}95\cdot10^{10}\ \text{Вт/м}^3 = 29{,}5\ \text{МВт/(м}^2\cdot\text{мм)}` },
      { title: '2) Светимость в интервале', tex: String.raw`\Delta R = r\Delta\lambda = 2{,}95\cdot10^{10}\cdot2\cdot10^{-8} = 590\ \text{Вт/м}^2` },
    ],
    answer: [String.raw`1)\ \approx30\ \text{МВт/(м}^2\cdot\text{мм)};\quad 2)\ \approx590\text{–}600\ \text{Вт/м}^2`],
    note: SMALL + 'Книга округлила до 30 МВт/(м²·мм) и 600 Вт/м²; точно 29,5 и 590.',
  },

  /* ===================== 34.23 ===================== */
  {
    id: '34.23', chapter: CH, section: S2, page: '432–433',
    title: 'Закон смещения из формулы Вина',
    given: [[String.raw`r = C_1\lambda^{-5}e^{-C_2/(\lambda T)}`, ''], [String.raw`C_2 = 1{,}43\cdot10^{-2}\ \text{м·К}`, '']],
    find: String.raw`\lambda_\text{m}(T),\ b \;—\; ?`,
    formulas: [WIEN],
    steps: [
      { title: 'Производная по λ', tex: String.raw`\frac{dr}{d\lambda} = C_1e^{-C_2/(\lambda T)}\lambda^{-6}\left(-5 + \frac{C_2}{\lambda T}\right) = 0` },
      { title: 'Закон смещения', tex: String.raw`\lambda_\text{m} = \frac{C_2}{5T},\quad b = \frac{C_2}{5} = 2{,}86\cdot10^{-3}\ \text{м·К}` },
    ],
    answer: [String.raw`\lambda_\text{m} = \frac{C_2}{5T};\quad b = 2{,}86\cdot10^{-3}\ \text{м·К}`],
  },

  /* ===================== 34.24 ===================== */
  {
    id: '34.24', chapter: CH, section: S2, page: '433',
    title: 'Максимум по частоте из формулы Вина',
    given: [[String.raw`r = \alpha\omega^3e^{-\beta\omega/T}`, ''], [String.raw`\beta = 7{,}61\cdot10^{-12}\ \text{с·К},\ T = 1000\ \text{К}`, '']],
    find: String.raw`\omega_\text{m} \;—\; ?`,
    formulas: [WIEN],
    steps: [
      { title: 'Производная', tex: String.raw`\frac{dr}{d\omega} = \alpha\omega^2e^{-\beta\omega/T}\left(3 - \frac{\beta\omega}{T}\right) = 0\ \Rightarrow\ \omega_\text{m} = \frac{3T}{\beta}` },
      { title: 'Число', tex: String.raw`\omega_\text{m} = \frac{3000}{7{,}61\cdot10^{-12}} = 3{,}94\cdot10^{14}\ \text{с}^{-1}` },
    ],
    answer: [String.raw`\omega_\text{m} = 3{,}94\cdot10^{14}\ \text{с}^{-1}`],
  },

  /* ===================== 34.25 ===================== */
  {
    id: '34.25', chapter: CH, section: S2, page: '433',
    title: 'Мощность для накала нити',
    given: [[String.raw`d = 0{,}5\ \text{мм},\ l = 20\ \text{см}`, ''], [String.raw`T = 3000\ \text{К}`, '']],
    find: String.raw`P \;—\; ?`,
    formulas: [SB],
    steps: [{ title: 'Боковая поверхность πdl', tex: String.raw`P = \pi\sigma T^4ld = \pi\cdot5{,}67\cdot10^{-8}\cdot8{,}1\cdot10^{13}\cdot0{,}2\cdot5\cdot10^{-4} = 1{,}44\cdot10^3\ \text{Вт}` }],
    answer: [String.raw`P = 1{,}44\ \text{кВт}`],
  },

  /* ===================== 34.26 ===================== */
  {
    id: '34.26', chapter: CH, section: S2, page: '433',
    title: 'Остывание куба с водой в вакууме',
    given: [[String.raw`a = 10\ \text{см}`, ''], [String.raw`T_1 = 353\ \text{К},\ T_2 = 303\ \text{К}`, ''], [String.raw`c = 4{,}19\ \text{кДж/(кг·К)},\ \rho = 10^3\ \text{кг/м}^3`, '']],
    find: String.raw`\tau \;—\; ?`,
    formulas: [SB],
    steps: [
      { title: 'Уравнение остывания', tex: String.raw`\rho ca^3\,dT = -\sigma T^4\cdot6a^2\,dt\ \Rightarrow\ \tau = \frac{\rho ca}{18\sigma}\left(\frac1{T_2^3} - \frac1{T_1^3}\right)` },
      { title: 'Время', tex: String.raw`\tau = \frac{10^3\cdot4190\cdot0{,}1}{18\cdot5{,}67\cdot10^{-8}}(3{,}59 - 2{,}27)\cdot10^{-8} = 5{,}43\cdot10^3\ \text{с}` },
    ],
    answer: [String.raw`\tau = 1{,}51\ \text{ч}`],
  },

  /* ===================== 34.27 ===================== */
  {
    id: '34.27', chapter: CH, section: S2, page: '433',
    title: 'Остывание цинкового шарика',
    given: [[String.raw`d = 1\ \text{см}`, ''], [String.raw`T = 400\ \text{К},\ n = 2`, ''], [String.raw`\rho = 6{,}92\cdot10^3\ \text{кг/м}^3,\ M = 0{,}0654\ \text{кг/моль}`, '']],
    find: String.raw`\tau \;—\; ?`,
    formulas: [SB, { tex: String.raw`C_m = 3R`, text: 'закон Дюлонга и Пти' }],
    steps: [
      { title: 'Уравнение', tex: String.raw`\frac{\rho\pi d^3}{6}\cdot\frac{3R}{M}dT = -\sigma T^4\pi d^2\,dt` },
      { title: 'Интегрируем от T до T/n', tex: String.raw`\tau = \frac{\rho Rd}{6\sigma MT^3}(n^3 - 1) = \frac{6920\cdot8{,}31\cdot0{,}01\cdot7}{6\cdot5{,}67\cdot10^{-8}\cdot0{,}0654\cdot6{,}4\cdot10^7} = 2{,}83\cdot10^3\ \text{с}` },
    ],
    answer: [String.raw`\tau = 47{,}1\ \text{мин}`],
  },

  /* ===================== 34.28 ===================== */
  {
    id: '34.28', chapter: CH, section: S2, page: '433',
    title: 'Давление излучения в эпицентре взрыва',
    given: [[String.raw`T = 10^6\ \text{К}`, '']],
    find: String.raw`p \;—\; ?`,
    formulas: [PRESS],
    steps: [{ title: 'Давление', tex: String.raw`p = \frac{4\cdot5{,}67\cdot10^{-8}\cdot10^{24}}{3\cdot3\cdot10^8} = 2{,}5\cdot10^8\ \text{Па} = 2{,}5\cdot10^3\ \text{атм}` }],
    answer: [String.raw`p = 2{,}5\cdot10^8\ \text{Па} \approx 2{,}5\cdot10^3\ \text{атм}`],
    note: MISMATCH + 'В копии ответов 2,5·10⁷ атм — так получается при T = 10⁷ К. При T = 10⁶ К из условия давление в 10⁴ раз меньше: 2,5·10³ атм.',
  },

  /* ===================== 34.29 ===================== */
  {
    id: '34.29', chapter: CH, section: S2, page: '433',
    title: 'Давление излучения = 1 атм',
    given: [[String.raw`p = 1{,}013\cdot10^5\ \text{Па}`, '']],
    find: String.raw`T \;—\; ?`,
    formulas: [PRESS],
    steps: [{ title: 'Температура', tex: String.raw`T = \sqrt[4]{\frac{3cp}{4\sigma}} = \sqrt[4]{\frac{3\cdot3\cdot10^8\cdot1{,}013\cdot10^5}{2{,}27\cdot10^{-7}}} = 1{,}42\cdot10^5\ \text{К}` }],
    answer: [String.raw`T = 142\ \text{кК}`],
  },

  /* ===================== 34.30 ===================== */
  {
    id: '34.30', chapter: CH, section: S2, page: '433',
    title: 'Газ и излучение с одинаковым давлением',
    given: [[String.raw`T = 300\ \text{К}`, '']],
    find: String.raw`n \;—\; ?`,
    formulas: [PRESS, { tex: String.raw`p = nkT`, text: 'давление идеального газа' }],
    steps: [{ title: 'nkT = 4σT⁴/(3c)', tex: String.raw`n = \frac{4\sigma T^3}{3ck} = \frac{4\cdot5{,}67\cdot10^{-8}\cdot2{,}7\cdot10^7}{3\cdot3\cdot10^8\cdot1{,}38\cdot10^{-23}} = 4{,}93\cdot10^{14}\ \text{м}^{-3}` }],
    answer: [String.raw`n = 4{,}93\cdot10^{14}\ \text{м}^{-3}`],
    note: MISMATCH + 'В копии ответов 4,93·10¹⁶ м⁻³, и в формуле стоит T вместо T³. Мантисса совпадает, а по формуле выходит степень 10¹⁴ — похоже на ошибку в показателе.',
  },

  /* ===================== 34.31 ===================== */
  {
    id: '34.31', chapter: CH, section: S2, page: '433',
    title: 'Теплоёмкость неона и излучения',
    given: [[String.raw`T = 500\ \text{К}`, '']],
    find: String.raw`p \;—\; ?`,
    formulas: [PRESS],
    steps: [
      { title: 'Теплоёмкости в объёме V', tex: String.raw`C_{V,\text{газ}} = \frac32\nu R = \frac32\frac{pV}{T},\quad C_{V,\text{изл}} = \frac{d}{dT}\left(\frac{4\sigma T^4}{c}V\right) = \frac{16\sigma T^3V}{c}` },
      { title: 'Приравниваем', tex: String.raw`p = \frac{32}{3}\frac{\sigma T^4}{c} = \frac{32\cdot5{,}67\cdot10^{-8}\cdot6{,}25\cdot10^{10}}{9\cdot10^8} = 1{,}26\cdot10^{-4}\ \text{Па}` },
    ],
    answer: [String.raw`p = 1{,}26\cdot10^{-4}\ \text{Па}`],
  }

  );
})();
