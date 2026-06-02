# Guide d'Utilisation : Génomique, Régulation & Voies Métaboliques 🧬

Ce guide regroupe les compétences destinées à l'analyse de l'ADN humain, des variants génétiques associés aux maladies, de la régulation de l'expression des gènes et des interactions entre protéines.

---

## 🧬 1. Analyse de Variants & Génétique Clinique (`dbsnp-database` & `clinvar-database` & `gnomad-database`)

* **À quoi ça sert ?** 
  Rechercher des mutations et variations de l'ADN humain. Permet de savoir si une mutation est fréquente dans la population (gnomAD), si elle a été signalée comme bénigne ou pathogène chez des patients (ClinVar) et de récupérer sa fiche technique mondiale (dbSNP via son identifiant `rsID`).
* **Quand l'utiliser ?**
  Pour analyser les conséquences d'une mutation génétique ou vérifier la signification clinique d'un variant d'ADN.
* **Comment la déclencher ? (Phrases types)** :
  * *« Trouve-moi les informations techniques de la mutation rsID [Numéro] sur dbSNP. »*
  * *« Est-ce que ce variant [Coordonnées ou rsID] est classé comme pathogène dans ClinVar ? »*
  * *« Quelle est la fréquence de ce variant génétique dans la population européenne selon gnomAD ? »*

---

## 🧫 2. Expression dans les Tissus Humains (`gtex-database` & `human-protein-atlas-database`)

* **À quoi ça sert ?** 
  Déterminer dans quels organes et cellules de notre corps un gène ou une protéine s'exprime et en quelle quantité (semi-quantitativement avec des images histologiques pour le Human Protein Atlas, ou sous forme de graphiques d'expression pour le projet GTEx).
* **Quand l'utiliser ?**
  Pour savoir si une protéine ou un gène est par exemple spécifique du cerveau, du foie, de la peau ou du cœur.
* **Comment la déclencher ? (Phrases types)** :
  * *« Dans quels tissus humains le gène [Nom] s'exprime-t-il le plus selon la base GTEx ? »*
  * *« Donne-moi les informations de localisation cellulaire de la protéine [Nom] dans le Human Protein Atlas. »*

---

## 🧬 3. Régulation de l'ADN & Liaison d'ADN (`encode-ccres-database` & `jaspar-database` & `ucsc-conservation-and-tfbs` & `unibind-database`)

* **À quoi ça sert ?** 
  Étudier le contrôle de nos gènes (les régions promotrices et amplificatrices). Permet de chercher des motifs de liaison de Facteurs de Transcription (JASPAR/UniBind), de mesurer si une zone d'ADN est restée inchangée au fil de l'évolution des espèces (scores de conservation UCSC) ou d'accéder aux éléments régulateurs d'ENCODE.
* **Quand l'utiliser ?**
  Pour comprendre comment un gène est allumé ou éteint dans notre corps et quelles protéines s'y attachent.
* **Comment la déclencher ? (Phrases types)** :
  * *« Trouve-moi le motif de liaison (PWM) du facteur de transcription [Nom de protéine, ex: CTCF] dans JASPAR. »*
  * *« Quels sont les scores de conservation évolutive (phyloP/phastCons) autour de cette région d'ADN ? »*
  * *« Y a-t-il des sites de liaison expérimentalement validés pour [Protéine] dans UniBind ? »*

---

## 🔄 4. Réactions & Réseaux d'Interactions (`quickgo-database` & `reactome-database` & `string-database`)

* **À quoi ça sert ?** 
  Cartographier les réseaux de signalisation, les processus biologiques (QuickGO/Gene Ontology), les voies métaboliques (Reactome) et les interactions physiques directes entre protéines (STRING).
* **Quand l'utiliser ?**
  Pour découvrir avec quelles autres protéines une protéine travaille ou analyser dans quelles chaînes de réactions chimiques de la cellule (les voies) elle est impliquée.
* **Comment la déclencher ? (Phrases types)** :
  * *« Donne-moi le réseau d'interactions de la protéine [Nom] et ses partenaires principaux dans la base STRING. »*
  * *« Quelles sont les réactions chimiques ou les voies métaboliques impliquant [Gène/Protéine] dans Reactome ? »*
  * *« Quels processus biologiques sont associés à ce gène selon Gene Ontology (QuickGO) ? »*
