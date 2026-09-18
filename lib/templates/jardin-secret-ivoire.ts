import type { TemplateDefinition } from "@/lib/types";

export const jardinSecretIvoire: TemplateDefinition = {
  id: "jardin-secret-ivoire",
  name: "Jardin Secret · Ivoire",
  collectionId: "jardin-secret",
  style: "Botanique",
  ambiance: "Neutre",
  theme: {
    palette: {
      id: "ivoire",
      name: "Ivoire",
      paper: "#FBF8F1",
      ink: "#332C22",
      accent: "#876f46",
      accentSoft: "#E3D6BB",
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
    musique: true,
    multilingue: false,
    planInvites: false,
  },
};
