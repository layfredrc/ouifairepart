import type { TemplateDefinition } from "@/lib/types";

export const clairObscurGraphite: TemplateDefinition = {
  id: "clair-obscur-graphite",
  name: "Clair-Obscur · Graphite",
  collectionId: "clair-obscur",
  style: "Graphique",
  ambiance: "Neutre",
  theme: {
    palette: {
      id: "graphite",
      name: "Graphite",
      paper: "#F4F4F2",
      ink: "#111111",
      accent: "#111111",
      accentSoft: "#CFCFCA",
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
    parallax: false,
    anchors: ["haut"],
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
    cagnotte: true,
    musique: true,
    multilingue: true,
    planInvites: false,
  },
};
