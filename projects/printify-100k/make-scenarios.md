# Scénarios Make — Pipeline Printify

**Date :** 2026-05-28
**Pré-requis :** base Airtable `appFVfzRQZBpn4ckQ` créée + finitions UI (lookups + automatisations) appliquées.

## Vue d'ensemble

```
[Manual/cron]                          [Airtable status=Concept + Title vide]
       │                                              │
       ▼                                              ▼
┌─────────────────┐                        ┌─────────────────────┐
│ Scénario 1      │                        │ Scénario 2          │
│ Concept         │                        │ Etsy SEO            │
│ Generator       │ ──crée records──►      │ Generator           │
│ (Opus, 1×/sem)  │       Concepts         │ (Sonnet, à la demande)│
└─────────────────┘                        └─────────────────────┘
                                                    │
                                                    ▼
                                         [Airtable Update Designs:
                                          Title + Tags + Description
                                          + Mockup keywords + IP risk]
```

**Logique du flux complet :**
1. Tu lances le scénario 1 → 50 nouveaux Concepts entrent dans Airtable (Status `Idea`)
2. Tu valides à la main les concepts intéressants → passes Status à `Selected`
3. Tu crées les records Designs (1 par concept × produit) → ils ont Status `Concept` et Title vide
4. Le scénario 2 se déclenche → enrichit chaque Design avec Title + Tags + Description + Mockup keywords
5. L'automatisation Airtable passe automatiquement Status à `SEO done`

---

## Scénario 1 — Concept Generator

**Nom du scénario Make :** `Printify — Concept Generator`
**Modèle Anthropic :** Claude Opus 4.7 (créativité max)
**Fréquence :** manuel ou cron hebdo (lundi 8h)
**Coût par run :** ~$0.03 pour 50 concepts

### Modules (5 au total)

#### Module 1 — Trigger (manuel ou cron)

| Champ | Valeur |
|---|---|
| Type | Manual (cliquer "Run once") OU Scheduled |
| Fréquence (si scheduled) | Every week, Monday, 08:00 |

#### Module 2 — Tools > Set variable (paramètres de génération)

Permet de centraliser les paramètres pour les modifier facilement.

| Variable | Valeur |
|---|---|
| `sub_niche_name` | `Golden Retriever × personnalité` (à changer selon la sous-niche à générer) |
| `sub_niche_record_id` | `recYvvgs0SuwRdl5L` (Golden) OU `recpYBJPgZMXxjdal` (Frenchie) OU `reccPx9X4E3dAM5pF` (Memorial) |
| `n_concepts` | `50` |

#### Module 3 — Anthropic > Make a request (génération concepts)

| Champ | Valeur |
|---|---|
| Connection | [Créer connexion Anthropic avec ta clé API] |
| URL | `https://api.anthropic.com/v1/messages` |
| Method | `POST` |
| Headers | `x-api-key: {{ta clé API}}` (mieux : utiliser env var)<br>`anthropic-version: 2023-06-01`<br>`content-type: application/json` |
| Body type | Raw |
| Content type | JSON |
| Request content | Voir bloc ci-dessous |
| Parse response | **Yes** |

**Request content (JSON body) :**

```json
{
  "model": "claude-opus-4-7",
  "max_tokens": 8000,
  "system": "[COLLE ICI LE PROMPT SYSTÈME COMPLET DE prompts/concept-generator.md]",
  "messages": [
    {
      "role": "user",
      "content": "<input>\n{\"sub_niche\": \"{{2.sub_niche_name}}\", \"n_concepts\": {{2.n_concepts}}}\n</input>"
    }
  ]
}
```

⚠️ Important : le `system` doit contenir tout le prompt système (sans les backticks et sans la section `# DONNÉES À TRAITER` finale). Stocker dans une variable d'environnement Make pour ne pas le retaper.

#### Module 4 — Tools > Parse JSON

Anthropic renvoie le JSON dans `content[0].text` (en tant que string). Il faut le parser.

| Champ | Valeur |
|---|---|
| JSON string | `{{3.content[1].text}}` (à vérifier — peut être `{{3.content[0].text}}` selon la version API) |

> Astuce : tester le module 3 d'abord pour voir la structure exacte de la réponse, puis adapter le mapping.

#### Module 5 — Flow Control > Iterator

