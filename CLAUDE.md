# EO pour les nuls — consignes pour Claude

Site statique de révision P1 façon réseau social, partagé entre étudiants.
HTML/CSS/JS pur (modules ES) : pas de build, pas de npm, pas de framework, pas de serveur.
Le propriétaire débute : réponds en français et résume en une phrase ce que tu as changé.

## Structure
- `index.html` — l'appli : Accueil (bulles des matières + fil de QCM), Recherche, Favoris, Profil, Admin. Navigation par `#hash`.
- `outils.js` — **liste des outils** (`OUTILS`) et emoji des matières (`MATIERES`). Seul endroit à modifier pour qu'un outil apparaisse.
- `style.css` — thème partagé (clair/sombre auto, dégradé de la marque, composants). À réutiliser partout.
- `compte.js` — comptes et progression : localStorage toujours, + synchro Firebase si configuré.
- `firebase-config.js` — config publique du projet Firebase (`null` = comptes désactivés, le site marche quand même).
- `firestore.rules` — règles de sécurité Firestore. Copie de référence : elles ne s'appliquent qu'une fois
  collées dans la console Firebase (Firestore Database → Règles → Publier).
- `outils/<id>.html` — un outil = une page (CSS/JS en ligne + `../style.css` + `../compte.js`).
- `outils/qcm-hemato-exemple.html` — modèle de QCM à copier.
- `.nojekyll` — ne pas supprimer (GitHub Pages sert les fichiers tels quels).

## Ajouter un outil
1. Créer `outils/<id>.html` (minuscules, tirets, sans accents ni espaces).
   Pour un QCM : copier le modèle, changer le titre et l'emoji de l'en-tête, remplacer seulement `QUESTIONS`.
2. Ajouter son entrée dans `OUTILS` (`outils.js`) : `id` (= nom du fichier sans .html), `titre`, `matiere`,
   `type`, `description`, `fichier`, `emoji`. Réutiliser exactement l'orthographe d'une `matiere` existante.
3. En fin de partie, appeler `enregistrerScore(id, bonnesReponses, total)` de `../compte.js` (déjà fait dans le modèle).

## Règles
- Chemins **relatifs** uniquement (site servi sous `/EOPourLesNuls/`).
- Mobile d'abord : lisible à 360 px, zones tactiles ≥ 44 px, rien qui dépende du survol.
- Couleurs : variables de `style.css` uniquement. Esprit réseau social, mais jamais le logo, le nom,
  les icônes ni les couleurs d'Instagram.
- Données venant des membres (noms, photos…) : toujours échappées avec `esc()`, jamais injectées brutes en HTML.
- Progression et comptes : passer par `compte.js`, ne pas écrire dans Firestore depuis une page.
- Nouvelle donnée stockée dans Firestore → mettre à jour `firestore.rules` **et** prévenir le propriétaire
  qu'il doit recoller les règles dans la console.
- Composant React venant d'un artifact Claude (`.jsx`) : en faire une page autonome
  avec React 18 UMD + Babel standalone en CDN (+ Tailwind CDN s'il utilise des classes Tailwind).
- Contenu médical : vérifier l'exactitude. Pas de copie intégrale des supports de la fac (le site est public).
- Avant de finir : relire chaque page modifiée et vérifier qu'aucun lien n'est cassé.

## Comptes (Firebase, plan gratuit Spark)
- Connexion Google (popup) + e-mail/mot de passe. Domaine autorisé dans Firebase Auth : `hephh.github.io`.
- Données : `users/{uid}` = `{ nom, photo, favoris[], scores{ <id>: {best, total} }, creeLe, vuLe }`.
- Admin = UID listé dans `estAdmin()` de `firestore.rules`. L'onglet Admin s'affiche quand les règles
  autorisent la lecture de tous les profils.

## Mise en ligne
Site : https://hephh.github.io/EOPourLesNuls/ (respecter les majuscules).
GitHub Pages, repo `Hephh/EOPourLesNuls`, branche `main`, racine : commit + push sur `main` → en ligne en ~1 min.
