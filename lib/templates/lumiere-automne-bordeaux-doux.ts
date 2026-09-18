import type { TemplateDefinition } from "@/lib/types";

export const lumiereAutomneBordeauxDoux: TemplateDefinition = {
  id: "lumiere-automne-bordeaux-doux",
  name: "Lumière d'Automne · Bordeaux doux",
  collectionId: "lumiere-automne",
  style: "Editorial",
  ambiance: "Chaude",
  theme: {
    palette: {
      id: "bordeaux-doux",
      name: "Bordeaux doux",
      paper: "#F8EDE9",
      ink: "#371C1B",
      accent: "#8C3C3A",
      accentSoft: "#E4BEBA",
    },
    typography: {
      display: "fraunces",
      body: "karla",
      scale: "normale",
      displayStyle: "italique",
    },
    rhythm: "normal",
    stroke: 1,
    radius: "doux",
  },
  decor: {
    motifs: ["semis"],
    density: "moyenne",
    parallax: true,
    anchors: ["haut", "continu"],
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
    planInvites: true,
  },
};
