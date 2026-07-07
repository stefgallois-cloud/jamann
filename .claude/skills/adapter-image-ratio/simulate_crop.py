#!/usr/bin/env python3
"""
Simule le rendu réel de background-size:cover / contain à des dimensions de
conteneur précises, pour vérifier AVANT livraison qu'aucun contenu n'est coupé.

Ne jamais livrer une image adaptée sans avoir fait tourner cette simulation
aux dimensions RÉELLES du conteneur (mesurées en previewant le site, pas devinées).

Usage :
    python simulate_crop.py image.jpg --mode cover --width 1920 --height 626 --out sim.jpg
    python simulate_crop.py image.jpg --mode contain --width 375 --height 471 --out sim.jpg --bgcolor 251,222,229
"""
import argparse
from PIL import Image


def simulate_cover(container_w, container_h, img):
    iw, ih = img.size
    scale = max(container_w / iw, container_h / ih)
    new_w, new_h = int(iw * scale), int(ih * scale)
    resized = img.resize((new_w, new_h), Image.LANCZOS)
    left = (new_w - container_w) // 2
    top = (new_h - container_h) // 2
    return resized.crop((left, top, left + container_w, top + container_h))


def simulate_contain(container_w, container_h, img, bgcolor=(255, 255, 255)):
    iw, ih = img.size
    scale = min(container_w / iw, container_h / ih)
    new_w, new_h = int(iw * scale), int(ih * scale)
    resized = img.resize((new_w, new_h), Image.LANCZOS)
    canvas = Image.new('RGB', (container_w, container_h), bgcolor)
    canvas.paste(resized, ((container_w - new_w) // 2, (container_h - new_h) // 2))
    return canvas


def main():
    p = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    p.add_argument('image')
    p.add_argument('--mode', choices=['cover', 'contain'], required=True)
    p.add_argument('--width', type=int, required=True)
    p.add_argument('--height', type=int, required=True)
    p.add_argument('--out', required=True)
    p.add_argument('--bgcolor', default='255,255,255', help="R,G,B pour le mode contain")
    args = p.parse_args()

    im = Image.open(args.image)
    if args.mode == 'cover':
        result = simulate_cover(args.width, args.height, im)
    else:
        bg = tuple(int(v) for v in args.bgcolor.split(','))
        result = simulate_contain(args.width, args.height, im, bg)

    result.save(args.out, 'JPEG', quality=90)
    print(f"{args.mode} @ {args.width}x{args.height} -> {args.out}")


if __name__ == '__main__':
    main()
