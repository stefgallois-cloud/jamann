---
name: airtable-expert
description: >
  Skill pour utiliser Airtable efficacement : bases, tables, champs, vues, formules, automatisations,
  interfaces et API. Utilise cette skill quand Stef veut : créer ou structurer une base Airtable,
  choisir le bon type de champ, écrire une formule Airtable, créer une vue filtrée ou groupée,
  relier des tables entre elles, créer une automatisation Airtable, utiliser l'interface builder,
  connecter Airtable à Make, ou préparer un examen sur Airtable.
---

# Airtable Expert

## C'est quoi Airtable ?
Un tableur surpuissant avec des fonctions de base de données.
Pense à Excel + relations entre tables + automatisations + interfaces visuelles.

---

## Structure de base

```
Organisation
  └── Workspace (espace de travail)
        └── Base (= ton projet / ton app)
              └── Table (= un sujet : Clients, Projets, Tâches...)
                    └── Record (= une ligne)
                          └── Field (= une colonne / un type de donnée)
```

---

## Les types de champs essentiels

| Type | Utilisation |
|------|------------|
| Single line text | Nom, titre, texte court |
| Long text | Description, notes (supporte le Markdown) |
| Number | Chiffres, prix, quantités |
| Currency | Prix formatés |
| Date | Dates (avec ou sans heure) |
| Single select | Choix unique parmi une liste (statut, catégorie) |
| Multiple select | Choix multiples |
| Checkbox | Oui/Non |
| Attachment | Fichiers, images |
| Link to another record | **Clé** : relier deux tables entre elles |
| Lookup | Ramener une info d'une table liée |
| Rollup | Calculer (somme, moyenne...) sur des records liés |
| Formula | Calculer à partir des autres champs |
| Autonumber | ID unique auto-incrémenté |
| Created time / Last modified | Dates automatiques |
| Created by / Last modified by | Qui a créé/modifié |

---

## Relations entre tables — le point clé

### Principe
Relier deux tables évite de dupliquer les données.
Ex : Table **Clients** + Table **Projets** → chaque projet est lié à un client.

### Comment créer une relation
1. Dans la table **Projets**, ajouter un champ type **"Link to another record"**
2. Choisir la table **Clients**
3. Chaque record Projet peut maintenant être lié à un ou plusieurs Clients

### Lookup — ramener une info du record lié
Exemple : afficher l'email du client dans la table Projets
1. Ajouter champ **Lookup**
2. Choisir le champ de lien (vers Clients)
3. Choisir le champ à ramener (Email)

### Rollup — calculer sur les records liés
Exemple : total des projets facturés par client
1. Ajouter champ **Rollup** dans la table Clients
2. Choisir le lien vers Projets
3. Choisir le champ à agréger (Montant)
4. Choisir la fonction : SUM, COUNT, AVERAGE, MAX...

---

## Formules Airtable — les essentielles

```
// Texte
CONCATENATE({Prénom}, " ", {Nom})         → "Marie Dupont"
UPPER({Nom})                               → "DUPONT"
LEFT({Texte}, 3)                           → 3 premiers caractères
LEN({Texte})                               → nombre de caractères

// Nombres
{Prix} * {Quantité}                        → multiplication
ROUND({Prix}, 2)                           → arrondi à 2 décimales

// Dates
TODAY()                                    → date du jour
NOW()                                      → date + heure
DATEADD({Date}, 7, 'days')                → +7 jours
DATETIME_DIFF(TODAY(), {Date début}, 'days') → nb de jours entre deux dates

// Conditions
IF({Statut} = "Terminé", "✅", "⏳")
IF({Montant} > 1000, "Grand compte", "Standard")

// Logique
AND({Condition1}, {Condition2})
OR({Condition1}, {Condition2})
NOT({Checkbox})

// Switch (comme un IF multiple)
SWITCH({Statut},
  "Nouveau", "🔵",
  "En cours", "🟡",
  "Terminé", "🟢",
  "❓"        // valeur par défaut
)
```

---

## Vues — organiser l'affichage

| Type de vue | Usage |
|------------|-------|
| Grid | Tableau classique (par défaut) |
| Gallery | Cartes visuelles (avec image) |
| Kanban | Colonnes par statut (comme Trello) |
| Calendar | Par date |
| Gantt | Planning projet |
| Form | Formulaire de saisie publique |

### Filtres, tris, groupes
- **Filtre** : n'afficher que les records qui correspondent à une condition
- **Tri** : ordonner par champ (date, nom, statut...)
- **Groupe** : regrouper les records par valeur d'un champ (ex : grouper par statut)
- **Masquer des champs** : simplifier l'affichage sans supprimer les données

---

## Automatisations Airtable

### Structure
**Trigger → Condition (optionnel) → Action(s)**

### Triggers disponibles
- Quand un record est créé
- Quand un record répond à une condition
- Quand un record est modifié
- À une heure précise (schedule)
- Via un bouton (manuel)

### Actions disponibles
- Créer/modifier un record
- Envoyer un email
- Envoyer une notification Slack
- Appeler un webhook (→ pour déclencher Make !)
- Exécuter un script JS

### Exemple : notif email quand un statut change
```
Trigger : Record updated → champ "Statut"
Condition : Statut = "Terminé"
Action : Send email → destinataire + sujet + corps
```

---

## Interface Builder

Créer des interfaces visuelles sans code pour les utilisateurs finaux.
- Dashboard avec chiffres clés
- Formulaire de saisie simplifié
- Vue détail d'un record
- Liste filtrée

→ Parfait pour donner accès à un client sans lui montrer toute la base.

---

## Airtable + Make : connexion

### Triggers Make depuis Airtable
- "Watch Records" : déclenche quand un nouveau record apparaît
- "Watch Responses" : pour les formulaires Airtable

### Actions Make vers Airtable
- "Create a Record" : créer une ligne
- "Update a Record" : modifier une ligne (nécessite le Record ID)
- "Search Records" : chercher un record selon un critère
- "Delete a Record" : supprimer

### Récupérer le Record ID
Le Record ID est indispensable pour Update/Delete.
→ Toujours le stocker quand tu crées un record, ou le récupérer avec "Search Records" avant de modifier.

---

## ⚡ Utilisation de l'IA Native dans Airtable
Airtable intègre des fonctionnalités d'IA générative dans les **Formules** et les **Automatisations** qui permettent de générer des configurations complexes en moins de 15 secondes.

### 🤖 Pour les Automatisations (Prompting)
Plutôt que de galérer dans l'UI avec des triggers complexes et des ID d'enregistrement :
1. Cliquer sur l'assistant d'IA d'automatisation.
2. Décrire la logique en langage naturel sous forme de trigger/conditions/action.
*Exemple : "Create an automation for the 'Designs' table. When the 'Title' field is updated and is not empty, and the 'Status' is 'Concept', update the record's 'Status' to 'SEO done'."*

### 🧮 Pour les Formules
Utiliser l'assistant d'IA du champ Formule en décrivant le calcul désiré.
*Exemple : "If both Concept and Product are not empty, combine Concept and Product separated by ' — ', otherwise show 'À nommer'."*

---

## Pour l'examen — points clés à maîtriser
1. Créer une base avec plusieurs tables reliées
2. Utiliser Lookup et Rollup correctement
3. Écrire une formule IF et CONCATENATE
4. Créer une vue Kanban filtrée
5. Mettre en place une automatisation simple (trigger → action)
6. Connecter Airtable à Make via webhook ou module natif
