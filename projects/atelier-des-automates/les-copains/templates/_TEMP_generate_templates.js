const pptxgen = require("pptxgenjs");

const pres = new pptxgen();

// Slide carrée 10" x 10" pour Facebook carrousel
pres.defineLayout({ name: "SQUARE", width: 10, height: 10 });
pres.layout = "SQUARE";
pres.title = "Les Copains — Templates";

const W = 10;
const H = 10;

// ─────────────────────────────────────────
// OPTION 1 — NUIT & SOLEIL
// Navy #1B2A4A · Orange #F5A623 · Blanc
// ─────────────────────────────────────────

// Slide 1A — Titre
{
  const s = pres.addSlide();
  s.background = { color: "1B2A4A" };

  // Barre orange en haut
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0, y: 0, w: W, h: 0.07,
    fill: { color: "F5A623" }, line: { color: "F5A623" }
  });

  // Tag "LES COPAINS"
  s.addText("LES COPAINS", {
    x: 0.5, y: 0.22, w: 3, h: 0.25,
    color: "F5A623", fontSize: 10, bold: true, charSpacing: 4, margin: 0
  });

  // Titre
  s.addText("[TITRE DU POST]", {
    x: 0.5, y: 3.5, w: 9, h: 2.0,
    color: "FFFFFF", fontSize: 36, bold: true,
    fontFace: "Calibri", align: "center", valign: "middle"
  });

  // Sous-titre
  s.addText("[Sous-titre ou accroche]", {
    x: 0.5, y: 5.7, w: 9, h: 0.8,
    color: "9EB8D0", fontSize: 16,
    fontFace: "Calibri", align: "center"
  });

  // Cercle décoratif bas droite
  s.addShape(pres.shapes.OVAL, {
    x: 8.8, y: 8.8, w: 0.7, h: 0.7,
    fill: { color: "F5A623", transparency: 85 },
    line: { color: "F5A623", width: 1, transparency: 65 }
  });

  // @stéphanie
  s.addText("@stéphanie", {
    x: 0.5, y: 9.55, w: 2.5, h: 0.25,
    color: "5C7A96", fontSize: 10, margin: 0
  });
}

// Slide 1B — Contenu
{
  const s = pres.addSlide();
  s.background = { color: "1B2A4A" };

  s.addShape(pres.shapes.RECTANGLE, {
    x: 0, y: 0, w: W, h: 0.07,
    fill: { color: "F5A623" }, line: { color: "F5A623" }
  });

  s.addText("[TITRE DE SECTION]", {
    x: 0.5, y: 0.3, w: 9, h: 0.4,
    color: "F5A623", fontSize: 12, bold: true, charSpacing: 3, margin: 0
  });

  s.addText([
    { text: "[Ligne 1]", options: { bullet: true, breakLine: true } },
    { text: "[Ligne 2]", options: { bullet: true, breakLine: true } },
    { text: "[Ligne 3]", options: { bullet: true } }
  ], {
    x: 0.5, y: 1.1, w: 9, h: 7.0,
    color: "FFFFFF", fontSize: 18,
    fontFace: "Calibri", valign: "top", paraSpaceAfter: 18
  });

  s.addText("Sources : [...]", {
    x: 0.5, y: 9.1, w: 8, h: 0.3,
    color: "5C7A96", fontSize: 9, margin: 0
  });

  s.addText("@stéphanie", {
    x: 0.5, y: 9.55, w: 2.5, h: 0.25,
    color: "5C7A96", fontSize: 10, margin: 0
  });
}

// ─────────────────────────────────────────
// OPTION 2 — COSMOS
// Violet #3D1A78 · Turquoise #4ECDC4 · Blanc
// ─────────────────────────────────────────

// Slide 2A — Titre
{
  const s = pres.addSlide();
  s.background = { color: "3D1A78" };

  // Cercles décoratifs transparents
  s.addShape(pres.shapes.OVAL, {
    x: 8.0, y: -0.8, w: 2.8, h: 2.8,
    fill: { color: "4ECDC4", transparency: 88 },
    line: { color: "4ECDC4", transparency: 88 }
  });
  s.addShape(pres.shapes.OVAL, {
    x: -0.6, y: 8.2, w: 2.2, h: 2.2,
    fill: { color: "4ECDC4", transparency: 90 },
    line: { color: "4ECDC4", transparency: 90 }
  });

  // Badge "LES COPAINS" — fond + texte
  s.addShape(pres.shapes.RECTANGLE, {
    x: 3.5, y: 0.25, w: 3.0, h: 0.38,
    fill: { color: "4ECDC4" }, line: { color: "4ECDC4" }
  });
  s.addText("LES COPAINS", {
    x: 3.5, y: 0.25, w: 3.0, h: 0.38,
    color: "3D1A78", fontSize: 10, bold: true,
    charSpacing: 3, align: "center", valign: "middle", margin: 0
  });

  // Titre
  s.addText("[TITRE DU POST]", {
    x: 0.5, y: 3.5, w: 9, h: 2.0,
    color: "FFFFFF", fontSize: 36, bold: true,
    fontFace: "Calibri", align: "center", valign: "middle"
  });

  // Sous-titre
  s.addText("[Sous-titre ou accroche]", {
    x: 0.5, y: 5.7, w: 9, h: 0.8,
    color: "9A8CB5", fontSize: 16,
    fontFace: "Calibri", align: "center"
  });

  // Ligne accent bas gauche
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0.5, y: 9.35, w: 0.7, h: 0.05,
    fill: { color: "4ECDC4" }, line: { color: "4ECDC4" }
  });

  s.addText("@stéphanie", {
    x: 0.5, y: 9.55, w: 2.5, h: 0.25,
    color: "6B5A9A", fontSize: 10, margin: 0
  });
}

