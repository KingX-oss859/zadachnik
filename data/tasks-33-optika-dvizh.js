/*
  § 33. Оптика движущихся тел — задачи 33.1–33.21 (стр. 425–427).
  Условия задач показываются дословно из книги (data/book-tasks.js).
  Ответы пересчитаны скриптом tools/check_optika_dvizh.py и сверены с book/99-otvety.md.
*/
(function () {
  const CH = 'Гл. 6. Оптика';
  const S1 = 'Эффект Доплера';
  const S2 = 'Эффект Вавилова–Черенкова';
  const MISMATCH = '<b>Расхождение с ответом книги.</b> ';
  const TYPO = '<b>Опечатка в ответе книги.</b> ';

  const DREL = { tex: String.raw`\nu = \nu_0\frac{\sqrt{1 - \beta^2}}{1 + \beta\cos\theta};\quad \nu = \nu_0\sqrt{\frac{1 \mp \beta}{1 \pm \beta}}`, text: 'релятивистский эффект Доплера (θ — угол между v и направлением наблюдения; верхний знак — удаление)' };
  const DNR = { tex: String.raw`\frac{\Delta\nu}{\nu} = \frac vc\cos\theta,\quad \frac{\Delta\lambda}{\lambda} = \frac{v}{c}`, text: 'нерелятивистский эффект Доплера' };
  const CHER = { tex: String.raw`\cos\theta = \frac{1}{\beta n},\quad v > \frac cn`, text: 'черенковское излучение: угол конуса и порог' };
  const RELE = { tex: String.raw`\gamma = \frac{1}{\sqrt{1 - \beta^2}},\quad T = (\gamma - 1)E_0,\quad pc = \beta\gamma E_0`, text: 'релятивистская частица' };

  window.TASKS.push(

  /* ===================== 33.1 ===================== */
  {
    id: '33.1', chapter: CH, section: S1, page: '425',
    title: 'Граница применимости ν ≈ ν₀(1 − β)',
    given: [[String.raw`\delta \le 1\%`, '']],
    find: String.raw`\beta_{\max} \;—\; ?`,
    formulas: [DREL],
    steps: [
      { title: 'Отношение приближённой частоты к точной', tex: String.raw`\frac{1 - \beta}{\sqrt{(1 - \beta)/(1 + \beta)}} = \sqrt{1 - \beta^2}` },
      { title: 'Условие', tex: String.raw`1 - \sqrt{1 - \beta^2} = 0{,}01\ \Rightarrow\ \beta = \sqrt{1 - 0{,}99^2} = 0{,}141` },
    ],
    answer: [String.raw`v = 0{,}141c`],
  },

  /* ===================== 33.2 ===================== */
  {
    id: '33.2', chapter: CH, section: S1, page: '425',
    title: 'Вращение Солнца по сдвигу линий',
    given: [[String.raw`\Delta\lambda/\lambda = 1{,}5\cdot10^{-5}`, ''], [String.raw`R = 6{,}95\cdot10^8\ \text{м}`, '']],
    find: String.raw`\omega \;—\; ?`,
    formulas: [DNR],
    steps: [
      { title: 'Края движутся в противоположные стороны', tex: String.raw`\frac{\Delta\lambda}{\lambda} = \frac{2v}{c}\ \Rightarrow\ v = \frac{1{,}5\cdot10^{-5}\cdot3\cdot10^8}{2} = 2{,}25\ \text{км/с}` },
      { title: 'Угловая скорость', tex: String.raw`\omega = \frac vR = \frac{2250}{6{,}95\cdot10^8} = 3{,}2\cdot10^{-6}\ \text{рад/с}` },
    ],
    answer: [String.raw`\omega = 3{,}2\cdot10^{-6}\ \text{рад/с}`],
  },

  /* ===================== 33.3 ===================== */
  {
    id: '33.3', chapter: CH, section: S1, page: '425',
    title: 'Доплеровский сдвиг сигнала корабля',
    given: [[String.raw`v = 10\ \text{км/с}`, ''], [String.raw`\nu_0 = 30\ \text{МГц}`, '']],
    find: String.raw`\Delta\nu \;—\; ?`,
    formulas: [DNR],
    steps: [{ title: 'Сдвиг', tex: String.raw`\Delta\nu = \nu_0\frac vc = 3\cdot10^7\cdot\frac{10^4}{3\cdot10^8} = 10^3\ \text{Гц}` }],
    answer: [String.raw`\text{частота меньше }\nu_0\ \text{на 1 кГц}`],
    note: MISMATCH + 'В книге 10 кГц. ν₀v/c = 30 МГц·(10 км/с)/(3·10⁵ км/с) = 1 кГц.',
  },

  /* ===================== 33.4 ===================== */
  {
    id: '33.4', chapter: CH, section: S1, page: '425',
    title: 'Красное смещение туманности',
    given: [[String.raw`\lambda = 656{,}3\ \text{нм}`, ''], [String.raw`\Delta\lambda = 2{,}5\ \text{нм}`, '']],
    find: String.raw`v \;—\; ?`,
    formulas: [DNR],
    steps: [{ title: 'Скорость', tex: String.raw`v = c\frac{\Delta\lambda}{\lambda} = 3\cdot10^8\cdot\frac{2{,}5}{656{,}3} = 1{,}14\cdot10^6\ \text{м/с}` }],
    answer: [String.raw`v = 1{,}1\ \text{Мм/с};\ \text{туманность удаляется}`],
  },

  /* ===================== 33.5 ===================== */
  {
    id: '33.5', chapter: CH, section: S1, page: '425',
    title: 'Доплеровское уширение линий водорода',
    given: [[String.raw`T = 300\ \text{К}`, ''], [String.raw`M = 10^{-3}\ \text{кг/моль}`, '']],
    find: String.raw`\Delta\lambda/\lambda \;—\; ?`,
    formulas: [DNR, { tex: String.raw`v = \sqrt{\frac{3RT}{M}}`, text: 'средняя квадратичная скорость' }],
    steps: [{ title: 'Атомы летят и к нам, и от нас', tex: String.raw`\frac{\Delta\lambda}{\lambda} = \frac2c\sqrt{\frac{3RT}{M}} = \frac{2\cdot2735}{3\cdot10^8} = 1{,}8\cdot10^{-5}` }],
    answer: [String.raw`\Delta\lambda/\lambda = 1{,}8\cdot10^{-5}`],
  },

  /* ===================== 33.6 ===================== */
  {
    id: '33.6', chapter: CH, section: S1, page: '426',
    title: 'Уширение γ-линий кобальта',
    given: [[String.raw`M = 0{,}059\ \text{кг/моль}`, ''], [String.raw`T_1 = 290\ \text{К},\ T_2 = 10^7\ \text{К}`, '']],
    find: String.raw`\Delta\nu/\nu \;—\; ?`,
    formulas: [DNR],
    steps: [
      { title: '1) Комнатная температура', tex: String.raw`\frac2c\sqrt{\frac{3\cdot8{,}31\cdot290}{0{,}059}} = \frac{2\cdot350}{3\cdot10^8} = 2{,}3\cdot10^{-6}` },
      { title: '2) Ядерный взрыв', tex: String.raw`\frac{2\cdot6{,}5\cdot10^4}{3\cdot10^8} = 4{,}3\cdot10^{-4}` },
    ],
    answer: [String.raw`1)\ 2{,}3\cdot10^{-6};\quad 2)\ 4{,}3\cdot10^{-4}`],
  },

  /* ===================== 33.7 ===================== */
  {
    id: '33.7', chapter: CH, section: S1, page: '426',
    title: 'Сигнал между двумя кораблями',
    given: [[String.raw`v_1 = 12\ \text{км/с},\ v_2 = 8\ \text{км/с}`, ''], [String.raw`\nu_0 = 1\ \text{МГц}`, '']],
    find: String.raw`\nu \;—\; ?`,
    formulas: [DNR],
    steps: [
      { title: 'Важна относительная скорость u', tex: String.raw`\nu = \nu_0\left(1 \pm \frac uc\right)` },
      { title: '1) Навстречу, u = 20 км/с', tex: String.raw`\nu = 10^6(1 + 6{,}67\cdot10^{-5}) = 1\,000\,067\ \text{Гц}` },
      { title: '2) Расходятся, u = 20 км/с', tex: String.raw`\nu = 999\,933\ \text{Гц}` },
      { title: '3) Догоняет, u = 4 км/с', tex: String.raw`\nu = 1\,000\,013\ \text{Гц}` },
      { title: '4) Отстаёт, u = 4 км/с', tex: String.raw`\nu = 999\,987\ \text{Гц}` },
    ],
    answer: [String.raw`1)\ 1\,000\,067;\ 2)\ 999\,933;\ 3)\ 1\,000\,013;\ 4)\ 999\,987\ \text{Гц}`],
  },

  /* ===================== 33.8 ===================== */
  {
    id: '33.8', chapter: CH, section: S1, page: '426',
    title: 'Опыт Белопольского',
    given: [[String.raw`\lambda = 600\ \text{нм}`, ''], [String.raw`N = 10`, ''], [String.raw`v = 0{,}67\ \text{км/с}`, '']],
    find: String.raw`\Delta\lambda \;—\; ?`,
    formulas: [DNR],
    steps: [{ title: 'Каждое отражение от движущегося зеркала даёт 2v/c', tex: String.raw`\Delta\lambda = \mp\frac{2Nv}{c}\lambda = \mp\frac{2\cdot10\cdot670}{3\cdot10^8}\cdot600\ \text{нм} = \mp26{,}8\ \text{пм}` }],
    answer: [String.raw`1)\ -26{,}8\ \text{пм};\quad 2)\ +26{,}8\ \text{пм}`],
  },

  /* ===================== 33.9 ===================== */
  {
    id: '33.9', chapter: CH, section: S1, page: '426',
    title: 'Отражение от удаляющегося зеркала',
    given: [[String.raw`\lambda_0 = 500\ \text{нм}`, ''], [String.raw`v_1 = 0{,}2c,\ v_2 = 9\ \text{км/с}`, '']],
    find: String.raw`\lambda \;—\; ?`,
    formulas: [DREL],
    steps: [
      { title: 'Двойной релятивистский сдвиг', tex: String.raw`\lambda = \lambda_0\frac{1 + \beta}{1 - \beta}` },
      { title: '1) β = 0,2', tex: String.raw`\lambda = 500\cdot\frac{1{,}2}{0{,}8} = 750\ \text{нм}` },
      { title: '2) β ≪ 1', tex: String.raw`\lambda \approx \lambda_0(1 + 2\beta) = 500(1 + 6\cdot10^{-5}) = 500{,}03\ \text{нм}` },
    ],
    answer: [String.raw`1)\ 750\ \text{нм};\quad 2)\ 500{,}03\ \text{нм}`],
    note: TYPO + 'Во втором случае в книге «600,03 нм» — должно быть 500,03 нм: сдвиг всего 0,03 нм.',
  },

  /* ===================== 33.10 ===================== */
  {
    id: '33.10', chapter: CH, section: S1, page: '426',
    title: 'Скорость ракеты по частоте биений',
    given: [[String.raw`\nu_0 = 600\ \text{МГц}`, ''], [String.raw`\nu_1 = 4\ \text{кГц}`, '']],
    find: String.raw`v \;—\; ?`,
    formulas: [DNR],
    steps: [{ title: 'Отражённый сигнал сдвинут на 2ν₀v/c', tex: String.raw`v = \frac{c\nu_1}{2\nu_0} = \frac{3\cdot10^8\cdot4\cdot10^3}{1{,}2\cdot10^9} = 10^3\ \text{м/с}` }],
    answer: [String.raw`v = 1\ \text{км/с}`],
  },

  /* ===================== 33.11 ===================== */
  {
    id: '33.11', chapter: CH, section: S1, page: '426',
    title: 'Роберт Вуд и светофор',
    given: [[String.raw`\lambda_1 = 650\ \text{нм},\ \lambda_2 = 550\ \text{нм}`, '']],
    find: String.raw`v \;—\; ?`,
    formulas: [DREL],
    steps: [
      { title: 'Приближение к источнику', tex: String.raw`\frac{\lambda_2}{\lambda_1} = \sqrt{\frac{1 - \beta}{1 + \beta}}\ \Rightarrow\ \beta = \frac{\lambda_1^2 - \lambda_2^2}{\lambda_1^2 + \lambda_2^2} = \frac{1200}{7250} = 0{,}166` },
      { title: 'Скорость', tex: String.raw`v = 0{,}166\cdot3\cdot10^5 = 5\cdot10^4\ \text{км/с}` },
    ],
    answer: [String.raw`v = 5\cdot10^4\ \text{км/с}`],
  },

  /* ===================== 33.12 ===================== */
  {
    id: '33.12', chapter: CH, section: S1, page: '426–427',
    title: 'Длины волн уменьшились вдвое',
    given: [[String.raw`\lambda/\lambda_0 = 1/2`, '']],
    find: String.raw`\beta \;—\; ?`,
    formulas: [DREL],
    steps: [{ title: 'Приближение', tex: String.raw`\frac{1 - \beta}{1 + \beta} = \frac14\ \Rightarrow\ \beta = 0{,}6` }],
    answer: [String.raw`v = 0{,}6c`],
  },

  /* ===================== 33.13 ===================== */
  {
    id: '33.13', chapter: CH, section: S1, page: '427',
    title: 'Скопление водорода уходит за видимую область',
    given: [[String.raw`\lambda_1 = 410\ \text{нм},\ \lambda_2 = 760\ \text{нм}`, '']],
    find: String.raw`\beta \;—\; ?`,
    formulas: [DREL],
    steps: [{ title: 'Удаление', tex: String.raw`\frac{\lambda_2}{\lambda_1} = \sqrt{\frac{1 + \beta}{1 - \beta}}\ \Rightarrow\ \beta = \frac{\lambda_2^2 - \lambda_1^2}{\lambda_2^2 + \lambda_1^2} = 0{,}549` }],
    answer: [String.raw`v = 0{,}549c`],
  },

  /* ===================== 33.14 ===================== */
  {
    id: '33.14', chapter: CH, section: S1, page: '427',
    title: 'Частота пролетающего источника',
    given: [[String.raw`\beta = 0{,}6`, ''], [String.raw`\nu_0 = 4\ \text{ГГц}`, ''], [String.raw`\text{рис. 33.1: углы }60^\circ`, '']],
    find: String.raw`\nu_1,\ \nu_2 \;—\; ?`,
    formulas: [DREL],
    steps: [
      { title: 'Углы θ между v и направлением наблюдения', text: 'В положении 1 источник приближается: θ = 180° − 60° = 120°. В положении 2 удаляется: θ = 60°.' },
      { title: 'Частоты', tex: String.raw`\nu_1 = \frac{4\cdot0{,}8}{1 - 0{,}3} = 4{,}57\ \text{ГГц},\quad \nu_2 = \frac{3{,}2}{1 + 0{,}3} = 2{,}46\ \text{ГГц}` },
    ],
    answer: [String.raw`\text{от }4{,}57\ \text{до }2{,}46\ \text{ГГц}`],
  },

  /* ===================== 33.15 ===================== */
  {
    id: '33.15', chapter: CH, section: S2, page: '427',
    title: 'Порог черенковского излучения',
    given: [[String.raw`n = 1{,}60`, '']],
    find: String.raw`v_{\min} \;—\; ?`,
    formulas: [CHER],
    steps: [{ title: 'Скорость', tex: String.raw`v = \frac cn = \frac{3\cdot10^8}{1{,}6} = 1{,}88\cdot10^8\ \text{м/с}` }],
    answer: [String.raw`v_{\min} = 1{,}88\cdot10^8\ \text{м/с}`],
    note: TYPO + 'В книге «1,88 м/с» — пропущен множитель 10⁸.',
  },

  /* ===================== 33.16 ===================== */
  {
    id: '33.16', chapter: CH, section: S2, page: '427',
    title: 'Скорость по углу черенковского конуса',
    given: [[String.raw`n = 1{,}80`, ''], [String.raw`\theta = 20^\circ`, '']],
    find: String.raw`\beta \;—\; ?`,
    formulas: [CHER],
    steps: [{ title: 'Скорость', tex: String.raw`\beta = \frac{1}{n\cos\theta} = \frac{1}{1{,}8\cdot0{,}940} = 0{,}591` }],
    answer: [String.raw`v = 0{,}591c`],
  },

  /* ===================== 33.17 ===================== */
  {
    id: '33.17', chapter: CH, section: S2, page: '427',
    title: 'Ускоряющее напряжение для черенковского излучения',
    given: [[String.raw`n = 1{,}50`, ''], [String.raw`E_0 = 0{,}511\ \text{МэВ}`, '']],
    find: String.raw`U_{\min} \;—\; ?`,
    formulas: [CHER, RELE],
    steps: [
      { title: 'Порог β = 1/n', tex: String.raw`\gamma = \frac{n}{\sqrt{n^2 - 1}} = \frac{1{,}5}{1{,}118} = 1{,}342` },
      { title: 'Напряжение', tex: String.raw`eU = (\gamma - 1)E_0 = 0{,}342\cdot0{,}511\ \text{МэВ} = 175\ \text{кэВ}` },
    ],
    answer: [String.raw`U_{\min} = 175\ \text{кВ}`],
  },

  /* ===================== 33.18 ===================== */
  {
    id: '33.18', chapter: CH, section: S2, page: '427',
    title: 'Черенковское излучение в воздухе',
    given: [[String.raw`n = 1{,}00029`, ''], [String.raw`E_0 = 0{,}511\ \text{МэВ}`, '']],
    find: String.raw`T_{\min} \;—\; ?`,
    formulas: [CHER, RELE],
    steps: [
      { title: 'Порог', tex: String.raw`\gamma = \frac{n}{\sqrt{n^2 - 1}} = \frac{1{,}00029}{\sqrt{5{,}80\cdot10^{-4}}} = 41{,}5` },
      { title: 'Энергия', tex: String.raw`T = (\gamma - 1)E_0 = 40{,}5\cdot0{,}511 = 20{,}7\ \text{МэВ}` },
    ],
    answer: [String.raw`T_{\min} = 20{,}7\ \text{МэВ}`],
    note: MISMATCH + 'В книге 29,5 МэВ. По той же формуле, что и в 33.17, при n = 1,00029 выходит 20,7 МэВ.',
  },

  /* ===================== 33.19 ===================== */
  {
    id: '33.19', chapter: CH, section: S2, page: '427',
    title: 'Угол черенковского конуса в воде',
    given: [[String.raw`T = 0{,}51\ \text{МэВ}`, ''], [String.raw`n = 1{,}33`, '']],
    find: String.raw`\theta \;—\; ?`,
    formulas: [CHER, RELE],
    steps: [
      { title: 'T ≈ E₀ → γ ≈ 2', tex: String.raw`\beta = \sqrt{1 - \frac14} = 0{,}866` },
      { title: 'Угол', tex: String.raw`\cos\theta = \frac{1}{0{,}866\cdot1{,}33} = 0{,}868\ \Rightarrow\ \theta \approx 30^\circ` },
    ],
    answer: [String.raw`\theta \approx 30^\circ`],
  },

  /* ===================== 33.20 ===================== */
  {
    id: '33.20', chapter: CH, section: S2, page: '427',
    title: 'Электрон с импульсом m₀c',
    given: [[String.raw`p = m_0c`, '']],
    find: String.raw`n_{\min} \;—\; ?`,
    formulas: [CHER, RELE],
    steps: [{ title: 'βγ = 1', tex: String.raw`\frac{\beta}{\sqrt{1 - \beta^2}} = 1\ \Rightarrow\ \beta = \frac1{\sqrt2},\quad n_{\min} = \frac1\beta = \sqrt2 = 1{,}41` }],
    answer: [String.raw`n_{\min} = 1{,}41`],
  },

  /* ===================== 33.21 ===================== */
  {
    id: '33.21', chapter: CH, section: S2, page: '427',
    title: 'Отличить μ- от π-мезонов',
    given: [[String.raw`p = 100\ \text{МэВ}/c`, ''], [String.raw`m_\mu c^2 = 106\ \text{МэВ},\ m_\pi c^2 = 140\ \text{МэВ}`, '']],
    find: String.raw`n \;—\; ?`,
    formulas: [CHER, RELE],
    steps: [
      { title: 'Скорости: β = pc/E', tex: String.raw`\beta_\mu = \frac{100}{\sqrt{100^2 + 106^2}} = 0{,}686,\quad \beta_\pi = \frac{100}{\sqrt{100^2 + 140^2}} = 0{,}581` },
      { title: 'Условия', tex: String.raw`\frac1{\beta_\mu} < n < \frac1{\beta_\pi}:\quad 1{,}46 < n < 1{,}72` },
    ],
    answer: [String.raw`1{,}45 < n < 1{,}72`],
  }

  );
})();
