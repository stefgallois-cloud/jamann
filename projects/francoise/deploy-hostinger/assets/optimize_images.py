#!/usr/bin/env python3
"""
Optimisation images - Projet Francoise Davenas - Am'Astro
Sauvegarde originaux dans _originals/, optimise PNG et convertit photos en JPEG
"""

from PIL import Image
import os
import shutil
from pathlib import Path

IMAGES_TO_PROCESS = {
    'nouveau-logo-sansfond.png': {'mode': 'png', 'max_width': 1200},
    'orchideeV2.png': {'mode': 'png', 'max_width': 1200},
    'Portrait_francoise_V3.png': {'mode': 'jpeg', 'quality': 85, 'max_width': 1200},
    'photo-psycho.png': {'mode': 'jpeg', 'quality': 85, 'max_width': 1200},
    'photo-astro-psycho.png': {'mode': 'jpeg', 'quality': 85, 'max_width': 1200},
}

def get_file_size(path):
    """Retourne la taille en MB"""
    if os.path.exists(path):
        return os.path.getsize(path) / (1024 * 1024)
    return 0

def create_backup_dir():
    backup_dir = '_originals'
    if not os.path.exists(backup_dir):
        os.makedirs(backup_dir)
    return backup_dir

def backup_original(filename, backup_dir):
    src = filename
    dst = os.path.join(backup_dir, filename)
    if os.path.exists(src) and not os.path.exists(dst):
        shutil.copy2(src, dst)
        print(f"  [OK] Sauvegarde : {dst}")

def optimize_png(filename, max_width=1200):
    try:
        img = Image.open(filename)

        if img.width > max_width:
            ratio = max_width / img.width
            new_height = int(img.height * ratio)
            img = img.resize((max_width, new_height), Image.Resampling.LANCZOS)

        if img.mode in ('RGBA', 'LA', 'P'):
            img_rgb = Image.new('RGB', img.size, (255, 255, 255))
            if img.mode != 'P':
                img_rgb.paste(img, mask=img.split()[-1])
            else:
                img_rgb.paste(img)
            img_p = img_rgb.quantize(colors=256)
            img = img_p.convert('RGBA') if 'A' in str(img.mode) else img_p.convert('RGB')
        else:
            img = img.quantize(colors=256)

        img.save(filename, 'PNG', optimize=True)
        print(f"  [OK] Optimise PNG : {filename}")
        return True
    except Exception as e:
        print(f"  [ERR] PNG {filename}: {e}")
        return False

def convert_to_jpeg(filename, quality=85, max_width=1200):
    try:
        img = Image.open(filename)

        if img.width > max_width:
            ratio = max_width / img.width
            new_height = int(img.height * ratio)
            img = img.resize((max_width, new_height), Image.Resampling.LANCZOS)

        if img.mode in ('RGBA', 'LA', 'P'):
            rgb_img = Image.new('RGB', img.size, (255, 255, 255))
            if img.mode != 'P':
                rgb_img.paste(img, mask=img.split()[-1])
            else:
                rgb_img.paste(img)
            img = rgb_img

        name_without_ext = os.path.splitext(filename)[0]
        new_filename = f"{name_without_ext}.jpg"

        img.save(new_filename, 'JPEG', quality=quality, optimize=True)
        print(f"  [OK] Converti JPEG : {new_filename}")
        return new_filename
    except Exception as e:
        print(f"  [ERR] JPEG {filename}: {e}")
        return None

def main():
    print("\n" + "="*70)
    print("  OPTIMISATION IMAGES - Francoise Davenas")
    print("="*70 + "\n")

    backup_dir = create_backup_dir()
    results = []

    for filename, config in IMAGES_TO_PROCESS.items():
        if not os.path.exists(filename):
            print(f"[SKIP] Fichier introuvable : {filename}")
            continue

        size_before = get_file_size(filename)
        print(f"\n[PROCESS] {filename} ({size_before:.1f} MB)")

        backup_original(filename, backup_dir)

        output_filename = filename
        if config['mode'] == 'png':
            optimize_png(filename, config.get('max_width', 1200))
        elif config['mode'] == 'jpeg':
            output_filename = convert_to_jpeg(
                filename,
                quality=config.get('quality', 85),
                max_width=config.get('max_width', 1200)
            )
            if not output_filename:
                continue

        size_after = get_file_size(output_filename)
        reduction = ((size_before - size_after) / size_before * 100) if size_before > 0 else 0

        results.append({
            'original': filename,
            'output': output_filename,
            'before': size_before,
            'after': size_after,
            'reduction': reduction
        })

    print("\n" + "="*70)
    print("  RESUME OPTIMISATIONS")
    print("="*70)
    print(f"\n{'Fichier':<35} {'Avant':<12} {'Apres':<12} {'Gain':<10}")
    print("-" * 70)

    total_before = 0
    total_after = 0

    for r in results:
        total_before += r['before']
        total_after += r['after']
        print(f"{r['original']:<35} {r['before']:>6.1f} MB   {r['after']:>6.1f} MB   {r['reduction']:>6.1f}%")

    print("-" * 70)
    total_reduction = ((total_before - total_after) / total_before * 100) if total_before > 0 else 0
    print(f"{'TOTAL':<35} {total_before:>6.1f} MB   {total_after:>6.1f} MB   {total_reduction:>6.1f}%")
    print("\n[OK] Optimisation terminees!")
    print(f"[BACKUP] Originaux sauvegardes dans : {backup_dir}/")
    print("\nPROCHAINES ETAPES MANUELLES:")
    print("  1. Verifier visuellement sur http://localhost:8003")
    print("  2. Mettre a jour HTML : Portrait_francoise_V3.png -> .jpg dans index.html")
    print("  3. Mettre a jour HTML : photo-psycho.png -> .jpg dans ateliers-astrologiques.html")
    print("\n")

if __name__ == '__main__':
    main()
