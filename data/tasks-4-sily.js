/*
  § 4. Силы в механике — задачи 4.1–4.67 (стр. 85–91).
  Условия задач показываются дословно из книги (data/book-tasks.js).
  Ответы пересчитаны скриптом tools/check_sily.py и сверены с book/99-otvety.md.
  Где ответ книги расходится с расчётом — плашка note «Расхождение с ответом книги».
  Постоянные — табл. 8, 9, 11, 24: G = 6,67·10⁻¹¹ м³/(кг·с²), g = 9,81 м/с²; Земля R = 6,37·10⁶ м, M = 5,98·10²⁴ кг
  (GM = 3,99·10¹⁴ м³/с²); Солнце 6,95·10⁸ м, 1,98·10³⁰ кг; Луна 1,74·10⁶ м, 7,33·10²² кг;
  сталь ρ = 7,87 г/см³, E = 200 ГПа, G = 76 ГПа; свинец ρ = 11,3 г/см³.
*/
(function () {
  const CH = 'Гл. 1. Физические основы механики';
  const S1 = 'Силы тяготения. Гравитационное поле';
  const S2 = 'Силы упругости. Механическое напряжение';
  const S3 = 'Работа упругой силы. Энергия деформированного тела';
  const MISMATCH = '<b>Расхождение с ответом книги.</b> ';
  const SMALL = '<b>Расхождение в последней цифре.</b> ';
  const TYPO = '<b>Опечатка в ответе книги.</b> ';

  const GRAV = { tex: String.raw`F = G\frac{m_1m_2}{r^2}`, text: 'закон всемирного тяготения (для шаров r — расстояние между центрами)' };
  const GFIELD = { tex: String.raw`g = \frac{GM}{r^2}`, text: 'напряжённость поля тяготения планеты на расстоянии r от её центра (r ≥ R)' };
  const GR2 = { tex: String.raw`GM = gR^2`, text: 'у поверхности Земли g = GM/R², поэтому GM можно заменить на gR²' };
  const GRHO = { tex: String.raw`g = \tfrac43\pi G\rho R`, text: 'однородная планета: M = ⁴⁄₃πR³ρ, отсюда g на поверхности' };
  const CIRC = { tex: String.raw`\frac{mv^2}{r} = G\frac{Mm}{r^2}\ \Rightarrow\ v = \sqrt{\frac{GM}{r}}`, text: 'круговая орбита: сила тяготения — центростремительная' };
  const KEPLER = { tex: String.raw`\frac{T_1^2}{T_2^2} = \frac{a_1^3}{a_2^3}`, text: 'третий закон Кеплера; a — большая полуось (для окружности — радиус)' };
  const PIG = { tex: String.raw`\Pi = -G\frac{Mm}{r},\quad \varphi = -G\frac{M}{r}`, text: 'потенциальная энергия и потенциал поля тяготения (ноль — на бесконечности)' };
  const ECONS = { tex: String.raw`\frac{mv_1^2}{2} - G\frac{Mm}{r_1} = \frac{mv_2^2}{2} - G\frac{Mm}{r_2}`, text: 'закон сохранения механической энергии в поле тяготения' };
  const SIGMA = { tex: String.raw`\sigma = \frac{F}{S}`, text: 'нормальное напряжение; для круглого сечения S = πd²/4' };
  const HOOKE = { tex: String.raw`\sigma = E\varepsilon,\quad \varepsilon = \frac xl`, text: 'закон Гука; E — модуль Юнга (сталь — 200 ГПа, табл. 11)' };
  const SPRING = { tex: String.raw`F = kx,\quad k = \frac{ES}{l}`, text: 'жёсткость; для стержня k = ES/l' };
  const WSPR = { tex: String.raw`A = \Pi = \frac{kx^2}{2}`, text: 'работа деформации = потенциальная энергия деформированного тела (от недеформированного состояния)' };
  const WVOL = { tex: String.raw`w = \frac{\Pi}{V} = \frac{\sigma\varepsilon}{2} = \frac{\sigma^2}{2E} = \frac{E\varepsilon^2}{2}`, text: 'объёмная плотность энергии упругой деформации' };

  window.TASKS.push(

  /* ===================== 4.1 ===================== */
  {
    id: '4.1', chapter: CH, section: S1, page: '85',
    title: 'Притяжение двух шаров по 1 кг',
    given: [[String.raw`r = 1\ \text{м}`, ''], [String.raw`m = 1\ \text{кг}`, '']],
    find: String.raw`F \;—\; ?`,
    formulas: [GRAV],
    steps: [
      { title: 'Закон тяготения',
        text: 'Шары однородные — закон применим, r — расстояние между центрами.',
        tex: String.raw`F = G\frac{m^2}{r^2} = 6{,}67\cdot10^{-11}\cdot\frac{1\cdot1}{1^2} = 6{,}67\cdot10^{-11}\ \text{Н}` },
    ],
    answer: [String.raw`F = 6{,}67\cdot10^{-11}\ \text{Н} = 66{,}7\ \text{пН}`],
  },

  /* ===================== 4.2 ===================== */
  {
    id: '4.2', chapter: CH, section: S1, page: '85',
    title: 'Притяжение двух кораблей',
    given: [[String.raw`m = 10\ \text{т}`, String.raw`10^4\ \text{кг}`], [String.raw`r = 100\ \text{м}`, '']],
    find: String.raw`F \;—\; ?`,
    formulas: [GRAV],
    steps: [
      { title: 'Закон тяготения',
        text: 'Размеры кораблей малы по сравнению со 100 м — считаем их точками.',
        tex: String.raw`F = G\frac{m^2}{r^2} = 6{,}67\cdot10^{-11}\cdot\frac{(10^4)^2}{100^2} = 6{,}67\cdot10^{-11}\cdot10^4 = 6{,}67\cdot10^{-7}\ \text{Н}` },
    ],
    answer: [String.raw`F = 6{,}67\cdot10^{-7}\ \text{Н} = 667\ \text{нН}`],
    note: MISMATCH + String.raw`В книге 667 пН — в 1000 раз меньше. $\frac{m^2}{r^2} = \frac{10^8}{10^4} = 10^4$, и $F = 6{,}67\cdot10^{-7}$ Н $= 667$ нН: в книге перепутана приставка (пико вместо нано).`,
  },

  /* ===================== 4.3 ===================== */
  {
    id: '4.3', chapter: CH, section: S1, page: '85',
    title: 'Два соприкасающихся железных шара',
    given: [[String.raw`d = 20\ \text{см}`, String.raw`0{,}2\ \text{м}`], [String.raw`\rho = 7{,}87\ \text{г/см}^3`, String.raw`7{,}87\cdot10^3\ \text{кг/м}^3`]],
    find: String.raw`F \;—\; ?`,
    formulas: [GRAV, { tex: String.raw`m = \rho V = \rho\frac{\pi d^3}{6}`, text: 'масса шара диаметром d' }],
    steps: [
      { title: 'Масса и расстояние',
        text: 'Шары соприкасаются, поэтому расстояние между центрами r = d.',
        tex: String.raw`m = \rho\frac{\pi d^3}{6} = 7870\cdot\frac{\pi\cdot0{,}2^3}{6} = 33{,}0\ \text{кг}` },
      { title: 'Сила',
        tex: String.raw`F = G\frac{m^2}{d^2} = G\left(\frac{\pi\rho d^2}{6}\right)^2 = 6{,}67\cdot10^{-11}\cdot\left(\frac{\pi\cdot7870\cdot0{,}04}{6}\right)^2 = 1{,}81\cdot10^{-6}\ \text{Н}` },
    ],
    answer: [String.raw`F = G\left(\frac{\pi\rho d^2}{6}\right)^2 = 1{,}81\ \text{мкН}`],
    note: SMALL + String.raw`В книге 1,78 мкН — так выходит с плотностью железа 7,8 г/см³. С 7,87 г/см³ из табл. 9 этой же книги — 1,81 мкН.`,
  },

  /* ===================== 4.4 ===================== */
  {
    id: '4.4', chapter: CH, section: S1, page: '85',
    title: 'Высота, где g = 1 Н/кг',
    given: [[String.raw`g_h = 1\ \text{Н/кг}`, ''], [String.raw`R = 6{,}37\cdot10^6\ \text{м}`, ''], [String.raw`g = 9{,}81\ \text{м/с}^2`, '']],
    find: String.raw`h \;—\; ?`,
    formulas: [{ tex: String.raw`g_h = \frac{g}{(1 + h/R)^2}`, text: 'ускорение свободного падения на высоте h' }],
    steps: [
      { title: 'Выражаем высоту',
        tex: String.raw`\left(1 + \frac hR\right)^2 = \frac{g}{g_h}\ \Rightarrow\ h = R\left(\sqrt{\frac{g}{g_h}} - 1\right)` },
      { title: 'Считаем',
        tex: String.raw`h = 6{,}37\cdot10^6\cdot\left(\sqrt{9{,}81} - 1\right) = 6{,}37\cdot10^6\cdot2{,}13 = 13{,}6\cdot10^6\ \text{м}` },
    ],
    answer: [String.raw`h = R\left(\sqrt{g/g_h} - 1\right) = 13{,}6\cdot10^6\ \text{м}`],
  },

  /* ===================== 4.5 ===================== */
  {
    id: '4.5', chapter: CH, section: S1, page: '85',
    title: 'Первая секунда падения с 3200 км',
    given: [[String.raw`h = 3200\ \text{км}`, String.raw`3{,}2\cdot10^6\ \text{м}`], [String.raw`t = 1\ \text{с}`, '']],
    find: String.raw`s \;—\; ?`,
    formulas: [GFIELD, { tex: String.raw`s = \frac{at^2}{2}`, text: 'путь при равноускоренном движении без начальной скорости' }],
    steps: [
      { title: 'Ускорение на этой высоте',
        text: 'В верхней точке скорость ракеты равна нулю. За 1 с она опустится всего на пару метров — ускорение за это время практически не меняется.',
        tex: String.raw`g_h = \frac{GM}{(R + h)^2} = \frac{6{,}67\cdot10^{-11}\cdot5{,}98\cdot10^{24}}{(9{,}57\cdot10^6)^2} = 4{,}36\ \text{м/с}^2` },
      { title: 'Путь за первую секунду',
        tex: String.raw`s = \frac{g_ht^2}{2} = \frac{4{,}36\cdot1^2}{2} = 2{,}18\ \text{м}` },
    ],
    answer: [String.raw`s = \frac{GMt^2}{2(R + h)^2} = 2{,}18\ \text{м}`],
  },

  /* ===================== 4.6 ===================== */
  {
    id: '4.6', chapter: CH, section: S1, page: '85',
    title: 'Поле тяготения на Марсе',
    given: [[String.raw`R = 3{,}4\cdot10^6\ \text{м}`, ''], [String.raw`M = 6{,}4\cdot10^{23}\ \text{кг}`, '']],
    find: String.raw`g \;—\; ?`,
    formulas: [GFIELD],
    steps: [
      { title: 'Напряжённость на поверхности',
        tex: String.raw`g = \frac{GM}{R^2} = \frac{6{,}67\cdot10^{-11}\cdot6{,}4\cdot10^{23}}{(3{,}4\cdot10^6)^2} = 3{,}7\ \text{Н/кг}` },
    ],
    answer: [String.raw`g = GM/R^2 = 3{,}7\ \text{Н/кг}`],
  },

  /* ===================== 4.7 ===================== */
  {
    id: '4.7', chapter: CH, section: S1, page: '85',
    title: 'Ускорение свободного падения на Луне',
    given: [[String.raw`R_\text{З} = 3{,}66\,R_\text{Л}`, ''], [String.raw`\rho_\text{З} = 1{,}66\,\rho_\text{Л}`, ''], [String.raw`g = 9{,}81\ \text{м/с}^2`, '']],
    find: String.raw`g_\text{Л} \;—\; ?`,
    formulas: [GRHO],
    steps: [
      { title: 'g пропорционально ρR',
        text: 'Для однородного шара g = GM/R², M = ⁴⁄₃πR³ρ — получается g = ⁴⁄₃πGρR.',
        tex: String.raw`\frac{g_\text{Л}}{g} = \frac{\rho_\text{Л}R_\text{Л}}{\rho_\text{З}R_\text{З}} = \frac{1}{kn}` },
      { title: 'Считаем',
        tex: String.raw`g_\text{Л} = \frac{g}{kn} = \frac{9{,}81}{1{,}66\cdot3{,}66} = 1{,}61\ \text{м/с}^2` },
    ],
    answer: [String.raw`g_\text{Л} = g/(kn) = 1{,}61\ \text{м/с}^2`],
  },

  /* ===================== 4.8 ===================== */
  {
    id: '4.8', chapter: CH, section: S1, page: '85',
    title: 'g на малой планете',
    given: [[String.raw`R = 250\ \text{км}`, String.raw`2{,}5\cdot10^5\ \text{м}`], [String.raw`\rho = 3\ \text{г/см}^3`, String.raw`3\cdot10^3\ \text{кг/м}^3`]],
    find: String.raw`g \;—\; ?`,
    formulas: [GFIELD, GRHO],
    steps: [
      { title: 'Масса через плотность',
        tex: String.raw`g = \frac{GM}{R^2} = \frac{G\cdot\frac43\pi R^3\rho}{R^2} = \frac43\pi G\rho R` },
      { title: 'Считаем',
        tex: String.raw`g = \frac43\pi\cdot6{,}67\cdot10^{-11}\cdot3\cdot10^3\cdot2{,}5\cdot10^5 = 0{,}21\ \text{м/с}^2` },
    ],
    answer: [String.raw`g = \tfrac43\pi G\rho R = 0{,}21\ \text{м/с}^2`],
  },

  /* ===================== 4.9 ===================== */
  {
    id: '4.9', chapter: CH, section: S1, page: '85',
    title: 'Точка равновесия между Землёй и Луной',
    given: [[String.raw`M_\text{З} = 81{,}6\,M_\text{Л}`, ''], [String.raw`l = 60{,}3R`, '']],
    find: String.raw`r \;—\; ?`,
    formulas: [GFIELD],
    steps: [
      { title: 'Поля равны по модулю',
        text: 'Точка лежит на отрезке между центрами; поля Земли и Луны там направлены противоположно.',
        tex: String.raw`\frac{GM_\text{З}}{r^2} = \frac{GM_\text{З}/n}{(l - r)^2}\ \Rightarrow\ \frac{l - r}{r} = \frac{1}{\sqrt n}` },
      { title: 'Расстояние',
        tex: String.raw`r = \frac{l}{1 + 1/\sqrt n} = \frac{60{,}3R}{1 + 1/\sqrt{81{,}6}} = \frac{60{,}3R}{1{,}111} = 54{,}3R` },
    ],
    answer: [String.raw`r = \frac{l}{1 + 1/\sqrt n} = 54{,}3R`],
  },

  /* ===================== 4.10 ===================== */
  {
    id: '4.10', chapter: CH, section: S1, page: '85',
    title: 'Спутник на высоте 3600 км',
    given: [[String.raw`h = 3{,}6\cdot10^6\ \text{м}`, ''], [String.raw`R = 6{,}37\cdot10^6\ \text{м}`, ''], [String.raw`g = 9{,}81\ \text{м/с}^2`, '']],
    find: String.raw`v \;—\; ?`,
    formulas: [CIRC, GR2],
    steps: [
      { title: 'Круговая скорость',
        tex: String.raw`v = \sqrt{\frac{GM}{R + h}} = \sqrt{\frac{gR^2}{R + h}} = R\sqrt{\frac{g}{R + h}}` },
      { title: 'Считаем',
        tex: String.raw`v = 6{,}37\cdot10^6\cdot\sqrt{\frac{9{,}81}{9{,}97\cdot10^6}} = 6{,}32\cdot10^3\ \text{м/с}` },
    ],
    answer: [String.raw`v = R\sqrt{g/(R + h)} = 6{,}32\ \text{км/с}`],
    note: SMALL + String.raw`В книге 6,33 км/с — так выходит, если брать $GM = 6{,}67\cdot10^{-11}\cdot5{,}98\cdot10^{24}$ (6,325 км/с). Через $g$ и $R$, как сказано в условии, — 6,32 км/с.`,
  },

  /* ===================== 4.11 ===================== */
  {
    id: '4.11', chapter: CH, section: S1, page: '85',
    title: 'Спутник с периодом 2 ч',
    given: [[String.raw`T = 2\ \text{ч}`, String.raw`7200\ \text{с}`], [String.raw`GM = 3{,}99\cdot10^{14}\ \text{м}^3/\text{с}^2`, '']],
    find: String.raw`h \;—\; ?`,
    formulas: [{ tex: String.raw`G\frac{Mm}{r^2} = m\omega^2r,\quad \omega = \frac{2\pi}{T}`, text: 'тяготение сообщает спутнику центростремительное ускорение' }],
    steps: [
      { title: 'Радиус орбиты',
        tex: String.raw`r^3 = \frac{GMT^2}{4\pi^2} = \frac{3{,}99\cdot10^{14}\cdot7200^2}{4\pi^2} = 5{,}24\cdot10^{20}\ \text{м}^3,\quad r = 8{,}06\cdot10^6\ \text{м}` },
      { title: 'Высота над поверхностью',
        tex: String.raw`h = r - R = 8{,}06\cdot10^6 - 6{,}37\cdot10^6 = 1{,}69\cdot10^6\ \text{м}` },
    ],
    answer: [String.raw`h = \sqrt[3]{\frac{GMT^2}{4\pi^2}} - R = 1{,}69\cdot10^6\ \text{м}`],
  },

  /* ===================== 4.12 ===================== */
  {
    id: '4.12', chapter: CH, section: S1, page: '85',
    title: 'Стационарный спутник',
    given: [[String.raw`T = 24\ \text{ч}`, String.raw`8{,}64\cdot10^4\ \text{с}`], [String.raw`GM = 3{,}99\cdot10^{14}\ \text{м}^3/\text{с}^2`, '']],
    find: String.raw`\omega,\ R \;—\; ?`,
    formulas: [{ tex: String.raw`G\frac{Mm}{R^2} = m\omega^2R`, text: 'тяготение — центростремительная сила' }],
    steps: [
      { title: 'Угловая скорость',
        text: 'Спутник висит над одной точкой — он делает оборот за сутки вместе с Землёй.',
        tex: String.raw`\omega = \frac{2\pi}{T} = \frac{2\pi}{8{,}64\cdot10^4} = 7{,}27\cdot10^{-5}\ \text{рад/с}` },
      { title: 'Радиус орбиты',
        tex: String.raw`R = \sqrt[3]{\frac{GM}{\omega^2}} = \sqrt[3]{\frac{3{,}99\cdot10^{14}}{(7{,}27\cdot10^{-5})^2}} = 4{,}22\cdot10^7\ \text{м}` },
    ],
    answer: [String.raw`\omega = 7{,}27\cdot10^{-5}\ \text{рад/с}`, String.raw`R = \sqrt[3]{GM/\omega^2} = 42{,}2\cdot10^6\ \text{м}`],
  },

  /* ===================== 4.13 ===================== */
  {
    id: '4.13', chapter: CH, section: S1, page: '86',
    title: 'Период обращения Нептуна',
    given: [[String.raw`a_\text{Н} = 30\,a_\text{З}`, ''], [String.raw`T_\text{З} = 1\ \text{год}`, '']],
    find: String.raw`T \;—\; ?`,
    formulas: [KEPLER],
    steps: [
      { title: 'Третий закон Кеплера',
        tex: String.raw`T = T_\text{З}\left(\frac{a_\text{Н}}{a_\text{З}}\right)^{3/2} = 30^{3/2} = 164\ \text{года}` },
    ],
    answer: [String.raw`T = k^{3/2} = 164\ \text{года}`],
  },

  /* ===================== 4.14 ===================== */
  {
    id: '4.14', chapter: CH, section: S1, page: '86',
    title: 'Скорость спутника по скорости Луны',
    given: [[String.raw`v_1 = 1{,}02\ \text{км/с}`, ''], [String.raw`l = 60{,}3R`, '']],
    find: String.raw`v_2 \;—\; ?`,
    formulas: [CIRC],
    steps: [
      { title: 'Скорость обратно пропорциональна √r',
        text: 'И Луна, и низкий спутник движутся по окружностям вокруг одной и той же Земли.',
        tex: String.raw`\frac{v_2}{v_1} = \sqrt{\frac{l}{R}}\ \Rightarrow\ v_2 = 1{,}02\cdot\sqrt{60{,}3} = 7{,}92\ \text{км/с}` },
    ],
    answer: [String.raw`v_2 = v_1\sqrt{l/R} = 7{,}92\ \text{км/с}`],
  },

  /* ===================== 4.15 ===================== */
  {
    id: '4.15', chapter: CH, section: S1, page: '86',
    title: 'Скорость малой планеты',
    given: [[String.raw`v_1 = 30\ \text{км/с}`, ''], [String.raw`r_2 = 4r_1`, '']],
    find: String.raw`v_2 \;—\; ?`,
    formulas: [CIRC],
    steps: [
      { title: 'Обе планеты обращаются вокруг Солнца',
        tex: String.raw`\frac{v_2}{v_1} = \sqrt{\frac{r_1}{r_2}} = \frac{1}{\sqrt n}\ \Rightarrow\ v_2 = \frac{30}{\sqrt4} = 15\ \text{км/с}` },
    ],
    answer: [String.raw`v_2 = v_1/\sqrt n = 15\ \text{км/с}`],
  },

  /* ===================== 4.16 ===================== */
  {
    id: '4.16', chapter: CH, section: S1, page: '86',
    title: 'Искусственная планета на эллипсе',
    given: [[String.raw`r_\text{min} = 0{,}97\ \text{а.е.}`, ''], [String.raw`r_\text{max} = 1{,}31\ \text{а.е.}`, '']],
    find: String.raw`T \;—\; ?`,
    formulas: [KEPLER, { tex: String.raw`a = \frac{r_\text{min} + r_\text{max}}{2}`, text: 'большая полуось эллипса (Солнце — в фокусе)' }],
    steps: [
      { title: 'Большая полуось',
        tex: String.raw`a = \frac{0{,}97 + 1{,}31}{2} = 1{,}14\ \text{а.е.}` },
      { title: 'Сравниваем с Землёй (a = 1 а.е., T = 1 год)',
        tex: String.raw`T = a^{3/2} = 1{,}14^{3/2} = 1{,}22\ \text{года}` },
    ],
    answer: [String.raw`T = \left(\frac{r_\text{min} + r_\text{max}}{2}\right)^{3/2} = 1{,}22\ \text{года}`],
  },

  /* ===================== 4.17 ===================== */
  {
    id: '4.17', chapter: CH, section: S1, page: '86',
    title: 'Падение ракеты на Солнце',
    given: [[String.raw`r_0 = 1\ \text{а.е.}`, ''], [String.raw`T_\text{З} = 1\ \text{год} = 365\ \text{сут}`, '']],
    find: String.raw`t \;—\; ?`,
    formulas: [KEPLER],
    steps: [
      { title: 'Орбита падения',
        text: 'По указанию: ракета летит по очень вытянутому эллипсу, один конец которого — у орбиты Земли, другой — у Солнца. Большая ось ≈ r₀, значит большая полуось a = r₀/2.' },
      { title: 'Период по такому эллипсу',
        tex: String.raw`T = T_\text{З}\left(\frac{a}{r_0}\right)^{3/2} = 1\cdot\left(\frac12\right)^{3/2} = 0{,}354\ \text{года}` },
      { title: 'Время падения — половина периода',
        text: 'От дальнего конца эллипса до ближнего — ровно пол-оборота.',
        tex: String.raw`t = \frac T2 = 0{,}177\ \text{года} = 0{,}177\cdot365 = 64{,}5\ \text{сут} \approx 65\ \text{сут}` },
    ],
    answer: [String.raw`t = \frac{T_\text{З}}{2}\left(\frac12\right)^{3/2} \approx 65\ \text{сут}`],
  },

  /* ===================== 4.18 ===================== */
  {
    id: '4.18', chapter: CH, section: S1, page: '86',
    title: 'Полёт с Земли на Марс',
    given: [[String.raw`r_\text{З} = 1\ \text{а.е.}`, ''], [String.raw`r = 1{,}5\ \text{а.е.}`, ''], [String.raw`T_\text{З} = 365\ \text{сут}`, '']],
    find: String.raw`t \;—\; ?`,
    formulas: [KEPLER],
    steps: [
      { title: 'Орбита перелёта',
        text: 'На рис. 4.7 эллипс касается орбиты Земли в ближней точке и орбиты Марса — в дальней.',
        tex: String.raw`a = \frac{1 + 1{,}5}{2} = 1{,}25\ \text{а.е.}` },
      { title: 'Период по эллипсу',
        tex: String.raw`T = 1{,}25^{3/2} = 1{,}40\ \text{года}` },
      { title: 'Перелёт — половина оборота',
        tex: String.raw`t = \frac T2 = 0{,}699\cdot365 = 255\ \text{сут}` },
    ],
    answer: [String.raw`t = \frac{T_\text{З}}{2}\left(\frac{1 + 1{,}5}{2}\right)^{3/2} = 255\ \text{сут}`],
  },

  /* ===================== 4.19 ===================== */
  {
    id: '4.19', chapter: CH, section: S1, page: '86–87',
    title: 'Скорость в перигее и апогее',
    given: [[String.raw`e = 0{,}5`, '']],
    find: String.raw`v_\text{п}/v_\text{а} \;—\; ?`,
    formulas: [{ tex: String.raw`mv_\text{п}r_\text{п} = mv_\text{а}r_\text{а}`, text: 'момент импульса относительно центра Земли сохраняется; в перигее и апогее скорость перпендикулярна радиусу' },
      { tex: String.raw`r_\text{п} = a(1 - e),\quad r_\text{а} = a(1 + e)`, text: 'расстояния от фокуса до ближней и дальней точек эллипса' }],
    steps: [
      { title: 'Сохранение момента импульса',
        tex: String.raw`\frac{v_\text{п}}{v_\text{а}} = \frac{r_\text{а}}{r_\text{п}} = \frac{1 + e}{1 - e} = \frac{1{,}5}{0{,}5} = 3` },
    ],
    answer: [String.raw`v_\text{п}/v_\text{а} = (1 + e)/(1 - e) = 3`],
  },

  /* ===================== 4.20 ===================== */
  {
    id: '4.20', chapter: CH, section: S1, page: '87',
    title: 'Скорость кометы',
    given: [[String.raw`e = 0{,}6`, '']],
    find: String.raw`v_\text{п}/v_\text{а} \;—\; ?`,
    formulas: [{ tex: String.raw`\frac{v_\text{п}}{v_\text{а}} = \frac{1 + e}{1 - e}`, text: 'из сохранения момента импульса (см. задачу 4.19)' }],
    steps: [
      { title: 'Как в задаче 4.19',
        tex: String.raw`\frac{v_\text{п}}{v_\text{а}} = \frac{1 + 0{,}6}{1 - 0{,}6} = \frac{1{,}6}{0{,}4} = 4` },
    ],
    answer: [String.raw`\text{в 4 раза}`],
  },

  /* ===================== 4.21 ===================== */
  {
    id: '4.21', chapter: CH, section: S1, page: '87',
    title: 'Масса Марса по спутнику',
    given: [[String.raw`r = 9{,}4\cdot10^6\ \text{м}`, ''], [String.raw`v = 2{,}1\ \text{км/с}`, String.raw`2{,}1\cdot10^3\ \text{м/с}`]],
    find: String.raw`M \;—\; ?`,
    formulas: [CIRC],
    steps: [
      { title: 'Из условия круговой орбиты',
        tex: String.raw`M = \frac{v^2r}{G} = \frac{(2{,}1\cdot10^3)^2\cdot9{,}4\cdot10^6}{6{,}67\cdot10^{-11}} = 6{,}21\cdot10^{23}\ \text{кг}` },
    ],
    answer: [String.raw`M = v^2r/G = 6{,}21\cdot10^{23}\ \text{кг}`],
  },

  /* ===================== 4.22 ===================== */
  {
    id: '4.22', chapter: CH, section: S1, page: '87',
    title: 'Масса Земли по движению Луны',
    given: [[String.raw`r = 3{,}84\cdot10^8\ \text{м}`, ''], [String.raw`T = 27{,}3\ \text{сут}`, String.raw`2{,}36\cdot10^6\ \text{с}`]],
    find: String.raw`M \;—\; ?`,
    formulas: [{ tex: String.raw`G\frac{Mm}{r^2} = m\left(\frac{2\pi}{T}\right)^2r`, text: 'тяготение Земли — центростремительная сила для Луны' }],
    steps: [
      { title: 'Выражаем массу',
        tex: String.raw`M = \frac{4\pi^2r^3}{GT^2}` },
      { title: 'Числа из табл. 8',
        tex: String.raw`M = \frac{4\pi^2\cdot(3{,}84\cdot10^8)^3}{6{,}67\cdot10^{-11}\cdot(2{,}36\cdot10^6)^2} = 6{,}02\cdot10^{24}\ \text{кг}` },
    ],
    answer: [String.raw`M = \frac{4\pi^2r^3}{GT^2} = 6{,}02\cdot10^{24}\ \text{кг}`],
    note: MISMATCH + String.raw`В книге $5{,}98\cdot10^{24}$ кг — это просто табличная масса Земли. По табличным же $r$ и $T$ формула даёт $6{,}02\cdot10^{24}$ кг: отличие 0,6 % из-за того, что Луна обращается не вокруг центра Земли, а вокруг общего центра масс, и из-за округления $r$ и $T$.`,
  },

  /* ===================== 4.23 ===================== */
  {
    id: '4.23', chapter: CH, section: S1, page: '87',
    title: 'Масса Сатурна в массах Земли',
    given: [[String.raw`r_\text{С} = r_\text{Л}`, ''], [String.raw`T_\text{С} = T_\text{Л}/10`, '']],
    find: String.raw`M_\text{С}/M_\text{З} \;—\; ?`,
    formulas: [{ tex: String.raw`M = \frac{4\pi^2r^3}{GT^2}`, text: 'масса центрального тела по орбите спутника (см. задачу 4.22)' }],
    steps: [
      { title: 'Радиусы одинаковы — остаются периоды',
        tex: String.raw`\frac{M_\text{С}}{M_\text{З}} = \left(\frac{T_\text{Л}}{T_\text{С}}\right)^2 = n^2 = 100` },
    ],
    answer: [String.raw`M_\text{С}/M_\text{З} = n^2 = 100`],
  },

  /* ===================== 4.24 ===================== */
  {
    id: '4.24', chapter: CH, section: S1, page: '87',
    title: 'g внутри и вне однородной планеты',
    given: [[String.raw`\rho = \text{const}`, ''], [String.raw`R`, '']],
    find: String.raw`g(r) \;—\; ?`,
    formulas: [GFIELD, { tex: String.raw`M(r) = \tfrac43\pi r^3\rho`, text: 'внутри планеты притягивает только шар радиусом r; наружный слой поля внутри не создаёт' }],
    steps: [
      { title: 'Внутри, r ≤ R',
        tex: String.raw`g = \frac{GM(r)}{r^2} = \frac{G\cdot\frac43\pi r^3\rho}{r^2} = \frac43\pi G\rho r` },
      { title: 'Снаружи, r ≥ R',
        tex: String.raw`g = \frac{GM}{r^2} = \frac{4\pi G\rho R^3}{3r^2}` },
      { title: 'График',
        text: 'Внутри g растёт линейно от нуля в центре до наибольшего значения на поверхности, снаружи убывает как 1/r². При r = R обе формулы дают одно и то же ⁴⁄₃πGρR — график без скачка (см. рисунок к ответу книги).' },
    ],
    answer: [String.raw`g = \tfrac43\pi G\rho r\ \ (r \leqslant R)`, String.raw`g = \frac{4\pi G\rho R^3}{3r^2}\ \ (r \geqslant R)`],
  },

  /* ===================== 4.25 ===================== */
  {
    id: '4.25', chapter: CH, section: S1, page: '87',
    title: 'Сила тяжести на высоте 5 км и в шахте',
    given: [[String.raw`m = 1\ \text{кг}`, ''], [String.raw`h = 5\ \text{км}`, String.raw`5\cdot10^3\ \text{м}`], [String.raw`\rho = 5{,}5\ \text{г/см}^3`, String.raw`5{,}5\cdot10^3\ \text{кг/м}^3`]],
    find: String.raw`\Delta mg_1,\ \Delta mg_2 \;—\; ?`,
    formulas: [GRHO, { tex: String.raw`g_h \approx g\left(1 - \frac{2h}{R}\right)`, text: 'на малой высоте h ≪ R' }, { tex: String.raw`g(r) = \tfrac43\pi G\rho r`, text: 'внутри однородного шара (задача 4.24)' }],
    steps: [
      { title: '1) Подъём на высоту h',
        text: 'h ≪ R, поэтому g убывает на долю 2h/R.',
        tex: String.raw`\Delta mg_1 = mg\frac{2h}{R} = m\cdot\frac43\pi G\rho R\cdot\frac{2h}{R} = \frac83\pi G\rho mh = \frac83\pi\cdot6{,}67\cdot10^{-11}\cdot5{,}5\cdot10^3\cdot1\cdot5\cdot10^3 = 15{,}4\cdot10^{-3}\ \text{Н}` },
      { title: '2) Спуск в шахту на глубину h',
        text: 'Внутри шара g пропорционально расстоянию до центра: на глубине h оно меньше на долю h/R — вдвое медленнее, чем при подъёме.',
        tex: String.raw`\Delta mg_2 = mg\frac{h}{R} = \frac43\pi G\rho mh = 7{,}68\cdot10^{-3}\ \text{Н}` },
    ],
    answer: [String.raw`\Delta mg_1 = \tfrac83\pi G\rho mh = 15{,}4\ \text{мН}`, String.raw`\Delta mg_2 = \tfrac43\pi G\rho mh = 7{,}68\ \text{мН}`],
    note: SMALL + String.raw`Во втором случае в книге 7,71 мН. По формуле книги $\frac43\pi\cdot6{,}67\cdot10^{-11}\cdot5500\cdot1\cdot5000 = 7{,}68$ мН — ровно половина первого ответа (15,37 мН).`,
  },

  /* ===================== 4.26 ===================== */
  {
    id: '4.26', chapter: CH, section: S1, page: '87',
    title: 'Работа поля при падении тела',
    given: [[String.raw`m = 1\ \text{кг}`, ''], [String.raw`h = R = 6{,}37\cdot10^6\ \text{м}`, ''], [String.raw`g = 9{,}81\ \text{м/с}^2`, '']],
    find: String.raw`A_1,\ A_2 \;—\; ?`,
    formulas: [PIG, GR2, { tex: String.raw`A = \Pi_1 - \Pi_2`, text: 'работа сил поля равна убыли потенциальной энергии' }],
    steps: [
      { title: 'Общая формула',
        tex: String.raw`A = GMm\left(\frac1R - \frac1{r_1}\right) = mgR^2\left(\frac1R - \frac1{r_1}\right)` },
      { title: '1) С высоты h = R (r₁ = 2R)',
        tex: String.raw`A_1 = mgR\left(1 - \frac12\right) = \frac{mgR}{2} = \frac{1\cdot9{,}81\cdot6{,}37\cdot10^6}{2} = 31{,}2\cdot10^6\ \text{Дж}` },
      { title: '2) Из бесконечности (r₁ → ∞)',
        tex: String.raw`A_2 = mgR = 1\cdot9{,}81\cdot6{,}37\cdot10^6 = 62{,}5\cdot10^6\ \text{Дж}` },
    ],
    answer: [String.raw`A_1 = \tfrac12 mgR = 31{,}2\ \text{МДж}`, String.raw`A_2 = mgR = 62{,}5\ \text{МДж}`],
    note: SMALL + String.raw`Во втором случае в книге 62,4 МДж — удвоенное округлённое 31,2. Точно $9{,}81\cdot6{,}37\cdot10^6 = 62{,}49$ МДж $\approx 62{,}5$ МДж.`,
  },

  /* ===================== 4.27 ===================== */
  {
    id: '4.27', chapter: CH, section: S1, page: '87',
    title: 'Ракета с первой космической скоростью вверх',
    given: [[String.raw`v = v_1 = \sqrt{gR}`, '']],
    find: String.raw`h \;—\; ?`,
    formulas: [ECONS, GR2],
    steps: [
      { title: 'Сохранение энергии',
        text: 'В верхней точке скорость равна нулю.',
        tex: String.raw`\frac{mv^2}{2} - G\frac{Mm}{R} = -G\frac{Mm}{R + h}` },
      { title: 'Подставляем v² = gR и GM = gR²',
        tex: String.raw`\frac{gR}{2} - gR = -\frac{gR^2}{R + h}\ \Rightarrow\ R + h = 2R\ \Rightarrow\ h = R` },
    ],
    answer: [String.raw`h = R = 6{,}37\cdot10^6\ \text{м}`],
  },

  /* ===================== 4.28 ===================== */
  {
    id: '4.28', chapter: CH, section: S1, page: '87',
    title: 'Потенциал на поверхности Земли и Солнца',
    given: [[String.raw`M_\text{З} = 5{,}98\cdot10^{24}\ \text{кг},\ R_\text{З} = 6{,}37\cdot10^6\ \text{м}`, ''], [String.raw`M_\text{С} = 1{,}98\cdot10^{30}\ \text{кг},\ R_\text{С} = 6{,}95\cdot10^8\ \text{м}`, '']],
    find: String.raw`\varphi_\text{З},\ \varphi_\text{С} \;—\; ?`,
    formulas: [PIG],
    steps: [
      { title: 'Земля',
        tex: String.raw`\varphi_\text{З} = -\frac{GM_\text{З}}{R_\text{З}} = -\frac{6{,}67\cdot10^{-11}\cdot5{,}98\cdot10^{24}}{6{,}37\cdot10^6} = -6{,}26\cdot10^7\ \text{Дж/кг}` },
      { title: 'Солнце',
        tex: String.raw`\varphi_\text{С} = -\frac{6{,}67\cdot10^{-11}\cdot1{,}98\cdot10^{30}}{6{,}95\cdot10^8} = -1{,}90\cdot10^{11}\ \text{Дж/кг}` },
    ],
    answer: [String.raw`\varphi_\text{З} = -62{,}6\ \text{МДж/кг}`, String.raw`\varphi_\text{С} = -190\ \text{ГДж/кг}`],
  },

  /* ===================== 4.29 ===================== */
  {
    id: '4.29', chapter: CH, section: S1, page: '87',
    title: 'Космические скорости для Луны',
    given: [[String.raw`M = 7{,}33\cdot10^{22}\ \text{кг}`, ''], [String.raw`R = 1{,}74\cdot10^6\ \text{м}`, '']],
    find: String.raw`v_1,\ v_2 \;—\; ?`,
    formulas: [CIRC, { tex: String.raw`v_2 = \sqrt{\frac{2GM}{R}} = \sqrt2\,v_1`, text: 'вторая (параболическая) скорость: полная энергия равна нулю (пример 1)' }],
    steps: [
      { title: 'Первая (круговая)',
        tex: String.raw`v_1 = \sqrt{\frac{GM}{R}} = \sqrt{\frac{6{,}67\cdot10^{-11}\cdot7{,}33\cdot10^{22}}{1{,}74\cdot10^6}} = 1{,}68\cdot10^3\ \text{м/с}` },
      { title: 'Вторая (параболическая)',
        tex: String.raw`v_2 = \sqrt2\cdot1{,}676\cdot10^3 = 2{,}37\cdot10^3\ \text{м/с}` },
    ],
    answer: [String.raw`v_1 = 1{,}68\ \text{км/с}`, String.raw`v_2 = 2{,}37\ \text{км/с}`],
  },

  /* ===================== 4.30 ===================== */
  {
    id: '4.30', chapter: CH, section: S1, page: '87',
    title: 'Космические скорости для Солнца',
    given: [[String.raw`M = 1{,}98\cdot10^{30}\ \text{кг}`, ''], [String.raw`R = 6{,}95\cdot10^8\ \text{м}`, '']],
    find: String.raw`v_1,\ v_2 \;—\; ?`,
    formulas: [CIRC, { tex: String.raw`v_2 = \sqrt2\,v_1`, text: 'вторая космическая скорость' }],
    steps: [
      { title: 'Первая',
        tex: String.raw`v_1 = \sqrt{\frac{6{,}67\cdot10^{-11}\cdot1{,}98\cdot10^{30}}{6{,}95\cdot10^8}} = 4{,}36\cdot10^5\ \text{м/с}` },
      { title: 'Вторая',
        tex: String.raw`v_2 = \sqrt2\cdot4{,}359\cdot10^5 = 6{,}16\cdot10^5\ \text{м/с}` },
    ],
    answer: [String.raw`v_1 = 436\ \text{км/с}`, String.raw`v_2 = 616\ \text{км/с}`],
    note: SMALL + String.raw`Для второй скорости в книге 617 км/с — так выходит, если умножать на $\sqrt2$ уже округлённые 436 км/с. Без промежуточного округления $\sqrt2\cdot435{,}9 = 616{,}5$ км/с.`,
  },

  /* ===================== 4.31 ===================== */
  {
    id: '4.31', chapter: CH, section: S1, page: '87',
    title: 'Параболическая скорость на малой планете',
    given: [[String.raw`R = 100\ \text{км}`, String.raw`10^5\ \text{м}`], [String.raw`\rho = 3\ \text{г/см}^3`, String.raw`3\cdot10^3\ \text{кг/м}^3`]],
    find: String.raw`v_2 \;—\; ?`,
    formulas: [{ tex: String.raw`v_2 = \sqrt{\frac{2GM}{R}},\quad M = \tfrac43\pi R^3\rho`, text: 'вторая космическая скорость; масса однородной планеты' }],
    steps: [
      { title: 'Через плотность',
        tex: String.raw`v_2 = \sqrt{\frac{2G\cdot\frac43\pi R^3\rho}{R}} = R\sqrt{\tfrac83\pi G\rho}` },
      { title: 'Считаем',
        tex: String.raw`v_2 = 10^5\cdot\sqrt{\tfrac83\pi\cdot6{,}67\cdot10^{-11}\cdot3\cdot10^3} = 129\ \text{м/с} \approx 130\ \text{м/с}` },
    ],
    answer: [String.raw`v_2 = R\sqrt{\tfrac83\pi G\rho} \approx 130\ \text{м/с}`],
  },

  /* ===================== 4.32 ===================== */
  {
    id: '4.32', chapter: CH, section: S1, page: '88',
    title: 'Скорость ракеты на высоте R',
    given: [[String.raw`v_0 = 10\ \text{км/с}`, String.raw`10^4\ \text{м/с}`], [String.raw`h = R = 6{,}37\cdot10^6\ \text{м}`, ''], [String.raw`g = 9{,}81\ \text{м/с}^2`, '']],
    find: String.raw`v \;—\; ?`,
    formulas: [ECONS, GR2],
    steps: [
      { title: 'Сохранение энергии',
        tex: String.raw`\frac{v_0^2}{2} - \frac{GM}{R} = \frac{v^2}{2} - \frac{GM}{2R}\ \Rightarrow\ v^2 = v_0^2 - \frac{GM}{R} = v_0^2 - gR` },
      { title: 'Считаем',
        tex: String.raw`v = \sqrt{10^8 - 9{,}81\cdot6{,}37\cdot10^6} = \sqrt{3{,}75\cdot10^7} = 6{,}12\cdot10^3\ \text{м/с}` },
    ],
    answer: [String.raw`v = \sqrt{v_0^2 - gR} = 6{,}12\ \text{км/с}`],
  },

  /* ===================== 4.33 ===================== */
  {
    id: '4.33', chapter: CH, section: S1, page: '88',
    title: 'Скорость ракеты на бесконечности',
    given: [[String.raw`v_0 = 15\ \text{км/с}`, String.raw`1{,}5\cdot10^4\ \text{м/с}`], [String.raw`R = 6{,}37\cdot10^6\ \text{м}`, '']],
    find: String.raw`v_\infty \;—\; ?`,
    formulas: [ECONS, GR2],
    steps: [
      { title: 'На бесконечности потенциальная энергия равна нулю',
        tex: String.raw`\frac{v_0^2}{2} - gR = \frac{v^2}{2}\ \Rightarrow\ v = \sqrt{v_0^2 - 2gR}` },
      { title: 'Считаем',
        tex: String.raw`v = \sqrt{2{,}25\cdot10^8 - 2\cdot9{,}81\cdot6{,}37\cdot10^6} = \sqrt{1{,}00\cdot10^8} = 10\ \text{км/с}` },
    ],
    answer: [String.raw`v = \sqrt{v_0^2 - 2gR} = 10\ \text{км/с}`],
  },

  /* ===================== 4.34 ===================== */
  {
    id: '4.34', chapter: CH, section: S1, page: '88',
    title: 'Метеорит у орбиты Земли',
    given: [[String.raw`M_\text{С} = 1{,}98\cdot10^{30}\ \text{кг}`, ''], [String.raw`r = 1{,}49\cdot10^{11}\ \text{м}`, '']],
    find: String.raw`v \;—\; ?`,
    formulas: [ECONS],
    steps: [
      { title: 'Сначала полная энергия равна нулю',
        text: 'Издалека, без начальной скорости: и кинетическая, и потенциальная энергии — нули.',
        tex: String.raw`0 = \frac{mv^2}{2} - G\frac{M_\text{С}m}{r}\ \Rightarrow\ v = \sqrt{\frac{2GM_\text{С}}{r}}` },
      { title: 'Считаем',
        tex: String.raw`v = \sqrt{\frac{2\cdot6{,}67\cdot10^{-11}\cdot1{,}98\cdot10^{30}}{1{,}49\cdot10^{11}}} = 4{,}21\cdot10^4\ \text{м/с}` },
    ],
    answer: [String.raw`v = \sqrt{2GM/r} = 42{,}1\ \text{км/с}`],
  },

  /* ===================== 4.35 ===================== */
  {
    id: '4.35', chapter: CH, section: S1, page: '88',
    title: 'Комета на параболической орбите',
    given: [[String.raw`r = 50\ \text{Гм}`, String.raw`5\cdot10^{10}\ \text{м}`], [String.raw`M_\text{С} = 1{,}98\cdot10^{30}\ \text{кг}`, '']],
    find: String.raw`v \;—\; ?`,
    formulas: [{ tex: String.raw`v = \sqrt{\frac{2GM}{r}}`, text: 'на параболе полная энергия равна нулю — в каждой точке скорость параболическая' }],
    steps: [
      { title: 'Считаем',
        tex: String.raw`v = \sqrt{\frac{2\cdot6{,}67\cdot10^{-11}\cdot1{,}98\cdot10^{30}}{5\cdot10^{10}}} = 7{,}27\cdot10^4\ \text{м/с}` },
    ],
    answer: [String.raw`v = \sqrt{2GM/r} = 72{,}7\ \text{км/с}`],
    note: SMALL + String.raw`В книге 72,6 км/с; подстановка даёт $\sqrt{5{,}28\cdot10^9} = 72{,}68$ км/с $\approx 72{,}7$ км/с.`,
  },

  /* ===================== 4.36 ===================== */
  {
    id: '4.36', chapter: CH, section: S1, page: '88',
    title: 'Какая орбита: окружность, эллипс или гипербола',
    given: [[String.raw`h = 2{,}6\cdot10^6\ \text{м}`, ''], [String.raw`v = 10\ \text{км/с}`, String.raw`10^4\ \text{м/с}`], [String.raw`GM = 3{,}99\cdot10^{14}\ \text{м}^3/\text{с}^2`, '']],
    find: String.raw`\text{вид орбиты}`,
    formulas: [CIRC, { tex: String.raw`v_\text{п} = \sqrt{\frac{2GM}{r}} = \sqrt2\,v_\text{кр}`, text: 'параболическая скорость на расстоянии r' }],
    steps: [
      { title: 'Скорости на этой высоте',
        text: 'Скорость перпендикулярна радиусу — сравниваем её с круговой и параболической.',
        tex: String.raw`r = R + h = 8{,}97\cdot10^6\ \text{м};\quad v_\text{кр} = \sqrt{\frac{3{,}99\cdot10^{14}}{8{,}97\cdot10^6}} = 6{,}67\ \text{км/с};\quad v_\text{п} = 9{,}43\ \text{км/с}` },
      { title: 'Сравнение',
        text: 'v = кр — окружность; кр < v < п — эллипс; v = п — парабола; v > п — гипербола. Здесь 10 км/с > 9,43 км/с: полная энергия положительна, ракета уйдёт от Земли.' },
    ],
    answer: [String.raw`v > v_\text{п} = 9{,}43\ \text{км/с} \Rightarrow \text{гипербола}`],
  },

  /* ===================== 4.37 ===================== */
  {
    id: '4.37', chapter: CH, section: S2, page: '88',
    title: 'Напряжение в проволоке с грузом',
    given: [[String.raw`d = 2\ \text{мм}`, String.raw`2\cdot10^{-3}\ \text{м}`], [String.raw`m = 1\ \text{кг}`, '']],
    find: String.raw`\sigma \;—\; ?`,
    formulas: [SIGMA],
    steps: [
      { title: 'Сила — вес груза',
        tex: String.raw`\sigma = \frac{mg}{\pi d^2/4} = \frac{4\cdot1\cdot9{,}81}{\pi\cdot(2\cdot10^{-3})^2} = 3{,}12\cdot10^6\ \text{Па}` },
    ],
    answer: [String.raw`\sigma = \frac{4mg}{\pi d^2} = 3{,}12\ \text{МПа}`],
  },

  /* ===================== 4.38 ===================== */
  {
    id: '4.38', chapter: CH, section: S2, page: '88',
    title: 'Тяжёлая свинцовая проволока с грузом',
    given: [[String.raw`d = 2\ \text{см}`, String.raw`0{,}02\ \text{м}`], [String.raw`l = 60\ \text{м}`, ''], [String.raw`m = 100\ \text{кг}`, ''], [String.raw`\rho = 11{,}3\ \text{г/см}^3`, String.raw`1{,}13\cdot10^4\ \text{кг/м}^3`]],
    find: String.raw`\sigma_1,\ \sigma_2,\ \sigma_3 \;—\; ?`,
    formulas: [SIGMA],
    steps: [
      { title: 'Что держит сечение',
        text: 'Сечение держит груз и всю проволоку ниже себя. Вес куска длиной y: ρgSy, его вклад в напряжение ρgy — от площади не зависит.',
        tex: String.raw`\sigma(y) = \frac{mg}{S} + \rho gy,\quad \frac{mg}{S} = \frac{4\cdot100\cdot9{,}81}{\pi\cdot0{,}02^2} = 3{,}12\ \text{МПа}` },
      { title: '1) У нижнего конца (y = 0)',
        tex: String.raw`\sigma_1 = 3{,}12\ \text{МПа}` },
      { title: '2) На середине (y = 30 м)',
        tex: String.raw`\sigma_2 = 3{,}12\cdot10^6 + 1{,}13\cdot10^4\cdot9{,}81\cdot30 = 3{,}12\cdot10^6 + 3{,}33\cdot10^6 = 6{,}45\ \text{МПа}` },
      { title: '3) У верхнего конца (y = 60 м)',
        tex: String.raw`\sigma_3 = 3{,}12\cdot10^6 + 6{,}65\cdot10^6 = 9{,}77\ \text{МПа}` },
    ],
    answer: [String.raw`\sigma_1 = 3{,}12\ \text{МПа}`, String.raw`\sigma_2 = 6{,}45\ \text{МПа}`, String.raw`\sigma_3 = 9{,}77\ \text{МПа}`],
    note: SMALL + String.raw`Для верхнего конца в книге 9,78 МПа; $3{,}122 + 6{,}651 = 9{,}774$ МПа $\approx 9{,}77$ МПа.`,
  },

  /* ===================== 4.39 ===================== */
  {
    id: '4.39', chapter: CH, section: S2, page: '88',
    title: 'Предельный груз для стальной проволоки',
    given: [[String.raw`d = 1\ \text{мм}`, String.raw`10^{-3}\ \text{м}`], [String.raw`\sigma_\text{упр} = 294\ \text{МПа}`, String.raw`2{,}94\cdot10^8\ \text{Па}`], [String.raw`E = 200\ \text{ГПа}`, String.raw`2\cdot10^{11}\ \text{Па}`]],
    find: String.raw`P,\ \varepsilon \;—\; ?`,
    formulas: [SIGMA, HOOKE],
    steps: [
      { title: 'Наибольший груз',
        tex: String.raw`P = \sigma_\text{упр}S = 2{,}94\cdot10^8\cdot\frac{\pi\cdot10^{-6}}{4} = 231\ \text{Н}` },
      { title: 'Относительное удлинение',
        tex: String.raw`\varepsilon = \frac{\sigma_\text{упр}}{E} = \frac{2{,}94\cdot10^8}{2\cdot10^{11}} = 1{,}47\cdot10^{-3}` },
    ],
    answer: [String.raw`P = \pi d^2\sigma_\text{упр}/4 = 231\ \text{Н}`, String.raw`\varepsilon = \sigma_\text{упр}/E = 1{,}47\cdot10^{-3}`],
  },

  /* ===================== 4.40 ===================== */
  {
    id: '4.40', chapter: CH, section: S2, page: '88',
    title: 'Предельная длина свинцовой проволоки',
    given: [[String.raw`\sigma_\text{пр} = 12{,}3\ \text{МПа}`, String.raw`1{,}23\cdot10^7\ \text{Па}`], [String.raw`\rho = 11{,}3\ \text{г/см}^3`, String.raw`1{,}13\cdot10^4\ \text{кг/м}^3`]],
    find: String.raw`l \;—\; ?`,
    formulas: [SIGMA],
    steps: [
      { title: 'Напряжение у точки подвеса',
        text: 'Верхнее сечение держит всю проволоку: σ = ρgSl/S = ρgl.',
        tex: String.raw`\rho gl = \sigma_\text{пр}\ \Rightarrow\ l = \frac{\sigma_\text{пр}}{\rho g} = \frac{1{,}23\cdot10^7}{1{,}13\cdot10^4\cdot9{,}81} = 111\ \text{м}` },
    ],
    answer: [String.raw`l = \sigma_\text{пр}/(\rho g) = 111\ \text{м}`],
  },

  /* ===================== 4.41 ===================== */
  {
    id: '4.41', chapter: CH, section: S2, page: '88–89',
    title: 'Гиря на вращающейся проволоке',
    given: [[String.raw`m = 10\ \text{кг}`, ''], [String.raw`n = 2\ \text{с}^{-1}`, ''], [String.raw`l = 1{,}2\ \text{м}`, ''], [String.raw`S = 2\ \text{мм}^2`, String.raw`2\cdot10^{-6}\ \text{м}^2`]],
    find: String.raw`\sigma \;—\; ?`,
    formulas: [SIGMA, { tex: String.raw`F = m\omega^2r,\quad \omega = 2\pi n`, text: 'центростремительная сила' }],
    steps: [
      { title: 'Натяжение = центростремительная сила',
        text: 'Трения нет, проволока невесома — она только удерживает гирю на окружности радиусом l.',
        tex: String.raw`F = m(2\pi n)^2l = 10\cdot(4\pi)^2\cdot1{,}2 = 1{,}895\cdot10^3\ \text{Н}` },
      { title: 'Напряжение',
        tex: String.raw`\sigma = \frac FS = \frac{4\pi^2n^2ml}{S} = \frac{1{,}895\cdot10^3}{2\cdot10^{-6}} = 9{,}47\cdot10^8\ \text{Па}` },
    ],
    answer: [String.raw`\sigma = \frac{4\pi^2n^2ml}{S} = 947\ \text{МПа}`],
    note: SMALL + String.raw`В книге 948 МПа; $4\pi^2\cdot2^2\cdot10\cdot1{,}2/(2\cdot10^{-6}) = 947{,}5$ МПа.`,
  },

  /* ===================== 4.42 ===================== */
  {
    id: '4.42', chapter: CH, section: S2, page: '89',
    title: 'Вращающийся стержень: наибольшее напряжение',
    given: [[String.raw`l = 1{,}2\ \text{м}`, ''], [String.raw`S = 2\ \text{см}^2`, String.raw`2\cdot10^{-4}\ \text{м}^2`], [String.raw`m = 10\ \text{кг}`, ''], [String.raw`n = 2\ \text{с}^{-1}`, '']],
    find: String.raw`\sigma_\text{max} \;—\; ?`,
    formulas: [SIGMA, { tex: String.raw`dF = \omega^2r\,dm,\quad dm = \frac ml\,dr`, text: 'центростремительная сила для кусочка стержня на расстоянии r от оси' }],
    steps: [
      { title: 'Где напряжение наибольшее',
        text: 'Сечение на расстоянии r от оси удерживает на окружностях всю внешнюю часть стержня. Больше всего «тянет» сечение у самой оси — оно держит весь стержень.' },
      { title: 'Сила у оси',
        tex: String.raw`F = \int_0^l\omega^2r\frac ml\,dr = \frac{m\omega^2l}{2} = 2\pi^2n^2ml` },
      { title: 'Напряжение',
        tex: String.raw`\sigma_\text{max} = \frac{2\pi^2n^2ml}{S} = \frac{2\pi^2\cdot4\cdot10\cdot1{,}2}{2\cdot10^{-4}} = 4{,}74\cdot10^6\ \text{Па}` },
    ],
    answer: [String.raw`\sigma_\text{max} = \frac{2\pi^2n^2ml}{S} = 4{,}74\ \text{МПа}`],
  },

  /* ===================== 4.43 ===================== */
  {
    id: '4.43', chapter: CH, section: S2, page: '89',
    title: 'Модуль Юнга по удлинению проволоки',
    given: [[String.raw`l = 5\ \text{м}`, ''], [String.raw`S = 2\ \text{мм}^2`, String.raw`2\cdot10^{-6}\ \text{м}^2`], [String.raw`m = 5{,}1\ \text{кг}`, ''], [String.raw`x = 0{,}6\ \text{мм}`, String.raw`6\cdot10^{-4}\ \text{м}`]],
    find: String.raw`E \;—\; ?`,
    formulas: [SIGMA, HOOKE],
    steps: [
      { title: 'E = σ/ε',
        tex: String.raw`E = \frac{mg/S}{x/l} = \frac{mgl}{Sx} = \frac{5{,}1\cdot9{,}81\cdot5}{2\cdot10^{-6}\cdot6\cdot10^{-4}} = 2{,}08\cdot10^{11}\ \text{Па}` },
    ],
    answer: [String.raw`E = \frac{mgl}{Sx} = 208\ \text{ГПа}`],
  },

  /* ===================== 4.44 ===================== */
  {
    id: '4.44', chapter: CH, section: S2, page: '89',
    title: 'Стальной стержень под грузом 2,5 т',
    given: [[String.raw`l = 3\ \text{м}`, ''], [String.raw`d = 2\ \text{см}`, String.raw`0{,}02\ \text{м}`], [String.raw`m = 2{,}5\cdot10^3\ \text{кг}`, ''], [String.raw`E = 200\ \text{ГПа}`, String.raw`2\cdot10^{11}\ \text{Па}`]],
    find: String.raw`\sigma,\ \varepsilon,\ x \;—\; ?`,
    formulas: [SIGMA, HOOKE],
    steps: [
      { title: 'Напряжение',
        tex: String.raw`\sigma = \frac{4mg}{\pi d^2} = \frac{4\cdot2{,}5\cdot10^3\cdot9{,}81}{\pi\cdot0{,}02^2} = 7{,}81\cdot10^7\ \text{Па}` },
      { title: 'Относительное удлинение',
        tex: String.raw`\varepsilon = \frac\sigma E = \frac{7{,}81\cdot10^7}{2\cdot10^{11}} = 3{,}90\cdot10^{-4}` },
      { title: 'Абсолютное удлинение',
        tex: String.raw`x = \varepsilon l = 3{,}90\cdot10^{-4}\cdot3 = 1{,}17\cdot10^{-3}\ \text{м}` },
    ],
    answer: [String.raw`\sigma = 78{,}1\ \text{МПа}`, String.raw`\varepsilon = 3{,}90\cdot10^{-4}`, String.raw`x = 1{,}17\ \text{мм}`],
    note: MISMATCH + String.raw`В книге $\sigma = 78{,}5$ МПа, но $4mg/(\pi d^2) = 24\,525/3{,}1416\cdot10^{-4} = 78{,}1$ МПа. Следующий ответ книги $\varepsilon = 3{,}90\cdot10^{-4}$ посчитан как раз с 78,1 МПа (с 78,5 вышло бы $3{,}93\cdot10^{-4}$) — значит, в напряжении опечатка. $x = 1{,}2$ мм в книге — то же 1,17 мм, округлённое.`,
  },

  /* ===================== 4.45 ===================== */
  {
    id: '4.45', chapter: CH, section: S2, page: '89',
    title: 'Провисание проволоки под грузом',
    given: [[String.raw`l = 2\ \text{м}`, ''], [String.raw`d = 1\ \text{мм}`, String.raw`10^{-3}\ \text{м}`], [String.raw`m = 1\ \text{кг}`, ''], [String.raw`h = 4\ \text{см}`, String.raw`0{,}04\ \text{м}`]],
    find: String.raw`E \;—\; ?`,
    formulas: [SIGMA, HOOKE, { tex: String.raw`\sqrt{1 + z} \approx 1 + \frac z2`, text: 'при z ≪ 1' }],
    steps: [
      { title: 'Натяжение',
        text: 'Груз висит в середине; каждая половина проволоки (длиной l/2) наклонена на малый угол α, sin α ≈ h/(l/2) = 2h/l.',
        tex: String.raw`2T\sin\alpha = mg\ \Rightarrow\ T = \frac{mg}{2\cdot2h/l} = \frac{mgl}{4h} = \frac{9{,}81\cdot2}{4\cdot0{,}04} = 123\ \text{Н}` },
      { title: 'Удлинение',
        text: 'Половина проволоки стала гипотенузой: √((l/2)² + h²) ≈ l/2 + h²/l.',
        tex: String.raw`\Delta l = 2\cdot\frac{h^2}{l} = \frac{2h^2}{l},\quad \varepsilon = \frac{\Delta l}{l} = \frac{2h^2}{l^2} = \frac{2\cdot0{,}04^2}{2^2} = 8\cdot10^{-4}` },
      { title: 'Модуль Юнга',
        tex: String.raw`E = \frac{T}{S\varepsilon} = \frac{mgl/(4h)}{\frac{\pi d^2}{4}\cdot\frac{2h^2}{l^2}} = \frac{mgl^3}{2\pi d^2h^3} = \frac{9{,}81\cdot8}{2\pi\cdot10^{-6}\cdot6{,}4\cdot10^{-5}} = 1{,}95\cdot10^{11}\ \text{Па}` },
    ],
    answer: [String.raw`E \approx \frac{mgl^3}{2\pi d^2h^3} = 195\ \text{ГПа}`],
    note: SMALL + String.raw`В книге 196 ГПа по той же формуле; подстановка даёт 195,2 ГПа, точный расчёт без приближения малых углов — 195,4 ГПа.`,
  },

  /* ===================== 4.46 ===================== */
  {
    id: '4.46', chapter: CH, section: S2, page: '89',
    title: 'Две пружины последовательно: деформация первой',
    given: [[String.raw`k_1 = 0{,}3\ \text{кН/м}`, ''], [String.raw`k_2 = 0{,}8\ \text{кН/м}`, ''], [String.raw`x_2 = 1{,}5\ \text{см}`, '']],
    find: String.raw`x_1 \;—\; ?`,
    formulas: [SPRING],
    steps: [
      { title: 'Силы в пружинах одинаковы',
        text: 'При последовательном соединении через обе пружины передаётся одна и та же сила.',
        tex: String.raw`k_1x_1 = k_2x_2\ \Rightarrow\ x_1 = \frac{k_2}{k_1}x_2 = \frac{0{,}8}{0{,}3}\cdot1{,}5 = 4\ \text{см}` },
    ],
    answer: [String.raw`x_1 = (k_2/k_1)x_2 = 4\ \text{см}`],
  },

  /* ===================== 4.47 ===================== */
  {
    id: '4.47', chapter: CH, section: S2, page: '89',
    title: 'Жёсткость двух пружин',
    given: [[String.raw`k_1 = 2\ \text{кН/м}`, ''], [String.raw`k_2 = 6\ \text{кН/м}`, '']],
    find: String.raw`k',\ k'' \;—\; ?`,
    formulas: [SPRING],
    steps: [
      { title: 'Последовательно',
        text: 'Сила одна и та же, удлинения складываются: F/k′ = F/k₁ + F/k₂.',
        tex: String.raw`k' = \frac{k_1k_2}{k_1 + k_2} = \frac{2\cdot6}{8} = 1{,}5\ \text{кН/м}` },
      { title: 'Параллельно',
        text: 'Удлинение одно и то же, силы складываются.',
        tex: String.raw`k'' = k_1 + k_2 = 8\ \text{кН/м}` },
    ],
    answer: [String.raw`k' = \frac{k_1k_2}{k_1 + k_2} = 1{,}5\ \text{кН/м}`, String.raw`k'' = k_1 + k_2 = 8\ \text{кН/м}`],
  },

  /* ===================== 4.48 ===================== */
  {
    id: '4.48', chapter: CH, section: S2, page: '89',
    title: 'Сдвиг железной тумбы',
    given: [[String.raw`d = 20\ \text{см}`, String.raw`0{,}2\ \text{м}`], [String.raw`h = 20\ \text{см}`, String.raw`0{,}2\ \text{м}`], [String.raw`F = 20\ \text{кН}`, String.raw`2\cdot10^4\ \text{Н}`], [String.raw`G = 76\ \text{ГПа}`, String.raw`7{,}6\cdot10^{10}\ \text{Па}`]],
    find: String.raw`\tau,\ \gamma,\ \Delta x \;—\; ?`,
    formulas: [{ tex: String.raw`\tau = \frac FS,\quad \tau = G\gamma,\quad \Delta x = h\gamma`, text: 'тангенциальное напряжение, закон Гука для сдвига (G — модуль сдвига, табл. 11)' }],
    steps: [
      { title: '1) Тангенциальное напряжение',
        tex: String.raw`\tau = \frac{F}{\pi d^2/4} = \frac{2\cdot10^4}{\pi\cdot0{,}01} = 6{,}37\cdot10^5\ \text{Па}` },
      { title: '2) Угол сдвига',
        tex: String.raw`\gamma = \frac\tau G = \frac{6{,}37\cdot10^5}{7{,}6\cdot10^{10}} = 8{,}38\cdot10^{-6}\ \text{рад}` },
      { title: '3) Смещение верхнего основания',
        tex: String.raw`\Delta x = h\gamma = 0{,}2\cdot8{,}38\cdot10^{-6} = 1{,}68\cdot10^{-6}\ \text{м}` },
    ],
    answer: [String.raw`\tau = 637\ \text{кПа}`, String.raw`\gamma = 8{,}38\ \text{мкрад}`, String.raw`\Delta x = 1{,}68\ \text{мкм}`],
    note: SMALL + String.raw`Для угла сдвига в книге 8,37 мкрад; $636{,}6\ \text{кПа}/76\ \text{ГПа} = 8{,}377\cdot10^{-6}$.`,
  },

  /* ===================== 4.49 ===================== */
  {
    id: '4.49', chapter: CH, section: S2, page: '90',
    title: 'Закручивание стержня',
    given: [[String.raw`M = 1\ \text{кН·м}`, String.raw`10^3\ \text{Н·м}`], [String.raw`C = 120\ \text{кН·м/рад}`, String.raw`1{,}2\cdot10^5\ \text{Н·м/рад}`]],
    find: String.raw`\varphi \;—\; ?`,
    formulas: [{ tex: String.raw`M = C\varphi`, text: 'момент, закручивающий стержень на угол φ; C — постоянная кручения' }],
    steps: [
      { title: 'Угол закручивания',
        tex: String.raw`\varphi = \frac MC = \frac{10^3}{1{,}2\cdot10^5} = 8{,}33\cdot10^{-3}\ \text{рад}` },
    ],
    answer: [String.raw`\varphi = M/C = 8{,}33\ \text{мрад}`],
    note: MISMATCH + String.raw`В книге «$\varphi = M/S = 8{,}34$ мкрад»: в формуле вместо постоянной кручения $C$ напечатано $S$, а ответ в 1000 раз меньше. $1\ \text{кН·м}/(120\ \text{кН·м/рад}) = 1/120$ рад $= 8{,}33$ мрад (около 0,5°).`,
  },

  /* ===================== 4.50 ===================== */
  {
    id: '4.50', chapter: CH, section: S2, page: '90',
    title: 'Постоянная кручения ленты',
    given: [[String.raw`M = 1\ \text{мН·м}`, String.raw`10^{-3}\ \text{Н·м}`], [String.raw`\varphi = 10^\circ`, String.raw`0{,}175\ \text{рад}`]],
    find: String.raw`C \;—\; ?`,
    formulas: [{ tex: String.raw`M = C\varphi`, text: 'угол — в радианах' }],
    steps: [
      { title: 'Переводим угол и делим',
        tex: String.raw`\varphi = \frac{10\pi}{180} = 0{,}1745\ \text{рад};\quad C = \frac M\varphi = \frac{10^{-3}}{0{,}1745} = 5{,}73\cdot10^{-3}\ \text{Н·м/рад}` },
    ],
    answer: [String.raw`C = M/\varphi = 5{,}73\ \text{мН·м/рад}`],
    note: SMALL + String.raw`В книге 5,71 мН·м/рад; $1/0{,}17453 = 5{,}730$.`,
  },

  /* ===================== 4.51 ===================== */
  {
    id: '4.51', chapter: CH, section: S3, page: '90',
    title: 'Работа растяжения стального стержня',
    given: [[String.raw`x = 1\ \text{мм}`, String.raw`10^{-3}\ \text{м}`], [String.raw`l = 1\ \text{м}`, ''], [String.raw`S = 1\ \text{см}^2`, String.raw`10^{-4}\ \text{м}^2`], [String.raw`E = 200\ \text{ГПа}`, String.raw`2\cdot10^{11}\ \text{Па}`]],
    find: String.raw`A \;—\; ?`,
    formulas: [SPRING, WSPR],
    steps: [
      { title: 'Жёсткость стержня и работа',
        tex: String.raw`A = \frac{kx^2}{2} = \frac{ESx^2}{2l} = \frac{2\cdot10^{11}\cdot10^{-4}\cdot10^{-6}}{2\cdot1} = 10\ \text{Дж}` },
    ],
    answer: [String.raw`A = \frac{ESx^2}{2l} = 10\ \text{Дж}`],
  },

  /* ===================== 4.52 ===================== */
  {
    id: '4.52', chapter: CH, section: S3, page: '90',
    title: 'Работа сжатия пружины на 10 см',
    given: [[String.raw`x_1 = 1\ \text{см}`, String.raw`0{,}01\ \text{м}`], [String.raw`F = 10\ \text{Н}`, ''], [String.raw`x_2 = 10\ \text{см}`, String.raw`0{,}1\ \text{м}`]],
    find: String.raw`A \;—\; ?`,
    formulas: [SPRING, WSPR],
    steps: [
      { title: 'Жёсткость',
        tex: String.raw`k = \frac{F}{x_1} = \frac{10}{0{,}01} = 10^3\ \text{Н/м}` },
      { title: 'Работа',
        tex: String.raw`A = \frac{kx_2^2}{2} = \frac{10^3\cdot0{,}1^2}{2} = 5\ \text{Дж}` },
    ],
    answer: [String.raw`A = \frac{Fx_2^2}{2x_1} = 5\ \text{Дж}`],
  },

  /* ===================== 4.53 ===================== */
  {
    id: '4.53', chapter: CH, section: S3, page: '90',
    title: 'Дополнительное сжатие уже сжатой пружины',
    given: [[String.raw`k = 10\ \text{кН/м}`, String.raw`10^4\ \text{Н/м}`], [String.raw`F = 200\ \text{Н}`, ''], [String.raw`x = 1\ \text{см}`, String.raw`0{,}01\ \text{м}`]],
    find: String.raw`A \;—\; ?`,
    formulas: [SPRING, WSPR],
    steps: [
      { title: 'Начальное сжатие',
        tex: String.raw`x_0 = \frac Fk = \frac{200}{10^4} = 0{,}02\ \text{м}` },
      { title: 'Работа — прирост энергии пружины',
        tex: String.raw`A = \frac k2\left[(x_0 + x)^2 - x_0^2\right] = Fx + \frac{kx^2}{2} = 200\cdot0{,}01 + \frac{10^4\cdot10^{-4}}{2} = 2{,}5\ \text{Дж}` },
    ],
    answer: [String.raw`A = Fx + \tfrac12kx^2 = 2{,}5\ \text{Дж}`],
  },

  /* ===================== 4.54 ===================== */
  {
    id: '4.54', chapter: CH, section: S3, page: '90',
    title: 'Сжатие с 4 до 18 см',
    given: [[String.raw`k = 1\ \text{кН/м}`, String.raw`10^3\ \text{Н/м}`], [String.raw`x_1 = 4\ \text{см}`, String.raw`0{,}04\ \text{м}`], [String.raw`x_2 = 18\ \text{см}`, String.raw`0{,}18\ \text{м}`]],
    find: String.raw`A \;—\; ?`,
    formulas: [WSPR],
    steps: [
      { title: 'Разность энергий пружины',
        tex: String.raw`A = \frac k2\left(x_2^2 - x_1^2\right) = 500\cdot(0{,}0324 - 0{,}0016) = 15{,}4\ \text{Дж}` },
    ],
    answer: [String.raw`A = \tfrac12k(x_2^2 - x_1^2) = 15{,}4\ \text{Дж}`],
  },

  /* ===================== 4.55 ===================== */
  {
    id: '4.55', chapter: CH, section: S3, page: '90',
    title: 'Гиря падает на пружину',
    given: [[String.raw`x_0 = 2\ \text{мм}`, ''], [String.raw`h = 5\ \text{см}`, String.raw`50\ \text{мм}`]],
    find: String.raw`x \;—\; ?`,
    formulas: [SPRING, WSPR],
    steps: [
      { title: 'Жёсткость через статическое сжатие',
        tex: String.raw`kx_0 = mg\ \Rightarrow\ k = \frac{mg}{x_0}` },
      { title: 'Энергия',
        text: 'Гиря опускается на h + x; вся убыль её потенциальной энергии уходит в пружину (в нижней точке скорость равна нулю).',
        tex: String.raw`mg(h + x) = \frac{kx^2}{2} = \frac{mgx^2}{2x_0}\ \Rightarrow\ x^2 - 2x_0x - 2x_0h = 0` },
      { title: 'Корень (положительный)',
        tex: String.raw`x = x_0 + \sqrt{x_0^2 + 2x_0h} = 2 + \sqrt{4 + 2\cdot2\cdot50} = 2 + 14{,}3 = 16{,}3\ \text{мм}` },
    ],
    answer: [String.raw`x = x_0 + \sqrt{x_0^2 + 2x_0h} = 16{,}3\ \text{мм}`],
  },

  /* ===================== 4.56 ===================== */
  {
    id: '4.56', chapter: CH, section: S3, page: '90',
    title: 'Отход затвора пистолета',
    given: [[String.raw`m_1 = 10\ \text{г}`, String.raw`0{,}01\ \text{кг}`], [String.raw`v = 300\ \text{м/с}`, ''], [String.raw`m_2 = 200\ \text{г}`, String.raw`0{,}2\ \text{кг}`], [String.raw`k = 25\ \text{кН/м}`, String.raw`2{,}5\cdot10^4\ \text{Н/м}`]],
    find: String.raw`l \;—\; ?`,
    formulas: [{ tex: String.raw`m_1v = m_2u`, text: 'импульс пули и затвора при выстреле (пистолет закреплён, затвор свободен)' }, WSPR],
    steps: [
      { title: 'Скорость затвора',
        tex: String.raw`u = \frac{m_1v}{m_2} = \frac{0{,}01\cdot300}{0{,}2} = 15\ \text{м/с}` },
      { title: 'Кинетическая энергия затвора уходит в пружину',
        tex: String.raw`\frac{m_2u^2}{2} = \frac{kl^2}{2}\ \Rightarrow\ l = u\sqrt{\frac{m_2}{k}} = 15\cdot\sqrt{\frac{0{,}2}{2{,}5\cdot10^4}} = 4{,}24\cdot10^{-2}\ \text{м}` },
    ],
    answer: [String.raw`l = \frac{m_1v}{\sqrt{km_2}} = 4{,}24\ \text{см}`],
    note: SMALL + String.raw`В книге 4,25 см по той же формуле; $\sqrt{9/5000} = 0{,}04243$ м.`,
  },

  /* ===================== 4.57 ===================== */
  {
    id: '4.57', chapter: CH, section: S3, page: '90',
    title: 'Растяжение двух последовательных пружин',
    given: [[String.raw`k_1 = 0{,}3\ \text{кН/м}`, String.raw`300\ \text{Н/м}`], [String.raw`k_2 = 0{,}5\ \text{кН/м}`, String.raw`500\ \text{Н/м}`], [String.raw`x_2 = 3\ \text{см}`, String.raw`0{,}03\ \text{м}`]],
    find: String.raw`A \;—\; ?`,
    formulas: [SPRING, WSPR],
    steps: [
      { title: 'Сила и деформация первой пружины',
        tex: String.raw`F = k_2x_2 = 500\cdot0{,}03 = 15\ \text{Н};\quad x_1 = \frac{F}{k_1} = \frac{15}{300} = 0{,}05\ \text{м}` },
      { title: 'Работа = энергия обеих пружин',
        tex: String.raw`A = \frac{k_1x_1^2}{2} + \frac{k_2x_2^2}{2} = \frac{300\cdot0{,}05^2}{2} + \frac{500\cdot0{,}03^2}{2} = 0{,}375 + 0{,}225 = 0{,}6\ \text{Дж}` },
    ],
    answer: [String.raw`A = \frac{k_2(k_1 + k_2)}{2k_1}x_2^2 = 0{,}6\ \text{Дж}`],
  },

  /* ===================== 4.58 ===================== */
  {
    id: '4.58', chapter: CH, section: S3, page: '90',
    title: 'Растяжение, возврат и сжатие пружины',
    given: [[String.raw`k = 100\ \text{кН/м}`, String.raw`10^5\ \text{Н/м}`], [String.raw`x_1 = 4\ \text{см}`, String.raw`0{,}04\ \text{м}`], [String.raw`x_2 = 6\ \text{см}`, String.raw`0{,}06\ \text{м}`]],
    find: String.raw`A \;—\; ?`,
    formulas: [WSPR],
    steps: [
      { title: 'Возврат из растянутого состояния',
        text: 'Внешняя сила уменьшается, но всё время направлена против движения конца пружины — её работа отрицательна, пружина отдаёт свою энергию.',
        tex: String.raw`A_1 = -\frac{kx_1^2}{2} = -\frac{10^5\cdot0{,}04^2}{2} = -80\ \text{Дж}` },
      { title: 'Сжатие',
        tex: String.raw`A_2 = \frac{kx_2^2}{2} = \frac{10^5\cdot0{,}06^2}{2} = 180\ \text{Дж}` },
      { title: 'Итого',
        tex: String.raw`A = A_1 + A_2 = \frac k2\left(x_2^2 - x_1^2\right) = 100\ \text{Дж}` },
    ],
    answer: [String.raw`A = \tfrac12k(x_2^2 - x_1^2) = 100\ \text{Дж}`],
  },

  /* ===================== 4.59 ===================== */
  {
    id: '4.59', chapter: CH, section: S3, page: '90',
    title: 'Энергия растянутого стержня по массе',
    given: [[String.raw`m = 3{,}9\ \text{кг}`, ''], [String.raw`\varepsilon = 0{,}001`, ''], [String.raw`E = 200\ \text{ГПа},\ \rho = 7{,}87\ \text{г/см}^3`, '']],
    find: String.raw`\Pi \;—\; ?`,
    formulas: [WVOL],
    steps: [
      { title: 'Объём стержня',
        tex: String.raw`V = \frac m\rho = \frac{3{,}9}{7870} = 4{,}96\cdot10^{-4}\ \text{м}^3` },
      { title: 'Энергия',
        tex: String.raw`\Pi = \frac{E\varepsilon^2}{2}V = \frac{2\cdot10^{11}\cdot10^{-6}}{2}\cdot4{,}96\cdot10^{-4} = 49{,}6\ \text{Дж} \approx 50\ \text{Дж}` },
    ],
    answer: [String.raw`\Pi = \frac{E\varepsilon^2}{2}\cdot\frac m\rho \approx 50\ \text{Дж}`],
  },

  /* ===================== 4.60 ===================== */
  {
    id: '4.60', chapter: CH, section: S3, page: '90',
    title: 'Энергия стержня по удлинению',
    given: [[String.raw`l = 2\ \text{м}`, ''], [String.raw`S = 2\ \text{см}^2`, String.raw`2\cdot10^{-4}\ \text{м}^2`], [String.raw`x = 0{,}4\ \text{см}`, String.raw`4\cdot10^{-3}\ \text{м}`], [String.raw`E = 200\ \text{ГПа}`, String.raw`2\cdot10^{11}\ \text{Па}`]],
    find: String.raw`\Pi,\ w \;—\; ?`,
    formulas: [SPRING, WSPR, WVOL],
    steps: [
      { title: 'Энергия',
        tex: String.raw`\Pi = \frac{kx^2}{2} = \frac{ESx^2}{2l} = \frac{2\cdot10^{11}\cdot2\cdot10^{-4}\cdot(4\cdot10^{-3})^2}{2\cdot2} = 160\ \text{Дж}` },
      { title: 'Объёмная плотность',
        tex: String.raw`w = \frac{\Pi}{Sl} = \frac{160}{2\cdot10^{-4}\cdot2} = 4\cdot10^5\ \text{Дж/м}^3` },
    ],
    answer: [String.raw`\Pi = \frac{ESx^2}{2l} = 160\ \text{Дж}`, String.raw`w = \Pi/(Sl) = 0{,}4\ \text{МДж/м}^3`],
    note: TYPO + String.raw`В книге формула $\Pi = \frac{ES}{l}\left(\frac x2\right)^2$ — по ней выходит 80 Дж. Число 160 Дж в книге верное, оно получается из $\Pi = \frac{ES}{2l}x^2$.`,
  },

  /* ===================== 4.61 ===================== */
  {
    id: '4.61', chapter: CH, section: S3, page: '91',
    title: 'Энергия стержня по силе',
    given: [[String.raw`l = 2\ \text{м}`, ''], [String.raw`S = 2\ \text{см}^2`, String.raw`2\cdot10^{-4}\ \text{м}^2`], [String.raw`F = 10\ \text{кН}`, String.raw`10^4\ \text{Н}`], [String.raw`E = 200\ \text{ГПа}`, String.raw`2\cdot10^{11}\ \text{Па}`]],
    find: String.raw`\Pi,\ w \;—\; ?`,
    formulas: [SPRING, WSPR, WVOL],
    steps: [
      { title: 'Удлинение и энергия',
        tex: String.raw`x = \frac{Fl}{ES};\quad \Pi = \frac{Fx}{2} = \frac{F^2l}{2ES} = \frac{10^8\cdot2}{2\cdot2\cdot10^{11}\cdot2\cdot10^{-4}} = 2{,}5\ \text{Дж}` },
      { title: 'Объёмная плотность',
        tex: String.raw`w = \frac{\Pi}{Sl} = \frac{2{,}5}{4\cdot10^{-4}} = 6{,}25\cdot10^3\ \text{Дж/м}^3` },
    ],
    answer: [String.raw`\Pi = \frac{F^2l}{2ES} = 2{,}5\ \text{Дж}`, String.raw`w = 6{,}25\ \text{кДж/м}^3`],
  },

  /* ===================== 4.62 ===================== */
  {
    id: '4.62', chapter: CH, section: S3, page: '91',
    title: 'Энергия двух параллельных пружин',
    given: [[String.raw`k_1 = 1\ \text{кН/м}`, ''], [String.raw`k_2 = 3\ \text{кН/м}`, ''], [String.raw`x = 5\ \text{см}`, String.raw`0{,}05\ \text{м}`]],
    find: String.raw`\Pi \;—\; ?`,
    formulas: [WSPR],
    steps: [
      { title: 'Жёсткости складываются',
        tex: String.raw`\Pi = \frac{(k_1 + k_2)x^2}{2} = \frac{4\cdot10^3\cdot0{,}05^2}{2} = 5\ \text{Дж}` },
    ],
    answer: [String.raw`\Pi = \tfrac12(k_1 + k_2)x^2 = 5\ \text{Дж}`],
  },

  /* ===================== 4.63 ===================== */
  {
    id: '4.63', chapter: CH, section: S3, page: '91',
    title: 'Шарик из пружинного пистолета',
    given: [[String.raw`m = 10\ \text{г}`, String.raw`0{,}01\ \text{кг}`], [String.raw`x = 5\ \text{см}`, String.raw`0{,}05\ \text{м}`], [String.raw`k = 200\ \text{Н/м}`, '']],
    find: String.raw`v \;—\; ?`,
    formulas: [WSPR],
    steps: [
      { title: 'Энергия пружины → кинетическая энергия шарика',
        tex: String.raw`\frac{kx^2}{2} = \frac{mv^2}{2}\ \Rightarrow\ v = x\sqrt{\frac km} = 0{,}05\cdot\sqrt{\frac{200}{0{,}01}} = 7{,}07\ \text{м/с}` },
    ],
    answer: [String.raw`v = x\sqrt{k/m} = 7{,}07\ \text{м/с}`],
  },

  /* ===================== 4.64 ===================== */
  {
    id: '4.64', chapter: CH, section: S3, page: '91',
    title: 'Стрела из пружинного ружья',
    given: [[String.raw`x_1 = 20\ \text{см}`, String.raw`0{,}2\ \text{м}`], [String.raw`x_2 = 30\ \text{см}`, String.raw`0{,}3\ \text{м}`], [String.raw`m = 50\ \text{г}`, String.raw`0{,}05\ \text{кг}`], [String.raw`k = 120\ \text{Н/м}`, '']],
    find: String.raw`v \;—\; ?`,
    formulas: [WSPR],
    steps: [
      { title: 'Сжатие до и после выстрела',
        text: 'Перед выстрелом пружина сжата на x₁ + x₂ = 50 см; распрямляясь, она возвращается к начальному сжатию x₁ = 20 см (пружина и без стрелы стоит сжатой).' },
      { title: 'Энергия, отданная стреле',
        tex: String.raw`\frac{mv^2}{2} = \frac k2\left[(x_1 + x_2)^2 - x_1^2\right]\ \Rightarrow\ v = \sqrt{\frac km\left[(x_1 + x_2)^2 - x_1^2\right]}` },
      { title: 'Считаем',
        tex: String.raw`v = \sqrt{\frac{120}{0{,}05}\cdot(0{,}25 - 0{,}04)} = \sqrt{504} = 22{,}4\ \text{м/с}` },
    ],
    answer: [String.raw`v = \sqrt{\frac km\left[(x_1 + x_2)^2 - x_1^2\right]} = 22{,}4\ \text{м/с}`],
    note: TYPO + String.raw`В книге $v = \sqrt{(k/m)(x_2^2 - x_1^2)} = 22{,}5$ м/с. Число получается, только если под $x_2$ понимать полное сжатие 50 см (с $x_2 = 30$ см вышло бы 11 м/с): $\sqrt{2400\cdot0{,}21} = 22{,}45$ м/с.`,
  },

  /* ===================== 4.65 ===================== */
  {
    id: '4.65', chapter: CH, section: S3, page: '91',
    title: 'Вагон налетает на буфер',
    given: [[String.raw`m = 12\ \text{т}`, String.raw`1{,}2\cdot10^4\ \text{кг}`], [String.raw`v = 1\ \text{м/с}`, ''], [String.raw`x = 10\ \text{см}`, String.raw`0{,}1\ \text{м}`]],
    find: String.raw`k \;—\; ?`,
    formulas: [WSPR],
    steps: [
      { title: 'Кинетическая энергия вагона уходит в пружину',
        tex: String.raw`\frac{mv^2}{2} = \frac{kx^2}{2}\ \Rightarrow\ k = \frac{mv^2}{x^2} = \frac{1{,}2\cdot10^4\cdot1^2}{0{,}1^2} = 1{,}2\cdot10^6\ \text{Н/м}` },
    ],
    answer: [String.raw`k = mv^2/x^2 = 1{,}2\ \text{МН/м}`],
  },

  /* ===================== 4.66 ===================== */
  {
    id: '4.66', chapter: CH, section: S3, page: '91',
    title: 'Плотность энергии при σ = 300 МПа',
    given: [[String.raw`\sigma = 300\ \text{МПа}`, String.raw`3\cdot10^8\ \text{Па}`], [String.raw`E = 200\ \text{ГПа}`, String.raw`2\cdot10^{11}\ \text{Па}`]],
    find: String.raw`w \;—\; ?`,
    formulas: [WVOL],
    steps: [
      { title: 'Через напряжение',
        tex: String.raw`w = \frac{\sigma^2}{2E} = \frac{(3\cdot10^8)^2}{2\cdot2\cdot10^{11}} = 2{,}25\cdot10^5\ \text{Дж/м}^3` },
    ],
    answer: [String.raw`w = \sigma^2/(2E) = 225\ \text{кДж/м}^3`],
  },

  /* ===================== 4.67 ===================== */
  {
    id: '4.67', chapter: CH, section: S3, page: '91',
    title: 'Удар груза об упор на стержне',
    given: [[String.raw`l = 2\ \text{м}`, ''], [String.raw`S = 10\ \text{мм}^2`, String.raw`10^{-5}\ \text{м}^2`], [String.raw`m = 10\ \text{кг}`, ''], [String.raw`h = 10\ \text{см}`, String.raw`0{,}1\ \text{м}`], [String.raw`E = 200\ \text{ГПа}`, String.raw`2\cdot10^{11}\ \text{Па}`]],
    find: String.raw`x,\ \sigma \;—\; ?`,
    formulas: [SPRING, WSPR, HOOKE],
    steps: [
      { title: 'Жёсткость стержня',
        tex: String.raw`k = \frac{ES}{l} = \frac{2\cdot10^{11}\cdot10^{-5}}{2} = 10^6\ \text{Н/м}` },
      { title: 'Энергия',
        text: 'Груз опускается на h + x; в нижней точке он останавливается, и вся убыль потенциальной энергии — в энергии растянутого стержня.',
        tex: String.raw`mg(h + x) = \frac{kx^2}{2}\ \Rightarrow\ x = \frac{mg + \sqrt{(mg)^2 + 2kmgh}}{k}` },
      { title: '1) Удлинение',
        tex: String.raw`x = \frac{98{,}1 + \sqrt{98{,}1^2 + 2\cdot10^6\cdot98{,}1\cdot0{,}1}}{10^6} = \frac{98{,}1 + 4431}{10^6} = 4{,}53\cdot10^{-3}\ \text{м}` },
      { title: '2) Напряжение',
        tex: String.raw`\sigma = E\frac xl = 2\cdot10^{11}\cdot\frac{4{,}53\cdot10^{-3}}{2} = 4{,}53\cdot10^8\ \text{Па}` },
    ],
    answer: [String.raw`x = 4{,}53\ \text{мм}`, String.raw`\sigma = 453\ \text{МПа}`],
    note: TYPO + String.raw`В книге «4,53 мм; 2) 453 мН/м²»: пропущено «1)», а в единице напряжения вместо «МН/м²» (мега) напечатано «мН/м²» (милли). Верно 453 МН/м² $= 453$ МПа.`,
  },

  );
})();
