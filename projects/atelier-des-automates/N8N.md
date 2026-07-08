# Workflow n8n — Leads Atelier des Automates

**Statut :** actif et en production (vérifié le 2026-07-08)
**Nom :** `Atelier des Automates - Leads (v1 sans IA)`
**ID :** `sk2XEkQ1OTNjUuPX`
**URL éditeur :** https://stefbystep.app.n8n.cloud/workflow/sk2XEkQ1OTNjUuPX
**Déclencheur :** webhook, appelé par le formulaire de `landing/index.html`

---

## Pourquoi n8n et pas Make

Le déclencheur webhook natif d'Airtable nécessite un forfait payant. Make fonctionnait mais demandait
un import de blueprint manuel. n8n est connecté via MCP et permet de créer/publier des workflows par
API — le pipeline a été construit et activé entièrement sans étape manuelle. Voir `MAKE.md` (archivé)
pour l'ancien plan Make, non utilisé en production.

---

## Ce que fait le workflow

1. **Lead Atelier Webhook** (`n8n-nodes-base.webhook`) — reçoit la soumission du formulaire en POST.
   - URL de production : `https://stefbystep.app.n8n.cloud/webhook/atelier-lead`
   - URL de test : `https://stefbystep.app.n8n.cloud/webhook-test/atelier-lead`
   - Répond immédiatement (`responseMode: onReceived`), pas d'attente du traitement

2. **Normalize Payload** (`n8n-nodes-base.set`) — extrait `nom`, `email`, `besoin`, `description`, `token`
   du payload reçu, avec repli si le champ arrive à la racine plutôt que dans `body` (`$json.body?.nom ?? $json.nom ?? ""`).

3. **Token valide ?** (`n8n-nodes-base.if`) — anti-spam : compare le `token` reçu à la valeur codée en
   dur `atelier-lead-9f3c7b2a1e` (doit être identique à `LEAD_FORM_TOKEN` dans `landing/index.html`).
   - **Vrai** → Créer Soumission Airtable
   - **Faux** → Token invalide - ignorer (`n8n-nodes-base.noOp`, ne fait rien)

4. **Créer Soumission Airtable** (`n8n-nodes-base.airtable`) — crée un enregistrement dans la base
   `L'Atelier` (`appmF2C4PoxGm4C1m`), table `Soumissions` (`tblOTLSsNL4FkIFlz`) :
   - `Nom`, `Email`, `Besoin declare`, `Description` ← valeurs du formulaire
   - `Date de reception` ← `{{ $now.toISO() }}`
   - Connexion utilisée : `Airtable Personal Access Token account 2`

5. **Notifier Stéphanie** (`n8n-nodes-base.gmail`) — envoie un email à `stef.gallois@gmail.com` à
   chaque soumission valide (jamais au prospect) :
   - Sujet : `Nouveau lead Atelier des Automates - {nom}`
   - Corps : nom, email, besoin déclaré, description — texte brut
   - Connexion utilisée : `Gmail account`

---

## Anti-spam — comment ça marche

Le formulaire envoie un `token` fixe (`atelier-lead-9f3c7b2a1e`) codé en dur dans le JS de la landing.
Le nœud "Token valide ?" vérifie juste que ce token correspond — ça filtre les appels directs au
webhook qui ne passent pas par le vrai formulaire (bots qui scannent des URLs de webhooks au hasard).
Ce n'est pas un vrai anti-spam (le token est visible dans le code source de la page), juste un filtre
basique contre les appels automatisés génériques.

**Si tu changes le token**, remplace-le aux deux endroits : ici (nœud "Token valide ?") ET dans
`LEAD_FORM_TOKEN` en tête du `<script>` de `landing/index.html`.

---

## Modifier le workflow

Le workflow a été construit par API (MCP n8n), pas manuellement dans l'éditeur. Pour le modifier :
- **Petits changements** (texte email, mapping Airtable) : éditable directement dans l'éditeur n8n
  (lien ci-dessus), pas besoin de repasser par l'API.
- **Changements structurels** (ajouter un nœud, changer la logique) : redemande à Claude Code de le
  faire via le MCP n8n (`get_workflow_details` puis `update_workflow`), pour garder une trace de ce qui
  change et pourquoi.

---

## Prochaine étape (pas encore faite)

Ajouter l'analyse IA (Claude Haiku) en aval de la création Airtable : résumé de la demande, service
suggéré, brouillon de réponse — comme prévu dans le plan Make original (`MAKE.md`, modules 3-6).
Actuellement le workflow ne fait que capter et notifier, sans analyse.

---

## Test rapide

```bash
curl -X POST https://stefbystep.app.n8n.cloud/webhook/atelier-lead \
  -H "Content-Type: application/json" \
  -d '{"nom":"Test","email":"test@test.fr","besoin":"Idea","description":"Test manuel","token":"atelier-lead-9f3c7b2a1e"}'
```
Réponse attendue : `{"message":"Workflow was started"}`. Vérifier ensuite dans Airtable (table
Soumissions) et dans la boîte mail stef.gallois@gmail.com.

⚠️ Ceci crée une vraie ligne dans Airtable — à supprimer après le test (`delete_records_for_table`
via le MCP Airtable, ou suppression manuelle).
