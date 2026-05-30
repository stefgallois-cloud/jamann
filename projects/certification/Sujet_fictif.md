# Examen de certification - Sujet fictif

# 🗣 Le brief

### Présentation du client

LinguaNova est un centre de formation linguistique basé à Bordeaux. Il organise des ateliers de conversation (groupes de 4 à 8 personnes, tous niveaux, plusieurs langues).

L’équipe est composée de :

- Cécile : réceptionne les inscriptions des apprenants (par email ou téléphone)
- Bastien : attribue les formateurs aux ateliers
- Sophie : supervise l’ensemble et valide les situations particulières
### Problématique

L’entreprise connaît une forte croissance. Le traitement manuel des inscriptions devient trop lourd et source d’erreurs. De plus, LinguaNova souhaite proposer ses ateliers dans d’autres villes (Lyon, Lille), ce qui rend nécessaire un système plus robuste.

Une solution numérique est attendue pour :

- Centraliser les inscriptions
- Accélérer leur traitement
- Gérer deux types de parcours :
1. Demandes classiques
1. Demandes avec besoin d’adaptation (ex. : handicap, créneaux spécifiques, accompagnement renforcé)
### Processus actuel d’inscription

1. Réception de la demande
- Par email (85 %) ou téléphone (15 %)
- Données attendues : nom, langue souhaitée, niveau, disponibilités, besoins spécifiques éventuels
1. Traitement selon le type de demande
### Votre mission

Vous êtes consultant·e chez NoCodeNow, une agence spécialisée dans la conception de solutions digitales avec des outils no-code.

Sophie Martin, directrice de LinguaNova, vous a mandaté pour concevoir une solution complète de gestion des inscriptions aux ateliers.

Votre mission consiste à :

- Modéliser le processus métier actuel et ses variantes
- Proposer une solution technique réaliste, duplicable, et adaptée à un usage interne
- Implémenter une version fonctionnelle de cette solution avec des outils no-code (ex. : Airtable, Softr, Zapier ou Make)
- Documenter et tester cette solution comme si elle devait être livrée à une équipe métier
La solution finale devra couvrir les deux parcours (inscription classique et inscription avec adaptation) et inclure :

- Une base de données relationnelle
- Une interface utilisateur fonctionnelle
- Un système de notifications automatiques
- Des livrables de documentation, tests et mesure de performance
# Partie 1 – Cadrage du projet 

### 1. Note de cadrage

Vous devez compléter la note de cadrage à partir du brief fourni. Elle doit comporter au minimum :

- Les enjeux de LinguaNova
- Les irritants du système actuel
- Les attentes de la nouvelle solution
- Les contraintes identifiées (temps, accessibilité, duplicabilité, profils utilisateurs)
> 📌 Outil : Notion  

> Ressources de la formation :

### 2. Modélisation du processus métier

Vous devez modéliser le processus complet d’inscription, selon la norme BPMN. Le schéma doit inclure :

- Le parcours classique
- Le parcours avec besoin d’adaptation
- Les différents intervenants (demandeur, Cécile, Sophie, Bastien)
- Les étapes de validation, d’affectation, de confirmation ou de refus
> 📌 Outil : Miro, Whimsical ou autre outil de BPMN (outil libre)

> Ressources de la formation :

### 3. Architecture globale de la solution

Vous devez formaliser l’architecture fonctionnelle de votre solution. Votre schéma doit inclure :

- Les outils utilisés (base de données, interface, automatisations)
- Les flux entre chaque brique
- Le lien entre utilisateurs et outils
> 📌 Outil : Miro, Whimsical ou autre outil (outil libre)

> Ressources de la formation :

### 4. Schéma ERD

Créez un schéma entité-relation (ERD) de la base de données qui gérera les inscriptions. Vous devez faire apparaître :

- Les entités principales : utilisateur, atelier, formateur, inscription, adaptation
- Les relations (1-1, 1-n, etc.)
- Les attributs clés pour chaque entité
> 📌 Outil : Whimsical, dbdiagram.io, Miro, etc. (outil libre)

> Ressources de la formation :

# Partie 2 – Implémentation technique 

### 1. Création de la base de données

Vous devez implémenter votre base de données dans Airtable, en respectant le schéma ERD défini précédemment.

Votre base doit :

- Contenir les tables nécessaires (utilisateurs, ateliers, inscriptions, formateurs, adaptations)
- Mettre en place les bonnes relations entre les tables
- Être remplie avec des données fictives mais cohérentes
> 📌 Outil : Airtable

> Ressources de la formation :

### 2. Création de l’interface utilisateur

Vous devez créer une interface web avec Softr, incluant :

✅ Page d’accueil

- Contenant un bouton pour faire une demande d’inscription (via formulaire Airtable)
✅ Espaces utilisateurs

- Espace Cécile : liste des demandes reçues à traiter
- Espace Sophie : liste des demandes avec adaptation à valider
- Espace Bastien : liste des ateliers à compléter avec affectation des formateurs
Chacun doit pouvoir :

- Accéder à un détail de la demande
- Valider ou refuser l’inscription (en modifiant le statut dans Airtable)
> 📌 Outil : Softr

> Ressources de la formation :

### 3. Automatisations

Configurez des automatisations pour notifier les bons interlocuteurs au bon moment :

- Lorsqu’une demande classique est validée → notification à Bastien
- Lorsqu’une demande avec adaptation est reçue → notification à Sophie
> 📌 Outils autorisés : Airtable Automations, Make, Zapier, n8n 

> Ressources de la formation :

# Partie 3 – Livraison de la solution

### 1. Cahier de recette

Vous devez rédiger un cahier de recette centré sur le traitement d’une demande d’inscription avec besoin d’adaptation.

Il doit inclure :

- Un scénario positif : la demande est acceptée, un formateur est affecté, confirmation envoyée
- Un scénario négatif : la demande n’est pas réalisable, un refus est communiqué
> 📌 Utilisez le modèle Notion fourni 

> Ressources de la formation : 
