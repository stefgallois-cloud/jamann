import sys, base64, io
from PIL import Image

sys.stdout.reconfigure(encoding='utf-8')

def img_b64(fname, max_width, quality=78):
    img = Image.open(fname).convert('RGB')
    w, h = img.size
    if w > max_width:
        img = img.resize((max_width, int(h * max_width / w)), Image.LANCZOS)
    buf = io.BytesIO()
    img.save(buf, format='JPEG', quality=quality, optimize=True)
    return base64.b64encode(buf.getvalue()).decode('ascii')

hero  = img_b64('logo_p1_img1.png', 1400, 80)
build = img_b64('logo_p2_img1.png', 700,  75)
bon   = img_b64('Image_bon_cadeau_mano.png', 780, 82)

print(f"Images: hero={len(hero)//1024}KB build={len(build)//1024}KB bon={len(bon)//1024}KB")

html = f"""<!DOCTYPE html>
<html lang="fr">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Bon Cadeau Fondateur — Le Manoïre, Col de Jaman</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&family=Courier+Prime:ital,wght@0,400;0,700;1,400&display=swap" rel="stylesheet">
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
    --font-head: 'Outfit', sans-serif;
    --font-mono: 'Courier Prime', monospace;
  }}

  html {{ scroll-behavior: smooth; }}

  body {{
    background: var(--blanc);
    color: var(--bordeaux);
    font-family: var(--font-head);
    font-size: 16px;
    line-height: 1.65;
    -webkit-font-smoothing: antialiased;
  }}

  /* ── HERO ─────────────────────────────── */
  .hero {{
    position: relative;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    padding: 60px 24px 80px;
    background-image: url('data:image/jpeg;base64,{hero}');
    background-size: cover;
    background-position: center top;
    overflow: hidden;
  }}
  .hero::before {{
    content: '';
    position: absolute; inset: 0;
    background: linear-gradient(
      to bottom,
      rgba(75,15,31,0.62) 0%,
      rgba(75,15,31,0.45) 50%,
      rgba(75,15,31,0.72) 100%
    );
  }}
  .hero > * {{ position: relative; z-index: 1; }}

  .logo-block {{ margin-bottom: 36px; }}
  .logo-cow {{ display: block; margin: 0 auto 12px; width: 60px; height: 60px; }}
  .logo-name {{
    font-family: var(--font-head);
    font-weight: 700;
    font-size: clamp(2rem, 6vw, 3.4rem);
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: var(--blanc);
    line-height: 1;
  }}
  .logo-sub {{
    font-family: var(--font-mono);
    font-size: 0.72rem;
    letter-spacing: 0.38em;
    text-transform: uppercase;
    color: var(--beige);
    margin-top: 6px;
  }}
  .hero-eyebrow {{
    font-family: var(--font-mono);
    font-size: 0.75rem;
    letter-spacing: 0.3em;
    text-transform: uppercase;
    color: var(--beige);
    margin-bottom: 18px;
  }}
  .hero h1 {{
    font-size: clamp(2.1rem, 5.5vw, 4rem);
    font-weight: 700;
    color: var(--blanc);
    line-height: 1.12;
    max-width: 760px;
    margin: 0 auto 20px;
  }}
  .hero h1 em {{ font-style: normal; color: var(--beige); }}
  .hero-slogan {{
    font-size: clamp(0.95rem, 2.2vw, 1.15rem);
    color: rgba(251,251,248,0.85);
    max-width: 520px;
    margin: 0 auto 40px;
    font-weight: 300;
    font-style: italic;
  }}
  .btn-hero {{
    display: inline-block;
    background: var(--ocre);
    color: var(--blanc);
    font-family: var(--font-head);
    font-weight: 600;
    font-size: 1rem;
    letter-spacing: 0.05em;
    text-transform: uppercase;
    text-decoration: none;
    padding: 16px 40px;
    border: none;
    cursor: pointer;
    transition: background .2s, transform .15s;
  }}
  .btn-hero:hover {{ background: var(--terra); transform: translateY(-2px); }}
  .hero-badge {{
    margin-top: 36px;
    display: inline-flex;
    align-items: center;
    gap: 10px;
    border: 1px solid rgba(226,189,140,0.5);
    padding: 10px 22px;
    color: var(--beige);
    font-family: var(--font-mono);
    font-size: 0.78rem;
    letter-spacing: 0.15em;
    text-transform: uppercase;
  }}

  /* ── SECTIONS ─────────────────────────── */
  section {{ padding: 80px 24px; }}
  .container {{ max-width: 720px; margin: 0 auto; }}
  .container-wide {{ max-width: 960px; margin: 0 auto; }}

  .section-label {{
    font-family: var(--font-mono);
    font-size: 0.7rem;
    letter-spacing: 0.35em;
    text-transform: uppercase;
    color: var(--sable);
    margin-bottom: 14px;
  }}
  h2 {{
    font-size: clamp(1.7rem, 4vw, 2.6rem);
    font-weight: 700;
    line-height: 1.15;
    color: var(--bordeaux);
    margin-bottom: 24px;
  }}
  h2 em {{ font-style: normal; color: var(--ocre); }}
  p {{ margin-bottom: 16px; color: var(--sable); font-weight: 400; }}
  p:last-child {{ margin-bottom: 0; }}

  /* ── HISTOIRE ─────────────────────────── */
  .histoire {{ background: var(--blanc); }}
  .histoire-grid {{
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 56px;
    align-items: center;
  }}
  .histoire-img {{
    width: 100%;
    aspect-ratio: 4/3;
    object-fit: cover;
    filter: grayscale(100%) contrast(1.05);
  }}
  .histoire-text p {{ font-size: 1.05rem; }}
  .quote-block {{
    border-left: 3px solid var(--ocre);
    padding: 16px 20px;
    margin: 28px 0;
    font-family: var(--font-mono);
    font-style: italic;
    font-size: 1rem;
    color: var(--bordeaux);
    background: var(--creme);
  }}

  /* ── OFFRE ────────────────────────────── */
  .offre {{ background: var(--creme); }}
  .offre-grid {{
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 56px;
    align-items: start;
  }}
  .offre-visual img {{
    width: 100%;
    box-shadow: 8px 8px 40px rgba(75,15,31,0.18);
  }}
  .offre-details h2 {{ margin-bottom: 12px; }}
  .bonus-pill {{
    display: inline-block;
    background: var(--terra);
    color: var(--blanc);
    font-weight: 700;
    font-size: 0.85rem;
    letter-spacing: 0.08em;
    padding: 5px 14px;
    margin-bottom: 24px;
  }}

  /* ── CALCULATEUR ──────────────────────── */
  .calc-box {{
    background: var(--blanc);
    border: 1px solid var(--beige);
    padding: 28px 24px;
    margin-top: 32px;
  }}
  .calc-label {{
    font-family: var(--font-mono);
    font-size: 0.72rem;
    letter-spacing: 0.28em;
    text-transform: uppercase;
    color: var(--sable);
    margin-bottom: 10px;
    display: block;
  }}
  .calc-input-wrap {{
    display: flex;
    align-items: center;
    margin-bottom: 20px;
    border: 2px solid var(--beige);
    transition: border-color .2s;
  }}
  .calc-input-wrap:focus-within {{ border-color: var(--ocre); }}
  .calc-currency {{
    padding: 12px 14px;
    background: var(--creme);
    font-family: var(--font-mono);
    font-weight: 700;
    color: var(--sable);
    font-size: 1rem;
    border-right: 1px solid var(--beige);
    white-space: nowrap;
  }}
  .calc-input {{
    flex: 1;
    border: none;
    outline: none;
    padding: 12px 14px;
    font-family: var(--font-head);
    font-size: 1.1rem;
    font-weight: 600;
    color: var(--bordeaux);
    background: var(--blanc);
    width: 100%;
  }}
  .calc-result {{
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1px;
    background: var(--beige);
    overflow: hidden;
  }}
  .calc-cell {{ background: var(--blanc); padding: 14px 16px; }}
  .calc-cell-label {{
    font-family: var(--font-mono);
    font-size: 0.65rem;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    color: var(--sable);
    margin-bottom: 4px;
  }}
  .calc-cell-value {{ font-size: 1.25rem; font-weight: 700; color: var(--bordeaux); }}
  .calc-cell-value.accent {{ color: var(--terra); }}
  .calc-cell-value.total {{ color: var(--ocre); font-size: 1.5rem; }}
  .calc-note {{
    margin-top: 12px;
    font-size: 0.8rem;
    color: var(--sable);
    font-style: italic;
    text-align: center;
  }}

  /* ── POURQUOI ─────────────────────────── */
  .pourquoi {{ background: var(--blanc); }}
  .pourquoi h2 {{ text-align: center; margin-bottom: 48px; }}
  .piliers {{ display: grid; grid-template-columns: repeat(3,1fr); gap: 32px; }}
  .pilier {{ border-top: 3px solid var(--ocre); padding-top: 24px; }}
  .pilier-icon {{ font-size: 2rem; margin-bottom: 16px; display: block; }}
  .pilier h3 {{
    font-size: 1.1rem;
    font-weight: 700;
    color: var(--bordeaux);
    margin-bottom: 10px;
  }}
  .pilier p {{ font-size: 0.95rem; }}

  /* ── CONDITIONS ───────────────────────── */
  .conditions {{ background: var(--creme); }}
  .conditions h2 {{ margin-bottom: 32px; }}
  .cond-list {{
    list-style: none;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0 48px;
  }}
  .cond-list li {{
    display: flex;
    gap: 12px;
    align-items: flex-start;
    font-size: 0.95rem;
    color: var(--sable);
    padding: 12px 0;
    border-bottom: 1px solid rgba(197,134,50,0.25);
  }}
  .cond-list li::before {{
    content: '—';
    color: var(--ocre);
    font-weight: 700;
    flex-shrink: 0;
  }}

  /* ── CTA FINAL ────────────────────────── */
  .cta-final {{
    background: var(--bordeaux);
    text-align: center;
    padding: 100px 24px;
  }}
  .cta-final .section-label {{ color: var(--beige); }}
  .cta-final h2 {{ color: var(--blanc); font-size: clamp(1.8rem,4.5vw,3rem); margin-bottom: 16px; }}
  .cta-final h2 em {{ color: var(--beige); }}
  .cta-final .sub {{
    color: rgba(251,251,248,0.7);
    font-style: italic;
    max-width: 480px;
    margin: 0 auto 40px;
    font-weight: 300;
  }}
  .btn-final {{
    display: inline-block;
    background: var(--ocre);
    color: var(--blanc);
    font-family: var(--font-head);
    font-weight: 600;
    font-size: 1.05rem;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    text-decoration: none;
    padding: 18px 52px;
    cursor: pointer;
    border: none;
    transition: background .2s, transform .15s;
  }}
  .btn-final:hover {{ background: var(--terra); transform: translateY(-2px); }}
  .cta-reassure {{
    margin-top: 20px;
    font-size: 0.8rem;
    color: rgba(251,251,248,0.45);
    font-family: var(--font-mono);
    letter-spacing: 0.1em;
  }}

  /* ── FOOTER ───────────────────────────── */
  footer {{
    background: #2a0910;
    text-align: center;
    padding: 36px 24px;
    color: rgba(251,251,248,0.35);
    font-family: var(--font-mono);
    font-size: 0.78rem;
    letter-spacing: 0.15em;
    text-transform: uppercase;
  }}
  footer a {{ color: var(--beige); text-decoration: none; }}
  footer a:hover {{ color: var(--blanc); }}

  /* ── RESPONSIVE ───────────────────────── */
  @media (max-width: 680px) {{
    .histoire-grid, .offre-grid {{ grid-template-columns: 1fr; gap: 32px; }}
    .piliers {{ grid-template-columns: 1fr; gap: 24px; }}
    .cond-list {{ grid-template-columns: 1fr; }}
    .offre-visual {{ order: -1; }}
    section {{ padding: 60px 20px; }}
  }}
</style>
</head>
<body>

<!-- ═══ HERO ══════════════════════════════════════════════════════ -->
<header class="hero" id="haut">
  <div class="logo-block">
    <svg class="logo-cow" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="30" cy="34" rx="18" ry="14" fill="#E2BD8C" stroke="#7B694D" stroke-width="1.5"/>
      <ellipse cx="30" cy="22" rx="11" ry="9" fill="#E2BD8C" stroke="#7B694D" stroke-width="1.5"/>
      <ellipse cx="24.5" cy="19" rx="3.5" ry="6" transform="rotate(-10 24.5 19)" fill="#E2BD8C" stroke="#7B694D" stroke-width="1.5"/>
      <ellipse cx="35.5" cy="19" rx="3.5" ry="6" transform="rotate(10 35.5 19)" fill="#E2BD8C" stroke="#7B694D" stroke-width="1.5"/>
      <circle cx="26.5" cy="23" r="1.8" fill="#7B694D"/>
      <circle cx="33.5" cy="23" r="1.8" fill="#7B694D"/>
      <ellipse cx="30" cy="27.5" rx="3" ry="2" fill="#C58632" opacity="0.6"/>
      <path d="M27 29.5 Q30 31.5 33 29.5" stroke="#7B694D" stroke-width="1.2" stroke-linecap="round" fill="none"/>
      <line x1="17" y1="44" x2="15" y2="54" stroke="#7B694D" stroke-width="2" stroke-linecap="round"/>
      <line x1="23" y1="46" x2="22" y2="55" stroke="#7B694D" stroke-width="2" stroke-linecap="round"/>
      <line x1="37" y1="46" x2="38" y2="55" stroke="#7B694D" stroke-width="2" stroke-linecap="round"/>
      <line x1="43" y1="44" x2="45" y2="54" stroke="#7B694D" stroke-width="2" stroke-linecap="round"/>
    </svg>
    <div class="logo-name">Le Manoïre</div>
    <div class="logo-sub">Col de Jaman &nbsp;·&nbsp; 1512m</div>
  </div>

  <p class="hero-eyebrow">Renaissance 2026 &nbsp;·&nbsp; Préalpes Vaudoises</p>
  <h1>Offrez un <em>moment<br>au-dessus de tout</em></h1>
  <p class="hero-slogan">«&nbsp;Au-dessus du lac, au-dessus du bruit, au-dessus du temps.&nbsp;»</p>
  <a href="#commande" class="btn-hero">Offrir un Bon Cadeau →</a>
  <div class="hero-badge">
    <span>★</span> Bon Cadeau Fondateur &nbsp;·&nbsp; +15% offerts
  </div>
</header>

<!-- ═══ HISTOIRE ══════════════════════════════════════════════════ -->
<section class="histoire">
  <div class="container-wide">
    <div class="histoire-grid">
      <div>
        <img class="histoire-img"
          src="data:image/jpeg;base64,{build}"
          alt="Le Manoïre, Col de Jaman — photo d'époque">
      </div>
      <div class="histoire-text">
        <p class="section-label">Une renaissance</p>
        <h2>Il était une fois<br>un lieu <em>hors du temps</em></h2>
        <p>
          Au Col de Jaman, à 1512 mètres d'altitude, se dressait autrefois
          un café-restaurant d'alpage qui a marqué des générations de
          randonneurs et de familles. Un chef étoilé y a un jour posé ses
          casseroles. Puis le silence.
        </p>
        <div class="quote-block">
          «&nbsp;Le Manoïre n'est pas un concept. C'est une transmission.&nbsp;»
        </div>
        <p>
          Aujourd'hui, Le Manoïre renaît avec une ambition claire&nbsp;:
          respecter l'âme du lieu tout en lui redonnant une force durable.
          Terroir suisse, producteurs artisanaux, accueil sincère —
          dans un monde qui va vite, nous avons choisi la solidité.
        </p>
        <p>
          L'ouverture approche. Et avant même le premier service,
          vous pouvez déjà en faire partie.
        </p>
      </div>
    </div>
  </div>
</section>

<!-- ═══ OFFRE ══════════════════════════════════════════════════════ -->
<section class="offre" id="offre">
  <div class="container-wide">
    <div class="offre-grid">
      <div class="offre-visual">
        <img src="data:image/jpeg;base64,{bon}"
             alt="Bon Cadeau Fondateur — Le Manoïre Col de Jaman">
      </div>
      <div class="offre-details">
        <p class="section-label">L'offre</p>
        <h2>Bon Cadeau<br><em>Fondateur</em></h2>
        <span class="bonus-pill">+ 15% offerts par Le Manoïre</span>
        <p>
          Choisissez librement le montant que vous souhaitez offrir.
          Le Manoïre y ajoute <strong>15&nbsp;% de valeur supplémentaire</strong>,
          entièrement offerts — un geste de gratitude envers celles
          et ceux qui croient en cette renaissance avant même l'ouverture.
        </p>

        <div class="calc-box" id="commande">
          <span class="calc-label">Calculez votre bon cadeau</span>
          <div class="calc-input-wrap">
            <span class="calc-currency">CHF</span>
            <input
              class="calc-input"
              type="number"
              id="montant"
              placeholder="200"
              min="10"
              step="5"
              oninput="calcBonus()"
            >
          </div>
          <div class="calc-result" id="result" style="display:none">
            <div class="calc-cell">
              <div class="calc-cell-label">Montant offert</div>
              <div class="calc-cell-value" id="r-montant">—</div>
            </div>
            <div class="calc-cell">
              <div class="calc-cell-label">Bonus Manoïre (+15%)</div>
              <div class="calc-cell-value accent" id="r-bonus">—</div>
            </div>
            <div class="calc-cell" style="grid-column:1/-1;background:var(--creme)">
              <div class="calc-cell-label">Valeur totale du bon</div>
              <div class="calc-cell-value total" id="r-total">—</div>
            </div>
          </div>
          <p class="calc-note">Exemple&nbsp;: offrir 200 CHF = valeur totale de 230 CHF</p>
        </div>

        <div style="margin-top:28px">
          <a href="[LIEN_STRIPE_ICI]" class="btn-final">Commander ce bon →</a>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- ═══ POURQUOI ═══════════════════════════════════════════════════ -->
<section class="pourquoi">
  <div class="container-wide">
    <p class="section-label" style="text-align:center">Pourquoi ce bon</p>
    <h2>Trois bonnes raisons<br>d'être <em>fondateur</em></h2>
    <div class="piliers">
      <div class="pilier">
        <span class="pilier-icon">⛰</span>
        <h3>Une expérience hors du quotidien</h3>
        <p>
          Offrir Le Manoïre, c'est offrir une escapade au-dessus du lac,
          du bruit et du temps. Une table d'altitude, une cuisine de terroir,
          un moment de reconnexion avec l'essentiel.
        </p>
      </div>
      <div class="pilier">
        <span class="pilier-icon">🤝</span>
        <h3>Soutenir une renaissance unique</h3>
        <p>
          Chaque bon acheté avant l'ouverture participe directement
          à faire revivre ce lieu emblématique. Vous n'offrez pas
          un repas — vous soutenez une transmission.
        </p>
      </div>
      <div class="pilier">
        <span class="pilier-icon">★</span>
        <h3>Rejoindre les premiers</h3>
        <p>
          Les Bons Cadeaux Fondateurs sont réservés à celles et ceux
          qui choisissent d'y croire avant même le premier service.
          Un geste rare, pour un lieu qui le sera aussi.
        </p>
      </div>
    </div>
  </div>
</section>

<!-- ═══ CONDITIONS ═════════════════════════════════════════════════ -->
<section class="conditions">
  <div class="container">
    <p class="section-label">Informations pratiques</p>
    <h2>Conditions<br>d'utilisation</h2>
    <ul class="cond-list">
      <li>Valable dès l'ouverture officielle du Manoïre</li>
      <li>Valable 12 mois à partir de la date d'ouverture</li>
      <li>Non remboursable en espèces</li>
      <li>Utilisable en une ou plusieurs fois</li>
      <li>Non cumulable avec d'autres offres</li>
      <li>Non remplaçable en cas de perte sans preuve d'achat</li>
    </ul>
  </div>
</section>

<!-- ═══ CTA FINAL ══════════════════════════════════════════════════ -->
<section class="cta-final">
  <p class="section-label">Devenez fondateur</p>
  <h2>Rejoignez les premiers<br>à <em>être là</em></h2>
  <p class="sub">
    L'ouverture approche. Les Bons Cadeaux Fondateurs
    sont disponibles dès maintenant — pour vous, ou pour
    quelqu'un que vous aimez emmener en altitude.
  </p>
  <a href="[LIEN_STRIPE_ICI]" class="btn-final">Offrir un Bon Cadeau →</a>
  <p class="cta-reassure">Paiement sécurisé · Bon envoyé par email</p>
</section>

<!-- ═══ FOOTER ═════════════════════════════════════════════════════ -->
<footer>
  <p>
    <strong style="color:rgba(251,251,248,0.6);letter-spacing:.2em">Le Manoïre</strong>
    &nbsp;·&nbsp; Col de Jaman &nbsp;·&nbsp; 1512m &nbsp;·&nbsp;
    <a href="https://www.lemanoire-jaman.ch">lemanoire-jaman.ch</a>
  </p>
</footer>

<script>
function calcBonus() {{
  var val = parseFloat(document.getElementById('montant').value);
  var res = document.getElementById('result');
  if (!val || val < 1) {{ res.style.display = 'none'; return; }}
  var bonus = Math.round(val * 0.15 * 100) / 100;
  var total = Math.round((val + bonus) * 100) / 100;
  document.getElementById('r-montant').textContent = val.toFixed(2) + ' CHF';
  document.getElementById('r-bonus').textContent   = '+ ' + bonus.toFixed(2) + ' CHF';
  document.getElementById('r-total').textContent   = total.toFixed(2) + ' CHF';
  res.style.display = 'grid';
}}
</script>
</body>
</html>"""

with open('bon_cadeau_manoire.html', 'w', encoding='utf-8') as f:
    f.write(html)

print(f"Fichier généré : bon_cadeau_manoire.html ({len(html)//1024} KB)")
