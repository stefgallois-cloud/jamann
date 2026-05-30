# Cartographie des Processus Métiers (BPMN) : Studio CartIA

Ce document présente la modélisation visuelle des 3 flux opérationnels majeurs de l'**Internal Ops OS** de Studio CartIA, sous forme de schémas Mermaid. Ces diagrammes décrivent les actions, les acteurs impliqués et la logique d'automatisation.

---

## 🗺️ Flux A : Capture, Qualification et Lancement de Projet

Ce processus décrit comment une demande client (brief) est capturée, qualifiée par Thomas (DA), puis convertie automatiquement en projet avec ses tâches associées.

```mermaid
flowchart TD
    %% Définition des acteurs et des étapes
    A([Début : Client souhaite lancer un projet]) --> B[Client remplit le formulaire public Tally]
    
    subgraph Capture & Automatisation (Make & Airtable)
        B --> C{Formulaire valide ?}
        C -- Non --> D[Alerte de saisie Tally & blocage]
        D --> B
        C -- Oui --> E[Création du Projet dans Airtable <br><i>Statut : Prospect</i>]
        E --> F[Notification automatique Slack sur <br>#briefs-alert avec lien Airtable]
    end
    
    subgraph Qualification & Dispatch (Thomas - DA)
        F --> G[Thomas examine le brief dans son interface]
        G --> H{Brief complet et valide ?}
        
        H -- Non --> I[Thomas marque le statut : Annulé / A repréciser]
        I --> J[Make envoie un email automatique au client <br>pour demander des clarifications]
        J --> K([Fin de session])
        
        H -- Oui --> L[Thomas marque le statut : En cours <br>et assigne les collaborateurs]
        L --> M[Airtable génère automatiquement <br>les tâches types associées au projet]
    end
    
    M --> N([Fin : Projet configuré et prêt en production])
    
    %% Styles visuels
    style A fill:#e8f4ec,stroke:#50946e,stroke-width:2px
    style N fill:#e8f4ec,stroke:#50946e,stroke-width:2px
    style C fill:#fff2cc,stroke:#cb9434,stroke-width:2px
    style H fill:#fff2cc,stroke:#cb9434,stroke-width:2px
    style F fill:#e5f2fc,stroke:#387dc9,stroke-width:2px
```

---

## ⚙️ Flux B : Exécution, Suivi de Production et Priorisation

Ce processus décrit la vie quotidienne d'un projet "En cours". Il montre comment les créatifs exécutent les tâches et comment les données de rentabilité sont recalculées en temps réel.

```mermaid
flowchart TD
    A([Début : Projet marqué En cours]) --> B[Collaborateur se connecte à son portail Softr]
    
    subgraph Production & Saisie des Temps (Collaborateurs)
        B --> C[Visualisation des tâches assignées <br><i>Filtrées automatiquement par son nom</i>]
        C --> D[Exécution du travail créatif]
        D --> E[Saisie des heures passées sur la tâche dans Softr]
        E --> F[Changement de statut de la tâche : Fait]
    end
    
    subgraph Calculs de Rentabilité (Airtable Script & Formules)
        F --> G[Airtable recalcule en temps réel : <br>1. Heures cumulées du projet <br>2. Coût réel = heures × TJM]
        G --> H[Formule Airtable recalcule la marge : <br>Marge = Budget initial - Coût réel]
        H --> I{Marge > 0 ?}
        I -- Oui --> J[Statut Rentabilité : Conforme 🟢]
        I -- Non --> K[Statut Rentabilité : Alerte Dépassement 🔴]
        K --> L[Notification Slack automatique à Clara]
    end
    
    subgraph Priorisation Dynamique (Moteur Airtable)
        F --> M[Formule de Priorisation Dynamique : <br><i>Score = Échéance × Importance du client</i>]
        M --> N[Mise à jour instantanée des listes de tâches <br>sur les interfaces Softr mobiles et bureaux]
    end
    
    J --> O([Fin : Tâches terminées])
    L --> O
    N --> O
    
    %% Styles visuels
    style A fill:#e8f4ec,stroke:#50946e,stroke-width:2px
    style O fill:#e8f4ec,stroke:#50946e,stroke-width:2px
    style I fill:#fff2cc,stroke:#cb9434,stroke-width:2px
```

---

## 💸 Flux C : Facturation Automatique, Clôture et Suivi Compta

Ce processus décrit l'enchaînement automatisé à la fin du projet, depuis la validation par Thomas jusqu'au suivi du paiement par Sophie.

```mermaid
flowchart TD
    A([Début : Toutes les tâches du projet sont à l'état Fait]) --> B[Thomas effectue la revue finale de production]
    
    subgraph Clôture de Projet (Thomas - DA)
        B --> C[Thomas change le statut du Projet dans Airtable <br>➔ <i>Livré</i>]
    end
    
    subgraph Automatisation Compta (Make Scenario)
        C --> D[Déclenchement instantané du scénario Make]
        D --> E[Make récupère les données compta du projet <br><i>Budget, coordonnées client, TVA 20%</i>]
        E --> F[Génération automatique de la facture au format PDF <br><i>Utilisation d'un template dynamique</i>]
        F --> G[Enregistrement de la facture PDF dans Airtable]
        G --> H[Envoi de la facture par email au client <br><i>Sophie et Clara en copie cachée (Bcc)</i>]
    end
    
    subgraph Suivi Financier (Sophie - Admin)
        H --> I[Sophie suit l'encaissement sur son interface de comptabilité]
        I --> J{Paiement reçu à l'échéance ?}
        J -- Oui --> K[Sophie marque la facture : Payée 🟢]
        K --> L[Mise à jour automatique du CA réel dans le Dashboard Clara]
        J -- Non --> M[Sophie marque la facture : En retard 🔴]
        M --> N[Relance automatique en un clic par email]
    end
    
    L --> O([Fin de projet validé et payé])
    N --> O
    
    %% Styles visuels
    style A fill:#e8f4ec,stroke:#50946e,stroke-width:2px
    style O fill:#e8f4ec,stroke:#50946e,stroke-width:2px
    style J fill:#fff2cc,stroke:#cb9434,stroke-width:2px
```
