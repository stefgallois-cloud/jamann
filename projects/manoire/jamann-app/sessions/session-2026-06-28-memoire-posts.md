# Session 2026-06-28 — Mémoire posts publiés + format selector

## Objectif
Rendre l'app Jamann plus intelligente :
1. **Mémoire anti-répétition** — GPT sait quels angles Micka a déjà publiés et les évite
2. **Format selector** — Micka choisit le style de post (storytelling / question / info pratique / teaser / annonce)

---

## Ce qui est FAIT ✅ (session terminée)

### n8n — workflow principal `p3Ane31P14YuVfsx`
- Nœud **"Fetch Memory"** ajouté : Airtable search `{Statut} = 'Publie'`, max 10, `alwaysOutputData: true`, `onError: continueRegularOutput`
- **Build Prompt** réécrit : injecte angles publiés + prend en compte le `format` choisi
- Publié → activeVersionId : `c29d9ae0-58c4-4bb1-ac92-bb4615ebca8a`

### n8n — workflow `rVuaov5Ri3U0aKfV` (save-post ✅ opérationnel)
- Webhook : `POST /webhook/manoire-save-post`
- Payload : `{ text, plat, pillar, brief, target_date }`
- Sauvegarde 1 record Airtable avec `Statut=Publie`
- **Bug corrigé en fin de session** : `??` → `||` sur le champ "Date cible" (Airtable refusait `""` pour un champ Date)
- Publié → activeVersionId : `6d8fd9f0-1c6f-452a-8fe5-0682e09ef869`

### Airtable `appcQfFZyeF16wn35` / `tbliqVOxylcm50f59`
- Champs configurés (sans accents) : `Pilier`, `Brief`, `Date cible`, `FB Variante 1`, `FB Variante 2`, `IG Variante 1`, `IG Variante 2`, `Statut`
- Options Statut : `Genere` / `Publie`

### index.html — `jamann.pages.dev`
- Sélecteur format (5 chips : Storytelling / Question / Info pratique / Teaser / Annonce)
- Aperçu mock réseau social affiché par défaut (plus besoin de cliquer)
- Bouton "J'ai publié ce post" indépendant par PostCard → appelle `manoire-save-post`

---

## Règles importantes pour ce projet

- **Pas d'accents** dans les noms de champs Airtable NI dans filterByFormula
- **`||` pas `??`** pour les champs Date optionnels dans les mappings n8n
- **Credential Airtable n8n** : `Ao8U6Cmc41qAeOAG` (PAT — jamais OAuth)
- **Déploiement** : `npx wrangler pages deploy . --project-name jamann --branch main --commit-dirty=true`

---

## Backlog (pour la prochaine session)

- Archiver/supprimer `maaxHn1WEe3EfzY3` (workflow mark-published devenu redondant)
- Supprimer code debug dans `functions/api/claude.js` et `functions/api/test.js`
- Recharger crédits Anthropic pour activer Haiku 4.5 en priorité 1
