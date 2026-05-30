// ============================================================
// DOS LIBRE 60J — Application · Les Vertébrées
// Vanilla JS SPA · localStorage uniquement · Sans inscription
// ============================================================

// ── SVG Illustrations (positions) ───────────────────────────
const POSES = {

  // Allongée sur le dos, genoux fléchis
  'allongee-dos': `<svg viewBox="0 0 200 100" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
    <line x1="15" y1="80" x2="185" y2="80" stroke-width="1" opacity="0.2"/>
    <circle cx="22" cy="55" r="10" fill="none"/>
    <line x1="32" y1="55" x2="108" y2="55"/>
    <line x1="58" y1="55" x2="54" y2="73"/>
    <line x1="76" y1="55" x2="72" y2="73"/>
    <path d="M108,55 Q130,32 150,58"/>
    <path d="M116,57 Q138,34 158,60"/>
  </svg>`,

  // À quatre pattes
  'quatre-pattes': `<svg viewBox="0 0 200 100" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
    <line x1="20" y1="82" x2="180" y2="82" stroke-width="1" opacity="0.2"/>
    <circle cx="38" cy="43" r="10" fill="none"/>
    <path d="M38,53 Q46,58 54,58"/>
    <line x1="54" y1="58" x2="148" y2="58"/>
    <line x1="54" y1="58" x2="42" y2="82"/>
    <line x1="62" y1="58" x2="50" y2="82"/>
    <line x1="138" y1="58" x2="143" y2="82"/>
    <line x1="148" y1="58" x2="153" y2="82"/>
  </svg>`,

  // Debout
  'debout': `<svg viewBox="0 0 80 180" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
    <line x1="10" y1="170" x2="70" y2="170" stroke-width="1" opacity="0.2"/>
    <circle cx="40" cy="18" r="11" fill="none"/>
    <line x1="40" y1="29" x2="40" y2="105"/>
    <line x1="40" y1="50" x2="22" y2="88"/>
    <line x1="40" y1="50" x2="58" y2="88"/>
    <line x1="40" y1="105" x2="28" y2="150"/>
    <line x1="28" y1="150" x2="22" y2="168"/>
    <line x1="40" y1="105" x2="52" y2="150"/>
    <line x1="52" y1="150" x2="58" y2="168"/>
  </svg>`,

  // Marche (foulée)
  'marche': `<svg viewBox="0 0 90 180" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
    <line x1="10" y1="170" x2="80" y2="170" stroke-width="1" opacity="0.2"/>
    <circle cx="48" cy="18" r="11" fill="none"/>
    <path d="M48,29 L46,105"/>
    <line x1="46" y1="52" x2="22" y2="82"/>
    <line x1="46" y1="52" x2="66" y2="96"/>
    <path d="M46,105 L30,148 L22,165"/>
    <path d="M46,105 L62,148 L70,165"/>
  </svg>`,

  // Posture enfant (child's pose)
  'enfant': `<svg viewBox="0 0 200 100" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
    <line x1="15" y1="85" x2="185" y2="85" stroke-width="1" opacity="0.2"/>
    <circle cx="168" cy="72" r="9" fill="none"/>
    <path d="M168,63 Q148,55 108,68 Q82,76 70,82"/>
    <path d="M108,68 Q100,72 90,82"/>
    <line x1="168" y1="67" x2="175" y2="55"/>
    <line x1="162" y1="66" x2="178" y2="55"/>
  </svg>`,

  // Assise sur une chaise
  'assise': `<svg viewBox="0 0 120 180" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
    <line x1="10" y1="170" x2="110" y2="170" stroke-width="1" opacity="0.2"/>
    <rect x="15" y="95" width="90" height="6" rx="3" opacity="0.4"/>
    <line x1="20" y1="101" x2="20" y2="168"/>
    <line x1="100" y1="101" x2="100" y2="168"/>
    <circle cx="60" cy="22" r="11" fill="none"/>
    <line x1="60" y1="33" x2="60" y2="95"/>
    <line x1="60" y1="52" x2="35" y2="88"/>
    <line x1="60" y1="52" x2="82" y2="88"/>
    <path d="M60,95 L40,130 L38,165"/>
    <path d="M60,95 L80,130 L82,165"/>
  </svg>`,

  // Sur le côté
  'allongee-cote': `<svg viewBox="0 0 200 100" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
    <line x1="15" y1="80" x2="185" y2="80" stroke-width="1" opacity="0.2"/>
    <circle cx="22" cy="52" r="10" fill="none"/>
    <line x1="32" y1="52" x2="112" y2="55"/>
    <line x1="55" y1="52" x2="50" y2="38"/>
    <path d="M112,55 L145,48 L162,62"/>
    <path d="M112,57 L148,52 L165,65"/>
  </svg>`,

  // Sur le ventre (prone)
  'ventre': `<svg viewBox="0 0 200 100" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
    <line x1="15" y1="72" x2="185" y2="72" stroke-width="1" opacity="0.2"/>
    <circle cx="22" cy="58" r="10" fill="none"/>
    <line x1="32" y1="58" x2="115" y2="58"/>
    <line x1="50" y1="58" x2="38" y2="45"/>
    <line x1="70" y1="58" x2="72" y2="44"/>
    <line x1="105" y1="58" x2="140" y2="50"/>
    <line x1="140" y1="50" x2="162" y2="58"/>
    <line x1="110" y1="59" x2="148" y2="54"/>
    <line x1="148" y1="54" x2="168" y2="60"/>
  </svg>`,

  // Fente (lunge) / Guerrier
  'fente': `<svg viewBox="0 0 140 180" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
    <line x1="10" y1="170" x2="130" y2="170" stroke-width="1" opacity="0.2"/>
    <circle cx="65" cy="20" r="11" fill="none"/>
    <path d="M65,31 L62,90"/>
    <line x1="62" y1="52" x2="42" y2="82"/>
    <line x1="62" y1="52" x2="82" y2="82"/>
    <path d="M62,90 L30,132 L22,165"/>
    <path d="M62,90 L90,130 L100,165"/>
  </svg>`,

  // Yoga debout (montagne, bras levés)
  'yoga-debout': `<svg viewBox="0 0 80 200" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
    <line x1="10" y1="190" x2="70" y2="190" stroke-width="1" opacity="0.2"/>
    <circle cx="40" cy="20" r="11" fill="none"/>
    <line x1="40" y1="31" x2="40" y2="112"/>
    <line x1="40" y1="48" x2="20" y2="20"/>
    <line x1="40" y1="48" x2="60" y2="20"/>
    <line x1="40" y1="112" x2="28" y2="158"/>
    <line x1="28" y1="158" x2="22" y2="186"/>
    <line x1="40" y1="112" x2="52" y2="158"/>
    <line x1="52" y1="158" x2="58" y2="186"/>
  </svg>`,
};

