from reportlab.lib.pagesizes import A4
from reportlab.lib.units import cm
from reportlab.lib import colors
from reportlab.lib.styles import ParagraphStyle
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, HRFlowable, Table, TableStyle, KeepTogether
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
import os

FONTS = r"C:\Windows\Fonts"
pdfmetrics.registerFont(TTFont("Calibri",       os.path.join(FONTS, "calibri.ttf")))
pdfmetrics.registerFont(TTFont("CalibriBold",   os.path.join(FONTS, "calibrib.ttf")))
pdfmetrics.registerFont(TTFont("CalibriItalic", os.path.join(FONTS, "calibrii.ttf")))

NOIR   = colors.HexColor("#1A1A1A")
GRIS   = colors.HexColor("#666666")
BRUN   = colors.HexColor("#5C3A1E")
VERT   = colors.HexColor("#2D6A4F")
VERT_L = colors.HexColor("#EAF4EF")
ORANGE = colors.HexColor("#E67E22")
ORANGE_L = colors.HexColor("#FEF5EC")
BLEU   = colors.HexColor("#2471A3")
BLEU_L = colors.HexColor("#EAF2F8")
PIERRE = colors.HexColor("#D6C9B8")
BEIGE  = colors.HexColor("#F5F0EA")
BLANC  = colors.HexColor("#FFFFFF")
ROUGE  = colors.HexColor("#C0392B")

def s(name, font="Calibri", size=11, color=NOIR, leading=None, spaceAfter=4,
      spaceBefore=0, align="LEFT", leftIndent=0):
    return ParagraphStyle(name=name, fontName=font, fontSize=size, textColor=color,
        leading=leading or size*1.4, spaceAfter=spaceAfter, spaceBefore=spaceBefore,
        alignment={"LEFT":0,"CENTER":1,"RIGHT":2}[align], leftIndent=leftIndent)

S_TITLE  = s("title",  "CalibriBold",  20, BRUN,   leading=26, spaceAfter=2)
S_BRAND  = s("brand",  "CalibriItalic",10, GRIS,   leading=14, spaceAfter=0)
S_H2     = s("h2",     "CalibriBold",  12, BRUN,   leading=17, spaceAfter=3, spaceBefore=12)
S_PHASE  = s("phase",  "CalibriBold",  11, BLANC,  leading=16, spaceAfter=0)
S_BODY   = s("body",   "Calibri",      10, NOIR,   leading=14, spaceAfter=2)
S_SMALL  = s("small",  "Calibri",       9, GRIS,   leading=13, spaceAfter=2)
S_BOLD   = s("bold",   "CalibriBold",  10, NOIR,   leading=14, spaceAfter=2)
S_NOTE   = s("note",   "CalibriItalic", 9, GRIS,   leading=13, spaceAfter=2)
S_WARN   = s("warn",   "CalibriItalic", 9, ROUGE,  leading=13, spaceAfter=2)
S_TOTAL  = s("total",  "CalibriBold",  12, BRUN,   leading=17, spaceAfter=2)
S_RIGHT  = s("right",  "Calibri",      10, NOIR,   leading=14, spaceAfter=2, align="RIGHT")
S_BOLD_R = s("boldr",  "CalibriBold",  10, NOIR,   leading=14, spaceAfter=2, align="RIGHT")
S_CTR    = s("ctr",    "Calibri",       9, GRIS,   leading=13, spaceAfter=2, align="CENTER")
S_BADGE  = s("badge",  "CalibriBold",  10, VERT,   leading=14, spaceAfter=2)

