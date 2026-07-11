import sys, io, base64, re, os
sys.stdout.reconfigure(encoding='utf-8')
from PIL import Image

WORK = r'C:\Users\DELL\Desktop\la terrasse Mika\bon cadeau'
BRAND = r'C:\Users\DELL\Desktop\la terrasse Mika\graphiste\taf graphiste logo etc etc\___Identité_visuelle_Le_Manoïre_3\___Identité visuelle_Le Manoïre 3'
LOGO_DIR = r'C:\Users\DELL\Desktop\la terrasse Mika\graphiste\taf graphiste logo etc etc'
FONT_WEB = BRAND + r'\Fonts\ClashGrotesk_Complete\Fonts\WEB\fonts'
FONT_TEN = BRAND + r'\Fonts\Tenaciou'
SVG_DIR  = BRAND + r'\Icones et Favicons\SVG'

# --- Helpers ---
def img_b64(fpath, max_width=1400, quality=82):
    img = Image.open(fpath).convert('RGB')
    w, h = img.size
    if w > max_width:
        img = img.resize((max_width, int(h * max_width / w)), Image.LANCZOS)
    buf = io.BytesIO()
    img.save(buf, format='JPEG', quality=quality, optimize=True)
    return base64.b64encode(buf.getvalue()).decode('ascii')

def img_b64_png(fpath, max_width=600):
    img = Image.open(fpath)
    if img.mode != 'RGBA':
        img = img.convert('RGBA')
    w, h = img.size
    if w > max_width:
        img = img.resize((max_width, int(h * max_width / w)), Image.LANCZOS)
    buf = io.BytesIO()
    img.save(buf, format='PNG', optimize=True)
    return base64.b64encode(buf.getvalue()).decode('ascii')

def font_b64(fpath):
    with open(fpath, 'rb') as f:
        return base64.b64encode(f.read()).decode('ascii')

def read_svg(name, prefix):
    path = os.path.join(SVG_DIR, name)
    with open(path, 'r', encoding='utf-8') as f:
        content = f.read()
    classes = set(re.findall(r'\.(st\d+)', content))
    for cls in classes:
        content = content.replace(f'.{cls}{{', f'.{prefix}-{cls}{{')
        content = content.replace(f'class="{cls}"', f'class="{prefix}-{cls}"')
        content = content.replace(f'class="{cls} ', f'class="{prefix}-{cls} ')
    return content

# --- Load images ---
print("Chargement images...")
hero_b64     = img_b64(WORK + r'\logo_p1_img1.png',  max_width=1400, quality=78)
building_b64 = img_b64(WORK + r'\logo_p2_img1.png',  max_width=900,  quality=80)

print("Chargement logos PNG transparents...")
logo_full_b64   = img_b64_png(LOGO_DIR + r'\Le Manoïre_Logo 1_Couleur_px1000.png', max_width=700)
logo_footer_b64 = img_b64_png(LOGO_DIR + r'\Le Manoïre_Logo 1_Couleur_px1000.png', max_width=360)
logo_bon_b64    = img_b64_png(LOGO_DIR + r'\sans_fond.png', max_width=110)

# --- Load fonts ---
print("Chargement polices...")
cg_regular_b64  = font_b64(FONT_WEB + r'\ClashGrotesk-Regular.woff2')
cg_medium_b64   = font_b64(FONT_WEB + r'\ClashGrotesk-Medium.woff2')
cg_semibold_b64 = font_b64(FONT_WEB + r'\ClashGrotesk-Semibold.woff2')
cg_bold_b64     = font_b64(FONT_WEB + r'\ClashGrotesk-Bold.woff2')
tenaciou_b64    = font_b64(FONT_TEN  + r'\Tenaciou Heavy.ttf')

# --- Load SVGs ---
print("Chargement icônes SVG...")
svg_edelweiss = read_svg('Icones_Edelweiss bicolor.svg', 'edel')
svg_vache     = read_svg('Icones_Vache couleur.svg',     'vache')
svg_table     = read_svg('Icones_Table parasol.svg',     'table')

print("Génération HTML...")

