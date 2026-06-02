# Checklist comptes externes

**Date :** 2026-05-28
**Objectif :** ouvrir tous les comptes nécessaires en ~2h cumulées (étalées sur 2-3 jours à cause des vérifications).

---

## Ordre d'ouverture optimal

```
Jour 1 (rapide, 45 min total)
├─ 1. Google AI Studio        → gratuit, immédiat (backup mockup)
├─ 2. Ideogram                → $8/mois, immédiat (outil mockup principal)
├─ 3. Anthropic API           → $5 free, immédiat
└─ 4. Pinterest Business      → gratuit, immédiat

Jour 1-2 (vérifications, attente 24-48h)
└─ 5. Etsy vendor             → ouverture immédiate, vérif KYC en 24-48h

Jour 2-3 (post-Etsy validé)
├─ 6. Printify                → gratuit au démarrage (Premium $29 en M3)
└─ 7. eRank                   → $9/mois, IMPÉRATIF pour validation niche
```

> 🔄 **Note 2026-05-28 :** Ideogram ajouté à la liste (reco révisée — cf. mockup-briefs-batch-1.md). Ideogram > Nano Banana pour zéro risque qualité au démarrage.

---

## 1. Google AI Studio (Nano Banana / Gemini)

**URL :** https://aistudio.google.com
**Coût :** Gratuit (limites : 1500 requêtes/jour)
**Temps setup :** 5 min

### Steps

