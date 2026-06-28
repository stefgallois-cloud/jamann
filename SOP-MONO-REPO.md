# SOP — Workflow Mono-Repo Test Claude

**Pour éviter les erreurs passées : une branche = un contexte de travail**

---

## 🚨 Le problème du passé

Tu travaillais sur **Françoise** mais tu étais sur la branche **`feat/manoire-posts-v2-palette-prairie`**.  
Résultat : commits Françoise se retrouvaient sur une branche Manoïre. Chaos. ❌

**Maintenant :**
- Françoise + Manoire = **repos séparés** (problème résolu ✅)
- Certification, TinyPages, etc. = **mono-repo avec une seule branche** (main)

---

## Au démarrage de chaque session

### 1️⃣ Vérifier qu'on est DANS le mono-repo

```bash
pwd
# Doit afficher : c:/Users/DELL/Desktop/test claude
```

### 2️⃣ Vérifier le remote

```bash
git remote -v
# DOIT afficher : origin https://github.com/stefgallois-cloud/jamann.git
# (c'est le mono-repo, PAS francoise-v3.git, PAS manoire-jamann.git)
```

### 3️⃣ Vérifier la branche

```bash
git branch
# Doit afficher : * main
# (sauf si tu crées une branche pour un petit projet isolé)
```

### 4️⃣ Quel projet je vais travailler sur ?

```bash
# Exemple : Certification
cd projects/certification

# Vérifier qu'on est bien dans le sous-dossier ET dans le bon repo
pwd    # c:/Users/DELL/Desktop/test claude/projects/certification
git remote -v  # Toujours le mono-repo (jamann.git)
```

**Note :** Même quand tu `cd` dans un sous-dossier projet, git reste global au repo. C'est normal.

---

## À la fin de chaque session

### 1️⃣ Vérifier le statut

```bash
git status
```

Doit afficher :
```
On branch main
Your branch is up to date with 'origin/main'.

nothing to commit, working tree clean
```

### 2️⃣ Si des changements

```bash
# Ajouter les fichiers (du projet spécifique OU mélangés)
git add .

# Commiter AVEC SCOPE DU PROJET
git commit -m "feat(certification): description

Détails si besoin.

Co-Authored-By: Claude Haiku 4.5 <noreply@anthropic.com>"

# Vérifier que c'est clean
git log --oneline -3
```

### 3️⃣ Pousser

```bash
git push origin main
```

### 4️⃣ Vérifier que c'est clean

```bash
git status
# Doit afficher : working tree clean
```

---

## Scopes des commits (mono-repo)

**Toujours préfixer avec le nom du projet :**

```
feat(certification): ajout livrable #5 (CartIA)
feat(tinypages): refonte landing page Cap-Solo
feat(atelier): nouvel outil génération prompts
fix(clockwork-ops-offre): correction pricing page
docs(certification): ajout corrections examen
chore: nettoyage assets temporaires
```

**PAS DE SCOPE = nettoyage global :** `.gitignore`, dossier root, etc.

---

## Règles absolues

### ✅ DO

- Toujours vérifier `git remote -v` — jamais `francoise-v3.git` ni `manoire-jamann.git` ici
- Toujours sur `main` (sauf branche d'expérimentation courte)
- Scope clair : `feat(nom-projet):` c'est **OBLIGATOIRE**
- Pousser en fin de session TOUS les jours
- Laisser le repo **clean** (working tree clean)

### ❌ DON'T

- Ne PAS coder sur une branche manoïre/françoise — va dans leur repo séparé
- Ne PAS laisser changements uncommitted
- Ne PAS commiter sans scope
- Ne PAS faire `git push` vers une branche random
- Ne PAS mélanger plusieurs projets dans un commit (sauf nettoyage global)

---

## Diagnostic rapide

**Si quelque chose te semble bizarre :**

```bash
pwd                           # Où je suis ?
git remote -v                 # Quel repo ?
git branch                    # Quelle branche ?
git status                    # Quoi de changé ?
git log --oneline -5          # Historique récent ?
```

Si une réponse ne correspond pas à ce qui est attendu → **STOP et demande avant de continuer.**

---

## Cas spéciaux

### Si tu dois modifier Françoise

```bash
# ❌ MAUVAIS : essayer de le faire ici
cd projects/francoise

# ✅ BON : aller dans le repo séparé
cd c:/Users/DELL/GitHub/francoise-v3
# Là tu vérifies : git remote -v → francoise-v3.git ✅
```

### Si tu crées une branche courte (expérimentation)

```bash
# OK pour une branche rapide
git checkout -b exp/test-nouveau-feature
# ... travail ...
git commit ...
git push origin exp/test-nouveau-feature

# Mais reviens sur main après :
git checkout main
git pull origin main
```

### Si tu pousses et ça échoue

```bash
# Vérifier d'abord ce qu'on va pousser
git log origin/main..HEAD --oneline
# (affiche tes commits non pushés)

# Si ça te semble bon, essayer de nouveau
git push origin main
```

---

**Créé le 2026-06-28 — règle simple : mono-repo = une branche, une remote.**