// Détecte le type d'illustration à partir de la position
function detectPose(position) {
  if (!position) return 'debout';
  const p = position.toLowerCase();
  if (p.includes('quatre pattes') || p.includes('4 pattes')) return 'quatre-pattes';
  if (p.includes('dos') || p.includes('allongée sur le dos') || p.includes('allonge')) return 'allongee-dos';
  if (p.includes('côté') || p.includes('cote')) return 'allongee-cote';
  if (p.includes('ventre')) return 'ventre';
  if (p.includes('enfant') || p.includes('talons')) return 'enfant';
  if (p.includes('assise') || p.includes('chaise')) return 'assise';
  if (p.includes('fente') || p.includes('guerrier')) return 'fente';
  if (p.includes('yoga') || p.includes('montagne') || p.includes('mains en prière')) return 'yoga-debout';
  if (p.includes('marche') || p.includes('debout') || p.includes('debout')) return 'marche';
  return 'debout';
}

// ── État persisté (localStorage) ───────────────────────────
const LS_KEYS = {
  USER:        'dosLibre_user',
  PROGRESSION: 'dosLibre_progression',
  JOURNAL:     'dosLibre_journal',
  NOTES:       'dosLibre_notes',
  FAVORIS:     'dosLibre_favoris',
  IMAGES:      'dosLibre_images',
};

const State = {
  user: null,
  progression: {},
  journal: [],
  notes: {},
  favoris: [],
  images: {},
  currentView: 'aujourd-hui',
  currentDay: 1,
  selectedLevel: 'normal',
  expandedAccordions: {},

  load() {
    try {
      this.user        = JSON.parse(localStorage.getItem(LS_KEYS.USER)) || null;
      this.progression = JSON.parse(localStorage.getItem(LS_KEYS.PROGRESSION)) || {};
      this.journal     = JSON.parse(localStorage.getItem(LS_KEYS.JOURNAL)) || [];
      this.notes       = JSON.parse(localStorage.getItem(LS_KEYS.NOTES)) || {};
      this.favoris     = JSON.parse(localStorage.getItem(LS_KEYS.FAVORIS)) || [];
      this.images      = JSON.parse(localStorage.getItem(LS_KEYS.IMAGES)) || {};
    } catch(e) {
      console.warn('Erreur chargement état', e);
    }
    if (this.user) {
      this.currentDay = this.calcCurrentDay();
      this.selectedLevel = this.user.niveauDefaut || 'normal';
    }
  },

  save(key) {
    const map = {
      user: [LS_KEYS.USER, this.user],
      progression: [LS_KEYS.PROGRESSION, this.progression],
      journal: [LS_KEYS.JOURNAL, this.journal],
      notes: [LS_KEYS.NOTES, this.notes],
      favoris: [LS_KEYS.FAVORIS, this.favoris],
      images: [LS_KEYS.IMAGES, this.images],
    };
    if (map[key]) {
      try { localStorage.setItem(map[key][0], JSON.stringify(map[key][1])); }
      catch(e) { console.warn('localStorage plein ?', e); }
    }
  },

  calcCurrentDay() {
    if (!this.user?.dateDebut) return 1;
    const start = new Date(this.user.dateDebut);
    start.setHours(0,0,0,0);
    const today = new Date();
    today.setHours(0,0,0,0);
    const diff = Math.floor((today - start) / 86400000) + 1;
    return Math.min(Math.max(diff, 1), 60);
  },

  getSeance(jour) {
    return SEANCES.find(s => s.jour === jour) || null;
  },

  countDone() {
    return Object.values(this.progression).filter(v => v.statut === 'complete').length;
  },

  isDone(jour) {
    return this.progression[jour]?.statut === 'complete';
  },
};

// ── Helpers ─────────────────────────────────────────────────
function el(id)   { return document.getElementById(id); }
function qs(s, p) { return (p || document).querySelector(s); }
function qsa(s,p) { return [...(p||document).querySelectorAll(s)]; }

function fmtDate(iso) {
  const d = new Date(iso);
  return d.toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' });
}

function phaseClass(phase) {
  return `phase-${phase}`;
}

function toast(msg, duration = 2500) {
  let t = el('toast');
  if (!t) {
    t = document.createElement('div');
    t.id = 'toast';
    t.className = 'toast';
    document.body.appendChild(t);
  }
  t.textContent = msg;
  t.classList.add('show');
  clearTimeout(t._timer);
  t._timer = setTimeout(() => t.classList.remove('show'), duration);
}

