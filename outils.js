/* ======================= LISTE DES OUTILS =======================
   Une entrée par outil. C'est le seul endroit à modifier pour qu'un
   outil apparaisse sur l'accueil, la recherche et le profil.
   - id      : nom du fichier sans « .html » (clé des scores et favoris)
   - annee   : "P1" … "P5" (l'année dont la page l'affiche)
   - matiere : même orthographe pour tous les outils d'une matière
   - fichier : chemin relatif depuis l'accueil
   - categories (facultatif) : [id, nom] des catégories internes de l'outil,
     que l'admin peut masquer depuis Admin ▸ Organisation                 */
export const OUTILS = [
  {
    id: "qcm-hemato-exemple",
    titre: "QCM Hématologie — exemple",
    annee: "P1",
    matiere: "Hématologie",
    type: "QCM · 7 questions",
    description: "Réponses multiples, correction expliquée, refaire ses erreurs.",
    fichier: "outils/qcm-hemato-exemple.html",
    emoji: "🩸"
  },
  {
    id: "me-revision",
    titre: "Révision M.E.",
    annee: "P2",
    matiere: "M.E.",
    type: "Fiche, cartes, 61 QCM",
    description: "Coude, épaule, poignet-main, rachis thoracique, côtes : coche les catégories à réviser, puis suis le parcours.",
    fichier: "outils/me-revision.html",
    emoji: "🦴",
    categories: [["coude", "Coude"], ["epaule", "Épaule"], ["poignet", "Poignet-main"], ["thorax", "Rachis thoracique"], ["cotes", "Côtes"], ["bases", "Bases d'arthrologie"]]
  },
];

/* Années affichées sur l'accueil, dans l'ordre. verrou : true = bulle grisée avec un cadenas.
   Valeurs de départ : dès que l'admin publie l'organisation (Admin ▸ Organisation), c'est elle qui compte. */
export const ANNEES = [
  { id: "p1", nom: "P1", sous: "1re année" },
  { id: "p2", nom: "P2", sous: "2e année" },
  { id: "p3", nom: "P3", sous: "3e année" },
  { id: "p4", nom: "P4", sous: "4e année" },
  { id: "p5", nom: "P5", sous: "5e année" },
  { id: "sopk", nom: "SOPK", sous: "Bientôt", verrou: true },
];

/* Emoji des bulles de matières (sinon : emoji du 1er outil de la matière). */
export const MATIERES = {
  "Hématologie": "🩸",
  "Anatomie": "🦴",
  "Physiologie": "🫀",
  "Embryologie": "🧬",
  "Biophysique": "⚛️",
  "Viscéral": "🫁",
  "M.E.": "🦴",
};

/* Nom complet et enseignant d'une matière (facultatif), affichés en tête de la matière. */
export const INFOS_MATIERES = {
  "M.E.": { nom: "Modèles explicatifs", prof: "M. Boucherat" },
};
