# Brief — Page qui convertit (prompt réutilisable)

> **SOP universelle.** À ressortir pour **tout ce qui doit faire AGIR** quelqu'un : landing, page de vente, post FB/IG, email commercial, pub.
> Pas pour les docs neutres (note de cadrage, doc technique, schéma) — eux ont d'autres formats.
> Créé le 2026-06-05 · construit avec la skill `prompt-optimizer`.

---

## Comment l'utiliser (3 étapes)

1. Copie le bloc **PROMPT À COLLER** plus bas.
2. Remplis les champs entre `[crochets]`. Laisse vide ce que tu ne sais pas — Claude te posera la question.
3. Colle-le. Tu reçois un **copydeck** (les textes à valider **avant** qu'on code quoi que ce soit).

---

## Le brief en 7 champs (le minimum qui fait 80 % du résultat)

| Champ | Ce que ça répond | Exemple |
|---|---|---|
| **Objectif** | L'action **unique** visée | Candidater sur Tally |
| **Pour qui** | 1 personne type + son niveau | Une amie qui lance son activité, débutante en tech |
| **Avant** | Ce qu'elle vit / ressent aujourd'hui | Invisible en ligne, fait ses posts tard le soir |
| **Après** | Ce qu'elle obtient concrètement | Un site pro + ses posts en 15 s |
| **Preuves** | Ce qu'on peut montrer (avec source) | Caroline, captures d'écran, chiffres sourcés |
| **Ton** | La voix | Ami·e à ami·e, chaud, zéro corporate |
| **À bannir** | Mots / angles / promesses interdits | Jargon, « automatisations » seul, chiffres non sourcés |

---

## PROMPT À COLLER

```
Tu es mon copywriter de conversion. Tu écris dans MA voix (ami·e à ami·e, chaud,
direct, une touche d'humour, zéro corporate) — pas en marketeux.

Objectif de la page : [l'action UNIQUE que le lecteur doit faire]
Pour qui : [1 personne type + son niveau]
Ce qu'elle vit AVANT : [sa situation / son émotion actuelle]
Ce qu'elle obtient APRÈS : [la transformation concrète]
Preuves dispo : [exemples clients, captures, chiffres — avec leur source]
Ton : [ex. ami à ami, chaud, un peu d'humour]
À bannir : [mots, angles, promesses interdits]

Format de sortie : un COPYDECK markdown, bloc par bloc (titre / sous-titre /
sections / CTA / FAQ). Pour chaque bloc : version ACTUELLE (si elle existe) +
version PROPOSÉE. À valider AVANT d'écrire la moindre ligne de code.

Règles non négociables :
- UNE seule action désirée — tout le texte converge vers elle.
- Pars de SON problème à elle, pas de ma solution.
- Concrétise toujours (chiffres, durées, gains) — jamais « gagner du temps » tout seul.
- Tout chiffre = sourcé. Zéro invention. Si tu n'as pas de source, tu le signales.
- On valide lot par lot. Tu n'intègres rien dans le code tant que je n'ai pas dit OK.
```

---

## Pourquoi chaque champ compte (rappel express)

- **Objectif unique** → une page avec 3 boutons différents ne convertit pas. On choisit UNE action.
- **Pour qui** → « les indépendants » = trop large = texte tiède. UNE personne précise = texte qui touche.
- **Avant / Après** → c'est le moteur. Le lecteur achète la transformation, pas la fonctionnalité.
- **Preuves** → sans preuve, une promesse forte sonne faux. Caroline, une capture, un chiffre sourcé = confiance.
- **Ton** → c'est ce qui fait que ça sonne comme TOI et pas comme une IA générique.
- **À bannir** → dire ce qu'on NE veut PAS est aussi puissant que dire ce qu'on veut.

---

## Variante express (quand tu es pressée)

Si tu n'as pas le temps de tout remplir, donne-moi au moins ces **3 lignes** — je te pose le reste :

```
Objectif : [l'action visée]
Pour qui : [1 personne type]
Ton + à bannir : [la voix + ce qu'on ne veut pas]
```
