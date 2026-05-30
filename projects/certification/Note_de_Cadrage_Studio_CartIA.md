# Note de Cadrage : Système d'Exploitation (OS) Studio CartIA

**Référence :** CADRE-2025-SC001  
**Date :** 15 Février 2026  
**Statut :** Brouillon pour validation  

---

## ❓ Contexte

**Studio CartIA** est une agence de marketing multicanal fondée en 2019, réalisant un chiffre d'affaires annuel de **450 000 €** avec une équipe de **8 personnes**. Après une croissance rapide de **+60%** ces 18 derniers mois, l'agence souffre d'une perte critique d'efficacité opérationnelle.

L'information est actuellement fragmentée entre **47 canaux de communication** (WhatsApp, Slack, Emails, téléphone...) et des outils silotés :
*   Un fichier Excel `Projets_2025_FINAL_v8.xlsx` à 15 onglets pour les budgets et le planning (versions incohérentes, pas de temps réel, budgets jamais à jour).
*   Un tableau Trello pour les tâches, abandonné par l'équipe car trop lourd à maintenir (cartes désynchronisées, listes infinies créées par Thomas).
*   Un Google Drive désordonné contenant 347 fichiers dans le dossier "Projets".
*   Un Slack surchargé (12 canaux projets actifs + messages directs partout).

