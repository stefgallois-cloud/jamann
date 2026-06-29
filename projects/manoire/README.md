# Le Manoïre — Restaurant d'alpage, Montreux

Restaurant d'alpage à Montreux — client prioritaire de Clockwork Ops.

**Statut :** Actif — ouverture 9 juillet 2026 (repoussée depuis fin juin — travaux terminés, équipe arrive)
**Deadline absolue :** 9 juillet 2026

## Déjà livré
- [x] Landing page
- [x] Automatisation d'inscription (Airtable + Make)
- [x] Refonte du site en multi-pages : menu de navigation + Accueil (hero photo) · Le Manoïre · Carte · Galerie · Infos pratiques · Réserver
- [x] Page Conditions en direct (météo Col de Jaman) + affichage tablette (`display.html`)
- [x] Corrections identité visuelle (31/05) : nav brand (logo + nom côte à côte), doublon supprimé, hero photo recentrée
- [x] **sitev2 cinématique** (juin 2026) : site one-page scroll-scrub avec hero vidéo IA drone, sections éditoriales, stats animées, responsive mobile — dossier `site web/sitev2/starter/`

### Site web — structure
Dossier `site web/` · fichiers partagés `styles.css` (charte + composants) et `nav.js` (menu + footer, à éditer pour modifier les onglets).
À compléter par le client : photo hero définitive, vraie carte (menu), horaires, activation du formulaire de réservation.

## À livrer avant ouverture (9 juillet 2026)

| Livrable | Statut |
|---|---|
| **sitev2 — hero vidéo IA** | Frames à refaire — Stef génère nouvelle vidéo Seedance 2, puis extraction ffmpeg |
| **sitev2 — infos Micka** | Tél, email, photo Anouck, URLs Instagram/Facebook à compléter |
| **sitev2 — déploiement** | Push GitHub + config domaine lemanoire-jaman.ch |
| Automatisation posts réseaux sociaux | En cours — scénario Make opérationnel, test final en attente |
| App planning équipe avec interface UI | À faire |
| Automatisation 8 newsletters | Livré (newsletters enrichies) |

## Automatisation réseaux sociaux — état technique

**Airtable** (base `app6TseIO7Sx4fJqv`) :

- Table `Calendrier Posts` (`tblqLY0hmMINANI9s`) créée avec 10 champs
- ⚠️ Ajouter manuellement "Refusé" et "Archivé" dans le champ Statut

**Make** (scénario ID `5469302`) :

- Tourne toutes les 15 min
- Détecte posts "Approuvé" du jour → email client avec texte + lien Airtable
- Détecte posts "Refusé" → Claude Haiku génère remplacement → nouveau post Airtable → email
- ⚠️ Activer le scénario une fois le test validé
- ⚠️ Clé Anthropic à rotation après les tests (console.anthropic.com)

## Notes
Client très actif avec beaucoup d'idées — anticiper de nouveaux projets au fil du temps.
