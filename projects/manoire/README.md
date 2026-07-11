# Le Manoïre — Restaurant d'alpage, Col de Jaman

Restaurant d'alpage au Col de Jaman (Riviera-Pays-d'Enhaut) — client prioritaire de Clockwork Ops.

**Statut :** Actif — réouverture le **16 juillet 2026**.

Détail technique complet (faits clés, architecture du dossier, règles de design/images) : voir [`CLAUDE.md`](CLAUDE.md).

## Déjà livré
- [x] Site cinématique scroll-scrub (`site web/`) — hero vidéo IA, pages Accueil, Carte, Randonnées, En direct/Infos pratiques, Mentions légales
- [x] Automatisation d'inscription newsletter (Airtable + Make)
- [x] Automatisation posts réseaux sociaux — base Airtable `Calendrier Posts` + scénario Make `5469302`
- [x] 8 newsletters enrichies
- [x] Bons cadeaux (`bon cadeaux/`)
- [x] Devis (bons cadeaux, planning personnel)

## Site web actif
Dossier `site web/` — voir `CLAUDE.md` pour la stack, les conventions (cache-bust, design tokens) et les pièges connus.
L'ancien site multi-pages est archivé dans `archives/site-web-v1-superseded/` — ne plus l'éditer.

## À livrer / en cours
| Livrable | Statut |
|---|---|
| Automatisation posts réseaux sociaux | Scénario Make opérationnel, à activer une fois le test final validé |
| App planning équipe (`planning-app/`) | En cours |
| App Jamann posts réseaux (`jamann-app/`) | Maintenance |

## Structure du dossier
- `charte_graphique/` — logos officiels et charte graphique
- `site web/` — site actif à la racine (`index.html`, `style.css`, `assets/`...) + `docs/` (conception) + `photos/` (photothèque brute, non versionnée)
- `documents/` — briefs, devis PDF, calendriers, ligne éditoriale
- `newsletters/`, `posts/`, `prompt/`, `devis/`, `scripts/` — sous-projets de contenu et scripts de génération
- `bon cadeaux/` — page et générateur de bons cadeaux
- `jamann-app/`, `planning-app/` — applications web indépendantes
- `sessions/` — comptes-rendus de session
- `archives/` — tout ce qui est superseded, jamais supprimé

## Notes
Client très actif avec beaucoup d'idées — anticiper de nouveaux projets au fil du temps.
