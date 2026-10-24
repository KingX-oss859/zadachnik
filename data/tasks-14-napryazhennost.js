/*
  § 14. Напряжённость электрического поля. Электрическое смещение — задачи 14.1–14.75 (стр. 221–233).
  Условия задач показываются дословно из книги (data/book-tasks.js); графики из ответов книги — там же.
  Ответы пересчитаны скриптом tools/check_napryazhennost.py и сверены с book/99-otvety.md.
  Где ответ книги расходится с расчётом — плашка note «Расхождение с ответом книги».
  ε₀ = 8,85·10⁻¹² Ф/м, 1/(4πε₀) = 8,99·10⁹ м/Ф; ε — табл. 17: масло 2,2, парафин 2, стекло 7, эбонит 3.
*/
(function () {
  const CH = 'Гл. 3. Электростатика';
  const S1 = 'Напряжённость поля точечных зарядов';
  const S2 = 'Напряжённость поля заряда, распределённого по кольцу и сфере';
  const S3 = 'Напряжённость поля заряженной линии';
  const S4 = 'Напряжённость поля заряженной плоскости';
  const S5 = 'Напряжённость поля заряда, распределённого по объёму';
  const S6 = 'Метод зеркальных изображений';
  const S7 = 'Сила, действующая на заряд в электрическом поле';
  const S8 = 'Поток напряжённости и поток электрического смещения';
  const MISMATCH = '<b>Расхождение с ответом книги.</b> ';
  const SMALL = '<b>Расхождение в последней цифре.</b> ';
  const TYPO = '<b>Опечатка в ответе книги.</b> ';

  const EP = { tex: String.raw`E = \frac{Q}{4\pi\varepsilon_0\varepsilon r^2}`, text: 'напряжённость поля точечного заряда; 1/(4πε₀) = 9·10⁹ м/Ф' };
  const SUP = { tex: String.raw`\vec E = \sum\vec E_i`, text: 'принцип суперпозиции полей' };
  const ELINE = { tex: String.raw`E = \frac{\tau}{2\pi\varepsilon_0\varepsilon r}`, text: 'поле бесконечной равномерно заряженной нити (цилиндра вне его)' };
  const EROD = { tex: String.raw`E_\perp = \frac{\tau}{4\pi\varepsilon_0r}(\sin\alpha_2 - \sin\alpha_1),\quad E_\parallel = \frac{\tau}{4\pi\varepsilon_0r}(\cos\alpha_1 - \cos\alpha_2)`, text: 'поле отрезка нити: r — расстояние до прямой нити, α — углы, под которыми видны концы (от перпендикуляра)' };
  const EPLANE = { tex: String.raw`E = \frac{\sigma}{2\varepsilon_0\varepsilon}`, text: 'поле бесконечной равномерно заряженной плоскости' };
  const GAUSS = { tex: String.raw`\oint\vec D\,d\vec S = Q_\text{внутри},\quad \vec D = \varepsilon_0\varepsilon\vec E`, text: 'теорема Остроградского — Гаусса для электрического смещения' };
  const FLUX = { tex: String.raw`\Phi_E = \int E_n\,dS,\quad \Psi = \int D_n\,dS`, text: 'поток напряжённости и поток смещения через поверхность' };
  const FORCE = { tex: String.raw`\vec F = Q\vec E`, text: 'сила, действующая на заряд в поле' };
  const IMAGE = { tex: String.raw`Q' = -Q`, text: 'метод изображений: проводящую плоскость заменяют зарядом −Q, симметричным заряду Q относительно плоскости' };

  window.TASKS.push(

  /* ===================== 14.1 ===================== */
  {
    id: '14.1', chapter: CH, section: S1, page: '221',
    title: 'Поле заряда в масле',
    given: [[String.raw`Q = 10\ \text{нКл}`, String.raw`10^{-8}\ \text{Кл}`], [String.raw`r = 10\ \text{см}`, String.raw`0{,}1\ \text{м}`], [String.raw`\varepsilon = 2{,}2`, '']],
    find: String.raw`E \;—\; ?`,
    formulas: [EP],
    steps: [
      { title: 'Напряжённость',
        tex: String.raw`E = \frac{9\cdot10^9\cdot10^{-8}}{2{,}2\cdot0{,}01} = 4{,}09\ \text{кВ/м}` },
    ],
    answer: [String.raw`E = 4{,}09\ \text{кВ/м}`],
  },

  /* ===================== 14.2 ===================== */
  {
    id: '14.2', chapter: CH, section: S1, page: '221',
    title: 'Поле посередине между зарядами',
    given: [[String.raw`Q_1 = 8\ \text{нКл},\ Q_2 = -5{,}3\ \text{нКл}`, ''], [String.raw`d = 40\ \text{см}`, '']],
    find: String.raw`E \;—\; ?`,
    formulas: [EP, SUP],
    steps: [
      { title: 'Поля зарядов в середине (r = 20 см)',
        tex: String.raw`E_1 = \frac{9\cdot10^9\cdot8\cdot10^{-9}}{0{,}04} = 1800\ \text{В/м},\qquad E_2 = \frac{9\cdot10^9\cdot5{,}3\cdot10^{-9}}{0{,}04} = 1190\ \text{В/м}` },
      { title: 'Разноимённые заряды',
        text: 'Оба поля направлены от Q₁ к Q₂ — складываются.',
        tex: String.raw`E = E_1 + E_2 = 2{,}99\ \text{кВ/м}` },
      { title: 'Одноимённые заряды',
        text: 'Поля направлены навстречу — вычитаются.',
        tex: String.raw`E = E_1 - E_2 = 607\ \text{В/м}` },
    ],
    answer: [String.raw`2{,}99\ \text{кВ/м};\quad 607\ \text{В/м}`],
  },

  /* ===================== 14.3 ===================== */
  {
    id: '14.3', chapter: CH, section: S1, page: '221',
    title: 'Точка на продолжении прямой зарядов',
    given: [[String.raw`Q_1 = 10\ \text{нКл},\ Q_2 = -20\ \text{нКл}`, ''], [String.raw`d = 20\ \text{см}`, ''], [String.raw`r_1 = 30\ \text{см},\ r_2 = 50\ \text{см}`, '']],
    find: String.raw`E \;—\; ?`,
    formulas: [EP, SUP],
    steps: [
      { title: 'Где точка',
        text: '30 + 20 = 50 — «треугольник» вырожденный: точка лежит на прямой зарядов за зарядом Q₁.' },
      { title: 'Поля направлены противоположно',
        text: 'Поле Q₁ — от него (от Q₂ прочь), поле отрицательного Q₂ — к нему.',
        tex: String.raw`E = \frac{9\cdot10^9\cdot10^{-8}}{0{,}09} - \frac{9\cdot10^9\cdot2\cdot10^{-8}}{0{,}25} = 999 - 719 = 280\ \text{В/м}` },
    ],
    answer: [String.raw`E = 280\ \text{В/м}`],
  },

  /* ===================== 14.4 ===================== */
  {
    id: '14.4', chapter: CH, section: S1, page: '221',
    title: 'Где поле равно нулю',
    given: [[String.raw`Q_1 = 9Q,\ Q_2 = Q`, ''], [String.raw`d = 8\ \text{см}`, '']],
    find: String.raw`r \;—\; ?`,
    formulas: [EP],
    steps: [
      { title: 'Одноимённые — между зарядами',
        tex: String.raw`\frac{9}{r^2} = \frac{1}{(d - r)^2} \;\Rightarrow\; 3(d - r) = r \;\Rightarrow\; r = \frac34d = 6\ \text{см}` },
      { title: 'Разноимённые — за меньшим зарядом',
        tex: String.raw`\frac{9}{r^2} = \frac{1}{(r - d)^2} \;\Rightarrow\; 3(r - d) = r \;\Rightarrow\; r = \frac32d = 12\ \text{см}` },
    ],
    answer: [String.raw`6\ \text{см};\quad 12\ \text{см}`],
  },

  /* ===================== 14.5 ===================== */
  {
    id: '14.5', chapter: CH, section: S1, page: '221',
    title: 'Нулевая точка у зарядов 2Q и −Q',
    given: [[String.raw`Q_1 = 2Q,\ Q_2 = -Q`, ''], [String.raw`d`, '']],
    find: String.raw`d_1 \;—\; ?`,
    formulas: [EP],
    steps: [
      { title: 'Только за меньшим (отрицательным) зарядом',
        text: 'Между зарядами поля складываются; за большим зарядом его поле всегда сильнее.',
        tex: String.raw`\frac{2}{(d + d_1)^2} = \frac{1}{d_1^2} \;\Rightarrow\; d + d_1 = \sqrt2d_1 \;\Rightarrow\; d_1 = \frac{d}{\sqrt2 - 1} = d(\sqrt2 + 1)` },
    ],
    answer: [String.raw`d_1 = d(\sqrt2 + 1)\ \text{за отрицательным зарядом}`],
  },

  /* ===================== 14.6 ===================== */
  {
    id: '14.6', chapter: CH, section: S1, page: '221',
    title: 'Поле двух зарядов в точке треугольника',
    note: MISMATCH + String.raw`В книге 34 кВ/м. Поля зарядов в этой точке одинаковы (по 25,0 кВ/м), угол между ними по теореме косинусов — 123,7°, и результирующая 23,5 кВ/м.`,
    given: [[String.raw`Q_1 = 40\ \text{нКл},\ Q_2 = -10\ \text{нКл}`, ''], [String.raw`d = 10\ \text{см}`, ''], [String.raw`r_1 = 12\ \text{см},\ r_2 = 6\ \text{см}`, '']],
    find: String.raw`E \;—\; ?`,
    formulas: [EP, SUP],
    steps: [
      { title: 'Модули полей',
        tex: String.raw`E_1 = \frac{9\cdot10^9\cdot4\cdot10^{-8}}{0{,}0144} = 25{,}0\ \text{кВ/м},\qquad E_2 = \frac{9\cdot10^9\cdot10^{-8}}{0{,}0036} = 25{,}0\ \text{кВ/м}` },
      { title: 'Угол при точке',
        tex: String.raw`\cos\gamma = \frac{r_1^2 + r_2^2 - d^2}{2r_1r_2} = \frac{0{,}008}{0{,}0144} = 0{,}556` },
      { title: 'Направления',
        text: String.raw`$\vec E_1$ направлен от $Q_1$, $\vec E_2$ — к $Q_2$; угол между ними $180^\circ - \gamma$.`,
        tex: String.raw`E = \sqrt{E_1^2 + E_2^2 - 2E_1E_2\cos\gamma} = 25{,}0\sqrt{2(1 - 0{,}556)} = 23{,}5\ \text{кВ/м}` },
    ],
    answer: [String.raw`E = 23{,}5\ \text{кВ/м}`],
  },

  /* ===================== 14.7 ===================== */
  {
    id: '14.7', chapter: CH, section: S2, page: '221',
    title: 'Поле на оси заряженного кольца',
    given: [[String.raw`R = 8\ \text{см}`, ''], [String.raw`\tau = 10\ \text{нКл/м}`, ''], [String.raw`r = 10\ \text{см}`, '']],
    find: String.raw`E \;—\; ?`,
    formulas: [EP, SUP],
    steps: [
      { title: 'Складываем осевые составляющие',
        text: 'Составляющие, параллельные плоскости кольца, гасятся. Осевая составляющая каждого элемента — dE·cosφ, cosφ = √(r² − R²)/r.',
        tex: String.raw`E = \frac{\tau\cdot2\pi R}{4\pi\varepsilon_0r^2}\cdot\frac{\sqrt{r^2 - R^2}}{r} = \frac{\tau R\sqrt{r^2 - R^2}}{2\varepsilon_0r^3}` },
      { title: 'Числа',
        tex: String.raw`E = \frac{10^{-8}\cdot0{,}08\cdot0{,}06}{2\cdot8{,}85\cdot10^{-12}\cdot10^{-3}} = 2{,}71\ \text{кВ/м}` },
    ],
    answer: [String.raw`E = 2{,}71\ \text{кВ/м}`],
  },

  /* ===================== 14.8 ===================== */
  {
    id: '14.8', chapter: CH, section: S2, page: '221',
    title: 'Поле в центре полусферы',
    note: TYPO + String.raw`В решении из ответа книги в конце напечатано $\frac{\sigma}{4\pi\varepsilon_0}$; интеграл $\frac{\sigma}{2\varepsilon_0}\int_0^{\pi/2}\sin\varphi\cos\varphi\,d\varphi$ равен $\frac{\sigma}{4\varepsilon_0}$ — как и в начале ответа.`,
    given: [[String.raw`\sigma = 1\ \text{нКл/м}^2`, '']],
    find: String.raw`E \;—\; ?`,
    formulas: [EP, SUP],
    steps: [
      { title: 'Полусфера из колец',
        text: String.raw`Кольцо под углом $\varphi$: радиус $R\sin\varphi$, заряд $dQ = \sigma\cdot2\pi R\sin\varphi\cdot R\,d\varphi$, расстояние до центра $R$, осевая доля $\cos\varphi$.`,
        tex: String.raw`E = \int_0^{\pi/2}\frac{\sigma2\pi R^2\sin\varphi\cos\varphi\,d\varphi}{4\pi\varepsilon_0R^2} = \frac{\sigma}{2\varepsilon_0}\cdot\frac12 = \frac{\sigma}{4\varepsilon_0}` },
      { title: 'Числа',
        tex: String.raw`E = \frac{10^{-9}}{4\cdot8{,}85\cdot10^{-12}} = 28{,}2\ \text{В/м}` },
    ],
    answer: [String.raw`E = \frac{\sigma}{4\varepsilon_0} = 28{,}2\ \text{В/м}`],
  },

  /* ===================== 14.9 ===================== */
  {
    id: '14.9', chapter: CH, section: S2, page: '221',
    title: 'Заряженная металлическая сфера',
    given: [[String.raw`R = 10\ \text{см}`, ''], [String.raw`Q = 1\ \text{нКл}`, ''], [String.raw`r_1 = 8\ \text{см},\ r_2 = 15\ \text{см}`, '']],
    find: String.raw`E \;—\; ?`,
    formulas: [GAUSS, EP],
    steps: [
      { title: 'Внутри',
        text: 'Весь заряд на поверхности; внутри сферы Гаусса заряда нет.',
        tex: String.raw`E_1 = 0` },
      { title: 'Снаружи — как от точечного заряда',
        tex: String.raw`E(R) = \frac{9\cdot10^9\cdot10^{-9}}{0{,}01} = 900\ \text{В/м},\qquad E(r_2) = \frac{9}{0{,}0225} = 400\ \text{В/м}` },
      { title: 'График',
        text: 'Внутри — нуль, на поверхности скачок до 900 В/м, дальше спад как 1/r² (график — в ответе книги ниже).' },
    ],
    answer: [String.raw`1)\ 0;\quad 2)\ 900\ \text{В/м};\quad 3)\ 400\ \text{В/м}`],
  },

  /* ===================== 14.10 ===================== */
  {
    id: '14.10', chapter: CH, section: S2, page: '222',
    title: 'Две концентрические сферы',
    given: [[String.raw`R_1 = 6\ \text{см},\ Q_1 = 1\ \text{нКл}`, ''], [String.raw`R_2 = 10\ \text{см},\ Q_2 = -0{,}5\ \text{нКл}`, ''], [String.raw`r = 5;\ 9;\ 15\ \text{см}`, '']],
    find: String.raw`E \;—\; ?`,
    formulas: [GAUSS, EP],
    steps: [
      { title: 'Заряд внутри сферы Гаусса',
        tex: String.raw`r < R_1:\ 0;\qquad R_1 < r < R_2:\ Q_1;\qquad r > R_2:\ Q_1 + Q_2` },
      { title: 'Напряжённость',
        tex: String.raw`E_1 = 0,\quad E_2 = \frac{9\cdot10^9\cdot10^{-9}}{0{,}0081} = 1{,}11\ \text{кВ/м},\quad E_3 = \frac{9\cdot10^9\cdot0{,}5\cdot10^{-9}}{0{,}0225} = 200\ \text{В/м}` },
    ],
    answer: [String.raw`E_1 = 0;\quad E_2 = 1{,}11\ \text{кВ/м};\quad E_3 = 200\ \text{В/м}`],
  },

  /* ===================== 14.11 ===================== */
  {
    id: '14.11', chapter: CH, section: S3, page: '222',
    title: 'Плотность заряда проволоки',
    given: [[String.raw`a = 0{,}5\ \text{м}`, ''], [String.raw`E = 200\ \text{В/м}`, '']],
    find: String.raw`\tau \;—\; ?`,
    formulas: [ELINE],
    steps: [
      { title: 'Из поля нити',
        tex: String.raw`\tau = 2\pi\varepsilon_0aE = 2\cdot3{,}14\cdot8{,}85\cdot10^{-12}\cdot0{,}5\cdot200 = 5{,}56\ \text{нКл/м}` },
    ],
    answer: [String.raw`\tau = 5{,}56\ \text{нКл/м}`],
  },

  /* ===================== 14.12 ===================== */
  {
    id: '14.12', chapter: CH, section: S3, page: '222',
    title: 'Две разноимённые проволоки',
    given: [[String.raw`d = 16\ \text{см}`, ''], [String.raw`|\tau| = 150\ \text{мкКл/м}`, ''], [String.raw`r = 10\ \text{см}`, '']],
    find: String.raw`E \;—\; ?`,
    formulas: [ELINE, SUP],
    steps: [
      { title: 'Поле каждой проволоки',
        tex: String.raw`E_0 = \frac{2\cdot9\cdot10^9\cdot1{,}5\cdot10^{-4}}{0{,}1} = 27\ \text{МВ/м}` },
      { title: 'Сложение',
        text: 'Точка на перпендикуляре к середине отрезка между проволоками (половина отрезка 8 см, высота 6 см). Составляющие вдоль перпендикуляра гасятся, вдоль линии проволок — складываются (косинус 8/10).',
        tex: String.raw`E = 2E_0\cdot\frac{d/2}{r} = 2\cdot27\cdot0{,}8 = 43{,}2\ \text{МВ/м}` },
    ],
    answer: [String.raw`E = 43{,}2\ \text{МВ/м}`],
  },

  /* ===================== 14.13 ===================== */
  {
    id: '14.13', chapter: CH, section: S3, page: '222',
    title: 'Поле у заряженного стержня',
    given: [[String.raw`d = 5\ \text{см},\ l = 4\ \text{м}`, ''], [String.raw`Q = 500\ \text{нКл}`, ''], [String.raw`a = 1\ \text{см от поверхности}`, '']],
    find: String.raw`E \;—\; ?`,
    formulas: [ELINE],
    steps: [
      { title: 'Стержень почти бесконечный',
        text: 'Точка в 3,5 см от оси, а длина 4 м — поле как у бесконечного цилиндра.',
        tex: String.raw`\tau = \frac Ql = 125\ \text{нКл/м},\qquad E = \frac{2\cdot9\cdot10^9\cdot1{,}25\cdot10^{-7}}{0{,}035} = 64{,}3\ \text{кВ/м}` },
    ],
    answer: [String.raw`E = 64{,}3\ \text{кВ/м}`],
  },

  /* ===================== 14.14 ===================== */
  {
    id: '14.14', chapter: CH, section: S3, page: '222',
    title: 'Заряженная трубка',
    given: [[String.raw`R = 2\ \text{см}`, ''], [String.raw`\sigma = 1\ \text{нКл/м}^2`, ''], [String.raw`r_1 = 1\ \text{см},\ r_2 = 3\ \text{см}`, '']],
    find: String.raw`E \;—\; ?`,
    formulas: [GAUSS, ELINE],
    steps: [
      { title: 'Внутри',
        tex: String.raw`E_1 = 0` },
      { title: 'Снаружи',
        text: 'Заряд на единицу длины τ = 2πRσ.',
        tex: String.raw`E_2 = \frac{2\pi R\sigma}{2\pi\varepsilon_0r_2} = \frac{R\sigma}{\varepsilon_0r_2} = \frac{0{,}02\cdot10^{-9}}{8{,}85\cdot10^{-12}\cdot0{,}03} = 75{,}3\ \text{В/м}` },
    ],
    answer: [String.raw`E_1 = 0;\quad E_2 = 75{,}3\ \text{В/м}`],
  },

  /* ===================== 14.15 ===================== */
  {
    id: '14.15', chapter: CH, section: S3, page: '222',
    title: 'Коаксиальные трубки с эбонитом',
    note: TYPO + String.raw`В формуле книги для $E_2$ пропущена проницаемость эбонита: $E_2 = \frac{\tau_1}{2\pi\varepsilon_0\varepsilon r_2}$ ($\varepsilon = 3$). Число 200 В/м посчитано с ней.`,
    given: [[String.raw`R_1 = 2\ \text{см},\ \tau_1 = 1\ \text{нКл/м}`, ''], [String.raw`R_2 = 4\ \text{см},\ \tau_2 = -0{,}5\ \text{нКл/м}`, ''], [String.raw`\varepsilon = 3`, '']],
    find: String.raw`E \;—\; ?`,
    formulas: [GAUSS, ELINE],
    steps: [
      { title: 'r₁ = 1 см — внутри',
        tex: String.raw`E_1 = 0` },
      { title: 'r₂ = 3 см — в эбоните',
        tex: String.raw`E_2 = \frac{\tau_1}{2\pi\varepsilon_0\varepsilon r_2} = \frac{18\cdot10^9\cdot10^{-9}}{3\cdot0{,}03} = 200\ \text{В/м}` },
      { title: 'r₃ = 5 см — снаружи (воздух)',
        tex: String.raw`E_3 = \frac{\tau_1 + \tau_2}{2\pi\varepsilon_0r_3} = \frac{18\cdot0{,}5}{0{,}05} = 180\ \text{В/м}` },
    ],
    answer: [String.raw`E_1 = 0;\quad E_2 = 200\ \text{В/м};\quad E_3 = 180\ \text{В/м}`],
  },

  /* ===================== 14.16 ===================== */
  {
    id: '14.16', chapter: CH, section: S3, page: '222',
    title: 'Поле на оси отрезка',
    given: [[String.raw`l = 10\ \text{см}`, ''], [String.raw`\tau = 3\ \text{мкКл/м}`, '']],
    find: String.raw`E \;—\; ?`,
    formulas: [EP],
    steps: [
      { title: 'Интеграл вдоль оси',
        text: 'Точка на расстоянии l от ближнего конца и 2l от дальнего.',
        tex: String.raw`E = \frac{\tau}{4\pi\varepsilon_0}\int_l^{2l}\frac{dx}{x^2} = \frac{\tau}{4\pi\varepsilon_0}\cdot\frac{1}{2l} = \frac{9\cdot10^9\cdot3\cdot10^{-6}}{0{,}2} = 135\ \text{кВ/м}` },
    ],
    answer: [String.raw`E = \frac{\tau}{8\pi\varepsilon_0l} = 135\ \text{кВ/м}`],
  },

  /* ===================== 14.17 ===================== */
  {
    id: '14.17', chapter: CH, section: S3, page: '222',
    title: 'Поле против середины стержня',
    note: SMALL + String.raw`В книге 55,7 кВ/м; подстановка в ту же формулу даёт 55,3 кВ/м.`,
    given: [[String.raw`l = 12\ \text{см}`, ''], [String.raw`\tau = 200\ \text{нКл/м}`, ''], [String.raw`r = 5\ \text{см}`, '']],
    find: String.raw`E \;—\; ?`,
    formulas: [EROD],
    steps: [
      { title: 'Концы видны под углами ±α',
        tex: String.raw`\sin\alpha = \frac{l/2}{\sqrt{r^2 + l^2/4}} = \frac{6}{7{,}81} = 0{,}768` },
      { title: 'Напряжённость',
        tex: String.raw`E = \frac{2\tau}{4\pi\varepsilon_0r}\sin\alpha = \frac{\tau l}{2\pi\varepsilon_0r\sqrt{4r^2 + l^2}} = 71{,}9\cdot0{,}768 = 55{,}3\ \text{кВ/м}` },
    ],
    answer: [String.raw`E = 55{,}3\ \text{кВ/м}`],
  },

  /* ===================== 14.18 ===================== */
  {
    id: '14.18', chapter: CH, section: S3, page: '223',
    title: 'Поле на перпендикуляре из конца стержня',
    note: MISMATCH + String.raw`В книге 35,6 кВ/м. Обе составляющие поля (поперёк стержня 35,1 и вдоль 16,9 кВ/м) дают 38,9 кВ/м; результат проверен численным интегрированием. Та же геометрия в задаче 14.57 у книги посчитана с обеими составляющими.`,
    given: [[String.raw`l = 10\ \text{см}`, ''], [String.raw`\tau = 400\ \text{нКл/м}`, ''], [String.raw`r = 8\ \text{см}`, '']],
    find: String.raw`E \;—\; ?`,
    formulas: [EROD],
    steps: [
      { title: 'Угол, под которым виден дальний конец',
        tex: String.raw`\operatorname{tg}\alpha = \frac lr = 1{,}25,\qquad \sin\alpha = 0{,}781,\quad \cos\alpha = 0{,}625` },
      { title: 'Составляющие',
        tex: String.raw`\frac{\tau}{4\pi\varepsilon_0r} = 44{,}9\ \text{кВ/м},\quad E_\perp = 44{,}9\cdot0{,}781 = 35{,}1,\quad E_\parallel = 44{,}9\,(1 - 0{,}625) = 16{,}9\ \text{кВ/м}` },
      { title: 'Модуль',
        tex: String.raw`E = \sqrt{35{,}1^2 + 16{,}9^2} = 38{,}9\ \text{кВ/м}` },
    ],
    answer: [String.raw`E = 38{,}9\ \text{кВ/м}`],
  },

  /* ===================== 14.19 ===================== */
  {
    id: '14.19', chapter: CH, section: S3, page: '223',
    title: 'Стержень по трём сторонам квадрата',
    note: MISMATCH + String.raw`В книге 60,2 кВ/м. Сумма полей трёх сторон (рассчитана по формулам и проверена численным интегрированием) — 69,8 кВ/м.`,
    given: [[String.raw`a = 20\ \text{см}`, ''], [String.raw`\tau = 500\ \text{нКл/м}`, '']],
    find: String.raw`E_A \;—\; ?`,
    formulas: [EROD, SUP],
    steps: [
      { title: 'Единица',
        tex: String.raw`E_0 = \frac{\tau}{4\pi\varepsilon_0a} = \frac{9\cdot10^9\cdot5\cdot10^{-7}}{0{,}2} = 22{,}5\ \text{кВ/м}` },
      { title: 'Дальняя сторона (против A, на расстоянии a)',
        text: 'Концы видны под углами ±α, tgα = (a/2)/a.',
        tex: String.raw`E_1 = 2E_0\sin\alpha = 2E_0\cdot0{,}447 = 0{,}894E_0` },
      { title: 'Верхняя и нижняя стороны',
        text: 'A лежит на перпендикуляре из их концов на расстоянии a/2. Поперечные составляющие двух сторон гасятся, продольные (от квадрата) складываются; дальний конец виден под углом β, tgβ = a/(a/2) = 2.',
        tex: String.raw`E_{2,3} = 2\cdot\frac{\tau}{4\pi\varepsilon_0(a/2)}(1 - \cos\beta) = 4E_0(1 - 0{,}447) = 2{,}211E_0` },
      { title: 'Итого',
        text: 'Все три вклада направлены одинаково — от квадрата.',
        tex: String.raw`E_A = (0{,}894 + 2{,}211)E_0 = 3{,}106\cdot22{,}5 = 69{,}8\ \text{кВ/м}` },
    ],
    answer: [String.raw`E_A = 69{,}8\ \text{кВ/м}`],
  },

  /* ===================== 14.20 ===================== */
  {
    id: '14.20', chapter: CH, section: S3, page: '223',
    title: 'Два стержня под прямым углом',
    note: SMALL + String.raw`В книге 38,0 кВ/м; расчёт (и численное интегрирование) даёт 38,2 кВ/м.`,
    given: [[String.raw`l_1 = 12\ \text{см},\ l_2 = 16\ \text{см}`, ''], [String.raw`\tau = 400\ \text{нКл/м}`, '']],
    find: String.raw`E_A \;—\; ?`,
    formulas: [EROD, SUP],
    steps: [
      { title: 'Геометрия рис. 14.10',
        text: 'A — противоположная вершина прямоугольника l₂ × l₁. Для стержня l₁ точка A на перпендикуляре из его конца на расстоянии l₂, для стержня l₂ — на расстоянии l₁.' },
      { title: 'Стержень l₁ (r = 16 см, sinα = 0,6, cosα = 0,8)',
        tex: String.raw`E_\perp = \frac{\tau}{4\pi\varepsilon_0l_2}\cdot0{,}6 = 13{,}5,\qquad E_\parallel = \frac{\tau}{4\pi\varepsilon_0l_2}\cdot0{,}2 = 4{,}5\ \text{кВ/м}` },
      { title: 'Стержень l₂ (r = 12 см, sinβ = 0,8, cosβ = 0,6)',
        tex: String.raw`E_\perp = \frac{\tau}{4\pi\varepsilon_0l_1}\cdot0{,}8 = 24{,}0,\qquad E_\parallel = \frac{\tau}{4\pi\varepsilon_0l_1}\cdot0{,}4 = 12{,}0\ \text{кВ/м}` },
      { title: 'Сложение по осям',
        tex: String.raw`E_x = 13{,}5 + 12{,}0 = 25{,}5,\quad E_y = 4{,}5 + 24{,}0 = 28{,}5,\quad E_A = \sqrt{25{,}5^2 + 28{,}5^2} = 38{,}2\ \text{кВ/м}` },
    ],
    answer: [String.raw`E_A = 38{,}2\ \text{кВ/м}`],
  },

  /* ===================== 14.21 ===================== */
  {
    id: '14.21', chapter: CH, section: S4, page: '223',
    title: 'Две одноимённо заряженные пластины',
    given: [[String.raw`\sigma_1 = \sigma_2 = 1\ \text{нКл/м}^2`, '']],
    find: String.raw`E \;—\; ?`,
    formulas: [EPLANE, SUP],
    steps: [
      { title: 'Между пластинами',
        text: 'Поля пластин направлены навстречу и равны.',
        tex: String.raw`E = 0` },
      { title: 'Снаружи',
        tex: String.raw`E = 2\cdot\frac{\sigma}{2\varepsilon_0} = \frac{\sigma}{\varepsilon_0} = 113\ \text{В/м}` },
    ],
    answer: [String.raw`1)\ 0;\quad 2)\ 113\ \text{В/м}`],
  },

  /* ===================== 14.22 ===================== */
  {
    id: '14.22', chapter: CH, section: S4, page: '223',
    title: 'Пластины с σ = 1 и 3 нКл/м²',
    given: [[String.raw`\sigma_1 = 1\ \text{нКл/м}^2,\ \sigma_2 = 3\ \text{нКл/м}^2`, '']],
    find: String.raw`E \;—\; ?`,
    formulas: [EPLANE, SUP],
    steps: [
      { title: 'Между',
        tex: String.raw`E_1 = \frac{\sigma_2 - \sigma_1}{2\varepsilon_0} = 113\ \text{В/м}` },
      { title: 'Снаружи',
        tex: String.raw`E_2 = \frac{\sigma_1 + \sigma_2}{2\varepsilon_0} = 226\ \text{В/м}` },
    ],
    answer: [String.raw`1)\ 113\ \text{В/м};\quad 2)\ 226\ \text{В/м}`],
  },

  /* ===================== 14.23 ===================== */
  {
    id: '14.23', chapter: CH, section: S4, page: '223',
    title: 'Разноимённо заряженные пластины',
    given: [[String.raw`\sigma_1 = 2\ \text{нКл/м}^2,\ \sigma_2 = -5\ \text{нКл/м}^2`, '']],
    find: String.raw`E \;—\; ?`,
    formulas: [EPLANE, SUP],
    steps: [
      { title: 'Между — поля складываются',
        tex: String.raw`E_1 = \frac{|\sigma_1| + |\sigma_2|}{2\varepsilon_0} = \frac{7\cdot10^{-9}}{1{,}77\cdot10^{-11}} = 396\ \text{В/м}` },
      { title: 'Снаружи — вычитаются',
        tex: String.raw`E_2 = \frac{|\sigma_1 + \sigma_2|}{2\varepsilon_0} = 170\ \text{В/м}` },
    ],
    answer: [String.raw`1)\ 396\ \text{В/м};\quad 2)\ 170\ \text{В/м}`],
  },

  /* ===================== 14.24 ===================== */
  {
    id: '14.24', chapter: CH, section: S4, page: '224',
    title: 'Поле между близкими пластинами',
    given: [[String.raw`a = 10\ \text{см},\ b = 15\ \text{см}`, ''], [String.raw`Q_1 = 50\ \text{нКл},\ Q_2 = 150\ \text{нКл}`, '']],
    find: String.raw`E \;—\; ?`,
    formulas: [EPLANE, SUP],
    steps: [
      { title: 'Пластины как плоскости',
        tex: String.raw`E = \frac{\sigma_2 - \sigma_1}{2\varepsilon_0} = \frac{Q_2 - Q_1}{2\varepsilon_0ab} = \frac{10^{-7}}{2\cdot8{,}85\cdot10^{-12}\cdot0{,}015} = 377\ \text{кВ/м}` },
    ],
    answer: [String.raw`E = 377\ \text{кВ/м}`],
  },

  /* ===================== 14.25 ===================== */
  {
    id: '14.25', chapter: CH, section: S4, page: '224',
    title: 'Притяжение заряженных плоскостей',
    given: [[String.raw`\sigma_1 = 10\ \text{нКл/м}^2,\ \sigma_2 = -30\ \text{нКл/м}^2`, ''], [String.raw`S = 1\ \text{м}^2`, '']],
    find: String.raw`F \;—\; ?`,
    formulas: [EPLANE, FORCE],
    steps: [
      { title: 'Заряд одной пластины в поле другой',
        text: 'Своё поле на пластину не действует.',
        tex: String.raw`F = \sigma_1S\cdot\frac{|\sigma_2|}{2\varepsilon_0} = \frac{10^{-8}\cdot3\cdot10^{-8}}{1{,}77\cdot10^{-11}} = 16{,}9\ \text{мкН}` },
    ],
    answer: [String.raw`F = 16{,}9\ \text{мкН}`],
  },

  /* ===================== 14.26 ===================== */
  {
    id: '14.26', chapter: CH, section: S4, page: '224',
    title: 'Заряд притягивающихся пластин',
    given: [[String.raw`R = 10\ \text{см}`, ''], [String.raw`F = 2\ \text{мН}`, '']],
    find: String.raw`Q \;—\; ?`,
    formulas: [EPLANE, FORCE],
    steps: [
      { title: 'Сила',
        tex: String.raw`F = Q\frac{\sigma}{2\varepsilon_0} = \frac{Q^2}{2\varepsilon_0\pi R^2}` },
      { title: 'Заряд',
        tex: String.raw`Q = R\sqrt{2\pi\varepsilon_0F} = 0{,}1\sqrt{2\cdot3{,}14\cdot8{,}85\cdot10^{-12}\cdot2\cdot10^{-3}} = 33{,}3\ \text{нКл}` },
    ],
    answer: [String.raw`Q = 33{,}3\ \text{нКл}`],
  },

  /* ===================== 14.27 ===================== */
  {
    id: '14.27', chapter: CH, section: S5, page: '224',
    title: 'Заряженный эбонитовый шар',
    given: [[String.raw`R = 5\ \text{см}`, ''], [String.raw`\rho = 10\ \text{нКл/м}^3`, ''], [String.raw`\varepsilon = 3`, ''], [String.raw`r_1 = 3\ \text{см},\ r_2 = 10\ \text{см}`, '']],
    find: String.raw`E,\ D \;—\; ?`,
    formulas: [GAUSS],
    steps: [
      { title: 'Внутри шара',
        text: 'Сфера Гаусса радиуса r охватывает заряд ρ·4πr³/3.',
        tex: String.raw`D = \frac{\rho r}{3},\qquad E = \frac{\rho r}{3\varepsilon_0\varepsilon}` },
      { title: '1) r₁ = 3 см',
        tex: String.raw`D_1 = 0{,}1\ \text{нКл/м}^2,\qquad E_1 = \frac{10^{-8}\cdot0{,}03}{3\cdot8{,}85\cdot10^{-12}\cdot3} = 3{,}77\ \text{В/м}` },
      { title: '2) Поверхность',
        text: 'D непрерывно, а E скачком растёт в ε раз при выходе из эбонита.',
        tex: String.raw`D_2 = 167\ \text{пКл/м}^2,\quad E'_2 = 6{,}28\ \text{В/м}\ (\text{внутри}),\quad E''_2 = 18{,}8\ \text{В/м}\ (\text{снаружи})` },
      { title: '3) r₂ = 10 см',
        tex: String.raw`D_3 = \frac{\rho R^3}{3r_2^2} = 41{,}7\ \text{пКл/м}^2,\qquad E_3 = \frac{D_3}{\varepsilon_0} = 4{,}71\ \text{В/м}` },
    ],
    answer: [String.raw`1)\ E = 3{,}77\ \text{В/м},\ D = 100\ \text{пКл/м}^2`, String.raw`2)\ E = 6{,}28\ /\ 18{,}8\ \text{В/м},\ D = 167\ \text{пКл/м}^2`, String.raw`3)\ E = 4{,}71\ \text{В/м},\ D = 41{,}7\ \text{пКл/м}^2`],
  },

  /* ===================== 14.28 ===================== */
  {
    id: '14.28', chapter: CH, section: S5, page: '224',
    title: 'Полый стеклянный шар',
    note: TYPO + String.raw`В формуле книги для $E_3$ стоит $\varepsilon$, но точка $r_3 = 12$ см — снаружи шара, в воздухе: $E_3 = \frac{\rho(R_2^3 - R_1^3)}{3\varepsilon_0r_3^2}$. Число 229 В/м посчитано именно так.`,
    given: [[String.raw`\rho = 100\ \text{нКл/м}^3`, ''], [String.raw`R_1 = 5\ \text{см},\ R_2 = 10\ \text{см}`, ''], [String.raw`\varepsilon = 7`, '']],
    find: String.raw`E,\ D \;—\; ?`,
    formulas: [GAUSS],
    steps: [
      { title: '1) r₁ = 3 см — в полости',
        tex: String.raw`E_1 = D_1 = 0` },
      { title: '2) r₂ = 6 см — в стекле',
        tex: String.raw`D_2 = \frac{\rho}{3}\left(r_2 - \frac{R_1^3}{r_2^2}\right) = 843\ \text{пКл/м}^2,\qquad E_2 = \frac{D_2}{\varepsilon_0\varepsilon} = 13{,}6\ \text{В/м}` },
      { title: '3) r₃ = 12 см — снаружи',
        tex: String.raw`D_3 = \frac{\rho(R_2^3 - R_1^3)}{3r_3^2} = 2{,}03\ \text{нКл/м}^2,\qquad E_3 = \frac{D_3}{\varepsilon_0} = 229\ \text{В/м}` },
    ],
    answer: [String.raw`1)\ 0;\quad 2)\ 13{,}6\ \text{В/м},\ 843\ \text{пКл/м}^2;\quad 3)\ 229\ \text{В/м},\ 2{,}03\ \text{нКл/м}^2`],
  },

  /* ===================== 14.29 ===================== */
  {
    id: '14.29', chapter: CH, section: S5, page: '224',
    title: 'Заряженный парафиновый цилиндр',
    note: TYPO + String.raw`В формуле книги для $E_2$ лишний множитель $\frac12$: должно быть $E_2 = \frac{\rho R^2}{2\varepsilon_0r_2}$. Число 7,55 В/м верное (точнее 7,53).`,
    given: [[String.raw`R = 2\ \text{см}`, ''], [String.raw`\rho = 10\ \text{нКл/м}^3`, ''], [String.raw`\varepsilon = 2`, ''], [String.raw`r_1 = 1\ \text{см},\ r_2 = 3\ \text{см}`, '']],
    find: String.raw`E,\ D \;—\; ?`,
    formulas: [GAUSS],
    steps: [
      { title: '1) Внутри',
        text: 'Цилиндр Гаусса радиуса r и длины h охватывает заряд ρπr²h.',
        tex: String.raw`D_1 = \frac{\rho r_1}{2} = 50\ \text{пКл/м}^2,\qquad E_1 = \frac{D_1}{\varepsilon_0\varepsilon} = 2{,}82\ \text{В/м}` },
      { title: '2) Снаружи',
        tex: String.raw`D_2 = \frac{\rho R^2}{2r_2} = 66{,}7\ \text{пКл/м}^2,\qquad E_2 = \frac{D_2}{\varepsilon_0} = 7{,}53\ \text{В/м}` },
    ],
    answer: [String.raw`1)\ 2{,}82\ \text{В/м},\ 50\ \text{пКл/м}^2;\quad 2)\ 7{,}53\ \text{В/м},\ 66{,}7\ \text{пКл/м}^2`],
  },

  /* ===================== 14.30 ===================== */
  {
    id: '14.30', chapter: CH, section: S5, page: '224–225',
    title: 'Поле у заряженной пластины',
    given: [[String.raw`d = 1\ \text{см}`, ''], [String.raw`\rho = 100\ \text{нКл/м}^3`, '']],
    find: String.raw`E \;—\; ?`,
    formulas: [GAUSS],
    steps: [
      { title: 'Пластина как плоскость с σ = ρd',
        text: 'Снаружи пластины — воздух.',
        tex: String.raw`E = \frac{\rho d}{2\varepsilon_0} = \frac{10^{-7}\cdot0{,}01}{1{,}77\cdot10^{-11}} = 56{,}5\ \text{В/м}` },
    ],
    answer: [String.raw`E = 56{,}5\ \text{В/м}`],
  },

  /* ===================== 14.31 ===================== */
  {
    id: '14.31', chapter: CH, section: S5, page: '225',
    title: 'Заряженный лист стекла',
    given: [[String.raw`d = 2\ \text{см}`, ''], [String.raw`\rho = 1\ \text{мкКл/м}^3`, ''], [String.raw`\varepsilon = 7`, '']],
    find: String.raw`E,\ D\ \text{в}\ A,\ B,\ C \;—\; ?`,
    formulas: [GAUSS],
    steps: [
      { title: 'Внутри листа',
        text: 'По симметрии в середине (A) поле нуль; на расстоянии x от середины цилиндр Гаусса даёт D = ρx.' },
      { title: 'A — середина',
        tex: String.raw`E_A = D_A = 0` },
      { title: 'B — на d/4 от середины',
        tex: String.raw`D_B = \frac{\rho d}{4} = 5\ \text{нКл/м}^2,\qquad E_B = \frac{D_B}{\varepsilon_0\varepsilon} = 80{,}7\ \text{В/м}` },
      { title: 'C — поверхность',
        tex: String.raw`D_C = \frac{\rho d}{2} = 10\ \text{нКл/м}^2,\quad E'_C = 161\ \text{В/м}\ (\text{в стекле}),\quad E''_C = \frac{D_C}{\varepsilon_0} = 1{,}13\ \text{кВ/м}\ (\text{снаружи})` },
    ],
    answer: [String.raw`E_A = 0;\quad E_B = 80{,}7\ \text{В/м},\ D_B = 5\ \text{нКл/м}^2`, String.raw`E_C = 161\ \text{В/м}\ /\ 1{,}13\ \text{кВ/м},\ D_C = 10\ \text{нКл/м}^2`],
  },

  /* ===================== 14.32 ===================== */
  {
    id: '14.32', chapter: CH, section: S6, page: '225',
    title: 'Заряд у проводящей плоскости',
    given: [[String.raw`a = 5\ \text{см}`, ''], [String.raw`Q = 1\ \text{нКл}`, '']],
    find: String.raw`F \;—\; ?`,
    formulas: [IMAGE, EP],
    steps: [
      { title: 'Изображение',
        text: 'Индуцированный заряд действует как −Q на расстоянии 2a.',
        tex: String.raw`F = \frac{Q^2}{4\pi\varepsilon_0(2a)^2} = \frac{Q^2}{16\pi\varepsilon_0a^2} = \frac{9\cdot10^9\cdot10^{-18}}{0{,}01} = 0{,}9\ \text{мкН}` },
    ],
    answer: [String.raw`F = 0{,}9\ \text{мкН}`],
  },

  /* ===================== 14.33 ===================== */
  {
    id: '14.33', chapter: CH, section: S6, page: '225',
    title: 'Поле около заряда над плоскостью',
    given: [[String.raw`a = 10\ \text{см}`, ''], [String.raw`Q = 20\ \text{нКл}`, '']],
    find: String.raw`E \;—\; ?`,
    formulas: [IMAGE, EP, SUP],
    steps: [
      { title: 'Расстояния',
        text: 'Точка на высоте a, от заряда 2a; изображение −Q в 2a под зарядом — от него точка удалена на 2√2·a под углом 45°.' },
      { title: 'Составляющие',
        tex: String.raw`E_0 = \frac{Q}{4\pi\varepsilon_0(2\sqrt2a)^2} = 2{,}25\ \text{кВ/м};\qquad E_x = -\frac{E_0}{\sqrt2},\quad E_y = 2E_0 - \frac{E_0}{\sqrt2}` },
      { title: 'Модуль',
        tex: String.raw`E = E_0\sqrt{5 - 2\sqrt2} = 2{,}25\cdot1{,}474 = 3{,}31\ \text{кВ/м}` },
    ],
    answer: [String.raw`E = 3{,}31\ \text{кВ/м}`],
  },

  /* ===================== 14.34 ===================== */
  {
    id: '14.34', chapter: CH, section: S6, page: '225',
    title: 'Поле на перпендикуляре над зарядом',
    given: [[String.raw`Q = 40\ \text{нКл}`, ''], [String.raw`a = 30\ \text{см}`, '']],
    find: String.raw`E_A \;—\; ?`,
    formulas: [IMAGE, EP],
    steps: [
      { title: 'По рис. 14.12',
        text: 'A на 2a выше заряда; изображение −Q на 4a ниже A. Поля направлены противоположно.',
        tex: String.raw`E = \frac{Q}{4\pi\varepsilon_0}\left(\frac{1}{4a^2} - \frac{1}{16a^2}\right) = \frac{3Q}{64\pi\varepsilon_0a^2} = 749\ \text{В/м}` },
    ],
    answer: [String.raw`E_A = 750\ \text{В/м}`],
  },

  /* ===================== 14.35 ===================== */
  {
    id: '14.35', chapter: CH, section: S6, page: '225',
    title: 'Шарик притянулся к заземлённой пластине',
    given: [[String.raw`a = 10\ \text{см},\ l = 12\ \text{см}`, ''], [String.raw`m = 0{,}1\ \text{г}`, ''], [String.raw`\alpha = 30^\circ`, '']],
    find: String.raw`Q \;—\; ?`,
    formulas: [IMAGE, EP],
    steps: [
      { title: 'Расстояние до изображения',
        tex: String.raw`b = a - l\sin\alpha = 4\ \text{см},\qquad 2b = 8\ \text{см}` },
      { title: 'Равновесие',
        tex: String.raw`\frac{Q^2}{4\pi\varepsilon_0(2b)^2} = mg\operatorname{tg}\alpha \;\Rightarrow\; Q = 2b\sqrt{4\pi\varepsilon_0mg\operatorname{tg}\alpha} = 0{,}08\sqrt{\frac{5{,}66\cdot10^{-4}}{9\cdot10^9}} = 20\ \text{нКл}` },
    ],
    answer: [String.raw`Q = 20\ \text{нКл}`],
  },

  /* ===================== 14.36 ===================== */
  {
    id: '14.36', chapter: CH, section: S7, page: '225',
    title: 'Заряд около нити',
    given: [[String.raw`\tau = 2\ \text{мкКл/м}`, ''], [String.raw`r = 1\ \text{см}`, ''], [String.raw`Q = 0{,}1\ \text{мкКл}`, '']],
    find: String.raw`F \;—\; ?`,
    formulas: [ELINE, FORCE],
    steps: [
      { title: 'Сила',
        tex: String.raw`F = \frac{Q\tau}{2\pi\varepsilon_0r} = \frac{18\cdot10^9\cdot10^{-7}\cdot2\cdot10^{-6}}{0{,}01} = 0{,}36\ \text{Н}` },
    ],
    answer: [String.raw`F = 0{,}36\ \text{Н}`],
  },

  /* ===================== 14.37 ===================== */
  {
    id: '14.37', chapter: CH, section: S7, page: '226',
    title: 'Заряд у заряженной пластины',
    given: [[String.raw`\sigma = 10\ \text{нКл/м}^2`, ''], [String.raw`Q = 100\ \text{нКл}`, '']],
    find: String.raw`F \;—\; ?`,
    formulas: [EPLANE, FORCE],
    steps: [
      { title: 'Пластина как плоскость',
        text: 'Как и в книге, σ — плотность заряда пластины, поле σ/(2ε₀).',
        tex: String.raw`F = \frac{Q\sigma}{2\varepsilon_0} = \frac{10^{-7}\cdot10^{-8}}{1{,}77\cdot10^{-11}} = 56{,}5\ \text{мкН}` },
    ],
    answer: [String.raw`F = 56{,}5\ \text{мкН}`],
  },

  /* ===================== 14.38 ===================== */
  {
    id: '14.38', chapter: CH, section: S7, page: '226',
    title: 'Плотность заряда пластины по силе',
    given: [[String.raw`Q = 1\ \text{мкКл}`, ''], [String.raw`F = 0{,}06\ \text{Н}`, '']],
    find: String.raw`\sigma \;—\; ?`,
    formulas: [EPLANE, FORCE],
    steps: [
      { title: 'Обращаем формулу',
        tex: String.raw`\sigma = \frac{2\varepsilon_0F}{Q} = \frac{2\cdot8{,}85\cdot10^{-12}\cdot0{,}06}{10^{-6}} = 1{,}06\ \text{мкКл/м}^2` },
    ],
    answer: [String.raw`\sigma = 1{,}06\ \text{мкКл/м}^2`],
  },

  /* ===================== 14.39 ===================== */
  {
    id: '14.39', chapter: CH, section: S7, page: '226',
    title: 'Притяжение пластин конденсатора',
    given: [[String.raw`Q = 30\ \text{нКл}`, ''], [String.raw`F_1 = 10^{-2}\ \text{Н}`, ''], [String.raw`S = 100\ \text{см}^2`, '']],
    find: String.raw`F_2 \;—\; ?`,
    formulas: [FORCE, EPLANE],
    steps: [
      { title: 'Плотность заряда пластин',
        tex: String.raw`E = \frac{F_1}{Q} = \frac{\sigma}{\varepsilon_0} \;\Rightarrow\; \sigma = \frac{\varepsilon_0F_1}{Q}` },
      { title: 'Сила притяжения',
        text: 'Пластина находится в поле другой: σ/(2ε₀).',
        tex: String.raw`F_2 = \sigma S\frac{\sigma}{2\varepsilon_0} = \frac{\varepsilon_0F_1^2S}{2Q^2} = \frac{8{,}85\cdot10^{-12}\cdot10^{-4}\cdot0{,}01}{2\cdot9\cdot10^{-16}} = 4{,}92\ \text{мН}` },
    ],
    answer: [String.raw`F_2 = 4{,}92\ \text{мН}`],
  },

  /* ===================== 14.40 ===================== */
  {
    id: '14.40', chapter: CH, section: S7, page: '226',
    title: 'Нить у заряженной плоскости',
    given: [[String.raw`\sigma = 20\ \text{нКл/м}^2`, ''], [String.raw`\tau = 0{,}4\ \text{нКл/м}`, ''], [String.raw`l = 1\ \text{м}`, '']],
    find: String.raw`F \;—\; ?`,
    formulas: [EPLANE, FORCE],
    steps: [
      { title: 'Сила на метр нити',
        tex: String.raw`\frac Fl = \tau\frac{\sigma}{2\varepsilon_0} = \frac{4\cdot10^{-10}\cdot2\cdot10^{-8}}{1{,}77\cdot10^{-11}} = 452\ \text{нН/м}` },
    ],
    answer: [String.raw`F = 452\ \text{нН}`],
  },

  /* ===================== 14.41 ===================== */
  {
    id: '14.41', chapter: CH, section: S7, page: '226',
    title: 'Пластины близко и далеко',
    given: [[String.raw`S = 100\ \text{см}^2`, ''], [String.raw`Q_1 = 100\ \text{нКл},\ Q_2 = -100\ \text{нКл}`, ''], [String.raw`r_1 = 2\ \text{см};\ r_2 = 10\ \text{м}`, '']],
    find: String.raw`F \;—\; ?`,
    formulas: [EPLANE, EP],
    steps: [
      { title: '1) Близко — как плоскости',
        tex: String.raw`F_1 = \frac{Q^2}{2\varepsilon_0S} = \frac{10^{-14}}{1{,}77\cdot10^{-13}} = 56{,}5\ \text{мН}` },
      { title: '2) Далеко — как точечные заряды',
        tex: String.raw`F_2 = \frac{Q^2}{4\pi\varepsilon_0r_2^2} = \frac{9\cdot10^9\cdot10^{-14}}{100} = 0{,}9\ \text{мкН}` },
    ],
    answer: [String.raw`1)\ 56{,}5\ \text{мН};\quad 2)\ 0{,}9\ \text{мкН}`],
  },

  /* ===================== 14.42 ===================== */
  {
    id: '14.42', chapter: CH, section: S7, page: '226',
    title: 'Давление пластин на стекло',
    given: [[String.raw`E = 30\ \text{МВ/м}`, ''], [String.raw`\varepsilon = 7`, '']],
    find: String.raw`p \;—\; ?`,
    formulas: [{ tex: String.raw`p = \frac{\varepsilon_0\varepsilon E^2}{2}`, text: 'давление (плотность энергии) электрического поля' }],
    steps: [
      { title: 'Давление',
        tex: String.raw`p = \frac{8{,}85\cdot10^{-12}\cdot7\cdot9\cdot10^{14}}{2} = 27{,}9\ \text{кПа}` },
    ],
    answer: [String.raw`p = 27{,}9\ \text{кПа}`],
  },

  /* ===================== 14.43 ===================== */
  {
    id: '14.43', chapter: CH, section: S7, page: '226',
    title: 'Две параллельные нити',
    given: [[String.raw`\tau_1 = 100,\ \tau_2 = 200\ \text{нКл/м}`, ''], [String.raw`r = 10\ \text{см}`, '']],
    find: String.raw`F/l \;—\; ?`,
    formulas: [ELINE, FORCE],
    steps: [
      { title: 'Сила на метр',
        tex: String.raw`\frac Fl = \frac{\tau_1\tau_2}{2\pi\varepsilon_0r} = \frac{18\cdot10^9\cdot2\cdot10^{-14}}{0{,}1} = 3{,}6\ \text{мН/м}` },
    ],
    answer: [String.raw`F/l = 3{,}6\ \text{мН/м}`],
  },

  /* ===================== 14.44 ===================== */
  {
    id: '14.44', chapter: CH, section: S7, page: '226',
    title: 'Стержень перпендикулярно нити',
    given: [[String.raw`\tau_1 = 1\ \text{мкКл/м},\ \tau_2 = 0{,}1\ \text{мкКл/м}`, '']],
    find: String.raw`F \;—\; ?`,
    formulas: [ELINE, FORCE],
    steps: [
      { title: 'Интегрируем по стержню',
        text: 'Стержень от l до 2l от нити, длина l не нужна.',
        tex: String.raw`F = \int_l^{2l}\tau_2\frac{\tau_1}{2\pi\varepsilon_0r}dr = \frac{\tau_1\tau_2}{2\pi\varepsilon_0}\ln2 = 18\cdot10^9\cdot10^{-13}\cdot0{,}693 = 1{,}25\ \text{мН}` },
    ],
    answer: [String.raw`F = 1{,}25\ \text{мН}`],
  },

  /* ===================== 14.45 ===================== */
  {
    id: '14.45', chapter: CH, section: S7, page: '226',
    title: 'Нить вдоль силовой линии шара',
    given: [[String.raw`Q_1 = 100\ \text{нКл}`, ''], [String.raw`Q_2 = 10\ \text{нКл}`, ''], [String.raw`R = 10\ \text{см}`, '']],
    find: String.raw`F \;—\; ?`,
    formulas: [EP, FORCE],
    steps: [
      { title: 'Нить от 2R до 3R от центра',
        text: 'Плотность заряда нити Q₂/R.',
        tex: String.raw`F = \frac{Q_1Q_2}{4\pi\varepsilon_0R}\int_{2R}^{3R}\frac{dr}{r^2} = \frac{Q_1Q_2}{24\pi\varepsilon_0R^2} = \frac{9\cdot10^9\cdot10^{-15}}{6\cdot0{,}01} = 150\ \text{мкН}` },
    ],
    answer: [String.raw`F = 150\ \text{мкН}`],
  },

  /* ===================== 14.46 ===================== */
  {
    id: '14.46', chapter: CH, section: S7, page: '226–227',
    title: 'Полукольцо вокруг заряженной нити',
    note: MISMATCH + String.raw`В книге 36 мН, а формула книги $\frac{\tau_1\tau_2}{\pi\varepsilon_0} = \frac{5\cdot10^{-7}\cdot2\cdot10^{-8}}{3{,}14\cdot8{,}85\cdot10^{-12}}$ даёт $3{,}6\cdot10^{-4}$ Н = 0,36 мН — ошибка в 100 раз.`,
    given: [[String.raw`\tau_1 = 500\ \text{нКл/м}`, ''], [String.raw`\tau_2 = 20\ \text{нКл/м}`, '']],
    find: String.raw`F \;—\; ?`,
    formulas: [ELINE, FORCE],
    steps: [
      { title: 'Сила на элемент полукольца',
        text: 'Нить проходит через центр полукольца перпендикулярно его плоскости; поле на полукольце радиальное и одинаковое по модулю.',
        tex: String.raw`dF = \tau_2R\,d\varphi\cdot\frac{\tau_1}{2\pi\varepsilon_0R} = \frac{\tau_1\tau_2}{2\pi\varepsilon_0}d\varphi` },
      { title: 'Сумма по оси симметрии',
        text: 'Радиус R сокращается.',
        tex: String.raw`F = \frac{\tau_1\tau_2}{2\pi\varepsilon_0}\int_0^\pi\sin\varphi\,d\varphi = \frac{\tau_1\tau_2}{\pi\varepsilon_0} = 0{,}36\ \text{мН}` },
    ],
    answer: [String.raw`F = \frac{\tau_1\tau_2}{\pi\varepsilon_0} = 0{,}36\ \text{мН}`],
  },

  /* ===================== 14.47 ===================== */
  {
    id: '14.47', chapter: CH, section: S7, page: '227',
    title: 'Кольцо вокруг заряженной нити',
    note: MISMATCH + String.raw`В книге $F = \frac{\tau_1\tau_2}{\varepsilon_0} = 1{,}13$ мН. Растягивающая сила (натяжение кольца) — половина силы, действующей на полукольцо (задача 14.46): $\frac{\tau_1\tau_2}{2\pi\varepsilon_0} = 0{,}18$ мН. В книге потерян множитель $2\pi$.`,
    given: [[String.raw`\tau_1 = 10^3\ \text{нКл/м}`, ''], [String.raw`\tau_2 = 10\ \text{нКл/м}`, '']],
    find: String.raw`F \;—\; ?`,
    formulas: [ELINE, FORCE],
    steps: [
      { title: 'Сила на полукольцо',
        tex: String.raw`F_{1/2} = \frac{\tau_1\tau_2}{\pi\varepsilon_0}` },
      { title: 'Натяжение',
        text: 'Полукольцо удерживают два сечения кольца.',
        tex: String.raw`F = \frac{F_{1/2}}{2} = \frac{\tau_1\tau_2}{2\pi\varepsilon_0} = 18\cdot10^9\cdot10^{-6}\cdot10^{-8} = 0{,}18\ \text{мН}` },
    ],
    answer: [String.raw`F = 0{,}18\ \text{мН}`],
  },

  /* ===================== 14.48 ===================== */
  {
    id: '14.48', chapter: CH, section: S7, page: '227',
    title: 'Скрещённые нити',
    given: [[String.raw`\tau_1 = \tau_2 = 1\ \text{мкКл/м}`, '']],
    find: String.raw`F \;—\; ?`,
    formulas: [ELINE, FORCE],
    steps: [
      { title: 'Нити на расстоянии h',
        text: 'Элемент второй нити на расстоянии y от общего перпендикуляра находится в поле первой; учитываем составляющую вдоль перпендикуляра.',
        tex: String.raw`F = \int_{-\infty}^{\infty}\tau\frac{\tau}{2\pi\varepsilon_0\sqrt{h^2 + y^2}}\cdot\frac{h}{\sqrt{h^2 + y^2}}dy = \frac{\tau^2h}{2\pi\varepsilon_0}\cdot\frac\pi h = \frac{\tau^2}{2\varepsilon_0}` },
      { title: 'Ответ не зависит от h',
        tex: String.raw`F = \frac{10^{-12}}{1{,}77\cdot10^{-11}} = 56{,}5\ \text{мН}` },
    ],
    answer: [String.raw`F = \frac{\tau^2}{2\varepsilon_0} = 56{,}5\ \text{мН}`],
  },

  /* ===================== 14.49 ===================== */
  {
    id: '14.49', chapter: CH, section: S8, page: '227',
    title: 'Поток через круг у плоскости',
    given: [[String.raw`\sigma = 1\ \text{мкКл/м}^2`, ''], [String.raw`r = 10\ \text{см}`, '']],
    find: String.raw`\Phi_E \;—\; ?`,
    formulas: [FLUX, EPLANE],
    steps: [
      { title: 'Однородное поле, перпендикулярное кругу',
        tex: String.raw`\Phi_E = \frac{\sigma}{2\varepsilon_0}\pi r^2 = \frac{10^{-6}\cdot3{,}14\cdot0{,}01}{1{,}77\cdot10^{-11}} = 1{,}77\ \text{кВ·м}` },
    ],
    answer: [String.raw`\Phi_E = 1{,}77\ \text{кВ·м}`],
  },

  /* ===================== 14.50 ===================== */
  {
    id: '14.50', chapter: CH, section: S8, page: '227',
    title: 'Поток смещения через наклонную пластину',
    given: [[String.raw`a = 10\ \text{см}`, ''], [String.raw`\sigma = 1\ \text{мкКл/м}^2`, ''], [String.raw`\beta = 30^\circ`, '']],
    find: String.raw`\Psi \;—\; ?`,
    formulas: [FLUX],
    steps: [
      { title: 'Нормальная составляющая',
        text: 'D = σ/2; линии поля составляют угол β с плоскостью пластины — нормальная составляющая D·sinβ.',
        tex: String.raw`\Psi = \frac\sigma2a^2\sin\beta = 0{,}5\cdot10^{-6}\cdot0{,}01\cdot0{,}5 = 2{,}5\ \text{нКл}` },
    ],
    answer: [String.raw`\Psi = 2{,}5\ \text{нКл}`],
  },

  /* ===================== 14.51 ===================== */
  {
    id: '14.51', chapter: CH, section: S8, page: '227',
    title: 'Поток через часть сферы',
    given: [[String.raw`R = 20\ \text{см}`, ''], [String.raw`Q = 10\ \text{нКл}`, ''], [String.raw`S = 20\ \text{см}^2`, '']],
    find: String.raw`\Phi_E \;—\; ?`,
    formulas: [FLUX, EP],
    steps: [
      { title: 'Поле перпендикулярно сфере и одинаково',
        tex: String.raw`\Phi_E = ES = \frac{QS}{4\pi\varepsilon_0R^2} = \frac{9\cdot10^9\cdot10^{-8}\cdot2\cdot10^{-3}}{0{,}04} = 4{,}5\ \text{В·м}` },
    ],
    answer: [String.raw`\Phi_E = 4{,}5\ \text{В·м}`],
  },

  /* ===================== 14.52 ===================== */
  {
    id: '14.52', chapter: CH, section: S8, page: '227',
    title: 'Поток через телесный угол',
    given: [[String.raw`\Omega = 0{,}5\ \text{ср}`, ''], [String.raw`Q = 30\ \text{нКл}`, '']],
    find: String.raw`\Psi \;—\; ?`,
    formulas: [GAUSS],
    steps: [
      { title: 'Доля полного потока',
        text: 'Полный поток смещения от заряда равен Q и распределён по полному телесному углу 4π равномерно.',
        tex: String.raw`\Psi = Q\frac{\Omega}{4\pi} = \frac{30\cdot0{,}5}{12{,}57} = 1{,}19\ \text{нКл}` },
    ],
    answer: [String.raw`\Psi = 1{,}19\ \text{нКл}`],
  },

  /* ===================== 14.53 ===================== */
  {
    id: '14.53', chapter: CH, section: S8, page: '227',
    title: 'Поток через далёкую площадку',
    given: [[String.raw`a = 3\ \text{см},\ b = 2\ \text{см}`, ''], [String.raw`R = 1\ \text{м}`, ''], [String.raw`Q = 1\ \text{мкКл}`, ''], [String.raw`\alpha = 30^\circ`, '']],
    find: String.raw`\Phi_E \;—\; ?`,
    formulas: [FLUX, EP],
    steps: [
      { title: 'Площадка мала — поле на ней одинаково',
        tex: String.raw`\Phi_E = \frac{Q}{4\pi\varepsilon_0R^2}ab\sin\alpha = 9\cdot10^3\cdot6\cdot10^{-4}\cdot0{,}5 = 2{,}7\ \text{В·м}` },
    ],
    answer: [String.raw`\Phi_E = 2{,}7\ \text{В·м}`],
  },

  /* ===================== 14.54 ===================== */
  {
    id: '14.54', chapter: CH, section: S8, page: '227',
    title: 'Поток смещения через круглую площадку',
    given: [[String.raw`Q = 100\ \text{нКл}`, ''], [String.raw`R = 30\ \text{см}`, ''], [String.raw`a = 40\ \text{см}`, '']],
    find: String.raw`\Psi \;—\; ?`,
    formulas: [GAUSS],
    steps: [
      { title: 'Через телесный угол конуса',
        text: String.raw`Площадка видна из заряда под телесным углом $\Omega = 2\pi(1 - \cos\theta)$, $\cos\theta = \frac{a}{\sqrt{a^2 + R^2}} = 0{,}8$.`,
        tex: String.raw`\Psi = \frac{Q\Omega}{4\pi} = \frac Q2\left(1 - \frac{a}{\sqrt{a^2 + R^2}}\right) = 50\cdot0{,}2 = 10\ \text{нКл}` },
    ],
    answer: [String.raw`\Psi = 10\ \text{нКл}`],
  },

  /* ===================== 14.55 ===================== */
  {
    id: '14.55', chapter: CH, section: S8, page: '227',
    title: 'Средняя нормальная составляющая поля',
    given: [[String.raw`Q = 1\ \text{мкКл}`, ''], [String.raw`r = 20\ \text{см}\ (\text{до края})`, ''], [String.raw`R = 12\ \text{см}`, '']],
    find: String.raw`\langle E_n\rangle \;—\; ?`,
    formulas: [FLUX, GAUSS],
    steps: [
      { title: 'Поток',
        text: 'cosθ = √(r² − R²)/r = 0,8 — как в задаче 14.54.',
        tex: String.raw`\Phi_E = \frac{Q}{2\varepsilon_0}(1 - \cos\theta) = \frac{10^{-6}\cdot0{,}2}{1{,}77\cdot10^{-11}} = 11{,}3\ \text{кВ·м}` },
      { title: 'Среднее по площадке',
        tex: String.raw`\langle E_n\rangle = \frac{\Phi_E}{\pi R^2} = \frac{11\,300}{0{,}0452} = 250\ \text{кВ/м}` },
    ],
    answer: [String.raw`\langle E_n\rangle = 250\ \text{кВ/м}`],
  },

  /* ===================== 14.56 ===================== */
  {
    id: '14.56', chapter: CH, section: S8, page: '228',
    title: 'Поток от заряженной линии через площадку',
    given: [[String.raw`\tau = 300\ \text{нКл/м}`, ''], [String.raw`r = 20\ \text{см}`, ''], [String.raw`a = 20\ \text{см},\ b = 40\ \text{см}`, '']],
    find: String.raw`\Psi \;—\; ?`,
    formulas: [GAUSS, FLUX],
    steps: [
      { title: 'Угол, под которым видна площадка',
        text: 'Площадка — хорда шириной a на расстоянии r от линии до её краёв: половина угла φ/2 = arcsin(a/2r) = 30°, весь угол 60°.' },
      { title: 'Доля потока',
        text: 'Поток смещения от отрезка линии длиной b равен τb и расходится равномерно по углу 2π.',
        tex: String.raw`\Psi = \tau b\frac{\varphi}{2\pi} = \frac{b\tau}{\pi}\arcsin\frac{a}{2r} = \frac{0{,}4\cdot3\cdot10^{-7}}{3{,}14}\cdot0{,}524 = 20\ \text{нКл}` },
    ],
    answer: [String.raw`\Psi = 20\ \text{нКл}`],
  },

  /* ===================== 14.57 ===================== */
  {
    id: '14.57', chapter: CH, section: S8, page: '228',
    title: 'Поле стержня в точке над его концом',
    given: [[String.raw`l = 20\ \text{см}`, ''], [String.raw`Q = 50\ \text{нКл}`, '']],
    find: String.raw`E,\ \beta \;—\; ?`,
    formulas: [EROD],
    steps: [
      { title: 'Точка на перпендикуляре из конца на расстоянии l',
        text: 'Дальний конец виден под 45°.',
        tex: String.raw`E_y = \frac{\tau}{4\pi\varepsilon_0l}\sin45^\circ,\qquad E_x = \frac{\tau}{4\pi\varepsilon_0l}(1 - \cos45^\circ),\qquad \tau = \frac Ql` },
      { title: 'Модуль',
        tex: String.raw`E = \frac{Q}{4\pi\varepsilon_0l^2}\sqrt{2 - \sqrt2} = 11{,}2\cdot0{,}765 = 8{,}60\ \text{кВ/м}` },
      { title: 'Направление',
        tex: String.raw`\operatorname{tg}\beta = \frac{\sin45^\circ}{1 - \cos45^\circ} = \sqrt2 + 1 \;\Rightarrow\; \beta = 67^\circ30'` },
    ],
    answer: [String.raw`E = 8{,}60\ \text{кВ/м};\quad \beta = 67^\circ30'`],
  },

  /* ===================== 14.58 ===================== */
  {
    id: '14.58', chapter: CH, section: S8, page: '228',
    title: 'Согнутый бесконечный стержень',
    given: [[String.raw`\tau = 0{,}2\ \text{мкКл/м}`, ''], [String.raw`r_0 = 15\ \text{см}`, '']],
    find: String.raw`E,\ \beta \;—\; ?`,
    formulas: [EROD, SUP],
    steps: [
      { title: 'Как в задаче 13.19',
        text: 'Горизонтальная полубесконечная часть даёт E₀ вдоль Ox; вертикальная — E₀ вдоль Ox и E₀ вдоль Oy (E₀ = τ/(4πε₀r₀)).',
        tex: String.raw`E_x = 2E_0,\quad E_y = E_0,\quad E = \sqrt5E_0 = \sqrt5\cdot12{,}0 = 26{,}8\ \text{кВ/м}` },
      { title: 'Направление',
        tex: String.raw`\sin\beta = \frac{1}{\sqrt5} \;\Rightarrow\; \beta = 26^\circ34'` },
    ],
    answer: [String.raw`E = 26{,}8\ \text{кВ/м};\quad \beta = 26^\circ34'`],
  },

  /* ===================== 14.59 ===================== */
  {
    id: '14.59', chapter: CH, section: S8, page: '228',
    title: 'Треть заряженного кольца',
    given: [[String.raw`R = 10\ \text{см}`, ''], [String.raw`Q = 50\ \text{нКл}`, ''], [String.raw`q = 2\ \text{нКл}`, '']],
    find: String.raw`E,\ F \;—\; ?`,
    formulas: [EP, SUP],
    steps: [
      { title: 'Дуга с углом 2π/3',
        text: String.raw`$\tau = \frac{Q}{2\pi R/3}$. Поле в центре от дуги с углом $\theta$: $E = \frac{2\tau}{4\pi\varepsilon_0R}\sin\frac\theta2$.`,
        tex: String.raw`E = \frac{3Q}{2\pi R}\cdot\frac{2\sin60^\circ}{4\pi\varepsilon_0R} = \frac{3\sqrt3Q}{8\pi^2\varepsilon_0R^2} = 37{,}2\ \text{кВ/м}` },
      { title: 'Сила на заряд q',
        text: 'Книга эту величину не приводит.',
        tex: String.raw`F = qE = 2\cdot10^{-9}\cdot3{,}72\cdot10^4 = 74\ \text{мкН}` },
    ],
    answer: [String.raw`E = 37{,}2\ \text{кВ/м};\quad F = 74\ \text{мкН}`],
  },

  /* ===================== 14.60 ===================== */
  {
    id: '14.60', chapter: CH, section: S8, page: '228',
    title: 'Плоское полукольцо',
    given: [[String.raw`R\ \text{и}\ 2R,\ R = 10\ \text{см}`, ''], [String.raw`Q = 20\ \text{нКл}`, '']],
    find: String.raw`E \;—\; ?`,
    formulas: [EP, SUP],
    steps: [
      { title: 'Плотность заряда',
        tex: String.raw`\sigma = \frac{Q}{\frac\pi2(4R^2 - R^2)} = \frac{2Q}{3\pi R^2}` },
      { title: 'Полукольцо из тонких дуг',
        text: 'Дуга радиуса r шириной dr — полукольцо с τ = σdr, его поле в центре 2τ/(4πε₀r).',
        tex: String.raw`E = \int_R^{2R}\frac{2\sigma\,dr}{4\pi\varepsilon_0r} = \frac{\sigma\ln2}{2\pi\varepsilon_0} = \frac{Q\ln2}{3\pi^2\varepsilon_0R^2} = 5{,}29\ \text{кВ/м}` },
    ],
    answer: [String.raw`E = 5{,}29\ \text{кВ/м}`],
  },

  /* ===================== 14.61 ===================== */
  {
    id: '14.61', chapter: CH, section: S8, page: '228',
    title: 'Кольцевой сектор',
    note: TYPO + String.raw`В книге «936 кВ/м» — по формуле самой книги $\frac{1{,}5\cdot10^{-7}\cdot0{,}693\cdot0{,}5}{2\cdot3{,}14\cdot8{,}85\cdot10^{-12}} = 935$ В/м: ошибка в единицах.`,
    given: [[String.raw`\sigma = 0{,}15\ \text{мкКл/м}^2`, ''], [String.raw`\theta = \pi/3,\ \text{радиусы}\ R\ \text{и}\ 2R`, '']],
    find: String.raw`E \;—\; ?`,
    formulas: [EP, SUP],
    steps: [
      { title: 'Сектор из тонких дуг',
        text: 'Дуга радиуса r с углом θ даёт в центре 2τ/(4πε₀r)·sin(θ/2), τ = σdr.',
        tex: String.raw`E = \int_R^{2R}\frac{2\sigma\,dr}{4\pi\varepsilon_0r}\sin\frac\theta2 = \frac{\sigma\ln2}{2\pi\varepsilon_0}\sin\frac\theta2 = 935\ \text{В/м}` },
    ],
    answer: [String.raw`E = 935\ \text{В/м}`],
  },

  /* ===================== 14.62 ===================== */
  {
    id: '14.62', chapter: CH, section: S8, page: '228',
    title: 'Плоскость с круглым вырезом',
    note: '<b>В условии не дан угол θ.</b> ' + String.raw`Ответ книги 1,96 кВ/м получается при $\theta = 30^\circ$ (угол между осью и направлением из точки A на край выреза, рис. 14.19).`,
    given: [[String.raw`\sigma = 40\ \text{нКл/м}^2`, ''], [String.raw`\theta\ \text{— см. рис. 14.19}`, '']],
    find: String.raw`E_A \;—\; ?`,
    formulas: [EPLANE, SUP],
    steps: [
      { title: 'Плоскость минус диск',
        text: String.raw`Поле целой плоскости $\frac{\sigma}{2\varepsilon_0}$; поле диска на оси $\frac{\sigma}{2\varepsilon_0}(1 - \cos\theta)$. Вычитаем:`,
        tex: String.raw`E = \frac{\sigma}{2\varepsilon_0}\cos\theta` },
      { title: 'При θ = 30°',
        tex: String.raw`E = \frac{4\cdot10^{-8}}{1{,}77\cdot10^{-11}}\cdot0{,}866 = 1{,}96\ \text{кВ/м}` },
    ],
    answer: [String.raw`E = \frac{\sigma}{2\varepsilon_0}\cos\theta;\quad 1{,}96\ \text{кВ/м при}\ \theta = 30^\circ`],
  },

  /* ===================== 14.63 ===================== */
  {
    id: '14.63', chapter: CH, section: S8, page: '228',
    title: 'Сферический сегмент',
    note: TYPO + String.raw`В книге «847 кВ/м» — по формуле книги $\frac{6\cdot10^{-8}}{4\cdot8{,}85\cdot10^{-12}}\cdot\frac12 = 847$ В/м: ошибка в единицах.`,
    given: [[String.raw`\sigma = 60\ \text{нКл/м}^2`, ''], [String.raw`\theta = \pi/4`, ''], [String.raw`q = 20\ \text{нКл}`, '']],
    find: String.raw`E,\ F \;—\; ?`,
    formulas: [EP, SUP],
    steps: [
      { title: 'Сегмент из колец (как в задаче 14.8)',
        tex: String.raw`E = \frac{\sigma}{2\varepsilon_0}\int_0^\theta\sin\varphi\cos\varphi\,d\varphi = \frac{\sigma}{4\varepsilon_0}\sin^2\theta = 847\ \text{В/м}` },
      { title: 'Сила на заряд q',
        tex: String.raw`F = qE = 2\cdot10^{-8}\cdot847 = 17\ \text{мкН}` },
    ],
    answer: [String.raw`E = 847\ \text{В/м};\quad F = 17\ \text{мкН}`],
  },

  /* ===================== 14.64 ===================== */
  {
    id: '14.64', chapter: CH, section: S8, page: '228',
    title: 'Заряженная половина шара',
    given: [[String.raw`R = 10\ \text{см}`, ''], [String.raw`\rho = 6\ \text{мкКл/м}^3`, '']],
    find: String.raw`E \;—\; ?`,
    formulas: [EP, SUP],
    steps: [
      { title: 'Полушар из тонких полусфер',
        text: 'Полусфера толщиной dr — поверхностная плотность ρdr, её поле в центре ρdr/(4ε₀) (задача 14.8).',
        tex: String.raw`E = \int_0^R\frac{\rho\,dr}{4\varepsilon_0} = \frac{\rho R}{4\varepsilon_0} = \frac{6\cdot10^{-6}\cdot0{,}1}{3{,}54\cdot10^{-11}} = 16{,}9\ \text{кВ/м}` },
    ],
    answer: [String.raw`E = 16{,}9\ \text{кВ/м}`],
  },

  /* ===================== 14.65 ===================== */
  {
    id: '14.65', chapter: CH, section: S8, page: '230',
    title: 'Сферическая чаша',
    given: [[String.raw`R\ \text{и}\ 2R,\ R = 6\ \text{см}`, ''], [String.raw`\rho = 10\ \text{мкКл/м}^3`, '']],
    find: String.raw`E \;—\; ?`,
    formulas: [EP, SUP],
    steps: [
      { title: 'Полусферы от R до 2R',
        tex: String.raw`E = \int_R^{2R}\frac{\rho\,dr}{4\varepsilon_0} = \frac{\rho R}{4\varepsilon_0} = \frac{10^{-5}\cdot0{,}06}{3{,}54\cdot10^{-11}} = 16{,}9\ \text{кВ/м}` },
    ],
    answer: [String.raw`E = 16{,}9\ \text{кВ/м}`],
  },

  /* ===================== 14.66 ===================== */
  {
    id: '14.66', chapter: CH, section: S8, page: '230',
    title: 'Шаровой сектор',
    given: [[String.raw`R = 10\ \text{см}`, ''], [String.raw`\rho = 4\ \text{мкКл/м}^3`, ''], [String.raw`\theta = \pi/6`, ''], [String.raw`q = 8\ \text{нКл}`, '']],
    find: String.raw`E,\ F \;—\; ?`,
    formulas: [EP, SUP],
    steps: [
      { title: 'Сектор из тонких сферических сегментов',
        text: 'Сегмент радиуса r (задача 14.63) с плотностью ρdr.',
        tex: String.raw`E = \int_0^R\frac{\rho\,dr}{4\varepsilon_0}\sin^2\theta = \frac{\rho R}{4\varepsilon_0}\sin^2\theta = 11{,}3\cdot0{,}25 = 2{,}82\ \text{кВ/м}` },
      { title: 'Сила',
        tex: String.raw`F = qE = 8\cdot10^{-9}\cdot2820 = 22{,}6\ \text{мкН}` },
    ],
    answer: [String.raw`E = 2{,}82\ \text{кВ/м};\quad F = 22{,}6\ \text{мкН}`],
  },

  /* ===================== 14.67 ===================== */
  {
    id: '14.67', chapter: CH, section: S8, page: '230',
    title: 'Две концентрические сферы ±σ',
    given: [[String.raw`R:\ -2\sigma;\quad 2R:\ \sigma`, ''], [String.raw`\sigma = 0{,}1\ \text{мкКл/м}^2`, ''], [String.raw`r_A = 3R`, '']],
    find: String.raw`E(r),\ E_A \;—\; ?`,
    formulas: [GAUSS],
    steps: [
      { title: 'Заряды сфер',
        tex: String.raw`Q_1 = -2\sigma\cdot4\pi R^2 = -8\pi\sigma R^2,\qquad Q_2 = \sigma\cdot4\pi(2R)^2 = 16\pi\sigma R^2` },
      { title: 'Три области',
        tex: String.raw`E_\text{I} = 0,\qquad E_\text{II} = \frac{Q_1}{4\pi\varepsilon_0r^2} = -\frac{2\sigma R^2}{\varepsilon_0r^2},\qquad E_\text{III} = \frac{Q_1 + Q_2}{4\pi\varepsilon_0r^2} = \frac{2\sigma R^2}{\varepsilon_0r^2}` },
      { title: 'Точка A (r = 3R)',
        text: 'Плюс — вектор направлен от центра.',
        tex: String.raw`E_A = \frac{2\sigma}{9\varepsilon_0} = 2{,}51\ \text{кВ/м}` },
    ],
    answer: [String.raw`E_\text{I} = 0;\ E_\text{II} = -\tfrac{2\sigma R^2}{\varepsilon_0r^2};\ E_\text{III} = \tfrac{2\sigma R^2}{\varepsilon_0r^2}`, String.raw`E_A = 2{,}51\ \text{кВ/м}\ (\text{от центра})`],
  },

  /* ===================== 14.68 ===================== */
  {
    id: '14.68', chapter: CH, section: S8, page: '231',
    title: 'Два коаксиальных цилиндра ±σ',
    given: [[String.raw`R:\ \sigma;\quad 2R:\ -\sigma`, ''], [String.raw`\sigma = 60\ \text{нКл/м}^2`, ''], [String.raw`r_A = 3R`, '']],
    find: String.raw`E(r),\ E_A \;—\; ?`,
    formulas: [GAUSS],
    steps: [
      { title: 'Заряды на единицу длины',
        tex: String.raw`\tau_1 = 2\pi R\sigma,\qquad \tau_2 = -4\pi R\sigma` },
      { title: 'Три области',
        tex: String.raw`E_\text{I} = 0,\qquad E_\text{II} = \frac{\tau_1}{2\pi\varepsilon_0r} = \frac{\sigma R}{\varepsilon_0r},\qquad E_\text{III} = \frac{\tau_1 + \tau_2}{2\pi\varepsilon_0r} = -\frac{\sigma R}{\varepsilon_0r}` },
      { title: 'Точка A',
        text: 'Минус — вектор направлен к оси.',
        tex: String.raw`E_A = -\frac{\sigma}{3\varepsilon_0} = -2{,}26\ \text{кВ/м}` },
    ],
    answer: [String.raw`E_\text{I} = 0;\ E_\text{II} = \tfrac{\sigma R}{\varepsilon_0r};\ E_\text{III} = -\tfrac{\sigma R}{\varepsilon_0r}`, String.raw`E_A = -2{,}26\ \text{кВ/м}\ (\text{к оси})`],
  },

  /* ===================== 14.69 ===================== */
  {
    id: '14.69', chapter: CH, section: S8, page: '231',
    title: 'Две плоскости −4σ и 2σ',
    given: [[String.raw`-4\sigma\ \text{и}\ 2\sigma`, ''], [String.raw`\sigma = 40\ \text{нКл/м}^2`, '']],
    find: String.raw`E(x),\ E_A \;—\; ?`,
    formulas: [EPLANE, SUP],
    steps: [
      { title: 'Поля плоскостей',
        text: 'Плоскость −4σ: 2σ/ε₀, к ней; плоскость 2σ: σ/ε₀, от неё. Знак — проекция на ось x.' },
      { title: 'Три области',
        tex: String.raw`E_\text{I} = \frac{2\sigma}{\varepsilon_0} - \frac{\sigma}{\varepsilon_0} = \frac{\sigma}{\varepsilon_0},\qquad E_\text{II} = -\frac{2\sigma}{\varepsilon_0} - \frac{\sigma}{\varepsilon_0} = -\frac{3\sigma}{\varepsilon_0},\qquad E_\text{III} = -\frac{2\sigma}{\varepsilon_0} + \frac{\sigma}{\varepsilon_0} = -\frac{\sigma}{\varepsilon_0}` },
      { title: 'Точка A в области III',
        tex: String.raw`E_A = -\frac{\sigma}{\varepsilon_0} = -4{,}52\ \text{кВ/м}\ (\text{против оси}\ x)` },
    ],
    answer: [String.raw`E_\text{I} = \tfrac{\sigma}{\varepsilon_0};\ E_\text{II} = -\tfrac{3\sigma}{\varepsilon_0};\ E_\text{III} = -\tfrac{\sigma}{\varepsilon_0}`, String.raw`E_A = -4{,}52\ \text{кВ/м}`],
  },

  /* ===================== 14.70 ===================== */
  {
    id: '14.70', chapter: CH, section: S8, page: '231',
    title: 'Шар со сферическим вырезом',
    given: [[String.raw`\text{шар}\ 2R,\ \text{вырез}\ R`, ''], [String.raw`\rho = 10\ \text{мкКл/м}^3`, ''], [String.raw`R = 10\ \text{см}`, '']],
    find: String.raw`E_O,\ E_A,\ E_B \;—\; ?`,
    formulas: [GAUSS, SUP, { tex: String.raw`\vec E = \frac{\rho\vec r}{3\varepsilon_0}\ (\text{внутри}),\quad \vec E = \frac{\rho R^3\vec r}{3\varepsilon_0r^3}\ (\text{снаружи})`, text: 'поле однородно заряженного шара' }],
    steps: [
      { title: 'Приём',
        text: 'Шар с вырезом = целый шар (+ρ) + маленький шар с зарядом −ρ на месте выреза. Единица: E₀ = ρR/(3ε₀) = 37,7 кВ/м.' },
      { title: 'Точка O',
        text: 'Поле большого шара в центре нуль; O на поверхности выреза.',
        tex: String.raw`E_O = E_0 = 37{,}7\ \text{кВ/м}\ (\text{к}\ O_1)` },
      { title: 'Точка A (на 2R над O)',
        text: 'Большой шар: 2E₀ вверх. От выреза (до A расстояние √5R): E₀/5, направление к O₁.',
        tex: String.raw`E_A = E_0\sqrt{\left(\frac{1}{5\sqrt5}\right)^2 + \left(2 - \frac{2}{5\sqrt5}\right)^2} = E_0\sqrt{4 + \frac{1}{25} - \frac{8}{5\sqrt5}} = 68{,}7\ \text{кВ/м}` },
      { title: 'Точка B (на 2R влево от O)',
        text: 'Большой шар: 2E₀ влево; вырез (расстояние 3R): E₀/9 вправо.',
        tex: String.raw`E_B = \left(2 - \frac19\right)E_0 = \frac{17}{27}\frac{\rho R}{\varepsilon_0} = 71{,}1\ \text{кВ/м}` },
    ],
    answer: [String.raw`E_O = 37{,}7;\quad E_A = 68{,}7;\quad E_B = 71{,}1\ \text{кВ/м}`],
  },

  /* ===================== 14.71 ===================== */
  {
    id: '14.71', chapter: CH, section: S8, page: '231',
    title: 'Цилиндр с продольным вырезом',
    note: SMALL + String.raw`Для точки A в книге 54,5 кВ/м, а формула книги $\frac{\rho R}{2\varepsilon_0}\sqrt{\frac{13}{5}}$ даёт 54,7 кВ/м.`,
    given: [[String.raw`\text{цилиндр}\ 2R,\ \text{вырез}\ R`, ''], [String.raw`\rho = 6\ \text{мкКл/м}^3`, ''], [String.raw`R = 10\ \text{см}`, '']],
    find: String.raw`E_O,\ E_A,\ E_B \;—\; ?`,
    formulas: [GAUSS, SUP, { tex: String.raw`\vec E = \frac{\rho\vec r}{2\varepsilon_0}\ (\text{внутри}),\quad \vec E = \frac{\rho R^2\vec r}{2\varepsilon_0r^2}\ (\text{снаружи})`, text: 'поле однородно заряженного цилиндра' }],
    steps: [
      { title: 'Приём',
        text: 'Целый цилиндр + цилиндр −ρ на месте выреза. Единица E₀ = ρR/(2ε₀) = 33,9 кВ/м.' },
      { title: 'Точки O и B',
        tex: String.raw`E_O = E_0 = 33{,}9\ \text{кВ/м},\qquad E_B = \left(2 - \frac13\right)E_0 = \frac56\frac{\rho R}{\varepsilon_0} = 56{,}5\ \text{кВ/м}` },
      { title: 'Точка A',
        text: 'От выреза (расстояние √5R): E₀/√5, к O₁.',
        tex: String.raw`E_A = E_0\sqrt{0{,}2^2 + 1{,}6^2} = E_0\sqrt{\frac{13}{5}} = 54{,}7\ \text{кВ/м}` },
    ],
    answer: [String.raw`E_O = 33{,}9;\quad E_A = 54{,}7;\quad E_B = 56{,}5\ \text{кВ/м}`],
  },

  /* ===================== 14.72 ===================== */
  {
    id: '14.72', chapter: CH, section: S8, page: '232',
    title: 'Шар с двумя вырезами',
    given: [[String.raw`\text{шар}\ 2R,\ \text{вырезы}\ R`, ''], [String.raw`\rho = 8\ \text{мкКл/м}^3`, ''], [String.raw`R = 10\ \text{см}`, '']],
    find: String.raw`E_{O_1},\ E_A \;—\; ?`,
    formulas: [GAUSS, SUP],
    steps: [
      { title: 'Точка O₁ (центр левого выреза)',
        text: 'Единица E₀ = ρR/(3ε₀). Большой шар: E₀ к O₁ от O (влево); свой вырез: 0; правый вырез (расстояние 2R): E₀/4 к O₂ (вправо).',
        tex: String.raw`E_{O_1} = E_0\left(1 - \frac14\right) = \frac{\rho R}{4\varepsilon_0} = 22{,}6\ \text{кВ/м}` },
      { title: 'Точка A (на 2R над O)',
        text: 'Большой шар: 2E₀ вверх; каждый вырез (√5R): E₀/5, горизонтальные части гасятся.',
        tex: String.raw`E_A = E_0\left(2 - \frac{4}{5\sqrt5}\right) = \frac23\frac{\rho R}{\varepsilon_0}\left(1 - \frac{2}{5\sqrt5}\right) = 49{,}5\ \text{кВ/м}` },
    ],
    answer: [String.raw`E_{O_1} = 22{,}6\ \text{кВ/м};\quad E_A = 49{,}5\ \text{кВ/м}`],
  },

  /* ===================== 14.73 ===================== */
  {
    id: '14.73', chapter: CH, section: S8, page: '232',
    title: 'Цилиндр с двумя вырезами',
    note: TYPO + String.raw`В формуле книги для $E_A$ стоит $\frac53\frac{\rho}{\varepsilon_0}R$ (это 113 кВ/м). Должно быть $\frac35\frac{\rho}{\varepsilon_0}R = 40{,}7$ кВ/м — число книги верное.`,
    given: [[String.raw`\text{цилиндр}\ 2R,\ \text{вырезы}\ R`, ''], [String.raw`\rho = 6\ \text{мкКл/м}^3`, ''], [String.raw`R = 10\ \text{см}`, '']],
    find: String.raw`E_{O_1},\ E_A \;—\; ?`,
    formulas: [GAUSS, SUP],
    steps: [
      { title: 'Точка O₁',
        text: 'Единица E₀ = ρR/(2ε₀). Целый цилиндр: E₀; второй вырез (2R): E₀/2 в обратную сторону.',
        tex: String.raw`E_{O_1} = \frac{E_0}{2} = \frac{\rho R}{4\varepsilon_0} = 16{,}9\ \text{кВ/м}` },
      { title: 'Точка A',
        text: 'Целый цилиндр: 2E₀ вверх; каждый вырез (√5R): вертикальная часть 2E₀/5 вниз.',
        tex: String.raw`E_A = \left(2 - \frac45\right)E_0 = \frac35\frac{\rho R}{\varepsilon_0} = 40{,}7\ \text{кВ/м}` },
    ],
    answer: [String.raw`E_{O_1} = 16{,}9\ \text{кВ/м};\quad E_A = 40{,}7\ \text{кВ/м}`],
  },

  /* ===================== 14.74 ===================== */
  {
    id: '14.74', chapter: CH, section: S8, page: '232–233',
    title: 'Две заряженные пластины −ρ и ρ',
    note: TYPO + String.raw`В книге для области II напечатано $E_\text{II} = -\frac{\rho}{\varepsilon_0}(x - 4d)$ — при $x = 0$ это давало бы $+4\rho d/\varepsilon_0$ и разрыв с областью I. Правильно $E_\text{II} = -\frac{\rho}{\varepsilon_0}(x + d)$. Остальные области и $E_A$ совпадают.`,
    given: [[String.raw`\text{пластина}\ -\rho:\ 0 \le x \le d`, ''], [String.raw`\text{пластина}\ \rho:\ 2d \le x \le 5d`, ''], [String.raw`d = 1\ \text{см},\ \rho = 20\ \text{мкКл/м}^3`, '']],
    find: String.raw`E(x),\ E_A \;—\; ?`,
    formulas: [GAUSS, SUP, { tex: String.raw`E_\text{вне} = \pm\frac{\rho h}{2\varepsilon_0},\quad E_\text{внутри} = \frac{\rho(x - x_c)}{\varepsilon_0}`, text: 'поле пластины толщиной h с центром x_c' }],
    steps: [
      { title: 'Поля двух пластин',
        text: 'Отрицательная пластина (заряд −ρd) снаружи даёт ρd/(2ε₀) к себе; положительная (3ρd) — 3ρd/(2ε₀) от себя.' },
      { title: 'Пять областей (единица ρ/ε₀)',
        tex: String.raw`\begin{aligned} &\text{I}:\ \tfrac d2 - \tfrac{3d}2 = -d \\ &\text{II}:\ -\left(x - \tfrac d2\right) - \tfrac{3d}{2} = -(x + d) \\ &\text{III}:\ -\tfrac d2 - \tfrac{3d}2 = -2d \\ &\text{IV}:\ -\tfrac d2 + (x - 3{,}5d) = x - 4d \\ &\text{V}:\ -\tfrac d2 + \tfrac{3d}2 = d \end{aligned}` },
      { title: 'Точка A (x = 3d)',
        tex: String.raw`E_A = \frac{\rho}{\varepsilon_0}(3d - 4d) = -\frac{\rho d}{\varepsilon_0} = -22{,}6\ \text{кВ/м}` },
    ],
    answer: [String.raw`E_\text{I} = -\tfrac{\rho d}{\varepsilon_0};\ E_\text{II} = -\tfrac{\rho}{\varepsilon_0}(x + d);\ E_\text{III} = -\tfrac{2\rho d}{\varepsilon_0}`, String.raw`E_\text{IV} = \tfrac{\rho}{\varepsilon_0}(x - 4d);\ E_\text{V} = \tfrac{\rho d}{\varepsilon_0};\quad E_A = -22{,}6\ \text{кВ/м}`],
  },

  /* ===================== 14.75 ===================== */
  {
    id: '14.75', chapter: CH, section: S8, page: '233',
    title: 'Две заряженные пластины 2ρ и −ρ',
    given: [[String.raw`\text{пластина}\ 2\rho:\ 0 \le x \le d`, ''], [String.raw`\text{пластина}\ -\rho:\ 2d \le x \le 5d`, ''], [String.raw`d = 1\ \text{см},\ \rho = 20\ \text{мкКл/м}^3`, '']],
    find: String.raw`E(x),\ E_A \;—\; ?`,
    formulas: [GAUSS, SUP],
    steps: [
      { title: 'Заряды пластин',
        text: 'Первая: 2ρd (поле снаружи ρd/ε₀ от неё), вторая: −3ρd (снаружи 3ρd/(2ε₀) к ней).' },
      { title: 'Пять областей (единица ρ/ε₀)',
        tex: String.raw`\begin{aligned} &\text{I}:\ -d + \tfrac{3d}2 = \tfrac d2 \\ &\text{II}:\ 2\left(x - \tfrac d2\right) + \tfrac{3d}2 = \tfrac12(4x + d) \\ &\text{III}:\ d + \tfrac{3d}2 = \tfrac{5d}2 \\ &\text{IV}:\ d - (x - 3{,}5d) = \tfrac12(9d - 2x) \\ &\text{V}:\ d - \tfrac{3d}2 = -\tfrac d2 \end{aligned}` },
      { title: 'Точка A (x = 3d)',
        tex: String.raw`E_A = \frac12\cdot\frac{\rho}{\varepsilon_0}(9d - 6d) = \frac32\frac{\rho d}{\varepsilon_0} = 33{,}9\ \text{кВ/м}` },
    ],
    answer: [String.raw`E_\text{I} = \tfrac{\rho d}{2\varepsilon_0};\ E_\text{II} = \tfrac{\rho(4x + d)}{2\varepsilon_0};\ E_\text{III} = \tfrac{5\rho d}{2\varepsilon_0}`, String.raw`E_\text{IV} = \tfrac{\rho(9d - 2x)}{2\varepsilon_0};\ E_\text{V} = -\tfrac{\rho d}{2\varepsilon_0};\quad E_A = 33{,}9\ \text{кВ/м}`],
  },

  );
})();
