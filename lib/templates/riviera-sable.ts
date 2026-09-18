import type { TemplateDefinition } from "@/lib/types";

export const rivieraSable: TemplateDefinition = {
  id: "riviera-sable",
  name: "Riviera · Sable",
  collectionId: "riviera",
  style: "Minimaliste",
  ambiance: "Froide",
  theme: {
    palette: {
      id: "sable",
      name: "Sable",
      paper: "#FAF5EC",
      ink: "#33291D",
      accent: "#8d6730",
      accentSoft: "#EAD9B7",
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
    cagnotte: true,
    musique: true,
    multilingue: false,
    planInvites: false,
  },
};
