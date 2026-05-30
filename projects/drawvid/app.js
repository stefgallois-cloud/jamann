/* ═══════════════════════════════════════════════════════════════
   DrawVid v2 – Application Logic
   ═══════════════════════════════════════════════════════════════ */

// ── SUBJECTS (what user wants to draw) ──────────────────────────
const SUBJECTS = [
  { id: 'visage',       name: 'Visages',       icon: '👤', emoji: '😊' },
  { id: 'portrait',     name: 'Portraits',     icon: '🎭', emoji: '🖼️' },
  { id: 'anatomie',     name: 'Anatomie',      icon: '💪', emoji: '🦴' },
  { id: 'animaux',      name: 'Animaux',       icon: '🐾', emoji: '🦁' },
  { id: 'nature',       name: 'Paysages',      icon: '🌿', emoji: '🏞️' },
  { id: 'architecture', name: 'Architecture',  icon: '🏛️', emoji: '🏗️' },
  { id: 'manga',        name: 'Manga',         icon: '✨', emoji: '⚡' },
  { id: 'formes',       name: 'Formes',        icon: '🔷', emoji: '📐' },
  { id: 'technique',    name: 'Techniques',    icon: '🎯', emoji: '✏️' },
  { id: 'numerique',    name: 'Art Digital',   icon: '💻', emoji: '🖥️' },
  { id: 'figure',       name: 'Personnages',   icon: '🧑‍🎨', emoji: '🏃' },
  { id: 'perspective',  name: 'Perspective',   icon: '📐', emoji: '🔲' },
];

// ── TUTORIALS ───────────────────────────────────────────────────
const TUTORIALS = [
  // DÉBUTANT
  { id:0,  title:"Dessiner un visage simple",          desc:"Apprenez les proportions de base du visage humain étape par étape. Un tutoriel accessible à tous.",                               level:"debutant",      duration:"12:34", xp:50,  ytId:"2lS6f5Ix5_c", subject:"visage",       thumbIcon:"😊" },
  { id:1,  title:"Les formes géométriques de base",    desc:"Maîtrisez les fondamentaux : cercles, cubes, cylindres en 3 dimensions pour tout dessiner.",                                     level:"debutant",      duration:"8:22",  xp:30,  ytId:"ewMksAbgZBo", subject:"formes",       thumbIcon:"📐" },
  { id:2,  title:"Tenir son crayon correctement",       desc:"Découvrez les différentes prises en main du crayon pour un tracé fluide et contrôlé.",                                           level:"debutant",      duration:"5:14",  xp:20,  ytId:"pMC0Cx3Uk84", subject:"technique",    thumbIcon:"✏️" },
  { id:3,  title:"Dessiner des arbres et paysages",     desc:"Créez de beaux paysages naturels en apprenant à dessiner arbres, montagnes et ciels.",                                           level:"debutant",      duration:"15:08", xp:50,  ytId:"7TXEZ4tP06c", subject:"nature",       thumbIcon:"🌳" },
  { id:4,  title:"Dessiner un chat kawaii",              desc:"Apprenez à dessiner des animaux mignons avec ce tutoriel facile et amusant.",                                                    level:"debutant",      duration:"7:45",  xp:30,  ytId:"qcR7uNvgkzQ", subject:"animaux",      thumbIcon:"🐱" },
  { id:5,  title:"Les bases du manga",                  desc:"Introduction au style manga : yeux, cheveux, expressions et proportions de personnages.",                                        level:"debutant",      duration:"14:20", xp:50,  ytId:"IyMBqdnriXE", subject:"manga",        thumbIcon:"✨" },
  // INTERMÉDIAIRE
  { id:6,  title:"Portrait réaliste au crayon",          desc:"Techniques avancées pour dessiner des portraits expressifs avec des détails réalistes.",                                         level:"intermediaire", duration:"25:46", xp:100, ytId:"3wMzahTtzfM", subject:"portrait",     thumbIcon:"🎨" },
  { id:7,  title:"Anatomie du corps humain",             desc:"Comprenez les proportions et la structure musculaire pour des figures dynamiques et crédibles.",                                 level:"intermediaire", duration:"32:18", xp:120, ytId:"r5tefFLwzkE", subject:"anatomie",     thumbIcon:"💪" },
  { id:8,  title:"Ombrages et effets de lumière",        desc:"Créez du volume, de la profondeur et de l'atmosphère avec les techniques d'ombrage avancées.",                                  level:"intermediaire", duration:"18:55", xp:80,  ytId:"V3WmrWUEIJo", subject:"technique",    thumbIcon:"🌓" },
  { id:9,  title:"Dessin de mains réalistes",            desc:"La partie la plus complexe du dessin de figure : apprenez à maîtriser les mains sous tous les angles.",                         level:"intermediaire", duration:"22:40", xp:90,  ytId:"2CmrMRXoA8Q", subject:"anatomie",     thumbIcon:"✋" },
  { id:10, title:"Perspective à 2 points de fuite",     desc:"Maîtrisez la perspective architecturale avec deux points de fuite pour des bâtiments réalistes.",                                level:"intermediaire", duration:"20:10", xp:90,  ytId:"J5lLJfKR2KQ", subject:"perspective",  thumbIcon:"🏠" },
  { id:11, title:"Dessiner des animaux réalistes",      desc:"Anatomie et techniques pour capturer la beauté et le mouvement des animaux.",                                                    level:"intermediaire", duration:"28:30", xp:100, ytId:"Rl0BB6MUEz0", subject:"animaux",      thumbIcon:"🦁" },
  // EXPERT
  { id:12, title:"Portrait hyper-réaliste",              desc:"Poussez vos limites avec des techniques professionnelles de rendu photo-réaliste.",                                              level:"expert",       duration:"45:20", xp:200, ytId:"dOiwOVczfMo", subject:"portrait",     thumbIcon:"👁️" },
  { id:13, title:"Perspective architecturale complexe",  desc:"Dessinez des scènes urbaines et architecturales avec une perspective professionnelle à 3 points.",                               level:"expert",       duration:"38:12", xp:180, ytId:"0vbGzPCeX3g", subject:"architecture", thumbIcon:"🏙️" },
  { id:14, title:"Art numérique professionnel",          desc:"Techniques avancées de peinture numérique pour créer des œuvres de qualité professionnelle.",                                    level:"expert",       duration:"52:30", xp:220, ytId:"sC6xFiCRZhM", subject:"numerique",    thumbIcon:"🖥️" },
  { id:15, title:"Personnages en mouvement",             desc:"Capturez le dynamisme, l'énergie et l'émotion dans vos personnages en pleine action.",                                          level:"expert",       duration:"41:05", xp:190, ytId:"s39sbTnmJ3g", subject:"figure",       thumbIcon:"🏃" },
  { id:16, title:"Manga avancé – Combat dynamique",     desc:"Dessinez des scènes de combat manga avec des poses dramatiques et des effets de vitesse.",                                       level:"expert",       duration:"35:40", xp:180, ytId:"bEHPMGFNxRw", subject:"manga",        thumbIcon:"⚔️" },
  { id:17, title:"Paysages atmosphériques",              desc:"Créez des paysages épiques avec brouillard, lumière volumétrique et profondeur atmosphérique.",                                  level:"expert",       duration:"44:15", xp:200, ytId:"ZVR73MHMwUo", subject:"nature",       thumbIcon:"🌅" },
];

