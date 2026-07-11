# Construis ton site cinématique IA avec Claude Code — Le Guide

> Tu vas apprendre à **piloter Claude Code** pour construire ET éditer un site web cinématique — un site où une vidéo IA (un vol de drone qui se rapproche, entre dans un lieu) se déroule au rythme de ton scroll, comme « Penthouse Horizon ». Adapté à **ton** business, avec **ta** charte graphique.

## L'esprit du kit (lis ça d'abord, c'est tout le truc)

**Tu ne codes pas. Tu diriges.**

Claude Code est ton équipe : un designer, un copywriter, un monteur vidéo, un développeur — réunis dans un terminal. Toi, tu es le **réalisateur**. Tu donnes la direction en français, tu regardes ce qui sort, tu valides ou tu corriges. Tu n'écris pas une ligne de code, tu n'ouvres pas Photoshop. **Tu parles, tu regardes, tu ajustes.**

Tout le kit tient sur **un mouvement répété** :

```
tu DEMANDES  →  Claude PRODUIT  →  tu REGARDES (porte de validation)  →  tu VALIDES ou tu CORRIGES
```

Et la dernière étape — l'étape 6 — c'est exactement ça à l'infini : tu **discutes** avec Claude Code pour changer ce que tu veux, autant de fois que tu veux. Une couleur, un mot, une section entière. En langage naturel.

Ce guide déroule les **6 étapes** du système (encadrées par une étape 0 — installer Claude Code — et une étape 7 optionnelle — mettre le site en ligne). À chaque étape : ce que tu **dis** à Claude Code, ce qu'il **produit**, et la **porte de validation** (le moment où tu t'arrêtes et tu regardes avant de continuer).

---

## Étape 0 — Installe Claude Code (le prérequis absolu)

> ### 🔴 Prérequis : Claude Code installé et ouvrable dans un terminal
> Tout ce kit pilote **Claude Code** — l'outil en ligne de commande d'Anthropic. Si tu ne l'as pas encore, c'est par là que tu commences, sinon tu es bloqué dès la ligne 1 de l'étape 1.