// Slide 2B — Contenu
{
  const s = pres.addSlide();
  s.background = { color: "3D1A78" };

  // Badge
  s.addShape(pres.shapes.RECTANGLE, {
    x: 3.5, y: 0.25, w: 3.0, h: 0.38,
    fill: { color: "4ECDC4" }, line: { color: "4ECDC4" }
  });
  s.addText("LES COPAINS", {
    x: 3.5, y: 0.25, w: 3.0, h: 0.38,
    color: "3D1A78", fontSize: 10, bold: true,
    charSpacing: 3, align: "center", valign: "middle", margin: 0
  });

  s.addText("[TITRE DE SECTION]", {
    x: 0.5, y: 1.0, w: 9, h: 0.4,
    color: "4ECDC4", fontSize: 12, bold: true, charSpacing: 3, margin: 0
  });

  s.addText([
    { text: "[Ligne 1]", options: { bullet: true, breakLine: true } },
    { text: "[Ligne 2]", options: { bullet: true, breakLine: true } },
    { text: "[Ligne 3]", options: { bullet: true } }
  ], {
    x: 0.5, y: 1.8, w: 9, h: 6.3,
    color: "FFFFFF", fontSize: 18,
    fontFace: "Calibri", valign: "top", paraSpaceAfter: 18
  });

  s.addText("Sources : [...]", {
    x: 0.5, y: 9.1, w: 8, h: 0.3,
    color: "6B5A9A", fontSize: 9, margin: 0
  });

  s.addText("@stéphanie", {
    x: 0.5, y: 9.55, w: 2.5, h: 0.25,
    color: "6B5A9A", fontSize: 10, margin: 0
  });
}

// ─────────────────────────────────────────
// OPTION 3 — ÉPURÉ MODERNE
// Anthracite #1E1E1E · Menthe #7FD9A0 · Blanc
// ─────────────────────────────────────────

// Slide 3A — Titre
{
  const s = pres.addSlide();
  s.background = { color: "1E1E1E" };

  // Barre verticale menthe gauche
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0, y: 0, w: 0.06, h: H,
    fill: { color: "7FD9A0" }, line: { color: "7FD9A0" }
  });

  // Tag "LES COPAINS" avec petit accent gauche
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0.22, y: 0.28, w: 0.04, h: 0.26,
    fill: { color: "7FD9A0" }, line: { color: "7FD9A0" }
  });
  s.addText("LES COPAINS", {
    x: 0.33, y: 0.26, w: 3.5, h: 0.28,
    color: "7FD9A0", fontSize: 10, bold: true, charSpacing: 4, margin: 0
  });

  // Titre
  s.addText("[TITRE DU POST]", {
    x: 0.33, y: 3.5, w: 9.3, h: 2.0,
    color: "FFFFFF", fontSize: 36, bold: true,
    fontFace: "Calibri", align: "left", valign: "middle"
  });

  // Sous-titre
  s.addText("[Sous-titre ou accroche]", {
    x: 0.33, y: 5.7, w: 9.3, h: 0.8,
    color: "BBBBBB", fontSize: 16,
    fontFace: "Calibri", align: "left"
  });

  s.addText("@stéphanie", {
    x: 0.33, y: 9.55, w: 2.5, h: 0.25,
    color: "888888", fontSize: 10, margin: 0
  });
}

// Slide 3B — Contenu
{
  const s = pres.addSlide();
  s.background = { color: "1E1E1E" };

  // Barre verticale menthe gauche
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0, y: 0, w: 0.06, h: H,
    fill: { color: "7FD9A0" }, line: { color: "7FD9A0" }
  });

  // Accent + Titre de section
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0.22, y: 0.38, w: 0.04, h: 0.3,
    fill: { color: "7FD9A0" }, line: { color: "7FD9A0" }
  });
  s.addText("[TITRE DE SECTION]", {
    x: 0.33, y: 0.36, w: 9, h: 0.34,
    color: "7FD9A0", fontSize: 12, bold: true, charSpacing: 3, margin: 0
  });

  s.addText([
    { text: "[Ligne 1]", options: { bullet: true, breakLine: true } },
    { text: "[Ligne 2]", options: { bullet: true, breakLine: true } },
    { text: "[Ligne 3]", options: { bullet: true } }
  ], {
    x: 0.33, y: 1.1, w: 9.3, h: 7.0,
    color: "FFFFFF", fontSize: 18,
    fontFace: "Calibri", valign: "top", paraSpaceAfter: 18
  });

  s.addText("Sources : [...]", {
    x: 0.33, y: 9.1, w: 8, h: 0.3,
    color: "888888", fontSize: 9, margin: 0
  });

  s.addText("@stéphanie", {
    x: 0.33, y: 9.55, w: 2.5, h: 0.25,
    color: "888888", fontSize: 10, margin: 0
  });
}

// ─── Export ───
pres.writeFile({
  fileName: "c:/Users/DELL/Desktop/test claude/projects/atelier-des-automates/les-copains/templates/templates_les_copains.pptx"
})
.then(() => console.log("✅ templates_les_copains.pptx créé avec succès !"))
.catch(err => console.error("❌ Erreur :", err));
