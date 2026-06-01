# SOP — Surveiller mes scénarios Make

> Objectif : ne plus **jamais** découvrir qu'un scénario client est en panne 3 semaines après. Être prévenue tout de suite, et savoir quoi faire.

*Créée le 2026-05-31 suite à l'incident du scénario "le mano bienvenue" — il plantait depuis le 23 mai (quota Airtable épuisé), sans aucune alerte, et le client ne recevait plus ses mails de bienvenue.*

---

## 1. Prévention — éviter que ça arrive

| Règle | Pourquoi |
|---|---|
| **Fréquence raisonnable** : éviter les scénarios programmés toutes les 15 min quand 1×/jour suffit | Un scénario toutes les 15 min = ~96 appels API/jour. C'est ce qui a vidé le quota Airtable en ~10 jours. |
| **Bases clients sur un workspace Airtable dédié** avec du quota | Ne pas mélanger prod client + cours + tests sur le même espace |
| **Connaître la limite** : Airtable gratuit = **1000 appels API / mois / workspace** | Visible dans Réglages du workspace → onglet **Usage** |

## 2. Alertes — être prévenue immédiatement

- **Notifications Make natives** : Make → **Profil → Notifications** → activer l'email d'alerte sur échec de scénario.
- **Gestionnaire d'erreur** sur les modules critiques (Airtable, HTTP) → envoie un email d'alerte ciblé dès qu'un module plante, avec la raison.

## 3. Routine de vérification (1×/semaine)

1. Make → liste des scénarios → regarder la colonne **erreurs**. Un nombre qui grimpe = investiguer.
2. Airtable → Réglages workspace client → **Usage** → vérifier qu'on est loin des 1000 appels.

## 4. Quand une alerte tombe — quoi faire

1. **Ouvrir l'historique d'exécution** du scénario dans Make → identifier le module en erreur.
2. **Diagnostiquer selon l'erreur :**

| Erreur | Cause | Solution |
|---|---|---|
| `429 RateLimitError` (Airtable) | Quota mensuel épuisé | Déplacer la base vers un workspace avec du quota · OU attendre le reset mensuel · OU passer en plan payant |
| `401 / 403` | Connexion expirée ou base déplacée | Reconnecter le compte dans Make — voir note ci-dessous |
| Erreur de mapping / champ | Un champ a changé de nom ou de structure | Rouvrir le module et re-mapper |

> **⚠️ Déplacer une base Airtable entre workspaces casse les connexions Make**
> Quand tu déplaces une base d'un workspace à un autre, l'autorisation OAuth Make ne couvre plus la base dans son nouvel emplacement → erreur 403 immédiate.
> **Solution : toujours utiliser une connexion par Personal Access Token (PAT)**, pas OAuth.
> Le PAT est lié à la base directement, pas au workspace — il survit aux déplacements.
> Procédure : Airtable → Compte → Developer Hub → Créer un token (scope : data.records:write + schema.bases:read, accès explicite à la base) → dans Make, choisir "Airtable token or key" au lieu de "Sign in with Airtable".

3. **Une fois corrigé** : rejouer les exécutions échouées (bouton *replay* dans l'historique, si dans la fenêtre) — sinon réimporter depuis la source (ex : export Tally).

## Références techniques

| Ressource | Valeur |
|---|---|
| Scénario bienvenue | Make ID `5250355` |
| Base Le Manoïre | `app6TseIO7Sx4fJqv` (workspace "Espace de travail pro") |
| Table Abonnés | `tbljlFKOq5V4MuKVC` |
| Source de vérité inscriptions | Tally — formulaire `0QJkG0` |
| Webhook Tally | hook Make `2834112` |
