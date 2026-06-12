"""
Guide PDF — Cap Solo
"Les 7 destinations parfaites pour ton premier voyage solo après 50 ans"
"""

from reportlab.lib.pagesizes import A4
from reportlab.lib import colors
from reportlab.lib.units import cm, mm
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.enums import TA_LEFT, TA_CENTER, TA_JUSTIFY
from reportlab.platypus import (
    BaseDocTemplate, PageTemplate, Frame, NextPageTemplate,
    Paragraph, Spacer, PageBreak,
    HRFlowable, Table, TableStyle, KeepTogether
)
from reportlab.pdfgen import canvas
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
import os

# ── Enregistrement polices ────────────────────────────────────────────────────
FONTS_DIR = r"C:\Windows\Fonts"
pdfmetrics.registerFont(TTFont("Georgia", os.path.join(FONTS_DIR, "georgia.ttf")))
pdfmetrics.registerFont(TTFont("Georgia-Bold", os.path.join(FONTS_DIR, "georgiab.ttf")))
pdfmetrics.registerFont(TTFont("Georgia-Italic", os.path.join(FONTS_DIR, "georgiai.ttf")))
pdfmetrics.registerFont(TTFont("Arial", os.path.join(FONTS_DIR, "arial.ttf")))
pdfmetrics.registerFont(TTFont("Arial-Bold", os.path.join(FONTS_DIR, "arialbd.ttf")))
pdfmetrics.registerFont(TTFont("Arial-Italic", os.path.join(FONTS_DIR, "ariali.ttf")))

# ── Palette ───────────────────────────────────────────────────────────────────
TERRACOTTA   = colors.HexColor("#C4633A")
CARAMEL      = colors.HexColor("#D4A66A")
CARAMEL_PALE = colors.HexColor("#EDD9B2")
CREAM        = colors.HexColor("#FAF7F2")
ANTHRACITE   = colors.HexColor("#2C2C2C")
GRAY_MID     = colors.HexColor("#5A5A5A")
GRAY_LIGHT   = colors.HexColor("#E8E0D8")
WHITE        = colors.white

PAGE_W, PAGE_H = A4
MARGIN = 2.2 * cm

# ── Styles ────────────────────────────────────────────────────────────────────
def make_styles():
    return {
        "cover_title": ParagraphStyle(
            "cover_title", fontName="Georgia-Bold",
            fontSize=34, leading=42, textColor=WHITE,
            alignment=TA_CENTER, spaceAfter=10
        ),
        "cover_subtitle": ParagraphStyle(
            "cover_subtitle", fontName="Georgia-Italic",
            fontSize=15, leading=22, textColor=colors.HexColor("#EDD9B2"),
            alignment=TA_CENTER, spaceAfter=6
        ),
        "cover_tag": ParagraphStyle(
            "cover_tag", fontName="Arial-Bold",
            fontSize=9, leading=14, textColor=colors.HexColor("#EDD9B2"),
            alignment=TA_CENTER, spaceAfter=0,
            letterSpacing=2
        ),
        "cover_brand": ParagraphStyle(
            "cover_brand", fontName="Georgia-Italic",
            fontSize=11, leading=16, textColor=colors.HexColor("#EDD9B2"),
            alignment=TA_CENTER
        ),
        "section_num": ParagraphStyle(
            "section_num", fontName="Arial-Bold",
            fontSize=8, leading=12, textColor=TERRACOTTA,
            alignment=TA_LEFT, spaceAfter=4,
            letterSpacing=2
        ),
        "h1": ParagraphStyle(
            "h1", fontName="Georgia-Bold",
            fontSize=26, leading=32, textColor=ANTHRACITE,
            alignment=TA_LEFT, spaceAfter=6, spaceBefore=4
        ),
        "h2": ParagraphStyle(
            "h2", fontName="Georgia-Bold",
            fontSize=18, leading=24, textColor=ANTHRACITE,
            alignment=TA_LEFT, spaceAfter=6, spaceBefore=12
        ),
        "h3": ParagraphStyle(
            "h3", fontName="Arial-Bold",
            fontSize=10, leading=14, textColor=TERRACOTTA,
            alignment=TA_LEFT, spaceAfter=4, spaceBefore=10,
            letterSpacing=1.5
        ),
        "body": ParagraphStyle(
            "body", fontName="Arial",
            fontSize=10.5, leading=17, textColor=ANTHRACITE,
            alignment=TA_JUSTIFY, spaceAfter=7
        ),
        "body_intro": ParagraphStyle(
            "body_intro", fontName="Georgia-Italic",
            fontSize=12, leading=20, textColor=GRAY_MID,
            alignment=TA_LEFT, spaceAfter=10
        ),
        "bullet": ParagraphStyle(
            "bullet", fontName="Arial",
            fontSize=10.5, leading=17, textColor=ANTHRACITE,
            leftIndent=16, firstLineIndent=-16, spaceAfter=5
        ),
        "caption": ParagraphStyle(
            "caption", fontName="Arial-Italic",
            fontSize=9, leading=13, textColor=GRAY_MID,
            alignment=TA_CENTER, spaceAfter=0
        ),
        "quote": ParagraphStyle(
            "quote", fontName="Georgia-Italic",
            fontSize=12, leading=19, textColor=TERRACOTTA,
            alignment=TA_CENTER, spaceBefore=10, spaceAfter=10,
            leftIndent=30, rightIndent=30
        ),
        "cta_headline": ParagraphStyle(
            "cta_headline", fontName="Georgia-Bold",
            fontSize=20, leading=28, textColor=ANTHRACITE,
            alignment=TA_CENTER, spaceAfter=10
        ),
        "cta_body": ParagraphStyle(
            "cta_body", fontName="Arial",
            fontSize=11, leading=18, textColor=GRAY_MID,
            alignment=TA_CENTER, spaceAfter=8
        ),
        "footer_text": ParagraphStyle(
            "footer_text", fontName="Arial-Italic",
            fontSize=8, leading=12, textColor=colors.HexColor("#9A9187"),
            alignment=TA_CENTER
        ),
    }

