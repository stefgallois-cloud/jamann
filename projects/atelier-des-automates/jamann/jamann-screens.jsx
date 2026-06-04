// @ts-nocheck
// jamann-screens.jsx — ProfileScreen + constantes Manoïre (piliers + few-shot)
//
// App mono-client Le Manoïre. Pas d'onboarding, pas de profil éditable —
// tout est hardcodé. Les piliers éditoriaux pilotent la génération IA.

// ─── PILIERS ÉDITORIAUX MANOÏRE ──────────────────────────────────────────────
// Source : projects/manoire/calendrier-posts-prouverture.md + note de cadrage
const PILLARS = [
  {
    id: 'travaux',
    label: 'Coulisses travaux',
    emoji: '🔨',
    angle: 'On est dans la rénovation, on documente en direct.',
    vocab: 'chantier, marteau, poussière, étape, avancement, semaine X, avant/après',
    hashtags: ['Travaux', 'Chantier', 'Renovation'],
  },
  {
    id: 'anouck',
    label: 'Anouck & vie du col',
    emoji: '🐾',
    angle: 'La Saint-Bernard, ses inspections, la vie animale au col. Humour tendre toléré.',
    vocab: 'Anouck, pattes, inspection, garde, col, mascotte, escapade',
    hashtags: ['SaintBernard', 'Anouck', 'VieAuCol'],
  },
  {
    id: 'terroir',
    label: 'Cuisine & terroir',
    emoji: '🧀',
    angle: 'Producteurs locaux, fromages, plats, alpage, ce qui sera dans l\'assiette.',
    vocab: 'terroir, producteur, alpage, fromage, charcuterie, généreux, saveurs',
    hashtags: ['Terroir', 'ProducteursLocaux', 'CuisineSuisse'],
  },
  {
    id: 'lieu',
    label: 'Vue & lieu',
    emoji: '🏔️',
    angle: 'L\'altitude (1512m), panorama Préalpes, terrasse, lac Léman, accès.',
    vocab: 'altitude, panorama, terrasse, Préalpes, Léman, halte, hauteur, lenteur',
    hashtags: ['AlpageMontreux', 'PrealpesVaudoises', 'VueAlpes'],
  },
  {
    id: 'histoire',
    label: 'Histoire & transmission',
    emoji: '🤍',
    angle: 'Retour au nom originel, mémoire du lieu, ancien chef étoilé, renaissance.',
    vocab: 'racines, transmission, retour, mémoire, héritage, renaissance, originel',
    hashtags: ['Renaissance', 'TransmissionFamiliale', 'Heritage'],
  },
  {
    id: 'countdown',
    label: 'Compte à rebours',
    emoji: '📅',
    angle: 'J-X, jalons, ouverture fin juin 2026, événements saisonniers.',
    vocab: 'J-X, dans X jours, ouverture, bientôt, dernière ligne droite',
    hashtags: ['OuvertureBientot', 'FinJuin2026', 'CountDown'],
  },
];

// ─── EXEMPLES VALIDÉS (few-shot) ─────────────────────────────────────────────
// 1 exemple canonique par pilier. Posts déjà publiés/validés par Stéphanie.
// L'IA doit calquer la VOIX (rythme, longueur, ton), pas le contenu.
const FEWSHOT_EXAMPLES = `EXEMPLES DE POSTS VALIDÉS — 1 par pilier (calque la voix, pas le contenu) :

— Pilier "travaux" (Facebook) —
Les marteaux sont sortis. Le Manoïre se refait une beauté.
Anouck supervise les travaux. Rapport de chantier à suivre. 🐾🔨
Rendez-vous fin juin 2026.

— Pilier "anouck" (Facebook) —
Il y a des retours qui ressemblent à des retrouvailles.
Anouck avait 2 mois la première fois qu'elle a posé ses pattes au Col de Jaman.
Depuis, ce col, c'est chez elle. Son maître aussi — et c'est lui qui remet Le Manoïre sur pied.
Les travaux vont bientôt commencer. On vous emmène avec nous. 🔨
Fin juin 2026, on ouvre les portes.

— Pilier "terroir" (Instagram) —
À 1 500m, on ne plaisante pas avec la qualité.
Producteurs locaux, saveurs du terroir, cuisine généreuse.
C'est ce qui vous attend. 🧀

— Pilier "lieu" (Instagram) —
Il y a des endroits qui font du bien rien qu'en les regardant.
Le Col de Jaman, c'est l'un d'eux.
On vous prépare quelque chose. 🏔️

— Pilier "histoire" (Facebook) —
Le Manoïre. C'est son vrai nom. Celui d'avant.
On le reprend. On le porte fièrement.
Retour aux origines — fin juin 2026. 🤍

— Pilier "countdown" (Facebook) —
Dans 3 jours, les portes s'ouvrent.
On a tellement hâte de vous accueillir.
Le Manoïre vous attend. 🏔️🤍`;

