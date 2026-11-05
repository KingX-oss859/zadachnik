/*
  § 27. Магнитные свойства вещества — задачи 27.1–27.24 (стр. 377–379).
  Условия задач показываются дословно из книги (data/book-tasks.js).
  Ответы пересчитаны скриптом tools/check_magnitnye_svoystva.py и сверены с book/99-otvety.md.
  μB = 9,27·10⁻²⁴ Дж/Тл; k = 1,38·10⁻²³ Дж/К; N_A = 6,02·10²³ моль⁻¹.
*/
(function () {
  const CH = 'Гл. 5. Электромагнетизм';
  const S1 = 'Намагниченность. Магнитная восприимчивость';
  const S2 = 'Диа- и парамагнетизм';
  const S3 = 'Ферромагнетизм';
  const MISMATCH = '<b>Расхождение с ответом книги.</b> ';
  const SMALL = '<b>Расхождение в последней цифре.</b> ';
  const TYPO = '<b>Опечатка в ответе книги.</b> ';
  const GRAPH = '<b>Чтение графика.</b> ';

  const JDEF = { tex: String.raw`J = \chi H,\quad J_\text{уд} = \frac J\rho,\quad J_m = \frac M\rho J`, text: 'намагниченность: объёмная, удельная, молярная' };
  const CHI = { tex: String.raw`\chi_\text{уд} = \frac\chi\rho,\quad \chi_m = \frac M\rho\chi`, text: 'связь восприимчивостей' };
  const BJ = { tex: String.raw`B = \mu_0(H + J) = \mu_0(1 + \chi)H`, text: 'индукция в магнетике' };
  const LARM = { tex: String.raw`\omega_\text{L} = \frac{eB}{2m_e}`, text: 'частота ларморовой прецессии' };
  const CURIE = { tex: String.raw`\chi_m = \frac{\mu_0\mathcal M_J^2N_\text{A}}{3kT}`, text: 'парамагнетик при 𝓜B ≪ kT (закон Кюри)' };
  const LANG = { tex: String.raw`L(a) = \operatorname{cth}a - \frac1a \approx \frac a3 - \frac{a^3}{45},\quad a = \frac{\mathcal M_JB}{kT}`, text: 'функция Ланжевена' };
  const DIA = { tex: String.raw`\mathcal M_\text{инд} = -\frac{e^2B}{6m_e}\sum\langle r_i^2\rangle,\quad \chi_m = -\frac{\mu_0e^2N_\text{A}}{6m_e}\sum\langle r_i^2\rangle`, text: 'диамагнетизм (формула Ланжевена–Паули)' };

  window.TASKS.push(

  /* ===================== 27.1 ===================== */
  {
    id: '27.1', chapter: CH, section: S1, page: '377',
    title: 'Намагниченность насыщения',
    given: [[String.raw`\mathcal M = \mu_\text{B} = 9{,}27\cdot10^{-24}\ \text{Дж/Тл}`, ''], [String.raw`n = 6\cdot10^{28}\ \text{м}^{-3}`, '']],
    find: String.raw`J_\text{нас} \;—\; ?`,
    formulas: [{ tex: String.raw`J_\text{нас} = n\mathcal M`, text: 'все моменты выстроены вдоль поля' }],
    steps: [{ title: 'Намагниченность', tex: String.raw`J = 6\cdot10^{28}\cdot9{,}27\cdot10^{-24} = 5{,}56\cdot10^5\ \text{А/м}` }],
    answer: [String.raw`J_\text{нас} = 556\ \text{кА/м}`],
  },

  /* ===================== 27.2 ===================== */
  {
    id: '27.2', chapter: CH, section: S1, page: '377',
    title: 'Намагниченность марганца',
    given: [[String.raw`\chi = 1{,}21\cdot10^{-4}`, ''], [String.raw`H = 10^5\ \text{А/м}`, ''], [String.raw`\rho = 7{,}40\cdot10^3\ \text{кг/м}^3,\ M = 0{,}055\ \text{кг/моль}`, '']],
    find: String.raw`J,\ J_\text{уд},\ J_m \;—\; ?`,
    formulas: [JDEF],
    steps: [
      { title: 'Объёмная', tex: String.raw`J = \chi H = 12{,}1\ \text{А/м}` },
      { title: 'Удельная', tex: String.raw`J_\text{уд} = \frac{12{,}1}{7400} = 1{,}64\cdot10^{-3}\ \text{А·м}^2\text{/кг}` },
      { title: 'Молярная', tex: String.raw`J_m = MJ_\text{уд} = 0{,}055\cdot1{,}64\cdot10^{-3} = 9{,}0\cdot10^{-5}\ \text{А·м}^2\text{/моль}` },
    ],
    answer: [String.raw`J = 12{,}1\ \text{А/м};\ J_\text{уд} = 1{,}64\ \text{мА·м}^2\text{/кг};\ J_m = 90\ \text{мкА·м}^2\text{/моль}`],
    note: SMALL + 'В книге 1,66 и 91 — взята плотность ≈ 7,3·10³ кг/м³; по табл. 9 (7,40) выходит 1,64 и 90.',
  },

  /* ===================== 27.3 ===================== */
  {
    id: '27.3', chapter: CH, section: S1, page: '377',
    title: 'Восприимчивость AgBr',
    given: [[String.raw`\chi_m = 7{,}5\cdot10^{-10}\ \text{м}^3\text{/моль}`, ''], [String.raw`\rho = 6{,}47\cdot10^3\ \text{кг/м}^3`, ''], [String.raw`M = 0{,}188\ \text{кг/моль}`, '']],
    find: String.raw`\chi \;—\; ?`,
    formulas: [CHI],
    steps: [
      { title: 'Восприимчивость', tex: String.raw`\chi = \frac{\rho}{M}\chi_m = \frac{6470}{0{,}188}\cdot7{,}5\cdot10^{-10} = 2{,}58\cdot10^{-5}` },
      { title: 'Знак', text: 'AgBr — диамагнетик, χ < 0. Знак минус в условии потерян.' },
    ],
    answer: [String.raw`\chi = -2{,}6\cdot10^{-5}`],
    note: MISMATCH + 'В книге −7,3·10⁻⁵. Из данных условия (|χ_m| = 7,5·10⁻¹⁰, ρ = 6,47·10³, M(AgBr) = 188 г/моль) выходит −2,6·10⁻⁵. Ответ книги получился бы при |χ_m| ≈ 2,1·10⁻⁹ м³/моль.',
  },

  /* ===================== 27.4 ===================== */
  {
    id: '27.4', chapter: CH, section: S1, page: '377',
    title: 'Восприимчивости платины',
    given: [[String.raw`\chi_\text{уд} = 1{,}30\cdot10^{-9}\ \text{м}^3\text{/кг}`, ''], [String.raw`\rho = 21{,}4\cdot10^3\ \text{кг/м}^3,\ M = 0{,}195\ \text{кг/моль}`, '']],
    find: String.raw`\chi,\ \chi_m \;—\; ?`,
    formulas: [CHI],
    steps: [
      { title: 'Объёмная', tex: String.raw`\chi = \rho\chi_\text{уд} = 21{,}4\cdot10^3\cdot1{,}3\cdot10^{-9} = 2{,}78\cdot10^{-5}` },
      { title: 'Молярная', tex: String.raw`\chi_m = M\chi_\text{уд} = 0{,}195\cdot1{,}3\cdot10^{-9} = 2{,}54\cdot10^{-10}\ \text{м}^3\text{/моль}` },
    ],
    answer: [String.raw`\chi = 2{,}8\cdot10^{-5};\quad \chi_m = 2{,}5\cdot10^{-10}\ \text{м}^3\text{/моль}`],
    note: MISMATCH + 'В книге 10⁻⁵ и 10⁻¹⁰ — оба числа примерно в 2,6 раза меньше наших. Отношение χ/χ_m = ρ/M совпадает, так что книга, видимо, считала с χ_уд ≈ 0,5·10⁻⁹ м³/кг. По данным условия — 2,8·10⁻⁵ и 2,5·10⁻¹⁰.',
  },

  /* ===================== 27.5 ===================== */
  {
    id: '27.5', chapter: CH, section: S1, page: '377',
    title: 'Удельная и молярная восприимчивости алюминия',
    given: [[String.raw`\chi = 2{,}1\cdot10^{-5}`, ''], [String.raw`\rho = 2{,}70\cdot10^3\ \text{кг/м}^3,\ M = 0{,}027\ \text{кг/моль}`, '']],
    find: String.raw`\chi_\text{уд},\ \chi_m \;—\; ?`,
    formulas: [CHI],
    steps: [{ title: 'Расчёт', tex: String.raw`\chi_\text{уд} = \frac{2{,}1\cdot10^{-5}}{2700} = 7{,}8\cdot10^{-9}\ \text{м}^3\text{/кг},\quad \chi_m = M\chi_\text{уд} = 2{,}1\cdot10^{-10}\ \text{м}^3\text{/моль}` }],
    answer: [String.raw`\chi_\text{уд} = 7{,}8\cdot10^{-9}\ \text{м}^3\text{/кг};\quad \chi_m = 2{,}1\cdot10^{-10}\ \text{м}^3\text{/моль}`],
  },

  /* ===================== 27.6 ===================== */
  {
    id: '27.6', chapter: CH, section: S1, page: '377',
    title: 'Магнитный момент висмутового шарика',
    given: [[String.raw`R = 1\ \text{см}`, String.raw`10^{-2}\ \text{м}`], [String.raw`B_0 = 0{,}5\ \text{Тл}`, ''], [String.raw`\chi = -1{,}5\cdot10^{-4}`, '']],
    find: String.raw`p_m \;—\; ?`,
    formulas: [JDEF],
    steps: [{ title: 'p = JV, H = B₀/μ₀ (|χ| ≪ 1)', tex: String.raw`p_m = \chi\frac{B_0}{\mu_0}\cdot\frac43\pi R^3 = -1{,}5\cdot10^{-4}\cdot3{,}98\cdot10^5\cdot4{,}19\cdot10^{-6} = -2{,}5\cdot10^{-4}\ \text{А·м}^2` }],
    answer: [String.raw`|p_m| = 250\ \text{мкА·м}^2\ (\text{против поля})`],
  },

  /* ===================== 27.7 ===================== */
  {
    id: '27.7', chapter: CH, section: S1, page: '377',
    title: 'Намагниченность меди',
    given: [[String.raw`H = 10^6\ \text{А/м}`, ''], [String.raw`\chi_\text{уд} = -1{,}1\cdot10^{-9}\ \text{м}^3\text{/кг}`, ''], [String.raw`\rho = 8{,}93\cdot10^3\ \text{кг/м}^3`, '']],
    find: String.raw`J,\ B \;—\; ?`,
    formulas: [JDEF, BJ],
    steps: [
      { title: 'Намагниченность', tex: String.raw`J = \rho\chi_\text{уд}H = -8930\cdot1{,}1\cdot10^{-9}\cdot10^6 = -9{,}8\ \text{А/м}` },
      { title: 'Индукция', tex: String.raw`B = \mu_0(H + J) \approx 4\pi\cdot10^{-7}\cdot10^6 = 1{,}26\ \text{Тл}` },
    ],
    answer: [String.raw`J = -9{,}8\ \text{А/м};\quad B = 1{,}26\ \text{Тл}`],
  },

  /* ===================== 27.8 ===================== */
  {
    id: '27.8', chapter: CH, section: S2, page: '377',
    title: 'Ларморова частота в поле Земли',
    given: [[String.raw`B = 50\ \text{мкТл}`, String.raw`5\cdot10^{-5}\ \text{Тл}`]],
    find: String.raw`\omega_\text{L} \;—\; ?`,
    formulas: [LARM],
    steps: [{ title: 'Частота', tex: String.raw`\omega_\text{L} = \frac{1{,}6\cdot10^{-19}\cdot5\cdot10^{-5}}{2\cdot9{,}11\cdot10^{-31}} = 4{,}4\cdot10^6\ \text{с}^{-1}` }],
    answer: [String.raw`\omega_\text{L} = 4{,}4\cdot10^6\ \text{с}^{-1}`],
  },

  /* ===================== 27.9 ===================== */
  {
    id: '27.9', chapter: CH, section: S2, page: '377',
    title: 'Индуцированный момент атома водорода',
    given: [[String.raw`B = 1\ \text{Тл}`, ''], [String.raw`\langle r^2\rangle = \tfrac23r_1^2,\ r_1 = 52{,}9\ \text{пм}`, '']],
    find: String.raw`\mathcal M \;—\; ?`,
    formulas: [LARM, { tex: String.raw`\mathcal M = \frac{e\omega_\text{L}}{2\pi}\pi\langle r^2\rangle = \frac{e^2B}{4m_e}\langle r^2\rangle`, text: 'круговой ток прецессии; ⟨r²⟩ — квадрат расстояния до оси, проходящей через ядро вдоль B' }],
    steps: [
      { title: 'Ток прецессии', text: 'Орбита прецессирует с частотой ω_L; это добавочный круговой ток e·ω_L/(2π).' },
      { title: 'Момент', tex: String.raw`\mathcal M = \frac{e^2B}{4m_e}\cdot\frac23r_1^2 = \frac{2{,}56\cdot10^{-38}\cdot1\cdot1{,}87\cdot10^{-21}}{4\cdot9{,}11\cdot10^{-31}} = 1{,}31\cdot10^{-29}\ \text{А·м}^2` },
    ],
    answer: [String.raw`\mathcal M = 1{,}31\cdot10^{-29}\ \text{А·м}^2`],
    note: '<b>Про формулу.</b> Ответ книги получается, если значение (2/3)r₁² считать квадратом расстояния до оси прецессии; тогда множитель 1/4. По общей формуле раздела, M = e²B⟨r²⟩/(6mₑ) с ⟨r²⟩ как квадратом расстояния до ядра, выходит 8,7·10⁻³⁰ А·м².',
  },

  /* ===================== 27.10 ===================== */
  {
    id: '27.10', chapter: CH, section: S2, page: '377',
    title: 'Магнитный момент молекулы Cr₂O₃',
    given: [[String.raw`\chi_m = 5{,}8\cdot10^{-8}\ \text{м}^3\text{/моль}`, ''], [String.raw`T = 300\ \text{К}`, '']],
    find: String.raw`\mathcal M_J \;—\; ?`,
    formulas: [CURIE],
    steps: [{ title: 'Момент', tex: String.raw`\mathcal M_J = \sqrt{\frac{3kT\chi_m}{\mu_0N_\text{A}}} = \sqrt{\frac{3\cdot1{,}38\cdot10^{-23}\cdot300\cdot5{,}8\cdot10^{-8}}{1{,}257\cdot10^{-6}\cdot6{,}02\cdot10^{23}}} = 3{,}09\cdot10^{-23}\ \text{Дж/Тл} = 3{,}33\mu_\text{B}` }],
    answer: [String.raw`\mathcal M_J = 3{,}33\mu_\text{B}`],
    note: SMALL + 'В книге 3,34μB.',
  },

  /* ===================== 27.11 ===================== */
  {
    id: '27.11', chapter: CH, section: S2, page: '377–378',
    title: 'Магнитный момент молекулы V₂O₃',
    given: [[String.raw`\chi_\text{уд} = 1{,}89\cdot10^{-7}\ \text{м}^3\text{/кг}`, ''], [String.raw`T = 290\ \text{К}`, ''], [String.raw`M = 0{,}150\ \text{кг/моль}`, '']],
    find: String.raw`\mathcal M_J \;—\; ?`,
    formulas: [CURIE, CHI],
    steps: [
      { title: 'Молярная восприимчивость', tex: String.raw`\chi_m = M\chi_\text{уд} = 2{,}84\cdot10^{-8}\ \text{м}^3\text{/моль}` },
      { title: 'Момент', tex: String.raw`\mathcal M_J = \sqrt{\frac{3kT\chi_m}{\mu_0N_\text{A}}} = 2{,}12\cdot10^{-23}\ \text{Дж/Тл} = 2{,}29\mu_\text{B}` },
    ],
    answer: [String.raw`\mathcal M_J = 2{,}29\mu_\text{B}`],
    note: MISMATCH + 'В книге 2,24μB (на 2 % меньше). С M(V₂O₃) = 150 г/моль и T = 290 К выходит 2,29μB.',
  },

  /* ===================== 27.12 ===================== */
  {
    id: '27.12', chapter: CH, section: S2, page: '378',
    title: 'Намагниченность кислорода',
    given: [[String.raw`\mathcal M_J = 2{,}8\mu_\text{B}`, String.raw`2{,}60\cdot10^{-23}\ \text{Дж/Тл}`], [String.raw`B_0 = 10\ \text{мТл}`, ''], [String.raw`n_0 = 2{,}69\cdot10^{25}\ \text{м}^{-3},\ T = 273\ \text{К}`, '']],
    find: String.raw`J_\text{слаб},\ J_\text{нас} \;—\; ?`,
    formulas: [LANG],
    steps: [
      { title: 'Слабое поле: L(a) ≈ a/3', tex: String.raw`J = \frac{n_0\mathcal M_J^2B_0}{3kT} = \frac{2{,}69\cdot10^{25}\cdot6{,}74\cdot10^{-46}\cdot10^{-2}}{3\cdot1{,}38\cdot10^{-23}\cdot273} = 1{,}60\cdot10^{-2}\ \text{А/м}` },
      { title: 'Очень сильное поле: L → 1', tex: String.raw`J = n_0\mathcal M_J = 2{,}69\cdot10^{25}\cdot2{,}60\cdot10^{-23} = 698\ \text{А/м}` },
    ],
    answer: [String.raw`J_\text{слаб} = 16\ \text{мА/м};\quad J_\text{нас} = 698\ \text{А/м}`],
    note: SMALL + 'В книге 15,9 мА/м и 695 А/м (взято n₀ = 2,68·10²⁵ м⁻³).',
  },

  /* ===================== 27.13 ===================== */
  {
    id: '27.13', chapter: CH, section: S2, page: '378',
    title: 'Граница применимости L(a) ≈ a/3 по полю',
    given: [[String.raw`\mathcal M = \mu_\text{B}`, ''], [String.raw`T = 300\ \text{К}`, ''], [String.raw`\delta \le 1\%`, '']],
    find: String.raw`B_{\max} \;—\; ?`,
    formulas: [LANG],
    steps: [
      { title: 'Граница по a (см. 27.14)', tex: String.raw`a_{\max} = 0{,}388` },
      { title: 'Индукция', tex: String.raw`B = \frac{a_{\max}kT}{\mu_\text{B}} = \frac{0{,}388\cdot1{,}38\cdot10^{-23}\cdot300}{9{,}27\cdot10^{-24}} = 173\ \text{Тл}` },
    ],
    answer: [String.raw`B \gtrsim 173\ \text{Тл}`],
    note: MISMATCH + 'В книге 54 Тл. Это не согласуется с её же ответом к задаче 27.14 (a ≤ 0,387): 0,387·kT/μB = 173 Тл при T = 300 К.',
  },

  /* ===================== 27.14 ===================== */
  {
    id: '27.14', chapter: CH, section: S2, page: '378',
    title: 'Граница применимости L(a) ≈ a/3',
    given: [[String.raw`\delta \le 1\%`, '']],
    find: String.raw`a_{\max} \;—\; ?`,
    formulas: [LANG],
    steps: [
      { title: 'Относительная погрешность', tex: String.raw`\delta = \frac{a/3 - L(a)}{L(a)} \approx \frac{a^3/45}{a/3} = \frac{a^2}{15}` },
      { title: 'Оценка', tex: String.raw`\frac{a^2}{15} = 0{,}01\ \Rightarrow\ a = \sqrt{0{,}15} = 0{,}387` },
      { title: 'Проверка точным расчётом', tex: String.raw`a = 0{,}388:\quad \delta = 1{,}00\%` },
    ],
    answer: [String.raw`a \le 0{,}387`],
  },

  /* ===================== 27.15 ===================== */
  {
    id: '27.15', chapter: CH, section: S2, page: '378',
    title: 'Вероятность отрицательной проекции момента',
    given: [[String.raw`P = 10^{-3}`, ''], [String.raw`\mathcal M = \mu_\text{B}`, ''], [String.raw`B = 8\ \text{Тл}`, '']],
    find: String.raw`T \;—\; ?`,
    formulas: [{ tex: String.raw`dP \propto e^{a\cos\theta}d(\cos\theta)`, text: 'классическое (ланжевеновское) распределение направлений момента' }],
    steps: [
      { title: 'Доля cos θ < 0', tex: String.raw`P = \frac{\int_{-1}^0e^{ax}dx}{\int_{-1}^1e^{ax}dx} = \frac{1 - e^{-a}}{e^a - e^{-a}} = \frac{e^{-a}}{1 + e^{-a}} \approx e^{-a}` },
      { title: 'Параметр', tex: String.raw`a = \ln\frac{1 - P}{P} \approx 6{,}91` },
      { title: 'Температура', tex: String.raw`T = \frac{\mu_\text{B}B}{ka} = \frac{9{,}27\cdot10^{-24}\cdot8}{1{,}38\cdot10^{-23}\cdot6{,}91} = 0{,}78\ \text{К}` },
    ],
    answer: [String.raw`T = 0{,}78\ \text{К}`],
  },

  /* ===================== 27.16 ===================== */
  {
    id: '27.16', chapter: CH, section: S2, page: '378',
    title: 'Отношение чисел молекул с ± проекциями',
    given: [[String.raw`B = 1\ \text{Тл}`, ''], [String.raw`T_1 = 300\ \text{К},\ T_2 = 1\ \text{К}`, ''], [String.raw`\mathcal M = \mu_\text{B}`, '']],
    find: String.raw`N_+/N_- \;—\; ?`,
    formulas: [{ tex: String.raw`\frac{N_+}{N_-} = \frac{\int_0^1e^{ax}dx}{\int_{-1}^0e^{ax}dx} = e^a`, text: 'классическое распределение (как в 27.15)' }],
    steps: [
      { title: '1) T = 300 К', tex: String.raw`a = \frac{9{,}27\cdot10^{-24}}{1{,}38\cdot10^{-23}\cdot300} = 2{,}24\cdot10^{-3}\ \Rightarrow\ e^a = 1{,}0022` },
      { title: '2) T = 1 К', tex: String.raw`a = 0{,}672\ \Rightarrow\ e^a = 1{,}96` },
    ],
    answer: [String.raw`1)\ 1{,}0022;\quad 2)\ 1{,}96`],
    note: SMALL + 'Во втором случае в книге 1,91; e^0,672 = 1,96.',
  },

  /* ===================== 27.17 ===================== */
  {
    id: '27.17', chapter: CH, section: S2, page: '378',
    title: 'Та же намагниченность при большей температуре',
    given: [[String.raw`T_1 = 300\ \text{К},\ B_1 = 0{,}5\ \text{Тл}`, ''], [String.raw`T_2 = 450\ \text{К}`, '']],
    find: String.raw`B_2 \;—\; ?`,
    formulas: [LANG],
    steps: [{ title: 'J зависит только от a = 𝓜B/(kT)', tex: String.raw`\frac{B_1}{T_1} = \frac{B_2}{T_2}\ \Rightarrow\ B_2 = 0{,}5\cdot\frac{450}{300} = 0{,}75\ \text{Тл}` }],
    answer: [String.raw`B_2 = 0{,}75\ \text{Тл}`],
  },

  /* ===================== 27.18 ===================== */
  {
    id: '27.18', chapter: CH, section: S3, page: '378',
    title: 'Намагниченность стали',
    given: [[String.raw`H = 1600\ \text{А/м}`, '']],
    find: String.raw`J \;—\; ?`,
    formulas: [BJ],
    steps: [
      { title: 'По графику (сталь)', tex: String.raw`B \approx 1{,}23\text{–}1{,}25\ \text{Тл}` },
      { title: 'Намагниченность', tex: String.raw`J = \frac B{\mu_0} - H = \frac{1{,}24}{1{,}257\cdot10^{-6}} - 1600 \approx 9{,}9\cdot10^5\ \text{А/м}` },
    ],
    answer: [String.raw`J \approx 0{,}98\text{–}0{,}99\ \text{МА/м}\ (\text{книга: }991\ \text{кА/м})`],
    note: GRAPH + 'Ответ книги соответствует B = 1,247 Тл; наша оцифровка рис. 24.1 даёт 1,23 Тл (977 кА/м).',
  },

  /* ===================== 27.19 ===================== */
  {
    id: '27.19', chapter: CH, section: S3, page: '378',
    title: 'Проницаемость ферромагнитного бруска',
    given: [[String.raw`V = 10\ \text{см}^3`, String.raw`10^{-5}\ \text{м}^3`], [String.raw`H = 800\ \text{А/м}`, ''], [String.raw`p_m = 0{,}8\ \text{А·м}^2`, '']],
    find: String.raw`\mu \;—\; ?`,
    formulas: [JDEF, BJ],
    steps: [
      { title: 'Намагниченность', tex: String.raw`J = \frac{p_m}V = 8\cdot10^4\ \text{А/м},\quad \chi = \frac JH = 100` },
      { title: 'Проницаемость', tex: String.raw`\mu = 1 + \chi = 101` },
    ],
    answer: [String.raw`\mu = 101`],
  },

  /* ===================== 27.20 ===================== */
  {
    id: '27.20', chapter: CH, section: S3, page: '378',
    title: 'Магнетоны Бора на атом железа',
    given: [[String.raw`J_\text{нас} = 1{,}84\cdot10^6\ \text{А/м}`, ''], [String.raw`\rho = 7{,}87\cdot10^3\ \text{кг/м}^3,\ M = 0{,}056\ \text{кг/моль}`, '']],
    find: String.raw`\langle n\rangle \;—\; ?`,
    formulas: [{ tex: String.raw`J_\text{нас} = N\langle n\rangle\mu_\text{B},\quad N = \frac{\rho N_\text{A}}{M}`, text: 'концентрация атомов' }],
    steps: [
      { title: 'Концентрация', tex: String.raw`N = \frac{7870\cdot6{,}02\cdot10^{23}}{0{,}056} = 8{,}46\cdot10^{28}\ \text{м}^{-3}` },
      { title: 'Число магнетонов', tex: String.raw`\langle n\rangle = \frac{1{,}84\cdot10^6}{8{,}46\cdot10^{28}\cdot9{,}27\cdot10^{-24}} = 2{,}35` },
    ],
    answer: [String.raw`\langle n\rangle = 2{,}35\mu_\text{B}`],
    note: SMALL + 'В книге 2,36 (взята ρ = 7,8·10³ кг/м³).',
  },

  /* ===================== 27.21 ===================== */
  {
    id: '27.21', chapter: CH, section: S3, page: '379',
    title: 'Теоретическая намагниченность насыщения железа',
    given: [[String.raw`4\ \text{неспаренных электрона на атом}`, ''], [String.raw`N = 8{,}46\cdot10^{28}\ \text{м}^{-3}`, '']],
    find: String.raw`J_\text{нас} \;—\; ?`,
    formulas: [{ tex: String.raw`J_\text{нас} = 4\mu_\text{B}N`, text: 'спиновый момент электрона — один магнетон Бора' }],
    steps: [{ title: 'Намагниченность', tex: String.raw`J = 4\cdot9{,}27\cdot10^{-24}\cdot8{,}46\cdot10^{28} = 3{,}14\cdot10^6\ \text{А/м}` }],
    answer: [String.raw`J_\text{нас} \approx 3{,}13\ \text{МА/м}`],
  },

  /* ===================== 27.22 ===================== */
  {
    id: '27.22', chapter: CH, section: S3, page: '379',
    title: 'Индуцированные изменения на орбите',
    given: [[String.raw`r = 10^{-10}\ \text{м}`, ''], [String.raw`B = 0{,}2\ \text{Тл}`, '']],
    find: String.raw`\Delta\nu,\ I_\text{инд},\ \mathcal M_\text{инд} \;—\; ?`,
    formulas: [LARM],
    steps: [
      { title: '1) Изменение частоты', tex: String.raw`\Delta\nu = -\frac{\omega_\text{L}}{2\pi} = -\frac{eB}{4\pi m} = -\frac{1{,}6\cdot10^{-19}\cdot0{,}2}{4\pi\cdot9{,}11\cdot10^{-31}} = -2{,}80\cdot10^9\ \text{с}^{-1}` },
      { title: '2) Ток', tex: String.raw`I_\text{инд} = e|\Delta\nu| = \frac{e^2B}{4\pi m} = 4{,}47\cdot10^{-10}\ \text{А}` },
      { title: '3) Момент', tex: String.raw`\mathcal M_\text{инд} = -I_\text{инд}\pi r^2 = -\frac{e^2Br^2}{4m} = -4{,}47\cdot10^{-10}\cdot3{,}14\cdot10^{-20} = -1{,}41\cdot10^{-29}\ \text{А·м}^2` },
    ],
    answer: [String.raw`1)\ -2{,}80\cdot10^9\ \text{с}^{-1};\ 2)\ 4{,}47\cdot10^{-10}\ \text{А};\ 3)\ -1{,}41\cdot10^{-29}\ \text{А·м}^2`],
    note: TYPO + 'В пункте 3 ответа книги показатель степени 10⁻¹⁹; по формуле выходит 10⁻²⁹. Ток в книге 4,48·10⁻¹⁰ — расхождение в последней цифре.',
  },

  /* ===================== 27.23 ===================== */
  {
    id: '27.23', chapter: CH, section: S3, page: '379',
    title: 'Молярная намагниченность гелия',
    given: [[String.raw`B = 0{,}5\ \text{Тл}`, ''], [String.raw`\langle r^2\rangle = 3{,}4\cdot10^{-21}\ \text{м}^2`, ''], [String.raw`Z = 2`, '']],
    find: String.raw`J_m \;—\; ?`,
    formulas: [DIA],
    steps: [{ title: 'Сумма по двум электронам', tex: String.raw`J_m = -\frac{e^2N_\text{A}}{6m_e}\cdot2\langle r^2\rangle B = -\frac{2{,}56\cdot10^{-38}\cdot6{,}02\cdot10^{23}\cdot3{,}4\cdot10^{-21}\cdot0{,}5}{3\cdot9{,}11\cdot10^{-31}} = -9{,}6\cdot10^{-6}\ \text{А·м}^2\text{/моль}` }],
    answer: [String.raw`J_m = -\frac{e^2N_\text{A}}{3m_e}\langle r^2\rangle B = -9{,}6\ \text{мкА·м}^2\text{/моль}`],
    note: MISMATCH + 'В книге «−4 мкКл»: и число, и единица не согласуются с её же формулой. Подстановка в эту формулу даёт −9,6·10⁻⁶ А·м²/моль.',
  },

  /* ===================== 27.24 ===================== */
  {
    id: '27.24', chapter: CH, section: S3, page: '379',
    title: 'Радиус внешнего электронного слоя',
    given: [[String.raw`\text{Ne: }\chi_m = -9{,}05\cdot10^{-11}\ \text{м}^3\text{/моль}`, ''], [String.raw`\text{Ar: }\chi_m = -2{,}44\cdot10^{-11}\ \text{м}^3\text{/моль}`, ''], [String.raw`Z_\text{внешн} = 8`, '']],
    find: String.raw`\langle\rho\rangle \;—\; ?`,
    formulas: [DIA],
    steps: [
      { title: 'Из формулы Ланжевена–Паули', tex: String.raw`\langle\rho\rangle = \sqrt{\frac{6m_e|\chi_m|}{\mu_0e^2N_\text{A}Z_\text{внешн}}}` },
      { title: '1) Неон', tex: String.raw`\langle\rho\rangle = \sqrt{\frac{6\cdot9{,}11\cdot10^{-31}\cdot9{,}05\cdot10^{-11}}{1{,}257\cdot10^{-6}\cdot2{,}56\cdot10^{-38}\cdot6{,}02\cdot10^{23}\cdot8}} = 5{,}6\cdot10^{-11}\ \text{м}` },
      { title: '2) Аргон', text: 'С |χ_m| = 2,44·10⁻¹¹ из условия выходит 2,9·10⁻¹¹ м — меньше, чем у неона, чего быть не может. Справочное значение для аргона: |χ_m| = 2,44·10⁻¹⁰ м³/моль.',
        tex: String.raw`|\chi_m| = 2{,}44\cdot10^{-10}:\quad \langle\rho\rangle = 9{,}3\cdot10^{-11}\ \text{м}` },
    ],
    answer: [String.raw`1)\ 5{,}6\cdot10^{-11}\ \text{м};\quad 2)\ 9{,}3\cdot10^{-11}\ \text{м}`],
    note: '<b>Опечатка в условии.</b> Для аргона должно быть χ_m = −2,44·10⁻¹⁰ м³/моль. Ответ книги 9,3·10⁻¹¹ м получается именно с этим значением.',
  }

  );
})();