// ── LEVELS ──────────────────────────────────────────────────────
const LEVELS = [
  { name:"Débutant",       emoji:"🌱", xpReq:0,    max:100 },
  { name:"Apprenti",       emoji:"✏️",  xpReq:100,  max:250 },
  { name:"Intermédiaire",  emoji:"🔥", xpReq:250,  max:500 },
  { name:"Avancé",         emoji:"⚡", xpReq:500,  max:900 },
  { name:"Expert",         emoji:"💎", xpReq:900,  max:1500 },
  { name:"Maître",         emoji:"👑", xpReq:1500, max:2500 },
  { name:"Légende",        emoji:"🌟", xpReq:2500, max:Infinity },
];

// ── BADGES ──────────────────────────────────────────────────────
const BADGES = [
  { id:"first_tut",    name:"Premier Pas",   icon:"🎯", desc:"Complétez 1 tutoriel",          cond:s=>s.done.length>=1 },
  { id:"five_tut",     name:"5 Tutoriels",   icon:"⭐", desc:"Complétez 5 tutoriels",         cond:s=>s.done.length>=5 },
  { id:"ten_tut",      name:"10 Tutoriels",  icon:"🏅", desc:"Complétez 10 tutoriels",        cond:s=>s.done.length>=10 },
  { id:"first_draw",   name:"Artiste",       icon:"🎨", desc:"Sauvegardez 1 dessin",          cond:s=>s.draws>=1 },
  { id:"five_draw",    name:"5 Dessins",     icon:"🖼️", desc:"Sauvegardez 5 dessins",         cond:s=>s.draws>=5 },
  { id:"xp100",        name:"100 XP",        icon:"💫", desc:"Gagnez 100 XP",                 cond:s=>s.xp>=100 },
  { id:"xp500",        name:"500 XP",        icon:"⚡", desc:"Gagnez 500 XP",                 cond:s=>s.xp>=500 },
  { id:"expert_tut",   name:"Expert",        icon:"🏆", desc:"Complétez un tuto expert",      cond:s=>s.done.some(id=>TUTORIALS.find(t=>t.id===id)?.level==='expert') },
  { id:"all_beg",      name:"Bases Solides", icon:"🌱", desc:"Tous les tutos débutant",       cond:s=>TUTORIALS.filter(t=>t.level==='debutant').every(t=>s.done.includes(t.id)) },
  { id:"lv5",          name:"Expert+",       icon:"💎", desc:"Niveau 5",                      cond:s=>getLv(s.xp).idx>=4 },
  { id:"streak3",      name:"3 Jours",       icon:"🔥", desc:"3 jours consécutifs",           cond:s=>s.streak>=3 },
  { id:"streak7",      name:"1 Semaine",     icon:"📅", desc:"7 jours consécutifs",           cond:s=>s.streak>=7 },
];

