# Woof and Walk — Maud (Caroline)

Projet pilote d'accompagnement complet pour Caroline (Woof and Walk). Site web de dog walking à Lausanne et ressources associées.

**Statut :** Livré et opérationnel.
**Hébergement :** Cloudflare Pages (migration validée le 2026-05-30, abandon de Netlify).

---

## Concept
Fournir à Caroline une solution clé en main pour lancer son activité de promenade de chiens en forêt à Lausanne :
1. **Un site web vitrine** magnifique et fluide pour présenter l'activité.
2. **Une étude de marché** complète (demande, tarifs, concurrence locale).
3. **Un guide de légalité suisse** pour structurer son activité d'indépendante en toute sérénité.

---

## Audience cible
* **Qui :** Propriétaires de chiens à Lausanne et alentours cherchant des promenades fiables, actives et sécurisées en forêt pour leurs compagnons.
* **Besoin :** Confiance, simplicité de réservation, bien-être de l'animal.

---

## Livrables techniques
* **Site Web :** `index-v2.html`, styles `style-v2.css`, logique `main-v2.js`.
* **Ressources d'études :** `etude-marche.html`
* **Assets visuels :** Regroupés dans le dossier `/assets` (anciennement à la racine).

---

## Structure du projet

```text
projects/maud/
├── README.md             - Ce fichier de pilotage
├── index-v2.html         - Page d'accueil du site Woof and Walk
├── style-v2.css          - Feuille de style du site
├── main-v2.js            - Logique interactive
├── etude-marche.html     - Étude de marché locale intégrée
├── assets/               - Toutes les images du projet (about, affiche, hero, banner...)
├── prompt/               - Dossier réglementaire de stockage des prompts IA
└── dist/ / qr/ / public/ - Dossiers de distribution et ressources QR code
```

---

*Mis à jour le 2026-05-30 — Document de livraison.*
