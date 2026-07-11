from reportlab.lib.pagesizes import A4
from reportlab.lib.units import cm
from reportlab.lib import colors
from reportlab.lib.styles import ParagraphStyle
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, HRFlowable,
    KeepTogether, Image, Table, TableStyle
)
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
import os

FONTS = r"C:\Windows\Fonts"
pdfmetrics.registerFont(TTFont("Calibri",           os.path.join(FONTS, "calibri.ttf")))
pdfmetrics.registerFont(TTFont("CalibriBold",       os.path.join(FONTS, "calibrib.ttf")))
pdfmetrics.registerFont(TTFont("CalibriItalic",     os.path.join(FONTS, "calibrii.ttf")))
pdfmetrics.registerFont(TTFont("CalibriBoldItalic", os.path.join(FONTS, "calibriz.ttf")))

BRUN   = colors.HexColor("#5C3A1E")
PIERRE = colors.HexColor("#D6C9B8")
BEIGE  = colors.HexColor("#F5F0EA")
GRIS   = colors.HexColor("#666666")
NOIR   = colors.HexColor("#1A1A1A")
BLANC  = colors.HexColor("#FFFFFF")

def s(name, font="Calibri", size=11, color=NOIR, leading=None,
      spaceAfter=6, spaceBefore=0, align="LEFT", leftIndent=0):
    return ParagraphStyle(
        name=name, fontName=font, fontSize=size, textColor=color,
        leading=leading or size * 1.45,
        spaceAfter=spaceAfter, spaceBefore=spaceBefore,
        alignment={"LEFT": 0, "CENTER": 1, "RIGHT": 2, "JUSTIFY": 4}[align],
        leftIndent=leftIndent,
    )

S_DOC_TITLE  = s("doc_title",  "CalibriBold",       26, BRUN,  leading=32, spaceAfter=4)
S_DOC_SUB    = s("doc_sub",    "Calibri",            13, GRIS,  leading=18, spaceAfter=2)
S_DOC_META   = s("doc_meta",   "CalibriItalic",      10, GRIS,  leading=14, spaceAfter=16)
S_SECTION    = s("section",    "CalibriBold",        15, BRUN,  leading=20, spaceAfter=4, spaceBefore=20)
S_SUBSECTION = s("subsection", "CalibriBold",        12, NOIR,  leading=17, spaceAfter=3, spaceBefore=10)
S_BODY       = s("body",       "Calibri",            11, NOIR,  leading=16, spaceAfter=4, align="JUSTIFY")
S_BULLET     = s("bullet",     "Calibri",            11, NOIR,  leading=16, spaceAfter=3, leftIndent=14)
S_ITALIC     = s("italic",     "CalibriItalic",      11, GRIS,  leading=16, spaceAfter=4)
S_BOLD_BODY  = s("boldbody",   "CalibriBold",        11, NOIR,  leading=16, spaceAfter=4)
S_HEADER     = s("header",     "CalibriItalic",       9, GRIS,  leading=12)
S_FOOTER     = s("footer",     "Calibri",             9, GRIS,  leading=12, align="CENTER")
S_TAG        = s("tag",        "CalibriBold",        10, BRUN,  leading=14, spaceAfter=2)
S_NOTE       = s("note",       "CalibriItalic",      10, GRIS,  leading=14, spaceAfter=10)

def header_footer(canvas, doc):
    canvas.saveState()
    w, h = A4
    m = 2 * cm
    canvas.setFont("CalibriItalic", 9)
    canvas.setFillColor(GRIS)
    canvas.drawString(m, h - 1.4 * cm, "Le Manoïre — Ligne éditoriale")
    canvas.setStrokeColor(PIERRE)
    canvas.setLineWidth(0.5)
    canvas.line(m, h - 1.6 * cm, w - m, h - 1.6 * cm)
    canvas.line(m, 1.6 * cm, w - m, 1.6 * cm)
    canvas.setFont("Calibri", 9)
    canvas.drawCentredString(w / 2, 1.0 * cm, f"www.lemanoire-jaman.ch  ·  Page {doc.page}")
    canvas.restoreState()

