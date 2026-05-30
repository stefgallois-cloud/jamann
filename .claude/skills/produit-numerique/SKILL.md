---
name: produit-numerique
description: >
  Skill pour créer, structurer et vendre des produits numériques : guides PDF, mini-apps web,
  formations, templates, outils no-code. Utilise cette skill quand Stef veut : structurer un guide PDF,
  créer une mini-app ou outil web, définir le contenu d'une formation ou programme, choisir son
  stack technique pour un produit numérique, préparer une page de vente pour un produit digital,
  concevoir l'expérience utilisateur d'un produit, ou travailler sur Surf Ready, Dos Libre 60j,
  Reset Ménopause, ou tout autre produit numérique à vendre. Aussi pour : choix d'outil de livraison,
  mise en page, export, hébergement, paiement en ligne.
---

# Produit Numérique

## Contexte utilisateur
Stef crée des produits numériques solo : guides PDF, mini-apps, programmes.
Projets actifs : Surf Ready (guide + app, écoles de surf), Dos Libre 60j, Reset Ménopause.

---

## Types de produits & leur logique

| Produit | Meilleur pour | Complexité prod. | Prix moyen marché |
|---------|--------------|-----------------|-------------------|
| Guide PDF | Expertise packagée, quick win | Faible | 9–49 € |
| Checklist / Template | Outil réutilisable | Très faible | 5–29 € |
| Mini-app web | Outil interactif | Moyenne | Free + upsell ou abonnement |
| Programme (60j, etc.) | Transformation longue | Moyenne | 97–497 € |
| Formation vidéo | Apprentissage guidé | Élevée | 197–997 € |

---

## Guide PDF : processus de création

### 1. Cadrage
- **Pour qui exactement ?** (ex : moniteurs de surf débutants, femmes 45+ avec hernie discale)
- **Quel problème résout-il ?** (1 problème, 1 guide)
- **Quel résultat concret** après lecture ?
- **Format** : how-to, référence, programme, cas pratique

### 2. Structure type
```
Page de couverture
Sommaire
Introduction (problème + promesse)
  Chapitre 1 : contexte / pourquoi
  Chapitre 2 : méthode / comment
  Chapitre 3 : mise en pratique / exercices
  Chapitre 4 : FAQ / erreurs courantes
Conclusion + prochaines étapes
Ressources / liens utiles
Page de contact / offres
```

### 3. Mise en page
- Outil recommandé : **Canva** (rapide, templates pro) ou **Adobe Express**
- Pour du plus technique : **Figma** ou **InDesign**
- Export : toujours en PDF avec polices intégrées
- Format : A4 ou 16:9 (selon usage : imprimé vs écran)
- Lisibilité : max 2 polices, contraste fort, beaucoup d'espace blanc

### 4. Livraison
- Hébergement fichier : **Gumroad**, **Lemon Squeezy**, **Payhip**, **Stan Store**
- Accès direct après paiement (lien de téléchargement automatique)
- Email de confirmation : automatiser avec Make ou la plateforme native

---

## Mini-app web : stack recommandé

### Pour Stef (no-code / low-code prioritaire)
| Besoin | Outil recommandé |
|--------|-----------------|
| App interactive simple | **Glide**, **Softr**, **Bubble** |
| App avec IA intégrée | **Lovable**, **Bolt.new**, **v0** |
| Quiz / outil de diagnostic | **Typeform + logique** ou **Tally** |
| App sur GitHub (code) | React/Next.js + Vercel (déploiement gratuit) |

### Pour Surf Ready spécifiquement
- Contenu statique → **Next.js sur Vercel** ou **Webflow**
- Fonctionnalités : quiz niveau, fiche de progression, lexique surf
- Hébergement : gratuit sur Vercel/Netlify jusqu'à usage pro

---

## Programme / Méthode (60j, etc.)

### Architecture type d'un programme
```
Introduction : pourquoi ce programme, comment l'utiliser
Semaine 1 : fondations (diagnostic, point de départ)
Semaines 2-7 : progression (contenu graduel, exercices)
Semaine 8 : intégration + maintien
Bonus : ressources complémentaires, FAQ
```

### Format des contenus
- PDF = référence (à garder)
- Vidéo = explication + démonstration
- Audio = pour exercices, méditations, pratique
- Checklist hebdo = action concrète
- Tracker = suivi de progression

---

## Vendre un produit numérique

### Plateforme de vente : laquelle choisir

