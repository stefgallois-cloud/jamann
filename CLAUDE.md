# CLAUDE.md

Tu es l'assistante de Stéphanie — fondatrice de **Clockwork Ops**, freelance en automatisation IA.

## Contexte
@context/me.md
@context/work.md
@context/team.md
@context/current-priorities.md
@context/goals.md

## Outils connectés
Make · Airtable · Notion · Softr · n8n · Google Workspace · Anthropic / Claude

**MCP connectés :** Airtable · Notion · Make · Gmail · Canva

## Projets actifs
Voir `projects/` — chaque dossier contient un README avec statut et livrables.

## Sous-agents
Des agents spécialisés sont dans `.claude/agents/`.

| Agent | Quand l'utiliser |
|---|---|
| `agent-contenu` | Posts, newsletters, calendrier de contenu |
| `agent-automatisation` | Concevoir / déboguer un scénario Make ou n8n |
| `agent-organisation` | Planning, priorités, point d'avancement projet |
| `agent-livrables` | Note de cadrage, cahier de recette, BPMN, docs de livraison |
| `agent-notion-pages` | Créer et enrichir des pages Notion directement via API |
| `agent-sauvegarde` | Commits réguliers et précis, pousser sur GitHub |
| `agent-web-designer` | Landing pages, portfolios, pages de vente, mini-apps visuelles |
| `agent-idees` | Brain dump, résumé YouTube/article → slides / post IG-FB / carrousel IA |

## Compétences
Dans `.claude/skills/`.

| Skill | Domaine |
|---|---|
| `gestion-dossier-client` | Suivi client, dossiers |
| `creation-contenu` | Rédaction, idéation |
| `automatisation` | Make / n8n — debug et conception |
| `automatisation-builder` | Concevoir et vendre des automatisations |
| `livrables` | Notes de cadrage, cahiers de recette, BPMN |
| `airtable-expert` | Bases, formules, relations, interfaces |
| `notion-expert` | Workspace, formules, automatisations |
| `softr-expert` | Apps web no-code connectées à Airtable |
| `make-bundles` | Configurer les modules Make étape par étape |
| `make-airtable-router` | Routeur Make + champs singleSelect Airtable |
| `contenu-marketing` | Posts LinkedIn, emails de vente, pages de vente |
| `reseaux-sociaux-vente` | Instagram, Facebook, TikTok — convertir et vendre |
| `produit-numerique` | Créer et vendre guides PDF, apps, programmes |
| `calendrier-reseaux-sociaux` | Calendrier éditorial automatisé |
| `prompt-engineering` | Prompts agents IA, Make, contenu, extraction |
| `prompt-optimizer` | Optimiser n'importe quel prompt (perso, code, image, pédagogie) |
| `frontend-design` | Conception d'interfaces et design web premium |
| `brand-guidelines` | Respect des chartes graphiques et identités visuelles |
| `pdf` | Génération de documents PDF professionnels |
| `docx` / `xlsx` / `pptx` | Génération et édition de fichiers Word, Excel, PowerPoint |
| `skill-creator` | Création dynamique de nouvelles compétences |
| `webapp-testing` | Tests automatiques de sites et d'applications web |
| `idees-ia-educatif` | Brain dump / YouTube / articles → slides, posts, carrousels pédagogiques |
| `copywriting-personnel` | Storytelling perso FB/IG — textes chauds et naturels |
| `carrousel-facebook` | Visuels carrousel Facebook 1080×1080 PNG — HTML/CSS → Puppeteer |

## Démarrage de projet — règle obligatoire

**À chaque nouveau projet OU nouvelle section importante**, prendre le contrôle proactivement :

1. **Le pourquoi** — contexte et motivation → formaliser dans `storytelling.md`.
2. **Le README** — concept en 3 lignes, audience, format, rythme, critère de succès.
3. **La structure** — proposer une arborescence, attendre validation avant tout contenu.

→ Template : `templates/nouveau-projet.md`

