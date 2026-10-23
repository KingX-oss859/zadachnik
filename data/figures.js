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

  /* ---------- 3.11 проволочный треугольник ---------- */
  function triangle() {
    const a = 110, h = a * Math.sqrt(3) / 2;
    // а) вершина вверху, ось через вершину параллельно основанию
    const ax = 30, ay = 40;
    const A = [ax + a / 2, ay], B = [ax, ay + h], C = [ax + a, ay + h];
    // б) перевёрнутый, ось по верхней стороне
    const bx = 200, by = 40;
    const D = [bx, by], E = [bx + a, by], F = [bx + a / 2, by + h];
    return svg(340, 210, `
      <line x1="${ax - 18}" y1="${ay}" x2="${ax + a + 18}" y2="${ay}" class="ax"/>
      ${T(ax - 20, ay - 8, 'O')}${T(ax + a + 8, ay - 8, 'O′')}
      <polygon points="${A} ${B} ${C}" class="ln wire"/>
      ${dim(B[0], B[1] + 16, C[0], C[1] + 16)}${T(ax + a / 2 - 4, B[1] + 34, 'a', 'tx it')}
      ${T(ax + a / 2 - 4, 202, 'а)', 'tx cap')}
      <line x1="${bx - 18}" y1="${by}" x2="${bx + a + 18}" y2="${by}" class="ax"/>
      ${T(bx - 20, by - 8, 'O')}${T(bx + a + 8, by - 8, 'O′')}
      <polygon points="${D} ${E} ${F}" class="ln wire"/>
      ${T(bx + a / 2 - 4, by + 18, 'a', 'tx it')}
      ${T(bx + a / 2 - 4, 202, 'б)', 'tx cap')}
    `);
  }

  /* ---------- 3.12 стержень с шариками, 5 случаев ---------- */
  function rods(only) {
    const cases = [
      { k: 'а', f: 0, lab: '' },
      { k: 'б', f: 1 / 3, lab: 'l/3', from: 'top' },
      { k: 'в', f: 1 / 2, lab: 'l/2', from: 'top' },
      { k: 'г', f: 2 / 3, lab: 'l/3', from: 'bot' },
      { k: 'д', f: 3 / 4, lab: 'l/4', from: 'bot' },
    ];
    const list = only ? cases.filter(c => c.k === only) : cases;
    const step = 68, top = 34, len = 190, W = list.length * step + 20;
    let body = '';
    list.forEach((c, i) => {
      const x = 36 + i * step, yO = top + len * c.f, yb = top + len;
      body += `
        <line x1="${x}" y1="${top}" x2="${x}" y2="${yb}" class="ln rod"/>
        <circle cx="${x}" cy="${top}" r="6" class="ln ball"/>
        <circle cx="${x}" cy="${yb}" r="9" class="ln ball"/>
        ${T(x - 5, top - 13, 'm', 'tx it')}
        ${T(x - 11, yb + 26, '2m', 'tx it')}
        <circle cx="${x}" cy="${yO}" r="3.6" class="pt"/>
        ${T(x - 20, yO + 5, 'O', 'tx ax-t')}
        ${T(x - 4, yb + 48, c.k + ')', 'tx cap')}`;
      if (c.from === 'top') {
        body += dim(x + 16, top, x + 16, yO) + T(x + 20, (top + yO) / 2 + 4, c.lab, 'tx it sm');
      } else if (c.from === 'bot') {
        body += dim(x + 16, yO, x + 16, yb) + T(x + 20, (yO + yb) / 2 + 4, c.lab, 'tx it sm');
      } else {
        body += dim(x + 16, top, x + 16, yb) + T(x + 20, (top + yb) / 2 + 4, 'l', 'tx it sm');
      }
    });
    body = `<line x1="10" y1="${top}" x2="${W - 6}" y2="${top}" class="guide"/>
            <line x1="10" y1="${top + len}" x2="${W - 6}" y2="${top + len}" class="guide"/>` + body;
    return svg(W, 290, body);
  }

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

  /* ---------- 3.16 диск с отверстием ---------- */
  function diskHole() {
    const cx = 140, cy = 112, r = 90, l = 45, rh = 30;
    return svg(300, 230, `
      <circle cx="${cx}" cy="${cy}" r="${r}" class="ln disk"/>
      <circle cx="${cx}" cy="${cy - l}" r="${rh}" class="ln hole"/>
      <circle cx="${cx}" cy="${cy}" r="3" class="pt"/>${T(cx - 20, cy + 5, 'O', 'tx ax-t')}
      <circle cx="${cx}" cy="${cy - l}" r="3" class="pt"/>${T(cx - 22, cy - l + 5, 'O₁')}
      ${dim(cx + 40, cy - l, cx + 40, cy)}${T(cx + 46, cy - l / 2 + 4, 'l', 'tx it')}
      ${dim(cx - rh, cy - l - rh - 10, cx + rh, cy - l - rh - 10)}${T(cx - 4, cy - l - rh - 16, 'd', 'tx it')}
      <line x1="${cx}" y1="${cy}" x2="${cx + r * 0.7}" y2="${cy + r * 0.7}" class="dim" marker-end="url(#ar)"/>
      ${T(cx + 34, cy + 46, 'r', 'tx it')}
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
           guides:[[x,y]] — пунктир от точки к осям, dots:[[x,y]], txt:[[x,y,'текст',cls,доп]] } */
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

  /* ---------- 1.11 (рис. 1.6) четыре оси ---------- */
  function axes4() {
    const rows = [
      { k: 'а', A: 70, v: 1, a: 1 }, { k: 'б', A: -70, v: -1, a: 1 },
      { k: 'в', A: 70, v: -1, a: -1 }, { k: 'г', A: -70, v: 1, a: -1 },
    ];
    let b = '';
    rows.forEach((r, i) => {
      const y = 44 + i * 62, O = 160, A = O + r.A;
      b += `<line x1="22" y1="${y}" x2="306" y2="${y}" class="axis" marker-end="url(#ar)"/>${T(300, y + 18, 'x', 'tx it sm')}
        <line x1="${O}" y1="${y - 5}" x2="${O}" y2="${y + 5}" class="axis"/>${T(O - 4, y + 34, 'O', 'tx sm')}
        ${P(A, y)}${T(A - 4, y + 34, 'A', 'tx sm')}
        ${dim(Math.min(O, A), y + 14, Math.max(O, A), y + 14)}${T((O + A) / 2 - 6, y + 28, 'x₀', 'tx it sm')}
        ${arrow(A, y - 10, A + 38 * r.v, y - 10)}${T(A + 38 * r.v + (r.v > 0 ? 4 : -22), y - 6, 'v₀', 'tx it sm')}
        ${arrow(A, y - 24, A + 30 * r.a, y - 24, 'vec blue')}${T(A + 30 * r.a + (r.a > 0 ? 4 : -14), y - 20, 'a', 'tx it sm ax-t')}
        ${T(4, y + 4, r.k + ')', 'tx cap')}`;
    });
    return svg(320, 270, b);
  }

  /* ---------- 1.12 (рис. 1.7) прожектор ---------- */
  function projector() {
    let hatch = '';
    for (let x = 24; x <= 296; x += 12) hatch += `<line x1="${x}" y1="30" x2="${x + 8}" y2="20" class="dim"/>`;
    return svg(320, 200, `
      <line x1="20" y1="30" x2="300" y2="30" class="ln"/>${hatch}
      ${T(14, 50, 'A', 'tx sm')}${T(292, 50, 'B', 'tx sm')}${T(108, 48, 'C', 'tx sm')}
      <line x1="120" y1="30" x2="120" y2="170" class="guide"/>
      <path d="M 108 172 A 12 12 0 0 1 132 172 Z" class="ln" fill="var(--fill)"/>${T(126, 192, 'O', 'tx sm')}
      <line x1="120" y1="170" x2="210" y2="30" class="ln"/>${P(210, 30)}
      <path d="M 120 135 A 35 35 0 0 1 139 140.6" class="dim"/>${T(128, 128, 'φ', 'tx it sm')}
      ${dim(64, 30, 64, 170)}${T(48, 104, 'l', 'tx it')}
      ${dim(120, 42, 210, 42)}${T(160, 58, 'x', 'tx it sm')}`);
  }

  /* ---------- 1.37, 1.38 (рис. 1.8) точка вверху окружности ---------- */
  function circleTop() {
    return svg(300, 210, `
      <line x1="40" y1="110" x2="270" y2="110" class="axis" marker-end="url(#ar)"/>${T(262, 128, 'x', 'tx it sm')}
      <line x1="150" y1="196" x2="150" y2="8" class="axis" marker-end="url(#ar)"/>${T(158, 16, 'y', 'tx it sm')}
      <circle cx="150" cy="110" r="72" class="ln" fill="none"/>
      ${P(150, 110)}${T(134, 128, 'O', 'tx sm')}
      <line x1="150" y1="110" x2="99" y2="59" class="dim"/>${T(104, 92, 'R', 'tx it')}
      ${P(150, 38)}${T(132, 32, 'A', 'tx sm')}
      ${arrow(150, 38, 205, 38)}${T(196, 30, 'v', 'tx it')}
      <path d="M 214 76 A 72 72 0 0 1 222 110" class="dim" marker-end="url(#ar)"/>`);
  }

  /* ---------- 1.39 (рис. 1.9) четыре схемы бросания ---------- */
  function throw4() {
    const cell = (ox, oy, top, ang, cap) => {
      const al = ang ? 35 : 0, rad = al * Math.PI / 180;
      let b = '';
      if (top) {           // O вверху, A под O на глубине h
        const Ay = oy + 58;
        b += `<line x1="${ox}" y1="${oy}" x2="${ox + 130}" y2="${oy}" class="axis" marker-end="url(#ar)"/>${T(ox + 124, oy - 6, 'x', 'tx it sm')}
          <line x1="${ox}" y1="${oy + 90}" x2="${ox}" y2="${oy - 18}" class="axis" marker-end="url(#ar)"/>${T(ox + 6, oy - 10, 'y', 'tx it sm')}
          ${T(ox - 14, oy - 4, 'O', 'tx sm')}${P(ox, Ay)}${T(ox - 16, Ay + 4, 'A', 'tx sm')}
          ${dim(ox + 10, oy, ox + 10, Ay)}${T(ox + 14, oy + 33, 'h', 'tx it sm')}`;
        const sgn = ang === 'up' ? -1 : 1;
        b += arrow(ox, Ay, ox + 40 * Math.cos(rad), Ay + sgn * 40 * Math.sin(rad)) + T(ox + 44, Ay + (ang ? -18 : 4), 'v₀', 'tx it sm');
        if (ang) b += T(ox + 24, Ay - 2, 'α', 'tx it sm');
      } else {             // O внизу, A в (s; h)
        const Ax = ox + 55, Ay = oy - 62;
        b += `<line x1="${ox}" y1="${oy}" x2="${ox + 130}" y2="${oy}" class="axis" marker-end="url(#ar)"/>${T(ox + 124, oy - 6, 'x', 'tx it sm')}
          <line x1="${ox}" y1="${oy}" x2="${ox}" y2="${oy - 92}" class="axis" marker-end="url(#ar)"/>${T(ox + 6, oy - 84, 'y', 'tx it sm')}
          ${T(ox - 14, oy + 14, 'O', 'tx sm')}${P(Ax, Ay)}${T(Ax - 6, Ay - 8, 'A', 'tx sm')}
          <polyline points="${ox},${Ay} ${Ax},${Ay} ${Ax},${oy}" class="guide" fill="none"/>
          ${T(ox - 12, Ay + 4, 'h', 'tx it sm')}${T(Ax - 3, oy + 15, 's', 'tx it sm')}`;
        b += arrow(Ax, Ay, Ax + 40 * Math.cos(rad), Ay + 40 * Math.sin(rad)) + T(Ax + 42, Ay + (ang ? 30 : 4), 'v₀', 'tx it sm');
        if (ang) b += T(Ax + 24, Ay + 10, 'α', 'tx it sm');
      }
      b += arrow(ox + 118, oy + (top ? 30 : -70), ox + 118, oy + (top ? 62 : -38), 'vec blue') + T(ox + 124, oy + (top ? 52 : -46), 'g', 'tx it sm ax-t');
      return b + T(ox - 10, oy + (top ? 112 : 34), cap, 'tx cap');
    };
    return svg(330, 290, cell(26, 24, true, 0, 'а)') + cell(186, 24, true, 'up', 'б)') +
      cell(26, 248, false, 0, 'в)') + cell(186, 248, false, 'down', 'г)'));
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

  return { triangle, rods, ringInPlane, ringTangent, diskHalfR, diskHole, plate,
    graph, roads, axes4, projector, circleTop, throw4, arcChord, accel, gSplit, vec2 };
})();
