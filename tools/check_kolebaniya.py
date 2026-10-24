"""Проверка ответов § 6 «Механические колебания» (задачи 6.1–6.75).

Каждая строка: номер, величина, наш расчёт, ответ книги. Пометки:
  «≠» — расхождение больше допуска (0,5 %): ошибка в книге или у нас, разбирать;
  «≈» — наш ответ, округлённый как в книге, отличается в последней цифре.
Фазы — в долях π (0,5 = π/2). Плотности — по приложениям книги: вода 1000, ртуть 13,6·10³ кг/м³.
Траектории (6.22–6.30) проверяются подстановкой: уравнение должно выполняться во всех точках движения.
Запуск:  python -X utf8 tools/check_kolebaniya.py
"""
from math import sqrt, sin, cos, pi, atan2, acos, asin, log, exp

g = 9.81
rows = []


def chk(no, what, ours, book, tol=0.005):
    if abs(ours - book) > tol * max(abs(book), 1e-300):
        mark = '≠'
    else:
        s = f'{book:.6g}'
        mant = s.split('e')[0]
        dec = len(mant.split('.')[1]) if '.' in mant else 0
        exp_ = int(s.split('e')[1]) if 'e' in s else 0
        r = round(ours / 10**exp_, dec) * 10**exp_
        mark = ' ' if abs(r - book) <= 1e-9 * max(abs(book), 1e-300) else '≈'
    rows.append((no, what, ours, book, mark))


def phase(c, s):
    """Фаза в [0; 2π) по косинусу и синусу, в долях π."""
    return (atan2(s, c) % (2 * pi)) / pi


def curve(no, what, xf, yf, eq, book_ok=True):
    """Уравнение траектории eq(x, y) = 0 должно выполняться в каждой точке движения."""
    err = max(abs(eq(xf(t), yf(t))) for t in [k * 0.01 for k in range(700)])
    rows.append((no, what, err, 0.0, ' ' if err < 1e-9 and book_ok else '≠'))


# --- кинематика ---
chk('6.1', 'T, с', 2 * pi / pi, 2)
chk('6.1', 'φ, °', pi * 0.2 * 180 / pi, 36)
chk('6.2', 'T, с', 2 * pi / (2.5 * pi), 0.8)
chk('6.2', 'ν, Гц', 1.25, 1.25)
chk('6.2', 'φ/π', 2.5 * 0.4, 1)
# 6.3: x = A cos φ, ẋ = −Aω sin φ
for k, (x0, vs, bk) in enumerate(((2, -1, 1 / 3), (-2 * sqrt(2), -1, 3 / 4), (2, 1, 5 / 3), (-2 * sqrt(3), 1, 7 / 6)), 1):
    c = x0 / 4
    chk('6.3', f'{k}) φ/π', phase(c, -vs * sqrt(1 - c * c)), bk)
# 6.4: x = A sin φ, ẋ = Aω cos φ
for k, (x0, vs, bk) in enumerate(((2, -1, 5 / 6), (2 * sqrt(3), 1, 1 / 3), (-2 * sqrt(2), -1, 5 / 4), (-2 * sqrt(3), 1, 5 / 3)), 1):
    s = x0 / 4
    chk('6.4', f'{k}) φ/π', phase(vs * sqrt(1 - s * s), s), bk)