Cette situation génère une perte de temps massive (**12h/semaine par collaborateur en recherche d'informations**), des décisions perdues dans le flux, des briefs clients égarés dans des threads d'emails et une opacité totale sur la rentabilité réelle des projets. Les tentatives d'adoption d'outils du marché (Monday.com, Asana, Airtable en autonomie) ont échoué en raison de leur complexité ou de leur manque d'intégration (effets silos).

---

## 🪫 Le besoin / les enjeux

L'objectif est de bâtir un outil centralisé, une **"source unique de vérité"**, pour piloter l'activité de bout en bout et soutenir la croissance sans épuiser les équipes.

*   **Enjeu 1 : Centralisation & Capture.** Automatiser l'entrée des briefs clients via un canal unique pour ne plus perdre de demandes (actuellement 3 à 4 briefs perdus par mois).
*   **Enjeu 2 : Productivité Opérationnelle.** Diviser par 3 le temps de recherche d'information (viser 4h/semaine max au lieu de 12h) et automatiser les tâches administratives chronophages comme la facturation.
*   **Enjeu 3 : Pilotage & Rentabilité.** Obtenir une vision en temps réel sur l'avancement des ~25 projets annuels et la consommation des budgets (temps passé vs budget initial).
*   **Enjeu 4 : Expérience Client.** Professionnaliser la relation client en offrant de la visibilité sur l'avancement pour réduire de 50% les relances clients ("où en est mon projet ?").
*   **Enjeu 5 : Adoption.** Proposer une solution extrêmement simple et intuitive pour contrer l'échec des adoptions d'outils précédents.

---

## 🔋 Compréhension du besoin

Le projet consiste à créer un **Internal Ops OS** (Système d'Exploitation Interne) sur-mesure. Il ne s'agit pas seulement d'un gestionnaire de tâches, mais d'une infrastructure connectée qui lie la prise de brief, la gestion de projet, le suivi des collaborateurs et la facturation automatique, avec une interface simplifiée pour l'équipe créative et un accès sécurisé pour les clients.

### Nombre prévisionnel d'utilisateurs
*   **Internes :** 8 collaborateurs (Lyon / Télétravail).
*   **Externes :** ~25 clients actifs (accès par portail dédié).

### Profils utilisateurs & Irritants
1.  **Direction (Clara) :**
    *   *Rôle :* Pilotage stratégique et commercial.
    *   *Irritants :* Reçoit les briefs sur trop de canaux différents, n'a pas de vision sur la rentabilité, passe trop de temps à chercher qui fait quoi.
2.  **Manager Production (Thomas) :**
    *   *Rôle :* Directeur Artistique, dispatch des tâches.
    *   *Irritants :* Déteste la complexité technique (a abandonné Airtable en 2h), gère des listes Trello infinies que personne ne suit.
3.  **Équipe Créative (Graphistes / Motion / Dev) :**
    *   *Rôle :* Exécution des missions.
    *   *Irritants :* Trop de bruit sur Slack, ne savent pas quelle est la priorité du jour.
4.  **Admin & Compta (Sophie) :**
    *   *Rôle :* Facturation et RH.
    *   *Irritants :* Les budgets Excel ne sont jamais à jour, la facturation manuelle prend 30 minutes par projet.
5.  **Clients :**
    *   *Rôle :* Consultation.
    *   *Irritants :* Doivent relancer l'équipe pour savoir où en est leur projet.

### Droits d'accès (Matrice L.C.M.S)

*Convention : **L** = Lecture | **C** = Création | **M** = Modification | **S** = Suppression*

| Donnée / Action | Clara (Dir) | Thomas (Prod) | Équipe (Prod) | Sophie (Admin) | Client (Ext) |
| :--- | :---: | :---: | :---: | :---: | :---: |
| **Budgets & CA** | L.C.M.S | L | - | L.M | - |
| **Projets** | L.C.M.S | L.C.M | L | L.M | L |
| **Tâches** | L.M | L.C.M.S | L.M (les siennes) | L | - |
| **Briefs Clients** | L.C.M | L.M | L | L | L.C |
| **Factures** | L | - | - | L.C.M.S | L (les siennes) |

### Contraintes opérationnelles identifiées
*   **Simplicité extrême :** "L'interface Thomas" doit être utilisable en moins de 5 minutes sans formation complexe.
*   **Zéro Silo :** Tous les nouveaux outils doivent communiquer nativement de manière bidirectionnelle.
*   **Responsive :** L'équipe de production doit pouvoir consulter et mettre à jour ses tâches sur mobile.

### Gestion des données

#### Données sensibles business
*   Taux journaliers moyens (TJM), marges par projet, CA réel et prévisionnel.
*   *Sécurité :* Accès strictement restreint à la Direction (Clara) et à la Comptabilité (Sophie).

#### Données personnelles (RGPD)
*   Coordonnées des clients, adresses email et informations de contact des collaborateurs.
*   *Sécurité & Conformité :* Stockage sécurisé dans Airtable (serveurs en Europe), base légale du traitement reposant sur l'exécution du contrat.

---

## 🗺️ Le périmètre

1.  **Module Capture :** Formulaire de brief intelligent public + création automatique du projet associé dans le back-office.
2.  **Module Pilotage :** Dashboard de suivi des projets avec statuts clairs (Prospect, En cours, Livré, Annulé), budget consommé et pourcentage d'avancement.
3.  **Module Tâches :** Vues personnalisées par collaborateur, gestion des dépendances entre tâches et calcul automatique des priorités.
4.  **Module Facturation :** Génération automatique des factures au format PDF à la livraison du projet, calculs automatiques (TVA, TTC, échéance) et suivi de statut.
5.  **Module Portail :** Espace client sécurisé en lecture seule pour la consultation en temps réel de l'état d'avancement et des livrables.

---

## ❌ Exclusions

La prestation **ne couvre pas** les aspects suivants :
*   La production créative proprement dite (création de designs, code de sites web clients, montage vidéo).
*   La gestion de la paie des collaborateurs et la comptabilité analytique complexe (qui restent à la charge de l'expert-comptable externe).
*   Le démarchage commercial actif (prospection sortante et CRM de vente complexe type Salesforce/HubSpot).

---

## ⚙️ Identification des fonctions principales de la solution

*   **Brief Auto :** Un formulaire Tally public connecté qui mappe directement les réponses des clients dans la base de données Airtable.
*   **Calculateur de Rentabilité :** Script d'automatisation interne calculant le budget consommé (heures saisies × TJM) comparé au budget initial du projet.
*   **Priorisation Dynamique :** Algorithme de tri automatique calculant un score de priorité des tâches en fonction des variables Urgence (date d'échéance) et Importance (poids du projet/client).
*   **Trigger Facture :** Scénario d'automatisation Make déclenchant la génération et l'envoi de la facture dès qu'un projet passe au statut "Livré".
*   **Portail Softr :** Interface web simplifiée, sécurisée par mot de passe, permettant aux clients de voir l'avancement de leurs projets sans accéder à la base de données brute Airtable.

---

## 🧰 La stack technique

*   **Airtable :** Le "Cerveau" (Base de données relationnelle et gestion de projet centralisée).
*   **Tally :** La "Porte d'entrée" (Formulaires de brief élégants et flexibles).
*   **Make :** Le "Système Nerveux" (Automatisations complexes, triggers et notifications).
*   **Softr :** La "Vitre" (Portail client externe et vues simplifiées pour l'équipe).
*   **Slack :** Canal de notifications ciblées (fin des messages intempestifs, notifications uniquement sur événements clés).

---

## ⚠️ Les pré-requis

Le client s'engage à fournir les éléments suivants avant le démarrage des développements :

1.  **Nettoyage de données :** Clara doit fournir le fichier Excel "v8" nettoyé des données historiques obsolètes (projets terminés et archivés).
2.  **Accès :** Création des comptes propriétaires sur Airtable et Softr avec les abonnements adéquats.
3.  **Assets de marque :** Logo haute définition et charte graphique (polices, couleurs) de Studio CartIA pour la personnalisation du portail Softr.
4.  **Disponibilité :** Un engagement de disponibilité de 2h par semaine de la part de Thomas (DA) pour les phases de validation UX/UI de ses interfaces.

---

## 🔀 Organisation

### Les parties prenantes

| Rôle | Nom | Responsabilité dans le projet |
| :--- | :--- | :--- |
| **Sponsor / Décideur** | Clara | Arbitrages budgétaires, validation finale, fourniture des accès. |
| **Référent Métier** | Thomas | Validation des processus de production et de l'ergonomie des interfaces. |
| **Testeur principal** | Sophie | Validation du module de facturation et conformité des exports compta. |
| **Prestataire No-Code** | Stéphanie (Clockwork Ops) | Analyse, architecture de la base, développements et intégrations. |

### Budget & Planning

*   **Budget estimé :** À définir selon devis détaillé (Cible client : ROI rapide par réduction drastique du temps perdu).
*   **Jalons clés :**
    *   **Semaine 1 (S1) :** Architecture de la base de données Airtable et modélisation des relations.
    *   **Semaine 2 (S2) :** Formulaires Tally et automatisation des Tâches (vues équipes).
    *   **Semaine 3 (S3) :** Portail client Softr et module d'automatisation de la Facturation.
    *   **Semaine 4 (S4) :** Recette globale, corrections de bugs, formation de l'équipe et mise en production.

### Instances de suivi
*   Un point hebdomadaire en visioconférence de 30 minutes pour valider le jalon de la semaine précédente.
*   Un canal Slack partagé dédié pour les communications asynchrones quotidiennes.

---

## 🧩 Les types d'activités du projet

Pour mener à bien ce projet, Clockwork Ops déploie les activités suivantes :
1.  **Conception :** Modélisation de la base de données (modèle conceptuel de données) et cartographie des flux de travail (BPMN).
2.  **Développement :** Paramétrage d'Airtable, configuration de Softr, création des formulaires Tally et des scénarios Make.
3.  **Recette :** Phase de tests intensifs de bout en bout avec Thomas (production) et Sophie (factures).
4.  **Formation :** Session de formation en direct de 2h pour l'équipe complète + fourniture de courtes capsules vidéo tutorielles.

---

## 📞 Le support

*   **Support correctif :** Inclus pendant une durée de **1 mois** après la mise en production officielle.
*   **Ajustements mineurs :** Prise en charge des ajustements de filtres, de listes de choix ou de petits champs Airtable durant cette période de garantie.
*   **Option :** Contrat de maintenance mensuel disponible pour les évolutions futures de la plateforme.