def header_footer(canvas, doc):
    canvas.saveState()
    w, h = A4
    m = 2*cm
    canvas.setFont("CalibriBold", 9)
    canvas.setFillColor(BRUN)
    canvas.drawString(m, h-1.3*cm, "Clockwork Ops")
    canvas.setFont("CalibriItalic", 8)
    canvas.setFillColor(GRIS)
    canvas.drawString(m+3.2*cm, h-1.3*cm, "— Automatisation & Solutions IA")
    canvas.setFont("Calibri", 8)
    canvas.drawRightString(w-m, h-1.3*cm, "DEVIS N° CW-2026-002")
    canvas.setStrokeColor(PIERRE)
    canvas.setLineWidth(0.5)
    canvas.line(m, h-1.55*cm, w-m, h-1.55*cm)
    canvas.line(m, 1.55*cm, w-m, 1.55*cm)
    canvas.setFont("Calibri", 8)
    canvas.setFillColor(GRIS)
    canvas.drawCentredString(w/2, 0.9*cm,
        "Clockwork Ops · Stéphanie Gallois · stef.gallois@gmail.com · Page %d" % doc.page)
    canvas.restoreState()

def phase_header(label, color):
    t = Table([[Paragraph(label, S_PHASE)]], colWidths=[17*cm])
    t.setStyle(TableStyle([
        ("BACKGROUND",    (0,0), (-1,-1), color),
        ("LEFTPADDING",   (0,0), (-1,-1), 10),
        ("TOPPADDING",    (0,0), (-1,-1), 6),
        ("BOTTOMPADDING", (0,0), (-1,-1), 6),
        ("ROUNDEDCORNERS", [4]),
    ]))
    return t

def ligne_table(rows, show_total=True, total_label="Sous-total", total_val=""):
    header = [
        Paragraph("Prestation", s("th","CalibriBold",10,BLANC)),
        Paragraph("Description", s("th2","CalibriBold",10,BLANC)),
        Paragraph("CHF HT", s("th3","CalibriBold",10,BLANC,align="RIGHT")),
    ]
    data = [header]
    for titre, desc, montant in rows:
        data.append([
            Paragraph(titre, s("tr","CalibriBold",10,NOIR,leading=14)),
            Paragraph(desc,  s("td","Calibri",9,NOIR,leading=13)),
            Paragraph(montant, s("tm","Calibri",10,NOIR,align="RIGHT")),
        ])
    if show_total:
        data.append([
            Paragraph("", S_BODY),
            Paragraph(total_label, s("tl","CalibriBold",10,BRUN,align="RIGHT")),
            Paragraph(total_val,   s("tv","CalibriBold",11,BRUN,align="RIGHT")),
        ])
    t = Table(data, colWidths=[4*cm, 9.5*cm, 3.5*cm])
    style = [
        ("BACKGROUND",    (0,0), (-1,0),  BRUN),
        ("ROWBACKGROUNDS",(0,1), (-1,-2 if show_total else -1), [BLANC, BEIGE]),
        ("GRID",          (0,0), (-1,-1 if not show_total else -2), 0.4, PIERRE),
        ("LINEABOVE",     (0,-1), (-1,-1), 1, BRUN),
        ("LEFTPADDING",   (0,0), (-1,-1), 8),
        ("RIGHTPADDING",  (0,0), (-1,-1), 8),
        ("TOPPADDING",    (0,0), (-1,-1), 6),
        ("BOTTOMPADDING", (0,0), (-1,-1), 6),
        ("VALIGN",        (0,0), (-1,-1), "TOP"),
    ]
    if not show_total:
        style = [x for x in style if x[0] != "LINEABOVE"]
    t.setStyle(TableStyle(style))
    return t

# ── DOCUMENT ────────────────────────────────────────────────────────────────
OUT = os.path.join(os.path.dirname(__file__), "devis_CW-2026-002_planning_personnel.pdf")
doc = SimpleDocTemplate(OUT, pagesize=A4,
    topMargin=2.2*cm, bottomMargin=2.2*cm, leftMargin=2.5*cm, rightMargin=2.5*cm,
    title="Devis CW-2026-002 — App Planning Personnel", author="Clockwork Ops")

story = []

