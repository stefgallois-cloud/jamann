const pptxgen = require("pptxgenjs");

const pres = new pptxgen();
pres.defineLayout({ name: "SQUARE", width: 10, height: 10 });
pres.layout = "SQUARE";
pres.title = "Les Copains — Post 01";

const W = 10;
const H = 10;

// ─── Helpers ─────────────────────────────────
function addTopBar(s) {
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0, y: 0, w: W, h: 0.07,
    fill: { color: "F5A623" }, line: { color: "F5A623" }
  });
}

function addTag(s) {
  s.addText("LES COPAINS", {
    x: 0.5, y: 0.22, w: 3, h: 0.25,
    color: "F5A623", fontSize: 10, bold: true, charSpacing: 4, margin: 0
  });
}

function addHandle(s) {
  s.addText("@stéphanie", {
    x: 0.5, y: 9.55, w: 2.5, h: 0.25,
    color: "5C7A96", fontSize: 10, margin: 0
  });
}

function addSectionTitle(s, text) {
  s.addText(text, {
    x: 0.5, y: 0.55, w: 9, h: 0.35,
    color: "F5A623", fontSize: 11, bold: true, charSpacing: 3, margin: 0
  });
}

// ─── SLIDE 1 — TITRE ─────────────────────────
{
  const s = pres.addSlide();
  s.background = { color: "1B2A4A" };
  addTopBar(s);
  addTag(s);

  s.addText("Osez l'IA", {
    x: 0.5, y: 2.4, w: 9, h: 1.3,
    color: "F5A623", fontSize: 54, bold: true,
    fontFace: "Calibri", align: "center"
  });

  s.addText("Pourquoi le gouvernement pousse l'IA", {
    x: 0.5, y: 3.9, w: 9, h: 1.4,
    color: "FFFFFF", fontSize: 28, bold: true,
    fontFace: "Calibri", align: "center"
  });

  s.addShape(pres.shapes.RECTANGLE, {
    x: 3.5, y: 5.45, w: 3, h: 0.04,
    fill: { color: "F5A623", transparency: 50 },
    line: { color: "F5A623", transparency: 50 }
  });

  s.addText("Un projet stratégique pour les entreprises… et pour les citoyens", {
    x: 0.5, y: 5.65, w: 9, h: 0.9,
    color: "9EB8D0", fontSize: 15,
    fontFace: "Calibri", align: "center"
  });

  s.addShape(pres.shapes.OVAL, {
    x: 8.8, y: 8.8, w: 0.7, h: 0.7,
    fill: { color: "F5A623", transparency: 85 },
    line: { color: "F5A623", width: 1, transparency: 65 }
  });

  addHandle(s);
}

// ─── SLIDE 2 — CHIFFRES CLÉS ─────────────────
{
  const s = pres.addSlide();
  s.background = { color: "1B2A4A" };
  addTopBar(s);
  addTag(s);
  addSectionTitle(s, "CHIFFRES CLÉS");

  // Stat 1
  s.addText("200 M€", {
    x: 0.5, y: 1.2, w: 3.6, h: 0.85,
    color: "F5A623", fontSize: 38, bold: true,
    fontFace: "Calibri", valign: "middle"
  });
  s.addText("Budget du plan « Osez l'IA »\npour aider les entreprises à adopter l'IA", {
    x: 4.1, y: 1.2, w: 5.6, h: 0.85,
    color: "FFFFFF", fontSize: 14,
    fontFace: "Calibri", valign: "middle"
  });

  s.addShape(pres.shapes.RECTANGLE, {
    x: 0.5, y: 2.2, w: 9, h: 0.03,
    fill: { color: "F5A623", transparency: 75 },
    line: { color: "F5A623", transparency: 75 }
  });

  // Stat 2
  s.addText("109 Md€", {
    x: 0.5, y: 2.4, w: 3.6, h: 0.85,
    color: "F5A623", fontSize: 38, bold: true,
    fontFace: "Calibri", valign: "middle"
  });
  s.addText("Investissements annoncés\ndans l'IA française d'ici 2031", {
    x: 4.1, y: 2.4, w: 5.6, h: 0.85,
    color: "FFFFFF", fontSize: 14,
    fontFace: "Calibri", valign: "middle"
  });

  s.addShape(pres.shapes.RECTANGLE, {
    x: 0.5, y: 3.4, w: 9, h: 0.03,
    fill: { color: "F5A623", transparency: 75 },
    line: { color: "F5A623", transparency: 75 }
  });

  // Stat 3
  s.addText("15 M", {
    x: 0.5, y: 3.6, w: 3.6, h: 0.85,
    color: "F5A623", fontSize: 38, bold: true,
    fontFace: "Calibri", valign: "middle"
  });
  s.addText("de Français à former à l'IA\nd'ici 2030 — l'objectif officiel", {
    x: 4.1, y: 3.6, w: 5.6, h: 0.85,
    color: "FFFFFF", fontSize: 14,
    fontFace: "Calibri", valign: "middle"
  });

  s.addText("Sources : DGE · Le Monde · Clubic", {
    x: 0.5, y: 9.1, w: 8, h: 0.3,
    color: "5C7A96", fontSize: 9, margin: 0
  });

  addHandle(s);
}

