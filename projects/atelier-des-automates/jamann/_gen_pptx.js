const pptxgen = require("pptxgenjs");

let pres = new pptxgen();
pres.layout = 'LAYOUT_16x9';
pres.author = 'Clockwork Ops';
pres.title = 'Le Manoïre — Col de Jaman';

// ─── Palette ───────────────────────────────────────────────────────────────
const BORDEAUX  = "4B0F1F";
const OCRE      = "C58632";
const ORANGE    = "E06530";
const CREME     = "FBFBF8";
const WARM      = "EFE5DB";
const DARK_TEXT = "2C1810";
const MID_TEXT  = "7A4A30";
const makeShadow = () => ({ type: "outer", blur: 8, offset: 2, angle: 135, color: "000000", opacity: 0.10 });

// ══════════════════════════════════════════════════════════════════════════
// SLIDE 1 — COUVERTURE
// ══════════════════════════════════════════════════════════════════════════
let s1 = pres.addSlide();
s1.background = { color: BORDEAUX };

// Cercle décoratif haut-droit
s1.addShape(pres.shapes.OVAL, {
  x: 7.2, y: -1.8, w: 5, h: 5,
  fill: { color: "5C1A2E" }, line: { color: "5C1A2E" }
});
// Bande gauche ocre
s1.addShape(pres.shapes.RECTANGLE, {
  x: 0, y: 0, w: 0.35, h: 5.625,
  fill: { color: OCRE }, line: { color: OCRE }
});

// Badge altitude
s1.addShape(pres.shapes.RECTANGLE, {
  x: 0.65, y: 0.55, w: 1.5, h: 0.38,
  fill: { color: OCRE }, line: { color: OCRE }
});
s1.addText("1 5 1 2 m", {
  x: 0.65, y: 0.54, w: 1.5, h: 0.4,
  fontSize: 11, bold: true, color: BORDEAUX,
  align: "center", valign: "middle", margin: 0, charSpacing: 2
});

// Titre principal
s1.addText("Le Manoïre", {
  x: 0.65, y: 1.25, w: 8.5, h: 1.5,
  fontSize: 62, bold: true, color: CREME,
  fontFace: "Georgia", margin: 0
});

// Sous-titre
s1.addText("Col de Jaman  ·  Montreux  ·  Vaud, Suisse", {
  x: 0.65, y: 2.85, w: 7.5, h: 0.45,
  fontSize: 14, color: OCRE, fontFace: "Calibri",
  margin: 0, charSpacing: 2
});

// Tagline
s1.addText("« Au-dessus du lac, au-dessus du bruit, au-dessus du temps. »", {
  x: 0.65, y: 3.5, w: 8.0, h: 0.6,
  fontSize: 15, italic: true, color: "F0D4B8",
  fontFace: "Georgia", margin: 0
});

// Ouverture
s1.addText("Renaissance · Fin juin 2026", {
  x: 0.65, y: 4.7, w: 5, h: 0.4,
  fontSize: 12, color: "B09070", fontFace: "Calibri",
  margin: 0, charSpacing: 1
});

// ══════════════════════════════════════════════════════════════════════════
// SLIDE 2 — CHRONOLOGIE
// ══════════════════════════════════════════════════════════════════════════
let s2 = pres.addSlide();
s2.background = { color: CREME };

s2.addShape(pres.shapes.RECTANGLE, {
  x: 0, y: 0, w: 0.35, h: 5.625,
  fill: { color: OCRE }, line: { color: OCRE }
});
s2.addText("Chronologie", {
  x: 0.65, y: 0.28, w: 8, h: 0.6,
  fontSize: 32, bold: true, color: BORDEAUX, fontFace: "Georgia", margin: 0
});
s2.addText("125 ans d'histoire au col", {
  x: 0.65, y: 0.88, w: 7, h: 0.32,
  fontSize: 12, italic: true, color: MID_TEXT, fontFace: "Calibri", margin: 0
});