# ── EN-TÊTE ──────────────────────────────────────────────────────────────────
bloc = Table([[
    [
        Paragraph("Clockwork Ops", s("ps","CalibriBold",13,BRUN,leading=18)),
        Paragraph("Stéphanie Gallois", S_BODY),
        Paragraph("[Ton adresse complète]", S_WARN),
        Paragraph("74500 Évian-les-Bains, France", S_BODY),
        Paragraph("SIRET : [À COMPLÉTER]", S_WARN),
        Paragraph("stef.gallois@gmail.com", S_BODY),
    ],
    [
        Paragraph("Destinataire", s("cl","CalibriBold",10,GRIS,leading=14)),
        Paragraph("Micka Moreau — Le Manoïre", S_BOLD),
        Paragraph("Col de Jaman · Canton de Vaud · Suisse", S_BODY),
        Paragraph("micha.moreau@gmail.com", S_BODY),
        Spacer(1, 0.3*cm),
        Paragraph("<b>Devis N° :</b>  CW-2026-002", S_BODY),
        Paragraph("<b>Date :</b>  18 juin 2026", S_BODY),
        Paragraph("<b>Validité :</b>  30 jours (jusqu'au 18 juillet 2026)", S_BODY),
    ],
]], colWidths=[9*cm, 8*cm])
bloc.setStyle(TableStyle([
    ("VALIGN",(0,0),(-1,-1),"TOP"),
    ("LEFTPADDING",(0,0),(-1,-1),0),
    ("RIGHTPADDING",(0,0),(-1,-1),0),
]))
story.append(bloc)
story.append(Spacer(1, 0.4*cm))
story.append(HRFlowable(width="100%", thickness=1.5, color=BRUN, spaceAfter=10))

story.append(Paragraph("Devis — Application de gestion du planning personnel", S_TITLE))
story.append(Paragraph("Site & système Le Manoïre · Softr + Airtable + Make", S_BRAND))
story.append(Spacer(1, 0.2*cm))
story.append(Paragraph(
    "Ce document détaille la valorisation de la Phase 1 (MVP livré), les évolutions Phase 2 "
    "disponibles pour l'ouverture, et la Phase 3 d'extension hôtel à horizon hiver 2027.",
    S_NOTE))
story.append(Spacer(1, 0.4*cm))

# ── PHASE 1 — MVP LIVRÉ ──────────────────────────────────────────────────────
story.append(phase_header("Phase 1 — MVP livré  ✓  (valorisation)", VERT))
story.append(Spacer(1, 0.2*cm))
story.append(Paragraph(
    "Prestations réalisées et opérationnelles. Valorisation pour référence comptable.",
    S_NOTE))
story.append(Spacer(1, 0.15*cm))

mvp_rows = [
    (
        "Base Airtable\nplanning",
        "Conception et configuration de la base de données : tables Employés, Postes, "
        "Créneaux/Shifts. Vues filtrées par semaine et par employé. "
        "Paramétrage adapté à une équipe de 10 personnes maximum.",
        "450.00"
    ),
    (
        "Système de\ngénération IA",
        "Conception du système de génération automatique des plannings par IA (Claude) : "
        "instructions métier, règles de rotation, contraintes horaires, format de sortie "
        "directement exploitable dans Airtable. Itérations jusqu'au résultat validé.",
        "400.00"
    ),
    (
        "Onboarding\nMicka (manager)",
        "Guide d'utilisation pour le manager : comment lancer la génération du planning via IA, "
        "comment modifier manuellement dans Airtable, procédure en cas d'erreur.",
        "150.00"
    ),
    (
        "Onboarding\néquipe (employés)",
        "Guide de consultation du planning pour les employés (jusqu'à 10 personnes) : "
        "accès, lecture du planning hebdomadaire, contact en cas d'erreur. "
        "Format simple adapté à une équipe non technique.",
        "150.00"
    ),
]
story.append(ligne_table(mvp_rows, show_total=True,
    total_label="Sous-total Phase 1", total_val="1 150.00 CHF"))
