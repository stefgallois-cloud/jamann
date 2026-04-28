# Compétence : Livrables projet

Produire les documents professionnels qui accompagnent chaque projet livré.

## Documents disponibles

| Document | Usage |
|---|---|
| Note de cadrage | Lancer un projet — aligner client et prestataire |
| Cahier des charges fonctionnel | Détailler les besoins et exigences |
| Cahier de recette | Valider que le livrable fonctionne comme attendu |
| Schéma BPMN / flux de processus | Visualiser un processus métier |
| Documentation technique | Documenter un scénario Make/n8n ou une app |
| Guide utilisateur | Expliquer comment utiliser le livrable |
| Rapport de livraison | Clôturer et remettre officiellement un projet |

---

## Templates

### Note de cadrage

```
# Note de cadrage — [Nom du projet]

**Client :** [Nom]
**Prestataire :** Clockwork Ops — Stéphanie
**Date :** [JJ/MM/AAAA]
**Version :** 1.0

## Contexte et problématique
[Situation actuelle du client, pourquoi ce projet]

## Objectifs
- Objectif principal :
- Objectifs secondaires :

## Périmètre
**Inclus :**
-

**Exclus :**
-

## Livrables attendus
| # | Livrable | Description | Délai |
|---|---|---|---|
| 1 | | | |

## Parties prenantes
| Rôle | Nom | Responsabilité |
|---|---|---|
| Client | | Validation et recette |
| Prestataire | Stéphanie | Réalisation |

## Jalons et délais
| Jalon | Date |
|---|---|
| Kick-off | |
| Livraison | |
| Recette | |

## Risques identifiés
| Risque | Probabilité | Impact | Mitigation |
|---|---|---|---|
| | | | |

## Conditions de succès
-

---
*Document validé par les deux parties avant démarrage.*
```

---

### Cahier des charges fonctionnel

```
# Cahier des charges — [Nom du projet]

**Client :** [Nom]
**Date :** [JJ/MM/AAAA]

## 1. Présentation du projet
[Contexte, objectifs, résumé]

## 2. Exigences fonctionnelles
| ID | Fonctionnalité | Description | Priorité |
|---|---|---|---|
| F01 | | | Haute |

## 3. Exigences non fonctionnelles
- Performance :
- Sécurité :
- Accessibilité :
- Compatibilité :

## 4. Architecture technique
**Outils utilisés :**
**Flux de données :**
**Intégrations :**

## 5. Contraintes
-

## 6. Critères d'acceptation
-
```

---

### Cahier de recette

```
# Cahier de recette — [Nom du projet]

**Client :** [Nom]
**Prestataire :** Clockwork Ops
**Date de recette :** [JJ/MM/AAAA]

## Périmètre des tests
[Ce qui est testé, ce qui ne l'est pas]

## Environnement de test
- URL / accès :
- Données de test :
- Outils de test :

## Cas de test

| ID | Scénario | Données d'entrée | Résultat attendu | Résultat obtenu | Statut |
|---|---|---|---|---|---|
| T01 | | | | | ✅ / ❌ |

## Critères d'acceptation globaux
- [ ] Tous les cas de test critiques sont passés
- [ ] Aucun bug bloquant en suspens
- [ ] Le client a validé l'interface

## Résultat de la recette
- [ ] Accepté sans réserve
- [ ] Accepté avec réserves (voir liste)
- [ ] Refusé (voir motifs)

**Signature client :** ___________________   **Date :** ___________
```

---

### Schéma BPMN / Flux de processus (format Mermaid)

```mermaid
flowchart TD
    A([Début]) --> B[Étape 1]
    B --> C{Condition ?}
    C -- Oui --> D[Étape 2a]
    C -- Non --> E[Étape 2b]
    D --> F([Fin])
    E --> F
```
*Remplacer les étapes selon le processus documenté.*
*Ce format est rendu visuellement dans Notion, GitHub, et la plupart des outils modernes.*

---

### Documentation technique — Scénario Make/n8n

```
# Documentation technique — [Nom du scénario]

**Outil :** Make / n8n
**Client :** [Nom]
**Date :** [JJ/MM/AAAA]

## Résumé
[Ce que fait ce scénario en 1-2 phrases]

## Déclencheur
[Comment le scénario se lance : webhook, heure fixe, action manuelle…]

## Flux
DÉCLENCHEUR → MODULE 1 → [CONDITION] → MODULE 2 → RÉSULTAT

## Modules utilisés
| # | Module | Action | Notes |
|---|---|---|---|
| 1 | | | |

## Points d'attention
-

## En cas de panne
[Comment diagnostiquer et relancer]
```

---

### Guide utilisateur

```
# Guide utilisateur — [Nom du livrable]

**Pour :** [Nom du client / rôle]
**Date :** [JJ/MM/AAAA]

## À quoi ça sert
[En 2 lignes, ce que fait le livrable]

## Comment l'utiliser

### Étape 1 — [Titre]
[Description + capture d'écran si possible]

### Étape 2 — [Titre]
[…]

## Questions fréquentes
**Q : …**
R : …

## Contact support
Stéphanie — Clockwork Ops
```

---

### Rapport de livraison

```
# Rapport de livraison — [Nom du projet]

**Client :** [Nom]
**Date de livraison :** [JJ/MM/AAAA]

## Ce qui est livré
| Livrable | Statut | Lien / Accès |
|---|---|---|
| | ✅ Livré | |

## Ce qui n'est pas inclus dans cette livraison
-

## Accès et credentials
[À compléter avec les accès remis au client]

## Prochaines étapes recommandées
-

## Notes
-

---
*Livraison effectuée par Clockwork Ops — Stéphanie*
```
