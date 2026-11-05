/*
  § 23. Сила, действующая на заряд, движущийся в магнитном поле — задачи 23.1–23.40 (стр. 339–343).
  Условия задач показываются дословно из книги (data/book-tasks.js).
  Ответы пересчитаны скриптом tools/check_sila_lorentsa.py и сверены с book/99-otvety.md.
  Массы и энергии покоя частиц — табл. 22: mₑ = 9,11·10⁻³¹ кг, mₚ = 1,67·10⁻²⁷ кг, m_d = 3,35·10⁻²⁷ кг, m_α = 6,64·10⁻²⁷ кг.
*/
(function () {
  const CH = 'Гл. 5. Электромагнетизм';
  const S1 = 'Сила Лоренца';
  const S2 = 'Движение заряженных частиц в совместных магнитном и электрическом полях';
  const MISMATCH = '<b>Расхождение с ответом книги.</b> ';
  const SMALL = '<b>Расхождение в последней цифре.</b> ';
  const TYPO = '<b>Опечатка в ответе книги.</b> ';

  const FL = { tex: String.raw`F = |Q|vB\sin\alpha`, text: 'сила Лоренца; α — угол между v и B' };
  const RAD = { tex: String.raw`R = \frac{mv}{|Q|B} = \frac{p}{|Q|B}`, text: 'радиус окружности (v ⟂ B): сила Лоренца — центростремительная' };
  const PER = { tex: String.raw`T = \frac{2\pi m}{|Q|B}`, text: 'период обращения — не зависит от скорости' };
  const ACC = { tex: String.raw`|Q|U = \frac{mv^2}{2}`, text: 'разгон ускоряющей разностью потенциалов' };
  const HEL = { tex: String.raw`R = \frac{mv\sin\alpha}{|Q|B},\quad h = v\cos\alpha\cdot T = \frac{2\pi mv\cos\alpha}{|Q|B}`, text: 'винтовая линия: радиус и шаг' };
  const REL = { tex: String.raw`p = |Q|BR,\quad T = \sqrt{(pc)^2 + E_0^2} - E_0`, text: 'релятивистская частица: связь импульса и кинетической энергии' };
  const BH = { tex: String.raw`B = \mu_0H`, text: 'индукция по напряжённости (вакуум)' };

  window.TASKS.push(

  /* ===================== 23.1 ===================== */
  {
    id: '23.1', chapter: CH, section: S1, page: '339',
    title: 'Сила Лоренца на электрон',
    given: [[String.raw`v = 4\cdot10^6\ \text{м/с}`, ''], [String.raw`\alpha = 30^\circ`, ''], [String.raw`B = 0{,}2\ \text{Тл}`, '']],
    find: String.raw`F \;—\; ?`,
    formulas: [FL],
    steps: [{ title: 'Сила', tex: String.raw`F = 1{,}6\cdot10^{-19}\cdot4\cdot10^6\cdot0{,}2\cdot0{,}5 = 6{,}4\cdot10^{-14}\ \text{Н}` }],
    answer: [String.raw`F = 64\ \text{фН}`],
  },

  /* ===================== 23.2 ===================== */
  {
    id: '23.2', chapter: CH, section: S1, page: '339',
    title: 'Радиус дуги протона',
    given: [[String.raw`B = 15\ \text{мТл}`, String.raw`1{,}5\cdot10^{-2}\ \text{Тл}`], [String.raw`v = 2\cdot10^6\ \text{м/с}`, '']],
    find: String.raw`R \;—\; ?`,
    formulas: [RAD],
    steps: [{ title: 'Радиус', tex: String.raw`R = \frac{1{,}67\cdot10^{-27}\cdot2\cdot10^6}{1{,}6\cdot10^{-19}\cdot0{,}015} = 1{,}39\ \text{м}` }],
    answer: [String.raw`R = 1{,}39\ \text{м}`],
    note: SMALL + 'В книге 1,38 м; с табличной массой протона выходит 1,39 м.',
  },

  /* ===================== 23.3 ===================== */
  {
    id: '23.3', chapter: CH, section: S1, page: '339',
    title: 'Скорость α-частицы',
    given: [[String.raw`H = 100\ \text{кА/м}`, String.raw`10^5\ \text{А/м}`], [String.raw`R = 10\ \text{см}`, String.raw`0{,}1\ \text{м}`], [String.raw`Q = 2e,\ m = 6{,}64\cdot10^{-27}\ \text{кг}`, '']],
    find: String.raw`v \;—\; ?`,
    formulas: [RAD, BH],
    steps: [{ title: 'Скорость', tex: String.raw`v = \frac{2e\mu_0HR}{m} = \frac{3{,}2\cdot10^{-19}\cdot1{,}257\cdot10^{-1}\cdot0{,}1}{6{,}64\cdot10^{-27}} = 6{,}06\cdot10^5\ \text{м/с}` }],
    answer: [String.raw`v = 0{,}61\ \text{Мм/с}`],
  },

  /* ===================== 23.4 ===================== */
  {
    id: '23.4', chapter: CH, section: S1, page: '340',
    title: 'Импульс иона',
    given: [[String.raw`B = 0{,}015\ \text{Тл}`, ''], [String.raw`R = 10\ \text{см}`, String.raw`0{,}1\ \text{м}`]],
    find: String.raw`p \;—\; ?`,
    formulas: [RAD],
    steps: [{ title: 'Импульс', tex: String.raw`p = eBR = 1{,}6\cdot10^{-19}\cdot0{,}015\cdot0{,}1 = 2{,}4\cdot10^{-22}\ \text{кг·м/с}` }],
    answer: [String.raw`p = 2{,}4\cdot10^{-22}\ \text{кг·м/с}`],
  },

  /* ===================== 23.5 ===================== */
  {
    id: '23.5', chapter: CH, section: S1, page: '340',
    title: 'Момент импульса частицы',
    given: [[String.raw`B = 0{,}5\ \text{Тл}`, ''], [String.raw`R = 0{,}2\ \text{см}`, String.raw`2\cdot10^{-3}\ \text{м}`]],
    find: String.raw`L \;—\; ?`,
    formulas: [RAD, { tex: String.raw`L = pR`, text: 'момент импульса при движении по окружности' }],
    steps: [{ title: 'Момент', tex: String.raw`L = eBR^2 = 1{,}6\cdot10^{-19}\cdot0{,}5\cdot4\cdot10^{-6} = 3{,}2\cdot10^{-25}\ \text{кг·м}^2\text{/с}` }],
    answer: [String.raw`L = |e|BR^2 = 3{,}2\cdot10^{-25}\ \text{кг·м}^2\text{/с}`],
  },

  /* ===================== 23.6 ===================== */
  {
    id: '23.6', chapter: CH, section: S1, page: '340',
    title: 'Энергия электрона на окружности',
    given: [[String.raw`B = 0{,}02\ \text{Тл}`, ''], [String.raw`R = 1\ \text{см}`, String.raw`0{,}01\ \text{м}`]],
    find: String.raw`T \;—\; ?`,
    formulas: [RAD],
    steps: [{ title: 'Энергия', tex: String.raw`T = \frac{p^2}{2m} = \frac{(eBR)^2}{2m} = \frac{(3{,}2\cdot10^{-23})^2}{2\cdot9{,}11\cdot10^{-31}} = 5{,}62\cdot10^{-16}\ \text{Дж} = 3{,}51\ \text{кэВ}` }],
    answer: [String.raw`T = \frac{e^2B^2R^2}{2m} = 0{,}562\ \text{фДж} = 3{,}51\ \text{кэВ}`],
    note: TYPO + 'В формуле ответа книги «B²r²l²» — должно быть e²B²R². Числа книги (0,563 фДж и 3,52 кэВ) отличаются от наших в последней цифре.',
  },

  /* ===================== 23.7 ===================== */
  {
    id: '23.7', chapter: CH, section: S1, page: '340',
    title: 'Частица потеряла половину энергии',
    given: [[String.raw`T_2 = T_1/2`, '']],
    find: String.raw`R_1/R_2 \;—\; ?`,
    formulas: [RAD],
    steps: [{ title: 'R ∝ p ∝ √T', tex: String.raw`\frac{R_1}{R_2} = \sqrt{\frac{T_1}{T_2}} = \sqrt2` }],
    answer: [String.raw`R_1/R_2 = \sqrt2`],
  },

  /* ===================== 23.8 ===================== */
  {
    id: '23.8', chapter: CH, section: S1, page: '340',
    title: 'Прохождение свинцовой пластины',
    given: [[String.raw`R_1 = 2\ \text{см},\ R_2 = 1\ \text{см}`, '']],
    find: String.raw`\Delta T/T \;—\; ?`,
    formulas: [RAD],
    steps: [{ title: 'T ∝ R²', tex: String.raw`\frac{\Delta T}{T} = 1 - \left(\frac{R_2}{R_1}\right)^2 = 1 - \frac14 = 0{,}75` }],
    answer: [String.raw`\Delta T/T = 0{,}75\ (\text{потеряно }75\%)`],
  },

  /* ===================== 23.9 ===================== */
  {
    id: '23.9', chapter: CH, section: S1, page: '340',
    title: 'Ускоренный протон в поле',
    given: [[String.raw`U = 600\ \text{В}`, ''], [String.raw`B = 0{,}3\ \text{Тл}`, '']],
    find: String.raw`R \;—\; ?`,
    formulas: [ACC, RAD],
    steps: [{ title: 'Радиус', tex: String.raw`R = \frac1B\sqrt{\frac{2mU}{e}} = \frac{1}{0{,}3}\sqrt{\frac{2\cdot1{,}67\cdot10^{-27}\cdot600}{1{,}6\cdot10^{-19}}} = 1{,}18\cdot10^{-2}\ \text{м}` }],
    answer: [String.raw`R \approx 12\ \text{мм}`],
  },

  /* ===================== 23.10 ===================== */
  {
    id: '23.10', chapter: CH, section: S1, page: '340',
    title: 'Какая это частица?',
    given: [[String.raw`v = 2\cdot10^6\ \text{м/с}`, ''], [String.raw`B = 0{,}52\ \text{Тл}`, ''], [String.raw`R = 4\ \text{см}`, String.raw`0{,}04\ \text{м}`]],
    find: String.raw`Q/m \;—\; ?`,
    formulas: [RAD],
    steps: [
      { title: 'Удельный заряд', tex: String.raw`\frac Qm = \frac{v}{RB} = \frac{2\cdot10^6}{0{,}04\cdot0{,}52} = 9{,}62\cdot10^7\ \text{Кл/кг}` },
      { title: 'Сравнение', text: 'У протона e/mₚ = 1,6·10⁻¹⁹/1,67·10⁻²⁷ = 9,58·10⁷ Кл/кг — совпадает. Знак заряда по дуге без направления поля не определить: это протон или антипротон.' },
    ],
    answer: [String.raw`Q/m = 96{,}2\ \text{МКл/кг} — \text{протон (или антипротон)}`],
    note: SMALL + 'В книге 96,3; точно 96,15.',
  },

  /* ===================== 23.11 ===================== */
  {
    id: '23.11', chapter: CH, section: S1, page: '340',
    title: 'Удельный заряд и скорость',
    given: [[String.raw`U = 2\ \text{кВ}`, String.raw`2\cdot10^3\ \text{В}`], [String.raw`B = 15{,}1\ \text{мТл}`, String.raw`1{,}51\cdot10^{-2}\ \text{Тл}`], [String.raw`R = 1\ \text{см}`, String.raw`0{,}01\ \text{м}`]],
    find: String.raw`|q|/m,\ v \;—\; ?`,
    formulas: [ACC, RAD],
    steps: [
      { title: 'Исключаем v', tex: String.raw`v = \frac{|q|}{m}BR,\quad \frac{|q|}mU = \frac{v^2}2\ \Rightarrow\ \frac{|q|}{m} = \frac{2U}{B^2R^2} = \frac{4000}{(1{,}51\cdot10^{-4})^2} = 1{,}75\cdot10^{11}\ \text{Кл/кг}` },
      { title: 'Скорость', tex: String.raw`v = \frac{2U}{BR} = \frac{4000}{1{,}51\cdot10^{-4}} = 2{,}65\cdot10^7\ \text{м/с}` },
    ],
    answer: [String.raw`|q|/m = 175\ \text{ГКл/кг}\ (\text{электрон});\quad v = 26{,}5\ \text{Мм/с}`],
  },

  /* ===================== 23.12 ===================== */
  {
    id: '23.12', chapter: CH, section: S1, page: '340',
    title: 'Сила по энергии и радиусу',
    given: [[String.raw`T = 1\ \text{кэВ}`, String.raw`1{,}6\cdot10^{-16}\ \text{Дж}`], [String.raw`R = 1\ \text{мм}`, String.raw`10^{-3}\ \text{м}`]],
    find: String.raw`F \;—\; ?`,
    formulas: [{ tex: String.raw`F = \frac{mv^2}{R} = \frac{2T}{R}`, text: 'сила Лоренца — центростремительная' }],
    steps: [{ title: 'Сила', tex: String.raw`F = \frac{2\cdot1{,}6\cdot10^{-16}}{10^{-3}} = 3{,}2\cdot10^{-13}\ \text{Н}` }],
    answer: [String.raw`F = 2T/R = 0{,}32\ \text{пН}`],
  },

  /* ===================== 23.13 ===================== */
  {
    id: '23.13', chapter: CH, section: S1, page: '340',
    title: 'Сила на электрон по радиусу',
    given: [[String.raw`B = 0{,}1\ \text{Тл}`, ''], [String.raw`R = 0{,}5\ \text{см}`, String.raw`5\cdot10^{-3}\ \text{м}`]],
    find: String.raw`F \;—\; ?`,
    formulas: [FL, RAD],
    steps: [{ title: 'Подставляем v = eBR/m', tex: String.raw`F = evB = \frac{e^2B^2R}{m} = \frac{2{,}56\cdot10^{-38}\cdot0{,}01\cdot5\cdot10^{-3}}{9{,}11\cdot10^{-31}} = 1{,}4\cdot10^{-12}\ \text{Н}` }],
    answer: [String.raw`F = 1{,}4\ \text{пН}`],
  },

  /* ===================== 23.14 ===================== */
  {
    id: '23.14', chapter: CH, section: S1, page: '341',
    title: 'Сила и радиус для электрона',
    given: [[String.raw`H = 4\ \text{кА/м}`, String.raw`B = \mu_0H = 5{,}03\ \text{мТл}`], [String.raw`v = 10^7\ \text{м/с}`, '']],
    find: String.raw`F,\ R \;—\; ?`,
    formulas: [FL, RAD, BH],
    steps: [
      { title: 'Сила', tex: String.raw`F = evB = 1{,}6\cdot10^{-19}\cdot10^7\cdot5{,}03\cdot10^{-3} = 8{,}04\cdot10^{-15}\ \text{Н}` },
      { title: 'Радиус', tex: String.raw`R = \frac{mv}{eB} = \frac{9{,}11\cdot10^{-24}}{8{,}04\cdot10^{-22}} = 1{,}13\cdot10^{-2}\ \text{м}` },
    ],
    answer: [String.raw`F = 8{,}04\ \text{фН};\quad R = 1{,}13\ \text{см}`],
    note: SMALL + 'В книге F = 8,05 фН.',
  },

  /* ===================== 23.15 ===================== */
  {
    id: '23.15', chapter: CH, section: S1, page: '341',
    title: 'Ширина поля, разворачивающего протон',
    given: [[String.raw`T = 1\ \text{МэВ}`, String.raw`1{,}6\cdot10^{-13}\ \text{Дж}`], [String.raw`B = 1\ \text{Тл}`, '']],
    find: String.raw`l_{\min} \;—\; ?`,
    formulas: [RAD],
    steps: [
      { title: 'Разворот — полуокружность', text: 'Чтобы протон полетел обратно, он должен пройти в поле полуокружность. Вглубь поля он заходит на радиус R.' },
      { title: 'Радиус', tex: String.raw`l = R = \frac{\sqrt{2mT}}{eB} = \frac{\sqrt{2\cdot1{,}67\cdot10^{-27}\cdot1{,}6\cdot10^{-13}}}{1{,}6\cdot10^{-19}} = 0{,}144\ \text{м}` },
    ],
    answer: [String.raw`l = \frac{\sqrt{2mT}}{eB} = 14{,}4\ \text{см}`],
    note: SMALL + 'В книге 14,5 см. В пояснении к ответу книга называет частицу «электроном» — речь о протоне.',
  },

  /* ===================== 23.16 ===================== */
  {
    id: '23.16', chapter: CH, section: S1, page: '341',
    title: 'Период вращения электрона',
    given: [[String.raw`H = 10\ \text{кА/м}`, String.raw`B = 1{,}257\cdot10^{-2}\ \text{Тл}`]],
    find: String.raw`T \;—\; ?`,
    formulas: [PER, BH],
    steps: [{ title: 'Период', tex: String.raw`T = \frac{2\pi m}{e\mu_0H} = \frac{2\pi\cdot9{,}11\cdot10^{-31}}{1{,}6\cdot10^{-19}\cdot1{,}257\cdot10^{-2}} = 2{,}85\cdot10^{-9}\ \text{с}` }],
    answer: [String.raw`T = 2{,}85\ \text{нс}`],
    note: SMALL + 'В книге 2,84 нс.',
  },

  /* ===================== 23.17 ===================== */
  {
    id: '23.17', chapter: CH, section: S1, page: '341',
    title: 'Частота вращения электрона',
    given: [[String.raw`B = 0{,}2\ \text{Тл}`, '']],
    find: String.raw`n \;—\; ?`,
    formulas: [PER],
    steps: [{ title: 'Частота', tex: String.raw`n = \frac1T = \frac{eB}{2\pi m} = \frac{1{,}6\cdot10^{-19}\cdot0{,}2}{2\pi\cdot9{,}11\cdot10^{-31}} = 5{,}59\cdot10^9\ \text{с}^{-1}` }],
    answer: [String.raw`n = 5{,}59\ \text{ГГц}`],
    note: MISMATCH + 'В книге 562 МГц — в 10 раз меньше. Такой ответ получился бы при B = 0,02 Тл. По формуле книги с B = 0,2 Тл выходит 5,59 ГГц.',
  },

  /* ===================== 23.18 ===================== */
  {
    id: '23.18', chapter: CH, section: S1, page: '341',
    title: 'Эквивалентный ток электрона',
    given: [[String.raw`B = 0{,}1\ \text{Тл}`, '']],
    find: String.raw`I \;—\; ?`,
    formulas: [PER, { tex: String.raw`I = \frac{e}{T}`, text: 'заряд, проходящий за период' }],
    steps: [{ title: 'Ток', tex: String.raw`I = \frac{e^2B}{2\pi m} = \frac{2{,}56\cdot10^{-38}\cdot0{,}1}{5{,}72\cdot10^{-30}} = 4{,}47\cdot10^{-10}\ \text{А}` }],
    answer: [String.raw`I = \frac{e^2B}{2\pi m} = 447\ \text{пА}`],
    note: SMALL + 'В книге 448 пА.',
  },

  /* ===================== 23.19 ===================== */
  {
    id: '23.19', chapter: CH, section: S1, page: '341',
    title: 'Магнитный момент электрона на орбите',
    given: [[String.raw`B = 0{,}2\ \text{Тл}`, ''], [String.raw`R = 5\ \text{см}`, String.raw`0{,}05\ \text{м}`]],
    find: String.raw`p_m \;—\; ?`,
    formulas: [PER, { tex: String.raw`p_m = I\pi R^2`, text: 'магнитный момент кругового тока' }],
    steps: [{ title: 'Момент', tex: String.raw`p_m = \frac{e^2B}{2\pi m}\pi R^2 = \frac{e^2BR^2}{2m} = \frac{2{,}56\cdot10^{-38}\cdot0{,}2\cdot0{,}0025}{1{,}822\cdot10^{-30}} = 7{,}03\cdot10^{-12}\ \text{А·м}^2` }],
    answer: [String.raw`p_m = 7{,}03\ \text{пА·м}^2`],
    note: SMALL + 'В книге 7,04.',
  },

  /* ===================== 23.20 ===================== */
  {
    id: '23.20', chapter: CH, section: S1, page: '341',
    title: 'Масса второго иона',
    given: [[String.raw`m_1 = 12\ \text{а.е.м.}`, ''], [String.raw`R_1 = 4\ \text{см},\ R_2 = 6\ \text{см}`, '']],
    find: String.raw`m_2 \;—\; ?`,
    formulas: [ACC, RAD],
    steps: [{ title: 'R = √(2mU/e)/B ∝ √m', tex: String.raw`m_2 = m_1\left(\frac{R_2}{R_1}\right)^2 = 12\cdot2{,}25 = 27\ \text{а.е.м.}` }],
    answer: [String.raw`m_2 = 27\ \text{а.е.м.}`],
  },

  /* ===================== 23.21 ===================== */
  {
    id: '23.21', chapter: CH, section: S1, page: '341',
    title: 'Отношение масс ионов',
    given: [[String.raw`R_1 = 5\ \text{см},\ R_2 = 2{,}5\ \text{см}`, '']],
    find: String.raw`m_1/m_2 \;—\; ?`,
    formulas: [ACC, RAD],
    steps: [{ title: 'm ∝ R²', tex: String.raw`\frac{m_1}{m_2} = \left(\frac{R_1}{R_2}\right)^2 = 4` }],
    answer: [String.raw`m_1/m_2 = 4`],
  },

  /* ===================== 23.22 ===================== */
  {
    id: '23.22', chapter: CH, section: S1, page: '341',
    title: 'Скорость по параметрам винтовой линии',
    given: [[String.raw`B = 100\ \text{мкТл}`, String.raw`10^{-4}\ \text{Тл}`], [String.raw`h = 20\ \text{см},\ R = 5\ \text{см}`, '']],
    find: String.raw`v \;—\; ?`,
    formulas: [HEL, PER],
    steps: [
      { title: 'Составляющие', tex: String.raw`v_\perp = \frac{eBR}{m},\quad v_\parallel = \frac hT = \frac{eBh}{2\pi m}` },
      { title: 'Скорость', tex: String.raw`v = \frac{eB}{m}\sqrt{R^2 + \frac{h^2}{4\pi^2}} = 1{,}756\cdot10^7\cdot\sqrt{0{,}0025 + 0{,}00101} = 1{,}04\cdot10^6\ \text{м/с}` },
    ],
    answer: [String.raw`v = 1{,}04\cdot10^6\ \text{м/с}`],
  },

  /* ===================== 23.23 ===================== */
  {
    id: '23.23', chapter: CH, section: S1, page: '341',
    title: 'Период и скорость на винтовой линии',
    given: [[String.raw`B = 9\ \text{мТл}`, String.raw`9\cdot10^{-3}\ \text{Тл}`], [String.raw`R = 1\ \text{см},\ h = 7{,}8\ \text{см}`, '']],
    find: String.raw`T,\ v \;—\; ?`,
    formulas: [HEL, PER],
    steps: [
      { title: 'Период', tex: String.raw`T = \frac{2\pi m}{eB} = \frac{5{,}72\cdot10^{-30}}{1{,}44\cdot10^{-21}} = 3{,}97\cdot10^{-9}\ \text{с}` },
      { title: 'Скорость', tex: String.raw`v_\parallel = \frac hT = 1{,}96\cdot10^7,\quad v_\perp = \frac{eBR}m = 1{,}58\cdot10^7\ \Rightarrow\ v = 2{,}52\cdot10^7\ \text{м/с}` },
    ],
    answer: [String.raw`T = 3{,}97\ \text{нс};\quad v = 25\ \text{Мм/с}`],
  },

  /* ===================== 23.24 ===================== */
  {
    id: '23.24', chapter: CH, section: S1, page: '341–342',
    title: 'Энергия протона на винтовой линии',
    given: [[String.raw`B = 2\ \text{Тл}`, ''], [String.raw`R = 10\ \text{см},\ h = 60\ \text{см}`, '']],
    find: String.raw`T \;—\; ?`,
    formulas: [HEL],
    steps: [
      { title: 'Квадрат скорости (см. 23.22)', tex: String.raw`v^2 = \left(\frac{eB}m\right)^2\left(R^2 + \frac{h^2}{4\pi^2}\right)` },
      { title: 'Энергия', tex: String.raw`T = \frac{mv^2}2 = \frac{(4\pi^2R^2 + h^2)e^2B^2}{8\pi^2m} = \frac{0{,}755\cdot2{,}56\cdot10^{-38}\cdot4}{8\pi^2\cdot1{,}67\cdot10^{-27}} = 5{,}86\cdot10^{-13}\ \text{Дж}` },
    ],
    answer: [String.raw`T = 586\ \text{фДж}\ (3{,}66\ \text{МэВ})`],
    note: MISMATCH + 'В книге 580 фДж (на 1 % меньше). По её же формуле с табличными e и mₚ выходит 586 фДж.',
  },

  /* ===================== 23.25 ===================== */
  {
    id: '23.25', chapter: CH, section: S1, page: '342',
    title: 'Радиус и шаг винтовой линии',
    given: [[String.raw`H = 16\ \text{кА/м}`, String.raw`B = 2{,}01\cdot10^{-2}\ \text{Тл}`], [String.raw`v = 8\cdot10^6\ \text{м/с}`, ''], [String.raw`\alpha = 60^\circ`, '']],
    find: String.raw`R,\ h,\ h_0 \;—\; ?`,
    formulas: [HEL, BH],
    steps: [
      { title: 'Радиус', tex: String.raw`R = \frac{mv\sin\alpha}{eB} = \frac{9{,}11\cdot10^{-31}\cdot8\cdot10^6\cdot0{,}866}{1{,}6\cdot10^{-19}\cdot2{,}01\cdot10^{-2}} = 1{,}96\cdot10^{-3}\ \text{м}` },
      { title: 'Шаг', tex: String.raw`h = \frac{2\pi mv\cos\alpha}{eB} = 7{,}1\cdot10^{-3}\ \text{м}` },
      { title: 'Малый угол (cos α ≈ 1)', tex: String.raw`h_0 = \frac{2\pi mv}{eB} = 14{,}2\cdot10^{-3}\ \text{м}` },
    ],
    answer: [String.raw`R = 1{,}96\ \text{мм};\quad h = 7{,}1\ \text{мм};\quad h_0 = 14{,}2\ \text{мм}`],
  },

  /* ===================== 23.26 ===================== */
  {
    id: '23.26', chapter: CH, section: S1, page: '342',
    title: 'Протон в циклотроне',
    given: [[String.raw`N = 40`, ''], [String.raw`U_{\max} = 60\ \text{кВ}`, '']],
    find: String.raw`\varepsilon,\ \Delta m/m_0,\ v \;—\; ?`,
    formulas: [{ tex: String.raw`\varepsilon = 2eU_{\max}N`, text: 'за оборот — два прохождения зазора' }, { tex: String.raw`\frac{\Delta m}{m_0} = \frac{\varepsilon}{E_0}`, text: 'рост массы' }],
    steps: [
      { title: 'Энергия', tex: String.raw`\varepsilon = 2\cdot60\ \text{кэВ}\cdot40 = 4{,}8\ \text{МэВ}` },
      { title: 'Рост массы', tex: String.raw`\frac{\Delta m}{m_0} = \frac{4{,}8}{938} = 0{,}51\%` },
      { title: 'Скорость (почти классика)', tex: String.raw`v = \sqrt{\frac{2\varepsilon}{m_0}} = \sqrt{\frac{2\cdot4{,}8\cdot1{,}6\cdot10^{-13}}{1{,}67\cdot10^{-27}}} = 3{,}03\cdot10^7\ \text{м/с}` },
    ],
    answer: [String.raw`\varepsilon = 4{,}8\ \text{МэВ};\quad \Delta m/m_0 = 0{,}5\%;\quad v = 30\ \text{Мм/с}`],
  },

  /* ===================== 23.27 ===================== */
  {
    id: '23.27', chapter: CH, section: S1, page: '342',
    title: 'α-частицы на выходе циклотрона',
    given: [[String.raw`R = 50\ \text{см}`, String.raw`0{,}5\ \text{м}`], [String.raw`B = 1{,}7\ \text{Тл}`, ''], [String.raw`Q = 2e,\ m = 6{,}64\cdot10^{-27}\ \text{кг}`, '']],
    find: String.raw`v,\ T \;—\; ?`,
    formulas: [RAD],
    steps: [
      { title: 'Скорость', tex: String.raw`v = \frac{QBR}m = \frac{3{,}2\cdot10^{-19}\cdot1{,}7\cdot0{,}5}{6{,}64\cdot10^{-27}} = 4{,}1\cdot10^7\ \text{м/с}` },
      { title: 'Энергия', tex: String.raw`T = \frac{mv^2}2 = \frac{QBvR}{2} = 5{,}57\cdot10^{-12}\ \text{Дж} = 34{,}8\ \text{МэВ}` },
    ],
    answer: [String.raw`v = 41\ \text{Мм/с};\quad T = 34{,}8\ \text{МэВ}`],
    note: SMALL + 'В книге 34,9 МэВ.',
  },

  /* ===================== 23.28 ===================== */
  {
    id: '23.28', chapter: CH, section: S1, page: '342',
    title: 'Частота для дейтонов',
    given: [[String.raw`B = 1\ \text{Тл}`, ''], [String.raw`m_d = 3{,}35\cdot10^{-27}\ \text{кг}`, '']],
    find: String.raw`\nu \;—\; ?`,
    formulas: [PER],
    steps: [{ title: 'Частота поля = частоте обращения', tex: String.raw`\nu = \frac{eB}{2\pi m} = \frac{1{,}6\cdot10^{-19}}{2\pi\cdot3{,}35\cdot10^{-27}} = 7{,}6\cdot10^6\ \text{Гц}` }],
    answer: [String.raw`\nu = 7{,}6\ \text{МГц}`],
    note: SMALL + 'В книге 7,7 МГц. С табличной массой дейтона (табл. 22) выходит 7,60 МГц.',
  },

  /* ===================== 23.29 ===================== */
  {
    id: '23.29', chapter: CH, section: S1, page: '342',
    title: 'Поле для ускорения ионов гелия',
    given: [[String.raw`\nu = 10\ \text{МГц}`, String.raw`10^7\ \text{Гц}`], [String.raw`Q = 2e,\ m = 6{,}64\cdot10^{-27}\ \text{кг}`, '']],
    find: String.raw`B \;—\; ?`,
    formulas: [PER],
    steps: [{ title: 'Индукция', tex: String.raw`B = \frac{2\pi m\nu}{2e} = \frac{\pi m\nu}{e} = \frac{\pi\cdot6{,}64\cdot10^{-27}\cdot10^7}{1{,}6\cdot10^{-19}} = 1{,}3\ \text{Тл}` }],
    answer: [String.raw`B = 1{,}3\ \text{Тл}`],
  },

  /* ===================== 23.30 ===================== */
  {
    id: '23.30', chapter: CH, section: S1, page: '342',
    title: 'Число оборотов в циклотроне',
    given: [[String.raw`T = 10\ \text{МэВ}`, ''], [String.raw`U = 30\ \text{кВ}`, '']],
    find: String.raw`N \;—\; ?`,
    formulas: [{ tex: String.raw`T = 2eUN`, text: 'см. 23.26' }],
    steps: [{ title: 'Обороты', tex: String.raw`N = \frac{T}{2eU} = \frac{10\ \text{МэВ}}{60\ \text{кэВ}} = 167` }],
    answer: [String.raw`N = 167`],
  },

  /* ===================== 23.31 ===================== */
  {
    id: '23.31', chapter: CH, section: S1, page: '342',
    title: 'Быстрый электрон: с учётом и без учёта роста массы',
    given: [[String.raw`v = 0{,}8c`, String.raw`2{,}4\cdot10^8\ \text{м/с}`], [String.raw`B = 0{,}01\ \text{Тл}`, '']],
    find: String.raw`R_1,\ R_2 \;—\; ?`,
    formulas: [RAD, { tex: String.raw`m = \frac{m_0}{\sqrt{1 - v^2/c^2}}`, text: 'релятивистская масса' }],
    steps: [
      { title: '1) Классически', tex: String.raw`R_1 = \frac{m_0v}{eB} = \frac{9{,}11\cdot10^{-31}\cdot2{,}4\cdot10^8}{1{,}6\cdot10^{-21}} = 0{,}137\ \text{м}` },
      { title: '2) С ростом массы (√(1 − 0,64) = 0,6)', tex: String.raw`R_2 = \frac{R_1}{0{,}6} = 0{,}228\ \text{м}` },
    ],
    answer: [String.raw`1)\ 13{,}7\ \text{см};\quad 2)\ 22{,}8\ \text{см}`],
  },

  /* ===================== 23.32 ===================== */
  {
    id: '23.32', chapter: CH, section: S1, page: '342',
    title: 'Энергия релятивистского электрона (R = 2 см)',
    given: [[String.raw`R = 2\ \text{см}`, String.raw`0{,}02\ \text{м}`], [String.raw`B = 0{,}1\ \text{Тл}`, ''], [String.raw`E_0 = 0{,}511\ \text{МэВ}`, '']],
    find: String.raw`T \;—\; ?`,
    formulas: [REL],
    steps: [
      { title: 'pc', tex: String.raw`pc = eBRc = 1{,}6\cdot10^{-19}\cdot0{,}1\cdot0{,}02\cdot3\cdot10^8 = 9{,}6\cdot10^{-14}\ \text{Дж} = 0{,}6\ \text{МэВ}` },
      { title: 'Энергия', tex: String.raw`T = \sqrt{0{,}6^2 + 0{,}511^2} - 0{,}511 = 0{,}277\ \text{МэВ}` },
    ],
    answer: [String.raw`T = 0{,}28\ \text{МэВ}`],
  },

  /* ===================== 23.33 ===================== */
  {
    id: '23.33', chapter: CH, section: S1, page: '342–343',
    title: 'Электрон в камере Вильсона',
    given: [[String.raw`R = 10\ \text{см}`, String.raw`0{,}1\ \text{м}`], [String.raw`B = 10\ \text{Тл}`, '']],
    find: String.raw`T \;—\; ?`,
    formulas: [REL],
    steps: [
      { title: 'pc', tex: String.raw`pc = eBRc = 1{,}6\cdot10^{-19}\cdot10\cdot0{,}1\cdot3\cdot10^8 = 4{,}8\cdot10^{-11}\ \text{Дж} = 300\ \text{МэВ}` },
      { title: 'Ультрарелятивистский случай (pc ≫ E₀)', tex: String.raw`T = \sqrt{300^2 + 0{,}511^2} - 0{,}511 \approx 299{,}5\ \text{МэВ}` },
    ],
    answer: [String.raw`T \approx 300\ \text{МэВ}`],
  },

  /* ===================== 23.34 ===================== */
  {
    id: '23.34', chapter: CH, section: S1, page: '343',
    title: 'Индукция для α-частицы 500 МэВ',
    given: [[String.raw`T = 500\ \text{МэВ}`, ''], [String.raw`R = 80\ \text{см}`, String.raw`0{,}8\ \text{м}`], [String.raw`E_0 = 3733\ \text{МэВ},\ Q = 2e`, '']],
    find: String.raw`B \;—\; ?`,
    formulas: [REL],
    steps: [
      { title: 'Импульс', tex: String.raw`pc = \sqrt{T(T + 2E_0)} = \sqrt{500\cdot7966} = 1996\ \text{МэВ} = 3{,}19\cdot10^{-10}\ \text{Дж}` },
      { title: 'Индукция', tex: String.raw`B = \frac{p}{QR} = \frac{3{,}19\cdot10^{-10}/(3\cdot10^8)}{3{,}2\cdot10^{-19}\cdot0{,}8} = 4{,}16\ \text{Тл}` },
    ],
    answer: [String.raw`B \approx 4{,}2\ \text{Тл}`],
  },

  /* ===================== 23.35 ===================== */
  {
    id: '23.35', chapter: CH, section: S1, page: '343',
    title: 'Период обращения релятивистского электрона',
    given: [[String.raw`T = 1{,}5\ \text{МэВ}`, ''], [String.raw`B = 0{,}02\ \text{Тл}`, ''], [String.raw`E_0 = 0{,}511\ \text{МэВ}`, '']],
    find: String.raw`\tau \;—\; ?`,
    formulas: [{ tex: String.raw`\tau = \frac{2\pi m}{eB},\quad m = \frac{E_0 + T}{c^2}`, text: 'период с релятивистской массой' }],
    steps: [{ title: 'Период', tex: String.raw`\tau = \frac{2\pi(E_0 + T)}{c^2eB} = \frac{2\pi\cdot2{,}011\cdot1{,}6\cdot10^{-13}}{9\cdot10^{16}\cdot1{,}6\cdot10^{-19}\cdot0{,}02} = 7{,}02\cdot10^{-9}\ \text{с}` }],
    answer: [String.raw`\tau = 7{,}02\ \text{нс}`],
  },

  /* ===================== 23.36 ===================== */
  {
    id: '23.36', chapter: CH, section: S2, page: '343',
    title: 'Скрещенные поля: скорость без отклонения',
    given: [[String.raw`B = 0{,}1\ \text{Тл}`, ''], [String.raw`E = 100\ \text{кВ/м}`, String.raw`10^5\ \text{В/м}`]],
    find: String.raw`v \;—\; ?`,
    formulas: [{ tex: String.raw`QE = QvB\ \Rightarrow\ v = \frac EB`, text: 'электрическая и магнитная силы уравновешены' }],
    steps: [{ title: 'Скорость', tex: String.raw`v = \frac{10^5}{0{,}1} = 10^6\ \text{м/с}` }],
    answer: [String.raw`v = E/B = 1\ \text{Мм/с}`],
  },

  /* ===================== 23.37 ===================== */
  {
    id: '23.37', chapter: CH, section: S2, page: '343',
    title: 'Фильтр скоростей и его точность',
    given: [[String.raw`E = 400\ \text{кВ/м}`, String.raw`4\cdot10^5\ \text{В/м}`], [String.raw`B = 0{,}25\ \text{Тл}`, ''], [String.raw`\delta E,\ \delta B \le 0{,}2\%`, '']],
    find: String.raw`v,\ \Delta v \;—\; ?`,
    formulas: [{ tex: String.raw`v = \frac EB,\quad \frac{\Delta v}{v} = \frac{\Delta E}{E} + \frac{\Delta B}{B}`, text: 'относительная погрешность частного' }],
    steps: [
      { title: 'Скорость', tex: String.raw`v = \frac{4\cdot10^5}{0{,}25} = 1{,}6\cdot10^6\ \text{м/с}` },
      { title: 'Отклонение', tex: String.raw`\Delta v = \pm0{,}004\cdot1{,}6\cdot10^6 = \pm6{,}4\cdot10^3\ \text{м/с}` },
    ],
    answer: [String.raw`v = 1{,}6\ \text{Мм/с};\quad \Delta v = \pm6{,}4\ \text{км/с}`],
  },

  /* ===================== 23.38 ===================== */
  {
    id: '23.38', chapter: CH, section: S2, page: '343',
    title: 'Протон в скрещенных полях',
    given: [[String.raw`U = 800\ \text{В}`, ''], [String.raw`B = 50\ \text{мТл}`, String.raw`0{,}05\ \text{Тл}`]],
    find: String.raw`E \;—\; ?`,
    formulas: [ACC, { tex: String.raw`E = vB`, text: 'прямолинейное движение в скрещенных полях' }],
    steps: [
      { title: 'Скорость', tex: String.raw`v = \sqrt{\frac{2eU}m} = \sqrt{\frac{2\cdot1{,}6\cdot10^{-19}\cdot800}{1{,}67\cdot10^{-27}}} = 3{,}92\cdot10^5\ \text{м/с}` },
      { title: 'Напряжённость', tex: String.raw`E = vB = 3{,}92\cdot10^5\cdot0{,}05 = 1{,}96\cdot10^4\ \text{В/м}` },
    ],
    answer: [String.raw`E = B\sqrt{2eU/m} = 19{,}6\ \text{кВ/м}`],
  },

  /* ===================== 23.39 ===================== */
  {
    id: '23.39', chapter: CH, section: S2, page: '343',
    title: 'Электрическое поле вдоль магнитного',
    given: [[String.raw`R = 1\ \text{см}`, String.raw`0{,}01\ \text{м}`], [String.raw`B = 0{,}1\ \text{Тл}`, ''], [String.raw`E = 100\ \text{В/м}`, ''], [String.raw`T_2 = 2T_1`, '']],
    find: String.raw`\Delta t \;—\; ?`,
    formulas: [RAD, { tex: String.raw`v_\parallel = \frac{QE}{m}t`, text: 'E ∥ B разгоняет частицу вдоль поля, не меняя v⊥' }],
    steps: [
      { title: 'Условие удвоения энергии', text: 'v⊥ не меняется. Энергия удвоится, когда v∥ = v⊥.', tex: String.raw`v_\perp = \frac{QBR}m` },
      { title: 'Время', tex: String.raw`\frac{QE}m\Delta t = \frac{QBR}m\ \Rightarrow\ \Delta t = \frac{BR}E = \frac{0{,}1\cdot0{,}01}{100} = 10^{-5}\ \text{с}` },
    ],
    answer: [String.raw`\Delta t = BR/E = 10\ \text{мкс}`],
  },

  /* ===================== 23.40 ===================== */
  {
    id: '23.40', chapter: CH, section: S2, page: '343',
    title: 'Начальное ускорение протона при E ∥ B',
    given: [[String.raw`v = 100\ \text{км/с}`, String.raw`10^5\ \text{м/с}`], [String.raw`E = 210\ \text{В/м}`, ''], [String.raw`B = 3{,}3\ \text{мТл}`, String.raw`3{,}3\cdot10^{-3}\ \text{Тл}`]],
    find: String.raw`a_1,\ a_2 \;—\; ?`,
    formulas: [FL, { tex: String.raw`\mathbf F = Q\mathbf E + Q\mathbf v\times\mathbf B`, text: 'полная сила Лоренца' }],
    steps: [
      { title: '1) v ∥ B — магнитная сила равна нулю', tex: String.raw`a_1 = \frac{eE}m = \frac{1{,}6\cdot10^{-19}\cdot210}{1{,}67\cdot10^{-27}} = 2{,}01\cdot10^{10}\ \text{м/с}^2` },
      { title: '2) v ⟂ B — силы взаимно перпендикулярны', tex: String.raw`a_\text{м} = \frac{evB}{m} = 3{,}16\cdot10^{10},\quad a_2 = \sqrt{a_1^2 + a_\text{м}^2} = 3{,}75\cdot10^{10}\ \text{м/с}^2` },
    ],
    answer: [String.raw`1)\ 20{,}1\ \text{Гм/с}^2;\quad 2)\ 37{,}5\ \text{Гм/с}^2`],
  }

  );
})();
