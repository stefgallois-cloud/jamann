# Session 28/06/2026 — Audit & Correction scénario newsletters

## Statut final : CORRIGÉ ✅

Suite à deux envois accidentels de NL1 (au lieu de NL2), audit complet du scénario Make 6319711 et correction de 6 bugs.

---

## Ce qui s'est passé (post-mortem)

### Envoi NL1 à la place de NL2 (session précédente, 06:21:11)
Cause : M1 sans tri (`maxRecords:1` sans `sort`) → résultat non-déterministe.

### Envoi NL1 à nouveau (cette session, 06:44:47 — 86 ops)
Cause racine : `{Approuve}=1` est **invalide** dans Airtable filterByFormula pour un champ checkbox.
Quand la formule est invalide, Airtable ignore le filtre et retourne tous les records.
Avec `maxRecords:1` sans tri → NL1 (créée en premier) est retournée.
NL1 envoyée à 42 abonnés une deuxième fois.

### Filtre test M2 jamais retiré
Lors du test "envoi uniquement à stef.gallois@gmail.com", le champ email Airtable ne s'appelle pas "Email" → le filtre échoue silencieusement → tous les abonnés reçoivent quand même.
Le filtre test n'avait pas été retiré avant la correction de cette session.

---

## 6 bugs identifiés et corrigés

| # | Sévérité | Bug | Fix |
|---|---|---|---|
| 1 | 🔴 CRITIQUE | M2 avait filtre test `{Email}="stef.gallois@gmail.com"` actif | Supprimé |
| 2 | 🔴 CRITIQUE | `{Approuve}=1` invalide pour checkbox → filtre ignoré | `{fldLL6GNJEcZptDXA}=TRUE()` |
| 3 | 🔴 CRITIQUE | Aucun tri dans M1 → sélection non-déterministe | Sort par Numéro (fldoubtz8ENFb9q8d) ASC |
| 4 | 🟡 | M4 `useColumnId: false` avec clés ID → incohérent | `useColumnId: true` |
| 5 | 🟡 | M2 envoyait aux désinscrits aussi | Filtre `{fldldihiBChtZDO4J}="actif"` |
| 6 | 🟡 | Option Statut "pret à envoyer" avec accent sur `à` | Renommé manuellement par Stéphanie |

---

## Blueprint final corrigé — scénario 6319711

```
M1: Search Newsletters
  - filterByFormula: AND({fldXkOhMRBhN7riYF}="valide",{fldLL6GNJEcZptDXA}=TRUE())
    ↑ IDs de champ (pas de noms) + TRUE() pour checkbox
  - sort: [{field: "fldoubtz8ENFb9q8d", direction: "asc"}]
    ↑ Numéro ASC → toujours la plus petite newsletter en valide
  - maxRecords: 1
  - useColumnId: true
  - connexion PAT: 7851443

M2: Search Abonnés
  - filterByFormula: {fldldihiBChtZDO4J}="actif"
    ↑ Uniquement les abonnés actifs (exclut désinscrits)
  - maxRecords: 500
  - useColumnId: true

M3: Send Email (SMTP Infomaniak)
  - to: {{2.fldx8584w7nIXW93N}}
  - subject: {{1.fldp57R9EglORtgtG}}
  - text: Bonjour {{2.fldSTwfP03NB6Eplq}},\n\n{{1.fldOcbhV0Z4myjAJ1}}
  - contentType: text
  - account: 6599141

M4: Update Newsletter
  - id: {{1.id}}
  - useColumnId: true  ← cohérent avec les clés de champ (IDs)
  - fldXkOhMRBhN7riYF: "envoye"
  - flduucMROTyCoIVkX: {{formatDate(now; "YYYY-MM-DD"; "UTC")}}
  - fldLL6GNJEcZptDXA: false  (décoche Approuve)
  - fldK4K4XNRCbs6i7C: {{2.__IMTINDEX__}}  (nb abonnés envoyés)
  - typecast: true
```

---

## Process d'envoi pour les prochaines newsletters

1. Rédiger/vérifier la newsletter dans Airtable → Statut = **"valide"**
2. Relire le contenu une dernière fois
3. Cocher la case **Approuve** ✅
4. Lancer le scénario Make 6319711 **une seule fois**
5. Après envoi : Statut → "envoye", Approuve décochée auto, date + nb abonnés remplis

**Double sécurité active :**
- Statut = "valide" (action délibérée)
- Approuve = cochée (deuxième confirmation manuelle)
- Tri par Numéro → toujours la newsletter la plus ancienne en attente

---

## Champs Newsletters (tbl31NglSa5SUhKUW)

| ID | Nom | Type |
|---|---|---|
| fldp57R9EglORtgtG | Sujet | singleLineText |
| fldOcbhV0Z4myjAJ1 | Contenu généré | multilineText |
| fldXkOhMRBhN7riYF | Statut | singleSelect: "pret a envoyer" / "valide" / "envoye" |
| fldoubtz8ENFb9q8d | Numéro | number |
| flduucMROTyCoIVkX | Date envoi réel | date |
| fldK4K4XNRCbs6i7C | Nb abonnés envoyés | number |
| fldLL6GNJEcZptDXA | Approuve | checkbox |

## Champs Abonnés (tbljlFKOq5V4MuKVC)

| ID | Nom | Type |
|---|---|---|
| fldx8584w7nIXW93N | (email) | email |
| fldSTwfP03NB6Eplq | Prénom | singleLineText |
| fldldihiBChtZDO4J | Statut | singleSelect: "actif" / "désinscrit" |

---

## IDs clés

| Quoi | ID |
|---|---|
| Scénario Make envoi newsletters | 6319711 |
| Base Airtable | app6TseIO7Sx4fJqv |
| Table Newsletters | tbl31NglSa5SUhKUW |
| Table Abonnés | tbljlFKOq5V4MuKVC |
| Connexion Airtable PAT | 7851443 |
| Connexion SMTP Infomaniak | 6599141 |
| Scénario bienvenue (NE PAS TOUCHER) | 5250355 |

## Contraintes

- **JAMAIS toucher** au scénario 5250355 (bienvenue abonnés)
- **Connexion Airtable = PAT uniquement** (pas OAuth)
- **Ne jamais relancer** le scénario si Make donne une erreur 502 — vérifier l'historique d'abord
- **filterByFormula = toujours IDs de champ** (fldXXX) pour éviter les bugs d'accents/noms
- **Checkbox Airtable = `=TRUE()` dans filterByFormula** — jamais `=1`
- **Ne jamais tester en prod** — pas de filtre email sur M2 ; tester via un abonné test dédié si besoin