const events = [
  { year: "1900",        color: OCRE,    text: "Fondations. Une fromagerie d'alpage en madriers de mélèze est bâtie au col." },
  { year: "Années 40",   color: ORANGE,  text: "Ruth & Fred Buser transforment la fromagerie en café-restaurant mythique." },
  { year: "Années 2010", color: OCRE,    text: "Chef étoilé Michelin Frédéric Médigue (Paris, Tokyo, Hong Kong…) reprend l'établissement." },
  { year: "2023",        color: MID_TEXT,text: "Bâtiment déclaré impropre. Renommé « Le Mano ». Food truck temporaire à l'extérieur." },
  { year: "2024",        color: ORANGE,  text: "Micka Moreau remporte l'appel d'offres. Usufruit 40 ans · 1 CHF symbolique. Vote : 72-0-1." },
  { year: "Juin 2026",   color: BORDEAUX,text: "Retour au nom originel Le Manoïre. Réouverture après travaux de rénovation." },
];

const tlStartY = 1.35;
const tlRowH   = 0.67;

events.forEach((ev, i) => {
  const y = tlStartY + i * tlRowH;
  // Dot
  s2.addShape(pres.shapes.OVAL, {
    x: 0.65, y: y + 0.05, w: 0.18, h: 0.18,
    fill: { color: ev.color }, line: { color: ev.color }
  });
  // Ligne verticale connectrice
  if (i < events.length - 1) {
    s2.addShape(pres.shapes.LINE, {
      x: 0.735, y: y + 0.23, w: 0, h: tlRowH - 0.23,
      line: { color: "D4C5B5", width: 1 }
    });
  }
  // Badge année
  s2.addShape(pres.shapes.RECTANGLE, {
    x: 1.05, y: y, w: 1.1, h: 0.27,
    fill: { color: ev.color }, line: { color: ev.color }
  });
  s2.addText(ev.year, {
    x: 1.05, y: y - 0.01, w: 1.1, h: 0.28,
    fontSize: 9, bold: true, color: "FFFFFF",
    align: "center", valign: "middle", margin: 0
  });
  // Texte
  s2.addText(ev.text, {
    x: 2.3, y: y - 0.02, w: 7.35, h: 0.45,
    fontSize: 11.5, color: DARK_TEXT, fontFace: "Calibri",
    valign: "middle", margin: 0
  });
});

// ══════════════════════════════════════════════════════════════════════════
// SLIDE 3 — LE LIEU
// ══════════════════════════════════════════════════════════════════════════
let s3 = pres.addSlide();
s3.background = { color: WARM };

s3.addShape(pres.shapes.RECTANGLE, {
  x: 0, y: 0, w: 0.35, h: 5.625,
  fill: { color: BORDEAUX }, line: { color: BORDEAUX }
});
s3.addText("Le lieu", {
  x: 0.65, y: 0.28, w: 8, h: 0.6,
  fontSize: 32, bold: true, color: BORDEAUX, fontFace: "Georgia", margin: 0
});
s3.addText("Col de Jaman · 1512m · Parc naturel régional Gruyère Pays-d'Enhaut", {
  x: 0.65, y: 0.88, w: 9.1, h: 0.32,
  fontSize: 12, italic: true, color: MID_TEXT, fontFace: "Calibri", margin: 0
});

// Carte gauche — Panorama
s3.addShape(pres.shapes.RECTANGLE, {
  x: 0.65, y: 1.4, w: 4.1, h: 3.75,
  fill: { color: "FFFFFF" }, line: { color: "E8D8C8" },
  shadow: makeShadow()
});
s3.addShape(pres.shapes.RECTANGLE, {
  x: 0.65, y: 1.4, w: 4.1, h: 0.42,
  fill: { color: OCRE }, line: { color: OCRE }
});
s3.addText("Double panorama", {
  x: 0.65, y: 1.39, w: 4.1, h: 0.44,
  fontSize: 13, bold: true, color: "FFFFFF",
  align: "center", valign: "middle", fontFace: "Georgia", margin: 0
});

const panItems = [
  { icon: "🏔️ Côté nord", body: "Lac Léman et Riviera vaudoise\nVue plongeante sur Montreux depuis 1512m" },
  { icon: "🌿 Côté sud",  body: "Vallée de la Gruyère\nLes Préalpes fribourgoises à l'horizon" },
  { icon: "🪵 Bâtiment",  body: "Chalet en madriers de mélèze centenaires\n80 places en salle + 80 en terrasse" },
];
panItems.forEach((item, i) => {
  const y = 2.02 + i * 1.0;
  s3.addText(item.icon, {
    x: 0.85, y, w: 3.7, h: 0.28,
    fontSize: 11, bold: true, color: OCRE, margin: 0
  });
  s3.addText(item.body, {
    x: 0.85, y: y + 0.3, w: 3.7, h: 0.55,
    fontSize: 11, color: DARK_TEXT, fontFace: "Calibri", margin: 0
  });
});

