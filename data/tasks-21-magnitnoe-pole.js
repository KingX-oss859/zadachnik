/*
  § 21. Магнитное поле постоянного тока — задачи 21.1–21.35 (стр. 316–320).
  Условия задач показываются дословно из книги (data/book-tasks.js).
  Ответы пересчитаны скриптом tools/check_magnitnoe_pole.py (поля контуров — численно по закону
  Био–Савара–Лапласа) и сверены с book/99-otvety.md.
  Где ответ книги расходится с расчётом — плашка note «Расхождение с ответом книги».
  μ₀ = 4π·10⁻⁷ Гн/м; e = 1,60·10⁻¹⁹ Кл; mₑ = 9,11·10⁻³¹ кг.
*/
(function () {
  const CH = 'Гл. 5. Электромагнетизм';
  const S1 = 'Связь между напряжённостью и индукцией магнитного поля в вакууме';
  const S2 = 'Поле кругового тока и соленоида';
  const S3 = 'Поле прямого тока';
  const S4 = 'Поле движущегося заряда';
  const MISMATCH = '<b>Расхождение с ответом книги.</b> ';
  const SMALL = '<b>Расхождение в последней цифре.</b> ';
  const TYPO = '<b>Опечатка в ответе книги.</b> ';

  const BH = { tex: String.raw`B_0 = \mu_0H,\quad \mu_0 = 4\pi\cdot10^{-7}\ \text{Гн/м}`, text: 'связь индукции и напряжённости в вакууме' };
  const BRING = { tex: String.raw`B = \frac{\mu_0I}{2R}`, text: 'индукция в центре кругового витка' };
  const BAXIS = { tex: String.raw`B = \frac{\mu_0IR^2}{2(R^2 + x^2)^{3/2}}`, text: 'индукция на оси витка на расстоянии x от центра' };
  const BSOL = { tex: String.raw`B = \frac{\mu_0nI}{2}(\cos\alpha_1 + \cos\alpha_2)`, text: 'индукция на оси соленоида конечной длины; α₁, α₂ — углы, под которыми из точки видны радиусы концевых витков (отсчитываются от оси)' };
  const BINF = { tex: String.raw`B = \mu_0nI`, text: 'бесконечный соленоид; n — витков на единицу длины' };
  const BLINE = { tex: String.raw`B = \frac{\mu_0I}{2\pi r_0}`, text: 'бесконечный прямой провод' };
  const BSEG = { tex: String.raw`B = \frac{\mu_0I}{4\pi r_0}(\cos\varphi_1 - \cos\varphi_2)`, text: 'отрезок прямого провода (рис. 21.1); для полубесконечного провода, кончающегося у основания перпендикуляра, B = μ₀I/(4πr₀)' };
  const BARC = { tex: String.raw`B = \frac{\mu_0I}{2R}\cdot\frac{\theta}{2\pi}`, text: 'дуга окружности с центральным углом θ — доля поля целого витка' };
  const SUP = { tex: String.raw`\mathbf B = \sum\mathbf B_i,\quad B = \sqrt{B_1^2 + B_2^2 + 2B_1B_2\cos\alpha}`, text: 'принцип суперпозиции' };
  const BQ = { tex: String.raw`B = \frac{\mu_0}{4\pi}\frac{Qv\sin\alpha}{r^2}`, text: 'индукция поля движущегося заряда' };

  window.TASKS.push(

  /* ===================== 21.1 ===================== */
  {
    id: '21.1', chapter: CH, section: S1, page: '316',
    title: 'Индукция по напряжённости',
    given: [[String.raw`H = 79{,}6\ \text{кА/м}`, String.raw`7{,}96\cdot10^4\ \text{А/м}`]],
    find: String.raw`B_0 \;—\; ?`,
    formulas: [BH],
    steps: [
      { title: 'Индукция',
        tex: String.raw`B_0 = 4\pi\cdot10^{-7}\cdot7{,}96\cdot10^4 = 0{,}1\ \text{Тл}` },
    ],
    answer: [String.raw`B_0 = 0{,}1\ \text{Тл}`],
  },

  /* ===================== 21.2 ===================== */
  {
    id: '21.2', chapter: CH, section: S1, page: '316',
    title: 'Напряжённость по индукции (10 мТл)',
    given: [[String.raw`B = 10\ \text{мТл}`, String.raw`10^{-2}\ \text{Тл}`]],
    find: String.raw`H \;—\; ?`,
    formulas: [BH],
    steps: [
      { title: 'Напряжённость',
        tex: String.raw`H = \frac{B}{\mu_0} = \frac{10^{-2}}{4\pi\cdot10^{-7}} = 7{,}96\cdot10^3\ \text{А/м}` },
    ],
    answer: [String.raw`H = 7{,}96\ \text{кА/м}`],
  },

  /* ===================== 21.3 ===================== */
  {
    id: '21.3', chapter: CH, section: S1, page: '316',
    title: 'Напряжённость по индукции (0,05 Тл)',
    given: [[String.raw`B_0 = 0{,}05\ \text{Тл}`, '']],
    find: String.raw`H \;—\; ?`,
    formulas: [BH],
    steps: [
      { title: 'Напряжённость',
        tex: String.raw`H = \frac{0{,}05}{4\pi\cdot10^{-7}} = 3{,}98\cdot10^4\ \text{А/м}` },
    ],
    answer: [String.raw`H = 39{,}8\ \text{кА/м}`],
  },

  /* ===================== 21.4 ===================== */
  {
    id: '21.4', chapter: CH, section: S2, page: '316',
    title: 'Индукция в центре кольца',
    given: [[String.raw`I = 10\ \text{А}`, ''], [String.raw`R = 5\ \text{см}`, String.raw`0{,}05\ \text{м}`]],
    find: String.raw`B \;—\; ?`,
    formulas: [BRING],
    steps: [
      { title: 'Индукция',
        tex: String.raw`B = \frac{4\pi\cdot10^{-7}\cdot10}{2\cdot0{,}05} = 1{,}26\cdot10^{-4}\ \text{Тл}` },
    ],
    answer: [String.raw`B = 126\ \text{мкТл}`],
  },

  /* ===================== 21.5 ===================== */
  {
    id: '21.5', chapter: CH, section: S2, page: '316',
    title: 'Число витков короткой катушки',
    given: [[String.raw`R = 16\ \text{см}`, String.raw`0{,}16\ \text{м}`], [String.raw`I = 5\ \text{А}`, ''], [String.raw`H = 800\ \text{А/м}`, '']],
    find: String.raw`N \;—\; ?`,
    formulas: [BRING],
    steps: [
      { title: 'Короткая катушка — N витков в одном месте',
        tex: String.raw`H = \frac{NI}{2R}\ \Rightarrow\ N = \frac{2RH}{I} = \frac{2\cdot0{,}16\cdot800}{5} = 51` },
    ],
    answer: [String.raw`N = 51`],
  },

  /* ===================== 21.6 ===================== */
  {
    id: '21.6', chapter: CH, section: S2, page: '317',
    title: 'Поле на оси витка',
    given: [[String.raw`R = 8\ \text{см}`, ''], [String.raw`H = 30\ \text{А/м}`, ''], [String.raw`d = 6\ \text{см}`, '']],
    find: String.raw`H_1 \;—\; ?`,
    formulas: [BRING, BAXIS],
    steps: [
      { title: 'Отношение полей',
        tex: String.raw`\frac{H_1}{H} = \frac{R^3}{(R^2 + d^2)^{3/2}} = \frac{512}{1000}\ \Rightarrow\ H_1 = 30\cdot0{,}512 = 15{,}4\ \text{А/м}` },
    ],
    answer: [String.raw`H_1 = 15{,}4\ \text{А/м}`],
  },

  /* ===================== 21.7 ===================== */
  {
    id: '21.7', chapter: CH, section: S2, page: '317',
    title: 'Ток кольца по полю на оси',
    given: [[String.raw`R = 0{,}2\ \text{м}`, ''], [String.raw`r = 0{,}3\ \text{м}`, ''], [String.raw`B = 20\ \text{мкТл}`, String.raw`2\cdot10^{-5}\ \text{Тл}`]],
    find: String.raw`I \;—\; ?`,
    formulas: [BAXIS],
    steps: [
      { title: 'Точка на оси, r² = R² + x²',
        tex: String.raw`B = \frac{\mu_0IR^2}{2r^3}\ \Rightarrow\ I = \frac{2Br^3}{\mu_0R^2} = \frac{2\cdot2\cdot10^{-5}\cdot0{,}027}{4\pi\cdot10^{-7}\cdot0{,}04} = 21{,}5\ \text{А}` },
    ],
    answer: [String.raw`I = 21{,}5\ \text{А}`],
    note: TYPO + 'В формуле ответа книги слева стоит B вместо I; число 21,5 А верное.',
  },

  /* ===================== 21.8 ===================== */
  {
    id: '21.8', chapter: CH, section: S2, page: '317',
    title: 'Ток кольца по полю в точке A',
    given: [[String.raw`R = 10\ \text{см}`, String.raw`0{,}1\ \text{м}`], [String.raw`B = 1\ \text{мкТл}`, String.raw`10^{-6}\ \text{Тл}`], [String.raw`\beta = 10^\circ`, '']],
    find: String.raw`I \;—\; ?`,
    formulas: [BAXIS],
    steps: [
      { title: 'Через угол β (рис. 21.10)',
        tex: String.raw`\sin\beta = \frac{R}{\sqrt{R^2 + x^2}}\ \Rightarrow\ B = \frac{\mu_0I}{2R}\sin^3\beta` },
      { title: 'Ток',
        tex: String.raw`I = \frac{2BR}{\mu_0\sin^3\beta} = \frac{2\cdot10^{-6}\cdot0{,}1}{4\pi\cdot10^{-7}\cdot0{,}1736^3} = 30{,}4\ \text{А}` },
    ],
    answer: [String.raw`I = \frac{2BR}{\mu_0\sin^3\beta} = 30{,}4\ \text{А}`],
    note: MISMATCH + 'В книге 305 А — в 10 раз больше. По её же формуле: 2·10⁻⁷/(4π·10⁻⁷·0,005236) = 30,4 А.',
  },

  /* ===================== 21.9 ===================== */
  {
    id: '21.9', chapter: CH, section: S2, page: '317',
    title: 'Поле на оси катушки за её концом',
    given: [[String.raw`l = 20\ \text{см},\ N = 100`, ''], [String.raw`I = 5\ \text{А}`, ''], [String.raw`d = 20\ \text{см}\ (R = 10\ \text{см})`, ''], [String.raw`a = 10\ \text{см}`, '']],
    find: String.raw`B \;—\; ?`,
    formulas: [BSOL],
    steps: [
      { title: 'Точка вне катушки',
        text: 'Ближний конец на расстоянии a, дальний — на a + l; знаки косинусов разные.',
        tex: String.raw`B = \frac{\mu_0NI}{2l}\left(\frac{a + l}{\sqrt{R^2 + (a + l)^2}} - \frac{a}{\sqrt{R^2 + a^2}}\right)` },
      { title: 'Считаем',
        tex: String.raw`B = \frac{4\pi\cdot10^{-7}\cdot500}{0{,}4}\left(\frac{0{,}3}{0{,}316} - \frac{0{,}1}{0{,}141}\right) = 1{,}571\cdot10^{-3}\cdot0{,}242 = 3{,}79\cdot10^{-4}\ \text{Тл}` },
    ],
    answer: [String.raw`B = 379\ \text{мкТл}`],
    note: MISMATCH + 'В книге 606 мкТл: в её формуле под корнем стоит диаметр d, а должен быть радиус R = d/2 (с d выходит ≈ 605 мкТл). С радиусом — 379 мкТл.',
  },

  /* ===================== 21.10 ===================== */
  {
    id: '21.10', chapter: CH, section: S2, page: '317',
    title: 'Поле внутри плотно намотанного соленоида',
    given: [[String.raw`d = 0{,}5\ \text{мм}`, String.raw`5\cdot10^{-4}\ \text{м}`], [String.raw`I = 4\ \text{А}`, '']],
    find: String.raw`H \;—\; ?`,
    formulas: [BINF],
    steps: [
      { title: 'Витки вплотную: n = 1/d',
        tex: String.raw`H = nI = \frac Id = \frac{4}{5\cdot10^{-4}} = 8\cdot10^3\ \text{А/м}` },
    ],
    answer: [String.raw`H = 8\ \text{кА/м}`],
  },

  /* ===================== 21.11 ===================== */
  {
    id: '21.11', chapter: CH, section: S2, page: '317',
    title: 'Когда катушку можно считать бесконечной',
    given: [[String.raw`d = 10\ \text{см}\ (R = 5\ \text{см})`, ''], [String.raw`\delta \le 0{,}5\%`, '']],
    find: String.raw`l_{\min} \;—\; ?`,
    formulas: [BSOL, BINF],
    steps: [
      { title: 'В середине катушки',
        tex: String.raw`\frac{B}{B_\infty} = \cos\alpha = \frac{l/2}{\sqrt{R^2 + l^2/4}} \ge 0{,}995` },
      { title: 'Решаем',
        tex: String.raw`\frac l2 = R\frac{0{,}995}{\sqrt{1 - 0{,}995^2}} = 9{,}96R\ \Rightarrow\ l_{\min} = 19{,}9R \approx 1\ \text{м}` },
    ],
    answer: [String.raw`l_{\min} \approx 1\ \text{м}`],
  },

  /* ===================== 21.12 ===================== */
  {
    id: '21.12', chapter: CH, section: S2, page: '317',
    title: 'Участок, где поле «как в бесконечном соленоиде»',
    given: [[String.raw`l = 1\ \text{м}`, ''], [String.raw`d = 2\ \text{см}\ (R = 1\ \text{см})`, ''], [String.raw`\delta \le 0{,}1\%`, '']],
    find: String.raw`\Delta l \;—\; ?`,
    formulas: [BSOL],
    steps: [
      { title: 'Условие в точке на расстоянии s от конца',
        tex: String.raw`\frac12\left(\frac{s}{\sqrt{s^2 + R^2}} + \frac{l - s}{\sqrt{(l - s)^2 + R^2}}\right) \ge 0{,}999` },
      { title: 'Приближение книги',
        text: 'Если второе слагаемое считать равным 1 (дальний конец далеко):',
        tex: String.raw`\frac{s}{\sqrt{s^2 + R^2}} \ge 0{,}998\ \Rightarrow\ s = 15{,}8R = 15{,}8\ \text{см},\quad \Delta l = l - 2s = 68{,}4\ \text{см}` },
      { title: 'Точно (численно)',
        text: 'Дальний конец тоже немного ослабляет поле, поэтому участок чуть короче:',
        tex: String.raw`s = 16{,}1\ \text{см},\quad \Delta l = 67{,}8\ \text{см}` },
    ],
    answer: [String.raw`\Delta l \approx 68\ \text{см};\ \text{границы в} \approx 16\ \text{см от концов}`],
    note: '<b>Про точность ответа книги.</b> Книга (68,4 и 15,8 см) не учитывает влияние дальнего конца катушки. Точное решение даёт 67,8 и 16,1 см. Для зачёта подойдёт ответ книги.',
  },

  /* ===================== 21.13 ===================== */
  {
    id: '21.13', chapter: CH, section: S2, page: '317',
    title: 'Лента, свёрнутая в трубку',
    given: [[String.raw`l = 40\ \text{см}`, String.raw`0{,}4\ \text{м}`], [String.raw`R = 30\ \text{см}`, String.raw`0{,}3\ \text{м}`], [String.raw`I = 200\ \text{А}`, '']],
    find: String.raw`B_1,\ B_2 \;—\; ?`,
    formulas: [BSOL],
    steps: [
      { title: 'Трубка — соленоид с nI = I/l',
        text: 'Ток течёт по окружности трубки и равномерно распределён по её длине.' },
      { title: '1) В середине',
        tex: String.raw`B_1 = \frac{\mu_0I}{l}\cdot\frac{l/2}{\sqrt{R^2 + l^2/4}} = \frac{\mu_0I}{2\sqrt{R^2 + l^2/4}} = \frac{4\pi\cdot10^{-7}\cdot200}{2\cdot0{,}361} = 3{,}49\cdot10^{-4}\ \text{Тл}` },
      { title: '2) На конце',
        tex: String.raw`B_2 = \frac{\mu_0I}{2l}\cdot\frac{l}{\sqrt{R^2 + l^2}} = \frac{4\pi\cdot10^{-7}\cdot200}{2\cdot0{,}5} = 2{,}51\cdot10^{-4}\ \text{Тл}` },
    ],
    answer: [String.raw`1)\ 349\ \text{мкТл};\quad 2)\ 251\ \text{мкТл}`],
  },

  /* ===================== 21.14 ===================== */
  {
    id: '21.14', chapter: CH, section: S3, page: '318',
    title: 'Поле прямого провода',
    given: [[String.raw`I = 50\ \text{А}`, ''], [String.raw`r = 5\ \text{см}`, String.raw`0{,}05\ \text{м}`]],
    find: String.raw`B \;—\; ?`,
    formulas: [BLINE],
    steps: [
      { title: 'Индукция',
        tex: String.raw`B = \frac{4\pi\cdot10^{-7}\cdot50}{2\pi\cdot0{,}05} = 2\cdot10^{-4}\ \text{Тл}` },
    ],
    answer: [String.raw`B = 200\ \text{мкТл}`],
  },

  /* ===================== 21.15 ===================== */
  {
    id: '21.15', chapter: CH, section: S3, page: '318',
    title: 'Два провода, токи навстречу',
    given: [[String.raw`r = 5\ \text{см}`, ''], [String.raw`I = 10\ \text{А}`, ''], [String.raw`r_1 = 2\ \text{см},\ r_2 = 3\ \text{см}`, '']],
    find: String.raw`H \;—\; ?`,
    formulas: [BLINE, SUP],
    steps: [
      { title: 'Точка между проводами',
        text: '2 + 3 = 5 см — точка лежит на отрезке между проводами. При противоположных токах поля там направлены одинаково.',
        tex: String.raw`H = \frac{I}{2\pi}\left(\frac{1}{r_1} + \frac{1}{r_2}\right) = \frac{10}{2\pi}(50 + 33{,}3) = 133\ \text{А/м}` },
    ],
    answer: [String.raw`H = 133\ \text{А/м}`],
    note: SMALL + 'В книге 132 А/м; точно 132,6.',
  },

  /* ===================== 21.16 ===================== */
  {
    id: '21.16', chapter: CH, section: S3, page: '318',
    title: 'Два провода, токи в одну сторону',
    given: [[String.raw`d = 5\ \text{см}`, ''], [String.raw`I = 30\ \text{А}`, ''], [String.raw`r_1 = 4\ \text{см},\ r_2 = 3\ \text{см}`, '']],
    find: String.raw`H \;—\; ?`,
    formulas: [BLINE, SUP],
    steps: [
      { title: 'Прямоугольный треугольник',
        text: '3² + 4² = 5²: радиусы r₁ и r₂ перпендикулярны, значит, перпендикулярны и поля.',
        tex: String.raw`H = \frac{I}{2\pi}\sqrt{\frac{1}{r_1^2} + \frac{1}{r_2^2}} = \frac{30}{2\pi}\sqrt{625 + 1111} = 199\ \text{А/м}` },
    ],
    answer: [String.raw`H = 199\ \text{А/м} \approx 200\ \text{А/м}`],
  },

  /* ===================== 21.17 ===================== */
  {
    id: '21.17', chapter: CH, section: S3, page: '318',
    title: 'Индукция от двух противоположных токов',
    given: [[String.raw`I_1 = 50\ \text{А},\ I_2 = 100\ \text{А}`, ''], [String.raw`d = 20\ \text{см}`, ''], [String.raw`r_1 = 25\ \text{см},\ r_2 = 40\ \text{см}`, '']],
    find: String.raw`B \;—\; ?`,
    formulas: [BLINE, SUP],
    steps: [
      { title: 'Поля проводов',
        tex: String.raw`B_1 = \frac{\mu_0I_1}{2\pi r_1} = 40\ \text{мкТл},\quad B_2 = \frac{\mu_0I_2}{2\pi r_2} = 50\ \text{мкТл}` },
      { title: 'Угол',
        text: 'Векторы B перпендикулярны радиусам; при противоположных токах угол между B₁ и B₂ равен π − γ, где γ — угол между r₁ и r₂.',
        tex: String.raw`\cos\gamma = \frac{r_1^2 + r_2^2 - d^2}{2r_1r_2} = 0{,}9125` },
      { title: 'Сумма',
        tex: String.raw`B = \sqrt{B_1^2 + B_2^2 - 2B_1B_2\cos\gamma} = \sqrt{1600 + 2500 - 3650}\ \text{мкТл} = 21{,}2\ \text{мкТл}` },
    ],
    answer: [String.raw`B = 21{,}2\ \text{мкТл}`],
  },

  /* ===================== 21.18 ===================== */
  {
    id: '21.18', chapter: CH, section: S3, page: '318',
    title: 'Точка на равных расстояниях от двух проводов',
    given: [[String.raw`I_1 = 20\ \text{А},\ I_2 = 30\ \text{А}`, ''], [String.raw`d = r = 10\ \text{см}`, '']],
    find: String.raw`B \;—\; ?`,
    formulas: [BLINE, SUP],
    steps: [
      { title: 'Равносторонний треугольник',
        text: 'Токи в одну сторону — угол между полями равен углу между радиусами, 60°.',
        tex: String.raw`B = \frac{\mu_0}{2\pi r}\sqrt{I_1^2 + I_2^2 + I_1I_2} = 2\cdot10^{-6}\cdot\sqrt{1900} = 87{,}2\cdot10^{-6}\ \text{Тл}` },
    ],
    answer: [String.raw`B = 87{,}2\ \text{мкТл}`],
  },

  /* ===================== 21.19 ===================== */
  {
    id: '21.19', chapter: CH, section: S3, page: '318',
    title: 'Скрещенные провода: точка A',
    given: [[String.raw`I_1 = 80\ \text{А},\ I_2 = 60\ \text{А}`, ''], [String.raw`d = 10\ \text{см}`, '']],
    find: String.raw`B_A \;—\; ?`,
    formulas: [BLINE, SUP],
    steps: [
      { title: 'Поля перпендикулярны',
        text: 'По рис. 21.12 точка A — посередине общего перпендикуляра, в d/2 от каждого провода. Провода скрещены под прямым углом, их поля в A тоже взаимно перпендикулярны.',
        tex: String.raw`B = \frac{\mu_0}{2\pi(d/2)}\sqrt{I_1^2 + I_2^2} = \frac{\mu_0}{\pi d}\sqrt{I_1^2 + I_2^2} = 4\cdot10^{-6}\cdot100 = 4\cdot10^{-4}\ \text{Тл}` },
    ],
    answer: [String.raw`B_A = 400\ \text{мкТл}`],
  },

  /* ===================== 21.20 ===================== */
  {
    id: '21.20', chapter: CH, section: S3, page: '318',
    title: 'Скрещенные провода: точка C',
    given: [[String.raw`I_1 = 30\ \text{А},\ I_2 = 40\ \text{А}`, ''], [String.raw`d = 20\ \text{см}`, '']],
    find: String.raw`B_C \;—\; ?`,
    formulas: [BLINE, SUP],
    steps: [
      { title: 'Поля перпендикулярны',
        tex: String.raw`B = \frac{\mu_0}{2\pi d}\sqrt{I_1^2 + I_2^2} = \frac{4\pi\cdot10^{-7}}{2\pi\cdot0{,}2}\cdot50 = 5\cdot10^{-5}\ \text{Тл}` },
    ],
    answer: [String.raw`B_C = 50\ \text{мкТл}`],
    note: TYPO + 'В ответе книги ссылка «см. задачу 21.20» указывает на саму себя — имеется в виду 21.19.',
  },

  /* ===================== 21.21 ===================== */
  {
    id: '21.21', chapter: CH, section: S3, page: '318',
    title: 'Провод, согнутый под прямым углом: точка A',
    given: [[String.raw`I = 20\ \text{А}`, ''], [String.raw`r = 5\ \text{см}`, String.raw`0{,}05\ \text{м}`]],
    find: String.raw`B_A \;—\; ?`,
    formulas: [BSEG],
    steps: [
      { title: 'Горизонтальная часть',
        text: 'По рис. 21.13 точка A лежит на продолжении горизонтальной части — её поле в A равно нулю.' },
      { title: 'Вертикальная часть',
        text: 'Полубесконечный провод, начинающийся у основания перпендикуляра длиной r.',
        tex: String.raw`B = \frac{\mu_0I}{4\pi r} = \frac{10^{-7}\cdot20}{0{,}05} = 4\cdot10^{-5}\ \text{Тл}` },
    ],
    answer: [String.raw`B_A = 40\ \text{мкТл}`],
  },

  /* ===================== 21.22 ===================== */
  {
    id: '21.22', chapter: CH, section: S3, page: '318',
    title: 'Провод с закруглением: точка O',
    given: [[String.raw`I = 100\ \text{А}`, ''], [String.raw`r = 10\ \text{см}`, String.raw`0{,}1\ \text{м}`]],
    find: String.raw`B_O \;—\; ?`,
    formulas: [BSEG, BARC],
    steps: [
      { title: 'Три части (рис. 21.14)',
        text: 'Две полубесконечные прямые, оканчивающиеся у оснований перпендикуляров из O, и четверть окружности радиусом r. Все дают поле одного направления.',
        tex: String.raw`B = 2\cdot\frac{\mu_0I}{4\pi r} + \frac14\cdot\frac{\mu_0I}{2r} = \frac{\pi + 4}{8\pi}\cdot\frac{\mu_0I}{r}` },
      { title: 'Считаем',
        tex: String.raw`B = 0{,}284\cdot\frac{4\pi\cdot10^{-7}\cdot100}{0{,}1} = 3{,}57\cdot10^{-4}\ \text{Тл}` },
    ],
    answer: [String.raw`B_O = 357\ \text{мкТл}`],
  },

  /* ===================== 21.23 ===================== */
  {
    id: '21.23', chapter: CH, section: S3, page: '318',
    title: 'Точки на биссектрисе прямого угла',
    given: [[String.raw`I = 100\ \text{А}`, ''], [String.raw`a = 10\ \text{см}`, '']],
    find: String.raw`B_1,\ B_2 \;—\; ?`,
    formulas: [BSEG],
    steps: [
      { title: 'Одна сторона угла',
        text: 'Расстояние от точки до стороны r₀ = a sin 45° = a/√2. Внутри угла сторона видна от φ = 0 до 135°, снаружи — от 0 до 45°.',
        tex: String.raw`B_\text{стор} = \frac{\mu_0I}{4\pi r_0}(1 \pm \cos45^\circ)` },
      { title: 'Две стороны',
        tex: String.raw`B_1 = \frac{\mu_0I}{2\pi a}(\sqrt2 + 1) = 2\cdot10^{-4}\cdot2{,}414 = 483\ \text{мкТл},\quad B_2 = \frac{\mu_0I}{2\pi a}(\sqrt2 - 1) = 82{,}8\ \text{мкТл}` },
    ],
    answer: [String.raw`B_1 = 483\ \text{мкТл}\ (\text{внутри угла});\quad B_2 = 82{,}8\ \text{мкТл}\ (\text{снаружи})`],
    note: SMALL + 'В книге B₁ = 482 мкТл; точно 482,8.',
  },

  /* ===================== 21.24 ===================== */
  {
    id: '21.24', chapter: CH, section: S3, page: '319',
    title: 'Точки на биссектрисе угла 120°',
    given: [[String.raw`\alpha = 120^\circ`, ''], [String.raw`I = 50\ \text{А}`, ''], [String.raw`a = 5\ \text{см}`, '']],
    find: String.raw`B_1,\ B_2 \;—\; ?`,
    formulas: [BSEG],
    steps: [
      { title: 'Расстояние до стороны',
        tex: String.raw`r_0 = a\sin60^\circ = \frac{\sqrt3}{2}a` },
      { title: 'Две стороны',
        tex: String.raw`B_{1,2} = 2\cdot\frac{\mu_0I}{4\pi r_0}(1 \pm \cos60^\circ):\quad B_1 = \sqrt3\frac{\mu_0I}{2\pi a} = 346\ \text{мкТл},\quad B_2 = \frac{\mu_0I}{2\pi a\sqrt3} = 115\ \text{мкТл}` },
    ],
    answer: [String.raw`B_1 = 346\ \text{мкТл};\quad B_2 = 115\ \text{мкТл}`],
    note: SMALL + 'В книге B₂ = 116 мкТл; точно 115,5.',
  },

  /* ===================== 21.25 ===================== */
  {
    id: '21.25', chapter: CH, section: S3, page: '319',
    title: 'Треугольный контур',
    given: [[String.raw`I = 40\ \text{А}`, ''], [String.raw`a = 30\ \text{см}`, String.raw`0{,}3\ \text{м}`]],
    find: String.raw`B \;—\; ?`,
    formulas: [BSEG],
    steps: [
      { title: 'Одна сторона',
        text: 'От центра до стороны r₀ = a/(2√3); сторона видна под углами φ₁ = 30°, φ₂ = 150°.',
        tex: String.raw`B_1 = \frac{\mu_0I}{4\pi r_0}(\cos30^\circ - \cos150^\circ) = \frac{\mu_0I\cdot2\sqrt3}{4\pi a}\cdot\sqrt3 = \frac{3\mu_0I}{2\pi a}` },
      { title: 'Три стороны',
        tex: String.raw`B = \frac{9\mu_0I}{2\pi a} = \frac{9\cdot2\cdot10^{-7}\cdot40}{0{,}3} = 2{,}4\cdot10^{-4}\ \text{Тл}` },
    ],
    answer: [String.raw`B = 240\ \text{мкТл}`],
  },

  /* ===================== 21.26 ===================== */
  {
    id: '21.26', chapter: CH, section: S3, page: '319',
    title: 'Квадратный контур',
    given: [[String.raw`I = 50\ \text{А}`, ''], [String.raw`a = 20\ \text{см}`, String.raw`0{,}2\ \text{м}`]],
    find: String.raw`B \;—\; ?`,
    formulas: [BSEG],
    steps: [
      { title: 'Одна сторона (r₀ = a/2, углы 45° и 135°)',
        tex: String.raw`B_1 = \frac{\mu_0I}{4\pi\cdot a/2}\cdot\sqrt2 = \frac{\sqrt2\,\mu_0I}{2\pi a}` },
      { title: 'Четыре стороны',
        tex: String.raw`B = \frac{2\sqrt2\,\mu_0I}{\pi a} = \frac{2\sqrt2\cdot4\cdot10^{-7}\cdot50}{0{,}2} = 2{,}83\cdot10^{-4}\ \text{Тл}` },
    ],
    answer: [String.raw`B = 283\ \text{мкТл}`],
    note: SMALL + 'В книге 282 мкТл; точно 282,8.',
  },

  /* ===================== 21.27 ===================== */
  {
    id: '21.27', chapter: CH, section: S3, page: '319',
    title: 'Прямоугольный контур',
    given: [[String.raw`I = 60\ \text{А}`, ''], [String.raw`a = 30\ \text{см},\ b = 40\ \text{см}`, '']],
    find: String.raw`B \;—\; ?`,
    formulas: [BSEG],
    steps: [
      { title: 'Стороны a (на расстоянии b/2) и b (на расстоянии a/2)',
        text: 'Косинусы углов видимости выражаются через полудиагональ c/2, c = √(a² + b²).',
        tex: String.raw`B = 2\frac{\mu_0I}{4\pi(b/2)}\cdot\frac{a}{c} + 2\frac{\mu_0I}{4\pi(a/2)}\cdot\frac bc = \frac{2\mu_0I\sqrt{a^2 + b^2}}{\pi ab}` },
      { title: 'Считаем',
        tex: String.raw`B = \frac{2\cdot4\cdot10^{-7}\cdot60\cdot0{,}5}{0{,}12} = 2\cdot10^{-4}\ \text{Тл}` },
    ],
    answer: [String.raw`B = 200\ \text{мкТл}`],
  },

  /* ===================== 21.28 ===================== */
  {
    id: '21.28', chapter: CH, section: S3, page: '319',
    title: 'Шестиугольный контур (d = 10 см)',
    given: [[String.raw`d = 10\ \text{см}`, String.raw`0{,}1\ \text{м}`], [String.raw`I = 25\ \text{А}`, '']],
    find: String.raw`B \;—\; ?`,
    formulas: [BSEG],
    steps: [
      { title: 'Одна сторона (r₀ = d√3/2, углы 60° и 120°)',
        tex: String.raw`B_1 = \frac{\mu_0I}{4\pi r_0}(\cos60^\circ - \cos120^\circ) = \frac{\mu_0I}{2\sqrt3\,\pi d}` },
      { title: 'Шесть сторон',
        tex: String.raw`B = \frac{\sqrt3\,\mu_0I}{\pi d} = \frac{1{,}732\cdot4\cdot10^{-7}\cdot25}{0{,}1} = 1{,}73\cdot10^{-4}\ \text{Тл}` },
    ],
    answer: [String.raw`B = 173\ \text{мкТл}`],
  },

  /* ===================== 21.29 ===================== */
  {
    id: '21.29', chapter: CH, section: S3, page: '319',
    title: 'Шестиугольник и описанная окружность',
    given: [[String.raw`a = 20\ \text{см}`, String.raw`0{,}2\ \text{м}`], [String.raw`I = 100\ \text{А}`, '']],
    find: String.raw`H,\ H_0 \;—\; ?`,
    formulas: [BSEG, BRING],
    steps: [
      { title: 'Шестиугольник (как в 21.28)',
        tex: String.raw`H = \frac{\sqrt3\,I}{\pi a} = \frac{1{,}732\cdot100}{\pi\cdot0{,}2} = 276\ \text{А/м}` },
      { title: 'Описанная окружность (R = a)',
        tex: String.raw`H_0 = \frac{I}{2R} = \frac{100}{0{,}4} = 250\ \text{А/м}` },
    ],
    answer: [String.raw`H = 276\ \text{А/м};\quad H_0 = 250\ \text{А/м}`],
    note: SMALL + 'В книге H = 275 А/м; точно 275,7.',
  },

  /* ===================== 21.30 ===================== */
  {
    id: '21.30', chapter: CH, section: S3, page: '319',
    title: 'Кольцо переделали в квадрат',
    given: [[String.raw`4a = 2\pi R`, '']],
    find: String.raw`B_\text{кв}/B_\text{к} \;—\; ?`,
    formulas: [BRING, BSEG],
    steps: [
      { title: 'Сторона квадрата',
        tex: String.raw`a = \frac{\pi R}{2}` },
      { title: 'Отношение (поле квадрата — из 21.26)',
        tex: String.raw`\frac{B_\text{кв}}{B_\text{к}} = \frac{2\sqrt2\,\mu_0I/(\pi a)}{\mu_0I/(2R)} = \frac{4\sqrt2R}{\pi a} = \frac{8\sqrt2}{\pi^2} = 1{,}15` },
    ],
    answer: [String.raw`\text{увеличилась в }\frac{8\sqrt2}{\pi^2} = 1{,}15\ \text{раза}`],
  },

  /* ===================== 21.31 ===================== */
  {
    id: '21.31', chapter: CH, section: S3, page: '319',
    title: 'Провод с петлёй: случаи а–е',
    given: [[String.raw`I = 50\ \text{А}`, ''], [String.raw`R = 10\ \text{см}`, String.raw`0{,}1\ \text{м}`]],
    find: String.raw`B_O \;—\; ?`,
    formulas: [BSEG, BARC, BLINE],
    steps: [
      { title: 'а) Полуокружность, прямые идут через O',
        tex: String.raw`B = \frac{\mu_0I}{4R} = 157\ \text{мкТл}` },
      { title: 'б) Полуокружность + две полубесконечные прямые на расстоянии R',
        tex: String.raw`B = \frac{\mu_0I}{4R} + 2\cdot\frac{\mu_0I}{4\pi R} = \frac{\mu_0I}{4\pi R}(\pi + 2) = 257\ \text{мкТл}` },
      { title: 'в) Три четверти окружности + одна полубесконечная прямая',
        tex: String.raw`B = \frac34\cdot\frac{\mu_0I}{2R} + \frac{\mu_0I}{4\pi R} = \frac{\mu_0I}{8\pi R}(3\pi + 2) = 286\ \text{мкТл}` },
      { title: 'г), д) Полный виток + бесконечный провод на расстоянии R',
        text: 'В г) поля витка и провода направлены противоположно, в д) — одинаково (по направлению обхода на рис. 21.15).',
        tex: String.raw`B_г = \frac{\mu_0I}{2\pi R}(\pi - 1) = 214\ \text{мкТл},\quad B_д = \frac{\mu_0I}{2\pi R}(\pi + 1) = 414\ \text{мкТл}` },
      { title: 'е) Дуга 4π/3 вместо хорды',
        text: 'Хорда, стягивающая дугу 2π/3, отстоит от O на R/2. Остаются две полубесконечные прямые на расстоянии R/2 (каждая видна от 0 до 30° от перпендикуляра) — их поле противоположно полю дуги.',
        tex: String.raw`B = \frac23\cdot\frac{\mu_0I}{2R} - 2\cdot\frac{\mu_0I}{4\pi(R/2)}\left(1 - \frac{\sqrt3}{2}\right) = \frac{\mu_0I}{R}\left(\frac13 - \frac{2 - \sqrt3}{2\pi}\right) = 183\ \text{мкТл}` },
    ],
    answer: [String.raw`\text{а) }157;\ \text{б) }257;\ \text{в) }286;\ \text{г) }214;\ \text{д) }414;\ \text{е) }183\ \text{мкТл}`],
    note: SMALL + 'В книге е) 182 мкТл; точно 182,6. Все шесть случаев проверены численным интегрированием.',
  },

  /* ===================== 21.32 ===================== */
  {
    id: '21.32', chapter: CH, section: S3, page: '320',
    title: 'Плоские контуры: случаи а–е',
    given: [[String.raw`I = 100\ \text{А}`, ''], [String.raw`R = 20\ \text{см}`, String.raw`0{,}2\ \text{м}`]],
    find: String.raw`B_O \;—\; ?`,
    formulas: [BSEG, BARC],
    steps: [
      { title: 'Общее',
        text: 'Отрезки, лежащие на прямых через O, поля в O не создают. Остальное — дуги (доля поля витка) и отрезки (формула отрезка). Обозначим B₀ = μ₀I/R = 628 мкТл.' },
      { title: 'а) Две полуокружности R и 2R, поля складываются',
        tex: String.raw`B = \frac{B_0}{4} + \frac{B_0}{8} = \frac38B_0 = 236\ \text{мкТл}` },
      { title: 'б) Те же полуокружности, поля вычитаются',
        tex: String.raw`B = \frac{B_0}{4} - \frac{B_0}{8} = \frac{B_0}{8} = 78{,}5\ \text{мкТл}` },
      { title: 'в) Дуга 2R на 4π/3 и дуга R на 2π/3',
        tex: String.raw`B = \frac{B_0}{4}\cdot\frac23 + \frac{B_0}{2}\cdot\frac13 = \frac{B_0}{3} = 209\ \text{мкТл}` },
      { title: 'г) Дуга 3π/2 и отрезок длиной 2R на расстоянии R',
        text: 'Боковые отрезки идут вдоль диагоналей через O. Нижний отрезок виден под углами 45° и 135°.',
        tex: String.raw`B = \frac38B_0 + \frac{\sqrt2}{4\pi}B_0 = \frac{B_0}{4}\left(\frac32 + \frac{\sqrt2}{\pi}\right) = 306\ \text{мкТл}` },
      { title: 'д) Дуга 3π/2 и квадрат со стороной 2R, вершина в O',
        text: 'Две стороны квадрата идут через O; две дальние стороны отстоят от O на 2R·sin45° и видны каждая под углом 45°.',
        tex: String.raw`B = \frac38B_0 + \frac{\sqrt2}{8\pi}B_0 = \frac{B_0}{8}\left(3 + \frac{\sqrt2}{\pi}\right) = 271\ \text{мкТл}` },
      { title: 'е) Полуокружность и три стороны квадрата',
        tex: String.raw`B = \frac{B_0}{4} + \frac{\sqrt2}{2\pi}B_0 = \frac{B_0}{2}\left(\frac12 + \frac{\sqrt2}{\pi}\right) = 298\ \text{мкТл}` },
    ],
    answer: [String.raw`\text{а) }236;\ \text{б) }78{,}5;\ \text{в) }209;\ \text{г) }306;\ \text{д) }271;\ \text{е) }298\ \text{мкТл}`],
  },

  /* ===================== 21.33 ===================== */
  {
    id: '21.33', chapter: CH, section: S4, page: '320',
    title: 'Ток электрона в атоме водорода',
    given: [[String.raw`r = 53\ \text{пм}`, String.raw`5{,}3\cdot10^{-11}\ \text{м}`]],
    find: String.raw`I,\ H \;—\; ?`,
    formulas: [BRING, { tex: String.raw`\frac{mv^2}{r} = \frac{e^2}{4\pi\varepsilon_0r^2},\quad I = \frac{ev}{2\pi r}`, text: 'кулоновская сила — центростремительная; эквивалентный ток' }],
    steps: [
      { title: 'Скорость электрона',
        tex: String.raw`v = \sqrt{\frac{e^2}{4\pi\varepsilon_0mr}} = \sqrt{\frac{8{,}99\cdot10^9\cdot2{,}56\cdot10^{-38}}{9{,}11\cdot10^{-31}\cdot5{,}3\cdot10^{-11}}} = 2{,}18\cdot10^6\ \text{м/с}` },
      { title: 'Ток',
        tex: String.raw`I = \frac{ev}{2\pi r} = \frac{1{,}6\cdot10^{-19}\cdot2{,}18\cdot10^6}{2\pi\cdot5{,}3\cdot10^{-11}} = 1{,}05\cdot10^{-3}\ \text{А}` },
      { title: 'Напряжённость',
        tex: String.raw`H = \frac{I}{2r} = \frac{1{,}05\cdot10^{-3}}{1{,}06\cdot10^{-10}} = 9{,}9\cdot10^6\ \text{А/м}` },
    ],
    answer: [String.raw`I = 1{,}05\ \text{мА};\quad H = 10\ \text{МА/м}`],
    note: SMALL + 'В книге I = 1,1 мА — округлено до двух цифр (точно 1,05 мА).',
  },

  /* ===================== 21.34 ===================== */
  {
    id: '21.34', chapter: CH, section: S4, page: '320',
    title: 'Наибольшее поле пролетающего электрона',
    given: [[String.raw`v = 10^7\ \text{м/с}`, ''], [String.raw`d = 1\ \text{нм}`, String.raw`10^{-9}\ \text{м}`]],
    find: String.raw`B_{\max} \;—\; ?`,
    formulas: [BQ],
    steps: [
      { title: 'Максимум — когда электрон ближе всего (α = 90°, r = d)',
        tex: String.raw`B_{\max} = \frac{\mu_0}{4\pi}\frac{ev}{d^2} = 10^{-7}\cdot\frac{1{,}6\cdot10^{-19}\cdot10^7}{10^{-18}} = 0{,}16\ \text{Тл}` },
    ],
    answer: [String.raw`B_{\max} = 0{,}16\ \text{Тл} = 160\ \text{мТл}`],
    note: MISMATCH + 'В книге 16 мТл — в 10 раз меньше. 10⁻⁷·1,6·10⁻¹⁹·10⁷/10⁻¹⁸ = 0,16 Тл. Та же формула в задаче 21.35 дает ответ книги, так что ошибка именно в 21.34.',
  },

  /* ===================== 21.35 ===================== */
  {
    id: '21.35', chapter: CH, section: S4, page: '320',
    title: 'Скорость электрона по полю',
    given: [[String.raw`r = 10\ \text{нм}`, String.raw`10^{-8}\ \text{м}`], [String.raw`B_{\max} = 160\ \text{мкТл}`, String.raw`1{,}6\cdot10^{-4}\ \text{Тл}`]],
    find: String.raw`v \;—\; ?`,
    formulas: [BQ],
    steps: [
      { title: 'Выражаем v',
        tex: String.raw`v = \frac{4\pi B_{\max}r^2}{\mu_0e} = \frac{1{,}6\cdot10^{-4}\cdot10^{-16}}{10^{-7}\cdot1{,}6\cdot10^{-19}} = 10^6\ \text{м/с}` },
    ],
    answer: [String.raw`v = 10^6\ \text{м/с}`],
  }

  );
})();