S = make_styles()

# ── Helpers ───────────────────────────────────────────────────────────────────
def divider(color=CARAMEL_PALE, thickness=1):
    return HRFlowable(width="100%", thickness=thickness, color=color, spaceAfter=8, spaceBefore=4)

def bullet_item(text):
    return Paragraph(f"<font color='#C4633A'>◆</font>  {text}", S["bullet"])

def check_item(text):
    return Paragraph(f"<font color='#C4633A'>☐</font>  {text}", S["bullet"])

def label(text):
    return Paragraph(text.upper(), S["section_num"])

def dest_badge(number, name, subtitle):
    return Table(
        [[
            Paragraph(f"<font size='18' color='white'><b>{number}</b></font>", ParagraphStyle(
                "n", fontName="Georgia-Bold", fontSize=18, textColor=WHITE, alignment=TA_CENTER
            )),
            [
                Paragraph(name, ParagraphStyle(
                    "dn", fontName="Georgia-Bold", fontSize=16, textColor=ANTHRACITE, spaceAfter=2
                )),
                Paragraph(subtitle, ParagraphStyle(
                    "ds", fontName="Arial-Italic", fontSize=10, textColor=GRAY_MID
                ))
            ]
        ]],
        colWidths=[1.4*cm, None],
        style=TableStyle([
            ("BACKGROUND",  (0, 0), (0, 0), TERRACOTTA),
            ("BACKGROUND",  (1, 0), (1, 0), CREAM),
            ("VALIGN",      (0, 0), (-1, -1), "MIDDLE"),
            ("LEFTPADDING",  (0, 0), (0, 0), 0),
            ("RIGHTPADDING", (0, 0), (0, 0), 0),
            ("TOPPADDING",   (0, 0), (-1, -1), 10),
            ("BOTTOMPADDING",(0, 0), (-1, -1), 10),
            ("LEFTPADDING",  (1, 0), (1, 0), 14),
            ("ROUNDEDCORNERS", [6]),
        ])
    )

def info_row(items):
    """Ligne de métadonnées destination : budget, durée, niveau."""
    data = [[
        Paragraph(f"<b>{k}</b><br/>{v}", ParagraphStyle(
            "ir", fontName="Arial", fontSize=9, leading=14,
            textColor=ANTHRACITE, alignment=TA_CENTER
        ))
        for k, v in items
    ]]
    col_w = (PAGE_W - 2 * MARGIN) / len(items)
    return Table(data,
        colWidths=[col_w] * len(items),
        style=TableStyle([
            ("BACKGROUND", (0, 0), (-1, -1), colors.HexColor("#FAF7F2")),
            ("BOX",        (0, 0), (-1, -1), 0.5, CARAMEL_PALE),
            ("INNERGRID",  (0, 0), (-1, -1), 0.5, CARAMEL_PALE),
            ("TOPPADDING",    (0, 0), (-1, -1), 7),
            ("BOTTOMPADDING", (0, 0), (-1, -1), 7),
            ("ROUNDEDCORNERS", [4]),
        ])
    )

# ── Page de couverture (canvas direct) ───────────────────────────────────────
class CoverPage:
    def __init__(self):
        self.width = PAGE_W
        self.height = PAGE_H

    def draw(self, canv, doc):
        pass  # géré via onFirstPage

