"""Проверка ответов § 31 «Дифракция света» (31.1–31.33).

Пометки: «≠» — расхождение больше допуска (0,5 %); «≈» — отличие в последней цифре.
Запуск:  python -X utf8 tools/check_difraktsiya.py
"""
from math import pi, sqrt, sin, cos, radians

MU0 = 4 * pi * 1e-7
E = 1.60e-19
ME = 9.11e-31
K = 8.99e9
rows = []


def chk(no, what, ours, book, tol=0.005):
    if abs(ours - book) > tol * max(abs(book), 1e-300):
        mark = '≠'
    else:
        s = f'{book:.6g}'
        mant = s.split('e')[0]
        dec = len(mant.split('.')[1]) if '.' in mant else 0
        e = int(s.split('e')[1]) if 'e' in s else 0
        r = round(ours / 10**e, dec) * 10**e
        mark = ' ' if abs(r - book) <= 1e-9 * max(abs(book), 1e-300) else '≈'
    rows.append((no, what, ours, book, mark))


from math import asin, atan, tan, degrees
SEC = pi / 180 / 3600
MIN = pi / 180 / 60
chk('31.2', 'ρ5, мм', sqrt(1 * 5 * 0.5e-6) * 1e3, 1.58)
chk('31.3', 'ρ6, мм', 3 * sqrt(6 / 4), 3.69)
chk('31.4', 'число зон', 2e-3**2 / (1 * 0.5e-6), 8)
chk('31.5', '1) b, м', 0.5e-2**2 / (1 * 0.5e-6), 50)
chk('31.5', '2) b, м', 0.5e-2**2 / (2 * 0.5e-6), 25)
for n, bb in ((2, 1.4), (4, 0.7), (6, 0.47)):
    chk('31.7', f'b (n = {n}), м', 1.4e-3**2 / (n * 0.7e-6), bb, 0.01)
chk('31.8', 'b, м', 1 * 1e-6 / (1 * 3 * 0.5e-6 - 1e-6), 2)
chk('31.9', 'I0/I', 4, 4)
chk('31.10', 'φ, ° (2°45′ = 2,75°)', degrees(asin(4 * 0.6e-6 / 0.05e-3)), 2.75)
chk('31.11', 'a/λ', 2.5 / sin(radians(1)), 143)
chk('31.12', "1) a·sinφ/λ при 17′", 0.1e-3 * sin(17 * MIN) / 0.5e-6, 1, 0.02)
chk('31.12', "2) a·sinφ/λ при 43′", 0.1e-3 * sin(43 * MIN) / 0.5e-6, 2.5, 0.01)
chk('31.13', 'n, мм⁻¹', sin(radians(18)) / (5 * 0.6e-6) / 1e3, 103)
chk('31.14', 'λ, нм', 1e-5 * sin(radians(10)) / 3 * 1e9, 580)
chk('31.15', 'φ2, ° (21°17′)', degrees(asin(1.5 * sin(radians(14)))), 21 + 17 / 60)
chk('31.16', 'k_max', int(5e-6 / 0.6e-6), 8)
km = int(2.5e-6 / 0.6e-6)
chk('31.17', 'число максимумов', 2 * km + 1, 9)
chk('31.17', 'φ последнего, °', degrees(asin(km * 0.6e-6 / 2.5e-6)), 74, 0.01)
chk('31.18', 'λ, мкм', 3 * 0.4 / 2, 0.6)
d = 2e-6
b = 3 * (tan(asin(780e-9 / d)) - tan(asin(400e-9 / d)))
chk('31.19', 'b, см', b * 100, 66)
chk('31.20', 'φ, °', degrees(asin(0.5 + 2 * 600e-9 / 10e-6)), 38.3)
chk('31.21', 'k_min (≥ 2,53)', 760 / 0.1 / (1.5e-2 / 5e-6), 2.53, 0.01)
chk('31.22', 'R', 579 / 2, 290)
chk('31.22', 'N (k = 2)', 579 / 2 / 2, 145, 0.01)
chk('31.23', 'l, мм', 589.3 / (2 * 0.6) * 20e-6 * 1e3, 10, 0.02)
chk('31.24', 'R, 10⁴', 5 * MIN / 1e-9 * 0.02 / 1e4, 2.91)
Dp = tan(radians(30)) / 600e-9
chk('31.25', 'D_φ, 10⁵ рад/м', Dp / 1e5, 9.62)
chk('31.25', "D_φ, ′/нм", Dp * 1e-9 / MIN, 3.31)
chk('31.26', 'sin φ3 (должен быть < 1)', 3 * 700e-9 / 2e-6, 1)
chk('31.26', 'f·k/d при k = 3, мм/нм', 0.5 * 3 / 2e-6 * 1e-6, 1)
chk('31.27', 'n, мм⁻¹', 1e6 / 1 / 1e3, 1000)
chk('31.28', 'f, см (в книге 21,1)', 0.5e6 * 650e-9 * cos(radians(30))**3 / sin(radians(30)) * 100, 21.1)
chk('31.29', 'd, нм', 2 * 147e-12 / (2 * sin(radians(31.5))) * 1e9, 0.28, 0.01)
chk('31.30', 'λ, пм', 2 * 0.3e-9 * sin(radians(3)) * 1e12, 31, 0.02)
chk('31.31', 'λ, пм', 2 * 280 * sin(radians(65)), 506)
chk('31.32', 'β, ″', 1.22 * 0.5e-6 / 0.08 / SEC, 1.6, 0.02)
chk('31.33', 'D_min, см', 1.22 * 640e-9 * 15e3 / 0.2 * 100, 6, 0.03)

for no, what, ours, book, mark in rows:
    print(f'{mark} {no:6} {what:44} наш {ours:12.5g}   книга {book:g}')
print(f'\nрасхождений ≠: {sum(r[4] == "≠" for r in rows)}  в последней цифре ≈: {sum(r[4] == "≈" for r in rows)}  всего строк: {len(rows)}')
