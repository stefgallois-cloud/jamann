#!/usr/bin/env python3
"""
Adapte une image source (générée dans un ratio fixe par un outil IA — 1:1, 4:3, 16:9...)
à un conteneur CSS de ratio très différent, SANS jamais recadrer le sujet.

Principe : détecter la zone de contenu utile, construire un nouveau canevas au ratio cible
avec un fond dégradé étendu (continuité du fond source, pas un aplat qui tranche), coller
le contenu à une échelle garantissant 0 rognage même dans le pire cas de background-size:cover.

Usage :
    python extend_canvas.py source.jpg output.jpg \
        --canvas-ratio 3.0 \
        --worst-container-ratio 3.8 \
        --safety-margin 0.12

Toujours vérifier ensuite avec simulate_crop.py aux dimensions RÉELLES du conteneur
(mesurées via getBoundingClientRect, jamais devinées) avant de livrer.
"""
import argparse
from PIL import Image
import numpy as np


def detect_content_bbox(im, pad=6):
    """Détecte la bounding box du contenu (traits blancs/violets sur fond pastel).
    Ajuster white_mask/purple_mask si la palette de l'image diffère."""
    arr = np.array(im.convert('RGB')).astype(int)
    r, g, b = arr[:, :, 0], arr[:, :, 1], arr[:, :, 2]
    white_mask = (r > 235) & (g > 235) & (b > 235)
    purple_mask = (b - r > 15) & (r < 230)
    content_mask = white_mask | purple_mask
    rows = np.where(content_mask.any(axis=1))[0]
    cols = np.where(content_mask.any(axis=0))[0]
    top = max(0, int(rows.min()) - pad)
    left = max(0, int(cols.min()) - pad)
    bottom = min(im.size[1] - 1, int(rows.max()) + pad)
    right = min(im.size[0] - 1, int(cols.max()) + pad)
    return im.crop((left, top, right + 1, bottom + 1))


def sample_gradient_endpoints(im, sample_y=8):
    """Échantillonne le dégradé de fond sur une ligne proche du bord (hors contenu)."""
    arr = np.array(im.convert('RGB'))
    row = arr[sample_y, :, :]
    return tuple(int(v) for v in row[0]), tuple(int(v) for v in row[-1])


def build_canvas(content, canvas_w, canvas_h, c_left, c_right, content_frac):
    """Construit le canevas final : dégradé horizontal étendu + contenu centré,
    dimensionné pour occuper au plus `content_frac` de la hauteur du canevas."""
    canvas = Image.new('RGB', (canvas_w, canvas_h))
    px = canvas.load()
    for x in range(canvas_w):
        t = x / (canvas_w - 1)
        col = tuple(int(c_left[i] + (c_right[i] - c_left[i]) * t) for i in range(3))
        for y in range(canvas_h):
            px[x, y] = col

    target_h = canvas_h * content_frac
    scale = target_h / content.size[1]
    new_w, new_h = int(content.size[0] * scale), int(content.size[1] * scale)
    content_resized = content.resize((new_w, new_h), Image.LANCZOS)
    paste_x = (canvas_w - new_w) // 2
    paste_y = (canvas_h - new_h) // 2
    canvas.paste(content_resized, (paste_x, paste_y))
    return canvas


def safe_content_fraction(canvas_ratio, worst_container_ratio, safety_margin=0.1):
    """Fraction de hauteur (ou largeur, selon le sens du recadrage) que le contenu
    peut occuper sans jamais être rogné par background-size:cover, avec marge de sécurité.

    Formule : visible_fraction = canvas_ratio / container_ratio (si container plus plat que canvas).
    On soustrait une marge de sécurité pour absorber les cas non mesurés (résolutions inhabituelles).
    """
    visible_fraction = min(1.0, canvas_ratio / worst_container_ratio)
    return max(0.1, visible_fraction - safety_margin)


def main():
    p = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    p.add_argument('source')
    p.add_argument('output')
    p.add_argument('--canvas-width', type=int, default=2400)
    p.add_argument('--canvas-ratio', type=float, required=True,
                    help="Ratio largeur/hauteur du canevas final (proche du ratio DOMINANT du conteneur cible)")
    p.add_argument('--worst-container-ratio', type=float, required=True,
                    help="Ratio le PLUS PLAT observé pour le conteneur (ex: 3.8 pour un hero sur écran ultra-wide)")
    p.add_argument('--safety-margin', type=float, default=0.12,
                    help="Marge de sécurité soustraite à la fraction de contenu visible (défaut 0.12)")
    p.add_argument('--quality', type=int, default=88)
    args = p.parse_args()

    im = Image.open(args.source)
    content = detect_content_bbox(im)
    c_left, c_right = sample_gradient_endpoints(im)

    canvas_w = args.canvas_width
    canvas_h = int(canvas_w / args.canvas_ratio)
    content_frac = safe_content_fraction(args.canvas_ratio, args.worst_container_ratio, args.safety_margin)

    canvas = build_canvas(content, canvas_w, canvas_h, c_left, c_right, content_frac)
    canvas.save(args.output, 'JPEG', quality=args.quality, optimize=True)

    print(f"Canevas: {canvas_w}x{canvas_h} (ratio {args.canvas_ratio})")
    print(f"Contenu source (bbox): {content.size}")
    print(f"Fraction de hauteur occupée par le contenu: {content_frac:.2%}")
    print(f"Sauvé: {args.output}")


if __name__ == '__main__':
    main()
