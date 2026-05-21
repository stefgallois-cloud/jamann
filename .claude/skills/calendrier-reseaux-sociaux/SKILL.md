# Compétence : Calendrier réseaux sociaux automatisé

Pipeline pour créer et automatiser un calendrier de posts Facebook/Instagram avec validation manuelle client.

## Vue d'ensemble

```
Claude génère les posts → Airtable (Brouillon)
        ↓
Make (toutes les 15 min) détecte les posts "Approuvé" du jour
        → Email au client avec texte prêt à copier + lien Airtable
        → Client publie manuellement sur FB/Instagram
        → Si refus : client change statut → "Refusé" dans Airtable
        → Make détecte → Claude génère remplacement → nouvel email
```

---

## Infrastructure en place — Le Manoïre

### Airtable
- **Base :** Le Manoïre (`app6TseIO7Sx4fJqv`)
- **Table :** Calendrier des posts (`tbll7zhDjMgihWtly`)

| Champ | ID | Type |
|---|---|---|
| Nom du post | `fldcmApVs9JxlNlvD` | Texte (principal) |
| Date | `fldcArIlaPO3K3mJ9` | Date (YYYY-MM-DD) |
| Plateforme | `fldvzE0wvmHmT24xj` | Multi-select (Facebook / Instagram) |
| Texte Facebook | `fld8ZOxfnBdaJF9T7` | Texte long |
| Texte Instagram | `fldy7Wcn1CmNA4JeH` | Texte long |
| Hashtags | `fldxEUNEOGANV58Xx` | Texte |
| Visuel | `fldxXddEW0Tt0bLfB` | Texte |
| Validation | `fld7gmSXSdS64RzRR` | Single select (Brouillon / Approuvé / Refusé) |
| Email envoyé | `fld7rGkJkRUNWFA9h` | Checkbox |
| Statut | `fldkbAsFCzZcp7KdV` | Multi-select (workflow rédaction) |

### Make
- **Scénario :** Rappel Post Manoïre — Jour J (ID: `5469302`)
- **Fréquence :** Toutes les 15 minutes
- **Connexions :** Airtable OAuth `le mano` (ID: 6629661) · SMTP Infomaniak (ID: 6599141)
- **Claude API :** Sonnet 4.6 (`claude-sonnet-4-6`) via HTTP module

**Logique du scénario :**
```
Airtable Search
  ├─ Approuvé + date=aujourd'hui + Email envoyé=false
  │     → Email client avec texte + lien Airtable
  │     → Airtable : Email envoyé = true
  │
  └─ Refusé
        → Claude API : génère nouveau post
        → Airtable : crée nouveau record (Approuvé, Email envoyé=false)
        → Airtable : archive ancien record
        → Email : confirmation avec nouveau texte
```

---

## Workflow de création de contenu

### Format de sortie pour Airtable (agent-contenu)

Produire un tableau avec ces colonnes exactes pour import ou saisie :

| Nom | Date | Heure | Plateforme | Format | Légende | Hashtags | Visuel | Statut |
|---|---|---|---|---|---|---|---|---|
| Post ouverture | 2026-05-15 | 10:00 | Facebook, Instagram | Photo | [texte] | [tags] | [description visuel] | Brouillon |

### Rythme recommandé — Le Manoïre
- 4–5 posts/semaine (2 Facebook, 3 Instagram)
- Créneaux : 9h–11h ou 17h–19h
- Mix : 40% ambiance · 30% menu · 20% équipe · 10% événements

### Ton Le Manoïre
Chaleureux, authentique, montagne et terroir. Pas formel.
Toujours inclure : www.lemanoire-jaman.ch

---

## Évolutions prévues
- **Softr** : interface client pour valider/refuser sans accès Airtable direct
- **Publication auto** : FB/Instagram API (nécessite upgrade Make + connexions réseaux)
- **Génération IA complète** : Claude génère le calendrier mensuel sur brief

---

## Commandes utiles

```
# Générer des posts
"Génère 10 posts Manoïre pour mai 2026 — format tableau Airtable"

# Architecture technique
"Explique le scénario Make calendrier réseaux sociaux Manoïre"

# Débogage
"Le scénario Make ne détecte pas le post Refusé — aide-moi à déboguer"
```