def draw_cover(canv, doc):
    w, h = PAGE_W, PAGE_H

    # Fond dégradé simulé par rectangles
    from reportlab.lib.colors import HexColor
    tc = HexColor("#C4633A")
    ca = HexColor("#A8522A")
    dark = HexColor("#6B3318")

    canv.setFillColor(dark)
    canv.rect(0, 0, w, h, fill=1, stroke=0)

    canv.setFillColor(ca)
    canv.rect(0, h * 0.35, w, h * 0.65, fill=1, stroke=0)

    canv.setFillColor(tc)
    canv.rect(0, h * 0.55, w, h * 0.45, fill=1, stroke=0)

    # Cercles décoratifs
    canv.setFillColor(colors.HexColor("#B85C33"))
    canv.setStrokeAlpha(0)
    canv.circle(w * 0.85, h * 0.82, 120, fill=1, stroke=0)
    canv.setFillColor(colors.HexColor("#9E4A28"))
    canv.circle(w * 0.12, h * 0.15, 80, fill=1, stroke=0)

    # Bande caramel horizontale
    canv.setFillColor(HexColor("#D4A66A"))
    canv.setFillAlpha(0.15)
    canv.rect(0, h * 0.42, w, 3, fill=1, stroke=0)
    canv.setFillAlpha(1)

    # Tag en haut
    canv.setFont("Arial-Bold", 8)
    canv.setFillColor(HexColor("#EDD9B2"))
    tag = "GUIDE GRATUIT  ·  CAP SOLO"
    canv.drawCentredString(w / 2, h - 3.5 * cm, tag)

    # Ligne déco
    canv.setStrokeColor(HexColor("#EDD9B2"))
    canv.setLineWidth(0.5)
    canv.setStrokeAlpha(0.4)
    canv.line(2.5 * cm, h - 3.8 * cm, w - 2.5 * cm, h - 3.8 * cm)
    canv.setStrokeAlpha(1)

    # Titre
    canv.setFont("Georgia-Bold", 32)
    canv.setFillColor(WHITE)
    line1 = "Les 7 destinations"
    line2 = "parfaites pour ton"
    line3 = "premier voyage solo"
    canv.drawCentredString(w / 2, h * 0.67, line1)
    canv.drawCentredString(w / 2, h * 0.67 - 42, line2)
    canv.drawCentredString(w / 2, h * 0.67 - 84, line3)

    # Sous-titre
    canv.setFont("Georgia-Italic", 14)
    canv.setFillColor(HexColor("#EDD9B2"))
    canv.drawCentredString(w / 2, h * 0.67 - 126, "après 50 ans")

    # Ligne déco centrale
    canv.setStrokeColor(HexColor("#D4A66A"))
    canv.setLineWidth(1)
    canv.setStrokeAlpha(0.6)
    line_y = h * 0.67 - 148
    canv.line(w / 2 - 40, line_y, w / 2 + 40, line_y)
    canv.setStrokeAlpha(1)

    # Sous-titre bas
    canv.setFont("Arial", 10.5)
    canv.setFillColor(HexColor("#EDD9B2"))
    sub = "Sécurité · Hébergements · Itinéraires · Budgets"
    canv.drawCentredString(w / 2, h * 0.32, sub)

    # Brand
    canv.setFont("Georgia-Italic", 12)
    canv.setFillColor(HexColor("#EDD9B2"))
    canv.drawCentredString(w / 2, 2.5 * cm, "Cap Solo")
    canv.setFont("Arial-Italic", 8.5)
    canv.setFillColor(HexColor("#C4956A"))
    canv.drawCentredString(w / 2, 1.8 * cm, "Parce que la liberté n'a pas d'âge.")


def draw_page(canv, doc):
    """En-tête et pied de page pour toutes les pages intérieures."""
    w, h = PAGE_W, PAGE_H

    # Trait fin terracotta en haut
    canv.setStrokeColor(TERRACOTTA)
    canv.setLineWidth(2)
    canv.line(MARGIN, h - 1.4 * cm, w - MARGIN, h - 1.4 * cm)

    # Brand en-tête
    canv.setFont("Georgia-Italic", 8.5)
    canv.setFillColor(TERRACOTTA)
    canv.drawString(MARGIN, h - 1.1 * cm, "Cap Solo")

    # Titre guide en-tête (droite)
    canv.setFont("Arial-Italic", 7.5)
    canv.setFillColor(GRAY_MID)
    title_short = "Les 7 destinations pour ton premier voyage solo"
    canv.drawRightString(w - MARGIN, h - 1.1 * cm, title_short)

    # Footer — numéro de page
    canv.setFont("Arial", 8)
    canv.setFillColor(colors.HexColor("#9A9187"))
    canv.drawCentredString(w / 2, 1 * cm, f"{doc.page}")

    # Trait bas
    canv.setStrokeColor(CARAMEL_PALE)
    canv.setLineWidth(0.5)
    canv.line(MARGIN, 1.5 * cm, w - MARGIN, 1.5 * cm)


