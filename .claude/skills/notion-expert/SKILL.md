---
name: notion-expert
description: >
  Skill pour utiliser Notion efficacement : pages, bases de données, propriétés, vues, relations,
  formules, automatisations et templates. Utilise cette skill quand Stef veut : structurer un
  workspace Notion, créer une base de données, écrire une formule Notion, créer des relations
  entre bases, utiliser les vues (tableau, kanban, calendrier...), créer un template, automatiser
  dans Notion, connecter Notion à Make, ou préparer un examen sur Notion.
---

# Notion Expert

## C'est quoi Notion ?
Un outil tout-en-un : wiki, gestionnaire de projets, base de données, docs.
La force de Notion = tout est une **page**, et les pages peuvent contenir des **bases de données**.

---

## Structure d'un workspace

```
Workspace
  └── Pages (documents, wikis)
  └── Bases de données (tables, kanbans, calendriers...)
        └── Items (= les lignes / entrées)
              └── Propriétés (= les colonnes)
                    └── Page de détail (chaque item a sa propre page)
```

---

## Les blocs essentiels

Dans une page Notion, tout est un bloc. Tape `/` pour en ajouter un.

| Commande | Résultat |
|----------|---------|
| `/h1` `/h2` `/h3` | Titres |
| `/bullet` | Liste à puces |
| `/todo` | Case à cocher |
| `/table` | Tableau simple |
| `/database` | Base de données inline |
| `/callout` | Encadré coloré (pour les infos importantes) |
| `/code` | Bloc de code |
| `/divider` | Ligne de séparation |
| `/toggle` | Contenu masqué/révélé |
| `/quote` | Citation |
| `/mention` | Mentionner une page ou une personne |

---

## Bases de données — le cœur de Notion

### Types de propriétés

| Type | Usage |
|------|-------|
| Title | Nom de l'item (obligatoire, toujours là) |
| Text | Texte libre |
| Number | Chiffres, formater en %, €, etc. |
| Select | Choix unique (statut, catégorie) |
| Multi-select | Choix multiples (tags) |
| Date | Date ou plage de dates |
| Checkbox | Oui/Non |
| URL | Lien web |
| Email | Adresse email |
| Files & Media | Pièces jointes |
| Relation | Lien vers une autre base de données |
| Rollup | Calcul sur les items liés |
| Formula | Calcul personnalisé |
| Created time / Last edited | Automatique |
| Person | Assigner à un membre |

---

## Relations et Rollups

### Créer une relation entre deux bases
Exemple : base **Projets** ↔ base **Clients**
1. Dans Projets, ajouter propriété **Relation**
2. Choisir la base **Clients**
3. Activer "Show on Clients" pour voir aussi la relation depuis Clients
4. Dans chaque projet, sélectionner le client associé

### Rollup — calculer sur les items liés
Exemple : compter le nombre de projets par client
1. Dans Clients, ajouter propriété **Rollup**
2. Choisir la relation (vers Projets)
3. Choisir la propriété à agréger (Title ou autre)
4. Choisir la fonction : Count, Sum, Average, Max, Min...

---

## Formules Notion

Syntaxe : les formules accèdent aux propriétés avec `prop("Nom de la propriété")`

```javascript
// Texte
prop("Prénom") + " " + prop("Nom")         // Concaténer
length(prop("Description"))                 // Longueur du texte

// Nombres
prop("Prix") * prop("Quantité")            // Calcul
round(prop("Note"), 1)                     // Arrondi

// Dates
now()                                      // Date actuelle
dateBetween(now(), prop("Deadline"), "days") // Jours restants

// Conditions
if(prop("Statut") == "Terminé", "✅", "⏳")
if(prop("Montant") > 1000, "VIP", "Standard")

// Booléens
prop("Checkbox") ? "Fait" : "À faire"
not(prop("Checkbox"))

// Date formatée
formatDate(prop("Date"), "DD/MM/YYYY")
```

---

## Vues

| Vue | Usage |
|-----|-------|
| Table | Tableau (vue par défaut) |
| Board | Kanban par propriété Select |
| Calendar | Par date |
| Gallery | Cartes avec image de couverture |
| List | Liste minimaliste |
| Timeline | Gantt pour les plages de dates |

### Filtres et tris
- **Filtre** : Propriété → condition → valeur (ex : Statut = "En cours")
- **Tri** : Par date, par nom, par priorité...
- **Grouper** : Regrouper les items par valeur d'une propriété
- **Masquer des propriétés** : alléger l'affichage sans supprimer