story.append(Spacer(1, 0.5*cm))

# ── PHASE 2 — ÉVOLUTIONS ─────────────────────────────────────────────────────
story.append(phase_header("Phase 2 — Évolutions pré-ouverture  (à valider)", ORANGE))
story.append(Spacer(1, 0.2*cm))
story.append(Paragraph(
    "Modules optionnels à activer selon les retours sur le MVP et les besoins à l'ouverture.",
    S_NOTE))
story.append(Spacer(1, 0.15*cm))

p2_rows = [
    (
        "Interface Softr\napp web équipe",
        "Création de l'application web connectée à Airtable : vue planning hebdomadaire "
        "lisible par l'équipe, fiche par employé, accès sécurisé. "
        "Chaque salarié consulte son planning sans accéder à Airtable directement.",
        "800.00"
    ),
    (
        "Notifications\nautomatiques",
        "Scénario Make : envoi automatique du planning à chaque employé par email "
        "chaque début de semaine. Rappel 24h avant chaque shift.",
        "350.00"
    ),
    (
        "Saisie des\ndisponibilités",
        "Module Softr : chaque employé indique ses jours disponibles pour la semaine suivante. "
        "Micka voit les dispos avant de lancer la génération IA du planning.",
        "350.00"
    ),
]
story.append(ligne_table(p2_rows, show_total=True,
    total_label="Sous-total Phase 2 (complet)", total_val="1 500.00 CHF"))
story.append(Spacer(1, 0.3*cm))
story.append(Paragraph(
    "La Phase 2 est optionnelle — le système IA + Airtable fonctionne indépendamment. "
    "À activer si l'équipe a besoin d'accès direct au planning.",
    S_NOTE))
story.append(Spacer(1, 0.5*cm))

# ── MAINTENANCE ───────────────────────────────────────────────────────────────
story.append(KeepTogether([
    Paragraph("Maintenance mensuelle", S_H2),
    HRFlowable(width="100%", thickness=0.5, color=PIERRE, spaceAfter=6),
    Table([
        [
            Paragraph("Maintenance applicative", S_BOLD),
            Paragraph(
                "Corrections de bugs, mises à jour Softr/Airtable, ajustements mineurs "
                "sur demande, surveillance des scénarios Make.",
                S_BODY),
            Paragraph("200–400 CHF/mois", s("mr","CalibriBold",10,BRUN,align="RIGHT")),
        ],
    ], colWidths=[4*cm, 9.5*cm, 3.5*cm], style=TableStyle([
        ("ROWBACKGROUNDS",(0,0),(-1,-1),[BEIGE]),
        ("GRID",(0,0),(-1,-1),0.4,PIERRE),
        ("LEFTPADDING",(0,0),(-1,-1),8),
        ("RIGHTPADDING",(0,0),(-1,-1),8),
        ("TOPPADDING",(0,0),(-1,-1),7),
        ("BOTTOMPADDING",(0,0),(-1,-1),7),
        ("VALIGN",(0,0),(-1,-1),"TOP"),
    ])),
]))
story.append(Spacer(1, 0.5*cm))

