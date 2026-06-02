# Projet Françoise — Refonte site fd-harmonie.com

**Client :** Françoise Davenas — thérapeute bien-être
**Site original :** https://www.fd-harmonie.com/
**Statut :** Refonte « Soft Wellness » réalisée — à valider par Stéphanie puis Françoise

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

## Prochaines étapes
1. Validation visuelle par Stéphanie (puis envoi d'un lien à Françoise)
2. Point d'attention : revoir si besoin l'image hero de `constellations.html` (asset local thématiquement à confirmer)
3. (Optionnel) accessibilité stricte : foncer le rose des petits libellés (`--rose-deep`) pour passer WCAG AA sur le texte < 14px
4. Déploiement (Cloudflare Pages) + lien de prévisualisation
5. Migration éventuelle vers Framer si Françoise veut être autonome sur le contenu
6. Connexion domaine fd-harmonie.com
