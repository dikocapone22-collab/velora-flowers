"""Генерирует стилизованные иллюстрации-заглушки букетов (НЕ фотографии) для демо VELORA.

Использование:
    python3 scripts/generate-placeholders.py <папка-для-png> <путь-к-og-image.jpg>
Затем: IMAGES_SRC=<папка-для-png> node scripts/optimize-images.mjs
Требуется Pillow: pip install pillow
"""
import glob
import math
import os
import random
import sys

from PIL import Image, ImageDraw, ImageFilter, ImageFont

OUT = sys.argv[1] if len(sys.argv) > 1 else 'placeholder-source'
OG_PATH = sys.argv[2] if len(sys.argv) > 2 else os.path.join(OUT, '..', 'og-image.jpg')
os.makedirs(OUT, exist_ok=True)


def hex2rgb(h):
    h = h.lstrip('#'); return tuple(int(h[i:i+2], 16) for i in (0, 2, 4))


def mix(a, b, t):
    return tuple(int(a[i] + (b[i] - a[i]) * t) for i in range(3))


def bg(w, h, top, bottom):
    img = Image.new('RGB', (w, h), top)
    d = ImageDraw.Draw(img)
    for y in range(h):
        d.line([(0, y), (w, y)], fill=mix(top, bottom, y / h))
    return img


def ellipse_layer(size, cx, cy, rx, ry, angle, color, alpha=255):
    pad = int(max(rx, ry)) + 4
    tile = Image.new('RGBA', (pad * 2, pad * 2), (0, 0, 0, 0))
    td = ImageDraw.Draw(tile)
    td.ellipse([pad - rx, pad - ry, pad + rx, pad + ry], fill=color + (alpha,))
    tile = tile.rotate(angle, resample=Image.BICUBIC)
    return tile, (int(cx - pad), int(cy - pad))


def paste(canvas, tile, pos):
    canvas.alpha_composite(tile, dest=(max(pos[0], 0), max(pos[1], 0)), source=(max(-pos[0], 0), max(-pos[1], 0)))


def leaf(canvas, cx, cy, length, angle, color):
    tile, pos = ellipse_layer(canvas.size, cx, cy, length, length * 0.32, angle, color)
    paste(canvas, tile, pos)
    d = ImageDraw.Draw(canvas)
    rad = math.radians(-angle)
    d.line([(cx - math.cos(rad) * length * 0.9, cy - math.sin(rad) * length * 0.9),
            (cx + math.cos(rad) * length * 0.9, cy + math.sin(rad) * length * 0.9)],
           fill=mix(color, (255, 255, 255), 0.25) + (160,), width=max(1, int(length / 40)))


def rose(canvas, cx, cy, r, base, rnd):
    dark = mix(base, (20, 5, 10), 0.45)
    light = mix(base, (255, 245, 240), 0.35)
    for i in range(9):
        a = i * 40 + rnd.uniform(-10, 10)
        ox = cx + math.cos(math.radians(a)) * r * 0.45
        oy = cy + math.sin(math.radians(a)) * r * 0.45
        tile, pos = ellipse_layer(canvas.size, ox, oy, r * 0.62, r * 0.48, -a, mix(dark, base, 0.5))
        paste(canvas, tile, pos)
    tile, pos = ellipse_layer(canvas.size, cx, cy, r * 0.82, r * 0.78, 0, base)
    paste(canvas, tile, pos)
    d = ImageDraw.Draw(canvas)
    steps = 5
    for k in range(steps):
        rr = r * (0.72 - k * 0.13)
        start = rnd.uniform(0, 360)
        col = mix(base, light, k / steps) if k % 2 == 0 else mix(base, dark, 0.35)
        d.arc([cx - rr, cy - rr * 0.9, cx + rr, cy + rr * 0.9], start, start + 250, fill=col + (255,), width=max(2, int(r * 0.11)))
    d.ellipse([cx - r * 0.12, cy - r * 0.1, cx + r * 0.12, cy + r * 0.1], fill=dark + (255,))


def daisy(canvas, cx, cy, r, petal, center, rnd):
    for i in range(12):
        a = i * 30 + rnd.uniform(-4, 4)
        ox = cx + math.cos(math.radians(a)) * r * 0.55
        oy = cy + math.sin(math.radians(a)) * r * 0.55
        tile, pos = ellipse_layer(canvas.size, ox, oy, r * 0.5, r * 0.18, -a, petal)
        paste(canvas, tile, pos)
    d = ImageDraw.Draw(canvas)
    d.ellipse([cx - r * 0.3, cy - r * 0.3, cx + r * 0.3, cy + r * 0.3], fill=center + (255,))


