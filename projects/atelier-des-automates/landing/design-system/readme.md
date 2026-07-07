# L'Atelier des Automates — Design System

> Ce document est le point d'entrée du système de design. Mis à jour au fil des évolutions.

**Sources fournies :**
- `uploads/branding.md` — charte de marque officielle (palette, typographie, personnalité, mascotte)
- `uploads/logo-robot-v2.png` — mascotte robot avec béret (fond foncé)
- `uploads/logo-robot-v2-transparent.png` — mascotte robot avec béret (fond transparent)
- `uploads/hero-bg.png` — illustration hero (engrenages 3D violet/cyan/indigo)

Aucun lien Figma ni dépôt de code fourni à ce stade.

---

## Contexte produit

**L'Atelier des Automates** est un service d'accompagnement à l'automatisation no-code et IA, destiné à un public débutant (entrepreneur·es, créatrices, freelances débordé·es). L'offre permet à des non-technicien·nes de mettre en place des automatisations concrètes et des workflows intelligents — sans coder.

**Surface principale :** landing page marketing, présence Notion (page pilote), réseaux sociaux, livrables clients. L'ambition est un système réutilisable sur toutes ces surfaces.

---

## CONTENT FUNDAMENTALS

### Ton et voix

Trois traits en équilibre — jamais un seul qui domine :

| Trait | Rôle | Où ça se voit |
|---|---|---|
| **La copine qui sait faire** | Base — chaleur, complicité | Corps de texte, storytelling |
| **L'artisane experte** | Renfort — crédibilité, savoir-faire | Explications techniques, livrables |
| **La pionnière malicieuse** | Pointe — énergie, humour | Accroches, CTA, titres |

### Règles d'écriture

