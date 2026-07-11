from reportlab.lib.pagesizes import A4
from reportlab.lib.units import cm
from reportlab.lib import colors
from reportlab.lib.styles import ParagraphStyle
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, HRFlowable, Table, TableStyle, KeepTogether
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
import os

FONTS = r"C:\Windows\Fonts"
pdfmetrics.registerFont(TTFont("Calibri",           os.path.join(FONTS, "calibri.ttf")))
pdfmetrics.registerFont(TTFont("CalibriBold",       os.path.join(FONTS, "calibrib.ttf")))
pdfmetrics.registerFont(TTFont("CalibriItalic",     os.path.join(FONTS, "calibrii.ttf")))

BRUN   = colors.HexColor("#5C3A1E")
VERT   = colors.HexColor("#2D6A4F")
ROUGE  = colors.HexColor("#C0392B")
ORANGE = colors.HexColor("#E67E22")
PIERRE = colors.HexColor("#D6C9B8")
BEIGE  = colors.HexColor("#F5F0EA")
GRIS   = colors.HexColor("#666666")
NOIR   = colors.HexColor("#1A1A1A")
BLANC  = colors.HexColor("#FFFFFF")

def s(name, font="Calibri", size=11, color=NOIR, leading=None, spaceAfter=5, spaceBefore=0, align="LEFT", leftIndent=0):
    return ParagraphStyle(name=name, fontName=font, fontSize=size, textColor=color,
        leading=leading or size*1.45, spaceAfter=spaceAfter, spaceBefore=spaceBefore,
        alignment={"LEFT":0,"CENTER":1}[align], leftIndent=leftIndent)

S_TITLE   = s("title",  "CalibriBold", 22, BRUN,  leading=28, spaceAfter=2)
S_SUB     = s("sub",    "Calibri",     13, GRIS,  leading=18, spaceAfter=12)
S_H2      = s("h2",     "CalibriBold", 13, BRUN,  leading=18, spaceAfter=4, spaceBefore=14)
S_BODY    = s("body",   "Calibri",     11, NOIR,  leading=16, spaceAfter=3)
S_BULLET  = s("bullet", "Calibri",     11, NOIR,  leading=16, spaceAfter=2, leftIndent=12)
S_CHECK   = s("check",  "Calibri",     11, GRIS,  leading=16, spaceAfter=2, leftIndent=12)
S_BOLD    = s("bold",   "CalibriBold", 11, NOIR,  leading=16, spaceAfter=3)
S_NOTE    = s("note",   "CalibriItalic",10,GRIS,  leading=14, spaceAfter=6)
S_BADGE_V = s("badgev", "CalibriBold", 10, VERT,  leading=13, spaceAfter=2)
S_BADGE_O = s("badgeo", "CalibriBold", 10, ORANGE,leading=13, spaceAfter=2)
S_BADGE_R = s("baddr",  "CalibriBold", 10, ROUGE, leading=13, spaceAfter=2)

def header_footer(canvas, doc):
    canvas.saveState()
    w, h = A4
    m = 2*cm
    canvas.setFont("CalibriItalic", 9)
    canvas.setFillColor(GRIS)
    canvas.drawString(m, h-1.4*cm, "Le Manoïre — Brief call 18 juin 2026")
    canvas.setStrokeColor(PIERRE)
    canvas.setLineWidth(0.5)
    canvas.line(m, h-1.6*cm, w-m, h-1.6*cm)
    canvas.line(m, 1.6*cm, w-m, 1.6*cm)
    canvas.setFont("Calibri", 9)
    canvas.drawCentredString(w/2, 1.0*cm, f"Clockwork Ops · Page {doc.page}")
    canvas.restoreState()

def section(title):
    return [Paragraph(title, S_H2), HRFlowable(width="100%", thickness=1, color=PIERRE, spaceAfter=6)]

def bullet(text, style=S_BULLET):
    return Paragraph("• " + text, style)

def checkbox(text):
    return Paragraph("☐  " + text, S_CHECK)

def status_table(rows):
    data = []
    for livrable, statut, badge_style in rows:
        data.append([Paragraph(livrable, s("td","Calibri",10,NOIR)), Paragraph(statut, badge_style)])
    t = Table(data, colWidths=[11*cm, 4.5*cm])
    t.setStyle(TableStyle([
        ("ROWBACKGROUNDS", (0,0), (-1,-1), [BLANC, BEIGE]),
        ("GRID",          (0,0), (-1,-1), 0.4, PIERRE),
        ("LEFTPADDING",   (0,0), (-1,-1), 8),
        ("RIGHTPADDING",  (0,0), (-1,-1), 8),
        ("TOPPADDING",    (0,0), (-1,-1), 5),
        ("BOTTOMPADDING", (0,0), (-1,-1), 5),
        ("VALIGN",        (0,0), (-1,-1), "MIDDLE"),
    ]))
    return t

