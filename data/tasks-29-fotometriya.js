/*
  § 29. Фотометрия — задачи 29.1–29.23 (стр. 392–395).
  Условия задач показываются дословно из книги (data/book-tasks.js).
  Ответы пересчитаны скриптом tools/check_fotometriya.py и сверены с book/99-otvety.md.
*/
(function () {
  const CH = 'Гл. 6. Оптика';
  const S1 = 'Световой поток и сила света';
  const S2 = 'Освещённость';
  const S3 = 'Яркость и светимость';
  const MISMATCH = '<b>Расхождение с ответом книги.</b> ';
  const TYPO = '<b>Опечатка в ответе книги.</b> ';

  const FLUX = { tex: String.raw`\Phi = I\Omega,\quad \Omega = 2\pi(1 - \cos\theta),\quad \Phi_0 = 4\pi I`, text: 'световой поток точечного изотропного источника' };
  const ILL = { tex: String.raw`E = \frac{I}{r^2}\cos\varepsilon,\quad E = \frac\Phi S`, text: 'освещённость' };
  const BRIGHT = { tex: String.raw`L = \frac{I}{\sigma},\quad M = \frac\Phi S = \pi L`, text: 'яркость (σ — площадь проекции светящейся поверхности); светимость косинусного излучателя' };
  const REFL = { tex: String.raw`M = \rho E,\quad L = \frac{\rho E}{\pi}`, text: 'равномерно рассеивающая поверхность с коэффициентом отражения ρ' };

  window.TASKS.push(

  /* ===================== 29.1 ===================== */
  {
    id: '29.1', chapter: CH, section: S1, page: '392',
    title: 'Сила света по полному потоку',
    given: [[String.raw`\Phi_0 = 1\ \text{лм}`, '']],
    find: String.raw`I \;—\; ?`,
    formulas: [FLUX],
    steps: [{ title: 'Сила света', tex: String.raw`I = \frac{\Phi_0}{4\pi} = \frac1{12{,}57} = 0{,}08\ \text{кд}` }],
    answer: [String.raw`I = 0{,}08\ \text{кд}`],
  },

  /* ===================== 29.2 ===================== */
  {
    id: '29.2', chapter: CH, section: S1, page: '392–393',
    title: 'Удельная мощность и световая отдача лампочки',
    given: [[String.raw`P = 75\ \text{Вт}`, ''], [String.raw`r = 3\ \text{м}`, ''], [String.raw`E = 8\ \text{лк}`, '']],
    find: String.raw`p,\ \eta \;—\; ?`,
    formulas: [ILL, FLUX],
    steps: [
      { title: 'Сила света', tex: String.raw`I = Er^2 = 8\cdot9 = 72\ \text{кд}` },
      { title: 'Удельная мощность', tex: String.raw`p = \frac PI = \frac{75}{72} \approx 1\ \text{Вт/кд}` },
      { title: 'Световая отдача', tex: String.raw`\eta = \frac{4\pi I}{P} = \frac{905}{75} = 12{,}1\ \text{лм/Вт}` },
    ],
    answer: [String.raw`p = 1\ \text{Вт/кд};\quad \eta = 12{,}1\ \text{лм/Вт}`],
  },

  /* ===================== 29.3 ===================== */
  {
    id: '29.3', chapter: CH, section: S1, page: '393',
    title: 'Телесный угол и раствор конуса',
    given: [[String.raw`\Phi = 76\ \text{лм}`, ''], [String.raw`I = 120\ \text{кд}`, '']],
    find: String.raw`\Omega,\ 2\theta \;—\; ?`,
    formulas: [FLUX],
    steps: [
      { title: 'Телесный угол', tex: String.raw`\Omega = \frac\Phi I = 0{,}633\ \text{ср}` },
      { title: 'Раствор', tex: String.raw`\cos\theta = 1 - \frac{\Omega}{2\pi} = 0{,}899\ \Rightarrow\ \theta = 26^\circ,\quad 2\theta = 52^\circ` },
    ],
    answer: [String.raw`\Omega = 0{,}633\ \text{ср};\quad 2\theta = 52^\circ`],
  },

  /* ===================== 29.4 ===================== */
  {
    id: '29.4', chapter: CH, section: S1, page: '393',
    title: 'Ток селенового фотоэлемента',
    given: [[String.raw`r = 75\ \text{см}`, String.raw`0{,}75\ \text{м}`], [String.raw`\Phi_0 = 1{,}2\cdot10^3\ \text{лм}`, ''], [String.raw`S = 10\ \text{см}^2`, String.raw`10^{-3}\ \text{м}^2`], [String.raw`i = 3\cdot10^{-4}\ \text{А/лм}`, '']],
    find: String.raw`I_\text{ф} \;—\; ?`,
    formulas: [FLUX, ILL],
    steps: [
      { title: 'Освещённость фотоэлемента', tex: String.raw`E = \frac{\Phi_0}{4\pi r^2} = \frac{1200}{4\pi\cdot0{,}5625} = 170\ \text{лк}` },
      { title: 'Ток', tex: String.raw`I_\text{ф} = iES = 3\cdot10^{-4}\cdot170\cdot10^{-3} = 5{,}1\cdot10^{-5}\ \text{А}` },
    ],
    answer: [String.raw`I_\text{ф} = 51\ \text{мкА}`],
  },

  /* ===================== 29.5 ===================== */
  {
    id: '29.5', chapter: CH, section: S2, page: '393',
    title: 'Светлое пятно за линзой',
    given: [[String.raw`I = 80\ \text{кд}`, ''], [String.raw`a = 2\ \text{м}`, ''], [String.raw`d = 12\ \text{см},\ f = 40\ \text{см}`, ''], [String.raw`b = 30\ \text{см}`, '']],
    find: String.raw`E \;—\; ?`,
    formulas: [ILL],
    steps: [
      { title: 'Изображение лампочки', tex: String.raw`b' = \frac{af}{a - f} = \frac{2\cdot0{,}4}{1{,}6} = 0{,}5\ \text{м}` },
      { title: 'Пятно на экране', text: 'Пучок сходится к точке на 50 см; на 30 см его диаметр составляет (50 − 30)/50 диаметра линзы.', tex: String.raw`d_\text{п} = 0{,}4d = 4{,}8\ \text{см}` },
      { title: 'Освещённость', text: 'Весь поток, прошедший через линзу, попадает в пятно.', tex: String.raw`E = \frac{I}{a^2}\left(\frac{d}{d_\text{п}}\right)^2 = 20\cdot6{,}25 = 125\ \text{лк}` },
    ],
    answer: [String.raw`E = 125\ \text{лк}`],
    note: MISMATCH + 'В книге 180 лк. Такая освещённость получилась бы, если бы пятно было втрое меньше линзы (экран на 33 см). По данным условия — 125 лк.',
  },

  /* ===================== 29.6 ===================== */
  {
    id: '29.6', chapter: CH, section: S2, page: '393',
    title: 'Время экспозиции при печати',
    given: [[String.raw`t_1 = 3\ \text{с},\ I_1 = 15\ \text{кд},\ r_1 = 0{,}5\ \text{м}`, ''], [String.raw`I_2 = 60\ \text{кд},\ r_2 = 2\ \text{м}`, '']],
    find: String.raw`t_2 \;—\; ?`,
    formulas: [ILL, { tex: String.raw`E_1t_1 = E_2t_2`, text: 'почернение определяется экспозицией' }],
    steps: [{ title: 'Время', tex: String.raw`E_1 = \frac{15}{0{,}25} = 60\ \text{лк},\quad E_2 = \frac{60}{4} = 15\ \text{лк}\ \Rightarrow\ t_2 = 3\cdot\frac{60}{15} = 12\ \text{с}` }],
    answer: [String.raw`t_2 = 12\ \text{с}`],
  },

  /* ===================== 29.7 ===================== */
  {
    id: '29.7', chapter: CH, section: S2, page: '393',
    title: 'Освещённость стены и земли',
    given: [[String.raw`h = 3\ \text{м}`, ''], [String.raw`r = 4\ \text{м}`, ''], [String.raw`I = 100\ \text{кд}`, '']],
    find: String.raw`E_1,\ E_2 \;—\; ?`,
    formulas: [ILL],
    steps: [
      { title: 'Расстояние до точки у основания стены', tex: String.raw`R = \sqrt{3^2 + 4^2} = 5\ \text{м}` },
      { title: 'Стена (нормаль горизонтальна)', tex: String.raw`E_1 = \frac{100}{25}\cdot\frac45 = 3{,}2\ \text{лк}` },
      { title: 'Земля (нормаль вертикальна)', tex: String.raw`E_2 = \frac{100}{25}\cdot\frac35 = 2{,}4\ \text{лк}` },
    ],
    answer: [String.raw`E_1 = 3{,}2\ \text{лк};\quad E_2 = 2{,}4\ \text{лк}`],
  },

  /* ===================== 29.8 ===================== */
  {
    id: '29.8', chapter: CH, section: S2, page: '393',
    title: 'Где освещённость земли 1 лк',
    given: [[String.raw`h = 8\ \text{м}`, ''], [String.raw`I = 10^3\ \text{кд}`, ''], [String.raw`E = 1\ \text{лк}`, '']],
    find: String.raw`l \;—\; ?`,
    formulas: [ILL],
    steps: [{ title: 'cos ε = h/R', tex: String.raw`E = \frac{Ih}{(h^2 + l^2)^{3/2}}\ \Rightarrow\ (64 + l^2)^{3/2} = 8000\ \Rightarrow\ 64 + l^2 = 400\ \Rightarrow\ l = 18{,}3\ \text{м}` }],
    answer: [String.raw`l = 18{,}3\ \text{м}`],
  },

  /* ===================== 29.9 ===================== */
  {
    id: '29.9', chapter: CH, section: S2, page: '393',
    title: 'Угол падения на краю площадки',
    given: [[String.raw`E_1 = 40\ \text{лк},\ E_2 = 5\ \text{лк}`, '']],
    find: String.raw`\varepsilon \;—\; ?`,
    formulas: [ILL],
    steps: [{ title: 'R = h/cos ε', tex: String.raw`\frac{E_2}{E_1} = \cos^3\varepsilon = \frac18\ \Rightarrow\ \cos\varepsilon = 0{,}5,\ \varepsilon = 60^\circ` }],
    answer: [String.raw`\varepsilon = 60^\circ`],
  },

  /* ===================== 29.10 ===================== */
  {
    id: '29.10', chapter: CH, section: S2, page: '393',
    title: 'Лампа над круглым столом',
    given: [[String.raw`r = 80\ \text{см},\ h = 60\ \text{см}`, ''], [String.raw`I = 100\ \text{кд}`, '']],
    find: String.raw`E_1,\ E_2,\ \Phi,\ \langle E\rangle \;—\; ?`,
    formulas: [ILL, FLUX],
    steps: [
      { title: '1) Центр', tex: String.raw`E_1 = \frac{100}{0{,}36} = 278\ \text{лк}` },
      { title: '2) Край (R = 1 м, cos ε = 0,6)', tex: String.raw`E_2 = \frac{100}{1}\cdot0{,}6 = 60\ \text{лк}` },
      { title: '3) Поток (cos θ = 0,6)', tex: String.raw`\Phi = I\cdot2\pi(1 - 0{,}6) = 251\ \text{лм}` },
      { title: '4) Средняя освещённость', tex: String.raw`\langle E\rangle = \frac{251}{\pi\cdot0{,}64} = 125\ \text{лк}` },
    ],
    answer: [String.raw`1)\ 278\ \text{лк};\ 2)\ 60\ \text{лк};\ 3)\ 251\ \text{лм};\ 4)\ 125\ \text{лк}`],
  },

  /* ===================== 29.11 ===================== */
  {
    id: '29.11', chapter: CH, section: S2, page: '393',
    title: 'Наилучшая высота лампы над столом',
    given: [[String.raw`r = 1\ \text{м}`, '']],
    find: String.raw`h \;—\; ?`,
    formulas: [ILL],
    steps: [{ title: 'Максимум E(h) = Ih/(h² + r²)^{3/2}', tex: String.raw`\frac{dE}{dh} = I\frac{(h^2 + r^2) - 3h^2}{(h^2 + r^2)^{5/2}} = 0\ \Rightarrow\ h = \frac{r}{\sqrt2} = 0{,}707\ \text{м}` }],
    answer: [String.raw`h = 0{,}707\ \text{м}`],
  },

  /* ===================== 29.12 ===================== */
  {
    id: '29.12', chapter: CH, section: S3, page: '394',
    title: 'Яркость матового стекла',
    given: [[String.raw`S = 10\times15\ \text{см}^2`, String.raw`1{,}5\cdot10^{-2}\ \text{м}^2`], [String.raw`\varphi = 60^\circ`, ''], [String.raw`I = 15\ \text{кд}`, '']],
    find: String.raw`L \;—\; ?`,
    formulas: [BRIGHT],
    steps: [{ title: 'Проекция σ = S cos φ', tex: String.raw`L = \frac{I}{S\cos\varphi} = \frac{15}{0{,}015\cdot0{,}5} = 2\cdot10^3\ \text{кд/м}^2` }],
    answer: [String.raw`L = 2\ \text{ккд/м}^2`],
  },

  /* ===================== 29.13 ===================== */
  {
    id: '29.13', chapter: CH, section: S3, page: '394',
    title: 'Шарик и шаровой светильник',
    given: [[String.raw`L_1 = 3\cdot10^6\ \text{кд/м}^2,\ d_1 = 2\ \text{мм}`, ''], [String.raw`L_2 = 5\cdot10^3\ \text{кд/м}^2,\ d_2 = 20\ \text{см}`, '']],
    find: String.raw`I_1,\ I_2 \;—\; ?`,
    formulas: [BRIGHT],
    steps: [{ title: 'Проекция шара — круг', tex: String.raw`I_1 = 3\cdot10^6\cdot\frac{\pi\cdot4\cdot10^{-6}}4 = 9{,}4\ \text{кд},\quad I_2 = 5\cdot10^3\cdot\frac{\pi\cdot0{,}04}4 = 157\ \text{кд}` }],
    answer: [String.raw`I_1 = 9{,}4\ \text{кд};\quad I_2 = 157\ \text{кд}\ (\approx17\ \text{раз больше})`],
  },

  /* ===================== 29.14 ===================== */
  {
    id: '29.14', chapter: CH, section: S3, page: '394',
    title: 'Матовый шар: поток, светимость, яркость',
    given: [[String.raw`d = 20\ \text{см}`, String.raw`R = 0{,}1\ \text{м}`], [String.raw`I = 80\ \text{кд}`, '']],
    find: String.raw`\Phi,\ M,\ L \;—\; ?`,
    formulas: [FLUX, BRIGHT],
    steps: [
      { title: 'Поток', tex: String.raw`\Phi = 4\pi I = 1005\ \text{лм}` },
      { title: 'Светимость', tex: String.raw`M = \frac{\Phi}{4\pi R^2} = \frac{1005}{0{,}1257} = 8\cdot10^3\ \text{лм/м}^2` },
      { title: 'Яркость', tex: String.raw`L = \frac{I}{\pi R^2} = \frac{80}{0{,}0314} = 2{,}5\cdot10^3\ \text{кд/м}^2` },
    ],
    answer: [String.raw`\Phi = 1\ \text{клм};\quad M = 8\ \text{клм/м}^2;\quad L = 2{,}5\ \text{ккд/м}^2`],
    note: MISMATCH + 'В книге Φ = 2 клм, но её же ответы M = 8 клк и L = 2,5 ккд/м² соответствуют Φ = 4πI = 1 клм.',
  },

  /* ===================== 29.15 ===================== */
  {
    id: '29.15', chapter: CH, section: S3, page: '394',
    title: 'Видимая яркость Солнца',
    given: [[String.raw`E = 10^5\ \text{лк}`, ''], [String.raw`\alpha = 32'`, '']],
    find: String.raw`L \;—\; ?`,
    formulas: [ILL, BRIGHT],
    steps: [
      { title: 'Сила света Солнца', text: 'Солнце радиусом R на расстоянии r: I = Lπ R², E = I/r², R/r = tg(α/2).', tex: String.raw`E = \pi L\operatorname{tg}^2\frac\alpha2` },
      { title: 'Яркость', tex: String.raw`L = \frac{10^5}{\pi(4{,}65\cdot10^{-3})^2} = 1{,}47\cdot10^9\ \text{кд/м}^2` },
    ],
    answer: [String.raw`L \approx 1{,}5\ \text{Гкд/м}^2`],
  },

  /* ===================== 29.16 ===================== */
  {
    id: '29.16', chapter: CH, section: S3, page: '394',
    title: 'Яркость раскалённой нити',
    given: [[String.raw`l = 30\ \text{см}`, String.raw`0{,}3\ \text{м}`], [String.raw`d = 0{,}2\ \text{мм}`, String.raw`2\cdot10^{-4}\ \text{м}`], [String.raw`I = 24\ \text{кд}`, '']],
    find: String.raw`L \;—\; ?`,
    formulas: [BRIGHT],
    steps: [{ title: 'Проекция нити — прямоугольник l × d', tex: String.raw`L = \frac{I}{ld} = \frac{24}{0{,}3\cdot2\cdot10^{-4}} = 4\cdot10^5\ \text{кд/м}^2` }],
    answer: [String.raw`L = 400\ \text{ккд/м}^2`],
    note: TYPO + 'В книге «400 кд/м²» — пропущена приставка: должно быть 400 ккд/м² = 4·10⁵ кд/м².',
  },

  /* ===================== 29.17 ===================== */
  {
    id: '29.17', chapter: CH, section: S3, page: '394',
    title: 'Светящийся куб',
    given: [[String.raw`L = 5\cdot10^3\ \text{кд/м}^2`, ''], [String.raw`a = 20\ \text{см}`, String.raw`0{,}2\ \text{м}`]],
    find: String.raw`I_{\max} \;—\; ?`,
    formulas: [BRIGHT],
    steps: [
      { title: 'Проекция максимальна вдоль диагонали', text: 'Вдоль единичного вектора n проекция куба равна a²(|nₓ| + |n_y| + |n_z|). Эта сумма максимальна при nₓ = n_y = n_z = 1/√3 — вдоль диагонали куба.', tex: String.raw`\sigma_{\max} = \sqrt3a^2` },
      { title: 'Сила света', tex: String.raw`I_{\max} = \sqrt3La^2 = 1{,}732\cdot5\cdot10^3\cdot0{,}04 = 346\ \text{кд}` },
    ],
    answer: [String.raw`\text{по диагонали куба};\quad I_{\max} = 346 \approx 350\ \text{кд}`],
  },

  /* ===================== 29.18 ===================== */
  {
    id: '29.18', chapter: CH, section: S3, page: '394',
    title: 'Светящийся конус',
    given: [[String.raw`L = 2\cdot10^3\ \text{кд/м}^2`, ''], [String.raw`d = 20\ \text{см},\ h = 15\ \text{см}`, '']],
    find: String.raw`I_1,\ I_2 \;—\; ?`,
    formulas: [BRIGHT],
    steps: [
      { title: '1) Вдоль оси (со стороны вершины): проекция — круг', tex: String.raw`I_1 = L\frac{\pi d^2}{4} = 2\cdot10^3\cdot0{,}0314 = 63\ \text{кд}` },
      { title: '2) Перпендикулярно оси: проекция — треугольник', tex: String.raw`I_2 = L\frac{dh}2 = 2\cdot10^3\cdot0{,}015 = 30\ \text{кд}` },
    ],
    answer: [String.raw`1)\ 63\ \text{кд};\quad 2)\ 30\ \text{кд}`],
  },

  /* ===================== 29.19 ===================== */
  {
    id: '29.19', chapter: CH, section: S3, page: '394',
    title: 'Освещённость от косинусного излучателя',
    given: [[String.raw`h = 1\ \text{м}`, ''], [String.raw`I_0 = 100\ \text{кд}`, ''], [String.raw`r = 3\ \text{м}`, '']],
    find: String.raw`E \;—\; ?`,
    formulas: [ILL, { tex: String.raw`I = I_0\cos\varphi`, text: 'косинусный излучатель' }],
    steps: [{ title: 'cos φ = cos ε = h/R, R² = h² + r²', tex: String.raw`E = \frac{I_0\cos\varphi\cos\varepsilon}{R^2} = \frac{I_0h^2}{(h^2 + r^2)^2} = \frac{100}{100} = 1\ \text{лк}` }],
    answer: [String.raw`E = 1\ \text{лк}`],
  },

  /* ===================== 29.20 ===================== */
  {
    id: '29.20', chapter: CH, section: S3, page: '394',
    title: 'Высота диска для максимума освещённости',
    given: [[String.raw`r = 3\ \text{м}`, '']],
    find: String.raw`h \;—\; ?`,
    formulas: [ILL],
    steps: [{ title: 'Максимум E(h) = I₀h²/(h² + r²)²', tex: String.raw`\frac{dE}{dh} \propto 2h(h^2 + r^2) - 4h^3 = 0\ \Rightarrow\ h = r = 3\ \text{м}` }],
    answer: [String.raw`h = 3\ \text{м}`],
  },

  /* ===================== 29.21 ===================== */
  {
    id: '29.21', chapter: CH, section: S3, page: '394',
    title: 'Киноэкран',
    given: [[String.raw`\Phi = 1{,}75\cdot10^3\ \text{лм}`, ''], [String.raw`S = 5\times3{,}6 = 18\ \text{м}^2`, ''], [String.raw`\rho = 0{,}75`, '']],
    find: String.raw`E,\ M,\ L \;—\; ?`,
    formulas: [ILL, REFL],
    steps: [
      { title: 'Освещённость', tex: String.raw`E = \frac{1750}{18} = 97\ \text{лк}` },
      { title: 'Светимость и яркость', tex: String.raw`M = \rho E = 73\ \text{лм/м}^2,\quad L = \frac M\pi = 23\ \text{кд/м}^2` },
    ],
    answer: [String.raw`E = 97\ \text{лк};\quad M = 73\ \text{лм/м}^2;\quad L = 23\ \text{кд/м}^2`],
  },

  /* ===================== 29.22 ===================== */
  {
    id: '29.22', chapter: CH, section: S3, page: '394–395',
    title: 'Лампочка над белой бумагой',
    given: [[String.raw`I = 10\ \text{кд}`, ''], [String.raw`L = 1\ \text{кд/м}^2`, ''], [String.raw`\rho = 0{,}8`, '']],
    find: String.raw`h \;—\; ?`,
    formulas: [ILL, REFL],
    steps: [
      { title: 'Нужная освещённость', tex: String.raw`E = \frac{\pi L}{\rho} = 3{,}93\ \text{лк}` },
      { title: 'Высота', tex: String.raw`h = \sqrt{\frac IE} = \sqrt{2{,}55} = 1{,}6\ \text{м}` },
    ],
    answer: [String.raw`h = 1{,}6\ \text{м}`],
  },

  /* ===================== 29.23 ===================== */
  {
    id: '29.23', chapter: CH, section: S3, page: '395',
    title: 'Коэффициент отражения сажи',
    given: [[String.raw`E = 150\ \text{лк}`, ''], [String.raw`L = 1\ \text{кд/м}^2`, '']],
    find: String.raw`\rho \;—\; ?`,
    formulas: [REFL],
    steps: [{ title: 'Коэффициент', tex: String.raw`\rho = \frac{\pi L}{E} = \frac{3{,}14}{150} = 0{,}021` }],
    answer: [String.raw`\rho = 0{,}02`],
  }

  );
})();
