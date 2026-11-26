# EOPour les nuls — consignes pour Claude

Site statique de révision ostéo (P1 à P5) façon réseau social, partagé entre étudiants.
HTML/CSS/JS pur (modules ES) : pas de build, pas de npm, pas de framework, pas de serveur.
Le propriétaire débute : réponds en français et résume en une phrase ce que tu as changé.

## Structure
- `index.html` — l'appli : Accueil (bulles des années P1…P5, SOPK verrouillé), page d'une année `#p1`…`#p5`
  (bulles des matières, puis les outils de la matière en lignes), Recherche, Favoris, Profil
  (série 🔥, objectif du jour, 7 derniers jours), Réglages, Admin. Navigation par `#hash`.
- `outils.js` — **liste des outils** (`OUTILS`, avec leur `annee`), années (`ANNEES`), emoji des matières (`MATIERES`),
  nom complet et enseignant d'une matière (`INFOS_MATIERES`). Seul endroit à modifier pour qu'un outil apparaisse.
- `style.css` — thème partagé (clair/sombre via `data-theme`, dégradé de la marque, composants). À réutiliser partout.
- `reglages.js` — réglages de l'appareil (thème, taille du texte, animations, options des QCM, objectif).
  Script **classique** chargé dans le `<head>` de chaque page, juste après `<meta name="theme-color">` :
  il applique le thème avant l'affichage. Lecture : `window.Reglages.lire()`.
