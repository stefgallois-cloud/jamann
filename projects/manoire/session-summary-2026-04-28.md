# Résumé de session - Le Manoïre (Automatisation Posts)

Date : 28 avril 2026
Focus : Architecture et préparation Airtable pour le scénario Make des posts réseaux sociaux.

## Ce qui a été accompli
* Abandon de Notion : Nous avons décidé que Airtable sera la seule base de vérité.
* Création de la table `Calendrier des posts` dans la base Airtable "Le Manoïre" via l'API et import réussi des 11 posts du CSV (`calendrier-posts-notion.csv`).
* Adaptation de la structure de la table pour les réseaux sociaux : la colonne `Texte suggéré` a été renommée en `Texte Facebook` et une nouvelle colonne `Texte Instagram` a été créée pour différencier les formats de publication.

## Décisions prises
* Les textes Facebook et Instagram seront séparés pour respecter les codes de chaque plateforme (liens cliquables sur FB, pas sur Insta, etc.). (Consigné dans `decisions/log.md`).
* L'idée initiale de créer un processus d'approbation complexe par email a été écartée au profit d'une gestion directe sur Airtable.

## Points ouverts / Prochaines étapes
* **Choix de l'automatisation de rédaction** : Décider si on utilise Make (via Claude) ou Airtable Scripts/IA pour générer automatiquement la version Instagram à partir du texte Facebook.
* **Connexion Make** : Créer le scénario final sur Make (Déclencheur Airtable -> Routeur -> Publication Facebook Pages / Instagram Business).

## Mises à jour de mémoire
* Préférences apprises : Privilégier des architectures simples (suppression d'outils intermédiaires comme Notion quand ce n'est pas nécessaire).
* Décisions à consigner : Mises à jour effectuées dans le `log.md`.