# 6.6: x = 4 cos(πt + π/2)
c = 1 / 4
chk('6.6', '1) фаза/π (x=1, ẋ>0)', phase(c, -sqrt(1 - c * c)), 5 / 3)
s = 6 / (4 * pi)
chk('6.6', '2) фаза/π (ẋ=−6, x<0)', phase(-sqrt(1 - s * s), s), 0.842)
A, w, F = 10, pi / 3, 5 * pi / 6
chk('6.7', 'x, см', A * cos(F), -8.66)
chk('6.7', 'ẋ, см/с', -A * w * sin(F), -5.24)
chk('6.7', 'ẍ, см/с²', -A * w * w * cos(F), 9.50)
chk('6.8', 'ẋmax, см/с', 3 * pi / 2, 4.71)
chk('6.8', 'ẍmax, см/с²', 3 * (pi / 2)**2, 7.40)
chk('6.9', '|ẍ|, см/с²', 2 * sqrt(4 * 25 - 64), 12)
chk('6.10', 'ω, с⁻¹', 20 / 10, 2)
chk('6.10', 'ẍmax, см/с²', 4 * 10, 40)
chk('6.11', 'ω, с⁻¹', 100 / 10, 10)
chk('6.11', 'T, с', 2 * pi / 10, 0.628)
chk('6.11', 'A, см', 10 / 10, 1)
c = 8 / (2 * 5)
chk('6.12', 'A, см', 5 / sqrt(1 - c * c), 8.33)
w = sqrt(80 / 5)
A = sqrt(25 + 20**2 / w**2)
chk('6.13', 'ω, с⁻¹', w, 4)
chk('6.13', 'T, с', 2 * pi / w, 1.57)
chk('6.13', 'A, см', A, 7.07)
chk('6.13', 'фаза/π (в книге +1/4)', phase(5 / A, -20 / (A * w)), 1 / 4)

# --- сложение колебаний ---
chk('6.14', 'Δφ/π', acos((14**2 - 10**2 - 6**2) / (2 * 10 * 6)) / pi, 1 / 3)
chk('6.15', 'Δφ/π', acos(-0.5) / pi, 2 / 3)


def add(*ph):
    """Сумма колебаний A_i cos(ωt + φ_i): амплитуда и фаза/π."""
    X = sum(a * cos(f) for a, f in ph)
    Y = sum(a * sin(f) for a, f in ph)
    return sqrt(X * X + Y * Y), atan2(Y, X) / pi


# 6.16: sin ωt + sin(ωt + π/2) = cos(ωt − π/2) + cos ωt
A, f = add((1, -pi / 2), (1, 0))
chk('6.16', 'A, см', A, 1.41)
chk('6.16', 'φ/π в x = A cos(ωt + φ) (в книге +1/4)', f, 1 / 4)
A, f = add((1, -pi / 2), (2, 0))
chk('6.17', 'A, см', A, 2.24)
chk('6.17', 'ν, Гц', 1 / (2 * pi), 0.159)
chk('6.17', 'φ/π в x = A cos(ωt + φ) (в книге 0,353)', f, 0.353)
A, f = add((2, pi / 2), (2, pi / 3))
chk('6.18', 'A, см', A, 3.86)
chk('6.18', 'φ/π', f, 0.417)
chk('6.18', 'ω, с⁻¹', 2 * pi / 1.5, 4.19)
A, f = add((3, 0), (3, pi / 3), (3, 2 * pi / 3))
chk('6.19', 'A, см', A, 6)
chk('6.19', 'φ/π', f, 1 / 3)
A, f = add((1, pi / 3), (2, 5 * pi / 6))
chk('6.20', '1) A, см', A, 2.24)
chk('6.20', '1) φ/π', f, 0.686)
A, f = add((1, 2 * pi / 3), (1, 7 * pi / 6))
chk('6.20', '2) A, см', A, 1.41)
chk('6.20', '2) φ/π', f, 0.917)
chk('6.21', 'T биений, с', 1 / 0.5, 2)
curve('6.22', 'y = −x/2', lambda t: 2 * sin(pi * t), lambda t: cos(pi * (t + 0.5)), lambda x, y: y + x / 2)
curve('6.23', 'y = −2x', lambda t: 4 * cos(pi * t), lambda t: 8 * cos(pi * (t + 1)), lambda x, y: y + 2 * x)
c24 = [(lambda t: 2 * cos(t), lambda t: 2 * cos(t), lambda x, y: y - x),
       (lambda t: 2 * cos(t), lambda t: 3 * cos(t), lambda x, y: y - 1.5 * x),
       (lambda t: 2 * cos(t), lambda t: 2 * cos(t + pi / 2), lambda x, y: x * x + y * y - 4),
       (lambda t: 1 * cos(t), lambda t: 2 * cos(t + pi), lambda x, y: y + 2 * x),
       (lambda t: 3 * cos(t), lambda t: 3 * sin(t), lambda x, y: x * x + y * y - 9),
       (lambda t: 2 * cos(t), lambda t: 3 * sin(t), lambda x, y: x * x / 4 + y * y / 9 - 1),
       (lambda t: 1 * sin(t), lambda t: 3 * sin(t), lambda x, y: y - 3 * x),
       (lambda t: 1 * sin(t), lambda t: 2 * sin(t + pi), lambda x, y: y + 2 * x)]
