# Prompts Nano Banana 2 — Landing L'Atelier des Automates

Branding : chaleureux et humain, palette indigo #6366F1 / violet #A78BFA / cyan #06B6D4 / gris-bleu #475569, fond clair #F8FAFC. Style flat illustration moderne avec éléments 3D doux, pas de photo stock, pas de visages.

---

## 1. Hero background

```
Style: Modern, warm, clean 3D illustration.
Concept: softly floating gears and automation symbols, warm light gradient
from soft violet to cyan, floating geometric shapes, peaceful and
human-centered, abstract flow.
Colors: soft indigo #6366F1, violet #A78BFA, cyan #06B6D4, white, soft shadows.
Mood: calm, productive, inspiring, inviting.
Resolution: 2400x1600 px, 16:9.
--no stock photo look, harsh colors, overly complex machinery, people,
faces, readable/legible text, watermark, logo
```

## 2. Service — Sites & Pages Web (mockup)

```
Style: clean UI mockup, modern web interface, isometric view.
Concept: modern website dashboard for a small business (hairdresser,
plumber, etc.), showing client portal, booking form, responsive design.
All visible UI text must be in French only and consistent (e.g. "Mes
Rendez-vous", "Nouveau RDV", "Client", "Service"), never a mix of French
and English words for the same UI. Any button must show a real, finished
French label (e.g. "Confirmer", "Envoyer") — never the literal word
"CTA" or any other placeholder/lorem-ipsum text.
Colors: soft violet #A78BFA, cyan #06B6D4 accents, white and light slate,
readable-looking but abstract typography blocks.
Mood: professional, accessible, not overwhelming.
Resolution: 2000x1500 px.
--no stock photo models, complex data overload, harsh shadows, English
words mixed into French UI, placeholder text like "CTA" or "lorem ipsum",
misspelled words, people, faces, watermark
```

*Note (2026-07-03) : la 1ère génération affichait littéralement le mot "CTA" sur le bouton + une faute ("Evaltation") + du texte en anglais mélangé au français. Prompt corrigé ci-dessus pour l'éviter à la régénération.*

## 3. Service — Apps & Connexion d'Outils (automation flow)

```
Style: modern flat illustration with soft 3D elements.
Concept: data flow / automation pipeline (form to processing to output),
interconnected nodes (email, database, document), arrows indicating flow,
glowing connectors.
Colors: gradient flows violet #A78BFA to cyan #06B6D4, nodes in soft
blues and purples, white background.
Mood: dynamic but calm, "intelligence at work".
Resolution: 2000x1500 px.
--no cyberpunk aesthetic, harsh neon, complex code snippets, real
readable text or logos, people, faces, dark background, watermark
```

## 4. Service — Génération de Contenus

```
Style: modern flat illustration with soft 3D elements, isometric view.
Concept: automated content pipeline — a floating calendar grid with
social media post cards flowing out of it toward a phone and a newsletter
envelope icon, connected by soft glowing arrows showing autopilot
scheduling. Small abstract UI chips suggesting "post" / "newsletter" /
"programmé" as shapes and icons only, never as actual legible words.
Colors: gradient flows indigo #6366F1 to cyan #06B6D4, soft violet
#A78BFA accents, white/light slate background #F8FAFC, gentle drop shadows.
Mood: calm, effortless, "it writes itself" feeling — warm and human,
not corporate.
Resolution: 2000x1500 px.
--no stock photo look, real readable text or fake UI labels (avoid
garbled text artifacts), people, faces, harsh neon, cluttered UI,
dark background, cyberpunk aesthetic, watermark, logo
```

## 5. Service — Création de Visuels

```
Style: modern flat illustration with soft 3D elements, isometric view.
Concept: AI visual generation — a template/frame duplicating itself
into 3-4 variations (carousel cards, a banner shape), each recolored
automatically in the same brand palette, with a magic-wand or sparkle
icon indicating AI-assisted generation, soft glowing connectors between
the templates. No real text anywhere — use abstract line/block shapes
to suggest content.
Colors: gradient indigo #6366F1 to cyan #06B6D4, soft violet #A78BFA
accents, white/light slate background #F8FAFC, gentle shadows.
Mood: playful but calm, "ready to publish in one click".
Resolution: 2000x1500 px.
--no stock photo look, real readable text or fake UI labels (avoid
garbled text artifacts), people, faces, harsh neon, cluttered UI,
dark background, cyberpunk aesthetic, watermark, logo
```

## 6. Mascotte robot — recoloration vers la palette branding

*Prompt d'édition (image-to-image) — à utiliser avec `landing/assets/logo-robot.png` ou `landing/assets/logo.png` en image de référence dans Nano Banana, pas en génération from-scratch.*

```
Edit this exact robot character — keep the same pose, proportions, face,
smile, beret shape, antenna, ear shapes, arm/leg design and overall
silhouette 100% identical. Only change the color palette.

Recolor:
- Beret: from blue to a gradient indigo #6366F1 to violet #A78BFA
- Body/head shell: keep light grey/white, add a very soft violet #A78BFA
  tint in the shadows instead of cool grey
- Chest panel: from blue to indigo #6366F1
- Eyes, ear accents, antenna tip, chest light, feet: from lime green
  to cyan #06B6D4
- Background: solid dark navy #0F172A (keep it dark, just shift the hex
  to this exact tone)

Mood: same as original — friendly, warm, approachable, not corporate.
Keep the flat-with-soft-3D toy-like rendering style identical to the
source image.
Resolution: match source image, transparent or solid #0F172A background,
high detail, clean edges for logo use.
--no change to pose, face, proportions or composition, no new elements
added, no text, no watermark, no photorealistic rendering
```

*Note : générer d'abord sur `logo-robot.png` (mascotte seule, plus simple à contrôler) avant de refaire `logo.png` (avec le texte "l'atelier des automates") une fois la recoloration validée.*

---

**Noms de fichiers attendus** (déjà câblés dans `landing/index.html`) :
- `hero-bg.png`
- `service-website-mockup.png`
- `service-automation-flow.png`
- `service-content-generation.png`
- `service-visual-creation.png`

À déposer dans `landing/assets/images/`.
