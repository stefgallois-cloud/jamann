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
GRIS_L = colors.HexColor("#F5F5F5")
BRUN   = colors.HexColor("#5C3A1E")   # charte Manoïre / Clockwork Ops
VERT   = colors.HexColor("#2D6A4F")
PIERRE = colors.HexColor("#D6C9B8")
BEIGE  = colors.HexColor("#F5F0EA")
BLANC  = colors.HexColor("#FFFFFF")
ROUGE  = colors.HexColor("#C0392B")

def s(name, font="Calibri", size=11, color=NOIR, leading=None, spaceAfter=4, spaceBefore=0, align="LEFT", leftIndent=0):
    return ParagraphStyle(name=name, fontName=font, fontSize=size, textColor=color,
        leading=leading or size*1.4, spaceAfter=spaceAfter, spaceBefore=spaceBefore,
        alignment={"LEFT":0,"CENTER":1,"RIGHT":2}[align], leftIndent=leftIndent)

S_TITLE  = s("title",  "CalibriBold",  20, BRUN,  leading=26, spaceAfter=2)
S_BRAND  = s("brand",  "CalibriItalic",10, GRIS,  leading=14, spaceAfter=0)
S_H2     = s("h2",     "CalibriBold",  12, BRUN,  leading=17, spaceAfter=3, spaceBefore=10)
S_BODY   = s("body",   "Calibri",      10, NOIR,  leading=14, spaceAfter=2)
S_SMALL  = s("small",  "Calibri",       9, GRIS,  leading=13, spaceAfter=2)
S_BOLD   = s("bold",   "CalibriBold",  10, NOIR,  leading=14, spaceAfter=2)
S_NOTE   = s("note",   "CalibriItalic", 9, GRIS,  leading=13, spaceAfter=2)
S_TOTAL  = s("total",  "CalibriBold",  12, BRUN,  leading=17, spaceAfter=2)
S_WARN   = s("warn",   "CalibriItalic", 9, ROUGE, leading=13, spaceAfter=2)
S_RIGHT  = s("right",  "Calibri",      10, NOIR,  leading=14, spaceAfter=2, align="RIGHT")
S_BOLD_R = s("boldr",  "CalibriBold",  10, NOIR,  leading=14, spaceAfter=2, align="RIGHT")
S_CTR    = s("ctr",    "Calibri",       9, GRIS,  leading=13, spaceAfter=2, align="CENTER")

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
    canvas.drawRightString(w-m, h-1.3*cm, "DEVIS N° CW-2026-001")
    canvas.setStrokeColor(PIERRE)
    canvas.setLineWidth(0.5)
    canvas.line(m, h-1.55*cm, w-m, h-1.55*cm)
    canvas.line(m, 1.55*cm, w-m, 1.55*cm)
    canvas.setFont("Calibri", 8)
    canvas.setFillColor(GRIS)
    canvas.drawCentredString(w/2, 0.9*cm, "Clockwork Ops · Stéphanie Gallois · stef.gallois@gmail.com · Page %d" % doc.page)
    canvas.restoreState()

OUT = os.path.join(os.path.dirname(__file__), "devis_CW-2026-001_bons_cadeaux.pdf")
doc = SimpleDocTemplate(OUT, pagesize=A4,
    topMargin=2.2*cm, bottomMargin=2.2*cm, leftMargin=2.5*cm, rightMargin=2.5*cm,
    title="Devis CW-2026-001 — Bons Cadeaux Le Manoïre", author="Clockwork Ops")

story = []

# ── BLOC PRESTATAIRE + CLIENT ───────────────────────────────────────────────
bloc = Table([
    [
        # Colonne gauche — Prestataire
        [
            Paragraph("Clockwork Ops", s("ps","CalibriBold",13,BRUN,leading=18)),
            Paragraph("Stéphanie Gallois", S_BODY),
            Paragraph("[Ton adresse complète]", S_WARN),
            Paragraph("74500 Évian-les-Bains, France", S_BODY),
            Paragraph("SIRET : [À COMPLÉTER]", S_WARN),
            Paragraph("stef.gallois@gmail.com", S_BODY),
        ],
        # Colonne droite — Client + infos devis
        [
            Paragraph("Destinataire", s("cl","CalibriBold",10,GRIS,leading=14)),
            Paragraph("Micka Moreau — Le Manoïre", S_BOLD),
            Paragraph("Col de Jaman · Canton de Vaud · Suisse", S_BODY),
            Paragraph("micha.moreau@gmail.com", S_BODY),
            Spacer(1, 0.3*cm),
            Paragraph("<b>Devis N° :</b>  CW-2026-001", S_BODY),
            Paragraph("<b>Date :</b>  18 juin 2026", S_BODY),
            Paragraph("<b>Validité :</b>  30 jours (jusqu'au 18 juillet 2026)", S_BODY),
        ],
    ]
], colWidths=[9*cm, 8*cm])
bloc.setStyle(TableStyle([
    ("VALIGN", (0,0), (-1,-1), "TOP"),
    ("LEFTPADDING", (0,0), (-1,-1), 0),
    ("RIGHTPADDING", (0,0), (-1,-1), 0),
]))
story.append(bloc)
story.append(Spacer(1, 0.4*cm))
story.append(HRFlowable(width="100%", thickness=1.5, color=BRUN, spaceAfter=10))

