const https = require('https');

const token = 'patKMig4Cnzdgwqs9.e5fcf1a5e7d06b23573b5584c4fd8f37e608bfc97cbe2a350a94036ed633eacc';
const baseId = 'app6TseIO7Sx4fJqv';

const posts = [
  { "Nom du post": "Post 1 — Lancement Anouck", "Phase": "Annonce", "Période": "Fin avril 2026", "Plateforme": "Facebook + Instagram", "Thème": "Renaissance + Anouck", "Angle": "Annonce de la réouverture avec Anouck comme fil rouge", "Visuel": "Belle photo d'Anouck au Col de Jaman ou en montagne", "Texte suggéré": "L'année dernière, une petite Saint-Bernard de 2 mois a débarqué au Col de Jaman. Elle s'appelle Anouck. Le Manoïre est devenu son premier terrain de jeu, son royaume, son premier chez-elle. Aujourd'hui, son maître reprend Le Manoïre. Les travaux vont bientôt commencer. Et Anouck reviendra avec lui. Le Manoïre renaît. Notre nom, notre âme, notre terrasse avec vue sur les Alpes. Réouverture fin juin. L'aventure commence maintenant. 🐾 📍 Col de Jaman Montreux", "Hashtags": "#LeManoire #ColDeJaman #Montreux #SaintBernard", "Statut": "Prêt à publier" },
  { "Nom du post": "Post 2 — Le lieu", "Phase": "Annonce", "Période": "Début mai 2026", "Plateforme": "Facebook + Instagram", "Thème": "Présentation du cadre", "Angle": "1500m d'altitude la terrasse la vue sur les Alpes", "Visuel": "Photo panoramique terrasse / vue montagnes", "Texte suggéré": "Il y a des endroits qui font du bien rien qu'en les regardant. Le Col de Jaman c'est l'un d'eux. On vous prépare quelque chose. 🏔️", "Hashtags": "#LeManoire #ColDeJaman #AlpageMontreux #Montagne", "Statut": "À rédiger" },
  { "Nom du post": "Post 3 — Le nom", "Phase": "Annonce", "Période": "Début mai 2026", "Plateforme": "Facebook + Instagram", "Thème": "Retour au nom originel", "Angle": "Un nom une histoire un retour aux racines", "Visuel": "Photo façade / entrée / panneau du restaurant", "Texte suggéré": "Le Manoïre. C'est son vrai nom. Celui d'avant. On le reprend. On le porte fièrement. Retour aux origines — fin juin 2026. 🤍", "Hashtags": "#LeManoire #Retour #Renaissance", "Statut": "À rédiger" },
  { "Nom du post": "Post 4 — Coup d'envoi travaux", "Phase": "Travaux", "Période": "Mi-mai 2026", "Plateforme": "Facebook + Instagram", "Thème": "Début des travaux", "Angle": "Coulisses chantier avant/pendant", "Visuel": "Photo chantier qui démarre", "Texte suggéré": "Les marteaux sont sortis. Le Manoïre se refait une beauté. Anouck supervise les travaux. Rapport de chantier à suivre. 🐾🔨", "Hashtags": "#LeManoire #Travaux #Chantier #BientotOuvert", "Statut": "À rédiger" },
  { "Nom du post": "Post 5 — Anouck en action", "Phase": "Travaux", "Période": "Mi-mai 2026", "Plateforme": "Facebook + Instagram", "Thème": "Anouck mascotte du chantier", "Angle": "Humour — elle inspecte les travaux", "Visuel": "Photo Anouck sur le chantier ou dans le restaurant vide", "Texte suggéré": "Rapport d'inspection du jour. Anouck a tout vérifié. Elle approuve. (Elle a aussi mangé un gant de travail mais c'est un détail.) 🐾", "Hashtags": "#Anouck #SaintBernard #LeManoire #ChefDeChantier", "Statut": "À rédiger" },
  { "Nom du post": "Post 6 — Le terroir", "Phase": "Travaux", "Période": "Fin mai 2026", "Plateforme": "Facebook + Instagram", "Thème": "Cuisine et producteurs locaux", "Angle": "Ce qu'on va trouver dans l'assiette", "Visuel": "Photo produits locaux fromage charcuterie alpage", "Texte suggéré": "À 1 500m on ne plaisante pas avec la qualité. Producteurs locaux saveurs du terroir cuisine généreuse. C'est ce qui vous attend. 🧀🍷", "Hashtags": "#Terroir #Suisse #Alpage #CuisineLocale #LeManoire", "Statut": "À rédiger" },
  { "Nom du post": "Post 7 — Avancement travaux", "Phase": "Travaux", "Période": "Fin mai 2026", "Plateforme": "Facebook + Instagram", "Thème": "Point d'étape — ça avance", "Angle": "Avant/après ou détail de rénovation", "Visuel": "Photo espace rénové ou en cours", "Texte suggéré": "Semaine X de travaux. Ça prend forme. La terrasse commence à nous faire de l'œil. ☀️ Rendez-vous fin juin !", "Hashtags": "#LeManoire #Travaux #BientotPret", "Statut": "À rédiger" },
  { "Nom du post": "Post 8 — L'équipe", "Phase": "Countdown", "Période": "Début juin 2026", "Plateforme": "Facebook + Instagram", "Thème": "Présentation équipe", "Angle": "Les visages derrière Le Manoïre", "Visuel": "Photo équipe ou propriétaire sur place", "Texte suggéré": "À rédiger avec le propriétaire", "Hashtags": "#LeManoire #Equipe #Montreux", "Statut": "À rédiger" },
  { "Nom du post": "Post 9 — J-15", "Phase": "Countdown", "Période": "Mi-juin 2026", "Plateforme": "Facebook + Instagram", "Thème": "Compte à rebours J-15", "Angle": "L'excitation monte plus que 15 jours", "Visuel": "Photo terrasse prête vue sur les Alpes soleil", "Texte suggéré": "J-15. La terrasse est prête. Les assiettes aussi. Anouck aussi. Et vous ? 🐾☀️", "Hashtags": "#LeManoire #Bientot #JMoins15", "Statut": "À rédiger" },
  { "Nom du post": "Post 10 — J-3 Teaser ouverture", "Phase": "Countdown", "Période": "Fin juin 2026", "Plateforme": "Facebook + Instagram", "Thème": "Dernière ligne droite J-3", "Angle": "Impatience émotion on y est presque", "Visuel": "Photo Anouck devant le restaurant prêt", "Texte suggéré": "Dans 3 jours les portes s'ouvrent. On a tellement hâte de vous accueillir. Le Manoïre vous attend. 🏔️🤍", "Hashtags": "#LeManoire #JMoins3 #Ouverture", "Statut": "À rédiger" },
  { "Nom du post": "Post 11 — OUVERTURE", "Phase": "Countdown", "Période": "Fin juin 2026", "Plateforme": "Facebook + Instagram", "Thème": "Jour J — ouverture officielle", "Angle": "Célébration émotion invitation à venir", "Visuel": "Photo restaurant plein de vie terrasse Anouck", "Texte suggéré": "Aujourd'hui Le Manoïre ouvre ses portes. La montagne le terroir la vue — et Anouck qui accueille tout le monde. On vous attend. Col de Jaman Montreux. 🐾🏔️🍽️", "Hashtags": "#LeManoire #Ouverture #ColDeJaman #Montreux", "Statut": "À rédiger" }
];

