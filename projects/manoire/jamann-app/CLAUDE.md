# CLAUDE.md — Jamann App

Application web de génération de posts réseaux sociaux pour **Le Manoïre** (Col de Jaman, Montreux).
Client unique : Micka Moreau (`micha.moreau@gmail.com`).

## Déploiement

**Cloudflare Pages** — `jamann.pages.dev`
Projet Cloudflare : `jamann` (account `8dbbf4e16e056c1a01b33d761266d995`)

```bash
# Déployer (depuis ce dossier)
npx wrangler pages deploy . --project-name jamann --branch main --commit-dirty=true
```

Ne jamais déployer sur Netlify — ancienne plateforme abandonnée.

## Architecture

```
jamann-app/
├── index.html                       ← app React/Babel (no build step) — page principale
├── functions/api/describe-image.js  ← Cloudflare Function — vision Gemini (POST /api/describe-image)
├── uploads/                         ← chartes graphiques PDF
├── logo.png
├── sessions/                        ← comptes-rendus de session
└── _archive/                        ← V1 et fichiers obsolètes (ne pas modifier)
```

## Routing IA — architecture actuelle (2026-06-28)

La génération de posts passe entièrement par **n8n** (plus de Cloudflare Function pour l'IA) :

| Webhook n8n | URL | Rôle |
|---|---|---|
| `manoire-posts-gen` | `stefbystep.app.n8n.cloud/webhook/manoire-posts-gen` | Génération 2 FB + 2 IG |
| `manoire-save-post` | `stefbystep.app.n8n.cloud/webhook/manoire-save-post` | Sauvegarde post publié → Airtable |

**IA dans n8n** : GPT-4o-mini (OpenAI) avec mémoire anti-répétition via Airtable.

## Variables d'env Cloudflare (Settings → Environment variables)

| Var | Statut | Note |
|---|---|---|
| `ANTHROPIC_API_KEY` | ⚠️ Crédits épuisés | Recharger sur console.anthropic.com → Billing |
| `GEMINI_API_KEY` | ✅ Actif | Utilisé uniquement pour describe-image |

## Mémoire anti-répétition — Airtable

- Base : `appcQfFZyeF16wn35` · Table : `tbliqVOxylcm50f59`
- Champs (sans accents) : `Pilier`, `Brief`, `Date cible`, `FB Variante 1`, `FB Variante 2`, `IG Variante 1`, `IG Variante 2`, `Statut`
- Options Statut : `Genere` / `Publie`
- Credential n8n : `Ao8U6Cmc41qAeOAG` (PAT — jamais OAuth)
