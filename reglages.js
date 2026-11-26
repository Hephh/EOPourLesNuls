/* =====================================================================
   Réglages de l'appareil (thème, texte, QCM, objectif…).
   Script CLASSIQUE (pas un module) à charger dans le <head> de chaque page,
   juste après <meta name="theme-color"> : il applique le thème avant
   l'affichage, sans flash. Accès : window.Reglages.lire() / .ecrire(cle, valeur).
   ===================================================================== */
(function () {
  var DEFAUTS = {
    theme: "clair",           // clair | papier | menthe | auto (suit le téléphone) | sombre | oled (noir pur) | nuit
    texte: 100,               // taille du texte en %, de 85 à 140
    animations: true,
    correction: "immediate",  // immediate | fin (mode examen)
    chrono: 0,                // secondes par question (0 = sans chrono)
    melangerQuestions: true,
    melangerChoix: true,
    vibrations: true,
    objectif: 3,              // QCM terminés par jour
    fun: null                 // mode fun (série, objectif…) : null = pas encore demandé, true, false
  };
  var sombreSysteme = window.matchMedia ? window.matchMedia("(prefers-color-scheme: dark)") : null;

  function lire() {
    var r = {};
    try { r = JSON.parse(localStorage.getItem("reglages")) || {}; } catch (e) {}
    var res = {};
    for (var k in DEFAUTS) res[k] = Object.prototype.hasOwnProperty.call(r, k) ? r[k] : DEFAUTS[k];
    // ancienne valeur « normal / grand » → pourcentage
    if (res.texte === "grand") res.texte = 112; else if (typeof res.texte !== "number") res.texte = 100;
    res.texte = Math.min(140, Math.max(85, Math.round(res.texte)));
    return res;
  }

  function appliquer(r) {
    r = r || lire();
    var d = document.documentElement;
    var NUANCES = { papier: 1, menthe: 1, oled: 1, nuit: 1 };
    var sombre = r.theme === "sombre" || r.theme === "oled" || r.theme === "nuit" || (r.theme === "auto" && !!(sombreSysteme && sombreSysteme.matches));
    d.setAttribute("data-theme", sombre ? "dark" : "light");
    if (NUANCES[r.theme]) d.setAttribute("data-nuance", r.theme); else d.removeAttribute("data-nuance");
    d.style.setProperty("--texte", String(r.texte / 100));
    if (r.animations === false) d.setAttribute("data-anim", "off"); else d.removeAttribute("data-anim");
    if (r.fun === false) d.setAttribute("data-fun", "off"); else d.removeAttribute("data-fun");
    var meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute("content", ({ papier: "#f4efe4", menthe: "#eef6f3", oled: "#000000", nuit: "#0e1726" })[r.theme] || (sombre ? "#16181d" : "#f6f7f9"));
  }

  function ecrire(cle, valeur) {
    var r = lire();
    if (cle === "texte") valeur = Math.min(140, Math.max(85, Math.round(Number(valeur) || 100)));
    r[cle] = valeur;
    try { localStorage.setItem("reglages", JSON.stringify(r)); } catch (e) {}
    appliquer(r);
    return r;
  }

  function reinitialiser() {
    try { localStorage.removeItem("reglages"); } catch (e) {}
    appliquer();
  }

  // En mode « auto », suivre le thème du téléphone s'il change pendant la visite.
  if (sombreSysteme) {
    var suivre = function () { if (lire().theme === "auto") appliquer(); };
    if (sombreSysteme.addEventListener) sombreSysteme.addEventListener("change", suivre);
    else if (sombreSysteme.addListener) sombreSysteme.addListener(suivre);
  }

  window.Reglages = { DEFAUTS: DEFAUTS, lire: lire, ecrire: ecrire, appliquer: appliquer, reinitialiser: reinitialiser };
  appliquer();
})();
