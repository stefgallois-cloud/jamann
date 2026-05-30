# Briefs mockup — Batch 1

**Date :** 2026-05-28
**Outil principal :** ⚠️ **Reco révisée 2026-05-28 :** Ideogram ($8/mois) dès le départ
**Outil backup gratuit :** Nano Banana (Gemini 2.5 Flash Image) via Google AI Studio

## 🔄 Pourquoi cette révision

Reco initiale : Nano Banana gratuit.
Reco finale : Ideogram à $8/mois.

**Raisons :**
- Stef veut zéro risque qualité ("je ne veux pas foirer parce que j'ai changé un paramètre")
- $8/mois = 2 cafés, négligeable face aux $25 marge moyenne par vente
- Ideogram est leader marché sur le texte typographique (le critère #1 POD)
- Consistance batch supérieure (50 designs gardent un style cohérent)
- Variations rapides illimitées

**Quand utiliser Nano Banana quand même :**
- Tests rapides avant d'investir un slot Ideogram
- Volume burst (>200 designs/jour) où Ideogram limit
- Si tu veux comparer les outputs 2 outils sur un design clé

---

## Pourquoi Nano Banana pour démarrer

| Critère | Nano Banana | Midjourney | Ideogram | DALL-E 3 |
|---|---|---|---|---|
| Prix | **Gratuit** (limited) | $10-30/mois | $8/mois | $20/mois (ChatGPT) |
| Texte dans l'image | **Excellent** | Moyen | Excellent | Bon |
| Droits commerciaux | OK | OK | OK | OK |
| Qualité POD-ready | Très bonne | Excellente | Très bonne | Bonne |
| Vitesse | 5-10 sec | 30-60 sec | 10-15 sec | 15-20 sec |
| Accès | [aistudio.google.com](https://aistudio.google.com) | Discord/Web | Web | ChatGPT |

**Verdict :** Nano Banana pour le démarrage. Si tu fais >100 designs/mois et que tu veux push la qualité, ajouter Ideogram ($8) pour les designs typo-only.

---

## Workflow complet : du prompt à Printify

```
1. Brief mockup (ce doc)              → prompt structuré
2. Google AI Studio (gratuit)         → image générée (PNG)
3. Photopea (gratuit) ou Canva Pro    → retouche : fond transparent, redim 4500×5400px
4. Upload Printify (via design)       → applique sur t-shirt/sweat/mug/etc.
5. Mockup produit fini (Printify ou Placeit) → photo listing Etsy
```

**Étape 3 importante :** Printify exige **PNG transparent, 4500×5400 px (300 DPI) minimum** pour les t-shirts. Nano Banana sort en format carré ou portrait — il faut redim.

---

## Format des prompts Nano Banana

Structure recommandée pour POD :

```
[STYLE] / [SUBJECT] / [TEXT] / [COLORS] / [COMPOSITION] / [BACKGROUND] / [QUALITY]
```

**Exemple :**
> Hand-drawn vintage typography design, the words "ANXIOUS GOLDEN RETRIEVER MOM" stacked in 3 lines with playful uppercase serif font, deep sage green and dusty rose color palette, centered composition with small golden retriever paw illustration below the text, transparent background, high-resolution print quality, no watermark, no border

**Règles clés pour Nano Banana :**
- Préciser **"transparent background"** ou **"on solid white background"** (Printify préfère transparent)
- Préciser **"high resolution"** et **"no watermark"**
- **Si tu veux du texte précis** : mets le texte entre guillemets ET en MAJUSCULES dans le prompt
- Éviter "in the style of [artiste]" — risque IP Etsy 2026

---

## Brief 1 — Chaotic Good × Sweat Gildan 18000

**Concept :** Chaotic Good — Golden Retriever Energy
**Mockup keywords sauce SEO :** hand-drawn typography, retro 70s tones, golden retriever paw print accent, cozy autumn vibe

### Prompt Nano Banana

```
Hand-drawn retro 70s typography design, the words "CHAOTIC GOOD GOLDEN RETRIEVER ENERGY" stacked in 3 wavy lines with bold groovy serif font, color palette of warm mustard yellow, burnt orange, and chocolate brown, centered composition with a small golden retriever paw print silhouette below the text, transparent background, vintage textured finish, high-resolution print quality 300 DPI, no watermark, no border, ready for screen printing on sweatshirt
```

### Settings Google AI Studio

| Paramètre | Valeur |
|---|---|
| Model | Gemini 2.5 Flash Image |
| Aspect ratio | Square (1:1) ou Portrait (3:4) |
| Output | 2 variations en parallèle |

### Post-production

1. Télécharger PNG
2. Photopea : enlever le fond (Magic Wand → Delete) si pas déjà transparent
3. Redimensionner à 4500×5400 px (Image → Image size)
4. Sauvegarder PNG transparent

---

## Brief 2 — Golden Retriever Mom of [NAMES] × T-shirt

**Concept :** Golden Retriever Mom of [NAMES] (personnalisé)
**Mockup keywords :** minimalist typography, four custom names stacked center chest, dusty pink shirt, soft natural lighting

### Approche personnalisation

Vu que c'est un design personnalisable, on génère un **template** avec des placeholders, puis Printify gère la personnalisation à la commande.

### Prompt Nano Banana — Version template

```
Minimalist modern typography design, the words "GOLDEN RETRIEVER MOM OF" in clean uppercase sans-serif font at the top, below it four placeholder names "BAILEY • CHARLIE • LUNA • COOPER" stacked vertically separated by small dots, monochrome black text, centered composition, transparent background, high-resolution print quality 300 DPI, no watermark, no border, clean minimalist style suitable for t-shirt screen printing
```

### Note Printify

Pour la personnalisation réelle (le client tape les noms), tu activeras la fonction **"Personalization"** sur le listing Etsy + le mockup Printify. Toi tu personnaliseras chaque commande manuellement OU via un service comme [Hatchful](https://hatchful.shopify.com/) ou un script Photoshop batch.

**Alternative simple pour démarrer :** vendre 4 versions fixes ("Mom of 1", "Mom of 2", "Mom of 3", "Mom of 4 Goldens") en listings séparés. Pas de personnalisation manuelle, plus simple à scaler.

---

## Brief 3 — Frenchie Mom Soft Girl Era × T-shirt Comfort Colors pink

**Concept :** Frenchie Mom — Soft Girl Era
**Mockup keywords :** hand-drawn script typography, blush pink garment-dyed tee, small frenchie line illustration, romantic soft lighting

### Prompt Nano Banana

```
Romantic hand-drawn script typography design, the words "Frenchie Mom" written in elegant cursive flowing script at the top, below it "SOFT GIRL ERA" in smaller uppercase letter-spaced serif font, with a tiny minimalist French Bulldog line illustration with a small bow on top of its head, color palette of dusty rose pink and cream white, centered composition with romantic coquette aesthetic, transparent background, high-resolution print quality 300 DPI, no watermark, no border, designed for screen printing on blush pink t-shirt
```

### Variante à tester

```
[Same prompt] + "with small heart and bow decorative elements scattered around the typography"
```

→ Génère 2 versions, compare, garde la plus convertissante.

---

## Brief 4 — Bonjour My Frenchie × Poster 18×24

**Concept :** Bonjour, My Frenchie
**Mockup keywords :** minimalist line art, hand-drawn frenchie silhouette, cream paper background, romantic script typography

### Spécificité poster

Le poster est différent : on garde le fond (pas transparent) car c'est l'œuvre complète. Format portrait obligatoire (3:4 ou 2:3).

### Prompt Nano Banana

```
Minimalist line art poster design, the word "Bonjour" in elegant hand-drawn cursive script at the top in soft black, below it a single-line continuous-line drawing of a French Bulldog facing forward with subtle expression, at the bottom in smaller uppercase letter-spaced font the words "MY FRENCHIE", color palette of soft cream off-white background with deep black ink line art, centered minimalist composition with generous white space, portrait orientation 3:4, high-resolution print quality 300 DPI, gallery-ready aesthetic, no watermark, no border
```

### Post-production poster

1. Télécharger PNG
2. Photopea : crop précis à 18×24 ratio (3:4)
3. Redim à minimum 5400×7200 px pour print 18×24 à 300 DPI
4. Sauvegarder PNG (fond cream conservé)

---

## Brief 5 — Paw Prints in My Heart × Tote bag

**Concept :** Paw Prints in My Heart
**Mockup keywords :** minimalist paw print pattern, soft watercolor texture, natural canvas tote, calm sunlit interior

### Prompt Nano Banana

```
Delicate watercolor-style design, the words "PAW PRINTS IN MY HEART" in elegant hand-lettered script with soft brush strokes, surrounded by 5-6 small scattered paw print silhouettes in varying sizes, color palette of deep navy and warm taupe with subtle watercolor blooms, centered composition with organic flowing layout, transparent background, high-resolution print quality 300 DPI, no watermark, no border, gentle memorial aesthetic suitable for canvas tote bag print
```

### Note émotionnelle

C'est un design mémorial. Garder le ton sobre, pudique. Éviter :
- Cœurs trop gros et rouges
- Anges, ailes (cliché memorial)
- Citations larmoyantes ajoutées au visuel

---

## Workflow de génération recommandé (1ère session, ~2h pour les 5)

### Étape 1 — Google AI Studio (gratuit)

1. Aller sur https://aistudio.google.com
2. Connexion Google
3. New chat → choisir **Gemini 2.5 Flash Image** dans les models
4. Coller le prompt du brief #1 → Send
5. Évaluer le résultat → si bon, télécharger PNG ; sinon, ajuster le prompt
6. Répéter pour les 5 briefs

### Étape 2 — Photopea (gratuit, alternative Photoshop)

1. Aller sur https://www.photopea.com
2. File → Open → ton PNG
3. Magic Wand sur le fond → Delete (si fond blanc à enlever)
4. Image → Image size → 4500×5400 (T-shirt/sweat) ou 5400×7200 (poster) ou 4500×4500 (tote/mug)
5. File → Export as PNG (vérifier transparence cochée)

### Étape 3 — Test rapide qualité

Avant d'uploader sur Printify, regarder le PNG sur fond gris pour vérifier :
- Aucun pixel parasite autour du design
- Pas d'artefact de compression
- Texte parfaitement lisible
- Couleurs vives même sur fond foncé

---

## Quand passer en Ideogram (upgrade $8/mois)

Critères de bascule :
- Tu fais >50 designs/mois et la limite gratuite Nano Banana te ralentit
- Tu fais beaucoup de designs typo-only (citations, "Just a girl who...") → Ideogram est imbattable sur le texte parfait
- Tu veux des variations rapides sur le même design (Ideogram a un meilleur tooling)

À ce moment-là, garder Nano Banana pour les designs avec illustrations + texte mixte, et Ideogram pour typo pure.

---

## Mockups produit fini (pour Etsy listing)

Le design qu'on génère = ce qui s'imprime sur le t-shirt.
Le mockup = le t-shirt **porté ou posé** dans une scène lifestyle.

**Options pour les mockups produit :**

| Solution | Coût | Recommandation |
|---|---|---|
| **Printify Mockup Generator** | Gratuit (inclus) | Démarrage. Simple, basique mais OK pour test. |
| **Placeit** | $14/mois | Quand tu as >50 listings. Mockups lifestyle pro. |
| **Canva Pro** | $13/mois | Bon mix design + mockup, surtout si déjà abonnée. |
| **AI mockup tools** | Variable | À tester en mois 3-4. |

**Mon avis :** démarrer avec Printify mockup → si conversion faible mois 2, passer à Placeit.

---

## Coûts cumulés ce workflow

| Phase | Outils | Coût/mois |
|---|---|---|
| **Démarrage** (M1-2) | Nano Banana + Photopea + Printify mockup | **$0** |
| **Scale** (M3+) | + Ideogram OU + Placeit | $8 ou $14 |
| **Pro** (M6+) | Tout combiné si besoin | $22 |

Tu peux générer les 50 premiers designs pour $0 d'outils visuels.

---

## Checklist pour les 5 designs du batch 1

- [ ] Brief 1 — Chaotic Good × Sweat → généré + cleané + uploadé Printify
- [ ] Brief 2 — Mom of [NAMES] × T-shirt → décider perso vs versions fixes
- [ ] Brief 3 — Frenchie Soft Girl × T-shirt pink → généré + 2 variations testées
- [ ] Brief 4 — Bonjour My Frenchie × Poster → format portrait 3:4
- [ ] Brief 5 — Paw Prints × Tote → ton sobre vérifié

**Temps estimé total :** 1h30-2h pour les 5 designs (prompt + génération + post-prod).
