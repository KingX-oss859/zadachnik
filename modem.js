/* Звук модемного соединения (~9 с), синтез Web Audio — без файлов, работает офлайн.
   modemSound(ctx) запускает звук и возвращает stop(). Порядок как у настоящего модема:
   гудок → тоновый набор → вызов → ответ 2100 Гц → V.21-«трели» → зондирование линии → тренировка → шум данных. */
window.modemSound = function (ctx) {
  const t0 = ctx.currentTime + 0.05;
  const out = ctx.createGain(); out.gain.value = 0.5;
  const hp = ctx.createBiquadFilter(); hp.type = 'highpass'; hp.frequency.value = 300;   // телефонная полоса 300–3400 Гц
  const lp = ctx.createBiquadFilter(); lp.type = 'lowpass'; lp.frequency.value = 3400;
  out.connect(hp); hp.connect(lp); lp.connect(ctx.destination);

  function gate(a, b, level, fade = 0.008) {
    const g = ctx.createGain();
    g.gain.setValueAtTime(0, t0 + a);
    g.gain.linearRampToValueAtTime(level, t0 + a + fade);
    g.gain.setValueAtTime(level, t0 + b - fade);
    g.gain.linearRampToValueAtTime(0, t0 + b);
    g.connect(out);
    return g;
  }
  function osc(f, a, b, dest) {
    const o = ctx.createOscillator();
    o.frequency.value = f;
    o.connect(dest); o.start(t0 + a); o.stop(t0 + b + 0.02);
    return o;
  }
  function tone(freqs, a, b, level) {
    const g = gate(a, b, level / freqs.length);
    freqs.forEach(f => osc(f, a, b, g));
  }
  // частотная манипуляция: каждые 1/baud с — случайно одна из двух частот
  function fsk(f0, f1, a, b, level, baud) {
    const o = osc(f0, a, b, gate(a, b, level));
    for (let t = a; t < b; t += 1 / baud) o.frequency.setValueAtTime(Math.random() < 0.5 ? f0 : f1, t0 + t);
  }

  tone([350, 440], 0, 0.9, 0.5);                                    // гудок станции
  const DTMF = { 1: [697, 1209], 2: [697, 1336], 3: [697, 1477], 4: [770, 1209], 5: [770, 1336],
    6: [770, 1477], 7: [852, 1209], 8: [852, 1336], 9: [852, 1477], 0: [941, 1336] };
  [...'5551998'].forEach((d, i) => tone(DTMF[d], 1.0 + i * 0.17, 1.1 + i * 0.17, 0.6));
  tone([440, 480], 2.35, 3.15, 0.35);                               // гудок вызова

  // ответ сервера: 2100 Гц, амплитуда «качается» с частотой 15 Гц (ANSam)
  const ans = gate(3.3, 4.6, 0.3);
  osc(2100, 3.3, 4.6, ans);
  const lfo = ctx.createOscillator(), depth = ctx.createGain();
  lfo.frequency.value = 15; depth.gain.value = 0.06;
  lfo.connect(depth); depth.connect(ans.gain); lfo.start(t0 + 3.3); lfo.stop(t0 + 4.6);

  fsk(1650, 1850, 4.65, 5.3, 0.25, 300);                            // V.8 — «трели» обоих модемов
  fsk(980, 1180, 4.75, 5.3, 0.18, 300);

  const probe = [];                                                 // зондирование линии — «бонг»
  for (let f = 150; f <= 3750; f += 150) probe.push(f);
  tone(probe, 5.35, 5.65, 1.2);
  tone(probe, 5.75, 5.95, 1.0);

  tone([1200], 6.05, 6.35, 0.3);                                    // тренировка эквалайзера
  tone([2400], 6.35, 6.6, 0.25);
  tone([1800], 6.6, 6.85, 0.3);

  // данные: шипение (полосовой шум) с «треском» и быстрая манипуляция поверх
  const len = ctx.sampleRate * 2, buf = ctx.createBuffer(1, len, ctx.sampleRate), ch = buf.getChannelData(0);
  for (let i = 0; i < len; i++) ch[i] = Math.random() * 2 - 1;
  const noise = ctx.createBufferSource(); noise.buffer = buf; noise.loop = true;
  const bp = ctx.createBiquadFilter(); bp.type = 'bandpass'; bp.Q.value = 0.7;
  bp.frequency.setValueAtTime(1700, t0 + 6.9); bp.frequency.linearRampToValueAtTime(2100, t0 + 9);
  const hiss = gate(6.9, 9.0, 0.9, 0.05);
  noise.connect(bp); bp.connect(hiss); noise.start(t0 + 6.9); noise.stop(t0 + 9.05);
  const crackle = ctx.createOscillator(), cd = ctx.createGain();
  crackle.type = 'square'; crackle.frequency.value = 27; cd.gain.value = 0.25;
  crackle.connect(cd); cd.connect(hiss.gain); crackle.start(t0 + 6.9); crackle.stop(t0 + 9.0);
  fsk(1600, 2000, 6.9, 7.8, 0.08, 1200);

  return function stop() {
    const n = ctx.currentTime;
    out.gain.cancelScheduledValues(n);
    out.gain.setValueAtTime(out.gain.value, n);
    out.gain.linearRampToValueAtTime(0, n + 0.05);
    setTimeout(() => { if (ctx.state !== 'closed') ctx.close(); }, 150);
  };
};