// ── STATE ───────────────────────────────────────────────────────
let S = { xp:0, done:[], draws:0, streak:1, lastDate:null, name:"Artiste", subjects:[], badges:[], cvBg:"#1a1a2e", onboarded:false };
let curPage='home', curFilter='all', curSubject='all', curLevel='all', curSearch='', modalTutId=null, vidCollapsed=false;

// Canvas globals
let cvCtx=null, drawing=false, tool='pencil', color='#a855f7', size=4, hist=[], histIdx=-1;

// ── STORAGE ─────────────────────────────────────────────────────
const save=()=>{ try{localStorage.setItem('dv2',JSON.stringify(S))}catch(e){} };
function load(){
  try{const d=localStorage.getItem('dv2');if(d){const p=JSON.parse(d);S={...S,...p}}}catch(e){}
  // streak
  const today=new Date().toDateString();
  if(!S.lastDate){S.streak=1}
  else{ const diff=Math.floor((new Date()-new Date(S.lastDate))/864e5); if(diff===1)S.streak++;else if(diff>1)S.streak=1; }
  S.lastDate=today; save();
}

// ── LEVEL UTILS ─────────────────────────────────────────────────
function getLv(xp){
  let i=LEVELS.length-1;
  for(let j=0;j<LEVELS.length;j++){if(xp<(LEVELS[j+1]?.xpReq??Infinity)){i=j;break}}
  return{...LEVELS[i],idx:i,num:i+1};
}
function lvPct(xp){const l=getLv(xp);const p=xp-l.xpReq;const n=l.max===Infinity?1:l.max-l.xpReq;return Math.min(100,Math.round(p/n*100))}
function lvLabel(l){return{debutant:'🌱 Débutant',intermediaire:'🔥 Intermédiaire',expert:'⚡ Expert'}[l]||l}

// ── THUMBNAIL ───────────────────────────────────────────────────
function thumbHTML(tut, cls=''){
  // Try YouTube thumbnail, fallback to beautiful gradient with icon
  const fb = `tf-${tut.subject}`;
  return `<div class="${cls}">
    <img src="https://img.youtube.com/vi/${tut.ytId}/mqdefault.jpg"
         alt="${tut.title}" loading="lazy"
         onerror="this.style.display='none';this.nextElementSibling.style.display='flex'"
         style="width:100%;height:100%;object-fit:cover"/>
    <div class="thumb-fallback ${fb}" style="display:none">
      <span style="font-size:inherit;filter:drop-shadow(0 2px 8px rgba(0,0,0,.3))">${tut.thumbIcon}</span>
    </div>
  </div>`;
}

// ── PAGES ───────────────────────────────────────────────────────
function showPage(name){
  document.querySelectorAll('.page').forEach(p=>p.classList.remove('active'));
  document.querySelectorAll('.nav-btn').forEach(b=>b.classList.remove('active'));
  const page=document.getElementById('page-'+name);
  const btn=document.getElementById('nav-'+name);
  if(page)page.classList.add('active');
  if(btn)btn.classList.add('active');
  curPage=name;
  if(name==='home')renderHome();
  if(name==='explore')renderExplore();
  if(name==='progress')renderProgress();
  if(name==='profile')renderProfile();
  if(name==='draw')initCanvas();
}

// ══════════════════════════════════════════════════════════════════
//  HOME
// ══════════════════════════════════════════════════════════════════
function renderHome(){
  // Greeting
  const h=new Date().getHours();
  const g=h<12?'Bonjour':h<18?'Bon après-midi':'Bonsoir';
  document.getElementById('hero-greeting').textContent=`${g} ${S.name} 👋`;
  document.getElementById('hero-xp').textContent=S.xp+' XP';

  // Level
  const lv=getLv(S.xp);
  document.getElementById('hero-lv-badge').textContent=lv.num;
  document.getElementById('hero-lv-name').textContent=`${lv.emoji} ${lv.name}`;
  document.getElementById('hero-lv-fill').style.width=lvPct(S.xp)+'%';

  // Interests bar
  renderInterestsBar();

  // Featured carousel
  renderFeatured();

  // Tut list
  renderHomeTuts();
}

