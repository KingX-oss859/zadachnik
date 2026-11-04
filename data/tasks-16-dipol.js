/*
  § 16. Электрический диполь. Свойства диэлектриков — задачи 16.1–16.65 (стр. 262–270).
  Условия задач показываются дословно из книги (data/book-tasks.js).
  Ответы пересчитаны скриптом tools/check_dipol.py и сверены с book/99-otvety.md.
  Где ответ книги расходится с расчётом — плашка note «Расхождение с ответом книги».
  ε₀ = 8,85·10⁻¹² Ф/м, 1/(4πε₀) = 8,99·10⁹ м/Ф; e = 1,60·10⁻¹⁹ Кл; k = 1,38·10⁻²³ Дж/К; N_A = 6,02·10²³ моль⁻¹;
  при нормальных условиях n_L = N_A/V_m = 2,69·10²⁵ м⁻³; 1 D = 3,336·10⁻³⁰ Кл·м.
  ε — табл. 17: стекло 7, фарфор 5, эбонит 3; плотность сероуглерода 1,26 г/см³ — табл. 9.
*/
(function () {
  const CH = 'Гл. 3. Электростатика';
  const S1 = 'Напряжённость и потенциал поля диполя. Электрический момент диполя';
  const S2 = 'Диполь в электрическом поле';
  const S3 = 'Поляризация диэлектриков';
  const S4 = 'Электрическое поле в диэлектрике';
  const S5 = 'Поляризованность диэлектрика';
  const S6 = 'Электронная и атомная поляризации';
  const S7 = 'Ориентационная поляризация';
  const MISMATCH = '<b>Расхождение с ответом книги.</b> ';
  const SMALL = '<b>Расхождение в последней цифре.</b> ';
  const TYPO = '<b>Опечатка в ответе книги.</b> ';

  const PMOM = { tex: String.raw`p = |Q|\,l`, text: 'электрический момент диполя: заряд × плечо' };
  const EAX = { tex: String.raw`E = \frac{1}{4\pi\varepsilon_0}\frac{2p}{r^3}`, text: 'поле точечного диполя на его оси' };
  const EPERP = { tex: String.raw`E = \frac{1}{4\pi\varepsilon_0}\frac{p}{r^3}`, text: 'поле точечного диполя на перпендикуляре к оси' };
  const EGEN = { tex: String.raw`E = \frac{1}{4\pi\varepsilon_0}\frac{p}{r^3}\sqrt{1 + 3\cos^2\theta}`, text: 'поле точечного диполя в общем случае; θ — угол между r и p' };
  const PHID = { tex: String.raw`\varphi = \frac{p\cos\theta}{4\pi\varepsilon_0 r^2}`, text: 'потенциал поля точечного диполя' };
  const PHIQ = { tex: String.raw`\varphi = \frac{Q}{4\pi\varepsilon_0 r},\quad E = \frac{|Q|}{4\pi\varepsilon_0 r^2}`, text: 'потенциал и напряжённость поля точечного заряда' };
  const WD = { tex: String.raw`\Pi = -pE\cos\alpha`, text: 'потенциальная энергия диполя в поле; α — угол между p и E' };
  const MD = { tex: String.raw`M = pE\sin\alpha`, text: 'момент сил, поворачивающий диполь к полю' };
  const FD = { tex: String.raw`F = p\frac{\partial E}{\partial x}\cos\alpha`, text: 'сила, действующая на диполь в неоднородном поле' };
  const PK = { tex: String.raw`P = \varkappa\varepsilon_0E = (\varepsilon - 1)\varepsilon_0E`, text: 'поляризованность через среднее макроскопическое поле E' };
  const EE0 = { tex: String.raw`E = \frac{E_0}{\varepsilon} = E_0 - \frac{P}{\varepsilon_0}`, text: 'поле в диэлектрике и внешнее поле E₀' };
  const ELOC = { tex: String.raw`E_\text{лок} = E + \frac{P}{3\varepsilon_0} = \frac{\varepsilon + 2}{3}E = \frac{\varepsilon + 2}{3\varepsilon}E_0`, text: 'локальное поле (поле Лоренца)' };
  const PIND = { tex: String.raw`p = \alpha\varepsilon_0E_\text{лок}`, text: 'индуцированный момент молекулы; α — поляризуемость (м³)' };
  const CM = { tex: String.raw`\frac{\varepsilon - 1}{\varepsilon + 2} = \frac13\alpha n,\quad n = \frac{\rho N_\text{A}}{M}`, text: 'уравнение Клаузиуса–Мосотти; n — концентрация молекул' };
  const LL = { tex: String.raw`\frac{n^2 - 1}{n^2 + 2} = \frac13\alpha_e n_0`, text: 'формула Лоренц–Лоренца (n — показатель преломления, n₀ — концентрация)' };
  const LOSCH = { tex: String.raw`n_L = \frac{N_\text{A}}{V_m} = \frac{6{,}02\cdot10^{23}}{22{,}4\cdot10^{-3}} = 2{,}69\cdot10^{25}\ \text{м}^{-3}`, text: 'концентрация молекул газа при нормальных условиях' };
  const AOR = { tex: String.raw`\alpha_\text{ор} = \frac{p^2}{3\varepsilon_0kT}`, text: 'ориентационная поляризуемость' };
  const WSYS_ = { tex: String.raw`\Pi = \sum_{i<j}\frac{Q_iQ_j}{4\pi\varepsilon_0 r_{ij}}`, text: 'энергия системы зарядов — сумма энергий всех пар (пары внутри одного диполя не меняются)' };
  const KCONST = { tex: String.raw`\frac{1}{4\pi\varepsilon_0} = 8{,}99\cdot10^9\ \text{м/Ф}`, text: 'ε₀ = 8,85·10⁻¹² Ф/м' };

  window.TASKS.push(

  /* ===================== 16.1 ===================== */
  {
    id: '16.1', chapter: CH, section: S1, page: '262',
    title: 'Электрический момент диполя',
    given: [[String.raw`Q = 10\ \text{нКл}`, String.raw`10^{-8}\ \text{Кл}`], [String.raw`l = 0{,}5\ \text{см}`, String.raw`5\cdot10^{-3}\ \text{м}`]],
    find: String.raw`p \;—\; ?`,
    formulas: [PMOM],
    steps: [
      { title: 'Определение',
        tex: String.raw`p = Ql = 10^{-8}\cdot5\cdot10^{-3} = 5\cdot10^{-11}\ \text{Кл·м}` },
    ],
    answer: [String.raw`p = 5\cdot10^{-11}\ \text{Кл·м} = 50\ \text{пКл·м}`],
    note: TYPO + 'В книге «50 нКл·м». 10 нКл × 0,005 м = 5·10⁻¹¹ Кл·м = 50 пКл·м: в книге перепутана приставка.',
  },

  /* ===================== 16.2 ===================== */
  {
    id: '16.2', chapter: CH, section: S1, page: '263',
    title: 'Точка на равных расстояниях от зарядов',
    given: [[String.raw`Q = \pm3{,}2\ \text{нКл}`, String.raw`3{,}2\cdot10^{-9}\ \text{Кл}`], [String.raw`l = 12\ \text{см}`, String.raw`0{,}12\ \text{м}`], [String.raw`r = 8\ \text{см}`, String.raw`0{,}08\ \text{м}`]],
    find: String.raw`E,\ \varphi \;—\; ?`,
    formulas: [PHIQ, KCONST],
    steps: [
      { title: 'Почему не формула точечного диполя',
        text: 'Точка отстоит от зарядов на 8 см, а плечо 12 см — диполь не точечный. Складываем поля двух зарядов.' },
      { title: 'Поле каждого заряда',
        tex: String.raw`E_1 = E_2 = \frac{Q}{4\pi\varepsilon_0r^2} = \frac{8{,}99\cdot10^9\cdot3{,}2\cdot10^{-9}}{0{,}08^2} = 4{,}50\cdot10^3\ \text{В/м}` },
      { title: 'Сумма',
        text: 'Точка — на серединном перпендикуляре. Составляющие поперёк оси взаимно гасятся, вдоль оси (от + к −) складываются; cos угла с осью = (l/2)/r.',
        tex: String.raw`E = 2E_1\frac{l/2}{r} = 2\cdot4{,}50\cdot10^3\cdot\frac{0{,}06}{0{,}08} = 6{,}74\cdot10^3\ \text{В/м}` },
      { title: 'Потенциал',
        tex: String.raw`\varphi = \frac{Q}{4\pi\varepsilon_0r} - \frac{Q}{4\pi\varepsilon_0r} = 0` },
    ],
    answer: [String.raw`E = 6{,}74\ \text{кВ/м}`, String.raw`\varphi = 0`],
    note: SMALL + 'В книге 6,75 кВ/м (с 9·10⁹). Потенциал в ответе книги не приведён — он равен нулю.',
  },

  /* ===================== 16.3 ===================== */
  {
    id: '16.3', chapter: CH, section: S1, page: '263',
    title: 'Поле диполя в точках A и B (r = 8 см)',
    given: [[String.raw`p = 0{,}12\ \text{нКл·м}`, String.raw`1{,}2\cdot10^{-10}\ \text{Кл·м}`], [String.raw`Q = \pm1\ \text{нКл}`, String.raw`10^{-9}\ \text{Кл}`], [String.raw`r = 8\ \text{см}`, String.raw`0{,}08\ \text{м}`]],
    find: String.raw`E_A,\ \varphi_A,\ E_B,\ \varphi_B \;—\; ?`,
    formulas: [PMOM, PHIQ, KCONST],
    steps: [
      { title: 'Плечо',
        text: 'l = 12 см больше r = 8 см — диполь не точечный, считаем по зарядам (заряды в ±6 см от центра).',
        tex: String.raw`l = \frac pQ = \frac{1{,}2\cdot10^{-10}}{10^{-9}} = 0{,}12\ \text{м}` },
      { title: 'Точка A (на перпендикуляре через центр)',
        text: 'До каждого заряда √(0,08² + 0,06²) = 0,1 м. Поперечные составляющие гасятся.',
        tex: String.raw`E_A = 2\cdot\frac{8{,}99\cdot10^9\cdot10^{-9}}{0{,}1^2}\cdot\frac{0{,}06}{0{,}1} = 1{,}08\cdot10^3\ \text{В/м},\quad \varphi_A = 0` },
      { title: 'Точка B (на оси)',
        text: 'До ближнего (+) заряда 2 см, до дальнего (−) — 14 см.',
        tex: String.raw`E_B = 8{,}99\left(\frac{1}{0{,}02^2} - \frac{1}{0{,}14^2}\right) = 22{,}0\cdot10^3\ \text{В/м}` },
      { title: 'Потенциал в B',
        tex: String.raw`\varphi_B = 8{,}99\left(\frac{1}{0{,}02} - \frac{1}{0{,}14}\right) = 385\ \text{В}` },
    ],
    answer: [String.raw`E_A = 1{,}08\ \text{кВ/м};\quad \varphi_A = 0`, String.raw`E_B = 22\ \text{кВ/м};\quad \varphi_B = 385\ \text{В}`],
    note: SMALL + 'В книге φ_B = 386 В (с 9·10⁹).',
  },

  /* ===================== 16.4 ===================== */
  {
    id: '16.4', chapter: CH, section: S1, page: '263',
    title: 'Точечный диполь: точки A и B (r = 10 см)',
    given: [[String.raw`p = 10^{-12}\ \text{Кл·м}`, ''], [String.raw`r = 10\ \text{см}`, String.raw`0{,}1\ \text{м}`]],
    find: String.raw`E_A,\ \varphi_A,\ E_B,\ \varphi_B \;—\; ?`,
    formulas: [EAX, EPERP, PHID],
    steps: [
      { title: 'A — на перпендикуляре к оси (θ = 90°)',
        tex: String.raw`E_A = \frac{8{,}99\cdot10^9\cdot10^{-12}}{0{,}1^3} = 9\ \text{В/м},\quad \varphi_A = 0` },
      { title: 'B — на оси (θ = 0)',
        tex: String.raw`E_B = 2E_A = 18\ \text{В/м},\quad \varphi_B = \frac{8{,}99\cdot10^9\cdot10^{-12}}{0{,}1^2} = 0{,}9\ \text{В}` },
    ],
    answer: [String.raw`E_A = 9\ \text{В/м};\quad \varphi_A = 0`, String.raw`E_B = 18\ \text{В/м};\quad \varphi_B = 0{,}9\ \text{В}`],
  },

  /* ===================== 16.5 ===================== */
  {
    id: '16.5', chapter: CH, section: S1, page: '263',
    title: 'Поле диполя под углом 60°',
    given: [[String.raw`p = 4\cdot10^{-12}\ \text{Кл·м}`, ''], [String.raw`r = 10\ \text{см}`, String.raw`0{,}1\ \text{м}`], [String.raw`\alpha = 60^\circ`, '']],
    find: String.raw`E,\ \varphi \;—\; ?`,
    formulas: [EGEN, PHID],
    steps: [
      { title: 'Напряжённость',
        tex: String.raw`E = \frac{8{,}99\cdot10^9\cdot4\cdot10^{-12}}{0{,}1^3}\sqrt{1 + 3\cdot0{,}25} = 36{,}0\cdot1{,}32 = 47{,}6\ \text{В/м}` },
      { title: 'Потенциал',
        tex: String.raw`\varphi = \frac{8{,}99\cdot10^9\cdot4\cdot10^{-12}\cdot0{,}5}{0{,}1^2} = 1{,}8\ \text{В}` },
    ],
    answer: [String.raw`E = 47{,}6\ \text{В/м}`, String.raw`\varphi = 1{,}8\ \text{В}`],
  },

  /* ===================== 16.6 ===================== */
  {
    id: '16.6', chapter: CH, section: S1, page: '263',
    title: 'Потенциал у вращающегося диполя',
    given: [[String.raw`p = 10^{-12}\ \text{Кл·м}`, ''], [String.raw`n = 10^3\ \text{с}^{-1}`, ''], [String.raw`r = 1\ \text{см}`, String.raw`0{,}01\ \text{м}`], [String.raw`\varphi_0 = 0`, '']],
    find: String.raw`\varphi(t) \;—\; ?`,
    formulas: [PHID],
    figure: () => FIG.graph({ w: 320, h: 150, x: [0, 2.2], y: [-115, 115], xt: [0.5, 1, 1.5, 2], yt: [-90, 90], xl: 't, мс', yl: 'φ, В',
      s: [{ f: t => 90 * Math.sin(2 * Math.PI * t), t: [0, 2.1] }] }),
    figCaption: 'φ(t) = 90 sin(6,28·10³ t) В; период 1 мс',
    steps: [
      { title: 'Угол между p и r меняется',
        text: 'При φ₀ = 0 в начальный момент p ⟂ r (θ = 90°). Диполь поворачивается на ωt, так что cos θ = cos(90° − ωt) = sin ωt.',
        tex: String.raw`\varphi = \frac{p}{4\pi\varepsilon_0r^2}\sin\omega t,\quad \omega = 2\pi n = 6{,}28\cdot10^3\ \text{с}^{-1}` },
      { title: 'Амплитуда',
        tex: String.raw`A = \frac{8{,}99\cdot10^9\cdot10^{-12}}{0{,}01^2} = 90\ \text{В}` },
    ],
    answer: [String.raw`\varphi = 90\sin(6{,}28\cdot10^3\,t)\ \text{В}`],
  },

  /* ===================== 16.7 ===================== */
  {
    id: '16.7', chapter: CH, section: S1, page: '263',
    title: 'Средняя энергия заряда у вращающегося диполя',
    given: [[String.raw`p = 10^{-12}\ \text{Кл·м}`, ''], [String.raw`\omega = 10^4\ \text{рад/с}`, ''], [String.raw`Q = 1\ \text{нКл}`, String.raw`10^{-9}\ \text{Кл}`], [String.raw`r = 2\ \text{см}`, String.raw`0{,}02\ \text{м}`]],
    find: String.raw`\langle\Pi\rangle \;—\; ?`,
    formulas: [PHID, { tex: String.raw`\Pi = Q\varphi`, text: 'энергия заряда в поле' }],
    steps: [
      { title: 'Энергия как функция времени (см. 16.6)',
        tex: String.raw`\Pi = \frac{Qp}{4\pi\varepsilon_0r^2}\sin\omega t = \Pi_0\sin\omega t,\quad \Pi_0 = \frac{10^{-9}\cdot8{,}99\cdot10^9\cdot10^{-12}}{0{,}02^2} = 22{,}5\ \text{нДж}` },
      { title: '1) За полупериод',
        tex: String.raw`\langle\sin\omega t\rangle = \frac2T\int_0^{T/2}\sin\frac{2\pi t}{T}dt = \frac2\pi\ \Rightarrow\ \langle\Pi\rangle = \frac2\pi\Pi_0 = 14{,}3\ \text{нДж}` },
      { title: '2) За время t ≫ T',
        text: 'Среднее значение синуса за много периодов стремится к нулю.',
        tex: String.raw`\langle\Pi\rangle = 0` },
    ],
    answer: [String.raw`1)\ \langle\Pi\rangle = 14{,}3\ \text{нДж};\quad 2)\ \langle\Pi\rangle = 0`],
  },

  /* ===================== 16.8 ===================== */
  {
    id: '16.8', chapter: CH, section: S1, page: '263',
    title: 'Сила между двумя диполями на одной оси',
    given: [[String.raw`p_1 = 10^{-12}\ \text{Кл·м}`, ''], [String.raw`p_2 = 4\cdot10^{-12}\ \text{Кл·м}`, ''], [String.raw`r = 2\ \text{см}`, String.raw`0{,}02\ \text{м}`]],
    find: String.raw`F \;—\; ?`,
    formulas: [EAX, FD],
    steps: [
      { title: 'Неоднородность поля первого диполя',
        tex: String.raw`E = \frac{2p_1}{4\pi\varepsilon_0r^3}\ \Rightarrow\ \left|\frac{dE}{dr}\right| = \frac{6p_1}{4\pi\varepsilon_0r^4}` },
      { title: 'Сила на второй диполь',
        tex: String.raw`F = p_2\left|\frac{dE}{dr}\right| = \frac{3p_1p_2}{2\pi\varepsilon_0r^4} = \frac{6\cdot8{,}99\cdot10^9\cdot4\cdot10^{-24}}{1{,}6\cdot10^{-7}} = 1{,}35\cdot10^{-6}\ \text{Н}` },
    ],
    answer: [String.raw`F = \frac{3p_1p_2}{2\pi\varepsilon_0r^4} = 1{,}35\ \text{мкН}`],
  },

  /* ===================== 16.9 ===================== */
  {
    id: '16.9', chapter: CH, section: S1, page: '263',
    title: 'Энергия двух диполей в устойчивом равновесии',
    given: [[String.raw`p_1 = 2\cdot10^{-11}\ \text{Кл·м}`, ''], [String.raw`p_2 = 5\cdot10^{-11}\ \text{Кл·м}`, ''], [String.raw`r = 10\ \text{см}`, String.raw`0{,}1\ \text{м}`]],
    find: String.raw`\Pi \;—\; ?`,
    formulas: [EAX, WD],
    steps: [
      { title: 'Устойчивое положение',
        text: 'Второй диполь в поле первого (на оси) устойчив, когда его момент направлен по полю — оба момента в одну сторону вдоль общей оси (α = 0).',
        tex: String.raw`\Pi = -p_2E_1 = -\frac{2p_1p_2}{4\pi\varepsilon_0r^3}` },
      { title: 'Считаем',
        tex: String.raw`\Pi = -\frac{2\cdot8{,}99\cdot10^9\cdot10^{-21}}{10^{-3}} = -1{,}8\cdot10^{-8}\ \text{Дж}` },
    ],
    answer: [String.raw`\Pi = -\frac{p_1p_2}{2\pi\varepsilon_0r^3} = -18\ \text{нДж}`],
    note: MISMATCH + 'В книге +18 нДж. В устойчивом равновесии энергия минимальна и отрицательна: диполи притягиваются, и чтобы развести их, нужно затратить 18 нДж. Число совпадает, знак — минус.',
  },

  /* ===================== 16.10 ===================== */
  {
    id: '16.10', chapter: CH, section: S2, page: '264',
    title: 'Постоянная кручения нити',
    given: [[String.raw`p = 10^{-10}\ \text{Кл·м}`, ''], [String.raw`E = 3\ \text{кВ/м}`, String.raw`3\cdot10^3\ \text{В/м}`], [String.raw`\alpha = 30^\circ`, String.raw`\pi/6\ \text{рад}`]],
    find: String.raw`C \;—\; ?`,
    formulas: [MD, { tex: String.raw`M_\text{упр} = C\alpha`, text: 'момент упругих сил закрученной нити' }],
    steps: [
      { title: 'Равновесие моментов',
        text: 'Поле перпендикулярно плечу: после поворота на α угол между p и E равен 90° − α.',
        tex: String.raw`C\alpha = pE\sin(90^\circ - \alpha)` },
      { title: 'Считаем',
        tex: String.raw`C = \frac{pE\cos\alpha}{\alpha} = \frac{10^{-10}\cdot3\cdot10^3\cdot0{,}866}{0{,}524} = 4{,}96\cdot10^{-7}\ \text{Н·м/рад}` },
    ],
    answer: [String.raw`C = \frac{pE\cos\alpha}{\alpha} = 496\ \text{нН·м/рад}`],
    note: MISMATCH + String.raw`В книге $C = pE\sin\alpha/\alpha = 286$ нН·м/рад. Но поле перпендикулярно плечу, и после поворота на α к полю угол между p и E равен 90° − α, поэтому момент сил $pE\sin(90^\circ - \alpha) = pE\cos\alpha$. Формула книги верна, только если α отсчитывать от направления поля. При малом угле (задача 16.11) обе дают C = pE.`,
  },

  /* ===================== 16.11 ===================== */
  {
    id: '16.11', chapter: CH, section: S2, page: '264',
    title: 'Постоянная кручения при малом угле',
    given: [[String.raw`p = 10^{-10}\ \text{Кл·м}`, ''], [String.raw`E = 3\ \text{кВ/м}`, String.raw`3\cdot10^3\ \text{В/м}`], [String.raw`\alpha \ll 1`, '']],
    find: String.raw`C \;—\; ?`,
    formulas: [MD, { tex: String.raw`M_\text{упр} = C\alpha`, text: 'момент упругих сил закрученной нити' }],
    steps: [
      { title: 'Равновесие (как в 16.10)',
        tex: String.raw`C\alpha = pE\cos\alpha \approx pE\quad (\cos\alpha \approx 1)` },
      { title: 'Вывод',
        text: 'Поворот мал, если нить очень жёсткая: C = pE/α ≫ pE. Без значения угла C не найти — можно лишь сказать, что C много больше pE = 300 нН·м/рад.',
        tex: String.raw`C = \frac{pE}{\alpha} \gg pE = 3\cdot10^{-7}\ \text{Н·м/рад}` },
    ],
    answer: [String.raw`C = \frac{pE}{\alpha}\ \ (C \gg pE = 300\ \text{нН·м/рад})`],
    note: MISMATCH + String.raw`В книге $C = pE = 300$ нН·м/рад — это предел формулы книги $C = pE\sin\alpha/\alpha$ при $\alpha \to 0$. Но в формуле книги момент сил отсчитывается так, будто диполь сначала стоял вдоль поля (см. плашку к 16.10). Если в ответе нужно число, как у преподавателя, — пишите 300 нН·м/рад.`,
  },

  /* ===================== 16.12 ===================== */
  {
    id: '16.12', chapter: CH, section: S2, page: '264',
    title: 'Энергия диполя под углом 60° к полю',
    given: [[String.raw`p = 20\ \text{нКл·м}`, String.raw`2\cdot10^{-8}\ \text{Кл·м}`], [String.raw`E = 50\ \text{кВ/м}`, String.raw`5\cdot10^4\ \text{В/м}`], [String.raw`\alpha = 60^\circ`, '']],
    find: String.raw`\Pi \;—\; ?`,
    formulas: [WD],
    steps: [
      { title: 'Энергия',
        text: 'При p ⟂ E формула даёт ноль — как и требует указание.',
        tex: String.raw`\Pi = -pE\cos\alpha = -2\cdot10^{-8}\cdot5\cdot10^4\cdot0{,}5 = -5\cdot10^{-4}\ \text{Дж}` },
    ],
    answer: [String.raw`\Pi = -500\ \text{мкДж}`],
  },

  /* ===================== 16.13 ===================== */
  {
    id: '16.13', chapter: CH, section: S2, page: '264',
    title: 'Поворот диполя на 180°',
    given: [[String.raw`p = 10^{-10}\ \text{Кл·м}`, ''], [String.raw`E = 150\ \text{кВ/м}`, String.raw`1{,}5\cdot10^5\ \text{В/м}`]],
    find: String.raw`A \;—\; ?`,
    formulas: [WD],
    steps: [
      { title: 'Работа = изменение энергии',
        text: 'Диполь «свободно установился» — вдоль поля (α = 0). Поворачиваем до α = 180°.',
        tex: String.raw`A = \Pi_2 - \Pi_1 = -pE\cos180^\circ + pE\cos0 = 2pE = 2\cdot10^{-10}\cdot1{,}5\cdot10^5 = 3\cdot10^{-5}\ \text{Дж}` },
    ],
    answer: [String.raw`A = 2pE = 30\ \text{мкДж}`],
  },

  /* ===================== 16.14 ===================== */
  {
    id: '16.14', chapter: CH, section: S2, page: '264',
    title: 'Поворот диполя на 60°',
    given: [[String.raw`p = 10^{-10}\ \text{Кл·м}`, ''], [String.raw`E = 10\ \text{кВ/м}`, String.raw`10^4\ \text{В/м}`], [String.raw`\alpha = 60^\circ`, '']],
    find: String.raw`\Delta\Pi \;—\; ?`,
    formulas: [WD],
    steps: [
      { title: 'Изменение энергии',
        tex: String.raw`\Delta\Pi = -pE\cos\alpha + pE = pE(1 - \cos\alpha) = 10^{-10}\cdot10^4\cdot0{,}5 = 5\cdot10^{-7}\ \text{Дж}` },
    ],
    answer: [String.raw`\Delta\Pi = 0{,}5\ \text{мкДж}`],
  },

  /* ===================== 16.15 ===================== */
  {
    id: '16.15', chapter: CH, section: S2, page: '264',
    title: 'Угловая скорость диполя в положении равновесия',
    given: [[String.raw`p = 1{,}2\cdot10^{-11}\ \text{Кл·м}`, ''], [String.raw`E = 300\ \text{кВ/м}`, String.raw`3\cdot10^5\ \text{В/м}`], [String.raw`J = 2\cdot10^{-9}\ \text{кг·м}^2`, '']],
    find: String.raw`\omega \;—\; ?`,
    formulas: [WD, { tex: String.raw`T = \frac{J\omega^2}{2}`, text: 'кинетическая энергия вращения' }],
    steps: [
      { title: 'Закон сохранения энергии',
        text: 'Поворот от α = 90° (Π = 0) до α = 0 (Π = −pE): убыль энергии pE переходит в энергию вращения.',
        tex: String.raw`\frac{J\omega^2}{2} = pE\ \Rightarrow\ \omega = \sqrt{\frac{2pE}{J}}` },
      { title: 'Считаем',
        tex: String.raw`\omega = \sqrt{\frac{2\cdot1{,}2\cdot10^{-11}\cdot3\cdot10^5}{2\cdot10^{-9}}} = \sqrt{3600} = 60\ \text{рад/с}` },
    ],
    answer: [String.raw`\omega = \sqrt{\frac{2pE}{J}} = 60\ \text{рад/с}`],
    note: MISMATCH + 'В книге 6 рад/с — в 10 раз меньше. Подкоренное выражение 2·1,2·10⁻¹¹·3·10⁵/(2·10⁻⁹) = 3600, корень — 60.',
  },

  /* ===================== 16.16 ===================== */
  {
    id: '16.16', chapter: CH, section: S2, page: '264',
    title: 'Частота колебаний диполя в поле',
    given: [[String.raw`p = 10^{-10}\ \text{Кл·м}`, ''], [String.raw`E = 9\ \text{МВ/м}`, String.raw`9\cdot10^6\ \text{В/м}`], [String.raw`J = 4\cdot10^{-12}\ \text{кг·м}^2`, '']],
    find: String.raw`\nu \;—\; ?`,
    formulas: [MD, { tex: String.raw`J\ddot\alpha = -M`, text: 'основное уравнение динамики вращения' }],
    steps: [
      { title: 'Уравнение колебаний',
        text: 'При малом угле sin α ≈ α — гармонические колебания.',
        tex: String.raw`J\ddot\alpha = -pE\alpha\ \Rightarrow\ \omega_0 = \sqrt{\frac{pE}{J}}` },
      { title: 'Частота',
        tex: String.raw`\nu = \frac{1}{2\pi}\sqrt{\frac{10^{-10}\cdot9\cdot10^6}{4\cdot10^{-12}}} = \frac{1{,}5\cdot10^4}{2\pi} = 2{,}39\cdot10^3\ \text{Гц}` },
    ],
    answer: [String.raw`\nu = \frac{1}{2\pi}\sqrt{\frac{pE}{J}} = 2{,}39\ \text{кГц}`],
    note: MISMATCH + 'В книге 239 Гц — в 10 раз меньше. pE/J = 9·10⁻⁴/(4·10⁻¹²) = 2,25·10⁸ с⁻², корень — 1,5·10⁴ с⁻¹, ν = 2,39·10³ Гц.',
  },

  /* ===================== 16.17 ===================== */
  {
    id: '16.17', chapter: CH, section: S2, page: '265',
    title: 'Сила на диполь в неоднородном поле',
    given: [[String.raw`p = 2\cdot10^{-10}\ \text{Кл·м}`, ''], [String.raw`dE/dx = 1\ \text{МВ/м}^2`, String.raw`10^6\ \text{В/м}^2`]],
    find: String.raw`F \;—\; ?`,
    formulas: [FD],
    steps: [
      { title: 'Сила',
        tex: String.raw`F = p\frac{dE}{dx} = 2\cdot10^{-10}\cdot10^6 = 2\cdot10^{-4}\ \text{Н}` },
    ],
    answer: [String.raw`F = 0{,}2\ \text{мН}`],
  },

  /* ===================== 16.18 ===================== */
  {
    id: '16.18', chapter: CH, section: S2, page: '265',
    title: 'Диполь в поле точечного заряда',
    given: [[String.raw`p = 5\cdot10^{-12}\ \text{Кл·м}`, ''], [String.raw`Q = 100\ \text{нКл}`, String.raw`10^{-7}\ \text{Кл}`], [String.raw`r = 10\ \text{см}`, String.raw`0{,}1\ \text{м}`]],
    find: String.raw`|dE/dr|,\ F \;—\; ?`,
    formulas: [PHIQ, FD],
    steps: [
      { title: 'Неоднородность',
        tex: String.raw`\left|\frac{dE}{dr}\right| = \frac{2Q}{4\pi\varepsilon_0r^3} = \frac{2\cdot8{,}99\cdot10^9\cdot10^{-7}}{10^{-3}} = 1{,}8\cdot10^6\ \text{В/м}^2` },
      { title: 'Сила',
        text: 'Диполь вдоль силовой линии (по полю) втягивается в область более сильного поля — к заряду.',
        tex: String.raw`F = p\left|\frac{dE}{dr}\right| = 5\cdot10^{-12}\cdot1{,}8\cdot10^6 = 9\cdot10^{-6}\ \text{Н}` },
    ],
    answer: [String.raw`|dE/dr| = 1{,}8\ \text{МВ/м}^2`, String.raw`F = 9\ \text{мкН}`],
  },

  /* ===================== 16.19 ===================== */
  {
    id: '16.19', chapter: CH, section: S2, page: '265',
    title: 'Диполь у заряженной нити',
    given: [[String.raw`p = 4\cdot10^{-12}\ \text{Кл·м}`, ''], [String.raw`\tau = 500\ \text{нКл/м}`, String.raw`5\cdot10^{-7}\ \text{Кл/м}`], [String.raw`r = 10\ \text{см}`, String.raw`0{,}1\ \text{м}`]],
    find: String.raw`|dE/dr|,\ F \;—\; ?`,
    formulas: [{ tex: String.raw`E = \frac{\tau}{2\pi\varepsilon_0r}`, text: 'поле бесконечной нити' }, FD],
    steps: [
      { title: 'Неоднородность',
        tex: String.raw`\left|\frac{dE}{dr}\right| = \frac{\tau}{2\pi\varepsilon_0r^2} = \frac{5\cdot10^{-7}}{2\pi\cdot8{,}85\cdot10^{-12}\cdot0{,}01} = 9{,}0\cdot10^5\ \text{В/м}^2` },
      { title: 'Сила',
        tex: String.raw`F = p\left|\frac{dE}{dr}\right| = 4\cdot10^{-12}\cdot9{,}0\cdot10^5 = 3{,}6\cdot10^{-6}\ \text{Н}` },
    ],
    answer: [String.raw`|dE/dr| = 0{,}9\ \text{МВ/м}^2`, String.raw`F = 3{,}6\ \text{мкН}`],
    note: MISMATCH + 'В книге F = 3,9 мкН, хотя по её же числам p·dE/dr = 4·10⁻¹²·0,9·10⁶ = 3,6·10⁻⁶ Н.',
  },

  /* ===================== 16.20 ===================== */
  {
    id: '16.20', chapter: CH, section: S3, page: '265',
    title: 'Типы поляризации атомов и молекул',
    given: [[String.raw`\text{H, He, O}_2,\ \text{HCl, H}_2\text{O, CO, CO}_2,\ \text{CH}_3,\ \text{CCl}_4`, '']],
    find: String.raw`\text{типы поляризации} \;—\; ?`,
    formulas: [{ tex: String.raw`e,\ a,\ o`, text: 'электронная (смещение электронного облака) — у всех; атомная (смещение ядер в молекуле) — у многоатомных с разными атомами; ориентационная — только у полярных молекул (с собственным моментом)' }],
    steps: [
      { title: 'Атомы H и He',
        text: 'Один атом — только электронная поляризация (e).' },
      { title: 'O₂',
        text: 'Молекула из одинаковых атомов: связи неполярные, собственного момента нет — только e.' },
      { title: 'HCl, H₂O, CO',
        text: 'Разные атомы и несимметричное строение — молекулы полярные: e, a, o.' },
      { title: 'CO₂, CCl₄',
        text: 'Связи полярные, но молекулы симметричны (линейная O=C=O, тетраэдр CCl₄), их суммарный момент равен нулю: e, a.' },
      { title: 'CH₃',
        text: 'Радикал CH₃ несимметричен — по книге e, a, o. Если имелся в виду метан CH₄ (симметричный тетраэдр), то только e, a.' },
    ],
    answer: [String.raw`1)\ e;\ 2)\ e;\ 3)\ e;\ 4)\ e,a,o;\ 5)\ e,a,o;\ 6)\ e,a,o;\ 7)\ e,a;\ 8)\ e,a,o;\ 9)\ e,a`],
  },

  /* ===================== 16.21 ===================== */
  {
    id: '16.21', chapter: CH, section: S3, page: '265',
    title: 'Заряд диполя молекулы HF',
    given: [[String.raw`p = 6{,}4\cdot10^{-30}\ \text{Кл·м}`, ''], [String.raw`d = 92\ \text{пм}`, String.raw`9{,}2\cdot10^{-11}\ \text{м}`]],
    find: String.raw`Q \;—\; ?`,
    formulas: [PMOM],
    steps: [
      { title: 'Заряд',
        tex: String.raw`Q = \frac pd = \frac{6{,}4\cdot10^{-30}}{9{,}2\cdot10^{-11}} = 6{,}96\cdot10^{-20}\ \text{Кл} \approx 0{,}43|e|` },
      { title: 'Почему меньше e',
        text: 'Электрон атома водорода не переходит к фтору целиком: электронное облако лишь частично смещается к ядру фтора, поэтому эффективный заряд — доля элементарного.' },
    ],
    answer: [String.raw`Q = 0{,}696\cdot10^{-19}\ \text{Кл}`],
  },

  /* ===================== 16.22 ===================== */
  {
    id: '16.22', chapter: CH, section: S3, page: '265',
    title: 'Стекло в конденсаторе',
    given: [[String.raw`d = 2\ \text{мм}`, String.raw`2\cdot10^{-3}\ \text{м}`], [String.raw`U = 1{,}8\ \text{кВ}`, String.raw`1{,}8\cdot10^3\ \text{В}`], [String.raw`\varepsilon = 7\ (\text{стекло})`, '']],
    find: String.raw`\varkappa,\ \sigma' \;—\; ?`,
    formulas: [PK, { tex: String.raw`\sigma' = P`, text: 'плотность связанных зарядов на гранях равна поляризованности' }],
    steps: [
      { title: 'Восприимчивость',
        tex: String.raw`\varkappa = \varepsilon - 1 = 6` },
      { title: 'Поле в стекле',
        text: 'Напряжение задано — значит, поле в диэлектрике E = U/d.',
        tex: String.raw`E = \frac Ud = \frac{1800}{0{,}002} = 9\cdot10^5\ \text{В/м}` },
      { title: 'Связанные заряды',
        tex: String.raw`\sigma' = \varkappa\varepsilon_0E = 6\cdot8{,}85\cdot10^{-12}\cdot9\cdot10^5 = 4{,}78\cdot10^{-5}\ \text{Кл/м}^2` },
    ],
    answer: [String.raw`\varkappa = 6`, String.raw`\sigma' = 47{,}8\ \text{мкКл/м}^2`],
    note: SMALL + 'В книге 47,7 мкКл/м²; точно 47,79.',
  },

  /* ===================== 16.23 ===================== */
  {
    id: '16.23', chapter: CH, section: S3, page: '265',
    title: 'Шар в слое фарфора: связанные заряды',
    given: [[String.raw`R = 5\ \text{см}`, String.raw`0{,}05\ \text{м}`], [String.raw`d = 2\ \text{см}`, String.raw`0{,}02\ \text{м}`], [String.raw`Q = 10\ \text{нКл}`, String.raw`10^{-8}\ \text{Кл}`], [String.raw`\varepsilon = 5\ (\text{фарфор})`, '']],
    find: String.raw`\sigma'_1,\ \sigma'_2 \;—\; ?`,
    formulas: [{ tex: String.raw`D = \frac{Q}{4\pi r^2},\quad P = \frac{\varepsilon - 1}{\varepsilon}D`, text: 'смещение по теореме Гаусса и поляризованность в диэлектрике' }],
    steps: [
      { title: 'Поляризованность у поверхностей',
        text: 'Связанный заряд на поверхности равен нормальной составляющей P; у шара — знак минус (противоположен Q), снаружи — плюс.',
        tex: String.raw`\sigma' = \pm\frac{Q}{4\pi r^2}\cdot\frac{\varepsilon - 1}{\varepsilon}` },
      { title: 'Внутренняя поверхность (r = R)',
        tex: String.raw`\sigma'_1 = -\frac{10^{-8}}{4\pi\cdot0{,}05^2}\cdot0{,}8 = -2{,}55\cdot10^{-7}\ \text{Кл/м}^2` },
      { title: 'Внешняя поверхность (r = R + d)',
        tex: String.raw`\sigma'_2 = \frac{10^{-8}}{4\pi\cdot0{,}07^2}\cdot0{,}8 = 1{,}30\cdot10^{-7}\ \text{Кл/м}^2` },
    ],
    answer: [String.raw`\sigma'_1 = -0{,}255\ \text{мкКл/м}^2`, String.raw`\sigma'_2 = 0{,}130\ \text{мкКл/м}^2`],
  },

  /* ===================== 16.24 ===================== */
  {
    id: '16.24', chapter: CH, section: S3, page: '265',
    title: 'Эбонитовая пластина в поле',
    given: [[String.raw`E_0 = 2\ \text{МВ/м}`, String.raw`2\cdot10^6\ \text{В/м}`], [String.raw`\varepsilon = 3\ (\text{эбонит})`, '']],
    find: String.raw`\sigma' \;—\; ?`,
    formulas: [EE0, PK],
    steps: [
      { title: 'Поле внутри и поляризованность',
        tex: String.raw`\sigma' = P = (\varepsilon - 1)\varepsilon_0\frac{E_0}{\varepsilon} = \frac23\cdot8{,}85\cdot10^{-12}\cdot2\cdot10^6 = 1{,}18\cdot10^{-5}\ \text{Кл/м}^2` },
    ],
    answer: [String.raw`\sigma' = \pm11{,}8\ \text{мкКл/м}^2`],
  },

  /* ===================== 16.25 ===================== */
  {
    id: '16.25', chapter: CH, section: S4, page: '266',
    title: 'Диэлектрик из жёстких диполей',
    given: [[String.raw`\mu_\text{м} = 2\cdot10^{-30}\ \text{Кл·м}`, ''], [String.raw`n = 10^{26}\ \text{м}^{-3}`, ''], [String.raw`E_0 = 100\ \text{МВ/м}`, String.raw`10^8\ \text{В/м}`]],
    find: String.raw`E \;—\; ?`,
    formulas: [EE0, { tex: String.raw`P = n\mu_\text{м}`, text: 'все диполи развёрнуты по полю (тепловое движение не мешает)' }],
    steps: [
      { title: 'Поляризованность',
        tex: String.raw`P = 10^{26}\cdot2\cdot10^{-30} = 2\cdot10^{-4}\ \text{Кл/м}^2` },
      { title: 'Поле',
        tex: String.raw`E = E_0 - \frac{P}{\varepsilon_0} = 10^8 - \frac{2\cdot10^{-4}}{8{,}85\cdot10^{-12}} = 10^8 - 2{,}26\cdot10^7 = 7{,}74\cdot10^7\ \text{В/м}` },
    ],
    answer: [String.raw`E = 77{,}4\ \text{МВ/м}`],
  },

  /* ===================== 16.26 ===================== */
  {
    id: '16.26', chapter: CH, section: S4, page: '266',
    title: 'Локальное поле в пластине (ε = 3)',
    given: [[String.raw`E_0 = 1\ \text{МВ/м}`, String.raw`10^6\ \text{В/м}`], [String.raw`\varepsilon = 3`, '']],
    find: String.raw`E_\text{лок} \;—\; ?`,
    formulas: [ELOC],
    steps: [
      { title: 'Поле Лоренца',
        tex: String.raw`E_\text{лок} = \frac{\varepsilon + 2}{3\varepsilon}E_0 = \frac59\cdot10^6 = 5{,}56\cdot10^5\ \text{В/м}` },
    ],
    answer: [String.raw`E_\text{лок} = 556\ \text{кВ/м}`],
    note: SMALL + 'В книге 555 кВ/м; точно 555,6.',
  },

  /* ===================== 16.27 ===================== */
  {
    id: '16.27', chapter: CH, section: S4, page: '266',
    title: 'Локальное поле в кубическом кристалле',
    given: [[String.raw`\varepsilon = 2{,}5`, '']],
    find: String.raw`E_\text{лок}/E \;—\; ?`,
    formulas: [ELOC],
    steps: [
      { title: 'Отношение',
        tex: String.raw`\frac{E_\text{лок}}{E} = \frac{\varepsilon + 2}{3} = \frac{4{,}5}{3} = 1{,}5` },
    ],
    answer: [String.raw`\text{в 1,5 раза}`],
  },

  /* ===================== 16.28 ===================== */
  {
    id: '16.28', chapter: CH, section: S4, page: '266',
    title: 'Когда E_лок можно заменить на E₀',
    given: [[String.raw`\delta \le 1\%`, '']],
    find: String.raw`\varepsilon_{\max} \;—\; ?`,
    formulas: [ELOC],
    steps: [
      { title: 'Погрешность',
        text: 'E₀ больше E_лок; относительная ошибка — по отношению к E₀:',
        tex: String.raw`\delta = 1 - \frac{E_\text{лок}}{E_0} = 1 - \frac{\varepsilon + 2}{3\varepsilon} = \frac{2(\varepsilon - 1)}{3\varepsilon} \le 0{,}01` },
      { title: 'Решаем',
        tex: String.raw`2\varepsilon - 2 \le 0{,}03\varepsilon\ \Rightarrow\ \varepsilon \le \frac{2}{1{,}97} = 1{,}015` },
    ],
    answer: [String.raw`\varepsilon_{\max} = 1{,}015`],
  },

  /* ===================== 16.29 ===================== */
  {
    id: '16.29', chapter: CH, section: S4, page: '266',
    title: 'Погрешность замены E_лок на E',
    given: [[String.raw`\varepsilon_1 = 1{,}003;\ \varepsilon_2 = 2`, '']],
    find: String.raw`\delta \;—\; ?`,
    formulas: [ELOC],
    steps: [
      { title: 'Погрешность',
        tex: String.raw`\delta = \frac{E_\text{лок} - E}{E_\text{лок}} = 1 - \frac{3}{\varepsilon + 2} = \frac{\varepsilon - 1}{\varepsilon + 2}` },
      { title: 'Два случая',
        tex: String.raw`\delta_1 = \frac{0{,}003}{3{,}003} = 0{,}1\%,\quad \delta_2 = \frac14 = 25\%` },
    ],
    answer: [String.raw`1)\ 0{,}1\%;\quad 2)\ 25\%`],
  },

  /* ===================== 16.30 ===================== */
  {
    id: '16.30', chapter: CH, section: S5, page: '266',
    title: 'Поляризованность по локальному полю',
    given: [[String.raw`\varepsilon = 5`, ''], [String.raw`E_\text{лок} = 10\ \text{МВ/м}`, String.raw`10^7\ \text{В/м}`]],
    find: String.raw`P \;—\; ?`,
    formulas: [PK, ELOC],
    steps: [
      { title: 'Через среднее поле',
        tex: String.raw`E = \frac{3E_\text{лок}}{\varepsilon + 2},\quad P = (\varepsilon - 1)\varepsilon_0E = \frac{3(\varepsilon - 1)}{\varepsilon + 2}\varepsilon_0E_\text{лок}` },
      { title: 'Считаем',
        tex: String.raw`P = \frac{12}{7}\cdot8{,}85\cdot10^{-12}\cdot10^7 = 1{,}52\cdot10^{-4}\ \text{Кл/м}^2` },
    ],
    answer: [String.raw`P = 152\ \text{мкКл/м}^2`],
  },

  /* ===================== 16.31 ===================== */
  {
    id: '16.31', chapter: CH, section: S5, page: '266',
    title: 'Поле для поляризованности 200 мкКл/м²',
    given: [[String.raw`\varepsilon = 3`, ''], [String.raw`P = 200\ \text{мкКл/м}^2`, String.raw`2\cdot10^{-4}\ \text{Кл/м}^2`]],
    find: String.raw`E \;—\; ?`,
    formulas: [PK],
    steps: [
      { title: 'Выражаем',
        tex: String.raw`E = \frac{P}{(\varepsilon - 1)\varepsilon_0} = \frac{2\cdot10^{-4}}{2\cdot8{,}85\cdot10^{-12}} = 1{,}13\cdot10^7\ \text{В/м}` },
    ],
    answer: [String.raw`E = 11{,}3\ \text{МВ/м}`],
  },

  /* ===================== 16.32 ===================== */
  {
    id: '16.32', chapter: CH, section: S5, page: '266',
    title: 'Поляризованность стекла',
    given: [[String.raw`E_0 = 5\ \text{МВ/м}`, String.raw`5\cdot10^6\ \text{В/м}`], [String.raw`\varepsilon = 7\ (\text{стекло})`, '']],
    find: String.raw`P \;—\; ?`,
    formulas: [PK, EE0],
    steps: [
      { title: 'Поляризованность',
        tex: String.raw`P = (\varepsilon - 1)\varepsilon_0\frac{E_0}{\varepsilon} = \frac67\cdot8{,}85\cdot10^{-12}\cdot5\cdot10^6 = 3{,}79\cdot10^{-5}\ \text{Кл/м}^2` },
    ],
    answer: [String.raw`P = 37{,}9\ \text{мкКл/м}^2`],
  },

  /* ===================== 16.33 ===================== */
  {
    id: '16.33', chapter: CH, section: S5, page: '266',
    title: 'Поляризованность по ослаблению поля',
    given: [[String.raw`E_0 = 20\ \text{кВ/м}`, String.raw`2\cdot10^4\ \text{В/м}`], [String.raw`E = 4\ \text{кВ/м}`, String.raw`4\cdot10^3\ \text{В/м}`]],
    find: String.raw`P \;—\; ?`,
    formulas: [EE0],
    steps: [
      { title: 'Из E = E₀ − P/ε₀',
        tex: String.raw`P = \varepsilon_0(E_0 - E) = 8{,}85\cdot10^{-12}\cdot1{,}6\cdot10^4 = 1{,}42\cdot10^{-7}\ \text{Кл/м}^2` },
    ],
    answer: [String.raw`P = 142\ \text{нКл/м}^2`],
    note: TYPO + 'В книге «142 кКл/м²» — перепутана приставка: 1,42·10⁻⁷ Кл/м² = 142 нКл/м².',
  },

  /* ===================== 16.34 ===================== */
  {
    id: '16.34', chapter: CH, section: S5, page: '266',
    title: 'Жидкий азот в поле 40 МВ/м',
    given: [[String.raw`E_0 = 40\ \text{МВ/м}`, String.raw`4\cdot10^7\ \text{В/м}`], [String.raw`P = 109\ \text{мкКл/м}^2`, String.raw`1{,}09\cdot10^{-4}\ \text{Кл/м}^2`], [String.raw`\rho = 804\ \text{кг/м}^3`, ''], [String.raw`M = 0{,}028\ \text{кг/моль}`, '']],
    find: String.raw`\varepsilon,\ p \;—\; ?`,
    formulas: [PK, EE0, { tex: String.raw`P = np,\quad n = \frac{\rho N_\text{A}}{M}`, text: 'поляризованность — суммарный момент единицы объёма' }],
    steps: [
      { title: '1) Проницаемость',
        tex: String.raw`P = \frac{\varepsilon - 1}{\varepsilon}\varepsilon_0E_0\ \Rightarrow\ \frac{\varepsilon - 1}{\varepsilon} = \frac{1{,}09\cdot10^{-4}}{8{,}85\cdot10^{-12}\cdot4\cdot10^7} = 0{,}308\ \Rightarrow\ \varepsilon = 1{,}44` },
      { title: '2) Концентрация молекул',
        tex: String.raw`n = \frac{804\cdot6{,}02\cdot10^{23}}{0{,}028} = 1{,}73\cdot10^{28}\ \text{м}^{-3}` },
      { title: 'Момент одной молекулы',
        tex: String.raw`p = \frac Pn = \frac{1{,}09\cdot10^{-4}}{1{,}73\cdot10^{28}} = 6{,}3\cdot10^{-33}\ \text{Кл·м}` },
    ],
    answer: [String.raw`1)\ \varepsilon = 1{,}44`, String.raw`2)\ p = 6{,}3\cdot10^{-33}\ \text{Кл·м}`],
    note: TYPO + 'В книге «6,3·10⁻⁴ Кл·м» — ошибка в показателе степени, должно быть 6,3·10⁻³³ Кл·м.',
  },

  /* ===================== 16.35 ===================== */
  {
    id: '16.35', chapter: CH, section: S6, page: '267',
    title: 'Когда можно считать ϰ ≈ αn',
    given: [[String.raw`\frac{\varkappa}{\varkappa + 3} = \frac{\alpha n}{3}`, ''], [String.raw`\delta \le 1\%`, '']],
    find: String.raw`\varkappa_{\max} \;—\; ?`,
    formulas: [CM],
    steps: [
      { title: 'Точное и приближённое α',
        tex: String.raw`\alpha = \frac{3\varkappa}{(\varkappa + 3)n},\qquad \alpha' = \frac{\varkappa}{n}` },
      { title: 'Погрешность',
        tex: String.raw`\delta = \frac{\alpha' - \alpha}{\alpha} = \frac{\varkappa + 3}{3} - 1 = \frac\varkappa3 \le 0{,}01\ \Rightarrow\ \varkappa \le 0{,}03` },
    ],
    answer: [String.raw`\varkappa_{\max} = 0{,}03`],
  },

  /* ===================== 16.36 ===================== */
  {
    id: '16.36', chapter: CH, section: S6, page: '267',
    title: 'Когда Клаузиуса–Мосотти можно упростить',
    given: [[String.raw`\delta \le 1\%`, '']],
    find: String.raw`(\alpha n)_{\max} \;—\; ?`,
    formulas: [CM],
    steps: [
      { title: 'Точное ε',
        text: 'Обозначим x = αn.',
        tex: String.raw`\frac{\varepsilon - 1}{\varepsilon + 2} = \frac x3\ \Rightarrow\ \varepsilon = \frac{3 + 2x}{3 - x}` },
      { title: 'Разность с приближённым 1 + x',
        tex: String.raw`\varepsilon - (1 + x) = \frac{x^2}{3 - x},\quad \delta = \frac{x^2}{3 + 2x} \le 0{,}01` },
      { title: 'Решаем',
        tex: String.raw`x^2 - 0{,}02x - 0{,}03 = 0\ \Rightarrow\ x = 0{,}183` },
    ],
    answer: [String.raw`\alpha n \le 0{,}183`],
  },

  /* ===================== 16.37 ===================== */
  {
    id: '16.37', chapter: CH, section: S6, page: '267',
    title: 'Поляризуемость молекулы азота',
    given: [[String.raw`\varepsilon = 1{,}445`, ''], [String.raw`\rho = 804\ \text{кг/м}^3`, ''], [String.raw`M = 0{,}028\ \text{кг/моль}`, '']],
    find: String.raw`\alpha \;—\; ?`,
    formulas: [CM],
    steps: [
      { title: 'Из Клаузиуса–Мосотти',
        tex: String.raw`\alpha = \frac{3M(\varepsilon - 1)}{\rho N_\text{A}(\varepsilon + 2)} = \frac{3\cdot0{,}028\cdot0{,}445}{804\cdot6{,}02\cdot10^{23}\cdot3{,}445} = 2{,}24\cdot10^{-29}\ \text{м}^3` },
    ],
    answer: [String.raw`\alpha = 2{,}24\cdot10^{-29}\ \text{м}^3`],
  },

  /* ===================== 16.38 ===================== */
  {
    id: '16.38', chapter: CH, section: S6, page: '267',
    title: 'Восприимчивость газообразного и жидкого водорода',
    given: [[String.raw`\alpha = 1{,}0\cdot10^{-29}\ \text{м}^3`, ''], [String.raw`\rho_\text{ж} = 70{,}8\ \text{кг/м}^3`, ''], [String.raw`M = 0{,}002\ \text{кг/моль}`, '']],
    find: String.raw`\varkappa_1,\ \varkappa_2 \;—\; ?`,
    formulas: [CM, LOSCH],
    steps: [
      { title: '1) Газ',
        text: 'αn ≪ 1, поэтому ϰ ≈ αn.',
        tex: String.raw`\varkappa_1 = \alpha n_L = 10^{-29}\cdot2{,}69\cdot10^{25} = 2{,}7\cdot10^{-4}` },
      { title: '2) Жидкость',
        tex: String.raw`x = \alpha\frac{\rho N_\text{A}}{M} = 10^{-29}\cdot\frac{70{,}8\cdot6{,}02\cdot10^{23}}{0{,}002} = 0{,}213` },
      { title: 'Точная формула',
        tex: String.raw`\frac{\varkappa}{\varkappa + 3} = \frac x3\ \Rightarrow\ \varkappa_2 = \frac{3x}{3 - x} = \frac{0{,}639}{2{,}787} = 0{,}23` },
    ],
    answer: [String.raw`1)\ \varkappa_1 = 2{,}7\cdot10^{-4};\quad 2)\ \varkappa_2 = 0{,}23`],
  },

  /* ===================== 16.39 ===================== */
  {
    id: '16.39', chapter: CH, section: S6, page: '267',
    title: 'Проницаемость жидкого и твёрдого аргона',
    given: [[String.raw`\varkappa = 5{,}54\cdot10^{-4}\ (\text{газ})`, ''], [String.raw`\rho_1 = 1{,}40\ \text{г/см}^3`, String.raw`1400\ \text{кг/м}^3`], [String.raw`\rho_2 = 1{,}65\ \text{г/см}^3`, String.raw`1650\ \text{кг/м}^3`], [String.raw`M = 0{,}040\ \text{кг/моль}`, '']],
    find: String.raw`\varepsilon_1,\ \varepsilon_2 \;—\; ?`,
    formulas: [CM, LOSCH],
    steps: [
      { title: 'Поляризуемость атома аргона (из газа)',
        tex: String.raw`\alpha = \frac{3\varkappa}{(\varkappa + 3)n_L} = \frac{3\cdot5{,}54\cdot10^{-4}}{3{,}000554\cdot2{,}69\cdot10^{25}} = 2{,}06\cdot10^{-29}\ \text{м}^3` },
      { title: 'Жидкий аргон',
        tex: String.raw`x_1 = \alpha\frac{\rho_1N_\text{A}}{M} = 0{,}434,\quad \varepsilon_1 = \frac{3 + 2x_1}{3 - x_1} = 1{,}51` },
      { title: 'Твёрдый аргон',
        tex: String.raw`x_2 = 0{,}512,\quad \varepsilon_2 = \frac{3 + 2x_2}{3 - x_2} = 1{,}62` },
    ],
    answer: [String.raw`\varepsilon_1 = 1{,}51;\quad \varepsilon_2 = 1{,}62`],
    note: SMALL + 'В книге ε₂ = 1,61; точно 1,617.',
  },

  /* ===================== 16.40 ===================== */
  {
    id: '16.40', chapter: CH, section: S6, page: '267',
    title: 'Поляризуемость упругой системы зарядов',
    given: [[String.raw`|Q| = 0{,}1\ \text{нКл}`, String.raw`10^{-10}\ \text{Кл}`], [String.raw`k = 1\ \text{мН/м}`, String.raw`10^{-3}\ \text{Н/м}`]],
    find: String.raw`\alpha \;—\; ?`,
    formulas: [PIND, { tex: String.raw`kx = |Q|E`, text: 'квазиупругая сила уравновешивает силу поля' }],
    steps: [
      { title: 'Смещение и момент',
        tex: String.raw`x = \frac{QE}{k},\quad p = Qx = \frac{Q^2E}{k}` },
      { title: 'Поляризуемость',
        tex: String.raw`\alpha\varepsilon_0E = \frac{Q^2E}{k}\ \Rightarrow\ \alpha = \frac{Q^2}{k\varepsilon_0} = \frac{10^{-20}}{10^{-3}\cdot8{,}85\cdot10^{-12}} = 1{,}13\cdot10^{-6}\ \text{м}^3` },
    ],
    answer: [String.raw`\alpha = 1{,}13\ \text{см}^3`],
  },

  /* ===================== 16.41 ===================== */
  {
    id: '16.41', chapter: CH, section: S6, page: '267',
    title: 'Поляризуемость атома водорода',
    given: [[String.raw`r = 53\ \text{пм}`, String.raw`5{,}3\cdot10^{-11}\ \text{м}`]],
    find: String.raw`\alpha,\ \varepsilon \;—\; ?`,
    formulas: [PIND, LOSCH],
    steps: [
      { title: 'Модель',
        text: 'Поле E смещает орбиту электрона относительно ядра на x. Возвращающая сила — притяжение ядра: её составляющая вдоль поля ≈ e²x/(4πε₀r³). Равновесие: eE = e²x/(4πε₀r³).',
        tex: String.raw`p = ex = 4\pi\varepsilon_0r^3E\ \Rightarrow\ \alpha = 4\pi r^3` },
      { title: 'Считаем',
        tex: String.raw`\alpha = 4\pi\cdot(5{,}3\cdot10^{-11})^3 = 1{,}87\cdot10^{-30}\ \text{м}^3` },
      { title: 'Проницаемость газа',
        tex: String.raw`\varepsilon = 1 + \alpha n_L = 1 + 1{,}87\cdot10^{-30}\cdot2{,}69\cdot10^{25} = 1{,}00005` },
    ],
    answer: [String.raw`\alpha = 1{,}87\cdot10^{-30}\ \text{м}^3`, String.raw`\varepsilon = 1{,}00005`],
  },

  /* ===================== 16.42 ===================== */
  {
    id: '16.42', chapter: CH, section: S6, page: '267',
    title: 'Индуцированный диполь атома водорода',
    given: [[String.raw`E = 100\ \text{кВ/м}`, String.raw`10^5\ \text{В/м}`], [String.raw`r = 53\ \text{пм}`, '']],
    find: String.raw`p,\ l \;—\; ?`,
    formulas: [PIND],
    steps: [
      { title: 'Момент (α = 4πr³, см. 16.41)',
        tex: String.raw`p = \alpha\varepsilon_0E = 1{,}87\cdot10^{-30}\cdot8{,}85\cdot10^{-12}\cdot10^5 = 1{,}66\cdot10^{-36}\ \text{Кл·м}` },
      { title: 'Плечо',
        tex: String.raw`l = \frac pe = \frac{1{,}66\cdot10^{-36}}{1{,}6\cdot10^{-19}} = 1{,}03\cdot10^{-17}\ \text{м}` },
    ],
    answer: [String.raw`p = 1{,}66\cdot10^{-36}\ \text{Кл·м}`, String.raw`l = 1{,}03\cdot10^{-17}\ \text{м}`],
    note: SMALL + 'В книге p = 1,65·10⁻³⁶ Кл·м.',
  },

  /* ===================== 16.43 ===================== */
  {
    id: '16.43', chapter: CH, section: S6, page: '267',
    title: 'Поляризуемость атома аргона',
    given: [[String.raw`\varepsilon = 1{,}00055`, '']],
    find: String.raw`\alpha \;—\; ?`,
    formulas: [CM, LOSCH],
    steps: [
      { title: 'Газ: ε − 1 = αn',
        tex: String.raw`\alpha = \frac{\varepsilon - 1}{n_L} = \frac{5{,}5\cdot10^{-4}}{2{,}69\cdot10^{25}} = 2{,}0\cdot10^{-29}\ \text{м}^3` },
    ],
    answer: [String.raw`\alpha = 2{,}0\cdot10^{-29}\ \text{м}^3`],
  },

  /* ===================== 16.44 ===================== */
  {
    id: '16.44', chapter: CH, section: S6, page: '267',
    title: 'Атом ксенона рядом с протоном',
    given: [[String.raw`\alpha = 5{,}2\cdot10^{-29}\ \text{м}^3`, ''], [String.raw`r = 1\ \text{нм}`, String.raw`10^{-9}\ \text{м}`]],
    find: String.raw`p \;—\; ?`,
    formulas: [PIND, PHIQ],
    steps: [
      { title: 'Поле протона',
        tex: String.raw`E = \frac{e}{4\pi\varepsilon_0r^2} = \frac{8{,}99\cdot10^9\cdot1{,}6\cdot10^{-19}}{10^{-18}} = 1{,}44\cdot10^9\ \text{В/м}` },
      { title: 'Индуцированный момент',
        tex: String.raw`p = \alpha\varepsilon_0E = 5{,}2\cdot10^{-29}\cdot8{,}85\cdot10^{-12}\cdot1{,}44\cdot10^9 = 6{,}6\cdot10^{-31}\ \text{Кл·м}` },
    ],
    answer: [String.raw`p = 6{,}6\cdot10^{-31}\ \text{Кл·м}`],
  },

  /* ===================== 16.45 ===================== */
  {
    id: '16.45', chapter: CH, section: S6, page: '267',
    title: 'Атом неона рядом с молекулой воды',
    given: [[String.raw`r = 1\ \text{нм}`, String.raw`10^{-9}\ \text{м}`], [String.raw`p_\text{в} = 6{,}2\cdot10^{-30}\ \text{Кл·м}`, ''], [String.raw`\alpha = 4{,}7\cdot10^{-30}\ \text{м}^3`, '']],
    find: String.raw`p_{\max} \;—\; ?`,
    formulas: [EAX, PIND],
    steps: [
      { title: 'Наибольшее поле диполя — на его оси',
        tex: String.raw`E = \frac{2p_\text{в}}{4\pi\varepsilon_0r^3} = \frac{2\cdot8{,}99\cdot10^9\cdot6{,}2\cdot10^{-30}}{10^{-27}} = 1{,}11\cdot10^8\ \text{В/м}` },
      { title: 'Индуцированный момент',
        tex: String.raw`p_{\max} = \alpha\varepsilon_0E = 4{,}7\cdot10^{-30}\cdot8{,}85\cdot10^{-12}\cdot1{,}11\cdot10^8 = 4{,}6\cdot10^{-33}\ \text{Кл·м}` },
    ],
    answer: [String.raw`p_{\max} = 4{,}6\cdot10^{-33}\ \text{Кл·м}`],
  },

  /* ===================== 16.46 ===================== */
  {
    id: '16.46', chapter: CH, section: S6, page: '268',
    title: 'Плотность энергии поляризованного криптона',
    given: [[String.raw`E = 2\ \text{МВ/м}`, String.raw`2\cdot10^6\ \text{В/м}`], [String.raw`\alpha = 4{,}5\cdot10^{-29}\ \text{м}^3`, '']],
    find: String.raw`w \;—\; ?`,
    formulas: [LOSCH, PIND, { tex: String.raw`w = \frac12PE`, text: 'энергия, запасённая в поляризованном веществе (работа поля по созданию упругих диполей)' }],
    steps: [
      { title: 'Поляризованность',
        tex: String.raw`P = n_L\alpha\varepsilon_0E = 2{,}69\cdot10^{25}\cdot4{,}5\cdot10^{-29}\cdot8{,}85\cdot10^{-12}\cdot2\cdot10^6 = 2{,}14\cdot10^{-8}\ \text{Кл/м}^2` },
      { title: 'Энергия',
        text: 'Каждый атом — упругий диполь: его энергия pE/2. В единице объёма — n_L таких атомов.',
        tex: String.raw`w = \frac12PE = \frac12\cdot2{,}14\cdot10^{-8}\cdot2\cdot10^6 = 2{,}14\cdot10^{-2}\ \text{Дж/м}^3` },
    ],
    answer: [String.raw`w = \frac12n\alpha\varepsilon_0E^2 = 21{,}4\ \text{мДж/м}^3`],
    note: MISMATCH + 'В книге 11,7 мДж/м³. По формуле w = ½nαε₀E² с данными задачи выходит 21,4 мДж/м³; как получено 11,7, восстановить не удалось.',
  },

  /* ===================== 16.47 ===================== */
  {
    id: '16.47', chapter: CH, section: S6, page: '268',
    title: 'Поляризуемость углерода в алмазе',
    given: [[String.raw`\varepsilon = 5{,}6`, ''], [String.raw`\rho = 3{,}5\cdot10^3\ \text{кг/м}^3`, ''], [String.raw`M = 0{,}012\ \text{кг/моль}`, '']],
    find: String.raw`\alpha \;—\; ?`,
    formulas: [CM],
    steps: [
      { title: 'Клаузиус–Мосотти',
        tex: String.raw`\alpha = \frac{3M(\varepsilon - 1)}{\rho N_\text{A}(\varepsilon + 2)} = \frac{3\cdot0{,}012\cdot4{,}6}{3{,}5\cdot10^3\cdot6{,}02\cdot10^{23}\cdot7{,}6} = 1{,}03\cdot10^{-29}\ \text{м}^3` },
    ],
    answer: [String.raw`\alpha = 1{,}03\cdot10^{-29}\ \text{м}^3`],
    note: SMALL + 'В книге 1,04·10⁻²⁹ м³; точно 1,034.',
  },

  /* ===================== 16.48 ===================== */
  {
    id: '16.48', chapter: CH, section: S6, page: '268',
    title: 'Электронная поляризуемость кислорода',
    given: [[String.raw`n = 1{,}000272`, '']],
    find: String.raw`\alpha_e \;—\; ?`,
    formulas: [LL, LOSCH],
    steps: [
      { title: 'Лоренц–Лоренц',
        tex: String.raw`\alpha_e = \frac{3}{n_L}\cdot\frac{n^2 - 1}{n^2 + 2} = \frac{3}{2{,}69\cdot10^{25}}\cdot\frac{5{,}44\cdot10^{-4}}{3{,}0005} = 2{,}02\cdot10^{-29}\ \text{м}^3` },
    ],
    answer: [String.raw`\alpha_e = 2{,}02\cdot10^{-29}\ \text{м}^3`],
  },

  /* ===================== 16.49 ===================== */
  {
    id: '16.49', chapter: CH, section: S6, page: '268',
    title: 'Проницаемость жидкого хлора',
    given: [[String.raw`n = 1{,}000768\ (\text{газ, н. у.})`, ''], [String.raw`\rho = 1{,}56\cdot10^3\ \text{кг/м}^3`, ''], [String.raw`M = 0{,}071\ \text{кг/моль}`, '']],
    find: String.raw`\varepsilon \;—\; ?`,
    formulas: [LL, CM, LOSCH],
    steps: [
      { title: 'Поляризуемость молекулы (из газа)',
        text: 'Молекула Cl₂ неполярна — её поляризуемость электронная, и её можно найти по показателю преломления.',
        tex: String.raw`\alpha = \frac{3}{n_L}\cdot\frac{n^2 - 1}{n^2 + 2} = 5{,}71\cdot10^{-29}\ \text{м}^3` },
      { title: 'Жидкость',
        tex: String.raw`x = \alpha\frac{\rho N_\text{A}}{M} = 0{,}756,\quad \varepsilon = \frac{3 + 2x}{3 - x} = 2{,}01` },
    ],
    answer: [String.raw`\varepsilon = 2{,}01`],
    note: SMALL + 'В книге 2,02; точно 2,011.',
  },

  /* ===================== 16.50 ===================== */
  {
    id: '16.50', chapter: CH, section: S6, page: '268',
    title: 'Проницаемость жидкого CO₂',
    given: [[String.raw`n = 1{,}000450\ (\text{газ, н. у.})`, ''], [String.raw`\rho = 1{,}19\cdot10^3\ \text{кг/м}^3`, ''], [String.raw`M = 0{,}044\ \text{кг/моль}`, '']],
    find: String.raw`\varepsilon \;—\; ?`,
    formulas: [LL, CM, LOSCH],
    steps: [
      { title: 'Поляризуемость молекулы',
        tex: String.raw`\alpha = \frac{3}{n_L}\cdot\frac{n^2 - 1}{n^2 + 2} = 3{,}35\cdot10^{-29}\ \text{м}^3` },
      { title: 'Жидкость',
        tex: String.raw`x = \alpha\frac{\rho N_\text{A}}{M} = 3{,}35\cdot10^{-29}\cdot1{,}63\cdot10^{28} = 0{,}545,\quad \varepsilon = \frac{3 + 2x}{3 - x} = 1{,}67` },
    ],
    answer: [String.raw`\varepsilon = 1{,}67`],
    note: MISMATCH + 'В книге 2,14. Тем же способом, что в 16.49 (где ответ книги совпал), для CO₂ выходит 1,67 — близко к справочному значению для жидкого CO₂ (около 1,6). Как получено 2,14, восстановить не удалось.',
  },

  /* ===================== 16.51 ===================== */
  {
    id: '16.51', chapter: CH, section: S6, page: '268',
    title: 'Электронная поляризуемость сероуглерода',
    given: [[String.raw`n = 1{,}62`, ''], [String.raw`\rho = 1{,}26\cdot10^3\ \text{кг/м}^3\ (\text{табл. 9})`, ''], [String.raw`M = 0{,}076\ \text{кг/моль}`, '']],
    find: String.raw`\alpha_e \;—\; ?`,
    formulas: [LL],
    steps: [
      { title: 'Лоренц–Лоренц для жидкости',
        tex: String.raw`\alpha_e = \frac{3M(n^2 - 1)}{\rho N_\text{A}(n^2 + 2)} = \frac{3\cdot0{,}076\cdot1{,}624}{1{,}26\cdot10^3\cdot6{,}02\cdot10^{23}\cdot4{,}624} = 1{,}06\cdot10^{-28}\ \text{м}^3` },
    ],
    answer: [String.raw`\alpha_e = 1{,}06\cdot10^{-28}\ \text{м}^3`],
    note: SMALL + 'В книге 1,05·10⁻²⁸ м³; точно 1,056.',
  },

  /* ===================== 16.52 ===================== */
  {
    id: '16.52', chapter: CH, section: S6, page: '268',
    title: 'Жидкий аргон: ε и n',
    given: [[String.raw`\alpha = 2{,}03\cdot10^{-29}\ \text{м}^3`, ''], [String.raw`\rho = 1{,}44\cdot10^3\ \text{кг/м}^3`, ''], [String.raw`M = 0{,}040\ \text{кг/моль}`, '']],
    find: String.raw`\varepsilon,\ n \;—\; ?`,
    formulas: [CM, { tex: String.raw`n = \sqrt\varepsilon`, text: 'для неполярного вещества (поляризация только электронная)' }],
    steps: [
      { title: 'Обозначение',
        tex: String.raw`\beta = \frac{\alpha\rho N_\text{A}}{3M} = \frac{2{,}03\cdot10^{-29}\cdot1{,}44\cdot10^3\cdot6{,}02\cdot10^{23}}{3\cdot0{,}040} = 0{,}147` },
      { title: 'Проницаемость и показатель преломления',
        tex: String.raw`\varepsilon = \frac{1 + 2\beta}{1 - \beta} = \frac{1{,}293}{0{,}853} = 1{,}52,\quad n = \sqrt{1{,}52} = 1{,}23` },
    ],
    answer: [String.raw`\varepsilon = 1{,}52;\quad n = 1{,}23`],
  },

  /* ===================== 16.53 ===================== */
  {
    id: '16.53', chapter: CH, section: S6, page: '268',
    title: 'Показатель преломления жидкого кислорода',
    given: [[String.raw`n_2 = 1{,}000272\ (\text{газ, н. у.})`, ''], [String.raw`\rho_1 = 1{,}19\cdot10^3\ \text{кг/м}^3`, ''], [String.raw`M = 0{,}032\ \text{кг/моль}`, '']],
    find: String.raw`n_1 \;—\; ?`,
    formulas: [LL, { tex: String.raw`\rho_2 = \frac{Mp}{RT}`, text: 'плотность газа при нормальных условиях' }],
    steps: [
      { title: 'Плотность газа',
        tex: String.raw`\rho_2 = \frac{0{,}032\cdot1{,}013\cdot10^5}{8{,}31\cdot273} = 1{,}43\ \text{кг/м}^3` },
      { title: 'Лоренц–Лоренц: правая часть пропорциональна плотности',
        tex: String.raw`\beta = \frac{n_2^2 - 1}{n_2^2 + 2}\cdot\frac{\rho_1}{\rho_2} = 1{,}813\cdot10^{-4}\cdot\frac{1190}{1{,}43} = 0{,}151` },
      { title: 'Показатель преломления жидкости',
        tex: String.raw`n_1 = \sqrt{\frac{1 + 2\beta}{1 - \beta}} = \sqrt{\frac{1{,}302}{0{,}849}} = 1{,}24` },
    ],
    answer: [String.raw`n_1 = 1{,}24`],
    note: MISMATCH + 'В книге 1,20. По формуле самой книги с её же данными выходит 1,24 (справочное значение для жидкого кислорода — около 1,22).',
  },

  /* ===================== 16.54 ===================== */
  {
    id: '16.54', chapter: CH, section: S7, page: '268',
    title: 'Ориентационная поляризуемость воды',
    given: [[String.raw`t = 27\ ^\circ\text{C}`, String.raw`T = 300\ \text{К}`], [String.raw`p = 6{,}1\cdot10^{-30}\ \text{Кл·м}`, '']],
    find: String.raw`\alpha_\text{ор} \;—\; ?`,
    formulas: [AOR],
    steps: [
      { title: 'Формула',
        tex: String.raw`\alpha_\text{ор} = \frac{(6{,}1\cdot10^{-30})^2}{3\cdot8{,}85\cdot10^{-12}\cdot1{,}38\cdot10^{-23}\cdot300} = 3{,}39\cdot10^{-28}\ \text{м}^3` },
    ],
    answer: [String.raw`\alpha_\text{ор} = 3{,}39\cdot10^{-28}\ \text{м}^3`],
    note: SMALL + 'В книге 3,38·10⁻²⁸ м³; точно 3,385.',
  },

  /* ===================== 16.55 ===================== */
  {
    id: '16.55', chapter: CH, section: S7, page: '268',
    title: 'Доля электронной поляризуемости у воды',
    given: [[String.raw`n = 1{,}000252`, ''], [String.raw`p = 6{,}1\cdot10^{-30}\ \text{Кл·м}`, ''], [String.raw`T = 273\ \text{К}`, '']],
    find: String.raw`\frac{\alpha_e}{\alpha_e + \alpha_\text{ор}} \;—\; ?`,
    formulas: [LL, AOR, LOSCH],
    steps: [
      { title: 'Электронная (по показателю преломления)',
        tex: String.raw`\alpha_e = \frac{3}{n_L}\cdot\frac{n^2 - 1}{n^2 + 2} = 1{,}88\cdot10^{-29}\ \text{м}^3` },
      { title: 'Ориентационная при 273 К',
        tex: String.raw`\alpha_\text{ор} = \frac{p^2}{3\varepsilon_0kT} = 3{,}72\cdot10^{-28}\ \text{м}^3` },
      { title: 'Доля',
        tex: String.raw`\frac{1{,}88}{1{,}88 + 37{,}2} = 0{,}048` },
    ],
    answer: [String.raw`0{,}048`],
    note: MISMATCH + 'В книге 0,046 (разница 4 %). По данным задачи выходит 0,048; 0,046 получится, например, с p = 6,2·10⁻³⁰ Кл·м.',
  },

  /* ===================== 16.56 ===================== */
  {
    id: '16.56', chapter: CH, section: S7, page: '268',
    title: 'Температура, при которой ⟨p_E⟩ = p/2',
    given: [[String.raw`p = 5\cdot10^{-30}\ \text{Кл·м}`, ''], [String.raw`\varepsilon = 2`, ''], [String.raw`E_\text{лок} = 100\ \text{МВ/м}`, String.raw`10^8\ \text{В/м}`]],
    find: String.raw`T \;—\; ?`,
    formulas: [{ tex: String.raw`\langle p_E\rangle = pL(a),\quad L(a) = \operatorname{cth}a - \frac1a,\quad a = \frac{pE_\text{лок}}{kT}`, text: 'функция Ланжевена: среднее значение проекции момента полярной молекулы' }],
    steps: [
      { title: 'Условие',
        tex: String.raw`L(a) = \frac12\ \Rightarrow\ a = 1{,}80\ (\text{решаем численно})` },
      { title: 'Температура',
        text: 'При a ≈ 1,8 приближение L ≈ a/3 (слабые поля) уже не годится — нужна точная функция Ланжевена.',
        tex: String.raw`T = \frac{pE_\text{лок}}{ka} = \frac{5\cdot10^{-30}\cdot10^8}{1{,}38\cdot10^{-23}\cdot1{,}80} = 20\ \text{К}` },
    ],
    answer: [String.raw`T \approx 20\ \text{К}`],
    note: MISMATCH + String.raw`В книге $T = \frac92\frac{\varepsilon + 2}{\varepsilon}\frac{pE_0}{k} = 326$ К. Но в условии дано $E_\text{лок}$ (а не $E_0$), и при 326 К параметр $a = pE_\text{лок}/kT \approx 0{,}11$, а $\langle p_E\rangle \approx 0{,}04p$, а не $p/2$. Среднее p/2 по формуле Ланжевена достигается только около 20 К. Видимо, в условии или ответе опечатка — уточните у преподавателя.`,
  },

  /* ===================== 16.57 ===================== */
  {
    id: '16.57', chapter: CH, section: S7, page: '269',
    title: 'Молекулы «по полю» и «против поля»',
    given: [[String.raw`p = 5\cdot10^{-30}\ \text{Кл·м}`, ''], [String.raw`T = 300\ \text{К}`, ''], [String.raw`E_\text{лок} = 100\ \text{МВ/м}`, String.raw`10^8\ \text{В/м}`]],
    find: String.raw`N_1/N_2 \;—\; ?`,
    formulas: [{ tex: String.raw`dN \propto e^{-\Pi/kT}\sin\theta\,d\theta,\quad \Pi = -pE\cos\theta`, text: 'распределение Больцмана по углам' }],
    steps: [
      { title: 'Параметр',
        tex: String.raw`a = \frac{pE_\text{лок}}{kT} = \frac{5\cdot10^{-30}\cdot10^8}{1{,}38\cdot10^{-23}\cdot300} = 0{,}121` },
      { title: 'Отношение',
        text: 'Интервалы углов одинаковы и симметричны (sin θ в них одинаков), а cos θ ≈ +1 и −1:',
        tex: String.raw`\frac{N_1}{N_2} = \frac{e^{a}}{e^{-a}} = e^{2a} = e^{0{,}242} = 1{,}27` },
    ],
    answer: [String.raw`\text{в 1,27 раза}`],
  },

  /* ===================== 16.58 ===================== */
  {
    id: '16.58', chapter: CH, section: S7, page: '269',
    title: 'Заряд и точечный диполь',
    given: [[String.raw`Q = 3\ \text{нКл}`, String.raw`3\cdot10^{-9}\ \text{Кл}`], [String.raw`r = 1\ \text{м}`, ''], [String.raw`p = 5\cdot10^{-11}\ \text{Кл·м}`, '']],
    find: String.raw`\Pi,\ F \;—\; ?`,
    formulas: [PHID, EAX, EPERP],
    steps: [
      { title: '1) Заряд на оси диполя',
        tex: String.raw`\Pi = Q\varphi = \frac{Qp}{4\pi\varepsilon_0r^2} = 1{,}35\cdot10^{-9}\ \text{Дж},\quad F = QE = \frac{Qp}{2\pi\varepsilon_0r^3} = 2{,}7\cdot10^{-9}\ \text{Н}` },
      { title: '2) Заряд на перпендикуляре',
        tex: String.raw`\Pi = 0,\quad F = \frac{Qp}{4\pi\varepsilon_0r^3} = 1{,}35\cdot10^{-9}\ \text{Н}` },
    ],
    answer: [String.raw`1)\ \Pi = 1{,}35\ \text{нДж};\ F = 2{,}7\ \text{нН}`, String.raw`2)\ \Pi = 0;\ F = 1{,}35\ \text{нН}`],
  },

  /* ===================== 16.59 ===================== */
  {
    id: '16.59', chapter: CH, section: S7, page: '269',
    title: 'Два антипараллельных диполя',
    given: [[String.raw`p = 2\ \text{нКл·м}`, String.raw`2\cdot10^{-9}\ \text{Кл·м}`], [String.raw`l = 10\ \text{см}`, String.raw`0{,}1\ \text{м}`], [String.raw`r = 2l`, '']],
    find: String.raw`\Pi \;—\; ?`,
    formulas: [WSYS_],
    steps: [
      { title: 'Заряды',
        text: 'По рис. 16.8 диполи параллельны друг другу и направлены противоположно; расстояние между ними r = 2l. Заряд каждого Q = p/l.' },
      { title: 'Четыре пары разных диполей',
        text: 'Разноимённые заряды стоят друг против друга (расстояние 2l), одноимённые — по диагонали (√5·l).',
        tex: String.raw`\Pi = \frac{Q^2}{4\pi\varepsilon_0}\left(-\frac{2}{2l} + \frac{2}{\sqrt5\,l}\right) = -\frac{p^2}{4\pi\varepsilon_0l^3}\left(1 - \frac{2}{\sqrt5}\right)` },
      { title: 'Считаем',
        tex: String.raw`\Pi = -\frac{8{,}99\cdot10^9\cdot4\cdot10^{-18}}{10^{-3}}\cdot0{,}106 = -3{,}80\cdot10^{-6}\ \text{Дж}` },
    ],
    answer: [String.raw`\Pi = -3{,}80\ \text{мкДж}`],
  },

  /* ===================== 16.60 ===================== */
  {
    id: '16.60', chapter: CH, section: S7, page: '269',
    title: 'Два диполя на одной оси',
    given: [[String.raw`p = 1\ \text{нКл·м}`, String.raw`10^{-9}\ \text{Кл·м}`], [String.raw`l = 10\ \text{см}`, String.raw`0{,}1\ \text{м}`], [String.raw`r = 2l`, '']],
    find: String.raw`\Pi,\ F \;—\; ?`,
    formulas: [WSYS_],
    steps: [
      { title: 'Расположение',
        text: 'По рис. 16.9: заряды −, +, −, + на одной прямой в точках 0, l, 3l, 4l (r = 2l — между внутренними зарядами).' },
      { title: 'Энергия',
        tex: String.raw`\Pi = \frac{Q^2}{4\pi\varepsilon_0}\left(-\frac{1}{2l} + \frac{1}{3l} + \frac{1}{3l} - \frac{1}{4l}\right) = -\frac{p^2}{48\pi\varepsilon_0l^3} = -7{,}5\cdot10^{-7}\ \text{Дж}` },
      { title: 'Сила (сумма кулоновских сил на второй диполь)',
        tex: String.raw`F = \frac{Q^2}{4\pi\varepsilon_0}\left(-\frac{1}{4l^2} + \frac{2}{9l^2} - \frac{1}{16l^2}\right) = -\frac{13}{144}\frac{p^2}{4\pi\varepsilon_0l^4} = -\frac{13}{576}\frac{p^2}{\pi\varepsilon_0l^4}` },
      { title: 'Считаем',
        text: 'Минус — притяжение.',
        tex: String.raw`F = -\frac{13}{144}\cdot\frac{8{,}99\cdot10^9\cdot10^{-18}}{10^{-4}} = -8{,}12\cdot10^{-6}\ \text{Н}` },
    ],
    answer: [String.raw`\Pi = -7{,}5\cdot10^{-7}\ \text{Дж}`, String.raw`F = -8{,}12\cdot10^{-6}\ \text{Н}`],
    note: MISMATCH + 'Формулы книги совпадают с нашими, но по формуле силы книги выходит −8,12·10⁻⁶ Н, а в книге −3,25·10⁻⁵ Н (в 4 раза больше).',
  },

  /* ===================== 16.61 ===================== */
  {
    id: '16.61', chapter: CH, section: S7, page: '269',
    title: 'Две молекулы воды',
    given: [[String.raw`p = 1{,}84\ \text{D}`, String.raw`6{,}14\cdot10^{-30}\ \text{Кл·м}`], [String.raw`r = 5\ \text{нм}`, String.raw`5\cdot10^{-9}\ \text{м}`]],
    find: String.raw`\Pi \;—\; ?`,
    formulas: [EPERP, WD],
    steps: [
      { title: 'Поле первого диполя у второго',
        text: 'По рис. 16.10 второй диполь — на перпендикуляре к оси первого; там поле направлено против p, а p₂ ∥ p₁ — угол 180°.',
        tex: String.raw`\Pi = -p_2E_1\cos180^\circ = \frac{p^2}{4\pi\varepsilon_0r^3}` },
      { title: 'Считаем',
        tex: String.raw`\Pi = \frac{8{,}99\cdot10^9\cdot(6{,}14\cdot10^{-30})^2}{(5\cdot10^{-9})^3} = 2{,}71\cdot10^{-24}\ \text{Дж} = 16{,}9\ \text{мкэВ}` },
    ],
    answer: [String.raw`\Pi = 2{,}71\cdot10^{-24}\ \text{Дж} = 16{,}9\ \text{мкэВ}`],
  },

  /* ===================== 16.62 ===================== */
  {
    id: '16.62', chapter: CH, section: S7, page: '269',
    title: 'Плечо индуцированного диполя аргона',
    given: [[String.raw`Z = 18`, ''], [String.raw`E = 30\ \text{кВ/м}`, String.raw`3\cdot10^4\ \text{В/м}`], [String.raw`\varepsilon = 1{,}000554`, '']],
    find: String.raw`l \;—\; ?`,
    formulas: [PK, LOSCH],
    steps: [
      { title: 'Поляризованность двумя способами',
        text: 'Индуцированный диполь атома: заряд Ze электронной оболочки смещён на l.',
        tex: String.raw`P = (\varepsilon - 1)\varepsilon_0E = n_LZel` },
      { title: 'Плечо',
        tex: String.raw`l = \frac{(\varepsilon - 1)\varepsilon_0E}{Zen_L} = \frac{5{,}54\cdot10^{-4}\cdot8{,}85\cdot10^{-12}\cdot3\cdot10^4}{18\cdot1{,}6\cdot10^{-19}\cdot2{,}69\cdot10^{25}} = 1{,}9\cdot10^{-18}\ \text{м}` },
    ],
    answer: [String.raw`l = 1{,}9\cdot10^{-18}\ \text{м}`],
  },

  /* ===================== 16.63 ===================== */
  {
    id: '16.63', chapter: CH, section: S7, page: '269',
    title: 'Индуцированный момент молекулы O₂',
    given: [[String.raw`E = 10\ \text{кВ/м}`, String.raw`10^4\ \text{В/м}`], [String.raw`\varepsilon = 1{,}000532`, '']],
    find: String.raw`p \;—\; ?`,
    formulas: [PK, LOSCH],
    steps: [
      { title: 'Момент молекулы',
        tex: String.raw`p = \frac{P}{n_L} = \frac{(\varepsilon - 1)\varepsilon_0E}{n_L} = \frac{5{,}32\cdot10^{-4}\cdot8{,}85\cdot10^{-12}\cdot10^4}{2{,}69\cdot10^{25}} = 1{,}75\cdot10^{-36}\ \text{Кл·м}` },
      { title: 'В дебаях',
        tex: String.raw`p = \frac{1{,}75\cdot10^{-36}}{3{,}336\cdot10^{-30}} = 5{,}25\cdot10^{-7}\ \text{D}` },
    ],
    answer: [String.raw`p = 1{,}75\cdot10^{-36}\ \text{Кл·м} = 5{,}25\cdot10^{-7}\ \text{D}`],
    note: MISMATCH + 'В книге 52,6·10⁻³ D — в 10⁵ раз больше. По формуле самой книги с её данными: 1,75·10⁻³⁶ Кл·м = 5,25·10⁻⁷ D. Для сравнения: момент полярной молекулы воды всего 1,85 D, а индуцированный слабым полем 10 кВ/м должен быть ничтожным.',
  },

  /* ===================== 16.64 ===================== */
  {
    id: '16.64', chapter: CH, section: S7, page: '270',
    title: 'Дипольный момент молекулы воды по ε пара',
    given: [[String.raw`n = 1{,}97\cdot10^{25}\ \text{м}^{-3}`, ''], [String.raw`T = 373\ \text{К}`, ''], [String.raw`\varepsilon = 1{,}0058`, '']],
    find: String.raw`p \;—\; ?`,
    formulas: [AOR, { tex: String.raw`\varepsilon - 1 \approx n\alpha_\text{ор}`, text: 'разреженный газ; вклад электронной поляризации мал' }],
    steps: [
      { title: 'Выражаем p',
        tex: String.raw`\varepsilon - 1 = \frac{np^2}{3\varepsilon_0kT}\ \Rightarrow\ p = \sqrt{\frac{3\varepsilon_0kT(\varepsilon - 1)}{n}}` },
      { title: 'Считаем',
        tex: String.raw`p = \sqrt{\frac{3\cdot8{,}85\cdot10^{-12}\cdot1{,}38\cdot10^{-23}\cdot373\cdot0{,}0058}{1{,}97\cdot10^{25}}} = 6{,}34\cdot10^{-30}\ \text{Кл·м} = 1{,}9\ \text{D}` },
    ],
    answer: [String.raw`p = 1{,}9\ \text{D}`],
  },

  /* ===================== 16.65 ===================== */
  {
    id: '16.65', chapter: CH, section: S7, page: '270',
    title: 'Дипольный момент молекулы воды по связям',
    given: [[String.raw`p_1 = 1{,}51\ \text{D}`, ''], [String.raw`\alpha = 104{,}5^\circ`, '']],
    find: String.raw`p \;—\; ?`,
    formulas: [{ tex: String.raw`\mathbf p = \mathbf p_1 + \mathbf p_1'`, text: 'моменты двух связей O–H складываются как векторы' }],
    steps: [
      { title: 'Сумма двух векторов под углом α',
        tex: String.raw`p = 2p_1\cos\frac\alpha2 = 2\cdot1{,}51\cdot\cos52{,}25^\circ = 1{,}85\ \text{D}` },
    ],
    answer: [String.raw`p = 1{,}85\ \text{D}`],
  }

  );
})();
