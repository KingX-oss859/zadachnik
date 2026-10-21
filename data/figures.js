/* Чертежи к задачам (SVG). Цвета берутся из CSS: .ln — линии, .ax — оси, .tx — подписи, .fl — заливка. */
window.FIG = (function () {
  const T = (x, y, s, cls = 'tx', extra = '') =>
    `<text x="${x}" y="${y}" class="${cls}" ${extra}>${s}</text>`;
  const arrowDefs = `
    <defs>
      <marker id="ar" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
        <path d="M0,1 L10,5 L0,9 z" class="arh"/>
      </marker>
    </defs>`;
  const dim = (x1, y1, x2, y2) =>
    `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" class="dim" marker-start="url(#ar)" marker-end="url(#ar)"/>`;
  const svg = (w, h, body) =>
    `<svg viewBox="0 0 ${w} ${h}" xmlns="http://www.w3.org/2000/svg" role="img">${arrowDefs}${body}</svg>`;

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

  return { triangle, rods, ringInPlane, ringTangent, diskHalfR, diskHole, plate };
})();
