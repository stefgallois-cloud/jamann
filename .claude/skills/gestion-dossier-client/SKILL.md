# Compétence : Gestion de dossier client

Utilisée pour piloter un projet client de bout en bout — du brief à la livraison.

## Quand l'utiliser
- Nouveau projet client à cadrer
- Faire le point sur l'avancement d'un projet en cours
- Préparer une livraison ou un compte-rendu client
- Débloquer un projet qui stagne

## Workflow — Brief → Livraison

### 1. Cadrage du projet
Questions à poser (ou à clarifier avec le client) :
- Quel est l'objectif final ?
- Quel est le livrable exact attendu ?
- Quelle est la deadline ?
- Quels outils / accès sont nécessaires ?
- Y a-t-il des contraintes ou dépendances ?

### 2. Structuration
- Créer ou mettre à jour le README.md dans `projects/[nom-client]/`
- Lister tous les livrables avec leur statut (À faire / En cours / Livré)
- Identifier le livrable le plus urgent ou bloquant

### 3. Suivi d'avancement
Lors d'un point d'avancement, répondre à :
- Qu'est-ce qui est fait depuis la dernière fois ?
- Qu'est-ce qui est en cours ?
- Qu'est-ce qui est bloqué — et pourquoi ?
- Quelle est la prochaine action concrète ?

### 4. Préparation d'une livraison
- Vérifier que le livrable correspond au brief initial
- Rédiger un résumé court pour le client (ce qui a été fait, comment l'utiliser)
- Mettre à jour le README.md du projet (statut → Livré)
- Consigner dans `decisions/log.md` si une décision importante a été prise

### 5. Clôture de session
Utiliser `templates/session-summary.md` pour noter ce qui a avancé.

## Client actuel — Le Manoïre
Voir `projects/manoire/README.md` pour le détail des livrables et la deadline.

## Commandes utiles
- "Fais le point sur le Manoïre" → génère un tableau d'avancement
- "Prépare un résumé de livraison pour [livrable]" → rédige le message client
- "Quel est le prochain truc urgent ?" → identifie la priorité immédiate