---

## Templates

### Créer un template de page
1. Dans une base de données → menu "..." → **Templates**
2. Créer un nouveau template
3. Définir la structure par défaut (propriétés pré-remplies, blocs de contenu)
4. À l'usage : nouveau record → choisir le template

### Templates de workspace
- Bouton **Duplicate page** pour créer des copies
- Exporter/importer des pages via le menu "..."

---

## Automatisations Notion

### Automatisations natives (dans les bases de données)
Clic sur **"..."** dans une base → **Automations**

**Triggers :**
- Item ajouté
- Propriété modifiée
- Date atteinte

**Actions :**
- Modifier une propriété
- Ajouter un item dans une autre base
- Envoyer une notification Slack ou email

### Exemple : changer le statut automatiquement
```
Trigger : Date de deadline atteinte
Action : Modifier "Statut" → "En retard"
```

---

## Notion + Make

### Triggers Make depuis Notion
- "Watch Database Items" : déclenche quand un item est créé/modifié

### Actions Make vers Notion
- "Create a Database Item" : ajouter une ligne
- "Update a Database Item" : modifier (nécessite le Page ID)
- "Get a Database Item" : récupérer un item
- "Search Objects" : chercher par propriété

### Récupérer le Page ID
- Ouvrir l'item → copier le lien → l'ID est à la fin de l'URL
- Ou le récupérer via "Search Objects" avant de modifier

---

## Organisation d'un bon workspace

### Structure recommandée pour une auto-entreprise solo
```
🏠 Home (dashboard principal)
  ├── 📋 Projets (base de données)
  ├── 👥 Clients (base de données reliée à Projets)
  ├── 💰 Finances (CA, factures)
  ├── 📝 Contenu (posts, articles à écrire)
  ├── 🧠 Base de connaissances (ressources, docs)
  └── ✅ Tâches du jour (vue filtrée sur Projets)
```

---

## Création de pages riches

### Règles visuelles de base
- **Icône emoji** : toujours en mettre une — c'est la première chose qu'on voit
- **Couverture** : obligatoire sur les pages importantes ou partagées avec un client
- **Table of contents** : à placer en haut pour toute page > 4 sections
- **Divider** : séparer les grandes zones logiques — ne pas tout fondre

### Blocs à privilégier (avec `/`)

| Bloc | Cas d'usage |
|------|-------------|
| `/callout` | Statut, alerte, info critique — choisir une couleur selon l'urgence |
| `/toggle` | Sections détaillées optionnelles — garder la page aérée |
| `/synced block` | Contenu réutilisé dans plusieurs pages (ex: infos contact) |
| `/table of contents` | Navigation en haut de page |
| `/database — inline` | Liste de livrables, tâches ou étapes intégrée dans la page |
| `/divider` | Séparer visuellement les zones |
| `/mention` | Lier une autre page Notion (navigation interne) |
| `/quote` | Mettre en valeur une citation ou un message clé |

### Navigation interne
- En haut de chaque page : lien `↗ [Page parent]` via `/mention`
- Pour les wikis : ajouter un index des sous-pages avec `/subpage`
- Pour les projets : lien vers le dashboard principal

### Structures types

**Page projet**
```
[Emoji] Nom du projet
📌 Callout statut (En cours / En pause / Terminé)
---
## Contexte · Objectifs · Livrables · Liens · Notes
```

**Fiche client**
```
[Emoji] Nom du client
📋 Callout infos clés (secteur, budget, deadline)
---
## Brief · Coordonnées · Historique · Documents
```

**Meeting notes**
```
📝 Réunion [Date]
👥 Participants
---
## Ordre du jour · Décisions · Actions [todo list inline] · Suite
```

**Dashboard**
```
🏠 Dashboard [Nom]
[Callout statut global]
---
## Vue d'ensemble [DB inline] · Priorités [todo] · Ressources
```

---

## Pour l'examen — points clés à maîtriser
1. Créer une base de données avec les bons types de propriétés
2. Créer une relation entre deux bases + un Rollup
3. Écrire une formule IF simple
4. Créer une vue Kanban et une vue Calendar
5. Mettre en place une automatisation native
6. Connecter Notion à Make (créer + modifier un item)
7. Créer un template de page réutilisable