// Carte droite — Accès
s3.addShape(pres.shapes.RECTANGLE, {
  x: 5.05, y: 1.4, w: 4.6, h: 3.75,
  fill: { color: "FFFFFF" }, line: { color: "E8D8C8" },
  shadow: makeShadow()
});
s3.addShape(pres.shapes.RECTANGLE, {
  x: 5.05, y: 1.4, w: 4.6, h: 0.42,
  fill: { color: BORDEAUX }, line: { color: BORDEAUX }
});
s3.addText("Accès & infos pratiques", {
  x: 5.05, y: 1.39, w: 4.6, h: 0.44,
  fontSize: 13, bold: true, color: "FFFFFF",
  align: "center", valign: "middle", fontFace: "Georgia", margin: 0
});

const accessItems = [
  { icon: "🚂 Train MOB",  body: "Crémaillère Montreux–Oberland bernois\ndepuis Montreux via Les Avants" },
  { icon: "🚗 Voiture",    body: "Route de montagne via Chamby, Caux\nou Les Avants" },
  { icon: "📍 Altitude",   body: "1512m dans les Préalpes vaudoises" },
  { icon: "📏 Capacité",   body: "80 places en salle · 80 en terrasse" },
];
accessItems.forEach((item, i) => {
  const y = 2.02 + i * 0.83;
  s3.addText(item.icon, {
    x: 5.25, y, w: 4.2, h: 0.28,
    fontSize: 11, bold: true, color: BORDEAUX, margin: 0
  });
  s3.addText(item.body, {
    x: 5.25, y: y + 0.3, w: 4.2, h: 0.42,
    fontSize: 11, color: DARK_TEXT, fontFace: "Calibri", margin: 0
  });
});

// ══════════════════════════════════════════════════════════════════════════
// SLIDE 4 — RANDONNÉES
// ══════════════════════════════════════════════════════════════════════════
let s4 = pres.addSlide();
s4.background = { color: CREME };

s4.addShape(pres.shapes.RECTANGLE, {
  x: 0, y: 0, w: 0.35, h: 5.625,
  fill: { color: OCRE }, line: { color: OCRE }
});
s4.addText("Randonnées", {
  x: 0.65, y: 0.28, w: 8, h: 0.6,
  fontSize: 32, bold: true, color: BORDEAUX, fontFace: "Georgia", margin: 0
});
s4.addText("Le col de Jaman — carrefour incontournable entre la Riviera et les Préalpes", {
  x: 0.65, y: 0.88, w: 9.1, h: 0.32,
  fontSize: 12, italic: true, color: MID_TEXT, fontFace: "Calibri", margin: 0
});

const hikes = [
  {
    title: "Dent de Jaman",
    alt: "1875m",
    color: OCRE,
    details: [
      "Silhouette en canine, visible depuis toute la Riviera",
      "Sentier part directement derrière le restaurant",
      "Passages équipés de chaînes",
      "Vue 360° : Léman, Dents du Midi, Jura",
    ]
  },
  {
    title: "Rochers de Naye",
    alt: "2042m",
    color: ORANGE,
    details: [
      "Grande traversée depuis le col",
      "Parc de marmottes au sommet",
      "Grottes de Naye sur le parcours",
      "Retour possible en train MOB",
    ]
  },
  {
    title: "Circuit classique",
    alt: "T2 · 8 km · +1175 m · ~4h",
    color: BORDEAUX,
    details: [
      "Les Avants → Col de Jaman",
      "→ Rochers de Naye",
      "Saison : juin à octobre",
      "Le col = halte centrale obligée",
    ]
  },
];