def section(title):
    return [
        Spacer(1, 0.3 * cm),
        Paragraph(title, S_SECTION),
        HRFlowable(width="100%", thickness=1, color=PIERRE, spaceAfter=6),
    ]

def subsection(title):
    return Paragraph(title, S_SUBSECTION)

def body(text):
    return Paragraph(text, S_BODY)

def italic(text):
    return Paragraph(text, S_ITALIC)

def bullet(text):
    return Paragraph(f"• {text}", S_BULLET)

def note(text):
    return Paragraph(text, S_NOTE)

def table_2col(rows, col1_width=5.5*cm, col2_width=10*cm):
    data = [[Paragraph(r[0], s("th", "CalibriBold", 10, NOIR)),
             Paragraph(r[1], s("td", "Calibri", 10, NOIR))] for r in rows]
    t = Table(data, colWidths=[col1_width, col2_width])
    t.setStyle(TableStyle([
        ("BACKGROUND",  (0, 0), (-1, 0), BEIGE),
        ("FONTNAME",    (0, 0), (-1, 0), "CalibriBold"),
        ("ROWBACKGROUNDS", (0, 0), (-1, -1), [BLANC, BEIGE]),
        ("GRID",        (0, 0), (-1, -1), 0.4, PIERRE),
        ("LEFTPADDING", (0, 0), (-1, -1), 8),
        ("RIGHTPADDING",(0, 0), (-1, -1), 8),
        ("TOPPADDING",  (0, 0), (-1, -1), 5),
        ("BOTTOMPADDING",(0, 0), (-1, -1), 5),
        ("VALIGN",      (0, 0), (-1, -1), "TOP"),
    ]))
    return t

LOGO = os.path.join(os.path.dirname(__file__), "../charte_graphique/Le Manoïre_Logo 1_Couleur_px1000_sans.png")
OUT  = os.path.join(os.path.dirname(__file__), "ligne_editoriale_manoire.pdf")

doc = SimpleDocTemplate(
    OUT, pagesize=A4,
    topMargin=2.2*cm, bottomMargin=2.2*cm,
    leftMargin=2.5*cm, rightMargin=2.5*cm,
    title="Ligne éditoriale — Le Manoïre",
    author="Clockwork Ops",
)

story = []

# --- Page de titre ---
if os.path.exists(LOGO):
    story.append(Image(LOGO, width=5*cm, height=2.5*cm, hAlign="LEFT"))
    story.append(Spacer(1, 0.5*cm))

story.append(Paragraph("Ligne éditoriale", S_DOC_TITLE))
story.append(Paragraph("Le Manoïre — Col de Jaman, Montreux", S_DOC_SUB))
story.append(Spacer(1, 0.2*cm))
story.append(Paragraph("Document de référence contenu · Version 1.0 · Juin 2026", S_DOC_META))
story.append(HRFlowable(width="100%", thickness=1, color=PIERRE, spaceAfter=16))

# --- 1. Identité éditoriale ---
story += section("1. Identité éditoriale")
story.append(body(
    "Le Manoïre, c'est un restaurant d'alpage qui a retrouvé son nom d'origine — et avec lui, son âme. "
    "À 1 500m d'altitude au-dessus de Montreux, au Col de Jaman, on raconte l'histoire d'un lieu qui se réveille : "
    "les travaux, la montagne, la cuisine de terroir, et Anouck la Saint-Bernard qui était là depuis le début."
))
story.append(body(
    "L'histoire qu'on raconte, c'est celle d'une renaissance authentique. Pas une inauguration froide et marketing "
    "— une réouverture humaine, portée par Micka et son chien, avec une communauté qu'on emmène dans l'aventure "
    "depuis le premier coup de marteau."
))
story.append(italic("Le sentiment qu'on veut laisser : « C'est là-haut que je veux aller ce week-end. »"))

# --- 2. Audience cible ---
story += section("2. Audience cible")

