import type { TemplateDefinition } from "@/lib/types";

export const trousseauPerle: TemplateDefinition = {
  id: "trousseau-perle",
  name: "Trousseau · Perle",
  collectionId: "trousseau",
  style: "Romantique",
  ambiance: "Chaude",
  theme: {
    palette: {
      id: "perle",
      name: "Perle",
      paper: "#F7F4F1",
      ink: "#2F2C28",
      accent: "#796f5e",
      accentSoft: "#DAD3C6",
    },
    typography: {
      display: "eb-garamond",
      body: "lato",
      scale: "normale",
      displayStyle: "italique",
    },
    rhythm: "normal",
    stroke: 1,
    radius: "doux",
  },
  decor: {
    motifs: ["voute"],
    density: "moyenne",
    parallax: false,
    anchors: ["haut"],
  },
  opening: { style: "enveloppe", duree: 700, cascadePrenoms: false },
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
