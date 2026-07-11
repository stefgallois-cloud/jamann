#!/usr/bin/env python3
"""Patch generate_v3.py: marquee strip, offre section (photo+calc), piliers centered, footer redesign."""
import sys
sys.stdout.reconfigure(encoding='utf-8')

fp = r'C:\Users\DELL\Desktop\la terrasse Mika\bon cadeau\generate_v3.py'
with open(fp, encoding='utf-8') as f:
    src = f.read()

changes = 0

def rep(old, new):
    global src, changes
    if old in src:
        src = src.replace(old, new)
        changes += 1
    else:
        print(f'  [MISS] Could not find: {repr(old[:60])}')

# ──────────────────────────────────────────────
# 1. STRIP CSS → marquee animé
# ──────────────────────────────────────────────
rep(
"""/* ── STRIP ── */
.strip {{
  background: var(--bordeaux);
  border-top: 1px solid rgba(197,134,50,0.18);
  padding: 20px 80px;
}}
.strip-inner {{
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
  font-family: 'ClashGrotesk', sans-serif;
  font-size: 11px;
  font-weight: 500;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: var(--beige);
  opacity: 0.55;
}}
.strip-inner .sep {{
  color: var(--ocre);
  font-size: 7px;
  opacity: 1;
  line-height: 1;
}}""",
"""/* ── STRIP MARQUEE ── */
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
}}""")

# ──────────────────────────────────────────────
# 2. OFFRE CSS → layout photo + contenu
# ──────────────────────────────────────────────
rep(
"""/* ── OFFRE ── */
.offre-grid {{
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 72px;
  align-items: start;
}}
.offre-intro {{
  font-size: 19px;
  line-height: 1.75;
  color: var(--texte);
  margin-bottom: 32px;
}}""",
"""/* ── OFFRE ── */
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
}}""")

# ──────────────────────────────────────────────
# 3. Supprimer tout le CSS bon-kraft
# ──────────────────────────────────────────────
rep(
"""/* ── BON CADEAU VISUEL — KRAFT VINTAGE ── */
.bon-kraft {{
  background-color: #C4A06C;
  background-image:
    radial-gradient(ellipse at 25% 25%, rgba(180,130,50,0.35) 0%, transparent 55%),
    radial-gradient(ellipse at 75% 75%, rgba(110,70,10,0.25) 0%, transparent 55%),
    url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)' opacity='0.06'/%3E%3C/svg%3E");
  border: 2.5px solid #7A4E18;
  padding: 20px;
  position: relative;
  box-shadow: 0 12px 48px rgba(60,32,0,0.28), inset 0 1px 0 rgba(255,220,140,0.3);
}}
.bon-frame {{
  border: 1px solid rgba(100,60,10,0.38);
  padding: 28px 30px 22px;
  text-align: center;
  position: relative;
}}
.bon-corn {{
  position: absolute;
  width: 52px;
  height: 52px;
  opacity: 0.5;
  pointer-events: none;
}}
.bon-corn-tl {{ top: 12px; left: 12px; }}
.bon-corn-tr {{ top: 12px; right: 12px; transform: scaleX(-1); }}
.bon-corn-bl {{ bottom: 12px; left: 12px; transform: scaleY(-1); }}
.bon-corn-br {{ bottom: 12px; right: 12px; transform: rotate(180deg); }}
.bon-illustration {{
  width: 90px;
  height: 90px;
  object-fit: contain;
  display: block;
  margin: 0 auto 12px;
  filter: sepia(80%) contrast(1.3) brightness(0.62);
}}
.bon-titre {{
  font-family: 'Tenaciou', serif;
  font-weight: 900;
  font-size: 23px;
  color: #3C1E08;
  letter-spacing: 0.14em;
  line-height: 1;
}}
.bon-lieu {{
  font-family: 'ClashGrotesk', sans-serif;
  font-size: 10px;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: #6B4010;
  font-weight: 500;
  margin: 5px 0 0;
}}
.bon-rule {{
  height: 1px;
  background: linear-gradient(to right, transparent, rgba(100,58,8,0.55), transparent);
  margin: 13px 0;
}}
.bon-nom {{
  font-family: 'Tenaciou', serif;
  font-weight: 900;
  font-size: 28px;
  color: #3C1E08;
  line-height: 1.1;
  margin-bottom: 5px;
}}
.bon-tagline {{
  font-size: 10px;
  color: #7A4E18;
  letter-spacing: 0.18em;
  font-weight: 600;
  text-transform: uppercase;
}}
.bon-montants {{
  margin: 4px 0;
  text-align: left;
}}
.bon-ligne {{
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  padding: 7px 0;
  border-bottom: 1px dotted rgba(80,45,5,0.22);
  gap: 12px;
}}
.bon-ligne:last-child {{ border-bottom: none; padding-bottom: 0; }}
.bon-ligne-label {{
  font-family: 'ClashGrotesk', sans-serif;
  font-size: 12px;
  font-weight: 500;
  color: #5C3010;
  white-space: nowrap;
}}
.bon-ligne-val {{
  font-family: 'Tenaciou', serif;
  font-weight: 900;
  font-size: 17px;
  color: #3C1E08;
  white-space: nowrap;
  flex-shrink: 0;
}}
.bon-ligne-total .bon-ligne-label {{
  font-weight: 700;
  font-size: 13px;
  color: #3C1E08;
}}
.bon-ligne-total .bon-ligne-val {{
  font-size: 22px;
  color: #7A1A04;
}}
.bon-bas {{
  font-family: 'ClashGrotesk', sans-serif;
  font-size: 9px;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: #6B4010;
  opacity: 0.65;
  font-weight: 500;
}}

""",
"")

