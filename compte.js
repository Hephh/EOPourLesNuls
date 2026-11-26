/* =====================================================================
   Comptes + progression
   - Sans compte : scores, favoris et jours d'activité gardés sur l'appareil (localStorage).
   - Avec Firebase configuré : connexion Google ou e-mail, synchro entre
     appareils dans Firestore (un document par membre : users/{uid}).
   Les pages n'écrivent jamais directement dans Firestore : elles passent ici.
   ===================================================================== */
import { FIREBASE_CONFIG } from "./firebase-config.js?v=10";

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
/** Photo importée par le membre : petite image en data URL (voir firestore.rules). */
export const imageSure = (p) => (typeof p === "string" && p.length <= 90000 && /^data:image\/(webp|jpeg|png);base64,[A-Za-z0-9+/=]+$/.test(p) ? p : null);

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
        image: null,
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
  u.image = imageSure(distant.image);
  u.nouveau = !snap.exists();

  await F.setDoc(ref, {
    nom: u.nom,
    photo: u.photo,
    avatar: u.avatar,
    image: u.image,
    favoris: [...favoris],
    scores,
    activite: act,
    creeLe: distant.creeLe || F.serverTimestamp(),
    vuLe: F.serverTimestamp(),
  });
  await majProfilPublic();
}

/* Profil public (profils/{uid}) : nom et avatar visibles des autres membres connectés,
   pour les commentaires et la messagerie. Rien d'autre (ni e-mail, ni progression). */
