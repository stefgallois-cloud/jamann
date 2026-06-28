# Session 24-25/06/2026 — Automatisation newsletters Le Manoïre

## Statut final : FONCTIONNEL ✅

Le scénario Make 6319711 envoie les newsletters aux 40 abonnés via SMTP Infomaniak.

---

## Ce qui fonctionne

- **Flux complet M1→M2→M3→M4** validé (ops=82 = 1+1+40+40)
- **SMTP Infomaniak** : connexion 6599141, email contact@lemanoire-jaman.ch
- **Airtable mise à jour** : Statut → "envoye" + Date envoi réel remplie

---

## Cause racine du problème (résolu)

**Bug Make Airtable v3** : les accents dans les valeurs `filterByFormula` sont mal encodés lors de la transmission URL. Résultat silencieux : 0 records retournés.

**Solution** : supprimer tous les accents des options singleSelect Airtable + utiliser des formules ASCII pures.

---

## Modifications Airtable effectuées

Options du champ Statut (tbl31NglSa5SUhKUW, fldXkOhMRBhN7riYF) renommées sans accents :
- "envoyé" → **"envoye"**
- "validé" → **"valide"**
- "prêt à envoyer" → **"pret a envoyer"**

---

## Blueprint final scénario 6319711

```
M1: Search Newsletters
  - filterByFormula: {Statut}="valide"  ← ASCII pur
  - maxRecords: 1
  - useColumnId: true
  - connexion PAT: 7851443

M2: Search Abonnés
  - table: tbljlFKOq5V4MuKVC
  - maxRecords: 500
  - useColumnId: true
  - aucun filtre

[AUCUN filtre Make entre modules]

M3: Send Email (SMTP Infomaniak)
  - to: {{2.fldx8584w7nIXW93N}}          ← Email abonné
  - subject: {{1.fldp57R9EglORtgtG}}     ← Sujet newsletter
  - text: Bonjour {{2.fldSTwfP03NB6Eplq}},\n\n{{1.fldOcbhV0Z4myjAJ1}}
                                         ← Salutation personnalisée + contenu
  - contentType: text
  - account: 6599141

M4: Update Newsletter
  - id: {{1.id}}
  - fldXkOhMRBhN7riYF: "envoye"
  - flduucMROTyCoIVkX: {{formatDate(now; "YYYY-MM-DD"; "UTC")}}
  - typecast: true
```

---

## Process d'envoi pour les prochaines newsletters

1. Rédiger la newsletter dans Airtable (table Newsletters)
2. Mettre le statut à **"valide"**
3. Lancer le scénario Make 6319711 **une seule fois**
4. Les 40 abonnés reçoivent → statut passe automatiquement à "envoye"

**Protection anti-doublon intégrée** : M1 filtre sur `{Statut}="valide"` — une newsletter déjà envoyée ne peut pas repartir.

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

## Champs Newsletters (tbl31NglSa5SUhKUW)

- fldp57R9EglORtgtG : Sujet
- fldOcbhV0Z4myjAJ1 : Contenu généré
- fldXkOhMRBhN7riYF : Statut (pret a envoyer / valide / envoye)
- flduucMROTyCoIVkX : Date envoi réel

## Champs Abonnés (tbljlFKOq5V4MuKVC)

- fldx8584w7nIXW93N : Email
- fldSTwfP03NB6Eplq : Prenom
- fldldihiBChtZDO4J : Statut (actif / desinscrit)

## Contraintes

- **JAMAIS toucher** au scénario 5250355 (bienvenue abonnés)
- **Connexion Airtable = PAT uniquement** (pas OAuth)
- **Ne jamais relancer** le scénario si Make donne une erreur 502 — vérifier l'historique d'abord
