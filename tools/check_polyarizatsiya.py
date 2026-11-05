"""Проверка ответов § 32 «Поляризация света» (32.1–32.22).

Пометки: «≠» — расхождение больше допуска (0,5 %); «≈» — отличие в последней цифре.
n воды = 1,33; алмаза 2,42 (табл. 19); c = 3·10⁸ м/с.
Запуск:  python -X utf8 tools/check_polyarizatsiya.py
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


from math import atan, asin, acos, tan, degrees
B = lambda n: degrees(atan(n))
chk('32.1', "ε2', °", 90 - 54, 36)
chk('32.2', 'φ, °', 90 - B(1.33), 37, 0.01)
chk('32.3', 'ε_B, ° (61°12′)', B(2.42 / 1.33), 61.2)
chk('32.4', 'v, Мм/с', 3e8 / tan(radians(57)) / 1e6, 194)
chk('32.5', 'ε_B, ° (55°45′)', B(1 / sin(radians(43))), 55.75)
chk('32.6', 'θ, °', 90 - B(1.6), 32, 0.01)
chk('32.7', 'n1 (в книге 1,52)', 2.42 / tan(radians(60)), 1.52)
chk('32.8', 'φ, °', 2 * B(1.33), 106, 0.01)
eb = B(1.54)
chk('32.9', 'γ, °', 180 - (eb - (90 - eb)), 156, 0.01)
chk('32.10', 'φ, °', 2 * B(1.58 / 1.33), 100, 0.01)
chk('32.11', 'α, °', degrees(acos(sqrt(1 / 2))), 45)
chk('32.12', 'I45/I60', cos(radians(45))**2 / cos(radians(60))**2, 2)
chk('32.13', 'I0/I', 1 / (0.5 * 0.9 * cos(radians(30))**2 * 0.9), 3.3, 0.01)
chk('32.14', 'L2, ккд/м²', 5e3 / (0.5 * 0.92 * 0.5 * 0.92) / 1e3, 23.6)
chk('32.15', 'P (интенсивности ∝ A²; в книге 0,33)', (4 - 1) / (4 + 1), 0.33)
chk('32.16', 'Imax/Imin', (1 + 0.5) / (1 - 0.5), 3)
k = (1 + 0.6) / (1 - 0.6)
chk('32.17', 'Imax/I(30°)', k / (1 + (k - 1) * cos(radians(30))**2), 1.23)
chk('32.18', 'P (в книге 0,348)', (2 - 1) / (2 + 1), 0.348)
chk('32.19', 'd2, мм', 90 / (53 / 2), 3.4, 0.01)
chk('32.20', '[α], град·см³/(дм·г)', 137 / (1.01 * 0.8), 169)
chk('32.21', 'C2, г/см³', 0.280 * 24 / 32, 0.21)
chk('32.22', 'ρ, г/см³', radians(40) / (1.17e-2 * 0.15) / 1e3, 0.4, 0.01)

for no, what, ours, book, mark in rows:
    print(f'{mark} {no:6} {what:44} наш {ours:12.5g}   книга {book:g}')
print(f'\nрасхождений ≠: {sum(r[4] == "≠" for r in rows)}  в последней цифре ≈: {sum(r[4] == "≈" for r in rows)}  всего строк: {len(rows)}')
