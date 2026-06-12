# Guide d'intégration — TinyPages
## Tunnel Cap Solo complet

---

## Vue d'ensemble du tunnel

```
Page capture (landing/index.html)
    ↓ inscription email
Page merci (pages/merci.html)
    ↓ lien téléchargement PDF
Guide PDF (assets/guide-cap-solo.pdf)
    ↓ séquence email J1→J5
Page de vente (pages/vente.html)
    ↓ achat 67€
Page upsell (pages/upsell.html)
    ↓ oui → achat 197€ / non → confirmation
Page confirmation finale
```

---

## Étape 1 — Créer le produit gratuit (lead magnet)

1. Dans TinyPages → **Produits** → Nouveau produit
2. Nom : `Guide Cap Solo — 7 destinations`
3. Type : `Gratuit / Lead magnet`
4. Uploader le fichier : `assets/guide-cap-solo.pdf`
5. Copier le **lien de téléchargement** généré → remplacer `[LIEN_GUIDE_PDF]` dans `pages/merci.html`

---

## Étape 2 — Créer le produit payant (67€)

1. Dans TinyPages → **Produits** → Nouveau produit
2. Nom : `Mon Premier Solo`
3. Prix : `67 €`
4. Type : `Accès à vie`
5. Connecter Stripe (si pas déjà fait → voir ci-dessous)
6. Copier le **lien de paiement** → remplacer `[LIEN_PAIEMENT]` dans :
   - `pages/vente.html` (2 occurrences)
   - `copywriting/page-vente.md`

---

## Étape 3 — Créer le produit upsell (197€)

1. Dans TinyPages → **Produits** → Nouveau produit
2. Nom : `Session Co-planification 1:1`
3. Prix : `197 €`
4. Type : `Service / Session`
5. Copier le **lien de paiement** → remplacer `[LIEN_PAIEMENT_UPSELL]` dans `pages/upsell.html`

---

## Étape 4 — Importer les pages

Pour chaque page, dans TinyPages → **Pages** → Importer HTML :

| Fichier local | Nom dans TinyPages | Rôle |
|---|---|---|
| `landing/index.html` | `capture` | Page d'accueil / capture |
| `pages/merci.html` | `merci` | Après inscription |
| `pages/vente.html` | `vente` | Page de vente programme |
| `pages/upsell.html` | `upsell` | Après achat programme |

**Alternative si TinyPages a son propre éditeur :** copier-coller le contenu des fichiers `copywriting/` directement dans l'éditeur visuel.

---

## Étape 5 — Configurer la séquence email

Dans TinyPages → **Emails** → **Automatisations** → Nouvelle séquence

**Déclencheur :** inscription formulaire page `capture`

| Email | Délai | Objet | Fichier source |
|---|---|---|---|
| J1 | Immédiat | Ton guide est là 🗺️ (+ une question) | `copywriting/sequence-email-5j.md` > Email J1 |
| J2 | +1 jour | La vraie raison pour laquelle tu n'es pas encore partie | Email J2 |
| J3 | +2 jours | Elle avait arrêté de rêver. Et puis elle est partie. | Email J3 |
| J4 | +3 jours | Les 3 phases pour préparer ton premier solo (sans stress) | Email J4 |
| J5 | +4 jours | Mon Premier Solo — pour toi, si tu es prête | Email J5 |

**Remplacer dans chaque email :**
- `[Prénom]` → variable TinyPages : `{{first_name}}`
- `[Prénom expéditeur]` → ton prénom
- `[LIEN]` → lien de téléchargement du guide (Étape 1)

---

## Étape 6 — Connecter Stripe

1. TinyPages → **Paramètres** → **Paiements** → Connecter Stripe
2. Mode test d'abord pour vérifier le tunnel complet
3. Passer en mode production avant de lancer

---

## Étape 7 — Configurer les redirections

| Après | Rediriger vers |
|---|---|
| Inscription formulaire capture | Page `merci` |
| Achat `Mon Premier Solo` (67€) | Page `upsell` |
| Achat upsell (197€) | Page confirmation (à créer — simple "merci, je te contacte sous 48h") |
| Refus upsell (lien "non merci") | Page confirmation simple |

Remplacer dans `pages/upsell.html` :
- `[LIEN_CONFIRMATION]` → URL page confirmation

---

## Étape 8 — Test complet avant lancement

- [ ] Remplir le formulaire de capture → vérifier réception email J1 + lien PDF fonctionnel
- [ ] Cliquer sur le lien de vente → vérifier page vente s'affiche correctement
- [ ] Effectuer un achat test (Stripe test mode) → vérifier redirection vers upsell
- [ ] Tester les deux chemins upsell (oui / non merci)
- [ ] Vérifier que la séquence des 5 emails se déclenche bien
- [ ] Tester sur mobile (toutes les pages sont responsive)

---

## Checklist finale avant lancement

- [ ] PDF guide téléchargeable et fonctionnel
- [ ] Stripe en mode production (pas test)
- [ ] Domaine personnalisé configuré (si disponible)
- [ ] Email expéditeur configuré (ex: bonjour@cap-solo.fr)
- [ ] RGPD : mention légale + politique de confidentialité sur la page capture
- [ ] Tous les `[LIEN_...]` remplacés dans les pages HTML

---

*Généré le 2026-06-12 · Cap Solo*