// ─── PROFILE SCREEN ──────────────────────────────────────────────────────────
// Lecture seule. Affiche la marque Manoïre + les piliers éditoriaux.
function ProfileScreen({ T, brand }) {
  const rows = [
    { l: 'Établissement',  v: brand.tagline },
    { l: 'Localisation',   v: brand.location },
    { l: 'Ouverture',      v: brand.opening },
    { l: 'Site',           v: brand.site },
    { l: 'Instagram',      v: `@${brand.ig}` },
    { l: 'Page Facebook',  v: brand.fb },
    { l: 'Mascotte',       v: `${brand.mascotte.name} (${brand.mascotte.species})` },
  ];

  return (
    <div className="fade-in" style={{ display: 'flex', flexDirection: 'column' }}>
      <div style={{ padding: '18px 20px 12px' }}>
        <p className="font-fraunces" style={{ fontSize: 26, fontWeight: 700, color: T.text }}>Marque</p>
        <p style={{ fontSize: 12, color: T.textSub, marginTop: 3 }}>Configuration mono-client — lecture seule</p>
      </div>
      <div style={{ padding: '4px 16px 24px', display: 'flex', flexDirection: 'column', gap: 12 }}>

        {/* Hero card */}
        <div style={{ background: T.btnGrad, borderRadius: 24, padding: '24px 22px 22px', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: -30, right: -20, width: 150, height: 150, borderRadius: '50%', background: 'rgba(255,255,255,0.07)' }} />
          <div style={{ position: 'absolute', bottom: -40, right: 40, width: 110, height: 110, borderRadius: '50%', background: 'rgba(255,255,255,0.04)' }} />
          
          {/* Logo Manoïre */}
          <div style={{ position: 'absolute', top: 20, right: 20, width: 64, height: 64, background: '#fff', borderRadius: '50%', padding: 8, boxShadow: '0 4px 12px rgba(0,0,0,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <img src="logo.png" alt="Le Manoïre" style={{ width: '100%', height: 'auto', objectFit: 'contain' }} />
          </div>

          <p style={{ fontSize: 11, fontWeight: 700, color: 'rgba(255,255,255,0.55)', textTransform: 'uppercase', letterSpacing: '0.09em', marginBottom: 10, position: 'relative' }}>Client unique</p>
          <p className="font-fraunces" style={{ fontSize: 32, fontWeight: 700, color: '#fff', position: 'relative', lineHeight: 1.1 }}>{brand.name}</p>
          <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.7)', marginTop: 8, position: 'relative', lineHeight: 1.4 }}>{brand.tagline}</p>
        </div>

        {/* Info list */}
        <div className="glass-surface hover-scale" style={{ borderRadius: 20, overflow: 'hidden' }}>
          {rows.map((row, i) => (
            <div key={i} style={{ padding: '13px 16px', borderBottom: i < rows.length - 1 ? `1px solid ${T.border}` : 'none' }}>
              <p style={{ fontSize: 10, fontWeight: 700, color: T.textMuted, textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: 5 }}>{row.l}</p>
              <p style={{ fontSize: 14, color: T.text, fontWeight: 500 }}>{row.v}</p>
            </div>
          ))}
        </div>

        {/* Piliers éditoriaux */}
        <div className="glass-surface hover-scale" style={{ borderRadius: 20, padding: '14px 16px' }}>
          <p style={{ fontSize: 11, fontWeight: 700, color: T.textMuted, textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: 10 }}>Piliers éditoriaux ({PILLARS.length})</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {PILLARS.map(p => (
              <div key={p.id} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                <span style={{ fontSize: 18, lineHeight: 1.2 }}>{p.emoji}</span>
                <div style={{ flex: 1 }}>
                  <p style={{ fontSize: 13, fontWeight: 600, color: T.text }}>{p.label}</p>
                  <p style={{ fontSize: 12, color: T.textSub, marginTop: 2, lineHeight: 1.45 }}>{p.angle}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* AI note */}
        <div style={{ background: T.accentBg, borderRadius: 14, padding: '12px 15px', border: `1px solid ${T.accentBorder}` }}>
          <p style={{ fontSize: 13, color: T.accentSoft, lineHeight: 1.55 }}>
            ✦ Le prompt IA intègre la marque, le pilier sélectionné et 6 exemples canoniques pour générer dans la voix Manoïre.
          </p>
        </div>

        {/* Crédits & mentions */}
        <div className="glass-surface" style={{ borderRadius: 20, padding: '14px 16px', marginTop: 4 }}>
          <p style={{ fontSize: 11, fontWeight: 700, color: T.textMuted, textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: 10 }}>Crédits & mentions</p>
          <p style={{ fontSize: 13, color: T.text, lineHeight: 1.5 }}>
            <strong>Jamann</strong> — application de génération de posts assistée par IA.
          </p>
          <p style={{ fontSize: 12, color: T.textSub, lineHeight: 1.5, marginTop: 6 }}>
            Conçue et développée par <span className="font-caveat" style={{ color: T.text, fontSize: 18, fontWeight: 500 }}>L'Atelier des Automates</span> <span style={{ color: T.textMuted }}>· une branche de</span> <strong style={{ color: T.text }}>Clockwork Ops</strong> · 2026, pour Le Manoïre. Génération propulsée par Google Gemini. Hébergement Netlify/Cloudflare.
          </p>
          <p style={{ fontSize: 11, color: T.textMuted, lineHeight: 1.5, marginTop: 8 }}>
            Aucune donnée personnelle n'est collectée par l'app. Les prompts envoyés à l'IA contiennent uniquement le contexte éditorial de la marque et l'idée saisie par l'utilisateur. Pour toute question : <a href="mailto:stef.gallois@gmail.com" style={{ color: T.accentSoft, textDecoration:'none' }}>stef.gallois@gmail.com</a>
          </p>
        </div>

      </div>
    </div>
  );
}

Object.assign(window, { ProfileScreen, PILLARS, FEWSHOT_EXAMPLES });
