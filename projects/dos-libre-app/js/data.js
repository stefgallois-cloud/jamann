// ============================================================
// DOS LIBRE 60J — Programme complet · Les Vertébrées
// ============================================================

const PHASES = [
  { id: 1, nom: "Réveil",        couleur: "#152d1e", accent: "#a8c5a0", texte: "#e8f3e4", badge: "#4a7c59", jours: "1–20",  semaines: "1–3", description: "Ton corps a appris à se protéger. Maintenant on lui apprend à de nouveau faire confiance au mouvement." },
  { id: 2, nom: "Renforcement",  couleur: "#2a120a", accent: "#c4956a", texte: "#f5e6d8", badge: "#8b4513", jours: "22–41", semaines: "4–6", description: "On construit l'armure musculaire qui va protéger ta colonne pour le reste de ta vie." },
  { id: 3, nom: "Liberté",       couleur: "#0a1d24", accent: "#7ecfd4", texte: "#d4eef0", badge: "#2a8a90", jours: "43–60", semaines: "7–8", description: "Tu as construit ton armure. Maintenant on t'apprend à danser avec." }
];

const NIVEAUX = {
  facile:    { label: "Jour facile",    couleur: "#4a7c59", bg: "#e8f3e4", emoji: "🟢", desc: "Tu as mal, tu es fatiguée, tu doutes. Version courte, amplitude minimale." },
  normal:    { label: "Jour normal",    couleur: "#c47a2a", bg: "#fdf0e0", emoji: "🟡", desc: "Tu vas bien. La version standard du programme." },
  energique: { label: "Jour énergique", couleur: "#2a7a8a", bg: "#d4eef0", emoji: "🔵", desc: "Tu te sens forte. Version enrichie." }
};