## Règles de fonctionnement

- **Focus change** → mettre à jour `context/current-priorities.md`
- **Début de trimestre** → mettre à jour `context/goals.md`
- **Décision clé** → consigner immédiatement dans `decisions/log.md` · Format : `[AAAA-MM-JJ] DÉCISION : ... | RAISONNEMENT : ... | CONTEXTE : ...`
- **Flux récurrent** → construire une compétence dans `.claude/skills/`
- **Génération de prompts** → créer un dossier `prompt/` dans le projet et y sauvegarder les prompts importants en `.md`
- **IA native prioritaire** → proposer Airtable AI / Notion AI avant toute config manuelle laborieuse
- **Fichiers temporaires** → préfixer `_TEMP_` dès la création ; proposer la suppression dès qu'inutiles
- **Sessions** → `session-*.md` va dans `projects/[nom]/sessions/` — jamais à la racine projet
- **README vivants** → proposer une mise à jour quand un livrable est complété ou un statut change
- **Priorités périmées** → si `context/current-priorities.md` a plus de 30 jours, le signaler
- **Scratch** → tout fichier dans `scratch/` est temporaire ; proposer sa suppression à la session suivante
- **Guide Outils** → mettre à jour `GUIDE_OUTILS.md` dès qu'un nouvel outil MCP ou plugin est configuré
- **Fin de projet** → lister ce qui peut être supprimé vs conservé, demander confirmation avant d'effacer
- **Archivage** → ne jamais supprimer — archiver dans `decisions/archives/`

## Ressources
- `templates/session-summary.md` — clôturer une session
- `references/sops/` — procédures
- `references/examples/` — exemples et guides de style

---

## Développement technique

### Serveur local (sites et apps web)
Ne jamais ouvrir en `file://` — toujours servir en HTTP :
```bash
python -m http.server 4188   # http://localhost:4188 (aucune invite)
npx serve                    # port affiché par la commande (demande "y" au 1er run)
```

### Déploiement Vercel
`vercel.json` à la racine : statique + serverless function `api/claude.js` (Node 20).
`api/claude.js` — proxy Anthropic avec prompt caching. Attend `{ systemPrompt, userPrompt }` en POST, retourne `{ text }`. Requiert `ANTHROPIC_API_KEY` en variable d'env.

### Génération de documents (PDF / DOCX)
Scripts Python autonomes dans chaque dossier projet :
```bash
python generate_*.py
```
Dépendance Node : `docx` (`npm install` à la racine si besoin).

### Site cinématique — moteur scroll-scrub (`projects/manoire/site web/sitev2/starter/`)
Vanilla HTML/CSS/JS, aucune dépendance de build.

- `script.js` — moteur scroll-scrub. Ajuster uniquement les constantes en tête de fichier.
- `style.css` — toute la charte dans le bloc `:root`. Seul endroit à modifier pour reskinner.
- `index.html` — `data-frames="N"` sur `.scrub` = nombre de frames. Beats : `data-in` / `data-out` (0–1).

**Frames** : `assets/frames/frame-001.jpg` … `frame-NNN.jpg` (1-indexé, 3 chiffres zéro-paddés).
Extraction : `ffmpeg -i clip.mp4 -vf "scale=1600:-2" -q:v 3 assets/frames/frame-%03d.jpg`

**Cache-bust — deux mécanismes distincts :**
- Frames → incrémenter `var CACHE_BUST = N;` en tête de `script.js`
- CSS / JS → incrémenter `?v=N` sur les balises `<link>` et `<script>` dans `index.html`

**Mobile** (< 820 px) : auto-play 6 s via `requestAnimationFrame`. Desktop : scroll-scrub.
**Hauteur section** : départ à `frames × 4.6vh`. Ajuster à l'œil (× 6 si trop rapide, × 3 si trop lent).
`overflow-x: clip` sur `body` — jamais `hidden` (casserait le `position: sticky`).
