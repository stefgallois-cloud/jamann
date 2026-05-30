# Bonjour Beasts — Landing Page

Hub de marque public. Redirige vers la boutique Etsy.
Lancement prévu : juillet 2026.

---

## Ouvrir la page

Double-cliquer sur `index.html` — aucune dépendance serveur.
Ou via Live Server dans VS Code / Antigravity IDE.

Fonts chargées depuis Google Fonts (connexion internet requise pour la preview).

---

## Structure des fichiers

```
landing-page/
├── index.html
├── css/
│   └── style.css
├── js/
│   └── app.js
├── assets/                      ← dépose tes photos ici
│   └── _DEPOSE-TES-IMAGES-ICI.md
└── README.md
```

---

## Actions manuelles avant mise en ligne

### 1. Liens Etsy a remplacer

Rechercher `href="#"` dans `index.html` — chaque occurrence est commentée avec `<!-- TODO -->`.

| Emplacement | Action |
|---|---|
| Nav header — "Shop on Etsy" | URL boutique Etsy principale |
| Mobile nav — "Shop on Etsy" | Meme URL boutique Etsy |
| Hero — "Explore the Shop" | URL boutique Etsy principale |
| Brand story — "See all designs" | URL boutique Etsy principale |
| Niche Golden — "Shop Golden Designs" | URL boutique Etsy + filtre collection Golden |
| Niche Frenchie — "Shop Frenchie Designs" | URL boutique Etsy + filtre collection Frenchie |
| Niche Memorial — "Explore Memorial Line" | URL boutique Etsy + filtre collection Memorial |
| Product Tees — "Shop Tees" | URL boutique Etsy + filtre tees |
| Product Sweatshirts — "Shop Sweatshirts" | URL boutique Etsy + filtre sweatshirts |
| Product Mugs — "Shop Mugs" | URL boutique Etsy + filtre mugs |
| Product Memorial — "View Memorial Line" | URL boutique Etsy + filtre memorial |
| CTA final — "Visit the Etsy Shop" | URL boutique Etsy principale |
| Footer — Collections (4 liens) | URLs Etsy par collection |
| Footer — copyright "Etsy" | URL boutique Etsy principale |

### 2. Reseaux sociaux

Dans le footer, 3 liens sociaux avec `href="#"` :
- Instagram → URL du compte Instagram Bonjour Beasts
- TikTok → URL du compte TikTok
- Pinterest → URL du compte Pinterest

### 3. Images a fournir (photos d'ambiance)

**Système automatique** : glisse simplement le fichier dans `assets/` avec le bon nom,
recharge la page → la photo s'affiche en fondu par-dessus le placeholder dégradé.
Aucun code à toucher. Détail complet dans `assets/_DEPOSE-TES-IMAGES-ICI.md`.

| Nom de fichier (dans `assets/`) | Zone | Ratio idéal | Sujet |
|---|---|---|---|
| `story.jpg` | Brand Story — grand visuel | 4:3 (≈800×600) | Photo lifestyle chien, lumière chaude |
| `golden.jpg` | Niche Golden | 3:2 (≈600×400) | Golden retriever expressif / drôle |
| `frenchie.jpg` | Niche Frenchie | 3:2 (≈600×400) | Frenchie, ambiance douce / coquette |
| `memorial.jpg` | Niche Memorial | 3:2 (≈600×400) | Portrait chien, lumière douce, sobre |

Formats acceptés : `.jpg`, `.jpeg`, `.png`, `.webp`. Recadrage auto (`object-fit: cover`),
donc pas besoin d'être pile aux dimensions — respecter le ratio suffit.

**Mockups produits (tee / sweat / mug / sweat memorial)** : laissés en placeholder élégant.
Ce sont de vrais mockups de designs Bonjour Beasts, à générer via **Ideogram** quand les
visuels produits seront prêts — on les branchera à ce moment-là.

---

## Personnalisation des couleurs

Toutes les couleurs sont dans les CSS custom properties, au debut de `css/style.css` :

```css
:root {
  --cream:        #FAF6EE;   /* fond principal */
  --terracotta:   #C5583A;   /* couleur dominante / CTA */
  --ochre:        #D4900A;   /* accent chaud / badges */
  --rose:         #E8B4B0;   /* touche coquette */
  --charcoal:     #2B2017;   /* texte / section sombre */
}
```

---

## Typographies

- Display / titres : **Fraunces** (Google Fonts) — serif variable expressif
- Body / texte : **Nunito** (Google Fonts) — grotesque arrondie et lisible

---

## SEO — a completer avant mise en ligne

Dans `index.html`, balise `<meta name="description">` presente. Ajouter :
- Open Graph tags (og:title, og:description, og:image)
- Twitter card tags
- Favicon (format .ico + .png 192px et 512px)
- `lang` est deja `en` — verifier si besoin de version fr

---

## Note technique

Aucun framework. HTML/CSS/JS vanilla. Fonctionne sur tous navigateurs modernes.
Scroll reveal via IntersectionObserver avec fallback. Hamburger menu accessible (aria-expanded).