# ──────────────────────────────────────────────
# 4. PILIERS → centrage
# ──────────────────────────────────────────────
rep(
""".pilier {{
  display: flex;
  flex-direction: column;
  gap: 20px;
}}""",
""".pilier {{
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: center;
  text-align: center;
}}""")

# ──────────────────────────────────────────────
# 5. FOOTER CSS → colonne centrée
# ──────────────────────────────────────────────
rep(
"""/* ── FOOTER ── */
footer {{
  background: var(--noir);
  padding: 52px 80px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}}
.footer-logo {{ height: 72px; width: auto; }}
.footer-links {{
  display: flex;
  gap: 36px;
}}
.footer-links a {{
  color: var(--beige);
  opacity: 0.35;
  text-decoration: none;
  font-size: 11px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  font-weight: 500;
  transition: opacity 0.2s;
}}
.footer-links a:hover {{ opacity: 0.7; }}""",
"""/* ── FOOTER ── */
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
}}""")

# ──────────────────────────────────────────────
# 6. RESPONSIVE CSS → mise à jour
# ──────────────────────────────────────────────
rep(
"""  .strip {{ padding: 14px 24px; }}
  .strip-inner {{ flex-wrap: wrap; gap: 12px; }}
  .section, .section-creme .inner, .section-dark .inner {{ padding: 64px 40px; }}
  .offre-grid, .histoire-grid {{ grid-template-columns: 1fr; gap: 48px; }}
  .offre-photos {{ grid-template-columns: 1fr 1fr; }}
  .histoire-photo {{ aspect-ratio: 4/3; max-height: 300px; width: 100%; }}""",
"""  .strip {{ padding: 10px 0; }}
  .section, .section-creme .inner, .section-dark .inner {{ padding: 64px 40px; }}
  .offre-nouv {{ grid-template-columns: 1fr; }}
  .offre-img-col {{ max-height: 320px; }}
  .histoire-grid {{ grid-template-columns: 1fr; gap: 48px; }}
  .histoire-photo {{ aspect-ratio: 4/3; max-height: 300px; width: 100%; }}""")

rep(
"""  .bon {{ padding: 32px 28px; }}
  .calculateur {{ padding: 28px 24px; }}
  .calc-result {{ grid-template-columns: 1fr; }}
  footer {{ padding: 36px 24px; }}
  .cta-final {{ padding: 64px 24px; }}
  .strip-item {{ padding: 22px 24px; }}""",
"""  .calculateur {{ padding: 28px 24px; }}
  .calc-result {{ grid-template-columns: 1fr; }}
  .offre-col {{ padding: 48px 32px; }}
  footer {{ padding: 40px 24px 28px; }}
  .cta-final {{ padding: 64px 24px; }}""")

# ──────────────────────────────────────────────
# 7. STRIP HTML → marquee défilant
# ──────────────────────────────────────────────
rep(
"""<!-- STRIP -->
<div class="strip">
  <div class="strip-inner">
    <span>1 512 m d'altitude</span>
    <span class="sep">◆</span>
    <span>+15 % offerts</span>
    <span class="sep">◆</span>
    <span>12 mois de validité</span>
  </div>
</div>""",
"""<!-- STRIP MARQUEE -->
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
</div>""")

