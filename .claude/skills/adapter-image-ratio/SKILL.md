# Skill — Adapter une image à un ratio de conteneur contraint

## Quand utiliser ce skill

Une image générée (IA — Nano Banana, Midjourney, DALL-E...) doit remplir un conteneur
CSS (hero plein écran, bannière de carte, header) dont le ratio réel est très différent
du ratio disponible côté génération (1:1, 4:3, 3:2, 16:9, 9:16 — les générateurs IA
n'offrent quasiment jamais de ratio "panoramique" custom comme 3:1 ou 21:9).

Symptôme typique : `background-size: cover` coupe le sujet (tête, éléments en haut/bas
ou sur les côtés) ; `background-size: contain` laisse l'image minuscule au milieu d'un
grand vide. Aucun réglage CSS seul ne résout ce problème — c'est un problème de contenu,
pas de CSS.

## Principe

1. **Ne jamais deviner le ratio du conteneur.** Le mesurer réellement (`getBoundingClientRect`
   dans le navigateur, aux breakpoints qui comptent — mobile, laptop, desktop large). Un hero
   plein écran change radicalement de ratio entre mobile (souvent < 1:1, portrait) et desktop
   (souvent 2.5:1 à 3:1+). Une carte de liste peut atteindre 6:1 à 8:1 selon la grille.

2. **Détecter la zone de contenu utile**, pas garder toute l'image brute (marges inutiles
   du fond gaspillent de la place). `extend_canvas.py` détecte la bounding box par masque
   de couleur (traits clairs/violets sur fond pastel — adapter le masque si palette différente).

3. **Construire un nouveau canevas au ratio qui correspond au cas D'AFFICHAGE DOMINANT**
   (généralement desktop, le plus vu), avec un **dégradé de fond étendu en continuité**
   du dégradé source (jamais un aplat plat qui tranche visuellement).

4. **Dimensionner le contenu avec une marge de sécurité calculée**, pas à l'œil : la formule
   `visible_fraction = canvas_ratio / worst_container_ratio` donne la fraction de hauteur
   garantie visible sous `cover` dans le pire cas mesuré. Soustraire une marge (~10-15%)
   pour absorber les résolutions non testées.

5. **Séparer les cas extrêmes par media query CSS plutôt que de forcer un seul asset
   à tout couvrir.** Concrètement : `cover` pour la plage desktop dominante (le nouveau
   canevas est déjà bien fitté, rognage minime en haut/bas seulement), `contain` pour
   mobile portrait (jamais de rognage, juste un peu de fond au-dessus/dessous). Ne pas
   sacrifier la taille du contenu sur desktop pour sécuriser un cas mobile déjà couvert
   par `contain` séparément.

6. **Toujours simuler le recadrage réel avant de livrer** avec `simulate_crop.py`, aux
   dimensions exactes mesurées à l'étape 1 — jamais se fier au calcul seul. Regarder le
   résultat (`Read` l'image générée) avant de dire que c'est bon.

## Erreur classique à éviter

Sur-sécuriser en dimensionnant le contenu pour le pire cas de TOUS les breakpoints
confondus (ex: mobile portrait ET desktop ultra-wide dans le même calcul) → le contenu
devient minuscule alors qu'un seul de ces cas (mobile) était de toute façon géré par
`contain` séparément et n'avait pas besoin de cette marge. Calculer la marge de sécurité
**uniquement sur la plage réellement couverte par `cover`**.

## Utilisation

```bash
# 1. Mesurer le conteneur réel (dans le navigateur / preview)
#    ex: desktop 1920x626 (ratio 3.07), laptop 1366x445 (ratio 3.07), ultra-wide 2560x626 (ratio 4.09)

# 2. Générer le canevas adapté
python .claude/skills/adapter-image-ratio/extend_canvas.py \
    assets/source.jpg assets/source-banner.jpg \
    --canvas-ratio 3.0 \
    --worst-container-ratio 4.0 \
    --safety-margin 0.12

# 3. Vérifier par simulation aux dimensions réelles (desktop, laptop, ultra-wide, mobile)
python .claude/skills/adapter-image-ratio/simulate_crop.py assets/source-banner.jpg \
    --mode cover --width 1920 --height 626 --out /tmp/sim_desktop.jpg
python .claude/skills/adapter-image-ratio/simulate_crop.py assets/source-banner.jpg \
    --mode contain --width 375 --height 471 --out /tmp/sim_mobile.jpg --bgcolor 251,222,229

# 4. Lire les fichiers sim_*.jpg avant de dire que c'est prêt
```

## CSS correspondant (exemple)

```css
.hero-bg { background-size: cover; background-position: center; }

@media (max-width: 768px) {
  .hero-bg { background-size: contain !important; background-repeat: no-repeat; background-color: #fbdee5; }
}
```

## Historique — projet Françoise Davenas (francoise-V3)

Ce skill est né d'un cas concret : illustration TCC/Schémathérapie générée en 16:9 par
Nano Banana, à placer dans un hero plein écran (ratio ~3:1 desktop, portrait mobile) et
une carte de liste homepage (ratio jusqu'à 8,5:1). Deux assets recomposés distincts ont
été nécessaires (`tcc-hero-banner.jpg` pour le hero, `tcc-card-banner.jpg` pour la carte)
car les plages de ratio à couvrir étaient trop différentes pour un seul fichier.
