import type { TemplateDefinition } from "@/lib/types";

export const lumiereAutomneCuivre: TemplateDefinition = {
  id: "lumiere-automne-cuivre",
  name: "Lumière d'Automne · Cuivre",
  collectionId: "lumiere-automne",
  style: "Editorial",
  ambiance: "Chaude",
  theme: {
    palette: {
      id: "cuivre",
      name: "Cuivre",
      paper: "#F9F0E4",
      ink: "#39281A",
      accent: "#976328",
      accentSoft: "#E7CFA9",
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
    musique: true,
    multilingue: false,
    planInvites: true,
  },
};
