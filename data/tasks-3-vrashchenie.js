/*
  § 3. Динамика вращательного движения твёрдого тела вокруг неподвижной оси — задачи 3.1–3.63 (стр. 64–75).
  3.11–3.17 — в data/tasks.js. Условия задач показываются дословно из книги (data/book-tasks.js).
  Ответы пересчитаны скриптом tools/check_vrashchenie.py и сверены с book/99-otvety.md.
  Где ответ книги расходится с расчётом — плашка note «Расхождение с ответом книги».
  g = 9,81 м/с²; 1 а. е. м. = 1,66·10⁻²⁷ кг (табл. приложения книги).
*/
(function () {
  const CH = 'Гл. 1. Физические основы механики';
  const S1 = 'Момент инерции';
  const S2 = 'Основное уравнение динамики вращательного движения';
  const S3 = 'Закон сохранения момента импульса';
  const S4 = 'Работа и энергия';
  const S5 = 'Центр масс';
  const MISMATCH = '<b>Расхождение с ответом книги.</b> ';
  const POINT = { tex: String.raw`J = mr^2`, text: 'материальная точка на расстоянии r от оси' };
  const SUM = { tex: String.raw`J = \sum J_i`, text: 'момент инерции системы — сумма моментов её частей относительно одной оси' };
  const ROD_C = { tex: String.raw`J_C = \tfrac{1}{12}ml^2`, text: 'тонкий стержень, ось через середину перпендикулярно стержню' };
  const ROD_END = { tex: String.raw`J = \tfrac13 ml^2`, text: 'тонкий стержень, ось через конец перпендикулярно стержню' };
  const STEINER = { tex: String.raw`J = J_C + ma^2`, text: 'теорема Штейнера: ось параллельна оси через центр масс C и отстоит от неё на a' };
  const DISK = { tex: String.raw`J_C = \tfrac12 mR^2`, text: 'сплошной диск (цилиндр), ось симметрии' };
  const DYN = { tex: String.raw`M = J\varepsilon`, text: 'основное уравнение динамики вращения: момент силы = момент инерции × угловое ускорение' };
  const MOM = { tex: String.raw`M = Fl`, text: 'момент силы: сила × плечо (кратчайшее расстояние от оси до линии действия силы)' };
  const LCONS = { tex: String.raw`\sum J_i\omega_i = \text{const}`, text: 'закон сохранения момента импульса (момент внешних сил относительно оси равен нулю)' };
  const LPOINT = { tex: String.raw`L = mvr`, text: 'момент импульса точки: импульс × плечо r (расстояние от оси до линии скорости)' };
  const TROT = { tex: String.raw`T = \tfrac12 J\omega^2`, text: 'кинетическая энергия вращения' };
  const TROLL = { tex: String.raw`T = \tfrac12 mv^2 + \tfrac12 J_C\omega^2,\quad v = \omega R`, text: 'кинетическая энергия тела, катящегося без скольжения' };
  const CM = { tex: String.raw`X_C = \frac{\sum m_i x_i}{\sum m_i}`, text: 'координата центра масс (так же — Y_C, Z_C)' };

  window.TASKS.push(

  /* ===================== 3.1 ===================== */
  {
    id: '3.1', chapter: CH, section: S1, page: '64',
    title: 'Материальная точка',
    given: [[String.raw`m = 0{,}3\ \text{кг}`, ''], [String.raw`r = 20\ \text{см}`, String.raw`0{,}2\ \text{м}`]],
    find: String.raw`J \;—\; ?`,
    formulas: [POINT],
    steps: [
      { title: 'Момент инерции точки',
        text: 'Вся масса сосредоточена на одном расстоянии r от оси.',
        tex: String.raw`J = mr^2 = 0{,}3\cdot0{,}2^2 = 0{,}012\ \text{кг·м}^2` },
    ],
    answer: [String.raw`J = mr^2 = 0{,}012\ \text{кг·м}^2`],
  },

  /* ===================== 3.2 ===================== */
  {
    id: '3.2', chapter: CH, section: S1, page: '64',
    title: 'Два шарика на стержне',
    given: [[String.raw`m = 10\ \text{г}`, String.raw`10^{-2}\ \text{кг}`], [String.raw`l = 20\ \text{см}`, String.raw`0{,}2\ \text{м}`]],
    find: String.raw`J \;—\; ?`,
    formulas: [POINT, SUM],
    steps: [
      { title: 'Где ось',
        text: 'Массы шариков одинаковы, поэтому центр масс — середина стержня. Каждый шарик удалён от оси на l/2; стержень невесомый.' },
      { title: 'Складываем два шарика',
        tex: String.raw`J = 2m\left(\frac l2\right)^2 = \frac{ml^2}{2} = \frac{0{,}01\cdot0{,}04}{2} = 2\cdot10^{-4}\ \text{кг·м}^2` },
    ],
    answer: [String.raw`J = \tfrac12 ml^2 = 2\cdot10^{-4}\ \text{кг·м}^2`],
  },

  /* ===================== 3.3 ===================== */
  {
    id: '3.3', chapter: CH, section: S1, page: '64',
    title: 'Шары m и 2m на стержне',
    given: [[String.raw`m = 10\ \text{г}`, String.raw`10^{-2}\ \text{кг}`], [String.raw`l = 40\ \text{см}`, String.raw`0{,}4\ \text{м}`]],
    find: String.raw`J_а,\ J_б \;—\; ?`,
    formulas: [POINT, SUM],
    steps: [
      { title: 'Что видно на рис. 3.7',
        text: 'Ось O — у конца стержня. Один шар стоит посередине (на расстоянии l/2), другой — на дальнем конце (на расстоянии l). Стержень невесомый, шары — точки.' },
      { title: 'а) посередине m, на конце 2m',
        tex: String.raw`J_а = m\left(\frac l2\right)^2 + 2ml^2 = \frac94\,ml^2 = 2{,}25\cdot0{,}01\cdot0{,}16 = 3{,}6\cdot10^{-3}\ \text{кг·м}^2` },
      { title: 'б) посередине 2m, на конце m',
        tex: String.raw`J_б = 2m\left(\frac l2\right)^2 + ml^2 = \frac32\,ml^2 = 1{,}5\cdot0{,}01\cdot0{,}16 = 2{,}4\cdot10^{-3}\ \text{кг·м}^2` },
      { title: 'Вывод',
        text: 'Масса та же, а J разный: чем дальше от оси тяжёлый шар, тем больше момент инерции.' },
    ],
    answer: [String.raw`J_а = \tfrac94 ml^2 = 3{,}6\cdot10^{-3}\ \text{кг·м}^2`, String.raw`J_б = \tfrac32 ml^2 = 2{,}4\cdot10^{-3}\ \text{кг·м}^2`],
  },

  /* ===================== 3.4 ===================== */
  {
    id: '3.4', chapter: CH, section: S1, page: '64–65',
    title: 'Три шарика в треугольнике',
    given: [[String.raw`m = 10\ \text{г}`, String.raw`10^{-2}\ \text{кг}`], [String.raw`a = 20\ \text{см}`, String.raw`0{,}2\ \text{м}`]],
    find: String.raw`J_1,\ J_2 \;—\; ?`,
    formulas: [POINT, SUM, { tex: String.raw`R = \frac{a}{\sqrt3}`, text: 'радиус окружности, описанной около равностороннего треугольника' }],
    steps: [
      { title: '1) Ось перпендикулярна плоскости через центр',
        text: 'Все три шарика лежат на описанной окружности — каждый удалён от оси на R.',
        tex: String.raw`J_1 = 3mR^2 = 3m\frac{a^2}{3} = ma^2 = 0{,}01\cdot0{,}04 = 4\cdot10^{-4}\ \text{кг·м}^2` },
      { title: '2) Ось в плоскости через центр и вершину',
        text: 'Шарик в этой вершине лежит на оси (вклад 0). Ось — высота треугольника, она делит противоположную сторону пополам, поэтому два других шарика удалены от оси на a/2.',
        tex: String.raw`J_2 = 0 + 2m\left(\frac a2\right)^2 = \frac{ma^2}{2} = 2\cdot10^{-4}\ \text{кг·м}^2` },
    ],
    answer: [String.raw`J_1 = ma^2 = 4\cdot10^{-4}\ \text{кг·м}^2`, String.raw`J_2 = \tfrac12 ma^2 = 2\cdot10^{-4}\ \text{кг·м}^2`],
  },

  /* ===================== 3.5 ===================== */
  {
    id: '3.5', chapter: CH, section: S1, page: '65',
    title: 'Молекулы H₂O и SO₂',
    note: MISMATCH + String.raw`Для SO₂ в книге $J_x = 1{,}27\cdot10^{-46}$ кг·м², а по формуле самой книги ($m_1 = 16$, $m_2 = 32$ а. е. м., $d = 0{,}145$ нм, $\alpha = 124^\circ$) выходит $1{,}23\cdot10^{-46}$ кг·м²; отсюда и $J_z = 9{,}94\cdot10^{-46}$, а не $9{,}97\cdot10^{-46}$. $J_y$ и все величины для H₂O совпадают.`,
    given: [
      [String.raw`\text{H}_2\text{O}:\ d = 0{,}097\ \text{нм},\ \alpha = 104^\circ30'`, String.raw`9{,}7\cdot10^{-11}\ \text{м}`],
      [String.raw`m_1 = m_\text{H} = 1{,}008\ \text{а.е.м.},\ m_2 = m_\text{O} = 16\ \text{а.е.м.}`, ''],
      [String.raw`\text{SO}_2:\ d = 0{,}145\ \text{нм},\ \alpha = 124^\circ`, String.raw`1{,}45\cdot10^{-10}\ \text{м}`],
      [String.raw`m_1 = m_\text{O} = 16\ \text{а.е.м.},\ m_2 = m_\text{S} = 32\ \text{а.е.м.}`, ''],
    ],
    find: String.raw`J_x,\ J_y,\ J_z \;—\; ?`,
    formulas: [POINT, SUM, CM, { tex: String.raw`J_z = J_x + J_y`, text: 'для плоской фигуры: ось z перпендикулярна плоскости xy' }],
    steps: [
      { title: 'Координаты атомов',
        text: String.raw`Атом $A$ (масса $m_2$) — на оси $y$, атомы $B$ (масса $m_1$) — симметрично, на $h = d\cos\frac\alpha2$ ниже $A$ и на $w = d\sin\frac\alpha2$ в стороны от оси $y$.` },
      { title: 'Где центр масс C',
        text: String.raw`Отсчитаем высоту от прямой, соединяющей атомы $B$. Тогда $A$ на высоте $h$, и центр масс:`,
        tex: String.raw`y_C = \frac{m_2h}{2m_1 + m_2}` },
      { title: 'Момент Jx (ось x через C)',
        text: String.raw`Расстояния до оси $x$: у атома $A$ — $h - y_C$, у атомов $B$ — $y_C$. После подстановки получается «приведённая масса» на расстоянии $h$:`,
        tex: String.raw`J_x = m_2(h - y_C)^2 + 2m_1y_C^2 = \frac{2m_1m_2}{2m_1 + m_2}\left(d\cos\frac\alpha2\right)^2` },
      { title: 'Момент Jy и Jz',
        text: String.raw`Атом $A$ лежит на оси $y$; атомы $B$ удалены от неё на $w$.`,
        tex: String.raw`J_y = 2m_1\left(d\sin\frac\alpha2\right)^2,\qquad J_z = J_x + J_y` },
      { title: 'H₂O',
        text: String.raw`$\frac\alpha2 = 52{,}25^\circ$; $h = 0{,}0594$ нм, $w = 0{,}0767$ нм; $\frac{2m_1m_2}{2m_1+m_2} = 1{,}79$ а. е. м.`,
        tex: String.raw`J_x = 1{,}05\cdot10^{-47},\quad J_y = 1{,}97\cdot10^{-47},\quad J_z = 3{,}02\cdot10^{-47}\ \text{кг·м}^2` },
      { title: 'SO₂',
        text: String.raw`$\frac\alpha2 = 62^\circ$; $h = 0{,}0681$ нм, $w = 0{,}128$ нм; $\frac{2m_1m_2}{2m_1+m_2} = 16$ а. е. м.`,
        tex: String.raw`J_x = 1{,}23\cdot10^{-46},\quad J_y = 8{,}71\cdot10^{-46},\quad J_z = 9{,}94\cdot10^{-46}\ \text{кг·м}^2` },
    ],
    answer: [
      String.raw`\text{H}_2\text{O}:\ J_x = 1{,}05\cdot10^{-47}\ \text{кг·м}^2`,
      String.raw`\text{H}_2\text{O}:\ J_y = 1{,}97\cdot10^{-47}\ \text{кг·м}^2`,
      String.raw`\text{H}_2\text{O}:\ J_z = 3{,}02\cdot10^{-47}\ \text{кг·м}^2`,
      String.raw`\text{SO}_2:\ J_x = 1{,}23\cdot10^{-46}\ \text{кг·м}^2`,
      String.raw`\text{SO}_2:\ J_y = 8{,}71\cdot10^{-46}\ \text{кг·м}^2`,
      String.raw`\text{SO}_2:\ J_z = 9{,}94\cdot10^{-46}\ \text{кг·м}^2`,
    ],
  },

  /* ===================== 3.6 ===================== */
  {
    id: '3.6', chapter: CH, section: S1, page: '65',
    title: 'Стержень: три положения оси',
    given: [[String.raw`l = 30\ \text{см}`, String.raw`0{,}3\ \text{м}`], [String.raw`m = 100\ \text{г}`, String.raw`0{,}1\ \text{кг}`]],
    find: String.raw`J_1,\ J_2,\ J_3 \;—\; ?`,
    formulas: [ROD_END, ROD_C, STEINER],
    steps: [
      { title: '1) Ось через конец',
        tex: String.raw`J_1 = \frac13 ml^2 = \frac{0{,}1\cdot0{,}09}{3} = 3\cdot10^{-3}\ \text{кг·м}^2` },
      { title: '2) Ось через середину',
        tex: String.raw`J_2 = \frac1{12}ml^2 = 0{,}75\cdot10^{-3}\ \text{кг·м}^2` },
      { title: '3) Ось на l/3 от конца',
        text: String.raw`От середины эта точка отстоит на $a = \frac l2 - \frac l3 = \frac l6$ — применяем теорему Штейнера.`,
        tex: String.raw`J_3 = \frac{ml^2}{12} + m\left(\frac l6\right)^2 = \frac{ml^2}{9} = 10^{-3}\ \text{кг·м}^2` },
    ],
    answer: [String.raw`J_1 = \tfrac13 ml^2 = 3\cdot10^{-3};\quad J_2 = \tfrac1{12}ml^2 = 0{,}75\cdot10^{-3};\quad J_3 = \tfrac19 ml^2 = 10^{-3}\ \text{кг·м}^2`],
  },

  /* ===================== 3.7 ===================== */
  {
    id: '3.7', chapter: CH, section: S1, page: '65',
    title: 'Стержень: ось в 20 см от конца',
    given: [[String.raw`l = 60\ \text{см}`, String.raw`0{,}6\ \text{м}`], [String.raw`m = 100\ \text{г}`, String.raw`0{,}1\ \text{кг}`], [String.raw`a = 20\ \text{см}`, String.raw`0{,}2\ \text{м}`]],
    find: String.raw`J \;—\; ?`,
    formulas: [ROD_C, STEINER],
    steps: [
      { title: 'Расстояние от середины до оси',
        tex: String.raw`d = \frac l2 - a = 0{,}3 - 0{,}2 = 0{,}1\ \text{м}` },
      { title: 'Теорема Штейнера',
        tex: String.raw`J = \frac{ml^2}{12} + md^2 = \frac{0{,}1\cdot0{,}36}{12} + 0{,}1\cdot0{,}01 = 3\cdot10^{-3} + 10^{-3} = 4\cdot10^{-3}\ \text{кг·м}^2` },
    ],
    answer: [String.raw`J = 4\cdot10^{-3}\ \text{кг·м}^2`],
  },

  /* ===================== 3.8 ===================== */
  {
    id: '3.8', chapter: CH, section: S1, page: '65',
    title: 'Проволочный прямоугольник',
    given: [[String.raw`a = 12\ \text{см}`, String.raw`0{,}12\ \text{м}`], [String.raw`b = 16\ \text{см}`, String.raw`0{,}16\ \text{м}`], [String.raw`\tau = 0{,}1\ \text{кг/м}`, '']],
    find: String.raw`J \;—\; ?`,
    formulas: [ROD_C, SUM, { tex: String.raw`m = \tau l`, text: 'масса куска проволоки длиной l' }],
    steps: [
      { title: 'Как проходит ось',
        text: 'Ось соединяет середины малых сторон a — значит она параллельна большим сторонам b и идёт посередине между ними.' },
      { title: 'Большие стороны',
        text: String.raw`Каждая параллельна оси, все её точки удалены от оси на $a/2$; масса стороны $\tau b$.`,
        tex: String.raw`J_b = 2\,\tau b\left(\frac a2\right)^2 = \frac{\tau a^2 b}{2}` },
      { title: 'Малые стороны',
        text: String.raw`Каждая — стержень длиной $a$ и массой $\tau a$, перпендикулярный оси и разрезанный ею пополам.`,
        tex: String.raw`J_a = 2\cdot\frac{\tau a\cdot a^2}{12} = \frac{\tau a^3}{6}` },
      { title: 'Складываем',
        tex: String.raw`J = \frac{\tau a^2}{2}\left(b + \frac a3\right) = \frac{0{,}1\cdot0{,}0144}{2}\,(0{,}16 + 0{,}04) = 1{,}44\cdot10^{-4}\ \text{кг·м}^2` },
    ],
    answer: [String.raw`J = \tfrac12\tau a^2\left(b + \tfrac a3\right) = 1{,}44\cdot10^{-4}\ \text{кг·м}^2`],
  },

  /* ===================== 3.9 ===================== */
  {
    id: '3.9', chapter: CH, section: S1, page: '65',
    title: 'Два стержня буквой Т',
    given: [[String.raw`l_1 = 40\ \text{см}`, String.raw`0{,}4\ \text{м}`], [String.raw`m_1 = 900\ \text{г}`, String.raw`0{,}9\ \text{кг}`], [String.raw`l_2 = 40\ \text{см}`, String.raw`0{,}4\ \text{м}`], [String.raw`m_2 = 400\ \text{г}`, String.raw`0{,}4\ \text{кг}`]],
    find: String.raw`J \;—\; ?`,
    formulas: [ROD_END, POINT, SUM],
    steps: [
      { title: 'Стержень AB',
        text: 'Ось OO′ проходит через его конец A перпендикулярно ему.',
        tex: String.raw`J_{AB} = \frac13 m_1l_1^2` },
      { title: 'Стержень CD',
        text: String.raw`Он параллелен оси, все его точки удалены от неё на $l_1$ — как точка массой $m_2$.`,
        tex: String.raw`J_{CD} = m_2l_1^2` },
      { title: 'Складываем',
        tex: String.raw`J = \left(\frac{m_1}{3} + m_2\right)l_1^2 = (0{,}3 + 0{,}4)\cdot0{,}16 = 0{,}112\ \text{кг·м}^2` },
    ],
    answer: [String.raw`J = \left(\tfrac{m_1}{3} + m_2\right)l_1^2 = 0{,}112\ \text{кг·м}^2`],
  },

  /* ===================== 3.10 ===================== */
  {
    id: '3.10', chapter: CH, section: S1, page: '65',
    title: 'Т-образные стержни: ось через A',
    bookFig: '3.9',
    note: MISMATCH + String.raw`В книге формула $J = \frac13(m_1 + 3m_2)l_1^2 + \frac1{12}m_2l_2^2$ — та же, что здесь, но число $0{,}114$ кг·м². Подстановка даёт $0{,}112 + 0{,}0053 = 0{,}117$ кг·м².`,
    given: [[String.raw`l_1 = l_2 = 0{,}4\ \text{м}`, ''], [String.raw`m_1 = 0{,}9\ \text{кг}`, ''], [String.raw`m_2 = 0{,}4\ \text{кг}`, '']],
    find: String.raw`J \;—\; ?`,
    formulas: [ROD_END, ROD_C, STEINER],
    steps: [
      { title: 'Стержень AB',
        text: 'Ось через A перпендикулярна плоскости рисунка, значит и стержню AB.',
        tex: String.raw`J_{AB} = \frac13 m_1l_1^2 = 0{,}048\ \text{кг·м}^2` },
      { title: 'Стержень CD',
        text: String.raw`Его середина — точка $B$, на расстоянии $l_1$ от оси; ось перпендикулярна CD. Теорема Штейнера:`,
        tex: String.raw`J_{CD} = \frac1{12}m_2l_2^2 + m_2l_1^2 = 0{,}0053 + 0{,}064 = 0{,}0693\ \text{кг·м}^2` },
      { title: 'Складываем',
        tex: String.raw`J = \frac13(m_1 + 3m_2)l_1^2 + \frac1{12}m_2l_2^2 = 0{,}117\ \text{кг·м}^2` },
    ],
    answer: [String.raw`J = \tfrac13(m_1 + 3m_2)l_1^2 + \tfrac1{12}m_2l_2^2 \approx 0{,}117\ \text{кг·м}^2`],
  },

  /* ===================== 3.18 ===================== */
  {
    id: '3.18', chapter: CH, section: S1, page: '67',
    title: 'Пластина: ось вдоль большей стороны',
    given: [[String.raw`a = 10\ \text{см}`, String.raw`0{,}1\ \text{м}`], [String.raw`b = 20\ \text{см}`, String.raw`0{,}2\ \text{м}`], [String.raw`\sigma = 1{,}2\ \text{кг/м}^2`, '']],
    find: String.raw`J \;—\; ?`,
    formulas: [ROD_C, { tex: String.raw`m = \sigma ab`, text: 'масса пластины' }],
    steps: [
      { title: 'Сводим к стержню',
        text: String.raw`Ось параллельна стороне $b$ и проходит через центр. Разрежем пластину на полоски вдоль оси: расстояние до оси зависит только от координаты поперёк, по стороне $a$. Поэтому $J$ такой же, как у стержня длиной $a$ с осью через середину (см. задачу 3.17).`,
        tex: String.raw`J = \frac{1}{12}ma^2 = \frac{1}{12}\sigma a^3b` },
      { title: 'Числа',
        tex: String.raw`J = \frac{1{,}2\cdot0{,}001\cdot0{,}2}{12} = 2\cdot10^{-5}\ \text{кг·м}^2` },
    ],
    answer: [String.raw`J = \tfrac1{12}\sigma a^3b = 2\cdot10^{-5}\ \text{кг·м}^2`],
  },

  /* ===================== 3.19 ===================== */
  {
    id: '3.19', chapter: CH, section: S2, page: '67',
    title: 'Отклонённый стержень: ε и aτ',
    given: [[String.raw`l = 1\ \text{м}`, ''], [String.raw`1)\ a = 0,\ b = \tfrac23 l,\ \alpha = \tfrac\pi2`, ''], [String.raw`2)\ a = \tfrac l3,\ b = l,\ \alpha = \tfrac\pi3`, ''], [String.raw`3)\ a = \tfrac l4,\ b = \tfrac l2,\ \alpha = \tfrac{2\pi}3`, '']],
    find: String.raw`\varepsilon,\ a_\tau \;—\; ?`,
    formulas: [DYN, ROD_C, STEINER, { tex: String.raw`a_\tau = \varepsilon r`, text: 'тангенциальное ускорение точки на расстоянии r от оси' }],
    steps: [
      { title: 'Расстояния по рис. 3.13',
        text: String.raw`$a$ и $b$ отсчитаны от верхнего конца стержня: до оси $O$ и до точки $B$. Центр масс $C$ — середина стержня, поэтому $OC = \frac l2 - a$, а $OB = b - a$.` },
      { title: 'Момент силы тяжести',
        text: String.raw`Сила $mg$ приложена в $C$; её плечо относительно $O$ — $OC\sin\alpha$. Трения в оси нет.`,
        tex: String.raw`M = mg\,OC\sin\alpha` },
      { title: 'Момент инерции и ε',
        tex: String.raw`J = m\left(\frac{l^2}{12} + OC^2\right),\qquad \varepsilon = \frac MJ = \frac{g\,OC\sin\alpha}{\frac{l^2}{12} + OC^2}` },
      { title: '1) OC = l/2, OB = 2l/3',
        tex: String.raw`\varepsilon = \frac{3g}{2l} = 14{,}7\ \text{рад/с}^2,\quad a_\tau = \varepsilon\cdot\frac{2l}3 = g = 9{,}81\ \text{м/с}^2` },
      { title: '2) OC = l/6, OB = 2l/3',
        tex: String.raw`\varepsilon = \frac{3g}{2l}\sin\alpha = 12{,}7\ \text{рад/с}^2,\quad a_\tau = g\sin\alpha = 8{,}50\ \text{м/с}^2` },
      { title: '3) OC = l/4, OB = l/4',
        tex: String.raw`\varepsilon = \frac{12g}{7l}\sin\alpha = 14{,}6\ \text{рад/с}^2,\quad a_\tau = \frac37 g\sin\alpha = 3{,}64\ \text{м/с}^2` },
    ],
    answer: [String.raw`1)\ \varepsilon = 14{,}7\ \text{рад/с}^2,\ a_\tau = 9{,}81\ \text{м/с}^2`, String.raw`2)\ \varepsilon = 12{,}7\ \text{рад/с}^2,\ a_\tau = 8{,}50\ \text{м/с}^2`, String.raw`3)\ \varepsilon = 14{,}6\ \text{рад/с}^2,\ a_\tau = 3{,}64\ \text{м/с}^2`],
  },

  /* ===================== 3.20 ===================== */
  {
    id: '3.20', chapter: CH, section: S2, page: '67',
    title: 'Отклонённый диск: ε и aτ',
    given: [[String.raw`R = 10\ \text{см}`, String.raw`0{,}1\ \text{м}`], [String.raw`1)\ a = R,\ b = \tfrac R2,\ \alpha = \tfrac\pi2`, ''], [String.raw`2)\ a = \tfrac R2,\ b = R,\ \alpha = \tfrac\pi6`, ''], [String.raw`3)\ a = \tfrac{2R}3,\ b = \tfrac{2R}3,\ \alpha = \tfrac{2\pi}3`, '']],
    find: String.raw`\varepsilon,\ a_\tau \;—\; ?`,
    formulas: [DYN, DISK, STEINER, { tex: String.raw`a_\tau = \varepsilon r`, text: 'тангенциальное ускорение точки на расстоянии r от оси' }],
    steps: [
      { title: 'Расстояния по рис. 3.14',
        text: String.raw`$a = OC$ — от оси до центра диска, $b = CB$ — от центра до точки $B$ на продолжении $OC$. Значит $OB = a + b$.` },
      { title: 'Уравнение вращения',
        text: String.raw`Момент силы тяжести $mga\sin\alpha$, момент инерции по Штейнеру $\frac{mR^2}{2} + ma^2$:`,
        tex: String.raw`\varepsilon = \frac{ga\sin\alpha}{\frac{R^2}{2} + a^2},\qquad a_\tau = \varepsilon\,(a + b)` },
      { title: '1)',
        tex: String.raw`\varepsilon = \frac{2g}{3R} = 65{,}4\ \text{рад/с}^2,\quad a_\tau = \varepsilon\cdot\frac{3R}{2} = g = 9{,}81\ \text{м/с}^2` },
      { title: '2)',
        tex: String.raw`\varepsilon = \frac{2g}{3R}\sin\alpha = 32{,}7\ \text{рад/с}^2,\quad a_\tau = \varepsilon\cdot\frac{3R}{2} = 4{,}91\ \text{м/с}^2` },
      { title: '3)',
        tex: String.raw`\varepsilon = \frac{12g}{17R}\sin\alpha = 60{,}0\ \text{рад/с}^2,\quad a_\tau = \varepsilon\cdot\frac{4R}{3} = 8{,}00\ \text{м/с}^2` },
      { title: 'Сверка с книгой',
        text: String.raw`В книге 65,3 и 59,9 рад/с², 7,99 м/с² — так выходит с $g = 9{,}8$ м/с²; здесь $g = 9{,}81$.` },
    ],
    answer: [String.raw`1)\ 65{,}4\ \text{рад/с}^2,\ 9{,}81\ \text{м/с}^2`, String.raw`2)\ 32{,}7\ \text{рад/с}^2,\ 4{,}91\ \text{м/с}^2`, String.raw`3)\ 60{,}0\ \text{рад/с}^2,\ 8{,}00\ \text{м/с}^2`],
  },

  /* ===================== 3.21 ===================== */
  {
    id: '3.21', chapter: CH, section: S2, page: '67',
    title: 'Вращающий момент стержня',
    given: [[String.raw`l = 50\ \text{см}`, String.raw`0{,}5\ \text{м}`], [String.raw`m = 400\ \text{г}`, String.raw`0{,}4\ \text{кг}`], [String.raw`\varepsilon = 3\ \text{рад/с}^2`, '']],
    find: String.raw`M \;—\; ?`,
    formulas: [DYN, ROD_C],
    steps: [
      { title: 'Основное уравнение',
        tex: String.raw`M = J\varepsilon = \frac{ml^2}{12}\,\varepsilon = \frac{0{,}4\cdot0{,}25}{12}\cdot3 = 0{,}025\ \text{Н·м}` },
    ],
    answer: [String.raw`M = \tfrac1{12}ml^2\varepsilon = 0{,}025\ \text{Н·м}`],
  },

  /* ===================== 3.22 ===================== */
  {
    id: '3.22', chapter: CH, section: S2, page: '67–68',
    title: 'Маховик и опускающийся груз',
    given: [[String.raw`R = 5\ \text{см}`, String.raw`0{,}05\ \text{м}`], [String.raw`m = 0{,}4\ \text{кг}`, ''], [String.raw`s = 1{,}8\ \text{м}`, ''], [String.raw`t = 3\ \text{с}`, '']],
    find: String.raw`J \;—\; ?`,
    formulas: [DYN, { tex: String.raw`ma = mg - T`, text: 'второй закон Ньютона для груза' }, { tex: String.raw`s = \frac{at^2}{2},\quad \varepsilon = \frac aR`, text: 'равноускоренное движение; шнур не проскальзывает' }],
    steps: [
      { title: 'Ускорение груза',
        tex: String.raw`a = \frac{2s}{t^2} = \frac{3{,}6}{9} = 0{,}4\ \text{м/с}^2` },
      { title: 'Груз и маховик',
        text: String.raw`Груз: $mg - T = ma$. Маховик (шкив лёгкий): момент силы натяжения $TR = J\varepsilon = J\frac aR$.`,
        tex: String.raw`J = \frac{TR^2}{a} = \frac{m(g - a)R^2}{a} = mR^2\left(\frac{gt^2}{2s} - 1\right)` },
      { title: 'Числа',
        tex: String.raw`J = 0{,}4\cdot0{,}0025\left(\frac{9{,}81}{0{,}4} - 1\right) = 0{,}0235\ \text{кг·м}^2` },
    ],
    answer: [String.raw`J = mR^2\left(\frac{gt^2}{2s} - 1\right) = 0{,}0235\ \text{кг·м}^2`],
  },

  /* ===================== 3.23 ===================== */
  {
    id: '3.23', chapter: CH, section: S2, page: '68',
    title: 'Тормозная колодка',
    given: [[String.raw`m = 100\ \text{кг}`, ''], [String.raw`R = 5\ \text{см}`, String.raw`0{,}05\ \text{м}`], [String.raw`n = 8\ \text{с}^{-1}`, ''], [String.raw`F = 40\ \text{Н}`, ''], [String.raw`t = 10\ \text{с}`, '']],
    find: String.raw`\mu \;—\; ?`,
    formulas: [DYN, DISK, { tex: String.raw`F_\text{тр} = \mu F`, text: 'сила трения скольжения; колодка прижата силой F' }],
    steps: [
      { title: 'Угловое замедление',
        text: 'Вал — сплошной цилиндр, вращение равнозамедленное до остановки.',
        tex: String.raw`\omega_0 = 2\pi n,\qquad \varepsilon = \frac{\omega_0}{t} = \frac{2\pi n}{t}` },
      { title: 'Момент силы трения',
        tex: String.raw`\mu FR = J\varepsilon = \frac{mR^2}{2}\cdot\frac{2\pi n}{t} \;\Rightarrow\; \mu = \frac{\pi mRn}{Ft}` },
      { title: 'Числа',
        tex: String.raw`\mu = \frac{3{,}14\cdot100\cdot0{,}05\cdot8}{40\cdot10} = 0{,}31` },
    ],
    answer: [String.raw`\mu = \frac{\pi mRn}{Ft} = 0{,}31`],
  },

  /* ===================== 3.24 ===================== */
  {
    id: '3.24', chapter: CH, section: S2, page: '68',
    title: 'Цилиндр на ленте',
    given: [[String.raw`1)\ J = \tfrac12 mR^2\ (\text{сплошной})`, ''], [String.raw`2)\ J = mR^2\ (\text{полый})`, '']],
    find: String.raw`a \;—\; ?`,
    formulas: [DYN, { tex: String.raw`ma = mg - T`, text: 'второй закон Ньютона для движения оси цилиндра' }],
    steps: [
      { title: 'Уравнения',
        text: String.raw`Лента сматывается без проскальзывания, поэтому $\varepsilon = a/R$. Момент силы натяжения $T$ относительно оси цилиндра — $TR$.`,
        tex: String.raw`mg - T = ma,\qquad TR = J\frac aR` },
      { title: 'Общий ответ',
        tex: String.raw`a = \frac{g}{1 + \frac{J}{mR^2}}` },
      { title: '1) Сплошной и 2) полый',
        tex: String.raw`a_1 = \frac{g}{1 + \frac12} = \frac23 g = 6{,}54\ \text{м/с}^2,\qquad a_2 = \frac g2 = 4{,}91\ \text{м/с}^2` },
    ],
    answer: [String.raw`1)\ a = \tfrac23 g = 6{,}54\ \text{м/с}^2;\quad 2)\ a = \tfrac12 g = 4{,}91\ \text{м/с}^2`],
  },

  /* ===================== 3.25 ===================== */
  {
    id: '3.25', chapter: CH, section: S2, page: '68',
    title: 'Грузики на блоке-диске',
    given: [[String.raw`m_1 = 100\ \text{г}`, String.raw`0{,}1\ \text{кг}`], [String.raw`m_2 = 110\ \text{г}`, String.raw`0{,}11\ \text{кг}`], [String.raw`m = 400\ \text{г}`, String.raw`0{,}4\ \text{кг}`]],
    find: String.raw`a \;—\; ?`,
    formulas: [DYN, DISK, { tex: String.raw`m\mathbf a = \sum\mathbf F`, text: 'второй закон Ньютона для каждого грузика' }],
    steps: [
      { title: 'Натяжения по обе стороны разные',
        text: String.raw`Блок массивный: чтобы его раскрутить, нужна разность натяжений. Грузики: $m_2g - T_2 = m_2a$, $T_1 - m_1g = m_1a$. Блок: $(T_2 - T_1)R = \frac{mR^2}{2}\cdot\frac aR$.` },
      { title: 'Складываем уравнения',
        tex: String.raw`a = \frac{(m_2 - m_1)g}{m_1 + m_2 + \frac m2} = \frac{2(m_2 - m_1)}{m + 2m_1 + 2m_2}\,g = \frac{0{,}02\cdot9{,}81}{0{,}82} = 0{,}24\ \text{м/с}^2` },
    ],
    answer: [String.raw`a = \frac{2(m_2 - m_1)}{m + 2m_1 + 2m_2}g = 0{,}24\ \text{м/с}^2`],
  },

  /* ===================== 3.26 ===================== */
  {
    id: '3.26', chapter: CH, section: S2, page: '68',
    title: 'Брусок на столе и блок-обод',
    given: [[String.raw`m_1 = 0{,}25\ \text{кг}`, ''], [String.raw`m_2 = 0{,}15\ \text{кг}`, ''], [String.raw`\mu = 0{,}2`, ''], [String.raw`m = 0{,}1\ \text{кг}`, '']],
    find: String.raw`a,\ T_1,\ T_2 \;—\; ?`,
    formulas: [DYN, { tex: String.raw`J = mR^2`, text: 'масса блока распределена по ободу (тонкое кольцо)' }, { tex: String.raw`m\mathbf a = \sum\mathbf F`, text: 'второй закон Ньютона' }],
    steps: [
      { title: 'Уравнения для трёх тел',
        text: String.raw`Тело на столе: $T_1 - \mu m_1g = m_1a$. Висящее тело: $m_2g - T_2 = m_2a$. Блок: $(T_2 - T_1)R = mR^2\cdot\frac aR$, т. е. $T_2 - T_1 = ma$.` },
      { title: 'Ускорение',
        text: 'Складываем три уравнения — натяжения сокращаются:',
        tex: String.raw`a = \frac{m_2 - \mu m_1}{m_1 + m_2 + m}\,g = \frac{0{,}15 - 0{,}05}{0{,}5}\cdot9{,}81 = 1{,}96\ \text{м/с}^2` },
      { title: 'Натяжения',
        tex: String.raw`T_1 = m_1(a + \mu g) = 0{,}25\cdot3{,}92 = 0{,}98\ \text{Н},\qquad T_2 = m_2(g - a) = 0{,}15\cdot7{,}85 = 1{,}18\ \text{Н}` },
    ],
    answer: [String.raw`a = 1{,}96\ \text{м/с}^2;\quad T_1 = 0{,}98\ \text{Н};\quad T_2 = 1{,}18\ \text{Н}`],
  },

  /* ===================== 3.27 ===================== */
  {
    id: '3.27', chapter: CH, section: S2, page: '68',
    title: 'Блок-обод и два груза',
    given: [[String.raw`m = 0{,}2\ \text{кг}`, ''], [String.raw`m_1 = 0{,}3\ \text{кг}`, ''], [String.raw`m_2 = 0{,}5\ \text{кг}`, '']],
    find: String.raw`T_1,\ T_2 \;—\; ?`,
    formulas: [DYN, { tex: String.raw`J = mR^2`, text: 'масса блока распределена по ободу' }, { tex: String.raw`m\mathbf a = \sum\mathbf F`, text: 'второй закон Ньютона' }],
    steps: [
      { title: 'Уравнения',
        text: String.raw`Лёгкий груз поднимается: $T_1 - m_1g = m_1a$; тяжёлый опускается: $m_2g - T_2 = m_2a$; блок: $T_2 - T_1 = ma$.`,
        tex: String.raw`a = \frac{(m_2 - m_1)g}{m_1 + m_2 + m} = \frac{0{,}2\cdot9{,}81}{1{,}0} = 1{,}96\ \text{м/с}^2` },
      { title: 'Натяжения',
        tex: String.raw`T_1 = m_1(g + a) = \frac{m_1(m + 2m_2)}{m_1 + m_2 + m}g = 3{,}53\ \text{Н},\qquad T_2 = m_2(g - a) = \frac{m_2(m + 2m_1)}{m_1 + m_2 + m}g = 3{,}92\ \text{Н}` },
    ],
    answer: [String.raw`T_1 = 3{,}53\ \text{Н};\quad T_2 = 3{,}92\ \text{Н}`],
  },

  /* ===================== 3.28 ===================== */
  {
    id: '3.28', chapter: CH, section: S2, page: '68',
    title: 'Шар: закон изменения момента',
    given: [[String.raw`m = 10\ \text{кг}`, ''], [String.raw`R = 20\ \text{см}`, String.raw`0{,}2\ \text{м}`], [String.raw`\varphi = A + Bt^2 + Ct^3`, ''], [String.raw`B = 4\ \text{рад/с}^2,\ C = -1\ \text{рад/с}^3`, ''], [String.raw`t = 2\ \text{с}`, '']],
    find: String.raw`M(t),\ M \;—\; ?`,
    formulas: [DYN, { tex: String.raw`J = \tfrac25 mR^2`, text: 'шар, ось через центр' }, { tex: String.raw`\varepsilon = \ddot\varphi`, text: 'угловое ускорение — вторая производная угла по времени' }],
    steps: [
      { title: 'Угловое ускорение',
        tex: String.raw`\omega = 2Bt + 3Ct^2,\qquad \varepsilon = 2B + 6Ct` },
      { title: 'Закон изменения момента',
        tex: String.raw`M = J\varepsilon = \frac25 mR^2(2B + 6Ct) = \frac45 mR^2(B + 3Ct)` },
      { title: 'При t = 2 с',
        tex: String.raw`M = 0{,}8\cdot10\cdot0{,}04\,(4 - 6) = -0{,}64\ \text{Н·м}` },
      { title: 'Что значит минус',
        text: 'Момент направлен против начального вращения — шар в этот момент тормозится.' },
    ],
    answer: [String.raw`M = \tfrac45 mR^2(B + 3Ct);\quad M(2\ \text{с}) = -0{,}64\ \text{Н·м}`],
  },

  /* ===================== 3.29 ===================== */
  {
    id: '3.29', chapter: CH, section: S3, page: '68–69',
    title: 'Шарик прилипает к стержню',
    given: [[String.raw`m_1 = 0{,}2\ \text{кг}`, ''], [String.raw`l = 1\ \text{м}`, ''], [String.raw`v = 10\ \text{м/с}`, ''], [String.raw`m_2 = 10\ \text{г}`, String.raw`0{,}01\ \text{кг}`], [String.raw`AO = a:\ \tfrac l2;\ \tfrac l3;\ \tfrac l4`, '']],
    find: String.raw`\omega,\ u \;—\; ?`,
    formulas: [LCONS, LPOINT, ROD_C, STEINER],
    steps: [
      { title: 'Почему сохраняется момент импульса',
        text: 'Удар короткий: сила тяжести и реакция оси за это время момента относительно оси не создают (реакция проходит через ось, стержень ещё вертикален). Импульс не сохраняется — ось его забирает, а момент импульса относительно оси сохраняется.' },
      { title: 'До и после удара',
        text: String.raw`По рис. 3.16 шарик попадает в верхний конец $A$, ось $O$ на расстоянии $a$ ниже. Плечо скорости шарика — $a$. После удара стержень с шариком вращаются вместе.`,
        tex: String.raw`m_2va = \left[m_1\left(\frac{l^2}{12} + \left(\frac l2 - a\right)^2\right) + m_2a^2\right]\omega,\qquad u = \omega\,(l - a)` },
      { title: '1) a = l/2',
        tex: String.raw`\omega = \frac{6m_2v}{(m_1 + 3m_2)l} = 2{,}61\ \text{рад/с},\quad u = \omega\frac l2 = 1{,}30\ \text{м/с}` },
      { title: '2) a = l/3',
        tex: String.raw`\omega = \frac{3m_2v}{(m_1 + m_2)l} = 1{,}43\ \text{рад/с},\quad u = \omega\frac{2l}3 = 0{,}952\ \text{м/с}` },
      { title: '3) a = l/4',
        tex: String.raw`\omega = \frac{4m_2v}{\left(\frac73 m_1 + m_2\right)l} = 0{,}839\ \text{рад/с},\quad u = \omega\frac{3l}4 = 0{,}629\ \text{м/с}` },
    ],
    answer: [String.raw`1)\ \omega = 2{,}61\ \text{рад/с},\ u = 1{,}30\ \text{м/с}`, String.raw`2)\ \omega = 1{,}43\ \text{рад/с},\ u = 0{,}952\ \text{м/с}`, String.raw`3)\ \omega = 0{,}839\ \text{рад/с},\ u = 0{,}629\ \text{м/с}`],
  },

  /* ===================== 3.30 ===================== */
  {
    id: '3.30', chapter: CH, section: S3, page: '69',
    title: 'Шарик прилипает к диску',
    given: [[String.raw`m_1 = 0{,}2\ \text{кг}`, ''], [String.raw`R = 20\ \text{см}`, String.raw`0{,}2\ \text{м}`], [String.raw`v = 10\ \text{м/с}`, ''], [String.raw`m_2 = 10\ \text{г}`, String.raw`0{,}01\ \text{кг}`]],
    find: String.raw`\omega,\ u \;—\; ?`,
    formulas: [LCONS, LPOINT, DISK, POINT],
    steps: [
      { title: 'Геометрия по рис. 3.17',
        text: String.raw`Ось $O$ — в центре диска. Шарик летит по прямой на расстоянии $a$ от $O$ — это плечо его скорости. Прилипает он к образующей (боковой поверхности), т. е. на расстоянии $R$ от оси. Точка $B$ — на расстоянии $b$ от оси.` },
      { title: 'Закон сохранения момента импульса',
        tex: String.raw`m_2va = \left(\frac{m_1R^2}{2} + m_2R^2\right)\omega \;\Rightarrow\; \omega = \frac{2m_2va}{(m_1 + 2m_2)R^2},\qquad u = \omega b` },
      { title: 'Числа',
        text: String.raw`Знаменатель $\frac{m_1R^2}2 + m_2R^2 = 0{,}004 + 0{,}0004 = 0{,}0044$ кг·м².`,
        tex: String.raw`\begin{aligned} &1)\ \omega = 4{,}55\ \text{рад/с},\ u = 0{,}909\ \text{м/с} \\ &2)\ \omega = 2{,}27\ \text{рад/с},\ u = 0{,}455\ \text{м/с} \\ &3)\ \omega = 3{,}03\ \text{рад/с},\ u = 0{,}303\ \text{м/с} \\ &4)\ \omega = 1{,}52\ \text{рад/с},\ u = 0{,}202\ \text{м/с} \end{aligned}` },
    ],
    answer: [String.raw`1)\ 4{,}55\ \text{рад/с},\ 0{,}909\ \text{м/с};\quad 2)\ 2{,}27\ \text{рад/с},\ 0{,}455\ \text{м/с}`, String.raw`3)\ 3{,}03\ \text{рад/с},\ 0{,}303\ \text{м/с};\quad 4)\ 1{,}52\ \text{рад/с},\ 0{,}202\ \text{м/с}`],
  },

  /* ===================== 3.31 ===================== */
  {
    id: '3.31', chapter: CH, section: S3, page: '69',
    title: 'Скамья Жуковского и мяч',
    given: [[String.raw`m = 0{,}4\ \text{кг}`, ''], [String.raw`v = 20\ \text{м/с}`, ''], [String.raw`r = 0{,}8\ \text{м}`, ''], [String.raw`J = 6\ \text{кг·м}^2`, '']],
    find: String.raw`\omega \;—\; ?`,
    formulas: [LCONS, LPOINT, POINT],
    steps: [
      { title: 'До и после',
        text: 'До: скамья неподвижна, момент импульса только у мяча. После: мяч в руке вращается вместе со скамьёй на расстоянии r.',
        tex: String.raw`mvr = (J + mr^2)\,\omega` },
      { title: 'Ответ',
        tex: String.raw`\omega = \frac{mvr}{J + mr^2} = \frac{0{,}4\cdot20\cdot0{,}8}{6 + 0{,}256} = 1{,}02\ \text{рад/с}` },
    ],
    answer: [String.raw`\omega = \frac{mvr}{J + mr^2} = 1{,}02\ \text{рад/с}`],
  },

  /* ===================== 3.32 ===================== */
  {
    id: '3.32', chapter: CH, section: S3, page: '69',
    title: 'Груз рывком раскручивает маховик',
    given: [[String.raw`R = 40\ \text{см}`, String.raw`0{,}4\ \text{м}`], [String.raw`m_1 = 48\ \text{кг}`, ''], [String.raw`m_2 = 0{,}2\ \text{кг}`, ''], [String.raw`h = 2\ \text{м}`, '']],
    find: String.raw`\omega \;—\; ?`,
    formulas: [LCONS, LPOINT, DISK, { tex: String.raw`v_0 = \sqrt{2gh}`, text: 'скорость после свободного падения с высоты h' }],
    steps: [
      { title: 'Скорость груза к моменту рывка',
        tex: String.raw`v_0 = \sqrt{2gh} = \sqrt{2\cdot9{,}81\cdot2} = 6{,}26\ \text{м/с}` },
      { title: 'Рывок нити',
        text: String.raw`Рывок короткий и неупругий (как удар): после него груз и обод движутся с одной скоростью $u = \omega R$. Силы натяжения внутренние для системы «груз + маховик», реакция оси момента не даёт — сохраняется момент импульса относительно оси.`,
        tex: String.raw`m_2v_0R = \left(\frac{m_1R^2}{2} + m_2R^2\right)\omega` },
      { title: 'Ответ',
        tex: String.raw`\omega = \frac{2m_2\sqrt{2gh}}{(m_1 + 2m_2)R} = \frac{2\cdot0{,}2\cdot6{,}26}{48{,}4\cdot0{,}4} = 0{,}129\ \text{рад/с}` },
    ],
    answer: [String.raw`\omega = \frac{2m_2\sqrt{2gh}}{(m_1 + 2m_2)R} = 0{,}129\ \text{рад/с}`],
  },

  /* ===================== 3.33 ===================== */
  {
    id: '3.33', chapter: CH, section: S3, page: '70',
    title: 'Человек идёт по краю платформы',
    given: [[String.raw`R = 2\ \text{м}`, ''], [String.raw`m_1 = 80\ \text{кг}`, ''], [String.raw`m_2 = 240\ \text{кг}`, ''], [String.raw`v = 2\ \text{м/с}\ (\text{отн. платформы})`, '']],
    find: String.raw`\omega \;—\; ?`,
    formulas: [LCONS, LPOINT, DISK],
    steps: [
      { title: 'Скорость человека относительно Земли',
        text: String.raw`Платформа поворачивается в обратную сторону с угловой скоростью $\omega$, её край движется со скоростью $\omega R$. Относительно Земли человек идёт со скоростью $v - \omega R$.` },
      { title: 'Момент импульса системы был нуль',
        tex: String.raw`m_1(v - \omega R)R = \frac{m_2R^2}{2}\,\omega` },
      { title: 'Ответ',
        tex: String.raw`\omega = \frac{2m_1v}{(2m_1 + m_2)R} = \frac{2\cdot80\cdot2}{400\cdot2} = 0{,}4\ \text{рад/с}` },
    ],
    answer: [String.raw`\omega = \frac{2m_1v}{(2m_1 + m_2)R} = 0{,}4\ \text{рад/с}`],
  },

  /* ===================== 3.34 ===================== */
  {
    id: '3.34', chapter: CH, section: S3, page: '70',
    title: 'Человек обходит край платформы',
    given: [[String.raw`m_1 = 60\ \text{кг}`, ''], [String.raw`m_2 = 240\ \text{кг}`, '']],
    find: String.raw`\varphi \;—\; ?`,
    formulas: [LCONS, DISK, POINT],
    steps: [
      { title: 'Угловые скорости',
        text: String.raw`Пусть человек идёт относительно платформы с угловой скоростью $\omega'$, а платформа поворачивается с $\omega$. Относительно Земли угловая скорость человека $\omega' + \omega$. Момент импульса системы всё время равен нулю:`,
        tex: String.raw`m_1R^2(\omega' + \omega) + \frac{m_2R^2}{2}\,\omega = 0 \;\Rightarrow\; \omega = -\frac{2m_1}{2m_1 + m_2}\,\omega'` },
      { title: 'Углы',
        text: String.raw`Отношение скоростей постоянно, значит такое же отношение и у углов поворота. Обойдя платформу, человек повернулся относительно неё на $2\pi$:`,
        tex: String.raw`\varphi = -\frac{2m_1}{2m_1 + m_2}\cdot2\pi = -\frac{4\pi m_1}{2m_1 + m_2} = -\frac{240\pi}{360} = -\frac23\pi\ (= -120^\circ)` },
      { title: 'Что значит минус',
        text: 'Платформа поворачивается в сторону, противоположную движению человека. Ни радиус, ни скорость ходьбы не нужны.' },
    ],
    answer: [String.raw`\varphi = -\frac{4\pi m_1}{2m_1 + m_2} = -\tfrac23\pi\ (120^\circ\ \text{в обратную сторону})`],
  },

  /* ===================== 3.35 ===================== */
  {
    id: '3.35', chapter: CH, section: S3, page: '70',
    title: 'Человек переходит в центр платформы',
    given: [[String.raw`R = 1\ \text{м}`, ''], [String.raw`n_1 = 6\ \text{мин}^{-1}`, ''], [String.raw`m = 80\ \text{кг}`, ''], [String.raw`J = 120\ \text{кг·м}^2`, '']],
    find: String.raw`n_2 \;—\; ?`,
    formulas: [LCONS, POINT],
    steps: [
      { title: 'Момент импульса до и после',
        text: 'На краю человек — точка на расстоянии R, в центре его момент инерции нуль.',
        tex: String.raw`(J + mR^2)\cdot2\pi n_1 = J\cdot2\pi n_2` },
      { title: 'Ответ',
        tex: String.raw`n_2 = \frac{(J + mR^2)n_1}{J} = \frac{200\cdot6}{120} = 10\ \text{мин}^{-1}` },
    ],
    answer: [String.raw`n_2 = \frac{J + mR^2}{J}\,n_1 = 10\ \text{мин}^{-1}`],
  },

  /* ===================== 3.36 ===================== */
  {
    id: '3.36', chapter: CH, section: S3, page: '70',
    title: 'Стержень из вертикали в горизонталь',
    given: [[String.raw`l = 2{,}4\ \text{м}`, ''], [String.raw`m = 8\ \text{кг}`, ''], [String.raw`n_1 = 1\ \text{с}^{-1}`, ''], [String.raw`J = 6\ \text{кг·м}^2`, '']],
    find: String.raw`n_2 \;—\; ?`,
    formulas: [LCONS, ROD_C],
    steps: [
      { title: 'Момент инерции стержня',
        text: 'Вертикальный стержень лежит на оси — его момент инерции нуль (стержень тонкий). Горизонтальный — ось проходит через его середину.',
        tex: String.raw`J_\text{ст} = \frac{ml^2}{12} = \frac{8\cdot5{,}76}{12} = 3{,}84\ \text{кг·м}^2` },
      { title: 'Сохранение момента импульса',
        tex: String.raw`Jn_1 = (J + J_\text{ст})\,n_2 \;\Rightarrow\; n_2 = \frac{12Jn_1}{12J + ml^2} = \frac{6}{9{,}84} = 0{,}61\ \text{с}^{-1}` },
    ],
    answer: [String.raw`n_2 = \frac{12Jn_1}{12J + ml^2} = 0{,}61\ \text{с}^{-1}`],
  },

  /* ===================== 3.37 ===================== */
  {
    id: '3.37', chapter: CH, section: S3, page: '70',
    title: 'Колесо на стержне перевернули',
    given: [[String.raw`n_1 = 10\ \text{с}^{-1}`, ''], [String.raw`R = 20\ \text{см}`, String.raw`0{,}2\ \text{м}`], [String.raw`m = 3\ \text{кг}`, ''], [String.raw`J = 6\ \text{кг·м}^2`, '']],
    find: String.raw`n_2 \;—\; ?`,
    formulas: [LCONS, { tex: String.raw`J_\text{к} = mR^2`, text: 'колесо — масса на ободе' }, { tex: String.raw`L = J\omega = 2\pi Jn`, text: 'момент импульса' }],
    steps: [
      { title: 'До поворота',
        text: 'Весь момент импульса — у колеса, направлен по оси вверх (скамья стоит).',
        tex: String.raw`L = 2\pi mR^2n_1` },
      { title: 'После поворота на 180°',
        text: String.raw`Колесо вращается с той же частотой, но его ось перевёрнута — момент импульса колеса стал $-L$. Человек поворачивал стержень своими руками — это внутренние силы системы «человек + скамья + колесо», и полный момент импульса относительно вертикальной оси сохраняется:`,
        tex: String.raw`L = -L + 2\pi Jn_2 \;\Rightarrow\; n_2 = \frac{2mR^2n_1}{J}` },
      { title: 'Числа',
        tex: String.raw`n_2 = \frac{2\cdot3\cdot0{,}04\cdot10}{6} = 0{,}4\ \text{с}^{-1}` },
    ],
    answer: [String.raw`n_2 = \frac{2mR^2n_1}{J} = 0{,}4\ \text{с}^{-1}`],
  },

  /* ===================== 3.38 ===================== */
  {
    id: '3.38', chapter: CH, section: S4, page: '70',
    title: 'Шарик на укорачиваемой нити',
    given: [[String.raw`m = 100\ \text{г}`, String.raw`0{,}1\ \text{кг}`], [String.raw`l_1 = 1\ \text{м}`, ''], [String.raw`n_1 = 1\ \text{с}^{-1}`, ''], [String.raw`l_2 = 0{,}5\ \text{м}`, '']],
    find: String.raw`n_2,\ A \;—\; ?`,
    formulas: [LCONS, POINT, TROT, { tex: String.raw`A = T_2 - T_1`, text: 'работа внешней силы равна изменению кинетической энергии' }],
    steps: [
      { title: 'Частота',
        text: 'Сила натяжения нити направлена к оси — её момент нуль, момент импульса шарика сохраняется.',
        tex: String.raw`ml_1^2\cdot2\pi n_1 = ml_2^2\cdot2\pi n_2 \;\Rightarrow\; n_2 = \left(\frac{l_1}{l_2}\right)^2n_1 = 4\ \text{с}^{-1}` },
      { title: 'Работа',
        text: 'Нить тянут к оси, а шарик движется по спирали — у силы есть составляющая вдоль перемещения, она и разгоняет шарик.',
        tex: String.raw`A = \frac{m}{2}\left[(2\pi n_2l_2)^2 - (2\pi n_1l_1)^2\right] = 2\pi^2mn_1^2\left(\frac{l_1}{l_2}\right)^2(l_1^2 - l_2^2)` },
      { title: 'Числа',
        tex: String.raw`A = 2\cdot9{,}87\cdot0{,}1\cdot1\cdot4\cdot0{,}75 = 5{,}92\ \text{Дж}` },
    ],
    answer: [String.raw`n_2 = 4\ \text{с}^{-1};\quad A = 5{,}92\ \text{Дж}`],
  },

  /* ===================== 3.39 ===================== */
  {
    id: '3.39', chapter: CH, section: S4, page: '71',
    title: 'Средняя мощность торможения',
    given: [[String.raw`\varphi = A + Bt + Ct^2`, ''], [String.raw`B = 32\ \text{рад/с},\ C = -4\ \text{рад/с}^2`, ''], [String.raw`J = 100\ \text{кг·м}^2`, '']],
    find: String.raw`\langle N\rangle \;—\; ?`,
    formulas: [TROT, { tex: String.raw`\langle N\rangle = \frac{|A|}{t}`, text: 'средняя мощность — работа за всё время, делённая на время' }],
    steps: [
      { title: 'Время до остановки',
        tex: String.raw`\omega = B + 2Ct = 32 - 8t = 0 \;\Rightarrow\; t = 4\ \text{с}` },
      { title: 'Работа сил = потерянная энергия',
        tex: String.raw`|A| = \frac{J\omega_0^2}{2} = \frac{100\cdot32^2}{2} = 51{,}2\ \text{кДж}` },
      { title: 'Средняя мощность',
        tex: String.raw`\langle N\rangle = \frac{51{,}2}{4} = 12{,}8\ \text{кВт}` },
    ],
    answer: [String.raw`\langle N\rangle = 12{,}8\ \text{кВт}`],
  },

  /* ===================== 3.40 ===================== */
  {
    id: '3.40', chapter: CH, section: S4, page: '71',
    title: 'Законы M(t) и N(t)',
    given: [[String.raw`\varphi = A + Bt + Ct^2`, ''], [String.raw`B = 16\ \text{рад/с},\ C = -2\ \text{рад/с}^2`, ''], [String.raw`J = 50\ \text{кг·м}^2`, ''], [String.raw`t = 3\ \text{с}`, '']],
    find: String.raw`M(t),\ N(t),\ N \;—\; ?`,
    formulas: [DYN, { tex: String.raw`N = M\omega`, text: 'мощность при вращении' }],
    steps: [
      { title: 'Угловая скорость и ускорение',
        tex: String.raw`\omega = B + 2Ct = 16 - 4t,\qquad \varepsilon = 2C = -4\ \text{рад/с}^2` },
      { title: 'Момент — постоянный',
        text: 'Знак минус означает, что момент тормозящий. По модулю:',
        tex: String.raw`|M| = J|\varepsilon| = 50\cdot4 = 200\ \text{Н·м} = \text{const}` },
      { title: 'Мощность',
        text: String.raw`$N = |M|\,\omega$ — мощность торможения (сколько энергии маховик теряет в секунду).`,
        tex: String.raw`N = 200(16 - 4t) = 3200 - 800t\ \text{Вт} = D + Et,\quad D = 3{,}2\ \text{кВт},\ E = -0{,}8\ \text{кВт/с}` },
      { title: 'При t = 3 с',
        tex: String.raw`N = 3200 - 2400 = 800\ \text{Вт} = 0{,}8\ \text{кВт}` },
    ],
    answer: [String.raw`M = 200\ \text{Н·м} = \text{const};\quad N = 3{,}2 - 0{,}8t\ \text{кВт};\quad N(3\ \text{с}) = 0{,}8\ \text{кВт}`],
  },

  /* ===================== 3.41 ===================== */
  {
    id: '3.41', chapter: CH, section: S4, page: '71',
    title: 'Вращающий момент двигателя',
    given: [[String.raw`n = 1500\ \text{мин}^{-1}`, String.raw`25\ \text{с}^{-1}`], [String.raw`N = 500\ \text{Вт}`, '']],
    find: String.raw`M \;—\; ?`,
    formulas: [{ tex: String.raw`N = M\omega,\quad \omega = 2\pi n`, text: 'мощность при вращении' }],
    steps: [
      { title: 'Ответ',
        tex: String.raw`M = \frac{N}{2\pi n} = \frac{500}{2\cdot3{,}14\cdot25} = 3{,}18\ \text{Н·м}` },
    ],
    answer: [String.raw`M = \frac{N}{2\pi n} = 3{,}18\ \text{Н·м}`],
  },

  /* ===================== 3.42 ===================== */
  {
    id: '3.42', chapter: CH, section: S4, page: '71',
    title: 'Ремённая передача',
    given: [[String.raw`d = 0{,}48\ \text{м}`, ''], [String.raw`N = 9\ \text{кВт}`, String.raw`9\cdot10^3\ \text{Вт}`], [String.raw`n = 240\ \text{мин}^{-1}`, String.raw`4\ \text{с}^{-1}`], [String.raw`T_1 = 2T_2`, '']],
    find: String.raw`T_1,\ T_2 \;—\; ?`,
    formulas: [{ tex: String.raw`N = (T_1 - T_2)v,\quad v = \pi dn`, text: 'мощность передаёт разность натяжений ветвей; v — скорость ремня' }],
    steps: [
      { title: 'Скорость ремня',
        tex: String.raw`v = \pi dn = 3{,}14\cdot0{,}48\cdot4 = 6{,}03\ \text{м/с}` },
      { title: 'Натяжения',
        tex: String.raw`T_1 - T_2 = T_2 = \frac{N}{\pi nd} = \frac{9000}{6{,}03} = 1{,}49\ \text{кН},\qquad T_1 = 2T_2 = 2{,}98\ \text{кН}` },
    ],
    answer: [String.raw`T_1 = \frac{2N}{\pi nd} = 2{,}98\ \text{кН};\quad T_2 = \frac{N}{\pi nd} = 1{,}49\ \text{кН}`],
  },

  /* ===================== 3.43 ===================== */
  {
    id: '3.43', chapter: CH, section: S4, page: '71',
    title: 'Мощность по динамометру',
    given: [[String.raw`d = 20\ \text{см}`, String.raw`0{,}2\ \text{м}`], [String.raw`n = 24\ \text{с}^{-1}`, ''], [String.raw`m = 1\ \text{кг}`, ''], [String.raw`F = 24\ \text{Н}`, '']],
    find: String.raw`N \;—\; ?`,
    formulas: [{ tex: String.raw`N = M\omega,\quad M = (F - mg)\frac d2`, text: 'момент силы трения ленты о шкив — разность натяжений её концов на радиус' }],
    steps: [
      { title: 'Тормозящий момент',
        text: 'Груз висит неподвижно, концы ленты натянуты силами F (динамометр) и mg (груз). Разность натяжений — сила трения ленты о шкив, она и тормозит двигатель.',
        tex: String.raw`M = (F - mg)\frac d2` },
      { title: 'Мощность',
        tex: String.raw`N = M\cdot2\pi n = \pi nd(F - mg) = 3{,}14\cdot24\cdot0{,}2\,(24 - 9{,}81) = 214\ \text{Вт}` },
    ],
    answer: [String.raw`N = \pi nd(F - mg) = 214\ \text{Вт}`],
  },

  /* ===================== 3.44 ===================== */
  {
    id: '3.44', chapter: CH, section: S4, page: '71',
    title: 'Работа на разгон маховика',
    note: String.raw`<b>Опечатка в формуле книги.</b> В ответе напечатано $A = \pi^2nmR^2$ — частота должна быть в квадрате: $A = \pi^2n^2mR^2$. Числа книги (7,11 и 28,4 кДж) посчитаны верно, с $n^2$.`,
    given: [[String.raw`m = 80\ \text{кг}`, ''], [String.raw`R = 30\ \text{см}`, String.raw`0{,}3\ \text{м}`], [String.raw`n = 10\ \text{с}^{-1}`, ''], [String.raw`R_2 = 2R`, '']],
    find: String.raw`A_1,\ A_2 \;—\; ?`,
    formulas: [TROT, DISK, { tex: String.raw`A = \Delta T`, text: 'работа идёт на кинетическую энергию' }],
    steps: [
      { title: 'Работа = энергия вращения',
        tex: String.raw`A = \frac12\cdot\frac{mR^2}{2}\,(2\pi n)^2 = \pi^2n^2mR^2` },
      { title: 'Числа',
        tex: String.raw`A_1 = 9{,}87\cdot100\cdot80\cdot0{,}09 = 7{,}11\ \text{кДж}` },
      { title: 'Радиус вдвое больше',
        text: 'Масса та же, а J растёт как R² — в 4 раза.',
        tex: String.raw`A_2 = 4A_1 = 28{,}4\ \text{кДж}` },
    ],
    answer: [String.raw`A = \pi^2n^2mR^2;\quad A_1 = 7{,}11\ \text{кДж};\quad A_2 = 28{,}4\ \text{кДж}`],
  },

  /* ===================== 3.45 ===================== */
  {
    id: '3.45', chapter: CH, section: S4, page: '71',
    title: 'Тормозящий момент по числу оборотов',
    given: [[String.raw`T = 1\ \text{кДж}`, String.raw`10^3\ \text{Дж}`], [String.raw`N = 80`, '']],
    find: String.raw`M \;—\; ?`,
    formulas: [{ tex: String.raw`A = M\varphi`, text: 'работа постоянного момента на угле поворота φ' }],
    steps: [
      { title: 'Работа торможения = вся энергия',
        tex: String.raw`M\cdot2\pi N = T \;\Rightarrow\; M = \frac{T}{2\pi N} = \frac{1000}{2\cdot3{,}14\cdot80} = 1{,}99\ \text{Н·м}` },
    ],
    answer: [String.raw`M = \frac{T}{2\pi N} = 1{,}99\ \text{Н·м}`],
  },

  /* ===================== 3.46 ===================== */
  {
    id: '3.46', chapter: CH, section: S4, page: '71',
    title: 'Энергия после разгона',
    given: [[String.raw`J = 40\ \text{кг·м}^2`, ''], [String.raw`M = 20\ \text{Н·м}`, ''], [String.raw`t = 10\ \text{с}`, '']],
    find: String.raw`T \;—\; ?`,
    formulas: [DYN, TROT],
    steps: [
      { title: 'Угловая скорость',
        tex: String.raw`\omega = \varepsilon t = \frac{Mt}{J} = \frac{20\cdot10}{40} = 5\ \text{рад/с}` },
      { title: 'Энергия',
        tex: String.raw`T = \frac{J\omega^2}{2} = \frac{M^2t^2}{2J} = \frac{40\cdot25}{2} = 500\ \text{Дж}` },
    ],
    answer: [String.raw`T = \frac{M^2t^2}{2J} = 500\ \text{Дж}`],
  },

  /* ===================== 3.47 ===================== */
  {
    id: '3.47', chapter: CH, section: S4, page: '71',
    title: 'Энергия вращающейся пули',
    given: [[String.raw`m = 10\ \text{г}`, String.raw`10^{-2}\ \text{кг}`], [String.raw`v = 800\ \text{м/с}`, ''], [String.raw`n = 3000\ \text{с}^{-1}`, ''], [String.raw`d = 8\ \text{мм}`, String.raw`8\cdot10^{-3}\ \text{м}`]],
    find: String.raw`T \;—\; ?`,
    formulas: [TROT, DISK, { tex: String.raw`T = \tfrac12 mv^2 + \tfrac12 J\omega^2`, text: 'энергия = поступательная + вращательная' }],
    steps: [
      { title: 'Две части энергии',
        tex: String.raw`T = \frac{mv^2}{2} + \frac12\cdot\frac{m}{2}\left(\frac d2\right)^2(2\pi n)^2 = \frac m4\left(2v^2 + \pi^2n^2d^2\right)` },
      { title: 'Числа',
        tex: String.raw`T = 3200 + 14 = 3{,}21\ \text{кДж}` },
      { title: 'Вывод',
        text: 'Энергия вращения пули — меньше половины процента от полной.' },
    ],
    answer: [String.raw`T = \frac m4(2v^2 + \pi^2n^2d^2) = 3{,}21\ \text{кДж}`],
  },

  /* ===================== 3.48 ===================== */
  {
    id: '3.48', chapter: CH, section: S4, page: '71',
    title: 'Катящийся цилиндр',
    given: [[String.raw`m = 4\ \text{кг}`, ''], [String.raw`v = 1\ \text{м/с}`, '']],
    find: String.raw`T \;—\; ?`,
    formulas: [TROLL, DISK],
    steps: [
      { title: 'Ответ',
        tex: String.raw`T = \frac{mv^2}{2} + \frac12\cdot\frac{mR^2}{2}\cdot\frac{v^2}{R^2} = \frac34 mv^2 = 3\ \text{Дж}` },
    ],
    answer: [String.raw`T = \tfrac34 mv^2 = 3\ \text{Дж}`],
  },

  /* ===================== 3.49 ===================== */
  {
    id: '3.49', chapter: CH, section: S4, page: '72',
    title: 'Обруч и цилиндр катятся',
    given: [[String.raw`m = 2\ \text{кг}`, ''], [String.raw`v = 5\ \text{м/с}`, '']],
    find: String.raw`T_1,\ T_2 \;—\; ?`,
    formulas: [TROLL, { tex: String.raw`J_\text{обр} = mR^2,\quad J_\text{цил} = \tfrac12 mR^2`, text: 'моменты инерции обруча и сплошного цилиндра' }],
    steps: [
      { title: 'Обруч',
        tex: String.raw`T_1 = \frac{mv^2}{2} + \frac{mR^2}{2}\cdot\frac{v^2}{R^2} = mv^2 = 50\ \text{Дж}` },
      { title: 'Цилиндр',
        tex: String.raw`T_2 = \frac{mv^2}{2} + \frac{mv^2}{4} = \frac34 mv^2 = 37{,}5\ \text{Дж}` },
    ],
    answer: [String.raw`T_1 = mv^2 = 50\ \text{Дж};\quad T_2 = \tfrac34 mv^2 = 37{,}5\ \text{Дж}`],
  },

  /* ===================== 3.50 ===================== */
  {
    id: '3.50', chapter: CH, section: S4, page: '72',
    title: 'Катящийся шар: доли энергии',
    given: [[String.raw`T = 14\ \text{Дж}`, '']],
    find: String.raw`T_1,\ T_2 \;—\; ?`,
    formulas: [TROLL, { tex: String.raw`J = \tfrac25 mR^2`, text: 'шар' }],
    steps: [
      { title: 'Отношение энергий',
        tex: String.raw`T_2 = \frac12\cdot\frac25 mR^2\cdot\frac{v^2}{R^2} = \frac25\cdot\frac{mv^2}{2} = \frac25T_1` },
      { title: 'Делим 14 Дж',
        tex: String.raw`T = T_1 + \tfrac25T_1 = \tfrac75T_1 \;\Rightarrow\; T_1 = 10\ \text{Дж},\quad T_2 = 4\ \text{Дж}` },
    ],
    answer: [String.raw`T_1 = 10\ \text{Дж};\quad T_2 = 4\ \text{Дж}`],
  },

  /* ===================== 3.51 ===================== */
  {
    id: '3.51', chapter: CH, section: S4, page: '72',
    title: 'Шар скатывается с горки',
    note: String.raw`<b>Опечатка в формуле книги.</b> Напечатано $v = \sqrt{10/(7gl)}$; должно быть $v = \sqrt{10gh/7}$. Число 3,74 м/с в книге верное.`,
    given: [[String.raw`h = 1\ \text{м}`, '']],
    find: String.raw`v \;—\; ?`,
    formulas: [TROLL, { tex: String.raw`J = \tfrac25 mR^2`, text: 'шар' }, { tex: String.raw`mgh = T`, text: 'закон сохранения энергии (без скольжения трение работы не совершает)' }],
    steps: [
      { title: 'Энергия внизу',
        tex: String.raw`mgh = \frac{mv^2}{2} + \frac15 mv^2 = \frac7{10}mv^2` },
      { title: 'Скорость',
        tex: String.raw`v = \sqrt{\frac{10gh}{7}} = \sqrt{\frac{10\cdot9{,}81\cdot1}{7}} = 3{,}74\ \text{м/с}` },
    ],
    answer: [String.raw`v = \sqrt{10gh/7} = 3{,}74\ \text{м/с}`],
  },

  /* ===================== 3.52 ===================== */
  {
    id: '3.52', chapter: CH, section: S4, page: '72',
    title: 'Обруч скатывается по наклонной',
    given: [[String.raw`l = 2\ \text{м}`, ''], [String.raw`h = 10\ \text{см}`, String.raw`0{,}1\ \text{м}`]],
    find: String.raw`t \;—\; ?`,
    formulas: [TROLL, { tex: String.raw`J = mR^2`, text: 'обруч' }, { tex: String.raw`l = \frac{v}{2}\,t`, text: 'равноускоренное движение из покоя: путь = средняя скорость × время' }],
    steps: [
      { title: 'Скорость внизу',
        text: 'У обруча энергии поступательного и вращательного движения равны:',
        tex: String.raw`mgh = \frac{mv^2}{2} + \frac{mv^2}{2} = mv^2 \;\Rightarrow\; v = \sqrt{gh}` },
      { title: 'Время',
        tex: String.raw`t = \frac{2l}{v} = \frac{2l}{\sqrt{gh}} = \frac{4}{\sqrt{0{,}981}} = 4{,}04\ \text{с}` },
    ],
    answer: [String.raw`t = \frac{2l}{\sqrt{gh}} = 4{,}04\ \text{с}`],
  },

  /* ===================== 3.53 ===================== */
  {
    id: '3.53', chapter: CH, section: S4, page: '72',
    title: 'Отклонённый стержень: скорость конца',
    given: [[String.raw`l = 1\ \text{м}`, ''], [String.raw`\varphi = 60^\circ`, '']],
    find: String.raw`v \;—\; ?`,
    formulas: [TROT, ROD_END, { tex: String.raw`mg\Delta h = \tfrac12 J\omega^2`, text: 'закон сохранения энергии' }],
    steps: [
      { title: 'Насколько опустился центр масс',
        tex: String.raw`\Delta h = \frac l2(1 - \cos\varphi)` },
      { title: 'Сохранение энергии',
        tex: String.raw`mg\frac l2(1 - \cos\varphi) = \frac12\cdot\frac{ml^2}{3}\,\omega^2 \;\Rightarrow\; \omega = \sqrt{\frac{3g(1 - \cos\varphi)}{l}}` },
      { title: 'Скорость конца',
        tex: String.raw`v = \omega l = \sqrt{3gl(1 - \cos\varphi)} = \sqrt{3\cdot9{,}81\cdot0{,}5} = 3{,}84\ \text{м/с}` },
    ],
    answer: [String.raw`v = \sqrt{3gl(1 - \cos\varphi)} = 3{,}84\ \text{м/с}`],
  },

  /* ===================== 3.54 ===================== */
  {
    id: '3.54', chapter: CH, section: S4, page: '72',
    title: 'Отклонённый стержень: ω и v в равновесии',
    note: String.raw`<b>Опечатка в формуле книги.</b> В случае 3 напечатано $v = \frac92\sqrt{gR/7}$ — у стержня нет $R$, должно быть $\frac92\sqrt{gl/7}$. Числа книги округлены вниз: 3,83 и 5,32 вместо 3,84 и 5,33.`,
    given: [[String.raw`l = 1\ \text{м}`, ''], [String.raw`1)\ a = 0,\ b = \tfrac l2,\ \alpha = \tfrac\pi3`, ''], [String.raw`2)\ a = \tfrac l3,\ b = \tfrac{2l}3,\ \alpha = \tfrac\pi2`, ''], [String.raw`3)\ a = \tfrac l4,\ b = l,\ \alpha = \tfrac{2\pi}3`, '']],
    find: String.raw`\omega,\ v \;—\; ?`,
    formulas: [TROT, ROD_C, STEINER, { tex: String.raw`mg\Delta h = \tfrac12 J\omega^2`, text: 'закон сохранения энергии' }],
    steps: [
      { title: 'Расстояния (как в задаче 3.19)',
        text: String.raw`$OC = \frac l2 - a$, $OB = b - a$. Центр масс опускается на $OC(1 - \cos\alpha)$.` },
      { title: 'Сохранение энергии',
        tex: String.raw`mg\,OC(1 - \cos\alpha) = \frac12 m\left(\frac{l^2}{12} + OC^2\right)\omega^2,\qquad v = \omega\,OB` },
      { title: '1) OC = l/2, OB = l/2',
        tex: String.raw`\omega = \sqrt{\frac{3g}{2l}} = 3{,}84\ \text{рад/с},\quad v = \sqrt{\frac{3gl}{8}} = 1{,}92\ \text{м/с}` },
      { title: '2) OC = l/6, OB = l/3',
        tex: String.raw`\omega = \sqrt{\frac{3g}{l}} = 5{,}42\ \text{рад/с},\quad v = \sqrt{\frac{gl}{3}} = 1{,}81\ \text{м/с}` },
      { title: '3) OC = l/4, OB = 3l/4',
        tex: String.raw`\omega = 6\sqrt{\frac{g}{7l}} = 7{,}10\ \text{рад/с},\quad v = \frac92\sqrt{\frac{gl}{7}} = 5{,}33\ \text{м/с}` },
    ],
    answer: [String.raw`1)\ \omega = 3{,}84\ \text{рад/с},\ v = 1{,}92\ \text{м/с}`, String.raw`2)\ \omega = 5{,}42\ \text{рад/с},\ v = 1{,}81\ \text{м/с}`, String.raw`3)\ \omega = 7{,}10\ \text{рад/с},\ v = 5{,}33\ \text{м/с}`],
  },

  /* ===================== 3.55 ===================== */
  {
    id: '3.55', chapter: CH, section: S4, page: '72',
    title: 'Падающий карандаш',
    given: [[String.raw`l = 15\ \text{см}`, String.raw`0{,}15\ \text{м}`]],
    find: String.raw`\omega,\ v_1,\ v_2 \;—\; ?`,
    formulas: [TROT, ROD_END, { tex: String.raw`mg\Delta h = \tfrac12 J\omega^2`, text: 'закон сохранения энергии' }],
    steps: [
      { title: 'Карандаш — стержень, вращающийся вокруг нижнего конца',
        text: 'Нижний конец не скользит, поэтому карандаш поворачивается вокруг него на 90°. Центр масс опускается на l/2.',
        tex: String.raw`mg\frac l2 = \frac12\cdot\frac{ml^2}{3}\,\omega^2 \;\Rightarrow\; \omega = \sqrt{\frac{3g}{l}} = \sqrt{\frac{3\cdot9{,}81}{0{,}15}} = 14\ \text{рад/с}` },
      { title: 'Скорости',
        text: 'Угловая скорость у всех точек одна, линейная пропорциональна расстоянию до нижнего конца.',
        tex: String.raw`v_1 = \omega\frac l2 = 1{,}05\ \text{м/с},\qquad v_2 = \omega l = 2{,}1\ \text{м/с}` },
    ],
    answer: [String.raw`1)\ \omega = 14\ \text{рад/с},\ v = 1{,}05\ \text{м/с};\quad 2)\ \omega = 14\ \text{рад/с},\ v = 2{,}1\ \text{м/с}`],
  },

  /* ===================== 3.56 ===================== */
  {
    id: '3.56', chapter: CH, section: S4, page: '72',
    title: 'Отклонённый диск: ω и v в равновесии',
    note: String.raw`<b>Мелкие расхождения с книгой.</b> В случае 3 в формуле для $v$ пропущено $R$ под корнем (должно быть $\frac43\sqrt{\frac{12(2+\sqrt3)gR}{17}}$), а число 3,04 м/с получено умножением уже округлённой $\omega = 11{,}4$ рад/с; точнее 3,03 м/с. Остальные числа книги отличаются только округлением последней цифры вниз (8,08 вместо 8,09 и т. п.).`,
    given: [[String.raw`R = 20\ \text{см}`, String.raw`0{,}2\ \text{м}`], [String.raw`1)\ a = b = R,\ \alpha = \tfrac\pi2`, ''], [String.raw`2)\ a = \tfrac R2,\ b = 0,\ \alpha = \tfrac\pi3`, ''], [String.raw`3)\ a = b = \tfrac{2R}3,\ \alpha = \tfrac{5\pi}6`, ''], [String.raw`4)\ a = \tfrac R3,\ b = R,\ \alpha = \tfrac{2\pi}3`, '']],
    find: String.raw`\omega,\ v \;—\; ?`,
    formulas: [TROT, DISK, STEINER, { tex: String.raw`mg\Delta h = \tfrac12 J\omega^2`, text: 'закон сохранения энергии' }],
    steps: [
      { title: 'Расстояния (как в задаче 3.20)',
        text: String.raw`$a = OC$, $b = CB$, $OB = a + b$. Центр диска опускается на $a(1 - \cos\alpha)$.` },
      { title: 'Сохранение энергии',
        tex: String.raw`mga(1 - \cos\alpha) = \frac12 m\left(\frac{R^2}{2} + a^2\right)\omega^2,\qquad v = \omega\,(a + b)` },
      { title: 'Числа',
        tex: String.raw`\begin{aligned} &1)\ \omega = 2\sqrt{\tfrac{g}{3R}} = 8{,}09\ \text{рад/с},\ v = 3{,}23\ \text{м/с} \\ &2)\ \omega = \sqrt{\tfrac{2g}{3R}} = 5{,}72\ \text{рад/с},\ v = 0{,}572\ \text{м/с} \\ &3)\ \omega = \sqrt{\tfrac{12(2+\sqrt3)g}{17R}} = 11{,}4\ \text{рад/с},\ v = 3{,}03\ \text{м/с} \\ &4)\ \omega = 3\sqrt{\tfrac{2g}{11R}} = 8{,}96\ \text{рад/с},\ v = 2{,}39\ \text{м/с} \end{aligned}` },
    ],
    answer: [String.raw`1)\ 8{,}09\ \text{рад/с},\ 3{,}23\ \text{м/с};\quad 2)\ 5{,}72\ \text{рад/с},\ 0{,}572\ \text{м/с}`, String.raw`3)\ 11{,}4\ \text{рад/с},\ 3{,}03\ \text{м/с};\quad 4)\ 8{,}96\ \text{рад/с},\ 2{,}39\ \text{м/с}`],
  },

  /* ===================== 3.57 ===================== */
  {
    id: '3.57', chapter: CH, section: S4, page: '72–73',
    title: 'Атом гелия ударяет молекулу азота',
    note: String.raw`<b>Расхождение в последней цифре.</b> В книге $p'_1 = -3{,}71\cdot10^{-24}$, $\Delta p_1 = p'_2 = 1{,}04\cdot10^{-23}$ кг·м/с, $L_z = 5{,}66\cdot10^{-34}$ кг·м²/с — так выходит, если взять массу нуклона $1{,}67\cdot10^{-27}$ кг. С 1 а. е. м. $= 1{,}66\cdot10^{-27}$ кг (так в приложении книги): $-3{,}69\cdot10^{-24}$, $1{,}03\cdot10^{-23}$ и $5{,}63\cdot10^{-34}$. Скорости и $\omega$ совпадают.`,
    given: [[String.raw`v_1 = 10^3\ \text{м/с}`, ''], [String.raw`m_1 = 4\ \text{а.е.м.}`, String.raw`6{,}64\cdot10^{-27}\ \text{кг}`], [String.raw`m_2 = 14\ \text{а.е.м.}`, String.raw`2{,}32\cdot10^{-26}\ \text{кг}`], [String.raw`d = 0{,}109\ \text{нм}`, String.raw`1{,}09\cdot10^{-10}\ \text{м}`]],
    find: String.raw`u_1,\ p'_1,\ \Delta p_1,\ v_C,\ p'_2,\ \omega,\ L_z \;—\; ?`,
    formulas: [
      { tex: String.raw`u_1 = \frac{m_1 - m_2}{m_1 + m_2}v_1,\quad u_2 = \frac{2m_1}{m_1 + m_2}v_1`, text: 'упругий центральный удар о покоящийся шар' },
      LPOINT,
    ],
    steps: [
      { title: 'Модель удара',
        text: 'Удар мгновенный: за время удара связь в молекуле не успевает подействовать, поэтому гелий упруго ударяет один атом азота — как два шара при центральном ударе.' },
      { title: 'Атом гелия',
        tex: String.raw`u_1 = \frac{4 - 14}{18}\cdot10^3 = -556\ \text{м/с},\quad p'_1 = m_1u_1 = -3{,}69\cdot10^{-24}\ \text{кг·м/с}` },
      { title: 'Изменение импульса гелия',
        tex: String.raw`|\Delta p_1| = m_1(v_1 - u_1) = \frac{2m_2}{m_1 + m_2}m_1v_1 = 1{,}03\cdot10^{-23}\ \text{кг·м/с}` },
      { title: 'Молекула азота',
        text: String.raw`Ударенный атом получил $u_2 = \frac{8}{18}\cdot10^3 = 444$ м/с, второй атом стоит. Центр масс — посередине, его скорость — среднее:`,
        tex: String.raw`v_C = \frac{u_2}{2} = \frac{m_1}{m_1 + m_2}v_1 = 222\ \text{м/с},\quad p'_2 = 2m_2v_C = 1{,}03\cdot10^{-23}\ \text{кг·м/с}` },
      { title: 'Вращение',
        text: String.raw`Относительно $C$ атомы движутся со скоростями $\pm u_2/2$ на расстоянии $d/2$:`,
        tex: String.raw`\omega = \frac{u_2/2}{d/2} = \frac{u_2}{d} = 4{,}08\cdot10^{12}\ \text{рад/с},\quad L_z = 2m_2\frac{u_2}{2}\cdot\frac d2 = \frac{m_1m_2}{m_1 + m_2}v_1d = 5{,}63\cdot10^{-34}\ \text{кг·м}^2\text{/с}` },
    ],
    answer: [String.raw`u_1 = -556\ \text{м/с};\quad p'_1 = -3{,}69\cdot10^{-24}\ \text{кг·м/с};\quad \Delta p_1 = 1{,}03\cdot10^{-23}\ \text{кг·м/с}`, String.raw`v_C = 222\ \text{м/с};\quad p'_2 = 1{,}03\cdot10^{-23}\ \text{кг·м/с};\quad \omega = 4{,}08\cdot10^{12}\ \text{рад/с};\quad L_z = 5{,}63\cdot10^{-34}\ \text{кг·м}^2\text{/с}`],
  },

  /* ===================== 3.58 ===================== */
  {
    id: '3.58', chapter: CH, section: S4, page: '73',
    title: 'Атом неона ударяет молекулу кислорода',
    note: MISMATCH + String.raw`В книге $\omega = 5{,}03\cdot10^{14}$ рад/с, но по формуле самой книги $\omega = \frac{2\sqrt{2m_1T_1}}{(m_1 + m_2)d} = 5{,}04\cdot10^{12}$ рад/с — опечатка в показателе степени. В формуле для $\Delta T_1$ пропущен квадрат: должно быть $\frac{4m_1m_2}{(m_1 + m_2)^2}T_1$ (число $-4{,}94\cdot10^{-21}$ Дж верное). $p'_1$, $v_C$, $p'_2$, $L_z$ отличаются в последней цифре (у книги $2{,}03\cdot10^{-24}$, 304 м/с, $1{,}63\cdot10^{-23}$, $9{,}84\cdot10^{-34}$) — книга брала массу $1{,}67\cdot10^{-27}$ кг на нуклон, здесь 1 а. е. м. $= 1{,}66\cdot10^{-27}$ кг.`,
    given: [[String.raw`T_1 = 5\cdot10^{-21}\ \text{Дж}`, ''], [String.raw`m_1 = 20\ \text{а.е.м.}`, String.raw`3{,}32\cdot10^{-26}\ \text{кг}`], [String.raw`m_2 = 16\ \text{а.е.м.}`, String.raw`2{,}66\cdot10^{-26}\ \text{кг}`], [String.raw`d = 0{,}121\ \text{нм}`, String.raw`1{,}21\cdot10^{-10}\ \text{м}`]],
    find: String.raw`p'_1,\ T'_1,\ \Delta T_1,\ v_C,\ p'_2,\ T'_\text{пост},\ T'_\text{вр},\ \omega,\ L_z \;—\; ?`,
    formulas: [
      { tex: String.raw`u_1 = \frac{m_1 - m_2}{m_1 + m_2}v_1,\quad u_2 = \frac{2m_1}{m_1 + m_2}v_1`, text: 'упругий центральный удар о покоящийся шар' },
      { tex: String.raw`p = \sqrt{2mT}`, text: 'связь импульса и кинетической энергии' },
    ],
    steps: [
      { title: 'Импульс неона до удара',
        tex: String.raw`p_1 = \sqrt{2m_1T_1} = \sqrt{2\cdot3{,}32\cdot10^{-26}\cdot5\cdot10^{-21}} = 1{,}82\cdot10^{-23}\ \text{кг·м/с}` },
      { title: 'Неон после удара (как в задаче 3.57)',
        tex: String.raw`p'_1 = \frac{m_1 - m_2}{m_1 + m_2}p_1 = \frac{4}{36}p_1 = 2{,}02\cdot10^{-24}\ \text{кг·м/с},\quad T'_1 = \left(\frac{4}{36}\right)^2T_1 = 6{,}17\cdot10^{-23}\ \text{Дж}` },
      { title: 'Потеря энергии неона',
        tex: String.raw`\Delta T_1 = T'_1 - T_1 = -\frac{4m_1m_2}{(m_1 + m_2)^2}T_1 = -4{,}94\cdot10^{-21}\ \text{Дж}` },
      { title: 'Молекула кислорода',
        text: String.raw`Ударенный атом получил импульс $p'_2 = \frac{2m_2}{m_1+m_2}p_1$, второй стоит; центр масс движется вдвое медленнее ударенного атома.`,
        tex: String.raw`p'_2 = \frac{32}{36}p_1 = 1{,}62\cdot10^{-23}\ \text{кг·м/с},\quad v_C = \frac{p_1}{m_1 + m_2} = 305\ \text{м/с}` },
      { title: 'Энергия молекулы делится поровну',
        text: String.raw`Ударенный атом получил энергию $m_2u_2^2/2$. Поступательная $\frac12(2m_2)v_C^2 = \frac{m_2u_2^2}{4}$ — ровно половина; вторая половина — вращение.`,
        tex: String.raw`T'_\text{пост} = T'_\text{вр} = \frac{2m_1m_2}{(m_1 + m_2)^2}T_1 = 2{,}47\cdot10^{-21}\ \text{Дж}` },
      { title: 'Вращение',
        tex: String.raw`\omega = \frac{u_2}{d} = \frac{2v_C}{d} = 5{,}04\cdot10^{12}\ \text{рад/с},\quad L_z = m_2v_Cd = 9{,}80\cdot10^{-34}\ \text{кг·м}^2\text{/с}` },
    ],
    answer: [
      String.raw`p'_1 = 2{,}02\cdot10^{-24}\ \text{кг·м/с};\quad T'_1 = 6{,}17\cdot10^{-23}\ \text{Дж};\quad \Delta T_1 = -4{,}94\cdot10^{-21}\ \text{Дж}`,
      String.raw`v_C = 305\ \text{м/с};\quad p'_2 = 1{,}62\cdot10^{-23}\ \text{кг·м/с};\quad T'_\text{пост} = T'_\text{вр} = 2{,}47\cdot10^{-21}\ \text{Дж}`,
      String.raw`\omega = 5{,}04\cdot10^{12}\ \text{рад/с};\quad L_z = 9{,}80\cdot10^{-34}\ \text{кг·м}^2\text{/с}`,
    ],
  },

  /* ===================== 3.59 ===================== */
  {
    id: '3.59', chapter: CH, section: S5, page: '73–74',
    title: 'Стержень с шариками: центр масс',
    note: MISMATCH + String.raw`В случае б) в книге $X_C = 0$. По рис. 3.21, б (шарик $3m$ в точке $-l/3$, стержень $3m$ с серединой в $+l/6$, шарик $m$ в $+2l/3$) выходит $X_C = \frac{l}{42} \approx 0{,}029$ м. Ноль получился бы, если бы масса стержня была $2m$. Случаи а) и в) совпадают.`,
    given: [[String.raw`l = 1{,}2\ \text{м}`, ''], [String.raw`\text{массы — по рис. 3.21}`, '']],
    find: String.raw`X_C \;—\; ?`,
    formulas: [CM, { tex: String.raw`x_\text{ст} = x_\text{середины}`, text: 'однородный стержень — как точка его массы в середине' }],
    steps: [
      { title: 'а) m в O, стержень 3m, 2m на конце',
        tex: String.raw`X_C = \frac{m\cdot0 + 3m\cdot\frac l2 + 2m\cdot l}{6m} = \frac{7}{12}l = 0{,}7\ \text{м}` },
      { title: 'б) 3m в −l/3, стержень 3m, m в +2l/3',
        text: String.raw`Середина стержня — в точке $-\frac l3 + \frac l2 = \frac l6$.`,
        tex: String.raw`X_C = \frac{3m\left(-\frac l3\right) + 3m\cdot\frac l6 + m\cdot\frac{2l}3}{7m} = \frac{l}{42} = 0{,}029\ \text{м}` },
      { title: 'в) 5m в −l/2, стержень 3m в O, 2m в +l/2',
        tex: String.raw`X_C = \frac{5m\left(-\frac l2\right) + 0 + 2m\cdot\frac l2}{10m} = -\frac{3}{20}l = -0{,}18\ \text{м}` },
    ],
    answer: [String.raw`а)\ X_C = \tfrac7{12}l = 0{,}7\ \text{м};\quad б)\ X_C = \tfrac{l}{42} \approx 0{,}029\ \text{м};\quad в)\ X_C = -\tfrac3{20}l = -0{,}18\ \text{м}`],
  },

  /* ===================== 3.60 ===================== */
  {
    id: '3.60', chapter: CH, section: S5, page: '74',
    title: 'Центр масс трёхатомной молекулы',
    note: String.raw`<b>Опечатка в формуле книги.</b> Напечатано $Y_C = \frac{m_2}{2m_1 + m_2}$ — пропущен множитель $d\cos\frac\alpha2$. Числа 52,4 и 36,8 пм в книге верные.`,
    given: [[String.raw`\text{H}_2\text{O}:\ d = 95{,}8\ \text{пм},\ \alpha = 104^\circ`, ''], [String.raw`m_1 = 1,\ m_2 = 16\ \text{а.е.м.}`, ''], [String.raw`\text{SO}_2:\ d = 143\ \text{пм},\ \alpha = 118^\circ`, ''], [String.raw`m_1 = 16,\ m_2 = 32\ \text{а.е.м.}`, '']],
    find: String.raw`X_C,\ Y_C \;—\; ?`,
    formulas: [CM],
    steps: [
      { title: 'Координаты атомов (рис. 3.22)',
        text: String.raw`Атомы $m_1$ — на оси $x$ в точках $\pm d\sin\frac\alpha2$; атом $m_2$ — на оси $y$ на высоте $d\cos\frac\alpha2$.` },
      { title: 'Формулы',
        text: 'Молекула симметрична относительно оси y, поэтому X_C = 0.',
        tex: String.raw`X_C = 0,\qquad Y_C = \frac{m_2\,d\cos\frac\alpha2}{2m_1 + m_2}` },
      { title: 'H₂O',
        tex: String.raw`Y_C = \frac{16}{18}\cdot95{,}8\cos52^\circ = \frac{16}{18}\cdot59{,}0 = 52{,}4\ \text{пм}` },
      { title: 'SO₂',
        tex: String.raw`Y_C = \frac{32}{64}\cdot143\cos59^\circ = \frac12\cdot73{,}7 = 36{,}8\ \text{пм}` },
    ],
    answer: [String.raw`X_C = 0;\quad Y_C = \frac{m_2d\cos(\alpha/2)}{2m_1 + m_2};\quad \text{H}_2\text{O}:\ 52{,}4\ \text{пм};\quad \text{SO}_2:\ 36{,}8\ \text{пм}`],
  },

  /* ===================== 3.61 ===================== */
  {
    id: '3.61', chapter: CH, section: S5, page: '75',
    title: 'Центр масс молекулы-пирамиды',
    note: MISMATCH + String.raw`По формуле самой книги (в ней $l$ — это межъядерное расстояние $d$) для PH₃ выходит $Z_C = 70{,}3$ пм, а в книге 68,3 пм. Для PCl₃ — 21,5 пм против 21,6 (с $A_\text{Cl} = 35{,}5$, $A_\text{P} = 31$). NH₃ совпадает.`,
    given: [[String.raw`\text{NH}_3:\ d = 101\ \text{пм},\ \alpha = 106^\circ;\ m_1 = 1,\ m_2 = 14`, ''], [String.raw`\text{PCl}_3:\ d = 204\ \text{пм},\ \alpha = 100^\circ;\ m_1 = 35{,}5,\ m_2 = 31`, ''], [String.raw`\text{PH}_3:\ d = 144\ \text{пм},\ \alpha = 94^\circ;\ m_1 = 1,\ m_2 = 31`, '']],
    find: String.raw`Z_C \;—\; ?`,
    formulas: [CM, { tex: String.raw`r = \frac{s}{\sqrt3}`, text: 'радиус окружности, описанной около равностороннего треугольника со стороной s' }],
    steps: [
      { title: 'Сторона основания',
        text: String.raw`$\alpha$ — угол между связями при вершине $m_2$. Расстояние между атомами $m_1$ — основание равнобедренного треугольника с боковыми сторонами $d$:`,
        tex: String.raw`s = 2d\sin\frac\alpha2,\qquad r = \frac{2d}{\sqrt3}\sin\frac\alpha2` },
      { title: 'Высота пирамиды',
        text: 'Начало координат — в центре основания, атом m₂ — на оси z над ним.',
        tex: String.raw`h = \sqrt{d^2 - r^2} = \frac{d}{\sqrt3}\sqrt{3\cos^2\frac\alpha2 - \sin^2\frac\alpha2}` },
      { title: 'Центр масс',
        text: 'Три атома m₁ лежат в плоскости z = 0.',
        tex: String.raw`Z_C = \frac{m_2h}{3m_1 + m_2}` },
      { title: 'Числа',
        tex: String.raw`\begin{aligned} &\text{NH}_3:\ h = 39{,}1\ \text{пм},\ Z_C = \tfrac{14}{17}\cdot39{,}1 = 32{,}2\ \text{пм} \\ &\text{PCl}_3:\ h = 95{,}2\ \text{пм},\ Z_C = \tfrac{31}{137{,}5}\cdot95{,}2 = 21{,}5\ \text{пм} \\ &\text{PH}_3:\ h = 77{,}1\ \text{пм},\ Z_C = \tfrac{31}{34}\cdot77{,}1 = 70{,}3\ \text{пм} \end{aligned}` },
    ],
    answer: [String.raw`Z_C = \frac{m_2}{3m_1 + m_2}\cdot\frac{d}{\sqrt3}\sqrt{3\cos^2\tfrac\alpha2 - \sin^2\tfrac\alpha2}`, String.raw`\text{NH}_3:\ 32{,}2;\quad \text{PCl}_3:\ 21{,}5;\quad \text{PH}_3:\ 70{,}3\ \text{пм}`],
  },

  /* ===================== 3.62 ===================== */
  {
    id: '3.62', chapter: CH, section: S5, page: '75',
    title: 'Изогнутая проволока: центр масс',
    note: MISMATCH + String.raw`Случай в): в книге $X_C = \frac{\pi + 2}{\pi + 1}R = 12{,}4$ см, $Y_C = \frac{\pi}{\pi + 2}R = 6{,}11$ см — знаменатели разные, т. е. формулы не от одной фигуры. По рис. 3.24, в (отрезок $R$ на высоте $R$ и полуокружность радиуса $R$ с центром $O_1(2R;\ R)$) выходит $X_C = 16{,}4$ см, $Y_C = 5{,}17$ см. Ответ книги для $Y_C$ получился бы, если бы горизонтальный отрезок был длиной $2R$. Случаи а), б), г) совпадают.`,
    given: [[String.raw`R = 10\ \text{см}`, String.raw`0{,}1\ \text{м}`]],
    find: String.raw`X_C,\ Y_C \;—\; ?`,
    formulas: [CM, { tex: String.raw`y_\text{дуги} = \frac{2R}{\pi}`, text: 'центр масс полуокружности — на расстоянии 2R/π от центра' }, { tex: String.raw`x_\text{ч} = y_\text{ч} = \frac{2R}{\pi}`, text: 'центр масс четверти окружности (по каждой оси от центра)' }],
    steps: [
      { title: 'Принцип',
        text: 'Проволока однородная: масса куска пропорциональна его длине. Каждый кусок заменяем точкой в его центре масс с «массой», равной длине.' },
      { title: 'а) полуокружность',
        tex: String.raw`X_C = 0,\qquad Y_C = \frac{2R}{\pi} = 6{,}37\ \text{см}` },
      { title: 'б) четверть окружности + отрезок R по оси y',
        tex: String.raw`X_C = \frac{\frac{\pi R}{2}\cdot\frac{2R}{\pi}}{\frac{\pi R}{2} + R} = \frac{2R}{\pi + 2} = 3{,}89\ \text{см},\quad Y_C = \frac{R^2 + R\cdot\frac R2}{\frac{(\pi + 2)R}{2}} = \frac{3R}{\pi + 2} = 5{,}83\ \text{см}` },
      { title: 'в) отрезок R + полуокружность вниз',
        text: String.raw`Отрезок: длина $R$, центр $(R/2;\ R)$. Полуокружность: длина $\pi R$, центр масс $(2R;\ R - 2R/\pi)$.`,
        tex: String.raw`X_C = \frac{R\cdot\frac R2 + \pi R\cdot2R}{(\pi + 1)R} = \frac{4\pi + 1}{2(\pi + 1)}R = 16{,}4\ \text{см},\quad Y_C = \frac{R\cdot R + \pi R\left(R - \frac{2R}\pi\right)}{(\pi + 1)R} = \frac{\pi - 1}{\pi + 1}R = 5{,}17\ \text{см}` },
      { title: 'г) отрезок R по оси y + четверть окружности + отрезок 2R по оси x',
        text: String.raw`Вертикальный отрезок: центр $(0;\ 1{,}5R)$. Четверть окружности с центром $O_1(R;\ R)$: центр масс $(R - 2R/\pi;\ R - 2R/\pi)$. Горизонтальный отрезок $2R$: центр $(2R;\ 0)$. Полная длина $\frac{(\pi + 6)R}{2}$.`,
        tex: String.raw`X_C = R = 10\ \text{см},\qquad Y_C = \frac{\pi + 1}{\pi + 6}R = 4{,}53\ \text{см}` },
    ],
    answer: [
      String.raw`а)\ X_C = 0,\ Y_C = 6{,}37\ \text{см};\quad б)\ X_C = 3{,}89,\ Y_C = 5{,}83\ \text{см}`,
      String.raw`в)\ X_C = 16{,}4,\ Y_C = 5{,}17\ \text{см};\quad г)\ X_C = 10,\ Y_C = 4{,}53\ \text{см}`,
    ],
  },

  /* ===================== 3.63 ===================== */
  {
    id: '3.63', chapter: CH, section: S5, page: '75',
    title: 'Фигуры из пластины: центр масс',
    given: [[String.raw`R = 10\ \text{см}`, String.raw`0{,}1\ \text{м}`]],
    find: String.raw`X_C,\ Y_C \;—\; ?`,
    formulas: [CM, { tex: String.raw`y_\text{полукруга} = \frac{4R}{3\pi}`, text: 'центр масс полукруга — от центра по оси симметрии' }, { tex: String.raw`r_\text{сект} = \frac{2R\sin\beta}{3\beta}`, text: 'центр масс сектора с половинным углом β — на биссектрисе' }, { tex: String.raw`Y_C = \frac{S_1y_1 - S_2y_2}{S_1 - S_2}`, text: 'фигура с вырезом: вырез — «отрицательная площадь»' }],
    steps: [
      { title: 'Принцип',
        text: 'Пластина однородная: масса пропорциональна площади.' },
      { title: 'а) полукруг с центром O₁(R; 0)',
        tex: String.raw`X_C = R = 10\ \text{см},\qquad Y_C = \frac{4R}{3\pi} = 4{,}24\ \text{см}` },
      { title: 'б) сектор 2π/3 от оси x',
        text: String.raw`Половинный угол $\beta = \pi/3$, биссектриса под углом $60^\circ$ к оси $x$.`,
        tex: String.raw`r_C = \frac{2R\cdot\frac{\sqrt3}{2}}{\pi} = \frac{\sqrt3 R}{\pi},\quad X_C = r_C\cos60^\circ = \frac{\sqrt3}{2\pi}R = 2{,}76\ \text{см},\quad Y_C = \frac{3}{2\pi}R = 4{,}77\ \text{см}` },
      { title: 'в) прямоугольник 2R × R минус полукруг',
        text: String.raw`Прямоугольник: $S_1 = 2R^2$, $y_1 = R/2$. Полукруг с центром $O_1(R;\ R)$ обращён вниз: $S_2 = \frac{\pi R^2}{2}$, $y_2 = R - \frac{4R}{3\pi}$. По симметрии $X_C = R$.`,
        tex: String.raw`Y_C = \frac{R^3 - \frac{\pi R^2}{2}\left(R - \frac{4R}{3\pi}\right)}{2R^2 - \frac{\pi R^2}{2}} = \frac{10 - 3\pi}{3(4 - \pi)}R = 2{,}23\ \text{см}` },
      { title: 'г) полукруг R минус круг R/2',
        text: String.raw`Полукруг: $S_1 = \frac{\pi R^2}{2}$, $y_1 = \frac{4R}{3\pi}$. Круг с центром $O_2(R;\ R/2)$: $S_2 = \frac{\pi R^2}{4}$, $y_2 = \frac R2$. По симметрии $X_C = R$.`,
        tex: String.raw`Y_C = \frac{\frac{\pi R^2}{2}\cdot\frac{4R}{3\pi} - \frac{\pi R^2}{4}\cdot\frac R2}{\frac{\pi R^2}{4}} = \left(\frac{8}{3\pi} - \frac12\right)R = 3{,}49\ \text{см}` },
    ],
    answer: [
      String.raw`а)\ X_C = 10,\ Y_C = 4{,}24\ \text{см};\quad б)\ X_C = 2{,}76,\ Y_C = 4{,}77\ \text{см}`,
      String.raw`в)\ X_C = 10,\ Y_C = 2{,}23\ \text{см};\quad г)\ X_C = 10,\ Y_C = 3{,}49\ \text{см}`,
    ],
  },

  );
})();