for k, (xf, yf, eq) in enumerate(c24, 1):
    curve('6.24', f'{k})', xf, yf, eq)
curve('6.25', 'x²/4 + y² = 1', lambda t: 2 * cos(t), lambda t: sin(t), lambda x, y: x * x / 4 + y * y - 1)
curve('6.26', 'x²/0,25 + y²/4 = 1', lambda t: 0.5 * sin(t), lambda t: 2 * cos(t), lambda x, y: x * x / 0.25 + y * y / 4 - 1)
curve('6.27', 'x²/100 + y²/25 = 1', lambda t: 10 * sin(2 * t), lambda t: 5 * sin(2 * (t + pi / 4)), lambda x, y: x * x / 100 + y * y / 25 - 1)
chk('6.27', 'v(0,5 с), см/с (в книге «м/с»)', sqrt((20 * cos(1))**2 + (10 * sin(1))**2), 13.7)
curve('6.28', 'y = 1 − x²/2', lambda t: 2 * cos(t), lambda t: -cos(2 * t), lambda x, y: y - 1 + x * x / 2)
curve('6.29', '1) y = 2 − x²', lambda t: 2 * sin(t), lambda t: 2 * cos(2 * t), lambda x, y: y - 2 + x * x)
curve('6.29', '2) y² = x²(4 − x²)', lambda t: 2 * cos(t), lambda t: 2 * sin(2 * t), lambda x, y: y * y - x * x * (4 - x * x))
curve('6.29', '2) ответ книги y = x² − 2', lambda t: 2 * cos(t), lambda t: 2 * sin(2 * t), lambda x, y: y - x * x + 2, False)
curve('6.29', '3) x = 4y²/9 − 2', lambda t: 2 * cos(2 * t), lambda t: 3 * cos(t), lambda x, y: x - 4 * y * y / 9 + 2)
curve('6.29', '3) ответ книги y = 3x²/4 + 3/2', lambda t: 2 * cos(2 * t), lambda t: 3 * cos(t), lambda x, y: y - 0.75 * x * x - 1.5, False)
curve('6.29', '4) x²/9 + y²/4 = 1', lambda t: 3 * sin(t), lambda t: 2 * cos(t), lambda x, y: x * x / 9 + y * y / 4 - 1)
curve('6.29', '4) ответ книги — для x = A₁ sin 2ωt', lambda t: 3 * sin(2 * t), lambda t: 2 * cos(t), lambda x, y: x * x - (1.5 * y)**2 * (4 - y * y))
curve('6.30', 'y² = 9(2 − x)/4', lambda t: 2 * cos(t), lambda t: 3 * sin(t / 2), lambda x, y: y * y - 2.25 * (2 - x))

