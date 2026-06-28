# Test Claude — Mono-Repo Multi-Projets

**Repo :** https://github.com/stefgallois-cloud/jamann.git  
**Branche :** `main` + branches dédiées par projet  
**Utilisation :** Micro-projets, expérimentations, outils internes — PAS de déploiement client direct

---

## 📁 Structure et statut

### ✅ Repos SÉPARÉS (produits/clients majeurs)

Ces projets ont leur **propre repo GitHub indépendant** — ne pas les modifier ici :

| Projet | Repo GitHub | Statut | Notes |
|--------|---|---|---|
| **Françoise V3** | `francoise-v3` | ✅ Live | Site client (fd-harmonie.com) |
| **Manoire + Jamann** | `manoire-jamann` | ✅ Live | Site + app (lemanoire-jaman.ch, ouverture 9 juil 2026) |

**→ Si tu touches Françoise ou Manoire, vas dans leurs repos séparés, pas ici !**

---

### 📦 Projets DANS ce mono-repo

Micro-projets, outils, expérimentations — **déploiement interne ou test uniquement** :

| Dossier | Description | Statut | Notes |
|---------|---|---|---|
| **certification/** | Certification Uncode School (examen 7 sept 2026) | 📚 En cours | 13 livrables, examen comparaison corrigés |
| **tinypages/** | Cap-Solo — landing pages TinyPages (side project) | 🧪 Brouillon | Validé avec utilisateurs, pas de déploiement centralisé |
| **atelier-des-automates/** | Apps Claude perso (L'Atelier des Automates) | 🛠️ Outils | Micro-apps IA, scripts, automatisations |
| **clockwork-ops-offre/** | Offre commerciale Clockwork Ops | 📄 Docs | Pricing, packages, templates commerciaux |
| **drawvid/** | [Description?] | ❓ À clarifier | |
| **dos-libre-app/** | [Description?] | ❓ À clarifier | |
| **guidances/** | [Description?] | ❓ À clarifier | |
| **maud/** | [Description?] | ❓ À clarifier | |
| **printify-100k/** | [Description?] | ❓ À clarifier | |
| **video-surf/** | [Description?] | ❓ À clarifier | |

---

## 🔄 Workflow — Mono-Repo

### **Au démarrage**

```bash
cd c:/Users/DELL/Desktop/test\ claude

# Vérifier qu'on est dans le mono-repo
git remote -v
# DOIT afficher : origin https://github.com/stefgallois-cloud/jamann.git

# Vérifier la branche
git branch
# Si tu travailles sur un micro-projet, tu peux être sur main ou une branche dédiée
```

### **Si tu travailles sur un micro-projet**

```bash
# Exemple : certification

cd projects/certification
# ... travail ...
git add .
git commit -m "feat(certification): description"
git push origin main
```

**Scope obligatoire dans le commit :** `feat(nom-projet):` ou `fix(nom-projet):`

### **À la fin de session**

```bash
git status      # Vérifier qu'il n'y a rien d'oublié
git push origin main   # Pousser vers jamann repo
```

---

## ⚠️ Règles absolues

### ✅ DO
- Toujours vérifier `git remote -v` avant de commiter
- Scope clairs : `feat(certification):`, `fix(atelier):`, etc.
- Commits perso dans des branches `feat/nom-projet` si plusieurs devs
- Pousser vers `origin main` en fin de session

### ❌ DON'T
- **NE JAMAIS modifier Françoise ou Manoire ici** — ils ont leurs repos séparés
- Ne pas laisser changements uncommitted d'un jour à l'autre
- Ne pas mélanger plusieurs projets dans un commit
- Ne pas oublier `git push`

---

## 🚨 Si tu dois modifier Françoise ou Manoire

**STOP — tu dois aller dans leur repo séparé :**

```bash
# ❌ MAUVAIS : modifier ici
cd c:/Users/DELL/Desktop/test\ claude/projects/francoise

# ✅ BON : aller dans le repo séparé
cd c:/Users/DELL/GitHub/francoise-v3
```

---

## 📝 Structure claire

```
c:/Users/DELL/Desktop/test\ claude/         ← mono-repo (jamann.git)
├── README-MONO-REPO.md                     (ce fichier)
├── SOP-MONO-REPO.md                        (procédures détaillées)
├── CLAUDE.md                               (config générales)
└── projects/
    ├── certification/                      (dans mono-repo)
    ├── tinypages/                          (dans mono-repo)
    ├── atelier-des-automates/              (dans mono-repo)
    ├── clockwork-ops-offre/                (dans mono-repo)
    ├── drawvid/                            (dans mono-repo)
    │
    ├── francoise/                          ⚠️ INACTIF (voir francoise-v3/)
    └── manoire/                            ⚠️ INACTIF (voir manoire-jamann/)

c:/Users/DELL/GitHub/                       ← repos séparés
├── francoise-v3/                           (repo indépendant)
├── manoire-jamann/                         (repo indépendant)
└── ...
```

---

## 🔗 Repos séparés

Pour modifier **Françoise** ou **Manoire**, tu **dois** aller dans leurs repos respectifs :

```bash
# Françoise
cd c:/Users/DELL/GitHub/francoise-v3
git remote -v  # Doit afficher francoise-v3.git

# Manoire/Jamann
cd c:/Users/DELL/GitHub/manoire-jamann
git remote -v  # Doit afficher manoire-jamann.git
```

Chaque repo a sa propre SOP-WORKFLOW.md.

---

**Créé le 2026-06-28 pour clarifier : mono-repo ≠ repos séparés.**
