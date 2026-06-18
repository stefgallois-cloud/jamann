from reportlab.lib.pagesizes import A4
from reportlab.lib.units import cm
from reportlab.lib import colors
from reportlab.lib.styles import ParagraphStyle
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, HRFlowable,
    KeepTogether, Image
)
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.platypus import PageTemplate, Frame
from reportlab.platypus.frames import Frame
import os

# --- Polices ---
FONTS = r"C:\Windows\Fonts"
pdfmetrics.registerFont(TTFont("Calibri",      os.path.join(FONTS, "calibri.ttf")))
pdfmetrics.registerFont(TTFont("CalibriBold",  os.path.join(FONTS, "calibrib.ttf")))
pdfmetrics.registerFont(TTFont("CalibriItalic",os.path.join(FONTS, "calibrii.ttf")))
pdfmetrics.registerFont(TTFont("CalibriBoldItalic", os.path.join(FONTS, "calibriz.ttf")))

# --- Couleurs ---
BRUN    = colors.HexColor("#5C3A1E")
PIERRE  = colors.HexColor("#D6C9B8")
GRIS    = colors.HexColor("#666666")
BLEU    = colors.HexColor("#1155CC")
NOIR    = colors.HexColor("#1A1A1A")

# --- Styles ---
def style(name, font="Calibri", size=11, color=NOIR, leading=None,
          spaceAfter=6, spaceBefore=0, align="LEFT", leftIndent=0):
    return ParagraphStyle(
        name=name, fontName=font, fontSize=size,
        textColor=color,
        leading=leading or size * 1.4,
        spaceAfter=spaceAfter, spaceBefore=spaceBefore,
        alignment={"LEFT": 0, "CENTER": 1, "RIGHT": 2, "JUSTIFY": 4}[align],
        leftIndent=leftIndent,
    )

S_TITLE     = style("title",    "CalibriBold",      22, BRUN,  leading=28, spaceAfter=4, spaceBefore=0)
S_SUBTITLE  = style("subtitle", "Calibri",          13, GRIS,  leading=18, spaceAfter=2)
S_META      = style("meta",     "CalibriItalic",    10, GRIS,  leading=14, spaceAfter=12)
S_NL_NUM    = style("nlnum",    "CalibriBold",      15, BRUN,  leading=20, spaceAfter=2, spaceBefore=18)
S_NL_TITLE  = style("nltitle",  "CalibriBold",      15, NOIR,  leading=20, spaceAfter=8)
S_ACCROCHE  = style("accroche", "CalibriBoldItalic",11, BRUN,  leading=16, spaceAfter=6, spaceBefore=2)
S_BODY      = style("body",     "Calibri",          11, NOIR,  leading=16, spaceAfter=5, align="JUSTIFY")
S_PS        = style("ps",       "CalibriItalic",    10, GRIS,  leading=15, spaceAfter=4, spaceBefore=4)
S_CTA       = style("cta",      "CalibriBold",      11, BLEU,  leading=16, spaceAfter=10, spaceBefore=4)
S_HEADER    = style("header",   "CalibriItalic",    9,  GRIS,  leading=12)
S_FOOTER    = style("footer",   "Calibri",          9,  GRIS,  leading=12, align="CENTER")

