---
name: softr-expert
description: >
  Skill pour créer des apps web et portails clients avec Softr, connecté à Airtable ou Google Sheets.
  Utilise cette skill quand Stef veut : créer une app Softr, connecter Softr à Airtable, construire
  un portail client ou membre, créer des pages avec liste/détail/formulaire, gérer les permissions
  et accès utilisateurs, créer un espace de vente ou directory, personnaliser le design d'une app
  Softr, ou préparer un examen sur Softr.
---

# Softr Expert

## C'est quoi Softr ?
Un outil no-code pour transformer une base Airtable (ou Google Sheets) en **app web**.
En 1h tu peux avoir un portail client, une marketplace, un directory, une app membre.

---

## Structure d'une app Softr

```
App Softr
  └── Source de données (Airtable / Google Sheets)
  └── Pages
        └── Blocs (composants visuels)
              └── Listes, Détails, Formulaires, Tableaux...
  └── Utilisateurs & Permissions
  └── Domaine personnalisé (optionnel)
```

---

## Connexion à Airtable — étape par étape

1. Dans Softr → **Settings → Data Sources → Add**
2. Choisir **Airtable**
3. Entrer la **clé API Airtable** (Airtable → profil → API → Generate token)
4. Entrer l'**ID de la base** (dans l'URL Airtable : `https://airtable.com/appXXXXX/...`)
5. Softr liste les tables disponibles → sélectionner celles à utiliser
6. Tester la connexion

---

## Les blocs essentiels

| Bloc | Usage |
|------|-------|
| **List** | Afficher une liste de records (cartes, tableau, grille) |
| **Details** | Page de détail d'un record |
| **Form** | Formulaire pour créer ou modifier un record |
| **Chart** | Graphiques depuis les données |
| **Table** | Vue tableau filtrable |
| **Kanban** | Vue kanban |
| **Map** | Carte géographique |
| **Hero / Header** | Bandeau d'introduction |
| **CTA** | Bouton d'appel à l'action |
| **Text / Image** | Contenu statique |

---

## Créer une liste connectée à Airtable

1. Ajouter un bloc **List** sur une page
2. **Data source** : choisir la table Airtable
3. **Fields mapping** : relier les colonnes Airtable aux champs du bloc
   - Title → champ "Nom"
   - Subtitle → champ "Description"
   - Image → champ "Photo"
   - Badge → champ "Statut"
4. **Filters** : filtrer les records affichés (ex : Statut = "Publié")
5. **Sort** : trier par champ (date, nom...)
6. **Search** : activer la barre de recherche si besoin

---

## Créer une page de détail

1. Dans le bloc List → activer **"Enable detail page"**
2. Softr crée automatiquement une page de détail
3. Sur cette page, ajouter un bloc **Details**
4. Mapper les champs à afficher
5. Ajouter des blocs supplémentaires si besoin (texte, liste liée...)

---

## Formulaires — créer / modifier des records

### Formulaire de création
1. Ajouter bloc **Form**
2. Data source → table Airtable cible
3. Action : **Create record**
4. Champs : choisir lesquels afficher, rendre obligatoires
5. Après soumission : message de confirmation ou redirection

### Formulaire de modification
1. Même process, Action : **Update record**
2. Softr pré-remplit le formulaire avec les données existantes
3. Souvent utilisé sur une page de détail

---

## Gestion des utilisateurs et permissions

### Activer l'authentification
Settings → **Users** → activer "Enable user accounts"

### Types d'utilisateurs
- **Non connecté** : visiteur public
- **Connecté** : utilisateur avec compte
- **Groupes** : segmenter les accès (ex : Admin, Client, Membre)

### Permissions par bloc
Sur chaque bloc → onglet **"Visibility"** :
- Visible par : Tous / Connectés / Groupe spécifique
- Filtrer les données selon l'utilisateur connecté :
  → "Filter by logged-in user" — affiche seulement les records appartenant à l'utilisateur

### Lier les utilisateurs Airtable
Dans Airtable, ajouter un champ **Email** dans la table concernée.
Dans Softr → bloc → Filter → "Email equals logged-in user email"
→ Chaque utilisateur voit seulement SES données.

---

## Personnalisation du design

### Thème global
Settings → **Design** :
- Couleurs primaires / secondaires
- Typographie (Google Fonts)
- Arrondis, ombres

### Par bloc
Chaque bloc a un onglet **"Style"** :
- Couleur de fond
- Espacement
- Variante de mise en page (liste, grille, cartes...)

### Responsive
Softr est responsive par défaut — vérifier l'affichage mobile avec le toggle en haut.

---

## Cas d'usage typiques pour Stef

### Portail client (pour ses clients automatisation)
```
Page d'accueil → présentation
Page "Mes projets" → liste filtrée par client connecté
Page "Mes documents" → fichiers livrables par projet
Page "Support" → formulaire de demande
```

### App Surf Ready
```
Page d'accueil → présentation du guide
Page "Niveaux" → liste des niveaux (débutant, intermédiaire)
Page "Exercices" → liste filtrée par niveau
Page "Lexique" → dictionnaire du surf
Accès : public ou sur inscription (écoles partenaires)
```

### Directory / Marketplace
```
Page liste → tous les items (prestataires, produits, ressources)
Filtres → par catégorie, localisation, prix
Page détail → fiche complète
Formulaire → soumettre sa fiche
```

---

## Softr + Make

### Déclencher Make depuis Softr
- Soumission de formulaire Softr → webhook Make
- Dans le formulaire Softr → **"Webhook"** → coller l'URL Make

### Softr + Airtable + Make ensemble
```
Formulaire Softr → crée record Airtable
                 → déclenche Make via webhook Airtable
                 → Make envoie email de confirmation
                 → Make notifie sur Slack
```

---

## Pour l'examen — points clés à maîtriser
1. Connecter Softr à une base Airtable
2. Créer une page Liste + page Détail liées
3. Ajouter un formulaire de création de record
4. Configurer les permissions (public vs connecté vs groupe)
5. Filtrer les données par utilisateur connecté
6. Personnaliser le design (couleurs, typo)
7. Connecter un formulaire Softr à un webhook Make
