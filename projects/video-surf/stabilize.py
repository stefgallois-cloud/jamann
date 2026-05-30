import subprocess
import sys
from pathlib import Path


def stabilize(input_path):
    input_file = Path(input_path)

    if not input_file.exists():
        print(f"Fichier introuvable : {input_file}")
        sys.exit(1)

    trf_file = input_file.parent / "transforms.trf"
    output_file = input_file.parent / f"{input_file.stem}_stabilized{input_file.suffix}"

    # Passe 1 — analyse des tremblements
    print("Passe 1 — analyse...")
    subprocess.run([
        "ffmpeg", "-y", "-i", str(input_file),
        "-vf", f"vidstabdetect=shakiness=10:accuracy=15:result={trf_file.name}",
        "-f", "null", "-"
    ], check=True, cwd=str(input_file.parent))

    # Passe 2 — stabilisation + netteté
    print("Passe 2 — stabilisation + nettete...")
    subprocess.run([
        "ffmpeg", "-y", "-i", str(input_file),
        "-vf", f"vidstabtransform=smoothing=30:input={trf_file.name},unsharp=5:5:0.8:3:3:0.4",
        "-c:v", "libx264", "-crf", "18", "-preset", "fast",
        "-c:a", "copy",
        str(output_file)
    ], check=True, cwd=str(input_file.parent))

    print(f"\nTermine ! Fichier sauvegarde : {output_file}")


if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage : python stabilize.py <chemin_vers_ta_video.mp4>")
        sys.exit(1)

    stabilize(sys.argv[1])
