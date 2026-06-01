# Skill — Carrousel Facebook (HTML → PNG)

## Principe fondamental

**Ne jamais utiliser PPTX pour du contenu social media.**
PPTX = outil bureautique → rendu moche.
HTML/CSS = contrôle total du design → rendu identique aux mockups visuels.

Le pipeline : HTML (design) → Puppeteer + Chrome (headless) → PNG 1080x1080 par slide.

---

## Stack technique

| Outil | Rôle |
|---|---|
| HTML/CSS | Design des slides (police, couleurs, layout) |
| Google Fonts (CDN) | Montserrat + Inter |
| Node.js + puppeteer-core | Screenshot headless |
| Chrome (système) | Moteur de rendu |
| PNG 1080×1080 | Format de sortie final |

**Chrome path Windows :** `C:\Program Files\Google\Chrome\Application\chrome.exe`

---

## Structure des fichiers

```
projects/[projet]/posts/post_XX_[slug]/
  ├── slides.html          ← design HTML de toutes les slides
  ├── screenshot.js        ← script Puppeteer
  ├── slide_01.png         ← output (à uploader sur Facebook)
  ├── slide_02.png
  ├── ...
  └── legende.txt          ← texte de la légende Facebook
```

---

## Template HTML — Structure d'une slide

Chaque slide = un `<div class="slide" id="slide-XX">` de 1080×1080px exact.

```html
<!DOCTYPE html>
<html lang="fr">
<head>
<meta charset="UTF-8">
<link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;700;800&family=Inter:wght@400;500;600&display=swap" rel="stylesheet">
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body { background: #111; }

  .slide {
    width: 1080px;
    height: 1080px;
    position: relative;
    overflow: hidden;
    /* Pas de display:flex sur le body — chaque slide est positionnée de façon absolue */
  }
</style>
</head>
<body>
  <div class="slide" id="slide-01">
    <!-- contenu slide 1 -->
  </div>
  <div class="slide" id="slide-02">
    <!-- contenu slide 2 -->
  </div>
</body>
</html>
```

---

## Script Puppeteer — screenshot.js

```javascript
const puppeteer = require("puppeteer-core");
const path = require("path");

const CHROME = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const HTML_FILE = path.resolve(__dirname, "slides.html");
const SLIDE_COUNT = 6; // adapter selon le post

(async () => {
  const browser = await puppeteer.launch({
    executablePath: CHROME,
    args: ["--no-sandbox", "--disable-setuid-sandbox"]
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1080, height: 1080, deviceScaleFactor: 2 });
  await page.goto(`file:///${HTML_FILE.replace(/\\/g, "/")}`, { waitUntil: "networkidle0" });

  for (let i = 1; i <= SLIDE_COUNT; i++) {
    const id = `slide-0${i}`;
    const el = await page.$(`#${id}`);
    if (!el) { console.warn(`⚠️ #${id} non trouvé`); continue; }
    const num = String(i).padStart(2, "0");
    await el.screenshot({ path: path.join(__dirname, `slide_${num}.png`) });
    console.log(`✅ slide_${num}.png`);
  }

  await browser.close();
  console.log("🎉 Tous les slides générés.");
})();
```

**Commande d'exécution :**
```
$env:NODE_PATH = "C:\Users\DELL\AppData\Roaming\npm\node_modules"
node --require "C:\Users\DELL\AppData\Roaming\npm\node_modules\puppeteer-core" screenshot.js
```

---

## Design system — Les Copains

### Palettes

| Palette | Fond | Accent | Texte principal | Texte secondaire |
|---|---|---|---|---|
| Nuit & Soleil | `#1B2A4A` | `#F5A623` | `#FFFFFF` | `#9EB8D0` |
| Cosmos | `#3D1A78` | `#4ECDC4` | `#FFFFFF` | `#9A8CB5` |
| Épuré Moderne | `#1E1E1E` | `#7FD9A0` | `#FFFFFF` | `#BBBBBB` |

→ Alterner d'un post à l'autre. Post 01 = Nuit & Soleil, Post 02 = Cosmos, etc.

### Typographie

- **Titres :** Montserrat Bold / ExtraBold — 60-80px (slide couverture), 36-44px (titres de section)
- **Corps :** Inter Regular — 28-36px (pour rester lisible sur mobile)
- **Handles / Sources :** Inter 500 — 20px, opacité réduite

### Éléments communs à toutes les slides

- Tag "LES COPAINS" en haut (couleur accent, lettres espacées)
- Handle "@stéphanie" en bas à gauche (discret)
- Sources sur la slide question uniquement

---

## Règles de design social media

1. **Lisible sur téléphone** — police minimum 28px. Sur mobile la slide = ~375px, le texte doit rester grand.
2. **1 idée par slide** — si tu dois réduire la police pour faire rentrer le texte, c'est qu'il y a trop de texte.
3. **Contraste ≥ 4.5:1** — texte blanc sur fond foncé = OK. Jamais de gris clair sur fond clair.
4. **Zone de sécurité** — laisser 60px de marge sur tous les bords (Instagram/Facebook peuvent rogner).
5. **Slide 1 = accroche visuelle** — titre en très grand, peu de texte, l'œil doit être accroché en 1 seconde.

---

## Workflow complet par post

1. Lire `prompt/prompt_carrousel_facebook.md` → générer le contenu textuel
2. Créer le dossier `posts/post_XX_[slug]/`
3. Copier et adapter `slides.html` + `screenshot.js`
4. Remplir les slides avec le contenu du post
5. Lancer `node screenshot.js` → 6 PNG générés
6. QA visuel : vérifier chaque slide (lisibilité, débordements, contraste)
7. Sauvegarder la légende Facebook dans `legende.txt`
8. Livrer : dossier complet prêt à publier

---

## QA checklist

- [ ] Texte lisible sur téléphone (taille ≥ 28px)
- [ ] Aucun texte coupé sur les bords
- [ ] Contraste suffisant partout
- [ ] Slide 1 : titre accrocheur, peu de texte
- [ ] Slide finale : question claire, sources visibles
- [ ] Handle @stéphanie présent sur toutes les slides
- [ ] 6 PNG générés sans erreur

---

*Créée le 2026-05-31. À enrichir à chaque nouveau post.*