OUT = os.path.join(os.path.dirname(__file__), "brief_call_18juin.pdf")
doc = SimpleDocTemplate(OUT, pagesize=A4,
    topMargin=2.2*cm, bottomMargin=2.2*cm, leftMargin=2.5*cm, rightMargin=2.5*cm,
    title="Brief call Manoïre — 18 juin 2026", author="Clockwork Ops")

story = []

# --- Titre ---
story.append(Paragraph("Brief call — Le Manoïre", S_TITLE))
story.append(Paragraph("18 juin 2026  ·  Micka Moreau  ·  Ouverture début juillet", S_SUB))
story.append(HRFlowable(width="100%", thickness=1.5, color=BRUN, spaceAfter=14))

# --- 1. État du projet ---
story += section("1. État du projet")
story.append(status_table([
    ("Landing page + inscription automatisée (Airtable/Make)", "✅ Livré", S_BADGE_V),
    ("Site web multi-pages (6 pages + météo col)", "⏳ En cours — retours ?", S_BADGE_O),
    ("App planning équipe (Softr + Airtable)", "✅ MVP livré — retour ?", S_BADGE_O),
    ("Automatisation réseaux sociaux (Make)", "✅ MVP livré — retour ?", S_BADGE_O),
    ("6 newsletters — PDF client", "✅ Prêt — à valider ce soir", S_BADGE_O),
    ("Ligne éditoriale — PDF client", "✅ Prêt — à valider ce soir", S_BADGE_O),
    ("Page Bons Cadeaux (site web)", "⏳ À créer", S_BADGE_R),
    ("Automatisation envoi newsletters (8)", "⏳ Textes OK — envoi auto à faire", S_BADGE_R),
    ("Carte + menu boissons (site web)", "⏳ En attente Micka", S_BADGE_R),
]))
story.append(Spacer(1, 0.3*cm))

# --- 2. Agenda du call ---
story += section("2. Agenda suggéré (45 min)")
agenda = [
    ("5 min",  "Tour rapide de l'état du projet — ce qui tourne, ce qui reste"),
    ("10 min", "Retours MVP app planning équipe — ça répond à son besoin ?"),
    ("10 min", "Retours MVP réseaux sociaux — il a testé ? Accès FB/Insta OK ?"),
    ("10 min", "Présenter les 3 livrables du soir : newsletters, ligne éd, bons cadeaux"),
    ("10 min", "Besoins futurs + priorisation avant ouverture"),
]
t = Table([[Paragraph(d, s("td","CalibriBold",10,BRUN)), Paragraph(s2, s("td2","Calibri",10,NOIR))]
           for d, s2 in agenda], colWidths=[2.5*cm, 13*cm])
t.setStyle(TableStyle([
    ("ROWBACKGROUNDS", (0,0), (-1,-1), [BLANC, BEIGE]),
    ("GRID",          (0,0), (-1,-1), 0.4, PIERRE),
    ("LEFTPADDING",   (0,0), (-1,-1), 8),
    ("RIGHTPADDING",  (0,0), (-1,-1), 8),
    ("TOPPADDING",    (0,0), (-1,-1), 5),
    ("BOTTOMPADDING", (0,0), (-1,-1), 5),
    ("VALIGN",        (0,0), (-1,-1), "MIDDLE"),
]))
story.append(t)
story.append(Spacer(1, 0.3*cm))

# --- 3. Infos à récupérer ---
story += section("3. Infos à récupérer obligatoirement ce soir")
infos = [
    "Date d'ouverture exacte — début juillet = quel jour précis ?",
    "Carte + menu des boissons — il l'envoie quand ? (site web bloqué sans ça)",
    "Photos définitives — hero + galerie — il a quoi de disponible maintenant ?",
    "Horaires d'ouverture — service midi uniquement ? Midi + soir ? Week-end ?",
    "Formulaire de réservation — il veut l'activer pour l'ouverture ou pas ?",
    "Accès Facebook Business Manager + Instagram pro — pour finaliser le scénario Make",
]
for info in infos:
    story.append(checkbox(info))
story.append(Spacer(1, 0.3*cm))

# --- 4. Retours à collecter MVPs ---
story += section("4. Questions sur les 2 MVPs livrés")

