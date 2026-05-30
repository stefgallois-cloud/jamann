---
name: automatisation-builder
description: >
  Skill pour concevoir et construire des automatisations, agents IA et workflows no-code/low-code.
  Utilise cette skill quand Stef veut : créer un scénario Make ou n8n, construire un agent IA,
  automatiser un processus client, connecter des outils entre eux, créer un webhook, structurer
  un prompt d'agent, déléguer une tâche répétitive à un bot, concevoir une offre d'automatisation
  à vendre, ou expliquer une techno d'automatisation. Aussi pour : Zapier, Airtable automations,
  Notion workflows, scripts Python/JS simples pour automatiser.
---

# Automatisation Builder

## Contexte utilisateur
Stef vend des automatisations et agents IA à des clients B2B. Elle travaille sur Make,
et apprend les outils no-code/low-code. Elle veut comprendre le POURQUOI avant le COMMENT.

---

## Framework de conception : les 4 questions avant de coder

Avant tout scénario, répondre à :
1. **Quel déclencheur ?** (trigger) — qu'est-ce qui lance l'automatisation ?
2. **Quelle action ?** — qu'est-ce qui doit se passer en réponse ?
3. **Quelles données transitent ?** — ce qui entre, ce qui sort
4. **Qu'est-ce qui peut rater ?** — gestion d'erreurs dès le départ

---

## Outils & quand les utiliser

| Outil | Idéal pour | Complexité |
|-------|-----------|------------|
| Make (ex-Integromat) | Workflows visuels complexes, API, webhooks | Moyen |
| n8n | Open-source, auto-hébergé, plus technique | Moyen-élevé |
| Zapier | Connexions simples entre apps connues | Facile |
| Airtable Automations | Flux internes à une base Airtable | Facile |
| Notion Automations | Workflows dans Notion | Facile |
| Python/JS | Logique custom, traitement de données | Technique |

**Recommandation pour vendre des services :** Make est le meilleur choix — visuel, puissant, 
et les clients peuvent voir/auditer ce qu'on construit.

---

## Patterns d'automatisation courants

### Lead capture → CRM
```
Formulaire (Tally/Typeform) → Make → Airtable/Notion + Email de bienvenue
```

### Traitement de documents
```
Email avec pièce jointe → Extract PDF → Claude AI → Structurer en JSON → Ajouter à base
```

### Notification intelligente
```
Trigger (nouveau client, paiement, deadline) → Condition → Slack/Email/SMS
```

### Agent IA simple
```
Input utilisateur → Prompt Claude → Traitement de la réponse → Action (email, fiche, doc)
```

### Rapport automatique
```
Cron job (hebdo) → Requête données → Synthèse par IA → Envoi rapport formaté
```

---

## Construire un agent IA : les composantes

Un agent = **perception + raisonnement + action**

### Structure d'un bon prompt système d'agent
```
Tu es [rôle précis].
Ton objectif : [mission claire].
Tu as accès à : [outils/données disponibles].
Tu dois toujours : [règles de comportement].
Format de réponse : [structure attendue].
```

### Types d'agents à vendre
1. **Agent qualification leads** — analyse les prospects entrants, score, priorise
2. **Agent SAV** — répond aux questions fréquentes, escalade si besoin
3. **Agent contenu** — génère des posts, newsletters, résumés sur demande
4. **Agent reporting** — agrège les données, produit un résumé hebdo
5. **Agent onboarding** — guide un nouveau client/collaborateur étape par étape

---

## Vendre une automatisation : structurer l'offre

### Audit avant proposition
1. Identifier les tâches répétitives du client (>30 min/semaine = candidat idéal)
2. Estimer le temps gagné
3. Calculer la valeur : temps * TJM client ou coût d'un employé

### Structure d'une proposition
- **Problème** : "Tu passes X heures par semaine à..."
- **Solution** : "Je vais automatiser ça pour que ça se fasse tout seul"
- **Livrables** : scénario Make + documentation + 1 mois de support
- **Prix** : forfait (pas TJM) — plus simple à vendre
- **ROI** : "Amorti en X semaines"

### Pricing indicatif (marché 2025)
- Automatisation simple (1-2 apps) : 300–800 €
- Workflow complexe (3-5 apps + IA) : 800–2500 €
- Agent IA sur mesure : 1500–5000 €
- Maintenance mensuelle : 10-20% du prix initial

---

## Gestion d'erreurs : indispensable

Toujours prévoir :
- **Retry automatique** sur les erreurs HTTP 429/503
- **Notification d'erreur** vers email ou Slack
- **Fallback** : que se passe-t-il si l'IA ne répond pas ?
- **Log des runs** : Airtable ou Google Sheets pour auditer

---

## Make : raccourcis mentaux

- **Module = une action** (envoyer email, créer fiche, appeler API)
- **Scénario = séquence de modules** déclenchée par un trigger
- **Webhook = porte d'entrée** — Make écoute, quelque chose arrive, ça démarre
- **Datastore = mini base de données** dans Make
- **Filtre = condition** entre deux modules
- **Router = bifurcation** selon la valeur d'un champ
