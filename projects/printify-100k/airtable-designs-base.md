# Base Airtable — Printify Designs

**Nom suggéré :** `Printify Designs`
**Workspace :** Clockwork Ops (ou Stef perso)
**Statut :** spec prête, à créer.

## Logique de la base

Une base unique qui orchestre :
- Le **catalogue de concepts** (réservoir d'idées)
- Le **pipeline de production** (concept → SEO → mockup → upload → live)
- Le **catalogue produits Printify** (avec marges calculées)
- Les **sous-niches** (Golden / Frenchie / Memorial)

Les 4 tables sont reliées pour ne jamais dupliquer une info.

---

## Schéma des 4 tables

```
SUB-NICHES ──┬──< CONCEPTS ──< DESIGNS >── PRODUCTS
             │
             └── (filtre dimensionnel)
```

- 1 Sous-niche → N Concepts
- 1 Concept → N Designs (un même concept décliné sur plusieurs produits)
- 1 Produit → N Designs
- 1 Design = 1 listing Etsy/Shopify (1 concept × 1 produit)

---

## Table 1 — `Designs` (la table opérationnelle)

C'est ici que la prod se passe. Chaque ligne = 1 listing futur.

| Champ | Type | Notes |
|---|---|---|
| `Design ID` | Autonumber | ID auto |
| `Name` | Formula | `CONCATENATE({Concept name}, " — ", {Product name})` (champ primaire) |
| `Concept` | Link → Concepts | Le concept source |
| `Product` | Link → Products | Le produit Printify |
| `Sub-niche` | Lookup (Concepts → Sub-niche) | Auto, pas saisi |
| `Personalization` | Checkbox | Lookup de Concept |
| `Personalization field` | Lookup (Concepts) | Auto |
| `Title` | Long text | Sortie Etsy SEO Generator |
| `Tags` | Long text | 13 tags séparés par virgules |
| `Description` | Long text | 3 paragraphes |
| `Mockup keywords` | Long text | Brief Midjourney/Ideogram |
| `IP risk` | Single select | low / medium / high |
| `IP risk note` | Long text | |
| `Mockup image` | Attachment | Visuel final |
| `Status` | Single select | Idea / Concept / SEO done / Mockup done / Uploaded Printify / Live Etsy / Live Shopify / Paused / Retired |
| `Etsy URL` | URL | |
| `Shopify URL` | URL | |
| `Printify product ID` | Single line text | |
| `Sales count` | Number | Mis à jour manuel ou via Make |
| `Revenue` | Currency | |
| `Created` | Created time | Auto |
| `Modified` | Last modified | Auto |
| `Notes` | Long text | |

### Vues à créer

| Vue | Type | Filtre | Tri / Groupe |
|---|---|---|---|
| **Tous** | Grid | aucun | Created desc |
| **Pipeline Kanban** | Kanban | aucun | Group by Status |
| **À traiter SEO** | Grid | `Title is empty` | Created asc |
| **À mockup** | Grid | `Status = SEO done` AND `Mockup image is empty` | Sub-niche |
| **À uploader Printify** | Grid | `Status = Mockup done` | Sub-niche |
| **Live Etsy** | Grid | `Etsy URL is not empty` | Sales count desc |
| **Top winners** | Grid | `Sales count >= 5` | Revenue desc |
| **IP à vérifier** | Grid | `IP risk = medium OR high` | aucun |
| **Personnalisés** | Gallery | `Personalization = true` | Sub-niche |

### Automatisations Airtable

1. **Auto-status SEO done**
   - Trigger : Record updated → champ `Title`
   - Condition : `Title is not empty` AND `Status = Concept`
   - Action : Update record → `Status = SEO done`

2. **Auto-status Mockup done**
   - Trigger : Record updated → champ `Mockup image`
   - Condition : `Mockup image is not empty` AND `Status = SEO done`
   - Action : Update record → `Status = Mockup done`

3. **Auto-status Live Etsy**
   - Trigger : Record updated → champ `Etsy URL`
   - Condition : `Etsy URL is not empty`
   - Action : Update record → `Status = Live Etsy`

4. **Webhook Make — Etsy SEO Generator** *(à activer en session Make)*
   - Trigger : Record updated → `Status = Concept` AND `Title is empty`
   - Action : Send to webhook (Make scénario `Etsy SEO Generator`)

---

## Table 2 — `Concepts` (catalogue d'idées)

C'est ici que les sorties du Concept Generator atterrissent. Un concept peut générer 1 à N Designs (1 par produit cible).

| Champ | Type | Notes |
|---|---|---|
| `Concept` | Single line text | Texte du concept (primaire) |
| `Sub-niche` | Link → Sub-niches | |
| `Type` | Single select | humor / personalization / seasonal / memorial / cross-niche |
| `Audience` | Long text | 1 phrase |
| `Emotional hook` | Long text | 1 phrase |
| `Personalization` | Checkbox | |
| `Personalization field` | Single line text | Si personnalisable |
| `Product suggestions` | Multiple select | T-shirt, Sweat, Mug, Tote, Poster, Embroidered |
| `IP risk` | Single select | low / medium / high |
| `IP risk note` | Long text | |
| `Status` | Single select | Idea / Selected / In production / Live / Retired |
| `Linked Designs` | Link → Designs | Auto, montre tous les designs créés depuis ce concept |
| `Designs count` | Count (Linked Designs) | Combien de produits déclinés |
| `Created` | Created time | |
| `Source` | Single select | Concept Generator / Manual / Imported |

### Vues

| Vue | Filtre |
|---|---|
| **Tous** | aucun |
| **Idées à valider** | `Status = Idea` |
| **Sélectionnés (à décliner)** | `Status = Selected` AND `Designs count = 0` |
| **En production** | `Status = In production` |
| **IP à vérifier** | `IP risk != low` |

---

## Table 3 — `Products` (catalogue Printify avec marges)

| Champ | Type | Notes |
|---|---|---|
| `Product name` | Single line text | "T-shirt Bella+Canvas 3001" |
| `Type` | Single select | T-shirt / Sweatshirt / Mug / Tote / Poster / Embroidered |
| `Brand model` | Single line text | "Bella+Canvas 3001" |
| `Provider US` | Single select | Swift POD / Monster Digital / Drive Fulfillment / MyLocker / District Photo |
| `Provider EU` | Single select | Gelato / SPOD / Print Logistic |
| `Cost Printify` | Currency (USD) | |
| `Shipping US` | Currency | |
| `Shipping EU` | Currency | |
| `Suggested price` | Currency | |
| `Etsy fees est.` | Formula | `({Suggested price} * 0.065) + 0.2 + ({Suggested price} * 0.03 + 0.25)` |
| `Margin US` | Formula | `{Suggested price} - {Cost Printify} - {Shipping US} - {Etsy fees est.}` |
| `Margin US %` | Formula | `ROUND(({Margin US} / {Suggested price}) * 100, 1)` |
| `Active` | Checkbox | |
| `Notes` | Long text | |

### Records initiaux (à pré-remplir)

| Product name | Type | Provider US | Provider EU | Cost | Ship US | Price |
|---|---|---|---|---|---|---|
| T-shirt Bella+Canvas 3001 | T-shirt | Swift POD | Gelato | 8.50 | 4.50 | 25 |
| T-shirt Comfort Colors | T-shirt | Swift POD | Gelato | 11.50 | 4.50 | 28 |
| Sweat Gildan 18000 | Sweatshirt | Swift POD | Gelato | 19.00 | 5.00 | 45 |
| Hoodie Gildan 18500 | Sweatshirt | Swift POD | Gelato | 23.00 | 5.00 | 50 |
| Mug 11oz céramique | Mug | Drive Fulfillment | Gelato | 5.50 | 4.00 | 20 |
| Tumbler 20oz | Mug | Drive Fulfillment | Gelato | 14.00 | 5.00 | 34 |
| Tote bag canvas | Tote | Monster Digital | Gelato | 10.00 | 4.50 | 25 |
| Poster mat 18×24 | Poster | Sensaria | Gelato | 9.00 | 5.50 | 32 |
| Sweat brodé MyLocker | Embroidered | MyLocker | — | 26.00 | 5.50 | 65 |

---

## Table 4 — `Sub-niches`

| Champ | Type | Notes |
|---|---|---|
| `Name` | Single line text | primaire |
| `Parent niche` | Single select | Pet / Profession / Aesthetic / Hobby |
| `Description` | Long text | |
| `Target audience` | Long text | |
| `Active` | Checkbox | |
| `Linked Concepts` | Link → Concepts | Auto |
| `Concepts count` | Count | |
| `Designs count` | Rollup (Concepts → Designs count, SUM) | |

### Records initiaux

| Name | Parent niche | Description |
|---|---|---|
| Golden Retriever × personnalité | Pet | Humour Gen Z, anxiété, chaotic energy, mom of N |
| French Bulldog × coquette | Pet | Cross-tendance soft girl, bow era, urbain |
| Memorial pets toutes races | Pet | Memorial, sympathy, rainbow bridge, premium AOV |

---

## Connexion à Make (préparation)

Le scénario Make `Etsy SEO Generator` aura cette logique :

```
1. Trigger : Airtable Watch Records → Vue "À traiter SEO"
2. HTTP : Anthropic API → prompt Etsy SEO Generator
3. JSON : Parse réponse
4. Airtable Update : remplir Title + Tags + Description + Mockup keywords + IP risk
   → l'auto-status passera à "SEO done" automatiquement
```

Le scénario Make `Concept Generator` (1×/semaine) :

```
1. Trigger : Manuel ou cron hebdo
2. HTTP : Anthropic API → prompt Concept Generator (n=50)
3. Iterator : sur concepts[]
4. Airtable Create : crée N records dans Concepts (Status = Idea)
```

---

## Création de la base — 2 options

**Option A — Création directe via MCP Airtable** (je peux le faire ici)
- Avantage : tout est prêt en 5 minutes, schéma garanti correct
- Inconvénient : tu n'auras pas "fait" toi-même → moins d'apprentissage

**Option B — Tu la crées à partir de cette spec**
- Avantage : tu mémorises la structure, utile pour la cert
- Inconvénient : ~30-45 min de saisie

Si tu veux ça en mode certif (option B), je peux te guider table par table. Sinon je lance la création directe.
