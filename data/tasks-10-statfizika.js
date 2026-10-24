/*
  § 10. Элементы статистической физики — задачи 10.1–10.86 (стр. 158–165).
  Условия задач показываются дословно из книги (data/book-tasks.js).
  Ответы пересчитаны скриптом tools/check_statfizika.py и сверены с book/99-otvety.md.
  Где ответ книги расходится с расчётом — плашка note «Расхождение с ответом книги».
  Постоянные — табл. 24 приложения: k = 1,38·10⁻²³ Дж/К, N_A = 6,02·10²³ моль⁻¹, R = 8,31 Дж/(моль·К), g = 9,81 м/с².
  Нормальные условия: p₀ = 101,3 кПа, T₀ = 273 К. Эффективные диаметры молекул, вязкость, теплопроводность — табл. 12.
*/
(function () {
  const CH = 'Гл. 2. Молекулярная физика и термодинамика';
  const S1 = 'Распределение Больцмана';
  const S2 = 'Распределение молекул по скоростям и импульсам';
  const S3 = 'Распределение молекул по кинетическим энергиям поступательного движения';
  const S4 = 'Длина свободного пробега и число столкновений молекул';
  const S5 = 'Явления переноса: диффузия, вязкость, теплопроводность';
  const MISMATCH = '<b>Расхождение с ответом книги.</b> ';
  const SMALL = '<b>Расхождение в последней цифре.</b> ';
  const TYPO = '<b>Опечатка в ответе книги.</b> ';
  const PI = Math.PI, ex = Math.exp, sq = Math.sqrt;

  const BOLTZ = { tex: String.raw`n = n_0\exp\left(-\frac{U}{kT}\right)`, text: 'распределение Больцмана: концентрация частиц в поле, U — потенциальная энергия частицы' };
  const BARO = { tex: String.raw`p = p_0\exp\left(-\frac{Mgz}{RT}\right)`, text: 'барометрическая формула (температура не меняется с высотой)' };
  const MAXW = { tex: String.raw`f(v) = \frac{4}{\sqrt\pi}\left(\frac{m}{2kT}\right)^{3/2}e^{-\frac{mv^2}{2kT}}v^2`, text: 'распределение Максвелла по модулям скоростей; f(v)dv — доля молекул со скоростями от v до v + dv' };
  const MAXU = { tex: String.raw`f(u) = \frac{4}{\sqrt\pi}e^{-u^2}u^2,\quad u = \frac{v}{v_\text{в}}`, text: 'то же по относительным скоростям; v_в — наиболее вероятная скорость' };
  const VB = { tex: String.raw`v_\text{в} = \sqrt{\frac{2kT}{m}} = \sqrt{\frac{2RT}{M}}`, text: 'наиболее вероятная скорость' };
  const VAVG = { tex: String.raw`\langle v\rangle = \sqrt{\frac{8RT}{\pi M}}`, text: 'средняя арифметическая скорость молекул' };
  const FP = { tex: String.raw`f(p) = \frac{4}{\sqrt\pi}\left(\frac{1}{2mkT}\right)^{3/2}e^{-\frac{p^2}{2mkT}}p^2`, text: 'распределение молекул по импульсам' };
  const FE = { tex: String.raw`f(\varepsilon) = \frac{2}{\sqrt\pi}\frac{1}{(kT)^{3/2}}e^{-\varepsilon/kT}\varepsilon^{1/2}`, text: 'распределение по кинетическим энергиям поступательного движения' };
  const SMALLW = { tex: String.raw`\Delta W \approx f(x)\,\Delta x`, text: 'доля молекул в узком интервале Δx около x' };
  const GAUSS = { tex: String.raw`\int_0^\infty x^{n}e^{-ax^2}dx:\ \ n = 1:\ \tfrac1{2a};\ \ n = 2:\ \tfrac{\sqrt\pi}{4a^{3/2}};\ \ n = 3:\ \tfrac1{2a^2};\ \ n = 4:\ \tfrac{3\sqrt\pi}{8a^{5/2}}`, text: 'интегралы Пуассона (табл. 2 приложения)' };
  const LFREE = { tex: String.raw`\langle l\rangle = \frac{1}{\sqrt2\pi d^2n},\quad n = \frac{p}{kT}`, text: 'средняя длина свободного пробега; d — эффективный диаметр молекулы' };
  const ZCOL = { tex: String.raw`\langle z\rangle = \sqrt2\pi d^2n\langle v\rangle = \frac{\langle v\rangle}{\langle l\rangle}`, text: 'среднее число столкновений молекулы за 1 с' };
  const DIFF = { tex: String.raw`D = \frac13\langle v\rangle\langle l\rangle`, text: 'коэффициент диффузии' };
  const VISC = { tex: String.raw`\eta = \frac13\rho\langle v\rangle\langle l\rangle`, text: 'динамическая вязкость газа' };
  const COND = { tex: String.raw`\lambda = \frac13c_V\rho\langle v\rangle\langle l\rangle,\quad c_V = \frac i2\frac RM`, text: 'теплопроводность газа; i — число степеней свободы молекулы' };
  const NEWTON = { tex: String.raw`F = \eta\frac{dv}{dz}S`, text: 'закон Ньютона для силы внутреннего трения' };
  const FOURIER = { tex: String.raw`q = \lambda\frac{\Delta T}{d}`, text: 'закон Фурье: плотность теплового потока' };

  /* качественный график зависимости: две кривые 1 и 2 (процессы), без делений на осях */
  const dep = (xl, yl, curves) => () => FIG.graph({ w: 300, h: 170, x: [0, 1.3], y: [0, 1.3], xt: [], yt: [], xl, yl,
    s: curves.map(c => ({ f: c.f, t: c.t || [0.02, 1.25], blue: c.blue, dash: c.dash, label: c.label })) });

  window.TASKS.push(

  /* ===================== 10.1 ===================== */
  {
    id: '10.1', chapter: CH, section: S1, page: '158',
    title: 'Пылинки в воздухе',
    given: [[String.raw`m = 10^{-18}\ \text{г}`, String.raw`10^{-21}\ \text{кг}`], [String.raw`\Delta h = 10\ \text{м}`, ''], [String.raw`T = 300\ \text{К}`, '']],
    find: String.raw`n_0/n \;—\; ?`,
    formulas: [BOLTZ],
    steps: [
      { title: 'Потенциальная энергия пылинки',
        tex: String.raw`U = mg\Delta h \;\Rightarrow\; \frac{n_0}{n} = \exp\frac{mg\Delta h}{kT}` },
      { title: 'Показатель',
        text: 'В книге e^23,6 — так выходит с g = 9,8 м/с²; разница в последней цифре.',
        tex: String.raw`\frac{mg\Delta h}{kT} = \frac{10^{-21}\cdot9{,}81\cdot10}{1{,}38\cdot10^{-23}\cdot300} = 23{,}7` },
    ],
    answer: [String.raw`\text{в}\ e^{23{,}7} \approx 2\cdot10^{10}\ \text{раз}`],
  },

  /* ===================== 10.2 ===================== */
  {
    id: '10.2', chapter: CH, section: S1, page: '158',
    title: 'Частицы в слабом поле',
    given: [[String.raw`m = 10^{-12}\ \text{г}`, String.raw`10^{-15}\ \text{кг}`], [String.raw`G = 0{,}2\ \text{мкН/кг}`, String.raw`2\cdot10^{-7}\ \text{Н/кг}`], [String.raw`\Delta z = 10\ \text{м}`, ''], [String.raw`T = 290\ \text{К}`, '']],
    find: String.raw`n_1/n_2 \;—\; ?`,
    formulas: [BOLTZ],
    steps: [
      { title: 'Разность потенциальных энергий',
        tex: String.raw`\Delta U = mG\Delta z = 10^{-15}\cdot2\cdot10^{-7}\cdot10 = 2\cdot10^{-21}\ \text{Дж}` },
      { title: 'Отношение концентраций',
        tex: String.raw`\frac{n_1}{n_2} = \exp\frac{\Delta U}{kT} = \exp\frac{2\cdot10^{-21}}{4{,}0\cdot10^{-21}} = e^{0{,}5} = 1{,}65` },
    ],
    answer: [String.raw`n_1/n_2 = 1{,}65`],
  },

  /* ===================== 10.3 ===================== */
  {
    id: '10.3', chapter: CH, section: S1, page: '158',
    title: 'Постоянная Авогадро по пылинкам',
    note: MISMATCH + String.raw`С данными условия ($m = 1$ аг $= 10^{-21}$ кг) выходит $N_\text{A} = 6{,}1\cdot10^{22}$ моль⁻¹ — в 10 раз меньше настоящего: такие тяжёлые пылинки на 1 м разредились бы сильнее, чем до 0,787. Ответ книги $5{,}97\cdot10^{23}$ близок к тому, что даёт масса $0{,}1$ аг ($6{,}09\cdot10^{23}$). Видимо, в условии ошибка в массе.`,
    given: [[String.raw`m = 1\ \text{аг}`, String.raw`10^{-21}\ \text{кг}`], [String.raw`h = 1\ \text{м}`, ''], [String.raw`n_1/n_0 = 0{,}787`, ''], [String.raw`T = 300\ \text{К}`, '']],
    find: String.raw`N_\text{A} \;—\; ?`,
    formulas: [BOLTZ, { tex: String.raw`k = \frac{R}{N_\text{A}}`, text: 'постоянная Больцмана через R и N_A' }],
    steps: [
      { title: 'Из распределения Больцмана',
        tex: String.raw`\frac{n_1}{n_0} = \exp\left(-\frac{mghN_\text{A}}{RT}\right) \;\Rightarrow\; N_\text{A} = \frac{RT\ln(n_0/n_1)}{mgh}` },
      { title: 'Числа',
        tex: String.raw`N_\text{A} = \frac{8{,}31\cdot300\cdot0{,}2395}{10^{-21}\cdot9{,}81\cdot1} = 6{,}1\cdot10^{22}\ \text{моль}^{-1}` },
      { title: 'Если m = 0,1 аг',
        tex: String.raw`N_\text{A} = 6{,}1\cdot10^{23}\ \text{моль}^{-1}` },
    ],
    answer: [String.raw`N_\text{A} = \frac{RT\ln(n_0/n_1)}{mgh}`, String.raw`\text{по условию}\ 6{,}1\cdot10^{22};\quad \text{при}\ m = 0{,}1\ \text{аг}\ 6{,}1\cdot10^{23}\ \text{моль}^{-1}`],
  },

  /* ===================== 10.4 ===================== */
  {
    id: '10.4', chapter: CH, section: S1, page: '158',
    title: 'Сила по распределению концентрации',
    given: [[String.raw`\Delta z = 1\ \text{м}`, ''], [String.raw`n_1/n_2 = e`, ''], [String.raw`T = 300\ \text{К}`, '']],
    find: String.raw`F \;—\; ?`,
    formulas: [BOLTZ],
    steps: [
      { title: 'Разность энергий равна kT',
        tex: String.raw`\ln\frac{n_1}{n_2} = \frac{F\Delta z}{kT} = 1 \;\Rightarrow\; F = \frac{kT}{\Delta z} = 4{,}14\cdot10^{-21}\ \text{Н}` },
    ],
    answer: [String.raw`F = kT/\Delta z = 4{,}14\cdot10^{-21}\ \text{Н}`],
  },

  /* ===================== 10.5 ===================== */
  {
    id: '10.5', chapter: CH, section: S1, page: '158',
    title: 'Падение давления на 100 м',
    given: [[String.raw`p = 100\ \text{кПа}`, ''], [String.raw`h = 100\ \text{м}`, ''], [String.raw`T = 290\ \text{К}`, ''], [String.raw`M = 29\cdot10^{-3}\ \text{кг/моль}`, '']],
    find: String.raw`\Delta p \;—\; ?`,
    formulas: [BARO],
    steps: [
      { title: 'Показатель экспоненты мал',
        tex: String.raw`\frac{Mgh}{RT} = \frac{0{,}029\cdot9{,}81\cdot100}{8{,}31\cdot290} = 0{,}0118` },
      { title: 'Изменение давления',
        text: 'По точной формуле 1,17 кПа; с приближением e⁻ˣ ≈ 1 − x (так в книге) — 1,18 кПа.',
        tex: String.raw`\Delta p = p\left(1 - e^{-Mgh/RT}\right) \approx p\frac{Mgh}{RT} = 1{,}18\ \text{кПа}` },
    ],
    answer: [String.raw`\Delta p \approx 1{,}18\ \text{кПа}`],
  },

  /* ===================== 10.6 ===================== */
  {
    id: '10.6', chapter: CH, section: S1, page: '158',
    title: 'Где давление вдвое меньше',
    given: [[String.raw`p/p_0 = 1/2`, ''], [String.raw`T = 290\ \text{К}`, '']],
    find: String.raw`h \;—\; ?`,
    formulas: [BARO],
    steps: [
      { title: 'Логарифмируем',
        tex: String.raw`h = \frac{RT}{Mg}\ln\frac{p_0}{p} = \frac{8{,}31\cdot290}{0{,}029\cdot9{,}81}\cdot0{,}693 = 5{,}87\ \text{км}` },
      { title: 'Сверка',
        text: 'В книге 5,88 км — отличие в последней цифре.' },
    ],
    answer: [String.raw`h = \frac{RT}{Mg}\ln2 = 5{,}87\ \text{км}`],
  },

  /* ===================== 10.7 ===================== */
  {
    id: '10.7', chapter: CH, section: S1, page: '158',
    title: 'Высота вертолёта по барометру',
    given: [[String.raw`p = 90\ \text{кПа}`, ''], [String.raw`p_0 = 100\ \text{кПа}`, ''], [String.raw`T = 290\ \text{К}`, '']],
    find: String.raw`h \;—\; ?`,
    formulas: [BARO],
    steps: [
      { title: 'Высота',
        tex: String.raw`h = \frac{RT}{Mg}\ln\frac{p_0}{p} = 8471\cdot\ln\frac{100}{90} = 893\ \text{м}` },
    ],
    answer: [String.raw`h = 893\ \text{м}`],
  },

  /* ===================== 10.8 ===================== */
  {
    id: '10.8', chapter: CH, section: S1, page: '158',
    title: 'Сколько метров на 100 Па',
    note: MISMATCH + String.raw`В случае 1 в книге 8,75 м; по барометрической формуле $\Delta h = \frac{RT}{Mg}\cdot\frac{\Delta p}{p} = 8{,}47$ м (похоже, переставлены цифры). Случай 2 совпадает (25,7 м против 25,8).`,
    given: [[String.raw`\Delta p = 100\ \text{Па}`, ''], [String.raw`1)\ T_1 = 290\ \text{К},\ p_1 = 100\ \text{кПа}`, ''], [String.raw`2)\ T_2 = 220\ \text{К},\ p_2 = 25\ \text{кПа}`, '']],
    find: String.raw`\Delta h \;—\; ?`,
    formulas: [BARO],
    steps: [
      { title: 'Малое изменение',
        text: 'Дифференцируем барометрическую формулу: dp/dh = −pMg/(RT).',
        tex: String.raw`\Delta h = \frac{RT}{Mg}\cdot\frac{\Delta p}{p}` },
      { title: '1) у Земли',
        tex: String.raw`\Delta h_1 = \frac{8{,}31\cdot290}{0{,}029\cdot9{,}81}\cdot\frac{100}{10^5} = 8{,}47\ \text{м}` },
      { title: '2) на высоте',
        text: 'Воздух разрежен — тот же перепад давления набирается на большей высоте.',
        tex: String.raw`\Delta h_2 = \frac{8{,}31\cdot220}{0{,}029\cdot9{,}81}\cdot\frac{100}{2{,}5\cdot10^4} = 25{,}7\ \text{м}` },
    ],
    answer: [String.raw`1)\ 8{,}47\ \text{м};\quad 2)\ 25{,}7\ \text{м}`],
  },

  /* ===================== 10.9 ===================== */
  {
    id: '10.9', chapter: CH, section: S1, page: '158–159',
    title: 'Ошибка высотомера от температуры',
    given: [[String.raw`p = 80\ \text{кПа}`, ''], [String.raw`p_0 = 100\ \text{кПа}`, ''], [String.raw`\Delta T = 1\ \text{К}`, '']],
    find: String.raw`\Delta h \;—\; ?`,
    formulas: [BARO],
    steps: [
      { title: 'Высота пропорциональна T',
        tex: String.raw`h = \frac{RT}{Mg}\ln\frac{p_0}{p} \;\Rightarrow\; \Delta h = \frac{R\Delta T}{Mg}\ln\frac{p_0}{p}` },
      { title: 'Числа',
        tex: String.raw`\Delta h = \frac{8{,}31\cdot1}{0{,}029\cdot9{,}81}\cdot0{,}223 = 6{,}5\ \text{м}` },
    ],
    answer: [String.raw`\Delta h = 6{,}5\ \text{м}`],
  },

  /* ===================== 10.10 ===================== */
  {
    id: '10.10', chapter: CH, section: S1, page: '159',
    title: 'Распределение в центрифуге',
    given: [[String.raw`\omega,\ m,\ T`, '']],
    find: String.raw`n(r) \;—\; ?`,
    formulas: [BOLTZ, { tex: String.raw`F = m\omega^2r`, text: 'центробежная сила инерции во вращающейся системе' }],
    steps: [
      { title: 'Потенциальная энергия во вращающейся системе',
        text: 'В системе ротора на частицу действует центробежная сила mω²r, направленная от оси. Её потенциальная энергия (отсчёт от оси):',
        tex: String.raw`U(r) = -\int_0^r m\omega^2r\,dr = -\frac{m\omega^2r^2}{2}` },
      { title: 'Распределение Больцмана',
        text: 'Энергия убывает к стенкам — частицы скапливаются у стенок.',
        tex: String.raw`n = n_0\exp\frac{m\omega^2r^2}{2kT}` },
    ],
    answer: [String.raw`n = n_0\exp\frac{m\omega^2r^2}{2kT}`],
  },

  /* ===================== 10.11 ===================== */
  {
    id: '10.11', chapter: CH, section: S1, page: '159',
    title: 'Тяжёлые молекулы у стенок ротора',
    given: [[String.raw`a = 0{,}5\ \text{м}`, ''], [String.raw`T = 300\ \text{К}`, ''], [String.raw`M_r = 10^3\ (M = 1\ \text{кг/моль})`, ''], [String.raw`n = 30\ \text{с}^{-1}`, '']],
    find: String.raw`n_a/n_0 \;—\; ?`,
    formulas: [{ tex: String.raw`n = n_0\exp\frac{M\omega^2r^2}{2RT}`, text: 'распределение в центрифуге (задача 10.10), m/k = M/R' }],
    steps: [
      { title: 'Показатель',
        tex: String.raw`\omega = 2\pi n = 188{,}5\ \text{с}^{-1},\qquad \frac{M\omega^2a^2}{2RT} = \frac{1\cdot35\,530\cdot0{,}25}{2\cdot8{,}31\cdot300} = 1{,}78` },
      { title: 'Отношение',
        text: 'В книге 5,91 — отличие в последней цифре.',
        tex: String.raw`\frac{n_a}{n_0} = e^{1{,}78} = 5{,}94` },
    ],
    answer: [String.raw`n_a/n_0 = 5{,}94`],
  },

  /* ===================== 10.12 ===================== */
  {
    id: '10.12', chapter: CH, section: S1, page: '159',
    title: 'Радон в центрифуге',
    given: [[String.raw`n = 50\ \text{с}^{-1}`, ''], [String.raw`a = 0{,}5\ \text{м}`, ''], [String.raw`p_0 = 101{,}3\ \text{кПа}`, ''], [String.raw`T = 300\ \text{К}`, ''], [String.raw`M = 222\cdot10^{-3}\ \text{кг/моль}`, '']],
    find: String.raw`p \;—\; ?`,
    formulas: [{ tex: String.raw`p = p_0\exp\frac{M\omega^2r^2}{2RT}`, text: 'давление пропорционально концентрации (T одинакова)' }],
    steps: [
      { title: 'Показатель',
        tex: String.raw`\frac{M\omega^2a^2}{2RT} = \frac{0{,}222\cdot(314{,}2)^2\cdot0{,}25}{2\cdot8{,}31\cdot300} = 1{,}10` },
      { title: 'Давление',
        tex: String.raw`p = 101{,}3\cdot e^{1{,}10} = 101{,}3\cdot3{,}00 = 304\ \text{кПа}` },
    ],
    answer: [String.raw`p = 304\ \text{кПа}`],
  },

  /* ===================== 10.13 ===================== */
  {
    id: '10.13', chapter: CH, section: S1, page: '159',
    title: 'Какой газ в центрифуге',
    given: [[String.raw`T = 271\ \text{К}`, ''], [String.raw`a = 0{,}4\ \text{м}`, ''], [String.raw`\omega = 500\ \text{рад/с}`, ''], [String.raw`p/p_0 = 2{,}1`, '']],
    find: String.raw`M_r \;—\; ?`,
    formulas: [{ tex: String.raw`p = p_0\exp\frac{M\omega^2r^2}{2RT}`, text: 'распределение давления в центрифуге' }],
    steps: [
      { title: 'Молярная масса',
        tex: String.raw`M = \frac{2RT\ln(p/p_0)}{\omega^2a^2} = \frac{2\cdot8{,}31\cdot271\cdot0{,}742}{250\,000\cdot0{,}16} = 0{,}0835\ \text{кг/моль}` },
      { title: 'Ответ',
        text: 'Mr ≈ 84 — криптон.' },
    ],
    answer: [String.raw`M_r \approx 84\ (\text{криптон})`],
  },

  /* ===================== 10.14 ===================== */
  {
    id: '10.14', chapter: CH, section: S1, page: '159',
    title: 'Разделение изотопов хлора',
    given: [[String.raw`a = 0{,}2\ \text{м}`, ''], [String.raw`T = 3000\ \text{К}`, ''], [String.raw`w_1 = 0{,}25\ (^{37}\text{Cl})`, ''], [String.raw`\omega = 10^4\ \text{рад/с}`, '']],
    find: String.raw`w'_1,\ w'_2 \;—\; ?`,
    formulas: [{ tex: String.raw`n_i(a) = n_i(0)\exp\frac{M_i\omega^2a^2}{2RT}`, text: 'каждый изотоп распределяется независимо' }],
    steps: [
      { title: 'Во сколько раз обогащается тяжёлый изотоп',
        tex: String.raw`\frac{n_1(a)/n_2(a)}{n_1(0)/n_2(0)} = \exp\frac{(M_1 - M_2)\omega^2a^2}{2RT} = \exp\frac{0{,}002\cdot10^8\cdot0{,}04}{2\cdot8{,}31\cdot3000} = e^{0{,}160} = 1{,}174` },
      { title: 'Доли у стенки',
        tex: String.raw`w'_1 = \frac{0{,}25\cdot1{,}174}{0{,}25\cdot1{,}174 + 0{,}75} = 0{,}28,\qquad w'_2 = 0{,}72` },
    ],
    answer: [String.raw`w'_1 = 28\ \%;\quad w'_2 = 72\ \%`],
  },

  /* ===================== 10.15 ===================== */
  {
    id: '10.15', chapter: CH, section: S2, page: '159',
    title: 'Вывод наиболее вероятной скорости',
    given: [[String.raw`f(v)\ \text{— Максвелл}`, '']],
    find: String.raw`v_\text{в} \;—\; ?`,
    formulas: [MAXW],
    steps: [
      { title: 'Максимум функции',
        text: 'Наиболее вероятная скорость — та, где f(v) максимальна. Множитель перед функцией на положение максимума не влияет.',
        tex: String.raw`\frac{d}{dv}\left(v^2e^{-mv^2/2kT}\right) = \left(2v - \frac{mv^3}{kT}\right)e^{-mv^2/2kT} = 0` },
      { title: 'Ответ',
        tex: String.raw`v_\text{в} = \sqrt{\frac{2kT}{m}}` },
    ],
    answer: [String.raw`v_\text{в} = \sqrt{2kT/m}`],
  },

  /* ===================== 10.16 ===================== */
  {
    id: '10.16', chapter: CH, section: S2, page: '159',
    title: 'Распределение по относительным скоростям',
    given: [[String.raw`u = v/v_\text{в}`, '']],
    find: String.raw`f(u) \;—\; ?`,
    formulas: [MAXW, VB],
    steps: [
      { title: 'Замена переменной',
        text: String.raw`$v = uv_\text{в}$, $dv = v_\text{в}du$, $\frac{m}{2kT} = \frac{1}{v_\text{в}^2}$. Доля молекул в интервале не зависит от того, как его записать: $f(u)du = f(v)dv$.`,
        tex: String.raw`f(v)dv = \frac{4}{\sqrt\pi}\frac{1}{v_\text{в}^3}e^{-u^2}u^2v_\text{в}^2\cdot v_\text{в}du` },
      { title: 'Ответ',
        tex: String.raw`f(u)\,du = \frac{4}{\sqrt\pi}e^{-u^2}u^2\,du` },
    ],
    answer: [String.raw`f(u)\,du = \frac{4}{\sqrt\pi}e^{-u^2}u^2\,du`],
  },

  /* ===================== 10.17 ===================== */
  {
    id: '10.17', chapter: CH, section: S2, page: '159',
    title: 'Скорость около v_в/2',
    given: [[String.raw`u = 0{,}5`, ''], [String.raw`\Delta v/v = \pm1\ \%`, '']],
    find: String.raw`W \;—\; ?`,
    formulas: [MAXU, SMALLW],
    steps: [
      { title: 'Ширина интервала',
        text: 'Скорость от 0,99·v_в/2 до 1,01·v_в/2 — в относительных скоростях Δu = 0,02·0,5 = 0,01.' },
      { title: 'Вероятность',
        tex: String.raw`W = f(0{,}5)\,\Delta u = \frac{4}{\sqrt\pi}e^{-0{,}25}\cdot0{,}25\cdot0{,}01 = 4{,}39\cdot10^{-3}` },
    ],
    answer: [String.raw`W = 4{,}39\cdot10^{-3}`],
  },

  /* ===================== 10.18 ===================== */
  {
    id: '10.18', chapter: CH, section: S2, page: '159',
    title: 'Скорость около 2v_в',
    given: [[String.raw`u = 2`, ''], [String.raw`\Delta v/v = \pm1\ \%`, '']],
    find: String.raw`W \;—\; ?`,
    formulas: [MAXU, SMALLW],
    steps: [
      { title: 'Вероятность',
        text: 'Δu = 0,02·2 = 0,04. В книге 6,63·10⁻³ — отличие в последней цифре.',
        tex: String.raw`W = f(2)\,\Delta u = \frac{4}{\sqrt\pi}e^{-4}\cdot4\cdot0{,}04 = 6{,}61\cdot10^{-3}` },
    ],
    answer: [String.raw`W = 6{,}61\cdot10^{-3}`],
  },

  /* ===================== 10.19 ===================== */
  {
    id: '10.19', chapter: CH, section: S2, page: '159',
    title: 'Доля очень медленных молекул',
    given: [[String.raw`v \ll v_\text{в}`, '']],
    find: String.raw`w \;—\; ?`,
    formulas: [MAXW],
    steps: [
      { title: 'При малых v экспонента ≈ 1',
        tex: String.raw`w = \int_0^v f(v)\,dv \approx \frac{4}{\sqrt\pi}\left(\frac{m}{2kT}\right)^{3/2}\int_0^v v^2dv = \frac{4}{3\sqrt\pi}\left(\frac{m}{2kT}\right)^{3/2}v^3` },
      { title: 'В виде книги',
        tex: String.raw`w = \frac13\left(\frac2\pi\right)^{1/2}\left(\frac{m}{kT}\right)^{3/2}v^3 = \frac{4}{3\sqrt\pi}\left(\frac{v}{v_\text{в}}\right)^3` },
    ],
    answer: [String.raw`w = \frac13\left(\frac2\pi\right)^{1/2}\left(\frac{m}{kT}\right)^{3/2}v^3`],
  },

  /* ===================== 10.20 ===================== */
  {
    id: '10.20', chapter: CH, section: S2, page: '159',
    title: 'Скорости до 0,01 v_в',
    given: [[String.raw`u_{\max} = 0{,}01`, '']],
    find: String.raw`w \;—\; ?`,
    formulas: [MAXU],
    steps: [
      { title: 'Формула задачи 10.19',
        tex: String.raw`w = \frac{4}{3\sqrt\pi}u^3 = 0{,}752\cdot10^{-6} = 7{,}52\cdot10^{-7}` },
    ],
    answer: [String.raw`w = 7{,}52\cdot10^{-7}`],
  },

  /* ===================== 10.21 ===================== */
  {
    id: '10.21', chapter: CH, section: S2, page: '160',
    title: 'Вывод средней скорости',
    given: [[String.raw`f(v)\ \text{— Максвелл}`, '']],
    find: String.raw`\langle v\rangle \;—\; ?`,
    formulas: [MAXW, GAUSS],
    steps: [
      { title: 'Среднее значение',
        text: String.raw`Обозначим $a = \frac{m}{2kT}$.`,
        tex: String.raw`\langle v\rangle = \int_0^\infty vf(v)\,dv = \frac{4}{\sqrt\pi}a^{3/2}\int_0^\infty v^3e^{-av^2}dv = \frac{4}{\sqrt\pi}a^{3/2}\cdot\frac{1}{2a^2} = \frac{2}{\sqrt{\pi a}}` },
      { title: 'Ответ',
        tex: String.raw`\langle v\rangle = \sqrt{\frac{8kT}{\pi m}}` },
    ],
    answer: [String.raw`\langle v\rangle = \sqrt{8kT/(\pi m)}`],
  },

  /* ===================== 10.22 ===================== */
  {
    id: '10.22', chapter: CH, section: S2, page: '160',
    title: 'Вывод средней квадратичной скорости',
    given: [[String.raw`f(v)\ \text{— Максвелл}`, '']],
    find: String.raw`\langle v_\text{кв}\rangle \;—\; ?`,
    formulas: [MAXW, GAUSS],
    steps: [
      { title: 'Средний квадрат скорости',
        tex: String.raw`\langle v^2\rangle = \frac{4}{\sqrt\pi}a^{3/2}\int_0^\infty v^4e^{-av^2}dv = \frac{4}{\sqrt\pi}a^{3/2}\cdot\frac{3\sqrt\pi}{8a^{5/2}} = \frac{3}{2a} = \frac{3kT}{m}` },
      { title: 'Ответ',
        tex: String.raw`\langle v_\text{кв}\rangle = \sqrt{\langle v^2\rangle} = \sqrt{\frac{3kT}{m}}` },
    ],
    answer: [String.raw`\langle v_\text{кв}\rangle = \sqrt{3kT/m}`],
  },

  /* ===================== 10.23 ===================== */
  {
    id: '10.23', chapter: CH, section: S2, page: '160',
    title: 'Что больше: ⟨1/v⟩ или 1/⟨v⟩',
    given: [[String.raw`f(v)\ \text{— Максвелл}`, '']],
    find: String.raw`k = \langle1/v\rangle\cdot\langle v\rangle \;—\; ?`,
    formulas: [MAXW, GAUSS],
    steps: [
      { title: 'Среднее от 1/v',
        tex: String.raw`\left\langle\frac1v\right\rangle = \frac{4}{\sqrt\pi}a^{3/2}\int_0^\infty ve^{-av^2}dv = \frac{4}{\sqrt\pi}a^{3/2}\cdot\frac{1}{2a} = \frac{2\sqrt a}{\sqrt\pi}` },
      { title: 'Отношение',
        text: String.raw`$\frac{1}{\langle v\rangle} = \frac{\sqrt{\pi a}}{2}$ (задача 10.21).`,
        tex: String.raw`k = \frac{\langle1/v\rangle}{1/\langle v\rangle} = \frac{2\sqrt a}{\sqrt\pi}\cdot\frac{2}{\sqrt{\pi a}} = \frac4\pi = 1{,}27` },
      { title: 'Вывод',
        text: '⟨1/v⟩ больше: медленные молекулы дают большой вклад в среднее от 1/v.' },
    ],
    answer: [String.raw`\langle1/v\rangle > 1/\langle v\rangle;\quad k = 4/\pi = 1{,}27`],
  },

  /* ===================== 10.24 ===================== */
  {
    id: '10.24', chapter: CH, section: S2, page: '160',
    title: 'Нормировка распределения в пучке',
    given: [[String.raw`f(v) = Cv^3e^{-mv^2/2kT}`, '']],
    find: String.raw`C \;—\; ?`,
    formulas: [GAUSS, { tex: String.raw`\int_0^\infty f(v)\,dv = 1`, text: 'условие нормировки' }],
    steps: [
      { title: 'Нормировка',
        text: String.raw`В условии множитель $v^3$ напечатан дважды — по смыслу один раз. $a = \frac{m}{2kT}$.`,
        tex: String.raw`C\int_0^\infty v^3e^{-av^2}dv = \frac{C}{2a^2} = 1` },
      { title: 'Ответ',
        tex: String.raw`C = 2a^2 = \frac{m^2}{2k^2T^2}` },
    ],
    answer: [String.raw`C = \frac{m^2}{2k^2T^2}`],
  },

  /* ===================== 10.25 ===================== */
  {
    id: '10.25', chapter: CH, section: S2, page: '160',
    title: 'Скорости в молекулярном пучке',
    given: [[String.raw`f(v) = \frac{m^2}{2k^2T^2}e^{-mv^2/2kT}v^3`, '']],
    find: String.raw`v_\text{в},\ \langle v\rangle \;—\; ?`,
    formulas: [GAUSS],
    steps: [
      { title: '1) Максимум',
        tex: String.raw`\frac{d}{dv}\left(v^3e^{-av^2}\right) = (3v^2 - 2av^4)e^{-av^2} = 0 \;\Rightarrow\; v_\text{в} = \sqrt{\frac{3}{2a}} = \sqrt{\frac{3kT}{m}}` },
      { title: '2) Средняя скорость',
        tex: String.raw`\langle v\rangle = 2a^2\int_0^\infty v^4e^{-av^2}dv = 2a^2\cdot\frac{3\sqrt\pi}{8a^{5/2}} = \frac{3}{4}\sqrt{\frac\pi a} = 3\sqrt{\frac{\pi kT}{8m}}` },
      { title: 'Сравнение',
        text: 'В пучке молекулы быстрее, чем в газе: быстрые чаще вылетают через отверстие.' },
    ],
    answer: [String.raw`v_\text{в} = \sqrt{3kT/m};\quad \langle v\rangle = 3\sqrt{\pi kT/(8m)}`],
  },

  /* ===================== 10.26 ===================== */
  {
    id: '10.26', chapter: CH, section: S2, page: '160',
    title: 'Медленные молекулы водорода',
    note: SMALL + String.raw`В книге $6{,}0\cdot10^9$; расчёт даёт $5{,}9\cdot10^9$.`,
    given: [[String.raw`V = 1\ \text{см}^3`, String.raw`10^{-6}\ \text{м}^3`], [String.raw`v_{\max} = 1\ \text{м/с}`, ''], [String.raw`\text{н. у.}`, '']],
    find: String.raw`N \;—\; ?`,
    formulas: [VB, MAXU],
    steps: [
      { title: 'Наиболее вероятная скорость',
        tex: String.raw`v_\text{в} = \sqrt{\frac{2\cdot8{,}31\cdot273}{0{,}002}} = 1506\ \text{м/с},\qquad u = \frac{1}{1506} = 6{,}64\cdot10^{-4}` },
      { title: 'Доля (задача 10.19)',
        tex: String.raw`w = \frac{4}{3\sqrt\pi}u^3 = 2{,}20\cdot10^{-10}` },
      { title: 'Число молекул',
        tex: String.raw`N = nVw = 2{,}69\cdot10^{25}\cdot10^{-6}\cdot2{,}20\cdot10^{-10} = 5{,}9\cdot10^9` },
    ],
    answer: [String.raw`N = 5{,}9\cdot10^9`],
  },

  /* ===================== 10.27 ===================== */
  {
    id: '10.27', chapter: CH, section: S2, page: '160',
    title: 'Наиболее вероятный импульс',
    given: [[String.raw`f(p)\ \text{— Максвелл}`, '']],
    find: String.raw`p_\text{в} \;—\; ?`,
    formulas: [FP],
    steps: [
      { title: 'Максимум f(p)',
        tex: String.raw`\frac{d}{dp}\left(p^2e^{-p^2/2mkT}\right) = 0 \;\Rightarrow\; p_\text{в} = \sqrt{2mkT}` },
      { title: 'Проверка',
        text: 'p_в = m·v_в — импульс при наиболее вероятной скорости.' },
    ],
    answer: [String.raw`p_\text{в} = \sqrt{2mkT}`],
  },

  /* ===================== 10.28 ===================== */
  {
    id: '10.28', chapter: CH, section: S2, page: '160',
    title: 'Импульс точно равен p_в',
    given: [[String.raw`p = p_\text{в}\ \text{точно}`, '']],
    find: String.raw`N \;—\; ?`,
    formulas: [{ tex: String.raw`dN = Nf(p)\,dp`, text: 'число молекул пропорционально ширине интервала dp' }],
    steps: [
      { title: 'Интервал нулевой ширины',
        text: 'Функция распределения даёт число молекул в интервале. «Точно равно» — интервал нулевой ширины, dp = 0, значит и молекул в нём нет.',
        tex: String.raw`N = Nf(p_\text{в})\cdot0 = 0` },
    ],
    answer: [String.raw`N = 0`],
  },

  /* ===================== 10.29 ===================== */
  {
    id: '10.29', chapter: CH, section: S2, page: '160',
    title: 'Среднее значение компоненты импульса',
    note: '<b>О смысле ответа книги.</b> ' + String.raw`Среднее значение $p_x$ по всем молекулам равно нулю: в стороны $+x$ и $-x$ летят одинаково. Ответ книги $\sqrt{mkT/(2\pi)}$ — это интеграл $\int_0^\infty p_xf(p_x)dp_x$ только по молекулам, летящим в сторону $+x$ (такая величина нужна, например, при расчёте давления на стенку). Среднее модуля $\langle|p_x|\rangle = \sqrt{2mkT/\pi}$ — вдвое больше.`,
    given: [[String.raw`\text{газ при температуре}\ T`, '']],
    find: String.raw`\langle p_x\rangle \;—\; ?`,
    formulas: [{ tex: String.raw`f(p_x) = \frac{1}{\sqrt{2\pi mkT}}e^{-p_x^2/2mkT}`, text: 'распределение одной компоненты импульса' }],
    steps: [
      { title: 'Распределение одной компоненты',
        text: 'Функция чётная, поэтому по всем молекулам ⟨pₓ⟩ = 0.' },
      { title: 'По молекулам, летящим в +x',
        tex: String.raw`\int_0^\infty p_xf(p_x)\,dp_x = \frac{1}{\sqrt{2\pi mkT}}\cdot mkT = \sqrt{\frac{mkT}{2\pi}}` },
      { title: 'Среднее модуля',
        tex: String.raw`\langle|p_x|\rangle = 2\sqrt{\frac{mkT}{2\pi}} = \sqrt{\frac{2mkT}{\pi}}` },
    ],
    answer: [String.raw`\langle p_x\rangle = 0;\quad \int_0^\infty p_xf\,dp_x = \sqrt{mkT/(2\pi)};\quad \langle|p_x|\rangle = \sqrt{2mkT/\pi}`],
  },

  /* ===================== 10.30 ===================== */
  {
    id: '10.30', chapter: CH, section: S2, page: '160',
    title: 'p_в при изменении T на 1 %',
    given: [[String.raw`\Delta T/T = 1\ \%`, '']],
    find: String.raw`\Delta p_\text{в}/p_\text{в} \;—\; ?`,
    formulas: [{ tex: String.raw`p_\text{в} = \sqrt{2mkT}`, text: 'наиболее вероятный импульс (задача 10.27)' }],
    steps: [
      { title: 'Корень от температуры',
        tex: String.raw`\frac{\Delta p_\text{в}}{p_\text{в}} = \frac12\frac{\Delta T}{T} = 0{,}5\ \%` },
    ],
    answer: [String.raw`0{,}5\ \%`],
  },

  /* ===================== 10.31 ===================== */
  {
    id: '10.31', chapter: CH, section: S2, page: '160',
    title: 'Импульс при наиболее вероятной энергии',
    note: MISMATCH + String.raw`В книге $p = \sqrt{2mkT}$ — это наиболее вероятный импульс $p_\text{в}$ (задача 10.27), ему соответствует энергия $kT$ (ответ книги к задаче 10.44). Наиболее вероятная энергия $\varepsilon_\text{в} = \frac12kT$ (задача 10.40), и импульс таких молекул $\sqrt{mkT}$.`,
    given: [[String.raw`\varepsilon = \varepsilon_\text{в} = \tfrac12kT`, '']],
    find: String.raw`p \;—\; ?`,
    formulas: [FE, { tex: String.raw`\varepsilon = \frac{p^2}{2m}`, text: 'связь энергии и импульса' }],
    steps: [
      { title: 'Наиболее вероятная энергия',
        text: 'Максимум f(ε) — при ε = kT/2 (задача 10.40).' },
      { title: 'Импульс',
        tex: String.raw`p = \sqrt{2m\varepsilon_\text{в}} = \sqrt{mkT}` },
    ],
    answer: [String.raw`p = \sqrt{mkT}`],
  },

  /* ===================== 10.32 ===================== */
  {
    id: '10.32', chapter: CH, section: S3, page: '160',
    title: 'Средняя кинетическая энергия',
    given: [[String.raw`f(\varepsilon)\ \text{— Максвелл}`, '']],
    find: String.raw`\langle\varepsilon\rangle \;—\; ?`,
    formulas: [FE, { tex: String.raw`\int_0^\infty x^{3/2}e^{-x}dx = \Gamma\left(\tfrac52\right) = \tfrac34\sqrt\pi`, text: 'гамма-функция' }],
    steps: [
      { title: 'Среднее',
        text: 'Обозначим x = ε/kT.',
        tex: String.raw`\langle\varepsilon\rangle = \int_0^\infty\varepsilon f(\varepsilon)\,d\varepsilon = \frac{2kT}{\sqrt\pi}\int_0^\infty x^{3/2}e^{-x}dx = \frac{2kT}{\sqrt\pi}\cdot\frac{3\sqrt\pi}{4} = \frac32kT` },
    ],
    answer: [String.raw`\langle\varepsilon\rangle = \tfrac32kT`],
  },

  /* ===================== 10.33 ===================== */
  {
    id: '10.33', chapter: CH, section: S3, page: '160',
    title: 'Распределение по относительным энергиям',
    given: [[String.raw`w = \varepsilon/\langle\varepsilon\rangle,\ \langle\varepsilon\rangle = \tfrac32kT`, '']],
    find: String.raw`dN(w) \;—\; ?`,
    formulas: [FE],
    steps: [
      { title: 'Замена переменной',
        text: String.raw`$\varepsilon = \frac32kTw$, $d\varepsilon = \frac32kT\,dw$.`,
        tex: String.raw`dN = N\frac{2}{\sqrt\pi}\frac{1}{(kT)^{3/2}}e^{-3w/2}\left(\frac32kTw\right)^{1/2}\frac32kT\,dw` },
      { title: 'Ответ',
        tex: String.raw`dN(w) = \frac{3^{3/2}N}{(2\pi)^{1/2}}e^{-3w/2}w^{1/2}\,dw` },
    ],
    answer: [String.raw`dN(w) = \frac{3^{3/2}N}{(2\pi)^{1/2}}e^{-3w/2}w^{1/2}dw`],
  },

  /* ===================== 10.34 ===================== */
  {
    id: '10.34', chapter: CH, section: S3, page: '161',
    title: 'Энергии около средней',
    given: [[String.raw`w = 1`, ''], [String.raw`\Delta w = 0{,}02`, '']],
    find: String.raw`\Delta N/N \;—\; ?`,
    formulas: [SMALLW],
    steps: [
      { title: 'По формуле задачи 10.33',
        tex: String.raw`\frac{\Delta N}{N} = \frac{3^{3/2}}{(2\pi)^{1/2}}e^{-1{,}5}\cdot1\cdot0{,}02 = 2{,}073\cdot0{,}2231\cdot0{,}02 = 9{,}3\cdot10^{-3}` },
    ],
    answer: [String.raw`9{,}3\cdot10^{-3}`],
  },

  /* ===================== 10.35 ===================== */
  {
    id: '10.35', chapter: CH, section: S3, page: '161',
    title: 'Доля молекул с малой энергией',
    given: [[String.raw`\varepsilon \ll kT`, '']],
    find: String.raw`w \;—\; ?`,
    formulas: [FE],
    steps: [
      { title: 'Экспонента ≈ 1',
        tex: String.raw`w = \int_0^\varepsilon f\,d\varepsilon \approx \frac{2}{\sqrt\pi(kT)^{3/2}}\int_0^\varepsilon\varepsilon^{1/2}d\varepsilon = \frac{4}{3\sqrt\pi}\left(\frac{\varepsilon}{kT}\right)^{3/2}` },
    ],
    answer: [String.raw`w = \frac{4}{3\sqrt\pi}\left(\frac{\varepsilon}{kT}\right)^{3/2}`],
  },

  /* ===================== 10.36 ===================== */
  {
    id: '10.36', chapter: CH, section: S3, page: '161',
    title: 'Энергии до 0,01 kT',
    given: [[String.raw`\varepsilon_2 = 0{,}01kT`, '']],
    find: String.raw`w \;—\; ?`,
    formulas: [FE],
    steps: [
      { title: 'Формула задачи 10.35',
        text: 'В книге 7,53·10⁻⁴ — отличие в последней цифре.',
        tex: String.raw`w = \frac{4}{3\sqrt\pi}(0{,}01)^{3/2} = 0{,}752\cdot10^{-3} = 7{,}52\cdot10^{-4}` },
    ],
    answer: [String.raw`w = 7{,}52\cdot10^{-4}`],
  },

  /* ===================== 10.37 ===================== */
  {
    id: '10.37', chapter: CH, section: S3, page: '161',
    title: 'Граница для 0,1 % молекул',
    given: [[String.raw`w = 10^{-3}`, '']],
    find: String.raw`\varepsilon/kT \;—\; ?`,
    formulas: [FE],
    steps: [
      { title: 'Обращаем формулу 10.35',
        tex: String.raw`\frac{\varepsilon}{kT} = \left(\frac{3\sqrt\pi}{4}w\right)^{2/3} = \left(1{,}329\cdot10^{-3}\right)^{2/3} = 1{,}21\cdot10^{-2}` },
    ],
    answer: [String.raw`\varepsilon = 1{,}21\cdot10^{-2}\,kT`],
  },

  /* ===================== 10.38 ===================== */
  {
    id: '10.38', chapter: CH, section: S3, page: '161',
    title: 'Доля очень быстрых молекул',
    given: [[String.raw`\varepsilon_0 \gg kT`, '']],
    find: String.raw`w \;—\; ?`,
    formulas: [FE],
    steps: [
      { title: 'Хвост распределения',
        text: String.raw`Интегрируем от $\varepsilon_0$ до ∞ по частям; при $x_0 = \varepsilon_0/kT \gg 1$ главный член:`,
        tex: String.raw`w = \frac{2}{\sqrt\pi}\int_{x_0}^\infty x^{1/2}e^{-x}dx \approx \frac{2}{\sqrt\pi}x_0^{1/2}e^{-x_0}` },
    ],
    answer: [String.raw`w = \frac{2}{\sqrt\pi}\left(\frac{\varepsilon_0}{kT}\right)^{1/2}e^{-\varepsilon_0/kT}`],
  },

  /* ===================== 10.39 ===================== */
  {
    id: '10.39', chapter: CH, section: S3, page: '161',
    title: 'Порог для 10⁻⁴ молекул',
    given: [[String.raw`w = 10^{-4}`, '']],
    find: String.raw`\varepsilon_1/kT \;—\; ?`,
    formulas: [FE],
    steps: [
      { title: 'Трансцендентное уравнение',
        text: 'По формуле задачи 10.38 (в условии напечатано «ε ≫ mkT» — по смыслу ε ≫ kT):',
        tex: String.raw`\frac{2}{\sqrt\pi}\sqrt xe^{-x} = 10^{-4}` },
      { title: 'Решение подбором',
        text: 'x = 10: 1,62·10⁻⁴; x = 10,5: 1,01·10⁻⁴; x = 11: 0,62·10⁻⁴. Корень около 10,5 (точный хвост распределения даёт 10,55).',
        tex: String.raw`\varepsilon_1 \approx 10{,}5\,kT` },
    ],
    answer: [String.raw`\varepsilon_1 = 10{,}5\,kT`],
  },

  /* ===================== 10.40 ===================== */
  {
    id: '10.40', chapter: CH, section: S3, page: '161',
    title: 'Наиболее вероятная энергия',
    given: [[String.raw`f(\varepsilon)\ \text{— Максвелл}`, '']],
    find: String.raw`\varepsilon_\text{в} \;—\; ?`,
    formulas: [FE],
    steps: [
      { title: 'Максимум',
        tex: String.raw`\frac{d}{d\varepsilon}\left(\varepsilon^{1/2}e^{-\varepsilon/kT}\right) = \left(\frac{1}{2\varepsilon^{1/2}} - \frac{\varepsilon^{1/2}}{kT}\right)e^{-\varepsilon/kT} = 0 \;\Rightarrow\; \varepsilon_\text{в} = \frac12kT` },
      { title: 'Заметим',
        text: 'Это не равно энергии молекулы с наиболее вероятной скоростью (mv_в²/2 = kT): максимумы разных функций распределения не соответствуют друг другу.' },
    ],
    answer: [String.raw`\varepsilon_\text{в} = \tfrac12kT`],
  },

  /* ===================== 10.41 ===================== */
  {
    id: '10.41', chapter: CH, section: S3, page: '161',
    title: 'Распределение по θ = ε/ε_в',
    note: TYPO + String.raw`В книге коэффициент $\frac{1}{2\pi^{1/2}}$ — с ним интеграл от функции по всем $\theta$ равен 0,71, а не 1. Правильно $\frac{1}{(2\pi)^{1/2}}$ (видимо, при наборе потеряны скобки). Задача 10.42 в книге посчитана уже с верным коэффициентом.`,
    given: [[String.raw`\theta = \varepsilon/\varepsilon_\text{в},\ \varepsilon_\text{в} = \tfrac12kT`, '']],
    find: String.raw`f(\theta) \;—\; ?`,
    formulas: [FE],
    steps: [
      { title: 'Замена переменной',
        text: String.raw`$\varepsilon = \frac{kT}{2}\theta$, $d\varepsilon = \frac{kT}{2}d\theta$.`,
        tex: String.raw`f(\theta)d\theta = \frac{2}{\sqrt\pi}\frac{1}{(kT)^{3/2}}e^{-\theta/2}\left(\frac{kT\theta}{2}\right)^{1/2}\frac{kT}{2}d\theta = \frac{2}{\sqrt\pi}\cdot\frac{1}{2^{3/2}}e^{-\theta/2}\theta^{1/2}d\theta` },
      { title: 'Ответ',
        tex: String.raw`f(\theta)\,d\theta = \frac{1}{(2\pi)^{1/2}}e^{-\theta/2}\theta^{1/2}\,d\theta` },
    ],
    answer: [String.raw`f(\theta)\,d\theta = \frac{1}{\sqrt{2\pi}}e^{-\theta/2}\theta^{1/2}d\theta`],
  },

  /* ===================== 10.42 ===================== */
  {
    id: '10.42', chapter: CH, section: S3, page: '161',
    title: 'Энергии около наиболее вероятной',
    given: [[String.raw`\theta = 1`, ''], [String.raw`\Delta\theta = 0{,}02`, '']],
    find: String.raw`w \;—\; ?`,
    formulas: [SMALLW],
    steps: [
      { title: 'По формуле задачи 10.41',
        tex: String.raw`w = \frac{1}{\sqrt{2\pi}}e^{-0{,}5}\cdot1\cdot0{,}02 = 0{,}3989\cdot0{,}6065\cdot0{,}02 = 4{,}84\cdot10^{-3}` },
    ],
    answer: [String.raw`w = 4{,}84\cdot10^{-3}`],
  },

  /* ===================== 10.43 ===================== */
  {
    id: '10.43', chapter: CH, section: S3, page: '161',
    title: 'Энергии до 0,01 ε_в',
    given: [[String.raw`\varepsilon = 0{,}01\varepsilon_\text{в} = 0{,}005kT`, '']],
    find: String.raw`w \;—\; ?`,
    formulas: [FE],
    steps: [
      { title: 'Формула задачи 10.35',
        text: 'В книге 2,67·10⁻⁴ — отличие в последней цифре.',
        tex: String.raw`w = \frac{4}{3\sqrt\pi}(0{,}005)^{3/2} = 0{,}752\cdot3{,}54\cdot10^{-4} = 2{,}66\cdot10^{-4}` },
    ],
    answer: [String.raw`w = 2{,}66\cdot10^{-4}`],
  },

  /* ===================== 10.44 ===================== */
  {
    id: '10.44', chapter: CH, section: S3, page: '161',
    title: 'Энергия при наиболее вероятном импульсе',
    given: [[String.raw`p = p_\text{в} = \sqrt{2mkT}`, '']],
    find: String.raw`\varepsilon \;—\; ?`,
    formulas: [{ tex: String.raw`\varepsilon = \frac{p^2}{2m}`, text: 'связь энергии и импульса' }],
    steps: [
      { title: 'Подставляем',
        tex: String.raw`\varepsilon = \frac{2mkT}{2m} = kT` },
    ],
    answer: [String.raw`\varepsilon = kT`],
  },

  /* ===================== 10.45 ===================== */
  {
    id: '10.45', chapter: CH, section: S3, page: '161',
    title: 'Максимум f(ε) при удвоении T',
    given: [[String.raw`T_2 = 2T_1`, '']],
    find: String.raw`f_{\max2}/f_{\max1} \;—\; ?`,
    formulas: [FE],
    figure: () => FIG.graph({ w: 320, h: 180, x: [0, 5], y: [0, 0.55], xt: [0.5, 1, 2, 3, 4], yt: [0.24, 0.48], xl: 'ε / kT₁', yl: 'f · kT₁',
      s: [{ f: x => 2 / sq(PI) * ex(-x) * sq(x), t: [0, 4.8], label: [0.75, 0.52, 'T₁'] },
          { f: x => 2 / sq(PI) / 2 ** 1.5 * ex(-x / 2) * sq(x), t: [0, 4.8], blue: true, label: [2.1, 0.31, '2T₁'] }],
      guides: [[0.5, 0.484], [1, 0.242]] }),
    figCaption: 'При удвоении температуры максимум сдвигается вдвое правее и становится вдвое ниже; площадь под кривыми одинакова (= 1)',
    steps: [
      { title: 'Значение в максимуме',
        text: 'Максимум при ε = kT/2 (задача 10.40):',
        tex: String.raw`f_{\max} = \frac{2}{\sqrt\pi}\frac{1}{(kT)^{3/2}}e^{-1/2}\left(\frac{kT}{2}\right)^{1/2} = \frac{\sqrt2}{\sqrt{\pi e}}\cdot\frac{1}{kT}` },
      { title: 'Вывод',
        text: 'f_max обратно пропорционально T: при удвоении температуры максимум уменьшится в 2 раза. Площадь под кривой всегда 1, поэтому кривая расплывается вправо.' },
    ],
    answer: [String.raw`\text{уменьшится в 2 раза}`],
  },

  /* ===================== 10.46 ===================== */
  {
    id: '10.46', chapter: CH, section: S3, page: '161',
    title: 'Средняя и наиболее вероятная энергии',
    given: [[String.raw`\langle\varepsilon\rangle = \tfrac32kT,\ \varepsilon_\text{в} = \tfrac12kT`, '']],
    find: String.raw`\langle\varepsilon\rangle/\varepsilon_\text{в} \;—\; ?`,
    formulas: [FE],
    steps: [
      { title: 'Задачи 10.32 и 10.40',
        tex: String.raw`\frac{\langle\varepsilon\rangle}{\varepsilon_\text{в}} = \frac{3/2}{1/2} = 3` },
    ],
    answer: [String.raw`\text{в 3 раза}`],
  },

  /* ===================== 10.47 ===================== */
  {
    id: '10.47', chapter: CH, section: S4, page: '162',
    title: 'Длина пробега молекул водорода',
    given: [[String.raw`p = 0{,}1\ \text{Па}`, ''], [String.raw`T = 100\ \text{К}`, ''], [String.raw`d = 0{,}28\ \text{нм}`, String.raw`2{,}8\cdot10^{-10}\ \text{м}`]],
    find: String.raw`\langle l\rangle \;—\; ?`,
    formulas: [LFREE],
    steps: [
      { title: 'Длина свободного пробега',
        tex: String.raw`\langle l\rangle = \frac{kT}{\sqrt2\pi d^2p} = \frac{1{,}38\cdot10^{-23}\cdot100}{1{,}414\cdot3{,}14\cdot7{,}84\cdot10^{-20}\cdot0{,}1} = 3{,}96\cdot10^{-2}\ \text{м}` },
    ],
    answer: [String.raw`\langle l\rangle = 3{,}96\ \text{см}`],
  },

  /* ===================== 10.48 ===================== */
  {
    id: '10.48', chapter: CH, section: S4, page: '162',
    title: 'Давление при пробеге 1 м',
    given: [[String.raw`\langle l\rangle = 1\ \text{м}`, ''], [String.raw`T = 300\ \text{К}`, ''], [String.raw`d = 0{,}38\ \text{нм}`, '']],
    find: String.raw`p \;—\; ?`,
    formulas: [LFREE],
    steps: [
      { title: 'Давление',
        tex: String.raw`p = \frac{kT}{\sqrt2\pi d^2\langle l\rangle} = \frac{4{,}14\cdot10^{-21}}{4{,}443\cdot1{,}444\cdot10^{-19}} = 6{,}45\cdot10^{-3}\ \text{Па}` },
    ],
    answer: [String.raw`p = 6{,}45\ \text{мПа}`],
  },

  /* ===================== 10.49 ===================== */
  {
    id: '10.49', chapter: CH, section: S4, page: '162',
    title: 'Пробег в баллоне с водородом',
    given: [[String.raw`V = 10\ \text{л}`, String.raw`10^{-2}\ \text{м}^3`], [String.raw`m = 1\ \text{г}`, String.raw`10^{-3}\ \text{кг}`], [String.raw`d = 0{,}28\ \text{нм}`, '']],
    find: String.raw`\langle l\rangle \;—\; ?`,
    formulas: [LFREE],
    steps: [
      { title: 'Концентрация',
        tex: String.raw`n = \frac{m}{M}\frac{N_\text{A}}{V} = \frac{0{,}5\cdot6{,}02\cdot10^{23}}{0{,}01} = 3{,}01\cdot10^{25}\ \text{м}^{-3}` },
      { title: 'Длина пробега',
        text: 'Температура не нужна — при постоянной концентрации пробег от неё не зависит.',
        tex: String.raw`\langle l\rangle = \frac{1}{\sqrt2\pi d^2n} = 9{,}54\cdot10^{-8}\ \text{м} = 95{,}4\ \text{нм}` },
    ],
    answer: [String.raw`\langle l\rangle = 95{,}4\ \text{нм}`],
  },

  /* ===================== 10.50 ===================== */
  {
    id: '10.50', chapter: CH, section: S4, page: '162',
    title: 'Высокий ли вакуум',
    given: [[String.raw`p = 100\ \text{мкПа}`, String.raw`10^{-4}\ \text{Па}`], [String.raw`d_\text{колбы} = 20\ \text{см}`, ''], [String.raw`T = 280\ \text{К}`, '']],
    find: String.raw`\langle l\rangle \;—\; ?`,
    formulas: [LFREE],
    steps: [
      { title: 'Длина пробега молекул азота',
        tex: String.raw`\langle l\rangle = \frac{kT}{\sqrt2\pi d^2p} = \frac{1{,}38\cdot10^{-23}\cdot280}{4{,}443\cdot1{,}444\cdot10^{-19}\cdot10^{-4}} = 60\ \text{м}` },
      { title: 'Вывод',
        text: 'Вакуум высокий, если молекулы летают от стенки до стенки без столкновений: 60 м ≫ 0,2 м — да.' },
    ],
    answer: [String.raw`\text{можно:}\ \langle l\rangle = 60\ \text{м} \gg 20\ \text{см}`],
  },

  /* ===================== 10.51 ===================== */
  {
    id: '10.51', chapter: CH, section: S4, page: '162',
    title: 'Плотность разреженного водорода',
    given: [[String.raw`\langle l\rangle = 1\ \text{см}`, String.raw`10^{-2}\ \text{м}`], [String.raw`d = 0{,}28\ \text{нм}`, '']],
    find: String.raw`\rho \;—\; ?`,
    formulas: [LFREE],
    steps: [
      { title: 'Концентрация',
        tex: String.raw`n = \frac{1}{\sqrt2\pi d^2\langle l\rangle} = 2{,}87\cdot10^{20}\ \text{м}^{-3}` },
      { title: 'Плотность',
        tex: String.raw`\rho = n\frac{M}{N_\text{A}} = 2{,}87\cdot10^{20}\cdot\frac{0{,}002}{6{,}02\cdot10^{23}} = 9{,}54\cdot10^{-7}\ \text{кг/м}^3` },
    ],
    answer: [String.raw`\rho = 0{,}954\ \text{мг/м}^3`],
  },

  /* ===================== 10.52 ===================== */
  {
    id: '10.52', chapter: CH, section: S4, page: '162',
    title: 'Столкновения молекулы кислорода за 1 с',
    note: MISMATCH + String.raw`В книге $3{,}7\cdot10^9$ с⁻¹ — так выходит с эффективным диаметром молекулы кислорода 0,27 нм. В табл. 12 этой книги $d = 0{,}36$ нм, и тогда $\langle z\rangle = 6{,}6\cdot10^9$ с⁻¹ (при этом задача 10.55 для кислорода в книге посчитана с 0,36 нм).`,
    given: [[String.raw`\text{н. у.}`, ''], [String.raw`d = 0{,}36\ \text{нм}`, ''], [String.raw`M = 32\cdot10^{-3}\ \text{кг/моль}`, '']],
    find: String.raw`\langle z\rangle \;—\; ?`,
    formulas: [ZCOL, VAVG],
    steps: [
      { title: 'Концентрация и средняя скорость',
        tex: String.raw`n = \frac{p_0}{kT_0} = 2{,}69\cdot10^{25}\ \text{м}^{-3},\qquad \langle v\rangle = \sqrt{\frac{8\cdot8{,}31\cdot273}{3{,}14\cdot0{,}032}} = 425\ \text{м/с}` },
      { title: 'Число столкновений',
        tex: String.raw`\langle z\rangle = \sqrt2\pi d^2n\langle v\rangle = 4{,}443\cdot1{,}296\cdot10^{-19}\cdot2{,}69\cdot10^{25}\cdot425 = 6{,}6\cdot10^9\ \text{с}^{-1}` },
    ],
    answer: [String.raw`\langle z\rangle = 6{,}6\cdot10^9\ \text{с}^{-1}`],
  },

  /* ===================== 10.53 ===================== */
  {
    id: '10.53', chapter: CH, section: S4, page: '162',
    title: 'Все соударения в 1 мм³ водорода',
    note: MISMATCH + String.raw`В книге $1{,}57\cdot10^{21}$. Каждая из $2{,}7\cdot10^{16}$ молекул сталкивается $1{,}6\cdot10^{10}$ раз в секунду, и число соударений $\frac12\langle z\rangle N = 2{,}1\cdot10^{26}$. Ответ книги, видимо, ошибочен (на 5 порядков меньше).`,
    given: [[String.raw`V = 1\ \text{мм}^3`, String.raw`10^{-9}\ \text{м}^3`], [String.raw`t = 1\ \text{с}`, ''], [String.raw`\text{н. у.},\ d = 0{,}28\ \text{нм}`, '']],
    find: String.raw`N \;—\; ?`,
    formulas: [ZCOL, VAVG],
    steps: [
      { title: 'Столкновения одной молекулы',
        tex: String.raw`\langle v\rangle = 1700\ \text{м/с},\qquad \langle z\rangle = \sqrt2\pi d^2n\langle v\rangle = 1{,}59\cdot10^{10}\ \text{с}^{-1}` },
      { title: 'Все соударения',
        text: 'В каждом соударении участвуют две молекулы — делим на 2.',
        tex: String.raw`N = \frac12\langle z\rangle nVt = \frac12\cdot1{,}59\cdot10^{10}\cdot2{,}69\cdot10^{16} = 2{,}1\cdot10^{26}` },
    ],
    answer: [String.raw`N = 2{,}1\cdot10^{26}`],
  },

  /* ===================== 10.54 ===================== */
  {
    id: '10.54', chapter: CH, section: S4, page: '162',
    title: 'Удары атомов неона о катод',
    given: [[String.raw`T = 300\ \text{К}`, ''], [String.raw`p = 1\ \text{Па}`, ''], [String.raw`S = 1\ \text{см}^2`, String.raw`10^{-4}\ \text{м}^2`], [String.raw`\Delta t = 1\ \text{с}`, '']],
    find: String.raw`N \;—\; ?`,
    formulas: [VAVG, { tex: String.raw`N = \frac14n\langle v\rangle S\Delta t`, text: 'число ударов молекул о стенку' }],
    steps: [
      { title: 'Концентрация и скорость',
        tex: String.raw`n = \frac{p}{kT} = 2{,}42\cdot10^{20}\ \text{м}^{-3},\qquad \langle v\rangle = \sqrt{\frac{8\cdot8{,}31\cdot300}{3{,}14\cdot0{,}0202}} = 561\ \text{м/с}` },
      { title: 'Число ударов',
        tex: String.raw`N = \frac14\cdot2{,}42\cdot10^{20}\cdot561\cdot10^{-4} = 3{,}39\cdot10^{18}` },
    ],
    answer: [String.raw`N = 3{,}39\cdot10^{18}`],
  },

  /* ===================== 10.55 ===================== */
  {
    id: '10.55', chapter: CH, section: S4, page: '162',
    title: 'Время свободного пробега',
    given: [[String.raw`T = 250\ \text{К}`, ''], [String.raw`p = 100\ \text{Па}`, ''], [String.raw`d = 0{,}36\ \text{нм}`, '']],
    find: String.raw`\langle\tau\rangle \;—\; ?`,
    formulas: [LFREE, VAVG],
    steps: [
      { title: 'Длина пробега и скорость',
        tex: String.raw`\langle l\rangle = \frac{kT}{\sqrt2\pi d^2p} = 59{,}9\ \text{мкм},\qquad \langle v\rangle = 407\ \text{м/с}` },
      { title: 'Время',
        tex: String.raw`\langle\tau\rangle = \frac{\langle l\rangle}{\langle v\rangle} = 1{,}47\cdot10^{-7}\ \text{с} = 147\ \text{нс}` },
    ],
    answer: [String.raw`\langle\tau\rangle = 147\ \text{нс}`],
  },

  /* ===================== 10.56 ===================== */
  {
    id: '10.56', chapter: CH, section: S4, page: '162',
    title: '⟨l⟩ от давления',
    given: [[String.raw`1)\ V = \text{const};\ 2)\ T = \text{const}`, '']],
    find: String.raw`\langle l\rangle(p) \;—\; ?`,
    formulas: [LFREE],
    figure: dep('p', '⟨l⟩', [{ f: () => 0.6, label: [1.0, 0.68, '1'] }, { f: x => 0.18 / x, t: [0.15, 1.25], blue: true, label: [0.3, 1.0, '2'] }]),
    figCaption: '1 — изохорный процесс (прямая), 2 — изотермический (гипербола)',
    steps: [
      { title: '1) Изохорный',
        text: 'Число молекул в сосуде и его объём неизменны — концентрация n постоянна, ⟨l⟩ = 1/(√2πd²n) не зависит от давления.' },
      { title: '2) Изотермический',
        tex: String.raw`n = \frac{p}{kT} \sim p \;\Rightarrow\; \langle l\rangle \sim \frac1p` },
    ],
    answer: [String.raw`1)\ \text{не зависит};\quad 2)\ \langle l\rangle \sim 1/p`],
  },

  /* ===================== 10.57 ===================== */
  {
    id: '10.57', chapter: CH, section: S4, page: '162',
    title: '⟨l⟩ от температуры',
    given: [[String.raw`1)\ V = \text{const};\ 2)\ p = \text{const}`, '']],
    find: String.raw`\langle l\rangle(T) \;—\; ?`,
    formulas: [LFREE],
    figure: dep('T', '⟨l⟩', [{ f: () => 0.5, label: [1.0, 0.58, '1'] }, { f: x => 0.85 * x, blue: true, label: [1.0, 1.0, '2'] }]),
    figCaption: '1 — изохорный процесс, 2 — изобарный',
    steps: [
      { title: '1) Изохорный',
        text: 'n постоянна — ⟨l⟩ не зависит от T.' },
      { title: '2) Изобарный',
        tex: String.raw`n = \frac{p}{kT} \sim \frac1T \;\Rightarrow\; \langle l\rangle \sim T` },
    ],
    answer: [String.raw`1)\ \text{не зависит};\quad 2)\ \langle l\rangle \sim T`],
  },

  /* ===================== 10.58 ===================== */
  {
    id: '10.58', chapter: CH, section: S4, page: '162',
    title: '⟨z⟩ от давления',
    given: [[String.raw`1)\ V = \text{const};\ 2)\ T = \text{const}`, '']],
    find: String.raw`\langle z\rangle(p) \;—\; ?`,
    formulas: [ZCOL, VAVG],
    figure: dep('p', '⟨z⟩', [{ f: x => 0.85 * sq(x), label: [0.25, 0.65, '1'] }, { f: x => 0.85 * x, blue: true, label: [1.1, 0.8, '2'] }]),
    figCaption: '1 — изохорный процесс (парабола на боку), 2 — изотермический (прямая)',
    steps: [
      { title: '1) Изохорный',
        text: 'n постоянна, T ∼ p, а ⟨v⟩ ∼ √T:',
        tex: String.raw`\langle z\rangle \sim \langle v\rangle \sim \sqrt T \sim \sqrt p` },
      { title: '2) Изотермический',
        text: '⟨v⟩ постоянна, n ∼ p:',
        tex: String.raw`\langle z\rangle \sim n \sim p` },
    ],
    answer: [String.raw`1)\ \langle z\rangle \sim \sqrt p;\quad 2)\ \langle z\rangle \sim p`],
  },

  /* ===================== 10.59 ===================== */
  {
    id: '10.59', chapter: CH, section: S4, page: '162',
    title: '⟨z⟩ от температуры',
    given: [[String.raw`1)\ V = \text{const};\ 2)\ p = \text{const}`, '']],
    find: String.raw`\langle z\rangle(T) \;—\; ?`,
    formulas: [ZCOL, VAVG],
    figure: dep('T', '⟨z⟩', [{ f: x => 0.85 * sq(x), label: [1.05, 1.0, '1'] }, { f: x => 0.3 / sq(x), t: [0.07, 1.25], blue: true, label: [0.35, 0.65, '2'] }]),
    figCaption: '1 — изохорный процесс, 2 — изобарный',
    steps: [
      { title: '1) Изохорный',
        text: 'n постоянна:',
        tex: String.raw`\langle z\rangle \sim \langle v\rangle \sim \sqrt T` },
      { title: '2) Изобарный',
        text: 'n ∼ 1/T:',
        tex: String.raw`\langle z\rangle \sim \frac{\sqrt T}{T} = \frac{1}{\sqrt T}` },
    ],
    answer: [String.raw`1)\ \langle z\rangle \sim \sqrt T;\quad 2)\ \langle z\rangle \sim 1/\sqrt T`],
  },

  /* ===================== 10.60 ===================== */
  {
    id: '10.60', chapter: CH, section: S5, page: '163',
    title: 'Коэффициент диффузии гелия',
    given: [[String.raw`\langle l\rangle = 180\ \text{нм}`, String.raw`1{,}8\cdot10^{-7}\ \text{м}`], [String.raw`\text{н. у.},\ M = 4\cdot10^{-3}\ \text{кг/моль}`, '']],
    find: String.raw`D \;—\; ?`,
    formulas: [DIFF, VAVG],
    steps: [
      { title: 'Средняя скорость',
        tex: String.raw`\langle v\rangle = \sqrt{\frac{8\cdot8{,}31\cdot273}{3{,}14\cdot0{,}004}} = 1202\ \text{м/с}` },
      { title: 'Коэффициент диффузии',
        text: 'В книге 7,23·10⁻⁵ — отличие в последней цифре.',
        tex: String.raw`D = \frac13\cdot1202\cdot1{,}8\cdot10^{-7} = 7{,}21\cdot10^{-5}\ \text{м}^2\text{/с}` },
    ],
    answer: [String.raw`D = 7{,}21\cdot10^{-5}\ \text{м}^2\text{/с}`],
  },

  /* ===================== 10.61 ===================== */
  {
    id: '10.61', chapter: CH, section: S5, page: '163',
    title: 'Длина пробега кислорода по D',
    given: [[String.raw`D = 0{,}19\ \text{см}^2\text{/с}`, String.raw`1{,}9\cdot10^{-5}\ \text{м}^2\text{/с}`], [String.raw`T = 273\ \text{К}`, '']],
    find: String.raw`\langle l\rangle \;—\; ?`,
    formulas: [DIFF, VAVG],
    steps: [
      { title: 'Длина пробега',
        text: '⟨v⟩ = 425 м/с. В книге 135 нм — отличие в последней цифре.',
        tex: String.raw`\langle l\rangle = \frac{3D}{\langle v\rangle} = \frac{3\cdot1{,}9\cdot10^{-5}}{425} = 1{,}34\cdot10^{-7}\ \text{м} = 134\ \text{нм}` },
    ],
    answer: [String.raw`\langle l\rangle = 134\ \text{нм}`],
  },

  /* ===================== 10.62 ===================== */
  {
    id: '10.62', chapter: CH, section: S5, page: '163',
    title: 'Коэффициент диффузии азота',
    note: MISMATCH + String.raw`В книге 1) $90\cdot10^{-5}$ м²/с; 2) 0,061 м²/с. С диаметром из табл. 12 ($d = 0{,}38$ нм) получается 1) $0{,}88\cdot10^{-5}$ м²/с — в сто раз меньше (видимо, в книге потеряна запятая: «0,90·10⁻⁵»); 2) 0,010 м²/с — это просто первый ответ, пересчитанный на другие $p$ и $T$ ($D \sim T^{3/2}/p$, задачи 10.64–10.65). Число 0,061 с первым ответом не согласуется.`,
    given: [[String.raw`1)\ \text{н. у.}`, ''], [String.raw`2)\ p = 100\ \text{Па},\ T = 300\ \text{К}`, ''], [String.raw`d = 0{,}38\ \text{нм},\ M = 28\cdot10^{-3}\ \text{кг/моль}`, '']],
    find: String.raw`D \;—\; ?`,
    formulas: [DIFF, LFREE, VAVG],
    steps: [
      { title: '1) Нормальные условия',
        tex: String.raw`\langle v\rangle = 454\ \text{м/с},\quad \langle l\rangle = \frac{1}{\sqrt2\pi d^2n} = 58\ \text{нм},\quad D_1 = \frac13\cdot454\cdot5{,}8\cdot10^{-8} = 8{,}8\cdot10^{-6}\ \text{м}^2\text{/с}` },
      { title: '2) p = 100 Па, T = 300 К',
        text: 'Газ разрежён в тысячу раз — пробег в тысячу раз длиннее.',
        tex: String.raw`\langle v\rangle = 476\ \text{м/с},\quad \langle l\rangle = 64{,}5\ \text{мкм},\quad D_2 = \frac13\cdot476\cdot6{,}45\cdot10^{-5} = 0{,}010\ \text{м}^2\text{/с}` },
    ],
    answer: [String.raw`1)\ D = 8{,}8\cdot10^{-6}\ \text{м}^2\text{/с};\quad 2)\ D = 0{,}010\ \text{м}^2\text{/с}`],
  },

  /* ===================== 10.63 ===================== */
  {
    id: '10.63', chapter: CH, section: S5, page: '163',
    title: 'Диффузия водорода и кислорода',
    given: [[String.raw`d_1 = 0{,}28\ \text{нм},\ M_1 = 2\ \text{г/моль}`, ''], [String.raw`d_2 = 0{,}36\ \text{нм},\ M_2 = 32\ \text{г/моль}`, '']],
    find: String.raw`D_1/D_2 \;—\; ?`,
    formulas: [DIFF, LFREE, VAVG],
    steps: [
      { title: 'От чего зависит D',
        text: 'При одинаковых p и T концентрации равны: ⟨l⟩ ∼ 1/d², ⟨v⟩ ∼ 1/√M.',
        tex: String.raw`\frac{D_1}{D_2} = \sqrt{\frac{M_2}{M_1}}\left(\frac{d_2}{d_1}\right)^2 = 4\cdot\left(\frac{0{,}36}{0{,}28}\right)^2 = 6{,}61` },
    ],
    answer: [String.raw`D_1/D_2 = 6{,}61`],
  },

  /* ===================== 10.64 ===================== */
  {
    id: '10.64', chapter: CH, section: S5, page: '163',
    title: 'D от температуры',
    given: [[String.raw`1)\ p = \text{const};\ 2)\ V = \text{const}`, '']],
    find: String.raw`D(T) \;—\; ?`,
    formulas: [DIFF, LFREE],
    figure: dep('T', 'D', [{ f: x => 0.65 * x ** 1.5, label: [1.12, 1.05, '1'] }, { f: x => 0.75 * sq(x), blue: true, label: [1.15, 0.7, '2'] }]),
    figCaption: '1 — изобарный процесс, 2 — изохорный',
    steps: [
      { title: '1) Изобарный',
        text: '⟨v⟩ ∼ √T, ⟨l⟩ ∼ T (задача 10.57).',
        tex: String.raw`D \sim \sqrt T\cdot T = T^{3/2}` },
      { title: '2) Изохорный',
        text: '⟨l⟩ постоянна.',
        tex: String.raw`D \sim \sqrt T` },
    ],
    answer: [String.raw`1)\ D \sim T^{3/2};\quad 2)\ D \sim \sqrt T`],
  },

  /* ===================== 10.65 ===================== */
  {
    id: '10.65', chapter: CH, section: S5, page: '163',
    title: 'D от давления',
    given: [[String.raw`1)\ T = \text{const};\ 2)\ V = \text{const}`, '']],
    find: String.raw`D(p) \;—\; ?`,
    formulas: [DIFF, LFREE],
    figure: dep('p', 'D', [{ f: x => 0.18 / x, t: [0.15, 1.25], label: [0.3, 1.0, '1'] }, { f: x => 0.85 * sq(x), blue: true, label: [1.05, 1.0, '2'] }]),
    figCaption: '1 — изотермический процесс, 2 — изохорный',
    steps: [
      { title: '1) Изотермический',
        tex: String.raw`\langle v\rangle = \text{const},\ \langle l\rangle \sim \frac1p \;\Rightarrow\; D \sim \frac1p` },
      { title: '2) Изохорный',
        tex: String.raw`\langle l\rangle = \text{const},\ \langle v\rangle \sim \sqrt T \sim \sqrt p \;\Rightarrow\; D \sim \sqrt p` },
    ],
    answer: [String.raw`1)\ D \sim 1/p;\quad 2)\ D \sim \sqrt p`],
  },

  /* ===================== 10.66 ===================== */
  {
    id: '10.66', chapter: CH, section: S5, page: '163',
    title: 'Вязкость кислорода',
    note: MISMATCH + String.raw`В книге 18 мкПа·с. По формуле $\eta = \frac13\rho\langle v\rangle\langle l\rangle$ с диаметром $d = 0{,}36$ нм из табл. 12 выходит 13 мкПа·с. Опытное значение (та же табл. 12) — 19,8 мкПа·с: простая кинетическая теория вязкость занижает. Как получено число 18 — неясно (нужен $d \approx 0{,}31$ нм).`,
    given: [[String.raw`\text{н. у.}`, ''], [String.raw`d = 0{,}36\ \text{нм},\ M = 32\cdot10^{-3}\ \text{кг/моль}`, '']],
    find: String.raw`\eta \;—\; ?`,
    formulas: [VISC, LFREE, VAVG],
    steps: [
      { title: 'Произведение ρ⟨l⟩ не зависит от давления',
        tex: String.raw`\rho\langle l\rangle = mn\cdot\frac{1}{\sqrt2\pi d^2n} = \frac{m}{\sqrt2\pi d^2},\qquad m = \frac{M}{N_\text{A}} = 5{,}32\cdot10^{-26}\ \text{кг}` },
      { title: 'Вязкость',
        tex: String.raw`\eta = \frac{m\langle v\rangle}{3\sqrt2\pi d^2} = \frac{5{,}32\cdot10^{-26}\cdot425}{3\cdot4{,}443\cdot1{,}296\cdot10^{-19}} = 1{,}3\cdot10^{-5}\ \text{Па·с}` },
    ],
    answer: [String.raw`\eta \approx 13\ \text{мкПа·с}`],
  },

  /* ===================== 10.67 ===================== */
  {
    id: '10.67', chapter: CH, section: S5, page: '163',
    title: 'Пробег азота по вязкости',
    note: TYPO + String.raw`В книге «90 пм» — должно быть 90 нм (при нормальных условиях пробег молекул порядка $10^{-7}$ м).`,
    given: [[String.raw`\eta = 17\ \text{мкПа·с}`, String.raw`1{,}7\cdot10^{-5}\ \text{Па·с}`], [String.raw`\text{н. у.:}\ \rho = 1{,}25\ \text{кг/м}^3`, '']],
    find: String.raw`\langle l\rangle \;—\; ?`,
    formulas: [VISC, VAVG],
    steps: [
      { title: 'Условия',
        text: 'Вязкость газа от давления не зависит, а длина пробега зависит — считаем при нормальных условиях: ⟨v⟩ = 454 м/с.' },
      { title: 'Длина пробега',
        tex: String.raw`\langle l\rangle = \frac{3\eta}{\rho\langle v\rangle} = \frac{3\cdot1{,}7\cdot10^{-5}}{1{,}25\cdot454} = 9{,}0\cdot10^{-8}\ \text{м} = 90\ \text{нм}` },
    ],
    answer: [String.raw`\langle l\rangle = 90\ \text{нм}`],
  },

  /* ===================== 10.68 ===================== */
  {
    id: '10.68', chapter: CH, section: S5, page: '163',
    title: 'Вязкость гелия по коэффициенту диффузии',
    given: [[String.raw`D = 1{,}06\cdot10^{-4}\ \text{м}^2\text{/с}`, ''], [String.raw`\rho = 0{,}18\ \text{кг/м}^3`, '']],
    find: String.raw`\eta \;—\; ?`,
    formulas: [VISC, DIFF],
    steps: [
      { title: 'Связь η и D',
        tex: String.raw`\eta = \frac13\rho\langle v\rangle\langle l\rangle = \rho D = 0{,}18\cdot1{,}06\cdot10^{-4} = 1{,}9\cdot10^{-5}\ \text{Па·с}` },
    ],
    answer: [String.raw`\eta = \rho D = 19\ \text{мкПа·с}`],
  },

  /* ===================== 10.69 ===================== */
  {
    id: '10.69', chapter: CH, section: S5, page: '163',
    title: 'η от температуры',
    given: [[String.raw`1)\ p = \text{const};\ 2)\ V = \text{const}`, '']],
    find: String.raw`\eta(T) \;—\; ?`,
    formulas: [VISC],
    figure: dep('T', 'η', [{ f: x => 0.85 * sq(x), label: [1.0, 1.0, '1, 2'] }]),
    figCaption: 'В обоих процессах η ∼ √T — одна и та же кривая',
    steps: [
      { title: 'ρ⟨l⟩ = m/(√2πd²) — постоянная',
        tex: String.raw`\eta = \frac{m\langle v\rangle}{3\sqrt2\pi d^2} \sim \langle v\rangle \sim \sqrt T` },
      { title: 'Вывод',
        text: 'В обоих процессах η зависит только от температуры: η ∼ √T.' },
    ],
    answer: [String.raw`1)\ \eta \sim \sqrt T;\quad 2)\ \eta \sim \sqrt T`],
  },

  /* ===================== 10.70 ===================== */
  {
    id: '10.70', chapter: CH, section: S5, page: '163',
    title: 'η от давления',
    given: [[String.raw`1)\ T = \text{const};\ 2)\ V = \text{const}`, '']],
    find: String.raw`\eta(p) \;—\; ?`,
    formulas: [VISC],
    figure: dep('p', 'η', [{ f: () => 0.5, label: [1.0, 0.58, '1'] }, { f: x => 0.85 * sq(x), blue: true, label: [1.05, 1.0, '2'] }]),
    figCaption: '1 — изотермический процесс, 2 — изохорный',
    steps: [
      { title: '1) Изотермический',
        text: 'η ∼ √T — от давления не зависит.' },
      { title: '2) Изохорный',
        tex: String.raw`T \sim p \;\Rightarrow\; \eta \sim \sqrt p` },
    ],
    answer: [String.raw`1)\ \text{не зависит};\quad 2)\ \eta \sim \sqrt p`],
  },

  /* ===================== 10.71 ===================== */
  {
    id: '10.71', chapter: CH, section: S5, page: '163',
    title: 'Вязкое трение между цилиндрами',
    given: [[String.raw`R_1 = 10\ \text{см},\ R_2 = 10{,}5\ \text{см}`, ''], [String.raw`l = 30\ \text{см}`, ''], [String.raw`n = 15\ \text{с}^{-1}`, ''], [String.raw`\eta = 8{,}5\ \text{мкПа·с}`, '']],
    find: String.raw`M \;—\; ?`,
    formulas: [NEWTON],
    steps: [
      { title: 'Градиент скорости',
        text: 'Зазор 0,5 см много меньше радиусов — течение как между плоскостями. Скорость поверхности внешнего цилиндра v = 2πnR₂.',
        tex: String.raw`\frac{dv}{dz} = \frac{2\pi nR_2}{R_2 - R_1} = \frac{9{,}90}{0{,}005} = 1980\ \text{с}^{-1}` },
      { title: 'Сила на 1 м² поверхности',
        tex: String.raw`F_\tau = \eta\frac{dv}{dz} = 8{,}5\cdot10^{-6}\cdot1980 = 16{,}8\cdot10^{-3}\ \text{Н/м}^2` },
      { title: 'Момент на внутренний цилиндр',
        tex: String.raw`M = F_\tau\cdot2\pi R_1l\cdot R_1 = 16{,}8\cdot10^{-3}\cdot2\pi\cdot0{,}01\cdot0{,}3 = 3{,}17\cdot10^{-4}\ \text{Н·м}` },
    ],
    answer: [String.raw`F_\tau = 16{,}8\ \text{мН/м}^2;\quad M = 3{,}17\cdot10^{-4}\ \text{Н·м}`],
  },

  /* ===================== 10.72 ===================== */
  {
    id: '10.72', chapter: CH, section: S5, page: '163–164',
    title: 'Вязкое трение между дисками',
    note: MISMATCH + String.raw`В книге $M = \pi^2\eta nR^4/d = 0{,}58$ мН·м. Формула та же, но подстановка $\frac{9{,}87\cdot1{,}72\cdot10^{-5}\cdot10\cdot0{,}0016}{0{,}005}$ даёт 0,54 мН·м.`,
    given: [[String.raw`R = 20\ \text{см}`, String.raw`0{,}2\ \text{м}`], [String.raw`d = 0{,}5\ \text{см}`, String.raw`5\cdot10^{-3}\ \text{м}`], [String.raw`n = 10\ \text{с}^{-1}`, ''], [String.raw`\eta = 17{,}2\ \text{мкПа·с}`, '']],
    find: String.raw`M \;—\; ?`,
    formulas: [NEWTON],
    steps: [
      { title: 'Кольцо радиусом r',
        text: 'Скорость нижнего диска на радиусе r — 2πnr, градиент 2πnr/d. На кольцо шириной dr действует сила и момент:',
        tex: String.raw`dF = \eta\frac{2\pi nr}{d}\cdot2\pi r\,dr,\qquad dM = r\,dF = \frac{4\pi^2\eta n}{d}r^3dr` },
      { title: 'Интегрируем',
        tex: String.raw`M = \frac{4\pi^2\eta n}{d}\cdot\frac{R^4}{4} = \frac{\pi^2\eta nR^4}{d} = 5{,}4\cdot10^{-4}\ \text{Н·м}` },
    ],
    answer: [String.raw`M = \pi^2\eta nR^4/d = 0{,}54\ \text{мН·м}`],
  },

  /* ===================== 10.73 ===================== */
  {
    id: '10.73', chapter: CH, section: S5, page: '164',
    title: 'Трение в ультраразреженном газе',
    note: TYPO + String.raw`В формуле книги под корнем стоит $\eta$ — должна быть молярная масса $M$: $F = \frac13\left(\frac{2M}{\pi RT}\right)^{1/2}puS$. Число 0,89 мкН верное. Это расчёт в простой модели (к каждой пластине летит 1/6 молекул); если считать поток на стенку точно, $\frac14n\langle v\rangle$, получится 1,34 мкН.`,
    given: [[String.raw`p = 1\ \text{мПа}`, String.raw`10^{-3}\ \text{Па}`], [String.raw`T = 300\ \text{К}`, ''], [String.raw`u = 1\ \text{м/с}`, ''], [String.raw`S = 1\ \text{м}^2`, '']],
    find: String.raw`F \;—\; ?`,
    formulas: [VAVG, { tex: String.raw`F = \frac16n\langle v\rangle\cdot mu\cdot S`, text: 'передача импульса: к пластине летит 1/6 молекул, каждая несёт mu' }],
    steps: [
      { title: 'Почему вязкость тут не годится',
        text: 'Зазор много меньше длины пробега: молекулы летают от пластины к пластине, не сталкиваясь друг с другом. Молекула, отразившаяся от движущейся пластины, несёт к неподвижной импульс mu.' },
      { title: 'Сила',
        text: String.raw`$n m = \rho = \frac{pM}{RT}$, $\langle v\rangle = \sqrt{\frac{8RT}{\pi M}}$:`,
        tex: String.raw`F = \frac16\rho\langle v\rangle uS = \frac13\sqrt{\frac{2M}{\pi RT}}\,puS = \frac13\cdot2{,}67\cdot10^{-3}\cdot10^{-3} = 0{,}89\ \text{мкН}` },
    ],
    answer: [String.raw`F = 0{,}89\ \text{мкН}`],
  },

  /* ===================== 10.74 ===================== */
  {
    id: '10.74', chapter: CH, section: S5, page: '164',
    title: 'Теплопроводность гелия',
    given: [[String.raw`\text{н. у.},\ i = 3`, ''], [String.raw`d = 0{,}22\ \text{нм},\ M = 4\cdot10^{-3}\ \text{кг/моль}`, '']],
    find: String.raw`\lambda \;—\; ?`,
    formulas: [COND, LFREE, VAVG],
    steps: [
      { title: 'Величины',
        tex: String.raw`c_V = \frac32\cdot\frac{8{,}31}{0{,}004} = 3116\ \frac{\text{Дж}}{\text{кг·К}},\quad \rho = \frac{p_0M}{RT_0} = 0{,}179\ \text{кг/м}^3,\quad \langle v\rangle = 1202\ \text{м/с},\quad \langle l\rangle = 173\ \text{нм}` },
      { title: 'Теплопроводность',
        tex: String.raw`\lambda = \frac13\cdot3116\cdot0{,}179\cdot1202\cdot1{,}73\cdot10^{-7} = 38{,}6\cdot10^{-3}\ \text{Вт/(м·К)}` },
    ],
    answer: [String.raw`\lambda = 38{,}6\ \text{мВт/(м·К)}`],
  },

  /* ===================== 10.75 ===================== */
  {
    id: '10.75', chapter: CH, section: S5, page: '164',
    title: 'Коэффициент K = λ/(ηc_V)',
    given: [[String.raw`K = (9\gamma - 5)/4`, ''], [String.raw`\eta,\ \lambda\ \text{— табл. 12}`, '']],
    find: String.raw`K \;—\; ?`,
    formulas: [{ tex: String.raw`\gamma = \frac{i + 2}{i},\quad c_V = \frac i2\frac RM`, text: 'показатель адиабаты и удельная теплоёмкость' }],
    steps: [
      { title: 'По формуле',
        text: 'Аргон i = 3, γ = 5/3; водород и кислород i = 5, γ = 7/5; пары воды i = 6, γ = 4/3.',
        tex: String.raw`K_\text{Ar} = 2{,}5;\quad K_{\text{H}_2} = K_{\text{O}_2} = 1{,}90;\quad K_{\text{H}_2\text{O}} = 1{,}75` },
      { title: 'По опыту: K = λ/(ηc_V)',
        tex: String.raw`\begin{aligned} &\text{Ar}:\ \tfrac{16{,}2\cdot10^{-3}}{21{,}5\cdot10^{-6}\cdot312} = 2{,}41 \\ &\text{H}_2:\ \tfrac{168\cdot10^{-3}}{8{,}66\cdot10^{-6}\cdot10\,390} = 1{,}87 \\ &\text{O}_2:\ \tfrac{24{,}4\cdot10^{-3}}{19{,}8\cdot10^{-6}\cdot649} = 1{,}90 \\ &\text{H}_2\text{O}:\ \tfrac{15{,}8\cdot10^{-3}}{8{,}32\cdot10^{-6}\cdot1385} = 1{,}37 \end{aligned}` },
      { title: 'Сверка',
        text: 'Книга: 1,86 и 1,38 — отличие в последней цифре. Для паров воды формула заметно расходится с опытом.' },
    ],
    answer: [String.raw`1)\ 2{,}5;\ 2{,}41\quad 2)\ 1{,}90;\ 1{,}87\quad 3)\ 1{,}90;\ 1{,}90\quad 4)\ 1{,}75;\ 1{,}37`],
  },

  /* ===================== 10.76 ===================== */
  {
    id: '10.76', chapter: CH, section: S5, page: '164',
    title: 'Теплопроводность воздуха по вязкости',
    given: [[String.raw`\eta = 17{,}2\ \text{мкПа·с}`, ''], [String.raw`\gamma = 1{,}4,\ M = 29\cdot10^{-3}\ \text{кг/моль}`, '']],
    find: String.raw`\lambda \;—\; ?`,
    formulas: [{ tex: String.raw`\lambda = Kc_V\eta,\quad K = \frac{9\gamma - 5}{4}`, text: 'уточнённое соотношение (задача 10.75)' }],
    steps: [
      { title: 'Коэффициенты',
        tex: String.raw`K = \frac{9\cdot1{,}4 - 5}{4} = 1{,}9,\qquad c_V = \frac52\cdot\frac{8{,}31}{0{,}029} = 716\ \frac{\text{Дж}}{\text{кг·К}}` },
      { title: 'Теплопроводность',
        tex: String.raw`\lambda = 1{,}9\cdot716\cdot17{,}2\cdot10^{-6} = 23{,}4\cdot10^{-3}\ \text{Вт/(м·К)}` },
    ],
    answer: [String.raw`\lambda = 23{,}4\ \text{мВт/(м·К)}`],
  },

  /* ===================== 10.77 ===================== */
  {
    id: '10.77', chapter: CH, section: S5, page: '164',
    title: 'λ от температуры',
    given: [[String.raw`1)\ p = \text{const};\ 2)\ V = \text{const}`, '']],
    find: String.raw`\lambda(T) \;—\; ?`,
    formulas: [COND],
    figure: dep('T', 'λ', [{ f: x => 0.85 * sq(x), label: [1.0, 1.0, '1, 2'] }]),
    figCaption: 'В обоих процессах λ ∼ √T',
    steps: [
      { title: 'Как у вязкости',
        text: 'λ = c_V·η, c_V от T не зависит, ρ⟨l⟩ постоянна — остаётся ⟨v⟩:',
        tex: String.raw`\lambda \sim \langle v\rangle \sim \sqrt T` },
    ],
    answer: [String.raw`1)\ \lambda \sim \sqrt T;\quad 2)\ \lambda \sim \sqrt T`],
  },

  /* ===================== 10.78 ===================== */
  {
    id: '10.78', chapter: CH, section: S5, page: '164',
    title: 'λ от давления',
    given: [[String.raw`1)\ T = \text{const};\ 2)\ V = \text{const}`, '']],
    find: String.raw`\lambda(p) \;—\; ?`,
    formulas: [COND],
    figure: dep('p', 'λ', [{ f: () => 0.5, label: [1.0, 0.58, '1'] }, { f: x => 0.85 * sq(x), blue: true, label: [1.05, 1.0, '2'] }]),
    figCaption: '1 — изотермический процесс, 2 — изохорный',
    steps: [
      { title: '1) Изотермический',
        text: 'Не зависит от давления (пока пробег много меньше размеров сосуда).' },
      { title: '2) Изохорный',
        tex: String.raw`T \sim p \;\Rightarrow\; \lambda \sim \sqrt p` },
    ],
    answer: [String.raw`1)\ \text{не зависит};\quad 2)\ \lambda \sim \sqrt p`],
  },

  /* ===================== 10.79 ===================== */
  {
    id: '10.79', chapter: CH, section: S5, page: '164',
    title: 'Тепловой поток через гелий',
    note: MISMATCH + String.raw`1) В книге 196 Вт/м² — так выходит с диаметром атома гелия 0,20 нм; с 0,22 нм из табл. 12 (как в задаче 10.74) — 162 Вт/м². 2) В книге 35 мВт/м², здесь 42 мВт/м²: в разреженном газе это грубая оценка, и результат зависит от того, какую долю молекул и какую энергию на молекулу считать переносимой. Порядок величины тот же.`,
    given: [[String.raw`d = 5\ \text{мм}`, String.raw`5\cdot10^{-3}\ \text{м}`], [String.raw`T_1 = 290\ \text{К},\ T_2 = 310\ \text{К}`, ''], [String.raw`1)\ p = 0{,}1\ \text{МПа};\ 2)\ p = 1\ \text{мПа}`, '']],
    find: String.raw`|q| \;—\; ?`,
    formulas: [COND, FOURIER],
    steps: [
      { title: '1) Обычный газ',
        text: 'Пробег (~0,2 мкм) много меньше зазора — работает закон Фурье; λ не зависит от давления. При средней температуре 300 К:',
        tex: String.raw`\lambda = \frac{c_Vm\langle v\rangle}{3\sqrt2\pi d^2} = 40{,}4\ \text{мВт/(м·К)},\qquad q = \lambda\frac{\Delta T}{d} = 0{,}0404\cdot\frac{20}{0{,}005} = 162\ \text{Вт/м}^2` },
      { title: '2) Ультраразреженный газ',
        text: 'Пробег (~10 м) много больше зазора — молекулы летают от пластины к пластине. В формуле теплопроводности вместо ⟨l⟩ берём зазор d:',
        tex: String.raw`q = \frac13c_V\rho\langle v\rangle\Delta T = \frac13\cdot3116\cdot1{,}60\cdot10^{-9}\cdot1259\cdot20 = 42\ \text{мВт/м}^2` },
      { title: 'Вывод',
        text: 'При глубоком вакууме тепловой поток падает в тысячи раз — на этом основаны сосуды Дьюара (термосы).' },
    ],
    answer: [String.raw`1)\ q = 162\ \text{Вт/м}^2;\quad 2)\ q \approx 42\ \text{мВт/м}^2`],
  },

  /* ===================== 10.80 ===================== */
  {
    id: '10.80', chapter: CH, section: S5, page: '164',
    title: 'Теплопроводность водяного пара',
    given: [[String.raw`T = 373\ \text{К}`, ''], [String.raw`d = 0{,}30\ \text{нм}`, ''], [String.raw`i = 6,\ M = 18\cdot10^{-3}\ \text{кг/моль}`, '']],
    find: String.raw`\lambda \;—\; ?`,
    formulas: [COND, LFREE, VAVG],
    steps: [
      { title: 'Формула без плотности',
        text: String.raw`$c_V\rho = \frac i2kn$, $\langle l\rangle = \frac{1}{\sqrt2\pi d^2n}$ — концентрация сокращается:`,
        tex: String.raw`\lambda = \frac13\cdot\frac i2kn\langle v\rangle\frac{1}{\sqrt2\pi d^2n} = \frac{ik}{3\pi d^2}\sqrt{\frac{RT}{\pi M}}` },
      { title: 'Числа',
        tex: String.raw`\lambda = \frac{6\cdot1{,}38\cdot10^{-23}}{3\cdot3{,}14\cdot9\cdot10^{-20}}\sqrt{\frac{8{,}31\cdot373}{3{,}14\cdot0{,}018}} = 9{,}76\cdot10^{-5}\cdot234 = 22{,}9\cdot10^{-3}\ \text{Вт/(м·К)}` },
    ],
    answer: [String.raw`\lambda = \frac{ik}{3\pi d^2}\sqrt{\frac{RT}{\pi M}} = 22{,}9\ \text{мВт/(м·К)}`],
  },

  /* ===================== 10.81 ===================== */
  {
    id: '10.81', chapter: CH, section: S5, page: '164',
    title: 'Время между соударениями в вакууме',
    note: MISMATCH + String.raw`В книге 1,7 с. Формула книги $\tau = \frac{(MRT)^{1/2}}{4\sqrt\pi d^2N_\text{A}p}$ с $d = 0{,}38$ нм (табл. 12) даёт 1,36 с.`,
    given: [[String.raw`p = 10^{-5}\ \text{Па}`, ''], [String.raw`T = 300\ \text{К}`, ''], [String.raw`d = 0{,}38\ \text{нм},\ M = 28\cdot10^{-3}\ \text{кг/моль}`, '']],
    find: String.raw`\langle\tau\rangle \;—\; ?`,
    formulas: [ZCOL, VAVG],
    steps: [
      { title: 'Время = 1/z',
        text: String.raw`Подставляем $n = \frac{pN_\text{A}}{RT}$ и $\langle v\rangle = \sqrt{\frac{8RT}{\pi M}}$:`,
        tex: String.raw`\langle\tau\rangle = \frac{1}{\sqrt2\pi d^2n\langle v\rangle} = \frac{\sqrt{MRT}}{4\sqrt\pi d^2N_\text{A}p}` },
      { title: 'Числа',
        tex: String.raw`\langle\tau\rangle = \frac{\sqrt{0{,}028\cdot8{,}31\cdot300}}{4\cdot1{,}772\cdot1{,}444\cdot10^{-19}\cdot6{,}02\cdot10^{23}\cdot10^{-5}} = \frac{8{,}36}{6{,}16} = 1{,}36\ \text{с}` },
    ],
    answer: [String.raw`\langle\tau\rangle = 1{,}36\ \text{с}`],
  },

  /* ===================== 10.82 ===================== */
  {
    id: '10.82', chapter: CH, section: S5, page: '164',
    title: 'Тысяча столкновений аргона',
    note: MISMATCH + String.raw`В книге «19,7 Па» — должно быть 19,7 <i>мПа</i>: формула книги даёт $1{,}97\cdot10^{-2}$ Па. При 19,7 Па атом сталкивался бы около миллиона раз в секунду.`,
    given: [[String.raw`T = 320\ \text{К}`, ''], [String.raw`\langle z\rangle = 1000\ \text{с}^{-1}`, ''], [String.raw`d = 0{,}35\ \text{нм},\ M = 39{,}9\cdot10^{-3}\ \text{кг/моль}`, '']],
    find: String.raw`p \;—\; ?`,
    formulas: [ZCOL, VAVG],
    steps: [
      { title: 'Из формулы задачи 10.81',
        text: 'Тысяча столкновений — за одну секунду.',
        tex: String.raw`p = \frac{z\sqrt{MRT}}{4\sqrt\pi d^2N_\text{A}\tau} = \frac{1000\cdot\sqrt{0{,}0399\cdot8{,}31\cdot320}}{4\cdot1{,}772\cdot1{,}225\cdot10^{-19}\cdot6{,}02\cdot10^{23}\cdot1}` },
      { title: 'Ответ',
        tex: String.raw`p = \frac{10\,307}{5{,}23\cdot10^5} = 1{,}97\cdot10^{-2}\ \text{Па} = 19{,}7\ \text{мПа}` },
    ],
    answer: [String.raw`p = 19{,}7\ \text{мПа}`],
  },

  /* ===================== 10.83 ===================== */
  {
    id: '10.83', chapter: CH, section: S5, page: '165',
    title: 'Как далеко уходит молекула хлора',
    given: [[String.raw`\text{н. у.}`, ''], [String.raw`L = 1\ \text{см}`, ''], [String.raw`d = 0{,}45\ \text{нм},\ M = 71\cdot10^{-3}\ \text{кг/моль}`, '']],
    find: String.raw`\tau \;—\; ?`,
    formulas: [DIFF, { tex: String.raw`\tau \approx \frac{L^2}{D}`, text: 'оценка времени диффузии на расстояние L' }],
    steps: [
      { title: 'Коэффициент диффузии',
        tex: String.raw`\langle v\rangle = 285\ \text{м/с},\quad \langle l\rangle = \frac{1}{\sqrt2\pi d^2n} = 41\ \text{нм},\quad D = \frac13\langle v\rangle\langle l\rangle = 3{,}9\cdot10^{-6}\ \text{м}^2\text{/с}` },
      { title: 'Время',
        text: 'Молекула блуждает, постоянно меняя направление, — на 1 см уходит не за доли микросекунды, а за десятки секунд.',
        tex: String.raw`\tau \approx \frac{L^2}{D} = \frac{10^{-4}}{3{,}9\cdot10^{-6}} \approx 25\ \text{с}` },
    ],
    answer: [String.raw`\tau \approx 25\ \text{с}`],
  },

  /* ===================== 10.84 ===================== */
  {
    id: '10.84', chapter: CH, section: S5, page: '165',
    title: 'Растворение соли без перемешивания',
    given: [[String.raw`V = 1\ \text{л}`, String.raw`10^{-3}\ \text{м}^3`], [String.raw`\langle v\rangle = 300\ \text{м/с}`, ''], [String.raw`\delta = 0{,}3\ \text{нм}`, '']],
    find: String.raw`\tau \;—\; ?`,
    formulas: [DIFF, { tex: String.raw`\tau \approx \frac{L^2}{D}`, text: 'оценка времени диффузии' }],
    steps: [
      { title: 'Коэффициент диффузии в жидкости',
        text: 'В жидкости «длина пробега» — порядка расстояния между молекулами δ.',
        tex: String.raw`D \approx \frac13\langle v\rangle\delta = \frac13\cdot300\cdot3\cdot10^{-10} = 3\cdot10^{-8}\ \text{м}^2\text{/с}` },
      { title: 'Время',
        text: 'Размер сосуда L = V^(1/3) = 0,1 м.',
        tex: String.raw`\tau \approx \frac{L^2}{D} = \frac{3V^{2/3}}{\langle v\rangle\delta} = \frac{0{,}01}{3\cdot10^{-8}} = 3{,}3\cdot10^5\ \text{с} \approx 4\ \text{сут}` },
    ],
    answer: [String.raw`\tau \approx 4\ \text{сут}`],
  },

  /* ===================== 10.85 ===================== */
  {
    id: '10.85', chapter: CH, section: S5, page: '165',
    title: 'Сколько соударений на пути 1 мм',
    note: MISMATCH + String.raw`В книге $\approx2\cdot10^7$. По формуле самой книги $\langle z\rangle = 6\left(\pi d^2L\frac{\rho}{M}N_\text{A}\right)^2$ с $d = 0{,}36$ нм выходит $3{,}5\cdot10^8$ (даже с $d = 0{,}27$ нм — $1{,}1\cdot10^8$). Задача на оценку, но порядок у книги другой.`,
    given: [[String.raw`\rho = 1\ \text{кг/м}^3`, ''], [String.raw`L = 1\ \text{мм}`, String.raw`10^{-3}\ \text{м}`], [String.raw`d = 0{,}36\ \text{нм}`, '']],
    find: String.raw`\langle z\rangle \;—\; ?`,
    formulas: [LFREE, { tex: String.raw`L^2 \approx \frac{z\langle l\rangle^2}{3}`, text: 'случайное блуждание: за z шагов длиной ⟨l⟩ молекула уходит на L' }],
    steps: [
      { title: 'Длина пробега',
        tex: String.raw`n = \frac{\rho N_\text{A}}{M} = 1{,}88\cdot10^{25}\ \text{м}^{-3},\qquad \langle l\rangle = \frac{1}{\sqrt2\pi d^2n} = 92\ \text{нм}` },
      { title: 'Число соударений',
        tex: String.raw`\langle z\rangle \approx \frac{3L^2}{\langle l\rangle^2} = 3\left(\frac{10^{-3}}{9{,}2\cdot10^{-8}}\right)^2 \approx 3{,}5\cdot10^8` },
    ],
    answer: [String.raw`\langle z\rangle \approx 3{,}5\cdot10^8`],
  },

  /* ===================== 10.86 ===================== */
  {
    id: '10.86', chapter: CH, section: S5, page: '165',
    title: 'Время жизни тепловых нейтронов',
    given: [[String.raw`v = 300\ \text{м/с}`, ''], [String.raw`\sigma = 0{,}3\ \text{барн}`, String.raw`3\cdot10^{-29}\ \text{м}^2`]],
    find: String.raw`\tau \;—\; ?`,
    formulas: [{ tex: String.raw`\tau = \frac{1}{\sigma n_\text{H}v},\quad n_\text{H} = N_\text{H}\frac{\rho}{M}N_\text{A}`, text: 'время до захвата; n_H — концентрация атомов водорода, N_H — атомов H в молекуле' }],
    steps: [
      { title: 'Смысл формулы',
        text: 'За 1 с нейтрон «заметает» объём σv; в нём σvn_H протонов — столько захватов в секунду. Обратная величина — время жизни.' },
      { title: 'Числа',
        text: 'Глицерин взят как в условии, C₂H₈O₃ (M = 80 г/моль).',
        tex: String.raw`\begin{aligned} &\text{вода}\ (2;\ 18):\ 1{,}7\ \text{мс} \\ &\text{этанол}\ (6;\ 46):\ 1{,}7\ \text{мс} \\ &\text{глицерин}\ (8;\ 80):\ 1{,}4\ \text{мс} \\ &\text{гексан}\ (14;\ 86):\ 1{,}6\ \text{мс} \\ &\text{октан}\ (18;\ 114):\ 1{,}6\ \text{мс} \end{aligned}` },
      { title: 'Сверка',
        text: 'Для этанола в книге 1,8 мс; расчёт даёт 1,75 мс — разница в округлении.' },
    ],
    answer: [String.raw`1)\ 1{,}7;\quad 2)\ 1{,}7;\quad 3)\ 1{,}4;\quad 4)\ 1{,}6;\quad 5)\ 1{,}6\ \text{мс}`],
  },

  );
})();
