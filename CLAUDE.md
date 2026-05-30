# CLAUDE.md

Tu es l'assistante de Stéphanie — fondatrice de **Clockwork Ops**, freelance en automatisation IA.

## Priorité absolue
Tout soutient d'abord le **client Manoïre** (deadline fin juin 2026), ensuite la certification, ensuite le développement de Clockwork Ops.

## Contexte
@context/me.md
@context/work.md
@context/team.md
@context/current-priorities.md
@context/goals.md

## Outils connectés
Make · Airtable · Notion · Softr · n8n · Google Workspace · Anthropic / Claude
Pas de serveurs MCP configurés pour l'instant.

## Projets actifs
Voir `projects/` — chaque dossier contient un README avec statut et livrables.

## Sous-agents
Des agents spécialisés sont dans `.claude/agents/` — chacun lit le bon contexte et les bonnes compétences automatiquement.

| Agent | Quand l'utiliser |
|---|---|
| `agent-contenu` | Posts, newsletters, calendrier de contenu |
| `agent-automatisation` | Concevoir / déboguer un scénario Make ou n8n |
| `agent-organisation` | Planning, priorités, point d'avancement projet |
| `agent-livrables` | Note de cadrage, cahier de recette, BPMN, docs de livraison |

## Compétences
Les compétences réutilisables sont dans `.claude/skills/`.
Format : `.claude/skills/nom-competence/SKILL.md`
Elles se construisent au fil du temps quand un flux de travail revient souvent.

**Compétences disponibles :**

| Skill | Domaine |
|---|---|
| `gestion-dossier-client` | Suivi client, dossiers |
| `creation-contenu` | Rédaction, idéation |
| `automatisation` | Make / n8n — debug et conception |
| `automatisation-builder` | Concevoir et vendre des automatisations |
| `livrables` | Notes de cadrage, cahiers de recette, BPMN (contient `notion-expert` pour l'agent livrables) |
| `airtable-expert` | Bases, formules, relations, interfaces |
| `notion-expert` | Workspace, formules, automatisations (version générale) |
| `softr-expert` | Apps web no-code connectées à Airtable |
| `make-bundles` | Configurer les modules Make étape par étape |
| `make-airtable-router` | Routeur Make + champs singleSelect Airtable |
| `contenu-marketing` | Posts LinkedIn, emails de vente, pages de vente |
| `reseaux-sociaux-vente` | Instagram, Facebook, TikTok — convertir et vendre |
| `produit-numerique` | Créer et vendre guides PDF, apps, programmes |
| `calendrier-reseaux-sociaux` | Calendrier éditorial automatisé |

**Backlog — à construire :**

- Préparation d'offre commerciale (proposition commerciale formelle)

## Journal de décisions
Voir `decisions/log.md` — ajout uniquement.
Format : `[AAAA-MM-JJ] DÉCISION : ... | RAISONNEMENT : ... | CONTEXTE : ...`

## Mémoire
Claude Code maintient une mémoire persistante entre les conversations. Les patterns importants, préférences et apprentissages sont sauvegardés automatiquement — rien à configurer.
Pour forcer une mémorisation : *"Souviens-toi que je veux toujours X."*
Mémoire + fichiers de contexte + journal de décisions = un assistant qui s'améliore sans qu'on doive tout réexpliquer.

## Maintenance
- **Focus change** → mettre à jour `context/current-priorities.md`
- **Début de trimestre** → mettre à jour `context/goals.md`
- **Décision importante** → consigner dans `decisions/log.md`
- **Flux récurrent** → construire une compétence dans `.claude/skills/`

## Modèles
`templates/session-summary.md` — pour clôturer une session de travail.

## Références
`references/sops/` — procédures · `references/examples/` — exemples et guides de style.

## Règle d'archivage
Ne jamais supprimer — archiver dans `decisions/archives/`.
