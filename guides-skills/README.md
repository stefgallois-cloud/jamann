# 📚 Guide de Rangement & d'Utilisation des Skills 🛠️

Bienvenue dans votre boîte à outils de compétences pour **Antigravity**. Ce dossier a été conçu pour vous aider à comprendre comment fonctionnent vos "skills" (compétences), comment les organiser pour que je reste rapide et performant, et comment les déplacer d'un endroit à un autre.

---

## 💡 1. Qu'est-ce qu'une "Skill" ou un "Plugin" ?
Une **Skill** est un dossier de configuration contenant des instructions spécifiques, des modèles et des scripts. Elle me donne des "super-pouvoirs" dans un domaine précis (par exemple, des compétences de design premium, des méthodes pour manipuler des fichiers Excel ou PDF, ou l'accès à des bases de données médicales).

Il y a deux manières de charger ces compétences dans mon cerveau :

| Type d'installation | Emplacement sur votre PC | Portée & Comportement |
| :--- | :--- | :--- |
| **Permanent / Global** *(Mémoire Générale)* | `C:\Users\DELL\.gemini\config\plugins\` | **Disponible partout**. Peu importe le dossier ou le projet que vous ouvrez, j'ai ces compétences en tête. |
| **Local** *(Dossier Projet)* | `.../test claude/.claude/skills/` | **Disponible uniquement dans ce projet**. Si vous ouvrez un autre projet sur votre bureau, je n'y aurai pas accès. |

---

## ⚖️ 2. La règle d'or pour un travail fluide (Performance)

> [!WARNING]
> **Pourquoi le rangement est crucial ?**
> Chaque fois que nous discutons, toutes les compétences **globales** actives sont injectées dans mes instructions de base. Si vous en avez 40 en permanence (par exemple, toutes les bases de données génétiques, la chimie, etc.), cela sature ma mémoire de travail (ma "fenêtre de contexte"). 
> Cela consomme plus de jetons (tokens), me ralentit, et augmente le risque que j'oublie ou confonde des consignes.

### Notre recommandation de rangement :

* **À laisser en permanent (Global)** : Les outils à usage universel qui servent pour n'importe quel site web ou document.
  * *Exemples* : `ui-ux-pro-max-skill`, `prompt-engineering`, la génération de fichiers `pdf`, `docx`, `xlsx`.
* **À déplacer en local (Dossiers projets)** : Les compétences ultra-spécialisées qui ne servent qu'à certains travaux précis.
  * *Exemples* : Les bases scientifiques et de recherche médicale (`alphafold`, `gnomad`, `ncbi`, `pubmed`), ou les experts techniques de niche (`airtable-expert`, `firebase`, `softr-expert`).

---

## 🛠️ 3. Comment déplacer une Skill (Tutoriel)

C'est extrêmement simple sous Windows ! Les compétences ne sont que des dossiers ordinaires contenant un fichier `SKILL.md`. Vous pouvez les copier/coller ou les couper/déplacer avec votre explorateur de fichiers.

### A. Rendre une skill globale (Dans votre mémoire générale)
1. Ouvrez votre explorateur de fichiers Windows.
2. Allez dans le dossier des skills locales de votre projet :
   `C:\Users\DELL\Desktop\test claude\.claude\skills\`
3. **Coupez (Ctrl+X)** ou **Copiez (Ctrl+C)** le dossier de la skill que vous voulez globaliser (par exemple, `prompt-engineering`).
4. Allez dans le dossier système de vos plugins :
   `C:\Users\DELL\.gemini\config\plugins\`
5. Créez un sous-dossier (ex: `prompt-engineering-plugin\skills\`) et **collez-le (Ctrl+V)**.
   *(Au prochain démarrage, elle sera disponible dans tous vos projets !)*

### B. Rendre une skill locale (Spécifique à un projet)
1. Allez dans le dossier système global :
   `C:\Users\DELL\.gemini\config\plugins\`
2. Trouvez la skill concernée (ex: `science/skills/alphafold_database_fetch_and_analyze`).
3. **Coupez** le dossier de la skill.
4. Allez dans le projet où vous en avez besoin, dans son dossier local :
   `C:\Users\DELL\Desktop\test claude\.claude\skills\`
5. **Collez-le**.

---

## 📂 4. Index de vos guides de Skills disponibles

Cliquez sur l'un des guides ci-dessous pour voir comment déclencher et utiliser chaque groupe de compétences :

1. 🎨 **[Design, Graphisme & UI/UX](file:///c:/Users/DELL/Desktop/test%20claude/guides-skills/ui-ux-pro-max.md)** : Guide d'utilisation de la skill premium de conception d'interfaces.
2. ⚙️ **[Développement, Code & Productivité](file:///c:/Users/DELL/Desktop/test%20claude/guides-skills/outils-developpement.md)** : Optimisation de prompts, automatisation, création de skills et développement Android.
3. 📚 **[Recherche de Littérature Académique](file:///c:/Users/DELL/Desktop/test%20claude/guides-skills/recherche-litterature.md)** : PubMed, arXiv, bioRxiv, OpenAlex.
4. 🧬 **[Bases de Données Scientifiques (Structures & Protéines)](file:///c:/Users/DELL/Desktop/test%20claude/guides-skills/bases-donnees-scientifiques.md)** : UniProt, NCBI, PDB, AlphaFold, PyMOL.
5. 🧬 **[Génomique, Clinique & Régulation](file:///c:/Users/DELL/Desktop/test%20claude/guides-skills/genomique-regulation-interactions.md)** : ClinVar, gnomAD, dbSNP, GTEx, etc.
