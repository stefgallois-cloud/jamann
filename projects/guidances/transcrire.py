import subprocess
import sys
import os

print("=" * 50)
print("  TRANSCRIPTION WHISPER - Guidance")
print("=" * 50)

script_dir = os.path.dirname(os.path.abspath(__file__))
audio_file = os.path.join(script_dir, "Guidance Stephanie 20.03.26 (1).m4a")

# Si le fichier avec accent existe, on l'utilise
audio_accented = os.path.join(script_dir, "Guidance Stéphanie 20.03.26 (1).m4a")
if os.path.exists(audio_accented):
    audio_file = audio_accented
    print(f"Fichier trouve : {audio_accented}")
elif os.path.exists(audio_file):
    print(f"Fichier trouve : {audio_file}")
else:
    print("ERREUR : fichier audio introuvable")
    input("Entree pour quitter...")
    sys.exit(1)

print("\n[1/2] Chargement de whisper...")
try:
    import whisper
except ImportError:
    print("Installation de whisper...")
    subprocess.run([sys.executable, "-m", "pip", "install", "openai-whisper", "-q"])
    import whisper

print("[2/2] Transcription en cours (20-40 min)...")
print("Patience...\n")

model = whisper.load_model("small")
result = model.transcribe(audio_file, language="fr", fp16=False, verbose=True)

# Ecriture du fichier de sortie avec un chemin simple sans accents
output_path = os.path.join(script_dir, "transcription_guidance.txt")
with open(output_path, "w", encoding="utf-8") as f:
    f.write(result["text"])

print("\n" + "=" * 50)
print("  TERMINE !")
print(f"  Fichier cree : {output_path}")
print("=" * 50)
input("\nEntree pour fermer...")
