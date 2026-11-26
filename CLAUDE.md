# Révisions P1 — consignes pour Claude

Site statique de révision partagé entre étudiants P1 : HTML/CSS/JS pur.
Pas de build, pas de npm, pas de framework, pas de serveur.
Le propriétaire débute : réponds en français et résume en une phrase ce que tu as changé.

## Structure
- `index.html` — accueil. La liste des outils = le tableau `OUTILS` en haut du `<script>`.
- `style.css` — thème partagé (couleurs clair/sombre, boutons, panneaux). À réutiliser partout.
- `outils/<nom>.html` — un outil = un fichier (son CSS/JS en ligne + `../style.css`).
- `outils/qcm-hemato-exemple.html` — modèle de QCM à copier.
- `.nojekyll` — ne pas supprimer (GitHub Pages sert alors les fichiers tels quels).

## Ajouter un outil
1. Créer `outils/<nom>.html` (minuscules, tirets, sans accents ni espaces).
   Pour un QCM : copier le modèle, changer le titre et remplacer seulement le tableau `QUESTIONS`.
2. Ajouter son entrée dans `OUTILS` : `titre`, `matiere`, `description`, `fichier`, `emoji`.
   Réutiliser exactement l'orthographe d'une `matiere` existante (sinon le filtre se dédouble).
3. Garder le lien `← Accueil` vers `../index.html`.

## Règles
- Chemins **relatifs** uniquement (le site est servi sous le sous-dossier `/EOPourLesNuls/`).
- Mobile d'abord : lisible à 360 px, zones tactiles ≥ 44 px, rien qui dépende du survol.
- Couleurs : variables de `style.css` uniquement (le thème sombre suit le téléphone).
- Progression : `localStorage` seulement, toujours dans `try/catch`.
  Meilleur score d'un outil : clé `score:outils/<nom>.html` → `{ "best": n, "total": n }` (affiché sur l'accueil).
- Composant React venant d'un artifact Claude (`.jsx`) : en faire une page autonome
  avec React 18 UMD + Babel standalone en CDN (+ Tailwind CDN s'il utilise des classes Tailwind).
- Contenu médical : vérifier l'exactitude. Pas de copie intégrale des supports de la fac (le site est public).
- Avant de finir : relire chaque page modifiée et vérifier qu'aucun lien n'est cassé.

## Mise en ligne
Site : https://hephh.github.io/EOPourLesNuls/ (respecter les majuscules du lien).
GitHub Pages depuis le repo `Hephh/EOPourLesNuls`, branche `main`, dossier racine :
commit + push sur `main` → site à jour en ~1 min.
