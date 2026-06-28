---
name: cinematic-site-flythrough
description: >
  Pilote la création d'un hero vidéo IA cinématique de type "fly-through" (caméra
  continue drone → intérieur, scroll-scrub) pour le site web de N'IMPORTE QUEL
  business, via Nano Banana 2 (Google Flow) pour les images + Seedance 2 pour la vidéo
  + un moteur scroll-scrub canvas vanilla.
  C'est l'étape 4 du kit "site cinématique avec Claude Code". Adaptatif : immobilier,
  resto, marque produit, SaaS, agence, coaching. Encode LA règle non négociable
  (frame de fin générée en IMAGE-TO-IMAGE depuis la frame de départ, jamais en
  texte seul) pour éviter le morph. Déclencheurs FR : "fly-through", "flythrough",
  "hero vidéo cinématique", "vidéo IA pour mon site", "caméra qui rentre dans",
  "site cinématique", "scrollytelling vidéo",
  "frame de départ / frame de fin", "génère la vidéo du hero", "drone qui rentre".
  Déclencheurs EN : "cinematic fly-through", "scroll-scrub hero video",
  "AI hero video for my site", "Seedance fly-through".
---

# Cinematic Site Fly-Through — créer un hero vidéo IA fidèle (sans morph)

Tu pilotes Claude Code pour produire un **hero vidéo cinématique** : une caméra
continue (drone qui s'approche → entre dans un lieu/sujet) que le visiteur fait
défiler au scroll (scroll-scrub). C'est l'effet du site immobilier de luxe
"Penthouse Horizon" — mais ce skill l'adapte à **ton** business.

Tu ne codes pas. Tu **diriges Claude Code en langage naturel**, et ce skill lui
donne la recette exacte + les pièges déjà payés pour ne pas les repayer.

**Stack utilisé :**
- **Images** (frame départ, frame fin, images de sections) → **Nano Banana 2** via **Google Flow** (flow.google.com)
- **Vidéo** (le clip fly-through) → **Seedance 2** via ta plateforme d'abonnement

> Ce skill couvre **l'étape 4** du kit (le fly-through). Les étapes 1-3
> (install des skills, prompt de clarification + charte graphique, copywriting +
> mise en page) et 5-6 (assemblage du site, modifications finales) sont gérées
> par les autres pièces du kit. Ici on fabrique la vidéo et on la branche au site.

---

## 🔴 LA RÈGLE D'OR (à lire avant tout)

```
╔══════════════════════════════════════════════════════════════════════════╗
║  LA FRAME DE FIN SE GÉNÈRE EN IMAGE-TO-IMAGE À PARTIR DE LA FRAME          ║
║  DE DÉPART (frame départ en image de référence + prompt).                  ║
║  JAMAIS EN TEXTE SEUL.                                                      ║
║                                                                            ║
║  Pourquoi : un prompt texte seul recrée un bâtiment / sujet DIFFÉRENT.     ║
║  Deux images incohérentes → Seedance tente de morpher de l'une à l'autre → ║
║  façade qui se déforme, murs qui ondulent = MORPH = échec.                 ║
║                                                                            ║
║  Une frame de fin dérivée de la frame de départ garde la MÊME identité     ║
║  (même bâtiment, même ciel, même palette) → Seedance fait un simple dolly  ║
║  avant propre. C'est LA leçon du projet. Ne la saute jamais.               ║
╚══════════════════════════════════════════════════════════════════════════╝
```

**Vérité morph (honnête)** : la vidéo IA n'a pas de modèle 3D de la scène, elle
ré-invente chaque frame par diffusion. Donc **le zéro-morph absolu est impossible**.
On ne supprime pas le morph, on le **masque** : start + end cohérents (image-to-image)
+ une approche caméra rapide font que le micro-morph passe inaperçu.

---

## 🔴 Corollaire de la règle d'or — le i2i NE SUFFIT PAS (leçon 2026-06-05)

Générer la frame de fin en image-to-image garde l'**identité** (même bâtiment),
mais **ne protège PAS du morph** si la frame de fin diverge autrement. Deux pièges
payés en vrai, distincts de l'identité :

1. **Saut de point de vue.** Si la fin change l'angle / l'élévation de façon marquée
   (drone haut → niveau du sol, rotation) alors que le départ était loin et haut,
   Seedance doit réinventer la perspective frame par frame → la façade ondule.
   → La fin = **RAPPROCHÉ sur le MÊME axe** (même angle, même élévation), pas un
   nouveau plan.

2. **Élément architectural nouveau.** Si la fin introduit une ouverture / porte /
   baie **absente du départ** (ex. une grande fenêtre carrée là où le départ n'avait
   que des fentes), Seedance fait muter la façade pour la fabriquer en vol → déformation.
   → La fin ne montre **que des éléments déjà présents** dans le départ, juste plus
   près. Aucun élément inventé.

🔴 **Le prompt de la frame de fin est LE levier** — il doit verrouiller la fidélité
explicitement, pas juste « rapproche la caméra ». Formulation testée :

```
Use the reference image as ABSOLUTE GROUND TRUTH. Keep the building 100% identical:
same structure, same facade, same openings in the same positions, same proportions,
same materials, same sky/setting, same palette. Do NOT redesign. Do NOT add, remove,
move or resize ANY window, door, wall or structural element. Do NOT change geometry
or proportions. The ONLY change is the camera: it moved CLOSER on the SAME axis
(same angle, same elevation), so the subject fills more of the frame. [Option: through
existing glazing, softly glimpse the interior at natural scale.] Exterior razor-sharp,
rigid, unchanged. Photoreal, 16:9, no people, no text, no warping, no morphing.
```

⚠️ **QC anti-morph = frames DENSES, pas 5 espacées.** Une déformation au scroll est
un morph *inter-frames* : lis **8 à 12 frames** réparties pour la voir. 5 frames
espacées peuvent déclarer « OK » un clip qui ondule en réalité.

---

## ⚙️ Setup & accès outils (à vérifier AVANT de lancer)

| Outil | À quoi ça sert | Vérifier | Installer |
|---|---|---|---|
| **Google Flow** (flow.google.com) | générer les images (frame départ, frame fin, images de sections) | connecté avec ton compte Google abonné | rien à installer — interface web |
| **Seedance 2** | générer la vidéo fly-through (start+end frame) | accès actif sur ta plateforme | rien à installer — interface web |
| **ffmpeg** | extraire les frames du clip mp4 | `ffmpeg -version` | macOS `brew install ffmpeg` · Windows `winget install Gyan.FFmpeg` · Linux `sudo apt install ffmpeg` |
| **Node.js** | servir le site en local | `node -v` (≥18) | nodejs.org |
| **Un serveur local** | tester le scrub (jamais `file://`) | — | `python -m http.server 4188` **ou** `npx serve` |

🔴 **Ne jamais ouvrir le site en `file://`** : le scrub a besoin d'un vrai
serveur local pour charger les frames. Sers toujours en local (`http://localhost`).

**Workflow général** : tu génères les images dans Google Flow, la vidéo dans Seedance 2,
tu télécharges les fichiers sur ton ordinateur, tu les donnes à Claude Code pour
l'extraction ffmpeg + le branchement au site. **Zéro serveur MCP requis.**

**Coût & temps (honnête)** : vérifie le coût de chaque génération sur tes plans respectifs.
Côté temps : un premier fly-through réussi, c'est réaliste **1 à 2 jours** d'essais,
pas "une soirée".

---

## L'étape 4 en 6 sous-étapes

```
4.1 Brainstorm sujet  →  4.2 FRAME DÉPART (texte→image, Google Flow)
                      →  4.3 FRAME FIN (🔴 image-to-image depuis 4.2, Google Flow)
                      →  4.4 VIDÉO Seedance 2 (start+end)
                      →  4.5 Extraction frames ffmpeg + QC morph
                      →  4.6 Branchement au moteur scroll-scrub
```

---

### 4.1 — Brainstorm : quel sujet de fly-through pour TON business ?

Le fly-through marche pour tout business, à condition de choisir **un sujet
spatial avec une progression "loin → près / dehors → dedans"**. Discute avec le
visiteur pour trouver le sien.

> 🔴 **Source de vérité unique pour la métaphore caméra par secteur = cette
> table.** Les autres pièces du kit (skill copywriting, étapes 3 et 5) **renvoient
> ici** et ne re-proposent PAS de table divergente. Une fois le sujet du vol figé
> à l'étape 2 (brief de clarification), il est **lu** par les étapes 3 et 4 — il
> n'est jamais ré-inventé en aval.

| Business | Sujet de fly-through (départ → fin) |
|---|---|
| **Immobilier** | drone loin de la tour au crépuscule → s'approche → arrive au penthouse |
| **Restaurant** | vue large de la salle / façade → plonge sur une assiette dressée en gros plan (ou entre en cuisine) |
| **Marque produit** | environnement → macro qui se rapproche du produit (texture, matière, détail) |
| **SaaS / agence** | espace abstrait (data, lumière, grille) → se resserre sur l'écran / le dashboard |
| **Coaching / service** | parcours symbolique : un chemin / une porte → traversée → "l'après" lumineux |
| **Hôtel / lieu** | extérieur aérien → entrée → lobby → suite / vue |

Règles de choix :
- **Une seule trajectoire claire**, pas un patchwork de plans sans lien.
- **Progression douce** : on s'approche, on entre — pas un saut de point de vue
  brutal (vue aérienne → gros plan frontal en 5s = morph garanti).
- Le sujet de **fin** = le point où ta proposition de valeur "atterrit" (le
  produit, le plat, le dashboard, l'espace de vie).

🔴 **Logique & échelle du sujet AVANT de générer.** Le sujet doit être **crédible
et à la bonne échelle**. Ancre-le sur des **références réelles** du secteur (cherche
des images de lieux premium réels) pour caler l'échelle : grandes baies + volume +
objets à **taille humaine**, pas une pièce minuscule avec un objet géant. Un sujet
incohérent se voit immédiatement dans le fly-through. Si le départ n'est pas logique,
**régénère-le** — ne tente pas de rattraper en aval.

Formule au visiteur : *« Décris ton lieu/sujet, d'où part la caméra et où elle
arrive. »* Tu en tires un **plan de départ** et un **plan de fin**.

---

### 4.2 — FRAME DÉPART (texte → image, Google Flow)

On génère l'image de départ par texte. Outil : **Google Flow** (flow.google.com),
modèle **Nano Banana 2**, ratio **16:9**, résolution **2k** si disponible.

**Template de prompt (à adapter)** :

```
[Cinematic establishing shot], 16:9, photorealistic, premium editorial mood.
Subject: [DÉCRIS LE SUJET — ex: une tour résidentielle supertall, un plat dressé,
un produit posé, un espace de marque].
Camera: [POINT DE DÉPART — ex: aerial drone, far away, high angle].
Lighting/ambiance: [ex: crépuscule, orange → violet, reflets, lumière douce].
Setting/details: [ex: skyline, fleuve, le penthouse couronné qui glow ; OU la
texture de l'assiette ; OU la matière du produit].
Mood: luxe, retenue, profondeur, grand whitespace. Sharp focus, no text, no logo,
no people, no UI overlay.
```

Exemple immobilier :
> *Aerial cinematic shot at dusk, 16:9, photorealistic. A supertall residential
> tower as the hero, rising over a city skyline beside a river, sky transitioning
> orange to violet, the crowned penthouse at the top softly glowing. Far high
> drone angle. Premium, editorial, no people, no text.*

**Procédure dans Google Flow** :
1. Va sur **flow.google.com**
2. Crée un nouveau projet ou une nouvelle image
3. Sélectionne le modèle **Nano Banana 2** (ou Imagen 3 si Nano Banana 2 n'est pas listé)
4. Colle le prompt, ratio **16:9**, génère
5. Itère jusqu'à ce que tu valides l'image → **télécharge-la** (elle devient ta frame de départ)

**C'est cette image validée qui sert de base à la frame de fin.**

---

### 4.3 — 🔴 FRAME FIN — IMAGE-TO-IMAGE depuis la frame départ (Google Flow)

```
╔══════════════════════════════════════════════════════════════════════════╗
║  ON PASSE LA FRAME DÉPART (4.2) COMME IMAGE DE RÉFÉRENCE                    ║
║  + UN PROMPT QUI DIT "GARDE EXACTEMENT LA MÊME SCÈNE, RAPPROCHE             ║
║  SEULEMENT LA CAMÉRA DE [X]".                                              ║
║  ⛔ INTERDIT : régénérer la frame de fin par un prompt texte seul.          ║
╚══════════════════════════════════════════════════════════════════════════╝
```

**Procédure dans Google Flow (image-to-image)** :
1. Dans Flow, cherche le mode **"image de référence"** ou **"reference image"** /
   **"image to image"** — selon la version de l'interface, ce champ peut s'appeler
   différemment. C'est le champ qui te permet d'**uploader une image existante**
   comme base.
2. **Uploade ta frame départ (4.2)** dans ce champ.
3. Garde le ratio **16:9**.
4. Donne le prompt FRAME FIN ci-dessous.

> ⚠️ **Si Google Flow ne propose pas encore de mode reference image pour Nano
> Banana 2** : utilise Gemini (gemini.google.com) en mode image — uploade la frame
> départ dans le chat et demande "génère une version plus rapprochée de cette image,
> même scène, même lumière, caméra plus proche de [destination]". La règle reste
> identique : la frame départ doit être la BASE, jamais un texte seul.

🔴 Si tu génères sans uploader la frame départ comme référence (prompt texte seul),
tu obtiens un autre bâtiment → morph garanti.

**Template de prompt FRAME FIN (image-to-image)** :

```
Using the reference image, keep EXACTLY the same [building/subject], the SAME
facade/materials, the SAME sky and the SAME color palette — do not invent a new
[building/subject]. Only move the camera CLOSER, to [DESTINATION — ex: the crown
penthouse with the open living-room bay glowing amber / the plated dish in macro /
the product detail / the dashboard screen]. Same lighting, same mood. Photoreal,
16:9, no text, no people.
```

Exemple immobilier :
> *Using the reference image, keep the exact same tower, facade and sky. Move the
> camera closer to the crowned penthouse at the top, open living-room bay glowing
> amber at dusk. Same palette, same mood. Photoreal, 16:9, no people, no text.*

Critère de validation : la frame de fin doit être **manifestement le même lieu**
que le départ, juste plus proche. Si c'est un autre bâtiment →
**recommence l'image-to-image** (ne passe jamais en texte seul pour "réparer").

**Télécharge la frame de fin validée** — tu en auras besoin pour Seedance 2 (4.4).

---

### 🔴 4.3 bis — Destination intérieure : finir AU SEUIL (anti-déformation des meubles)

Cas distinct de la règle d'or. **Même avec une frame de fin image-to-image
cohérente**, si la caméra doit **résoudre des meubles / détails qui n'existaient
pas dans la frame de départ** (la table, le canapé d'un salon, un objet fin qui
"apparaît" pendant l'approche), Seedance les **invente en vol** → ils se **déforment**.
C'est un morph **d'invention de détail** — donc "refaire la fin en image-to-image"
ne le règle pas.

✅ **La solution = ne jamais résoudre le détail intérieur EN MOUVEMENT :**
- Génère la frame de fin = caméra arrivée **AU SEUIL** (devant la baie / porte
  ouverte), l'intérieur = **simple LUEUR chaude, AUCUN meuble net**. Façade et
  cadre restent nets et rigides.
- Le détail (table, canapé, plat, produit) est montré **juste après, en PHOTO
  NETTE**, dans la section éditoriale suivante du site — **pas en vidéo**. 🔴 Cette
  photo est une **image de section** : tu la génères à l'**étape 4 bis** (texte→image
  dans Google Flow), puis tu la poses dans `assets/img/` et tu la branches sur la
  première section éditoriale après le hero.
- Tu gardes l'arrivée spectaculaire **sans aucune déformation**.

Quand l'appliquer : dès que ta destination de fin est un **intérieur meublé / un
détail fin absent du plan de départ**. Si ta fin est déjà "propre" (une façade, un
produit isolé déjà visible au loin), le clip direct suffit.

**Template prompt FRAME FIN "seuil"** (variante de 4.3, toujours en image-to-image) :

```
Using the reference image, keep EXACTLY the same building/subject, facade, sky and
palette. Move the camera closer to the open doorway/threshold. The interior reads
ONLY as a soft warm amber glow — NO resolved furniture, no table, no objects, just
diffuse light. Facade and frame razor-sharp and rigid. Photoreal, 16:9, no people, no text.
```

Et dans le prompt vidéo (4.4), ajoute le verrou : *« the interior stays a soft
glow, never resolving into furniture; all objects rigid and fixed, no warping,
no deformation »*.

---

### 4.4 — VIDÉO Seedance 2 (réglages exacts)

On génère **un seul clip** avec les deux ancres (frame départ + frame fin). Un seul
plan = pas de coutures, c'est volontairement le plus simple/robuste.

**Procédure dans Seedance 2** :
1. Va sur ta plateforme Seedance 2
2. Crée une nouvelle vidéo en mode **start frame + end frame** (image-to-video avec
   deux ancres)
3. Charge la **frame départ (4.2) comme image de début**
4. Charge la **frame fin (4.3) comme image de fin**
5. Durée : **5 secondes**, son **off**
6. Colle le prompt vidéo ci-dessous
7. Génère, puis **télécharge le mp4** et donne-le à Claude Code pour la suite

**Prompt vidéo (mouvement caméra UNIQUEMENT + verrou d'identité)** :

```
First-person camera slowly flying [forward / down toward X], approaching
[DESTINATION]. The architecture/subject and materials stay EXACTLY the same —
never changing shape, never morphing, never reconfiguring. Only the camera moves.
No warping, no morphing, no people, no cuts, no text.
```

Sortie attendue : ~1920×1080, 24 fps, ≈ 121 frames pour 5s.

> **Variante avancée (journey plus long)** : au lieu d'un seul clip, on **chaîne**
> plusieurs clips. Règle du chaînage : on extrait la **vraie dernière frame** du
> clip N (`ffmpeg -sseof -0.1 -i clipN.mp4 -vframes 1 out.png`), et on l'utilise
> comme **start frame SEUL** (pas d'end frame) du clip N+1. On répartit un gros
> changement de point de vue sur **plusieurs clips doux**. Pour un premier
> fly-through, **reste sur le clip unique**.

---

### 4.4 bis — Rapatrier les fichiers sur le disque

Avant l'extraction ffmpeg (4.5), tu as besoin de tous les fichiers sur ton disque :
- Le **clip mp4** (à la racine du projet)
- Les **images de sections** (dans `assets/img/`)
- Les **frames départ/fin** (dans `assets/img/` aussi)

**Comment télécharger** :
- Depuis **Google Flow** : bouton téléchargement sur l'image générée → enregistre
  dans le bon dossier.
- Depuis **Seedance 2** : bouton téléchargement sur la vidéo générée → enregistre
  comme `clip.mp4` à la racine du projet.

Une fois les fichiers sur ton disque, dis-le à Claude Code en précisant les chemins,
et il s'occupe de la suite (ffmpeg + branchement).

---

### 4.5 — Extraction frames (ffmpeg) + QC morph

Extrais les frames du clip pour le scrub :

```bash
ffmpeg -i clip.mp4 -vf "scale=1600:-2" -q:v 3 assets/frames/frame-%03d.jpg
```

- `scale=1600:-2` : largeur 1600px, hauteur auto paire (qualité/poids équilibré).
- `frame-%03d.jpg` : numérotation **zéro-paddée sur 3 chiffres, 1-indexée**
  (`frame-001.jpg`, `frame-002.jpg`, …). 🔴 Cette numérotation doit matcher le
  moteur web (voir 4.6) — sinon loader figé / canvas noir.

> 🔴 **Garde-fou poids du dossier `frames/`.** Pour ~121 frames à `scale=1600`,
> vise **< 60-80 Ko par frame** (~7-10 Mo total). Si c'est trop lourd : baisse la
> qualité (`-q:v 4`) ou la résolution (`scale=1280:-2`). Au-delà de **~150 frames**,
> le first-load se dégrade — préfère un clip 5s (~121 frames).

**QC morph** : demande à Claude Code de **lire 8 à 12 frames denses** et de
vérifier : le bâtiment/sujet garde-t-il sa forme ? Les murs ondulent-ils ? Si le
morph est visible et gênant :
- vérifie que la frame fin était bien **image-to-image** cohérente (cause #1) ;
- accélère l'approche (caméra plus rapide masque mieux le morph) ;
- en dernier recours, régénère le clip dans Seedance 2.

---

### 4.6 — Brancher au moteur scroll-scrub (canvas vanilla)

Demande à Claude Code d'intégrer les frames dans le starter du kit. Comportement
clé à respecter :

- **Frames** : `assets/frames/frame-NNN.jpg`, zéro-paddé 3, **1-indexé**.
- **Section** : `<section data-frames="N">` (N = nombre total de frames) avec un
  stage sticky + canvas. Un **loader précharge toutes les frames** avant d'activer
  le scrub (sinon flicker).
- **Mapping** : progression `p` ∈ [0,1] → `idx = round(p * (N-1))` puis `+1`.
  **Linéaire** pour un clip unique.
- **Hauteur de la section** : **point de départ `hauteur_vh ≈ frames × 4.6`**
  (ex: 121 frames → ~556vh). Ce n'est PAS une constante — règle à l'œil :
  **trop rapide → monte vers `× 6` ; trop lent → descends vers `× 3`**.
- **Mobile** : sous **820px**, bascule en **scrub statique**.

🔴 **Deux pièges qui cassent le scrub** :

1. **`body { overflow-x: clip }` — JAMAIS `hidden`.**
   `overflow-x: hidden` tue le `position: sticky` du canvas → le scrub est mort.

2. **Cache-bust après chaque ré-extraction.** Incrémente la variable `CACHE_BUST`
   en tête de `starter/script.js` (`var CACHE_BUST = 1;` → `2`, `3`…). N'ajoute
   jamais un `?v=N` en dur sur une frame. ⚠️ `CACHE_BUST` ne couvre QUE les frames :
   si tu modifies `style.css` ou `script.js`, incrémente séparément le `?vN` dans
   `index.html`.

---

## Checklist avant de déclarer le hero "fait"

- [ ] Frame départ validée (texte→image, Nano Banana 2 via Google Flow, 16:9).
- [ ] 🔴 Frame fin générée en **image-to-image depuis la frame départ** (PAS texte seul),
      manifestement le **même lieu**, juste plus proche — **même axe/angle**, **aucun
      élément architectural nouveau**, prompt fidélité-locked.
- [ ] Clip Seedance 2 5s, son off, start+end frames, téléchargé en mp4.
- [ ] QC morph fait sur **8-12 frames denses** → micro-morph imperceptible au scroll.
- [ ] Frames extraites `frame-001.jpg…`, 1-indexé, zéro-paddé 3, `scale=1600`.
- [ ] Poids dossier `frames/` : < 60-80 Ko/frame (~7-10 Mo pour ~121 frames).
- [ ] `body { overflow-x: clip }` (pas `hidden`).
- [ ] `data-frames` = nombre exact de frames ; loader va à 100% ; canvas non noir.
- [ ] Cache-bust `CACHE_BUST` incrémenté après la dernière extraction.
- [ ] Mobile <820px = scrub statique.
- [ ] Servi en local (`http://localhost`, jamais `file://`).

---

## Anti-pièges (résumé)

| Symptôme | Cause | Fix |
|---|---|---|
| Façade/sujet se déforme | frame fin en texte seul (≠ départ) | 🔴 refaire la fin en **image-to-image** dans Flow |
| Façade ondule alors que la fin EST en i2i | fin = saut d'angle ou élément nouveau absent du départ | fin = rapproché **même axe**, **zéro élément nouveau**, prompt fidélité-locked |
| Échelle absurde | sujet pas crédible / pas ancré sur du réel | régénérer un **départ logique** d'après refs réelles (cf. 4.1) |
| Meubles/détails qui se déforment | détail inventé en vol (absent du départ) | 🔴 **finir AU SEUIL** + détail en photo dans la section suivante (cf. 4.3 bis) |
| Scrub ne bouge pas | `body{overflow-x:hidden}` | mettre `clip` |
| Loader figé / canvas noir | numérotation frames ≠ moteur | vérifier `frame-001…`, 1-indexé, `data-frames` exact |
| Frames pas à jour après ré-extraction | cache navigateur | incrémenter `CACHE_BUST` dans `script.js` |
| Morph trop visible | approche trop lente | accélérer la caméra (masque le morph) |
| Saut de point de vue brutal | trop de changement en 1 clip | sujet plus simple, ou chaînage multi-clips doux |