| Champ | Valeur |
|---|---|
| Array | `{{4.concepts}}` (l'array des concepts retournés par Claude) |

#### Module 6 — Airtable > Create a Record

| Champ | Valeur |
|---|---|
| Connection | [Créer connexion Airtable] |
| Base | `Printify Designs` (appFVfzRQZBpn4ckQ) |
| Table | `Concepts` (tblZ0Q6nvvrUwgbcJ) |
| Concept | `{{5.concept}}` |
| Type | `{{5.type}}` |
| Audience | `{{5.audience}}` |
| Emotional hook | `{{5.emotional_hook}}` |
| Personalization | `{{if(5.personalization_field; true; false)}}` |
| Personalization field | `{{5.personalization_field}}` |
| Product suggestions | `{{5.product_suggestion}}` (à mapper — voir note) |
| IP risk | `{{5.ip_risk}}` |
| IP risk note | `{{5.ip_risk_note}}` |
| Status | `Idea` (texte fixe) |
| Source | `Concept Generator` (texte fixe) |
| Sub-niche | `{{2.sub_niche_record_id}}` |

> **Note Product suggestions** : le prompt renvoie une chaîne type `"t-shirt + mug"`. Il faudra soit :
> - Modifier le prompt pour qu'il renvoie un array `["T-shirt", "Mug"]`
> - Ou ajouter un module Text Parser entre 5 et 6 pour splitter et matcher

### Test du scénario 1

1. **Module 3 isolé** : Run module → vérifier qu'Anthropic répond bien avec un JSON parsable
2. **Module 4 isolé** : run après module 3 → vérifier que `concepts` est bien un array
3. **Iterator** : exécuter le scénario complet sur `n_concepts=5` (pour ne pas générer 50 inutilement au test)
4. **Vérifier Airtable** : 5 nouveaux records dans Concepts avec Status `Idea`

### Coûts estimés

- Input tokens : ~1500 (prompt système)
- Output tokens : ~3500 pour 50 concepts
- Coût Opus 4.7 : ~$0.30 par run de 50

---

## Scénario 2 — Etsy SEO Generator

**Nom du scénario Make :** `Printify — Etsy SEO Generator`
**Modèle Anthropic :** Claude Sonnet 4.6 (qualité/coût optimal)
**Trigger :** automatique dès qu'un Design entre dans le statut `Concept` avec Title vide
**Coût par design :** ~$0.007

### Modules (6 au total)

#### Module 1 — Airtable > Watch Records

| Champ | Valeur |
|---|---|
| Connection | [Connexion Airtable] |
| Base | `Printify Designs` |
| Table | `Designs` (tblk4eH47t1XOXBK1) |
| View | `À traiter SEO` (à créer dans Airtable — filtre `Title is empty` AND `Status = Concept`) |
| Trigger field | `Last modified time` |
| Maximum number of records | 10 |

> **Alternative** : si tu n'as pas créé la vue, utilise le trigger avec filtre dans Make. Mais la vue est plus propre.

#### Module 2 — Airtable > Search Records (récupérer Concept)

Pour avoir le texte du concept (pas juste son record ID).

| Champ | Valeur |
|---|---|
| Connection | Airtable |
| Base | `Printify Designs` |
| Table | `Concepts` (tblZ0Q6nvvrUwgbcJ) |
| Formula | `RECORD_ID() = "{{1.Concept[1]}}"` |
| Maximum number of records | 1 |

> Note : `{{1.Concept[1]}}` car le champ link renvoie un array. `[1]` prend le premier élément (= la première lettre dans Make, qui est en fait l'index 1 = premier item).

#### Module 3 — Airtable > Search Records (récupérer Product)

| Champ | Valeur |
|---|---|
| Connection | Airtable |
| Base | `Printify Designs` |
| Table | `Products` (tbl78HyJwkrdhwOm0) |
| Formula | `RECORD_ID() = "{{1.Product[1]}}"` |
| Maximum number of records | 1 |

#### Module 4 — Airtable > Search Records (récupérer Sub-niche du Concept)

| Champ | Valeur |
|---|---|
| Connection | Airtable |
| Base | `Printify Designs` |
| Table | `Sub-niches` (tbliEjDyFfdQCO8Bf) |
| Formula | `RECORD_ID() = "{{2.Sub-niche[1]}}"` |
| Maximum number of records | 1 |

> **Raccourci** : si tu as créé le lookup `Sub-niche` dans Designs (cf. finitions manuelles), tu peux sauter ce module 4 et utiliser `{{1.Sub-niche}}` directement.

#### Module 5 — Anthropic > Make a request

| Champ | Valeur |
|---|---|
| URL | `https://api.anthropic.com/v1/messages` |
| Method | POST |
| Headers | (mêmes que scénario 1) |
| Body | Voir bloc ci-dessous |
| Parse response | Yes |

**Request content :**

```json
{
  "model": "claude-sonnet-4-6",
  "max_tokens": 2000,
  "system": "[COLLE ICI LE PROMPT SYSTÈME COMPLET DE prompts/etsy-seo-generator.md]",
  "messages": [
    {
      "role": "user",
      "content": "<input>\n{\"concept\": \"{{2.Concept}}\", \"product\": \"{{3.Product name}}\", \"sub_niche\": \"{{4.Name}}\", \"personalization\": {{if(1.Personalization field; true; false)}}, \"personalization_field\": \"{{1.Personalization field}}\"}\n</input>"
    }
  ]
}
```

#### Module 6 — Tools > Parse JSON

| Champ | Valeur |
|---|---|
| JSON string | `{{5.content[1].text}}` |

#### Module 7 — Airtable > Update a Record

| Champ | Valeur |
|---|---|
| Base | `Printify Designs` |
| Table | `Designs` |
| Record ID | `{{1.id}}` |
| Title | `{{6.title}}` |
| Tags | `{{join(6.tags; ", ")}}` |
| Description | `{{6.description}}` |
| Mockup keywords | `{{6.mockup_keywords}}` |
| IP risk | `{{6.ip_risk}}` |
| IP risk note | `{{6.ip_risk_note}}` |

> L'automatisation Airtable #1 (cf. finitions) passera ensuite le Status à `SEO done` automatiquement.

### Test du scénario 2

1. Créer manuellement un Design dans Airtable avec un Concept lié, un Product lié, Status `Concept`, Title vide
2. Lancer le scénario en mode "Run once"
3. Vérifier que le record Design reçoit bien Title + Tags + Description + Mockup keywords
4. Tester l'enchaînement automatique : modifier le record → status passe à `SEO done`

### Coûts estimés (par design)

- Input tokens : ~1200 (prompt + données)
- Output tokens : ~400 (JSON SEO)
- Coût Sonnet 4.6 : ~$0.007 par design

**Pour 500 designs/an : ~$3.50.** Négligeable.

---

## Setup connexions Make (à faire 1 fois)

### Connexion Anthropic

1. Aller sur https://console.anthropic.com/settings/keys
2. Créer une nouvelle clé API → la copier
3. Dans Make : module HTTP, Headers → ajouter `x-api-key: [clé]`
4. **Mieux** : stocker en variable d'environnement
   - Make → Scénario → Settings → Variables → Add `ANTHROPIC_API_KEY`
   - Référencer dans le module : `{{env.ANTHROPIC_API_KEY}}`

### Connexion Airtable

1. Module Airtable → Add connection
2. **Option A — Personal Access Token (recommandé) :**
   - Aller sur https://airtable.com/create/tokens
   - Créer token avec scopes : `data.records:read`, `data.records:write`, `schema.bases:read`
   - Donner accès à la base `Printify Designs`
3. **Option B — OAuth :** plus simple mais moins contrôlable

---

## Gestion des erreurs

### Sur le scénario 2 (le plus critique)

Ajouter un **Error Handler** sur le module 5 (Anthropic) :

| Type | Action |
|---|---|
| `Resume` | Si timeout ou 503 → retry après 30s |
| `Break` | Si 401 (clé invalide) → arrêt et notification email |

Ajouter aussi un **Error Handler** sur le module 7 (Airtable Update) :
- Si erreur (ex : tag >20 chars rejeté par Airtable) → logger dans une table `Errors` ou envoyer un email

---

## Checklist activation

Avant de mettre en production :

- [ ] Compte Anthropic API actif + clé API en variable d'environnement Make
- [ ] Token Airtable créé avec bons scopes
- [ ] Vue `À traiter SEO` créée dans Airtable Designs
- [ ] Lookup `Sub-niche` créé dans Designs (sinon utiliser modules Search supplémentaires)
- [ ] Automatisations Airtable activées (#1, #2, #3)
- [ ] Prompts système copiés dans Make (en var env ou directement dans body)
- [ ] Test sur 3 designs réels en mode "Run once"
- [ ] Vérifier la sortie : tags ≤20 chars, title ≤140 chars, JSON parsable
- [ ] Activer le scheduling sur scénario 2 (1×/15 min)

---

## Pipeline complet attendu

```
Lundi 8h  → Concept Generator s'exécute (50 nouveaux Concepts Idea)
Mardi     → Stef trie : 30 concepts passent à Selected, 20 supprimés
Mercredi  → Stef crée 60 Designs (30 concepts × 2 produits en moyenne)
Mercredi+ → Etsy SEO Generator enrichit auto-magiquement
Jeudi     → Stef brief Nano Banana sur les Mockup keywords
Vendredi  → Mockups générés → upload Printify + Etsy
Weekend   → Pinterest pins automatiques + monitoring ventes

Volume cible mois 1 : 50-60 listings live
Volume cible mois 3 : 200 listings live, 5-10 winners identifiés
```
