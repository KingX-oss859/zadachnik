/*
  § 6. Механические колебания — задачи 6.1–6.75 (стр. 111–120).
  Условия задач показываются дословно из книги (data/book-tasks.js).
  Ответы пересчитаны скриптом tools/check_kolebaniya.py и сверены с book/99-otvety.md.
  Где ответ книги расходится с расчётом — плашка note «Расхождение с ответом книги».
  g = 9,81 м/с²; плотности по приложениям книги: вода 1000, ртуть 13,6·10³ кг/м³.
  Графики и траектории строятся по формулам (FIG.graph), в одном масштабе по осям x и y.
*/
(function () {
  const CH = 'Гл. 1. Физические основы механики';
  const S1 = 'Кинематика гармонических колебаний';
  const S2 = 'Сложение колебаний';
  const S3 = 'Динамика гармонических колебаний. Маятники';
  const S4 = 'Затухающие колебания';
  const S5 = 'Вынужденные колебания. Резонанс';
  const MISMATCH = '<b>Расхождение с ответом книги.</b> ';
  const TYPO = '<b>Опечатка в формуле книги.</b> ';
  const cs = Math.cos, sn = Math.sin, PI = Math.PI;

  const HARM = { tex: String.raw`x = A\cos(\omega t + \varphi)`, text: 'уравнение гармонических колебаний; ωt + φ — фаза, φ — начальная фаза' };
  const OMEGA = { tex: String.raw`\omega = 2\pi\nu = \frac{2\pi}{T}`, text: 'циклическая частота, частота ν и период T' };
  const VEL = { tex: String.raw`\dot x = -A\omega\sin(\omega t + \varphi)`, text: 'скорость — производная смещения' };
  const ACC = { tex: String.raw`\ddot x = -A\omega^2\cos(\omega t + \varphi) = -\omega^2x`, text: 'ускорение — вторая производная смещения' };
  const ADD = { tex: String.raw`A^2 = A_1^2 + A_2^2 + 2A_1A_2\cos(\varphi_2 - \varphi_1)`, text: 'амплитуда суммы двух колебаний одной частоты по одной прямой' };
  const ADDPH = { tex: String.raw`\operatorname{tg}\varphi = \frac{A_1\sin\varphi_1 + A_2\sin\varphi_2}{A_1\cos\varphi_1 + A_2\cos\varphi_2}`, text: 'начальная фаза суммы (четверть выбираем по знакам числителя и знаменателя)' };
  const PHASOR = { tex: String.raw`\vec A = \vec A_1 + \vec A_2`, text: 'векторная диаграмма: колебание A cos(ωt + φ) — вектор длиной A под углом φ к оси x; колебания складываются как векторы' };
  const KF = { tex: String.raw`F = -kx = -m\omega^2x`, text: 'возвращающая (квазиупругая) сила, k = mω²' };
  const EN = { tex: String.raw`E = \frac{kA^2}{2} = \frac{mA^2\omega^2}{2}`, text: 'полная энергия гармонических колебаний' };
  const SPRING = { tex: String.raw`T = 2\pi\sqrt{\frac mk}`, text: 'период пружинного маятника' };
  const MATH = { tex: String.raw`T = 2\pi\sqrt{\frac lg}`, text: 'период математического маятника' };
  const PHYS = { tex: String.raw`T = 2\pi\sqrt{\frac Lg},\quad L = \frac{J}{ma}`, text: 'физический маятник: J — момент инерции относительно оси, a — расстояние от оси до центра масс, L — приведённая длина' };
  const STEINER = { tex: String.raw`J = J_C + ma^2`, text: 'теорема Штейнера' };
  const DAMP = { tex: String.raw`A(t) = A_0e^{-\delta t},\quad \delta = \frac{r}{2m}`, text: 'амплитуда затухающих колебаний; δ — коэффициент затухания, r — коэффициент сопротивления' };
  const DECR = { tex: String.raw`\theta = \delta T = \ln\frac{A(t)}{A(t + T)}`, text: 'логарифмический декремент затухания' };
  const WDAMP = { tex: String.raw`\omega = \sqrt{\omega_0^2 - \delta^2}`, text: 'циклическая частота затухающих колебаний; ω₀ — собственная' };
  const RES = { tex: String.raw`\omega_\text{рез} = \sqrt{\omega_0^2 - 2\delta^2}`, text: 'резонансная частота' };
  const ARES = { tex: String.raw`A_\text{рез} = \frac{F_0/m}{2\delta\sqrt{\omega_0^2 - \delta^2}}`, text: 'резонансная амплитуда (в «Основных формулах» книги под корнем напечатано «+δ²» — опечатка)' };
  const AFORCE = { tex: String.raw`A = \frac{F_0/m}{\sqrt{(\omega_0^2 - \omega^2)^2 + 4\delta^2\omega^2}}`, text: 'амплитуда вынужденных колебаний' };

  /* плоскость xy в одном масштабе по осям (для траекторий и векторных диаграмм) */
  function plane(X, Y, o) {
    const s = Math.min(250 / (2 * X), 230 / (2 * Y));
    const tk = n => { const r = []; for (let v = -n; v <= n; v++) if (v) r.push(v); return r; };
    return FIG.graph(Object.assign({ w: Math.round(66 + 2 * X * s), h: Math.round(50 + 2 * Y * s), x: [-X, X], y: [-Y, Y],
      xt: tk(Math.floor(X - 0.5)), yt: tk(Math.floor(Y - 0.5)), xl: 'x, см', yl: 'y, см' }, o));
  }
  // траектория x(u), y(u), u = ωt; точка — положение при t = 0, стрелка — куда точка движется дальше
  const traj = (xf, yf, X, Y, o = {}) => () => {
    const p = u => [xf(u), yf(u)], u0 = o.u0 || 0, du = o.du || 0.35;
    return plane(X, Y, Object.assign({ s: [{ f: p, param: true, t: [0, o.U || 2 * PI], n: 400 }],
      dots: [p(u0)], arrows: [[...p(u0 + du), ...p(u0 + 2 * du)]] }, o.g || {}));
  };
  const vec = (A, f) => [A * cs(f), A * sn(f)];
  const circle = R => ({ f: u => [R * cs(u), R * sn(u)], param: true, t: [0, 2 * PI], dash: true });

  window.TASKS.push(

  /* ===================== 6.1 ===================== */
  {
    id: '6.1', chapter: CH, section: S1, page: '111',
    title: 'Период и начальная фаза (cos)',
    given: [[String.raw`x = A\cos\omega(t + \tau)`, ''], [String.raw`\omega = \pi\ \text{с}^{-1}`, ''], [String.raw`\tau = 0{,}2\ \text{с}`, '']],
    find: String.raw`T,\ \varphi \;—\; ?`,
    formulas: [HARM, OMEGA],
    steps: [
      { title: 'Приводим к стандартному виду',
        text: 'Раскроем скобки — получится x = A cos(ωt + φ):',
        tex: String.raw`x = A\cos(\omega t + \omega\tau) \;\Rightarrow\; \varphi = \omega\tau = 0{,}2\pi\ \text{рад} = 36^\circ` },
      { title: 'Период',
        tex: String.raw`T = \frac{2\pi}{\omega} = \frac{2\pi}{\pi} = 2\ \text{с}` },
    ],
    answer: [String.raw`T = 2\ \text{с};\quad \varphi = 0{,}2\pi\ \text{рад} = 36^\circ`],
  },

  /* ===================== 6.2 ===================== */
  {
    id: '6.2', chapter: CH, section: S1, page: '111',
    title: 'Период, частота, фаза (sin)',
    given: [[String.raw`x = A\sin\omega(t + \tau)`, ''], [String.raw`\omega = 2{,}5\pi\ \text{с}^{-1}`, ''], [String.raw`\tau = 0{,}4\ \text{с}`, '']],
    find: String.raw`T,\ \nu,\ \varphi \;—\; ?`,
    formulas: [OMEGA],
    steps: [
      { title: 'Период и частота',
        tex: String.raw`T = \frac{2\pi}{\omega} = \frac{2}{2{,}5} = 0{,}8\ \text{с},\qquad \nu = \frac1T = 1{,}25\ \text{Гц}` },
      { title: 'Начальная фаза',
        text: 'Уравнение записано через синус: x = A sin(ωt + φ), φ = ωτ.',
        tex: String.raw`\varphi = \omega\tau = 2{,}5\pi\cdot0{,}4 = \pi\ \text{рад}` },
    ],
    answer: [String.raw`T = 0{,}8\ \text{с};\quad \nu = 1{,}25\ \text{Гц};\quad \varphi = \pi\ \text{рад}`],
  },

  /* ===================== 6.3 ===================== */
  {
    id: '6.3', chapter: CH, section: S1, page: '111',
    title: 'Начальная фаза по x(0) и знаку скорости (cos)',
    given: [[String.raw`x = A\cos(\omega t + \varphi)`, ''], [String.raw`A = 4\ \text{см}`, '']],
    find: String.raw`\varphi \;—\; ?`,
    formulas: [HARM, VEL, PHASOR],
    figure: () => plane(5, 5, {
      xt: [-4, -2, 2, 4], yt: [-4, -2, 2, 4], s: [circle(4)],
      arrows: [[0, 0, ...vec(4, PI / 3)], [0, 0, ...vec(4, 3 * PI / 4)], [0, 0, ...vec(4, 5 * PI / 3)], [0, 0, ...vec(4, 7 * PI / 6)]],
      txt: [[2.1, 3.9, '1'], [-3.6, 3.3, '2'], [2.1, -4.1, '3'], [-4.6, -2.4, '4']] }),
    figCaption: 'Векторная диаграмма при t = 0: вектор длиной A под углом φ; его проекция на ось x — смещение x(0)',
    steps: [
      { title: 'Два условия на фазу',
        text: String.raw`При $t = 0$: $x(0) = A\cos\varphi$ и $\dot x(0) = -A\omega\sin\varphi$. Косинус даёт два угла; знак скорости выбирает один: $\dot x(0) < 0 \Rightarrow \sin\varphi > 0$ (верхняя половина круга), $\dot x(0) > 0 \Rightarrow \sin\varphi < 0$ (нижняя).` },
      { title: '1) x(0) = 2 см, ẋ < 0',
        tex: String.raw`\cos\varphi = \tfrac12,\ \sin\varphi > 0 \;\Rightarrow\; \varphi = \frac\pi3` },
      { title: '2) x(0) = −2√2 см, ẋ < 0',
        tex: String.raw`\cos\varphi = -\tfrac{\sqrt2}{2},\ \sin\varphi > 0 \;\Rightarrow\; \varphi = \frac{3\pi}4` },
      { title: '3) x(0) = 2 см, ẋ > 0',
        tex: String.raw`\cos\varphi = \tfrac12,\ \sin\varphi < 0 \;\Rightarrow\; \varphi = \frac{5\pi}3` },
      { title: '4) x(0) = −2√3 см, ẋ > 0',
        tex: String.raw`\cos\varphi = -\tfrac{\sqrt3}{2},\ \sin\varphi < 0 \;\Rightarrow\; \varphi = \frac{7\pi}6` },
    ],
    answer: [String.raw`1)\ \tfrac\pi3;\quad 2)\ \tfrac{3\pi}4;\quad 3)\ \tfrac{5\pi}3;\quad 4)\ \tfrac{7\pi}6\ \text{рад}`],
  },

  /* ===================== 6.4 ===================== */
  {
    id: '6.4', chapter: CH, section: S1, page: '111–112',
    title: 'Начальная фаза по x(0) и знаку скорости (sin)',
    given: [[String.raw`x = A\sin(\omega t + \varphi)`, ''], [String.raw`A = 4\ \text{см}`, '']],
    find: String.raw`\varphi \;—\; ?`,
    formulas: [{ tex: String.raw`x = A\sin(\omega t + \varphi),\quad \dot x = A\omega\cos(\omega t + \varphi)`, text: 'колебания, записанные через синус' }, PHASOR],
    figure: () => plane(5, 5, {
      xt: [-4, -2, 2, 4], yt: [-4, -2, 2, 4], s: [circle(4)],
      arrows: [[0, 0, ...vec(4, 5 * PI / 6)], [0, 0, ...vec(4, PI / 3)], [0, 0, ...vec(4, 5 * PI / 4)], [0, 0, ...vec(4, 5 * PI / 3)]],
      txt: [[-4.6, 2.6, '1'], [2.1, 3.9, '2'], [-3.6, -3.5, '3'], [2.1, -4.1, '4']] }),
    figCaption: 'Векторная диаграмма при t = 0: для записи через синус смещение — проекция вектора на ось y',
    steps: [
      { title: 'Два условия на фазу',
        text: String.raw`При $t = 0$: $x(0) = A\sin\varphi$, $\dot x(0) = A\omega\cos\varphi$. Синус даёт два угла, знак скорости — знак косинуса.` },
      { title: '1) x(0) = 2 см, ẋ < 0',
        tex: String.raw`\sin\varphi = \tfrac12,\ \cos\varphi < 0 \;\Rightarrow\; \varphi = \frac{5\pi}6` },
      { title: '2) x(0) = 2√3 см, ẋ > 0',
        tex: String.raw`\sin\varphi = \tfrac{\sqrt3}2,\ \cos\varphi > 0 \;\Rightarrow\; \varphi = \frac\pi3` },
      { title: '3) x(0) = −2√2 см, ẋ < 0',
        tex: String.raw`\sin\varphi = -\tfrac{\sqrt2}2,\ \cos\varphi < 0 \;\Rightarrow\; \varphi = \frac{5\pi}4` },
      { title: '4) x(0) = −2√3 см, ẋ > 0',
        tex: String.raw`\sin\varphi = -\tfrac{\sqrt3}2,\ \cos\varphi > 0 \;\Rightarrow\; \varphi = \frac{5\pi}3` },
    ],
    answer: [String.raw`1)\ \tfrac{5\pi}6;\quad 2)\ \tfrac\pi3;\quad 3)\ \tfrac{5\pi}4;\quad 4)\ \tfrac{5\pi}3\ \text{рад}`],
  },

  /* ===================== 6.5 ===================== */
  {
    id: '6.5', chapter: CH, section: S1, page: '112',
    title: 'Графики x(t), ẋ(t), ẍ(t)',
    given: [[String.raw`A = 2\ \text{см}`, ''], [String.raw`\omega = \pi\ \text{с}^{-1}`, ''], [String.raw`\varphi = \pi/4`, '']],
    find: String.raw`x(t),\ \dot x(t),\ \ddot x(t) \;—\; ?`,
    formulas: [HARM, VEL, ACC],
    figure: () => [
      { yl: 'x, см', a: 2, f: t => 2 * cs(PI * t + PI / 4), yt: [-2, 2] },
      { yl: 'ẋ, см/с', a: 2 * PI, f: t => -2 * PI * sn(PI * t + PI / 4), yt: [-6.28, 6.28] },
      { yl: 'ẍ, см/с²', a: 2 * PI * PI, f: t => -2 * PI * PI * cs(PI * t + PI / 4), yt: [-19.7, 19.7] },
    ].map(o => FIG.graph({ w: 320, h: 140, x: [0, 2.3], y: [-1.25 * o.a, 1.25 * o.a], xt: [0.5, 1, 1.5, 2], yt: o.yt, xl: 't, с', yl: o.yl,
      s: [{ f: o.f, t: [0, 2.2] }] })).join(''),
    figCaption: 'Сверху вниз: смещение, скорость, ускорение. Скорость опережает смещение на π/2, ускорение — на π',
    steps: [
      { title: 'Смещение',
        tex: String.raw`x = 2\cos\left(\pi t + \frac\pi4\right)\ \text{см}` },
      { title: 'Скорость',
        text: 'Амплитуда скорости Aω = 2π ≈ 6,28 см/с.',
        tex: String.raw`\dot x = -2\pi\sin\left(\pi t + \frac\pi4\right) = 2\pi\cos\left(\pi t + \frac{3\pi}4\right)\ \text{см/с}` },
      { title: 'Ускорение',
        text: 'Амплитуда ускорения Aω² = 2π² ≈ 19,7 см/с².',
        tex: String.raw`\ddot x = -2\pi^2\cos\left(\pi t + \frac\pi4\right) = 2\pi^2\cos\left(\pi t + \frac{5\pi}4\right)\ \text{см/с}^2` },
      { title: 'Как строить',
        text: 'Период T = 2π/ω = 2 с. Все три графика — косинусоиды с этим периодом; в начальный момент x(0) = √2 ≈ 1,41 см, ẋ(0) = −4,44 см/с, ẍ(0) = −14,0 см/с². Ускорение всегда противоположно смещению.' },
    ],
    answer: [String.raw`x = 2\cos(\pi t + \tfrac\pi4)\ \text{см}`, String.raw`\dot x = 2\pi\cos(\pi t + \tfrac{3\pi}4)\ \text{см/с}`, String.raw`\ddot x = 2\pi^2\cos(\pi t + \tfrac{5\pi}4)\ \text{см/с}^2`],
  },

  /* ===================== 6.6 ===================== */
  {
    id: '6.6', chapter: CH, section: S1, page: '112',
    title: 'Уравнение колебаний и фаза',
    note: MISMATCH + String.raw`В случае 1 в книге $\frac{5\pi}3$ — так было бы при $x = 2$ см ($\cos\frac{5\pi}3 = \frac12$). При $x = 1$ см $\cos(\omega t + \varphi) = \frac14$, и фаза $2\pi - \arccos\frac14 = 1{,}58\pi$ рад. Случай 2 совпадает.`,
    given: [[String.raw`A = 4\ \text{см}`, ''], [String.raw`T = 2\ \text{с}`, ''], [String.raw`x(0) = 0,\ \dot x(0) < 0`, '']],
    find: String.raw`x(t);\ \omega t + \varphi \;—\; ?`,
    formulas: [HARM, VEL, OMEGA],
    steps: [
      { title: 'Уравнение',
        text: String.raw`$\omega = 2\pi/T = \pi$ с⁻¹. Из $x(0) = A\cos\varphi = 0$ и $\dot x(0) = -A\omega\sin\varphi < 0$: $\cos\varphi = 0$, $\sin\varphi > 0$.`,
        tex: String.raw`\varphi = \frac\pi2,\qquad x = 4\cos\left(\pi t + \frac\pi2\right)\ \text{см}` },
      { title: '1) x = 1 см, ẋ > 0',
        text: String.raw`Фазу $\Phi = \omega t + \varphi$ ищем в пределах одного периода $[0;\ 2\pi)$. $\cos\Phi = x/A$, а $\dot x > 0$ значит $\sin\Phi < 0$.`,
        tex: String.raw`\cos\Phi = \frac14,\ \sin\Phi < 0 \;\Rightarrow\; \Phi = 2\pi - \arccos\frac14 = 2\pi - 1{,}318 = 4{,}97\ \text{рад} = 1{,}58\pi` },
      { title: '2) ẋ = −6 см/с, x < 0',
        text: String.raw`$\dot x = -A\omega\sin\Phi$, а $x < 0$ значит $\cos\Phi < 0$.`,
        tex: String.raw`\sin\Phi = \frac{6}{4\pi} = 0{,}477,\ \cos\Phi < 0 \;\Rightarrow\; \Phi = \pi - 0{,}498 = 2{,}64\ \text{рад} = 0{,}842\pi` },
    ],
    answer: [String.raw`x = 4\cos(\pi t + \tfrac\pi2)\ \text{см}`, String.raw`1)\ \omega t + \varphi = 1{,}58\pi\ \text{рад};\quad 2)\ 0{,}842\pi\ \text{рад}`],
  },

  /* ===================== 6.7 ===================== */
  {
    id: '6.7', chapter: CH, section: S1, page: '112',
    title: 'Проекция точки, бегущей по окружности',
    given: [[String.raw`T = 6\ \text{с}`, ''], [String.raw`d = 20\ \text{см}`, ''], [String.raw`x(0) = 0`, ''], [String.raw`t = 1\ \text{с}`, '']],
    find: String.raw`x(t);\ x,\ \dot x,\ \ddot x \;—\; ?`,
    formulas: [HARM, VEL, ACC, OMEGA],
    steps: [
      { title: 'Почему проекция колеблется',
        text: String.raw`Радиус-вектор точки поворачивается с угловой скоростью $\omega = 2\pi/T$; его проекция на ось $x$ — $R\cos(\omega t + \varphi)$, т. е. гармоническое колебание с амплитудой $R = d/2$.`,
        tex: String.raw`A = 10\ \text{см},\qquad \omega = \frac{2\pi}{6} = \frac\pi3\ \text{с}^{-1}` },
      { title: 'Начальная фаза',
        text: String.raw`$x(0) = 0$ — точка в верхней или нижней точке окружности. Возьмём верхнюю (как в книге): движение против часовой стрелки уводит её влево, $x$ убывает.`,
        tex: String.raw`\varphi = \frac\pi2,\qquad x = 10\cos\left(\frac\pi3t + \frac\pi2\right)\ \text{см}` },
      { title: 'При t = 1 с',
        text: String.raw`Фаза $\frac\pi3 + \frac\pi2 = \frac{5\pi}6$.`,
        tex: String.raw`x = 10\cos\tfrac{5\pi}6 = -8{,}66\ \text{см},\quad \dot x = -10\cdot\tfrac\pi3\sin\tfrac{5\pi}6 = -5{,}24\ \text{см/с},\quad \ddot x = -\omega^2x = 9{,}50\ \text{см/с}^2` },
    ],
    answer: [String.raw`x = 10\cos(\tfrac\pi3t + \tfrac\pi2)\ \text{см}`, String.raw`x = -8{,}66\ \text{см};\quad \dot x = -5{,}24\ \text{см/с};\quad \ddot x = 9{,}50\ \text{см/с}^2`],
  },

  /* ===================== 6.8 ===================== */
  {
    id: '6.8', chapter: CH, section: S1, page: '112',
    title: 'Максимальные скорость и ускорение',
    given: [[String.raw`A = 3\ \text{см}`, ''], [String.raw`\omega = \pi/2\ \text{с}^{-1}`, '']],
    find: String.raw`\dot x_{\max},\ \ddot x_{\max} \;—\; ?`,
    formulas: [VEL, ACC],
    steps: [
      { title: 'Амплитуды скорости и ускорения',
        text: 'Синус и косинус по модулю не больше 1.',
        tex: String.raw`\dot x_{\max} = A\omega = 3\cdot1{,}571 = 4{,}71\ \text{см/с},\qquad \ddot x_{\max} = A\omega^2 = 3\cdot2{,}467 = 7{,}40\ \text{см/с}^2` },
    ],
    answer: [String.raw`\dot x_{\max} = A\omega = 4{,}71\ \text{см/с};\quad \ddot x_{\max} = A\omega^2 = 7{,}40\ \text{см/с}^2`],
  },

  /* ===================== 6.9 ===================== */
  {
    id: '6.9', chapter: CH, section: S1, page: '112',
    title: 'Ускорение при заданной скорости',
    given: [[String.raw`A = 5\ \text{см}`, ''], [String.raw`\omega = 2\ \text{с}^{-1}`, ''], [String.raw`\dot x = 8\ \text{см/с}`, '']],
    find: String.raw`|\ddot x| \;—\; ?`,
    formulas: [VEL, ACC],
    steps: [
      { title: 'Связь x и ẋ',
        text: String.raw`$\cos^2 + \sin^2 = 1$: $\left(\frac{x}{A}\right)^2 + \left(\frac{\dot x}{A\omega}\right)^2 = 1$.`,
        tex: String.raw`|x| = \sqrt{A^2 - \frac{\dot x^2}{\omega^2}} = \sqrt{25 - 16} = 3\ \text{см}` },
      { title: 'Ускорение',
        tex: String.raw`|\ddot x| = \omega^2|x| = \omega\sqrt{\omega^2A^2 - \dot x^2} = 4\cdot3 = 12\ \text{см/с}^2` },
    ],
    answer: [String.raw`|\ddot x| = \omega\sqrt{\omega^2A^2 - \dot x^2} = 12\ \text{см/с}^2`],
  },

  /* ===================== 6.10 ===================== */
  {
    id: '6.10', chapter: CH, section: S1, page: '112',
    title: 'Частота по xmax и vmax',
    given: [[String.raw`x_{\max} = A = 10\ \text{см}`, ''], [String.raw`\dot x_{\max} = 20\ \text{см/с}`, '']],
    find: String.raw`\omega,\ \ddot x_{\max} \;—\; ?`,
    formulas: [VEL, ACC],
    steps: [
      { title: 'Частота',
        tex: String.raw`\dot x_{\max} = A\omega \;\Rightarrow\; \omega = \frac{20}{10} = 2\ \text{с}^{-1}` },
      { title: 'Максимальное ускорение',
        tex: String.raw`\ddot x_{\max} = A\omega^2 = 10\cdot4 = 40\ \text{см/с}^2` },
    ],
    answer: [String.raw`\omega = 2\ \text{с}^{-1};\quad \ddot x_{\max} = 40\ \text{см/с}^2`],
  },

  /* ===================== 6.11 ===================== */
  {
    id: '6.11', chapter: CH, section: S1, page: '112',
    title: 'Частота, период, амплитуда по vmax и amax',
    given: [[String.raw`\dot x_{\max} = 10\ \text{см/с}`, ''], [String.raw`\ddot x_{\max} = 100\ \text{см/с}^2`, '']],
    find: String.raw`\omega,\ T,\ A,\ x(t) \;—\; ?`,
    formulas: [VEL, ACC, OMEGA],
    steps: [
      { title: 'Делим одно на другое',
        tex: String.raw`\frac{\ddot x_{\max}}{\dot x_{\max}} = \frac{A\omega^2}{A\omega} = \omega = 10\ \text{с}^{-1}` },
      { title: 'Период и амплитуда',
        tex: String.raw`T = \frac{2\pi}{\omega} = 0{,}628\ \text{с},\qquad A = \frac{\dot x_{\max}}{\omega} = 1\ \text{см}` },
      { title: 'Уравнение',
        tex: String.raw`x = 1\cdot\cos10t\ \text{см}` },
    ],
    answer: [String.raw`\omega = 10\ \text{с}^{-1};\quad T = 0{,}628\ \text{с};\quad A = 1\ \text{см};\quad x = A\cos\omega t`],
  },

  /* ===================== 6.12 ===================== */
  {
    id: '6.12', chapter: CH, section: S1, page: '112',
    title: 'Амплитуда по двум смещениям',
    given: [[String.raw`x = A\sin\omega t`, ''], [String.raw`x_1 = 5\ \text{см}`, ''], [String.raw`x_2 = 8\ \text{см}\ (\text{фаза вдвое больше})`, '']],
    find: String.raw`A \;—\; ?`,
    formulas: [{ tex: String.raw`\sin2\Phi = 2\sin\Phi\cos\Phi`, text: 'синус двойного угла' }],
    steps: [
      { title: 'Два уравнения',
        tex: String.raw`x_1 = A\sin\Phi,\qquad x_2 = A\sin2\Phi = 2A\sin\Phi\cos\Phi = 2x_1\cos\Phi` },
      { title: 'Косинус и синус фазы',
        tex: String.raw`\cos\Phi = \frac{x_2}{2x_1} = 0{,}8,\qquad \sin\Phi = 0{,}6` },
      { title: 'Амплитуда',
        tex: String.raw`A = \frac{x_1}{\sin\Phi} = \frac{2x_1^2}{\sqrt{4x_1^2 - x_2^2}} = \frac{5}{0{,}6} = 8{,}33\ \text{см}` },
    ],
    answer: [String.raw`A = \frac{2x_1^2}{\sqrt{4x_1^2 - x_2^2}} = 8{,}33\ \text{см}`],
  },

  /* ===================== 6.13 ===================== */
  {
    id: '6.13', chapter: CH, section: S1, page: '112',
    title: 'Всё по x, ẋ, ẍ в один момент',
    note: MISMATCH + String.raw`В книге фаза $+\frac\pi4$ — взят только $\arccos\frac xA$. Но скорость положительна, а $\dot x = -A\omega\sin(\omega t + \varphi)$, значит синус фазы отрицателен: фаза $-\frac\pi4$ (или $\frac{7\pi}4$). При $+\frac\pi4$ скорость была бы $-20$ см/с. Ещё в формуле для $A$ в книге пропущено деление на $\omega^2$: $A = \sqrt{x^2 + \dot x^2/\omega^2}$.`,
    given: [[String.raw`x = 5\ \text{см}`, ''], [String.raw`\dot x = 20\ \text{см/с}`, ''], [String.raw`\ddot x = -80\ \text{см/с}^2`, '']],
    find: String.raw`A,\ \omega,\ T,\ \omega t + \varphi \;—\; ?`,
    formulas: [HARM, VEL, ACC],
    steps: [
      { title: 'Частота',
        tex: String.raw`\ddot x = -\omega^2x \;\Rightarrow\; \omega = \sqrt{-\frac{\ddot x}{x}} = \sqrt{16} = 4\ \text{с}^{-1},\qquad T = \frac{2\pi}\omega = 1{,}57\ \text{с}` },
      { title: 'Амплитуда',
        tex: String.raw`A = \sqrt{x^2 + \frac{\dot x^2}{\omega^2}} = \sqrt{25 + 25} = 7{,}07\ \text{см}` },
      { title: 'Фаза',
        text: String.raw`$\cos\Phi = x/A = 0{,}707$; $\sin\Phi = -\dot x/(A\omega) = -0{,}707$ — четвёртая четверть.`,
        tex: String.raw`\omega t + \varphi = -\frac\pi4\ \left(\text{или}\ \frac{7\pi}4\right)` },
    ],
    answer: [String.raw`\omega = 4\ \text{с}^{-1};\quad T = 1{,}57\ \text{с};\quad A = 7{,}07\ \text{см};\quad \omega t + \varphi = -\tfrac\pi4\ \text{рад}`],
  },

  /* ===================== 6.14 ===================== */
  {
    id: '6.14', chapter: CH, section: S2, page: '112–113',
    title: 'Разность фаз по амплитудам',
    given: [[String.raw`A_1 = 10\ \text{см}`, ''], [String.raw`A_2 = 6\ \text{см}`, ''], [String.raw`A = 14\ \text{см}`, '']],
    find: String.raw`\Delta\varphi \;—\; ?`,
    formulas: [ADD],
    steps: [
      { title: 'Из формулы сложения',
        tex: String.raw`\cos\Delta\varphi = \frac{A^2 - A_1^2 - A_2^2}{2A_1A_2} = \frac{196 - 100 - 36}{120} = \frac12 \;\Rightarrow\; \Delta\varphi = \frac\pi3` },
    ],
    answer: [String.raw`\Delta\varphi = \tfrac\pi3\ \text{рад}`],
  },

  /* ===================== 6.15 ===================== */
  {
    id: '6.15', chapter: CH, section: S2, page: '113',
    title: 'Сумма той же амплитуды',
    given: [[String.raw`A_1 = A_2 = A`, '']],
    find: String.raw`\Delta\varphi \;—\; ?`,
    formulas: [ADD],
    steps: [
      { title: 'Подставляем',
        tex: String.raw`A^2 = 2A^2 + 2A^2\cos\Delta\varphi \;\Rightarrow\; \cos\Delta\varphi = -\frac12` },
      { title: 'Два ответа',
        text: 'На векторной диаграмме три одинаковых вектора образуют равносторонний треугольник: второй вектор повёрнут относительно первого на 120° в любую сторону.',
        tex: String.raw`\Delta\varphi = \frac{2\pi}3\quad\text{или}\quad\Delta\varphi = \frac{4\pi}3` },
    ],
    answer: [String.raw`\Delta\varphi = \tfrac{2\pi}3\ \text{или}\ \tfrac{4\pi}3\ \text{рад}`],
  },

  /* ===================== 6.16 ===================== */
  {
    id: '6.16', chapter: CH, section: S2, page: '113',
    title: 'Сумма синусоид со сдвигом',
    note: MISMATCH + String.raw`В книге $\varphi = \frac\pi4$ и «$x = A\cos(\omega t + \varphi)$». Но $+\frac\pi4$ — это фаза в записи через синус: $x = \sqrt2\sin(\pi t + \frac\pi4)$. Через косинус то же колебание: $x = \sqrt2\cos(\pi t - \frac\pi4)$, т. е. $\varphi = -\frac\pi4$. Амплитуда совпадает.`,
    given: [[String.raw`x_1 = A_1\sin\omega t`, ''], [String.raw`x_2 = A_2\sin\omega(t + \tau)`, ''], [String.raw`A_1 = A_2 = 1\ \text{см}`, ''], [String.raw`\omega = \pi\ \text{с}^{-1},\ \tau = 0{,}5\ \text{с}`, '']],
    find: String.raw`A,\ \varphi,\ x(t) \;—\; ?`,
    formulas: [ADD, ADDPH],
    steps: [
      { title: 'Сдвиг фазы',
        tex: String.raw`\omega\tau = \frac\pi2:\qquad x_2 = \sin\left(\pi t + \frac\pi2\right) = \cos\pi t` },
      { title: 'Складываем',
        text: 'Разность фаз π/2 — векторы перпендикулярны.',
        tex: String.raw`x = \sin\pi t + \cos\pi t = \sqrt2\sin\left(\pi t + \frac\pi4\right) = \sqrt2\cos\left(\pi t - \frac\pi4\right)` },
      { title: 'Ответ',
        tex: String.raw`A = \sqrt2 = 1{,}41\ \text{см},\qquad \varphi = -\frac\pi4\ (\text{в записи через косинус})` },
    ],
    answer: [String.raw`A = 1{,}41\ \text{см};\quad \varphi = -\tfrac\pi4`, String.raw`x = 1{,}41\cos(\pi t - \tfrac\pi4)\ \text{см}`, String.raw`\text{или}\ x = 1{,}41\sin(\pi t + \tfrac\pi4)\ \text{см}`],
  },

  /* ===================== 6.17 ===================== */
  {
    id: '6.17', chapter: CH, section: S2, page: '113',
    title: 'Сумма синуса и косинуса',
    note: MISMATCH + String.raw`В книге $\varphi = 0{,}353\pi$ при записи $x = A\cos(\omega t + \varphi)$. Но $0{,}353\pi = \operatorname{arctg}2$ — это фаза в записи через синус: $x = \sqrt5\sin(t + 0{,}353\pi)$. Через косинус: $x = \sqrt5\cos(t - 0{,}148\pi)$. При $\varphi = +0{,}353\pi$ в косинусе было бы $x(0) = 1$ см, а на самом деле $x(0) = A_2 = 2$ см. $A$ и $\nu$ совпадают.`,
    given: [[String.raw`x_1 = A_1\sin\omega t,\ x_2 = A_2\cos\omega t`, ''], [String.raw`A_1 = 1\ \text{см},\ A_2 = 2\ \text{см}`, ''], [String.raw`\omega = 1\ \text{с}^{-1}`, '']],
    find: String.raw`A,\ \nu,\ \varphi,\ x(t) \;—\; ?`,
    formulas: [ADD, ADDPH],
    steps: [
      { title: 'Записываем через косинус',
        text: String.raw`$\sin\omega t = \cos(\omega t - \frac\pi2)$: первое колебание — вектор длиной 1 под углом $-\frac\pi2$, второе — длиной 2 под углом 0.` },
      { title: 'Амплитуда и частота',
        tex: String.raw`A = \sqrt{A_1^2 + A_2^2} = \sqrt5 = 2{,}24\ \text{см},\qquad \nu = \frac{\omega}{2\pi} = 0{,}159\ \text{Гц}` },
      { title: 'Фаза',
        tex: String.raw`\operatorname{tg}\varphi = \frac{-A_1}{A_2} = -\frac12 \;\Rightarrow\; \varphi = -0{,}464\ \text{рад} = -0{,}148\pi` },
      { title: 'Проверка',
        text: 'При t = 0: x = 0 + 2 = 2 см, и √5·cos(−0,464) = 2,24·0,894 = 2 см — сходится.' },
    ],
    answer: [String.raw`A = 2{,}24\ \text{см};\quad \nu = 0{,}159\ \text{Гц}`, String.raw`x = 2{,}24\cos(t - 0{,}148\pi)\ \text{см}`, String.raw`\text{или}\ x = 2{,}24\sin(t + 0{,}353\pi)\ \text{см}`],
  },

  /* ===================== 6.18 ===================== */
  {
    id: '6.18', chapter: CH, section: S2, page: '113',
    title: 'Два колебания: диаграмма',
    given: [[String.raw`T = 1{,}5\ \text{с}`, ''], [String.raw`A_1 = A_2 = 2\ \text{см}`, ''], [String.raw`\varphi_1 = \pi/2,\ \varphi_2 = \pi/3`, '']],
    find: String.raw`A,\ \varphi,\ x(t) \;—\; ?`,
    formulas: [ADD, ADDPH, PHASOR],
    figure: () => plane(4.5, 4.5, { xt: [-4, -2, 2, 4], yt: [-4, -2, 2, 4],
      arrows: [[0, 0, 0, 2], [0, 2, 1, 2 + Math.sqrt(3)], [0, 0, 1, 2 + Math.sqrt(3), true]],
      txt: [[-1.1, 1, 'A₁'], [0.6, 2.4, 'A₂'], [0.9, 4.1, 'A', 'tx sm ax-t']] }),
    figCaption: 'Векторная диаграмма: A₂ пристроен к концу A₁, результирующий вектор A — синий',
    steps: [
      { title: 'Амплитуда',
        text: 'Амплитуды равны — ромб, результат по биссектрисе.',
        tex: String.raw`A = 2A_1\cos\frac{\varphi_1 - \varphi_2}{2} = 4\cos\frac\pi{12} = 3{,}86\ \text{см}` },
      { title: 'Фаза и частота',
        tex: String.raw`\varphi = \frac{\varphi_1 + \varphi_2}{2} = \frac{5\pi}{12} = 0{,}417\pi,\qquad \omega = \frac{2\pi}{T} = 4{,}19\ \text{с}^{-1}` },
    ],
    answer: [String.raw`A = 3{,}86\ \text{см};\quad \varphi = 0{,}417\pi\ \text{рад};\quad x = 3{,}86\cos(4{,}19t + 0{,}417\pi)\ \text{см}`],
  },

  /* ===================== 6.19 ===================== */
  {
    id: '6.19', chapter: CH, section: S2, page: '113',
    title: 'Три колебания: диаграмма',
    given: [[String.raw`T = 2\ \text{с}`, ''], [String.raw`A_1 = A_2 = A_3 = 3\ \text{см}`, ''], [String.raw`\varphi_1 = 0,\ \varphi_2 = \pi/3,\ \varphi_3 = 2\pi/3`, '']],
    find: String.raw`A,\ \varphi,\ x(t) \;—\; ?`,
    formulas: [PHASOR],
    figure: () => plane(6.5, 6.5, { xt: [-6, -3, 3, 6], yt: [-6, -3, 3, 6],
      arrows: [[0, 0, 3, 0], [3, 0, 4.5, 2.598], [4.5, 2.598, 3, 5.196], [0, 0, 3, 5.196, true]],
      txt: [[1.2, -0.9, 'A₁'], [4.2, 1, 'A₂'], [4.1, 4.5, 'A₃'], [0.8, 3.4, 'A', 'tx sm ax-t']] }),
    figCaption: 'Векторы A₁, A₂, A₃ — половина правильного шестиугольника; A — синий',
    steps: [
      { title: 'Строим диаграмму',
        text: 'Векторы по 3 см под углами 0, 60°, 120°, приставленные друг к другу, — три стороны правильного шестиугольника. Результирующий вектор — его большая диагональ: 2 × 3 = 6 см, направлен под углом 60° (симметрично среднему вектору).' },
      { title: 'Проверка расчётом',
        tex: String.raw`A = 3(1 + 2\cos60^\circ) = 6\ \text{см},\qquad \varphi = \frac\pi3,\qquad \omega = \frac{2\pi}{T} = \pi\ \text{с}^{-1}` },
    ],
    answer: [String.raw`A = 6\ \text{см};\quad \varphi = \tfrac\pi3\ \text{рад};\quad x = 6\cos(\pi t + \tfrac\pi3)\ \text{см}`],
  },

  /* ===================== 6.20 ===================== */
  {
    id: '6.20', chapter: CH, section: S2, page: '113',
    title: 'Сложение аналитически и на диаграмме',
    given: [[String.raw`1)\ A_1 = 1\ \text{см},\ \varphi_1 = \pi/3;\ A_2 = 2\ \text{см},\ \varphi_2 = 5\pi/6`, ''], [String.raw`2)\ A_1 = A_2 = 1\ \text{см};\ \varphi_1 = 2\pi/3,\ \varphi_2 = 7\pi/6`, '']],
    find: String.raw`A,\ \varphi,\ x(t) \;—\; ?`,
    formulas: [ADD, ADDPH, PHASOR],
    figure: () => [
      plane(2.5, 2.5, { xt: [-2, -1, 1, 2], yt: [-2, -1, 1, 2],
        arrows: [[0, 0, ...vec(1, PI / 3)], [...vec(1, PI / 3), 0.5 - Math.sqrt(3), 0.866 + 1], [0, 0, 0.5 - Math.sqrt(3), 1.866, true]],
        txt: [[0.6, 0.4, 'A₁'], [-0.4, 1.95, 'A₂'], [-1.2, 0.7, 'A', 'tx sm ax-t'], [-2.4, -2.1, '1)']] }),
      plane(2, 2, { xt: [-1, 1], yt: [-1, 1],
        arrows: [[0, 0, ...vec(1, 2 * PI / 3)], [...vec(1, 2 * PI / 3), -0.5 - 0.866, 0.866 - 0.5], [0, 0, -1.366, 0.366, true]],
        txt: [[-0.2, 0.6, 'A₁'], [-1.5, 0.7, 'A₂'], [-1.2, -0.3, 'A', 'tx sm ax-t'], [-1.9, -1.7, '2)']] }),
    ].join(''),
    figCaption: 'Векторные диаграммы для t = 0; результирующий вектор — синий',
    steps: [
      { title: '1) Амплитуда',
        text: 'Разность фаз 5π/6 − π/3 = π/2 — векторы перпендикулярны.',
        tex: String.raw`A = \sqrt{1 + 4} = 2{,}24\ \text{см}` },
      { title: '1) Фаза',
        text: 'Числитель положителен, знаменатель отрицателен — вторая четверть.',
        tex: String.raw`\operatorname{tg}\varphi = \frac{0{,}866 + 1}{0{,}5 - 1{,}732} = \frac{1{,}866}{-1{,}232} \;\Rightarrow\; \varphi = \pi - 0{,}987 = 2{,}15\ \text{рад} = 0{,}686\pi` },
      { title: '2) Амплитуда и фаза',
        text: 'Разность фаз снова π/2, амплитуды равны — результат посередине между векторами.',
        tex: String.raw`A = \sqrt2 = 1{,}41\ \text{см},\qquad \varphi = \frac{2\pi/3 + 7\pi/6}{2} = \frac{11\pi}{12} = 0{,}917\pi` },
    ],
    answer: [String.raw`1)\ x = 2{,}24\cos(\omega t + 0{,}686\pi)\ \text{см}`, String.raw`2)\ x = 1{,}41\cos(\omega t + 0{,}917\pi)\ \text{см}`],
  },

  /* ===================== 6.21 ===================== */
  {
    id: '6.21', chapter: CH, section: S2, page: '113',
    title: 'Биения камертонов',
    given: [[String.raw`\nu_1 = 440\ \text{Гц}`, ''], [String.raw`\nu_2 = 440{,}5\ \text{Гц}`, '']],
    find: String.raw`T_\text{б} \;—\; ?`,
    formulas: [{ tex: String.raw`\nu_\text{б} = |\nu_1 - \nu_2|`, text: 'частота биений' }],
    steps: [
      { title: 'Период биений',
        tex: String.raw`T_\text{б} = \frac{1}{|\nu_1 - \nu_2|} = \frac{1}{0{,}5} = 2\ \text{с}` },
    ],
    answer: [String.raw`T_\text{б} = 2\ \text{с}`],
  },

  /* ===================== 6.22 ===================== */
  {
    id: '6.22', chapter: CH, section: S2, page: '113',
    title: 'Траектория: отрезок y = −x/2',
    given: [[String.raw`x = A_1\sin\omega t,\ y = A_2\cos\omega(t + \tau)`, ''], [String.raw`A_1 = 2\ \text{см},\ A_2 = 1\ \text{см}`, ''], [String.raw`\omega = \pi\ \text{с}^{-1},\ \tau = 0{,}5\ \text{с}`, '']],
    find: String.raw`y(x) \;—\; ?`,
    formulas: [{ tex: String.raw`\cos(\alpha + \tfrac\pi2) = -\sin\alpha`, text: 'формула приведения' }],
    figure: traj(u => 2 * sn(u), u => -sn(u), 3, 2),
    figCaption: 'Точка ходит по отрезку от (−2; 1) до (2; −1); при t = 0 — в начале координат, движется вправо-вниз',
    steps: [
      { title: 'Упрощаем y',
        tex: String.raw`y = \cos\left(\pi t + \frac\pi2\right) = -\sin\pi t` },
      { title: 'Исключаем время',
        tex: String.raw`\sin\pi t = \frac x2 \;\Rightarrow\; y = -\frac{A_2}{A_1}x = -\frac x2` },
      { title: 'Направление',
        text: 'Колебания в фазе (противофазе) — точка ходит туда-обратно по отрезку прямой. При t = 0 она в начале координат и затем идёт к точке (2; −1).' },
    ],
    answer: [String.raw`y = -\tfrac{A_2}{A_1}x = -\tfrac12 x,\quad |x| \le 2\ \text{см}`],
  },

  /* ===================== 6.23 ===================== */
  {
    id: '6.23', chapter: CH, section: S2, page: '114',
    title: 'Траектория: отрезок y = −2x',
    given: [[String.raw`x = A_1\cos\omega t,\ y = A_2\cos\omega(t + \tau)`, ''], [String.raw`A_1 = 4\ \text{см},\ A_2 = 8\ \text{см}`, ''], [String.raw`\omega = \pi\ \text{с}^{-1},\ \tau = 1\ \text{с}`, '']],
    find: String.raw`y(x) \;—\; ?`,
    formulas: [{ tex: String.raw`\cos(\alpha + \pi) = -\cos\alpha`, text: 'формула приведения' }],
    figure: traj(u => 4 * cs(u), u => -8 * cs(u), 5, 9, { g: { xt: [-4, -2, 2, 4], yt: [-8, -4, 4, 8] } }),
    figCaption: 'Отрезок от (4; −8) до (−4; 8); при t = 0 точка в (4; −8)',
    steps: [
      { title: 'Сдвиг фаз π',
        tex: String.raw`\omega\tau = \pi:\quad y = 8\cos(\pi t + \pi) = -8\cos\pi t` },
      { title: 'Траектория',
        tex: String.raw`y = -\frac{A_2}{A_1}x = -2x,\qquad |x| \le 4\ \text{см}` },
    ],
    answer: [String.raw`y = -\tfrac{A_2}{A_1}x = -2x`],
  },

  /* ===================== 6.24 ===================== */
  {
    id: '6.24', chapter: CH, section: S2, page: '114',
    title: 'Восемь траекторий одной частоты',
    given: [[String.raw`A = 2\ \text{см},\ A_1 = 3\ \text{см},\ A_2 = 1\ \text{см}`, ''], [String.raw`\varphi_1 = \pi/2,\ \varphi_2 = \pi`, '']],
    find: String.raw`y(x) \;—\; ?`,
    formulas: [{ tex: String.raw`\frac{x^2}{a^2} + \frac{y^2}{b^2} - \frac{2xy}{ab}\cos\Delta\varphi = \sin^2\Delta\varphi`, text: 'траектория при сложении перпендикулярных колебаний одной частоты (a, b — амплитуды по x и y)' }],
    figure: () => '<div style="display:grid;grid-template-columns:1fr 1fr;gap:6px">' + [
      [u => 2 * cs(u), u => 2 * cs(u)], [u => 2 * cs(u), u => 3 * cs(u)], [u => 2 * cs(u), u => -2 * sn(u)], [u => cs(u), u => -2 * cs(u)],
      [u => 3 * cs(u), u => 3 * sn(u)], [u => 2 * cs(u), u => 3 * sn(u)], [u => sn(u), u => 3 * sn(u)], [u => sn(u), u => -2 * sn(u)],
    ].map(([xf, yf], k) => traj(xf, yf, 4, 4, { g: { xt: [-3, 3], yt: [-3, 3], xl: 'x', yl: 'y', txt: [[-3.9, 3.4, (k + 1) + ')']] } })()).join('') + '</div>',
    figCaption: 'Точка — положение при t = 0, стрелка — направление движения',
    steps: [
      { title: '1) x = 2cos ωt, y = 2cos ωt',
        tex: String.raw`y = x\ \ (\text{отрезок},\ |x| \le 2)` },
      { title: '2) x = 2cos ωt, y = 3cos ωt',
        tex: String.raw`y = \tfrac32x\ \ (\text{отрезок})` },
      { title: '3) x = 2cos ωt, y = 2cos(ωt + π/2) = −2sin ωt',
        text: 'Окружность; при t = 0 точка в (2; 0), затем y < 0 — движение по часовой стрелке.',
        tex: String.raw`x^2 + y^2 = 4` },
      { title: '4) x = cos ωt, y = 2cos(ωt + π) = −2cos ωt',
        tex: String.raw`y = -2x\ \ (\text{отрезок})` },
      { title: '5) x = 3cos ωt, y = 3sin ωt',
        text: 'Окружность, против часовой стрелки.',
        tex: String.raw`x^2 + y^2 = 9` },
      { title: '6) x = 2cos ωt, y = 3sin ωt',
        text: 'Эллипс, против часовой стрелки.',
        tex: String.raw`\frac{x^2}{4} + \frac{y^2}{9} = 1` },
      { title: '7) x = sin ωt, y = 3sin ωt',
        tex: String.raw`y = 3x\ \ (\text{отрезок})` },
      { title: '8) x = sin ωt, y = 2sin(ωt + π) = −2sin ωt',
        tex: String.raw`y = -2x\ \ (\text{отрезок})` },
      { title: 'Про буквы в ответе книги',
        text: 'В общих формулах ответа книги A₁ и A₂ — амплитуды по x и по y (как в «Основных формулах»), а не буквы из условия. Числовые уравнения книги совпадают с полученными здесь.' },
    ],
    answer: [
      String.raw`1)\ y = x;\quad 2)\ y = \tfrac32x;\quad 3)\ x^2 + y^2 = 4;\quad 4)\ y = -2x`,
      String.raw`5)\ x^2 + y^2 = 9;\quad 6)\ \tfrac{x^2}{4} + \tfrac{y^2}{9} = 1;\quad 7)\ y = 3x;\quad 8)\ y = -2x`,
    ],
  },

  /* ===================== 6.25 ===================== */
  {
    id: '6.25', chapter: CH, section: S2, page: '114',
    title: 'Эллипс 2 × 1 см',
    given: [[String.raw`x = A_1\cos\omega t,\ y = A_2\sin\omega t`, ''], [String.raw`A_1 = 2\ \text{см},\ A_2 = 1\ \text{см}`, '']],
    find: String.raw`y(x) \;—\; ?`,
    formulas: [{ tex: String.raw`\cos^2\alpha + \sin^2\alpha = 1`, text: 'исключаем время' }],
    figure: traj(u => 2 * cs(u), u => sn(u), 3, 2),
    figCaption: 'При t = 0 точка в (2; 0), движется против часовой стрелки',
    steps: [
      { title: 'Исключаем время',
        tex: String.raw`\frac{x^2}{A_1^2} + \frac{y^2}{A_2^2} = \cos^2\omega t + \sin^2\omega t = 1 \;\Rightarrow\; \frac{x^2}{4} + y^2 = 1` },
      { title: 'Направление',
        text: 'При t = 0: (2; 0); чуть позже y > 0, x убывает — против часовой стрелки.' },
    ],
    answer: [String.raw`\frac{x^2}{4} + \frac{y^2}{1} = 1\ \ (\text{против часовой стрелки})`],
  },

  /* ===================== 6.26 ===================== */
  {
    id: '6.26', chapter: CH, section: S2, page: '114',
    title: 'Эллипс 0,5 × 2 см',
    given: [[String.raw`x = A_1\sin\omega t,\ y = A_2\cos\omega t`, ''], [String.raw`A_1 = 0{,}5\ \text{см},\ A_2 = 2\ \text{см}`, '']],
    find: String.raw`y(x) \;—\; ?`,
    formulas: [{ tex: String.raw`\cos^2\alpha + \sin^2\alpha = 1`, text: 'исключаем время' }],
    figure: traj(u => 0.5 * sn(u), u => 2 * cs(u), 1, 2.5, { g: { xt: [-0.5, 0.5] } }),
    figCaption: 'При t = 0 точка в (0; 2), движется по часовой стрелке',
    steps: [
      { title: 'Исключаем время',
        tex: String.raw`\frac{x^2}{0{,}25} + \frac{y^2}{4} = 1` },
      { title: 'Направление',
        text: 'При t = 0: (0; 2); затем x > 0, y убывает — по часовой стрелке.' },
    ],
    answer: [String.raw`\frac{x^2}{0{,}25} + \frac{y^2}{4} = 1\ \ (\text{по часовой стрелке})`],
  },

  /* ===================== 6.27 ===================== */
  {
    id: '6.27', chapter: CH, section: S2, page: '114',
    title: 'Эллипс и скорость точки',
    note: MISMATCH + String.raw`В книге $v = 13{,}7$ «м/с». Амплитуды даны в сантиметрах, поэтому $v = 13{,}7$ см/с $= 0{,}137$ м/с — в книге ошибка в единицах.`,
    given: [[String.raw`x = A_1\sin\omega t,\ y = A_2\sin\omega(t + \tau)`, ''], [String.raw`A_1 = 10\ \text{см},\ A_2 = 5\ \text{см}`, ''], [String.raw`\omega = 2\ \text{с}^{-1},\ \tau = \pi/4\ \text{с}`, ''], [String.raw`t = 0{,}5\ \text{с}`, '']],
    find: String.raw`y(x),\ v \;—\; ?`,
    formulas: [{ tex: String.raw`v = \sqrt{\dot x^2 + \dot y^2}`, text: 'модуль скорости по проекциям' }],
    figure: traj(u => 10 * sn(u), u => 5 * cs(u), 12, 7, { g: { xt: [-10, -5, 5, 10], yt: [-5, 5],
      arrows: [[10 * sn(1), 5 * cs(1), 10 * sn(1) + 0.35 * 20 * cs(1), 5 * cs(1) - 0.35 * 10 * sn(1), true]],
      txt: [[8.6, 4.2, 't = 0,5 с', 'tx sm ax-t']] } }),
    figCaption: 'Синяя стрелка — скорость при t = 0,5 с',
    steps: [
      { title: 'Траектория',
        tex: String.raw`\omega\tau = \frac\pi2:\ y = 5\cos2t \;\Rightarrow\; \frac{x^2}{100} + \frac{y^2}{25} = 1` },
      { title: 'Проекции скорости',
        tex: String.raw`\dot x = 20\cos2t,\quad \dot y = -10\sin2t;\qquad t = 0{,}5\ \text{с}:\ \dot x = 10{,}8,\ \dot y = -8{,}41\ \text{см/с}` },
      { title: 'Скорость',
        tex: String.raw`v = \sqrt{10{,}8^2 + 8{,}41^2} = 13{,}7\ \text{см/с} = 0{,}137\ \text{м/с}` },
    ],
    answer: [String.raw`\frac{x^2}{100} + \frac{y^2}{25} = 1;\quad v = 13{,}7\ \text{см/с}`],
  },

  /* ===================== 6.28 ===================== */
  {
    id: '6.28', chapter: CH, section: S2, page: '114',
    title: 'Удвоенная частота: парабола',
    note: TYPO + String.raw`В общей формуле книги $y = -2\frac{A_2}{A_1}x^2 + A_2$ пропущен квадрат: должно быть $-2\frac{A_2}{A_1^2}x^2 + A_2$. Числовое уравнение $y = -\frac12x^2 + 1$ верное.`,
    given: [[String.raw`x = A_1\cos\omega t,\ y = -A_2\cos2\omega t`, ''], [String.raw`A_1 = 2\ \text{см},\ A_2 = 1\ \text{см}`, '']],
    find: String.raw`y(x) \;—\; ?`,
    formulas: [{ tex: String.raw`\cos2\alpha = 2\cos^2\alpha - 1`, text: 'косинус двойного угла' }],
    figure: traj(u => 2 * cs(u), u => -cs(2 * u), 3, 2),
    figCaption: 'Дуга параболы между точками (−2; −1) и (2; −1); точка ходит по ней туда-обратно',
    steps: [
      { title: 'Исключаем время',
        tex: String.raw`y = -A_2\left(2\cos^2\omega t - 1\right) = -A_2\left(\frac{2x^2}{A_1^2} - 1\right) = 1 - \frac{x^2}{2}` },
      { title: 'Какая часть параболы',
        text: 'x меняется только от −2 до 2 см, поэтому траектория — дуга параболы от (−2; −1) через вершину (0; 1) до (2; −1).' },
    ],
    answer: [String.raw`y = -\frac{2A_2}{A_1^2}x^2 + A_2 = -\tfrac12x^2 + 1,\quad |x| \le 2\ \text{см}`],
  },

  /* ===================== 6.29 ===================== */
  {
    id: '6.29', chapter: CH, section: S2, page: '114–115',
    title: 'Четыре траектории (кратные частоты)',
    note: MISMATCH + String.raw`Случай 1 совпадает. Случай 2: для $y = A\sin2\omega t$ траектория — «восьмёрка» $y^2 = x^2\left(4 - x^2\right)$; ответ книги $y = x^2 - 2$ — для $y = A\cos2\omega t$. Случай 3: по условию $x = 4y^2/9 - 2$; в книге формула искажена ($2Ay - A_1x^2 = AA_1$ вместо $2Ay^2 - A_1^2x = AA_1^2$) и число $y = \frac34x^2 + \frac32$ неверное. Случай 4: по условию — эллипс $\frac{x^2}{9} + \frac{y^2}{4} = 1$; ответ книги $x = \frac32y\sqrt{4 - y^2}$ — для $x = A_1\sin2\omega t$. Возможно, в условии книги опечатки; здесь решено по напечатанному условию, а траектории из ответа книги разобраны в последних шагах.`,
    given: [[String.raw`A = 2\ \text{см}`, ''], [String.raw`A_1 = 3\ \text{см}`, '']],
    find: String.raw`y(x) \;—\; ?`,
    formulas: [{ tex: String.raw`\cos2\alpha = 1 - 2\sin^2\alpha = 2\cos^2\alpha - 1,\quad \sin2\alpha = 2\sin\alpha\cos\alpha`, text: 'формулы двойного угла' }],
    figure: () => '<div style="display:grid;grid-template-columns:1fr 1fr;gap:6px">' + [
      [u => 2 * sn(u), u => 2 * cs(2 * u), 3, 3], [u => 2 * cs(u), u => 2 * sn(2 * u), 3, 3],
      [u => 2 * cs(2 * u), u => 3 * cs(u), 4, 4], [u => 3 * sn(u), u => 2 * cs(u), 4, 4],
    ].map(([xf, yf, X, Y], k) => traj(xf, yf, X, Y, { g: { xt: [-2, 2], yt: [-2, 2], xl: 'x', yl: 'y', txt: [[-X * 0.97, Y * 0.85, (k + 1) + ')']] } })()).join('') + '</div>',
    figCaption: 'Траектории по условию; точка — положение при t = 0, стрелка — направление движения',
    steps: [
      { title: '1) x = 2sin ωt, y = 2cos 2ωt',
        text: 'Дуга параболы от (−2; −2) до (2; −2); при t = 0 точка в вершине (0; 2), движется вправо.',
        tex: String.raw`y = A\left(1 - 2\sin^2\omega t\right) = A - \frac{2x^2}{A} = 2 - x^2` },
      { title: '2) x = 2cos ωt, y = 2sin 2ωt',
        text: 'Фигура Лиссажу «восьмёрка»: при t = 0 точка в (2; 0), сначала уходит вверх.',
        tex: String.raw`y = 2A\sin\omega t\cos\omega t = \pm x\sqrt{4 - x^2},\quad\text{т. е.}\ y^2 = x^2(4 - x^2)` },
      { title: '3) x = 2cos 2ωt, y = 3cos ωt',
        text: 'Дуга параболы, лежащей «на боку», от (2; −3) до (2; 3); при t = 0 точка в (2; 3).',
        tex: String.raw`x = A\left(\frac{2y^2}{A_1^2} - 1\right) \;\Rightarrow\; 2Ay^2 - A_1^2x = AA_1^2,\quad x = \frac49y^2 - 2` },
      { title: '4) x = 3sin ωt, y = 2cos ωt',
        text: 'Эллипс; при t = 0 точка в (0; 2), движется по часовой стрелке.',
        tex: String.raw`\frac{x^2}{9} + \frac{y^2}{4} = 1` },
      { title: 'Откуда ответы книги для 2 и 4',
        text: String.raw`Если в случае 2 взять $y = A\cos2\omega t$, то $y = A(2\cos^2\omega t - 1) = \frac{2x^2}{A} - A = x^2 - 2$ — ответ книги. Если в случае 4 взять $x = A_1\sin2\omega t$, то $x = 2A_1\sin\omega t\cos\omega t = \frac{2A_1}{A}y\sqrt{1 - \frac{y^2}{A^2}} = \frac32y\sqrt{4 - y^2}$ — тоже ответ книги.` },
    ],
    answer: [
      String.raw`1)\ y = 2 - x^2;\quad 2)\ y^2 = x^2(4 - x^2)`,
      String.raw`3)\ x = \tfrac49y^2 - 2;\quad 4)\ \tfrac{x^2}{9} + \tfrac{y^2}{4} = 1`,
    ],
  },

  /* ===================== 6.30 ===================== */
  {
    id: '6.30', chapter: CH, section: S2, page: '115',
    title: 'Половинная частота: парабола',
    note: TYPO + String.raw`В ответе книги напечатано $y = \frac{A_2^2}{2A_1}(A_1 - x)$ и «$x = \frac94(2 - x)$». Слева должно стоять $y^2$: $y^2 = \frac{A_2^2}{2A_1}(A_1 - x) = \frac94(2 - x)$.`,
    given: [[String.raw`x = A_1\cos\omega t,\ y = A_2\sin0{,}5\omega t`, ''], [String.raw`A_1 = 2\ \text{см},\ A_2 = 3\ \text{см}`, '']],
    find: String.raw`y(x) \;—\; ?`,
    formulas: [{ tex: String.raw`\cos2\alpha = 1 - 2\sin^2\alpha`, text: 'косинус двойного угла' }],
    figure: traj(u => 2 * cs(u), u => 3 * sn(u / 2), 3, 4, { U: 4 * PI, du: 0.5, g: { yt: [-3, -2, -1, 1, 2, 3] } }),
    figCaption: 'Дуга параболы от (−2; −3) до (−2; 3); при t = 0 точка в (2; 0), сначала идёт вверх',
    steps: [
      { title: 'Исключаем время',
        text: String.raw`Обозначим $\alpha = 0{,}5\omega t$, тогда $\omega t = 2\alpha$.`,
        tex: String.raw`x = A_1(1 - 2\sin^2\alpha) = A_1\left(1 - \frac{2y^2}{A_2^2}\right) \;\Rightarrow\; y^2 = \frac{A_2^2}{2A_1}(A_1 - x) = \frac94(2 - x)` },
      { title: 'Движение',
        text: 'Полный обход занимает два периода колебания по x (4π/ω). Точка идёт от (2; 0) вверх по параболе до (−2; 3), возвращается в (2; 0), уходит вниз до (−2; −3) и снова возвращается.' },
    ],
    answer: [String.raw`y^2 = \frac{A_2^2}{2A_1}(A_1 - x) = \tfrac94(2 - x)`],
  },

  /* ===================== 6.31 ===================== */
  {
    id: '6.31', chapter: CH, section: S2, page: '115',
    title: 'Фигуры Лиссажу на осциллографе',
    given: [[String.raw`A = 4\ \text{см}`, ''], [String.raw`1)\ x = A\sin3\omega t,\ y = A\sin2\omega t`, ''], [String.raw`2)\ x = A\sin3\omega t,\ y = A\cos2\omega t`, ''], [String.raw`3)\ x = A\sin3\omega t,\ y = A\cos\omega t`, '']],
    find: String.raw`\text{траектории} \;—\; ?`,
    formulas: [{ tex: String.raw`\frac{\nu_x}{\nu_y} = \frac{n_\text{в}}{n_\text{г}}`, text: 'отношение частот: n_в — сколько раз фигура касается вертикальной стороны квадрата, n_г — горизонтальной' }],
    figure: () => '<div style="display:grid;grid-template-columns:1fr 1fr;gap:6px">' + [
      [u => 4 * sn(3 * u), u => 4 * sn(2 * u)], [u => 4 * sn(3 * u), u => 4 * cs(2 * u)], [u => 4 * sn(3 * u), u => 4 * cs(u)],
    ].map(([xf, yf], k) => traj(xf, yf, 5, 5, { du: 0.12, g: { xt: [-4, 4], yt: [-4, 4], xl: 'x', yl: 'y', txt: [[-4.9, 4.4, (k + 1) + ')']] } })()).join('') + '</div>',
    figCaption: 'Фигуры Лиссажу, построенные по точкам; точка — положение при t = 0',
    steps: [
      { title: 'Графический метод',
        text: 'Делим период на равные доли (например, по 1/24 периода самого медленного колебания), для каждого момента находим x и y и отмечаем точку; соединяем точки плавной линией. Фигура вписана в квадрат 8 × 8 см.' },
      { title: '1) частоты 3 : 2, обе через синус',
        text: 'Кривая касается каждой вертикальной стороны квадрата 3 раза, каждой горизонтальной — 2 раза; при t = 0 точка в начале координат.' },
      { title: '2) 3 : 2, y через косинус',
        text: 'Та же пара частот со сдвигом фазы на π/2 — фигура другой формы, при t = 0 точка в (0; 4).' },
      { title: '3) частоты 3 : 1',
        text: 'Кривая касается каждой вертикальной стороны по три раза, горизонтальной — по одному: «змейка», при t = 0 точка в (0; 4).' },
    ],
    answer: [String.raw`\text{Фигуры Лиссажу — см. рисунок (в книге ответа нет)}`],
  },

  /* ===================== 6.32 ===================== */
  {
    id: '6.32', chapter: CH, section: S3, page: '115',
    title: 'Сила при заданной фазе',
    given: [[String.raw`m = 50\ \text{г}`, String.raw`0{,}05\ \text{кг}`], [String.raw`A = 10\ \text{см}`, String.raw`0{,}1\ \text{м}`], [String.raw`\omega = 5\ \text{с}^{-1}`, '']],
    find: String.raw`F \;—\; ?`,
    formulas: [KF],
    steps: [
      { title: 'Сила по второму закону Ньютона',
        tex: String.raw`F = m\ddot x = -m\omega^2A\cos\omega t` },
      { title: '1) ωt = π/3',
        tex: String.raw`F = -0{,}05\cdot25\cdot0{,}1\cdot0{,}5 = -62{,}5\ \text{мН}` },
      { title: '2) наибольшее смещение x = A',
        tex: String.raw`F = -m\omega^2A = -125\ \text{мН}` },
      { title: 'Знак',
        text: 'Минус — сила направлена к положению равновесия, против смещения.' },
    ],
    answer: [String.raw`1)\ F = -62{,}5\ \text{мН};\quad 2)\ F = -125\ \text{мН}`],
  },

  /* ===================== 6.33 ===================== */
  {
    id: '6.33', chapter: CH, section: S3, page: '115',
    title: 'Наибольшие сила и кинетическая энергия',
    given: [[String.raw`m = 0{,}1\ \text{г}`, String.raw`10^{-4}\ \text{кг}`], [String.raw`A = 5\ \text{см}`, String.raw`0{,}05\ \text{м}`], [String.raw`\omega = 20\ \text{с}^{-1}`, '']],
    find: String.raw`F_{\max},\ T_{\max} \;—\; ?`,
    formulas: [KF, EN],
    steps: [
      { title: 'Сила — наибольшая при x = A',
        tex: String.raw`F_{\max} = m\omega^2A = 10^{-4}\cdot400\cdot0{,}05 = 2\cdot10^{-3}\ \text{Н} = 2\ \text{мН}` },
      { title: 'Кинетическая энергия — наибольшая при x = 0',
        text: 'В положении равновесия вся энергия кинетическая.',
        tex: String.raw`T_{\max} = \frac{m(A\omega)^2}{2} = \frac{10^{-4}\cdot1^2}{2} = 5\cdot10^{-5}\ \text{Дж} = 50\ \text{мкДж}` },
    ],
    answer: [String.raw`F_{\max} = 2\ \text{мН};\quad T_{\max} = 50\ \text{мкДж}`],
  },

  /* ===================== 6.34 ===================== */
  {
    id: '6.34', chapter: CH, section: S3, page: '115',
    title: 'Сила и полная энергия',
    given: [[String.raw`A = 20\ \text{см}`, String.raw`0{,}2\ \text{м}`], [String.raw`\omega = 2\pi/3\ \text{с}^{-1}`, ''], [String.raw`m = 10\ \text{г}`, String.raw`0{,}01\ \text{кг}`], [String.raw`t = 1\ \text{с}`, '']],
    find: String.raw`F,\ E \;—\; ?`,
    formulas: [KF, EN],
    steps: [
      { title: 'Сила при t = 1 с',
        text: 'Фаза ωt = 2π/3, cos(2π/3) = −0,5 — точка по другую сторону от равновесия, сила положительна.',
        tex: String.raw`F = -m\omega^2A\cos\omega t = -0{,}01\cdot4{,}39\cdot0{,}2\cdot(-0{,}5) = 4{,}39\ \text{мН}` },
      { title: 'Полная энергия',
        tex: String.raw`E = \frac{mA^2\omega^2}{2} = \frac{0{,}01\cdot0{,}04\cdot4{,}39}{2} = 877\ \text{мкДж}` },
    ],
    answer: [String.raw`F = 4{,}39\ \text{мН};\quad E = 877\ \text{мкДж}`],
  },

  /* ===================== 6.35 ===================== */
  {
    id: '6.35', chapter: CH, section: S3, page: '115',
    title: 'Момент по силе и энергии',
    given: [[String.raw`A = 8\ \text{см}`, ''], [String.raw`\omega = \pi/6\ \text{с}^{-1}`, ''], [String.raw`F = -5\ \text{мН}`, String.raw`-5\cdot10^{-3}\ \text{Н}`], [String.raw`\Pi = 100\ \text{мкДж}`, String.raw`10^{-4}\ \text{Дж}`]],
    find: String.raw`t,\ \omega t \;—\; ?`,
    formulas: [KF, { tex: String.raw`\Pi = \frac{kx^2}{2}`, text: 'потенциальная энергия колебаний' }],
    steps: [
      { title: 'Смещение',
        text: 'F = −kx и Π = kx²/2, значит Π = −Fx/2:',
        tex: String.raw`x = -\frac{2\Pi}{F} = \frac{2\cdot10^{-4}}{5\cdot10^{-3}} = 0{,}04\ \text{м} = 4\ \text{см}` },
      { title: 'Фаза и время',
        text: 'Первый раз x = A/2 — при наименьшей положительной фазе.',
        tex: String.raw`\cos\omega t = \frac{4}{8} = \frac12 \;\Rightarrow\; \omega t = \frac\pi3,\qquad t = \frac{\pi/3}{\pi/6} = 2\ \text{с}` },
    ],
    answer: [String.raw`t = 2\ \text{с};\quad \omega t = \tfrac\pi3`],
  },

  /* ===================== 6.36 ===================== */
  {
    id: '6.36', chapter: CH, section: S3, page: '115',
    title: 'Жёсткость пружины по периоду',
    given: [[String.raw`m = 250\ \text{г}`, String.raw`0{,}25\ \text{кг}`], [String.raw`T = 1\ \text{с}`, '']],
    find: String.raw`k \;—\; ?`,
    formulas: [SPRING],
    steps: [
      { title: 'Из формулы периода',
        tex: String.raw`k = \frac{4\pi^2m}{T^2} = 4\cdot9{,}87\cdot0{,}25 = 9{,}87\ \text{Н/м}` },
    ],
    answer: [String.raw`k = \frac{4\pi^2m}{T^2} = 9{,}87\ \text{Н/м}`],
  },

  /* ===================== 6.37 ===================== */
  {
    id: '6.37', chapter: CH, section: S3, page: '115',
    title: 'Период по растяжению пружины',
    given: [[String.raw`x = 9\ \text{см}`, String.raw`0{,}09\ \text{м}`]],
    find: String.raw`T \;—\; ?`,
    formulas: [SPRING, { tex: String.raw`kx = mg`, text: 'в равновесии сила упругости равна силе тяжести' }],
    steps: [
      { title: 'Отношение m/k',
        tex: String.raw`\frac mk = \frac xg` },
      { title: 'Период',
        text: 'Ни масса, ни жёсткость не нужны — только растяжение.',
        tex: String.raw`T = 2\pi\sqrt{\frac xg} = 2\pi\sqrt{\frac{0{,}09}{9{,}81}} = 0{,}60\ \text{с}` },
    ],
    answer: [String.raw`T = 2\pi\sqrt{x/g} = 0{,}60\ \text{с}`],
  },

  /* ===================== 6.38 ===================== */
  {
    id: '6.38', chapter: CH, section: S3, page: '116',
    title: 'Энергия гири на пружине',
    given: [[String.raw`A = 4\ \text{см}`, String.raw`0{,}04\ \text{м}`], [String.raw`k = 1\ \text{кН/м}`, String.raw`10^3\ \text{Н/м}`]],
    find: String.raw`E \;—\; ?`,
    formulas: [EN],
    steps: [
      { title: 'Полная энергия',
        tex: String.raw`E = \frac{kA^2}{2} = \frac{1000\cdot0{,}0016}{2} = 0{,}8\ \text{Дж}` },
    ],
    answer: [String.raw`E = 0{,}8\ \text{Дж}`],
  },

  /* ===================== 6.39 ===================== */
  {
    id: '6.39', chapter: CH, section: S3, page: '116',
    title: 'Отношение длин маятников',
    note: TYPO + String.raw`В ответе книги перед дробью напечатан минус: $\frac{l_1}{l_2} = -\left(\frac{T_1}{T_2}\right)^2$. Отношение длин положительно: $2{,}25$.`,
    given: [[String.raw`T_1/T_2 = 1{,}5`, '']],
    find: String.raw`l_1/l_2 \;—\; ?`,
    formulas: [MATH],
    steps: [
      { title: 'Период пропорционален √l',
        tex: String.raw`\frac{T_1}{T_2} = \sqrt{\frac{l_1}{l_2}} \;\Rightarrow\; \frac{l_1}{l_2} = \left(\frac{T_1}{T_2}\right)^2 = 2{,}25` },
    ],
    answer: [String.raw`l_1/l_2 = (T_1/T_2)^2 = 2{,}25`],
  },

  /* ===================== 6.40 ===================== */
  {
    id: '6.40', chapter: CH, section: S3, page: '116',
    title: 'Маятник в лифте',
    given: [[String.raw`l = 1\ \text{м}`, ''], [String.raw`a = 2{,}5\ \text{м/с}^2\ (\text{вверх})`, '']],
    find: String.raw`T \;—\; ?`,
    formulas: [MATH, { tex: String.raw`g_\text{эф} = g + a`, text: 'в лифте, ускоряющемся вверх, «вес» больше' }],
    steps: [
      { title: 'Эффективное ускорение',
        text: 'В системе лифта на грузик кроме тяжести действует сила инерции ma вниз — как будто ускорение свободного падения равно g + a.' },
      { title: 'Период',
        tex: String.raw`T = 2\pi\sqrt{\frac{l}{g + a}} = 2\pi\sqrt{\frac{1}{12{,}31}} = 1{,}79\ \text{с} \approx 1{,}8\ \text{с}` },
    ],
    answer: [String.raw`T = 2\pi\sqrt{l/(g + a)} = 1{,}8\ \text{с}`],
  },

  /* ===================== 6.41 ===================== */
  {
    id: '6.41', chapter: CH, section: S3, page: '116',
    title: 'Стержень с грузиками на концах',
    given: [[String.raw`l = 30\ \text{см}`, String.raw`0{,}3\ \text{м}`], [String.raw`d = 10\ \text{см}`, String.raw`0{,}1\ \text{м}`]],
    find: String.raw`L,\ T \;—\; ?`,
    formulas: [PHYS],
    steps: [
      { title: 'Момент инерции и центр масс',
        text: String.raw`Грузики (по $m$) — на расстояниях $d$ и $l - d$ от оси. Центр масс — середина стержня, от оси $a = \frac l2 - d$; масса системы $2m$.`,
        tex: String.raw`J = m\left[d^2 + (l - d)^2\right],\qquad a = \frac l2 - d = 0{,}05\ \text{м}` },
      { title: 'Приведённая длина',
        tex: String.raw`L = \frac{J}{2ma} = \frac{d^2 + (l - d)^2}{l - 2d} = \frac{l^2 - 2d(l - d)}{l - 2d} = \frac{0{,}01 + 0{,}04}{0{,}1} = 0{,}5\ \text{м}` },
      { title: 'Период',
        tex: String.raw`T = 2\pi\sqrt{\frac{0{,}5}{9{,}81}} = 1{,}42\ \text{с}` },
    ],
    answer: [String.raw`L = 50\ \text{см};\quad T = 1{,}42\ \text{с}`],
  },

  /* ===================== 6.42 ===================== */
  {
    id: '6.42', chapter: CH, section: S3, page: '116',
    title: 'Грузики в середине и на конце',
    given: [[String.raw`l = 30\ \text{см}`, String.raw`0{,}3\ \text{м}`]],
    find: String.raw`L,\ T \;—\; ?`,
    formulas: [PHYS],
    steps: [
      { title: 'Момент инерции и центр масс',
        text: 'Ось — у свободного конца, грузики на расстояниях l/2 и l.',
        tex: String.raw`J = m\frac{l^2}{4} + ml^2 = \frac54ml^2,\qquad a = \frac{l/2 + l}{2} = \frac34l` },
      { title: 'Приведённая длина и период',
        tex: String.raw`L = \frac{J}{2ma} = \frac{5/4}{3/2}\,l = \frac56l = 25\ \text{см},\qquad T = 2\pi\sqrt{\frac{0{,}25}{9{,}81}} = 1{,}0\ \text{с}` },
    ],
    answer: [String.raw`L = \tfrac56l = 25\ \text{см};\quad T = 1{,}0\ \text{с}`],
  },

  /* ===================== 6.43 ===================== */
  {
    id: '6.43', chapter: CH, section: S3, page: '116',
    title: 'Три груза на стержнях (рис. 6.6)',
    given: [[String.raw`l = 30\ \text{см}`, String.raw`0{,}3\ \text{м}`], [String.raw`\text{три груза по } m`, '']],
    find: String.raw`T \;—\; ?`,
    formulas: [PHYS],
    steps: [
      { title: 'Момент инерции',
        text: 'Все три груза — на расстоянии l от оси O.',
        tex: String.raw`J = 3ml^2` },
      { title: 'Центр масс',
        text: 'Два горизонтальных груза симметричны и на уровне оси; нижний — на l ниже.',
        tex: String.raw`a = \frac{m\cdot l}{3m} = \frac l3` },
      { title: 'Период',
        tex: String.raw`L = \frac{3ml^2}{3m\cdot l/3} = 3l,\qquad T = 2\pi\sqrt{\frac{3l}{g}} = 2\pi\sqrt{\frac{0{,}9}{9{,}81}} = 1{,}90\ \text{с}` },
    ],
    answer: [String.raw`T = 2\pi\sqrt{3l/g} = 1{,}90\ \text{с}`],
  },

  /* ===================== 6.44 ===================== */
  {
    id: '6.44', chapter: CH, section: S3, page: '116',
    title: 'Обруч на гвозде',
    given: [[String.raw`R = 30\ \text{см}`, String.raw`0{,}3\ \text{м}`]],
    find: String.raw`T \;—\; ?`,
    formulas: [PHYS, STEINER],
    steps: [
      { title: 'Момент инерции относительно гвоздя',
        text: 'Ось обруча через центр — mR², гвоздь на ободе на расстоянии R.',
        tex: String.raw`J = mR^2 + mR^2 = 2mR^2,\qquad a = R` },
      { title: 'Период',
        tex: String.raw`L = 2R,\qquad T = 2\pi\sqrt{\frac{2R}{g}} = 2\pi\sqrt{\frac{0{,}6}{9{,}81}} = 1{,}55\ \text{с}` },
    ],
    answer: [String.raw`T = 2\pi\sqrt{2R/g} = 1{,}55\ \text{с}`],
  },

  /* ===================== 6.45 ===================== */
  {
    id: '6.45', chapter: CH, section: S3, page: '116',
    title: 'Диск: ось на ободе',
    given: [[String.raw`R = 30\ \text{см}`, String.raw`0{,}3\ \text{м}`]],
    find: String.raw`T \;—\; ?`,
    formulas: [PHYS, STEINER],
    steps: [
      { title: 'Момент инерции',
        tex: String.raw`J = \frac{mR^2}{2} + mR^2 = \frac32mR^2,\qquad a = R,\qquad L = \frac32R` },
      { title: 'Период',
        tex: String.raw`T = 2\pi\sqrt{\frac{3R}{2g}} = 2\pi\sqrt{\frac{0{,}45}{9{,}81}} = 1{,}35\ \text{с}` },
    ],
    answer: [String.raw`T = 2\pi\sqrt{3R/(2g)} = 1{,}35\ \text{с}`],
  },

  /* ===================== 6.46 ===================== */
  {
    id: '6.46', chapter: CH, section: S3, page: '117',
    title: 'Диск: ось через середину радиуса',
    given: [[String.raw`R = 24\ \text{см}`, String.raw`0{,}24\ \text{м}`]],
    find: String.raw`L,\ T \;—\; ?`,
    formulas: [PHYS, STEINER],
    steps: [
      { title: 'Момент инерции',
        tex: String.raw`J = \frac{mR^2}{2} + m\frac{R^2}{4} = \frac34mR^2,\qquad a = \frac R2` },
      { title: 'Приведённая длина и период',
        tex: String.raw`L = \frac{3R}{2} = 36\ \text{см},\qquad T = 2\pi\sqrt{\frac{0{,}36}{9{,}81}} = 1{,}2\ \text{с}` },
    ],
    answer: [String.raw`L = 36\ \text{см};\quad T = 1{,}2\ \text{с}`],
  },

  /* ===================== 6.47 ===================== */
  {
    id: '6.47', chapter: CH, section: S3, page: '117',
    title: 'Диск с вырезом',
    given: [[String.raw`R = 20\ \text{см}`, String.raw`0{,}2\ \text{м}`], [String.raw`r = 10\ \text{см}`, String.raw`0{,}1\ \text{м}`]],
    find: String.raw`T \;—\; ?`,
    formulas: [PHYS, STEINER, { tex: String.raw`J = J_\text{д} - J_\text{выр}`, text: 'вырез — «отрицательная масса»' }],
    steps: [
      { title: 'Массы',
        text: String.raw`По рис. 6.7 ось $O$ — на ободе; вырезанный круг касается обода в той же точке, его центр $O_2$ на расстоянии $r$ от $O$, центр диска $O_1$ — на $R$. Масса пропорциональна площади: $M \propto R^2$, $m' \propto r^2$.` },
      { title: 'Момент инерции относительно O',
        tex: String.raw`J = \frac32MR^2 - \frac32m'r^2 \;\propto\; \frac32\left(R^4 - r^4\right)` },
      { title: 'Центр масс',
        tex: String.raw`a = \frac{MR - m'r}{M - m'} = \frac{R^3 - r^3}{R^2 - r^2} = \frac{R^2 + Rr + r^2}{R + r}` },
      { title: 'Приведённая длина',
        tex: String.raw`L = \frac{J}{(M - m')a} = \frac{3(R^2 + r^2)(R + r)}{2(R^2 + Rr + r^2)} = \frac{3\cdot0{,}05\cdot0{,}3}{2\cdot0{,}07} = 0{,}321\ \text{м}` },
      { title: 'Период',
        tex: String.raw`T = 2\pi\sqrt{\frac{0{,}321}{9{,}81}} = 1{,}14\ \text{с}` },
    ],
    answer: [String.raw`T = 2\pi\sqrt{\frac{3(R^2 + r^2)(R + r)}{2g(R^2 + Rr + r^2)}} = 1{,}14\ \text{с}`],
  },

  /* ===================== 6.48 ===================== */
  {
    id: '6.48', chapter: CH, section: S3, page: '117',
    title: 'Стержень синхронно с маятником',
    given: [[String.raw`l_1 = 40\ \text{см}`, String.raw`0{,}4\ \text{м}`], [String.raw`l_2 = 60\ \text{см}`, String.raw`0{,}6\ \text{м}`]],
    find: String.raw`a \;—\; ?`,
    formulas: [PHYS, MATH, STEINER],
    steps: [
      { title: 'Условие синхронности',
        text: 'Периоды равны, если приведённая длина стержня равна длине математического маятника.',
        tex: String.raw`L = \frac{\frac{l_2^2}{12} + a^2}{a} = l_1 \;\Rightarrow\; a^2 - l_1a + \frac{l_2^2}{12} = 0` },
      { title: 'Два корня',
        tex: String.raw`a = \frac12\left(l_1 \pm \sqrt{l_1^2 - \frac{l_2^2}{3}}\right) = \frac{0{,}4 \pm 0{,}2}{2}:\quad a_1 = 10\ \text{см},\ a_2 = 30\ \text{см}` },
      { title: 'Оба годятся',
        text: 'a ≤ l₂/2 = 30 см — ось лежит на стержне. a = 30 см — ось у конца стержня.' },
    ],
    answer: [String.raw`a_1 = 10\ \text{см};\quad a_2 = 30\ \text{см}`],
  },

  /* ===================== 6.49 ===================== */
  {
    id: '6.49', chapter: CH, section: S3, page: '117',
    title: 'Наименьший период стержня',
    given: [[String.raw`l = 120\ \text{см}`, '']],
    find: String.raw`a \;—\; ?`,
    formulas: [PHYS, STEINER],
    steps: [
      { title: 'Приведённая длина как функция a',
        tex: String.raw`L(a) = \frac{l^2}{12a} + a` },
      { title: 'Минимум',
        text: 'Производная равна нулю:',
        tex: String.raw`-\frac{l^2}{12a^2} + 1 = 0 \;\Rightarrow\; a = \frac{l}{2\sqrt3} = \frac{120}{3{,}464} = 34{,}6\ \text{см}` },
    ],
    answer: [String.raw`a = l/(2\sqrt3) = 34{,}6\ \text{см}`],
  },

  /* ===================== 6.50 ===================== */
  {
    id: '6.50', chapter: CH, section: S3, page: '117',
    title: 'Стержень с шариком: 4 случая',
    note: TYPO + String.raw`В случае г) в книге $T = 2\pi\sqrt{(7/3)(l/g)}$ — так было бы 3,06 с. Должно быть $\frac7{12}$: $T = 2\pi\sqrt{\frac{7l}{12g}} = 1{,}53$ с; число книги верное.`,
    given: [[String.raw`l = 1\ \text{м}`, ''], [String.raw`m_\text{ст} = m_\text{ш} = m`, '']],
    find: String.raw`T \;—\; ?`,
    formulas: [PHYS, STEINER, { tex: String.raw`J_\text{ст} = \frac{ml^2}{12} + md^2`, text: 'стержень, d — от оси до середины' }],
    steps: [
      { title: 'Схема расчёта',
        text: String.raw`Для каждого случая: $J = J_\text{ст} + mr^2$ (r — от оси до шарика), центр масс $a = \frac{d + r}{2}$ (масса $2m$), $L = \frac{J}{2ma}$.` },
      { title: 'а) O на конце, шарик на другом конце (d = l/2, r = l)',
        tex: String.raw`J = \frac43ml^2,\ a = \frac34l,\ L = \frac89l,\quad T = 2\pi\sqrt{\frac{8l}{9g}} = 1{,}89\ \text{с}` },
      { title: 'б) O посередине, шарик на конце (d = 0, r = l/2)',
        tex: String.raw`J = \frac13ml^2,\ a = \frac l4,\ L = \frac23l,\quad T = 2\pi\sqrt{\frac{2l}{3g}} = 1{,}64\ \text{с}` },
      { title: 'в) O на l/3 от верха, шарик на l/3 от низа (d = l/6, r = l/3)',
        tex: String.raw`J = \frac29ml^2,\ a = \frac l4,\ L = \frac49l,\quad T = \frac43\pi\sqrt{\frac lg} = 1{,}34\ \text{с}` },
      { title: 'г) O на конце, шарик посередине (d = r = l/2)',
        tex: String.raw`J = \frac7{12}ml^2,\ a = \frac l2,\ L = \frac7{12}l,\quad T = 2\pi\sqrt{\frac{7l}{12g}} = 1{,}53\ \text{с}` },
    ],
    answer: [String.raw`а)\ 1{,}89\ \text{с};\quad б)\ 1{,}64\ \text{с};\quad в)\ 1{,}34\ \text{с};\quad г)\ 1{,}53\ \text{с}`],
  },

  /* ===================== 6.51 ===================== */
  {
    id: '6.51', chapter: CH, section: S3, page: '117',
    title: 'Стержень с двумя шариками: 4 случая',
    given: [[String.raw`l = 1\ \text{м}`, ''], [String.raw`m_\text{ст} = m;\ \text{шарики } m\ \text{и}\ 2m`, '']],
    find: String.raw`\nu \;—\; ?`,
    formulas: [PHYS, STEINER, { tex: String.raw`\nu = \frac1{2\pi}\sqrt{\frac gL}`, text: 'частота физического маятника' }],
    steps: [
      { title: 'Схема расчёта',
        text: String.raw`Масса системы $4m$. Расстояния — от оси $O$, вниз положительно (рис. 6.9). $J = \frac{ml^2}{12} + md^2 + \sum m_ir_i^2$, $a = \frac{\sum m_ir_i}{4m}$, $L = \frac{J}{4ma}$.` },
      { title: 'а) m вверху (−l/2), O посередине, 2m внизу (+l/2)',
        tex: String.raw`J = \frac56ml^2,\ a = \frac l8,\ L = \frac53l,\quad \nu = \frac1{2\pi}\sqrt{\frac{3g}{5l}} = 0{,}386\ \text{Гц}` },
      { title: 'б) O вверху, m посередине, 2m внизу',
        tex: String.raw`J = \frac{31}{12}ml^2,\ a = \frac34l,\ L = \frac{31}{36}l,\quad \nu = \frac3\pi\sqrt{\frac{g}{31l}} = 0{,}537\ \text{Гц}` },
      { title: 'в) O посередине (там же m), 2m внизу',
        tex: String.raw`J = \frac7{12}ml^2,\ a = \frac l4,\ L = \frac7{12}l,\quad \nu = \frac1\pi\sqrt{\frac{3g}{7l}} = 0{,}653\ \text{Гц}` },
      { title: 'г) O вверху, 2m посередине, m внизу',
        tex: String.raw`J = \frac{11}6ml^2,\ a = \frac58l,\ L = \frac{11}{15}l,\quad \nu = \frac1{2\pi}\sqrt{\frac{15g}{11l}} = 0{,}582\ \text{Гц}` },
    ],
    answer: [String.raw`а)\ 0{,}386;\quad б)\ 0{,}537;\quad в)\ 0{,}653;\quad г)\ 0{,}582\ \text{Гц}`],
  },

  /* ===================== 6.52 ===================== */
  {
    id: '6.52', chapter: CH, section: S3, page: '118',
    title: 'Момент инерции по двум периодам',
    given: [[String.raw`m = 4\ \text{кг}`, ''], [String.raw`T_1 = 0{,}8\ \text{с},\ T_2 = 1{,}2\ \text{с}`, ''], [String.raw`R = 20\ \text{см}`, String.raw`0{,}2\ \text{м}`]],
    find: String.raw`J \;—\; ?`,
    formulas: [{ tex: String.raw`T = 2\pi\sqrt{\frac{J}{mga}}`, text: 'период физического маятника' }, { tex: String.raw`J_\text{д} = \frac{mR^2}{2}`, text: 'диск' }],
    steps: [
      { title: 'Что меняет диск',
        text: 'Центр диска на оси — он не меняет момент силы тяжести (произведение mga прежнее), но добавляет момент инерции mR²/2.',
        tex: String.raw`\frac{T_2^2}{T_1^2} = \frac{J + mR^2/2}{J}` },
      { title: 'Ответ',
        tex: String.raw`J = \frac{mR^2T_1^2}{2(T_2^2 - T_1^2)} = \frac{4\cdot0{,}04\cdot0{,}64}{2\cdot0{,}8} = 6{,}4\cdot10^{-2}\ \text{кг·м}^2` },
    ],
    answer: [String.raw`J = \frac{mR^2T_1^2}{2(T_2^2 - T_1^2)} = 6{,}4\cdot10^{-2}\ \text{кг·м}^2`],
  },

  /* ===================== 6.53 ===================== */
  {
    id: '6.53', chapter: CH, section: S3, page: '118',
    title: 'Колебания ареометра',
    given: [[String.raw`m = 50\ \text{г}`, String.raw`0{,}05\ \text{кг}`], [String.raw`d = 1\ \text{см}`, String.raw`0{,}01\ \text{м}`], [String.raw`\rho = 1000\ \text{кг/м}^3`, '']],
    find: String.raw`T \;—\; ?`,
    formulas: [SPRING, { tex: String.raw`F_\text{А} = \rho gV`, text: 'сила Архимеда' }],
    steps: [
      { title: 'Возвращающая сила',
        text: 'При погружении на x дополнительно вытесняется объём Sx, S = πd²/4. Добавочная сила Архимеда тянет обратно — как пружина жёсткостью k = ρgS.',
        tex: String.raw`F = -\rho g\frac{\pi d^2}{4}x` },
      { title: 'Период',
        tex: String.raw`T = 2\pi\sqrt{\frac{4m}{\rho g\pi d^2}} = \frac4d\sqrt{\frac{\pi m}{\rho g}} = 400\sqrt{\frac{3{,}14\cdot0{,}05}{9810}} = 1{,}6\ \text{с}` },
    ],
    answer: [String.raw`T = \frac4d\sqrt{\frac{\pi m}{\rho g}} = 1{,}6\ \text{с}`],
  },

  /* ===================== 6.54 ===================== */
  {
    id: '6.54', chapter: CH, section: S3, page: '118',
    title: 'Ртуть в U-образной трубке',
    given: [[String.raw`S = 0{,}4\ \text{см}^2`, String.raw`4\cdot10^{-5}\ \text{м}^2`], [String.raw`m = 200\ \text{г}`, String.raw`0{,}2\ \text{кг}`], [String.raw`\rho = 13{,}6\cdot10^3\ \text{кг/м}^3`, '']],
    find: String.raw`T \;—\; ?`,
    formulas: [SPRING],
    steps: [
      { title: 'Возвращающая сила',
        text: 'Если в одном колене уровень поднялся на x, в другом опустился на x — разность уровней 2x. Её вес тянет всю ртуть назад.',
        tex: String.raw`F = -\rho g S\cdot2x \;\Rightarrow\; k = 2\rho gS` },
      { title: 'Период',
        tex: String.raw`T = 2\pi\sqrt{\frac{m}{2\rho gS}} = 2\pi\sqrt{\frac{0{,}2}{2\cdot13600\cdot9{,}81\cdot4\cdot10^{-5}}} = 0{,}86\ \text{с}` },
    ],
    answer: [String.raw`T = 2\pi\sqrt{\frac{m}{2\rho gS}} = 0{,}86\ \text{с}`],
  },

  /* ===================== 6.55 ===================== */
  {
    id: '6.55', chapter: CH, section: S3, page: '118',
    title: 'Плавающее бревно',
    given: [[String.raw`T = 5\ \text{с}`, '']],
    find: String.raw`l \;—\; ?`,
    formulas: [SPRING],
    steps: [
      { title: 'Масса и «жёсткость»',
        text: 'Бревно почти целиком в воде, значит его масса m ≈ ρSl (ρ — плотность воды). При погружении на x добавочная сила Архимеда ρgSx.',
        tex: String.raw`T = 2\pi\sqrt{\frac{\rho Sl}{\rho gS}} = 2\pi\sqrt{\frac lg}` },
      { title: 'Длина',
        text: 'Как у математического маятника длиной l.',
        tex: String.raw`l = \frac{gT^2}{4\pi^2} = \frac{9{,}81\cdot25}{39{,}5} = 6{,}21\ \text{м}` },
    ],
    answer: [String.raw`l = \frac{gT^2}{4\pi^2} = 6{,}21\ \text{м}`],
  },

  /* ===================== 6.56 ===================== */
  {
    id: '6.56', chapter: CH, section: S4, page: '118',
    title: 'Амплитуда в 8 раз меньше',
    given: [[String.raw`t_1 = 5\ \text{мин},\ A_0/A_1 = 2`, ''], [String.raw`A_0/A_2 = 8`, '']],
    find: String.raw`t_2 \;—\; ?`,
    formulas: [DAMP],
    steps: [
      { title: 'Экспонента',
        text: 'За равные промежутки времени амплитуда уменьшается в одно и то же число раз. 8 = 2³ — три раза по 5 минут.',
        tex: String.raw`\frac{A_0}{A} = e^{\delta t} \;\Rightarrow\; t_2 = t_1\frac{\ln8}{\ln2} = 3t_1 = 15\ \text{мин}` },
    ],
    answer: [String.raw`t_2 = 15\ \text{мин}`],
  },

  /* ===================== 6.57 ===================== */
  {
    id: '6.57', chapter: CH, section: S4, page: '118',
    title: 'Коэффициент затухания',
    given: [[String.raw`t = 8\ \text{мин}`, String.raw`480\ \text{с}`], [String.raw`A_0/A = 3`, '']],
    find: String.raw`\delta \;—\; ?`,
    formulas: [DAMP],
    steps: [
      { title: 'Из закона затухания',
        tex: String.raw`\delta = \frac{\ln(A_0/A)}{t} = \frac{\ln3}{480} = 2{,}3\cdot10^{-3}\ \text{с}^{-1}` },
    ],
    answer: [String.raw`\delta = 2{,}3\cdot10^{-3}\ \text{с}^{-1}`],
  },

  /* ===================== 6.58 ===================== */
  {
    id: '6.58', chapter: CH, section: S4, page: '118',
    title: 'Логарифмический декремент маятника',
    note: TYPO + String.raw`В формуле книги $\theta = \frac{2\pi}{l}\sqrt{\frac lg}\ln\frac{A_1}{A_2}$ в знаменателе должно быть время $t$, а не длина $l$. Число в книге $2{,}31\cdot10^{-3}$; точнее $2{,}32\cdot10^{-3}$.`,
    given: [[String.raw`l = 1\ \text{м}`, ''], [String.raw`t = 10\ \text{мин}`, String.raw`600\ \text{с}`], [String.raw`A_1/A_2 = 2`, '']],
    find: String.raw`\theta \;—\; ?`,
    formulas: [DAMP, DECR, MATH],
    steps: [
      { title: 'Коэффициент затухания и период',
        text: 'Затухание слабое, период практически как у незатухающего маятника.',
        tex: String.raw`\delta = \frac{\ln2}{600} = 1{,}155\cdot10^{-3}\ \text{с}^{-1},\qquad T = 2\pi\sqrt{\frac lg} = 2{,}006\ \text{с}` },
      { title: 'Декремент',
        tex: String.raw`\theta = \delta T = \frac{2\pi}{t}\sqrt{\frac lg}\ln\frac{A_1}{A_2} = 2{,}32\cdot10^{-3}` },
    ],
    answer: [String.raw`\theta = 2{,}32\cdot10^{-3}`],
  },

  /* ===================== 6.59 ===================== */
  {
    id: '6.59', chapter: CH, section: S4, page: '118',
    title: 'Число колебаний до половины амплитуды',
    given: [[String.raw`\theta = 0{,}003`, ''], [String.raw`A_1/A_2 = 2`, '']],
    find: String.raw`N \;—\; ?`,
    formulas: [DECR],
    steps: [
      { title: 'За N колебаний',
        text: 'За каждое колебание амплитуда уменьшается в e^θ раз, за N — в e^{Nθ}.',
        tex: String.raw`N\theta = \ln2 \;\Rightarrow\; N = \frac{0{,}693}{0{,}003} = 231` },
    ],
    answer: [String.raw`N = \frac1\theta\ln\frac{A_1}{A_2} = 231`],
  },

  /* ===================== 6.60 ===================== */
  {
    id: '6.60', chapter: CH, section: S4, page: '118',
    title: 'Гиря на пружине в вязкой среде',
    note: TYPO + String.raw`В формуле книги $t = 2\pi n\sqrt{m/k}$ вместо числа колебаний $N$ стоит $n$ (а $n = 2$ — во сколько раз уменьшилась амплитуда). Должно быть $t = 2\pi N\sqrt{m/k}$; число 2 мин 52 с верное.`,
    given: [[String.raw`m = 500\ \text{г}`, String.raw`0{,}5\ \text{кг}`], [String.raw`k = 20\ \text{Н/м}`, ''], [String.raw`\theta = 0{,}004`, ''], [String.raw`n = 2`, '']],
    find: String.raw`N,\ t \;—\; ?`,
    formulas: [DECR, SPRING],
    steps: [
      { title: 'Число колебаний',
        tex: String.raw`N = \frac{\ln n}{\theta} = \frac{0{,}693}{0{,}004} = 173` },
      { title: 'Время',
        tex: String.raw`T = 2\pi\sqrt{\frac mk} = 0{,}993\ \text{с},\qquad t = NT = 172\ \text{с} = 2\ \text{мин}\ 52\ \text{с}` },
    ],
    answer: [String.raw`N = 173;\quad t = 2\pi N\sqrt{m/k} = 2\ \text{мин}\ 52\ \text{с}`],
  },

  /* ===================== 6.61 ===================== */
  {
    id: '6.61', chapter: CH, section: S4, page: '118',
    title: 'Коэффициент сопротивления по потере энергии',
    given: [[String.raw`m = 5\ \text{г}`, String.raw`5\cdot10^{-3}\ \text{кг}`], [String.raw`t = 50\ \text{с}`, ''], [String.raw`E/E_0 = 0{,}4`, '']],
    find: String.raw`b \;—\; ?`,
    formulas: [DAMP, { tex: String.raw`E \propto A^2 \;\Rightarrow\; E = E_0e^{-2\delta t}`, text: 'энергия пропорциональна квадрату амплитуды' }],
    steps: [
      { title: 'Коэффициент затухания',
        text: 'Потеряно 60 % — осталось 40 %.',
        tex: String.raw`2\delta t = \ln\frac{1}{0{,}4} \;\Rightarrow\; \delta = \frac{0{,}916}{100} = 9{,}16\cdot10^{-3}\ \text{с}^{-1}` },
      { title: 'Коэффициент сопротивления',
        tex: String.raw`b = 2m\delta = 2\cdot5\cdot10^{-3}\cdot9{,}16\cdot10^{-3} = 9{,}16\cdot10^{-5}\ \text{кг/с}` },
    ],
    answer: [String.raw`b = \frac mt\ln\frac{E_0}{E} = 9{,}16\cdot10^{-5}\ \text{кг/с}`],
  },

  /* ===================== 6.62 ===================== */
  {
    id: '6.62', chapter: CH, section: S4, page: '118',
    title: 'Период затухающих колебаний',
    given: [[String.raw`T_0 = 1\ \text{с}`, ''], [String.raw`\theta = 0{,}628`, '']],
    find: String.raw`T \;—\; ?`,
    formulas: [WDAMP, DECR],
    steps: [
      { title: 'Связываем ω, ω₀ и θ',
        text: String.raw`$\delta = \theta/T$, $\omega = 2\pi/T$:`,
        tex: String.raw`\left(\frac{2\pi}{T}\right)^2 + \left(\frac{\theta}{T}\right)^2 = \omega_0^2 \;\Rightarrow\; T = T_0\sqrt{1 + \frac{\theta^2}{4\pi^2}}` },
      { title: 'Числа',
        tex: String.raw`T = 1\cdot\sqrt{1 + \frac{0{,}394}{39{,}5}} = 1{,}005\ \text{с}` },
    ],
    answer: [String.raw`T = T_0\sqrt{1 + \theta^2/(4\pi^2)} = 1{,}005\ \text{с}`],
  },

  /* ===================== 6.63 ===================== */
  {
    id: '6.63', chapter: CH, section: S4, page: '118',
    title: 'Энергия вдвое меньше',
    given: [[String.raw`n = E_0/E = 2`, ''], [String.raw`\theta = 0{,}01`, '']],
    find: String.raw`N \;—\; ?`,
    formulas: [DECR, { tex: String.raw`E \propto A^2`, text: 'энергия пропорциональна квадрату амплитуды' }],
    steps: [
      { title: 'Амплитуда уменьшится в √2 раз',
        tex: String.raw`N\theta = \ln\sqrt2 = \frac{\ln2}{2} \;\Rightarrow\; N = \frac{0{,}347}{0{,}01} = 34{,}7 \approx 35` },
    ],
    answer: [String.raw`N = \frac{\ln n}{2\theta} \approx 35`],
  },

  /* ===================== 6.64 ===================== */
  {
    id: '6.64', chapter: CH, section: S4, page: '119',
    title: 'Тело между двумя пружинами',
    given: [[String.raw`m = 1\ \text{кг}`, ''], [String.raw`r = 0{,}05\ \text{кг/с}`, ''], [String.raw`k = 50\ \text{Н/м}\ (\text{каждая})`, '']],
    find: String.raw`\delta,\ \nu,\ \theta,\ N \;—\; ?`,
    formulas: [DAMP, WDAMP, DECR],
    steps: [
      { title: 'Жёсткость системы',
        text: 'При смещении x одна пружина растягивается, другая сжимается — обе тянут тело назад.',
        tex: String.raw`k_\text{общ} = 2k = 100\ \text{Н/м},\qquad \omega_0 = \sqrt{\frac{2k}{m}} = 10\ \text{с}^{-1}` },
      { title: '1) Коэффициент затухания',
        tex: String.raw`\delta = \frac{r}{2m} = 0{,}025\ \text{с}^{-1}` },
      { title: '2) Частота',
        tex: String.raw`\nu = \frac{\sqrt{\omega_0^2 - \delta^2}}{2\pi} = 1{,}59\ \text{Гц}` },
      { title: '3) Декремент',
        tex: String.raw`\theta = \frac{\delta}{\nu} = \frac{0{,}025}{1{,}59} = 0{,}0157` },
      { title: '4) Число колебаний до уменьшения в e раз',
        tex: String.raw`N\theta = 1 \;\Rightarrow\; N = \frac1\theta = 64` },
    ],
    answer: [String.raw`\delta = 0{,}025\ \text{с}^{-1};\quad \nu = 1{,}59\ \text{Гц};\quad \theta = 0{,}0157;\quad N = 64`],
  },

  /* ===================== 6.65 ===================== */
  {
    id: '6.65', chapter: CH, section: S5, page: '119',
    title: 'Резонанс консольной балки',
    given: [[String.raw`h = 1\ \text{мм}`, String.raw`10^{-3}\ \text{м}`]],
    find: String.raw`n \;—\; ?`,
    formulas: [SPRING, { tex: String.raw`kh = mg`, text: 'статический прогиб балки под весом двигателя' }],
    steps: [
      { title: 'Собственная частота балки',
        text: 'Балка с двигателем — пружинный маятник; k/m = g/h.',
        tex: String.raw`\omega_0 = \sqrt{\frac gh}` },
      { title: 'Опасная частота вращения',
        text: 'Резонанс — когда частота толчков от вращения якоря совпадает с собственной.',
        tex: String.raw`n = \frac{1}{2\pi}\sqrt{\frac gh} = \frac{\sqrt{9810}}{6{,}28} = 16\ \text{с}^{-1}` },
    ],
    answer: [String.raw`n = \frac1{2\pi}\sqrt{g/h} = 16\ \text{с}^{-1}`],
  },

  /* ===================== 6.66 ===================== */
  {
    id: '6.66', chapter: CH, section: S5, page: '119',
    title: 'Раскачивание вагона на стыках',
    given: [[String.raw`m = 80\ \text{т}`, String.raw`8\cdot10^4\ \text{кг}`], [String.raw`k = 500\ \text{кН/м}\ (\times4)`, String.raw`5\cdot10^5\ \text{Н/м}`], [String.raw`l = 12{,}8\ \text{м}`, '']],
    find: String.raw`v \;—\; ?`,
    formulas: [SPRING],
    steps: [
      { title: 'Период вагона на рессорах',
        text: 'Четыре рессоры работают параллельно — жёсткость 4k.',
        tex: String.raw`T = 2\pi\sqrt{\frac{m}{4k}} = \pi\sqrt{\frac mk} = 3{,}14\sqrt{0{,}16} = 1{,}26\ \text{с}` },
      { title: 'Резонанс',
        text: 'Толчки на стыках повторяются через l/v. Сильное раскачивание — когда это время равно периоду.',
        tex: String.raw`v = \frac lT = \frac l\pi\sqrt{\frac km} = \frac{12{,}8}{1{,}257} = 10{,}2\ \text{м/с}` },
    ],
    answer: [String.raw`v = \frac l\pi\sqrt{\frac km} = 10{,}2\ \text{м/с}`],
  },

  /* ===================== 6.67 ===================== */
  {
    id: '6.67', chapter: CH, section: S5, page: '119',
    title: 'Собственная частота по двум другим',
    given: [[String.raw`\nu = 1000\ \text{Гц}`, ''], [String.raw`\nu_\text{рез} = 998\ \text{Гц}`, '']],
    find: String.raw`\nu_0 \;—\; ?`,
    formulas: [WDAMP, RES],
    steps: [
      { title: 'Исключаем δ',
        tex: String.raw`\delta^2 = \omega_0^2 - \omega^2,\quad \omega_\text{рез}^2 = \omega_0^2 - 2\delta^2 = 2\omega^2 - \omega_0^2` },
      { title: 'Ответ',
        tex: String.raw`\nu_0 = \sqrt{2\nu^2 - \nu_\text{рез}^2} = \sqrt{2\cdot10^6 - 996\,004} = 1002\ \text{Гц}` },
    ],
    answer: [String.raw`\nu_0 = \sqrt{2\nu^2 - \nu_\text{рез}^2} = 1002\ \text{Гц}`],
  },

  /* ===================== 6.68 ===================== */
  {
    id: '6.68', chapter: CH, section: S5, page: '119',
    title: 'Сдвиг резонансной частоты',
    given: [[String.raw`\nu_0 = 1\ \text{кГц}`, String.raw`10^3\ \text{Гц}`], [String.raw`\delta = 400\ \text{с}^{-1}`, '']],
    find: String.raw`\Delta\nu \;—\; ?`,
    formulas: [RES],
    steps: [
      { title: 'Разность частот',
        tex: String.raw`\nu_\text{рез} = \sqrt{\nu_0^2 - \frac{2\delta^2}{4\pi^2}}` },
      { title: 'Малое затухание',
        text: 'Поправка мала, корень раскладываем: √(1 − ε) ≈ 1 − ε/2.',
        tex: String.raw`\Delta\nu = \nu_0 - \nu_\text{рез} \approx \frac{\delta^2}{4\pi^2\nu_0} = \frac{160\,000}{39{,}48\cdot1000} = 4{,}05\ \text{Гц}` },
      { title: 'Без приближения',
        text: 'Точный расчёт по корню даёт 4,06 Гц — разница в последней цифре.' },
    ],
    answer: [String.raw`\Delta\nu \approx \frac{\delta^2}{4\pi^2\nu_0} = 4{,}05\ \text{Гц}`],
  },

  /* ===================== 6.69 ===================== */
  {
    id: '6.69', chapter: CH, section: S5, page: '119',
    title: 'Декремент по сдвигу резонанса',
    given: [[String.raw`\nu_0 = 10\ \text{кГц}`, String.raw`10^4\ \text{Гц}`], [String.raw`\Delta\nu = 2\ \text{Гц}`, '']],
    find: String.raw`\theta \;—\; ?`,
    formulas: [RES, DECR],
    steps: [
      { title: 'Коэффициент затухания',
        text: 'Из приближённой формулы предыдущей задачи:',
        tex: String.raw`\Delta\nu = \frac{\delta^2}{4\pi^2\nu_0} \;\Rightarrow\; \delta = 2\pi\sqrt{\Delta\nu\,\nu_0}` },
      { title: 'Декремент',
        text: 'Период практически 1/ν₀.',
        tex: String.raw`\theta = \frac{\delta}{\nu_0} = 2\pi\sqrt{\frac{\Delta\nu}{\nu_0}} = 6{,}28\sqrt{2\cdot10^{-4}} = 0{,}089` },
    ],
    answer: [String.raw`\theta = 2\pi\sqrt{\Delta\nu/\nu_0} = 0{,}089`],
  },

  /* ===================== 6.70 ===================== */
  {
    id: '6.70', chapter: CH, section: S5, page: '119',
    title: 'Резонанс пружинного маятника в вязкой среде',
    given: [[String.raw`T_0 = 0{,}55\ \text{с}`, ''], [String.raw`T = 0{,}56\ \text{с}`, '']],
    find: String.raw`\nu_\text{рез} \;—\; ?`,
    formulas: [WDAMP, RES],
    steps: [
      { title: 'Как в задаче 6.67',
        tex: String.raw`\omega_\text{рез}^2 = 2\omega^2 - \omega_0^2 \;\Rightarrow\; \nu_\text{рез} = \sqrt{\frac{2}{T^2} - \frac1{T_0^2}} = \sqrt{6{,}378 - 3{,}306} = 1{,}75\ \text{Гц}` },
    ],
    answer: [String.raw`\nu_\text{рез} = \sqrt{2/T^2 - 1/T_0^2} = 1{,}75\ \text{Гц}`],
  },

  /* ===================== 6.71 ===================== */
  {
    id: '6.71', chapter: CH, section: S5, page: '119',
    title: 'Резонансная амплитуда пружинного маятника',
    given: [[String.raw`k = 10\ \text{Н/м}`, ''], [String.raw`m = 100\ \text{г}`, String.raw`0{,}1\ \text{кг}`], [String.raw`r = 2\cdot10^{-2}\ \text{кг/с}`, ''], [String.raw`F_0 = 10\ \text{мН}`, String.raw`10^{-2}\ \text{Н}`]],
    find: String.raw`\delta,\ A_\text{рез} \;—\; ?`,
    formulas: [DAMP, ARES],
    steps: [
      { title: 'Коэффициент затухания и ω₀',
        tex: String.raw`\delta = \frac{r}{2m} = 0{,}1\ \text{с}^{-1},\qquad \omega_0 = \sqrt{\frac km} = 10\ \text{с}^{-1}` },
      { title: 'Резонансная амплитуда',
        tex: String.raw`A_\text{рез} = \frac{F_0/m}{2\delta\sqrt{\omega_0^2 - \delta^2}} = \frac{0{,}1}{0{,}2\cdot10} = 0{,}05\ \text{м} = 5\ \text{см}` },
    ],
    answer: [String.raw`\delta = 0{,}1\ \text{с}^{-1};\quad A_\text{рез} = 5\ \text{см}`],
  },

  /* ===================== 6.72 ===================== */
  {
    id: '6.72', chapter: CH, section: S5, page: '119',
    title: 'Амплитуда вынуждающей силы',
    given: [[String.raw`r = 1\ \text{г/с}`, String.raw`10^{-3}\ \text{кг/с}`], [String.raw`A_\text{рез} = 0{,}5\ \text{см}`, String.raw`5\cdot10^{-3}\ \text{м}`], [String.raw`\nu_0 = 10\ \text{Гц}`, '']],
    find: String.raw`F_0 \;—\; ?`,
    formulas: [ARES],
    steps: [
      { title: 'Малое затухание',
        text: 'δ ≪ ω₀, корень ≈ ω₀; 2δm = r.',
        tex: String.raw`A_\text{рез} \approx \frac{F_0}{2\delta m\omega_0} = \frac{F_0}{r\omega_0}` },
      { title: 'Ответ',
        tex: String.raw`F_0 = 2\pi\nu_0rA_\text{рез} = 6{,}28\cdot10\cdot10^{-3}\cdot5\cdot10^{-3} = 0{,}314\ \text{мН}` },
    ],
    answer: [String.raw`F_0 = 2\pi\nu_0rA_\text{рез} = 0{,}314\ \text{мН}`],
  },

  /* ===================== 6.73 ===================== */
  {
    id: '6.73', chapter: CH, section: S5, page: '120',
    title: 'Резонанс по двум равным амплитудам',
    given: [[String.raw`\nu_1 = 400\ \text{Гц}`, ''], [String.raw`\nu_2 = 600\ \text{Гц}`, ''], [String.raw`\delta \approx 0`, '']],
    find: String.raw`\nu_\text{рез} \;—\; ?`,
    formulas: [AFORCE],
    steps: [
      { title: 'Без затухания',
        text: 'Амплитуда A = f₀/|ω₀² − ω²|, резонанс при ω₀. Равные амплитуды — по разные стороны от резонанса:',
        tex: String.raw`\omega_0^2 - \omega_1^2 = \omega_2^2 - \omega_0^2 \;\Rightarrow\; \nu_\text{рез} = \sqrt{\frac{\nu_1^2 + \nu_2^2}{2}} = \sqrt{260\,000} = 510\ \text{Гц}` },
    ],
    answer: [String.raw`\nu_\text{рез} = \sqrt{(\nu_1^2 + \nu_2^2)/2} = 510\ \text{Гц}`],
  },

  /* ===================== 6.74 ===================== */
  {
    id: '6.74', chapter: CH, section: S5, page: '120',
    title: 'Грузик на пружине в вязкой среде',
    given: [[String.raw`k = 10\ \text{Н/м}`, ''], [String.raw`m = 10\ \text{г}`, String.raw`10^{-2}\ \text{кг}`], [String.raw`r = 0{,}1\ \text{кг/с}`, ''], [String.raw`F_0 = 0{,}02\ \text{Н}`, '']],
    find: String.raw`\nu_0,\ \nu_\text{рез},\ A_\text{рез},\ A_\text{рез}/x_\text{ст} \;—\; ?`,
    formulas: [DAMP, RES, ARES],
    steps: [
      { title: '1) Собственная частота',
        tex: String.raw`\omega_0 = \sqrt{\frac km} = 31{,}6\ \text{с}^{-1},\qquad \nu_0 = 5{,}03\ \text{Гц}` },
      { title: '2) Резонансная частота',
        tex: String.raw`\delta = \frac{r}{2m} = 5\ \text{с}^{-1},\qquad \nu_\text{рез} = \frac{\sqrt{1000 - 50}}{2\pi} = 4{,}91\ \text{Гц}` },
      { title: '3) Резонансная амплитуда',
        tex: String.raw`A_\text{рез} = \frac{F_0/m}{2\delta\sqrt{\omega_0^2 - \delta^2}} = \frac{2}{10\cdot31{,}2} = 6{,}4\cdot10^{-3}\ \text{м} = 6{,}4\ \text{мм}` },
      { title: '4) Сравнение со статическим смещением',
        tex: String.raw`x_\text{ст} = \frac{F_0}{k} = 2\ \text{мм},\qquad \frac{A_\text{рез}}{x_\text{ст}} = 3{,}2` },
    ],
    answer: [String.raw`\nu_0 = 5{,}03\ \text{Гц};\quad \nu_\text{рез} = 4{,}91\ \text{Гц};\quad A_\text{рез} = 6{,}4\ \text{мм};\quad A_\text{рез}/x_\text{ст} = 3{,}2`],
  },

  /* ===================== 6.75 ===================== */
  {
    id: '6.75', chapter: CH, section: S5, page: '120',
    title: 'Амплитуда вдали от резонанса',
    note: MISMATCH + String.raw`Ответы книги 1,53 и 15,2 получаются, если частоту взять больше <i>собственной</i> частоты $\omega_0$ (на 10 % и вдвое). По условию — больше <i>резонансной</i> $\omega_\text{рез} = 0{,}990\,\omega_0$; тогда 1,44 и 14,8. Здесь — по условию; оба варианта посчитаны в шагах.`,
    given: [[String.raw`\delta = 0{,}1\,\omega_0`, ''], [String.raw`1)\ \omega = 1{,}1\,\omega_\text{рез}`, ''], [String.raw`2)\ \omega = 2\,\omega_\text{рез}`, '']],
    find: String.raw`A_\text{рез}/A \;—\; ?`,
    formulas: [AFORCE, ARES, RES],
    steps: [
      { title: 'Отношение амплитуд',
        text: 'Вынуждающая сила та же, f₀ сокращается.',
        tex: String.raw`\frac{A_\text{рез}}{A} = \frac{\sqrt{(\omega_0^2 - \omega^2)^2 + 4\delta^2\omega^2}}{2\delta\sqrt{\omega_0^2 - \delta^2}}` },
      { title: 'Резонансная частота',
        tex: String.raw`\omega_\text{рез} = \omega_0\sqrt{1 - 2\cdot0{,}01} = 0{,}990\,\omega_0` },
      { title: '1) ω = 1,1ωрез = 1,089ω₀',
        tex: String.raw`\frac{A_\text{рез}}{A} = \frac{\sqrt{(1 - 1{,}186)^2 + 0{,}04\cdot1{,}186}}{0{,}2\sqrt{0{,}99}} = 1{,}44` },
      { title: '2) ω = 2ωрез = 1,98ω₀',
        tex: String.raw`\frac{A_\text{рез}}{A} = \frac{\sqrt{(1 - 3{,}92)^2 + 0{,}04\cdot3{,}92}}{0{,}199} = 14{,}8` },
      { title: 'Если отсчитывать от ω₀ (как в книге)',
        tex: String.raw`\omega = 1{,}1\omega_0:\ 1{,}53;\qquad \omega = 2\omega_0:\ 15{,}2` },
    ],
    answer: [String.raw`1)\ 1{,}44;\quad 2)\ 14{,}8\ \ (\text{от}\ \omega_0:\ 1{,}53\ \text{и}\ 15{,}2)`],
  },

  );
})();
