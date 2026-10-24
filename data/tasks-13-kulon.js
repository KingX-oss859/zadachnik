/*
  § 13. Закон Кулона. Взаимодействие заряженных тел — задачи 13.1–13.22 (стр. 207–210).
  Условия задач показываются дословно из книги (data/book-tasks.js).
  Ответы пересчитаны скриптом tools/check_kulon.py и сверены с book/99-otvety.md.
  Где ответ книги расходится с расчётом — плашка note «Расхождение с ответом книги».
  ε₀ = 8,85·10⁻¹² Ф/м, 1/(4πε₀) = 8,99·10⁹ м/Ф ≈ 9·10⁹; e = 1,60·10⁻¹⁹ Кл; m_e = 9,11·10⁻³¹ кг; G = 6,67·10⁻¹¹; g = 9,81 м/с².
*/
(function () {
  const CH = 'Гл. 3. Электростатика';
  const S1 = 'Взаимодействие точечных зарядов';
  const S2 = 'Взаимодействие точечного заряда с зарядом, равномерно распределённым';
  const MISMATCH = '<b>Расхождение с ответом книги.</b> ';
  const SMALL = '<b>Расхождение в последней цифре.</b> ';

  const COUL = { tex: String.raw`F = \frac{1}{4\pi\varepsilon_0}\frac{|Q_1Q_2|}{\varepsilon r^2}`, text: 'закон Кулона; 1/(4πε₀) = 9·10⁹ м/Ф, ε — диэлектрическая проницаемость среды' };
  const SUPER = { tex: String.raw`\vec F = \sum\vec F_i`, text: 'принцип суперпозиции: силы от разных зарядов складываются как векторы' };
  const DQ = { tex: String.raw`dQ = \tau\,dl,\quad d\vec F = \frac{Q\,dQ}{4\pi\varepsilon_0r^2}\frac{\vec r}{r}`, text: 'заряженную нить разбиваем на точечные заряды dQ и складываем (интегрируем) силы' };

  window.TASKS.push(

  /* ===================== 13.1 ===================== */
  {
    id: '13.1', chapter: CH, section: S1, page: '207',
    title: 'Сила между зарядами по 1 Кл',
    given: [[String.raw`Q_1 = Q_2 = 1\ \text{Кл}`, ''], [String.raw`r = 1\ \text{м}`, '']],
    find: String.raw`F \;—\; ?`,
    formulas: [COUL],
    steps: [
      { title: 'Закон Кулона',
        text: 'Огромная сила — кулон очень большой заряд.',
        tex: String.raw`F = 9\cdot10^9\cdot\frac{1\cdot1}{1^2} = 9\cdot10^9\ \text{Н}` },
    ],
    answer: [String.raw`F = 9\cdot10^9\ \text{Н}`],
  },

  /* ===================== 13.2 ===================== */
  {
    id: '13.2', chapter: CH, section: S1, page: '207',
    title: 'Разошедшиеся шарики на нитях',
    given: [[String.raw`m = 0{,}1\ \text{г}`, String.raw`10^{-4}\ \text{кг}`], [String.raw`l = 20\ \text{см}`, String.raw`0{,}2\ \text{м}`], [String.raw`\alpha = 60^\circ`, '']],
    find: String.raw`Q \;—\; ?`,
    formulas: [COUL, { tex: String.raw`F = mg\operatorname{tg}\frac\alpha2`, text: 'равновесие шарика: сила натяжения, тяжесть и кулоновская сила' }],
    steps: [
      { title: 'Расстояние между шариками',
        tex: String.raw`r = 2l\sin\frac\alpha2 = 2\cdot0{,}2\cdot0{,}5 = 0{,}2\ \text{м}` },
      { title: 'Кулоновская сила из равновесия',
        tex: String.raw`F = mg\operatorname{tg}30^\circ = 10^{-4}\cdot9{,}81\cdot0{,}577 = 5{,}66\cdot10^{-4}\ \text{Н}` },
      { title: 'Заряд',
        text: 'В книге 50,1 нКл — отличие в последней цифре.',
        tex: String.raw`Q = r\sqrt{4\pi\varepsilon_0F} = 0{,}2\sqrt{\frac{5{,}66\cdot10^{-4}}{8{,}99\cdot10^9}} = 50{,}2\ \text{нКл}` },
    ],
    answer: [String.raw`Q = 4l\sin\tfrac\alpha2\sqrt{\pi\varepsilon_0mg\operatorname{tg}\tfrac\alpha2} = 50{,}2\ \text{нКл}`],
  },

  /* ===================== 13.3 ===================== */
  {
    id: '13.3', chapter: CH, section: S1, page: '207',
    title: 'Шарики в масле: тот же угол',
    given: [[String.raw`\rho_0 = 800\ \text{кг/м}^3`, ''], [String.raw`\rho = 1600\ \text{кг/м}^3`, '']],
    find: String.raw`\varepsilon \;—\; ?`,
    formulas: [COUL, { tex: String.raw`P' = mg\left(1 - \frac{\rho_0}{\rho}\right)`, text: 'вес шарика в жидкости с учётом силы Архимеда' }],
    steps: [
      { title: 'Что меняется в масле',
        text: String.raw`Кулоновская сила уменьшается в $\varepsilon$ раз, а «вес» — в $\frac{\rho}{\rho - \rho_0}$ раз. Угол прежний, если отношение этих сил ($\operatorname{tg}\frac\alpha2$) не изменилось.` },
      { title: 'Условие',
        tex: String.raw`\varepsilon = \frac{\rho}{\rho - \rho_0} = \frac{1600}{800} = 2` },
    ],
    answer: [String.raw`\varepsilon = 2`],
  },

  /* ===================== 13.4 ===================== */
  {
    id: '13.4', chapter: CH, section: S1, page: '207',
    title: 'Кулон против Ньютона',
    note: SMALL + String.raw`В книге $86{,}7\cdot10^{-15}$ Кл; с $\varepsilon_0 = 8{,}85\cdot10^{-12}$ и $G = 6{,}67\cdot10^{-11}$ выходит $86{,}1\cdot10^{-15}$ Кл.`,
    given: [[String.raw`m = 1\ \text{г}`, String.raw`10^{-3}\ \text{кг}`]],
    find: String.raw`Q \;—\; ?`,
    formulas: [COUL, { tex: String.raw`F = G\frac{m_1m_2}{r^2}`, text: 'закон всемирного тяготения' }],
    steps: [
      { title: 'Равенство сил',
        text: 'Расстояние сокращается — обе силы обратно пропорциональны r².',
        tex: String.raw`\frac{Q^2}{4\pi\varepsilon_0r^2} = G\frac{m^2}{r^2} \;\Rightarrow\; Q = 2m\sqrt{\pi\varepsilon_0G}` },
      { title: 'Числа',
        tex: String.raw`Q = 2\cdot10^{-3}\sqrt{3{,}14\cdot8{,}85\cdot10^{-12}\cdot6{,}67\cdot10^{-11}} = 8{,}61\cdot10^{-14}\ \text{Кл}` },
      { title: 'Вывод',
        text: 'Достаточно ничтожного заряда — электрические силы несравнимо сильнее тяготения.' },
    ],
    answer: [String.raw`Q = 2m\sqrt{\pi\varepsilon_0G} = 86{,}1\cdot10^{-15}\ \text{Кл}`],
  },

  /* ===================== 13.5 ===================== */
  {
    id: '13.5', chapter: CH, section: S1, page: '207–208',
    title: 'Электрон в атоме водорода',
    given: [[String.raw`r = 53\ \text{пм}`, String.raw`5{,}3\cdot10^{-11}\ \text{м}`], [String.raw`e = 1{,}6\cdot10^{-19}\ \text{Кл},\ m = 9{,}11\cdot10^{-31}\ \text{кг}`, '']],
    find: String.raw`v,\ n \;—\; ?`,
    formulas: [COUL, { tex: String.raw`\frac{mv^2}{r} = F`, text: 'кулоновское притяжение — центростремительная сила' }],
    steps: [
      { title: 'Скорость',
        tex: String.raw`\frac{mv^2}{r} = \frac{e^2}{4\pi\varepsilon_0r^2} \;\Rightarrow\; v = \frac{e}{\sqrt{4\pi\varepsilon_0mr}} = 2{,}18\cdot10^6\ \text{м/с}` },
      { title: 'Частота',
        text: 'В книге 2,19·10⁶ м/с и 6,58·10¹⁵ с⁻¹ — отличие в последней цифре.',
        tex: String.raw`n = \frac{v}{2\pi r} = \frac{2{,}18\cdot10^6}{3{,}33\cdot10^{-10}} = 6{,}56\cdot10^{15}\ \text{с}^{-1}` },
    ],
    answer: [String.raw`v = 2{,}18\cdot10^6\ \text{м/с};\quad n = 6{,}56\cdot10^{15}\ \text{с}^{-1}`],
  },

  /* ===================== 13.6 ===================== */
  {
    id: '13.6', chapter: CH, section: S1, page: '208',
    title: 'Заряд около диполя',
    given: [[String.raw`Q_1 = 1\ \text{мкКл},\ Q_2 = -Q_1`, ''], [String.raw`Q = 0{,}1\ \text{мкКл}`, ''], [String.raw`r_1 = 6\ \text{см},\ r_2 = 8\ \text{см},\ d = 10\ \text{см}`, '']],
    find: String.raw`F \;—\; ?`,
    formulas: [COUL, SUPER],
    steps: [
      { title: 'Треугольник прямоугольный',
        text: '6² + 8² = 10²: угол при заряде Q прямой, силы от Q₁ и Q₂ перпендикулярны.' },
      { title: 'Силы',
        tex: String.raw`F_1 = \frac{9\cdot10^9\cdot10^{-6}\cdot10^{-7}}{0{,}06^2} = 0{,}250\ \text{Н},\qquad F_2 = \frac{9\cdot10^{-4}}{0{,}08^2} = 0{,}140\ \text{Н}` },
      { title: 'Результирующая',
        tex: String.raw`F = \sqrt{F_1^2 + F_2^2} = \frac{Q_1Q}{4\pi\varepsilon_0}\sqrt{\frac{1}{r_1^4} + \frac{1}{r_2^4}} = 287\ \text{мН}` },
    ],
    answer: [String.raw`F = 287\ \text{мН}`],
  },

  /* ===================== 13.7 ===================== */
  {
    id: '13.7', chapter: CH, section: S1, page: '208',
    title: 'Заряд в центре шестиугольника',
    given: [[String.raw`a = 10\ \text{см}`, ''], [String.raw`Q,\ 2Q,\ \dots,\ 6Q;\ Q = 0{,}1\ \text{мкКл}`, '']],
    find: String.raw`F \;—\; ?`,
    formulas: [COUL, SUPER],
    steps: [
      { title: 'Пары противоположных вершин',
        text: 'Центр удалён от каждой вершины на a. Заряды Q и 4Q, 2Q и 5Q, 3Q и 6Q стоят друг против друга; каждая пара даёт силу 3kQ²/a², направленную к меньшему заряду.',
        tex: String.raw`F_0 = \frac{3Q^2}{4\pi\varepsilon_0a^2}` },
      { title: 'Сумма трёх векторов',
        text: 'Три одинаковые силы направлены к вершинам Q, 2Q, 3Q — под углами 0°, 60°, 120°. Их сумма вдвое больше каждой.',
        tex: String.raw`F = 2F_0 = \frac{6Q^2}{4\pi\varepsilon_0a^2} = \frac{6\cdot9\cdot10^9\cdot10^{-14}}{0{,}01} = 54\ \text{мН}` },
    ],
    answer: [String.raw`F = 54\ \text{мН}`],
  },

  /* ===================== 13.8 ===================== */
  {
    id: '13.8', chapter: CH, section: S1, page: '208',
    title: 'Заряды шаров по двум силам (отталкивание)',
    given: [[String.raw`r = 60\ \text{см}`, ''], [String.raw`F_1 = 70\ \text{мкН},\ F_2 = 160\ \text{мкН}`, '']],
    find: String.raw`Q_1,\ Q_2 \;—\; ?`,
    formulas: [COUL],
    steps: [
      { title: 'Два уравнения',
        text: 'После соприкосновения одинаковые шары делят заряд поровну: по (Q₁ + Q₂)/2.',
        tex: String.raw`Q_1Q_2 = 4\pi\varepsilon_0r^2F_1 = 2{,}80\cdot10^{-15},\qquad Q_1 + Q_2 = 2r\sqrt{4\pi\varepsilon_0F_2} = 1{,}60\cdot10^{-7}` },
      { title: 'Корни квадратного уравнения',
        tex: String.raw`Q_{1,2} = \frac{1{,}60 \pm 1{,}20}{2}\cdot10^{-7}:\quad Q_1 = 0{,}14\ \text{мкКл},\ Q_2 = 20\ \text{нКл}` },
    ],
    answer: [String.raw`Q_1 = 0{,}14\ \text{мкКл};\quad Q_2 = 20\ \text{нКл}`],
  },

  /* ===================== 13.9 ===================== */
  {
    id: '13.9', chapter: CH, section: S1, page: '208',
    title: 'Заряды шаров по двум силам (притяжение)',
    given: [[String.raw`r = 30\ \text{см}`, ''], [String.raw`F_1 = 90\ \text{мкН}\ (\text{притяжение})`, ''], [String.raw`F_2 = 160\ \text{мкН}`, '']],
    find: String.raw`Q_1,\ Q_2 \;—\; ?`,
    formulas: [COUL],
    steps: [
      { title: 'Заряды разного знака',
        tex: String.raw`Q_1Q_2 = -4\pi\varepsilon_0r^2F_1 = -9{,}0\cdot10^{-16},\qquad Q_1 + Q_2 = 2r\sqrt{4\pi\varepsilon_0F_2} = 8{,}0\cdot10^{-8}` },
      { title: 'Корни',
        tex: String.raw`Q_{1,2} = \frac{8{,}0 \pm 10{,}0}{2}\cdot10^{-8}:\quad Q_1 = 0{,}09\ \text{мкКл},\ Q_2 = -0{,}01\ \text{мкКл}` },
    ],
    answer: [String.raw`Q_1 = 0{,}09\ \text{мкКл};\quad Q_2 = -0{,}01\ \text{мкКл}`],
  },

  /* ===================== 13.10 ===================== */
  {
    id: '13.10', chapter: CH, section: S1, page: '208',
    title: 'Равновесие третьего заряда',
    given: [[String.raw`Q\ \text{и}\ 4Q`, ''], [String.raw`l = 60\ \text{см}`, '']],
    find: String.raw`x,\ \text{знак}\ Q_1 \;—\; ?`,
    formulas: [COUL],
    steps: [
      { title: 'Где силы уравновешены',
        text: 'Только между зарядами силы направлены противоположно.',
        tex: String.raw`\frac{Q}{(l - x)^2} = \frac{4Q}{x^2} \;\Rightarrow\; x = 2(l - x) \;\Rightarrow\; x = \frac23l = 40\ \text{см от}\ 4Q` },
      { title: 'Устойчивость вдоль прямой',
        text: 'Если Q₁ положителен, при сдвиге к любому заряду отталкивание от него растёт и возвращает Q₁ назад — равновесие устойчиво. Отрицательный заряд при сдвиге притянулся бы сильнее и ушёл.' },
    ],
    answer: [String.raw`x = 40\ \text{см от заряда}\ 4Q;\ Q_1 > 0`],
  },

  /* ===================== 13.11 ===================== */
  {
    id: '13.11', chapter: CH, section: S1, page: '208',
    title: 'Три свободных заряда в равновесии',
    given: [[String.raw`Q_1 = 180\ \text{нКл},\ Q_2 = 720\ \text{нКл}`, ''], [String.raw`l = 60\ \text{см}`, '']],
    find: String.raw`l_1,\ Q_3 \;—\; ?`,
    formulas: [COUL],
    steps: [
      { title: 'Место',
        text: 'Q₂ = 4Q₁ — как в задаче 13.10: точка между зарядами, l₁ = 20 см от Q₁.' },
      { title: 'Заряд',
        text: 'Q₃ должен удерживать заряд Q₁ от отталкивания Q₂ — он отрицательный:',
        tex: String.raw`\frac{Q_1|Q_3|}{l_1^2} = \frac{Q_1Q_2}{l^2} \;\Rightarrow\; |Q_3| = Q_2\left(\frac{l_1}{l}\right)^2 = \frac{720}{9} = 80\ \text{нКл}` },
      { title: 'Устойчивость',
        text: 'Равновесие свободных зарядов неустойчиво: любое малое смещение нарастает (теорема Ирншоу).' },
    ],
    answer: [String.raw`l_1 = 20\ \text{см от}\ Q_1;\quad Q_3 = -8\cdot10^{-8}\ \text{Кл};\ \text{неустойчивое}`],
  },

  /* ===================== 13.12 ===================== */
  {
    id: '13.12', chapter: CH, section: S1, page: '208',
    title: 'Заряд в центре треугольника',
    given: [[String.raw`Q = 1\ \text{нКл}`, '']],
    find: String.raw`Q_1 \;—\; ?`,
    formulas: [COUL, SUPER],
    steps: [
      { title: 'Отталкивание одной вершины',
        text: 'Две силы kQ²/a² под углом 60°, их сумма направлена от центра:',
        tex: String.raw`F = 2\frac{kQ^2}{a^2}\cos30^\circ = \sqrt3\frac{kQ^2}{a^2}` },
      { title: 'Притяжение к центру',
        text: String.raw`Центр удалён от вершины на $a/\sqrt3$:`,
        tex: String.raw`\frac{kQ|Q_1|}{a^2/3} = \sqrt3\frac{kQ^2}{a^2} \;\Rightarrow\; |Q_1| = \frac{Q}{\sqrt3} = 0{,}577\ \text{нКл}` },
      { title: 'Устойчивость',
        text: 'Не устойчиво: при малом смещении зарядов силы их уже не возвращают.' },
    ],
    answer: [String.raw`Q_1 = -\frac{Q}{\sqrt3} = -0{,}577\ \text{нКл};\ \text{неустойчиво}`],
  },

  /* ===================== 13.13 ===================== */
  {
    id: '13.13', chapter: CH, section: S1, page: '208–209',
    title: 'Заряд в центре квадрата',
    given: [[String.raw`Q = 0{,}3\ \text{нКл}`, '']],
    find: String.raw`Q_1 \;—\; ?`,
    formulas: [COUL, SUPER],
    steps: [
      { title: 'Отталкивание одной вершины',
        text: 'Две соседние вершины на расстоянии a (их силы под прямым углом) и противоположная на a√2:',
        tex: String.raw`F = \sqrt2\frac{kQ^2}{a^2} + \frac{kQ^2}{2a^2} = \left(\sqrt2 + \frac12\right)\frac{kQ^2}{a^2}` },
      { title: 'Притяжение к центру',
        text: String.raw`Центр на расстоянии $a/\sqrt2$:`,
        tex: String.raw`\frac{2kQ|Q_1|}{a^2} = \left(\sqrt2 + \frac12\right)\frac{kQ^2}{a^2} \;\Rightarrow\; |Q_1| = \frac12\left(\sqrt2 + \frac12\right)Q = 0{,}287\ \text{нКл}` },
    ],
    answer: [String.raw`Q_1 = -0{,}287\ \text{нКл}`],
  },

  /* ===================== 13.14 ===================== */
  {
    id: '13.14', chapter: CH, section: S2, page: '209',
    title: 'Стержень и заряд на его оси',
    given: [[String.raw`l = 10\ \text{см}`, ''], [String.raw`\tau = 10^3\ \text{нКл/м}`, String.raw`10^{-6}\ \text{Кл/м}`], [String.raw`a = 20\ \text{см}`, ''], [String.raw`Q = 100\ \text{нКл}`, String.raw`10^{-7}\ \text{Кл}`]],
    find: String.raw`F \;—\; ?`,
    formulas: [DQ],
    steps: [
      { title: 'Все силы направлены вдоль оси',
        text: 'Элемент стержня dx на расстоянии x от заряда:',
        tex: String.raw`F = \frac{Q\tau}{4\pi\varepsilon_0}\int_a^{a + l}\frac{dx}{x^2} = \frac{Q\tau}{4\pi\varepsilon_0}\left(\frac1a - \frac{1}{a + l}\right) = \frac{Q\tau l}{4\pi\varepsilon_0a(a + l)}` },
      { title: 'Числа',
        tex: String.raw`F = 9\cdot10^9\cdot10^{-7}\cdot10^{-6}\cdot\frac{0{,}1}{0{,}2\cdot0{,}3} = 1{,}5\ \text{мН}` },
    ],
    answer: [String.raw`F = 1{,}5\ \text{мН}`],
  },

  /* ===================== 13.15 ===================== */
  {
    id: '13.15', chapter: CH, section: S2, page: '209',
    title: 'Длинный стержень и заряд на оси',
    given: [[String.raw`\tau = 10^4\ \text{нКл/м}`, String.raw`10^{-5}\ \text{Кл/м}`], [String.raw`a = 20\ \text{см}`, ''], [String.raw`Q = 10\ \text{нКл}`, '']],
    find: String.raw`F \;—\; ?`,
    formulas: [DQ],
    steps: [
      { title: 'Предел l → ∞ в задаче 13.14',
        tex: String.raw`F = \frac{Q\tau}{4\pi\varepsilon_0a} = \frac{9\cdot10^9\cdot10^{-8}\cdot10^{-5}}{0{,}2} = 4{,}5\ \text{мН}` },
    ],
    answer: [String.raw`F = 4{,}5\ \text{мН}`],
  },

  /* ===================== 13.16 ===================== */
  {
    id: '13.16', chapter: CH, section: S2, page: '209',
    title: 'Заряд против конца длинного стержня',
    given: [[String.raw`\tau = 10^4\ \text{нКл/м}`, ''], [String.raw`a = 20\ \text{см}`, ''], [String.raw`Q = 10\ \text{нКл}`, '']],
    find: String.raw`F \;—\; ?`,
    formulas: [DQ],
    steps: [
      { title: 'Составляющие силы',
        text: 'Элемент стержня на расстоянии y от конца виден из заряда под углом φ, y = a·tgφ. Интегрируем от 0 до 90°:',
        tex: String.raw`F_\perp = \frac{Q\tau}{4\pi\varepsilon_0a}\int_0^{\pi/2}\cos\varphi\,d\varphi = \frac{Q\tau}{4\pi\varepsilon_0a},\qquad F_\parallel = \frac{Q\tau}{4\pi\varepsilon_0a}\int_0^{\pi/2}\sin\varphi\,d\varphi = \frac{Q\tau}{4\pi\varepsilon_0a}` },
      { title: 'Модуль',
        text: 'Сила направлена под 45° к стержню.',
        tex: String.raw`F = \frac{\sqrt2Q\tau}{4\pi\varepsilon_0a} = \sqrt2\cdot4{,}5 = 6{,}36\ \text{мН}` },
    ],
    answer: [String.raw`F = \frac{\sqrt2Q\tau}{4\pi\varepsilon_0a} = 6{,}36\ \text{мН}`],
  },

  /* ===================== 13.17 ===================== */
  {
    id: '13.17', chapter: CH, section: S2, page: '209',
    title: 'Короткая нить и заряд против середины',
    given: [[String.raw`l = 20\ \text{см}`, ''], [String.raw`\tau = 10\ \text{нКл/м}`, ''], [String.raw`a = 10\ \text{см}`, ''], [String.raw`Q = 1\ \text{нКл}`, '']],
    find: String.raw`F \;—\; ?`,
    formulas: [DQ],
    steps: [
      { title: 'Остаётся только перпендикулярная составляющая',
        text: 'По симметрии продольные силы от двух половин гасятся. Нить видна из заряда под углами ±φ₀, tgφ₀ = (l/2)/a = 1, φ₀ = 45°.',
        tex: String.raw`F = \frac{Q\tau}{4\pi\varepsilon_0a}\int_{-\varphi_0}^{\varphi_0}\cos\varphi\,d\varphi = \frac{Q\tau}{2\pi\varepsilon_0a}\sin\varphi_0` },
      { title: 'Числа',
        tex: String.raw`F = \frac{2\cdot9\cdot10^9\cdot10^{-9}\cdot10^{-8}}{0{,}1}\cdot\frac{\sqrt2}{2} = 1{,}27\ \text{мкН}` },
    ],
    answer: [String.raw`F = 1{,}27\ \text{мкН}`],
  },

  /* ===================== 13.18 ===================== */
  {
    id: '13.18', chapter: CH, section: S2, page: '209',
    title: 'Заряд около середины длинного стержня',
    given: [[String.raw`\tau = 10^4\ \text{нКл/м}`, ''], [String.raw`Q = 10\ \text{нКл}`, ''], [String.raw`a = 20\ \text{см}`, '']],
    find: String.raw`F \;—\; ?`,
    formulas: [DQ],
    steps: [
      { title: 'Бесконечная нить (φ₀ → 90° в задаче 13.17)',
        tex: String.raw`F = \frac{Q\tau}{2\pi\varepsilon_0a} = \frac{2\cdot9\cdot10^9\cdot10^{-8}\cdot10^{-5}}{0{,}2} = 9\ \text{мН}` },
    ],
    answer: [String.raw`F = 9\ \text{мН}`],
  },

  /* ===================== 13.19 ===================== */
  {
    id: '13.19', chapter: CH, section: S2, page: '209',
    title: 'Нить, согнутая под прямым углом',
    given: [[String.raw`\tau = 1\ \text{мкКл/м}`, ''], [String.raw`Q = 0{,}1\ \text{мкКл}`, ''], [String.raw`a = 50\ \text{см}`, '']],
    find: String.raw`F \;—\; ?`,
    formulas: [DQ, SUPER],
    steps: [
      { title: 'Сторона, на продолжении которой заряд',
        text: 'Это задача 13.15: сила вдоль этой стороны, от вершины.',
        tex: String.raw`F_1 = \frac{Q\tau}{4\pi\varepsilon_0a}` },
      { title: 'Перпендикулярная сторона',
        text: 'Заряд лежит на перпендикуляре к ней, восставленном из её конца, — задача 13.16: две равные составляющие.',
        tex: String.raw`F_{2\parallel} = F_{2\perp} = \frac{Q\tau}{4\pi\varepsilon_0a}` },
      { title: 'Сложение',
        text: 'Вдоль первой стороны силы складываются (2 части), поперёк — одна часть.',
        tex: String.raw`F = \frac{Q\tau}{4\pi\varepsilon_0a}\sqrt{2^2 + 1^2} = \sqrt5\cdot\frac{9\cdot10^9\cdot10^{-7}\cdot10^{-6}}{0{,}5} = 4{,}02\ \text{мН}` },
    ],
    answer: [String.raw`F = \frac{\sqrt5Q\tau}{4\pi\varepsilon_0a} = 4{,}02\ \text{мН}`],
  },

  /* ===================== 13.20 ===================== */
  {
    id: '13.20', chapter: CH, section: S2, page: '209',
    title: 'Заряд на оси заряженного кольца',
    note: MISMATCH + String.raw`В книге $F_1 = 15{,}7$ «кН». По формуле самой книги $\frac{9\cdot10^9\cdot10^{-7}\cdot10^{-8}\cdot0{,}2}{(0{,}05)^{3/2}} = 1{,}61\cdot10^{-4}$ Н $= 161$ мкН: ошибка и в единицах, и в числе. Случай 2 совпадает.`,
    given: [[String.raw`R = 10\ \text{см}`, ''], [String.raw`Q = 10^2\ \text{нКл}`, String.raw`10^{-7}\ \text{Кл}`], [String.raw`Q_1 = 10\ \text{нКл}`, String.raw`10^{-8}\ \text{Кл}`], [String.raw`l_1 = 20\ \text{см};\ l_2 = 2\ \text{м}`, '']],
    find: String.raw`F \;—\; ?`,
    formulas: [DQ],
    steps: [
      { title: 'Сила от кольца',
        text: 'Все элементы кольца удалены на √(R² + l²); поперечные составляющие гасятся, продольные складываются с множителем l/√(R² + l²).',
        tex: String.raw`F = \frac{QQ_1l}{4\pi\varepsilon_0(R^2 + l^2)^{3/2}}` },
      { title: '1) l = 20 см',
        tex: String.raw`F_1 = \frac{9\cdot10^{-6}\cdot0{,}2}{(0{,}05)^{3/2}} = \frac{1{,}8\cdot10^{-6}}{0{,}0112} = 161\ \text{мкН}` },
      { title: '2) l = 2 м ≫ R',
        text: 'Кольцо далеко — оно действует как точечный заряд.',
        tex: String.raw`F_2 \approx \frac{QQ_1}{4\pi\varepsilon_0l_2^2} = \frac{9\cdot10^{-6}}{4} = 2{,}25\ \text{мкН}` },
    ],
    answer: [String.raw`1)\ F_1 = 161\ \text{мкН};\quad 2)\ F_2 = 2{,}25\ \text{мкН}`],
  },

  /* ===================== 13.21 ===================== */
  {
    id: '13.21', chapter: CH, section: S2, page: '209–210',
    title: 'Заряд в центре полукольца',
    given: [[String.raw`R = 10\ \text{см}`, ''], [String.raw`\tau = 10^3\ \text{нКл/м}`, String.raw`10^{-6}\ \text{Кл/м}`], [String.raw`Q = 20\ \text{нКл}`, '']],
    find: String.raw`F \;—\; ?`,
    formulas: [DQ],
    steps: [
      { title: 'Интегрируем по углу',
        text: String.raw`Элемент дуги $dl = R\,d\varphi$ на расстоянии R. Поперёк оси симметрии силы гасятся, вдоль — множитель $\sin\varphi$:`,
        tex: String.raw`F = \frac{Q\tau R}{4\pi\varepsilon_0R^2}\int_0^\pi\sin\varphi\,d\varphi = \frac{Q\tau}{2\pi\varepsilon_0R}` },
      { title: 'Числа',
        tex: String.raw`F = \frac{2\cdot9\cdot10^9\cdot2\cdot10^{-8}\cdot10^{-6}}{0{,}1} = 3{,}6\ \text{мН}` },
    ],
    answer: [String.raw`F = \frac{Q\tau}{2\pi\varepsilon_0R} = 3{,}6\ \text{мН}`],
  },

  /* ===================== 13.22 ===================== */
  {
    id: '13.22', chapter: CH, section: S2, page: '210',
    title: 'Сила, растягивающая кольцо',
    note: SMALL + String.raw`В книге 35 мкН; $\frac{9\cdot10^9\cdot4\cdot10^{-7}\cdot10^{-9}}{0{,}1} = 36$ мкН.`,
    given: [[String.raw`R = 10\ \text{см}`, ''], [String.raw`\tau = 1\ \text{нКл/м}`, ''], [String.raw`Q = 400\ \text{нКл}`, '']],
    find: String.raw`F \;—\; ?`,
    formulas: [DQ],
    steps: [
      { title: 'Сила на половину кольца',
        text: 'Как в задаче 13.21:',
        tex: String.raw`F_{1/2} = \frac{Q\tau}{2\pi\varepsilon_0R}` },
      { title: 'Натяжение',
        text: 'Половину кольца удерживают два «разреза» — каждый с силой натяжения F.',
        tex: String.raw`2F = F_{1/2} \;\Rightarrow\; F = \frac{Q\tau}{4\pi\varepsilon_0R} = \frac{9\cdot10^9\cdot4\cdot10^{-7}\cdot10^{-9}}{0{,}1} = 36\ \text{мкН}` },
    ],
    answer: [String.raw`F = \frac{Q\tau}{4\pi\varepsilon_0R} = 36\ \text{мкН}`],
  },

  );
})();