story.append(subsection("Profil principal — les locaux et régionaux"))
story.append(bullet("Habitants de Montreux, Vevey, Villeneuve, Aigle — et frontaliers côté Haute-Savoie"))
story.append(bullet("Cherchent une table avec âme : cuisine généreuse, produits vrais, vue qui en vaut la montée"))
story.append(bullet("Connaissent le Col de Jaman — curieux de voir ce que ça va donner"))

story.append(subsection("Profil secondaire — les randonneurs et nature lovers"))
story.append(bullet("Actifs, 30–60 ans, qui marchent les Rochers de Naye, le Tour du Lac, les sentiers du Chablais"))
story.append(bullet("Cherchent un vrai repas après l'effort, avec une belle vue"))
story.append(bullet("Le Manoïre est littéralement sur leur chemin"))

story.append(subsection("Profil tertiaire — les abonnés inscrits"))
story.append(bullet("Inscrits via landing page et newsletter — déjà convaincus, attendent l'ouverture"))
story.append(bullet("Veulent être dans la boucle, avoir le sentiment d'être « de la famille » avant même l'ouverture"))

# --- 3. Ton & voix ---
story += section("3. Ton & voix")
story.append(body(
    "Le Manoïre parle comme Micka parle — à des gens qu'il connaît. "
    "Pas formel, pas corporate, jamais condescendant. Un ton de chalet, pas de palace."
))
story.append(Spacer(1, 0.2*cm))
story.append(table_2col([
    ("À FAIRE", "POURQUOI"),
    ('"Dans 3 jours, les portes s\'ouvrent. On a tellement hâte."', "Direct, émotionnel, humain"),
    ('"Il y a des endroits qui font du bien rien qu\'en les regardant."', "Poétique sans être ampoulé"),
    ('"Elle a tout vérifié. Elle approuve. (Elle a aussi mangé un gant.)"', "Humour léger via Anouck"),
    ('"À 1 500m, on ne plaisante pas avec la qualité."', "Ancré dans le lieu, affirmatif"),
], col1_width=6.5*cm, col2_width=9*cm))
story.append(Spacer(1, 0.3*cm))
story.append(table_2col([
    ("À ÉVITER", "PARCE QUE"),
    ('"Notre établissement vous accueille avec plaisir"', "Trop formel — pas notre ton"),
    ('"Une expérience culinaire inoubliable"', "Trop marketing — vide de sens"),
    ("Les superlatifs vides : exceptionnel, incroyable, unique", "Ça ne dit rien de concret"),
    ("Les textes trop longs", "Un post n'est pas un article de blog"),
], col1_width=6.5*cm, col2_width=9*cm))

story.append(Spacer(1, 0.2*cm))
story.append(body("Longueur recommandée : 5 à 10 lignes sur Facebook · 3 à 5 lignes sur Instagram"))

# --- 4. Piliers de contenu ---
story += section("4. Piliers de contenu")

piliers = [
    ("Pilier 1 — L'aventure en temps réel",
     "Raconter ce qui se passe, comme si on envoyait un message à un ami.",
     ["Avancement des travaux (avant / pendant / après)",
      "L'arrivée de l'équipe saisonnière",
      "J-15, J-3, Jour J de l'ouverture"]),
    ("Pilier 2 — Le lieu et la vue",
     "Le Col de Jaman est un personnage à part entière.",
     ["Photos de la terrasse avec vue sur les Alpes et le lac Léman",
      "Ambiance selon la météo (brouillard, soleil d'été, premier gel)",
      "Les sentiers de randonnée qui passent devant le restaurant"]),
    ("Pilier 3 — Le terroir et la cuisine",
     "Ce qu'on mange, d'où ça vient, qui l'a produit.",
     ["Présentation d'un producteur local ou d'un fromage du Chablais",
      "Un plat de la carte avec son histoire courte",
      "Arrivée de nouveaux produits selon la saison"]),
    ("Pilier 4 — Anouck",
     "La mascotte, le fil émotionnel, la touche d'humour qui humanise.",
     ["Anouck \"inspecte\" les travaux ou la cuisine",
      "Anouck accueille les premiers clients",
      "Anouck et la météo du col"]),
    ("Pilier 5 — Info pratique et appel à l'action",
     "Ce qu'il faut savoir pour venir. À utiliser ponctuellement, pas en continu.",
     ["Horaires d'ouverture (avec rappel selon la saison)",
      "Comment accéder au Col de Jaman",
      "Rappel du Bon Cadeau Fondateur, réservation"]),
]

