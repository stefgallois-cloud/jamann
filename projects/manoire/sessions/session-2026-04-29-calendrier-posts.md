# Résumé de session

Date : 2026-04-29
Focus : Automatisation calendrier posts Facebook / Instagram — Le Manoïre

---

## Ce qui a été accompli

### Airtable
- Connexion MCP Airtable établie (via Claude.ai extensions)
- Table **Calendrier Posts** créée dans la base Le Manoïre (`app6TseIO7Sx4fJqv`)
  - Table ID : `tblqLY0hmMINANI9s`
  - 10 champs : Nom, Date, Heure, Plateforme, Format, Légende, Hashtags, Visuel, Statut, Email envoyé
  - Post de test inséré (statut "Approuvé", date du jour)

### Make — Scénario "Rappel Post Manoïre — Jour J" (ID : 5469302)
- Construit depuis zéro sur le scénario "Formulaire Post Manoïre" existant
- **Fréquence :** toutes les 15 minutes
- **Architecture :**
  ```
  Airtable Search (filtre combiné)
    ├─ Approuvé + date=aujourd'hui + Email envoyé=false
    │     → Email au client (texte prêt à copier + lien Airtable pour refuser)
    │     → Airtable : Email envoyé = true (évite les doublons)
    │
    └─ Refusé
          → HTTP → Claude Haiku API (génère un post de remplacement)
          → JSON Parse (extrait le texte généré)
          → Airtable : crée nouveau record (Approuvé, Email envoyé=false)
          → Airtable : archive l'ancien record
          → Email : confirmation avec le nouveau post
  ```
- **Connexions utilisées :**
  - Airtable OAuth `le mano` (ID: 6629661)
  - SMTP Infomaniak `contact@lemanoire-jaman.ch` (ID: 6599141)
  - Claude API (HTTP, Haiku 4.5) — clé intégrée directement

### Compétence créée
- `.claude/skills/calendrier-reseaux-sociaux/SKILL.md` — documente toute l'infrastructure et les IDs

---

## Décisions prises

- **Validation manuelle** (client copie-colle lui-même) pour l'instant — plan Make gratuit ne permet pas la publication auto FB/Instagram sans 3e scénario actif
- **15 min** au lieu de daily — pour réagir quasi-immédiatement aux refus
- **Lien Airtable direct** dans l'email → client clique, change statut → Make réagit dans les 15 min
- **Claude Haiku** pour la génération des posts de remplacement (rapide, économique)
- **Email envoyé** (checkbox Airtable) pour éviter les doublons de rappel

---

## Points ouverts / Prochaines étapes

- [ ] **URGENT** : Ajouter "Refusé" et "Archivé" dans les options du champ **Statut** d'Airtable (Edit field → manuellement)
- [ ] Lancer **Run once** dans Make pour tester le flux complet
- [ ] Activer le scénario Make une fois le test validé
- [ ] **Rotation de la clé Anthropic** après les tests (console.anthropic.com → API Keys) — la clé a été partagée en session
- [ ] Remplacer le lien Airtable par un lien **Softr** quand l'interface client sera prête
- [ ] Générer un vrai calendrier de posts pour mai/juin 2026 via `agent-contenu`

---

## Mises à jour de mémoire
- Projet `project_manoire_calendrier_posts.md` ajouté à MEMORY.md
- README Manoïre mis à jour avec l'état technique
- Decisions log mis à jour (2 entrées 2026-04-29)
- Compétence `calendrier-reseaux-sociaux` disponible comme skill

---

## Références techniques rapides

| Ressource | Valeur |
|---|---|
| Base Airtable | `app6TseIO7Sx4fJqv` |
| Table Calendrier Posts | `tblqLY0hmMINANI9s` |
| Vue Grid | `viwBxDS2jfR7d5G8e` |
| Scénario Make | ID `5469302` |
| Email test | stef.gallois@gmail.com |
| Modèle Claude utilisé | claude-haiku-4-5-20251001 |