# --- Données ---
NEWSLETTERS = [
    {
        "num": "1", "title": "Bienvenue au Manoïre !",
        "accroche": "Le Manoïre ouvre bientôt ses portes… et vous êtes sur la liste VIP !",
        "paragraphs": [
            "Chers amis gourmands,",
            "On ne va pas se mentir : on trépigne d'impatience à l'idée de vous accueillir au Manoïre, "
            "notre repaire tout neuf au Col de Jaman, perché au-dessus de Montreux avec une vue sur le lac "
            "qui donne envie de tout quitter. Et on n'est pas les seuls — Anouck, notre Saint-Bernard maison, "
            "qui avait débarqué ici toute chiot il y a quelques mois, s'apprête à faire son grand retour. "
            "Double homecoming, double émotion.",
            "D'ici quelques semaines, la magie opère : cuisine créative, terroir du Chablais, et une équipe "
            "au sommet (littéralement) prête à vous chouchouter après vos randonnées. Restez connectés — "
            "on a encore des surprises dans les cartons…",
        ],
        "ps": "PS : Un Bon Cadeau Fondateur avec 15% de remise pointe bientôt le bout de son museau. Anouck valide.",
        "cta": "👉  Suivez l'aventure : www.lemanoire-jaman.ch",
    },
    {
        "num": "2", "title": "Les Coulisses Gourmandes",
        "accroche": "On vous révèle (presque) tous nos secrets !",
        "paragraphs": [
            "Vous vous demandez ce qui mijote derrière les portes du Manoïre ? Entre fromages affinés du Chablais, "
            "herbes cueillies sur les hauteurs et fournisseurs locaux qu'on connaît par leur prénom, on construit "
            "quelque chose de vraiment ancré dans ce coin de montagne. Le chef chante faux, mais avec une passion "
            "totalement assumée.",
            "Et Anouck ? Elle supervise. Elle goûte. Elle donne son avis (non-verbal mais très expressif). "
            "Pour elle, un bon plat ça se sent — au sens propre.",
        ],
        "ps": "Le Bon Cadeau Fondateur arrive… patience, randonneurs !",
        "cta": "👉  www.lemanoire-jaman.ch",
    },
    {
        "num": "3", "title": "Save the Date : Ouverture Imminente",
        "accroche": "C'est officiel, la date approche !",
        "paragraphs": [
            "Notez-le dans vos agendas, programmez une alerte, gravez-le dans la roche du Col si nécessaire : "
            "l'ouverture du Manoïre, c'est fin juin. On astique les verres, on finalise la carte, et Anouck fait "
            "ses valises depuis une semaine (elle est très organisée pour une Saint-Bernard).",
            "Le Col de Jaman vous attend — sentiers de randonnée, vue imprenable sur le Léman, et une table où "
            "souffler après l'effort. C'est ça, le programme parfait.",
        ],
        "ps": "Le Bon Cadeau Fondateur est en route… encore un peu de patience !",
        "cta": "👉  Réservez votre table dès l'ouverture : www.lemanoire-jaman.ch",
    },
    {
        "num": "4", "title": "Le Bon Cadeau Magique (15% off)",
        "accroche": "Le cadeau parfait existe (et il est en promo) !",
        "paragraphs": [
            "C'est le moment de craquer — pour vous ou pour offrir. Notre Bon Cadeau Fondateur est disponible "
            "avec 15% de remise pour fêter l'ouverture du Manoïre. Parfait pour les amateurs de montagne qui "
            "méritent une bonne table après une journée sur les sentiers des Rochers de Naye ou du Tour du Lac. "
            "Parfait aussi pour tous ceux qui cherchent un cadeau original cet été.",
            "Quantités limitées — Anouck garde un œil sur le compteur.",
        ],
        "ps": None,
        "cta": "👉  Bon Cadeau Fondateur — Le Manoïre, Col de Jaman : www.lemanoire-jaman.ch",
    },
    {
        "num": "5", "title": "Montreux, Manoïre et Vous",
        "accroche": "Le terroir, c'est vous, c'est nous !",
        "paragraphs": [
            "Au Manoïre, on est convaincus que la meilleure cuisine, c'est celle qui raconte un lieu. Et ce lieu, "
            "c'est le Col de Jaman — porte d'entrée des Alpes vaudoises, point de départ de randonnées mythiques, "
            "et belvédère naturel sur le lac Léman et les Alpes. Les producteurs du Chablais, les artisans de la "
            "région, les voisins du col : cette aventure, c'est la leur autant que la nôtre.",
            "Anouck, elle, est déjà convaincue. Elle connaît chaque sentier, chaque recoin, chaque odeur de "
            "fromage fondu qui monte de la cuisine.",
        ],
        "ps": "Le Bon Cadeau Fondateur est toujours là pour les retardataires — 15% de remise, pas longtemps !",
        "cta": "👉  www.lemanoire-jaman.ch",
    },
    {
        "num": "6", "title": "Ouverture : On y est !",
        "accroche": "Prêts pour l'aventure ?",
        "paragraphs": [
            "Ça y est. Anouck est officiellement de retour au Col de Jaman. La porte du Manoïre est grande ouverte. "
            "On vous attend pour trinquer, savourer, et écrire ensemble les premières pages de cette belle histoire "
            "— vue sur le Léman comprise.",
            "Après une randonnée sur les hauteurs ou simplement pour le plaisir d'une belle table en montagne, "
            "c'est le moment. Merci pour votre soutien, votre enthousiasme, et votre gourmandise.",
            "Dernière chance pour profiter du Bon Cadeau Fondateur (15% de remise) :",
        ],
        "ps": None,
        "cta": "👉  www.lemanoire-jaman.ch",
    },
]

