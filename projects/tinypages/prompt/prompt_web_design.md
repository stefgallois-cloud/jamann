# Prompt Web Design — Libre à 50 · Landing Page de capture

**Date :** 2026-06-12
**Agent :** agent-web-designer
**Fichier produit :** `projects/tinypages/landing/index.html`

---

## Brief

**Projet :** Libre à 50 — Business de voyage solo pour femmes 50-65 ans
**Objectif :** Collecter l'email en échange d'un guide PDF gratuit ("Les 7 destinations parfaites pour ton premier voyage solo après 50 ans")
**Outil final :** TinyPages (formulaire HTML pur, connecteur natif)

**Cible :**
- Femme, 52-64 ans
- Vient de divorcer / est veuve / voit ses enfants partir
- A toujours voyagé en couple ou en famille
- Peur du regard des autres, de l'organisation, de la sécurité
- Budget voyage : 2 000-5 000€

---

## Direction artistique

**Editorial chaleureux / Méditerranéen raffiné**

Justification : La cible est une femme mature qui aspire à l'élégance — pas au gadget "lifestyle startup". Elle doit se sentir vue et digne, pas ciblée comme senior. L'univers méditerranéen (ocres, terracotta, lumière chaleureuse) évoque le voyage solaire sans être cliché. Le serif élégant (Playfair Display) apporte la profondeur éditoriale qu'une femme de 57 ans reconnaît dans un beau magazine de voyage.

---

## Palette

| Token | Valeur | Usage |
|-------|--------|-------|
| `--cream` | `#FAF7F2` | Fond principal |
| `--terracotta` | `#C4633A` | Accent principal, CTA, headers |
| `--caramel` | `#D4A66A` | Accent secondaire, étoiles, ornements |
| `--anthracite` | `#2C2C2C` | Texte corps |
| `--anthracite-mid` | `#5A5A5A` | Texte secondaire |
| `--white` | `#FFFFFF` | Cards, formulaire |

---

## Typographie

- **Titres :** Playfair Display (Google Fonts) — serif élégant, italique expressif
- **Corps :** Lato — lisible, léger, moderne sans être froid

---

## Structure HTML

1. **Hero** — 2 colonnes desktop (texte + formulaire card), stack vertical mobile
   - Fond photographique Unsplash (côte méditerranéenne) avec overlay crème gauche
   - Headline serif + bullets bénéfices + pill tag
   - Card formulaire avec mockup PDF en haut, filet gradient terracotta

2. **Section "Pour qui"** — fond terracotta, grid 2×2, cartes glassmorphism doux
3. **Section témoignages** — fond crème, 2 cards côte à côte, initiales avatars colorés
4. **CTA final** — fond crème chaud, formulaire inline row desktop
5. **Footer** — fond anthracite, minimaliste

---

## Choix techniques

- HTML/CSS/JS pur — zéro dépendance externe sauf Google Fonts
- CSS custom properties pour toutes les valeurs de design
- Layout : CSS Grid — hero `1fr 420px`, sections `1fr 1fr`
- Mobile-first : `grid-template-columns: 1fr` par défaut, `@media (min-width: 900px)` pour desktop
- Animations : `@keyframes fadeUp` sur hero (CSS pur) + scroll reveal via `IntersectionObserver` (JS minimal vanilla, 15 lignes)
- Formulaire HTML pur — compatible TinyPages connecteur natif (POST)
- Image hero via URL Unsplash avec fallback gradient CSS terracotta/bleu-gris si hors ligne

---

## Anti-patterns évités

- Pas d'Inter
- Pas de gradient violet sur blanc
- Pas de layout 100% centré-colonne
- Pas de design "startup digitale"
- Pas de card rounded-xl génériques sans personnalité