for titre, desc, exemples in piliers:
    block = [
        subsection(titre),
        italic(desc),
    ]
    for e in exemples:
        block.append(bullet(e))
    story.append(KeepTogether(block))
    story.append(Spacer(1, 0.1*cm))

# --- 5. Anouck ---
story += section("5. Anouck — règles d'utilisation")
story.append(body(
    "Anouck n'est pas un gimmick. Elle est le lien émotionnel entre Micka, le lieu et la communauté. "
    "Saint-Bernard qui a grandi au Col de Jaman, elle revient pour l'ouverture — un retour aux sources aussi "
    "fort que celui du restaurant."
))
story.append(Spacer(1, 0.15*cm))
story.append(table_2col([
    ("RÈGLE", "DÉTAIL"),
    ("Fréquence", "1 post sur 2 — ni plus (perd son effet), ni moins (elle est le fil rouge)"),
    ("Photo", "Toujours une vraie photo — pas d'illustration, pas de montage"),
    ("Rôle fictif", "Chef inspectrice, responsable de l'accueil, première cliente — humour par le décalage"),
    ("À éviter", "Les légendes mièvres (\"bébé d'amour\"). Les posts sur elle sans lien avec le resto."),
], col1_width=4*cm, col2_width=11.5*cm))

# --- 6. Rythme & plateformes ---
story += section("6. Rythme & plateformes")
story.append(table_2col([
    ("", "FACEBOOK (priorité)", ),
    ("Fréquence", "2 posts par semaine — mardi et vendredi recommandés"),
    ("Format", "Texte + 1 photo. Texte plus long, on peut raconter davantage."),
    ("Liens", "Cliquables — toujours inclure www.lemanoire-jaman.ch"),
    ("Horaires", "10h–12h ou 17h–19h"),
], col1_width=4*cm, col2_width=11.5*cm))
story.append(Spacer(1, 0.2*cm))
story.append(table_2col([
    ("", "INSTAGRAM"),
    ("Fréquence", "2 posts par semaine — même planning que Facebook"),
    ("Format", "Photo forte en priorité — légende plus courte, plus épurée"),
    ("Liens", "Pas de lien dans la légende → écrire \"lien en bio\""),
    ("Différence clé", "Supprimer le corps long du texte FB. Garder les 2 premières phrases."),
], col1_width=4*cm, col2_width=11.5*cm))

# --- 7. Règles de format ---
story += section("7. Règles de format")

story.append(subsection("Structure type — Facebook"))
story.append(body("Accroche forte (1 ligne) → Corps aéré (3 à 6 lignes) → CTA → URL → Hashtags (5 à 7 max)"))

story.append(subsection("Structure type — Instagram"))
story.append(body("Accroche (1 ligne) → Corps (2 à 3 lignes) → « Lien en bio » → Hashtags (4 à 5 max)"))

story.append(subsection("Emojis"))
story.append(body("1 à 3 par post maximum, en fin de phrase. Jamais en début de chaque ligne."))
story.append(body("Emojis validés Le Manoïre : 🏔️  🐾  🧀  🍷  ☀️  🤍  🔨"))

story.append(subsection("Hashtags officiels"))
story.append(table_2col([
    ("HASHTAG", "USAGE"),
    ("#LeManoire", "Systématique — chaque post"),
    ("#ColDeJaman", "Systématique — chaque post"),
    ("#Montreux", "Systématique — chaque post"),
    ("#AlpageMontreux", "Posts lieu et vue"),
    ("#RestaurantMontagne", "Posts lieu, cuisine, ouverture"),
    ("#Suisse", "Posts à portée touristique"),
    ("#Terroir", "Posts cuisine et producteurs"),
    ("#SaintBernard", "Posts avec Anouck"),
], col1_width=5*cm, col2_width=10.5*cm))