function renderInterestsBar(){
  const bar=document.getElementById('interests-bar');
  if(!bar)return;
  const subs=S.subjects.length?S.subjects:SUBJECTS.map(s=>s.id);
  let html=`<button class="int-chip ${curSubject==='all'?'active':''}" onclick="setHomeSubject('all',this)">🔥 Tous</button>`;
  subs.forEach(sid=>{
    const s=SUBJECTS.find(x=>x.id===sid);
    if(s)html+=`<button class="int-chip ${curSubject===sid?'active':''}" onclick="setHomeSubject('${sid}',this)">${s.icon} ${s.name}</button>`;
  });
  bar.innerHTML=html;
}

function setHomeSubject(s,btn){
  curSubject=s;
  document.querySelectorAll('.int-chip').forEach(b=>b.classList.remove('active'));
  btn.classList.add('active');
  renderFeatured();
  renderHomeTuts();
}

function getFiltered(){
  let list=TUTORIALS;
  if(curSubject!=='all')list=list.filter(t=>t.subject===curSubject);
  return list;
}

function renderFeatured(){
  const el=document.getElementById('featured-carousel');
  const list=getFiltered();
  // Show not-done first, then done
  const notDone=list.filter(t=>!S.done.includes(t.id));
  const show=(notDone.length?notDone:list).slice(0,6);
  el.innerHTML=show.map(t=>{
    const done=S.done.includes(t.id);
    return `<div class="feat-card" onclick="openModal(${t.id})">
      <div class="feat-thumb">
        ${thumbHTML(t,'feat-thumb-bg')}
        <div class="feat-play"><div class="feat-play-circle"><svg width="18" height="18" viewBox="0 0 24 24" fill="white"><polygon points="6 3 20 12 6 21"/></svg></div></div>
        <div class="feat-lv">${lvLabel(t.level)}</div>
        ${done?'<div class="eg-done-mark">✓</div>':''}
      </div>
      <div class="feat-info">
        <div class="feat-title">${t.title}</div>
        <div class="feat-desc">${t.desc}</div>
        <div class="feat-meta">
          <span class="feat-chip">🕐 ${t.duration}</span>
          <span class="feat-chip">⭐ +${t.xp} XP</span>
        </div>
      </div>
    </div>`;
  }).join('');
}

function renderHomeTuts(){
  const el=document.getElementById('home-tut-list');
  const list=getFiltered();
  el.innerHTML=list.map(t=>{
    const done=S.done.includes(t.id);
    return `<div class="tut-card" onclick="openModal(${t.id})">
      <div class="tut-thumb">
        ${thumbHTML(t,'tut-thumb-inner')}
        <div class="tut-thumb-play"><svg width="16" height="16" viewBox="0 0 24 24" fill="white"><polygon points="6 3 20 12 6 21"/></svg></div>
      </div>
      <div class="tut-info">
        <div class="tut-title">${t.title}</div>
        <div class="tut-desc">${t.desc}</div>
        <div class="tut-meta">
          <span class="lv-chip ${t.level}">${lvLabel(t.level)}</span>
          <span class="xp-chip-sm">⭐ +${t.xp}</span>
          ${done?'<span class="done-chip-sm">✓</span>':''}
        </div>
      </div>
    </div>`;
  }).join('');
}

// ══════════════════════════════════════════════════════════════════
//  EXPLORE
// ══════════════════════════════════════════════════════════════════
function renderExplore(){
  // Subject chips
  const el=document.getElementById('explore-subjects');
  let html=`<button class="chip ${curFilter==='all'?'active':''}" onclick="setSubjectFilter('all',this)">✨ Tous</button>`;
  SUBJECTS.forEach(s=>{
    html+=`<button class="chip ${curFilter===s.id?'active':''}" onclick="setSubjectFilter('${s.id}',this)">${s.icon} ${s.name}</button>`;
  });
  el.innerHTML=html;
  renderExploreGrid();
}

function setSubjectFilter(s,btn){
  curFilter=s;
  document.querySelectorAll('#explore-subjects .chip').forEach(b=>b.classList.remove('active'));
  btn.classList.add('active');
  renderExploreGrid();
}

function setLevelFilter(l,btn){
  curLevel=l;
  document.querySelectorAll('#explore-levels .chip').forEach(b=>b.classList.remove('active'));
  btn.classList.add('active');
  renderExploreGrid();
}

function onSearch(v){curSearch=v.toLowerCase();renderExploreGrid()}

