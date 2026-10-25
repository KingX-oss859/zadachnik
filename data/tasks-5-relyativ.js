/*
  § 5. Релятивистская механика — задачи 5.1–5.44 (стр. 97–101).
  Условия задач показываются дословно из книги (data/book-tasks.js).
  Ответы пересчитаны скриптом tools/check_relyativ.py и сверены с book/99-otvety.md.
  Где ответ книги расходится с расчётом — плашка note «Расхождение с ответом книги».
  Постоянные — табл. 22, 24: c = 3,00·10⁸ м/с; электрон m₀ = 9,11·10⁻³¹ кг, E₀ = 0,511 МэВ; протон 1,67·10⁻²⁷ кг, 938 МэВ.
  β = v/c, γ = 1/√(1 − β²).
*/
(function () {
  const CH = 'Гл. 1. Физические основы механики';
  const S1 = 'Релятивистское изменение длин и интервалов времени';
  const S2 = 'Релятивистское сложение скоростей';
  const S3 = 'Релятивистская масса и релятивистский импульс';
  const S4 = 'Взаимосвязь массы и энергии';
  const S5 = 'Кинетическая энергия релятивистской частицы';
  const S6 = 'Связь энергии релятивистской частицы с её импульсом';
  const MISMATCH = '<b>Расхождение с ответом книги.</b> ';
  const SMALL = '<b>Расхождение в последней цифре.</b> ';
  const TYPO = '<b>Опечатка в ответе книги.</b> ';

  const LEN = { tex: String.raw`l = l_0\sqrt{1 - \beta^2}`, text: 'лоренцево сокращение: сокращается только размер вдоль скорости' };
  const TIME = { tex: String.raw`\Delta t = \frac{\Delta t_0}{\sqrt{1 - \beta^2}}`, text: 'замедление хода движущихся часов; Δt₀ — собственное время' };
  const SMALLB = { tex: String.raw`\sqrt{1 - \beta^2} \approx 1 - \frac{\beta^2}{2},\quad \frac{1}{\sqrt{1 - \beta^2}} \approx 1 + \frac{\beta^2}{2}`, text: 'при β ≪ 1' };
  const ADD = { tex: String.raw`v = \frac{v' + v_0}{1 + v_0v'/c^2}`, text: 'релятивистское сложение скоростей вдоль одной прямой' };
  const SUB = { tex: String.raw`u_{21} = \frac{v_2 - v_1}{1 - v_1v_2/c^2}`, text: 'скорость тела 2 в системе тела 1 (обратное преобразование)' };
  const MASS = { tex: String.raw`m = \frac{m_0}{\sqrt{1 - \beta^2}} = \gamma m_0`, text: 'релятивистская масса' };
  const MOM = { tex: String.raw`p = mv = m_0c\frac{\beta}{\sqrt{1 - \beta^2}}`, text: 'релятивистский импульс' };
  const EMC = { tex: String.raw`E = mc^2 = E_0 + T,\quad E_0 = m_0c^2`, text: 'полная энергия, энергия покоя, кинетическая энергия' };
  const DEM = { tex: String.raw`\Delta E = \Delta m\,c^2`, text: 'изменение энергии тела и его массы связаны' };
  const KIN = { tex: String.raw`T = E_0\left(\frac{1}{\sqrt{1 - \beta^2}} - 1\right)`, text: 'кинетическая энергия релятивистской частицы' };
  const BT = { tex: String.raw`\beta = \frac{\sqrt{(2E_0 + T)T}}{E_0 + T}`, text: 'скорость по кинетической энергии (пример 3)' };
  const PE = { tex: String.raw`p^2c^2 = E^2 - E_0^2 = T(T + 2E_0)`, text: 'связь энергии и импульса' };
  const INV = { tex: String.raw`M_0c^2 = \sqrt{E^2 - p^2c^2}`, text: 'энергия покоя системы (в системе центра инерции) по суммарным E и p' };

  window.TASKS.push(

  /* ===================== 5.1 ===================== */
  {
    id: '5.1', chapter: CH, section: S1, page: '97',
    title: 'Когда заметно сокращение длины',
    given: [[String.raw`\Delta l = 0{,}1\ \text{мкм}`, String.raw`10^{-7}\ \text{м}`], [String.raw`l_0 = 1\ \text{м}`, '']],
    find: String.raw`u \;—\; ?`,
    formulas: [LEN, SMALLB],
    steps: [
      { title: 'Сокращение должно достичь Δl',
        text: 'Скорость будет мала по сравнению с c — пользуемся приближением.',
        tex: String.raw`l_0 - l = l_0\left(1 - \sqrt{1 - \beta^2}\right) \approx l_0\frac{\beta^2}{2} = \Delta l` },
      { title: 'Скорость',
        tex: String.raw`u = c\sqrt{\frac{2\Delta l}{l_0}} = 3\cdot10^8\cdot\sqrt{2\cdot10^{-7}} = 1{,}34\cdot10^5\ \text{м/с}` },
    ],
    answer: [String.raw`u = c\sqrt{2\Delta l/l_0} = 134\ \text{км/с}`],
  },

  /* ===================== 5.2 ===================== */
  {
    id: '5.2', chapter: CH, section: S1, page: '97',
    title: 'Когда заметно замедление часов',
    given: [[String.raw`\tau_0 = 1\ \text{с}`, ''], [String.raw`\Delta\tau = 10\ \text{пс}`, String.raw`10^{-11}\ \text{с}`]],
    find: String.raw`u \;—\; ?`,
    formulas: [TIME, SMALLB],
    steps: [
      { title: 'Разница показаний должна достичь Δτ',
        tex: String.raw`\tau - \tau_0 = \tau_0\left(\frac{1}{\sqrt{1 - \beta^2}} - 1\right) \approx \tau_0\frac{\beta^2}{2} = \Delta\tau` },
      { title: 'Скорость',
        tex: String.raw`u = c\sqrt{\frac{2\Delta\tau}{\tau_0}} = 3\cdot10^8\cdot\sqrt{2\cdot10^{-11}} = 1{,}34\cdot10^3\ \text{м/с}` },
    ],
    answer: [String.raw`u = c\sqrt{2\Delta\tau/\tau_0} = 1{,}34\ \text{км/с}`],
  },

  /* ===================== 5.3 ===================== */
  {
    id: '5.3', chapter: CH, section: S1, page: '97',
    title: 'Отставание часов на спутнике',
    given: [[String.raw`v_0 = 7{,}9\ \text{км/с}`, String.raw`7{,}9\cdot10^3\ \text{м/с}`], [String.raw`\tau_0 = 0{,}5\ \text{года}`, String.raw`1{,}58\cdot10^7\ \text{с}`]],
    find: String.raw`\Delta\tau \;—\; ?`,
    formulas: [TIME, SMALLB],
    steps: [
      { title: 'Сколько пройдёт на спутнике',
        text: 'По земным часам прошло τ₀; движущиеся часы спутника покажут меньше: τ₀√(1 − β²).',
        tex: String.raw`\Delta\tau = \tau_0\left(1 - \sqrt{1 - \beta^2}\right) \approx \frac12\frac{v_0^2}{c^2}\tau_0` },
      { title: 'Считаем',
        tex: String.raw`\Delta\tau = \frac12\cdot\left(\frac{7{,}9\cdot10^3}{3\cdot10^8}\right)^2\cdot1{,}58\cdot10^7 = \frac12\cdot6{,}93\cdot10^{-10}\cdot1{,}58\cdot10^7 = 5{,}47\cdot10^{-3}\ \text{с}` },
    ],
    answer: [String.raw`\Delta\tau = \tfrac12(v_0/c)^2\tau_0 = 5{,}47\ \text{мс}`],
    note: MISMATCH + String.raw`В книге 0,57 с по той же формуле — в 100 раз больше. $\frac12\cdot6{,}93\cdot10^{-10}\cdot1{,}58\cdot10^7$ с $= 5{,}47\cdot10^{-3}$ с: за полгода часы спутника отстанут примерно на 5,5 мс.`,
  },

  /* ===================== 5.4 ===================== */
  {
    id: '5.4', chapter: CH, section: S1, page: '98',
    title: 'Замедление времени в фотонной ракете',
    given: [[String.raw`v = 0{,}6c`, '']],
    find: String.raw`\Delta t/\Delta t_0 \;—\; ?`,
    formulas: [TIME],
    steps: [
      { title: 'Во сколько раз',
        tex: String.raw`\frac{\Delta t}{\Delta t_0} = \frac{1}{\sqrt{1 - 0{,}6^2}} = \frac{1}{0{,}8} = 1{,}25` },
    ],
    answer: [String.raw`\text{в } 1{,}25\ \text{раза}`],
  },

  /* ===================== 5.5 ===================== */
  {
    id: '5.5', chapter: CH, section: S1, page: '98',
    title: 'Наклонный стержень в движущейся системе',
    given: [[String.raw`l_0 = 1\ \text{м}`, ''], [String.raw`\varphi_0 = 45^\circ`, ''], [String.raw`v_0 = 0{,}8c`, '']],
    find: String.raw`l,\ \varphi \;—\; ?`,
    formulas: [LEN],
    steps: [
      { title: 'Проекции стержня',
        text: 'Вдоль x проекция сокращается в √(1 − β²) = 0,6 раза, поперёк — не меняется (пример 2).',
        tex: String.raw`\Delta x = l_0\cos\varphi_0\sqrt{1 - \beta^2} = 0{,}707\cdot0{,}6 = 0{,}424\ \text{м};\quad \Delta y = l_0\sin\varphi_0 = 0{,}707\ \text{м}` },
      { title: 'Длина',
        tex: String.raw`l = \sqrt{\Delta x^2 + \Delta y^2} = l_0\sqrt{1 - \beta^2\cos^2\varphi_0} = \sqrt{1 - 0{,}64\cdot0{,}5} = 0{,}825\ \text{м}` },
      { title: 'Угол',
        tex: String.raw`\operatorname{tg}\varphi = \frac{\Delta y}{\Delta x} = \frac{\operatorname{tg}\varphi_0}{\sqrt{1 - \beta^2}} = \frac{1}{0{,}6} = 1{,}667,\quad \varphi = 59^\circ` },
    ],
    answer: [String.raw`l = l_0\sqrt{1 - \beta^2\cos^2\varphi_0} = 0{,}825\ \text{м}`, String.raw`\varphi = \operatorname{arctg}\frac{\operatorname{tg}\varphi_0}{\sqrt{1 - \beta^2}} = 59^\circ`],
    note: TYPO + String.raw`В формуле книги для угла $\varphi = \operatorname{arctg}\frac{\operatorname{tg}\varphi_0}{1 - v^2/c^2}$ пропущен корень: так вышло бы 70°. Число 59° в книге верное — оно получается с $\sqrt{1 - v^2/c^2}$.`,
  },

  /* ===================== 5.6 ===================== */
  {
    id: '5.6', chapter: CH, section: S1, page: '98',
    title: 'Угол между диагоналями «сплющенного» квадрата',
    given: [[String.raw`v = 0{,}95c`, '']],
    find: String.raw`\varphi \;—\; ?`,
    formulas: [LEN],
    steps: [
      { title: 'Где покоится квадрат',
        text: 'Сокращение заметно, если квадрат покоится в системе K′ (его сторона параллельна x′) и движется вместе с ней. Иначе в K он оставался бы квадратом с прямым углом между диагоналями.' },
      { title: 'Стороны в системе K',
        text: 'Сторона вдоль x сокращается, поперечная — нет: квадрат превращается в прямоугольник.',
        tex: String.raw`b_x = a\sqrt{1 - \beta^2} = a\sqrt{1 - 0{,}95^2} = 0{,}312a,\quad b_y = a` },
      { title: 'Наклон диагонали к оси x',
        tex: String.raw`\operatorname{tg}\alpha = \frac{b_y}{b_x} = \frac{1}{\sqrt{1 - \beta^2}} = 3{,}20,\quad \alpha = 72{,}66^\circ = 72^\circ40'` },
      { title: 'Угол между диагоналями',
        text: 'Диагонали наклонены к оси x на +α и −α.',
        tex: String.raw`\varphi = 2\alpha = 145{,}3^\circ\quad (\text{смежный острый угол } 180^\circ - 2\alpha = 34{,}7^\circ)` },
    ],
    answer: [String.raw`\varphi = 2\operatorname{arctg}\frac{1}{\sqrt{1 - \beta^2}} = 145{,}3^\circ\ (34{,}7^\circ)`],
    note: MISMATCH + String.raw`В книге «$\varphi = \operatorname{arctg}\frac{1}{\sqrt{1 - v^2/c^2}} = 72°66'$». Это угол одной диагонали с осью $x$ (72,66° $= 72°40'$ — десятичные доли напечатаны как минуты, а минут больше 59 не бывает). Угол между диагоналями вдвое больше: 145,3°, или острый 34,7°.`,
  },

  /* ===================== 5.7 ===================== */
  {
    id: '5.7', chapter: CH, section: S1, page: '98',
    title: 'Собственное время жизни пи-мезона',
    given: [[String.raw`l = 75\ \text{м}`, ''], [String.raw`v = 0{,}995c`, '']],
    find: String.raw`\tau_0 \;—\; ?`,
    formulas: [TIME],
    steps: [
      { title: 'Время в лабораторной системе',
        tex: String.raw`\tau = \frac lv = \frac{75}{0{,}995\cdot3\cdot10^8} = 2{,}51\cdot10^{-7}\ \text{с}` },
      { title: 'Собственное время',
        tex: String.raw`\tau_0 = \tau\sqrt{1 - \beta^2} = 2{,}51\cdot10^{-7}\cdot\sqrt{1 - 0{,}995^2} = 2{,}51\cdot10^{-7}\cdot0{,}0999 = 2{,}5\cdot10^{-8}\ \text{с}` },
    ],
    answer: [String.raw`\tau_0 = \frac lv\sqrt{1 - \beta^2} = 25\ \text{нс}`],
  },

  /* ===================== 5.8 ===================== */
  {
    id: '5.8', chapter: CH, section: S1, page: '98',
    title: 'Скорость мю-мезона',
    given: [[String.raw`\tau_0 = 2\ \text{мкс}`, String.raw`2\cdot10^{-6}\ \text{с}`], [String.raw`l = 6\ \text{км}`, String.raw`6\cdot10^3\ \text{м}`]],
    find: String.raw`\beta \;—\; ?`,
    formulas: [TIME],
    steps: [
      { title: 'Путь в лабораторной системе',
        tex: String.raw`l = v\tau = \frac{\beta c\tau_0}{\sqrt{1 - \beta^2}}\ \Rightarrow\ \frac{\beta}{\sqrt{1 - \beta^2}} = \frac{l}{c\tau_0} = \frac{6\cdot10^3}{3\cdot10^8\cdot2\cdot10^{-6}} = 10` },
      { title: 'Выражаем β',
        tex: String.raw`\beta = \frac{1}{\sqrt{1 + (c\tau_0/l)^2}} = \frac{1}{\sqrt{1 + 0{,}01}} = 0{,}995` },
    ],
    answer: [String.raw`\beta = \frac{1}{\sqrt{1 + \tau_0^2c^2/l^2}} = 0{,}995`],
  },

  /* ===================== 5.9 ===================== */
  {
    id: '5.9', chapter: CH, section: S2, page: '98',
    title: 'Сложение скоростей при v ≪ c',
    given: [[String.raw`v',\ v_0 \ll c`, '']],
    find: String.raw`\text{показать: } v \to v' + v_0`,
    formulas: [ADD],
    steps: [
      { title: 'Знаменатель стремится к единице',
        text: 'Если обе скорости малы по сравнению с c, произведение v₀v′/c² — малая величина второго порядка.',
        tex: String.raw`\frac{v_0v'}{c^2} \ll 1\ \Rightarrow\ v = \frac{v' + v_0}{1 + v_0v'/c^2} \approx v' + v_0` },
    ],
    answer: [String.raw`v \approx v' + v_0\ \ (\text{закон Галилея})`],
  },

  /* ===================== 5.10 ===================== */
  {
    id: '5.10', chapter: CH, section: S2, page: '98',
    title: 'Относительная скорость двух частиц',
    given: [[String.raw`v_1 = 0{,}6c`, ''], [String.raw`v_2 = 0{,}9c`, '']],
    find: String.raw`u_{21} \;—\; ?`,
    formulas: [SUB],
    steps: [
      { title: '1) В одном направлении',
        text: 'Переходим в систему первой частицы (она движется со скоростью v₁).',
        tex: String.raw`u_{21} = \frac{v_2 - v_1}{1 - v_1v_2/c^2} = \frac{0{,}9 - 0{,}6}{1 - 0{,}54}c = \frac{0{,}3}{0{,}46}c = 0{,}652c` },
      { title: '2) В противоположных направлениях',
        text: 'Скорость второй частицы −v₂.',
        tex: String.raw`u_{21} = \frac{v_2 + v_1}{1 + v_1v_2/c^2} = \frac{1{,}5}{1{,}54}c = 0{,}974c` },
    ],
    answer: [String.raw`u_{21} = 0{,}652c\ \text{(в одном направлении)}`, String.raw`u_{21} = 0{,}974c\ \text{(навстречу)}`],
    note: MISMATCH + String.raw`В первом случае в книге 0,195c — так выходит, если в знаменателе поставить плюс: $\frac{0{,}3}{1{,}54} = 0{,}195$. Но для частиц, летящих в одну сторону, в знаменателе минус: $\frac{0{,}3}{1 - 0{,}54} = 0{,}652$. Проверка: при $v_1 = 0{,}6c$ и найденной $u_{21} = 0{,}652c$ формула сложения даёт $\frac{0{,}652 + 0{,}6}{1 + 0{,}391} = 0{,}9$, как и должно быть; с 0,195 вышло бы 0,71.`,
  },

  /* ===================== 5.11 ===================== */
  {
    id: '5.11', chapter: CH, section: S2, page: '98',
    title: 'Две разлетающиеся частицы',
    given: [[String.raw`u = 0{,}5c`, ''], [String.raw`|v_1| = |v_2| = v`, '']],
    find: String.raw`v \;—\; ?`,
    formulas: [SUB],
    steps: [
      { title: 'Скорость одной частицы относительно другой',
        text: 'Частицы летят в разные стороны со скоростями +v и −v.',
        tex: String.raw`u = \frac{2v}{1 + v^2/c^2}\ \Rightarrow\ \beta^2 - \frac{2}{0{,}5}\beta + 1 = 0\ \Rightarrow\ \beta^2 - 4\beta + 1 = 0` },
      { title: 'Корень меньше единицы',
        tex: String.raw`\beta = 2 - \sqrt3 = 0{,}268` },
    ],
    answer: [String.raw`v = (2 - \sqrt3)c = 0{,}268c`],
    note: '<b>О смысле условия.</b> ' + String.raw`Ответ книги 0,268c — если $u$ означает скорость одной частицы в системе другой. Если же понимать «в той же системе отсчёта» буквально — как скорость, с которой растёт расстояние между частицами в лаборатории ($u = 2v$), то $v = 0{,}25c$.`,
  },

  /* ===================== 5.12 ===================== */
  {
    id: '5.12', chapter: CH, section: S2, page: '98',
    title: 'Фотон от движущегося иона',
    given: [[String.raw`v = 0{,}8c`, ''], [String.raw`v' = c`, '']],
    find: String.raw`v_\text{ф} \;—\; ?`,
    formulas: [ADD],
    steps: [
      { title: 'Сложение со скоростью света',
        tex: String.raw`v_\text{ф} = \frac{c + 0{,}8c}{1 + 0{,}8c\cdot c/c^2} = \frac{1{,}8c}{1{,}8} = c` },
      { title: 'Вывод',
        text: 'Скорость света одинакова во всех инерциальных системах — от скорости источника она не зависит.' },
    ],
    answer: [String.raw`v_\text{ф} = c`],
  },

  /* ===================== 5.13 ===================== */
  {
    id: '5.13', chapter: CH, section: S2, page: '98',
    title: 'β-частица относительно ядра',
    given: [[String.raw`v_1 = 0{,}4c`, ''], [String.raw`v_2 = 0{,}75c`, '']],
    find: String.raw`u_{21} \;—\; ?`,
    formulas: [SUB],
    steps: [
      { title: 'Переходим в систему ядра',
        tex: String.raw`u_{21} = \frac{v_2 - v_1}{1 - v_1v_2/c^2} = \frac{0{,}75 - 0{,}4}{1 - 0{,}3}c = \frac{0{,}35}{0{,}7}c = 0{,}5c` },
    ],
    answer: [String.raw`u_{21} = 0{,}5c`],
  },

  /* ===================== 5.14 ===================== */
  {
    id: '5.14', chapter: CH, section: S2, page: '98',
    title: 'Сближение встречных частиц',
    given: [[String.raw`|v| = 0{,}9c`, '']],
    find: String.raw`u_{21} \;—\; ?`,
    formulas: [SUB],
    steps: [
      { title: 'В системе одной из частиц',
        tex: String.raw`u_{21} = \frac{0{,}9 + 0{,}9}{1 + 0{,}81}c = \frac{1{,}8}{1{,}81}c = 0{,}994c` },
    ],
    answer: [String.raw`u_{21} = \frac{2v}{1 + v^2/c^2} = 0{,}994c`],
  },

  /* ===================== 5.15 ===================== */
  {
    id: '5.15', chapter: CH, section: S3, page: '99',
    title: 'Масса при v = 0,5c',
    given: [[String.raw`v = 0{,}5c`, '']],
    find: String.raw`m/m_0 \;—\; ?`,
    formulas: [MASS],
    steps: [
      { title: 'Считаем',
        tex: String.raw`\frac{m}{m_0} = \frac{1}{\sqrt{1 - 0{,}25}} = 1{,}15` },
    ],
    answer: [String.raw`m/m_0 = 1{,}15`],
  },

  /* ===================== 5.16 ===================== */
  {
    id: '5.16', chapter: CH, section: S3, page: '99',
    title: 'Масса втрое больше массы покоя',
    given: [[String.raw`m = 3m_0`, '']],
    find: String.raw`v \;—\; ?`,
    formulas: [MASS],
    steps: [
      { title: 'Выражаем β',
        tex: String.raw`\sqrt{1 - \beta^2} = \frac{m_0}{m} = \frac13\ \Rightarrow\ \beta = \sqrt{1 - \frac19} = 0{,}943` },
    ],
    answer: [String.raw`v = \tfrac{2\sqrt2}{3}c = 0{,}943c`],
  },

  /* ===================== 5.17 ===================== */
  {
    id: '5.17', chapter: CH, section: S3, page: '99',
    title: 'Масса электрона по e/m',
    given: [[String.raw`e/m = 0{,}88\cdot10^{11}\ \text{Кл/кг}`, ''], [String.raw`e/m_0 = 1{,}76\cdot10^{11}\ \text{Кл/кг}`, '']],
    find: String.raw`m,\ v \;—\; ?`,
    formulas: [MASS],
    steps: [
      { title: 'Масса',
        text: 'Заряд от скорости не зависит, поэтому отношение e/m уменьшилось за счёт массы.',
        tex: String.raw`\frac{m}{m_0} = \frac{e/m_0}{e/m} = \frac{1{,}76}{0{,}88} = 2,\quad m = 2m_0 = 1{,}82\cdot10^{-30}\ \text{кг}` },
      { title: 'Скорость',
        tex: String.raw`\sqrt{1 - \beta^2} = \frac12\ \Rightarrow\ \beta = \frac{\sqrt3}{2} = 0{,}866` },
    ],
    answer: [String.raw`m = 2m_0 = 1{,}82\cdot10^{-30}\ \text{кг}`, String.raw`v = 0{,}866c`],
  },

  /* ===================== 5.18 ===================== */
  {
    id: '5.18', chapter: CH, section: S3, page: '99',
    title: 'Прирост массы при 30 000 км/с',
    given: [[String.raw`v = 3{,}0\cdot10^7\ \text{м/с}`, String.raw`\beta = 0{,}1`]],
    find: String.raw`(m - m_0)/m_0 \;—\; ?`,
    formulas: [MASS, SMALLB],
    steps: [
      { title: 'Считаем',
        tex: String.raw`\frac{m - m_0}{m_0} = \frac{1}{\sqrt{1 - 0{,}01}} - 1 = 0{,}005 \approx \frac{\beta^2}{2}` },
    ],
    answer: [String.raw`\approx 0{,}5\,\%`],
  },

  /* ===================== 5.19 ===================== */
  {
    id: '5.19', chapter: CH, section: S3, page: '99',
    title: 'Импульс при v ≪ c',
    given: [[String.raw`v \ll c`, '']],
    find: String.raw`\text{показать: } p \to m_0v`,
    formulas: [MOM],
    steps: [
      { title: 'Корень стремится к единице',
        tex: String.raw`\beta \ll 1:\quad \sqrt{1 - \beta^2} \approx 1\ \Rightarrow\ p = \frac{m_0v}{\sqrt{1 - \beta^2}} \approx m_0v` },
    ],
    answer: [String.raw`p \approx m_0v\ \ (\text{классический импульс})`],
  },

  /* ===================== 5.20 ===================== */
  {
    id: '5.20', chapter: CH, section: S3, page: '99',
    title: 'Импульс электрона при 0,6c',
    given: [[String.raw`v = 0{,}6c`, ''], [String.raw`m_0 = 9{,}11\cdot10^{-31}\ \text{кг}`, '']],
    find: String.raw`p \;—\; ?`,
    formulas: [MOM],
    steps: [
      { title: 'Считаем',
        tex: String.raw`p = \frac{m_0\cdot0{,}6c}{\sqrt{1 - 0{,}36}} = \frac{9{,}11\cdot10^{-31}\cdot1{,}8\cdot10^8}{0{,}8} = 2{,}05\cdot10^{-22}\ \text{кг·м/с}` },
    ],
    answer: [String.raw`p = 2{,}05\cdot10^{-22}\ \text{кг·м/с}`],
  },

  /* ===================== 5.21 ===================== */
  {
    id: '5.21', chapter: CH, section: S3, page: '99',
    title: 'Скорость при p = m₀c',
    given: [[String.raw`p = m_0c`, '']],
    find: String.raw`\beta \;—\; ?`,
    formulas: [MOM],
    steps: [
      { title: 'Уравнение для β',
        tex: String.raw`\frac{\beta}{\sqrt{1 - \beta^2}} = 1\ \Rightarrow\ \beta^2 = 1 - \beta^2\ \Rightarrow\ \beta = \frac{1}{\sqrt2} = 0{,}707` },
    ],
    answer: [String.raw`v = c/\sqrt2 = 0{,}707c`],
  },

  /* ===================== 5.22 ===================== */
  {
    id: '5.22', chapter: CH, section: S3, page: '99',
    title: 'Две частицы: лаборатория и центр инерции',
    given: [[String.raw`v = 0{,}8c`, ''], [String.raw`\text{вторая покоится}`, '']],
    find: String.raw`m,\ V,\ m_C \;—\; ?`,
    formulas: [MASS, MOM, { tex: String.raw`V_C = \frac{\sum p_i}{\sum m_i}`, text: 'скорость центра инерции: суммарный импульс / суммарная релятивистская масса' }],
    steps: [
      { title: '1) Релятивистская масса',
        tex: String.raw`m = \frac{m_0}{\sqrt{1 - 0{,}64}} = \frac{m_0}{0{,}6} = \frac53m_0 = 1{,}67m_0` },
      { title: 'Скорость центра инерции',
        tex: String.raw`V_C = \frac{mv}{m + m_0} = \frac{\frac53\cdot0{,}8c}{\frac83} = 0{,}5c` },
      { title: '2) Скорости в системе центра инерции',
        text: 'Покоящаяся частица движется в ней со скоростью −V_C; налетающая — по формуле вычитания скоростей:',
        tex: String.raw`u = \frac{0{,}8 - 0{,}5}{1 - 0{,}4}c = 0{,}5c` },
      { title: '3) Масса каждой частицы в этой системе',
        tex: String.raw`m_C = \frac{m_0}{\sqrt{1 - 0{,}25}} = \frac{2m_0}{\sqrt3} = 1{,}15m_0` },
    ],
    answer: [String.raw`m = \tfrac53m_0 = 1{,}67m_0`, String.raw`v = 0{,}5c`, String.raw`m_C = 2m_0/\sqrt3 = 1{,}15m_0`],
  },

  /* ===================== 5.23 ===================== */
  {
    id: '5.23', chapter: CH, section: S3, page: '99',
    title: 'Скорость центра масс двух частиц',
    given: [[String.raw`m_{01} = m_0,\ v = 0{,}6c`, ''], [String.raw`m_{02} = 2m_0,\ \text{покоится}`, '']],
    find: String.raw`V_C \;—\; ?`,
    formulas: [MASS, MOM],
    steps: [
      { title: 'Суммарные импульс и масса',
        tex: String.raw`\gamma = \frac{1}{0{,}8} = 1{,}25;\quad p = 1{,}25m_0\cdot0{,}6c = 0{,}75m_0c;\quad m_1 + m_2 = 1{,}25m_0 + 2m_0 = 3{,}25m_0` },
      { title: 'Скорость центра масс',
        tex: String.raw`V_C = \frac{p}{m_1 + m_2} = \frac{0{,}75}{3{,}25}c = \frac{3}{13}c = 0{,}231c` },
    ],
    answer: [String.raw`V_C = \tfrac{3}{13}c = 0{,}231c`],
  },

  /* ===================== 5.24 ===================== */
  {
    id: '5.24', chapter: CH, section: S4, page: '99',
    title: 'Масса 1 джоуля',
    given: [[String.raw`\Delta E = 1\ \text{Дж}`, '']],
    find: String.raw`\Delta m \;—\; ?`,
    formulas: [DEM],
    steps: [
      { title: 'Считаем',
        tex: String.raw`\Delta m = \frac{\Delta E}{c^2} = \frac{1}{9\cdot10^{16}} = 1{,}11\cdot10^{-17}\ \text{кг}` },
    ],
    answer: [String.raw`\Delta m = 1{,}11\cdot10^{-17}\ \text{кг} = 11{,}1\ \text{фг}`],
  },

  /* ===================== 5.25 ===================== */
  {
    id: '5.25', chapter: CH, section: S4, page: '99',
    title: 'Энергия 1 грамма',
    given: [[String.raw`\Delta m = 1\ \text{г}`, String.raw`10^{-3}\ \text{кг}`]],
    find: String.raw`\Delta E \;—\; ?`,
    formulas: [DEM],
    steps: [
      { title: 'Считаем',
        tex: String.raw`\Delta E = \Delta m\,c^2 = 10^{-3}\cdot9\cdot10^{16} = 9\cdot10^{13}\ \text{Дж}` },
    ],
    answer: [String.raw`\Delta E = 9\cdot10^{13}\ \text{Дж} = 90\ \text{ТДж}`],
  },

  /* ===================== 5.26 ===================== */
  {
    id: '5.26', chapter: CH, section: S4, page: '99',
    title: 'Энергия покоя электрона, протона, α-частицы',
    given: [[String.raw`m_e = 9{,}11\cdot10^{-31}\ \text{кг}`, ''], [String.raw`m_p = 1{,}67\cdot10^{-27}\ \text{кг}`, ''], [String.raw`m_\alpha = 6{,}64\cdot10^{-27}\ \text{кг}`, ''], [String.raw`1\ \text{МэВ} = 1{,}60\cdot10^{-13}\ \text{Дж}`, '']],
    find: String.raw`E_0 \;—\; ?`,
    formulas: [EMC],
    steps: [
      { title: '1) Электрон',
        tex: String.raw`E_0 = 9{,}11\cdot10^{-31}\cdot9\cdot10^{16} = 8{,}20\cdot10^{-14}\ \text{Дж} = \frac{8{,}20\cdot10^{-14}}{1{,}60\cdot10^{-13}} = 0{,}512\ \text{МэВ}` },
      { title: '2) Протон',
        tex: String.raw`E_0 = 1{,}67\cdot10^{-27}\cdot9\cdot10^{16} = 1{,}50\cdot10^{-10}\ \text{Дж} = 939\ \text{МэВ}` },
      { title: '3) α-частица',
        tex: String.raw`E_0 = 6{,}64\cdot10^{-27}\cdot9\cdot10^{16} = 5{,}98\cdot10^{-10}\ \text{Дж} = 3{,}73\cdot10^3\ \text{МэВ}` },
    ],
    answer: [String.raw`E_e = 82{,}0\ \text{фДж} = 0{,}512\ \text{МэВ}`, String.raw`E_p = 150\ \text{пДж} = 939\ \text{МэВ}`, String.raw`E_\alpha = 598\ \text{пДж} = 3{,}73\cdot10^3\ \text{МэВ}`],
    note: SMALL + String.raw`В книге 81,6 фДж (0,511 МэВ), 938 МэВ и 596 пДж — это точные справочные значения из табл. 22. Округлённые массы и $c = 3{,}00\cdot10^8$ м/с дают на 0,1–0,5 % больше.`,
  },

  /* ===================== 5.27 ===================== */
  {
    id: '5.27', chapter: CH, section: S4, page: '99',
    title: 'Масса нагретого океана',
    given: [[String.raw`V = 1{,}37\cdot10^9\ \text{км}^3`, String.raw`1{,}37\cdot10^{18}\ \text{м}^3`], [String.raw`\rho = 1{,}03\cdot10^3\ \text{кг/м}^3`, ''], [String.raw`\Delta t = 1\ ^\circ\text{C}`, ''], [String.raw`c_\text{в} = 4{,}19\ \text{кДж/(кг·К)}`, '']],
    find: String.raw`\Delta m \;—\; ?`,
    formulas: [DEM, { tex: String.raw`Q = c_\text{в}\rho V\Delta t`, text: 'теплота на нагревание воды' }],
    steps: [
      { title: 'Энергия нагревания',
        tex: String.raw`Q = 4{,}19\cdot10^3\cdot1{,}03\cdot10^3\cdot1{,}37\cdot10^{18}\cdot1 = 5{,}91\cdot10^{24}\ \text{Дж}` },
      { title: 'Прирост массы',
        tex: String.raw`\Delta m = \frac{Q}{c^2} = \frac{5{,}91\cdot10^{24}}{9\cdot10^{16}} = 6{,}57\cdot10^7\ \text{кг}` },
    ],
    answer: [String.raw`\Delta m = c_\text{в}\rho V\Delta t/c^2 = 6{,}57\cdot10^7\ \text{кг}`],
  },

  /* ===================== 5.28 ===================== */
  {
    id: '5.28', chapter: CH, section: S4, page: '100',
    title: 'Потеря массы Солнцем и «прибавка» океана',
    given: [[String.raw`C = 1{,}4\ \text{кВт/м}^2`, ''], [String.raw`r = 1{,}49\cdot10^{11}\ \text{м}`, ''], [String.raw`S = 3{,}6\cdot10^8\ \text{км}^2`, String.raw`3{,}6\cdot10^{14}\ \text{м}^2`], [String.raw`t = 1\ \text{год}`, String.raw`3{,}15\cdot10^7\ \text{с}`]],
    find: String.raw`\Delta m_1,\ \Delta m_2 \;—\; ?`,
    formulas: [DEM],
    steps: [
      { title: '1) Мощность излучения Солнца',
        text: 'Через сферу радиусом r (расстояние Земля–Солнце) за секунду проходит C·4πr².',
        tex: String.raw`P = C\cdot4\pi r^2 = 1{,}4\cdot10^3\cdot4\pi\cdot(1{,}49\cdot10^{11})^2 = 3{,}91\cdot10^{26}\ \text{Вт}` },
      { title: 'Потеря массы за год',
        tex: String.raw`\Delta m_1 = \frac{Pt}{c^2} = \frac{3{,}91\cdot10^{26}\cdot3{,}15\cdot10^7}{9\cdot10^{16}} = 1{,}37\cdot10^{17}\ \text{кг}` },
      { title: '2) Океан поглощает половину',
        tex: String.raw`\Delta m_2 = \frac{0{,}5\,CSt}{c^2} = \frac{0{,}5\cdot1{,}4\cdot10^3\cdot3{,}6\cdot10^{14}\cdot3{,}15\cdot10^7}{9\cdot10^{16}} = 8{,}82\cdot10^7\ \text{кг}` },
    ],
    answer: [String.raw`\Delta m_1 = 4\pi r^2Ct/c^2 = 1{,}37\cdot10^{17}\ \text{кг}`, String.raw`\Delta m_2 = 0{,}5\,CSt/c^2 = 8{,}82\cdot10^7\ \text{кг}`],
  },

  /* ===================== 5.29 ===================== */
  {
    id: '5.29', chapter: CH, section: S5, page: '100',
    title: 'Масса электрона и протона при T = 10 МэВ',
    given: [[String.raw`T = 10\ \text{МэВ}`, ''], [String.raw`E_{0e} = 0{,}511\ \text{МэВ},\ E_{0p} = 938\ \text{МэВ}`, '']],
    find: String.raw`m/m_0 \;—\; ?`,
    formulas: [EMC],
    steps: [
      { title: 'Отношение масс = отношение энергий',
        tex: String.raw`\frac{m}{m_0} = \frac{E}{E_0} = 1 + \frac{T}{E_0}` },
      { title: 'Электрон и протон',
        tex: String.raw`\frac{m_e}{m_{0e}} = 1 + \frac{10}{0{,}511} = 20{,}6;\quad \frac{m_p}{m_{0p}} = 1 + \frac{10}{938} = 1{,}01` },
    ],
    answer: [String.raw`\text{электрон: } 20{,}6`, String.raw`\text{протон: } 1{,}01`],
  },

  /* ===================== 5.30 ===================== */
  {
    id: '5.30', chapter: CH, section: S5, page: '100',
    title: 'Протон и электрон с энергией 1 ГэВ',
    given: [[String.raw`T = 1\ \text{ГэВ} = 1000\ \text{МэВ}`, '']],
    find: String.raw`m_p/m_e \;—\; ?`,
    formulas: [EMC],
    steps: [
      { title: 'Отношение полных энергий',
        tex: String.raw`\frac{m_p}{m_e} = \frac{E_{0p} + T}{E_{0e} + T} = \frac{938 + 1000}{0{,}511 + 1000} = 1{,}94` },
    ],
    answer: [String.raw`m_p/m_e = 1{,}94`],
  },

  /* ===================== 5.31 ===================== */
  {
    id: '5.31', chapter: CH, section: S5, page: '100',
    title: 'Кинетическая энергия электрона при 0,8c',
    given: [[String.raw`v = 0{,}8c`, ''], [String.raw`E_0 = 0{,}511\ \text{МэВ}`, '']],
    find: String.raw`T \;—\; ?`,
    formulas: [KIN],
    steps: [
      { title: 'Считаем',
        tex: String.raw`T = 0{,}511\cdot\left(\frac{1}{0{,}6} - 1\right) = 0{,}511\cdot0{,}667 = 0{,}341\ \text{МэВ}` },
    ],
    answer: [String.raw`T = 0{,}341\ \text{МэВ}`],
  },

  /* ===================== 5.32 ===================== */
  {
    id: '5.32', chapter: CH, section: S5, page: '100',
    title: 'Когда T = E₀',
    given: [[String.raw`T = E_0`, '']],
    find: String.raw`v \;—\; ?`,
    formulas: [KIN],
    steps: [
      { title: 'Уравнение',
        tex: String.raw`\frac{1}{\sqrt{1 - \beta^2}} - 1 = 1\ \Rightarrow\ \sqrt{1 - \beta^2} = \frac12\ \Rightarrow\ \beta = \frac{\sqrt3}{2} = 0{,}866` },
      { title: 'Скорость',
        tex: String.raw`v = 0{,}866\cdot3\cdot10^8 = 2{,}6\cdot10^8\ \text{м/с}` },
    ],
    answer: [String.raw`v = \tfrac{\sqrt3}{2}c = 2{,}6\cdot10^8\ \text{м/с}`],
  },

  /* ===================== 5.33 ===================== */
  {
    id: '5.33', chapter: CH, section: S5, page: '100',
    title: 'Скорость электрона по энергии',
    given: [[String.raw`T_1 = 4\ \text{МэВ}`, ''], [String.raw`T_2 = 1\ \text{кэВ} = 10^{-3}\ \text{МэВ}`, ''], [String.raw`E_0 = 0{,}511\ \text{МэВ}`, '']],
    find: String.raw`v_1,\ v_2 \;—\; ?`,
    formulas: [BT],
    steps: [
      { title: '1) T = 4 МэВ — частица релятивистская',
        tex: String.raw`\beta = \frac{\sqrt{(1{,}022 + 4)\cdot4}}{4{,}511} = \frac{4{,}482}{4{,}511} = 0{,}9936;\quad v = 2{,}98\cdot10^8\ \text{м/с}` },
      { title: '2) T = 1 кэВ ≪ E₀ — почти классическая',
        tex: String.raw`\beta = \frac{\sqrt{(1{,}022 + 0{,}001)\cdot0{,}001}}{0{,}512} = 0{,}0625;\quad v = 1{,}87\cdot10^7\ \text{м/с}` },
    ],
    answer: [String.raw`v_1 = 298\ \text{Мм/с}`, String.raw`v_2 = 18{,}7\ \text{Мм/с}`],
    note: MISMATCH + String.raw`Во втором случае в книге 18,9 Мм/с. И релятивистская формула, и классическая $v = \sqrt{2T/m_0} = \sqrt{2\cdot1{,}6\cdot10^{-16}/9{,}11\cdot10^{-31}}$ дают 18,7 Мм/с.`,
  },

  /* ===================== 5.34 ===================== */
  {
    id: '5.34', chapter: CH, section: S5, page: '100',
    title: 'Скорость протона по энергии',
    given: [[String.raw`T_1 = 1\ \text{МэВ}`, ''], [String.raw`T_2 = 2\ \text{ГэВ} = 2000\ \text{МэВ}`, ''], [String.raw`E_0 = 938\ \text{МэВ}`, '']],
    find: String.raw`v_1,\ v_2 \;—\; ?`,
    formulas: [BT],
    steps: [
      { title: '1) T = 1 МэВ',
        tex: String.raw`\beta = \frac{\sqrt{(1876 + 1)\cdot1}}{939} = \frac{43{,}3}{939} = 0{,}0461;\quad v = 1{,}38\cdot10^7\ \text{м/с}` },
      { title: '2) T = 2 ГэВ',
        tex: String.raw`\beta = \frac{\sqrt{(1876 + 2000)\cdot2000}}{2938} = \frac{2784}{2938} = 0{,}948;\quad v = 2{,}84\cdot10^8\ \text{м/с}` },
      { title: 'Проверка через γ',
        tex: String.raw`\gamma = 1 + \frac{2000}{938} = 3{,}13,\quad \beta = \sqrt{1 - 1/\gamma^2} = 0{,}948` },
    ],
    answer: [String.raw`v_1 = 13{,}8\ \text{Мм/с}`, String.raw`v_2 = 284\ \text{Мм/с}`],
    note: MISMATCH + String.raw`Во втором случае в книге 263 Мм/с ($\beta = 0{,}877$, $\gamma = 2{,}08$ — так было бы при $T \approx 1$ ГэВ). При $T = 2$ ГэВ $\gamma = 3{,}13$ и $v = 284$ Мм/с.`,
  },

  /* ===================== 5.35 ===================== */
  {
    id: '5.35', chapter: CH, section: S5, page: '100',
    title: 'Кинетическая энергия при v ≪ c',
    given: [[String.raw`v \ll c`, '']],
    find: String.raw`\text{показать: } T \to \tfrac12m_0v^2`,
    formulas: [SMALLB],
    steps: [
      { title: 'Раскладываем массу',
        tex: String.raw`T = (m - m_0)c^2 = m_0c^2\left(\frac{1}{\sqrt{1 - \beta^2}} - 1\right) \approx m_0c^2\cdot\frac{\beta^2}{2} = \frac{m_0v^2}{2}` },
    ],
    answer: [String.raw`T \approx m_0v^2/2`],
  },

  /* ===================== 5.36 ===================== */
  {
    id: '5.36', chapter: CH, section: S5, page: '100',
    title: 'Ошибка классической формулы',
    given: [[String.raw`\beta_1 = 0{,}2`, ''], [String.raw`\beta_2 = 0{,}8`, '']],
    find: String.raw`\delta = \frac{T - T_\text{кл}}{T} \;—\; ?`,
    formulas: [KIN, { tex: String.raw`T_\text{кл} = \frac{m_0v^2}{2} = m_0c^2\frac{\beta^2}{2}`, text: 'классическая формула' }],
    steps: [
      { title: '1) β = 0,2',
        tex: String.raw`T = m_0c^2(1{,}0206 - 1) = 0{,}0206m_0c^2;\quad T_\text{кл} = 0{,}02m_0c^2;\quad \delta = \frac{0{,}0006}{0{,}0206} = 0{,}03` },
      { title: '2) β = 0,8',
        tex: String.raw`T = m_0c^2\left(\frac{1}{0{,}6} - 1\right) = 0{,}667m_0c^2;\quad T_\text{кл} = 0{,}32m_0c^2;\quad \delta = \frac{0{,}347}{0{,}667} = 0{,}52` },
    ],
    answer: [String.raw`\delta_1 = 0{,}03\ (3\,\%)`, String.raw`\delta_2 = 0{,}52\ (52\,\%)`],
  },

  /* ===================== 5.37 ===================== */
  {
    id: '5.37', chapter: CH, section: S5, page: '100',
    title: 'Встречные частицы с T = E₀',
    given: [[String.raw`T = E_0 = m_0c^2`, '']],
    find: String.raw`v,\ u,\ T' \;—\; ?`,
    formulas: [KIN, SUB],
    steps: [
      { title: '1) Скорости в лаборатории',
        text: 'T = E₀ — значит γ = 2 (задача 5.32).',
        tex: String.raw`\beta = \frac{\sqrt3}{2} = 0{,}866` },
      { title: '2) Скорость сближения в системе одной частицы',
        tex: String.raw`u = \frac{2\beta}{1 + \beta^2}c = \frac{1{,}732}{1{,}75}c = 0{,}9897c` },
      { title: '3) Энергия частицы в системе другой',
        tex: String.raw`\gamma' = \frac{1}{\sqrt{1 - 0{,}9897^2}} = 7,\quad T' = (\gamma' - 1)m_0c^2 = 6m_0c^2` },
    ],
    answer: [String.raw`v = 0{,}866c`, String.raw`u = 0{,}9897c`, String.raw`T' = 6m_0c^2`],
  },

  /* ===================== 5.38 ===================== */
  {
    id: '5.38', chapter: CH, section: S6, page: '100',
    title: 'Импульс через энергию при v ≪ c',
    given: [[String.raw`T \ll E_0`, '']],
    find: String.raw`\text{показать: } p \to \sqrt{2m_0T}`,
    formulas: [PE],
    steps: [
      { title: 'Пренебрегаем T рядом с 2E₀',
        tex: String.raw`p = \frac1c\sqrt{(2E_0 + T)T} \approx \frac1c\sqrt{2E_0T} = \frac1c\sqrt{2m_0c^2T} = \sqrt{2m_0T}` },
      { title: 'Это и есть классическая связь',
        tex: String.raw`T = \frac{m_0v^2}{2}\ \Rightarrow\ \sqrt{2m_0T} = m_0v = p` },
    ],
    answer: [String.raw`p \approx \sqrt{2m_0T} = m_0v`],
  },

  /* ===================== 5.39 ===================== */
  {
    id: '5.39', chapter: CH, section: S6, page: '101',
    title: 'Импульс при T = E₀',
    given: [[String.raw`T = E_0`, '']],
    find: String.raw`p \;—\; ?`,
    formulas: [PE],
    steps: [
      { title: 'Считаем',
        tex: String.raw`p^2c^2 = E_0(E_0 + 2E_0) = 3E_0^2\ \Rightarrow\ p = \sqrt3\,m_0c = 1{,}73m_0c` },
    ],
    answer: [String.raw`p = \sqrt3\,m_0c = 1{,}73m_0c`],
  },

  /* ===================== 5.40 ===================== */
  {
    id: '5.40', chapter: CH, section: S6, page: '101',
    title: 'Кинетическая энергия при p = m₀c',
    given: [[String.raw`p = m_0c`, '']],
    find: String.raw`T \;—\; ?`,
    formulas: [PE],
    steps: [
      { title: 'Полная энергия',
        tex: String.raw`E = \sqrt{p^2c^2 + E_0^2} = \sqrt2\,m_0c^2` },
      { title: 'Кинетическая',
        tex: String.raw`T = E - E_0 = (\sqrt2 - 1)m_0c^2 = 0{,}414m_0c^2` },
    ],
    answer: [String.raw`T = (\sqrt2 - 1)m_0c^2 = 0{,}414m_0c^2`],
  },

  /* ===================== 5.41 ===================== */
  {
    id: '5.41', chapter: CH, section: S6, page: '101',
    title: 'Рост импульса при росте T вчетверо',
    given: [[String.raw`T_1 = E_0`, ''], [String.raw`T_2 = 4T_1 = 4E_0`, '']],
    find: String.raw`p_2/p_1 \;—\; ?`,
    formulas: [PE],
    steps: [
      { title: 'Импульсы',
        tex: String.raw`p_1c = \sqrt{E_0\cdot3E_0} = \sqrt3\,E_0;\quad p_2c = \sqrt{4E_0\cdot6E_0} = \sqrt{24}\,E_0` },
      { title: 'Отношение',
        tex: String.raw`\frac{p_2}{p_1} = \sqrt{\frac{24}{3}} = \sqrt8 = 2{,}83` },
    ],
    answer: [String.raw`p_2/p_1 = \sqrt8 = 2{,}83`],
    note: SMALL + String.raw`В книге 2,82; точно $\sqrt8 = 2{,}828$.`,
  },

  /* ===================== 5.42 ===================== */
  {
    id: '5.42', chapter: CH, section: S6, page: '101',
    title: 'Импульс удвоился: во сколько раз энергия',
    given: [[String.raw`p_1 = m_0c`, ''], [String.raw`p_2 = 2m_0c`, '']],
    find: String.raw`T_2/T_1,\ E_2/E_1 \;—\; ?`,
    formulas: [PE],
    steps: [
      { title: 'Полные энергии',
        tex: String.raw`E_1 = \sqrt{1 + 1}\,E_0 = \sqrt2\,E_0;\quad E_2 = \sqrt{4 + 1}\,E_0 = \sqrt5\,E_0` },
      { title: '1) Кинетическая',
        tex: String.raw`\frac{T_2}{T_1} = \frac{\sqrt5 - 1}{\sqrt2 - 1} = \frac{1{,}236}{0{,}414} = 2{,}98` },
      { title: '2) Полная',
        tex: String.raw`\frac{E_2}{E_1} = \sqrt{\frac52} = 1{,}58` },
    ],
    answer: [String.raw`T_2/T_1 = 2{,}98`, String.raw`E_2/E_1 = 1{,}58`],
  },

  /* ===================== 5.43 ===================== */
  {
    id: '5.43', chapter: CH, section: S6, page: '101',
    title: 'Неупругое столкновение при p = m₀c',
    given: [[String.raw`p = m_0c`, ''], [String.raw`\text{вторая частица покоится}`, '']],
    find: String.raw`v,\ m',\ v',\ m'_0,\ T,\ T' \;—\; ?`,
    formulas: [PE, INV, { tex: String.raw`E' = E + E_0,\quad p' = p`, text: 'при столкновении сохраняются полная энергия и импульс' }],
    steps: [
      { title: '1) Скорость налетающей частицы',
        tex: String.raw`\frac{\beta}{\sqrt{1 - \beta^2}} = 1\ \Rightarrow\ \beta = \frac{1}{\sqrt2} = 0{,}707` },
      { title: '2) Релятивистская масса составной частицы',
        tex: String.raw`E = \sqrt2\,m_0c^2;\quad m' = \frac{E + E_0}{c^2} = (\sqrt2 + 1)m_0 = 2{,}4142m_0` },
      { title: '3) Скорость составной частицы',
        tex: String.raw`v' = \frac{p}{m'} = \frac{m_0c}{2{,}4142m_0} = 0{,}414c` },
      { title: '4) Масса покоя составной частицы',
        tex: String.raw`m'_0 = \frac{\sqrt{E'^2 - p^2c^2}}{c^2} = m_0\sqrt{(\sqrt2 + 1)^2 - 1} = m_0\sqrt{2 + 2\sqrt2} = 2{,}1974m_0` },
      { title: '5) Кинетические энергии',
        tex: String.raw`T = E - E_0 = 0{,}414m_0c^2;\quad T' = (m' - m'_0)c^2 = (2{,}4142 - 2{,}1974)m_0c^2 = 0{,}217m_0c^2` },
    ],
    answer: [String.raw`v = 0{,}707c`, String.raw`m' = 2{,}4142m_0`, String.raw`v' = 0{,}414c`, String.raw`m'_0 = \sqrt{2 + 2\sqrt2}\,m_0 = 2{,}1974m_0`, String.raw`T = 0{,}414m_0c^2,\ T' = 0{,}217m_0c^2`],
  },

  /* ===================== 5.44 ===================== */
  {
    id: '5.44', chapter: CH, section: S6, page: '101',
    title: 'Кинетическая энергия в системе центра инерции',
    given: [[String.raw`T = m_0c^2`, ''], [String.raw`\text{вторая частица покоится}`, '']],
    find: String.raw`T' \;—\; ?`,
    formulas: [PE, INV],
    steps: [
      { title: 'Суммарные энергия и импульс в лаборатории',
        tex: String.raw`E = (2m_0c^2) + m_0c^2 = 3m_0c^2;\quad pc = \sqrt{T(T + 2E_0)} = \sqrt3\,m_0c^2` },
      { title: 'Полная энергия в системе центра инерции',
        text: 'В этой системе суммарный импульс равен нулю, а величина E² − p²c² одинакова во всех системах.',
        tex: String.raw`E' = \sqrt{E^2 - p^2c^2} = \sqrt{9 - 3}\,m_0c^2 = \sqrt6\,m_0c^2 = 2{,}449m_0c^2` },
      { title: 'Кинетическая энергия частиц',
        text: 'Вычитаем энергии покоя обеих частиц.',
        tex: String.raw`T' = E' - 2m_0c^2 = (\sqrt6 - 2)m_0c^2 = 0{,}449m_0c^2` },
    ],
    answer: [String.raw`T' = (\sqrt6 - 2)m_0c^2 = 0{,}449m_0c^2`],
    note: MISMATCH + String.raw`В книге $0{,}551m_0c^2 = (3 - \sqrt6)m_0c^2$ — это кинетическая энергия <i>движения центра инерции</i> в лабораторной системе (та же величина, что $T'$ в примере 5). Суммарная кинетическая энергия частиц в системе центра инерции — остаток: $T - 0{,}551m_0c^2 = 0{,}449m_0c^2$.`,
  },

  );
})();
