# Brief — Landing Page Bonjour Beasts

## Brief d'origine

Crée une landing page **hub de marque** pour **Bonjour Beasts**, une marque Etsy de pet apparel & art. Livrable HTML/CSS/JS autonome, production-grade, esthétique distinctive (zéro design générique IA).

### Contexte marque

Bonjour Beasts — marque Etsy de vêtements & art pour amoureux des chiens, propulsée par IA. Marché US-first + EU. Lancement opérationnel : juillet 2026 (le shop Etsy n'est PAS encore ouvert aujourd'hui).

Niche : race de chien × personnalité. 3 sous-niches d'attaque :
1. Golden Retriever × personnalité — humour Gen Z, ton tendre et drôle ("Anxious Golden Mom", "Chaotic Golden Dad", "Mom of 2 Goldens"). Cœur chaleureux/fun de la marque.
2. French Bulldog × coquette — esthétique soft, jeune, urbaine, un peu coquette (bows, rose poudré en touche).
3. Memorial pets (toutes races) — segment émotionnel premium, hommage aux animaux disparus (sweats brodés haut de gamme). À traiter avec délicatesse et élégance, pas de mièvrerie.

Produits phares au lancement : t-shirts, sweats, mugs (+ sweats brodés memorial premium).

Positionnement : des designs qui célèbrent le chien de chacun avec personnalité et humour — pas du "dog mom" générique. Personnalisation possible (nom du chien, nombre de chiens).

### Objectif de la page

Hub de marque : présenter l'univers Bonjour Beasts et rediriger vers la boutique Etsy (CTA principal = "Shop on Etsy"). Pas une page de capture email, ni une page produit unique.

Comme le shop Etsy n'ouvre qu'en juillet 2026 : les boutons "Shop on Etsy" pointent vers `#` (placeholder). Mention honnête et élégante du type "Launching July 2026" (badge hero).

### Langue

Anglais (langue de la marque + Etsy US-first). Copy réel, ton chaleureux et un brin drôle, jamais corporate.

### Direction visuelle

- Palette : tons chauds — crème/off-white en base, terracotta, moutarde/ocre, avec une touche de rose poudré.
- Typo : grotesque arrondie et chaleureuse pour le texte + une display fun/expressive pour les gros titres.
- Vibe : marque pet Instagram chaleureuse, artisanale, attachante. Distinctive et mémorable.
- Micro-interactions soignées, responsive mobile-first, HTML/CSS/JS vanilla.

### Structure

1. Header — logo + nav légère + bouton "Shop on Etsy"
2. Hero — accroche marque forte + sous-titre + CTA Etsy + badge "Launching July 2026"
3. Univers / mini-story de marque
4. Les 3 sous-niches — 3 cartes avec micro-ambiance propre
5. Produits phares — tees / sweats / mugs / memorial premium
6. Pourquoi nous / valeurs
7. CTA final — "Join the pack on Etsy"
8. Footer — minimal, social placeholders, copyright

### Livrables

Emplacement : `projects/printify-100k/landing-page/`
- `index.html`
- `css/style.css`
- `js/app.js`
- `README.md`
- `CONTENU-FR.md`

---

## Direction artistique retenue

**Warmth Editorial**

Mise en page asymétrique inspirée des magazines lifestyle indépendants. Typographie display expressive (Fraunces — serif variable plein de caractère) associée à un body arrondi et doux (Nunito). Palette terracotta franc + ocre + crème cassée + rose poudré. Textures légères (bruit CSS), blobs ambients animés dans le hero, banderole défilante.

Justification : La marque cible un public émotionnel et esthétique (dog mom Gen Z/Millennial, audience Instagram). Le register "editorial warm" donne la crédibilité d'une vraie marque lifestyle tout en gardant la chaleur et l'humour attendus. C'est l'antithèse du template POD beige-générique.

---

## Choix techniques

- HTML/CSS/JS vanilla — aucun framework
- Fonts via Google Fonts CDN (Fraunces + Nunito)
- Scroll reveal via IntersectionObserver (fallback: reveal immédiat)
- CSS custom properties pour toutes les couleurs et espacements
- Mobile-first avec breakpoints 640px / 768px / 1024px
- Noise texture en SVG data URI (légère, 0.018 d'opacité)
- Blobs animés CSS (keyframes drift) dans le hero
- Banderole défilante CSS-only (animation marquee)
- Hamburger accessible (aria-expanded, fermeture Escape + clic lien)

---

## Date de création

2026-05-30
