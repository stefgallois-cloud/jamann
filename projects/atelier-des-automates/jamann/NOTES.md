# Jamann — Notes de contexte

## Ce qu'est Jamann
App web responsive de génération de posts réseaux sociaux assistée par Claude — **dédiée au seul client Le Manoïre**. Pas d'onboarding, pas de profil éditable, tout est hardcodé.

## Client unique : Le Manoïre
Restaurant d'alpage emblématique du Col de Jaman (1512m, Montreux). Renaissance pour ouverture **fin juin 2026** après reprise du nom originel.

**Identité visuelle** (charte `uploads/charte.pdf`) :
- Palette : `#C58632` ocre, `#E06530` orange, `#4B0F1F` bordeaux, `#FBFBF8` fond clair, `#EFE5DB` fond chaud, `#954315` accent foncé
- Fonts : Tenaciou Bold (logo), Courir Regular (sous-titre), Clash Grotesk (titres/corps)
- Mascotte officielle : vache souriante
- Mascotte du compte social : **Anouck** (Saint-Bernard, présente au col depuis ses 2 mois)

## Fichiers du projet
| Fichier | Rôle |
|---|---|
| `index.html` | App principale — thèmes, écrans, prompt IA, BRAND constante |
| `jamann-screens.jsx` | ProfileScreen + constantes PILLARS et FEWSHOT_EXAMPLES |
| `tweaks-panel.jsx` | Panneau de tweaks (starter, inchangé) |
| `uploads/charte.pdf` | Charte graphique Le Manoïre |

## Architecture de l'app

### Thèmes (3 — inchangés)
- `dark` — fond #09090F, accent violet `#7C3AED`
- `light` — fond #F6F3EF, accent corail `#C84B12`
- `electric` — fond #040A18, accent cyan `#00BFFF` ← thème par défaut

### Écrans (4)
1. **Créer** — écran principal : pilier éditorial + idée optionnelle → génération IA
2. **Aperçu** — preview Instagram ou Facebook du post généré
3. **Planning** — calendrier mensuel avec posts démo
4. **Marque** — vue lecture seule des infos Le Manoïre + les 6 piliers

Tab bar : Créer | Aperçu | Planning | Marque

## Constante BRAND (index.html)
```js
const BRAND = {
  name:     "Le Manoïre",
  tagline:  "Restaurant d'alpage — Col de Jaman, 1512m",
  location: "Col de Jaman, 1820 Montreux, Suisse",
  site:     "lemanoire-jaman.ch",
  ig:       "le_manoire",
  fb:       "Le Manoïre",
  opening:  "fin juin 2026",
  mascotte: { name: "Anouck", species: "Saint-Bernard" },
  baseHashtags: ["LeManoire", "ColDeJaman", "Montreux"],
};
```

## Piliers éditoriaux (jamann-screens.jsx → PILLARS)
| ID | Pilier | Hashtags additionnels |
|---|---|---|
| `travaux` | Coulisses travaux | `#Travaux #Chantier #Renovation` |
| `anouck` | Anouck & vie du col | `#SaintBernard #Anouck #VieAuCol` |
| `terroir` | Cuisine & terroir | `#Terroir #ProducteursLocaux #CuisineSuisse` |
| `lieu` | Vue & lieu | `#AlpageMontreux #PrealpesVaudoises #VueAlpes` |
| `histoire` | Histoire & transmission | `#Renaissance #TransmissionFamiliale #Heritage` |
| `countdown` | Compte à rebours | `#OuvertureBientot #FinJuin2026 #CountDown` |

Hashtags base toujours présents : `#LeManoire #ColDeJaman #Montreux`

## Prompt IA — structure (index.html → `buildAIPrompt`)
**v3 (2026-05-25) — génération double IG + FB en un seul appel**

1. **Contexte marque** — identité Manoïre complète
2. **Voix de marque** — règles transversales (vocabulaire toléré/banni, longueur, emojis)
3. **Pilier actif** — angle + vocabulaire + hashtags du pilier
4. **Hashtags de base** — `#LeManoire #ColDeJaman #Montreux` toujours en tête
5. **Règles Instagram** — caption 200-350c, 8-10 hashtags
6. **Règles Facebook** — caption 300-500c, exactement 5 hashtags
7. **Few-shot** — 6 exemples canoniques (1 par pilier)
8. **Brief utilisateur** — idée optionnelle
9. **Format de sortie** — JSON `{ hook, instagram:{caption,hashtags}, facebook:{caption,hashtags}, visual_tip }`

## Voix de marque (rappel)
- Phrases courtes, rythmées, en escalier (3 lignes max / paragraphe)
- 1 à 3 emojis max, jamais en chapelet de fin
- **Bannis** : magnifique, incroyable, exceptionnel, inoubliable, tendance, food, expérience client, lifestyle, gourmet, premium, savoureux, magique
- **Tolérés** : terroir, alpage, transmission, racines, halte, retour, hauteur, lenteur
- Humour tendre uniquement quand Anouck est dans le post

## Presse-papier
- **Copier IG** : caption + `.\n.\n.\n` + tous les hashtags (8-10)
- **Copier FB** : caption + 5 hashtags (les 3 base + 2 pilier)

## Gestion d'erreur
Si l'API plante (clé invalide, function 500, parse JSON KO) :
- Bannière rouge affichée en haut du résultat avec le message d'erreur réel
- Fallback hors-ligne affiché en dessous (2 posts placeholder)
- Console : `console.error('[Jamann] Génération IA échouée :', e)`

## Provider IA — Google Gemini 2.0 Flash
Décision 2026-05-25 : bascule d'Anthropic (payant) vers Gemini 2.0 Flash (gratuit, 1500 req/jour) pour la phase de test/entraînement.

- **Endpoint** : `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent`
- **Variable env Netlify** : `GEMINI_API_KEY` (à obtenir sur https://aistudio.google.com/app/apikey)
- **Function** : `netlify/functions/claude.mjs` (le path reste `/api/claude` côté client pour ne pas casser le frontend, mais l'impl appelle Gemini)
- **Quota** : 1500 requêtes/jour gratuit, largement suffisant pour les tests
- **À switcher vers Claude Haiku 4.5 plus tard** : pour la voix poétique fine de Manoïre, Claude reste supérieur. Réactiver `ANTHROPIC_API_KEY` quand le compte sera billed.

## Pas de state persisté
L'app n'utilise plus de localStorage. La marque est hardcodée dans le code. Seul le pilier sélectionné et le post généré vivent en state React.

## Roadmap (post-refonte mono-client)
1. Écran Connexion Meta (Page Access Token)
2. Bouton "Publier maintenant" dans l'Aperçu
3. Backend proxy (Vercel Function) pour Graph API
4. Confirmation publication + ajout au Calendrier
5. Synchronisation Airtable côté Planning (lecture du calendrier réel — base `app6TseIO7Sx4fJqv`, table `tblqLY0hmMINANI9s`)

### Endpoints Meta à utiliser
- **Instagram** : `POST /{ig-user-id}/media` puis `POST /{ig-user-id}/media_publish`
- **Facebook** : `POST /{page-id}/photos` ou `POST /{page-id}/feed`
- Base URL : `https://graph.facebook.com/v19.0/`

## Tweaks disponibles
- Thème visuel (dark / light / electric)
- Plateforme par défaut (Instagram / Facebook)

## Tester en local
```
cd Jamann
python -m http.server 8000
# puis ouvrir http://localhost:8000
```
Les `<script src="*.jsx">` ne se chargent pas en `file://` — il faut un serveur.
