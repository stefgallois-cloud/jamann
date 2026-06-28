# Projet Françoise Davenas — Âm'Astro™

## Client
**Françoise Davenas** — Astrologue Thérapeute Holistique  
**Marque :** Âm'Astro™  
**Site :** fd-harmonie.com (prototype V3 en cours, pas encore en ligne)  
**Contact :** f.davenas@gmail.com · +33 (0)6 19 20 82 56

## Statut (2026-06-28)
Prototype HTML/CSS vanilla complet — design en cours de validation avec le client.  
Volet réseaux sociaux : livrables préparés, **en attente de 2 décisions client** (voir `reseaux-sociaux/proposition-francoise.md`).

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
| Astrologie | `astrologie.html` | Détails complets de la pratique astrologique |
| Mon approche AstroPsycho™ | `mon-approche.html` | Méthode phare : CLARÂME™, TRANSÂME™, ÂMEOR™ |
| Hypnose | `hypnose.html` | Explorations via état modifié de conscience |
| TCC & Schémathérapie | `tcc.html` | Thérapie cognitive-comportementale + schémas |
| Constellations familiales | `constellations.html` | Transgénérationnel et inconscient familial |
| Thérapie de couple | `therapie-couple.html` | Accompagnement relationnel |
| Sexothérapie | `sexotherapie.html` | Reconstruction de l'intimité |
| Ateliers astrologiques | `ateliers-astrologiques.html` | Ateliers individuels et collectifs |
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

## Décisions & historique

- **[2026-06-24]** Retenu orchidée (orchideeV2.png) comme image signature hero/footer
- **[2026-06-24]** Portrait V3 validé pour section "À propos"
- **[2026-06-28]** Optimisation images : 19.1 MB → 1.8 MB (gain 90%)

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
- Site prêt pour Vercel, Netlify ou tout hébergeur statique
- Aucune dépendance serveur

## Contact & escalade

Toute question sur le design/contenu → Françoise (f.davenas@gmail.com)  
Toute question technique/performance → Stéphanie (Clockwork Ops)
