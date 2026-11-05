/*
  § 22. Сила, действующая на проводник с током в магнитном поле — задачи 22.1–22.48 (стр. 327–334).
  Условия задач показываются дословно из книги (data/book-tasks.js).
  Ответы пересчитаны скриптом tools/check_sila_ampera.py и сверены с book/99-otvety.md.
  μ₀ = 4π·10⁻⁷ Гн/м; Bг = 20 мкТл (сноска к 22.26); ρ меди = 8,93·10³ кг/м³ (табл. 9).
*/
(function () {
  const CH = 'Гл. 5. Электромагнетизм';
  const S1 = 'Сила Ампера';
  const S2 = 'Магнитный момент';
  const S3 = 'Контур в магнитном поле';
  const S4 = 'Магнитный диполь';
  const MISMATCH = '<b>Расхождение с ответом книги.</b> ';
  const SMALL = '<b>Расхождение в последней цифре.</b> ';
  const TYPO = '<b>Опечатка в ответе книги.</b> ';

  const FA = { tex: String.raw`F = IBl\sin\alpha`, text: 'сила Ампера на прямой проводник; α — угол между током и B' };
  const FPAR = { tex: String.raw`\frac Fl = \frac{\mu_0I_1I_2}{2\pi d}`, text: 'сила взаимодействия параллельных токов на единицу длины' };
  const BLINE = { tex: String.raw`B = \frac{\mu_0I}{2\pi r}`, text: 'поле прямого тока' };
  const PM = { tex: String.raw`p_m = NIS`, text: 'магнитный момент контура (N витков площадью S)' };
  const MOM = { tex: String.raw`M = p_mB\sin\alpha`, text: 'вращающий момент; α — угол между нормалью (вектором pₘ) и B' };
  const PMQ = { tex: String.raw`dp_m = S\,dI,\quad dI = \frac{\omega}{2\pi}dQ`, text: 'вращающийся заряд — набор круговых токов' };
  const FDIP = { tex: String.raw`F = p_m\frac{\partial B}{\partial x}`, text: 'сила на диполь в неоднородном поле (pₘ вдоль B)' };
  const BG = { tex: String.raw`\operatorname{tg}\alpha = \frac{B}{B_\text{г}}`, text: 'стрелка устанавливается вдоль суммы поля тока и горизонтального поля Земли (Bг = 20 мкТл)' };
  const BRING = { tex: String.raw`B = \frac{\mu_0IN}{2R}`, text: 'поле в центре витка' };
  const BDAX = { tex: String.raw`B = \frac{\mu_0}{2\pi}\frac{p_m}{r^3}`, text: 'поле диполя на его оси' };

  window.TASKS.push(

  /* ===================== 22.1 ===================== */
  {
    id: '22.1', chapter: CH, section: S1, page: '327',
    title: 'Сила на провод в поле',
    given: [[String.raw`I = 1\ \text{кА}`, String.raw`10^3\ \text{А}`], [String.raw`l = 1\ \text{м}`, ''], [String.raw`B = 1\ \text{Тл}`, ''], [String.raw`\alpha = 90^\circ`, '']],
    find: String.raw`F \;—\; ?`,
    formulas: [FA],
    steps: [{ title: 'Сила', tex: String.raw`F = IBl = 10^3\cdot1\cdot1 = 10^3\ \text{Н}` }],
    answer: [String.raw`F = 1\ \text{кН}\ (1\ \text{кН на метр провода})`],
  },

  /* ===================== 22.2 ===================== */
  {
    id: '22.2', chapter: CH, section: S1, page: '327',
    title: 'Угол между током и полем',
    given: [[String.raw`l = 10\ \text{см}`, String.raw`0{,}1\ \text{м}`], [String.raw`I = 20\ \text{А}`, ''], [String.raw`B = 0{,}01\ \text{Тл}`, ''], [String.raw`F = 10^{-2}\ \text{Н}`, '']],
    find: String.raw`\alpha \;—\; ?`,
    formulas: [FA],
    steps: [{ title: 'Синус угла', tex: String.raw`\sin\alpha = \frac{F}{IBl} = \frac{10^{-2}}{20\cdot0{,}01\cdot0{,}1} = 0{,}5\ \Rightarrow\ \alpha = 30^\circ = \frac\pi6` }],
    answer: [String.raw`\alpha = \pi/6\ \text{рад}`],
  },

  /* ===================== 22.3 ===================== */
  {
    id: '22.3', chapter: CH, section: S1, page: '327',
    title: 'Квадратная рамка рядом с проводом',
    given: [[String.raw`I = 1\ \text{кА}`, String.raw`10^3\ \text{А}`], [String.raw`x_1 = a,\ x_2 = 2a`, '']],
    find: String.raw`F \;—\; ?`,
    formulas: [FPAR],
    steps: [
      { title: 'Боковые стороны', text: 'Силы на две стороны, перпендикулярные проводу, равны и противоположны — они уравновешиваются.' },
      { title: 'Параллельные стороны', text: 'Ближняя (на расстоянии a) притягивается, дальняя (на 2a, ток навстречу) отталкивается.',
        tex: String.raw`F = \frac{\mu_0I^2a}{2\pi}\left(\frac1a - \frac1{2a}\right) = \frac{\mu_0I^2}{4\pi} = 10^{-7}\cdot10^6 = 0{,}1\ \text{Н}` },
    ],
    answer: [String.raw`F = \frac{\mu_0I^2}{4\pi} = 0{,}1\ \text{Н}`],
  },

  /* ===================== 22.4 ===================== */
  {
    id: '22.4', chapter: CH, section: S1, page: '328',
    title: 'Дуга в треть кольца',
    given: [[String.raw`R = 15\ \text{см}`, String.raw`0{,}15\ \text{м}`], [String.raw`B = 20\ \text{мТл}`, String.raw`0{,}02\ \text{Тл}`], [String.raw`I = 30\ \text{А}`, ''], [String.raw`\theta = 120^\circ`, '']],
    find: String.raw`F \;—\; ?`,
    formulas: [FA],
    steps: [
      { title: 'Сила на кривой провод', text: 'В однородном поле сила на кривой провод равна силе на прямой отрезок между его концами (хорду).',
        tex: String.raw`l_\text{хорды} = 2R\sin60^\circ = R\sqrt3` },
      { title: 'Сила', tex: String.raw`F = IBR\sqrt3 = 30\cdot0{,}02\cdot0{,}15\cdot1{,}732 = 0{,}156\ \text{Н}` },
    ],
    answer: [String.raw`F = IBR\sqrt3 = 0{,}156\ \text{Н}`],
  },

  /* ===================== 22.5 ===================== */
  {
    id: '22.5', chapter: CH, section: S1, page: '328',
    title: 'Сила, растягивающая кольцо',
    given: [[String.raw`R = 20\ \text{см}`, String.raw`0{,}2\ \text{м}`], [String.raw`I = 100\ \text{А}`, ''], [String.raw`B = 20\ \text{мТл}`, String.raw`0{,}02\ \text{Тл}`]],
    find: String.raw`F \;—\; ?`,
    formulas: [FA],
    steps: [
      { title: 'Половина кольца', text: 'Мысленно разрежем кольцо по диаметру. На полукольцо поле действует как на хорду 2R; её уравновешивают две силы натяжения F в местах разреза.',
        tex: String.raw`2F = IB\cdot2R\ \Rightarrow\ F = IBR = 100\cdot0{,}02\cdot0{,}2 = 0{,}4\ \text{Н}` },
    ],
    answer: [String.raw`F = IBR = 0{,}4\ \text{Н}`],
  },

  /* ===================== 22.6 ===================== */
  {
    id: '22.6', chapter: CH, section: S1, page: '328',
    title: 'Двухпроводная линия',
    given: [[String.raw`d = 4\ \text{мм}`, String.raw`4\cdot10^{-3}\ \text{м}`], [String.raw`I = 50\ \text{А}`, '']],
    find: String.raw`F/l \;—\; ?`,
    formulas: [FPAR],
    steps: [{ title: 'Сила на метр', tex: String.raw`\frac Fl = \frac{4\pi\cdot10^{-7}\cdot2500}{2\pi\cdot4\cdot10^{-3}} = 0{,}125\ \text{Н/м}` }],
    answer: [String.raw`F/l = 0{,}125\ \text{Н/м}`],
  },

  /* ===================== 22.7 ===================== */
  {
    id: '22.7', chapter: CH, section: S1, page: '328',
    title: 'Шины при коротком замыкании',
    given: [[String.raw`l = 2\ \text{м}`, ''], [String.raw`d = 20\ \text{см}`, String.raw`0{,}2\ \text{м}`], [String.raw`I = 10\ \text{кА}`, String.raw`10^4\ \text{А}`]],
    find: String.raw`F \;—\; ?`,
    formulas: [FPAR],
    steps: [{ title: 'Сила', tex: String.raw`F = \frac{\mu_0I^2l}{2\pi d} = \frac{2\cdot10^{-7}\cdot10^8\cdot2}{0{,}2} = 200\ \text{Н}` }],
    answer: [String.raw`F = 200\ \text{Н}`],
  },

  /* ===================== 22.8 ===================== */
  {
    id: '22.8', chapter: CH, section: S1, page: '328',
    title: 'Ток по силе взаимодействия',
    given: [[String.raw`l = 1\ \text{м}`, ''], [String.raw`d = 1\ \text{см}`, String.raw`0{,}01\ \text{м}`], [String.raw`F = 1\ \text{мН}`, String.raw`10^{-3}\ \text{Н}`]],
    find: String.raw`I \;—\; ?`,
    formulas: [FPAR],
    steps: [{ title: 'Ток', tex: String.raw`I = \sqrt{\frac{2\pi dF}{\mu_0l}} = \sqrt{\frac{0{,}01\cdot10^{-3}}{2\cdot10^{-7}}} = \sqrt{50} = 7{,}07\ \text{А}` }],
    answer: [String.raw`I \approx 7\ \text{А}`],
  },

  /* ===================== 22.9 ===================== */
  {
    id: '22.9', chapter: CH, section: S1, page: '328',
    title: 'Три параллельных провода',
    given: [[String.raw`a = 10\ \text{см}`, String.raw`0{,}1\ \text{м}`], [String.raw`I = 100\ \text{А}`, ''], [String.raw`l = 1\ \text{м}`, '']],
    find: String.raw`F_1,\ F_2,\ F_3 \;—\; ?`,
    formulas: [FPAR],
    steps: [
      { title: 'Сила от одного соседа', tex: String.raw`f = \frac{\mu_0I^2l}{2\pi a} = \frac{2\cdot10^{-7}\cdot10^4}{0{,}1} = 0{,}02\ \text{Н}` },
      { title: 'Провода 1 и 2 (токи совпадают)', text: 'Провод 1 притягивается к 2 и отталкивается от 3. Эти две силы образуют угол 120° — их сумма равна f.',
        tex: String.raw`F_1 = F_2 = f = 20\ \text{мН}` },
      { title: 'Провод 3', text: 'Отталкивается от обоих, силы под углом 60°.',
        tex: String.raw`F_3 = 2f\cos30^\circ = \sqrt3f = 34{,}6\ \text{мН}` },
    ],
    answer: [String.raw`F_1 = F_2 = 20\ \text{мН};\quad F_3 = 34{,}6\ \text{мН}\ (\text{на 1 м})`],
  },

  /* ===================== 22.10 ===================== */
  {
    id: '22.10', chapter: CH, section: S1, page: '328',
    title: 'Взаимодействие двух колец',
    given: [[String.raw`R = 10\ \text{см}`, String.raw`0{,}1\ \text{м}`], [String.raw`I = 10\ \text{А}`, ''], [String.raw`d = 1\ \text{мм}`, String.raw`10^{-3}\ \text{м}`]],
    find: String.raw`F \;—\; ?`,
    formulas: [FPAR],
    steps: [
      { title: 'd ≪ R', text: 'Близкие кольца — как два параллельных провода длиной 2πR.',
        tex: String.raw`F = \frac{\mu_0I^2}{2\pi d}\cdot2\pi R = \frac{\mu_0I^2R}{d} = \frac{4\pi\cdot10^{-7}\cdot100\cdot0{,}1}{10^{-3}} = 1{,}26\cdot10^{-2}\ \text{Н}` },
    ],
    answer: [String.raw`F = \frac{\mu_0I^2R}{d} = 12{,}6\ \text{мН}`],
  },

  /* ===================== 22.11 ===================== */
  {
    id: '22.11', chapter: CH, section: S1, page: '328',
    title: 'Два квадратных контура',
    given: [[String.raw`a = 20\ \text{см}`, String.raw`0{,}2\ \text{м}`], [String.raw`I = 10\ \text{А}`, ''], [String.raw`d = 2\ \text{мм}`, String.raw`2\cdot10^{-3}\ \text{м}`]],
    find: String.raw`F \;—\; ?`,
    formulas: [FPAR],
    steps: [{ title: 'Четыре пары сторон', tex: String.raw`F = 4\cdot\frac{\mu_0I^2a}{2\pi d} = \frac{2\mu_0I^2a}{\pi d} = \frac{2\cdot4\cdot10^{-7}\cdot100\cdot0{,}2}{2\cdot10^{-3}} = 8\cdot10^{-3}\ \text{Н}` }],
    answer: [String.raw`F = 8\ \text{мН}`],
  },

  /* ===================== 22.12 ===================== */
  {
    id: '22.12', chapter: CH, section: S2, page: '328',
    title: 'Магнитный момент витка',
    given: [[String.raw`r = 5\ \text{см}`, String.raw`0{,}05\ \text{м}`], [String.raw`I = 10\ \text{А}`, '']],
    find: String.raw`p_m \;—\; ?`,
    formulas: [PM],
    steps: [{ title: 'Момент', tex: String.raw`p_m = I\pi r^2 = 10\cdot\pi\cdot0{,}0025 = 7{,}85\cdot10^{-2}\ \text{А·м}^2` }],
    answer: [String.raw`p_m = 78{,}5\ \text{мА·м}^2`],
    note: SMALL + 'В книге 78,6; точно 78,54.',
  },

  /* ===================== 22.13 ===================== */
  {
    id: '22.13', chapter: CH, section: S2, page: '328–329',
    title: 'Катушка квадратного сечения',
    given: [[String.raw`N = 1000`, ''], [String.raw`a = 10\ \text{см}`, String.raw`0{,}1\ \text{м}`], [String.raw`I = 1\ \text{А}`, '']],
    find: String.raw`p_m \;—\; ?`,
    formulas: [PM],
    steps: [{ title: 'Момент', tex: String.raw`p_m = NIa^2 = 1000\cdot1\cdot0{,}01 = 10\ \text{А·м}^2` }],
    answer: [String.raw`p_m = 10\ \text{А·м}^2`],
  },

  /* ===================== 22.14 ===================== */
  {
    id: '22.14', chapter: CH, section: S2, page: '329',
    title: 'Ток по магнитному моменту',
    given: [[String.raw`p_m = 0{,}2\ \text{Дж/Тл}`, ''], [String.raw`d = 10\ \text{см}`, String.raw`0{,}1\ \text{м}`]],
    find: String.raw`I \;—\; ?`,
    formulas: [PM],
    steps: [{ title: 'Ток', tex: String.raw`I = \frac{4p_m}{\pi d^2} = \frac{0{,}8}{\pi\cdot0{,}01} = 25{,}5\ \text{А}` }],
    answer: [String.raw`I = 25{,}5\ \text{А}`],
  },

  /* ===================== 22.15 ===================== */
  {
    id: '22.15', chapter: CH, section: S2, page: '329',
    title: 'Ток и радиус витка',
    given: [[String.raw`H = 200\ \text{А/м}`, ''], [String.raw`p_m = 1\ \text{А·м}^2`, '']],
    find: String.raw`I,\ R \;—\; ?`,
    formulas: [BRING, PM],
    steps: [
      { title: 'Система', tex: String.raw`H = \frac I{2R},\quad p_m = I\pi R^2 = 2\pi HR^3` },
      { title: 'Радиус', tex: String.raw`R = \sqrt[3]{\frac{p_m}{2\pi H}} = \sqrt[3]{\frac{1}{1257}} = 9{,}27\cdot10^{-2}\ \text{м}` },
      { title: 'Ток', tex: String.raw`I = 2HR = 2\cdot200\cdot0{,}0927 = 37\ \text{А}` },
    ],
    answer: [String.raw`I = 37\ \text{А};\quad R = 9{,}27\ \text{см}`],
  },

  /* ===================== 22.16 ===================== */
  {
    id: '22.16', chapter: CH, section: S2, page: '329',
    title: 'Магнитный момент по полю на оси',
    given: [[String.raw`d = 1\ \text{м}`, ''], [String.raw`B = 10\ \text{нТл}`, String.raw`10^{-8}\ \text{Тл}`], [String.raw`R \ll d`, '']],
    find: String.raw`p_m \;—\; ?`,
    formulas: [BDAX],
    steps: [{ title: 'Далеко от кольца — поле диполя', tex: String.raw`p_m = \frac{2\pi d^3B}{\mu_0} = \frac{2\pi\cdot10^{-8}}{4\pi\cdot10^{-7}} = 0{,}05\ \text{А·м}^2` }],
    answer: [String.raw`p_m = 50\ \text{мА·м}^2`],
  },

  /* ===================== 22.17 ===================== */
  {
    id: '22.17', chapter: CH, section: S2, page: '329',
    title: 'Магнитный момент атома водорода',
    given: [[String.raw`r = 53\ \text{пм}`, String.raw`5{,}3\cdot10^{-11}\ \text{м}`], [String.raw`B = 0{,}1\ \text{Тл}`, '']],
    find: String.raw`p_m,\ M \;—\; ?`,
    formulas: [PM, MOM, { tex: String.raw`v = \sqrt{\frac{e^2}{4\pi\varepsilon_0mr}}`, text: 'скорость электрона (см. 21.33)' }],
    steps: [
      { title: 'Скорость и момент', tex: String.raw`v = 2{,}18\cdot10^6\ \text{м/с},\quad p_m = \frac{ev}{2\pi r}\pi r^2 = \frac{evr}2 = \frac{1{,}6\cdot10^{-19}\cdot2{,}18\cdot10^6\cdot5{,}3\cdot10^{-11}}{2} = 9{,}26\cdot10^{-24}\ \text{А·м}^2` },
      { title: 'Механический момент', text: 'B параллельно плоскости орбиты — значит, перпендикулярно pₘ.',
        tex: String.raw`M = p_mB = 9{,}26\cdot10^{-25}\ \text{Н·м}` },
    ],
    answer: [String.raw`p_m = 9{,}3\cdot10^{-24}\ \text{А·м}^2;\quad M = 9{,}3\cdot10^{-25}\ \text{Н·м}`],
    note: MISMATCH + 'В книге 9,4·10⁻²⁴ и 9,4·10⁻²⁵ (на 1,5 % больше). С r = 53 пм и табличными e, m получается 9,26 — разница, видимо, от округления скорости.',
  },

  /* ===================== 22.18 ===================== */
  {
    id: '22.18', chapter: CH, section: S2, page: '329',
    title: 'Гиромагнитное отношение для электрона',
    given: [[String.raw`e,\ m`, '']],
    find: String.raw`p_m/L \;—\; ?`,
    formulas: [PM, { tex: String.raw`L = mvr`, text: 'момент импульса на круговой орбите' }],
    steps: [
      { title: 'Отношение', tex: String.raw`p_m = \frac{evr}2,\quad \frac{p_m}L = \frac{e}{2m} = \frac{1{,}6\cdot10^{-19}}{2\cdot9{,}11\cdot10^{-31}} = 8{,}78\cdot10^{10}\ \text{Кл/кг}` },
      { title: 'Направления', text: 'Заряд электрона отрицателен: ток течёт против его движения, поэтому pₘ и L направлены противоположно.' },
    ],
    answer: [String.raw`\frac{p_m}{L} = \frac{e}{2m} = 87{,}9\ \text{ГКл/кг};\ \mathbf p_m \uparrow\downarrow \mathbf L`],
    note: SMALL + 'С e = 1,60·10⁻¹⁹ Кл выходит 87,8; книга брала e = 1,602·10⁻¹⁹ Кл.',
  },

  /* ===================== 22.19 ===================== */
  {
    id: '22.19', chapter: CH, section: S2, page: '329',
    title: 'Вращающийся заряженный стержень',
    given: [[String.raw`l = 20\ \text{см}`, String.raw`0{,}2\ \text{м}`], [String.raw`Q = 240\ \text{нКл}`, String.raw`2{,}4\cdot10^{-7}\ \text{Кл}`], [String.raw`\omega = 10\ \text{рад/с}`, ''], [String.raw`m = 12\ \text{г}`, String.raw`0{,}012\ \text{кг}`]],
    find: String.raw`p_m,\ p_m/L \;—\; ?`,
    formulas: [PMQ],
    steps: [
      { title: 'Элемент стержня на расстоянии x', tex: String.raw`dp_m = \pi x^2\frac{\omega}{2\pi}\frac{Q}{l}dx\ \Rightarrow\ p_m = 2\cdot\frac{\omega Q}{2l}\int_0^{l/2}x^2dx = \frac{Ql^2\omega}{24}` },
      { title: '1) Момент', tex: String.raw`p_m = \frac{2{,}4\cdot10^{-7}\cdot0{,}04\cdot10}{24} = 4\cdot10^{-9}\ \text{А·м}^2` },
      { title: '2) Отношение', tex: String.raw`L = \frac{ml^2}{12}\omega\ \Rightarrow\ \frac{p_m}{L} = \frac{Q}{2m} = \frac{2{,}4\cdot10^{-7}}{0{,}024} = 10^{-5}\ \text{Кл/кг}` },
    ],
    answer: [String.raw`1)\ p_m = \frac{Ql^2\omega}{24} = 4\ \text{нА·м}^2;\quad 2)\ \frac{p_m}L = \frac Q{2m} = 10\ \text{мкКл/кг}`],
  },

  /* ===================== 22.20 ===================== */
  {
    id: '22.20', chapter: CH, section: S2, page: '329',
    title: 'Вращающееся заряженное кольцо',
    given: [[String.raw`R = 10\ \text{см}`, String.raw`0{,}1\ \text{м}`], [String.raw`Q = 10\ \text{нКл}`, String.raw`10^{-8}\ \text{Кл}`], [String.raw`n = 10\ \text{с}^{-1}`, ''], [String.raw`m = 10\ \text{г}`, String.raw`0{,}01\ \text{кг}`]],
    find: String.raw`p_m,\ p_m/L \;—\; ?`,
    formulas: [PMQ],
    steps: [
      { title: '1) Ток и момент', tex: String.raw`I = Qn,\quad p_m = \pi QnR^2 = \pi\cdot10^{-8}\cdot10\cdot0{,}01 = 3{,}14\cdot10^{-9}\ \text{А·м}^2` },
      { title: '2) Отношение', tex: String.raw`L = mR^2\cdot2\pi n\ \Rightarrow\ \frac{p_m}L = \frac Q{2m} = 5\cdot10^{-7}\ \text{Кл/кг}` },
    ],
    answer: [String.raw`1)\ 3{,}14\ \text{нА·м}^2;\quad 2)\ 500\ \text{нКл/кг}`],
  },

  /* ===================== 22.21 ===================== */
  {
    id: '22.21', chapter: CH, section: S2, page: '329',
    title: 'Кольцо вращается вокруг диаметра',
    given: [[String.raw`R = 10\ \text{см},\ Q = 10\ \text{нКл}`, ''], [String.raw`n = 10\ \text{с}^{-1},\ m = 10\ \text{г}`, '']],
    find: String.raw`p_m,\ p_m/L \;—\; ?`,
    formulas: [PMQ],
    steps: [
      { title: '1) Элемент на угле φ от оси', text: 'Он описывает окружность радиусом R sin φ.',
        tex: String.raw`p_m = \int_0^{2\pi}\pi R^2\sin^2\varphi\cdot n\frac{Q}{2\pi}d\varphi = \frac{\pi QnR^2}{2} = 1{,}57\cdot10^{-9}\ \text{А·м}^2` },
      { title: '2) Отношение', tex: String.raw`L = \frac{mR^2}{2}\cdot2\pi n\ \Rightarrow\ \frac{p_m}L = \frac Q{2m} = 500\ \text{нКл/кг}` },
    ],
    answer: [String.raw`1)\ 1{,}57\ \text{нА·м}^2;\quad 2)\ 500\ \text{нКл/кг}`],
  },

  /* ===================== 22.22 ===================== */
  {
    id: '22.22', chapter: CH, section: S2, page: '329',
    title: 'Вращающийся заряженный диск',
    given: [[String.raw`R = 10\ \text{см}`, String.raw`0{,}1\ \text{м}`], [String.raw`Q = 0{,}2\ \text{мкКл}`, String.raw`2\cdot10^{-7}\ \text{Кл}`], [String.raw`n = 20\ \text{с}^{-1}`, ''], [String.raw`m = 100\ \text{г}`, String.raw`0{,}1\ \text{кг}`]],
    find: String.raw`p_m,\ p_m/L \;—\; ?`,
    formulas: [PMQ],
    steps: [
      { title: '1) Кольцо радиусом r, ширина dr', tex: String.raw`dp_m = \pi r^2\cdot n\cdot\frac{Q}{\pi R^2}2\pi r\,dr\ \Rightarrow\ p_m = \frac{\pi QnR^2}{2} = \frac{\pi\cdot2\cdot10^{-7}\cdot20\cdot0{,}01}{2} = 6{,}28\cdot10^{-8}\ \text{А·м}^2` },
      { title: '2) Отношение', tex: String.raw`L = \frac{mR^2}{2}\cdot2\pi n = \pi mR^2n\ \Rightarrow\ \frac{p_m}L = \frac Q{2m} = \frac{2\cdot10^{-7}}{0{,}2} = 10^{-6}\ \text{Кл/кг}` },
    ],
    answer: [String.raw`1)\ 62{,}8\ \text{нА·м}^2;\quad 2)\ 1\ \text{мкКл/кг}`],
    note: MISMATCH + 'В книге p_m/L = 2 мкКл/кг. Для любого тела, где заряд распределён так же, как масса, p_m/L = Q/(2m) = 0,2·10⁻⁶/0,2 = 1 мкКл/кг (ср. 22.19–22.21, 22.24).',
  },

  /* ===================== 22.23 ===================== */
  {
    id: '22.23', chapter: CH, section: S2, page: '330',
    title: 'Вращающаяся заряженная сфера',
    given: [[String.raw`R = 10\ \text{см}`, String.raw`0{,}1\ \text{м}`], [String.raw`Q = 3\ \text{мКл}`, String.raw`3\cdot10^{-3}\ \text{Кл}`], [String.raw`\omega = 10\ \text{рад/с}`, ''], [String.raw`m = 100\ \text{г}`, String.raw`0{,}1\ \text{кг}`]],
    find: String.raw`p_m,\ p_m/L \;—\; ?`,
    formulas: [PMQ],
    steps: [
      { title: '1) Пояс сферы на угле θ', tex: String.raw`dQ = \frac Q2\sin\theta\,d\theta,\quad p_m = \int_0^\pi\pi R^2\sin^2\theta\frac\omega{2\pi}\frac Q2\sin\theta\,d\theta = \frac{QR^2\omega}{3}` },
      { title: 'По данным условия', tex: String.raw`p_m = \frac{3\cdot10^{-3}\cdot0{,}01\cdot10}{3} = 10^{-4}\ \text{А·м}^2` },
      { title: '2) Отношение', tex: String.raw`L = \frac23mR^2\omega\ \Rightarrow\ \frac{p_m}L = \frac Q{2m} = \frac{3\cdot10^{-3}}{0{,}2} = 1{,}5\cdot10^{-2}\ \text{Кл/кг}` },
    ],
    answer: [String.raw`p_m = \frac{QR^2\omega}{3} = 100\ \text{мкА·м}^2;\quad \frac{p_m}L = \frac Q{2m} = 15\ \text{мКл/кг}`],
    note: MISMATCH + 'В книге 1 нА·м² и 1,5 нКл/кг — формулы те же, а данные другие. Ответ книги получается при Q = 30 нКл и m = 10 кг (вероятно, опечатка в условии). По данным, напечатанным в условии, — 100 мкА·м² и 15 мКл/кг.',
  },

  /* ===================== 22.24 ===================== */
  {
    id: '22.24', chapter: CH, section: S2, page: '330',
    title: 'Вращающийся заряженный шар',
    given: [[String.raw`R = 10\ \text{см}`, String.raw`0{,}1\ \text{м}`], [String.raw`Q = 200\ \text{нКл}`, String.raw`2\cdot10^{-7}\ \text{Кл}`], [String.raw`\omega = 10\ \text{рад/с}`, ''], [String.raw`m = 10\ \text{кг}`, '']],
    find: String.raw`p_m,\ p_m/L \;—\; ?`,
    formulas: [PMQ],
    steps: [
      { title: '1) Шар — набор сферических слоёв (см. 22.23)', tex: String.raw`dp_m = \frac{r^2\omega}{3}\cdot\frac{3Q}{R^3}r^2dr\ \Rightarrow\ p_m = \frac{QR^2\omega}{5} = \frac{2\cdot10^{-7}\cdot0{,}01\cdot10}{5} = 4\cdot10^{-9}\ \text{А·м}^2` },
      { title: '2) Отношение', tex: String.raw`L = \frac25mR^2\omega\ \Rightarrow\ \frac{p_m}L = \frac Q{2m} = 10^{-8}\ \text{Кл/кг}` },
    ],
    answer: [String.raw`1)\ p_m = \frac{QR^2\omega}5 = 4\ \text{нА·м}^2;\quad 2)\ 10\ \text{нКл/кг}`],
  },

  /* ===================== 22.25 ===================== */
  {
    id: '22.25', chapter: CH, section: S3, page: '330',
    title: 'Момент сил на виток',
    given: [[String.raw`R = 5\ \text{см}`, String.raw`0{,}05\ \text{м}`], [String.raw`H = 2\ \text{кА/м}`, String.raw`2\cdot10^3\ \text{А/м}`], [String.raw`\alpha = 60^\circ`, ''], [String.raw`I = 4\ \text{А}`, '']],
    find: String.raw`M \;—\; ?`,
    formulas: [PM, MOM],
    steps: [
      { title: 'Угол нормали с полем', text: 'Плоскость витка — под 60° к полю, значит, нормаль — под 30°: sin 30° = cos α.' },
      { title: 'Момент', tex: String.raw`M = \mu_0HI\pi R^2\cos\alpha = 4\pi\cdot10^{-7}\cdot2\cdot10^3\cdot4\cdot\pi\cdot0{,}0025\cdot0{,}5 = 3{,}95\cdot10^{-5}\ \text{Н·м}` },
    ],
    answer: [String.raw`M = 39{,}5\ \text{мкН·м}`],
  },

  /* ===================== 22.26 ===================== */
  {
    id: '22.26', chapter: CH, section: S3, page: '330',
    title: 'Виток в плоскости магнитного меридиана',
    given: [[String.raw`d = 20\ \text{см}`, String.raw`0{,}2\ \text{м}`], [String.raw`I = 10\ \text{А}`, ''], [String.raw`B_\text{г} = 20\ \text{мкТл}`, String.raw`2\cdot10^{-5}\ \text{Тл}`]],
    find: String.raw`M \;—\; ?`,
    formulas: [PM, MOM],
    steps: [{ title: 'Нормаль ⟂ горизонтальному полю', text: 'Вертикальная составляющая поля Земли параллельна оси вращения и момента вокруг неё не даёт.',
      tex: String.raw`M = I\frac{\pi d^2}4B_\text{г} = 10\cdot\frac{\pi\cdot0{,}04}{4}\cdot2\cdot10^{-5} = 6{,}28\cdot10^{-6}\ \text{Н·м}` }],
    answer: [String.raw`M = 6{,}28\ \text{мкН·м}`],
  },

  /* ===================== 22.27 ===================== */
  {
    id: '22.27', chapter: CH, section: S3, page: '330',
    title: 'Рамка гальванометра',
    given: [[String.raw`a = 4\ \text{см},\ b = 1{,}5\ \text{см}`, String.raw`S = 6\cdot10^{-4}\ \text{м}^2`], [String.raw`N = 200`, ''], [String.raw`B = 0{,}1\ \text{Тл}`, ''], [String.raw`I = 1\ \text{мА}`, String.raw`10^{-3}\ \text{А}`]],
    find: String.raw`M,\ p_m \;—\; ?`,
    formulas: [PM, MOM],
    steps: [
      { title: '2) Магнитный момент', tex: String.raw`p_m = NIab = 200\cdot10^{-3}\cdot6\cdot10^{-4} = 1{,}2\cdot10^{-4}\ \text{А·м}^2` },
      { title: '1) Момент сил (нормаль ⟂ B)', tex: String.raw`M = p_mB = 1{,}2\cdot10^{-5}\ \text{Н·м}` },
    ],
    answer: [String.raw`1)\ M = 12\ \text{мкН·м};\quad 2)\ p_m = 120\ \text{мкА·м}^2`],
    note: TYPO + 'В ответе книги единица «мкН/м» — должно быть мкН·м.',
  },

  /* ===================== 22.28 ===================== */
  {
    id: '22.28', chapter: CH, section: S3, page: '330',
    title: 'Короткая катушка в поле',
    given: [[String.raw`S = 150\ \text{см}^2`, String.raw`1{,}5\cdot10^{-2}\ \text{м}^2`], [String.raw`N = 200,\ I = 4\ \text{А}`, ''], [String.raw`H = 8\ \text{кА/м}`, String.raw`8\cdot10^3\ \text{А/м}`], [String.raw`\alpha = 60^\circ`, '']],
    find: String.raw`p_m,\ M \;—\; ?`,
    formulas: [PM, MOM],
    steps: [
      { title: 'Магнитный момент', tex: String.raw`p_m = 200\cdot4\cdot0{,}015 = 12\ \text{А·м}^2` },
      { title: 'Вращающий момент', tex: String.raw`M = p_m\mu_0H\sin\alpha = 12\cdot1{,}005\cdot10^{-2}\cdot0{,}866 = 0{,}104\ \text{Н·м}` },
    ],
    answer: [String.raw`p_m = 12\ \text{А·м}^2;\quad M \approx 0{,}1\ \text{Н·м}`],
  },

  /* ===================== 22.29 ===================== */
  {
    id: '22.29', chapter: CH, section: S3, page: '330–331',
    title: 'Постоянная кручения нити',
    given: [[String.raw`N = 200`, ''], [String.raw`S = 1\ \text{см}^2`, String.raw`10^{-4}\ \text{м}^2`], [String.raw`B = 5\ \text{мТл}`, String.raw`5\cdot10^{-3}\ \text{Тл}`], [String.raw`I = 2\ \text{мкА}`, String.raw`2\cdot10^{-6}\ \text{А}`], [String.raw`\alpha = 30^\circ`, String.raw`\pi/6\ \text{рад}`]],
    find: String.raw`C \;—\; ?`,
    formulas: [MOM, { tex: String.raw`M_\text{упр} = C\alpha`, text: 'момент упругих сил нити' }],
    steps: [
      { title: 'Равновесие', text: 'Сначала нормаль ⟂ B; после поворота на α угол между ними 90° − α.',
        tex: String.raw`NISB\cos\alpha = C\alpha` },
      { title: 'Постоянная', tex: String.raw`C = \frac{200\cdot2\cdot10^{-6}\cdot10^{-4}\cdot5\cdot10^{-3}\cdot0{,}866}{0{,}5236} = 3{,}31\cdot10^{-10}\ \text{Н·м/рад}` },
    ],
    answer: [String.raw`C = \frac{NISB\cos\alpha}{\alpha} = 331\ \text{пН·м/рад}`],
    note: SMALL + 'В книге 332; точно 330,8.',
  },

  /* ===================== 22.30 ===================== */
  {
    id: '22.30', chapter: CH, section: S3, page: '331',
    title: 'Колебания квадратной рамки',
    given: [[String.raw`m = 2\ \text{г}`, String.raw`2\cdot10^{-3}\ \text{кг}`], [String.raw`I = 6\ \text{А}`, ''], [String.raw`B = 2\ \text{мТл}`, String.raw`2\cdot10^{-3}\ \text{Тл}`]],
    find: String.raw`T \;—\; ?`,
    formulas: [MOM, { tex: String.raw`T = 2\pi\sqrt{\frac{J}{p_mB}}`, text: 'малые колебания: M ≈ pₘBφ' }],
    steps: [
      { title: 'Момент инерции рамки', text: 'Ось — вертикаль через середины двух сторон. Две стороны (по m/4) параллельны оси на расстоянии a/2, две другие проходят через ось.',
        tex: String.raw`J = 2\cdot\frac m4\left(\frac a2\right)^2 + 2\cdot\frac m4\cdot\frac{a^2}{12} = \frac{ma^2}{6}` },
      { title: 'Период (a сокращается)', tex: String.raw`T = 2\pi\sqrt{\frac{ma^2/6}{Ia^2B}} = 2\pi\sqrt{\frac{m}{6IB}} = 2\pi\sqrt{\frac{2\cdot10^{-3}}{6\cdot6\cdot2\cdot10^{-3}}} = \frac{2\pi}6 = 1{,}05\ \text{с}` },
    ],
    answer: [String.raw`T = 2\pi\sqrt{\frac{m}{6IB}} = 1{,}05\ \text{с}`],
  },

  /* ===================== 22.31 ===================== */
  {
    id: '22.31', chapter: CH, section: S3, page: '331',
    title: 'Индукция по периоду колебаний кольца',
    given: [[String.raw`m = 3\ \text{г}`, String.raw`3\cdot10^{-3}\ \text{кг}`], [String.raw`I = 2\ \text{А}`, ''], [String.raw`T = 1{,}2\ \text{с}`, '']],
    find: String.raw`B \;—\; ?`,
    formulas: [{ tex: String.raw`T = 2\pi\sqrt{\frac{J}{p_mB}}`, text: 'период крутильных колебаний' }],
    steps: [
      { title: 'Кольцо вокруг диаметра', tex: String.raw`J = \frac{mR^2}2,\quad p_m = I\pi R^2` },
      { title: 'Индукция', tex: String.raw`B = \frac{4\pi^2J}{p_mT^2} = \frac{2\pi m}{IT^2} = \frac{2\pi\cdot3\cdot10^{-3}}{2\cdot1{,}44} = 6{,}54\cdot10^{-3}\ \text{Тл}` },
    ],
    answer: [String.raw`B = \frac{2\pi m}{IT^2} = 6{,}54\ \text{мТл}`],
    note: MISMATCH + 'В книге 6,65 мТл при той же формуле. 2π·0,003/(2·1,2²) = 6,54 мТл.',
  },

  /* ===================== 22.32 ===================== */
  {
    id: '22.32', chapter: CH, section: S3, page: '331',
    title: 'Контур на оси другого контура',
    given: [[String.raw`p_m = 10\ \text{мА·м}^2`, String.raw`10^{-2}\ \text{А·м}^2`], [String.raw`d = 50\ \text{см}`, String.raw`0{,}5\ \text{м}`]],
    find: String.raw`M \;—\; ?`,
    formulas: [BDAX, MOM],
    steps: [{ title: 'Поле первого контура ⟂ моменту второго', tex: String.raw`M = p_m\frac{\mu_0p_m}{2\pi d^3} = \frac{2\cdot10^{-7}\cdot10^{-4}}{0{,}125} = 1{,}6\cdot10^{-10}\ \text{Н·м}` }],
    answer: [String.raw`M = \frac{\mu_0p_m^2}{2\pi d^3} = 160\ \text{пН·м}`],
  },

  /* ===================== 22.33 ===================== */
  {
    id: '22.33', chapter: CH, section: S3, page: '331',
    title: 'Сила на малое кольцо на оси большого',
    given: [[String.raw`R = 20\ \text{см}`, String.raw`0{,}2\ \text{м}`], [String.raw`I = 100\ \text{А}`, ''], [String.raw`p_m = 10\ \text{мА·м}^2`, String.raw`10^{-2}\ \text{А·м}^2`], [String.raw`d = 1\ \text{см}`, String.raw`0{,}01\ \text{м}`]],
    find: String.raw`F \;—\; ?`,
    formulas: [FDIP],
    steps: [
      { title: 'Градиент поля на оси', tex: String.raw`B = \frac{\mu_0IR^2}{2(R^2 + x^2)^{3/2}}\ \Rightarrow\ \left|\frac{dB}{dx}\right| = \frac{3\mu_0IR^2x}{2(R^2 + x^2)^{5/2}} \approx \frac{3\mu_0Ix}{2R^3}` },
      { title: 'Сила', tex: String.raw`F = \frac{3\mu_0Ip_md}{2R^3} = \frac{3\cdot1{,}257\cdot10^{-6}\cdot100\cdot10^{-2}\cdot10^{-2}}{2\cdot8\cdot10^{-3}} = 2{,}36\cdot10^{-6}\ \text{Н}` },
    ],
    answer: [String.raw`F = \frac{3\mu_0Ip_md}{2R^3} = 2{,}36\ \text{мкН}`],
    note: MISMATCH + 'В книге 5,89 мН — с её же формулой и данными условия выходит 2,36 мкН. Точный расчёт без приближения d ≪ R даёт 2,34 мкН.',
  },

  /* ===================== 22.34 ===================== */
  {
    id: '22.34', chapter: CH, section: S4, page: '331',
    title: 'Диполь у прямого тока',
    given: [[String.raw`I = 100\ \text{А}`, ''], [String.raw`a = 10\ \text{см}`, String.raw`0{,}1\ \text{м}`], [String.raw`p_m = 1\ \text{мА·м}^2`, String.raw`10^{-3}\ \text{А·м}^2`]],
    find: String.raw`F \;—\; ?`,
    formulas: [BLINE, { tex: String.raw`\mathbf F = (\mathbf p_m\cdot\nabla)\mathbf B`, text: 'сила на точечный диполь' }],
    steps: [
      { title: 'Момент направлен вдоль радиуса r', text: 'Поэтому сила определяется изменением B вдоль r; по направлению она параллельна B (перпендикулярна плоскости провода и диполя).',
        tex: String.raw`F = p_m\left|\frac{dB}{dr}\right| = \frac{\mu_0p_mI}{2\pi a^2} = \frac{2\cdot10^{-7}\cdot10^{-3}\cdot100}{0{,}01} = 2\cdot10^{-6}\ \text{Н}` },
    ],
    answer: [String.raw`F = \frac{\mu_0p_mI}{2\pi a^2} = 2\ \text{мкН}`],
  },

  /* ===================== 22.35 ===================== */
  {
    id: '22.35', chapter: CH, section: S4, page: '331',
    title: 'Неоднородность поля',
    given: [[String.raw`F_{\max} = 1\ \text{мН}`, String.raw`10^{-3}\ \text{Н}`], [String.raw`p_m = 2\ \text{мА·м}^2`, String.raw`2\cdot10^{-3}\ \text{А·м}^2`]],
    find: String.raw`dB/dx \;—\; ?`,
    formulas: [FDIP],
    steps: [{ title: 'Максимум — при pₘ вдоль B', tex: String.raw`\frac{dB}{dx} = \frac{F_{\max}}{p_m} = \frac{10^{-3}}{2\cdot10^{-3}} = 0{,}5\ \text{Тл/м}` }],
    answer: [String.raw`dB/dx = 0{,}5\ \text{Тл/м}`],
  },

  /* ===================== 22.36 ===================== */
  {
    id: '22.36', chapter: CH, section: S4, page: '331',
    title: 'Компас в центре витка',
    given: [[String.raw`R = 20\ \text{см}`, String.raw`0{,}2\ \text{м}`], [String.raw`\alpha = 9^\circ`, ''], [String.raw`B_\text{г} = 20\ \text{мкТл}`, '']],
    find: String.raw`I \;—\; ?`,
    formulas: [BRING, BG],
    steps: [
      { title: 'Поле витка ⟂ меридиану', tex: String.raw`\frac{\mu_0I}{2R} = B_\text{г}\operatorname{tg}\alpha` },
      { title: 'Ток', tex: String.raw`I = \frac{2RB_\text{г}\operatorname{tg}\alpha}{\mu_0} = \frac{0{,}4\cdot2\cdot10^{-5}\cdot0{,}1584}{1{,}257\cdot10^{-6}} = 1{,}01\ \text{А}` },
    ],
    answer: [String.raw`I = 1{,}01\ \text{А}`],
  },

  /* ===================== 22.37 ===================== */
  {
    id: '22.37', chapter: CH, section: S4, page: '332',
    title: 'Тангенс-гальванометр',
    given: [[String.raw`r = 25\ \text{см}`, String.raw`0{,}25\ \text{м}`], [String.raw`I = \operatorname{tg}\alpha`, ''], [String.raw`B_\text{г} = 20\ \text{мкТл}`, '']],
    find: String.raw`N \;—\; ?`,
    formulas: [BRING, BG],
    steps: [{ title: 'Число витков', tex: String.raw`\operatorname{tg}\alpha = \frac{\mu_0NI}{2rB_\text{г}}\ \Rightarrow\ N = \frac{2rB_\text{г}}{\mu_0} = \frac{0{,}5\cdot2\cdot10^{-5}}{1{,}257\cdot10^{-6}} = 7{,}96 \approx 8` }],
    answer: [String.raw`N = 8`],
  },

  /* ===================== 22.38 ===================== */
  {
    id: '22.38', chapter: CH, section: S4, page: '332',
    title: 'Стрелка в соленоиде',
    given: [[String.raw`n = 5\ \text{см}^{-1}`, String.raw`500\ \text{м}^{-1}`], [String.raw`\alpha = 60^\circ`, ''], [String.raw`B_\text{г} = 20\ \text{мкТл}`, '']],
    find: String.raw`I \;—\; ?`,
    formulas: [{ tex: String.raw`B = \mu_0nI`, text: 'поле внутри длинного соленоида' }, BG],
    steps: [{ title: 'Ток', tex: String.raw`I = \frac{B_\text{г}\operatorname{tg}\alpha}{\mu_0n} = \frac{2\cdot10^{-5}\cdot1{,}732}{1{,}257\cdot10^{-6}\cdot500} = 5{,}5\cdot10^{-2}\ \text{А}` }],
    answer: [String.raw`I = 55\ \text{мА}`],
  },

  /* ===================== 22.39 ===================== */
  {
    id: '22.39', chapter: CH, section: S4, page: '332',
    title: 'Магнитный момент магнита по отклонению стрелки',
    given: [[String.raw`r = 50\ \text{см}`, String.raw`0{,}5\ \text{м}`], [String.raw`\alpha = 6^\circ`, ''], [String.raw`B_\text{г} = 20\ \text{мкТл}`, '']],
    find: String.raw`p_m \;—\; ?`,
    formulas: [BDAX, BG],
    steps: [{ title: 'Стрелка на оси магнита', tex: String.raw`\frac{\mu_0p_m}{2\pi r^3} = B_\text{г}\operatorname{tg}\alpha\ \Rightarrow\ p_m = \frac{2\pi r^3B_\text{г}\operatorname{tg}\alpha}{\mu_0} = \frac{2\pi\cdot0{,}125\cdot2\cdot10^{-5}\cdot0{,}1051}{1{,}257\cdot10^{-6}} = 1{,}31\ \text{А·м}^2` }],
    answer: [String.raw`p_m = 1{,}31\ \text{А·м}^2`],
    note: SMALL + 'В книге 1,32; точно 1,314.',
  },

  /* ===================== 22.40 ===================== */
  {
    id: '22.40', chapter: CH, section: S4, page: '332',
    title: 'Разряды конденсатора через гальванометр',
    given: [[String.raw`C = 50\ \text{мкФ}`, String.raw`5\cdot10^{-5}\ \text{Ф}`], [String.raw`\mathcal E = 80\ \text{В}`, ''], [String.raw`\nu = 100\ \text{с}^{-1}`, ''], [String.raw`N = 10,\ r = 25\ \text{см}`, '']],
    find: String.raw`\alpha \;—\; ?`,
    formulas: [BRING, BG],
    steps: [
      { title: 'Средний ток', text: 'Стрелка инерционна и реагирует на средний ток.',
        tex: String.raw`\bar I = C\mathcal E\nu = 5\cdot10^{-5}\cdot80\cdot100 = 0{,}4\ \text{А}` },
      { title: 'Угол', tex: String.raw`\operatorname{tg}\alpha = \frac{\mu_0N\bar I}{2rB_\text{г}} = \frac{1{,}257\cdot10^{-6}\cdot10\cdot0{,}4}{0{,}5\cdot2\cdot10^{-5}} = 0{,}503\ \Rightarrow\ \alpha = 26{,}7^\circ` },
    ],
    answer: [String.raw`\alpha = 26{,}7^\circ`],
    note: SMALL + 'В книге 26,5° (разница 0,7 %, в пределах округления Bг).',
  },

  /* ===================== 22.41 ===================== */
  {
    id: '22.41', chapter: CH, section: S4, page: '332',
    title: 'Поворот стрелки в центре кругового провода',
    given: [[String.raw`R = 10\ \text{см}`, String.raw`0{,}1\ \text{м}`], [String.raw`\alpha = 20^\circ`, ''], [String.raw`I = 3\ \text{А}`, ''], [String.raw`B_\text{г} = 20\ \text{мкТл}`, '']],
    find: String.raw`\Delta\alpha \;—\; ?`,
    formulas: [BRING, { tex: String.raw`\operatorname{tg}\beta = \frac{B_\text{г}\sin\alpha + B}{B_\text{г}\cos\alpha}`, text: 'новый угол стрелки с плоскостью провода' }],
    steps: [
      { title: 'Поле провода ⟂ его плоскости', tex: String.raw`B = \frac{\mu_0I}{2R} = 1{,}885\cdot10^{-5}\ \text{Тл}` },
      { title: 'Новый угол', text: 'Раскладываем поле Земли на составляющие вдоль плоскости провода и поперёк; поле тока складывается с поперечной (угол растёт).',
        tex: String.raw`\operatorname{tg}\beta = \frac{2\cdot10^{-5}\cdot0{,}342 + 1{,}885\cdot10^{-5}}{2\cdot10^{-5}\cdot0{,}940} = 1{,}367\ \Rightarrow\ \beta = 53{,}8^\circ` },
      { title: 'Поворот', tex: String.raw`\Delta\alpha = \beta - \alpha = 33{,}8^\circ` },
    ],
    answer: [String.raw`\Delta\alpha = 33{,}8^\circ`],
    note: SMALL + 'В книге 33,5° (разница 0,9 %, от округления Bг).',
  },

  /* ===================== 22.42 ===================== */
  {
    id: '22.42', chapter: CH, section: S4, page: '332',
    title: 'Два соосных диполя',
    given: [[String.raw`p_m = 4\ \text{мА·м}^2`, String.raw`4\cdot10^{-3}\ \text{А·м}^2`], [String.raw`r = 2\ \text{м}`, '']],
    find: String.raw`\Pi,\ F \;—\; ?`,
    formulas: [BDAX, { tex: String.raw`\Pi = -p_mB,\quad F = -\frac{d\Pi}{dr}`, text: 'энергия диполя в поле и сила' }],
    steps: [
      { title: 'Энергия (по рис. 22.4 моменты на одной оси и сонаправлены)', tex: String.raw`\Pi = -\frac{\mu_0p_m^2}{2\pi r^3} = -\frac{2\cdot10^{-7}\cdot1{,}6\cdot10^{-5}}{8} = -4\cdot10^{-13}\ \text{Дж}` },
      { title: 'Сила (притяжение)', tex: String.raw`F = \left|\frac{d\Pi}{dr}\right| = \frac{3\mu_0p_m^2}{2\pi r^4} = \frac{3\cdot2\cdot10^{-7}\cdot1{,}6\cdot10^{-5}}{16} = 6\cdot10^{-13}\ \text{Н}` },
    ],
    answer: [String.raw`\Pi = -4\cdot10^{-13}\ \text{Дж};\quad F = 6\cdot10^{-13}\ \text{Н}`],
  },

  /* ===================== 22.43 ===================== */
  {
    id: '22.43', chapter: CH, section: S4, page: '332–333',
    title: 'Кольцо повернулось в поле',
    given: [[String.raw`R = 10\ \text{см}`, String.raw`0{,}1\ \text{м}`], [String.raw`m = 20\ \text{г}`, String.raw`0{,}02\ \text{кг}`], [String.raw`I = 25\ \text{А}`, ''], [String.raw`\alpha = 15^\circ`, '']],
    find: String.raw`B \;—\; ?`,
    formulas: [MOM, { tex: String.raw`M_g = mgR\sin\alpha`, text: 'момент силы тяжести (ось OO′ касается кольца сверху)' }],
    steps: [
      { title: 'Равновесие моментов', text: 'Сначала нормаль горизонтальна (⟂ B); после поворота на α угол между нормалью и B равен 90° − α.',
        tex: String.raw`I\pi R^2B\cos\alpha = mgR\sin\alpha` },
      { title: 'Индукция', tex: String.raw`B = \frac{mg\operatorname{tg}\alpha}{\pi RI} = \frac{0{,}02\cdot9{,}81\cdot0{,}268}{\pi\cdot0{,}1\cdot25} = 6{,}69\cdot10^{-3}\ \text{Тл}` },
    ],
    answer: [String.raw`B = \frac{mg}{\pi RI}\operatorname{tg}\alpha = 6{,}69\ \text{мТл}`],
  },

  /* ===================== 22.44 ===================== */
  {
    id: '22.44', chapter: CH, section: S4, page: '333',
    title: 'Медная скоба в поле',
    given: [[String.raw`S = 2\ \text{мм}^2`, String.raw`2\cdot10^{-6}\ \text{м}^2`], [String.raw`B = 10\ \text{мТл}`, String.raw`10^{-2}\ \text{Тл}`], [String.raw`I = 20\ \text{А}`, ''], [String.raw`\rho = 8{,}93\cdot10^3\ \text{кг/м}^3`, '']],
    find: String.raw`\alpha \;—\; ?`,
    formulas: [FA],
    steps: [
      { title: 'Моменты относительно OO′', text: 'По рис. 22.6 все три стороны имеют длину a. Сила Ампера на боковые стороны направлена вдоль оси и момента не дает. На нижнюю сторону действует горизонтальная сила IBa с плечом a cos α.',
        tex: String.raw`IBa\cdot a\cos\alpha = \underbrace{2\rho Sag\frac a2\sin\alpha}_{\text{боковые}} + \underbrace{\rho Sag\cdot a\sin\alpha}_{\text{нижняя}} = 2\rho Sga^2\sin\alpha` },
      { title: 'Угол', tex: String.raw`\operatorname{tg}\alpha = \frac{IB}{2\rho gS} = \frac{20\cdot10^{-2}}{2\cdot8930\cdot9{,}81\cdot2\cdot10^{-6}} = 0{,}571\ \Rightarrow\ \alpha = 29{,}7^\circ` },
    ],
    answer: [String.raw`\alpha = \operatorname{arctg}\frac{IB}{2\rho gS} = 29{,}7^\circ`],
    note: SMALL + 'В книге 29,8° — взята плотность меди 8,9·10³ кг/м³; по табл. 9 (8,93) выходит 29,7°.',
  },

  /* ===================== 22.45 ===================== */
  {
    id: '22.45', chapter: CH, section: S4, page: '333',
    title: 'Освобождённое кольцо',
    given: [[String.raw`m = 20\ \text{г}`, String.raw`0{,}02\ \text{кг}`], [String.raw`I = 10\ \text{А}`, ''], [String.raw`B = 12\ \text{мТл}`, String.raw`1{,}2\cdot10^{-2}\ \text{Тл}`]],
    find: String.raw`\varepsilon,\ \omega_{\max} \;—\; ?`,
    formulas: [MOM, { tex: String.raw`M = J\varepsilon,\quad p_mB = \frac{J\omega_{\max}^2}{2}`, text: 'уравнение динамики и закон сохранения энергии' }],
    steps: [
      { title: '1) Начальный момент максимален (нормаль ⟂ B)', tex: String.raw`J = \frac{mR^2}2\ \Rightarrow\ \varepsilon = \frac{I\pi R^2B}{mR^2/2} = \frac{2\pi IB}m = \frac{2\pi\cdot10\cdot0{,}012}{0{,}02} = 37{,}7\ \text{рад/с}^2` },
      { title: '2) Максимальная скорость — при повороте на 90°', tex: String.raw`\omega_{\max} = \sqrt{\frac{2p_mB}{J}} = 2\sqrt{\frac{\pi IB}m} = 2\sqrt{18{,}85} = 8{,}68\ \text{рад/с}` },
    ],
    answer: [String.raw`1)\ \varepsilon = 37{,}7\ \text{рад/с}^2;\quad 2)\ \omega_{\max} = 8{,}68\ \text{рад/с}`],
  },

  /* ===================== 22.46 ===================== */
  {
    id: '22.46', chapter: CH, section: S4, page: '333',
    title: 'Освобождённый квадратный контур',
    given: [[String.raw`m = 40\ \text{г}`, String.raw`0{,}04\ \text{кг}`], [String.raw`I = 15\ \text{А}`, ''], [String.raw`B = 10\ \text{мТл}`, String.raw`10^{-2}\ \text{Тл}`]],
    find: String.raw`\varepsilon,\ \omega_{\max} \;—\; ?`,
    formulas: [MOM, { tex: String.raw`M = J\varepsilon,\quad p_mB = \frac{J\omega_{\max}^2}{2}`, text: 'динамика и сохранение энергии' }],
    steps: [
      { title: 'Момент инерции (см. 22.30)', tex: String.raw`J = \frac{ma^2}{6},\quad p_m = Ia^2` },
      { title: '1) Угловое ускорение', tex: String.raw`\varepsilon = \frac{6IB}{m} = \frac{6\cdot15\cdot0{,}01}{0{,}04} = 22{,}5\ \text{рад/с}^2` },
      { title: '2) Максимальная скорость', tex: String.raw`\omega_{\max} = \sqrt{\frac{12IB}{m}} = 2\sqrt{\frac{3IB}m} = 6{,}71\ \text{рад/с}` },
    ],
    answer: [String.raw`1)\ 22{,}5\ \text{рад/с}^2;\quad 2)\ 6{,}71\ \text{рад/с}`],
  },

  /* ===================== 22.47 ===================== */
  {
    id: '22.47', chapter: CH, section: S4, page: '334',
    title: 'Освобождённый треугольный контур',
    given: [[String.raw`m = 12\ \text{г}`, String.raw`0{,}012\ \text{кг}`], [String.raw`I = 4\ \text{А}`, ''], [String.raw`B = 8\ \text{мТл}`, String.raw`8\cdot10^{-3}\ \text{Тл}`]],
    find: String.raw`\varepsilon,\ \omega_{\max} \;—\; ?`,
    formulas: [MOM, { tex: String.raw`M = J\varepsilon,\quad p_mB = \frac{J\omega_{\max}^2}{2}`, text: 'динамика и сохранение энергии' }],
    steps: [
      { title: 'Момент инерции', text: 'Высота h = a√3/2, ось через центр масс на h/3 от основания. Основание — на расстоянии h/3; наклонные стороны равномерно заполняют расстояния от −h/3 до 2h/3, средний квадрат — h²/9.',
        tex: String.raw`J = 3\cdot\frac m3\cdot\frac{h^2}9 = \frac{mh^2}9 = \frac{ma^2}{12},\quad p_m = I\frac{\sqrt3a^2}4` },
      { title: '1) Угловое ускорение', tex: String.raw`\varepsilon = \frac{p_mB}J = 3\sqrt3\frac{IB}m = 5{,}196\cdot\frac{4\cdot8\cdot10^{-3}}{0{,}012} = 13{,}9\ \text{рад/с}^2` },
      { title: '2) Максимальная скорость', tex: String.raw`\omega_{\max} = \sqrt{\frac{2p_mB}J} = \sqrt{6\sqrt3\frac{IB}m} = 108^{1/4}\sqrt{\frac{IB}m} = 3{,}224\cdot1{,}633 = 5{,}26\ \text{рад/с}` },
    ],
    answer: [String.raw`1)\ 13{,}9\ \text{рад/с}^2;\quad 2)\ 5{,}26\ \text{рад/с}`],
  },

  /* ===================== 22.48 ===================== */
  {
    id: '22.48', chapter: CH, section: S4, page: '334',
    title: 'Кольцо в расходящемся поле',
    given: [[String.raw`m = 10\ \text{г}`, String.raw`0{,}01\ \text{кг}`], [String.raw`R = 6\ \text{см}`, String.raw`0{,}06\ \text{м}`], [String.raw`I = 15\ \text{А}`, ''], [String.raw`B = 0{,}08\ \text{Тл}`, ''], [String.raw`\alpha = 30^\circ`, '']],
    find: String.raw`a \;—\; ?`,
    formulas: [FA],
    steps: [
      { title: 'Сила', text: 'Осевая составляющая B даёт радиальные силы, которые взаимно уравновешиваются. Радиальная составляющая B sin α даёт силы вдоль оси Ox, и они складываются.',
        tex: String.raw`F = I\cdot2\pi R\cdot B\sin\alpha = 15\cdot2\pi\cdot0{,}06\cdot0{,}08\cdot0{,}5 = 0{,}226\ \text{Н}` },
      { title: 'Ускорение', tex: String.raw`a = \frac Fm = 22{,}6\ \text{м/с}^2` },
    ],
    answer: [String.raw`a = \frac{2\pi IBR}{m}\sin\alpha = 22{,}6\ \text{м/с}^2`],
  }

  );
})();