> ### 💻 Le plus simple pour débuter : l'APP DESKTOP (recommandé)
> Claude Code existe en **application desktop** (Mac/Windows), pas seulement en terminal. Pour un débutant c'est **plus simple** : interface graphique, éditeur de fichiers intégré, terminal intégré (Claude lance les commandes à ta place) et un **panneau de preview** pour voir ton site sans même ouvrir de navigateur. Tout le kit marche pareil (skills, fichiers, commandes, Git).
> - **Installe l'app desktop** depuis la page officielle, connecte ton compte Anthropic, puis **ouvre le dossier de ton site**. Tu parles à Claude dans la fenêtre — partout où ce guide dit « tape dans Claude Code », c'est ça.
> - **3 choses à savoir sur desktop :**
>   1. **Serveur local** : pour regarder le site, Claude lance un petit serveur le temps de vérifier (tu vois le rendu dans le preview intégré). Si tu fermes l'app, le serveur s'arrête — normal, on le relance à la demande. (Pas besoin d'un serveur permanent ici.)
>   2. **Google Flow + Seedance 2** : **rien à configurer** — on passe par les interfaces web de chaque outil dans ton navigateur. Tout se fait à la main, tu télécharges les fichiers et tu les donnes à Claude Code.
>   3. **ffmpeg + Node** doivent quand même être installés sur ta machine (Claude les utilise pour toi, mais ils doivent exister — voir étape 1.4).
> - **Préfères le terminal / la CLI ?** Tout marche aussi — suis les instructions « terminal » ci-dessous.

1. **Installe-le** depuis la doc officielle : [docs.anthropic.com/claude-code](https://docs.anthropic.com/en/docs/claude-code/overview) — **app desktop (le plus simple)** ou terminal. Suis la procédure de connexion à ton compte Anthropic indiquée sur la page.
   > 🔴 **Si tu passes par npm** (`npm install -g @anthropic-ai/claude-code`) : la commande `npm` **n'existe pas tant que Node.js n'est pas installé**. **Installe Node.js d'ABORD** (voir étape 1.4, ou directement [nodejs.org](https://nodejs.org)), **puis** lance la commande npm. Sinon tu auras l'erreur `npm : command not found` / `'npm' n'est pas reconnu`. Si la doc officielle propose un installeur natif (sans npm), c'est encore plus simple pour un débutant — prends-le.
2. **Ouvre un terminal** (macOS : *Terminal* · Windows : *PowerShell* ou *Windows Terminal* · Linux : ton émulateur) et tape :
   ```bash
   claude
   ```
   Si une session Claude Code démarre, tu es prêt. (Pour quitter : `/exit` ou Ctrl+C.)

**Porte de validation 0** : taper `claude` dans un terminal ouvre bien Claude Code. ✅ Tout le reste du guide se passe à l'intérieur de Claude Code, lancé **dans le dossier de ton site**.

> ### 🛠️ Ça coince à l'étape 0 ? (dépannage du tout premier mur)
> C'est le seul moment où tu n'as pas encore Claude Code pour t'aider — voici les ratés les plus courants :
> - **`npm : command not found` / `'npm' n'est pas reconnu`** → Node.js n'est pas installé (npm vient avec Node). Installe Node.js d'abord ([nodejs.org](https://nodejs.org) ou étape 1.4), **rouvre un nouveau terminal**, réessaie.
> - **`claude : command not found` / `'claude' n'est pas reconnu`** après une install qui « a marché » → le terminal ne voit pas encore la commande (problème de PATH). **Ferme et rouvre complètement ton terminal** (parfois ta session) : c'est le correctif n°1. Si ça persiste sous Windows, l'installeur natif (s'il est proposé sur la page officielle) évite ce souci.
> - **Erreur de permission `EACCES` au `npm install -g`** (mac/Linux) → ne lance **pas** `sudo` aveuglément ; suis plutôt la méthode recommandée par la page officielle (installeur natif ou config npm) — c'est plus propre.
> - **La connexion à ton compte Anthropic échoue** → vérifie que tu es bien connecté sur le bon compte dans ton navigateur, puis relance `claude`.
> - **Toujours bloqué ?** La doc officielle ([docs.anthropic.com/claude-code](https://docs.anthropic.com/en/docs/claude-code/overview)) a une section dépannage à jour — c'est la source de vérité pour l'install. Tant que `claude` ne s'ouvre pas, **inutile d'avancer** : tout le kit en dépend.

---

## Étape 1 — Installe ton terrain de jeu (à faire une seule fois)

But : avoir un Claude Code qui sait construire un site cinématique, et les 3-4 outils branchés. Honnête : c'est l'étape la plus « technique » du kit, mais c'est de l'installation, pas du code. Tu le fais une fois.

### 1.1 — Installe les 3 skills dans Claude Code

Le kit contient 3 skills (des « modes d'expertise » que Claude Code charge tout seul quand c'est le moment) :

- `cinematic-site-design` — le système de design (dark éditorial, adapté à ta charte)
- `cinematic-site-copywriting` — l'écriture des textes et la mise en page
- `cinematic-site-flythrough` — la fabrication de la vidéo IA (le cœur technique)

**Où les mettre** : chaque skill est un dossier contenant un fichier `SKILL.md`. Copie les 3 dossiers ici :

- **macOS / Linux** : `~/.claude/skills/`
- **Windows** : `C:\Users\<ton-nom>\.claude\skills\`

Résultat attendu :
```
.claude/skills/
├── cinematic-site-design/SKILL.md
├── cinematic-site-copywriting/SKILL.md
└── cinematic-site-flythrough/SKILL.md
```

Tu n'as **rien à activer** : Claude Code détecte les skills par leurs déclencheurs. Quand tu diras « écris le copy de mon site », le skill copywriting se charge tout seul.

> ### 🔴 Porte de validation skills (NE saute pas — c'est ton filet de sécurité)
> Tout le kit repose sur le fait que Claude Code **charge bien ces skills** : c'est eux qui portent la recette anti-morph. Si un skill est mal copié (mauvais dossier, frontmatter non lu), Claude **improvisera sans la recette** — et tu ne le verras pas. Pour le prouver, ouvre Claude Code **dans le dossier de ton site** et tape exactement :
>
> ```
> charge le skill cinematic-site-flythrough et résume-moi sa règle d'or
> ```
>
> ✅ **Réussi si** Claude cite la règle **image-to-image** : la frame de fin se génère à partir de la frame de départ (frame de départ en image de référence), **jamais en texte seul**, sinon morph. S'il répond une généralité vague, ne cite pas l'image-to-image, ou dit qu'il ne trouve pas le skill → **la détection a échoué**. Vérifie alors : (a) chaque skill est bien un dossier `nom-du-skill/SKILL.md` (le `SKILL.md` ne doit PAS être à la racine de `.claude/skills/`), (b) tu l'as copié au bon endroit (`~/.claude/skills/` mac/Linux, `C:\Users\<ton-nom>\.claude\skills\` Windows), (c) redémarre Claude Code. Re-teste jusqu'à ce que la règle d'or sorte. **Sans cette preuve, n'avance pas** : le reste du kit croit que les skills pilotent, alors qu'ils sont silencieusement désactivés.

### 1.2 — Installe le starter (le moteur du site)

Le kit contient un **starter** : le moteur « scroll-scrub » (le code qui fait défiler la vidéo au scroll), déjà écrit et nettoyé. Tu ne le modifies pas à la main — Claude Code s'en charge. Pose simplement le dossier starter là où tu veux construire ton site (ex. `~/sites/mon-site/`).

### 1.3 — Accède à Google Flow et Seedance 2 (la vidéo IA)

La vidéo IA du kit se fabrique avec **deux outils** que tu utilises déjà :

- **Images (frame départ, frame fin, images de sections)** → **Google Flow** (flow.google.com), modèle Nano Banana 2. Tu génères dans ton navigateur, tu télécharges, tu donnes les fichiers à Claude Code.
- **Vidéo fly-through** → **Seedance 2** via ta plateforme d'abonnement. Pareil : tu génères, tu télécharges le mp4, tu le donnes à Claude Code.

Tout ce qu'il te faut ici : être connecté à tes comptes respectifs. On s'en sert vraiment à l'étape 4 — rien à installer maintenant.

### 1.4 — Installe ffmpeg, Node, et un serveur local

| Outil | Sert à | Vérifier | Installer |
|---|---|---|---|
| **ffmpeg** | découper la vidéo en images | `ffmpeg -version` | macOS : `brew install ffmpeg` · Windows : `winget install Gyan.FFmpeg` · Linux : `sudo apt install ffmpeg` |
| **Node.js** (≥18) | servir le site en local | `node -v` | nodejs.org |
| **Serveur local** | tester le site dans le navigateur | — | `npx serve` ou `python -m http.server 4188` |

> **Windows — `winget install ffmpeg` échoue parfois** (résolution ambiguë par nom selon le catalogue). Utilise l'id robuste : **`winget install Gyan.FFmpeg`**.
>
> **Windows — après l'install de ffmpeg, `ffmpeg -version` ne répond pas tout de suite** : Windows n'a pas encore rafraîchi le PATH du terminal ouvert. **Ferme et rouvre ton terminal (PowerShell)**, puis retape `ffmpeg -version` — la commande répond. (Tant que tu ne rouvres pas, la porte de validation 1 te dira à tort que ffmpeg n'est pas là.)
>
> **Au 1er `npx serve`**, npm affiche `Ok to proceed? (y)` pour installer le paquet : tape **`y`** puis Entrée — c'est l'installation normale, une seule fois, pas un plantage. Sous Windows, `python -m http.server 4188` évite cette invite (rien à installer si Python est là).

🔴 **Règle non négociable** : on **sert toujours le site en local** (`http://localhost`), **jamais** en ouvrant le fichier directement (`file://`). En `file://` la vidéo au scroll ne fonctionne pas — c'est la cause n°1 d'un site qui « ne marche pas ».

> Tu ne sais pas si un truc est installé ? **Demande-le à Claude Code** : *« Vérifie si ffmpeg et Node sont dispo, et dis-moi quoi installer. »* Il check et te guide.

**Porte de validation 1** : les 3 skills sont dans `.claude/skills/` **et la porte de validation skills est passée** (Claude cite la règle image-to-image, cf. 1.1), le starter est posé, tu as accès à Google Flow et à Seedance 2 dans ton navigateur, `ffmpeg -version` et `node -v` répondent. **Bonus fortement recommandé** : tu as vu le **scrub marcher** avec des frames de démo neutres générées en local (cf. encadré 🎬 ci-dessous) — tu sais que le moteur tourne avant de générer la vraie vidéo. ✅ Ouvre maintenant Claude Code dans le dossier de ton site et passe à l'étape 2.

> **Si tu sers le starter tout de suite pour voir** (`npx serve` puis l'URL affichée, ou `python -m http.server 4188` → `http://localhost:4188`) : tu verras un site sombre habillé de textes entre `[crochets]`, un **hero qui affiche un dégradé fixe** (pas encore un vol), et des **sections (éditoriales, full-bleed) avec des images-placeholders sombres** à la place des photos. **C'est normal** — le starter ship avec une seule frame de démo et des placeholders neutres. Le hero s'animera à l'étape 5 (une fois tes vraies frames posées), et les placeholders seront remplacés à l'**étape 4 bis** par tes images de section. Tu n'as rien cassé.
>
> ### 🎬 Vois le scrub MARCHER avant de dépenser un crédit (recommandé)
> Le starter n'a qu'une frame de démo, donc le hero ne s'anime pas encore — et la première preuve que « le scroll fait défiler la vidéo » n'arrive sinon qu'après l'étape 4 (la plus coûteuse). Pour valider la **mécanique** dès maintenant, **sans toucher à Google Flow ni Seedance 2**, tu peux fabriquer un petit jeu de frames de démo neutres en local. Demande simplement à Claude Code :
>
> ```
> génère-moi ~40 frames de démo neutres dans assets/frames/ (un dégradé qui
> bouge/zoome légèrement d'une frame à l'autre) pour que je voie le scrub marcher,
> puis mets data-frames à jour. C'est temporaire, je les remplacerai par mes vraies frames.
> ```
>
> Claude génère ces frames localement (par ex. via ffmpeg `zoompan`/`gradients` ou un petit script — **zéro crédit IA**), nommées `frame-001.jpg…frame-040.jpg`, met `data-frames="40"` et la hauteur du hero. Sers le site, scrolle le hero : **le dégradé doit avancer image par image au scroll**. ✅ Tu as prouvé que le moteur marche. 🔴 Quand tu poseras tes **vraies** frames (étape 4), **écrase ce dossier de démo**, remets `data-frames` au bon nombre et **incrémente `CACHE_BUST`** dans `script.js` (sinon le navigateur ressert les frames de démo en cache).

---

## Étape 2 — Tu lances le prompt de clarification (Claude t'interroge)

But : Claude Code te pose les bonnes questions pour cadrer **ton** site — ton idée, tes produits/services, tes pages, des sites que tu aimes — et surtout il récupère ta **charte graphique** (logo, couleurs, typos). Si tu n'en as pas, il t'aide à la définir.

**Ce que tu dis à Claude Code** : tu colles le **prompt de clarification** fourni dans le kit (le fichier `prompts/01-clarification.md`). Tu le copies tel quel dans Claude Code, dans le dossier de ton site.

**Ce que Claude produit** : une conversation guidée. Il va te demander, entre autres :
- ton idée de site et ce que tu veux dedans ;
- tes produits / services / offres ;
- les pages ou sections voulues ;
- 2-3 exemples de sites existants que tu aimes (pour caler le goût) ;
- 🔴 **ta charte graphique** : logo, couleurs (codes hex si tu les as), typos, ton identité visuelle existante. Pas de charte ? Il te propose une direction et la construit avec toi.

**Réponds en langage naturel**, comme à un humain. Plus tu es précis et concret (vrais chiffres, vrais noms de produits, vraie ambiance), meilleur sera le site. Claude n'invente pas ton business à ta place — il travaille avec ce que tu lui donnes.

**Porte de validation 2** : tu as un **brief** clair en fin de conversation — direction du site, liste des sections, et ta charte (couleurs + typos + logo) actée. Relis-le. C'est la fondation de tout le reste. ✅

---

## Étape 3 — Claude écrit le copywriting et la mise en page

But : Claude rédige **tous les textes** de ton site et propose la **mise en page**. C'est volontairement **avant** la vidéo et le design final : les mots pilotent la structure. Une fois qu'on sait quoi dire, héberger joliment le texte devient facile.

**Ce que tu dis à Claude Code** : *« Écris le copy de mon site et propose la mise en page. »* (Le skill `cinematic-site-copywriting` se charge automatiquement.)

**Ce que Claude produit** :
- le texte de chaque section (hero, chiffres/preuves, présentation, offres/prestations, manifeste, contact…) ;
- les **beats** du hero — les courtes phrases qui apparaîtront sur la vidéo au fil du scroll ;
- une proposition d'ordre et de structure des sections.

**La boucle de validation humaine, c'est ici qu'elle bat le plus fort.** Tu peux tout modifier, valider, ajuster, autant de fois que tu veux : *« la phrase d'accroche est trop longue », « ajoute une section témoignages », « ce mot ne me ressemble pas, remplace-le ».* Itère jusqu'à ce que ça sonne **toi**.

**Porte de validation 3** : tu valides le copy section par section. Ne passe pas à la suite tant que les mots ne te plaisent pas — ils déterminent la forme du site. ✅

---

## Étape 4 — Vous fabriquez la vidéo cinématique (frame départ → frame fin → vidéo)

But : créer le **vol de drone** qui sera le cœur visuel de ton site. C'est l'étape la plus spectaculaire et la plus piégeuse — c'est pour ça qu'un **skill dédié la pilote** : `cinematic-site-flythrough`. Il encode la recette exacte ET les erreurs déjà payées, pour que tu ne les repaies pas.

**Ce que tu dis à Claude Code** : *« On fait la vidéo fly-through du hero. »* (Le skill `cinematic-site-flythrough` se charge.) Puis tu **brainstormes** avec lui : d'où part la caméra, où elle arrive. Le sujet dépend de ton business :
- immobilier → drone loin de l'immeuble → arrive au penthouse ;
- restaurant → vue de la salle → plonge sur une assiette dressée ;
- marque produit → environnement → macro sur le produit ;
- SaaS / agence → espace abstrait → se resserre sur l'écran ;
- coaching → un chemin / une porte → la traversée → « l'après ».

La règle du sujet : **une seule trajectoire claire** qui se rapproche / qui entre. Pas de saut de point de vue brutal.

> ### 🔴 Décide MAINTENANT (avant de générer la frame de fin) : ton arrivée est-elle un INTÉRIEUR meublé ?
> Studio de yoga (tapis, accessoires, gens), salle de resto, salon, bureau aménagé… → **OUI, c'est un intérieur meublé.** C'est exactement le cas où Seedance 2 **invente les meubles en vol et les déforme** (la table ondule, les tapis se réarrangent) — un morph que même une frame de fin image-to-image cohérente ne règle pas. La décision se prend **avant** de générer la vidéo, pas après :
> - **Si arrivée = intérieur meublé → tu DOIS finir AU SEUIL** : la frame de fin s'arrête devant la baie / la porte ouverte, l'intérieur n'est qu'une **lueur chaude, ZÉRO meuble net**. Puis tu montres l'intérieur en **photo nette juste après**, dans la première section éditoriale (c'est une image de section, générée à l'étape 4 bis).
> - **Si arrivée = sujet déjà propre** (une façade, un produit isolé déjà visible au loin) → le clip direct suffit, pas besoin de seuil.
>
> Détail complet de la technique « seuil » : skill `cinematic-site-flythrough` **§4.3 bis**. Ne génère pas la frame de fin avant d'avoir tranché ce point.

**Comment ça se passe concrètement** : tu génères les images et la vidéo **à la main dans chaque outil**, dans ton navigateur, et tu donnes les fichiers à Claude Code (qui les découpe et les branche au site). Dans l'ordre :

1. la **frame de départ** (image générée par texte) — sur **Google Flow** (flow.google.com), modèle **Nano Banana 2**, prompt décrivant ton plan large, ratio **16:9** ;
2. la **frame de fin** — 🔴 voir l'encadré image-to-image ci-dessous ;
3. la **vidéo Seedance 2** qui relie les deux (frame départ = start frame, frame fin = end frame) ;
4. tu télécharges le mp4 et tu le donnes à Claude Code, qui le découpe en images et les branche au moteur du site.

> ### 🔴 Le pas-à-pas de la frame de fin (image-to-image)
> C'est l'étape qui fait ou casse le rendu. Dans **Google Flow**, pour la frame de fin :
> 1. cherche le mode **« reference image »** / **« image to image »** — le champ pour uploader une image existante comme base ;
> 2. **uploade ta frame de départ** (celle validée à l'étape précédente) dans ce champ ;
> 3. garde le ratio **16:9** ;
> 4. écris un prompt du type *« rapproche la caméra, ne change rien d'autre — même bâtiment, même ciel, même lumière »*.
>
> 🔴 **Jamais texte seul.** Si tu génères la frame de fin par un prompt texte sans uploader la frame de départ comme référence, Google Flow crée un autre bâtiment → la vidéo « morphe » → échec. Si le mode reference image n'est pas disponible dans Flow, utilise Gemini (gemini.google.com) — uploade la frame départ dans le chat, demande une version plus rapprochée. La règle est identique : la frame départ DOIT être la base.

### 🔴 LA LEÇON À RETENIR — la règle non négociable

```
╔════════════════════════════════════════════════════════════════════╗
║  La FRAME DE FIN se génère en IMAGE-TO-IMAGE à partir de la          ║
║  FRAME DE DÉPART (la frame de départ comme image de référence        ║
║  + un prompt).  JAMAIS en texte seul.                                ║
║                                                                      ║
║  Pourquoi : un prompt texte seul recrée un bâtiment / sujet          ║
║  DIFFÉRENT. Deux images incohérentes → la vidéo essaie de            ║
║  « morpher » de l'une à l'autre → façade qui se déforme, murs        ║
║  qui ondulent = MORPH = échec.                                       ║
║                                                                      ║
║  Une frame de fin dérivée du départ garde la MÊME identité           ║
║  → la vidéo fait un simple zoom-avant propre. C'est LA leçon.        ║
╚════════════════════════════════════════════════════════════════════╝
```

Le skill force cette méthode automatiquement — tu n'as pas à y penser, mais **comprends pourquoi** : c'est la différence entre un hero magnifique et une bouillie qui ondule.

**Vérité honnête sur le « morph »** : une vidéo IA réinvente chaque image, elle n'a pas de modèle 3D de la scène. Le morph zéro absolu est **impossible**. On ne le supprime pas, on le **masque** : frames de départ et de fin cohérentes + une caméra qui avance vite = le micro-morph passe inaperçu.

**Deux choses à savoir pour ne pas paniquer** :
- Les générations d'image de fin **« plantent » souvent 1 à 3 minutes** (l'outil mouline). C'est **normal**. On attend, on relance, on n'abandonne pas.
- La vidéo Seedance 2 peut prendre quelques minutes selon la charge du serveur. Pareil, c'est normal.

**Porte de validation 4** (la plus importante du kit) : Claude te montre la **paire d'images** (départ + fin). Tu confirmes que c'est **manifestement le même lieu**, juste plus proche — pas deux bâtiments différents. ✅ **C'est seulement après ce OK qu'on génère la vidéo.** Ensuite, deuxième regard : Claude lit quelques images de la vidéo finale pour vérifier que ça ne « bave » pas trop. Si la paire est incohérente, on refait la frame de fin en image-to-image (**jamais** en texte seul pour « réparer »).

---

## Étape 4 bis — 🔴 Génère AUSSI les images fixes des sections (ne saute pas ça)

But : le hero fly-through n'est **qu'une partie** des visuels. Sous le hero, ton site a des **sections qui portent une image** — les blocs éditoriaux (texte + photo côte à côte) et les blocs full-bleed (image plein écran avec texte par-dessus). Ces images-là ne sortent PAS de la vidéo : tu les génères **séparément**, sur le même outil que tes frames de départ/fin.

🔴 **Pourquoi c'est obligatoire** : le starter ship avec des **placeholders sombres** (de simples dégradés). Sur les full-bleed ça passe encore (le texte est posé par-dessus avec un voile). Mais dans les **blocs éditoriaux, le placeholder est un rectangle nu** : si tu ne le remplaces pas, ton site affiche un **gros rectangle noir** qui ressemble à un bug. C'est LE défaut le plus courant d'un premier site. De plus, la méthode du fly-through prévoit (étape 4, encadré « finir au seuil ») que le détail intérieur **non résolu en vidéo** soit montré **ICI, en photo nette** dans la section juste après le hero. Ces images de section sont donc partie intégrante de la recette, pas une option.

**Comment faire** : pour **chaque** emplacement image listé dans ton brief (§ Plan visuel des sections), génère **une image texte→image distincte** sur **Google Flow** (modèle Nano Banana 2) :
1. prompt qui décrit le visuel voulu (sujet, ambiance), **cohérent avec ta charte** (même palette, même lumière que le reste du site) ;
2. ratio **16:9** ;
3. télécharge, pose le fichier dans `assets/img/`, puis **demande à Claude Code de le brancher** (tu ne touches pas le HTML) : *« branche mon image `assets/img/mon-fichier.jpg` dans la section X. »*

> ### 🔴 Le bloc « présentation » (section éditoriale) — c'est Claude qui branche, pas toi
> Pour le **full-bleed**, déposer ton fichier au bon nom suffit à le voir. Mais pour la **section éditoriale (présentation)**, l'image n'est **pas un simple remplacement de fichier** : il faut régler le `src` de la balise `<img>` sur ton fichier. **Ne le fais pas à la main.** Demande à Claude Code : *« branche mon image `assets/img/presentation.jpg` dans la section présentation »* — il met le bon `src` (et garde `width`/`height`). C'est cohérent avec la promesse du kit : **tu ne codes pas, tu délègues le branchement à Claude.** (Si tu déposes ton image et que tu vois encore le placeholder neutre, c'est justement que le `src` pointe toujours sur `placeholder-1.jpg` — fais brancher par Claude.)

> ### 📐 Combien d'images générer ? Compte tes blocs image RÉELS
> Le starter ship **2 emplacements image par défaut** : **1 éditorial** (présentation) + **1 full-bleed**. Compte les blocs image **réels de ton brief** (§ Plan visuel des sections) : c'est ce nombre d'images que tu génères (1 par bloc). Si tu **ajoutes** des sections (Claude le fait sur demande), compte **1 image de plus par bloc image ajouté**.

🔴 **Une image distincte par emplacement.** Ne réutilise pas le même fichier sur deux sections différentes — un site avec la même photo répétée fait cheap. Compte le nombre de blocs image de ton brief et génère ce nombre d'images.

**Porte de validation 4 bis** : chaque section qui doit porter une image en a une **vraie** (plus aucun rectangle sombre dans les blocs éditoriaux), les visuels sont cohérents entre eux (même ambiance que le hero), et le détail intérieur « au seuil » du hero est bien repris en photo nette dans la section qui suit. ✅

---

## Étape 5 — Claude assemble le site entier avec le design

But : Claude réunit tout — le copy (étape 3), la vidéo (étape 4) et **ta charte graphique** (étape 2) — en un site complet et cohérent.

**Ce que tu dis à Claude Code** : *« Assemble le site complet avec le design, à partir du copy et de la vidéo. »* (Le skill `cinematic-site-design` se charge.)

**Ce que Claude produit** : le site one-page entier — le hero vidéo qui défile au scroll, puis les sections (chiffres, présentation, offres, manifeste, contact…), habillées avec **tes** couleurs, **tes** typos, **ton** logo. Style dark éditorial premium, alternance de sections pleine largeur et de colonnes serrées, animations subtiles (révélations, compteurs, parallaxe) — toutes désactivables pour l'accessibilité.

**Comment tu vérifies** : Claude **sert le site en local** (il lance `npx serve` ou `python -m http.server`) et te donne une adresse du type `http://localhost:4188`. **Tu l'ouvres toi-même dans ton navigateur et tu regardes.** 🔴 Rappel : jamais en `file://`. Si quelque chose cloche visuellement, tu le dis — on ne valide pas sur du texte, **on valide sur ce qu'on voit à l'écran**.

> Astuce : si tu as branché le MCP Playwright (outil avancé, pas dans le kit de base), Claude peut prendre les captures lui-même. Sinon — le cas normal — c'est **toi qui ouvres `http://localhost:PORT` et qui juges à l'œil**. C'est très bien comme ça : c'est ton site, c'est ton regard qui tranche.

**Porte de validation 5** : tu ouvres `http://localhost:PORT` dans ton navigateur, tu scrolles le hero pour voir la vidéo avancer, tu vérifies que ta charte est bien appliquée. ✅

---

## Étape 6 — Tu discutes avec Claude pour les dernières modifications

But : peaufiner. **Tout** est ajustable, et c'est là que la promesse du kit prend tout son sens — **tu édites ton site en parlant.**

**Ce que tu dis à Claude Code** : tout ce que tu veux, en français, en continu. Quelques exemples :
- *« Le hero est trop sombre, éclaircis le voile sur la vidéo. »*
- *« Change l'accent or pour un vert sapin, c'est plus ma marque. »*
- *« Remonte la section prix avant le manifeste. »*
- *« Cette phrase est trop pompeuse, fais plus direct. »*
- *« Ajoute un bouton WhatsApp dans le contact. »*
- *« Sur mobile la vidéo rame, mets une image fixe à la place. »*

**Ce que Claude produit** : la modif, à chaque fois. Tu rafraîchis `http://localhost:PORT` dans ton navigateur, tu regardes le résultat, tu valides ou tu repars pour un tour. **Aucune limite au nombre d'allers-retours.** C'est une conversation, pas un formulaire.

**Porte de validation 6** : ton site te plaît, sur desktop **et** mobile, servi en local. Tu peux le déployer. ✅

---

## Étape 7 — Mettre ton site en ligne (optionnel mais recommandé)

But : ton site tourne pour l'instant **sur ta machine** (`http://localhost`). Pour qu'il ait une vraie adresse partageable, il faut le **déployer**. Comme le starter est 100 % statique (HTML + CSS + JS, aucun build), c'est rapide.

**La voie recommandée — Claude déploie tout seul via le connecteur Netlify** (le plus simple pour un site statique, et le plus propre à montrer : l'IA fait le déploiement de bout en bout). Netlify a un **connecteur MCP officiel** conçu pour ça (l'agent crée le site, gère l'auth, et fait le deploy prod).

1. **Une seule fois** : branche le connecteur **Netlify** dans Claude Code — *Réglages → Connectors*, puis connecte-toi à ton compte Netlify (OAuth). (Réf : [Netlify MCP Server](https://docs.netlify.com/build/build-with-ai/netlify-mcp-server/).) Pas de compte Netlify ? Crée-le gratuitement d'abord, c'est tout.
2. Ensuite, dans Claude Code, demande simplement : *« Déploie ce site sur Netlify en production. »*
3. Claude crée le site, l'uploade et te rend l'**URL publique**. C'est en ligne, sans que tu touches au terminal.

> 🔴 **Pourquoi pas Cowork pour cette étape ?** Le déploiement a besoin d'accès réseau. Le mode **Cowork** est cloisonné (pas de réseau) → il ne peut pas déployer. **Fais le déploiement dans Claude Code** (qui tourne sur ta machine), comme le reste du build.

**Voie de secours — Netlify Drop (glisser-déposer, zéro connecteur)** : si tu ne veux pas brancher le connecteur, va sur **app.netlify.com/drop** et **glisse le dossier de ton site** (celui qui contient `index.html`, `assets/`, etc.) — Netlify te renvoie une URL en quelques secondes.

> Vercel marche aussi (connecteur MCP officiel + `npx vercel`), mais pour un **simple dossier statique déployé par l'agent**, Netlify est un cran plus direct. Si tu utilises déjà Vercel, reste dessus.

🔴 **Vérifie après déploiement** : ouvre l'URL publique et **scrolle le hero**. Comme en local, le site est servi en HTTP (pas `file://`), donc le scrub doit fonctionner à l'identique. Si une frame manque, c'est que le dossier `assets/frames/` n'a pas été inclus dans le déploiement.

> ⚡ **Loader long au premier chargement en ligne ?** Le hero **précharge toutes les frames** avant de s'activer : sur une connexion lente, le loader peut paraître long si ton dossier `frames/` est lourd. Vise **< 60-80 Ko par frame** et **≤ ~150 frames** (dossier ~7-10 Mo). Si c'est plus lourd, demande à Claude Code de **réextraire plus léger** (`-q:v 4` ou `scale=1280`) avant de redéployer.

**Porte de validation 7** : ton site est accessible à une URL publique, le fly-through tourne au scroll, ta charte est appliquée. ✅

---

## Attentes réalistes — coût & temps (honnête)

- **Coût** : les images se génèrent dans Google Flow (inclus dans ton abonnement Google), la vidéo dans Seedance 2 (vérifie le coût de génération sur ton plan — ça varie). La somme à anticiper, ce n'est pas que le clip : compte aussi les **retries** (frame de fin à refaire, clip qui bave) et les **images de section** (1 par bloc image ; le starter en a **2 par défaut** : 1 éditorial + 1 full-bleed). Régarde les quotas réels sur tes comptes avant de démarrer.
- **Temps** : pour un **premier** site, compte **1 à 2 jours** d'essais réalistes — pas « une soirée ». Le plus long, ce n'est pas le calcul des machines, c'est **la boucle** : tester la vidéo, valider les images, ajuster le copy, regarder les captures. C'est normal et c'est là qu'est la qualité.
- **Les ratés font partie du jeu** : une frame de fin à refaire, une vidéo qui bave, un sujet de vol mal choisi. Le kit te dit déjà où sont les pièges — tu en éviteras la plupart, mais pas tous du premier coup.

## Et après ?

Ce kit te donne **la recette**. Tu peux refaire un site cinématique seul, autant de fois que tu veux. Ce qu'il ne te donne pas en entier, c'est **l'orchestration fine** — comment enchaîner les agents, lire un brief client, arbitrer les choix de direction, gérer un projet de bout en bout sous Claude Code. **Ça, c'est le cœur du coaching.** Le kit ouvre la porte ; le coaching t'apprend à diriger toute l'équipe.

---

> ### Mémo des 3 règles qui sauvent un projet
> 1. 🔴 **Frame de fin = image-to-image depuis la frame de départ**, jamais en texte seul. ET le i2i seul ne suffit pas : la fin doit être un **rapproché sur le MÊME axe**, **sans aucun élément nouveau** (pas de porte/baie absente du départ), avec un prompt qui verrouille la fidélité. (Sinon : morph, même en i2i.)
> 2. 🔴 **Sers le site en local** (`http://localhost`), **jamais** en `file://`.
> 3. 🔴 **Valide en regardant** — la paire d'images, les captures du site. Pas sur une description, pas sur du texte.