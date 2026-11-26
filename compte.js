/* =====================================================================
   Comptes + progression
   - Sans compte : scores, favoris et jours d'activité gardés sur l'appareil (localStorage).
   - Avec Firebase configuré : connexion Google ou e-mail, synchro entre
     appareils dans Firestore (un document par membre : users/{uid}).
   Les pages n'écrivent jamais directement dans Firestore : elles passent ici.
   ===================================================================== */
import { FIREBASE_CONFIG } from "./firebase-config.js?v=6";

const CDN = "https://www.gstatic.com/firebasejs/13.4.0/";

export const comptesActifs = Boolean(FIREBASE_CONFIG);

/* ---------- Stockage local ---------- */
const cleScore = (id) => `score:outils/${id}.html`; // format d'origine, conservé

function lire(cle, defaut) {
  try { return JSON.parse(localStorage.getItem(cle)) ?? defaut; } catch { return defaut; }
}
function ecrire(cle, valeur) {
  try { localStorage.setItem(cle, JSON.stringify(valeur)); } catch {}
}
const scoreValide = (s) => s && Number.isFinite(s.best) && Number.isFinite(s.total) && s.total > 0;

export function scoreLocal(id) {
  const s = lire(cleScore(id), null);
  return scoreValide(s) ? { best: s.best, total: s.total } : null;
}
function scoresLocaux() {
  const res = {};
  try {
    for (const cle of Object.keys(localStorage)) {
      const m = /^score:outils\/(.+)\.html$/.exec(cle);
      if (m) { const s = scoreLocal(m[1]); if (s) res[m[1]] = s; }
    }
  } catch {}
  return res;
}
export function favorisLocaux() {
  const f = lire("favoris", []);
  return new Set(Array.isArray(f) ? f : []);
}
const ecrireFavoris = (set) => ecrire("favoris", [...set]);

/* Activité : nombre de QCM terminés par jour, ex. { "2026-11-26": 2 } (120 derniers jours). */
export const jourCle = (d = new Date()) => d.toLocaleDateString("sv-SE"); // AAAA-MM-JJ, heure locale
export function activiteLocale() {
  const a = lire("activite", {});
  return a && typeof a === "object" && !Array.isArray(a) ? a : {};
}
function elaguer(a) {
  const res = {};
  for (const k of Object.keys(a).sort().slice(-120)) {
    if (/^\d{4}-\d{2}-\d{2}$/.test(k) && Number.isFinite(a[k]) && a[k] > 0) res[k] = a[k];
  }
  return res;
}
/** Jours d'affilée avec au moins un QCM terminé (la série tient jusqu'à hier si rien aujourd'hui). */
export function serieJours(a = activiteLocale()) {
  const d = new Date();
  if (!a[jourCle(d)]) d.setDate(d.getDate() - 1);
  let n = 0;
  while (a[jourCle(d)]) { n++; d.setDate(d.getDate() - 1); }
  return n;
}
function viderAppareil() {
  try {
    for (const cle of Object.keys(localStorage)) {
      if (cle === "favoris" || cle === "activite" || cle.startsWith("score:outils/")) localStorage.removeItem(cle);
    }
  } catch {}
}

