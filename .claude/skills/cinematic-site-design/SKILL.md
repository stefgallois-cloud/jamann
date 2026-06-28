---
name: cinematic-site-design
description: >
  Construit un site web cinématique scroll-scrub (une vidéo IA pilotée par le scroll, façon Apple/Igloo)
  ADAPTÉ à la charte graphique du viewer — n'importe quel business, pas seulement l'immobilier.
  Encode le système de design éditorial sombre, les patterns de section, les règles anti-slop,
  le MOTEUR scroll-scrub vanilla (canvas + frames JPEG), et la couche motion reduced-motion-safe.
  Le viewer PILOTE Claude Code en langage naturel : il ne code pas, il dirige et valide.
  À CHARGER quand le viewer veut : "site cinématique", "site qui scroll comme Apple", "site scrollytelling",
  "site avec une vidéo qui défile au scroll", "fly-through site", "assemble mon site",
  "mets en page mon site", "fais le design de mon site", "intègre ma vidéo IA dans le site",
  "construis le site avec ma charte graphique", "scroll-scrub", "site immersif".
  NE PAS charger pour : un site statique classique, un dashboard, un blog, une landing simple sans scrub vidéo.
---

# Cinematic Site Design — assembler un site scroll-scrub adapté à n'importe quelle marque

## Ce que tu construis et pour qui

Tu (Claude Code) construis un **site web d'une seule page**, sombre et éditorial, dont le héros est une **vidéo IA pilotée par le scroll** : l'utilisateur scrolle, et une séquence de frames JPEG se déroule comme une caméra qui avance (un *fly-through*). En dessous du héros, des **sections éditoriales** racontent l'offre du business. Le tout est immersif, premium, façon Apple / Igloo Inc. / Locomotive.

**Qui pilote ?** Un *viewer* — un débutant ou intermédiaire francophone qui dirige Claude Code **en langage naturel**. Il ne code pas. Il décrit son business, sa charte, ce qu'il aime ou pas, et tu exécutes. Tu lui montres une preuve visuelle, il valide ou demande une modification, tu itères.

**Où dans le process ?** Ce skill sert deux étapes d'un parcours en 6 étapes :
- **Étape 3 — le squelette** : tu poses la structure HTML/CSS du site avec la charte du viewer, AVANT même qu'il ait sa vidéo. Tu utilises des images placeholder pour le héros.
- **Étape 5 — l'assemblage final** : le viewer a généré sa vidéo IA (étape 4, skill séparé `cinematic-site-flythrough`) et possède des frames `assets/frames/frame-001.jpg`, `frame-002.jpg`, … Tu branches le moteur scrub sur ses vraies frames, tu peaufines les beats, tu ajoutes la couche motion.

**La vérité terrain est livrée dans le kit : c'est le `starter/`** (`starter/index.html`, `starter/style.css`, `starter/script.js`). Le moteur scroll-scrub, tous les patterns de section, la couche motion et le bloc reduced-motion y sont déjà écrits et calibrés. Tu ne pars JAMAIS d'une page blanche : tu pars du starter, tu adaptes la charte et le contenu. Quand tu as besoin d'un bloc de CSS ou de JS, tu le lis dans le starter — pas dans un projet externe.