function renderExploreGrid(){
  let list=TUTORIALS;
  if(curFilter!=='all')list=list.filter(t=>t.subject===curFilter);
  if(curLevel!=='all')list=list.filter(t=>t.level===curLevel);
  if(curSearch)list=list.filter(t=>t.title.toLowerCase().includes(curSearch)||t.desc.toLowerCase().includes(curSearch));
  const el=document.getElementById('explore-grid');
  el.innerHTML=list.length?list.map(t=>{
    const done=S.done.includes(t.id);
    return `<div class="eg-card" onclick="openModal(${t.id})">
      <div class="eg-thumb">
        ${thumbHTML(t,'eg-thumb-inner')}
        <div class="eg-thumb-overlay"><svg width="20" height="20" viewBox="0 0 24 24" fill="white"><polygon points="6 3 20 12 6 21"/></svg></div>
        ${done?'<div class="eg-done-mark">✓</div>':''}
      </div>
      <div class="eg-info">
        <div class="eg-title">${t.title}</div>
        <div class="eg-meta">
          <span class="lv-chip ${t.level}" style="font-size:9px">${lvLabel(t.level)}</span>
          <span class="xp-chip-sm">⭐ ${t.xp}</span>
        </div>
      </div>
    </div>`;
  }).join(''):'<div class="empty-msg" style="grid-column:1/-1"><p>Aucun tutoriel trouvé 🔍</p></div>';
}

// ══════════════════════════════════════════════════════════════════
//  MODAL
// ══════════════════════════════════════════════════════════════════
function openModal(id){
  const t=TUTORIALS.find(x=>x.id===id);if(!t)return;
  modalTutId=id;
  const done=S.done.includes(id);
  // Thumb
  const tw=document.getElementById('modal-thumb-img');
  const fb=`tf-${t.subject}`;
  tw.innerHTML=`<img src="https://img.youtube.com/vi/${t.ytId}/hqdefault.jpg" alt="${t.title}" onerror="this.style.display='none';this.nextElementSibling.style.display='flex'" style="width:100%;height:100%;object-fit:cover"/><div class="thumb-fallback ${fb}" style="display:none;font-size:56px">${t.thumbIcon}</div>`;
  document.getElementById('modal-lv').textContent=lvLabel(t.level);
  document.getElementById('modal-title').textContent=t.title;
  document.getElementById('modal-desc').textContent=t.desc;
  document.getElementById('modal-dur-t').textContent=t.duration;
  document.getElementById('modal-xp-t').textContent='+'+t.xp+' XP';
  const dc=document.getElementById('modal-done-chip');
  dc.style.display=done?'flex':'none';
  const cb=document.getElementById('modal-complete');
  cb.disabled=done;cb.textContent=done?'✓ Déjà complété':'✓ Marquer complété';
  document.getElementById('modal-bg').classList.add('open');
}
function closeModal(){document.getElementById('modal-bg').classList.remove('open')}

function watchTut(){
  const t=TUTORIALS.find(x=>x.id===modalTutId);if(!t)return;
  closeModal();
  document.getElementById('vid-title').textContent=t.title;
  const frame=document.getElementById('yt-frame');
  frame.src=`https://www.youtube.com/embed/${t.ytId}?autoplay=1&rel=0`;
  frame.style.display='block';
  document.getElementById('vid-placeholder').style.display='none';
  showPage('draw');
}

function completeTut(){
  const t=TUTORIALS.find(x=>x.id===modalTutId);
  if(!t||S.done.includes(t.id))return;
  S.done.push(t.id);S.xp+=t.xp;save();
  checkBadges();
  showXpPop(t.xp);
  fireConfetti();
  toast(`🎉 +${t.xp} XP – ${t.title}`);
  closeModal();
  if(curPage==='home')renderHome();
  if(curPage==='explore')renderExplore();
}

// ══════════════════════════════════════════════════════════════════
//  PROGRESS
// ══════════════════════════════════════════════════════════════════
function renderProgress(){
  document.getElementById('s-xp').textContent=S.xp;
  document.getElementById('s-tuts').textContent=S.done.length;
  document.getElementById('s-draws').textContent=S.draws;
  document.getElementById('s-streak').textContent=S.streak;
  const lv=getLv(S.xp);
  document.getElementById('prog-badge').textContent=lv.num;
  document.getElementById('prog-name').textContent=lv.emoji+' '+lv.name;
  document.getElementById('prog-sub').textContent=lv.max===Infinity?'Niveau max atteint !':'Plus que '+(lv.max-S.xp)+' XP pour le prochain';
  document.getElementById('prog-fill').style.width=lvPct(S.xp)+'%';
  const cur=S.xp-lv.xpReq;const need=lv.max===Infinity?'∞':lv.max-lv.xpReq;
  document.getElementById('prog-cur').textContent=cur+' XP';
  document.getElementById('prog-next').textContent=lv.max===Infinity?'Max':need+' XP';

  // Levels roadmap
  const road=document.getElementById('levels-road');
  road.innerHTML=LEVELS.map((l,i)=>`<div class="lv-road-item ${S.xp>=l.xpReq?'reached':''}">
    <div class="lv-road-dot">${l.emoji}</div>
    <div class="lv-road-info"><div class="lv-road-name">Niv. ${i+1} – ${l.name}</div><div class="lv-road-xp">${l.xpReq} XP</div></div>
  </div>`).join('');

  // Badges
  const bg=document.getElementById('badges-grid');
  bg.innerHTML=BADGES.map(b=>{
    const un=S.badges.includes(b.id)||b.cond(S);
    return `<div class="badge ${un?'unlocked':'locked'}" title="${b.desc}"><div class="badge-icon">${b.icon}</div><div class="badge-name">${b.name}</div></div>`;
  }).join('');

  // Completed
  const cl=document.getElementById('completed-list');
  if(!S.done.length){cl.innerHTML='<div class="empty-msg"><svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="10"/><path d="M8 12l3 3 5-5"/></svg><p>Complétez des tutoriels<br/>pour les voir ici !</p></div>';return;}
  cl.innerHTML=S.done.map(id=>{
    const t=TUTORIALS.find(x=>x.id===id);if(!t)return'';
    return `<div class="comp-item"><div class="comp-check">✓</div><div class="comp-info"><div class="comp-title">${t.title}</div><div class="comp-xp">+${t.xp} XP · ${lvLabel(t.level)}</div></div></div>`;
  }).join('');
}

