# Prompt origine — agent-idees / skill idees-ia-educatif

**Date de création :** 2026-05-30
**Session :** création complète agent + skill + base Notion

---

## Brief initial (voix de Stéphanie)

> "J'aimerais créer un agent qui m'aide à organiser ce que j'ai dans la tête.
> Pour l'atelier des automates, j'ai plein de storytelling dans la tête.
> J'aimerais les déposer dans un endroit, et si jamais il peut les transformer
> en contenu informatif pour mes amis, c'est parfait."

---

## Clarifications apportées en session

- **Public cible :** amis et proches de Stéphanie (débutants complets en IA, pas son audience pro)
- **Objectif :** éducatif, généreux, JAMAIS de vente — Stef partage ce qu'elle sait
- **Profil audience :** utilisent ChatGPT comme un tchat, croient à la mémoire permanente, peur que l'IA les rende moins intelligents
- **Sources acceptées :** brain dump vocal/texte · lien YouTube · lien article
- **Instagram Reels :** abandonné (bloqué par Instagram API) → gardé YouTube + articles
- **Longueur posts IG/FB :** 300-500 mots (doublé après retour "trop court")

---

## Décisions de conception

- Hooks : bibliothèque de 7 types × 4 exemples sur sujets IA VARIÉS (pas que mémoire ChatGPT)
- Extraction : toujours présenter TOUS les angles avant de demander le format (1 seule question globale)
- Notion : base "Banque d'idées — IA pour tous" (ID: `44ee91af-9952-43b4-8afa-d6f4030947b7`)
- Workflow prompt : passé par `/prompt-optimizer` avant création du fichier final

---

## Fichiers produits

| Fichier | Rôle |
|---|---|
| `.claude/agents/agent-idees.md` | Prompt système de l'agent |
| `.claude/skills/idees-ia-educatif/SKILL.md` | Skill réutilisable (bibliothèque hooks, flux, templates) |
| Notion DB `44ee91af-...` | Banque d'idées persistante |
