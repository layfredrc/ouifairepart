import type { TemplateDefinition } from "@/lib/types";

export const trousseauRoseThe: TemplateDefinition = {
  id: "trousseau-rose-the",
  name: "Trousseau · Rosé",
  collectionId: "trousseau",
  style: "Romantique",
  ambiance: "Chaude",
  theme: {
    palette: {
      id: "rose-the",
      name: "Rosé",
      paper: "#FAF1F0",
      ink: "#372425",
      accent: "#a65459",
      accentSoft: "#E9C7C8",
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
    cagnotte: false,
    musique: true,
    multilingue: false,
    planInvites: false,
  },
};
