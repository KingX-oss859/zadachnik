/*
  § 25. Работа по перемещению проводника с током в магнитном поле. Электромагнитная индукция.
  Индуктивность — задачи 25.1–25.49 (стр. 358–365). Номер 25.5 в книге напечатан дважды: 25.5(1) и 25.5(2).
  Условия задач показываются дословно из книги (data/book-tasks.js).
  Ответы пересчитаны скриптом tools/check_induktsiya.py и сверены с book/99-otvety.md.
*/
(function () {
  const CH = 'Гл. 5. Электромагнетизм';
  const S1 = 'Работа по перемещению проводника в магнитном поле';
  const S2 = 'Электродвижущая сила индукции';
  const S3 = 'Количество электричества, протекающее в контуре при изменении магнитного потока';
  const S4 = 'Самоиндукция и взаимоиндукция';
  const S5 = 'Экстратоки замыкания и размыкания';
  const S6 = 'Бетатрон';
  const MISMATCH = '<b>Расхождение с ответом книги.</b> ';
  const SMALL = '<b>Расхождение в последней цифре.</b> ';
  const TYPO = '<b>Опечатка в ответе книги.</b> ';
  const GRAPH = '<b>Чтение графика.</b> ';

  const WORK = { tex: String.raw`A = I\Delta\Phi`, text: 'работа сил поля при перемещении контура с постоянным током' };
  const FAR = { tex: String.raw`\mathcal E_i = -N\frac{d\Phi}{dt},\quad \langle\mathcal E_i\rangle = -\frac{\Delta\Psi}{\Delta t}`, text: 'закон электромагнитной индукции' };
  const MOVE = { tex: String.raw`\mathcal E_i = Blv`, text: 'ЭДС в проводе, движущемся поперёк поля' };
  const ROT = { tex: String.raw`\mathcal E_i = NBS\omega\sin\omega t,\quad \mathcal E_{\max} = NBS\omega`, text: 'рамка, вращающаяся в однородном поле' };
  const QIND = { tex: String.raw`Q = \frac{\Delta\Psi}{R}`, text: 'заряд, прошедший при изменении потокосцепления (не зависит от скорости)' };
  const SELF = { tex: String.raw`\mathcal E_s = -L\frac{dI}{dt},\quad \Psi = LI`, text: 'ЭДС самоиндукции; индуктивность' };
  const LSOL = { tex: String.raw`L = \mu\mu_0\frac{N^2S}{l} = \mu\mu_0n^2V`, text: 'индуктивность длинного соленоида' };
  const MUT = { tex: String.raw`\mathcal E_2 = -M\frac{dI_1}{dt}`, text: 'ЭДС взаимной индукции' };
  const EXTRA = { tex: String.raw`I = I_0e^{-Rt/L},\quad I = I_0\left(1 - e^{-Rt/L}\right)`, text: 'экстратоки размыкания и замыкания' };
  const BETA = { tex: String.raw`E\cdot2\pi r = \frac{d\Phi}{dt} = \pi r^2\frac{d\langle B\rangle}{dt}`, text: 'вихревое поле на орбите бетатрона' };

  window.TASKS.push(

  /* ===================== 25.1 ===================== */
  {
    id: '25.1', chapter: CH, section: S1, page: '358',
    title: 'Работа при перемещении провода',
    given: [[String.raw`B = 0{,}01\ \text{Тл}`, ''], [String.raw`l = 8\ \text{см}`, String.raw`0{,}08\ \text{м}`], [String.raw`I = 2\ \text{А}`, ''], [String.raw`s = 5\ \text{см}`, String.raw`0{,}05\ \text{м}`]],
    find: String.raw`A \;—\; ?`,
    formulas: [WORK],
    steps: [{ title: 'Работа (ΔΦ = Bls)', tex: String.raw`A = IBls = 2\cdot0{,}01\cdot0{,}08\cdot0{,}05 = 8\cdot10^{-5}\ \text{Дж}` }],
    answer: [String.raw`A = 80\ \text{мкДж}`],
  },

  /* ===================== 25.2 ===================== */
  {
    id: '25.2', chapter: CH, section: S1, page: '358',
    title: 'Вынести контур из поля',
    given: [[String.raw`S = 300\ \text{см}^2`, String.raw`3\cdot10^{-2}\ \text{м}^2`], [String.raw`B = 0{,}01\ \text{Тл}`, ''], [String.raw`I = 10\ \text{А}`, '']],
    find: String.raw`A \;—\; ?`,
    formulas: [WORK],
    steps: [{ title: 'Работа внешних сил', text: 'Контур в положении устойчивого равновесия; поток уменьшается от BS до 0, работу против сил поля совершают внешние силы.',
      tex: String.raw`A = IBS = 10\cdot0{,}01\cdot0{,}03 = 3\cdot10^{-3}\ \text{Дж}` }],
    answer: [String.raw`A = 3\ \text{мДж}`],
  },

  /* ===================== 25.3 ===================== */
  {
    id: '25.3', chapter: CH, section: S1, page: '358',
    title: 'Удалить квадрат из поля',
    given: [[String.raw`a = 10\ \text{см}`, String.raw`0{,}1\ \text{м}`], [String.raw`I = 20\ \text{А}`, ''], [String.raw`\alpha = 20^\circ`, ''], [String.raw`B = 0{,}1\ \text{Тл}`, '']],
    find: String.raw`A \;—\; ?`,
    formulas: [WORK],
    steps: [{ title: 'Поток через наклонный квадрат', tex: String.raw`A = IBa^2\sin\alpha = 20\cdot0{,}1\cdot0{,}01\cdot0{,}342 = 6{,}84\cdot10^{-3}\ \text{Дж}` }],
    answer: [String.raw`A = 6{,}84\ \text{мДж}`],
  },

  /* ===================== 25.4 ===================== */
  {
    id: '25.4', chapter: CH, section: S1, page: '359',
    title: 'Кольцо превратили в квадрат',
    given: [[String.raw`R = 10\ \text{см}`, String.raw`0{,}1\ \text{м}`], [String.raw`I = 100\ \text{А}`, ''], [String.raw`B = 0{,}1\ \text{Тл}`, '']],
    find: String.raw`A \;—\; ?`,
    formulas: [WORK],
    steps: [
      { title: 'Площади', text: 'Периметр квадрата 2πR, сторона πR/2.', tex: String.raw`S_\text{к} = \pi R^2,\quad S_\text{кв} = \frac{\pi^2R^2}{4}` },
      { title: 'Работа внешних сил', text: 'Поля сонаправлены, кольцо устойчиво; поток уменьшается — работу совершают внешние силы.',
        tex: String.raw`A = IB(S_\text{к} - S_\text{кв}) = \pi IBR^2\left(1 - \frac\pi4\right) = \pi\cdot100\cdot0{,}1\cdot0{,}01\cdot0{,}2146 = 6{,}74\cdot10^{-2}\ \text{Дж}` },
    ],
    answer: [String.raw`A = \pi IBR^2(1 - \pi/4) = 67{,}4\ \text{мДж}`],
    note: SMALL + 'В книге 67,5; точно 67,42.',
  },

  /* ===================== 25.5(1) ===================== */
  {
    id: '25.5(1)', chapter: CH, section: S1, page: '359',
    title: 'Повернуть виток на π/2 и на 2π',
    given: [[String.raw`I = 20\ \text{А}`, ''], [String.raw`B = 0{,}016\ \text{Тл}`, ''], [String.raw`d = 10\ \text{см}`, String.raw`S = 7{,}85\cdot10^{-3}\ \text{м}^2`]],
    find: String.raw`A \;—\; ?`,
    formulas: [WORK],
    steps: [
      { title: 'Виток установился свободно: Φ₀ = BS', tex: String.raw`A = IBS(1 - \cos\alpha)` },
      { title: 'α = π/2', tex: String.raw`A = 20\cdot0{,}016\cdot7{,}85\cdot10^{-3} = 2{,}51\cdot10^{-3}\ \text{Дж}` },
      { title: 'α = 2π', text: 'Виток вернулся в исходное положение, поток прежний.', tex: String.raw`A = 0` },
    ],
    answer: [String.raw`A_{\pi/2} = 2{,}51\ \text{мДж};\quad A_{2\pi} = 0`],
    note: '<b>Ответа в книге нет.</b> Номер 25.5 напечатан дважды; ответ в книге дан только ко второй задаче.',
  },

  /* ===================== 25.5(2) ===================== */
  {
    id: '25.5(2)', chapter: CH, section: S1, page: '359',
    title: 'Повернуть рамку на 2π/3',
    given: [[String.raw`a = 10\ \text{см}`, String.raw`0{,}1\ \text{м}`], [String.raw`I = 200\ \text{А}`, ''], [String.raw`B = 0{,}2\ \text{Тл}`, ''], [String.raw`\theta = 2\pi/3`, '']],
    find: String.raw`A \;—\; ?`,
    formulas: [WORK],
    steps: [{ title: 'Работа', tex: String.raw`A = IBa^2(1 - \cos\theta) = 200\cdot0{,}2\cdot0{,}01\cdot1{,}5 = 0{,}6\ \text{Дж}` }],
    answer: [String.raw`A = 0{,}6\ \text{Дж}`],
  },

  /* ===================== 25.6 ===================== */
  {
    id: '25.6', chapter: CH, section: S2, page: '359',
    title: 'Средняя ЭДС при исчезновении потока',
    given: [[String.raw`\Phi = 40\ \text{мВб}`, String.raw`4\cdot10^{-2}\ \text{Вб}`], [String.raw`\Delta t = 2\cdot10^{-3}\ \text{с}`, '']],
    find: String.raw`\langle\mathcal E_i\rangle \;—\; ?`,
    formulas: [FAR],
    steps: [{ title: 'ЭДС', tex: String.raw`\langle\mathcal E_i\rangle = \frac{4\cdot10^{-2}}{2\cdot10^{-3}} = 20\ \text{В}` }],
    answer: [String.raw`\langle\mathcal E_i\rangle = 20\ \text{В}`],
  },

  /* ===================== 25.7 ===================== */
  {
    id: '25.7', chapter: CH, section: S2, page: '359',
    title: 'Индукция по ЭДС движущегося провода',
    given: [[String.raw`l = 40\ \text{см}`, String.raw`0{,}4\ \text{м}`], [String.raw`v = 5\ \text{м/с}`, ''], [String.raw`U = 0{,}6\ \text{В}`, '']],
    find: String.raw`B \;—\; ?`,
    formulas: [MOVE],
    steps: [{ title: 'Цепь разомкнута: U = ℰ', tex: String.raw`B = \frac{U}{lv} = \frac{0{,}6}{0{,}4\cdot5} = 0{,}3\ \text{Тл}` }],
    answer: [String.raw`B = 0{,}3\ \text{Тл}`],
  },

  /* ===================== 25.8 ===================== */
  {
    id: '25.8', chapter: CH, section: S2, page: '359',
    title: 'Сила для равномерного движения провода',
    given: [[String.raw`B = 1\ \text{Тл}`, ''], [String.raw`l = 20\ \text{см}`, String.raw`0{,}2\ \text{м}`], [String.raw`R = 0{,}1\ \text{Ом}`, ''], [String.raw`v = 2{,}5\ \text{м/с}`, '']],
    find: String.raw`F \;—\; ?`,
    formulas: [MOVE, { tex: String.raw`F = IBl`, text: 'сила Ампера на индукционный ток' }],
    steps: [{ title: 'F уравновешивает силу Ампера', tex: String.raw`I = \frac{Blv}R,\quad F = \frac{B^2l^2v}R = \frac{1\cdot0{,}04\cdot2{,}5}{0{,}1} = 1\ \text{Н}` }],
    answer: [String.raw`F = 1\ \text{Н}`],
  },

  /* ===================== 25.9 ===================== */
  {
    id: '25.9', chapter: CH, section: S2, page: '359',
    title: 'Мощность для движения провода',
    given: [[String.raw`l = 10\ \text{см}`, String.raw`0{,}1\ \text{м}`], [String.raw`B = 1\ \text{Тл}`, ''], [String.raw`R = 0{,}4\ \text{Ом}`, ''], [String.raw`v = 20\ \text{м/с}`, '']],
    find: String.raw`P \;—\; ?`,
    formulas: [MOVE],
    steps: [{ title: 'Мощность = тепло в цепи', tex: String.raw`P = \frac{(Blv)^2}{R} = \frac{2^2}{0{,}4} = 10\ \text{Вт}` }],
    answer: [String.raw`P = 10\ \text{Вт}`],
  },

  /* ===================== 25.10 ===================== */
  {
    id: '25.10', chapter: CH, section: S2, page: '359–360',
    title: 'Провод на рельсах с источником',
    given: [[String.raw`\mathcal E = 0{,}5\ \text{В}`, ''], [String.raw`l = 20\ \text{см}`, String.raw`0{,}2\ \text{м}`], [String.raw`B = 1{,}5\ \text{Тл}`, ''], [String.raw`v = 1\ \text{м/с}`, ''], [String.raw`R = 0{,}02\ \text{Ом}`, '']],
    find: String.raw`\mathcal E_i,\ F,\ I,\ P_1,\ P_2,\ P_3 \;—\; ?`,
    formulas: [MOVE, { tex: String.raw`I = \frac{\mathcal E - \mathcal E_i}{R}`, text: 'ЭДС индукции направлена против ЭДС источника' }],
    steps: [
      { title: '1) ЭДС индукции', tex: String.raw`\mathcal E_i = Blv = 1{,}5\cdot0{,}2\cdot1 = 0{,}3\ \text{В}` },
      { title: '3) Ток', tex: String.raw`I = \frac{0{,}5 - 0{,}3}{0{,}02} = 10\ \text{А}` },
      { title: '2) Сила', tex: String.raw`F = IBl = 10\cdot1{,}5\cdot0{,}2 = 3\ \text{Н}` },
      { title: '4)–6) Мощности', tex: String.raw`P_1 = Fv = 3\ \text{Вт},\quad P_2 = I^2R = 2\ \text{Вт},\quad P_3 = \mathcal EI = 5\ \text{Вт} = P_1 + P_2` },
    ],
    answer: [String.raw`1)\ 0{,}3\ \text{В};\ 2)\ 3\ \text{Н};\ 3)\ 10\ \text{А};\ 4)\ 3\ \text{Вт};\ 5)\ 2\ \text{Вт};\ 6)\ 5\ \text{Вт}`],
  },

  /* ===================== 25.11 ===================== */
  {
    id: '25.11', chapter: CH, section: S2, page: '360',
    title: 'Вращающийся стержень',
    given: [[String.raw`B = 0{,}4\ \text{Тл}`, ''], [String.raw`l = 10\ \text{см}`, String.raw`0{,}1\ \text{м}`], [String.raw`n = 16\ \text{с}^{-1}`, '']],
    find: String.raw`U \;—\; ?`,
    formulas: [FAR],
    steps: [{ title: 'За оборот стержень заметает площадь πl²', tex: String.raw`U = B\frac{\pi l^2}{1/n} = \pi l^2Bn = \pi\cdot0{,}01\cdot0{,}4\cdot16 = 0{,}201\ \text{В}` }],
    answer: [String.raw`U = \pi l^2Bn = 201\ \text{мВ}`],
  },

  /* ===================== 25.12 ===================== */
  {
    id: '25.12', chapter: CH, section: S2, page: '360',
    title: 'Средняя ЭДС за четверть оборота',
    given: [[String.raw`S = 200\ \text{см}^2`, String.raw`2\cdot10^{-2}\ \text{м}^2`], [String.raw`n = 10\ \text{с}^{-1}`, ''], [String.raw`B = 0{,}2\ \text{Тл}`, '']],
    find: String.raw`\langle\mathcal E_i\rangle \;—\; ?`,
    formulas: [FAR],
    steps: [{ title: 'ΔΦ = BS за Δt = 1/(4n)', tex: String.raw`\langle\mathcal E_i\rangle = 4nBS = 4\cdot10\cdot0{,}2\cdot0{,}02 = 0{,}16\ \text{В}` }],
    answer: [String.raw`\langle\mathcal E_i\rangle = 0{,}16\ \text{В}`],
  },

  /* ===================== 25.13 ===================== */
  {
    id: '25.13', chapter: CH, section: S2, page: '360',
    title: 'Максимальная ЭДС рамки',
    given: [[String.raw`B = 0{,}35\ \text{Тл}`, ''], [String.raw`n = 480\ \text{мин}^{-1}`, String.raw`8\ \text{с}^{-1}`], [String.raw`N = 500`, ''], [String.raw`S = 50\ \text{см}^2`, String.raw`5\cdot10^{-3}\ \text{м}^2`]],
    find: String.raw`\mathcal E_{\max} \;—\; ?`,
    formulas: [ROT],
    steps: [{ title: 'ЭДС', tex: String.raw`\mathcal E_{\max} = 2\pi nBNS = 2\pi\cdot8\cdot0{,}35\cdot500\cdot5\cdot10^{-3} = 44\ \text{В}` }],
    answer: [String.raw`\mathcal E_{\max} = 44\ \text{В}`],
    note: MISMATCH + 'В книге 132 В — ровно в 3 раза больше. По её же формуле 2πnBNS при n = 8 с⁻¹ выходит 44 В.',
  },

  /* ===================== 25.14 ===================== */
  {
    id: '25.14', chapter: CH, section: S2, page: '360',
    title: 'Максимальная мощность генератора',
    given: [[String.raw`S = 100\ \text{см}^2`, String.raw`10^{-2}\ \text{м}^2`], [String.raw`N = 10^3`, ''], [String.raw`R_1 = 12\ \text{Ом},\ R_2 = 20\ \text{Ом}`, ''], [String.raw`B = 0{,}1\ \text{Тл},\ n = 8\ \text{с}^{-1}`, '']],
    find: String.raw`P_{\max} \;—\; ?`,
    formulas: [ROT],
    steps: [
      { title: 'Амплитуда ЭДС', tex: String.raw`\mathcal E_{\max} = 2\pi\cdot8\cdot0{,}1\cdot10^3\cdot10^{-2} = 50{,}3\ \text{В}` },
      { title: 'Мощность', tex: String.raw`P_{\max} = \frac{\mathcal E_{\max}^2}{R_1 + R_2} = \frac{2527}{32} = 79\ \text{Вт}` },
    ],
    answer: [String.raw`P_{\max} = 79\ \text{Вт}`],
  },

  /* ===================== 25.15 ===================== */
  {
    id: '25.15', chapter: CH, section: S2, page: '360',
    title: 'Частота вращения якоря',
    given: [[String.raw`B = 0{,}8\ \text{Тл}`, ''], [String.raw`N = 100`, ''], [String.raw`S = 400\ \text{см}^2`, String.raw`4\cdot10^{-2}\ \text{м}^2`], [String.raw`\mathcal E_{\max} = 200\ \text{В}`, '']],
    find: String.raw`n \;—\; ?`,
    formulas: [ROT],
    steps: [{ title: 'Частота', tex: String.raw`n = \frac{\mathcal E_{\max}}{2\pi BNS} = \frac{200}{2\pi\cdot0{,}8\cdot100\cdot0{,}04} = 9{,}95\ \text{с}^{-1} \approx 600\ \text{мин}^{-1}` }],
    answer: [String.raw`n \approx 600\ \text{мин}^{-1}`],
  },

  /* ===================== 25.16 ===================== */
  {
    id: '25.16', chapter: CH, section: S2, page: '360–361',
    title: 'Мгновенная ЭДС катушки',
    given: [[String.raw`N = 1000`, ''], [String.raw`B = 0{,}04\ \text{Тл}`, ''], [String.raw`\omega = 5\ \text{рад/с}`, ''], [String.raw`\alpha = 60^\circ`, ''], [String.raw`S = 100\ \text{см}^2`, String.raw`10^{-2}\ \text{м}^2`]],
    find: String.raw`\mathcal E_i \;—\; ?`,
    formulas: [ROT],
    steps: [{ title: 'Угол нормали с полем 90° − α', tex: String.raw`\mathcal E_i = \omega BNS\sin(90^\circ - \alpha) = \omega BNS\cos\alpha = 5\cdot0{,}04\cdot1000\cdot0{,}01\cdot0{,}5 = 1\ \text{В}` }],
    answer: [String.raw`\mathcal E_i = 1\ \text{В}`],
  },

  /* ===================== 25.17 ===================== */
  {
    id: '25.17', chapter: CH, section: S3, page: '361',
    title: 'Поле исчезло',
    given: [[String.raw`r = 4\ \text{см}`, String.raw`0{,}04\ \text{м}`], [String.raw`R = 0{,}01\ \text{Ом}`, ''], [String.raw`B = 0{,}04\ \text{Тл}`, ''], [String.raw`\alpha = 30^\circ`, '']],
    find: String.raw`Q \;—\; ?`,
    formulas: [QIND],
    steps: [{ title: 'Заряд', tex: String.raw`Q = \frac{B\pi r^2\sin\alpha}{R} = \frac{0{,}04\cdot\pi\cdot0{,}0016\cdot0{,}5}{0{,}01} = 1{,}0\cdot10^{-2}\ \text{Кл}` }],
    answer: [String.raw`Q = 10\ \text{мКл}`],
  },

  /* ===================== 25.18 ===================== */
  {
    id: '25.18', chapter: CH, section: S3, page: '361',
    title: 'Перевернули кольцо на столе',
    given: [[String.raw`r = 10\ \text{см}`, String.raw`0{,}1\ \text{м}`], [String.raw`R = 1\ \text{Ом}`, ''], [String.raw`B_\text{в} = 50\ \text{мкТл}`, String.raw`5\cdot10^{-5}\ \text{Тл}`]],
    find: String.raw`Q \;—\; ?`,
    formulas: [QIND],
    steps: [{ title: 'Поток меняет знак: ΔΦ = 2BS', tex: String.raw`Q = \frac{2B\pi r^2}{R} = 2\cdot5\cdot10^{-5}\cdot0{,}0314 = 3{,}14\cdot10^{-6}\ \text{Кл}` }],
    answer: [String.raw`Q = 3{,}14\ \text{мкКл}`],
  },

  /* ===================== 25.19 ===================== */
  {
    id: '25.19', chapter: CH, section: S3, page: '361',
    title: 'Поток магнита по баллистическому гальванометру',
    given: [[String.raw`Q = 10\ \text{мкКл}`, String.raw`10^{-5}\ \text{Кл}`], [String.raw`R = 30\ \text{Ом}`, '']],
    find: String.raw`\Phi \;—\; ?`,
    formulas: [QIND],
    steps: [{ title: 'Поток', tex: String.raw`\Phi = QR = 10^{-5}\cdot30 = 3\cdot10^{-4}\ \text{Вб}` }],
    answer: [String.raw`\Phi = 0{,}3\ \text{мВб}`],
  },

  /* ===================== 25.20 ===================== */
  {
    id: '25.20', chapter: CH, section: S3, page: '361',
    title: 'Индукция электромагнита',
    given: [[String.raw`R_1 = 4\ \text{Ом},\ R_2 = 46\ \text{Ом}`, ''], [String.raw`N = 15`, ''], [String.raw`S = 2\ \text{см}^2`, String.raw`2\cdot10^{-4}\ \text{м}^2`], [String.raw`Q = 90\ \text{мкКл}`, String.raw`9\cdot10^{-5}\ \text{Кл}`]],
    find: String.raw`B \;—\; ?`,
    formulas: [QIND],
    steps: [{ title: 'Индукция', tex: String.raw`B = \frac{Q(R_1 + R_2)}{NS} = \frac{9\cdot10^{-5}\cdot50}{15\cdot2\cdot10^{-4}} = 1{,}5\ \text{Тл}` }],
    answer: [String.raw`B = 1{,}5\ \text{Тл}`],
  },

  /* ===================== 25.21 ===================== */
  {
    id: '25.21', chapter: CH, section: S3, page: '361',
    title: 'Заряд при повороте рамки на 30°',
    given: [[String.raw`R = 0{,}01\ \text{Ом}`, ''], [String.raw`B = 0{,}05\ \text{Тл}`, ''], [String.raw`S = 100\ \text{см}^2`, String.raw`10^{-2}\ \text{м}^2`]],
    find: String.raw`Q_1,\ Q_2,\ Q_3 \;—\; ?`,
    formulas: [QIND],
    steps: [
      { title: 'Поток (α — угол между нормалью и B)', tex: String.raw`\Phi = BS\cos\alpha,\quad \frac{BS}{R} = 0{,}05\ \text{Кл}` },
      { title: '1) 0° → 30°', tex: String.raw`Q_1 = 0{,}05(1 - 0{,}866) = 6{,}7\cdot10^{-3}\ \text{Кл}` },
      { title: '2) 30° → 60°', tex: String.raw`Q_2 = 0{,}05(0{,}866 - 0{,}5) = 18\cdot10^{-3}\ \text{Кл}` },
      { title: '3) 60° → 90°', tex: String.raw`Q_3 = 0{,}05(0{,}5 - 0) = 25\cdot10^{-3}\ \text{Кл}` },
    ],
    answer: [String.raw`1)\ 6{,}7\ \text{мКл};\quad 2)\ 18\ \text{мКл};\quad 3)\ 25\ \text{мКл}`],
    note: '<b>Про условие.</b> В третьем случае конечный угол не напечатан. По ответу книги это поворот от 60° до 90°.',
  },

  /* ===================== 25.22 ===================== */
  {
    id: '25.22', chapter: CH, section: S3, page: '361',
    title: 'Квадрат вытянули в линию',
    given: [[String.raw`m = 1\ \text{г}`, String.raw`10^{-3}\ \text{кг}`], [String.raw`B = 0{,}1\ \text{Тл}`, ''], [String.raw`\rho = 17\ \text{нОм·м},\ D = 8{,}93\cdot10^3\ \text{кг/м}^3`, '']],
    find: String.raw`Q \;—\; ?`,
    formulas: [QIND],
    steps: [
      { title: 'Через длину провода L и сечение s', tex: String.raw`\Delta\Phi = B\frac{L^2}{16},\quad R = \rho\frac Ls,\quad m = DLs\ \Rightarrow\ R = \frac{\rho DL^2}{m}` },
      { title: 'Заряд (L сокращается)', tex: String.raw`Q = \frac{mB}{16\rho D} = \frac{10^{-3}\cdot0{,}1}{16\cdot1{,}7\cdot10^{-8}\cdot8{,}93\cdot10^3} = 4{,}12\cdot10^{-2}\ \text{Кл}` },
    ],
    answer: [String.raw`Q = \frac{mB}{16\rho D} = 41{,}2\ \text{мКл}`],
    note: SMALL + 'В книге 41,4 мКл (видимо, взята D = 8,9·10³ кг/м³). В формуле книги «mB/16 ρD» множитель ρD стоит в знаменателе.',
  },

  /* ===================== 25.23 ===================== */
  {
    id: '25.23', chapter: CH, section: S3, page: '361–362',
    title: 'Кольцо у провода: ток выключили',
    given: [[String.raw`a = 1\ \text{м}`, ''], [String.raw`I = 1\ \text{кА}`, String.raw`10^3\ \text{А}`], [String.raw`r = 1\ \text{см}`, String.raw`10^{-2}\ \text{м}`], [String.raw`R = 10\ \text{Ом}`, '']],
    find: String.raw`Q \;—\; ?`,
    formulas: [QIND, { tex: String.raw`B = \frac{\mu_0I}{2\pi a}`, text: 'поле провода в месте кольца' }],
    steps: [{ title: 'Заряд', tex: String.raw`Q = \frac{\mu_0I}{2\pi a}\cdot\frac{\pi r^2}{R} = \frac{\mu_0Ir^2}{2aR} = \frac{1{,}257\cdot10^{-6}\cdot10^3\cdot10^{-4}}{20} = 6{,}28\cdot10^{-9}\ \text{Кл}` }],
    answer: [String.raw`Q = \frac{\mu_0Ir^2}{2aR} = 6{,}28\ \text{нКл}`],
    note: MISMATCH + 'В книге 62,8 мкКл — в 10⁴ раз больше. По её же формуле: 4π·10⁻⁷·10³·10⁻⁴/(2·1·10) = 6,28·10⁻⁹ Кл.',
  },

  /* ===================== 25.24 ===================== */
  {
    id: '25.24', chapter: CH, section: S3, page: '362',
    title: 'Ток провода по заряду через рамку',
    given: [[String.raw`R = 0{,}02\ \text{Ом}`, ''], [String.raw`a_1 = 10\ \text{см},\ a_2 = 20\ \text{см}`, ''], [String.raw`Q = 693\ \text{мкКл}`, String.raw`6{,}93\cdot10^{-4}\ \text{Кл}`]],
    find: String.raw`I \;—\; ?`,
    formulas: [QIND],
    steps: [
      { title: 'Поток через рамку со стороной a₂ − a₁ (см. 24.9)', tex: String.raw`\Phi = \frac{\mu_0I(a_2 - a_1)}{2\pi}\ln\frac{a_2}{a_1}` },
      { title: 'Ток', tex: String.raw`I = \frac{2\pi RQ}{\mu_0(a_2 - a_1)\ln(a_2/a_1)} = \frac{2\pi\cdot0{,}02\cdot6{,}93\cdot10^{-4}}{1{,}257\cdot10^{-6}\cdot0{,}1\cdot0{,}693} = 10^3\ \text{А}` },
    ],
    answer: [String.raw`I = 1\ \text{кА}`],
  },

  /* ===================== 25.25 ===================== */
  {
    id: '25.25', chapter: CH, section: S4, page: '362',
    title: 'ЭДС самоиндукции при размыкании',
    given: [[String.raw`L = 3\cdot10^{-5}\ \text{Гн}`, ''], [String.raw`I = 0{,}6\ \text{А}`, ''], [String.raw`\Delta t = 1{,}2\cdot10^{-4}\ \text{с}`, '']],
    find: String.raw`\langle\mathcal E_s\rangle \;—\; ?`,
    formulas: [SELF],
    steps: [{ title: 'ЭДС', tex: String.raw`\langle\mathcal E_s\rangle = \frac{L\Delta I}{\Delta t} = \frac{3\cdot10^{-5}\cdot0{,}6}{1{,}2\cdot10^{-4}} = 0{,}15\ \text{В}` }],
    answer: [String.raw`\langle\mathcal E_s\rangle = 0{,}15\ \text{В}`],
  },

  /* ===================== 25.26 ===================== */
  {
    id: '25.26', chapter: CH, section: S4, page: '362',
    title: 'Равномерное нарастание тока',
    given: [[String.raw`\Delta I/\Delta t = 0{,}1\ \text{А/с}`, ''], [String.raw`L = 0{,}01\ \text{Гн}`, '']],
    find: String.raw`\langle\mathcal E_s\rangle \;—\; ?`,
    formulas: [SELF],
    steps: [{ title: 'ЭДС', tex: String.raw`\langle\mathcal E_s\rangle = 0{,}01\cdot0{,}1 = 10^{-3}\ \text{В}` }],
    answer: [String.raw`\langle\mathcal E_s\rangle = 1\ \text{мВ}`],
  },

  /* ===================== 25.27 ===================== */
  {
    id: '25.27', chapter: CH, section: S4, page: '362',
    title: 'Синусоидальный ток в катушке',
    given: [[String.raw`L = 2\ \text{мГн}`, String.raw`2\cdot10^{-3}\ \text{Гн}`], [String.raw`\nu = 50\ \text{Гц}`, ''], [String.raw`I_0 = 10\ \text{А}`, '']],
    find: String.raw`\langle\mathcal E_s\rangle \;—\; ?`,
    formulas: [SELF],
    steps: [{ title: 'От −I₀ до +I₀ за полпериода', tex: String.raw`\langle\mathcal E_s\rangle = \frac{L\cdot2I_0}{1/(2\nu)} = 4L\nu I_0 = 4\cdot2\cdot10^{-3}\cdot50\cdot10 = 4\ \text{В}` }],
    answer: [String.raw`\langle\mathcal E_s\rangle = 4\ \text{В}`],
  },

  /* ===================== 25.28 ===================== */
  {
    id: '25.28', chapter: CH, section: S4, page: '362',
    title: 'Заряд экстратока размыкания',
    given: [[String.raw`R_1 = 0{,}5\ \text{Ом},\ L = 4\cdot10^{-3}\ \text{Гн}`, ''], [String.raw`R_2 = 2{,}5\ \text{Ом}`, ''], [String.raw`I = 1\ \text{А}`, '']],
    find: String.raw`Q \;—\; ?`,
    formulas: [SELF, QIND],
    steps: [
      { title: 'После размыкания', text: 'Ток катушки затухает через контур «катушка + R₂».', tex: String.raw`Q = \frac{\Delta\Psi}{R_1 + R_2} = \frac{LI_L}{R_1 + R_2}` },
      { title: 'Ток катушки I_L = 1 А (как в ответе книги)', tex: String.raw`Q = \frac{4\cdot10^{-3}\cdot1}{3} = 1{,}33\cdot10^{-3}\ \text{Кл}` },
      { title: 'Если 1 А — ток в R₂, как сказано в условии', text: 'Тогда напряжение на ветвях 2,5 В и ток катушки 2,5/0,5 = 5 А.', tex: String.raw`Q = \frac{4\cdot10^{-3}\cdot5}{3} = 6{,}67\cdot10^{-3}\ \text{Кл}` },
    ],
    answer: [String.raw`Q = \frac{LI}{R_1 + R_2} = 1{,}33\ \text{мКл}\ (\text{при токе катушки 1 А})`],
    note: '<b>Неоднозначность условия.</b> Книга подставляет I = 1 А как ток катушки. По тексту условия 1 А течёт по проводу R₂; тогда ток катушки 5 А и Q = 6,67 мКл.',
  },

  /* ===================== 25.29 ===================== */
  {
    id: '25.29', chapter: CH, section: S4, page: '362',
    title: 'Индуктивность плотно намотанного соленоида',
    given: [[String.raw`l = 50\ \text{см}`, String.raw`0{,}5\ \text{м}`], [String.raw`S = 4\ \text{см}^2`, String.raw`4\cdot10^{-4}\ \text{м}^2`], [String.raw`d = 0{,}2\ \text{мм}`, String.raw`2\cdot10^{-4}\ \text{м}`]],
    find: String.raw`L \;—\; ?`,
    formulas: [LSOL],
    steps: [
      { title: 'Число витков', tex: String.raw`N = \frac ld = 2500` },
      { title: 'Индуктивность', tex: String.raw`L = \frac{\mu_0N^2S}{l} = \frac{1{,}257\cdot10^{-6}\cdot6{,}25\cdot10^6\cdot4\cdot10^{-4}}{0{,}5} = 6{,}28\cdot10^{-3}\ \text{Гн}` },
    ],
    answer: [String.raw`L = 6{,}28\ \text{мГн}`],
    note: TYPO + 'В книге «6,28 Гн» — пропущена приставка: должно быть 6,28 мГн.',
  },

  /* ===================== 25.30 ===================== */
  {
    id: '25.30', chapter: CH, section: S4, page: '362',
    title: 'Число витков на сантиметр',
    given: [[String.raw`l = 1\ \text{м}`, ''], [String.raw`L = 1{,}6\cdot10^{-3}\ \text{Гн}`, ''], [String.raw`S = 20\ \text{см}^2`, String.raw`2\cdot10^{-3}\ \text{м}^2`]],
    find: String.raw`n \;—\; ?`,
    formulas: [LSOL],
    steps: [{ title: 'Плотность намотки', tex: String.raw`n = \sqrt{\frac{L}{\mu_0Sl}} = \sqrt{\frac{1{,}6\cdot10^{-3}}{1{,}257\cdot10^{-6}\cdot2\cdot10^{-3}}} = 798\ \text{м}^{-1} \approx 8\ \text{см}^{-1}` }],
    answer: [String.raw`n = 8\ \text{витков на 1 см}`],
  },

  /* ===================== 25.31 ===================== */
  {
    id: '25.31', chapter: CH, section: S4, page: '363',
    title: 'Сколько витков для 1 мГн',
    given: [[String.raw`d = 0{,}4\ \text{мм}`, String.raw`4\cdot10^{-4}\ \text{м}`], [String.raw`D = 2\ \text{см}`, String.raw`S = \pi D^2/4 = 3{,}14\cdot10^{-4}\ \text{м}^2`], [String.raw`L = 1\ \text{мГн}`, String.raw`10^{-3}\ \text{Гн}`]],
    find: String.raw`N \;—\; ?`,
    formulas: [LSOL],
    steps: [
      { title: 'Длина катушки l = Nd', tex: String.raw`L = \frac{\mu_0N^2S}{Nd} = \frac{\mu_0NS}{d}` },
      { title: 'Число витков', tex: String.raw`N = \frac{Ld}{\mu_0S} = \frac{10^{-3}\cdot4\cdot10^{-4}}{1{,}257\cdot10^{-6}\cdot3{,}14\cdot10^{-4}} = 1013 \approx 10^3` },
    ],
    answer: [String.raw`N \approx 10^3`],
  },

  /* ===================== 25.32 ===================== */
  {
    id: '25.32', chapter: CH, section: S4, page: '363',
    title: 'Перемотка катушки',
    given: [[String.raw`N_1 = 750`, ''], [String.raw`L_1 = 2{,}5\cdot10^{-2}\ \text{Гн}`, ''], [String.raw`L_2 = 3{,}6\cdot10^{-2}\ \text{Гн}`, '']],
    find: String.raw`N_2 \;—\; ?`,
    formulas: [LSOL],
    steps: [{ title: 'L ∝ N² (l и S прежние)', tex: String.raw`N_2 = N_1\sqrt{\frac{L_2}{L_1}} = 750\cdot1{,}2 = 900` }],
    answer: [String.raw`N_2 = 900`],
    note: TYPO + 'В книге 90 — потерян ноль: 750·√(3,6/2,5) = 900.',
  },

  /* ===================== 25.33 ===================== */
  {
    id: '25.33', chapter: CH, section: S4, page: '363',
    title: 'Индуктивность двухпроводной линии',
    given: [[String.raw`l = 1\ \text{км}`, String.raw`10^3\ \text{м}`], [String.raw`R = 1\ \text{мм}`, String.raw`10^{-3}\ \text{м}`], [String.raw`d = 0{,}4\ \text{м}`, '']],
    find: String.raw`L \;—\; ?`,
    formulas: [SELF, { tex: String.raw`B = \frac{\mu_0I}{2\pi x} + \frac{\mu_0I}{2\pi(d - x)}`, text: 'поле двух проводов между ними' }],
    steps: [
      { title: 'Поток между проводами', tex: String.raw`\Phi = l\int_R^{d - R}B\,dx = \frac{\mu_0Il}{\pi}\ln\frac{d - R}{R}` },
      { title: 'Индуктивность', tex: String.raw`L = \frac\Phi I = 4\cdot10^{-7}\cdot10^3\cdot\ln399 = 4\cdot10^{-4}\cdot5{,}99 = 2{,}4\cdot10^{-3}\ \text{Гн}` },
    ],
    answer: [String.raw`L = \frac{\mu_0l}{\pi}\ln\frac{d - R}{R} = 2{,}4\ \text{мГн}`],
  },

  /* ===================== 25.34 ===================== */
  {
    id: '25.34', chapter: CH, section: S4, page: '363',
    title: 'Поток соленоида по индуктивности',
    given: [[String.raw`L = 4\cdot10^{-3}\ \text{Гн}`, ''], [String.raw`N = 600`, ''], [String.raw`I = 12\ \text{А}`, '']],
    find: String.raw`\Phi \;—\; ?`,
    formulas: [SELF],
    steps: [{ title: 'Поток', tex: String.raw`\Phi = \frac{LI}N = \frac{4\cdot10^{-3}\cdot12}{600} = 8\cdot10^{-5}\ \text{Вб}` }],
    answer: [String.raw`\Phi = 80\ \text{мкВб}`],
  },

  /* ===================== 25.35 ===================== */
  {
    id: '25.35', chapter: CH, section: S4, page: '363',
    title: 'Потокосцепление катушки',
    given: [[String.raw`L = 0{,}02\ \text{Гн}`, ''], [String.raw`I = 5\ \text{А}`, '']],
    find: String.raw`\Psi \;—\; ?`,
    formulas: [SELF],
    steps: [{ title: 'Потокосцепление', tex: String.raw`\Psi = LI = 0{,}02\cdot5 = 0{,}1\ \text{Вб}` }],
    answer: [String.raw`\Psi = 0{,}1\ \text{Вб}`],
  },

  /* ===================== 25.36 ===================== */
  {
    id: '25.36', chapter: CH, section: S4, page: '363',
    title: 'Поток и потокосцепление',
    given: [[String.raw`N = 1000`, ''], [String.raw`L = 3\cdot10^{-3}\ \text{Гн}`, ''], [String.raw`I = 1\ \text{А}`, '']],
    find: String.raw`\Phi,\ \Psi \;—\; ?`,
    formulas: [SELF],
    steps: [{ title: 'Расчёт', tex: String.raw`\Psi = LI = 3\cdot10^{-3}\ \text{Вб},\quad \Phi = \frac\Psi N = 3\cdot10^{-6}\ \text{Вб}` }],
    answer: [String.raw`\Phi = 3\ \text{мкВб};\quad \Psi = 3\ \text{мВб}`],
  },

  /* ===================== 25.37 ===================== */
  {
    id: '25.37', chapter: CH, section: S4, page: '363',
    title: 'Индуктивность по индукции поля',
    given: [[String.raw`S = 5\ \text{см}^2`, String.raw`5\cdot10^{-4}\ \text{м}^2`], [String.raw`N = 1200`, ''], [String.raw`B = 0{,}01\ \text{Тл},\ I = 2\ \text{А}`, '']],
    find: String.raw`L \;—\; ?`,
    formulas: [SELF],
    steps: [{ title: 'Индуктивность', tex: String.raw`L = \frac{NBS}{I} = \frac{1200\cdot0{,}01\cdot5\cdot10^{-4}}{2} = 3\cdot10^{-3}\ \text{Гн}` }],
    answer: [String.raw`L = 3\ \text{мГн}`],
  },

  /* ===================== 25.38 ===================== */
  {
    id: '25.38', chapter: CH, section: S4, page: '363',
    title: 'ЭДС при выключении тока',
    given: [[String.raw`N = 1000`, ''], [String.raw`S = 10\ \text{см}^2`, String.raw`10^{-3}\ \text{м}^2`], [String.raw`B = 1{,}5\ \text{Тл}`, ''], [String.raw`t = 500\ \text{мкс}`, String.raw`5\cdot10^{-4}\ \text{с}`]],
    find: String.raw`\langle\mathcal E_i\rangle \;—\; ?`,
    formulas: [FAR],
    steps: [{ title: 'ЭДС', tex: String.raw`\langle\mathcal E_i\rangle = \frac{NBS}t = \frac{1000\cdot1{,}5\cdot10^{-3}}{5\cdot10^{-4}} = 3\cdot10^3\ \text{В}` }],
    answer: [String.raw`\langle\mathcal E_i\rangle = 3\ \text{кВ}`],
  },

  /* ===================== 25.39 ===================== */
  {
    id: '25.39', chapter: CH, section: S4, page: '363',
    title: 'Индуктивность соленоида с железом',
    given: [[String.raw`N = 500`, ''], [String.raw`l = 50\ \text{см}`, String.raw`0{,}5\ \text{м}`], [String.raw`I_1 = 0{,}1\ \text{А},\ I_2 = 1\ \text{А}`, '']],
    find: String.raw`L_2/L_1 \;—\; ?`,
    formulas: [LSOL, { tex: String.raw`\mu = \frac{B}{\mu_0H}`, text: 'проницаемость по графику рис. 24.1' }],
    steps: [
      { title: 'Напряжённости', tex: String.raw`H_1 = \frac{NI_1}l = 100\ \text{А/м},\quad H_2 = 1000\ \text{А/м}` },
      { title: 'Проницаемости', tex: String.raw`\mu_2 = \frac{1{,}29}{\mu_0\cdot1000} = 1030;\quad \mu_1 \approx 6\cdot10^3\ (B_1 \approx 0{,}75\ \text{Тл})` },
      { title: 'L ∝ μ', tex: String.raw`\frac{L_2}{L_1} = \frac{\mu_2}{\mu_1} \approx \frac1{5{,}8}` },
    ],
    answer: [String.raw`L\ \text{уменьшится примерно в 5,8 раза}`],
    note: GRAPH + 'H₁ = 100 А/м лежит левее начала графика рис. 24.1, который начинается с 200 А/м. Ответ книги 5,8 соответствует B₁ ≈ 0,75 Тл, то есть продолжению кривой железа влево; проверить это по графику нельзя.',
  },

  /* ===================== 25.40 ===================== */
  {
    id: '25.40', chapter: CH, section: S4, page: '363–364',
    title: 'Коэффициент взаимной индукции',
    given: [[String.raw`\Delta I/\Delta t = 5\ \text{А/с}`, ''], [String.raw`\mathcal E_i = 0{,}1\ \text{В}`, '']],
    find: String.raw`M \;—\; ?`,
    formulas: [MUT],
    steps: [{ title: 'Взаимная индуктивность', tex: String.raw`M = \frac{\mathcal E_i}{\Delta I/\Delta t} = \frac{0{,}1}{5} = 0{,}02\ \text{Гн}` }],
    answer: [String.raw`M = 20\ \text{мГн}`],
  },

  /* ===================== 25.41 ===================== */
  {
    id: '25.41', chapter: CH, section: S4, page: '364',
    title: 'ЭДС во вторичной обмотке тороида',
    given: [[String.raw`N_1 = 251,\ N_2 = 100`, ''], [String.raw`\langle D\rangle = 8\ \text{см},\ d = 2\ \text{см}`, ''], [String.raw`t = 1\ \text{мс},\ I = 3\ \text{А}`, '']],
    find: String.raw`\langle\mathcal E_2\rangle \;—\; ?`,
    formulas: [MUT],
    steps: [
      { title: 'Поток в тороиде', tex: String.raw`\Phi = \frac{\mu_0N_1I}{\pi\langle D\rangle}\cdot\frac{\pi d^2}{4}\ \Rightarrow\ M = \frac{\mu_0N_1N_2d^2}{4\langle D\rangle} = 3{,}94\cdot10^{-5}\ \text{Гн}` },
      { title: 'ЭДС', tex: String.raw`\langle\mathcal E_2\rangle = \frac{MI}{t} = \frac{3{,}94\cdot10^{-5}\cdot3}{10^{-3}} = 0{,}118\ \text{В}` },
    ],
    answer: [String.raw`\langle\mathcal E_2\rangle = 118\ \text{мВ}`],
  },

  /* ===================== 25.42 ===================== */
  {
    id: '25.42', chapter: CH, section: S5, page: '364',
    title: 'Ток через 0,01 с после отключения',
    given: [[String.raw`I_0 = 50\ \text{А}`, ''], [String.raw`t = 0{,}01\ \text{с}`, ''], [String.raw`R = 20\ \text{Ом},\ L = 0{,}1\ \text{Гн}`, '']],
    find: String.raw`I \;—\; ?`,
    formulas: [EXTRA],
    steps: [{ title: 'Затухание', tex: String.raw`I = 50e^{-20\cdot0{,}01/0{,}1} = 50e^{-2} = 6{,}77\ \text{А}` }],
    answer: [String.raw`I = 6{,}77\ \text{А}`],
    note: SMALL + 'В книге 6,75; точно 50·e⁻² = 6,767.',
  },

  /* ===================== 25.43 ===================== */
  {
    id: '25.43', chapter: CH, section: S5, page: '364',
    title: 'Ток достигнет 0,9 предельного',
    given: [[String.raw`R = 10\ \text{Ом},\ L = 1\ \text{Гн}`, ''], [String.raw`I/I_0 = 0{,}9`, '']],
    find: String.raw`t \;—\; ?`,
    formulas: [EXTRA],
    steps: [{ title: 'Время', tex: String.raw`1 - e^{-Rt/L} = 0{,}9\ \Rightarrow\ t = \frac LR\ln10 = 0{,}1\cdot2{,}303 = 0{,}23\ \text{с}` }],
    answer: [String.raw`t = 0{,}23\ \text{с}`],
  },

  /* ===================== 25.44 ===================== */
  {
    id: '25.44', chapter: CH, section: S5, page: '364',
    title: 'Ток уменьшится в 1000 раз',
    given: [[String.raw`L = 1\ \text{Гн},\ R = 10\ \text{Ом}`, ''], [String.raw`I/I_0 = 0{,}001`, '']],
    find: String.raw`t \;—\; ?`,
    formulas: [EXTRA],
    steps: [{ title: 'Время', tex: String.raw`t = \frac LR\ln1000 = 0{,}1\cdot6{,}91 = 0{,}69\ \text{с}` }],
    answer: [String.raw`t = 0{,}69\ \text{с}`],
  },

  /* ===================== 25.45 ===================== */
  {
    id: '25.45', chapter: CH, section: S5, page: '364',
    title: 'Ток отличается от максимального на 1 %',
    given: [[String.raw`R_i = 2\ \text{Ом}`, ''], [String.raw`L = 0{,}5\ \text{Гн},\ R = 8\ \text{Ом}`, '']],
    find: String.raw`t \;—\; ?`,
    formulas: [EXTRA],
    steps: [{ title: 'Полное сопротивление R + Rᵢ', tex: String.raw`e^{-(R + R_i)t/L} = 0{,}01\ \Rightarrow\ t = \frac{L\ln100}{R + R_i} = \frac{0{,}5\cdot4{,}605}{10} = 0{,}23\ \text{с}` }],
    answer: [String.raw`t = 0{,}23\ \text{с}`],
  },

  /* ===================== 25.46 ===================== */
  {
    id: '25.46', chapter: CH, section: S5, page: '364', bookFig: '25.2',
    title: 'Ток в резисторе при размыкании',
    given: [[String.raw`R_1 = 5\ \text{Ом},\ R_2 = 95\ \text{Ом}`, ''], [String.raw`L = 0{,}34\ \text{Гн}`, ''], [String.raw`\mathcal E = 38\ \text{В}`, ''], [String.raw`t_2 = 0{,}01\ \text{с}`, '']],
    find: String.raw`I_2 \;—\; ?`,
    formulas: [EXTRA],
    steps: [
      { title: '1) До размыкания (ветви параллельны источнику)', tex: String.raw`I_2 = \frac{\mathcal E}{R_2} = 0{,}4\ \text{А},\quad I_L = \frac{\mathcal E}{R_1} = 7{,}6\ \text{А}` },
      { title: '2) В момент размыкания', text: 'Ток катушки мгновенно измениться не может и замыкается через R₂ (в обратном направлении).', tex: String.raw`I_2 = 7{,}6\ \text{А}` },
      { title: '3) Через 0,01 с', tex: String.raw`I_2 = 7{,}6e^{-(R_1 + R_2)t/L} = 7{,}6e^{-2{,}94} = 0{,}40\ \text{А}` },
    ],
    answer: [String.raw`1)\ 0{,}4\ \text{А};\quad 2)\ 7{,}6\ \text{А};\quad 3)\ 0{,}4\ \text{А}`],
    note: '<b>Про рисунок.</b> В условии книга ссылается на рис. 25.1, по смыслу — рис. 25.2 (схема задачи 25.28).',
  },

  /* ===================== 25.47 ===================== */
  {
    id: '25.47', chapter: CH, section: S6, page: '364',
    title: 'Число оборотов в бетатроне',
    given: [[String.raw`T = 60\ \text{МэВ}`, ''], [String.raw`\langle d\Phi/dt\rangle = 50\ \text{Вб/с}`, ''], [String.raw`r = 20\ \text{см}`, String.raw`0{,}2\ \text{м}`]],
    find: String.raw`N,\ l \;—\; ?`,
    formulas: [BETA],
    steps: [
      { title: 'Энергия за оборот', tex: String.raw`\Delta T = e\frac{d\Phi}{dt} = 50\ \text{эВ}` },
      { title: '1) Обороты', tex: String.raw`N = \frac{60\cdot10^6}{50} = 1{,}2\cdot10^6` },
      { title: '2) Путь', tex: String.raw`l = 2\pi rN = 2\pi\cdot0{,}2\cdot1{,}2\cdot10^6 = 1{,}51\cdot10^6\ \text{м}` },
      { title: 'Время ускорения (v ≈ c)', tex: String.raw`t = \frac lc = 5{,}03\cdot10^{-3}\ \text{с}` },
    ],
    answer: [String.raw`1)\ N = 1{,}2\cdot10^6;\quad 2)\ l = 1{,}51\ \text{Мм}\ (t \approx 5{,}03\ \text{мс})`],
  },

  /* ===================== 25.48 ===================== */
  {
    id: '25.48', chapter: CH, section: S6, page: '364–365',
    title: 'Вихревое поле в бетатроне',
    given: [[String.raw`d\langle B\rangle/dt = 60\ \text{Тл/с}`, ''], [String.raw`r = 0{,}5\ \text{м}`, '']],
    find: String.raw`E,\ F \;—\; ?`,
    formulas: [BETA],
    steps: [
      { title: '1) Напряжённость', tex: String.raw`E = \frac r2\frac{d\langle B\rangle}{dt} = 0{,}25\cdot60 = 15\ \text{В/м}` },
      { title: '2) Сила', tex: String.raw`F = eE = 1{,}6\cdot10^{-19}\cdot15 = 2{,}4\cdot10^{-18}\ \text{Н}` },
    ],
    answer: [String.raw`1)\ E = 15\ \text{В/м};\quad 2)\ F = 2{,}4\ \text{аН}`],
    note: MISMATCH + 'В книге 12 В/м и 1,92 аН. Эти числа получаются при r = 0,4 м (радиус из следующей задачи 25.49). При r = 0,5 м — 15 В/м и 2,4 аН.',
  },

  /* ===================== 25.49 ===================== */
  {
    id: '25.49', chapter: CH, section: S6, page: '365',
    title: 'Скорость изменения индукции в бетатроне',
    given: [[String.raw`r = 0{,}4\ \text{м}`, ''], [String.raw`\Delta T = 20\ \text{эВ}\ \text{за оборот}`, '']],
    find: String.raw`d\langle B\rangle/dt \;—\; ?`,
    formulas: [BETA],
    steps: [{ title: 'Энергия за оборот = e·dΦ/dt', tex: String.raw`\frac{d\langle B\rangle}{dt} = \frac{\Delta T/e}{\pi r^2} = \frac{20}{\pi\cdot0{,}16} = 39{,}8\ \text{Тл/с}` }],
    answer: [String.raw`d\langle B\rangle/dt \approx 40\ \text{Тл/с}`],
  }

  );
})();