html = f"""<!DOCTYPE html>
<html lang="fr">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Bon Cadeau Fondateur — Le Manoïre, Col de Jaman</title>
<style>
@font-face {{
  font-family: 'ClashGrotesk';
  src: url('data:font/woff2;base64,{cg_regular_b64}') format('woff2');
  font-weight: 400; font-style: normal;
}}
@font-face {{
  font-family: 'ClashGrotesk';
  src: url('data:font/woff2;base64,{cg_medium_b64}') format('woff2');
  font-weight: 500; font-style: normal;
}}
@font-face {{
  font-family: 'ClashGrotesk';
  src: url('data:font/woff2;base64,{cg_semibold_b64}') format('woff2');
  font-weight: 600; font-style: normal;
}}
@font-face {{
  font-family: 'ClashGrotesk';
  src: url('data:font/woff2;base64,{cg_bold_b64}') format('woff2');
  font-weight: 700; font-style: normal;
}}
@font-face {{
  font-family: 'Tenaciou';
  src: url('data:font/truetype;base64,{tenaciou_b64}') format('truetype');
  font-weight: 900; font-style: normal;
}}

*, *::before, *::after {{ box-sizing: border-box; margin: 0; padding: 0; }}

:root {{
  --blanc:    #FBFBF8;
  --creme:    #EFE5DB;
  --ocre:     #C58632;
  --terra:    #E06530;
  --brun:     #954315;
  --bordeaux: #4B0F1F;
  --sable:    #7B694D;
  --beige:    #E2BD8C;
  --texte:    #1C0F14;
  --noir:     #0D0305;
  --papier:   #F6EFE4;
}}

html {{ scroll-behavior: smooth; overflow-x: hidden; }}
body {{
  font-family: 'ClashGrotesk', system-ui, sans-serif;
  font-weight: 400;
  background: var(--blanc);
  color: var(--texte);
  line-height: 1.65;
  font-size: 17px;
  overflow-x: hidden;
}}

/* ── HERO ── */
.hero {{
  position: relative;
  background: var(--bordeaux);
  min-height: 100vh;
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  overflow: hidden;
}}
.hero-photo {{
  position: absolute;
  inset: 0;
  background-image: url('data:image/jpeg;base64,{hero_b64}');
  background-size: cover;
  background-position: center 30%;
  opacity: 0.10;
}}
/* Colonne gauche : logo complet */
.hero-logo-col {{
  position: relative;
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 80px 40px 80px 72px;
}}
.hero-logo-full {{
  width: min(460px, 100%);
  height: auto;
  filter: drop-shadow(0 20px 56px rgba(0,0,0,0.45));
}}
/* Colonne droite : tagline + CTA */
.hero-content {{
  position: relative;
  z-index: 2;
  padding: 80px 72px 80px 48px;
  display: flex;
  flex-direction: column;
  gap: 28px;
  border-left: 1px solid rgba(197,134,50,0.2);
}}
.hero-eyebrow {{
  font-family: 'ClashGrotesk', sans-serif;
  font-weight: 500;
  font-size: 11px;
  letter-spacing: 0.28em;
  text-transform: uppercase;
  color: var(--beige);
  opacity: 0.65;
}}
.hero-separator {{
  width: 40px;
  height: 1px;
  background: var(--ocre);
  opacity: 0.7;
}}
.hero-tagline {{
  font-size: clamp(17px, 1.8vw, 22px);
  line-height: 1.7;
  color: var(--creme);
  font-style: italic;
  opacity: 0.9;
  font-weight: 400;
}}
.hero-pitch {{
  font-size: 15px;
  line-height: 1.75;
  color: var(--beige);
  opacity: 0.65;
  font-weight: 400;
}}
.hero-cta-group {{
  display: flex;
  flex-direction: column;
  gap: 14px;
  margin-top: 8px;
}}
.btn-primary {{
  display: inline-flex;
  align-items: center;
  gap: 12px;
  background: var(--ocre);
  color: var(--blanc);
  font-family: 'ClashGrotesk', sans-serif;
  font-weight: 600;
  font-size: 13px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  padding: 18px 40px;
  text-decoration: none;
  cursor: pointer;
  transition: background 0.2s, transform 0.15s;
  width: fit-content;
  border: none;
}}
.btn-primary:hover {{ background: var(--terra); transform: translateY(-2px); }}
.hero-note {{
  font-size: 12px;
  color: var(--beige);
  opacity: 0.5;
  letter-spacing: 0.04em;
}}

/* ── STRIP MARQUEE ── */
.strip {{
  background: var(--bordeaux);
  border-top: 1px solid rgba(197,134,50,0.2);
  padding: 14px 0;
  overflow: hidden;
  white-space: nowrap;
}}
.strip-inner {{
  display: inline-flex;
  align-items: center;
  gap: 32px;
  animation: marqueeScroll 32s linear infinite;
  font-family: 'ClashGrotesk', sans-serif;
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.24em;
  text-transform: uppercase;
  color: var(--beige);
  padding-right: 32px;
}}
.strip-inner:hover {{ animation-play-state: paused; cursor: default; }}
.strip-inner .sep {{
  color: var(--ocre);
  font-size: 10px;
  flex-shrink: 0;
}}
@keyframes marqueeScroll {{
  0%   {{ transform: translateX(0); }}
  100% {{ transform: translateX(-50%); }}
}}

/* ── SECTIONS ── */
.section {{
  padding: 96px 80px;
  max-width: 1200px;
  margin: 0 auto;
}}
.section-creme {{
  background: var(--creme);
  max-width: 100%;
  padding: 0;
}}
.section-creme .inner {{
  max-width: 1200px;
  margin: 0 auto;
  padding: 96px 80px;
}}
.section-dark {{
  background: var(--bordeaux);
  max-width: 100%;
  padding: 0;
}}
.section-dark .inner {{
  max-width: 1200px;
  margin: 0 auto;
  padding: 96px 80px;
}}

.label {{
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.25em;
  text-transform: uppercase;
  color: var(--ocre);
  margin-bottom: 18px;
}}
h2 {{
  font-family: 'Tenaciou', serif;
  font-weight: 900;
  font-size: clamp(36px, 4.5vw, 58px);
  line-height: 0.95;
  letter-spacing: -0.01em;
  margin-bottom: 28px;
  color: var(--bordeaux);
}}
h3 {{
  font-family: 'ClashGrotesk', sans-serif;
  font-weight: 600;
  font-size: 18px;
  line-height: 1.3;
  margin-bottom: 10px;
  color: var(--bordeaux);
  letter-spacing: -0.01em;
}}
p {{ margin-bottom: 18px; }}
p:last-child {{ margin-bottom: 0; }}

/* ── OFFRE ── */
.offre-nouv {{
  display: grid;
  grid-template-columns: 55fr 45fr;
  min-height: 580px;
}}
.offre-img-col {{
  position: relative;
  overflow: hidden;
}}
.offre-img-main {{
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center 40%;
  display: block;
}}
.offre-col {{
  background: var(--creme);
  padding: 72px 56px;
  display: flex;
  flex-direction: column;
  gap: 24px;
  justify-content: center;
}}
.offre-lead {{
  font-size: 17px;
  line-height: 1.8;
  color: var(--texte);
}}

/* ── CALCULATEUR ── */
.calculateur {{
  background: var(--blanc);
  border: 1px solid var(--creme);
  border-top: 3px solid var(--ocre);
  padding: 36px 40px;
  margin-top: 0;
}}
.calc-title {{
  font-weight: 600;
  font-size: 11px;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: var(--sable);
  margin-bottom: 20px;
}}
.calc-input-group {{
  display: flex;
  align-items: stretch;
  border: 2px solid var(--creme);
  background: var(--blanc);
  transition: border-color 0.2s;
  margin-bottom: 18px;
}}
.calc-input-group:focus-within {{ border-color: var(--ocre); }}
.calc-currency {{
  padding: 0 18px;
  font-size: 17px;
  font-weight: 600;
  color: var(--sable);
  background: var(--creme);
  display: flex;
  align-items: center;
}}
.calc-input {{
  flex: 1;
  border: none;
  outline: none;
  padding: 0 20px;
  font-family: 'ClashGrotesk', sans-serif;
  font-weight: 700;
  font-size: 32px;
  color: var(--bordeaux);
  background: transparent;
  width: 100%;
  height: 64px;
}}
.calc-input::placeholder {{ color: var(--creme); }}
.calc-result {{
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
  margin-bottom: 20px;
}}
.calc-line {{
  padding: 16px 18px;
  background: var(--creme);
}}
.calc-line-label {{
  font-size: 10px;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--sable);
  margin-bottom: 5px;
  font-weight: 500;
}}
.calc-line-val {{
  font-family: 'ClashGrotesk', sans-serif;
  font-weight: 700;
  font-size: 22px;
  color: var(--bordeaux);
}}
.calc-line.highlight {{ background: var(--bordeaux); }}
.calc-line.highlight .calc-line-label {{ color: var(--beige); opacity: 0.6; }}
.calc-line.highlight .calc-line-val {{ color: var(--ocre); font-size: 28px; }}
.calc-cta {{
  width: 100%;
  padding: 19px;
  background: var(--ocre);
  color: var(--blanc);
  font-family: 'ClashGrotesk', sans-serif;
  font-weight: 700;
  font-size: 12px;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  border: none;
  cursor: pointer;
  text-decoration: none;
  display: block;
  text-align: center;
  transition: background 0.2s;
}}
.calc-cta:hover {{ background: var(--terra); }}

/* ── PILIERS ── */
.piliers-grid {{
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 48px;
  margin-top: 56px;
}}
.pilier {{
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: center;
  text-align: center;
}}
.pilier-icon-wrap {{
  width: 96px;
  height: 96px;
  background: var(--bordeaux);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}}
.pilier-icon {{ width: 56px; height: 56px; }}
.pilier-icon svg {{ width: 56px; height: 56px; }}
.pilier p {{
  font-size: 15px;
  line-height: 1.75;
  color: var(--sable);
  margin: 0;
}}

/* ── HISTOIRE ── */
.histoire-grid {{
  display: grid;
  grid-template-columns: 5fr 4fr;
  gap: 80px;
  align-items: start;
}}
.histoire-photo {{
  width: 100%;
  aspect-ratio: 3/4;
  object-fit: cover;
  filter: sepia(8%) contrast(1.06);
}}
.pullquote {{
  font-family: 'Tenaciou', serif;
  font-weight: 900;
  font-size: clamp(18px, 2.2vw, 26px);
  line-height: 1.35;
  color: var(--bordeaux);
  margin-bottom: 32px;
  padding-left: 28px;
  border-left: 3px solid var(--ocre);
}}

/* ── FONDATEUR GRID ── */
.fondateur-grid {{
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 80px;
  align-items: start;
}}

/* ── CONDITIONS ── */
.conditions-list {{
  list-style: none;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 14px 48px;
}}
.conditions-list li {{
  font-size: 14px;
  color: var(--sable);
  padding-left: 22px;
  position: relative;
  line-height: 1.55;
}}
.conditions-list li::before {{
  content: '—';
  position: absolute;
  left: 0;
  color: var(--ocre);
}}

/* ── CTA FINAL ── */
.cta-final {{
  text-align: center;
  padding: 128px 80px;
}}
.cta-final h2 {{ color: var(--blanc); margin-bottom: 18px; }}
.cta-final .sub {{
  color: var(--beige);
  font-size: 15px;
  margin-bottom: 52px;
  opacity: 0.65;
  letter-spacing: 0.06em;
  font-family: 'ClashGrotesk', sans-serif;
  font-weight: 500;
  text-transform: uppercase;
  font-size: 12px;
}}
.btn-grand {{
  display: inline-flex;
  align-items: center;
  gap: 14px;
  background: var(--ocre);
  color: var(--blanc);
  font-family: 'ClashGrotesk', sans-serif;
  font-weight: 700;
  font-size: 13px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  padding: 24px 60px;
  text-decoration: none;
  transition: background 0.2s, transform 0.15s;
}}
.btn-grand:hover {{ background: var(--terra); transform: translateY(-2px); }}

/* ── FOOTER ── */
footer {{
  background: var(--noir);
  padding: 52px 80px 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
}}
.footer-logo {{ height: 120px; width: auto; }}
.footer-links {{
  display: flex;
  gap: 32px;
  flex-wrap: wrap;
  justify-content: center;
}}
.footer-links a {{
  color: var(--beige);
  opacity: 0.45;
  text-decoration: none;
  font-size: 11px;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  font-weight: 500;
  transition: opacity 0.2s;
}}
.footer-links a:hover {{ opacity: 0.8; }}
.footer-copy {{
  font-size: 10px;
  color: var(--beige);
  opacity: 0.2;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  margin-top: 4px;
}}

/* ── RESPONSIVE ── */
@media (max-width: 900px) {{
  .hero {{ grid-template-columns: 1fr; min-height: auto; }}
  .hero-logo-col {{ padding: 64px 40px 32px; border-left: none; }}
  .hero-logo-full {{ width: min(340px, 80%); }}
  .hero-content {{ padding: 0 40px 64px; border-left: none; gap: 20px; }}
  .strip {{ padding: 10px 0; }}
  .section, .section-creme .inner, .section-dark .inner {{ padding: 64px 40px; }}
  .offre-nouv {{ grid-template-columns: 1fr; }}
  .offre-img-col {{ max-height: 320px; }}
  .histoire-grid {{ grid-template-columns: 1fr; gap: 48px; }}
  .histoire-photo {{ aspect-ratio: 4/3; max-height: 300px; width: 100%; }}
  .piliers-grid {{ grid-template-columns: 1fr; gap: 32px; }}
  .conditions-list {{ grid-template-columns: 1fr; }}
  .fondateur-grid {{ grid-template-columns: 1fr; gap: 48px; }}
  footer {{ flex-direction: column; gap: 28px; text-align: center; padding: 44px 40px; }}
  .cta-final {{ padding: 80px 40px; }}
}}
@media (max-width: 540px) {{
  .hero-logo-col {{ padding: 48px 24px 24px; }}
  .hero-content {{ padding: 0 24px 52px; }}
  .section, .section-creme .inner, .section-dark .inner {{ padding: 56px 24px; }}
  .calculateur {{ padding: 28px 20px; }}
  .calc-result {{ grid-template-columns: 1fr; }}
  .offre-col {{ padding: 48px 24px; }}
  footer {{ padding: 40px 24px 28px; }}
  .cta-final {{ padding: 64px 24px; }}
  .pilier-icon-wrap {{ width: 84px; height: 84px; }}
  .pilier-icon {{ width: 50px; height: 50px; }}
  .pilier-icon svg {{ width: 50px; height: 50px; }}
  .btn-primary {{ width: 100%; justify-content: center; }}
  .btn-grand {{ width: 100%; justify-content: center; box-sizing: border-box; }}
  .hero-cta-group {{ width: 100%; }}
  h2 {{ font-size: clamp(30px, 9vw, 42px); line-height: 1.0; }}
  .calc-input {{ font-size: 26px; height: 56px; }}
  .calc-line-val {{ font-size: 20px; }}
  .calc-line.highlight .calc-line-val {{ font-size: 24px; }}
}}
</style>
</head>
<body>

<!-- HERO -->
<section class="hero" id="top">
  <div class="hero-photo"></div>

  <!-- Gauche : logo complet (illustration + nom) -->
  <div class="hero-logo-col">
    <img src="data:image/png;base64,{logo_full_b64}"
         alt="Le Manoïre — Col de Jaman"
         class="hero-logo-full">
  </div>

  <!-- Droite : accroche + CTA -->
  <div class="hero-content">
    <div class="hero-eyebrow">Restaurant · 1512 m · Préalpes vaudoises</div>
    <div class="hero-separator"></div>
    <p class="hero-tagline">"Au-dessus du lac, au-dessus du bruit,<br>au-dessus du temps."</p>
    <p class="hero-pitch">Avant même l'ouverture, devenez l'un des premiers Fondateurs du Manoïre — et recevez 15 % de valeur offerts.</p>
    <div class="hero-cta-group">
      <a href="#commande" class="btn-primary">
        Offrir un Bon Cadeau &nbsp;→
      </a>
      <span class="hero-note">Montant libre · +15 % offerts · Ouverture 2026</span>
    </div>
  </div>
</section>

<!-- STRIP MARQUEE -->
<div class="strip" aria-hidden="true">
  <div class="strip-inner">
    <span>1 512 m d'altitude</span><span class="sep">◆</span>
    <span>+15 % offerts</span><span class="sep">◆</span>
    <span>12 mois de validité</span><span class="sep">◆</span>
    <span>Bon Cadeau Fondateur</span><span class="sep">◆</span>
    <span>Ouverture 2026</span><span class="sep">◆</span>
    <span>Col de Jaman · Préalpes vaudoises</span><span class="sep">◆</span>
    <span>1 512 m d'altitude</span><span class="sep">◆</span>
    <span>+15 % offerts</span><span class="sep">◆</span>
    <span>12 mois de validité</span><span class="sep">◆</span>
    <span>Bon Cadeau Fondateur</span><span class="sep">◆</span>
    <span>Ouverture 2026</span><span class="sep">◆</span>
    <span>Col de Jaman · Préalpes vaudoises</span><span class="sep">◆</span>
  </div>
</div>

<!-- SECTION OFFRE -->
<div class="offre-nouv" id="commande">
  <!-- Gauche : photo -->
  <div class="offre-img-col">
    <img src="data:image/jpeg;base64,{hero_b64}"
         alt="Le Manoïre — Col de Jaman" class="offre-img-main">
  </div>
  <!-- Droite : texte + calculateur -->
  <div class="offre-col">
    <div class="label">L'offre fondatrice</div>
    <h2>Bon Cadeau<br>Fondateur</h2>
    <p class="offre-lead">Choisissez librement votre montant. Le Manoïre l'augmente de <strong>+15 %</strong> — en guise de gratitude pour votre confiance avant l'ouverture.</p>
    <div class="calculateur" id="calculateur">
      <div class="calc-title">Calculez votre bon</div>
      <div class="calc-input-group">
        <div class="calc-currency">CHF</div>
        <input class="calc-input" type="number" id="montant-input"
               placeholder="200" min="20" step="10"
               aria-label="Montant en CHF">
      </div>
      <div class="calc-result">
        <div class="calc-line">
          <div class="calc-line-label">Bonus offert (+15%)</div>
          <div class="calc-line-val" id="calc-bonus">—</div>
        </div>
        <div class="calc-line highlight">
          <div class="calc-line-label">Valeur totale</div>
          <div class="calc-line-val" id="calc-total">—</div>
        </div>
      </div>
      <a href="[LIEN_STRIPE_ICI]" class="calc-cta" id="cta-btn">
        Offrir ce bon →
      </a>
    </div>
  </div>
</div>

<!-- PILIERS -->
<section class="section" id="pourquoi">
  <div class="label">Trois raisons d'offrir</div>
  <h2>Pourquoi ce bon est différent</h2>
  <div class="piliers-grid">
    <div class="pilier">
      <div class="pilier-icon-wrap">
        <div class="pilier-icon">{svg_vache}</div>
      </div>
      <h3>Un terroir suisse authentique</h3>
      <p>Fondue, rösti, producteurs artisanaux des Préalpes. Chaque assiette raconte un paysage — celui-là même que vous voyez depuis la terrasse.</p>
    </div>
    <div class="pilier">
      <div class="pilier-icon-wrap">
        <div class="pilier-icon">{svg_edelweiss}</div>
      </div>
      <h3>Une altitude hors du temps</h3>
      <p>À 1512 mètres, entre le lac Léman et les sommets, Le Manoïre offre ce que la ville ne peut pas : le silence, la lumière, et la sensation d'être ailleurs.</p>
    </div>
    <div class="pilier">
      <div class="pilier-icon-wrap">
        <div class="pilier-icon">{svg_table}</div>
      </div>
      <h3>Une table qui rassemble</h3>
      <p>Terrasse panoramique, intérieur chaleureux, cuisine qui donne envie de rester. Offrir ce bon, c'est offrir un moment qui compte.</p>
    </div>
  </div>
</section>

<!-- HISTOIRE -->
<div class="section-creme">
  <div class="inner">
    <div class="histoire-grid">
      <div>
        <div class="label">L'histoire</div>
        <h2>Une transmission,<br>pas un concept.</h2>
        <p class="pullquote">« Le Manoïre n'est pas un concept.<br>C'est une transmission. »</p>
        <p>Perché à 1512 mètres, au carrefour des sentiers entre la Riviera vaudoise et les sommets des Préalpes, Le Manoïre est un ancien café-restaurant d'alpage qui a traversé les générations. Un chef étoilé y a officié. Des familles s'y sont retrouvées. Le temps l'a mis en sommeil.</p>
        <p>Aujourd'hui, il renaît. Pas pour changer de nature, mais pour retrouver ce qu'il a toujours été : un lieu de passage devenu un lieu d'appartenance. Solide. Cohérent. Authentique.</p>
        <p>Dans un monde qui va vite, nous avons choisi la lenteur qui dure. En achetant ce bon avant l'ouverture, vous ne participez pas à un lancement — vous rejoignez une renaissance. Vous devenez l'un des premiers Fondateurs.</p>
      </div>
      <div>
        <img src="data:image/jpeg;base64,{building_b64}"
             alt="Le Manoïre, Col de Jaman"
             class="histoire-photo">
      </div>
    </div>
  </div>
</div>

<!-- ÊTRE FONDATEUR + CONDITIONS -->
<section class="section">
  <div class="fondateur-grid">
    <div>
      <div class="label">Être fondateur</div>
      <h2>Rejoignez les premiers<br>à être là.</h2>
      <p style="font-size:18px; line-height:1.8; color:var(--sable); margin-bottom:36px;">Offrir ce bon avant l'ouverture, c'est plus qu'un cadeau. C'est un geste de confiance. Une façon de dire : <em>« J'y crois. J'y serai. »</em></p>
      <a href="#calculateur" class="btn-primary">Calculer mon bon &nbsp;→</a>
    </div>
    <div>
      <div class="label">Conditions générales</div>
      <ul class="conditions-list">
        <li>Valable dès l'ouverture officielle du Manoïre</li>
        <li>Validité de 12 mois à compter de l'ouverture</li>
        <li>Utilisable en une ou plusieurs fois</li>
        <li>Non cumulable avec d'autres offres</li>
        <li>Non remboursable en espèces</li>
        <li>Remplacement sur preuve d'achat uniquement</li>
      </ul>
    </div>
  </div>
</section>

<!-- CTA FINAL -->
<div class="section-dark" id="cta-section">
  <div class="cta-final">
    <div style="font-size:11px; letter-spacing:0.28em; text-transform:uppercase; color:var(--beige); opacity:0.45; margin-bottom:28px; font-weight:500;">Bon Cadeau Fondateur</div>
    <h2>Offrir Le Manoïre,<br>c'est offrir une expérience<br>au-dessus du quotidien.</h2>
    <p class="sub">Montant libre · +15 % offerts · Livraison par e-mail</p>
    <a href="[LIEN_STRIPE_ICI]" class="btn-grand">
      Offrir un Bon Cadeau &nbsp;→
    </a>
  </div>
</div>

<!-- FOOTER -->
<footer>
  <img src="data:image/png;base64,{logo_footer_b64}"
       alt="Le Manoïre — Col de Jaman"
       class="footer-logo">
  <div class="footer-links">
    <a href="https://lemanoire-jaman.ch">lemanoire-jaman.ch</a>
    <a href="#commande">Offrir un bon</a>
    <a href="#top">Haut de page</a>
  </div>
  <div class="footer-copy">© 2026 Le Manoïre — Col de Jaman · 1512 m · Préalpes vaudoises</div>
</footer>

<script>
(function() {{
  const input     = document.getElementById('montant-input');
  const calcBonus = document.getElementById('calc-bonus');
  const calcTotal = document.getElementById('calc-total');

  const ctaBtn    = document.getElementById('cta-btn');

  function fmt(n) {{
    return n.toLocaleString('fr-CH', {{ minimumFractionDigits: 0, maximumFractionDigits: 0 }}) + ' CHF';
  }}

  function update() {{
    const raw = parseFloat(input.value);
    if (!raw || raw <= 0) {{
      calcBonus.textContent = '—';
      calcTotal.textContent = '—';

      ctaBtn.textContent    = 'Offrir ce bon →';
      return;
    }}
    const bonus = Math.round(raw * 0.15);
    const total = raw + bonus;
    calcBonus.textContent  = fmt(bonus);
    calcTotal.textContent  = fmt(total);

    ctaBtn.textContent     = 'Offrir ' + fmt(raw) + ' → recevoir ' + fmt(total);
  }}

  input.addEventListener('input', update);
  update();
}})();
</script>

</body>
</html>"""

out = WORK + r'\bon_cadeau_manoire.html'
with open(out, 'w', encoding='utf-8') as f:
    f.write(html)

size_kb = os.path.getsize(out) // 1024
print(f"✓ Page générée : {out}")
print(f"  Taille : {size_kb} KB")