# ── TITRE ───────────────────────────────────────────────────────────────────
story.append(Paragraph("Devis — Page Bons Cadeaux + Paiement en ligne", S_TITLE))
story.append(Paragraph("Site web Le Manoïre · lemanoire-jaman.ch", S_BRAND))
story.append(Spacer(1, 0.4*cm))

# ── DESCRIPTION PROJET ──────────────────────────────────────────────────────
story.append(Paragraph("Objet de la prestation", S_H2))
story.append(HRFlowable(width="100%", thickness=0.5, color=PIERRE, spaceAfter=6))
story.append(Paragraph(
    "Création et intégration d'une page <b>Bons Cadeaux</b> sur le site multi-pages du Manoïre, "
    "avec système de paiement en ligne sécurisé (Stripe) et automatisation de la livraison du bon cadeau par email.",
    S_BODY))
story.append(Spacer(1, 0.3*cm))

# ── TABLE DES PRESTATIONS ────────────────────────────────────────────────────
story.append(Paragraph("Détail des prestations", S_H2))
story.append(HRFlowable(width="100%", thickness=0.5, color=PIERRE, spaceAfter=6))

header_row = [
    Paragraph("Prestation", s("th","CalibriBold",10,BLANC)),
    Paragraph("Description", s("th2","CalibriBold",10,BLANC)),
    Paragraph("Montant CHF", s("th3","CalibriBold",10,BLANC,align="RIGHT")),
]

rows = [
    (
        "Création page web\n« Bons Cadeaux »",
        "Page HTML/CSS intégrée au site existant — respect de la charte graphique Le Manoïre "
        "(nav.js, styles.css partagés), contenu de l'offre, mise en avant du tarif Fondateur, "
        "responsive mobile, CTA d'achat.",
        "500.00"
    ),
    (
        "Intégration paiement\nStripe",
        "Configuration du compte Stripe (Payment Link), paramétrage du montant, de la devise (CHF) "
        "et des métadonnées. Intégration du bouton d'achat sur la page. Page de confirmation "
        "post-paiement. Frais Stripe à la charge du Manoïre (env. 1.5% + 0.25 CHF / transaction).",
        "250.00"
    ),
    (
        "Automatisation Make\n(paiement → email)",
        "Scénario Make déclenché par la confirmation de paiement Stripe : envoi automatique "
        "d'un email de confirmation au client avec le bon cadeau en pièce jointe (PDF).",
        "450.00"
    ),
    (
        "Tests, mise en prod\net documentation",
        "Tests complets du parcours d'achat (paiement → email). Mise en production sur le site. "
        "Mini-guide d'utilisation pour le Manoïre (consulter les achats, rembourser si besoin).",
        "200.00"
    ),
]

tdata = [header_row]
for titre, desc, montant in rows:
    tdata.append([
        Paragraph(titre, s("tr","CalibriBold",10,NOIR,leading=14)),
        Paragraph(desc,  s("td","Calibri",9,NOIR,leading=13)),
        Paragraph(montant, s("tm","Calibri",10,NOIR,align="RIGHT")),
    ])

t = Table(tdata, colWidths=[3.8*cm, 10.2*cm, 3*cm])
t.setStyle(TableStyle([
    ("BACKGROUND",    (0,0), (-1,0),  BRUN),
    ("ROWBACKGROUNDS",(0,1), (-1,-1), [BLANC, BEIGE]),
    ("GRID",          (0,0), (-1,-1), 0.4, PIERRE),
    ("LEFTPADDING",   (0,0), (-1,-1), 8),
    ("RIGHTPADDING",  (0,0), (-1,-1), 8),
    ("TOPPADDING",    (0,0), (-1,-1), 7),
    ("BOTTOMPADDING", (0,0), (-1,-1), 7),
    ("VALIGN",        (0,0), (-1,-1), "TOP"),
]))
story.append(t)
story.append(Spacer(1, 0.3*cm))

# ── RÉCAPITULATIF FINANCIER ─────────────────────────────────────────────────
recap = Table([
    [Paragraph("Sous-total HT", S_RIGHT),    Paragraph("1 400.00 CHF", S_BOLD_R)],
    [Paragraph("TVA", S_RIGHT),               Paragraph("Non applicable *", s("nav","CalibriItalic",10,GRIS,align="RIGHT"))],
    [Paragraph("TOTAL À PAYER", S_TOTAL),     Paragraph("1 400.00 CHF", S_TOTAL)],
], colWidths=[12*cm, 5*cm])
recap.setStyle(TableStyle([
    ("LINEABOVE",     (0,2), (-1,2), 1, BRUN),
    ("TOPPADDING",    (0,0), (-1,-1), 5),
    ("BOTTOMPADDING", (0,0), (-1,-1), 5),
    ("LEFTPADDING",   (0,0), (-1,-1), 0),
    ("RIGHTPADDING",  (0,0), (-1,-1), 0),
]))
story.append(recap)