# --- динамика, энергия, маятники ---
chk('6.32', '1) F, мН', -0.05 * 25 * 0.1 * cos(pi / 3) * 1e3, -62.5)
chk('6.32', '2) F, мН', -0.05 * 25 * 0.1 * 1e3, -125)
chk('6.33', 'Fmax, мН', 1e-4 * 400 * 0.05 * 1e3, 2)
chk('6.33', 'Tmax, мкДж', 1e-4 * 400 * 0.05**2 / 2 * 1e6, 50)
w = 2 * pi / 3
chk('6.34', 'F, мН', -0.01 * w * w * 0.2 * cos(w) * 1e3, 4.39)
chk('6.34', 'E, мкДж', 0.01 * w * w * 0.2**2 / 2 * 1e6, 877)
x = 2 * 100e-6 / 5e-3
chk('6.35', 't, с', acos(x / 0.08) / (pi / 6), 2)
chk('6.36', 'k, Н/м', 4 * pi**2 * 0.25 / 1, 9.87)
chk('6.37', 'T, с', 2 * pi * sqrt(0.09 / g), 0.6, 0.01)
chk('6.38', 'E, Дж', 1000 * 0.04**2 / 2, 0.8)
chk('6.39', 'l1/l2', 1.5**2, 2.25)
chk('6.40', 'T, с', 2 * pi * sqrt(1 / (g + 2.5)), 1.8, 0.01)
J, a = 0.1**2 + 0.2**2, 0.15 - 0.1
L = J / (2 * a)
chk('6.41', 'L, см', L * 100, 50)
chk('6.41', 'T, с', 2 * pi * sqrt(L / g), 1.42)
l = 0.3
L = (l * l / 4 + l * l) / (2 * 0.75 * l)
chk('6.42', 'L, см', L * 100, 25)
chk('6.42', 'T, с', 2 * pi * sqrt(L / g), 1, 0.01)
chk('6.43', 'T, с', 2 * pi * sqrt(3 * 0.3 / g), 1.90)
chk('6.44', 'T, с', 2 * pi * sqrt(2 * 0.3 / g), 1.55)
chk('6.45', 'T, с', 2 * pi * sqrt(1.5 * 0.3 / g), 1.35)
R = 0.24
L = (R * R / 2 + R * R / 4) / (R / 2)
chk('6.46', 'L, см', L * 100, 36)
chk('6.46', 'T, с', 2 * pi * sqrt(L / g), 1.2)
R, r = 0.2, 0.1
J = 1.5 * (R**4 - r**4)               # в единицах σπ
m = R * R - r * r
a = (R**3 - r**3) / m
chk('6.47', 'T, с', 2 * pi * sqrt(J / (m * a) / g), 1.14)
l1, l2 = 0.4, 0.6
chk('6.48', 'a1, см', (l1 - sqrt(l1**2 - l2**2 / 3)) / 2 * 100, 10)
chk('6.48', 'a2, см', (l1 + sqrt(l1**2 - l2**2 / 3)) / 2 * 100, 30)
chk('6.49', 'a, см', 120 / sqrt(12), 34.6)


def pend(items, l=1):
    """items: (масса, расстояние от оси, J собственный) — период физического маятника."""
    M = sum(m for m, _, _ in items)
    J = sum(j + m * d * d for m, d, j in items)
    a = sum(m * d for m, d, _ in items) / M
    return J / (M * a)                 # приведённая длина


rod = lambda d: (1, d, 1 / 12)         # стержень массой m, длиной 1; d — от оси до середины
for case, items, bk in (('а', [rod(0.5), (1, 1, 0)], 1.89), ('б', [rod(0), (1, 0.5, 0)], 1.64),
                        ('в', [rod(1 / 6), (1, 1 / 3, 0)], 1.34), ('г', [rod(0.5), (1, 0.5, 0)], 1.53)):
    chk('6.50', case + ') T, с', 2 * pi * sqrt(pend(items) / g), bk)
for case, items, bk in (('а', [rod(0), (1, -0.5, 0), (2, 0.5, 0)], 0.386), ('б', [rod(0.5), (1, 0.5, 0), (2, 1, 0)], 0.537),
                        ('в', [rod(0), (1, 0, 0), (2, 0.5, 0)], 0.652), ('г', [rod(0.5), (2, 0.5, 0), (1, 1, 0)], 0.582)):
    chk('6.51', case + ') ν, Гц', sqrt(g / pend(items)) / (2 * pi), bk)
chk('6.52', 'J, кг·м²', 4 * 0.04 * 0.64 / (2 * (1.44 - 0.64)), 6.4e-2)
chk('6.53', 'T, с', 4 / 0.01 * sqrt(pi * 0.05 / (1000 * g)), 1.6)
chk('6.54', 'T, с', 2 * pi * sqrt(0.2 / (2 * 13600 * g * 0.4e-4)), 0.86)
chk('6.55', 'l, м', g * 25 / (4 * pi**2), 6.21)