story.append(Paragraph("Site web multi-pages", S_BOLD))
site = [
    "Il a eu le temps de parcourir le site — qu'est-ce qui lui plaît, qu'est-ce qui manque ou lui dérange ?",
    "Page Carte : il a le menu complet ? Avec les prix ? Il peut l'envoyer ce soir ou quel délai ?",
    "Page Galerie : il a combien de photos prêtes ? Format / qualité OK pour le web ?",
    "Horaires définitifs : service midi uniquement, midi + soir ? Quels jours ? Fermé quel jour ?",
    "Formulaire de réservation : il veut l'activer pour l'ouverture début juillet ou pas encore ?",
    "Photo hero de l'accueil : il en a une belle qu'il aime ? (c'est la première impression)",
    "Il y a une connexion internet correcte au Col pour qu'il puisse accéder et suivre le site ?",
]
for q in site:
    story.append(bullet(q))

story.append(Spacer(1, 0.2*cm))
story.append(Paragraph("App planning équipe", S_BOLD))
mvp1 = [
    "L'interface Softr est-elle utilisable pour son équipe ?",
    "Les postes/rôles configurés correspondent-ils à sa réalité ?",
    "Il manque quoi pour que ce soit vraiment opérationnel à l'ouverture ?",
]
for q in mvp1:
    story.append(bullet(q))

story.append(Spacer(1, 0.2*cm))
story.append(Paragraph("Automatisation réseaux sociaux", S_BOLD))
mvp2 = [
    "Il a pu se connecter à Airtable et voir le calendrier des posts ?",
    "Le scénario Make a-t-il tourné sur des tests ? Des erreurs ?",
    "Il est prêt à l'activer officiellement ou il faut encore ajuster ?",
]
for q in mvp2:
    story.append(bullet(q))
story.append(Spacer(1, 0.3*cm))

# --- 5. Livrables à présenter ce soir ---
story += section("5. Livrables à présenter ce soir")
livrables = [
    ("Newsletters (6)", "PDF à lui envoyer pendant le call — valider le ton, les accroches, Anouck"),
    ("Ligne éditoriale", "PDF à lui envoyer — à valider avant utilisation post-ouverture"),
    ("Page Bons Cadeaux", "Nouvelle page web à lui montrer — 15% de remise Fondateur"),
]
t2 = Table([[Paragraph(l, s("l","CalibriBold",10,BRUN)),
             Paragraph(d, s("d","Calibri",10,NOIR))] for l, d in livrables],
           colWidths=[4*cm, 11.5*cm])
t2.setStyle(TableStyle([
    ("ROWBACKGROUNDS", (0,0), (-1,-1), [BLANC, BEIGE]),
    ("GRID",          (0,0), (-1,-1), 0.4, PIERRE),
    ("LEFTPADDING",   (0,0), (-1,-1), 8),
    ("RIGHTPADDING",  (0,0), (-1,-1), 8),
    ("TOPPADDING",    (0,0), (-1,-1), 6),
    ("BOTTOMPADDING", (0,0), (-1,-1), 6),
    ("VALIGN",        (0,0), (-1,-1), "TOP"),
]))
story.append(t2)
story.append(Spacer(1, 0.3*cm))

# --- 6. Besoins futurs ---
story += section("6. Idées besoins futurs à lui soumettre")

story.append(Paragraph("Court terme — avant/juste après ouverture", S_BOLD))
for item in [
    "Activer le scénario Make réseaux sociaux (test final ensemble)",
    "Automatisation des 8 newsletters — les textes sont prêts, il faut connecter l'envoi auto (Brevo ?)",
]:
    story.append(bullet(item))

story.append(Spacer(1, 0.2*cm))
story.append(Paragraph("Moyen terme — après l'été", S_BOLD))
for item in [
    "CRM clients léger (Airtable) — fiche client, historique visites, anniversaires → email perso",
    "Gestion stocks + fournisseurs — table Airtable + alertes Make quand stock bas",
    "Réservation en ligne activée — formulaire Tally → Airtable → email de confirmation auto",
    "Google My Business — profil à optimiser, répondre aux avis, publier des posts",
    "Présence plateformes — TheFork, TripAdvisor (réservation + gestion des avis)",
]:
    story.append(bullet(item))

story.append(Spacer(1, 0.2*cm))
story.append(Paragraph("Long terme — projet hôtel (hiver 2027)", S_BOLD))
for item in [
    "Réservation chambres — formulaire → Airtable → confirmation automatique",
    "Extension app planning — gestion hôtel + restaurant dans le même outil",
    "Newsletter segmentée — clients restaurant vs clients hôtel",
]:
    story.append(bullet(item))

story.append(Spacer(1, 0.5*cm))
story.append(HRFlowable(width="100%", thickness=0.5, color=PIERRE, spaceAfter=6))
story.append(Paragraph("Clockwork Ops · Stéphanie · Call Manoïre du 18 juin 2026", S_NOTE))

doc.build(story, onFirstPage=header_footer, onLaterPages=header_footer)
print(f"PDF genere : {OUT}")
