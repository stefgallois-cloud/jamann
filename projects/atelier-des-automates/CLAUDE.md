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

**Note police :** `branding.md` prescrit désormais Bricolage Grotesque (titres) + Hanken Grotesk (corps), toutes deux disponibles sur Google Fonts — changé le 2026-07-07 pour se différencier du duo Geist/Inter devenu générique. Le design system (`landing/design-system/`) utilise encore DM Sans comme substitut de l'ancien Geist ; à harmoniser si ce design system est retravaillé.

**Ne pas réutiliser tel quel :** `landing/design-system/ui_kits/website/` est une démo générée automatiquement — copy générique et témoignages inventés. Ne jamais la publier ou la citer comme contenu réel ; le vrai contenu de la landing (`landing/index.html`) se retravaille dans une session dédiée avec `storytelling.md`.

## Assets mascotte

- Version courante : `landing/assets/logo-robot-v2.png` (fond foncé) / `logo-robot-v2-transparent.png` (fond transparent)
- Prompts de génération (Nano Banana, Veo) : voir `prompt/`

## Ton et voix

Voir `storytelling.md` pour les formulations validées et règles de ton (tutoiement, pas de fausse urgence, "outils no-code et IA" jamais "automatisations" seul). Ne jamais inventer de témoignages clients — le seul cas réel documenté à ce jour est Caroline.