async function majProfilPublic() {
  if (!fb || !courant) return;
  const { F, db } = fb;
  try {
    await F.setDoc(F.doc(db, "profils", courant.uid), {
      nom: courant.nom, photo: courant.photo || null, avatar: courant.avatar || null, image: courant.image || null, majLe: F.serverTimestamp(),
    });
  } catch (e) {
    console.warn("Profil public non synchronisé :", e.code || e.message);
  }
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
  await majProfilPublic();
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
  await majProfilPublic();
}
/** Photo de profil importée (fichier image) : réduite à 256 px, remplace l'avatar emoji. null = la retirer. */
export async function majImage(fichier) {
  exigerComptes();
  if (!courant) return;
  let data = null;
  if (fichier) {
    data = await compresserImage(fichier, 256, 0.82);
    if (data.length > 90000) data = await compresserImage(fichier, 192, 0.7);
    if (!imageSure(data)) throw Object.assign(new Error("Image trop lourde"), { code: "app/image-lourde" });
  }
  courant.image = data;
  if (data) courant.avatar = null;
  notifier();
  try {
    await fb.F.setDoc(fb.F.doc(fb.db, "users", courant.uid), { image: data, avatar: courant.avatar }, { merge: true });
  } catch (e) {
    console.warn("Photo non synchronisée :", e.code || e.message);
  }
  await majProfilPublic();
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
  await F.deleteDoc(F.doc(db, "profils", user.uid)).catch(() => {});
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
    annonce: annonceSure(c.annonce),
    images: c.images && typeof c.images === "object" && !Array.isArray(c.images) ? c.images : {},
  };
}
/** Annonce de l'admin affichée en haut de l'accueil (lien : une année « #p2 » ou un outil du site). */
function annonceSure(a) {
  if (!a || typeof a !== "object" || typeof a.texte !== "string" || !a.texte.trim()) return null;
  const lien = typeof a.lien === "string" && /^(#[a-z0-9-]+|outils\/[a-z0-9-]+\.html(\?id=[a-z0-9-]+)?)$/.test(a.lien) ? a.lien : "";
  return { id: String(a.id || "").slice(0, 20), titre: String(a.titre || "").slice(0, 60), texte: a.texte.slice(0, 400), lien };
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

/* ---------- Images : compression dans le navigateur, médiathèque de l'admin ----------
   Pas de Firebase Storage (plan gratuit) : les images sont réduites puis gardées en data URL
   dans Firestore (medias/{id} = { data, nom, le }, lu par tous, écrit par l'admin). */
const LIM_MEDIA = 900000;
const mediasCache = new Map();

/** Réduit une image (fichier) à « cote » px de côté maximum ; renvoie une data URL WebP (JPEG si WebP impossible). */
export async function compresserImage(fichier, cote = 1600, qualite = 0.82) {
  if (!fichier || !/^image\//.test(fichier.type || "")) throw Object.assign(new Error("Pas une image"), { code: "app/image" });
  const url = URL.createObjectURL(fichier);
  try {
    const img = await new Promise((ok, ko) => { const i = new Image(); i.onload = () => ok(i); i.onerror = ko; i.src = url; });
    const k = Math.min(1, cote / Math.max(img.naturalWidth, img.naturalHeight));
    const cv = document.createElement("canvas");
    cv.width = Math.max(1, Math.round(img.naturalWidth * k));
    cv.height = Math.max(1, Math.round(img.naturalHeight * k));
    cv.getContext("2d").drawImage(img, 0, 0, cv.width, cv.height);
    let data = cv.toDataURL("image/webp", qualite);
    if (!data.startsWith("data:image/webp")) data = cv.toDataURL("image/jpeg", qualite);
    return data;
  } catch {
    throw Object.assign(new Error("Image illisible"), { code: "app/image" });
  } finally {
    URL.revokeObjectURL(url);
  }
}

/** Admin : enregistre une image dans la médiathèque, renvoie son identifiant. */
export async function televerserMedia(fichier, { cote = 1600, nom = "" } = {}) {
  exigerComptes();
  let data = await compresserImage(fichier, cote);
  if (data.length > LIM_MEDIA) data = await compresserImage(fichier, Math.round(cote * 0.7), 0.72);
  if (data.length > LIM_MEDIA) data = await compresserImage(fichier, Math.round(cote * 0.5), 0.65);
  if (data.length > LIM_MEDIA) throw Object.assign(new Error("Image trop lourde"), { code: "app/image-lourde" });
  const { F, db } = fb;
  const ref = F.doc(F.collection(db, "medias"));
  await F.setDoc(ref, { data, nom: String(nom || fichier.name || "").slice(0, 80), le: F.serverTimestamp() });
  mediasCache.set(ref.id, Promise.resolve(data));
  return ref.id;
}
/** Admin : retire une image de la médiathèque (silencieux si déjà absente). */
export async function supprimerMedia(id) {
  if (!fb || !id) return;
  mediasCache.delete(id);
  try { localStorage.removeItem("media:" + id); } catch {}
  try { await fb.F.deleteDoc(fb.F.doc(fb.db, "medias", id)); } catch (e) { console.warn("Image non supprimée :", e.code || e.message); }
}
const mediaSur = (d) => (typeof d === "string" && /^data:image\/(webp|jpeg|png);base64,/.test(d) ? d : null);
/** Une image de la médiathèque (data URL), ou null. Les petites sont gardées sur l'appareil. */
export function media(id) {
  if (!id || typeof id !== "string") return Promise.resolve(null);
  if (!mediasCache.has(id)) {
    mediasCache.set(id, (async () => {
      try { const l = mediaSur(localStorage.getItem("media:" + id)); if (l) return l; } catch {}
      await pret;
      if (!fb) return null;
      try {
        const snap = await fb.F.getDoc(fb.F.doc(fb.db, "medias", id));
        const d = snap.exists() ? mediaSur(snap.data().data) : null;
        if (d && d.length < 150000) { try { localStorage.setItem("media:" + id, d); } catch {} }
        return d;
      } catch (e) {
        console.warn("Image illisible :", e.code || e.message);
        mediasCache.delete(id);
        return null;
      }
    })());
  }
  return mediasCache.get(id);
}
/** Remplit toutes les balises <img data-media="id"> d'un bloc de page. */
export function hydraterMedias(racine = document) {
  racine.querySelectorAll("img[data-media]:not([src])").forEach((img) => {
    img.setAttribute("src", "data:image/gif;base64,R0lGODlhAQABAAAAACwAAAAAAQABAAA=");
    media(img.dataset.media).then((d) => { if (d) img.src = d; else img.classList.add("media-absente"); });
  });
}

/* ---------- Contenus créés depuis l'admin (QCM, fiches et schémas) ----------
   contenus/{id} = { type: "qcm" | "fiche", titre, questions: [{ q, choix[], bonnes[], explication, image }],
   blocs: [{ t: "titre" | "texte" | "image", v, legende }], majLe }. Lu par tous, écrit par l'admin. */
export async function contenu(id) {
  await pret;
  const cle = "contenu:" + id;
  if (!fb) return lire(cle, null);
  try {
    const snap = await fb.F.getDoc(fb.F.doc(fb.db, "contenus", id));
    if (!snap.exists()) return null;
    const { majLe, ...d } = snap.data();
    ecrire(cle, d);
    return d;
  } catch (e) {
    console.warn("Contenu illisible :", e.code || e.message);
    return lire(cle, null);
  }
}
export async function enregistrerContenu(id, d) {
  exigerComptes();
  const propre = {
    type: d.type === "fiche" ? "fiche" : "qcm",
    titre: String(d.titre || "").slice(0, 80),
    questions: (d.questions || []).slice(0, 300).map((q) => ({
      q: String(q.q || "").slice(0, 1500),
      choix: (q.choix || []).slice(0, 8).map((c) => String(c || "").slice(0, 500)),
      bonnes: (q.bonnes || []).filter((k) => Number.isInteger(k) && k >= 0 && k < 8),
      explication: String(q.explication || "").slice(0, 3000),
      image: typeof q.image === "string" ? q.image.slice(0, 40) : "",
    })),
    blocs: (d.blocs || []).slice(0, 300).map((b) => ({
      t: ["titre", "texte", "image"].includes(b.t) ? b.t : "texte",
      v: String(b.v || "").slice(0, 6000),
      legende: String(b.legende || "").slice(0, 300),
    })),
  };
  await fb.F.setDoc(fb.F.doc(fb.db, "contenus", id), { ...propre, majLe: fb.F.serverTimestamp() });
  ecrire("contenu:" + id, propre);
  return propre;
}
export async function supprimerContenu(id) {
  exigerComptes();
  try { localStorage.removeItem("contenu:" + id); } catch {}
  await fb.F.deleteDoc(fb.F.doc(fb.db, "contenus", id));
}

/* ---------- Social : profils publics, commentaires, messagerie privée ----------
   Réservé aux membres connectés. Les pages passent toujours par ces fonctions. */
const LIM_COMMENTAIRE = 500, LIM_MESSAGE = 1000;
const texteSur = (t, max) => String(t || "").replace(/\s+$/g, "").replace(/^\s+/g, "").slice(0, max);
const profilsCache = new Map();
const profilSur = (uid, d) => ({ uid, nom: (d && typeof d.nom === "string" && d.nom) || "Membre", photo: photoSure(d?.photo), image: imageSure(d?.image), avatar: avatarSur(d?.avatar) });

/** Profils publics de quelques membres : { uid: { uid, nom, photo, avatar } } (mis en cache). */
export async function profils(uids) {
  await pret;
  const res = {};
  const manquants = [...new Set(uids)].filter((u) => u && !profilsCache.has(u));
  if (fb && courant && manquants.length) {
    const { F, db } = fb;
    await Promise.all(manquants.map(async (u) => {
      try { const s = await F.getDoc(F.doc(db, "profils", u)); profilsCache.set(u, profilSur(u, s.exists() ? s.data() : null)); }
      catch { profilsCache.set(u, profilSur(u, null)); }
    }));
  }
  for (const u of uids) res[u] = profilsCache.get(u) || profilSur(u, null);
  return res;
}
/** Tous les membres qui ont un profil public (pour écrire à quelqu'un), sauf soi. */
export async function annuaire() {
  exigerComptes();
  await pret;
  if (!courant) return [];
  const { F, db } = fb;
  const snap = await F.getDocs(F.query(F.collection(db, "profils"), F.limit(500)));
  return snap.docs.filter((d) => d.id !== courant.uid).map((d) => { const p = profilSur(d.id, d.data()); profilsCache.set(d.id, p); return p; })
    .sort((a, b) => a.nom.localeCompare(b.nom, "fr"));
}

/* Commentaires d'un outil : commentaires/{outil}/liste/{id} = { de, nom, photo, avatar, texte, le } */
const listeCommentaires = (outil) => fb.F.collection(fb.db, "commentaires", outil, "liste");
/** Suit les commentaires d'un outil en direct. cb(liste du plus ancien au plus récent). Renvoie la fonction d'arrêt. */
export function ecouterCommentaires(outil, cb, surErreur) {
  if (!fb || !courant) return () => {};
  const { F } = fb;
  return F.onSnapshot(F.query(listeCommentaires(outil), F.orderBy("le", "asc"), F.limit(300)),
    (snap) => cb(snap.docs.map((d) => ({ id: d.id, ...d.data(), le: d.data().le?.toMillis?.() || Date.now() }))),
    (e) => surErreur?.(e));
}
export async function ajouterCommentaire(outil, texte) {
  exigerComptes();
  if (!courant) throw Object.assign(new Error("Connexion requise"), { code: "app/connexion-requise" });
  texte = texteSur(texte, LIM_COMMENTAIRE);
  if (!texte) return;
  const { F } = fb;
  await F.addDoc(listeCommentaires(outil), {
    de: courant.uid, nom: courant.nom, photo: courant.photo || null, avatar: courant.avatar || null, texte, le: F.serverTimestamp(),
  });
}
/** L'auteur ou l'admin. */
export async function supprimerCommentaire(outil, id) {
  exigerComptes();
  await fb.F.deleteDoc(fb.F.doc(fb.db, "commentaires", outil, "liste", id));
}
/** Nombre de commentaires par outil : { id: n } (0 si illisible). */
export async function nbCommentaires(ids) {
  await pret;
  const res = {};
  if (!fb || !courant) return res;
  const { F } = fb;
  await Promise.all(ids.map(async (id) => {
    try { res[id] = (await F.getCountFromServer(listeCommentaires(id))).data().count; } catch { res[id] = 0; }
  }));
  return res;
}

/* Messagerie privée : conversations/{a_b} = { membres: [a, b] (triés), dernier: { texte, de }, majLe, lu: { uid: date } }
   et conversations/{a_b}/messages/{id} = { de, texte, le }. Seuls les deux membres lisent et écrivent. */
const idConv = (a, b) => [a, b].sort().join("_");
const ms = (t) => (t && typeof t.toMillis === "function" ? t.toMillis() : 0);
/** Suit mes conversations en direct. cb([{ id, autre, dernier, majLe, nonLu }]) du plus récent au plus ancien. */
export function ecouterConversations(cb, surErreur) {
  if (!fb || !courant) return () => {};
  const { F, db } = fb;
  const moi = courant.uid;
  return F.onSnapshot(F.query(F.collection(db, "conversations"), F.where("membres", "array-contains", moi), F.limit(200)),
    (snap) => cb(snap.docs.map((d) => {
      const v = d.data();
      const majLe = ms(v.majLe) || Date.now();
      return { id: d.id, autre: (v.membres || []).find((u) => u !== moi) || moi, dernier: v.dernier || null, majLe,
        nonLu: !!v.dernier && v.dernier.de !== moi && majLe > ms(v.lu?.[moi]) };
    }).sort((a, b) => b.majLe - a.majLe)),
    (e) => surErreur?.(e));
}
/** Suit les messages échangés avec un membre. cb(liste du plus ancien au plus récent). */
export function ecouterMessages(autre, cb, surErreur) {
  if (!fb || !courant) return () => {};
  const { F, db } = fb;
  return F.onSnapshot(F.query(F.collection(db, "conversations", idConv(courant.uid, autre), "messages"), F.orderBy("le", "asc"), F.limit(500)),
    (snap) => cb(snap.docs.map((d) => ({ id: d.id, ...d.data(), le: ms(d.data().le) || Date.now() }))),
    (e) => surErreur?.(e));
}
export async function envoyerMessage(autre, texte) {
  exigerComptes();
  if (!courant) throw Object.assign(new Error("Connexion requise"), { code: "app/connexion-requise" });
  texte = texteSur(texte, LIM_MESSAGE);
  if (!texte || autre === courant.uid) return;
  const { F, db } = fb;
  const moi = courant.uid, id = idConv(moi, autre);
  const lot = F.writeBatch(db);
  lot.set(F.doc(db, "conversations", id), {
    membres: [moi, autre].sort(), dernier: { texte: texte.slice(0, 120), de: moi }, majLe: F.serverTimestamp(), lu: { [moi]: F.serverTimestamp() },
  }, { merge: true });
  lot.set(F.doc(F.collection(db, "conversations", id, "messages")), { de: moi, texte, le: F.serverTimestamp() });
  await lot.commit();
}
/** Marque la conversation comme lue (efface le point bleu). */
export async function marquerLu(autre) {
  if (!fb || !courant) return;
  const { F, db } = fb;
  try { await F.updateDoc(F.doc(db, "conversations", idConv(courant.uid, autre)), { [`lu.${courant.uid}`]: F.serverTimestamp() }); } catch {}
}
/** Supprime un de mes messages. */
export async function supprimerMessage(autre, id) {
  exigerComptes();
  await fb.F.deleteDoc(fb.F.doc(fb.db, "conversations", idConv(courant.uid, autre), "messages", id));
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
  "app/image": "Ce fichier n'est pas une image lisible (JPEG, PNG ou WebP).",
  "app/image-lourde": "Image trop lourde, même réduite. Essaie une image plus petite.",
  "app/connexion-requise": "Connecte-toi (onglet Profil) pour commenter et écrire aux autres.",
};
export function messageErreur(e) {
  const code = e?.code || "";
  if (code === "auth/popup-closed-by-user" || code === "auth/cancelled-popup-request") return "";
  return MESSAGES[code] || `Erreur inattendue (${code || e?.message || "inconnue"}).`;
}
