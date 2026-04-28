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