def filler(canvas, cx, cy, spread, color, count, rnd, size):
    d = ImageDraw.Draw(canvas)
    for _ in range(count):
        x = cx + rnd.gauss(0, spread); y = cy + rnd.gauss(0, spread * 0.8)
        s = rnd.uniform(size * 0.5, size)
        d.ellipse([x - s, y - s, x + s, y + s], fill=color + (235,))


def wrap(canvas, w, h, color, ribbon, cx, top, bottom_y, width):
    d = ImageDraw.Draw(canvas)
    shade = mix(color, (0, 0, 0), 0.12)
    d.polygon([(cx - width, top), (cx + width, top), (cx + width * 0.12, bottom_y), (cx - width * 0.12, bottom_y)], fill=color + (255,))
    d.polygon([(cx - width, top), (cx - width * 0.25, top + 20), (cx - width * 0.05, bottom_y), (cx - width * 0.12, bottom_y)], fill=shade + (255,))
    d.polygon([(cx + width * 0.35, top), (cx + width, top), (cx + width * 0.12, bottom_y), (cx + width * 0.02, bottom_y)], fill=mix(color, (255, 255, 255), 0.18) + (255,))
    ry = top + (bottom_y - top) * 0.58
    rw = width * 0.42
    d.rectangle([cx - rw, ry - 14, cx + rw, ry + 14], fill=ribbon + (255,))
    d.polygon([(cx, ry), (cx - rw * 0.9, ry + 70), (cx - rw * 0.55, ry + 80)], fill=ribbon + (255,))
    d.polygon([(cx, ry), (cx + rw * 0.9, ry + 70), (cx + rw * 0.55, ry + 80)], fill=ribbon + (255,))


def shadow(canvas, cx, y, rx):
    sh = Image.new('RGBA', canvas.size, (0, 0, 0, 0))
    ImageDraw.Draw(sh).ellipse([cx - rx, y - rx * 0.12, cx + rx, y + rx * 0.12], fill=(40, 25, 20, 70))
    sh = sh.filter(ImageFilter.GaussianBlur(rx * 0.15))
    canvas.alpha_composite(sh)