| Plateforme | Idéale pour | Commission | Points forts |
|-----------|------------|------------|--------------|
| **Gumroad** | PDF, templates, apps | 10% | Simple, rapide à lancer |
| **Lemon Squeezy** | PDF + abonnements | 5% + 50c/vente | Gestion TVA UE automatique ✅ |
| **Payhip** | PDF, formations | 5% (gratuit) | Bon rapport qualité/prix |
| **Stan Store** | Créateurs, petits produits | ~29$/mois | Tout-en-un (lien en bio) |
| **Stripe direct** | Si tu as un site | 1,5% + 0,25€ | Zéro commission plateforme |

**Recommandation pour démarrer :** Lemon Squeezy — gère la TVA européenne automatiquement (crucial si tu vends à des clients UE hors France), interface pro, commission raisonnable.

---

### Tunnel de vente minimal qui fonctionne

```
Trafic (LinkedIn / partenaires / SEO)
        ↓
Page de vente (1 page, 1 produit, 1 CTA)
        ↓
Page de paiement (Lemon Squeezy / Gumroad)
        ↓
Livraison automatique (lien téléchargement ou accès app)
        ↓
Email de bienvenue (automatisé via Make ou plateforme)
        ↓
Séquence email 3-5 jours (valeur + upsell)
```

### Page de vente : structure qui convertit

```
[Headline : résultat concret pour qui]
[Sous-titre : comment, en combien de temps]

[Le problème — le lecteur se reconnaît]
[La promesse — ce qui change après]

[Ce que tu vas recevoir — liste claire]
[Aperçu / extrait gratuit]

[Preuve : témoignage, chiffre, ton expérience]

[Prix + bouton CTA]
[Garantie si applicable]
[FAQ 3-5 questions]
```

### Email de bienvenue après achat (automatiser avec Make)

```
Objet : Ton accès à [nom du produit] 🎉

[Prénom],

Voilà ton lien : [lien]

Ce que je te conseille de faire en premier : [action rapide]

Si tu as une question : [email / lien]

[Prénom]
```
→ Automatiser : Lemon Squeezy webhook → Make → email via Gmail ou Brevo

### Séquence post-achat (3 emails sur 5 jours)

- **J+1** : "As-tu commencé ?" — tip pratique, encouragement
- **J+3** : Valeur supplémentaire — contenu bonus ou astuce non présente dans le produit
- **J+5** : Upsell doux — "Si tu veux aller plus loin, j'ai aussi..."

---

### Canaux pour trouver des acheteurs

**Pour Surf Ready (B2B écoles de surf) :**
- Contact direct par email/Instagram aux écoles d'Anza et côte marocaine
- Groupes Facebook surf Maroc / moniteurs de surf
- Partenariat : l'école vend ou offre le guide à ses élèves (revshare ou prix de gros)

**Pour Dos Libre 60j / Reset Ménopause (B2C femmes 40+) :**
- Instagram (contenu régulier, Reels, témoignages)
- Pinterest (SEO fort sur santé/bien-être)
- Groupes Facebook femmes 40-55 ans
- Partenariat kiné, ostéo, coach bien-être

**Pour produits B2B automatisation :**
- LinkedIn (posts + DM ciblés)
- Communautés no-code / Make (Facebook, Discord)

---

### Pricing

- Trop bas = perçu comme sans valeur — minimum 19€ pour un PDF sérieux
- **Ancrer** avec une version premium : guide seul 29€ / guide + session 99€
- **Extrait gratuit** (3-5 pages) → convertit bien mieux qu'une description seule
- **Pré-vente** à prix réduit avant la finalisation = valide le marché ET génère du cash

### Métriques à suivre dès le départ
- Taux de conversion page de vente (objectif : 2-5%)
- Coût d'acquisition (si tu as des pubs) vs marge
- Taux d'ouverture emails post-achat
- Avis / retours clients → améliorer le produit

---

## Projets en cours : état & prochaines étapes

### Surf Ready
- Contenu rédigé ✅
- Mise en page PDF : à faire (Canva recommandé)
- Mini-app : structurer les fonctionnalités clés d'abord
- Distribution : écoles de surf Anza (approche directe)

### Dos Libre 60j
- Programme rédigé ✅
- Format : PDF programme semaine par semaine + vidéos démo à prévoir
- Cible : femmes 40+ avec douleurs chroniques

### Reset Ménopause
- À développer — prévoir cadrage complet (pour qui, quoi, format, prix)
