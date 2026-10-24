/* Чертежи к задачам (SVG). Цвета берутся из CSS: .ln — линии, .ax — оси, .tx — подписи, .fl — заливка. */
window.FIG = (function () {
  const T = (x, y, s, cls = 'tx', extra = '') =>
    `<text x="${x}" y="${y}" class="${cls}" ${extra}>${s}</text>`;
  const arrowDefs = `
    <defs>
      <marker id="ar" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
        <path d="M0,1 L10,5 L0,9 z" class="arh"/>
      </marker>
      <marker id="arb" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
        <path d="M0,1 L10,5 L0,9 z" class="arh blue"/>
      </marker>
    </defs>`;
  const dim = (x1, y1, x2, y2) =>
    `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" class="dim" marker-start="url(#ar)" marker-end="url(#ar)"/>`;
  // у каждого чертежа свои id стрелок: иначе url(#ar) ссылается на первый чертёж на странице,
  // и если тот скрыт, стрелки пропадают у всех
  let uid = 0;
  const svg = (w, h, body) => {
    const k = ++uid;
    return `<svg viewBox="0 0 ${w} ${h}" xmlns="http://www.w3.org/2000/svg" role="img">` +
      arrowDefs.replace(/id="(arb?)"/g, `id="$1-${k}"`) + body.replace(/url\(#(arb?)\)/g, `url(#$1-${k})`) + '</svg>';
  };

  /* ---------- 3.13 кольцо, ось в плоскости через центр ---------- */
  function ringInPlane() {
    return svg(300, 200, `
      <ellipse cx="150" cy="100" rx="95" ry="34" class="ln ring"/>
      <line x1="150" y1="18" x2="150" y2="182" class="ax"/>
      ${T(158, 26, 'O')}${T(158, 186, 'O′')}
      <circle cx="150" cy="100" r="3" class="pt"/>
      <line x1="150" y1="100" x2="245" y2="100" class="dim" marker-end="url(#ar)"/>
      ${T(190, 94, 'R', 'tx it')}
      ${T(40, 186, 'ось лежит в плоскости кольца', 'tx sm mut')}
    `);
  }

  /* ---------- 3.14 кольцо, касательная ось ---------- */
  function ringTangent() {
    return svg(300, 210, `
      <circle cx="150" cy="105" r="72" class="ln ring"/>
      <line x1="222" y1="14" x2="222" y2="196" class="ax"/>
      ${T(230, 24, 'O')}${T(230, 196, 'O′')}
      <line x1="150" y1="14" x2="150" y2="196" class="ax faint"/>
      ${T(112, 24, 'C', 'tx mut')}
      <circle cx="150" cy="105" r="3" class="pt"/>
      ${dim(150, 160, 222, 160)}${T(180, 154, 'R', 'tx it')}
      ${T(24, 205, 'пунктир — ось через центр (∥ касательной)', 'tx sm mut')}
    `);
  }

  /* ---------- 3.15 диск, ось через середину радиуса ---------- */
  function diskHalfR() {
    return svg(300, 210, `
      <circle cx="140" cy="105" r="85" class="ln disk"/>
      <circle cx="140" cy="105" r="3" class="pt"/>${T(118, 100, 'C')}
      <line x1="140" y1="105" x2="225" y2="105" class="dim" marker-end="url(#ar)"/>
      ${T(200, 98, 'R', 'tx it')}
      <circle cx="182.5" cy="105" r="7" class="axdot"/><circle cx="182.5" cy="105" r="2" class="pt"/>
      ${T(176, 128, 'O', 'tx ax-t')}
      ${dim(140, 150, 182.5, 150)}${T(148, 168, 'R/2', 'tx it sm')}
      ${T(30, 205, 'ось ⊥ плоскости диска (вид сверху)', 'tx sm mut')}
    `);
  }

  /* ---------- 3.17 прямоугольная пластина ---------- */
  function plate() {
    return svg(300, 200, `
      <rect x="70" y="40" width="170" height="110" class="ln plate"/>
      <line x1="70" y1="14" x2="70" y2="178" class="ax"/>
      ${T(46, 26, 'O')}${T(46, 178, 'O′')}
      ${dim(70, 166, 240, 166)}${T(150, 186, 'a', 'tx it')}
      <line x1="140" y1="40" x2="140" y2="150" class="strip"/>
      <line x1="150" y1="40" x2="150" y2="150" class="strip"/>
      ${dim(70, 30, 140, 30)}${T(100, 24, 'x', 'tx it sm')}
      ${T(154, 100, 'dx', 'tx it sm')}
    `);
  }

  /* ================= § 1. Кинематика ================= */
  const num = v => String(+v.toFixed(3)).replace('.', ',');
  const arrow = (x1, y1, x2, y2, cls = 'vec') =>
    `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" class="${cls}" marker-end="url(#${cls.includes('blue') ? 'arb' : 'ar'})"/>`;
  const P = (x, y) => `<circle cx="${x}" cy="${y}" r="3.5" class="pt"/>`;

  /* ---------- график по точкам или функции ----------
     o = { x:[x0,x1], y:[y0,y1], xt:[деления], yt:[деления], xl:'t, с', yl:'v, м/с',
           s:[{ f, t:[от,до], param, pts, dash, blue, label:[x,y,'текст',доп] }],
           guides:[[x,y]] — пунктир от точки к осям, dots:[[x,y]], txt:[[x,y,'текст',cls,доп]],
           arrows:[[x1,y1,x2,y2,blue]] — стрелка (вектор амплитуды, направление движения) } */
  function graph(o) {
    const W = o.w || 320, H = o.h || 190, L = 44, R = 22, Tp = 24, B = 26;
    const [x0, x1] = o.x, [y0, y1] = o.y;
    const X = v => +(L + (v - x0) / (x1 - x0) * (W - L - R)).toFixed(1);
    const Y = v => +(Tp + (y1 - v) / (y1 - y0) * (H - Tp - B)).toFixed(1);
    const ya = Y(Math.min(Math.max(0, y0), y1)), xa = X(Math.min(Math.max(0, x0), x1));
    let b = `<line x1="${X(x0)}" y1="${ya}" x2="${W - 6}" y2="${ya}" class="axis" marker-end="url(#ar)"/>
      <line x1="${xa}" y1="${Y(y0)}" x2="${xa}" y2="6" class="axis" marker-end="url(#ar)"/>`;
    (o.xt || []).forEach(t => {
      b += `<line x1="${X(t)}" y1="${ya - 3}" x2="${X(t)}" y2="${ya + 3}" class="axis"/>` +
        T(X(t), ya + 15, num(t), 'tx sm', 'text-anchor="middle"');
    });
    (o.yt || []).forEach(t => {
      b += `<line x1="${xa - 3}" y1="${Y(t)}" x2="${xa + 3}" y2="${Y(t)}" class="axis"/>` +
        T(xa - 6, Y(t) + 4, num(t), 'tx sm', 'text-anchor="end"');
    });
    if (x0 <= 0 && y0 <= 0) b += T(xa - 5, ya + 15, '0', 'tx sm', 'text-anchor="end"');
    b += T(W - 4, ya - 8, o.xl || '', 'tx sm', 'text-anchor="end"') + T(xa + 8, 15, o.yl || '', 'tx sm');
    (o.guides || []).forEach(([gx, gy]) => {
      b += `<polyline points="${X(gx)},${ya} ${X(gx)},${Y(gy)} ${xa},${Y(gy)}" class="guide" fill="none"/>`;
    });
    (o.s || []).forEach(s => {
      let pts = s.pts;
      if (s.f) {
        const [a, c] = s.t || [x0, x1], n = s.n || 160;
        pts = [];
        for (let i = 0; i <= n; i++) { const t = a + (c - a) * i / n; pts.push(s.param ? s.f(t) : [t, s.f(t)]); }
      }
      b += `<polyline points="${pts.map(([px, py]) => X(px) + ',' + Y(py)).join(' ')}" class="crv${s.dash ? ' dash' : ''}${s.blue ? ' blue' : ''}"/>`;
      if (s.label) b += T(X(s.label[0]), Y(s.label[1]), s.label[2], 'tx sm' + (s.blue ? ' ax-t' : ''), s.label[3] || '');
    });
    (o.arrows || []).forEach(([ax, ay, bx, by, blue]) => {
      b += `<line x1="${X(ax)}" y1="${Y(ay)}" x2="${X(bx)}" y2="${Y(by)}" class="vec${blue ? ' blue' : ''}" marker-end="url(#${blue ? 'arb' : 'ar'})"/>`;
    });
    (o.dots || []).forEach(([px, py]) => { b += `<circle cx="${X(px)}" cy="${Y(py)}" r="3" class="pt"/>`; });
    (o.txt || []).forEach(([px, py, s, cls, ex]) => { b += T(X(px), Y(py), s, cls || 'tx sm', ex || ''); });
    return svg(W, H, b);
  }

  /* ---------- 1.1 перекрёсток: два варианта ---------- */
  function roads() {
    const d = [Math.cos(Math.PI / 3), -Math.sin(Math.PI / 3)];
    const one = (ox, sgn, ang, cap) => {
      const p = k => [+(ox + sgn * k * d[0]).toFixed(1), +(100 + sgn * k * d[1]).toFixed(1)];
      const [c2x, c2y] = p(55), [e2x, e2y] = p(80), [r2x, r2y] = [ox - 80 * d[0], 100 - 80 * d[1]], [r3x, r3y] = [ox + 80 * d[0], 100 + 80 * d[1]];
      const [ax2, ay2] = sgn > 0 ? [ox + 11, 100 - 19.1] : [ox - 11, 100 + 19.1];
      return `
        <line x1="${ox - 70}" y1="100" x2="${ox + 80}" y2="100" class="guide"/>
        <line x1="${r2x}" y1="${r2y}" x2="${r3x}" y2="${r3y}" class="guide"/>
        ${arrow(ox + 50, 100, ox + 78, 100)}${P(ox + 50, 100)}${T(ox + 56, 118, 'v₁', 'tx it sm')}
        ${arrow(c2x, c2y, e2x, e2y)}${P(c2x, c2y)}${T(c2x + (sgn > 0 ? 10 : -26), c2y + (sgn > 0 ? 6 : 2), 'v₂', 'tx it sm')}
        <line x1="${ox + 50}" y1="100" x2="${c2x}" y2="${c2y}" class="strip" stroke-dasharray="5 4"/>
        <path d="M ${ox + 22} 100 A 22 22 0 0 ${sgn > 0 ? 0 : 1} ${ax2} ${ay2}" class="dim"/>
        ${T(ox + (sgn > 0 ? 24 : 20), sgn > 0 ? 84 : 124, ang, 'tx sm')}
        ${T(ox - 6, 196, cap, 'tx cap')}`;
    };
    return svg(340, 205, one(85, 1, '60°', 'а)') + one(255, -1, '120°', 'б)'));
  }

  /* ---------- дуга s и хорда Δr (1.30, 1.32) ---------- */
  function arcChord(deg) {
    const cx = 150, cy = 112, r = 80, th = deg * Math.PI / 180;
    const ex = +(cx + r * Math.cos(th)).toFixed(1), ey = +(cy - r * Math.sin(th)).toFixed(1);
    const mx = +(cx + (r + 16) * Math.cos(th / 2)).toFixed(1), my = +(cy - (r + 16) * Math.sin(th / 2)).toFixed(1);
    // подпись хорды — между хордой и дугой; для полуокружности (хорда через центр) — под хордой
    const hx = (cx + r + ex) / 2, hy = (cy + ey) / 2, hl = Math.hypot(hx - cx, hy - cy);
    const [dx, dy] = hl > 1 ? [(hx - cx) / hl * 16 - 8, (hy - cy) / hl * 16 + 4] : [12, 18];
    const ax = +(cx + 36 * Math.cos(th / 2) - 4).toFixed(1), ay = +(cy - 36 * Math.sin(th / 2) + 4).toFixed(1);
    return svg(300, 210, `
      <circle cx="${cx}" cy="${cy}" r="${r}" class="guide" fill="none"/>
      <path d="M ${cx + r} ${cy} A ${r} ${r} 0 ${deg > 180 ? 1 : 0} 0 ${ex} ${ey}" class="ln wire"/>
      <line x1="${cx}" y1="${cy}" x2="${cx + r}" y2="${cy}" class="dim"/><line x1="${cx}" y1="${cy}" x2="${ex}" y2="${ey}" class="dim"/>
      ${P(cx, cy)}${T(cx - 22, cy + 18, 'O', 'tx sm')}${T(cx + 40, cy + 16, 'R', 'tx it sm')}
      ${arrow(cx + r, cy, ex, ey, 'vec blue')}${T(+(hx + dx).toFixed(1), +(hy + dy).toFixed(1), 'Δr', 'tx it sm ax-t')}
      ${P(cx + r, cy)}${P(ex, ey)}${T(mx - 4, my, 's', 'tx it')}
      <path d="M ${cx + 22} ${cy} A 22 22 0 ${deg > 180 ? 1 : 0} 0 ${+(cx + 22 * Math.cos(th)).toFixed(1)} ${+(cy - 22 * Math.sin(th)).toFixed(1)}" class="dim"/>
      ${T(ax, ay, 'α', 'tx it sm')}`);
  }

  /* ---------- a_τ, a_n и полное a в точке траектории (1.29, 1.33, 1.34) ---------- */
  function accel(aT = 70, aN = 46, showPhi = false) {
    const px = 120, py = 50;
    return svg(300, 150, `
      <path d="M 20 102 A 175 175 0 0 1 280 102" class="ln"/>
      ${arrow(px, py, px + aT, py)}${T(px + aT - 6, py - 8, 'a', 'tx it sm')}${T(px + aT + 2, py - 4, 'τ', 'tx sm')}
      ${arrow(px, py, px, py + aN)}${T(px - 24, py + aN, 'a', 'tx it sm')}${T(px - 14, py + aN + 4, 'n', 'tx sm')}
      ${arrow(px, py, px + aT, py + aN, 'vec blue')}${T(px + aT + 4, py + aN + 8, 'a', 'tx it ax-t')}
      <polyline points="${px + aT},${py} ${px + aT},${py + aN} ${px},${py + aN}" class="guide" fill="none"/>
      ${P(px, py)}
      ${showPhi ? `<path d="M ${px} ${py + 26} A 26 26 0 0 0 ${+(px + 26 * Math.sin(Math.atan(aT / aN))).toFixed(1)} ${+(py + 26 * Math.cos(Math.atan(aT / aN))).toFixed(1)}" class="dim"/>${T(px + 6, py + 40, 'φ', 'tx it sm')}` : ''}
      ${T(150, 142, 'к центру кривизны ↓', 'tx sm mut', 'text-anchor="middle"')}`);
  }

  /* ---------- разложение g на a_τ и a_n (1.48, 1.49) ---------- */
  function gSplit(beta, up) {
    const px = 100, py = 70, G = 74, b = beta * Math.PI / 180;
    const u = [Math.cos(b), up ? -Math.sin(b) : Math.sin(b)];
    const k = G * u[1];                               // проекция g на направление v
    const tx = +(px + k * u[0]).toFixed(1), ty = +(py + k * u[1]).toFixed(1);
    const vx = +(px + 110 * u[0]).toFixed(1), vy = +(py + 110 * u[1]).toFixed(1);
    const nx = +(px - k * u[0]).toFixed(1), ny = +(py + G - k * u[1]).toFixed(1);   // a_n = g − a_τ
    return svg(300, 170, `
      ${arrow(px, py, vx, vy)}${T(vx - 4, vy + (up ? -6 : 18), 'v', 'tx it')}
      <line x1="${px - 70}" y1="${py}" x2="${px + 160}" y2="${py}" class="guide"/>
      <path d="M ${px + 36} ${py} A 36 36 0 0 ${up ? 0 : 1} ${+(px + 36 * u[0]).toFixed(1)} ${+(py + 36 * u[1]).toFixed(1)}" class="dim"/>${T(px + 40, py + (up ? -6 : 18), 'β', 'tx it sm')}
      ${arrow(px, py, px, py + G, 'vec blue')}${T(px - 18, py + G, 'g', 'tx it ax-t')}
      ${arrow(px, py, tx, ty)}${T(tx + (up ? -24 : 4), ty + (up ? 14 : 16), 'a', 'tx it sm')}${T(tx + (up ? -14 : 14), ty + (up ? 18 : 20), 'τ', 'tx sm')}
      ${arrow(px, py, nx, ny)}${T(nx - 22, ny + 4, 'a', 'tx it sm')}${T(nx - 12, ny + 8, 'n', 'tx sm')}
      <polyline points="${tx},${ty} ${px},${py + G} ${nx},${ny}" class="guide" fill="none"/>
      ${P(px, py)}`);
  }

  /* ---------- сумма двух перпендикулярных векторов (1.40, 1.60) ---------- */
  function vec2(a, b, la, lb, lc, down) {
    const px = 60, py = down ? 30 : 140, s = down ? 1 : -1;
    return svg(300, 170, `
      ${arrow(px, py, px + a, py)}${T(px + a / 2 - 8, py + (down ? -8 : 18), la, 'tx it sm')}
      ${arrow(px, py, px, py + s * b)}${T(px - 8, py + s * b / 2, lb, 'tx it sm', 'text-anchor="end"')}
      ${arrow(px, py, px + a, py + s * b, 'vec blue')}${T(px + a + 6, py + s * b + (down ? 4 : 10), lc, 'tx it ax-t')}
      <polyline points="${px + a},${py} ${px + a},${py + s * b} ${px},${py + s * b}" class="guide" fill="none"/>
      ${P(px, py)}`);
  }

  /* ================= § 2. Динамика ================= */
  const hatch = (x1, x2, y, up) => {   // штриховка опоры под линией (или над ней)
    let s = `<line x1="${x1}" y1="${y}" x2="${x2}" y2="${y}" class="ln"/>`;
    for (let x = x1 + 4; x <= x2; x += 10) s += `<line x1="${x}" y1="${y}" x2="${x - 7}" y2="${y + (up ? -7 : 7)}" class="dim"/>`;
    return s;
  };
  const box = (x, y, w, h, lab, cls = 'ln') =>
    `<rect x="${x}" y="${y}" width="${w}" height="${h}" class="${cls}" style="fill:var(--fill)"/>` +
    (lab ? T(x + w / 2, y + h / 2 + 5, lab, 'tx it sm', 'text-anchor="middle"') : '');

  /* ---------- брусок на столе и блок(и) на краю (2.2, 2.5) ---------- */
  function tablePulley(two) {
    if (!two) return svg(300, 190, `
      <rect x="20" y="80" width="214" height="10" class="ln" style="fill:var(--fill)"/>
      <line x1="30" y1="90" x2="30" y2="180" class="ln"/><line x1="220" y1="90" x2="220" y2="180" class="ln"/>
      ${box(100, 50, 64, 30, 'm₁')}
      <line x1="164" y1="65" x2="240" y2="65" class="ln"/>
      <circle cx="240" cy="73" r="8" class="ln" style="fill:var(--card)"/><line x1="234" y1="80" x2="226" y2="88" class="ln"/>
      <line x1="248" y1="73" x2="248" y2="128" class="ln"/>${box(236, 128, 24, 30, 'm₂')}
      ${arrow(110, 40, 150, 40)}${T(152, 44, 'a', 'tx it sm')}${arrow(272, 132, 272, 166)}${T(278, 154, 'a', 'tx it sm')}
      ${T(198, 58, 'T', 'tx it sm')}${T(254, 112, 'T', 'tx it sm')}`);
    return svg(320, 190, `
      <rect x="44" y="80" width="232" height="10" class="ln" style="fill:var(--fill)"/>
      <line x1="56" y1="90" x2="56" y2="180" class="ln"/><line x1="264" y1="90" x2="264" y2="180" class="ln"/>
      ${box(130, 50, 60, 30, 'm')}
      <line x1="40" y1="65" x2="130" y2="65" class="ln"/><line x1="190" y1="65" x2="280" y2="65" class="ln"/>
      <circle cx="40" cy="73" r="8" class="ln" style="fill:var(--card)"/><circle cx="280" cy="73" r="8" class="ln" style="fill:var(--card)"/>
      <line x1="32" y1="73" x2="32" y2="130" class="ln"/>${box(22, 130, 20, 24, 'm₁')}
      <line x1="288" y1="73" x2="288" y2="120" class="ln"/>${box(276, 120, 24, 34, 'm₂')}
      ${arrow(140, 40, 180, 40)}${T(182, 44, 'a', 'tx it sm')}
      ${T(80, 58, 'T₁', 'tx it sm')}${T(228, 58, 'T₂', 'tx it sm')}`);
  }

  /* ---------- блок на пружинных весах (2.3) ---------- */
  function atwood() {
    return svg(240, 230, `
      ${hatch(60, 180, 12, true)}
      <line x1="120" y1="12" x2="120" y2="24" class="ln"/>
      <rect x="104" y="24" width="32" height="36" class="ln" style="fill:var(--card)"/>
      <polyline points="120,28 112,33 128,39 112,45 128,51 120,56" class="dim" fill="none"/>
      ${T(142, 46, 'весы', 'tx sm mut')}
      <line x1="120" y1="60" x2="120" y2="84" class="ln"/>
      <circle cx="120" cy="100" r="18" class="ln" style="fill:var(--card)"/><circle cx="120" cy="100" r="2.5" class="pt"/>
      <line x1="102" y1="100" x2="102" y2="168" class="ln"/>${box(90, 168, 24, 24, 'm₁')}
      <line x1="138" y1="100" x2="138" y2="128" class="ln"/>${box(124, 128, 28, 34, 'm₂')}
      ${arrow(72, 186, 72, 156)}${T(60, 176, 'a', 'tx it sm')}${arrow(172, 132, 172, 162)}${T(178, 152, 'a', 'tx it sm')}
      ${T(84, 140, 'T', 'tx it sm')}${T(144, 120, 'T', 'tx it sm')}`);
  }

  /* ---------- брусок на наклонной плоскости (2.6) ---------- */
  function incline(deg) {
    const a = deg * Math.PI / 180, tg = Math.tan(a), x0 = 30, x1 = 280, yb = 165, yt = +(yb - (x1 - x0) * tg).toFixed(1);
    const px = 150, py = +(yt + (px - x0) * tg).toFixed(1);
    const n = [Math.sin(a), -Math.cos(a)], d = [Math.cos(a), Math.sin(a)];
    const cx = +(px + 13 * n[0]).toFixed(1), cy = +(py + 13 * n[1]).toFixed(1);
    const e = (vx, vy, L) => [+(cx + vx * L).toFixed(1), +(cy + vy * L).toFixed(1)];
    const [nx, ny] = e(n[0], n[1], 52), [fx, fy] = e(-d[0], -d[1], 36), [vx, vy] = e(d[0], d[1], 48);
    return svg(300, 185, `
      <polygon points="${x0},${yt} ${x0},${yb} ${x1},${yb}" class="ln" style="fill:var(--fill)"/>
      <rect x="-22" y="-13" width="44" height="26" class="ln" style="fill:var(--card)" transform="translate(${cx},${cy}) rotate(${deg})"/>
      ${arrow(cx, cy, cx, cy + 58, 'vec blue')}${T(cx + 4, cy + 60, 'mg', 'tx it sm ax-t')}
      ${arrow(cx, cy, nx, ny)}${T(nx + 4, ny, 'N', 'tx it sm')}
      ${arrow(cx, cy, fx, fy)}${T(fx - 26, fy - 2, 'F', 'tx it sm')}${T(fx - 16, fy + 2, 'тр', 'tx sm')}
      <line x1="${cx}" y1="${cy}" x2="${vx}" y2="${vy}" class="guide" marker-end="url(#ar)"/>${T(vx - 6, vy + 16, 'a', 'tx it sm')}
      <path d="M ${x1 - 40} ${yb} A 40 40 0 0 0 ${+(x1 - 40 * Math.cos(a)).toFixed(1)} ${+(yb - 40 * Math.sin(a)).toFixed(1)}" class="dim"/>
      ${T(x1 - 62, yb - 6, 'α', 'tx it sm')}`);
  }

  /* ---------- два бруска друг на друге (2.18, 2.19) ---------- */
  function blocks2(low, up, on, muBetween, muGround) {
    const fy = on === 'low' ? 125 : 95, fx = on === 'low' ? 230 : 190;
    return svg(300, 170, `
      ${hatch(20, 280, 140)}
      ${box(70, 110, 160, 30, low)}${box(110, 80, 80, 30, up)}
      ${arrow(fx, fy, fx + 52, fy)}${T(fx + 54, fy + 5, 'F', 'tx it')}
      ${T(196, 106, muBetween, 'tx it sm')}${muGround ? T(236, 156, muGround, 'tx it sm') : T(24, 160, 'без трения', 'tx sm mut')}`);
  }

  /* ---------- цистерна с жидкостью при разгоне (2.23, 2.24) ---------- */
  function tank() {
    // разгон вперёд (вправо): жидкость поднимается у заднего (левого) края
    const tilt = 10 * Math.PI / 180, cx = 150, cy = 100, k = Math.tan(tilt);
    const yl = +(cy - 110 * k).toFixed(1), yr = +(cy + 110 * k).toFixed(1);
    return svg(320, 185, `
      <rect x="40" y="50" width="220" height="100" rx="14" class="ln" fill="none"/>
      <path d="M 40 ${yl} L 260 ${yr} L 260 136 A 14 14 0 0 1 246 150 L 54 150 A 14 14 0 0 1 40 136 Z" class="ln" style="fill:var(--fill)"/>
      <line x1="40" y1="${cy}" x2="260" y2="${cy}" class="guide"/>
      <path d="M ${cx + 50} ${cy} A 50 50 0 0 1 ${+(cx + 50 * Math.cos(tilt)).toFixed(1)} ${+(cy + 50 * Math.sin(tilt)).toFixed(1)}" class="dim"/>${T(cx + 54, cy + 18, 'φ', 'tx it sm')}
      ${arrow(200, 30, 260, 30)}${T(232, 24, 'a', 'tx it')}
      ${dim(40, 168, 260, 168)}${T(148, 182, 'l', 'tx it sm')}
      <line x1="40" y1="${yl}" x2="284" y2="${yl}" class="guide"/>
      ${dim(278, yl, 278, yr)}${T(284, cy + 4, 'Δl', 'tx it sm')}
      ${T(44, 44, 'зад', 'tx sm mut')}${T(222, 44, 'перёд', 'tx sm mut')}`);
  }

  /* ---------- конический маятник (2.46, 2.47) ---------- */
  function conical() {
    const px = 150, py = 18, L = 120, a = 48 * Math.PI / 180;
    const bx = +(px + L * Math.sin(a)).toFixed(1), by = +(py + L * Math.cos(a)).toFixed(1);
    const ux = (px - bx) / L, uy = (py - by) / L;
    return svg(300, 190, `
      ${hatch(100, 200, py, true)}
      <line x1="${px}" y1="${py}" x2="${px}" y2="${by + 30}" class="ax"/>
      <ellipse cx="${px}" cy="${by}" rx="${bx - px}" ry="16" class="guide" fill="none"/>
      <line x1="${px}" y1="${py}" x2="${bx}" y2="${by}" class="ln"/>
      <line x1="${px}" y1="${by}" x2="${bx}" y2="${by}" class="guide"/>${T((px + bx) / 2 - 4, by - 6, 'r', 'tx it sm')}
      <circle cx="${bx}" cy="${by}" r="7" class="ln ball"/>
      ${T(px + 38, py + 56, 'l', 'tx it sm')}
      <path d="M ${px} ${py + 30} A 30 30 0 0 0 ${+(px + 30 * Math.sin(a)).toFixed(1)} ${+(py + 30 * Math.cos(a)).toFixed(1)}" class="dim"/>${T(px + 6, py + 48, 'φ', 'tx it sm')}
      ${arrow(bx, by, +(bx + 52 * ux).toFixed(1), +(by + 52 * uy).toFixed(1))}${T(bx - 22, by - 38, 'T', 'tx it sm')}
      ${arrow(bx, by, bx, by + 48, 'vec blue')}${T(bx + 6, by + 44, 'mg', 'tx it sm ax-t')}`);
  }

  /* ---------- наклон велосипедиста на повороте (2.53) ---------- */
  function lean(deg) {
    const a = deg * Math.PI / 180, cx = 170, cy = 160, L = 120;
    const tx = +(cx - L * Math.sin(a)).toFixed(1), ty = +(cy - L * Math.cos(a)).toFixed(1);
    const mx = +(cx - 0.6 * L * Math.sin(a)).toFixed(1), my = +(cy - 0.6 * L * Math.cos(a)).toFixed(1);
    const N = 90, F = +(N * Math.tan(a)).toFixed(1);
    return svg(300, 185, `
      ${hatch(20, 290, cy)}
      <line x1="${cx}" y1="${cy}" x2="${tx}" y2="${ty}" class="ln rod"/>
      <line x1="${cx}" y1="${cy}" x2="${cx}" y2="${cy - L}" class="guide"/>
      <path d="M ${cx} ${cy - 44} A 44 44 0 0 0 ${+(cx - 44 * Math.sin(a)).toFixed(1)} ${+(cy - 44 * Math.cos(a)).toFixed(1)}" class="dim"/>${T(cx - 18, cy - 50, 'φ', 'tx it sm')}
      <circle cx="${mx}" cy="${my}" r="4" class="pt"/>${T(mx - 18, my - 8, 'C', 'tx sm')}
      ${arrow(mx, my, mx, my + 50, 'vec blue')}${T(mx - 26, my + 46, 'mg', 'tx it sm ax-t')}
      ${arrow(cx, cy, cx, cy - N)}${T(cx + 6, cy - N + 8, 'N', 'tx it sm')}
      ${arrow(cx, cy, cx - F, cy)}${T(cx - F - 4, cy + 18, 'F', 'tx it sm')}${T(cx - F + 6, cy + 22, 'тр', 'tx sm')}
      ${T(16, 20, '← к центру поворота', 'tx sm mut')}`);
  }

  /* ---------- вираж самолёта (2.54) ---------- */
  function bank(deg) {
    const a = deg * Math.PI / 180, cx = 160, cy = 100, L = 96;
    const w = [Math.cos(a), -Math.sin(a)], f = [-Math.sin(a), -Math.cos(a)];
    const p = (v, k) => [+(cx + v[0] * k).toFixed(1), +(cy + v[1] * k).toFixed(1)];
    const [w1x, w1y] = p(w, -70), [w2x, w2y] = p(w, 70), [fx, fy] = p(f, L);
    const gy = +(cy + L * Math.cos(a)).toFixed(1), hx = +(cx - L * Math.sin(a)).toFixed(1);
    return svg(300, 210, `
      <line x1="${w1x}" y1="${w1y}" x2="${w2x}" y2="${w2y}" class="ln rod"/><circle cx="${cx}" cy="${cy}" r="7" class="ln" style="fill:var(--card)"/>
      ${arrow(cx, cy, fx, fy)}${T(fx - 4, fy - 6, 'F', 'tx it sm')}
      ${arrow(cx, cy, cx, gy, 'vec blue')}${T(cx + 6, gy, 'mg', 'tx it sm ax-t')}
      <line x1="${cx}" y1="${cy}" x2="${hx}" y2="${cy}" class="guide" marker-end="url(#ar)"/>${T(hx - 4, cy + 18, 'ma', 'tx it sm')}${T(hx - 6, cy + 32, 'к центру', 'tx sm mut')}
      <line x1="${cx}" y1="${cy}" x2="${cx}" y2="${cy - 60}" class="guide"/>
      <path d="M ${cx} ${cy - 40} A 40 40 0 0 0 ${+(cx - 40 * Math.sin(a)).toFixed(1)} ${+(cy - 40 * Math.cos(a)).toFixed(1)}" class="dim"/>${T(cx - 22, cy - 44, 'φ', 'tx it sm')}`);
  }

  /* ---------- упругое столкновение одинаковых шаров (2.91) ---------- */
  function collision2(al) {
    const a = al * Math.PI / 180, cx = 130, cy = 100;
    const u1 = [+(cx + 100 * Math.cos(a) * Math.cos(a)).toFixed(1), +(cy - 100 * Math.cos(a) * Math.sin(a)).toFixed(1)];
    const u2 = [+(cx + 100 * Math.sin(a) * Math.sin(a)).toFixed(1), +(cy + 100 * Math.sin(a) * Math.cos(a)).toFixed(1)];
    return svg(300, 170, `
      ${arrow(24, cy, cx - 12, cy)}${T(60, cy - 8, 'v₁', 'tx it sm')}
      <line x1="${cx}" y1="${cy}" x2="${cx + 120}" y2="${cy}" class="guide"/>
      <circle cx="${cx}" cy="${cy}" r="10" class="ln ball"/>
      ${arrow(cx, cy, u1[0], u1[1])}${T(u1[0] + 4, u1[1] - 4, 'u₁', 'tx it sm')}
      ${arrow(cx, cy, u2[0], u2[1], 'vec blue')}${T(u2[0] + 4, u2[1] + 12, 'u₂', 'tx it sm ax-t')}
      <path d="M ${cx + 44} ${cy} A 44 44 0 0 0 ${+(cx + 44 * Math.cos(a)).toFixed(1)} ${+(cy - 44 * Math.sin(a)).toFixed(1)}" class="dim"/>${T(cx + 50, cy - 8, 'α', 'tx it sm')}
      <path d="M ${cx + 34} ${cy} A 34 34 0 0 1 ${+(cx + 34 * Math.sin(a)).toFixed(1)} ${+(cy + 34 * Math.cos(a)).toFixed(1)}" class="dim"/>${T(cx + 36, cy + 26, 'β', 'tx it sm')}`);
  }

  return { ringInPlane, ringTangent, diskHalfR, plate,
    graph, roads, arcChord, accel, gSplit, vec2,
    tablePulley, atwood, incline, blocks2, tank, conical, lean, bank, collision2 };
})();
