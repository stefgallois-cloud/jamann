# Scénario Make — Leads Atelier des Automates

**Statut :** à construire (blueprint prêt à importer, voir ci-dessous)
**Déclencheur :** webhook custom, appelé par le formulaire de `landing/index.html`
**Fréquence :** instantané (à chaque soumission)

---

## Ce que fait le scénario

1. Reçoit une soumission du formulaire (nom, email, besoin, description)
2. Vérifie un jeton anti-spam
3. Enregistre la soumission brute dans Airtable (table "Soumissions", base "L'Atelier")
4. Envoie la description à Claude Haiku pour analyse (résumé + service suggéré + brouillon de réponse)
5. Crée une ligne de suivi dans Airtable (table "Suivi") avec le résultat, liée à la soumission
6. Envoie un email de notification à Stéphanie (jamais au prospect)
7. En cas d'échec de l'appel IA ou d'une réponse mal formée : crée quand même une ligne "Suivi" avec
   Statut = "Erreur IA", pour que le lead ne se perde jamais silencieusement

Base Airtable : `L'Atelier` (`appmF2C4PoxGm4C1m`)
- Table "Soumissions" (`tblOTLSsNL4FkIFlz`) — journal brut, jamais modifié après coup
- Table "Suivi" (`tbl6vqIqPAX3tT01F`) — espace de travail, 1 ligne par lead à traiter

---

## Import du blueprint

Le fichier `make-blueprint-leads.json` contient la structure complète du scénario, avec les vrais
IDs Airtable déjà remplis (base/table/champs). **Important à savoir avant d'importer** : je l'ai
écrit à la main, sans pouvoir comparer au format exact qu'exporte Make (le connecteur Make dont je
dispose ne permet pas d'exporter un blueprint de référence pour vérifier octet par octet). Il devrait
s'importer proprement — les identifiants de modules utilisés (`gateway:CustomWebHook`,
`airtable:ActionCreateRecord`, `http:ActionSendData`, `json:ParseJSON`, `google-email:ActionSendEmail`)
sont des identifiants stables et courants dans Make. Mais si un module s'affiche grisé/invalide après
import, ce n'est pas grave : clic droit sur ce module → *Replace* → choisir l'action équivalente dans
la liste (indiquée dans les notes `_note` du JSON pour chaque module). Le reste du scénario n'est pas
affecté.

### Étapes après import

1. **Scenario → Import Blueprint**, sélectionner `make-blueprint-leads.json`
2. **Connexions** : Make va demander d'autoriser 3 connexions (Airtable, HTTP/Anthropic, Gmail) —
   normal, à faire une fois
3. **Error Handlers** : l'import ne les rattache pas automatiquement. Deux modules du fichier
   (repérables via leur `_note` : "ERROR HANDLER à rattacher...") doivent être glissés manuellement :
   - Clic droit sur le module 3 (appel Claude) → *Add error handler* → glisser dedans le module qui
     crée une ligne "Suivi" avec Statut = "Erreur IA"
   - Même chose sur le module 4 (Parse JSON) → glisser l'autre module "Erreur IA" dedans
4. **Clé API Anthropic** : remplacer `{{ANTHROPIC_API_KEY}}` dans le module 3 par la vraie clé —
   stockée en connexion Make (pas en dur dans le module). La clé existe déjà dans le `.env` du projet.
5. **Prompt système** : le champ `system` du module 3 contient un placeholder — coller le bloc
   "PROMPT SYSTEME" complet depuis `prompt/prompt_analyse_besoin.md`
6. **Token anti-spam** : la valeur `atelier-lead-9f3c7b2a1e` (filtre du module 2) doit être identique
   à celle codée en dur dans `landing/index.html`. Si tu veux la changer, remplace-la aux deux endroits.
7. **Activer le scénario**, copier l'URL du webhook (module 1) et la coller dans `MAKE_WEBHOOK_URL`
   en tête du `<script>` de `index.html`
8. **Test réel** : soumettre une fois le formulaire en local ou en ligne. Make ne connaît la structure
   exacte du payload webhook qu'après avoir reçu un vrai appel — vérifier ensuite que les mappings
   `{{1.nom}}`, `{{1.email}}`, etc. se sont bien résolus (pas de "missing data" dans l'historique
   d'exécution)
9. Vérifier dans Airtable qu'une ligne "Soumissions" + une ligne "Suivi" sont bien apparues, et que
   l'email de notification est arrivé

---

## Plan B — montage manuel (si l'import échoue ou qu'un module reste bloqué)

Si l'import du JSON pose problème, le scénario se monte module par module dans l'éditeur Make :

1. **Webhook** (Custom webhook) — le nommer, récupérer l'URL
2. **Filtre** sur la connexion 1→2 : `token` reçu = `atelier-lead-9f3c7b2a1e`
3. **Airtable → Create a Record** — base "L'Atelier", table "Soumissions", mapper Nom/Email/Besoin
   declare/Description depuis le webhook, Date de reception = maintenant
4. **HTTP → Make a request** — POST `https://api.anthropic.com/v1/messages`, headers `x-api-key`
   (connexion), `anthropic-version: 2023-06-01`, `content-type: application/json`, corps = modèle
   `claude-haiku-4-5-20251001` + prompt système (`prompt_analyse_besoin.md`) + description injectée,
   **Parse response = Oui**
5. **JSON → Parse JSON** sur le texte renvoyé par Claude
6. **Airtable → Create a Record** — table "Suivi", lien vers la ligne du module 3, + résultats IA
7. Clic droit sur le module 4 → *Add error handler* → Airtable Create Record "Suivi" Statut =
   "Erreur IA". Même chose sur le module 5
8. **Gmail → Send an Email** — à stef.gallois@gmail.com, contenu = lead + analyse + brouillon

---

## Rotation de clé

⚠️ Comme pour le scénario Manoïre (`5469302`), penser à faire tourner la clé Anthropic après les
tests si elle a été partagée/collée quelque part en clair.
