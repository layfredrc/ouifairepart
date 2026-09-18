import type { TemplateDefinition } from "@/lib/types";

export const clairObscurSepia: TemplateDefinition = {
  id: "clair-obscur-sepia",
  name: "Clair-Obscur · Sépia",
  collectionId: "clair-obscur",
  style: "Graphique",
  ambiance: "Neutre",
  theme: {
    palette: {
      id: "sepia",
      name: "Sépia",
      paper: "#F6F1E9",
      ink: "#231C14",
      accent: "#5B4632",
      accentSoft: "#D9CBB4",
    },
    typography: {
      display: "libre-baskerville",
      body: "work-sans",
      scale: "normale",
      displayStyle: "italique",
    },
    rhythm: "normal",
    stroke: 1,
    radius: "doux",
  },
  decor: {
    motifs: ["diagonale"],
    density: "moyenne",
    parallax: true,
    anchors: ["haut", "continu"],
  },
  opening: { style: "fondu", duree: 700, cascadePrenoms: false },
  sections: [
    { type: "couverture", variant: "plein-cadre-centre" },
    { type: "annonce", variant: "citation-centree", reveal: { kind: "fade-up" } },
    { type: "programme", variant: "timeline-verticale", reveal: { kind: "fade-up" } },
    { type: "lieu", variant: "centre-simple", reveal: { kind: "fade-up" } },
    { type: "rsvp", variant: "formulaire-centre", reveal: { kind: "fade-up" } },
    { type: "cagnotte", variant: "bloc-centre", reveal: { kind: "fade-up" } },
    { type: "contact", variant: "signature-centree", reveal: { kind: "fade-up" } },
  ],
  features: {
    rsvp: true,
    cagnotte: false,
    musique: true,
    multilingue: false,
    planInvites: false,
  },
};