Le même squelette sert un coach sportif, un studio de design, une agence automation, une distillerie, une marque de mobilier, un hôtel, un cabinet d'architecte ou un bien immobilier. **Aucun secteur n'est le défaut.** Tu DÉRIVES la charte du viewer, tu gardes le squelette. (Les exemples « immo de luxe » qui apparaissent plus bas ne sont qu'UN cas parmi d'autres — ne calque pas le ton luxe si le business du viewer n'est pas premium.)

---

## 1. Système de design adaptatif

L'idée centrale : **un squelette fort, des variables douces.** Le squelette (rythme, whitespace, contrastes typographiques, scrims, ring borders) ne change pas — c'est lui qui rend le site premium. Ce qui change d'une marque à l'autre tient dans une poignée de variables CSS : la couleur d'accent, les deux polices, l'ambiance.

### Le squelette par défaut (point de départ)

- **Fond sombre éditorial** : un dark riche plutôt qu'un noir pur (le starter part de `#0c0c0d`), avec 2-3 nuances pour distinguer les bandes de section. Le dark peut tirer vers le navy, le vert forêt, l'aubergine… selon la marque.
- **Type display serif** (titres) + **type sans clean** (corps). Le contraste serif/sans crée à lui seul 80 % de l'effet « premium ». Le starter part de polices système neutres ; tu les remplaces par le couple du viewer (ou Cormorant Garamond + Work Sans pour une direction luxe classique).
- **Un seul accent**, jamais deux — celui de la marque du viewer. L'accent ne sert qu'aux eyebrows, aux chiffres clés, à un mot en `<em>`, à la barre de progression. (Le starter part d'un `#c9a978` neutre que tu remplaces.)
- **Whitespace généreux** : padding de section `clamp(90px, 13vh, 180px)`. En cas de doute, plus d'air.
- **Type scale fluide** au `clamp()` : les titres respirent de 38px à 132px selon la largeur.

### Le bloc `:root` à copier et adapter

🔴 **Ce bloc est CELUI DU STARTER livré** (`starter/style.css`, en tête de fichier) — mêmes noms de variables, à l'identique. Tu ne réécris pas les noms : le starter est le fichier réellement servi, tout son CSS structurel lit `var(--bg)`, `var(--accent)`, `var(--fg)`, etc. Si tu inventais d'autres noms (`--navy`, `--gold`…), tout le starter tomberait sur des variables inexistantes → site dé-stylé. Tu **remplaces uniquement les valeurs des variables marquées `/* ADAPT */`** avec la charte du viewer. Le reste ne bouge pas.

```css
:root {
  /* ---- Backgrounds (dark by default — swap to taste) ---- */
  --bg:          #0c0c0d;   /* ADAPT — page base, deepest brand dark */
  --bg-2:        #131315;   /* derived: +1 step lighter (alternating bands) */
  --bg-3:        #18181b;   /* derived: +2 steps */
  --ink:         #0a0a0b;   /* derived: darkest (stats / footer) */

  /* ---- Text ---- */
  --fg:          #f5f4f2;   /* ADAPT — primary text (warm/cool white, not pure #fff) */
  --fg-soft:     #cfcdc8;   /* derived: secondary text */
  --muted:       #8a8a90;   /* derived: labels, legal, captions */

  /* ---- Accent + lines ---- */
  --accent:      #c9a978;   /* ADAPT — single accent only (eyebrows, key figures, <em>) */
  --line:        rgba(245, 244, 242, 0.14); /* derived from --fg @ ~14% — hairline dividers */

  /* ---- Layout ---- */
  --maxw:        1240px;
  --pad:         clamp(22px, 5vw, 80px);
  --ease:        cubic-bezier(0.22, 1, 0.36, 1);

  /* ---- the two typefaces ---- */
  --serif:       Georgia, "Times New Roman", serif;            /* ADAPT — display / headings */
  --sans:        system-ui, -apple-system, "Segoe UI", sans-serif; /* ADAPT — body / UI */
}
```

> Les valeurs ci-dessus sont les **défauts neutres du starter**. Pour un rendu « luxe » par défaut (façon Penthouse Horizon), tu peux partir d'un navy profond (`--bg: #0a131f`), d'un blanc tiède (`--fg: #f4efe6`) et de Cormorant Garamond + Work Sans en `--serif`/`--sans` — mais ce n'est qu'UNE direction parmi d'autres, pas le défaut imposé.

### Comment dériver les variables `/* ADAPT */` de la charte du viewer

| Ce que le viewer te donne | Variable | Comment tu dérives |
|---|---|---|
| « Mon dark, c'est plutôt vert forêt » | `--bg` | Prends son dark, génère `--bg-2/-3` en éclaircissant ~3-4 % de luminosité par cran, `--ink` en assombrissant. |
| « Mon accent c'est un terracotta » / « bleu Klein » | `--accent` | Une seule couleur. Si le viewer en propose deux, choisis la plus saturée pour l'accent, l'autre devient un détail mineur (ou rien). |
| « Texte blanc cassé » | `--fg` | Jamais `#fff` pur sur du sombre (trop dur). Un blanc tiède ou froid selon l'ambiance, puis `--fg-soft`/`--muted` en désaturant + opacifiant. |
| Logo + 2 fonts | `--serif`, `--sans` | Si le viewer a une font de marque, mets-la en `--sans` (UI/corps) et choisis une serif display qui se marie (Cormorant, Playfair, Libre Caslon). S'il n'a rien : garde le défaut. |

**Ambiance claire au lieu de sombre ?** Le squelette marche en mode clair : inverse `--bg` (devient un blanc cassé) et `--fg` (devient un near-black), garde l'accent, et **renforce les scrims** sur les images full-bleed (sur fond clair le texte sur image a besoin d'un scrim plus opaque pour rester lisible). Préviens le viewer que le mode sombre rend le scrub plus cinématique — c'est le défaut recommandé.

### Charge des polices (dans `<head>`)

```html
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400;1,500&family=Work+Sans:wght@300;400;500&display=swap" rel="stylesheet" />
```

Adapte les `family=` aux deux polices retenues. Garde `display=swap`. Garde les `preconnect` (ils accélèrent le rendu).

---

## 2. Patterns de section réutilisables

Tu composes le site à partir d'un petit catalogue de sections. Choisis-les selon le contenu du viewer, pas selon un ordre figé. Un site typique enchaîne : **hero scrub → bande stats → éditorial → full-bleed → liste numérotée → éditorial → full-bleed → manifeste → contact → footer.** Alterne les fonds (`--bg` / `--bg-2` / `--ink`) pour rythmer.

### A. Hero scrub (la vidéo pilotée par le scroll)

**Quand** : toujours en ouverture. C'est la signature du site. Détaillé en §4.

### B. Éditorial asymétrique (texte + image)

**Quand** : présenter une facette de l'offre avec une image forte. La colonne texte est plus étroite que la médias (grille `1.15fr 0.85fr`) — l'asymétrie est volontaire, jamais 50/50. Alterne le côté de l'image avec `--reverse`.

```html
<section class="editorial editorial--reverse" id="sejour">
  <div class="editorial__inner">
    <div class="editorial__media reveal" data-reveal>
      <figure class="frame">
        <img src="assets/img/placeholder-1.jpg" alt="..." width="2752" height="1536" loading="lazy" decoding="async" />
      </figure>
    </div>
    <div class="editorial__text">
      <p class="eyebrow reveal" data-reveal>Le détail</p>
      <h2 class="editorial__title reveal" data-reveal>Une promesse<br /><em>en deux lignes.</em></h2>
      <p class="lede reveal" data-reveal>Le paragraphe d'accroche, large mais pas trop (max 46ch).</p>
      <p class="meta reveal" data-reveal>Détails secondaires · séparés par des points médians.</p>
    </div>
  </div>
</section>
```

```css
.editorial { padding: clamp(90px, 13vh, 180px) var(--pad); background: var(--bg); }
.editorial--reverse { background: var(--bg-2); }
.editorial__inner { max-width: var(--maxw); margin: 0 auto; display: grid; grid-template-columns: 1.15fr 0.85fr; gap: clamp(36px, 6vw, 90px); align-items: center; }
.editorial--reverse .editorial__media { order: 2; } .editorial--reverse .editorial__text { order: 1; }
.editorial__title { font-size: clamp(38px, 5.2vw, 76px); } .editorial__title em { color: var(--accent); }
/* 🔴 .frame porte un fallback visuel : tant que l'image n'est pas posée (placeholder
   sombre ou src cassé), on voit une surface texturée + un label discret, JAMAIS un
   trou noir nu. ratio fixe = pas de saut de layout. */
.frame { margin: 0; overflow: hidden; border-radius: 4px; box-shadow: 0 40px 90px -40px rgba(0,0,0,0.7);
  position: relative; aspect-ratio: 16 / 9; background: var(--bg-3);
  background-image:
    repeating-linear-gradient(45deg, rgba(245,244,242,0.018) 0 14px, transparent 14px 28px); }
.frame::after { /* label "image à venir" — masqué dès qu'une vraie image couvre le cadre */
  content: "Image à venir"; position: absolute; inset: 0; display: flex; align-items: center; justify-content: center;
  font-family: var(--sans); font-size: 12px; letter-spacing: 0.16em; text-transform: uppercase;
  color: var(--muted); opacity: 0.5; pointer-events: none; }
.frame img { position: relative; z-index: 1; width: 100%; height: 100%; object-fit: cover; transition: transform 1.4s var(--ease); }
.editorial__media:hover .frame img { transform: scale(1.04); }
```

> 🔴 **Le placeholder éditorial DOIT être remplacé par une vraie image.** Contrairement aux full-bleed (pattern C), le bloc éditorial **n'a pas de texte ni de scrim par-dessus l'image** pour masquer un placeholder — un placeholder non remplacé y lit comme un **trou noir / un bug**. Le fallback CSS ci-dessus (texture + label « Image à venir ») évite le trou noir nu si le viewer sert le site avant d'avoir ses images, mais ce n'est qu'un filet de sécurité : à l'**étape 4 bis**, chaque `.editorial__media` reçoit sa **vraie image générée** (1 distincte par section, cohérente avec la charte). Ne livre jamais un site avec des `.frame` encore en fallback.

### C. Full-bleed avec scrim (image plein écran + texte par-dessus)

**Quand** : moment fort, respiration, image immersive. Le **scrim** (dégradé sombre) garantit que le texte reste lisible sur n'importe quelle photo. Le texte est ancré bas-gauche (`--low`).

```html
<section class="bleed bleed--tall" id="niveaux">
  <img class="bleed__img" src="assets/img/placeholder-2.jpg" alt="..." width="2752" height="1536" loading="lazy" decoding="async" />
  <div class="bleed__scrim" aria-hidden="true"></div>
  <div class="bleed__content bleed__content--low">
    <p class="eyebrow eyebrow--light reveal" data-reveal>La section</p>
    <h2 class="bleed__title reveal" data-reveal>Un titre fort,<br /><em>sur deux lignes.</em></h2>
    <p class="bleed__copy reveal" data-reveal>Le paragraphe, lisible grâce au scrim et au text-shadow.</p>
    <ul class="bleed__specs reveal" data-reveal>
      <li><span class="bleed__spec-k">Label</span><span class="bleed__spec-v">Valeur</span></li>
    </ul>
  </div>
</section>
```

```css
.bleed { position: relative; min-height: 92vh; display: flex; align-items: center; overflow: hidden; }
.bleed--tall { min-height: 100vh; }
.bleed__img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; }
.bleed__scrim { position: absolute; inset: 0;
  background:
    linear-gradient(to top, rgba(8,8,10,0.88) 0%, rgba(8,8,10,0.32) 38%, rgba(8,8,10,0) 60%),
    linear-gradient(to right, rgba(8,8,10,0.55) 0%, rgba(8,8,10,0.12) 50%, rgba(8,8,10,0) 80%); }
.bleed__content { position: relative; z-index: 2; max-width: 640px; padding: 0 var(--pad); }
.bleed__content--low { align-self: flex-end; padding-bottom: clamp(60px, 12vh, 120px); }
.bleed__copy { text-shadow: 0 1px 24px rgba(0,0,0,0.85), 0 1px 4px rgba(0,0,0,0.6); }
.bleed__specs { list-style: none; margin: 0; padding: 0; display: flex; gap: clamp(28px,4vw,56px); flex-wrap: wrap; }
.bleed__specs li { display: flex; flex-direction: column; gap: 6px; padding-top: 18px; border-top: 1px solid rgba(245,244,242,0.22); min-width: 150px; }
```

> Adapte les `rgba(8,8,10, …)` du scrim à TON `--ink` converti en rgba — le scrim doit être la couleur du fond, pas un noir générique.

### D. Liste numérotée (prestations / étapes / features)

**Quand** : énumérer 6-12 points (services, garanties, étapes d'un process). Tête de section en `sticky` à gauche, liste à droite. Les index numérotés en serif + accent donnent le côté éditorial.

```html
<section class="amenities" id="prestations">
  <div class="amenities__inner">
    <header class="amenities__head">
      <p class="eyebrow reveal" data-reveal>Les prestations</p>
      <h2 class="amenities__title reveal" data-reveal>Tout est là.<br /><em>Rien ne manque.</em></h2>
    </header>
    <ol class="amenities__list">
      <li class="amenity reveal" data-reveal><span class="amenity__index">01</span><span class="amenity__text">Premier point.</span></li>
      <!-- ... -->
    </ol>
  </div>
</section>
```

```css
.amenities { background: var(--bg-2); padding: clamp(90px,14vh,180px) var(--pad); }
.amenities__inner { max-width: var(--maxw); margin: 0 auto; display: grid; grid-template-columns: 0.85fr 1.15fr; gap: clamp(40px,6vw,96px); align-items: start; }
.amenities__head { position: sticky; top: 120px; }
.amenities__list { list-style: none; margin: 0; padding: 0; display: grid; grid-template-columns: 1fr 1fr; gap: 0 clamp(28px,4vw,56px); }
.amenity { display: flex; gap: 20px; align-items: baseline; padding: 24px 0; border-bottom: 1px solid var(--line); }
.amenity__index { font-family: var(--serif); font-size: 15px; color: var(--accent); flex: 0 0 auto; min-width: 26px; }
```

### E. Bande stats (chiffres clés)

**Quand** : prouver par les chiffres (4 idéalement). Les nombres en serif géant, l'unité en accent. Animés au scroll (compteurs, §5).

```html
<section class="stats">
  <div class="stats__inner">
    <div class="stat reveal" data-reveal>
      <span class="stat__num">320<span class="stat__unit"> m²</span></span>
      <span class="stat__label">Surface</span>
    </div>
    <!-- x4 -->
  </div>
</section>
```

```css
.stats { background: var(--ink); padding: clamp(70px,11vh,130px) var(--pad); }
.stats__inner { max-width: var(--maxw); margin: 0 auto; display: grid; grid-template-columns: repeat(4,1fr); gap: clamp(24px,4vw,60px); }
.stat { text-align: left; border-left: 1px solid var(--line); padding-left: 26px; }
.stat__num { display: block; font-family: var(--serif); font-weight: 500; font-size: clamp(46px,5.5vw,76px); line-height: 1; color: var(--fg); }
.stat__unit { font-size: 0.42em; color: var(--accent); }
.stat__label { display: block; font-size: 12px; letter-spacing: 0.14em; text-transform: uppercase; color: var(--muted); margin-top: 16px; }
```

**Autres patterns déjà dans le starter** (`starter/index.html` + `starter/style.css`, à transposer pareil) : `manifesto` (citation centrée pleine respiration — le SEUL endroit où le centrage est légitime), `contact` (deux colonnes : pitch + coordonnées cliquables `mailto:`/`tel:`), `footer`. Pour une section `pricing` (full-bleed avec un chiffre géant), dérive-la du pattern full-bleed (C) ci-dessus. Réutilise le CSS du starter — n'invente pas de variantes sans raison.

### Les fragments partagés (eyebrow, lede, btn, nav)

Chaque section s'appuie sur des briques communes : `.eyebrow` (petit label en majuscules espacées, couleur accent), `.lede` (paragraphe d'accroche large), `.btn` (bouton pill, **padding et non hauteur fixe**), `.nav` (fixe, devient glassmorphism `is-scrolled` au scroll). Ils sont déjà dans `starter/style.css`, déjà calibrés — réutilise-les tels quels.

---

## 3. Règles anti-slop (non négociables, toute marque)

Ces règles tiennent même quand le viewer demande « quelque chose de coloré ». Tu peux colorer via l'accent, jamais en cassant ces règles.

- ❌ **Pas de gradient violet/bleu en fond.** Le fond est une couleur sombre unie (ou claire unie). Les seuls gradients autorisés sont les **scrims** sur image (et ils sont la couleur du fond, pas un arc-en-ciel).
- ❌ **Pas de tout-centré.** Aligné à gauche par défaut. Centrage réservé au `manifesto` (citation) — un usage, pas un réflexe.
- ❌ **Pas de bordures pleines.** Les séparateurs sont des hairlines en **ring à faible opacité** : `1px solid rgba(<cream>, 0.14)` via `--line`. Jamais `border: 1px solid #fff`.
- ❌ **Pas d'Inter basique seul.** Toujours le couple serif display + sans. Si le viewer impose Inter pour le corps, alors une serif display forte par-dessus pour compenser.
- ❌ **Pas de cartes arrondies génériques sur fond blanc avec métriques stock.** Les chiffres vivent dans la bande `stats` éditoriale, pas dans des cartes flottantes.
- ✅ **Whitespace généreux** : padding section `clamp(90px, 13vh, 180px)`, gap inter-groupe ≥ 16px, gap intra-groupe ≥ 8px.
- ✅ **Un seul accent.** L'or par défaut. Deux accents = slop.
- ✅ **Blanc tiède, pas `#fff`.** Sur fond sombre, le `#fff` pur est agressif — toujours un blanc cassé (`--fg`).
- ✅ **Texte sur image = scrim + text-shadow.** Jamais de texte posé nu sur une photo.

---

## 4. 🔴 Le MOTEUR scroll-scrub (cœur du skill)

C'est le morceau qui fait « waouh ». Une `<section class="scrub">` très haute contient un `<canvas>` collant (`sticky`) qui dessine la frame correspondant à la position de scroll. Pas de dépendance, vanilla pur. Des *beats* (légendes) apparaissent et disparaissent en fondu par-dessus la séquence.

### Le squelette HTML du héros

```html
<section class="scrub" id="hero" data-frames="121" aria-label="Traversée immersive — description de la caméra">
  <div class="scrub__stage">
    <canvas class="scrub__canvas" aria-hidden="true"></canvas>
    <div class="scrub__scrim" aria-hidden="true"></div>

    <!-- Loader (visible pendant le préchargement des frames) -->
    <div class="loader" id="loader" role="status" aria-live="polite">
      <span class="loader__brand">MARQUE</span>
      <span class="loader__track" aria-hidden="true"><span class="loader__bar" id="loaderBar"></span></span>
      <span class="loader__pct" id="loaderPct">0%</span>
    </div>

    <!-- Caption beats : data-in / data-out = fenêtres de progression [0..1] -->
    <div class="scrub__beat" data-in="-0.06" data-out="0.22">
      <p class="scrub__eyebrow">Eyebrow</p>
      <h1 class="scrub__title">Titre <em>héros</em></h1>
      <p class="scrub__tagline">La promesse en une phrase.</p>
    </div>
    <div class="scrub__beat" data-in="0.30" data-out="0.48">
      <p class="scrub__eyebrow">Deuxième temps</p>
      <h2 class="scrub__beat-title">Un message<br /><em>au milieu du parcours.</em></h2>
      <p class="scrub__beat-copy">Le texte qui accompagne ce moment de la caméra.</p>
    </div>
    <!-- ... autant de beats que de temps forts dans la vidéo ... -->
    <div class="scrub__beat" data-in="0.82" data-out="1.01">
      <p class="scrub__eyebrow">L'arrivée</p>
      <h2 class="scrub__beat-title">Le dernier mot.</h2>
      <a href="#contact" class="btn btn--light">Appel à l'action</a>
    </div>

    <!-- Indice de scroll -->
    <div class="scrub__cue" id="scrubCue" aria-hidden="true">
      <span>Faites défiler pour entrer</span>
      <span class="scrub__cue-line"></span>
    </div>
  </div>
</section>
```

### Le CSS du scrub

```css
.scrub { position: relative; height: 560vh; background: var(--bg); } /* ← hauteur calculée, voir piège #3 */
.scrub__stage { position: sticky; top: 0; height: 100vh; overflow: hidden; }
.scrub__canvas { position: absolute; inset: 0; width: 100%; height: 100%; display: block; }
.scrub__scrim { position: absolute; inset: 0; pointer-events: none;
  background:
    linear-gradient(to top, rgba(8,8,10,0.78) 0%, rgba(8,8,10,0.12) 42%, rgba(8,8,10,0) 65%),
    linear-gradient(to bottom, rgba(8,8,10,0.5) 0%, rgba(8,8,10,0) 28%); }
.scrub__beat { position: absolute; left: var(--pad); bottom: clamp(64px,13vh,140px); z-index: 10; max-width: 720px; opacity: 0; will-change: opacity, transform; }
.loader { position: absolute; inset: 0; z-index: 20; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 22px; background: var(--bg); transition: opacity .8s var(--ease), visibility .8s; }
.loader.is-done { opacity: 0; visibility: hidden; }
```

### Le JS moteur (vanilla, zéro dépendance)

> 🔴 **Ce moteur est DÉJÀ écrit dans `starter/script.js`** (fonction `initScrub()`). Tu ne le réécris pas et tu n'as pas besoin de le coller : il tourne tel quel dans le starter. Le bloc ci-dessous est une **reproduction commentée pour comprendre** ce qu'il fait — pas un fichier à recréer. (Seule différence cosmétique : le starter utilise un fallback `data-frames || 1` pour rendre une frame de démo unique ; cette repro montre `|| 121`, le cas plein.)

Le moteur fait quatre choses : **(1)** précharge toutes les frames en mettant à jour le loader, **(2)** dimensionne le canvas en tenant compte du DPR, **(3)** dessine la frame en *cover-fit* (recadrage centré, jamais déformé), **(4)** mappe le scroll → index de frame linéairement et anime les beats.

```js
(function initScrub() {
  var section = document.querySelector(".scrub");
  if (!section) return;
  var stage  = section.querySelector(".scrub__stage");
  var canvas = section.querySelector(".scrub__canvas");
  var ctx    = canvas.getContext("2d");
  var loader = document.getElementById("loader");
  var loaderBar = document.getElementById("loaderBar");
  var loaderPct = document.getElementById("loaderPct");
  var cue   = document.getElementById("scrubCue");
  var beats = Array.prototype.slice.call(section.querySelectorAll(".scrub__beat"));

  // 🔴 SEULE variable de cache-bust des frames. Incrémente-la (l.25 du starter
  // réel) à chaque ré-extraction des frames — le moteur l'applique à toutes les
  // URLs frame-NNN.jpg via "?v=" + CACHE_BUST. Ne mets JAMAIS un ?v=N en dur.
  var CACHE_BUST = 1;
  var FRAME_COUNT = parseInt(section.dataset.frames, 10) || 121;
  var LAST = FRAME_COUNT - 1;
  var FRAME_BASE = "assets/frames/frame-";
  var FADE = 0.05; // fade margin (progress units) for caption in/out
  var frames = new Array(FRAME_COUNT);
  var loadedCount = 0, ready = false;

  var prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var isSmall = window.matchMedia("(max-width: 820px)").matches;
  if (isSmall) section.classList.add("scrub--static");

  // 🔴 1-indexed, zero-padded to 3 : frame-001.jpg, frame-002.jpg, ...
  function pad3(n) { n = String(n + 1); return n.length >= 3 ? n : ("000" + n).slice(-3); }

  function smoothstep(a, b, x) { if (x <= a) return 0; if (x >= b) return 1; var t = (x - a) / (b - a); return t * t * (3 - 2 * t); }

  // ---- DPR-aware canvas sizing ----
  var cssW = 0, cssH = 0, dpr = 1, lastDrawn = -1;
  function resizeCanvas() {
    var rect = stage.getBoundingClientRect();
    var w = Math.round(rect.width) || window.innerWidth;
    var h = Math.round(rect.height) || window.innerHeight;
    var d = Math.min(Math.max(window.devicePixelRatio || 1, 1), 2);
    if (w === cssW && h === cssH && d === dpr) return false;
    cssW = w; cssH = h; dpr = d;
    canvas.width = Math.round(cssW * dpr); canvas.height = Math.round(cssH * dpr);
    canvas.style.width = cssW + "px"; canvas.style.height = cssH + "px";
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0); lastDrawn = -1; return true;
  }

  // ---- cover-fit (preserve aspect, center-crop) ----
  function coverParams(img) {
    var iw = img.naturalWidth, ih = img.naturalHeight;
    var scale = Math.max(cssW / iw, cssH / ih);
    var dw = iw * scale, dh = ih * scale;
    return [(cssW - dw) / 2, (cssH - dh) / 2, dw, dh];
  }
  function drawFrame(i) {
    if (i < 0) i = 0; if (i > LAST) i = LAST;
    var img = frames[i];
    if (!img || !img.complete || !img.naturalWidth) return;
    lastDrawn = i; var p = coverParams(img);
    ctx.clearRect(0, 0, cssW, cssH); ctx.globalAlpha = 1;
    ctx.drawImage(img, p[0], p[1], p[2], p[3]);
  }

  // ---- scroll progress 0..1 across the tall section ----
  function getProgress() {
    var rect = section.getBoundingClientRect();
    var travel = section.offsetHeight - window.innerHeight;
    if (travel <= 0) return 0;
    var p = -rect.top / travel; return p < 0 ? 0 : p > 1 ? 1 : p;
  }

  // ---- LINEAR mapping : scroll -> frame index ----
  function frameForProgress(p) {
    if (p <= 0) return 0; if (p >= 1) return LAST;
    return Math.round(p * LAST);
  }

  // ---- caption beats : fade in [in, in+FADE], out [out-FADE, out] ----
  function renderBeats(p) {
    for (var i = 0; i < beats.length; i++) {
      var el = beats[i];
      var inP = parseFloat(el.dataset.in), outP = parseFloat(el.dataset.out);
      var op = smoothstep(inP, inP + FADE, p) * (1 - smoothstep(outP - FADE, outP, p));
      el.style.opacity = String(op);
      el.style.transform = "translateY(" + (1 - op) * 18 + "px)";
      el.style.pointerEvents = op > 0.5 ? "auto" : "none";
    }
  }

  function render(p) {
    resizeCanvas();
    var idx = frameForProgress(p);
    if (idx !== lastDrawn) drawFrame(idx);
    renderBeats(p);
    if (cue) cue.style.opacity = String(1 - smoothstep(0.02, 0.10, p));
  }

  var rafPending = false;
  function onScrubScroll() {
    if (rafPending) return; rafPending = true;
    window.requestAnimationFrame(function () { rafPending = false; if (ready) render(getProgress()); });
  }

  function enableScrub() {
    ready = true; resizeCanvas();
    if (prefersReduced || isSmall) { // mobile / reduced-motion = static first frame
      drawFrame(0);
      beats.forEach(function (b, i) { b.style.opacity = i === 0 ? "1" : "0"; b.style.transform = "none"; });
      if (cue) cue.style.opacity = "0";
      window.addEventListener("resize", function () { resizeCanvas(); drawFrame(0); });
      return;
    }
    render(getProgress());
    window.addEventListener("scroll", onScrubScroll, { passive: true });
    window.addEventListener("resize", function () { if (ready) render(getProgress()); });
  }

  function bumpLoader() {
    var pct = Math.round((loadedCount / FRAME_COUNT) * 100);
    if (loaderBar) loaderBar.style.width = pct + "%";
    if (loaderPct) loaderPct.textContent = pct + "%";
  }
  var firstPainted = false;
  function preload() {
    resizeCanvas();
    for (var i = 0; i < FRAME_COUNT; i++) {
      (function (i) {
        var img = new Image(); img.decoding = "async";
        img.onload = img.onerror = function () {
          loadedCount++; bumpLoader();
          if (i === 0 && !firstPainted && img.naturalWidth) { firstPainted = true; drawFrame(0); }
          if (loadedCount === FRAME_COUNT) { if (loader) loader.classList.add("is-done"); enableScrub(); }
        };
        img.src = FRAME_BASE + pad3(i) + ".jpg?v=" + CACHE_BUST; // 🔴 cache-bust frames : le moteur applique ?v=CACHE_BUST tout seul. Pour invalider après ré-extraction, incrémente la SEULE variable CACHE_BUST en tête de starter/script.js (l.25).
        frames[i] = img;
      })(i);
    }
  }
  preload();
})();
```

### 🔴 Les pièges critiques (tirés du vrai projet — vérifie-les CHAQUE fois)

1. **`body { overflow-x: clip }`, jamais `overflow-x: hidden`.** `hidden` casse le `position: sticky` du stage (le canvas ne reste pas collé, il scrolle). `clip` coupe le débordement horizontal sans tuer le sticky.

2. **Cache-bust — DEUX mécanismes distincts, ne les confonds pas.** C'est la cause #1 de « je vois pas la modif ».
   - **Frames** : le moteur applique **automatiquement** `?v=CACHE_BUST` à chaque URL `frame-NNN.jpg`. Tu ne mets JAMAIS un `?v=N` en dur sur une frame (le moteur lit les noms `frame-NNN.jpg`, pas des URLs avec query inline — un `?v=10` codé à la main est ignoré). Pour invalider le cache après une **ré-extraction des frames**, incrémente la **SEULE variable `CACHE_BUST`** en tête de `starter/script.js` (l.25 : `var CACHE_BUST = 1;` → `2`, `3`…).
   - **Fichiers statiques `style.css` / `script.js`** : ils sont liés dans `index.html` avec `?v=1` (`<link href="style.css?v=1">`, `<script src="script.js?v=1">`). **Ce `?v` est manuel et SÉPARÉ de `CACHE_BUST`** (qui ne gère QUE les frames). Quand tu modifies le CSS ou le JS, **incrémente à la main ce `?vN` dans `index.html`** — sinon le navigateur sert l'ancien fichier et le viewer croit que rien n'a changé.

3. **Hauteur de section — point de départ, pas constante** : `hauteur_vh ≈ nombre_de_frames × 4.6` est juste une **valeur initiale**. Pour 121 frames → `.scrub { height: 560vh; }` (121 × 4.6 ≈ 557). Ensuite tu **règles à l'œil** : trop rapide / le scrub fuse → **monte le coefficient vers `× 6`** ; trop lent / on scrolle dans le vide → **descends vers `× 3`**. **Porte de validation : sers le site, scrolle le hero et juge la vitesse**, ajuste, re-scrolle. **Recalcule à l'étape 5 quand tu connais le vrai nombre de frames**, puis cale au feeling.

4. **Mobile < 820px = scrub statique, volontairement.** Précharger 121 JPEG sur mobile tue la performance et la data. Sur petit écran, on dessine la première frame fixe + le premier beat, point. C'est un choix de design assumé, pas un bug — ne tente pas de « réparer » le scrub mobile. 🔴 **Aligne la coupure CSS sur ce breakpoint JS** : le JS bascule en statique à **820px** (`isSmall`), donc le CSS DOIT ramener `.scrub { height: 100vh; }` dès `@media (max-width: 820px)` (déjà présent dans `starter/style.css`). Sinon, entre 560 et 820px, la section garde sa hauteur `N×4.6vh` avec une seule frame figée → le viewer scrolle plusieurs écrans de vide. Si tu changes le breakpoint JS, change le breakpoint CSS du même coup.

5. **🔴 Numérotation des frames = 1-indexée, paddée sur 3.** Les fichiers DOIVENT s'appeler `frame-001.jpg`, `frame-002.jpg`, … `frame-121.jpg`. Le `pad3(n)` fait `n+1` exprès (boucle 0-indexée → fichier 1-indexé). **Symptômes d'une mauvaise numérotation** : loader figé à un pourcentage < 100 % (une frame ne charge jamais, `loadedCount` n'atteint jamais `FRAME_COUNT`, `enableScrub()` ne se déclenche pas) ou **canvas noir** (frame 0 introuvable). Si tu vois ça : vérifie d'abord les noms de fichiers et `data-frames` AVANT de toucher le moteur.

6. **🔴 Jamais en `file://`.** Le préchargement d'images et le canvas exigent un serveur HTTP. Ouvrir l'`index.html` par double-clic → CORS / chargement cassé. **Toujours** un serveur local : `npx serve .` ou `python -m http.server 4188` puis `http://localhost:4188`. Préviens le viewer dès l'étape 3.

7. **`data-frames` doit matcher le nombre réel de frames.** À l'étape 5, compte les fichiers dans `assets/frames/` et mets exactement ce nombre dans `data-frames="N"` ET recalcule la hauteur (piège #3).

8. **Caler les beats sur la vidéo.** Les `data-in`/`data-out` sont des fenêtres `[0..1]` qui doivent correspondre aux temps forts du fly-through. À l'étape 5, scrolle lentement, repère où la caméra arrive sur chaque scène, ajuste les valeurs. Le premier beat peut commencer à `data-in="-0.06"` (déjà visible au chargement), le dernier finir à `data-out="1.01"` (reste jusqu'en bas).

---

## 5. Couche motion (additive, reduced-motion-safe)

La couche motion s'ajoute **par-dessus** un site déjà fonctionnel. Règle d'or : **elle ne touche JAMAIS au moteur scrub.** Elle vit dans des blocs séparés du CSS et du JS, et tout est neutralisé sous `prefers-reduced-motion`. Si le JS de la couche motion plante, le site reste utilisable (les titres s'affichent par défaut).

Les cinq effets, par ordre d'impact :

1. **Reveal des titres ligne par ligne (masked reveal)** : chaque ligne d'un titre (séparée par `<br>`) est enveloppée en JS dans `.ml-line > .ml-line__inner`. Le parent a `overflow: hidden`, l'inner part en `translateY(110%)` puis remonte à `0` au scroll, avec un *stagger* `--ml-delay` par ligne. Effet « le texte monte derrière un masque ». L'eyebrow associé fait un `clip-path` qui s'ouvre.

2. **Compteurs animés (stats)** : quand la bande stats entre dans le viewport, chaque `.stat__num` compte de 0 à sa valeur cible en ~1400ms avec un `easeOutCubic`. Préserve l'unité (`<span class="stat__unit">`). Si la valeur n'est pas un nombre (ex. classe énergétique « A »), elle reste statique.

3. **Parallaxe douce sur les full-bleed** : l'image se translate verticalement de ≤ 12 % de sa hauteur selon la position de la section. L'image est pré-scalée `scale(1.12)` pour ne jamais exposer de bord. **Désactivée < 820px** (perf + inutile sur mobile).

4. **Press CTA + underline nav** : les boutons ont un `:active { transform: scale(0.98) }` (feedback tactile), les liens de nav tracent un underline accent au hover via `::after`.

5. **Intro nav** : la nav fade-in une fois la page prête (`body.intro-ready` → `.is-loaded` sur deux `requestAnimationFrame`). Gating pur CSS : si le JS échoue, la nav reste visible (défaut sûr).

### Comment tu l'ajoutes sans casser le scrub

- Le CSS motion va dans un bloc dédié `/* MOTION LAYER (additive) */` à la fin de `style.css`, **avant** la media query responsive.
- Le JS motion va dans un IIFE séparé en HAUT de `script.js`, **avant** `initScrub()`. Il lit `prefersReducedEarly` une fois et fait un early-return si reduced-motion.
- À la toute fin du `style.css`, le bloc `@media (prefers-reduced-motion: reduce)` neutralise TOUT : `transform: none !important`, `transition: none !important`, `clip-path: none`, etc. Ce bloc est déjà présent en bas de `starter/style.css` — garde-le tel quel.
- Tu ne touches à aucune ligne du `initScrub()`. La couche motion et le moteur scrub sont étanches.

```css
/* MOTION LAYER (additive) — masked title reveal */
.ml-reveal .ml-line { overflow: hidden; padding-bottom: 0.04em; margin-bottom: -0.04em; }
.ml-reveal .ml-line__inner { display: block; transform: translateY(110%); transition: transform 0.9s var(--ease); transition-delay: var(--ml-delay, 0s); will-change: transform; }
.ml-reveal.is-shown .ml-line__inner { transform: translateY(0); }
/* full-bleed parallax (JS sets --py) */
.bleed__img, .pricing__img { will-change: transform; transform: translate3d(0, var(--py, 0px), 0) scale(1.12); }
/* press feedback */
.btn:active { transform: translateY(0) scale(0.98); transition-duration: 0.12s; }
```

Le JS complet de ces effets (build des lignes masquées, compteurs, parallaxe, intro nav) est déjà dans `starter/script.js`, dans la « MOTION LAYER » en tête de fichier (blocs commentés 1 à 4) — il tourne déjà, **n'y touche pas** et ne le réécris pas de tête.

---

## 6. Boucle de validation (le viewer dirige, ne code pas)

Ce skill n'est utile que branché à une boucle de feedback visuel. Le viewer décrit, tu construis, tu montres, il valide. **Jamais** « voilà le code, à toi de tester ».

**À chaque itération :**

1. **Tu assembles** la modif (HTML/CSS, ou branchement des frames, ou ajout d'une section).
2. **Tu sers en local** : `npx serve .` (ou `python -m http.server 4188`) — jamais `file://` — et tu donnes au viewer l'URL `http://localhost:PORT`.
3. **Tu produis une preuve visuelle**. **Deux cas :**
   - **Si le MCP Playwright est branché** (outil avancé, pas dans le kit de base) : screenshote à 1440×900 ET 1920×1080, en haut + milieu + bas. Pour le scrub, capture plusieurs positions de scroll (0 %, 25 %, 50 %, 100 %) pour montrer que la caméra avance et que les beats s'enchaînent.
   - **Sinon — le cas normal d'un Claude Code vierge** : tu ne peux PAS screenshoter toi-même. **Demande au viewer d'ouvrir `http://localhost:PORT` dans son navigateur et de regarder** (en scrollant le hero). Ne prétends jamais montrer une capture que tu n'as pas prise.
4. **Tu décris en français simple ce qu'il doit regarder** (« en scrollant, la caméra passe de la façade au salon, et le titre "X" apparaît à mi-parcours ») pour guider son œil — qu'il ait une capture sous les yeux ou son propre navigateur.
5. **Le viewer valide ou corrige en langage naturel** : « l'accent est trop clair », « mets l'image à gauche », « le titre du milieu arrive trop tôt ». Tu traduis ça en modif (variable, ordre de grille, `data-in`).
6. **Tu boucles** jusqu'à validation.

**Auto-audit avant de montrer** (tu coches mentalement) :
- Anti-slop respecté (§3) : pas de gradient fond, un seul accent, hairlines en ring/opacité, serif+sans, whitespace généreux.
- Hiérarchie typo claire au premier coup d'œil (titre ≫ corps ≫ label).
- Le scrub tourne : loader atteint 100 %, canvas non noir, scroll fait avancer les frames, beats en fondu.
- 🔴 **Aucun `.frame` éditorial en fallback** : chaque bloc éditorial porte une **vraie image** (pas le texte « Image à venir », pas un rectangle sombre). Si une image manque encore, dis-le au viewer (« il reste N images de section à générer — étape 4 bis ») au lieu de livrer un trou noir. Une image distincte par section, jamais le même fichier deux fois.
- Aucun double-scroll : la page scrolle d'un seul bloc à la molette, aucune boîte interne ne capture le scroll.
- Mobile < 820px : scrub statique propre, grilles repassées en une colonne.

**Ton rôle vs le sien** : tu es le pilote technique, lui est le directeur créatif. Il n'ouvre jamais un fichier. S'il dit « je sais pas coder », c'est exactement le mode prévu — tu fais tout, tu expliques en mots simples, et la seule chose que tu lui demandes ce sont des **décisions de goût** (couleur, ordre, ton du texte), jamais des décisions techniques.

---

## Récap des fichiers de référence (la vérité terrain qui marche — livrée dans le kit)

Tout est dans le **`starter/`** que le viewer a installé à l'étape 1. C'est ta seule source — aucun fichier externe n'est requis :
- `starter/index.html` — structure des sections, héros scrub avec beats, ordre type, copy placeholder entre `[crochets]`.
- `starter/style.css` — bloc `:root` (la charte, variables `/* ADAPT */`), tous les patterns de section, la couche motion, le bloc `@media (prefers-reduced-motion)`.
- `starter/script.js` — moteur scrub `initScrub()` (ne pas toucher) + couche motion (blocs commentés 1-4).

Tu pars du starter, tu adaptes les variables `/* ADAPT */` du `:root`, le contenu, le nombre de frames (`data-frames`) et la hauteur du hero. Tu ne réécris pas le moteur de mémoire — il est déjà là et il marche.
