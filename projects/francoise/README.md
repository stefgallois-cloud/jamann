# Projet Françoise — Refonte site fd-harmonie.com

**Client :** Françoise Davenas — thérapeute bien-être
**Site original :** https://www.fd-harmonie.com/
**Statut :** En ligne sur Tiiny.host (preview) — retours Françoise en attente

## Livrables
- `index.html` — page principale (nav logo+nom, hero, 5 soins, à propos avec photo, citation, stages, partenaire, contact, footer)
- `style.css` — feuille de style partagée (Cormorant Garamond + Mulish, rose en accent)
- `soins/` — 5 pages détail (constellations, soins-energetiques, hypnose, tcc, astrologie)

## Stack
HTML/CSS/JS vanilla — déployable sur Cloudflare Pages, Netlify ou tout hébergeur statique

## Direction visuelle — « Soft Wellness »
- **Rose flashy `#E91E63` conservé** mais en **accent uniquement** (CTA, titres _em_, numéros, traits, icônes) — jamais en aplat plein écran
- Fonds calmes : crème `#FDFAF6` + beige `#F5EEE8` + rose voile `#FDECF1`
- Profondeur (citation, footer) : taupe profond `#2E2724`
- Typo : Cormorant Garamond (titres, italique) + Mulish (corps)
- Photo réelle de Françoise dans « À propos »
- Orchidées comme fil graphique, logo + nom dans nav et footer
- Icônes SVG Lucide (plus aucun emoji), ombres douces, transitions 200–350ms
- Accessibilité : responsive 375/768/1024/1440, `prefers-reduced-motion` respecté, focus clavier visibles

## Ce qui a été retiré (anti-patterns)
- Mandala SVG animé + sphère lumineuse pulsante (section À propos)
- Boutons en dégradé glossy → aplats rose + ombre douce
- Aplats rose plein écran (citation, footer) → taupe profond, rose en accent
- Emojis 📍 ✓ → icônes SVG
- Images Unsplash distantes des pages soins → images locales (`images/*.jpg`)

## Vérifié
- Rendu desktop / tablette / mobile : OK, zéro débordement horizontal
- Toutes les images locales chargent
- Photo de Françoise présente dans « À propos »

## Déploiement
- **Preview en ligne** : https://fd-harmonie-preview.tiiny.site (plan gratuit Tiiny.host — temporaire)
- **Déploiement final prévu** : Hostinger (Stef a déjà un hébergement actif) → gestionnaire de fichiers Hostinger, uploader le dossier `francoise/` dans `public_html/preview-francoise/`
- À faire après retours de Françoise : transférer sur Hostinger et connecter le domaine `fd-harmonie.com`

## Prochaines étapes
1. ✅ Lien de preview envoyé à Françoise
2. Recueillir les retours de Françoise (contenu, corrections mobile, ajustements visuels)
3. Corriger les problèmes mobile identifiés (à détailler après retours)
4. Point d'attention : revoir si besoin l'image hero de `constellations.html`
5. (Optionnel) accessibilité stricte : foncer le rose des petits libellés (`--rose-deep`) pour passer WCAG AA
6. Déploiement final sur Hostinger + connexion domaine fd-harmonie.com
7. Migration éventuelle vers Framer si Françoise veut être autonome sur le contenu
