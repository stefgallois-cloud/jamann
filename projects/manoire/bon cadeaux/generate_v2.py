import sys, base64, io
from PIL import Image

sys.stdout.reconfigure(encoding='utf-8')

def img_b64(fname, max_width, quality=78, fmt='JPEG'):
    img = Image.open(fname).convert('RGB')
    w, h = img.size
    if w > max_width:
        img = img.resize((max_width, int(h * max_width / w)), Image.LANCZOS)
    buf = io.BytesIO()
    img.save(buf, format=fmt, quality=quality, optimize=True)
    return base64.b64encode(buf.getvalue()).decode('ascii')

def icon_b64(fname, cell=98, col=0, row=0, stride=139, row_stride=136, iy0=97):
    grid = Image.open(fname)
    x0 = col * stride + 2
    y0 = iy0 + row * row_stride + 2
    icon = grid.crop((x0, y0, x0 + cell, y0 + cell))
    buf = io.BytesIO()
    icon.save(buf, format='PNG', optimize=True)
    return base64.b64encode(buf.getvalue()).decode('ascii')

# Images
hero   = img_b64('logo_p1_img1.png', 1400, 80)
bon    = img_b64('Image_bon_cadeau_mano.png', 720, 85)
logo   = img_b64('logo_illus_crop.png', 360, 88)

# Icons from grid
ic_vache     = icon_b64('icon_grid.png', col=1, row=0)
ic_edelweiss = icon_b64('icon_grid.png', col=2, row=0)
ic_montagne  = icon_b64('icon_grid.png', col=3, row=0)

print(f"hero={len(hero)//1024}KB bon={len(bon)//1024}KB logo={len(logo)//1024}KB")
print(f"icons: vache={len(ic_vache)//1024}KB edel={len(ic_edelweiss)//1024}KB mont={len(ic_montagne)//1024}KB")

