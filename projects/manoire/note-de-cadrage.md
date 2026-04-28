# Note de cadrage — Digitalisation & Automatisation Le Manoïre

Référence : CADRE-2026-MANOIRE-01

**Client :** Le Manoïre — Col de Jaman, Montreux
**Prestataire :** Clockwork Ops — Stéphanie
**Date :** 28/04/2026
**Version :** 1.0

---

## 🏔 Contexte

Le Manoïre est un restaurant d'alpage emblématique situé au Col de Jaman, à 1 500 m d'altitude au-dessus de Montreux (Vaud, Suisse). Connu pour sa cuisine de terroir local, ses plats de montagne généreux et sa grande terrasse avec vue sur les Alpes, le lieu est une institution de la région.

Après une période sous un autre nom, le restaurant **retrouve son nom originel "Le Manoïre"** — un retour aux racines qui marque une **renaissance**. Les travaux de rénovation débutent prochainement, pour une réouverture officielle prévue **fin juin 2026**. Dans ce contexte de renaissance, le client souhaite moderniser sa présence digitale et automatiser ses opérations internes pour être pleinement opérationnel dès l'ouverture.

---

## 🪫 Le besoin / les enjeux

L'enjeu central est de **doter Le Manoïre d'une infrastructure digitale complète avant son ouverture**, pour assurer une communication fluide avec les clients et une gestion efficace de l'équipe interne.

- **Enjeu 1 : Présence en ligne** — Informer les futurs clients de la réouverture et capter des inscriptions dès maintenant
- **Enjeu 2 : Communication réseaux sociaux** — Animer les communautés Instagram / Facebook de façon régulière et automatisée
- **Enjeu 3 : Fidélisation** — Maintenir le lien avec les clients via une newsletter récurrente (8 éditions)
- **Enjeu 4 : Organisation interne** — Permettre au gérant de planifier et gérer son équipe saisonnière via une application simple

---

## 🔍 Compréhension du besoin

Le projet consiste à construire une infrastructure digitale modulaire : une présence web, des automatisations de communication, et une application de gestion interne — le tout opérationnel avant fin juin 2026.

### Nombre prévisionnel d'utilisateurs

- **Internes :** 1 gérant + équipe saisonnière (estimée à 3–8 personnes selon saison)
- **Externes :** Clients et abonnés newsletter (base à construire)

### Profils utilisateurs

- **Gérant / Admin :** Accès complet à l'app planning, validation des contenus, gestion des accès
- **Employé saisonnier :** Consultation du planning, mise à jour de ses disponibilités
- **Client / Visiteur :** Inscription via landing page, réception newsletters

### Droits d'accès

Convention : **L** = Lecture | **C** = Création | **M** = Modification | **S** = Suppression

| Données / Actions | Gérant | Employé | Client |
|---|---|---|---|
| Planning équipe | L.C.M.S | L.M | — |
| Inscriptions clients | L.C.M.S | — | C |
| Contenu newsletters | L.C.M.S | — | — |
| Posts réseaux sociaux | L.C.M.S | — | — |

### Contraintes opérationnelles identifiées

- Deadline absolue : **fin juin 2026** (ouverture du restaurant)
- Le gérant doit pouvoir administrer l'app planning de façon autonome
- L'équipe est saisonnière — l'interface doit être simple et intuitive
- Connexion internet au Col de Jaman à vérifier pour les automatisations temps réel

### Gestion des données

**Données sensibles business :** planning interne de l'équipe, coordonnées des employés

**Données personnelles collectées :** emails et noms des clients inscrits via landing page et newsletter (RGPD à respecter)

---

## 🗺️ Le périmètre

La prestation Clockwork Ops couvre :

1. ✅ Landing page de présentation et de pré-inscription *(livré)*
2. ✅ Automatisation d'inscription clients dans Airtable via Make *(livré)*
3. Automatisation de publication de posts sur les réseaux sociaux
4. Application de gestion du planning équipe avec interface utilisateur (Softr + Airtable)
5. Automatisation de 8 newsletters (conception + envoi automatisé)