- `compte.js` — comptes, progression (scores, favoris, jours d'activité), avatar ; localStorage toujours,
  + synchro Firebase si configuré.
- `firebase-config.js` — config publique du projet Firebase (`null` = comptes désactivés, le site marche quand même).
- `firestore.rules` — règles de sécurité Firestore, publiées par la commande de mise en ligne
  (`firestore:rules`, déclaré dans `firebase.json`).
- `manifest.webmanifest`, `icones/` — appli installable (écran d'accueil).
- `sw.js` — service worker « réseau d'abord » (hors-ligne). Rien à modifier quand le site change.
- `404.html` — page d'erreur ; seule exception à la règle des chemins relatifs (chemins absolus depuis la racine `/…`).
- `outils/<id>.html` — un outil = une page (CSS/JS en ligne + `../reglages.js` + `../style.css` + `../compte.js`).
- `outils/contenu.html?id=…` — page commune des outils **créés depuis l'admin** (QCM, fiche / schéma) : contenu lu dans
  `contenus/{id}`, images dans `medias/{id}`. Le propriétaire ajoute le contenu lui-même : ne pas coder un QCM en dur
  s'il peut passer par Admin ▸ Organisation ▸ Créer un outil.
- `outils/qcm-hemato-exemple.html` — modèle de QCM à copier (mode examen, chrono, vibrations déjà gérés).
- `outils/me-revision.html` + dossier `outils/me-revision/` — révision M.E. (P2, M. Boucherat) : parcours, fiche en blocs,
  cartes, QCM (annales + Claude), lexique ; catégories à cocher (coude, épaule…). Exception à « CSS/JS en ligne » :
  le contenu est trop gros, il vit dans le dossier (`content.js` lexique, `fiches.js`, `qcm.js`, `schemas.js` schémas SVG,
  `anim.js` schémas animés, `notions.js` mots-clés → lexique pour les notions cliquables, `essentiel.js`, `app.js`, `style.css`).
  Progression détaillée sur l'appareil (localStorage `me-revision`) ; score des séries et activité via `compte.js`.
  Pas d'image tirée des PDF de la fac (site public) : seulement des schémas redessinés.
- `.nojekyll` — ne pas supprimer (GitHub Pages sert les fichiers tels quels).

## Ajouter un outil
1. Créer `outils/<id>.html` (minuscules, tirets, sans accents ni espaces).
   Pour un QCM : copier le modèle, changer le titre et l'emoji de l'en-tête, remplacer seulement `QUESTIONS`.
   Garder dans le `<head>` : `<meta name="theme-color">` puis `<script src="../reglages.js?v=N"></script>`.
2. Ajouter son entrée dans `OUTILS` (`outils.js`) : `id` (= nom du fichier sans .html), `titre`, `annee` ("P1"…"P5"),
   `matiere`, `type`, `description`, `fichier`, `emoji`. Réutiliser exactement l'orthographe d'une `matiere` existante
   (nouvelle matière : son emoji dans `MATIERES`, et si besoin son nom complet et son enseignant dans `INFOS_MATIERES`).
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
  autorisent la lecture de tous les profils. Il a deux parties : Organisation et Membres.
- Organisation (Admin ▸ Organisation) : années (ajouter, renommer, monter, verrouiller, supprimer), matières d'une
  année (nom, emoji, nom complet, enseignant), place et visibilité de chaque outil, catégories internes masquées
  (champ `categories` d'un outil dans `outils.js`). Tout est publié dans le document public `site/catalogue`
  (`{ annees, matieres, outils, masques, majLe }`, lu par tous, écrit par l'admin seul) via `chargerCatalogue()` /
  `enregistrerCatalogue()` de `compte.js`. Tant que rien n'est publié, l'accueil suit `ANNEES` et `OUTILS` de `outils.js`.
  Un nouvel outil (nouvelle page) s'ajoute toujours dans `outils.js` ; l'admin choisit ensuite où il s'affiche.
- Social (membres connectés seulement, tout passe par `compte.js`) :
  - `profils/{uid}` = `{ nom, photo, avatar, majLe }` : profil public (pas d'e-mail ni de progression), tenu à jour
    par `synchroniser()`, `changerNom()`, `majAvatar()`, effacé avec le compte.
  - Commentaires d'un outil : `commentaires/{outil}/liste/{id}` = `{ de, nom, photo, avatar, texte (≤ 500), le }` ;
    bouton bulle sur chaque ligne d'outil ; l'auteur ou l'admin supprime.
  - Messagerie privée : `conversations/{uidA_uidB triés}` = `{ membres, dernier { texte, de }, majLe, lu { uid: date } }`
    + `messages/{id}` = `{ de, texte (≤ 1000), le }`. Seuls les deux membres lisent (pas l'admin).
    Vues `#messages` et `#dm-<uid>` ; pastille des non-lus dans la barre du haut et la barre latérale.
- Admin : onglets Tableau de bord (stats des comptes), Organisation (annonce, années, matières, outils, images,
  sauvegarde JSON), Membres (recherche, tri, fiche). Éditeur `#edit-<id>` pour les outils créés ici (import de QCM collés
  en texte : `Q:` / `+` juste / `-` faux / `E:` explication, ou `A)…` + `Réponse : A, C`).
- Images (pas de Firebase Storage sur Spark) : réduites dans le navigateur, gardées en data URL. `medias/{id}` = `{ data, nom, le }`
  (admin) ; `<img data-media="id">` est rempli tout seul (`hydraterMedias`). Photo de profil importée : champ `image`
  (≤ 90 000 caractères) dans `users` et `profils`. Catalogue : `annonce`, `images: { <outil>: { <catégorie>: mediaId } }`,
  et par outil `titre`, `emoji`, `nouveau`, `perso` (outil créé depuis l'admin).
- Thème : `auto | clair` (papier) `| sombre | oled` → `data-theme` + `data-nuance="oled"`. Mode fun (`fun` : null = pas
  encore demandé à la 1re connexion) : désactivé → `data-fun="off"`, plus de série, d'objectif ni de graphique de la semaine.
- Taille du texte : réglage `texte` (85 à 140 %) → variable CSS `--texte` posée par `reglages.js` sur `<html>`.

## Mise en ligne
Site : https://eopourlesnuls.web.app (Firebase Hosting, config `firebase.json`).
Repo `Hephh/EOPourLesNuls`, branche `main`. Un push ne met PAS ce site à jour : après le push, demander au
propriétaire de lancer dans Cloud Shell (https://shell.cloud.google.com/?show=terminal) :
`cd ~/eo-deploy && git pull && firebase deploy --only hosting,firestore:rules --project eopourlesnuls`
(cette commande publie aussi `firestore.rules` : plus besoin de les coller dans la console)
(si Firebase refuse : `firebase login --no-localhost`, c'est lui qui saisit le code).
Ancienne adresse https://hephh.github.io/EOPourLesNuls/ (GitHub Pages) : à désactiver sur sa demande.
Cache : `reglages.js`, `style.css`, `outils.js`, `compte.js` et `firebase-config.js` sont chargés avec `?v=N`.
Dès qu'un commit modifie l'un d'eux, remplacer `?v=N` par `?v=N+1` **dans tous les fichiers** (y compris `404.html` ;
chercher `?v=`), sinon les visiteurs gardent l'ancienne version jusqu'à 10 min, avec des pages cassées.
