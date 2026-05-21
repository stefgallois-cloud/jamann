import subprocess
import sys
from pathlib import Path


def stabilize(input_path):
    input_file = Path(input_path)

    if not input_file.exists():
        print(f"Fichier introuvable : {input_file}")
        sys.exit(1)

    output_file = input_file.parent / f"{input_file.stem}_stabilized{input_file.suffix}"

    print("Stabilisation + nettete en cours...")
    subprocess.run([
        "ffmpeg", "-y", "-i", str(input_file),
        "-vf", "deshake,unsharp=5:5:0.8:3:3:0.4",
        "-c:v", "libx264", "-crf", "18", "-preset", "fast",
        "-c:a", "copy",
        str(output_file)
    ], check=True)

    print(f"\nTermine ! Fichier sauvegarde : {output_file}")


if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage : python stabilize.py <chemin_vers_ta_video.mp4>")
        sys.exit(1)

    stabilize(sys.argv[1])