# ──────────────────────────────────────────────
# 8. OFFRE HTML → photo gauche + calculateur droit
# ──────────────────────────────────────────────
rep(
"""<!-- SECTION OFFRE -->
<div class="section-creme">
  <div class="inner">
    <div class="label">L'offre fondatrice</div>
    <h2>Bon Cadeau Fondateur</h2>
    <div class="offre-grid">
      <div>
        <p class="offre-intro">Avant même que Le Manoïre n'ouvre ses portes, vous pouvez en faire partie. En offrant un Bon Cadeau Fondateur, vous soutenez la renaissance d'un lieu unique — et Le Manoïre vous en remercie en ajoutant <strong>15 % à la valeur de votre don</strong>.</p>
        <p>Choisissez librement le montant que vous souhaitez offrir. Le Manoïre l'augmentera de 15 %, en guise de gratitude pour votre confiance avant l'heure.</p>
      </div>
      <div>
        <!-- BON CADEAU VISUEL — KRAFT VINTAGE -->
        <div class="bon-kraft">
          <div class="bon-corn bon-corn-tl">{svg_edelweiss}</div>
          <div class="bon-corn bon-corn-tr">{svg_edelweiss}</div>
          <div class="bon-corn bon-corn-bl">{svg_edelweiss}</div>
          <div class="bon-corn bon-corn-br">{svg_edelweiss}</div>
          <div class="bon-frame">
            <img src="data:image/png;base64,{logo_bon_b64}" alt="" class="bon-illustration">
            <div class="bon-titre">LE MANOÏRE</div>
            <div class="bon-lieu">— Col de Jaman —</div>
            <div class="bon-rule"></div>
            <div class="bon-nom">Bon Cadeau Fondateur</div>
            <div class="bon-tagline">Valeur libre · +15 % offerts</div>
            <div class="bon-rule"></div>
            <div class="bon-montants">
              <div class="bon-ligne">
                <span class="bon-ligne-label">Montant offert</span>
                <span class="bon-ligne-val" id="bon-montant-offert">— CHF</span>
              </div>
              <div class="bon-ligne">
                <span class="bon-ligne-label">Bonus Manoïre (+15 %)</span>
                <span class="bon-ligne-val" id="bon-bonus-val">— CHF</span>
              </div>
              <div class="bon-ligne bon-ligne-total">
                <span class="bon-ligne-label">Valeur totale</span>
                <span class="bon-ligne-val" id="bon-total-val">— CHF</span>
              </div>
            </div>
            <div class="bon-rule"></div>
            <div class="bon-bas">Valable 12 mois dès l'ouverture · lemanoire-jaman.ch</div>
          </div>
        </div>
        <!-- CALCULATEUR -->
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
              <div class="calc-line-val" id="calc-bonus">— CHF</div>
            </div>
            <div class="calc-line highlight">
              <div class="calc-line-label">Valeur totale</div>
              <div class="calc-line-val" id="calc-total">— CHF</div>
            </div>
          </div>
          <a href="[LIEN_STRIPE_ICI]" class="calc-cta" id="cta-btn">
            Offrir ce bon →
          </a>
        </div>
      </div>
    </div>
  </div>
</div>""",
"""<!-- SECTION OFFRE -->
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
</div>""")

# ──────────────────────────────────────────────
# 9. CTA FINAL : retirer id="commande" (déplacé)
# ──────────────────────────────────────────────
rep(
'<div class="section-dark" id="commande">',
'<div class="section-dark" id="cta-section">')

# ──────────────────────────────────────────────
# 10. FOOTER HTML → centré avec copyright
# ──────────────────────────────────────────────
rep(
"""<!-- FOOTER -->
<footer>
  <img src="data:image/png;base64,{logo_footer_b64}"
       alt="Le Manoïre — Col de Jaman"
       class="footer-logo">
  <div class="footer-links">
    <a href="https://lemanoire-jaman.ch">lemanoire-jaman.ch</a>
    <a href="#top">Haut de page</a>
  </div>
</footer>""",
"""<!-- FOOTER -->
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
</footer>""")

# ──────────────────────────────────────────────
# 11. JS → nettoyer les références bon-kraft
# ──────────────────────────────────────────────
rep(
"""  const bonMontant    = document.getElementById('bon-montant-offert');
  const bonBonusVal   = document.getElementById('bon-bonus-val');
  const bonTotalVal   = document.getElementById('bon-total-val');""",
"")

rep(
"""      bonMontant.textContent  = '— CHF';
      bonBonusVal.textContent = '— CHF';
      bonTotalVal.textContent = '— CHF';""",
"")

rep(
"""    bonMontant.textContent  = fmt(raw);
    bonBonusVal.textContent = fmt(bonus);
    bonTotalVal.textContent = fmt(total);""",
"")

# ──────────────────────────────────────────────
with open(fp, 'w', encoding='utf-8') as f:
    f.write(src)

print(f'Patch terminé : {changes} remplacement(s) réussi(s).')
