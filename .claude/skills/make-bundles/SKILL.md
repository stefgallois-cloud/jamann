---
name: make-bundles
description: >
  Skill pour configurer correctement les modules (bundles) Make étape par étape.
  Utilise cette skill quand Stef veut : remplir un module Make, configurer un webhook,
  paramétrer un filtre ou un routeur, mapper des données entre modules, configurer une
  connexion API, comprendre pourquoi un bundle ne passe pas, déboguer un scénario Make,
  ou apprendre à utiliser un module spécifique (HTTP, Google Sheets, Airtable, Gmail, etc.).
  Aussi pour : comprendre les bundles, itérateurs, agrégateurs, variables, fonctions Make.
---

# Make — Remplir les Bundles Correctement

## C'est quoi un bundle ?
Un **bundle** = un paquet de données qui circule entre les modules.
Chaque module reçoit un bundle en entrée, le traite, et produit un bundle en sortie.
→ Pense à ça comme une fiche qui passe de main en main sur une chaîne de montage.

---

## Méthode step by step pour configurer un module

### Étape 1 — Choisir le bon module
1. Clique sur le **+** dans le scénario
2. Cherche le nom de l'app (ex : "Airtable", "Gmail", "HTTP")
3. Choisis l'**action** précise (ex : "Create a Record", "Send an Email")

> ⚠️ Toujours lire le nom complet de l'action — "Update" et "Create" ne font pas la même chose.

### Étape 2 — Créer ou sélectionner une connexion
- Si c'est la 1ère fois avec cette app → **Add** → suivre l'authentification (OAuth ou clé API)
- Si la connexion existe déjà → la sélectionner dans la liste
- Tester la connexion si tu as un doute (bouton "Verify")

### Étape 3 — Remplir les champs obligatoires
Les champs marqués d'un ***** sont obligatoires.
- **Champ texte fixe** : tape directement la valeur
- **Champ mappé** : clique sur le champ → sélectionne la donnée du bundle précédent
- **Champ mixte** : tu peux combiner texte fixe + variable mappée

### Étape 4 — Mapper les données depuis le bundle précédent
Quand tu cliques dans un champ, un panneau s'ouvre à droite avec les données disponibles.
Structure d'un bundle typique :
```
Module 1 (Trigger)
  └── id
  └── name
  └── email
  └── created_at
```
→ Clique sur la donnée voulue pour l'insérer dans le champ.

### Étape 5 — Utiliser les fonctions si besoin
Make propose des fonctions directement dans les champs :
- `{{formatDate(date; "DD/MM/YYYY")}}` — formater une date
- `{{upper(text)}}` — mettre en majuscules
- `{{if(condition; valeur_si_vrai; valeur_si_faux)}}` — condition simple
- `{{toString(number)}}` — convertir un nombre en texte

Accès : dans un champ mappé, tape `{{` pour ouvrir les fonctions.

### Étape 6 — Tester le module seul
- Clic droit sur le module → **Run this module only**
- Vérifie que le bundle de sortie contient les données attendues
- Si erreur → lire le message d'erreur (il est souvent très précis)

---

## Les modules les plus courants

### Webhook (déclencheur entrant)
```
1. Ajouter module "Webhooks > Custom webhook"
2. Cliquer "Add" → nommer le webhook → Copier l'URL
3. Coller l'URL dans l'app source (Tally, Typeform, Stripe...)
4. Faire un test d'envoi depuis l'app source
5. Make reçoit les données → clic "OK" pour valider la structure
```

### HTTP — Appel API
```
1. Module "HTTP > Make a request"
2. URL : l'endpoint de l'API
3. Method : GET / POST / PUT / DELETE
4. Headers : souvent "Authorization: Bearer [clé API]"
5. Body (si POST) : choisir "Raw" → JSON → coller le payload
6. Parse response : activer "Yes" pour avoir les données mappables
```

### Filtre entre deux modules
```
1. Clic sur la petite flèche entre deux modules → "Set up a filter"
2. Label : nommer le filtre (ex : "Email valide seulement")
3. Condition : choisir la donnée → l'opérateur → la valeur
   Ex : email > "does not equal" > "" (= email non vide)
4. Plusieurs conditions : AND (toutes vraies) ou OR (une suffit)
```

### Routeur (bifurcation)
```
1. Ajouter module "Flow Control > Router"
2. Plusieurs chemins se créent
3. Sur chaque chemin : clic sur la flèche → configurer le filtre
4. Le bundle suit le chemin dont le filtre est vrai
⚠️ Si aucun filtre ne passe : le bundle est ignoré (pas d'erreur)
```

### Itérateur
```
Utilité : traiter une liste item par item (ex : liste de contacts)
1. Module "Flow Control > Iterator"
2. Champ "Array" : mapper le tableau du bundle précédent
3. Les modules suivants reçoivent chaque item séparément
```

### Agrégateur
```
Utilité : regrouper plusieurs bundles en un seul
1. Module "Flow Control > Array aggregator"
2. Choisir le module source (jusqu'où agréger)
3. Choisir les champs à garder
→ Produit un tableau avec tous les items
```

---

## Erreurs fréquentes et solutions

| Erreur | Cause probable | Solution |
|--------|---------------|----------|
| "Missing required parameter" | Champ obligatoire vide | Vérifier les champs avec * |
| "400 Bad Request" | Données mal formatées | Vérifier le type (texte vs nombre vs date) |
| "401 Unauthorized" | Connexion expirée ou mauvaise clé | Reconnecter l'app |
| "429 Too Many Requests" | Trop d'appels API | Ajouter un module "Sleep" ou réduire la fréquence |
| Bundle vide après un module | Le filtre bloque tout | Tester le module seul, vérifier le filtre |
| "Cannot read property of undefined" | Donnée mappée inexistante | Vérifier que le bundle source contient bien ce champ |

---

## Bonnes pratiques

- **Nommer chaque module** (clic droit → rename) — indispensable sur les gros scénarios
- **Activer les logs d'erreur** dans les paramètres du scénario
- **Tester module par module** avant de lancer tout le scénario
- **Mettre un module "Error Handler"** sur les étapes critiques
- **Jamais de données sensibles en dur** dans un module — utiliser les variables d'environnement Make