---

## ❌ Exclusions

- Création graphique des visuels réseaux sociaux (photos, design)
- Gestion de la publicité payante (Facebook Ads, Instagram Ads)
- Développement d'un système de réservation en ligne
- Maintenance et MCO après la période de support incluse

---

## ⚙️ Identification des fonctions principales

- **Landing page** — Page de présentation du restaurant + formulaire d'inscription
- **Automatisation inscription** — Enregistrement automatique des inscrits dans Airtable
- **Publication réseaux sociaux** — Scénario Make planifiant et publiant les posts
- **App planning équipe** — Interface Softr connectée à Airtable pour gérer les plannings
- **Newsletters automatisées** — Séquence de 8 newsletters envoyées automatiquement aux inscrits

---

## 🧰 La stack

Solution no-code / low-code modulaire pour permettre une autonomie maximale du client à terme.

| Outil | Rôle |
|---|---|
| Airtable | Base de données centrale (inscrits, planning, contenu) |
| Softr | Interface utilisateur (app planning équipe) |
| Make | Automatisation des flux (inscription, posts, newsletters) |
| [Outil emailing] | Envoi des newsletters (à préciser : Brevo, Mailchimp…) |
| [Réseau social] | Instagram / Facebook (à connecter via Make) |

---

## ✅ Les pré-requis

Le client devra fournir ou créer les éléments suivants :

**Comptes à créer / accès à fournir :**
- [ ] Compte Airtable (ou accès à l'existant)
- [ ] Compte Softr
- [ ] Compte Make (ou accès à l'existant)
- [ ] Accès page Facebook / compte Instagram professionnel du restaurant
- [ ] Compte outil emailing (Brevo recommandé — gratuit jusqu'à 300 emails/jour)

**Éléments à fournir :**
- [ ] Logo et charte graphique / couleurs du restaurant
- [ ] Textes et photos pour les newsletters
- [ ] Liste des postes de l'équipe (pour configurer le planning)
- [ ] Sujets et thèmes des 8 newsletters
- [ ] Validation du ton et des contenus réseaux sociaux avant automatisation

---

## 📋 Organisation

### Les parties prenantes

| Rôle | Nom | Responsabilité |
|---|---|---|
| Client / décideur | Gérant Le Manoïre | Validation, fourniture des contenus, recette |
| Prestataire | Stéphanie — Clockwork Ops | Conception, développement, livraison |

### Budget

*À compléter avec le devis associé.*

### Le planning et jalons

| Jalon | Date prévisionnelle |
|---|---|
| Landing page + inscription | ✅ Livré |
| Automatisation posts réseaux | Mai 2026 |
| App planning équipe | Mai–Juin 2026 |
| Automatisation 8 newsletters | Juin 2026 |
| Recette complète | Mi-juin 2026 |
| **Ouverture restaurant** | **Fin juin 2026** |

### Les instances de suivi

Points d'avancement réguliers entre Stéphanie et le gérant — canal à définir (WhatsApp / email).
Livraisons par lots avec validation client avant passage au suivant.

---

## 🧩 Les types d'activités

Clockwork Ops met en œuvre :

- ➡️ Conception et architecture de la solution digitale
- ➡️ Développement et intégration des automatisations
- ➡️ Création de l'interface utilisateur (app planning)
- ➡️ Documentation technique des scénarios
- ➡️ Formation du gérant à l'administration des outils
- ➡️ Gestion de projet et coordination

---

## 📞 Le support

Support inclus **30 jours après la mise en production complète** (ouverture fin juin 2026).
Le client peut contacter Stéphanie via WhatsApp ou email pour tout problème ou question.
Au-delà, une prestation de maintenance peut être convenue séparément.

---

*Document Clockwork Ops — Stéphanie · Version 1.0 · 28/04/2026*