hikes.forEach((hike, i) => {
  const x = 0.65 + i * 3.0;
  const cardW = 2.8;
  s4.addShape(pres.shapes.RECTANGLE, {
    x, y: 1.4, w: cardW, h: 3.8,
    fill: { color: "FFFFFF" }, line: { color: "E8D8C8" },
    shadow: makeShadow()
  });
  s4.addShape(pres.shapes.RECTANGLE, {
    x, y: 1.4, w: cardW, h: 0.75,
    fill: { color: hike.color }, line: { color: hike.color }
  });
  s4.addText(hike.title, {
    x: x + 0.1, y: 1.41, w: cardW - 0.2, h: 0.42,
    fontSize: 15, bold: true, color: "FFFFFF",
    fontFace: "Georgia", align: "center", valign: "middle", margin: 0
  });
  s4.addText(hike.alt, {
    x: x + 0.1, y: 1.82, w: cardW - 0.2, h: 0.3,
    fontSize: 10.5, color: "FFFFFF", italic: true,
    align: "center", fontFace: "Calibri", margin: 0
  });
  hike.details.forEach((detail, j) => {
    // Bullet dot
    s4.addShape(pres.shapes.OVAL, {
      x: x + 0.18, y: 2.4 + j * 0.72 + 0.08,
      w: 0.1, h: 0.1,
      fill: { color: hike.color }, line: { color: hike.color }
    });
    s4.addText(detail, {
      x: x + 0.35, y: 2.38 + j * 0.72, w: cardW - 0.45, h: 0.55,
      fontSize: 11, color: DARK_TEXT, fontFace: "Calibri", margin: 0
    });
  });
});

// ══════════════════════════════════════════════════════════════════════════
// SLIDE 5 — FROMAGERIE
// ══════════════════════════════════════════════════════════════════════════
let s5 = pres.addSlide();
s5.background = { color: WARM };

s5.addShape(pres.shapes.RECTANGLE, {
  x: 0, y: 0, w: 0.35, h: 5.625,
  fill: { color: ORANGE }, line: { color: ORANGE }
});
s5.addText("La fromagerie voisine", {
  x: 0.65, y: 0.28, w: 8, h: 0.6,
  fontSize: 32, bold: true, color: BORDEAUX, fontFace: "Georgia", margin: 0
});
s5.addText("Société des Alpages de Jaman — littéralement à côté de la porte du Manoïre", {
  x: 0.65, y: 0.88, w: 9.1, h: 0.32,
  fontSize: 12, italic: true, color: MID_TEXT, fontFace: "Calibri", margin: 0
});

// 4 stat cards
const stats = [
  { num: "1944",  label: "Fondation\nfromagerie", color: OCRE },
  { num: "2000+", label: "Visiteurs\npar saison",  color: ORANGE },
  { num: "1 CHF", label: "Bail\nsymbolique",       color: BORDEAUX },
  { num: "40 ans",label: "Durée\nd'usufruit",       color: OCRE },
];
stats.forEach((stat, i) => {
  const x = 0.65 + i * 2.3;
  s5.addShape(pres.shapes.RECTANGLE, {
    x, y: 1.45, w: 2.1, h: 1.55,
    fill: { color: stat.color }, line: { color: stat.color },
    shadow: makeShadow()
  });
  s5.addText(stat.num, {
    x: x + 0.1, y: 1.5, w: 1.9, h: 0.85,
    fontSize: 30, bold: true, color: "FFFFFF",
    align: "center", fontFace: "Georgia", margin: 0
  });
  s5.addText(stat.label, {
    x: x + 0.1, y: 2.28, w: 1.9, h: 0.62,
    fontSize: 11, color: "FFFFFF",
    align: "center", fontFace: "Calibri", margin: 0
  });
});

// Bloc description
s5.addShape(pres.shapes.RECTANGLE, {
  x: 0.65, y: 3.2, w: 9.1, h: 2.1,
  fill: { color: "FFFFFF" }, line: { color: "E8D8C8" },
  shadow: makeShadow()
});
s5.addText([
  { text: "La Société des Alpages de Jaman ", options: { bold: true } },
  { text: "gère une fromagerie de démonstration dans un chalet communal tout à côté du Manoïre — active depuis 1944.\n" },
  { text: "\nOn y voit la fabrication artisanale de la " },
  { text: "tomme de Jaman", options: { bold: true } },
  { text: ". Les vaches paissent dans les alpages autour. En automne, la " },
  { text: "Désalpe", options: { bold: true, italic: true } },
  { text: " (descente des troupeaux) transforme le col en fête.\n" },
  { text: "\nPour Micka, le terroir est littéralement à portée de main.", options: { italic: true } },
], {
  x: 0.9, y: 3.3, w: 8.6, h: 1.85,
  fontSize: 12.5, color: DARK_TEXT, fontFace: "Calibri", valign: "top"
});

// ══════════════════════════════════════════════════════════════════════════
// SLIDE 6 — CUISINE
// ══════════════════════════════════════════════════════════════════════════
let s6 = pres.addSlide();
s6.background = { color: CREME };

