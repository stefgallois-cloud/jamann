# Cahier de Recette : Système d'Exploitation (OS) Studio CartIA

**Client :** Studio CartIA  
**Prestataire :** Clockwork Ops — Stéphanie  
**Date de recette :** 21 Mai 2026  
**Statut :** À valider  

---

## 🏔 Périmètre des tests

Ce cahier de recette vise à valider la conformité de l'**Internal Ops OS** développé pour Studio CartIA.

### Ce qui est testé :
1.  **Formulaire de Brief (Tally) :** Capture de l'information et transfert automatique dans la base de données.
2.  **Base de données Airtable :** Calculs automatiques de rentabilité, formules de priorisation dynamique des tâches.
3.  **Intégration Make (Automatisations) :** Notification Slack sur création de brief, génération et envoi de factures lors du passage au statut "Livré".
4.  **Portail Client (Softr) :** Restriction d'accès, affichage en lecture seule des données filtrées par client.

### Ce qui n'est pas testé :
*   Le fonctionnement des applications clientes natives Airtable, Softr ou Make (tests d'infrastructure tiers).
*   La passerelle de paiement (hors périmètre initial).
*   La comptabilité analytique de l'expert-comptable.

---

## 💻 Environnement de test
*   **Airtable (Back-Office) :** Espace de travail de test `Studio CartIA - Dev Base`
*   **Softr (Portail Client) :** URL de staging `https://test-studiocartia.softr.app`
*   **Tally (Formulaire) :** Formulaire de test `Brief Client (Test)`
*   **Make (Scénarios) :** Environnement de test Make activé avec webhooks de staging.
*   **Données de test :** Profils fictifs créés pour Clara (Direction), Thomas (Manager), 1 graphiste fictif, 1 client fictif ("Entreprise Alpha").

---

## 📋 Cas de test (Happy Path & Edge Cases)

*Convention : **OK** = Comportement conforme | **KO** = Dysfonctionnement constaté*

### Phase 1 : Capture des demandes clients (Tally ➔ Airtable)

| ID | Scénario de test | Données d'entrée | Résultat attendu | Résultat obtenu | Statut |
| :--- | :--- | :--- | :--- | :--- | :---: |
| **TEST-01-HP** | **Soumission valide de brief**<br>*(Happy Path)* | *Formulaire rempli :*<br>- Nom : "Entreprise Alpha"<br>- Email : `contact@alpha.com`<br>- Description : "Refonte site web"<br>- Budget estimé : 5000 €<br>- Date cible : 30/06/2026 | 1. Redirection vers la page merci Softr.<br>2. Création immédiate d'un enregistrement dans Airtable (Base `Projets`, Statut "Prospect").<br>3. Envoi d'une notification sur le canal Slack `#briefs-alert`. | A remplir lors du test | `[ ] OK / KO` |
| **TEST-01-EC** | **Soumission incomplète**<br>*(Edge Case)* | *Formulaire avec :*<br>- Nom : vide<br>- Email : `invalid-email`<br>- Description : "Test" | 1. Blocage de la soumission par Tally.<br>2. Affichage d'un message d'erreur rouge sous les champs concernés.<br>3. Aucun enregistrement créé dans Airtable. | A remplir lors du test | `[ ] OK / KO` |

### Phase 2 : Pilotage & Rentabilité (Airtable Script & Formules)

| ID | Scénario de test | Données d'entrée | Résultat attendu | Résultat obtenu | Statut |
| :--- | :--- | :--- | :--- | :--- | :---: |
| **TEST-02-HP** | **Calcul automatique de marge**<br>*(Happy Path)* | - Projet avec budget de 10 000 €.<br>- Collaborateur saisit 10 heures sur Airtable.<br>- TJM du collaborateur configuré à 400 €. | 1. Le coût réel calculé passe à 4 000 € (10h × 400 €).<br>2. La marge brute calculée affiche 6 000 €.<br>3. Le pourcentage d'avancement du budget affiche 40%. | A remplir lors du test | `[ ] OK / KO` |
| **TEST-02-EC** | **Dépassement de budget**<br>*(Edge Case)* | - Projet avec budget de 2 000 €.<br>- Collaborateur saisit 10 heures.<br>- TJM à 300 € (Total coût = 3 000 €). | 1. La marge brute affiche `-1 000 €` en rouge (format conditionnel Airtable).<br>2. Le pourcentage d'avancement affiche `150%`.<br>3. Une alerte automatique "Budget dépassé" s'active. | A remplir lors du test | `[ ] OK / KO` |

### Phase 3 : Priorisation des tâches (Airtable Formula)

| ID | Scénario de test | Données d'entrée | Résultat attendu | Résultat obtenu | Statut |
| :--- | :--- | :--- | :--- | :--- | :---: |
| **TEST-03-HP** | **Priorisation dynamique**<br>*(Happy Path)* | - Tâche A : Urgence élevée (Échéance à J+1), Importance haute.<br>- Tâche B : Urgence basse (Échéance à J+15), Importance basse. | 1. Le score de la tâche A est calculé à 9/10.<br>2. Le score de la tâche B est calculé à 2/10.<br>3. Sur l'interface Thomas, la tâche A apparaît automatiquement en tête de liste. | A remplir lors du test | `[ ] OK / KO` |

### Phase 4 : Automatisation de la Facturation (Make ➔ PDF)

| ID | Scénario de test | Données d'entrée | Résultat attendu | Résultat obtenu | Statut |
| :--- | :--- | :--- | :--- | :--- | :---: |
| **TEST-04-HP** | **Génération de facture**<br>*(Happy Path)* | - Statut du projet "Site Alpha" passé de "En cours" à "Livré" par Thomas dans Airtable. | 1. Déclenchement du scénario Make sous 5 min.<br>2. Génération d'une facture PDF au nom de "Entreprise Alpha" (calcul TVA 20% correct).<br>3. Fichier PDF stocké dans le champ attachement Airtable.<br>4. Email automatique avec PDF joint envoyé au client et en copie à Sophie. | A remplir lors du test | `[ ] OK / KO` |
| **TEST-04-EC** | **Livraison sans données de facturation**<br>*(Edge Case)* | - Statut passé à "Livré" mais l'adresse du client ou son SIRET est manquant dans Airtable. | 1. Le scénario Make s'arrête proprement (gestion des erreurs).<br>2. Une tâche d'erreur "Facture bloquée - Infos manquantes" est automatiquement assignée à Sophie dans Airtable.<br>3. Aucun email erroné n'est envoyé au client. | A remplir lors du test | `[ ] OK / KO` |

### Phase 5 : Portail Client (Softr)

| ID | Scénario de test | Données d'entrée | Résultat attendu | Résultat obtenu | Statut |
| :--- | :--- | :--- | :--- | :--- | :---: |
| **TEST-05-HP** | **Filtrage des données clients**<br>*(Happy Path)* | - Connexion au portail Softr avec les identifiants du client "Entreprise Alpha". | 1. Le portail affiche uniquement les projets et tâches liés à "Entreprise Alpha".<br>2. Impossible de voir les projets de "Client B" ou "Client C" (étanchéité parfaite de la donnée).<br>3. Toutes les listes sont en lecture seule (aucun bouton "Modifier" visible). | A remplir lors du test | `[ ] OK / KO` |
| **TEST-05-EC** | **Accès non authentifié**<br>*(Edge Case)* | - Tentative d'accès direct à l'URL `https://test-studiocartia.softr.app/projects-dashboard` sans connexion. | 1. Redirection automatique vers la page de login de Softr.<br>2. Message d'erreur d'accès non autorisé affiché.<br>3. Aucune donnée d'Airtable n'est chargée ou visible dans le DOM. | A remplir lors du test | `[ ] OK / KO` |

---

## 🏁 Critères d'acceptation globaux
- [ ] **100% des cas Happy Paths** sont validés (Statut = OK).
- [ ] **Aucun bug bloquant** (arrêt scénario Make sans alerte, fuite de données d'un client à un autre) n'est actif.
- [ ] L'interface Thomas est jugée ergonomique et validée par le référent métier.

---

## ✒️ Signatures et Décision

- [ ] **Accepté sans réserve :** La solution est conforme au périmètre et déployable en production.
- [ ] **Accepté avec réserves :** La solution est déployable mais nécessite des ajustements mineurs consignés ci-dessous.
- [ ] **Refusé :** La solution nécessite des corrections majeures avant mise en production.

**Commentaires / Réserves :**
*   __________________________________________________________________________________________
*   __________________________________________________________________________________________

**Signature Client (Clara) :** \_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_ **Date :** \_\_\_\_\_\_\_\_\_\_\_  
**Signature Prestataire (Stéphanie) :** \_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_ **Date :** \_\_\_\_\_\_\_\_\_\_\_  