# --- затухающие колебания ---
chk('6.56', 't2, мин', 5 * log(8) / log(2), 15)
chk('6.57', 'δ, с⁻¹', log(3) / 480, 0.0023, 0.01)
chk('6.58', 'θ', log(2) / 600 * 2 * pi * sqrt(1 / g), 2.31e-3)
chk('6.59', 'N', log(2) / 0.003, 231, 0.01)
N = log(2) / 0.004
chk('6.60', 'N', N, 173, 0.01)
chk('6.60', 't, с', N * 2 * pi * sqrt(0.5 / 20), 172)
chk('6.61', 'b, кг/с', 2 * 0.005 * log(1 / 0.4) / (2 * 50), 9.16e-5)
chk('6.62', 'T, с', sqrt(1 + 0.628**2 / (4 * pi**2)), 1.005)
chk('6.63', 'N', log(sqrt(2)) / 0.01, 35, 0.02)
d, w0 = 0.05 / 2, sqrt(100 / 1)
w = sqrt(w0**2 - d**2)
chk('6.64', 'δ', d, 0.025)
chk('6.64', 'ν, Гц', w / (2 * pi), 1.59)
chk('6.64', 'θ', d * 2 * pi / w, 0.0157)
chk('6.64', 'N', 1 / (d * 2 * pi / w), 64, 0.01)

# --- вынужденные колебания ---
chk('6.65', 'n, с⁻¹', sqrt(g / 1e-3) / (2 * pi), 16, 0.02)
chk('6.66', 'v, м/с', 12.8 / pi * sqrt(500e3 / 80e3), 10.2)
chk('6.67', 'ν0, Гц', sqrt(2 * 1000**2 - 998**2), 1002)
chk('6.68', 'Δν, Гц (приближённо)', 400**2 / (4 * pi**2 * 1000), 4.05)
chk('6.68', 'Δν, Гц (точно)', 1000 - sqrt(1000**2 - 2 * 400**2 / (4 * pi**2)), 4.05)
chk('6.69', 'θ', 2 * pi * sqrt(2 / 10e3), 0.089, 0.01)
chk('6.70', 'νрез, Гц', sqrt(2 / 0.56**2 - 1 / 0.55**2), 1.75)
d, w0 = 0.02 / 0.2, 10
chk('6.71', 'δ, с⁻¹', d, 0.1)
chk('6.71', 'Aрез, см', 0.01 / 0.1 / (2 * d * sqrt(w0**2 - d**2)) * 100, 5)
chk('6.72', 'F0, мН', 2 * pi * 10 * 1e-3 * 0.5e-2 * 1e3, 0.314)
chk('6.73', 'νрез, Гц', sqrt((400**2 + 600**2) / 2), 510)
w0, d = sqrt(10 / 0.01), 0.1 / 0.02
Ar = 0.02 / 0.01 / (2 * d * sqrt(w0**2 - d**2))
chk('6.74', 'ν0, Гц', w0 / (2 * pi), 5.03)
chk('6.74', 'νрез, Гц', sqrt(w0**2 - 2 * d**2) / (2 * pi), 4.91)
chk('6.74', 'Aрез, мм', Ar * 1e3, 6.4)
chk('6.74', 'Aрез/xст', Ar / (0.02 / 10), 3.2)
den = lambda w: sqrt((1 - w * w)**2 + 4 * 0.01 * w * w)   # ω0 = 1, δ = 0,1
wr = sqrt(1 - 2 * 0.01)
Ares = 1 / (2 * 0.1 * sqrt(1 - 0.01))
chk('6.75', '1) Aрез/A, ω = 1,1ωрез', den(1.1 * wr) * Ares, 1.53)
chk('6.75', '2) Aрез/A, ω = 2ωрез', den(2 * wr) * Ares, 15.2)
chk('6.75', '1) то же при ω = 1,1ω0', den(1.1) * Ares, 1.53)
chk('6.75', '2) то же при ω = 2ω0', den(2) * Ares, 15.2)

for no, what, ours, book, mark in rows:
    print(f'{mark} {no:5} {what:40} наш {ours:12.5g}   книга {book:.4g}')
print('\nрасхождений ≠:', sum(r[4] == '≠' for r in rows), ' в последней цифре ≈:', sum(r[4] == '≈' for r in rows), ' всего строк:', len(rows))
