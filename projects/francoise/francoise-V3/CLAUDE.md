# Projet Françoise Davenas — Âm'Astro™

## Client
**Françoise Davenas** — Astrologue Thérapeute Holistique  
**Marque :** Âm'Astro™  
**Site :** fd-harmonie.com (prototype V3 en cours, pas encore en ligne)  
**Contact :** f.davenas@gmail.com · +33 (0)6 19 20 82 56

## Statut (2026-07-03)
Modifications des 2 PDFs **intégrées** + audit UX/UI complet (v41).  
**v2 déployée** : https://francoise-davenas-v2.pages.dev (préversion privée, non indexable) — la v1 https://francoise-davenas.pages.dev reste intacte pour comparaison.  
**Email de validation envoyé à Françoise** (10 questions numérotées) — en attente de ses réponses pour tout finaliser en une passe, y compris l'onglet « Ateliers et journées immersives ».  
Volet réseaux sociaux : **mis de côté** — priorité au site.

## Architecture
- **Stack** : HTML/CSS vanilla pur, aucune dépendance, aucun build tool
- **Styling** : Fichier CSS unique `style.css?v=N` — incrémenter `N` à chaque déploiement CSS
- **Pages** : 10 fichiers HTML (nav + footer répétés = opportunité refacto future)
- **Images** : À la racine du projet
- **Serveur local** : `python -m http.server 8003` → `http://localhost:8003`

## Palette & typos
Variables CSS dans `:root` de `style.css` — **NE PAS modifier sans accord**.

| Variable | Valeur | Usage |
|----------|--------|-------|
| `--cream` | #FDFAF6 | Fond principal |
| `--rose` | #C2769E | Accent signature (logos, boutons) |
| `--gold` | #C9A86A | Accent luxe (citings, lignes) |
| `--espresso` | #2E2724 | Textes profonds, footer |
| `--muted` | #585047 | Corps texte, descriptions |

**Fonts :**
- `Cormorant Garamond` (serif, titres)
- `Mulish` (sans-serif, corps)

Importées via Google Fonts (ligne 1 de `style.css`).

## Pages du site

| Page | Fichier | Description |
|------|---------|-------------|
| Accueil | `index.html` | Hero + 8 services + À propos + Contact |
| Astrologie | `astrologie.html` | Thème natal, révolution solaire, synastrie, thème composite, progressions, directions |
| Mon approche AstroPsycho™ | `mon-approche.html` | Méthode phare : CLARÂME™, TRANSÂME™, ÂMEOR™ |
| Hypnose | `hypnose.html` | Explorations via état modifié de conscience |
| TCC & Schémathérapie | `tcc.html` | Thérapie cognitive-comportementale + schémas |
| Constellations familiales | `constellations.html` | Transgénérationnel et inconscient familial |
| Thérapie de couple | `therapie-couple.html` | Accompagnement relationnel |
| Sexothérapie | `sexotherapie.html` | Reconstruction de l'intimité |
| Ateliers astrologiques | `ateliers-astrologiques.html` | Ateliers individuels et collectifs |
| ~~Stages & journées spéciales~~ | *(à supprimer)* | Suppression demandée par Françoise (PDF1 p.4-6) |
| Ateliers et journées immersives | *(à créer)* | Nouvel onglet demandé par Françoise (PDF2 p.17) |
| Mentions légales | `mentions-legales.html` | Obligations légales |

## Images — règle impérative

**TOUTES les images doivent être optimisées avant mise en ligne.**

- **Logos/déco transparents** (PNG) : max 200 Ko
- **Photos** (JPEG) : max 300 Ko  
- **JPG existants** (astrologie.jpg, tcc.jpg, etc.) : déjà ok (41–128 Ko)

**À jour (2026-06-28) :**
- `nouveau-logo-sansfond.png` : 849 Ko (optimisé)
- `orchideeV2.png` : 727 Ko (optimisé)
- `Portrait_francoise_V3.jpg` : 124 Ko (converti + optimisé)
- `photo-psycho.jpg` : 182 Ko (converti + optimisé)