# ── RÉCAPITULATIF GLOBAL ──────────────────────────────────────────────────────
story.append(KeepTogether([
    Paragraph("Récapitulatif global", S_H2),
    HRFlowable(width="100%", thickness=0.5, color=PIERRE, spaceAfter=6),
    Table([
        [Paragraph("Phase 1 — Airtable + IA + onboarding manager & équipe", S_BODY), Paragraph("1 150.00 CHF", S_RIGHT)],
        [Paragraph("Phase 2 — Interface Softr + notifications + dispos",   S_BODY), Paragraph("1 500.00 CHF", S_RIGHT)],
        [Paragraph("Total projet",                                          S_TOTAL), Paragraph("2 650.00 CHF", S_TOTAL)],
    ], colWidths=[12*cm, 5*cm], style=TableStyle([
        ("LINEABOVE",     (0,3), (-1,3), 1, BRUN),
        ("TOPPADDING",    (0,0), (-1,-1), 5),
        ("BOTTOMPADDING", (0,0), (-1,-1), 5),
        ("LEFTPADDING",   (0,0), (-1,-1), 0),
        ("RIGHTPADDING",  (0,0), (-1,-1), 0),
    ])),
    Spacer(1, 0.2*cm),
    Paragraph(
        "* TVA non applicable — Prestation de service rendue à un preneur établi hors de "
        "l'Union Européenne (art. 259 du CGI). Facturation en CHF.",
        S_NOTE),
]))
story.append(Spacer(1, 0.4*cm))

# ── CONDITIONS ────────────────────────────────────────────────────────────────
story.append(KeepTogether([
    Paragraph("Conditions de paiement", S_H2),
    HRFlowable(width="100%", thickness=0.5, color=PIERRE, spaceAfter=6),
    Paragraph(
        "Chaque phase est facturée indépendamment à sa validation. "
        "Acompte 30% à la commande de chaque phase, solde à la livraison. "
        "Règlement par virement bancaire (IBAN : [À COMPLÉTER]) ou paiement en ligne.",
        S_BODY),
    Spacer(1, 0.15*cm),
    Paragraph(
        "Conformément à l'article L. 441-10 du Code de commerce, tout retard de paiement entraîne "
        "des pénalités au taux légal en vigueur ainsi qu'une indemnité forfaitaire de recouvrement de 40 €.",
        S_NOTE),
]))
story.append(Spacer(1, 0.4*cm))

# ── ACCEPTATION ──────────────────────────────────────────────────────────────
story.append(KeepTogether([
    Paragraph("Acceptation", S_H2),
    HRFlowable(width="100%", thickness=0.5, color=PIERRE, spaceAfter=6),
    Paragraph(
        "Pour valider tout ou partie de ce devis, merci de préciser les phases souhaitées "
        "et de retourner le document signé avec la mention <b>« Bon pour accord »</b>.",
        S_BODY),
    Spacer(1, 0.8*cm),
    Table([[
        [
            Paragraph("Pour Clockwork Ops", S_NOTE),
            Spacer(1,0.8*cm),
            Paragraph("Stéphanie Gallois", S_BODY),
            Paragraph("Date : 18 juin 2026", S_NOTE),
        ],
        [
            Paragraph("Pour Le Manoïre", S_NOTE),
            Spacer(1,0.8*cm),
            Paragraph("Micka Moreau", S_BODY),
            Paragraph("Date : ________________", S_NOTE),
            Paragraph("Signature + « Bon pour accord »", S_NOTE),
            Paragraph("Phases validées : ________________", S_NOTE),
        ],
    ]], colWidths=[8.5*cm, 8.5*cm], style=TableStyle([
        ("VALIGN",(0,0),(-1,-1),"TOP"),
        ("LEFTPADDING",(0,0),(-1,-1),0),
        ("RIGHTPADDING",(0,0),(-1,-1),12),
        ("LINEABOVE",(0,0),(-1,0),0.5,PIERRE),
        ("TOPPADDING",(0,0),(-1,-1),8),
    ])),
]))

story.append(Spacer(1,0.5*cm))
story.append(HRFlowable(width="100%", thickness=0.5, color=PIERRE, spaceAfter=6))
story.append(Paragraph(
    "Clockwork Ops — Stéphanie Gallois · Évian-les-Bains (74500) France · "
    "stef.gallois@gmail.com · SIRET [À COMPLÉTER]",
    S_CTR))

doc.build(story, onFirstPage=header_footer, onLaterPages=header_footer)
print(f"PDF généré : {OUT}")
