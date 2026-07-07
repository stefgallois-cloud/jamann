# CLAUDE.md — L'Atelier des Automates

Instructions spécifiques à ce projet. Complète le CLAUDE.md racine, ne le remplace pas.

## Contexte
@README.md
@storytelling.md
@branding.md

## Charte de marque et design system

- **Charte (le "quoi" et le "pourquoi") :** [`branding.md`](branding.md) — personnalité, palette, typo, mascotte
- **Système technique (le "comment coder") :** [`landing/design-system/`](landing/design-system/) — tokens CSS (`tokens/colors.css`, `typography.css`, `spacing.css`), composants documentés (`components/core/`), guidelines visuelles (`guidelines/`)

**Règle :** toute nouvelle page, post ou livrable visuel pour ce projet doit piocher dans les tokens du design system plutôt que redéfinir des couleurs/tailles à la main. Si une valeur manque, l'ajouter aux tokens plutôt que de la coder en dur localement.

**Note police :** Geist (prescrite dans `branding.md`) n'existe pas sur Google Fonts. Le design system utilise DM Sans en substitut. Ne pas re-proposer Geist sans avoir les fichiers `.woff2`.

**Ne pas réutiliser tel quel :** `landing/design-system/ui_kits/website/` est une démo générée automatiquement — copy générique et témoignages inventés. Ne jamais la publier ou la citer comme contenu réel ; le vrai contenu de la landing (`landing/index.html`) se retravaille dans une session dédiée avec `storytelling.md`.

## Assets mascotte

- Version courante : `landing/assets/logo-robot-v2.png` (fond foncé) / `logo-robot-v2-transparent.png` (fond transparent)
- Prompts de génération (Nano Banana, Veo) : voir `prompt/`

## Ton et voix

Voir `storytelling.md` pour les formulations validées et règles de ton (tutoiement, pas de fausse urgence, "outils no-code et IA" jamais "automatisations" seul). Ne jamais inventer de témoignages clients — le seul cas réel documenté à ce jour est Caroline.