html = f"""<!DOCTYPE html>
<html lang="fr">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Bon Cadeau Fondateur — Le Manoïre, Col de Jaman</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,400&family=Courier+Prime:ital@0;1&display=swap" rel="stylesheet">
<style>
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
  --font: 'Plus Jakarta Sans', sans-serif;
  --mono: 'Courier Prime', monospace;
}}

html {{ scroll-behavior: smooth; }}
body {{
  background: var(--blanc);
  color: var(--bordeaux);
  font-family: var(--font);
  font-size: 15px;
  line-height: 1.6;
  -webkit-font-smoothing: antialiased;
}}

/* ═══ HERO ═══════════════════════════════════════════════ */
.hero {{
  position: relative;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 48px 24px 64px;
  background-image: url('data:image/jpeg;base64,{hero}');
  background-size: cover;
  background-position: center;
  overflow: hidden;
}}
.hero::before {{
  content: '';
  position: absolute; inset: 0;
  background: linear-gradient(160deg, rgba(75,15,31,0.72) 0%, rgba(75,15,31,0.5) 55%, rgba(75,15,31,0.78) 100%);
}}
.hero > * {{ position: relative; z-index: 1; }}

.hero-logo {{
  width: 220px;
  height: auto;
  margin-bottom: 20px;
  filter: drop-shadow(0 4px 20px rgba(0,0,0,0.4));
}}

.hero-badge-top {{
  font-family: var(--mono);
  font-size: 0.7rem;
  letter-spacing: 0.32em;
  text-transform: uppercase;
  color: var(--beige);
  margin-bottom: 14px;
}}

.hero h1 {{
  font-size: clamp(2.2rem, 5.5vw, 4.2rem);
  font-weight: 800;
  color: var(--blanc);
  line-height: 1.1;
  max-width: 720px;
  margin: 0 auto 12px;
  letter-spacing: -0.01em;
}}
.hero h1 em {{ font-style: normal; color: var(--beige); }}

.hero-sub {{
  font-size: 1.05rem;
  color: rgba(251,251,248,0.82);
  font-style: italic;
  font-weight: 300;
  max-width: 480px;
  margin: 0 auto 32px;
}}

/* Badge +15% */
.badge-15 {{
  display: inline-flex;
  align-items: center;
  gap: 12px;
  background: var(--ocre);
  color: var(--blanc);
  font-weight: 700;
  font-size: 1rem;
  letter-spacing: 0.04em;
  padding: 12px 28px;
  margin-bottom: 20px;
}}
.badge-15 strong {{ font-size: 1.5rem; line-height: 1; }}

.btn {{
  display: inline-block;
  background: var(--blanc);
  color: var(--bordeaux);
  font-family: var(--font);
  font-weight: 700;
  font-size: 0.9rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  text-decoration: none;
  padding: 15px 38px;
  border: none;
  cursor: pointer;
  transition: background .2s, color .2s, transform .15s;
}}
.btn:hover {{ background: var(--beige); transform: translateY(-2px); }}
.btn-ocre {{
  background: var(--ocre);
  color: var(--blanc);
}}
.btn-ocre:hover {{ background: var(--terra); }}

/* ═══ STRIP : chiffres clés ═══════════════════════════════ */
.strip {{
  background: var(--bordeaux);
  display: grid;
  grid-template-columns: repeat(3,1fr);
  border-top: 3px solid var(--ocre);
}}
.strip-item {{
  padding: 28px 24px;
  text-align: center;
  border-right: 1px solid rgba(226,189,140,0.15);
}}
.strip-item:last-child {{ border-right: none; }}
.strip-num {{
  font-size: 2.4rem;
  font-weight: 800;
  color: var(--beige);
  line-height: 1;
  display: block;
}}
.strip-label {{
  font-family: var(--mono);
  font-size: 0.65rem;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: rgba(251,251,248,0.55);
  margin-top: 4px;
  display: block;
}}

/* ═══ SECTIONS ════════════════════════════════════════════ */
section {{ padding: 64px 24px; }}
.container {{ max-width: 700px; margin: 0 auto; }}
.container-wide {{ max-width: 960px; margin: 0 auto; }}

.eyebrow {{
  font-family: var(--mono);
  font-size: 0.68rem;
  letter-spacing: 0.3em;
  text-transform: uppercase;
  color: var(--sable);
  margin-bottom: 10px;
  display: block;
}}
h2 {{
  font-size: clamp(1.6rem, 3.5vw, 2.4rem);
  font-weight: 800;
  line-height: 1.15;
  color: var(--bordeaux);
  margin-bottom: 20px;
  letter-spacing: -0.01em;
}}
h2 em {{ font-style: normal; color: var(--ocre); }}
p {{ color: var(--sable); margin-bottom: 14px; }}
p:last-child {{ margin-bottom: 0; }}
strong {{ color: var(--bordeaux); }}

/* ═══ OFFRE (en 2e position, avant l'histoire) ════════════ */
.offre {{ background: var(--creme); }}
.offre-grid {{
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 48px;
  align-items: start;
}}
.offre-img img {{
  width: 100%;
  box-shadow: 6px 6px 32px rgba(75,15,31,0.2);
}}
.bonus-tag {{
  display: inline-block;
  background: var(--terra);
  color: var(--blanc);
  font-weight: 700;
  font-size: 0.8rem;
  letter-spacing: 0.06em;
  padding: 4px 12px;
  margin-bottom: 16px;
}}

/* Calculateur */
.calc {{
  background: var(--blanc);
  border: 1.5px solid var(--beige);
  padding: 24px;
  margin-top: 24px;
}}
.calc-head {{
  font-family: var(--mono);
  font-size: 0.68rem;
  letter-spacing: 0.28em;
  text-transform: uppercase;
  color: var(--sable);
  margin-bottom: 12px;
  display: block;
}}
.calc-row {{
  display: flex;
  align-items: center;
  border: 2px solid var(--beige);
  margin-bottom: 16px;
  transition: border-color .2s;
}}
.calc-row:focus-within {{ border-color: var(--ocre); }}
.calc-prefix {{
  padding: 11px 13px;
  background: var(--creme);
  font-family: var(--mono);
  font-weight: 700;
  color: var(--sable);
  font-size: 0.95rem;
  border-right: 1px solid var(--beige);
  white-space: nowrap;
}}
.calc-input {{
  flex: 1; border: none; outline: none;
  padding: 11px 13px;
  font-family: var(--font);
  font-size: 1.05rem;
  font-weight: 700;
  color: var(--bordeaux);
  background: var(--blanc);
  width: 100%;
}}
.calc-result {{
  display: none;
  grid-template-columns: 1fr 1fr;
  gap: 1px;
  background: var(--beige);
  margin-bottom: 16px;
}}
.calc-result.show {{ display: grid; }}
.calc-cell {{ background: var(--blanc); padding: 12px 14px; }}
.calc-cell.full {{ grid-column: 1/-1; background: var(--creme); }}
.c-label {{ font-family: var(--mono); font-size: 0.62rem; letter-spacing: 0.2em; text-transform: uppercase; color: var(--sable); margin-bottom: 3px; }}
.c-val {{ font-size: 1.2rem; font-weight: 700; color: var(--bordeaux); }}
.c-val.plus {{ color: var(--terra); }}
.c-val.big {{ font-size: 1.6rem; color: var(--ocre); }}
.calc-note {{ font-size: 0.78rem; color: var(--sable); font-style: italic; text-align: center; }}

/* ═══ HISTOIRE ════════════════════════════════════════════ */
.histoire {{ background: var(--blanc); }}
.histoire-grid {{
  display: grid;
  grid-template-columns: 5fr 7fr;
  gap: 48px;
  align-items: center;
}}
.histoire-img {{ width: 100%; aspect-ratio: 4/3; object-fit: cover; filter: grayscale(100%) contrast(1.08); }}
.quote {{
  border-left: 3px solid var(--ocre);
  padding: 12px 18px;
  margin: 22px 0;
  font-family: var(--mono);
  font-style: italic;
  font-size: 0.97rem;
  color: var(--bordeaux);
  background: var(--creme);
}}

/* ═══ PILIERS ══════════════════════════════════════════════ */
.piliers-section {{ background: var(--bordeaux); }}
.piliers-section h2 {{ color: var(--blanc); text-align: center; margin-bottom: 40px; }}
.piliers-section h2 em {{ color: var(--beige); }}
.piliers {{
  display: grid;
  grid-template-columns: repeat(3,1fr);
  gap: 24px;
}}
.pilier {{
  background: rgba(255,255,255,0.05);
  border: 1px solid rgba(226,189,140,0.18);
  padding: 28px 24px;
}}
.pilier-icon {{
  width: 64px; height: 64px;
  margin-bottom: 18px;
  border-radius: 10px;
  overflow: hidden;
  object-fit: cover;
}}
.pilier h3 {{
  font-size: 1rem;
  font-weight: 700;
  color: var(--blanc);
  margin-bottom: 10px;
}}
.pilier p {{ font-size: 0.9rem; color: rgba(251,251,248,0.65); margin: 0; }}

/* ═══ CONDITIONS ══════════════════════════════════════════ */
.conditions {{ background: var(--creme); padding: 56px 24px; }}
.conditions h2 {{ margin-bottom: 28px; }}
.cond-grid {{
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0 40px;
}}
.cond-item {{
  display: flex;
  gap: 12px;
  align-items: flex-start;
  padding: 12px 0;
  border-bottom: 1px solid rgba(197,134,50,0.22);
  font-size: 0.92rem;
  color: var(--sable);
}}
.cond-item::before {{
  content: '—';
  color: var(--ocre);
  font-weight: 700;
  flex-shrink: 0;
}}

/* ═══ CTA FINAL ═══════════════════════════════════════════ */
.cta-final {{
  background: var(--bordeaux);
  text-align: center;
  padding: 88px 24px;
}}
.cta-final .eyebrow {{ color: var(--beige); }}
.cta-final h2 {{ color: var(--blanc); font-size: clamp(1.8rem,4vw,3rem); margin-bottom: 14px; }}
.cta-final h2 em {{ color: var(--beige); }}
.cta-final .sub {{
  color: rgba(251,251,248,0.65);
  font-style: italic;
  font-weight: 300;
  max-width: 460px;
  margin: 0 auto 36px;
}}
.reassure {{ margin-top: 16px; font-size: 0.75rem; color: rgba(251,251,248,0.35); font-family: var(--mono); letter-spacing: 0.1em; }}

/* ═══ FOOTER ══════════════════════════════════════════════ */
footer {{
  background: #2a0910;
  text-align: center;
  padding: 28px 24px;
  color: rgba(251,251,248,0.3);
  font-family: var(--mono);
  font-size: 0.72rem;
  letter-spacing: 0.15em;
  text-transform: uppercase;
}}
footer a {{ color: var(--beige); text-decoration: none; }}

/* ═══ RESPONSIVE ══════════════════════════════════════════ */
@media (max-width: 680px) {{
  .offre-grid, .histoire-grid {{ grid-template-columns: 1fr; gap: 28px; }}
  .piliers {{ grid-template-columns: 1fr; gap: 16px; }}
  .cond-grid {{ grid-template-columns: 1fr; }}
  .strip {{ grid-template-columns: 1fr; }}
  .strip-item {{ border-right: none; border-bottom: 1px solid rgba(226,189,140,0.15); }}
  section {{ padding: 48px 20px; }}
}}
</style>
</head>
<body>

<!-- ═══ HERO ══════════════════════════════════════════════════════ -->
<header class="hero" id="haut">
  <img class="hero-logo"
       src="data:image/jpeg;base64,{logo}"
       alt="Le Manoïre — Col de Jaman">

  <p class="hero-badge-top">Renaissance 2026 &nbsp;·&nbsp; Préalpes Vaudoises &nbsp;·&nbsp; 1512m</p>

  <h1>Offrez un moment<br><em>au-dessus de tout</em></h1>
  <p class="hero-sub">«&nbsp;Au-dessus du lac, au-dessus du bruit, au-dessus du temps.&nbsp;»</p>

  <div class="badge-15">
    <strong>+15%</strong>
    <span>offerts sur chaque bon cadeau</span>
  </div>

  <a href="#commande" class="btn">Offrir un Bon Cadeau →</a>
</header>

<!-- ═══ STRIP CHIFFRES ════════════════════════════════════════════ -->
<div class="strip">
  <div class="strip-item">
    <span class="strip-num">1512</span>
    <span class="strip-label">mètres d'altitude</span>
  </div>
  <div class="strip-item">
    <span class="strip-num">+15%</span>
    <span class="strip-label">de valeur offerte</span>
  </div>
  <div class="strip-item">
    <span class="strip-num">12</span>
    <span class="strip-label">mois de validité</span>
  </div>
</div>

<!-- ═══ OFFRE ══════════════════════════════════════════════════════ -->
<section class="offre" id="commande">
  <div class="container-wide">
    <div class="offre-grid">
      <div class="offre-img">
        <img src="data:image/jpeg;base64,{bon}"
             alt="Bon Cadeau Fondateur — Le Manoïre">
      </div>
      <div>
        <span class="eyebrow">L'offre exclusive</span>
        <h2>Bon Cadeau<br><em>Fondateur</em></h2>
        <span class="bonus-tag">+ 15% offerts par Le Manoïre</span>
        <p>
          Vous choisissez librement le montant à offrir.
          Le Manoïre y ajoute <strong>15% de valeur supplémentaire</strong> —
          son cadeau de bienvenue à ceux qui croient en cette renaissance
          avant même le premier service.
        </p>

        <div class="calc">
          <span class="calc-head">Calculez votre bon cadeau</span>
          <div class="calc-row">
            <span class="calc-prefix">CHF</span>
            <input class="calc-input" type="number" id="montant"
                   placeholder="200" min="10" step="5" oninput="calc()">
          </div>
          <div class="calc-result" id="result">
            <div class="calc-cell">
              <div class="c-label">Montant offert</div>
              <div class="c-val" id="r-montant">—</div>
            </div>
            <div class="calc-cell">
              <div class="c-label">Bonus Manoïre</div>
              <div class="c-val plus" id="r-bonus">—</div>
            </div>
            <div class="calc-cell full">
              <div class="c-label">Valeur totale du bon</div>
              <div class="c-val big" id="r-total">—</div>
            </div>
          </div>
          <p class="calc-note">Ex. : offrir 200 CHF → bon de 230 CHF (30 CHF offerts)</p>
        </div>

        <div style="margin-top:24px">
          <a href="[LIEN_STRIPE_ICI]" class="btn btn-ocre">
            Commander ce bon →
          </a>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- ═══ HISTOIRE ══════════════════════════════════════════════════ -->
<section class="histoire">
  <div class="container-wide">
    <div class="histoire-grid">
      <div>
        <img class="histoire-img"
             src="data:image/jpeg;base64,{img_b64('logo_p2_img1.png', 600, 75)}"
             alt="Le Manoïre, photo d'époque">
      </div>
      <div>
        <span class="eyebrow">L'histoire</span>
        <h2>Un lieu d'alpage<br><em>en renaissance</em></h2>
        <p>
          Au carrefour des sentiers reliant la Riviera aux sommets,
          Le Manoïre était autrefois une adresse emblématique du Col de Jaman.
          Un chef étoilé y a marqué l'histoire. Puis le silence, pendant des années.
        </p>
        <div class="quote">
          «&nbsp;Le Manoïre n'est pas un concept. C'est une transmission.&nbsp;»
        </div>
        <p>
          Aujourd'hui, il renaît avec une ambition simple&nbsp;:
          terroir suisse, producteurs artisanaux, accueil sincère.
          Dans un monde qui va vite, nous avons choisi la solidité.
        </p>
      </div>
    </div>
  </div>
</section>

<!-- ═══ 3 PILIERS ══════════════════════════════════════════════════ -->
<section class="piliers-section">
  <div class="container-wide">
    <span class="eyebrow" style="color:var(--beige);text-align:center;display:block">Pourquoi ce bon</span>
    <h2>Trois bonnes raisons<br>d'être <em>fondateur</em></h2>
    <div class="piliers">
      <div class="pilier">
        <img class="pilier-icon"
             src="data:image/png;base64,{ic_montagne}"
             alt="Montagne">
        <h3>Une expérience unique en altitude</h3>
        <p>Une table à 1512m, une cuisine de terroir, une vue sur les Préalpes vaudoises. Hors du quotidien, au-dessus de tout.</p>
      </div>
      <div class="pilier">
        <img class="pilier-icon"
             src="data:image/png;base64,{ic_vache}"
             alt="Le Manoïre">
        <h3>Soutenir une renaissance</h3>
        <p>Chaque bon acheté avant l'ouverture finance directement la renaissance d'un lieu emblématique du Col de Jaman.</p>
      </div>
      <div class="pilier">
        <img class="pilier-icon"
             src="data:image/png;base64,{ic_edelweiss}"
             alt="Fondateur">
        <h3>Être parmi les premiers</h3>
        <p>Les Bons Fondateurs sont réservés à ceux qui choisissent d'y croire avant l'ouverture. Un geste rare, un lieu rare.</p>
      </div>
    </div>
  </div>
</section>

<!-- ═══ CONDITIONS ═════════════════════════════════════════════════ -->
<section class="conditions">
  <div class="container">
    <span class="eyebrow">Informations pratiques</span>
    <h2>Conditions</h2>
    <div class="cond-grid">
      <div class="cond-item">Valable dès l'ouverture officielle</div>
      <div class="cond-item">Valable 12 mois dès l'ouverture</div>
      <div class="cond-item">Non remboursable en espèces</div>
      <div class="cond-item">Utilisable en une ou plusieurs fois</div>
      <div class="cond-item">Non cumulable avec d'autres offres</div>
      <div class="cond-item">Non remplaçable sans preuve d'achat</div>
    </div>
  </div>
</section>

<!-- ═══ CTA FINAL ══════════════════════════════════════════════════ -->
<section class="cta-final">
  <span class="eyebrow">Devenez fondateur</span>
  <h2>Rejoignez les premiers<br>à <em>être là</em></h2>
  <p class="sub">
    L'ouverture approche. Offrez Le Manoïre dès maintenant —
    à vous-même, ou à quelqu'un que vous aimez emmener en altitude.
  </p>
  <a href="[LIEN_STRIPE_ICI]" class="btn btn-ocre" style="font-size:1rem;padding:17px 48px">
    Offrir un Bon Cadeau →
  </a>
  <p class="reassure">Paiement sécurisé &nbsp;·&nbsp; Bon envoyé par email</p>
</section>

<!-- ═══ FOOTER ═════════════════════════════════════════════════════ -->
<footer>
  <strong style="color:rgba(251,251,248,0.55);letter-spacing:.18em">Le Manoïre</strong>
  &nbsp;·&nbsp; Col de Jaman &nbsp;·&nbsp; 1512m &nbsp;·&nbsp;
  <a href="https://www.lemanoire-jaman.ch">lemanoire-jaman.ch</a>
</footer>

<script>
function calc() {{
  var v = parseFloat(document.getElementById('montant').value);
  var r = document.getElementById('result');
  if (!v || v < 1) {{ r.classList.remove('show'); return; }}
  var b = Math.round(v * 0.15 * 100) / 100;
  var t = Math.round((v + b) * 100) / 100;
  document.getElementById('r-montant').textContent = v.toFixed(2) + ' CHF';
  document.getElementById('r-bonus').textContent   = '+ ' + b.toFixed(2) + ' CHF';
  document.getElementById('r-total').textContent   = t.toFixed(2) + ' CHF';
  r.classList.add('show');
}}
</script>
</body>
</html>"""

with open('bon_cadeau_manoire.html', 'w', encoding='utf-8') as f:
    f.write(html)

print(f"\nFichier généré : bon_cadeau_manoire.html ({len(html)//1024} KB)")
