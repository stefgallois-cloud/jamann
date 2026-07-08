# CLAUDE.md — L'Atelier des Automates

Instructions spécifiques à ce projet. Complète le CLAUDE.md racine, ne le remplace pas.

## Contexte
@README.md
@storytelling.md
@branding.md

## Architecture du dossier

```
atelier-des-automates/
├── README.md               - Pilotage : concept, audience, statut
├── CLAUDE.md                - Ce fichier
├── storytelling.md          - Le pourquoi, formulations validées, règles de ton
├── branding.md               - Charte de marque : palette, typo, personnalité, mascotte
├── N8N.md                   - Doc du pipeline leads EN PRODUCTION (workflow n8n actif)
├── landing/                 - Landing page publique (index.html + mentions-legales.html)
│   ├── assets/               - Images/logos utilisés par la landing
│   ├── design-system/        - Système de design généré (tokens, composants) — voir règles ci-dessous
│   └── copains/              - Variante landing pour le réseau perso (les-copains)
├── les-copains/              - Sous-projet FB perso : posts, templates, prompts dédiés
├── presentation/             - Slides de présentation interactive
├── documents/                - Contenus HTML autonomes (étude de marché, articles)
├── prompt/                   - Prompts de génération (vidéo, images, analyse IA)
├── sessions/                 - Comptes-rendus de session (session-*.md)
└── decisions/
    ├── log.md                - Journal de décisions clés (format imposé, voir CLAUDE.md racine)
    └── archives/              - Ce qui est abandonné/superseded mais jamais supprimé :
        ├── make-scenario/     - Ancien plan Make (jamais mis en prod, remplacé par n8n)
        ├── design-system-import/ - Zip d'import + anciennes versions d'images (pré-recadrage)
        └── unused-videos/     - Vidéos mascotte générées mais jamais intégrées au site
```

**Règle d'archivage** (héritée du CLAUDE.md racine) : rien ne se supprime dans ce projet, tout ce qui
est superseded va dans `decisions/archives/`, dans un sous-dossier nommé par contexte.

## Pipeline leads — n8n en production

Le formulaire de contact de `landing/index.html` envoie vers un workflow n8n actif (webhook → anti-spam
→ Airtable → email). **Toujours consulter [`N8N.md`](N8N.md) avant de modifier le formulaire ou le
pipeline** — il documente les nœuds, les IDs, comment tester et comment étendre.

`decisions/archives/make-scenario/MAKE.md` est l'ancien plan Make : gardé pour référence (il couvre
l'analyse IA pas encore portée sur n8n), jamais à réactiver sans decision explicite.

## Charte de marque et design system

- **Charte (le "quoi" et le "pourquoi") :** [`branding.md`](branding.md) — personnalité, palette, typo, mascotte
- **Système technique (le "comment coder") :** [`landing/design-system/`](landing/design-system/) — tokens CSS (`tokens/colors.css`, `typography.css`, `spacing.css`), composants documentés (`components/core/`), guidelines visuelles (`guidelines/`)

**Règle :** toute nouvelle page, post ou livrable visuel pour ce projet doit piocher dans les tokens du design system plutôt que redéfinir des couleurs/tailles à la main. Si une valeur manque, l'ajouter aux tokens plutôt que de la coder en dur localement.

**Note police :** `branding.md` prescrit Bricolage Grotesque (titres) + Hanken Grotesk (corps), toutes deux disponibles sur Google Fonts — changé le 2026-07-07 pour se différencier du duo Geist/Inter devenu générique. Le design system (`landing/design-system/`) utilise encore DM Sans comme substitut de l'ancien Geist ; à harmoniser si ce design system est retravaillé.

**Ne pas réutiliser tel quel :** `landing/design-system/ui_kits/website/` est une démo générée automatiquement — copy générique et témoignages inventés. Ne jamais la publier ou la citer comme contenu réel ; le vrai contenu de la landing (`landing/index.html`) se retravaille dans une session dédiée avec `storytelling.md`.

## Assets mascotte

- Version courante : `landing/assets/logo-robot-v2.png` (fond foncé) / `logo-robot-v2-transparent.png` (fond transparent)
- Prompts de génération (Nano Banana, Veo) : voir `prompt/`
- Vidéos mascotte générées mais non utilisées sur le site : `decisions/archives/unused-videos/`

## Ton et voix

La landing publique (`landing/index.html`) est en **vouvoiement** (revenu à ce ton le 2026-07-07 après un essai en tutoiement — voir `decisions/log.md`). Voir `storytelling.md` pour les formulations validées et règles de ton générales (pas de fausse urgence, "outils no-code et IA" jamais "automatisations" seul). Ne jamais inventer de témoignages clients — le seul cas réel documenté à ce jour est Caroline.

## Fichiers à surveiller

- `landing/_TEMP_copydeck-landing.md` — préfixé `_TEMP_`, probablement obsolète depuis que le copydeck est intégré dans `index.html` ; proposer sa suppression à la prochaine session si confirmé inutile.
- **Toujours commiter en fin de session de travail sur ce projet** — ce repo git est partagé avec tous les autres projets de Stéphanie (branches multiples). Un travail non commité peut être écrasé par un changement de branche ailleurs (incident vécu le 2026-07-08, voir `decisions/log.md`).
