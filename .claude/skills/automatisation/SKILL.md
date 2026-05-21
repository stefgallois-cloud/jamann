# Compétence : Automatisation (Make / n8n)

Concevoir, documenter et déboguer des scénarios d'automatisation.

## Quand l'utiliser
- Concevoir une nouvelle automatisation (brief → architecture)
- Documenter un scénario existant
- Déboguer un scénario qui ne fonctionne pas
- Choisir entre Make et n8n pour un cas donné

## Make vs n8n — Quand choisir quoi

| Critère | Make | n8n |
|---|---|---|
| Interface | Visuelle, drag & drop | Visuelle + plus technique |
| Hébergement | Cloud (Make.com) | Self-hosted ou cloud |
| Cas d'usage | Intégrations rapides, webhooks, Airtable | Logique complexe, boucles, API custom |
| Coût | Basé sur opérations | Gratuit si self-hosted |

## Workflow — Brief → Scénario

### 1. Cadrage
Clarifier avant de construire :
- Quel est le déclencheur ? (formulaire, email, heure fixe, webhook…)
- Quelles sont les étapes intermédiaires ?
- Quel est le résultat attendu ? (email envoyé, ligne Airtable créée, post publié…)
- Quels outils sont impliqués ?
- Y a-t-il des conditions / filtres ?

### 2. Architecture
Décrire le flux sous ce format :
```
DÉCLENCHEUR → ÉTAPE 1 → [CONDITION] → ÉTAPE 2 → RÉSULTAT
```
Exemple :
```
Formulaire Softr → Airtable (créer ligne) → Make (envoyer email confirmation)
```

### 3. Documentation du scénario
Pour chaque scénario livré, noter :
- Nom du scénario
- Déclencheur
- Flux en une ligne
- Outils utilisés
- Points d'attention / limites connues

### 4. Débogage
Si un scénario ne fonctionne pas :
- Identifier à quelle étape ça bloque
- Vérifier les permissions / connexions des modules
- Tester avec des données minimales
- Vérifier les filtres et conditions

## Scénarios actifs — Le Manoïre

| Scénario | Statut | Outils |
|---|---|---|
| Inscription landing page → Airtable | Livré | Softr + Make + Airtable |
| Posts réseaux sociaux automatisés | À construire | Make + [réseau] |
| 8 newsletters automatisées | À construire | Make + [email tool] |
| Planning équipe (app UI) | À construire | Softr + Airtable |

## Commandes utiles
- "Architecture le scénario [description]"
- "Documente ce scénario : [description]"
- "Aide-moi à déboguer : [problème]"
- "Make ou n8n pour [cas d'usage] ?"

---

## Protocole obligatoire — Make via MCP

**Règle absolue : ne jamais deviner. Toujours vérifier en 3 étapes.**

### Étape 1 — Avant d'écrire le moindre champ de module

Pour chaque module non trivial (HTTP, API custom, tout module nouveau) :

```text
mcp__claude_ai_Make__app-module_get(appName, moduleName, version)
```

→ Lire la spec exacte. Copier les noms de champs réels. Ne jamais supposer.

### Étape 2 — Avant de pusher

```text
mcp__claude_ai_Make__validate_blueprint_schema(blueprint)
```

→ Si erreur → corriger. Ne jamais pusher un blueprint non validé.

### Étape 3 — Après chaque push

```text
mcp__claude_ai_Make__scenarios_get(scenarioId)
```

→ Lire le blueprint stocké. Vérifier que les valeurs critiques correspondent à ce qui était voulu. Si écart → corriger immédiatement, avant de dire à Stéphanie de tester.

---

## Champs Make validés — http:MakeRequest v4

| Intention | Champ Make | Valeur |
|---|---|---|
| Méthode | `method` | `"post"` (jamais `"get"` par défaut) |
| Type de body | `contentType` | `"json"` pour JSON, `"custom"` pour raw |
| Mode saisie body | `inputMethod` | `"jsonString"` (sous-mode de `contentType: json`) |
| Body JSON brut | `jsonStringBodyContent` | la chaîne JSON |
| Body raw (custom) | `rawBodyContent` | buffer — éviter, préférer json |
| Authentification | `authenticationType` dans `parameters` | `"noAuth"` si clé dans header |

**Clé x-api-key Anthropic :** passer en header `x-api-key` avec `authenticationType: "noAuth"` — plus fiable que le keychain Make.

**Accès au résultat Claude dans Make :**
- `{{5.data.content[1].text}}` → texte brut de la réponse (index 1-based en Make)
- `{{parseJSON(5.data.content[1].text).facebook}}` → extraire un champ JSON

---

## Règles blueprint Make (rappel)

- `filter` du routeur → sur le **premier module de chaque branche** (`flow[]`), pas sur `route`
- Champs Airtable dans `record` → **field IDs** (`fldXXX`), jamais les noms
- singleSelect Airtable → passer le **nom de l'option** comme string (`"Approuvé"`)
- `{{1.Validation.name}}` pour lire un singleSelect dans un filtre
