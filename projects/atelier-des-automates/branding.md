# L'Atelier des Automates — Charte de marque

> Document vivant. Toute évolution de palette, ton ou mascotte se met à jour ici.
> Créé le 2026-07-03.

---

## Personnalité de marque

Un dosage des trois, jamais un seul trait qui domine :

| Trait | Rôle | Se voit où |
|---|---|---|
| **La copine qui sait faire** | La base — chaleur, complicité, ton ami·e à ami·e | Corps de texte, storytelling, échanges |
| **L'artisane experte** | Le renfort — crédibilité, savoir-faire, rassure | Explications techniques, présentation des livrables |
| **La pionnière malicieuse** | La pointe — énergie, humour, avant-gardisme | Accroches, CTA, titres, moments clés |

Cohérent avec les règles de ton déjà validées dans [`storytelling.md`](storytelling.md) (paragraphes courts, "outils no-code et IA", jamais "3 places").

---

## Palette de couleurs

Base = la landing page (`landing/index.html`), étoffée. Le logo actuel (marine/vert anis) est à faire évoluer vers cette palette pour unifier mascotte et landing (voir section Mascotte).

| Couleur | Hex | Usage |
|---|---|---|
| Indigo — primaire | `#6366F1` | CTA, identité, liens, éléments clés |
| Violet — secondaire | `#A78BFA` | Dégradés, accents doux, hover |
| Cyan — accent énergie | `#06B6D4` | Highlights, la touche "pionnière malicieuse", shimmer CTA |
| Fond clair | `#F8FAFC` | Fond par défaut |
| Neutre texte | `#475569` | Corps de texte, éléments secondaires |
| **Foncé de contraste (nouveau)** | `#0F172A` (proche du marine du logo actuel) | Sections contrastées, dark mode, pont visuel avec la mascotte |

**Règle d'usage :** indigo pour l'identité et l'action, violet pour la douceur des transitions, cyan avec parcimonie pour les moments d'énergie (jamais en fond plein écran — reste un accent).

---

## Typographie

- **Titres / display :** Bricolage Grotesque (600–800) — grotesque "irrégulier", pensé pour un rendu artisanal plutôt que généré ; colle au nom "Atelier"
- **Corps de texte :** Hanken Grotesk (300–600) — lisible, chaleureux, moins vu que Inter

Changé le 2026-07-07 : Geist + Inter fonctionnaient mais étaient devenus la paire la plus vue des sites générés par IA — remplacées pour se différencier. Les deux nouvelles polices sont disponibles nativement sur Google Fonts.

---

## Mascotte (le robot)

Le personnage robot (béret bleu, œillets vert anis) reste l'ambassadeur visuel. Direction d'évolution :

- Recoloration progressive vers la palette indigo/violet/cyan (au lieu du marine/vert anis actuel)
- Garder l'expression amicale et le côté "pas intimidant" — c'est ce qui sert l'audience débutante
- Le béret reste un identifiant fort (touche artisanale/créative) — à conserver dans toute évolution

**Assets actuels** (à faire évoluer, pas à jeter) : `landing/assets/logo.png`, `landing/assets/logo-robot.png`

---

## Imagerie

Les visuels existants (`landing/assets/images/`) suivent déjà une direction cohérente à documenter au fil de l'eau : mockups produits, flows d'automatisation illustrés, scènes de vie (soirée débordée → soulagement). Cette charte se complète avec des exemples concrets à mesure que de nouveaux visuels sont produits.

---

## Ce que ça sert en premier

Système complet et réutilisable — landing page, page Notion pilote, réseaux sociaux, futurs livrables clients. Pas un one-shot pour la landing seule.

---

## Système de design technique (2026-07-04)

Cette charte a été formalisée en système de design exploitable via Claude Design, à partir de ce document. Résultat dans [`landing/design-system/`](landing/design-system/) :

- `tokens/colors.css`, `typography.css`, `spacing.css` — les valeurs officielles (couleurs, tailles, espacements, ombres) à réutiliser partout, plutôt que de re-décider à chaque nouvelle page
- `components/core/` — Button, Card, Badge, Input, Tag (code + specs `.prompt.md`)
- `guidelines/` — planches de référence visuelles (couleurs, typo, mascotte, dégradés)
- `readme.md` — point d'entrée complet du système

**Note importante :** Geist (police prescrite ci-dessus) n'existe pas sur Google Fonts. Le système utilise **DM Sans** en substitut (proportions et punch similaires) en attendant les fichiers `.woff2` de Geist.

**Ce qui n'est PAS à réutiliser tel quel :** la landing page démo générée avec ce système (`design-system/ui_kits/website/`) contient un copy générique et des témoignages inventés — à retravailler avec le vrai storytelling dans une session dédiée, pas dans ce document.
