# Guide d'Utilisation : Outils de Développement & d'IA ⚙️

Ce guide regroupe les compétences destinées à l'optimisation de vos prompts, au développement d'applications et à la création automatisée de nouvelles compétences.

---

## ✍️ 1. Prompt Engineering & Optimisation (`prompt-engineering` / `prompt-optimizer`)

* **À quoi ça sert ?** 
  Concevoir et améliorer des prompts pour d'autres agents IA (par exemple, pour vos automatisations sur **Make** ou **n8n**). Elle m'aide à formuler des instructions claires, à structurer les réponses en JSON propre, à réduire les hallucinations et à concevoir des messages marketing efficaces.
* **Quand l'utiliser ?**
  Dès que vous créez une automatisation ou que vous voulez écrire un prompt système pour un nouvel agent.
* **Comment la déclencher ? (Phrases types)** :
  * *« Aide-moi à écrire un prompt système pour un agent qui trie mes emails clients. »*
  * *« Optimise ce prompt pour qu'il me sorte uniquement du JSON propre sans texte autour. »*
  * *« Écris-moi un prompt pour générer des posts LinkedIn à partir de cet article. »*

---

## 🛠️ 2. Créateur de Compétences (`workflow-skill-creator` / `skill-creator`)

* **À quoi ça sert ?** 
  Automatiser la création de nouvelles compétences. Si nous venons de réaliser un travail complexe (comme configurer un serveur d'une manière bien précise), cette skill me permet de packager toute cette méthode dans un fichier `SKILL.md` réutilisable.
* **Quand l'utiliser ?**
  À la fin d'un travail que vous voulez pouvoir répéter facilement à l'avenir.
* **Comment la déclencher ? (Phrases types)** :
  * *« Enregistre notre méthode de travail d'aujourd'hui sous forme de skill réutilisable. »*
  * *« Crée-moi une skill personnalisée pour [tâche spécifique]. »*

---

## 📱 3. Outils Android CLI (`android-cli`)

* **À quoi ça sert ?** 
  Piloter l'environnement de développement Android depuis mon terminal (lancement de projets, compilation d'APK, déploiement sur émulateur ou téléphone physique connecté).
* **Quand l'utiliser ?**
  Uniquement si vous travaillez sur une application mobile Android et que vous voulez compiler ou tester le projet.
* **Comment la déclencher ? (Phrases types)** :
  * *« Compile et lance l'application Android sur mon appareil connecté. »*
  * *« Génère l'APK de debug de mon application. »*
  * *« Lance un diagnostic de mon environnement de développement Android. »*

---

## 🐍 4. Gestionnaire de packages Python rapide (`uv`)

* **À quoi ça sert ?** 
  S'assurer que l'outil ultra-rapide `uv` (le gestionnaire de paquets Python d'Astral) est installé et configuré sur votre système. C'est un prérequis technique pour faire tourner certaines de mes autres compétences en Python.
* **Quand l'utiliser ?**
  C'est un outil technique d'arrière-plan. Vous n'avez généralement pas besoin de l'appeler vous-même.
* **Comment la déclencher ? (Phrases types)** :
  * *« Est-ce que `uv` est bien installé sur mon système ? »*
  * *« Installe le package Python `pandas` en utilisant `uv` pour aller plus vite. »*

---

## 🌐 5. Test & Construction Web (`webapp-testing` / `web-artifacts-builder`)

* **À quoi ça sert ?** 
  Concevoir, tester et valider des applications web interactives directement dans mon interface. C'est ce qui me permet d'écrire des tests automatisés de bout en bout pour vos pages web ou de générer des aperçus interactifs de qualité.
* **Quand l'utiliser ?**
  Dès que vous développez un site ou une application web (comme la refonte de la planning-app) et que vous voulez vérifier que tout fonctionne sans bugs.
* **Comment la déclencher ? (Phrases types)** :
  * *« Écris un test automatisé pour vérifier que le bouton d'ajout de shift fonctionne bien. »*
  * *« Lance les tests de l'application web pour t'assurer qu'il n'y a pas d'erreur. »*
