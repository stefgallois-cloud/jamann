# Compétence : Routeur Make + champs Airtable (singleSelect)

Résolution du bug classique où le BasicRouter Make ne route pas correctement sur un champ singleSelect Airtable.

---

## Le problème

Dans Make, quand le module Airtable retourne un champ `singleSelect`, la valeur n'est **pas** une chaîne de texte.
Elle est retournée comme un **objet** : `{name: "Approuvé", id: "sel...", color: "..."}`.

Donc la condition de routeur :
```
{{1.Validation}} = "Approuvé"   ← NE FONCTIONNE PAS
```
retourne `[object Object]` au lieu de `"Approuvé"` → le routeur ne matche jamais.

---

## La solution — double condition OR (robuste)

Dans le filtre du BasicRouter, utiliser **deux conditions en OR** :

```json
"conditions": [
  [{"a": "{{1.Validation.name}}", "b": "Approuvé", "o": "text:equal"}],
  [{"a": "{{1.Validation}}", "b": "Approuvé", "o": "text:equal"}]
]
```

- **Condition 1** : `{{1.Validation.name}}` → accède à la propriété `.name` de l'objet (cas Make ≥ v3)
- **Condition 2** : `{{1.Validation}}` → fallback si le champ est déjà une chaîne (comportement selon version)

Dans la structure Make, l'array externe est un **OR** : si l'une ou l'autre condition est vraie, la route est prise.

---

## Règle : toujours déclarer les champs dans le module Search

Sans la liste explicite des champs, Make ne crée **aucune variable** — tout est vide :

```json
"fields": ["Facebook", "Instagram", "Hashtags", "Validation", "Date", "Email envoyé", "Nom du post"]
```

Sans ce tableau, `{{1.Validation}}` est undefined → ni la condition Airtable ni le routeur ne fonctionnent.

---

## Pattern anti-doublon — éviter de retraiter un record

Pour ne pas traiter deux fois le même record, utiliser le champ **Email envoyé** (checkbox) comme marqueur :

```
filterByFormula: OR(
  AND({Validation}="Approuvé", IS_SAME({Date},TODAY(),'day'), NOT({Email envoyé})),
  AND({Validation}="Refusé", NOT({Email envoyé}))
)
```

Après traitement, mettre `Email envoyé = true` sur le record (même pour les Refusé traités).
Avantage : le record "Refusé" garde son statut (historique) mais ne sera plus rejoué.

---

## Architecture du scénario Manoïre (référence)

```
Module 1 — Airtable Search
  filterByFormula: OR(Approuvé+today+!emailEnvoyé, Refusé+!emailEnvoyé)
  fields: [Facebook, Instagram, Hashtags, Visuel, Validation, Date, Email envoyé, ...]
      ↓
Module 2 — BasicRouter
  ├── Route A : Approuvé ({{1.Validation.name}} OR {{1.Validation}} = "Approuvé")
  │     Module 3 → Email rappel au client (texte FB + IG + lien Airtable)
  │     Module 9 → Airtable : Email envoyé = true
  │
  └── Route B : Refusé ({{1.Validation.name}} OR {{1.Validation}} = "Refusé")
        Module 5 → HTTP POST Claude API (sonnet-4-6) → génère {facebook, instagram, hashtags}
        Module 6 → JSON Parse ({{5.content[1].text}})
        Module 7 → Airtable : crée nouveau record (Validation=Approuvé)
        Module 8 → Airtable : Email envoyé = true sur ancien record
        Module 11 → Email confirmation avec nouveau texte
```

---

## Module HTTP — Claude API (format Make blueprint)

```json
{
  "module": "http:ActionSendData",
  "version": 3,
  "mapper": {
    "url": "https://api.anthropic.com/v1/messages",
    "method": "POST",
    "headers": [
      {"name": "x-api-key", "value": "sk-ant-..."},
      {"name": "anthropic-version", "value": "2023-06-01"}
    ],
    "bodyType": "raw",
    "contentType": "application/json",
    "body": "{\"model\":\"claude-sonnet-4-6\",\"max_tokens\":1024,\"messages\":[{\"role\":\"user\",\"content\":\"...\"}]}",
    "parseResponse": true
  }
}
```

**Accès à la réponse :** `{{N.content[1].text}}` (texte généré par Claude, 1-indexé dans Make)

**JSON Parse ensuite :** module `json:ParseJSON` avec `"json": "{{N.content[1].text}}"` → donne `{{M.facebook}}`, `{{M.instagram}}`, `{{M.hashtags}}`

---

## Checklist débogage routeur

- [ ] Le champ est-il dans le tableau `fields` du module Search ?
- [ ] La condition utilise-t-elle `.name` ET la valeur directe (double OR) ?
- [ ] Le filtre Airtable exclut-il bien `NOT({Email envoyé})` pour éviter les doublons ?
- [ ] `useColumnId: false` → référencer les champs par leur **nom** dans les templates
- [ ] `parseResponse: true` sur le module HTTP pour accéder à `{{N.content[1].text}}`