function checkBadges(){
  BADGES.forEach(b=>{
    if(!S.badges.includes(b.id)&&b.cond(S)){
      S.badges.push(b.id);
      setTimeout(()=>toast(`🏅 Badge : ${b.name} ${b.icon}`),1200);
    }
  });
  save();
}

// ══════════════════════════════════════════════════════════════════
//  PROFILE
// ══════════════════════════════════════════════════════════════════
function renderProfile(){
  const lv=getLv(S.xp);
  document.getElementById('prof-name').textContent=S.name;
  document.getElementById('prof-title').textContent=lv.emoji+' '+lv.name;
  document.getElementById('prof-lv').textContent=lv.num;
  document.getElementById('inp-name').value=S.name;
  document.getElementById('sel-bg').value=S.cvBg;
  renderSetSubjects();
}

function renderSetSubjects(){
  const el=document.getElementById('set-subjects');
  el.innerHTML=SUBJECTS.map(s=>`<button class="set-subj ${S.subjects.includes(s.id)?'selected':''}" onclick="toggleSetSubject('${s.id}',this)"><span class="set-subj-icon">${s.icon}</span>${s.name}</button>`).join('');
}

function toggleSetSubject(id,btn){
  const i=S.subjects.indexOf(id);
  if(i>-1)S.subjects.splice(i,1);else S.subjects.push(id);
  btn.classList.toggle('selected');
  save();
}

function setUsername(v){S.name=v||'Artiste';document.getElementById('prof-name').textContent=S.name;save()}
function setCvBg(v){S.cvBg=v;save();if(cvCtx)fillBg()}
function resetAll(){
  if(!confirm('Réinitialiser toute la progression ?'))return;
  S={...S,xp:0,done:[],draws:0,streak:1,badges:[]};save();
  toast('🗑️ Progression réinitialisée');renderProfile();
}

// ══════════════════════════════════════════════════════════════════
//  CANVAS
// ══════════════════════════════════════════════════════════════════
function initCanvas(){
  const cv=document.getElementById('cv');
  const wrap=document.getElementById('cv-canvas-wrap');
  if(!cv||!wrap)return;
  resizeCv(cv,wrap);
  cvCtx=cv.getContext('2d');
  if(hist.length===0){fillBg();pushHist()}
  // Palette
  renderPalette();
  // Events
  cv.onmousedown=e=>{const p=pos(e,cv);startDraw(p.x,p.y)};
  cv.onmousemove=e=>{const p=pos(e,cv);draw(p.x,p.y)};
  cv.onmouseup=cv.onmouseleave=()=>endDraw();
  cv.ontouchstart=e=>{e.preventDefault();const p=pos(e,cv);startDraw(p.x,p.y)};
  cv.ontouchmove=e=>{e.preventDefault();const p=pos(e,cv);draw(p.x,p.y)};
  cv.ontouchend=e=>{e.preventDefault();endDraw()};
}

const PALETTE=['#000000','#ffffff','#ef4444','#f97316','#fbbf24','#22c55e','#3b82f6','#a855f7','#ec4899','#6b7280','#06b6d4','#84cc16'];
function renderPalette(){
  const el=document.getElementById('cv-palette');
  el.innerHTML=PALETTE.map(c=>`<div class="pal ${c===color?'active':''}" style="background:${c}${c==='#ffffff'?';border:1px solid #444':''}" onclick="pickColor('${c}')"></div>`).join('');
}

