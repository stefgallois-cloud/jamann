# 🗺️ Guide Centralisé : Chemins d'Accès Complets aux Skills & Agents

> **Mis à jour** : 3 juin 2026  
> **Créé pour** : Stéphanie (Clockwork Ops)  
> **But** : STOP à la perte de skills ! Tous les chemins au même endroit.

---

## 📍 RÈGLE D'OR

Il y a **2 emplacements** où vivent les skills :

| Type | Emplacement | Portée | Accès |
|------|---|---|---|
| **GLOBAL** (Antigravity/Gemini) | `C:\Users\DELL\.gemini\config\plugins\` | Disponible **partout** peu importe le projet | ✅ Toujours présent |
| **LOCAL** (Projet Claude/VS Code) | `C:\Users\DELL\Desktop\test claude\.claude\skills\` | Disponible **uniquement** dans ce projet | ⚠️ Limité à ce dossier |

---

## 🌍 SKILLS GLOBALES (Antigravity/Gemini)

### Chemin racine
```
C:\Users\DELL\.gemini\config\plugins\
```

### 📦 Plugin : `ui-ux-pro-max-plugin`
**Dernière modif** : 02/06/2026  
**Complet?** : ✅ OUI

```
C:\Users\DELL\.gemini\config\plugins\ui-ux-pro-max-plugin\
├── skills/
│   └── ui-ux-pro-max/
│       ├── SKILL.md
│       └── [autres ressources]
```

**Accès direct** : `C:\Users\DELL\.gemini\config\plugins\ui-ux-pro-max-plugin\skills\ui-ux-pro-max\`

---

### 📦 Plugin : `custom-productivity-plugin`
**Dernière modif** : 02/06/2026  
**Complet?** : ✅ OUI

```
C:\Users\DELL\.gemini\config\plugins\custom-productivity-plugin\
├── skills/
│   ├── airtable-expert/
│   ├── brand-guidelines/
│   ├── canvas-design/
│   ├── docx/
│   ├── frontend-design/
│   ├── notion-expert/
│   ├── pdf/
│   ├── pptx/
│   ├── softr-expert/
│   └── xlsx/
└── plugin.json
```

**Accès** : `C:\Users\DELL\.gemini\config\plugins\custom-productivity-plugin\skills\`

---

### 📦 Plugin : `imported-claude-skills` (Agents importés de GitHub)
**Dernière modif** : 27/05/2026  
**Complet?** : ✅ OUI — Contient agents Claude exportés

```
C:\Users\DELL\.gemini\config\plugins\imported-claude-skills\
├── skills/
│   ├── contenu-marketing/
│   ├── creation-contenu/
│   ├── prompt-optimizer/
│   └── SKILL.md (index général)
└── plugin.json
```

**Accès** : `C:\Users\DELL\.gemini\config\plugins\imported-claude-skills\skills\`

---

### 📦 Plugin : `science` (Bases de données & Workflow)
**Dernière modif** : 02/06/2026  
**Complet?** : ✅ OUI

```
C:\Users\DELL\.gemini\config\plugins\science\
├── skills/
│   ├── uv/
│   └── workflow_skill_creator/
├── plugin.json
├── README.md
└── LICENSE
```

**Accès** : `C:\Users\DELL\.gemini\config\plugins\science\skills\`

---

### 📦 Plugin : `android-cli-plugin`
**Dernière modif** : 21/05/2026

```
C:\Users\DELL\.gemini\config\plugins\android-cli-plugin\
├── skills/
│   ├── references/
│   └── SKILL.md
├── plugin.json
└── installed_version.json
```

---

### 📦 Plugin : `google-antigravity-sdk`
**Complet?** : Minimal (SKILL.md seul)

```
C:\Users\DELL\.gemini\config\plugins\google-antigravity-sdk\
└── SKILL.md
```

---

### 📦 Plugin : `modern-web-guidance-plugin`
**Complet?** : Minimal

```
C:\Users\DELL\.gemini\config\plugins\modern-web-guidance-plugin\
├── plugin.json
├── gemini-extension.json
└── README.md (62 KB)
```

---

## 💻 SKILLS LOCALES (Projet Claude/VS Code)

### Chemin racine
```
C:\Users\DELL\Desktop\test claude\.claude\skills\
```

**Actuellement** : Les skills principales sont en GLOBAL (`.gemini`)  
**À faire si tu importes localement** : Copie-colle un dossier skill ici depuis `.gemini`

Exemple structure attendue :
```
C:\Users\DELL\Desktop\test claude\.claude\skills\
├── make-bundles/
│   └── SKILL.md
├── prompt-engineering/
│   └── SKILL.md
├── automatisation-builder/
│   └── SKILL.md
└── [autres...]
```

---

## 🚀 COMMENT UTILISER CE GUIDE

### ✅ Retrouver une skill spécifique
1. **Cherche le nom** dans ce document
2. **Copie le chemin** correspondant
3. **Ouvre-le** dans l'explorateur Windows (Ctrl+L, puis colle le chemin)

### 📋 Template d'accès rapide (À copier dans tes favoris)

**Pour ouvrir une skill dans Windows Explorer :**
```
C:\Users\DELL\.gemini\config\plugins\[NOM-PLUGIN]\skills\[NOM-SKILL]\
```

**Exemple réel :**
```
C:\Users\DELL\.gemini\config\plugins\ui-ux-pro-max-plugin\skills\ui-ux-pro-max\
```

---

## 📌 SKILLS LES PLUS UTILES (Clic rapide)

| Skill | Chemin | Usage |
|-------|--------|-------|
| **ui-ux-pro-max** | `C:\Users\DELL\.gemini\config\plugins\ui-ux-pro-max-plugin\skills\ui-ux-pro-max\` | Design & interfaces premium |
| **airtable-expert** | `C:\Users\DELL\.gemini\config\plugins\custom-productivity-plugin\skills\airtable-expert\` | Airtable formules & bases |
| **notion-expert** | `C:\Users\DELL\.gemini\config\plugins\custom-productivity-plugin\skills\notion-expert\` | Notion workflows |
| **frontend-design** | `C:\Users\DELL\.gemini\config\plugins\custom-productivity-plugin\skills\frontend-design\` | Web design & React |
| **pdf** | `C:\Users\DELL\.gemini\config\plugins\custom-productivity-plugin\skills\pdf\` | Génération PDF |
| **pptx** | `C:\Users\DELL\.gemini\config\plugins\custom-productivity-plugin\skills\pptx\` | Slides PowerPoint |
| **docx** | `C:\Users\DELL\.gemini\config\plugins\custom-productivity-plugin\skills\docx\` | Documents Word |
| **xlsx** | `C:\Users\DELL\.gemini\config\plugins\custom-productivity-plugin\skills\xlsx\` | Feuilles Excel |
| **contenu-marketing** | `C:\Users\DELL\.gemini\config\plugins\imported-claude-skills\skills\contenu-marketing\` | Posts LinkedIn/Email |
| **prompt-optimizer** | `C:\Users\DELL\.gemini\config\plugins\imported-claude-skills\skills\prompt-optimizer\` | Optimisation de prompts |

---

## 🔧 COMMENT DÉPLACER UNE SKILL

### De GLOBAL → LOCAL (pour isoler à un projet)
```powershell
# 1. Coupe depuis Global
C:\Users\DELL\.gemini\config\plugins\[NOM-PLUGIN]\skills\[NOM-SKILL]\

# 2. Colle dans Local
C:\Users\DELL\Desktop\test claude\.claude\skills\
```

### De LOCAL → GLOBAL (pour la rendre universelle)
```powershell
# 1. Coupe depuis Local
C:\Users\DELL\Desktop\test claude\.claude\skills\[NOM-SKILL]\

# 2. Colle dans Global
C:\Users\DELL\.gemini\config\plugins\[NOM-PLUGIN]\skills\
```

---

## 📅 Historique des modifications

| Date | Action | Fichier |
|------|--------|---------|
| 02/06/2026 | ✅ Créé | GUIDE_CHEMINS_SKILLS_AGENTS.md |
| 02/06/2026 | Mise à jour | ui-ux-pro-max-plugin |
| 02/06/2026 | Mise à jour | custom-productivity-plugin |
| 27/05/2026 | Créé | imported-claude-skills |

---

## 🆘 Besoin d'aide ?

- **"Je cherche une skill X"** → Utilise Ctrl+F dans ce fichier
- **"Je veux une nouvelle skill"** → Crée un dossier dans `.gemini/config/plugins/` et ajoute-le ici
- **"Je me suis perdu·e"** → Reviens ici et suis le chemin exact

**Dernière mise à jour** : 3 juin 2026 à 08:30
