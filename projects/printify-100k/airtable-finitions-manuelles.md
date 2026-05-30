# Finitions manuelles Airtable

**Base créée :** `Printify Designs` — ID `appFVfzRQZBpn4ckQ`
**URL :** https://airtable.com/appFVfzRQZBpn4ckQ
**Workspace :** Espace de travail pro

## Ce qui est déjà fait via MCP ✅

- 4 tables (Sub-niches, Products, Concepts, Designs)
- Tous les champs basiques (text, currency, select, multipleSelects, checkbox, url, attachment)
- 3 liens inter-tables (Concepts→Sub-niches, Designs→Concepts, Designs→Products)
- 3 formules dans Products (Etsy fees est., Margin US, Margin US %)
- **3 Sub-niches** insérées (Golden / Frenchie / Memorial)
- **9 Products** insérés avec marges calculées
- **20 Concepts** insérés (du batch 1)
- **5 Designs** avec SEO complet (Chaotic Good, Mom of Names, Frenchie Soft Girl, Bonjour Frenchie, Paw Prints)

## Session 29 mai 2026 — État final ✅

- ✅ Tous les champs Lookup / Count / Rollup / Date créés (Designs, Concepts, Sub-niches)
- ✅ Toutes les vues créées (Designs × 9, Concepts × 4, Products × 2, Sub-niches × 1)
- ❌ Automatisations Airtable non finalisées — bloquées par bug UI (voir note ci-dessous)

### Note automatisations — à reprendre

**Problème rencontré :** L'interface des automatisations Airtable (FR) ne permet pas de tester le déclencheur ni d'accéder à "Mettre à jour l'entrée" directement. Le test du déclencheur échoue car aucun design n'a Status=Concept au moment du test. Les conditions saisies sont effacées à la réouverture.

**Alternative pour la prochaine session :** Créer ces 3 automatisations via **Make** (scénario Airtable Watch + Update) plutôt que l'UI native Airtable — plus fiable et plus flexible.

---

## Ce qui reste à faire à la main 🛠️

L'API Airtable ne crée pas ces types de fields — il faut les ajouter dans l'UI.

### 1. Ajouter les champs Lookup / Rollup / Count / Date (5 min)

#### Dans la table `Designs`

| Champ à ajouter | Type | Configuration |
|---|---|---|
| `Sub-niche` | Lookup | Source : `Concept` → ramener `Sub-niche` |
| `Personalization` | Lookup | Source : `Concept` → ramener `Personalization` |
| `Created` | Created time | Auto |
| `Modified` | Last modified time | Auto |

#### Dans la table `Concepts`

| Champ à ajouter | Type | Configuration |
|---|---|---|
| `Designs count` | Count | Compte les records liés dans `Designs` (via le champ link auto `Designs`) |
| `Created` | Created time | Auto |

#### Dans la table `Sub-niches`

| Champ à ajouter | Type | Configuration |
|---|---|---|
| `Concepts count` | Count | Compte les records liés dans `Concepts` |
| `Designs count` | Rollup | Source : `Concepts` → champ `Designs count` → fonction SUM |

### 2. Renommer le primary field `Name` en formula (optionnel mais propre)

Dans `Designs`, le champ primaire `Name` est actuellement en singleLineText. Pour qu'il s'auto-remplisse à la création :

→ Changer en **Formula** :
```
IF(
  AND({Concept} != "", {Product} != ""),
  {Concept} & " — " & ARRAYJOIN({Product}, ", "),
  "À nommer"
)
```

⚠️ Attention : transformer un primary field perd les valeurs actuelles. Les 5 Designs existants ont déjà un Name OK, donc à faire seulement si tu veux automatiser pour les futurs.

### 3. Créer les vues (10 min)

#### Table `Designs`