const tableData = JSON.stringify({
  description: "Importé depuis le CSV du Calendrier de posts Notion",
  fields: [
    { name: "Nom du post", type: "singleLineText" },
    { name: "Phase", type: "singleLineText" },
    { name: "Période", type: "singleLineText" },
    { name: "Plateforme", type: "singleLineText" },
    { name: "Thème", type: "singleLineText" },
    { name: "Angle", type: "singleLineText" },
    { name: "Visuel", type: "singleLineText" },
    { name: "Texte suggéré", type: "multilineText" },
    { name: "Hashtags", type: "singleLineText" },
    { name: "Statut", type: "singleLineText" }
  ],
  name: "Calendrier des posts"
});

function request(options, data) {
  return new Promise((resolve, reject) => {
    const req = https.request(options, (res) => {
      let body = '';
      res.on('data', d => body += d);
      res.on('end', () => resolve(JSON.parse(body)));
    });
    req.on('error', reject);
    if (data) req.write(data);
    req.end();
  });
}

async function run() {
  try {
    console.log("Création de la table...");
    const tableRes = await request({
      hostname: 'api.airtable.com',
      path: `/v0/meta/bases/${baseId}/tables`,
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    }, tableData);

    if (tableRes.error) {
      console.error("Erreur de création de la table:", tableRes.error);
      return;
    }
    
    const tableId = tableRes.id;
    console.log(`Table créée avec succès ! ID: ${tableId}`);

    console.log("Insertion des 11 enregistrements...");
    
    // Convertir au format Airtable { records: [ { fields: { ... } } ] }
    const records = posts.map(p => ({ fields: p }));
    
    // On peut envoyer par lot de 10 max
    const batch1 = { records: records.slice(0, 10) };
    const batch2 = { records: records.slice(10) };

    const insertOptions = {
      hostname: 'api.airtable.com',
      path: `/v0/${baseId}/${tableId}`,
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    };

    const res1 = await request(insertOptions, JSON.stringify(batch1));
    if (res1.error) console.error("Erreur batch 1:", res1.error);
    else console.log("Batch 1 inséré !");

    const res2 = await request(insertOptions, JSON.stringify(batch2));
    if (res2.error) console.error("Erreur batch 2:", res2.error);
    else console.log("Batch 2 inséré !");

    console.log("Terminé avec succès !");
  } catch (err) {
    console.error("Erreur fatale:", err);
  }
}

run();