# ── Contenu ───────────────────────────────────────────────────────────────────
def build_content():
    story = []

    # ── INTRO ─────────────────────────────────────────────────────────────────
    story.append(label("Introduction"))
    story.append(Paragraph("Pourquoi voyager seule est la meilleure décision que tu puisses prendre", S["h1"]))
    story.append(divider())
    story.append(Spacer(1, 6))

    story.append(Paragraph(
        "Il y a ce moment où quelque chose bascule. Une rupture, une perte, une longue période difficile dont tu t'extirpes enfin. Ou simplement une maison qui s'est vidée et une question qui flotte : et moi, maintenant, qu'est-ce que je veux ?",
        S["body_intro"]
    ))

    story.append(Paragraph(
        "Ce guide est né de cette question-là. Je l'ai vécue aussi — après une rééducation qui a duré un an et demi, puis le départ de mes enfants. J'avais besoin de prouver que ma vie m'appartenait encore. J'ai pris un billet d'avion. Seule.",
        S["body"]
    ))
    story.append(Paragraph(
        "Voyager seule après 50 ans, c'est retrouver un truc rare : choisir. Choisir où tu vas, à quelle heure tu te lèves, ce que tu manges, combien de temps tu restes devant ce tableau dans le musée. Sans demander. Sans ajuster.",
        S["body"]
    ))
    story.append(Paragraph(
        "Dans ce guide, j'ai sélectionné 7 destinations spécialement pensées pour un premier solo. Pas les plus exotiques. Les plus <i>adaptées</i> — sûres, accessibles, belles, et conçues pour que tu rentres en voulant recommencer.",
        S["body"]
    ))

    story.append(Spacer(1, 12))
    story.append(Paragraph(
        "\"Ce n'était pas que le voyage. C'était la preuve que ma vie m'appartenait encore.\"",
        S["quote"]
    ))

    story.append(PageBreak())

    # ── CRITÈRES ──────────────────────────────────────────────────────────────
    story.append(label("Méthode de sélection"))
    story.append(Paragraph("Comment j'ai choisi ces 7 destinations", S["h1"]))
    story.append(divider())
    story.append(Spacer(1, 6))

    story.append(Paragraph(
        "Toutes les destinations ne se valent pas quand on part solo pour la première fois. J'ai appliqué 4 critères stricts :",
        S["body"]
    ))
    story.append(Spacer(1, 8))

    criteres = [
        ("01", "Sécurité pour une femme seule",
         "Classement sécurité, retours d'expériences de femmes solos, infrastructure locale, densité touristique."),
        ("02", "Facilité d'organisation",
         "Transports intuitifs, hébergements variés et disponibles, peu de barrières linguistiques, présence touristique établie."),
        ("03", "Ambiance favorable aux solos",
         "Restaurants et cafés où manger seule est normal, hôtels avec espaces communs, culture de la rencontre."),
        ("04", "Richesse de l'expérience",
         "Histoire, gastronomie, nature ou culture — quelque chose qui donne envie de revenir."),
    ]

    for num, titre, desc in criteres:
        row = Table(
            [[
                Paragraph(f"<b>{num}</b>", ParagraphStyle(
                    "cn", fontName="Georgia-Bold", fontSize=16,
                    textColor=TERRACOTTA, alignment=TA_CENTER
                )),
                [
                    Paragraph(titre, ParagraphStyle(
                        "ct", fontName="Arial-Bold", fontSize=10.5,
                        textColor=ANTHRACITE, spaceAfter=3
                    )),
                    Paragraph(desc, ParagraphStyle(
                        "cd", fontName="Arial", fontSize=9.5, leading=15,
                        textColor=GRAY_MID
                    ))
                ]
            ]],
            colWidths=[1.5 * cm, None],
            style=TableStyle([
                ("VALIGN",       (0, 0), (-1, -1), "TOP"),
                ("TOPPADDING",   (0, 0), (-1, -1), 10),
                ("BOTTOMPADDING",(0, 0), (-1, -1), 10),
                ("LEFTPADDING",  (1, 0), (1, 0),  14),
                ("LINEBELOW",    (0, 0), (-1, 0),  0.5, CARAMEL_PALE),
            ])
        )
        story.append(row)

    story.append(PageBreak())

    # ── LES 7 DESTINATIONS ────────────────────────────────────────────────────
    destinations = [
        {
            "num": "01", "name": "Lisbonne", "country": "Portugal",
            "badge": "Coup de cœur débutante ⭐",
            "intro": "Lisbonne est la destination que je recommande à toutes celles qui partent seules pour la première fois. Compacte, magnifique, et incroyablement accueillante.",
            "pourquoi": [
                "Centre-ville entièrement praticable à pied ou en tram iconique",
                "Portugais très chaleureux avec les voyageuses solos",
                "Ambiance méditerranéenne sans la foule de Rome ou Barcelone",
                "Restaurants avec comptoir ou bar — manger seule est parfaitement normal",
                "Sécurité excellente, même la nuit dans le centre",
            ],
            "quartiers": "Alfama (authentique, panoramas), Bairro Alto (soirées, restaurants), Belém (monuments, pâtisseries), Príncipe Real (boutiques, jardins).",
            "hebergements": "Cherche des guesthouses avec salon commun dans Alfama ou Chiado — les hôtes portugais créent naturellement des espaces de rencontre. Évite les grandes chaînes.",
            "activites": "Tram 28, Miradouro da Graça au coucher du soleil, Mosteiro dos Jerónimos, Musée du Fado, pasteis de nata à Belém, un soir de fado dans un petit restaurant de l'Alfama.",
            "budget": "600–850 €", "duree": "7 jours idéal", "niveau": "Débutante",
        },
        {
            "num": "02", "name": "Séville", "country": "Espagne",
            "badge": "Chaleur et flamenco",
            "intro": "Séville est la ville la plus vivante de ce guide. Ville du flamenco, des orangers, de la gastronomie andalouse — et d'une énergie qui donne envie de rester.",
            "pourquoi": [
                "Très sûre, très animée — tu ne seras jamais seule dans les rues",
                "Culture de la tapa : parfaite pour manger seule au bar, comme tout le monde",
                "Architecture éblouissante à chaque coin de rue",
                "Transports excellents, très walkable",
                "Espagnol de base suffit — les Sévillans adorent les touristes",
            ],
            "quartiers": "Santa Cruz (cœur historique), Triana (flamenco authentique, marché), El Arenal (cathédrale, Alcázar).",
            "hebergements": "Hôtels de charme dans Santa Cruz, souvent installés dans d'anciens palais avec patio intérieur. Le patio est le point de rencontre naturel.",
            "activites": "Real Alcázar (réserver à l'avance), Catedral de Séville et la Giralda, Plaza de España, spectacle de flamenco à Triana, marché du matin.",
            "budget": "500–750 €", "duree": "5–7 jours", "niveau": "Débutante",
        },
        {
            "num": "03", "name": "Dubrovnik & Côte Dalmate", "country": "Croatie",
            "badge": "Mer, falaises et vieilles pierres",
            "intro": "La Croatie combine ce que les voyageuses solos adorent : une mer cristalline, une histoire millénaire, et une infrastructure touristique tellement bien rodée que l'organisation devient un plaisir.",
            "pourquoi": [
                "Vieille ville de Dubrovnik classée UNESCO — à couper le souffle",
                "Ferries locaux pour explorer les îles : liberté totale",
                "Population très habituée aux voyageurs solos",
                "Sécurité parmi les meilleures d'Europe",
                "Combine plage, culture et gastronomie sans effort",
            ],
            "quartiers": "Vieille ville de Dubrovnik (incontournable), île de Hvar (vivante), île de Korčula (calme et authentique), Split (architecture romaine).",
            "hebergements": "Petites pensions familiales (sobe) sur les îles — l'hébergement le plus chaleureux de ce guide. Les hôtes cuisinent souvent pour toi si tu le demandes.",
            "activites": "Remparts de Dubrovnik au lever du soleil, ferry inter-îles, plages des îles Pakleni, vieille ville de Korčula, fruits de mer frais partout.",
            "budget": "650–900 €", "duree": "7–10 jours", "niveau": "Débutante–Intermédiaire",
        },
        {
            "num": "04", "name": "Florence", "country": "Italie",
            "badge": "Renaissance et gastronomie",
            "intro": "Florence est la destination pour celles qui veulent s'offrir quelque chose de beau. Art, architecture, gastronomie — chaque heure est un cadeau.",
            "pourquoi": [
                "La plus belle concentration d'art au monde sur une surface walkable",
                "Culture italienne du café : parfaite pour s'installer seule et observer",
                "Trattorie avec tables communes — idéales pour rencontrer d'autres voyageurs",
                "Très bien desservie en transports depuis toute l'Europe",
                "Taille humaine : tout se fait à pied",
            ],
            "quartiers": "Oltrarno (authentique, moins touristique), Santa Croce (local), San Marco (musées), Oltrarno (ateliers d'artisans).",
            "hebergements": "B&B dans les quartiers résidentiels plutôt que les grandes chaînes du centre — tu rencontreras des locaux et auras des conseils inestimables.",
            "activites": "Galerie des Offices (réserver longtemps à l'avance), David de Michel-Ange, Piazzale Michelangelo au coucher du soleil, marché de San Lorenzo, tour de vélo dans les collines du Chianti.",
            "budget": "700–1 000 €", "duree": "5–7 jours", "niveau": "Débutante",
        },
        {
            "num": "05", "name": "Naxos ou Milos", "country": "Grèce — Îles égéennes",
            "badge": "Le secret des connaisseurs",
            "intro": "Oublie Santorin bondé et hors de prix. Naxos et Milos offrent la vraie Grèce : authentique, abordable, et tellement belle qu'on comprend pourquoi les anciens en ont fait le berceau des dieux.",
            "pourquoi": [
                "Beaucoup moins de monde que Santorin ou Mykonos",
                "Habitants chaleureux qui ont gardé leur mode de vie",
                "Location de scooter ou quad : liberté totale pour explorer",
                "Plages parmi les plus belles d'Europe",
                "Prix raisonnables comparés aux îles trop connues",
            ],
            "quartiers": "Naxos : Chora (capitale), villages de montagne, plages d'Agios Prokopios. Milos : Plaka (village blanc perché), plage de Sarakiniko (paysage lunaire).",
            "hebergements": "Petits hôtels familiaux dans les villages. Cherche des maisons cyclades traditionnelles — souvent gérées par des femmes qui adorent accueillir les voyageuses solos.",
            "activites": "Plage de Sarakiniko (Milos), villages de montagne de Naxos, coucher de soleil depuis Plaka (Milos), marché local le matin.",
            "budget": "600–850 €", "duree": "7 jours", "niveau": "Débutante",
        },
        {
            "num": "06", "name": "Prague", "country": "République Tchèque",
            "badge": "Le meilleur rapport qualité-expérience",
            "intro": "Prague est la destination idéale si ton budget est une contrainte. Elle offre une beauté architecturale exceptionnelle, une infrastructure touristique parfaite, et des prix qui font sourire.",
            "pourquoi": [
                "Transports en commun excellents et très économiques",
                "Ville très sûre, très touristique — jamais isolée",
                "Architecture de conte de fées : Vieille Ville, Château, Pont Charles",
                "Restaurants et cafés de qualité à des prix très accessibles",
                "Courte durée de vol depuis la plupart des villes françaises",
            ],
            "quartiers": "Staré Město (Vieille Ville, incontournable), Malá Strana (sous le château, romantique), Vinohrady (résidentiel, local et sympa).",
            "hebergements": "Boutique hôtels dans Malá Strana ou Vinohrady — meilleur rapport qualité/prix d'Europe. Évite les auberges de jeunesse du centre, souvent bruyantes.",
            "activites": "Pont Charles au lever du soleil (avant les touristes), Château de Prague, Vieille Ville et l'Horloge astronomique, quartier juif, concert de musique classique le soir.",
            "budget": "400–600 €", "duree": "4–5 jours", "niveau": "Débutante",
        },
        {
            "num": "07", "name": "Marrakech", "country": "Maroc",
            "badge": "Pour celles qui veulent pimenter leur solo",
            "intro": "Marrakech est dans une catégorie à part. Dépaysement total, couleurs, odeurs, architecture — une expérience sensorielle unique. Avec les bons réflexes, c'est une destination accessible et inoubliable.",
            "pourquoi": [
                "Dépaysement maximal à 3h de vol de Paris",
                "Riads — hébergements traditionnels — parmi les plus beaux au monde",
                "Gastronomie extraordinaire : tajines, pastilla, mint tea",
                "Médina classée UNESCO, souks labyrinthiques",
                "Communauté de voyageuses solos très active — facile de trouver des conseils",
            ],
            "quartiers": "Médina (vieux Marrakech, incontournable), Guéliz (ville moderne, plus détendu), Palmeraie (excursions).",
            "hebergements": "INDISPENSABLE : réserve un riad bien noté, avec hôte réactif. Les riads sont des havres de paix après l'intensité de la médina. Lis les avis spécifiques aux femmes solos.",
            "activites": "Place Jemaa el-Fna (mais reste groupée le soir), souks le matin (plus calme), Jardins Majorelle, hammam dans ton riad, excursion d'une journée dans l'Atlas.",
            "budget": "500–700 €", "duree": "5–7 jours", "niveau": "Intermédiaire",
            "conseil_secu": True,
        },
    ]

    for dest in destinations:
        story.append(dest_badge(dest["num"], f"{dest['name']}, {dest['country']}", dest["badge"]))
        story.append(Spacer(1, 14))

        story.append(Paragraph(dest["intro"], S["body_intro"]))

        story.append(info_row([
            ("Budget / 7 jours", dest["budget"]),
            ("Durée idéale", dest["duree"]),
            ("Niveau", dest["niveau"]),
        ]))
        story.append(Spacer(1, 12))

        story.append(label("Pourquoi c'est parfait pour un premier solo"))
        for item in dest["pourquoi"]:
            story.append(bullet_item(item))

        story.append(Spacer(1, 8))
        story.append(label("Quartiers recommandés"))
        story.append(Paragraph(dest["quartiers"], S["body"]))

        story.append(label("Hébergement"))
        story.append(Paragraph(dest["hebergements"], S["body"]))

        story.append(label("À ne pas manquer"))
        story.append(Paragraph(dest["activites"], S["body"]))

        if dest.get("conseil_secu"):
            story.append(Spacer(1, 6))
            conseil_table = Table(
                [[
                    Paragraph("!", ParagraphStyle(
                        "ex", fontName="Georgia-Bold", fontSize=16,
                        textColor=WHITE, alignment=TA_CENTER
                    )),
                    Paragraph(
                        "<b>Conseils sécurité spécifiques — Marrakech</b><br/>"
                        "Évite de te promener seule dans la médina après 21h. "
                        "Porte des vêtements couvrant les épaules et les genoux dans les quartiers religieux. "
                        "Fixe les prix avant tout achat dans les souks. "
                        "Utilise des taxis officiels (petits taxis rouges avec compteur). "
                        "Ne suis jamais un inconnu qui propose de te montrer le chemin.",
                        ParagraphStyle(
                            "cs", fontName="Arial", fontSize=9.5, leading=15,
                            textColor=ANTHRACITE
                        )
                    )
                ]],
                colWidths=[0.9 * cm, None],
                style=TableStyle([
                    ("BACKGROUND", (0, 0), (0, 0), TERRACOTTA),
                    ("BACKGROUND", (1, 0), (1, 0), colors.HexColor("#FEF3EC")),
                    ("VALIGN",     (0, 0), (-1, -1), "TOP"),
                    ("TOPPADDING",    (0, 0), (-1, -1), 10),
                    ("BOTTOMPADDING", (0, 0), (-1, -1), 10),
                    ("LEFTPADDING",  (1, 0), (1, 0), 14),
                    ("BOX", (0, 0), (-1, -1), 0.5, TERRACOTTA),
                ])
            )
            story.append(conseil_table)

        story.append(PageBreak())

    # ── CHECKLIST SÉCURITÉ ────────────────────────────────────────────────────
    story.append(label("Checklist"))
    story.append(Paragraph("Avant de partir — ta liste complète", S["h1"]))
    story.append(divider())
    story.append(Spacer(1, 6))
    story.append(Paragraph(
        "Imprime cette liste et coche chaque point avant de boucler ta valise. Ce sont les essentiels que j'aurais voulu avoir pour mon premier solo.",
        S["body"]
    ))
    story.append(Spacer(1, 10))

    sections_checklist = [
        ("Documents & administration", [
            "Passeport / carte d'identité valide (vérifier la date d'expiration)",
            "Copie numérique de tous tes documents (Drive ou email à toi-même)",
            "Copie papier dans un endroit séparé de l'original",
            "Assurance voyage avec assistance rapatriement",
            "Numéros d'urgence du pays de destination sauvegardés",
        ]),
        ("Sécurité & communication", [
            "Partager ton itinéraire complet avec 2 personnes de confiance",
            "Mémoriser l'adresse de ton hébergement (pas juste sur le téléphone)",
            "Application Maps.me téléchargée hors ligne",
            "Pochette anti-RFID pour passeport et carte bancaire",
            "Batterie externe chargée",
        ]),
        ("Hébergement & logistique", [
            "Première nuit d'hébergement confirmée avant de partir",
            "Vérifier les horaires de check-in de ton hébergement",
            "Avoir du cash local pour les premiers euros/couronnes/dirhams",
            "Prévenir ta banque de tes dates et destination (évite les blocages de carte)",
            "Numéro de taxi ou transport fiable noté à l'avance",
        ]),
        ("Confort & tranquillité d'esprit", [
            "Liste des restaurants / cafés notés à l'avance (pour ne pas errer affamée)",
            "1 activité réservée à l'avance (musée, visite guidée) — te donne une ancre",
            "Tenue adaptée aux us locaux (épaules couvertes si pays musulman, etc.)",
            "Bouchons d'oreilles + masque de sommeil (hotels + avions)",
            "Cahier ou notes sur ton téléphone pour capturer tes impressions",
        ]),
    ]

    for section_title, items in sections_checklist:
        story.append(Paragraph(section_title.upper(), S["h3"]))
        for item in items:
            story.append(check_item(item))
        story.append(Spacer(1, 8))

    story.append(PageBreak())

    # ── BONUS HÉBERGEMENTS ────────────────────────────────────────────────────
    story.append(label("Bonus"))
    story.append(Paragraph("Comment choisir un hébergement solo-friendly", S["h1"]))
    story.append(divider())
    story.append(Spacer(1, 6))

    story.append(Paragraph(
        "L'hébergement fait 40 % de ton expérience solo. Un bon choix = des rencontres, une sécurité, et un cocon où décompresser. Voici les 3 signes qui ne trompent pas.",
        S["body"]
    ))
    story.append(Spacer(1, 10))

    signes = [
        (
            "01",
            "Un espace commun mentionné dans les avis",
            "Salon, terrasse, cuisine commune, salle du petit-déjeuner conviviale — ces espaces sont les lieux de rencontre naturels. Cherche les mots \"salon\", \"terrasse\", \"communauté\", \"ambiance\" dans les commentaires Booking ou Airbnb.",
        ),
        (
            "02",
            "La mention \"parfait pour les voyageurs solos\"",
            "Certains hébergements le mentionnent explicitement dans leur description ou dans les avis. Ce sont ceux qui ont compris. Filtre sur Booking.com : \"voyageur solo\" dans la barre de recherche des avis.",
        ),
        (
            "03",
            "Un hôte qui répond personnellement",
            "Si l'hôte répond à chaque avis avec un message personnalisé (pas un copier-coller), c'est bon signe. Ça signifie qu'il est présent, attentionné, et que tu auras quelqu'un à qui parler si besoin.",
        ),
    ]

    for num, titre, desc in signes:
        row = Table(
            [[
                Paragraph(f"<b>{num}</b>", ParagraphStyle(
                    "sn", fontName="Georgia-Bold", fontSize=18,
                    textColor=TERRACOTTA, alignment=TA_CENTER
                )),
                [
                    Paragraph(titre, ParagraphStyle(
                        "st", fontName="Arial-Bold", fontSize=11,
                        textColor=ANTHRACITE, spaceAfter=4
                    )),
                    Paragraph(desc, ParagraphStyle(
                        "sd", fontName="Arial", fontSize=10, leading=16,
                        textColor=GRAY_MID
                    ))
                ]
            ]],
            colWidths=[1.5 * cm, None],
            style=TableStyle([
                ("VALIGN",       (0, 0), (-1, -1), "TOP"),
                ("TOPPADDING",   (0, 0), (-1, -1), 12),
                ("BOTTOMPADDING",(0, 0), (-1, -1), 12),
                ("LEFTPADDING",  (1, 0), (1, 0),  16),
                ("LINEBELOW",    (0, 0), (-1, 0),  0.5, CARAMEL_PALE),
            ])
        )
        story.append(row)

    story.append(Spacer(1, 20))

    # ── MOT DE FIN + CTA ──────────────────────────────────────────────────────
    story.append(divider(CARAMEL, thickness=2))
    story.append(Spacer(1, 16))

    story.append(Paragraph("Tu as le guide.", S["cta_headline"]))
    story.append(Paragraph(
        "La prochaine étape, c'est de te lancer.",
        S["cta_body"]
    ))
    story.append(Spacer(1, 8))

    story.append(Paragraph(
        "Si tu veux aller plus loin — une méthode complète, des hébergements validés, "
        "les scripts pour répondre à ta famille, et une préparation mentale en 14 jours — "
        "je t'ai tout mis dans <b>Mon Premier Solo</b>.",
        ParagraphStyle(
            "cta_detail", fontName="Arial", fontSize=10.5, leading=17,
            textColor=GRAY_MID, alignment=TA_CENTER,
            leftIndent=30, rightIndent=30, spaceAfter=12
        )
    ))

    cta_box = Table(
        [[Paragraph(
            "→  Découvrir Mon Premier Solo — 67 €",
            ParagraphStyle(
                "cta_btn", fontName="Arial-Bold", fontSize=12,
                textColor=WHITE, alignment=TA_CENTER
            )
        )]],
        colWidths=[PAGE_W - 2 * MARGIN - 4 * cm],
        style=TableStyle([
            ("BACKGROUND",    (0, 0), (-1, -1), TERRACOTTA),
            ("TOPPADDING",    (0, 0), (-1, -1), 14),
            ("BOTTOMPADDING", (0, 0), (-1, -1), 14),
            ("ROUNDEDCORNERS", [8]),
        ])
    )
    story.append(Table(
        [[cta_box]],
        colWidths=[PAGE_W - 2 * MARGIN],
        style=TableStyle([
            ("ALIGN", (0, 0), (-1, -1), "CENTER"),
            ("TOPPADDING", (0, 0), (-1, -1), 0),
        ])
    ))

    story.append(Spacer(1, 20))
    story.append(Paragraph(
        "Cap Solo — Parce que la liberté n'a pas d'âge.",
        S["footer_text"]
    ))

    return story