function resizeCv(cv,wrap){
  let img=null;if(cvCtx)img=cvCtx.getImageData(0,0,cv.width,cv.height);
  cv.width=wrap.clientWidth;cv.height=wrap.clientHeight;
  if(cvCtx&&img)cvCtx.putImageData(img,0,0);
}
function fillBg(){if(!cvCtx)return;const cv=document.getElementById('cv');cvCtx.fillStyle=S.cvBg;cvCtx.fillRect(0,0,cv.width,cv.height)}
function pos(e,cv){
  const r=cv.getBoundingClientRect();const sx=cv.width/r.width;const sy=cv.height/r.height;
  const t=e.touches?e.touches[0]:e;
  return{x:(t.clientX-r.left)*sx,y:(t.clientY-r.top)*sy};
}
function startDraw(x,y){drawing=true;cvCtx.beginPath();cvCtx.moveTo(x,y);applyStyle()}
function draw(x,y){if(!drawing)return;cvCtx.lineTo(x,y);cvCtx.stroke()}
function endDraw(){if(!drawing)return;drawing=false;cvCtx.closePath();pushHist()}
function applyStyle(){
  cvCtx.lineJoin='round';cvCtx.lineCap='round';
  if(tool==='eraser'){cvCtx.globalCompositeOperation='destination-out';cvCtx.strokeStyle='rgba(0,0,0,1)';cvCtx.lineWidth=size*3;cvCtx.globalAlpha=1}
  else if(tool==='brush'){cvCtx.globalCompositeOperation='source-over';cvCtx.strokeStyle=color;cvCtx.lineWidth=size*2;cvCtx.globalAlpha=.65}
  else{cvCtx.globalCompositeOperation='source-over';cvCtx.strokeStyle=color;cvCtx.lineWidth=size;cvCtx.globalAlpha=1}
}
function pickTool(t){tool=t;document.querySelectorAll('.cv-btn[id^="tool-"]').forEach(b=>b.classList.remove('active'));const b=document.getElementById('tool-'+t);if(b)b.classList.add('active')}
function pickColor(c){color=c;document.getElementById('cv-color').value=c;document.querySelectorAll('.pal').forEach(p=>{p.classList.toggle('active',p.style.background===c||p.style.backgroundColor===c)})}
function pickSize(v){size=parseInt(v)}
function pushHist(){if(!cvCtx)return;const cv=document.getElementById('cv');if(histIdx<hist.length-1)hist=hist.slice(0,histIdx+1);hist.push(cvCtx.getImageData(0,0,cv.width,cv.height));if(hist.length>30)hist.shift();histIdx=hist.length-1}
function undo(){if(histIdx<=0){toast('Rien à annuler');return}histIdx--;cvCtx.putImageData(hist[histIdx],0,0)}
function clearCv(){if(!cvCtx)return;const cv=document.getElementById('cv');cvCtx.clearRect(0,0,cv.width,cv.height);cvCtx.globalCompositeOperation='source-over';cvCtx.globalAlpha=1;fillBg();pushHist();toast('🗑️ Canvas effacé')}
function saveCv(){const cv=document.getElementById('cv');if(!cv)return;const a=document.createElement('a');a.download='drawvid_'+Date.now()+'.png';a.href=cv.toDataURL();a.click();S.draws++;checkBadges();save();toast('💾 Dessin sauvegardé !')}
function toggleVid(){
  vidCollapsed=!vidCollapsed;
  document.getElementById('vid-panel').classList.toggle('collapsed',vidCollapsed);
  document.getElementById('vid-toggle-icon').setAttribute('points',vidCollapsed?'6 9 12 15 18 9':'18 15 12 9 6 15');
}
function setSpd(s){document.querySelectorAll('.spd').forEach(b=>b.classList.remove('active'));event.target.classList.add('active');toast(`⚡ Vitesse : ${s}× (modifiez dans le lecteur YouTube)`)}

// ══════════════════════════════════════════════════════════════════
//  TOAST / XP POP / CONFETTI
// ══════════════════════════════════════════════════════════════════
let toastTO;
function toast(msg){clearTimeout(toastTO);const t=document.getElementById('toast');t.textContent=msg;t.classList.add('show');toastTO=setTimeout(()=>t.classList.remove('show'),3500)}
function showXpPop(xp){const p=document.getElementById('xp-pop');p.textContent=`+${xp} XP ⭐`;p.classList.remove('hide');p.classList.add('show');setTimeout(()=>{p.classList.add('hide');setTimeout(()=>p.classList.remove('show','hide'),400)},2000)}

