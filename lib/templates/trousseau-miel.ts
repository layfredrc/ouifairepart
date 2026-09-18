import type { TemplateDefinition } from "@/lib/types";

export const trousseauMiel: TemplateDefinition = {
  id: "trousseau-miel",
  name: "Trousseau · Miel",
  collectionId: "trousseau",
  style: "Romantique",
  ambiance: "Chaude",
  theme: {
    palette: {
      id: "miel",
      name: "Miel",
      paper: "#FBF4E7",
      ink: "#3A2E17",
      accent: "#936829",
      accentSoft: "#ECD8AE",
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
    parallax: true,
    anchors: ["haut", "continu"],
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
    musique: true,
    multilingue: false,
    planInvites: false,
  },
};
