/* =====================================================================
   Réglages de l'appareil (thème, texte, QCM, objectif…).
   Script CLASSIQUE (pas un module) à charger dans le <head> de chaque page,
   juste après <meta name="theme-color"> : il applique le thème avant
   l'affichage, sans flash. Accès : window.Reglages.lire() / .ecrire(cle, valeur).
   ===================================================================== */
(function () {
  var DEFAUTS = {
    theme: "auto",            // auto | clair | sombre
    texte: "normal",          // normal | grand
    animations: true,
    correction: "immediate",  // immediate | fin (mode examen)
    chrono: 0,                // secondes par question (0 = sans chrono)
    melangerQuestions: true,
    melangerChoix: true,
    vibrations: true,
    objectif: 3               // QCM terminés par jour
  };
  var sombreSysteme = window.matchMedia ? window.matchMedia("(prefers-color-scheme: dark)") : null;

  function lire() {
    var r = {};
    try { r = JSON.parse(localStorage.getItem("reglages")) || {}; } catch (e) {}
    var res = {};
    for (var k in DEFAUTS) res[k] = Object.prototype.hasOwnProperty.call(r, k) ? r[k] : DEFAUTS[k];
    return res;
  }

  function appliquer(r) {
    r = r || lire();
    var d = document.documentElement;
    var sombre = r.theme === "sombre" || (r.theme !== "clair" && !!(sombreSysteme && sombreSysteme.matches));
    d.setAttribute("data-theme", sombre ? "dark" : "light");
    if (r.texte === "grand") d.setAttribute("data-texte", "grand"); else d.removeAttribute("data-texte");
    if (r.animations === false) d.setAttribute("data-anim", "off"); else d.removeAttribute("data-anim");
    var meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute("content", sombre ? "#000000" : "#ffffff");
  }

  function ecrire(cle, valeur) {
    var r = lire();
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