function confirm(title, desc, onOk) {
  const overlay = document.createElement('div');
  overlay.className = 'confirm-overlay';
  overlay.innerHTML = `
    <div class="confirm-box">
      <div class="confirm-title">${title}</div>
      <div class="confirm-desc">${desc}</div>
      <div class="confirm-actions">
        <button class="confirm-cancel">Annuler</button>
        <button class="confirm-ok">Confirmer</button>
      </div>
    </div>`;
  document.body.appendChild(overlay);
  qs('.confirm-cancel', overlay).onclick = () => overlay.remove();
  qs('.confirm-ok',     overlay).onclick = () => { overlay.remove(); onOk(); };
  overlay.onclick = e => { if (e.target === overlay) overlay.remove(); };
}

// ── Split text en étapes numérotées ─────────────────────────
function parseSteps(text) {
  // Si contient des numéros "1. 2. 3." → sépare
  if (/\d\.\s/.test(text)) {
    return text.split(/\d+\.\s+/).filter(Boolean).map(s => s.trim());
  }
  // Sinon sépare par ". " ou "\n"
  const parts = text.split(/\.\s+(?=[A-ZÀÉÈÊ])/);
  return parts.length > 1 ? parts.map(s => s.replace(/\.$/, '').trim()).filter(Boolean) : [text];
}

// ── Rendu principal ──────────────────────────────────────────
function render() {
  const root = el('root');
  if (!State.user) {
    root.innerHTML = renderOnboarding();
    bindOnboarding();
  } else {
    root.innerHTML = renderApp();
    bindApp();
    navigateTo(State.currentView);
  }
}

// ── Onboarding ───────────────────────────────────────────────
function renderOnboarding() {
  return `
  <div id="screen-onboarding">
    <div class="onboarding-logo">Les Vertébrées</div>
    <h1 class="onboarding-title">Dos<em>Libre</em></h1>
    <p class="onboarding-subtitle">Un programme en 3 phases pour rebouger sans douleur et sans peur.</p>

    <form class="onboarding-form" id="form-onboarding">
      <label for="ob-nom">Ton prénom</label>
      <input id="ob-nom" type="text" placeholder="Marie, Sophie, Stef…" autocomplete="given-name" required>

      <label for="ob-date">Date de début du programme</label>
      <input id="ob-date" type="date" value="${new Date().toISOString().slice(0,10)}" required>

      <div class="onboarding-level-label">Ton niveau habituel</div>
      <div class="level-pills">
        <div class="level-pill" data-level="facile">
          <div class="pill-dot"></div>
          <span>Facile</span>
        </div>
        <div class="level-pill selected" data-level="normal">
          <div class="pill-dot"></div>
          <span>Normal</span>
        </div>
        <div class="level-pill" data-level="energique">
          <div class="pill-dot"></div>
          <span>Énergique</span>
        </div>
      </div>

      <button type="submit" class="btn-start">Commencer le programme →</button>
    </form>
  </div>`;
}

function bindOnboarding() {
  let selectedLevel = 'normal';
  qsa('.level-pill').forEach(pill => {
    pill.onclick = () => {
      qsa('.level-pill').forEach(p => p.classList.remove('selected'));
      pill.classList.add('selected');
      selectedLevel = pill.dataset.level;
    };
  });
  el('form-onboarding').onsubmit = e => {
    e.preventDefault();
    const nom  = el('ob-nom').value.trim() || 'toi';
    const date = el('ob-date').value;
    State.user = { nom, dateDebut: date, niveauDefaut: selectedLevel };
    State.save('user');
    State.currentDay = State.calcCurrentDay();
    State.selectedLevel = selectedLevel;
    render();
  };
}