def grain(img, rnd, amount=6):
    noise = Image.effect_noise(img.size, 40).convert('L')
    noise = noise.point(lambda v: 128 + (v - 128) * amount // 40)
    return Image.blend(img, Image.merge('RGB', (noise, noise, noise)), 0.05)


def bouquet(name, size, bgc, flowers, greens, wrapc, ribbon, extra=None, seed=1, count=13, daisies=None, fillc=None, vase=False):
    rnd = random.Random(seed)
    w, h = size
    base = bg(w, h, hex2rgb(bgc[0]), hex2rgb(bgc[1])).convert('RGBA')
    cx = w / 2
    head_cy = h * 0.40
    radius = w * 0.30
    if vase:
        shadow(base, cx, h * 0.88, w * 0.36)
        d = ImageDraw.Draw(base)
        vc = hex2rgb(wrapc)
        d.rounded_rectangle([cx - w * 0.28, h * 0.70, cx + w * 0.28, h * 0.87], radius=int(w * 0.06), fill=vc + (255,))
        d.rectangle([0, h * 0.875, w, h], fill=mix(hex2rgb(bgc[1]), (90, 70, 55), 0.25) + (255,))
        head_cy = h * 0.52; radius = w * 0.36
    else:
        shadow(base, cx, h * 0.93, w * 0.22)
    for _ in range(count + 8):
        a = rnd.uniform(0, 360)
        dist = rnd.uniform(radius * 0.6, radius * 1.05)
        leaf(base, cx + math.cos(math.radians(a)) * dist, head_cy + math.sin(math.radians(a)) * dist * 0.85,
             w * rnd.uniform(0.07, 0.11), -a + rnd.uniform(-25, 25), hex2rgb(rnd.choice(greens)))
    if fillc:
        filler(base, cx, head_cy, radius * 0.75, hex2rgb(fillc), 260, rnd, w * 0.008)
    pts = []
    for i in range(count):
        for _ in range(40):
            a = rnd.uniform(0, 2 * math.pi); dist = radius * math.sqrt(rnd.uniform(0, 1)) * 0.82
            x = cx + math.cos(a) * dist; y = head_cy + math.sin(a) * dist * 0.85
            if all((x - px) ** 2 + (y - py) ** 2 > (w * 0.1) ** 2 for px, py in pts):
                break
        pts.append((x, y))
    pts.sort(key=lambda p: p[1])
    for i, (x, y) in enumerate(pts):
        if daisies and i % 3 == 1:
            daisy(base, x, y, w * rnd.uniform(0.065, 0.08), hex2rgb(daisies[0]), hex2rgb(daisies[1]), rnd)
        else:
            rose(base, x, y, w * rnd.uniform(0.072, 0.09), hex2rgb(rnd.choice(flowers)), rnd)
    if extra:
        filler(base, cx, head_cy - radius * 0.1, radius * 0.6, hex2rgb(extra), 70, rnd, w * 0.006)
    if not vase:
        wrap(base, w, h, hex2rgb(wrapc), hex2rgb(ribbon), cx, head_cy + radius * 0.55, h * 0.95, w * 0.30)
    img = base.convert('RGB').filter(ImageFilter.GaussianBlur(0.6))
    img = grain(img, rnd)
    img.save(os.path.join(OUT, name + '.png'), optimize=True)
    print('saved', name, img.size)


def find_font(names, size):
    for name in names:
        found = glob.glob('/usr/share/fonts/**/' + name, recursive=True)
        if found:
            return ImageFont.truetype(found[0], size)
    return None


CARD = (1000, 1250)
BIG = (1500, 1875)
G = ['#4f6b4a', '#6b8a5c', '#3e5a40', '#87a07a']

bouquet('red-romance', CARD, ('#efe6dc', '#e2d3c3'), ['#b3132c', '#9e0f25', '#c8233b'], G, '#f4ece2', '#641d32', seed=11)
bouquet('pink-dream', CARD, ('#f6ebe8', '#ecd8d3'), ['#e79aac', '#f0b6c3', '#d97f95'], G, '#fbf3f1', '#d98fa0', seed=22, fillc='#ffffff')
bouquet('white-elegance', CARD, ('#d9cbbb', '#c7b5a2'), ['#f7f2ea', '#efe7da', '#fffaf3'], ['#4b6a4d', '#5f7d5a', '#3a553d', '#7d9877'], '#ffffff', '#c9b59c', seed=33, count=11)
bouquet('summer-mood', CARD, ('#f7efe0', '#efdfc6'), ['#f2a33a', '#f27c4a', '#f5c043'], G, '#c9a57a', '#8a5a33', seed=44, daisies=('#fffdf6', '#e0a320'))
bouquet('royal-roses', CARD, ('#e9ddd3', '#d6c2b4'), ['#5c0f22', '#6e1429', '#4a0b1b'], ['#2f4632', '#3c5a3f', '#4f6b4a'], '#2b2523', '#c9a45c', seed=55, count=17)
bouquet('tenderness', CARD, ('#f7eeea', '#efe0d8'), ['#f2c9bd', '#f6d8cc', '#e9b4a7'], G, '#fdf8f4', '#e8cfcf', seed=66, fillc='#fbf6ef')
bouquet('hero', BIG, ('#efe4dc', '#e4d2c6'), ['#641d32', '#8a2c45', '#e8cfcf', '#f4e9df', '#c9798c'], G, '#f6efe6', '#641d32', seed=77, count=19, extra='#fffaf3')
bouquet('about', BIG, ('#eee5da', '#e0d1c0'), ['#e8cfcf', '#f4e9df', '#c9798c', '#a43a55'], G, '#d8c6b2', '#641d32', seed=88, count=16, vase=True, fillc='#fbf6ef')

# OG-изображение 1200x630
og = bg(1200, 630, hex2rgb('#f8f5f0'), hex2rgb('#efe6dc'))
hero = Image.open(os.path.join(OUT, 'hero.png')).resize((504, 630))
og.paste(hero, (696, 0))
d = ImageDraw.Draw(og)
serif = find_font(['LiberationSerif-Regular.ttf', 'DejaVuSerif.ttf'], 92)
sans = find_font(['LiberationSans-Regular.ttf', 'DejaVuSans.ttf'], 30)
if serif and sans:
    d.text((80, 210), 'VELORA', font=serif, fill=hex2rgb('#252321'))
    d.text((84, 320), 'F L O W E R S', font=sans, fill=hex2rgb('#641d32'))
    d.text((84, 400), 'Авторские букеты · Алматы', font=sans, fill=hex2rgb('#665e57'))
else:
    print('Шрифты не найдены — OG-изображение без текста')
os.makedirs(os.path.dirname(os.path.abspath(OG_PATH)), exist_ok=True)
og.save(OG_PATH, quality=82, optimize=True, progressive=True)
print('og done', OG_PATH)
