import type { TemplateDefinition } from "@/lib/types";

export const rivieraLagon: TemplateDefinition = {
  id: "riviera-lagon",
  name: "Riviera · Lagon",
  collectionId: "riviera",
  style: "Minimaliste",
  ambiance: "Froide",
  theme: {
    palette: {
      id: "lagon",
      name: "Lagon",
      paper: "#F3F8F7",
      ink: "#1D3335",
      accent: "#2E7A78",
      accentSoft: "#BFE1DE",
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
    cagnotte: true,
    musique: true,
    multilingue: true,
    planInvites: false,
  },
};