1. Se connecter avec compte Google (perso ou Workspace)
2. Accepter les CGU
3. Tester un prompt simple (n'importe lequel)
4. Confirmer accès à **Gemini 2.5 Flash Image**

### À récupérer

- (Optionnel) Clé API : Settings → API keys → Create API key. À garder précieusement pour automatiser via Make plus tard.

### Critère de validation

- [ ] Tu peux générer une image en cliquant Send dans le chat

---

## 2. Anthropic API

**URL :** https://console.anthropic.com
**Coût :** $5 crédit gratuit, puis pay-as-you-go (~$0.007 par design SEO en Sonnet 4.6)
**Temps setup :** 10 min

### Steps

1. Sign up → email perso ou Clockwork Ops
2. Vérification email
3. Onboarding : choisir "I'm a developer / I want to use the API"
4. Setup billing :
   - Settings → Billing → Add payment method
   - Carte CB (peux mettre $20 initial autoreload pour éviter coupures)
5. Créer une API key :
   - Settings → API Keys → Create Key
   - Nom : `make-printify-100k`
   - Permissions : par défaut (toutes)
   - **Copier la clé immédiatement** → la coller dans un gestionnaire de mots de passe (Bitwarden, 1Password)
   - ⚠️ Tu ne pourras plus la voir après cette page

### À récupérer

- Clé API qui commence par `sk-ant-...`

### Critère de validation

- [ ] Tu vois ton crédit de $5 dans la page Billing
- [ ] La clé API est stockée en lieu sûr

---

## 3. Pinterest Business

**URL :** https://business.pinterest.com
**Coût :** Gratuit
**Temps setup :** 10 min

### Steps

1. Sign up → choisir Business account (pas perso)
2. Nom du business : `[À choisir — voir note]`
3. Country : Switzerland ou France (selon ta résidence)
4. Description courte
5. Skip la pub setup au démarrage
6. Confirmer email

### Note nom du shop

Décide ton nom de shop **avant** de créer le compte. Idées :

- Lié à la niche pet : `Pawprint Studio`, `Golden Hour Goods`, `Frenchie & Co`
- Marque parapluie : `Atelier Pet` (cohérent avec L'Atelier des Automates)
- Générique POD : `[Ton prénom] Designs`

**Recommandation :** un nom **niche-able** mais pas trop niché (au cas où tu pivotes). Ex : `Coastal Paw Studio`, `Bonjour Beasts`.

### À récupérer

- URL profil Pinterest
- Account ID (utile pour brancher Tailwind plus tard)

### Critère de validation

- [ ] Tu peux créer un pin de test
- [ ] Tu vois la section Analytics

---

## 4. Etsy vendor

**URL :** https://www.etsy.com/sell
**Coût :** Gratuit ouverture, $0.20 par listing + 6.5% transaction + 3% + $0.25 paiement
**Temps setup actif :** 30-45 min · **Attente vérification :** 24-48h

### Steps

1. Sign up sur etsy.com (compte client d'abord si pas déjà)
2. Sell on Etsy → Open your shop
3. **Shop preferences :**
   - Language : English (cible US + EU)
   - Country : Switzerland (Etsy a une bonne intégration paiement CH) ou France
   - Currency : USD (pour cohérence avec US prix Etsy) ou CHF
4. **Shop name :**
   - 4-20 caractères, alphanumeric
   - Décider à l'avance (cf. Pinterest ci-dessus)
   - **Tester la dispo** avant de finaliser
5. **Add a listing (obligatoire pour finaliser) :**
   - Peux mettre un listing "draft" temporaire (un mockup quelconque)
   - Pas besoin que ce soit final — c'est juste pour valider l'ouverture
6. **Payment setup (Etsy Payments) :**
   - IBAN + identité (passport ou ID)
   - Adresse fiscale
7. **Billing :**
   - Carte CB pour payer les frais Etsy
8. **Soumettre pour vérification** → attendre 24-48h

### À récupérer

- Shop URL (etsy.com/shop/TONSHOP)
- Shop ID (utile pour Make + eRank)

### Critère de validation

- [ ] Tu reçois l'email "Your shop is now open"
- [ ] Tu peux créer et publier un listing test

### Notes légales Suisse / France

- **Suisse :** auto-entreprise pas nécessaire si revenus <CHF 100k/an. Au-delà, structure légale obligatoire.
- **France :** auto-entrepreneur (micro-entreprise) suffit jusqu'à €77 700/an. C'est ton statut actuel (déjà freelance Clockwork Ops).
- TVA : Etsy collecte la VAT EU pour toi. Tu factures HT en compta perso.

---

## 5. Printify

**URL :** https://printify.com
**Coût :** Free OU $29/mois Premium (-20% sur produits)
**Temps setup :** 15 min

### Steps

1. Sign up
2. Choisir Free pour démarrer (passer en Premium quand tu atteins 30-50 ventes/mois — l'économie compense largement)
3. **Connecter Etsy :**
   - Settings → Connections → Etsy → Connect
   - Login Etsy → autoriser
4. **Choisir provider par défaut :** ne PAS utiliser auto-routing. Sélectionner manuellement.
5. Setup adresse de retour (la tienne)
6. Setup TVA :
   - EU customers : Etsy gère
   - US customers : Printify gère la sales tax
7. Faire un test de listing :
   - Catalog → T-shirt Bella+Canvas 3001 → choisir Swift POD
   - Upload un design test (n'importe lequel)
   - Publier vers Etsy (mode draft)
   - Vérifier que le listing apparaît dans Etsy

### À récupérer

- Account ID Printify
- API key (Settings → Connections → API → Generate Token) — pour Make plus tard

### Critère de validation

- [ ] Connexion Etsy ↔ Printify active
- [ ] Tu peux pousser un listing vers Etsy depuis Printify

### Quand basculer en Premium

| Critère | Free | Premium |
|---|---|---|
| Coût | $0 | $29/mois |
| Réduction produits | 0% | -20% |
| Limite shops connectés | 5 | 10 |

**Calcul :** Premium = profitable dès **15-20 ventes/mois** (économie -20% × $14/produit moyen × 20 = $56 économie pour $29 coût). À basculer en mois 2-3.

---

## 6. eRank (SEO Etsy)

**URL :** https://erank.com
**Coût :** Free OU $9/mois Basic OU $20/mois Pro
**Temps setup :** 5 min

### Steps

1. Sign up (lié à ton compte Etsy)
2. Connecter ton shop Etsy (autoriser eRank à lire tes stats)
3. Tour de l'interface :
   - **Keyword Explorer** : volume + concurrence par mot-clé
   - **Keyword Tool** : suggestions de tags pour un listing
   - **Trend Buzz** : ce qui monte cette semaine
   - **Listing Audit** : score qualité par listing

### À récupérer

- Compte eRank lié au shop

### Critère de validation

- [ ] Tu vois ton shop dans le dashboard eRank

### Pourquoi indispensable

eRank te dit, **pour chaque tag de chaque listing** :
- Volume de recherche réel sur Etsy
- Niveau de concurrence (1-10)
- Suggestions long-tail

Sans eRank, tu pilotes à l'aveugle. Avec, tu sais exactement quels tags activer pour chaque design.

---

## Récap des coûts mois 1 (révisé avec Ideogram)

| Compte | Coût initial | Coût récurrent |
|---|---|---|
| Google AI Studio | $0 | $0 |
| **Ideogram** | $0 | **$8/mois** |
| Anthropic API | -$5 free | ~$1-3/mois en démarrage |
| Pinterest Business | $0 | $0 |
| Etsy vendor | $0 | $0.20/listing + fees |
| Printify Free | $0 | $0 (Premium $29 mois 2+) |
| eRank Basic | $0 | $9/mois |
| **Total démarrage** | **-$5** | **~$18/mois** |
| **Total M3-Q3** | | **~$50/mois** (+ Printify Premium) |
| **Total Q4 (avec ads)** | | **~$300-500/mois** |

---

## Sécurité — où ranger les clés

**Recommandation :** Bitwarden (gratuit, open source) ou 1Password.

À stocker :
- Clé API Anthropic (sk-ant-...)
- Clé API Google AI (si générée)
- Clé API Printify
- Token Airtable (déjà créé via Claude pour la base Designs)
- Mot de passe Etsy + 2FA backup codes
- Mot de passe Printify + 2FA

**À ne JAMAIS commiter dans git** ni laisser dans le code.

---

## Checklist d'avancement

### Jour 1 — Rapide (30 min)

- [ ] Google AI Studio ouvert + test génération image
- [ ] Anthropic API : clé créée + stockée + $5 crédit visible
- [ ] Pinterest Business : compte créé + nom shop décidé

### Jour 1-2 — Etsy (45 min + 24-48h attente)

- [ ] Etsy vendor : ouverture demandée
- [ ] Email "Shop open" reçu

### Jour 2-3 — Production

- [ ] Printify connecté à Etsy
- [x] eRank Basic activé et connecté Etsy (Abonnement mensuel pris le 31 mai 2026 ✅)
- [ ] 1er listing test poussé Etsy via Printify (draft)
- [ ] Test scénario Make Etsy SEO Generator avec une vraie clé API

---

## Une fois tout ouvert

Reviens me voir avec :
- ✅ Clé API Anthropic prête (stockée)
- ✅ Shop Etsy validé
- ✅ Printify connecté

→ On lance le **scénario Make Etsy SEO Generator** sur les 5 designs du batch 1 pour valider le pipeline en vrai
→ On génère les 5 mockups Nano Banana
→ On publie les 5 premiers listings Etsy
→ Premier batch live !