s6.addShape(pres.shapes.RECTANGLE, {
  x: 0, y: 0, w: 0.35, h: 5.625,
  fill: { color: OCRE }, line: { color: OCRE }
});
s6.addText("La cuisine", {
  x: 0.65, y: 0.28, w: 8, h: 0.6,
  fontSize: 32, bold: true, color: BORDEAUX, fontFace: "Georgia", margin: 0
});
s6.addText("Plats typiques de montagne · Producteurs locaux · Prix raisonnables", {
  x: 0.65, y: 0.88, w: 9.1, h: 0.32,
  fontSize: 12, italic: true, color: MID_TEXT, fontFace: "Calibri", margin: 0
});

const dishes = [
  { icon: "🧀", name: "Tomme fraîche",       desc: "D'alpage, production locale\nSociété des Alpages de Jaman" },
  { icon: "🔥", name: "Raclette",             desc: "Au feu de bois\nTradition suisse authentique" },
  { icon: "🥔", name: "Rösti",                desc: "Montagnard et généreux\nRecette de l'alpage" },
  { icon: "🫕", name: "Fondue",               desc: "Maison, fromages artisans\nsuisses identifiés par Micka" },
  { icon: "🥩", name: "Viandes & charcuteries", desc: "Artisans suisses locaux\nProducteurs connus de Micka" },
  { icon: "📋", name: "Menu ardoise",          desc: "Renouvelé selon saison\net arrivages locaux" },
];

dishes.forEach((d, i) => {
  const col = i % 3;
  const row = Math.floor(i / 3);
  const x = 0.65 + col * 3.12;
  const y = 1.42 + row * 1.95;
  const accent = col === 0 ? OCRE : col === 1 ? ORANGE : BORDEAUX;

  s6.addShape(pres.shapes.RECTANGLE, {
    x, y, w: 2.92, h: 1.78,
    fill: { color: "FFFFFF" }, line: { color: "E8D8C8" },
    shadow: makeShadow()
  });
  // Left accent
  s6.addShape(pres.shapes.RECTANGLE, {
    x, y, w: 0.08, h: 1.78,
    fill: { color: accent }, line: { color: accent }
  });
  s6.addText(d.icon + "  " + d.name, {
    x: x + 0.2, y: y + 0.18, w: 2.6, h: 0.38,
    fontSize: 12.5, bold: true, color: BORDEAUX, fontFace: "Georgia", margin: 0
  });
  s6.addText(d.desc, {
    x: x + 0.2, y: y + 0.65, w: 2.6, h: 0.88,
    fontSize: 11, color: MID_TEXT, fontFace: "Calibri", margin: 0
  });
});

// ══════════════════════════════════════════════════════════════════════════
// SLIDE 7 — LA RENAISSANCE
// ══════════════════════════════════════════════════════════════════════════
let s7 = pres.addSlide();
s7.background = { color: BORDEAUX };

s7.addShape(pres.shapes.OVAL, {
  x: 6.8, y: 2.2, w: 5.5, h: 5.5,
  fill: { color: "5C1A2E" }, line: { color: "5C1A2E" }
});
s7.addShape(pres.shapes.RECTANGLE, {
  x: 0, y: 0, w: 0.35, h: 5.625,
  fill: { color: OCRE }, line: { color: OCRE }
});

s7.addText("La renaissance", {
  x: 0.65, y: 0.28, w: 8, h: 0.6,
  fontSize: 32, bold: true, color: OCRE, fontFace: "Georgia", margin: 0
});
s7.addText("Michaël « Micka » Moreau — le nouveau gardien du col", {
  x: 0.65, y: 0.88, w: 8.5, h: 0.32,
  fontSize: 13, italic: true, color: "F0D4B8", fontFace: "Calibri", margin: 0
});

const mickaItems = [
  { label: "Parcours",   text: "Ex-maître de salle aux Trois Sifflets (restaurant gastronomique, Vevey)" },
  { label: "Sélection",  text: "Remporte l'appel d'offres de la Commune de Montreux en 2024" },
  { label: "Conditions", text: "Usufruit 40 ans · 1 CHF symbolique · 18 000 CHF/an · Vote : 72-0-1" },
  { label: "Engagement", text: "Vit sur place · Travaux menés personnellement · Ouverture fin juin 2026" },
];
mickaItems.forEach((item, i) => {
  const y = 1.55 + i * 0.82;
  s7.addShape(pres.shapes.RECTANGLE, {
    x: 0.65, y: y, w: 1.35, h: 0.3,
    fill: { color: OCRE }, line: { color: OCRE }
  });
  s7.addText(item.label, {
    x: 0.65, y: y - 0.01, w: 1.35, h: 0.32,
    fontSize: 10, bold: true, color: BORDEAUX,
    align: "center", valign: "middle", margin: 0
  });
  s7.addText(item.text, {
    x: 2.15, y: y, w: 6.8, h: 0.55,
    fontSize: 13, color: CREME, fontFace: "Calibri", valign: "middle", margin: 0
  });
});

