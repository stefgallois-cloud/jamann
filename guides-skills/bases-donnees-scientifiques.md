# Guide d'Utilisation : Bases de Données Scientifiques (Structures & Protéines) 🧬

Ce guide regroupe les compétences qui me permettent d'interroger les grandes bases de données de recherche en biologie structurale, biochimie et génomique comparative.

---

## 🧬 1. Fiches de Protéines (`uniprot-database` & `ncbi-sequence-fetch` & `ensembl-database`)

* **À quoi ça sert ?** 
  Traduire des identifiants et récupérer toutes les informations sur une protéine spécifique (sa fonction biologique, sa séquence d'acides aminés, sa localisation dans la cellule, les maladies associées, etc.).
* **Quand l'utiliser ?**
  Dès que vous étudiez une protéine ou un gène spécifique et avez besoin de sa séquence exacte ou de son rôle exact.
* **Comment la déclencher ? (Phrases types)** :
  * *« Donne-moi la fiche complète et la séquence de la protéine humaine [Nom de protéine/gène]. »*
  * *« Récupère la séquence nucléotidique de l'accession NCBI [Numéro]. »*

---

## 🧪 2. Chimie & Pharmacologie (`pubchem-database` & `chembl-database`)

* **À quoi ça sert ?** 
  Interroger les plus grandes bases de données chimiques du monde pour obtenir la structure d'une molécule (SMILES), ses propriétés physiques, sa toxicité ou ses interactions avec des cibles biologiques (IC50, Ki).
* **Quand l'utiliser ?**
  Pour analyser une molécule active (comme la caféine, le paracétamol ou un principe actif cosmétique) ou chercher ses cibles thérapeutiques connues.
* **Comment la déclencher ? (Phrases types)** :
  * *« Recherche la molécule [Nom] sur PubChem et donne-moi ses propriétés et sa structure. »*
  * *« Trouve-moi les molécules qui ciblent le récepteur [Nom] avec leurs valeurs d'activité IC50 dans ChEMBL. »*

---

## 📐 3. Structures 3D & Repliement (`pdb-database` & `alphafold-database-fetch-and-analyze` & `foldseek-structural-search`)

* **À quoi ça sert ?** 
  Télécharger et analyser les structures tridimensionnelles de protéines, qu'elles soient déterminées expérimentalement (PDB) ou prédites par intelligence artificielle (**AlphaFold**). Permet également de chercher des structures similaires en 3D via **Foldseek**.
* **Quand l'utiliser ?**
  Pour visualiser la forme physique d'une protéine, localiser des sites de liaison ou chercher des protéines de forme similaire dans la nature.
* **Comment la déclencher ? (Phrases types)** :
  * *« Télécharge la structure PDB [Code ex: 1A2B] et décris la méthode de résolution. »*
  * *« Récupère le modèle AlphaFold pour l'accession UniProt [ID] et analyse la confiance locale (pLDDT). »*
  * *« J'ai ce fichier PDB local, fais une recherche Foldseek pour trouver des structures similaires. »*

---

## 🧬 4. Alignement & Similitude de Séquences (`protein-sequence-msa` & `protein-sequence-similarity-search`)

* **À quoi ça sert ?** 
  Comparer des séquences de protéines pour détecter des similitudes évolutives (via MMseqs2 ou BLAST) ou aligner plusieurs séquences (via Clustal Omega) afin de repérer les zones conservées au fil de l'évolution.
* **Quand l'utiliser ?**
  Pour savoir si une nouvelle séquence de protéine ressemble à d'autres protéines connues ou identifier des résidus clés (sites actifs).
* **Comment la déclencher ? (Phrases types)** :
  * *« Fais une recherche de similitude BLAST/MMseqs2 pour cette séquence : [Coller la séquence]. »*
  * *« Aligne ces 3 séquences de protéines pour voir quelles zones sont identiques : [Séquences au format FASTA]. »*

---

## 🎨 5. Visualisation 3D de Protéines (`pymol`)

* **À quoi ça sert ?** 
  Générer des images, mesurer des distances ou analyser des interactions moléculaires en 3D en pilotant le logiciel PyMOL.
* **Quand l'utiliser ?**
  Pour créer des représentations visuelles de protéines, marquer des acides aminés importants ou mesurer la distance entre un médicament et sa cible.
* **Comment la déclencher ? (Phrases types)** :
  * *« Rends une image de la protéine PDB [Code] en colorant les résidus selon leur score de confiance. »*
  * *« Mesure la distance entre le ligand et le résidu actif de la structure [Fichier]. »*
