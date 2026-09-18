import type { TemplateDefinition } from "@/lib/types";

export const jardinSecretLavande: TemplateDefinition = {
  id: "jardin-secret-lavande",
  name: "Jardin Secret · Lavande",
  collectionId: "jardin-secret",
  style: "Botanique",
  ambiance: "Neutre",
  theme: {
    palette: {
      id: "lavande",
      name: "Lavande",
      paper: "#F6F3F6",
      ink: "#2E2A33",
      accent: "#6E5C82",
      accentSoft: "#D9CFE3",
    },
    typography: {
      display: "cormorant-garamond",
      body: "jost",
      scale: "normale",
      displayStyle: "italique",
    },
    rhythm: "normal",
    stroke: 1,
    radius: "doux",
  },
  decor: {
    motifs: ["arche"],
    density: "moyenne",
    parallax: false,
    anchors: ["haut"],
  },
  opening: { style: "rideau", duree: 700, cascadePrenoms: false },
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