// ─── SLIDE 3 — POURQUOI MAINTENANT ───────────
{
  const s = pres.addSlide();
  s.background = { color: "1B2A4A" };
  addTopBar(s);
  addTag(s);
  addSectionTitle(s, "POURQUOI MAINTENANT ?");

  s.addText([
    { text: "L'IA devient incontournable dans le travail quotidien.", options: { bullet: true, breakLine: true } },
    { text: "Sans formation, on risque de créer un fossé entre ceux qui savent et ceux qui subissent.", options: { bullet: true, breakLine: true } },
    { text: "Les freins ? Peur de l'inconnu. L'impression que c'est compliqué. Un coût perçu trop élevé.", options: { bullet: true } }
  ], {
    x: 0.5, y: 1.3, w: 9, h: 7.8,
    color: "FFFFFF", fontSize: 18,
    fontFace: "Calibri", valign: "top", paraSpaceAfter: 28
  });

  addHandle(s);
}

// ─── SLIDE 4 — MON MESSAGE ───────────────────
{
  const s = pres.addSlide();
  s.background = { color: "1B2A4A" };
  addTopBar(s);
  addTag(s);
  addSectionTitle(s, "MON MESSAGE");

  s.addText([
    { text: "L'IA n'est pas un ami — c'est un outil.", options: { bullet: true, breakLine: true } },
    { text: "Pas besoin d'avoir peur. Juste besoin d'apprendre à s'en servir.", options: { bullet: true, breakLine: true } },
    { text: "Elle ne se souvient pas de tout et ne « comprend » pas comme un humain.", options: { bullet: true } }
  ], {
    x: 0.5, y: 1.3, w: 9, h: 7.8,
    color: "FFFFFF", fontSize: 18,
    fontFace: "Calibri", valign: "top", paraSpaceAfter: 28
  });

  addHandle(s);
}

// ─── SLIDE 5 — MA DÉMARCHE ───────────────────
{
  const s = pres.addSlide();
  s.background = { color: "1B2A4A" };
  addTopBar(s);
  addTag(s);

  s.addText("J'ai passé un an à apprendre\nà me servir de l'IA.", {
    x: 0.5, y: 2.2, w: 9, h: 2.2,
    color: "FFFFFF", fontSize: 28, bold: true,
    fontFace: "Calibri", align: "center"
  });

  s.addText("Autant partager ce que j'ai trouvé — pour vous, gratuitement.\nTous les deux jours, un post.\nSimple, sourcé, utile.", {
    x: 1.0, y: 4.7, w: 8, h: 2.5,
    color: "9EB8D0", fontSize: 17,
    fontFace: "Calibri", align: "center"
  });

  s.addText("Dites-moi ce que vous en pensez 👇", {
    x: 0.5, y: 7.4, w: 9, h: 0.7,
    color: "F5A623", fontSize: 16, bold: true,
    fontFace: "Calibri", align: "center"
  });

  addHandle(s);
}

// ─── SLIDE 6 — QUESTION ──────────────────────
{
  const s = pres.addSlide();
  s.background = { color: "1B2A4A" };
  addTopBar(s);
  addTag(s);

  s.addText("Et vous,\nvous avez déjà essayé ?", {
    x: 0.5, y: 2.7, w: 9, h: 2.8,
    color: "FFFFFF", fontSize: 36, bold: true,
    fontFace: "Calibri", align: "center"
  });

  s.addText("Qu'est-ce qui vous retient — ou qu'est-ce qui vous a convaincu ?", {
    x: 0.8, y: 5.8, w: 8.4, h: 1.4,
    color: "9EB8D0", fontSize: 17,
    fontFace: "Calibri", align: "center"
  });

  s.addShape(pres.shapes.OVAL, {
    x: 8.8, y: 8.8, w: 0.7, h: 0.7,
    fill: { color: "F5A623", transparency: 85 },
    line: { color: "F5A623", width: 1, transparency: 65 }
  });

  s.addText("Sources : Plan « Osez l'IA » — DGE  ·  109 Md€ — Le Monde  ·  15 M Français — Clubic  ·  Freins — EFIMOVE  ·  Limites IA — Aivancity", {
    x: 0.5, y: 9.1, w: 9, h: 0.3,
    color: "5C7A96", fontSize: 8, margin: 0
  });

  addHandle(s);
}

// ─── Export ──────────────────────────────────
pres.writeFile({
  fileName: "c:/Users/DELL/Desktop/test claude/projects/atelier-des-automates/les-copains/posts/post_01_briser_la_glace.pptx"
})
.then(() => console.log("✅ post_01_briser_la_glace.pptx créé avec succès !"))
.catch(err => console.error("❌ Erreur :", err));
