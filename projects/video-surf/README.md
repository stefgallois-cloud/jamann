# Video Surf — Traitement automatique

Stabilisation et amélioration de la netteté pour vidéos de surf filmées au zoom.

## Statut
En cours — script de stabilisation v1

## Stack
- Python
- FFmpeg (vidstab)

## Usage
```
python stabilize.py ma_video.mp4
```
La vidéo corrigée est sauvegardée dans le même dossier avec le suffixe `_stabilized`.

## Paramètres clés
- `shakiness=10` — sensibilité max pour détecter les tremblements
- `accuracy=15` — précision d'analyse maximale
- `smoothing=30` — lissage fort, adapté au zoom longue distance
- `unsharp` — amélioration de la netteté après stabilisation

## Note
Stabilisation en 2 passes via `vidstab` (plus efficace que `deshake`).
Le script se place automatiquement dans le bon dossier pour éviter les problèmes de chemin.
