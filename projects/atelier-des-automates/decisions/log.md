# Journal de décisions — L'Atelier des Automates

[2026-07-07] DÉCISION : Bascule de la landing publique (`landing/index.html`) du vouvoiement au tutoiement, puis retour au vouvoiement.
RAISONNEMENT : Storytelling adapté d'une démo Claude Design (tutoiement) puis re-questionné par Stéphanie qui a confirmé vouloir revenir au vouvoiement professionnel initial.
CONTEXTE : Conversion complète de `landing/index.html` (titre, hero, features, méthode, services, simulateur, contact) — état final : vouvoiement partout, structure et simulateur interactif conservés comme preuve concrète (pas de faux témoignages).

[2026-07-07] DÉCISION : Abandon de Make ET de l'automatisation native Airtable pour le pipeline leads → passage à n8n.
RAISONNEMENT : Le webhook natif Airtable nécessite un forfait payant hors budget. Make demandait un import de blueprint manuel. n8n est connecté via MCP et permet de créer/publier des workflows par API sans étape manuelle.
CONTEXTE : Workflow "Atelier des Automates - Leads (v1 sans IA)" (`sk2XEkQ1OTNjUuPX`) construit, testé et activé — voir [`N8N.md`](../N8N.md). `MAKE.md` conservé mais archivé.

[2026-07-08] DÉCISION : Refonte visuelle complète de la landing — couleurs, polices, structure des cartes.
RAISONNEMENT : Stéphanie trouvait le site "trop blanc" malgré une première passe de tons pastel — demande explicite de couleurs franches qui "tranchent". Puis demande de polices moins génériques que Geist/Inter (devenues la paire la plus vue des sites IA).
CONTEXTE : Cartes "Ce que je fais" en blocs de couleur pleine, simulateur en dark mode avec pipeline néon, footer compact bleu marine, polices Bricolage Grotesque (titres) + Hanken Grotesk (corps) — voir `branding.md`. Copy de 3 cartes retravaillée (IA intégrée, Zéro code requis, Accompagnement inclus) pour corriger des formulations faibles ou des promesses inexactes.

[2026-07-08] INCIDENT : Perte temporaire de deux sessions de travail non commitées, récupérée.
RAISONNEMENT : Le repo git contient tous les projets de Stéphanie (Manoïre, Françoise, Atelier...) avec plusieurs branches. Un changement de branche (`main` ↔ `francoise`) pendant une session sur un autre projet a réinitialisé les fichiers non commités de l'Atelier à leur dernier état commité (avant tout le travail des deux sessions précédentes).
CONTEXTE : Travail récupéré depuis un commit WIP auto-généré (`bb1e72a`, "On francoise: atelier-des-automates WIP avant passage sur main pour Manoire") trouvé via `git log --all`, puis commité sur `main` (`87ef035`). Ce fichier `decisions/log.md` avait aussi disparu (jamais commité même dans le WIP) — reconstruit de mémoire à cette occasion.
LEÇON : commiter en fin de session, même incomplète, pour ne plus dépendre du hasard d'un commit WIP automatique.