# --- En-tête / Pied de page ---
def header_footer(canvas, doc):
    canvas.saveState()
    w, h = A4
    margin = 2 * cm

    # En-tête
    canvas.setFont("CalibriItalic", 9)
    canvas.setFillColor(GRIS)
    canvas.drawString(margin, h - 1.4 * cm, "Le Manoïre — Col de Jaman")
    canvas.setStrokeColor(PIERRE)
    canvas.setLineWidth(0.5)
    canvas.line(margin, h - 1.6 * cm, w - margin, h - 1.6 * cm)

    # Pied de page
    canvas.line(margin, 1.6 * cm, w - margin, 1.6 * cm)
    canvas.setFont("Calibri", 9)
    footer_text = f"www.lemanoire-jaman.ch  ·  Page {doc.page}"
    canvas.drawCentredString(w / 2, 1.0 * cm, footer_text)

    canvas.restoreState()


# --- Construction du document ---
LOGO = os.path.join(os.path.dirname(__file__),
                    "../charte_graphique/Le Manoïre_Logo 1_Couleur_px1000_sans.png")
OUT  = os.path.join(os.path.dirname(__file__), "newsletters_manoire.pdf")

doc = SimpleDocTemplate(
    OUT,
    pagesize=A4,
    topMargin=2.2 * cm,
    bottomMargin=2.2 * cm,
    leftMargin=2.5 * cm,
    rightMargin=2.5 * cm,
    title="Newsletters Le Manoïre — Ouverture",
    author="Clockwork Ops",
)

story = []

# --- Page de titre ---
if os.path.exists(LOGO):
    img = Image(LOGO, width=5 * cm, height=2.5 * cm, hAlign="LEFT")
    story.append(img)
    story.append(Spacer(1, 0.5 * cm))

story.append(Paragraph("Série de 6 Newsletters", S_TITLE))
story.append(Paragraph("Ouverture du Manoïre — Col de Jaman", S_SUBTITLE))
story.append(Spacer(1, 0.2 * cm))
story.append(Paragraph("Document de validation — pour retour client", S_META))
story.append(HRFlowable(width="100%", thickness=1, color=PIERRE, spaceAfter=20))

# --- Newsletters ---
for nl in NEWSLETTERS:
    block = []
    block.append(Paragraph(f"Newsletter {nl['num']} — {nl['title']}", S_NL_NUM))
    block.append(HRFlowable(width="40%", thickness=1, color=BRUN, spaceAfter=6))
    block.append(Paragraph(nl["accroche"], S_ACCROCHE))
    for p in nl["paragraphs"]:
        block.append(Paragraph(p, S_BODY))
    if nl["ps"]:
        block.append(Paragraph(nl["ps"], S_PS))
    block.append(Paragraph(nl["cta"], S_CTA))
    block.append(HRFlowable(width="100%", thickness=0.5, color=PIERRE, spaceAfter=4))

    story.append(KeepTogether(block[:3]))   # titre + accroche ensemble
    story.extend(block[3:])

doc.build(story, onFirstPage=header_footer, onLaterPages=header_footer)
print(f"PDF genere : {OUT}")