**Originaux conservés :** dossier `_originals/` (jamais supprimer).

## Dossiers du projet

| Dossier | Contenu | Statut |
|---------|---------|--------|
| `_originals/` | Backups des images originales | Ne pas toucher |
| `_unused/` | Assets V1/V2 remplacés | À archiver ou supprimer sur accord |
| `assets-generés/` | Vide, prévu pour exports RS | Futur |
| `reseaux-sociaux/` | Stratégie RS + calendrier mois 1 | ⏳ En attente client |

## Réseaux sociaux (dossier `reseaux-sociaux/`)

**Prestataire :** Stéphanie (Clockwork Ops)  
**Livrables prêts :**
- `ligne-editoriale.md` — 5 piliers, ton, hashtags, fréquence
- `charte-graphique-rs.md` — couleurs, formats, typo
- `calendrier-mois-1.md` — 30 posts rédigés et calendrier
- `guide-optimisation-profils.md` — bios Instagram + Facebook

**En attente — 2 décisions de Françoise :**
1. Facebook : profil personnel vs. Page pro Âm'Astro™ (recommandation : Page pro)
2. Qui produit ? Françoise seule / Stéphanie prépare + Françoise publie / automatisation Airtable

Voir `proposition-francoise.md` pour détails.

## Modifications demandées par Françoise (PDFs reçus le 2026-07-01)

Les 2 PDFs sont conservés à la racine du projet. Textes fournis = **à conserver mot pour mot**.