- **Tu** (tutoiement) — pas de vouvoiement. Intimité et proximité.
- **Je** côté marque — voix humaine, pas institutionnelle.
- Phrases courtes. Un paragraphe = une idée.
- **Pas** de "3 places disponibles" ou urgence artificielle.
- Mots clés : "outils no-code et IA", "automatisations", "workflows", "sans coder".
- Majuscules normales (titre case à l'anglaise : non). Casse normale en français.
- Emojis : utilisés avec parcimonie, uniquement en contexte social/informel. Pas dans les titres de landing page.
- Ponctuation : virgule d'Oxford non applicable (français). Tirets cadratins (—) pour les apartés.

### Exemples de copie validée

- *"Tu n'as pas à tout faire toi-même."*
- *"Laisse les automates bosser pendant que tu crées."*
- *"Pas besoin de coder — juste de savoir ce que tu veux."*

---

## VISUAL FOUNDATIONS

### Couleurs

| Rôle | Token | Valeur |
|---|---|---|
| Identité / CTA | `--color-primary` | `#6366F1` Indigo |
| Transitions douces | `--color-secondary` | `#A78BFA` Violet |
| Accent énergie | `--color-accent` | `#06B6D4` Cyan |
| Fond par défaut | `--color-bg` | `#F8FAFC` Slate-50 |
| Corps de texte | `--color-text-body` | `#475569` Slate-600 |
| Sections contrastées | `--color-bg-dark` | `#0F172A` Slate-900 |

**Règles d'usage :** Indigo pour tout ce qui est action et identité. Violet pour les transitions et dégradés. Cyan avec parcimonie — jamais en fond plein, toujours en accent ponctuel (shimmer de CTA, œillets de la mascotte). Le fond foncé `#0F172A` crée un pont visuel avec le fond de la mascotte robot.

### Typographie

- **Display / Titres :** DM Sans 600–800 (substitut Geist — voir note ci-dessous)
- **Corps / Labels :** Inter 300–600
- Titres grands et punchy. Corps aéré (`line-height: 1.65`). Letter-spacing négatif sur les grands titres (`-0.03em`).

> ⚠️ **Note de substitution :** Geist (police prescrite dans la charte) n'est pas disponible sur Google Fonts. DM Sans a été utilisée en remplacement. Fournir les fichiers `.woff2` Geist pour une conformité exacte.

### Backgrounds & textures

- **Fond par défaut :** `#F8FAFC` — blanc cassé, très léger.
- **Sections héroïques :** fond `#0F172A` foncé avec illustration 3D (engrenages violet/cyan) ou dégradé `indigo → violet`.
- **Dégradés :** `135deg, #6366F1 → #A78BFA` (brand), ou version étendue incluant cyan. Jamais de dégradés criards plein-écran pour le fond — réservés aux éléments (boutons, badges, glows).
- **Glow/halo :** ombres colorées `rgba(99,102,241,0.35)` pour indigo, `rgba(6,182,212,0.30)` pour cyan — utilisées sous les éléments hero et CTA.

### Animation

- Easing naturel : `ease` ou `cubic-bezier(0.34, 1.56, 0.64, 1)` (spring léger) pour les interactions.
- Transitions : 150ms (fast), 220ms (base), 350ms (slow).
- Hover sur boutons : légère montée `translateY(-1px)` + glow indigo.
- Pas d'animations décoratives en boucle infinie. Motion purposeful.

### États hover / press

- **Hover bouton primary :** fond plus foncé (`#4F46E5`) + ombre glow indigo + translateY(-1px).
- **Hover liens :** couleur indigo, pas de soulignement sur les nav items.
- **Press :** légère réduction scale (0.98) ou suppression du translateY.
- **Cards au hover :** translateY(-2px) + shadow plus prononcée.

### Cartes

- Fond blanc `#FFFFFF`, border `1px solid #E2E8F0`.
- Border-radius `--radius-lg` (16px).
- Ombre `--shadow-md`.
- Au hover : `--shadow-lg` + translateY(-2px).

### Coins arrondis

- Petits éléments (badges, tags, inputs) : `--radius-sm` (6px) à `--radius-md` (10px).
- Cartes : `--radius-lg` (16px).
- Modales, grandes surfaces : `--radius-xl` (24px).
- Boutons pilule : `--radius-full` (9999px).

### Borders & séparateurs

- Bords subtils : `1px solid var(--color-border)` (`#E2E8F0`).
- Pas de bordures épaisses ou colorées en accent (pas de "left-border colored cards").

### Iconographie

Voir section ICONOGRAPHY ci-dessous.

### Imagery

- **Direction couleur :** violet/indigo/cyan — cohérent avec la palette. Pas de photos réalistes à dominante chaude.
- **Style illustratif :** 3D isométrique (comme hero-bg.png — engrenages 3D). Rendu propre, fond clair ou transparent.
- **Pas de grain, pas de B&W.** Couleurs vives mais pas criardes.
- **Mascotte :** robot à béret — expresssion amicale, "pas intimidant". Asset clé à utiliser librement.

---

## ICONOGRAPHY

- Aucun icon font propriétaire fourni. Aucun SVG d'icônes dans les sources.
- **Recommandation :** Lucide Icons (CDN) — stroke style, weight 1.5, arrondi. Compatible avec la douceur visuelle de la marque.
- Taille standard : 16px (inline), 20px (UI), 24px (hero/features).
- Emoji : uniquement contexte social/informel, pas dans les UIs produits.

---

## ASSETS

| Fichier | Usage |
|---|---|
| `assets/logo-robot-v2.png` | Mascotte robot (fond foncé `#0F172A`) |
| `assets/logo-robot-v2-transparent.png` | Mascotte robot (fond transparent) |
| `assets/hero-bg.png` | Illustration hero engrenages 3D |

**Aucun logo wordmark fourni.** Le nom "L'Atelier des Automates" est rendu en typographie (DM Sans 700) partout où un logotype textuel serait attendu. Fournir un fichier SVG de logotype si disponible.

---

## INDEX DES FICHIERS

```
styles.css                    — Point d'entrée CSS (imports uniquement)
tokens/
  colors.css                  — Palette complète + aliases sémantiques
  typography.css              — Familles, tailles, poids, interlignages
  spacing.css                 — Espacements, rayons, ombres, transitions
assets/
  logo-robot-v2.png
  logo-robot-v2-transparent.png
  hero-bg.png
guidelines/
  colors-primary.card.html    — Specimen couleurs primaires
  colors-neutral.card.html    — Specimen couleurs neutres
  colors-semantic.card.html   — Specimen aliases sémantiques
  type-display.card.html      — Specimen typographie display
  type-body.card.html         — Specimen typographie body
  type-scale.card.html        — Échelle typographique complète
  spacing-tokens.card.html    — Tokens d'espacement
  spacing-radius.card.html    — Border radius
  spacing-shadows.card.html   — Système d'ombres
  brand-mascot.card.html      — Mascotte + assets brand
  brand-gradients.card.html   — Dégradés et glows
components/core/
  Button.jsx / .d.ts / .prompt.md
  Badge.jsx / .d.ts / .prompt.md
  Card.jsx / .d.ts / .prompt.md
  Input.jsx / .d.ts / .prompt.md
  Tag.jsx / .d.ts / .prompt.md
  buttons.card.html
  cards.card.html
  forms.card.html
ui_kits/website/
  index.html                  — Landing page interactive
```

### Intentional additions (components sans source de référence)
- `Button` — CTA primary/secondary/ghost, fondamental pour toute la landing page.
- `Badge` — labels de statut/feature, vus dans les copies marketing.
- `Card` — conteneur réutilisable pour features, témoignages, offres.
- `Input` — champ de formulaire (email opt-in, contact).
- `Tag` — label de catégorie (workflows, outils, etc).

---

## Composants

Voir `components/core/buttons.card.html`, `cards.card.html`, `forms.card.html`.

## UI Kits

- **Website** (`ui_kits/website/index.html`) — Landing page L'Atelier des Automates.