# ── Build ─────────────────────────────────────────────────────────────────────
OUTPUT_PATH = r"c:\Users\DELL\Desktop\test claude\projects\tinypages\assets\guide-cap-solo.pdf"

doc = BaseDocTemplate(
    OUTPUT_PATH,
    pagesize=A4,
    leftMargin=MARGIN,
    rightMargin=MARGIN,
    topMargin=2.5 * cm,
    bottomMargin=2.2 * cm,
    title="Les 7 destinations pour ton premier voyage solo après 50 ans",
    author="Cap Solo",
    subject="Guide voyage solo femme 50 ans",
)

CONTENT_W = PAGE_W - 2 * MARGIN
CONTENT_H = PAGE_H - 2.5 * cm - 2.2 * cm

# Page 1 : couverture seule, aucun contenu story
cover_frame = Frame(0, 0, 1, 1, id='cover_frame')
cover_template = PageTemplate(id='cover', frames=[cover_frame], onPage=draw_cover)

# Pages 2+ : contenu normal
content_frame = Frame(MARGIN, 2.2 * cm, CONTENT_W, CONTENT_H, id='content_frame')
content_template = PageTemplate(id='content', frames=[content_frame], onPage=draw_page)

doc.addPageTemplates([cover_template, content_template])

story = [NextPageTemplate('content'), PageBreak()] + build_content()
doc.build(story)

print(f"PDF généré : {OUTPUT_PATH}")
