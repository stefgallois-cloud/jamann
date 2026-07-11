# CLAUDE.md — Le Manoïre

Instructions spécifiques à ce projet. Complète le CLAUDE.md racine, ne le remplace pas.

## Faits clés à ne jamais réinventer

- **Réouverture : 16 juillet 2026** (date publique confirmée, retenir celle-ci — pas le 9 juillet).
- **Propriétaire / gérant :** Michael (Micka) Moreau — micha.moreau@gmail.com / @me.com. Laurent Horner est un abonné réel, pas le client.
- **Mascotte :** Anouck, Saint-Bernard, arrivée à 2 mois au Col, aujourd'hui 10 ans.
- **Géographie :** Riviera-Pays-d'Enhaut / Préalpes vaudoises — **jamais "Chablais"**.
- **Altitude :** Col de Jaman, 1 512 m.
- **Adresse :** Col de Jaman, 1820/1824 Montreux, Suisse.
- **Horaires :** Lun–Ven 10h–21h (cuisine 12h–21h) · Sam–Dim 8h–22h (cuisine 12h–21h).
- **Accès :** voiture (route étroite/sinueuse depuis Montreux ou Les Avants, grand parking gratuit au col, fermé aux véhicules en hiver), MOB (train, gare de Jaman, ~40 min depuis Montreux), à pied (sentiers détaillés sur `randonnees.html`).
- **Contact site :** tél. 021 964 63 30 · contact@lemanoire-jaman.ch.
- **Design/hébergement (mentions légales) :** Clockwork Ops (conception) / Infomaniak (hébergement).

## Architecture du dossier

```
manoire/
├── CLAUDE.md                 - Ce fichier
├── README.md                 - Pilotage projet
├── charte_graphique/         - Logos officiels (voir section Design ci-dessous), PDF charte
├── site web/                  - Site actif (voir section Site actif ci-dessous), racine directe — plus de sous-dossier sitev2/starter/
│   ├── docs/                    - Docs de conception (01-clarification.md, 02-brief.md, 03-copy.md, GUIDE.md)
│   └── photos/                  - Vraies photos brutes du lieu (drone, terrasse, Anouck) — non compressées, non versionnées (gitignore *.jpg/*.png)
├── archives/                  - Rien ne se supprime : tout superseded va ici (sous-dossiers datés/contextuels)
│   └── site-web-v1-superseded/  - Ancien site multi-pages (index/carte/legal/nav.js/styles.css) + son charte_graphique, entièrement remplacés
├── sessions/                  - Comptes-rendus de session
├── newsletters/, jamann-app/, planning-app/, posts/, prompt/, devis/, documents/, scripts/, bon cadeaux/ - Sous-projets annexes
```

**Règle d'archivage** (héritée du CLAUDE.md racine) : rien ne se supprime, tout ce qui est superseded va dans `archives/`, sous-dossier daté par contexte.

**Rangement 2026-07-11 :** le site vivait dans `site web/sitev2/starter/` — nom hérité du scaffold de la skill `cinematic-site-flythrough` (dossier "starter"), pas voulu comme structure finale. Tout le contenu a été remonté directement dans `site web/` (paths relatifs inchangés, donc rien de cassé). L'ancien piège des deux fichiers `carte-v2.html` de même nom est résolu : l'orphelin est archivé, il n'en reste qu'un, à la racine de `site web/`.

## Site actif (`site web/`) — cinématique scroll-scrub

Stack vanilla HTML/CSS/JS, aucune dépendance de build. Voir aussi le bloc "Développement technique" du CLAUDE.md racine pour les conventions génériques (serveur local, cache-bust, scroll-scrub).

**Pages actives :** `index.html` (accueil, hero vidéo scroll-scrub), `carte-v2.html` (menu), `randonnees.html`, `en-direct.html` ("En direct / Infos pratiques"), `mentions-legales.html`.

**Design system :** tout nouveau composant reprend les tokens de `style.css` (`--bordeaux`, `--ocre`, `--or-logo`, `--orange`, `--creme-1/2`, `--brun-moyen`, `--brun-fonce`) et les classes `.editorial`/`.bleed`/`.stats`/`.menu`/`.contact`/`.eyebrow`/`.btn`/`.reveal` plutôt que d'en redéfinir localement. Chaque page a son propre fichier d'overrides (`style-carte-v2.css`, `style-randonnees.css`, `style-en-direct.css`, `style-legal.css`) qui ne contient QUE ce qui est vraiment spécifique à cette page — `carte-v2.html` + `style-carte-v2.css` est la référence de fidélité à suivre.

**Règle images :** `site web/photos/` contient les vraies photos du lieu — toujours vérifier ce dossier avant d'aller chercher une image sur le web. Ne jamais utiliser d'image scrapée sans l'accord explicite de Stéphanie, jamais garder une bannière/logo d'un tiers. **Ne jamais réutiliser une même photo sur deux pages différentes du site** — règle stricte, déjà source d'un incident corrigé. Compresser tout fichier retenu via `ffmpeg -vf "scale=1600:-2" -q:v 3` avant de le poser dans `assets/img/`.

**Cache-bust :** deux mécanismes distincts (voir CLAUDE.md racine) — `CACHE_BUST` dans `script.js` pour les frames du hero, `?vN` manuel sur chaque `<link>`/`<script>` par page dès que son CSS/JS change.

**Nav/footer partagés :** identiques sur toutes les pages (`.nav`, `.footer`) — toute page ajoutée doit répliquer exactement cette structure pour rester cohérente.

## Design / logos officiels

Le vrai lockup de marque (mascotte illustrée + texte "LE MANOÏRE" + "COL DE JAMAN") est dans `charte_graphique/Le Manoïre_Logo 1_Couleur_px1000.png` (fond transparent). Les versions icône-seule (`sans_fond.png`, `..._sans.png`) n'ont pas de texte. **Toujours vérifier ce dossier avant de recréer un logo/texte séparément** — c'est de là que vient `site web/assets/img/logo-footer-full.png` (version recadrée utilisée dans le footer).

## Session Codex

`.codex/`, `.agents/`, `AGENTS.md` à la racine du repo (hors de ce dossier projet) sont générés par Codex CLI — miroir de CLAUDE.md pour cet autre outil, pas du contenu projet. Une session Codex a construit une première version de `randonnees.html`/`carte-v2.html`/`en-direct.html` le 2026-07-10 ; ce travail a depuis été repris et corrigé (design system, images, copy).

## Repo partagé — vigilance

Ce repo git est le même que celui utilisé pour tous les autres projets de Stéphanie (branches multiples, plusieurs sessions/outils peuvent tourner en parallèle sur le même dossier). Un incident du 2026-07-11 a montré qu'un fichier tracké (`carte-v2.html`) peut disparaître du disque sans action de la session en cours — toujours vérifier `git status` avant de conclure qu'un fichier a été perdu, et privilégier `git restore` (récupérable tant que c'est commité) plutôt que de repartir de zéro.
