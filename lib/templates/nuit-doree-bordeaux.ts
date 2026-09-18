import type { TemplateDefinition } from "@/lib/types";

export const nuitDoreeBordeaux: TemplateDefinition = {
  id: "nuit-doree-bordeaux",
  name: "Nuit Dorée · Bordeaux",
  collectionId: "nuit-doree",
  style: "Contemporain",
  ambiance: "Sombre",
  theme: {
    palette: {
      id: "bordeaux",
      name: "Bordeaux",
      paper: "#EFE6E1",
      ink: "#180D0B",
      accent: "#7A2E32",
      accentSoft: "#3A1A1B",
    },
    typography: {
      display: "playfair-display",
      body: "work-sans",
      scale: "normale",
      displayStyle: "italique",
    },
    rhythm: "normal",
    stroke: 1,
    radius: "doux",
  },
  decor: {
    motifs: ["cadre"],
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
    planInvites: true,
  },
};
