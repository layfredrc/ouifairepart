import type { TemplateDefinition } from "@/lib/types";

export const rivieraCorail: TemplateDefinition = {
  id: "riviera-corail",
  name: "Riviera · Corail",
  collectionId: "riviera",
  style: "Minimaliste",
  ambiance: "Froide",
  theme: {
    palette: {
      id: "corail",
      name: "Corail",
      paper: "#FBF3EF",
      ink: "#3A241D",
      accent: "#b55239",
      accentSoft: "#F0C9BB",
    },
    typography: {
      display: "spectral",
      body: "karla",
      scale: "normale",
      displayStyle: "italique",
    },
    rhythm: "normal",
    stroke: 1,
    radius: "doux",
  },
  decor: {
    motifs: ["onde"],
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
    cagnotte: false,
    musique: true,
    multilingue: false,
    planInvites: false,
  },
};
