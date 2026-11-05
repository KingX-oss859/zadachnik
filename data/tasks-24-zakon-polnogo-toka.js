/*
  § 24. Закон полного тока. Магнитный поток. Магнитные цепи — задачи 24.1–24.24 (стр. 349–352).
  Условия задач показываются дословно из книги (data/book-tasks.js).
  Ответы пересчитаны скриптом tools/check_zakon_polnogo_toka.py и сверены с book/99-otvety.md.
  Кривые B(H) железа, стали и чугуна — оцифровка рис. 24.1 (точность чтения ≈ ±0,02 Тл).
*/
(function () {
  const CH = 'Гл. 5. Электромагнетизм';
  const S1 = 'Закон полного тока';
  const S2 = 'Магнитный поток';
  const S3 = 'Магнитная индукция в ферромагнетике';
  const S4 = 'Магнитные цепи';
  const MISMATCH = '<b>Расхождение с ответом книги.</b> ';
  const SMALL = '<b>Расхождение в последней цифре.</b> ';
  const GRAPH = '<b>Чтение графика.</b> ';

  const CIRC = { tex: String.raw`\oint B_l\,dl = \mu_0\sum I_k,\quad \oint H_l\,dl = \sum I_k`, text: 'закон полного тока (теорема о циркуляции)' };
  const FLUX = { tex: String.raw`\Phi = BS\cos\alpha,\quad \Phi = \int B\,dS`, text: 'магнитный поток; α — угол между B и нормалью' };
  const SOL = { tex: String.raw`B = \mu_0nI`, text: 'поле внутри длинного соленоида' };
  const LINE = { tex: String.raw`B = \frac{\mu_0I}{2\pi x}`, text: 'поле прямого тока' };
  const TOR = { tex: String.raw`B = \frac{\mu_0IN}{2\pi r}`, text: 'поле тороида на расстоянии r от центра' };
  const MU = { tex: String.raw`B = \mu\mu_0H,\quad \mu = \frac{B}{\mu_0H}`, text: 'B(H) ферромагнетика берём по графику рис. 24.1' };
  const CHAIN = { tex: String.raw`IN = Hl + \frac{B}{\mu_0}l_0`, text: 'закон полного тока для сердечника с зазором (B в сердечнике и в зазоре одинакова)' };

  window.TASKS.push(

  /* ===================== 24.1 ===================== */
  {
    id: '24.1', chapter: CH, section: S1, page: '349',
    title: 'Циркуляция B у соленоида',
    given: [[String.raw`l = 1\ \text{м},\ N = 10^3`, ''], [String.raw`I = 20\ \text{А}`, '']],
    find: String.raw`\oint B_l\,dl \;—\; ?`,
    formulas: [CIRC, SOL],
    steps: [
      { title: 'а) Контур целиком внутри соленоида', text: 'Контур не охватывает ни одного витка, поэтому циркуляция равна нулю. Вклады сторон 1–2 и 3–4 одинаковы и противоположны.',
        tex: String.raw`\oint B_l\,dl = 0` },
      { title: 'б) Контур пересекает обмотку', text: 'Сторона a идёт внутри соленоида вдоль оси, остальные стороны — снаружи (там B ≈ 0) или поперёк поля. Контур охватывает Na/l витков.',
        tex: String.raw`\oint B_l\,dl = Ba = \mu_0\frac{N}{l}Ia = \frac{4\pi\cdot10^{-7}\cdot10^3\cdot20}{1}\,a = 25{,}1\ \text{мТл}\cdot a` },
    ],
    answer: [String.raw`а)\ 0;\quad б)\ \oint B_l\,dl = \frac{\mu_0NI}{l}a = 25{,}1\ \text{мТл·м на 1 м стороны }a`],
    note: SMALL + 'В книге 25,2 мТл·м (точно 25,13). Длина стороны a в условии не дана: ответ книги — на единицу длины a.',
  },

  /* ===================== 24.2 ===================== */
  {
    id: '24.2', chapter: CH, section: S1, page: '349',
    title: 'Циркуляция вокруг трёх токов',
    given: [[String.raw`I_1 = 10\ \text{А},\ I_2 = 15\ \text{А}`, ''], [String.raw`I_3 = -20\ \text{А}`, '']],
    find: String.raw`\oint B_l\,dl \;—\; ?`,
    formulas: [CIRC],
    steps: [{ title: 'Алгебраическая сумма токов', tex: String.raw`\oint B_l\,dl = \mu_0(10 + 15 - 20) = 4\pi\cdot10^{-7}\cdot5 = 6{,}28\cdot10^{-6}\ \text{Тл·м}` }],
    answer: [String.raw`\oint B_l\,dl = 6{,}28\ \text{мкТл·м}`],
  },

  /* ===================== 24.3 ===================== */
  {
    id: '24.3', chapter: CH, section: S1, page: '349',
    title: 'Наклонная окружность внутри проводника',
    given: [[String.raw`j = 2\cdot10^6\ \text{А/м}^2`, ''], [String.raw`R = 5\ \text{мм}`, String.raw`5\cdot10^{-3}\ \text{м}`], [String.raw`\alpha = 30^\circ`, '']],
    find: String.raw`\oint H_l\,dl \;—\; ?`,
    formulas: [CIRC],
    steps: [{ title: 'Ток через круг', text: 'Через круг проходит только перпендикулярная его плоскости составляющая плотности тока, j sin α.',
      tex: String.raw`\oint H_l\,dl = j\pi R^2\sin\alpha = 2\cdot10^6\cdot\pi\cdot25\cdot10^{-6}\cdot0{,}5 = 78{,}5\ \text{А}` }],
    answer: [String.raw`\oint H_l\,dl = \pi R^2j\sin\alpha = 78{,}5\ \text{А}`],
    note: SMALL + 'В книге 78,6; точно 78,54.',
  },

  /* ===================== 24.4 ===================== */
  {
    id: '24.4', chapter: CH, section: S1, page: '349',
    title: 'Наибольшая и наименьшая индукция в тороиде',
    given: [[String.raw`D = 30\ \text{см}`, String.raw`0{,}3\ \text{м}`], [String.raw`r = 5\ \text{см}`, String.raw`0{,}05\ \text{м}`], [String.raw`N = 2000,\ I = 5\ \text{А}`, '']],
    find: String.raw`B_{\max},\ B_{\min} \;—\; ?`,
    formulas: [CIRC, TOR],
    steps: [
      { title: 'Внутренний край (D/2 − r = 10 см)', tex: String.raw`B_{\max} = \frac{4\pi\cdot10^{-7}\cdot5\cdot2000}{2\pi\cdot0{,}1} = 0{,}02\ \text{Тл}` },
      { title: 'Внешний край (D/2 + r = 20 см)', tex: String.raw`B_{\min} = \frac{4\pi\cdot10^{-7}\cdot10^4}{2\pi\cdot0{,}2} = 0{,}01\ \text{Тл}` },
    ],
    answer: [String.raw`B_{\max} = 20\ \text{мТл};\quad B_{\min} = 10\ \text{мТл}`],
  },

  /* ===================== 24.5 ===================== */
  {
    id: '24.5', chapter: CH, section: S2, page: '349',
    title: 'Поток соленоида',
    given: [[String.raw`S = 10\ \text{см}^2`, String.raw`10^{-3}\ \text{м}^2`], [String.raw`n = 10\ \text{см}^{-1}`, String.raw`10^3\ \text{м}^{-1}`], [String.raw`I = 20\ \text{А}`, '']],
    find: String.raw`\Phi \;—\; ?`,
    formulas: [SOL, FLUX],
    steps: [{ title: 'Поток', tex: String.raw`\Phi = \mu_0nIS = 4\pi\cdot10^{-7}\cdot10^3\cdot20\cdot10^{-3} = 2{,}51\cdot10^{-5}\ \text{Вб}` }],
    answer: [String.raw`\Phi = 25{,}1\ \text{мкВб}`],
    note: SMALL + 'В книге 25,2; точно 25,13.',
  },

  /* ===================== 24.6 ===================== */
  {
    id: '24.6', chapter: CH, section: S2, page: '349',
    title: 'Поток через наклонный контур',
    given: [[String.raw`S = 25\ \text{см}^2`, String.raw`2{,}5\cdot10^{-3}\ \text{м}^2`], [String.raw`B = 0{,}04\ \text{Тл}`, ''], [String.raw`\beta = 30^\circ`, '']],
    find: String.raw`\Phi \;—\; ?`,
    formulas: [FLUX],
    steps: [{ title: 'Угол с плоскостью β → с нормалью 90° − β', tex: String.raw`\Phi = BS\sin\beta = 0{,}04\cdot2{,}5\cdot10^{-3}\cdot0{,}5 = 5\cdot10^{-5}\ \text{Вб}` }],
    answer: [String.raw`\Phi = 50\ \text{мкВб}`],
  },

  /* ===================== 24.7 ===================== */
  {
    id: '24.7', chapter: CH, section: S2, page: '349',
    title: 'Поток полюса по работе',
    given: [[String.raw`I = 100\ \text{А}`, ''], [String.raw`A = 1\ \text{мДж}`, String.raw`10^{-3}\ \text{Дж}`], [String.raw`k = 2\ \text{оборота}`, '']],
    find: String.raw`\Phi \;—\; ?`,
    formulas: [{ tex: String.raw`A = I\Phi`, text: 'работа при одном обходе: поток полюса один раз пересекает ток' }],
    steps: [{ title: 'Два обхода', tex: String.raw`A = 2I\Phi\ \Rightarrow\ \Phi = \frac{10^{-3}}{200} = 5\cdot10^{-6}\ \text{Вб}` }],
    answer: [String.raw`\Phi = 5\ \text{мкВб}`],
  },

  /* ===================== 24.8 ===================== */
  {
    id: '24.8', chapter: CH, section: S2, page: '350',
    title: 'Потокосцепление соленоида',
    given: [[String.raw`l = 1\ \text{м}`, ''], [String.raw`S = 16\ \text{см}^2`, String.raw`1{,}6\cdot10^{-3}\ \text{м}^2`], [String.raw`N = 2000,\ I = 10\ \text{А}`, '']],
    find: String.raw`\Psi \;—\; ?`,
    formulas: [SOL, { tex: String.raw`\Psi = N\Phi`, text: 'потокосцепление' }],
    steps: [{ title: 'Потокосцепление', tex: String.raw`\Psi = N\mu_0\frac NlIS = \frac{4\pi\cdot10^{-7}\cdot4\cdot10^6\cdot10\cdot1{,}6\cdot10^{-3}}{1} = 8{,}04\cdot10^{-2}\ \text{Вб}` }],
    answer: [String.raw`\Psi = \mu_0IN^2S/l = 80{,}4\ \text{мВб}`],
    note: SMALL + 'В книге 80,5; точно 80,42.',
  },

  /* ===================== 24.9 ===================== */
  {
    id: '24.9', chapter: CH, section: S2, page: '350',
    title: 'Поток провода через квадратную рамку',
    given: [[String.raw`a = 20\ \text{см}`, String.raw`0{,}2\ \text{м}`], [String.raw`I = 100\ \text{А}`, ''], [String.raw`l = 10\ \text{см}`, String.raw`0{,}1\ \text{м}`]],
    find: String.raw`\Phi \;—\; ?`,
    formulas: [LINE, FLUX],
    steps: [
      { title: 'Полоска dS = a dx на расстоянии x (рис. 24.2)', tex: String.raw`\Phi = \int_l^{l + a}\frac{\mu_0I}{2\pi x}a\,dx = \frac{\mu_0Ia}{2\pi}\ln\frac{l + a}{l}` },
      { title: 'Считаем', tex: String.raw`\Phi = 2\cdot10^{-7}\cdot100\cdot0{,}2\cdot\ln3 = 4\cdot10^{-6}\cdot1{,}099 = 4{,}39\cdot10^{-6}\ \text{Вб}` },
    ],
    answer: [String.raw`\Phi = \frac{\mu_0Ia}{2\pi}\ln\frac{l + a}{l} = 4{,}39\ \text{мкВб}`],
    note: MISMATCH + 'В книге 1,62 мкВб и под логарифмом (l + a)/a. Это ошибка: интеграл идёт от ближней стороны рамки (x = l) до дальней (x = l + a), поэтому стоит ln((l + a)/l) = ln 3. Ответ 1,62 соответствует ln 1,5, то есть рамке, отстоящей на 20 см.',
  },

  /* ===================== 24.10 ===================== */
  {
    id: '24.10', chapter: CH, section: S2, page: '350',
    title: 'Два положения рамки',
    given: [[String.raw`\text{I: от } a \text{ до } 2a`, ''], [String.raw`\text{II: от } 5a \text{ до } 6a`, '']],
    find: String.raw`\Phi_1/\Phi_2 \;—\; ?`,
    formulas: [LINE, FLUX],
    steps: [{ title: 'Отношение логарифмов (см. 24.9)', tex: String.raw`\frac{\Phi_1}{\Phi_2} = \frac{\ln(2a/a)}{\ln(6a/5a)} = \frac{0{,}693}{0{,}182} = 3{,}80` }],
    answer: [String.raw`\Phi_1/\Phi_2 = 3{,}80`],
    note: SMALL + 'В книге 3,81; точно 3,802.',
  },

  /* ===================== 24.11 ===================== */
  {
    id: '24.11', chapter: CH, section: S2, page: '350',
    title: 'Погрешность «однородного» расчёта потока',
    given: [[String.raw`a = 20\ \text{см}`, ''], [String.raw`l = 1\ \text{м}`, '']],
    find: String.raw`\Delta\Phi/\Phi \;—\; ?`,
    formulas: [LINE, FLUX],
    steps: [
      { title: 'Точно и приближённо', tex: String.raw`\Phi = \frac{\mu_0Ia}{2\pi}\ln\frac{l + a/2}{l - a/2},\quad \Phi_0 = \frac{\mu_0I}{2\pi l}a^2` },
      { title: 'Разложение при x = a/(2l) ≪ 1', tex: String.raw`\ln\frac{1 + x}{1 - x} = 2x + \frac{2x^3}{3} + \ldots\ \Rightarrow\ \frac{\Phi - \Phi_0}{\Phi} \approx \frac{x^2}3 = \frac{1}{12}\left(\frac al\right)^2` },
      { title: 'Считаем', tex: String.raw`\frac{\Delta\Phi}{\Phi} = \frac{0{,}04}{12} = 0{,}33\%` },
    ],
    answer: [String.raw`\frac{\Delta\Phi}{\Phi} = \frac1{12}\left(\frac al\right)^2 = 0{,}33\%`],
    note: MISMATCH + 'В книге формула (1/24)(a/l)² и число 0,617 %. Они не согласуются друг с другом: (1/24)·0,04 = 0,167 %. Точный расчёт — 0,334 %, что совпадает с разложением (1/12)(a/l)².',
  },

  /* ===================== 24.12 ===================== */
  {
    id: '24.12', chapter: CH, section: S2, page: '350',
    title: 'Поток в тороиде квадратного сечения',
    given: [[String.raw`N = 1000,\ I = 10\ \text{А}`, ''], [String.raw`D = 40\ \text{см},\ d = 20\ \text{см}`, '']],
    find: String.raw`\Phi \;—\; ?`,
    formulas: [TOR, FLUX],
    steps: [
      { title: 'Сечение — квадрат со стороной h = (D − d)/2', tex: String.raw`\Phi = \int_{d/2}^{D/2}\frac{\mu_0IN}{2\pi r}h\,dr = \frac{\mu_0IN}{4\pi}(D - d)\ln\frac Dd` },
      { title: 'Считаем', tex: String.raw`\Phi = 10^{-7}\cdot10^4\cdot0{,}2\cdot\ln2 = 1{,}39\cdot10^{-4}\ \text{Вб}` },
    ],
    answer: [String.raw`\Phi = 139\ \text{мкВб}`],
  },

  /* ===================== 24.13 ===================== */
  {
    id: '24.13', chapter: CH, section: S3, page: '350',
    title: 'Железо при H = 1 кА/м',
    given: [[String.raw`H = 1\ \text{кА/м}`, String.raw`10^3\ \text{А/м}`]],
    find: String.raw`B,\ \mu \;—\; ?`,
    formulas: [MU],
    steps: [
      { title: 'По графику', tex: String.raw`B = 1{,}29\ \text{Тл}` },
      { title: 'Проницаемость', tex: String.raw`\mu = \frac{1{,}29}{4\pi\cdot10^{-7}\cdot10^3} = 1{,}03\cdot10^3` },
    ],
    answer: [String.raw`B = 1{,}29\ \text{Тл};\quad \mu = 1{,}03\cdot10^3`],
  },

  /* ===================== 24.14 ===================== */
  {
    id: '24.14', chapter: CH, section: S3, page: '350–351', bookFig: '24.1',
    title: 'Железное кольцо с обмоткой',
    given: [[String.raw`N = 500`, ''], [String.raw`d = 25\ \text{см}`, String.raw`l = \pi d = 0{,}785\ \text{м}`], [String.raw`I_1 = 0{,}5\ \text{А},\ I_2 = 2{,}5\ \text{А}`, '']],
    find: String.raw`B,\ \mu \;—\; ?`,
    formulas: [CIRC, MU],
    steps: [
      { title: 'Напряжённость', tex: String.raw`H = \frac{NI}{\pi d}:\quad H_1 = 318\ \text{А/м},\quad H_2 = 1592\ \text{А/м}` },
      { title: '1) I = 0,5 А', tex: String.raw`B_1 \approx 1{,}0\ \text{Тл},\quad \mu_1 = \frac{1{,}0}{4\pi\cdot10^{-7}\cdot318} = 2{,}5\cdot10^3` },
      { title: '2) I = 2,5 А', tex: String.raw`B_2 \approx 1{,}4\ \text{Тл},\quad \mu_2 = \frac{1{,}4}{4\pi\cdot10^{-7}\cdot1592} = 700` },
    ],
    answer: [String.raw`1)\ 1\ \text{Тл},\ 2{,}5\cdot10^3;\quad 2)\ 1{,}4\ \text{Тл},\ 700`],
  },

  /* ===================== 24.15 ===================== */
  {
    id: '24.15', chapter: CH, section: S3, page: '351', bookFig: '24.1',
    title: 'Поток в стальном сердечнике',
    given: [[String.raw`n = 10\ \text{см}^{-1}`, String.raw`10^3\ \text{м}^{-1}`], [String.raw`I = 2\ \text{А}`, ''], [String.raw`S = 4\ \text{см}^2`, String.raw`4\cdot10^{-4}\ \text{м}^2`]],
    find: String.raw`\Phi \;—\; ?`,
    formulas: [CIRC, MU],
    steps: [
      { title: 'Напряжённость и индукция', tex: String.raw`H = nI = 2000\ \text{А/м}\ \Rightarrow\ B \approx 1{,}3\ \text{Тл}\ (\text{сталь})` },
      { title: 'Поток', tex: String.raw`\Phi = BS \approx 1{,}3\cdot4\cdot10^{-4} = 0{,}52\cdot10^{-3}\ \text{Вб}` },
    ],
    answer: [String.raw`\Phi \approx 0{,}52\text{–}0{,}53\ \text{мВб}`],
    note: GRAPH + 'Книга читает B = 1,32 Тл и получает 0,53 мВб, наше чтение — 1,29–1,30 Тл. Разница в пределах точности графика.',
  },

  /* ===================== 24.16 ===================== */
  {
    id: '24.16', chapter: CH, section: S3, page: '351', bookFig: '24.1',
    title: 'МДС для потока 0,3 мВб',
    given: [[String.raw`\Phi = 0{,}3\ \text{мВб}`, String.raw`3\cdot10^{-4}\ \text{Вб}`], [String.raw`l = 120\ \text{см}`, String.raw`1{,}2\ \text{м}`], [String.raw`S = 2{,}5\ \text{см}^2`, String.raw`2{,}5\cdot10^{-4}\ \text{м}^2`]],
    find: String.raw`F_m \;—\; ?`,
    formulas: [CIRC, MU, { tex: String.raw`F_m = IN = Hl`, text: 'магнитодвижущая сила' }],
    steps: [
      { title: 'Индукция', tex: String.raw`B = \frac\Phi S = 1{,}2\ \text{Тл}\ \Rightarrow\ H \approx 700\ \text{А/м}\ (\text{железо})` },
      { title: 'МДС', tex: String.raw`F_m = Hl = 700\cdot1{,}2 = 840\ \text{А}` },
    ],
    answer: [String.raw`F_m \approx 840\ \text{А}`],
  },

  /* ===================== 24.17 ===================== */
  {
    id: '24.17', chapter: CH, section: S3, page: '351', bookFig: '24.1',
    title: 'Обмотка на чугунном кольце',
    given: [[String.raw`S = 5\ \text{см}^2`, String.raw`5\cdot10^{-4}\ \text{м}^2`], [String.raw`I = 1\ \text{А}`, ''], [String.raw`\Phi = 250\ \text{мкВб}`, String.raw`2{,}5\cdot10^{-4}\ \text{Вб}`]],
    find: String.raw`n \;—\; ?`,
    formulas: [CIRC, MU],
    steps: [
      { title: 'Индукция', tex: String.raw`B = \frac\Phi S = 0{,}5\ \text{Тл}\ \Rightarrow\ H \approx 1{,}5\ \text{кА/м}\ (\text{чугун})` },
      { title: 'Витки', tex: String.raw`n = \frac HI \approx 1500\ \text{м}^{-1} = 15\ \text{см}^{-1}` },
    ],
    answer: [String.raw`n \approx 15\ \text{витков на 1 см}`],
  },

  /* ===================== 24.18 ===================== */
  {
    id: '24.18', chapter: CH, section: S4, page: '351',
    title: 'Увеличили зазор в 3 раза',
    given: [[String.raw`d = 51\ \text{см}`, String.raw`l = \pi d = 1{,}60\ \text{м}`], [String.raw`l_0 = 2\ \text{мм}`, ''], [String.raw`n = 3,\ \mu = 800`, '']],
    find: String.raw`B_1/B_2 \;—\; ?`,
    formulas: [{ tex: String.raw`IN = \frac{B}{\mu_0}\left(\frac l\mu + l_0\right)`, text: 'закон полного тока для цепи с зазором' }],
    steps: [
      { title: 'Магнитное сопротивление сердечника', tex: String.raw`\frac l\mu = \frac{1{,}60}{800} = 2{,}0\cdot10^{-3}\ \text{м}` },
      { title: 'Отношение', tex: String.raw`\frac{B_1}{B_2} = \frac{l/\mu + 3l_0}{l/\mu + l_0} = \frac{2 + 6}{2 + 2} = 2` },
    ],
    answer: [String.raw`\text{уменьшится в 2 раза}`],
  },

  /* ===================== 24.19 ===================== */
  {
    id: '24.19', chapter: CH, section: S4, page: '351', bookFig: '24.1',
    title: 'МДС электромагнита с воздушным зазором',
    given: [[String.raw`B = 1{,}4\ \text{Тл}`, ''], [String.raw`l = 90\ \text{см}`, String.raw`0{,}9\ \text{м}`], [String.raw`l_0 = 5\ \text{мм}`, String.raw`5\cdot10^{-3}\ \text{м}`]],
    find: String.raw`F_m \;—\; ?`,
    formulas: [CHAIN, MU],
    steps: [
      { title: 'Железо при 1,4 Тл', tex: String.raw`H \approx 1{,}7\ \text{кА/м}` },
      { title: 'МДС', tex: String.raw`F_m = 1700\cdot0{,}9 + \frac{1{,}4\cdot5\cdot10^{-3}}{4\pi\cdot10^{-7}} = 1530 + 5570 = 7{,}1\cdot10^3\ \text{А}` },
    ],
    answer: [String.raw`F_m \approx 7{,}1\ \text{кА}`],
  },

  /* ===================== 24.20 ===================== */
  {
    id: '24.20', chapter: CH, section: S4, page: '351', bookFig: '24.1',
    title: 'Железо заменили сталью',
    given: [[String.raw`B = 1{,}3\ \text{Тл}`, '']],
    find: String.raw`I_2/I_1 \;—\; ?`,
    formulas: [CIRC, MU],
    steps: [
      { title: 'По графику', tex: String.raw`H_\text{ж} \approx 1{,}05\ \text{кА/м},\quad H_\text{ст} \approx 2{,}1\text{–}2{,}5\ \text{кА/м}` },
      { title: 'Ток пропорционален H', tex: String.raw`\frac{I_2}{I_1} = \frac{H_\text{ст}}{H_\text{ж}} \approx 2\text{–}2{,}4` },
    ],
    answer: [String.raw`\text{увеличить примерно в 2–2,4 раза (по книге — в 2,4)}`],
    note: GRAPH + 'Кривая стали около 1,3 Тл почти горизонтальна, поэтому H по ней читается неточно. Наша оцифровка рис. 24.1 даёт H ≈ 2,1 кА/м и отношение ≈ 2,0. Книга берёт H ≈ 2,5 кА/м и получает 2,4.',
  },

  /* ===================== 24.21 ===================== */
  {
    id: '24.21', chapter: CH, section: S4, page: '351', bookFig: '24.1',
    title: 'Ток для 1 Тл в зазоре',
    given: [[String.raw`l = 1\ \text{м}`, ''], [String.raw`l_0 = 4\ \text{мм}`, String.raw`4\cdot10^{-3}\ \text{м}`], [String.raw`n = 8\ \text{см}^{-1}`, String.raw`800\ \text{м}^{-1}`], [String.raw`B = 1\ \text{Тл}`, '']],
    find: String.raw`I \;—\; ?`,
    formulas: [CHAIN, MU],
    steps: [
      { title: 'Сталь при 1 Тл', tex: String.raw`H \approx 750\ \text{А/м}` },
      { title: 'Ток (N = nl)', tex: String.raw`I = \frac{Hl + Bl_0/\mu_0}{nl} = \frac{750 + 3183}{800} = 4{,}9\ \text{А}` },
    ],
    answer: [String.raw`I \approx 5\ \text{А}`],
  },

  /* ===================== 24.22 ===================== */
  {
    id: '24.22', chapter: CH, section: S4, page: '351', bookFig: '24.1',
    title: 'Длина зазора для 0,5 Тл',
    given: [[String.raw`N = 1000,\ I = 1\ \text{А}`, ''], [String.raw`B = 0{,}5\ \text{Тл}`, ''], [String.raw`l = 1\ \text{м}`, '']],
    find: String.raw`l_0 \;—\; ?`,
    formulas: [CHAIN, MU],
    steps: [
      { title: 'Сталь при 0,5 Тл', tex: String.raw`H \approx 220\ \text{А/м}` },
      { title: 'Зазор', tex: String.raw`l_0 = \frac{(IN - Hl)\mu_0}{B} = \frac{(1000 - 220)\cdot1{,}257\cdot10^{-6}}{0{,}5} = 1{,}96\cdot10^{-3}\ \text{м}` },
    ],
    answer: [String.raw`l_0 \approx 2{,}0\ \text{мм}\ (\text{в книге }2{,}25\ \text{мм})`],
    note: GRAPH + 'По рис. 24.1 сталь достигает 0,5 Тл при H ≈ 220 А/м, отсюда l₀ ≈ 2,0 мм. Ответ книги 2,25 мм соответствует H ≈ 100 А/м — это за левым краем графика (он начинается с 200 А/м).',
  },

  /* ===================== 24.23 ===================== */
  {
    id: '24.23', chapter: CH, section: S4, page: '352', bookFig: '24.1',
    title: 'МДС для 1,4 Тл в зазоре',
    given: [[String.raw`l_0 = 3{,}6\ \text{мм}`, String.raw`3{,}6\cdot10^{-3}\ \text{м}`], [String.raw`B = 1{,}4\ \text{Тл}`, ''], [String.raw`l = 0{,}8\ \text{м}`, '']],
    find: String.raw`F_m \;—\; ?`,
    formulas: [CHAIN, MU],
    steps: [
      { title: 'Железо при 1,4 Тл (как в 24.19)', tex: String.raw`H \approx 1{,}7\ \text{кА/м}` },
      { title: 'МДС', tex: String.raw`F_m = 1700\cdot0{,}8 + \frac{1{,}4\cdot3{,}6\cdot10^{-3}}{1{,}257\cdot10^{-6}} = 1360 + 4010 = 5{,}4\cdot10^3\ \text{А}` },
    ],
    answer: [String.raw`F_m \approx 5{,}4\ \text{кА}\ (\text{в книге }5{,}8\ \text{кА})`],
    note: GRAPH + 'Зазор даёт 4,0 кА — эта часть точная. Ответ книги 5,8 кА требует H ≈ 2,2 кА/м, а в задаче 24.19 книга для того же железа при 1,4 Тл брала H ≈ 1,7 кА/м. С единым чтением графика выходит 5,4 кА.',
  },

  /* ===================== 24.24 ===================== */
  {
    id: '24.24', chapter: CH, section: S4, page: '352', bookFig: '24.1',
    title: 'Как изменить зазор, чтобы удвоить поток',
    given: [[String.raw`l = 1{,}2\ \text{м}`, ''], [String.raw`S = 20\ \text{см}^2`, String.raw`2\cdot10^{-3}\ \text{м}^2`], [String.raw`\Phi = 0{,}5\ \text{мВб}`, String.raw`B_1 = 0{,}25\ \text{Тл}`], [String.raw`l_0 = 8\ \text{мм}`, '']],
    find: String.raw`l_0' \;—\; ?`,
    formulas: [CHAIN, MU],
    steps: [
      { title: 'МДС (чугун при 0,25 Тл: H₁ ≈ 0,57 кА/м)', tex: String.raw`IN = 570\cdot1{,}2 + \frac{0{,}25\cdot8\cdot10^{-3}}{1{,}257\cdot10^{-6}} = 684 + 1592 = 2276\ \text{А}` },
      { title: 'Новый зазор (B₂ = 0,5 Тл: H₂ ≈ 1,55 кА/м)', tex: String.raw`l_0' = \frac{(IN - H_2l)\mu_0}{B_2} = \frac{(2276 - 1860)\cdot1{,}257\cdot10^{-6}}{0{,}5} \approx 1{,}0\cdot10^{-3}\ \text{м}` },
    ],
    answer: [String.raw`l_0' \approx 1\ \text{мм}\ (\text{в книге }1{,}8\ \text{мм})`],
    note: GRAPH + 'Ответ здесь — малая разность двух близких чисел, поэтому он очень чувствителен к чтению кривой чугуна. При H₂ = 1,5 кА/м (как в 24.17) выходит 1,1 мм; книга, по-видимому, брала H₂ ≈ 1,2 кА/м. По оцифровке рис. 24.1 — около 1 мм.',
  }

  );
})();