// Citation philosophie
s7.addShape(pres.shapes.RECTANGLE, {
  x: 0.65, y: 4.62, w: 0.06, h: 0.72,
  fill: { color: OCRE }, line: { color: OCRE }
});
s7.addText("« Transmettre plutôt que conceptualiser.\nPas pour une saison. Pour des décennies. »", {
  x: 0.88, y: 4.5, w: 8.7, h: 0.9,
  fontSize: 14, italic: true, color: OCRE, fontFace: "Georgia", margin: 0
});

// ══════════════════════════════════════════════════════════════════════════
// SLIDE 8 — SOURCES
// ══════════════════════════════════════════════════════════════════════════
let s8 = pres.addSlide();
s8.background = { color: "1A0A10" };

s8.addShape(pres.shapes.RECTANGLE, {
  x: 0, y: 0, w: 0.35, h: 5.625,
  fill: { color: OCRE }, line: { color: OCRE }
});
s8.addText("Sources", {
  x: 0.65, y: 0.28, w: 8, h: 0.58,
  fontSize: 28, bold: true, color: OCRE, fontFace: "Georgia", margin: 0
});
s8.addText("Document compilé le 1er juin 2026", {
  x: 0.65, y: 0.85, w: 7, h: 0.3,
  fontSize: 11, italic: true, color: "B09070", fontFace: "Calibri", margin: 0
});

const sources = [
  { site: "lemanoire-jaman.ch",  desc: "Site officiel du projet",                                        url: "https://lemanoire-jaman.ch" },
  { site: "mymontreux.ch",       desc: "« La nouvelle existence de l'emblématique Manoïre »",             url: "https://mymontreux.ch/news/la-nouvelle-existence-de-lemblematique-manoire/" },
  { site: "24heures.ch",         desc: "« Un chef étoilé reprend le Manoïre à Jaman »",                  url: "https://www.24heures.ch" },
  { site: "buvettes-alpage.ch",  desc: "Fiche Le Mano — capacité, accès, spécialités",                   url: "https://www.buvettes-alpage.ch/manoire" },
  { site: "randonnees.ch",       desc: "Circuit Les Avants – Col de Jaman – Rochers de Naye",             url: "https://www.randonnees.ch/" },
  { site: "alltrails.com",       desc: "Col de Jaman – Dent de Jaman (341 avis)",                         url: "https://www.alltrails.com/" },
  { site: "mymontreux.ch",       desc: "Fabrication du fromage de Jaman — Société des Alpages",           url: "https://mymontreux.ch/montreux-en-images/fabrication-du-fromage-de-jaman/" },
];

sources.forEach((src, i) => {
  const y = 1.28 + i * 0.57;
  s8.addShape(pres.shapes.OVAL, {
    x: 0.65, y: y + 0.07, w: 0.14, h: 0.14,
    fill: { color: OCRE }, line: { color: OCRE }
  });
  s8.addText(src.site, {
    x: 0.9, y, w: 2.1, h: 0.3,
    fontSize: 11, bold: true, color: OCRE, margin: 0
  });
  s8.addText(src.desc, {
    x: 3.1, y, w: 6.5, h: 0.3,
    fontSize: 11, color: "D4C0A8", fontFace: "Calibri", margin: 0
  });
  s8.addText(src.url, {
    x: 0.9, y: y + 0.3, w: 8.7, h: 0.22,
    fontSize: 9, color: "8A7060", fontFace: "Calibri", margin: 0
  });
});

// ══════════════════════════════════════════════════════════════════════════
// WRITE
// ══════════════════════════════════════════════════════════════════════════
pres.writeFile({ fileName: "LeManoire-Col-de-Jaman.pptx" })
  .then(() => console.log("OK LeManoire-Col-de-Jaman.pptx"))
  .catch(e => { console.error(e); process.exit(1); });
