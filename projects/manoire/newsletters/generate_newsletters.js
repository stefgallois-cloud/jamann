const {
  Document, Packer, Paragraph, TextRun, ExternalHyperlink,
  Header, Footer, AlignmentType, HeadingLevel, BorderStyle,
  WidthType, PageNumber, ImageRun, ShadingType
} = require('docx');
const fs = require('fs');
const path = require('path');

const ACCENT = "5C3A1E";   // brun chaud montagne
const LIGHT_LINE = "D6C9B8"; // séparateur couleur pierre

const logoPath = path.join(__dirname, '../charte_graphique/Le Manoïre_Logo 1_Couleur_px1000_sans.png');
const logoData = fs.readFileSync(logoPath);

function accroche(text) {
  return new Paragraph({
    spacing: { before: 80, after: 160 },
    children: [
      new TextRun({ text, bold: true, italics: true, size: 24, color: ACCENT })
    ]
  });
}

function body(text) {
  return new Paragraph({
    spacing: { before: 80, after: 80 },
    children: [new TextRun({ text, size: 22 })]
  });
}

function ps(text) {
  return new Paragraph({
    spacing: { before: 120, after: 80 },
    children: [new TextRun({ text, italics: true, size: 20, color: "666666" })]
  });
}

function cta(label, url) {
  return new Paragraph({
    spacing: { before: 120, after: 200 },
    children: [
      new ExternalHyperlink({
        link: url,
        children: [new TextRun({ text: label, bold: true, size: 22, color: "1155CC", underline: {} })]
      })
    ]
  });
}

function separator() {
  return new Paragraph({
    spacing: { before: 80, after: 80 },
    border: {
      bottom: { style: BorderStyle.SINGLE, size: 4, color: LIGHT_LINE, space: 1 }
    },
    children: []
  });
}

function newsletterHeading(num, title) {
  return new Paragraph({
    heading: HeadingLevel.HEADING_1,
    spacing: { before: 480, after: 160 },
    children: [
      new TextRun({ text: `Newsletter ${num} — `, size: 30, bold: true, color: ACCENT }),
      new TextRun({ text: title, size: 30, bold: true, color: "1A1A1A" })
    ]
  });
}

const newsletters = [
  {
    num: "1", title: "Bienvenue au Manoïre !",
    accroche: "Le Manoïre ouvre bientôt ses portes… et vous êtes sur la liste VIP !",
    paragraphs: [
      "Chers amis gourmands,",
      "On ne va pas se mentir : on trépigne d'impatience à l'idée de vous accueillir au Manoïre, notre repaire tout neuf au Col de Jaman, perché au-dessus de Montreux avec une vue sur le lac qui donne envie de tout quitter. Et on n'est pas les seuls — Anouck, notre Saint-Bernard maison, qui avait débarqué ici toute chiot il y a quelques mois, s'apprête à faire son grand retour. Double homecoming, double émotion.",
      "D'ici quelques semaines, la magie opère : cuisine créative, terroir du Chablais, et une équipe au sommet (littéralement) prête à vous chouchouter après vos randonnées. Restez connectés — on a encore des surprises dans les cartons…",
    ],
    ps: "PS : Un Bon Cadeau Fondateur avec 15% de remise pointe bientôt le bout de son museau. Anouck valide.",
    ctaLabel: "👉 Suivez l'aventure : www.lemanoire-jaman.ch",
    ctaUrl: "https://www.lemanoire-jaman.ch"
  },
  {
    num: "2", title: "Les Coulisses Gourmandes",
    accroche: "On vous révèle (presque) tous nos secrets !",
    paragraphs: [
      "Vous vous demandez ce qui mijote derrière les portes du Manoïre ? Entre fromages affinés du Chablais, herbes cueillies sur les hauteurs et fournisseurs locaux qu'on connaît par leur prénom, on construit quelque chose de vraiment ancré dans ce coin de montagne. Le chef chante faux, mais avec une passion totalement assumée.",
      "Et Anouck ? Elle supervise. Elle goûte. Elle donne son avis (non-verbal mais très expressif). Pour elle, un bon plat ça se sent — au sens propre.",
    ],
    ps: "Le Bon Cadeau Fondateur arrive… patience, randonneurs !",
    ctaLabel: "👉 www.lemanoire-jaman.ch",
    ctaUrl: "https://www.lemanoire-jaman.ch"
  },
  {
    num: "3", title: "Save the Date : Ouverture Imminente",
    accroche: "C'est officiel, la date approche !",
    paragraphs: [
      "Notez-le dans vos agendas, programmez une alerte, gravez-le dans la roche du Col si nécessaire : l'ouverture du Manoïre, c'est fin juin. On astique les verres, on finalise la carte, et Anouck fait ses valises depuis une semaine (elle est très organisée pour une Saint-Bernard).",
      "Le Col de Jaman vous attend — sentiers de randonnée, vue imprenable sur le Léman, et une table où souffler après l'effort. C'est ça, le programme parfait.",
    ],
    ps: "Le Bon Cadeau Fondateur est en route… encore un peu de patience !",
    ctaLabel: "👉 Réservez votre table dès l'ouverture : www.lemanoire-jaman.ch",
    ctaUrl: "https://www.lemanoire-jaman.ch"
  },
  {
    num: "4", title: "Le Bon Cadeau Magique (15% off)",
    accroche: "Le cadeau parfait existe (et il est en promo) !",
    paragraphs: [
      "C'est le moment de craquer — pour vous ou pour offrir. Notre Bon Cadeau Fondateur est disponible avec 15% de remise pour fêter l'ouverture du Manoïre. Parfait pour les amateurs de montagne qui méritent une bonne table après une journée sur les sentiers des Rochers de Naye ou du Tour du Lac. Parfait aussi pour tous ceux qui cherchent un cadeau original cet été.",
      "Quantités limitées — Anouck garde un œil sur le compteur.",
    ],
    ps: null,
    ctaLabel: "👉 Bon Cadeau Fondateur — Le Manoïre, Col de Jaman : www.lemanoire-jaman.ch",
    ctaUrl: "https://www.lemanoire-jaman.ch"
  },
  {
    num: "5", title: "Montreux, Manoïre et Vous",
    accroche: "Le terroir, c'est vous, c'est nous !",
    paragraphs: [
      "Au Manoïre, on est convaincus que la meilleure cuisine, c'est celle qui raconte un lieu. Et ce lieu, c'est le Col de Jaman — porte d'entrée des Alpes vaudoises, point de départ de randonnées mythiques, et belvédère naturel sur le lac Léman et les Alpes. Les producteurs du Chablais, les artisans de la région, les voisins du col : cette aventure, c'est la leur autant que la nôtre.",
      "Anouck, elle, est déjà convaincue. Elle connaît chaque sentier, chaque recoin, chaque odeur de fromage fondu qui monte de la cuisine.",
    ],
    ps: "Le Bon Cadeau Fondateur est toujours là pour les retardataires — 15% de remise, pas longtemps !",
    ctaLabel: "👉 www.lemanoire-jaman.ch",
    ctaUrl: "https://www.lemanoire-jaman.ch"
  },
  {
    num: "6", title: "Ouverture : On y est !",
    accroche: "Prêts pour l'aventure ?",
    paragraphs: [
      "Ça y est. Anouck est officiellement de retour au Col de Jaman. La porte du Manoïre est grande ouverte. On vous attend pour trinquer, savourer, et écrire ensemble les premières pages de cette belle histoire — vue sur le Léman comprise.",
      "Après une randonnée sur les hauteurs ou simplement pour le plaisir d'une belle table en montagne, c'est le moment. Merci pour votre soutien, votre enthousiasme, et votre gourmandise.",
      "Dernière chance pour profiter du Bon Cadeau Fondateur (15% de remise) :",
    ],
    ps: null,
    ctaLabel: "👉 www.lemanoire-jaman.ch",
    ctaUrl: "https://www.lemanoire-jaman.ch"
  }
];

