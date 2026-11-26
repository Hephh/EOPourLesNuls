# EOPour les nuls — consignes pour Claude

Site statique de révision P1 façon réseau social, partagé entre étudiants.
HTML/CSS/JS pur (modules ES) : pas de build, pas de npm, pas de framework, pas de serveur.
Le propriétaire débute : réponds en français et résume en une phrase ce que tu as changé.

## Structure
- `index.html` — l'appli : Accueil (bulles des matières + fil de QCM), Recherche, Favoris, Profil
  (série 🔥, objectif du jour, 7 derniers jours), Réglages, Admin. Navigation par `#hash`.
- `outils.js` — **liste des outils** (`OUTILS`) et emoji des matières (`MATIERES`). Seul endroit à modifier pour qu'un outil apparaisse.
- `style.css` — thème partagé (clair/sombre via `data-theme`, dégradé de la marque, composants). À réutiliser partout.
- `reglages.js` — réglages de l'appareil (thème, taille du texte, animations, options des QCM, objectif).
  Script **classique** chargé dans le `<head>` de chaque page, juste après `<meta name="theme-color">` :
  il applique le thème avant l'affichage. Lecture : `window.Reglages.lire()`.
- `compte.js` — comptes, progression (scores, favoris, jours d'activité), avatar ; localStorage toujours,
  + synchro Firebase si configuré.
- `firebase-config.js` — config publique du projet Firebase (`null` = comptes désactivés, le site marche quand même).
- `firestore.rules` — règles de sécurité Firestore. Copie de référence : elles ne s'appliquent qu'une fois
  collées dans la console Firebase (Firestore Database → Règles → Publier).
- `manifest.webmanifest`, `icones/` — appli installable (écran d'accueil).
- `sw.js` — service worker « réseau d'abord » (hors-ligne). Rien à modifier quand le site change.
- `404.html` — page d'erreur ; seule exception à la règle des chemins relatifs (chemins absolus depuis la racine `/…`).
- `outils/<id>.html` — un outil = une page (CSS/JS en ligne + `../reglages.js` + `../style.css` + `../compte.js`).
- `outils/qcm-hemato-exemple.html` — modèle de QCM à copier (mode examen, chrono, vibrations déjà gérés).
- `.nojekyll` — ne pas supprimer (GitHub Pages sert les fichiers tels quels).

## Ajouter un outil
1. Créer `outils/<id>.html` (minuscules, tirets, sans accents ni espaces).
   Pour un QCM : copier le modèle, changer le titre et l'emoji de l'en-tête, remplacer seulement `QUESTIONS`.
   Garder dans le `<head>` : `<meta name="theme-color">` puis `<script src="../reglages.js?v=N"></script>`.
2. Ajouter son entrée dans `OUTILS` (`outils.js`) : `id` (= nom du fichier sans .html), `titre`, `matiere`,
   `type`, `description`, `fichier`, `emoji`. Réutiliser exactement l'orthographe d'une `matiere` existante.
3. En fin de partie : `noterActivite()` (chaque partie) et `enregistrerScore(id, bonnes, total)` (partie complète),
   tous deux de `../compte.js` (déjà fait dans le modèle).

## Règles
- Chemins **relatifs** uniquement (le site reste ainsi déplaçable), sauf `404.html`.
- Mobile d'abord : lisible à 360 px, zones tactiles ≥ 44 px, rien qui dépende du survol.
- Couleurs : variables de `style.css` uniquement. Esprit réseau social, mais jamais le logo, le nom,
  les icônes ni les couleurs d'Instagram.
- Données venant des membres (noms, avatars, photos…) : toujours échappées avec `esc()`, jamais injectées brutes en HTML.
- Progression et comptes : passer par `compte.js`, ne pas écrire dans Firestore depuis une page.
- `synchroniser()` (compte.js) réécrit tout le document du membre : tout nouveau champ doit y être ajouté,
  **et** dans `firestore.rules` (puis prévenir le propriétaire qu'il faut republier les règles).
- Nouveau réglage : l'ajouter à `DEFAUTS` dans `reglages.js` et à la page Réglages (`vueReglages`).
- Fenêtres de confirmation : utiliser la modale maison (`ouvrirModal` / `confirmer`), jamais alert/confirm/prompt.
- Composant React venant d'un artifact Claude (`.jsx`) : en faire une page autonome
  avec React 18 UMD + Babel standalone en CDN (+ Tailwind CDN s'il utilise des classes Tailwind).
- Contenu médical : vérifier l'exactitude. Pas de copie intégrale des supports de la fac (le site est public).
- Avant de finir : relire chaque page modifiée et vérifier qu'aucun lien n'est cassé.

## Comptes (Firebase, plan gratuit Spark)
- Connexion Google (popup) + e-mail/mot de passe. Domaines autorisés dans Firebase Auth : `eopourlesnuls.web.app` (et `hephh.github.io`, ancienne adresse).
- Données : `users/{uid}` = `{ nom, photo, avatar, favoris[], scores{ <id>: {best, total} },
  activite{ "AAAA-MM-JJ": n }, creeLe, vuLe }`.
- Admin = UID listé dans `estAdmin()` de `firestore.rules`. L'onglet Admin s'affiche quand les règles
  autorisent la lecture de tous les profils.

## Mise en ligne
Site : https://eopourlesnuls.web.app (Firebase Hosting, config `firebase.json`).
Repo `Hephh/EOPourLesNuls`, branche `main`. Un push ne met PAS ce site à jour : après le push, demander au
propriétaire de lancer dans Cloud Shell (https://shell.cloud.google.com/?show=terminal) :
`cd ~/eo-deploy && git pull && firebase deploy --only hosting --project eopourlesnuls`
(si Firebase refuse : `firebase login --no-localhost`, c'est lui qui saisit le code).
Ancienne adresse https://hephh.github.io/EOPourLesNuls/ (GitHub Pages) : à désactiver sur sa demande.
Cache : `reglages.js`, `style.css`, `outils.js`, `compte.js` et `firebase-config.js` sont chargés avec `?v=N`.
Dès qu'un commit modifie l'un d'eux, remplacer `?v=N` par `?v=N+1` **dans tous les fichiers** (y compris `404.html` ;
chercher `?v=`), sinon les visiteurs gardent l'ancienne version jusqu'à 10 min, avec des pages cassées.