### Page Accueil (`index.html`)
- Hero bandeau : séparer sur 2 lignes sans tiret — "Astrologue Thérapeute Holistique" / "Spécialiste du Mieux-Etre"
- Logo à côté du nom : remplacer orchidée seule par image ronde astro-orchidée (fournie dans PDF1 p.1)
- Sous-titre hero : "Quand les astres révèlent l'âme ✨"
- Orchidée hero droite : recadrer pour voir bouton fermé + fleurs ouvertes (idée de croissance)
- Bouton CTA "Prendre RDV" : couleur orchidée (violet/fuchsia dominant de l'image)
- Section À propos : supprimer tiret devant "Votre Astro-Thérapeute" ; "Françoise Davenas" = même police et couleur que le titre
- Photo portrait : remplacer par nouvelle photo (femme cheveux courts gris, PDF1 p.2)
- Texte bio À propos : nouveau texte fourni (PDF1 p.2)
- Section services cards : nouvelles descriptions (PDF1 p.3 + PDF2 p.3)

### Navigation (toutes pages)
- "PRENDRE RDV" → "CONTACT"
- "THÉRAPEUTE" → "VOTRE THÉRAPEUTE"
- Supprimer l'onglet "Stages & journées spéciales"
- Ajouter onglet "Ateliers et journées immersives" (page à créer, contenu à définir)

### Page Astrologie (`astrologie.html`)
- Nouveau texte intégral fourni : Astrologie, Thème natal, Révolution solaire, Synastrie, Thème composite, Progressions secondaires, Directions symboliques (PDF1 p.7–15 + PDF2 p.4–9)
- Sous-titre : "Un puissant outil de connaissance de soi et de transformation intérieure / La boussole de l'âme"
- Section astéroïdes : titre renommé "une dimension supplémentaire dans la lecture du thème"
- Citation Jung : même taille de police que le texte courant

### Page Mon approche (`mon-approche.html`)
- Sous-titre : "Quand l'astrologie rencontre la profondeur thérapeutique" (supprimer "symbolique")
- "Se voir autrement. Se comprendre en profondeur. S'accorder à soi." (nouveau lead)
- "Mon approche AstroPsycho™" et "Votre parcours de transformation" → même écriture et couleur que les titres
- "Ce que vous traversez peut-être" → "Ce que vous vivez peut-être" (partout : CLARÂME, TRANSÂME, ÂMEOR)
- ÂMEOR™ : remplacer texte par version complète fournie (PDF2 p.12)
- "Hypnose thérapeutique" → même écriture et couleur

### Page Hypnose (`hypnose.html`)
- Nouveau texte intégral fourni (PDF2 p.13)
- Supprimer : "Les séances peuvent se dérouler en présentiel ou à distance..." + "Prête à accéder à vos ressources profondes ?"
- Citation Milton Erickson : déplacer en fin de page
- Changer photo de fond

### Page TCC (`tcc.html`)
- "Prête à transformer vos schémas limitants ?" → "Prêt(e) à commencer à transformer vos schémas limitants ?"
- Citation Épictète : déplacer en fin de page
- Changer photo de fond

### Page Constellations (`constellations.html`)
- Supprimer : "Les séances peuvent se dérouler en présentiel ou à distance..."
- "Prête à vous libérer de votre héritage inconscient ?" → "Prêt(e) à vous libérer des empreintes de votre héritage inconscient ?"
- Citation Jung : déplacer en fin de page
- Changer photo de fond

### Page Thérapie de couple (`therapie-couple.html`)
- Changer photo
- "Les séances peuvent se dérouler..." → "Selon la nature du lien, son niveau de tension, de stabilité ou de sécurité, le format le plus juste sera proposé afin de permettre un accompagnement adapté et équilibré."

### Page Sexothérapie (`sexotherapie.html`)
- Sous-titre card accueil : "Explorer la relation à soi, au corps, aux émotions, au désir et à l'autre pour favoriser une transformation intérieure et un apaisement durable"
- "Les séances peuvent se dérouler..." → "Les séances peuvent se dérouler en présentiel ou à distance, en visioconférence, en fonction de votre état et de ce qui convient le mieux à chaque étape, tout en maintenant une qualité d'écoute, de présence et de lien."
- Changer photo

### Page Ateliers astrologiques (`ateliers-astrologiques.html`)
- Sous-titre : "L'astrologie : la boussole de l'âme" (remplace "Approfondir la connaissance de soi par le langage des astres")
- "ATELIERS INDIVIDUELS" et "ATELIERS COLLECTIFS" → même écriture et couleur que les titres
- Présentiel : "Département 38, 69, 73 & 74" (remplace "Bourgoin-Jallieu (38) et environs")
- Supprimer la section avec la citation Jung sur fond sombre
- Citation "Apprendre c'est se retrouver" → déplacer en fin de page

### Footer (toutes pages)
- Adresse : 50 route du Bugey · 38300 Bourgoin-Jallieu · France
- Copyright : © 2026 AstroPsycho™ – Méthode d'accompagnement en astrologie et thérapie – Tous droits réservés
- Liens réseaux : Facebook + Instagram

---

## Décisions & historique

- **[2026-06-24]** Retenu orchidée (orchideeV2.png) comme image signature hero/footer
- **[2026-06-24]** Portrait V3 validé pour section "À propos"
- **[2026-06-28]** Optimisation images : 19.1 MB → 1.8 MB (gain 90%)
- **[2026-07-01]** Prototype validé par Françoise — modifications V2 reçues via 2 PDFs
- **[2026-07-01]** Hébergement confirmé sur Cloudflare Pages
- **[2026-07-01]** Réseaux sociaux mis de côté — site prioritaire

## Maintenance future

### Avant mise en ligne
- [ ] Valider visuellement toutes les pages sur http://localhost:8003
- [ ] Tester sur mobile réel (responsive < 640px)
- [ ] Vérifier performances avec Lighthouse (PageSpeed)
- [ ] Ajouter WebP versions si besoin (gain SEO supplémentaire)

### Cache-busting
- **CSS/JS** : modifier `?v=N` dans `<link>` et `<script>` de index.html
- **Images** : les fichiers PNG/JPG optimisés ne changent pas → aucun cache-bust nécessaire

### Hosting
- **Cloudflare Pages** (déploiement actif)
- Aucune dépendance serveur

## Contact & escalade

Toute question sur le design/contenu → Françoise (f.davenas@gmail.com)  
Toute question technique/performance → Stéphanie (Clockwork Ops)