function buildNewsletter(nl) {
  const blocks = [];
  blocks.push(newsletterHeading(nl.num, nl.title));
  blocks.push(accroche(nl.accroche));
  for (const p of nl.paragraphs) blocks.push(body(p));
  if (nl.ps) blocks.push(ps(nl.ps));
  blocks.push(cta(nl.ctaLabel, nl.ctaUrl));
  blocks.push(separator());
  return blocks;
}

const children = [
  new Paragraph({
    spacing: { before: 200, after: 100 },
    children: [
      new ImageRun({
        type: "png",
        data: logoData,
        transformation: { width: 120, height: 60 },
        altText: { title: "Logo Le Manoïre", description: "Logo Le Manoïre", name: "Logo" }
      })
    ]
  }),
  new Paragraph({
    spacing: { before: 160, after: 80 },
    children: [
      new TextRun({ text: "Série de 6 Newsletters", size: 36, bold: true, color: ACCENT }),
    ]
  }),
  new Paragraph({
    spacing: { before: 0, after: 80 },
    children: [
      new TextRun({ text: "Ouverture du Manoïre — Col de Jaman", size: 28, color: "555555" }),
    ]
  }),
  new Paragraph({
    spacing: { before: 0, after: 40 },
    children: [
      new TextRun({ text: "Document de validation — pour retour client", size: 20, italics: true, color: "888888" }),
    ]
  }),
  separator(),
  ...newsletters.flatMap(buildNewsletter)
];

const doc = new Document({
  styles: {
    default: { document: { run: { font: "Calibri", size: 22 } } },
    paragraphStyles: [
      {
        id: "Heading1", name: "Heading 1", basedOn: "Normal", next: "Normal", quickFormat: true,
        run: { size: 30, bold: true, font: "Calibri", color: ACCENT },
        paragraph: { spacing: { before: 400, after: 160 }, outlineLevel: 0 }
      }
    ]
  },
  sections: [{
    properties: {
      page: {
        size: { width: 11906, height: 16838 },
        margin: { top: 1418, right: 1418, bottom: 1418, left: 1418 }
      }
    },
    headers: {
      default: new Header({
        children: [new Paragraph({
          border: { bottom: { style: BorderStyle.SINGLE, size: 2, color: LIGHT_LINE, space: 1 } },
          children: [
            new TextRun({ text: "Le Manoïre — Col de Jaman", size: 18, color: "888888", italics: true })
          ]
        })]
      })
    },
    footers: {
      default: new Footer({
        children: [new Paragraph({
          border: { top: { style: BorderStyle.SINGLE, size: 2, color: LIGHT_LINE, space: 1 } },
          alignment: AlignmentType.CENTER,
          children: [
            new TextRun({ text: "www.lemanoire-jaman.ch  ·  Page ", size: 18, color: "888888" }),
            new TextRun({ children: [PageNumber.CURRENT], size: 18, color: "888888" }),
            new TextRun({ text: " / ", size: 18, color: "888888" }),
            new TextRun({ children: [PageNumber.TOTAL_PAGES], size: 18, color: "888888" }),
          ]
        })]
      })
    },
    children
  }]
});

const outPath = path.join(__dirname, 'newsletters_manoire.docx');
Packer.toBuffer(doc).then(buf => {
  fs.writeFileSync(outPath, buf);
  console.log('✓ Fichier généré :', outPath);
}).catch(err => {
  console.error('Erreur :', err);
  process.exit(1);
});
