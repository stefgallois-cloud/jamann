# Prompt Optimisé pour le Projet "Woof and Walk" (Maud)

Ce prompt a été restructuré et optimisé en appliquant les compétences **prompt-engineering** et **prompt-optimizer** pour être pleinement exploitable par un modèle de langage (comme Gemini ou Claude) afin de générer une Landing Page d'exception.

---

## prompt_optimise.md

```markdown
# RÔLE
Tu es un expert en design d'interface (UI/UX), développeur web front-end chevronné et copywriter orienté conversion. Tu es spécialisé dans la création de landing pages premium et chaleureuses pour des services de proximité et des entrepreneurs locaux.

# OBJECTIF
Ta mission est de concevoir et coder une Landing Page (HTML5, Vanilla CSS, Vanilla JS) de niveau professionnel, hautement esthétique, responsive et optimisée pour la conversion, pour l'activité de balades et randonnées canines de Maud, intitulée **"Woof and Walk"**, basée à Lausanne (Suisse).

# CONTEXTE & HISTOIRE
- **La cliente** : Maud, une amie qui a lancé une activité de balade de chiens à Lausanne. Jusqu'ici, elle fonctionnait uniquement par le bouche-à-oreille et un cercle d'amis restreint, car elle craignait de ne pas être en conformité avec la réglementation suisse (autoentrepreneuriat, formation, législation sur les animaux).
- **Le positionnement** : Une activité professionnelle, structurée et 100% en règle, mais qui garde un côté très humain, chaleureux et proche de la nature.
- **L'univers visuel** : Forêt, randonnées, balades au grand air. Le design doit évoquer la nature, la liberté et la sécurité.

# CHARTE GRAPHIQUE & STYLE (Rich Aesthetics)
- **Palette de couleurs** : Nature et forêt.
  - Principal : Vert forêt profond (ex. `#1b4332` ou `#081c15`)
  - Accent / Énergie : Vert feuille lumineux ou doré terreux chaleureux (ex. `#d8f3dc` ou `#b7e4c7` pour les fonds doux, `#40916c` pour les boutons principaux)
  - Neutres : Crème doux (ex. `#f8f9fa` ou `#eae2b7` très subtil) à la place du blanc pur, et gris anthracite pour le texte.
- **Typographie** : Moderne et élégante (ex. "Outfit" ou "Inter" via Google Fonts).
- **Effets** : Micro-animations douces sur les boutons au survol (scale subtil, transition de couleur de fond), ombres douces pour détacher les cartes de tarifs, et effets de flou d'arrière-plan (glassmorphism) pour les sections importantes ou les menus.

# STRUCTURE DE LA LANDING PAGE ACCROCHEUSE
1. **Hero Section** :
   - **Accroche** : Un titre percutant mêlant l'amour des chiens et la liberté des balades (ex. "Offrez à votre compagnon le grand air des forêts lausannoises").
   - **Sous-titre** : Texte court et rassurant (ex. "Des randonnées canines professionnelles, sécurisées et adaptées au rythme de votre chien. Prise en charge à domicile à Lausanne & environs.").
   - **Bouton d'action (CTA)** : "Réserver une balade d'essai" (couleur contrastée, micro-animation au survol).
   - **Image de fond** : Visuel immersif de forêt ou de chien joyeux en pleine nature.
2. **Section Réassurance & Légalité (Le point sensible de Maud)** :
   - Titre : "Une confiance absolue pour la sécurité de votre compagnon".
   - 3 à 4 piliers illustrés d'icônes élégantes :
     - *100% En Règle & Déclarée* (Autoentreprise suisse légitime).
     - *Assurance & Responsabilité Civile* (Couverture complète).
     - *Formée & Passionnée* (Connaissance fine des codes canins et premiers secours).
     - *Prise en charge personnalisée* (Respect du rythme et de la sociabilité de chaque chien).
3. **Nos Formules & Tarifs** :
   - Présentation claire sous forme de cartes élégantes (Grid layout) :
     - *La Balade Découverte* (Individuelle ou petit groupe, test de sociabilité).
     - *La Randonnée Forestière* (Sortie de groupe dynamique, idéal pour dépenser de l'énergie).
     - *L'Aventure sur Mesure* (Sortie individuelle pour chiens plus timides ou âgés).
   - Pour chaque formule : tarif clair en CHF, durée, ce qui est inclus (transport, friandises saines, photos de la balade).
4. **À propos de Maud** :
   - Présentation de Maud avec un ton chaleureux, son parcours, son amour de la nature et sa philosophie bienveillante avec les chiens.
5. **FAQ (Foire Aux Questions)** :
   - Accordéon JS élégant répondant aux questions fréquentes :
     - *Comment se passe la prise en charge et le retour ?*
     - *Mon chien doit-il être vacciné / identifié ?*
     - *Que se passe-t-il en cas de mauvaise météo ?*
     - *Quelles sont les garanties légales et d'assurance ?*
6. **Footer** :
   - Informations de contact (Téléphone, Email, Zone de couverture à Lausanne), icônes de réseaux sociaux, mentions légales d'autoentrepreneur en Suisse.

# CONTRAINTES TECHNIQUES
- **Framework** : Pas de framework lourd. Utilise du HTML5 sémantique pur, du CSS moderne avec variables, et du JavaScript natif léger.
- **SEO local** : Intègre des balises méta optimisées, une structure de titres `<h1>` à `<h3>` rigoureuse, et des mots-clés naturels axés sur Lausanne ("balade chien Lausanne", "randonnée canine Vaud", "promeneur de chien Lausanne").
- **Responsivité** : La page doit être impeccable sur smartphone, tablette et grand écran.

# FORMAT DE SORTIE
Génère le code source sous forme de 3 fichiers distincts et propres :
- `index.html` : avec toute la structure, les textes rédigés en français professionnel et engageant.
- `style.css` : le fichier de style complet et structuré, avec variables CSS de couleurs et de typographie.
- `main.js` : le script léger pour animer l'accordéon de la FAQ et d'éventuelles micro-interactions.
```
