# Cahier des Charges — CRM Professionnel Esthétique & Coiffure
**Spécifications de structure pour l'offre premium Clockwork Ops**

Ce document décrit l'architecture complète, exhaustive et professionnelle d'un CRM Beauté/Esthétique de niveau entreprise. Il est conçu pour être directement vendu comme offre haut de gamme (valeur perçue : 490€ - 990€).

---

## 1. Structure de la Base Principale : "Fichier Clients"

Cette table centralise le profil complet, le statut de fidélité, les coordonnées de contact et les indicateurs financiers de chaque client.

### Fiche d'Identité & Contact
*   **`Nom complet`** (Titre) : Nom de famille et prénom.
*   **`Prénom`** (Texte) : Pour personnaliser les e-mails et SMS automatiques.
*   **`Téléphone`** (Téléphone) : Au format international (ex: +33612345678) pour les relances SMS/WhatsApp.
*   **`E-mail`** (E-mail) : Pour l'envoi des factures, questionnaires de satisfaction et newsletters.
*   **`Date de Naissance`** (Date) : Indispensable pour l'envoi d'offres promotionnelles automatiques le jour de leur anniversaire (ex: -10% offerts).
*   **`Adresse postale`** (Texte) : Optionnel (utile pour les soins à domicile).

### Données Techniques (Esthétique & Coiffure)
*   **`Diagnostic / Profil`** (Multi-sélection) : Types de cheveux (Secs, Gras, Colorés) ou de peau (Sensible, Mixte, Sèche).
*   **`Formule Technique`** (Texte riche) : Historique des mélanges de colorations (ex: *30g de 6.3 + 15g de 7.0 au 20vol*), temps de pose, ou contre-indications (allergies ⚠️).
*   **`Notes Préférences`** (Texte) : Boisson préférée, pression de massage (douce/forte), sujets de conversation favoris.

### Pipeline Commercial & Suivi
*   **`Fidélité`** (Sélection) :
    *   `🟢 Actif` (Venu dans les 30 derniers jours)
    *   `🟡 À surveiller` (Pas de visite depuis 45 jours)
    *   `🔴 À relancer` (Pas de visite depuis 60 jours et plus)
    *   `🆕 Nouveau` (Première visite récente)
*   **`Fréquence de Visite Idéale`** (Sélection) : `4 semaines`, `6 semaines`, `8 semaines`, `12 semaines`.
*   **`Source d'Acquisition`** (Sélection) : `Instagram`, `Site Web`, `Bouche-à-oreille`, `Passant`, `Facebook`.

### Indicateurs Financiers (Calculés automatiquement via l'Historique)
*   **`Dernière Visite`** (Date - Rollup) : Date de la prestation la plus récente.
*   **`CA Prestations Cumulé`** (Nombre - Rollup) : Total dépensé en soins/coupes.
*   **`CA Produits Cumulé`** (Nombre - Rollup) : Total dépensé en vente de produits de soin.
*   **`CA Total Généré`** (Formule) : `CA Prestations Cumulé` + `CA Produits Cumulé`.
*   **`Nombre de Visites`** (Nombre - Rollup) : Total de visites enregistrées.
*   **`Panier Moyen`** (Formule) : `CA Total Généré` / `Nombre de Visites`.

---

## 2. Structure de la Base Connectée : "Historique des Prestations"

Cette table enregistre chaque transaction financière et technique. Chaque ligne correspond à un rendez-vous facturé.

*   **`Réf Prestation`** (Titre) : Généré sous la forme `Date — Nom Client` (ex: *31/05/2026 — Sophie Martin*).
*   **`Client`** (Relation) : Lié à la base **Fichier Clients**.
*   **`Date de la visite`** (Date).
*   **`Catégorie de Soin`** (Sélection) : `Coupe & Coiffage`, `Coloration/Balayage`, `Soin Visage`, `Massage`, `Manucure`, `Autre`.
*   **`Détail Prestation`** (Texte) : Notes spécifiques sur ce qui a été fait aujourd'hui.
*   **`Montant Prestation (€)`** (Nombre).
*   **`Produit Vendu`** (Sélection) : Liste des produits du salon vendus (ex: *Shampoing Hydratant 250ml*).
*   **`Montant Produit (€)`** (Nombre).
*   **`Mode de Règlement`** (Sélection) : `Carte Bancaire`, `Espèces`, `Chèque`, `Lien Stripe`.
*   **`Collaborateur`** (Sélection) : Nom du coiffeur/praticien qui a réalisé le soin.

---

## 3. Les Vues Métiers Indispensables (L'ergonomie Pro)

Un CRM professionnel doit proposer des tableaux de bord adaptés au rythme du salon :

1.  **Le Dashboard du Jour (Vue Liste/Calendrier) :**
    *   Filtré sur `Date de la visite = Aujourd'hui`.
    *   Affiche l'heure, le nom du client, le type de prestation prévu, et un bouton d'accès rapide à sa **Fiche Technique** pour que le collaborateur sache exactement quoi faire avant que le client ne s'installe.
2.  **Le Radar des Relances (Vue Galerie) :**
    *   Filtré sur `Statut Fidélité = 🔴 À relancer`.
    *   Affiche uniquement les fiches clients avec leur prénom et leur numéro de téléphone pour une relance rapide par SMS ou WhatsApp.
3.  **Le Bilan Comptable Simplifié (Vue Tableau Kanban) :**
    *   Regroupé par `Mode de Règlement` ou par `Mois`.
    *   Permet de voir instantanément le CA total encaissé dans la journée ou le mois.