function fireConfetti(){
  const cv=document.getElementById('confetti-cv');
  cv.width=window.innerWidth;cv.height=window.innerHeight;
  const ctx=cv.getContext('2d');
  const particles=[];
  const colors=['#a855f7','#f97316','#fbbf24','#22c55e','#3b82f6','#ec4899','#06b6d4'];
  for(let i=0;i<80;i++){
    particles.push({
      x:cv.width/2+(Math.random()-.5)*200,
      y:cv.height*.3,
      vx:(Math.random()-.5)*12,
      vy:Math.random()*-14-4,
      w:Math.random()*8+4,
      h:Math.random()*6+3,
      color:colors[Math.floor(Math.random()*colors.length)],
      rot:Math.random()*Math.PI*2,
      rotV:(Math.random()-.5)*.3,
      life:1,
    });
  }
  let start=null;
  function step(ts){
    if(!start)start=ts;
    const elapsed=(ts-start)/1000;
    ctx.clearRect(0,0,cv.width,cv.height);
    let alive=false;
    particles.forEach(p=>{
      p.x+=p.vx;p.y+=p.vy;p.vy+=.35;p.rot+=p.rotV;p.life-=.012;
      if(p.life<=0)return;
      alive=true;
      ctx.save();ctx.translate(p.x,p.y);ctx.rotate(p.rot);ctx.globalAlpha=p.life;
      ctx.fillStyle=p.color;ctx.fillRect(-p.w/2,-p.h/2,p.w,p.h);
      ctx.restore();
    });
    if(alive&&elapsed<3)requestAnimationFrame(step);
    else ctx.clearRect(0,0,cv.width,cv.height);
  }
  requestAnimationFrame(step);
}

// ══════════════════════════════════════════════════════════════════
//  ONBOARDING
// ══════════════════════════════════════════════════════════════════
let obSlide=0;
const OB_COUNT=5;

function initOnboarding(){
  // Build subject buttons for slide 4
  const el=document.getElementById('ob-subjects');
  el.innerHTML=SUBJECTS.map(s=>`<button class="ob-subj" data-subj="${s.id}" onclick="toggleObSubj(this,'${s.id}')"><span class="ob-subj-icon">${s.icon}</span>${s.name}</button>`).join('');

  // Build dots
  const dots=document.getElementById('ob-dots');
  let dhtml='';
  for(let i=0;i<OB_COUNT;i++)dhtml+=`<div class="dot ${i===0?'active':''}" data-di="${i}"></div>`;
  dots.innerHTML=dhtml;
}

function toggleObSubj(btn,id){
  btn.classList.toggle('selected');
  const i=S.subjects.indexOf(id);
  if(i>-1)S.subjects.splice(i,1);else S.subjects.push(id);
  save();
}

function nextSlide(){
  if(obSlide>=OB_COUNT-1){finishOnboarding();return}
  const cur=document.querySelector(`.ob-slide[data-slide="${obSlide}"]`);
  cur.classList.add('exit');cur.classList.remove('active');
  obSlide++;
  setTimeout(()=>{
    cur.classList.remove('exit');
    const next=document.querySelector(`.ob-slide[data-slide="${obSlide}"]`);
    next.classList.add('active');
    // Update dots
    document.querySelectorAll('.ob-dots .dot').forEach((d,i)=>d.classList.toggle('active',i===obSlide));
    // Change button text on last slide
    if(obSlide===OB_COUNT-1)document.getElementById('ob-next').textContent="C'est parti ! 🚀";
  },150);
}

function skipOnboarding(){finishOnboarding()}
function finishOnboarding(){
  S.onboarded=true;save();
  const ob=document.getElementById('onboarding');
  ob.style.transition='opacity .4s ease,transform .4s ease';
  ob.style.opacity='0';ob.style.transform='scale(1.05)';
  setTimeout(()=>{ob.style.display='none';showApp()},400);
}

function showApp(){
  document.getElementById('bottom-nav').style.display='flex';
  document.getElementById('app').style.display='block';
  showPage('home');
}

// ══════════════════════════════════════════════════════════════════
//  SPLASH
// ══════════════════════════════════════════════════════════════════
function initSplash(){
  const fill=document.getElementById('splash-fill');
  let pct=0;
  const iv=setInterval(()=>{
    pct+=Math.random()*18+6;
    if(pct>=100){pct=100;clearInterval(iv);fill.style.width='100%';setTimeout(hideSplash,250)}
    fill.style.width=pct+'%';
  },70);
}

function hideSplash(){
  const sp=document.getElementById('splash-screen');
  sp.classList.add('hide');
  setTimeout(()=>{
    sp.style.display='none';
    if(!S.onboarded){
      document.getElementById('onboarding').style.display='flex';
      initOnboarding();
    } else {
      showApp();
    }
  },500);
}

// ══════════════════════════════════════════════════════════════════
//  INIT
// ══════════════════════════════════════════════════════════════════
window.addEventListener('resize',()=>{
  if(curPage==='draw'){const cv=document.getElementById('cv');const w=document.getElementById('cv-canvas-wrap');if(cv&&w)resizeCv(cv,w)}
});

document.addEventListener('DOMContentLoaded',()=>{
  load();
  initSplash();
  document.addEventListener('keydown',e=>{
    if(curPage!=='draw')return;
    if(e.key==='z'&&(e.ctrlKey||e.metaKey)){e.preventDefault();undo()}
    if(e.key==='p')pickTool('pencil');
    if(e.key==='b')pickTool('brush');
    if(e.key==='e')pickTool('eraser');
  });
});
