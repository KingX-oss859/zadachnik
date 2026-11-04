/*
  § 18. Энергия заряженного проводника. Энергия электрического поля — задачи 18.1–18.21 (стр. 282–284).
  Условия задач показываются дословно из книги (data/book-tasks.js).
  Ответы пересчитаны скриптом tools/check_energiya_polya.py и сверены с book/99-otvety.md.
  Где ответ книги расходится с расчётом — плашка note «Расхождение с ответом книги».
  ε₀ = 8,85·10⁻¹² Ф/м, 1/(4πε₀) = 8,99·10⁹ м/Ф; ε — табл. 17: слюда 7, фарфор 5, эбонит 3, парафин 2.
*/
(function () {
  const CH = 'Гл. 3. Электростатика';
  const S1 = 'Энергия плоского конденсатора';
  const S2 = 'Энергия поля заряженной сферы';
  const MISMATCH = '<b>Расхождение с ответом книги.</b> ';
  const SMALL = '<b>Расхождение в последней цифре.</b> ';
  const TYPO = '<b>Опечатка в ответе книги.</b> ';

  const WC = { tex: String.raw`W = \frac{CU^2}{2} = \frac{Q^2}{2C} = \frac{QU}{2}`, text: 'энергия заряженного конденсатора (проводника: U → φ)' };
  const CFLAT = { tex: String.raw`C = \frac{\varepsilon\varepsilon_0S}{d}`, text: 'ёмкость плоского конденсатора' };
  const WDENS = { tex: String.raw`w = \frac{\varepsilon_0\varepsilon E^2}{2} = \frac{ED}{2}`, text: 'объёмная плотность энергии поля' };
  const FPLATE = { tex: String.raw`F = \frac{Q^2}{2\varepsilon_0S} = \frac{QE}{2} = wS`, text: 'сила притяжения пластин: заряд одной пластины в поле другой (E/2)' };
  const CSPH = { tex: String.raw`C = 4\pi\varepsilon_0R`, text: 'ёмкость уединённой сферы' };
  const ESPH = { tex: String.raw`E = \frac{Q}{4\pi\varepsilon_0r^2}\ (r > R)`, text: 'поле заряженной сферы снаружи' };
  const QCONST = { tex: String.raw`Q = \text{const}`, text: 'конденсатор отключён от источника — заряд на пластинах не меняется' };

  window.TASKS.push(

  /* ===================== 18.1 ===================== */
  {
    id: '18.1', chapter: CH, section: S1, page: '282',
    title: 'Энергия конденсатора 10 пФ',
    given: [[String.raw`C = 10\ \text{пФ}`, String.raw`10^{-11}\ \text{Ф}`], [String.raw`Q = 1\ \text{пКл}`, String.raw`10^{-12}\ \text{Кл}`]],
    find: String.raw`W \;—\; ?`,
    formulas: [WC],
    steps: [
      { title: 'Энергия',
        tex: String.raw`W = \frac{Q^2}{2C} = \frac{10^{-24}}{2\cdot10^{-11}} = 5\cdot10^{-14}\ \text{Дж}` },
    ],
    answer: [String.raw`W = 5\cdot10^{-14}\ \text{Дж} = 0{,}05\ \text{пДж}`],
    note: TYPO + 'В книге «0,05 мкДж». (10⁻¹²)²/(2·10⁻¹¹) = 5·10⁻¹⁴ Дж = 0,05 пДж — перепутана приставка.',
  },

  /* ===================== 18.2 ===================== */
  {
    id: '18.2', chapter: CH, section: S1, page: '282',
    title: 'Энергия поля и сила притяжения пластин',
    given: [[String.raw`d = 2\ \text{см}`, String.raw`0{,}02\ \text{м}`], [String.raw`U = 6\ \text{кВ}`, String.raw`6\cdot10^3\ \text{В}`], [String.raw`Q = 10\ \text{нКл}`, String.raw`10^{-8}\ \text{Кл}`]],
    find: String.raw`W,\ F \;—\; ?`,
    formulas: [WC, FPLATE],
    steps: [
      { title: 'Энергия',
        tex: String.raw`W = \frac{QU}{2} = \frac{10^{-8}\cdot6\cdot10^3}{2} = 3\cdot10^{-5}\ \text{Дж}` },
      { title: 'Сила',
        text: 'Заряд одной пластины находится в поле другой, а оно вдвое слабее полного поля E = U/d. Или: F = W/d (работа силы при сближении пластин до нуля равна энергии).',
        tex: String.raw`F = \frac{QU}{2d} = \frac Wd = \frac{3\cdot10^{-5}}{0{,}02} = 1{,}5\cdot10^{-3}\ \text{Н}` },
    ],
    answer: [String.raw`W = 30\ \text{мкДж}`, String.raw`F = 1{,}5\ \text{мН}`],
    note: MISMATCH + 'В книге F = 15 мН — в 10 раз больше. F = W/d = 30 мкДж / 0,02 м = 1,5 мН.',
  },

  /* ===================== 18.3 ===================== */
  {
    id: '18.3', chapter: CH, section: S1, page: '282',
    title: 'Теплота при разряде слюдяного конденсатора',
    given: [[String.raw`U = 15\ \text{кВ}`, String.raw`1{,}5\cdot10^4\ \text{В}`], [String.raw`d = 1\ \text{мм}`, String.raw`10^{-3}\ \text{м}`], [String.raw`S = 300\ \text{см}^2`, String.raw`0{,}03\ \text{м}^2`], [String.raw`\varepsilon = 7\ (\text{слюда})`, '']],
    find: String.raw`Q \;—\; ?`,
    formulas: [CFLAT, WC],
    steps: [
      { title: 'Ёмкость',
        tex: String.raw`C = \frac{7\cdot8{,}85\cdot10^{-12}\cdot0{,}03}{10^{-3}} = 1{,}86\cdot10^{-9}\ \text{Ф}` },
      { title: 'Вся энергия переходит в теплоту',
        tex: String.raw`Q = \frac{CU^2}{2} = \frac{1{,}86\cdot10^{-9}\cdot2{,}25\cdot10^8}{2} = 0{,}209\ \text{Дж}` },
    ],
    answer: [String.raw`Q = 0{,}209\ \text{Дж}`],
  },

  /* ===================== 18.4 ===================== */
  {
    id: '18.4', chapter: CH, section: S1, page: '282',
    title: 'Плотность энергии по силе притяжения пластин',
    given: [[String.raw`F = 50\ \text{мН}`, String.raw`0{,}05\ \text{Н}`], [String.raw`S = 200\ \text{см}^2`, String.raw`0{,}02\ \text{м}^2`]],
    find: String.raw`w \;—\; ?`,
    formulas: [FPLATE, WDENS],
    steps: [
      { title: 'F = wS',
        text: 'Если раздвинуть пластины на Δx, объём поля вырастет на SΔx, энергия — на wSΔx = FΔx.',
        tex: String.raw`w = \frac FS = \frac{0{,}05}{0{,}02} = 2{,}5\ \text{Дж/м}^3` },
    ],
    answer: [String.raw`w = 2{,}5\ \text{Дж/м}^3`],
  },

  /* ===================== 18.5 ===================== */
  {
    id: '18.5', chapter: CH, section: S1, page: '282',
    title: 'Раздвигаем пластины отключённого конденсатора',
    given: [[String.raw`r = 10\ \text{см}`, String.raw`0{,}1\ \text{м}`], [String.raw`d_1 = 1\ \text{см}`, String.raw`0{,}01\ \text{м}`], [String.raw`U = 1{,}2\ \text{кВ}`, String.raw`1{,}2\cdot10^3\ \text{В}`], [String.raw`d_2 = 3{,}5\ \text{см}`, String.raw`0{,}035\ \text{м}`]],
    find: String.raw`A \;—\; ?`,
    formulas: [CFLAT, WC, QCONST],
    steps: [
      { title: 'Начальная энергия',
        tex: String.raw`C_1 = \frac{\varepsilon_0\pi r^2}{d_1} = 27{,}8\ \text{пФ},\quad W_1 = \frac{C_1U^2}{2} = 2{,}0\cdot10^{-5}\ \text{Дж}` },
      { title: 'При Q = const энергия растёт пропорционально d',
        tex: String.raw`W = \frac{Q^2d}{2\varepsilon_0S}\ \Rightarrow\ A = W_2 - W_1 = W_1\left(\frac{d_2}{d_1} - 1\right) = 2{,}0\cdot10^{-5}\cdot2{,}5 = 5{,}0\cdot10^{-5}\ \text{Дж}` },
    ],
    answer: [String.raw`A = 50\ \text{мкДж}`],
  },

  /* ===================== 18.6 ===================== */
  {
    id: '18.6', chapter: CH, section: S1, page: '282',
    title: 'Расстояние между пластинами увеличили в 5 раз',
    given: [[String.raw`C = 1{,}11\ \text{нФ}`, String.raw`1{,}11\cdot10^{-9}\ \text{Ф}`], [String.raw`U = 300\ \text{В}`, ''], [String.raw`n = 5`, '']],
    find: String.raw`U',\ A \;—\; ?`,
    formulas: [WC, QCONST],
    steps: [
      { title: '1) Напряжение',
        text: 'Ёмкость упала в 5 раз, заряд тот же.',
        tex: String.raw`U' = nU = 1500\ \text{В}` },
      { title: '2) Работа',
        tex: String.raw`A = W_2 - W_1 = (n - 1)\frac{CU^2}{2} = 4\cdot\frac{1{,}11\cdot10^{-9}\cdot9\cdot10^4}{2} = 2{,}0\cdot10^{-4}\ \text{Дж}` },
    ],
    answer: [String.raw`U' = 1500\ \text{В}`, String.raw`A = 0{,}2\ \text{мДж}`],
  },

  /* ===================== 18.7 ===================== */
  {
    id: '18.7', chapter: CH, section: S1, page: '283',
    title: 'Энергия искры при соединении конденсаторов',
    given: [[String.raw`C_1 = 600\ \text{пФ}`, String.raw`6\cdot10^{-10}\ \text{Ф}`], [String.raw`U = 1{,}5\ \text{кВ}`, String.raw`1{,}5\cdot10^3\ \text{В}`], [String.raw`C_2 = 400\ \text{пФ}`, String.raw`4\cdot10^{-10}\ \text{Ф}`]],
    find: String.raw`\Delta W \;—\; ?`,
    formulas: [WC, QCONST],
    steps: [
      { title: 'Энергия до и после',
        text: 'Заряд C₁U распределяется на ёмкость C₁ + C₂.',
        tex: String.raw`W_1 = \frac{C_1U^2}{2},\quad W_2 = \frac{(C_1U)^2}{2(C_1 + C_2)}` },
      { title: 'Потеря энергии',
        tex: String.raw`\Delta W = \frac{C_1C_2}{C_1 + C_2}\cdot\frac{U^2}{2} = 240\cdot10^{-12}\cdot\frac{2{,}25\cdot10^6}{2} = 2{,}7\cdot10^{-4}\ \text{Дж}` },
    ],
    answer: [String.raw`\Delta W = 0{,}27\ \text{мДж}`],
  },

  /* ===================== 18.8 ===================== */
  {
    id: '18.8', chapter: CH, section: S1, page: '283',
    title: 'Энергии трёх конденсаторов',
    given: [[String.raw`C_1 = 1,\ C_2 = 2,\ C_3 = 3\ \text{мкФ}`, ''], [String.raw`U = 1{,}1\ \text{кВ}`, String.raw`1{,}1\cdot10^3\ \text{В}`]],
    find: String.raw`W_1,\ W_2,\ W_3 \;—\; ?`,
    formulas: [WC],
    steps: [
      { title: '1) Последовательно: заряды равны',
        tex: String.raw`C = \left(1 + \tfrac12 + \tfrac13\right)^{-1} = \tfrac{6}{11}\ \text{мкФ},\quad Q = CU = 600\ \text{мкКл}` },
      { title: 'Энергии',
        tex: String.raw`W_i = \frac{Q^2}{2C_i}:\quad W_1 = 0{,}18\ \text{Дж},\ W_2 = 0{,}09\ \text{Дж},\ W_3 = 0{,}06\ \text{Дж}` },
      { title: '2) Параллельно: напряжения равны',
        tex: String.raw`W_i = \frac{C_iU^2}{2}:\quad W_1 = 0{,}605\ \text{Дж},\ W_2 = 1{,}21\ \text{Дж},\ W_3 = 1{,}82\ \text{Дж}` },
    ],
    answer: [String.raw`1)\ 0{,}18;\ 0{,}09;\ 0{,}06\ \text{Дж}`, String.raw`2)\ 0{,}605;\ 1{,}21;\ 1{,}82\ \text{Дж}`],
    note: TYPO + 'В книге для C₂ при параллельном соединении «1,121 Дж» — должно быть 1,21 Дж (вдвое больше, чем у C₁).',
  },

  /* ===================== 18.9 ===================== */
  {
    id: '18.9', chapter: CH, section: S1, page: '283',
    title: 'Работа по извлечению фарфора',
    given: [[String.raw`C = 111\ \text{пФ}`, String.raw`1{,}11\cdot10^{-10}\ \text{Ф}`], [String.raw`\varepsilon = 5\ (\text{фарфор})`, ''], [String.raw`U = 600\ \text{В}`, '']],
    find: String.raw`A \;—\; ?`,
    formulas: [WC, QCONST],
    steps: [
      { title: 'Ёмкость падает в ε раз, заряд прежний',
        tex: String.raw`W_2 = \frac{Q^2}{2C/\varepsilon} = \varepsilon W_1,\quad W_1 = \frac{CU^2}{2} = 2{,}0\cdot10^{-5}\ \text{Дж}` },
      { title: 'Работа',
        tex: String.raw`A = W_2 - W_1 = (\varepsilon - 1)W_1 = 4\cdot2{,}0\cdot10^{-5} = 8{,}0\cdot10^{-5}\ \text{Дж}` },
    ],
    answer: [String.raw`A = 80\ \text{мкДж}`],
  },

  /* ===================== 18.10 ===================== */
  {
    id: '18.10', chapter: CH, section: S1, page: '283',
    title: 'Удаление фарфора при заданной σ',
    given: [[String.raw`V = 100\ \text{см}^3`, String.raw`10^{-4}\ \text{м}^3`], [String.raw`\sigma = 8{,}85\ \text{нКл/м}^2`, String.raw`8{,}85\cdot10^{-9}\ \text{Кл/м}^2`], [String.raw`\varepsilon = 5`, '']],
    find: String.raw`A \;—\; ?`,
    formulas: [WDENS, { tex: String.raw`D = \sigma,\quad E = \frac{\sigma}{\varepsilon_0\varepsilon}`, text: 'смещение равно плотности свободных зарядов на пластинах' }],
    steps: [
      { title: 'Плотность энергии с диэлектриком и без',
        text: 'Заряд пластин не меняется, D = σ остаётся тем же.',
        tex: String.raw`w_1 = \frac{\sigma^2}{2\varepsilon_0\varepsilon},\quad w_2 = \frac{\sigma^2}{2\varepsilon_0}` },
      { title: 'Работа',
        tex: String.raw`A = (w_2 - w_1)V = \frac{\sigma^2}{2\varepsilon_0}\cdot\frac{\varepsilon - 1}{\varepsilon}V = \frac{(8{,}85\cdot10^{-9})^2}{2\cdot8{,}85\cdot10^{-12}}\cdot0{,}8\cdot10^{-4} = 3{,}54\cdot10^{-10}\ \text{Дж}` },
    ],
    answer: [String.raw`A = \frac{\sigma^2}{2\varepsilon_0}\cdot\frac{\varepsilon - 1}{\varepsilon}V = 0{,}354\ \text{нДж}`],
    note: MISMATCH + String.raw`В книге $A = \frac12\frac{\sigma^2}{\varepsilon_0}\frac{\varepsilon - 1}{\varepsilon}\frac{2\varepsilon - 1}{\varepsilon}V = 63{,}5$ нДж. Лишний множитель $(2\varepsilon - 1)/\varepsilon$ ничем не объяснён (в задаче 18.9 с тем же смыслом книга им не пользуется), и даже по формуле книги выходит 0,637 нДж, а не 63,5. Работа — разность энергий поля без диэлектрика и с ним: 0,354 нДж.`,
  },

  /* ===================== 18.11 ===================== */
  {
    id: '18.11', chapter: CH, section: S1, page: '283',
    title: 'Эбонитовая пластина в поле 1 кВ/м',
    given: [[String.raw`d = 2\ \text{мм}`, String.raw`2\cdot10^{-3}\ \text{м}`], [String.raw`S = 300\ \text{см}^2`, String.raw`0{,}03\ \text{м}^2`], [String.raw`E = 1\ \text{кВ/м}`, String.raw`10^3\ \text{В/м}`], [String.raw`\varepsilon = 3`, '']],
    find: String.raw`\sigma',\ W \;—\; ?`,
    formulas: [WDENS, { tex: String.raw`\sigma' = P = \varepsilon_0(\varepsilon - 1)\frac E\varepsilon`, text: 'поле в пластине E/ε; связанный заряд равен поляризованности' }],
    steps: [
      { title: '1) Связанные заряды',
        tex: String.raw`\sigma' = \varepsilon_0E\frac{\varepsilon - 1}{\varepsilon} = 8{,}85\cdot10^{-12}\cdot10^3\cdot\frac23 = 5{,}9\cdot10^{-9}\ \text{Кл/м}^2` },
      { title: '2) Энергия в пластине',
        tex: String.raw`W = \frac{\varepsilon_0\varepsilon}{2}\left(\frac E\varepsilon\right)^2Sd = \frac{8{,}85\cdot10^{-12}\cdot10^6}{2\cdot3}\cdot6\cdot10^{-5} = 8{,}85\cdot10^{-11}\ \text{Дж}` },
    ],
    answer: [String.raw`\sigma' = 5{,}9\ \text{нКл/м}^2`, String.raw`W = 88{,}5\ \text{пДж}`],
  },

  /* ===================== 18.12 ===================== */
  {
    id: '18.12', chapter: CH, section: S1, page: '283',
    title: 'Поляризованная пластина вне поля',
    given: [[String.raw`\text{данные задачи 18.11}`, '']],
    find: String.raw`W \;—\; ?`,
    formulas: [WDENS],
    steps: [
      { title: 'Поле «замороженной» поляризации',
        text: 'Связанные заряды ±σ′ остались на гранях (как у конденсатора). Внутри пластины они создают поле σ′/ε₀ — его энергию и считает книга (как в вакууме, без учёта ε).',
        tex: String.raw`E' = \frac{\sigma'}{\varepsilon_0} = E\frac{\varepsilon - 1}{\varepsilon}` },
      { title: 'Энергия',
        tex: String.raw`W = \frac{\varepsilon_0E'^2}{2}Sd = \frac{8{,}85\cdot10^{-12}\cdot10^6}{2}\cdot\frac49\cdot6\cdot10^{-5} = 1{,}18\cdot10^{-10}\ \text{Дж}` },
    ],
    answer: [String.raw`W = 118\ \text{пДж}`],
  },

  /* ===================== 18.13 ===================== */
  {
    id: '18.13', chapter: CH, section: S2, page: '283',
    title: 'Энергия заряженной сферы',
    given: [[String.raw`R = 4\ \text{см}`, String.raw`0{,}04\ \text{м}`], [String.raw`\varphi = 500\ \text{В}`, '']],
    find: String.raw`W \;—\; ?`,
    formulas: [CSPH, WC],
    steps: [
      { title: 'Энергия',
        tex: String.raw`W = \frac{C\varphi^2}{2} = \frac{4\pi\cdot8{,}85\cdot10^{-12}\cdot0{,}04\cdot500^2}{2} = 5{,}56\cdot10^{-7}\ \text{Дж}` },
    ],
    answer: [String.raw`W = 0{,}56\ \text{мкДж}`],
    note: SMALL + 'В книге 0,55 мкДж; точно 0,556.',
  },

  /* ===================== 18.14 ===================== */
  {
    id: '18.14', chapter: CH, section: S2, page: '283',
    title: 'Энергия поля металлического шара',
    given: [[String.raw`Q = 100\ \text{нКл}`, String.raw`10^{-7}\ \text{Кл}`], [String.raw`d = 20\ \text{см}`, String.raw`R = 0{,}1\ \text{м}`]],
    find: String.raw`W \;—\; ?`,
    formulas: [CSPH, WC],
    steps: [
      { title: 'Энергия',
        tex: String.raw`W = \frac{Q^2}{2C} = \frac{Q^2}{8\pi\varepsilon_0R} = \frac{8{,}99\cdot10^9\cdot10^{-14}}{2\cdot0{,}1} = 4{,}5\cdot10^{-4}\ \text{Дж}` },
    ],
    answer: [String.raw`W = 450\ \text{мкДж}`],
  },

  /* ===================== 18.15 ===================== */
  {
    id: '18.15', chapter: CH, section: S2, page: '283',
    title: 'Энергия поля в слое от R до 3R',
    given: [[String.raw`C = 10\ \text{пФ}`, String.raw`10^{-11}\ \text{Ф}`], [String.raw`\varphi = 3\ \text{кВ}`, String.raw`3\cdot10^3\ \text{В}`]],
    find: String.raw`W \;—\; ?`,
    formulas: [ESPH, WDENS],
    steps: [
      { title: 'Энергия поля между R и r₂',
        text: 'Интегрируем w по тонким сферическим слоям 4πr²dr.',
        tex: String.raw`W = \int_R^{r_2}\frac{\varepsilon_0}{2}\left(\frac{Q}{4\pi\varepsilon_0r^2}\right)^24\pi r^2dr = \frac{Q^2}{8\pi\varepsilon_0}\left(\frac1R - \frac{1}{r_2}\right)` },
      { title: 'При r₂ = 3R — это 2/3 всей энергии',
        tex: String.raw`W = \frac{C\varphi^2}{2}\cdot\frac23 = \frac{10^{-11}\cdot9\cdot10^6}{2}\cdot\frac23 = 3\cdot10^{-5}\ \text{Дж}` },
    ],
    answer: [String.raw`W = 30\ \text{мкДж}`],
  },

  /* ===================== 18.16 ===================== */
  {
    id: '18.16', chapter: CH, section: S2, page: '284',
    title: 'Энергия поля в слое от R до 2R',
    given: [[String.raw`Q = 0{,}1\ \text{мкКл}`, String.raw`10^{-7}\ \text{Кл}`], [String.raw`R = 10\ \text{см}`, String.raw`0{,}1\ \text{м}`]],
    find: String.raw`W \;—\; ?`,
    formulas: [ESPH, WDENS],
    steps: [
      { title: 'По формуле из 18.15 при r₂ = 2R',
        tex: String.raw`W = \frac{Q^2}{8\pi\varepsilon_0}\left(\frac1R - \frac{1}{2R}\right) = \frac{Q^2}{16\pi\varepsilon_0R} = \frac{10^{-14}}{16\pi\cdot8{,}85\cdot10^{-12}\cdot0{,}1} = 2{,}25\cdot10^{-4}\ \text{Дж}` },
    ],
    answer: [String.raw`W = 225\ \text{мкДж}`],
  },

  /* ===================== 18.17 ===================== */
  {
    id: '18.17', chapter: CH, section: S2, page: '284',
    title: 'Сфера, делящая энергию пополам',
    given: [[String.raw`R_1 = 6\ \text{см}`, '']],
    find: String.raw`R_2 \;—\; ?`,
    formulas: [ESPH, WDENS],
    steps: [
      { title: 'Энергии внутри и снаружи R₂',
        tex: String.raw`\frac{Q^2}{8\pi\varepsilon_0}\left(\frac{1}{R_1} - \frac{1}{R_2}\right) = \frac{Q^2}{8\pi\varepsilon_0R_2}\ \Rightarrow\ R_2 = 2R_1 = 12\ \text{см}` },
    ],
    answer: [String.raw`R_2 = 12\ \text{см}`],
  },

  /* ===================== 18.18 ===================== */
  {
    id: '18.18', chapter: CH, section: S2, page: '284',
    title: 'Энергия поля заряженного парафинового шара',
    given: [[String.raw`R = 10\ \text{см}`, String.raw`0{,}1\ \text{м}`], [String.raw`\rho = 10\ \text{нКл/м}^3`, String.raw`10^{-8}\ \text{Кл/м}^3`], [String.raw`\varepsilon = 2`, '']],
    find: String.raw`W_1,\ W_2 \;—\; ?`,
    formulas: [WDENS, { tex: String.raw`E = \frac{\rho r}{3\varepsilon_0\varepsilon}\ (r < R),\quad E = \frac{\rho R^3}{3\varepsilon_0r^2}\ (r > R)`, text: 'поле равномерно заряженного шара' }],
    steps: [
      { title: 'Внутри шара',
        tex: String.raw`W_1 = \int_0^R\frac{\varepsilon_0\varepsilon}{2}\left(\frac{\rho r}{3\varepsilon_0\varepsilon}\right)^24\pi r^2dr = \frac{2\pi}{45}\frac{\rho^2R^5}{\varepsilon_0\varepsilon} = 7{,}89\cdot10^{-12}\ \text{Дж}` },
      { title: 'Снаружи',
        tex: String.raw`W_2 = \int_R^\infty\frac{\varepsilon_0}{2}\left(\frac{\rho R^3}{3\varepsilon_0r^2}\right)^24\pi r^2dr = \frac{2\pi}{9}\frac{\rho^2R^5}{\varepsilon_0} = 7{,}89\cdot10^{-11}\ \text{Дж}` },
    ],
    answer: [String.raw`W_1 = 7{,}89\ \text{пДж}`, String.raw`W_2 = 78{,}9\ \text{пДж}`],
    note: TYPO + 'В книге «нДж». ρ²R⁵ = 10⁻¹⁶·10⁻⁵ = 10⁻²¹, и W₁ = 2π·10⁻²¹/(45·8,85·10⁻¹²·2) = 7,89·10⁻¹² Дж — это пикоджоули. Последняя цифра (7,88 и 78,8 в книге) — округление.',
  },

  /* ===================== 18.19 ===================== */
  {
    id: '18.19', chapter: CH, section: S2, page: '284',
    title: 'Энергия вне и внутри эбонитового шара',
    given: [[String.raw`\varepsilon = 3\ (\text{эбонит})`, '']],
    find: String.raw`W_\text{вне}/W_\text{вн} \;—\; ?`,
    formulas: [WDENS],
    steps: [
      { title: 'Из формул задачи 18.18',
        tex: String.raw`\frac{W_\text{вне}}{W_\text{вн}} = \frac{2\pi/9}{2\pi/(45\varepsilon)} = 5\varepsilon = 15` },
    ],
    answer: [String.raw`\text{в 15 раз}`],
    note: '<b>Про обозначения в ответе книги.</b> В книге записано W₁/W₂ = 5ε и сказано, что ε — проницаемость среды вокруг шара. На самом деле здесь ε — проницаемость материала шара (эбонита), а отношение — энергии снаружи к энергии внутри.',
  },

  /* ===================== 18.20 ===================== */
  {
    id: '18.20', chapter: CH, section: S2, page: '284',
    title: 'Энергия системы двух заряженных шаров',
    given: [[String.raw`R_1 = 4\ \text{см},\ Q_1 = 2\ \text{нКл}`, ''], [String.raw`R_2 = 6\ \text{см},\ Q_2 = 3\ \text{нКл}`, ''], [String.raw`l = 20\ \text{см}`, String.raw`0{,}2\ \text{м}`]],
    find: String.raw`\Pi \;—\; ?`,
    formulas: [{ tex: String.raw`W_\text{собств} = \frac35\frac{Q^2}{4\pi\varepsilon_0R}`, text: 'собственная энергия шара, равномерно заряженного по объёму (ε = 1)' }, { tex: String.raw`W_\text{вз} = \frac{Q_1Q_2}{4\pi\varepsilon_0l}`, text: 'взаимодействие шаров — как точечных зарядов в центрах' }],
    steps: [
      { title: 'Сумма',
        tex: String.raw`\Pi = 8{,}99\cdot10^9\left(\frac35\cdot\frac{4\cdot10^{-18}}{0{,}04} + \frac35\cdot\frac{9\cdot10^{-18}}{0{,}06} + \frac{6\cdot10^{-18}}{0{,}2}\right) = 8{,}99\cdot10^9\cdot1{,}8\cdot10^{-16}` },
      { title: 'Итог',
        tex: String.raw`\Pi = 1{,}62\cdot10^{-6}\ \text{Дж}` },
    ],
    answer: [String.raw`\Pi = 1{,}62\ \text{мкДж}`],
  },

  /* ===================== 18.21 ===================== */
  {
    id: '18.21', chapter: CH, section: S2, page: '284',
    title: 'Разрыв заряженной сферы',
    given: [[String.raw`R = 10\ \text{см}`, String.raw`0{,}1\ \text{м}`], [String.raw`m = 10\ \text{г}`, String.raw`0{,}01\ \text{кг}`], [String.raw`Q = 3\ \text{мкКл}`, String.raw`3\cdot10^{-6}\ \text{Кл}`]],
    find: String.raw`v_{\max} \;—\; ?`,
    formulas: [CSPH, WC],
    steps: [
      { title: 'Энергия поля переходит в кинетическую',
        text: 'Осколки одинаковые и разлетаются симметрично — у всех одна и та же скорость, она же и максимальная.',
        tex: String.raw`\frac{mv^2}{2} = \frac{Q^2}{8\pi\varepsilon_0R}\ \Rightarrow\ v = \frac{Q}{\sqrt{4\pi\varepsilon_0mR}}` },
      { title: 'Считаем',
        tex: String.raw`v = \frac{3\cdot10^{-6}}{\sqrt{4\pi\cdot8{,}85\cdot10^{-12}\cdot0{,}01\cdot0{,}1}} = 9{,}0\ \text{м/с}` },
    ],
    answer: [String.raw`v_{\max} = \frac{Q}{\sqrt{4\pi\varepsilon_0mR}} = 9\ \text{м/с}`],
    note: TYPO + 'В формуле книги под корнем 2πε₀mR — должно быть 4πε₀mR (с 2π вышло бы 12,7 м/с). Число 9 м/с в книге верное.',
  }

  );
})();