// ============================================================
// Les 60 séances
// estRepos: true = jour de repos actif (journal du corps)
// isBilan: true = séance spéciale bilan
// ============================================================
const SEANCES = [

  // ─────────────────────────────────────
  //  PHASE 1 — RÉVEIL · Semaine 1
  // ─────────────────────────────────────

  {
    jour: 1, phase: 1, semaine: 1,
    titre: "Bonjour le corps",
    sousTitre: "Phase Réveil · Semaine 1",
    citation: "Si des douleurs remontent, laisse-les passer sans y résister. C'est normal.",
    type: "sol", estRepos: false,
    materiel: ["Tapis", "Coussin"],
    duree: { facile: 8, normal: 12, energique: 15 },
    exercices: [
      {
        nom: "Cohérence cardiaque",
        duree: "5 min",
        position: "Allongée sur le dos, genoux fléchis",
        description: "Inspire par le nez en comptant jusqu'à 5. Expire doucement par la bouche en comptant jusqu'à 5.",
        pourquoi: "Le système nerveux post-opératoire est en état d'alerte. La cohérence cardiaque le calme avant de demander au corps de bouger.",
        niveaux: { facile: "8 cycles de respiration", normal: "Répète 10 cycles sans forcer", energique: "12 cycles avec visualisation positive" },
        stopSi: null
      },
      {
        nom: "Étirement genoux poitrine",
        duree: "3 min",
        position: "Allongée sur le dos",
        description: "Ramène un genou vers la poitrine avec les deux mains. L'autre jambe reste à plat ou légèrement fléchie.",
        pourquoi: null,
        niveaux: { facile: "Amplitude réduite, jusqu'au confort. 30 sec par côté.", normal: "45 secondes par côté.", energique: "60 sec + petit mouvement circulaire du genou." },
        stopSi: null,
        interdit: "Ramener les DEUX genoux en même temps si tu as une arthrodèse lombaire."
      },
      {
        nom: "Rotation douce des genoux",
        duree: "4 min",
        position: "Allongée sur le dos, genoux fléchis ensemble",
        description: "Laisse tomber les genoux doucement d'un côté puis de l'autre. Retour au centre entre chaque côté.",
        pourquoi: null,
        niveaux: { facile: "Amplitude 10–15 cm seulement.", normal: "Amplitude confortable naturelle.", energique: "Tiens 20 secondes de chaque côté." },
        stopSi: "Douleur électrique dans la jambe, picotements, perte de sensations."
      }
    ]
  },

  {
    jour: 2, phase: 1, semaine: 1,
    titre: "Premiers pas conscients",
    sousTitre: "Phase Réveil · Semaine 1",
    citation: null,
    type: "marche", estRepos: false,
    materiel: ["Chaussures"],
    duree: { facile: 12, normal: 20, energique: 25 },
    exercices: [
      {
        nom: "Activation avant marche",
        duree: "2 min",
        position: "Debout, pieds à largeur d'épaules",
        description: "Contracte doucement le ventre (nombril vers la colonne). Garde cette légère contraction pendant toute la marche.",
        pourquoi: null,
        niveaux: { facile: "2 min de préparation", normal: "2 min de préparation avec 5 respirations", energique: "2 min + visualisation du trajet" },
        stopSi: null
      },
      {
        nom: "Marche consciente",
        duree: "variable",
        position: "Debout",
        description: "Observer : comment tes pieds touchent le sol, si tu te penches vers l'avant, si tes épaules sont symétriques, si tu boites légèrement.",
        pourquoi: "La prise de conscience du mouvement est la première étape de la rééducation.",
        niveaux: { facile: "12 min sur terrain plat strict", normal: "20 min sur terrain plat", energique: "25 min, terrain plat" },
        stopSi: null,
        note: "Terrain plat obligatoire cette semaine. Pas de dénivelé."
      }
    ]
  },

  {
    jour: 3, phase: 1, semaine: 1,
    titre: "Mobilité cervicale douce",
    sousTitre: "Phase Réveil · Semaine 1",
    citation: null,
    type: "sol", estRepos: false,
    materiel: ["Tapis", "Coussin"],
    duree: { facile: 10, normal: 15, energique: 18 },
    exercices: [
      {
        nom: "Chin tuck (rentrée du menton)",
        duree: "3 min",
        position: "Assise ou allongée",
        description: "Rentre doucement le menton vers la gorge (comme pour faire un double menton). Tiens 5 secondes. Relâche.",
        pourquoi: "Réaligne les cervicales sans compression.",
        niveaux: { facile: "8 répétitions", normal: "12 répétitions", energique: "15 répétitions avec 8 sec de tenue" },
        stopSi: "Vertiges, douleur irradiante dans le bras."
      },
      {
        nom: "Rotation cervicale lente",
        duree: "3 min",
        position: "Assise, dos droit",
        description: "Tourne très lentement la tête vers la droite, reviens au centre, tourne vers la gauche.",
        pourquoi: null,
        niveaux: { facile: "Amplitude 30° maximum", normal: "Amplitude confortable", energique: "Amplitude maximale, 5 sec de tenue chaque côté" },
        stopSi: "Vertiges ou douleur."
      },
      {
        nom: "Inclinaison latérale cervicale",
        duree: "3 min",
        position: "Assise, épaules relâchées",
        description: "Incline doucement la tête vers l'épaule droite (oreille vers épaule). Reviens. Répète à gauche.",
        pourquoi: null,
        niveaux: { facile: "5 rép. chaque côté, amplitude minimale", normal: "8 rép. chaque côté", energique: "10 rép. + 10 sec de tenue" },
        stopSi: null
      }
    ]
  },

  {
    jour: 4, phase: 1, semaine: 1,
    titre: "Repos actif",
    sousTitre: "Phase Réveil · Semaine 1",
    citation: "Le corps reconstruit pendant le repos. Ce n'est pas de la paresse.",
    type: "repos", estRepos: true,
    materiel: [], duree: { normal: 3 }, exercices: []
  },

  {
    jour: 5, phase: 1, semaine: 1,
    titre: "Le corps se souvient",
    sousTitre: "Phase Réveil · Semaine 1",
    citation: null,
    type: "yoga", estRepos: false,
    materiel: ["Tapis"],
    duree: { facile: 10, normal: 15, energique: 20 },
    exercices: [
      {
        nom: "L'enfant modifié",
        duree: "3 min",
        position: "À genoux sur le tapis, assieds-toi sur les talons",
        description: "Penche-toi très doucement vers l'avant, bras tendus devant toi.",
        pourquoi: null,
        niveaux: { facile: "1 min, amplitude minimale", normal: "2 min avec respiration abdominale profonde", energique: "3 min + bras de chaque côté" },
        stopSi: null
      },
      {
        nom: "Chat-Vache (Cat-Cow)",
        duree: "4 min",
        position: "À quatre pattes, poignets sous les épaules",
        description: "Inspiration : laisse le ventre descendre, tête remonte (vache). Expiration : arrondis le dos (chat). Mouvement ultra lent.",
        pourquoi: "Mobilise toute la colonne vertébrale en douceur.",
        niveaux: { facile: "Amplitude minimale naturelle, 6 cycles", normal: "8 cycles complets", energique: "10 cycles + pause 3 sec en position chat" },
        stopSi: null
      }
    ]
  },

  {
    jour: 6, phase: 1, semaine: 1,
    titre: "Je grandis",
    sousTitre: "Phase Réveil · Semaine 1",
    citation: null,
    type: "marche", estRepos: false,
    materiel: ["Chaussures"],
    duree: { facile: 15, normal: 25, energique: 30 },
    exercices: [
      {
        nom: "Technique du fil imaginaire",
        duree: "variable",
        position: "Debout",
        description: "Imagine un fil attaché au sommet de ton crâne qui te tire doucement vers le haut. Garde cette sensation pendant toute la marche.",
        pourquoi: null,
        niveaux: { facile: "15 min avec 1 arrêt respiration", normal: "25 min avec 2 arrêts de 2 min (respiration + étirement mollets)", energique: "30 min continu, fil actif en permanence" },
        stopSi: null,
        arrets: ["Arrêt 1 : 5 respirations cohérence cardiaque debout", "Arrêt 2 : étirement des mollets contre un mur, 30 sec par jambe"]
      }
    ]
  },

  {
    jour: 7, phase: 1, semaine: 1,
    titre: "Mobilité des hanches",
    sousTitre: "Phase Réveil · Semaine 1",
    citation: null,
    type: "sol", estRepos: false,
    materiel: ["Tapis"],
    duree: { facile: 10, normal: 15, energique: 20 },
    exercices: [
      {
        nom: "Étirement piriforme",
        duree: "4 min",
        position: "Allongée sur le dos, genoux fléchis",
        description: "Croise la cheville droite sur le genou gauche. Ramène doucement les deux jambes vers la poitrine.",
        pourquoi: "Le piriforme compense souvent les faiblesses lombaires.",
        niveaux: { facile: "Sans ramener les jambes, juste la posture tenue 30 sec", normal: "Ramène vers la poitrine, 45 sec par côté", energique: "60 sec par côté avec respiration profonde" },
        stopSi: "Douleur irradiante dans la jambe."
      },
      {
        nom: "Pont fessier doux",
        duree: "4 min",
        position: "Allongée sur le dos, genoux fléchis",
        description: "Contracte d'abord le transverse, puis soulève le bassin lentement vertèbre par vertèbre. Tiens 3 sec. Redescends.",
        pourquoi: null,
        niveaux: { facile: "5 rép., amplitude réduite", normal: "8 rép., montée complète", energique: "10 rép. + 5 sec de tenue en haut" },
        stopSi: null
      }
    ]
  },

  // ─────────────────────────────────────
  //  PHASE 1 — Semaine 2
  // ─────────────────────────────────────

  {
    jour: 8, phase: 1, semaine: 2,
    titre: "Repos actif",
    sousTitre: "Phase Réveil · Semaine 2",
    citation: "Le corps reconstruit pendant le repos. Ce n'est pas de la paresse.",
    type: "repos", estRepos: true,
    materiel: [], duree: { normal: 3 }, exercices: []
  },

  {
    jour: 9, phase: 1, semaine: 2,
    titre: "L'exercice le plus important",
    sousTitre: "Phase Réveil · Semaine 2",
    citation: "Si tu ne fais qu'une chose chaque jour, c'est ça.",
    type: "sol", estRepos: false,
    materiel: ["Tapis"],
    duree: { facile: 10, normal: 18, energique: 22 },
    exercices: [
      {
        nom: "Activation du transverse",
        duree: "5 min",
        position: "Allongée sur le dos, genoux fléchis, pieds à plat",
        description: "Expire doucement et rentre le nombril vers la colonne. Tiens 5 secondes en respirant normalement. Relâche complètement.",
        pourquoi: "Le transverse protège ta colonne dans TOUS les mouvements du quotidien : se lever du lit, porter les courses, monter les escaliers.",
        niveaux: { facile: "5 répétitions", normal: "10 répétitions", energique: "15 répétitions avec 8 secondes de tenue" },
        stopSi: null
      },
      {
        nom: "Pont fessier doux",
        duree: "4 min",
        position: "Allongée sur le dos, genoux fléchis",
        description: "Contracte d'abord le transverse, puis soulève le bassin lentement vertèbre par vertèbre. Tiens 3 sec. Redescends.",
        pourquoi: null,
        niveaux: { facile: "5 rép., amplitude réduite", normal: "8 rép., montée complète", energique: "10 rép. + variante un pied soulevé 5cm" },
        stopSi: null
      }
    ]
  },

  {
    jour: 10, phase: 1, semaine: 2,
    titre: "Marche avec transverse",
    sousTitre: "Phase Réveil · Semaine 2",
    citation: null,
    type: "marche", estRepos: false,
    materiel: ["Chaussures"],
    duree: { facile: 15, normal: 25, energique: 30 },
    exercices: [
      {
        nom: "Marche transverse activé",
        duree: "variable",
        position: "Debout",
        description: "Avant de partir : active le transverse (nombril vers la colonne, 30%). Maintiens cette activation légère tout au long de la marche. Ce n'est pas une contraction forte — juste un éveil.",
        pourquoi: "Pratiquer le transverse en mouvement = le rendre automatique.",
        niveaux: { facile: "15 min, terrain plat, contraction légère", normal: "25 min avec 2 pauses pour vérifier la contraction", energique: "30 min, terrain légèrement varié autorisé" },
        stopSi: null
      }
    ]
  },

  {
    jour: 11, phase: 1, semaine: 2,
    titre: "Yoga doux — semaine 2",
    sousTitre: "Phase Réveil · Semaine 2",
    citation: null,
    type: "yoga", estRepos: false,
    materiel: ["Tapis"],
    duree: { facile: 12, normal: 20, energique: 25 },
    exercices: [
      {
        nom: "Chat-Vache approfondi",
        duree: "5 min",
        position: "À quatre pattes",
        description: "Même mouvement que Jour 5 mais plus lent, plus conscient. Synchronise parfaitement la respiration avec le mouvement.",
        pourquoi: null,
        niveaux: { facile: "8 cycles, amplitude minimale", normal: "10 cycles, synchronisation respiratoire complète", energique: "12 cycles + pause 5 sec en chaque position" },
        stopSi: null
      },
      {
        nom: "Torsion douce allongée",
        duree: "4 min",
        position: "Allongée sur le dos",
        description: "Genoux fléchis vers la poitrine. Laisse-les tomber lentement d'un côté, bras en croix. Regarde dans la direction opposée. Respire profondément.",
        pourquoi: null,
        niveaux: { facile: "30 sec par côté, amplitude minimale", normal: "45 sec par côté", energique: "60 sec par côté, cherche l'étirement maximal confortable" },
        stopSi: "Douleur lombaire ou irradiante."
      }
    ]
  },

  {
    jour: 12, phase: 1, semaine: 2,
    titre: "Repos actif",
    sousTitre: "Phase Réveil · Semaine 2",
    citation: "Le corps reconstruit pendant le repos. Ce n'est pas de la paresse.",
    type: "repos", estRepos: true,
    materiel: [], duree: { normal: 3 }, exercices: []
  },

  {
    jour: 13, phase: 1, semaine: 2,
    titre: "Circuit Phase 1",
    sousTitre: "Phase Réveil · Semaine 2",
    citation: null,
    type: "sol", estRepos: false,
    materiel: ["Tapis"],
    duree: { facile: 15, normal: 22, energique: 28 },
    exercices: [
      {
        nom: "Activation du transverse",
        duree: "3 min",
        position: "Allongée sur le dos",
        description: "10 répétitions de l'activation transverse. C'est toujours le point de départ.",
        pourquoi: null,
        niveaux: { facile: "8 rép.", normal: "10 rép.", energique: "12 rép. avec 8 sec de tenue" },
        stopSi: null
      },
      {
        nom: "Étirement genoux poitrine",
        duree: "3 min",
        position: "Allongée sur le dos",
        description: "Reprise de l'exercice Jour 1 — remarques-tu une différence d'amplitude ou de confort ?",
        pourquoi: null,
        niveaux: { facile: "30 sec par côté", normal: "45 sec par côté", energique: "60 sec par côté" },
        stopSi: null
      },
      {
        nom: "Pont fessier doux",
        duree: "4 min",
        position: "Allongée sur le dos",
        description: "Version soignée : chaque vertèbre se pose une par une en redescendant.",
        pourquoi: null,
        niveaux: { facile: "5 rép.", normal: "8 rép.", energique: "10 rép. + 5 sec de tenue" },
        stopSi: null
      }
    ]
  },

  {
    jour: 14, phase: 1, semaine: 2,
    titre: "Grande marche",
    sousTitre: "Phase Réveil · Semaine 2",
    citation: null,
    type: "marche", estRepos: false,
    materiel: ["Chaussures"],
    duree: { facile: 20, normal: 30, energique: 35 },
    exercices: [
      {
        nom: "Marche guidée — fil + transverse",
        duree: "variable",
        position: "Debout",
        description: "Combine les deux techniques apprises : le fil imaginaire (grandir vers le ciel) + le transverse activé (nombril vers la colonne). Terrain plat.",
        pourquoi: "L'intégration des deux éléments en même temps est un vrai travail de coordination neuromusculaire.",
        niveaux: { facile: "20 min, terrain plat", normal: "30 min avec 2 arrêts de 2 min", energique: "35 min, peut débuter un tout petit dénivelé" },
        stopSi: null
      }
    ]
  },

  {
    jour: 15, phase: 1, semaine: 2,
    titre: "Assouplissement profond",
    sousTitre: "Phase Réveil · Semaine 2",
    citation: null,
    type: "yoga", estRepos: false,
    materiel: ["Tapis"],
    duree: { facile: 15, normal: 22, energique: 28 },
    exercices: [
      {
        nom: "L'enfant large",
        duree: "4 min",
        position: "À genoux, genoux écartés",
        description: "Assieds-toi entre les talons ou sur eux. Bras tendus devant. Genoux écartés — plus doux pour les lombaires.",
        pourquoi: null,
        niveaux: { facile: "2 min, amplitude minimale", normal: "3 min avec respiration abdominale", energique: "4 min + déplacement des bras droite/gauche" },
        stopSi: null
      },
      {
        nom: "Étirement ischio-jambiers au mur",
        duree: "4 min",
        position: "Allongée sur le dos, fesses contre le mur",
        description: "Lève une jambe le long du mur, aussi haut que confortable. L'autre jambe reste à plat. Tiens et respire.",
        pourquoi: "Les ischio-jambiers tendus tirent sur le bassin et aggravent les douleurs lombaires.",
        niveaux: { facile: "30 sec par jambe, angle 45°", normal: "45 sec par jambe, angle 60–70°", energique: "60 sec par jambe, angle maximum confortable" },
        stopSi: "Douleur irradiante dans la jambe."
      }
    ]
  },

  {
    jour: 16, phase: 1, semaine: 3,
    titre: "Repos actif",
    sousTitre: "Phase Réveil · Semaine 3",
    citation: "Le corps reconstruit pendant le repos. Ce n'est pas de la paresse.",
    type: "repos", estRepos: true,
    materiel: [], duree: { normal: 3 }, exercices: []
  },

  {
    jour: 17, phase: 1, semaine: 3,
    titre: "Consolidation Phase 1",
    sousTitre: "Phase Réveil · Semaine 3",
    citation: null,
    type: "sol", estRepos: false,
    materiel: ["Tapis"],
    duree: { facile: 15, normal: 22, energique: 28 },
    exercices: [
      {
        nom: "Activation du transverse",
        duree: "3 min",
        position: "Allongée sur le dos",
        description: "Toujours en premier. 12 répétitions.",
        pourquoi: null,
        niveaux: { facile: "10 rép.", normal: "12 rép.", energique: "15 rép. avec 10 sec de tenue" },
        stopSi: null
      },
      {
        nom: "Chat-Vache + Enfant modifié",
        duree: "5 min",
        position: "À quatre pattes",
        description: "Enchaîne : 5 cycles chat-vache → posture enfant modifié 1 min → 5 cycles chat-vache.",
        pourquoi: null,
        niveaux: { facile: "Amplitude minimale", normal: "Amplitude normale, mouvement fluide", energique: "Amplitude maximale, respiration consciente" },
        stopSi: null
      },
      {
        nom: "Pont fessier + Piriforme",
        duree: "5 min",
        position: "Allongée sur le dos",
        description: "Alterne : 5 ponts fessiers → étirement piriforme gauche → étirement piriforme droit → 5 ponts.",
        pourquoi: null,
        niveaux: { facile: "Séquence complète × 1", normal: "Séquence complète × 2", energique: "Séquence complète × 3" },
        stopSi: null
      }
    ]
  },

  {
    jour: 18, phase: 1, semaine: 3,
    titre: "Marche longue",
    sousTitre: "Phase Réveil · Semaine 3",
    citation: null,
    type: "marche", estRepos: false,
    materiel: ["Chaussures"],
    duree: { facile: 20, normal: 30, energique: 35 },
    exercices: [
      {
        nom: "Marche nature",
        duree: "variable",
        position: "Debout",
        description: "Choisis un chemin qui te fait du bien. Techniques actives : fil imaginaire + transverse + observation de ton environnement. Marche dans la présence.",
        pourquoi: null,
        niveaux: { facile: "20 min terrain plat", normal: "30 min avec pauses au besoin", energique: "35 min, peut inclure un léger dénivelé" },
        stopSi: null
      }
    ]
  },

  {
    jour: 19, phase: 1, semaine: 3,
    titre: "Séquence debout",
    sousTitre: "Phase Réveil · Semaine 3",
    citation: null,
    type: "yoga", estRepos: false,
    materiel: ["Tapis"],
    duree: { facile: 12, normal: 20, energique: 25 },
    exercices: [
      {
        nom: "Tadasana — posture de la montagne",
        duree: "3 min",
        position: "Debout, pieds à largeur de hanches",
        description: "Fil imaginaire actif, transverse léger, épaules relâchées, mains en prière. Respire 10 cycles profonds.",
        pourquoi: "C'est la posture de base de toute la Phase 3.",
        niveaux: { facile: "1 min 30", normal: "3 min", energique: "3 min avec fermeture des yeux les 30 dernières secondes" },
        stopSi: null
      },
      {
        nom: "Demi-lune latérale debout",
        duree: "4 min",
        position: "Debout",
        description: "Lève les bras au-dessus de la tête. Penche latéralement vers la droite. 5 respirations. Reviens. Penche vers la gauche.",
        pourquoi: null,
        niveaux: { facile: "3 fois chaque côté, amplitude réduite", normal: "3 fois chaque côté, amplitude confortable", energique: "5 fois chaque côté + tiens 8 sec" },
        stopSi: null
      },
      {
        nom: "Étirement mollets + quadriceps",
        duree: "4 min",
        position: "Debout, appui contre un mur",
        description: "Étirement mollet : talon au sol, pied en appui contre le mur. Étirement quadriceps : appui sur un pied, ramène l'autre talon vers la fesse.",
        pourquoi: null,
        niveaux: { facile: "30 sec par jambe par exercice", normal: "45 sec par jambe", energique: "60 sec par jambe" },
        stopSi: null
      }
    ]
  },

  {
    jour: 20, phase: 1, semaine: 3,
    titre: "Bilan Phase 1",
    sousTitre: "Phase Réveil · Semaine 3",
    citation: "Tu as fait 20 jours. La confiance se reconstruit dans la répétition.",
    type: "sol", estRepos: false, isBilan: true,
    materiel: ["Tapis"],
    duree: { facile: 15, normal: 22, energique: 28 },
    exercices: [
      {
        nom: "Refaire le Jour 1 complet",
        duree: "12 min",
        position: "Allongée sur le dos",
        description: "Reprends exactement les exercices du Jour 1 : Cohérence cardiaque → Genoux poitrine → Rotation genoux. Compare ton ressenti avec le premier jour.",
        pourquoi: "Observer sa propre progression est le meilleur motivateur.",
        niveaux: { facile: "Version facile du Jour 1", normal: "Version normale", energique: "Version énergique avec le recul de 20 jours" },
        stopSi: null
      }
    ]
  },

  {
    jour: 21, phase: 1, semaine: 3,
    titre: "Repos de transition",
    sousTitre: "Fin Phase 1 · Prépare-toi",
    citation: "Demain commence la Phase 2. Tu es prête.",
    type: "repos", estRepos: true,
    materiel: [], duree: { normal: 3 }, exercices: []
  },

  // ─────────────────────────────────────
  //  PHASE 2 — RENFORCEMENT · Semaine 4
  // ─────────────────────────────────────

  {
    jour: 22, phase: 2, semaine: 4,
    titre: "L'armure commence ici",
    sousTitre: "Phase Renforcement · Semaine 4",
    citation: "L'exercice roi de la Phase 2. Zéro compression vertébrale, stabilisateurs profonds au maximum.",
    type: "sol", estRepos: false,
    materiel: ["Tapis"],
    duree: { facile: 18, normal: 25, energique: 30 },
    exercices: [
      {
        nom: "Bird-Dog",
        duree: "8 min",
        position: "À quatre pattes, poignets sous les épaules, dos plat comme une table",
        description: "1. Contracte le transverse d'abord. 2. Tends simultanément le bras droit et la jambe gauche. 3. Tiens 5 secondes — corps parfaitement immobile. 4. Reviens. Échange côtés.",
        pourquoi: "Renforce les stabilisateurs profonds du dos sans aucune compression vertébrale.",
        niveaux: { facile: "5 rép. par côté, amplitude réduite", normal: "8 rép. par côté, amplitude complète", energique: "10 rép. + 8 secondes de tenue" },
        stopSi: "Bas du dos qui se creuse, douleur irradiante."
      },
      {
        nom: "Pont fessier renforcé",
        duree: "5 min",
        position: "Allongée sur le dos, genoux fléchis",
        description: "Même mouvement qu'en Phase 1 mais : tiens 8 secondes en haut, 12 répétitions.",
        pourquoi: null,
        niveaux: { facile: "8 rép., tiens 5 sec en haut", normal: "12 rép., tiens 8 sec en haut", energique: "Variante : soulève un pied 5cm en haut du pont. Tiens 5 sec." },
        stopSi: null
      }
    ]
  },

  {
    jour: 23, phase: 2, semaine: 4,
    titre: "Marche nordique",
    sousTitre: "Phase Renforcement · Semaine 4",
    citation: null,
    type: "marche", estRepos: false,
    materiel: ["Bâtons de marche nordique (optionnel)", "Chaussures"],
    duree: { facile: 20, normal: 30, energique: 35 },
    exercices: [
      {
        nom: "Marche active avec bâtons",
        duree: "variable",
        position: "Debout",
        description: "Si tu as des bâtons : utilise-les en opposition (bâton droit + pied gauche ensemble). Sans bâtons : exagère le balancé des bras. Cadence plus soutenue qu'en Phase 1.",
        pourquoi: "La marche nordique engage les muscles du dos et des épaules tout en protégeant les articulations.",
        niveaux: { facile: "20 min, cadence douce", normal: "30 min, cadence normale avec pauses", energique: "35 min, peut inclure léger dénivelé" },
        stopSi: null
      }
    ]
  },

  {
    jour: 24, phase: 2, semaine: 4,
    titre: "Repos actif",
    sousTitre: "Phase Renforcement · Semaine 4",
    citation: "Le corps reconstruit pendant le repos. Ce n'est pas de la paresse.",
    type: "repos", estRepos: true,
    materiel: [], duree: { normal: 3 }, exercices: []
  },

  {
    jour: 25, phase: 2, semaine: 4,
    titre: "Squat chaise + Planche",
    sousTitre: "Phase Renforcement · Semaine 4",
    citation: null,
    type: "sol", estRepos: false,
    materiel: ["Tapis", "Chaise"],
    duree: { facile: 18, normal: 25, energique: 30 },
    exercices: [
      {
        nom: "Squat chaise",
        duree: "5 min",
        position: "Debout devant une chaise",
        description: "Descends lentement comme si tu allais t'asseoir, puis remonte avant de toucher la chaise. Genoux dans l'axe des orteils, dos droit, transverse actif.",
        pourquoi: "Renforce les quadriceps et les fessiers — essentiels pour protéger les lombaires.",
        niveaux: { facile: "8 rép., tu peux t'asseoir entre chaque", normal: "10 rép., sans s'asseoir", energique: "12 rép. + 3 sec de pause à mi-descente" },
        stopSi: "Douleur au genou ou au dos."
      },
      {
        nom: "Planche sur genoux",
        duree: "4 min",
        position: "À quatre pattes, puis avancer les mains",
        description: "Mains sous les épaules, genoux à terre, corps en ligne droite des genoux aux épaules. Transverse activé. Maintiens la position.",
        pourquoi: "La planche sur genoux est la progression logique avant la planche classique.",
        niveaux: { facile: "3 × 15 sec", normal: "3 × 25 sec", energique: "3 × 40 sec" },
        stopSi: "Douleur lombaire ou cervicale."
      }
    ]
  },

  {
    jour: 26, phase: 2, semaine: 4,
    titre: "Pilates mat — séance 1",
    sousTitre: "Phase Renforcement · Semaine 4",
    citation: null,
    type: "pilates", estRepos: false,
    materiel: ["Tapis"],
    duree: { facile: 20, normal: 30, energique: 35 },
    exercices: [
      {
        nom: "Centring (activation du centre)",
        duree: "3 min",
        position: "Allongée sur le dos, jambes à 90° (jambes en l'air, tibias parallèles au sol)",
        description: "Active le transverse. Maintiens les jambes à 90° stables pendant 10 respirations. Le dos ne s'arque pas.",
        pourquoi: "Le 'Powerhouse' Pilates = transverse + plancher pelvien + multifides.",
        niveaux: { facile: "Pieds posés sur le sol, seulement l'activation", normal: "Jambes à 90°, 10 respirations", energique: "Jambes à 90°, 15 respirations + légère oscillation" },
        stopSi: "Le bas du dos se décolle du tapis."
      },
      {
        nom: "Single Leg Stretch",
        duree: "4 min",
        position: "Allongée sur le dos",
        description: "Tête et épaules légèrement soulevées. Genoux vers la poitrine. Tends alternativement chaque jambe. Mains sur le genou fléchi.",
        pourquoi: null,
        niveaux: { facile: "Tête reste au sol, jambe à 45°", normal: "Tête soulevée, jambe à 45°", energique: "Tête soulevée, jambe plus basse (30°), rythme accéléré" },
        stopSi: "Le dos se décolle du sol ou douleur lombaire."
      },
      {
        nom: "Clam (Palourde)",
        duree: "4 min",
        position: "Allongée sur le côté, hanches fléchies à 45°, genoux superposés",
        description: "Pieds joints, ouvre le genou supérieur vers le plafond comme une palourde. Garde le bassin stable.",
        pourquoi: "Renforce les abducteurs de hanche — stabilisateurs clés du bassin.",
        niveaux: { facile: "10 rép. par côté, amplitude réduite", normal: "15 rép. par côté", energique: "15 rép. + 3 sec de tenue en haut, par côté" },
        stopSi: null
      }
    ]
  },

  {
    jour: 27, phase: 2, semaine: 4,
    titre: "Marche active",
    sousTitre: "Phase Renforcement · Semaine 4",
    citation: null,
    type: "marche", estRepos: false,
    materiel: ["Chaussures"],
    duree: { facile: 25, normal: 35, energique: 40 },
    exercices: [
      {
        nom: "Marche active — cadence +10%",
        duree: "variable",
        position: "Debout",
        description: "Marche un peu plus vite que d'habitude. Bras actifs, foulée assurée. Peut inclure un léger dénivelé si tu te sens à l'aise.",
        pourquoi: null,
        niveaux: { facile: "25 min, cadence confortable", normal: "35 min, cadence active", energique: "40 min avec 5 min de côte légère" },
        stopSi: null
      }
    ]
  },

  {
    jour: 28, phase: 2, semaine: 5,
    titre: "Repos actif",
    sousTitre: "Phase Renforcement · Semaine 5",
    citation: "Le corps reconstruit pendant le repos. Ce n'est pas de la paresse.",
    type: "repos", estRepos: true,
    materiel: [], duree: { normal: 3 }, exercices: []
  },

  {
    jour: 29, phase: 2, semaine: 5,
    titre: "Circuit élastique",
    sousTitre: "Phase Renforcement · Semaine 5",
    citation: null,
    type: "circuit", estRepos: false,
    materiel: ["Tapis", "Élastique de résistance"],
    duree: { facile: 20, normal: 30, energique: 35 },
    exercices: [
      {
        nom: "Rowing avec élastique",
        duree: "4 min",
        position: "Assise sur une chaise, dos droit",
        description: "Fixe l'élastique devant toi. Tire les deux extrémités vers ton ventre en serrant les omoplates. Lâche doucement.",
        pourquoi: "Renforce les rhomboïdes et les trapèzes moyens — correcteurs de posture.",
        niveaux: { facile: "12 rép., résistance légère", normal: "15 rép., résistance modérée", energique: "15 rép. + 3 sec de tenue en position contractée" },
        stopSi: "Douleur cervicale ou dans les épaules."
      },
      {
        nom: "Extension de hanche avec élastique",
        duree: "4 min",
        position: "Debout, élastique fixé à la cheville",
        description: "Fixe l'élastique à hauteur de cheville. Tends la jambe vers l'arrière sans cambrer le dos. Reviens lentement.",
        pourquoi: "Renforce les fessiers en chaîne cinétique fermée — essentiel pour la stabilité lombaire.",
        niveaux: { facile: "10 rép. par jambe, amplitude réduite", normal: "12 rép. par jambe", energique: "15 rép. + 3 sec de tenue en extension" },
        stopSi: null
      }
    ]
  },

  {
    jour: 30, phase: 2, semaine: 5,
    titre: "Jour 30 — Mi-programme",
    sousTitre: "Phase Renforcement · Semaine 5",
    citation: "Tu as fait 30 jours. C'est 30 jours de plus que toutes celles qui ont voulu mais n'ont pas commencé. Sois fière.",
    type: "marche", estRepos: false, isBilan: true,
    materiel: ["Chaussures"],
    duree: { facile: 25, normal: 35, energique: 40 },
    exercices: [
      {
        nom: "Marche de célébration",
        duree: "35 min",
        position: "Debout",
        description: "Marche dans un endroit qui te fait du bien. Pas d'objectif technique aujourd'hui. Juste toi et ta fierté.",
        pourquoi: "30 jours de travail méritent une vraie célébration.",
        niveaux: { facile: "25 min, l'endroit qui te rend heureuse", normal: "35 min, marche libre", energique: "40 min, avec un peu de dénivelé si tu veux" },
        stopSi: null
      }
    ]
  },

  {
    jour: 31, phase: 2, semaine: 5,
    titre: "Bird-Dog avancé",
    sousTitre: "Phase Renforcement · Semaine 5",
    citation: null,
    type: "sol", estRepos: false,
    materiel: ["Tapis"],
    duree: { facile: 18, normal: 25, energique: 30 },
    exercices: [
      {
        nom: "Bird-Dog — niveau 2",
        duree: "8 min",
        position: "À quatre pattes",
        description: "Même exercice que Jour 22. Cette semaine : maintenir 8 secondes, dos absolument immobile. Ajouter un dessin de cercle avec la main ou le pied tendu (version avancée).",
        pourquoi: null,
        niveaux: { facile: "8 rép. par côté, 5 sec de tenue", normal: "10 rép. par côté, 8 sec de tenue", energique: "10 rép. + cercles avec bras/jambe en extension" },
        stopSi: "Douleur lombaire ou chute du dos."
      },
      {
        nom: "Planche genoux — niveau 2",
        duree: "4 min",
        position: "Planche sur genoux",
        description: "En position de planche sur genoux, soulève alternativement chaque bras vers l'avant (3 sec).",
        pourquoi: null,
        niveaux: { facile: "Planche statique 3 × 20 sec", normal: "Planche avec levé de bras × 8 par côté", energique: "Planche avec levé de bras × 12 + 3 sec de tenue" },
        stopSi: null
      }
    ]
  },

  {
    jour: 32, phase: 2, semaine: 5,
    titre: "Repos actif",
    sousTitre: "Phase Renforcement · Semaine 5",
    citation: "Le corps reconstruit pendant le repos. Ce n'est pas de la paresse.",
    type: "repos", estRepos: true,
    materiel: [], duree: { normal: 3 }, exercices: []
  },

  {
    jour: 33, phase: 2, semaine: 5,
    titre: "Pilates mat — niveau 2",
    sousTitre: "Phase Renforcement · Semaine 5",
    citation: null,
    type: "pilates", estRepos: false,
    materiel: ["Tapis"],
    duree: { facile: 20, normal: 30, energique: 38 },
    exercices: [
      {
        nom: "Double Leg Stretch",
        duree: "5 min",
        position: "Allongée sur le dos, genoux vers la poitrine",
        description: "Tête et épaules soulevées. Tends les bras et les jambes simultanément (jambes à 45°). Reviens. Respire : expire en tendant, inspire en revenant.",
        pourquoi: null,
        niveaux: { facile: "8 rép., jambes à 60°", normal: "10 rép., jambes à 45°", energique: "12 rép., jambes à 30°" },
        stopSi: "Le bas du dos se décolle du sol."
      },
      {
        nom: "Leg Circle (Cercles de jambe)",
        duree: "4 min",
        position: "Allongée sur le dos, une jambe en l'air",
        description: "Jambe droite vers le plafond. Décris de petits cercles avec le pied (dans un sens, puis l'autre). L'autre jambe reste à plat, le bassin ne bouge pas.",
        pourquoi: null,
        niveaux: { facile: "5 petits cercles dans chaque sens, par jambe", normal: "8 cercles dans chaque sens", energique: "10 cercles + agrandit progressivement le cercle" },
        stopSi: null
      },
      {
        nom: "Swimming (Natation au sol)",
        duree: "3 min",
        position: "Allongée sur le ventre, bras tendus devant",
        description: "Soulève légèrement bras et jambes du sol. Alterne : bras droit + jambe gauche (comme si tu nageais). Mouvements courts et rapides.",
        pourquoi: null,
        niveaux: { facile: "Soulève seulement les bras, jambes restent", normal: "2 × 20 secondes de swimming", energique: "3 × 30 secondes" },
        stopSi: "Douleur lombaire ou cervicale."
      }
    ]
  },

  {
    jour: 34, phase: 2, semaine: 6,
    titre: "Marche nordique avancée",
    sousTitre: "Phase Renforcement · Semaine 6",
    citation: null,
    type: "marche", estRepos: false,
    materiel: ["Bâtons (optionnel)", "Chaussures"],
    duree: { facile: 25, normal: 35, energique: 45 },
    exercices: [
      {
        nom: "Marche avec dénivelé léger",
        duree: "variable",
        position: "Debout",
        description: "Première fois : peut inclure un vrai dénivelé (petite pente). Sens ce que fait ton dos en montée, en descente. Adapte ta foulée.",
        pourquoi: null,
        niveaux: { facile: "25 min, terrain plat", normal: "35 min, peut inclure 5 min de pente légère", energique: "45 min avec 10–15 min de dénivelé" },
        stopSi: null
      }
    ]
  },

  {
    jour: 35, phase: 2, semaine: 6,
    titre: "Circuit complet Phase 2",
    sousTitre: "Phase Renforcement · Semaine 6",
    citation: null,
    type: "sol", estRepos: false,
    materiel: ["Tapis", "Chaise"],
    duree: { facile: 20, normal: 30, energique: 38 },
    exercices: [
      {
        nom: "Activation transverse",
        duree: "2 min",
        position: "Allongée",
        description: "12 répétitions. Toujours en premier.",
        pourquoi: null,
        niveaux: { facile: "10 rép.", normal: "12 rép.", energique: "15 rép., 10 sec de tenue" },
        stopSi: null
      },
      {
        nom: "Bird-Dog",
        duree: "5 min",
        position: "À quatre pattes",
        description: "10 répétitions par côté, 8 secondes de tenue.",
        pourquoi: null,
        niveaux: { facile: "8 rép.", normal: "10 rép.", energique: "12 rép." },
        stopSi: null
      },
      {
        nom: "Squat chaise",
        duree: "3 min",
        position: "Debout devant une chaise",
        description: "12 répétitions soignées.",
        pourquoi: null,
        niveaux: { facile: "8 rép.", normal: "12 rép.", energique: "15 rép. avec 2 sec de pause à mi-descente" },
        stopSi: null
      },
      {
        nom: "Pont fessier renforcé",
        duree: "4 min",
        position: "Allongée",
        description: "12 répétitions, 8 sec de tenue.",
        pourquoi: null,
        niveaux: { facile: "8 rép.", normal: "12 rép.", energique: "12 rép. + variante unipodale" },
        stopSi: null
      }
    ]
  },

  {
    jour: 36, phase: 2, semaine: 6,
    titre: "Repos actif",
    sousTitre: "Phase Renforcement · Semaine 6",
    citation: "Le corps reconstruit pendant le repos. Ce n'est pas de la paresse.",
    type: "repos", estRepos: true,
    materiel: [], duree: { normal: 3 }, exercices: []
  },

  {
    jour: 37, phase: 2, semaine: 6,
    titre: "Circuit élastique — niveau 2",
    sousTitre: "Phase Renforcement · Semaine 6",
    citation: null,
    type: "circuit", estRepos: false,
    materiel: ["Tapis", "Élastique"],
    duree: { facile: 22, normal: 30, energique: 38 },
    exercices: [
      {
        nom: "Rowing debout avec élastique",
        duree: "4 min",
        position: "Debout, légèrement fléchie en avant",
        description: "Élastique sous les pieds. Tire les deux extrémités vers tes hanches en serrant les omoplates. Maintient la courbure lombaire naturelle.",
        pourquoi: null,
        niveaux: { facile: "12 rép., amplitude réduite", normal: "15 rép.", energique: "15 rép. + 3 sec de tenue" },
        stopSi: null
      },
      {
        nom: "Abduction de hanche debout",
        duree: "4 min",
        position: "Debout, élastique aux chevilles",
        description: "Écarte une jambe sur le côté (abduction). Contrôle le retour. Ne penche pas le tronc.",
        pourquoi: null,
        niveaux: { facile: "10 rép. par jambe", normal: "12 rép. par jambe", energique: "15 rép. + 3 sec de tenue en abduction maximale" },
        stopSi: null
      },
      {
        nom: "Planche complète (si prête)",
        duree: "3 min",
        position: "Planche sur orteils",
        description: "Si la planche sur genoux est facile depuis 2 semaines, teste la planche classique sur orteils. Sinon, reste sur genoux.",
        pourquoi: null,
        niveaux: { facile: "Planche sur genoux, 3 × 25 sec", normal: "Planche classique 3 × 20 sec", energique: "Planche classique 3 × 35 sec" },
        stopSi: "Le dos s'affaisse ou douleur lombaire."
      }
    ]
  },

  {
    jour: 38, phase: 2, semaine: 6,
    titre: "Marche longue",
    sousTitre: "Phase Renforcement · Semaine 6",
    citation: null,
    type: "marche", estRepos: false,
    materiel: ["Chaussures"],
    duree: { facile: 30, normal: 40, energique: 50 },
    exercices: [
      {
        nom: "Grande marche de la semaine",
        duree: "variable",
        position: "Debout",
        description: "La plus longue marche du programme jusqu'ici. Choisis un beau chemin. Techniques actives, mais autorise-toi aussi à juste profiter.",
        pourquoi: null,
        niveaux: { facile: "30 min avec pauses", normal: "40 min, 1 pause", energique: "50 min avec dénivelé" },
        stopSi: null
      }
    ]
  },

  {
    jour: 39, phase: 2, semaine: 6,
    titre: "Pilates + poids légers",
    sousTitre: "Phase Renforcement · Semaine 6",
    citation: null,
    type: "pilates", estRepos: false,
    materiel: ["Tapis", "Poids 0.5–1 kg (ou bouteilles d'eau)"],
    duree: { facile: 20, normal: 30, energique: 38 },
    exercices: [
      {
        nom: "Centring + poids aux poignets",
        duree: "4 min",
        position: "Allongée sur le dos",
        description: "Centring classique mais en tenant les poids. Les bras restent le long du corps ou légèrement au-dessus du sol.",
        pourquoi: null,
        niveaux: { facile: "Sans poids", normal: "0.5 kg par main", energique: "1 kg par main" },
        stopSi: null
      },
      {
        nom: "Press de poitrine allongée",
        duree: "4 min",
        position: "Allongée sur le dos, genoux fléchis",
        description: "Poids dans les mains, bras à 90°. Pousse vers le plafond (extension complète des bras). Contrôle le retour.",
        pourquoi: "Renforce les pectoraux et les triceps sans charge sur la colonne.",
        niveaux: { facile: "12 rép., 0.5 kg", normal: "15 rép., 0.5–1 kg", energique: "15 rép., 1 kg + 2 sec de tenue en haut" },
        stopSi: null
      }
    ]
  },

  {
    jour: 40, phase: 2, semaine: 6,
    titre: "Repos actif",
    sousTitre: "Phase Renforcement · Semaine 6",
    citation: "Le corps reconstruit pendant le repos. Ce n'est pas de la paresse.",
    type: "repos", estRepos: true,
    materiel: [], duree: { normal: 3 }, exercices: []
  },

  {
    jour: 41, phase: 2, semaine: 6,
    titre: "Bilan Phase 2",
    sousTitre: "Phase Renforcement · Semaine 6",
    citation: "Tu as construit ton armure. La Phase 3 va t'apprendre à danser avec.",
    type: "sol", estRepos: false, isBilan: true,
    materiel: ["Tapis"],
    duree: { facile: 18, normal: 25, energique: 30 },
    exercices: [
      {
        nom: "Refaire le Bird-Dog du Jour 22",
        duree: "8 min",
        position: "À quatre pattes",
        description: "Reprends le Bird-Dog de ton premier jour de Phase 2. Mesure ta progression : amplitude, stabilité, durée de tenue.",
        pourquoi: "L'observation de la progression est aussi importante que la progression elle-même.",
        niveaux: { facile: "8 rép. par côté", normal: "12 rép. par côté, 8 sec de tenue", energique: "15 rép. + cercles" },
        stopSi: null
      }
    ]
  },

  {
    jour: 42, phase: 2, semaine: 6,
    titre: "Repos de transition",
    sousTitre: "Fin Phase 2 · Prépare-toi",
    citation: "Demain commence la Phase Liberté. L'armure est construite.",
    type: "repos", estRepos: true,
    materiel: [], duree: { normal: 3 }, exercices: []
  },

  // ─────────────────────────────────────
  //  PHASE 3 — LIBERTÉ · Semaine 7
  // ─────────────────────────────────────

  {
    jour: 43, phase: 3, semaine: 7,
    titre: "Introduction poids légers",
    sousTitre: "Phase Liberté · Semaine 7",
    citation: null,
    type: "sol", estRepos: false,
    materiel: ["Tapis", "Poids 1 kg"],
    duree: { facile: 20, normal: 30, energique: 38 },
    exercices: [
      {
        nom: "Activation transverse debout",
        duree: "3 min",
        position: "Debout",
        description: "Même activation qu'allongée, mais maintenant debout. C'est plus difficile : le transverse doit travailler contre la gravité.",
        pourquoi: "Prépare le corps à utiliser le transverse dans les positions du quotidien.",
        niveaux: { facile: "10 rép., allongée", normal: "12 rép., debout", energique: "15 rép. debout + 10 sec de tenue" },
        stopSi: null
      },
      {
        nom: "Deadlift roumain avec poids léger",
        duree: "5 min",
        position: "Debout, poids dans les mains",
        description: "Pieds à largeur de hanches. Penche le buste vers l'avant en gardant le dos droit (charnière à la hanche, pas à la colonne). Descends les poids le long des jambes. Remonte.",
        pourquoi: "Apprend à plier correctement — le mouvement le plus protecteur pour le dos au quotidien.",
        niveaux: { facile: "8 rép., amplitude réduite, sans poids", normal: "10 rép., 1 kg par main", energique: "12 rép., 1–1.5 kg, amplitude complète" },
        stopSi: "Le dos s'arrondit ou douleur lombaire."
      }
    ]
  },

  {
    jour: 44, phase: 3, semaine: 7,
    titre: "Flux Yoga Les Vertébrées",
    sousTitre: "Phase Liberté · Semaine 7",
    citation: null,
    type: "yoga", estRepos: false,
    materiel: ["Tapis"],
    duree: { facile: 18, normal: 25, energique: 30 },
    exercices: [
      { nom: "1 · Montagne (Tadasana)", duree: "2 min", position: "Debout", description: "Fil imaginaire, transverse activé, mains en prière. 10 respirations profondes.", pourquoi: null, niveaux: { facile: "1 min 30", normal: "2 min", energique: "2 min, yeux fermés la dernière minute" }, stopSi: null },
      { nom: "2 · Demi-lune debout", duree: "3 min", position: "Debout, bras levés", description: "Penche latéralement. 5 respirations. 3 fois chaque côté.", pourquoi: null, niveaux: { facile: "Amplitude minimale", normal: "Amplitude confortable", energique: "Amplitude maximale, 8 sec de tenue" }, stopSi: null },
      { nom: "3 · Guerrier 1 modifié", duree: "5 min", position: "Fente avant", description: "Genou avant à 90°, bras levés. Pas de torsion du bassin.", pourquoi: null, niveaux: { facile: "Genou moins fléchi (angle 120°)", normal: "Genou à 90°, 5 respirations par côté", energique: "Genou à 90°, 8 respirations + torse relevé davantage" }, stopSi: null },
      { nom: "4 · Guerrier 2 modifié", duree: "5 min", position: "Fente latérale", description: "Bras à l'horizontale. 5 respirations. 3 fois chaque côté.", pourquoi: null, niveaux: { facile: "Amplitude réduite", normal: "Standard", energique: "Standard + regard prolongé vers l'avant" }, stopSi: null },
      { nom: "5 · Triangle modifié", duree: "4 min", position: "Debout, jambes écartées", description: "Glisse une main vers le genou seulement. Jamais plus bas si lombaires fragilisées.", pourquoi: null, niveaux: { facile: "Main sur la cuisse seulement", normal: "Main vers le genou", energique: "Main vers le tibia si sans douleur" }, stopSi: "Douleur lombaire." },
      { nom: "6 · Chien tête en bas", duree: "3 min", position: "Mains au sol, fesses vers le plafond", description: "Alterne flexion des genoux. Garde la tête dans l'axe.", pourquoi: null, niveaux: { facile: "Genoux légèrement fléchis, 1 min", normal: "2 min, jambes alternées", energique: "2 min + marche des talons" }, stopSi: "Vertiges en relevant la tête." },
      { nom: "7 · Enfant large", duree: "2 min", position: "Genoux écartés", description: "Bras tendus devant. Laisse le corps fondre.", pourquoi: null, niveaux: { facile: "1 min", normal: "2 min", energique: "2 min + respiration abdominale profonde" }, stopSi: null },
      { nom: "8 · Savasana", duree: "3 min", position: "Allongée, bras légèrement écartés du corps", description: "Scan corporel de la tête aux pieds. Laisse le corps intégrer la séance.", pourquoi: null, niveaux: { facile: "2 min", normal: "3 min", energique: "5 min avec cohérence cardiaque finale" }, stopSi: null }
    ]
  },

  {
    jour: 45, phase: 3, semaine: 7,
    titre: "Repos actif",
    sousTitre: "Phase Liberté · Semaine 7",
    citation: "Le corps reconstruit pendant le repos. Ce n'est pas de la paresse.",
    type: "repos", estRepos: true,
    materiel: [], duree: { normal: 3 }, exercices: []
  },

  {
    jour: 46, phase: 3, semaine: 7,
    titre: "Pilates avancé",
    sousTitre: "Phase Liberté · Semaine 7",
    citation: null,
    type: "pilates", estRepos: false,
    materiel: ["Tapis"],
    duree: { facile: 22, normal: 35, energique: 42 },
    exercices: [
      {
        nom: "Teaser préparatoire",
        duree: "5 min",
        position: "Allongée sur le dos",
        description: "Jambes à 45°, bras vers le plafond. Soulève la tête et les épaules. Lève les bras vers les orteils. Reviens lentement. (Version complète du V-up).",
        pourquoi: null,
        niveaux: { facile: "Jambes à 90°, tête reste au sol", normal: "Jambes à 60°, tête soulevée", energique: "Jambes à 45°, teaser complet" },
        stopSi: "Le dos se décolle brusquement."
      },
      {
        nom: "Side kick (Kick latéral)",
        duree: "5 min",
        position: "Allongée sur le côté, corps en ligne droite",
        description: "Soulève la jambe supérieure à hauteur de hanche. Bascule-la vers l'avant (exhale) puis vers l'arrière (inhale). Bassin stable.",
        pourquoi: null,
        niveaux: { facile: "10 rép. par côté, amplitude 30 cm", normal: "12 rép. par côté, amplitude complète", energique: "15 rép. + tiens 3 sec en extension arrière" },
        stopSi: null
      }
    ]
  },

  {
    jour: 47, phase: 3, semaine: 7,
    titre: "Grande marche nature",
    sousTitre: "Phase Liberté · Semaine 7",
    citation: null,
    type: "marche", estRepos: false,
    materiel: ["Chaussures de randonnée"],
    duree: { facile: 35, normal: 45, energique: 60 },
    exercices: [
      {
        nom: "Randonnée libre",
        duree: "variable",
        position: "Debout",
        description: "La plus longue sortie du programme. Terrain varié autorisé. Écoute ton corps à chaque montée et descente.",
        pourquoi: "La liberté de mouvement en nature, c'est l'objectif de tout le programme.",
        niveaux: { facile: "35 min, terrain plat ou légèrement vallonné", normal: "45 min, terrain varié", energique: "60 min, vraie randonnée avec dénivelé" },
        stopSi: null
      }
    ]
  },

  {
    jour: 48, phase: 3, semaine: 7,
    titre: "Circuit poids + élastiques",
    sousTitre: "Phase Liberté · Semaine 7",
    citation: null,
    type: "circuit", estRepos: false,
    materiel: ["Tapis", "Poids 1–1.5 kg", "Élastique"],
    duree: { facile: 22, normal: 30, energique: 38 },
    exercices: [
      {
        nom: "Deadlift + Rowing",
        duree: "5 min",
        position: "Debout",
        description: "Enchaîne : 10 deadlifts roumains → pause 20 sec → 10 rowings élastique. Répète 3 fois.",
        pourquoi: null,
        niveaux: { facile: "2 séries", normal: "3 séries", energique: "4 séries" },
        stopSi: null
      },
      {
        nom: "Squat + Planche",
        duree: "5 min",
        position: "Debout puis sol",
        description: "Enchaîne : 12 squats → descend en planche 30 sec. Répète 3 fois.",
        pourquoi: null,
        niveaux: { facile: "8 squats + planche genoux 20 sec", normal: "12 squats + planche 30 sec", energique: "15 squats + planche 45 sec" },
        stopSi: null
      }
    ]
  },

  {
    jour: 49, phase: 3, semaine: 8,
    titre: "Repos actif",
    sousTitre: "Phase Liberté · Semaine 8",
    citation: "Le corps reconstruit pendant le repos. Ce n'est pas de la paresse.",
    type: "repos", estRepos: true,
    materiel: [], duree: { normal: 3 }, exercices: []
  },

  {
    jour: 50, phase: 3, semaine: 8,
    titre: "Yoga flux + Routine d'Or",
    sousTitre: "Phase Liberté · Semaine 8",
    citation: null,
    type: "yoga", estRepos: false,
    materiel: ["Tapis"],
    duree: { facile: 20, normal: 35, energique: 42 },
    exercices: [
      {
        nom: "Routine d'Or matinale",
        duree: "10 min",
        position: "Tapis",
        description: "Enchaîne les 7 mouvements de la Routine d'Or (voir page Routine d'Or). C'est ta pratique quotidienne à vie.",
        pourquoi: null,
        niveaux: { facile: "Routine d'Or seule (10 min)", normal: "Routine d'Or + 20 min de flux yoga", energique: "Routine d'Or + flux yoga complet (30 min)" },
        stopSi: null
      }
    ]
  },

  {
    jour: 51, phase: 3, semaine: 8,
    titre: "Liberté de choix",
    sousTitre: "Phase Liberté · Semaine 8",
    citation: "La liberté : quand le bon mouvement devient automatique.",
    type: "liberte", estRepos: false,
    materiel: ["À toi de choisir"],
    duree: { facile: 20, normal: 30, energique: 45 },
    exercices: [
      {
        nom: "Séance au choix",
        duree: "variable",
        position: "Variable",
        description: "Pioche dans ce qui te parle : marche, Pilates, yoga flux, poids légers, circuit. Contrainte unique : Routine d'Or ce matin.",
        pourquoi: null,
        niveaux: { facile: "20 min de l'activité qui te fait envie", normal: "30 min de choix", energique: "45 min de ce qui te fait plaisir" },
        stopSi: null
      }
    ]
  },

  {
    jour: 52, phase: 3, semaine: 8,
    titre: "Pilates avancé — séance 2",
    sousTitre: "Phase Liberté · Semaine 8",
    citation: null,
    type: "pilates", estRepos: false,
    materiel: ["Tapis"],
    duree: { facile: 22, normal: 35, energique: 45 },
    exercices: [
      {
        nom: "Corkscrew préparatoire",
        duree: "4 min",
        position: "Allongée sur le dos",
        description: "Jambes à 90°. Décris de petits ovales avec les deux jambes ensemble (transverse bien actif). Bassin stable.",
        pourquoi: null,
        niveaux: { facile: "5 ovales dans chaque sens, petite amplitude", normal: "8 ovales dans chaque sens", energique: "10 ovales + agrandir progressivement" },
        stopSi: "Le dos se décolle du sol."
      },
      {
        nom: "Jackknife préparatoire",
        duree: "4 min",
        position: "Allongée sur le dos",
        description: "Lève les jambes à 90°. Presse les bras au sol. Monte les jambes vers le plafond en soulevant légèrement les hanches. Redescends très lentement.",
        pourquoi: null,
        niveaux: { facile: "Jambes à 90°, pas de levé de hanches", normal: "5 rép. avec levé de hanches", energique: "8 rép., levé complet, descente ultra lente" },
        stopSi: "Douleur cervicale ou lombaire."
      }
    ]
  },

  {
    jour: 53, phase: 3, semaine: 8,
    titre: "Repos actif",
    sousTitre: "Phase Liberté · Semaine 8",
    citation: "Le corps reconstruit pendant le repos. Ce n'est pas de la paresse.",
    type: "repos", estRepos: true,
    materiel: [], duree: { normal: 3 }, exercices: []
  },

  {
    jour: 54, phase: 3, semaine: 8,
    titre: "La Routine d'Or — découverte",
    sousTitre: "Phase Liberté · Semaine 8",
    citation: "10 minutes chaque matin. Colonne protégée à vie.",
    type: "sol", estRepos: false,
    materiel: ["Tapis"],
    duree: { facile: 10, normal: 20, energique: 30 },
    exercices: [
      {
        nom: "Routine d'Or complète × 2",
        duree: "20 min",
        position: "Tapis",
        description: "Fais la Routine d'Or deux fois d'affilée. Prends conscience de chaque mouvement. C'est elle que tu feras chaque matin pour le reste de ta vie.",
        pourquoi: null,
        niveaux: { facile: "Routine d'Or × 1 (10 min)", normal: "Routine d'Or × 2 (20 min)", energique: "Routine d'Or × 2 + 10 min de marche" },
        stopSi: null
      }
    ]
  },

  {
    jour: 55, phase: 3, semaine: 8,
    titre: "Liberté de choix",
    sousTitre: "Phase Liberté · Semaine 8",
    citation: null,
    type: "liberte", estRepos: false,
    materiel: ["À toi de choisir"],
    duree: { facile: 20, normal: 35, energique: 50 },
    exercices: [
      {
        nom: "Séance au choix",
        duree: "variable",
        position: "Variable",
        description: "Pioche dans ce qui te parle — marche, Pilates, yoga flux, poids légers. Contrainte unique : Routine d'Or ce matin.",
        pourquoi: null,
        niveaux: { facile: "20 min", normal: "35 min", energique: "50 min" },
        stopSi: null
      }
    ]
  },

  {
    jour: 56, phase: 3, semaine: 8,
    titre: "Repos actif",
    sousTitre: "Phase Liberté · Semaine 8",
    citation: "Le corps reconstruit pendant le repos. Ce n'est pas de la paresse.",
    type: "repos", estRepos: true,
    materiel: [], duree: { normal: 3 }, exercices: []
  },

  {
    jour: 57, phase: 3, semaine: 8,
    titre: "Liberté de choix",
    sousTitre: "Phase Liberté · Semaine 8",
    citation: null,
    type: "liberte", estRepos: false,
    materiel: ["À toi de choisir"],
    duree: { facile: 25, normal: 40, energique: 55 },
    exercices: [
      {
        nom: "Séance au choix",
        duree: "variable",
        position: "Variable",
        description: "Avant-dernière séance. Fais quelque chose qui te fait vraiment plaisir.",
        pourquoi: null,
        niveaux: { facile: "25 min", normal: "40 min", energique: "55 min" },
        stopSi: null
      }
    ]
  },

  {
    jour: 58, phase: 3, semaine: 8,
    titre: "Grande marche finale",
    sousTitre: "Phase Liberté · Semaine 8",
    citation: null,
    type: "marche", estRepos: false,
    materiel: ["Chaussures"],
    duree: { facile: 35, normal: 45, energique: 60 },
    exercices: [
      {
        nom: "Marche longue avant le Grand Jour",
        duree: "variable",
        position: "Debout",
        description: "Avant-dernière séance — la dernière vraie marche du programme. Prends un beau chemin. Pense à où tu en étais au Jour 1.",
        pourquoi: null,
        niveaux: { facile: "35 min", normal: "45 min", energique: "60 min avec dénivelé" },
        stopSi: null
      }
    ]
  },

  {
    jour: 59, phase: 3, semaine: 8,
    titre: "Séance souvenir",
    sousTitre: "Phase Liberté · Semaine 8",
    citation: null,
    type: "sol", estRepos: false,
    materiel: ["Tapis", "Coussin"],
    duree: { facile: 12, normal: 20, energique: 25 },
    exercices: [
      {
        nom: "Refaire le Jour 1 complet",
        duree: "12 min",
        position: "Allongée sur le dos",
        description: "Reprends exactement les 3 exercices du Jour 1 : Cohérence cardiaque (5 min) → Genoux poitrine (3 min) → Rotation genoux (4 min). Mais remarque la différence : tu es une autre personne maintenant.",
        pourquoi: "La boucle se boucle. La différence que tu ressentiras est la preuve de tout ton travail.",
        niveaux: { facile: "Version facile du Jour 1", normal: "Version normale", energique: "Version énergique — tu y es maintenant" },
        stopSi: null
      }
    ]
  },

  {
    jour: 60, phase: 3, semaine: 8,
    titre: "Le Grand Jour",
    sousTitre: "Phase Liberté · Semaine 8",
    citation: "Tu es une Vertébrée. Tu t'es relevée, tu t'es renforcée, tu t'es libérée. Ce n'est pas une fin — c'est qui tu es maintenant.",
    type: "sol", estRepos: false, isBilan: true, isGrandJour: true,
    materiel: ["Tapis"],
    duree: { facile: 40, normal: 60, energique: 60 },
    exercices: [
      {
        nom: "Routine d'Or — 10 min",
        duree: "10 min",
        position: "Tapis",
        description: "Commence par ta routine. Comme chaque matin. Pour toujours.",
        pourquoi: null,
        niveaux: { facile: "Routine d'Or complète", normal: "Routine d'Or complète", energique: "Routine d'Or complète" },
        stopSi: null
      },
      {
        nom: "Marche de célébration — 30 min",
        duree: "30 min",
        position: "Dehors",
        description: "Marche dans un endroit qui te rend heureuse. Pas d'objectif technique. Juste toi, ton corps libre, et ta fierté.",
        pourquoi: null,
        niveaux: { facile: "20 min", normal: "30 min", energique: "30 min+" },
        stopSi: null
      },
      {
        nom: "Refaire les exercices du Jour 1",
        duree: "12 min",
        position: "Tapis",
        description: "La boucle se boucle. Cochen chérence cardiaque, genoux poitrine, rotation des genoux.",
        pourquoi: "Pour mesurer en plein corps tout le chemin parcouru.",
        niveaux: { facile: "Version facile", normal: "Version normale", energique: "Version énergique" },
        stopSi: null
      }
    ]
  }
];

// La Routine d'Or — à garder à vie
const ROUTINE_OR = [
  { ordre: 1, nom: "Cohérence cardiaque",    duree: "2 min", description: "5 sec inspire / 5 sec expire. 12 cycles." },
  { ordre: 2, nom: "Activation transverse",  duree: "1 min", description: "10 rép., nombril vers la colonne, 5 sec de tenue." },
  { ordre: 3, nom: "Chin tuck × 15",         duree: "1 min", description: "15 rentrées du menton, 5 sec de tenue chacune." },
  { ordre: 4, nom: "Cat-cow × 10 cycles",    duree: "2 min", description: "10 cycles complets, synchronisés avec la respiration." },
  { ordre: 5, nom: "Pont fessier × 10",      duree: "2 min", description: "10 ponts, montée vertèbre par vertèbre, 5 sec de tenue." },
  { ordre: 6, nom: "Ischio-jambiers",        duree: "1 min", description: "30 sec par jambe contre le mur." },
  { ordre: 7, nom: "Savasana",               duree: "1 min", description: "Allongée, scan corporel descendant." }
];