// ── Shell App ────────────────────────────────────────────────
function renderApp() {
  return `
  <div id="screen-app">
    <header class="app-header">
      <span class="header-brand">Les Vertébrées</span>
      <span class="header-day-badge badge-${State.getSeance(State.currentDay)?.phase || 1}" id="header-badge">
        Jour ${State.currentDay} / 60
      </span>
    </header>

    <main class="main-content" id="main-content">
      <!-- Injecté par navigateTo() -->
    </main>

    <nav class="bottom-nav">
      ${[
        { id: 'aujourd-hui', label: "Aujourd'hui", icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>` },
        { id: 'programme',   label: 'Programme',   icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>` },
        { id: 'journal',     label: 'Journal',     icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M2 3h6a4 4 0 014 4v14a3 3 0 00-3-3H2z"/><path d="M22 3h-6a4 4 0 00-4 4v14a3 3 0 013-3h7z"/></svg>` },
        { id: 'routine',     label: "Routine d'Or", icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>` },
        { id: 'reglages',    label: 'Réglages',    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"/></svg>` },
      ].map(tab => `
        <button class="nav-btn" data-view="${tab.id}" id="nav-${tab.id}">
          <div class="nav-icon-wrap">${tab.icon}</div>
          <span>${tab.label}</span>
        </button>
      `).join('')}
    </nav>
  </div>`;
}

function bindApp() {
  qsa('.nav-btn').forEach(btn => {
    btn.onclick = () => navigateTo(btn.dataset.view);
  });
}

function navigateTo(viewId, dayOverride) {
  State.currentView = viewId;
  if (dayOverride) State.currentDay = dayOverride;
  qsa('.nav-btn').forEach(b => b.classList.toggle('active', b.dataset.view === viewId));
  const main = el('main-content');
  main.innerHTML = '';
  const views = {
    'aujourd-hui': renderViewAujourdhui,
    'programme':   renderViewProgramme,
    'journal':     renderViewJournal,
    'routine':     renderViewRoutine,
    'reglages':    renderViewReglages,
  };
  if (views[viewId]) {
    main.innerHTML = views[viewId]();
    bindView(viewId);
  }
  // Update badge
  const badge = el('header-badge');
  if (badge) {
    const s = State.getSeance(State.currentDay);
    badge.className = `header-day-badge badge-${s?.phase || 1}`;
    badge.textContent = `Jour ${State.currentDay} / 60`;
  }
  window.scrollTo(0, 0);
}

// ── Vue : Aujourd'hui ────────────────────────────────────────
function renderViewAujourdhui() {
  const seance = State.getSeance(State.currentDay);
  if (!seance) return '<p style="padding:24px">Séance introuvable.</p>';
  const phase = PHASES[seance.phase - 1];
  const done  = State.isDone(State.currentDay);
  const nom   = State.user?.nom || '';

  // Progress bar
  const pct = Math.round((State.countDone() / 60) * 100);

  let html = `
    <!-- Phase banner -->
    <div class="phase-banner phase-${seance.phase} fade-in">
      <div class="banner-phase-label">Phase ${seance.phase} · ${phase.nom}</div>
      <h1 class="banner-title">${seance.titre}</h1>
      <div class="banner-divider"></div>
      <p class="banner-desc">${nom ? `Bonjour ${nom} — ` : ''}${seance.sousTitre}</p>
    </div>

    <!-- Progress -->
    <div class="progress-bar-wrap" style="padding-top:14px">
      <div class="progress-bar-header">
        <span>${State.countDone()} jour${State.countDone()>1?'s':''} complétés</span>
        <span>${pct}%</span>
      </div>
      <div class="progress-bar-track">
        <div class="progress-bar-fill p${seance.phase}-fill" style="width:${pct}%"></div>
      </div>
    </div>`;

  if (seance.estRepos) {
    html += renderRepos(seance);
  } else {
    html += renderSeanceActive(seance, done);
  }
  return html;
}

function renderRepos(seance) {
  const phase = PHASES[seance.phase - 1];
  return `
    <div class="repos-card phase-${seance.phase}" style="margin:16px;border-radius:22px;padding:36px 24px;text-align:center;color:${seance.phase===1?'#e8f3e4':seance.phase===2?'#f5e6d8':'#d4eef0'}">
      <div class="repos-icon">🛌</div>
      <h2 class="repos-title">Repos actif</h2>
      <p class="repos-desc">Le corps reconstruit pendant le repos.<br>Ce n'est pas de la paresse.</p>
      ${seance.citation ? `<blockquote style="font-family:'Playfair Display',serif;font-style:italic;font-size:14px;opacity:0.7;margin-bottom:24px">"${seance.citation}"</blockquote>` : ''}
      <button class="btn-complete phase-${seance.phase}-btn" id="btn-complete-repos" style="pointer-events:all;max-width:280px;margin:0 auto">
        ${State.isDone(seance.jour) ? '✓ Repos noté' : 'Marquer ce repos'}
      </button>
    </div>
    <div style="padding:0 16px 16px">
      <p style="font-size:13px;color:var(--text-light);text-align:center;margin-bottom:12px">Profites-en pour remplir ton journal du corps 👇</p>
      <button class="settings-btn secondary" onclick="navigateTo('journal')" style="font-size:14px">
        Ouvrir le Journal du corps
      </button>
    </div>`;
}

function renderSeanceActive(seance, done) {
  const lv = State.selectedLevel;
  const duree = seance.duree?.[lv] || seance.duree?.normal || '–';
  const materiels = seance.materiel?.join(' · ') || '';

  let html = `
    <!-- Meta chips -->
    <div class="session-meta">
      <div class="meta-chip">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
        ${duree} min
      </div>
      ${materiels ? `<div class="meta-chip">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"/></svg>
        ${materiels}
      </div>` : ''}
      <div class="meta-chip">Phase ${seance.phase} · S${seance.semaine}</div>
    </div>

    <!-- Level selector -->
    <div class="level-selector">
      <div class="level-selector-title">Ton niveau aujourd'hui</div>
      <div class="level-buttons">
        ${['facile','normal','energique'].map(lvl => `
          <button class="level-btn ${lv===lvl?'active':''}" data-level="${lvl}">
            <div class="dot"></div>
            <div class="level-duration">${seance.duree?.[lvl] || '–'} min</div>
            <span>${lvl==='facile'?'Facile':lvl==='normal'?'Normal':'Énergique'}</span>
          </button>
        `).join('')}
      </div>
    </div>

    ${seance.citation ? `
    <div class="citation-block fade-in">
      <p class="citation-text">"${seance.citation}"</p>
    </div>` : ''}

    ${seance.isBilan ? `
    <div class="bilan-banner">
      <div class="bilan-emoji">${seance.isGrandJour ? '🎉' : '🌟'}</div>
      <div class="bilan-title">${seance.isGrandJour ? 'Le Grand Jour !' : seance.jour===30 ? 'Mi-programme !' : 'Bilan de phase'}</div>
      <div class="bilan-sub">${seance.isGrandJour ? 'Tu es une Vertébrée.' : seance.jour===30 ? '30 jours. Sois fière de toi.' : 'Observe ta progression.'}</div>
    </div>` : ''}

    <!-- Exercises -->
    <div class="exercises-section">
      <div class="exercises-section-title">${seance.exercices.length} exercice${seance.exercices.length>1?'s':''}</div>
      ${seance.exercices.map((ex, i) => renderExerciseCard(ex, seance, i)).join('')}
    </div>

    <!-- Complete button -->
    <div class="complete-section">
      <button class="btn-complete phase-${seance.phase}-btn ${done?'done':''}" id="btn-complete">
        ${done ? '✓ Séance complétée !' : 'Marquer la séance comme faite'}
      </button>
    </div>`;

  return html;
}

function renderExerciseCard(ex, seance, idx) {
  const lv = State.selectedLevel;
  const poseKey = detectPose(ex.position);
  const phaseSuffix = `phase-${seance.phase}`;
  const svgContent = POSES[poseKey] || POSES['debout'];
  const exKey = `${seance.jour}_${idx}`;
  const customImg = State.images[exKey];
  const isFav = State.favoris.includes(ex.nom);
  const savedNote = State.notes[ex.nom] || '';

  // Parse detailed steps
  const steps = parseSteps(ex.description);
  const levelInstr = ex.niveaux?.[lv] || ex.niveaux?.normal || '';
  const levelSteps = parseSteps(levelInstr);

  return `
  <div class="exercise-card" id="ex-card-${exKey}">
    <!-- Illustration -->
    <div class="exercise-illustration ${phaseSuffix}-ill" id="ill-${exKey}">
      ${customImg
        ? `<img class="illustration-custom-img" src="${customImg}" alt="${ex.nom}">
           <button class="illustration-remove-btn" onclick="removeImage('${exKey}')">✕</button>`
        : `<svg class="illustration-svg ${phaseSuffix}-svg" viewBox="${svgContent.match(/viewBox="([^"]+)"/)?.[1] || '0 0 200 100'}"
             xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor"
             stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              ${svgContent.replace(/<svg[^>]*>/,'').replace('</svg>','')}
           </svg>`
      }
      <span class="illustration-label">${ex.position || ''}</span>
      <label class="illustration-upload-btn" for="upload-${exKey}">
        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
        Ma photo
      </label>
      <input type="file" accept="image/*" class="file-input-hidden" id="upload-${exKey}" data-exkey="${exKey}">
    </div>

    <div class="exercise-body">
      <!-- Header -->
      <div class="exercise-header">
        <div class="exercise-name">${ex.nom}</div>
        <div class="exercise-duration">${ex.duree}</div>
      </div>
      <div class="exercise-position">📍 ${ex.position}</div>

      <!-- Étapes de l'exercice (description) -->
      <div class="exercise-instructions">
        <div class="instructions-label instr-base">
          <span style="font-size:12px;color:var(--text-medium);font-weight:500;">Comment faire</span>
        </div>
        <ol class="instruction-steps" style="list-style:none">
          ${steps.map((step, si) => `
            <li>
              <span class="step-number">${si+1}</span>
              <span>${step}</span>
            </li>`).join('')}
        </ol>
      </div>

      <!-- Instructions par niveau -->
      <div class="exercise-instructions">
        <div class="instructions-label instr-${lv}" style="margin-top:10px">
          <span class="dot ${lv}"></span>
          <span style="color:var(--${lv === 'facile' ? 'vert' : lv === 'normal' ? 'jaune' : 'bleu'})">
            ${lv === 'facile' ? '🟢 Ton niveau aujourd\'hui' : lv === 'normal' ? '🟡 Ton niveau aujourd\'hui' : '🔵 Ton niveau aujourd\'hui'}
          </span>
        </div>
        <ol class="instruction-steps instr-${lv}">
          ${levelSteps.map((step, si) => `
            <li>
              <span class="step-number">${si+1}</span>
              <span>${step}</span>
            </li>`).join('')}
        </ol>
      </div>

      <!-- Pourquoi (accordion) -->
      ${ex.pourquoi ? `
      <button class="accordion-toggle" data-acc="pourquoi-${exKey}">
        <span class="acc-label">💡 Pourquoi cet exercice ?</span>
        <span class="acc-icon">▼</span>
      </button>
      <div class="accordion-content hidden" id="acc-pourquoi-${exKey}">
        ${ex.pourquoi}
      </div>` : ''}

      <!-- Note / Interdit -->
      ${ex.note ? `<p style="font-size:12.5px;color:var(--text-medium);font-style:italic;padding:8px 0;border-top:1px solid var(--cream-dark)">ℹ️ ${ex.note}</p>` : ''}
      ${ex.interdit ? `<div class="interdit-section">🚫 Interdit : ${ex.interdit}</div>` : ''}
      ${ex.stopSi ? `<div class="stop-section"><div class="stop-dot"></div><span>Stop immédiat si : ${ex.stopSi}</span></div>` : ''}

      <!-- Favoris -->
      <button class="fav-toggle ${isFav ? 'active' : ''}" data-nom="${ex.nom}">
        <span class="fav-heart">${isFav ? '❤️' : '🤍'}</span>
        <span>${isFav ? 'Dans mes favoris' : 'Ajouter aux favoris'}</span>
      </button>

      <!-- Notes personnelles -->
      <div class="personal-notes">
        <div class="notes-label">📝 Mes notes</div>
        <textarea class="notes-textarea" placeholder="Ressenti, adaptation, observation…" data-nom="${ex.nom}">${savedNote}</textarea>
      </div>
    </div>
  </div>`;
}

// ── Vue : Programme ──────────────────────────────────────────
function renderViewProgramme() {
  const pct = Math.round((State.countDone() / 60) * 100);
  let html = `
  <div class="view-header fade-in">
    <h1 class="view-title">Programme 60 jours</h1>
    <p class="view-subtitle">${State.countDone()} / 60 séances complétées</p>
  </div>

  <div class="progress-bar-wrap" style="padding-top:14px;padding-bottom:8px">
    <div class="progress-bar-track"><div class="progress-bar-fill p1-fill" style="width:${pct}%"></div></div>
  </div>

  <!-- Phase labels -->
  <div style="display:flex;gap:8px;padding:8px 16px 4px;flex-wrap:wrap">
    ${PHASES.map(p => `
      <div style="display:flex;align-items:center;gap:5px;font-size:11px;color:var(--text-medium)">
        <div style="width:10px;height:10px;border-radius:50%;background:var(--phase${p.id}-badge)"></div>
        Phase ${p.id} — ${p.nom} (J${p.jours})
      </div>`).join('')}
    <div style="display:flex;align-items:center;gap:5px;font-size:11px;color:var(--text-light)">
      <div style="width:10px;height:10px;border-radius:50%;background:var(--cream-dark)"></div>
      Repos
    </div>
  </div>

  <div class="programme-grid">
    ${SEANCES.map(s => {
      const done    = State.isDone(s.jour);
      const today   = s.jour === State.currentDay;
      const repos   = s.estRepos;
      const classes = [
        `day-circle`,
        `p${s.phase}`,
        repos   ? 'repos'   : '',
        done    ? 'done'    : '',
        today   ? 'today'   : 'future',
        s.isBilan ? 'bilan' : '',
      ].filter(Boolean).join(' ');
      return `<div class="${classes}" data-jour="${s.jour}" title="${repos ? 'Repos' : s.titre}">
        ${repos ? 'R' : s.jour}
        ${s.isBilan ? '<span style="position:absolute;top:-2px;right:-2px;font-size:8px">★</span>' : ''}
      </div>`;
    }).join('')}
  </div>

  <div style="padding:8px 16px 24px;font-size:12px;color:var(--text-light);text-align:center">
    Appuie sur un jour pour y accéder
  </div>`;
  return html;
}

// ── Vue : Journal ────────────────────────────────────────────
function renderViewJournal() {
  const today = new Date().toISOString().slice(0,10);
  const seance = State.getSeance(State.currentDay);
  const semaine = seance?.semaine || 1;

  return `
  <div class="phase-banner phase-1 fade-in" style="padding:20px">
    <div class="banner-phase-label">Suivi personnel</div>
    <h1 class="banner-title" style="font-size:28px">Journal du corps</h1>
    <div class="banner-divider"></div>
    <p class="banner-desc" style="font-size:12px">Ces données sont ta boussole.</p>
  </div>

  <div class="journal-form-card fade-in">
    <h2 class="journal-form-title">Aujourd'hui</h2>
    <p class="journal-form-subtitle">Semaine ${semaine} · Jour ${State.currentDay}</p>

    <div class="score-input-group">
      <label class="score-label">Douleur /10 <span style="color:var(--text-light);font-weight:400">(0 = aucune)</span></label>
      <div class="score-dots" id="score-douleur">
        ${Array.from({length:11},(_,i) => `<div class="score-dot" data-val="${i}">${i}</div>`).join('')}
      </div>
    </div>

    <div class="score-input-group">
      <label class="score-label">Énergie /10 <span style="color:var(--text-light);font-weight:400">(10 = top)</span></label>
      <div class="score-dots" id="score-energie">
        ${Array.from({length:11},(_,i) => `<div class="score-dot" data-val="${i}">${i}</div>`).join('')}
      </div>
    </div>

    <div class="journal-field">
      <label>La séance que j'ai préférée</label>
      <textarea id="jf-seance" placeholder="Ex : Bird-Dog, marche du Jour 5…"></textarea>
    </div>
    <div class="journal-field">
      <label>Une chose que mon corps m'a dite</label>
      <textarea id="jf-message" placeholder="Ex : j'ai moins de tensions dans le bas du dos…"></textarea>
    </div>
    <div class="journal-field">
      <label>Ce que je veux améliorer</label>
      <textarea id="jf-ameliorer" placeholder="Ex : tenir plus longtemps en planche…"></textarea>
    </div>

    <button class="btn-journal-save" id="btn-save-journal">Enregistrer cette entrée</button>
  </div>

  <div class="journal-history">
    <div class="history-title">${State.journal.length} entrées enregistrées</div>
    ${State.journal.length === 0
      ? '<p style="font-size:13px;color:var(--text-light);text-align:center;padding:16px">Aucune entrée pour l\'instant.<br>Commence à remplir ton journal !</p>'
      : State.journal.slice().reverse().map(e => `
        <div class="journal-entry">
          <div class="entry-date">Jour ${e.jour} · ${fmtDate(e.date)}</div>
          <div class="entry-scores">
            <div class="entry-score">Douleur : <span>${e.douleur !== null ? e.douleur : '–'}/10</span></div>
            <div class="entry-score">Énergie : <span>${e.energie !== null ? e.energie : '–'}/10</span></div>
          </div>
          ${e.message ? `<div class="entry-text">"${e.message}"</div>` : ''}
        </div>`).join('')}
  </div>`;
}

// ── Vue : Routine d'Or ───────────────────────────────────────
function renderViewRoutine() {
  return `
  <div class="routine-header fade-in">
    <div class="routine-badge">À garder à vie · ☀️</div>
    <h1 class="routine-title">La Routine d'Or</h1>
    <p class="routine-subtitle">10 minutes chaque matin. Cette routine faite chaque jour = colonne protégée à vie.</p>
    <div class="routine-total">Total : 10 min</div>
  </div>

  <div class="routine-steps">
    ${ROUTINE_OR.map(s => `
      <div class="routine-step fade-in">
        <div class="step-num">${s.ordre}</div>
        <div class="step-info">
          <div class="step-name">${s.nom}</div>
          <div class="step-desc">${s.description}</div>
        </div>
        <div class="step-dur">${s.duree}</div>
      </div>`).join('')}
  </div>

  <div style="margin:0 16px 16px;background:var(--phase1-light);border-radius:var(--radius-md);padding:16px;font-size:13px;color:var(--phase1-badge);line-height:1.65">
    <strong>La liberté :</strong> quand le bon mouvement devient automatique.<br>
    Cette routine est intégrée à la Phase 3 — mais tu peux la faire dès maintenant.
  </div>`;
}

// ── Vue : Réglages ───────────────────────────────────────────
function renderViewReglages() {
  const u = State.user || {};
  return `
  <div class="view-header fade-in" style="padding-bottom:16px">
    <h1 class="view-title">Réglages</h1>
    <p class="view-subtitle">Personnalise ton programme</p>
  </div>

  <!-- Profil -->
  <div class="settings-section fade-in">
    <div class="settings-section-title">Mon profil</div>
    <div class="settings-field">
      <label>Prénom</label>
      <input type="text" id="cfg-nom" value="${u.nom || ''}">
    </div>
    <div class="settings-field">
      <label>Date de début du programme</label>
      <input type="date" id="cfg-date" value="${u.dateDebut || ''}">
      <p class="settings-info">Modifie pour recalculer ton jour actuel (utile après une pause).</p>
    </div>
    <div class="settings-field">
      <label>Niveau par défaut</label>
      <select id="cfg-niveau">
        <option value="facile"    ${u.niveauDefaut==='facile'   ?'selected':''}>🟢 Facile</option>
        <option value="normal"    ${u.niveauDefaut==='normal'   ?'selected':''}>🟡 Normal</option>
        <option value="energique" ${u.niveauDefaut==='energique'?'selected':''}>🔵 Énergique</option>
      </select>
    </div>
    <button class="settings-btn primary" id="btn-save-profile">Enregistrer le profil</button>
  </div>

  <!-- Navigation directe -->
  <div class="settings-section fade-in">
    <div class="settings-section-title">Naviguer vers un jour</div>
    <div style="display:flex;gap:8px">
      <input type="number" id="cfg-goto-day" min="1" max="60" placeholder="1–60" style="flex:1;border:1.5px solid var(--cream-dark);border-radius:var(--radius-sm);padding:11px 14px;font-size:14px;background:var(--cream)">
      <button class="settings-btn primary" id="btn-goto-day" style="flex:0 0 auto;width:auto;padding:11px 18px">Aller</button>
    </div>
    <p class="settings-info">Accède directement à une séance précise.</p>
  </div>

  <!-- Statistiques -->
  <div class="settings-section fade-in">
    <div class="settings-section-title">Ma progression</div>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px">
      ${[
        { label: 'Jours complétés', val: `${State.countDone()} / 60` },
        { label: 'Jour actuel',     val: `Jour ${State.currentDay}` },
        { label: 'Entrées journal', val: State.journal.length },
        { label: 'Favoris',         val: State.favoris.length },
      ].map(s => `
        <div style="background:var(--cream);border-radius:var(--radius-sm);padding:14px;text-align:center">
          <div style="font-size:22px;font-weight:700;font-family:'Playfair Display',serif">${s.val}</div>
          <div style="font-size:11px;color:var(--text-light);margin-top:2px">${s.label}</div>
        </div>`).join('')}
    </div>
  </div>

  <!-- Export / Import -->
  <div class="settings-section fade-in">
    <div class="settings-section-title">Sauvegarde</div>
    <button class="settings-btn secondary" id="btn-export">⬇ Exporter ma progression (JSON)</button>
    <p class="settings-info">Sauvegarde tes données sur ton appareil.</p>
    <label class="settings-btn secondary" style="display:block;text-align:center;cursor:pointer;margin-top:10px" for="import-file">
      ⬆ Importer une sauvegarde
    </label>
    <input type="file" accept=".json" class="file-input-hidden" id="import-file">
  </div>

  <!-- Reset -->
  <div class="settings-section fade-in">
    <div class="settings-section-title">Zone de danger</div>
    <button class="settings-btn danger" id="btn-reset">Réinitialiser toute la progression</button>
    <p class="settings-info">Efface tous les jours complétés et les entrées du journal. Irréversible.</p>
  </div>

  <div style="height:32px"></div>`;
}

// ── Bind par vue ─────────────────────────────────────────────
function bindView(viewId) {
  if (viewId === 'aujourd-hui') bindViewAujourdhui();
  if (viewId === 'programme')   bindViewProgramme();
  if (viewId === 'journal')     bindViewJournal();
  if (viewId === 'reglages')    bindViewReglages();
}

function bindViewAujourdhui() {
  // Level buttons
  qsa('.level-btn').forEach(btn => {
    btn.onclick = () => {
      State.selectedLevel = btn.dataset.level;
      if (State.user) {
        State.user.niveauDefaut = State.selectedLevel;
        State.save('user');
      }
      navigateTo('aujourd-hui');
    };
  });

  // Complete button
  const btnComplete = el('btn-complete');
  if (btnComplete) {
    btnComplete.onclick = () => {
      const seance = State.getSeance(State.currentDay);
      if (!seance) return;
      if (State.isDone(State.currentDay)) {
        toast('Séance déjà marquée ✓');
        return;
      }
      State.progression[State.currentDay] = {
        statut: 'complete',
        niveau: State.selectedLevel,
        date: new Date().toISOString().slice(0,10),
      };
      State.save('progression');
      btnComplete.textContent = '✓ Séance complétée !';
      btnComplete.classList.add('done');
      toast('Super ! Séance du jour complétée 🎉');
    };
  }

  // Complete repos
  const btnRepos = el('btn-complete-repos');
  if (btnRepos) {
    btnRepos.onclick = () => {
      if (State.isDone(State.currentDay)) return;
      State.progression[State.currentDay] = { statut: 'complete', niveau: 'normal', date: new Date().toISOString().slice(0,10) };
      State.save('progression');
      btnRepos.textContent = '✓ Repos noté';
      toast('Repos bien mérité ! 🛌');
    };
  }

  // Accordions (pourquoi)
  qsa('.accordion-toggle').forEach(btn => {
    btn.onclick = () => {
      const id  = btn.dataset.acc;
      const pnl = el(`acc-${id}`);
      if (!pnl) return;
      const open = !pnl.classList.contains('hidden');
      pnl.classList.toggle('hidden', open);
      btn.classList.toggle('open', !open);
    };
  });

  // Notes textarea (auto-save)
  qsa('.notes-textarea').forEach(ta => {
    ta.oninput = () => {
      State.notes[ta.dataset.nom] = ta.value;
      State.save('notes');
    };
  });

  // Favoris toggle
  qsa('.fav-toggle').forEach(btn => {
    btn.onclick = () => {
      const nom = btn.dataset.nom;
      const idx = State.favoris.indexOf(nom);
      if (idx === -1) {
        State.favoris.push(nom);
        btn.classList.add('active');
        btn.querySelector('.fav-heart').textContent = '❤️';
        btn.querySelector('span:last-child').textContent = 'Dans mes favoris';
        toast('Ajouté aux favoris ❤️');
      } else {
        State.favoris.splice(idx, 1);
        btn.classList.remove('active');
        btn.querySelector('.fav-heart').textContent = '🤍';
        btn.querySelector('span:last-child').textContent = 'Ajouter aux favoris';
        toast('Retiré des favoris');
      }
      State.save('favoris');
    };
  });

  // Image upload
  qsa('input[type="file"][data-exkey]').forEach(input => {
    input.onchange = e => {
      const file = e.target.files?.[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = ev => {
        const exKey = input.dataset.exkey;
        State.images[exKey] = ev.target.result;
        State.save('images');
        // Refresh illustration zone
        const ill = el(`ill-${exKey}`);
        if (ill) {
          ill.innerHTML = `
            <img class="illustration-custom-img" src="${ev.target.result}" alt="Exercice">
            <button class="illustration-remove-btn" onclick="removeImage('${exKey}')">✕</button>
            <span class="illustration-label" style="bottom:8px;left:12px"></span>`;
        }
        toast('Photo ajoutée !');
      };
      reader.readAsDataURL(file);
    };
  });
}

function bindViewProgramme() {
  qsa('.day-circle').forEach(circle => {
    circle.onclick = () => {
      const jour = parseInt(circle.dataset.jour);
      if (jour >= 1 && jour <= 60) {
        State.currentDay = jour;
        navigateTo('aujourd-hui');
      }
    };
  });
}

function bindViewJournal() {
  let douleur = null, energie = null;

  // Score pickers
  qsa('#score-douleur .score-dot').forEach(dot => {
    dot.onclick = () => {
      qsa('#score-douleur .score-dot').forEach(d => d.classList.remove('selected'));
      dot.classList.add('selected');
      douleur = parseInt(dot.dataset.val);
    };
  });
  qsa('#score-energie .score-dot').forEach(dot => {
    dot.onclick = () => {
      qsa('#score-energie .score-dot').forEach(d => d.classList.remove('selected'));
      dot.classList.add('selected');
      energie = parseInt(dot.dataset.val);
    };
  });

  // Save journal
  const btn = el('btn-save-journal');
  if (btn) {
    btn.onclick = () => {
      const entry = {
        jour: State.currentDay,
        date: new Date().toISOString().slice(0,10),
        douleur,
        energie,
        seancePref: el('jf-seance')?.value.trim() || '',
        message:    el('jf-message')?.value.trim() || '',
        ameliorer:  el('jf-ameliorer')?.value.trim() || '',
      };
      State.journal.push(entry);
      State.save('journal');
      toast('Entrée enregistrée 📓');
      navigateTo('journal');
    };
  }
}

function bindViewReglages() {
  // Save profile
  el('btn-save-profile')?.addEventListener('click', () => {
    const nom   = el('cfg-nom')?.value.trim() || State.user.nom;
    const date  = el('cfg-date')?.value || State.user.dateDebut;
    const nivel = el('cfg-niveau')?.value || State.user.niveauDefaut;
    State.user = { ...State.user, nom, dateDebut: date, niveauDefaut: nivel };
    State.save('user');
    State.currentDay = State.calcCurrentDay();
    State.selectedLevel = nivel;
    toast('Profil mis à jour ✓');
    navigateTo('reglages');
  });

  // Go to day
  el('btn-goto-day')?.addEventListener('click', () => {
    const day = parseInt(el('cfg-goto-day')?.value);
    if (day >= 1 && day <= 60) {
      State.currentDay = day;
      navigateTo('aujourd-hui');
    } else {
      toast('Entre un jour entre 1 et 60');
    }
  });

  // Export
  el('btn-export')?.addEventListener('click', () => {
    const data = {
      version: '1.0',
      exportDate: new Date().toISOString(),
      user: State.user,
      progression: State.progression,
      journal: State.journal,
      notes: State.notes,
      favoris: State.favoris,
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `dos-libre-${new Date().toISOString().slice(0,10)}.json`;
    a.click();
    toast('Sauvegarde exportée ✓');
  });

  // Import
  el('import-file')?.addEventListener('change', e => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = ev => {
      try {
        const data = JSON.parse(ev.target.result);
        if (data.user)        { State.user = data.user; State.save('user'); }
        if (data.progression) { State.progression = data.progression; State.save('progression'); }
        if (data.journal)     { State.journal = data.journal; State.save('journal'); }
        if (data.notes)       { State.notes = data.notes; State.save('notes'); }
        if (data.favoris)     { State.favoris = data.favoris; State.save('favoris'); }
        State.currentDay = State.calcCurrentDay();
        toast('Sauvegarde importée ✓');
        render();
      } catch {
        toast('Fichier invalide');
      }
    };
    reader.readAsText(file);
  });

  // Reset
  el('btn-reset')?.addEventListener('click', () => {
    confirm(
      'Réinitialiser la progression ?',
      'Tous tes jours complétés et les entrées du journal seront effacés. Ton profil est conservé.',
      () => {
        State.progression = {};
        State.journal = [];
        State.notes = {};
        State.favoris = {};
        State.images = {};
        ['progression','journal','notes','favoris','images'].forEach(k => State.save(k));
        toast('Progression réinitialisée');
        navigateTo('reglages');
      }
    );
  });
}

// ── Fonction globale (appelée depuis inline HTML) ────────────
window.removeImage = function(exKey) {
  delete State.images[exKey];
  State.save('images');
  navigateTo('aujourd-hui');
};

// ── Point d'entrée ───────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  State.load();
  render();
});
