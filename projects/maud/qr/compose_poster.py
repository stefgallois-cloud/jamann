from PIL import Image, ImageDraw, ImageFont
from pathlib import Path

SRC_POSTER = Path(r"c:\Users\DELL\Desktop\maud_workspace\visuel2.png")
QR_PATH = Path(__file__).parent / "qr-woof-and-walk-hires.png"
OUT_DIR = Path(__file__).parent
OUT_POSTER = OUT_DIR / "affiche-avec-qr.png"

poster = Image.open(SRC_POSTER).convert("RGBA")
W, H = poster.size

# 1. Échantillonne la couleur du fond (coin haut-gauche, zone parchemin)
sample = poster.crop((W // 2 - 30, 10, W // 2 + 30, 40)).convert("RGB")
pixels = list(sample.getdata())
avg_bg = tuple(sum(c) // len(pixels) for c in zip(*pixels)) + (255,)

# 2. Étend le canvas vers le bas pour héberger le QR sans rien recouvrir
band_h = int(H * 0.22)
new_h = H + band_h
canvas = Image.new("RGBA", (W, new_h), avg_bg)
canvas.paste(poster, (0, 0), poster)

# 3. Prépare le QR
qr = Image.open(QR_PATH).convert("RGBA")
qr_size = int(band_h * 0.78)
qr = qr.resize((qr_size, qr_size), Image.LANCZOS)

# 4. Place QR à droite de la bande
margin_x = int(W * 0.05)
qr_x = W - qr_size - margin_x
qr_y = H + (band_h - qr_size) // 2
canvas.paste(qr, (qr_x, qr_y), qr)

# 5. Texte d'accroche à gauche du QR
draw = ImageDraw.Draw(canvas)
try:
    font_big = ImageFont.truetype("georgiab.ttf", int(band_h * 0.18))
    font_url = ImageFont.truetype("georgia.ttf", int(band_h * 0.11))
    font_sub = ImageFont.truetype("georgia.ttf", int(band_h * 0.09))
except OSError:
    font_big = ImageFont.load_default()
    font_url = ImageFont.load_default()
    font_sub = ImageFont.load_default()

text_color = (60, 75, 50, 255)
sub_color = (110, 110, 95, 255)

title = "Réservez en ligne"
subtitle = "Scannez le QR code avec votre téléphone"
url = "woof-and-walk-lausanne.netlify.app"

text_x = int(W * 0.08)
center_y = H + band_h // 2

b1 = draw.textbbox((0, 0), title, font=font_big)
b2 = draw.textbbox((0, 0), subtitle, font=font_sub)
b3 = draw.textbbox((0, 0), url, font=font_url)
h1 = b1[3] - b1[1]
h2 = b2[3] - b2[1]
h3 = b3[3] - b3[1]
gap = int(band_h * 0.04)
total_h = h1 + gap + h2 + gap * 2 + h3

y = center_y - total_h // 2
draw.text((text_x, y - b1[1]), title, fill=text_color, font=font_big)
y += h1 + gap
draw.text((text_x, y - b2[1]), subtitle, fill=sub_color, font=font_sub)
y += h2 + gap * 2
draw.text((text_x, y - b3[1]), url, fill=text_color, font=font_url)

# 6. Fine ligne séparatrice entre l'affiche et la bande QR
sep_y = H + 2
draw.line([(int(W * 0.05), sep_y), (int(W * 0.95), sep_y)], fill=(120, 130, 100, 120), width=2)

canvas.convert("RGB").save(OUT_POSTER, "PNG", optimize=True)
print(f"OK -> {OUT_POSTER} ({canvas.size[0]}x{canvas.size[1]})")
