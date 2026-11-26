/* =====================================================================
   Comptes + progression
   - Sans compte : scores et favoris gardés sur l'appareil (localStorage).
   - Avec Firebase configuré : connexion Google ou e-mail, synchro entre
     appareils dans Firestore (un document par membre : users/{uid}).
   Les pages n'écrivent jamais directement dans Firestore : elles passent ici.
   ===================================================================== */
import { FIREBASE_CONFIG } from "./firebase-config.js?v=3";

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

/* Seules les photos de profil Google sont acceptées (voir firestore.rules). */
export const photoSure = (p) => (typeof p === "string" && /^https:\/\/lh\d\.googleusercontent\.com\//.test(p) && p.length <= 600 ? p : null);

/* ---------- État du compte ---------- */
let fb = null;            // { auth, db, A, F } une fois Firebase chargé
let courant = null;       // { uid, nom, email, photo } ou null
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

/* Fusionne l'appareil et le compte : meilleur score de chaque côté, union des favoris. */
async function synchroniser() {
  const { F, db } = fb;
  const u = courant;
  const ref = F.doc(db, "users", u.uid);
  const snap = await F.getDoc(ref);
  const distant = snap.exists() ? snap.data() : {};

  const scores = {};
  for (const [id, s] of Object.entries(distant.scores || {})) {
    if (scoreValide(s)) scores[id] = { best: s.best, total: s.total };
  }
  for (const [id, s] of Object.entries(scoresLocaux())) {
    const d = scores[id];
    if (!d || s.best / s.total > d.best / d.total) scores[id] = s;
  }
  for (const [id, s] of Object.entries(scores)) ecrire(cleScore(id), s);

  const favoris = new Set([...(Array.isArray(distant.favoris) ? distant.favoris : []), ...favorisLocaux()]);
  ecrireFavoris(favoris);

  if (nomEnAttente) { u.nom = nomEnAttente; nomEnAttente = null; }
  else if (distant.nom) u.nom = String(distant.nom).slice(0, 40);

  const maj = { nom: u.nom, photo: u.photo, favoris: [...favoris], scores, vuLe: F.serverTimestamp() };
  if (!snap.exists()) maj.creeLe = F.serverTimestamp();
  await F.setDoc(ref, maj, { merge: true });
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
  // La progression est dans le compte : on vide l'appareil pour ne pas la mélanger avec un autre compte.
  try {
    for (const cle of Object.keys(localStorage)) {
      if (cle === "favoris" || cle.startsWith("score:outils/")) localStorage.removeItem(cle);
    }
  } catch {}
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

/* ---------- Messages d'erreur ---------- */
const MESSAGES = {
  "auth/invalid-credential": "E-mail ou mot de passe incorrect.",
  "auth/wrong-password": "E-mail ou mot de passe incorrect.",
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
  "app/email-requis": "Entre ton e-mail, puis touche « Mot de passe oublié ? ».",
  "app/nom-requis": "Choisis un prénom ou un pseudo.",
  "app/comptes-indisponibles": "Les comptes ne sont pas disponibles pour le moment.",
};
export function messageErreur(e) {
  const code = e?.code || "";
  if (code === "auth/popup-closed-by-user" || code === "auth/cancelled-popup-request") return "";
  return MESSAGES[code] || `Erreur inattendue (${code || e?.message || "inconnue"}).`;
}