story.append(Spacer(1, 0.15*cm))
story.append(Paragraph(
    "* TVA non applicable — Prestation de service rendue à un preneur établi hors de l'Union Européenne "
    "(art. 259 du CGI). Aucune TVA française n'est due sur cette facture.",
    S_NOTE))

story.append(Spacer(1, 0.5*cm))

# ── CONDITIONS DE PAIEMENT ──────────────────────────────────────────────────
story.append(KeepTogether([
    Paragraph("Conditions de paiement", S_H2),
    HRFlowable(width="100%", thickness=0.5, color=PIERRE, spaceAfter=6),
    Table([
        [Paragraph("Acompte à la commande (30%)", S_BOLD), Paragraph("420.00 CHF", S_BOLD)],
        [Paragraph("Solde à la livraison (70%)",  S_BODY),  Paragraph("980.00 CHF", S_BODY)],
    ], colWidths=[12*cm, 5*cm], style=TableStyle([
        ("TOPPADDING",    (0,0), (-1,-1), 4),
        ("BOTTOMPADDING", (0,0), (-1,-1), 4),
        ("LEFTPADDING",   (0,0), (-1,-1), 0),
        ("RIGHTPADDING",  (0,0), (-1,-1), 0),
    ])),
    Spacer(1, 0.3*cm),
    Paragraph("Règlement par virement bancaire (IBAN : [À COMPLÉTER]) ou paiement en ligne.", S_WARN),
    Spacer(1, 0.2*cm),
    Paragraph(
        "Conformément à l'article L. 441-10 du Code de commerce, tout retard de paiement entraîne "
        "l'application de pénalités au taux légal en vigueur (2024 : 11.59%), ainsi qu'une indemnité "
        "forfaitaire de recouvrement de 40 €.",
        S_NOTE),
]))

story.append(Spacer(1, 0.4*cm))

# ── DÉLAI DE RÉALISATION ────────────────────────────────────────────────────
story.append(KeepTogether([
    Paragraph("Délai de réalisation", S_H2),
    HRFlowable(width="100%", thickness=0.5, color=PIERRE, spaceAfter=6),
    Paragraph(
        "Prestation réalisée dans un délai de <b>7 à 10 jours ouvrés</b> à compter de la réception "
        "de l'acompte et de la validation du présent devis.",
        S_BODY),
    Paragraph(
        "Prérequis côté client : accès au compte Stripe (ou création), accès au compte Make du Manoïre.",
        S_NOTE),
]))

story.append(Spacer(1, 0.4*cm))

# ── ACCEPTATION ─────────────────────────────────────────────────────────────
story.append(KeepTogether([
    Paragraph("Acceptation du devis", S_H2),
    HRFlowable(width="100%", thickness=0.5, color=PIERRE, spaceAfter=6),
    Paragraph(
        "Pour valider ce devis, merci de le retourner signé avec la mention <b>« Bon pour accord »</b>, "
        "accompagné du règlement de l'acompte.",
        S_BODY),
    Spacer(1, 0.8*cm),
    Table([
        [
            [
                Paragraph("Pour Clockwork Ops", S_NOTE),
                Spacer(1, 0.8*cm),
                Paragraph("Stéphanie Gallois", S_BODY),
                Paragraph("Date : 18 juin 2026", S_NOTE),
            ],
            [
                Paragraph("Pour Le Manoïre", S_NOTE),
                Spacer(1, 0.8*cm),
                Paragraph("Micka Moreau", S_BODY),
                Paragraph("Date : ________________", S_NOTE),
                Paragraph("Signature + « Bon pour accord »", S_NOTE),
            ],
        ]
    ], colWidths=[8.5*cm, 8.5*cm], style=TableStyle([
        ("VALIGN",        (0,0), (-1,-1), "TOP"),
        ("LEFTPADDING",   (0,0), (-1,-1), 0),
        ("RIGHTPADDING",  (0,0), (-1,-1), 12),
        ("LINEABOVE",     (0,0), (-1,0), 0.5, PIERRE),
        ("TOPPADDING",    (0,0), (-1,-1), 8),
    ])),
]))

story.append(Spacer(1, 0.5*cm))
story.append(HRFlowable(width="100%", thickness=0.5, color=PIERRE, spaceAfter=6))
story.append(Paragraph(
    "Clockwork Ops — Stéphanie Gallois · Évian-les-Bains (74500) France · stef.gallois@gmail.com · "
    "Prestataire indépendant — SIRET [À COMPLÉTER]",
    S_CTR))

doc.build(story, onFirstPage=header_footer, onLaterPages=header_footer)
print(f"PDF généré : {OUT}")