/* Seules les photos de profil Google sont acceptées (voir firestore.rules). */
export const photoSure = (p) => (typeof p === "string" && /^https:\/\/lh\d\.googleusercontent\.com\//.test(p) && p.length <= 600 ? p : null);
export const AVATARS = ["🦴", "🫀", "🧠", "🫁", "🩺", "💊", "🧬", "🔬", "📚", "☕", "🦊", "🐼", "🐸", "🦁", "🐙", "🌟", "🔥", "🍀"];
export const avatarSur = (a) => (typeof a === "string" && AVATARS.includes(a) ? a : null);

/* ---------- État du compte ---------- */
let fb = null;            // { auth, db, A, F } une fois Firebase chargé
let courant = null;       // { uid, nom, email, photo, avatar } ou null
let adminCache = null;
let nomEnAttente = null;  // prénom saisi à l'inscription, appliqué dès la création du compte
const abonnes = new Set();
let finPret;
/** Se résout quand on sait si quelqu'un est connecté (immédiat sans Firebase). */
export const pret = new Promise((r) => (finPret = r));

export const utilisateur = () => courant;
export function surChangement(cb) { abonnes.add(cb); return () => abonnes.delete(cb); }
function notifier() {
  for (const cb of abonnes) { try { cb(courant); } catch (e) { console.error(e); } }
}

async function demarrer() {
  if (!comptesActifs) return finPret();
  try {
    const [{ initializeApp }, A, F] = await Promise.all([
      import(CDN + "firebase-app.js"),
      import(CDN + "firebase-auth.js"),
      import(CDN + "firebase-firestore.js"),
    ]);
    const app = initializeApp(FIREBASE_CONFIG);
    const auth = A.getAuth(app);
    auth.languageCode = "fr";
    fb = { auth, db: F.getFirestore(app), A, F };
    A.onAuthStateChanged(auth, async (u) => {
      adminCache = null;
      courant = u ? {
        uid: u.uid,
        nom: (nomEnAttente || u.displayName || (u.email || "").split("@")[0] || "Moi").slice(0, 40),
        email: u.email || null,
        photo: photoSure(u.photoURL),
        avatar: null,
      } : null;
      if (u) {
        try { await synchroniser(); }
        catch (e) { console.warn("Synchro impossible :", e.code || e.message); }
      }
      finPret();
      notifier();
    });
  } catch (e) {
    console.warn("Comptes indisponibles :", e.message);
    fb = null;
    finPret();
  }
}
demarrer();

/* Fusionne l'appareil et le compte puis réécrit tout le document du membre.
   ⚠️ Tout nouveau champ du document doit être ajouté ici (et dans firestore.rules). */
async function synchroniser() {
  const { F, db } = fb;
  const u = courant;
  const ref = F.doc(db, "users", u.uid);
  const snap = await F.getDoc(ref);
  const distant = snap.exists() ? snap.data() : {};

  // Scores : on garde le meilleur de l'appareil et du compte
  const scores = {};
  for (const [id, s] of Object.entries(distant.scores || {})) {
    if (scoreValide(s)) scores[id] = { best: s.best, total: s.total };
  }
  for (const [id, s] of Object.entries(scoresLocaux())) {
    const d = scores[id];
    if (!d || s.best / s.total > d.best / d.total) scores[id] = s;
  }
  for (const [id, s] of Object.entries(scores)) ecrire(cleScore(id), s);

  // Favoris : union des deux
  const favoris = new Set([...(Array.isArray(distant.favoris) ? distant.favoris : []), ...favorisLocaux()]);
  ecrireFavoris(favoris);

  // Activité : maximum par jour
  const activite = { ...(distant.activite && typeof distant.activite === "object" ? distant.activite : {}) };
  for (const [j, n] of Object.entries(activiteLocale())) activite[j] = Math.max(activite[j] || 0, n);
  const act = elaguer(activite);
  ecrire("activite", act);

  if (nomEnAttente) { u.nom = nomEnAttente; nomEnAttente = null; }
  else if (distant.nom) u.nom = String(distant.nom).slice(0, 40);
  u.avatar = avatarSur(distant.avatar);

  await F.setDoc(ref, {
    nom: u.nom,
    photo: u.photo,
    avatar: u.avatar,
    favoris: [...favoris],
    scores,
    activite: act,
    creeLe: distant.creeLe || F.serverTimestamp(),
    vuLe: F.serverTimestamp(),
  });
}

/* ---------- Progression ---------- */
/** Enregistre un score de fin de QCM. synchro : true = compte à jour, false = échec réseau, null = pas connecté. */
export async function enregistrerScore(id, best, total) {
  const ancien = scoreLocal(id);
  const ameliore = !ancien || ancien.total !== total || best > ancien.best;
  const score = ameliore ? { best, total } : ancien;
  if (ameliore) ecrire(cleScore(id), score);
  await pret;
  if (!fb || !courant) return { score, synchro: null };
  if (!ameliore) return { score, synchro: true };
  try {
    const { F, db } = fb;
    await F.setDoc(F.doc(db, "users", courant.uid), { scores: { [id]: score }, vuLe: F.serverTimestamp() }, { merge: true });
    return { score, synchro: true };
  } catch (e) {
    console.warn("Score non synchronisé :", e.code || e.message);
    return { score, synchro: false };
  }
}

/** À appeler à la fin de chaque partie (complète ou « refaire mes erreurs »). Renvoie le total du jour. */
export async function noterActivite() {
  const a = activiteLocale();
  const j = jourCle();
  a[j] = (a[j] || 0) + 1;
  const res = elaguer(a);
  ecrire("activite", res);
  await pret;
  if (fb && courant) {
    const { F, db } = fb;
    try {
      await F.setDoc(F.doc(db, "users", courant.uid), { activite: { [j]: res[j] }, vuLe: F.serverTimestamp() }, { merge: true });
    } catch (e) {
      console.warn("Activité non synchronisée :", e.code || e.message);
    }
  }
  return res[j];
}

/** Ajoute/retire un favori (forcer = true/false pour imposer l'état). Renvoie le nouvel état. */
export function basculerFavori(id, forcer) {
  const fav = favorisLocaux();
  const actif = forcer ?? !fav.has(id);
  if (actif) fav.add(id); else fav.delete(id);
  ecrireFavoris(fav);
  if (fb && courant) {
    const { F, db } = fb;
    F.setDoc(F.doc(db, "users", courant.uid), { favoris: actif ? F.arrayUnion(id) : F.arrayRemove(id) }, { merge: true })
      .catch((e) => console.warn("Favori non synchronisé :", e.code || e.message));
  }
  return actif;
}

/** Efface scores et jours d'activité (favoris conservés), ici et sur le compte. false = compte injoignable. */
export async function reinitialiserProgression() {
  try {
    for (const cle of Object.keys(localStorage)) {
      if (cle === "activite" || cle.startsWith("score:outils/")) localStorage.removeItem(cle);
    }
  } catch {}
  await pret;
  if (!fb || !courant) return true;
  try {
    await fb.F.updateDoc(fb.F.doc(fb.db, "users", courant.uid), { scores: {}, activite: {} });
    return true;
  } catch (e) {
    console.warn("Réinitialisation non synchronisée :", e.code || e.message);
    return false;
  }
}

/* ---------- Connexion ---------- */
function exigerComptes() {
  if (!fb) throw Object.assign(new Error("Comptes indisponibles"), { code: "app/comptes-indisponibles" });
}
export async function connexionGoogle() {
  exigerComptes();
  await fb.A.signInWithPopup(fb.auth, new fb.A.GoogleAuthProvider());
}
export async function connexionEmail(email, mdp) {
  exigerComptes();
  await fb.A.signInWithEmailAndPassword(fb.auth, email, mdp);
}
export async function inscriptionEmail(nom, email, mdp) {
  exigerComptes();
  nom = String(nom || "").trim().slice(0, 40);
  if (!nom) throw Object.assign(new Error("Nom requis"), { code: "app/nom-requis" });
  nomEnAttente = nom;
  try {
    const { user } = await fb.A.createUserWithEmailAndPassword(fb.auth, email, mdp);
    await fb.A.updateProfile(user, { displayName: nom }).catch(() => {});
  } catch (e) {
    nomEnAttente = null;
    throw e;
  }
}
export async function motDePasseOublie(email) {
  exigerComptes();
  await fb.A.sendPasswordResetEmail(fb.auth, email);
}
export async function deconnexion() {
  if (!fb) return;
  viderAppareil(); // la progression est dans le compte : on évite de la mélanger avec un autre compte
  await fb.A.signOut(fb.auth);
}
export async function changerNom(nom) {
  exigerComptes();
  nom = String(nom || "").trim().slice(0, 40);
  if (!nom || !courant) return;
  courant.nom = nom;
  notifier();
  await fb.A.updateProfile(fb.auth.currentUser, { displayName: nom }).catch(() => {});
  try {
    await fb.F.setDoc(fb.F.doc(fb.db, "users", courant.uid), { nom }, { merge: true });
  } catch (e) {
    console.warn("Nom non synchronisé :", e.code || e.message);
  }
}
/** Avatar emoji (liste AVATARS) ou null pour revenir à la photo Google / l'initiale. */
export async function majAvatar(emoji) {
  exigerComptes();
  if (!courant) return;
  courant.avatar = avatarSur(emoji);
  notifier();
  try {
    await fb.F.setDoc(fb.F.doc(fb.db, "users", courant.uid), { avatar: courant.avatar }, { merge: true });
  } catch (e) {
    console.warn("Avatar non synchronisé :", e.code || e.message);
  }
}
export function compteViaGoogle() {
  const user = fb?.auth.currentUser;
  return !!user && (user.providerData || []).some((p) => p.providerId === "google.com");
}
/** Supprime définitivement le compte et ses données. Firebase exige de reconfirmer l'identité juste avant. */
export async function supprimerCompte(motDePasse) {
  exigerComptes();
  const { A, F, auth, db } = fb;
  const user = auth.currentUser;
  if (!user) return;
  if (compteViaGoogle()) await A.reauthenticateWithPopup(user, new A.GoogleAuthProvider());
  else await A.reauthenticateWithCredential(user, A.EmailAuthProvider.credential(user.email, motDePasse || ""));
  await F.deleteDoc(F.doc(db, "users", user.uid));
  viderAppareil();
  await A.deleteUser(user);
}

/* ---------- Admin ---------- */
/** Admin = les règles Firestore l'autorisent à lire tous les profils (UID listé dans firestore.rules). */
export async function estAdmin() {
  await pret;
  if (!fb || !courant) return false;
  if (adminCache === null) {
    const { F, db } = fb;
    try {
      await F.getDocs(F.query(F.collection(db, "users"), F.limit(1)));
      adminCache = true;
    } catch {
      adminCache = false;
    }
  }
  return adminCache;
}
export async function membres() {
  exigerComptes();
  const { F, db } = fb;
  const snap = await F.getDocs(F.collection(db, "users"));
  return snap.docs.map((d) => ({ uid: d.id, ...d.data() }));
}

/* ---------- Catalogue du site (modifiable par l'admin) ----------
   Document public site/catalogue = { annees: [{ id, nom, sous, verrou }],
   matieres: [{ id, annee, nom, emoji, complet, prof }], outils: { <id>: { annee, matiere, cache } },
   masques: { <id d'outil>: [catégories masquées] } }. Absent : l'accueil suit outils.js. */
const CLE_CATALOGUE = "catalogue";
function catalogueSur(c) {
  if (!c || typeof c !== "object" || !Array.isArray(c.annees)) return null;
  return {
    annees: c.annees.filter((a) => a && typeof a.id === "string"),
    matieres: Array.isArray(c.matieres) ? c.matieres.filter((m) => m && typeof m.id === "string") : [],
    outils: c.outils && typeof c.outils === "object" ? c.outils : {},
    masques: c.masques && typeof c.masques === "object" ? c.masques : {},
  };
}
/** Dernier catalogue connu sur cet appareil (affichage immédiat, hors ligne). */
export function catalogueLocal() { return catalogueSur(lire(CLE_CATALOGUE, null)); }
/** Catalogue publié par l'admin, ou null s'il n'a jamais été publié. */
export async function chargerCatalogue() {
  await pret;
  if (!fb) return catalogueLocal();
  try {
    const { F, db } = fb;
    const snap = await F.getDoc(F.doc(db, "site", "catalogue"));
    const c = snap.exists() ? catalogueSur(snap.data()) : null;
    if (c) ecrire(CLE_CATALOGUE, c); else { try { localStorage.removeItem(CLE_CATALOGUE); } catch {} }
    return c;
  } catch (e) {
    console.warn("Catalogue illisible :", e.code || e.message);
    return catalogueLocal();
  }
}
/** Admin : publie le catalogue pour tout le monde. */
export async function enregistrerCatalogue(c) {
  exigerComptes();
  const propre = catalogueSur(c);
  const { F, db } = fb;
  await F.setDoc(F.doc(db, "site", "catalogue"), { ...propre, majLe: F.serverTimestamp() });
  ecrire(CLE_CATALOGUE, propre);
  return propre;
}

/* ---------- Messages d'erreur ---------- */
const MESSAGES = {
  "auth/invalid-credential": "E-mail ou mot de passe incorrect.",
  "auth/wrong-password": "Mot de passe incorrect.",
  "auth/user-not-found": "E-mail ou mot de passe incorrect.",
  "auth/invalid-email": "Adresse e-mail invalide.",
  "auth/missing-email": "Entre ton adresse e-mail.",
  "auth/missing-password": "Entre ton mot de passe.",
  "auth/email-already-in-use": "Un compte existe déjà avec cet e-mail : connecte-toi.",
  "auth/weak-password": "Mot de passe trop court (6 caractères minimum).",
  "auth/too-many-requests": "Trop d'essais. Réessaie dans quelques minutes.",
  "auth/network-request-failed": "Pas de connexion internet.",
  "auth/popup-blocked": "Fenêtre bloquée par le navigateur : autorise les pop-ups ou utilise ton e-mail.",
  "auth/operation-not-supported-in-this-environment": "Connexion Google impossible ici : ouvre le site dans Chrome ou Safari, ou utilise ton e-mail.",
  "auth/web-storage-unsupported": "Connexion Google impossible ici : ouvre le site dans Chrome ou Safari, ou utilise ton e-mail.",
  "auth/unauthorized-domain": "Ce site n'est pas encore autorisé dans Firebase (domaine à ajouter).",
  "auth/operation-not-allowed": "Ce mode de connexion n'est pas encore activé dans Firebase.",
  "auth/requires-recent-login": "Pour ta sécurité, reconnecte-toi puis réessaie.",
  "auth/user-mismatch": "Ce n'est pas le compte Google connecté au site.",
  "permission-denied": "Action refusée par les règles de sécurité (as-tu publié les dernières règles Firestore ?).",
  "app/email-requis": "Entre ton e-mail, puis touche « Mot de passe oublié ? ».",
  "app/nom-requis": "Choisis un prénom ou un pseudo.",
  "app/comptes-indisponibles": "Les comptes ne sont pas disponibles pour le moment.",
};
export function messageErreur(e) {
  const code = e?.code || "";
  if (code === "auth/popup-closed-by-user" || code === "auth/cancelled-popup-request") return "";
  return MESSAGES[code] || `Erreur inattendue (${code || e?.message || "inconnue"}).`;
}
