import type { StudioDraft } from "@/lib/types";

export const demoDraft: StudioDraft = {
  designId: "jardin-secret-sauge",
  paletteId: "sauge",
  prenom1: "Camille",
  prenom2: "Antoine",
  dateMariage: "2026-09-12",
  ville: "Aix-en-Provence",
  lieu: "Domaine de la Bastide Blanche",
  programme: [
    { id: "civile", label: "Cérémonie laïque", heure: "15:30" },
    { id: "vin-honneur", label: "Vin d'honneur", heure: "17:00" },
    { id: "diner", label: "Dîner", heure: "20:00" },
    { id: "soiree", label: "Soirée dansante", heure: "22:30" },
  ],
  dressCode: "Élégant champêtre — tons naturels bienvenus",
  texteInvitation:
    "Avec la joie au cœur, nous vous invitons à célébrer notre union entourés de ceux qui comptent le plus pour nous.",
  openingStyle: "rideau",
  animationIntensity: "normale",
  addons: {
    langueSupplementaire: false,
    musiquePersonnelle: false,
    domainePersonnalise: false,
    exportImprimable: false,
    revisionAssistee: false,
  },
  compteurPublic: true,
};