story.append(subsection("CTA — formulations possibles"))
for cta in [
    "www.lemanoire-jaman.ch",
    "Suivez l'aventure → www.lemanoire-jaman.ch",
    "Réservez votre table : www.lemanoire-jaman.ch",
    "Toutes les infos sur www.lemanoire-jaman.ch",
]:
    story.append(bullet(cta))

# --- 8. Thèmes saisonniers ---
story += section("8. Thèmes saisonniers")

saisons = [
    ("Été 2026 — Ouverture (fin juin → fin août)",
     "Célébration, découverte, plein soleil, terrasse.",
     ["Jour J de l'ouverture — post émotionnel fort",
      "Premières semaines : accueil des randonneurs, terrasse en service",
      "Montreux Jazz Festival (début juillet) — le Col est à 20 min",
      "Posts \"vue du soir\" avec coucher de soleil sur le Léman"]),
    ("Automne 2026 (septembre → octobre)",
     "Douceur, couleurs, fin de saison, nostalgie légère.",
     ["Retour des brumes matinales",
      "Plats de saison : fondue, raclette, champignons",
      "Post de clôture de saison — ouvrir sur l'année suivante",
      "Anouck et les premières feuilles mortes"]),
    ("Hiver (si activité)",
     "Intimité, feu de cheminée, montagne enneigée. À confirmer selon ouverture hivernale.",
     ["Ambiance chalet, neige sur la terrasse",
      "Raclette et vin chaud au premier plan",
      "Accueil des skieurs ou raquetteurs"]),
    ("Temps forts transversaux (toute l'année)",
     "",
     ["Météo exceptionnelle au Col → post opportuniste immédiat (ne pas attendre le planning)",
      "Arrivée d'un nouveau producteur ou produit → post terroir",
      "Anniversaire d'ouverture (fin juin 2027)"]),
]

for titre, desc, items in saisons:
    block = [subsection(titre)]
    if desc:
        block.append(italic(desc))
    for item in items:
        block.append(bullet(item))
    story.append(KeepTogether(block))
    story.append(Spacer(1, 0.1*cm))

# --- 9. Ce qu'on ne fait jamais ---
story += section("9. Ce qu'on ne fait jamais")

interdits = [
    ("Parler politique ou polémique", "Le restaurant est un lieu de détente, pas de débat."),
    ("Poster les tarifs sans contexte", "Un prix isolé sonne froid. Toujours associer à une valeur ou expérience."),
    ("Publier une mauvaise photo", "Mieux vaut pas de post qu'une photo floue ou mal cadrée."),
    ("Commenter publiquement les avis négatifs", "Gérer en privé — jamais sur la page."),
    ("Promettre une date incertaine", "« Fin juin » plutôt que « le 25 juin » si ce n'est pas confirmé."),
    ("Publier sans relire", "Une faute flagrante sur un post de restaurant nuit à l'image. 30 secondes, toujours."),
    ("Ignorer les commentaires", "Chaque commentaire mérite une réponse courte — c'est ce qui crée la communauté."),
]

story.append(table_2col([
    ("INTERDIT", "POURQUOI"),
] + interdits, col1_width=5.5*cm, col2_width=10*cm))

# --- Pied de document ---
story.append(Spacer(1, 0.5*cm))
story.append(HRFlowable(width="100%", thickness=0.5, color=PIERRE, spaceAfter=8))
story.append(note(
    "Document de référence — Clockwork Ops pour Le Manoïre · Version 1.0 · Juin 2026 · "
    "À relire et valider avec Micka avant utilisation pour le contenu post-ouverture."
))

doc.build(story, onFirstPage=header_footer, onLaterPages=header_footer)
print(f"PDF genere : {OUT}")
