import type { TemplateDefinition } from "@/lib/types";

export const rivieraAzur: TemplateDefinition = {
  id: "riviera-azur",
  name: "Riviera · Azur",
  collectionId: "riviera",
  style: "Minimaliste",
  ambiance: "Froide",
  theme: {
    palette: {
      id: "azur",
      name: "Azur",
      paper: "#F1F6FA",
      ink: "#1B2A38",
      accent: "#2C6293",
      accentSoft: "#BFD6E8",
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
    musique: false,
    multilingue: true,
    planInvites: false,
  },
};
