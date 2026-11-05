/*
  § 31. Дифракция света — задачи 31.1–31.33 (стр. 411–415).
  Условия задач показываются дословно из книги (data/book-tasks.js).
  Ответы пересчитаны скриптом tools/check_difraktsiya.py и сверены с book/99-otvety.md.
*/
(function () {
  const CH = 'Гл. 6. Оптика';
  const S1 = 'Зоны Френеля';
  const S2 = 'Дифракция на щели. Дифракционная решётка';
  const S3 = 'Дифракция на кристаллической решётке';
  const S4 = 'Разрешающая сила объектива телескопа';
  const MISMATCH = '<b>Расхождение с ответом книги.</b> ';
  const SMALL = '<b>Расхождение в последней цифре.</b> ';

  const ZONE = { tex: String.raw`\rho_k = \sqrt{\frac{ab}{a + b}k\lambda},\quad \rho_k = \sqrt{bk\lambda}\ (\text{плоская волна})`, text: 'радиус k-й зоны Френеля' };
  const SLIT = { tex: String.raw`a\sin\varphi = k\lambda\ (\min),\quad a\sin\varphi \approx (2k + 1)\frac\lambda2\ (\max)`, text: 'дифракция на щели' };
  const GRAT = { tex: String.raw`d\sin\varphi = k\lambda`, text: 'главные максимумы решётки' };
  const RES = { tex: String.raw`R = \frac{\lambda}{\Delta\lambda} = kN`, text: 'разрешающая сила решётки' };
  const DISP = { tex: String.raw`D_\varphi = \frac{k}{d\cos\varphi},\quad D_l = \frac{f D_\varphi}{\cos^2\varphi} \approx f\frac kd`, text: 'угловая и линейная дисперсия (экран в фокальной плоскости)' };
  const BRAGG = { tex: String.raw`2d\sin\theta = k\lambda`, text: 'формула Вульфа–Брэгга' };
  const TEL = { tex: String.raw`\beta = \frac{1{,}22\lambda}{D}`, text: 'наименьшее разрешаемое угловое расстояние' };

  window.TASKS.push(

  /* ===================== 31.1 ===================== */
  {
    id: '31.1', chapter: CH, section: S1, page: '411',
    title: 'Зоны Френеля для плоской волны',
    given: [[String.raw`\rho_k = \sqrt{abk\lambda/(a + b)}`, '']],
    find: String.raw`\rho_k\ \text{при}\ a \to \infty`,
    formulas: [ZONE],
    steps: [{ title: 'Плоская волна — источник на бесконечности', tex: String.raw`\frac{ab}{a + b} = \frac{b}{1 + b/a} \xrightarrow{a \to \infty} b\ \Rightarrow\ \rho_k = \sqrt{bk\lambda}` }],
    answer: [String.raw`\rho_k = \sqrt{bk\lambda}`],
    note: '<b>Задача на вывод.</b> Ответа в книге нет.',
  },

  /* ===================== 31.2 ===================== */
  {
    id: '31.2', chapter: CH, section: S1, page: '411',
    title: 'Радиус пятой зоны',
    given: [[String.raw`\lambda = 0{,}5\ \text{мкм}`, ''], [String.raw`b = 1\ \text{м}`, ''], [String.raw`k = 5`, '']],
    find: String.raw`\rho_5 \;—\; ?`,
    formulas: [ZONE],
    steps: [{ title: 'Радиус', tex: String.raw`\rho_5 = \sqrt{1\cdot5\cdot5\cdot10^{-7}} = 1{,}58\cdot10^{-3}\ \text{м}` }],
    answer: [String.raw`\rho_5 = 1{,}58\ \text{мм}`],
  },

  /* ===================== 31.3 ===================== */
  {
    id: '31.3', chapter: CH, section: S1, page: '411',
    title: 'Радиус шестой зоны по четвёртой',
    given: [[String.raw`\rho_4 = 3\ \text{мм}`, '']],
    find: String.raw`\rho_6 \;—\; ?`,
    formulas: [ZONE],
    steps: [{ title: 'ρ ∝ √k', tex: String.raw`\rho_6 = \rho_4\sqrt{\frac64} = 3\cdot1{,}225 = 3{,}67\ \text{мм}` }],
    answer: [String.raw`\rho_6 = 3{,}67\ \text{мм}`],
    note: SMALL + 'В книге 3,69 мм; точно 3·√1,5 = 3,674.',
  },

  /* ===================== 31.4 ===================== */
  {
    id: '31.4', chapter: CH, section: S1, page: '411',
    title: 'Число зон в отверстии',
    given: [[String.raw`d = 4\ \text{мм}`, String.raw`r = 2\cdot10^{-3}\ \text{м}`], [String.raw`\lambda = 0{,}5\ \text{мкм}`, ''], [String.raw`b = 1\ \text{м}`, '']],
    find: String.raw`k;\ \text{центр светлый или тёмный}`,
    formulas: [ZONE],
    steps: [
      { title: 'Число зон', tex: String.raw`k = \frac{r^2}{b\lambda} = \frac{4\cdot10^{-6}}{5\cdot10^{-7}} = 8` },
      { title: 'Чётное число зон', text: 'Действия соседних зон попарно гасят друг друга, поэтому в центре тёмное пятно.' },
    ],
    answer: [String.raw`8\ \text{зон};\ \text{тёмное пятно}`],
  },

  /* ===================== 31.5 ===================== */
  {
    id: '31.5', chapter: CH, section: S1, page: '411',
    title: 'Где отверстие открывает одну и две зоны',
    given: [[String.raw`\lambda = 0{,}5\ \text{мкм}`, ''], [String.raw`d = 1\ \text{см}`, String.raw`r = 5\cdot10^{-3}\ \text{м}`]],
    find: String.raw`b_1,\ b_2 \;—\; ?`,
    formulas: [ZONE],
    steps: [{ title: 'b = r²/(kλ)', tex: String.raw`b_1 = \frac{25\cdot10^{-6}}{5\cdot10^{-7}} = 50\ \text{м},\quad b_2 = 25\ \text{м}` }],
    answer: [String.raw`1)\ 50\ \text{м};\quad 2)\ 25\ \text{м}`],
  },

  /* ===================== 31.6 ===================== */
  {
    id: '31.6', chapter: CH, section: S1, page: '411',
    title: 'Положения максимумов и минимумов на оси',
    given: [[String.raw`r,\ \lambda,\ n`, '']],
    find: String.raw`b = f(r, \lambda, n)`,
    formulas: [ZONE],
    steps: [
      { title: 'Отверстие открывает n зон', tex: String.raw`r^2 = bn\lambda\ \Rightarrow\ b = \frac{r^2}{n\lambda}` },
      { title: 'Максимум и минимум', text: 'Максимум — при нечётном n, минимум — при чётном.' },
    ],
    answer: [String.raw`1)\ b = \frac{r^2}{n\lambda},\ n = 1, 3, 5, \ldots;\quad 2)\ b = \frac{r^2}{n\lambda},\ n = 2, 4, 6, \ldots`],
  },

  /* ===================== 31.7 ===================== */
  {
    id: '31.7', chapter: CH, section: S1, page: '411',
    title: 'Три самых дальних минимума на оси',
    given: [[String.raw`\lambda = 0{,}7\ \text{мкм}`, ''], [String.raw`r = 1{,}4\ \text{мм}`, '']],
    find: String.raw`b_1,\ b_2,\ b_3 \;—\; ?`,
    formulas: [ZONE],
    steps: [{ title: 'Чётные n = 2, 4, 6', tex: String.raw`b = \frac{r^2}{n\lambda} = \frac{1{,}96\cdot10^{-6}}{7\cdot10^{-7}n} = \frac{2{,}8}{n}\ \text{м}:\quad 1{,}4;\ 0{,}7;\ 0{,}47\ \text{м}` }],
    answer: [String.raw`b_1 = 1{,}4\ \text{м};\ b_2 = 0{,}7\ \text{м};\ b_3 = 0{,}47\ \text{м}`],
  },

  /* ===================== 31.8 ===================== */
  {
    id: '31.8', chapter: CH, section: S1, page: '412',
    title: 'Три зоны для точечного источника',
    given: [[String.raw`\lambda = 0{,}5\ \text{мкм}`, ''], [String.raw`r = 1\ \text{мм}`, ''], [String.raw`a = 1\ \text{м},\ k = 3`, '']],
    find: String.raw`b \;—\; ?`,
    formulas: [ZONE],
    steps: [{ title: 'Решаем r² = abkλ/(a + b) относительно b', tex: String.raw`b = \frac{ar^2}{ak\lambda - r^2} = \frac{10^{-6}}{1{,}5\cdot10^{-6} - 10^{-6}} = 2\ \text{м}` }],
    answer: [String.raw`b = 2\ \text{м}`],
  },

  /* ===================== 31.9 ===================== */
  {
    id: '31.9', chapter: CH, section: S1, page: '412',
    title: 'Убрали диафрагму',
    given: [[String.raw`\text{было открыто 3 зоны (см. 31.8)}`, '']],
    find: String.raw`I/I_0 \;—\; ?`,
    formulas: [ZONE],
    steps: [
      { title: 'Амплитуды', tex: String.raw`A_3 = A_1 - A_2 + A_3 \approx A_1,\quad A_\infty \approx \frac{A_1}2` },
      { title: 'Интенсивность ∝ A²', tex: String.raw`\frac{I_\infty}{I_3} = \frac14` },
    ],
    answer: [String.raw`\text{уменьшится в 4 раза}`],
  },

  /* ===================== 31.10 ===================== */
  {
    id: '31.10', chapter: CH, section: S2, page: '412',
    title: 'Направление на четвёртую тёмную полосу',
    given: [[String.raw`a = 0{,}05\ \text{мм}`, ''], [String.raw`\lambda = 0{,}6\ \text{мкм}`, ''], [String.raw`k = 4`, '']],
    find: String.raw`\varphi \;—\; ?`,
    formulas: [SLIT],
    steps: [{ title: 'Минимум', tex: String.raw`\sin\varphi = \frac{4\lambda}{a} = \frac{2{,}4\cdot10^{-6}}{5\cdot10^{-5}} = 0{,}048\ \Rightarrow\ \varphi = 2^\circ45'` }],
    answer: [String.raw`\varphi = 2^\circ45'`],
  },

  /* ===================== 31.11 ===================== */
  {
    id: '31.11', chapter: CH, section: S2, page: '412',
    title: 'Ширина щели в длинах волн',
    given: [[String.raw`\varphi = 1^\circ`, ''], [String.raw`k = 2\ (\text{светлая})`, '']],
    find: String.raw`a/\lambda \;—\; ?`,
    formulas: [SLIT],
    steps: [{ title: 'Максимум k = 2', tex: String.raw`a\sin\varphi = \frac{5\lambda}2\ \Rightarrow\ \frac a\lambda = \frac{2{,}5}{0{,}01745} = 143` }],
    answer: [String.raw`a = 143\lambda`],
  },

  /* ===================== 31.12 ===================== */
  {
    id: '31.12', chapter: CH, section: S2, page: '412',
    title: 'Что видно под углами 17′ и 43′',
    given: [[String.raw`a = 0{,}1\ \text{мм}`, ''], [String.raw`\lambda = 0{,}5\ \text{мкм}`, '']],
    find: String.raw`\text{картина при }\varphi_1,\ \varphi_2`,
    formulas: [SLIT],
    steps: [
      { title: '1) φ = 17′ = 4,95·10⁻³ рад', tex: String.raw`\frac{a\sin\varphi}{\lambda} = \frac{10^{-4}\cdot4{,}95\cdot10^{-3}}{5\cdot10^{-7}} = 0{,}99 \approx 1\ \Rightarrow\ \text{первый минимум}` },
      { title: '2) φ = 43′ = 1,25·10⁻² рад', tex: String.raw`\frac{a\sin\varphi}{\lambda} = 2{,}5 = \frac52\ \Rightarrow\ \text{максимум }k = 2` },
    ],
    answer: [String.raw`1)\ \text{первый минимум};\quad 2)\ \text{максимум }k = 2`],
  },

  /* ===================== 31.13 ===================== */
  {
    id: '31.13', chapter: CH, section: S2, page: '412',
    title: 'Число штрихов решётки',
    given: [[String.raw`\lambda = 0{,}6\ \text{мкм}`, ''], [String.raw`k = 5,\ \varphi = 18^\circ`, '']],
    find: String.raw`n \;—\; ?`,
    formulas: [GRAT],
    steps: [{ title: 'n = 1/d', tex: String.raw`n = \frac{\sin\varphi}{k\lambda} = \frac{0{,}309}{3\cdot10^{-6}} = 1{,}03\cdot10^5\ \text{м}^{-1}` }],
    answer: [String.raw`n = 103\ \text{мм}^{-1}`],
  },

  /* ===================== 31.14 ===================== */
  {
    id: '31.14', chapter: CH, section: S2, page: '412',
    title: 'Длина волны по повороту трубы',
    given: [[String.raw`n = 100\ \text{мм}^{-1}`, String.raw`d = 10\ \text{мкм}`], [String.raw`k = 3`, ''], [String.raw`\Delta\varphi = 20^\circ`, '']],
    find: String.raw`\lambda \;—\; ?`,
    formulas: [GRAT],
    steps: [
      { title: 'Другой максимум того же порядка — симметричный', tex: String.raw`2\varphi = 20^\circ\ \Rightarrow\ \varphi = 10^\circ` },
      { title: 'Длина волны', tex: String.raw`\lambda = \frac{d\sin\varphi}{k} = \frac{10^{-5}\cdot0{,}1736}{3} = 579\ \text{нм}` },
    ],
    answer: [String.raw`\lambda \approx 580\ \text{нм}`],
  },

  /* ===================== 31.15 ===================== */
  {
    id: '31.15', chapter: CH, section: S2, page: '412',
    title: 'Угол максимума третьего порядка',
    given: [[String.raw`k_1 = 2,\ \varphi_1 = 14^\circ`, ''], [String.raw`k_2 = 3`, '']],
    find: String.raw`\varphi_2 \;—\; ?`,
    formulas: [GRAT],
    steps: [{ title: 'sin φ ∝ k', tex: String.raw`\sin\varphi_2 = \frac32\sin14^\circ = 0{,}363\ \Rightarrow\ \varphi_2 = 21^\circ17'` }],
    answer: [String.raw`\varphi_2 = 21^\circ17'`],
  },

  /* ===================== 31.16 ===================== */
  {
    id: '31.16', chapter: CH, section: S2, page: '412',
    title: 'Наибольший порядок спектра',
    given: [[String.raw`n = 200\ \text{мм}^{-1}`, String.raw`d = 5\ \text{мкм}`], [String.raw`\lambda = 0{,}6\ \text{мкм}`, '']],
    find: String.raw`k_{\max} \;—\; ?`,
    formulas: [GRAT],
    steps: [{ title: 'sin φ ≤ 1', tex: String.raw`k \le \frac d\lambda = 8{,}3\ \Rightarrow\ k_{\max} = 8` }],
    answer: [String.raw`k_{\max} = 8`],
  },

  /* ===================== 31.17 ===================== */
  {
    id: '31.17', chapter: CH, section: S2, page: '412–413',
    title: 'Общее число максимумов',
    given: [[String.raw`n = 400\ \text{мм}^{-1}`, String.raw`d = 2{,}5\ \text{мкм}`], [String.raw`\lambda = 0{,}6\ \text{мкм}`, '']],
    find: String.raw`N,\ \varphi_{\max} \;—\; ?`,
    formulas: [GRAT],
    steps: [
      { title: 'Наибольший порядок', tex: String.raw`k \le \frac{2{,}5}{0{,}6} = 4{,}17\ \Rightarrow\ k_{\max} = 4` },
      { title: 'Число и угол', tex: String.raw`N = 2k_{\max} + 1 = 9,\quad \sin\varphi = \frac{4\cdot0{,}6}{2{,}5} = 0{,}96\ \Rightarrow\ \varphi = 74^\circ` },
    ],
    answer: [String.raw`N = 9;\quad \varphi = 74^\circ`],
  },

  /* ===================== 31.18 ===================== */
  {
    id: '31.18', chapter: CH, section: S2, page: '413',
    title: 'Перекрытие спектров 2-го и 3-го порядков',
    given: [[String.raw`\lambda_3 = 0{,}4\ \text{мкм}`, '']],
    find: String.raw`\lambda_2 \;—\; ?`,
    formulas: [GRAT],
    steps: [{ title: 'Одинаковый угол', tex: String.raw`2\lambda_2 = 3\lambda_3\ \Rightarrow\ \lambda_2 = 0{,}6\ \text{мкм}` }],
    answer: [String.raw`\lambda_2 = 0{,}6\ \text{мкм}`],
  },

  /* ===================== 31.19 ===================== */
  {
    id: '31.19', chapter: CH, section: S2, page: '413',
    title: 'Ширина спектра первого порядка',
    given: [[String.raw`n = 500\ \text{мм}^{-1}`, String.raw`d = 2\ \text{мкм}`], [String.raw`L = 3\ \text{м}`, ''], [String.raw`\lambda_\text{кр} = 780\ \text{нм},\ \lambda_\text{ф} = 400\ \text{нм}`, '']],
    find: String.raw`b \;—\; ?`,
    formulas: [GRAT],
    steps: [
      { title: 'Углы', tex: String.raw`\sin\varphi_\text{кр} = 0{,}39\ (\varphi = 22{,}95^\circ),\quad \sin\varphi_\text{ф} = 0{,}2\ (\varphi = 11{,}54^\circ)` },
      { title: 'Ширина на экране', tex: String.raw`b = L(\operatorname{tg}\varphi_\text{кр} - \operatorname{tg}\varphi_\text{ф}) = 3(0{,}423 - 0{,}204) = 0{,}66\ \text{м}` },
    ],
    answer: [String.raw`b = 66\ \text{см}`],
  },

  /* ===================== 31.20 ===================== */
  {
    id: '31.20', chapter: CH, section: S2, page: '413',
    title: 'Наклонное падение на решётку',
    given: [[String.raw`d = 10\ \text{мкм}`, ''], [String.raw`\alpha = 30^\circ`, ''], [String.raw`\lambda = 600\ \text{нм},\ m = 2`, '']],
    find: String.raw`\varphi \;—\; ?`,
    formulas: [{ tex: String.raw`d(\sin\varphi - \sin\alpha) = m\lambda`, text: 'главные максимумы при наклонном падении' }],
    steps: [{ title: 'Угол', tex: String.raw`\sin\varphi = 0{,}5 + \frac{2\cdot0{,}6}{10} = 0{,}62\ \Rightarrow\ \varphi = 38{,}3^\circ` }],
    answer: [String.raw`\varphi = 38{,}3^\circ`],
  },

  /* ===================== 31.21 ===================== */
  {
    id: '31.21', chapter: CH, section: S2, page: '413',
    title: 'Наименьший порядок для разрешения',
    given: [[String.raw`l = 1{,}5\ \text{см},\ d = 5\ \text{мкм}`, String.raw`N = l/d = 3000`], [String.raw`\lambda = 760\ \text{нм},\ \Delta\lambda = 0{,}1\ \text{нм}`, '']],
    find: String.raw`k_{\min} \;—\; ?`,
    formulas: [RES],
    steps: [{ title: 'kN ≥ λ/Δλ', tex: String.raw`k \ge \frac{7600}{3000} = 2{,}53\ \Rightarrow\ k_{\min} = 3` }],
    answer: [String.raw`k_{\min} = 3`],
  },

  /* ===================== 31.22 ===================== */
  {
    id: '31.22', chapter: CH, section: S2, page: '413',
    title: 'Разрешить линии калия',
    given: [[String.raw`\lambda_1 = 578\ \text{нм},\ \lambda_2 = 580\ \text{нм}`, ''], [String.raw`k = 2`, '']],
    find: String.raw`R,\ N \;—\; ?`,
    formulas: [RES],
    steps: [
      { title: 'Разрешающая сила', tex: String.raw`R = \frac{\lambda}{\Delta\lambda} = \frac{579}{2} \approx 290` },
      { title: 'Число штрихов', tex: String.raw`N = \frac Rk = 145` },
    ],
    answer: [String.raw`R = 290;\quad N = 145`],
  },

  /* ===================== 31.23 ===================== */
  {
    id: '31.23', chapter: CH, section: S2, page: '413',
    title: 'Длина решётки для дублета натрия',
    given: [[String.raw`d = 20\ \text{мкм}`, ''], [String.raw`\lambda = 589\ \text{нм},\ \delta\lambda = 0{,}6\ \text{нм}`, ''], [String.raw`k = 2`, '']],
    find: String.raw`l \;—\; ?`,
    formulas: [RES],
    steps: [{ title: 'l = Nd', tex: String.raw`N = \frac{\lambda}{k\delta\lambda} = \frac{589}{1{,}2} = 491,\quad l = Nd = 491\cdot20\ \text{мкм} = 9{,}8\ \text{мм} \approx 10\ \text{мм}` }],
    answer: [String.raw`l \approx 10\ \text{мм}`],
  },

  /* ===================== 31.24 ===================== */
  {
    id: '31.24', chapter: CH, section: S2, page: '413',
    title: 'Разрешающая сила по угловой дисперсии',
    given: [[String.raw`D_\varphi = 5'/\text{нм}`, String.raw`1{,}45\cdot10^6\ \text{рад/м}`], [String.raw`l = 2\ \text{см}`, '']],
    find: String.raw`R \;—\; ?`,
    formulas: [RES, DISP],
    steps: [{ title: 'Малые углы: D_φ = k/d, R = kN = kl/d', tex: String.raw`R = D_\varphi l = 1{,}45\cdot10^6\cdot0{,}02 = 2{,}91\cdot10^4` }],
    answer: [String.raw`R = 2{,}91\cdot10^4`],
  },

  /* ===================== 31.25 ===================== */
  {
    id: '31.25', chapter: CH, section: S2, page: '413',
    title: 'Угловая дисперсия при φ = 30°',
    given: [[String.raw`\varphi = 30^\circ`, ''], [String.raw`\lambda = 600\ \text{нм}`, '']],
    find: String.raw`D_\varphi \;—\; ?`,
    formulas: [DISP, GRAT],
    steps: [{ title: 'k/d = sin φ/λ', tex: String.raw`D_\varphi = \frac{\operatorname{tg}\varphi}{\lambda} = \frac{0{,}577}{6\cdot10^{-7}} = 9{,}62\cdot10^5\ \text{рад/м} = 3{,}31'/\text{нм}` }],
    answer: [String.raw`D_\varphi = 9{,}62\cdot10^5\ \text{рад/м} \approx 3{,}31'/\text{нм}`],
  },

  /* ===================== 31.26 ===================== */
  {
    id: '31.26', chapter: CH, section: S2, page: '413–414',
    title: 'Линейная дисперсия в третьем порядке',
    given: [[String.raw`n = 500\ \text{мм}^{-1}`, String.raw`d = 2\ \text{мкм}`], [String.raw`\lambda = 700\ \text{нм}`, ''], [String.raw`f = 50\ \text{см},\ k = 3`, '']],
    find: String.raw`D_l \;—\; ?`,
    formulas: [DISP, GRAT],
    steps: [
      { title: 'Существует ли третий порядок?', tex: String.raw`\sin\varphi_3 = \frac{3\cdot0{,}7}{2} = 1{,}05 > 1` },
      { title: 'Вывод', text: 'Максимума третьего порядка у этой решётки нет: наибольший порядок равен 2. Формально по приближённой формуле D_l ≈ fk/d = 0,5·3/(2·10⁻⁶) = 0,75 мм/нм.' },
    ],
    answer: [String.raw`\text{максимума 3-го порядка нет};\ \text{формально } fk/d = 0{,}75\ \text{мм/нм}`],
    note: MISMATCH + 'В книге 1 мм/нм. При n = 500 мм⁻¹ и λ = 700 нм максимум третьего порядка не существует (sin φ = 1,05), а приближённая формула даёт 0,75 мм/нм. Вероятно, в условии опечатка.',
  },

  /* ===================== 31.27 ===================== */
  {
    id: '31.27', chapter: CH, section: S2, page: '414',
    title: 'Число штрихов по линейной дисперсии',
    given: [[String.raw`D = 1\ \text{дптр}`, String.raw`f = 1\ \text{м}`], [String.raw`D_l = 1\ \text{мм/нм}`, String.raw`10^6\ \text{м/м}`]],
    find: String.raw`n \;—\; ?`,
    formulas: [DISP],
    steps: [{ title: 'Малые углы, k = 1', tex: String.raw`D_l = \frac fd = fn\ \Rightarrow\ n = \frac{10^6}{1} = 10^6\ \text{м}^{-1} = 10^3\ \text{мм}^{-1}` }],
    answer: [String.raw`n = 10^3\ \text{штрихов/мм}`],
  },

  /* ===================== 31.28 ===================== */
  {
    id: '31.28', chapter: CH, section: S2, page: '414',
    title: 'Фокус линзы для заданной дисперсии',
    given: [[String.raw`\lambda = 650\ \text{нм}`, ''], [String.raw`\varphi = 30^\circ`, ''], [String.raw`D_l = 0{,}5\ \text{мм/нм}`, String.raw`5\cdot10^5\ \text{м/м}`]],
    find: String.raw`f \;—\; ?`,
    formulas: [DISP, GRAT],
    steps: [
      { title: 'Плоский экран: l = f tg φ', tex: String.raw`D_l = \frac{f}{\cos^2\varphi}\cdot\frac{\operatorname{tg}\varphi}{\lambda} = \frac{f\sin\varphi}{\lambda\cos^3\varphi}` },
      { title: 'Фокус', tex: String.raw`f = \frac{D_l\lambda\cos^3\varphi}{\sin\varphi} = \frac{5\cdot10^5\cdot6{,}5\cdot10^{-7}\cdot0{,}6495}{0{,}5} = 0{,}422\ \text{м}` },
    ],
    answer: [String.raw`f = 42{,}2\ \text{см}`],
    note: MISMATCH + 'В книге 21,1 см при той же формуле — ровно вдвое меньше. Подстановка даёт 42,2 см.',
  },

  /* ===================== 31.29 ===================== */
  {
    id: '31.29', chapter: CH, section: S3, page: '414',
    title: 'Межплоскостное расстояние каменной соли',
    given: [[String.raw`\lambda = 147\ \text{пм}`, ''], [String.raw`k = 2`, ''], [String.raw`\theta = 31^\circ30'`, '']],
    find: String.raw`d \;—\; ?`,
    formulas: [BRAGG],
    steps: [{ title: 'Расстояние', tex: String.raw`d = \frac{k\lambda}{2\sin\theta} = \frac{2\cdot147}{2\cdot0{,}5225} = 281\ \text{пм}` }],
    answer: [String.raw`d = 0{,}28\ \text{нм}`],
  },

  /* ===================== 31.30 ===================== */
  {
    id: '31.30', chapter: CH, section: S3, page: '414',
    title: 'Длина волны рентгеновского излучения (кальцит)',
    given: [[String.raw`k = 1,\ \theta = 3^\circ`, ''], [String.raw`d = 0{,}3\ \text{нм}`, '']],
    find: String.raw`\lambda \;—\; ?`,
    formulas: [BRAGG],
    steps: [{ title: 'Длина волны', tex: String.raw`\lambda = 2d\sin\theta = 0{,}6\cdot0{,}0523 = 0{,}0314\ \text{нм}` }],
    answer: [String.raw`\lambda = 31\ \text{пм}`],
  },

  /* ===================== 31.31 ===================== */
  {
    id: '31.31', chapter: CH, section: S3, page: '414',
    title: 'Длина волны при θ = 65°',
    given: [[String.raw`\theta = 65^\circ,\ k = 1`, ''], [String.raw`d = 280\ \text{пм}`, '']],
    find: String.raw`\lambda \;—\; ?`,
    formulas: [BRAGG],
    steps: [{ title: 'Длина волны', tex: String.raw`\lambda = 2\cdot280\cdot\sin65^\circ = 560\cdot0{,}9063 = 508\ \text{пм}` }],
    answer: [String.raw`\lambda = 508\ \text{пм}`],
    note: SMALL + 'В книге 506 пм; точно 507,5.',
  },

  /* ===================== 31.32 ===================== */
  {
    id: '31.32', chapter: CH, section: S4, page: '414',
    title: 'Разрешение телескопа D = 8 см',
    given: [[String.raw`D = 8\ \text{см}`, String.raw`0{,}08\ \text{м}`], [String.raw`\lambda = 0{,}5\ \text{мкм}`, '']],
    find: String.raw`\beta \;—\; ?`,
    formulas: [TEL],
    steps: [{ title: 'Угол', tex: String.raw`\beta = \frac{1{,}22\cdot5\cdot10^{-7}}{0{,}08} = 7{,}6\cdot10^{-6}\ \text{рад} = 1{,}6''` }],
    answer: [String.raw`\beta = 1{,}6''`],
  },

  /* ===================== 31.33 ===================== */
  {
    id: '31.33', chapter: CH, section: S4, page: '414–415',
    title: 'Различить две лампы на шпиле',
    given: [[String.raw`\lambda = 640\ \text{нм}`, ''], [String.raw`d = 20\ \text{см}`, ''], [String.raw`r = 15\ \text{км}`, String.raw`1{,}5\cdot10^4\ \text{м}`]],
    find: String.raw`D_{\min} \;—\; ?`,
    formulas: [TEL],
    steps: [{ title: 'β = d/r', tex: String.raw`D_{\min} = \frac{1{,}22\lambda r}{d} = \frac{1{,}22\cdot6{,}4\cdot10^{-7}\cdot1{,}5\cdot10^4}{0{,}2} = 5{,}9\cdot10^{-2}\ \text{м}` }],
    answer: [String.raw`D_{\min} \approx 6\ \text{см}`],
  }

  );
})();
