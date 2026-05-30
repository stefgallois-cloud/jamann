/* ═══════════════════════════════════════════════════════════════
   DrawVid v2 – Application Logic
   ═══════════════════════════════════════════════════════════════ */

// ── SUBJECTS (what user wants to draw) ──────────────────────────
const SUBJECTS = [
  { id: 'animaux',      name: 'Animaux',       icon: '🐾', emoji: '🦄' },
  { id: 'personnages',  name: 'Personnages',   icon: '🎭', emoji: '👧' },
  { id: 'kawaii',       name: 'Kawaii',        icon: '✨', emoji: '💖' },
  { id: 'nourriture',   name: 'Gourmandises',  icon: '🍦', emoji: '🍩' },
  { id: 'nature',       name: 'Paysages',      icon: '🌿', emoji: '🏞️' },
  { id: 'objets',       name: 'Objets',        icon: '📚', emoji: '✏️' },
  { id: 'architecture', name: 'Bâtiments',     icon: '🏛️', emoji: '🏠' },
  { id: 'coloriage',    name: 'Coloriage',     icon: '🎨', emoji: '🖍️' },
];

// ── TUTORIALS ───────────────────────────────────────────────────
// Chaîne : Dessin Pour Enfants (@DessinPourEnfants2606)
const TUTORIALS = [
  // DÉBUTANT — formes simples, 1 objet
  { id:0,  title:"Deux cœurs amoureux",                desc:"Dessiner et colorier deux cœurs tout mignons. Parfait pour débuter en douceur.",                          level:"debutant",      duration:"5:00",  xp:20,  ytId:"1YJW3puHyJo", subject:"kawaii",       thumbIcon:"💕" },
  { id:1,  title:"Une île tropicale",                  desc:"Dessine ton île de rêve avec palmier, soleil et arc-en-ciel.",                                            level:"debutant",      duration:"7:00",  xp:30,  ytId:"qOhN5rDwAd4", subject:"nature",       thumbIcon:"🏝️" },
  { id:2,  title:"Un éléphant mignon",                 desc:"Apprends à dessiner un éléphant tout doux étape par étape.",                                              level:"debutant",      duration:"6:30",  xp:30,  ytId:"3mRPjANAbgw", subject:"animaux",       thumbIcon:"🐘" },
  { id:3,  title:"Une glace licorne",                  desc:"Dessine la glace la plus mignonne du monde avec sa corne et son arc-en-ciel.",                            level:"debutant",      duration:"6:00",  xp:30,  ytId:"r7Ll5A4dIcQ", subject:"nourriture",   thumbIcon:"🍦" },
  { id:4,  title:"Une licorne magique",                desc:"Dessine ta licorne arc-en-ciel toute mignonne, prête à enchanter ton cahier.",                            level:"debutant",      duration:"7:30",  xp:40,  ytId:"-h_rqUlWn7M", subject:"animaux",       thumbIcon:"🦄" },
  { id:5,  title:"Cahier, crayon et ciseaux",          desc:"La rentrée en mode kawaii : trois fournitures scolaires trop choupies.",                                  level:"debutant",      duration:"8:00",  xp:40,  ytId:"sWlc-X-5bRc", subject:"objets",       thumbIcon:"✏️" },
  { id:6,  title:"Peinture, palette et pinceau",       desc:"Dessine ton matériel d'artiste : palette, pinceau et tableau coloré.",                                    level:"debutant",      duration:"8:00",  xp:40,  ytId:"kPN_CKK6mE0", subject:"objets",       thumbIcon:"🎨" },
  { id:7,  title:"Un sous-marin sous l'océan",         desc:"Plonge avec ton sous-marin tout mignon dans un océan plein de couleurs.",                                 level:"debutant",      duration:"9:00",  xp:50,  ytId:"m_6cRLOrasw", subject:"objets",       thumbIcon:"🚤" },

  // INTERMÉDIAIRE — plusieurs éléments, plus de détails
  { id:8,  title:"Une fille et un garçon",             desc:"Dessine et colorie deux personnages tout mignons, côte à côte.",                                          level:"intermediaire", duration:"12:00", xp:80,  ytId:"oXQjC-J2AtQ", subject:"personnages",  thumbIcon:"👧" },
  { id:9,  title:"3 glaces gourmandes",                desc:"Trois cônes de glace à dessiner et colorier, avec plein de saveurs.",                                     level:"intermediaire", duration:"11:00", xp:80,  ytId:"Wqfr402H0es", subject:"nourriture",   thumbIcon:"🍧" },
  { id:10, title:"Une école toute mignonne",           desc:"Dessine ton école kawaii avec ses fenêtres, son toit et sa cloche.",                                      level:"intermediaire", duration:"13:00", xp:90,  ytId:"cFODURnIVk8", subject:"architecture", thumbIcon:"🏫" },
  { id:11, title:"Kuromi de Sanrio",                   desc:"Apprends à dessiner Kuromi, le personnage tout noir et rose, étape par étape.",                            level:"intermediaire", duration:"14:00", xp:100, ytId:"mrXI9G1AX6k", subject:"personnages",  thumbIcon:"🐰" },
  { id:12, title:"Un paysage de village",              desc:"Dessine un village avec ses maisons, ses arbres et ses montagnes au loin.",                               level:"intermediaire", duration:"15:00", xp:100, ytId:"ismKo59Ub0c", subject:"nature",       thumbIcon:"🏠" },

  // EXPERT — scènes complexes, plusieurs personnages
  { id:13, title:"Bluey et sa famille",                desc:"Dessine toute la famille Bluey : Bluey, Bingo, Bandit et Chilli.",                                        level:"expert",       duration:"20:00", xp:150, ytId:"_82G6E4TXcU", subject:"personnages",  thumbIcon:"🐶" },
  { id:14, title:"Bluey et Bingo se brossent les dents",desc:"Une scène amusante avec Bluey, Bingo et leur licorne. Plein de détails à reproduire.",                  level:"expert",       duration:"22:00", xp:170, ytId:"smGc5UObMCY", subject:"personnages",  thumbIcon:"🪥" },
  { id:15, title:"Rumi, Mira et Zoey – K-pop Demon Hunters", desc:"Le défi ultime : dessine les 3 héroïnes de HUNTRIX avec leurs tenues détaillées.",                  level:"expert",       duration:"28:00", xp:200, ytId:"ZQbiHDTHpWw", subject:"personnages",  thumbIcon:"👩‍🎤" },

  // ── DÉBUTANT — autres chaînes kawaii (Dessins Kawaii, Pollux Animation) ──
  { id:16, title:"Un cœur kawaii facile",              desc:"Le grand classique pour démarrer : un cœur tout mignon en 2 minutes.",                                   level:"debutant",      duration:"4:00",  xp:20,  ytId:"eINRMC7KR_Q", subject:"kawaii",       thumbIcon:"💗" },
  { id:17, title:"Un panda kawaii",                    desc:"Dessine ce panda noir et blanc trop mignon, super facile à reproduire.",                                  level:"debutant",      duration:"5:00",  xp:20,  ytId:"zxvfWkkEAM0", subject:"animaux",       thumbIcon:"🐼" },
  { id:18, title:"Un chaton kawaii",                   desc:"Le chaton kawaii par excellence : petit, rond et adorable.",                                              level:"debutant",      duration:"6:00",  xp:30,  ytId:"tYgvWnyUwYs", subject:"animaux",       thumbIcon:"🐱" },
  { id:19, title:"Un lapin kawaii",                    desc:"Un lapin tout doux à dessiner étape par étape, parfait pour s'entraîner.",                                level:"debutant",      duration:"6:00",  xp:30,  ytId:"FtFKBM5lSE8", subject:"animaux",       thumbIcon:"🐰" },
  { id:20, title:"Un pot de Nutella kawaii",           desc:"Le pot de Nutella version super mignonne. Miam !",                                                        level:"debutant",      duration:"7:00",  xp:30,  ytId:"0bOum5V3nF8", subject:"nourriture",   thumbIcon:"🍫" },
  { id:21, title:"Un Kinder Surprise kawaii",          desc:"L'œuf Kinder qu'on adore, transformé en dessin kawaii facile.",                                           level:"debutant",      duration:"7:00",  xp:30,  ytId:"mtYe9qVKfio", subject:"nourriture",   thumbIcon:"🥚" },
  { id:22, title:"Une part de pastèque kawaii",        desc:"Fruit d'été en mode kawaii : ultra simple et trop choupi.",                                               level:"debutant",      duration:"5:00",  xp:20,  ytId:"zYOsBE7iHOU", subject:"nourriture",   thumbIcon:"🍉" },
  { id:23, title:"Une brique de lait kawaii",          desc:"Un classique de la cuisine version dessin mignon. Idéal pour débuter.",                                   level:"debutant",      duration:"6:00",  xp:30,  ytId:"UFfpCAcfrmo", subject:"nourriture",   thumbIcon:"🥛" },
  { id:24, title:"Une guimauve kawaii",                desc:"Toute douce et toute moelleuse — la guimauve la plus mignonne à dessiner.",                               level:"debutant",      duration:"6:00",  xp:30,  ytId:"rjhJGOvME9Q", subject:"nourriture",   thumbIcon:"🍡" },
  { id:25, title:"Une licorne kawaii",                 desc:"Une autre licorne mignonne, dans un style légèrement différent.",                                         level:"debutant",      duration:"7:00",  xp:30,  ytId:"_R5WR0Cjfwo", subject:"animaux",       thumbIcon:"🦄" },

  // ── INTERMÉDIAIRE — personnages plus détaillés, animaux complexes ──
  { id:26, title:"Une fille kawaii facile",            desc:"Apprends à dessiner une fille mignonne avec ses cheveux et son expression.",                              level:"intermediaire", duration:"10:00", xp:70,  ytId:"3crpkLLKqJ0", subject:"personnages",  thumbIcon:"👧" },
  { id:27, title:"Une poupée kawaii",                  desc:"Une poupée toute mignonne avec robe et accessoires : un peu plus de détails.",                            level:"intermediaire", duration:"12:00", xp:80,  ytId:"IqMCwDJ-Btc", subject:"personnages",  thumbIcon:"🎀" },
  { id:28, title:"Maquillage kawaii",                  desc:"Dessine un visage avec un maquillage kawaii : rouge à lèvres, fard, blush.",                              level:"intermediaire", duration:"10:00", xp:70,  ytId:"6Ur1P8EtAVg", subject:"personnages",  thumbIcon:"💄" },
  { id:29, title:"Un chat licorne kawaii",             desc:"Mélange parfait : un chat avec une corne de licorne et un arc-en-ciel.",                                  level:"intermediaire", duration:"10:00", xp:70,  ytId:"OC34XoUvbf8", subject:"animaux",       thumbIcon:"🐱" },
  { id:30, title:"Un panda licorne kawaii",            desc:"Encore mieux : un panda avec une corne de licorne. Hybridation extrême !",                                level:"intermediaire", duration:"11:00", xp:80,  ytId:"tj5vxHREF2w", subject:"animaux",       thumbIcon:"🐼" },
  { id:31, title:"Hamster Hamtaro kawaii",             desc:"Dessine Hamtaro, le hamster le plus mignon du dessin animé.",                                             level:"intermediaire", duration:"12:00", xp:80,  ytId:"xNtB2_FBv-s", subject:"personnages",  thumbIcon:"🐹" },
  { id:32, title:"Un renard des forêts",               desc:"Un renard roux trop mignon, dans un style un peu plus illustratif.",                                      level:"intermediaire", duration:"11:00", xp:80,  ytId:"bDYxwVJqBHM", subject:"animaux",       thumbIcon:"🦊" },

  // ── EXPERT — compilations & projets ──
  { id:33, title:"10 dessins kawaii faciles",          desc:"Compilation de 10 mini-dessins kawaii à enchaîner. Le défi parfait pour s'entraîner.",                    level:"expert",       duration:"15:00", xp:130, ytId:"uPEcTz1zKek", subject:"coloriage",    thumbIcon:"✨" },
  { id:34, title:"10 petits dessins par Rizzo Chris",  desc:"10 dessins kawaii originaux à dessiner d'affilée. Pour devenir un pro du kawaii.",                        level:"expert",       duration:"18:00", xp:150, ytId:"P1PZE467ovg", subject:"coloriage",    thumbIcon:"🎨" },

  // ── DÉBUTANT — encore plus d'animaux, food, nature, magie ──
  { id:35, title:"Un cochon kawaii",                   desc:"Petit cochon tout rose et tout rond — facile et super mignon.",                                            level:"debutant",      duration:"5:00",  xp:20,  ytId:"UbAp5TnDZ1k", subject:"animaux",       thumbIcon:"🐷" },
  { id:36, title:"Un pingouin kawaii",                 desc:"Dessine ce petit pingouin tout doux, étape par étape.",                                                   level:"debutant",      duration:"6:00",  xp:30,  ytId:"IiPT1R8kuKs", subject:"animaux",       thumbIcon:"🐧" },
  { id:37, title:"Un dauphin kawaii",                  desc:"Le dauphin le plus mignon des océans, facile à dessiner.",                                                 level:"debutant",      duration:"6:00",  xp:30,  ytId:"TXsPFrH5_1w", subject:"animaux",       thumbIcon:"🐬" },
  { id:38, title:"Un cactus kawaii",                   desc:"Petit cactus tout vert avec un visage trop mignon — parfait pour décorer ton cahier.",                    level:"debutant",      duration:"5:00",  xp:20,  ytId:"fhSsmn1_ByQ", subject:"nature",       thumbIcon:"🌵" },
  { id:39, title:"Un donut kawaii",                    desc:"Un beignet glacé tout sucré et tout mignon. Miam !",                                                       level:"debutant",      duration:"6:00",  xp:30,  ytId:"Ogc2Q5BF6PA", subject:"nourriture",   thumbIcon:"🍩" },
  { id:40, title:"Une fraise kawaii",                  desc:"Petite fraise rouge avec un visage tout choupi.",                                                          level:"debutant",      duration:"5:00",  xp:20,  ytId:"E5sdmqlzEzY", subject:"nourriture",   thumbIcon:"🍓" },
  { id:41, title:"Un nuage kawaii",                    desc:"Nuage tout doux avec un petit visage souriant.",                                                           level:"debutant",      duration:"4:00",  xp:20,  ytId:"9sm5btMecL0", subject:"kawaii",       thumbIcon:"☁️" },
  { id:42, title:"Une lune et une étoile kawaii",      desc:"La lune et l'étoile les plus mignonnes du ciel.",                                                          level:"debutant",      duration:"5:00",  xp:20,  ytId:"Vbo5kWnTQzI", subject:"kawaii",       thumbIcon:"🌙" },

  // ── INTERMÉDIAIRE — saisons & personnages célèbres ──
  { id:43, title:"Citrouille Halloween kawaii",        desc:"Une citrouille d'Halloween toute mignonne, plus choupie qu'effrayante.",                                   level:"intermediaire", duration:"10:00", xp:70,  ytId:"WXLs6goaotw", subject:"kawaii",       thumbIcon:"🎃" },
  { id:44, title:"Un sapin de Noël kawaii",            desc:"Beau sapin de Noël décoré avec boules, étoile et guirlandes.",                                             level:"intermediaire", duration:"11:00", xp:80,  ytId:"UnDpXJNC0GM", subject:"kawaii",       thumbIcon:"🎄" },
  { id:45, title:"Pikachu kawaii",                     desc:"Le Pokémon le plus célèbre version super mignonne.",                                                       level:"intermediaire", duration:"12:00", xp:80,  ytId:"v3mm20Po7Fo", subject:"personnages",  thumbIcon:"⚡" },
  { id:46, title:"Carapuce kawaii",                    desc:"Apprends à dessiner Carapuce (Squirtle), la petite tortue d'eau de Pokémon.",                              level:"intermediaire", duration:"11:00", xp:80,  ytId:"LYUF506x3G4", subject:"personnages",  thumbIcon:"🐢" },

  // ── EXPERT — gros défis avec détails et accessoires ──
  { id:47, title:"Ariel la Petite Sirène kawaii",      desc:"Dessine Ariel avec ses cheveux roux flottants et son grand sourire.",                                      level:"expert",       duration:"18:00", xp:150, ytId:"Fghu8cxAb5Y", subject:"personnages",  thumbIcon:"🧜" },
  { id:48, title:"Une princesse Disney kawaii",        desc:"Dessine une princesse Disney avec robe et couronne — pleine de détails.",                                  level:"expert",       duration:"20:00", xp:170, ytId:"0noUEr6W6OM", subject:"personnages",  thumbIcon:"👸" },
  { id:49, title:"10 dessins Halloween faciles",       desc:"Compilation de 10 dessins Halloween : citrouille, vampire, araignée, chauve-souris...",                   level:"expert",       duration:"15:00", xp:130, ytId:"vXUOZzd0SkI", subject:"coloriage",    thumbIcon:"🦇" },

  // ═══ BIG WAVE — 50 tutos supplémentaires pour atteindre 100 ═══

  // ── DÉBUTANT — animaux faciles ──
  { id:50, title:"Un koala kawaii",                    desc:"Petit koala tout gris accroché à sa branche.",                                                             level:"debutant",      duration:"6:00",  xp:30,  ytId:"fSaHkUqNo0k", subject:"animaux",       thumbIcon:"🐨" },
  { id:51, title:"Un chien kawaii facile",             desc:"Un chien tout mignon à dessiner en quelques minutes.",                                                     level:"debutant",      duration:"5:00",  xp:20,  ytId:"QOzO4Knm840", subject:"animaux",       thumbIcon:"🐶" },
  { id:52, title:"Un ours kawaii",                     desc:"Gros nounours kawaii tout doux.",                                                                          level:"debutant",      duration:"6:00",  xp:30,  ytId:"lgk7qSSe8_o", subject:"animaux",       thumbIcon:"🐻" },
  { id:53, title:"Un paresseux kawaii",                desc:"Le paresseux le plus mignon de la jungle, accroché à sa branche.",                                         level:"debutant",      duration:"7:00",  xp:30,  ytId:"qEPlatJmU1w", subject:"animaux",       thumbIcon:"🦥" },
  { id:54, title:"Un oiseau kawaii",                   desc:"Petit oiseau tout mignon avec son bec et ses petites ailes.",                                              level:"debutant",      duration:"5:00",  xp:20,  ytId:"BBjEHxskvII", subject:"animaux",       thumbIcon:"🐦" },
  { id:55, title:"Une tortue de mer kawaii",           desc:"Petite tortue verte qui nage dans l'océan.",                                                               level:"debutant",      duration:"6:00",  xp:30,  ytId:"WyCR0P7andM", subject:"animaux",       thumbIcon:"🐢" },
  { id:56, title:"Une baleine kawaii",                 desc:"Grosse baleine bleue toute mignonne qui souffle de l'eau.",                                                level:"debutant",      duration:"6:00",  xp:30,  ytId:"5KgD_4L5Gh0", subject:"animaux",       thumbIcon:"🐳" },
  { id:57, title:"Un poisson kawaii",                  desc:"Petit poisson coloré tout simple à dessiner.",                                                             level:"debutant",      duration:"5:00",  xp:20,  ytId:"1tUShLqwsJg", subject:"animaux",       thumbIcon:"🐠" },
  { id:58, title:"Un autre dauphin kawaii",            desc:"Un dauphin dans un style différent, encore plus simple.",                                                  level:"debutant",      duration:"6:00",  xp:30,  ytId:"ciObTeHWPBk", subject:"animaux",       thumbIcon:"🐬" },
  { id:59, title:"Un chien mignon",                    desc:"Un autre chien kawaii, à toi de choisir ton préféré.",                                                     level:"debutant",      duration:"6:00",  xp:30,  ytId:"MyfJXx7RKLU", subject:"animaux",       thumbIcon:"🐕" },

  // ── DÉBUTANT — gourmandises ──
  { id:60, title:"Un gâteau kawaii",                   desc:"Un gros gâteau d'anniversaire tout mignon avec bougies.",                                                  level:"debutant",      duration:"7:00",  xp:30,  ytId:"zjxTrbHPRKQ", subject:"nourriture",   thumbIcon:"🎂" },
  { id:61, title:"Un cupcake kawaii",                  desc:"Le cupcake le plus sucré du monde, avec crème et cerise.",                                                 level:"debutant",      duration:"6:00",  xp:30,  ytId:"K6-4ftpOtLo", subject:"nourriture",   thumbIcon:"🧁" },
  { id:62, title:"Une tarte kawaii",                   desc:"Une jolie tarte avec décors mignons sur le dessus.",                                                       level:"debutant",      duration:"6:00",  xp:30,  ytId:"OtJU0g2QyZU", subject:"nourriture",   thumbIcon:"🥧" },
  { id:63, title:"Une banane kawaii",                  desc:"Banane jaune toute souriante.",                                                                            level:"debutant",      duration:"4:00",  xp:20,  ytId:"F1MWcSPc4xY", subject:"nourriture",   thumbIcon:"🍌" },
  { id:64, title:"Une pomme kawaii",                   desc:"Pomme rouge avec une petite feuille verte.",                                                               level:"debutant",      duration:"5:00",  xp:20,  ytId:"4YoRT7IhHiI", subject:"nourriture",   thumbIcon:"🍎" },
  { id:65, title:"Des cerises kawaii",                 desc:"Deux cerises bien rouges avec leur petite tige.",                                                          level:"debutant",      duration:"5:00",  xp:20,  ytId:"YcViv3nE1ao", subject:"nourriture",   thumbIcon:"🍒" },
  { id:66, title:"Un autre donut kawaii",              desc:"Un autre style de donut, avec encore plus de paillettes.",                                                 level:"debutant",      duration:"6:00",  xp:30,  ytId:"2k3wpnQQeP0", subject:"nourriture",   thumbIcon:"🍩" },
  { id:67, title:"Une autre pomme facile",             desc:"Variante simple et rapide pour dessiner une pomme.",                                                       level:"debutant",      duration:"4:00",  xp:20,  ytId:"hPlFi-OLC_U", subject:"nourriture",   thumbIcon:"🍏" },
  { id:68, title:"Un gland kawaii",                    desc:"Petit gland tout choupi pour l'automne.",                                                                  level:"debutant",      duration:"5:00",  xp:20,  ytId:"2R_zRcLo8Oo", subject:"nourriture",   thumbIcon:"🌰" },
  { id:69, title:"Une autre cerise kawaii",            desc:"Une cerise version encore plus simple.",                                                                   level:"debutant",      duration:"4:00",  xp:20,  ytId:"cyfFair2yL0", subject:"nourriture",   thumbIcon:"🍒" },

  // ── DÉBUTANT — kawaii nature & magie ──
  { id:70, title:"Une plante kawaii en pot",           desc:"Belle plante verte dans son pot, avec un petit visage souriant.",                                          level:"debutant",      duration:"6:00",  xp:30,  ytId:"KPuzv-K1bS0", subject:"nature",       thumbIcon:"🌱" },
  { id:71, title:"Un arc-en-ciel facile",              desc:"Le plus simple des arcs-en-ciel, parfait pour démarrer.",                                                  level:"debutant",      duration:"4:00",  xp:20,  ytId:"yGGy0jISwaI", subject:"kawaii",       thumbIcon:"🌈" },
  { id:72, title:"Un autre nuage kawaii",              desc:"Variante encore plus mignonne du nuage.",                                                                  level:"debutant",      duration:"4:00",  xp:20,  ytId:"2cpB02ZSCHE", subject:"kawaii",       thumbIcon:"☁️" },

  // ── INTERMÉDIAIRE — animaux complexes & food ──
  { id:73, title:"Un requin-baleine kawaii",           desc:"Le plus grand poisson du monde version mignonne.",                                                         level:"intermediaire", duration:"10:00", xp:70,  ytId:"EpcT-PTJe4o", subject:"animaux",       thumbIcon:"🦈" },
  { id:74, title:"Un requin-marteau kawaii",           desc:"Requin-marteau original avec sa drôle de tête.",                                                           level:"intermediaire", duration:"11:00", xp:80,  ytId:"41RG92ulm5w", subject:"animaux",       thumbIcon:"🔨" },
  { id:75, title:"3 animaux marins ensemble",          desc:"Dauphin, tortue et pieuvre dans la même scène océanique.",                                                 level:"intermediaire", duration:"14:00", xp:100, ytId:"HHAsIoyO9WI", subject:"animaux",       thumbIcon:"🌊" },
  { id:76, title:"Un ours koala mignon",               desc:"Version plus détaillée du koala avec sa branche d'eucalyptus.",                                            level:"intermediaire", duration:"10:00", xp:70,  ytId:"DpkCjleqqDw", subject:"animaux",       thumbIcon:"🐨" },
  { id:77, title:"Un bébé chaton siamois",             desc:"Petit chaton siamois avec ses oreilles et ses pattes.",                                                    level:"intermediaire", duration:"11:00", xp:80,  ytId:"0VlaUjn6u2E", subject:"animaux",       thumbIcon:"🐱" },

  // ── INTERMÉDIAIRE — Pokémon & personnages ──
  { id:78, title:"Pikachu version classique",          desc:"La version traditionnelle de Pikachu, avec sa pose iconique.",                                             level:"intermediaire", duration:"12:00", xp:80,  ytId:"d5krobDJt7Y", subject:"personnages",  thumbIcon:"⚡" },
  { id:79, title:"Pikachu kawaii alternatif",          desc:"Encore une version de Pikachu, dans un style différent.",                                                  level:"intermediaire", duration:"10:00", xp:70,  ytId:"ztVFQ_h1hoY", subject:"personnages",  thumbIcon:"⚡" },
  { id:80, title:"Pikachu super mignon",               desc:"Pikachu chibi tout petit et tout rond.",                                                                   level:"intermediaire", duration:"10:00", xp:70,  ytId:"rq0vZnEO7_A", subject:"personnages",  thumbIcon:"💛" },
  { id:81, title:"Bulbizarre kawaii",                  desc:"Le Pokémon plante avec son bulbe sur le dos.",                                                             level:"intermediaire", duration:"11:00", xp:80,  ytId:"e6hONjS2ogs", subject:"personnages",  thumbIcon:"🌿" },
  { id:82, title:"Carapuce facile",                    desc:"Variante simple de Carapuce, parfait pour s'entraîner.",                                                   level:"intermediaire", duration:"10:00", xp:70,  ytId:"WYqbc4XB96k", subject:"personnages",  thumbIcon:"🐢" },
  { id:83, title:"Bulbizarre & Tiplouf",               desc:"Deux Pokémon mignons dans un seul tuto.",                                                                  level:"intermediaire", duration:"13:00", xp:90,  ytId:"btbJZxRMZxw", subject:"personnages",  thumbIcon:"🌱" },
  { id:84, title:"Sirène kawaii",                      desc:"Sirène mignonne avec sa queue colorée.",                                                                   level:"intermediaire", duration:"12:00", xp:80,  ytId:"ee6XDsgeoUQ", subject:"personnages",  thumbIcon:"🧜" },

  // ── INTERMÉDIAIRE — kawaii & arc-en-ciel ──
  { id:85, title:"Un arc-en-ciel kawaii détaillé",     desc:"Arc-en-ciel avec nuages, paillettes et plein de couleurs.",                                                level:"intermediaire", duration:"10:00", xp:70,  ytId:"xRNGqNhf27M", subject:"kawaii",       thumbIcon:"🌈" },
  { id:86, title:"Nuage qui vomit un arc-en-ciel",     desc:"Dessin drôle et original : un nuage qui crache un arc-en-ciel.",                                          level:"intermediaire", duration:"11:00", xp:80,  ytId:"4k1a6T537B4", subject:"kawaii",       thumbIcon:"🌧️" },
  { id:87, title:"Arc-en-ciel à colorier",             desc:"Tuto coloriage complet d'un arc-en-ciel avec dégradés.",                                                   level:"intermediaire", duration:"12:00", xp:80,  ytId:"dO8yeIhYkOg", subject:"coloriage",    thumbIcon:"🖍️" },
  { id:88, title:"Arc-en-ciel coloriage magique",      desc:"Coloriage magique d'un arc-en-ciel mignon.",                                                               level:"intermediaire", duration:"13:00", xp:90,  ytId:"jZZK-1TX5is", subject:"coloriage",    thumbIcon:"✨" },

  // ── INTERMÉDIAIRE — Halloween & Noël ──
  { id:89, title:"Citrouille avec fantômes Doodle",    desc:"Citrouille d'Halloween entourée de petits fantômes mignons.",                                              level:"intermediaire", duration:"12:00", xp:80,  ytId:"Yw0HZbstBjM", subject:"kawaii",       thumbIcon:"👻" },
  { id:90, title:"Une chauve-souris mignonne",         desc:"Petite chauve-souris kawaii pour Halloween.",                                                              level:"intermediaire", duration:"10:00", xp:70,  ytId:"0GTCOmpQcZs", subject:"kawaii",       thumbIcon:"🦇" },
  { id:91, title:"Père Noël kawaii",                   desc:"Le Père Noël en version super mignonne avec sa hotte.",                                                    level:"intermediaire", duration:"12:00", xp:80,  ytId:"3zJIJukV7Yk", subject:"personnages",  thumbIcon:"🎅" },
  { id:92, title:"Père Noël facile",                   desc:"Variante simplifiée du Père Noël avec moins de détails.",                                                  level:"intermediaire", duration:"10:00", xp:70,  ytId:"ca8_3BU9E30", subject:"personnages",  thumbIcon:"🎅" },
  { id:93, title:"Un autre sapin de Noël",             desc:"Sapin de Noël avec un style différent, encore plus décoré.",                                               level:"intermediaire", duration:"11:00", xp:80,  ytId:"W8CY-PMOMYA", subject:"kawaii",       thumbIcon:"🎄" },
  { id:94, title:"Coloriage Halloween complet",        desc:"Citrouille, fantôme et chauves-souris dans une scène Halloween.",                                          level:"intermediaire", duration:"13:00", xp:90,  ytId:"D-x4OyBg6cg", subject:"coloriage",    thumbIcon:"🎃" },

  // ── INTERMÉDIAIRE — objets & véhicules ──
  { id:95, title:"Une fusée kawaii",                   desc:"Petite fusée toute mignonne prête à décoller.",                                                            level:"intermediaire", duration:"10:00", xp:70,  ytId:"OQOdh1bWv0g", subject:"objets",       thumbIcon:"🚀" },

  // ── EXPERT — Disney & projets longs ──
  { id:96, title:"Ariel Disney officiel",              desc:"Variante de la Petite Sirène fidèle au style Disney.",                                                     level:"expert",       duration:"20:00", xp:170, ytId:"cd5H08w1Rpg", subject:"personnages",  thumbIcon:"🧜‍♀️" },
  { id:97, title:"Princesse Disney facile",            desc:"Une autre princesse Disney avec robe et coiffure.",                                                        level:"expert",       duration:"18:00", xp:150, ytId:"x7khyVPKPiw", subject:"personnages",  thumbIcon:"👑" },
  { id:98, title:"Chibi démon Halloween",              desc:"Personnage chibi version démon avec cornes, pour les défis avancés.",                                      level:"expert",       duration:"16:00", xp:140, ytId:"FgFfg_O6tb8", subject:"personnages",  thumbIcon:"😈" },
  { id:99, title:"Étoile arc-en-ciel pixel art",       desc:"Le défi ultime : pixel art à la main d'une étoile arc-en-ciel kawaii.",                                    level:"expert",       duration:"22:00", xp:180, ytId:"KB2gS6o1Tx8", subject:"coloriage",    thumbIcon:"⭐" },
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
  if(name==='draw')requestAnimationFrame(initCanvas);
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
  frame.src=`https://www.youtube.com/embed/${t.ytId}?rel=0&modestbranding=1&playsinline=1`;
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
  if(wrap.clientWidth===0){requestAnimationFrame(initCanvas);return;}
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