| Vue | Type | Filtre | Tri |
|---|---|---|---|
| **Tous** | Grid | aucun | Created desc |
| **Pipeline Kanban** | Kanban | aucun | Group by `Status` |
| **À traiter SEO** | Grid | `Title` est vide | Created asc |
| **À mockup** | Grid | `Status = SEO done` AND `Mockup image` est vide | Sub-niche |
| **À uploader Printify** | Grid | `Status = Mockup done` | Sub-niche |
| **Live Etsy** | Grid | `Etsy URL` n'est pas vide | Sales count desc |
| **Top winners** | Grid | `Sales count >= 5` | Revenue desc |
| **IP à vérifier** | Grid | `IP risk != low` | aucun |
| **Personnalisés** | Gallery | `Personalization = true` | Sub-niche |

#### Table `Concepts`

| Vue | Filtre |
|---|---|
| **Idées à valider** | `Status = Idea` |
| **Sélectionnés à décliner** | `Status = Selected` AND `Designs count = 0` |
| **En production** | `Status = In production` |
| **IP à vérifier** | `IP risk != low` |

#### Table `Products`

| Vue | Filtre |
|---|---|
| **Actifs** | `Active = true` |
| **Tri par marge** | tri par `Margin US %` desc |

#### Table `Sub-niches`

Une seule vue grid suffit.

### 4. Mettre en place les automatisations Airtable (15 min)

#### Automatisation 1 — Auto-status SEO done

| Étape | Configuration |
|---|---|
| Trigger | When record updated → table `Designs`, watch `Title` |
| Condition | `Title is not empty` AND `Status = Concept` |
| Action | Update record → `Status = SEO done` |

#### Automatisation 2 — Auto-status Mockup done

| Étape | Configuration |
|---|---|
| Trigger | When record updated → `Designs`, watch `Mockup image` |
| Condition | `Mockup image is not empty` AND `Status = SEO done` |
| Action | Update record → `Status = Mockup done` |

#### Automatisation 3 — Auto-status Live Etsy

| Étape | Configuration |
|---|---|
| Trigger | When record updated → `Designs`, watch `Etsy URL` |
| Condition | `Etsy URL is not empty` |
| Action | Update record → `Status = Live Etsy` |

#### Automatisation 4 — Webhook Make (à activer plus tard)

Pour brancher le scénario Make Etsy SEO Generator :

| Étape | Configuration |
|---|---|
| Trigger | When record matches conditions → `Status = Concept` AND `Title is empty` |
| Action | Send to webhook → URL du scénario Make (sera fournie en session Make) |

---

## URLs utiles

| Table | URL |
|---|---|
| Base | https://airtable.com/appFVfzRQZBpn4ckQ |
| Sub-niches | https://airtable.com/appFVfzRQZBpn4ckQ/tbliEjDyFfdQCO8Bf |
| Products | https://airtable.com/appFVfzRQZBpn4ckQ/tbl78HyJwkrdhwOm0 |
| Concepts | https://airtable.com/appFVfzRQZBpn4ckQ/tblZ0Q6nvvrUwgbcJ |
| Designs | https://airtable.com/appFVfzRQZBpn4ckQ/tblk4eH47t1XOXBK1 |

---

## Temps total estimé pour finir

| Action | Temps |
|---|---|
| Ajouter les 8 champs Lookup/Rollup/Count/Date | 5 min |
| Créer les vues (Designs + Concepts + Products) | 10 min |
| Créer les 3 automatisations status | 10 min |
| Renommer primary field Designs en formula (optionnel) | 5 min |
| **Total** | **~25-30 min** |

---

## Vérification — sanity check après finitions

- [ ] Dans `Designs`, le champ `Sub-niche` (lookup) affiche automatiquement la sous-niche du concept lié
- [ ] Dans `Concepts`, `Designs count` affiche le bon nombre de designs déclinés
- [ ] Vue **Pipeline Kanban** dans Designs : les 5 designs apparaissent dans la colonne "SEO done"
- [ ] Vue **À mockup** dans Designs : les 5 designs apparaissent (car Mockup image est vide)
- [ ] Dans `Products`, le champ `Margin US %` affiche bien des pourcentages réalistes (37-43%)
- [ ] Automatisation #1 testée : modifier un Title d'un design avec `Status = Concept` → status doit passer à SEO done
