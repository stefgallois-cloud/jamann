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

- `index.html` — app React/Babel (no build step)
- `jamann-screens.jsx` — piliers éditoriaux + few-shot examples + ProfileScreen
- `functions/api/claude.js` — Cloudflare Pages Function (POST `/api/claude`)

## Routing IA — priorité

1. **Anthropic Claude Haiku 4.5** (`claude-haiku-4-5-20251001`) — priorité 1, avec prompt caching
2. **Gemini** (fallback gratuit) — si pas de clé Anthropic ou si échec
3. **OpenRouter** (dernier recours) — si Gemini échoue

## Variables d'env Cloudflare (Settings → Environment variables)

| Var | Statut | Note |
|---|---|---|
| `ANTHROPIC_API_KEY` | ⚠️ Crédits épuisés | Recharger sur console.anthropic.com → Billing |
| `GEMINI_API_KEY` | ✅ Actif | Fallback actuel |
| `OPENROUTER_API_KEY` | ➖ Non configuré | Optionnel |

## Prompt — structure

- `buildSystemPrompt(brand)` — contexte marque statique, mis en cache Anthropic
- `buildUserPrompt(pillar, date, idea)` — dynamique (pilier + brief)
- Référence éditoriale : `../../ligne-editoriale.md`

## Code debug temporaire à supprimer

Présent depuis session 24/06/2026 — à retirer une fois Anthropic rechargé :
- `functions/api/test.js` — endpoint GET `/api/test` (diagnostic env vars)
- Champs `debug_anthropic` / `debug_gemini` dans `claude.js` (lignes ~30, ~73, ~110, ~147)
- Ligne `dbg` dans `index.html` (error handling `handleGenerate`)
