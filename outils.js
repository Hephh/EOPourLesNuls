/* ======================= LISTE DES OUTILS =======================
   Une entrée par outil. C'est le seul endroit à modifier pour qu'un
   outil apparaisse sur l'accueil, la recherche et le profil.
   - id      : nom du fichier sans « .html » (clé des scores et favoris)
   - matiere : même orthographe pour tous les outils d'une matière
   - fichier : chemin relatif depuis l'accueil                         */
export const OUTILS = [
  {
    id: "qcm-hemato-exemple",
    titre: "QCM Hématologie — exemple",
    matiere: "Hématologie",
    type: "QCM · 7 questions",
    description: "Réponses multiples, correction expliquée, refaire ses erreurs.",
    fichier: "outils/qcm-hemato-exemple.html",
    emoji: "🩸"
  },
];

/* Emoji des bulles de matières (sinon : emoji du 1er outil de la matière). */
export const MATIERES = {
  "Hématologie": "🩸",
  "Anatomie": "🦴",
  "Physiologie": "🫀",
  "Embryologie": "🧬",
  "Biophysique": "⚛️",
  "Viscéral": "🫁",
};
