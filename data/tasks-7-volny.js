/*
  § 7. Волны в упругой среде. Акустика — задачи 7.1–7.40 (стр. 126–131).
  Условия задач показываются дословно из книги (data/book-tasks.js).
  Ответы пересчитаны скриптом tools/check_volny.py и сверены с book/99-otvety.md.
  Где ответ книги расходится с расчётом — плашка note «Расхождение с ответом книги».
  Скорость звука в воздухе, если она не дана, — 332 м/с (табл. 16, сноска 15 книги); воздух: γ = 1,4, M = 0,029 кг/моль;
  R = 8,31 Дж/(моль·К); модули Юнга — табл. 11, плотности — табл. 9.
*/
(function () {
  const CH = 'Гл. 1. Физические основы механики';
  const S1 = 'Уравнение плоской волны';
  const S2 = 'Скорость звука';
  const S3 = 'Суперпозиция волн';
  const S4 = 'Эффект Доплера';
  const S5 = 'Энергия звуковых волн';
  const MISMATCH = '<b>Расхождение с ответом книги.</b> ';
  const SMALL = '<b>Расхождение в последней цифре.</b> ';
  const TYPO = '<b>Опечатка в ответе книги.</b> ';

  const WAVE = { tex: String.raw`\xi(x,\,t) = A\cos(\omega t - kx),\quad k = \frac{2\pi}{\lambda} = \frac{\omega}{c_\text{зв}}`, text: 'уравнение плоской волны, волновое число' };
  const LAMBDA = { tex: String.raw`\lambda = c_\text{зв}T = \frac{c_\text{зв}}{\nu},\quad \omega = 2\pi\nu`, text: 'длина волны, циклическая частота' };
  const DPHI = { tex: String.raw`\Delta\varphi = \frac{2\pi}{\lambda}\Delta x`, text: 'разность фаз двух точек на луче' };
  const VMAX = { tex: String.raw`\dot\xi_\text{max} = A\omega,\quad \ddot\xi_\text{max} = A\omega^2`, text: 'наибольшие скорость и ускорение частиц среды' };
  const CSOLID = { tex: String.raw`c_\text{зв} = \sqrt{E/\rho}`, text: 'продольные волны в твёрдом стержне' };
  const CGAS = { tex: String.raw`c_\text{зв} = \sqrt{\frac{\gamma RT}{M}} = \sqrt{\frac{\gamma p}{\rho}}`, text: 'скорость звука в газе; γ — показатель адиабаты (двухатомный газ — 1,4, одноатомный — 5/3, трёхатомный — 4/3)' };
  const STAND = { tex: String.raw`\Delta x_\text{узл} = \Delta x_\text{пучн} = \frac\lambda2`, text: 'соседние узлы (и соседние пучности) стоячей волны — через λ/2; узел и пучность — через λ/4' };
  const DOPPLER = { tex: String.raw`\nu = \frac{c_\text{зв} + u_\text{пр}}{c_\text{зв} - u_\text{ист}}\nu_0`, text: 'эффект Доплера; скорости положительны, если прибор и источник сближаются' };
  const ENERGY = { tex: String.raw`I = \langle w\rangle c_\text{зв},\quad W = \langle w\rangle V,\quad I = \frac{N}{4\pi r^2}`, text: 'интенсивность, энергия в объёме, точечный источник' };

  window.TASKS.push(

  /* ===================== 7.1 ===================== */
  {
    id: '7.1', chapter: CH, section: S1, page: '126',
    title: 'Параметры волны по её уравнению',
    given: [[String.raw`A = 0{,}5\ \text{см}`, String.raw`5\cdot10^{-3}\ \text{м}`], [String.raw`\omega = 628\ \text{с}^{-1}`, ''], [String.raw`k = 2\ \text{м}^{-1}`, '']],
    find: String.raw`\nu,\ \lambda,\ c_\text{зв},\ \dot\xi_\text{max},\ \ddot\xi_\text{max} \;—\; ?`,
    formulas: [WAVE, LAMBDA, VMAX],
    steps: [
      { title: '1) Частота и длина волны',
        tex: String.raw`\nu = \frac{\omega}{2\pi} = \frac{628}{2\pi} = 100\ \text{Гц};\quad \lambda = \frac{2\pi}{k} = \frac{2\pi}{2} = 3{,}14\ \text{м}` },
      { title: '2) Фазовая скорость',
        tex: String.raw`c_\text{зв} = \frac{\omega}{k} = \frac{628}{2} = 314\ \text{м/с}` },
      { title: '3) Наибольшие скорость и ускорение частиц',
        tex: String.raw`\dot\xi_\text{max} = A\omega = 5\cdot10^{-3}\cdot628 = 3{,}14\ \text{м/с};\quad \ddot\xi_\text{max} = A\omega^2 = 5\cdot10^{-3}\cdot628^2 = 1{,}97\cdot10^3\ \text{м/с}^2` },
    ],
    answer: [String.raw`\nu = 100\ \text{Гц},\ \lambda = 3{,}14\ \text{м}`, String.raw`c_\text{зв} = 314\ \text{м/с}`, String.raw`\dot\xi_\text{max} = 3{,}14\ \text{м/с},\ \ddot\xi_\text{max} = 1{,}97\cdot10^3\ \text{м/с}^2`],
    note: TYPO + String.raw`В книге длина волны «3,14 мм». При $k = 2$ м⁻¹ $\lambda = 2\pi/k = 3{,}14$ м — это же подтверждает $c_\text{зв} = \lambda\nu = 314$ м/с в самой книге.`,
  },

  /* ===================== 7.2 ===================== */
  {
    id: '7.2', chapter: CH, section: S1, page: '126',
    title: 'Плоская волна и волновое уравнение',
    given: [[String.raw`\xi = A\cos(\omega t - kx)`, '']],
    find: String.raw`\text{показать: } \frac{\partial^2\xi}{\partial x^2} = \frac{1}{c_\text{зв}^2}\frac{\partial^2\xi}{\partial t^2}`,
    formulas: [WAVE],
    steps: [
      { title: 'Вторые производные',
        tex: String.raw`\frac{\partial^2\xi}{\partial x^2} = -k^2A\cos(\omega t - kx) = -k^2\xi;\quad \frac{\partial^2\xi}{\partial t^2} = -\omega^2\xi` },
      { title: 'Подставляем в уравнение',
        tex: String.raw`-k^2\xi = -\frac{\omega^2}{c_\text{зв}^2}\xi\ \Leftrightarrow\ k^2 = \frac{\omega^2}{c_\text{зв}^2}\ \Leftrightarrow\ \omega = kc_\text{зв}` },
    ],
    answer: [String.raw`\text{выполняется при } \omega = kc_\text{зв}`],
  },

  /* ===================== 7.3 ===================== */
  {
    id: '7.3', chapter: CH, section: S1, page: '126',
    title: 'Уравнение источника и смещение на 1 м',
    given: [[String.raw`\nu = 200\ \text{Гц}`, ''], [String.raw`A = 4\ \text{мм}`, String.raw`4\cdot10^{-3}\ \text{м}`], [String.raw`x = 100\ \text{см}`, String.raw`1\ \text{м}`], [String.raw`t = 0{,}1\ \text{с}`, ''], [String.raw`c_\text{зв} = 300\ \text{м/с}`, '']],
    find: String.raw`\xi(0,\,t),\ \xi(x,\,t) \;—\; ?`,
    formulas: [WAVE],
    steps: [
      { title: 'Уравнение источника',
        text: 'В начальный момент смещение максимально — значит, косинус с нулевой начальной фазой.',
        tex: String.raw`\xi(0,\,t) = A\cos2\pi\nu t = 4\cos400\pi t\ \ (\text{мм})` },
      { title: 'Смещение точки на расстоянии x',
        tex: String.raw`\xi = A\cos2\pi\nu\left(t - \frac{x}{c_\text{зв}}\right) = 4\cos\left(400\pi\cdot0{,}09667\right) = 4\cos(38{,}67\pi) = 4\cdot(-0{,}5) = -2\ \text{мм}` },
    ],
    answer: [String.raw`\xi(0,\,t) = A\cos2\pi\nu t`, String.raw`\xi = -2\ \text{мм}`],
    note: MISMATCH + String.raw`В книге $\xi = -2$ мкм. Амплитуда 4 мм, а $\cos = -0{,}5$, поэтому смещение $-2$ <b>мм</b> — в книге ошибка в приставке.`,
  },

  /* ===================== 7.4 ===================== */
  {
    id: '7.4', chapter: CH, section: S1, page: '127',
    title: 'Скорость волны и частиц',
    given: [[String.raw`\nu = 0{,}5\ \text{кГц}`, String.raw`500\ \text{Гц}`], [String.raw`A = 0{,}25\ \text{мм}`, String.raw`2{,}5\cdot10^{-4}\ \text{м}`], [String.raw`\lambda = 70\ \text{см}`, String.raw`0{,}7\ \text{м}`]],
    find: String.raw`c_\text{зв},\ \dot\xi_\text{max} \;—\; ?`,
    formulas: [LAMBDA, VMAX],
    steps: [
      { title: '1) Скорость волны',
        tex: String.raw`c_\text{зв} = \lambda\nu = 0{,}7\cdot500 = 350\ \text{м/с}` },
      { title: '2) Наибольшая скорость частиц',
        tex: String.raw`\dot\xi_\text{max} = A\cdot2\pi\nu = 2{,}5\cdot10^{-4}\cdot2\pi\cdot500 = 0{,}79\ \text{м/с}` },
    ],
    answer: [String.raw`c_\text{зв} = 350\ \text{м/с}`, String.raw`\dot\xi_\text{max} = 0{,}79\ \text{м/с}`],
  },

  /* ===================== 7.5 ===================== */
  {
    id: '7.5', chapter: CH, section: S1, page: '127',
    title: 'Смещение, скорость и ускорение в точке волны',
    given: [[String.raw`T = 3\ \text{мс}`, ''], [String.raw`A = 0{,}2\ \text{мм}`, String.raw`2\cdot10^{-4}\ \text{м}`], [String.raw`\lambda = 1{,}2\ \text{м}`, ''], [String.raw`x = 2\ \text{м},\ t = 7\ \text{мс}`, '']],
    find: String.raw`\xi,\ \dot\xi,\ \ddot\xi \;—\; ?`,
    formulas: [WAVE, VMAX],
    steps: [
      { title: 'Фаза',
        tex: String.raw`\varphi = 2\pi\left(\frac tT - \frac x\lambda\right) = 2\pi\left(\frac73 - \frac{2}{1{,}2}\right) = 2\pi\cdot\frac23 = \frac{4\pi}{3}` },
      { title: '1) Смещение',
        tex: String.raw`\xi = A\cos\varphi = 0{,}2\cdot(-0{,}5) = -0{,}1\ \text{мм}` },
      { title: '2) Скорость и ускорение',
        tex: String.raw`\omega = \frac{2\pi}{T} = 2094\ \text{с}^{-1};\quad \dot\xi = -A\omega\sin\varphi = 2\cdot10^{-4}\cdot2094\cdot0{,}866 = 0{,}363\ \text{м/с}` },
      { tex: String.raw`\ddot\xi = -A\omega^2\cos\varphi = 2\cdot10^{-4}\cdot2094^2\cdot0{,}5 = 439\ \text{м/с}^2` },
    ],
    answer: [String.raw`\xi = -0{,}1\ \text{мм}`, String.raw`\dot\xi = 0{,}363\ \text{м/с}`, String.raw`\ddot\xi = 0{,}439\ \text{км/с}^2`],
  },

  /* ===================== 7.6 ===================== */
  {
    id: '7.6', chapter: CH, section: S1, page: '127',
    title: 'Смещение точки на 3λ/4 при t = 0,9T',
    given: [[String.raw`A = 10\ \text{см}`, ''], [String.raw`x = 3\lambda/4`, ''], [String.raw`t = 0{,}9T`, '']],
    find: String.raw`\xi \;—\; ?`,
    formulas: [WAVE],
    steps: [
      { title: 'Фаза в этой точке',
        tex: String.raw`\varphi = 2\pi\left(\frac tT - \frac x\lambda\right) = 2\pi(0{,}9 - 0{,}75) = 0{,}3\pi` },
      { title: 'Смещение',
        tex: String.raw`\xi = A\cos\varphi = 10\cos54^\circ = 5{,}88\ \text{см}` },
    ],
    answer: [String.raw`\xi = 5{,}88\ \text{см}`],
  },

  /* ===================== 7.7 ===================== */
  {
    id: '7.7', chapter: CH, section: S1, page: '127',
    title: 'Смещение точки в 45 м от источника',
    given: [[String.raw`T = 1{,}2\ \text{с}`, ''], [String.raw`A = 2\ \text{см}`, ''], [String.raw`c_\text{зв} = 15\ \text{м/с}`, ''], [String.raw`x = 45\ \text{м},\ t = 4\ \text{с}`, '']],
    find: String.raw`\xi \;—\; ?`,
    formulas: [WAVE],
    steps: [
      { title: 'Фаза',
        text: 'Волна дошла до точки за x/c = 3 с, так что точка колеблется уже 1 с.',
        tex: String.raw`\varphi = \frac{2\pi}{T}\left(t - \frac{x}{c_\text{зв}}\right) = \frac{2\pi}{1{,}2}(4 - 3) = \frac{5\pi}{3}\ (300^\circ)` },
      { title: 'Смещение',
        text: '«От начала колебаний источника» — источник начал колебаться из положения равновесия, поэтому ξ = A sin φ.',
        tex: String.raw`\xi = A\sin\varphi = 2\sin300^\circ = -1{,}73\ \text{см}` },
    ],
    answer: [String.raw`\xi = -1{,}73\ \text{см}`],
    note: '<b>О смысле условия.</b> ' + String.raw`Ответ книги $-1{,}73$ см — для колебаний по синусу (источник стартует из положения равновесия). В примере 1 книга с теми же числами пишет волну через косинус и получает $\xi = +1$ см. Начальная фаза в условии не названа, поэтому возможны оба ответа.`,
  },

  /* ===================== 7.8 ===================== */
  {
    id: '7.8', chapter: CH, section: S1, page: '127',
    title: 'Разность фаз двух точек',
    given: [[String.raw`\Delta x = 50\ \text{см}`, String.raw`0{,}5\ \text{м}`], [String.raw`c_\text{зв} = 50\ \text{м/с}`, ''], [String.raw`T = 0{,}05\ \text{с}`, '']],
    find: String.raw`\Delta\varphi \;—\; ?`,
    formulas: [LAMBDA, DPHI],
    steps: [
      { title: 'Длина волны и разность фаз',
        tex: String.raw`\lambda = c_\text{зв}T = 2{,}5\ \text{м};\quad \Delta\varphi = \frac{2\pi\cdot0{,}5}{2{,}5} = 0{,}4\pi = 1{,}26\ \text{рад}` },
    ],
    answer: [String.raw`\Delta\varphi = 0{,}4\pi = 1{,}26\ \text{рад}`],
  },

  /* ===================== 7.9 ===================== */
  {
    id: '7.9', chapter: CH, section: S1, page: '127',
    title: 'Разность фаз источника и точки',
    given: [[String.raw`x = 2\ \text{м}`, ''], [String.raw`\nu = 5\ \text{Гц}`, ''], [String.raw`c_\text{зв} = 40\ \text{м/с}`, '']],
    find: String.raw`\Delta\varphi \;—\; ?`,
    formulas: [LAMBDA, DPHI],
    steps: [
      { title: 'Считаем',
        tex: String.raw`\lambda = \frac{40}{5} = 8\ \text{м};\quad \Delta\varphi = \frac{2\pi\cdot2}{8} = \frac\pi2 = 1{,}57\ \text{рад}` },
    ],
    answer: [String.raw`\Delta\varphi = \pi/2 = 1{,}57\ \text{рад}`],
  },

  /* ===================== 7.10 ===================== */
  {
    id: '7.10', chapter: CH, section: S1, page: '127',
    title: 'Частота по расстоянию между противофазными точками',
    given: [[String.raw`c_\text{зв} = 100\ \text{м/с}`, ''], [String.raw`\Delta x = 1\ \text{м}`, '']],
    find: String.raw`\nu \;—\; ?`,
    formulas: [LAMBDA, DPHI],
    steps: [
      { title: 'Противоположные фазы — Δφ = π',
        tex: String.raw`\Delta x = \frac\lambda2\ \Rightarrow\ \lambda = 2\ \text{м};\quad \nu = \frac{c_\text{зв}}{\lambda} = 50\ \text{Гц}` },
    ],
    answer: [String.raw`\nu = c_\text{зв}/(2\Delta x) = 50\ \text{Гц}`],
  },

  /* ===================== 7.11 ===================== */
  {
    id: '7.11', chapter: CH, section: S1, page: '127',
    title: 'Скорость волны по разности фаз',
    given: [[String.raw`\Delta x = 10\ \text{см}`, String.raw`0{,}1\ \text{м}`], [String.raw`\Delta\varphi = \pi/3`, ''], [String.raw`\nu = 25\ \text{Гц}`, '']],
    find: String.raw`c_\text{зв} \;—\; ?`,
    formulas: [LAMBDA, DPHI],
    steps: [
      { title: 'Длина волны и скорость',
        tex: String.raw`\lambda = \frac{2\pi\Delta x}{\Delta\varphi} = \frac{2\pi\cdot0{,}1}{\pi/3} = 0{,}6\ \text{м};\quad c_\text{зв} = \lambda\nu = 0{,}6\cdot25 = 15\ \text{м/с}` },
    ],
    answer: [String.raw`c_\text{зв} = 15\ \text{м/с}`],
  },

  /* ===================== 7.12 ===================== */
  {
    id: '7.12', chapter: CH, section: S2, page: '127',
    title: 'Скорость звука в алюминии, меди, вольфраме',
    given: [[String.raw`E:\ 69,\ 98,\ 380\ \text{ГПа}`, ''], [String.raw`\rho:\ 2{,}70,\ 8{,}93,\ 19{,}3\ \text{г/см}^3`, '']],
    find: String.raw`c_\text{зв} \;—\; ?`,
    formulas: [CSOLID],
    steps: [
      { title: '1) Алюминий',
        tex: String.raw`c = \sqrt{\frac{69\cdot10^9}{2{,}70\cdot10^3}} = 5{,}05\cdot10^3\ \text{м/с}` },
      { title: '2) Медь',
        tex: String.raw`c = \sqrt{\frac{98\cdot10^9}{8{,}93\cdot10^3}} = 3{,}31\cdot10^3\ \text{м/с}` },
      { title: '3) Вольфрам',
        tex: String.raw`c = \sqrt{\frac{380\cdot10^9}{19{,}3\cdot10^3}} = 4{,}44\cdot10^3\ \text{м/с}` },
    ],
    answer: [String.raw`c_\text{Al} = 5{,}05\ \text{км/с}`, String.raw`c_\text{Cu} = 3{,}31\ \text{км/с}`, String.raw`c_\text{W} = 4{,}44\ \text{км/с}`],
  },

  /* ===================== 7.13 ===================== */
  {
    id: '7.13', chapter: CH, section: S2, page: '127–128',
    title: 'Границы слышимых длин волн',
    given: [[String.raw`\nu_1 = 16\ \text{Гц}`, ''], [String.raw`\nu_2 = 20\ \text{кГц}`, String.raw`2\cdot10^4\ \text{Гц}`], [String.raw`c_\text{зв} = 340\ \text{м/с}`, '']],
    find: String.raw`\lambda_\text{max},\ \lambda_\text{min} \;—\; ?`,
    formulas: [LAMBDA],
    steps: [
      { title: 'Считаем',
        tex: String.raw`\lambda_\text{max} = \frac{340}{16} = 21\ \text{м};\quad \lambda_\text{min} = \frac{340}{2\cdot10^4} = 1{,}7\cdot10^{-2}\ \text{м}` },
    ],
    answer: [String.raw`\lambda_\text{max} = 21\ \text{м}`, String.raw`\lambda_\text{min} = 17\ \text{мм}`],
  },

  /* ===================== 7.14 ===================== */
  {
    id: '7.14', chapter: CH, section: S2, page: '128',
    title: 'Скорость звука в азоте',
    given: [[String.raw`T = 300\ \text{К}`, ''], [String.raw`M = 0{,}028\ \text{кг/моль},\ \gamma = 1{,}4`, '']],
    find: String.raw`c_\text{зв} \;—\; ?`,
    formulas: [CGAS],
    steps: [
      { title: 'Азот — двухатомный газ',
        tex: String.raw`c_\text{зв} = \sqrt{\frac{1{,}4\cdot8{,}31\cdot300}{0{,}028}} = 353\ \text{м/с}` },
    ],
    answer: [String.raw`c_\text{зв} = 353\ \text{м/с}`],
    note: SMALL + String.raw`В книге 350 м/с — округлено до двух значащих цифр; подстановка даёт 353 м/с.`,
  },

  /* ===================== 7.15 ===================== */
  {
    id: '7.15', chapter: CH, section: S2, page: '128',
    title: 'Скорость звука в воздухе при 290 и 350 К',
    given: [[String.raw`T_1 = 290\ \text{К}`, ''], [String.raw`T_2 = 350\ \text{К}`, ''], [String.raw`M = 0{,}029\ \text{кг/моль},\ \gamma = 1{,}4`, '']],
    find: String.raw`c_1,\ c_2 \;—\; ?`,
    formulas: [CGAS],
    steps: [
      { title: 'Считаем',
        tex: String.raw`c_1 = \sqrt{\frac{1{,}4\cdot8{,}31\cdot290}{0{,}029}} = 341\ \text{м/с};\quad c_2 = c_1\sqrt{\frac{350}{290}} = 375\ \text{м/с}` },
    ],
    answer: [String.raw`c_1 = 341\ \text{м/с}`, String.raw`c_2 = 375\ \text{м/с}`],
    note: SMALL + String.raw`При 290 К в книге 339 м/с; $\sqrt{1{,}4\cdot8{,}31\cdot290/0{,}029} = 341$ м/с (и это согласуется с 375 м/с при 350 К из той же книги: $341\cdot\sqrt{350/290} = 375$).`,
  },

  /* ===================== 7.16 ===================== */
  {
    id: '7.16', chapter: CH, section: S2, page: '128',
    title: 'Скорость звука в воде по запаздыванию',
    given: [[String.raw`l = 800\ \text{м}`, ''], [String.raw`\Delta t = 1{,}78\ \text{с}`, ''], [String.raw`T = 350\ \text{К}`, '']],
    find: String.raw`c_\text{в} \;—\; ?`,
    formulas: [CGAS],
    steps: [
      { title: 'Звук в воздухе',
        tex: String.raw`c_\text{возд} = \sqrt{\frac{1{,}4\cdot8{,}31\cdot350}{0{,}029}} = 375\ \text{м/с};\quad t_\text{возд} = \frac{800}{375} = 2{,}135\ \text{с}` },
      { title: 'Звук в воде пришёл раньше на Δt',
        tex: String.raw`t_\text{в} = 2{,}135 - 1{,}78 = 0{,}355\ \text{с};\quad c_\text{в} = \frac{800}{0{,}355} = 2{,}25\cdot10^3\ \text{м/с}` },
    ],
    answer: [String.raw`c_\text{в} = \frac{l}{l/c_\text{возд} - \Delta t} = 2{,}25\ \text{км/с}`],
    note: MISMATCH + String.raw`В книге 1,45 км/с — это табличная скорость звука в воде; она получается, если взять скорость в воздухе около 343 м/с (воздух при 20 °C). При 350 К, как в условии, $c_\text{возд} = 375$ м/с, и из тех же 800 м и 1,78 с выходит 2,25 км/с. Видимо, в условии опечатка в температуре.`,
  },

  /* ===================== 7.17 ===================== */
  {
    id: '7.17', chapter: CH, section: S2, page: '128',
    title: 'Показатель адиабаты по скорости звука',
    given: [[String.raw`c_\text{зв} = 308\ \text{м/с}`, ''], [String.raw`\rho = 1{,}78\ \text{кг/м}^3`, ''], [String.raw`p = 101{,}3\ \text{кПа}`, '']],
    find: String.raw`\gamma = c_p/c_V \;—\; ?`,
    formulas: [CGAS],
    steps: [
      { title: 'Из c² = γp/ρ',
        tex: String.raw`\gamma = \frac{c_\text{зв}^2\rho}{p} = \frac{308^2\cdot1{,}78}{1{,}013\cdot10^5} = 1{,}67` },
      { title: 'Вывод',
        text: 'γ = 5/3 — газ одноатомный (по плотности при н. у. — аргон).' },
    ],
    answer: [String.raw`\gamma = 1{,}67`],
  },

  /* ===================== 7.18 ===================== */
  {
    id: '7.18', chapter: CH, section: S2, page: '128',
    title: 'Звук в водороде и углекислом газе',
    given: [[String.raw`\text{H}_2:\ \gamma_1 = 1{,}4,\ M_1 = 2\ \text{г/моль}`, ''], [String.raw`\text{CO}_2:\ \gamma_2 = 4/3,\ M_2 = 44\ \text{г/моль}`, '']],
    find: String.raw`c_1/c_2 \;—\; ?`,
    formulas: [CGAS],
    steps: [
      { title: 'Температура одна — сокращается',
        tex: String.raw`\frac{c_1}{c_2} = \sqrt{\frac{\gamma_1M_2}{\gamma_2M_1}} = \sqrt{\frac{1{,}4\cdot44}{1{,}333\cdot2}} = 4{,}8` },
    ],
    answer: [String.raw`c_1/c_2 = 4{,}8`],
  },

  /* ===================== 7.19 ===================== */
  {
    id: '7.19', chapter: CH, section: S2, page: '128',
    title: 'Звук вверх при падающей температуре',
    given: [[String.raw`T_0 = 300\ \text{К}`, ''], [String.raw`a = \Delta T/\Delta h = 7\ \text{мК/м}`, String.raw`7\cdot10^{-3}\ \text{К/м}`], [String.raw`h = 8\ \text{км}`, String.raw`8\cdot10^3\ \text{м}`]],
    find: String.raw`t \;—\; ?`,
    formulas: [CGAS],
    steps: [
      { title: 'Скорость меняется с высотой',
        tex: String.raw`T(y) = T_0 - ay,\quad c(y) = \sqrt{\frac{\gamma R}{M}}\sqrt{T_0 - ay}` },
      { title: 'Время — интеграл dy/c',
        tex: String.raw`t = \sqrt{\frac{M}{\gamma R}}\int_0^h\frac{dy}{\sqrt{T_0 - ay}} = \frac2a\sqrt{\frac{M}{\gamma R}}\left(\sqrt{T_0} - \sqrt{T_0 - ah}\right)` },
      { title: 'Считаем',
        tex: String.raw`t = \frac{2}{7\cdot10^{-3}}\cdot\sqrt{\frac{0{,}029}{1{,}4\cdot8{,}31}}\cdot\left(\sqrt{300} - \sqrt{244}\right) = 285{,}7\cdot0{,}0499\cdot1{,}70 = 24{,}3\ \text{с}` },
    ],
    answer: [String.raw`t = \frac{2}{a}\sqrt{\frac{M}{\gamma R}}\left(\sqrt{T_0} - \sqrt{T_0 - ah}\right) = 24{,}3\ \text{с}`],
    note: TYPO + String.raw`В формуле книги в скобке напечатано $T_0 - \sqrt{T_0 - \ldots}$: первое слагаемое тоже должно быть под корнем, $\sqrt{T_0}$. Число 24,3 с в книге верное.`,
  },

  /* ===================== 7.20 ===================== */
  {
    id: '7.20', chapter: CH, section: S3, page: '128',
    title: 'Сложение волн от двух источников',
    given: [[String.raw`A_1 = A_2 = 1\ \text{мм}`, ''], [String.raw`x_1 = 3{,}5\ \text{м},\ x_2 = 5{,}4\ \text{м}`, ''], [String.raw`\lambda = 0{,}6\ \text{м}`, '']],
    find: String.raw`A \;—\; ?`,
    formulas: [DPHI, { tex: String.raw`A = 2A_1\left|\cos\frac{\Delta\varphi}{2}\right|`, text: 'сложение двух одинаковых колебаний со сдвигом фаз Δφ' }],
    steps: [
      { title: 'Разность фаз в точке',
        tex: String.raw`\Delta\varphi = \frac{2\pi(x_2 - x_1)}{\lambda} = \frac{2\pi\cdot1{,}9}{0{,}6} = 6{,}33\pi` },
      { title: 'Амплитуда',
        tex: String.raw`A = 2\cdot1\cdot|\cos3{,}167\pi| = 2\cdot|\cos30^\circ| = 1{,}73\ \text{мм}` },
    ],
    answer: [String.raw`A = \sqrt3A_1 = 1{,}73\ \text{мм}`],
  },

  /* ===================== 7.21 ===================== */
  {
    id: '7.21', chapter: CH, section: S3, page: '128',
    title: 'Узлы и пучности у границы сред',
    given: [[String.raw`c_\text{зв} = 340\ \text{м/с}`, ''], [String.raw`\nu = 3{,}4\ \text{кГц}`, '']],
    find: String.raw`l_\text{узл},\ l_\text{пучн} \;—\; ?`,
    formulas: [LAMBDA, STAND],
    steps: [
      { title: 'Длина волны',
        tex: String.raw`\lambda = \frac{340}{3400} = 0{,}1\ \text{м} = 10\ \text{см}` },
      { title: '1) Отражение от менее плотной среды',
        text: 'Фаза при отражении не меняется — на границе пучность.',
        tex: String.raw`l_\text{пучн} = m\frac\lambda2 = 0;\ 5;\ 10\ \text{см}\ldots;\quad l_\text{узл} = (2m + 1)\frac\lambda4 = 2{,}5;\ 7{,}5;\ 12{,}5\ \text{см}\ldots` },
      { title: '2) Отражение от более плотной среды',
        text: 'Фаза меняется на π — на границе узел (как в примере 2).',
        tex: String.raw`l_\text{узл} = m\frac\lambda2 = 0;\ 5;\ 10\ \text{см}\ldots;\quad l_\text{пучн} = (2m + 1)\frac\lambda4 = 2{,}5;\ 7{,}5;\ 12{,}5\ \text{см}\ldots` },
    ],
    answer: [String.raw`\text{1) пучности } 0;\ 5;\ 10\ \text{см};\ \text{узлы } 2{,}5;\ 7{,}5;\ 12{,}5\ \text{см}`, String.raw`\text{2) узлы } 0;\ 5;\ 10\ \text{см};\ \text{пучности } 2{,}5;\ 7{,}5;\ 12{,}5\ \text{см}`],
  },

  /* ===================== 7.22 ===================== */
  {
    id: '7.22', chapter: CH, section: S3, page: '128',
    title: 'Длина волны по узлам и пучностям',
    given: [[String.raw`l = 15\ \text{см}`, '']],
    find: String.raw`\lambda \;—\; ?`,
    formulas: [STAND],
    steps: [
      { title: '1) Первая и седьмая пучности',
        text: 'Между ними 6 промежутков по λ/2.',
        tex: String.raw`6\cdot\frac\lambda2 = 15\ \text{см}\ \Rightarrow\ \lambda = 5\ \text{см}` },
      { title: '2) Первый и четвёртый узлы',
        text: 'Между ними 3 промежутка по λ/2.',
        tex: String.raw`3\cdot\frac\lambda2 = 15\ \text{см}\ \Rightarrow\ \lambda = 10\ \text{см}` },
    ],
    answer: [String.raw`\lambda_1 = 5\ \text{см}`, String.raw`\lambda_2 = 10\ \text{см}`],
  },

  /* ===================== 7.23 ===================== */
  {
    id: '7.23', chapter: CH, section: S3, page: '128',
    title: 'Наинизший тон воздушного столба',
    given: [[String.raw`l = 1{,}2\ \text{м}`, ''], [String.raw`T = 300\ \text{К}`, '']],
    find: String.raw`\nu_\text{min} \;—\; ?`,
    formulas: [CGAS, STAND],
    steps: [
      { title: 'Скорость звука',
        tex: String.raw`c_\text{зв} = \sqrt{\frac{1{,}4\cdot8{,}31\cdot300}{0{,}029}} = 347\ \text{м/с}` },
      { title: '1) Открытая труба',
        text: 'На обоих концах пучности — на длине трубы помещается половина волны.',
        tex: String.raw`\lambda = 2l,\quad \nu_\text{min} = \frac{c_\text{зв}}{2l} = \frac{347}{2{,}4} = 144\ \text{Гц}` },
      { title: '2) Закрытая (с одного конца) труба',
        text: 'У дна узел, у открытого конца пучность — четверть волны.',
        tex: String.raw`\lambda = 4l,\quad \nu_\text{min} = \frac{c_\text{зв}}{4l} = 72\ \text{Гц}` },
    ],
    answer: [String.raw`\nu_1 = c/(2l) = 144\ \text{Гц}`, String.raw`\nu_2 = c/(4l) = 72\ \text{Гц}`],
  },

  /* ===================== 7.24 ===================== */
  {
    id: '7.24', chapter: CH, section: S3, page: '128–129',
    title: 'Резонанс камертона над трубкой с водой',
    given: [[String.raw`\nu = 440\ \text{Гц}`, ''], [String.raw`\Delta H = 19{,}5\ \text{см}`, String.raw`0{,}195\ \text{м}`]],
    find: String.raw`c_\text{зв} \;—\; ?`,
    formulas: [LAMBDA, STAND],
    steps: [
      { title: 'Первое усиление',
        text: 'Трубка была полна, воздушный столб растёт от нуля. Первый резонанс — когда в столбе укладывается четверть волны: узел у воды, пучность у открытого конца.',
        tex: String.raw`\Delta H = \frac\lambda4\ \Rightarrow\ \lambda = 4\cdot0{,}195 = 0{,}78\ \text{м}` },
      { title: 'Скорость',
        tex: String.raw`c_\text{зв} = \lambda\nu = 0{,}78\cdot440 = 343\ \text{м/с}` },
    ],
    answer: [String.raw`c_\text{зв} = 4\Delta H\nu = 343\ \text{м/с}`],
  },

  /* ===================== 7.25 ===================== */
  {
    id: '7.25', chapter: CH, section: S3, page: '129',
    title: 'Скорость звука по перемещению поршня',
    given: [[String.raw`\nu = 440\ \text{Гц}`, ''], [String.raw`\Delta l = 0{,}375\ \text{м}`, '']],
    find: String.raw`c_\text{зв} \;—\; ?`,
    formulas: [LAMBDA, STAND],
    steps: [
      { title: 'Соседние усиления — через полволны',
        tex: String.raw`\Delta l = \frac\lambda2\ \Rightarrow\ \lambda = 0{,}75\ \text{м};\quad c_\text{зв} = \lambda\nu = 330\ \text{м/с}` },
    ],
    answer: [String.raw`c_\text{зв} = 2\Delta l\nu = 330\ \text{м/с}`],
  },

  /* ===================== 7.26 ===================== */
  {
    id: '7.26', chapter: CH, section: S3, page: '129',
    title: 'Скорость звука в латуни (трубка Кундта)',
    given: [[String.raw`a = 8{,}5\ \text{см}`, String.raw`0{,}085\ \text{м}`], [String.raw`l = 0{,}8\ \text{м}`, ''], [String.raw`c_\text{возд} = 332\ \text{м/с}`, '']],
    find: String.raw`c_\text{л} \;—\; ?`,
    formulas: [LAMBDA, STAND],
    steps: [
      { title: 'Волна в стержне',
        text: 'Стержень зажат посередине (узел), концы свободны (пучности): на его длине — половина волны.',
        tex: String.raw`\lambda_\text{л} = 2l` },
      { title: 'Волна в воздухе',
        text: 'Кучки порошка — в узлах стоячей волны в трубке, через λ/2.',
        tex: String.raw`\lambda_\text{возд} = 2a` },
      { title: 'Частота общая',
        tex: String.raw`\frac{c_\text{л}}{2l} = \frac{c_\text{возд}}{2a}\ \Rightarrow\ c_\text{л} = \frac la c_\text{возд} = \frac{0{,}8}{0{,}085}\cdot332 = 3{,}12\cdot10^3\ \text{м/с}` },
    ],
    answer: [String.raw`c_\text{л} = (l/a)c_\text{возд} = 3{,}12\ \text{км/с}`],
  },

  /* ===================== 7.27 ===================== */
  {
    id: '7.27', chapter: CH, section: S3, page: '129–130',
    title: 'Собственная частота стального стержня',
    given: [[String.raw`l = 1\ \text{м}`, ''], [String.raw`E = 200\ \text{ГПа},\ \rho = 7{,}87\ \text{г/см}^3`, '']],
    find: String.raw`\nu \;—\; ?`,
    formulas: [CSOLID, STAND],
    steps: [
      { title: 'Скорость продольных волн в стали',
        tex: String.raw`c = \sqrt{\frac{2\cdot10^{11}}{7870}} = 5{,}04\cdot10^3\ \text{м/с}` },
      { title: 'Основной тон',
        text: 'Посередине узел, на концах пучности — λ = 2l.',
        tex: String.raw`\nu = \frac{c}{2l} = \frac{5{,}04\cdot10^3}{2} = 2{,}52\cdot10^3\ \text{Гц}` },
    ],
    answer: [String.raw`\nu = \frac{1}{2l}\sqrt{E/\rho} = 2{,}52\ \text{кГц}`],
  },

  /* ===================== 7.28 ===================== */
  {
    id: '7.28', chapter: CH, section: S4, page: '130',
    title: 'Гудок проходящего поезда',
    given: [[String.raw`u = 10\ \text{м/с}`, ''], [String.raw`\nu_0 = 300\ \text{Гц}`, ''], [String.raw`c_\text{зв} = 332\ \text{м/с}`, '']],
    find: String.raw`\nu_1,\ \nu_2 \;—\; ?`,
    formulas: [DOPPLER],
    steps: [
      { title: '1) Поезд (источник) приближается',
        tex: String.raw`\nu_1 = \frac{c_\text{зв}}{c_\text{зв} - u}\nu_0 = \frac{332}{322}\cdot300 = 309\ \text{Гц}` },
      { title: '2) Удаляется',
        tex: String.raw`\nu_2 = \frac{c_\text{зв}}{c_\text{зв} + u}\nu_0 = \frac{332}{342}\cdot300 = 291\ \text{Гц}` },
    ],
    answer: [String.raw`\nu_1 = 309\ \text{Гц}`, String.raw`\nu_2 = 291\ \text{Гц}`],
    note: MISMATCH + String.raw`В книге 341 и 268 Гц — так выходит при скорости поезда 40 м/с (как в следующей задаче 7.29): $300\cdot\frac{332}{292} = 341$, $300\cdot\frac{332}{372} = 268$. При $u = 10$ м/с из условия — 309 и 291 Гц.`,
  },

  /* ===================== 7.29 ===================== */
  {
    id: '7.29', chapter: CH, section: S4, page: '130',
    title: 'Пассажир едет мимо гудящего электровоза',
    given: [[String.raw`\nu_0 = 300\ \text{Гц}`, ''], [String.raw`u = 40\ \text{м/с}`, ''], [String.raw`c_\text{зв} = 332\ \text{м/с}`, '']],
    find: String.raw`\nu_1,\ \nu_2 \;—\; ?`,
    formulas: [DOPPLER],
    steps: [
      { title: 'Движется прибор (пассажир)',
        tex: String.raw`\nu_1 = \frac{c_\text{зв} + u}{c_\text{зв}}\nu_0 = \frac{372}{332}\cdot300 = 336\ \text{Гц}` },
      { title: 'Удаляется',
        tex: String.raw`\nu_2 = \frac{c_\text{зв} - u}{c_\text{зв}}\nu_0 = \frac{292}{332}\cdot300 = 264\ \text{Гц}` },
    ],
    answer: [String.raw`\nu_1 = 336\ \text{Гц}`, String.raw`\nu_2 = 264\ \text{Гц}`],
    note: MISMATCH + String.raw`При приближении в книге 366 Гц — видимо, переставлены цифры: $300\cdot372/332 = 336$ Гц. Проверка: сдвиги вверх и вниз почти одинаковы ($+36$ и $-36$ Гц), как и должно быть при движении наблюдателя.`,
  },

  /* ===================== 7.30 ===================== */
  {
    id: '7.30', chapter: CH, section: S4, page: '130',
    title: 'Скорость поезда по тону сирены',
    given: [[String.raw`\nu_1 = 1100\ \text{Гц}`, ''], [String.raw`\nu_2 = 900\ \text{Гц}`, ''], [String.raw`c_\text{зв} = 332\ \text{м/с}`, '']],
    find: String.raw`u,\ \nu_0 \;—\; ?`,
    formulas: [DOPPLER],
    steps: [
      { title: 'Отношение частот',
        tex: String.raw`\frac{\nu_1}{\nu_2} = \frac{c_\text{зв} + u}{c_\text{зв} - u}\ \Rightarrow\ u = c_\text{зв}\frac{\nu_1 - \nu_2}{\nu_1 + \nu_2} = 332\cdot\frac{200}{2000} = 33{,}2\ \text{м/с} = 120\ \text{км/ч}` },
      { title: 'Частота сирены',
        tex: String.raw`\nu_0 = \nu_1\frac{c_\text{зв} - u}{c_\text{зв}} = 1100\cdot0{,}9 = 990\ \text{Гц}` },
    ],
    answer: [String.raw`u = 120\ \text{км/ч}`, String.raw`\nu_0 = 990\ \text{Гц}`],
  },

  /* ===================== 7.31 ===================== */
  {
    id: '7.31', chapter: CH, section: S4, page: '130',
    title: 'Скачок тона при проезде поезда',
    given: [[String.raw`u = 54\ \text{км/ч}`, String.raw`15\ \text{м/с}`], [String.raw`c_\text{зв} = 332\ \text{м/с}`, '']],
    find: String.raw`\Delta\nu/\nu_0 \;—\; ?`,
    formulas: [DOPPLER],
    steps: [
      { title: 'Частоты до и после',
        tex: String.raw`\frac{\Delta\nu}{\nu_0} = \frac{c}{c - u} - \frac{c}{c + u} = \frac{2uc}{c^2 - u^2} \approx \frac{2u}{c} = \frac{30}{332} = 0{,}09` },
    ],
    answer: [String.raw`\Delta\nu/\nu_0 \approx 2u/c = 0{,}09`],
  },

  /* ===================== 7.32 ===================== */
  {
    id: '7.32', chapter: CH, section: S4, page: '130',
    title: 'Как двигать источник, чтобы зазвучал резонатор',
    given: [[String.raw`\nu_0 = 8\ \text{кГц}`, ''], [String.raw`\lambda = 4{,}2\ \text{см}`, String.raw`0{,}042\ \text{м}`], [String.raw`c_\text{зв} = 332\ \text{м/с}`, '']],
    find: String.raw`u \;—\; ?`,
    formulas: [DOPPLER],
    steps: [
      { title: 'Частота резонатора',
        tex: String.raw`\nu_\text{рез} = \frac{c_\text{зв}}{\lambda} = \frac{332}{0{,}042} = 7905\ \text{Гц} < \nu_0` },
      { title: 'Скорость и направление',
        text: 'Частоту нужно понизить — источник должен удаляться от резонатора. Из ν = ν₀c/(c + u) (как в примере 3):',
        tex: String.raw`u = \nu_0\lambda - c_\text{зв} = 8000\cdot0{,}042 - 332 = 336 - 332 = 4\ \text{м/с}` },
    ],
    answer: [String.raw`u = 4\ \text{м/с,\ от резонатора}`],
    note: '<b>Направление зависит от скорости звука.</b> ' + String.raw`В книге «4,1 м/с; по направлению к резонатору» — так выходит, если взять $c_\text{зв} \approx 340$ м/с: тогда собственная частота резонатора $340/0{,}042 = 8095$ Гц выше 8 кГц, и источник должен приближаться ($u = c - \nu_0\lambda \approx 4$ м/с). С табличными 332 м/с (табл. 16, по сноске к задачам) резонатор настроен ниже 8 кГц, и источник должен удаляться с той же скоростью около 4 м/с.`,
  },

  /* ===================== 7.33 ===================== */
  {
    id: '7.33', chapter: CH, section: S4, page: '130',
    title: 'Кажущаяся длительность свистка',
    given: [[String.raw`u = 120\ \text{км/ч}`, String.raw`33{,}3\ \text{м/с}`], [String.raw`\tau_0 = 5\ \text{с}`, ''], [String.raw`c_\text{зв} = 348\ \text{м/с}`, '']],
    find: String.raw`\tau_1,\ \tau_2 \;—\; ?`,
    formulas: [DOPPLER],
    steps: [
      { title: 'Почему меняется длительность',
        text: 'Пока длится свисток, поезд проходит uτ₀; конец звука идёт к наблюдателю на uτ₀ меньше (или больше) пути, чем начало.',
        tex: String.raw`\tau = \tau_0\frac{c \mp u}{c}` },
      { title: '1) Приближается',
        tex: String.raw`\tau_1 = 5\cdot\frac{348 - 33{,}3}{348} = 4{,}5\ \text{с}` },
      { title: '2) Удаляется',
        tex: String.raw`\tau_2 = 5\cdot\frac{348 + 33{,}3}{348} = 5{,}5\ \text{с}` },
    ],
    answer: [String.raw`\tau_1 = 4{,}5\ \text{с}`, String.raw`\tau_2 = 5{,}5\ \text{с}`],
  },

  /* ===================== 7.34 ===================== */
  {
    id: '7.34', chapter: CH, section: S4, page: '130',
    title: 'Сигнал для машиниста скорого поезда',
    given: [[String.raw`u = 72\ \text{км/ч}`, String.raw`20\ \text{м/с}`], [String.raw`\nu_0 = 0{,}6\ \text{кГц}`, String.raw`600\ \text{Гц}`], [String.raw`c_\text{зв} = 332\ \text{м/с}`, '']],
    find: String.raw`\nu \;—\; ?`,
    formulas: [DOPPLER],
    steps: [
      { title: 'Движется приёмник',
        tex: String.raw`\nu = \frac{c_\text{зв} + u}{c_\text{зв}}\nu_0 = \frac{352}{332}\cdot600 = 636\ \text{Гц}` },
    ],
    answer: [String.raw`\nu = 636\ \text{Гц}`],
  },

  /* ===================== 7.35 ===================== */
  {
    id: '7.35', chapter: CH, section: S4, page: '130',
    title: 'Сигнал между двумя автомашинами',
    given: [[String.raw`u_1 = 30\ \text{м/с}`, ''], [String.raw`u_2 = 20\ \text{м/с}`, ''], [String.raw`\nu_1 = 600\ \text{Гц}`, ''], [String.raw`c_\text{зв} = 332\ \text{м/с}`, '']],
    find: String.raw`\nu_2 \;—\; ?`,
    formulas: [DOPPLER],
    steps: [
      { title: '1) До встречи (сближаются)',
        tex: String.raw`\nu_2 = \frac{332 + 20}{332 - 30}\cdot600 = 699\ \text{Гц}` },
      { title: '2) После встречи (удаляются)',
        tex: String.raw`\nu_2 = \frac{332 - 20}{332 + 30}\cdot600 = 517\ \text{Гц}` },
      { title: 'Если сигналит вторая машина',
        text: 'Скорости источника и приёмника меняются местами — ответ меняется, хоть и немного:',
        tex: String.raw`\frac{332 + 30}{332 - 20}\cdot600 = 696\ \text{Гц};\quad \frac{332 - 30}{332 + 20}\cdot600 = 515\ \text{Гц}` },
    ],
    answer: [String.raw`\nu_2 = 699\ \text{Гц (до)},\ 517\ \text{Гц (после)}`, String.raw`\text{сигналит вторая: } 696\ \text{и}\ 515\ \text{Гц}`],
  },

  /* ===================== 7.36 ===================== */
  {
    id: '7.36', chapter: CH, section: S4, page: '131',
    title: 'Скорость подводной лодки по биениям',
    given: [[String.raw`\nu_0 = 50\ \text{кГц}`, String.raw`5\cdot10^4\ \text{Гц}`], [String.raw`\Delta\nu = 250\ \text{Гц}`, ''], [String.raw`c_\text{зв} = 1{,}5\ \text{км/с}`, String.raw`1500\ \text{м/с}`]],
    find: String.raw`u \;—\; ?`,
    formulas: [DOPPLER],
    steps: [
      { title: 'Двойной эффект Доплера',
        text: 'Лодка сначала принимает сигнал как движущийся приёмник, затем отражает его как движущийся источник.',
        tex: String.raw`\nu' = \nu_0\frac{c + u}{c - u}\ \Rightarrow\ \Delta\nu = \nu' - \nu_0 = \nu_0\frac{2u}{c - u}` },
      { title: 'Выражаем u',
        tex: String.raw`u = \frac{\Delta\nu}{2\nu_0 + \Delta\nu}c = \frac{250}{100\,250}\cdot1500 = 3{,}74\ \text{м/с}` },
    ],
    answer: [String.raw`u = \frac{\Delta\nu}{2\nu_0 + \Delta\nu}c_\text{зв} = 3{,}74\ \text{м/с}`],
  },

  /* ===================== 7.37 ===================== */
  {
    id: '7.37', chapter: CH, section: S5, page: '131',
    title: 'Энергия звука в трубе',
    given: [[String.raw`d = 20\ \text{см}`, String.raw`0{,}2\ \text{м}`], [String.raw`l = 5\ \text{м}`, ''], [String.raw`I = 50\ \text{мВт/м}^2`, String.raw`0{,}05\ \text{Вт/м}^2`], [String.raw`c_\text{зв} = 332\ \text{м/с}`, '']],
    find: String.raw`W \;—\; ?`,
    formulas: [ENERGY],
    steps: [
      { title: 'Плотность энергии и объём',
        tex: String.raw`\langle w\rangle = \frac{I}{c_\text{зв}} = \frac{0{,}05}{332} = 1{,}51\cdot10^{-4}\ \text{Дж/м}^3;\quad V = \frac{\pi d^2}{4}l = 0{,}157\ \text{м}^3` },
      { title: 'Энергия',
        tex: String.raw`W = \langle w\rangle V = 1{,}51\cdot10^{-4}\cdot0{,}157 = 2{,}37\cdot10^{-5}\ \text{Дж}` },
    ],
    answer: [String.raw`W = \frac{\pi d^2lI}{4c_\text{зв}} = 23{,}7\ \text{мкДж}`],
  },

  /* ===================== 7.38 ===================== */
  {
    id: '7.38', chapter: CH, section: S5, page: '131',
    title: 'Плотность энергии при I = 1 Вт/м²',
    given: [[String.raw`I = 1\ \text{Вт/м}^2`, ''], [String.raw`c_\text{зв} = 332\ \text{м/с}`, '']],
    find: String.raw`\langle w\rangle \;—\; ?`,
    formulas: [ENERGY],
    steps: [
      { title: 'Считаем',
        tex: String.raw`\langle w\rangle = \frac{I}{c_\text{зв}} = \frac{1}{332} = 3{,}01\cdot10^{-3}\ \text{Дж/м}^3` },
    ],
    answer: [String.raw`\langle w\rangle = 3{,}01\ \text{мДж/м}^3`],
  },

  /* ===================== 7.39 ===================== */
  {
    id: '7.39', chapter: CH, section: S5, page: '131',
    title: 'Плотность энергии в 10 м от источника',
    given: [[String.raw`N = 10\ \text{Вт}`, ''], [String.raw`r = 10\ \text{м}`, ''], [String.raw`T = 250\ \text{К}`, '']],
    find: String.raw`\langle w\rangle \;—\; ?`,
    formulas: [ENERGY, CGAS],
    steps: [
      { title: 'Интенсивность',
        tex: String.raw`I = \frac{N}{4\pi r^2} = \frac{10}{4\pi\cdot100} = 7{,}96\cdot10^{-3}\ \text{Вт/м}^2` },
      { title: 'Скорость звука при 250 К',
        tex: String.raw`c_\text{зв} = \sqrt{\frac{1{,}4\cdot8{,}31\cdot250}{0{,}029}} = 317\ \text{м/с}` },
      { title: 'Плотность энергии',
        tex: String.raw`\langle w\rangle = \frac{I}{c_\text{зв}} = \frac{7{,}96\cdot10^{-3}}{317} = 2{,}51\cdot10^{-5}\ \text{Дж/м}^3` },
    ],
    answer: [String.raw`\langle w\rangle = 25{,}1\ \text{мкДж/м}^3`],
    note: MISMATCH + String.raw`В книге 0,251 Дж/м³ — в $10^4$ раз больше. Цифры те же, а ошибка в порядке: $7{,}96\cdot10^{-3}/317 = 2{,}51\cdot10^{-5}$ Дж/м³.`,
  },

  /* ===================== 7.40 ===================== */
  {
    id: '7.40', chapter: CH, section: S5, page: '131',
    title: 'Мощность источника и плотность энергии',
    given: [[String.raw`r = 25\ \text{м}`, ''], [String.raw`I = 20\ \text{мВт/м}^2`, String.raw`0{,}02\ \text{Вт/м}^2`], [String.raw`c_\text{зв} = 332\ \text{м/с}`, '']],
    find: String.raw`N,\ \langle w\rangle \;—\; ?`,
    formulas: [ENERGY],
    steps: [
      { title: 'Мощность',
        tex: String.raw`N = 4\pi r^2I = 4\pi\cdot625\cdot0{,}02 = 157\ \text{Вт}` },
      { title: 'Плотность энергии',
        tex: String.raw`\langle w\rangle = \frac{I}{c_\text{зв}} = \frac{0{,}02}{332} = 6{,}02\cdot10^{-5}\ \text{Дж/м}^3` },
    ],
    answer: [String.raw`N = 157\ \text{Вт}`, String.raw`\langle w\rangle = 60{,}2\ \text{мкДж/м}^3`],
  },

  );
})();
